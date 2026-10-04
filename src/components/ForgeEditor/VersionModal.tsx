import React from 'react';
import { VersionSnapshot } from '../../core/versioning';
import { History, RotateCcw, X, Clock, Layers, Check } from 'lucide-react';
import { SiteManifest } from '../../types/manifest';

interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshots: VersionSnapshot[];
  currentProjectId: string;
  onRestore: (manifest: SiteManifest) => void;
  onSaveCurrentSnapshot: (label?: string) => void;
}

export const VersionModal: React.FC<VersionModalProps> = ({
  isOpen,
  onClose,
  snapshots,
  onRestore,
  onSaveCurrentSnapshot,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base">تاریخچه تغییرات و بازگردانی (Rollback)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="p-4 bg-slate-950/40 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-400">ذخیره خودکار تا ۱۰ نسخه آخر مانیفست در حافظه لوکال</span>
          <button
            onClick={() => onSaveCurrentSnapshot('نسخه ذخیره شده دستی')}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
          >
            + ثبت نسخه فعلی
          </button>
        </div>

        {/* Snapshot list */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {snapshots.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              هنوز نسخه‌ای ذخیره نشده است. با اولین تغییرات، نسخه‌ها به صورت خودکار ثبت خواهند شد.
            </div>
          ) : (
            snapshots.map((s, idx) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{s.label}</span>
                    {idx === 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        آخرین
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {s.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-slate-500" />
                      {s.blockCount} بلاک
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onRestore(s.manifest);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>بازگردانی</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );
};
