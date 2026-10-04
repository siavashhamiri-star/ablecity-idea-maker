import React, { useState, useRef, useEffect } from 'react';
import { SiteManifest } from '../../types/manifest';
import { Video, Download, Play, RefreshCw, X, Sparkles, CheckCircle2, Copy, Film, Smartphone, Share2, Loader2 } from 'lucide-react';

interface PromoVideoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  manifest: SiteManifest;
}

type AspectRatio = '9:16' | '16:9' | '1:1';

export const PromoVideoStudioModal: React.FC<PromoVideoStudioModalProps> = ({
  isOpen,
  onClose,
  manifest,
}) => {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  if (!isOpen) return null;

  const DURATION_SECONDS = 14;

  const getCanvasDimensions = (ratio: AspectRatio) => {
    switch (ratio) {
      case '9:16':
        return { width: 720, height: 1280 };
      case '16:9':
        return { width: 1280, height: 720 };
      case '1:1':
        return { width: 720, height: 720 };
    }
  };

  const startVideoGeneration = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRecording(true);
    setProgress(0);
    setRecordedVideoUrl(null);
    setRecordedBlob(null);
    chunksRef.current = [];

    const { width, height } = getCanvasDimensions(aspectRatio);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine supported MediaRecorder mime type
    let mimeType = 'video/webm';
    if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
      mimeType = 'video/mp4;codecs=avc1';
    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
      mimeType = 'video/mp4';
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      mimeType = 'video/webm;codecs=vp9';
    }

    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 2500000,
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setRecordedBlob(blob);
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setIsRecording(false);
      setProgress(100);
    };

    mediaRecorder.start();

    const startTime = performance.now();
    const durationMs = DURATION_SECONDS * 1000;

    // Particle system for glowing embers
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const renderFrame = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / durationMs, 1);
      setProgress(Math.round(progressRatio * 100));

      const sec = elapsed / 1000;

      // 1. Draw Obsidian Dark Forge Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0e1626');
      bgGrad.addColorStop(1, '#05080f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Forge Glowing Embers
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * (0.4 + 0.3 * Math.sin(sec * 3))})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Top Branding Tag
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(width / 2 - 140, 40, 280, 44, 22);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 18px "Vazirmatn", Tahoma, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡ کوره ساخت محصول توانا', width / 2, 62);

      // ==============================================================
      // SCENE 1: HOOK (0s - 3.5s)
      // ==============================================================
      if (sec < 3.5) {
        const enterScale = Math.min(sec * 1.5, 1);
        ctx.save();
        ctx.translate(width / 2, height * 0.4);
        ctx.scale(enterScale, enterScale);

        // Glowing circle accent
        const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
        glow.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(-200, -200, 400, 400);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Vazirmatn", Tahoma, sans-serif';
        ctx.fillText('ساخت سایت اختصاصی', 0, -40);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 44px "Vazirmatn", Tahoma, sans-serif';
        ctx.fillText('در ۲ دقیقه فقط با گوشی!', 0, 25);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '22px "Vazirmatn", Tahoma, sans-serif';
        ctx.fillText('بدون نیاز به لپ‌تاپ و کدنویسی', 0, 85);
        ctx.restore();
      }

      // ==============================================================
      // SCENE 2: LIVE PHONE MOCKUP & SCROLL (3.5s - 8.5s)
      // ==============================================================
      else if (sec >= 3.5 && sec < 8.5) {
        const sceneSec = sec - 3.5;
        const phoneW = aspectRatio === '16:9' ? 260 : 340;
        const phoneH = aspectRatio === '16:9' ? 480 : 600;
        const phoneX = width / 2 - phoneW / 2;
        const phoneY = height / 2 - phoneH / 2 + 30;

        // Headline
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "Vazirmatn", Tahoma, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(manifest.meta.title.slice(0, 32), width / 2, phoneY - 45);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '18px "Vazirmatn", Tahoma, sans-serif';
        ctx.fillText('پیش‌نمایش تعاملی و فوق‌العاده واکنش‌گرا', width / 2, phoneY - 15);

        // Phone Outer Frame
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(phoneX, phoneY, phoneW, phoneH, 36);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Phone Screen Area (Clipped)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(phoneX + 10, phoneY + 12, phoneW - 20, phoneH - 24, 28);
        ctx.clip();

        // Screen Background
        ctx.fillStyle = '#090d16';
        ctx.fillRect(phoneX, phoneY, phoneW, phoneH);

        // Scroll offset
        const scrollY = (sceneSec / 5) * 220;

        // Mock Web Header
        ctx.fillStyle = '#162035';
        ctx.fillRect(phoneX + 10, phoneY + 12 - scrollY, phoneW - 20, 50);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px "Vazirmatn", Tahoma';
        ctx.fillText('TAVANA FORGE', phoneX + phoneW / 2, phoneY + 40 - scrollY);

        // Mock Hero Card
        ctx.fillStyle = '#1e2b46';
        ctx.beginPath();
        ctx.roundRect(phoneX + 25, phoneY + 80 - scrollY, phoneW - 50, 180, 16);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "Vazirmatn", Tahoma';
        ctx.fillText(manifest.meta.title.slice(0, 24), phoneX + phoneW / 2, phoneY + 130 - scrollY);

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.roundRect(phoneX + phoneW / 2 - 60, phoneY + 180 - scrollY, 120, 36, 18);
        ctx.fill();
        ctx.fillStyle = '#090d16';
        ctx.font = 'bold 14px "Vazirmatn", Tahoma';
        ctx.fillText('مشاهده و ثبت‌نام', phoneX + phoneW / 2, phoneY + 203 - scrollY);

        // Mock Service Cards
        for (let i = 0; i < 3; i++) {
          const cardY = phoneY + 280 + i * 110 - scrollY;
          ctx.fillStyle = '#141d30';
          ctx.beginPath();
          ctx.roundRect(phoneX + 25, cardY, phoneW - 50, 90, 14);
          ctx.fill();
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 14px "Vazirmatn", Tahoma';
          ctx.fillText(`ویژگی طلایی ۰${i + 1}`, phoneX + phoneW / 2, cardY + 35);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px "Vazirmatn", Tahoma';
          ctx.fillText('سریع، مدرن و کامپایل‌شده', phoneX + phoneW / 2, cardY + 60);
        }

        ctx.restore();

        // Phone speaker notch
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.roundRect(phoneX + phoneW / 2 - 35, phoneY + 18, 70, 14, 7);
        ctx.fill();
      }

      // ==============================================================
      // SCENE 3: SPEED & QUALITY BADGES (8.5s - 12s)
      // ==============================================================
      else if (sec >= 8.5 && sec < 12) {
        ctx.save();
        ctx.translate(width / 2, height / 2 - 40);

        // Glowing Shield
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.beginPath();
        ctx.arc(0, -60, 70, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 55px "Vazirmatn", Tahoma';
        ctx.textAlign = 'center';
        ctx.fillText('۱۰۰٪', 0, -50);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "Vazirmatn", Tahoma';
        ctx.fillText('سرعت لودینگ برق‌آسا', 0, 30);

        // Checklist Items
        const items = [
          '⚡ لود زیر ۰.۵ ثانیه بدون وابستگی سرور',
          '📱 سورس کامل اندروید استودیو با Gradle',
          '🔒 مستقل و آماده تحویل به مشتری',
        ];

        items.forEach((txt, idx) => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.roundRect(-220, 70 + idx * 55, 440, 44, 12);
          ctx.fill();
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#e2e8f0';
          ctx.font = '16px "Vazirmatn", Tahoma';
          ctx.fillText(txt, 0, 97 + idx * 55);
        });

        ctx.restore();
      }

      // ==============================================================
      // SCENE 4: MONETIZATION & CALL TO ACTION (12s - 14s)
      // ==============================================================
      else {
        ctx.save();
        ctx.translate(width / 2, height / 2 - 20);

        // Gold Value Badge
        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.beginPath();
        ctx.roundRect(-180, -110, 360, 60, 30);
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 24px "Vazirmatn", Tahoma';
        ctx.textAlign = 'center';
        ctx.fillText('💰 ارزش پروژه: ۳ الی ۶ میلیون تومان', 0, -72);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px "Vazirmatn", Tahoma';
        ctx.fillText('برای طراحی سایت پیام بده!', 0, 0);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 20px "Vazirmatn", Tahoma';
        ctx.fillText('یا لینک بایو را لمس کنید 👆', 0, 50);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px "Vazirmatn", Tahoma';
        ctx.fillText('تولیدشده با کوره ساخت محصول توانا', 0, 110);

        ctx.restore();
      }

      // 4. Bottom Progress Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, height - 8, width, 8);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, height - 8, width * progressRatio, 8);

      if (elapsed < durationMs) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      } else {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(renderFrame);
  };

  const handleDownloadVideo = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tavana-promo-${manifest.projectId}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCaption = () => {
    const caption = `🚀 ساخت سایت اختصاصی در کمتر از ۲ دقیقه فقط با گوشی موبایل!

بدون نیاز به لپ‌تاپ یا پرداخت میلیون‌ها تومان هزینه طراحی، برای کسب‌وکار خود سایت و اپلیکیشن اختصاصی داشته باشید.
✨ سرعت فوق‌العاده
📱 سازگاری کامل با تمام گوشی‌ها
🔒 بدون وابستگی و ۱۰۰٪ مستقل

برای سفارش طراحی سایت یا دریافت کوره توانا، کلمه «سایت» را کامنت یا دایرکت کنید! 📥

#طراحی_سایت #کسب_درآمد #فریلنسری #کسب_و_کار #کوره_توانا #سایت_ساز #موبایل`;

    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                استودیوی تولید ریلز و ویدیوی تبلیغاتی (Reel Video Studio)
              </h3>
              <p className="text-[11px] text-slate-400">تولید خودکار ویدیوی موشن‌گرافیک با کیفیت بالا جهت آپلود در اینستاگرام و شبکه‌های اجتماعی</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Aspect Ratio Selector */}
          <div className="flex items-center justify-between gap-3 bg-slate-950 p-2.5 rounded-xl border border-white/5">
            <span className="text-slate-300 font-semibold">ابعاد ویدیو:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setAspectRatio('9:16')}
                disabled={isRecording}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>9:16 (ریلز / استوری)</span>
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                disabled={isRecording}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>16:9 (یوتیوب)</span>
              </button>
              <button
                onClick={() => setAspectRatio('1:1')}
                disabled={isRecording}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  aspectRatio === '1:1'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>1:1 (پست)</span>
              </button>
            </div>
          </div>

          {/* Canvas Render Preview Box */}
          <div className="flex flex-col items-center justify-center bg-black/60 rounded-2xl p-4 border border-white/5 min-h-[300px]">
            {recordedVideoUrl ? (
              <div className="w-full max-w-[280px] rounded-xl overflow-hidden shadow-2xl border border-amber-500/30">
                <video
                  src={recordedVideoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-auto max-h-[380px] object-contain rounded-xl bg-black"
                />
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <canvas
                  ref={canvasRef}
                  className="max-h-[340px] w-auto rounded-xl shadow-xl border border-white/10"
                />
                {!isRecording && progress === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 rounded-xl p-4 text-center">
                    <Sparkles className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                    <span className="font-bold text-white text-sm mb-1">آماده رندر ویدیوی ریلز اختصاصی</span>
                    <span className="text-[11px] text-slate-400 max-w-xs mb-3">
                      یک ویدیوی موشن‌گرافیک ۱۴ ثانیه‌ای با پیش‌نمایش چرخان سایت شما و متون جذب مشتری تولید می‌شود.
                    </span>
                    <button
                      onClick={startVideoGeneration}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>شروع ضبط و رندر ویدیو (۱۴ ثانیه)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {isRecording && (
              <div className="w-full max-w-xs mt-3 space-y-1.5 text-center">
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                  <span>در حال ضبط فریم‌های ویدیو...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Social Caption Helper */}
          {recordedVideoUrl && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>کپشن آماده و پربازدید اینستاگرام:</span>
                </span>
                <button
                  onClick={handleCopyCaption}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  {copiedCaption ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>کپی کپشن</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                «ساخت سایت اختصاصی در کمتر از ۲ دقیقه فقط با گوشی موبایل! برای ثبت سفارش یا دریافت دوره کلمه سایت را کامنت کنید...»
              </p>
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

          <div className="flex items-center gap-2">
            {recordedVideoUrl ? (
              <>
                <button
                  onClick={startVideoGeneration}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>رندر مجدد</span>
                </button>
                <button
                  onClick={handleDownloadVideo}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود فایل ویدیو (Video)</span>
                </button>
              </>
            ) : (
              <button
                onClick={startVideoGeneration}
                disabled={isRecording}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                {isRecording ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال ضبط ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>تولید ویدیوی ریلز</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
