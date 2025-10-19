/**
 * Divine Parallax Effect
 * Creates dynamic 3D parallax effects for backgrounds and elements
 */
class DivineParallax {
  constructor() {
    // Initialize parallax effects
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // Find all elements with data-parallax attribute
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      const parallaxBackgrounds = document.querySelectorAll('[data-parallax-bg]');
      
      // Initialize elements with parallax effect
      if (parallaxElements.length > 0) {
        this.setupElementParallax(parallaxElements);
      }
      
      // Initialize backgrounds with parallax effect
      if (parallaxBackgrounds.length > 0) {
        this.setupBackgroundParallax(parallaxBackgrounds);
      }
    });
  }

  /**
   * Setup parallax effect for regular elements
   * @param {NodeList} elements - Elements with data-parallax attribute
   */
  setupElementParallax(elements) {
    elements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.2;
      
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        const windowHeight = window.innerHeight;
        
        // Only apply effect when element is in viewport
        if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + element.offsetHeight) {
          const offset = (scrollTop - elementTop) * speed;
          element.style.transform = `translateY(${offset}px)`;
        }
      });
    });
  }

  /**
   * Setup parallax effect for background images
   * @param {NodeList} elements - Elements with data-parallax-bg attribute
   */
  setupBackgroundParallax(elements) {
    elements.forEach(element => {
      const speed = parseFloat(element.dataset.parallaxBg) || 0.5;
      const initialBgPos = window.getComputedStyle(element).backgroundPosition;
      
      // Store initial background position values
      let initialX = 50;
      let initialY = 50;
      
      if (initialBgPos) {
        const [x, y] = initialBgPos.split(' ').map(val => {
          if (val.includes('%')) {
            return parseFloat(val);
          }
          return 50; // Default to 50% if not percentage
        });
        
        initialX = x;
        initialY = y;
      }
      
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + scrollTop;
        const windowHeight = window.innerHeight;
        
        // Only apply effect when element is in viewport
        if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementRect.height) {
          const yPos = initialY + ((scrollTop - elementTop) * speed / 10);
          element.style.backgroundPosition = `${initialX}% ${yPos}%`;
        }
      });
    });
  }
}

// Create global instance
window.divineParallax = new DivineParallax();