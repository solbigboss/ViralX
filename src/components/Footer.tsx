import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../data/translations';
import { ViralXLogo } from './ViralXLogo';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

interface LanguagePill {
  code: Language;
  label: string;
  prefix: string;
  flag: string;
}

const LANGUAGE_PILLS: LanguagePill[] = [
  { code: 'en', label: 'English', prefix: 'us', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', prefix: 'fr', flag: '🇫🇷' },
  { code: 'es', label: 'Español', prefix: 'es', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', prefix: 'sa', flag: '🇸🇦' },
];

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onSelectTab,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-white dark:bg-black text-[#0f1419] dark:text-white pt-12 pb-24 md:pb-12 border-t border-[#cfd9de] dark:border-[#2f3336] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Brand & Disclaimer */}
          <div className="md:col-span-5">
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 mb-3 group text-left rtl:text-right"
            >
              <ViralXLogo size="md" />
              <span className="text-xl font-black tracking-tight text-[#0f1419] dark:text-white">
                Viral<span className="text-[#1d9bf0]">X</span>
              </span>
            </button>

            <p className="text-xs text-[#536471] dark:text-[#8b98a5] leading-relaxed max-w-sm mb-4">
              {t.footerDisclaimer}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#00ba7c]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>SSL Encrypted • High Speed CDN</span>
            </div>
          </div>

          {/* Middle Column: Other Downloader Tools (Exact styling with colored dots matching image) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-[#0f1419] dark:text-white uppercase tracking-wider mb-3.5">
              OTHER DOWNLOADER TOOLS
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#1d9bf0] dark:hover:text-[#1d9bf0] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1d9bf0] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">Twitter / X Video Downloader</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectTab('mp3')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#1d9bf0] dark:hover:text-[#1d9bf0] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">Twitter to MP3 Converter</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectTab('instagram')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E1306C] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">Instagram Downloader</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectTab('tiktok')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#00F2FE] dark:hover:text-[#00F2FE] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00F2FE] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">TikTok Video Downloader</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectTab('facebook')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1877F2] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">Facebook Downloader</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectTab('threads')}
                  className="flex items-center gap-2.5 text-[#536471] dark:text-[#cfd9de] hover:text-[#A855F7] dark:hover:text-[#A855F7] transition-colors group text-left rtl:text-right"
                >
                  <span className="w-2 h-2 rounded-full bg-[#A855F7] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:underline">Threads Downloader</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Regional Sites (Languages) with Flag & Pill Badges */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-[#0f1419] dark:text-white uppercase tracking-wider mb-3.5">
              REGIONAL SITES (LANGUAGES)
            </h4>

            <div className="flex flex-wrap gap-2 mb-4">
              {LANGUAGE_PILLS.map((l) => {
                const isActive = currentLang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                      isActive
                        ? 'bg-[#1d9bf0] text-white shadow-sm'
                        : 'bg-[#f0f2f5] dark:bg-[#1e2732] hover:bg-[#e4e6eb] dark:hover:bg-[#273340] text-[#0f1419] dark:text-[#cfd9de] border border-[#cfd9de] dark:border-[#2f3336]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span className="text-[10px] font-mono uppercase opacity-75">{l.prefix}</span>
                    <span>{l.label}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <button
                onClick={() => onSelectTab('guides')}
                className="text-xs text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white hover:underline transition-colors font-medium"
              >
                Blog & Tutorials
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#eff3f4] dark:border-[#2f3336] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#536471] dark:text-[#8b98a5]">
          <div>
            © {new Date().getFullYear()} ViralX. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-[#0f1419] dark:hover:text-white transition-colors">{t.terms}</a>
            <span>·</span>
            <a href="#privacy" className="hover:text-[#0f1419] dark:hover:text-white transition-colors">{t.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
