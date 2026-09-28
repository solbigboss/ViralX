import React from 'react';
import { Smartphone, CheckCircle2, ArrowRight, Music } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface GuidesViewProps {
  currentLang: Language;
  onBackToHome: () => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ currentLang, onBackToHome }) => {
  const t = translations[currentLang];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-[#0f1419] dark:text-white tracking-tight mb-3">
          {t.navHowToUse} ViralX
        </h1>
        <p className="text-sm sm:text-base text-[#536471] dark:text-[#8b98a5]">
          {currentLang === 'ar'
            ? 'دليل شامل خطوة بخطوة لتحميل مقاطع الفيديو وحفظ الصوتيات على جميع الأجهزة'
            : 'Complete step-by-step instructions to download X videos and audio to any phone or computer.'}
        </p>
      </div>

      <div className="space-y-8">
        {/* iPhone Guide Card */}
        <div className="bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 text-[#1d9bf0] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0f1419] dark:text-white">
                {currentLang === 'ar' ? 'طريقة التحميل على آيفون وآيباد (iOS)' : 'How to Download on iPhone & iPad (iOS)'}
              </h2>
              <p className="text-xs text-[#536471] dark:text-[#8b98a5]">
                {currentLang === 'ar' ? 'حفظ مباشر في تطبيق الصور أو الملفات' : 'Save directly into Apple Photos Camera Roll'}
              </p>
            </div>
          </div>

          <ol className="space-y-4 text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#0f1419] dark:bg-[#1d9bf0] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-[#0f1419] dark:text-white">
                  {currentLang === 'ar' ? 'انسخ الرابط من تطبيق إكس:' : 'Copy link from Twitter/X app:'}
                </strong>{' '}
                {currentLang === 'ar'
                  ? 'اضغط على زر المشاركة أسفل التغريدة واختر "نسخ الرابط".'
                  : 'Tap the Share icon under the tweet video, then tap "Copy link".'}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#0f1419] dark:bg-[#1d9bf0] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-[#0f1419] dark:text-white">
                  {currentLang === 'ar' ? 'الصق في ViralX:' : 'Paste link in ViralX:'}
                </strong>{' '}
                {currentLang === 'ar'
                  ? 'افتح سفاري واضغط على زر "لصق" ثم اختر جودة 1080p أو 720p واضغط "تحميل".'
                  : 'Open Safari, tap "Paste" into ViralX, choose 1080p or 720p, and tap "Download".'}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#0f1419] dark:bg-[#1d9bf0] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-[#0f1419] dark:text-white">
                  {currentLang === 'ar' ? 'الحفظ في ألبوم الكاميرا:' : 'Save into Photos Camera Roll:'}
                </strong>{' '}
                {currentLang === 'ar'
                  ? 'اضغط على سهم التنزيل الأزرق في متصفح سفاري، وافتح الفيديو واضغط مشاركة ثم "حفظ الفيديو".'
                  : 'Tap the blue download icon in Safari\'s search bar, open the video, tap the iOS Share button, and select "Save Video".'}
              </div>
            </li>
          </ol>
        </div>

        {/* Android Guide Card */}
        <div className="bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00ba7c] flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0f1419] dark:text-white">
                {currentLang === 'ar' ? 'طريقة التحميل على أجهزة أندرويد' : 'How to Download on Android Devices'}
              </h2>
              <p className="text-xs text-[#536471] dark:text-[#8b98a5]">
                Samsung, Google Pixel, Xiaomi & OnePlus
              </p>
            </div>
          </div>

          <ol className="space-y-4 text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#00ba7c] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-[#0f1419] dark:text-white">
                  {currentLang === 'ar' ? 'انسخ الرابط:' : 'Copy Tweet link:'}
                </strong>{' '}
                {currentLang === 'ar'
                  ? 'من تطبيق إكس، اضغط مشاركة ثم نسخ الرابط.'
                  : 'In Twitter/X, tap Share under the video and choose Copy link.'}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#00ba7c] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-[#0f1419] dark:text-white">
                  {currentLang === 'ar' ? 'تنزيل مباشر:' : 'Direct Download:'}
                </strong>{' '}
                {currentLang === 'ar'
                  ? 'الصق الرابط في ViralX واضغط تحميل. سيتم حفظ الملف فوراً في مجلد التنزيلات وتطبيق المعرض.'
                  : 'Paste into ViralX in Chrome, tap your format, and the MP4 file downloads straight into your device Downloads and Gallery.'}
              </div>
            </li>
          </ol>
        </div>

        {/* Twitter Spaces to MP3 Guide */}
        <div className="bg-white dark:bg-[#15202b] border border-[#cfd9de] dark:border-[#2f3336] rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#ffad1f]/15 dark:bg-[#ffad1f]/20 text-[#ffad1f] flex items-center justify-center font-bold">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0f1419] dark:text-white">
                {currentLang === 'ar' ? 'استخراج صوتيات المساحات (Spaces to MP3)' : 'Extract Twitter Spaces to 320kbps MP3'}
              </h2>
              <p className="text-xs text-[#536471] dark:text-[#8b98a5]">
                Podcasts, Interviews, and Keynote Discussions
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#536471] dark:text-[#8b98a5] leading-relaxed mb-3">
            {currentLang === 'ar'
              ? 'تتيح تقنية ViralX استخراج التسجيل الكامل لأي مساحة صوتية منشورة مع الاحتفاظ بجودة الستيريو الأصلية بدون تشويش أو ضغط زائد.'
              : 'ViralX automatically connects to the Twitter audio CDN stream to extract the original stereo audio at pristine 320kbps bitrates, compatible with Spotify local files and Apple Music.'}
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToHome}
            className="touch-target px-8 py-3.5 bg-[#0f1419] hover:bg-[#272c30] dark:bg-[#1d9bf0] dark:hover:bg-[#1a8cd8] text-white text-sm font-bold rounded-2xl inline-flex items-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180 rtl:rotate-0" />
            <span>{currentLang === 'ar' ? 'العودة إلى أداة التحميل' : 'Back to Downloader Tool'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
