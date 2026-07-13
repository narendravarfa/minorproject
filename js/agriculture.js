/* ==========================================================================
   AGRICULTURE PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Fetch Real Weather Data via Open-Meteo API
  const tempEl = document.getElementById('live-temp');
  const descEl = document.getElementById('live-desc');
  const humEl = document.getElementById('live-humidity');
  const windEl = document.getElementById('live-wind');

  const fetchWeather = async () => {
    try {
      // Ramnagar Coordinate approximation: Lat 26.84, Lon 80.94 (Uttar Pradesh region)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=26.8467&longitude=80.9462&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      
      const current = data.current;
      if (current) {
        tempEl.textContent = `${current.temperature_2m}°C`;
        humEl.textContent = `${current.relative_humidity_2m}%`;
        windEl.textContent = `${current.wind_speed_10m} km/h`;
        
        // Match Weather Codes to Descriptions
        const codeMap = {
          0: 'Clear sky',
          1: 'Mainly clear',
          2: 'Partly cloudy',
          3: 'Overcast',
          45: 'Foggy',
          48: 'Depositing rime fog',
          51: 'Light drizzle',
          53: 'Moderate drizzle',
          55: 'Dense drizzle',
          61: 'Slight rain',
          63: 'Moderate rain',
          65: 'Heavy rain',
          71: 'Slight snowfall',
          73: 'Moderate snowfall',
          75: 'Heavy snowfall',
          80: 'Slight rain showers',
          81: 'Moderate rain showers',
          82: 'Violent rain showers',
          95: 'Thunderstorm'
        };
        descEl.textContent = codeMap[current.weather_code] || 'Scattered clouds';
      }
    } catch (e) {
      console.warn('Weather API failed. Utilizing offline fallback metrics.', e);
      // fallback
      if (tempEl) tempEl.textContent = '31.2°C';
      if (descEl) descEl.textContent = 'Partly Cloudy';
      if (humEl) humEl.textContent = '68%';
      if (windEl) windEl.textContent = '12.5 km/h';
    }
  };

  fetchWeather();

  // 2. Mandi Price Trend Chart
  const getThemeColors = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      text: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
    };
  };

  let colors = getThemeColors();
  const trendCtx = document.getElementById('mandiTrendChart');
  let trendChart;

  if (trendCtx) {
    trendChart = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Wheat (₹/Qtl)',
            data: [2150, 2180, 2210, 2250, 2275, 2275],
            borderColor: '#2e7d32',
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 3
          },
          {
            label: 'Paddy/Rice (₹/Qtl)',
            data: [2040, 2070, 2100, 2140, 2160, 2180],
            borderColor: '#0d6efd',
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: colors.text,
              font: { family: 'Outfit', size: 12 }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          },
          y: {
            grid: { color: colors.grid },
            ticks: { color: colors.text }
          }
        }
      }
    });

    window.addEventListener('themeChanged', () => {
      const newColors = getThemeColors();
      trendChart.options.plugins.legend.labels.color = newColors.text;
      trendChart.options.scales.x.ticks.color = newColors.text;
      trendChart.options.scales.y.grid.color = newColors.grid;
      trendChart.options.scales.y.ticks.color = newColors.text;
      trendChart.update();
    });
  }

  // 3. Soil & Crop Doctor Diagnostics Engine
  const cropDatabase = {
    alluvial: {
      kharif: [
        { name: 'Paddy Rice', duration: '120-140 Days', water: 'High', profit: 'Good' },
        { name: 'Maize (Corn)', duration: '90-110 Days', water: 'Medium', profit: 'Moderate' },
        { name: 'Sugarcane', duration: '300-360 Days', water: 'High', profit: 'High' }
      ],
      rabi: [
        { name: 'Wheat (Kanak)', duration: '120-130 Days', water: 'Medium', profit: 'High' },
        { name: 'Mustard Seeds', duration: '100-115 Days', water: 'Low', profit: 'High' },
        { name: 'Chickpea (Chana)', duration: '110-120 Days', water: 'Low', profit: 'Moderate' }
      ],
      zaid: [
        { name: 'Moong Dal (Green Gram)', duration: '60-70 Days', water: 'Low', profit: 'Moderate' },
        { name: 'Watermelon', duration: '80-90 Days', water: 'Medium', profit: 'High' }
      ]
    },
    black: {
      kharif: [
        { name: 'Cotton (Kap कपास)', duration: '150-180 Days', water: 'Medium', profit: 'High' },
        { name: 'Soybean', duration: '100-110 Days', water: 'Medium', profit: 'Good' }
      ],
      rabi: [
        { name: 'Wheat (Durum)', duration: '120-130 Days', water: 'Medium', profit: 'High' },
        { name: 'Linseed (Alsi)', duration: '110-120 Days', water: 'Low', profit: 'Moderate' }
      ],
      zaid: [
        { name: 'Cucumber', duration: '60-75 Days', water: 'Medium', profit: 'Moderate' }
      ]
    },
    red: {
      kharif: [
        { name: 'Groundnut (Peanut)', duration: '110-125 Days', water: 'Low', profit: 'Good' },
        { name: 'Pearl Millet (Bajra)', duration: '85-95 Days', water: 'Very Low', profit: 'Moderate' }
      ],
      rabi: [
        { name: 'Barley (Jau)', duration: '110-120 Days', water: 'Low', profit: 'Moderate' },
        { name: 'Sesame (Til)', duration: '90-100 Days', water: 'Low', profit: 'Good' }
      ],
      zaid: [
        { name: 'Fodder Crops', duration: '50-60 Days', water: 'Low', profit: 'Moderate' }
      ]
    }
  };

  const btnDiagnose = document.getElementById('btn-diagnose-crop');
  const resultBlock = document.getElementById('crop-doctor-result');
  const containerCrops = document.getElementById('suggested-crops-container');

  if (btnDiagnose && resultBlock && containerCrops) {
    btnDiagnose.addEventListener('click', () => {
      const soil = document.getElementById('soil-select').value;
      const season = document.getElementById('season-select').value;

      containerCrops.innerHTML = '';
      
      const suggestions = cropDatabase[soil] ? cropDatabase[soil][season] : [];

      if (suggestions && suggestions.length > 0) {
        suggestions.forEach(crop => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.innerHTML = `
            <div class="crop-suggestion-box">
              <h6 class="fw-bold text-primary mb-2"><i class="fas fa-seedling me-1"></i>${crop.name}</h6>
              <ul class="list-unstyled text-muted text-xs mb-0">
                <li><i class="far fa-clock me-1"></i>Duration: ${crop.duration}</li>
                <li><i class="fas fa-droplet me-1"></i>Water Need: ${crop.water}</li>
                <li><i class="fas fa-wallet me-1"></i>Profit Index: ${crop.profit}</li>
              </ul>
            </div>
          `;
          containerCrops.appendChild(card);
        });
        resultBlock.style.display = 'block';
        resultBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        containerCrops.innerHTML = '<p class="text-danger text-center w-100">No specific records available for this pair.</p>';
        resultBlock.style.display = 'block';
      }
    });
  }
});
