# Contact Form Setup Instructions

## Dual Submission System

Your contact form uses a dual submission system for redundancy:
1. **Formspree** - Primary submission method
2. **Google Form** - Backup submission method

## Formspree Setup (Already Completed)

Your Formspree form is already set up with ID: `myzkayrp`

If you need to create a new Formspree form:
1. Go to [Formspree](https://formspree.io/)
2. Create a new form
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/your-new-id" method="POST">
   ```

## Google Form Setup (Needs Configuration)

For the backup Google Form submission, you should create a new form specifically for contact submissions:

1. Go to [Google Forms](https://forms.google.com/) and create a new form
2. Add the following questions:

### Question 1: Name
- Question type: Short answer
- Label: "Name"
- Make this required: Yes

### Question 2: Email
- Question type: Short answer
- Label: "Email"
- Make this required: Yes

### Question 3: Message
- Question type: Paragraph
- Label: "Message"
- Make this required: Yes

### Question 4: User Agent
- Question type: Paragraph
- Label: "User Agent"
- Make this required: No

### Question 5: Referrer
- Question type: Short answer
- Label: "Referrer"
- Make this required: No

## Getting the Form ID and Entry IDs

1. After creating the form, click "Send" in the top right
2. Click the link icon (🔗)
3. Copy the link - it will look like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...your-form-id.../viewform
   ```
4. The part after `e/` and before `/viewform` is your form ID

5. To get the entry IDs:
   - Click the three dots (⋮) in the top right
   - Select "Get pre-filled link"
   - Fill in some test values for each field
   - Click "Get link"
   - The URL will contain entry IDs like `entry.123456789`

## Updating Your Code

Once you have your new form ID and entry IDs, update the `contact-form.js` file:

```javascript
// In the sendContactToGoogleForm function
const formId = "your-new-form-id";

// Update the entry IDs
googleFormData.append('entry.123456789', formData.get('name')); // Replace with actual ID
googleFormData.append('entry.234567890', formData.get('_replyto')); // Replace with actual ID
googleFormData.append('entry.345678901', formData.get('message')); // Replace with actual ID
googleFormData.append('entry.456789012', navigator.userAgent); // Replace with actual ID
googleFormData.append('entry.567890123', document.referrer || 'Direct'); // Replace with actual ID
```

## Testing Your Form

After setting up both forms:

1. Test the contact form on your website
2. Check both Formspree and Google Form responses to ensure data is being collected correctly
3. If needed, adjust the form questions or field mappings in your code