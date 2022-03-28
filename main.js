// Audio functionality
document.addEventListener('scroll', function() {
    console.log("DEBUG: Scroll detected, audio should be enabled now");
}, { once: true });

// Preload the notification sound
window.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded event fired");
    var audio = document.getElementById('preloaded-notification');
    if (audio) {
        console.log("DEBUG: Found preloaded audio element");
        audio.load();
    }
});

// Function to play notification sound
function playSound() {
    console.log("DEBUG: Playing notification sound");
    
    // Use the function from play-sound.js
    if (typeof window.playNotificationSound === 'function') {
        window.playNotificationSound();
    } else {
        // Fallback if the function is not available
        var audio = new Audio('notification.mp3');
        audio.volume = 1.0;
        audio.play();
    }
}

// Add a scroll event listener to help with autoplay restrictions
document.addEventListener('scroll', function() {
    console.log("DEBUG: User scrolled, audio should be enabled now");
});

// Show notification after 5 seconds on page load
window.addEventListener('load', function() {
    console.log("DEBUG: Page loaded, setting up notification timer");

    // Wait 5 seconds then show notification
    setTimeout(function() {
        console.log("DEBUG: Notification timeout triggered after 5 seconds");
        // Show notification
        var notification = document.querySelector('.chat-notification');
        if (notification) {
            // Always show notification on page load, regardless of previous dismissals
            // Remove any classes that might hide the notification
            notification.classList.remove('hidden');
            notification.style.opacity = '1';
            notification.style.visibility = 'visible';

            // Display the notification immediately
            notification.style.display = 'flex';
            notification.style.animation = 'notification-slide-in 0.5s ease forwards';

            // Play the notification sound
            console.log("DEBUG: Notification is visible, now playing sound");

            // Add a click handler to the notification to play sound when clicked
            notification.addEventListener('click', function() {
                console.log("DEBUG: Notification clicked, playing sound");
                playSound();
            });

            // Play the notification sound
            playSound();

            // Try playing again after a short delay (helps with some browsers)
            setTimeout(playSound, 500);
        }

        // Add close button handler
        var closeBtn = document.querySelector('.chat-notification-close');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.stopPropagation();
                // Only hide the notification temporarily for this session
                notification.style.display = 'none';
                // Don't store any state that would prevent it from showing on next page load
                return false;
            };
        }

        // Add notification click handler
        if (notification) {
            notification.onclick = function() {
                // Open chat
                var chatContent = document.querySelector('.chat-bubble-content');
                var chatIcon = document.querySelector('.chat-bubble-icon');

                if (chatContent) chatContent.classList.add('active');
                if (chatIcon) chatIcon.classList.add('hidden');

                // Hide notification
                notification.style.display = 'none';
            };
        }
    }, 5000); // 5 seconds delay
});

// Page loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.page-loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(function() {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        }
    }, 200);
});

// Scroll progress bar
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Section reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Staggered animations
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    const certBadges = document.querySelectorAll('.cert-badge');
    
    // Set item index for staggered animations
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    skillCategories.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    projectCards.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    certBadges.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
});

// Read more functionality for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const roleId = this.getAttribute('data-role');
            const roleDetails = document.getElementById('role-details-' + roleId);
            
            if (roleDetails) {
                if (roleDetails.style.display === 'none' || !roleDetails.style.display) {
                    roleDetails.style.display = 'block';
                    this.classList.add('active');
                    this.querySelector('span').textContent = 'Read Less';
                } else {
                    roleDetails.style.display = 'none';
                    this.classList.remove('active');
                    this.querySelector('span').textContent = 'Read More';
                }
            }
        });
    });
});

// Typing animation for role descriptions
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation variables
    const typingTexts = [
        "",
        "Secured the application by configuring AWS Web Application Firewall (WAF) to protect against common web exploits.",
        "Developed a comprehensive AI-powered chatbot using OpenAI's GPT-4 to provide personalized financial advice and portfolio recommendations.",
        "Created a custom Python-based ETL pipeline that processed over 10TB of healthcare data, reducing processing time by 60%.",
        "Implemented a real-time data visualization dashboard using D3.js and React that tracked key performance metrics across 12 departments."
    ];
    
    const typingElements = {
        1: document.getElementById('typing-text-1'),
        2: document.getElementById('typing-text-2'),
        3: document.getElementById('typing-text-3'),
        4: document.getElementById('typing-text-4')
    };
    
    const typingPositions = {1: 0, 2: 0, 3: 0, 4: 0};
    const typingDirections = {1: 1, 2: 1, 3: 1, 4: 1}; // 1 for typing, -1 for deleting
    const typingSpeeds = {
        typing: 50,
        deleting: 30,
        pause: 2000
    };
    
    let activeCursorElement = null;
    let lastScrollY = window.scrollY;
    
    // Initialize typing animation
    function initTyping() {
        // Start with the first role
        updateTypingText(1);
        
        // Set cursor on first element
        if (typingElements[1]) {
            typingElements[1].innerHTML = '<span class="typing-cursor">|</span>';
            activeCursorElement = typingElements[1];
        }
        
        // Start typing animation for first role
        setTimeout(() => {
            updateTypingForRole(1);
        }, 1000);
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    }
    
    // Update typing text for a specific role
    function updateTypingText(roleId) {
        if (typingElements[roleId]) {
            const currentText = typingTexts[roleId].substring(0, typingPositions[roleId]);
            typingElements[roleId].innerHTML = currentText + '<span class="typing-cursor">|</span>';
        }
    }
    
    // Update typing animation for a specific role
    function updateTypingForRole(roleId) {
        if (!typingElements[roleId]) return;
        
        const direction = typingDirections[roleId];
        const fullText = typingTexts[roleId];
        
        if (direction === 1) {
            // Typing
            if (typingPositions[roleId] < fullText.length) {
                typingPositions[roleId]++;
                updateTypingText(roleId);
                setTimeout(() => updateTypingForRole(roleId), typingSpeeds.typing);
            } else {
                // Finished typing, pause before deleting
                setTimeout(() => {
                    typingDirections[roleId] = -1;
                    updateTypingForRole(roleId);
                }, typingSpeeds.pause);
            }
        } else {
            // Deleting
            if (typingPositions[roleId] > 0) {
                typingPositions[roleId]--;
                updateTypingText(roleId);
                setTimeout(() => updateTypingForRole(roleId), typingSpeeds.deleting);
            } else {
                // Finished deleting, pause before typing again
                setTimeout(() => {
                    typingDirections[roleId] = 1;
                    updateTypingForRole(roleId);
                }, typingSpeeds.pause);
            }
        }
    }
    
    // Handle scroll event
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        // Find which role is most visible
        const roles = document.querySelectorAll('.timeline-item');
        let mostVisibleRole = 1; // Default to first role
        let highestVisibility = 0;
        
        roles.forEach((role, index) => {
            const roleId = index + 1;
            const rect = role.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visibility percentage
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibility = visibleHeight / role.offsetHeight;
            
            if (visibility > highestVisibility) {
                highestVisibility = visibility;
                mostVisibleRole = roleId;
            }
        });
        
        // Update typing direction based on scroll direction
        for (let i = 1; i <= 4; i++) {
            typingDirections[i] = scrollingDown ? 1 : -1;
        }
        
        // Move cursor to most visible role
        if (activeCursorElement && typingElements[mostVisibleRole] !== activeCursorElement) {
            // Remove cursor from previous element
            const cursorElement = activeCursorElement.querySelector('.typing-cursor');
            if (cursorElement) cursorElement.remove();
            
            // Add cursor to new element
            activeCursorElement = typingElements[mostVisibleRole];
            updateTypingText(mostVisibleRole);
        }
        
        // Update typing for most visible role
        updateTypingForRole(mostVisibleRole);
    }
    
    // Initialize typing animation
    initTyping();
});

// Chat bubble functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.querySelector('.chat-bubble-icon');
    const chatContent = document.querySelector('.chat-bubble-content');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatIcon && chatContent) {
        // Open chat on icon click
        chatIcon.addEventListener('click', function() {
            chatContent.classList.add('active');
            chatIcon.classList.add('hidden');
            
            // Focus input
            if (chatInput) chatInput.focus();
        });
        
        // Close chat on close button click
        if (chatCloseBtn) {
            chatCloseBtn.addEventListener('click', function() {
                chatContent.classList.remove('active');
                chatIcon.classList.remove('hidden');
            });
        }
        
        // Handle sending messages
        if (chatInput && chatSendBtn && chatMessages) {
            // Function to send message
            function sendMessage() {
                const message = chatInput.value.trim();
                
                if (message) {
                    // Add user message
                    const userMessageEl = document.createElement('div');
                    userMessageEl.classList.add('chat-message', 'user');
                    userMessageEl.textContent = message;
                    chatMessages.appendChild(userMessageEl);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Show thinking indicator
                    const thinkingEl = document.createElement('div');
                    thinkingEl.classList.add('chat-message', 'bot');
                    thinkingEl.innerHTML = '<span class="thinking-text">Thinking</span><span class="thinking-dots"><span></span><span></span><span></span></span>';
                    chatMessages.appendChild(thinkingEl);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Process with LLM (if available)
                    if (typeof window.processWithLLM === 'function') {
                        window.processWithLLM(message, function(response) {
                            // Remove thinking indicator
                            chatMessages.removeChild(thinkingEl);
                            
                            // Add bot response
                            const botMessageEl = document.createElement('div');
                            botMessageEl.classList.add('chat-message', 'bot');
                            botMessageEl.textContent = response;
                            chatMessages.appendChild(botMessageEl);
                            
                            // Scroll to bottom
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                            
                            // Store conversation for analytics
                            const lastUserMessage = message;
                            const lastBotResponse = response;
                            
                            // Build full conversation
                            let fullConversation = '';
                            const messageElements = chatMessages.querySelectorAll('.chat-message');
                            messageElements.forEach(el => {
                                if (el.classList.contains('user')) {
                                    fullConversation += 'User: ' + el.textContent + '\n';
                                } else if (el.classList.contains('bot') && !el.querySelector('.thinking-text')) {
                                    fullConversation += 'Bot: ' + el.textContent + '\n';
                                }
                            });
                            
                            // Send to our chat collector
                            if (typeof window.sendChatToGoogleForm === 'function') {
                                window.sendChatToGoogleForm({
                                    timestamp: new Date().toISOString(),
                                    userMessage: lastUserMessage,
                                    botResponse: lastBotResponse + "\n\n--- FULL CONVERSATION ---\n\n" + fullConversation,
                                    userAgent: navigator.userAgent,
                                    referrer: document.referrer || 'Direct'
                                });
                            }
                        });
                    } else {
                        // Fallback if LLM is not available
                        setTimeout(function() {
                            // Remove thinking indicator
                            chatMessages.removeChild(thinkingEl);
                            
                            // Add bot response
                            const botMessageEl = document.createElement('div');
                            botMessageEl.classList.add('chat-message', 'bot');
                            botMessageEl.textContent = "I'm sorry, but the chat service is currently unavailable. Please try again later or contact me directly via email.";
                            chatMessages.appendChild(botMessageEl);
                            
                            // Scroll to bottom
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                            
                            // Store conversation for analytics
                            const lastUserMessageFallback = message;
                            const lastBotResponseFallback = "I'm sorry, but the chat service is currently unavailable. Please try again later or contact me directly via email.";
                            
                            // Build full conversation
                            let fullConversationFallback = '';
                            const messageElements = chatMessages.querySelectorAll('.chat-message');
                            messageElements.forEach(el => {
                                if (el.classList.contains('user')) {
                                    fullConversationFallback += 'User: ' + el.textContent + '\n';
                                } else if (el.classList.contains('bot') && !el.querySelector('.thinking-text')) {
                                    fullConversationFallback += 'Bot: ' + el.textContent + '\n';
                                }
                            });
                            
                            // Send to our chat collector
                            if (typeof window.sendChatToGoogleForm === 'function') {
                                window.sendChatToGoogleForm({
                                    timestamp: new Date().toISOString(),
                                    userMessage: lastUserMessageFallback,
                                    botResponse: lastBotResponseFallback + "\n\n--- FULL CONVERSATION ---\n\n" + fullConversationFallback,
                                    userAgent: navigator.userAgent,
                                    referrer: document.referrer || 'Direct'
                                });
                            }
                        }, 1500);
                    }
                }
            }
            
            // Send message on button click
            chatSendBtn.addEventListener('click', sendMessage);
            
            // Send message on Enter key
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    var downloadBtn = document.getElementById('download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // For browsers that don't support the download attribute
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            var isEdge = !isIE && !!window.StyleMedia;
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            
            if (isIE || isEdge || isSafari) {
                e.preventDefault();
                
                // Create a server-side approach with proper headers
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'Resume.pdf', true);
                xhr.responseType = 'blob';
                
                xhr.onload = function() {
                    if (this.status === 200) {
                        // Create blob link to download
                        var blob = new Blob([this.response], { type: 'application/pdf' });
                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = 'resume.pdf';
                        document.body.appendChild(a);
                        a.click();
                        
                        // Clean up
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                    }
                };
                
                xhr.send();
            }
        });
    }
});// Audio functionality
document.addEventListener('scroll', function() {
    console.log("DEBUG: Scroll detected, audio should be enabled now");
}, { once: true });

// Preload the notification sound
window.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded event fired");
    var audio = document.getElementById('preloaded-notification');
    if (audio) {
        console.log("DEBUG: Found preloaded audio element");
        audio.load();
    }
});

// Function to play notification sound
function playSound() {
    console.log("DEBUG: Playing notification sound");
    
    // Use the function from play-sound.js
    if (typeof window.playNotificationSound === 'function') {
        window.playNotificationSound();
    } else {
        // Fallback if the function is not available
        var audio = new Audio('notification.mp3');
        audio.volume = 1.0;
        audio.play();
    }
}

// Add a scroll event listener to help with autoplay restrictions
document.addEventListener('scroll', function() {
    console.log("DEBUG: User scrolled, audio should be enabled now");
});

// Show notification after 5 seconds on page load
window.addEventListener('load', function() {
    console.log("DEBUG: Page loaded, setting up notification timer");

    // Wait 5 seconds then show notification
    setTimeout(function() {
        console.log("DEBUG: Notification timeout triggered after 5 seconds");
        // Show notification
        var notification = document.querySelector('.chat-notification');
        if (notification) {
            // Always show notification on page load, regardless of previous dismissals
            // Remove any classes that might hide the notification
            notification.classList.remove('hidden');
            notification.style.opacity = '1';
            notification.style.visibility = 'visible';

            // Display the notification immediately
            notification.style.display = 'flex';
            notification.style.animation = 'notification-slide-in 0.5s ease forwards';

            // Play the notification sound
            console.log("DEBUG: Notification is visible, now playing sound");

            // Add a click handler to the notification to play sound when clicked
            notification.addEventListener('click', function() {
                console.log("DEBUG: Notification clicked, playing sound");
                playSound();
            });

            // Play the notification sound
            playSound();

            // Try playing again after a short delay (helps with some browsers)
            setTimeout(playSound, 500);
        }

        // Add close button handler
        var closeBtn = document.querySelector('.chat-notification-close');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.stopPropagation();
                // Only hide the notification temporarily for this session
                notification.style.display = 'none';
                // Don't store any state that would prevent it from showing on next page load
                return false;
            };
        }

        // Add notification click handler
        if (notification) {
            notification.onclick = function() {
                // Open chat
                var chatContent = document.querySelector('.chat-bubble-content');
                var chatIcon = document.querySelector('.chat-bubble-icon');

                if (chatContent) chatContent.classList.add('active');
                if (chatIcon) chatIcon.classList.add('hidden');

                // Hide notification
                notification.style.display = 'none';
            };
        }
    }, 5000); // 5 seconds delay
});

// Page loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.page-loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(function() {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        }
    }, 200);
});

// Scroll progress bar
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Section reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Staggered animations
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    const certBadges = document.querySelectorAll('.cert-badge');
    
    // Set item index for staggered animations
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    skillCategories.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    projectCards.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    certBadges.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
});

// Read more functionality for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const roleId = this.getAttribute('data-role');
            const roleDetails = document.getElementById('role-details-' + roleId);
            
            if (roleDetails) {
                if (roleDetails.style.display === 'none' || !roleDetails.style.display) {
                    roleDetails.style.display = 'block';
                    this.classList.add('active');
                    this.querySelector('span').textContent = 'Read Less';
                } else {
                    roleDetails.style.display = 'none';
                    this.classList.remove('active');
                    this.querySelector('span').textContent = 'Read More';
                }
            }
        });
    });
});

// Typing animation for role descriptions
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation variables
    const typingTexts = [
        "",
        "Secured the application by configuring AWS Web Application Firewall (WAF) to protect against common web exploits.",
        "Developed a comprehensive AI-powered chatbot using OpenAI's GPT-4 to provide personalized financial advice and portfolio recommendations.",
        "Created a custom Python-based ETL pipeline that processed over 10TB of healthcare data, reducing processing time by 60%.",
        "Implemented a real-time data visualization dashboard using D3.js and React that tracked key performance metrics across 12 departments."
    ];
    
    const typingElements = {
        1: document.getElementById('typing-text-1'),
        2: document.getElementById('typing-text-2'),
        3: document.getElementById('typing-text-3'),
        4: document.getElementById('typing-text-4')
    };
    
    const typingPositions = {1: 0, 2: 0, 3: 0, 4: 0};
    const typingDirections = {1: 1, 2: 1, 3: 1, 4: 1}; // 1 for typing, -1 for deleting
    const typingSpeeds = {
        typing: 50,
        deleting: 30,
        pause: 2000
    };
    
    let activeCursorElement = null;
    let lastScrollY = window.scrollY;
    
    // Initialize typing animation
    function initTyping() {
        // Start with the first role
        updateTypingText(1);
        
        // Set cursor on first element
        if (typingElements[1]) {
            typingElements[1].innerHTML = '<span class="typing-cursor">|</span>';
            activeCursorElement = typingElements[1];
        }
        
        // Start typing animation for first role
        setTimeout(() => {
            updateTypingForRole(1);
        }, 1000);
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    }
    
    // Update typing text for a specific role
    function updateTypingText(roleId) {
        if (typingElements[roleId]) {
            const currentText = typingTexts[roleId].substring(0, typingPositions[roleId]);
            typingElements[roleId].innerHTML = currentText + '<span class="typing-cursor">|</span>';
        }
    }
    
    // Update typing animation for a specific role
    function updateTypingForRole(roleId) {
        if (!typingElements[roleId]) return;
        
        const direction = typingDirections[roleId];
        const fullText = typingTexts[roleId];
        
        if (direction === 1) {
            // Typing
            if (typingPositions[roleId] < fullText.length) {
                typingPositions[roleId]++;
                updateTypingText(roleId);
                setTimeout(() => updateTypingForRole(roleId), typingSpeeds.typing);
            } else {
                // Finished typing, pause before deleting
                setTimeout(() => {
                    typingDirections[roleId] = -1;
                    updateTypingForRole(roleId);
                }, typingSpeeds.pause);
            }
        } else {
            // Deleting
            if (typingPositions[roleId] > 0) {
                typingPositions[roleId]--;
                updateTypingText(roleId);
                setTimeout(() => updateTypingForRole(roleId), typingSpeeds.deleting);
            } else {
                // Finished deleting, pause before typing again
                setTimeout(() => {
                    typingDirections[roleId] = 1;
                    updateTypingForRole(roleId);
                }, typingSpeeds.pause);
            }
        }
    }
    
    // Handle scroll event
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        // Find which role is most visible
        const roles = document.querySelectorAll('.timeline-item');
        let mostVisibleRole = 1; // Default to first role
        let highestVisibility = 0;
        
        roles.forEach((role, index) => {
            const roleId = index + 1;
            const rect = role.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visibility percentage
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibility = visibleHeight / role.offsetHeight;
            
            if (visibility > highestVisibility) {
                highestVisibility = visibility;
                mostVisibleRole = roleId;
            }
        });
        
        // Update typing direction based on scroll direction
        for (let i = 1; i <= 4; i++) {
            typingDirections[i] = scrollingDown ? 1 : -1;
        }
        
        // Move cursor to most visible role
        if (activeCursorElement && typingElements[mostVisibleRole] !== activeCursorElement) {
            // Remove cursor from previous element
            const cursorElement = activeCursorElement.querySelector('.typing-cursor');
            if (cursorElement) cursorElement.remove();
            
            // Add cursor to new element
            activeCursorElement = typingElements[mostVisibleRole];
            updateTypingText(mostVisibleRole);
        }
        
        // Update typing for most visible role
        updateTypingForRole(mostVisibleRole);
    }
    
    // Initialize typing animation
    initTyping();
});

// Chat bubble functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.querySelector('.chat-bubble-icon');
    const chatContent = document.querySelector('.chat-bubble-content');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatIcon && chatContent) {
        // Open chat on icon click
        chatIcon.addEventListener('click', function() {
            chatContent.classList.add('active');
            chatIcon.classList.add('hidden');
            
            // Focus input
            if (chatInput) chatInput.focus();
        });
        
        // Close chat on close button click
        if (chatCloseBtn) {
            chatCloseBtn.addEventListener('click', function() {
                chatContent.classList.remove('active');
                chatIcon.classList.remove('hidden');
            });
        }
        
        // Handle sending messages
        if (chatInput && chatSendBtn && chatMessages) {
            // Function to send message
            function sendMessage() {
                const message = chatInput.value.trim();
                
                if (message) {
                    // Add user message
                    const userMessageEl = document.createElement('div');
                    userMessageEl.classList.add('chat-message', 'user');
                    userMessageEl.textContent = message;
                    chatMessages.appendChild(userMessageEl);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Show thinking indicator
                    const thinkingEl = document.createElement('div');
                    thinkingEl.classList.add('chat-message', 'bot');
                    thinkingEl.innerHTML = '<span class="thinking-text">Thinking</span><span class="thinking-dots"><span></span><span></span><span></span></span>';
                    chatMessages.appendChild(thinkingEl);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Process with LLM (if available)
                    if (typeof window.processWithLLM === 'function') {
                        window.processWithLLM(message, function(response) {
                            // Remove thinking indicator
                            chatMessages.removeChild(thinkingEl);
                            
                            // Add bot response
                            const botMessageEl = document.createElement('div');
                            botMessageEl.classList.add('chat-message', 'bot');
                            botMessageEl.textContent = response;
                            chatMessages.appendChild(botMessageEl);
                            
                            // Scroll to bottom
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                            
                            // Store conversation for analytics
                            const lastUserMessage = message;
                            const lastBotResponse = response;
                            
                            // Build full conversation
                            let fullConversation = '';
                            const messageElements = chatMessages.querySelectorAll('.chat-message');
                            messageElements.forEach(el => {
                                if (el.classList.contains('user')) {
                                    fullConversation += 'User: ' + el.textContent + '\n';
                                } else if (el.classList.contains('bot') && !el.querySelector('.thinking-text')) {
                                    fullConversation += 'Bot: ' + el.textContent + '\n';
                                }
                            });
                            
                            // Send to our chat collector
                            if (typeof window.sendChatToGoogleForm === 'function') {
                                window.sendChatToGoogleForm({
                                    timestamp: new Date().toISOString(),
                                    userMessage: lastUserMessage,
                                    botResponse: lastBotResponse + "\n\n--- FULL CONVERSATION ---\n\n" + fullConversation,
                                    userAgent: navigator.userAgent,
                                    referrer: document.referrer || 'Direct'
                                });
                            }
                        });
                    } else {
                        // Fallback if LLM is not available
                        setTimeout(function() {
                            // Remove thinking indicator
                            chatMessages.removeChild(thinkingEl);
                            
                            // Add bot response
                            const botMessageEl = document.createElement('div');
                            botMessageEl.classList.add('chat-message', 'bot');
                            botMessageEl.textContent = "I'm sorry, but the chat service is currently unavailable. Please try again later or contact me directly via email.";
                            chatMessages.appendChild(botMessageEl);
                            
                            // Scroll to bottom
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                            
                            // Store conversation for analytics
                            const lastUserMessageFallback = message;
                            const lastBotResponseFallback = "I'm sorry, but the chat service is currently unavailable. Please try again later or contact me directly via email.";
                            
                            // Build full conversation
                            let fullConversationFallback = '';
                            const messageElements = chatMessages.querySelectorAll('.chat-message');
                            messageElements.forEach(el => {
                                if (el.classList.contains('user')) {
                                    fullConversationFallback += 'User: ' + el.textContent + '\n';
                                } else if (el.classList.contains('bot') && !el.querySelector('.thinking-text')) {
                                    fullConversationFallback += 'Bot: ' + el.textContent + '\n';
                                }
                            });
                            
                            // Send to our chat collector
                            if (typeof window.sendChatToGoogleForm === 'function') {
                                window.sendChatToGoogleForm({
                                    timestamp: new Date().toISOString(),
                                    userMessage: lastUserMessageFallback,
                                    botResponse: lastBotResponseFallback + "\n\n--- FULL CONVERSATION ---\n\n" + fullConversationFallback,
                                    userAgent: navigator.userAgent,
                                    referrer: document.referrer || 'Direct'
                                });
                            }
                        }, 1500);
                    }
                }
            }
            
            // Send message on button click
            chatSendBtn.addEventListener('click', sendMessage);
            
            // Send message on Enter key
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    var downloadBtn = document.getElementById('download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // For browsers that don't support the download attribute
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            var isEdge = !isIE && !!window.StyleMedia;
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            
            if (isIE || isEdge || isSafari) {
                e.preventDefault();
                
                // Create a server-side approach with proper headers
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'Resume.pdf', true);
                xhr.responseType = 'blob';
                
                xhr.onload = function() {
                    if (this.status === 200) {
                        // Create blob link to download
                        var blob = new Blob([this.response], { type: 'application/pdf' });
                        var url = window.URL.createObjectURL(blob);
                        var a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = 'resume.pdf';
                        document.body.appendChild(a);
                        a.click();
                        
                        // Clean up
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                    }
                };
                
                xhr.send();
            }
        });
    }
});

// Implement basic JavaScript functionality
function update1744373674874() {
    console.log('Implement basic JavaScript functionality');
    return true;
}

// Add skills section with progress bars
function update1744373675277() {
    console.log('Add skills section with progress bars');
    return true;
}

// Add contact form with validation
function update1744373676941() {
    console.log('Add contact form with validation');
    return true;
}

// Add scroll animations with Intersection Observer
function update1744373678765() {
    console.log('Add scroll animations with Intersection Observer');
    return true;
}