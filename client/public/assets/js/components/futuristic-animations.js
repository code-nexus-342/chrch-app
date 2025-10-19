/**
 * Futuristic Animations for ATG Chapel Digital Sanctuary
 * Provides modern, futuristic UI animations to enhance the digital experience
 */
class FuturisticAnimations {
  constructor() {
    // Initialize animations when class is instantiated
    this.init();
  }

  init() {
    // Start animations when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.initParticleWaves();
      this.initHolyGlow();
      this.initFloatingElements();
      this.initPageTransitions();
      this.initTextReveal();
      this.initCardAnimations();
      this.initImageRippleEffect();
    });
  }

  /**
   * Creates floating wave particles for sections with class 'wave-particles'
   */
  initParticleWaves() {
    const waveContainers = document.querySelectorAll('.wave-particles');
    if (waveContainers.length === 0) return;

    waveContainers.forEach(container => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.className = 'wave-particles-canvas';
      
      // Style and append canvas
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      
      // Make container position relative if not already
      const containerPosition = window.getComputedStyle(container).position;
      if (containerPosition === 'static') {
        container.style.position = 'relative';
      }
      
      container.prepend(canvas);
      
      // Get container dimensions
      const resize = () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();
      
      // Create particle waves
      const particleCount = Math.floor(canvas.width / 15);
      const particles = [];
      
      // Get theme colors
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDark ? '#E2C07C' : '#5643CC';
      const opacity = isDark ? 0.3 : 0.2;
      
      // Generate particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * opacity + 0.05
        });
      }
      
      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
          // Wave motion
          particle.x += particle.speedX;
          particle.y += particle.speedY + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particleColor;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
        });
        
        // Draw connecting lines between nearby particles
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
    });
  }

  /**
   * Creates a subtle pulsing glow effect for elements with class 'holy-glow'
   */
  initHolyGlow() {
    const glowElements = document.querySelectorAll('.holy-glow');
    if (glowElements.length === 0) return;

    glowElements.forEach(element => {
      // Create glow container
      const glowContainer = document.createElement('div');
      glowContainer.className = 'holy-glow-container';
      
      // Style the container
      glowContainer.style.position = 'absolute';
      glowContainer.style.top = '0';
      glowContainer.style.left = '0';
      glowContainer.style.width = '100%';
      glowContainer.style.height = '100%';
      glowContainer.style.pointerEvents = 'none';
      glowContainer.style.zIndex = '0';
      
      // Create the glow element
      const glowElement = document.createElement('div');
      glowElement.className = 'holy-glow-effect';
      
      // Style the glow
      glowElement.style.position = 'absolute';
      glowElement.style.borderRadius = '50%';
      glowElement.style.filter = 'blur(20px)';
      glowElement.style.background = 'radial-gradient(circle, rgba(226,192,124,0.8) 0%, rgba(226,192,124,0) 70%)';
      glowElement.style.width = '150px';
      glowElement.style.height = '150px';
      glowElement.style.transform = 'translate(-50%, -50%)';
      glowElement.style.opacity = '0.7';
      glowElement.style.mixBlendMode = 'screen';
      
      // Add to DOM
      glowContainer.appendChild(glowElement);
      
      // Make container position relative if not already
      const elementPosition = window.getComputedStyle(element).position;
      if (elementPosition === 'static') {
        element.style.position = 'relative';
      }
      
      element.prepend(glowContainer);
      
      // Animate the glow
      const animateGlow = () => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Gentle circular motion
        const now = Date.now() * 0.001;
        const radius = Math.min(rect.width, rect.height) * 0.2;
        const x = centerX + Math.cos(now * 0.5) * radius;
        const y = centerY + Math.sin(now * 0.3) * radius;
        
        // Size pulsation
        const size = 150 + Math.sin(now) * 30;
        
        glowElement.style.left = `${x}px`;
        glowElement.style.top = `${y}px`;
        glowElement.style.width = `${size}px`;
        glowElement.style.height = `${size}px`;
        glowElement.style.opacity = 0.5 + Math.sin(now * 0.7) * 0.2;
        
        requestAnimationFrame(animateGlow);
      };
      
      animateGlow();
    });
  }

  /**
   * Adds subtle floating animation to elements with class 'float'
   */
  initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float');
    if (floatingElements.length === 0) return;

    floatingElements.forEach((element, index) => {
      // Generate different animation parameters for each element
      const duration = 3 + Math.random() * 2;
      const delay = index * 0.2;
      const offsetY = 8 + Math.random() * 6;
      
      // Apply floating animation
      element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
      
      // Add keyframes if they don't exist yet
      if (!document.querySelector('#floating-keyframes')) {
        const style = document.createElement('style');
        style.id = 'floating-keyframes';
        style.textContent = `
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-${offsetY}px); }
            100% { transform: translateY(0px); }
          }
        `;
        document.head.appendChild(style);
      }
    });
  }

  /**
   * Adds page transition animations
   */
  initPageTransitions() {
    // Don't add transitions if they're already handled by a framework
    if (document.querySelector('.page-transition')) return;

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#000';
    overlay.style.zIndex = '9999';
    overlay.style.transform = 'translateY(100%)';
    overlay.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    // Add listener to all internal links
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="http://'+window.location.host+'"], a[href^="https://'+window.location.host+'"]').forEach(link => {
      // Skip links with no-transition class or # links
      if (link.classList.contains('no-transition') || link.getAttribute('href').startsWith('#')) return;
      
      link.addEventListener('click', e => {
        const target = link.getAttribute('href');
        
        // Don't transition on modifier keys or non-left clicks
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.which !== 1) return;
        
        e.preventDefault();
        
        // Trigger transition animation
        overlay.style.transform = 'translateY(0)';
        
        // Navigate after animation
        setTimeout(() => {
          window.location.href = target;
        }, 600);
      });
    });

    // Hide overlay on page load
    window.addEventListener('pageshow', () => {
      overlay.style.transform = 'translateY(100%)';
    });
  }

  /**
   * Adds text reveal animations to elements with class 'reveal-text'
   */
  initTextReveal() {
    const revealElements = document.querySelectorAll('.reveal-text');
    if (revealElements.length === 0) return;

    // Create intersection observer to trigger animations when elements come into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Function to animate text
    const animateText = (element) => {
      const text = element.textContent;
      element.textContent = '';
      
      // Split text by words
      const words = text.split(' ');
      
      // Create word spans
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(20px)';
        wordSpan.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        wordSpan.style.transitionDelay = `${wordIndex * 0.05}s`;
        
        // Split word into characters
        const chars = word.split('');
        chars.forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });
        
        element.appendChild(wordSpan);
        element.appendChild(document.createTextNode(' '));
      });
      
      // Trigger animation after a small delay
      setTimeout(() => {
        Array.from(element.children).forEach(wordSpan => {
          if (wordSpan.style) {
            wordSpan.style.opacity = '1';
            wordSpan.style.transform = 'translateY(0)';
          }
        });
      }, 50);
    };
    
    // Observe all elements
    revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Adds hover and interaction animations to cards with class 'animated-card'
   */
  initCardAnimations() {
    const cards = document.querySelectorAll('.animated-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
      // 3D hover effect
      card.addEventListener('mousemove', e => {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.1s ease';
      });
      
      // Reset position on mouse leave
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });
      
      // Add click animation
      card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  /**
   * Creates ripple effect on images with class 'ripple-effect'
   */
  initImageRippleEffect() {
    const images = document.querySelectorAll('.ripple-effect');
    if (images.length === 0) return;

    images.forEach(img => {
      img.addEventListener('click', e => {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'img-ripple';
        
        // Style the ripple
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.8s linear';
        ripple.style.pointerEvents = 'none';
        
        // Position ripple where clicked
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Make container position relative if not already
        const imgPosition = window.getComputedStyle(img).position;
        if (imgPosition === 'static') {
          img.style.position = 'relative';
        }
        
        // Add ripple to image
        img.appendChild(ripple);
        
        // Add keyframes if they don't exist yet
        if (!document.querySelector('#ripple-keyframes')) {
          const style = document.createElement('style');
          style.id = 'ripple-keyframes';
          style.textContent = `
            @keyframes ripple {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 800);
      });
    });
  }
}

// Create global instance
window.futuristicAnimations = new FuturisticAnimations();