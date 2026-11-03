import React, { useState, useEffect } from 'react';
import { 
  Clock, Sparkles, Compass, Flame, Brain, Calendar, 
  BookOpen, Users, Award, ChevronLeft, ChevronRight, 
  ArrowLeft, CheckCircle2, ShieldCheck, Star, Heart,
  Activity, Play, Check, X, Sliders, ExternalLink, RefreshCw,
  LogIn, LogOut, User as UserIcon, Bookmark, Trash2, Copy
} from 'lucide-react';
import { 
  auth, 
  signInWithGoogle, 
  logOut, 
  getUserBirthResults, 
  deleteBirthResult,
  SavedBirthResult 
} from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface ArmanveinDashboardProps {
  onOpenBirthCalculator: () => void;
  onOpenIntroSlides: () => void;
  showToast: (msg: string) => void;
  currentUser: FirebaseUser | null;
  savedResultsCount: number;
  onRefreshSavedResults?: () => void;
}

export const ArmanveinDashboard: React.FC<ArmanveinDashboardProps> = ({
  onOpenBirthCalculator,
  onOpenIntroSlides,
  showToast,
  currentUser,
  savedResultsCount,
  onRefreshSavedResults
}) => {
  // Modal / Drawer states
  const [isServicesModalOpen, setIsServicesModalOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [selectedTaskModal, setSelectedTaskModal] = useState<string | null>(null);

  // Auth processing states
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [savedResults, setSavedResults] = useState<SavedBirthResult[]>([]);
  const [isLoadingSaved, setIsLoadingSaved] = useState<boolean>(false);

  // Load saved results when modal opens or user changes
  useEffect(() => {
    if (currentUser && isSavedModalOpen) {
      loadUserResults();
    }
  }, [currentUser, isSavedModalOpen]);

  const loadUserResults = async () => {
    if (!currentUser) return;
    setIsLoadingSaved(true);
    try {
      const results = await getUserBirthResults(currentUser.uid);
      setSavedResults(results);
    } catch (err) {
      console.error(err);
      showToast('خطا در بارگذاری سوابق محاسبات');
    } finally {
      setIsLoadingSaved(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    try {
      const user = await signInWithGoogle();
      showToast(`خوش آمدید ${user.displayName || 'کاربر گرامی'} ✨`);
      if (onRefreshSavedResults) onRefreshSavedResults();
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        showToast('پنجره ورود توسط کاربر بسته شد');
      } else {
        showToast('خطا در ورود با گوگل');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setSavedResults([]);
      showToast('از حساب کاربری خود خارج شدید');
    } catch (error) {
      showToast('خطا در خروج از حساب');
    }
  };

  const handleDeleteResult = async (resultId: string) => {
    if (!currentUser) return;
    try {
      await deleteBirthResult(currentUser.uid, resultId);
      setSavedResults(prev => prev.filter(r => r.id !== resultId));
      showToast('نتیجه با موفقیت از پرونده حذف شد');
      if (onRefreshSavedResults) onRefreshSavedResults();
    } catch (err) {
      showToast('خطا در حذف نتیجه');
    }
  };

  const handleCopy = (timeText: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(timeText);
    }
    showToast(`ساعت ${timeText} کپی شد`);
  };

  // List of square cards (مربع مربع)
  const squareTasks = [
    {
      id: 'services',
      title: 'خدمات آرمانوین',
      subtitle: 'ساعت تولد، چارت و مشاوره',
      icon: Award,
      color: 'from-amber-500/20 to-yellow-600/10',
      borderColor: 'border-amber-400/60 hover:border-amber-400',
      iconBg: 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950',
      tag: 'ویژه و محوری',
      tagColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      isPrimary: true,
      onClick: () => setIsServicesModalOpen(true)
    },
    {
      id: 'saved-archive',
      title: 'پرونده ساعت‌های من',
      subtitle: currentUser ? `${savedResultsCount} نتیجه ذخیره‌شده` : 'نیازمند ورود با گوگل',
      icon: Bookmark,
      color: 'from-blue-500/20 to-indigo-600/10',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      iconBg: 'bg-gradient-to-tr from-blue-500 to-indigo-600 text-white',
      tag: currentUser ? 'ابری Firebase' : 'ذخیره نتایج',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      onClick: () => {
        if (!currentUser) {
          handleGoogleLogin();
        } else {
          setIsSavedModalOpen(true);
        }
      }
    },
    {
      id: 'birth-chart-3d',
      title: 'چارت زایچه سه‌بعدی',
      subtitle: 'کروی کواکب و افلاک',
      icon: Compass,
      color: 'from-cyan-500/20 to-blue-600/10',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400/70',
      iconBg: 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white',
      tag: 'استرولوژی',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      onClick: () => setSelectedTaskModal('birth-chart-3d')
    },
    {
      id: 'temperament-test',
      title: 'آزمون و تعادل مزاج',
      subtitle: 'اخلاط چهارگانه و تغذیه',
      icon: Flame,
      color: 'from-emerald-500/20 to-teal-600/10',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400/70',
      iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white',
      tag: 'مزاج‌شناسی',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      onClick: () => setSelectedTaskModal('temperament-test')
    },
    {
      id: 'psychology-archetype',
      title: 'روانشناسی کهن‌الگو',
      subtitle: 'کاوش سایه و پرسونا',
      icon: Brain,
      color: 'from-purple-500/20 to-indigo-600/10',
      borderColor: 'border-purple-500/30 hover:border-purple-400/70',
      iconBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white',
      tag: 'روانشناسی',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      onClick: () => setSelectedTaskModal('psychology-archetype')
    },
    {
      id: 'astrology-calendar',
      title: 'تقویم نجومی و ترانزیت',
      subtitle: 'ساعات سعد و نحس و قمر',
      icon: Calendar,
      color: 'from-teal-500/20 to-cyan-600/10',
      borderColor: 'border-teal-500/30 hover:border-teal-400/70',
      iconBg: 'bg-gradient-to-tr from-teal-500 to-cyan-500 text-white',
      tag: 'رصد روزانه',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      onClick: () => setSelectedTaskModal('astrology-calendar')
    },
    {
      id: 'academy-courses',
      title: 'آکادمی و دوره‌ها',
      subtitle: 'آموزش جامع سه علم',
      icon: BookOpen,
      color: 'from-rose-500/20 to-pink-600/10',
      borderColor: 'border-rose-500/30 hover:border-rose-400/70',
      iconBg: 'bg-gradient-to-tr from-rose-500 to-pink-600 text-white',
      tag: 'یادگیری',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      onClick: () => setSelectedTaskModal('academy-courses')
    },
    {
      id: 'community-webinars',
      title: 'جامعه و هم‌اندیشی',
      subtitle: 'وبینارها و همفکری اعضا',
      icon: Users,
      color: 'from-amber-500/20 to-orange-600/10',
      borderColor: 'border-amber-500/30 hover:border-amber-400/70',
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-slate-950',
      tag: 'دورهمی',
      tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      onClick: () => setSelectedTaskModal('community-webinars')
    }
  ];

  // Specific Armanvein Services List inside the modal
  const servicesList = [
    {
      id: 'birth-time-finder',
      title: 'پیدا کردن و استخراج ساعت تولد',
      subtitle: 'رصد دقیق زایچه با متد کپلری و ۴ شاخص تطبیقی',
      description: 'اگر ساعت تولدتان نامشخص است یا در اسناد تردید وجود دارد، هوش نجومی آرمانوین بر اساس بازه شبانه‌روز، فرم فیزیکی، رویدادهای سرنوشت و ریتم کرونوتایپ، دقیق‌ترین ساعت و طالع را استخراج می‌کند و قابلیت ذخیره دائمی در Firebase را دارد.',
      icon: Clock,
      highlight: true,
      badge: 'فعال / شروع رصد',
      badgeColor: 'bg-amber-400 text-slate-950 font-bold',
      actionText: 'شروع رصد ساعت تولد',
      action: () => {
        setIsServicesModalOpen(false);
        onOpenBirthCalculator();
      }
    },
    {
      id: 'natal-chart-interpretation',
      title: 'ترسیم چارت تولد سه‌بعدی و تفسیر فلکی',
      subtitle: 'بررسی دقیق موقعیت کواکب، خانه‌ها و زوایای تلاقی',
      description: 'ترسیم دقیق چارت کیهانی اختصاصی شما به همراه شرح زاویه‌های شرف، هبوط، اتصالات ماه و کواکب حاکم بر سرنوشت.',
      icon: Compass,
      badge: 'سه‌بعدی',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30',
      actionText: 'مشاهده جزئیات چارت',
      action: () => showToast('در حال بارگذاری نمونه چارت زایچه سه‌بعدی...')
    },
    {
      id: 'temperament-prescription',
      title: 'مشاوره مزاج و رژیم غذایی اخلاطی',
      subtitle: 'شناخت طبع سرشتی و تنظیم اخلاط چهارگانه بدن',
      description: 'راهکارهای طبیعی برای تعدیل سودا، صفرا، دم و بلغم بر اساس فصل و شرایط زیستی به منظور بازیابی حداکثر انرژی.',
      icon: Flame,
      badge: 'طبایع',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
      actionText: 'ارزیابی طبع فردی',
      action: () => showToast('پرسشنامه غلبه مزاج به‌زودی فعال می‌شود.')
    },
    {
      id: 'archetype-shadow-work',
      title: 'رمزگشایی سایه و کهن‌الگوهای یونگ',
      subtitle: 'سفر به لایه‌های ناخودآگاه و یکپارچگی روان',
      description: 'تحلیل پرسونا، سایه، آنیما/آنیموس و کشف موانع ذهنی نهفته برای هدایت انرژی روانی به سمت فردیت‌یابی.',
      icon: Brain,
      badge: 'روانشناسی',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-400/30',
      actionText: 'شروع واکاوی روان',
      action: () => showToast('بسته خودآگاهی یونگ در دسترس است.')
    },
    {
      id: 'master-consultation',
      title: 'مشاوره اختصاصی یک‌به‌یک با استاد',
      subtitle: 'تلفیق مستقیم ۳ علم در جلسه VIP اختصاصی',
      description: 'جلسه اختصاصی با استاد ارشد آرمانوین برای پاسخ به بحران‌های تصمیم‌گیری، ازدواج و زمان‌بندی جهش‌های شغلی.',
      icon: Award,
      badge: 'VIP',
      badgeColor: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
      actionText: 'رزرو نوبت مشاوره',
      action: () => showToast('تقویم رزرو نوبت مشاوره VIP فراخوانی شد.')
    }
  ];

  return (
    <div className="w-full h-full max-w-[430px] mx-auto text-right font-sans select-none flex flex-col justify-between overflow-hidden relative bg-[#040A12]/95 text-[#E2F0FD] p-2.5 sm:p-3.5 min-h-0" dir="rtl">
      
      {/* Background Ambient Cosmic Lights */}
      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-10 w-52 h-52 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* =================================================================== */}
      {/* TOP HEADER: BRAND, GOOGLE AUTH, PROFILE, BACK TO SLIDES            */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 z-10 shrink-0">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500/30 to-yellow-500/10 border border-amber-400/40 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.3)] shrink-0">
            <picture className="w-full h-full flex items-center justify-center">
              <source srcSet="/assets/aistudio/armanvein_logo_optimized.webp" type="image/webp" />
              <img src="/assets/aistudio/__________cfb5adf4.png" alt="نشان آرمانوین" className="w-full h-full object-contain" />
            </picture>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs sm:text-sm font-extrabold text-white font-serif tracking-tight">آرمانوین</h2>
              <span className="px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[8px] sm:text-[8.5px] font-mono">پیشخوان ۳بعدی</span>
            </div>
            <span className="text-[9px] text-slate-400 block font-mono">ترکیب استرولوژی، مزاج و روان</span>
          </div>
        </div>

        {/* User Account / Google Sign-In Bar */}
        <div className="flex items-center gap-1.5">
          {currentUser ? (
            /* Logged In State */
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2 py-1 backdrop-blur-md">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'کاربر'} 
                  className="w-6 h-6 rounded-full border border-amber-400/50 object-cover" 
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="hidden xs:block text-right">
                <span className="text-[9.5px] font-bold text-white block max-w-[70px] truncate">
                  {currentUser.displayName || 'کاربر گرامی'}
                </span>
                <span className="text-[8px] text-emerald-400 block font-mono">تایید گوگل</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-6 h-6 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 flex items-center justify-center transition cursor-pointer"
                title="خروج از حساب"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            /* Google Sign-In Button */
            <button
              onClick={handleGoogleLogin}
              disabled={isSigningIn}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:bg-white/20 text-white border border-white/20 text-[10px] sm:text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
              title="ورود با حساب گوگل جهت ذخیره دائمی نتایج"
            >
              {/* Colorful Google G Icon */}
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isSigningIn ? 'در حال ورود...' : 'ورود با گوگل'}</span>
            </button>
          )}

          {/* Action: Revisit Slides */}
          <button
            onClick={onOpenIntroSlides}
            className="w-7 h-7 sm:w-auto sm:px-2 sm:py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-sm"
            title="مشاهده دوباره اسلایدهای معرفی"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">اسلایدها</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* QUICK STATUS TICKER / DAILY TRANSIT BANNER                          */}
      {/* =================================================================== */}
      <div className="my-1.5 p-2 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#07192A]/60 to-amber-950/30 border border-cyan-500/20 flex items-center justify-between text-xs z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-white block">خدمت پیشنهادی امروز:</span>
            <span className="text-[9px] text-amber-300">استخراج ساعت تولد برای تدوین چارت کامل</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {currentUser && (
            <button 
              onClick={() => setIsSavedModalOpen(true)}
              className="px-2 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-300 text-[9px] font-bold transition cursor-pointer flex items-center gap-1 shrink-0"
              title="مشاهده سوابق محاسبات ساعت تولد"
            >
              <Bookmark className="w-3 h-3 text-blue-400" />
              <span>نتایج ذخیره‌شده ({savedResultsCount})</span>
            </button>
          )}

          <button 
            onClick={() => setIsServicesModalOpen(true)}
            className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[9.5px] font-extrabold transition cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.3)] shrink-0"
          >
            خدمات
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MAIN CONTENT: LIST OF TASKS IN SQUARE CARDS (مربع مربع)             */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar py-1 z-10">
        <div className="flex items-center justify-between pb-1.5 px-0.5">
          <span className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>بخش‌ها و کارهای سامانه (کارت‌های مربعی)</span>
          </span>
          <span className="text-[9px] text-slate-400 font-mono">۸ ماژول جامع</span>
        </div>

        {/* Square Cards Grid (مربع مربع) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {squareTasks.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
                onClick={task.onClick}
                className={`relative aspect-square rounded-2xl border p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-95 group overflow-hidden backdrop-blur-xl ${
                  task.isPrimary 
                    ? 'bg-gradient-to-br from-[#1C1506] via-[#0E1724] to-[#080E18] border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]' 
                    : `bg-gradient-to-br ${task.color} ${task.borderColor} hover:bg-white/[0.08]`
                }`}
              >
                {/* Subtle Glow Accent in corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-white/10 transition-colors" />

                {/* Top of Square: Icon & Tag */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${task.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold border ${task.tagColor} font-mono shrink-0`}>
                    {task.tag}
                  </span>
                </div>

                {/* Middle / Bottom of Square: Title & Description */}
                <div className="space-y-0.5 relative z-10 text-right mt-1">
                  <h3 className={`text-xs sm:text-sm font-extrabold font-serif transition-colors ${
                    task.isPrimary ? 'text-amber-300 group-hover:text-amber-200' : 'text-white group-hover:text-cyan-200'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-[9px] sm:text-[9.5px] text-slate-300/80 leading-tight line-clamp-2">
                    {task.subtitle}
                  </p>
                </div>

                {/* Bottom interactive indicator */}
                <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-white/5 relative z-10">
                  <span className="group-hover:text-white transition-colors">
                    {task.isPrimary ? 'مشاهده خدمات' : 'ورود به ماژول'}
                  </span>
                  <ChevronLeft className="w-3 h-3 text-slate-400 group-hover:text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* BOTTOM ACTION BAR: DIRECT BIRTH TIME FINDER CTA                     */}
      {/* =================================================================== */}
      <div className="pt-2 border-t border-white/10 z-10 shrink-0">
        <button
          onClick={() => setIsServicesModalOpen(true)}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>مشاهده سبد خدمات آرمانوین (شامل پیدا کردن ساعت تولد)</span>
          <ChevronLeft className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* =================================================================== */}
      {/* MODAL 1: خدمات آرمانوین                                             */}
      {/* =================================================================== */}
      {isServicesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in" dir="rtl">
          <div className="w-full max-w-[430px] bg-[#071320] border-t sm:border border-amber-400/40 rounded-t-[28px] sm:rounded-[28px] shadow-[0_0_50px_rgba(245,158,11,0.25)] p-3.5 sm:p-4 text-right max-h-[90vh] overflow-hidden flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
                    <span>خدمات تخصصی آرمانوین</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">۵ خدمت</span>
                  </h3>
                  <span className="text-[9.5px] text-slate-400 block font-mono">
                    شامل استخراج ساعت تولد، چارت ۳بعدی و مشاوره‌ها
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Services Scroll List */}
            <div className="flex-1 overflow-y-auto py-2.5 space-y-2 pr-0.5 no-scrollbar min-h-0">
              {servicesList.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.id}
                    onClick={srv.action}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-right group ${
                      srv.highlight
                        ? 'bg-gradient-to-br from-[#1F1707] via-[#121E2C] to-[#0A121A] border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.3)] hover:border-amber-300'
                        : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          srv.highlight ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-white/10 text-cyan-300'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors font-serif">
                            {srv.title}
                          </h4>
                          <span className="text-[9px] text-slate-400 block">
                            {srv.subtitle}
                          </span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[8.5px] shrink-0 ${srv.badgeColor}`}>
                        {srv.badge}
                      </span>
                    </div>

                    <p className="text-[9.5px] text-slate-300/90 leading-relaxed mb-2">
                      {srv.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className={`text-[10px] font-bold flex items-center gap-1 ${
                        srv.highlight ? 'text-amber-300 group-hover:text-amber-200' : 'text-cyan-300 group-hover:text-cyan-200'
                      }`}>
                        <span>{srv.actionText}</span>
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      </span>
                      {srv.highlight && (
                        <span className="text-[8.5px] text-amber-400/80 font-mono">★ گام‌به‌گام و دقیق</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Bottom Close */}
            <div className="pt-2 border-t border-white/10 shrink-0">
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
              >
                بستن پنجره خدمات
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 2: پرونده ساعت‌های تولد ذخیره‌شده در FIREBASE                */}
      {/* =================================================================== */}
      {isSavedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in" dir="rtl">
          <div className="w-full max-w-[430px] bg-[#071320] border-t sm:border border-blue-400/40 rounded-t-[28px] sm:rounded-[28px] shadow-[0_0_50px_rgba(59,130,246,0.25)] p-3.5 sm:p-4 text-right max-h-[90vh] overflow-hidden flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
                    <span>پرونده ساعت‌های تولد ذخیره‌شده</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {savedResults.length} نتیجه
                    </span>
                  </h3>
                  <span className="text-[9.5px] text-slate-400 block font-mono">
                    همگام‌سازی ابری با حساب کاربری Google و Firebase
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSavedModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Saved Items List */}
            <div className="flex-1 overflow-y-auto py-2.5 space-y-2 pr-0.5 no-scrollbar min-h-0">
              {isLoadingSaved ? (
                <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
                  <span>در حال دریافت نتایج از پایگاه‌داده Firestore...</span>
                </div>
              ) : savedResults.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/30 mx-auto flex items-center justify-center text-blue-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">هنوز ساعتی ذخیره نکرده‌اید</h4>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
                      از بخش «خدمات آرمانوین» وارد ابزار استخراج ساعت تولد شوید و نتیجه محاسبه را با یک کلیک در حسابتان ذخیره کنید.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSavedModalOpen(false);
                      onOpenBirthCalculator();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    شروع استخراج ساعت تولد
                  </button>
                </div>
              ) : (
                savedResults.map((result) => (
                  <div 
                    key={result.id}
                    className="p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/40 transition-all text-right space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black font-mono text-cyan-300 dir-ltr">
                          {result.calculatedTime}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                          دقت {result.confidence}٪
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(result.calculatedTime)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                          title="کپی ساعت"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteResult(result.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 transition cursor-pointer"
                          title="حذف از سوابق"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[9.5px]">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-slate-400 block font-mono">طالع صاعد (Ascendant):</span>
                        <span className="text-white font-bold block">{result.ascendant}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-slate-400 block font-mono">تاریخ و شهر:</span>
                        <span className="text-slate-200 font-bold block">{result.birthCity} · {result.birthDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono pt-1 border-t border-white/5">
                      <span>بازه: {result.dayPeriod}</span>
                      <span>ثبت: {result.createdAt ? new Date(result.createdAt).toLocaleDateString('fa-IR') : 'به‌تازگی'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Bottom Close */}
            <div className="pt-2 border-t border-white/10 shrink-0">
              <button
                onClick={() => setIsSavedModalOpen(false)}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
              >
                بستن پنجره پرونده
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* OTHER TASK PREVIEW MODAL                                            */}
      {/* =================================================================== */}
      {selectedTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" dir="rtl">
          <div className="w-full max-w-[380px] bg-[#071320] border border-cyan-500/40 rounded-2xl p-4 text-right shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{squareTasks.find(t => t.id === selectedTaskModal)?.title}</span>
              </h4>
              <button 
                onClick={() => setSelectedTaskModal(null)}
                className="w-6 h-6 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-[10px] text-slate-300 leading-relaxed">
              این ماژول در حال حاضر با داده‌های پیشخوان اختصاصی هماهنگ شده است. برای دسترسی فوری به ابزارهای زایچه، می‌توانید از خدمات آرمانوین و ابزار استخراج ساعت تولد استفاده فرمایید.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedTaskModal(null);
                  setIsServicesModalOpen(true);
                }}
                className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] transition cursor-pointer"
              >
                انتقال به خدمات آرمانوین
              </button>
              <button
                onClick={() => setSelectedTaskModal(null)}
                className="px-3 py-2 rounded-xl bg-white/10 text-slate-300 hover:text-white text-[11px] transition cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
