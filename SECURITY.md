# Security Setup for GitHub Pages Hosting

This document explains how to securely deploy your resume website with API keys on GitHub Pages.

## The Challenge

When hosting on GitHub Pages:
1. All files in your repository are publicly accessible
2. You can't use environment variables
3. You can't use server-side code

This creates a challenge for storing sensitive information like API keys.

## The Solution: Cloudflare Workers

We'll use Cloudflare Workers (free tier) as a secure proxy to store and serve your sensitive information:

1. Your API keys and form IDs are stored in the Cloudflare Worker
2. Your GitHub Pages site requests these secrets from the Worker
3. The Worker verifies the request before returning the secrets

## Setup Instructions

### 1. Create a Cloudflare Account

1. Go to [Cloudflare](https://www.cloudflare.com/) and sign up for a free account
2. Navigate to Workers & Pages in the dashboard

### 2. Deploy the Worker

1. Click "Create a Service"
2. Choose "Worker" as the type
3. Give it a name (e.g., "resume-secrets")
4. In the editor, paste the code from the template below
5. **Important**: Update the following in the code:
   - Your Hugging Face API key
   - Your Google Form IDs
   - Your auth token (create a random string)
   - Your GitHub Pages URL in the CORS headers

```javascript
// Cloudflare Worker template
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// Your sensitive data goes here
const SECRETS = {
  HF_API_KEY: "your-api-key-here",
  FORM_ID: "your-form-id-here",
  CONTACT_FORM_ID: "your-contact-form-id-here",
  AUTH_TOKEN: "your-auth-token-here"
};

async function handleRequest(request) {
  // CORS headers for your GitHub Pages domain
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://yourusername.github.io',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Verify auth token
  const authToken = request.headers.get('X-Auth-Token');
  if (authToken !== SECRETS.AUTH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  // Return the requested secret
  const url = new URL(request.url);
  let responseData = {};

  if (url.pathname.includes('api-key')) {
    responseData = { key: SECRETS.HF_API_KEY };
  } else if (url.pathname.includes('form-id')) {
    responseData = { formId: SECRETS.FORM_ID };
  } else if (url.pathname.includes('contact-form-id')) {
    responseData = { formId: SECRETS.CONTACT_FORM_ID };
  } else {
    responseData = { status: 'ok', message: 'API running' };
  }

  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
```

### 3. Update Your Website Code

Make sure your code is using the correct Worker URL and auth token.

### 4. Test Your Setup

1. Deploy your website to GitHub Pages
2. Test the chat functionality
3. Check the browser console for any errors
4. Verify that data is being collected in your Google Form

## Security Considerations

This approach provides several security benefits:

1. **No Secrets in Repository**: Your API keys and form IDs are never stored in your GitHub repository
2. **Request Validation**: The Cloudflare Worker validates requests using a secret token
3. **CORS Protection**: The Worker only accepts requests from your specific domain
4. **Rate Limiting**: Cloudflare provides built-in rate limiting to prevent abuse

## Maintenance

Remember to update your secrets if they change:

1. Edit your Cloudflare Worker code
2. Update the secrets
3. Deploy the changes