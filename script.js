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

// Variable to store the content of the Quill editor
let quillContent = '';

// Update the generated resume when the editor content changes
quill.on('text-change', function() {
    updateResume();
    quillContent = quill.root.innerHTML; // Update the stored content

});

// Function to add Employment History section
function addEmployment() {
    const employmentHistoryDiv = document.getElementById('employmentHistory');
    // Check if the employment history heading is already present
    if (!employmentHistoryDiv.querySelector('.employment-heading')) {
        const employmentHeading = document.createElement('h4');
        employmentHeading.classList.add('employment-heading');
        employmentHeading.innerHTML = '<span class="material-symbols-outlined">work</span> Employment History';
        employmentHistoryDiv.appendChild(employmentHeading);
    }

    const employmentItem = document.createElement('div');
    employmentItem.classList.add('employment-item');
    employmentItem.innerHTML = `
        <div class="mb-3">
            <div class="row mb-3">
                <div class="col">
                    <label for="jobTitle" class="form-label">Job Title</label>
                    <input type="text" class="form-control" name="jobTitle">
                </div>
                <div class="col">
                    <label for="employer" class="form-label">Employer</label>
                    <input type="text" class="form-control" name="employer">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input type="text" class="form-control datepicker" name="startDate">
                </div>
                <div class="col">
                    <label for="endDate" class="form-label">End Date</label>
                    <input type="text" class="form-control datepicker" name="endDate">
                    <input type="checkbox" class="form-check-input" id="currentJob" name="currentJob">
                    <label class="form-check-label" for="currentJob">Current Job</label>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="jobLocation" class="form-label">Job Location</label>
                    <input type="text" class="form-control" name="jobLocation">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" name="description" rows="3"></textarea>
                </div>
            </div>
            <button class="btn btn-danger delete-employment">Delete</button>
        </div>
    `;
    employmentHistoryDiv.appendChild(employmentItem);
    initializeDatePickers(); // Initialize date pickers for the newly added employment item
    addEmploymentListeners(); // Add event listeners for the newly added employment item
    updateResume(); // Update the resume after adding employment history
}


// Function to initialize date pickers
function initializeDatePickers() {
    const datepickers = document.querySelectorAll('.datepicker');
    datepickers.forEach(datepicker => {
        flatpickr(datepicker, {
            dateFormat: 'Y-m-d',
            allowInput: true
        });
    });
}

// Function to add event listeners for employment history input fields
function addEmploymentListeners() {
    const employmentItems = document.querySelectorAll('.employment-item');
    employmentItems.forEach(employmentItem => {
        const currentJobCheckbox = employmentItem.querySelector('input[name="currentJob"]');
        const endDateInput = employmentItem.querySelector('input[name="endDate"]');
        currentJobCheckbox.addEventListener('change', function() {
            endDateInput.disabled = this.checked;
            endDateInput.value = ''; // Clear end date if current job is selected
            updateResume();
        });
        employmentItem.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updateResume);
        });
        const deleteButton = employmentItem.querySelector('.delete-employment');
        deleteButton.addEventListener('click', function() {
            employmentItem.remove();
            updateResume(); // Update the resume after deleting employment history
        });
    });
}

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
                ${jobTitle ? `<p><strong>${jobTitle}</strong></p>` : ''}
                ${email ? `<p><i class="bi bi-envelope" style="display:inline;"></i> ${email}</p>` : ''}
                ${phone ? `<p><i class="bi bi-telephone" style="display:inline;"></i> ${phone}</p>` : ''}
                ${country && city ? `<p><i class="bi bi-geo-alt" style="display:inline;"></i> ${country}, ${city}</p>` : ''}
           
    `;

    // Add Professional Summary section
    if (professionalSummary) {
        resumeContent += `
            ${jobTitle ? `<p><strong>${jobTitle}</strong></p>` : ''}
            <h4><span class="material-symbols-outlined align-middle">summarize</span> Professional Summary</h4>
            <div>${quill.root.innerHTML}</div>
        `;
    }

    // Add Employment History section
    const employmentHistoryDiv = document.getElementById('employmentHistory');
    const employmentItems = employmentHistoryDiv.querySelectorAll('.employment-item');
    if (employmentItems.length > 0) {
        resumeContent += '<div class="text-left mb-3"><h4><span class="material-symbols-outlined">work</span> Employment History</h4></div>';
        employmentItems.forEach(employmentItem => {
            const jobTitle = employmentItem.querySelector('input[name="jobTitle"]').value;
            const employer = employmentItem.querySelector('input[name="employer"]').value;
            const startDate = employmentItem.querySelector('input[name="startDate"]').value;
            const endDate = employmentItem.querySelector('input[name="endDate"]').value;
            const jobLocation = employmentItem.querySelector('input[name="jobLocation"]').value;
            const description = employmentItem.querySelector('textarea[name="description"]').value;

            if (jobTitle || employer || startDate || endDate || jobLocation || description) {
                // Only add employment history section if any field is filled
                resumeContent += `
                    <div class="mb-3">
                        <p><strong>${jobTitle}</strong> at ${employer}</p>
                        <p>${startDate} - ${endDate ? endDate : 'Present'}</p>
                        <p>Location: ${jobLocation}</p>
                        <p>Description: ${description}</p>
                    </div>
                `;
            }
        });
    }
    resumeContent += `</div>`;

    // Check if a file is selected
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const photoUrl = e.target.result;
            // Append image to the resume content
            resumeContent += `
                <div class="row text-right">
                    <div class="col-md-3 mt-3">
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

// Add event listener to "Add Employment" button
document.getElementById('addEmploymentBtn').addEventListener('click', function() {
    addEmployment();
    updateResume();
});

// Initialize date pickers
initializeDatePickers();

// Add event listeners for existing employment items
addEmploymentListeners();

// Add event listener for file input change
document.getElementById('photo').addEventListener('change', updateResume);
