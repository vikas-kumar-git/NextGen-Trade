#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
LOG_FILE="$ROOT_DIR/backend.log"
PID_FILE="$ROOT_DIR/backend.pid"

PORT_PID="$(lsof -tiTCP:8000 -sTCP:LISTEN || true)"

if [ -n "$PORT_PID" ]; then
  echo "Backend is already running on http://127.0.0.1:8000"
  echo "PID: $PORT_PID"
  echo "$PORT_PID" > "$PID_FILE"
  exit 0
fi

rm -f "$PID_FILE"

cd "$BACKEND_DIR"
source .venv/bin/activate

nohup python manage.py runserver 8000 --noreload > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

echo "Backend started on http://127.0.0.1:8000"
echo "PID: $(cat "$PID_FILE")"
echo "Logs: $LOG_FILE"
