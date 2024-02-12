// Function to initialize the Quill editor
const quill = new Quill('#professionalSummary', {
    theme: 'snow', // or 'bubble' for a bubble theme
    placeholder: 'Write your professional summary here...',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      
            [{ 'indent': '-1' }, { 'indent': '+1' }],          
            [{ 'direction': 'rtl' }],                         

            [{ 'size': ['small', false, 'large', 'huge'] }],  
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                                         
        ],
    },
});

// Update the generated resume when the editor content changes
quill.on('text-change', function() {
    updateResume();
});


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
    const photoInput = document.getElementById("photo");
    const professionalSummary = quill.getLength() > 1; // Check if there's content in Quill editor

    // Generate the resume content dynamically
    let resumeContent = `
        <div class="container py-3 px-3">
            <div class="text-left">
                <h2><strong>${firstName} ${lastName}</strong></h2>
                ${jobTitle ? `<p>${jobTitle}</p>` : ''}
                ${email ? `<p><i class="bi bi-envelope" style="display:inline;"></i> ${email}</p>` : ''}
                ${phone ? `<p><i class="bi bi-telephone" style="display:inline;"></i> ${phone}</p>` : ''}
                ${country && city ? `<p><i class="bi bi-geo-alt" style="display:inline;"></i> ${country}, ${city}</p>` : ''}
                ${professionalSummary ? `<h4><i class="bi bi-briefcase"></i> Professional Summary</h4><div>${quill.root.innerHTML}</div>` : ''}
            </div>
        <div>
    `;

    // Check if a file is selected
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const photoUrl = e.target.result;
            // Append image to the resume content
            resumeContent += `
                <div class="row text-right">
                    <div class="col-md-3">
                        <img src="${photoUrl}" alt="User Photo" style="width: 180px; height: 180px;">
                    </div>
                </div>
            `;

            // Close the container div
            resumeContent += `</div>`;

            // Update the generated resume container with the dynamically generated content
            document.getElementById('generatedResume').innerHTML = resumeContent;
        };

        // Read the selected file as Data URL
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // Close the container div if no photo is selected
        resumeContent += `</div>`;
        // Update the generated resume container with the dynamically generated content
        document.getElementById('generatedResume').innerHTML = resumeContent;
    }
}

// Event listeners to trigger the updateResume function on input change
document.getElementById('jobTitle').addEventListener('input', updateResume);
document.getElementById('firstName').addEventListener('input', updateResume);
document.getElementById('lastName').addEventListener('input', updateResume);
document.getElementById('email').addEventListener('input', updateResume);
document.getElementById('phone').addEventListener('input', updateResume);
document.getElementById('country').addEventListener('input', updateResume);
document.getElementById('city').addEventListener('input', updateResume);
document.getElementById('photo').addEventListener('change', updateResume);


// Call updateResume initially to populate the generated resume with default content
updateResume();
