import React, { useState } from 'react';
import { Sparkles, Code2, Eye, ArrowLeft, Check, Smartphone, Monitor } from 'lucide-react';
import { TEMPLATES } from '../templates';
import { renderStaticSite } from '../core/renderer';
import { SiteManifest } from '../types/manifest';

interface LiveInteractiveDemoProps {
  onLoadManifestIntoStudio: (manifest: SiteManifest) => void;
}

export const LiveInteractiveDemo: React.FC<LiveInteractiveDemoProps> = ({
  onLoadManifestIntoStudio,
}) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(1); // Services / تالار عروسی by default
  const [activeTab, setActiveTab] = useState<'preview' | 'manifest'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  const currentTemplate = TEMPLATES[selectedDemoIndex];
  const rendered = renderStaticSite(currentTemplate.manifest);

  const demoPresets = [
    { label: 'تالار پذیرایی و عروسی', index: 1, prompt: 'یک سایت مجلل برای تالار عروسی با معرفی منوها، گالری تالار، سوالات متداول و رزرو بازدید' },
    { label: 'شرکت مهندسی و صنعتی', index: 0, prompt: 'یک سایت رسمی برای شرکت مهندسی ساختمانی با لیست پروژه‌ها، گواهینامه‌ها و تماس' },
    { label: 'استودیو دیزاین محصول', index: 2, prompt: 'لندینگ پیج مدرن برای استودیو طراحی محصول و UI/UX با تعرفه‌های اسپرینت و نمونه کار' },
  ];

  return (
    <section id="forge-live-demo" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>دموی زنده و واقعی · Prototype / Demo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          لحظه جادو: تبدیل ایده خام به صفحه واقعی
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          مشاهده کنید چگونه یک توصیف ساده کسب‌وکار، بی‌درنگ تبدیل به مانیفست استاندارد داده و یک وب‌سایت کاملاً مستقل می‌شود.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {demoPresets.map((preset) => (
          <button
            key={preset.index}
            onClick={() => setSelectedDemoIndex(preset.index)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              selectedDemoIndex === preset.index
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Idea Prompt Banner */}
      <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-lg">💡</span>
          <div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wide block">ورودی ایده کاربر:</span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">«{demoPresets.find(p => p.index === selectedDemoIndex)?.prompt}»</p>
          </div>
        </div>

        <button
          onClick={() => onLoadManifestIntoStudio(currentTemplate.manifest)}
          className="self-end sm:self-center px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <span>ویرایش این پروژه در کارگاه</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Showcase Frame */}
      <div className="rounded-2xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 flex-wrap gap-2">
          
          {/* Switch tabs: Preview vs Manifest */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>پیش‌نمایش زنده</span>
            </button>
            <button
              onClick={() => setActiveTab('manifest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'manifest'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>سند مانیفست (JSON)</span>
            </button>
          </div>

          {/* Viewport switch (Mobile vs Desktop) when in Preview */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === 'mobile' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
                title="نمایش موبایل"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">موبایل</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === 'desktop' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
                title="نمایش دسکتاپ"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">دسکتاپ</span>
              </button>
            </div>
          )}

          <div className="text-xs text-slate-400 font-mono hidden md:block">
            {currentTemplate.manifest.meta.title.slice(0, 35)}...
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 bg-[#070a10] min-h-[480px] flex items-center justify-center">
          {activeTab === 'preview' ? (
            <div
              className={`transition-all duration-300 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/10 ${
                previewDevice === 'mobile'
                  ? 'max-w-[375px] h-[580px] ring-8 ring-slate-900 rounded-[36px]'
                  : 'max-w-full h-[580px]'
              }`}
            >
              <iframe
                title="Interactive Demo Preview"
                srcDoc={rendered.fullHtml}
                className="w-full h-full border-none bg-[#090d16]"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            <div className="w-full h-[580px] overflow-auto rounded-xl bg-slate-950 p-4 border border-white/5 font-mono text-xs text-emerald-400 leading-relaxed text-left" dir="ltr">
              <pre>{JSON.stringify(currentTemplate.manifest, null, 2)}</pre>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
