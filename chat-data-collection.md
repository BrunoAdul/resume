# Capturing Chat Data for Analysis and Follow-ups

If you want to retain visitor chat data for later analysis and follow-ups, here are several approaches you can implement, ranging from simple to more comprehensive solutions.

## Option 1: Simple Local Storage Solution

This approach stores chat data in the browser's localStorage and provides a way for you to export it.

### Implementation:

```javascript
// Add this to your chat functionality
function saveConversation(messageHistory) {
    // Generate a unique conversation ID if not already set
    if (!localStorage.getItem('currentConversationId')) {
        const conversationId = 'conv_' + Date.now();
        localStorage.setItem('currentConversationId', conversationId);
    }
    
    const conversationId = localStorage.getItem('currentConversationId');
    
    // Save the conversation
    localStorage.setItem(conversationId, JSON.stringify({
        timestamp: new Date().toISOString(),
        messages: messageHistory,
        userAgent: navigator.userAgent,
        referrer: document.referrer
    }));
    
    // Update the list of all conversations
    let allConversations = JSON.parse(localStorage.getItem('allConversations') || '[]');
    if (!allConversations.includes(conversationId)) {
        allConversations.push(conversationId);
        localStorage.setItem('allConversations', JSON.stringify(allConversations));
    }
}

// Call this function after each message exchange
// saveConversation(messageHistory);

// Add a hidden admin panel (password protected)
function addAdminPanel() {
    const adminButton = document.createElement('button');
    adminButton.textContent = 'Admin';
    adminButton.style.position = 'fixed';
    adminButton.style.bottom = '20px';
    adminButton.style.left = '20px';
    adminButton.style.opacity = '0.2';
    adminButton.style.zIndex = '1000';
    adminButton.style.padding = '5px 10px';
    adminButton.style.background = '#f1f1f1';
    adminButton.style.border = 'none';
    adminButton.style.borderRadius = '3px';
    
    adminButton.addEventListener('click', () => {
        const password = prompt('Enter admin password:');
        if (password === 'your-secure-password') { // Change this!
            showConversations();
        }
    });
    
    document.body.appendChild(adminButton);
}

function showConversations() {
    // Create admin panel
    const adminPanel = document.createElement('div');
    adminPanel.style.position = 'fixed';
    adminPanel.style.top = '50%';
    adminPanel.style.left = '50%';
    adminPanel.style.transform = 'translate(-50%, -50%)';
    adminPanel.style.background = 'white';
    adminPanel.style.padding = '20px';
    adminPanel.style.borderRadius = '10px';
    adminPanel.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    adminPanel.style.zIndex = '2000';
    adminPanel.style.maxWidth = '80%';
    adminPanel.style.maxHeight = '80%';
    adminPanel.style.overflow = 'auto';
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(adminPanel);
    });
    adminPanel.appendChild(closeButton);
    
    // Add export button
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export All Data (CSV)';
    exportButton.style.marginBottom = '20px';
    exportButton.addEventListener('click', exportAllConversations);
    adminPanel.appendChild(exportButton);
    
    // Add conversation list
    const allConversations = JSON.parse(localStorage.getItem('allConversations') || '[]');
    
    if (allConversations.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'No conversation data available.';
        adminPanel.appendChild(noData);
    } else {
        allConversations.forEach(convId => {
            const convData = JSON.parse(localStorage.getItem(convId) || '{}');
            
            const convContainer = document.createElement('div');
            convContainer.style.border = '1px solid #eee';
            convContainer.style.padding = '10px';
            convContainer.style.marginBottom = '10px';
            convContainer.style.borderRadius = '5px';
            
            const convHeader = document.createElement('h3');
            convHeader.textContent = new Date(convData.timestamp).toLocaleString();
            convContainer.appendChild(convHeader);
            
            const convInfo = document.createElement('p');
            convInfo.textContent = `Referrer: ${convData.referrer || 'Direct'} | User Agent: ${convData.userAgent || 'Unknown'}`;
            convInfo.style.fontSize = '12px';
            convInfo.style.color = '#666';
            convContainer.appendChild(convInfo);
            
            const convMessages = document.createElement('div');
            convData.messages.forEach(msg => {
                const msgEl = document.createElement('p');
                msgEl.textContent = `${msg.role}: ${msg.content}`;
                msgEl.style.margin = '5px 0';
                msgEl.style.padding = '5px';
                msgEl.style.background = msg.role === 'user' ? '#f0f0f0' : '#e6f7ff';
                msgEl.style.borderRadius = '3px';
                convMessages.appendChild(msgEl);
            });
            convContainer.appendChild(convMessages);
            
            adminPanel.appendChild(convContainer);
        });
    }
    
    document.body.appendChild(adminPanel);
}

function exportAllConversations() {
    const allConversations = JSON.parse(localStorage.getItem('allConversations') || '[]');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add CSV header
    csvContent += "Conversation ID,Timestamp,User Agent,Referrer,Role,Message Content\n";
    
    allConversations.forEach(convId => {
        const convData = JSON.parse(localStorage.getItem(convId) || '{}');
        
        convData.messages.forEach(msg => {
            const row = [
                convId,
                convData.timestamp,
                `"${convData.userAgent || 'Unknown'}"`,
                `"${convData.referrer || 'Direct'}"`,
                msg.role,
                `"${msg.content.replace(/"/g, '""')}"`
            ];
            csvContent += row.join(',') + '\n';
        });
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chat_conversations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize admin panel when the page loads
document.addEventListener('DOMContentLoaded', addAdminPanel);
```

### How to Integrate:

1. Add the code above to your JavaScript
2. Call `saveConversation(messageHistory)` after each message exchange
3. Change the admin password in the code
4. Access the admin panel by clicking the semi-transparent "Admin" button in the bottom-left corner

## Option 2: Server-Side Storage with Netlify Functions

For a more robust solution, you can use Netlify Functions to store conversations in a database.

### Setup:

1. Create a `netlify.toml` file in your repository:
```toml
[build]
  functions = "netlify/functions"
```

2. Create a function in `netlify/functions/save-conversation.js`:
```javascript
const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse the request body
  const data = JSON.parse(event.body);
  
  // Connect to MongoDB (using MongoDB Atlas free tier)
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const database = client.db('resume_chat');
    const conversations = database.collection('conversations');
    
    // Add timestamp and request metadata
    const conversationData = {
      ...data,
      timestamp: new Date(),
      ip: event.headers['client-ip'],
      userAgent: event.headers['user-agent'],
      referrer: event.headers['referer'] || 'direct'
    };
    
    // Insert the conversation
    await conversations.insertOne(conversationData);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error saving conversation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save conversation' })
    };
  } finally {
    await client.close();
  }
};
```

3. Update your chat code to send data to the function:
```javascript
function saveConversationToServer(messageHistory) {
  fetch('/.netlify/functions/save-conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: messageHistory,
      page: window.location.pathname
    })
  })
  .catch(error => console.error('Error saving conversation:', error));
}
```

4. Set up MongoDB Atlas (free tier) and add your connection string to Netlify environment variables

## Option 3: Google Sheets Integration

A simpler server-side option is to use Google Sheets to store conversation data.

### Setup:

1. Create a Google Sheet and set up the Google Sheets API
2. Create a Netlify function to send data to Google Sheets:

```javascript
// netlify/functions/save-to-sheets.js
const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  
  try {
    // Initialize the sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    // Authenticate
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Format the data for the sheet
    const timestamp = new Date().toISOString();
    const userMessage = data.messages.find(m => m.role === 'user')?.content || '';
    const botResponse = data.messages.find(m => m.role === 'assistant')?.content || '';
    
    // Add a row to the sheet
    await sheet.addRow({
      timestamp,
      userMessage,
      botResponse,
      userAgent: event.headers['user-agent'],
      referrer: event.headers['referer'] || 'direct',
      ip: event.headers['client-ip']
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save data' })
    };
  }
};
```

## Option 4: Email Notifications for New Conversations

If you just want to be notified of new conversations without storing all data:

```javascript
// netlify/functions/send-notification.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Format the conversation
    const conversationText = data.messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'your-email@example.com', // Your email
      subject: 'New Resume Chat Conversation',
      text: `New conversation on your resume website:\n\n${conversationText}\n\nUser Agent: ${event.headers['user-agent']}\nReferrer: ${event.headers['referer'] || 'direct'}`
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notification' })
    };
  }
};
```

## Recommendation

For your resume website, I recommend starting with Option 1 (localStorage) as it:

1. Requires no server setup
2. Works with GitHub Pages
3. Gives you a way to export data
4. Provides a simple admin interface

If you find you need more robust storage later, you can upgrade to one of the server-side options.

## Privacy Considerations

If you implement any of these data collection methods, make sure to:

1. Add a privacy policy to your website
2. Inform users that their chat conversations may be stored
3. Consider adding a consent message before starting a chat
4. Be careful with storing personally identifiable information

## Implementation Steps for Option 1

1. Add the localStorage code to your JavaScript file
2. Update your sendMessage function to save conversations:

```javascript
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message to chat
        // ...existing code...
        
        // Get all previous messages for context
        const messageElements = chatMessages.querySelectorAll('.chat-message:not(.thinking)');
        const messageHistory = [];
        
        // Add system message
        messageHistory.push({
            role: "system",
            content: "You are Bruno, an Information Technology expert..."
        });
        
        // Add conversation history
        messageElements.forEach(element => {
            const role = element.classList.contains('user') ? 'user' : 'assistant';
            const content = element.querySelector('p').textContent;
            messageHistory.push({ role, content });
        });
        
        // Save conversation to localStorage
        saveConversation(messageHistory);
        
        // Rest of your code...
    }
}
```

This gives you a good starting point for collecting and analyzing chat data while keeping the implementation simple and compatible with GitHub Pages.