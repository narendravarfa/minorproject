/* ==========================================================================
   ABOUT PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Add micro-interactions for timeline hover items
  const timelineBodies = document.querySelectorAll('.timeline-body');
  timelineBodies.forEach(body => {
    body.addEventListener('mouseenter', () => {
      const icon = body.closest('.timeline-item').querySelector('.timeline-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.4s ease';
      }
    });
    body.addEventListener('mouseleave', () => {
      const icon = body.closest('.timeline-item').querySelector('.timeline-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
});
