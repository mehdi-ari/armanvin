import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ArrowLeft, 
  Headphones, 
  Volume2, 
  SlidersHorizontal, 
  Compass, 
  Sparkles, 
  CheckCircle2,
  Clock,
  Layers,
  BookOpen
} from 'lucide-react';
import { MINI_COURSES_DATA, MiniCourse } from '../../data/miniCoursesData';
import { NeonProgressBar } from '../common/NeonProgressBar';

export type CatalogViewMode = 'editorial' | 'audio-first' | 'pathway';

interface MiniCoursesCatalogProps {
  onSelectCourse: (courseId: string) => void;
}

export const MiniCoursesCatalog: React.FC<MiniCoursesCatalogProps> = ({ onSelectCourse }) => {
  const [viewMode, setViewMode] = useState<CatalogViewMode>('editorial');
  const [activeCategory, setActiveCategory] = useState<'all' | 'astrology' | 'temperament' | 'psychology'>('all');
  const [playingPreviewId, setPlayingPreviewId] = useState<string | null>(null);

  const filteredCourses = MINI_COURSES_DATA.filter((course) => {
    return activeCategory === 'all' || course.category === activeCategory;
  });

  const togglePreview = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingPreviewId((prev) => (prev === courseId ? null : courseId));
  };

  // Distinctive handcrafted emblem graphics for the 3 core pillars
  const renderEmblem = (type: MiniCourse['iconType']) => {
    switch (type) {
      case 'celestial-star':
        return (
          <svg className="w-11 h-11 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.5" className="fill-amber-300/40" />
          </svg>
        );
      case 'temperament-flame':
        return (
          <svg className="w-11 h-11 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="3 3" />
            <path d="M12 4C12 4 16 8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 14.2 8 12C8 8 12 4 12 4Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="1.5" className="fill-amber-300/70" />
          </svg>
        );
      case 'psyche-gem':
        return (
          <svg className="w-11 h-11 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3H18L22 9L12 21L2 9L6 3Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L8 9L12 21L16 9L13 3" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 9H22" strokeOpacity="0.6" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] bg-[#07090e] text-slate-100 py-8 sm:py-14" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">

        {/* ============================================================== */}
        {/* TOP EDITORIAL HERO BANNER                                      */}
        {/* ============================================================== */}
        <div className="relative pt-2 pb-6 border-b border-slate-800/80">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl text-right">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300/90 tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>مینی‌دوره‌های شنیداری آرمانوین</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">فصل آموزشی جدید</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-serif">
                مسیرهای کوتاه، عمیق و تحول‌آفرین
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                جلسۀ اول تمامی دوره‌ها رایگان و بدون نیاز به ورود در دسترس شماست. بشنوید، بیندیشید و نقشه درونی خود را بسازید.
              </p>
            </div>

            {/* Showcase Cards Active Indicator Badge */}
            <div className="flex items-center gap-2 bg-[#0b1417] px-3.5 py-1.5 rounded-xl border border-teal-500/30 text-xs text-teal-300 self-start lg:self-end">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-medium">چیدمان: کارت‌های ویترینی</span>
            </div>

          </div>

          {/* Clean Segmented Filter Bar */}
          <div className="pt-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'همه دوره‌ها (سه زاویه شناخت)' },
              { id: 'astrology', label: 'آسترولوژی تکاملی' },
              { id: 'temperament', label: 'مزاج‌شناسی کاربردی' },
              { id: 'psychology', label: 'روانشناسی تحلیلی' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-1.5 rounded-lg text-xs transition-colors shrink-0 cursor-pointer font-medium ${
                  activeCategory === tab.id
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 1: LUXURY EDITORIAL CARDS (Default)                  */}
        {/* ============================================================== */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>همه مینی‌دوره‌ها (کارت‌های ویترینی)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {filteredCourses.length} دوره فعال
            </span>
          </div>

          {viewMode === 'editorial' && (
            <div 
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7"
            >
            {filteredCourses.map((course, idx) => {
              const isPlayingThis = playingPreviewId === course.id;

              return (
                <div
                  key={`${activeCategory}-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  style={{
                    animationDelay: `${idx * 110}ms`,
                    animationFillMode: 'both',
                  }}
                  className="animate-fade-in-up bg-[#0b0e17] border border-slate-800/90 hover:border-amber-400/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] cursor-pointer group relative overflow-hidden"
                >
                  {/* Top Glowing Edge Bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" 
                  />

                  <div>
                    {/* Visual Neon Progress Bar at Top of Mini-Course */}
                    <div className="mb-5 pt-1">
                      <NeonProgressBar
                        progress={course.progressPercent}
                        completedText="پیشرفت یادگیری:"
                        totalText={`${course.completedSessions} از ${course.sessionCount} جلسه`}
                        variant={
                          course.category === 'astrology' ? 'gold' :
                          course.category === 'temperament' ? 'emerald' :
                          course.category === 'psychology' ? 'purple' : 'cyan'
                        }
                        size="sm"
                      />
                    </div>

                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="p-3 rounded-2xl bg-[#101624] border border-slate-800 transition-transform group-hover:scale-105">
                        {renderEmblem(course.iconType)}
                      </div>

                      {/* Quick Teaser Audio Trigger */}
                      <button
                        onClick={(e) => togglePreview(course.id, e)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer border ${
                          isPlayingThis
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                            : 'bg-[#101624] text-amber-300 border-slate-800 hover:border-amber-400/50 hover:bg-[#161f33]'
                        }`}
                        title={isPlayingThis ? 'توقف پیش‌نمایش' : 'شنیدن تیزر صوتی دوره'}
                      >
                        {isPlayingThis ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-amber-300 mr-0.5" />}
                      </button>
                    </div>

                    {/* Metadata line without pills */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-light">
                      <span>{course.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.sessionCount} جلسه صوتی</span>
                      <span aria-hidden="true">·</span>
                      <span>مدت: {course.totalDuration}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif group-hover:text-amber-200 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
                      {course.description}
                    </p>

                    {/* Waveform teaser playing feedback */}
                    {isPlayingThis && (
                      <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-300 mb-6 flex items-center justify-between animate-fade-in">
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 animate-bounce" />
                          <span>در حال پخش پیش‌نمایش صوتی جلسه اول...</span>
                        </div>
                        <span className="text-[11px] font-mono">رایگان</span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>جلسۀ اول رایگان و آماده پخش</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                      <span>ورود به دوره</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:translate-x-[-3px]" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 2: AUDIO-FIRST DECK                                 */}
        {/* ============================================================== */}
        {viewMode === 'audio-first' && (
          <div key={activeCategory} className="space-y-4">
            {filteredCourses.map((course, idx) => {
              const isPlayingThis = playingPreviewId === course.id;

              return (
                <div
                  key={`${activeCategory}-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  style={{
                    animationDelay: `${idx * 90}ms`,
                    animationFillMode: 'both',
                  }}
                  className="animate-fade-in-up bg-[#0b0e17] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all hover:bg-[#0e1320] cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Circle Play Button */}
                    <button
                      onClick={(e) => togglePreview(course.id, e)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 cursor-pointer ${
                        isPlayingThis
                          ? 'bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                          : 'bg-[#12192a] text-amber-300 border border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      {isPlayingThis ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-amber-300 mr-0.5" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-light">
                        <span>{course.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.sessionCount} جلسه</span>
                        <span aria-hidden="true">·</span>
                        <span>سطح {course.level}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-serif">{course.title}</h4>
                      <p className="text-xs text-slate-300 font-light line-clamp-1">{course.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">مدت: {course.totalDuration}</span>
                    <button className="px-4 py-2 rounded-xl bg-[#141b2c] text-slate-200 text-xs font-semibold hover:bg-amber-400 hover:text-slate-950 transition flex items-center gap-1.5">
                      <span>شنیدن جلسات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 3: HOLISTIC LEARNING PATHWAY                         */}
        {/* ============================================================== */}
        {viewMode === 'pathway' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-[#0c101a] border border-slate-800 text-right space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>مسیر زنجیره‌ای خودشناسی کاربردی</span>
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                مسیر تحول در آرمانوین از شناخت هندسه کلان فلکی (حکمت آسمان) آغاز شده، به تنظیم بیولوژی و اخلاط زیستی بدن (مزاجت رو بشناس) پیوند خورده و با کاوش در لایه‌های ناخودآگاه (معماری ذهن) به تعادل و یکپارچگی اصیل می‌رسد.
              </p>
            </div>

            <div className="relative border-r border-slate-800 mr-4 sm:mr-6 space-y-6 pr-6 sm:pr-8">
              {MINI_COURSES_DATA.map((course, idx) => (
                <div key={course.id} className="relative">
                  <div className="absolute -right-[31px] sm:-right-[39px] top-3 w-6 h-6 rounded-full bg-[#101726] border border-amber-400 text-amber-300 flex items-center justify-center text-xs font-bold font-mono">
                    ۰{idx + 1}
                  </div>

                  <div
                    onClick={() => onSelectCourse(course.id)}
                    className="bg-[#0b0e17] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition cursor-pointer hover:bg-[#0e1320]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-light mb-1">
                          <span>گام ۰{idx + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span>{course.categoryLabel}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1 font-serif">{course.title}</h4>
                        <p className="text-xs text-slate-300 font-light max-w-xl">{course.description}</p>
                      </div>

                      <button className="self-end sm:self-auto px-4 py-2 rounded-xl bg-[#141b2c] hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 shrink-0">
                        <span>شروع این گام</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
