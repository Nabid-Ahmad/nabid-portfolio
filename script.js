// script.js

// Navbar scrolled effect
window.addEventListener("scroll", function() {
    let navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// Update active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }

    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
    revealObserver.observe(el);
});

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.innerWidth > 1024) {
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    const hoverElements = document.querySelectorAll('a, button, .bento-box, .service-card-modern, .showcase-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovering');
        });
    });
}

// --- Initialize Vanilla Tilt 3D Effects ---
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".bento-box, .service-card-modern, .showcase-item"), {
        max: 3,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
    });
}

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    let isLightMode = localStorage.getItem('theme') === 'light';

    function updateTheme() {
        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        }
    }

    // Initialize theme from storage
    updateTheme();

    themeToggleBtn.addEventListener('click', () => {
        isLightMode = !isLightMode;
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        updateTheme();
    });
}

// --- Project Details Modal Logic ---
const modal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const showcaseItems = document.querySelectorAll('.showcase-item');

if (modal && closeModalBtn) {
    // Open Modal
    showcaseItems.forEach(item => {
        // Find the view button and the item image as click triggers
        const triggers = item.querySelectorAll('.view-btn, .item-img');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get data from the clicked item
                const imgSrc = item.querySelector('img').src;
                const cat = item.querySelector('.item-cat').textContent;
                const year = item.querySelector('.item-year').textContent;
                const title = item.querySelector('h3').textContent;
                const desc = item.querySelector('p').textContent;
                const tagsHTML = item.querySelector('.project-tags').innerHTML;
                
                // Inject into modal
                document.getElementById('modalImg').src = imgSrc;
                document.getElementById('modalCat').textContent = cat;
                document.getElementById('modalYear').textContent = year;
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDesc').textContent = desc;
                document.getElementById('modalTags').innerHTML = tagsHTML;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
