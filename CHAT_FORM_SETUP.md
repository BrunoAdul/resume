# Chat Data Collection Form Setup

## Creating a New Google Form for Chat Data

To properly collect chat data, you should create a new Google Form specifically designed for chat interactions. Here's how:

1. Go to [Google Forms](https://forms.google.com/) and create a new form
2. Add the following questions:

### Question 1: Conversation ID
- Question type: Short answer
- Label: "Conversation ID"
- Make this required: Yes
- Description: "Unique identifier for the conversation"

### Question 2: User Message
- Question type: Paragraph
- Label: "User Message"
- Make this required: Yes
- Description: "The most recent message from the user"

### Question 3: Bot Response
- Question type: Paragraph
- Label: "Bot Response"
- Make this required: Yes
- Description: "The bot's response (includes full conversation history)"

### Question 4: User Agent
- Question type: Paragraph
- Label: "User Agent"
- Make this required: No

### Question 5: Referrer
- Question type: Short answer
- Label: "Referrer"
- Make this required: No

Note: Google Forms automatically records the submission date and time, so you don't need to create a separate timestamp field.

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

Once you have your new form ID and entry IDs, update the `chat-collector.js` file:

```javascript
const FORM_CONFIG = {
    formId: "1FAIpQLSe6YxU3_LUzvKC80VfXaxWVjSe_JtQDelX6ULPSaCU8M5SF-g",
    fields: {
        // Note: We don't need a timestamp field as Google Forms records this automatically
        conversationId: "entry.335428706", // Conversation ID field
        userMessage: "entry.1415634410", // User message field
        botResponse: "entry.431915707", // Bot response field
        userAgent: "entry.2088488122", // User agent field
        referrer: "entry.1105825235" // Referrer field
    }
};
```

## Testing Your Form

After setting up the form and updating your code:

1. Test the chat functionality on your website
2. Check your Google Form responses to ensure data is being collected correctly
3. If needed, adjust the form questions or field mappings in your code

Remember that Google Forms has a limit on the number of submissions per day, so for high-traffic websites, you might need to consider alternative solutions.