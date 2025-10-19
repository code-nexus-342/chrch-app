/**
 * Divine Scripture Animation
 * Animates scripture text with a typewriter-like effect
 */
class ScriptureAnimation {
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);
    if (!this.element) return;
    
    // Default options
    this.options = {
      delay: options.delay || 2000,            // Delay before animation starts
      letterDelay: options.letterDelay || 60,  // Delay between each letter
      fadeInSpeed: options.fadeInSpeed || 800, // Speed of letter fade in
      showReference: options.showReference !== undefined ? options.showReference : true,
      onComplete: options.onComplete || null,  // Callback when animation completes
      loop: options.loop || false,             // Loop the animation
      loopDelay: options.loopDelay || 8000,    // Delay between loops
      initialVisible: options.initialVisible || false // Whether text is visible before animation
    };
    
    this.text = this.element.textContent;
    this.reference = this.element.getAttribute('data-reference');
    this.isAnimating = false;
    this.timeouts = [];
    
    this.init();
  }
  
  init() {
    // Clear original text content
    this.element.textContent = '';
    this.element.classList.add('animated-scripture');
    
    // Create container for letters
    this.lettersContainer = document.createElement('span');
    this.lettersContainer.classList.add('scripture-text');
    this.element.appendChild(this.lettersContainer);
    
    // Create scripture reference element if needed
    if (this.options.showReference && this.reference) {
      this.referenceElement = document.createElement('span');
      this.referenceElement.classList.add('scripture-reference');
      this.referenceElement.textContent = this.reference;
      this.referenceElement.style.opacity = this.options.initialVisible ? '1' : '0';
      this.element.appendChild(this.referenceElement);
    }
    
    // Split text into letters
    this.letters = this.text.split('');
    
    // If initially visible, show all letters immediately
    if (this.options.initialVisible) {
      this.showAllLetters();
    } else {
      // Start animation with delay
      const timeout = setTimeout(() => this.animate(), this.options.delay);
      this.timeouts.push(timeout);
    }
  }
  
  // Show all letters at once (no animation)
  showAllLetters() {
    this.lettersContainer.innerHTML = '';
    
    this.letters.forEach(letter => {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letter');
      letterSpan.textContent = letter;
      letterSpan.style.opacity = '1';
      letterSpan.style.transform = 'translateY(0)';
      this.lettersContainer.appendChild(letterSpan);
    });
    
    if (this.referenceElement) {
      this.referenceElement.style.opacity = '1';
    }
  }
  
  // Reset animation
  reset() {
    this.lettersContainer.innerHTML = '';
    
    if (this.referenceElement) {
      this.referenceElement.style.opacity = '0';
    }
  }
  
  // Animate letters appearing
  animate() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.reset();
    
    // Add each letter with sequential animation
    this.letters.forEach((letter, index) => {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letter');
      letterSpan.textContent = letter;
      letterSpan.style.opacity = '0';
      letterSpan.style.transform = 'translateY(20px)';
      letterSpan.style.transition = `opacity ${this.options.fadeInSpeed}ms ease, transform ${this.options.fadeInSpeed}ms ease`;
      this.lettersContainer.appendChild(letterSpan);
      
      // Animate each letter with delay
      const timeout = setTimeout(() => {
        letterSpan.style.opacity = '1';
        letterSpan.style.transform = 'translateY(0)';
        
        // When last letter is animated
        if (index === this.letters.length - 1) {
          // Show reference after all letters appear
          if (this.referenceElement) {
            const referenceTimeout = setTimeout(() => {
              this.referenceElement.style.opacity = '1';
              this.isAnimating = false;
              
              if (this.options.onComplete) {
                this.options.onComplete();
              }
              
              // Set up loop if enabled
              if (this.options.loop) {
                const loopTimeout = setTimeout(() => {
                  this.animate();
                }, this.options.loopDelay);
                this.timeouts.push(loopTimeout);
              }
            }, this.options.fadeInSpeed);
            this.timeouts.push(referenceTimeout);
          } else {
            this.isAnimating = false;
            if (this.options.onComplete) {
              this.options.onComplete();
            }
            
            // Set up loop if enabled
            if (this.options.loop) {
              const loopTimeout = setTimeout(() => {
                this.animate();
              }, this.options.loopDelay);
              this.timeouts.push(loopTimeout);
            }
          }
        }
      }, this.options.letterDelay * index);
      
      this.timeouts.push(timeout);
    });
  }
  
  // Change the text and optionally restart animation
  changeText(newText, newReference, restart = true) {
    this.text = newText;
    this.letters = newText.split('');
    
    if (newReference && this.options.showReference) {
      this.reference = newReference;
      if (this.referenceElement) {
        this.referenceElement.textContent = newReference;
      }
    }
    
    if (restart) {
      this.clearTimeouts();
      this.animate();
    }
  }
  
  // Public: Start animation
  start() {
    this.clearTimeouts();
    this.animate();
  }
  
  // Public: Pause animation
  pause() {
    this.clearTimeouts();
    this.isAnimating = false;
  }
  
  // Public: Destroy animation and clean up
  destroy() {
    this.clearTimeouts();
    
    // Restore original text
    if (this.element) {
      this.element.textContent = this.text;
      this.element.classList.remove('animated-scripture');
    }
  }
  
  // Clear all pending timeouts
  clearTimeouts() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }
}

// Export to global scope
window.ScriptureAnimation = ScriptureAnimation;