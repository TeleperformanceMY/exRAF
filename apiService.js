const API_CONFIG = {
    candidateEndpoint: 'https://your-candidate-details-endpoint.com',
    assessmentEndpoint: 'https://your-assessment-results-endpoint.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
    }
};

async function fetchReferrals(phone, email) {
    try {
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
        
        const candidateData = await candidatesResponse.json();
        const assessmentData = await assessmentResponse.json();
        
        // Process candidate data
        const referrals = [];
        const emailMap = new Map();
        
        // First pass: create email map with most recent entries
        candidateData.forEach(candidate => {
            const candidateEmail = candidate.Person_Email;
            const existing = emailMap.get(candidateEmail);
            const candidateDate = new Date(candidate.updated_date);
            
            // Update if: no existing, xRAF source, or newer xRAF record
            if (!existing || 
                (candidate.source_name === 'xRAF' && existing.source_name !== 'xRAF') ||
                (candidate.source_name === 'xRAF' && candidateDate > existing.updatedDate)) {
                
                emailMap.set(candidateEmail, {
                    id: candidate.system_ID,
                    fullName: `${candidate['First Name']} ${candidate['Last Name']}`,
                    email: candidate.Person_Email,
                    phone: candidate.default_phone,
                    sourceName: candidate.source_name,
                    updatedDate: candidateDate,
                    recentStatus: candidate.recent_status
                });
            }
        });
        
        // Create CEFR map from assessment data
        const cefrMap = new Map();
        assessmentData.forEach(assessment => {
            cefrMap.set(assessment.Email, assessment.CEFR);
        });
        
        // Second pass: determine status
        emailMap.forEach((candidate, email) => {
            const cefr = cefrMap.get(email);
            let status;
            
            if (candidate.sourceName !== 'xRAF') {
                status = "Previously Applied (No Payment)";
            } else if (!cefr) {
                status = "Application Received";
            } else if (["C2", "C1", "B2"].includes(cefr)) {
                status = "Passed Assessment";
            } else if (["B1", "A2", "A1"].includes(cefr)) {
                status = "Not Selected";
            } else {
                status = "Application Received";
            }
            
            referrals.push({
                candidateName: candidate.fullName,
                candidateEmail: candidate.email,
                candidatePhone: candidate.phone,
                stage: status,
                currentStatus: status,
                applicationDate: candidate.updatedDate.toISOString().split('T')[0],
                isPreviousCandidate: candidate.sourceName !== 'xRAF',
                source: candidate.sourceName
            });
        });
        
        return {
            referrer: { phone, email, fullName: "Referrer Name" },
            referrals
        };
        
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}
