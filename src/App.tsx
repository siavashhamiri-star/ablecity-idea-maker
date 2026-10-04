import React, { useState, useEffect } from 'react';
import { SiteManifest } from './types/manifest';
import { TEMPLATES } from './templates';
import { BrandHeader } from './components/BrandHeader';
import { ForgeHero } from './components/ForgeHero';
import { ProductPaths } from './components/ProductPaths';
import { HowItWorks } from './components/HowItWorks';
import { LiveInteractiveDemo } from './components/LiveInteractiveDemo';
import { WhyForge } from './components/WhyForge';
import { ForgeFooter } from './components/ForgeFooter';
import { ForgeWorkspace } from './components/ForgeEditor/ForgeWorkspace';
import { AccessibilityGuideModal } from './components/AccessibilityGuideModal';
import { AndroidExportModal } from './components/ForgeEditor/AndroidExportModal';
import { TemplatesModal } from './components/ForgeEditor/TemplatesModal';
import { OnlineIncomeGuideModal } from './components/OnlineIncomeGuideModal';
import { generateManifestFromPrompt } from './services/aiService';
import { SupportedLang, TRANSLATIONS } from './i18n/translations';
import { HelpCircle, Smartphone, Banknote, Globe } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'studio'>('home');
  const [activeManifest, setActiveManifest] = useState<SiteManifest>(TEMPLATES[0].manifest);
  const [lang, setLang] = useState<SupportedLang>('fa');

  // Accessibility state
  const [adhdMode, setAdhdMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);
  const [isIncomeGuideOpen, setIsIncomeGuideOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // Quick start with idea
  const handleStartBuildingWithIdea = async (ideaPrompt?: string) => {
    if (ideaPrompt && ideaPrompt.trim()) {
      const res = await generateManifestFromPrompt(ideaPrompt.trim());
      if (res.success && res.manifest) {
        setActiveManifest(res.manifest);
      }
    }
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToDemo = () => {
    const demoEl = document.getElementById('forge-live-demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadDemoManifest = (manifest: SiteManifest) => {
    setActiveManifest(manifest);
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fontSizeClass =
    fontSize === 'huge'
      ? 'text-lg'
      : fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      dir={t.dir}
      className={`min-h-screen ${
        highContrast ? 'bg-black text-white contrast-125' : 'bg-[#090d16] text-slate-100'
      } ${adhdMode ? 'adhd-calm-mode' : ''} ${fontSizeClass}`}
    >
      {/* Universal Quick Bar (Always at top) */}
      <div className="bg-slate-950 border-b border-white/5 px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Income Guide Link */}
          <button
            onClick={() => setIsIncomeGuideOpen(true)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold focus:outline-none focus:ring-1 focus:ring-amber-400 rounded px-1"
          >
            <Banknote className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.incomeGuideBtn}</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Guide / Accessibility */}
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-1 text-slate-300 hover:text-white font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.accessibilityBtn}</span>
          </button>

          <span className="text-slate-700 hidden md:inline">|</span>

          {/* Android Gradle */}
          <button
            onClick={() => setIsAndroidModalOpen(true)}
            className="hidden md:flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.androidGradleBtn}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {adhdMode && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
              ADHD Focus ON
            </span>
          )}
          <span className="text-[11px] text-slate-500 font-mono uppercase">
            {lang} · {t.dir}
          </span>
        </div>
      </div>

      {/* Main Brand Header */}
      <BrandHeader
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenIncomeGuide={() => setIsIncomeGuideOpen(true)}
        onOpenAccessibilityGuide={() => setIsGuideOpen(true)}
        activeProjectTitle={activeManifest.meta.title}
        lang={lang}
        onChangeLang={(newLang) => setLang(newLang)}
      />

      {/* Viewport Routing */}
      {currentView === 'home' ? (
        <main>
          {/* 1. Hero Section */}
          <ForgeHero
            onStartBuilding={handleStartBuildingWithIdea}
            onScrollToDemo={handleScrollToDemo}
            lang={lang}
          />

          {/* 2. Product Paths */}
          <ProductPaths onSelectWebsite={() => setCurrentView('studio')} />

          {/* 3. Pipeline How It Works */}
          <HowItWorks />

          {/* 4. Live Interactive Demo (Moment of Magic) */}
          <LiveInteractiveDemo onLoadManifestIntoStudio={handleLoadDemoManifest} />

          {/* 5. Why Forge & Final CTA */}
          <WhyForge onStartNewProject={() => handleStartBuildingWithIdea()} />

          {/* Footer */}
          <ForgeFooter />
        </main>
      ) : (
        <ForgeWorkspace
          initialManifest={activeManifest}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* Modals */}
      <AccessibilityGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        adhdMode={adhdMode}
        onToggleAdhdMode={() => setAdhdMode(!adhdMode)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        fontSize={fontSize}
        onChangeFontSize={(s) => setFontSize(s)}
      />

      <OnlineIncomeGuideModal
        isOpen={isIncomeGuideOpen}
        onClose={() => setIsIncomeGuideOpen(false)}
        lang={lang}
      />

      <AndroidExportModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        manifest={activeManifest}
      />

      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={(tmpl) => {
          setActiveManifest(tmpl);
          setCurrentView('studio');
        }}
      />
    </div>
  );
}
