import React from 'react';
import { Send, ShieldCheck, Heart, ExternalLink, MessageCircle } from 'lucide-react';

export const SocialBanner: React.FC = () => {
  return (
    <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-sky-950/20 to-slate-900 p-6 sm:p-8 shadow-xl mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 shadow-lg shadow-sky-950/50">
            <Send className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white">کانال رسمی و پشتیبانی SHΞN™</h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Official
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              برای عضویت در کانال، دریافت جدیدترین پروژه‌ها، آموزش‌های رایگان لینوکس و کانتینرهای ابری ما را در تلگرام دنبال کنید.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="https://t.me/shervini"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-4 h-4 fill-current" />
            <span className="dir-ltr font-mono">T.me/shervini</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>نسخه پایدار اوبونتو ۲۲.۰۴ سفارشی‌سازی شده برای جامعه متن‌باز توسط SHΞN™</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>ساخته شده با</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>توسط SHΞN™</span>
        </div>
      </div>
    </div>
  );
};
