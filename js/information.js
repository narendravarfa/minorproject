/* ==========================================================================
   VILLAGE INFORMATION PAGE SPECIFIC BEHAVIORS (SMART GRAM PANCHAYAT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Chart Helper: Get text color based on active theme
  const getThemeColors = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      text: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
    };
  };

  let colors = getThemeColors();

  // 1. Age Distribution Chart (Doughnut)
  const ageCtx = document.getElementById('ageDistributionChart');
  let ageChart;
  if (ageCtx) {
    ageChart = new Chart(ageCtx, {
      type: 'doughnut',
      data: {
        labels: ['Children (0-14)', 'Youth (15-35)', 'Adults (36-60)', 'Seniors (60+)'],
        datasets: [{
          data: [22, 38, 25, 15],
          backgroundColor: [
            '#2e7d32', // primary
            '#0d6efd', // secondary
            '#f57c00', // accent
            '#6c757d'  // muted
          ],
          borderWidth: 2,
          borderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: colors.text,
              font: { family: 'Outfit', size: 12 }
            }
          }
        }
      }
    });
  }

  // 2. Livelihood Sectors Chart (Horizontal Bar)
  const livelihoodCtx = document.getElementById('livelihoodChart');
  let livelihoodChart;
  if (livelihoodCtx) {
    livelihoodChart = new Chart(livelihoodCtx, {
      type: 'bar',
      data: {
        labels: ['Agriculture', 'Retail Shop', 'Local Cottage', 'Construction', 'Govt Services', 'Others'],
        datasets: [{
          label: '% Households',
          data: [55, 12, 10, 8, 7, 8],
          backgroundColor: 'rgba(46, 125, 50, 0.85)', // primary
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: colors.grid },
            ticks: { color: colors.text }
          },
          y: {
            grid: { display: false },
            ticks: { color: colors.text }
          }
        }
      }
    });
  }

  // 3. Decadal Literacy Chart (Line)
  const literacyCtx = document.getElementById('literacyChart');
  let literacyChart;
  if (literacyCtx) {
    literacyChart = new Chart(literacyCtx, {
      type: 'line',
      data: {
        labels: ['1981', '1991', '2001', '2011', '2021', '2026 (Est)'],
        datasets: [{
          label: 'Literacy Rate (%)',
          data: [35, 48, 62, 74, 82, 86],
          borderColor: '#0d6efd', // secondary
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.text }
          },
          y: {
            grid: { color: colors.grid },
            ticks: { color: colors.text },
            min: 0,
            max: 100
          }
        }
      }
    });
  }

  // Handle theme changes dynamically
  window.addEventListener('themeChanged', (e) => {
    const newColors = getThemeColors();
    
    // Update Age Chart
    if (ageChart) {
      ageChart.options.plugins.legend.labels.color = newColors.text;
      ageChart.update();
    }
    
    // Update Livelihood Chart
    if (livelihoodChart) {
      livelihoodChart.options.scales.x.grid.color = newColors.grid;
      livelihoodChart.options.scales.x.ticks.color = newColors.text;
      livelihoodChart.options.scales.y.ticks.color = newColors.text;
      livelihoodChart.update();
    }

    // Update Literacy Chart
    if (literacyChart) {
      literacyChart.options.scales.x.ticks.color = newColors.text;
      literacyChart.options.scales.y.grid.color = newColors.grid;
      literacyChart.options.scales.y.ticks.color = newColors.text;
      literacyChart.update();
    }
  });
});
