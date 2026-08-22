// ==========================================
// app.js - PMTiles & MapLibre Integration Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Register PMTiles protocol with MapLibre
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  // 2. MapLibre Styles Configuration (Light / Dark)
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  // 3. Initialize Map Instances centered on Gujarat
  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], 
    zoom: 6.5
  };

  const mapConstituency = new maplibregl.Map({ ...commonConfig, container: 'map-constituency' });
  const mapDistrict = new maplibregl.Map({ ...commonConfig, container: 'map-district' });
  const mapTaluka = new maplibregl.Map({ ...commonConfig, container: 'map-taluka' });

  // 4. Force Render / Resize Calculations
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

  // 5. Sun / 🌙 Theme Toggle Logic (UI + Map Sync)
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

  // 6. Add PMTiles Sources and Layers on Map Load
  const addPmTilesLayer = (mapInstance, sourceId, layerId, pmtilesUrl, layerName, color) => {
    mapInstance.on('load', () => {
      if (!mapInstance.getSource(sourceId)) {
        mapInstance.addSource(sourceId, {
          type: 'vector',
          url: `pmtiles://${pmtilesUrl}`
        });

        mapInstance.addLayer({
          id: layerId,
          type: 'fill',
          source: sourceId,
          'source-layer': layerName, // Ensure this matches your tippecanoe layer name
          layout: {
            'visibility': 'none' // Hidden by default until button is clicked
          },
          paint: {
            'fill-color': color,
            'fill-opacity': 0.5,
            'fill-outline-color': '#000000'
          }
        });
      }
    });
  };

  // Adjust path relative to where your HTML runs (e.g., pointing to your tiles folder)
  addPmTilesLayer(mapConstituency, 'villages-src', 'villages-layer', '../gujarat-data/tiles/gujarat_villages.pmtiles', 'gujarat_LGD_Villages', '#f59e0b');
  addPmTilesLayer(mapDistrict, 'roads-src', 'roads-layer', '../gujarat-data/tiles/gujarat_roads.pmtiles', 'gujarat_NIC_Roads', '#3b82f6');

  // 7. Layer Button Toggle Handling
  const bindToggleButton = (buttonText, mapInstance, layerId) => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes(buttonText)) {
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

  bindToggleButton('Village revenue limits', mapConstituency, 'villages-layer');
  bindToggleButton('PMGSY roads', mapDistrict, 'roads-layer');
});
