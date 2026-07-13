/* ==========================================================================
   GLOBAL UTILITIES & SHARED BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Hiding
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    });
    // Fallback if load event already fired
    if (document.readyState === 'complete') {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }

  // 2. Theme Switching (Light/Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const activeTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateThemeIcon(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Dispatch custom event for page-specific scripts to adjust (e.g. Chart.js colors)
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }

  // 3. Sticky Navbar & Scroll Effects
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-sm');
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.classList.remove('shadow-sm');
      navbar.style.padding = '1rem 0';
    }
  });

  // 4. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Global Search Overlay
  const searchTrigger = document.getElementById('search-trigger');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results');

  if (searchTrigger && searchOverlay && searchClose) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });

    // Close search overlay on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });

    // Dummy Global Search Results Database
    const searchablePages = [
      { title: 'Home Page', url: '/index.html', desc: 'Main page of Smart Gram Panchayat with updates, stats, and sliders.' },
      { title: 'About Panchayat', url: '/pages/about.html', desc: 'History, vision, mission, and message from the Sarpanch.' },
      { title: 'Village Information', url: '/pages/information.html', desc: 'Demographics, literacy, hospitals, banking, and schools.' },
      { title: 'Panchayat Members', url: '/pages/members.html', desc: 'Contact details of Sarpanch, Ward Members, and Staff.' },
      { title: 'Government Schemes', url: '/pages/schemes.html', desc: 'Apply for PM Kisan, PM Awas, MGNREGA, and others.' },
      { title: 'Development Projects', url: '/pages/projects.html', desc: 'Information on ongoing and completed public works.' },
      { title: 'Agriculture & Mandi', url: '/pages/agriculture.html', desc: 'Weather forecasts, local Mandi rates, and soil doctors.' },
      { title: 'Media Gallery', url: '/pages/gallery.html', desc: 'Photo and video gallery of village events.' },
      { title: 'Downloads Portal', url: '/pages/downloads.html', desc: 'Official forms, certificates, and application blanks.' },
      { title: 'Emergency Contacts', url: '/pages/contact.html#emergency', desc: 'Quick helpline numbers for Police, Ambulance, and Fire.' },
      { title: 'Contact Us', url: '/pages/contact.html', desc: 'Interactive map, office hours, and contact feedback form.' }
    ];

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';

      if (val.length < 2) {
        searchResults.innerHTML = '<p class="text-muted text-center">Type at least 2 characters to search...</p>';
        return;
      }

      // Check relative path adjustment (handles index.html vs subpages)
      const pathPrefix = window.location.pathname.includes('/pages/') ? '..' : '.';

      const matches = searchablePages.filter(p => 
        p.title.toLowerCase().includes(val) || 
        p.desc.toLowerCase().includes(val)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = '<p class="text-danger text-center"><i class="fas fa-exclamation-triangle"></i> No matches found.</p>';
      } else {
        matches.forEach(item => {
          const adjustedUrl = item.url.replace(/^\./, pathPrefix).replace(/^\//, '/').replace(/^\/(index\.html|pages)/, `${pathPrefix}/$1`);
          // Let's resolve the URL correctly:
          let finalUrl = item.url;
          if (window.location.pathname.includes('/pages/')) {
            if (item.url.startsWith('/pages/')) {
              finalUrl = item.url.substring(7); // remove /pages/
            } else if (item.url === '/index.html') {
              finalUrl = '../index.html';
            }
          } else {
            // we are on home
            if (item.url.startsWith('/')) {
              finalUrl = item.url.substring(1); // remove / to make relative pages/... or index.html
            }
          }

          const resultItem = document.createElement('a');
          resultItem.href = finalUrl;
          resultItem.className = 'list-group-item list-group-item-action border-0 mb-2 rounded glass-card p-3 d-block';
          resultItem.innerHTML = `
            <h6 class="mb-1 text-primary fw-bold">${item.title}</h6>
            <small class="text-muted">${item.desc}</small>
          `;
          searchResults.appendChild(resultItem);
        });
      }
    });
  }

  // 6. Ripple Button Effect
  document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 7. Initialize AOS Animation
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // 8. Newsletter Form Submit
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to our Smart Gram Panchayat newsletter!');
      newsletterForm.reset();
    });
  }
});
