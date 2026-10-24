import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Compass } from 'lucide-react';

interface StylishBackButtonProps {
  onBack?: () => void;
  label?: string;
  subLabel?: string;
  isInsideView?: boolean;
  className?: string;
}

export const StylishBackButton: React.FC<StylishBackButtonProps> = ({
  onBack,
  label = 'بازگشت به مینی‌دوره‌ها',
  subLabel = 'مشاهده همه دوره‌ها',
  isInsideView = false,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      setShowScrollTop(winScroll > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. INLINE STYLISH BACK BUTTON - Strictly rendered at the top of detail pages */}
      {isInsideView && onBack && (
        <div className={`flex items-center justify-between gap-4 py-2 select-none ${className}`} dir="rtl">
          <button
            onClick={onBack}
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#071718] via-[#091e1d] to-[#040e0f] border border-teal-500/40 hover:border-teal-400 text-slate-200 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.18)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:-translate-x-1 cursor-pointer"
          >
            {/* Glowing Aura Ring */}
            <span className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-400/40 flex items-center justify-center text-teal-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <ArrowRight className="w-4 h-4 text-teal-300 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>

            <div className="flex flex-col text-right">
              <span className="text-xs sm:text-[13px] font-bold text-white group-hover:text-teal-200 transition-colors">
                {label}
              </span>
              <span className="text-[10px] text-teal-400/70 font-light">
                {subLabel}
              </span>
            </div>

            {/* Subtle Glint Accent */}
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
          </button>
        </div>
      )}

      {/* Floating Scroll To Top Button Only (NO floating back button, as requested: 'دکمه بازگشت فقط بالا باشه') */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40 select-none flex flex-col items-end pointer-events-auto" dir="rtl">
          <button
            onClick={handleScrollToTop}
            className="group relative w-11 h-11 rounded-full bg-[#040c0e]/95 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 text-slate-200 hover:text-white flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110 cursor-pointer"
            title="رفتن به بالای صفحه"
            aria-label="رفتن به بالا"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-emerald-950/40 fill-none"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={113}
                strokeDashoffset={113 - (113 * scrollProgress) / 100}
                strokeLinecap="round"
                className="text-emerald-400 fill-none transition-all duration-150"
              />
            </svg>

            <ArrowUp className="w-4 h-4 text-emerald-300 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </>
  );
};
