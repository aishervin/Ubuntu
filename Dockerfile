# ==============================================================================
# SHΞN™ — Ubuntu Free Server (Desktop GUI + SSH Terminal)
# Developed and Customized by SHΞN™ | Telegram: https://t.me/shervini
# ==============================================================================

FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=root
ENV DISPLAY=:1

# Install core packages, XFCE desktop, TigerVNC, noVNC, and utilities
RUN apt-get update -y && apt-get install --no-install-recommends -y \
    xfce4 xfce4-goodies tigervnc-standalone-server novnc websockify \
    sudo xterm init systemd snapd vim net-tools curl wget git tzdata \
    dbus-x11 x11-utils x11-xserver-utils x11-apps software-properties-common \
    htop neofetch ca-certificates openssl gnupg gpg-agent dirmngr \
    && rm -rf /var/lib/apt/lists/*

# Add Mozilla Team PPA for direct Firefox installation without snap
RUN add-apt-repository ppa:mozillateam/ppa -y && \
    echo 'Package: *' >> /etc/apt/preferences.d/mozilla-firefox && \
    echo 'Pin: release o=LP-PPA-mozillateam' >> /etc/apt/preferences.d/mozilla-firefox && \
    echo 'Pin-Priority: 1001' >> /etc/apt/preferences.d/mozilla-firefox && \
    echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:jammy";' | tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox && \
    apt-get update -y && \
    apt-get install -y firefox xubuntu-icon-theme && \
    rm -rf /var/lib/apt/lists/*

# Setup Xauthority
RUN touch /root/.Xauthority

# Configure VNC startup configuration
RUN mkdir -p /root/.vnc && \
    echo '#!/bin/bash\nxrdb $HOME/.Xresources\nstartxfce4 &' > /root/.vnc/xstartup && \
    chmod +x /root/.vnc/xstartup

# Expose VNC Port (5901) and noVNC Web GUI Port (6080)
EXPOSE 5901
EXPOSE 6080

# Launch VNC server and websockify SSL bridge
CMD bash -c "vncserver -localhost no -SecurityTypes None -geometry 1280x800 --I-KNOW-THIS-IS-INSECURE && \
    openssl req -new -subj '/C=US/ST=SHEN/L=Cloud/O=SHEN-UBUNTU/CN=shervini' -x509 -days 365 -nodes -out self.pem -keyout self.pem && \
    websockify -D --web=/usr/share/novnc/ --cert=self.pem 6080 localhost:5901 && \
    echo '>>> SHΞN™ Ubuntu Free Server is running!' && \
    tail -f /dev/null"
