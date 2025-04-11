# Google Forms Integration for Resume Contact Form

## Overview

This document provides instructions for integrating Google Forms with your resume website's contact form. This implementation creates a reliable data collection system with Formspree as a backup service.

## Form Configuration

### Creating Your Google Form

1. Navigate to [Google Forms](https://forms.google.com/)
2. Create a new form using the "+" icon
3. Title the form "Resume Contact Form Submissions"

### Required Form Fields

Configure the following fields in your Google Form:

| Field Name   | Field Type     | Configuration                |
|--------------|----------------|------------------------------|
| Name         | Short answer   | Required                     |
| Email        | Short answer   | Required, Email validation   |
| Message      | Paragraph      | Required                     |
| User Agent   | Paragraph      | Optional                     |
| Referrer     | Short answer   | Optional                     |

### Form Settings

Access form settings via the gear icon and apply these configurations:

- **Responses tab**: Disable "Collect email addresses"
- **Presentation tab**: Remove progress bar
- Save all settings

## Technical Implementation

### Obtaining Form Identifiers

1. Access the form URL via the "Send" button and link icon
2. Extract the form ID from the URL:
   ```
   1F
   ```

3. Retrieve field IDs:
   - Select "Get pre-filled link" from the options menu
   - Enter sample data in all fields
   - Generate the link
   - Identify entry IDs in the format `entry.123456789` from the URL

### Code Integration

#### Cloudflare Worker Configuration

Update your Cloudflare Worker with the form ID:

```js
// Replace this value with your actual Google Form ID
const CONTACT_FORM_ID = "1FAIpQLScsKnFk2g_w_Eas1N4k7twSBUfWSV3fsLf1AesxPYNKrU5gAg";
```

#### Frontend Integration

Modify `contact-form.js` to include the correct field IDs:

```js
// Replace each entry.XXXXXXXXX with your actual field IDs
// Example: entry.1234567890
```

## Verification & Data Management

### Testing

1. Submit a test message through your resume website's contact form
2. Verify data appears in Google Forms responses

### Data Access & Analysis

Access submission data through:
- Google Form "Responses" tab
- Export to Google Sheets for advanced filtering and analysis

## Redundancy System

This implementation includes a dual submission approach:

- Primary: Google Forms
- Backup: Formspree

This redundancy ensures all contact submissions are captured, even if one system experiences issues.