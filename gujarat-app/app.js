// Minimal MapLibre viewer: loads a GeoJSON produced by filter_gujarat.py
const map = new maplibregl.Map({
  container: 'map',
  style: {
    "version": 8,
    "sources": {},
    "layers": [{ "id":"background","type":"background","paint":{"background-color":"#eef"}}]
  },
  center: [72.6, 23.2],
  zoom: 6
});

// NAME of a small example GeoJSON you committed to gujarat-data/filtered
const sampleGeo = '/gujarat-data/filtered/gujarat_LGD_Subdistricts.geojson';

async function loadGeo() {
  try {
    const res = await fetch(sampleGeo);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    map.addSource('subdistricts', { type: 'geojson', data });
    map.addLayer({
      id: 'subdistricts-fill',
      type: 'fill',
      source: 'subdistricts',
      paint: { 'fill-color': '#8884', 'fill-outline-color': '#444' }
    });
    map.addLayer({
      id: 'subdistricts-line',
      type: 'line',
      source: 'subdistricts',
      paint: { 'line-color': '#333', 'line-width': 1 }
    });
    populateFilters(data);
  } catch (e) {
    console.warn("Could not load sample geojson:", e);
  }
}

function populateFilters(geojson) {
  const keySel = document.getElementById('filterKey');
  const valSel = document.getElementById('filterValue');
  function updateValues() {
    const k = keySel.value;
    valSel.innerHTML = '<option value="">— choose —</option>';
    if (!k) return;
    const vals = new Set(geojson.features.map(f => (f.properties||{})[k]).filter(Boolean));
    Array.from(vals).sort().forEach(v => {
      const o = document.createElement('option'); o.value = v; o.textContent = v; valSel.appendChild(o);
    });
  }
  keySel.addEventListener('change', updateValues);
  valSel.addEventListener('change', () => {
    const k = keySel.value, v = valSel.value;
    if (!k || !v) {
      map.setFilter('subdistricts-fill', null);
      map.setFilter('subdistricts-line', null);
      return;
    }
    map.setFilter('subdistricts-fill', ['==', ['get', k], v]);
    map.setFilter('subdistricts-line', ['==', ['get', k], v]);
    // zoom to first matching feature
    const f = geojson.features.find(fe => (fe.properties||{})[k] === v);
    if (f && f.geometry) {
      const bbox = turf.bbox(f);
      map.fitBounds([[bbox[0], bbox[1]],[bbox[2], bbox[3]]], { padding: 20 });
    }
  });
}

map.on('load', loadGeo);
map.on('click', 'subdistricts-fill', (e) => {
  const props = e.features?.[0]?.properties || {};
  const txt = Object.entries(props).map(([k,v]) => `${k}: ${v}`).join('\n');
  new maplibregl.Popup().setLngLat(e.lngLat).setText(txt).addTo(map);
});
