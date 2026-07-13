/* ==========================================================================
   GALLERY PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Grid Category Filter
  const filterBtns = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-outline-primary');
      });
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-primary', 'active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 2. Native Custom Lightbox Logic
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomInBtn = document.getElementById('lightbox-zoom-in');
  const zoomOutBtn = document.getElementById('lightbox-zoom-out');

  const viewBtns = document.querySelectorAll('.view-lightbox-btn');
  let currentZoom = 1;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      const img = card.querySelector('.gallery-thumbnail');
      const title = card.querySelector('h6').textContent;
      const desc = card.querySelector('small').textContent;

      if (lightboxImg && lightboxCaption && lightboxOverlay) {
        currentZoom = 1;
        lightboxImg.style.transform = `scale(${currentZoom})`;
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
        lightboxOverlay.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxOverlay.classList.remove('active');
    });
  }

  // Hide lightbox on clicking background
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        lightboxOverlay.classList.remove('active');
      }
    });
  }

  // Keypress event (Escape to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
      lightboxOverlay.classList.remove('active');
    }
  });

  // Zoom Operations
  if (zoomInBtn && lightboxImg) {
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentZoom < 2.5) {
        currentZoom += 0.25;
        lightboxImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  if (zoomOutBtn && lightboxImg) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentZoom > 0.5) {
        currentZoom -= 0.25;
        lightboxImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  // 3. Play Video Simulation
  const playBtns = document.querySelectorAll('.play-video-btn');
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Simulating Video stream playback... In production, this launches a streaming media frame or Youtube player.');
    });
  });
});
