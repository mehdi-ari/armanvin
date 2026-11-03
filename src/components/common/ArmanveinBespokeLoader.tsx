import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface ArmanveinBespokeLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
  forceShow?: boolean;
  onClose?: () => void;
}

export const ArmanveinBespokeLoader: React.FC<ArmanveinBespokeLoaderProps> = ({
  onLoaded,
  minDurationMs = 1500,
  forceShow = false,
  onClose,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('آغاز بارگذاری پلتفرم آرمانوین...');
  const [subStatus, setSubStatus] = useState('سه زاویهٔ شناخت: روان‌شناسی، مزاج‌شناسی، آسترولوژی');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDurationMs) * 100), 100);
      setProgress(pct);

      if (pct < 25) {
        setStatusMessage('فراخوانی هندسه کهکشانی و هویت آرمانوین...');
        setSubStatus('سه زاویهٔ شناخت: روان‌شناسی، مزاج‌شناسی، آسترولوژی');
      } else if (pct < 50) {
        setStatusMessage('همگام‌سازی مینی‌دوره‌ها و مسیرهای رشد فردی...');
        setSubStatus('بارگذاری ساختار پرونده شخصی و جلسات آموزشی');
      } else if (pct < 75) {
        setStatusMessage('تنظیم ارتعاشات کیهانی و رابط بصری...');
        setSubStatus('فعال‌سازی نشان‌های زرین و پالت زمردین');
      } else if (pct < 98) {
        setStatusMessage('تکمیل همگام‌سازی داده‌ها...');
        setSubStatus('آماده‌سازی تجربه کاربری ممتاز');
      } else {
        setStatusMessage('خوش آمدید — سامانه آماده است');
        setSubStatus('ورود به آرمانوین');
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            onLoaded?.();
            onClose?.();
          }, 450);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onLoaded, onClose]);

  if (isDone && !forceShow) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020506] text-slate-100 transition-opacity duration-500 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      dir="rtl"
    >
      {/* Background Sacred Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-[120px] animate-pulse delay-500" />
        {/* Sacred Geometry Star Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a615_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* BESPOKE SACRED LOTUS EMBLEM WITH DYNAMIC RINGS */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          
          {/* Outer Golden Dotted Orbit */}
          <div className="absolute inset-0 rounded-full border border-amber-400/30 border-dashed animate-[spin_18s_linear_infinite]" />

          {/* Glowing Emerald Arc Ring */}
          <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-teal-400 border-l-emerald-300 animate-[spin_2.5s_linear_infinite] shadow-[0_0_25px_rgba(20,184,166,0.4)]" />

          {/* Counter-Spinning Golden Ring */}
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-amber-300 border-r-amber-500/80 animate-[spin_3.5s_linear_infinite_reverse]" />

          {/* Third Pulsing Geometric Ring */}
          <div className="absolute inset-7 rounded-full border border-teal-400/40 animate-pulse" />

          {/* Central Sacred Lotus Emblem */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#0f2e2a] via-[#071917] to-[#040e0d] border border-amber-300/60 p-2 shadow-[0_0_30px_rgba(45,212,191,0.5),inset_0_0_20px_rgba(45,212,191,0.3)] flex items-center justify-center animate-pulse">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="44" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="40" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.5" />

              {/* Lotus Petals */}
              <path
                d="M50 82 C34 70 24 50 30 34 C36 44 44 54 50 82 Z"
                fill="#2dd4bf"
                fillOpacity="0.85"
                stroke="#5eead4"
                strokeWidth="1.2"
              />
              <path
                d="M50 82 C66 70 76 50 70 34 C64 44 56 54 50 82 Z"
                fill="#2dd4bf"
                fillOpacity="0.85"
                stroke="#5eead4"
                strokeWidth="1.2"
              />
              <path
                d="M50 80 C40 66 34 46 42 26 C46 38 48 52 50 80 Z"
                fill="#34d399"
                fillOpacity="0.9"
                stroke="#6ee7b7"
                strokeWidth="1.2"
              />
              <path
                d="M50 80 C60 66 66 46 58 26 C54 38 52 52 50 80 Z"
                fill="#34d399"
                fillOpacity="0.9"
                stroke="#6ee7b7"
                strokeWidth="1.2"
              />
              <path
                d="M50 82 C44 58 43 32 50 14 C57 32 56 58 50 82 Z"
                fill="#fde047"
                stroke="#fef08a"
                strokeWidth="1.4"
              />
              <circle cx="50" cy="52" r="3.5" fill="#ffffff" />
            </svg>
          </div>

          {/* Sparkling Orbit Particle */}
          <div className="absolute -top-1 right-7 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fde047] animate-ping" />
        </div>

        {/* Brand Name & Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061414] border border-teal-500/40 text-teal-300 text-xs font-medium mb-3 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>سامانه جامع آرمانوین</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1 font-serif drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
          آرمانوین
        </h1>
        <p className="text-xs text-teal-200/80 font-light mb-6 tracking-wide">
          سه زاویهٔ شناخت: روانشناسی، مزاج‌شناسی و آسترولوژی
        </p>

        {/* Golden & Teal Progress Bar with Glowing Head */}
        <div className="w-full bg-[#040e0f] rounded-full h-2.5 p-0.5 border border-teal-900/80 shadow-inner mb-3.5 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-300 transition-all duration-100 relative shadow-[0_0_16px_rgba(20,184,166,0.8)]"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing Particle Head */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
          </div>
        </div>

        {/* Live Status Telemetry & Percentage */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="text-teal-200 font-medium truncate max-w-[280px] text-right">
            {statusMessage}
          </span>
          <span className="text-amber-300 font-mono font-bold text-sm">{progress}%</span>
        </div>

        <div className="text-[11px] text-slate-500 font-light text-right w-full font-sans">
          {subStatus}
        </div>

        {/* Skip / Enter Button for Convenience */}
        <button
          onClick={() => {
            setIsDone(true);
            onLoaded?.();
            onClose?.();
          }}
          className="mt-8 text-[11px] text-slate-500 hover:text-teal-300 transition cursor-pointer underline underline-offset-4"
        >
          رد کردن انیمیشن و ورود فوری
        </button>

      </div>
    </div>
  );
};
