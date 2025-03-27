// LLM Chat implementation using Hugging Face Inference API
// This provides a more intelligent chat experience without requiring user authentication

// Configuration
const HF_CONFIG = {
  apiKey: "", // You can leave this empty to use the free tier with rate limits
  model: "HuggingFaceH4/zephyr-7b-beta", // Free, high-quality model
  maxTokens: 200, // Reasonable response length
  temperature: 0.7 // Slightly creative but mostly focused
};

// System prompt that defines the assistant's personality and knowledge
const SYSTEM_PROMPT = `You are Bruno, an Information Technology expert with experience in web development, cloud infrastructure, and data science. 
When responding to questions, use first person ('I') as if you are Bruno himself. Be friendly, professional, and concise.

Your background includes:
1) Deploying Laravel e-commerce sites on AWS EC2
2) Designing and implementing AI models for income prediction
3) Managing IT operations and developing monitoring dashboards
4) Auditing web applications for security vulnerabilities

When asked about your experience or skills, provide specific examples from your work history.
Keep responses concise and focused on the question asked.`;

/**
 * Calls the Hugging Face Inference API to generate a chat response
 * @param {string} userMessage - The user's message
 * @param {Array} messageHistory - Array of previous messages
 * @returns {Promise<string>} - The AI response
 */
async function generateChatResponse(userMessage, messageHistory) {
  try {
    // Format conversation history for the API
    let conversationText = SYSTEM_PROMPT + "\n\n";
    
    // Add message history (limit to last 6 messages to save tokens)
    const recentMessages = messageHistory.slice(-6);
    recentMessages.forEach(msg => {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      conversationText += `${role}: ${msg.content}\n`;
    });
    
    // Add the current user message
    conversationText += `User: ${userMessage}\nAssistant:`;
    
    // Prepare the API request
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HF_CONFIG.model}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(HF_CONFIG.apiKey && { Authorization: `Bearer ${HF_CONFIG.apiKey}` })
        },
        body: JSON.stringify({
          inputs: conversationText,
          parameters: {
            max_new_tokens: HF_CONFIG.maxTokens,
            temperature: HF_CONFIG.temperature,
            return_full_text: false
          }
        })
      }
    );

    // Parse the response
    const result = await response.json();
    
    // Handle different response formats
    let aiResponse = "";
    if (Array.isArray(result) && result.length > 0) {
      aiResponse = result[0].generated_text;
    } else if (result.generated_text) {
      aiResponse = result.generated_text;
    } else {
      console.error("Unexpected API response format:", result);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
    
    // Clean up the response
    aiResponse = aiResponse.trim();
    
    // Handle case where the model might continue with "User:" by truncating
    const userIndex = aiResponse.indexOf("\nUser:");
    if (userIndex > -1) {
      aiResponse = aiResponse.substring(0, userIndex);
    }
    
    return aiResponse;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

// Fallback responses in case the API is unavailable
const fallbackResponses = {
  greeting: "Hello! I'm Bruno, an IT professional specializing in web development, cloud infrastructure, and data science. How can I help you today?",
  experience: "I have over 5 years of experience in IT, with expertise in web development, cloud infrastructure, and data science.",
  skills: "My technical skills include JavaScript/React for frontend, Python/Laravel for backend, AWS for cloud infrastructure, and various data science tools.",
  default: "Thanks for your message. I'd be happy to discuss how my skills might align with your needs."
};

/**
 * Provides a fallback response when the API is unavailable
 * @param {string} message - The user's message
 * @returns {string} - A fallback response
 */
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return fallbackResponses.greeting;
  } else if (lowerMessage.includes("experience")) {
    return fallbackResponses.experience;
  } else if (lowerMessage.includes("skills")) {
    return fallbackResponses.skills;
  } else {
    return fallbackResponses.default;
  }
}

// Export the functions
window.generateChatResponse = generateChatResponse;
window.getFallbackResponse = getFallbackResponse;