// Utility hooks and functions for ATG Chapel App

/**
 * Hook to initialize AOS animations
 */
export const useAOS = () => {
  if (typeof window !== 'undefined' && window.AOS) {
    window.AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
};

/**
 * Hook to handle scroll position
 */
export const useScrollPosition = (callback) => {
  const handleScroll = () => {
    callback(window.scrollY);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }
};

/**
 * Format date for display
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate days until next Sunday service
 */
export const daysUntilSunday = () => {
  const now = new Date();
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
  nextSunday.setHours(9, 30, 0, 0);
  
  if (now.getDay() === 0 && now.getHours() < 9) {
    nextSunday.setDate(now.getDate());
  }
  
  const timeRemaining = nextSunday - now;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  
  return {
    days: daysRemaining,
    hours: Math.floor(timeRemaining / (1000 * 60 * 60)),
    nextServiceDate: nextSunday
  };
};

/**
 * Store and retrieve Bible notes
 */
export const bibleNotes = {
  save: (book, chapter, notes) => {
    localStorage.setItem(`bible-notes-${book}-${chapter}`, notes);
  },
  
  get: (book, chapter) => {
    return localStorage.getItem(`bible-notes-${book}-${chapter}`) || '';
  },
  
  getAll: () => {
    const notes = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('bible-notes-')) {
        notes[key] = localStorage.getItem(key);
      }
    }
    return notes;
  }
};

/**
 * Initialize vendor libraries
 */
export const initVendorLibraries = () => {
  // Initialize Swiper
  if (window.Swiper) {
    document.querySelectorAll('.init-swiper').forEach(function(swiperElement) {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (configElement) {
        const config = JSON.parse(configElement.innerHTML.trim());
        new window.Swiper(swiperElement, config);
      }
    });
  }

  // Initialize GLightbox
  if (window.GLightbox) {
    window.GLightbox({ selector: '.glightbox' });
  }

  // Initialize Isotope
  if (window.Isotope && window.imagesLoaded) {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') || '*';
      const sort = isotopeItem.getAttribute('data-sort') || 'original-order';

      let initIsotope;
      window.imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new window.Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (window.AOS) window.AOS.refresh();
        });
      });
    });
  }
};
