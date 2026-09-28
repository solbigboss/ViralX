export type Language = 'en' | 'fr' | 'es' | 'ar';

export type ThemeMode = 'system' | 'dark' | 'light';

export type PlatformType = 'x' | 'instagram' | 'tiktok' | 'facebook' | 'threads';

export type XDownloadCategory = 'video' | 'stream' | 'spaces';

export type ActiveTab = 'home' | 'mp3' | 'batch' | 'guides' | 'faq' | 'history' | 'instagram' | 'tiktok' | 'facebook' | 'threads';

export interface MediaFormat {
  id: string;
  label: string;
  type: 'video' | 'audio' | 'gif';
  quality: string;
  resolution?: string;
  bitrate?: string;
  sizeMb: number;
  format: string;
  fps?: number;
  isPopular?: boolean;
  directUrl?: string;
}

export interface TweetMediaData {
  id: string;
  originalUrl: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  tweetText: string;
  publishedAt: string;
  durationSeconds: number;
  viewCount: string;
  likeCount: string;
  retweetCount: string;
  thumbnailUrl: string;
  videoUrl: string;
  audioUrl?: string;
  isSpaces?: boolean;
  formats: MediaFormat[];
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  authorHandle: string;
  thumbnailUrl: string;
  format: string;
  quality: string;
  sizeMb: number;
  downloadedAt: number;
  originalUrl: string;
  mediaType: 'video' | 'audio';
}
