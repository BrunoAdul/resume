# Professional Resume Website with AI Chat Integration

A modern, responsive resume website featuring an AI-powered chat interface that allows visitors to engage with your professional background in an interactive way. Built with security and performance in mind.

## Core Features

### Interactive AI Assistant

The integrated AI chat system:
- Responds intelligently to queries about your skills, experience, and qualifications
- Maintains conversation context for natural dialogue flow
- Provides graceful fallback responses during API unavailability

### Secure Contact System

The dual-submission contact form:
- Captures visitor inquiries reliably with redundant data storage
- Implements Google Forms integration for data management
- Provides immediate submission confirmation

### Administrative Dashboard

The secure admin interface:
- Displays comprehensive chat interaction analytics
- Enables data export in CSV format for external analysis
- Provides visitor metadata for engagement insights

## Technical Architecture

### Security Implementation

The platform employs enterprise-grade security measures:
- API key protection via secure proxy architecture
- No sensitive credentials stored in repository code
- Redundant data storage with automatic backups

### Responsive Framework

The fully adaptive design ensures optimal viewing across:
- Desktop environments (all modern browsers)
- Tablet devices (iOS/Android)
- Mobile phones (all screen sizes)

### Performance Optimization

Code efficiency is prioritized through:
- Minimal external dependencies
- Optimized JavaScript execution
- Accelerated page loading and rendering

## Configuration & Deployment

Refer to these documentation files for setup:
- `SECURITY.md` - Security configuration guidelines
- `google-form-setup.md` - Data collection implementation
- `contact-form-setup.md` - Contact system configuration

## Administrative Access

To access the admin dashboard:
1. Navigate to your deployed resume website
2. Type "admin" on your keyboard (no Enter key required)
3. Enter your authorized email address when prompted
4. Access the full analytics dashboard with export capabilities

## Customization Options

Modify the AI assistant's behavior in `llm-chat.js`:
1. Select alternative AI models via the `model` property
2. Adjust response verbosity through the `maxTokens` setting
3. Fine-tune response creativity with the `temperature` parameter
4. Customize the AI personality by modifying the system prompt

## Troubleshooting Guide

### Chat System Issues
1. Inspect browser console for error messages
2. Verify API configuration in `api-config.json`
3. Confirm Google Form settings in `form-config.json`
4. Test fallback mode by temporarily disabling API integration

### Data Collection Issues
1. Verify Google Form submission acceptance manually
2. Ensure form field structure matches expected format
3. Check localStorage backup functionality through admin panel

## License

This project is available under the MIT License. See LICENSE.txt for details.
