import React from 'react';
import { Bookmark, Trash2, ExternalLink, Video, Music } from 'lucide-react';
import { DownloadHistoryItem, Language } from '../types';
import { translations } from '../data/translations';

interface RecentDownloadsProps {
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
  onSelectUrl: (url: string) => void;
  currentLang: Language;
}

export const RecentDownloads: React.FC<RecentDownloadsProps> = ({
  history,
  onClearHistory,
  onSelectUrl,
  currentLang,
}) => {
  const t = translations[currentLang];

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-12 px-4 text-center py-16 bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl transition-colors">
        <div className="w-14 h-14 bg-[#f7f9f9] dark:bg-[#1e2732] text-[#8b98a5] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#0f1419] dark:text-white mb-2">{t.historyTitle}</h3>
        <p className="text-sm text-[#536471] dark:text-[#8b98a5] max-w-md mx-auto">{t.historyEmpty}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#1d9bf0]" />
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0f1419] dark:text-white">
            {t.historyTitle} ({history.length})
          </h3>
        </div>
        <button
          onClick={onClearHistory}
          className="touch-target px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.clearHistory}</span>
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id + item.downloadedAt}
            className="bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs hover:border-[#1d9bf0]/50 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#eff3f4] dark:border-[#2f3336] flex items-center justify-center shrink-0 text-[#1d9bf0]">
                {item.mediaType === 'audio' ? (
                  <Music className="w-6 h-6 text-[#ffad1f]" />
                ) : (
                  <Video className="w-6 h-6" />
                )}
              </div>
              <div className="truncate">
                <div className="font-bold text-sm text-[#0f1419] dark:text-white truncate">
                  {item.title}
                </div>
                <div className="text-xs text-[#536471] dark:text-[#8b98a5] flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-[#1d9bf0]">@{item.authorHandle}</span>
                  <span>·</span>
                  <span className="font-mono">{item.quality}</span>
                  <span>·</span>
                  <span className="font-mono">{item.sizeMb} MB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSelectUrl(item.originalUrl)}
                className="touch-target px-3.5 py-2 rounded-xl bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 hover:bg-[#d0ebfd] dark:hover:bg-[#1d9bf0]/30 text-[#1d9bf0] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inspect</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
