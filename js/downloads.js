/* ==========================================================================
   DOWNLOADS PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('download-search-input');
  const filterBtns = document.querySelectorAll('.download-filter');
  const tableRows = document.querySelectorAll('.download-row-item');

  const filterDownloads = () => {
    const query = searchInput.value.toLowerCase().trim();
    const activeBtn = document.querySelector('.download-filter.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

    tableRows.forEach(row => {
      const category = row.getAttribute('data-category');
      const title = row.querySelector('h6').textContent.toLowerCase();
      const desc = row.querySelector('small').textContent.toLowerCase();

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        row.style.display = 'table-row';
        setTimeout(() => {
          row.style.opacity = '1';
        }, 50);
      } else {
        row.style.opacity = '0';
        setTimeout(() => {
          row.style.display = 'none';
        }, 200);
      }
    });
  };

  // 1. Search text checks
  if (searchInput) {
    searchInput.addEventListener('input', filterDownloads);
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

      filterDownloads();
    });
  });

  // 3. Simulated downloads trigger
  const downloadBtns = document.querySelectorAll('.trigger-download-btn');
  const filenameSpan = document.getElementById('toast-filename');
  let toastEl = document.getElementById('downloadToast');
  let bToast;

  if (toastEl && typeof bootstrap !== 'undefined') {
    bToast = new bootstrap.Toast(toastEl, { delay: 4000 });
  }

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filename = btn.getAttribute('data-filename');
      if (filenameSpan) {
        filenameSpan.innerHTML = `<i class="fas fa-file me-1 text-primary"></i> <strong>${filename}</strong> has been downloaded to your system.`;
      }
      if (bToast) bToast.show();
    });
  });
});
