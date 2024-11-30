// Implement performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Resume website loaded');
    
    // Initialize functionality
    initializeWebsite();
    setupFormValidation();
    animateSkillBars();
});

function initializeWebsite() {
    // Add event listeners
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            console.log('Section clicked:', this.id);
        });
    });
    
    // Add smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Name is required');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Message is required');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                console.log('Form submitted successfully');
                contactForm.reset();
                showSuccessMessage('Your message has been sent successfully!');
            }
        });
    }
}

function markInvalid(input, message) {
    input.classList.add('invalid');
    
    // Create or update error message
    let errorElement = input.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function markValid(input) {
    input.classList.remove('invalid');
    
    // Remove error message if exists
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    const contactForm = document.getElementById('contact-form');
    contactForm.parentElement.appendChild(successElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    // Animate skill bars on page load
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Implement performance optimizations
function update1744374057736() {
    console.log('Implement performance optimizations');
    return true;
}