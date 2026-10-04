import React from 'react';
import { TestSuiteResult } from '../../core/tester';
import { CheckCircle2, AlertTriangle, XCircle, X, ShieldCheck } from 'lucide-react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TestSuiteResult;
}

export const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base">گزارش آزمون‌های خودکار کیفیت</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Summary */}
        <div className="p-5 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs text-slate-400 font-medium">امتیاز سلامت وب‌سایت:</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-3xl font-black font-mono ${result.score >= 80 ? 'text-emerald-400' : result.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                {result.score}%
              </span>
              <span className="text-xs text-slate-500 font-medium">از ۱۰۰</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{result.passedCount} تایید</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>{result.warnCount} هشدار</span>
            </div>
            {result.failCount > 0 && (
              <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-1.5 font-bold">
                <XCircle className="w-4 h-4" />
                <span>{result.failCount} خطا</span>
              </div>
            )}
          </div>
        </div>

        {/* Test Items List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {result.tests.map((t) => (
            <div
              key={t.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                t.status === 'pass'
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200'
                  : t.status === 'warn'
                  ? 'bg-amber-950/20 border-amber-500/20 text-slate-200'
                  : 'bg-rose-950/20 border-rose-500/20 text-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {t.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {t.status === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {t.status === 'fail' && <XCircle className="w-4 h-4 text-rose-400" />}
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">{t.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{t.category}</span>
                </div>
                <p className="text-slate-400 mb-1">{t.description}</p>
                {t.detail && (
                  <p className="text-[11px] text-slate-300 font-medium bg-black/30 p-2 rounded border border-white/5">
                    {t.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
          >
            بستن گزارش
          </button>
        </div>

      </div>
    </div>
  );
};
