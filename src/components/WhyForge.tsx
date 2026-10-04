import React from 'react';
import { Smartphone, Bot, FileCode2, Eye, DownloadCloud, Sparkles, ShieldCheck } from 'lucide-react';

interface WhyForgeProps {
  onStartNewProject: () => void;
}

export const WhyForge: React.FC<WhyForgeProps> = ({ onStartNewProject }) => {
  const pillars = [
    {
      icon: Smartphone,
      title: 'موبایل‌محور (Mobile-First)',
      desc: 'ساخته شده برای سازندگانی که با گوشی موبایل کار می‌کنند. رابط کاربری بدون گیر و کاملاً لمسی.',
    },
    {
      icon: FileCode2,
      title: 'مانیفست‌محور (Manifest-Based)',
      desc: 'داده خالص و ساختاریافته تنها منبع حقیقت است؛ بدون کدهای درهم‌تنیده و غیرقابل کنترل.',
    },
    {
      icon: Bot,
      title: 'دستیار هوش مصنوعی واقعی',
      desc: 'هوش مصنوعی فقط مانیفست را می‌سازد و تصحیح می‌کند، نه کدهای مبهم و توهم‌زا.',
    },
    {
      icon: Eye,
      title: 'پیش‌نمایش لحظه‌ای',
      desc: 'هر تغییر در متن یا رنگ بلافاصله در شبیه‌ساز زنده موبایل و وب منعکس می‌شود.',
    },
    {
      icon: DownloadCloud,
      title: 'خروجی زیپ واقعی (Real Export)',
      desc: 'کد تمیز HTML/CSS مستقل، بدون وابستگی به سرور یا پرداخت اشتراک برای استقرار.',
    },
    {
      icon: ShieldCheck,
      title: 'اعتبارسنجی و تست خودکار',
      desc: 'بررسی لینک‌های شکسته، تصاویر ناقص و خطاهای چیدمان پیش از دریافت نهایی.',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold font-mono tracking-widest text-amber-400 uppercase">
            WHY TAVANA FORGE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 mb-3">
            چرا کوره ساخت محصول توانا؟
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            توسعه‌یافته بر اساس استانداردهای دقیق مهندسی و حذف زوائد پیچیده وب.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-amber-500/25 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Final CTA Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-700/20 border border-amber-500/30 p-8 md:p-12 text-center overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              ایده‌ات را وارد کن، محصولت را تحویل بگیر
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              همین حالا بدون نیاز به دانش برنامه‌نویسی و در چند دقیقه اولین وب‌سایت واقعی خود را در کوره توانا بسازید.
            </p>
            <button
              onClick={onStartNewProject}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm md:text-base shadow-xl shadow-amber-950/30 transition-all active:scale-95"
            >
              شروع پروژه جدید (New Project)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
