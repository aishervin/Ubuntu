# ==============================================================================
# SHΞN™ — Ubuntu Free Server (Desktop GUI + Web noVNC)
# Developed and Customized by SHΞN™ | Telegram: https://t.me/shervini
# ==============================================================================

FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=root
ENV DISPLAY=:1

# Install core packages, XFCE desktop, TigerVNC, noVNC, and essential tools
RUN apt-get update -y && apt-get install --no-install-recommends -y \
    xfce4 xfce4-goodies tigervnc-standalone-server novnc websockify \
    sudo xterm vim net-tools curl wget git tzdata \
    dbus-x11 x11-utils x11-xserver-utils x11-apps \
    htop neofetch ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

# Add official Mozilla APT repository for direct Firefox installation without snap
# (Avoids add-apt-repository, keyserver blocks, and gpg-agent issues on Railway)
RUN install -d -m 0755 /etc/apt/keyrings && \
    wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null && \
    echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" | tee /etc/apt/sources.list.d/mozilla.list && \
    echo 'Package: *\nPin: origin packages.mozilla.org\nPin-Priority: 1000' | tee /etc/apt/preferences.d/mozilla && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends firefox xubuntu-icon-theme && \
    rm -rf /var/lib/apt/lists/*

# Setup Xauthority & noVNC index symlink
RUN touch /root/.Xauthority && \
    ln -sf /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# Copy container entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose VNC Port (5901) and noVNC Web GUI Port (6080)
EXPOSE 5901
EXPOSE 6080

ENTRYPOINT ["/entrypoint.sh"]
