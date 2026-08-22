// Example initialization block in app.js
const map = new maplibregl.Map({
  container: 'map',
  style: 'your-style-url.json',
  center: [72.5714, 23.0225], // Gujarat coordinates
  zoom: 7
});

// Force render refresh
map.on('load', () => {
  map.resize();
});
