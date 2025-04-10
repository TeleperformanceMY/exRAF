// Translation dictionary
const translations = {
    en: {
        pageLangLabel: "Choose Your Language:",
        fullNameLabel: "Full Name:",
        fullNamePlaceholder: "Enter your full name",
        fullNameError: "Please provide your full name.",
        phoneLabel: "Phone Number:",
        phonePlaceholder: "Enter your phone number",
        phoneError: "Please provide a valid phone number.",
        emailLabel: "Email Address:",
        emailPlaceholder: "Enter your email address",
        emailError: "Please provide a valid email address.",
        jobSelectionTitle: "Where would your friend like to work?",
        jobLangLabel: "Job Language:",
        jobLangError: "Please select a job language.",
        locationLabel: "Working Location:",
        locationError: "Please select a location.",
        selectOption: "Select an option",
        consentText1: "I agree to the",
        termsLink: "terms and conditions",
        consentText2: "of the Refer a Friend program. I confirm that I have obtained my friend's consent to share their information with Teleperformance for recruitment purposes.",
        consentError: "You must agree to the terms and conditions.",
        nextBtn: "Submit Referral",
        thankYouTitle: "Thank you for your referral!",
        referralMessage: "Here's the personalized link for your friend to apply:",
        scanText: "Or scan this QR code to apply",
        followUs: "Follow Us On:",
        backText: "Back",
        copyText: "Copy",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "Location Social Media:",
        shareMessage: "Check out this job opportunity at Teleperformance: ",
        termsTitle: "Terms and Conditions",
        closeBtn: "Close",
        copiedText: "Copied!",
        termsContent: `
            <h4>Refer a Friend Program Terms</h4>
            <p>By participating in the Teleperformance Refer a Friend program, you agree to the following terms:</p>
            <ol>
                <li>You must be a current employee or authorized representative to refer candidates.</li>
                <li>All referred candidates must meet the minimum qualifications for the position.</li>
                <li>You must obtain consent from the referred individual before submitting their information.</li>
                <li>Referral bonuses (if applicable) will be paid according to company policy.</li>
                <li>Teleperformance reserves the right to modify or terminate this program at any time.</li>
                <li>All hiring decisions are made at the sole discretion of Teleperformance.</li>
            </ol>
            <p>Last updated: ${new Date().toLocaleDateString()}</p>
        `
    },
    ja: {
        pageLangLabel: "言語を選択してください:",
        fullNameLabel: "氏名:",
        fullNamePlaceholder: "氏名を入力してください",
        fullNameError: "氏名を入力してください。",
        phoneLabel: "電話番号:",
        phonePlaceholder: "電話番号を入力してください",
        phoneError: "有効な電話番号を入力してください。",
        emailLabel: "メールアドレス:",
        emailPlaceholder: "メールアドレスを入力してください",
        emailError: "有効なメールアドレスを入力してください。",
        jobSelectionTitle: "ご友人の希望勤務地はどこですか？",
        jobLangLabel: "職務言語:",
        jobLangError: "職務言語を選択してください。",
        locationLabel: "勤務地:",
        locationError: "勤務地を選択してください。",
        selectOption: "選択してください",
        consentText1: "私はTeleperformanceの",
        termsLink: "利用規約",
        consentText2: "「友人を紹介する」プログラムに同意します。私は採用目的で友人の情報をTeleperformanceと共有することについて、友人の同意を得たことを確認します。",
        consentError: "利用規約に同意する必要があります。",
        nextBtn: "紹介を送信",
        thankYouTitle: "ご紹介ありがとうございます!",
        referralMessage: "友達が応募するためのリンクです:",
        scanText: "QRコードをスキャンして応募",
        followUs: "フォローしてください:",
        backText: "戻る",
        copyText: "コピー",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "現地のソーシャルメディア:",
        shareMessage: "Teleperformanceのこの求人情報をチェックしてください: ",
        termsTitle: "利用規約",
        closeBtn: "閉じる",
        copiedText: "コピーしました!",
        termsContent: `
            <h4>友人紹介プログラム利用規約</h4>
            <p>Teleperformanceの「友人を紹介する」プログラムに参加することで、以下の規約に同意したものとみなされます:</p>
            <ol>
                <li>候補者を紹介するには、現在の従業員または承認された代表者である必要があります。</li>
                <li>紹介されたすべての候補者は、ポジションの最低資格を満たしている必要があります。</li>
                <li>紹介する個人の情報を送信する前に、その個人の同意を得る必要があります。</li>
                <li>紹介ボーナス（該当する場合）は、会社のポリシーに従って支払われます。</li>
                <li>Teleperformanceは、いつでもこのプログラムを変更または終了する権利を留保します。</li>
                <li>すべての採用決定は、Teleperformanceの単独の裁量で行われます。</li>
            </ol>
            <p>最終更新日: ${new Date().toLocaleDateString()}</p>
        `
    },
    ko: {
        // Korean translations would go here
    },
    "zh-CN": {
        // Mandarin translations would go here
    },
    "zh-HK": {
        // Cantonese translations would go here
    }
};

// Location-specific social media links
const locationSocialLinks = {
    malaysia: [
        { url: "http://www.facebook.com/TPinMalaysia/", icon: "facebook", name: "Facebook" },
        { url: "http://www.instagram.com/tp_malaysia/", icon: "instagram", name: "Instagram" }
    ],
    thailand: [
        { url: "http://www.facebook.com/TPinThailand/", icon: "facebook", name: "Facebook" },
        { url: "http://www.instagram.com/tpinthailand/", icon: "instagram", name: "Instagram" }
    ],
    global: [
        { url: "https://www.linkedin.com/company/teleperformance", icon: "linkedin", name: "LinkedIn" },
        { url: "https://www.youtube.com/@TeleperformanceGroup", icon: "youtube", name: "YouTube" }
    ]
};

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
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCodeCanvas: document.getElementById('qr-code-canvas'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareWechat: document.getElementById('share-wechat'),
        locationSocialLinks: document.getElementById('location-social-links'),
        termsModal: document.getElementById('termsModal')
    };

    // Application Data
    let currentLanguage = 'en';
    let currentLocation = '';
    let jobData = [];

    // Initialize the application
    function init() {
        loadJobData();
        setupEventListeners();
        updatePageContent();
    }

    // Load job data from JSON file
    function loadJobData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                jobData = data;
                populateJobDropdowns();
            })
            .catch(error => {
                console.error('Error loading job data:', error);
                alert('Failed to load job data. Please try again later.');
            });
    }

    // Populate job language and location dropdowns
    function populateJobDropdowns() {
        // Get unique languages and locations
        const languages = [...new Set(jobData.map(job => job.Language))];
        const locations = [...new Set(jobData.map(job => job.Location))];

        // Populate language dropdown
        elements.jobLangSelect.innerHTML = '';
        addOption(elements.jobLangSelect, '', translations[currentLanguage].selectOption, true, true);
        languages.forEach(lang => {
            addOption(elements.jobLangSelect, lang, lang);
        });

        // Populate location dropdown
        elements.locationSelect.innerHTML = '';
        addOption(elements.locationSelect, '', translations[currentLanguage].selectOption, true, true);
        locations.forEach(loc => {
            addOption(elements.locationSelect, loc, loc);
        });
    }

    // Helper function to add options to select elements
    function addOption(select, value, text, disabled = false, selected = false) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        option.disabled = disabled;
        option.selected = selected;
        select.appendChild(option);
    }

    // Update page content based on selected language
    function updatePageContent() {
        const translation = translations[currentLanguage] || translations.en;
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) {
                if (el.tagName === 'INPUT' && el.type === 'button') {
                    el.value = translation[key];
                } else {
                    el.textContent = translation[key];
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        // Update terms modal content if open
        const termsModal = bootstrap.Modal.getInstance(elements.termsModal);
        if (termsModal) {
            document.querySelector('#termsModal .modal-title').textContent = translation.termsTitle;
            document.querySelector('#termsModal .modal-body').innerHTML = translation.termsContent;
            document.querySelector('#termsModal [data-translate="closeBtn"]').textContent = translation.closeBtn;
        }
    }

    // Change language
    function changeLanguage() {
        currentLanguage = elements.pageLangSelect.value;
        updatePageContent();
        populateJobDropdowns();
    }

    // Validate form in real-time
    function validateForm() {
        let isValid = true;
        
        // Validate name
        if (!elements.fullName.value.trim()) {
            elements.fullName.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.fullName.classList.remove('is-invalid');
        }
        
        // Validate phone (basic validation)
        if (!elements.phoneNumber.value.trim() || elements.phoneNumber.value.trim().length < 8) {
            elements.phoneNumber.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.phoneNumber.classList.remove('is-invalid');
        }
        
        // Validate email
        if (!validateEmail(elements.email.value)) {
            elements.email.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.email.classList.remove('is-invalid');
        }
        
        // Validate job language
        if (!elements.jobLangSelect.value) {
            elements.jobLangSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobLangSelect.classList.remove('is-invalid');
        }
        
        // Validate location
        if (!elements.locationSelect.value) {
            elements.locationSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.locationSelect.classList.remove('is-invalid');
        }
        
        // Validate consent
        if (!elements.consentCheckbox.checked) {
            elements.consentCheckbox.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.consentCheckbox.classList.remove('is-invalid');
        }
        
        elements.nextBtn.disabled = !isValid;
        return isValid;
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Generate referral link and QR code
    function generateReferral() {
        if (!validateForm()) return false;
        
        const name = encodeURIComponent(elements.fullName.value.trim());
        const phone = encodeURIComponent(elements.phoneNumber.value.trim());
        const email = encodeURIComponent(elements.email.value.trim());
        const jobLanguage = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        currentLocation = location.toLowerCase().includes('malaysia') ? 'malaysia' : 
                         location.toLowerCase().includes('thailand') ? 'thailand' : 'global';
        
        // Find matching job
        const job = jobData.find(
            item => item.Language === jobLanguage && 
                   item.Location === location
        );
        
        if (job) {
            // Construct the referral URL with parameters separated by %7C
            const baseUrl = job['Evergreen link'].split('?')[0];
            const referralUrl = `${baseUrl}?ref=friend&name=${name}%7Cphone=${phone}%7Cemail=${email}`;
            
            elements.referralLink.value = referralUrl;
            generateQRCode(referralUrl);
            updateSocialLinks();
            return true;
        }
        
        alert("No job found for the selected criteria");
        return false;
    }

    // Generate QR code
    function generateQRCode(url) {
        QRCode.toCanvas(elements.qrCodeCanvas, url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error) {
            if (error) console.error('QR Code generation error:', error);
        });
    }

    // Update social media links based on location
    function updateSocialLinks() {
        // Clear existing links
        elements.locationSocialLinks.innerHTML = '';
        
        // Add location-specific links
        const links = locationSocialLinks[currentLocation] || locationSocialLinks.global;
        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = `social-icon ${link.icon}`;
            anchor.target = "_blank";
            anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
            anchor.title = link.name;
            elements.locationSocialLinks.appendChild(anchor);
        });
        
        // Add global links
        locationSocialLinks.global.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = `social-icon ${link.icon}`;
            anchor.target = "_blank";
            anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
            anchor.title = link.name;
            elements.locationSocialLinks.appendChild(anchor);
        });
        
        // Update share buttons
        updateShareButtons();
    }

    // Update share buttons with current referral link
    function updateShareButtons() {
        const shareUrl = encodeURIComponent(elements.referralLink.value);
        const shareText = translations[currentLanguage]?.shareMessage || translations.en.shareMessage;
        const encodedShareText = encodeURIComponent(shareText);
        
        // WhatsApp
        elements.shareWhatsapp.onclick = () => {
            window.open(`https://wa.me/?text=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        // Line
        elements.shareLine.onclick = () => {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        // WeChat (note: WeChat sharing is more complex in reality)
        elements.shareWechat.onclick = () => {
            alert("For WeChat, please copy the link and share it manually within the WeChat app.");
        };
    }

    // Copy referral link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLanguage]?.copiedText || 'Copied!'}`;
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Show step 2 (thank you page)
    function showStep2() {
        if (generateReferral()) {
            elements.step1.style.display = 'none';
            elements.step2.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    // Show step 1 (form page)
    function showStep1() {
        elements.step2.style.display = 'none';
        elements.step1.style.display = 'block';
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Language change
        elements.pageLangSelect.addEventListener('change', changeLanguage);
        
        // Form validation
        elements.fullName.addEventListener('input', validateForm);
        elements.phoneNumber.addEventListener('input', validateForm);
        elements.email.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', validateForm);
        elements.locationSelect.addEventListener('change', validateForm);
        elements.consentCheckbox.addEventListener('change', validateForm);
        
        // Form submission
        elements.nextBtn.addEventListener('click', showStep2);
        elements.backBtn.addEventListener('click', showStep1);
        
        // Copy button
        elements.copyBtn.addEventListener('click', copyToClipboard);
        
        // Initialize Bootstrap modal for terms
        const termsModal = new bootstrap.Modal(elements.termsModal);
        document.querySelector('[data-bs-target="#termsModal"]').addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.show();
        });
    }

    // Initialize the app
    init();
});
