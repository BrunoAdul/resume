# Instructions for Committing to GitHub

This document provides instructions for safely committing your code to GitHub without exposing sensitive information.

## Files to Exclude from Git

The following files contain sensitive information and should NOT be committed to GitHub:

1. `api-config.json` - Contains your Hugging Face API key
2. `form-config.json` - Contains your Google Form IDs
3. `cloudflare-worker-with-keys.js` - Contains all your sensitive keys

These files are already added to `.gitignore` to prevent accidental commits.

## Safe Commit Process

Follow these steps to safely commit your code:

1. Verify that sensitive files are not being tracked:
   ```
   git status
   ```
   Make sure the files listed above do not appear in the "Changes to be committed" section.

2. Add all other files:
   ```
   git add .
   ```

3. Commit your changes:
   ```
   git commit -m "Your commit message"
   ```

4. Push to GitHub:
   ```
   git push origin your-branch-name
   ```

## If You've Already Committed Sensitive Information

If you've already committed sensitive information, follow these steps:

1. Remove the sensitive files from Git tracking (but keep them locally):
   ```
   git rm --cached api-config.json form-config.json cloudflare-worker-with-keys.js
   ```

2. Commit this change:
   ```
   git commit -m "Remove sensitive files from tracking"
   ```

3. Force push to overwrite history:
   ```
   git push origin your-branch-name --force
   ```

4. If GitHub has detected secrets, follow their instructions to mark them as revoked or false positives.

## Deployment Process

When deploying your website:

1. Make sure to update the template files with your actual keys
2. Follow the instructions in `SECURITY.md` for setting up your Cloudflare Worker
3. Test your website thoroughly before making it public

## Security Reminder

Remember that your GitHub repository is public. Never commit:
- API keys
- Access tokens
- Passwords
- Private form IDs
- Any other sensitive information

Always use the secure proxy method described in `SECURITY.md` for handling sensitive data.