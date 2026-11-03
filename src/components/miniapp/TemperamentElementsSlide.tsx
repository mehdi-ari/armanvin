import React, { useState } from 'react';
import { Flame, Wind, Droplets, Mountain, ChevronLeft, ChevronRight } from 'lucide-react';

interface ElementItem {
  id: 'fire' | 'air' | 'water' | 'earth';
  name: string;
  humor: string;
  nature: string;
  textColor: string;
  glowColor: string;
  imageSrc: string;
}

const elements: Record<string, ElementItem> = {
  fire: {
    id: 'fire',
    name: 'آتش',
    humor: 'صفرا',
    nature: 'گرم و خشک',
    textColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    imageSrc: '/assets/aistudio/elem_fire_trans.webp'
  },
  air: {
    id: 'air',
    name: 'باد و هوا',
    humor: 'دم',
    nature: 'گرم و تر',
    textColor: 'text-sky-300',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    imageSrc: '/assets/aistudio/elem_air_trans.webp'
  },
  water: {
    id: 'water',
    name: 'آب',
    humor: 'بلغم',
    nature: 'سرد و تر',
    textColor: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    imageSrc: '/assets/aistudio/elem_water_trans.webp'
  },
  earth: {
    id: 'earth',
    name: 'خاک',
    humor: 'سودا',
    nature: 'سرد و خشک',
    textColor: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    imageSrc: '/assets/aistudio/elem_earth_trans.webp'
  }
};

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onSkipToQuestions: () => void;
  showToast: (msg: string) => void;
}

export const TemperamentElementsSlide: React.FC<Props> = ({
  onNext,
  onPrev,
  onSkipToQuestions,
  showToast
}) => {
  const [selectedElement, setSelectedElement] = useState<'fire' | 'air' | 'water' | 'earth'>('fire');
  const activeElem = elements[selectedElement];

  return (
    <div className="w-full h-full shrink-0 flex flex-col justify-between text-right animate-fade-in relative overflow-hidden px-3.5 py-2 sm:px-4 sm:py-3 bg-[#03080F]/95 min-h-0 select-none">
      
      {/* Subtle Ambient Glow for active element */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: activeElem.glowColor }}
      />

      {/* =================================================================== */}
      {/* TOP BAR: بازگشت به منظومه + رد کردن + زبان                         */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between z-20 pt-0.5 pb-1 shrink-0">
        <button
          onClick={onPrev}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-1 font-medium flex items-center gap-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
          <span>منظومه کواکب</span>
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
      {/* SLIDE TITLE & SUBTITLE                                              */}
      {/* =================================================================== */}
      <div className="text-center space-y-0.5 shrink-0 z-10">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-400/90 tracking-wide block">
          اسلاید سوم · مزاج‌شناسی
        </span>
        <h2 className="text-sm sm:text-base font-extrabold text-white font-serif tracking-tight drop-shadow-sm">
          عناصر اربعه در چرخهٔ کیهانی
        </h2>
      </div>

      {/* =================================================================== */}
      {/* CIRCULAR WHEEL: FOUR ELEMENTS (بدون کادر، بدون پس‌زمینه، تصویر کامل) */}
      {/* بدون کادر وسط و بدون دایره خط‌چین                                    */}
      {/* =================================================================== */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center my-0 z-10">
        
        {/* Circular Dial Canvas */}
        <div className="relative w-[300px] h-[300px] sm:w-[330px] sm:h-[330px] flex items-center justify-center">
          
          {/* Super subtle hairline orbit guide (not dashed, fully clean) */}
          <div className="absolute inset-8 rounded-full border border-white/[0.06] pointer-events-none" />

          {/* =============================================================== */}
          {/* 1. TOP ELEMENT: FIRE (آتش) - بدون کادر، تصویر کامل، متحرک       */}
          {/* =============================================================== */}
          <div 
            onClick={() => {
              setSelectedElement('fire');
              showToast('عنصر آتش · صفرا (گرم و خشک)');
            }}
            className={`absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedElement === 'fire' ? 'scale-110 z-30' : 'scale-95 opacity-85 hover:opacity-100 z-20'
            }`}
          >
            <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center">
              {/* Complete Fire Image - transparent background, no box */}
              <img 
                src="/assets/aistudio/elem_fire_trans.webp" 
                alt="آتش"
                className="w-full h-full object-contain pointer-events-none animate-flame-flicker"
                style={{ filter: selectedElement === 'fire' ? 'drop-shadow(0 0 16px rgba(249,115,22,0.85))' : 'drop-shadow(0 0 8px rgba(249,115,22,0.4))' }}
              />

              {/* Rising Sparks / Embers Micro-particles */}
              <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#f59e0b] animate-spark-1 pointer-events-none" />
              <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316] animate-spark-2 pointer-events-none" />
              <div className="absolute bottom-5 right-1/3 w-1 h-1 rounded-full bg-yellow-200 shadow-[0_0_6px_#fef08a] animate-spark-3 pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-1 h-1 rounded-full bg-red-400 shadow-[0_0_6px_#ef4444] animate-spark-4 pointer-events-none" />

              {/* Rising Smoke Wisps from Fire */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-300/20 blur-md animate-smoke-1 pointer-events-none" />
              <div className="absolute top-3 left-1/3 w-8 h-8 rounded-full bg-slate-200/15 blur-md animate-smoke-2 pointer-events-none" />
            </div>

            {/* Clean Floating Text Label - بدون کادر */}
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 -mt-1 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)] flex items-center gap-1 font-serif">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>آتش (صفرا)</span>
            </span>
          </div>

          {/* =============================================================== */}
          {/* 2. RIGHT ELEMENT: AIR (باد و هوا) - بدون کادر، تصویر کامل، متحرک */}
          {/* =============================================================== */}
          <div 
            onClick={() => {
              setSelectedElement('air');
              showToast('عنصر باد و هوا · دم (گرم و تر)');
            }}
            className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedElement === 'air' ? 'scale-110 z-30' : 'scale-95 opacity-85 hover:opacity-100 z-20'
            }`}
          >
            <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center">
              {/* Complete Wind Vortex Image - transparent background, no box */}
              <img 
                src="/assets/aistudio/elem_air_trans.webp" 
                alt="باد و هوا"
                className="w-full h-full object-contain pointer-events-none animate-wind-swirl"
                style={{ filter: selectedElement === 'air' ? 'drop-shadow(0 0 16px rgba(56,189,248,0.85))' : 'drop-shadow(0 0 8px rgba(56,189,248,0.4))' }}
              />

              {/* Rotating Ethereal Wind Stream Rings */}
              <div className="absolute inset-2 rounded-full border border-sky-300/25 border-t-sky-300/70 animate-wind-ring pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-slate-200/20 border-b-slate-200/60 animate-wind-ring-rev pointer-events-none" />
            </div>

            {/* Clean Floating Text Label - بدون کادر */}
            <span className="text-[10px] sm:text-[11px] font-bold text-sky-300 -mt-1 drop-shadow-[0_2px_8px_rgba(56,189,248,0.6)] flex items-center gap-1 font-serif">
              <Wind className="w-3 h-3 text-sky-400" />
              <span>باد (دم)</span>
            </span>
          </div>

          {/* =============================================================== */}
          {/* 3. BOTTOM ELEMENT: WATER (آب) - بدون کادر، تصویر کامل، متحرک    */}
          {/* =============================================================== */}
          <div 
            onClick={() => {
              setSelectedElement('water');
              showToast('عنصر آب · بلغم (سرد و تر)');
            }}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedElement === 'water' ? 'scale-110 z-30' : 'scale-95 opacity-85 hover:opacity-100 z-20'
            }`}
          >
            <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center">
              {/* Complete Ocean Wave Image - transparent background, no box */}
              <img 
                src="/assets/aistudio/elem_water_trans.webp" 
                alt="آب"
                className="w-full h-full object-contain pointer-events-none animate-wave-surge"
                style={{ filter: selectedElement === 'water' ? 'drop-shadow(0 0 16px rgba(6,182,212,0.85))' : 'drop-shadow(0 0 8px rgba(6,182,212,0.4))' }}
              />

              {/* Water Splash Particles */}
              <div className="absolute top-6 right-3 w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_6px_#67e8f9] animate-splash-1 pointer-events-none" />
              <div className="absolute top-8 left-4 w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_6px_#38bdf8] animate-splash-2 pointer-events-none" />
              <div className="absolute top-4 right-6 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-splash-3 pointer-events-none" />
            </div>

            {/* Clean Floating Text Label - بدون کادر */}
            <span className="text-[10px] sm:text-[11px] font-bold text-cyan-300 -mt-1 drop-shadow-[0_2px_8px_rgba(6,182,212,0.6)] flex items-center gap-1 font-serif">
              <Droplets className="w-3 h-3 text-cyan-400" />
              <span>آب (بلغم)</span>
            </span>
          </div>

          {/* =============================================================== */}
          {/* 4. LEFT ELEMENT: EARTH (خاک) - بدون کادر، تصویر کامل، متحرک     */}
          {/* =============================================================== */}
          <div 
            onClick={() => {
              setSelectedElement('earth');
              showToast('عنصر خاک · سودا (سرد و خشک)');
            }}
            className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 cursor-pointer transition-all duration-300 flex flex-col items-center select-none ${
              selectedElement === 'earth' ? 'scale-110 z-30' : 'scale-95 opacity-85 hover:opacity-100 z-20'
            }`}
          >
            <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center">
              {/* Complete Earth Sprout Image - transparent background, no box */}
              <img 
                src="/assets/aistudio/elem_earth_trans.webp" 
                alt="خاک و گیاه"
                className="w-full h-full object-contain pointer-events-none animate-leaves-sway"
                style={{ filter: selectedElement === 'earth' ? 'drop-shadow(0 0 16px rgba(16,185,129,0.85))' : 'drop-shadow(0 0 8px rgba(16,185,129,0.4))' }}
              />

              {/* Floating botanical pollen/leaf particles */}
              <div className="absolute top-7 left-4 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#34d399] animate-pollen-1 pointer-events-none" />
              <div className="absolute top-4 right-5 w-1 h-1 rounded-full bg-lime-300 shadow-[0_0_6px_#a3e635] animate-pollen-2 pointer-events-none" />
              <div className="absolute top-9 right-3 w-1 h-1 rounded-full bg-teal-200 shadow-[0_0_6px_#99f6e4] animate-pollen-3 pointer-events-none" />
            </div>

            {/* Clean Floating Text Label - بدون کادر */}
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-300 -mt-1 drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)] flex items-center gap-1 font-serif">
              <Mountain className="w-3 h-3 text-emerald-400" />
              <span>خاک (سودا)</span>
            </span>
          </div>

          {/* Note: The center has NO box ("کادر وسط نباشه"), keeping it spacious and celestial */}
        </div>

      </div>

      {/* =================================================================== */}
      {/* MINIMAL ACTIVE ELEMENT PILL (بدون هیچ اشاره‌ای به برج‌ها)            */}
      {/* =================================================================== */}
      <div className="text-center py-1 shrink-0 z-10">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-xs font-bold ${activeElem.textColor} drop-shadow-sm`}>
          <span>طبع {activeElem.name}: {activeElem.nature}</span>
          <span className="text-slate-500">·</span>
          <span className="text-[10.5px] text-slate-300">خلط {activeElem.humor}</span>
        </span>
      </div>

      {/* =================================================================== */}
      {/* 4 ELEMENT SWITCHERS & ONBOARDING PAGINATION                         */}
      {/* =================================================================== */}
      <div className="space-y-1.5 sm:space-y-2 pt-1 pb-1 z-20 text-center shrink-0">
        
        {/* 4 Mini element selector pills */}
        <div className="grid grid-cols-4 gap-1.5">
          {(['fire', 'air', 'water', 'earth'] as const).map((elemKey) => {
            const item = elements[elemKey];
            const isSelected = selectedElement === elemKey;
            return (
              <button
                key={elemKey}
                onClick={() => setSelectedElement(elemKey)}
                className={`py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? `bg-white/10 ${item.textColor} shadow-sm font-extrabold` 
                    : 'bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                <span>{item.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 5 Dots indicator for onboarding (Page 3 of 5 active) */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-7 h-1.5 rounded-full bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.7)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
        </div>

        {/* Golden Proceed Button */}
        <button
          onClick={onNext}
          className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-[20px] bg-[#E5A93C] hover:bg-[#D69A30] active:scale-[0.98] text-[#1A1104] font-extrabold text-sm sm:text-base transition-all duration-200 shadow-[0_4px_20px_rgba(229,169,60,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>ادامه به روانشناسی و خودآگاهی</span>
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

    </div>
  );
};
