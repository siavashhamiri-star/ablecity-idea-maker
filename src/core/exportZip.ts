import JSZip from 'jszip';
import { SiteManifest } from '../types/manifest';
import { renderStaticSite } from './renderer';

export async function generateProjectZip(manifest: SiteManifest): Promise<Blob> {
  const zip = new JSZip();
  const render = renderStaticSite(manifest);

  const cleanIndexHtml = `<!doctype html>
<html lang="${manifest.meta.language || 'fa'}" dir="${manifest.meta.rtl ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${manifest.meta.title}</title>
    <meta name="description" content="${manifest.meta.description || ''}" />
    <!-- Vazirmatn Persian Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
${render.html}
    <script src="script.js"></script>
  </body>
</html>`;

  const readmeContent = `# ${manifest.meta.title}
این وب‌سایت با استفاده از **TAVANA PRODUCT FORGE** (کوره ساخت محصول توانا) تولید شده است.

## ساختار فایل‌ها:
- \`index.html\`: سند اصلی وب‌سایت با معماری سمانتیک و واکنش‌گرا
- \`style.css\`: استایل‌های بهینه‌سازی‌شده و طراحی مدرن
- \`script.js\`: رفتارهای تعاملی فرانت‌اند (FAQ، هندلر فرم تماس، دکمه بازگشت به بالا)
- \`manifest.json\`: پرونده منبع حقیقت (Data Manifest) جهت ویرایش مجدد در کوره توانا

## نحوه اجرا و انتشار:
1. برای مشاهده، کافیست فایل \`index.html\` را در هر مرورگری (کامپیوتر یا موبایل) باز کنید.
2. برای استقرار آنلاین، می‌توانید این پوشه را مستقیماً روی سرورهای ابری نظیر Cloudflare Pages، GitHub Pages، Liara یا کنترل‌پنل cPanel بارگذاری کنید.

## نکات فنی و شفافیت عملکردی:
- **فرم تماس (Contact Form):** فرم تماس موجود در این بسته به صورت کاملاً فرانت‌اندی (استاتیک) پیاده شده است و برای جلوگیری از پیچیدگی و وابستگی به سرور در فاز MVP، پس از ثبت پیام بازخورد کلاینت نمایش می‌دهد و نیازمند اتصال بک‌اند یا وب‌هوک برای ارسال ایمیل است.
- **تصاویر خارجی (External Images):** در صورتی که در سایت از تصاویر آنلاین (مانند Unsplash) استفاده شده باشد، لود آن‌ها نیازمند اتصال اینترنت است. برای استفاده کاملاً آفلاین، فایل‌های تصویری را ذخیره کرده و آدرس محلی به آن‌ها بدهید.

تولید شده در: ${new Date().toLocaleString('fa-IR')}
توسط کوره ساخت محصول توانا (Tavana Product Forge)
`;

  // Add files to ZIP
  zip.file('index.html', cleanIndexHtml);
  zip.file('style.css', render.css);
  zip.file('script.js', render.js);
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  zip.file('README.md', readmeContent);

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
