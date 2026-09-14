import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Terminal, Shield, Sparkles, Cpu, Globe, Laptop, ArrowRight } from 'lucide-react';

export const DeployGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'railway' | 'docker' | 'sshx'>('railway');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              نسخه اختصاصی ابری SHΞN™ — کاملاً رایگان و بهینه
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              سرور اوبونتو با رابط گرافیکی (GUI) و دسترسی SSH آنلاین
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              با این پروژه می‌توانید بدون نیاز به خرید سرور مجازی، یک کانتینر کامل اوبونتو ۲۲.۰۴ به همراه دسکتاپ سبک XFCE4، مرورگر فایرفاکس و ابزارهای توسعه را بر بستر Railway یا Docker در کمتر از ۱۰ دقیقه راه‌اندازی کنید.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <a
              href="https://railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>ورود به Railway</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/shervini"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>پشتیبانی در تلگرام (SHΞN™)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">هزینه سرور</p>
              <p className="text-sm font-bold text-slate-100">۱۰۰٪ رایگان</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">رابط کاربری</p>
              <p className="text-sm font-bold text-slate-100">XFCE4 + noVNC</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">ترمینال آنلاین</p>
              <p className="text-sm font-bold text-slate-100">ابزار sshx فوری</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">سیستم‌عامل</p>
              <p className="text-sm font-bold text-slate-100">Ubuntu 22.04 LTS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Method Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setPlatform('railway')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            platform === 'railway'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          🚂 دیپلوی ابری رایگان روی Railway
        </button>
        <button
          onClick={() => setPlatform('docker')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            platform === 'docker'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          🐳 اجرای محلی یا VPS با Docker
        </button>
        <button
          onClick={() => setPlatform('sshx')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            platform === 'sshx'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          🔑 فعال‌سازی ترمینال آنلاین (sshx)
        </button>
      </div>

      {/* Content for Railway */}
      {platform === 'railway' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">1</span>
              مرحله اول: آپلود یا کپی مخزن در GitHub
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              فایل‌های پروژه (از جمله <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">Dockerfile</code> و <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">README.md</code> که از تب «فایل‌های پروژه» دانلود می‌کنید) را در حساب گیت‌هاب خود در یک مخزن جدید به نام دلخواه (مثلاً <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">docker-ubuntu-shen</code>) قرار دهید.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">✓ بدون نیاز به کامپایل محلی</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">✓ بیلد مستقیم در سرورهای ابری</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">2</span>
              مرحله دوم: اتصال به Railway و شروع Deploy
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
              <li>وارد سایت <a href="https://railway.app" target="_blank" rel="noreferrer" className="text-purple-400 underline">Railway.app</a> شوید و با اکانت GitHub ورود کنید.</li>
              <li>روی دکمه <strong className="text-white">+ New Project</strong> کلیک کنید.</li>
              <li>گزینه <strong className="text-white">Deploy from GitHub repo</strong> را انتخاب کرده و مخزن اوبونتوی خود را برگزینید.</li>
              <li>چند دقیقه فرصت دهید تا پلتفرم Railway فرآیند ساخت ایمیج اوبونتو را تکمیل کند.</li>
            </ol>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">3</span>
              مرحله سوم: تنظیم شبکه و باز کردن پورت 6080
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              برای اینکه بتوانید دسکتاپ را در مرورگر مشاهده کنید، باید پورت <strong className="text-cyan-300">6080</strong> (پورت وب‌سرور noVNC) را پابلیک کنید:
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
                وارد تب <strong>Settings</strong> سرویس خود در Railway شوید.
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
                به بخش <strong>Networking</strong> اسکرول کنید.
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
                روی دکمه <strong>Generate Domain</strong> کلیک کنید و پورت پیش‌فرض را روی <code className="text-amber-300 font-mono">6080</code> قرار دهید.
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
                همچنین می‌توانید <strong>TCP Proxy</strong> را فعال کنید تا پورت 6080 به یک پورت مستقیم TCP نگاشت شود.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">4</span>
              مرحله چهارم: اتصال به دسکتاپ گرافیکی
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              دامنه‌ای که Railway به شما اختصاص داده است را در تب جدید باز کنید (به عنوان مثال <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded dir-ltr">https://your-app.up.railway.app/vnc.html</code>).
            </p>
            <p className="text-emerald-400 text-sm font-medium">
              تبریک! اکنون دسکتاپ اوبونتو ۲۲.۰۴ با فایرفاکس و منوی XFCE آماده استفاده است.
            </p>
          </div>
        </div>
      )}

      {/* Content for Docker */}
      {platform === 'docker' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                روش ۱: اجرای سریع با Docker CLI
              </h3>
              <button
                onClick={() => copyToClipboard('docker run -d -p 6080:6080 -p 5901:5901 --name shen-ubuntu-server shen-ubuntu', 'cli')}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2.5 py-1.5 rounded-lg border border-cyan-500/20"
              >
                {copiedIndex === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی دستور</span>
              </button>
            </div>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto space-y-2 dir-ltr text-left">
              <div className="text-slate-500"># ۱. ساخت ایمیج از داکرفایل SHΞN™</div>
              <div className="text-emerald-400">docker build -t shen-ubuntu .</div>
              <div className="text-slate-500 mt-3"># ۲. اجرای کانتینر در پس‌زمینه</div>
              <div className="text-cyan-300">
                docker run -d \
                  -p 6080:6080 \
                  -p 5901:5901 \
                  --name shen-ubuntu-server \
                  --shm-size=1gb \
                  shen-ubuntu
              </div>
            </div>

            <p className="text-xs text-slate-400">
              سپس در مرورگر خود آدرس <span className="text-cyan-300 font-mono">http://localhost:6080/vnc.html</span> را باز کنید.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                روش ۲: اجرای یکپارچه با Docker Compose
              </h3>
              <button
                onClick={() => copyToClipboard('docker-compose up -d --build', 'compose')}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2.5 py-1.5 rounded-lg border border-cyan-500/20"
              >
                {copiedIndex === 'compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی دستور</span>
              </button>
            </div>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto space-y-2 dir-ltr text-left">
              <div className="text-slate-500"># اجرای سرور تنها با یک دستور:</div>
              <div className="text-cyan-300">docker-compose up -d --build</div>
              <div className="text-slate-500 mt-2"># مشاهده لاگ سرور:</div>
              <div className="text-slate-400">docker-compose logs -f</div>
            </div>
          </div>
        </div>
      )}

      {/* Content for sshx */}
      {platform === 'sshx' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              دسترسی فوری و بدون رمز به ترمینال (SSHx Tunnel)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ابزار <strong className="text-emerald-300">sshx</strong> این امکان را می‌دهد که حتی اگر پورت SSH سرور مسدود باشد، با یک لینک تحت وب و امن به کنسول کامل لینوکس سرور اوبونتو متصل شوید.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2 dir-ltr text-left">
                <div className="text-slate-500"># گام ۱: نصب خودکار sshx در سرور</div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400">curl -sSf https://sshx.io/get | sh</span>
                  <button
                    onClick={() => copyToClipboard('curl -sSf https://sshx.io/get | sh', 'sshx-install')}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    {copiedIndex === 'sshx-install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-slate-500 mt-3"># گام ۲: اجرای آن و ساخت لینک آنلاین</div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300">sshx</span>
                  <button
                    onClick={() => copyToClipboard('sshx', 'sshx-run')}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    {copiedIndex === 'sshx-run' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <strong>توجه امنیتی:</strong> لینکی که sshx برای شما تولید می‌کند مستقیماً دسترسی روت ترمینال را در اختیار قرار می‌دهد. این لینک را در محیط‌های عمومی یا با افراد ناشناس به اشتراک نگذارید.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
