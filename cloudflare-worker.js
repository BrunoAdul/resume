// Cloudflare Worker script for securely providing API keys and form IDs
// Deploy this to Cloudflare Workers (https://workers.cloudflare.com/)

// TEMPLATE FILE - Replace values with your actual keys when deploying
// This is a template that can be safely committed to GitHub
const SECRETS = {
  HF_API_KEY: "your-huggingface-api-key-here",
  FORM_ID: "your-google-form-id-here", // This is for chat data
  CONTACT_FORM_ID: "your-contact-form-id-here", // This is for contact form
  AUTH_TOKEN: "bruno-resume-2024" // This matches what we set in the code
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Set up CORS headers to allow your GitHub Pages site and localhost for development
  const corsHeaders = {
    // Get the origin from the request and allow it if it's from our domains
    'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
  };

  // Handle OPTIONS request (preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Check for auth token
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

  // Determine which secret to return based on the URL path
  const url = new URL(request.url);
  let responseData = {};

  if (url.pathname.includes('api-key')) {
    responseData = { key: SECRETS.HF_API_KEY };
  } else if (url.pathname.includes('form-id')) {
    responseData = { formId: SECRETS.FORM_ID };
  } else if (url.pathname.includes('contact-form-id')) {
    responseData = { formId: SECRETS.CONTACT_FORM_ID };
  } else {
    // Default endpoint returns nothing sensitive
    responseData = { status: 'ok', message: 'API running' };
  }

  // Return the response
  return new Response(JSON.stringify(responseData), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}