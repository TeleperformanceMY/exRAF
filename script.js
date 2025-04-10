// Complete Translation Dictionary
const translations = {
    en: {
        pageLangLabel: "Choose Your Language:",
        yourInfoTitle: "Your Information",
        friendInfoTitle: "Friend's Information",
        fullNameLabel: "Full Name:",
        fullNamePlaceholder: "Enter your full name",
        fullNameError: "Please provide your full name.",
        phoneLabel: "Phone Number:",
        phonePlaceholder: "Enter your phone number",
        phoneError: "Please provide a valid phone number.",
        emailLabel: "Email Address:",
        emailPlaceholder: "Enter your email address",
        emailError: "Please provide a valid email address.",
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
            <p>Last updated: ${new Date().toLocaleDateString('en-US')}</p>
        `
    },
    ja: {
        pageLangLabel: "言語を選択してください:",
        yourInfoTitle: "あなたの情報",
        friendInfoTitle: "友人情報",
        fullNameLabel: "氏名:",
        fullNamePlaceholder: "氏名を入力してください",
        fullNameError: "氏名を入力してください。",
        phoneLabel: "電話番号:",
        phonePlaceholder: "電話番号を入力してください",
        phoneError: "有効な電話番号を入力してください。",
        emailLabel: "メールアドレス:",
        emailPlaceholder: "メールアドレスを入力してください",
        emailError: "有効なメールアドレスを入力してください。",
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
            <p>最終更新日: ${new Date().toLocaleDateString('ja-JP')}</p>
        `
    },
    ko: {
        pageLangLabel: "언어 선택:",
        yourInfoTitle: "귀하의 정보",
        friendInfoTitle: "친구 정보",
        fullNameLabel: "성명:",
        fullNamePlaceholder: "성명을 입력하세요",
        fullNameError: "성명을 입력해 주세요.",
        phoneLabel: "전화번호:",
        phonePlaceholder: "전화번호를 입력하세요",
        phoneError: "유효한 전화번호를 입력해 주세요.",
        emailLabel: "이메일 주소:",
        emailPlaceholder: "이메일 주소를 입력하세요",
        emailError: "유효한 이메일 주소를 입력해 주세요.",
        jobLangLabel: "직무 언어:",
        jobLangError: "직무 언어를 선택해 주세요.",
        locationLabel: "근무 위치:",
        locationError: "근무 위치를 선택해 주세요.",
        selectOption: "선택하세요",
        consentText1: "나는 Teleperformance의",
        termsLink: "이용 약관",
        consentText2: "에 동의합니다. 채용 목적으로 친구의 정보를 Teleperformance와 공유하는 것에 대해 친구의 동의를 얻었음을 확인합니다.",
        consentError: "이용 약관에 동의해야 합니다.",
        nextBtn: "추천 제출",
        thankYouTitle: "추천해 주셔서 감사합니다!",
        referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
        scanText: "QR 코드를 스캔하여 지원하세요",
        followUs: "팔로우 하세요:",
        backText: "뒤로",
        copyText: "복사",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "현지 소셜 미디어:",
        shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: ",
        termsTitle: "이용 약관",
        closeBtn: "닫기",
        copiedText: "복사되었습니다!",
        termsContent: `
            <h4>친구 추천 프로그램 약관</h4>
            <p>Teleperformance의 친구 추천 프로그램에 참여함으로써 다음 약관에 동의하는 것으로 간주됩니다:</p>
            <ol>
                <li>후보자를 추천하려면 현재 직원이거나 승인된 대표자여야 합니다.</li>
                <li>추천된 모든 후보자는 해당 직위의 최소 자격 요건을 충족해야 합니다.</li>
                <li>추천하는 개인의 정보를 제출하기 전에 해당 개인의 동의를 얻어야 합니다.</li>
                <li>추천 보너스(해당하는 경우)는 회사 정책에 따라 지급됩니다.</li>
                <li>Teleperformance는 언제든지 이 프로그램을 수정 또는 종료할 권리를 보유합니다.</li>
                <li>모든 채용 결정은 Teleperformance의 단독 재량에 따라 이루어집니다.</li>
            </ol>
            <p>최종 업데이트: ${new Date().toLocaleDateString('ko-KR')}</p>
        `
    },
    "zh-CN": {
        pageLangLabel: "选择您的语言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "输入您的全名",
        fullNameError: "请提供您的全名。",
        phoneLabel: "电话号码:",
        phonePlaceholder: "输入您的电话号码",
        phoneError: "请输入有效的电话号码。",
        emailLabel: "电子邮件地址:",
        emailPlaceholder: "输入您的电子邮件地址",
        emailError: "请输入有效的电子邮件地址。",
        jobLangLabel: "工作语言:",
        jobLangError: "请选择工作语言。",
        locationLabel: "工作地点:",
        locationError: "请选择工作地点。",
        selectOption: "选择选项",
        consentText1: "我同意",
        termsLink: "条款和条件",
        consentText2: "的推荐朋友计划。我确认已获得朋友的同意，将其信息分享给Teleperformance用于招聘目的。",
        consentError: "您必须同意条款和条件。",
        nextBtn: "提交推荐",
        thankYouTitle: "感谢您的推荐!",
        referralMessage: "这是您朋友申请的个性化链接:",
        scanText: "扫描二维码申请",
        followUs: "关注我们:",
        backText: "返回",
        copyText: "复制",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "微信",
        locationSocial: "当地社交媒体:",
        shareMessage: "查看Teleperformance的这个工作机会: ",
        termsTitle: "条款和条件",
        closeBtn: "关闭",
        copiedText: "已复制!",
        termsContent: `
            <h4>推荐朋友计划条款</h4>
            <p>通过参与Teleperformance推荐朋友计划，您同意以下条款:</p>
            <ol>
                <li>您必须是当前员工或授权代表才能推荐候选人。</li>
                <li>所有被推荐的候选人必须满足该职位的最低资格要求。</li>
                <li>在提交被推荐人的信息之前，您必须获得被推荐人的同意。</li>
                <li>推荐奖金(如适用)将根据公司政策支付。</li>
                <li>Teleperformance保留随时修改或终止本计划的权利。</li>
                <li>所有聘用决定均由Teleperformance全权决定。</li>
            </ol>
            <p>最后更新: ${new Date().toLocaleDateString('zh-CN')}</p>
        `
    },
    "zh-HK": {
        pageLangLabel: "選擇您的語言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "輸入您的全名",
        fullNameError: "請提供您的全名。",
        phoneLabel: "電話號碼:",
        phonePlaceholder: "輸入您的電話號碼",
        phoneError: "請輸入有效的電話號碼。",
        emailLabel: "電子郵件地址:",
        emailPlaceholder: "輸入您的電子郵件地址",
        emailError: "請輸入有效的電子郵件地址。",
        jobLangLabel: "工作語言:",
        jobLangError: "請選擇工作語言。",
        locationLabel: "工作地點:",
        locationError: "請選擇工作地點。",
        selectOption: "選擇選項",
        consentText1: "我同意",
        termsLink: "條款和條件",
        consentText2: "的推薦朋友計劃。我確認已獲得朋友的同意，將其信息分享給Teleperformance用於招聘目的。",
        consentError: "您必須同意條款和條件。",
        nextBtn: "提交推薦",
        thankYouTitle: "感謝您的推薦!",
        referralMessage: "這是您朋友申請的個性化鏈接:",
        scanText: "掃描二維碼申請",
        followUs: "關注我們:",
        backText: "返回",
        copyText: "複製",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "微信",
        locationSocial: "當地社交媒體:",
        shareMessage: "查看Teleperformance的這個工作機會: ",
        termsTitle: "條款和條件",
        closeBtn: "關閉",
        copiedText: "已複製!",
        termsContent: `
            <h4>推薦朋友計劃條款</h4>
            <p>通過參與Teleperformance推薦朋友計劃，您同意以下條款:</p>
            <ol>
                <li>您必須是當前員工或授權代表才能推薦候選人。</li>
                <li>所有被推薦的候選人必須滿足該職位的最低資格要求。</li>
                <li>在提交被推薦人的信息之前，您必須獲得被推薦人的同意。</li>
                <li>推薦獎金(如適用)將根據公司政策支付。</li>
                <li>Teleperformance保留隨時修改或終止本計劃的權利。</li>
                <li>所有聘用決定均由Teleperformance全權決定。</li>
            </ol>
            <p>最後更新: ${new Date().toLocaleDateString('zh-HK')}</p>
        `
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
        termsModal: document.getElementById('termsModal'),
        termsContent: document.getElementById('termsContent')
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
                alert(translations[currentLanguage].loadError || 'Failed to load job data. Please try again later.');
            });
    }

    // Populate job language and location dropdowns
    function populateJobDropdowns() {
        // Get unique languages and locations
        const languages = [...new Set(jobData.map(job => job.Language))];
        const locations = [...new Set(jobData.map(job => job.Location))];

        // Clear and populate language dropdown
        elements.jobLangSelect.innerHTML = '';
        addOption(elements.jobLangSelect, '', translations[currentLanguage].selectOption, true, true);
        languages.forEach(lang => {
            addOption(elements.jobLangSelect, lang, lang);
        });

        // Clear and populate location dropdown
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
        
        // Update terms modal content
        if (elements.termsContent) {
            elements.termsContent.innerHTML = translation.termsContent;
        }
        
        // Re-populate dropdowns with translated placeholder
        populateJobDropdowns();
    }

    // Change language
    function changeLanguage() {
        currentLanguage = elements.pageLangSelect.value;
        updatePageContent();
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
        
        // Determine location for social media links
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
        
        alert(translations[currentLanguage].noJobError || "No job found for the selected criteria");
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
// Update the updateSocialLinks function in script.js
function updateSocialLinks() {
    // Clear existing links
    elements.locationSocialLinks.innerHTML = '';

    // Create container div
    const container = document.createElement('div');
    container.className = 'social-media-container';

    // Add TP Global section
    const globalSection = createSocialMediaSection(
        'TP Global', 
        locationSocialLinks.global
    );
    container.appendChild(globalSection);

    // Add TP Malaysia section if location is Malaysia
    if (currentLocation === 'malaysia') {
        const malaysiaSection = createSocialMediaSection(
            'TP Malaysia', 
            locationSocialLinks.malaysia
        );
        container.appendChild(malaysiaSection);
    }
    // Add TP Thailand section if location is Thailand
    if (currentLocation === 'thailand') {
        const thailandSection = createSocialMediaSection(
            'TP Thailand', 
            locationSocialLinks.thailand
        );
        container.appendChild(thailandSection);
    }

    // Add the container to the DOM
    elements.locationSocialLinks.appendChild(container);
}
    / Helper function to create social media sections
function createSocialMediaSection(title, links) {
    const section = document.createElement('div');
    section.className = 'social-media-section';

    const titleElement = document.createElement('h6');
    titleElement.textContent = title;
    titleElement.className = 'social-media-title';
    section.appendChild(titleElement);

    const linksContainer = document.createElement('div');
    linksContainer.className = 'social-media-links';

    links.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.className = `social-icon ${link.icon}`;
        anchor.target = "_blank";
        anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
        anchor.title = link.name;
        linksContainer.appendChild(anchor);
    });

    section.appendChild(linksContainer);
    return section;
}

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
        
        // WeChat
        elements.shareWechat.onclick = () => {
            alert(translations[currentLanguage]?.wechatAlert || "For WeChat, please copy the link and share it manually within the WeChat app.");
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
