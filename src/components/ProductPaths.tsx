import React from 'react';
import { Globe, Gamepad2, Smartphone, Cpu, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

interface ProductPathsProps {
  onSelectWebsite: () => void;
}

export const ProductPaths: React.FC<ProductPathsProps> = ({ onSelectWebsite }) => {
  const paths = [
    {
      id: 'website',
      title: 'وب‌سایت تک‌صفحه‌ای مستقل',
      englishTitle: 'Static Website Forge',
      icon: Globe,
      status: 'active',
      statusText: 'فعال در MVP کنونی',
      tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      description: 'ساخت صفحات معرفی، خدمات، کسب‌وکار، نمونه‌کار و لندینگ پیج با بالاترین سرعت بارگذاری، سئو استاندارد و خروجی فشرده ZIP.',
      actionText: 'ساخت وب‌سایت',
      isPrimary: true,
    },
    {
      id: 'game2d',
      title: 'بازی تعاملی ۲بعدی',
      englishTitle: '2D Game Engine',
      icon: Gamepad2,
      status: 'coming_soon',
      statusText: 'فاز دوم · در دست توسعه',
      tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      description: 'کوره بازی‌های کژوال تعاملی مبتنی بر بوم HTML5/Canvas برای گیمیفیکیشن، پروموشن برند و سرگرمی‌های آنلاین.',
      actionText: 'به‌زودی',
      isPrimary: false,
    },
    {
      id: 'webapp',
      title: 'وب‌اپلیکیشن کاربردی PWA',
      englishTitle: 'PWA Web App',
      icon: Smartphone,
      status: 'coming_soon',
      statusText: 'فاز سوم · برنامه‌ریزی‌شده',
      tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      description: 'اپلیکیشن‌های وب قابل نصب روی موبایل با حافظه محلی و قابلیت کارکرد در شرایط قطعی یا ضعف اینترنت.',
      actionText: 'به‌زودی',
      isPrimary: false,
    },
    {
      id: 'customapp',
      title: 'اپلیکیشن اختصاصی سازمانی',
      englishTitle: 'Native & Custom Solutions',
      icon: Cpu,
      status: 'future',
      statusText: 'آینده · خروجی کاتلین / APK',
      tagColor: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
      description: 'خروجی‌های کاتلین برای تبدیل به پکیج‌های نیتیو اندروید و توزیع در بازارهای رسمی اپلیکیشن.',
      actionText: 'آینده',
      isPrimary: false,
    },
  ];

  return (
    <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold font-mono tracking-widest text-amber-400 uppercase">
          TAVANA FORGE ROADMAP
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
          مسیرهای محصول در کوره توانا
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          کوره توانا در آینده بستری جامع برای انواع محصولات دیجیتال خواهد بود؛ اما اکنون توان کامل ما بر ساخت بی‌نقص و بی‌دردسر وب‌سایت‌های مدرن متمرکز است.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {paths.map((p) => {
          const Icon = p.icon;
          const isActive = p.status === 'active';

          return (
            <div
              key={p.id}
              className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-b from-slate-900 to-[#0e1422] border-2 border-amber-500/40 shadow-xl shadow-amber-950/20'
                  : 'bg-slate-900/40 border border-white/5 opacity-75 hover:opacity-90'
              }`}
            >
              <div>
                {/* Header status badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.tagColor}`}>
                    {p.statusText}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
                <span className="text-[11px] font-mono text-slate-400 block mb-3">{p.englishTitle}</span>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div>
                {isActive ? (
                  <button
                    onClick={onSelectWebsite}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>{p.actionText}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full py-2 px-3 rounded-xl bg-slate-800/40 border border-white/5 text-slate-400 text-[11px] font-medium flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>{p.actionText}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
