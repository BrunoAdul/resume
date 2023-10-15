# Resume Website with Secure AI Chat

This resume website includes an AI-powered chat feature that allows visitors to ask questions about your skills, experience, and background. The chat uses the Hugging Face Inference API to provide intelligent responses.

## Features

### Interactive AI Chat

The website includes an AI-powered chat feature that:
- Provides intelligent responses about your skills and experience
- Remembers conversation context for natural interactions
- Offers fallback responses if the API is unavailable

### Contact Form

The contact form allows visitors to:
- Send you messages directly
- Provide their name and email for follow-up
- Receive confirmation when their message is sent

### Admin Panel

A hidden admin panel allows you to:
- View all chat interactions
- Export data as CSV for analysis
- Access detailed information about visitors

## Technical Implementation

### Security First Approach

This implementation uses a security-first approach:
- No API keys stored in the repository
- Secure proxy for sensitive information
- Data backup to prevent loss

### Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

### Performance Optimized

The code is optimized for performance:
- Minimal dependencies
- Efficient JavaScript
- Fast loading times

## Setup and Deployment

For setup and deployment instructions, see:
- `SECURITY.md` for security configuration
- `google-form-setup.md` for data collection setup
- `contact-form-setup.md` for contact form configuration

## Accessing the Admin Panel

1. Visit your resume website
2. Type "admin" on your keyboard (no need to press Enter)
3. When prompted, enter your email address: "brunoadul@gmail.com"
4. The admin panel will appear with all collected chat data
5. You can export the data as a CSV file

## Customizing the Chat

You can customize the chat behavior by editing the `llm-chat.js` file:

1. Change the model by updating the `model` property in the `HF_CONFIG` object
2. Adjust response length by changing the `maxTokens` property
3. Make responses more creative or more focused by adjusting the `temperature` property
4. Modify the system prompt to change the assistant's personality and knowledge

## Troubleshooting

If the chat is not working:

1. Check the browser console for errors
2. Verify that the API key is correctly set in `api-config.json`
3. Make sure the Google Form ID and field IDs are correct in `form-config.json`
4. Try using the fallback responses by temporarily disabling the API key

If data collection is not working:

1. Test the Google Form manually to ensure it's accepting submissions
2. Check that the form fields match the expected format
3. Use the admin panel to verify that data is being saved to localStorage as a backup# Free Open Source Single-Page Resume Template

This repository hosts a free, open source single-page resume template built with HTML and CSS. Designed for simplicity and clarity, this template is perfect for showcasing your professional profile, skills, and experience in a clean and responsive layout.

## Features

- **Single-Page Layout:** All your resume information is available on one page.
- **Responsive Design:** Looks great on desktops, tablets, and mobile devices.
- **Easy Customization:** Simple HTML structure with inline comments for quick editing.
- **Open Source:** Licensed under the MIT License—feel free to modify and distribute.

## Getting Started

### Prerequisites
- A modern web browser to view the template.
- A text editor or IDE for customization.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/brunoadul/resume.git


## Initial commit - Basic HTML/CSS structure for resume website

Created the foundation of the resume website with HTML structure and CSS styling. Implemented the hero section, basic layout, and typography.