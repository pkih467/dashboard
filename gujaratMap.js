// ==========================================
// gujaratMap.js - Interactive Gujarat State Map
// ==========================================

let map;
let activeLayer = null;
let boundaryLayers = {
  districts: false,
  assembly: false,
  talukas: false,
  subTalukas: false,
  villages: false,
  pollingStations: false
};

let roadLayers = {
  stateHighways: false,
  urbanRoads: false,
  districtRoads: false,
  villageRoads: false
};

// Initialize map
function initializeGujaratMap() {
  const mapContainer = document.getElementById('maplibre-container');
  if (!mapContainer) return;

  // Using Leaflet with OpenStreetMap
  map = L.map('maplibre-container').setView([22.5, 72.5], 8);

  // Add base tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    minZoom: 6
  }).addTo(map);

  // Setup boundary toggles UI
  setupBoundaryToggles();

  // Setup road toggles UI
  setupRoadToggles();

  // Add map controls
  L.control.scale().addTo(map);

  // Setup search functionality
  setupDistrictSearch();
}

// Setup boundary toggle UI
function setupBoundaryToggles() {
  const controlCard = document.querySelector('.map-control-card');
  if (!controlCard) return;

  // Create boundary toggles section
  const boundarySection = document.createElement('div');
  boundarySection.style.marginTop = '16px';
  boundarySection.style.borderTop = '2px solid var(--border-color)';
  boundarySection.style.paddingTop = '12px';

  const boundaryLabel = document.createElement('label');
  boundaryLabel.style.fontSize = '10px';
  boundaryLabel.style.fontWeight = '800';
  boundaryLabel.style.color = 'var(--primary)';
  boundaryLabel.style.textTransform = 'uppercase';
  boundaryLabel.style.letterSpacing = '0.6px';
  boundaryLabel.textContent = 'Boundaries';
  boundarySection.appendChild(boundaryLabel);

  const boundaryToggles = document.createElement('div');
  boundaryToggles.className = 'boundary-toggles';
  boundaryToggles.style.display = 'flex';
  boundaryToggles.style.flexWrap = 'wrap';
  boundaryToggles.style.gap = '6px';
  boundaryToggles.style.marginTop = '8px';

  const boundaryOptions = [
    { key: 'districts', label: 'Districts' },
    { key: 'assembly', label: 'Assembly' },
    { key: 'talukas', label: 'Talukas' },
    { key: 'subTalukas', label: 'Sub-Talukas' },
    { key: 'villages', label: 'Villages' },
    { key: 'pollingStations', label: 'Polling Stations' }
  ];

  boundaryOptions.forEach(option => {
    const chip = document.createElement('button');
    chip.className = 'boundary-chip';
    chip.textContent = option.label;
    chip.style.fontSize = '10px';
    chip.style.fontWeight = '800';
    chip.style.padding = '6px 10px';
    chip.style.borderRadius = '6px';
    chip.style.border = '1px solid var(--border-color)';
    chip.style.backgroundColor = 'var(--bg-color)';
    chip.style.color = 'var(--text-muted)';
    chip.style.cursor = 'pointer';
    chip.style.transition = 'all 0.2s';

    chip.addEventListener('click', () => {
      boundaryLayers[option.key] = !boundaryLayers[option.key];
      if (boundaryLayers[option.key]) {
        chip.style.backgroundColor = 'var(--primary)';
        chip.style.color = '#fff';
        chip.style.borderColor = 'var(--primary)';
        toggleBoundaryLayer(option.key, option.label);
      } else {
        chip.style.backgroundColor = 'var(--bg-color)';
        chip.style.color = 'var(--text-muted)';
        chip.style.borderColor = 'var(--border-color)';
        removeBoundaryLayer(option.key);
      }
    });

    boundaryToggles.appendChild(chip);
  });

  boundarySection.appendChild(boundaryToggles);
  controlCard.appendChild(boundarySection);
}

// Setup road toggle UI
function setupRoadToggles() {
  const controlCard = document.querySelector('.map-control-card');
  if (!controlCard) return;

  const roadSection = document.createElement('div');
  roadSection.style.marginTop = '16px';
  roadSection.style.borderTop = '2px solid var(--border-color)';
  roadSection.style.paddingTop = '12px';

  const roadLabel = document.createElement('label');
  roadLabel.style.fontSize = '10px';
  roadLabel.style.fontWeight = '800';
  roadLabel.style.color = 'var(--primary)';
  roadLabel.style.textTransform = 'uppercase';
  roadLabel.style.letterSpacing = '0.6px';
  roadLabel.textContent = 'Roads';
  roadSection.appendChild(roadLabel);

  const roadToggles = document.createElement('div');
  roadToggles.style.display = 'flex';
  roadToggles.style.flexWrap = 'wrap';
  roadToggles.style.gap = '6px';
  roadToggles.style.marginTop = '8px';

  const roadOptions = [
    { key: 'stateHighways', label: 'State Highways', color: '#FF5733' },
    { key: 'urbanRoads', label: 'Urban Roads', color: '#33FF57' },
    { key: 'districtRoads', label: 'District Roads', color: '#3357FF' },
    { key: 'villageRoads', label: 'Village Roads', color: '#FFD700' }
  ];

  roadOptions.forEach(option => {
    const chip = document.createElement('button');
    chip.textContent = option.label;
    chip.style.fontSize = '10px';
    chip.style.fontWeight = '800';
    chip.style.padding = '6px 10px';
    chip.style.borderRadius = '6px';
    chip.style.border = '2px solid ' + option.color;
    chip.style.backgroundColor = 'var(--bg-color)';
    chip.style.color = 'var(--text-muted)';
    chip.style.cursor = 'pointer';
    chip.style.transition = 'all 0.2s';

    chip.addEventListener('click', () => {
      roadLayers[option.key] = !roadLayers[option.key];
      if (roadLayers[option.key]) {
        chip.style.backgroundColor = option.color;
        chip.style.color = '#fff';
        toggleRoadLayer(option.key, option.color);
      } else {
        chip.style.backgroundColor = 'var(--bg-color)';
        chip.style.color = 'var(--text-muted)';
        removeRoadLayer(option.key);
      }
    });

    roadToggles.appendChild(chip);
  });

  roadSection.appendChild(roadToggles);
  controlCard.appendChild(roadSection);
}

// Toggle boundary layer visibility
function toggleBoundaryLayer(layerKey, layerName) {
  if (boundaryLayers[layerKey]) {
    loadBoundaryLayer(layerKey, layerName);
  } else {
    removeBoundaryLayer(layerKey);
  }
}

// Load boundary layer
function loadBoundaryLayer(layerKey, layerName) {
  const colors = {
    districts: '#E74C3C',
    assembly: '#3498DB',
    talukas: '#2ECC71',
    subTalukas: '#F39C12',
    villages: '#9B59B6',
    pollingStations: '#E91E63'
  };

  if (layerKey === 'districts') {
    drawDistrictBoundaries();
  } else if (layerKey === 'assembly') {
    drawAssemblyBoundaries();
  } else if (layerKey === 'talukas') {
    drawTalukaBoundaries();
  } else if (layerKey === 'pollingStations') {
    drawPollingStations();
  }
}

// Remove boundary layer
function removeBoundaryLayer(layerKey) {
  map.eachLayer(layer => {
    if (layer._layerName === layerKey) {
      map.removeLayer(layer);
    }
  });
}

// Draw district boundaries
function drawDistrictBoundaries() {
  const districts = [...new Set(GujaratFullData.map(d => d.district))];
  
  districts.forEach(district => {
    const districtACs = GujaratFullData.filter(d => d.district === district);
    if (districtACs.length === 0) return;

    // Get bounding coordinates
    const coords = districtACs.map(ac => ac.acCoords).filter(c => c);
    if (coords.length === 0) return;

    const minLat = Math.min(...coords.map(c => c[0]));
    const maxLat = Math.max(...coords.map(c => c[0]));
    const minLng = Math.min(...coords.map(c => c[1]));
    const maxLng = Math.max(...coords.map(c => c[1]));

    // Create boundary rectangle
    const bounds = [
      [minLat - 0.1, minLng - 0.1],
      [maxLat + 0.1, maxLng + 0.1]
    ];

    const rectangle = L.rectangle(bounds, {
      color: '#E74C3C',
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.1,
      dashArray: '5, 5'
    }).addTo(map);

    rectangle._layerName = 'districts';
    rectangle.bindPopup(`<strong>${district} District</strong><br>Constituencies: ${districtACs.length}`);
  });
}

// Draw assembly boundaries
function drawAssemblyBoundaries() {
  GujaratFullData.forEach(ac => {
    if (ac.acCoords) {
      const circle = L.circleMarker(ac.acCoords, {
        radius: 6,
        fillColor: '#3498DB',
        color: '#2C3E50',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.6
      }).addTo(map);

      circle._layerName = 'assembly';
      circle.bindPopup(`<strong>${ac.assembly}</strong><br>District: ${ac.district}`);
    }
  });
}

// Draw taluka boundaries
function drawTalukaBoundaries() {
  const talukas = new Map();

  GujaratFullData.forEach(ac => {
    ac.talukas.forEach(taluka => {
      if (!talukas.has(taluka)) {
        talukas.set(taluka, []);
      }
      if (ac.acCoords) {
        talukas.get(taluka).push(ac.acCoords);
      }
    });
  });

  talukas.forEach((coords, talukaName) => {
    if (coords.length > 0) {
      const avgLat = coords.reduce((a, b) => a + b[0], 0) / coords.length;
      const avgLng = coords.reduce((a, b) => a + b[1], 0) / coords.length;

      const marker = L.circleMarker([avgLat, avgLng], {
        radius: 5,
        fillColor: '#2ECC71',
        color: '#27AE60',
        weight: 1,
        opacity: 0.7,
        fillOpacity: 0.7
      }).addTo(map);

      marker._layerName = 'talukas';
      marker.bindPopup(`<strong>${talukaName}</strong><br>Taluka`);
    }
  });
}

// Draw polling stations
function drawPollingStations() {
  GujaratFullData.forEach((ac, index) => {
    if (ac.acCoords) {
      // Add random polling stations around each AC
      const stationsCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < stationsCount; i++) {
        const offset = 0.02;
        const lat = ac.acCoords[0] + (Math.random() - 0.5) * offset;
        const lng = ac.acCoords[1] + (Math.random() - 0.5) * offset;

        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            html: '<div style="background: #E91E63; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">P</div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).addTo(map);

        marker._layerName = 'pollingStations';
        marker.bindPopup(`<strong>Polling Booth ${i + 1}</strong><br>AC: ${ac.assembly}`);
      }
    }
  });
}

// Toggle road layer visibility
function toggleRoadLayer(layerKey, color) {
  if (roadLayers[layerKey]) {
    drawRoadNetwork(layerKey, color);
  } else {
    removeRoadLayer(layerKey);
  }
}

// Draw road networks
function drawRoadNetwork(layerKey, color) {
  const roadConfigs = {
    stateHighways: { weight: 4, dashArray: 'none' },
    urbanRoads: { weight: 3, dashArray: 'none' },
    districtRoads: { weight: 2, dashArray: '3, 3' },
    villageRoads: { weight: 1, dashArray: '5, 5' }
  };

  const config = roadConfigs[layerKey];
  const bounds = map.getBounds();

  // Create sample road network
  const sampleRoads = [
    [[68, 22], [75, 22]],
    [[68, 23], [75, 23]],
    [[70, 20], [70, 25]],
    [[71, 20], [71, 25]],
    [[72, 20], [72, 25]]
  ];

  sampleRoads.forEach(roadCoords => {
    const polyline = L.polyline(roadCoords, {
      color: color,
      weight: config.weight,
      opacity: 0.7,
      dashArray: config.dashArray
    }).addTo(map);

    polyline._layerName = keyType;
  });
}

// Remove road layer
function removeRoadLayer(layerKey) {
  map.eachLayer(layer => {
    if (layer._layerName === layerKey) {
      map.removeLayer(layer);
    }
  });
}

// Setup district search
function setupDistrictSearch() {
  const districtSelect = document.getElementById('filter-district');
  const acSelect = document.getElementById('filter-assembly');

  if (!districtSelect) return;

  const districts = [...new Set(GujaratFullData.map(d => d.district))].sort();
  districts.forEach(district => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    districtSelect.appendChild(option);
  });

  districtSelect.addEventListener('change', (e) => {
    const selectedDistrict = e.target.value;
    if (selectedDistrict && acSelect) {
      const acs = GujaratFullData.filter(d => d.district === selectedDistrict);
      acSelect.innerHTML = '<option value="">-- All Seats --</option>';
      acs.forEach(ac => {
        const option = document.createElement('option');
        option.value = ac.assembly;
        option.textContent = ac.assembly;
        acSelect.appendChild(option);
      });

      // Focus map on district
      if (acs.length > 0 && acs[0].distCoords) {
        map.setView(acs[0].distCoords, 10);
      }
    }
  });

  if (acSelect) {
    acSelect.addEventListener('change', (e) => {
      const selectedAC = e.target.value;
      if (selectedAC) {
        const ac = GujaratFullData.find(d => d.assembly === selectedAC);
        if (ac && ac.acCoords) {
          map.setView(ac.acCoords, 12);
          map.fireEvent('popup', { latlng: L.latLng(ac.acCoords) });
        }
      }
    });
  }
}

// Initialize map when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load Leaflet CSS and JS if not already loaded
  if (!window.L) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      initializeGujaratMap();
    };
    document.head.appendChild(script);
  } else {
    initializeGujaratMap();
  }
});

// Reinitialize map when switching to Map tab
function onMapTabSwitch() {
  setTimeout(() => {
    if (map) {
      map.invalidateSize();
    } else {
      initializeGujaratMap();
    }
  }, 100);
}
