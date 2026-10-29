// script.js - Interactive Controls & Theme Management

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Theme Toggle Icon Sync
    // ==========================================================================
    const isLightOnLoad = document.documentElement.getAttribute('data-theme') === 'light';
    const initialIcon = document.querySelector('#theme-toggle i');
    if (initialIcon) {
        initialIcon.className = isLightOnLoad ? 'ph ph-moon' : 'ph ph-sun';
    }

    // ==========================================================================
    // 2. Mobile Navigation Toggle
    // ==========================================================================
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileToggleBtn && navLinksContainer) {
        mobileToggleBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            const icon = mobileToggleBtn.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('open')) {
                    icon.className = 'ph ph-x';
                } else {
                    icon.className = 'ph ph-list';
                }
            }
        });

        // Close mobile menu when a nav link is clicked
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                const icon = mobileToggleBtn.querySelector('i');
                if (icon) icon.className = 'ph ph-list';
            });
        });
    }

    // ==========================================================================
    // 3. Scroll Progress & Sticky Navbar Effect
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Sticky Navbar shadow
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollTop > 40);
        }

        // Scroll Progress Bar
        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }

        // Active Navigation Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ==========================================================================
    // 4. Smooth Scroll Reveal Animations
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    function triggerReveals() {
        const windowHeight = window.innerHeight;
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.92) {
                el.style.transitionDelay = `${(index % 3) * 0.08}s`;
                el.classList.add('active');
            }
        });
    }

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '100px 0px 50px 0px'
        });

        revealElements.forEach((el, index) => {
            el.style.transitionDelay = `${(index % 3) * 0.08}s`;
            revealObserver.observe(el);
        });
    }

    // Trigger initial check immediately
    triggerReveals();
    window.addEventListener('scroll', triggerReveals, { passive: true });

    // ==========================================================================
    // 5. Interactive Custom Cursor
    // ==========================================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            cursorDot.style.left = `${clientX}px`;
            cursorDot.style.top = `${clientY}px`;

            cursorOutline.style.left = `${clientX}px`;
            cursorOutline.style.top = `${clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .bento-card, .pillar-card, .method-card, .case-card, .endorsement-card, .tech-item');
        interactiveElements.forEach(item => {
            item.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            item.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    }

    // ==========================================================================
    // 6. Vanilla Tilt 3D Hover Effects
    // ==========================================================================
    if (typeof VanillaTilt !== 'undefined' && window.innerWidth > 1024) {
        VanillaTilt.init(document.querySelectorAll('.bento-card, .pillar-card, .method-card, .endorsement-card'), {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.08,
            scale: 1.01
        });
    }
});
