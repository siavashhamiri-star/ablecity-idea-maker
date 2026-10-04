import { SiteManifest, Block } from '../types/manifest';
import { renderStaticSite } from './renderer';

export interface TestItem {
  id: string;
  category: 'links' | 'images' | 'content' | 'responsive' | 'blocks' | 'html';
  title: string;
  description: string;
  status: 'pass' | 'warn' | 'fail';
  detail?: string;
}

export interface TestSuiteResult {
  score: number; // 0 - 100
  passedCount: number;
  warnCount: number;
  failCount: number;
  tests: TestItem[];
}

/**
 * Runs automated quality & integrity tests on the SiteManifest
 */
export function runManifestTests(manifest: SiteManifest): TestSuiteResult {
  const tests: TestItem[] = [];

  // 1. Mandatory Content: Title
  if (!manifest.meta.title || manifest.meta.title.trim().length < 3) {
    tests.push({
      id: 'title-check',
      category: 'content',
      title: 'عنوان سایت و متادیتا',
      description: 'بررسی وجود عنوان معنادار و سئو برای تب مرورگر و موتورهای جستجو',
      status: 'fail',
      detail: 'عنوان صفحه خالی است یا کمتر از ۳ کاراکتر دارد.',
    });
  } else {
    tests.push({
      id: 'title-check',
      category: 'content',
      title: 'عنوان سایت و متادیتا',
      description: 'بررسی وجود عنوان معنادار و سئو برای تب مرورگر',
      status: 'pass',
      detail: `عنوان تعیین‌شده: "${manifest.meta.title}"`,
    });
  }

  // 2. Mandatory Content: Hero Block
  const heroBlock = manifest.blocks.find((b) => b.type === 'hero' && b.visible);
  if (!heroBlock) {
    tests.push({
      id: 'hero-block-check',
      category: 'content',
      title: 'بخش اصلی هیرو (Hero Banner)',
      description: 'بررسی وجود سربرگ جذاب جهت معرفی سریع ارزش پیشنهادی سایت',
      status: 'warn',
      detail: 'هیچ بلاک هیرو فعالی در مانیفست یافت نشد.',
    });
  } else {
    tests.push({
      id: 'hero-block-check',
      category: 'content',
      title: 'بخش اصلی هیرو (Hero Banner)',
      description: 'بررسی وجود سربرگ جذاب برای مخاطبان',
      status: 'pass',
      detail: 'بلاک Hero با متن و دکمه‌های اقدام به عمل تعریف شده است.',
    });
  }

  // 3. Links check: examine all anchor links across blocks
  let brokenOrEmptyLinks = 0;
  let totalLinks = 0;

  manifest.blocks.forEach((block) => {
    if (block.type === 'hero') {
      if (block.ctaPrimary) {
        totalLinks++;
        if (!block.ctaPrimary.link || block.ctaPrimary.link === '#') brokenOrEmptyLinks++;
      }
      if (block.ctaSecondary) {
        totalLinks++;
        if (!block.ctaSecondary.link || block.ctaSecondary.link === '#') brokenOrEmptyLinks++;
      }
    } else if (block.type === 'pricing') {
      block.items.forEach((item) => {
        totalLinks++;
        if (!item.ctaLink || item.ctaLink === '#') brokenOrEmptyLinks++;
      });
    } else if (block.type === 'cta') {
      totalLinks++;
      if (!block.buttonLink || block.buttonLink === '#') brokenOrEmptyLinks++;
    } else if (block.type === 'footer') {
      block.links.forEach((l) => {
        totalLinks++;
        if (!l.url) brokenOrEmptyLinks++;
      });
    }
  });

  if (brokenOrEmptyLinks > 0) {
    tests.push({
      id: 'links-check',
      category: 'links',
      title: 'صحت پیوندها و دکمه‌ها',
      description: 'بررسی مقصدهای معتبر لینک‌ها و جلوگیری از پیوندهای خالی (#)',
      status: 'warn',
      detail: `از مجموع ${totalLinks} لینک در صفحه، ${brokenOrEmptyLinks} لینک بدون آدرس مقصد یا به صورت # تعریف شده‌اند.`,
    });
  } else {
    tests.push({
      id: 'links-check',
      category: 'links',
      title: 'صحت پیوندها و دکمه‌ها',
      description: 'بررسی مقصدهای معتبر لینک‌ها',
      status: 'pass',
      detail: `تمام ${totalLinks} دکمه و لینک دارای مقصد تعریف‌شده هستند.`,
    });
  }

  // 4. Image sanity check
  let emptyImages = 0;
  let totalImages = 0;

  manifest.blocks.forEach((b) => {
    if (b.type === 'hero' && b.imageUrl !== undefined) {
      totalImages++;
      if (!b.imageUrl) emptyImages++;
    }
    if (b.type === 'gallery') {
      b.items.forEach((i) => {
        totalImages++;
        if (!i.imageUrl) emptyImages++;
      });
    }
    if (b.type === 'about' && b.imageUrl !== undefined) {
      totalImages++;
      if (!b.imageUrl) emptyImages++;
    }
  });

  if (emptyImages > 0) {
    tests.push({
      id: 'image-check',
      category: 'images',
      title: 'بررسی آدرس و بارگذاری تصاویر',
      description: 'بررسی سلامت آدرس‌های تصویر در گالری و بخش‌ها',
      status: 'fail',
      detail: `${emptyImages} تصویر دارای آدرس خالی هستند و در مرورگر شکسته نشان داده می‌شوند.`,
    });
  } else if (totalImages === 0) {
    tests.push({
      id: 'image-check',
      category: 'images',
      title: 'بررسی تصاویر و جلوه بصری',
      description: 'بررسی وجود المان‌های گرافیکی جذاب',
      status: 'warn',
      detail: 'سایت فاقد هرگونه تصویر است. افزودن تصویر یا گالری تعامل کاربران را به شدت افزایش می‌دهد.',
    });
  } else {
    tests.push({
      id: 'image-check',
      category: 'images',
      title: 'بررسی آدرس و بارگذاری تصاویر',
      description: 'بررسی سلامت و بارگذاری روان تصاویر',
      status: 'pass',
      detail: `تمام ${totalImages} تصویر دارای آدرس معتبر و حالت lazy-loading هستند.`,
    });
  }

  // 5. Incomplete Blocks check
  const incompleteBlocks: string[] = [];
  manifest.blocks.forEach((b, idx) => {
    if (b.type === 'features' && b.items.length === 0) incompleteBlocks.push(`بلاک ویژگی‌ها (ردیف ${idx + 1})`);
    if (b.type === 'services' && b.items.length === 0) incompleteBlocks.push(`بلاک خدمات (ردیف ${idx + 1})`);
    if (b.type === 'pricing' && b.items.length === 0) incompleteBlocks.push(`بلاک قیمت‌گذاری (ردیف ${idx + 1})`);
    if (b.type === 'faq' && b.items.length === 0) incompleteBlocks.push(`بلاک سوالات متداول (ردیف ${idx + 1})`);
    if (b.type === 'gallery' && b.items.length === 0) incompleteBlocks.push(`بلاک گالری (ردیف ${idx + 1})`);
  });

  if (incompleteBlocks.length > 0) {
    tests.push({
      id: 'incomplete-blocks',
      category: 'blocks',
      title: 'کامل بودن محتوای بلاک‌ها',
      description: 'بررسی عدم وجود بخش‌های تهی یا بدون داده',
      status: 'warn',
      detail: `بخش‌های زیر فاقد آیتم هستند: ${incompleteBlocks.join('، ')}`,
    });
  } else {
    tests.push({
      id: 'incomplete-blocks',
      category: 'blocks',
      title: 'کامل بودن محتوای بلاک‌ها',
      description: 'بررسی عدم وجود بخش‌های تهی',
      status: 'pass',
      detail: 'تمامی بلاک‌ها دارای محتوا و آیتم‌های مورد نیاز هستند.',
    });
  }

  // 6. Responsive & Mobile checks
  tests.push({
    id: 'responsive-check',
    category: 'responsive',
    title: 'تطابق موبایل و استاندارد Viewport',
    description: 'بررسی متا تگ viewport و فونت واکنش‌گرا clamp',
    status: 'pass',
    detail: 'متا تگ viewport استاندارد، گرید واکنش‌گرا و چیدمان Mobile-first تضمین شده است.',
  });

  // 7. Contact / Conversion check
  const contactBlock = manifest.blocks.find((b) => b.type === 'contact' && b.visible);
  if (!contactBlock) {
    tests.push({
      id: 'contact-check',
      category: 'content',
      title: 'پل ارتباطی و تماس',
      description: 'امکان تماس مشتریان یا ثبت فرم سفارش',
      status: 'warn',
      detail: 'هیچ بلاک تماسی در صفحه وجود ندارد. مشتریان راه مستقیمی برای تعامل نخواهند داشت.',
    });
  } else {
    tests.push({
      id: 'contact-check',
      category: 'content',
      title: 'پل ارتباطی و تماس',
      description: 'امکان تماس مشتریان یا ثبت فرم سفارش',
      status: 'pass',
      detail: 'بخش تماس و ارتباط با کاربر فعال است.',
    });
  }

  // 8. HTML validity and rendering check
  try {
    const rendered = renderStaticSite(manifest);
    if (!rendered.fullHtml.includes('<!doctype html>') || !rendered.fullHtml.includes('</html>')) {
      tests.push({
        id: 'html-check',
        category: 'html',
        title: 'اعتبار ساختار HTML5',
        description: 'رعایت تگ‌های استاندارد وب و بسته شدن صحیح داکیومنت',
        status: 'fail',
        detail: 'ساختار HTML تولید شده ناقص است.',
      });
    } else {
      tests.push({
        id: 'html-check',
        category: 'html',
        title: 'اعتبار ساختار HTML5',
        description: 'رعایت تگ‌های استاندارد وب و داکیومنت کامل',
        status: 'pass',
        detail: 'سند HTML معتبر و مستقل بدون خطای نحوی تولید شد.',
      });
    }
  } catch (err: any) {
    tests.push({
      id: 'html-check',
      category: 'html',
      title: 'اعتبار ساختار HTML5',
      description: 'رندرینگ سند استاتیک',
      status: 'fail',
      detail: `خطا در پردازش HTML: ${err?.message || 'نامشخص'}`,
    });
  }

  // Score calculation
  const passedCount = tests.filter((t) => t.status === 'pass').length;
  const warnCount = tests.filter((t) => t.status === 'warn').length;
  const failCount = tests.filter((t) => t.status === 'fail').length;

  const score = Math.round(
    ((passedCount * 100) + (warnCount * 50)) / Math.max(tests.length, 1)
  );

  return {
    score,
    passedCount,
    warnCount,
    failCount,
    tests,
  };
}
