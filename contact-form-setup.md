# Setting Up Google Forms for Contact Form Data Collection

This guide will help you set up a Google Form to collect contact form submissions from your resume website.

## Step 1: Create a New Google Form

1. Go to [Google Forms](https://forms.google.com/)
2. Click on the "+" icon to create a new form
3. Name your form "Resume Contact Form Submissions"

## Step 2: Add Form Fields

Add the following fields to your form:

1. **Name** (Short answer)
   - Make this field required

2. **Email** (Short answer)
   - Make this field required
   - Add email validation

3. **Message** (Paragraph)
   - Make this field required

4. **User Agent** (Paragraph)
   - Make this field optional

5. **Referrer** (Short answer)
   - Make this field optional

## Step 3: Configure Form Settings

1. Click on the Settings gear icon
2. Under "Responses" tab, toggle "Collect email addresses" to OFF
3. Under "Presentation" tab, uncheck "Show progress bar"
4. Click "Save"

## Step 4: Get Form ID and Field IDs

1. Click "Send" button
2. Click the link icon to get the form URL
3. Copy the form ID from the URL. Your form ID is:
   `1FAIpQLScsKnFk2g_w_Eas1N4k7twSBUfWSV3fsLf1AesxPYNKrU5gAg`

4. To get field IDs, you need to:
   - Click "Get pre-filled link" from the "..." menu
   - Fill in some sample data in each field
   - Click "Get Link"
   - Look at the generated URL to find entry IDs like `entry.123456789`

## Step 5: Update the Cloudflare Worker

1. Open your Cloudflare Worker
2. Update the `CONTACT_FORM_ID` value with your actual form ID

## Step 6: Update the contact-form.js File

1. Open `contact-form.js` in your code editor
2. Update each `entry.XXXXXXXXX` with the corresponding field IDs from your form

## Step 7: Test the Form Submission

1. Visit your resume website
2. Fill out and submit the contact form
3. Check your Google Form responses to ensure data is being collected

## Step 8: View and Analyze Data

1. Open your Google Form
2. Click on "Responses" tab
3. Click on the Google Sheets icon to view all responses in a spreadsheet
4. You can now sort, filter, and analyze your contact form submissions

## Important Notes

1. The contact form will still submit to Formspree as a backup
2. This dual submission approach ensures you never lose any contact form data
3. You can compare the data in both systems to ensure everything is working correctly