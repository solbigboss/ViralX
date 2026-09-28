import React, { useEffect } from 'react';
import {
  X,
  Globe,
  Sun,
  Moon,
  Monitor,
  Download,
  Music,
  Bookmark,
  HelpCircle,
  Check,
  Sparkles,
  Film,
  ShieldCheck,
} from 'lucide-react';
import { Language, ActiveTab, ThemeMode } from '../types';
import { translations } from '../data/translations';
import { LANGUAGES } from './Navbar';
import { ViralXLogo } from './ViralXLogo';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedCount: number;
  themeMode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  savedCount,
  themeMode,
  onSelectThemeMode,
  isDark,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelectTab = (tab: ActiveTab) => {
    onTabChange(tab);
    onClose();
  };

  const handleLanguageSelect = (code: Language) => {
    onLanguageChange(code);
    // Keep sidebar open so user sees confirmation or close smoothly
  };

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-[84vw] max-w-xs sm:w-80 bg-white dark:bg-[#15202b] text-[#0f1419] dark:text-white shadow-2xl flex flex-col border-[#cfd9de] dark:border-[#2f3336] transition-transform duration-300 ease-out md:hidden ${
          isRtl
            ? 'left-0 border-r ' + (isOpen ? 'translate-x-0' : '-translate-x-full')
            : 'right-0 border-l ' + (isOpen ? 'translate-x-0' : 'translate-x-full')
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Sidebar Header with Brand & Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#eff3f4] dark:border-[#2f3336] flex items-center justify-between bg-[#f7f9f9]/70 dark:bg-[#1e2732]/60">
          <div className="flex items-center gap-2.5">
            <ViralXLogo size="md" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#0f1419] dark:text-white">
                Viral<span className="text-[#1d9bf0]">X</span>
              </span>
              <span className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-medium">
                {t.tagline}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="touch-target p-2 rounded-xl text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white hover:bg-[#eff3f4] dark:hover:bg-[#1e2732] active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          {/* Section 1: Professional Theme Switcher Slider (سلايدر احترافي وسلس) */}
          <div>
            <div className="text-[11px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-[#ffad1f]" />
              <span>{currentLang === 'ar' ? 'نمط المظهر (Theme)' : 'Appearance & Theme'}</span>
            </div>

            {/* 3-Way Segmented Slider Control */}
            <div className="relative p-1 bg-[#eff3f4] dark:bg-[#1e2732] rounded-2xl flex items-center border border-[#cfd9de]/70 dark:border-[#2f3336] shadow-2xs">
              {/* Segment 1: Light */}
              <button
                type="button"
                onClick={() => onSelectThemeMode('light')}
                className={`relative z-10 flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  themeMode === 'light'
                    ? 'bg-white dark:bg-[#1d9bf0] text-[#0f1419] dark:text-white shadow-sm ring-1 ring-black/5'
                    : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
                }`}
              >
                <Sun className={`w-3.5 h-3.5 ${themeMode === 'light' ? 'text-[#ffad1f] dark:text-white' : ''}`} />
                <span>{t.lightMode}</span>
              </button>

              {/* Segment 2: Dark */}
              <button
                type="button"
                onClick={() => onSelectThemeMode('dark')}
                className={`relative z-10 flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  themeMode === 'dark'
                    ? 'bg-white dark:bg-[#1d9bf0] text-[#0f1419] dark:text-white shadow-sm ring-1 ring-black/5'
                    : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
                }`}
              >
                <Moon className={`w-3.5 h-3.5 ${themeMode === 'dark' ? 'text-[#1d9bf0] dark:text-white' : ''}`} />
                <span>{t.darkMode}</span>
              </button>

              {/* Segment 3: System / Auto */}
              <button
                type="button"
                onClick={() => onSelectThemeMode('system')}
                className={`relative z-10 flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  themeMode === 'system'
                    ? 'bg-white dark:bg-[#1d9bf0] text-[#0f1419] dark:text-white shadow-sm ring-1 ring-black/5'
                    : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
                }`}
              >
                <Monitor className={`w-3.5 h-3.5 ${themeMode === 'system' ? 'text-[#1d9bf0] dark:text-white' : ''}`} />
                <span>{t.systemMode.split(' ')[0]}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Main Navigation Rows (على شكل أسطر) */}
          <div>
            <div className="text-[11px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#1d9bf0]" />
              <span>{currentLang === 'ar' ? 'التنقل والأدوات' : 'Main Navigation'}</span>
            </div>

            <nav className="space-y-1">
              {/* Row 1: Home / All-In-One */}
              <button
                onClick={() => handleSelectTab('home')}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  activeTab === 'home'
                    ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] dark:text-[#71c9f8]'
                    : 'text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#eff3f4] dark:hover:bg-[#1e2732]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'home' ? 'bg-[#1d9bf0] text-white' : 'bg-[#eff3f4] dark:bg-[#1e2732] text-[#536471] dark:text-[#8b98a5]'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div>{currentLang === 'ar' ? 'الرئيسية (All-In-One)' : 'All-In-One Downloader'}</div>
                    <div className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-normal">
                      {currentLang === 'ar' ? 'تحميل فيديو لجميع الشبكات' : 'Universal Video Extractor'}
                    </div>
                  </div>
                </div>
                {activeTab === 'home' && <span className="w-2 h-2 rounded-full bg-[#1d9bf0]" />}
              </button>

              {/* Row 2: Twitter to MP3 */}
              <button
                onClick={() => handleSelectTab('mp3')}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  activeTab === 'mp3'
                    ? 'bg-[#ffad1f]/15 text-[#ffad1f]'
                    : 'text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#eff3f4] dark:hover:bg-[#1e2732]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'mp3' ? 'bg-[#ffad1f] text-white' : 'bg-[#eff3f4] dark:bg-[#1e2732] text-[#536471] dark:text-[#8b98a5]'}`}>
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <div>{t.navMp3}</div>
                    <div className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-normal">
                      {currentLang === 'ar' ? 'استخراج صوت MP3 بجودة 320k' : '320kbps Audio Extractor'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase bg-[#ffad1f]/20 text-[#ffad1f] px-2 py-0.5 rounded-full">
                  320k
                </span>
              </button>

              {/* Row 3: Saved Downloads */}
              <button
                onClick={() => handleSelectTab('history')}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  activeTab === 'history'
                    ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] dark:text-[#71c9f8]'
                    : 'text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#eff3f4] dark:hover:bg-[#1e2732]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'history' ? 'bg-[#1d9bf0] text-white' : 'bg-[#eff3f4] dark:bg-[#1e2732] text-[#536471] dark:text-[#8b98a5]'}`}>
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div>
                    <div>{t.navHistory}</div>
                    <div className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-normal">
                      {currentLang === 'ar' ? 'سجل التنزيلات المحلية' : 'Saved Media History'}
                    </div>
                  </div>
                </div>
                {savedCount > 0 && (
                  <span className="bg-[#1d9bf0] text-white text-[11px] px-2 py-0.5 rounded-full font-black">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Row 4: How To Use / Guides */}
              <button
                onClick={() => handleSelectTab('guides')}
                className={`w-full text-left rtl:text-right px-3.5 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  activeTab === 'guides'
                    ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] dark:text-[#71c9f8]'
                    : 'text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#eff3f4] dark:hover:bg-[#1e2732]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'guides' ? 'bg-[#1d9bf0] text-white' : 'bg-[#eff3f4] dark:bg-[#1e2732] text-[#536471] dark:text-[#8b98a5]'}`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div>{t.navHowToUse}</div>
                    <div className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-normal">
                      {currentLang === 'ar' ? 'دليل وشروحات التنزيل' : 'Tutorials & Tips'}
                    </div>
                  </div>
                </div>
              </button>
            </nav>
          </div>

          {/* Section 3: Other Supported Platforms (المنصات المدعومة كأداة تحميل سريعة) */}
          <div>
            <div className="text-[11px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#00ba7c]" />
              <span>{currentLang === 'ar' ? 'منصات التواصل الأخرى' : 'Other Platforms'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* TikTok */}
              <button
                onClick={() => handleSelectTab('tiktok')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                  activeTab === 'tiktok'
                    ? 'border-[#00F2FE] bg-[#00F2FE]/10 text-[#00F2FE]'
                    : 'border-[#cfd9de]/60 dark:border-[#2f3336] bg-[#f7f9f9] dark:bg-[#1e2732] text-[#0f1419] dark:text-[#cfd9de] hover:border-[#00F2FE]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] shrink-0" />
                <span>TikTok</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleSelectTab('instagram')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                  activeTab === 'instagram'
                    ? 'border-[#E1306C] bg-[#E1306C]/10 text-[#E1306C]'
                    : 'border-[#cfd9de]/60 dark:border-[#2f3336] bg-[#f7f9f9] dark:bg-[#1e2732] text-[#0f1419] dark:text-[#cfd9de] hover:border-[#E1306C]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E1306C] shrink-0" />
                <span>Instagram</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSelectTab('facebook')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                  activeTab === 'facebook'
                    ? 'border-[#1877F2] bg-[#1877F2]/10 text-[#1877F2]'
                    : 'border-[#cfd9de]/60 dark:border-[#2f3336] bg-[#f7f9f9] dark:bg-[#1e2732] text-[#0f1419] dark:text-[#cfd9de] hover:border-[#1877F2]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] shrink-0" />
                <span>Facebook</span>
              </button>

              {/* Threads */}
              <button
                onClick={() => handleSelectTab('threads')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                  activeTab === 'threads'
                    ? 'border-[#A855F7] bg-[#A855F7]/10 text-[#A855F7]'
                    : 'border-[#cfd9de]/60 dark:border-[#2f3336] bg-[#f7f9f9] dark:bg-[#1e2732] text-[#0f1419] dark:text-[#cfd9de] hover:border-[#A855F7]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shrink-0" />
                <span>Threads</span>
              </button>
            </div>
          </div>

          {/* Section 4: Language Selector as Clean Rows (على شكل أسطر) */}
          <div>
            <div className="text-[11px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#1d9bf0]" />
              <span>{t.languages}</span>
            </div>

            <div className="space-y-1 bg-[#eff3f4]/70 dark:bg-[#1e2732]/70 p-1.5 rounded-2xl border border-[#cfd9de]/60 dark:border-[#2f3336]">
              {LANGUAGES.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-white dark:bg-[#1d9bf0] text-[#0f1419] dark:text-white shadow-xs'
                        : 'text-[#0f1419] dark:text-[#cfd9de] hover:bg-white/60 dark:hover:bg-[#273340]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-normal uppercase">
                        ({lang.code})
                      </span>
                    </span>
                    {isActive && <Check className="w-4 h-4 text-[#1d9bf0] dark:text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#eff3f4] dark:border-[#2f3336] bg-[#f7f9f9]/70 dark:bg-[#1e2732]/60 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#00ba7c] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Free · SSL Secured</span>
          </div>
          <p className="text-[10px] text-[#536471] dark:text-[#8b98a5]">
            Fast CDN Tunneling · No Registration Required
          </p>
        </div>
      </aside>
    </>
  );
};
