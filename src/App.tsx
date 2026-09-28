/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroInput } from './components/HeroInput';
import { MediaResultCard } from './components/MediaResultCard';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FaqSection } from './components/FaqSection';
import { ToolsNetwork } from './components/ToolsNetwork';
import { RecentDownloads } from './components/RecentDownloads';
import { GuidesView } from './components/GuidesView';
import { PlatformDownloaderView } from './components/PlatformDownloaderView';
import { QrCodeModal } from './components/QrCodeModal';
import { Footer } from './components/Footer';
import { Language, ActiveTab, TweetMediaData, MediaFormat, DownloadHistoryItem, ThemeMode } from './types';
import { parseTweetUrl, SAMPLE_TWEETS } from './data/sampleTweets';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('viralx_lang');
    if (saved === 'en' || saved === 'fr' || saved === 'es' || saved === 'ar') {
      return saved;
    }
    return 'en';
  });

  // Theme mode: 'system' | 'dark' | 'light'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('viralx_theme_mode');
    if (saved === 'dark' || saved === 'light' || saved === 'system') {
      return saved;
    }
    const legacyDark = localStorage.getItem('viralx_dark_mode');
    if (legacyDark !== null) {
      return legacyDark === 'true' ? 'dark' : 'light';
    }
    return 'system';
  });

  // Track system preference in real time
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches);

    const handleSystemChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Compute resolved dark mode boolean based on selection and system preference
  const isDark = themeMode === 'system' ? systemIsDark : themeMode === 'dark';

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [analyzedMedia, setAnalyzedMedia] = useState<TweetMediaData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // QR Modal State
  const [qrModal, setQrModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  // Recent Downloads History State
  const [history, setHistory] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('viralx_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [platformInitialUrl, setPlatformInitialUrl] = useState<string>('');

  const handlePlatformDetected = (platform: 'tiktok' | 'instagram' | 'facebook' | 'threads', detectedUrl: string) => {
    setPlatformInitialUrl(detectedUrl);
    setActiveTab(platform);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync Dark Mode class and data attributes on html document root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('viralx_theme_mode', themeMode);
    localStorage.setItem('viralx_dark_mode', String(isDark));
  }, [isDark, themeMode]);

  // Sync RTL and language tag to html root element
  useEffect(() => {
    const root = document.documentElement;
    root.lang = currentLang;
    root.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('viralx_lang', currentLang);
  }, [currentLang]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('viralx_history', JSON.stringify(history));
    } catch {
      // Storage quota or disabled
    }
  }, [history]);

  // Handle URL analysis with realistic parsing
  const handleAnalyze = async (url: string) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setAnalyzedMedia(json.data);
          setIsLoading(false);
          setTimeout(() => {
            const previewElement = document.getElementById('media-preview-anchor');
            if (previewElement) {
              previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
          return;
        }
      }
    } catch (err) {
      console.warn('Realtime media extract API failed, using fallback:', err);
    }

    // Fast edge CDN parsing fallback
    setTimeout(() => {
      const result = parseTweetUrl(url);
      setAnalyzedMedia(result);
      setIsLoading(false);

      // Smoothly scroll down to media preview
      setTimeout(() => {
        const previewElement = document.getElementById('media-preview-anchor');
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }, 450);
  };

  // Handle saving a download event to user's history
  const handleSaveDownload = (media: TweetMediaData, format: MediaFormat) => {
    const newItem: DownloadHistoryItem = {
      id: `${media.id}_${format.id}_${Date.now()}`,
      title: media.tweetText.slice(0, 60) + (media.tweetText.length > 60 ? '...' : ''),
      authorHandle: media.author.handle,
      thumbnailUrl: media.thumbnailUrl,
      format: format.format,
      quality: format.quality,
      sizeMb: format.sizeMb,
      downloadedAt: Date.now(),
      originalUrl: media.originalUrl,
      mediaType: format.type === 'audio' ? 'audio' : 'video',
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 24)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSelectTool = (tab: ActiveTab, sampleKey?: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sampleKey && SAMPLE_TWEETS[sampleKey]) {
      handleAnalyze(SAMPLE_TWEETS[sampleKey].originalUrl);
    }
  };

  const handleOpenQr = (url: string, title: string) => {
    setQrModal({ isOpen: true, url, title });
  };

  const handleCloseQr = () => {
    setQrModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f9] dark:bg-[#000000] text-[#0f1419] dark:text-[#f7f9f9] selection:bg-[#1d9bf0] selection:text-white transition-colors duration-200">
      {/* Pinned Top Navigation Bar with System/Dark/Light Mode & Flag Icons */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={history.length}
        themeMode={themeMode}
        isDark={isDark}
        onSelectThemeMode={setThemeMode}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'guides' ? (
          <GuidesView
            currentLang={currentLang}
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeTab === 'history' ? (
          <RecentDownloads
            history={history}
            onClearHistory={handleClearHistory}
            onSelectUrl={(url) => {
              setActiveTab('home');
              handleAnalyze(url);
            }}
            currentLang={currentLang}
          />
        ) : activeTab === 'instagram' || activeTab === 'tiktok' || activeTab === 'facebook' || activeTab === 'threads' ? (
          <PlatformDownloaderView
            platformSlug={activeTab}
            currentLang={currentLang}
            onOpenQr={handleOpenQr}
            onSaveDownload={handleSaveDownload}
            onSelectPlatform={(slug) => {
              setActiveTab(slug);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialUrl={platformInitialUrl}
          />
        ) : (
          <>
            {/* Hero Input Area (Video Downloader or MP3 Mode) */}
            <HeroInput
              currentLang={currentLang}
              activeTab={activeTab}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              onPlatformDetected={handlePlatformDetected}
            />

            {/* Extracted Media Result Card with Live Preview */}
            <div id="media-preview-anchor" className="w-full px-2 sm:px-4">
              {analyzedMedia && (
                <MediaResultCard
                  media={analyzedMedia}
                  currentLang={currentLang}
                  onOpenQr={handleOpenQr}
                  onSaveDownload={handleSaveDownload}
                />
              )}
            </div>

            {/* Step-by-Step Educational Guides */}
            <HowItWorksSteps currentLang={currentLang} />

            {/* Technical Specifications Engine */}
            <TechnicalSpecs currentLang={currentLang} />

            {/* Specialized Tools Network Switcher */}
            <ToolsNetwork
              currentLang={currentLang}
              onSelectTool={handleSelectTool}
            />

            {/* Interactive FAQs with Search */}
            <FaqSection currentLang={currentLang} />
          </>
        )}
      </main>

      {/* Footer with Country Flags for Regional Languages */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* QR Code Modal for Instant Smartphone Transfer */}
      <QrCodeModal
        isOpen={qrModal.isOpen}
        onClose={handleCloseQr}
        url={qrModal.url}
        title={qrModal.title}
        currentLang={currentLang}
      />
    </div>
  );
}
