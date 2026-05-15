#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
PROJECT_DIR="/Users/mmartins-collum/Documents/Claude/Projects/Goalie Lessons"
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"
echo "--- sync started at $(date) ---" >> "$LOG_DIR/sync-ice-times.log"
cd "$PROJECT_DIR" && node fetch-ice-times.js >> "$LOG_DIR/sync-ice-times.log" 2>&1
echo "--- sync finished at $(date) ---" >> "$LOG_DIR/sync-ice-times.log"
