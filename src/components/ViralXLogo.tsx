import React from 'react';

interface ViralXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ViralXLogo: React.FC<ViralXLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
  }[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden shadow-xs ring-1 ring-black/10 dark:ring-white/10 group-hover:scale-105 transition-transform ${sizeClasses} ${className}`}
    >
      <img
        src="/assets/viralx_logo.jpg"
        alt="ViralX Logo"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
};
