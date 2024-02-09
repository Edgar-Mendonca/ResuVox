// Function to clear all form fields
function clearForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('country').value = '';
    document.getElementById('city').value = '';
    document.getElementById('resumeTitle').innerText = 'Untitled Header';
    quill.root.innerHTML = '';
}

// Event listener for the "Clear Form" button
document.getElementById('clearFormBtn').addEventListener('click', function() {
    clearForm();
    saveResume(); // Save the cleared form data
    updateResume(); // Update the generated resume
});
