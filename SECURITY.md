# Secure API Integration for GitHub Pages

This document outlines the implementation of a secure credential management system for GitHub Pages deployments, addressing the inherent security challenges of static site hosting.

## Security Challenge

GitHub Pages presents specific security constraints:
- Repository files are publicly accessible
- Environment variables are unavailable
- Server-side code execution is not supported

These limitations create significant challenges for securely managing API keys and other sensitive credentials.

## Solution Architecture: Cloudflare Workers

This implementation leverages Cloudflare Workers (free tier) as a secure credential management proxy:

1. Sensitive credentials are stored exclusively within the Cloudflare Worker environment
2. The GitHub Pages application requests credentials via authenticated API calls
3. The Worker validates request authenticity before returning protected information

## Implementation Guide

### Cloudflare Account Setup

1. Create an account at [Cloudflare](https://www.cloudflare.com/)
2. Navigate to the Workers & Pages section in your dashboard

### Worker Deployment

1. Select "Create a Service" from the dashboard
2. Choose the "Worker" service type
3. Assign an appropriate service name (e.g., "resume-credentials-proxy")
4. Insert the following code template in the editor, with your specific credentials:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// Credential Configuration
const CREDENTIALS = {
  HF_API_KEY: "your-huggingface-api-key",
  FORM_ID: "your-google-form-id",
  CONTACT_FORM_ID: "your-contact-form-id",
  AUTH_TOKEN: "your-generated-auth-token" // Generate a strong random string
};

async function handleRequest(request) {
  // CORS Configuration for GitHub Pages
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://yourusername.github.io', // Your exact domain
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
  };

  // Handle CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Authentication Validation
  const authToken = request.headers.get('X-Auth-Token');
  if (authToken !== CREDENTIALS.AUTH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  // Credential Request Handling
  const url = new URL(request.url);
  let responseData = {};

  if (url.pathname.includes('api-key')) {
    responseData = { key: CREDENTIALS.HF_API_KEY };
  } else if (url.pathname.includes('form-id')) {
    responseData = { formId: CREDENTIALS.FORM_ID };
  } else if (url.pathname.includes('contact-form-id')) {
    responseData = { formId: CREDENTIALS.CONTACT_FORM_ID };
  } else {
    responseData = { status: 'operational', message: 'Credential service active' };
  }

  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
```

### Client Integration

Update your frontend code to retrieve credentials from your Worker:

```javascript
// Example credential retrieval implementation
async function getApiCredentials() {
  try {
    const response = await fetch('https://your-worker-name.workers.dev/api-key', {
      method: 'GET',
      headers: {
        'X-Auth-Token': 'your-auth-token'
      }
    });

    if (!response.ok) throw new Error('Authentication failed');
    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error('Credential retrieval failed:', error);
    return null;
  }
}
```

### Deployment Verification

1. Deploy your updated application to GitHub Pages
2. Verify API functionality through the browser console
3. Confirm successful form submissions and data collection
4. Monitor network requests to ensure proper credential handling

## Security Benefits

This architecture provides multiple security advantages:

1. **Credential Isolation**: Sensitive information remains isolated from public repository code
2. **Request Authentication**: Token-based validation prevents unauthorized credential access
3. **Origin Restriction**: CORS configuration limits requests to authorized domains
4. **Request Rate Protection**: Cloudflare's built-in rate limiting prevents brute force attacks

## Maintenance Protocol

When credential rotation is required:

1. Access your Cloudflare Worker in the dashboard
2. Update the relevant credentials in the CREDENTIALS object
3. Save and deploy the updated Worker
4. No changes to the GitHub Pages application are required

## Best Practices

- Generate a cryptographically strong authentication token
- Rotate credentials periodically according to security policies
- Monitor Worker analytics for unusual access patterns
- Implement the principle of least privilege for all credentials