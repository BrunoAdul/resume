// Simple chat data collection script
// This sends chat data to a Google Form which will store it in a Google Sheet

function sendChatToGoogleForm(messageData) {
    // Create the data to send
    const formData = new FormData();
    
    // Add the message data to the form
    // Replace these IDs with the actual field IDs from your Google Form
    formData.append('entry.123456789', messageData.timestamp); // Timestamp field
    formData.append('entry.234567890', messageData.userMessage); // User message field
    formData.append('entry.345678901', messageData.botResponse); // Bot response field
    formData.append('entry.456789012', messageData.userAgent); // User agent field
    formData.append('entry.567890123', messageData.referrer); // Referrer field
    
    // Send the data to your Google Form
    // Replace YOUR_GOOGLE_FORM_ID with your actual Google Form ID
    fetch('https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse', {
        method: 'POST',
        mode: 'no-cors', // This is important to prevent CORS issues
        body: formData
    }).catch(error => {
        // Silently fail - we don't want to interrupt the user experience
        console.log('Error sending chat data:', error);
    });
}

// Export the function so it can be used in other scripts
window.sendChatToGoogleForm = sendChatToGoogleForm;