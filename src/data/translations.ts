import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  navHome: string;
  navMp3: string;
  navHowToUse: string;
  navBlog: string;
  navHistory: string;
  badgeLive: string;
  badgeMp3: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTitleMp3: string;
  heroSubtitleMp3: string;
  categoryVideo: string;
  categoryStream: string;
  categorySpaces: string;
  placeholderVideo: string;
  placeholderStream: string;
  placeholderSpaces: string;
  redirectNotice: string;
  inputPlaceholder: string;
  inputPlaceholderMp3: string;
  pasteBtn: string;
  clearBtn: string;
  downloadBtn: string;
  analyzingBtn: string;
  sampleLinksLabel: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  previewTitle: string;
  formatSelection: string;
  trimmerTitle: string;
  trimmerStart: string;
  trimmerEnd: string;
  downloadingNotice: string;
  downloadComplete: string;
  shareTitle: string;
  qrModalTitle: string;
  qrModalDesc: string;
  close: string;
  copyLink: string;
  linkCopied: string;
  historyTitle: string;
  historyEmpty: string;
  clearHistory: string;
  faqTitle: string;
  faqSubtitle: string;
  supportedDevices: string;
  freeNoLimits: string;
  footerDisclaimer: string;
  footerSsl: string;
  otherTools: string;
  languages: string;
  privacy: string;
  terms: string;
  dataSaver: string;
  bestQuality: string;
  speed: string;
  darkMode: string;
  lightMode: string;
  systemMode: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'ViralX',
    tagline: 'Fastest X / Twitter Downloader',
    navHome: 'Video Downloader',
    navMp3: 'Twitter to MP3',
    navHowToUse: 'How to Use',
    navBlog: 'Guides',
    navHistory: 'Saved',
    badgeLive: 'Live Streams, Broadcasts & Spaces Supported',
    badgeMp3: 'Lossless 320kbps Audio Extractor',
    heroTitle: 'All-In-One Social Media Downloader',
    heroSubtitle: 'Paste the link and get what you want instantly in high definition.',
    heroTitleMp3: 'Twitter to MP3 Converter & Audio Extractor',
    heroSubtitleMp3: 'Convert any X (Twitter) video, interview, or Spaces broadcast into a crisp 320kbps MP3 audio file directly onto your phone or computer.',
    categoryVideo: 'Video & GIF',
    categoryStream: 'Live Stream',
    categorySpaces: 'Audio Spaces',
    placeholderVideo: 'Paste X video link (e.g. https://x.com/user/status/...)',
    placeholderStream: 'Paste X live stream link (e.g. https://x.com/i/broadcasts/...)',
    placeholderSpaces: 'Paste X Spaces link (e.g. https://x.com/i/spaces/...)',
    redirectNotice: 'Recognized link! Redirecting to platform downloader...',
    inputPlaceholder: 'Paste link from X (e.g. https://x.com/user/status/...)',
    inputPlaceholderMp3: 'Paste Twitter/X link to extract MP3 audio...',
    pasteBtn: 'Paste',
    clearBtn: 'Clear',
    downloadBtn: 'Download',
    analyzingBtn: 'Extracting...',
    sampleLinksLabel: 'Try instant sample links:',
    howItWorksTitle: 'How our Twitter Downloader works?',
    howItWorksSubtitle: 'Our online Twitter downloader works in any browser on mobile or desktop without apps. Save videos in high resolution directly from Twitter/X CDN.',
    step1Title: 'Copy tweet link',
    step1Desc: 'Open X (Twitter), tap the "Share" button on the video tweet, and choose "Copy link".',
    step2Title: 'Paste link here',
    step2Desc: 'Tap "Paste" in our input box above to instantly fetch the media streams.',
    step3Title: 'Choose quality & save',
    step3Desc: 'Pick your preferred resolution (1080p Full HD, 720p, or 320k MP3) and download directly to camera roll or files.',
    previewTitle: 'Extracted Media Preview',
    formatSelection: 'Available Download Formats',
    trimmerTitle: 'Clip Trimmer (Optional)',
    trimmerStart: 'Start',
    trimmerEnd: 'End',
    downloadingNotice: 'Preparing & downloading file...',
    downloadComplete: 'Download started! Check your device downloads.',
    shareTitle: 'Share or Send to Mobile',
    qrModalTitle: 'Scan to Download on Phone',
    qrModalDesc: 'Point your iPhone or Android camera at this QR code to download directly on your phone.',
    close: 'Close',
    copyLink: 'Copy Media Link',
    linkCopied: 'Copied to clipboard!',
    historyTitle: 'Recent Downloads',
    historyEmpty: 'No downloads yet. Paste a link above to start saving media!',
    clearHistory: 'Clear History',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about downloading Twitter/X videos & audio.',
    supportedDevices: 'Compatible with iPhone iOS, Android, Windows, macOS, and Linux',
    freeNoLimits: '100% Free · No Limits · No Registration',
    footerDisclaimer: 'ViralX is an independent utility and is not affiliated with X Corp. or Twitter. All media files remain hosted on public Twitter CDN servers.',
    footerSsl: '🔒 SSL Encrypted · ⚡ High Speed CDN Tunnel',
    otherTools: 'Other Downloader Tools',
    languages: 'Languages & Regional Sites',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    dataSaver: 'Data Saver',
    bestQuality: 'Best Quality',
    speed: 'Download Speed',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemMode: 'System (Auto)',
  },
  fr: {
    appName: 'ViralX',
    tagline: 'Téléchargeur X / Twitter le plus rapide',
    navHome: 'Téléchargeur Vidéo',
    navMp3: 'Twitter en MP3',
    navHowToUse: 'Comment utiliser',
    navBlog: 'Guides',
    navHistory: 'Enregistrés',
    badgeLive: 'Diffusions en direct et Spaces pris en charge',
    badgeMp3: 'Extracteur audio sans perte 320kbps',
    heroTitle: 'All-In-One Social Media Downloader',
    heroSubtitle: 'Collez le lien et obtenez votre vidéo instantanément en haute qualité.',
    heroTitleMp3: 'Convertisseur Twitter vers MP3 & Audio',
    heroSubtitleMp3: 'Convertissez n’importe quelle vidéo X (Twitter) ou Space en fichier MP3 haute clarté à 320kbps sans aucune application tierce.',
    categoryVideo: 'Vidéo & GIF',
    categoryStream: 'En Direct (Stream)',
    categorySpaces: 'Spaces Audio',
    placeholderVideo: 'Collez le lien de la vidéo X (ex. https://x.com/user/status/...)',
    placeholderStream: 'Collez le lien du direct X (ex. https://x.com/i/broadcasts/...)',
    placeholderSpaces: 'Collez le lien Spaces X (ex. https://x.com/i/spaces/...)',
    redirectNotice: 'Lien reconnu ! Redirection vers la plateforme...',
    inputPlaceholder: 'Insérer le lien de X (ex. https://x.com/user/status/...)',
    inputPlaceholderMp3: 'Collez le lien X pour extraire l’audio MP3...',
    pasteBtn: 'Coller',
    clearBtn: 'Effacer',
    downloadBtn: 'Télécharger',
    analyzingBtn: 'Extraction...',
    sampleLinksLabel: 'Essayer un exemple en 1 clic :',
    howItWorksTitle: 'Comment fonctionne notre téléchargeur Twitter ?',
    howItWorksSubtitle: 'Notre service fonctionne dans tous les navigateurs mobiles et ordinateurs. Enregistrez directement les vidéos depuis le CDN de Twitter.',
    step1Title: 'Copier le lien du tweet',
    step1Desc: 'Ouvrez X, appuyez sur Partager sous la vidéo et sélectionnez "Copier le lien".',
    step2Title: 'Coller le lien ici',
    step2Desc: 'Appuyez sur Coller dans notre champ ci-dessus pour analyser le média en un instant.',
    step3Title: 'Choisir la qualité et sauver',
    step3Desc: 'Choisissez 1080p Full HD, 720p ou MP3 audio et téléchargez immédiatement.',
    previewTitle: 'Aperçu du média extrait',
    formatSelection: 'Formats de téléchargement disponibles',
    trimmerTitle: 'Découpage du clip (Optionnel)',
    trimmerStart: 'Début',
    trimmerEnd: 'Fin',
    downloadingNotice: 'Préparation du téléchargement...',
    downloadComplete: 'Téléchargement lancé avec succès !',
    shareTitle: 'Partager ou envoyer sur mobile',
    qrModalTitle: 'Scanner pour télécharger sur mobile',
    qrModalDesc: 'Scannez ce QR code avec votre smartphone pour enregistrer le fichier.',
    close: 'Fermer',
    copyLink: 'Copier le lien média',
    linkCopied: 'Lien copié !',
    historyTitle: 'Téléchargements récents',
    historyEmpty: 'Aucun téléchargement. Collez un lien ci-dessus pour commencer !',
    clearHistory: 'Effacer l’historique',
    faqTitle: 'Questions fréquemment posées',
    faqSubtitle: 'Tout ce que vous devez savoir pour télécharger des vidéos Twitter.',
    supportedDevices: 'Compatible iPhone iOS, Android, Windows, macOS et Linux',
    freeNoLimits: '100% Gratuit · Sans limite · Sans inscription',
    footerDisclaimer: 'ViralX est un utilitaire indépendant et n’est pas affilié à X Corp. ou Twitter.',
    footerSsl: '🔒 Chiffrement SSL · ⚡ Vitesse CDN maximale',
    otherTools: 'Autres outils',
    languages: 'Langues régionales',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    dataSaver: 'Économiseur de données',
    bestQuality: 'Meilleure qualité',
    speed: 'Vitesse de transfert',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    systemMode: 'Système (Auto)',
  },
  es: {
    appName: 'ViralX',
    tagline: 'El descargador más rápido de X / Twitter',
    navHome: 'Descargador de Video',
    navMp3: 'Twitter a MP3',
    navHowToUse: 'Cómo usar',
    navBlog: 'Guías',
    navHistory: 'Guardados',
    badgeLive: 'Transmisiones en vivo y Spaces compatibles',
    badgeMp3: 'Extractor de audio 320kbps sin pérdida',
    heroTitle: 'All-In-One Social Media Downloader',
    heroSubtitle: 'Pega el enlace y obtén tu video al instante en la más alta calidad.',
    heroTitleMp3: 'Convertidor de Twitter a MP3 y Audio',
    heroSubtitleMp3: 'Convierte videos de Twitter o emisiones de Spaces en audios MP3 nítidos a 320kbps sin instalar aplicaciones adicionales.',
    categoryVideo: 'Video y GIF',
    categoryStream: 'Transmisión en Vivo',
    categorySpaces: 'Spaces de Audio',
    placeholderVideo: 'Pega el enlace de video de X (ej. https://x.com/user/status/...)',
    placeholderStream: 'Pega el enlace de transmisión de X (ej. https://x.com/i/broadcasts/...)',
    placeholderSpaces: 'Pega el enlace de Spaces de X (ej. https://x.com/i/spaces/...)',
    redirectNotice: '¡Enlace reconocido! Redirigiendo a la plataforma...',
    inputPlaceholder: 'Pegar enlace de X (ej. https://x.com/usuario/status/...)',
    inputPlaceholderMp3: 'Pegar enlace de X para extraer MP3...',
    pasteBtn: 'Pegar',
    clearBtn: 'Borrar',
    downloadBtn: 'Descargar',
    analyzingBtn: 'Extrayendo...',
    sampleLinksLabel: 'Probar enlaces de ejemplo:',
    howItWorksTitle: '¿Cómo funciona nuestro descargador?',
    howItWorksSubtitle: 'Funciona en cualquier navegador móvil o de escritorio. Guarda videos en alta resolución directo de los servidores CDN de Twitter.',
    step1Title: 'Copiar enlace del tweet',
    step1Desc: 'Abre X (Twitter), toca el botón "Compartir" en el tweet y elige "Copiar enlace".',
    step2Title: 'Pegar enlace aquí',
    step2Desc: 'Toca "Pegar" en el cuadro superior para analizar el video de inmediato.',
    step3Title: 'Elegir calidad y guardar',
    step3Desc: 'Elige tu calidad preferida (1080p Full HD, 720p o MP3) y descárgalo a tu galería o archivos.',
    previewTitle: 'Vista previa del contenido',
    formatSelection: 'Formatos de descarga disponibles',
    trimmerTitle: 'Recortar video (Opcional)',
    trimmerStart: 'Inicio',
    trimmerEnd: 'Fin',
    downloadingNotice: 'Preparando y descargando archivo...',
    downloadComplete: '¡Descarga iniciada! Revisa tus descargas.',
    shareTitle: 'Compartir o enviar al móvil',
    qrModalTitle: 'Escanear para descargar en el móvil',
    qrModalDesc: 'Apunta la cámara de tu iPhone o Android a este código QR para descargarlo en tu teléfono.',
    close: 'Cerrar',
    copyLink: 'Copiar enlace directo',
    linkCopied: '¡Enlace copiado al portapapeles!',
    historyTitle: 'Descargas recientes',
    historyEmpty: 'Aún no hay descargas. ¡Pega un enlace arriba para comenzar!',
    clearHistory: 'Borrar historial',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre descargar videos y audio de Twitter/X.',
    supportedDevices: 'Compatible con iPhone iOS, Android, Windows, macOS y Linux',
    freeNoLimits: '100% Gratis · Sin límites · Sin registro',
    footerDisclaimer: 'ViralX es una herramienta independiente y no está afiliada a X Corp. o Twitter.',
    footerSsl: '🔒 Cifrado SSL · ⚡ Túnel CDN de alta velocidad',
    otherTools: 'Otras herramientas',
    languages: 'Idiomas disponibles',
    privacy: 'Política de privacidad',
    terms: 'Términos de servicio',
    dataSaver: 'Ahorro de datos',
    bestQuality: 'Mejor calidad',
    speed: 'Velocidad de descarga',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    systemMode: 'Sistema (Auto)',
  },
  ar: {
    appName: 'ViralX',
    tagline: 'أسرع أداة لتحميل مقاطع إكس وتويتر',
    navHome: 'محمل الفيديو',
    navMp3: 'تويتر إلى MP3',
    navHowToUse: 'كيفية الاستخدام',
    navBlog: 'دليل الاستخدام',
    navHistory: 'المحفوظات',
    badgeLive: 'دعم كامل للبث المباشر والمساحات الصوتية (Spaces)',
    badgeMp3: 'استخراج صوت نقي 320kbps بدون فقدان للجودة',
    heroTitle: 'All-In-One Social Media Downloader',
    heroSubtitle: 'الصق الرابط واحصل على مرادك بجودة عالية وفوراً.',
    heroTitleMp3: 'محول تويتر إلى MP3 ومستخرج الصوت',
    heroSubtitleMp3: 'قم بتحويل أي مقطع فيديو أو مساحة صوتية من تويتر/إكس إلى ملف صوتي MP3 بجودة فائقة 320kbps بسرعة وأمان تام.',
    categoryVideo: 'فيديو ومتحركة (Video)',
    categoryStream: 'بث مباشر (Stream)',
    categorySpaces: 'مساحات صوتية (Spaces)',
    placeholderVideo: 'الصق رابط فيديو إكس (مثال: https://x.com/user/status/...)',
    placeholderStream: 'الصق رابط البث المباشر لإكس (مثال: https://x.com/i/broadcasts/...)',
    placeholderSpaces: 'الصق رابط مساحات إكس الصوتية (مثال: https://x.com/i/spaces/...)',
    redirectNotice: 'تم التعرف على الرابط! جاري التحويل للمنصة المحددة...',
    inputPlaceholder: 'الصق الرابط من إكس (مثال: https://x.com/user/status/...)',
    inputPlaceholderMp3: 'الصق رابط إكس لاستخراج ملف MP3...',
    pasteBtn: 'لصق',
    clearBtn: 'مسح',
    downloadBtn: 'تحميل',
    analyzingBtn: 'جاري الاستخراج...',
    sampleLinksLabel: 'جرّب روابط تجريبية فورية:',
    howItWorksTitle: 'كيف يعمل محمل فيديوهات تويتر؟',
    howItWorksSubtitle: 'تعمل أداتنا على أي متصفح هاتف أو حاسوب دون الحاجة لتثبيت برامج، ويتم حفظ المقاطع مباشرة من خوادم تويتر الأصلية.',
    step1Title: 'نسخ رابط التغريدة',
    step1Desc: 'افتح تطبيق إكس أو تويتر، واضغط على زر "مشاركة" أسفل الفيديو واختر "نسخ الرابط".',
    step2Title: 'لصق الرابط هنا',
    step2Desc: 'اضغط على زر "لصق" في حقل الإدخال بالأعلى لاستخراج روابط التحميل فوراً.',
    step3Title: 'اختر الجودة واحفظ الملف',
    step3Desc: 'اختر الجودة المفضلة (1080p Full HD أو 720p أو MP3) وسيتم تنزيل المقطع إلى جهازك فوراً.',
    previewTitle: 'معاينة الوسائط المستخرجة',
    formatSelection: 'صيغ التحميل المتاحة',
    trimmerTitle: 'قص المقطع (اختياري)',
    trimmerStart: 'البداية',
    trimmerEnd: 'النهاية',
    downloadingNotice: 'جاري تجهيز وتحميل الملف...',
    downloadComplete: 'بدأ التحميل بنجاح! تحقق من مجلد التنزيلات بجهازك.',
    shareTitle: 'مشاركة أو إرسال إلى الجوال',
    qrModalTitle: 'امسح الرمز للتحميل على هاتفك',
    qrModalDesc: 'وجّه كاميرا هاتفك الآيفون أو الأندرويد نحو هذا الرمز لتحميل المقطع مباشرة على هاتفك.',
    close: 'إغلاق',
    copyLink: 'نسخ رابط الوسائط',
    linkCopied: 'تم نسخ الرابط إلى الحافظة!',
    historyTitle: 'سجل التنزيلات الأخيرة',
    historyEmpty: 'لا توجد تنزيلات سابقة. الصق رابطاً بالأعلى للبدء!',
    clearHistory: 'مسح السجل',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'كل ما تحتاج لمعرفته حول تحميل الفيديوهات واستخراج الصوت من تويتر/إكس.',
    supportedDevices: 'متوافق مع جميع أجهزة آيفون، أندرويد، ويندوز، ماك ولينكس',
    freeNoLimits: 'مجاني 100% · بلا حدود · لا يتطلب تسجيل',
    footerDisclaimer: 'ViralX هي أداة مساعدة مستقلة وغير تابعة لشركة X Corp أو Twitter. جميع الوسائط مستضافة على خوادم تويتر CDN العامة.',
    footerSsl: '🔒 تشفير SSL آمن · ⚡ نفق اتصال سريع عبر CDN',
    otherTools: 'أدوات تحميل أخرى',
    languages: 'المواقع الإقليمية واللغات',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    dataSaver: 'توفير البيانات',
    bestQuality: 'أعلى جودة',
    speed: 'سرعة النقل',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    systemMode: 'تلقائي (حسب النظام)',
  },
};
