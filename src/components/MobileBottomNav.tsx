import React from 'react';
import { Download, Music, HelpCircle, Bookmark } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { translations } from '../data/translations';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  savedCount: number;
  currentLang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  currentLang,
}) => {
  const t = translations[currentLang];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-[#cfd9de] dark:border-[#2f3336] pb-safe transition-colors duration-200"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
        {/* Tab 1: Home / Downloader */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'home'
              ? 'text-[#1d9bf0] font-bold'
              : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
          }`}
          aria-label="Home"
        >
          <Download className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {currentLang === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
        </button>

        {/* Tab 2: Twitter to MP3 */}
        <button
          onClick={() => onTabChange('mp3')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'mp3'
              ? 'text-[#ffad1f] font-bold'
              : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
          }`}
          aria-label="Twitter MP3"
        >
          <Music className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navMp3}
          </span>
        </button>

        {/* Tab 3: Guides & How To */}
        <button
          onClick={() => onTabChange('guides')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeTab === 'guides'
              ? 'text-[#1d9bf0] font-bold'
              : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
          }`}
          aria-label="Guides"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navHowToUse}
          </span>
        </button>

        {/* Tab 4: History & Bookmarks */}
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center h-full relative transition-colors ${
            activeTab === 'history'
              ? 'text-[#1d9bf0] font-bold'
              : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
          }`}
          aria-label="Saved History"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#1d9bf0] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount > 9 ? '9+' : savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight truncate max-w-[70px]">
            {t.navHistory}
          </span>
        </button>
      </div>
    </nav>
  );
};
