import React from 'react';

interface ArmanveinLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const ArmanveinLogo: React.FC<ArmanveinLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-sm', subText: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-base', subText: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', subText: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', subText: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} dir="rtl">
      {/* Sacred Geometry Lotus / Crystal Flower Emblem matching the authentic Armanvein logo */}
      <div className={`relative ${currentSize.icon} shrink-0 rounded-full flex items-center justify-center p-1 bg-gradient-to-b from-[#0e2a27] via-[#071917] to-[#040e0d] border border-amber-300/40 shadow-[0_0_16px_rgba(45,212,191,0.25)]`}>
        {/* Subtle Outer Golden Ring */}
        <div className="absolute inset-0 rounded-full border border-amber-400/30"></div>

        {/* Lotus Petal Sacred Vector */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer golden halo arcs */}
          <circle cx="50" cy="50" r="46" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="42" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.5" />

          {/* Central Lotus Flower Petals */}
          {/* Left Petal */}
          <path
            d="M50 82 C34 70 24 50 30 34 C36 44 44 54 50 82 Z"
            fill="url(#petallEft)"
            stroke="#5eead4"
            strokeWidth="1.2"
          />
          {/* Right Petal */}
          <path
            d="M50 82 C66 70 76 50 70 34 C64 44 56 54 50 82 Z"
            fill="url(#petalRight)"
            stroke="#5eead4"
            strokeWidth="1.2"
          />
          {/* Inner Left Petal */}
          <path
            d="M50 80 C40 66 34 46 42 26 C46 38 48 52 50 80 Z"
            fill="url(#petalMidLeft)"
            stroke="#6ee7b7"
            strokeWidth="1.2"
          />
          {/* Inner Right Petal */}
          <path
            d="M50 80 C60 66 66 46 58 26 C54 38 52 52 50 80 Z"
            fill="url(#petalMidRight)"
            stroke="#6ee7b7"
            strokeWidth="1.2"
          />
          {/* Center Tall Lotus Petal */}
          <path
            d="M50 82 C44 58 43 32 50 14 C57 32 56 58 50 82 Z"
            fill="url(#petalCenter)"
            stroke="#fde047"
            strokeWidth="1.4"
          />

          {/* Center Sacred Spark / Heart Drop */}
          <circle cx="50" cy="52" r="3.5" fill="#fef08a" />
          <circle cx="50" cy="52" r="6" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.8" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="petalCenter" x1="50" y1="14" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.4" stopColor="#34d399" />
              <stop offset="1" stopColor="#065f46" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="petalMidLeft" x1="38" y1="26" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a7f3d0" />
              <stop offset="0.5" stopColor="#10b981" />
              <stop offset="1" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="petalMidRight" x1="62" y1="26" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a7f3d0" />
              <stop offset="0.5" stopColor="#10b981" />
              <stop offset="1" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="petalLeft" x1="26" y1="34" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5eead4" />
              <stop offset="0.6" stopColor="#0d9488" />
              <stop offset="1" stopColor="#134e4a" />
            </linearGradient>
            <linearGradient id="petalRight" x1="74" y1="34" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5eead4" />
              <stop offset="0.6" stopColor="#0d9488" />
              <stop offset="1" stopColor="#134e4a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <span className={`font-black tracking-tight text-white ${currentSize.text} leading-tight font-serif`}>
            آرمانوین
          </span>
          <span className={`text-emerald-400/80 font-light ${currentSize.subText} tracking-wide`}>
            سه زاویهٔ شناخت انسان
          </span>
        </div>
      )}
    </div>
  );
};
