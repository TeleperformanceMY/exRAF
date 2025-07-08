document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    let currentLanguage = 'en';
    let statusChart = null;
    let currentReferralData = null; // Store current data
    
    // API Configuration
    const API_CONFIG = {
        endpoint: 'https://your-api-endpoint.com/getReferrals', // Replace with actual endpoint
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN' // Replace with actual token
        }
    };

    // Make sure translations are loaded
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded! Make sure translations.js is included before script.js');
    }
    
    if (typeof statusMapping === 'undefined') {
        console.error('Status mapping not loaded! Make sure statusMapping.js is included before script.js');
    }
    
    if (typeof earningsStructure === 'undefined') {
        console.error('Earnings structure not defined! Adding default...');
        window.earningsStructure = {
            assessment: {
                amount: 50,
                label: "Pass Assessment",
                description: "Paid when candidate passes AI Interview assessment"
            },
            probation: { 
                amount: 750, 
                label: "Complete Probation (90 days)",
                description: "Paid only for new candidates who complete 90 days"
            }
        };
    }

    // Function to calculate days between dates
    function calculateDays(startDate, endDate = new Date()) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Function to process referral data from API - FIXED to return empty array
    function processReferralData(apiData) {
        if (!apiData || !apiData.referrals) return []; // Return empty array instead of null
        
        return apiData.referrals.map(referral => {
            // Calculate days in stage
            let daysInStage = 0;
            if (referral.hireDate) {
                // If hired, calculate from hire date
                daysInStage = calculateDays(referral.hireDate);
            } else {
                // Otherwise, calculate from application date
                daysInStage = calculateDays(referral.applicationDate);
            }
            
            // Map status to simplified status type
            const statusType = getSimplifiedStatusType(referral.currentStatus);
            
            // Determine if action is needed (only for Assessment stage)
            const needsAction = statusType === 'assessment' && !referral.isPreviousCandidate;
            
            return {
                name: referral.candidateName,
                email: referral.candidateEmail,
                phone: referral.candidatePhone,
                stage: referral.stage,
                status: referral.currentStatus,
                statusType: statusType,
                applicationDate: referral.applicationDate,
                hireDate: referral.hireDate || '',
                daysInStage: daysInStage,
                category: referral.category,
                source: referral.source,
                needsAction: needsAction,
                isPreviousCandidate: referral.isPreviousCandidate || false
            };
        });
    }

    // Function to map a status to its simplified group
    function mapStatusToGroup(status) {
        if (!statusMapping.statusGroups) return status;
        
        for (const [group, statuses] of Object.entries(statusMapping.statusGroups)) {
            if (statuses.includes(status)) {
                return group;
            }
        }
        
        // If not found in any group, check if it starts with "Eliminated" or "Withdrew"
        if (status.startsWith("Eliminated") || status.startsWith("Withdrew") || status.startsWith("Legacy")) {
            return "Not Selected";
        }
        
        return status;
    }

    // Helper function to get simplified status type
    function getSimplifiedStatusType(status) {
        const mappedStatus = mapStatusToGroup(status);
        
        // Simplified 6-status system
        switch(mappedStatus) {
            case "Hired (Confirmed)":
                return "passed";
            case "Hired (Probation)":
                return "probation";
            case "Previously Applied (No Payment)":
                return "previouslyApplied";
            case "Passed Assessment":
                return "passedAssessment";
            case "Application Received":
                return "received";
            case "Not Selected":
                return "failed";
            default:
                // Handle edge cases
                if (status.includes("Final Review") || status.includes("Interview")) {
                    return "passedAssessment"; // They passed assessment to reach these stages
                }
                return "received";
        }
    }

    // Update translations
    function updateTranslations() {
        if (typeof translations === 'undefined') {
            console.error('Translations object not found!');
            return;
        }
        
        const translation = translations[currentLanguage];
        if (!translation) {
            console.error('Translation not found for language:', currentLanguage);
            return;
        }
        
        // Update text content
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) {
                el.textContent = translation[key];
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) {
                el.placeholder = translation[key];
            }
        });
    }
    
    // Language flag click handler
    document.querySelectorAll('.lang-flag').forEach(flag => {
        flag.addEventListener('click', function() {
            // Remove active class from all flags
            document.querySelectorAll('.lang-flag').forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked flag
            this.classList.add('active');
            
            // Update language
            currentLanguage = this.dataset.lang;
            console.log('Language changed to:', currentLanguage);
            updateTranslations();
            
            // Refresh displays if data exists
            if (currentReferralData) {
                const processedReferrals = processReferralData(currentReferralData);
                updateChart(processedReferrals);
                updateEarningsTable(processedReferrals);
                updateReminderSection(processedReferrals);
                updateReferralList(processedReferrals);
            }
        });
    });
    
    // Validate phone number
    function validatePhone(phone) {
        const regex = /^01\d{8,9}$/;
        return regex.test(phone);
    }
    
    // Validate email (case insensitive)
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        return regex.test(email) && email.length <= 254;
    }
    
    // Show error message
    function showError(input, message) {
        const formControl = input.closest('.mb-3');
        const error = formControl.querySelector('.invalid-feedback');
        
        formControl.classList.add('was-validated');
        error.textContent = message;
        error.style.display = 'block';
        input.classList.add('is-invalid');
    }
    
    // Clear error
    function clearError(input) {
        const formControl = input.closest('.mb-3');
        const error = formControl.querySelector('.invalid-feedback');
        
        formControl.classList.remove('was-validated');
        error.style.display = 'none';
        input.classList.remove('is-invalid');
    }
    
    // Fetch referrals from API
    async function fetchReferrals(phone, email) {
        try {
            // For testing, always return null to simulate no user found
            // Remove this in production
            if (API_CONFIG.endpoint.includes('your-api-endpoint')) {
                console.log('Using test mode - no user found');
                return null;
            }
            
            const response = await fetch(API_CONFIG.endpoint, {
                method: 'POST',
                headers: API_CONFIG.headers,
                body: JSON.stringify({
                    phone: phone,
                    email: email
                })
            });
            
            const data = await response.json();
            
            if (data.success && data.data) {
                return data.data;
            } else {
                console.error('API Error:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Network Error:', error);
            return null;
        }
    }
    
    // Get status badge color with payment eligibility check - REMOVED DUPLICATE
    function getStatusBadgeColor(statusType, daysInStage = 0, isPreviousCandidate = false) {
        if (isPreviousCandidate) {
            return 'secondary'; // Gray for previously applied
        }
        
        switch(statusType) {
            case 'passed':
                return 'success'; // Dark green (confirmed with payment)
            case 'passedAssessment':
                return 'success'; // Light green (passed with payment)
            case 'probation':
                return 'warning'; // Yellow
            case 'previouslyApplied':
                return 'secondary'; // Gray
            case 'received':
                return 'primary'; // Blue
            case 'failed':
                return 'danger'; // Red
            default:
                return 'secondary';
        }
    }
    
    // Update earnings table
    function updateEarningsTable(referrals) {
        const earningsBody = document.getElementById('earnings-body');
        if (!earningsBody) return; // Guard clause
        
        earningsBody.innerHTML = '';
        
        let totalEarnings = 0;
        
        // Calculate assessment passes (not previously applied)
        const assessmentPasses = referrals.filter(r => 
            (r.statusType === 'passedAssessment' || r.statusType === 'probation' || 
             r.statusType === 'passed') && 
            !r.isPreviousCandidate
        );
        
        // Calculate probation completions (not previously applied)
        const probationCompletions = referrals.filter(r => 
            r.statusType === 'passed' && 
            r.daysInStage >= 90 && 
            !r.isPreviousCandidate
        );
        
        // Add rows for each earning type
        Object.entries(earningsStructure).forEach(([key, earning]) => {
            const count = key === 'assessment' ? assessmentPasses.length : probationCompletions.length;
            const total = count * earning.amount;
            totalEarnings += total;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${earning.label}</td>
                <td>RM ${earning.amount}</td>
                <td>${count}</td>
                <td>RM ${total}</td>
            `;
            earningsBody.appendChild(row);
        });
        
        // Update total earnings
        const totalEarningsEl = document.getElementById('total-earnings');
        if (totalEarningsEl) {
            totalEarningsEl.textContent = `RM ${totalEarnings}`;
        }
    }
    
    // Update reminder section - ONLY FOR APPLICATION RECEIVED
    function updateReminderSection(referrals) {
        const friendsToRemind = document.getElementById('friends-to-remind');
        if (!friendsToRemind) return; // Guard clause
        
        friendsToRemind.innerHTML = '';
        
        // Filter for Application Received only
        const friendsNeedingReminder = referrals
            .filter(r => r.statusType === 'received' && !r.isPreviousCandidate)
            .sort((a, b) => b.daysInStage - a.daysInStage);
        
        if (friendsNeedingReminder.length === 0) {
            const translation = translations[currentLanguage] || translations.en;
            friendsToRemind.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-success fade-in-up">
                        <i class="fas fa-check-circle me-2"></i>
                        <span>${translation.noRemindersNeeded || 'All your friends are on track!'}</span>
                    </div>
                </div>
            `;
            return;
        }
        
        friendsNeedingReminder.forEach((friend, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-3';
            
            const translation = translations[currentLanguage] || translations.en;
            const statusTranslation = translation.statusReceived || 'Application Received';
            
            col.innerHTML = `
                <div class="friend-to-remind status-${friend.statusType} fade-in-up" style="animation-delay: ${index * 0.1}s">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5><i class="fas fa-user me-2"></i>${friend.name}</h5>
                        <span class="badge status-badge bg-primary">
                            ${statusTranslation}
                        </span>
                    </div>
                    <p class="small text-muted mb-2">
                        <i class="fas fa-envelope me-1"></i>${friend.email}
                    </p>
                    <p class="small mb-2">
                        <strong><i class="fas fa-calendar-alt me-1"></i>${translation.referralDays || 'Days in Stage'}:</strong> ${friend.daysInStage}
                    </p>
                    <button class="btn btn-sm btn-success w-100 remind-btn" 
                            data-name="${friend.name}" 
                            data-phone="${friend.phone}">
                        <i class="fab fa-whatsapp me-2"></i>${translation.remindBtn || 'Send WhatsApp Reminder'}
                    </button>
                </div>
            `;
            
            friendsToRemind.appendChild(col);
        });
    }
    
    // Form submission
    document.getElementById('dashboard-submit').addEventListener('click', async function() {
        const phone = document.getElementById('dashboard-phone').value.trim();
        const email = document.getElementById('dashboard-email').value.trim();
        let isValid = true;
        
        const button = this;
        const originalText = button.innerHTML;
        
        // Validate phone
        if (!phone) {
            showError(document.getElementById('dashboard-phone'), 
                     (translations[currentLanguage] || translations.en).phoneError || 'Please provide a valid phone number');
            isValid = false;
        } else if (!validatePhone(phone)) {
            showError(document.getElementById('dashboard-phone'), 
                     (translations[currentLanguage] || translations.en).phoneError || 'Please provide a valid phone number');
            isValid = false;
        } else {
            clearError(document.getElementById('dashboard-phone'));
        }
        
        // Validate email
        if (!email) {
            showError(document.getElementById('dashboard-email'), 
                     (translations[currentLanguage] || translations.en).emailError || 'Please provide a valid email address');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(document.getElementById('dashboard-email'), 
                     (translations[currentLanguage] || translations.en).emailError || 'Please provide a valid email address');
            isValid = false;
        } else {
            clearError(document.getElementById('dashboard-email'));
        }
        
        if (!isValid) return;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        button.disabled = true;
        
        // Force test mode for specific phone number
        if (phone === '0000000000') {
            console.log('Test mode activated - forcing empty dashboard');
            // Simulate delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                
                const emptyData = {
                    referrer: {
                        phone: phone,
                        email: email,
                        fullName: "Test User"
                    },
                    referrals: []
                };
                
                currentReferralData = emptyData;
                const processedReferrals = processReferralData(emptyData);
                showReferralResults(processedReferrals, emptyData.referrer, true);
                
                // Show popup
                setTimeout(() => {
                    showUserNotFoundPopup();
                }, 300);
            }, 500);
            return;
        }
        
        try {
            // Fetch data from API
            const apiData = await fetchReferrals(phone, email);
            
            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Always show dashboard, even if no user found
            if (!apiData) {
                console.log('No user found - showing empty dashboard');
                
                // Create empty data structure for new users
                const emptyData = {
                    referrer: {
                        phone: phone,
                        email: email,
                        fullName: "New User"
                    },
                    referrals: []
                };
                
                // Store empty data
                currentReferralData = emptyData;
                
                // Process and show results with empty referrals
                const processedReferrals = processReferralData(emptyData);
                showReferralResults(processedReferrals, emptyData.referrer, true);
                
                // Show popup message after dashboard is displayed
                setTimeout(() => {
                    showUserNotFoundPopup();
                }, 300);
                
            } else {
                // Store current data
                currentReferralData = apiData;
                
                // Process and show results
                const processedReferrals = processReferralData(apiData);
                showReferralResults(processedReferrals, apiData.referrer, false);
            }
            
        } catch (error) {
            console.error('Error fetching referrals:', error);
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show dashboard with empty data on error too
            const emptyData = {
                referrer: {
                    phone: phone,
                    email: email,
                    fullName: "Guest User"
                },
                referrals: []
            };
            
            currentReferralData = emptyData;
            const processedReferrals = processReferralData(emptyData);
            showReferralResults(processedReferrals, emptyData.referrer, true);
            
            // Show popup after dashboard
            setTimeout(() => {
                showUserNotFoundPopup();
            }, 300);
        }
    });
    
    // Show user not found popup
    function showUserNotFoundPopup() {
        // Create modal HTML dynamically
        const modalHtml = `
            <div class="modal fade" id="userNotFoundModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-dark">
                            <h5 class="modal-title text-white">Welcome to xRAF!</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-user-plus fa-3x mb-3"></i>
                                <p>We couldn't find an account with the provided email and phone number.</p>
                                <p class="text-muted">Don't worry! You can still explore the dashboard and see how the referral program works.</p>
                            </div>
                            <div class="alert alert-secondary">
                                <i class="fas fa-info-circle me-2"></i>
                                <strong>New to xRAF?</strong> Start referring friends to TP and earn up to RM800 per successful hire!
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Explore Dashboard</button>
                            <a href="https://tpmyandtpth.github.io/xRAF/" class="btn btn-success">
                                <i class="fas fa-user-plus me-2"></i>Start Referring
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body if it doesn't exist
        if (!document.getElementById('userNotFoundModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
        
        // Show the modal
        const userNotFoundModal = new bootstrap.Modal(document.getElementById('userNotFoundModal'));
        userNotFoundModal.show();
        
        // Clean up modal after it's hidden
        document.getElementById('userNotFoundModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    }
    
    // Show referral results - FIXED SYNTAX ERROR
    function showReferralResults(referrals, referrerInfo, isNewUser = false) {
        document.getElementById('auth-step').style.display = 'none';
        document.getElementById('results-step').style.display = 'block';
        
        const translation = translations[currentLanguage] || translations.en;
        
        // Adjust the name display for new users
        const displayName = isNewUser ? 'Welcome!' : (referrerInfo ? referrerInfo.fullName : 'User');
        
        // Create results content - FIXED: Properly closed string literal
        const resultsContent = `
            <div class="d-flex justify-content-between align-items-start mb-4 fade-in-up">
                <div>
                    <h3 class="user-name-display"><i class="fas fa-user-tie me-2"></i>${displayName}</h3>
                    <h4 data-translate="yourReferralsTitle"><i class="fas fa-users me-2"></i>${translation.yourReferralsTitle}</h4>
                </div>
                <button id="dashboard-back" class="btn btn-outline-secondary" data-translate="backBtn">
                    <i class="fas fa-arrow-left me-2"></i> ${translation.backBtn}
                </button>
            </div>
            
            <div id="referral-stats" class="row mb-4">
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.1s">
                        <h3 id="total-referrals">${referrals.length}</h3>
                        <h5 data-translate="totalReferrals"><i class="fas fa-users me-2"></i>${translation.totalReferrals}</h5>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.2s">
                        <h3 class="text-success" id="hired-referrals">${referrals.filter(r => r.statusType === 'passed' || r.statusType === 'probation').length}</h3>
                        <h5 data-translate="hiredReferrals"><i class="fas fa-check-circle me-2"></i>${translation.hiredReferrals}</h5>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.3s">
                        <h3 class="text-warning" id="progress-referrals">${referrals.filter(r => ['received', 'passedAssessment'].includes(r.statusType)).length}</h3>
                        <h5 data-translate="inProgress"><i class="fas fa-clock me-2"></i>${translation.inProgress}</h5>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.4s">
                <div class="card-body">
                    <h5 class="card-title text-center mb-3" data-translate="statusDistribution">
                        <i class="fas fa-chart-pie me-2"></i>${translation.statusDistribution}
                    </h5>
                    <div class="chart-container">
                        <canvas id="statusChart"></canvas>
                        <img src="TPLogo11.png" class="chart-logo" alt="TP Logo">
                    </div>
                    <div class="chart-legend text-center mt-3" id="chartLegend"></div>
                </div>
            </div>

            <div class="card mb-4 fade-in-up" style="animation-delay: 0.5s">
                <div class="card-body">
                    <h5 class="card-title text-center mb-3" data-translate="earningsTitle">
                        <i class="fas fa-money-bill-wave me-2"></i>${translation.earningsTitle}
                    </h5>
                    <div class="table-responsive">
                        <table class="earnings-table">
                            <thead>
                                <tr>
                                    <th data-translate="earningsStage">${translation.earningsStage}</th>
                                    <th data-translate="earningsAmount">${translation.earningsAmount}</th>
                                    <th data-translate="earningsCount">${translation.earningsCount}</th>
                                    <th data-translate="earningsTotal">${translation.earningsTotal}</th>
                                </tr>
                            </thead>
                            <tbody id="earnings-body"></tbody>
                            <tfoot>
                                <tr>
                                    <th data-translate="earningsTotal">${translation.earningsTotal}</th>
                                    <th></th>
                                    <th></th>
                                    <th id="total-earnings">RM 0</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-outline-primary btn-lg" data-bs-toggle="modal" data-bs-target="#tngModal" data-translate="paymentNote">
                            <i class="fas fa-info-circle me-2"></i>${translation.paymentNote || 'View Payment Terms'}
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="reminder-section" class="card mb-4 fade-in-up" style="animation-delay: 0.6s">
                <div class="card-body">
                    <h5 class="card-title text-center mb-3" data-translate="remindFriendsTitle">
                        <i class="fas fa-bell me-2"></i>${translation.remindFriendsTitle}
                    </h5>
                    <p class="text-center text-muted" data-translate="remindFriendsText">
                        ${translation.remindFriendsText}
                    </p>
                    <div id="friends-to-remind" class="row"></div>
                </div>
            </div>
            
            <div id="referral-list"></div>
            
            <!-- Status Examples Section - Always visible -->
            <div class="card mb-4 status-examples fade-in-up" style="animation-delay: 0.7s">
                <div class="card-body">
                    <h5 class="card-title text-center mb-4">
                        <i class="fas fa-info-circle me-2"></i>Status Examples
                    </h5>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="status-example status-received">
                                <h5><i class="fas fa-file-alt me-2 text-primary"></i>Application Received</h5>
                                <p>Initial stage - Remind to take assessment</p>
                                <span class="badge bg-primary">${translation.statusReceived || 'Application Received'}</span>
                            </div>
                            <div class="status-example status-passedAssessment">
                                <h5><i class="fas fa-check-circle me-2 text-success"></i>Passed Assessment 💵</h5>
                                <p>Passed AI Interview - RM50 earned</p>
                                <span class="badge bg-success">${translation.statusAssessmentPassed || 'Passed Assessment'}</span>
                            </div>
                            <div class="status-example status-probation">
                                <h5><i class="fas fa-clock me-2 text-warning"></i>Hired (Probation)</h5>
                                <p>Hired but under 90 days</p>
                                <span class="badge bg-warning text-dark">${translation.statusProbation || 'Hired (Probation)'}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="status-example status-passed">
                                <h5><i class="fas fa-check-circle me-2 text-success"></i>Hired (Confirmed) 💵</h5>
                                <p>Completed 90+ days - RM750 earned</p>
                                <span class="badge bg-success">${translation.statusPassed || 'Hired (Confirmed)'}</span>
                            </div>
                            <div class="status-example status-previouslyApplied">
                                <h5><i class="fas fa-ban me-2 text-secondary"></i>Previously Applied</h5>
                                <p>No payment will be made</p>
                                <span class="badge bg-secondary">${translation.statusPreviouslyApplied || 'Previously Applied'}</span>
                            </div>
                            <div class="status-example status-failed">
                                <h5><i class="fas fa-times-circle me-2 text-danger"></i>Not Selected</h5>
                                <p>Failed assessment or withdrew</p>
                                <span class="badge bg-danger">${translation.statusFailed || 'Not Selected'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Getting Started Section for New Users -->
            ${isNewUser || referrals.length === 0 ? `
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.8s; border: 2px dashed #000;">
                <div class="card-body text-center">
                    <h5 class="card-title">
                        <i class="fas fa-rocket me-2"></i>Ready to Start Earning?
                    </h5>
                    <p class="mb-3">Start referring friends to TP and track their progress here!</p>
                    <a href="https://tpmyandtpth.github.io/xRAF/" class="btn btn-primary btn-lg">
                        <i class="fas fa-user-plus me-2"></i>Start Referring Now
                    </a>
                </div>
            </div>
            ` : ''}
            
            <!-- Social Media -->
            <div class="mt-4 fade-in-up" style="animation-delay: 0.9s">
                <div class="row text-center">
                    <!-- TP Global -->
                    <div class="col-md-4 mb-3">
                        <h5 data-translate="tpGlobal">${translation.tpGlobal}</h5>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="https://www.linkedin.com/company/teleperformance" class="social-icon" target="_blank"><i class="fab fa-linkedin"></i></a>
                            <a href="https://www.youtube.com/@TeleperformanceGroup" class="social-icon" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a href="https://www.tiktok.com/@teleperformance_group" class="social-icon" target="_blank"><i class="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                    <!-- TP Malaysia -->
                    <div class="col-md-4 mb-3">
                        <h5 data-translate="followMalaysia">${translation.followMalaysia}</h5>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="https://www.facebook.com/TPinMalaysia/" class="social-icon" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="http://www.instagram.com/tp_malaysia/" class="social-icon" target="_blank"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <!-- TP Thailand -->
                    <div class="col-md-4 mb-3">
                        <h5 data-translate="followThailand">${translation.followThailand}</h5>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="http://www.facebook.com/TPinThailand/" class="social-icon" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="http://www.instagram.com/tpinthailand/" class="social-icon" target="_blank"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('results-step').innerHTML = resultsContent;
        
        // Update all components
        updateChart(referrals);
        updateEarningsTable(referrals);
        updateReminderSection(referrals);
        updateReferralList(referrals);
        
        // Re-attach back button event
        document.getElementById('dashboard-back').addEventListener('click', function() {
            document.getElementById('auth-step').style.display = 'block';
            document.getElementById('results-step').style.display = 'none';
            
            // Destroy chart when going back
            if (statusChart) {
                statusChart.destroy();
                statusChart = null;
            }
            
            // Clear stored data
            currentReferralData = null;
        });
        
        // Update translations
        updateTranslations();
    }
    
    // Update referral list
    function updateReferralList(referrals) {
        const referralList = document.getElementById('referral-list');
        if (!referralList) return; // Guard clause
        
        referralList.innerHTML = '';
        
        const translation = translations[currentLanguage] || translations.en;
        
        if (referrals.length === 0) {
            referralList.innerHTML = `
                <div class="card fade-in-up">
                    <div class="card-body text-center">
                        <i class="fas fa-user-slash fa-3x text-muted mb-3"></i>
                        <h5>${translation.noReferrals || 'You don\'t have any referrals yet'}</h5>
                    </div>
                </div>
            `;
            return;
        }
        
        // Sort referrals by status importance
        const statusOrder = ['passed', 'passedAssessment', 'probation', 'previouslyApplied', 'received', 'failed'];
            
        const sortedReferrals = [...referrals].sort((a, b) => {
            return statusOrder.indexOf(a.statusType) - statusOrder.indexOf(b.statusType);
        });
        
        // Create referral list card
        const referralListCard = document.createElement('div');
        referralListCard.className = 'card mb-4 fade-in-up';
        referralListCard.style.animationDelay = '0.8s';
        referralListCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-center mb-3">
                    <i class="fas fa-list me-2"></i>
                    <span>${translation.yourReferralsTitle || 'Your Referrals'}</span>
                </h5>
                <div id="referral-items"></div>
            </div>
        `;
        
        referralList.appendChild(referralListCard);
        
        const referralItems = document.getElementById('referral-items');
        
        sortedReferrals.forEach((referral, index) => {
            const item = document.createElement('div');
            
            // Get status translation
            let statusTranslation = referral.status;
            if (referral.statusType === 'passed') {
                statusTranslation = translation.statusPassed || 'Hired (Confirmed)';
            } else if (referral.statusType === 'passedAssessment') {
                statusTranslation = translation.statusAssessmentPassed || 'Passed Assessment';
            } else if (referral.statusType === 'probation') {
                statusTranslation = translation.statusProbation || 'Hired (Probation)';
            } else if (referral.statusType === 'previouslyApplied') {
                statusTranslation = translation.statusPreviouslyApplied || 'Previously Applied';
            } else if (referral.statusType === 'received') {
                statusTranslation = translation.statusReceived || 'Application Received';
            } else if (referral.statusType === 'failed') {
                statusTranslation = translation.statusFailed || 'Not Selected';
            }
            
            // Determine if payment is eligible
            const isPaymentEligible = (referral.statusType === 'passed' || referral.statusType === 'passedAssessment') && 
                                      !referral.isPreviousCandidate;
            
            item.className = `card mb-3 status-${referral.statusType} ${isPaymentEligible ? 'payment-eligible' : ''} slide-in`;
            item.style.animationDelay = `${0.9 + (index * 0.1)}s`;
            
            // Only show WhatsApp button for Application Received
            const showRemindButton = referral.statusType === 'received' && !referral.isPreviousCandidate;
            
            item.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h6 class="mb-1">
                                <i class="fas fa-user me-2"></i>${referral.name}
                                ${isPaymentEligible ? '💵' : ''}
                            </h6>
                            <p class="mb-1 text-muted small">
                                <i class="fas fa-envelope me-1"></i>${referral.email}
                            </p>
                        </div>
                        <span class="badge status-badge bg-${getStatusBadgeColor(referral.statusType, referral.daysInStage, referral.isPreviousCandidate)}">
                            ${statusTranslation}
                        </span>
                    </div>
                    <div class="row">
                        <div class="col-md-3 mb-2">
                            <small class="text-muted d-block">
                                <i class="fas fa-layer-group me-1"></i>
                                ${translation.referralStage || 'Stage'}
                            </small>
                            <span class="fw-bold">${referral.stage || 'N/A'}</span>
                        </div>
                        <div class="col-md-3 mb-2">
                            <small class="text-muted d-block">
                                <i class="fas fa-calendar-alt me-1"></i>
                                ${translation.referralDate || 'Application Date'}
                            </small>
                            <span class="fw-bold">${new Date(referral.applicationDate).toLocaleDateString()}</span>
                        </div>
                        <div class="col-md-3 mb-2">
                            <small class="text-muted d-block">
                                <i class="fas fa-clock me-1"></i>
                                ${translation.referralDays || 'Days in Stage'}
                            </small>
                            <span class="fw-bold">${referral.daysInStage}</span>
                        </div>
                        <div class="col-md-3 mb-2">
                            ${showRemindButton ? `
                            <button class="btn btn-sm btn-success w-100 remind-btn" 
                                    data-name="${referral.name}" 
                                    data-phone="${referral.phone}">
                                <i class="fab fa-whatsapp me-2"></i>${translation.remindBtn || 'WhatsApp'}
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
            
            referralItems.appendChild(item);
        });
    }
    
    // Update chart with referral data - handle empty data
    function updateChart(referrals) {
        const chartCanvas = document.getElementById('statusChart');
        if (!chartCanvas) return; // Guard clause
        
        const ctx = chartCanvas.getContext('2d');
        const translation = translations[currentLanguage] || translations.en;
        
        // Count statuses for 6-status system
        let statusCounts = {
            received: referrals.filter(r => r.statusType === 'received').length,
            passedAssessment: referrals.filter(r => r.statusType === 'passedAssessment').length,
            probation: referrals.filter(r => r.statusType === 'probation').length,
            passed: referrals.filter(r => r.statusType === 'passed').length,
            previouslyApplied: referrals.filter(r => r.statusType === 'previouslyApplied').length,
            failed: referrals.filter(r => r.statusType === 'failed').length
        };
        
        // Check if all counts are zero
        const hasData = Object.values(statusCounts).some(count => count > 0);
        
        // Chart data for 6-status system
        const data = {
            labels: [
                translation.statusReceived || 'Application Received',
                translation.statusAssessmentPassed || 'Passed Assessment',
                translation.statusProbation || 'Hired (Probation)',
                translation.statusPassed || 'Hired (Confirmed)',
                translation.statusPreviouslyApplied || 'Previously Applied',
                translation.statusFailed || 'Not Selected'
            ],
            datasets: [{
                data: hasData ? [
                    statusCounts.received,
                    statusCounts.passedAssessment,
                    statusCounts.probation,
                    statusCounts.passed,
                    statusCounts.previouslyApplied,
                    statusCounts.failed
                ] : [1, 1, 1, 1, 1, 1], // Show equal parts if no data
                backgroundColor: [
                    '#666666', // Gray - Application Received
                    '#000000', // Black - Passed Assessment
                    '#999999', // Light Gray - Probation
                    '#000000', // Black - Confirmed
                    '#e0e0e0', // Very Light Gray - Previously Applied
                    '#cccccc'  // Light Gray - Not Selected
                ],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: hasData ? 8 : 0
            }]
        };

        // Destroy previous chart if exists
        if (statusChart) {
            statusChart.destroy();
        }

        // Create new chart with enhanced styling
        statusChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        display: false // We'll create custom legend below
                    },
                    tooltip: {
                        enabled: hasData, // Disable tooltips if no data
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#fff',
                        borderWidth: 1,
                        cornerRadius: 4,
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                if (!hasData) return 'No data yet';
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 800,
                    easing: 'easeOutQuart'
                }
            }
        });

        // Create custom legend below chart
        const legendContainer = document.getElementById('chartLegend');
        if (legendContainer) {
            legendContainer.innerHTML = '';
            
            // Add "No data" message if empty
            if (!hasData) {
                const noDataMsg = document.createElement('div');
                noDataMsg.className = 'text-muted mt-3';
                noDataMsg.innerHTML = '<i class="fas fa-chart-pie me-2"></i>Start referring to see your status distribution!';
                legendContainer.appendChild(noDataMsg);
            } else {
                data.labels.forEach((label, i) => {
                    const legendItem = document.createElement('span');
                    legendItem.innerHTML = `<span style="background-color: ${data.datasets[0].backgroundColor[i]}"></span>${label}`;
                    legendContainer.appendChild(legendItem);
                });
            }
        }
    }

    // Handle remind button clicks - opens WhatsApp with template message
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remind-btn') || e.target.closest('.remind-btn')) {
            const button = e.target.classList.contains('remind-btn') ? e.target : e.target.closest('.remind-btn');
            const name = button.dataset.name;
            const phone = button.dataset.phone;
            
            const message = `Hi ${name}, this is a friendly reminder to complete your AI Interview assessment for TP. ` +
                           `It's quick and easy! Please complete it at your earliest convenience to move forward with your application. Thank you!`;
            window.open(`https://wa.me/+6${phone}?text=${encodeURIComponent(message)}`, '_blank');
        }
    });

    // Initialize translations
    updateTranslations();
    
    // Auto-focus phone input
    document.getElementById('dashboard-phone').focus();
    
    // Phone number validation - only numbers
    document.getElementById('dashboard-phone').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Initialize modals
    if (document.getElementById('tngModal')) {
        const tngModal = new bootstrap.Modal(document.getElementById('tngModal'));
    }
    
    // Enhanced form interactions
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.card, .stats-card').forEach(el => {
        observer.observe(el);
    });
    
    // Mobile optimizations
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Preload images for better performance
    const imagesToPreload = ['TPLogo11.png'];
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Initialize app
    console.log('xRAF Dashboard initialized successfully');
    
    // Wait a bit for all scripts to load, then initialize translations
    setTimeout(() => {
        if (typeof translations !== 'undefined') {
            updateTranslations();
            console.log('Translations loaded successfully');
        } else {
            console.error('Translations still not loaded after delay');
        }
    }, 100);
});
