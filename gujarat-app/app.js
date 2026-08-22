// ==========================================
// app.js - Fully Fixed MapLibre & Layer Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances centered on Gujarat (Longitude: 71.5, Latitude: 22.3)
  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], 
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

  // 3. Force Render / Resize Calculations when loaded
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

  // 5. Layer Toggle Logic for your buttons
  // This handles clicking your layer buttons safely without crashing if sources aren't loaded yet
  const handleLayerClick = (mapInstance, layerId) => {
    if (mapInstance.getLayer(layerId)) {
      const visibility = mapInstance.getLayoutProperty(layerId, 'visibility');
      const newVis = (visibility === 'none') ? 'visible' : 'none';
      mapInstance.setLayoutProperty(layerId, 'visibility', newVis);
    } else {
      console.warn(`Layer "${layerId}" is not yet loaded in this map source.`);
    }
  };

  // Example hookups for buttons if their IDs match
  // Adjust these IDs if your HTML buttons have specific IDs
  document.querySelectorAll('.map-layers button, [id^="btn-"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('active');
      // Add your specific layer toggle triggers here based on button clicks
    });
  });
});
