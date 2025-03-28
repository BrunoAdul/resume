// LLM Chat implementation using Hugging Face Inference API
// This provides a more intelligent chat experience without requiring user authentication

// Configuration
const HF_CONFIG = {
  // For GitHub Pages deployment, we'll use environment variables through a proxy service
  apiKey: "", // Will be loaded from the proxy service
  model: "HuggingFaceH4/zephyr-7b-beta", // Free, high-quality model
  maxTokens: 200, // Reasonable response length
  temperature: 0.7 // Slightly creative but mostly focused
};

// Function to securely get the API key
async function getSecureApiKey() {
  try {
    // Check if we're running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // If we're on localhost, we might not be able to access the Cloudflare Worker
    // So we'll immediately use fallback responses
    if (isLocalhost) {
      console.log("Running on localhost, using fallback responses");
      // Return empty string to trigger fallback responses
      return "";
    }

    // Use your actual Cloudflare Worker URL
    const proxyUrl = "https://plain-base-b92a.webquantum3.workers.dev/api-key";

    // Add a random parameter to prevent caching
    const response = await fetch(`${proxyUrl}?t=${Date.now()}`, {
      method: "GET",
      headers: {
        // Add a secret token that only your proxy knows
        "X-Auth-Token": "bruno-resume-2024"
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.key) {
        return data.key;
      }
    }
    return "";
  } catch (error) {
    console.log("Error fetching API key, using free tier");
    return "";
  }
}

// System prompt that defines the assistant's personality and knowledge
const SYSTEM_PROMPT = `You are Bruno's AI Assistant. Bruno is an Information Technology expert with experience in Agentic Tools, web development, cloud infrastructure, and data science.
When responding to questions, use first person ('I') and always refer to yourself as 'Bruno's AI Assistant'. Be friendly, professional, and concise.

Bruno's comprehensive background includes:

EDUCATION:
- Bachelor of Technology in IT from Delhi Technological University
- Certifications in AWS, Cloud Computing, and Data Science

TECHNICAL SKILLS:
- Frontend: JavaScript, React, HTML5, CSS3, Bootstrap
- Backend: PHP, Laravel, Python, Node.js
- Cloud: AWS EC2, S3, Lambda, Docker, Kubernetes
- Data Science: Machine Learning, TensorFlow, Pandas, NumPy
- Database: MySQL, MongoDB, PostgreSQL
- DevOps: CI/CD, Git, GitHub Actions

PROFESSIONAL EXPERIENCE:
1) Deployed and maintained Laravel e-commerce sites on AWS EC2 with auto-scaling
2) Designed and implemented AI models for income prediction using classification and regression techniques
3) Managed IT operations and developed monitoring dashboards using React and D3.js
4) Audited web applications for security vulnerabilities and implemented OWASP best practices
5) Developed custom software packages and extensions, most notably the Bagisto Mpesa payment integration
6) Led cross-functional teams in agile development environments
7) Implemented data pipelines for real-time analytics and reporting

PROJECT HIGHLIGHTS:
- Created a predictive analytics platform for financial forecasting
- Developed a secure payment processing system with multiple gateway integrations
- Built responsive web applications with optimized performance metrics
- Implemented CI/CD pipelines for automated testing and deployment

When asked about Bruno's experience or skills, provide specific examples from his work history.
Keep responses concise and focused on the question asked.`;

/**
 * Calls the Hugging Face Inference API to generate a chat response
 * @param {string} userMessage - The user's message
 * @param {Array} messageHistory - Array of previous messages
 * @returns {Promise<string>} - The AI response
 */
async function generateChatResponse(userMessage, messageHistory) {
  try {
    // Get the API key securely
    const apiKey = await getSecureApiKey();

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
          ...(apiKey && { Authorization: `Bearer ${apiKey}` })
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

    // Check if the response was successful
    if (!response.ok) {
      console.log(`API error: ${response.status} ${response.statusText}`);
      // If we hit a payment/rate limit error (402, 429), use fallback responses
      if (response.status === 402 || response.status === 429) {
        console.log("Using fallback response due to API limits");
        return getFallbackResponse(userMessage);
      }
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }

    // Parse the response
    const result = await response.json();

    // Handle different response formats
    let aiResponse = "";
    if (Array.isArray(result) && result.length > 0) {
      aiResponse = result[0].generated_text;
    } else if (result.generated_text) {
      aiResponse = result.generated_text;
    } else if (result.error) {
      console.error("API returned an error:", result.error);
      // If the error mentions credits or rate limits, use fallback
      if (result.error.includes("credits") || result.error.includes("rate limit")) {
        console.log("Using fallback response due to API limits");
        return getFallbackResponse(userMessage);
      }
      return "I'm having trouble connecting right now. Please try again in a moment.";
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
    // Use fallback responses for any API errors
    console.log("Using fallback response due to API error");
    return getFallbackResponse(userMessage);
  }
}

// Fallback responses in case the API is unavailable
const fallbackResponses = {
  greeting: "Hello! I'm Bruno's AI Assistant. Bruno is an IT professional specializing in Agentic Tools, web & software development, cloud infrastructure, and data science. How can I help you learn more about Bruno's experience and skills today?",
  experience: "Bruno has over 5 years of experience in IT, with expertise in web development, cloud infrastructure, and data science. He has worked on Laravel e-commerce sites, AI models, monitoring dashboards, and security audits.",
  skills: "Bruno's technical skills include JavaScript/React for frontend, PHP/Laravel and Python for backend, AWS for cloud infrastructure, and various data science tools including TensorFlow and Pandas.",
  projects: "Bruno has worked on several notable projects, including a Laravel e-commerce platform with AWS deployment, custom software packages like the Bagisto Mpesa payment integration, and AI models for income prediction using classification techniques.",
  education: "Bruno has a Bachelor of Technology in IT from Delhi Technological University, along with certifications in AWS, Cloud Computing, and Data Science.",
  contact: "You can contact Bruno through the contact form on this website. He's currently available for freelance work and full-time opportunities.",
  security: "Bruno takes security seriously in all his projects, implementing OWASP best practices, secure API handling, and data protection measures as demonstrated in this very website.",
  default: "Thanks for your message. I'm Bruno's AI Assistant, and I'd be happy to tell you more about Bruno's skills and experience."
};

/**
 * Provides a fallback response when the API is unavailable
 * @param {string} message - The user's message
 * @returns {string} - A fallback response
 */
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Check for greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))/)) {
    return fallbackResponses.greeting;
  }

  // Check for experience-related questions
  if (lowerMessage.includes("experience") ||
      lowerMessage.includes("background") ||
      lowerMessage.includes("work history") ||
      lowerMessage.includes("worked at") ||
      lowerMessage.includes("career")) {
    return fallbackResponses.experience;
  }

  // Check for skills-related questions
  if (lowerMessage.includes("skills") ||
      lowerMessage.includes("technologies") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("languages") ||
      lowerMessage.includes("frameworks") ||
      lowerMessage.includes("tools") ||
      lowerMessage.includes("tech stack")) {
    return fallbackResponses.skills;
  }

  // Check for project-related questions
  if (lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("built") ||
      lowerMessage.includes("developed") ||
      lowerMessage.includes("created") ||
      lowerMessage.includes("implemented")) {
    return fallbackResponses.projects;
  }

  // Check for education-related questions
  if (lowerMessage.includes("education") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("university") ||
      lowerMessage.includes("college") ||
      lowerMessage.includes("certification") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("qualification")) {
    return fallbackResponses.education;
  }

  // Check for contact-related questions
  if (lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach") ||
      lowerMessage.includes("available") ||
      lowerMessage.includes("hire") ||
      lowerMessage.includes("get in touch")) {
    return fallbackResponses.contact;
  }

  // Check for security-related questions
  if (lowerMessage.includes("security") ||
      lowerMessage.includes("secure") ||
      lowerMessage.includes("protection") ||
      lowerMessage.includes("privacy") ||
      lowerMessage.includes("encryption") ||
      lowerMessage.includes("api key")) {
    return fallbackResponses.security;
  }

  // Default response for other questions
  return fallbackResponses.default;
}

// Export the functions and data
window.generateChatResponse = generateChatResponse;
window.getFallbackResponse = getFallbackResponse;
window.fallbackResponses = fallbackResponses;