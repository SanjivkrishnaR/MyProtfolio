// 🚀 Optimization Utility: Throttle function to limit execution frequency
const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

// 🖱️ Next-Level Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const trailContainer = document.body;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    let isClicking = false;
    let isMagnetic = false;
    let magneticTarget = null;

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrail(mouseX, mouseY);
    });

    // Handle clicking state
    window.addEventListener('mousedown', () => {
        isClicking = true;
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
        isClicking = false;
        cursorDot.classList.remove('active');
        cursorOutline.classList.remove('active');
    });

    // Trail Particles Logic
    const createTrail = (x, y) => {
        if (Math.random() > 0.8) { // Only create sometimes for performance
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            trailContainer.appendChild(trail);

            const duration = 600;
            trail.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.6 },
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
            ], { duration, easing: 'ease-out' });

            setTimeout(() => trail.remove(), duration);
        }
    };

    // Main Animation Loop
    const animateCursor = () => {
        let targetX = mouseX;
        let targetY = mouseY;

        // Magnetic Effect Logic
        if (isMagnetic && magneticTarget) {
            const rect = magneticTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Push towards center of the element
            targetX = centerX + (mouseX - centerX) * 0.3;
            targetY = centerY + (mouseY - centerY) * 0.3;

            outlineX += (centerX - outlineX) * 0.2;
            outlineY += (centerY - outlineY) * 0.2;
        } else {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
        }

        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }

        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Interactive Elements Handling
    const handleMouseOver = (e) => {
        const el = e.target.closest('a, button, .social-btn, .project-card, .interactive-card, input, textarea, .antenna-card, .cert-item');
        if (!el) {
            resetCursorModes();
            return;
        }

        // Magnet for buttons/links/cards
        if (el.matches('a, button, .social-btn, .project-card, .interactive-card, .antenna-card')) {
            isMagnetic = true;
            magneticTarget = el;
            cursorOutline.classList.add('magnet');
        }

        // Text mode for inputs/textareas
        if (el.matches('input, textarea, p, h1, h2, h3, li, span')) {
            cursorDot.classList.add('text-mode');
            cursorOutline.classList.add('text-mode');
        }

        // View mode for images/gallery cards
        if (el.matches('.project-card, .antenna-card, .cert-item')) {
            cursorOutline.classList.add('view-mode');
        }
    };

    const resetCursorModes = () => {
        isMagnetic = false;
        magneticTarget = null;
        cursorDot.classList.remove('text-mode');
        cursorOutline.classList.remove('text-mode', 'magnet', 'view-mode');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) resetCursorModes();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 🎬 Netflix Style Intro Transition
    const introLoader = document.getElementById('intro-loader');
    const mainContent = document.querySelector('main');
    const navbarElement = document.getElementById('navbar');

    if (introLoader) {
        if (navbarElement) navbarElement.style.opacity = '1';

        setTimeout(() => {
            introLoader.style.opacity = '0';
            setTimeout(() => {
                introLoader.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('content-hidden');
                    mainContent.classList.add('content-visible');
                }
                if (navbarElement) {
                    navbarElement.style.opacity = '1';
                    navbarElement.style.transition = 'opacity 1s ease';
                }
            }, 800);
        }, 2500); // Reduced from 4s to 2.5s for snappier entry
    }

    // 🎬 Cinematic Roadmap: Progress Line Animation (Optimized with Throttle)
    const journeyTimeline = document.querySelector('.journey-timeline');
    const lineFill = document.querySelector('.line-fill');

    function animateTimeline() {
        if (!journeyTimeline || !lineFill) return;

        const rect = journeyTimeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top > windowHeight || rect.bottom < 0) return; // Portability check

        let progress = 0;
        if (rect.top < windowHeight / 1.5) {
            const totalHeight = rect.height;
            const scrollIn = (windowHeight / 1.5) - rect.top;
            progress = Math.min(Math.max((scrollIn / totalHeight) * 100, 0), 100);
        }

        lineFill.style.height = `${progress}%`;
    }

    window.addEventListener('scroll', throttle(animateTimeline, 16));
    animateTimeline();

    // 🌟 Theme Toggle
    const toggleSwitch = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme && toggleSwitch) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${currentTheme}-mode`);
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function (e) {
            if (e.target.checked) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 🌟 Navbar Scroll Effect & Mobile Menu (Optimized with Throttle)
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            if (navbarElement.style.padding !== '0.5rem 0') {
                navbarElement.style.padding = '0.5rem 0';
                navbarElement.style.background = document.body.classList.contains('dark-mode')
                    ? 'rgba(18, 18, 18, 0.98)'
                    : 'rgba(255, 255, 255, 0.98)';
                navbarElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        } else {
            if (navbarElement.style.padding !== '1rem 0') {
                navbarElement.style.padding = '1rem 0';
                navbarElement.style.background = 'transparent';
                navbarElement.style.boxShadow = 'none';
            }
        }
    };

    window.addEventListener('scroll', throttle(handleNavbarScroll, 50));

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuBtn.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            menuBtn.classList.remove('active');
        });
    });

    // 🌟 Typing Effect
    const typingTextElement = document.querySelector('.typing-text');
    const textArray = ["FRONT-END DEVELOPER", "UI/UX ENTHUSIAST", "ECE STUDENT"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentString = textArray[textIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentString.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingTextElement) type();


    // 🌟 Scroll Animations
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .fade-in-up');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function (entries, revealOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 🌟 Unified Media Modal Logic with Gallery Support
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const mediaCounter = document.getElementById('media-counter');

    let currentMediaList = [];
    let currentIndex = 0;

    const updateModalMedia = () => {
        const currentSrc = currentMediaList[currentIndex];
        const isVideo = currentSrc.toLowerCase().endsWith('.mp4');

        modalImg.style.display = 'none';
        modalVideo.style.display = 'none';
        modalVideo.pause();

        if (isVideo) {
            modalVideo.src = currentSrc;
            modalVideo.style.display = 'block';
            modalVideo.play();
        } else {
            modalImg.src = currentSrc;
            modalImg.style.display = 'block';
        }

        if (currentMediaList.length > 1) {
            mediaCounter.textContent = `${currentIndex + 1} / ${currentMediaList.length}`;
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            mediaCounter.textContent = "";
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    };

    const interactiveItems = document.querySelectorAll('.cert-item, .interactive-card');

    interactiveItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const srcList = item.getAttribute('data-src-list');
            const singleSrc = item.getAttribute('data-src') || item.getAttribute('data-cert');

            if (srcList) currentMediaList = srcList.split(',');
            else if (singleSrc) currentMediaList = [singleSrc];
            else return;

            currentIndex = 0;
            modal.style.display = "block";
            modalTitle.textContent = item.querySelector('h3') ? item.querySelector('h3').textContent : item.textContent;
            document.body.style.overflow = 'hidden';
            updateModalMedia();
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
        updateModalMedia();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentMediaList.length;
        updateModalMedia();
    });

    const closeModalFunc = () => {
        modal.style.display = "none";
        modalVideo.pause();
        modalImg.src = "";
        modalVideo.src = "";
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => { if (e.target == modal) closeModalFunc(); });

    // 🌟 🛡️ Security Sentinel "Bot"
    const securitySentinel = {
        scanInput: function (text) {
            const maliciousPatterns = [
                /<script/i, /javascript:/i, /onerror/i, /onload/i,
                /eval\(/i, /alert\(/i, /document\.cookie/i,
                /UNION SELECT/i, /DROP TABLE/i, /--/
            ];
            return maliciousPatterns.some(pattern => pattern.test(text));
        },

        sanitize: function (text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        showStatus: function (msg, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `security-toast ${type}`;
            toast.innerHTML = `<i class="fas fa-shield-halved"></i> <span>${msg}</span>`;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 4000);
        },

        // 🕵️ Visitor Intelligence System
        logVisitor: async function () {
            try {
                // Get IP and GEO data
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                const visitorInfo = {
                    ip: data.ip,
                    city: data.city,
                    region: data.region,
                    country: data.country_name,
                    isp: data.org,
                    device: navigator.userAgent
                };

                // Check Blacklist (Example logic)
                const blacklist = JSON.parse(localStorage.getItem('blocked_ips') || '[]');
                if (blacklist.includes(visitorInfo.ip)) {
                    document.body.innerHTML = `
                        <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#000; color:#ff4444; font-family:sans-serif; text-align:center; padding:20px;">
                            <i class="fas fa-user-slash" style="font-size:5rem; margin-bottom:20px;"></i>
                            <h1>ACCESS DENIED</h1>
                            <p>Your IP (${visitorInfo.ip}) has been flagged by SKR-Sentinel as a potential threat.</p>
                            <p>If you believe this is a mistake, contact the administrator.</p>
                        </div>
                    `;
                    throw new Error('IP Blocked');
                }

                // Prepare Notification for Mobile (via Telegram Webhook)
                // USER: Replace with your actual Bot Token and Chat ID
                const BOT_TOKEN = '8510397902:AAGTnG2fMpM_V5EwjNiefg-AAy4_3gsn--Y';
                const CHAT_ID = '6975056029';

                if (BOT_TOKEN && CHAT_ID) {
                    const message = `🚀 *New Visitor on Portfolio*\n\n` +
                        `📍 *IP:* ${visitorInfo.ip}\n` +
                        `🌍 *Location:* ${visitorInfo.city}, ${visitorInfo.country}\n` +
                        `🏢 *ISP:* ${visitorInfo.isp}\n` +
                        `📱 *Device:* ${visitorInfo.device.substring(0, 50)}...`;

                    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`);

                    // 🔔 Track the exit
                    localStorage.setItem('current_visitor_ip', visitorInfo.ip);
                    localStorage.setItem('session_start', Date.now());

                    window.addEventListener('beforeunload', () => {
                        const duration = Math.round((Date.now() - localStorage.getItem('session_start')) / 1000);
                        const exitMsg = `🚪 *Visitor Left Portfolio*\n\n` +
                            `📍 *IP:* ${visitorInfo.ip}\n` +
                            `⏱️ *Time Spent:* ${duration} seconds`;

                        // Use Beacon for reliable exit tracking
                        navigator.sendBeacon(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(exitMsg)}&parse_mode=Markdown`);
                    });
                }

                console.log('SKR-Sentinel: Visitor Logged Successfully');
            } catch (err) {
                console.error('Sentinel Tracking Error:', err.message);
            }
        }
    };

    // Initialize Security Scan & Tracking
    window.addEventListener('load', () => {
        securitySentinel.logVisitor();
        setTimeout(() => {
            securitySentinel.showStatus('SKR-Sentinel: System Secure & Monitoring Active', 'success');
        }, 3000);
    });

    // 🌟 Contact Form Handling (Enhanced with Security Bot)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Security Bot Check
            if (securitySentinel.scanInput(message) || securitySentinel.scanInput(firstName)) {
                securitySentinel.showStatus('Hack Attempt Blocked! Malicious patterns detected.', 'danger');
                console.warn('Security Alert: Malicious input blocked.');
                return;
            }

            if (email && message) {
                const submitBtnElement = document.querySelector('.submit-btn');
                const btnSpan = submitBtnElement.querySelector('span');
                const originalText = btnSpan.textContent;

                btnSpan.textContent = 'Transmitting...';
                submitBtnElement.disabled = true;

                // Prepare data for Formspree
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        formStatus.textContent = "Message transmitted securely! I will get back to you soon.";
                        formStatus.style.color = "var(--primary-color)";
                        contactForm.reset();
                        securitySentinel.showStatus('Transmission Successful', 'success');
                    } else {
                        throw new Error('Transmission Failed');
                    }
                }).catch(error => {
                    formStatus.textContent = "Transmission failed. Error: " + error.message;
                    formStatus.style.color = "#ff4444";
                    securitySentinel.showStatus('Transmission Error', 'danger');
                }).finally(() => {
                    btnSpan.textContent = originalText;
                    submitBtnElement.disabled = false;
                });
            }
        });
    }

    // 🌟 Console "Decoy" and protection (Keep it fun but not restrictive)
    (function () {
        const warningTitle = '🚀 LOOKING UNDER THE HOOD?';
        const warningMsg = 'Nice! Feel free to explore my code. If you have suggestions to make it even smoother, let me know!';
        console.log(`%c${warningTitle}`, 'color: #32e0c4; font-size: 24px; font-weight: bold;');
        console.log(`%c${warningMsg}`, 'font-size: 14px;');
    })();
});
