// ==========================================
// app.js - Synchronized Dropdowns & Map Management
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  const mapConfig = { style: lightStyle, center: [71.5, 22.3], zoom: 6.5 };

  const mapConstituency = new maplibregl.Map({ ...mapConfig, container: 'map-constituency' });
  const mapDistrict = new maplibregl.Map({ ...mapConfig, container: 'map-district' });
  const mapTaluka = new maplibregl.Map({ ...mapConfig, container: 'map-taluka' });

  const resizeMaps = () => {
    mapConstituency.resize();
    mapDistrict.resize();
    mapTaluka.resize();
  };

  window.addEventListener('load', () => setTimeout(resizeMaps, 300));

  // Tab Switching
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
        if (targetId === 'map-section') setTimeout(resizeMaps, 100);
      }
    });
  });

  // Synchronized Dropdown Logic for Side-by-Side Filters
  const assemblyDropdown = document.getElementById('filter-assembly');
  const districtDropdown = document.getElementById('filter-district');
  const talukaDropdown = document.getElementById('filter-taluka');

  if (assemblyDropdown && districtDropdown && talukaDropdown) {
    // Populate Initial Options from GujaratRelationalData
    GujaratRelationalData.districts.forEach(dist => {
      const dOpt = document.createElement('option');
      dOpt.value = dist.name;
      dOpt.textContent = dist.name;
      districtDropdown.appendChild(dOpt);

      dist.assemblies.forEach(ac => {
        const aOpt = document.createElement('option');
        aOpt.value = ac;
        aOpt.textContent = ac;
        aOpt.dataset.district = dist.name;
        assemblyDropdown.appendChild(aOpt);
      });
    });

    // 1. Assembly Chosen -> Automatically update District & Taluka
    assemblyDropdown.addEventListener('change', (e) => {
      const selectedAC = e.target.selectedOptions[0];
      if (!selectedAC || !selectedAC.dataset.district) return;

      const parentDistrict = selectedAC.dataset.district;
      districtDropdown.value = parentDistrict;

      // Update Talukas based on parent district
      updateTalukasForDistrict(parentDistrict);
      mapConstituency.flyTo({ center: [71.2 + Math.random() * 0.4, 22.3 + Math.random() * 0.4], zoom: 10 });
    });

    // 2. District Chosen -> Automatically adjust Assembly options & Talukas
    districtDropdown.addEventListener('change', (e) => {
      const selectedDistrict = e.target.value;
      if (!selectedDistrict) return;

      // Find first matching assembly in this district
      const matchingAC = Array.from(assemblyDropdown.options).find(opt => opt.dataset.district === selectedDistrict);
      if (matchingAC) {
        assemblyDropdown.value = matchingAC.value;
      }

      updateTalukasForDistrict(selectedDistrict);
      mapDistrict.flyTo({ center: [71.3 + Math.random() * 0.3, 22.4 + Math.random() * 0.3], zoom: 9 });
    });

    talukaDropdown.addEventListener('change', () => {
      mapTaluka.flyTo({ center: [71.4 + Math.random() * 0.2, 22.2 + Math.random() * 0.2], zoom: 11 });
    });
  }

  function updateTalukasForDistrict(districtName) {
    talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
    const foundDist = GujaratRelationalData.districts.find(d => d.name === districtName);
    if (foundDist && foundDist.talukas) {
      foundDist.talukas.forEach(tal => {
        const tOpt = document.createElement('option');
        tOpt.value = tal;
        tOpt.textContent = tal;
        talukaDropdown.appendChild(tOpt);
      });
    }
  }

  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeIcon.textContent = isDark ? '☀️' : '🌙';
      const activeStyle = isDark ? darkStyle : lightStyle;
      mapConstituency.setStyle(activeStyle);
      mapDistrict.setStyle(activeStyle);
      mapTaluka.setStyle(activeStyle);
    });
  }
});
