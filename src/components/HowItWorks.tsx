import React from 'react';
import { Lightbulb, Cpu, FileJson, Palette, Eye, ShieldCheck, Download, ArrowDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '۰۱',
      icon: Lightbulb,
      title: 'ایده شما (IDEA)',
      desc: 'کسب‌وکار، خدمات یا پرسونای مخاطب خود را به زبان ساده بیان می‌کنید.',
      color: 'text-amber-400',
    },
    {
      step: '۰۲',
      icon: Cpu,
      title: 'استخراج مشخصات (AI / SPEC)',
      desc: 'امکان‌سنجی اولیه انجام شده و اجزای مورد نیاز تفکیک می‌شوند.',
      color: 'text-orange-400',
    },
    {
      step: '۰۳',
      icon: FileJson,
      title: 'مانیفست داده (MANIFEST)',
      desc: 'سند JSON به عنوان تنها منبع حقیقت با اسکیما رسمی تولید و اعتبارسنجی می‌شود.',
      color: 'text-emerald-400',
    },
    {
      step: '۰۴',
      icon: Palette,
      title: 'طراحی و بلاک‌ها (DESIGN)',
      desc: 'بلاک‌های استاندارد هیرو، خدمات، قیمت و تماس چیدمان می‌شوند.',
      color: 'text-cyan-400',
    },
    {
      step: '۰۵',
      icon: Eye,
      title: 'پیش‌نمایش زنده (PREVIEW)',
      desc: 'در لحظه خروجی را روی فریم موبایل و وب به صورت تعاملی می‌بینید.',
      color: 'text-blue-400',
    },
    {
      step: '۰۶',
      icon: ShieldCheck,
      title: 'آزمایش خودکار (TEST)',
      desc: 'لینک‌ها، تصاویر، ساختار سئو و خطاهای احتمالی تست و نمره‌دهی می‌شوند.',
      color: 'text-teal-400',
    },
    {
      step: '۰۷',
      icon: Download,
      title: 'صادرات ZIP (EXPORT)',
      desc: 'یک پکیج کامل، تمیز و مستقل بدون هیچ وابستگی یا قفل پلتفرم دانلود می‌کنید.',
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-950/60 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold font-mono tracking-widest text-amber-400 uppercase">
            THE FORGE PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
            مسیر تبدیل ایده به محصول چگونه کار می‌کند؟
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            بدون کدهای نامفهوم و بدون ابهام؛ تمام مراحل در هفت ایستگاه مشخص و شفاف انجام می‌گیرد.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.slice(0, 4).map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900/60 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                      {s.step}
                    </span>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {steps.slice(4).map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx + 4}
                className="relative rounded-2xl bg-slate-900/60 border border-white/5 p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                      {s.step}
                    </span>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
