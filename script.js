const translations = {
    en: {
        welcomeMessage: "Welcome to TP External Refer A Friend Program",
        pageLangLabel: "Choose Your Language:",
        yourInfoTitle: "Your Information",
        friendInfoTitle: "Friend's Information",
        fullNameLabel: "Full Name:",
        fullNamePlaceholder: "Enter your full name",
        fullNameError: "Please provide your full name.",
        phoneLabel: "Phone Number:",
        phonePlaceholder: "Enter your phone number (01XXXXXXXX)",
        phoneError: "Please provide a valid phone number.",
        phoneHint: "Your phone number must be linked to TnG eWallet for the payment process",
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
        consentText2: "of the Refer a Friend program. I confirm that I have obtained my friend's consent to share their information with TP (Teleperformance Malaysia Sdn Bhd.) for recruitment purposes.",
        consentError: "You must agree to the terms and conditions.",
        nextBtn: "Submit Referral",
        thankYouTitle: "Thank you for your referral!",
        referralMessage: "Here's the personalized link for your friend to apply:",
        scanText: "Or share this QR code with them to apply",
        followUs: "Follow Us On:",
        followMalaysia: "TP Malaysia:",
        followThailand: "TP Thailand:",
        backText: "Back",
        copyText: "Copy",
        whatsappText: "WhatsApp",
        lineText: "Line",
        facebookText: "Facebook",
        locationSocial: "Our Social Media:",
        shareMessage: "Check out this job opportunity at TP (Teleperformance Malaysia Sdn Bhd.): ",
        termsTitle: "Terms and Conditions",
        closeBtn: "Close",
        copiedText: "Copied!",
        dashboardText: "Dashboard",
        clickHereText: "TP RAF",
        tpGlobal: "TP Global",
termsContent: `
<h4>Refer a Friend Program Terms and Conditions</h4>
<p>By participating in the TP (Teleperformance Malaysia Sdn Bhd.) Refer a Friend program, you agree to the following terms:</p>

<table border="0" style="width: 100%; margin: 15px 0; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <thead>
        <tr style="background-color: #f5f5f5;">
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">Milestone</th>
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">Bonus Amount</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 15px;">Candidate passes the assessment</td>
            <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM50</td>
        </tr>
        <tr>
            <td style="padding: 10px 15px;">Candidate completes probation (90 days)</td>
            <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM750</td>
        </tr>
    </tbody>
</table>

<ol>
    <li><strong>Payment</strong>:
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>Bonuses (total RM800) will be paid via Touch 'n Go e-wallet.</li>
            <li>Ensure the provided mobile number matches your linked Touch 'n Go account.</li>
        </ul>
    </li>
    <li><strong>Eligibility</strong>:
        <ul style="list-style-type: disc; margin-left: 20px;">
            <li>All referred candidates must meet the position's minimum qualifications.</li>
            <li>Ex-TP employees will only be considered as valid referred candidates after a 12-month cooling-off period from their last working day at TP.</li>
            <li>Referrals must not be current TP Group employees (any country, including full-time, part-time, contract, or temporary staff).</li>
            <li>Internship/part-time role referrals are ineligible for bonuses.</li>
        </ul>
    </li>
    <li>You confirm your referred friend consents to share their information with TP for recruitment purposes.</li>
    <li>You consent to TP collecting and using your personal data for program administration.</li>
    <li>TP reserves the right to modify or terminate this program at any time.</li>
    <li>All hiring decisions are at TP's sole discretion.</li>
</ol>
<p style="font-size: 0.9em; color: #666; margin-top: 20px;">Last updated: ${new Date().toLocaleDateString('en-US')}</p>
`,      
        noJobError: "No job found for the selected criteria",
        jobPortalText: "TP Job Portal",
        loadError: "Failed to load job data. Please try again later."
    },
    ja: {
        welcomeMessage: "TP外部友人紹介プログラムへようこそ",
        pageLangLabel: "言語を選択してください:",
        yourInfoTitle: "あなたの情報",
        friendInfoTitle: "友人情報",
        fullNameLabel: "氏名:",
        fullNamePlaceholder: "氏名を入力してください",
        fullNameError: "氏名を入力してください。",
        phoneLabel: "電話番号:",
        phonePlaceholder: "電話番号を入力してください (01XXXXXXXX)",
        phoneError: "有効な電話番号を入力してください。",
        phoneHint: "支払いプロセスのため、電話番号はTnG eWalletにリンクされている必要があります",
        emailLabel: "メールアドレス:",
        emailPlaceholder: "メールアドレスを入力してください",
        emailError: "有効なメールアドレスを入力してください。",
        jobLangLabel: "職務言語:",
        jobLangError: "職務言語を選択してください。",
        locationLabel: "勤務地:",
        locationError: "勤務地を選択してください。",
        selectOption: "選択してください",
        consentText1: "私はTP (Teleperformance Malaysia Sdn Bhd.)の",
        termsLink: "利用規約",
        consentText2: "「友人を紹介する」プログラムに同意します。私は採用目的で友人の情報をTP (Teleperformance Malaysia Sdn Bhd.)と共有することについて、友人の同意を得たことを確認します。",
        consentError: "利用規約に同意する必要があります。",
        nextBtn: "紹介を送信",
        thankYouTitle: "ご紹介ありがとうございます!",
        referralMessage: "友達が応募するためのリンクです:",
        scanText: "QRコードをスキャンして応募",
        followUs: "フォローしてください:",
        followMalaysia: "TP Malaysia:",
        followThailand: "TP Thailand:",
        backText: "戻る",
        copyText: "コピー",
        whatsappText: "WhatsApp",
        lineText: "Line",
        facebookText: "Facebook",
        locationSocial: "ソーシャルメディア:",
        shareMessage: "TP (Teleperformance Malaysia Sdn Bhd.)のこの求人情報をチェックしてください: ",
        termsTitle: "利用規約",
        closeBtn: "閉じる",
        copiedText: "コピーしました!",
        dashboardText: "ダッシュボード",
        clickHereText: "TP RAF",
        tpGlobal: "TP Global",
        termsContent: `
        <h4>友人紹介プログラムの利用規約</h4>
        <p>TP (Teleperformance Malaysia Sdn Bhd.)の「友人紹介プログラム」に参加することにより、以下の条件に同意するものとします：</p>
        
        <table border="0" style="width: 100%; margin: 15px 0; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">達成基準</th>
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">ボーナス額</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 15px;">候補者が審査を通過</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM50</td>
                </tr>
                <tr>
                    <td style="padding: 10px 15px;">候補者が試用期間（90日）を完了</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM750</td>
                </tr>
            </tbody>
        </table>
        
        <ol>
            <li><strong>支払い</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>ボーナス（合計RM800）はTouch 'n Go電子財布で支払われます。</li>
                    <li>提供された携帯番号がTouch 'n Goアカウントに登録された番号と一致することを確認してください。</li>
                </ul>
            </li>
            <li><strong>資格条件</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>紹介された候補者は、職位の最低要件を満たす必要があります。</li>
                    <li>元TP従業員は、TPでの最終勤務日から12ヶ月以上の冷却期間を経た後にのみ有効な被紹介者として認められます。</li>
                    <li>紹介対象者は、いかなる国のTPグループの現役従業員（正社員、パートタイム、契約社員、臨時スタッフを含む）であってはなりません。</li>
                    <li>インターンシップ・パートタイム職の紹介はボーナス対象外です。</li>
                </ul>
            </li>
            <li>紹介された友人が、採用目的でTPに個人情報を提供することに同意していることを確認します。</li>
            <li>プログラム運営のため、TPが個人データを収集・使用することに同意します。</li>
            <li>TPは随時、本プログラムの変更または終了する権利を留保します。</li>
            <li>採用の可否はTPの裁量により決定されます。</li>
        </ol>
        <p style="font-size: 0.9em; color: #666; margin-top: 20px;">最終更新日: ${new Date().toLocaleDateString('ja-JP')}</p>
        `,        
        noJobError: "選択した条件に該当する仕事が見つかりません",
        loadError: "仕事のデータの読み込みに失敗しました。後ほど再度お試しください。"
    },
    ko: {
        welcomeMessage: "TP 외부 친구 추천 프로그램에 오신 것을 환영합니다",
        pageLangLabel: "언어 선택:",
        yourInfoTitle: "귀하의 정보",
        friendInfoTitle: "친구 정보",
        fullNameLabel: "성명:",
        fullNamePlaceholder: "성명을 입력하세요",
        fullNameError: "성명을 입력해 주세요.",
        phoneLabel: "전화번호:",
        phonePlaceholder: "전화번호를 입력하세요 (01XXXXXXXX)",
        phoneError: "유효한 전화번호를 입력해 주세요.",
        phoneHint: "결제 과정을 위해 전화번호는 TnG eWallet에 연결되어 있어야 합니다",
        emailLabel: "이메일 주소:",
        emailPlaceholder: "이메일 주소를 입력하세요",
        emailError: "유효한 이메일 주소를 입력해 주세요.",
        jobLangLabel: "직무 언어:",
        jobLangError: "직무 언어를 선택해 주세요.",
        locationLabel: "근무 위치:",
        locationError: "근무 위치를 선택해 주세요.",
        selectOption: "선택하세요",
        consentText1: "나는 TP (Teleperformance Malaysia Sdn Bhd.)의",
        termsLink: "이용 약관",
        consentText2: "에 동의합니다. 채용 목적으로 친구의 정보를 TP (Teleperformance Malaysia Sdn Bhd.)와 공유하는 것에 대해 친구의 동의를 얻었음을 확인합니다.",
        consentError: "이용 약관에 동의해야 합니다.",
        nextBtn: "추천 제출",
        thankYouTitle: "추천해 주셔서 감사합니다!",
        referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
        scanText: "QR 코드를 스캔하여 지원하세요",
        followUs: "팔로우 하세요:",
        followMalaysia: "TP Malaysia:",
        followThailand: "TP Thailand:",
        backText: "뒤로",
        copyText: "복사",
        whatsappText: "WhatsApp",
        lineText: "Line",
        facebookText: "Facebook",
        locationSocial: "소셜 미디어:",
        shareMessage: "TP (Teleperformance Malaysia Sdn Bhd.)의 이 채용 기회를 확인하세요: ",
        termsTitle: "이용 약관",
        closeBtn: "닫기",
        copiedText: "복사되었습니다!",
        dashboardText: "대시보드",
        clickHereText: "TP RAF",
        tpGlobal: "TP Global",
        termsContent: `
        <h4>친구 추천 프로그램 약관</h4>
        <p>TP (Teleperformance Malaysia Sdn Bhd.)의 친구 추천 프로그램에 참여함으로써, 귀하는 다음 약관에 동의합니다:</p>
        
        <table border="0" style="width: 100%; margin: 15px 0; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">단계</th>
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">보너스 금액</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 15px;">후보자가 평가 통과</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM50</td>
                </tr>
                <tr>
                    <td style="padding: 10px 15px;">후보자가 수습 기간(90일) 완료</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM750</td>
                </tr>
            </tbody>
        </table>
        
        <ol>
            <li><strong>지급</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>보너스(총 RM800)는 Touch 'n Go 전자지갑으로 지급됩니다.</li>
                    <li>제공된 휴대폰 번호가 Touch 'n Go 계정과 일치하는지 확인하세요.</li>
                </ul>
            </li>
            <li><strong>자격 요건</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>추천된 후보자는 해당 직위의 최소 요건을 충족해야 합니다.</li>
                    <li>전 TP 직원은 퇴사 후 12개월의 유예 기간이 지나야만 유효한 추천 후보자로 간주됩니다.</li>
                    <li>추천 대상자는 어떤 국가의 TP 그룹 현직 직원(정규직, 파트타임, 계약직, 임시직 포함)이 아니어야 합니다.</li>
                    <li>인턴/파트타임 직책 추천은 보너스 대상이 아닙니다.</li>
                </ul>
            </li>
            <li>추천된 친구가 채용 목적으로 TP에 정보 제공에 동의함을 확인합니다.</li>
            <li>프로그램 운영을 위해 TP가 개인 데이터를 수집·사용하는 것에 동의합니다.</li>
            <li>TP는 프로그램 수정 또는 종료 권한을 보유합니다.</li>
            <li>채용 결정은 TP의 재량에 따릅니다.</li>
        </ol>
        <p style="font-size: 0.9em; color: #666; margin-top: 20px;">최종 업데이트: ${new Date().toLocaleDateString('ko-KR')}</p>
        `,        
        noJobError: "선택한 기준에 맞는 직업을 찾을 수 없습니다",
        loadError: "작업 데이터를 로드하지 못했습니다. 나중에 다시 시도하십시오."
    },
    "zh-CN": {
        welcomeMessage: "欢迎来到TP外部推荐朋友计划",
        pageLangLabel: "选择您的语言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "输入您的全名",
        fullNameError: "请提供您的全名。",
        phoneLabel: "电话号码:",
        phonePlaceholder: "输入您的电话号码 (01XXXXXXXX)",
        phoneError: "请输入有效的电话号码。",
        phoneHint: "您的电话号码必须链接到TnG eWallet以进行支付流程",
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
        consentText2: "的推荐朋友计划。我确认已获得朋友的同意，将其信息分享给TP (Teleperformance Malaysia Sdn Bhd.)用于招聘目的。",
        consentError: "您必须同意条款和条件。",
        nextBtn: "提交推荐",
        thankYouTitle: "感谢您的推荐!",
        referralMessage: "这是您朋友申请的个性化链接:",
        scanText: "扫描二维码申请",
        followUs: "关注我们:",
        followMalaysia: "TP Malaysia:",
        followThailand: "TP Thailand:",
        backText: "返回",
        copyText: "复制",
        whatsappText: "WhatsApp",
        lineText: "Line",
        facebookText: "Facebook",
        locationSocial: "社交媒体:",
        shareMessage: "查看TP (Teleperformance Malaysia Sdn Bhd.)的这个工作机会: ",
        termsTitle: "条款和条件",
        closeBtn: "关闭",
        copiedText: "已复制!",
        dashboardText: "仪表板",
        clickHereText: "TP RAF",
        tpGlobal: "TP Global",
        termsContent: `
        <h4>推荐朋友计划条款</h4>
        <p>参与TP (Teleperformance Malaysia Sdn Bhd.)的推荐朋友计划，即表示您同意以下条款：</p>
        
        <table border="0" style="width: 100%; margin: 15px 0; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">阶段</th>
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">奖金金额</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 15px;">候选人通过评估</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM50</td>
                </tr>
                <tr>
                    <td style="padding: 10px 15px;">候选人完成试用期（90天）</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM750</td>
                </tr>
            </tbody>
        </table>
        
        <ol>
            <li><strong>支付</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>奖金（总计RM800）将通过Touch 'n Go电子钱包支付。</li>
                    <li>确保提供的手机号与您Touch 'n Go账户绑定的号码一致。</li>
                </ul>
            </li>
            <li><strong>资格条件</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>所有被推荐人需满足该职位的最低要求。</li>
                    <li>前TP员工需离职满12个月冷却期后，方可作为有效被推荐人。</li>
                    <li>被推荐人不得是任何国家TP集团的现任员工（含全职、兼职、合约或临时工）。</li>
                    <li>实习/兼职职位推荐无奖金资格。</li>
                </ul>
            </li>
            <li>您确认被推荐朋友同意TP为招聘目的使用其个人信息。</li>
            <li>您同意TP为计划管理收集和使用您的个人数据。</li>
            <li>TP保留随时修改或终止本计划的权利。</li>
            <li>所有聘用决定由TP全权决定。</li>
        </ol>
        <p style="font-size: 0.9em; color: #666; margin-top: 20px;">最后更新: ${new Date().toLocaleDateString('zh-CN')}</p>
        `,        
        noJobError: "找不到符合所选条件的工作",
        loadError: "无法加载工作数据。请稍后再试。"
    },
    "zh-HK": {
        welcomeMessage: "歡迎來到TP外部推薦朋友計劃",
        pageLangLabel: "選擇您的語言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "輸入您的全名",
        fullNameError: "請提供您的全名。",
        phoneLabel: "電話號碼:",
        phonePlaceholder: "輸入您的電話號碼 (01XXXXXXXX)",
        phoneError: "請輸入有效的電話號碼。",
        phoneHint: "您的電話號碼必須連結到TnG eWallet以進行支付流程",
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
        consentText2: "的推薦朋友計劃。我確認已獲得朋友的同意，將其信息分享給TP (Teleperformance Malaysia Sdn Bhd.)用於招聘目的。",
        consentError: "您必須同意條款和條件。",
        nextBtn: "提交推薦",
        thankYouTitle: "感謝您的推薦!",
        referralMessage: "這是您朋友申請的個性化鏈接:",
        scanText: "掃描二維碼申請",
        followUs: "關注我們:",
        followMalaysia: "TP Malaysia:",
        followThailand: "TP Thailand:",
        backText: "返回",
        copyText: "複製",
        whatsappText: "WhatsApp",
        lineText: "Line",
        facebookText: "Facebook",
        locationSocial: "社交媒體:",
        shareMessage: "查看TP (Teleperformance Malaysia Sdn Bhd.)的這個工作機會: ",
        termsTitle: "條款和條件",
        closeBtn: "關閉",
        copiedText: "已複製!",
        dashboardText: "儀表板",
        clickHereText: "TP RAF",
        tpGlobal: "TP Global",
        termsContent: `
        <h4>推薦朋友計劃條款</h4>
        <p>參與TP (Teleperformance Malaysia Sdn Bhd.)嘅推薦朋友計劃，即代表你同意以下條款：</p>
        
        <table border="0" style="width: 100%; margin: 15px 0; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">階段</th>
                    <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">獎金金額</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 15px;">候選人通過評估</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM50</td>
                </tr>
                <tr>
                    <td style="padding: 10px 15px;">候選人完成試用期（90日）</td>
                    <td style="padding: 10px 15px; font-weight: bold; color: #2a6496;">RM750</td>
                </tr>
            </tbody>
        </table>
        
        <ol>
            <li><strong>支付方式</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>獎金（總共RM800）會透過Touch 'n Go電子錢包發放。</li>
                    <li>確保提供嘅手機號碼同你Touch 'n Go賬戶綁定嘅號碼一致。</li>
                </ul>
            </li>
            <li><strong>資格要求</strong>:
                <ul style="list-style-type: disc; margin-left: 20px;">
                    <li>所有被推薦人必須符合該職位嘅最低要求。</li>
                    <li>前TP員工必須離職滿12個月冷靜期後，先可以成為有效被推薦人。</li>
                    <li>被推薦人唔可以係任何國家TP集團嘅現職員工（包括全職、兼職、合約或臨時工）。</li>
                    <li>實習或兼職推薦無獎金。</li>
                </ul>
            </li>
            <li>你確認被推薦朋友同意TP為招聘用途使用其個人資料。</li>
            <li>你同意TP收集同使用你嘅個人資料作計劃管理。</li>
            <li>TP有權隨時修改或終止本計劃。</li>
            <li>所有聘用決定由TP全權決定。</li>
        </ol>
        <p style="font-size: 0.9em; color: #666; margin-top: 20px;">最後更新: ${new Date().toLocaleDateString('zh-HK')}</p>
        `,        
        noJobError: "找不到符合所選條件的工作",
        loadError: "無法加載工作數據。請稍後再試。"
    }
};

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
        { url: "https://www.youtube.com/@TeleperformanceGroup", icon: "youtube", name: "YouTube" },
        { url: "https://www.tiktok.com/@teleperformance_group", icon: "tiktok", name: "TikTok" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
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
        shareFacebook: document.getElementById('share-facebook'),
        locationSocialLinks: document.getElementById('location-social-links'),
        termsModal: document.getElementById('termsModal'),
        termsContent: document.getElementById('termsContent')
    };

    let currentLanguage = 'en';
    let currentLocation = '';
    let jobData = [];

    // Create phone hint element
    const phoneHint = document.createElement('div');
    phoneHint.className = 'phone-hint mt-1 small text-muted';
    elements.phoneNumber.parentNode.insertBefore(phoneHint, elements.phoneNumber.nextSibling);

   function showWelcomePopup() {
    const popup = document.createElement('div');
    popup.className = 'welcome-popup';
    
    // Create money countdown container
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'welcome-countdown-container';
    
    const countdownTitle = document.createElement('div');
    countdownTitle.className = 'welcome-countdown-title';
    countdownTitle.textContent = 'Welcome to TP External Refer A Friend Program';
    
    const moneyCountdown = document.createElement('div');
    moneyCountdown.className = 'welcome-money-countdown';
    moneyCountdown.id = 'welcomeMoneyCountdown';
    moneyCountdown.textContent = 'RM30,000';
    
    const hurryMessage = document.createElement('div');
    hurryMessage.className = 'welcome-hurry-message';
    hurryMessage.textContent = 'Hurry! The rewards are disappearing fast! 🚀';
    
    countdownContainer.appendChild(countdownTitle);
    countdownContainer.appendChild(moneyCountdown);
    countdownContainer.appendChild(hurryMessage);
    
    const logo = document.createElement('img');
    logo.src = 'TPLogo11.png';
    logo.alt = 'Teleperformance Logo';
    logo.className = 'welcome-logo';
    
    const messageContainer = document.createElement('div');
    messageContainer.className = 'welcome-message-container';
    
    // Get welcome message in all languages
    const welcomeMessages = [
        translations.en.welcomeMessage,
        translations.ja.welcomeMessage,
        translations.ko.welcomeMessage,
        translations['zh-CN'].welcomeMessage,
        translations['zh-HK'].welcomeMessage
    ];
    
    // Create a div for each language's welcome message
    welcomeMessages.forEach((msg, index) => {
        const message = document.createElement('div');
        message.className = 'welcome-message-line';
        message.textContent = msg;
        message.style.animationDelay = `${index * 0.5}s`; // Stagger the animations
        messageContainer.appendChild(message);
    });
    
    popup.appendChild(countdownContainer);
    popup.appendChild(logo);
    popup.appendChild(messageContainer);
    document.body.appendChild(popup);
    
    // Start the countdown animation
    const moneyElement = document.getElementById('welcomeMoneyCountdown');
    const startAmount = 30000;
    const endAmount = 20000;
    let currentAmount = startAmount;
    const duration = 15000; // 15 seconds
    const startTime = Date.now();
    
    function formatMoney(amount) {
        return 'RM' + amount.toLocaleString('en-US');
    }
    
    function updateCountdown() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out function to slow down at the end
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        currentAmount = startAmount - (startAmount - endAmount) * easedProgress;
        
        moneyElement.textContent = formatMoney(Math.floor(currentAmount));
        
        // Add pumping effect
        moneyElement.classList.add('pumping');
        setTimeout(() => {
            moneyElement.classList.remove('pumping');
        }, 500);
        
        // Randomly change the hurry message
        if (Math.random() < 0.02) {
            const hurryMessages = [
                "Hurry! The rewards are disappearing fast! 🚀",
                "Don't wait - the amount is dropping! ⏳",
                "Limited rewards available! 💰",
                "Join now before it's too late! 🔥",
                "Others are claiming their rewards - don't miss out! 👥"
            ];
            hurryMessage.textContent = hurryMessages[Math.floor(Math.random() * hurryMessages.length)];
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCountdown);
        } else {
            // Final message when countdown completes
            const finalMessages = [
                "Last chance to claim your rewards!",
                "Time's almost up! Don't miss out!",
                "Final amounts remaining - act now!",
                "Rewards are going fast - join today!"
            ];
            hurryMessage.textContent = finalMessages[Math.floor(Math.random() * finalMessages.length)];
        }
    }
    
    // Start the countdown
    updateCountdown();
    
    // Hide after 5 seconds (after all animations complete)
    setTimeout(() => {
        popup.classList.add('hidden');
        // Remove after animation completes
        setTimeout(() => {
            popup.remove();
        }, 1000);
    }, 5000);
}
        
        popup.appendChild(logo);
        popup.appendChild(messageContainer);
        document.body.appendChild(popup);
        
        // Hide after 5 seconds (after all animations complete)
        setTimeout(() => {
            popup.classList.add('hidden');
            // Remove after animation completes
            setTimeout(() => {
                popup.remove();
            }, 1000);
        }, 5000);
    }

    function init() {
        showWelcomePopup();
        loadJobData();
        setupEventListeners();
        updatePageContent();
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

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
                alert(translations[currentLanguage].loadError);
            });
    }

    function populateJobDropdowns() {
        const languages = [...new Set(jobData.map(job => job.Language))];
        const locations = [...new Set(jobData.map(job => job.Location))];

        elements.jobLangSelect.innerHTML = '';
        addOption(elements.jobLangSelect, '', translations[currentLanguage].selectOption, true, true);
        languages.forEach(lang => {
            addOption(elements.jobLangSelect, lang, lang);
        });

        elements.locationSelect.innerHTML = '';
        addOption(elements.locationSelect, '', translations[currentLanguage].selectOption, true, true);
        locations.forEach(loc => {
            addOption(elements.locationSelect, loc, loc);
        });
    }

    function addOption(select, value, text, disabled = false, selected = false) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        option.disabled = disabled;
        option.selected = selected;
        select.appendChild(option);
    }

    function updatePageContent() {
        const translation = translations[currentLanguage] || translations.en;
        
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
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        if (elements.termsContent) {
            elements.termsContent.innerHTML = translation.termsContent;
        }
        
        // Update phone hint message
        phoneHint.textContent = translation.phoneHint;
        
        populateJobDropdowns();
    }

    function changeLanguage() {
        currentLanguage = elements.pageLangSelect.value;
        updatePageContent();
    }

    // Phone number validation - only allow numbers
    elements.phoneNumber.addEventListener('input', function() {
        // Remove any non-digit characters
        this.value = this.value.replace(/[^\d]/g, '');
        
        // Show TnG hint when user starts typing
        if (this.value.length > 0) {
            phoneHint.style.display = 'block';
        } else {
            phoneHint.style.display = 'none';
        }
        
        validateForm();
    });

    function validatePhoneNumber(phone) {
        const regex = /^\+601\d{8,9}$/;
        return regex.test(phone);
    }

    function validateForm() {
        let isValid = true;
        
        if (!elements.fullName.value.trim()) {
            elements.fullName.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.fullName.classList.remove('is-invalid');
        }
        
        if (!elements.phoneNumber.value.trim() || elements.phoneNumber.value.trim().length < 8) {
            elements.phoneNumber.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.phoneNumber.classList.remove('is-invalid');
        }
        
        if (!validateEmail(elements.email.value)) {
            elements.email.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.email.classList.remove('is-invalid');
        }
        
        if (!elements.jobLangSelect.value) {
            elements.jobLangSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobLangSelect.classList.remove('is-invalid');
        }
        
        if (!elements.locationSelect.value) {
            elements.locationSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.locationSelect.classList.remove('is-invalid');
        }
        
        if (!elements.consentCheckbox.checked) {
            elements.consentCheckbox.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.consentCheckbox.classList.remove('is-invalid');
        }
        
        elements.nextBtn.disabled = !isValid;
        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function generateReferral() {
        if (!validateForm()) return false;
        
        const name = elements.fullName.value.trim().replace(/\s+/g, '+');
        const phone = encodeURIComponent(elements.phoneNumber.value.trim());
        const email = encodeURIComponent(elements.email.value.trim());
        const jobLanguage = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        
        currentLocation = location.toLowerCase().includes('malaysia') ? 'malaysia' : 
                         location.toLowerCase().includes('thailand') ? 'thailand' : 'global';
        
        const job = jobData.find(
            item => item.Language === jobLanguage && 
                   item.Location === location
        );
        
        if (job) {
            const baseUrl = job['Evergreen link'].split('?')[0];
            const referralUrl = `${baseUrl}?iis=xRAF&iisn=${name}%7C${phone}%7C${email}`;
            
            elements.referralLink.value = referralUrl;
            generateQRCode(referralUrl);
            updateSocialLinks();
            return true;
        }
        
        alert(translations[currentLanguage].noJobError);
        return false;
    }

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

    function updateSocialLinks() {
        elements.locationSocialLinks.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'social-media-container';

        // Always show all social media sections regardless of location
        const sections = [
            { title: translations[currentLanguage].tpGlobal || 'TP Global', links: locationSocialLinks.global },
            { title: translations[currentLanguage].followMalaysia || 'TP Malaysia', links: locationSocialLinks.malaysia },
            { title: translations[currentLanguage].followThailand || 'TP Thailand', links: locationSocialLinks.thailand }
        ];

        sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'social-media-section';
            
            const title = document.createElement('h6');
            title.textContent = section.title;
            title.className = 'social-media-title';
            sectionDiv.appendChild(title);
            
            const linksDiv = document.createElement('div');
            linksDiv.className = 'social-media-links';
            
            section.links.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.className = `social-icon ${link.icon}`;
                anchor.target = "_blank";
                anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
                anchor.title = link.name;
                linksDiv.appendChild(anchor);
            });
            
            sectionDiv.appendChild(linksDiv);
            container.appendChild(sectionDiv);
        });

        elements.locationSocialLinks.appendChild(container);
        updateShareButtons();
    }

    function updateShareButtons() {
        const shareUrl = encodeURIComponent(elements.referralLink.value);
        const shareText = translations[currentLanguage]?.shareMessage || translations.en.shareMessage;
        const encodedShareText = encodeURIComponent(shareText);
        
        elements.shareWhatsapp.onclick = () => {
            window.open(`https://wa.me/?text=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        elements.shareLine.onclick = () => {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        elements.shareFacebook.onclick = () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
        };
    }

    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLanguage]?.copiedText || 'Copied!'}`;
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    function showStep2() {
        if (generateReferral()) {
            elements.step1.style.display = 'none';
            elements.step2.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    function showStep1() {
        elements.step2.style.display = 'none';
        elements.step1.style.display = 'block';
    }

    function setupEventListeners() {
        elements.pageLangSelect.addEventListener('change', changeLanguage);
        
        elements.fullName.addEventListener('input', validateForm);
        elements.phoneNumber.addEventListener('input', validateForm);
        elements.email.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', validateForm);
        elements.locationSelect.addEventListener('change', validateForm);
        elements.consentCheckbox.addEventListener('change', validateForm);
        
        elements.nextBtn.addEventListener('click', showStep2);
        elements.backBtn.addEventListener('click', showStep1);
        
        elements.copyBtn.addEventListener('click', copyToClipboard);
        
        const termsModal = new bootstrap.Modal(elements.termsModal);
        document.querySelector('[data-bs-target="#termsModal"]').addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.show();
        });
    }

    init();
});
