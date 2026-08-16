#!/usr/bin/env bash
set -euo pipefail

# Adjust these paths if you store india-geodata elsewhere
WORKDIR="${WORKDIR:-$HOME/india-geodata}"
IN_DIR="$WORKDIR/raw"
FILTERED_DIR="$WORKDIR/gujarat-data/filtered"
TILES_DIR="$WORKDIR/gujarat-data/tiles"
mkdir -p "$FILTERED_DIR" "$TILES_DIR"

echo "Running filter script to create Gujarat GeoJSONs..."
python3 "$PWD/scripts/filter_gujarat.py" --in-dir "$IN_DIR" --out-dir "$FILTERED_DIR" || echo "WARN: filter script ended with errors"

echo "Creating MBTiles for large layers (if present)..."
create_mb() {
  IN="$1"
  OUTMB="$2"
  if [ -f "$IN" ]; then
    echo "Tiling $IN -> $OUTMB ..."
    tippecanoe -o "$OUTMB" -zg --drop-densest-as-needed --extend-zooms-if-still-dropping --generate-ids --no-tile-compression "$IN"
  else
    echo "No $IN, skipping."
  fi
}

# examples — adapt names to files your filter produced
create_mb "$FILTERED_DIR/gujarat_LGD_Villages.geojson" "$TILES_DIR/gujarat_villages.mbtiles"
create_mb "$FILTERED_DIR/gujarat_NIC_Roads.geojson" "$TILES_DIR/gujarat_roads.mbtiles"
create_mb "$FILTERED_DIR/gujarat_LGD_Subdistricts.geojson" "$TILES_DIR/gujarat_subdistricts.mbtiles"

echo "Converting MBTiles -> PMTiles (optional)"
cd "$TILES_DIR"
for mb in *.mbtiles 2>/dev/null; do
  [ -e "$mb" ] || continue
  pm="${mb%.mbtiles}.pmtiles"
  echo "Converting $mb -> $pm ..."
  npx pmtiles build "$mb" "$pm" || echo "WARN: pmtiles build failed for $mb"
done

cat <<EOF

== DONE ==
Filtered GeoJSONs: $FILTERED_DIR
Tiles (mbtiles/pmtiles): $TILES_DIR

To preview locally:
  1) Serve PMTiles: cd "$TILES_DIR" ; npx pmtiles serve -p 9000 *.pmtiles
  2) Serve files: cd "$WORKDIR" ; python3 -m http.server 8000
  Then open http://localhost:8000
EOF
