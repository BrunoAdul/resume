# Data Collection System Configuration Guide

This document provides comprehensive instructions for configuring the data collection infrastructure that powers both the contact form and chat analytics systems.

## Google Forms Field Identifier Extraction

The system requires specific field identifiers to properly map data to your Google Forms. Follow this protocol to extract the necessary parameters:

### Field Identifier Extraction Protocol

1. Access your Google Form in edit mode through the Google Forms dashboard
2. For each form field, execute the following steps:
   - Select the field to activate the field editor
   - Access the options menu (⋮) in the field's upper right corner
   - Select "Get pre-filled link" from the dropdown menu
   - Enter representative test data in the field
   - Repeat for all fields in the form
   - Select "Get link" to generate the pre-filled URL

3. Analyze the generated URL to extract field identifiers:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLScsKnFk2g_w_Eas1N4k7twSBUfWSV3fsLf1AesxPYNKrU5gAg/viewform?usp=pp_url&entry.123456789=TestName&entry.234567890=test@email.com
   ```

4. Document each field identifier using this format:
   | Field Label | Field Identifier | Data Type |
   |-------------|------------------|-----------|
   | Name | entry.123456789 | String |
   | Email | entry.234567890 | Email |

### Form Identifier Extraction

1. From the form editor, select "Send" in the upper right corner
2. Select the link icon to access the form URL
3. Extract the form identifier from the URL structure:
   ```
   https://docs.google.com/forms/d/e/[FORM_ID]/viewform
   ```
   The alphanumeric string between `e/` and `/viewform` is your form identifier

## Implementation Configuration

Update the following system components with your extracted identifiers:

### Contact Form Configuration

File: `contact-form.js`

```javascript
/**
 * Contact Form Configuration
 * Replace placeholder values with your actual field identifiers
 */
const CONTACT_FORM_CONFIG = {
  formId: "1FAIpQLScsKnFk2g_w_Eas1N4k7twSBUfWSV3fsLf1AesxPYNKrU5gAg",
  fields: {
    name: "entry.123456789",
    email: "entry.234567890",
    message: "entry.345678901",
    userAgent: "entry.456789012",
    referrer: "entry.567890123"
  }
};
```

### Chat Analytics Configuration

File: `chat-collector.js`

```javascript
/**
 * Chat Analytics Configuration
 * Replace placeholder values with your actual field identifiers
 */
const CHAT_ANALYTICS_CONFIG = {
  formId: "1FAIpQLSe6YxU3_LUzvKC80VfXaxWVjSe_JtQDelX6ULPSaCU8M5SF-g",
  fields: {
    conversationId: "entry.335428706",
    userMessage: "entry.1415634410",
    botResponse: "entry.431915707",
    userAgent: "entry.2088488122",
    referrer: "entry.1105825235"
  }
};
```

## Formspree Integration

For the contact form's primary submission handler:

1. Create an account at [Formspree](https://formspree.io/)
2. Create a new form through the dashboard interface
3. Configure form settings:
   - Set appropriate email notifications
   - Enable spam filtering
   - Configure success/error redirects if desired

4. Obtain your unique form identifier (format: `xrgvwpno`)

5. Update your HTML form action attribute:
   ```html
   <form id="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
   ```

## System Verification

After configuration, execute this verification protocol:

1. Submit test data through both the contact form and chat interface
2. Verify data capture in both Google Forms response dashboards
3. Confirm Formspree email notifications are functioning correctly
4. Test across multiple browsers and devices
5. Verify all fields are being correctly mapped and populated

## Troubleshooting Guide

| Issue | Diagnostic Steps | Resolution |
|-------|------------------|------------|
| Form submission failure | Check browser console for errors | Verify form ID and field mappings |
| Missing form data | Inspect network requests | Confirm field identifiers match form fields |
| CORS errors | Review browser console warnings | Expected for Google Forms - data may still be submitted |
| Formspree errors | Check email configuration | Verify Formspree form ID and account status |

**Note on CORS Limitations:** Due to cross-origin restrictions, Google Forms submissions from JavaScript will show a 400 error in the console even when successful. This is expected behavior and does not indicate a submission failure.

## Advanced Configuration

For high-volume implementations, consider these enhancements:

1. **Submission Queuing**: Implement a queue system for handling submission rate limits
2. **Offline Support**: Add IndexedDB storage for offline form submissions
3. **Retry Logic**: Implement exponential backoff for failed submissions
4. **Submission Validation**: Add client-side validation before submission attempts