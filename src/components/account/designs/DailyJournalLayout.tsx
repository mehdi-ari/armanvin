import React, { useState } from 'react';
import { 
  Calendar, Clock, Sun, Moon, Sparkles, Check, Flame, Star, 
  ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Brain, 
  Send, User, Rocket, Wallet, Headphones, LogOut, CheckCircle2, Compass 
} from 'lucide-react';
import { SharedLayoutProps } from './types';

export const DailyJournalLayout: React.FC<SharedLayoutProps> = ({
  userData,
  setUserData,
  activeTab,
  setActiveTab,
  missions,
  onToggleMission,
  copiedInvite,
  onCopyInvite,
  browserReminderActive,
  onToggleReminder,
  tickets,
  newTicketMessage,
  setNewTicketMessage,
  onSubmitTicket,
  courses,
  onLogout,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Wednesday / چهارشنبه
  const [dailyReflection, setDailyReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const weekDays = [
    { name: 'شنبه', date: '۲۶ مهر', planet: 'زحل ♄', moon: 'تربیع اول', energy: 'تثبیت و انضباط' },
    { name: 'یکشنبه', date: '۲۷ مهر', planet: 'خورشید ☉', moon: 'تحدب فزاینده', energy: 'حیات و خلاقیت' },
    { name: 'دوشنبه', date: '۲۸ مهر', planet: 'ماه ☽', moon: 'نزدیک بدر', energy: 'شهود و احساس' },
    { name: 'سه‌شنبه', date: '۲۹ مهر', planet: 'مریخ ♂', moon: 'ماه کامل (بدر)', energy: 'انرژی و حرکت' },
    { name: 'چهارشنبه', date: '۳۰ مهر', planet: 'عطارد ☿', moon: 'تحدب کاهنده', energy: 'ارتباط و ذهن' },
    { name: 'پنج‌شنبه', date: '۱ آبان', planet: 'مشتری ♃', moon: 'تربیع دوم', energy: 'گسترش و حکمت' },
    { name: 'جمعه', date: '۲ آبان', planet: 'زهره ♀', moon: 'هلال کاهنده', energy: 'هماهنگی و استراحت' },
  ];

  const handleSaveReflection = () => {
    if (!dailyReflection.trim()) return;
    setReflectionSaved(true);
    setUserData((u) => ({ ...u, clubPoints: u.clubPoints + 10 }));
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  return (
    <div className="w-full bg-[#08070F] text-[#ECE7DE] py-6 sm:py-10 px-3 sm:px-6 select-none font-sans" dir="rtl">
      <div className="max-w-[1060px] mx-auto space-y-7">

        {/* ========================================================================= */}
        {/* COMPOSITION 2 HEADER: CHRONOLOGICAL GROWTH HEADER                         */}
        {/* ========================================================================= */}
        <header className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#110D1F] via-[#191330] to-[#110D1F] border border-[#2A204C] shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            <div className="space-y-1.5 text-right">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#271C4A] text-[#C084FC] font-mono border border-[#403074]">
                  ژورنال تکاملی و جریان روزانه
                </span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">شناسه: {userData.inviteCode}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif flex items-center gap-2">
                <span>روزشمار هوشیاری: {userData.displayName}</span>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
                در این چیدمان، تمام کنش‌های شما بر محور زمان روز، جریان ترانزیت کواکب و گام‌های سفر ۴گانه خودآگاهی منظم شده است.
              </p>
            </div>

            {/* Streak & Level Counter */}
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-[#19142E] border border-[#372A66] text-center min-w-[110px]">
                <span className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>{userData.streakDays} روز پیوسته</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">استریک فعال</span>
              </div>

              <div 
                onClick={() => setActiveTab('club')}
                className="p-3.5 rounded-2xl bg-[#19142E] border border-[#372A66] text-center min-w-[110px] cursor-pointer hover:border-[#C084FC] transition"
              >
                <span className="text-lg font-bold font-mono text-[#C084FC]">{userData.clubPoints}</span>
                <span className="text-[11px] text-slate-400 block">امتیاز باشگاه</span>
              </div>
            </div>

          </div>

          {/* 7-Day Interactive Astrological Week Strip */}
          <div className="pt-4 border-t border-[#2A204C]/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>هفته جاری در مدار کواکب:</span>
              <span className="text-[#C084FC]">روز انتخابی: {weekDays[selectedDayIndex].name} ({weekDays[selectedDayIndex].energy})</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {weekDays.map((d, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-3 rounded-2xl border transition-all text-right flex flex-col justify-between space-y-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2A1F52] border-[#C084FC] text-white shadow-md ring-1 ring-[#C084FC]/50'
                        : 'bg-[#100C1F] border-[#221A3E] hover:border-[#382B63] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{d.name}</span>
                      <span className="text-[10px] font-mono text-amber-300">{d.planet}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-300">{d.date}</span>
                    <span className="text-[10px] text-[#A855F7] truncate">{d.moon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* TIMELINE SEQUENCE: 4 PHASES OF THE DAY                                    */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C084FC]" />
              <span>جریان ۴ مرحله‌ای امروز: {weekDays[selectedDayIndex].name}</span>
            </h2>
            <span className="text-xs text-slate-400">از تدبیر صبحگاهی تا بازخورد شبانه</span>
          </div>

          <div className="space-y-4 relative before:absolute before:right-6 before:top-6 before:bottom-6 before:w-[2px] before:bg-gradient-to-b before:from-[#C084FC] before:via-[#38BDF8] before:to-[#34D399] before:hidden sm:before:block">
            
            {/* Phase 1: Morning (صبحگاه) */}
            <div className="sm:pr-14 relative group">
              <div className="absolute right-4 top-5 w-4 h-4 rounded-full bg-[#C084FC] border-2 border-[#110D1F] hidden sm:block shadow-[0_0_10px_#C084FC]" />
              <div className="p-5 sm:p-6 rounded-3xl bg-[#120E22] border border-[#271E47] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2 text-xs">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-400">گام اول · صبحگاه (تدبیر مزاج)</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">طبع صفرا و حرارت روز</span>
                  </div>
                  <h3 className="text-base font-bold text-white">نوشیدن شربت سکنجبین و تنفس آگاهانه</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    با توجه به حرارت خورشید در برج اسد و طبع گرم و خشک، آغاز صبح با خنک‌کننده‌های معتدل مانع خشکی ذهن و خستگی زودرس می‌شود.
                  </p>
                </div>

                <button
                  onClick={() => onToggleMission('streak')}
                  className="px-4 py-2 rounded-xl bg-[#221841] hover:bg-[#2F215B] text-[#C084FC] border border-[#3E2C72] text-xs font-bold transition shrink-0 cursor-pointer"
                >
                  انجام شد ✓
                </button>
              </div>
            </div>

            {/* Phase 2: Midday (نیمروز) */}
            <div className="sm:pr-14 relative group">
              <div className="absolute right-4 top-5 w-4 h-4 rounded-full bg-[#38BDF8] border-2 border-[#110D1F] hidden sm:block shadow-[0_0_10px_#38BDF8]" />
              <div className="p-5 sm:p-6 rounded-3xl bg-[#120E22] border border-[#271E47] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2 text-xs">
                    <Compass className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-bold text-[#38BDF8]">گام دوم · نیمروز (تحلیل نجومی و آرماهوش)</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">ترانزیت عطارد و زاویه ناتال</span>
                  </div>
                  <h3 className="text-base font-bold text-white">بررسی نقشه آسمان و دریافت پیام آرماهوش</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    انرژی عطارد امروز مناسب تصمیم‌گیری‌های شفاف کاری و مکالمات مهم است. سؤال خود را در خصوص چارت تولد ثبت کنید.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('ai')}
                  className="px-4 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#38BDF8] text-slate-950 text-xs font-bold transition shrink-0 cursor-pointer"
                >
                  ورود به آرماهوش ←
                </button>
              </div>
            </div>

            {/* Phase 3: Afternoon (عصرگاه) */}
            <div className="sm:pr-14 relative group">
              <div className="absolute right-4 top-5 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-[#110D1F] hidden sm:block shadow-[0_0_10px_#F59E0B]" />
              <div className="p-5 sm:p-6 rounded-3xl bg-[#120E22] border border-[#271E47] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-400">گام سوم · عصرگاه (یادگیری در مینی دوره‌ها)</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">دوره حکمت آسمان: درس ۹</span>
                  </div>
                  <h3 className="text-base font-bold text-white">تفسیر خانه دهم (شغل و رسالت اجتماعی)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    ۸ از ۱۲ درس را سپری کرده‌اید. برای تکمیل مأموریت هفتگی و دریافت ۱۵ امتیاز، درس امروز را مشاهده نمایید.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 rounded-xl bg-[#2E2010] hover:bg-[#422D16] text-amber-300 border border-amber-600/40 text-xs font-bold transition shrink-0 cursor-pointer"
                >
                  ادامه درس دوره
                </button>
              </div>
            </div>

            {/* Phase 4: Evening (شامگاه) */}
            <div className="sm:pr-14 relative group">
              <div className="absolute right-4 top-5 w-4 h-4 rounded-full bg-[#34D399] border-2 border-[#110D1F] hidden sm:block shadow-[0_0_10px_#34D399]" />
              <div className="p-5 sm:p-6 rounded-3xl bg-[#120E22] border border-[#271E47] shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Moon className="w-4 h-4 text-[#34D399]" />
                    <span className="font-bold text-[#34D399]">گام چهارم · شامگاه (ژورنال و ثبت رویدادهای روز)</span>
                  </div>
                  <span className="text-xs font-mono text-[#34D399]">+۱۰ امتیاز باشگاه</span>
                </div>

                <div className="space-y-2 text-right">
                  <h3 className="text-base font-bold text-white">ثبت مشاهدات خودآگاهی و بازخورد روز مهدی عاری</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    امروز چه نشانه‌ای از کهن‌الگو یا اثر گذر کواکب در احساسات و تصمیمات خود لمس کردید؟ یادداشت شما مستقیماً در پرونده مشاوره آرشیو می‌شود.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <input
                      type="text"
                      value={dailyReflection}
                      onChange={(e) => setDailyReflection(e.target.value)}
                      placeholder="یادداشت کوتاه شما برای پرونده شخصی..."
                      className="flex-1 bg-[#0A0714] border border-[#2A204C] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C084FC] text-right"
                    />
                    <button
                      onClick={handleSaveReflection}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white text-xs font-bold shadow-md hover:opacity-95 transition cursor-pointer shrink-0"
                    >
                      {reflectionSaved ? 'در پرونده ذخیره شد ✓' : 'ثبت در ژورنال شخصی'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FLOATING DOSSIER & ACTIONS DRAWER                                         */}
        {/* ========================================================================= */}
        <section className="p-5 sm:p-6 rounded-3xl bg-[#120E22] border border-[#271E47] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#21173F] text-[#C084FC] flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white">درگاه مستقیم پنل پرونده شخصی</h4>
              <p className="text-xs text-slate-400">مشاهده نسخه مشاور، تنظیم وقت جلسه و سوابق مزاج و نجوم</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('portal')}
              className="px-5 py-2.5 rounded-xl bg-[#C084FC] hover:bg-[#A855F7] text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              ورود به پرونده جامع ←
            </button>
            <button
              onClick={onCopyInvite}
              className="px-4 py-2.5 rounded-xl bg-[#1E1736] hover:bg-[#2B214C] text-slate-300 text-xs font-medium border border-[#3E2F68] transition cursor-pointer"
            >
              {copiedInvite ? 'کپی شد' : 'کد دعوت'}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
