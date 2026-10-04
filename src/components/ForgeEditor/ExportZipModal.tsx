import React, { useState } from 'react';
import { SiteManifest } from '../../types/manifest';
import { generateProjectZip, downloadBlob } from '../../core/exportZip';
import { Download, CheckCircle2, FileText, Code2, FolderArchive, X, Loader2, Sparkles } from 'lucide-react';

interface ExportZipModalProps {
  isOpen: boolean;
  onClose: () => void;
  manifest: SiteManifest;
}

export const ExportZipModal: React.FC<ExportZipModalProps> = ({
  isOpen,
  onClose,
  manifest,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      const blob = await generateProjectZip(manifest);
      const safeName = (manifest.meta.title || 'tavana-website')
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const filename = `${safeName || 'tavana-project'}.zip`;

      downloadBlob(blob, filename);
      setDownloadSuccess(true);
    } catch (e) {
      console.error('ZIP export failed', e);
      alert('خطا در تولید فایل فشرده زیپ.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm md:text-base">خروجی زیپ مستقل (Real ZIP Export)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            این یک خروجی کاملاً واقعی، استاندارد و بدون وابستگی است. پرونده‌های زیر در قالب یک فایل ZIP آماده دانلود می‌شوند:
          </p>

          <div className="space-y-2 rounded-xl bg-slate-950 p-3 border border-white/5 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>index.html</span>
              <span className="text-[10px] text-slate-500 mr-auto">سند HTML5 سمانتیک</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>style.css</span>
              <span className="text-[10px] text-slate-500 mr-auto">استایل‌های واکنش‌گرا و سبک</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>script.js</span>
              <span className="text-[10px] text-slate-500 mr-auto">رفتار تعاملی خالص Vanilla JS</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>manifest.json</span>
              <span className="text-[10px] text-slate-500 mr-auto">منبع حقیقت جهت ویرایش آتی</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>README.md</span>
              <span className="text-[10px] text-slate-500 mr-auto">راهنمای استقرار فوری</span>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>فایل زیپ با موفقیت در دستگاه شما ذخیره شد!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
          >
            بستن
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/30 transition-all active:scale-95"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>در حال ساخت ZIP...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>دانلود فایل ZIP پروژه</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
