export type FeasibilityStatus = 'feasible' | 'needs_adjustment' | 'out_of_scope';

export interface FeasibilityAssessment {
  status: FeasibilityStatus;
  statusLabel: string;
  statusIcon: string;
  badgeClass: string;
  summary: string;
  recommendation: string;
  suggestedBlocks: string[];
}

/**
 * Evaluates feasibility of a user idea for the 1-Page Website Builder MVP.
 */
export function assessFeasibility(prompt: string): FeasibilityAssessment {
  const p = prompt.toLowerCase();

  // Out of scope detection
  const outOfScopePatterns = [
    'بازی آنلاین', 'game', 'mmorpg', 'unity', 'انریل',
    'بانکداری', 'درگاه شاپرک متصل به دیتابیس بانکی',
    'چت آنلاین بلادرنگ با وب سوکت', 'چت بلادرنگ',
    'سیستم پرداخت چندمرحله‌ای با احراز هویت پیامکی',
    'شبکه اجتماعی مثل اینستاگرام', 'دیوار', 'اسنپ', 'سامانه ثبت احوال',
  ];

  for (const pattern of outOfScopePatterns) {
    if (p.includes(pattern)) {
      return {
        status: 'out_of_scope',
        statusLabel: 'خارج از Scope کوره فعلی',
        statusIcon: '🔴',
        badgeClass: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
        summary: 'این ایده نیازمند بک‌اند سنگین، دیتابیس توزیع‌شده، سرورهای بلادرنگ یا احراز هویت پیچیده است که در نسخه تک‌صفحه‌ای فعلی پشتیبانی نمی‌شود.',
        recommendation: 'پیشنهاد: ساخت لندینگ پیج معرفی، پیش‌ثبت‌نام، جذب سرنخ (Lead Generation) یا معرفی قابلیت‌های این محصول به جای سیستم بک‌اند کامل.',
        suggestedBlocks: ['hero', 'features', 'about', 'cta', 'contact', 'footer'],
      };
    }
  }

  // Needs adjustment detection (e.g. dynamic shop, user auth, booking calendar sync)
  const adjustmentPatterns = [
    'فروشگاه', 'سبد خرید', 'خرید آنلاین', 'پنل کاربری', 'ثبت نام کاربر',
    'رزرو آنلاین با تقویم', 'نوبت دهی', 'پرداخت اینترنتی', 'تیکتینگ', 'لاگین'
  ];

  for (const pattern of adjustmentPatterns) {
    if (p.includes(pattern)) {
      return {
        status: 'needs_adjustment',
        statusLabel: 'قابل ساخت با تغییر ساختار (Landing Mode)',
        statusIcon: '🟡',
        badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        summary: 'ایده شما شامل بخش‌های داینامیک است. در معماری بدون بک‌اند Forge، این بخش‌ها به صورت پکیج‌های قیمت‌گذاری، فرم ثبت سفارش مستقیم و ارتباط در شبکه‌های اجتماعی پیاده‌سازی می‌شوند.',
        recommendation: 'تبدیل به صفحه فروشگاهی/خدماتی با معرفی محصولات، لیست قیمت، فرم ثبت پیش‌خرید یا تماس مستقیم.',
        suggestedBlocks: ['hero', 'features', 'gallery', 'pricing', 'faq', 'contact', 'footer'],
      };
    }
  }

  // Feasible
  return {
    status: 'feasible',
    statusLabel: 'کاملاً قابل ساخت در Forge MVP',
    statusIcon: '🟢',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    summary: 'این ایده دقیقاً منطبق بر معماری تک‌صفحه‌ای واکنش‌گرا و مستقل TAVANA PRODUCT FORGE است و با بالاترین کیفیت خروجی داده خواهد شد.',
    recommendation: 'شامل بلاک‌های معرفی محصول/خدمات، اعتبارسنجی، گالری و راه‌های ارتباط مستقیم با مشتری.',
    suggestedBlocks: ['hero', 'features', 'services', 'testimonials', 'faq', 'contact', 'footer'],
  };
}
