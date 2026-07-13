/* ==========================================================================
   PANCHAYAT MEMBERS PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Grid Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const memberItems = document.querySelectorAll('.member-item-container');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle button active classes
      filterButtons.forEach(btn => {
        btn.classList.remove('btn-primary', 'active');
        btn.classList.add('btn-outline-primary');
      });
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-primary', 'active');

      const filterValue = button.getAttribute('data-filter');

      // Filter members with animations
      memberItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 2. Contact Message Modal Interactions
  const contactButtons = document.querySelectorAll('.contact-member-btn');
  const recipientNameSpan = document.getElementById('recipient-member-name');
  const messageForm = document.getElementById('member-message-form');
  let targetModal;

  if (typeof bootstrap !== 'undefined') {
    targetModal = new bootstrap.Modal(document.getElementById('contactMemberModal'));
  }

  contactButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      if (recipientNameSpan) recipientNameSpan.textContent = name;
      if (targetModal) targetModal.show();
    });
  });

  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('sender-name').value;
      const phone = document.getElementById('sender-phone').value;
      const msg = document.getElementById('sender-message').value;

      alert(`Thank you ${sender}! Your message to ${recipientNameSpan.textContent} has been sent successfully. We will follow up on ${phone} if needed.`);
      messageForm.reset();
      if (targetModal) targetModal.hide();
    });
  }
});
