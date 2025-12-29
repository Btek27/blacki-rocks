// ================================
// THEME TOGGLE
// ================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ================================
// SMOOTH SCROLLING & ACTIVE NAV
// ================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll on nav link click
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

// ================================
// ACCORDION FUNCTIONALITY
// ================================

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordion = header.parentElement;
        const isActive = accordion.classList.contains('active');
        
        // Close all accordions
        document.querySelectorAll('.project-accordion').forEach(acc => {
            acc.classList.remove('active');
        });
        
        // Open clicked accordion if it wasn't active
        if (!isActive) {
            accordion.classList.add('active');
        }
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to skill categories and project accordions
document.querySelectorAll('.skill-category, .project-accordion').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// HERO CTA BUTTON ANIMATIONS
// ================================

const ctaButtons = document.querySelectorAll('.hero-cta .btn-primary, .hero-cta .btn-secondary');

ctaButtons.forEach((button, index) => {
    button.style.opacity = '0';
    button.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        button.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background-color 0.3s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
    }, 300 + (index * 100));
});

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ================================
// TYPING EFFECT FOR HERO TITLE (Optional)
// ================================

// Uncomment if you want a typing effect for the name
/*
const nameElement = document.querySelector('.name');
if (nameElement) {
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid var(--accent-primary)';
    nameElement.style.paddingRight = '5px';
    
    let charIndex = 0;
    const typingSpeed = 100;
    
    function typeText() {
        if (charIndex < nameText.length) {
            nameElement.textContent += nameText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(() => {
                nameElement.style.borderRight = 'none';
            }, 500);
        }
    }
    
    setTimeout(typeText, 500);
}
*/

console.log('Portfolio website loaded successfully!');

