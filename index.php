<?php
// Set content type to HTML
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bruno Adul - Information Technology Expert</title>
    <link rel="icon" type="image/png" href="bruno-profile.JPG">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Preload critical assets -->
    <link rel="preload" href="bruno-profile.JPG" as="image">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" as="style">
    <link rel="preload" href="notification.mp3" as="audio" crossorigin="anonymous">

    <!-- Explicitly load the notification sound -->
    <audio id="preloaded-notification" preload="auto" style="display: none;">
        <source src="notification.mp3" type="audio/mpeg">
    </audio>
    
    <!-- Link to external CSS file -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
<!-- Page Loader -->
<div class="page-loader">
    <div class="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="loader-text">Loading Portfolio</div>
    <div class="loader-progress">
        <div class="loader-progress-bar"></div>
    </div>
</div>

<!-- Scroll Progress Bar -->
<div class="scroll-progress-container">
    <div class="scroll-progress-bar"></div>
</div>

<!-- Navigation Menu -->
<nav class="main-nav">
    <div class="nav-container">
        <button class="mobile-menu-btn" aria-label="Toggle menu">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links">
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="Resume.pdf" download="resume.pdf" type="application/pdf" class="cv-download" id="download-cv-btn">
            <i class="fas fa-download"></i>
            <span>Download CV</span>
        </a>
    </div>
</nav>

<header class="hero">
    <div class="tech-particles"></div>
    <div class="neural-network-bg"></div>
    <div class="container hero-content">
        <div class="profile-img animate-scaleIn">
            <img src="bruno-profile.JPG" alt="Bruno Adul">
        </div>
        <h1 class="animate-fadeInUp delay-1">Bruno Adul</h1>
        <h2 class="animate-fadeInUp delay-2">Information Technology Expert | Software Developer | Data Scientist & AI Engineer | Prompt Engineer</h2>
        <p class="animate-fadeInUp delay-3">Kasarani Nairobi, Thika Road, 40405 | 0751005348 | brunoadul@gmail.com</p>

        <div class="social-links animate-fadeInUp delay-4">
            <a href="https://github.com/BrunoAdul" target="_blank" aria-label="GitHub Profile"><i class="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/brunoadul" target="_blank" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
            <a href="mailto:brunoadul@gmail.com" aria-label="Email Bruno"><i class="fas fa-envelope"></i></a>
            <a href="https://wa.me/254751005348" target="_blank" aria-label="WhatsApp Bruno" class="whatsapp-btn"><i class="fab fa-whatsapp"></i></a>
        </div>

        <div class="tech-icons animate-fadeInUp delay-5">
            <i class="fab fa-python"></i>
            <i class="fab fa-react"></i>
            <i class="fab fa-js-square"></i>
            <i class="fas fa-database"></i>
            <i class="fas fa-brain"></i>
            <i class="fas fa-robot"></i>
            <i class="fas fa-code"></i>
        </div>
    </div>
</header>

    <!-- Experience -->
    <section id="experience" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Professional Experience</h2>

            <div class="timeline">
                <!-- Full-Stack Developer & IT Lead -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-store"></i> Full-Stack Developer & IT Lead</h3>
                    <h4>
                        <img src="cplogo.png" alt="Cerealsplace" class="company-logo">
                        Cerealsplace.com (Startup), Nairobi Kenya
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> February 2025 - March 2025 <span class="badge">Contract</span></p>

                    <!-- First bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-1"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-1" style="display: none;">
                        <ul>
                            <li>Secured the application by configuring AWS Web Application Firewall (WAF) to protect against common web exploits.</li>
                            <li>Installed and configured SSL certificates via Let's Encrypt, enabling automatic renewals for uninterrupted security.</li>
                            <li>Designed website content and graphics, ensuring a user-friendly interface and engaging visual experience.</li>
                            <li>Implemented security best practices, including setting up security policies, system monitoring, and regular audits.</li>
                            <li>Configured and enforced automated backup policies to ensure data integrity and disaster recovery readiness.</li>
                            <li>Integrated AWS Elastic Load Balancer (ELB) to ensure high availability and distribute traffic efficiently.</li>
                            <li>Integrated M-Pesa API to enable seamless STK Push payments, ensuring real-time payment processing.</li>
                            <li>Conducted performance optimization, including database tuning and server configuration, to enhance site speed and reliability.</li>
                            <li>Oversaw system monitoring and troubleshooting, ensuring 24/7 uptime and rapid issue resolution.</li>
                            <li>Collaborated with cross-functional teams to align business objectives with technical strategies.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="1">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Laravel</span>
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">DevOps</span>
                        <span class="skill-tag">Security</span>
                        <span class="skill-tag">M-Pesa API</span>
                    </div>
                </div>

                <!-- AI Engineer -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-robot"></i> AI Engineer</h3>
                    <h4>
                        <img src="ailogo.png" alt="AI Company" class="company-logo">
                        AI Solutions Inc., Remote
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> January 2024 - Present <span class="badge">Full-time</span></p>

                    <!-- Second bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-2"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-2" style="display: none;">
                        <ul>
                            <li>Developed a comprehensive AI-powered chatbot using OpenAI's GPT-4 to provide personalized financial advice and portfolio recommendations.</li>
                            <li>Implemented advanced prompt engineering techniques to optimize AI responses, resulting in a 40% improvement in user satisfaction scores.</li>
                            <li>Created a custom fine-tuned model for domain-specific knowledge, enhancing accuracy in financial terminology and regulations.</li>
                            <li>Designed and implemented a sentiment analysis system that processes customer feedback to identify areas for service improvement.</li>
                            <li>Built a real-time anomaly detection system that monitors transactions for potential fraud, reducing false positives by 35%.</li>
                            <li>Developed a recommendation engine that increased cross-selling opportunities by 28% through personalized product suggestions.</li>
                            <li>Implemented a document processing pipeline using computer vision and NLP to automate data extraction from financial statements.</li>
                            <li>Created a comprehensive testing framework for AI systems, ensuring reliability and consistency in production environments.</li>
                            <li>Collaborated with UX designers to create intuitive interfaces for AI-powered tools, enhancing user adoption rates.</li>
                            <li>Presented technical concepts to non-technical stakeholders, facilitating understanding and buy-in for AI initiatives.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="2">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">TensorFlow</span>
                        <span class="skill-tag">NLP</span>
                        <span class="skill-tag">GPT-4</span>
                        <span class="skill-tag">Prompt Engineering</span>
                    </div>
                </div>

                <!-- Data Engineer -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-database"></i> Data Engineer</h3>
                    <h4>
                        <img src="datalogo.png" alt="Data Company" class="company-logo">
                        DataFlow Systems, Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> June 2023 - December 2023 <span class="badge">Contract</span></p>

                    <!-- Third bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-3"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-3" style="display: none;">
                        <ul>
                            <li>Created a custom Python-based ETL pipeline that processed over 10TB of healthcare data, reducing processing time by 60%.</li>
                            <li>Designed and implemented a data lake architecture on AWS S3, enabling cost-effective storage and flexible data access patterns.</li>
                            <li>Developed automated data quality checks that identified and flagged anomalies, improving overall data integrity by 45%.</li>
                            <li>Implemented data governance policies and procedures, ensuring compliance with GDPR and local data protection regulations.</li>
                            <li>Optimized SQL queries and database schemas, resulting in a 30% improvement in query performance across critical systems.</li>
                            <li>Created comprehensive data documentation and metadata management systems, enhancing data discoverability and understanding.</li>
                            <li>Developed real-time data streaming solutions using Kafka and Spark Streaming for time-sensitive analytics applications.</li>
                            <li>Implemented data masking and anonymization techniques to protect sensitive information while maintaining analytical value.</li>
                            <li>Collaborated with data scientists to create feature stores that accelerated machine learning model development cycles.</li>
                            <li>Mentored junior engineers on data engineering best practices and modern data stack technologies.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="3">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">SQL</span>
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">ETL</span>
                        <span class="skill-tag">Data Modeling</span>
                    </div>
                </div>

                <!-- Frontend Developer -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-laptop-code"></i> Frontend Developer</h3>
                    <h4>
                        <img src="weblogo.png" alt="Web Company" class="company-logo">
                        WebTech Solutions, Remote
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> January 2023 - May 2023 <span class="badge">Contract</span></p>

                    <!-- Fourth bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-4"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-4" style="display: none;">
                        <ul>
                            <li>Implemented a real-time data visualization dashboard using D3.js and React that tracked key performance metrics across 12 departments.</li>
                            <li>Developed responsive web interfaces that improved mobile user engagement by 35% and reduced bounce rates by 20%.</li>
                            <li>Implemented advanced CSS animations and transitions that enhanced user experience and brand perception.</li>
                            <li>Optimized frontend performance through code splitting, lazy loading, and asset optimization, improving load times by 40%.</li>
                            <li>Implemented accessibility features (WCAG 2.1 AA compliance) that made applications usable for people with disabilities.</li>
                            <li>Created reusable component libraries that accelerated development time for new features by 25%.</li>
                            <li>Implemented comprehensive unit and integration testing strategies, achieving 90% code coverage.</li>
                            <li>Collaborated with UX designers to transform wireframes and mockups into functional, pixel-perfect interfaces.</li>
                            <li>Integrated third-party APIs and services to extend application functionality while maintaining consistent user experience.</li>
                            <li>Mentored junior developers on modern frontend development practices and architectural patterns.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="4">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">D3.js</span>
                        <span class="skill-tag">CSS3</span>
                        <span class="skill-tag">Responsive Design</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Education -->
    <section id="education" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Education & Training</h2>

            <div class="timeline">
                <!-- Master's Degree -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-graduation-cap"></i> MSc in Computer Science</h3>
                    <h4>
                        <img src="unilogo.png" alt="University" class="company-logo">
                        University of Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> 2021 - 2023</p>
                    <p>Specialized in Artificial Intelligence and Machine Learning with a focus on natural language processing and computer vision applications.</p>
                    <div class="skills-used">
                        <span class="skill-tag">AI</span>
                        <span class="skill-tag">Machine Learning</span>
                        <span class="skill-tag">NLP</span>
                        <span class="skill-tag">Computer Vision</span>
                    </div>
                </div>

                <!-- Bachelor's Degree -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-graduation-cap"></i> BSc in Information Technology</h3>
                    <h4>
                        <img src="unilogo.png" alt="University" class="company-logo">
                        University of Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> 2017 - 2021</p>
                    <p>Graduated with First Class Honors. Coursework included software engineering, database systems, networking, and web development.</p>
                    <div class="skills-used">
                        <span class="skill-tag">Software Engineering</span>
                        <span class="skill-tag">Databases</span>
                        <span class="skill-tag">Networking</span>
                        <span class="skill-tag">Web Development</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Technical Skills</h2>

            <div class="skills-container">
                <!-- Programming Languages -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-code"></i> Programming Languages</h3>
                    <ul class="skill-list">
                        <li>Python</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                        <li>PHP</li>
                        <li>Java</li>
                        <li>C#</li>
                        <li>SQL</li>
                        <li>HTML5/CSS3</li>
                    </ul>
                </div>

                <!-- Frameworks & Libraries -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-layer-group"></i> Frameworks & Libraries</h3>
                    <ul class="skill-list">
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Django</li>
                        <li>Flask</li>
                        <li>Laravel</li>
                        <li>TensorFlow</li>
                        <li>PyTorch</li>
                    </ul>
                </div>

                <!-- Data Science & AI -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-brain"></i> Data Science & AI</h3>
                    <ul class="skill-list">
                        <li>Machine Learning</li>
                        <li>Deep Learning</li>
                        <li>NLP</li>
                        <li>Computer Vision</li>
                        <li>Data Analysis</li>
                        <li>Data Visualization</li>
                        <li>Prompt Engineering</li>
                        <li>LLM Fine-tuning</li>
                    </ul>
                </div>

                <!-- DevOps & Cloud -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-cloud"></i> DevOps & Cloud</h3>
                    <ul class="skill-list">
                        <li>AWS</li>
                        <li>Docker</li>
                        <li>Kubernetes</li>
                        <li>CI/CD</li>
                        <li>Git</li>
                        <li>Linux</li>
                        <li>Terraform</li>
                        <li>Monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Featured Projects</h2>

            <div class="projects-grid">
                <!-- AI Chatbot -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3>Financial Advisory AI Chatbot</h3>
                    <p>Developed an AI-powered chatbot using GPT-4 that provides personalized financial advice and portfolio recommendations based on user goals and risk tolerance.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- Data Pipeline -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-database"></i>
                    </div>
                    <h3>Healthcare Data Pipeline</h3>
                    <p>Created a Python-based ETL pipeline that processes and analyzes healthcare data, enabling medical professionals to identify trends and make data-driven decisions.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- Dashboard -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Real-time Analytics Dashboard</h3>
                    <p>Built a responsive dashboard using React and D3.js that visualizes key performance metrics in real-time, helping businesses monitor and optimize their operations.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- E-commerce Platform -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>E-commerce Platform</h3>
                    <p>Developed a full-stack e-commerce platform with Laravel and React, featuring secure payment processing, inventory management, and analytics reporting.</p>
                    <a href="#" class="btn">View Project</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications -->
    <section id="certifications" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Certifications</h2>

            <div class="badge-container">
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    AWS Certified Solutions Architect
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Google Professional Data Engineer
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Microsoft Certified: Azure AI Engineer
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    TensorFlow Developer Certificate
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Certified Kubernetes Administrator
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Certified Prompt Engineer
                </a>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Get In Touch</h2>

            <div class="contact-container">
                <div class="contact-info animate-slideInLeft">
                    <h3><i class="fas fa-address-card"></i> Contact Information</h3>
                    <ul class="contact-details">
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Kasarani Nairobi, Thika Road, 40405</span>
                        </li>
                        <li>
                            <i class="fas fa-phone"></i>
                            <a href="tel:+254751005348">0751005348</a>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:brunoadul@gmail.com">brunoadul@gmail.com</a>
                        </li>
                        <li>
                            <i class="fab fa-github"></i>
                            <a href="https://github.com/BrunoAdul" target="_blank">github.com/BrunoAdul</a>
                        </li>
                        <li>
                            <i class="fab fa-linkedin-in"></i>
                            <a href="https://linkedin.com/in/brunoadul" target="_blank">linkedin.com/in/brunoadul</a>
                        </li>
                        <li>
                            <i class="fab fa-whatsapp"></i>
                            <a href="https://wa.me/254751005348" target="_blank">WhatsApp Me</a>
                        </li>
                    </ul>
                </div>

                <div class="contact-form animate-slideInRight">
                    <h3><i class="fas fa-paper-plane"></i> Send Me a Message</h3>
                    <form id="contact-form">
                        <div class="form-group">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" id="name" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" id="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" id="subject" name="subject" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">Message</label>
                            <textarea id="message" name="message" class="form-control" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-block">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> Bruno Adul. All rights reserved.</p>
            <div class="footer-links">
                <a href="#experience">Experience</a>
                <a href="#education">Education</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
                <a href="#certifications">Certifications</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="footer-social">
                <a href="https://github.com/BrunoAdul" target="_blank" aria-label="GitHub Profile"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/brunoadul" target="_blank" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
                <a href="mailto:brunoadul@gmail.com" aria-label="Email Bruno"><i class="fas fa-envelope"></i></a>
                <a href="https://wa.me/254751005348" target="_blank" aria-label="WhatsApp Bruno"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    </footer>

    <!-- Chat Bubble -->
    <div class="chat-bubble">
        <div class="chat-bubble-icon">
            <i class="fas fa-comment-dots"></i>
        </div>
        <div class="chat-bubble-content">
            <div class="chat-bubble-header">
                <span>Chat with Bruno</span>
                <button class="chat-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="chat-message bot">
                    Hi there! I'm Bruno's virtual assistant. How can I help you today?
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="chat-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
        <div class="chat-notification">
            <p>👋 Hi there! Have a question about my skills or experience? I'm here to help!</p>
            <button class="chat-notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>

    <!-- Sound player script -->
    <script src="play-sound.js"></script>

    <!-- LLM chat script -->
    <script src="llm-chat.js"></script>

    <!-- Chat data collection script -->
    <script src="chat-collector.js"></script>

    <!-- Contact form script -->
    <script src="contact-form.js"></script>
    
    <!-- Main JavaScript file -->
    <script src="main.js"></script>
</body>
</html><?php
// Set content type to HTML
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bruno Adul - Information Technology Expert</title>
    <link rel="icon" type="image/png" href="bruno-profile.JPG">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Preload critical assets -->
    <link rel="preload" href="bruno-profile.JPG" as="image">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" as="style">
    <link rel="preload" href="notification.mp3" as="audio" crossorigin="anonymous">

    <!-- Explicitly load the notification sound -->
    <audio id="preloaded-notification" preload="auto" style="display: none;">
        <source src="notification.mp3" type="audio/mpeg">
    </audio>
    
    <!-- Link to external CSS file -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
<!-- Page Loader -->
<div class="page-loader">
    <div class="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="loader-text">Loading Portfolio</div>
    <div class="loader-progress">
        <div class="loader-progress-bar"></div>
    </div>
</div>

<!-- Scroll Progress Bar -->
<div class="scroll-progress-container">
    <div class="scroll-progress-bar"></div>
</div>

<!-- Navigation Menu -->
<nav class="main-nav">
    <div class="nav-container">
        <button class="mobile-menu-btn" aria-label="Toggle menu">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links">
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="Resume.pdf" download="resume.pdf" type="application/pdf" class="cv-download" id="download-cv-btn">
            <i class="fas fa-download"></i>
            <span>Download CV</span>
        </a>
    </div>
</nav>

<header class="hero">
    <div class="tech-particles"></div>
    <div class="neural-network-bg"></div>
    <div class="container hero-content">
        <div class="profile-img animate-scaleIn">
            <img src="bruno-profile.JPG" alt="Bruno Adul">
        </div>
        <h1 class="animate-fadeInUp delay-1">Bruno Adul</h1>
        <h2 class="animate-fadeInUp delay-2">Information Technology Expert | Software Developer | Data Scientist & AI Engineer | Prompt Engineer</h2>
        <p class="animate-fadeInUp delay-3">Kasarani Nairobi, Thika Road, 40405 | 0751005348 | brunoadul@gmail.com</p>

        <div class="social-links animate-fadeInUp delay-4">
            <a href="https://github.com/BrunoAdul" target="_blank" aria-label="GitHub Profile"><i class="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/brunoadul" target="_blank" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
            <a href="mailto:brunoadul@gmail.com" aria-label="Email Bruno"><i class="fas fa-envelope"></i></a>
            <a href="https://wa.me/254751005348" target="_blank" aria-label="WhatsApp Bruno" class="whatsapp-btn"><i class="fab fa-whatsapp"></i></a>
        </div>

        <div class="tech-icons animate-fadeInUp delay-5">
            <i class="fab fa-python"></i>
            <i class="fab fa-react"></i>
            <i class="fab fa-js-square"></i>
            <i class="fas fa-database"></i>
            <i class="fas fa-brain"></i>
            <i class="fas fa-robot"></i>
            <i class="fas fa-code"></i>
        </div>
    </div>
</header>

    <!-- Experience -->
    <section id="experience" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Professional Experience</h2>

            <div class="timeline">
                <!-- Full-Stack Developer & IT Lead -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-store"></i> Full-Stack Developer & IT Lead</h3>
                    <h4>
                        <img src="cplogo.png" alt="Cerealsplace" class="company-logo">
                        Cerealsplace.com (Startup), Nairobi Kenya
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> February 2025 - March 2025 <span class="badge">Contract</span></p>

                    <!-- First bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-1"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-1" style="display: none;">
                        <ul>
                            <li>Secured the application by configuring AWS Web Application Firewall (WAF) to protect against common web exploits.</li>
                            <li>Installed and configured SSL certificates via Let's Encrypt, enabling automatic renewals for uninterrupted security.</li>
                            <li>Designed website content and graphics, ensuring a user-friendly interface and engaging visual experience.</li>
                            <li>Implemented security best practices, including setting up security policies, system monitoring, and regular audits.</li>
                            <li>Configured and enforced automated backup policies to ensure data integrity and disaster recovery readiness.</li>
                            <li>Integrated AWS Elastic Load Balancer (ELB) to ensure high availability and distribute traffic efficiently.</li>
                            <li>Integrated M-Pesa API to enable seamless STK Push payments, ensuring real-time payment processing.</li>
                            <li>Conducted performance optimization, including database tuning and server configuration, to enhance site speed and reliability.</li>
                            <li>Oversaw system monitoring and troubleshooting, ensuring 24/7 uptime and rapid issue resolution.</li>
                            <li>Collaborated with cross-functional teams to align business objectives with technical strategies.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="1">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Laravel</span>
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">DevOps</span>
                        <span class="skill-tag">Security</span>
                        <span class="skill-tag">M-Pesa API</span>
                    </div>
                </div>

                <!-- AI Engineer -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-robot"></i> AI Engineer</h3>
                    <h4>
                        <img src="ailogo.png" alt="AI Company" class="company-logo">
                        AI Solutions Inc., Remote
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> January 2024 - Present <span class="badge">Full-time</span></p>

                    <!-- Second bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-2"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-2" style="display: none;">
                        <ul>
                            <li>Developed a comprehensive AI-powered chatbot using OpenAI's GPT-4 to provide personalized financial advice and portfolio recommendations.</li>
                            <li>Implemented advanced prompt engineering techniques to optimize AI responses, resulting in a 40% improvement in user satisfaction scores.</li>
                            <li>Created a custom fine-tuned model for domain-specific knowledge, enhancing accuracy in financial terminology and regulations.</li>
                            <li>Designed and implemented a sentiment analysis system that processes customer feedback to identify areas for service improvement.</li>
                            <li>Built a real-time anomaly detection system that monitors transactions for potential fraud, reducing false positives by 35%.</li>
                            <li>Developed a recommendation engine that increased cross-selling opportunities by 28% through personalized product suggestions.</li>
                            <li>Implemented a document processing pipeline using computer vision and NLP to automate data extraction from financial statements.</li>
                            <li>Created a comprehensive testing framework for AI systems, ensuring reliability and consistency in production environments.</li>
                            <li>Collaborated with UX designers to create intuitive interfaces for AI-powered tools, enhancing user adoption rates.</li>
                            <li>Presented technical concepts to non-technical stakeholders, facilitating understanding and buy-in for AI initiatives.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="2">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">TensorFlow</span>
                        <span class="skill-tag">NLP</span>
                        <span class="skill-tag">GPT-4</span>
                        <span class="skill-tag">Prompt Engineering</span>
                    </div>
                </div>

                <!-- Data Engineer -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-database"></i> Data Engineer</h3>
                    <h4>
                        <img src="datalogo.png" alt="Data Company" class="company-logo">
                        DataFlow Systems, Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> June 2023 - December 2023 <span class="badge">Contract</span></p>

                    <!-- Third bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-3"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-3" style="display: none;">
                        <ul>
                            <li>Created a custom Python-based ETL pipeline that processed over 10TB of healthcare data, reducing processing time by 60%.</li>
                            <li>Designed and implemented a data lake architecture on AWS S3, enabling cost-effective storage and flexible data access patterns.</li>
                            <li>Developed automated data quality checks that identified and flagged anomalies, improving overall data integrity by 45%.</li>
                            <li>Implemented data governance policies and procedures, ensuring compliance with GDPR and local data protection regulations.</li>
                            <li>Optimized SQL queries and database schemas, resulting in a 30% improvement in query performance across critical systems.</li>
                            <li>Created comprehensive data documentation and metadata management systems, enhancing data discoverability and understanding.</li>
                            <li>Developed real-time data streaming solutions using Kafka and Spark Streaming for time-sensitive analytics applications.</li>
                            <li>Implemented data masking and anonymization techniques to protect sensitive information while maintaining analytical value.</li>
                            <li>Collaborated with data scientists to create feature stores that accelerated machine learning model development cycles.</li>
                            <li>Mentored junior engineers on data engineering best practices and modern data stack technologies.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="3">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">SQL</span>
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">ETL</span>
                        <span class="skill-tag">Data Modeling</span>
                    </div>
                </div>

                <!-- Frontend Developer -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-laptop-code"></i> Frontend Developer</h3>
                    <h4>
                        <img src="weblogo.png" alt="Web Company" class="company-logo">
                        WebTech Solutions, Remote
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> January 2023 - May 2023 <span class="badge">Contract</span></p>

                    <!-- Fourth bullet with typing animation -->
                    <div class="role-preview">
                        <p class="typing-text" id="typing-text-4"></p>
                    </div>

                    <!-- Hidden bullets to be revealed -->
                    <div class="role-details" id="role-details-4" style="display: none;">
                        <ul>
                            <li>Implemented a real-time data visualization dashboard using D3.js and React that tracked key performance metrics across 12 departments.</li>
                            <li>Developed responsive web interfaces that improved mobile user engagement by 35% and reduced bounce rates by 20%.</li>
                            <li>Implemented advanced CSS animations and transitions that enhanced user experience and brand perception.</li>
                            <li>Optimized frontend performance through code splitting, lazy loading, and asset optimization, improving load times by 40%.</li>
                            <li>Implemented accessibility features (WCAG 2.1 AA compliance) that made applications usable for people with disabilities.</li>
                            <li>Created reusable component libraries that accelerated development time for new features by 25%.</li>
                            <li>Implemented comprehensive unit and integration testing strategies, achieving 90% code coverage.</li>
                            <li>Collaborated with UX designers to transform wireframes and mockups into functional, pixel-perfect interfaces.</li>
                            <li>Integrated third-party APIs and services to extend application functionality while maintaining consistent user experience.</li>
                            <li>Mentored junior developers on modern frontend development practices and architectural patterns.</li>
                        </ul>
                    </div>

                    <button class="btn read-more-btn" data-role="4">
                        <span>Read More</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>

                    <div class="skills-used">
                        <span class="skill-tag">React</span>
                        <span class="skill-tag">JavaScript</span>
                        <span class="skill-tag">D3.js</span>
                        <span class="skill-tag">CSS3</span>
                        <span class="skill-tag">Responsive Design</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Education -->
    <section id="education" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Education & Training</h2>

            <div class="timeline">
                <!-- Master's Degree -->
                <div class="timeline-item animate-slideInLeft">
                    <h3><i class="fas fa-graduation-cap"></i> MSc in Computer Science</h3>
                    <h4>
                        <img src="unilogo.png" alt="University" class="company-logo">
                        University of Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> 2021 - 2023</p>
                    <p>Specialized in Artificial Intelligence and Machine Learning with a focus on natural language processing and computer vision applications.</p>
                    <div class="skills-used">
                        <span class="skill-tag">AI</span>
                        <span class="skill-tag">Machine Learning</span>
                        <span class="skill-tag">NLP</span>
                        <span class="skill-tag">Computer Vision</span>
                    </div>
                </div>

                <!-- Bachelor's Degree -->
                <div class="timeline-item animate-slideInRight">
                    <h3><i class="fas fa-graduation-cap"></i> BSc in Information Technology</h3>
                    <h4>
                        <img src="unilogo.png" alt="University" class="company-logo">
                        University of Nairobi
                    </h4>
                    <p class="text-muted"><i class="far fa-calendar-alt"></i> 2017 - 2021</p>
                    <p>Graduated with First Class Honors. Coursework included software engineering, database systems, networking, and web development.</p>
                    <div class="skills-used">
                        <span class="skill-tag">Software Engineering</span>
                        <span class="skill-tag">Databases</span>
                        <span class="skill-tag">Networking</span>
                        <span class="skill-tag">Web Development</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Technical Skills</h2>

            <div class="skills-container">
                <!-- Programming Languages -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-code"></i> Programming Languages</h3>
                    <ul class="skill-list">
                        <li>Python</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                        <li>PHP</li>
                        <li>Java</li>
                        <li>C#</li>
                        <li>SQL</li>
                        <li>HTML5/CSS3</li>
                    </ul>
                </div>

                <!-- Frameworks & Libraries -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-layer-group"></i> Frameworks & Libraries</h3>
                    <ul class="skill-list">
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Django</li>
                        <li>Flask</li>
                        <li>Laravel</li>
                        <li>TensorFlow</li>
                        <li>PyTorch</li>
                    </ul>
                </div>

                <!-- Data Science & AI -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-brain"></i> Data Science & AI</h3>
                    <ul class="skill-list">
                        <li>Machine Learning</li>
                        <li>Deep Learning</li>
                        <li>NLP</li>
                        <li>Computer Vision</li>
                        <li>Data Analysis</li>
                        <li>Data Visualization</li>
                        <li>Prompt Engineering</li>
                        <li>LLM Fine-tuning</li>
                    </ul>
                </div>

                <!-- DevOps & Cloud -->
                <div class="skill-category animate-fadeInUp">
                    <h3><i class="fas fa-cloud"></i> DevOps & Cloud</h3>
                    <ul class="skill-list">
                        <li>AWS</li>
                        <li>Docker</li>
                        <li>Kubernetes</li>
                        <li>CI/CD</li>
                        <li>Git</li>
                        <li>Linux</li>
                        <li>Terraform</li>
                        <li>Monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Featured Projects</h2>

            <div class="projects-grid">
                <!-- AI Chatbot -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3>Financial Advisory AI Chatbot</h3>
                    <p>Developed an AI-powered chatbot using GPT-4 that provides personalized financial advice and portfolio recommendations based on user goals and risk tolerance.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- Data Pipeline -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-database"></i>
                    </div>
                    <h3>Healthcare Data Pipeline</h3>
                    <p>Created a Python-based ETL pipeline that processes and analyzes healthcare data, enabling medical professionals to identify trends and make data-driven decisions.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- Dashboard -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Real-time Analytics Dashboard</h3>
                    <p>Built a responsive dashboard using React and D3.js that visualizes key performance metrics in real-time, helping businesses monitor and optimize their operations.</p>
                    <a href="#" class="btn">View Project</a>
                </div>

                <!-- E-commerce Platform -->
                <div class="project-card animate-fadeInUp">
                    <div class="project-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>E-commerce Platform</h3>
                    <p>Developed a full-stack e-commerce platform with Laravel and React, featuring secure payment processing, inventory management, and analytics reporting.</p>
                    <a href="#" class="btn">View Project</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Certifications -->
    <section id="certifications" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Certifications</h2>

            <div class="badge-container">
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    AWS Certified Solutions Architect
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Google Professional Data Engineer
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Microsoft Certified: Azure AI Engineer
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    TensorFlow Developer Certificate
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Certified Kubernetes Administrator
                </a>
                <a href="#" class="cert-badge animate-fadeInUp">
                    <i class="fas fa-certificate"></i>
                    Certified Prompt Engineer
                </a>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section">
        <div class="container">
            <h2 class="section-title animate-fadeInUp">Get In Touch</h2>

            <div class="contact-container">
                <div class="contact-info animate-slideInLeft">
                    <h3><i class="fas fa-address-card"></i> Contact Information</h3>
                    <ul class="contact-details">
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Kasarani Nairobi, Thika Road, 40405</span>
                        </li>
                        <li>
                            <i class="fas fa-phone"></i>
                            <a href="tel:+254751005348">0751005348</a>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:brunoadul@gmail.com">brunoadul@gmail.com</a>
                        </li>
                        <li>
                            <i class="fab fa-github"></i>
                            <a href="https://github.com/BrunoAdul" target="_blank">github.com/BrunoAdul</a>
                        </li>
                        <li>
                            <i class="fab fa-linkedin-in"></i>
                            <a href="https://linkedin.com/in/brunoadul" target="_blank">linkedin.com/in/brunoadul</a>
                        </li>
                        <li>
                            <i class="fab fa-whatsapp"></i>
                            <a href="https://wa.me/254751005348" target="_blank">WhatsApp Me</a>
                        </li>
                    </ul>
                </div>

                <div class="contact-form animate-slideInRight">
                    <h3><i class="fas fa-paper-plane"></i> Send Me a Message</h3>
                    <form id="contact-form">
                        <div class="form-group">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" id="name" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" id="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" id="subject" name="subject" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">Message</label>
                            <textarea id="message" name="message" class="form-control" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-block">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> Bruno Adul. All rights reserved.</p>
            <div class="footer-links">
                <a href="#experience">Experience</a>
                <a href="#education">Education</a>
                <a href="#projects">Projects</a>
                <a href="#skills">Skills</a>
                <a href="#certifications">Certifications</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="footer-social">
                <a href="https://github.com/BrunoAdul" target="_blank" aria-label="GitHub Profile"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/brunoadul" target="_blank" aria-label="LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
                <a href="mailto:brunoadul@gmail.com" aria-label="Email Bruno"><i class="fas fa-envelope"></i></a>
                <a href="https://wa.me/254751005348" target="_blank" aria-label="WhatsApp Bruno"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    </footer>

    <!-- Chat Bubble -->
    <div class="chat-bubble">
        <div class="chat-bubble-icon">
            <i class="fas fa-comment-dots"></i>
        </div>
        <div class="chat-bubble-content">
            <div class="chat-bubble-header">
                <span>Chat with Bruno</span>
                <button class="chat-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages">
                <div class="chat-message bot">
                    Hi there! I'm Bruno's virtual assistant. How can I help you today?
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="chat-send-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
        <div class="chat-notification">
            <p>👋 Hi there! Have a question about my skills or experience? I'm here to help!</p>
            <button class="chat-notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>

    <!-- Sound player script -->
    <script src="play-sound.js"></script>

    <!-- LLM chat script -->
    <script src="llm-chat.js"></script>

    <!-- Chat data collection script -->
    <script src="chat-collector.js"></script>

    <!-- Contact form script -->
    <script src="contact-form.js"></script>
    
    <!-- Main JavaScript file -->
    <script src="main.js"></script>
</body>
</html>