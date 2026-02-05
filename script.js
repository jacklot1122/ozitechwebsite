/**
 * OzisTech - Website JavaScript
 * Interactive features for the high-converting landing page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initStickyMobileCTA();
    initFAQ();
    initSmoothScroll();
    initFormValidation();
    initAnimations();
    initMobileOptimisations();
});

/**
 * Mobile-specific optimisations
 */
function initMobileOptimisations() {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Prevent 300ms delay on touch devices
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Close mobile menu on orientation change
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        if (menuBtn && navLinks) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
    
    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate sticky CTA visibility
            const stickyCTA = document.getElementById('sticky-cta');
            const hero = document.getElementById('hero');
            if (stickyCTA && hero) {
                const heroRect = hero.getBoundingClientRect();
                if (heroRect.bottom < 0) {
                    stickyCTA.classList.add('visible');
                }
            }
        }, 100);
    });
    
    // Improve scroll performance on mobile
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Navbar - Scroll behavior
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background change
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }
}

/**
 * Sticky Mobile CTA - Show after scrolling past hero
 */
function initStickyMobileCTA() {
    const stickyCTA = document.getElementById('sticky-cta');
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');

    if (stickyCTA && hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Show CTA when hero is not visible
                if (!entry.isIntersecting) {
                    stickyCTA.classList.add('visible');
                } else {
                    stickyCTA.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(hero);

        // Also hide when contact form is visible
        if (contact) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stickyCTA.classList.remove('visible');
                    }
                });
            }, {
                threshold: 0.3
            });

            contactObserver.observe(contact);
        }
    }
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });

            // Toggle current item
            item.classList.toggle('open');
        });
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Validation and Submission
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const business = form.querySelector('#business');
            const projectType = form.querySelector('#project-type');

            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.form-error').forEach(el => el.remove());
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            // Validate required fields
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            if (!business.value.trim()) {
                showError(business, 'Please enter your business name');
                isValid = false;
            }

            if (!projectType.value) {
                showError(projectType, 'Please select a project type');
                isValid = false;
            }

            if (isValid) {
                // Form is valid - submit to FormSubmit via AJAX
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon spinning" style="width: 20px; height: 20px;">
                        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32"></circle>
                    </svg>
                    Sending...
                `;
                submitBtn.disabled = true;
                
                // Submit via AJAX
                const formData = new FormData(form);
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    // Success
                    submitBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon" style="width: 20px; height: 20px;">
                            <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        Request Sent!
                    `;
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.innerHTML = `
                        <strong>Thanks for reaching out!</strong>
                        <p>We'll get back to you within 24 hours with a custom quote.</p>
                    `;
                    successMsg.style.cssText = 'background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 10px; padding: 1rem; margin-top: 1rem; text-align: center; color: #10b981;';
                    form.appendChild(successMsg);
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        if (successMsg.parentNode) successMsg.remove();
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'form-error-msg';
                    errorMsg.innerHTML = 'Something went wrong. Please try again or call us directly.';
                    errorMsg.style.cssText = 'background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 10px; padding: 1rem; margin-top: 1rem; text-align: center; color: #ef4444;';
                    form.appendChild(errorMsg);
                    
                    setTimeout(() => {
                        if (errorMsg.parentNode) errorMsg.remove();
                    }, 5000);
                });
            }
        });
    }

    function showError(input, message) {
        input.classList.add('error');
        input.style.borderColor = 'var(--error)';
        
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.style.color = 'var(--error)';
        errorEl.style.fontSize = '0.8rem';
        errorEl.style.marginTop = '4px';
        errorEl.textContent = message;
        
        input.parentNode.appendChild(errorEl);

        // Remove error on input
        input.addEventListener('input', function() {
            input.classList.remove('error');
            input.style.borderColor = '';
            const err = input.parentNode.querySelector('.form-error');
            if (err) err.remove();
        }, { once: true });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

/**
 * Scroll-triggered animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .why-item, .pricing-card, .testimonial-card, .process-step'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

/**
 * Portfolio image lazy loading fallback
 */
document.querySelectorAll('.portfolio-preview img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });

    img.addEventListener('error', function() {
        // Fallback already handled in HTML with onerror attribute
        this.style.opacity = '1';
    });

    // Initial state
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

/**
 * Track button clicks (for Meta Pixel integration)
 * In production, connect this to your actual Meta Pixel
 */
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const destination = this.getAttribute('href');

        // Log for debugging - replace with actual tracking
        console.log('Button clicked:', {
            text: buttonText,
            destination: destination,
            timestamp: new Date().toISOString()
        });

        // Meta Pixel tracking (uncomment when pixel is installed)
        // if (typeof fbq !== 'undefined') {
        //     if (buttonText.includes('Quote') || buttonText.includes('Started')) {
        //         fbq('track', 'Lead');
        //     } else if (buttonText.includes('Call')) {
        //         fbq('track', 'Schedule');
        //     }
        // }
    });
});

/**
 * Typing effect for hero headline (optional enhancement)
 */
function initTypingEffect() {
    const highlight = document.querySelector('.hero-headline .highlight');
    if (!highlight) return;

    const words = ['Ad Clicks', 'Traffic', 'Visitors'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isPaused) {
            setTimeout(type, 1500);
            isPaused = false;
            isDeleting = true;
            return;
        }

        if (isDeleting) {
            highlight.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            highlight.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            typeSpeed = 100;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 200;
        }

        setTimeout(type, typeSpeed);
    }

    // Uncomment to enable typing effect
    // setTimeout(type, 2000);
}

// Initialize typing effect (disabled by default)
// initTypingEffect();

/**
 * Hero Showcase Rotation
 */
function initHeroShowcase() {
    const images = document.querySelectorAll('.showcase-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}

initHeroShowcase();
