/**
 * Divine Digital Sanctuary
 * Core JavaScript for ATG Chapel immersive spiritual experience
 * React-Compatible Version
 */
(function() {
  "use strict";
  
  // Scripture verses collection for rotation
  const scriptureVerses = [
    {
      text: "The Lord is my light and my salvation; whom shall I fear?",
      reference: "Psalm 27:1"
    },
    {
      text: "For where two or three gather in my name, there am I with them.",
      reference: "Matthew 18:20"
    },
    {
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives.",
      reference: "John 14:27"
    },
    {
      text: "Be still, and know that I am God; I will be exalted among the nations.",
      reference: "Psalm 46:10"
    },
    {
      text: "For God so loved the world that he gave his one and only Son.",
      reference: "John 3:16"
    }
  ];

  // Initialize divine components
  function initDivineExperience() {
    console.log("Initializing Divine Digital Sanctuary experience...");
    
    // DOM elements - query after React mounts
    const divineHero = document.querySelector('.divine-hero');
    const audioToggle = document.querySelector('.audio-toggle');
    const scriptureElements = document.querySelectorAll('.animated-scripture');
    
    // Initialize particle effects for hero section
    if (divineHero) {
      // Check if particles already initialized
      if (!divineHero.querySelector('.particles-container')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        divineHero.prepend(particlesContainer);
        
        // Determine light or dark mode for particles
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDarkMode ? '#E2C07C' : '#3A2482';
        const particleOpacity = isDarkMode ? 0.7 : 0.4;
        
        // Initialize particles if class exists
        if (typeof DivineParticles !== 'undefined') {
          new DivineParticles('.particles-container', {
            particleColor: particleColor,
            particleOpacity: particleOpacity,
            particleSizeMin: 2,
            particleSizeMax: 5,
            particleSpeedFactor: 0.15,
            connectParticles: true
          });
        }
      }
    }
    
    // Initialize scripture animations
    if (scriptureElements.length > 0 && typeof ScriptureAnimation !== 'undefined') {
      scriptureElements.forEach(element => {
        new ScriptureAnimation(element, {
          delay: 1000,
          letterDelay: 80,
          fadeInSpeed: 800,
          showReference: true
        });
      });
    }
    
    // Set up ambient audio toggle functionality
    if (audioToggle) {
      setupAudioExperience(audioToggle);
    }
    
    // Initialize parallax scrolling for divine sections
    initParallaxEffects();
    
    // Initialize scripture of the day
    initScriptureOfTheDay();
    
    // Setup smooth scroll behavior for navigation
    initSmoothScrolling();
  }
  
  // Setup ambient worship audio experience
  function setupAudioExperience(audioToggle) {
    if (!audioToggle) return;
    
    let ambientAudio = null;
    let isPlaying = false;
    
    audioToggle.addEventListener('click', function() {
      if (!ambientAudio) {
        // Lazy-load audio on first click
        ambientAudio = new Audio('/assets/audio/ambient-worship.mp3');
        ambientAudio.volume = 0.2;
        ambientAudio.loop = true;
      }
      
      if (isPlaying) {
        ambientAudio.pause();
        audioToggle.innerHTML = '<i class="bi bi-volume-up"></i>';
        audioToggle.setAttribute('aria-label', 'Enable ambient worship music');
        isPlaying = false;
      } else {
        ambientAudio.play().catch(e => {
          console.log('Audio autoplay was prevented. User interaction is required.');
        });
        audioToggle.innerHTML = '<i class="bi bi-volume-mute"></i>';
        audioToggle.setAttribute('aria-label', 'Disable ambient worship music');
        isPlaying = true;
      }
    });
  }
  
  // Setup parallax scrolling effects
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    // Basic parallax function
    function handleParallax() {
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const windowTop = window.pageYOffset;
        const elementTop = element.getBoundingClientRect().top + windowTop;
        const distance = windowTop - elementTop;
        
        // Only apply effect when element is visible
        if (window.pageYOffset + window.innerHeight > elementTop && 
            windowTop < elementTop + element.offsetHeight) {
          element.style.transform = `translateY(${distance * speed}px)`;
        }
      });
    }
    
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('resize', handleParallax);
    handleParallax(); // Initialize on page load
  }
  
  // Implement Scripture of the Day
  function initScriptureOfTheDay() {
    const scriptureOfTheDay = document.querySelector('.scripture-of-the-day');
    if (!scriptureOfTheDay) return;
    
    // Get a "random" scripture based on the day of the year
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const scriptureIndex = dayOfYear % scriptureVerses.length;
    const todaysScripture = scriptureVerses[scriptureIndex];
    
    // Update the DOM
    scriptureOfTheDay.setAttribute('data-reference', todaysScripture.reference);
    scriptureOfTheDay.textContent = todaysScripture.text;
    
    // Initialize animation for it
    new ScriptureAnimation('.scripture-of-the-day', {
      delay: 1500,
      letterDelay: 60,
      showReference: true
    });
  }
  
  // Enhance smooth scrolling for navigation
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        
        if (!target) return;
        
        e.preventDefault();
        
        // Get scroll margin top value (for sticky headers)
        const scrollMarginTop = parseInt(getComputedStyle(target).scrollMarginTop) || 0;
        
        window.scrollTo({
          top: target.offsetTop - scrollMarginTop,
          behavior: 'smooth'
        });
        
        // Update URL without reload
        window.history.pushState(null, null, this.getAttribute('href'));
      });
    });
  }
  
  // Initialize theme toggle
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('divineTheme', newTheme);
      
      // Update particles color if they exist
      updateParticlesTheme(newTheme);
    });
    
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('divineTheme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }
  
  // Update particles when theme changes
  function updateParticlesTheme(theme) {
    // This would need to destroy and reinitialize particles with new colors
    // Implementation depends on how particles are integrated
    console.log('Theme changed to', theme);
  }
  
  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initDivineExperience();
      initThemeToggle();
    });
  } else {
    // DOM already loaded (React case)
    initDivineExperience();
    initThemeToggle();
  }
  
  // Also try after a delay for React mounting
  setTimeout(function() {
    initDivineExperience();
    initThemeToggle();
  }, 500);
  
  // Reinitialize on page load (for cache, history navigation, etc.)
  window.addEventListener('load', function() {
    // Ensure transitions don't fire on page load
    setTimeout(() => {
      if (document.body) {
        document.body.classList.add('divine-transitions-enabled');
      }
    }, 300);
  });
})();