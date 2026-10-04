import React, { useState } from 'react';
import { Bot, Sparkles, X, ArrowLeft, Loader2, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Cpu } from 'lucide-react';
import { SiteManifest } from '../../types/manifest';
import { generateManifestFromPrompt, getAiConnectionStatus } from '../../services/aiService';
import { assessFeasibility, FeasibilityAssessment } from '../../core/feasibility';

interface AiForgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentManifest: SiteManifest;
  onApplyNewManifest: (manifest: SiteManifest) => void;
}

export const AiForgeModal: React.FC<AiForgeModalProps> = ({
  isOpen,
  onClose,
  currentManifest,
  onApplyNewManifest,
}) => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feasibility, setFeasibility] = useState<FeasibilityAssessment | null>(null);
  const [generatedManifest, setGeneratedManifest] = useState<SiteManifest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePromptChange = (text: string) => {
    setPrompt(text);
    if (text.trim().length > 4) {
      setFeasibility(assessFeasibility(text));
    } else {
      setFeasibility(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setErrorMsg(null);
    setGeneratedManifest(null);

    try {
      const result = await generateManifestFromPrompt(
        prompt.trim(),
        mode === 'edit' ? currentManifest : undefined
      );

      if (result.success && result.manifest) {
        setGeneratedManifest(result.manifest);
      } else {
        setErrorMsg(result.error || 'خطا در اعتبارسنجی مانیفست خروجی هوش مصنوعی.');
      }
    } catch (e: any) {
      setErrorMsg(e?.message || 'خطای غیرمنتظره در تولید مانیفست.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAccept = () => {
    if (generatedManifest) {
      onApplyNewManifest(generatedManifest);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">دستیار کوره هوش مصنوعی (AI Manifest Forge)</h3>
              <p className="text-[11px] text-slate-400">تولید و اصلاح مانیفست داده با اعتبارسنجی قطعی اسکیما</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-5 pt-4 pb-2 flex gap-2">
          <button
            onClick={() => setMode('create')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'create'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            تولید پروژه تازه از روی ایده
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'edit'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            اصلاح مانیفست پروژه فعلی
          </button>
        </div>

        {/* Body Form */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* AI Status Transparency Banner */}
          {(() => {
            const aiStatus = getAiConnectionStatus();
            return (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  aiStatus.isConnected
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold">{aiStatus.statusBadge}</span>
                    <span className="text-[11px] opacity-80 block">{aiStatus.description}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 shrink-0">
                  {aiStatus.statusLabel}
                </span>
              </div>
            );
          })()}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {mode === 'create'
                ? 'ایده کسب‌وکار یا وب‌سایت مدنظرتان را تشریح کنید:'
                : 'تغییراتی که می‌خواهید روی سایت فعلی اعمال شود را بیان کنید:'}
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder={
                mode === 'create'
                  ? 'مثلاً: یک سایت برای آموزشگاه زبان آلمانی با بخش اساتید، دوره‌ها، قیمت‌ها و فرم مشاوره...'
                  : 'مثلاً: یک بخش سوالات متداول با ۳ پرسش اضافه کن و رنگ تم را به سبز تغییر بده...'
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Feasibility Indicator */}
          {feasibility && (
            <div className={`p-3.5 rounded-xl text-xs space-y-1.5 ${feasibility.badgeClass}`}>
              <div className="flex items-center gap-1.5 font-bold">
                <span>{feasibility.statusIcon}</span>
                <span>امکان‌سنجی: {feasibility.statusLabel}</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">{feasibility.summary}</p>
              {feasibility.recommendation && (
                <p className="text-[11px] opacity-80 pt-1 border-t border-white/10">
                  {feasibility.recommendation}
                </p>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Generated Result Preview & Schema Accept/Reject */}
          {generatedManifest && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  مانیفست معتبر تولید شد ({generatedManifest.blocks.length} بلاک)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Schema v1 OK</span>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <p><strong>عنوان:</strong> {generatedManifest.meta.title}</p>
                <p><strong>بلاک‌ها:</strong> {generatedManifest.blocks.map(b => b.type).join(' · ')}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleAccept}
                  className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow"
                >
                  تایید و اعمال روی کارگاه (Accept)
                </button>
                <button
                  onClick={() => setGeneratedManifest(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  رد (Reject)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>هوش مصنوعی هرگز کد مستقیم نمی‌نویسد؛ فقط مانیفست داده.</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isProcessing || !prompt.trim() || feasibility?.status === 'out_of_scope'}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>در حال پردازش مانیفست...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{mode === 'create' ? 'تولید مانیفست' : 'اعمال تغییرات'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
