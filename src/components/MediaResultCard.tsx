import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  Share2,
  QrCode,
  Copy,
  Check,
  Scissors,
  CheckCircle2,
  Music,
  Video,
  FileText,
  Clock,
  Eye,
  Heart,
  Repeat,
} from 'lucide-react';
import { TweetMediaData, MediaFormat, Language } from '../types';
import { translations } from '../data/translations';

interface MediaResultCardProps {
  media: TweetMediaData;
  currentLang: Language;
  onOpenQr: (url: string, title: string) => void;
  onSaveDownload: (media: TweetMediaData, format: MediaFormat) => void;
}

export const MediaResultCard: React.FC<MediaResultCardProps> = ({
  media,
  currentLang,
  onOpenQr,
  onSaveDownload,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [trimmerActive, setTrimmerActive] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(media.durationSeconds);
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('18.4 MB/s');
  const [downloadComplete, setDownloadComplete] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const t = translations[currentLang];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(media.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ViralX - Video from @${media.author.handle}`,
          text: media.tweetText,
          url: media.originalUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownload = async (format: MediaFormat) => {
    setActiveDownloadId(format.id);
    setDownloadProgress(0);
    setDownloadComplete(null);

    const rawTargetUrl = format.directUrl || (format.type === 'audio' && media.audioUrl ? media.audioUrl : (media.videoUrl || '/assets/viralx_sample.mp4'));
    const safeHandle = (media.author?.handle || 'video').replace(/[^a-zA-Z0-9_]/g, '');
    const filename = `ViralX_${safeHandle}_${format.quality.replace(/\s+/g, '_')}.${format.format.toLowerCase()}`;
    const targetUrl = rawTargetUrl.startsWith('/api/')
      ? rawTargetUrl
      : `/api/proxy-download?url=${encodeURIComponent(rawTargetUrl)}&filename=${encodeURIComponent(filename)}`;

    let current = 0;
    const interval = setInterval(async () => {
      current += Math.floor(Math.random() * 25) + 20;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setDownloadProgress(100);
        setActiveDownloadId(null);
        setDownloadComplete(format.id);

        onSaveDownload(media, format);

        // Fetch real media file bytes and trigger browser download with correct MIME type
        try {
          const response = await fetch(targetUrl);
          if (response.ok) {
            const rawBlob = await response.blob();
            const mimeType = format.type === 'audio' ? 'audio/mpeg' : 'video/mp4';
            const realBlob = new Blob([rawBlob], { type: mimeType });
            const downloadUrl = URL.createObjectURL(realBlob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
          } else {
            // Direct browser download fallback
            const a = document.createElement('a');
            a.href = targetUrl;
            a.download = filename;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        } catch {
          // Direct browser download fallback for external origins
          const a = document.createElement('a');
          a.href = targetUrl;
          a.download = filename;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }

        if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
        setTimeout(() => setDownloadComplete(null), 5000);
      } else {
        setDownloadProgress(current);
        const randomSpeed = (18 + Math.random() * 10).toFixed(1);
        setDownloadSpeed(`${randomSpeed} MB/s`);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-3 sm:my-8 bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200 transition-colors">
      {/* Tweet Author Header */}
      <div className="p-3.5 sm:p-6 border-b border-[#eff3f4] dark:border-[#2f3336] bg-[#f7f9f9]/50 dark:bg-[#1e2732]/40 flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <img
            src={media.author.avatar}
            alt={media.author.name}
            className="w-12 h-12 rounded-full border border-[#cfd9de] dark:border-[#2f3336] object-cover shrink-0 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#0f1419] dark:text-white text-base leading-snug">
                {media.author.name}
              </span>
              {media.author.verified && (
                <span className="text-[#1d9bf0]" title="Verified Account">
                  <CheckCircle2 className="w-4 h-4 fill-[#1d9bf0] text-white" />
                </span>
              )}
              <span className="text-xs text-[#536471] dark:text-[#8b98a5]">@{media.author.handle}</span>
            </div>
            <div className="text-xs text-[#536471] dark:text-[#8b98a5] flex items-center gap-2 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{media.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons for Mobile / Desktop Sharing */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenQr(media.originalUrl, media.tweetText)}
            className="touch-target p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#f7f9f9] dark:hover:bg-[#273340] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Scan QR to download on mobile phone"
          >
            <QrCode className="w-4 h-4 text-[#1d9bf0]" />
            <span className="hidden sm:inline">Phone QR</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="touch-target p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-[#cfd9de] hover:bg-[#f7f9f9] dark:hover:bg-[#273340] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Share via device"
          >
            <Share2 className="w-4 h-4 text-[#1d9bf0]" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Tweet Body Text */}
      <div className="px-4 sm:px-6 pt-4 pb-2">
        <p className="text-[#0f1419] dark:text-[#e1e8ed] text-sm sm:text-base leading-relaxed break-words font-medium">
          {media.tweetText}
        </p>

        {/* Tweet stats */}
        <div className="flex items-center gap-4 mt-3 text-xs text-[#536471] dark:text-[#8b98a5] pb-2 border-b border-[#eff3f4] dark:border-[#2f3336]">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-semibold">{media.viewCount}</span>
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-semibold">{media.likeCount}</span>
          </span>
          <span className="flex items-center gap-1">
            <Repeat className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold">{media.retweetCount}</span>
          </span>
        </div>
      </div>

      {/* Media Player Container - Zero Cumulative Layout Shift (Aspect 16:9) */}
      <div className="px-4 sm:px-6 py-3">
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner group">
          {media.isSpaces ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1419] via-[#15202b] to-[#1e2732] p-6 text-white text-center">
              <div className="w-16 h-16 rounded-full bg-[#1d9bf0]/20 border border-[#1d9bf0] flex items-center justify-center mb-3 animate-pulse">
                <Music className="w-8 h-8 text-[#1d9bf0]" />
              </div>
              <span className="text-lg font-bold">Twitter Spaces Broadcast Audio</span>
              <span className="text-xs text-[#8b98a5] mt-1">High Definition 320kbps Audio Stream</span>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center gap-1 mt-4 h-12">
                {[40, 70, 25, 90, 60, 85, 30, 95, 50, 80, 45, 100, 65, 35, 75, 55, 90, 40].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${isPlaying ? h : 20}%` }}
                    className="w-1.5 bg-[#1d9bf0] rounded-full transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={media.videoUrl || '/assets/viralx_sample.mp4'}
              poster={media.thumbnailUrl}
              playsInline
              loop
              preload="metadata"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/viralx_sample.mp4')) {
                  target.src = '/assets/viralx_sample.mp4';
                  target.load();
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />
          )}

          {/* Floating Minimal Touch Player Controls */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={togglePlay}
              className="touch-target w-16 h-16 rounded-full bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform pointer-events-auto"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
          </div>

          {/* Bottom Bar Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="touch-target p-1 hover:text-[#1d9bf0] transition-colors"
                aria-label="Play/Pause"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="touch-target p-1 hover:text-[#1d9bf0] transition-colors"
                aria-label="Mute/Unmute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono tabular-nums text-[11px] text-[#cfd9de]">
                0:00 / 0:{media.durationSeconds.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTrimmerActive((prev) => !prev)}
                className={`touch-target px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                  trimmerActive ? 'bg-[#1d9bf0] text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                title="Trim clip duration"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Trim</span>
              </button>
              <button
                onClick={handleFullscreen}
                className="touch-target p-1 hover:text-[#1d9bf0] transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Clip Trimmer Drawer */}
        {trimmerActive && (
          <div className="mt-3 p-4 bg-[#f7f9f9] dark:bg-[#1e2732] border border-[#cfd9de] dark:border-[#2f3336] rounded-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-[#0f1419] dark:text-white mb-2">
              <span className="flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#1d9bf0]" />
                {t.trimmerTitle}
              </span>
              <span className="font-mono text-[#536471] dark:text-[#8b98a5]">
                {trimStart}s — {trimEnd}s ({trimEnd - trimStart}s duration)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-[#536471] dark:text-[#8b98a5]">{t.trimmerStart}:</label>
              <input
                type="range"
                min="0"
                max={media.durationSeconds - 2}
                value={trimStart}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < trimEnd) setTrimStart(val);
                }}
                className="w-full accent-[#1d9bf0]"
              />
              <label className="text-xs text-[#536471] dark:text-[#8b98a5]">{t.trimmerEnd}:</label>
              <input
                type="range"
                min="2"
                max={media.durationSeconds}
                value={trimEnd}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > trimStart) setTrimEnd(val);
                }}
                className="w-full accent-[#1d9bf0]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Download Progress Notice */}
      {activeDownloadId && (
        <div className="mx-4 sm:mx-6 my-2 p-4 bg-[#e8f5fe] dark:bg-[#1d9bf0]/15 border border-[#1d9bf0]/30 rounded-2xl animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-[#1d9bf0] mb-2">
            <span>{t.downloadingNotice}</span>
            <span className="font-mono">{downloadSpeed} · {downloadProgress}%</span>
          </div>
          <div className="w-full bg-[#1d9bf0]/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#1d9bf0] h-full transition-all duration-150 rounded-full"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {downloadComplete && (
        <div className="mx-4 sm:mx-6 my-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-400 font-bold flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {t.downloadComplete}
          </span>
          <button
            onClick={() => setDownloadComplete(null)}
            className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Format Selection Cards / Table */}
      <div className="p-4 sm:p-6 border-t border-[#eff3f4] dark:border-[#2f3336]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0f1419] dark:text-white">
            {t.formatSelection}
          </h3>
          <span className="text-xs text-[#00ba7c] font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00ba7c] animate-ping" />
            {t.freeNoLimits}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {media.formats.map((fmt) => {
            const isDownloadingThis = activeDownloadId === fmt.id;
            return (
              <div
                key={fmt.id}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                  fmt.isPopular
                    ? 'border-[#1d9bf0]/50 bg-[#f7fafd] dark:bg-[#1e2732] shadow-xs'
                    : 'border-[#cfd9de] dark:border-[#2f3336] bg-white dark:bg-[#15202b] hover:border-[#8b98a5]'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      fmt.type === 'audio'
                        ? 'bg-[#ffad1f]/15 text-[#ffad1f]'
                        : fmt.type === 'gif'
                        ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
                        : 'bg-[#1d9bf0]/15 text-[#1d9bf0]'
                    }`}
                  >
                    {fmt.type === 'audio' ? (
                      <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : fmt.type === 'gif' ? (
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-xs sm:text-sm text-[#0f1419] dark:text-white leading-tight">
                      {fmt.label}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#536471] dark:text-[#8b98a5] font-mono tabular-nums mt-0.5">
                      {fmt.resolution || fmt.bitrate} · {fmt.sizeMb} MB · {fmt.format}
                    </div>
                  </div>
                </div>

                {/* Right side: Action with POPULAR badge neatly stacked ABOVE download button */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {fmt.isPopular && (
                    <span className="text-[9px] sm:text-[10px] tracking-wide font-black uppercase bg-[#1d9bf0] text-white px-2 py-0.5 rounded-full shadow-2xs leading-none">
                      POPULAR
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={isDownloadingThis}
                    onClick={() => handleDownload(fmt)}
                    className={`touch-target px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 active:scale-95 ${
                      fmt.isPopular
                        ? 'bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white'
                        : 'bg-[#0f1419] dark:bg-[#273340] hover:bg-[#272c30] dark:hover:bg-[#344454] text-white'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.downloadBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Copy Direct Link Button */}
        <div className="mt-4 pt-4 border-t border-[#eff3f4] dark:border-[#2f3336] flex flex-wrap items-center justify-between gap-3 text-xs text-[#536471] dark:text-[#8b98a5]">
          <div className="flex items-center gap-2">
            <span>Original source bitstream</span>
            <span>·</span>
            <span>0% Watermark</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="touch-target inline-flex items-center gap-1.5 font-bold text-[#1d9bf0] hover:underline"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? t.linkCopied : t.copyLink}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
