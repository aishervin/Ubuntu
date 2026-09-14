import React from 'react';
import { Terminal, Send, Server, Download, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'guide' | 'terminal' | 'files' | 'generator';
  setActiveTab: (tab: 'guide' | 'terminal' | 'files' | 'generator') => void;
  onDownloadAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onDownloadAll }) => {
  const [copied, setCopied] = React.useState(false);

  const copyQuickCommand = () => {
    navigator.clipboard.writeText('docker run -d -p 6080:6080 -p 5901:5901 --name shen-ubuntu shen-ubuntu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/40">
              <span className="text-xl font-black tracking-widest font-mono select-none">SHΞN</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  SHΞN™
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    v22.04 LTS
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                پروژه سرور اوبونتوی رایگان لینوکس با وب دسکتاپ گرافیکی و ترمینال آنلاین
              </p>
            </div>
          </div>

          {/* Social Links & Actions */}
          <div className="flex items-center gap-3">
            {/* Telegram Channel Button */}
            <a
              href="https://t.me/shervini"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
              title="کانال رسمی تلگرام SHΞN™"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span className="font-semibold tracking-wide dir-ltr">T.me/shervini</span>
              <ExternalLink className="w-3 h-3 text-sky-400/70" />
            </a>

            {/* Quick Run Copy */}
            <button
              onClick={copyQuickCommand}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-mono transition-all"
              title="کپی دستور سریع داکر"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'دستور کپی شد!' : 'docker run...'}</span>
            </button>

            {/* Download Files */}
            <button
              onClick={onDownloadAll}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all text-xs font-medium"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">دریافت تمام فایل‌ها</span>
              <span className="sm:hidden">دانلود</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/60">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>آموزش راه‌اندازی (Railway & Docker)</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>کنسول تست و شبیه‌ساز دسکتاپ</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'files'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>فایل‌های پروژه (کدها و اسکریپت‌ها)</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>تولید کانفیگ سفارشی</span>
          </button>
        </div>
      </div>
    </header>
  );
};
