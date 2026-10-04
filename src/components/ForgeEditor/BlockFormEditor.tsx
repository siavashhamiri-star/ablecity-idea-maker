import React from 'react';
import { Block, FeatureItem, ServiceItem, FaqItem, PricingItem, GalleryItem, TestimonialItem } from '../../types/manifest';
import { Plus, Trash2, Image, Link, Type, AlignLeft } from 'lucide-react';

interface BlockFormEditorProps {
  block: Block;
  onChange: (updated: Block) => void;
}

export const BlockFormEditor: React.FC<BlockFormEditorProps> = ({ block, onChange }) => {
  const updateField = (field: string, value: any) => {
    onChange({
      ...block,
      [field]: value,
    } as Block);
  };

  switch (block.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">نشان بالای تیتر (Badge)</label>
            <input
              type="text"
              value={block.badge || ''}
              onChange={(e) => updateField('badge', e.target.value)}
              placeholder="مثلاً: جدید · تخفیف ویژه"
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان اصلی هیرو (Title)</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">توضیحات تکمیلی (Subtitle)</label>
            <textarea
              rows={3}
              value={block.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 block">دکمه اقدام اصلی</span>
              <input
                type="text"
                value={block.ctaPrimary?.text || ''}
                onChange={(e) => updateField('ctaPrimary', { ...block.ctaPrimary, text: e.target.value, link: block.ctaPrimary?.link || '#' })}
                placeholder="متن دکمه"
                className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-white"
              />
              <input
                type="text"
                value={block.ctaPrimary?.link || ''}
                onChange={(e) => updateField('ctaPrimary', { ...block.ctaPrimary, link: e.target.value, text: block.ctaPrimary?.text || '' })}
                placeholder="لینک (مثلا #contact)"
                className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-white"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block">دکمه ثانویه</span>
              <input
                type="text"
                value={block.ctaSecondary?.text || ''}
                onChange={(e) => updateField('ctaSecondary', { ...block.ctaSecondary, text: e.target.value, link: block.ctaSecondary?.link || '#' })}
                placeholder="متن دکمه"
                className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-white"
              />
              <input
                type="text"
                value={block.ctaSecondary?.link || ''}
                onChange={(e) => updateField('ctaSecondary', { ...block.ctaSecondary, link: e.target.value, text: block.ctaSecondary?.text || '' })}
                placeholder="لینک (مثلا #features)"
                className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">آدرس تصویر (URL)</label>
            <input
              type="text"
              value={block.imageUrl || ''}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              placeholder="https://..."
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">چیدمان (Layout)</label>
            <div className="grid grid-cols-3 gap-2">
              {(['centered', 'split-right', 'split-left'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => updateField('layout', l)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    block.layout === l
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {l === 'centered' ? 'وسط‌چین' : l === 'split-right' ? 'تصویر چپ' : 'تصویر راست'}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان بخش</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">توضیح کوتاه</label>
            <input
              type="text"
              value={block.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">آیتم‌های ویژگی‌ها ({block.items.length})</span>
              <button
                type="button"
                onClick={() => {
                  const newItem: FeatureItem = {
                    id: `f-${Date.now()}`,
                    icon: '⭐',
                    title: 'ویژگی جدید',
                    description: 'توضیحات کوتاه در مورد این مزیت.',
                  };
                  updateField('items', [...block.items, newItem]);
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن آیتم
              </button>
            </div>

            <div className="space-y-2.5">
              {block.items.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].icon = e.target.value;
                        updateField('items', copy);
                      }}
                      className="w-12 text-center text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                      title="آیکون یا ایموجی"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].title = e.target.value;
                        updateField('items', copy);
                      }}
                      className="flex-1 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                      placeholder="عنوان ویژگی"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateField('items', block.items.filter((_, i) => i !== idx));
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].description = e.target.value;
                      updateField('items', copy);
                    }}
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                    placeholder="شرح ویژگی"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'services':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان بخش خدمات</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">لیست خدمات ({block.items.length})</span>
              <button
                type="button"
                onClick={() => {
                  const newItem: ServiceItem = {
                    id: `srv-${Date.now()}`,
                    icon: '💼',
                    title: 'خدمت تازه',
                    description: 'شرح مختصر خدمات ارائه شده.',
                    price: 'توافقی',
                  };
                  updateField('items', [...block.items, newItem]);
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن خدمت
              </button>
            </div>

            <div className="space-y-2.5">
              {block.items.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].icon = e.target.value;
                        updateField('items', copy);
                      }}
                      className="w-12 text-center text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                      title="آیکون"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].title = e.target.value;
                        updateField('items', copy);
                      }}
                      className="flex-1 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                      placeholder="عنوان خدمت"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('items', block.items.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.price || ''}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].price = e.target.value;
                      updateField('items', copy);
                    }}
                    placeholder="هزینه / قیمت (اختیاری)"
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                  />
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].description = e.target.value;
                      updateField('items', copy);
                    }}
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                    placeholder="توضیحات خدمت"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان بخش سوالات متداول</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">پرسش و پاسخ‌ها ({block.items.length})</span>
              <button
                type="button"
                onClick={() => {
                  const newItem: FaqItem = {
                    id: `faq-${Date.now()}`,
                    question: 'پرسش جدید؟',
                    answer: 'پاسخ کامل و شفاف به این پرسش.',
                  };
                  updateField('items', [...block.items, newItem]);
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن پرسش
              </button>
            </div>

            <div className="space-y-2.5">
              {block.items.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].question = e.target.value;
                        updateField('items', copy);
                      }}
                      className="flex-1 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white font-semibold"
                      placeholder="متن سوال..."
                    />
                    <button
                      type="button"
                      onClick={() => updateField('items', block.items.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].answer = e.target.value;
                      updateField('items', copy);
                    }}
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                    placeholder="متن پاسخ..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان بخش تماس</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">شماره تماس مستقیم</label>
            <input
              type="text"
              value={block.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="۰۲۱-۸۸۰۰۰۰۰۰"
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">ایمیل رسمی</label>
            <input
              type="email"
              value={block.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="info@example.com"
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">نشانی و آدرس</label>
            <input
              type="text"
              value={block.address || ''}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="showFormCheck"
              checked={block.showForm}
              onChange={(e) => updateField('showForm', e.target.checked)}
              className="rounded bg-slate-900 border-white/20 text-amber-500 focus:ring-0"
            />
            <label htmlFor="showFormCheck" className="text-xs text-slate-300 cursor-pointer">
              نمایش فرم ثبت درخواست و ارسال پیام آنلاین
            </label>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان بخش تعرفه‌ها</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">پلن‌های قیمت‌گذاری ({block.items.length})</span>
              <button
                type="button"
                onClick={() => {
                  const newItem: PricingItem = {
                    id: `p-${Date.now()}`,
                    name: 'پلن استاندارد',
                    price: 'تماس بگیرید',
                    features: ['قابلیت اول', 'قابلیت دوم'],
                    ctaText: 'سفارش پلن',
                    ctaLink: '#contact',
                  };
                  updateField('items', [...block.items, newItem]);
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن پلن
              </button>
            </div>

            <div className="space-y-3">
              {block.items.map((plan, idx) => (
                <div key={plan.id} className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].name = e.target.value;
                        updateField('items', copy);
                      }}
                      className="flex-1 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white font-bold"
                      placeholder="نام پلن"
                    />
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].price = e.target.value;
                        updateField('items', copy);
                      }}
                      className="w-28 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-amber-400 font-bold"
                      placeholder="قیمت"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('items', block.items.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={plan.features.join(' ، ')}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].features = e.target.value.split('،').map((s) => s.trim()).filter(Boolean);
                      updateField('items', copy);
                    }}
                    placeholder="ویژگی‌ها (با کاما یا ، جدا کنید)"
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان گالری</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">تصاویر گالری ({block.items.length})</span>
              <button
                type="button"
                onClick={() => {
                  const newItem: GalleryItem = {
                    id: `g-${Date.now()}`,
                    title: 'تصویر جدید',
                    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
                    caption: 'توضیحات کوتاه',
                  };
                  updateField('items', [...block.items, newItem]);
                }}
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن تصویر
              </button>
            </div>

            <div className="space-y-2.5">
              {block.items.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...block.items];
                        copy[idx].title = e.target.value;
                        updateField('items', copy);
                      }}
                      className="flex-1 text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                      placeholder="عنوان تصویر"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('items', block.items.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(e) => {
                      const copy = [...block.items];
                      copy[idx].imageUrl = e.target.value;
                      updateField('items', copy);
                    }}
                    placeholder="URL تصویر"
                    className="w-full text-xs p-1.5 rounded bg-slate-950 border border-white/10 text-white"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان درباره ما</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">متن کامل</label>
            <textarea
              rows={4}
              value={block.content}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white"
            />
          </div>
        </div>
      );

    case 'footer':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">نام برند در فوتر</label>
            <input
              type="text"
              value={block.brandName}
              onChange={(e) => updateField('brandName', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">متن کپی‌رایت</label>
            <input
              type="text"
              value={block.copyright}
              onChange={(e) => updateField('copyright', e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white"
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="p-4 text-center text-xs text-slate-500">
          ویرایشگر برای این بلاک به‌صورت خودکار در دسترس است.
        </div>
      );
  }
};
