/* ==========================================================================
   CONTACT PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Citizen Query / Grievance Form submission
  const feedbackForm = document.getElementById('contact-feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('feedback-name').value;
      const phone = document.getElementById('feedback-phone').value;
      const type = document.getElementById('feedback-type').value;
      const msg = document.getElementById('feedback-msg').value;

      alert(`Thank you, ${name}! Your grievance ticket regarding "${type}" has been registered successfully. Our administrative representative will review details and follow up on ${phone}.`);
      feedbackForm.reset();
    });
  }

  // 2. Leaflet.js Interactive Map Setup
  const mapContainer = document.getElementById('leaflet-map');
  if (mapContainer && typeof L !== 'undefined') {
    // Coordinate region of central village Ramnagar: 26.8467, 80.9462
    const map = L.map('leaflet-map').setView([26.8467, 80.9462], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Markers lists
    const marker1 = L.marker([26.8467, 80.9462]).addTo(map);
    marker1.bindPopup("<strong>Smart Panchayat Bhawan</strong><br>Administrative center office square.");

    const marker2 = L.marker([26.8490, 80.9440]).addTo(map);
    marker2.bindPopup("<strong>Primary Health Center</strong><br>Rural clinic 24/7 nursing center.");

    const marker3 = L.marker([26.8435, 80.9480]).addTo(map);
    marker3.bindPopup("<strong>Govt Smart High School</strong><br>Main educational Smart complex building.");

    const marker4 = L.marker([26.8450, 80.9420]).addTo(map);
    marker4.bindPopup("<strong>SBI Cooperative Bank</strong><br>Agriculture agro-credit deposits.");
  }
});
