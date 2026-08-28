// ==========================================
// app.js - Dynamic Fetch Script for Seats Tab
// ==========================================

async function loadSeatCycles(constituencyName) {
  const container = document.getElementById('seat-cycles-container');
  if (!container) return;
  
  container.innerHTML = '<p style="color: var(--text-muted);">Fetching election cycle records...</p>';

  const cycles = ['2022', '2017', '2012'];
  let htmlContent = '';

  for (const year of cycles) {
    let fileName = `AE_Gj_${year}.csv`;
    try {
      let response = await fetch(fileName);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      let csvText = await response.text();
      let topTwo = parseTopTwoCandidates(csvText, constituencyName);

      htmlContent += `
        <div class="panel" style="background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 14px; padding: 16px;">
          <h3 style="margin-top:0; color: var(--primary); border-bottom: 2px solid var(--border-color); padding-bottom: 8px; font-size: 16px; font-weight: 800;">Gujarat Election ${year}</h3>
          
          <div style="margin-bottom: 12px;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #34c759;">🥇 Position 1 (Winner)</div>
            <div style="font-weight: 800; font-size: 15px; margin-top: 2px;">${topTwo.position1.Candidate || topTwo.position1.CandidateName || 'Data Pending'}</div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; margin-top: 2px;">Party: ${topTwo.position1.Party || topTwo.position1.PartyName || 'N/A'} | Votes: ${topTwo.position1.Votes || topTwo.position1.Total_Votes || '0'}</div>
          </div>

          <div>
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #ff9500;">🥈 Position 2 (Runner-up)</div>
            <div style="font-weight: 800; font-size: 15px; margin-top: 2px;">${topTwo.position2.Candidate || topTwo.position2.CandidateName || 'Data Pending'}</div>
            <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; margin-top: 2px;">Party: ${topTwo.position2.Party || topTwo.position2.PartyName || 'N/A'} | Votes: ${topTwo.position2.Votes || topTwo.position2.Total_Votes || '0'}</div>
          </div>
        </div>
      `;
    } catch (err) {
      htmlContent += `
        <div class="panel" style="border: 2px solid var(--border-color); padding: 16px; border-radius: 14px; background: var(--card-bg);">
          <h3 style="margin-top:0; font-size: 16px; font-weight: 800;">Gujarat Election ${year}</h3>
          <p style="font-size: 13px; color: var(--text-muted); font-weight: 600;">File <code style="background: var(--bg-color); padding: 2px 6px; border-radius: 4px;">${fileName}</code> not found in root path. Please place it in your working directory.</p>
        </div>
      `;
    }
  }

  container.innerHTML = htmlContent;
}

// Trigger initial load on DOM ready for default constituency
document.addEventListener('DOMContentLoaded', () => {
  loadSeatCycles('Gandhidham');
});
