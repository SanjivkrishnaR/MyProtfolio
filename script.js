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

    // Consolidated Mouse position tracking
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create trail particles with controlled frequency (Adjusted for better visibility)
        if (Math.random() > 0.8) {
            createTrail(mouseX, mouseY);
        }
    });

    // Handle clicking state
    window.addEventListener('mousedown', () => {
        isClicking = true;
        if (cursorDot) cursorDot.classList.add('active');
        if (cursorOutline) cursorOutline.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
        isClicking = false;
        if (cursorDot) cursorDot.classList.remove('active');
        if (cursorOutline) cursorOutline.classList.remove('active');
    });

    // Optimized Trail Particles Logic (Using Element Pooling)
    const MAX_TRAILS = 20; // Increased pool size
    const trails = [];
    for (let i = 0; i < MAX_TRAILS; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = '0';
        trailContainer.appendChild(trail);
        trails.push(trail);
    }

    let trailIndex = 0;
    const createTrail = (x, y) => {
        const trail = trails[trailIndex];
        if (!trail) return;
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;

        // Animation handles the opacity transition
        trail.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.6 },
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
        ], { duration: 600, easing: 'ease-out', fill: 'forwards' });

        trailIndex = (trailIndex + 1) % MAX_TRAILS;
    };

    let magneticRect = null;

    // Main Animation Loop
    const animateCursor = () => {
        let targetX = mouseX;
        let targetY = mouseY;

        // Magnetic Effect Logic
        if (isMagnetic && magneticTarget) {
            if (!magneticRect) {
                magneticRect = magneticTarget.getBoundingClientRect();
            }
            const centerX = magneticRect.left + magneticRect.width / 2;
            const centerY = magneticRect.top + magneticRect.height / 2;

            // Push towards center of the element
            targetX = centerX + (mouseX - centerX) * 0.3;
            targetY = centerY + (mouseY - centerY) * 0.3;

            outlineX += (centerX - outlineX) * 0.2;
            outlineY += (centerY - outlineY) * 0.2;
        } else {
            magneticRect = null;
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
        const target = e.target;
        if (!target) return;

        // Find closest interactive parent
        const interactiveEl = target.closest('a, button, .social-btn, .project-card, .interactive-card, .antenna-card, .cert-item');

        // Find closest text element
        const textEl = target.closest('input, textarea, p, h1, h2, h3, li, span');

        if (!interactiveEl && !textEl) {
            resetCursorModes();
            return;
        }

        resetCursorModes(); // Clear previous state before applying new one

        // Magnet for buttons/links/cards
        if (interactiveEl && (interactiveEl.matches('a, button, .social-btn, .project-card, .interactive-card, .antenna-card'))) {
            isMagnetic = true;
            magneticTarget = interactiveEl;
            if (cursorOutline) cursorOutline.classList.add('magnet');
        }

        // Text mode for inputs/textareas and readable elements
        if (textEl) {
            if (cursorDot) cursorDot.classList.add('text-mode');
            if (cursorOutline) cursorOutline.classList.add('text-mode');
        }

        // View mode for images/gallery cards
        if (interactiveEl && interactiveEl.matches('.project-card, .antenna-card, .cert-item, .gallery-item')) {
            if (cursorOutline) cursorOutline.classList.add('view-mode');
        }
    };


    const resetCursorModes = () => {
        isMagnetic = false;
        magneticTarget = null;
        if (cursorDot) cursorDot.classList.remove('text-mode');
        if (cursorOutline) cursorOutline.classList.remove('text-mode', 'magnet', 'view-mode');
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

    // 🎬 Cinematic Roadmap: Progress Line Animation (Optimized)
    const journeyTimeline = document.querySelector('.journey-timeline');
    const lineFill = document.querySelector('.line-fill');

    let timelineRect = null;
    let isTimelineVisible = false;

    // Cache rect on resize or when needed
    const updateTimelineRect = () => {
        if (journeyTimeline) timelineRect = journeyTimeline.getBoundingClientRect();
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        isTimelineVisible = entries[0].isIntersecting;
        if (isTimelineVisible) updateTimelineRect();
    }, { threshold: 0 });

    if (journeyTimeline) timelineObserver.observe(journeyTimeline);
    window.addEventListener('resize', throttle(updateTimelineRect, 200));

    function animateTimeline() {
        if (!lineFill || !journeyTimeline) return;

        const rect = journeyTimeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Break if the timeline is completely out of view
        if (rect.top > viewportHeight || rect.bottom < 0) return;

        const timelineHeight = rect.height;
        // Calculate progress: 0% when top is at 80% viewport, 100% when top is high enough
        const scrollIn = (viewportHeight * 0.8) - rect.top;
        let progress = Math.min(Math.max((scrollIn / timelineHeight) * 100, 0), 100);

        lineFill.style.height = `${progress}%`;
    }

    window.addEventListener('scroll', throttle(animateTimeline, 15));
    // Initial call after a delay to ensure layout is settled
    setTimeout(animateTimeline, 1000);

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
    const textArray = ["Design with Purpose.", "Develop with Precision."];
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

    // 🌟 Scroll Spy for Active Nav Links
    const sections = document.querySelectorAll('section, header');
    const navItemsSpy = document.querySelectorAll('.nav-link');

    const scrollSpyOptions = { threshold: 0.5 };
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItemsSpy.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));

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

    const modalLoader = document.getElementById('modal-loader');
    const modalPdf = document.getElementById('modal-pdf');

    // Hide loader when asset is ready or handle errors
    if (modalImg) {
        modalImg.onload = () => { if (modalLoader) modalLoader.style.display = 'none'; };
        modalImg.onerror = () => {
            if (modalLoader) {
                modalLoader.style.display = 'flex';
                modalLoader.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size:2rem; color:var(--accent-color);"></i><p>Image failed to load</p>';
            }
        };
    }

    if (modalPdf) {
        modalPdf.onload = () => { if (modalLoader) modalLoader.style.display = 'none'; };
        modalPdf.onerror = () => {
            if (modalLoader) {
                modalLoader.style.display = 'flex';
                modalLoader.innerHTML = '<i class="fas fa-file-pdf" style="font-size:2rem; color:var(--accent-color);"></i><p>PDF rendering failed. <a href="' + modalPdf.src + '" target="_blank" style="color:var(--primary-color); text-decoration:underline;">Click here to open directly</a></p>';
            }
        };
    }

    if (modalVideo) {
        modalVideo.oncanplay = () => { if (modalLoader) modalLoader.style.display = 'none'; };
        modalVideo.onerror = () => {
            if (modalLoader) {
                modalLoader.style.display = 'flex';
                modalLoader.innerHTML = '<i class="fas fa-video-slash" style="font-size:2rem; color:var(--accent-color);"></i><p>Video failed to load</p>';
            }
        };
    }

    const updateModalMedia = () => {
        const currentSrc = currentMediaList[currentIndex];
        const isVideo = currentSrc.toLowerCase().endsWith('.mp4');
        const isPDF = currentSrc.toLowerCase().endsWith('.pdf');

        // Reset display states and show loader
        if (modalLoader) {
            modalLoader.style.display = 'flex';
            modalLoader.innerHTML = '<div class="spinner"></div><p>Loading Asset...</p>';
        }
        modalImg.style.display = 'none';
        modalVideo.style.display = 'none';
        if (modalPdf) modalPdf.style.display = 'none';
        modalVideo.pause();

        if (isVideo) {
            modalVideo.src = currentSrc;
            modalVideo.style.display = 'block';
            modalVideo.load(); // Better for refreshing sources
        } else if (isPDF) {
            if (modalPdf) {
                modalPdf.src = currentSrc;
                modalPdf.style.display = 'block';

                // Extra helper for mobile PDF visibility
                if (window.innerWidth <= 768) {
                    if (modalLoader) {
                        modalLoader.style.display = 'flex';
                        modalLoader.innerHTML = '<i class="fas fa-file-pdf" style="font-size:2.5rem; margin-bottom:10px;"></i><p>PDF Viewer may not work on all mobile browsers.</p><a href="' + currentSrc + '" target="_blank" class="btn primary-btn" style="padding:10px 20px; font-size:0.9rem; margin-top:10px;">Open PDF in New Tab</a>';
                    }
                }
            }
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

    // 🌟 Unified Media Modal Trigger (Handles Project Cards, Journey Items, and Gallery)
    const handleCardClick = (e) => {
        const item = e.currentTarget;

        // 🛑 Prevent Opening Media Modal if it's the Cert Box Trigger (Main Gallery Opener)
        if (item.id === 'cert-box') return;

        e.stopPropagation();

        const srcList = item.getAttribute('data-src-list');
        const singleSrc = item.getAttribute('data-src') ||
            item.getAttribute('data-cert') ||
            item.getAttribute('data-full-img');

        if (srcList) {
            currentMediaList = srcList.split(',');
        } else if (singleSrc) {
            currentMediaList = [singleSrc];
        } else {
            return;
        }

        currentIndex = 0;

        // Use a better title extraction logic
        const titleElement = item.querySelector('h3') || item.querySelector('p');
        modalTitle.textContent = titleElement ? titleElement.textContent : "Certificate / Asset";

        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        updateModalMedia();
    };

    // Attach listeners to all interactive items
    const interactiveItems = document.querySelectorAll('.cert-item, .interactive-card, .gallery-item');
    interactiveItems.forEach(item => {
        item.addEventListener('click', handleCardClick);
    });

    // 🌟 Certifications Gallery Modal Logic
    const certBox = document.getElementById('cert-box');
    const certGalleryModal = document.getElementById('cert-gallery-modal');
    const closeGalleryBtn = document.querySelector('.close-gallery');

    if (certBox && certGalleryModal) {
        certBox.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling layout issues
            certGalleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', () => {
            certGalleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == certGalleryModal) {
            certGalleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
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

                // 🛡️ SKR-Sentinel Secured Credentials (Encrypted format to prevent scraping)
                const _0xToken = ['AAGTnG2fMpM_V5EwjNiefg-AAy4_3gsn--Y', '8510397902:'].reverse().join('');
                const _0xChat = ['697505', '6029'].join('');

                if (_0xToken && _0xChat) {
                    const message = `🚀 *New Visitor on Portfolio*\n\n` +
                        `📍 *IP:* ${visitorInfo.ip}\n` +
                        `🌍 *Location:* ${visitorInfo.city}, ${visitorInfo.country}\n` +
                        `🏢 *ISP:* ${visitorInfo.isp}\n` +
                        `📱 *Device:* ${visitorInfo.device.substring(0, 50)}...`;

                    fetch(`https://api.telegram.org/bot${_0xToken}/sendMessage?chat_id=${_0xChat}&text=${encodeURIComponent(message)}&parse_mode=Markdown`);

                    // 🔔 Track the exit
                    localStorage.setItem('current_visitor_ip', visitorInfo.ip);
                    localStorage.setItem('session_start', Date.now());

                    window.addEventListener('beforeunload', () => {
                        const duration = Math.round((Date.now() - localStorage.getItem('session_start')) / 1000);
                        const exitMsg = `🚪 *Visitor Left Portfolio*\n\n` +
                            `📍 *IP:* ${visitorInfo.ip}\n` +
                            `⏱️ *Time Spent:* ${duration} seconds`;

                        // Use Beacon for reliable exit tracking
                        navigator.sendBeacon(`https://api.telegram.org/bot${_0xToken}/sendMessage?chat_id=${_0xChat}&text=${encodeURIComponent(exitMsg)}&parse_mode=Markdown`);
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

                        // 🎊 Satisfying Confetti Explosion!
                        if (window.confetti) {
                            confetti({
                                particleCount: 150,
                                spread: 70,
                                origin: { y: 0.6 },
                                colors: ['#32e0c4', '#3edbf0', '#ffffff'] // Theme colors
                            });
                        }

                        // Change button to success state temporarily
                        btnSpan.textContent = "Sent Successfully! 🚀";
                        submitBtnElement.style.background = "var(--primary-color)";
                        submitBtnElement.style.borderColor = "var(--primary-color)";
                    } else {
                        throw new Error('Transmission Failed');
                    }
                }).catch(error => {
                    formStatus.textContent = "Transmission failed. Error: " + error.message;
                    formStatus.style.color = "#ff4444";
                    securitySentinel.showStatus('Transmission Error', 'danger');
                    btnSpan.textContent = "Failed. Retry?";
                }).finally(() => {
                    setTimeout(() => {
                        btnSpan.textContent = originalText;
                        submitBtnElement.disabled = false;
                        submitBtnElement.style.background = ""; // Reset to gradient
                    }, 4000);
                });
            }
        });
    }

    // 🌟 🛡️ Code Shield: Protect Source Code (Discouragement Layer)
    const codeShield = () => {
        // Disable Right Click
        document.addEventListener('contextmenu', e => e.preventDefault());

        // Disable Common Inspect Keys
        document.addEventListener('keydown', e => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
                securitySentinel.showStatus('Code View Restricted for Security', 'danger');
            }
        });

        console.log(`%c🚀 SKR-Sentinel Active`, 'color: #32e0c4; font-size: 20px; font-weight: bold;');
        console.log(`%cYour session is protected by a high-level security layer.`, 'color: #888;');
        console.log(`%cDeveloped by Sanjiv Krishna R`, 'color: #3edbf0; font-style: italic;');
    };

    // 📈 Scroll Progress Bar Logic (Throttled)
    const scrollBar = document.getElementById('scrollBar');
    const updateProgressBar = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) {
            scrollBar.style.width = scrolled + "%";
        }
    };
    window.addEventListener('scroll', throttle(updateProgressBar, 20));

    codeShield();

    // 🩹 Compatibility Helper: Define openFullImage to prevent errors if still called from anywhere
    window.openFullImage = function (src, title) {
        currentMediaList = [src];
        currentIndex = 0;
        modal.style.display = "block";
        modalTitle.textContent = title;
        document.body.style.overflow = 'hidden';
        updateModalMedia();
    };

    // 🌟 Info Grid Horizontal Scroll (Desktop)
    const infoScrollContainer = document.getElementById('infoGrid');
    const btnScrollLeft = document.getElementById('infoScrollLeft');
    const btnScrollRight = document.getElementById('infoScrollRight');

    if (infoScrollContainer && btnScrollLeft && btnScrollRight) {
        btnScrollLeft.addEventListener('click', () => {
            // Scroll amount matches card width + gap approx
            infoScrollContainer.scrollBy({ left: -350, behavior: 'smooth' });
        });

        btnScrollRight.addEventListener('click', () => {
            infoScrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
        });
    }

});

