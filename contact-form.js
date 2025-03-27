// Contact form handler that sends data to Google Form and Formspree
// This provides redundancy and ensures all contact form submissions are captured

// Function to send contact form data to Google Form
async function sendContactToGoogleForm(formData) {
    try {
        // Get the form ID from our secure worker
        const proxyUrl = "https://plain-base-b92a.webquantum3.workers.dev/contact-form-id";
        
        // Add a random parameter to prevent caching
        const response = await fetch(`${proxyUrl}?t=${Date.now()}`, {
            method: "GET",
            headers: {
                "X-Auth-Token": "bruno-resume-2024"
            }
        });
        
        let formId = "";
        if (response.ok) {
            const data = await response.json();
            if (data && data.formId) {
                formId = data.formId;
            }
        }
        
        // If we couldn't get the form ID, just return
        if (!formId) {
            console.log("Could not get form ID for contact form");
            return;
        }
        
        // Create the data to send to Google Form
        const googleFormData = new FormData();
        
        // Map the form fields to Google Form fields with correct entry IDs
        // Note: These should be updated with entry IDs from a contact-specific Google Form
        googleFormData.append('entry.354641663', formData.get('name')); // Name field
        googleFormData.append('entry.1797697467', formData.get('_replyto')); // Email field
        googleFormData.append('entry.2034195257', formData.get('message')); // Message field
        googleFormData.append('entry.743421912', navigator.userAgent); // User agent
        googleFormData.append('entry.1601164509', document.referrer || 'Direct'); // Referrer
        
        // Send to Google Form
        fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
            method: 'POST',
            mode: 'no-cors', // This is important to prevent CORS issues
            body: googleFormData
        }).catch(error => {
            // Silently fail - we don't want to interrupt the user experience
            console.log('Error sending contact form to Google Form:', error);
        });
        
    } catch (error) {
        console.log('Error in contact form submission to Google Form:', error);
    }
}

// Initialize the contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Store the original submit handler
        const originalSubmitHandler = contactForm.onsubmit;
        
        // Override the submit handler
        contactForm.addEventListener('submit', async function(event) {
            // Don't prevent default yet - we'll let the original handler do that
            
            // Get the form data
            const formData = new FormData(contactForm);
            
            // Send to Google Form in parallel with the original submission
            sendContactToGoogleForm(formData);
            
            // Continue with the original submission to Formspree
            // The original handler will prevent default and handle the UI
        });
    }
});