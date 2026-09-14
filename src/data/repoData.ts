import { RepoFile } from '../types';

export const REPO_FILES: RepoFile[] = [
  {
    name: 'Dockerfile',
    path: '/Dockerfile',
    language: 'dockerfile',
    size: '1.4 KB',
    description: 'کانفیگ اصلی ساخت ایمیج داکر اوبونتو با دسکتاپ XFCE4 و وب VNC',
    content: `# ==============================================================================
# SHΞN™ — Ubuntu Free Server (Desktop GUI + SSH Terminal)
# Developed and Customized by SHΞN™ | Telegram: https://t.me/shervini
# ==============================================================================

FROM --platform=linux/amd64 ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=root
ENV DISPLAY=:1

# Install core packages, XFCE desktop, TigerVNC, noVNC, and utilities
RUN apt-get update -y && apt-get install --no-install-recommends -y \\
    xfce4 xfce4-goodies tigervnc-standalone-server novnc websockify \\
    sudo xterm init systemd snapd vim net-tools curl wget git tzdata \\
    dbus-x11 x11-utils x11-xserver-utils x11-apps software-properties-common \\
    htop neofetch ca-certificates openssl gnupg dirmngr \\
    && rm -rf /var/lib/apt/lists/*

# Add Mozilla Team PPA for direct Firefox installation without snap
RUN add-apt-repository ppa:mozillateam/ppa -y && \\
    echo 'Package: *' >> /etc/apt/preferences.d/mozilla-firefox && \\
    echo 'Pin: release o=LP-PPA-mozillateam' >> /etc/apt/preferences.d/mozilla-firefox && \\
    echo 'Pin-Priority: 1001' >> /etc/apt/preferences.d/mozilla-firefox && \\
    echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:jammy";' | tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox && \\
    apt-get update -y && \\
    apt-get install -y firefox xubuntu-icon-theme && \\
    rm -rf /var/lib/apt/lists/*

# Setup Xauthority
RUN touch /root/.Xauthority

# Configure VNC startup configuration
RUN mkdir -p /root/.vnc && \\
    echo '#!/bin/bash\\nxrdb $HOME/.Xresources\\nstartxfce4 &' > /root/.vnc/xstartup && \\
    chmod +x /root/.vnc/xstartup

# Expose VNC Port (5901) and noVNC Web GUI Port (6080)
EXPOSE 5901
EXPOSE 6080

# Launch VNC server and websockify SSL bridge
CMD bash -c "vncserver -localhost no -SecurityTypes None -geometry 1280x800 --I-KNOW-THIS-IS-INSECURE && \\
    openssl req -new -subj '/C=US/ST=SHEN/L=Cloud/O=SHEN-UBUNTU/CN=shervini' -x509 -days 365 -nodes -out self.pem -keyout self.pem && \\
    websockify -D --web=/usr/share/novnc/ --cert=self.pem 6080 localhost:5901 && \\
    echo '>>> SHΞN™ Ubuntu Free Server is running!' && \\
    tail -f /dev/null"`
  },
  {
    name: 'README.md',
    path: '/README.md',
    language: 'markdown',
    size: '4.8 KB',
    description: 'راهنمای فارسی کامل، آموزش گام به گام و نکات دیپلوی روی Railway و داکر',
    content: `<div align="center">

# 🐧 SHΞN™ Ubuntu Free Server — Cloud & Railway Edition
### سرور اوبونتوی کاملاً رایگان با دسکتاپ گرافیکی (noVNC) و ترمینال آنلاین (SSH)

<p>
  <img src="https://img.shields.io/badge/Platform-Railway%20%7C%20Docker-8A2BE2?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/OS-Ubuntu%2022.04%20LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" />
  <img src="https://img.shields.io/badge/Access-VNC%20%7C%20SSH-2ea44f?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cost-100%25%20Free-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Creator-SH%CE%9EN%E2%84%A2-ff4500?style=for-the-badge" />
  <a href="https://t.me/shervini">
    <img src="https://img.shields.io/badge/Telegram-@shervini-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" />
  </a>
</p>

</div>

---

## 📖 معرفی پروژه
با این پروژه می‌توانید در کمتر از **۵ الی ۱۰ دقیقه** یک **سرور اوبونتوی کاملاً رایگان** روی پلتفرم **Railway** یا هر سرویس داکر دیگر راه‌اندازی کنید؛ این سرور دارای دسکتاپ گرافیکی سبک (XFCE4) است که مستقیماً از طریق مرورگر با **noVNC** قابل کنترل است و همچنین دسترسی کامل ترمینال (SSH) را بدون نیاز به هیچ تنظیمات پیچیده‌ای فراهم می‌سازد.

---

## ✨ ویژگی‌های کلیدی
- 💸 **کاملاً رایگان**: بدون نیاز به کارت اعتباری یا هزینه روی پلن رایگان Railway
- 🖥️ **دسکتاپ گرافیکی XFCE4**: متصل به وب‌کلاینت noVNC روی پورت 6080
- 💻 **ترمینال پرسرعت**: دسترسی SSH فوری به وسیله sshx
- 🌐 **مرورگر فایرفاکس**: پیش‌نصب با PPA رسمی موزیلا
- ⚡ **راه‌اندازی آسان**: بیلد در کمتر از چند دقیقه با Git و Docker

---

## 🚀 آموزش راه‌اندازی روی Railway
1. این ریپازیتوری را فورک کنید.
2. در Railway.app با اکانت گیت‌هاب لاگین کرده و New Project -> Deploy from GitHub repo را بزنید.
3. در تنظیمات پروژه (Settings -> Networking)، پورت 6080 را به عنوان TCP Proxy فعال کنید.
4. دامنه اختصاصی تولید کنید و با مرورگر وارد محیط VNC دسکتاپ شوید!

---

## 🔑 ترمینال SSH آنی با sshx
در ترمینال دسکتاپ اجرا کنید:
\`\`\`bash
curl -sSf https://sshx.io/get | sh
sshx
\`\`\`
سپس لینک تولید شده را در مرورگر باز کنید.

---

## 📣 ارتباط و کانال تلگرام
ارتباط مستقیم با سازنده و دریافت آموزش‌های روز:
👉 **[T.me/shervini](https://t.me/shervini)**`
  },
  {
    name: 'docker-compose.yml',
    path: '/docker-compose.yml',
    language: 'yaml',
    size: '0.5 KB',
    description: 'کانفیگ اجرای تک‌دستوری با docker-compose',
    content: `version: '3.8'

# ==============================================================================
# SHΞN™ — Ubuntu Free Server Docker Compose
# Channel & Contact: https://t.me/shervini
# ==============================================================================

services:
  shen-ubuntu:
    build:
      context: .
      dockerfile: Dockerfile
    image: shen-ubuntu:latest
    container_name: shen-ubuntu-server
    restart: always
    ports:
      - "6080:6080" # Web noVNC Desktop Access (Browser)
      - "5901:5901" # Native VNC Client Access (RealVNC/TigerVNC)
    environment:
      - VNC_RESOLUTION=1280x800
    shm_size: '1gb'`
  },
  {
    name: 'setup.sh',
    path: '/setup.sh',
    language: 'bash',
    size: '1.1 KB',
    description: 'اسکریپت خودکار Bash برای بیلد و اجرای خودکار کانتینر در سرور لینوکس',
    content: `#!/usr/bin/env bash
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
docker run -d \\
  -p "$VNC_PORT:6080" \\
  -p "$NATIVE_PORT:5901" \\
  --name "$CONTAINER_NAME" \\
  --shm-size=1gb \\
  "$IMAGE_NAME"

echo ""
echo "✅ Server started successfully!"
echo "👉 Web Browser GUI (noVNC): http://localhost:$VNC_PORT/vnc.html"
echo "👉 Native VNC Client: localhost:$NATIVE_PORT"
echo "👉 Connect Telegram: https://t.me/shervini"
echo "=================================================="`
  },
  {
    name: 'LICENSE',
    path: '/LICENSE',
    language: 'text',
    size: '1.0 KB',
    description: 'مجوز نرم‌افزاری متن‌باز MIT متعلق به SHΞN™',
    content: `MIT License

Copyright (c) 2026 SHΞN™ (https://t.me/shervini)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  }
];
