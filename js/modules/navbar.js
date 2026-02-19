/**
 * Navbar Module - Senior Developer Edition 🎩
 * Handles scroll-linked animations, progress tracking, and header state
 */

export const initNavbar = () => {
    console.log("Navbar Module: Initialized with Senior grade logic");
    setupScrollInteractions();
};

const setupScrollInteractions = () => {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress-bar');
    
    if (!navbar || !progressBar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbarState(window.scrollY, navbar, progressBar);
                ticking = false;
            });
            ticking = true;
        }
    });
};

const updateNavbarState = (scrollY, navbar, progressBar) => {
    // 1. Header Shrink Logic
    if (scrollY > 50) {
        navbar.classList.add('navbar-shrunk');
    } else {
        navbar.classList.remove('navbar-shrunk');
    }

    // 2. Scroll Progress Calculation
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollY / windowHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${scrolled}%`;
    }
};
