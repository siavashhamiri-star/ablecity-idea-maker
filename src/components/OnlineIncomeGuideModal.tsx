import React, { useState } from 'react';
import {
  Banknote,
  X,
  TrendingUp,
  Store,
  Smartphone,
  Gamepad2,
  Globe2,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Flame,
  Zap,
} from 'lucide-react';
import { SupportedLang } from '../i18n/translations';

interface OnlineIncomeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLang;
}

export const OnlineIncomeGuideModal: React.FC<OnlineIncomeGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<number>(0);

  if (!isOpen) return null;

  const strategies = [
    {
      id: 1,
      icon: Store,
      badge: 'سریع‌ترین درآمد نقدی',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: '۱. پروژه‌گیری برای کسب‌وکارهای دور و بر (Local Flipping)',
      formula: 'ایده + ۵ دقیقه کوره توانا = ۵ الی ۱۵ میلیون تومان دستمزد نقدی',
      description:
        'دور و برت رو نگاه کن: تالار عروسی، کلینیک دندونپزشکی، سالن زیبایی، کافه، مکانیکی، وکیل، املاک. ۹۰٪ این‌ها یا اصلاً سایت ندارن یا سایت داغون وردپرسی دارن که رو گوشی لود نمیشه. تو با کوره توانا در ۵ دقیقه یه لندینگ مستقل، خوش‌رنگ و لعاب با شماره تماس، منو و گالری می‌سازی و بهشون نشون میدی. کیه که نخواد؟',
      actionSteps: [
        'یه نمونه واقعی از صنف مورد نظر با کوره بساز (مثلاً تالار یا کلینیک).',
        'با گوشی خودت حضوری یا تو واتساپ/بله نشون صاحب کسب‌وکار بده و بگو: این مال شماست، می‌خواید همین امروز با دامنه خودتون آنلاین بشه؟',
        'فایل زیپ رو تحویل بده یا رو یه هاست رایگان (مثل کلودفلر/لیارا) بنداز و پولتو نقد بگیر.',
      ],
    },
    {
      id: 2,
      icon: TrendingUp,
      badge: 'درآمد غیرفعال و درصدی',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: '۲. شراکت در فروش و پورسانت از هر مشتری (Lead Generation)',
      formula: 'لندینگ پیج تخصصی + توافق با اوستا کار = پورسانت ثابت ماهانه',
      description:
        'نیازی نیست خودت خدمات بدی! مثلاً یه صفحه خفن برای «تعمیر پکیج شرق تهران» یا «نصب آسانسور» یا «تور کویر» می‌سازی. فرم تماس و شماره اختصاصی می‌ذاری، بعد میری با یه نصاب یا فنی‌کار کاربلد توافق می‌کنی که هر مشتری فرستادی، ۱۵ تا ۳۰ درصد بهت پورسانت بده.',
      actionSteps: [
        'لندینگ رو روی یه کلمه کلیدی پرتقاضا بساز.',
        'لینک رو تو گروه‌ها، دیوار، شبکه‌های اجتماعی یا با تبلیغ کلیکی ارزان شیر کن.',
        'شماره مشتری‌ها که تو فرم اومد رو بفرست برای همکارت و سهمت رو نقدی تسویه کن.',
      ],
    },
    {
      id: 3,
      icon: Smartphone,
      badge: 'کافه‌بازار، مایکت و گوگل‌پلی',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: '۳. انتشار اپلیکیشن و بازی در مارکت‌ها با تبلیغات ادنتورک',
      formula: 'پکیج Gradle کوره + تپسل/یکتانت/AdMob = درآمد مستمر از نصب',
      description:
        'با بخش اتوماسیون Gradle کوره توانا، سایتت رو با یک کلیک تبدیل به APK و AAB می‌کنی. با اسکریپت خودکار کلید ریلیز می‌سازی و در کافه‌بازار، مایکت یا گوگل‌پلی منتشر می‌کنی. با اضافه کردن تبلیغات بنری، ویدیویی یا خرید اشتراک VIP، هر کاربری که برنامه رو باز کنه برات درآمد میندازه.',
      actionSteps: [
        'محتوای کاربردی یا بانک اطلاعاتی (مثلا راهنمای آزمون، رژیم غذایی، پکیج آموزش) رو قالب کن.',
        'خروجی Gradle رو بردار و بدون دستکاری کد، APK رسمی امضا شده رو خروجی بگیر.',
        'در مارکت‌ها منتشر کن و از ادنتورک‌ها تسویه حساب هفتگی/ماهانه بگیر.',
      ],
    },
    {
      id: 4,
      icon: Gamepad2,
      badge: 'ترند آینده و وایرال',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      title: '۴. مینی‌گیم‌های تعاملی ۲بعدی و گیمیفیکیشن برندی',
      formula: 'بازی سبک وب + اسپانسری برند = جذب ترافیک میلیونی',
      description:
        'بازی‌های ساده و اعتیادآور (مثل کوییزهای سرعتی، گردونه شانس، بازی‌های رکوردی) بهترین روش برای جذب مخاطب هستن. برندها برای معرفی محصولشون حاضرن پول درشت بدن تا یه بازی اختصاصی با تم برندشون براشون بسازی.',
      actionSteps: [
        'از مسیر بازی کوره استفاده کن و تم برند کارفرما رو روی بازی سوار کن.',
        'بازی رو همراه با لندینگ به کافه‌ها، فروشگاه‌های آنلاین یا پیج‌های اینستاگرام بفروش.',
      ],
    },
    {
      id: 5,
      icon: Globe2,
      badge: 'درآمد دلاری و ارزی',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      title: '۵. درآمد دلاری با تحویل فوری در سایت‌های بین‌المللی',
      formula: 'اکانت فریلنسری + سرعت برق‌آسای کوره = ۵۰ الی ۲۰۰ دلار برای هر لندینگ',
      description:
        'توی سایت‌هایی مثل Upwork یا Fiverr یا حتی کانال‌های تلگرامی بین‌المللی، روزانه هزاران نفر دنبال یک صفحه فرود (Landing Page) فوری برای رویداد، رستوران، وبینار یا معرفی رمزارز/محصولشون هستن. سرعت توانا بهت این امکان رو میده که سفارشی که دیگران ۲ روز طول میدن رو در نیم ساعت تحویل بدی و ۵۰ تا ۲۰۰ دلار به جیب بزنی!',
      actionSteps: [
        'زبان کوره رو بذار رو انگلیسی و نمونه‌کارهای تمیز خروجی بگیر.',
        'گیگ یا پیشنهاد تحویل زیر ۲ ساعت بذار و با سرعتت رقبا رو حذف کن.',
      ],
    },
  ];

  const fullCopyText = `💰 نقشه راه پول درآوردن از کوره ساخت محصول توانا:

۱. پروژه‌گیری محلی:
طراحی لندینگ اختصاصی برای تالارها، کلینیک‌ها، وکلا و کافه‌های دور و بر در ۵ دقیقه با دستمزد ۵ تا ۱۵ میلیون تومان خالص.

۲. لید جنریشن (پورسانت از مشتری):
ساخت صفحه معرفی خدمات پرتقاضا (تعمیرات، زیبایی، ساختمانی) و دریافت ۱۵ تا ۳۰٪ پورسانت از هر مشتری فرستاده شده به همکار فنی.

۳. انتشار در بازار و مایکت با پکیج خودکار Gradle:
تبدیل سایت به اپلیکیشن رسمی APK/AAB و کسب درآمد روزانه از تبلیغات تپسل و یکتانت.

۴. مینی‌گیم و بازی ۲بعدی:
طراحی بازی‌های سرعتی و گردونه شانس برای مسابقات اینستاگرامی و پروموشن برندها.

۵. درآمد ارزی (دلاری):
تحویل فوق‌سریع لندینگ‌های انگلیسی به مشتریان خارجی در فایور و آپورک به قیمت ۵۰ الی ۲۰۰ دلار.

🔥 نکته طلایی بازار:
مردم بابت کدهای پیچیده پول نمیدن، بابت «حل کردن مشکلشون» و «سریع تحویل گرفتن» پول نقد میدن!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCopyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const current = strategies[activeStrategy];
  const IconComponent = current.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-md">
              <Banknote className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
                <span>چطور با ساخت سایت، اپ و گیم پول واقعی دربیاریم؟</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  آموزش کف بازار
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">راهنمای نقد، خودمانی و عملیاتی برای درآمدزایی میلیونی با کوره توانا</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950 px-3 pt-2 gap-1.5 overflow-x-auto">
          {strategies.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStrategy(idx)}
              className={`py-2 px-3 text-xs font-bold rounded-t-lg transition-all shrink-0 flex items-center gap-1.5 ${
                activeStrategy === idx
                  ? 'bg-slate-900 text-amber-300 border-t-2 border-amber-400 border-x border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{s.title.split('.')[0]}</span>
              <span className="hidden sm:inline">{s.title.split('.')[1]?.slice(0, 18)}...</span>
            </button>
          ))}
        </div>

        {/* Strategy Details Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-200">
          
          {/* Main Strategy Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-black text-sm sm:text-base text-white">{current.title}</h3>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                {current.badge}
              </span>
            </div>

            {/* Formula */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>فرمول بازی: {current.formula}</span>
            </div>

            {/* Explanation */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {current.description}
            </p>

            {/* Action steps */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block">سه قدم عملیاتی برای بستن قرارداد:</span>
              <div className="space-y-1.5">
                {current.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Golden Rule of Street Smart Business */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-amber-500/20 flex items-start gap-3">
            <Flame className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block mb-0.5">راز نهایی درآمد پایدار اینترنتی:</span>
              <p className="text-slate-400 leading-relaxed">
                مشتری برای اصطلاحات پیچیده کامپیوتری پول نمیده؛ مشتری برای اینکه کارش بی دردسر، سریع و آبرومند روی گوشی بالا بیاد پول نقد پرداخت می‌کنه. کوره توانا دقیقاً این قدرت رو گذاشته توی جیبت!
              </p>
            </div>
          </div>

        </div>

        {/* Footer with 1-Tap Copy */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between flex-wrap gap-2.5">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">کپی شد در کلیپ‌بورد گوشی!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>کپی کل نقشه درآمدزایی برای یادداشت‌های موبایل</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow"
          >
            دمت گرم، بریم بسازیم!
          </button>
        </div>

      </div>
    </div>
  );
};
