// ==========================================
// app.js - Full Integrated Script for MapLibre & Theme Toggle
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances (Constituency, District, Taluka)
  const commonConfig = {
    style: lightStyle,
    center: [72.5714, 23.0225], // Centered on Gujarat
    zoom: 7
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
});
