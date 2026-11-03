import React, { useState } from 'react';
import { Brain, Sparkles, Moon, Sun, Shield, Eye, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface Archetype {
  id: 'self' | 'shadow' | 'persona' | 'anima';
  title: string;
  subtitle: string;
  concept: string;
  color: string;
  textColor: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  mission: string;
  unconsciousKey: string;
  psychologicalImpact: string;
}

const archetypes: Record<string, Archetype> = {
  self: {
    id: 'self',
    title: 'خویشتن (The Self)',
    subtitle: 'مرکزیت روان و تمامیت وجود',
    concept: 'کهن‌الگوی نظم کیهانی درون، وحدت روان و هماهنگی میان خودآگاه و ناخودآگاه فردی.',
    color: 'from-amber-400 to-yellow-500',
    textColor: 'text-amber-300',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    borderColor: 'border-amber-400/50',
    bgGradient: 'from-amber-500/20 to-yellow-600/10',
    mission: 'فردیت‌یابی (Individuation) و یکپارچه‌سازی تمام ابعاد متضاد درونی انسان.',
    unconsciousKey: 'هسته الهی و قطب‌نمای درونی سرنوشت',
    psychologicalImpact: 'دستیابی به آرامش ژرف، هدفمندی بنیادین و هماهنگی کامل احساس و منطق.'
  },
  shadow: {
    id: 'shadow',
    title: 'سایه (The Shadow)',
    subtitle: 'اعماق ناخودآگاه و پتانسیل‌های پنهان',
    concept: 'بخش‌های واپس‌رانده‌شده روان که مخزن انرژی خام، شور زندگی و خلاقیت سرکوب‌شده هستند.',
    color: 'from-violet-500 to-indigo-600',
    textColor: 'text-violet-300',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    borderColor: 'border-violet-400/50',
    bgGradient: 'from-violet-500/20 to-purple-900/10',
    mission: 'روبرو شدن با سایه‌ها و تبدیل نقاط تاریک به قدرتمندترین منابع قدرت روانی.',
    unconsciousKey: 'غرایز دست‌نخورده و هوش شهودی ابتدایی',
    psychologicalImpact: 'رهایی از فرافکنی، افزایش صداقت درونی، شهامت رویارویی با حقیقت و خودپذیری.'
  },
  persona: {
    id: 'persona',
    title: 'پرسونا (The Persona)',
    subtitle: 'نقاب اجتماعی و هویت تعاملی',
    concept: 'واسطه هوشمند میان روان فردی و جهان اجتماعی؛ نقاب‌های برازنده‌ای که برای بقا و ارتباط می‌پوشیم.',
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-300',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    borderColor: 'border-cyan-400/50',
    bgGradient: 'from-cyan-500/20 to-blue-900/10',
    mission: 'تطبیق اجتماعی بدون از دست دادن جوهره ناب و اصالت درونی فرد.',
    unconsciousKey: 'سپر دفاعی روان در برابر ضربات محیطی',
    psychologicalImpact: 'ارتباطات اثرگذار، انعطاف رفتاری در نقش‌های مختلف شغلی و محافظت از حریم شخصی.'
  },
  anima: {
    id: 'anima',
    title: 'آنیما / آنیموس (Synergy)',
    subtitle: 'تعادل زنانه و مردانه درون (یانگ و یین)',
    concept: 'پیوند مقدس خرد عاطفی، شهود و پذیرش زنانه (آنیما) با اراده، منطق و کنشگری مردانه (آنیموس).',
    color: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-300',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    borderColor: 'border-emerald-400/50',
    bgGradient: 'from-emerald-500/20 to-teal-900/10',
    mission: 'هم‌آفرینی عقل و احساس برای زایش ایده‌های نوآورانه و روابط بالنده.',
    unconsciousKey: 'پل ارتباطی روان به سمت مکاشفه روحی',
    psychologicalImpact: 'روابط عاطفی متعادل و بالغ، غنای هنری، عمق ادراک و اراده استوار.'
  }
};

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onSkipToQuestions: () => void;
  showToast: (msg: string) => void;
}

export const PsychologySlide: React.FC<Props> = ({
  onNext,
  onPrev,
  onSkipToQuestions,
  showToast
}) => {
  const [selectedArch, setSelectedArch] = useState<'self' | 'shadow' | 'persona' | 'anima'>('self');
  const activeData = archetypes[selectedArch];

  return (
    <div className="w-full h-full shrink-0 flex flex-col justify-between text-right animate-fade-in relative overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-2.5 bg-[#03070E]/95 min-h-0 select-none">
      
      {/* Ambient Archetypal Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: activeData.glowColor }}
      />

      {/* =================================================================== */}
      {/* TOP BAR: بازگشت به مزاج‌شناسی + رد کردن + زبان                        */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between z-20 pt-0.5 pb-0.5 shrink-0">
        <button
          onClick={onPrev}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-1 font-medium flex items-center gap-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
          <span>مزاج‌شناسی</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onSkipToQuestions}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5 font-medium"
          >
            رد کردن
          </button>
          <button
            onClick={() => showToast('زبان فارسی فعال است')}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-slate-700/80 bg-white/5 hover:bg-white/10 text-slate-200 transition cursor-pointer flex items-center gap-1 backdrop-blur-md shadow-sm"
          >
            <span>English</span>
            <span className="text-[12px]">🌐</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SLIDE HEADER & KICKER                                               */}
      {/* =================================================================== */}
      <div className="text-center space-y-0.5 shrink-0 z-10">
        <span className="text-[9.5px] sm:text-[10.5px] font-mono font-bold text-cyan-400/90 tracking-wide block">
          اسلاید چهارم · روانشناسی یونگی و خودآگاهی
        </span>
        <h2 className="text-sm sm:text-base font-extrabold text-white font-serif tracking-tight drop-shadow-sm">
          کهن‌الگوها و قلمروهای روان‌شناختی
        </h2>
      </div>

      {/* =================================================================== */}
      {/* CENTER: HIGH-PRECISION DYNAMIC ARCHETYPE VISUALIZATION (روانشناسی) */}
      {/* =================================================================== */}
      <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-center my-0.5 z-10">
        
        {/* Archetype Hero Canvas / Emblem */}
        <div className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] flex items-center justify-center">
          
          {/* Subtle Outer Rotating Celestial Geometry Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/15 pointer-events-none animate-cosmic-spin" />
          <div className="absolute inset-3 rounded-full border border-white/[0.05] pointer-events-none" />

          {/* 1. VISUAL: THE SELF (ماندالای خویشتن و آگاهی زرین) */}
          {selectedArch === 'self' && (
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                {/* Outer Golden Concentric Lotus Geometry */}
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
                <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="1.2" strokeDasharray="4 3" className="animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* 8-pointed star of Consciousness */}
                <g className="animate-pulse" style={{ animationDuration: '4s' }}>
                  <polygon points="100,20 120,80 180,100 120,120 100,180 80,120 20,100 80,80" fill="rgba(245,158,11,0.12)" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" />
                  <polygon points="100,35 115,85 165,100 115,115 100,165 85,115 35,100 85,85" fill="none" stroke="rgba(217,119,6,0.5)" strokeWidth="1" transform="rotate(45 100 100)" />
                </g>

                {/* Central Meditating Head Silhouette with Neural Node */}
                <path d="M100 60 C88 60 78 70 78 82 C78 92 84 98 88 104 C90 107 90 112 85 116 C78 122 70 132 70 144 L130 144 C130 132 122 122 115 116 C110 112 110 107 112 104 C116 98 122 92 122 82 C122 70 112 60 100 60 Z" fill="rgba(6,18,30,0.85)" stroke="rgba(251,191,36,0.8)" strokeWidth="1.5" />

                {/* Third Eye / Pineal Golden Sun Burst */}
                <circle cx="100" cy="80" r="7" fill="url(#goldGrad)" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="100" cy="80" r="5" fill="#FDE047" />

                {/* Synapse Star Connections */}
                <line x1="100" y1="80" x2="85" y2="70" stroke="#FDE047" strokeWidth="1" opacity="0.8" />
                <line x1="100" y1="80" x2="115" y2="70" stroke="#FDE047" strokeWidth="1" opacity="0.8" />
                <line x1="100" y1="80" x2="100" y2="65" stroke="#FDE047" strokeWidth="1" opacity="0.8" />

                <defs>
                  <radialGradient id="goldGrad">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#D97706" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* 2. VISUAL: THE SHADOW (سایه و اعماق ناشناخته روانی) */}
          {selectedArch === 'shadow' && (
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
                {/* Obsidian Eclipse Dark Core */}
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
                
                {/* Swirling Subconscious Violet Nebulae */}
                <circle cx="100" cy="100" r="68" fill="rgba(88,28,135,0.2)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '3s' }} />
                
                {/* Eclipse Corona Crescent */}
                <path d="M60 100 A40 40 0 0 0 140 100 A44 44 0 0 1 60 100 Z" fill="rgba(168,85,247,0.7)" filter="blur(1px)" />

                {/* Shadow Face Contour Emerging from Mystery */}
                <path d="M100 55 C82 55 70 70 70 90 C70 105 78 115 84 122 C88 126 88 132 82 138 C75 144 65 152 65 160 L135 160 C135 152 125 144 118 138 C112 132 112 126 116 122 C122 115 130 105 130 90 C130 70 118 55 100 55 Z" fill="rgba(8,12,24,0.92)" stroke="rgba(192,132,252,0.75)" strokeWidth="1.5" />

                {/* Glowing Eye of Instinct */}
                <path d="M85 92 Q93 84 101 92 Q93 100 85 92 Z" fill="none" stroke="#C084FC" strokeWidth="1.5" />
                <circle cx="93" cy="92" r="2.5" fill="#E9D5FF" />

                <path d="M107 92 Q115 84 123 92 Q115 100 107 92 Z" fill="none" stroke="#C084FC" strokeWidth="1.5" />
                <circle cx="115" cy="92" r="2.5" fill="#E9D5FF" />
              </svg>
            </div>
          )}

          {/* 3. VISUAL: THE PERSONA (نقاب بلورین هویت اجتماعی) */}
          {selectedArch === 'persona' && (
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                {/* Celestial Dial & Facets */}
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="1" />
                <polygon points="100,28 172,100 100,172 28,100" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1.2" />

                {/* Venetian Celestial Mask of Identity */}
                <path d="M45 80 C45 65 60 55 100 55 C140 55 155 65 155 80 C155 102 135 125 100 135 C65 125 45 102 45 80 Z" fill="rgba(8,24,40,0.85)" stroke="rgba(56,189,248,0.85)" strokeWidth="1.8" />

                {/* Almond-shaped Eyes of the Mask */}
                <path d="M62 82 Q76 72 90 82 Q76 92 62 82 Z" fill="rgba(2,12,20,0.9)" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="76" cy="82" r="2.5" fill="#A5F3FC" />

                <path d="M110 82 Q124 72 138 82 Q124 92 110 82 Z" fill="rgba(2,12,20,0.9)" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="124" cy="82" r="2.5" fill="#A5F3FC" />

                {/* Golden Crown Ornament on Forehead */}
                <path d="M100 55 L93 68 L100 64 L107 68 Z" fill="#FBBF24" />
                <circle cx="100" cy="62" r="2" fill="#FEF08A" />
              </svg>
            </div>
          )}

          {/* 4. VISUAL: ANIMA & ANIMUS (تعادل پیوند خرد زنانه و اراده مردانه) */}
          {selectedArch === 'anima' && (
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(16,185,129,0.55)]">
                {/* Yin-Yang / Synergy Orbital Circle */}
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />

                {/* Twin Cosmic Vortex (Solar Gold & Lunar Teal Spirals) */}
                <path d="M100 30 A70 70 0 0 1 100 170 A35 35 0 0 0 100 100 A35 35 0 0 1 100 30 Z" fill="rgba(16,185,129,0.25)" stroke="#34D399" strokeWidth="1.5" />
                <path d="M100 30 A70 70 0 0 0 100 170 A35 35 0 0 1 100 100 A35 35 0 0 0 100 30 Z" fill="rgba(245,158,11,0.2)" stroke="#FBBF24" strokeWidth="1.5" />

                {/* Golden Sun & Teal Moon Nodes */}
                <circle cx="100" cy="65" r="9" fill="#34D399" className="animate-pulse" style={{ animationDuration: '3s' }} />
                <circle cx="100" cy="65" r="4" fill="#042F2E" />

                <circle cx="100" cy="135" r="9" fill="#FBBF24" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
                <circle cx="100" cy="135" r="4" fill="#451A03" />

                {/* Central Diamond Harmonizer */}
                <polygon points="100,92 108,100 100,108 92,100" fill="#E2F0FD" />
              </svg>
            </div>
          )}

        </div>

        {/* Selected Archetype Active Title Badge */}
        <div className="mt-1 text-center">
          <h3 className={`text-xs sm:text-sm font-bold font-serif ${activeData.textColor} drop-shadow-sm flex items-center justify-center gap-1.5`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeData.title}</span>
          </h3>
          <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 font-medium">
            {activeData.subtitle}
          </p>
        </div>

      </div>

      {/* =================================================================== */}
      {/* PSYCHOLOGY INSIGHTS CARD (توضیحات کوتاه و پرمغز خودآگاهی)           */}
      {/* =================================================================== */}
      <div className="p-2 sm:p-2.5 rounded-xl border border-white/10 bg-[#06111C]/90 backdrop-blur-md space-y-1 shrink-0 z-10 text-[9.5px] sm:text-[10px]">
        
        {/* Core concept line */}
        <p className="text-slate-200 leading-snug font-medium border-b border-white/[0.08] pb-1">
          {activeData.concept}
        </p>

        {/* 2-Column Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="space-y-0.5">
            <span className="text-cyan-400 font-bold block flex items-center gap-1">
              <Eye className="w-2.5 h-2.5" />
              <span>رسالت در خودآگاهی:</span>
            </span>
            <span className="text-slate-300 leading-tight block">
              {activeData.mission}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-amber-300 font-bold block flex items-center gap-1">
              <Compass className="w-2.5 h-2.5" />
              <span>دستاورد توسعه فردی:</span>
            </span>
            <span className="text-slate-300 leading-tight block">
              {activeData.psychologicalImpact}
            </span>
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* 4 ARCHETYPE TABS & ONBOARDING PAGINATION                            */}
      {/* =================================================================== */}
      <div className="space-y-1.5 sm:space-y-2 pt-1 pb-1 z-20 text-center shrink-0">
        
        {/* 4 Archetype selector buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {(['self', 'shadow', 'persona', 'anima'] as const).map((archKey) => {
            const item = archetypes[archKey];
            const isSelected = selectedArch === archKey;
            return (
              <button
                key={archKey}
                onClick={() => {
                  setSelectedArch(archKey);
                  showToast(item.title);
                }}
                className={`py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? `bg-white/10 ${item.textColor} shadow-sm font-extrabold border ${item.borderColor}` 
                    : 'bg-transparent text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                <span>{item.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 5 Dots indicator for onboarding (Page 4 of 5 active) */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-7 h-1.5 rounded-full bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.7)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
        </div>

        {/* Golden Proceed to Synergy Button */}
        <button
          onClick={onNext}
          className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-[20px] bg-[#E5A93C] hover:bg-[#D69A30] active:scale-[0.98] text-[#1A1104] font-extrabold text-sm sm:text-base transition-all duration-200 shadow-[0_4px_20px_rgba(229,169,60,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>ادامه به ترکیب سه‌گانه علوم</span>
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

    </div>
  );
};
