function nextStep() {
    const bmsId = document.getElementById('bms-id').value;
    if (!bmsId) {
        alert("Please enter a valid BMS ID.");
        return;
    }

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';

    const generatedLink = document.getElementById('generated-link');
    generatedLink.innerHTML = `<a href="https://example.com/referral/${bmsId}" target="_blank">https://example.com/referral/${bmsId}</a>`;
}

function refreshPage() {
    location.reload();
}
