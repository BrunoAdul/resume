# Setting Up Hugging Face for Your Resume Chat

This guide will help you set up the Hugging Face Inference API for your resume chat feature.

## Basic Setup (No API Key Required)

The chat is already configured to work without an API key using Hugging Face's free tier. This approach:

- Requires no setup
- Has rate limits (a few requests per minute)
- May occasionally experience delays during high traffic

If this is sufficient for your needs, you don't need to make any changes to the code.

## Enhanced Setup (With API Key)

For better performance and higher rate limits, follow these steps to use your own API key:

1. **Create a Hugging Face Account**
   - Go to [Hugging Face](https://huggingface.co/join)
   - Sign up for a free account

2. **Generate an API Key**
   - Go to your [Hugging Face profile settings](https://huggingface.co/settings/tokens)
   - Click "New token"
   - Give it a name (e.g., "Resume Chat")
   - Select "Read" access
   - Click "Generate token"
   - Copy your new API token

3. **Update Your Code**
   - Open `llm-chat.js`
   - Find the `HF_CONFIG` object at the top
   - Replace the empty `apiKey` value with your token:
     ```javascript
     const HF_CONFIG = {
       apiKey: "hf_your_api_key_here",
       // other settings...
     };
     ```

4. **Upload the Updated File**
   - Save the changes
   - Upload the updated file to your GitHub repository

## Customizing the Chat Experience

You can customize various aspects of the chat:

### Change the AI Model

The default model is `HuggingFaceH4/zephyr-7b-beta`, which provides a good balance of quality and speed. You can try other models by changing the `model` value in the `HF_CONFIG` object:

```javascript
const HF_CONFIG = {
  // ...
  model: "mistralai/Mistral-7B-Instruct-v0.2", // Alternative model
  // ...
};
```

### Adjust Response Style

To make responses more creative or more focused:

```javascript
const HF_CONFIG = {
  // ...
  temperature: 0.9, // Higher for more creative responses
  // or
  temperature: 0.3, // Lower for more focused, deterministic responses
  // ...
};
```

### Change Response Length

To adjust how verbose the responses are:

```javascript
const HF_CONFIG = {
  // ...
  maxTokens: 100, // Shorter responses
  // or
  maxTokens: 300, // Longer, more detailed responses
  // ...
};
```

### Modify the System Prompt

The system prompt defines the assistant's personality and knowledge. Edit the `SYSTEM_PROMPT` constant to change how the AI responds:

```javascript
const SYSTEM_PROMPT = `You are Bruno, an Information Technology expert...`;
```

## Troubleshooting

If you encounter issues:

1. **Rate Limiting**: If you see errors about rate limits, either:
   - Add your API key as described above
   - Reduce the frequency of requests
   - Wait a few minutes before trying again

2. **Model Loading**: Sometimes the model needs to "warm up" if it hasn't been used recently. The first request might take longer (10-20 seconds).

3. **Response Quality**: If responses aren't relevant enough:
   - Try adjusting the system prompt to be more specific
   - Lower the temperature setting for more focused responses
   - Try a different model

4. **Fallback System**: If the API is completely unavailable, the chat will automatically fall back to pre-defined responses.