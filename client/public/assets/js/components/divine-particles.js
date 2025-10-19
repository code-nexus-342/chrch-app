/**
 * Divine Light Particles
 * Creates a gentle particle animation suggesting divine presence
 */
class DivineParticles {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;
    
    // Default configuration
    this.options = {
      particleCount: options.particleCount || 50,
      particleColor: options.particleColor || '#E2C07C',
      particleOpacity: options.particleOpacity || 0.7,
      particleSizeMin: options.particleSizeMin || 2,
      particleSizeMax: options.particleSizeMax || 6,
      particleSpeedFactor: options.particleSpeedFactor || 0.2,
      connectParticles: options.connectParticles !== undefined ? options.connectParticles : true,
      connectDistance: options.connectDistance || 150,
      responsive: options.responsive || [
        {
          breakpoint: 768,
          options: { particleCount: 30 }
        },
        {
          breakpoint: 480,
          options: { particleCount: 15 }
        }
      ]
    };
    
    this.particles = [];
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.animationFrame = null;
    
    this.init();
  }
  
  // Initialize canvas and particles
  init() {
    // Set up canvas
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '1';
    this.canvas.style.pointerEvents = 'none';
    this.container.appendChild(this.canvas);
    
    // Create particles
    this.createParticles();
    
    // Start animation
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  // Create the particle objects
  createParticles() {
    // Clear existing particles
    this.particles = [];
    
    // Apply responsive adjustments
    const particleCount = this.getResponsiveValue('particleCount');
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const size = this.random(this.options.particleSizeMin, this.options.particleSizeMax);
      this.particles.push({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        size,
        originalSize: size,
        directionX: this.random(-1, 1),
        directionY: this.random(-1, 1),
        speed: this.random(1, 3) * this.options.particleSpeedFactor,
        color: this.options.particleColor,
        opacity: this.random(0.3, this.options.particleOpacity)
      });
    }
  }
  
  // Animation loop
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateParticles();
    
    if (this.options.connectParticles) {
      this.connectParticles();
    }
    
    this.drawParticles();
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }
  
  // Update particle positions
  updateParticles() {
    for (let particle of this.particles) {
      // Move particles
      particle.x += particle.directionX * particle.speed;
      particle.y += particle.directionY * particle.speed;
      
      // Change size slightly for subtle pulsing effect
      particle.size = particle.originalSize + Math.sin(Date.now() * 0.01 * particle.speed) * 0.5;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.width) {
        particle.directionX *= -1;
      }
      
      if (particle.y < 0 || particle.y > this.height) {
        particle.directionY *= -1;
      }
      
      // Gradually reset to center if too far out (creates center focus)
      if (particle.x > this.width + 20 || particle.x < -20) {
        particle.x = this.random(0, this.width);
      }
      
      if (particle.y > this.height + 20 || particle.y < -20) {
        particle.y = this.random(0, this.height);
      }
    }
  }
  
  // Draw particles on canvas
  drawParticles() {
    for (let particle of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.opacity})`;
      this.ctx.fill();
    }
  }
  
  // Connect particles with lines
  connectParticles() {
    const connectDistance = this.getResponsiveValue('connectDistance');
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= connectDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / connectDistance);
          
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${this.hexToRgb(this.options.particleColor)}, ${opacity * 0.3})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  // Handle window resize
  handleResize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.createParticles();
  }
  
  // Utility: Generate random number between min and max
  random(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Utility: Convert hex to rgb
  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255';
  }
  
  // Get responsive value based on current screen width
  getResponsiveValue(property) {
    const windowWidth = window.innerWidth;
    let value = this.options[property];
    
    if (this.options.responsive) {
      for (const responsive of this.options.responsive) {
        if (windowWidth <= responsive.breakpoint && responsive.options[property] !== undefined) {
          value = responsive.options[property];
        }
      }
    }
    
    return value;
  }
  
  // Public: Destroy animation and clean up
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

// Export to global scope
window.DivineParticles = DivineParticles;