import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Download,
  Bookmark,
  Sparkles,
  Check,
  ChevronDown,
  Moon,
  Sun,
  Monitor,
  Menu,
} from 'lucide-react';
import { Language, ActiveTab, ThemeMode } from '../types';
import { translations } from '../data/translations';
import { MobileSidebar } from './MobileSidebar';
import { ViralXLogo } from './ViralXLogo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedCount: number;
  themeMode: ThemeMode;
  isDark: boolean;
  onSelectThemeMode: (mode: ThemeMode) => void;
}

export const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', native: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', native: 'العربية', flag: '🇸🇦' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  savedCount,
  themeMode,
  isDark,
  onSelectThemeMode,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#000000]/95 text-[#0f1419] dark:text-white border-b border-[#cfd9de] dark:border-[#2f3336] shadow-xs backdrop-blur-md transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand logo - clicking it goes to Home */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 text-left rtl:text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d9bf0] rounded-xl p-1 group"
            aria-label="ViralX Home"
          >
            <ViralXLogo size="md" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-[#0f1419] dark:text-white">
                Viral<span className="text-[#1d9bf0]">X</span>
              </span>
              <span className="text-[10px] text-[#536471] dark:text-[#8b98a5] font-medium tracking-wide">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#536471] dark:text-[#cfd9de]">
            <button
              onClick={() => onTabChange('mp3')}
              className={`transition-colors hover:text-[#0f1419] dark:hover:text-white py-1 flex items-center gap-1.5 ${
                activeTab === 'mp3' ? 'text-[#1d9bf0] dark:text-[#1d9bf0] border-b-2 border-[#1d9bf0]' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffad1f]" />
              <span>{t.navMp3}</span>
            </button>
            <button
              onClick={() => onTabChange('guides')}
              className={`transition-colors hover:text-[#0f1419] dark:hover:text-white py-1 ${
                activeTab === 'guides' ? 'text-[#1d9bf0] dark:text-[#1d9bf0] border-b-2 border-[#1d9bf0]' : ''
              }`}
            >
              {t.navHowToUse}
            </button>
            <button
              onClick={() => onTabChange('history')}
              className={`transition-colors hover:text-[#0f1419] dark:hover:text-white py-1 flex items-center gap-1.5 ${
                activeTab === 'history' ? 'text-[#1d9bf0] dark:text-[#1d9bf0] border-b-2 border-[#1d9bf0]' : ''
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{t.navHistory}</span>
              {savedCount > 0 && (
                <span className="bg-[#1d9bf0] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Desktop Actions (Dropdowns) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {/* Desktop Theme Selector Menu */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                className="touch-target px-2.5 py-1.5 rounded-xl bg-[#f0f2f5] dark:bg-[#1e2732] hover:bg-[#e4e6eb] dark:hover:bg-[#273340] border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-[#cfd9de] flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[#1d9bf0]"
                aria-label="Theme Mode Selection"
                aria-expanded={themeMenuOpen}
                title={`Current Theme: ${themeMode === 'system' ? t.systemMode : themeMode === 'dark' ? t.darkMode : t.lightMode}`}
              >
                {themeMode === 'system' ? (
                  <Monitor className="w-4 h-4 text-[#1d9bf0]" />
                ) : isDark ? (
                  <Moon className="w-4 h-4 text-[#1d9bf0]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#ffad1f]" />
                )}
                <span className="text-[11px] font-bold capitalize">
                  {themeMode === 'system' ? 'Auto' : themeMode}
                </span>
                <ChevronDown className={`w-3 h-3 text-[#8b98a5] transition-transform ${themeMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider border-b border-[#eff3f4] dark:border-[#2f3336]">
                    {currentLang === 'ar' ? 'نمط العرض' : 'Appearance'}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectThemeMode('system');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      themeMode === 'system'
                        ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] font-bold'
                        : 'text-[#0f1419] dark:text-[#e1e8ed] hover:bg-[#f7f9f9] dark:hover:bg-[#273340]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[#1d9bf0]" />
                      <span>{t.systemMode}</span>
                    </span>
                    {themeMode === 'system' && <Check className="w-3.5 h-3.5 text-[#1d9bf0]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectThemeMode('light');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      themeMode === 'light'
                        ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] font-bold'
                        : 'text-[#0f1419] dark:text-[#e1e8ed] hover:bg-[#f7f9f9] dark:hover:bg-[#273340]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#ffad1f]" />
                      <span>{t.lightMode}</span>
                    </span>
                    {themeMode === 'light' && <Check className="w-3.5 h-3.5 text-[#1d9bf0]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectThemeMode('dark');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      themeMode === 'dark'
                        ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] font-bold'
                        : 'text-[#0f1419] dark:text-[#e1e8ed] hover:bg-[#f7f9f9] dark:hover:bg-[#273340]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#1d9bf0]" />
                      <span>{t.darkMode}</span>
                    </span>
                    {themeMode === 'dark' && <Check className="w-3.5 h-3.5 text-[#1d9bf0]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Language Selector Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="touch-target px-3 py-1.5 rounded-xl bg-[#f0f2f5] dark:bg-[#1e2732] hover:bg-[#e4e6eb] dark:hover:bg-[#273340] border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-white text-xs font-bold flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#1d9bf0]"
                aria-label="Select Language"
                aria-expanded={langMenuOpen}
              >
                <span className="text-base leading-none" role="img" aria-label={currentLangObj.label}>
                  {currentLangObj.flag}
                </span>
                <span className="uppercase tracking-wider">{currentLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#8b98a5] transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#536471] dark:text-[#8b98a5] uppercase tracking-wider border-b border-[#eff3f4] dark:border-[#2f3336] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#1d9bf0]" />
                    <span>{t.languages}</span>
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isActive = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left rtl:text-right px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-[#1d9bf0]/15 text-[#1d9bf0] font-bold'
                            : 'text-[#0f1419] dark:text-[#e1e8ed] hover:bg-[#f7f9f9] dark:hover:bg-[#273340]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.native}</span>
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#1d9bf0]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => onTabChange('mp3')}
              className="inline-flex items-center gap-1.5 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>MP3 (320k)</span>
            </button>
          </div>

          {/* Mobile View: Hamburger Menu Button Opposite to Logo */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="touch-target p-2.5 rounded-xl bg-[#f0f2f5] dark:bg-[#1e2732] hover:bg-[#e4e6eb] dark:hover:bg-[#273340] border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs relative"
              aria-label="Open Navigation Sidebar"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 w-4 h-4 bg-[#1d9bf0] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-black">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Slide-out Mobile Navigation Drawer */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        activeTab={activeTab}
        onTabChange={onTabChange}
        savedCount={savedCount}
        themeMode={themeMode}
        onSelectThemeMode={onSelectThemeMode}
        isDark={isDark}
      />
    </>
  );
};
