import React from 'react';
import { Share2, Clipboard, Download, ArrowRight, ShieldCheck, Zap, Smartphone, Laptop } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HowItWorksStepsProps {
  currentLang: Language;
}

export const HowItWorksSteps: React.FC<HowItWorksStepsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-12 sm:py-16 px-4 bg-white dark:bg-[#15202b] border-y border-[#cfd9de] dark:border-[#2f3336] transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f1419] dark:text-white tracking-tight mb-3">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#536471] dark:text-[#8b98a5] leading-relaxed">
            {t.howItWorksSubtitle}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Step 1 */}
          <div className="bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 relative flex flex-col justify-between shadow-xs hover:border-[#1d9bf0]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 text-[#1d9bf0] text-xs font-bold px-3 py-1 rounded-full">
                  Step 01
                </span>
                <span className="text-3xl font-black text-[#cfd9de] dark:text-[#38444d] tabular-nums">
                  01
                </span>
              </div>

              {/* Visual Mockup */}
              <div className="bg-white dark:bg-[#15202b] rounded-2xl p-4 border border-[#eff3f4] dark:border-[#2f3336] shadow-xs mb-5">
                <div className="flex items-center justify-between text-[11px] text-[#536471] dark:text-[#8b98a5] mb-2 pb-1 border-b border-[#eff3f4] dark:border-[#2f3336]">
                  <span>x.com/tweet</span>
                  <span className="text-[#1d9bf0] font-semibold">Share Menu</span>
                </div>
                <div className="bg-[#f7f9f9] dark:bg-[#1e2732] p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-[#0f1419] dark:text-white">
                  <Share2 className="w-4 h-4 text-[#1d9bf0]" />
                  <span>Copy link to Tweet</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0f1419] dark:text-white mb-2">
                {t.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5] leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#eff3f4] dark:border-[#2f3336] flex items-center justify-between text-xs text-[#536471] dark:text-[#8b98a5] font-semibold">
              <span>Public Tweet or Space</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 relative flex flex-col justify-between shadow-xs hover:border-[#1d9bf0]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 text-[#1d9bf0] text-xs font-bold px-3 py-1 rounded-full">
                  Step 02
                </span>
                <span className="text-3xl font-black text-[#cfd9de] dark:text-[#38444d] tabular-nums">
                  02
                </span>
              </div>

              {/* Visual Mockup */}
              <div className="bg-white dark:bg-[#15202b] rounded-2xl p-4 border border-[#eff3f4] dark:border-[#2f3336] shadow-xs mb-5">
                <div className="flex items-center gap-1.5 bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-xl px-2.5 py-2 text-[11px] text-[#536471] dark:text-[#8b98a5] truncate mb-2">
                  <Clipboard className="w-3.5 h-3.5 text-[#1d9bf0] shrink-0" />
                  <span className="truncate">https://x.com/user/status/...</span>
                </div>
                <div className="bg-[#0f1419] dark:bg-[#1d9bf0] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg text-center flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-white" />
                  <span>Instant Parse</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0f1419] dark:text-white mb-2">
                {t.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5] leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#eff3f4] dark:border-[#2f3336] flex items-center justify-between text-xs text-[#536471] dark:text-[#8b98a5] font-semibold">
              <span>Automatic Stream Fetch</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 relative flex flex-col justify-between shadow-xs hover:border-[#1d9bf0]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 text-[#1d9bf0] text-xs font-bold px-3 py-1 rounded-full">
                  Step 03
                </span>
                <span className="text-3xl font-black text-[#cfd9de] dark:text-[#38444d] tabular-nums">
                  03
                </span>
              </div>

              {/* Visual Mockup */}
              <div className="bg-white dark:bg-[#15202b] rounded-2xl p-4 border border-[#eff3f4] dark:border-[#2f3336] shadow-xs mb-5 flex flex-col gap-1.5">
                <div className="bg-[#0f1419] dark:bg-[#1d9bf0] text-white p-2 rounded-xl text-[11px] font-bold flex items-center justify-between">
                  <span>1080p Full HD</span>
                  <Download className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[#ffad1f]/15 dark:bg-[#ffad1f]/20 text-[#0f1419] dark:text-white border border-[#ffad1f]/40 p-2 rounded-xl text-[11px] font-bold flex items-center justify-between">
                  <span>Audio MP3 (320k)</span>
                  <Download className="w-3.5 h-3.5 text-[#ffad1f]" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0f1419] dark:text-white mb-2">
                {t.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5] leading-relaxed">
                {t.step3Desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#eff3f4] dark:border-[#2f3336] flex items-center justify-between text-xs text-[#536471] dark:text-[#8b98a5] font-semibold">
              <span>Camera Roll / Files</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </div>
          </div>
        </div>

        {/* Global Compatibility Trust Bar */}
        <div className="bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-[#536471] dark:text-[#8b98a5]">
            <div className="flex items-center gap-1.5 text-[#1d9bf0]">
              <Smartphone className="w-4 h-4" />
              <Laptop className="w-4 h-4" />
            </div>
            <span className="font-medium text-[#0f1419] dark:text-[#cfd9de]">
              {t.supportedDevices}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#00ba7c] font-bold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.freeNoLimits}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
