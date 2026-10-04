import React, { useState } from 'react';
import { SiteManifest } from '../../types/manifest';
import { generateAndroidGradleProject } from '../../core/androidExport';
import { downloadBlob } from '../../core/exportZip';
import { Smartphone, Download, CheckCircle2, Code2, X, Loader2, KeyRound, Terminal } from 'lucide-react';

interface AndroidExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  manifest: SiteManifest;
}

export const AndroidExportModal: React.FC<AndroidExportModalProps> = ({
  isOpen,
  onClose,
  manifest,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadAndroidProject = async () => {
    setIsExporting(true);
    try {
      const blob = await generateAndroidGradleProject(manifest);
      downloadBlob(blob, `tavana-android-gradle-${manifest.projectId}.zip`);
      setSuccess(true);
    } catch (e) {
      console.error(e);
      alert('خطا در تولید پکیج اندروید.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">
                سورس پروژه اندروید استودیو (Android Project Source)
              </h3>
              <p className="text-[11px] text-slate-400">خروجی استاندارد Gradle جهت کامپایل در Android Studio یا CI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs leading-relaxed text-slate-300">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <span>⚠️ شفافیت فنی:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              این خروجی سورس پروژه Android/Gradle است و APK/AAB را مستقیماً داخل مرورگر کامپایل نمی‌کند. کامپایل به محیط Android SDK، ابزار Gradle یا پایپ‌لاین CI نیاز دارد.
            </p>
            <p className="text-[10px] text-slate-400 font-mono" dir="ltr">
              This exports the Android/Gradle project source. APK/AAB compilation requires a build environment (Android SDK / JDK) or CI.
            </p>
          </div>

          <div className="space-y-2 rounded-xl bg-slate-950 p-3.5 border border-white/5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-white/5 font-sans font-bold">
              <span>فایل‌های درون بسته سورس:</span>
              <span className="text-amber-400">Android SDK 35 · Kotlin 2.0</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>settings.gradle.kts & build.gradle.kts (پلاگین‌های صریح)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>app/build.gradle.kts (کانفیگ امضا با متغیر محیطی)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>build-release-apk-aab.sh (اسکریپت بیلد امن با متغیرهای محیطی)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <KeyRound className="w-3.5 h-3.5 text-rose-400" />
              <span>README-ANDROID.md (راهنمای گام‌به‌گام بیلد در استودیو)</span>
            </div>
          </div>

          {success && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>سورس کامل پروژه اندروید با موفقیت دانلود شد!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
          >
            بستن
          </button>

          <button
            onClick={handleDownloadAndroidProject}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>در حال ایجاد سورس پروژه...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>دانلود سورس پروژه اندروید (ZIP)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
