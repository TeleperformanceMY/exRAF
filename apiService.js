// API Service for xRAF Dashboard
// Handles fetching and processing candidate and assessment data

const API_CONFIG = {
    candidateEndpoint: 'https://your-candidate-details-endpoint.com', // Replace with actual endpoint
    assessmentEndpoint: 'https://your-assessment-results-endpoint.com', // Replace with actual endpoint
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN' // Replace with actual token
    }
};

// Process and combine data from both sources
async function fetchReferrals(phone, email) {
    try {
        console.log('Fetching data for:', { phone, email });
        
        // Fetch both datasets in parallel
        const [candidatesResponse, assessmentResponse] = await Promise.all([
            fetch(API_CONFIG.candidateEndpoint, {
                method: 'GET',
                headers: API_CONFIG.headers
            }),
            fetch(API_CONFIG.assessmentEndpoint, {
                method: 'GET',
                headers: API_CONFIG.headers
            })
        ]);
        
        if (!candidatesResponse.ok || !assessmentResponse.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const candidateData = await candidatesResponse.json();
        const assessmentData = await assessmentResponse.json();
        
        console.log('Candidate data count:', candidateData.length);
        console.log('Assessment data count:', assessmentData.length);
        
        // Filter assessment data to only needed columns and create email map
        const assessmentMap = new Map();
        assessmentData.forEach(assessment => {
            if (assessment.Email) {
                assessmentMap.set(assessment.Email.toLowerCase(), {
                    firstName: assessment['First Name'],
                    lastName: assessment['Last Name'],
                    email: assessment.Email,
                    language: assessment.Language,
                    score: assessment.Score,
                    english: assessment.English,
                    cefr: assessment.CEFR
                });
            }
        });
        
        // Process candidate data
        const emailCandidateMap = new Map();
        
        // Group candidates by email and handle duplicates
        candidateData.forEach(candidate => {
            if (!candidate.Person_Email) return;
            
            const candidateEmail = candidate.Person_Email.toLowerCase();
            const candidateDate = new Date(candidate.updated_date || candidate['Updated Date']);
            const isXRAF = candidate.source_name === 'xRAF' || candidate['Source Name'] === 'xRAF';
            
            const candidateInfo = {
                systemId: candidate.system_ID || candidate['System ID'],
                fullName: candidate['Person Full Name'] || `${candidate['First Name'] || ''} ${candidate['Last Name'] || ''}`.trim(),
                email: candidate.Person_Email || candidate['Person Email'],
                phone: candidate.default_phone || candidate['Default Phone'] || phone,
                nationality: candidate.nationality || candidate.Nationality || '',
                source: candidate.source || candidate.Source || '',
                sourceName: candidate.source_name || candidate['Source Name'] || '',
                updatedDate: candidateDate,
                location: candidate.location || candidate.Location || '',
                recentStatus: candidate.recent_status || candidate['Recent Status'] || '',
                isXRAF: isXRAF
            };
            
            const existing = emailCandidateMap.get(candidateEmail);
            
            if (!existing) {
                // First entry for this email
                emailCandidateMap.set(candidateEmail, candidateInfo);
            } else {
                // Handle duplicates based on rules
                const existingDate = new Date(existing.updatedDate);
                
                // If current is xRAF and existing is not, replace
                if (isXRAF && !existing.isXRAF) {
                    emailCandidateMap.set(candidateEmail, candidateInfo);
                }
                // If both are xRAF, keep the newer one
                else if (isXRAF && existing.isXRAF && candidateDate > existingDate) {
                    emailCandidateMap.set(candidateEmail, candidateInfo);
                }
                // If neither is xRAF, keep the newer one
                else if (!isXRAF && !existing.isXRAF && candidateDate > existingDate) {
                    emailCandidateMap.set(candidateEmail, candidateInfo);
                }
                // If existing is xRAF and current is not, mark as previously applied
                else if (!isXRAF && existing.isXRAF) {
                    candidateInfo.isPreviouslyApplied = true;
                }
            }
        });
        
        // Build referrals array with status determination
        const referrals = [];
        const referrerEmail = email.toLowerCase();
        
        emailCandidateMap.forEach((candidate, candidateEmail) => {
            // Only include referrals for the logged-in referrer
            if (!candidate.isXRAF) {
                // Skip non-xRAF candidates for this referrer
                return;
            }
            
            const assessment = assessmentMap.get(candidateEmail);
            let status = 'Application Received';
            let stage = 'Application';
            
            // Determine status based on rules
            if (!candidate.isXRAF) {
                status = 'Previously Applied (No Payment)';
                stage = 'Previously Applied';
            } else if (!assessment) {
                // No assessment found, status remains Application Received
                status = 'Application Received';
                stage = 'Application';
            } else {
                // Check CEFR score
                const cefr = assessment.cefr;
                if (['C2', 'C1', 'B2'].includes(cefr)) {
                    status = 'Passed Assessment';
                    stage = 'Assessment';
                } else if (['B1', 'A2', 'A1'].includes(cefr)) {
                    status = 'Not Selected';
                    stage = 'Eliminated';
                } else {
                    // Unknown CEFR or no CEFR
                    status = 'Application Received';
                    stage = 'Application';
                }
            }
            
            // Calculate days since application
            const applicationDate = new Date(candidate.updatedDate);
            const today = new Date();
            const daysInStage = Math.floor((today - applicationDate) / (1000 * 60 * 60 * 24));
            
            referrals.push({
                // Required fields for dashboard
                candidateName: candidate.fullName,
                candidateEmail: candidate.email,
                candidatePhone: candidate.phone,
                stage: stage,
                status: status,
                currentStatus: status,
                applicationDate: applicationDate.toISOString().split('T')[0],
                hireDate: status === 'Hired' ? applicationDate.toISOString().split('T')[0] : null,
                daysInStage: daysInStage,
                category: candidate.source,
                source: candidate.sourceName,
                isPreviousCandidate: !candidate.isXRAF,
                needsAction: status === 'Application Received',
                
                // Additional fields
                systemId: candidate.systemId,
                nationality: candidate.nationality,
                location: candidate.location,
                recentStatus: candidate.recentStatus,
                
                // Assessment data if available
                assessmentScore: assessment?.score || null,
                assessmentCEFR: assessment?.cefr || null,
                assessmentLanguage: assessment?.language || null
            });
        });
        
        // Sort referrals by application date (newest first)
        referrals.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
        
        // Get referrer info
        const referrerInfo = {
            phone: phone,
            email: email,
            fullName: referrals.length > 0 ? 'Referrer' : 'New User'
        };
        
        console.log('Processed referrals:', referrals.length);
        
        return {
            success: true,
            data: {
                referrer: referrerInfo,
                referrals: referrals
            }
        };
        
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            data: null,
            error: error.message
        };
    }
}

// Mock data for testing
function getMockData(phone, email) {
    return {
        success: true,
        data: {
            referrer: {
                phone: phone,
                email: email,
                fullName: "Alex Johnson",
                joinDate: "2023-05-15",
                totalEarnings: 2350,
                nextPaymentDate: "2024-08-15"
            },
            referrals: [
                // Status 1: Application Received (1 new, 1 needs action)
                {
                    candidateName: "Michael Chen",
                    candidateEmail: "michael.chen@example.com",
                    candidatePhone: "01112223344",
                    stage: "Application",
                    status: "Application Received",
                    currentStatus: "Application Received",
                    applicationDate: "2024-07-01",
                    hireDate: null,
                    daysInStage: 8,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: null
                },
                {
                    candidateName: "Sarah Williams",
                    candidateEmail: "sarah.w@example.com",
                    candidatePhone: "01112223345",
                    stage: "Contact Attempt",
                    status: "Contact Attempt 2",
                    currentStatus: "Contact Attempt 2",
                    applicationDate: "2024-06-28",
                    hireDate: null,
                    daysInStage: 11,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: true,
                    assessmentCEFR: null
                },
                
                // Status 2: Passed Assessment (2 candidates)
                {
                    candidateName: "David Kim",
                    candidateEmail: "david.kim@example.com",
                    candidatePhone: "01112223346",
                    stage: "Interview Stage",
                    status: "Interview Complete / Offer Requested",
                    currentStatus: "Interview Complete / Offer Requested",
                    applicationDate: "2024-06-10",
                    hireDate: null,
                    daysInStage: 18,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "C1",
                    assessmentScore: 92
                },
                {
                    candidateName: "Emma Rodriguez",
                    candidateEmail: "emma.r@example.com",
                    candidatePhone: "01112223347",
                    stage: "Assessment Stage",
                    status: "SHL Assessment: Conversational Multichat ENG",
                    currentStatus: "Passed Assessment",
                    applicationDate: "2024-06-15",
                    hireDate: null,
                    daysInStage: 14,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "B2",
                    assessmentScore: 87
                },
                
                // Status 3: Hired (Probation) - 3 candidates
                {
                    candidateName: "James Wilson",
                    candidateEmail: "james.w@example.com",
                    candidatePhone: "01112223348",
                    stage: "Onboarding",
                    status: "New Starter (Hired)",
                    currentStatus: "Hired (Probation)",
                    applicationDate: "2024-05-20",
                    hireDate: "2024-06-05",
                    daysInStage: 35,
                    probationDays: 35,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "B2"
                },
                {
                    candidateName: "Olivia Brown",
                    candidateEmail: "olivia.b@example.com",
                    candidatePhone: "01112223349",
                    stage: "Training",
                    status: "Hired (Probation)",
                    currentStatus: "Hired (Probation)",
                    applicationDate: "2024-04-15",
                    hireDate: "2024-05-01",
                    daysInStage: 69,
                    probationDays: 69,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "C1"
                },
                {
                    candidateName: "Daniel Taylor",
                    candidateEmail: "daniel.t@example.com",
                    candidatePhone: "01112223350",
                    stage: "Production",
                    status: "Hired (Probation)",
                    currentStatus: "Hired (Probation)",
                    applicationDate: "2024-06-01",
                    hireDate: "2024-06-15",
                    daysInStage: 24,
                    probationDays: 24,
                    category: "Internal",
                    source: "Career Site",
                    isPreviousCandidate: true,
                    needsAction: false,
                    assessmentCEFR: "B2"
                },
                
                // Status 4: Hired (Confirmed) - 2 candidates
                {
                    candidateName: "Sophia Martinez",
                    candidateEmail: "sophia.m@example.com",
                    candidatePhone: "01112223351",
                    stage: "Production",
                    status: "Hired (Confirmed)",
                    currentStatus: "Hired (Confirmed)",
                    applicationDate: "2024-01-10",
                    hireDate: "2024-01-25",
                    daysInStage: 165,
                    probationDays: 165,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "C1",
                    bonusPaid: true
                },
                {
                    candidateName: "Benjamin Anderson",
                    candidateEmail: "benjamin.a@example.com",
                    candidatePhone: "01112223352",
                    stage: "Team Lead",
                    status: "Graduate",
                    currentStatus: "Hired (Confirmed)",
                    applicationDate: "2023-11-05",
                    hireDate: "2023-11-20",
                    daysInStage: 253,
                    probationDays: 253,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "C1",
                    bonusPaid: true
                },
                
                // Status 5: Previously Applied (No Payment) - 2 candidates
                {
                    candidateName: "Chloe Thomas",
                    candidateEmail: "chloe.t@example.com",
                    candidatePhone: "01112223353",
                    stage: "Application",
                    status: "Previously Applied (No Payment)",
                    currentStatus: "Previously Applied (No Payment)",
                    applicationDate: "2024-02-15",
                    hireDate: null,
                    daysInStage: 144,
                    category: "Internal",
                    source: "Employee Referral",
                    isPreviousCandidate: true,
                    needsAction: false,
                    assessmentCEFR: "B2",
                    previousApplicationDate: "2023-08-10"
                },
                {
                    candidateName: "William Jackson",
                    candidateEmail: "william.j@example.com",
                    candidatePhone: "01112223354",
                    stage: "Screening",
                    status: "Previously Applied (No Payment)",
                    currentStatus: "Previously Applied (No Payment)",
                    applicationDate: "2024-05-01",
                    hireDate: null,
                    daysInStage: 69,
                    category: "External",
                    source: "Career Site",
                    isPreviousCandidate: true,
                    needsAction: false,
                    assessmentCEFR: "C1",
                    previousApplicationDate: "2023-12-15"
                },
                
                // Status 6: Not Selected - 3 candidates with different reasons
                {
                    candidateName: "Mia White",
                    candidateEmail: "mia.w@example.com",
                    candidatePhone: "01112223355",
                    stage: "Assessment",
                    status: "Eliminated - Assessment Results Did Not Meet Criteria",
                    currentStatus: "Not Selected",
                    applicationDate: "2024-06-20",
                    hireDate: null,
                    daysInStage: 12,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "A2",
                    assessmentScore: 45
                },
                {
                    candidateName: "Ethan Harris",
                    candidateEmail: "ethan.h@example.com",
                    candidatePhone: "01112223356",
                    stage: "Interview",
                    status: "Withdrew - Other Job Offer",
                    currentStatus: "Not Selected",
                    applicationDate: "2024-05-25",
                    hireDate: null,
                    daysInStage: 45,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: "B2"
                },
                {
                    candidateName: "Ava Clark",
                    candidateEmail: "ava.c@example.com",
                    candidatePhone: "01112223357",
                    stage: "Screening",
                    status: "Eliminated - Location/Country",
                    currentStatus: "Not Selected",
                    applicationDate: "2024-07-02",
                    hireDate: null,
                    daysInStage: 6,
                    category: "External",
                    source: "xRAF",
                    isPreviousCandidate: false,
                    needsAction: false,
                    assessmentCEFR: null
                }
            ],
            earnings: [
                {
                    id: "E2024-001",
                    candidate: "Sophia Martinez",
                    date: "2024-04-25",
                    type: "probation",
                    amount: 750,
                    status: "paid"
                },
                {
                    id: "E2024-002",
                    candidate: "Benjamin Anderson",
                    date: "2024-02-20",
                    type: "probation",
                    amount: 750,
                    status: "paid"
                },
                {
                    id: "E2024-003",
                    candidate: "Emma Rodriguez",
                    date: "2024-06-29",
                    type: "assessment",
                    amount: 50,
                    status: "paid"
                },
                {
                    id: "E2024-004",
                    candidate: "David Kim",
                    date: "2024-06-28",
                    type: "assessment",
                    amount: 50,
                    status: "paid"
                },
                {
                    id: "E2024-005",
                    candidate: "James Wilson",
                    date: null,
                    type: "probation",
                    amount: 750,
                    status: "pending",
                    expectedDate: "2024-09-03"
                },
                {
                    id: "E2024-006",
                    candidate: "Olivia Brown",
                    date: null,
                    type: "probation",
                    amount: 750,
                    status: "pending",
                    expectedDate: "2024-07-30"
                }
            ],
            performanceStats: {
                totalReferrals: 15,
                hiredRate: 46.7,  // 7 hired out of 15
                completionRate: 86.7,  // 13 out of 15 completed process
                avgAssessmentScore: 78.4,
                topSource: "xRAF"
            }
        }
    };
}

// Export for use in script.js
window.fetchReferrals = fetchReferrals;
window.getMockData = getMockData;
