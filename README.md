Gujarat geodata processor + offline web viewer

What this repo contains (paste scripts & small samples here):
- run_gujarat.sh        — orchestrates filtering & tiling
- scripts/filter_gujarat.py — extract Gujarat features into gujarat_*.geojson
- .gitattributes / .gitignore
- gujarat-app/*         — static MapLibre + pmtiles viewer
- gujarat-data/filtered — small sample GeoJSONs (keep large files out of git; use LFS or releases)
- gujarat-data/tiles    — MBTiles / PMTiles (use Git LFS for large files)

Quick run (on your machine):
1) Ensure Miniforge/conda on PATH
2) Create env (mamba recommended) and install deps
3) ./run_gujarat.sh
4) cd gujarat-app && python3 -m http.server 8000
Open http://localhost:8000
