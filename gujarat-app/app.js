// ==========================================
// app.js - Sync Logic & Map Controller
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Setup MapLibre GL
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  const map = new maplibregl.Map({
    container: 'map-container',
    style: lightStyle,
    center: [71.5, 22.3], // Gujarat center
    zoom: 6.5
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

  // Dropdown Logic Elements
  const assemblyDropdown = document.getElementById('filter-assembly');
  const districtDropdown = document.getElementById('filter-district');
  const talukaDropdown = document.getElementById('filter-taluka');

  // Load Unfiltered Defaults
  window.resetFiltersAndMap = function() {
    assemblyDropdown.innerHTML = '<option value="">-- All Assemblies --</option>';
    districtDropdown.innerHTML = '<option value="">-- All Districts --</option>';
    talukaDropdown.innerHTML = '<option value="">-- Talukas --</option>';

    GujaratRelationalData.allDistricts.forEach(d => districtDropdown.innerHTML += `<option value="${d}">${d}</option>`);
    GujaratRelationalData.allAssemblies.forEach(a => assemblyDropdown.innerHTML += `<option value="${a}">${a}</option>`);
    
    map.flyTo({ center: [71.5, 22.3], zoom: 6.5, duration: 1000 });
  };

  resetFiltersAndMap();

  // 1. Assembly Chosen -> STRICTLY Restrict District & Talukas
  assemblyDropdown.addEventListener('change', (e) => {
    const selectedAC = e.target.value;
    if (!selectedAC) return resetFiltersAndMap();

    const parentDistObj = GujaratRelationalData.districts.find(d => d.assemblies.includes(selectedAC));
    
    if (parentDistObj) {
      // Wipe and lock District to ONLY the matching one
      districtDropdown.innerHTML = `<option value="${parentDistObj.name}">${parentDistObj.name}</option>`;
      
      // Wipe and lock Talukas to ONLY the ones in that District
      talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
      parentDistObj.talukas.forEach(t => talukaDropdown.innerHTML += `<option value="${t}">${t}</option>`);
    }

    // Camera moves to Assembly level zoom
    map.flyTo({ center: [72.95, 20.35], zoom: 11, duration: 1200 }); // Dummy coordinates, replaced dynamically by geojson data bounds later
  });

  // 2. District Chosen -> STRICTLY Restrict Assemblies & Talukas
  districtDropdown.addEventListener('change', (e) => {
    const selectedDist = e.target.value;
    if (!selectedDist) return resetFiltersAndMap();

    const distObj = GujaratRelationalData.districts.find(d => d.name === selectedDist);
    if (distObj) {
      // Wipe and lock Assembly dropdown to ONLY assemblies inside this district
      assemblyDropdown.innerHTML = '<option value="">-- Choose Assembly --</option>';
      distObj.assemblies.forEach(a => assemblyDropdown.innerHTML += `<option value="${a}">${a}</option>`);

      // Wipe and lock Talukas to ONLY this district
      talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
      distObj.talukas.forEach(t => talukaDropdown.innerHTML += `<option value="${t}">${t}</option>`);
    }

    // Camera moves to District level zoom
    map.flyTo({ center: [72.95, 20.45], zoom: 9, duration: 1200 });
  });

  // 3. Taluka Chosen -> Zoom further
  talukaDropdown.addEventListener('change', (e) => {
    if (e.target.value) {
      map.flyTo({ zoom: 12, duration: 1200 });
    }
  });

  // Theme Toggler
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
