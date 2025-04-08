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
        newReferralBtn: document.getElementById('new-referral-btn'),
        qrCode: document.getElementById('qr-code')
    };

    // Application Data
    let jsonData = [];

    // Complete Translations
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
            referralMessage: "We've received your referral and will be in touch soon.",
            scanText: "Scan to visit our careers page",
            newReferralBtn: "Submit Another Referral",
            followUs: "Follow Us On:"
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
            referralMessage: "紹介を受け付けました。追ってご連絡いたします。",
            scanText: "QRコードをスキャンして採用ページへ",
            newReferralBtn: "別の紹介を送信",
            followUs: "フォローしてください:"
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
            referralMessage: "추천을 접수하였으며 곧 연락드리겠습니다.",
            scanText: "QR 코드를 스캔하여 채용 페이지 방문",
            newReferralBtn: "다른 추천 제출",
            followUs: "팔로우 하세요:"
        },
        malay: {
            pageLangLabel: "Pilih Bahasa Anda:",
            fullNameLabel: "Nama Penuh:",
            fullNamePlaceholder: "Masukkan nama penuh anda",
            phoneLabel: "Nombor Telefon:",
            phonePlaceholder: "Masukkan nombor telefon anda",
            emailLabel: "Alamat Email:",
            emailPlaceholder: "Masukkan alamat email anda",
            jobSelectionTitle: "Di mana rakan anda ingin bekerja?",
            jobLangLabel: "Bahasa Pekerjaan:",
            locationLabel: "Lokasi Kerja:",
            consentText: "Saya bersetuju dengan terma dan syarat program Rujuk Rakan. Saya mengesahkan bahawa saya telah mendapatkan persetujuan rakan saya untuk berkongsi maklumat mereka dengan Teleperformance untuk tujuan pengambilan.",
            nextBtn: "Hantar Rujukan",
            thankYouTitle: "Terima kasih atas rujukan anda!",
            referralMessage: "Kami telah menerima rujukan anda dan akan menghubungi anda tidak lama lagi.",
            scanText: "Imbas untuk melawat laman kerjaya kami",
            newReferralBtn: "Hantar Rujukan Lain",
            followUs: "Ikuti Kami Di:"
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
            referralMessage: "我们已经收到您的推荐，会尽快与您联系。",
            scanText: "扫描访问我们的招聘页面",
            newReferralBtn: "提交另一个推荐",
            followUs: "关注我们:"
        },
        thai: {
            pageLangLabel: "เลือกภาษาของคุณ:",
            fullNameLabel: "ชื่อ-นามสกุล:",
            fullNamePlaceholder: "กรุณากรอกชื่อ-นามสกุล",
            phoneLabel: "หมายเลขโทรศัพท์:",
            phonePlaceholder: "กรุณากรอกหมายเลขโทรศัพท์",
            emailLabel: "อีเมล:",
            emailPlaceholder: "กรุณากรอกอีเมล",
            jobSelectionTitle: "เพื่อนของคุณต้องการทำงานที่ไหน?",
            jobLangLabel: "ภาษาที่ใช้ในการทำงาน:",
            locationLabel: "สถานที่ทำงาน:",
            consentText: "ฉันยอมรับข้อกำหนดและเงื่อนไขของโปรแกรมแนะนำเพื่อน ฉันยืนยันว่าฉันได้รับความยินยอมจากเพื่อนแล้วที่จะแบ่งปันข้อมูลของพวกเขากับ Teleperformance เพื่อวัตถุประสงค์ในการสรรหาบุคลากร",
            nextBtn: "ส่งรายชื่อ",
            thankYouTitle: "ขอบคุณสำหรับการแนะนำ!",
            referralMessage: "เราได้รับรายชื่อของคุณแล้วและจะติดต่อกลับเร็วๆ นี้",
            scanText: "สแกนเพื่อเยี่ยมชมหน้าทำงานของเรา",
            newReferralBtn: "ส่งรายชื่ออื่น",
            followUs: "ติดตามเราได้ที่:"
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
                showAlert('Failed to load job data. Please try again later.');
            });
    }

    // Get unique values from a specific field
    function getUniqueValues(field) {
        return [...new Set(jsonData.map(item => item[field]))];
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = '';
        const defaultOption = new Option('-- ' + (translations[elements.pageLangSelect.value]?.selectText || 'Select') + ' --', '');
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

    // Generate QR code
    function generateQrCode(url) {
        elements.qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&color=000&bgcolor=FFF&data=${encodeURIComponent(url)}`;
    }

    // Show alert message
    function showAlert(message) {
        alert(message);
    }

    // Submit referral form
    function submitReferral() {
        const referralData = {
            name: elements.fullName.value.trim(),
            phone: elements.phoneNumber.value.trim(),
            email: elements.email.value.trim(),
            jobLanguage: elements.jobLangSelect.value,
            location: elements.locationSelect.value,
            timestamp: new Date().toISOString()
        };

        // In a real app, you would send this data to your server
        console.log('Referral submitted:', referralData);
        
        // Generate QR code for careers page
        generateQrCode('https://careers.teleperformance.com');
        
        // Show thank you step
        elements.step1.style.display = 'none';
        elements.step2.style.display = 'block';
    }

    // Reset form for new referral
    function resetForm() {
        elements.fullName.value = '';
        elements.phoneNumber.value = '';
        elements.email.value = '';
        elements.jobLangSelect.value = '';
        elements.locationSelect.value = '';
        elements.consentCheckbox.checked = false;
        elements.nextBtn.disabled = true;
        
        elements.step2.style.display = 'none';
        elements.step1.style.display = 'block';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
            populateDropdown(elements.jobLangSelect, getUniqueValues('Language'));
            populateDropdown(elements.locationSelect, getUniqueValues('Location'));
        });
        
        // Form input validation
        elements.fullName.addEventListener('input', validateForm);
        elements.phoneNumber.addEventListener('input', validateForm);
        elements.email.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', validateForm);
        elements.locationSelect.addEventListener('change', validateForm);
        elements.consentCheckbox.addEventListener('change', validateForm);
        
        // Next button
        elements.nextBtn.addEventListener('click', submitReferral);
        
        // New referral button
        elements.newReferralBtn.addEventListener('click', resetForm);
    }

    // Initialize the app
    init();
});
