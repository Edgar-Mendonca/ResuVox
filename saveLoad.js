// Function to save resume data to local storage
function saveResume() {
    const resumeData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        jobTitle: document.getElementById('jobTitle').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        professionalSummary: quill.root.innerHTML,
        resumeTitle: document.getElementById('resumeTitle').innerText // Use innerText for editable elements
    };

    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Function to load resume data from local storage
function loadResume() {
    const resumeData = JSON.parse(localStorage.getItem('resumeData'));
    if (resumeData) {
        document.getElementById('firstName').value = resumeData.firstName;
        document.getElementById('lastName').value = resumeData.lastName;
        document.getElementById('jobTitle').value = resumeData.jobTitle;
        document.getElementById('email').value = resumeData.email;
        document.getElementById('phone').value = resumeData.phone;
        document.getElementById('country').value = resumeData.country;
        document.getElementById('city').value = resumeData.city;
        quill.root.innerHTML = resumeData.professionalSummary;
        document.getElementById('resumeTitle').innerText = resumeData.resumeTitle; // Use innerText for editable elements
        updateResume();
    }
}

// Call loadResume to populate the form with saved data on page load
loadResume();

// Event listeners to trigger saveResume function on input change
document.getElementById('jobTitle').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('firstName').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('lastName').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('email').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('phone').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('country').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('city').addEventListener('input', function() {
    saveResume();
    updateResume();
});
document.getElementById('resumeTitle').addEventListener('input', function() {
    saveResume();
    updateResume();
});
quill.on('text-change', function() {
    saveResume();
    updateResume();
});
