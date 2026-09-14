#!/usr/bin/env bash
# ==============================================================================
# SHΞN™ Ubuntu Free Server — Quick Deployment Script
# Author: SHΞN™ | Telegram: https://t.me/shervini
# ==============================================================================

set -e

echo "=================================================="
echo "    🐧 SHΞN™ — Ubuntu Free Server Launcher       "
echo "    Telegram: https://t.me/shervini              "
echo "=================================================="

IMAGE_NAME="shen-ubuntu"
CONTAINER_NAME="shen-ubuntu-server"
VNC_PORT="6080"
NATIVE_PORT="5901"

echo "[1/3] Building Docker image ($IMAGE_NAME)..."
docker build -t "$IMAGE_NAME" .

echo "[2/3] Checking if previous container exists..."
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
fi

echo "[3/3] Starting container ($CONTAINER_NAME)..."
docker run -d \
  -p "$VNC_PORT:6080" \
  -p "$NATIVE_PORT:5901" \
  --name "$CONTAINER_NAME" \
  --shm-size=1gb \
  "$IMAGE_NAME"

echo ""
echo "✅ Server started successfully!"
echo "👉 Web Browser GUI (noVNC): http://localhost:$VNC_PORT/vnc.html"
echo "👉 Native VNC Client: localhost:$NATIVE_PORT"
echo "👉 Connect Telegram: https://t.me/shervini"
echo "=================================================="
