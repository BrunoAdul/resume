# Setting Up Google Forms for Chat Data Collection

This guide will help you set up a Google Form to collect chat data from your resume website.

## Step 1: Create a New Google Form

1. Go to [Google Forms](https://forms.google.com/)
2. Click on the "+" icon to create a new form
3. Name your form "Resume Chat Data Collection"

## Step 2: Add Form Fields

Add the following fields to your form:

1. **Timestamp** (Short answer)
   - Make this field required

2. **User Message** (Paragraph)
   - Make this field required

3. **Bot Response** (Paragraph)
   - Make this field required

4. **User Agent** (Paragraph)
   - Make this field required

5. **Referrer** (Short answer)
   - Make this field required

## Step 3: Configure Form Settings

1. Click on the Settings gear icon
2. Under "Responses" tab, toggle "Collect email addresses" to OFF
3. Under "Presentation" tab, uncheck "Show progress bar"
4. Click "Save"

## Step 4: Get Form ID and Field IDs

1. Click "Send" button
2. Click the link icon to get the form URL
3. Copy the form ID from the URL. It will look like:
   `https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform`

4. To get field IDs, you need to:
   - Click "Get pre-filled link" from the "..." menu
   - Fill in some sample data in each field
   - Click "Get Link"
   - Look at the generated URL to find entry IDs like `entry.123456789`

## Step 5: Update the chat-collector.js File

1. Open `chat-collector.js` in your code editor
2. Replace `YOUR_GOOGLE_FORM_ID` with your actual form ID
3. Replace each `entry.XXXXXXXXX` with the corresponding field IDs from your form

## Step 6: Update Your index.html File

Make sure to include the chat-collector.js script in your HTML and call the function when chat messages are exchanged.

## Step 7: Test the Form Submission

1. Visit your resume website
2. Use the chat feature
3. Check your Google Form responses to ensure data is being collected

## Step 8: View and Analyze Data

1. Open your Google Form
2. Click on "Responses" tab
3. Click on the Google Sheets icon to view all responses in a spreadsheet
4. You can now sort, filter, and analyze your chat data

## Privacy Considerations

1. Add a privacy notice to your website informing visitors that chat data is collected
2. Do not collect personally identifiable information unless necessary
3. Consider adding a checkbox for visitors to consent to data collection
4. Regularly review and delete old data that is no longer needed