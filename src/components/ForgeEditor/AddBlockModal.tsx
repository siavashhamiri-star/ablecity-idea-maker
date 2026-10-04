import React from 'react';
import { Block, BlockType } from '../../types/manifest';
import { ALLOWED_BLOCK_TYPES } from '../../core/validator';
import { X, Plus, Layers, Flame } from 'lucide-react';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlock: (block: Block) => void;
}

export const AddBlockModal: React.FC<AddBlockModalProps> = ({ isOpen, onClose, onAddBlock }) => {
  if (!isOpen) return null;

  const blockCatalog: { type: BlockType; name: string; desc: string; icon: string }[] = [
    { type: 'hero', name: 'بلاک هیرو (Hero)', desc: 'بخش اصلی بالای سایت با تیتر، توضیحات، دکمه و تصویر', icon: '🚀' },
    { type: 'features', name: 'ویژگی‌ها (Features)', desc: 'کارت‌های مزایا و نقاط قوت محصول یا خدمت شما', icon: '⚡' },
    { type: 'services', name: 'خدمات (Services)', desc: 'لیست خدمات تخصصی با جزئیات و تعرفه', icon: '💼' },
    { type: 'gallery', name: 'گالری تصاویر (Gallery)', desc: 'نمایش تصاویر محصولات، رویدادها یا فضای کسب‌وکار', icon: '🖼️' },
    { type: 'pricing', name: 'تعرفه‌ها و قیمت (Pricing)', desc: 'جدول پلن‌های قیمتی با ویژگی‌ها و دکمه خرید/رزرو', icon: '🏷️' },
    { type: 'testimonials', name: 'نظرات مشتریان (Testimonials)', desc: 'نظرات، رضایت‌نامه‌ها و اعتبارسنجی اجتماعی', icon: '💬' },
    { type: 'faq', name: 'سوالات متداول (FAQ)', desc: 'پرسش و پاسخ‌های آکاردئونی برای رفع ابهام کاربران', icon: '❓' },
    { type: 'about', name: 'درباره ما (About)', desc: 'شرح داستان برند، سابقه و آمارهای کلیدی', icon: '📖' },
    { type: 'contact', name: 'تماس با ما (Contact)', desc: 'تلفن، آدرس، نقشه و فرم ارسال پیام مستقیم', icon: '📞' },
    { type: 'cta', name: 'فراخوان اقدام (CTA)', desc: 'بخش ترغیب‌کننده نهایی با دکمه جلب مشتری', icon: '🎯' },
    { type: 'footer', name: 'فوتر (Footer)', desc: 'پاورقی پایانی، لینک‌ها و حق کپی‌رایت', icon: '⚓' },
  ];

  const createDefaultBlock = (type: BlockType): Block => {
    const id = `${type}-${Date.now()}`;
    switch (type) {
      case 'hero':
        return {
          id,
          type: 'hero',
          visible: true,
          title: 'تیتر جذاب و اثرگذار صفحه',
          subtitle: 'توضیحات کوتاه پیرامون ارزش پیشنهادی خدمات شما.',
          ctaPrimary: { text: 'شروع همکاری', link: '#contact' },
          layout: 'centered',
        };
      case 'features':
        return {
          id,
          type: 'features',
          visible: true,
          title: 'ویژگی‌های کلیدی',
          items: [
            { id: 'f1', icon: '⚡', title: 'سرعت بالا', description: 'بهینه‌سازی حداکثری برای کاربران.' },
            { id: 'f2', icon: '🛡️', title: 'کیفیت و امنیت', description: 'رعایت تمام استانداردهای معتبر.' },
          ],
        };
      case 'services':
        return {
          id,
          type: 'services',
          visible: true,
          title: 'خدمات تخصصی ما',
          items: [
            { id: 's1', icon: '⚙️', title: 'طراحی اختصاصی', description: 'مطابق با نیازهای شما.', price: 'تماس بگیرید' },
          ],
        };
      case 'gallery':
        return {
          id,
          type: 'gallery',
          visible: true,
          title: 'نمونه تصاویر',
          items: [
            { id: 'g1', title: 'تصویر نمونه ۱', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
          ],
        };
      case 'pricing':
        return {
          id,
          type: 'pricing',
          visible: true,
          title: 'تعرفه‌ها و پلن‌ها',
          items: [
            { id: 'p1', name: 'پلن پایه', price: 'تماس بگیرید', features: ['امکانات اصلی', 'پشتیبانی اداری'], ctaText: 'سفارش', ctaLink: '#contact' },
          ],
        };
      case 'testimonials':
        return {
          id,
          type: 'testimonials',
          visible: true,
          title: 'رضایت همراهان',
          items: [
            { id: 't1', name: 'نام کاربر', role: 'مدیر شرکت', quote: 'تجربه‌ای بسیار حرفه‌ای و لذت‌بخش بود.' },
          ],
        };
      case 'faq':
        return {
          id,
          type: 'faq',
          visible: true,
          title: 'پرسش‌های متداول',
          items: [
            { id: 'q1', question: 'چگونه می‌توانم نوبت یا سفارش ثبت کنم؟', answer: 'کافیست فرم تماس را تکمیل نموده یا با تلفن ما تماس بگیرید.' },
          ],
        };
      case 'about':
        return {
          id,
          type: 'about',
          visible: true,
          title: 'درباره مجموعه ما',
          content: 'ما با هدف ارتقای کیفیت خدمات و تسهیل دسترسی مشتریان فعالیت خود را آغاز کرده‌ایم.',
        };
      case 'contact':
        return {
          id,
          type: 'contact',
          visible: true,
          title: 'راه‌های ارتباطی',
          phone: '۰۲۱-۱۲۳۴۵۶۷۸',
          email: 'contact@example.com',
          showForm: true,
        };
      case 'cta':
        return {
          id,
          type: 'cta',
          visible: true,
          title: 'همین امروز به جمع مشتریان ما بپیوندید',
          buttonText: 'ارتباط با ما',
          buttonLink: '#contact',
        };
      case 'footer':
        return {
          id,
          type: 'footer',
          visible: true,
          brandName: 'برند شما',
          copyright: '© ۱۴۰۳ تمامی حقوق محفوظ است.',
          links: [{ id: 'l1', title: 'تماس', url: '#contact' }],
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base">افزودن بلاک جدید به صفحه</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {blockCatalog.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                onAddBlock(createDefaultBlock(item.type));
                onClose();
              }}
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-white/5 hover:border-amber-500/30 flex items-center justify-between transition-all group text-right"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl p-2 rounded-lg bg-slate-900 border border-white/5">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
