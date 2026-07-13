/* ==========================================================================
   SCHEMES PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('scheme-search-input');
  const filterBtns = document.querySelectorAll('.scheme-filter');
  const schemeCards = document.querySelectorAll('.scheme-item-wrapper');

  const filterSchemes = () => {
    const query = searchInput.value.toLowerCase().trim();
    const activeFilterBtn = document.querySelector('.scheme-filter.active');
    const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

    schemeCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const keywords = card.getAttribute('data-keywords') || '';
      const title = card.querySelector('h5').textContent.toLowerCase();
      const textContent = card.querySelector('p').textContent.toLowerCase();

      const matchesSearch = title.includes(query) || textContent.includes(query) || keywords.includes(query);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  // 1. Search input events
  if (searchInput) {
    searchInput.addEventListener('input', filterSchemes);
  }

  // 2. Category button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-outline-primary');
      });
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-primary', 'active');

      filterSchemes();
    });
  });
});
