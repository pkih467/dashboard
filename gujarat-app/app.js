// ==========================================
// app.js - Fully Integrated Maps, Theme, & Dropdown Synchronizer
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances centered on Gujarat
  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], // Default center of Gujarat
    zoom: 6.5
  };

  const mapConstituency = new maplibregl.Map({
    ...commonConfig,
    container: 'map-constituency'
  });

  const mapDistrict = new maplibregl.Map({
    ...commonConfig,
    container: 'map-district'
  });

  const mapTaluka = new maplibregl.Map({
    ...commonConfig,
    container: 'map-taluka'
  });

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

  // 4. ☀️ / 🌙 Theme Toggle Logic (UI + Map Sync)
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

  // 5. Dropdown Selection Sync (Assembly Constituency, District, Taluka)
  // This listens for changes in your dropdowns and triggers map updates
  const constituencySelect = document.querySelector('select:nth-of-type(1)');
  const districtSelect = document.querySelector('select:nth-of-type(2)');
  const talukaSelect = document.querySelector('select:nth-of-type(3)');

  // Example coordinate dictionary for regions (You can expand this with specific bounds/coordinates)
  const regionCoordinates = {
    "Kachchh": { center: [69.8597, 23.7337], zoom: 8 },
    "Bhavnagar": { center: [71.8508, 21.7645], zoom: 9 },
    "Surat": { center: [72.8311, 21.1702], zoom: 9 },
    "Ahmedabad": { center: [72.5714, 23.0225], zoom: 9 },
    "Default": { center: [71.5, 22.3], zoom: 6.5 }
  };

  const updateMapsForSelection = (regionName) => {
    const target = regionCoordinates[regionName] || regionCoordinates["Default"];
    
    // Smoothly fly all three maps to the selected region
    [mapConstituency, mapDistrict, mapTaluka].forEach(map => {
      map.flyTo({
        center: target.center,
        zoom: target.zoom,
        essential: true
      });
    });
  };

  // Listen to changes on the dropdowns
  if (districtSelect) {
    districtSelect.addEventListener('change', (e) => {
      updateMapsForSelection(e.target.value);
    });
  }

  if (talukaSelect) {
    talukaSelect.addEventListener('change', (e) => {
      // Can be wired to specific taluka coordinates if needed
    });
  }
});
