// ==========================================
// app.js - Sync Logic & Map Controller
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const lightStyle = {
    version: 8,
    sources: {
      'carto-light': {
        type: 'raster',
        tiles: ['https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }
    },
    layers: [{ id: 'carto-light-layer', type: 'raster', source: 'carto-light', minzoom: 0, maxzoom: 19 }]
  };

  const darkStyle = {
    version: 8,
    sources: {
      'carto-dark': {
        type: 'raster',
        tiles: ['https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }
    },
    layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark', minzoom: 0, maxzoom: 19 }]
  };

  const map = new maplibregl.Map({
    container: 'map-container',
    style: lightStyle,
    center: [71.5, 22.3],
    zoom: 7
  });

  window.addEventListener('load', () => setTimeout(() => map.resize(), 300));
  window.addEventListener('resize', () => map.resize());

  // Tab Navigation Logic
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      
      document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.style.display = 'block';
        if (targetId === 'map-section') setTimeout(() => map.resize(), 150);
      }
    });
  });

  const assemblyDropdown = document.getElementById('filter-assembly');
  const districtDropdown = document.getElementById('filter-district');
  const talukaDropdown = document.getElementById('filter-taluka');

  window.resetFiltersAndMap = function() {
    assemblyDropdown.innerHTML = '<option value="">-- All Assemblies --</option>';
    districtDropdown.innerHTML = '<option value="">-- All Districts --</option>';
    talukaDropdown.innerHTML = '<option value="">-- Talukas --</option>';

    GujaratRelationalData.allDistricts.forEach(d => districtDropdown.innerHTML += `<option value="${d}">${d}</option>`);
    GujaratRelationalData.allAssemblies.forEach(a => assemblyDropdown.innerHTML += `<option value="${a}">${a}</option>`);
    
    map.flyTo({ center: [71.5, 22.3], zoom: 7, duration: 1000 });
  };

  resetFiltersAndMap();

  // 1. Assembly Chosen -> Strictly limit District & Talukas to parent only
  assemblyDropdown.addEventListener('change', (e) => {
    const selectedAC = e.target.value;
    if (!selectedAC) return resetFiltersAndMap();

    const parentDistObj = GujaratRelationalData.districts.find(d => d.assemblies.includes(selectedAC));
    
    if (parentDistObj) {
      districtDropdown.innerHTML = `<option value="${parentDistObj.name}">${parentDistObj.name}</option>`;
      districtDropdown.value = parentDistObj.name;
      
      talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
      parentDistObj.talukas.forEach(t => talukaDropdown.innerHTML += `<option value="${t}">${t}</option>`);
    }

    map.flyTo({ center: [70.15, 23.08], zoom: 10, duration: 1200 });
  });

  // 2. District Chosen -> Strictly limit Assemblies & Talukas to this district
  districtDropdown.addEventListener('change', (e) => {
    const selectedDist = e.target.value;
    if (!selectedDist) return resetFiltersAndMap();

    const distObj = GujaratRelationalData.districts.find(d => d.name === selectedDist);
    if (distObj) {
      assemblyDropdown.innerHTML = '<option value="">-- Choose Assembly --</option>';
      distObj.assemblies.forEach(a => assemblyDropdown.innerHTML += `<option value="${a}">${a}</option>`);

      talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
      distObj.talukas.forEach(t => talukaDropdown.innerHTML += `<option value="${t}">${t}</option>`);
    }

    map.flyTo({ center: [71.2, 22.5], zoom: 9, duration: 1200 });
  });

  talukaDropdown.addEventListener('change', (e) => {
    if (e.target.value) {
      map.flyTo({ zoom: 12, duration: 1200 });
    }
  });

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeIcon.textContent = isDark ? '☀️' : '🌙';
      map.setStyle(isDark ? darkStyle : lightStyle);
    });
  }
});
