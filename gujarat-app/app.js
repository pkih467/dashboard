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
    if (!assemblyDropdown || !districtDropdown || !talukaDropdown) return;
    assemblyDropdown.innerHTML = '<option value="">-- All Assemblies --</option>';
    districtDropdown.innerHTML = '<option value="">-- All Districts --</option>';
    talukaDropdown.innerHTML = '<option value="">-- Talukas --</option>';

    if (typeof GujaratRelationalData !== 'undefined') {
      GujaratRelationalData.allDistricts.forEach(d => districtDropdown.innerHTML += `<option value="${d}">${d}</option>`);
      GujaratRelationalData.allAssemblies.forEach(a => assemblyDropdown.innerHTML += `<option value="${a}">${a}</option>`);
    }
    
    map.flyTo({ center: [71.5, 22.3], zoom: 7, duration: 1000 });
  };

  if (assemblyDropdown && districtDropdown && talukaDropdown) {
    resetFiltersAndMap();

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
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      if(themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
      map.setStyle(isDark ? darkStyle : lightStyle);
    });
  }
});

// ==========================================
// SEATS TAB CONTROLLER SCRIPT (Standalone)
// ==========================================

const allGujaratACs = [
  "1 - Abdasa", "2 - Mandvi", "3 - Bhuj", "4 - Anjar", "5 - Gandhidham", "6 - Rapar",
  "39 - Viramgam", "40 - Sanand", "41 - Ghatlodia", "42 - Vejalpur", "43 - Vatva", 
  "44 - Ellisbridge", "45 - Naranpura", "46 - Nikol", "47 - Naroda", "48 - Thakkarbapa Nagar", 
  "49 - Bapunagar", "50 - Amraiwadi", "51 - Dariapur", "52 - Jamalpur-Khadia", "53 - Maninagar", 
  "54 - Danilimda", "55 - Sabarmati", "56 - Asarwa", "57 - Daskroi", "58 - Dholka", "59 - Dhandhuka",
  "155 - Olpad", "156 - Mangrol", "157 - Mandvi", "158 - Kamrej", "159 - Surat East", 
  "160 - Surat North", "161 - Varachha Road", "162 - Karanj", "163 - Limbayat", "164 - Udhna", 
  "165 - Majura", "166 - Katargam", "167 - Surat West", "168 - Choryasi", "169 - Bardoli", "170 - Mahuva",
  "178 - Dharampur", "179 - Valsad", "180 - Pardi", "181 - Kaprada", "182 - Umbergaon"
];

window.addEventListener('DOMContentLoaded', () => {
  const acSelect = document.getElementById('seatsAcSelect');
  if (acSelect) {
    allGujaratACs.forEach(ac => {
      acSelect.innerHTML += `<option value="${ac}">${ac}</option>`;
    });
  }
  loadSeatsData();
});

function parseCSVLine(text) {
  let result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function loadCSVData(year) {
  try {
    let response = await fetch(`AE_Gujarat_${year}.csv`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let text = await response.text();
    let lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return null;

    let headers = parseCSVLine(lines[0]);
    let records = [];

    for (let i = 1; i < lines.length; i++) {
      let data = parseCSVLine(lines[i]);
      if (data.length >= headers.length) {
        let obj = {};
        headers.forEach((h, idx) => { obj[h] = data[idx] || ''; });
        records.push(obj);
      }
    }
    return { headers, records };
  } catch (err) {
    console.warn(`Could not load AE_Gujarat_${year}.csv`, err);
    return null;
  }
}

async function loadSeatsData() {
  const yearSelect = document.getElementById('seatsYearSelect');
  const acSelect = document.getElementById('seatsAcSelect');
  const container = document.getElementById('seatsContainer');

  if (!container || !yearSelect || !acSelect) return;

  const yearVal = yearSelect.value;
  const acVal = acSelect.value;

  container.innerHTML = `<div style="text-align: center; padding: 40px; font-weight: 700; color: var(--text-muted);">Analyzing election dataset for ${yearVal}...</div>`;

  let yearsToProcess = yearVal === 'ALL' ? ['2022', '2017', '2012'] : [yearVal];
  let htmlOutput = '';

  for (const yr of yearsToProcess) {
    let csvData = await loadCSVData(yr);

    if (!csvData || csvData.records.length === 0) {
      htmlOutput += `
        <div class="panel" style="border: 2px dashed var(--border-color); border-radius: 18px; padding: 25px; text-align: center;">
          <h3 style="margin: 0; font-weight: 800; color: var(--primary);">Gujarat Election ${yr}</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Please ensure <code>AE_Gujarat_${yr}.csv</code> is present in your root directory.</p>
        </div>`;
      continue;
    }

    let acMap = {};
    csvData.records.forEach(row => {
      let acKey = row.AC_Name || row.Constituency || row.AC || Object.values(row)[1] || 'Unknown';
      if (acVal && !acKey.toLowerCase().includes(acVal.toLowerCase())) return;

      if (!acMap[acKey]) acMap[acKey] = [];
      acMap[acKey].push(row);
    });

    for (const [acName, rows] of Object.entries(acMap)) {
      rows.sort((a, b) => {
        let vA = parseInt(a.Votes || a.Total_Votes || a.EVm_Votes || Object.values(a)[4] || 0) || 0;
        let vB = parseInt(b.Votes || b.Total_Votes || b.EVm_Votes || Object.values(b)[4] || 0) || 0;
        return vB - vA;
      });

      let pos1 = rows[0] || {};
      let pos2 = rows[1] || {};

      let p1Votes = parseInt(pos1.Votes || pos1.Total_Votes || Object.values(pos1)[4] || 0);
      let p2Votes = parseInt(pos2.Votes || pos2.Total_Votes || Object.values(pos2)[4] || 0);
      let margin = p1Votes - p2Votes;

      htmlOutput += `
        <div class="panel" style="background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 18px; padding: 22px; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 900; color: var(--text-main);">📍 ${acName} <span style="font-size: 12px; font-weight: 700; background: var(--bg-color); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border-color); margin-left: 8px;">Year: ${yr}</span></h3>
            <div style="font-size: 13px; font-weight: 800; color: #0d6efd; background: rgba(13,110,253,0.1); padding: 6px 12px; border-radius: 10px;">Winning Margin: ${margin.toLocaleString()} Votes</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: linear-gradient(135deg, #d1e7dd 0%, #badbcc 100%); border: 2px solid #a3cfbb; border-radius: 14px; padding: 18px; color: #0f5132;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥇 Position 1 (Winner)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos1.Candidate || pos1.Candidate_Name || Object.values(pos1)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos1.Party || pos1.Party_Name || Object.values(pos1)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(15,81,50,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p1Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos1.Vote_Share || pos1.Percentage || '—'}%</strong></div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border: 2px solid #ffecb5; border-radius: 14px; padding: 18px; color: #664d03;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥈 Position 2 (Runner-Up)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos2.Candidate || pos2.Candidate_Name || Object.values(pos2)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos2.Party || pos2.Party_Name || Object.values(pos2)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(102,77,3,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p2Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos2.Vote_Share || pos2.Percentage || '—'}%</strong></div>
              </div>
            </div>
          </div>

          <details style="margin-top: 14px; font-size: 12px; font-weight: 700; color: var(--text-muted); cursor: pointer;">
            <summary style="outline: none; padding: 4px 0;">🔍 Inspect All Source Columns (Position 1 & 2 Raw Data)</summary>
            <div style="background: var(--bg-color); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; margin-top: 8px; font-family: monospace; font-size: 11px; overflow-x: auto;">
              <div><strong>P1 Raw Record:</strong> ${JSON.stringify(pos1)}</div>
              <div style="margin-top: 4px;"><strong>P2 Raw Record:</strong> ${JSON.stringify(pos2)}</div>
            </div>
          </details>
        </div>
      `;
    }
  }

  container.innerHTML = htmlOutput;
// =================================================================
// SEATS TAB CONTROLLER (Parses AE_Gujarat_2022/2017/2012.csv from root)
// =================================================================

const allGujaratACs = [
  "1 - Abdasa", "2 - Mandvi", "3 - Bhuj", "4 - Anjar", "5 - Gandhidham", "6 - Rapar",
  "39 - Viramgam", "40 - Sanand", "41 - Ghatlodia", "42 - Vejalpur", "43 - Vatva", 
  "44 - Ellisbridge", "45 - Naranpura", "46 - Nikol", "47 - Naroda", "48 - Thakkarbapa Nagar", 
  "49 - Bapunagar", "50 - Amraiwadi", "51 - Dariapur", "52 - Jamalpur-Khadia", "53 - Maninagar", 
  "54 - Danilimda", "55 - Sabarmati", "56 - Asarwa", "57 - Daskroi", "58 - Dholka", "59 - Dhandhuka",
  "155 - Olpad", "156 - Mangrol", "157 - Mandvi", "158 - Kamrej", "159 - Surat East", 
  "160 - Surat North", "161 - Varachha Road", "162 - Karanj", "163 - Limbayat", "164 - Udhna", 
  "165 - Majura", "166 - Katargam", "167 - Surat West", "168 - Choryasi", "169 - Bardoli", "170 - Mahuva",
  "178 - Dharampur", "179 - Valsad", "180 - Pardi", "181 - Kaprada", "182 - Umbergaon"
];

window.addEventListener('DOMContentLoaded', () => {
  const acSelect = document.getElementById('seatsAcSelect');
  if (acSelect) {
    allGujaratACs.forEach(ac => {
      acSelect.innerHTML += `<option value="${ac}">${ac}</option>`;
    });
  }
  loadSeatsData();
});

// Robust CSV Line Parser Handling Quoted Fields
function parseCSVLine(text) {
  let result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function loadCSVData(year) {
  try {
    let response = await fetch(`AE_Gujarat_${year}.csv`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let text = await response.text();
    let lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return null;

    let headers = parseCSVLine(lines[0]);
    let records = [];

    for (let i = 1; i < lines.length; i++) {
      let data = parseCSVLine(lines[i]);
      if (data.length >= headers.length) {
        let obj = {};
        headers.forEach((h, idx) => { obj[h] = data[idx] || ''; });
        records.push(obj);
      }
    }
    return { headers, records };
  } catch (err) {
    console.warn(`Could not load AE_Gujarat_${year}.csv from root directory`, err);
    return null;
  }
}

async function loadSeatsData() {
  const yearSelect = document.getElementById('seatsYearSelect');
  const acSelect = document.getElementById('seatsAcSelect');
  const container = document.getElementById('seatsContainer');

  if (!container || !yearSelect || !acSelect) return;

  const yearVal = yearSelect.value;
  const acVal = acSelect.value;

  container.innerHTML = `<div style="text-align: center; padding: 40px; font-weight: 700; color: var(--text-muted);">Fetching and analyzing election dataset for ${yearVal}...</div>`;

  let yearsToProcess = yearVal === 'ALL' ? ['2022', '2017', '2012'] : [yearVal];
  let htmlOutput = '';

  for (const yr of yearsToProcess) {
    let csvData = await loadCSVData(yr);

    if (!csvData || csvData.records.length === 0) {
      htmlOutput += `
        <div class="panel" style="border: 2px dashed var(--border-color); border-radius: 18px; padding: 25px; text-align: center;">
          <h3 style="margin: 0; font-weight: 800; color: var(--primary);">Gujarat Election ${yr}</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Please ensure <code>AE_Gujarat_${yr}.csv</code> is present in your root directory.</p>
        </div>`;
      continue;
    }

    let acMap = {};
    csvData.records.forEach(row => {
      let acKey = row.AC_Name || row.Constituency || row.AC || Object.values(row)[1] || 'Unknown';
      if (acVal && !acKey.toLowerCase().includes(acVal.toLowerCase())) return;

      if (!acMap[acKey]) acMap[acKey] = [];
      acMap[acKey].push(row);
    });

    for (const [acName, rows] of Object.entries(acMap)) {
      rows.sort((a, b) => {
        let vA = parseInt(a.Votes || a.Total_Votes || a.EVm_Votes || Object.values(a)[4] || 0) || 0;
        let vB = parseInt(b.Votes || b.Total_Votes || b.EVm_Votes || Object.values(b)[4] || 0) || 0;
        return vB - vA;
      });

      let pos1 = rows[0] || {};
      let pos2 = rows[1] || {};

      let p1Votes = parseInt(pos1.Votes || pos1.Total_Votes || Object.values(pos1)[4] || 0);
      let p2Votes = parseInt(pos2.Votes || pos2.Total_Votes || Object.values(pos2)[4] || 0);
      let margin = p1Votes - p2Votes;

      htmlOutput += `
        <div class="panel" style="background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 18px; padding: 22px; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 900; color: var(--text-main);">📍 ${acName} <span style="font-size: 12px; font-weight: 700; background: var(--bg-color); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border-color); margin-left: 8px;">Year: ${yr}</span></h3>
            <div style="font-size: 13px; font-weight: 800; color: #0d6efd; background: rgba(13,110,253,0.1); padding: 6px 12px; border-radius: 10px;">Winning Margin: ${margin.toLocaleString()} Votes</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: linear-gradient(135deg, #d1e7dd 0%, #badbcc 100%); border: 2px solid #a3cfbb; border-radius: 14px; padding: 18px; color: #0f5132;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥇 Position 1 (Winner)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos1.Candidate || pos1.Candidate_Name || Object.values(pos1)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos1.Party || pos1.Party_Name || Object.values(pos1)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(15,81,50,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p1Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos1.Vote_Share || pos1.Percentage || '—'}%</strong></div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border: 2px solid #ffecb5; border-radius: 14px; padding: 18px; color: #664d03;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥈 Position 2 (Runner-Up)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos2.Candidate || pos2.Candidate_Name || Object.values(pos2)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos2.Party || pos2.Party_Name || Object.values(pos2)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(102,77,3,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p2Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos2.Vote_Share || pos2.Percentage || '—'}%</strong></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = htmlOutput;
// =================================================================
// SEATS TAB CONTROLLER (Parses AE_Gujarat_2022/2017/2012.csv from root)
// =================================================================

const allGujaratACs = [
  "1 - Abdasa", "2 - Mandvi", "3 - Bhuj", "4 - Anjar", "5 - Gandhidham", "6 - Rapar",
  "39 - Viramgam", "40 - Sanand", "41 - Ghatlodia", "42 - Vejalpur", "43 - Vatva", 
  "44 - Ellisbridge", "45 - Naranpura", "46 - Nikol", "47 - Naroda", "48 - Thakkarbapa Nagar", 
  "49 - Bapunagar", "50 - Amraiwadi", "51 - Dariapur", "52 - Jamalpur-Khadia", "53 - Maninagar", 
  "54 - Danilimda", "55 - Sabarmati", "56 - Asarwa", "57 - Daskroi", "58 - Dholka", "59 - Dhandhuka",
  "155 - Olpad", "156 - Mangrol", "157 - Mandvi", "158 - Kamrej", "159 - Surat East", 
  "160 - Surat North", "161 - Varachha Road", "162 - Karanj", "163 - Limbayat", "164 - Udhna", 
  "165 - Majura", "166 - Katargam", "167 - Surat West", "168 - Choryasi", "169 - Bardoli", "170 - Mahuva",
  "178 - Dharampur", "179 - Valsad", "180 - Pardi", "181 - Kaprada", "182 - Umbergaon"
];

window.addEventListener('DOMContentLoaded', () => {
  const acSelect = document.getElementById('seatsAcSelect');
  if (acSelect) {
    allGujaratACs.forEach(ac => {
      acSelect.innerHTML += `<option value="${ac}">${ac}</option>`;
    });
  }
  loadSeatsData();
});

// Robust CSV Line Parser Handling Quoted Fields
function parseCSVLine(text) {
  let result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function loadCSVData(year) {
  try {
    let response = await fetch(`AE_Gujarat_${year}.csv`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let text = await response.text();
    let lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return null;

    let headers = parseCSVLine(lines[0]);
    let records = [];

    for (let i = 1; i < lines.length; i++) {
      let data = parseCSVLine(lines[i]);
      if (data.length >= headers.length) {
        let obj = {};
        headers.forEach((h, idx) => { obj[h] = data[idx] || ''; });
        records.push(obj);
      }
    }
    return { headers, records };
  } catch (err) {
    console.warn(`Could not load AE_Gujarat_${year}.csv from root directory`, err);
    return null;
  }
}

async function loadSeatsData() {
  const yearSelect = document.getElementById('seatsYearSelect');
  const acSelect = document.getElementById('seatsAcSelect');
  const container = document.getElementById('seatsContainer');

  if (!container || !yearSelect || !acSelect) return;

  const yearVal = yearSelect.value;
  const acVal = acSelect.value;

  container.innerHTML = `<div style="text-align: center; padding: 40px; font-weight: 700; color: var(--text-muted);">Fetching and analyzing election dataset for ${yearVal}...</div>`;

  let yearsToProcess = yearVal === 'ALL' ? ['2022', '2017', '2012'] : [yearVal];
  let htmlOutput = '';

  for (const yr of yearsToProcess) {
    let csvData = await loadCSVData(yr);

    if (!csvData || csvData.records.length === 0) {
      htmlOutput += `
        <div class="panel" style="border: 2px dashed var(--border-color); border-radius: 18px; padding: 25px; text-align: center;">
          <h3 style="margin: 0; font-weight: 800; color: var(--primary);">Gujarat Election ${yr}</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Please ensure <code>AE_Gujarat_${yr}.csv</code> is present in your root directory.</p>
        </div>`;
      continue;
    }

    let acMap = {};
    csvData.records.forEach(row => {
      let acKey = row.AC_Name || row.Constituency || row.AC || Object.values(row)[1] || 'Unknown';
      if (acVal && !acKey.toLowerCase().includes(acVal.toLowerCase())) return;

      if (!acMap[acKey]) acMap[acKey] = [];
      acMap[acKey].push(row);
    });

    for (const [acName, rows] of Object.entries(acMap)) {
      rows.sort((a, b) => {
        let vA = parseInt(a.Votes || a.Total_Votes || a.EVm_Votes || Object.values(a)[4] || 0) || 0;
        let vB = parseInt(b.Votes || b.Total_Votes || b.EVm_Votes || Object.values(b)[4] || 0) || 0;
        return vB - vA;
      });

      let pos1 = rows[0] || {};
      let pos2 = rows[1] || {};

      let p1Votes = parseInt(pos1.Votes || pos1.Total_Votes || Object.values(pos1)[4] || 0);
      let p2Votes = parseInt(pos2.Votes || pos2.Total_Votes || Object.values(pos2)[4] || 0);
      let margin = p1Votes - p2Votes;

      htmlOutput += `
        <div class="panel" style="background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 18px; padding: 22px; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 900; color: var(--text-main);">📍 ${acName} <span style="font-size: 12px; font-weight: 700; background: var(--bg-color); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border-color); margin-left: 8px;">Year: ${yr}</span></h3>
            <div style="font-size: 13px; font-weight: 800; color: #0d6efd; background: rgba(13,110,253,0.1); padding: 6px 12px; border-radius: 10px;">Winning Margin: ${margin.toLocaleString()} Votes</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: linear-gradient(135deg, #d1e7dd 0%, #badbcc 100%); border: 2px solid #a3cfbb; border-radius: 14px; padding: 18px; color: #0f5132;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥇 Position 1 (Winner)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos1.Candidate || pos1.Candidate_Name || Object.values(pos1)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos1.Party || pos1.Party_Name || Object.values(pos1)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(15,81,50,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p1Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos1.Vote_Share || pos1.Percentage || '—'}%</strong></div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border: 2px solid #ffecb5; border-radius: 14px; padding: 18px; color: #664d03;">
              <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🥈 Position 2 (Runner-Up)</div>
              <div style="font-size: 18px; font-weight: 900; margin-bottom: 4px;">${pos2.Candidate || pos2.Candidate_Name || Object.values(pos2)[2] || 'N/A'}</div>
              <div style="font-size: 14px; font-weight: 800; opacity: 0.85; margin-bottom: 10px;">Party: ${pos2.Party || pos2.Party_Name || Object.values(pos2)[3] || 'N/A'}</div>
              <div style="display: flex; gap: 15px; font-size: 12px; font-weight: 700; border-top: 1px solid rgba(102,77,3,0.2); padding-top: 8px;">
                <div>Votes: <strong>${p2Votes.toLocaleString()}</strong></div>
                <div>Vote Share: <strong>${pos2.Vote_Share || pos2.Percentage || '—'}%</strong></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = htmlOutput;

}
