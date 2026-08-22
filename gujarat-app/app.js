// ==========================================
// app.js - Fully Fixed Map & GeoJSON Layer Integration
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 2. Initialize Map Instances centered on Gujarat
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

  // 5. Load GeoJSON Data Layers on Map Load
  // Ensure your filtered GeoJSON files are accessible relative to your app path (e.g., in a data folder)
  const loadGeoJsonLayer = (map, sourceId, layerId, dataUrl, fillColor) => {
    map.on('load', () => {
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: 'geojson',
          data: dataUrl
        });

        map.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          layout: {
            'visibility': 'none' // Hidden by default until toggled
          },
          paint: {
            'fill-color': fillColor,
            'fill-opacity': 0.4,
            'fill-outline-color': '#000000'
          }
        });
      }
    });
  };

  // Example binding for your layers (update paths to match where your processed GeoJSON files live)
  // loadGeoJsonLayer(mapConstituency, 'revenue-source', 'revenue-layer', '../gujarat-data/filtered/gujarat_revenue.geojson', '#f59e0b');
  // loadGeoJsonLayer(mapDistrict, 'panchayat-source', 'panchayat-layer', '../gujarat-data/filtered/gujarat_panchayats.geojson', '#3b82f6');

  // 6. Layer Toggle Button Interaction
  const setupButtonToggle = (buttonTextMatch, mapInstance, layerId) => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes(buttonTextMatch)) {
        btn.addEventListener('click', () => {
          btn.classList.toggle('active');
          if (mapInstance.getLayer(layerId)) {
            const currentVis = mapInstance.getLayoutProperty(layerId, 'visibility');
            mapInstance.setLayoutProperty(layerId, 'visibility', currentVis === 'visible' ? 'none' : 'visible');
          }
        });
      }
    });
  };

  setupButtonToggle('Village revenue limits', mapConstituency, 'revenue-layer');
  setupButtonToggle('Gram panchayats', mapDistrict, 'panchayat-layer');
});
