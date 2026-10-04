import React, { useState } from 'react';
import { Flame, ArrowLeft, Play, Sparkles, CheckCircle2, Layers, Code2, Download } from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../i18n/translations';

interface ForgeHeroProps {
  onStartBuilding: (initialPrompt?: string) => void;
  onScrollToDemo: () => void;
  lang: SupportedLang;
}

export const ForgeHero: React.FC<ForgeHeroProps> = ({
  onStartBuilding,
  onScrollToDemo,
  lang,
}) => {
  const [ideaInput, setIdeaInput] = useState('');
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBuilding(ideaInput.trim());
  };

  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden border-b border-white/5">
      {/* Subtle Forge Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/15 via-orange-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Badge: System Status */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-amber-200 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold">{t.badgeMvp}</span>
          </div>
        </div>

        {/* Main Hero Headlines - Street Smart & Punchy */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.25] tracking-tight mb-4">
            {t.heroTitle1}{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              {t.heroTitleHighlight}
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300/95 leading-relaxed font-normal max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Instant Idea Input / Quick Action Box */}
        <div className="max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-slate-900/95 border border-amber-500/30 shadow-2xl shadow-amber-950/20 backdrop-blur-lg focus-within:border-amber-400 transition-all">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder={t.ideaInputPlaceholder}
                className="w-full bg-transparent px-4 py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
              >
                <Flame className="w-4 h-4 fill-slate-950" />
                <span>{t.startBuildingBtn}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Idea Prompts */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center text-xs text-slate-400">
            <span className="text-slate-500 text-[11px]">{t.quickIdeasLabel}</span>
            {t.quickIdeas.map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIdeaInput(idea);
                  onStartBuilding(idea);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-white/5 transition-all text-[11px]"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onStartBuilding()}
            className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 underline decoration-slate-600 underline-offset-4"
          >
            {t.emptyOrTemplateBtn}
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={onScrollToDemo}
            className="text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            {t.seeDemoBtn}
          </button>
        </div>

        {/* ============================================================== */}
        {/* VISUAL HERO: Physical / Digital Forge Flow Representation     */}
        {/* ============================================================== */}
        <div className="relative mx-auto rounded-2xl bg-gradient-to-b from-slate-900 to-[#090d16] border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 mr-2">{t.pipelineStatus}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.pipelineCore}
              </span>
            </div>
          </div>

          {/* Interactive Pipeline Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-center">
            
            {/* Step 1: IDEA */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold">01. {t.step1Title}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs font-bold text-white">«{ideaInput || t.quickIdeas[0]}»</p>
              <span className="text-[11px] text-slate-400">{t.step1Desc}</span>
            </div>

            {/* Step 2: MANIFEST */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-amber-500/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold">02. {t.step2Title}</span>
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs font-bold text-white">{t.step2Desc}</p>
              <div className="text-[10px] text-emerald-400 bg-slate-950/80 p-1.5 rounded border border-white/5 font-mono overflow-hidden">
                {`{ "schemaVersion": 1, "blocks": 6 }`}
              </div>
            </div>

            {/* Step 3: RENDERER */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold">03. {t.step3Title}</span>
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-xs font-bold text-white">{t.step3Desc}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">Hero</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Services</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Pricing</span>
              </div>
            </div>

            {/* Step 4: PREVIEW & ZIP EXPORT */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold">04. {t.step4Title}</span>
                <Download className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs font-bold text-white">{t.step4Desc}</p>
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                <span>تست ۱۰۰٪</span>
                <span>خروجی ZIP + APK</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
