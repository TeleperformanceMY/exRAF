let jsonData = [];

// Fetch JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    populatePreferredLanguages(jsonData);
    populateLocations(jsonData);
  })
  .catch(error => console.error('Error loading JSON data:', error));

// Populate preferred languages based on JSON data
function populatePreferredLanguages(data) {
  const languages = [...new Set(data.map(item => item.Language))];
  populateDropdown(document.getElementById('language-select'), languages);
}

// Populate locations based on JSON data
function populateLocations(data) {
  const locations = [...new Set(data.map(item => item.Location))];
  populateDropdown(document.getElementById('location-select'), locations);
}

// Populate a dropdown with options
function populateDropdown(dropdown, options) {
  dropdown.innerHTML = '';
  dropdown.appendChild(new Option('--Select--', ''));
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.text = option;
    dropdown.appendChild(opt);
  });
}

// Event listener for language selection
document.getElementById('language-select').addEventListener('change', function () {
  const selectedLanguage = this.value;
  const filteredLocations = selectedLanguage
    ? [...new Set(jsonData.filter(item => item.Language === selectedLanguage).map(item => item.Location))]
    : [...new Set(jsonData.map(item => item.Location))];
  populateDropdown(document.getElementById('location-select'), filteredLocations);
  updateJobsDropdown();
});

// Event listener for location selection
document.getElementById('location-select').addEventListener('change', function () {
  updateJobsDropdown();
});

// Update jobs dropdown based on selected language and location
function updateJobsDropdown() {
  const selectedLanguage = document.getElementById('language-select').value;
  const selectedLocation = document.getElementById('location-select').value;
  if (selectedLanguage && selectedLocation) {
    const jobs = jsonData
      .filter(item => item.Language === selectedLanguage && item.Location === selectedLocation)
      .map(item => item.Positions);
    populateDropdown(document.getElementById('job-type-select'), jobs);
  } else {
    populateDropdown(document.getElementById('job-type-select'), []);
  }
}

// Move to the next step and display the generated link
function nextStep() {
  const bmsId = document.getElementById('bms-id').value;
  if (!bmsId) {
    alert("Please enter a valid BMS ID.");
    return;
  }

  const selectedLanguage = document.getElementById('language-select').value;
  const selectedLocation = document.getElementById('location-select').value;
  const selectedJob = document.getElementById('job-type-select').value;

  const jobData = jsonData.find(
    item => item.Language === selectedLanguage && item.Location === selectedLocation && item.Positions === selectedJob
  );

  if (jobData) {
    const finalLink = jobData["Evergreen link"] + bmsId;
    document.getElementById('generated-link').innerHTML = `<a href="${finalLink}" target="_blank">${finalLink}</a>`;
  }

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

// Refresh the page
function refreshPage() {
  location.reload();
}
