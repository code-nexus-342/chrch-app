/**
 * Adaptive Navigation System
 * ATG Chapel - Divine Digital Sanctuary
 * October 2025
 * React-Compatible Version
 */

(function() {
    'use strict';
    
    // Function to initialize nav adaptive features
    function initNavAdaptive() {
        // Get the header element - with null check for React
        const header = document.getElementById('header');
        
        // Exit early if header doesn't exist (React hasn't mounted yet)
        if (!header) {
            console.log('Header not found, skipping nav-adaptive initialization');
            return;
        }
        
        // Check if we're on a page that needs specific navbar styling
        const body = document.body;
        
        // Apply appropriate navbar class based on page class
        if (body && (body.classList.contains('bible-page') || 
            body.classList.contains('mission-page') || 
            body.classList.contains('events-page') || 
            body.classList.contains('community-page'))) {
            // These pages need the solid adaptive navbar
            if (header.classList.contains('glass')) {
                header.classList.remove('glass');
            }
            if (!header.classList.contains('adaptive-nav')) {
                header.classList.add('adaptive-nav');
            }
        }
        
        // Add scroll event to adjust navbar on scroll for any page type
        function handleScroll() {
            const header = document.getElementById('header');
            if (!header) return;
            
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Remove existing listener if any to prevent duplicates
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);

        // Initial check for scroll position
        handleScroll();
        
        // Handle theme changes and update navbar accordingly
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                // Small timeout to let theme change apply first
                setTimeout(() => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    // Additional theme-specific navbar adjustments could be added here
                    if (currentTheme) {
                        console.log('Theme changed to:', currentTheme);
                    }
                }, 100);
            });
        }
    }
    
    // Try to initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavAdaptive);
    } else {
        initNavAdaptive();
    }
    
    // Also try after a short delay for React mounting
    setTimeout(initNavAdaptive, 500);
    
    // Listen for React route changes (for SPA navigation)
    let lastPath = window.location.pathname;
    setInterval(() => {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            initNavAdaptive();
        }
    }, 1000);
})();