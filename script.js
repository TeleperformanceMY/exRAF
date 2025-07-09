document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // How It Works Popup Animation
    function showHowItWorksPopup() {
        const popup = document.getElementById('how-popup');
        const backdrop = document.getElementById('popup-backdrop');
        const circularFlow = document.getElementById('circular-flow');
        
        // Clear previous content
        circularFlow.innerHTML = '';
        
        // Create flow items
        const translation = translations[currentLanguage] || translations.en;
        const flowSteps = [
            { icon: 'fa-user-plus', text: translation.step1 || 'Refer a Friend', reward: null },
            { icon: 'fa-check-circle', text: translation.step2 || 'Pass Assessment', reward: 'RM50' },
            { icon: 'fa-briefcase', text: translation.step3 || 'Get Hired', reward: null },
            { icon: 'fa-calendar-check', text: translation.step4 || '90 Days', reward: 'RM750' }
        ];
        
        // Add center rotating arrow
        const centerArrow = document.createElement('div');
        centerArrow.style.position = 'absolute';
        centerArrow.style.left = '50%';
        centerArrow.style.top = '50%';
        centerArrow.style.transform = 'translate(-50%, -50%)';
        centerArrow.style.fontSize = '3rem';
        centerArrow.style.color = '#e0e0e0';
        centerArrow.style.animation = 'rotate 6s linear infinite';
        centerArrow.innerHTML = '<i class="fas fa-sync"></i>';
        circularFlow.appendChild(centerArrow);
        
        // Add rotation animation CSS if not exists
        if (!document.getElementById('rotation-style')) {
            const style = document.createElement('style');
            style.id = 'rotation-style';
            style.textContent = `
                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Position items in a circle
        const radius = 100;
        const centerX = 150;
        const centerY = 150;
        
        flowSteps.forEach((step, index) => {
            const angle = (index * 90 - 90) * (Math.PI / 180); // Start from top
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;
            
            const item = document.createElement('div');
            item.className = 'flow-item';
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            item.innerHTML = `
                <div class="flow-item-icon">
                    <i class="fas ${step.icon}"></i>
                </div>
                <div class="flow-item-text">${step.text}</div>
                ${step.reward ? `<div class="flow-item-reward">${step.reward}</div>` : ''}
            `;
            circularFlow.appendChild(item);
        });
        
        // Show popup
        backdrop.classList.add('show');
        popup.classList.add('show');
        
        // Update popup text with current language
        const popupTitle = popup.querySelector('h4');
        const popupTotal = popup.querySelector('p');
        const translation = translations[currentLanguage] || translations.en;
        
        if (popupTitle) popupTitle.textContent = translation.howItWorksTitle || 'How xRAF Works';
        if (popupTotal) popupTotal.textContent = translation.totalEarning || 'Total Earning: RM800 per successful referral';
        
        // Animate items in sequence
        let currentStep = 0;
        const animateSteps = setInterval(() => {
            // Remove active from all
            document.querySelectorAll('.flow-item').forEach(item => item.classList.remove('active'));
            
            // Add active to current
            const currentItem = document.querySelectorAll('.flow-item')[currentStep];
            currentItem.classList.add('active');
            
            // Create money particles for payment steps
            if (currentStep === 1 || currentStep === 3) {
                createMoneyParticles(currentItem, currentStep === 3);
            }
            
            currentStep = (currentStep + 1) % 4;
        }, 1500);
        
        // Auto close after 10 seconds
        const autoCloseTimer = setTimeout(() => {
            clearInterval(animateSteps);
            closeHowItWorksPopup();
        }, 10000);
        
        // Store timers for cleanup
        popup.dataset.animateTimer = animateSteps;
        popup.dataset.autoCloseTimer = autoCloseTimer;
    }
    
    function createMoneyParticles(element, isBig) {
        const rect = element.getBoundingClientRect();
        const container = document.getElementById('circular-flow');
        const containerRect = container.getBoundingClientRect();
        
        for (let i = 0; i < (isBig ? 12 : 6); i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'money-particle';
                particle.textContent = '
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
    
    // Language flag click handler - Fixed for PC
    document.querySelectorAll('.lang-flag').forEach(flag => {
        flag.addEventListener('click', function(e) {
            e.preventDefault();
            
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
                
                // Re-initialize tooltips with new language
                setTimeout(() => {
                    initializeTooltips();
                }, 100);
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
            if (count > 0) {
                row.className = 'payment-success';
            }
            row.innerHTML = `
                <td>${earning.label}</td>
                <td>RM ${earning.amount}</td>
                <td>${count}</td>
                <td><strong>RM ${total}</strong></td>
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
                        <div class="modal-header bg-info">
                            <h5 class="modal-title text-white">Welcome to xRAF!</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-user-plus fa-3x text-info mb-3"></i>
                                <p>We couldn't find an account with the provided email and phone number.</p>
                                <p class="text-muted">Don't worry! You can still explore the dashboard and see how the referral program works.</p>
                            </div>
                            <div class="alert alert-info">
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
                    ${(() => {
                        const hiredCount = referrals.filter(r => r.statusType === 'passed' && !r.isPreviousCandidate).length;
                        let rank = '';
                        let icon = '';
                        if (hiredCount >= 10) {
                            rank = 'Diamond Referrer';
                            icon = '💎';
                        } else if (hiredCount >= 5) {
                            rank = 'Gold Referrer';
                            icon = '🏆';
                        } else if (hiredCount >= 3) {
                            rank = 'Silver Referrer';
                            icon = '🥈';
                        } else if (hiredCount >= 1) {
                            rank = 'Bronze Referrer';
                            icon = '🥉';
                        }
                        return rank ? `<span class="badge bg-warning text-dark">${icon} ${rank}</span>` : '';
                    })()}
                </div>
                <div>
                    <button id="dashboard-print" class="btn btn-outline-secondary me-2" title="Print Report">
                        <i class="fas fa-print"></i>
                    </button>
                    <button id="dashboard-back" class="btn btn-outline-secondary" data-translate="backBtn">
                        <i class="fas fa-arrow-left me-2"></i> ${translation.backBtn}
                    </button>
                </div>
            </div>
            
            <div id="referral-stats" class="row mb-4">
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.1s">
                        <h3 id="total-referrals" data-target="${referrals.length}">0</h3>
                        <h5 data-translate="totalReferrals"><i class="fas fa-users me-2"></i>${translation.totalReferrals}</h5>
                        <div class="mini-progress">
                            <div class="progress" style="height: 4px;">
                                <div class="progress-bar bg-primary" style="width: ${Math.min(referrals.length * 10, 100)}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.2s">
                        <h3 class="text-success" id="hired-referrals" data-target="${referrals.filter(r => r.statusType === 'passed' || r.statusType === 'probation').length}">0</h3>
                        <h5 data-translate="hiredReferrals"><i class="fas fa-check-circle me-2"></i>${translation.hiredReferrals}</h5>
                        <div class="mini-progress">
                            <div class="progress" style="height: 4px;">
                                <div class="progress-bar bg-success" style="width: ${referrals.length > 0 ? (referrals.filter(r => r.statusType === 'passed' || r.statusType === 'probation').length / referrals.length * 100) : 0}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.3s">
                        <h3 class="text-warning" id="progress-referrals" data-target="${referrals.filter(r => ['received', 'passedAssessment'].includes(r.statusType)).length}">0</h3>
                        <h5 data-translate="inProgress"><i class="fas fa-clock me-2"></i>${translation.inProgress}</h5>
                        <div class="mini-progress">
                            <div class="progress" style="height: 4px;">
                                <div class="progress-bar bg-warning" style="width: ${referrals.length > 0 ? (referrals.filter(r => ['received', 'passedAssessment'].includes(r.statusType)).length / referrals.length * 100) : 0}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Tips -->
            ${(() => {
                const tips = [
                    'Tip: Remind your friends to complete their AI Interview within 7 days!',
                    'Tip: You can earn up to RM800 per successful referral.',
                    'Tip: Share your referral link on social media to reach more friends.',
                    'Tip: Track your earnings in real-time with our dashboard.',
                    'Tip: Press Ctrl+P to print your referral report.'
                ];
                const randomTip = tips[Math.floor(Math.random() * tips.length)];
                return `
                <div class="alert alert-info alert-dismissible fade show mb-4 fade-in-up" style="animation-delay: 0.35s">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <i class="fas fa-lightbulb me-2"></i>${randomTip}
                </div>`;
            })()}
            
            <!-- Earnings Summary Card -->
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.4s; background: var(--primary-color); color: var(--light-color);">
                <div class="card-body text-center">
                    <h4 class="mb-3">
                        <i class="fas fa-trophy me-2"></i>Earnings Summary
                    </h4>
                    <div class="row">
                        <div class="col-md-4">
                            <h3 class="mb-0">RM ${referrals.filter(r => (r.statusType === 'passedAssessment' || r.statusType === 'probation' || r.statusType === 'passed') && !r.isPreviousCandidate).length * 50}</h3>
                            <small>Assessment Earnings</small>
                        </div>
                        <div class="col-md-4">
                            <h3 class="mb-0">RM ${referrals.filter(r => r.statusType === 'passed' && r.daysInStage >= 90 && !r.isPreviousCandidate).length * 750}</h3>
                            <small>Completion Earnings</small>
                        </div>
                        <div class="col-md-4">
                            <h3 class="mb-0">RM ${referrals.filter(r => (r.statusType === 'probation' || r.statusType === 'passedAssessment') && !r.isPreviousCandidate).length * 750}</h3>
                            <small>Pending Earnings</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.45s">
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
            <!-- Progress Tracker -->
            ${(() => {
                if (typeof createProgressTracker !== 'undefined') {
                    return createProgressTracker(referrals);
                }
                return '';
            })()}
            
            <div id="referral-list"></div>
            
            <!-- Achievements Section -->
            ${(() => {
                if (typeof createAchievementDisplay !== 'undefined' && typeof calculateUserStats !== 'undefined') {
                    return createAchievementDisplay(referrals);
                }
                return '';
            })()}
            
            <!-- Goals Section -->
            ${(() => {
                if (typeof createGoalsDisplay !== 'undefined') {
                    return createGoalsDisplay(referrals);
                }
                return '';
            })()}
            
            <!-- Performance Timeline -->
            ${(() => {
                if (referrals.length > 0 && typeof createPerformanceTimeline !== 'undefined') {
                    return createPerformanceTimeline(referrals);
                }
                return '';
            })()}
            
            <!-- Tips Carousel -->
            ${(() => {
                if (typeof createTipsCarousel !== 'undefined') {
                    return createTipsCarousel();
                }
                return '';
            })()}
            
            <!-- Leaderboard -->
            ${(() => {
                if (referrals.length > 0 && typeof createLeaderboard !== 'undefined' && typeof calculateUserStats !== 'undefined') {
                    return createLeaderboard(calculateUserStats(referrals));
                }
                return '';
            })()}
            
            <!-- Success Stories -->
            ${(() => {
                if (typeof createSuccessStories !== 'undefined') {
                    return createSuccessStories();
                }
                return '';
            })()}
            
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
            
            // Hide share button
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.classList.add('d-none');
            }
        });
        
        // Add print functionality
        document.getElementById('dashboard-print').addEventListener('click', function() {
            window.print();
            showSuccess('Print dialog opened');
        });
        
        // Update translations
        updateTranslations();
        
        // Animate numbers after a short delay
        setTimeout(() => {
            document.querySelectorAll('[data-target]').forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                animateNumber(el, target);
            });
        }, 300);
        
        // Add export button after results are shown
        setTimeout(() => {
            addExportButton();
            initializeTooltips();
            checkMilestones(referrals);
            
            // Show share button on results page
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.classList.remove('d-none');
            }
        }, 500);
        
        // Check if user has confirmed hires and show celebration
        const confirmedHires = referrals.filter(r => r.statusType === 'passed' && !r.isPreviousCandidate);
        if (confirmedHires.length > 0 && !isNewUser) {
            setTimeout(() => {
                showSuccess(`Congratulations! You have ${confirmedHires.length} confirmed hire${confirmedHires.length > 1 ? 's' : ''} earning RM${confirmedHires.length * 800}!`);
                // Show confetti for celebration
                if (confirmedHires.length >= 3) {
                    createConfetti();
                }
            }, 1000);
        }
    }
    
    // Create confetti animation
    function createConfetti() {
        const colors = ['#ffc107', '#28a745', '#007bff', '#dc3545', '#6c757d'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
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
                    <div class="card-body empty-state">
                        <div class="empty-state-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h4>${translation.noReferrals || 'No referrals yet!'}</h4>
                        <p class="text-muted mb-4">Start referring friends and track their journey here. You can earn up to RM800 per successful referral!</p>
                        <div class="referral-flow justify-content-center mb-4">
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-user-plus"></i>
                                </div>
                                <div class="step-text">Refer</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="step-text">RM50</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-briefcase"></i>
                                </div>
                                <div class="step-text">Hired</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-calendar"></i>
                                </div>
                                <div class="step-text">RM750</div>
                            </div>
                        </div>
                        <a href="https://tpmyandtpth.github.io/xRAF/" class="btn btn-primary btn-lg">
                            <i class="fas fa-rocket me-2"></i>Start Your First Referral
                        </a>
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
        referralListCard.style.animationDelay = '0.6s';
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
            item.style.animationDelay = `${0.65 + (index * 0.05)}s`;
            
            // Only show WhatsApp button for Application Received
            const showRemindButton = referral.statusType === 'received' && !referral.isPreviousCandidate;
            
            // Calculate progress percentage
            let progressPercentage = 0;
            switch(referral.statusType) {
                case 'received': progressPercentage = 25; break;
                case 'passedAssessment': progressPercentage = 50; break;
                case 'probation': progressPercentage = 75; break;
                case 'passed': progressPercentage = 100; break;
                case 'previouslyApplied': progressPercentage = 0; break;
                case 'failed': progressPercentage = 0; break;
            }
            
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
                    ${referral.statusType !== 'previouslyApplied' && referral.statusType !== 'failed' ? `
                    <div class="status-progress">
                        <div class="status-progress-bar" style="width: ${progressPercentage}%"></div>
                    </div>
                    ` : ''}
                    <div class="row mt-3">
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
                    '#007bff', // Blue - Application Received
                    '#90EE90', // Light Green - Passed Assessment
                    '#ffc107', // Yellow - Probation
                    '#28a745', // Dark Green - Confirmed
                    '#6c757d', // Gray - Previously Applied
                    '#dc3545'  // Red - Not Selected
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
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            const message = `Hi ${name}, this is a friendly reminder to complete your AI Interview assessment for TP. ` +
                           `It's quick and easy! Please complete it at your earliest convenience to move forward with your application. Thank you!`;
            window.open(`https://wa.me/+6${phone}?text=${encodeURIComponent(message)}`, '_blank');
            
            // Show success message
            showSuccess(`WhatsApp reminder opened for ${name}`);
        }
    });

    // Initialize translations
    updateTranslations();
    
    // Add keyboard navigation for language flags
    document.querySelectorAll('.lang-flag').forEach((flag, index, flags) => {
        flag.setAttribute('tabindex', '0');
        flag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % flags.length;
                flags[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + flags.length) % flags.length;
                flags[prevIndex].focus();
            }
        });
    });
    
    // Auto-save form data
    function autoSaveForm() {
        const phoneInput = document.getElementById('dashboard-phone');
        const emailInput = document.getElementById('dashboard-email');
        
        if (!phoneInput || !emailInput) return;
        
        // Load saved data
        const savedPhone = sessionStorage.getItem('xraf_phone');
        const savedEmail = sessionStorage.getItem('xraf_email');
        
        if (savedPhone) phoneInput.value = savedPhone;
        if (savedEmail) emailInput.value = savedEmail;
        
        // Save on input
        phoneInput.addEventListener('input', function() {
            sessionStorage.setItem('xraf_phone', this.value);
        });
        
        emailInput.addEventListener('input', function() {
            sessionStorage.setItem('xraf_email', this.value);
        });
    }
    
    // Initialize auto-save
    autoSaveForm();
    
    // Auto-focus phone input
    const phoneInput = document.getElementById('dashboard-phone');
    if (phoneInput) {
        phoneInput.focus();
    }
    
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
    
    // Add share button
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn btn-outline-primary position-fixed bottom-0 end-0 m-3 d-none';
    shareBtn.id = 'share-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.title = 'Share referral link';
    shareBtn.onclick = function() {
        const shareData = {
            title: 'Join TP and earn with me!',
            text: 'I\'m earning up to RM800 per referral with TP\'s referral program. Join my team!',
            url: 'https://tpmyandtpth.github.io/xRAF/'
        };
        
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => showSuccess('Shared successfully!'))
                .catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(shareData.url)
                .then(() => showSuccess('Link copied to clipboard!'))
                .catch(err => showError('Failed to copy link'));
        }
        
        // Track share count for achievements
        const shareCount = parseInt(localStorage.getItem('xraf_share_count') || '0');
        localStorage.setItem('xraf_share_count', String(shareCount + 1));
    };
    document.body.appendChild(shareBtn);
    
    // Add help button
    const helpBtn = document.createElement('button');
    helpBtn.className = 'help-button';
    helpBtn.innerHTML = '<i class="fas fa-question"></i>';
    helpBtn.title = 'Need help?';
    helpBtn.onclick = function() {
        const helpModal = `
            <div class="modal fade" id="helpModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">How can we help?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action" onclick="showTutorial(); bootstrap.Modal.getInstance(document.getElementById('helpModal')).hide();">
                                    <i class="fas fa-graduation-cap me-2"></i>Show Tutorial
                                </a>
                                <a href="mailto:tpmycareers@teleperformance.com" class="list-group-item list-group-item-action">
                                    <i class="fas fa-envelope me-2"></i>Contact Support
                                </a>
                                <a href="#" class="list-group-item list-group-item-action" onclick="window.print();">
                                    <i class="fas fa-print me-2"></i>Print Report
                                </a>
                                <a href="https://tpmyandtpth.github.io/xRAF/" class="list-group-item list-group-item-action" target="_blank">
                                    <i class="fas fa-user-plus me-2"></i>Refer More Friends
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('helpModal')) {
            document.body.insertAdjacentHTML('beforeend', helpModal);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('helpModal'));
        modal.show();
    };
    document.body.appendChild(helpBtn);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P for print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            if (document.getElementById('dashboard-print') && document.getElementById('results-step').style.display !== 'none') {
                document.getElementById('dashboard-print').click();
            }
        }
        
        // Escape to close popup
        if (e.key === 'Escape') {
            if (document.getElementById('how-popup')?.classList.contains('show')) {
                closeHowItWorksPopup();
            }
        }
    });
    
    // Wait a bit for all scripts to load, then initialize translations
    setTimeout(() => {
        if (typeof translations !== 'undefined') {
            updateTranslations();
            console.log('Translations loaded successfully');
        } else {
            console.error('Translations still not loaded after delay');
        }
    }, 100);
});;
                particle.style.fontSize = isBig ? '2rem' : '1.5rem';
                
                // Position at element center relative to container
                const startX = rect.left - containerRect.left + rect.width / 2;
                const startY = rect.top - containerRect.top + rect.height / 2;
                
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                
                // Random direction
                const angle = (Math.PI * 2 * i) / (isBig ? 12 : 6);
                const distance = 50 + Math.random() * 50;
                particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
                
                container.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }
    
    window.closeHowItWorksPopup = function() {
        const popup = document.getElementById('how-popup');
        const backdrop = document.getElementById('popup-backdrop');
        if (popup && backdrop) {
            // Clear any running timers
            if (popup.dataset.animateTimer) {
                clearInterval(popup.dataset.animateTimer);
            }
            if (popup.dataset.autoCloseTimer) {
                clearTimeout(popup.dataset.autoCloseTimer);
            }
            
            popup.classList.remove('show');
            backdrop.classList.remove('show');
        }
    }
    
    // Show popup on page load after a delay
    setTimeout(() => {
        // Only show popup if not on results page
        if (document.getElementById('auth-step').style.display !== 'none') {
            showHowItWorksPopup();
        }
    }, 1500);
    
    // Close popup when clicking backdrop
    document.getElementById('popup-backdrop')?.addEventListener('click', function() {
        closeHowItWorksPopup();
    });
    
    // Add number animation for stats
    function animateNumber(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Add loading animation
    function showLoading(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = `
            <div class="skeleton" style="height: 100px; margin: 1rem 0;"></div>
            <div class="skeleton" style="height: 20px; margin: 1rem 0;"></div>
            <div class="skeleton" style="height: 20px; margin: 1rem 0; width: 60%;"></div>
        `;
        return originalContent;
    }
    
    // Add success animation
    function showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 start-50 translate-middle-x mt-3 p-3 bg-dark text-white';
        toast.style.zIndex = '9999';
        toast.style.borderRadius = '25px';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-check-circle me-2"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Add error animation
    function showError(message) {
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 start-50 translate-middle-x mt-3 p-3 bg-danger text-white';
        toast.style.zIndex = '9999';
        toast.style.borderRadius = '25px';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-circle me-2"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Export data functionality
    function exportToCSV() {
        if (!currentReferralData || !currentReferralData.referrals || currentReferralData.referrals.length === 0) {
            showError('No data to export');
            return;
        }
        
        const processedReferrals = processReferralData(currentReferralData);
        const headers = ['Name', 'Email', 'Phone', 'Status', 'Application Date', 'Days in Stage', 'Eligible for Payment'];
        
        const rows = processedReferrals.map(r => [
            r.name,
            r.email,
            r.phone,
            getStatusLabel(r.statusType),
            new Date(r.applicationDate).toLocaleDateString(),
            r.daysInStage,
            !r.isPreviousCandidate && (r.statusType === 'passedAssessment' || r.statusType === 'passed') ? 'Yes' : 'No'
        ]);
        
        const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `referrals_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showSuccess('Data exported successfully!');
    }
    
    // Add export button to results
    function addExportButton() {
        if (document.getElementById('dashboard-export')) return; // Already added
        
        const exportBtn = document.createElement('button');
        exportBtn.id = 'dashboard-export';
        exportBtn.className = 'btn btn-outline-secondary me-2';
        exportBtn.title = 'Export to CSV';
        exportBtn.innerHTML = '<i class="fas fa-download"></i>';
        exportBtn.onclick = exportToCSV;
        
        const printBtn = document.getElementById('dashboard-print');
        if (printBtn && printBtn.parentNode) {
            printBtn.parentNode.insertBefore(exportBtn, printBtn);
        }
    }
    
    // Get status label helper
    function getStatusLabel(statusType) {
        const translation = translations[currentLanguage] || translations.en;
        switch(statusType) {
            case 'passed': return translation.statusPassed || 'Hired (Confirmed)';
            case 'passedAssessment': return translation.statusAssessmentPassed || 'Passed Assessment';
            case 'probation': return translation.statusProbation || 'Hired (Probation)';
            case 'previouslyApplied': return translation.statusPreviouslyApplied || 'Previously Applied';
            case 'received': return translation.statusReceived || 'Application Received';
            case 'failed': return translation.statusFailed || 'Not Selected';
            default: return statusType;
        }
    }
    
    // Progress notifications
    function checkMilestones(referrals) {
        const almostReady = referrals.filter(r => 
            r.statusType === 'probation' && 
            r.daysInStage >= 80 && 
            r.daysInStage < 90 &&
            !r.isPreviousCandidate
        );
        
        if (almostReady.length > 0) {
            const names = almostReady.map(r => r.name).join(', ');
            showNotification(
                'Almost There! 🎉',
                `${names} ${almostReady.length > 1 ? 'are' : 'is'} close to completing 90 days!`,
                'info'
            );
        }
    }
    
    function showNotification(title, message, type = 'info') {
        const notificationHtml = `
            <div class="notification notification-${type}">
                <div class="notification-header">
                    <strong>${title}</strong>
                    <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="notification-body">${message}</div>
            </div>
        `;
        
        const container = document.getElementById('notification-container') || (() => {
            const div = document.createElement('div');
            div.id = 'notification-container';
            document.body.appendChild(div);
            return div;
        })();
        
        container.insertAdjacentHTML('beforeend', notificationHtml);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            const notification = container.lastElementChild;
            if (notification) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Initialize tooltips
    function initializeTooltips() {
        const tooltips = {
            'primary': 'Your friend needs to complete the AI Interview assessment',
            'success': 'Payment eligible! Check earnings table for details',
            'warning': 'In progress - waiting for next milestone',
            'danger': 'Application not successful',
            'secondary': 'No payment - candidate previously applied to TP'
        };
        
        setTimeout(() => {
            document.querySelectorAll('.status-badge').forEach(badge => {
                const badgeClass = Array.from(badge.classList).find(c => c.startsWith('bg-'));
                const type = badgeClass ? badgeClass.replace('bg-', '') : '';
                
                if (type && tooltips[type]) {
                    badge.setAttribute('data-bs-toggle', 'tooltip');
                    badge.setAttribute('data-bs-placement', 'top');
                    badge.setAttribute('title', tooltips[type]);
                }
            });
            
            // Initialize Bootstrap tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }, 100);
    }
    
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
    
    // Language flag click handler - Fixed for PC
    document.querySelectorAll('.lang-flag').forEach(flag => {
        flag.addEventListener('click', function(e) {
            e.preventDefault();
            
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
            if (count > 0) {
                row.className = 'payment-success';
            }
            row.innerHTML = `
                <td>${earning.label}</td>
                <td>RM ${earning.amount}</td>
                <td>${count}</td>
                <td><strong>RM ${total}</strong></td>
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
                <div>
                    <button id="dashboard-print" class="btn btn-outline-secondary me-2" title="Print Report">
                        <i class="fas fa-print"></i>
                    </button>
                    <button id="dashboard-back" class="btn btn-outline-secondary" data-translate="backBtn">
                        <i class="fas fa-arrow-left me-2"></i> ${translation.backBtn}
                    </button>
                </div>
            </div>
            
            <div id="referral-stats" class="row mb-4">
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.1s">
                        <h3 id="total-referrals" data-target="${referrals.length}">0</h3>
                        <h5 data-translate="totalReferrals"><i class="fas fa-users me-2"></i>${translation.totalReferrals}</h5>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.2s">
                        <h3 class="text-success" id="hired-referrals" data-target="${referrals.filter(r => r.statusType === 'passed' || r.statusType === 'probation').length}">0</h3>
                        <h5 data-translate="hiredReferrals"><i class="fas fa-check-circle me-2"></i>${translation.hiredReferrals}</h5>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="stats-card fade-in-up" style="animation-delay: 0.3s">
                        <h3 class="text-warning" id="progress-referrals" data-target="${referrals.filter(r => ['received', 'passedAssessment'].includes(r.statusType)).length}">0</h3>
                        <h5 data-translate="inProgress"><i class="fas fa-clock me-2"></i>${translation.inProgress}</h5>
                    </div>
                </div>
            </div>
            
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.45s">
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

            <div class="card mb-4 fade-in-up" style="animation-delay: 0.55s">
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
            <div class="card mb-4 status-examples fade-in-up" style="animation-delay: 0.85s">
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
            <div class="card mb-4 fade-in-up" style="animation-delay: 0.9s; border: 2px dashed #000;">
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
            <div class="mt-4 fade-in-up" style="animation-delay: 0.95s">
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
        
        // Add print functionality
        document.getElementById('dashboard-print').addEventListener('click', function() {
            window.print();
            showSuccess('Print dialog opened');
        });
        
        // Update translations
        updateTranslations();
        
        // Animate numbers after a short delay
        setTimeout(() => {
            document.querySelectorAll('[data-target]').forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                animateNumber(el, target);
            });
        }, 300);
        
        // Check if user has confirmed hires and show celebration
        const confirmedHires = referrals.filter(r => r.statusType === 'passed' && !r.isPreviousCandidate);
        if (confirmedHires.length > 0 && !isNewUser) {
            setTimeout(() => {
                showSuccess(`Congratulations! You have ${confirmedHires.length} confirmed hire${confirmedHires.length > 1 ? 's' : ''} earning RM${confirmedHires.length * 800}!`);
            }, 1000);
        }
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
                    <div class="card-body empty-state">
                        <div class="empty-state-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h4>${translation.noReferrals || 'No referrals yet!'}</h4>
                        <p class="text-muted mb-4">Start referring friends and track their journey here. You can earn up to RM800 per successful referral!</p>
                        <div class="referral-flow justify-content-center mb-4">
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-user-plus"></i>
                                </div>
                                <div class="step-text">Refer</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="step-text">RM50</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-briefcase"></i>
                                </div>
                                <div class="step-text">Hired</div>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    <i class="fas fa-calendar"></i>
                                </div>
                                <div class="step-text">RM750</div>
                            </div>
                        </div>
                        <a href="https://tpmyandtpth.github.io/xRAF/" class="btn btn-primary btn-lg">
                            <i class="fas fa-rocket me-2"></i>Start Your First Referral
                        </a>
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
            
            // Calculate progress percentage
            let progressPercentage = 0;
            switch(referral.statusType) {
                case 'received': progressPercentage = 25; break;
                case 'passedAssessment': progressPercentage = 50; break;
                case 'probation': progressPercentage = 75; break;
                case 'passed': progressPercentage = 100; break;
                case 'previouslyApplied': progressPercentage = 0; break;
                case 'failed': progressPercentage = 0; break;
            }
            
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
                    ${referral.statusType !== 'previouslyApplied' && referral.statusType !== 'failed' ? `
                    <div class="status-progress">
                        <div class="status-progress-bar" style="width: ${progressPercentage}%"></div>
                    </div>
                    ` : ''}
                    <div class="row mt-3">
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
                    '#007bff', // Blue - Application Received
                    '#90EE90', // Light Green - Passed Assessment
                    '#ffc107', // Yellow - Probation
                    '#28a745', // Dark Green - Confirmed
                    '#6c757d', // Gray - Previously Applied
                    '#dc3545'  // Red - Not Selected
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
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            const message = `Hi ${name}, this is a friendly reminder to complete your AI Interview assessment for TP. ` +
                           `It's quick and easy! Please complete it at your earliest convenience to move forward with your application. Thank you!`;
            window.open(`https://wa.me/+6${phone}?text=${encodeURIComponent(message)}`, '_blank');
            
            // Show success message
            showSuccess(`WhatsApp reminder opened for ${name}`);
        }
    });

    // Initialize translations
    updateTranslations();
    
    // Add keyboard navigation for language flags
    document.querySelectorAll('.lang-flag').forEach((flag, index, flags) => {
        flag.setAttribute('tabindex', '0');
        flag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % flags.length;
                flags[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + flags.length) % flags.length;
                flags[prevIndex].focus();
            }
        });
    });
    
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
