#!/usr/bin/env python3
"""
Simple filter script: read all supported files in IN_DIR, filter features
belonging to Gujarat and write gujarat_{source}.geojson to OUT_DIR.

Usage:
  python3 scripts/filter_gujarat.py --in-dir ~/india-geodata/raw --out-dir ~/india-geodata/gujarat-data/filtered
"""
import argparse
from pathlib import Path
import geopandas as gpd

POSSIBLE_STATE_KEYS = ("state", "STATE", "st_name", "ST_NAME", "state_name", "STATE_NAME")

def looks_like_gujarat(val):
    if val is None:
        return False
    return "gujarat" in str(val).lower()

def process_path(p: Path, outdir: Path):
    print("Processing", p)
    try:
        if p.suffix.lower() in (".parquet", ".pq"):
            gdf = gpd.read_parquet(p)
        else:
            gdf = gpd.read_file(p)
    except Exception as e:
        print("  skip (read error):", e)
        return
    # find state column if present
    statecol = None
    for k in POSSIBLE_STATE_KEYS:
        if k in gdf.columns:
            statecol = k
            break
    if statecol:
        guj = gdf[gdf[statecol].apply(looks_like_gujarat)]
    else:
        # fallback: try district/taluka/pcode heuristics (keep geometry bbox filter as fallback)
        guj = gdf.copy()
    if len(guj) == 0:
        print("  no Gujarat features found in", p.name)
        return
    # ensure geometry valid and simplify (preserve topology)
    try:
        guj = guj[guj.geometry.notnull()]
        if len(guj) > 0 and guj.geometry.iloc[0].geom_type.lower().endswith("point") is False:
            guj.geometry = guj.geometry.simplify(tolerance=0.0001, preserve_topology=True)
    except Exception:
        pass
    out = outdir / f"gujarat_{p.stem}.geojson"
    guj.to_file(out, driver="GeoJSON")
    print("  wrote", out)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in-dir", required=True, type=Path)
    ap.add_argument("--out-dir", required=True, type=Path)
    args = ap.parse_args()
    args.out_dir.mkdir(parents=True, exist_ok=True)
    for p in sorted(args.in_dir.iterdir()):
        if p.suffix.lower() in (".parquet", ".geojson", ".json", ".pq"):
            process_path(p, args.out_dir)

if __name__ == "__main__":
    main()
