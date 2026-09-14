#!/usr/bin/env bash
# ==============================================================================
# SHΞN™ Ubuntu Free Server — Container Entrypoint Script
# Developer: SHΞN™ | Telegram: https://t.me/shervini
# ==============================================================================
set -e

echo "=================================================="
echo "    🐧 SHΞN™ — Ubuntu Free Server (Cloud Edition)"
echo "    Telegram: https://t.me/shervini              "
echo "=================================================="

# Ensure dbus runtime directory and UUID exist for XFCE session stability
mkdir -p /var/run/dbus
dbus-uuidgen --ensure 2>/dev/null || true

# Clean up stale locks if container was previously stopped or restarted
rm -rf /tmp/.X1-lock /tmp/.X11-unix /tmp/.X*-lock /tmp/.vnc/*.pid /tmp/.vnc/*.log 2>/dev/null || true

# Setup Xauthority & VNC directory
mkdir -p /root/.vnc
touch /root/.Xauthority

# Configure standard XFCE xstartup if not present
if [ ! -f /root/.vnc/xstartup ]; then
cat << 'EOF' > /root/.vnc/xstartup
#!/bin/bash
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
export XKL_XMODMAP_DISABLE=1
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
xsetroot -solid grey
vncconfig -iconic &
startxfce4 &
EOF
chmod +x /root/.vnc/xstartup
fi

# Ensure index.html in noVNC links to vnc.html so root URL / loads GUI directly
if [ -d /usr/share/novnc ] && [ ! -f /usr/share/novnc/index.html ]; then
    ln -sf /usr/share/novnc/vnc.html /usr/share/novnc/index.html 2>/dev/null || true
fi

# Start TigerVNC Server on display :1 (port 5901)
export USER=root
export DISPLAY=:1
echo ">>> [1/2] Starting TigerVNC server on display :1 (port 5901)..."
vncserver :1 -localhost no -SecurityTypes None -geometry 1280x800 --I-KNOW-THIS-IS-INSECURE

# Support Railway dynamic $PORT (defaults to 6080 for standard Docker/Compose)
WEB_PORT="${PORT:-6080}"
echo ">>> [2/2] Starting noVNC Websockify on port ${WEB_PORT}..."
echo ">>> Web GUI will be accessible at http://0.0.0.0:${WEB_PORT}/"

# Launch websockify in foreground (PID 1) so signals are handled and container stays alive
exec websockify --web=/usr/share/novnc/ "${WEB_PORT}" localhost:5901
