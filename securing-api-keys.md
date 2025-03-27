# Securing API Keys for GitHub Pages

When hosting your resume website with a chat interface on GitHub Pages, you need to protect your API keys since all code is publicly accessible. This guide outlines several approaches to secure your API keys.

## Option 1: Backend Proxy (Recommended)

The most secure approach is to create a small backend service that acts as a proxy for your API calls.

### Step 1: Create a Serverless Function

You can use services like Netlify Functions, Vercel Edge Functions, or AWS Lambda to create a simple proxy:

#### Example using Netlify Functions:

1. Create a `netlify.toml` file in your repository:
```toml
[build]
  functions = "netlify/functions"
```

2. Create a function in `netlify/functions/chat-proxy.js`:
```javascript
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { messages } = body;

    // Call OpenRouter API with your secret key
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-r1-distill-llama-70b:free',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://yourdomain.com',
        'X-Title': 'Bruno\'s Resume Chat'
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};
```

3. Set up environment variables in your Netlify dashboard (Settings → Build & deploy → Environment variables)

4. Update your chat interface to call your proxy instead:
```javascript
fetch('/.netlify/functions/chat-proxy', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: messageHistory
  })
})
.then(response => response.json())
.then(data => {
  // Handle response
})
```

## Option 2: Client-Side with User-Provided API Key

Allow users to input their own API key.

### Implementation:

1. Add an API key input field to your chat interface:
```html
<div class="api-key-container">
  <input type="password" id="api-key-input" placeholder="Enter your OpenRouter API key">
  <button id="save-api-key">Save Key</button>
</div>
```

2. Store the key in localStorage:
```javascript
document.getElementById('save-api-key').addEventListener('click', () => {
  const apiKey = document.getElementById('api-key-input').value.trim();
  if (apiKey) {
    localStorage.setItem('openrouter_api_key', apiKey);
    alert('API key saved!');
  }
});

// Function to get API key
function getApiKey() {
  return localStorage.getItem('openrouter_api_key');
}
```

3. Use the stored key in your API calls:
```javascript
const apiKey = getApiKey();
if (!apiKey) {
  // Show message to enter API key
  chatMessages.innerHTML += `
    <div class="chat-message bot">
      <p>Please enter your OpenRouter API key to continue. You can get a free key at <a href="https://openrouter.ai" target="_blank">openrouter.ai</a>.</p>
    </div>
  `;
  return;
}

fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'HTTP-Referer': window.location.href,
    'X-Title': 'Bruno\'s Resume Chat'
  },
  // Rest of your code...
})
```

## Option 3: Use Puter.js (No API Key Required)

Puter.js provides free AI capabilities without requiring API keys, making it ideal for GitHub Pages.

### Implementation:

1. Add the Puter.js script to your HTML:
```html
<script src="https://js.puter.com/v2/"></script>
```

2. Use Puter.js for AI completions:
```javascript
function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    // Add user message to chat
    // ...
    
    // Build conversation history
    let conversationHistory = systemPrompt + "\n\n";
    messageElements.forEach(element => {
      const role = element.classList.contains('user') ? 'User' : 'Assistant';
      const content = element.querySelector('p').textContent;
      conversationHistory += `${role}: ${content}\n`;
    });
    conversationHistory += `User: ${message}\nAssistant:`;
    
    // Use Puter.js AI
    puter.ai.complete({
      prompt: conversationHistory,
      model: 'gpt-4o',
      temperature: 0.7,
      max_tokens: 500
    }).then(response => {
      // Handle response
      // ...
    });
  }
}
```

## Option 4: Environment Variables with GitHub Actions

Use GitHub Actions to inject environment variables during the build process.

### Implementation:

1. Create a GitHub Actions workflow file (`.github/workflows/deploy.yml`):
```yaml
name: Build and Deploy
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Replace API Keys
        run: |
          sed -i 's/YOUR_OPENROUTER_API_KEY/${{ secrets.OPENROUTER_API_KEY }}/g' index.html
          
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: .
```

2. Add your API key as a repository secret in GitHub (Settings → Secrets and variables → Actions → New repository secret)

3. Use a placeholder in your code that will be replaced during build:
```javascript
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
    // Rest of your headers...
  },
  // Rest of your code...
})
```

## Security Considerations

1. **Backend Proxy (Option 1)** is the most secure approach as your API key never leaves the server
2. **User-Provided Key (Option 2)** shifts responsibility to the user but may limit usage
3. **Puter.js (Option 3)** avoids API key issues entirely but limits you to their service
4. **GitHub Actions (Option 4)** is convenient but not fully secure as the key will be visible in the built HTML

## Recommendation

For a GitHub Pages hosted resume, I recommend either:

1. **Backend Proxy with Netlify/Vercel**: Most secure and professional approach
2. **Puter.js**: Simplest approach with no API key management

If you expect minimal usage, the Puter.js approach is ideal as it requires no additional services or API keys while still providing access to powerful models like GPT-4o.