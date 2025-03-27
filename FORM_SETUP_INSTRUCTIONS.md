# Form Setup Instructions

## Google Form Setup

To properly set up your Google Form for data collection, follow these steps:

### 1. Find Your Form Entry IDs

1. Open your Google Form in edit mode
2. For each question, click on it to edit
3. Click the three dots menu (⋮) and select "Get pre-filled link"
4. In the pre-filled form, inspect the URL parameters - these will show the entry IDs

For example, if your pre-filled URL looks like:
```
https://docs.google.com/forms/d/e/1FAIpQLScsKnFk2g_w_Eas1N4k7twSBUfWSV3fsLf1AesxPYNKrU5gAg/viewform?usp=pp_url&entry.123456789=TestName&entry.234567890=test@email.com
```

Then your entry IDs are:
- `entry.123456789` for the Name field
- `entry.234567890` for the Email field

### 2. Update Your Code

Update the entry IDs in these files:

1. `contact-form.js` - For the contact form
2. `chat-collector.js` - For the chat data collection

Replace the placeholder IDs with your actual entry IDs.

### 3. Formspree Setup

1. Go to https://formspree.io/
2. Create a new form
3. Get the form ID (it will look like `xrgvwpno`)
4. Update your HTML form with the action attribute:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

## Troubleshooting

If your form submissions are still failing:

1. Check the browser console for errors
2. Verify that your form ID is correct
3. Make sure all required fields are being submitted
4. Try testing with the "Get pre-filled link" feature in Google Forms

Remember that Google Forms submissions from JavaScript may show a 400 error in the console, but the data might still be submitted successfully. This is due to CORS restrictions.