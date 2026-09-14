import React, { useState } from 'react';
import { Sliders, Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react';

export const ConfigGenerator: React.FC = () => {
  const [resolution, setResolution] = useState('1280x800');
  const [containerName, setContainerName] = useState('shen-ubuntu-server');
  const [webPort, setWebPort] = useState('6080');
  const [vncPort, setVncPort] = useState('5901');
  const [shmSize, setShmSize] = useState('1gb');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generatedDockerRun = `docker run -d \\
  --name ${containerName || 'shen-ubuntu-server'} \\
  -p ${webPort || '6080'}:6080 \\
  -p ${vncPort || '5901'}:5901 \\
  --shm-size=${shmSize} \\
  -e VNC_RESOLUTION=${resolution} \\
  --restart always \\
  shen-ubuntu`;

  const generatedCompose = `version: '3.8'

# SHΞN™ Ubuntu Free Server — Custom Docker Compose
# Telegram: https://t.me/shervini

services:
  ${containerName || 'shen-ubuntu-server'}:
    build:
      context: .
      dockerfile: Dockerfile
    image: shen-ubuntu:latest
    container_name: ${containerName || 'shen-ubuntu-server'}
    restart: always
    ports:
      - "${webPort || '6080'}:6080" # Web noVNC
      - "${vncPort || '5901'}:5901" # Native VNC
    environment:
      - VNC_RESOLUTION=${resolution}
    shm_size: '${shmSize}'`;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          تنظیم و تولید سفارشی دستورات داکر و داکر کامپوز
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          مشخصات و پورت‌های مورد نظر خود را وارد کنید تا دستورات شخصی‌سازی‌شده داکر برای SHΞN™ تولید گردد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              کیفیت و ابعاد مانیتور دسکتاپ (Resolution):
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="1024x768">1024x768 (سبک و کم‌مصرف)</option>
              <option value="1280x800">1280x800 (استاندارد لپ‌تاپ - پیشنهادی)</option>
              <option value="1366x768">1366x768 (HD Wide)</option>
              <option value="1920x1080">1920x1080 (Full HD باکیفیت)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نام کانتینر در داکر:
            </label>
            <input
              type="text"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              dir="ltr"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                پورت وب noVNC:
              </label>
              <input
                type="text"
                value={webPort}
                onChange={(e) => setWebPort(e.target.value)}
                dir="ltr"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                پورت کلاینت VNC:
              </label>
              <input
                type="text"
                value={vncPort}
                onChange={(e) => setVncPort(e.target.value)}
                dir="ltr"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              حافظه اشتراکی گرافیک (shm-size):
            </label>
            <select
              value={shmSize}
              onChange={(e) => setShmSize(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="512mb">512MB (حداقل)</option>
              <option value="1gb">1GB (استاندارد)</option>
              <option value="2gb">2GB (روان برای وب‌گردی سنگین)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            سازگار با تمام نسخه‌های رسمی Docker، Railway، Render و سرورهای اوبونتو/دبیان.
          </div>
        </div>

        {/* Output Previews */}
        <div className="lg:col-span-7 space-y-4">
          {/* Docker Run Command */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>دستور مستقیم داکر (docker run)</span>
              </div>
              <button
                onClick={() => copyText(generatedDockerRun, 'run')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20"
              >
                {copiedKey === 'run' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی</span>
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-cyan-300 leading-relaxed dir-ltr text-left overflow-x-auto">
              <pre>{generatedDockerRun}</pre>
            </div>
          </div>

          {/* Docker Compose YAML */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <FileCode className="w-4 h-4 text-purple-400" />
                <span>فایل سفارشی docker-compose.yml</span>
              </div>
              <button
                onClick={() => copyText(generatedCompose, 'compose')}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20"
              >
                {copiedKey === 'compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی</span>
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-slate-300 leading-relaxed dir-ltr text-left overflow-x-auto">
              <pre>{generatedCompose}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
