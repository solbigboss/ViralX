import React, { useState, useEffect } from 'react';
import {
  Clipboard,
  Download,
  X,
  Sparkles,
  AlertCircle,
  Film,
  Radio,
  Mic,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { Language, ActiveTab, XDownloadCategory } from '../types';
import { translations } from '../data/translations';
import { SAMPLE_TWEETS } from '../data/sampleTweets';

interface HeroInputProps {
  currentLang: Language;
  activeTab: ActiveTab;
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  onPlatformDetected?: (platform: 'tiktok' | 'instagram' | 'facebook' | 'threads', url: string) => void;
}

export const HeroInput: React.FC<HeroInputProps> = ({
  currentLang,
  activeTab,
  onAnalyze,
  isLoading,
  onPlatformDetected,
}) => {
  const [url, setUrl] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'x' | 'tiktok' | 'instagram' | 'facebook' | 'threads'>('all');
  const [xCategory, setXCategory] = useState<XDownloadCategory>('video');
  const t = translations[currentLang];

  useEffect(() => {
    if (errorNotice) {
      const timer = setTimeout(() => setErrorNotice(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorNotice]);

  useEffect(() => {
    if (redirectNotice) {
      const timer = setTimeout(() => setRedirectNotice(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [redirectNotice]);

  // Synchronize category if user is in mp3 tab
  useEffect(() => {
    if (activeTab === 'mp3') {
      setSelectedPlatform('x');
      setXCategory('spaces');
    }
  }, [activeTab]);

  // Check URL platform and trigger seamless in-app redirection in same tab
  const checkAndRouteUrl = (rawUrl: string): boolean => {
    const lower = rawUrl.toLowerCase().trim();

    if (lower.includes('tiktok.com') || lower.includes('douyin.com')) {
      setRedirectNotice('⚡ TikTok detected! Switching to TikTok Downloader...');
      setTimeout(() => {
        onPlatformDetected?.('tiktok', rawUrl.trim());
      }, 350);
      return true;
    }

    if (lower.includes('instagram.com') || lower.includes('instagr.am')) {
      setRedirectNotice('⚡ Instagram detected! Switching to Instagram Downloader...');
      setTimeout(() => {
        onPlatformDetected?.('instagram', rawUrl.trim());
      }, 350);
      return true;
    }

    if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) {
      setRedirectNotice('⚡ Facebook detected! Switching to Facebook Downloader...');
      setTimeout(() => {
        onPlatformDetected?.('facebook', rawUrl.trim());
      }, 350);
      return true;
    }

    if (lower.includes('threads.net')) {
      setRedirectNotice('⚡ Threads detected! Switching to Threads Downloader...');
      setTimeout(() => {
        onPlatformDetected?.('threads', rawUrl.trim());
      }, 350);
      return true;
    }

    // If Twitter/X: auto-switch category
    if (lower.includes('spaces')) {
      setSelectedPlatform('x');
      setXCategory('spaces');
    } else if (lower.includes('broadcast') || lower.includes('stream')) {
      setSelectedPlatform('x');
      setXCategory('stream');
    } else if (lower.includes('twitter.com') || lower.includes('x.com')) {
      setSelectedPlatform('x');
    }

    return false;
  };

  const handlePaste = async () => {
    setErrorNotice(null);
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          const clean = text.trim();
          setUrl(clean);
          setPasteSuccess(true);
          setTimeout(() => setPasteSuccess(false), 2000);
          if (navigator.vibrate) navigator.vibrate(20);

          const redirected = checkAndRouteUrl(clean);
          if (redirected) return;

          // If standard X link, trigger instant analysis
          if (clean.includes('x.com') || clean.includes('twitter.com')) {
            onAnalyze(clean);
          }
          return;
        }
      }
      setErrorNotice('Clipboard is empty or access was not granted. Please paste manually.');
    } catch {
      setErrorNotice('Please paste link manually into the box.');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorNotice(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setErrorNotice(
        currentLang === 'ar'
          ? 'يرجى لصق أو كتابة رابط فيديو صالح.'
          : 'Please paste or type a valid video or media link.'
      );
      return;
    }

    const redirected = checkAndRouteUrl(trimmed);
    if (redirected) return;

    onAnalyze(trimmed);
  };

  const handleSampleClick = (sampleKey: keyof typeof SAMPLE_TWEETS) => {
    const sample = SAMPLE_TWEETS[sampleKey];
    if (sample) {
      setUrl(sample.originalUrl);
      setSelectedPlatform('x');
      if (sample.isSpaces) {
        setXCategory('spaces');
      } else if (sampleKey === 'stream') {
        setXCategory('stream');
      } else {
        setXCategory('video');
      }
      onAnalyze(sample.originalUrl);
    }
  };

  const isMp3Mode = activeTab === 'mp3';

  // Dynamic placeholder based on platform and category
  const getDynamicPlaceholder = () => {
    if (isMp3Mode) return t.inputPlaceholderMp3;
    if (selectedPlatform === 'x') {
      switch (xCategory) {
        case 'spaces':
          return t.placeholderSpaces;
        case 'stream':
          return t.placeholderStream;
        case 'video':
        default:
          return t.placeholderVideo;
      }
    }
    if (currentLang === 'ar') {
      return 'الصق أي رابط (تيك توك، إنستغرام، إكس/تويتر، فيسبوك، ثريدز)...';
    } else if (currentLang === 'fr') {
      return 'Collez n’importe quel lien (TikTok, Instagram, X, Facebook, Threads)...';
    } else if (currentLang === 'es') {
      return 'Pega cualquier enlace (TikTok, Instagram, X, Facebook, Threads)...';
    }
    return 'Paste any link (TikTok, Instagram, X/Twitter, Facebook, Threads)...';
  };

  return (
    <section className="bg-white dark:bg-[#15202b] border-b border-[#cfd9de] dark:border-[#2f3336] py-7 sm:py-10 md:py-16 px-3 sm:px-4 transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        {/* Dynamic Badge with Supported Platforms */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-4 bg-[#e8f5fe] dark:bg-[#1d9bf0]/15 text-[#1d9bf0] border border-[#1d9bf0]/25 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1d9bf0]" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f1419] dark:text-[#f7f9f9]">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white inline-block" />
            <span>X</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] inline-block" />
            <span>TikTok</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] inline-block" />
            <span>Instagram</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] inline-block" />
            <span>Facebook</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] inline-block" />
            <span>Threads</span>
          </div>
        </div>

        {/* Hero Title: All-In-One Social Media Downloader */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f1419] dark:text-white tracking-tight leading-tight mb-3 max-w-3xl mx-auto">
          {isMp3Mode ? t.heroTitleMp3 : t.heroTitle}
        </h1>

        {/* Short, punchy description: الصق الرابط و احصل على مرادك */}
        <p className="text-[#536471] dark:text-[#8b98a5] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
          {isMp3Mode ? t.heroSubtitleMp3 : t.heroSubtitle}
        </p>

        {/* Platform Quick Filter Pills */}
        {!isMp3Mode && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedPlatform === 'all'
                  ? 'bg-[#0f1419] dark:bg-white text-white dark:text-black shadow-sm'
                  : 'bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#0f1419] dark:hover:text-white border border-[#cfd9de]/60 dark:border-[#2f3336]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>All In One</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlatform('x')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedPlatform === 'x'
                  ? 'bg-[#1d9bf0] text-white shadow-sm'
                  : 'bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#1d9bf0] border border-[#cfd9de]/60 dark:border-[#2f3336]'
              }`}
            >
              <span className="font-extrabold">𝕏</span>
              <span>Twitter / X</span>
            </button>

            <button
              type="button"
              onClick={() => onPlatformDetected?.('tiktok', '')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#00F2FE] border border-[#cfd9de]/60 dark:border-[#2f3336]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
              <span>TikTok</span>
            </button>

            <button
              type="button"
              onClick={() => onPlatformDetected?.('instagram', '')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#E1306C] border border-[#cfd9de]/60 dark:border-[#2f3336]"
            >
              <span className="w-2 h-2 rounded-full bg-[#E1306C]" />
              <span>Instagram</span>
            </button>

            <button
              type="button"
              onClick={() => onPlatformDetected?.('facebook', '')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#1877F2] border border-[#cfd9de]/60 dark:border-[#2f3336]"
            >
              <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
              <span>Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => onPlatformDetected?.('threads', '')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#f0f2f5] dark:bg-[#1e2732] text-[#536471] dark:text-[#cfd9de] hover:text-[#A855F7] border border-[#cfd9de]/60 dark:border-[#2f3336]"
            >
              <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
              <span>Threads</span>
            </button>
          </div>
        )}

        {/* 3 Dedicated Download Slots for Twitter / X */}
        {!isMp3Mode && selectedPlatform === 'x' && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-5 max-w-xl mx-auto p-1.5 bg-[#eff3f4] dark:bg-[#1e2732] rounded-2xl border border-[#cfd9de]/80 dark:border-[#2f3336] shadow-xs animate-in fade-in duration-200">
            {/* Slot 1: Video & GIF */}
            <button
              type="button"
              onClick={() => setXCategory('video')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                xCategory === 'video'
                  ? 'bg-white dark:bg-[#1d9bf0] text-[#1d9bf0] dark:text-white shadow-sm ring-1 ring-black/5'
                  : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
              }`}
            >
              <Film className="w-4 h-4 shrink-0" />
              <span>{t.categoryVideo}</span>
            </button>

            {/* Slot 2: Live Stream / Broadcast */}
            <button
              type="button"
              onClick={() => setXCategory('stream')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                xCategory === 'stream'
                  ? 'bg-white dark:bg-[#00ba7c] text-[#00ba7c] dark:text-white shadow-sm ring-1 ring-black/5'
                  : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 shrink-0" />
              <span>{t.categoryStream}</span>
            </button>

            {/* Slot 3: Spaces Audio */}
            <button
              type="button"
              onClick={() => setXCategory('spaces')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                xCategory === 'spaces'
                  ? 'bg-white dark:bg-[#7856FF] text-[#7856FF] dark:text-white shadow-sm ring-1 ring-black/5'
                  : 'text-[#536471] dark:text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4 shrink-0" />
              <span>{t.categorySpaces}</span>
            </button>
          </div>
        )}

        {/* Input Form with High-Speed Touch Ergonomics */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-[#1e2732] rounded-2xl border-2 border-[#cfd9de] dark:border-[#2f3336] focus-within:border-[#1d9bf0] dark:focus-within:border-[#1d9bf0] focus-within:ring-4 focus-within:ring-[#1d9bf0]/15 transition-all shadow-md p-1.5 gap-1.5">
            <div className="relative flex-1 flex items-center min-h-[48px]">
              {/* Icon */}
              <div className="pl-3.5 pr-1 text-[#8b98a5] shrink-0">
                {selectedPlatform === 'x' && xCategory === 'spaces' ? (
                  <Mic className="w-4 h-4 text-[#7856FF]" />
                ) : selectedPlatform === 'x' && xCategory === 'stream' ? (
                  <Radio className="w-4 h-4 text-[#00ba7c]" />
                ) : selectedPlatform === 'x' ? (
                  <Film className="w-4 h-4 text-[#1d9bf0]" />
                ) : (
                  <Globe className="w-4 h-4 text-[#1d9bf0]" />
                )}
              </div>

              <input
                type="url"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={url}
                onChange={(e) => {
                  const val = e.target.value;
                  setUrl(val);
                  checkAndRouteUrl(val);
                }}
                placeholder={getDynamicPlaceholder()}
                className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-[#0f1419] dark:text-white placeholder-[#8b98a5] focus:outline-none"
                aria-label="Video or media URL"
              />

              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="touch-target p-2 text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white transition-colors"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Paste Button */}
              <button
                type="button"
                onClick={handlePaste}
                className="touch-target px-3.5 py-1.5 bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 hover:bg-[#d0ebfd] dark:hover:bg-[#1d9bf0]/30 text-[#1d9bf0] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0 mx-1 active:scale-95"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{pasteSuccess ? 'Pasted!' : t.pasteBtn}</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="touch-target min-h-[48px] bg-[#0f1419] hover:bg-[#272c30] dark:bg-[#1d9bf0] dark:hover:bg-[#1a8cd8] active:scale-[0.98] text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.analyzingBtn}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span>{t.downloadBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* In-App Redirection Notice */}
          {redirectNotice && (
            <div className="mt-3 p-3 bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 border border-[#1d9bf0]/40 rounded-xl text-xs text-[#1d9bf0] dark:text-[#71c9f8] font-bold flex items-center justify-center gap-2 text-center animate-in fade-in duration-200">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{redirectNotice}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </div>
          )}

          {/* Error Message */}
          {errorNotice && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-2 text-left rtl:text-right animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}
        </form>

        {/* 1-Click Quick Sample Links */}
        <div className="mt-6 pt-4 border-t border-[#eff3f4] dark:border-[#2f3336] flex flex-wrap items-center justify-center gap-2 text-xs text-[#536471] dark:text-[#8b98a5]">
          <span className="font-semibold text-[#0f1419] dark:text-[#cfd9de]">{t.sampleLinksLabel}</span>

          <button
            type="button"
            onClick={() => handleSampleClick('spacex')}
            className="hover:text-[#1d9bf0] hover:underline px-2.5 py-1 rounded-lg bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de]/60 dark:border-[#2f3336] transition-colors inline-flex items-center gap-1 dark:text-[#cfd9de]"
          >
            🚀 SpaceX (X Video)
          </button>

          <button
            type="button"
            onClick={() => onPlatformDetected?.('tiktok', 'https://www.tiktok.com/@tiktok/video/7106594312292453675')}
            className="hover:text-[#00F2FE] hover:underline px-2.5 py-1 rounded-lg bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de]/60 dark:border-[#2f3336] transition-colors inline-flex items-center gap-1 dark:text-[#cfd9de]"
          >
            🎵 TikTok (No Watermark)
          </button>

          <button
            type="button"
            onClick={() => onPlatformDetected?.('instagram', 'https://www.instagram.com/reel/C28919241908/')}
            className="hover:text-[#E1306C] hover:underline px-2.5 py-1 rounded-lg bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de]/60 dark:border-[#2f3336] transition-colors inline-flex items-center gap-1 dark:text-[#cfd9de]"
          >
            📸 Instagram Reel (HD)
          </button>

          <button
            type="button"
            onClick={() => handleSampleClick('spaces')}
            className="hover:text-[#7856FF] hover:underline px-2.5 py-1 rounded-lg bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de]/60 dark:border-[#2f3336] transition-colors inline-flex items-center gap-1 dark:text-[#cfd9de]"
          >
            🎙️ Spaces Audio (320k)
          </button>
        </div>
      </div>
    </section>
  );
};
