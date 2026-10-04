import React from 'react';
import { TEMPLATES, TemplateDefinition } from '../../templates';
import { LayoutTemplate, X, Check, ArrowLeft } from 'lucide-react';
import { SiteManifest } from '../../types/manifest';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (manifest: SiteManifest) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base">قالب‌های استاندارد کوره توانا</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates list */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-4 rounded-xl bg-slate-950 border border-white/5 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-white/5">{tmpl.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white text-sm">{tmpl.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md">{tmpl.description}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectTemplate(tmpl.manifest);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all shrink-0"
              >
                <span>بارگذاری در کوره</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
          >
            انصراف
          </button>
        </div>

      </div>
    </div>
  );
};
