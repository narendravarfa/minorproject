/* ==========================================================================
   HOMEPAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Statistics Counter Animation
  const counters = document.querySelectorAll('.counter-value');
  const speed = 150; // lower is faster

  const startCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        
        // Increase loop step proportionally
        const inc = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + inc > target ? target : count + inc;
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Run counter when visible in screen
  let observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  let statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    observer.observe(statsSection);
  }

  // 2. Extra Carousel Controls
  const heroCarouselEl = document.getElementById('heroCarousel');
  if (heroCarouselEl && typeof bootstrap !== 'undefined') {
    const heroCarousel = new bootstrap.Carousel(heroCarouselEl, {
      interval: 6000,
      ride: 'carousel',
      pause: 'hover'
    });
  }
});
