import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Eye,
  Volume2,
  Brain,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  Sliders,
  Layers,
  Download,
  Flame,
  FileCode2,
  Copy,
  Check,
} from 'lucide-react';

interface AccessibilityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  adhdMode: boolean;
  onToggleAdhdMode: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'huge';
  onChangeFontSize: (size: 'normal' | 'large' | 'huge') => void;
}

export const AccessibilityGuideModal: React.FC<AccessibilityGuideModalProps> = ({
  isOpen,
  onClose,
  adhdMode,
  onToggleAdhdMode,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'accessibility' | 'pipeline'>('guide');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="guide-title" className="font-extrabold text-white text-sm sm:text-base">
                راهنمای جامع کوره و تنظیمات دسترسی‌پذیری (Accessibility)
              </h2>
              <p className="text-[11px] text-slate-400">معرفی برنامه، راهنمای گام‌به‌گام و ابزارهای مناسب‌سازی</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن پنجره راهنما"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-white/10 bg-slate-950 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-2 px-3 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-slate-900 text-amber-300 border-t border-x border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>معرفی و نقشه راه</span>
          </button>

          <button
            onClick={() => setActiveTab('accessibility')}
            className={`py-2 px-3 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'accessibility'
                ? 'bg-slate-900 text-amber-300 border-t border-x border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>دسترسی‌پذیری ویژه (ADHD، نابینایان و ناشنوایان)</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`py-2 px-3 text-xs font-bold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'bg-slate-900 text-amber-300 border-t border-x border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>مراحل گام‌به‌گام کارگاه</span>
          </button>
        </div>

        {/* Tab 1: Introduction & App Overview */}
        {activeTab === 'guide' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200">
              <h3 className="font-black text-sm text-amber-300 mb-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                کوره ساخت محصول توانا (TAVANA PRODUCT FORGE) چیست؟
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                توانا یک کوره تبدیل ایده به محصول مستقل است. این سیستم با حذف کلیشه‌های داشبوردهای خسته‌کننده، این امکان را فراهم می‌آورد که بدون دانش برنامه‌نویسی و از روی گوشی موبایل، یک وب‌سایت تک‌صفحه‌ای فوق‌سریع، با سئو کامل و خروجی تمیز ZIP بسازید.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs sm:text-sm">قوانین بنیادین معماری کوره:</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span><strong>مانیفست تنها منبع حقیقت است:</strong> هیچ کد پراکنده یا خارج از ساختاری در پروژه نوشته نمی‌شود؛ تمام محتوا در قالب سند ساختاریافته JSON با نسخه اسکیما ثبت می‌گردد.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span><strong>رندرینگ استاتیک خالص:</strong> خروجی نهایی بدون وابستگی به فریم‌ورک‌های سنگین و تنها با HTML5 سمانتیک، CSS اختصاصی و حداقل جاوااسکریپت تولید می‌شود.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span><strong>هوش مصنوعی فقط کالیبره‌کننده داده است:</strong> AI به صورت مستقیم کدهای شکننده تولید نمی‌کند؛ بلکه مانیفست را می‌سازد و پیش از اعمال اعتبارسنجی ۱۰۰٪ می‌گردد.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Accessibility Suite (ADHD, Visually Impaired, Deaf, Motor) */}
        {activeTab === 'accessibility' && (
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            
            {/* ADHD & Focus Mode */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">حالت تمرکز و آرامش ذهن (مخصوص ADHD)</h4>
                    <p className="text-[11px] text-slate-400">کاهش انیمیشن‌ها، حذف عناصر مزاحم بصری و وضوح یکپارچه وظایف</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={adhdMode}
                  onClick={onToggleAdhdMode}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    adhdMode ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                      adhdMode ? 'translate-x-0' : '-translate-x-6'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* High Contrast for Visually Impaired */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">کنتراست حداکثری (High Contrast برای کم‌بینایان)</h4>
                    <p className="text-[11px] text-slate-400">افزایش شفافیت متون و حاشیه‌ها مطابق استاندارد WCAG AAA</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={highContrast}
                  onClick={onToggleHighContrast}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    highContrast ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                      highContrast ? 'translate-x-0' : '-translate-x-6'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Font Size Scaler */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">اندازه قلم و فونت</h4>
                  <p className="text-[11px] text-slate-400">تطبیق خوانایی با اندازه نمایشگر و توان بینایی کاربر</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onChangeFontSize('normal')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      fontSize === 'normal' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    عادی
                  </button>
                  <button
                    onClick={() => onChangeFontSize('large')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      fontSize === 'large' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    بزرگ
                  </button>
                  <button
                    onClick={() => onChangeFontSize('huge')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      fontSize === 'huge' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    بسیار بزرگ
                  </button>
                </div>
              </div>
            </div>

            {/* Deaf & Motor Accessibility Notes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>طراحی برای ناشنوایان و کم‌شنوایان:</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                تمام بازخوردهای سیستم صرفاً بصری هستند (رنگ‌های وضعیت، توست‌های ملموس، آیکون‌های تایید و نوار پیشرفت). هیچ رویداد صوتی الزامی در کوره وجود ندارد.
              </p>
            </div>

          </div>
        )}

        {/* Tab 3: Step-by-Step Pipeline Guide */}
        {activeTab === 'pipeline' && (
          <div className="p-5 overflow-y-auto space-y-3 flex-1">
            <div className="space-y-3">
              {[
                { num: '۱', title: 'ورود ایده یا انتخاب قالب', desc: 'در صفحه اصلی یا دکمه قالب‌ها، تم اولیه کسب‌وکار خود را انتخاب کنید یا ایده را به فارسی تایپ نمایید.' },
                { num: '۲', title: 'تولید مانیفست استاندارد', desc: 'مانیفست به صورت خودکار با رعایت اعتبارسنجی اسکیما تولید می‌شود و در تب «بلاک‌ها» قرار می‌گیرد.' },
                { num: '۳', title: 'ویرایش لمسی در موبایل', desc: 'روی هر بلاک کلیک کنید تا متون، قیمت‌ها، شماره تماس و تصاویر را مطابق میل خود تغییر دهید.' },
                { num: '۴', title: 'پیش‌نمایش زنده در فریم موبایل و دسکتاپ', desc: 'همزمان با تایپ یا تغییر رنگ، پیش‌نمایش در فریم زنده بدون نیاز به ذخیره دستی به‌روزرسانی می‌شود.' },
                { num: '۵', title: 'تست خودکار و سنجش سلامت', desc: 'روی دکمه «تست» کلیک کنید تا لینک‌ها، عکس‌ها و استانداردهای چیدمان بررسی و نمره‌دهی شوند.' },
                { num: '۶', title: 'دریافت خروجی ZIP واقعی', desc: 'با یک کلیک فایل ZIP کامل شامل index.html، style.css و script.js را دانلود و روی هر هاستی مستقر کنید.' },
              ].map((step) => (
                <div key={step.num} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="font-bold text-white text-xs">{step.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            طراحی شده با احترام به تمام توان‌یابان و سازندگان موبایل
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow"
          >
            متوجه شدم و ادامه
          </button>
        </div>

      </div>
    </div>
  );
};
