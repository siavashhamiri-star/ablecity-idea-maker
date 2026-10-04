import React from 'react';
import { Flame } from 'lucide-react';

export const ForgeFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#070a10] border-t border-white/5 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <span className="font-mono font-extrabold text-white text-base tracking-wider">
              TAVANA PRODUCT FORGE
            </span>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Your Idea → Your Product → Our Forge
            </p>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center md:text-left text-xs text-slate-400 font-medium">
          معماری استاندارد مانیفست داده · نسخه MVP ۱.۰ · بدون قفل پلتفرم
        </div>

      </div>
    </footer>
  );
};
