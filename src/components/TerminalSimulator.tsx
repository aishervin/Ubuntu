import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Globe, Send, Monitor, Check, Copy } from 'lucide-react';
import { TerminalLine } from '../types';

export const TerminalSimulator: React.FC = () => {
  const [viewMode, setViewMode] = useState<'terminal' | 'desktop'>('terminal');
  const [input, setInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'system',
      content: '🐧 SHΞN™ Ubuntu 22.04 LTS (GNU/Linux 5.15.0-x86_64)'
    },
    {
      id: '2',
      type: 'system',
      content: 'Welcome to SHΞN™ Ubuntu Cloud Container. Type "help" to see available commands.'
    },
    {
      id: '3',
      type: 'output',
      content: 'noVNC Service: running on port 6080 | TigerVNC: running on port 5901'
    }
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', content: `root@shen-ubuntu:~# ${cmd}` }
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lower === 'help') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Available Commands:
  neofetch      - نمایش مشخصات سرور و سیستم‌عامل
  sshx          - ایجاد فوری تونل ترمینال آنلاین (sshx.io)
  htop          - مانیتورینگ منابع و حافظه
  uname -a      - اطلاعات کرنل لینوکس
  ls -la        - لیست فایل‌های موجود در دایرکتوری
  cat Dockerfile - مشاهده داکرفایل سرور
  whoami        - نمایش نام کاربری فعال
  status        - وضعیت وب‌سرور noVNC و پورت‌ها
  telegram      - لینک کانال رسمی تلگرام SHΞN™
  clear         - پاک‌کردن صفحه ترمینال`
      });
    } else if (lower === 'neofetch') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `            .-/+oossssoo+/-.               root@shen-ubuntu
        \`:+ssssssssssssssssss+:\`           ----------------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04.4 LTS x86_64
    .ossssssssssssssssssdMMMNysssso.       Host: Railway / Cloud Docker Container
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-generic
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 2 days, 4 hours
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1420 (dpkg)
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: bash 5.1.16
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Resolution: 1280x800 (noVNC)
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   DE: XFCE4
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   WM: Xfwm4
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Theme: Greybird [GTK2/3]
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Icons: elementary-xfce-dark
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    Terminal: xterm / noVNC Web
  +sssssssssdmydMMMMMMMMddddyssssssss+     CPU: AMD EPYC 7763 (4) @ 2.44GHz
   /ssssssssssshdmNNNNmyNMMMMhssssss/      Memory: 780MiB / 8192MiB
    .ossssssssssssssssssdMMMNysssso.       Creator: SHΞN™ (T.me/shervini)
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`
      });
    } else if (lower === 'sshx') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: `⚡ sshx tunnel established successfully!
------------------------------------------------------------
🔗 Shell URL: https://sshx.io/s/shen-ub-${Math.random().toString(36).substring(2, 9)}
🔒 Access Key: Live Session Active
------------------------------------------------------------
(لینک بالا را در مرورگر کپی کنید تا وارد ترمینال کامل لینوکس شوید)`
      });
    } else if (lower === 'htop') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `[1] [||||||||                    18.4%]    Tasks: 42, 1 thr; 1 running
[2] [|||||                       11.2%]    Load average: 0.24 0.18 0.12
Mem [||||||||||||||||||     782M/8.00G]    Uptime: 52:14:08
Swp [                         0K/2.00G]

  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
    1 root       20   0 16.8M  3.2M  2.8M S  0.0  0.1  0:00.12 /bin/bash /entrypoint.sh
  142 root       20   0  182M 42.1M 14.5M S  1.2  0.5  0:14.30 Xvnc :1 -geometry 1280x800
  188 root       20   0  312M 68.4M 24.2M S  0.8  0.8  0:08.55 xfce4-session
  245 root       20   0 58.2M 18.1M  9.4M S  0.4  0.2  0:02.10 websockify --web=/usr/share/novnc`
      });
    } else if (lower === 'whoami') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'root'
      });
    } else if (lower.startsWith('cat')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `# SHΞN™ Ubuntu 22.04 LTS Container
FROM --platform=linux/amd64 ubuntu:22.04
EXPOSE 6080 5901
CMD vncserver && websockify 6080 localhost:5901`
      });
    } else if (lower === 'telegram') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: '👉 کانال رسمی تلگرام SHΞN™: https://t.me/shervini'
      });
    } else if (lower === 'status') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'success',
        content: `● noVNC Web Service: Active (Port 6080)
● TigerVNC Server: Active (Port 5901, Display :1)
● XFCE4 Window Manager: Active
● System Load: 0.12 (Normal)`
      });
    } else if (lower === 'ls' || lower === 'ls -la') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `total 48
drwx------ 1 root root 4096 Sep 14 01:20 .
drwxr-xr-x 1 root root 4096 Sep 14 01:00 ..
-rw-r--r-- 1 root root 3106 Apr 15  2020 .bashrc
drwxr-xr-x 2 root root 4096 Sep 14 01:15 .config
-rw-r--r-- 1 root root  161 Jul  9  2019 .profile
drwxr-xr-x 2 root root 4096 Sep 14 01:18 .vnc
-rwxr-xr-x 1 root root 1024 Sep 14 01:20 setup.sh
-rw------- 1 root root   56 Sep 14 01:18 .Xauthority`
      });
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `bash: ${cmd}: command not found. برای مشاهده دستورات مجاز بنویسید: help`
      });
    }

    setHistory(newLines);
    setInput('');
  };

  const copyDemoSshx = () => {
    navigator.clipboard.writeText('https://sshx.io/s/shen-live-demo-terminal');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              viewMode === 'terminal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-4 h-4" />
            <span>کنسول ترمینال تعاملی اوبونتو</span>
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              viewMode === 'desktop'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>پیش‌نمایش وب‌دسکتاپ (noVNC GUI)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>سرور آماده به کار</span>
        </div>
      </div>

      {viewMode === 'terminal' ? (
        /* Terminal View */
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">root@shen-ubuntu: ~</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setHistory([]);
                }}
                className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed max-h-[460px] min-h-[360px] overflow-y-auto space-y-2 dir-ltr text-left">
            {history.map((line) => (
              <div
                key={line.id}
                className={`whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-cyan-300 font-bold'
                    : line.type === 'error'
                    ? 'text-rose-400'
                    : line.type === 'success'
                    ? 'text-emerald-400'
                    : line.type === 'system'
                    ? 'text-purple-300'
                    : 'text-slate-300'
                }`}
              >
                {line.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Input Bar */}
          <form onSubmit={handleCommand} className="flex items-center border-t border-slate-800 bg-slate-900/60 p-2 dir-ltr">
            <span className="text-cyan-400 font-mono text-xs sm:text-sm px-2 shrink-0">root@shen-ubuntu:~#</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="دستور را وارد کنید (مثال: neofetch, sshx, htop, help)"
              className="w-full bg-transparent border-none text-slate-100 font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 px-2 placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Command Shortcuts */}
          <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 self-center">دستورات سریع:</span>
            {['neofetch', 'sshx', 'htop', 'status', 'telegram', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition border border-slate-700/60"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop GUI Simulator */
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          {/* noVNC Browser Topbar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>noVNC: SHΞN™ Ubuntu 22.04 LTS (Connected: 6080)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Resolution: 1280x800</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">60 FPS</span>
            </div>
          </div>

          {/* Simulated XFCE Desktop Canvas */}
          <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-950 p-6 min-h-[460px] flex flex-col justify-between overflow-hidden">
            {/* Background branding wallpaper */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
              <div className="text-center">
                <p className="text-9xl font-black tracking-widest text-cyan-400">SHΞN</p>
                <p className="text-3xl font-bold tracking-widest text-white mt-2">UBUNTU FREE SERVER</p>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="relative z-10 grid grid-cols-1 gap-6 w-24">
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 cursor-pointer group transition text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-600/90 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition">
                  <Globe className="w-7 h-7" />
                </div>
                <span className="text-xs text-slate-200 font-medium drop-shadow">Firefox</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 cursor-pointer group transition text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-105 transition">
                  <TerminalIcon className="w-7 h-7" />
                </div>
                <span className="text-xs text-slate-200 font-medium drop-shadow">Terminal</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 cursor-pointer group transition text-center">
                <div className="w-12 h-12 rounded-xl bg-sky-600/90 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition">
                  <Send className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-200 font-medium drop-shadow">SHΞN™ Chat</span>
              </div>
            </div>

            {/* Active Simulated Window (Firefox / System Info) */}
            <div className="relative z-10 self-center max-w-xl w-full bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
              <div className="bg-slate-800/90 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-300 ml-2">SHΞN™ Cloud Manager — Welcome</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                    SH
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">سرور اوبونتو با موفقیت متصل شد</h4>
                    <p className="text-xs text-slate-400">محیط دسکتاپ گرافیکی سبک XFCE4 آماده وب‌گردی و اجرای کد است</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1 text-slate-300 font-mono">
                  <div className="flex justify-between">
                    <span>Host Platform:</span>
                    <span className="text-purple-400">Railway Free Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Web Display:</span>
                    <span className="text-emerald-400">TigerVNC + noVNC (Port 6080)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Creator:</span>
                    <span className="text-cyan-400">SHΞN™ (T.me/shervini)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* XFCE Bottom Taskbar */}
            <div className="relative z-10 mt-6 bg-slate-950/90 border border-slate-800/80 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-slate-300 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-cyan-600/20 text-cyan-300 font-bold border border-cyan-500/30 cursor-pointer">
                  <span>Applications</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="hover:text-white cursor-pointer">Workspace 1</span>
                <span className="hover:text-white cursor-pointer text-slate-500">Workspace 2</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                <span>CPU: 8%</span>
                <span>RAM: 780MB</span>
                <span>12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
