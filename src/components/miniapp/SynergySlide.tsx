import React, { useState } from 'react';
import { 
  Sparkles, Compass, Flame, Brain, ChevronLeft, ChevronRight, 
  ArrowLeft, Check, ShieldCheck, Zap, Orbit, Award, Layers
} from 'lucide-react';

interface SynergySlideProps {
  onEnterArmanvein: () => void;
  onPrev: () => void;
  onSkipToQuestions?: () => void;
  showToast: (msg: string) => void;
}

export const SynergySlide: React.FC<SynergySlideProps> = ({
  onEnterArmanvein,
  onPrev,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'astro_temp' | 'temp_psych' | 'psych_astro'>('all');

  const synergies = {
    all: {
      title: 'وحدت بنیادین ۳ علم در آرمانوین',
      tag: 'همگرایی کامل',
      description: 'آرمانوین با پیوند دادن هندسه کیهانی، فیزیولوژی اخلاطی و عمق روانشناسی، یک نقشه ۳ بعدی کامل و بی‌نقص برای خودآگاهی و توسعه فردی خلق کرده است.',
      color: 'from-amber-400 via-emerald-400 to-cyan-400',
      badgeColor: 'border-amber-400/50 bg-amber-950/60 text-amber-300'
    },
    astro_temp: {
      title: 'پیوند استرولوژی و مزاج‌شناسی',
      tag: 'کیهان + بیولوژی',
      description: 'کواکب و بروج بر گرمی، سردی، خشکی و تری بدن تأثیر می‌گذارند. تطبیق زایچه با طبع، ساعت زیستی بدن و رژیم تغذیه اختصاصی را به تعادل می‌رساند.',
      color: 'from-amber-400 to-emerald-400',
      badgeColor: 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300'
    },
    temp_psych: {
      title: 'پیوند مزاج‌شناسی و روانشناسی',
      tag: 'بیولوژی + روان',
      description: 'هر غلبه مزاج بر خلق‌وخو، ادراک حسی و رفتارهای ناخودآگاه سایه می‌اندازد. تعادل اخلاط، بسترساز آرامش روان و انگیزه پایدار است.',
      color: 'from-emerald-400 to-cyan-400',
      badgeColor: 'border-cyan-400/50 bg-cyan-950/60 text-cyan-300'
    },
    psych_astro: {
      title: 'پیوند روانشناسی و استرولوژی',
      tag: 'روان + کیهان',
      description: 'سیارات در حقیقت تجلی کهن‌الگوهای ناخودآگاه جمعی (یونگ) در آسمان هستند. چارت زایچه نقشه زمان‌بندی بیداری سایه‌ها و رسالت روحی فرد است.',
      color: 'from-cyan-400 to-purple-400',
      badgeColor: 'border-purple-400/50 bg-purple-950/60 text-purple-300'
    }
  };

  const currentInfo = synergies[activeTab];

  return (
    <div className="w-full h-full shrink-0 flex flex-col justify-between text-right animate-fade-in relative overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-3 bg-[#030910]/95 min-h-0">
      
      {/* Background Celestial Glowing Trinity Auras */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-b from-amber-500/10 via-emerald-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

      {/* =================================================================== */}
      {/* TOP BAR: بازگشت به روانشناسی + نشان آرمانوین                          */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between z-20 pt-0.5 pb-1 shrink-0">
        <button
          onClick={onPrev}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5 font-medium flex items-center gap-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
          <span>روانشناسی</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-amber-400/40 bg-amber-950/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>معماری سه‌گانه تحول</span>
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CENTER: ANIMATED SACRED TRINITY VISUAL (TRIQUETRA MATRIX)            */}
      {/* =================================================================== */}
      <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-center my-0 z-10 overflow-hidden">
        
        {/* Sacred Geometry 3-Pillar Triangle Container */}
        <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center select-none">
          
          {/* Animated SVG Connecting Triangular Flow Rays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 250">
            <defs>
              <linearGradient id="grad-gold-emerald" x1="50%" y1="10%" x2="15%" y2="85%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-emerald-cyan" x1="15%" y1="85%" x2="85%" y2="85%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-cyan-gold" x1="85%" y1="85%" x2="50%" y2="10%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Triangular Outer Orbit Rings */}
            <circle cx="140" cy="130" r="105" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '40s' }} />
            <circle cx="140" cy="130" r="75" fill="none" stroke="rgba(56,189,248,0.12)" strokeWidth="1" />

            {/* Glowing Connecting Triangles */}
            <polygon 
              points="140,25 35,210 245,210" 
              fill="rgba(5, 20, 28, 0.4)" 
              stroke="url(#grad-gold-emerald)" 
              strokeWidth="2"
              strokeDasharray="6 4"
              className="animate-pulse"
            />

            {/* Energy Lines to Center */}
            <line x1="140" y1="35" x2="140" y2="130" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
            <line x1="45" y1="200" x2="140" y2="130" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
            <line x1="235" y1="200" x2="140" y2="130" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
          </svg>

          {/* 1. TOP APEX: ASTROLOGY (استرولوژی) */}
          <div 
            onClick={() => {
              setActiveTab('psych_astro');
              showToast('استرولوژی: هندسه آسمانی و نقشه زمان');
            }}
            className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 active:scale-95 z-20"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#1E1608] to-[#0A0702] border-2 border-amber-400/70 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center relative">
              <div className="w-full h-full rounded-xl bg-amber-950/40 flex items-center justify-center">
                <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-amber-300 font-serif mt-1 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]">
              استرولوژی
            </span>
            <span className="text-[8px] font-mono text-amber-400/80 -mt-0.5">زمان و تقدیر</span>
          </div>

          {/* 2. BOTTOM RIGHT APEX: TEMPERAMENT (مزاج‌شناسی) */}
          <div 
            onClick={() => {
              setActiveTab('astro_temp');
              showToast('مزاج‌شناسی: طبایع چهارگانه و تعادل زیستی');
            }}
            className="absolute bottom-2 right-2 sm:right-3 flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 active:scale-95 z-20"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#091E13] to-[#030A06] border-2 border-emerald-400/70 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center relative">
              <div className="w-full h-full rounded-xl bg-emerald-950/40 flex items-center justify-center">
                <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-300 font-serif mt-1 drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)]">
              مزاج‌شناسی
            </span>
            <span className="text-[8px] font-mono text-emerald-400/80 -mt-0.5">بدن و زیست</span>
          </div>

          {/* 3. BOTTOM LEFT APEX: PSYCHOLOGY (روانشناسی) */}
          <div 
            onClick={() => {
              setActiveTab('temp_psych');
              showToast('روانشناسی: کهن‌الگوها و اعماق ناخودآگاه');
            }}
            className="absolute bottom-2 left-2 sm:left-3 flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 active:scale-95 z-20"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#061B24] to-[#020A0E] border-2 border-cyan-400/70 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center relative">
              <div className="w-full h-full rounded-xl bg-cyan-950/40 flex items-center justify-center">
                <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-cyan-300 font-serif mt-1 drop-shadow-[0_2px_8px_rgba(6,182,212,0.6)]">
              روانشناسی
            </span>
            <span className="text-[8px] font-mono text-cyan-400/80 -mt-0.5">روان و ناخودآگاه</span>
          </div>

          {/* CENTRAL CORE: ARMANVEIN (آرمانوین - وحدت کامل) */}
          <div 
            onClick={() => {
              setActiveTab('all');
              showToast('آرمانوین: تلاقی هوشمند ۳ علم');
            }}
            className="absolute top-[130px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 z-30"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
              <div className="w-full h-full rounded-full bg-[#050D15] flex flex-col items-center justify-center p-1 text-center">
                <picture className="w-7 h-7">
                  <source srcSet="/assets/aistudio/armanvein_logo_optimized.webp" type="image/webp" />
                  <img src="/assets/aistudio/__________cfb5adf4.png" alt="لوگو" className="w-full h-full object-contain" />
                </picture>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-amber-300 font-serif mt-1 drop-shadow-md">
              آرمانوین
            </span>
          </div>

        </div>

        {/* Dynamic Synergy Info Card */}
        <div className="w-full max-w-[380px] mx-auto mt-2 p-2 sm:p-2.5 rounded-2xl bg-[#071524]/90 border border-white/10 backdrop-blur-xl shadow-lg relative text-right">
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/5">
            <h4 className="text-xs sm:text-[13px] font-bold text-white flex items-center gap-1.5 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentInfo.title}</span>
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${currentInfo.badgeColor} font-mono`}>
              {currentInfo.tag}
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed">
            {currentInfo.description}
          </p>

          {/* Quick interactive synergy tabs */}
          <div className="grid grid-cols-4 gap-1 mt-2 pt-1 border-t border-white/5">
            {[
              { id: 'all', label: 'ترکیب کامل' },
              { id: 'astro_temp', label: 'کیهان+طبع' },
              { id: 'temp_psych', label: 'طبع+روان' },
              { id: 'psych_astro', label: 'روان+کیهان' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1 rounded-lg text-[9px] font-bold transition cursor-pointer text-center ${
                  activeTab === tab.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* BOTTOM SECTION: 5-DOT PAGINATION & PROMINENT «ورود به آرمانوین» BUTTON */}
      {/* =================================================================== */}
      <div className="space-y-1.5 sm:space-y-2 pt-1 pb-1 z-20 text-center shrink-0">
        
        {/* 5 Dots indicator for onboarding (Page 5 of 5 active) */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-7 h-1.5 rounded-full bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.7)]" />
        </div>

        {/* Enter Armanvein Button */}
        <button
          onClick={onEnterArmanvein}
          className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-[20px] bg-gradient-to-r from-[#F59E0B] via-[#E5A93C] to-[#D97706] hover:from-[#FBBF24] hover:to-[#B45309] active:scale-[0.98] text-[#120B02] font-extrabold text-sm sm:text-base transition-all duration-200 shadow-[0_4px_25px_rgba(245,158,11,0.5)] cursor-pointer flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#120B02] group-hover:rotate-12 transition-transform" />
          <span>ورود به آرمانوین</span>
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#120B02] group-hover:-translate-x-0.5 transition-transform" />
        </button>

      </div>

    </div>
  );
};
