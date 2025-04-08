document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        pageLangSelect: document.getElementById('page-lang-select'),
        fullName: document.getElementById('full-name'),
        phoneNumber: document.getElementById('phone-number'),
        email: document.getElementById('email'),
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        consentCheckbox: document.getElementById('consent-checkbox'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        newReferralBtn: document.getElementById('new-referral-btn'),
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCode: document.getElementById('qr-code'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        socialLinks: {
            facebook: document.querySelector('.social-icon.facebook'),
            instagram: document.querySelector('.social-icon.instagram')
        }
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';

    // Translations
    const translations = {
        english: {
            pageLangLabel: "Choose Your Language:",
            fullNameLabel: "Full Name:",
            fullNamePlaceholder: "Enter your full name",
            phoneLabel: "Phone Number:",
            phonePlaceholder: "Enter your phone number",
            emailLabel: "Email Address:",
            emailPlaceholder: "Enter your email address",
            jobSelectionTitle: "Where would your friend like to work?",
            jobLangLabel: "Job Language:",
            locationLabel: "Working Location:",
            consentText: "I agree to the terms and conditions of the Refer a Friend program. I confirm that I have obtained my friend's consent to share their information with Teleperformance for recruitment purposes.",
            nextBtn: "Submit Referral",
            thankYouTitle: "Thank you for your referral!",
            referralMessage: "Here's the personalized link for your friend to apply:",
            scanText: "Or scan this QR code to apply",
            followUs: "Follow Us On:",
            backText: "Back",
            copyText: "Copy",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "Location Social Media:",
            shareMessage: "Check out this job opportunity at Teleperformance: "
        },
        japanese: {
            pageLangLabel: "言語を選択してください:",
            fullNameLabel: "氏名:",
            fullNamePlaceholder: "氏名を入力してください",
            phoneLabel: "電話番号:",
            phonePlaceholder: "電話番号を入力してください",
            emailLabel: "メールアドレス:",
            emailPlaceholder: "メールアドレスを入力してください",
            jobSelectionTitle: "ご友人の希望勤務地はどこですか？",
            jobLangLabel: "職務言語:",
            locationLabel: "勤務地:",
            consentText: "私はTeleperformanceの「友人を紹介する」プログラムの利用規約に同意します。私は採用目的で友人の情報をTeleperformanceと共有することについて、友人の同意を得たことを確認します。",
            nextBtn: "紹介を送信",
            thankYouTitle: "ご紹介ありがとうございます!",
            referralMessage: "友達が応募するためのリンクです:",
            scanText: "QRコードをスキャンして応募",
            followUs: "フォローしてください:",
            backText: "戻る",
            copyText: "コピー",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "現地のソーシャルメディア:",
            shareMessage: "Teleperformanceのこの求人情報をチェックしてください: "
        },
        korean: {
            pageLangLabel: "언어 선택:",
            fullNameLabel: "성명:",
            fullNamePlaceholder: "성명을 입력하세요",
            phoneLabel: "전화번호:",
            phonePlaceholder: "전화번호를 입력하세요",
            emailLabel: "이메일 주소:",
            emailPlaceholder: "이메일 주소를 입력하세요",
            jobSelectionTitle: "친구가 근무를 원하는 지역은 어디인가요?",
            jobLangLabel: "직무 언어:",
            locationLabel: "근무 위치:",
            consentText: "저는 Teleperformance의 '지인 추천' 프로그램 약관에 동의합니다. 채용 목적으로 지인의 정보를 Teleperformance와 공유하는 것에 대해 지인의 동의를 얻었음을 확인합니다.",
            nextBtn: "추천 제출",
            thankYouTitle: "추천해 주셔서 감사합니다!",
            referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
            scanText: "QR 코드를 스캔하여 지원하세요",
            followUs: "팔로우 하세요:",
            backText: "뒤로",
            copyText: "복사",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "현지 소셜 미디어:",
            shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: "
        },
        mandarin: {
            pageLangLabel: "选择您的语言:",
            fullNameLabel: "全名:",
            fullNamePlaceholder: "输入您的全名",
            phoneLabel: "电话号码:",
            phonePlaceholder: "输入您的电话号码",
            emailLabel: "电子邮件地址:",
            emailPlaceholder: "输入您的电子邮件地址",
            jobSelectionTitle: "您的朋友希望在哪里工作？",
            jobLangLabel: "工作语言:",
            locationLabel: "工作地点:",
            consentText: "我同意推荐朋友计划的条款和条件。我确认已获得朋友的同意，将其信息分享给Teleperformance用于招聘目的。",
            nextBtn: "提交推荐",
            thankYouTitle: "感谢您的推荐!",
            referralMessage: "这是您朋友申请的个性化链接:",
            scanText: "扫描访问我们的招聘页面",
            followUs: "关注我们:",
            backText: "返回",
            copyText: "复制",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "当地社交媒体:",
            shareMessage: "查看Teleperformance的这个工作机会: "
        },
        cantonese: {
            pageLangLabel: "選擇您的語言:",
            fullNameLabel: "全名:",
            fullNamePlaceholder: "輸入您的全名",
            phoneLabel: "電話號碼:",
            phonePlaceholder: "輸入您的電話號碼",
            emailLabel: "電子郵件地址:",
            emailPlaceholder: "輸入您的電子郵件地址",
            jobSelectionTitle: "您的朋友希望在哪裡工作？",
            jobLangLabel: "工作語言:",
            locationLabel: "工作地點:",
            consentText: "我同意推薦朋友計劃的條款和條件。我確認已獲得朋友的同意，將其信息分享給Teleperformance用於招聘目的。",
            nextBtn: "提交推薦",
            thankYouTitle: "感謝您的推薦!",
            referralMessage: "這是您朋友申請的個性化鏈接:",
            scanText: "掃描訪問我們的招聘頁面",
            followUs: "關注我們:",
            backText: "返回",
            copyText: "複製",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "當地社交媒體:",
            shareMessage: "查看Teleperformance的這個工作機會: "
        }
    };

    // Location-specific social media links
    const locationSocialLinks = {
        malaysia: {
            facebook: "https://www.facebook.com/teleperformance.malaysia",
            instagram: "https://www.instagram.com/teleperformance_malaysia"
        },
        thailand: {
            facebook: "https://www.facebook.com/TeleperformanceTH",
            instagram: "https://www.instagram.com/teleperformance_thailand"
        },
        default: {
            facebook: "https://www.facebook.com/Teleperformance",
            instagram: "https://www.instagram.com/teleperformance"
        }
    };

    // Initialize the application
    function init() {
        loadData();
        setupEventListeners();
        updatePageContent('english');
    }

    // Load JSON data
    function loadData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                jsonData = data;
                populateDropdown(elements.jobLangSelect, getUniqueValues('Language'));
                populateDropdown(elements.locationSelect, getUniqueValues('Location'));
            })
            .catch(error => {
                console.error('Error loading data:', error);
                alert('Failed to load job data. Please try again later.');
            });
    }

    // Get unique values from a specific field
    function getUniqueValues(field) {
        return [...new Set(jsonData.map(item => item[field]))];
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = '';
        const defaultOption = new Option('-- Select --', '');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.appendChild(defaultOption);
        
        options.forEach(option => {
            dropdown.appendChild(new Option(option, option));
        });
    }

    // Update page content based on selected language
    function updatePageContent(language) {
        const translation = translations[language] || translations.english;
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) el.textContent = translation[key];
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        // Update social media links based on location
        updateSocialLinks();
    }

    // Update social media links based on location
    function updateSocialLinks() {
        const links = locationSocialLinks[currentLocation] || locationSocialLinks.default;
        elements.socialLinks.facebook.href = links.facebook;
        elements.socialLinks.instagram.href = links.instagram;
    }

    // Validate form inputs
    function validateForm() {
        const isConsentChecked = elements.consentCheckbox.checked;
        const isNameValid = elements.fullName.value.trim().length > 0;
        const isPhoneValid = elements.phoneNumber.value.trim().length > 0;
        const isEmailValid = validateEmail(elements.email.value);
        const isJobLangSelected = elements.jobLangSelect.value !== '';
        const isLocationSelected = elements.locationSelect.value !== '';
        
        elements.nextBtn.disabled = !(isConsentChecked && isNameValid && isPhoneValid && isEmailValid && isJobLangSelected && isLocationSelected);
    }

    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Generate and display referral link
    function generateReferralLink() {
        const name = encodeURIComponent(elements.fullName.value.trim());
        const phone = encodeURIComponent(elements.phoneNumber.value.trim());
        const email = encodeURIComponent(elements.email.value.trim());
        const jobLanguage = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        currentLocation = location.toLowerCase();
        
        const jobData = jsonData.find(
            item => item.Language === jobLanguage && 
                   item.Location === location
        );
        
        if (jobData) {
            // Construct the referral URL with all parameters
            let baseUrl = jobData['Evergreen link'];
            
            // Clean existing parameters if needed
            baseUrl = baseUrl.split('?')[0];
            
            // Add the referrer information
            const referralUrl = `${baseUrl}?raf_name=${name}&raf_email=${email}&raf_phone=${phone}`;
            
            elements.referralLink.value = referralUrl;
            generateQrCode(referralUrl);
            updateSocialLinks();
            return true;
        }
        return false;
    }

    // Generate QR code
    function generateQrCode(url) {
        elements.qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&color=000&bgcolor=FFF&data=${encodeURIComponent(url)}`;
    }

    // Copy link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Share via WhatsApp
    function shareWhatsApp() {
        const message = translations[elements.pageLangSelect.value]?.shareMessage || 
            'Check out this job opportunity at Teleperformance: ';
        const url = `https://wa.me/?text=${encodeURIComponent(message + elements.referralLink.value)}`;
        window.open(url, '_blank');
    }

    // Share via Line
    function shareLine() {
        const message = translations[elements.pageLangSelect.value]?.shareMessage || 
            'Check out this job opportunity at Teleperformance: ';
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message + elements.referralLink.value)}`;
        window.open(url, '_blank');
    }

    // Go to next step
    function nextStep() {
        if (generateReferralLink()) {
            elements.step1.style.display = 'none';
            elements.step2.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });
        
        // Form input validation
        elements.fullName.addEventListener('input', validateForm);
        elements.phoneNumber.addEventListener('input', validateForm);
        elements.email.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', function() {
            validateForm();
            updateJobsDropdown();
        });
        
        elements.locationSelect.addEventListener('change', function() {
            validateForm();
            currentLocation = this.value.toLowerCase();
            updateSocialLinks();
        });
        
        elements.consentCheckbox.addEventListener('change', validateForm);
        
        // Next button
        elements.nextBtn.addEventListener('click', nextStep);
        
        // Back button
        elements.backBtn.addEventListener('click', function() {
            elements.step2.style.display = 'none';
            elements.step1.style.display = 'block';
        });
        
        // Copy button
        elements.copyBtn.addEventListener('click', copyToClipboard);
        
        // Share buttons
        elements.shareWhatsapp.addEventListener('click', shareWhatsApp);
        elements.shareLine.addEventListener('click', shareLine);
    }

    // Initialize the app
    init();
});
