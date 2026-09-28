import React from 'react';
import { Cpu, Shield, Sparkles, Radio } from 'lucide-react';
import { Language } from '../types';

interface TechnicalSpecsProps {
  currentLang: Language;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ currentLang }) => {
  const specs = [
    {
      title: 'Video Encoding',
      titleAr: 'ترميز الفيديو',
      value: 'H.264 / AVC (High Profile)',
      sub: 'Universal MP4 container, iOS & Android native playback',
      icon: Cpu,
    },
    {
      title: 'Audio Bitrate',
      titleAr: 'جودة الصوت ومعدل البت',
      value: '320 kbps MP3 / AAC',
      sub: '48 kHz Stereo master stream, no compression artifacts',
      icon: Radio,
    },
    {
      title: 'Watermark Policy',
      titleAr: 'العلامة المائية',
      value: '0% Watermark / Overlays',
      sub: 'Original pristine source bitstream directly from CDN',
      icon: Sparkles,
    },
    {
      title: 'Data & Privacy',
      titleAr: 'الخصوصية والأمان',
      value: 'Stateless Tunnel',
      sub: 'No files saved on servers; SSL encrypted in transit',
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl overflow-hidden shadow-xs transition-colors">
        <div className="p-4 sm:p-5 border-b border-[#eff3f4] dark:border-[#2f3336] bg-[#f7f9f9] dark:bg-[#1e2732] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#1d9bf0]" />
            <span className="font-extrabold text-xs sm:text-sm text-[#0f1419] dark:text-white tracking-tight">
              {currentLang === 'ar' ? 'المواصفات الفنية ومعايير الترميز' : 'Technical Specifications & Encoding Engine'}
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#00ba7c] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
            Verified Pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x dark:divide-[#2f3336] divide-[#eff3f4]">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#536471] dark:text-[#8b98a5] mb-1">
                    <Icon className="w-3.5 h-3.5 text-[#1d9bf0]" />
                    <span>{currentLang === 'ar' ? item.titleAr : item.title}</span>
                  </div>
                  <div className="text-base font-extrabold text-[#0f1419] dark:text-white font-mono tracking-tight mb-1">
                    {item.value}
                  </div>
                </div>
                <div className="text-xs text-[#536471] dark:text-[#8b98a5] leading-normal mt-2">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
