// ==========================================
// app.js - Fully Fixed MapLibre, Dropdown & Theme Logic
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances (Constituency, District, Taluka) centered on Gujarat
  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], 
    zoom: 6.5
  };

  const mapConstituency = new maplibregl.Map({ ...commonConfig, container: 'map-constituency' });
  const mapDistrict = new maplibregl.Map({ ...commonConfig, container: 'map-district' });
  const mapTaluka = new maplibregl.Map({ ...commonConfig, container: 'map-taluka' });

  // 3. Force Render / Resize Calculations
  window.addEventListener('load', () => {
    setTimeout(() => {
      mapConstituency.resize();
      mapDistrict.resize();
      mapTaluka.resize();
    }, 300);
  });

  window.addEventListener('resize', () => {
    mapConstituency.resize();
    mapDistrict.resize();
    mapTaluka.resize();
  });

  // 4. Sun / 🌙 Theme Toggle Logic (UI + Map Sync)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');

      if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
      }

      const activeStyle = isDark ? darkStyle : lightStyle;
      mapConstituency.setStyle(activeStyle);
      mapDistrict.setStyle(activeStyle);
      mapTaluka.setStyle(activeStyle);
    });
  }

  // 5. Region / Dropdown Zoom Sync
  // Coordinates mapping for districts found in your dataset
  const districtCoordinates = {
    "Kachchh": { center: [69.8597, 23.7337], zoom: 8 },
    "Bhavnagar": { center: [71.8508, 21.7645], zoom: 9 },
    "Surat": { center: [72.8311, 21.1702], zoom: 9 },
    "Ahmedabad": { center: [72.5714, 23.0225], zoom: 9 },
    "Banaskantha": { center: [72.0000, 24.2000], zoom: 8 },
    "Patan": { center: [71.5300, 23.8500], zoom: 8 },
    "Mahesana": { center: [72.3800, 23.6000], zoom: 9 },
    "Sabarkantha": { center: [73.0000, 23.6000], zoom: 8 },
    "Rajkot": { center: [70.8022, 22.3039], zoom: 8 },
    "Morbi": { center: [70.8350, 22.8100], zoom: 9 },
    "Jamnagar": { center: [70.0577, 22.4707], zoom: 8 },
    "Porbandar": { center: [69.6393, 21.6417], zoom: 9 },
    "Junagadh": { center: [70.4579, 21.5222], zoom: 8 },
    "Amreli": { center: [71.2200, 21.6000], zoom: 9 },
    "Botad": { center: [71.6600, 22.1700], zoom: 9 },
    "Anand": { center: [72.9300, 22.5500], zoom: 9 },
    "Kheda": { center: [72.6800, 22.7500], zoom: 9 },
    "Panchmahal": { center: [73.6100, 22.7700], zoom: 9 },
    "Dahod": { center: [74.2500, 22.8300], zoom: 9 },
    "Vadodra": { center: [73.1812, 22.3072], zoom: 9 },
    "Valsad": { center: [72.9300, 20.6000], zoom: 9 },
    "Default": { center: [71.5, 22.3], zoom: 6.5 }
  };

  // Find the district dropdown element in the DOM and listen for changes
  const selects = document.querySelectorAll('select');
  if (selects.length >= 2) {
    const districtDropdown = selects[1]; // Usually District is second dropdown
    districtDropdown.addEventListener('change', (e) => {
      const selectedDistrict = e.target.value;
      const target = districtCoordinates[selectedDistrict] || districtCoordinates["Default"];

      [mapConstituency, mapDistrict, mapTaluka].forEach(map => {
        map.flyTo({
          center: target.center,
          zoom: target.zoom,
          essential: true
        });
      });
    });
  }

  // 6. Layer Toggle Button Handlers
  document.querySelectorAll('.map-layers button, [id^="btn-"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
});
