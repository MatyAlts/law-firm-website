#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/out"

mkdir -p "$BUILD_DIR"
find "$BUILD_DIR" -name '*.class' -delete >/dev/null 2>&1 || true

JAVA_FILES=$(find "$SCRIPT_DIR/src" -name '*.java')
if [ -z "$JAVA_FILES" ]; then
  echo "No Java sources found" >&2
  exit 1
fi

javac --release 17 -d "$BUILD_DIR" $JAVA_FILES

exec java -cp "$BUILD_DIR" com.lawfirm.backend.LawFirmServer
