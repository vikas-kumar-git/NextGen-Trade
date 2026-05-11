#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/backend.pid"

PID="$(lsof -tiTCP:8000 -sTCP:LISTEN || true)"

if [ -n "$PID" ]; then
  kill $PID
  rm -f "$PID_FILE"
  echo "Backend stopped."
  exit 0
fi

rm -f "$PID_FILE"
echo "Backend was not running."
