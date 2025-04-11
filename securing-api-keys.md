# API Key Security for Static Website Deployments

This document outlines enterprise-grade approaches for securing API credentials when deploying interactive applications on static hosting platforms like GitHub Pages.

## Security Architecture Options

### 1. Serverless Proxy Implementation

The recommended approach leverages a serverless function as a secure credential proxy, completely isolating sensitive information from client-side code.

#### Deployment with Netlify Functions

```toml
# netlify.toml configuration
[build]
  functions = "netlify/functions"
```

```javascript
// netlify/functions/api-proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Request validation
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // Secure API call with server-side credentials
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Return sanitized response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Request processing failed',
        message: process.env.NODE_ENV === 'development' ? error.message : 'See server logs'
      })
    };
  }
};
```

#### Client Implementation

```javascript
// Secure client-side implementation
async function sendChatRequest(messageHistory) {
  try {
    const response = await fetch('/.netlify/functions/api-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messageHistory })
    });

    if (!response.ok) throw new Error('API proxy request failed');
    return await response.json();
  } catch (error) {
    console.error('Chat request failed:', error);
    return { error: true, message: 'Communication error. Please try again.' };
  }
}
```

### 2. User-Provided Credential Model

This approach shifts credential management to the end user, suitable for specialized applications or development environments.

#### Interface Implementation

```html
<div class="credentials-manager">
  <h3>API Configuration</h3>
  <div class="input-group">
    <input
      type="password"
      id="api-key-input"
      placeholder="Enter your API key"
      aria-label="API Key Input"
    >
    <button id="save-api-key" class="btn-primary">Save Credentials</button>
  </div>
  <p class="help-text">Your API key is stored locally and never transmitted to our servers.</p>
</div>
```

#### Credential Management

```javascript
// Secure credential storage implementation
const credentialManager = {
  saveApiKey(apiKey) {
    if (!apiKey || apiKey.length < 10) {
      throw new Error('Invalid API key format');
    }

    // Encrypt before storage if possible
    try {
      const encryptedKey = this.encryptValue(apiKey);
      localStorage.setItem('user_api_credentials', encryptedKey);
      return true;
    } catch (error) {
      console.error('Credential storage failed:', error);
      return false;
    }
  },

  getApiKey() {
    const storedKey = localStorage.getItem('user_api_credentials');
    if (!storedKey) return null;

    // Decrypt if encryption was used
    try {
      return this.decryptValue(storedKey);
    } catch (error) {
      console.error('Credential retrieval failed:', error);
      return null;
    }
  },

  // Simple XOR encryption (for demonstration - use stronger methods in production)
  encryptValue(value) {
    // Implementation details
    return value;
  },

  decryptValue(encryptedValue) {
    // Implementation details
    return encryptedValue;
  },

  clearCredentials() {
    localStorage.removeItem('user_api_credentials');
  }
};

// Event handler implementation
document.getElementById('save-api-key').addEventListener('click', () => {
  const apiKey = document.getElementById('api-key-input').value.trim();
  if (credentialManager.saveApiKey(apiKey)) {
    showNotification('API key saved successfully');
    document.getElementById('api-key-input').value = '';
  } else {
    showNotification('Failed to save API key', 'error');
  }
});
```

### 3. Third-Party API Gateway Integration

This approach leverages services that provide free AI capabilities without requiring direct API key management.

#### Puter.js Integration

```html
<!-- Add to document head -->
<script src="https://js.puter.com/v2/"></script>
```

```javascript
// AI interaction implementation
async function generateAIResponse(conversationContext, userMessage) {
  try {
    // Format conversation for the AI
    const formattedPrompt = `${systemInstructions}\n\n${
      conversationContext.map(msg =>
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n')
    }\nUser: ${userMessage}\nAssistant:`;

    // Request AI completion
    const response = await puter.ai.complete({
      prompt: formattedPrompt,
      model: 'gpt-4o',
      temperature: 0.7,
      max_tokens: 500
    });

    return response.trim();
  } catch (error) {
    console.error('AI generation failed:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again.';
  }
}
```

### 4. Build-Time Credential Injection

This approach injects credentials during the build process, suitable for controlled deployments with limited credential rotation needs.

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Configure credentials
        run: |
          # Create configuration with injected secrets
          echo "const API_CONFIG = {" > src/config.js
          echo "  apiKey: \"${{ secrets.API_KEY }}\"," >> src/config.js
          echo "  endpoint: \"${{ secrets.API_ENDPOINT }}\"," >> src/config.js
          echo "  projectId: \"${{ secrets.PROJECT_ID }}\"" >> src/config.js
          echo "};" >> src/config.js
          echo "export default API_CONFIG;" >> src/config.js

      - name: Build application
        run: npm ci && npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build
```

## Security Comparison Matrix

| Approach | Security Level | Implementation Complexity | Maintenance Overhead | User Experience Impact |
|----------|----------------|---------------------------|----------------------|------------------------|
| Serverless Proxy | ★★★★★ | Medium | Low | None |
| User-Provided Credentials | ★★★☆☆ | Low | None | Medium |
| Third-Party Gateway | ★★★★☆ | Low | None | None |
| Build-Time Injection | ★★☆☆☆ | Medium | High | None |

## Implementation Recommendation

For professional resume websites, the recommended implementation is:

1. **Primary Solution**: Serverless proxy with Netlify/Vercel
   - Provides maximum security for credentials
   - Requires minimal frontend code changes
   - Offers complete control over API interactions

2. **Alternative Solution**: Third-party gateway integration
   - Zero credential management requirements
   - Simple implementation with minimal code
   - Suitable for projects with standard AI interaction needs

The serverless proxy approach represents the optimal balance of security, maintainability, and user experience for most professional applications.