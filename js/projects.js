/* ==========================================================================
   DEVELOPMENT PROJECTS PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.project-tab-btn');
  const projectItems = document.querySelectorAll('.project-item-wrapper');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active states on tab buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('btn-primary', 'active');
        btn.classList.add('btn-outline-primary');
      });
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-primary', 'active');

      const selectedTab = button.getAttribute('data-tab');

      // Sort cards based on active attributes
      projectItems.forEach(item => {
        const status = item.getAttribute('data-status');
        if (selectedTab === 'all' || status === selectedTab) {
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
});
