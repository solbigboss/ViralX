import React from 'react';
import { X, Smartphone, Check, Copy } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  currentLang: Language;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  currentLang,
}) => {
  const [copied, setCopied] = React.useState(false);
  const t = translations[currentLang];

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=0f1419&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white dark:bg-[#15202b] rounded-3xl p-6 shadow-2xl border border-[#cfd9de] dark:border-[#2f3336] text-center animate-in zoom-in-95 duration-200 transition-colors">
        <button
          onClick={onClose}
          className="touch-target absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-[#8b98a5] hover:text-[#0f1419] dark:hover:text-white rounded-full transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-[#e8f5fe] dark:bg-[#1d9bf0]/20 text-[#1d9bf0] rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-black text-[#0f1419] dark:text-white mb-1">
          {t.qrModalTitle}
        </h3>
        <p className="text-xs text-[#536471] dark:text-[#8b98a5] mb-5 leading-relaxed">
          {t.qrModalDesc}
        </p>

        {/* QR Code Container */}
        <div className="bg-[#f7f9f9] dark:bg-white p-4 rounded-2xl border border-[#cfd9de] inline-block shadow-inner mb-4">
          <img
            src={qrImageSrc}
            alt="Scan QR code for direct mobile download"
            className="w-48 h-48 mx-auto rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="text-xs font-mono text-[#536471] dark:text-[#8b98a5] truncate max-w-xs mx-auto mb-4 bg-[#f7f9f9] dark:bg-[#1e2732] px-3 py-1.5 rounded-lg border border-[#eff3f4] dark:border-[#2f3336]">
          {url}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl border border-[#cfd9de] dark:border-[#2f3336] text-[#0f1419] dark:text-white hover:bg-[#f7f9f9] dark:hover:bg-[#1e2732] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors touch-target"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.linkCopied : t.copyLink}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-[#0f1419] dark:bg-[#1d9bf0] text-white hover:bg-[#272c30] dark:hover:bg-[#1a8cd8] font-bold text-xs transition-colors touch-target"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
