import React from 'react';
import { SiteManifest } from '../../types/manifest';
import { Palette, Type, Globe, Sliders } from 'lucide-react';

interface ThemeEditorProps {
  manifest: SiteManifest;
  onChange: (updated: SiteManifest) => void;
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ manifest, onChange }) => {
  const updateMeta = (field: string, val: any) => {
    onChange({
      ...manifest,
      meta: {
        ...manifest.meta,
        [field]: val,
      },
    });
  };

  const updateTheme = (field: string, val: any) => {
    onChange({
      ...manifest,
      theme: {
        ...manifest.theme,
        [field]: val,
      },
    });
  };

  const colorPresets = [
    { label: 'طلایی کوره', primary: '#f59e0b', accent: '#38bdf8' },
    { label: 'نارنجی مذاب', primary: '#ea580c', accent: '#0284c7' },
    { label: 'آبی اقیانوسی', primary: '#0284c7', accent: '#38bdf8' },
    { label: 'زمردی پر انرژی', primary: '#10b981', accent: '#06b6d4' },
    { label: 'یاقوتی لوکس', primary: '#e11d48', accent: '#f43f5e' },
    { label: 'بنفش سایبر', primary: '#8b5cf6', accent: '#ec4899' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Meta Settings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Globe className="w-4 h-4" />
          <span>مشخصات وب‌سایت و سئو</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان تب مرورگر و سایت (Title)</label>
          <input
            type="text"
            value={manifest.meta.title}
            onChange={(e) => updateMeta('title', e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">توضیحات متادیتا (Meta Description)</label>
          <textarea
            rows={2}
            value={manifest.meta.description || ''}
            onChange={(e) => updateMeta('description', e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* 2. Color Palettes */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Palette className="w-4 h-4" />
          <span>پالت رنگی برند (Design Tokens)</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange({
                  ...manifest,
                  theme: {
                    ...manifest.theme,
                    primaryColor: preset.primary,
                    accentColor: preset.accent,
                  },
                });
              }}
              className="p-2 rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 flex items-center gap-2.5 transition-all"
            >
              <div
                className="w-5 h-5 rounded-full shrink-0 shadow"
                style={{ backgroundColor: preset.primary }}
              />
              <span className="text-xs text-slate-300 font-medium">{preset.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">کد رنگ اصلی (Primary)</label>
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-white/10">
              <input
                type="color"
                value={manifest.theme.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={manifest.theme.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                className="w-full text-xs bg-transparent text-white font-mono focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">کد رنگ مکمل (Accent)</label>
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-white/10">
              <input
                type="color"
                value={manifest.theme.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={manifest.theme.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                className="w-full text-xs bg-transparent text-white font-mono focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Border Radius & Typography */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Sliders className="w-4 h-4" />
          <span>شعاع گوشه‌ها (Border Radius)</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => updateTheme('borderRadius', r)}
              className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
                manifest.theme.borderRadius === r
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
              }`}
            >
              {r === 'none' ? 'تیز' : r === 'sm' ? 'کم' : r === 'md' ? 'متوسط' : r === 'lg' ? 'گرد' : 'کامل'}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
