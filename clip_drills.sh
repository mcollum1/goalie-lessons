#!/bin/bash

# Goalie Drill Clipper
# Usage: ./clip_drills.sh <youtube_url> <start_time> <end_time> <drill_id>
#
# Examples:
#   ./clip_drills.sh https://www.youtube.com/watch?v=24LI38Pf_B0 6:49 6:59 pass-wrap-slide
#   ./clip_drills.sh https://www.youtube.com/watch?v=XXXXXXXXXXX 1:30 1:45 t-push-shuffle

set -e

OUTPUT_DIR="$HOME/Documents/Claude/Projects/Goalie Lessons/drills"
CLIPS_DIR="$HOME/Documents/Claude/Projects/Goalie Lessons/drill-clips"
SOURCE_FILE="/tmp/goalie_drill_source_$$.mp4"

# ── Argument validation ───────────────────────────────────────────────────────
if [ "$#" -ne 4 ]; then
  echo ""
  echo "Usage: ./clip_drills.sh <youtube_url> <start_time> <end_time> <drill_id>"
  echo ""
  echo "  youtube_url   Full YouTube URL"
  echo "  start_time    Clip start (e.g. 6:49 or 0:06:49)"
  echo "  end_time      Clip end   (e.g. 6:59 or 0:06:59)"
  echo "  drill_id      Output filename slug (e.g. pass-wrap-slide)"
  echo ""
  echo "Output: drill-clips/<drill_id>.mp4"
  exit 1
fi

URL="$1"
START="$2"
END="$3"
DRILL_ID="$4"
OUTPUT_FILE="$CLIPS_DIR/${DRILL_ID}.mp4"

mkdir -p "$CLIPS_DIR"

echo ""
echo "Goalie Drill Clipper"
echo "===================="
echo "  URL:    $URL"
echo "  Clip:   $START → $END"
echo "  Output: $OUTPUT_FILE"
echo ""

# ── Check for yt-dlp ─────────────────────────────────────────────────────────
if ! command -v yt-dlp &>/dev/null; then
  echo "yt-dlp not found. Installing via Homebrew..."
  if command -v brew &>/dev/null; then
    brew install yt-dlp
  else
    echo "Homebrew not found. Installing yt-dlp via pip..."
    pip3 install yt-dlp --break-system-packages 2>/dev/null || pip3 install yt-dlp
  fi
fi

# ── Check for ffmpeg ─────────────────────────────────────────────────────────
if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg not found. Installing via Homebrew..."
  if command -v brew &>/dev/null; then
    brew install ffmpeg
  else
    echo "ERROR: ffmpeg not found and Homebrew is not installed."
    echo "Please install Homebrew: https://brew.sh"
    exit 1
  fi
fi

# ── Download source video ────────────────────────────────────────────────────
echo "Downloading video..."
yt-dlp \
  -f "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best[height<=720]" \
  --merge-output-format mp4 \
  -o "$SOURCE_FILE" \
  --no-playlist \
  "$URL"

echo "Download complete."
echo ""

# ── Clip and encode ──────────────────────────────────────────────────────────
echo "Clipping $START → $END..."
ffmpeg -y -i "$SOURCE_FILE" \
  -ss "$START" -to "$END" \
  -c:v libx264 -c:a aac \
  -preset fast -crf 22 \
  "$OUTPUT_FILE"

# ── Clean up source ──────────────────────────────────────────────────────────
rm "$SOURCE_FILE"

echo ""
echo "Done: $OUTPUT_FILE"
