// ==========================================
// app.js - Side-by-Side Filter Logic & Map Control
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  const map = new maplibregl.Map({
    container: 'map-container',
    style: lightStyle,
    center: [71.5, 22.3],
    zoom: 7
  });

  window.addEventListener('load', () => setTimeout(() => map.resize(), 300));

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
        if (targetId === 'map-section') setTimeout(() => map.resize(), 100);
      }
    });
  });

  // Populate Dropdowns & Manage Relational Filtering
  const assemblyDropdown = document.getElementById('filter-assembly');
  const districtDropdown = document.getElementById('filter-district');
  const talukaDropdown = document.getElementById('filter-taluka');

  function initDropdowns() {
    assemblyDropdown.innerHTML = '<option value="">-- Choose Assembly --</option>';
    districtDropdown.innerHTML = '<option value="">-- Choose District --</option>';
    talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';

    // Populate Districts
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
  }

  initDropdowns();

  // 1. Assembly Chosen -> Filter District & Talukas to matching parent only
  assemblyDropdown.addEventListener('change', (e) => {
    const selectedAC = e.target.value;
    if (!selectedAC) {
      initDropdowns();
      return;
    }

    // Find parent district
    let parentDist = "";
    for (let dist of GujaratRelationalData.districts) {
      if (dist.assemblies.includes(selectedAC)) {
        parentDist = dist.name;
        break;
      }
    }

    if (parentDist) {
      districtDropdown.value = parentDist;
      
      // Restrict Talukas to this district only
      talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';
      const distObj = GujaratRelationalData.districts.find(d => d.name === parentDist);
      if (distObj && distObj.talukas) {
        distObj.talukas.forEach(tal => {
          const tOpt = document.createElement('option');
          tOpt.value = tal;
          tOpt.textContent = tal;
          talukaDropdown.appendChild(tOpt);
        });
      }
    }

    // Zoom camera to region
    map.flyTo({ center: [72.9 + Math.random()*0.1, 20.3 + Math.random()*0.1], zoom: 12, duration: 1000 });
  });

  // 2. District Chosen -> Filter Assemblies & Talukas to this district only
  districtDropdown.addEventListener('change', (e) => {
    const selectedDistrict = e.target.value;
    if (!selectedDistrict) {
      initDropdowns();
      return;
    }

    // Filter Assemblies dropdown to match this district only
    assemblyDropdown.innerHTML = '<option value="">-- Choose Assembly --</option>';
    talukaDropdown.innerHTML = '<option value="">-- Choose Taluka --</option>';

    const distObj = GujaratRelationalData.districts.find(d => d.name === selectedDistrict);
    if (distObj) {
      distObj.assemblies.forEach(ac => {
        const aOpt = document.createElement('option');
        aOpt.value = ac;
        aOpt.textContent = ac;
        aOpt.dataset.district = distObj.name;
        assemblyDropdown.appendChild(aOpt);
      });

      distObj.talukas.forEach(tal => {
        const tOpt = document.createElement('option');
        tOpt.value = tal;
        tOpt.textContent = tal;
        talukaDropdown.appendChild(tOpt);
      });
    }

    map.flyTo({ center: [72.9, 20.5], zoom: 9, duration: 1000 });
  });

  talukaDropdown.addEventListener('change', () => {
    map.flyTo({ zoom: 13, duration: 800 });
  });

  window.resetGujaratBounds = function() {
    initDropdowns();
    map.flyTo({ center: [71.5, 22.3], zoom: 7, duration: 800 });
  };

  // Day/Night Theme Toggle
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
