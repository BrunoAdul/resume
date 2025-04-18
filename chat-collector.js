// Chat data collection script
// This sends chat data to a Google Form which will store it in a Google Sheet
// It also provides a backup method using localStorage

// Configuration for the Google Form
// Using a direct form ID for simplicity and reliability
const FORM_CONFIG = {
    formId: "1FAIpQLSe6YxU3_LUzvKC80VfXaxWVjSe_JtQDelX6ULPSaCU8M5SF-g", // Direct form ID for chat data
    fields: {
        // Note: We don't need a timestamp field as Google Forms records this automatically
        conversationId: "entry.335428706", // Conversation ID field
        userMessage: "entry.1415634410", // User message field
        botResponse: "entry.431915707", // Bot response field
        userAgent: "entry.2088488122", // User agent field
        referrer: "entry.1105825235" // Referrer field
    }
};

// We're now using a direct form ID, so we don't need to fetch it securely
// This function is kept for backward compatibility but doesn't do anything
async function getSecureFormId() {
    // Form ID is already set in the FORM_CONFIG
    return true;
}

// No need to initialize the form ID as it's already set
// This line is kept for backward compatibility
// getSecureFormId();

// Generate a unique conversation ID for this session
let currentConversationId = '';

// Function to get or create a conversation ID
function getConversationId() {
    if (!currentConversationId) {
        // Generate a new ID if we don't have one
        currentConversationId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Store it in sessionStorage so it persists across page reloads but not across sessions
        sessionStorage.setItem('currentChatConversationId', currentConversationId);
    }
    return currentConversationId;
}

// Initialize conversation ID from sessionStorage if available
if (sessionStorage.getItem('currentChatConversationId')) {
    currentConversationId = sessionStorage.getItem('currentChatConversationId');
}

// Send chat data to Google Form
function sendChatToGoogleForm(messageData) {
    // First, save to localStorage as backup
    saveToLocalStorage(messageData);

    // If we don't have a form ID configured, just use the backup
    if (!FORM_CONFIG.formId) {
        return;
    }

    // Create the data to send
    const formData = new FormData();

    // Get or create a conversation ID
    const conversationId = getConversationId();

    // Add the message data to the form using the configured entry IDs
    // Note: We don't need to send a timestamp as Google Forms records this automatically
    if (FORM_CONFIG.fields.conversationId) {
        formData.append(FORM_CONFIG.fields.conversationId, conversationId); // Conversation ID field
    }
    formData.append(FORM_CONFIG.fields.userMessage, messageData.userMessage); // User message field
    formData.append(FORM_CONFIG.fields.botResponse, messageData.botResponse); // Bot response field
    formData.append(FORM_CONFIG.fields.userAgent, messageData.userAgent); // User agent field
    formData.append(FORM_CONFIG.fields.referrer, messageData.referrer); // Referrer field

    // Send the data to the Google Form
    fetch(`https://docs.google.com/forms/d/e/${FORM_CONFIG.formId}/formResponse`, {
        method: 'POST',
        mode: 'no-cors', // This is important to prevent CORS issues
        body: formData
    }).catch(error => {
        // Silently fail - we don't want to interrupt the user experience
        console.log('Error sending chat data:', error);
    });
}

// Backup storage function using localStorage
function saveToLocalStorage(messageData) {
    try {
        // Generate a unique ID for this chat entry
        const chatId = 'chat_' + Date.now();

        // Save the chat data
        localStorage.setItem(chatId, JSON.stringify(messageData));

        // Update the list of all chats
        let allChats = JSON.parse(localStorage.getItem('allChats') || '[]');
        allChats.push(chatId);
        localStorage.setItem('allChats', JSON.stringify(allChats));
    } catch (error) {
        console.log('Error saving to localStorage:', error);
    }
}

// Function to retrieve all chat data (for admin panel)
function getAllChatData() {
    try {
        const allChats = JSON.parse(localStorage.getItem('allChats') || '[]');
        const chatData = [];

        allChats.forEach(chatId => {
            const data = JSON.parse(localStorage.getItem(chatId) || 'null');
            if (data) {
                chatData.push({
                    id: chatId,
                    ...data
                });
            }
        });

        return chatData;
    } catch (error) {
        console.error('Error retrieving chat data:', error);
        return [];
    }
}

// Function to export all chat data as CSV
function exportChatDataAsCSV() {
    const chatData = getAllChatData();
    if (chatData.length === 0) {
        alert('No chat data available to export.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    // Add CSV header
    csvContent += "ID,Timestamp,User Message,Bot Response,User Agent,Referrer\n";

    // Add data rows
    chatData.forEach(chat => {
        const row = [
            chat.id,
            chat.timestamp,
            `"${(chat.userMessage || '').replace(/"/g, '""')}"`,
            `"${(chat.botResponse || '').replace(/"/g, '""')}"`,
            `"${(chat.userAgent || '').replace(/"/g, '""')}"`,
            `"${(chat.referrer || '').replace(/"/g, '""')}"`
        ];
        csvContent += row.join(',') + '\n';
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chat_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add admin panel functionality
function setupAdminPanel() {
    // Create a hidden keyboard shortcut for admin access
    let keySequence = '';
    const secretCode = 'admin'; // Type 'admin' quickly to access admin panel

    document.addEventListener('keydown', function(e) {
        // Only respond to alphabetic keys
        if (e.key && e.key.length === 1 && e.key.match(/[a-z]/i)) {
            keySequence += e.key.toLowerCase();

            // Keep only the last 5 characters
            if (keySequence.length > 5) {
                keySequence = keySequence.slice(-5);
            }

            // Check if the sequence matches
            if (keySequence === secretCode) {
                // Clear the sequence
                keySequence = '';

                // Ask for a second factor - email address
                const emailCheck = prompt('Enter your email for verification:');
                if (emailCheck && emailCheck.toLowerCase() === 'brunoadul@gmail.com') {
                    showAdminPanel();
                }
            }
        }
    });
}

// Show the admin panel
function showAdminPanel() {
    // Create admin panel container
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

    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Chat Data Admin Panel';
    adminPanel.appendChild(title);

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
    exportButton.addEventListener('click', exportChatDataAsCSV);
    adminPanel.appendChild(exportButton);

    // Get all chat data
    const chatData = getAllChatData();

    // Display chat data
    if (chatData.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'No chat data available.';
        adminPanel.appendChild(noData);
    } else {
        // Create a table for the data
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Timestamp', 'User Message', 'Bot Response', 'Actions'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.style.padding = '8px';
            th.style.borderBottom = '1px solid #ddd';
            th.style.textAlign = 'left';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add table body
        const tbody = document.createElement('tbody');
        chatData.forEach(chat => {
            const row = document.createElement('tr');

            // Timestamp cell
            const timestampCell = document.createElement('td');
            timestampCell.textContent = new Date(chat.timestamp).toLocaleString();
            timestampCell.style.padding = '8px';
            timestampCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(timestampCell);

            // User message cell
            const userMessageCell = document.createElement('td');
            userMessageCell.textContent = chat.userMessage || '';
            userMessageCell.style.padding = '8px';
            userMessageCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(userMessageCell);

            // Bot response cell
            const botResponseCell = document.createElement('td');
            botResponseCell.textContent = chat.botResponse || '';
            botResponseCell.style.padding = '8px';
            botResponseCell.style.borderBottom = '1px solid #ddd';
            row.appendChild(botResponseCell);

            // Actions cell
            const actionsCell = document.createElement('td');
            actionsCell.style.padding = '8px';
            actionsCell.style.borderBottom = '1px solid #ddd';

            // View details button
            const viewButton = document.createElement('button');
            viewButton.textContent = 'Details';
            viewButton.style.marginRight = '5px';
            viewButton.addEventListener('click', () => {
                alert(`User Agent: ${chat.userAgent}\nReferrer: ${chat.referrer}`);
            });
            actionsCell.appendChild(viewButton);

            row.appendChild(actionsCell);

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        adminPanel.appendChild(table);
    }

    // Add the panel to the document
    document.body.appendChild(adminPanel);
}

// Initialize the admin panel when the page loads
document.addEventListener('DOMContentLoaded', setupAdminPanel);

// Export the functions so they can be used in other scripts
window.sendChatToGoogleForm = sendChatToGoogleForm;
window.showAdminPanel = showAdminPanel;