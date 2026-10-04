import React, { useState } from 'react';
import { Flame, Sparkles, LayoutTemplate, Layers, CheckCircle2, Globe, Banknote, HelpCircle } from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../i18n/translations';

interface BrandHeaderProps {
  currentView: 'home' | 'studio';
  onNavigate: (view: 'home' | 'studio') => void;
  onOpenTemplates: () => void;
  onOpenIncomeGuide: () => void;
  onOpenAccessibilityGuide: () => void;
  activeProjectTitle?: string;
  lang: SupportedLang;
  onChangeLang: (lang: SupportedLang) => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  currentView,
  onNavigate,
  onOpenTemplates,
  onOpenIncomeGuide,
  onOpenAccessibilityGuide,
  lang,
  onChangeLang,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const languages: { code: SupportedLang; label: string; flag: string }[] = [
    { code: 'fa', label: 'فارسی (خودمانی)', flag: '🇮🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090d16]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#090d16]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-wider text-sm sm:text-base text-white font-mono">
                TAVANA
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                FORGE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[140px] sm:max-w-none">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Income Guide Button */}
          <button
            onClick={onOpenIncomeGuide}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/35 transition-all shadow-sm active:scale-95"
            title="آموزش پول درآوردن از کوره"
          >
            <Banknote className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">{t.incomeGuideBtn}</span>
            <span className="md:hidden text-[11px]">درآمدزایی</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              title="تغییر زبان"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase font-mono text-[11px]">{lang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute top-full mt-1.5 left-0 z-50 min-w-[150px] bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-1 animate-fade-in text-xs">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onChangeLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-right ${
                      lang === l.code ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-sm">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Studio Toggle Button */}
          {currentView === 'studio' ? (
            <>
              <button
                onClick={onOpenTemplates}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.templatesBtn}</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors"
              >
                <span>{t.homeBtn}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>{t.studioBtn}</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
