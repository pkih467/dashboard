// ==========================================
// app.js - MapLibre, Locked Dropdowns, AC-to-District Sync, & iCloud File Actions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Register PMTiles protocol
  let protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  // 2. MapLibre Styles Configuration
  const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  const commonConfig = {
    style: lightStyle,
    center: [71.5, 22.3], 
    zoom: 6.5
  };

  const mapConstituency = new maplibregl.Map({ ...commonConfig, container: 'map-constituency' });
  const mapDistrict = new maplibregl.Map({ ...commonConfig, container: 'map-district' });
  const mapTaluka = new maplibregl.Map({ ...commonConfig, container: 'map-taluka' });

  // 3. Force Map Resize Calculations
  const resizeMaps = () => {
    mapConstituency.resize();
    mapDistrict.resize();
    mapTaluka.resize();
  };

  window.addEventListener('load', () => setTimeout(resizeMaps, 300));
  window.addEventListener('resize', resizeMaps);

  // 4. Day / Night Mode Toggle Logic
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

  // 5. iCloud Import (⬇️) and Export (⬆️) Actions
  const importBtn = document.getElementById('import-btn');
  const exportBtn = document.getElementById('export-btn');

  if (importBtn) {
    importBtn.addEventListener('click', () => {
      // Opens file picker interface, allowing connection to iCloud Drive / Files app
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json,.geojson,.csv,.txt';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            console.log("Imported data from iCloud:", event.target.result);
            alert(`Successfully imported "${filename}" from iCloud.`);
          };
          reader.readAsText(file);
        }
      };
      fileInput.click();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      // Triggers data packaging to save directly into iCloud Files app
      const sampleData = JSON.stringify({ app: "Gujarat 2027", exportDate: new Date().toISOString() }, null, 2);
      const blob = new Blob([sampleData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gujarat_app_state.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // 6. Assembly Dropdown & District Dropdown Synchronization (Item 8)
  const selects = document.querySelectorAll('select');
  if (selects.length >= 2) {
    const acDropdown = selects[0];       // Assembly Constituency (Locked configuration)
    const districtDropdown = selects[1];  // District (Locked configuration)

    acDropdown.addEventListener('change', (e) => {
      const selectedValue = e.target.value; // e.g. "11. Vadgam [Banaskantha]"
      const match = selectedValue.match(/\[(.*?)\]/);
      
      if (match && match[1]) {
        const targetDistrict = match[1]; // e.g. "Banaskantha"
        
        for (let i = 0; i < districtDropdown.options.length; i++) {
          if (districtDropdown.options[i].text.includes(targetDistrict)) {
            districtDropdown.selectedIndex = i;
            districtDropdown.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
    });
  }
});
