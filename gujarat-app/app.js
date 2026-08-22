// ==========================================
// app.js - Full Integrated Script for MapLibre & Theme Toggle
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances (Constituency, District, Taluka)
  // Ensure your HTML contains elements with IDs: map-constituency, map-district, map-taluka
  
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
  // Fixes collapsed canvas or gray tile rendering issues when tabs/cards load
  window.addEventListener('load', () => {
    setTimeout(() => {
      mapConstituency.resize();
      mapDistrict.resize();
      mapTaluka.resize();
    }, 300);
  });

  // Also trigger resize if window size changes
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

      // Update button icon
      if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
      }

      // Swap active MapLibre styles dynamically
      const activeStyle = isDark ? darkStyle : lightStyle;
      mapConstituency.setStyle(activeStyle);
      mapDistrict.setStyle(activeStyle);
      mapTaluka.setStyle(activeStyle);
    });
  }

  // 5. Layer Toggle Button Event Listeners Setup
  // Make sure your layer buttons have corresponding IDs in your HTML markup
  const setupLayerToggle = (buttonId, mapInstance, layerId) => {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener('click', () => {
        if (!mapInstance.getLayer(layerId)) return;
        const currentVisibility = mapInstance.getLayoutProperty(layerId, 'visibility');
        const newVisibility = (currentVisibility === 'none') ? 'visible' : 'none';
        mapInstance.setLayoutProperty(layerId, 'visibility', newVisibility);
        btn.classList.toggle('active', newVisibility === 'visible');
      });
    }
  };

  // Example bindings for your layers (update IDs to match your HTML buttons and layer IDs)
  // setupLayerToggle('btn-revenue', mapConstituency, 'village-revenue-limits');
  // setupLayerToggle('btn-panchayats', mapDistrict, 'gram-panchayats');
});
