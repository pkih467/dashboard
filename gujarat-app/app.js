// ==========================================
// app.js - Fully Fixed MapLibre & Dropdown Sync
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances
  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], // Gujarat Center
    zoom: 6.5
  };

  const mapConstituency = new maplibregl.Map({ ...commonConfig, container: 'map-constituency' });
  const mapDistrict = new maplibregl.Map({ ...commonConfig, container: 'map-district' });
  const mapTaluka = new maplibregl.Map({ ...commonConfig, container: 'map-taluka' });

  // 3. Force Map Resizing (Fixes blank or gray rendering tiles)
  const resizeMaps = () => {
    mapConstituency.resize();
    mapDistrict.resize();
    mapTaluka.resize();
  };

  window.addEventListener('load', () => setTimeout(resizeMaps, 200));
  window.addEventListener('resize', resizeMaps);
  
  // Also trigger resize when switching tabs or cards if applicable
  setTimeout(resizeMaps, 500);

  // 4. Sun / 🌙 Theme Toggle Logic
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

  // 5. Region/Dropdown Zoom Coordinator (Valsad, Vapi, Umbergaon, etc.)
  const regionCoordinates = {
    "Valsad": { center: [72.9300, 20.6000], zoom: 9 },
    "Vapi": { center: [72.9106, 20.3893], zoom: 11 },
    "Umbergaon": { center: [72.7230, 20.2170], zoom: 11 },
    "Bhavnagar": { center: [71.8508, 21.7645], zoom: 9 },
    "Surat": { center: [72.8311, 21.1702], zoom: 9 },
    "Ahmedabad": { center: [72.5714, 23.0225], zoom: 9 },
    "Kachchh": { center: [69.8597, 23.7337], zoom: 8 },
    "Default": { center: [71.5, 22.3], zoom: 6.5 }
  };

  // Listen to changes on your dropdown menus
  document.querySelectorAll('select').forEach((selectEl) => {
    selectEl.addEventListener('change', (e) => {
      const val = e.target.value;
      // Extract key text or match region name
      let target = regionCoordinates["Default"];
      
      for (let key in regionCoordinates) {
        if (val.includes(key)) {
          target = regionCoordinates[key];
          break;
        }
      }

      [mapConstituency, mapDistrict, mapTaluka].forEach(map => {
        map.flyTo({
          center: target.center,
          zoom: target.zoom,
          essential: true
        });
      });
    });
  });
});
