// GSAP Configuration
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let tl = gsap.timeline();
let isLoading = true;

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const progressBar = document.querySelector('.progress-bar');
const contactForm = document.getElementById('contactForm');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeSkillBars();
    setupResponsiveAnimations();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Progress bar
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// GSAP Animations
function initializeAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-greeting', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        })
        .from('.hero-name', {
            duration: 1.2,
            y: 80,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3")
        .from('.hero-tags .tag', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2")
        .from('.hero-buttons .btn', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.3")
        .from('.code-simulation', {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.code-line', {
            duration: 0.6,
            x: -50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");

    // Scroll-triggered animations
    setupScrollTriggerAnimations();
}

function setupScrollTriggerAnimations() {
    // GTA 6 Style - More subtle entrance
    gsap.set('section:not(#home)', { scale: 0.9, opacity: 0, y: 50 });
    
    // Hero section is always visible
    gsap.set('#home', { scale: 1, opacity: 1 });
    
    // About section - GTA 6 style smooth zoom in
    gsap.fromTo('#about', {
        scale: 0.9,
        opacity: 0,
        y: 50
    }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            scrub: 0.5
        }
    });

    // About content animations - more subtle
    gsap.fromTo('.about-paragraph', {
        y: 60,
        opacity: 0,
        scale: 0.95
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.about-stats .stat', {
        y: 80,
        opacity: 0,
        scale: 0.8
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Skills section - smooth zoom in
    gsap.fromTo('#skills', {
        scale: 0.9,
        opacity: 0,
        y: 50
    }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            scrub: 0.5
        }
    });

    // Skills cards with subtle entrance
    gsap.fromTo('.skill-card', {
        y: 100,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Projects section - smooth zoom in
    gsap.fromTo('#projects', {
        scale: 0.9,
        opacity: 0,
        y: 50
    }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            scrub: 0.5
        }
    });

    // Projects cards with smooth entrance
    gsap.fromTo('.project-card', {
        y: 120,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Contact section - smooth zoom in
    gsap.fromTo('#contact', {
        scale: 0.9,
        opacity: 0,
        y: 50
    }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            scrub: 0.5
        }
    });

    // Contact content animations - smooth and subtle
    gsap.fromTo('.contact-info', {
        x: -80,
        opacity: 0,
        scale: 0.95
    }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.social-networks', {
        x: 80,
        opacity: 0,
        scale: 0.95
    }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Social cards with smooth entrance
    gsap.fromTo('.social-card', {
        y: 60,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.social-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Section titles with smooth entrance
    gsap.fromTo('.section-title', {
        y: 50,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.section-line', {
        scaleX: 0,
        opacity: 0
    }, {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.section-line',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress .progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        gsap.fromTo(bar, {
            width: '0%'
        }, {
            width: width + '%',
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Form handling - Removed since contact form was replaced with social networks
function initializeFormHandling() {
    // No form handling needed for social networks section
    console.log('Social networks section initialized');
}

// Responsive animations
function setupResponsiveAnimations() {
    // Adjust animations for mobile devices
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Simplify animations for mobile
        gsap.globalTimeline.timeScale(1.5);
        
        // Reduce stagger delays
        ScrollTrigger.batch(".skill-card", {
            onEnter: elements => gsap.fromTo(elements, 
                {y: 50, opacity: 0}, 
                {y: 0, opacity: 1, duration: 0.8, stagger: 0.1}
            ),
            onLeave: elements => gsap.to(elements, {opacity: 0, y: -50, duration: 0.3}),
            onEnterBack: elements => gsap.to(elements, {opacity: 1, y: 0, duration: 0.3}),
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function optimizeAnimations() {
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Smooth scrolling is handled by browser's scrollIntoView API

// Preloader (optional)
window.addEventListener('load', () => {
    isLoading = false;
    document.body.classList.add('loaded');
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Add cursor effects for desktop
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 255, 136, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
📱 Responsive Design: ✓
🎨 GSAP Animations: ✓
⚡ Performance Optimized: ✓
🎯 GTA 6 Inspired Style: ✓

Built with HTML5, CSS3, JavaScript & GSAP
`);
