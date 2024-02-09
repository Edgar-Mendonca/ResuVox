// Function to update the generated resume based on user input
function updateResume() {
    // Retrieve input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;

// Generate the resume content dynamically
const resumeContent = `
    <div class="container py-3">
        <div class="text-left">
            <h2><strong>${firstName} ${lastName}</strong></h2>
            <p>${jobTitle}</p>
        </div>
        <hr>
        <div class="row text-right" >
            <div class="col-md-3">
                <p><i class="bi bi-envelope" style="display:inline;"></i> ${email}</p>
                <p><i class="bi bi-telephone" style="display:inline;"></i> ${phone}</p>
                <p><i class="bi bi-geo-alt" style="display:inline;"></i> ${country}, ${city}</p>
            </div>
        </div>
    </div>
`;




    // Update the generated resume container with the dynamically generated content
    document.getElementById('generatedResume').innerHTML = resumeContent;
}

// Event listeners to trigger the updateResume function on input change
document.getElementById('jobTitle').addEventListener('input', updateResume);
document.getElementById('firstName').addEventListener('input', updateResume);
document.getElementById('lastName').addEventListener('input', updateResume);
document.getElementById('email').addEventListener('input', updateResume);
document.getElementById('phone').addEventListener('input', updateResume);
document.getElementById('country').addEventListener('input', updateResume);
document.getElementById('city').addEventListener('input', updateResume);

// Call updateResume initially to populate the generated resume with default content
updateResume();

