import React, { useState } from 'react';
import { 
  Sun, BookOpen, Eye, Brain, Receipt, Wallet, Sprout, Crown, Rocket, 
  Headphones, User, LogOut, ArrowLeft, Star, Sparkles, Check, ChevronDown, 
  ChevronUp, Send, Copy, AlertCircle, Compass, Flame, Shield, RefreshCw,
  Play, Pause, Plus, Clock, ExternalLink, Calendar, MapPin, CheckCircle2,
  FileText, ArrowUpRight, MessageSquare, Award, CreditCard, Filter, LayoutGrid,
  Columns, Layers, MonitorPlay, Zap
} from 'lucide-react';
import { MINI_COURSES_DATA, MiniCourse } from '../../data/miniCoursesData';

export type AccountTabId = 
  | 'dashboard'
  | 'courses'
  | 'charts'
  | 'ai'
  | 'orders'
  | 'wallet'
  | 'income'
  | 'club'
  | 'portal'
  | 'support'
  | 'profile';

export type UserDesignComposition = 
  | 'classic-stacked'   // ۱. ترکیب کلاسیک ستونی (عین اسکرین‌شات شما)
  | 'bento-grid'        // ۲. ترکیب بنتو گرید مدرن (کارت‌های ۲ ستونه هوشمند)
  | 'tri-pillars'       // ۳. ترکیب سه‌ساحت اختصاصی آرمان‌وین (آسمان، تن و مزاج، روان)
  | 'cockpit-command';  // ۴. ترکیب کابین خلبانی (داشبورد مأموریت و اکشن متمرکز)

interface UserAccountDashboardProps {
  onLogout?: () => void;
  onNavigateToCourse?: (courseId?: string) => void;
}

export const UserAccountDashboard: React.FC<UserAccountDashboardProps> = ({
  onLogout,
  onNavigateToCourse,
}) => {
  // Selected composition (Modern Bento Grid kept as requested)
  const [activeComposition, setActiveComposition] = useState<UserDesignComposition>('bento-grid');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AccountTabId>('dashboard');

  // Quick AI in-card prompt state
  const [quickAiQuestion, setQuickAiQuestion] = useState('');
  const [quickAiAnswer, setQuickAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI Tab full chat history
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'درود بر شما مهدی عاری گرامی 🌟 من آرماهوش هستم؛ همگام‌ساز سه‌گانه چارت تولد (آسمان)، طبع و ارکان زیستی (مزاج) و ناخودآگاه تحلیلی (روان یونگی). چه پرسشی درباره وضعیت فعلی، تصمیم‌گیری شغلی یا تعادل درونی دارید؟',
      time: '۰۹:۴۰'
    }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Copied invite notification
  const [copiedInvite, setCopiedInvite] = useState(false);

  // User Profile Data matching image.png
  const [userData, setUserData] = useState({
    displayName: 'مهدی عاری',
    plan: 'رایگان',
    balanceToman: 0,
    clubPoints: 51,
    tier: 'برنزی',
    chartsCount: 1,
    aiCount: 0,
    invitedCount: 0,
    streakDays: 1,
    temperament: 'گرم و خشک (صفراوی تعدیل‌شده)',
    sunSign: 'اسد (مرداد ♌)',
    ascendant: 'میزان (ترازو ♎)',
    moonSign: 'حوت (اسفند ♓)',
    rulerPlanet: 'خورشید (☉ Sun)',
    inviteCode: 'ARMAN-MEHDI-789',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'aa01049435967@gmail.com',
    birthDate: '۱۳۷۵/۰۵/۱۸',
    birthTime: '۱۴:۳۵',
    birthCity: 'تهران',
  });

  // Missions list from image.png
  const [missions, setMissions] = useState([
    {
      id: 'astro',
      title: 'این هفته یک نقشۀ آسمان تازه بساز',
      points: 15,
      done: false,
      hrefText: 'برو',
      category: 'آسمان',
    },
    {
      id: 'ai',
      title: 'اولین پرسشت را از هوش مصنوعی بپرس',
      points: 15,
      done: false,
      hrefText: 'برو',
      category: 'روان',
    },
    {
      id: 'consult',
      title: 'مناسبت‌ها را امتحان کن (مقایسهٔ دو چارت)',
      points: 200,
      done: false,
      hrefText: 'برو',
      category: 'آسمان',
    },
    {
      id: 'horoscope',
      title: 'طالع هفتگی این هفته را ببین',
      points: 10,
      done: false,
      hrefText: 'برو',
      category: 'آسمان',
    },
    {
      id: 'streak',
      title: '۳ روز پیوسته سر بزن 🔥',
      points: 25,
      done: false,
      hrefText: 'برو',
      category: 'باشگاه',
    },
    {
      id: 'profile-complete',
      title: 'تکمیل تاریخ و ساعت دقیق تولد در پرونده',
      points: 30,
      done: true,
      hrefText: 'انجام شد',
      category: 'تن و مزاج',
    },
    {
      id: 'invite-friend',
      title: 'دعوت از اولین دوست به آرمانوین',
      points: 50,
      done: false,
      hrefText: 'برو',
      category: 'باشگاه',
    },
  ]);

  // Support tickets
  interface TicketItem {
    id: string;
    title: string;
    date: string;
    status: string;
    priority: string;
    category: string;
    answer?: string;
  }

  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: 'TCK-1042',
      title: 'راهنمایی در مورد دریافت چارت تولد کامل و تفسیر زوایا',
      date: '۱۴۰۳/۰۷/۲۸',
      status: 'پاسخ داده شده',
      priority: 'عادی',
      category: 'تحلیل چارت',
      answer: 'سلام مهدی گرامی، چارت ناتال شما با مختصات شهر تهران با موفقیت ساخته شد. زوایای خورشید و طالع میزان به پرونده شما افزوده شد.'
    },
    {
      id: 'TCK-1039',
      title: 'درخواست مشاوره انطباق مزاج و طالع شغلی',
      date: '۱۴۰۳/۰۷/۱۵',
      status: 'بسته شده',
      priority: 'مهم',
      category: 'مشاوره',
      answer: 'پرونده شما در اختیار مشاور قرار گرفت و فایل صوتی توصیه‌ها در بخش پرونده بارگذاری شده است.'
    }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('مشاوره');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  // New Chart Modal
  const [showNewChartModal, setShowNewChartModal] = useState(false);
  const [newChartName, setNewChartName] = useState('');
  const [newChartDate, setNewChartDate] = useState('');
  const [newChartCity, setNewChartCity] = useState('تهران');
  const [userCharts, setUserCharts] = useState([
    {
      id: 'CH-1',
      title: 'چارت ناتال شخصی مهدی عاری',
      type: 'ناتال تولد (Natal)',
      date: '۱۳۷۵/۰۵/۱۸ ساعت ۱۴:۳۵',
      city: 'تهران',
      ruler: 'خورشید در اسد · طالع میزان',
      status: 'کامل'
    }
  ]);

  // Wallet Recharge Modal
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState<number>(50000);
  const [walletHistory, setWalletHistory] = useState([
    { id: 'TX-901', title: 'پاداش تکمیل ثبت‌نام و عضویت', amount: '+۵۰,۰۰۰ تومان', date: '۱۴۰۳/۰۷/۱۰', type: 'in' },
    { id: 'TX-902', title: 'خرید دسترسی مینی‌دوره حکمت آسمان', amount: '-۵۰,۰۰۰ تومان', date: '۱۴۰۳/۰۷/۱۱', type: 'out' },
  ]);

  // Orders List
  const [orders] = useState([
    {
      id: 'ORD-8821',
      title: 'دسترسی اختصاصی مینی‌دوره حکمت آسمان (آسترولوژی تکاملی)',
      amount: 'رایگان / هدیه عضویت',
      status: 'فعال و تکمیل شده',
      date: '۱۴۰۳/۰۷/۱۰',
    },
    {
      id: 'ORD-8819',
      title: 'بسته جامع تفسیر چارت تولد و استخراج کهن‌الگو',
      amount: 'اعتبار رایگان خوش‌آمدگویی',
      status: 'پردازش‌شده',
      date: '۱۴۰۳/۰۷/۱۲',
    }
  ]);

  // Active Mini Audio Playing state
  const [activeCourseAudio, setActiveCourseAudio] = useState<MiniCourse | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Toggle mission
  const handleToggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newDone = !m.done;
          if (newDone) {
            setUserData((u) => ({ ...u, clubPoints: u.clubPoints + m.points }));
          } else {
            setUserData((u) => ({ ...u, clubPoints: Math.max(0, u.clubPoints - m.points) }));
          }
          return { ...m, done: newDone };
        }
        return m;
      })
    );
  };

  const handleCopyInvite = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`https://armanvein.com/login?ref=${userData.inviteCode}`);
    }
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  const handleSubmitTicket = () => {
    if (!newTicketTitle.trim()) return;
    const newT: TicketItem = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketTitle,
      category: newTicketCategory,
      date: 'هم‌اکنون',
      status: 'در حال بررسی',
      priority: 'عادی',
      answer: undefined
    };
    setTickets((prev) => [newT, ...prev]);
    setNewTicketTitle('');
    setNewTicketMessage('');
    setShowNewTicketModal(false);
  };

  const handleQuickAskAi = (presetQuestion?: string) => {
    const q = presetQuestion || quickAiQuestion;
    if (!q.trim()) return;
    setIsAiLoading(true);
    setQuickAiQuestion(q);
    
    setTimeout(() => {
      let ans = '';
      if (q.includes('ترانزیت') || q.includes('امروز')) {
        ans = 'تحلیل ترانزیت امروز برای مهدی عاری: خورشید در نشان عقرب زاویه تثلیث با زحل ایجاد کرده است. بهترین زمان برای انضباط فکری، مطالعه و تثبیت تصمیمات راهبردی بدون عجله است.';
      } else if (q.includes('مزاج') || q.includes('طبع')) {
        ans = 'بر اساس طبع گرم و خشک (صفراوی) شما و فصل پاییز (سرد و خشک)، پرهیز از ادویه‌های تند، مصرف دمنوش بنفشه یا عناب و حفظ رطوبت پوست و نوشیدن آب کافی توصیه می‌شود.';
      } else {
        ans = `در حال تحلیل سه لایه روان، مزاج و آسمان برای «${q}»... بر اساس طالع ناتال مهدی عاری (خورشید در اسد و طالع میزان)، تلفیق قاطعیت خورشیدی با اعتدال ونوسی کلید تعادل شماست.`;
      }
      setQuickAiAnswer(ans);
      setIsAiLoading(false);
    }, 500);
  };

  const handleSendFullAiChat = () => {
    if (!aiInputText.trim()) return;
    const userMsg = aiInputText;
    const time = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    setAiChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time }]);
    setAiInputText('');
    setUserData((u) => ({ ...u, aiCount: u.aiCount + 1 }));

    setTimeout(() => {
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `پاسخ آرماهوش به «${userMsg}»: در اتصال چارت ناتال شما (طالع میزان با حاکمیت ونوس) و طبع صفراوی تعدیل‌شده، هرگاه تعارض یا تصمیمی شکل می‌گیرد، بازگشت به تعادل عناصر درونی بهترین گام است. آیا مایلید زاویه دقیق کواکب مرتبط را بررسی کنیم؟`,
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const handleCreateChart = () => {
    if (!newChartName.trim()) return;
    const newC = {
      id: `CH-${userCharts.length + 1}`,
      title: newChartName,
      type: 'چارت ناتال / مقایسه‌ای',
      date: newChartDate || '۱۳۸۰/۰۱/۰۱',
      city: newChartCity,
      ruler: 'محاسبه‌شده در سرور',
      status: 'کامل'
    };
    setUserCharts((prev) => [...prev, newC]);
    setUserData((u) => ({ ...u, chartsCount: u.chartsCount + 1 }));
    setNewChartName('');
    setShowNewChartModal(false);
  };

  const handleRechargeWallet = () => {
    setUserData((u) => ({ ...u, balanceToman: u.balanceToman + chargeAmount }));
    setWalletHistory((prev) => [
      {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        title: 'شارژ آنلاین موفق کیف پول',
        amount: `+${chargeAmount.toLocaleString('fa-IR')} تومان`,
        date: 'هم‌اکنون',
        type: 'in'
      },
      ...prev
    ]);
    setShowWalletModal(false);
  };

  // Sidebar Menu Items matching the exact screenshot
  const menuItems: { id: AccountTabId; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: Sun },
    { id: 'courses', label: 'مینی دوره‌ها', icon: BookOpen },
    { id: 'charts', label: 'تحلیل‌های من', icon: Eye },
    { id: 'ai', label: 'هوش مصنوعی', icon: Brain },
    { id: 'orders', label: 'سفارش‌ها', icon: Receipt },
    { id: 'wallet', label: 'کیف پول', icon: Wallet },
    { id: 'income', label: 'کسب درآمد', icon: Sprout },
    { id: 'club', label: 'باشگاه مشتریان', icon: Crown },
    { id: 'portal', label: 'پنل پرونده شخصی', icon: Rocket },
    { id: 'support', label: 'تیکت‌های من', icon: Headphones },
    { id: 'profile', label: 'اطلاعات حساب', icon: User },
  ];

  const compositionsList = [
    { 
      id: 'classic-stacked', 
      title: '۱. ترکیب کلاسیک ستونی', 
      desc: 'تطابق کامل ۱:۱ با چینش اسکرین‌شات شما',
      icon: Layers,
      badge: 'طرح اصلی شما'
    },
    { 
      id: 'bento-grid', 
      title: '۲. ترکیب بنتو گرید مدرن', 
      desc: 'چینش شبکه‌ای هوشمند با کارت‌های تحلیلی و آماری شاخص',
      icon: LayoutGrid,
      badge: 'شبکه‌ای هوشمند'
    },
    { 
      id: 'tri-pillars', 
      title: '۳. ترکیب سه‌ساحت آرمان‌وین', 
      desc: 'دسته‌بندی ارکان سایت در ۳ ستون: آسمان | تن و مزاج | روان',
      icon: Columns,
      badge: 'آسمان · مزاج · روان'
    },
    { 
      id: 'cockpit-command', 
      title: '۴. ترکیب کابین خلبانی', 
      desc: 'مرکز متمرکز مأموریت‌های روزانه، چالش‌ها و اقدام سریع',
      icon: Zap,
      badge: 'گیمیفیکیشن و اقدام'
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-[#040909] text-[#F3EFE6] py-4 sm:py-8 px-3 sm:px-6 select-none font-sans" dir="rtl">
      <div className="max-w-[1020px] mx-auto space-y-4">
        
        {/* ========================================================================= */}
        {/* PROMINENT COMPOSITION SWITCHER: CLEAR, DRAMATIC, HIGH-IMPACT SELECTION     */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#071312] border-2 border-[#1E433C] rounded-2xl p-3 sm:p-4 shadow-xl space-y-3 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#142824] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#43C6AC] animate-ping" />
              <h2 className="text-xs sm:text-sm font-extrabold text-white">
                تغییر چیدمان و ترکیب داشبورد (بر پایه محتوای طرح اختصاصی شما):
              </h2>
            </div>
            <span className="text-[11px] text-[#43C6AC] font-mono bg-[#09221E] px-2.5 py-0.5 rounded-full border border-[#164C42]">
              ترکیب فعال: {compositionsList.find(c => c.id === activeComposition)?.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {compositionsList.map((comp) => {
              const CompIcon = comp.icon;
              const isActive = activeComposition === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveComposition(comp.id as UserDesignComposition)}
                  className={`p-3 rounded-xl text-right transition cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden border ${
                    isActive
                      ? 'bg-gradient-to-br from-[#0B2520] to-[#071715] border-[#43C6AC] ring-2 ring-[#43C6AC]/40 shadow-[0_0_20px_rgba(67,198,172,0.25)]'
                      : 'bg-[#06100F] hover:bg-[#0B1E1B] border-[#142824] hover:border-[#1E433C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-[#097565] text-white' : 'bg-[#0A1A18] text-[#8BA19B]'}`}>
                      {comp.badge}
                    </span>
                    <CompIcon className={`w-4 h-4 ${isActive ? 'text-[#43C6AC]' : 'text-[#8BA19B]'}`} />
                  </div>

                  <div>
                    <span className={`text-xs font-bold block ${isActive ? 'text-white' : 'text-[#A9BAB4]'}`}>
                      {comp.title}
                    </span>
                    <span className="text-[10px] text-[#8BA19B] line-clamp-1 block mt-0.5">
                      {comp.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOP USER CARD (.acct-head) matching image.png                             */}
        {/* ========================================================================= */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-[#071312] border border-[#142824] shadow-md relative overflow-hidden cyber-glow-card">
          <div className="flex items-center justify-between gap-4">
            
            {/* User Greeting & Wealth Bar */}
            <div className="space-y-1.5 text-right">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>سلام، {userData.displayName}</span>
                <span className="text-2xl">🖐🏻</span>
              </h1>
              
              <div className="flex items-center gap-2 text-xs text-[#8BA19B] font-medium">
                <span>سطح: {userData.plan}</span>
                <span className="text-[#1E433C]">|</span>
                <span className="text-[#A9BAB4]">طبع: {userData.temperament}</span>
              </div>

              {/* Wealth Bar matching image.png */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-medium text-[#43C6AC]">
                <button 
                  onClick={() => setShowWalletModal(true)}
                  className="hover:underline cursor-pointer flex items-center gap-1.5 group"
                  title="کلیک برای افزایش موجودی"
                >
                  <span>موجودی</span>
                  <b className="font-bold font-mono text-white group-hover:text-[#43C6AC] transition">{userData.balanceToman}</b>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#09221E] text-[#43C6AC] border border-[#164C42] group-hover:bg-[#097565] group-hover:text-white transition">+ شارژ</span>
                </button>
                
                <span className="text-white">·</span>
                
                <button 
                  onClick={() => setActiveTab('club')}
                  className="hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>امتیاز</span>
                  <b className="font-bold font-mono text-white">{userData.clubPoints}</b>
                  <span className="text-[#38BDF8]">· {userData.tier}</span>
                </button>
              </div>
            </div>

            {/* Sacred Lotus Mandala Avatar Badge (Exact match to image.png) */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0E2421] to-[#051110] border-2 border-[#1E433C] p-2 flex items-center justify-center shadow-[0_0_25px_rgba(67,198,172,0.25)] group hover:border-[#43C6AC] transition duration-300">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(67,198,172,0.6)]">
                  <defs>
                    <linearGradient id="avatarLotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#43C6AC" />
                      <stop offset="50%" stopColor="#D4B483" />
                      <stop offset="100%" stopColor="#087F6E" />
                    </linearGradient>
                  </defs>
                  {/* Central Diamond */}
                  <polygon points="50,15 65,50 50,85 35,50" fill="none" stroke="url(#avatarLotusGrad)" strokeWidth="2.5" />
                  <polygon points="15,50 50,35 85,50 50,65" fill="none" stroke="url(#avatarLotusGrad)" strokeWidth="2" opacity="0.8" />
                  {/* Outer Circles */}
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#43C6AC" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <circle cx="50" cy="50" r="12" fill="url(#avatarLotusGrad)" opacity="0.3" />
                  <circle cx="50" cy="50" r="4" fill="#D4B483" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: 2 COLUMNS (RIGHT MENU, LEFT CONTENT) EXACTLY AS IN IMAGE.PNG   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: ACTIVE CONTENT (RESPONDS DIRECTLY TO COMPOSITION SWITCHER) */}
          {/* ======================================================================= */}
          <div className="space-y-4 order-2 lg:order-1">
            
            {activeTab === 'dashboard' && (
              <div className="space-y-4 animate-fade-in text-right">
                
                {/* ----------------------------------------------------------------- */}
                {/* COMPOSITION 1: CLASSIC STACKED (تطابق کامل ۱:۱ با اسکرین‌شات شما) */}
                {/* ----------------------------------------------------------------- */}
                {activeComposition === 'classic-stacked' && (
                  <div className="space-y-3.5">
                    {/* 1. Hero Card: پنل پرونده شخصی */}
                    <div className="rounded-2xl p-5 sm:p-6 bg-[#071312] border border-[#142824] shadow-md cyber-glow-card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          onClick={() => setActiveTab('portal')}
                          className="order-2 sm:order-1 px-5 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(9,117,101,0.4)] transition cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
                        >
                          <span>ورود به پنل پرونده شخصی ←</span>
                        </button>

                        <div className="order-1 sm:order-2 space-y-1 text-right">
                          <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                            پنل پرونده شخصی
                          </h2>
                          <p className="text-xs sm:text-sm text-[#8BA19B] font-light leading-relaxed">
                            چهار بخش پرونده، پیام مشاور و هماهنگی جلسه — همه در یک‌جا.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Quickstart Card: از کجا شروع کنم؟ */}
                    <div className="rounded-2xl p-5 bg-[#071312] border border-[#142824] shadow-md cyber-glow-card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          onClick={() => setActiveTab('courses')}
                          className="order-2 sm:order-1 px-4 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold shadow-[0_0_15px_rgba(9,117,101,0.3)] transition cursor-pointer shrink-0 self-start sm:self-auto"
                        >
                          <span>شروع سریع در راهنمای آرمانوین</span>
                        </button>

                        <div className="order-1 sm:order-2 space-y-1 text-right">
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            از کجا شروع کنم؟
                          </h3>
                          <p className="text-xs text-[#8BA19B] font-light leading-relaxed">
                            راهنمای قدم‌به‌قدم سایت — چهار قدم از حساب تا پروندۀ مشاوره، با نقشۀ دکمه‌ها.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Next Action Card: الان آرماهوش را روی چارتت باز کن */}
                    <div className="rounded-2xl p-5 bg-[#071312] border border-[#142824] shadow-md cyber-glow-card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          onClick={() => setActiveTab('ai')}
                          className="order-2 sm:order-1 px-5 py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold shadow-[0_0_15px_rgba(9,117,101,0.3)] transition cursor-pointer shrink-0 self-start sm:self-auto"
                        >
                          <span>برو</span>
                        </button>

                        <div className="order-1 sm:order-2 space-y-1 text-right">
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            الان آرماهوش را روی چارتت باز کن
                          </h3>
                          <p className="text-xs text-[#8BA19B] font-light leading-relaxed">
                            سه لایۀ روان، مزاج و آسمان روی همین صفحه جمع می‌شود.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4. Stat Chips Bar matching image.png */}
                    <div className="rounded-2xl p-3.5 sm:p-4 bg-[#071312] border border-[#142824] shadow-md flex flex-wrap items-center justify-start gap-2 cyber-glow-card">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#09221E] border border-[#164C42] text-[#43C6AC] text-xs font-bold flex items-center gap-1.5">
                        <b className="font-mono">{userData.chartsCount}</b>
                        <span>تحلیل ساخته‌شده</span>
                      </span>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#081716] border border-[#142C27] text-[#A9BAB4] text-xs font-medium flex items-center gap-1.5">
                        <b className="font-mono text-emerald-400">{userData.clubPoints}</b>
                        <span>امتیاز باشگاه</span>
                      </span>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#081716] border border-[#142C27] text-[#D4B483] text-xs font-medium">
                        رتبهٔ {userData.tier}
                      </span>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#081716] border border-[#142C27] text-[#A9BAB4] text-xs flex items-center gap-1.5">
                        <b className="font-mono text-white">{userData.aiCount}</b>
                        <span>پرسش هوش مصنوعی</span>
                      </span>

                      <span className="px-3 py-1.5 rounded-full bg-[#081716] border border-[#142C27] text-[#8BA19B] text-xs font-mono">
                        □ …
                      </span>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#081716] border border-[#142C27] text-[#A9BAB4] text-xs flex items-center gap-1.5">
                        <b className="font-mono text-white">{userData.invitedCount}</b>
                        <span>دعوت موفق</span>
                      </span>
                    </div>

                    {/* 5. Missions Section: ★ مأموریت‌های تو */}
                    <div className="rounded-2xl p-5 bg-[#071312] border border-[#142824] shadow-md space-y-3">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[11px] text-[#8BA19B]">
                          با انجام هر مأموریت امتیاز باشگاه دریافت کنید
                        </span>

                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>★ مأموریت‌های تو</span>
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {missions.map((m) => (
                          <div
                            key={m.id}
                            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                              m.done 
                                ? 'bg-[#091D1A]/50 border-emerald-900/60 opacity-80' 
                                : 'bg-[#06100F] border-[#122421] hover:border-[#1E3B34]'
                            }`}
                          >
                            <button
                              onClick={() => handleToggleMission(m.id)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 border ${
                                m.done 
                                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' 
                                  : 'bg-[#081514] hover:bg-[#0E201E] text-white border-[#19322D]'
                              }`}
                            >
                              {m.done ? 'انجام شد ✓' : m.hrefText}
                            </button>

                            <div className="flex items-center gap-3 text-right">
                              <span className="text-xs font-bold text-[#43C6AC] font-mono">
                                {m.points}+
                              </span>
                              <span className={`text-xs sm:text-[13px] ${m.done ? 'line-through text-slate-400' : 'text-[#E8E2D5]'}`}>
                                {m.title}
                              </span>
                              <span className="text-sm">
                                {m.done ? '✓' : '□'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* COMPOSITION 2: BENTO GRID (چیدمان شبکه‌ای مدرن و ۲ ستونه)          */}
                {/* ----------------------------------------------------------------- */}
                {activeComposition === 'bento-grid' && (
                  <div className="space-y-3.5 animate-fade-in">
                    
                    {/* Top Row: 4 Metric Cards with Cyber-Glow */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3.5 rounded-2xl bg-[#071312] border border-[#142824] text-right space-y-1 cyber-glow-card cursor-pointer group" onClick={() => setActiveTab('charts')}>
                        <span className="text-[11px] text-[#8BA19B] flex items-center gap-1 group-hover:text-[#43C6AC] transition">
                          <Eye className="w-3.5 h-3.5 text-[#43C6AC]" />
                          <span>تحلیل‌های من</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-mono text-[#43C6AC] group-hover:scale-105 transition-transform duration-200">{userData.chartsCount}</span>
                          <span className="text-[10px] text-slate-400">چارت ناتال</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#071312] border border-[#142824] text-right space-y-1 cyber-glow-card cursor-pointer group" onClick={() => setActiveTab('club')}>
                        <span className="text-[11px] text-[#8BA19B] flex items-center gap-1 group-hover:text-[#D4B483] transition">
                          <Crown className="w-3.5 h-3.5 text-[#D4B483]" />
                          <span>امتیاز باشگاه</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-mono text-[#D4B483] group-hover:scale-105 transition-transform duration-200">{userData.clubPoints}</span>
                          <span className="text-[10px] text-[#38BDF8]">رتبه {userData.tier}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#071312] border border-[#142824] text-right space-y-1 cyber-glow-card cursor-pointer group" onClick={() => setActiveTab('ai')}>
                        <span className="text-[11px] text-[#8BA19B] flex items-center gap-1 group-hover:text-purple-300 transition">
                          <Brain className="w-3.5 h-3.5 text-purple-400" />
                          <span>پرسش هوش</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-mono text-white group-hover:text-[#43C6AC] group-hover:scale-105 transition-all duration-200">{userData.aiCount}</span>
                          <span className="text-[10px] text-slate-400">آرماهوش</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#071312] border border-[#142824] text-right space-y-1 cyber-glow-card cursor-pointer group">
                        <span className="text-[11px] text-[#8BA19B] flex items-center gap-1 group-hover:text-amber-400 transition">
                          <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          <span>استریک حضور</span>
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-mono text-amber-400 group-hover:scale-105 transition-transform duration-200">{userData.streakDays}</span>
                          <span className="text-[10px] text-slate-400">روز متوالی</span>
                        </div>
                      </div>
                    </div>

                    {/* Bento Grid: 2 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      
                      {/* Right Bento Column: 7 Cols (Dossier & AI Interactive) */}
                      <div className="md:col-span-7 space-y-3.5">
                        
                        {/* Dossier Bento Card with Cyber-Glow */}
                        <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-4 cyber-glow-card">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                              پرونده متمرکز
                            </span>
                            <h3 className="text-base font-bold text-white font-serif">پنل پرونده شخصی</h3>
                          </div>
                          
                          <p className="text-xs text-[#8BA19B] leading-relaxed">
                            چهار بخش پرونده، پیام مشاور و هماهنگی جلسه — همه در یک‌جا.
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-[#06100F] border border-[#142824] hover:border-[#43C6AC]/50 transition-colors duration-200 space-y-0.5 group">
                              <span className="text-[11px] text-[#43C6AC] font-bold block group-hover:text-emerald-300">طبع و مزاج</span>
                              <span className="text-[10px] text-slate-300">گرم و خشک (صفراوی)</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#06100F] border border-[#142824] hover:border-[#43C6AC]/50 transition-colors duration-200 space-y-0.5 group">
                              <span className="text-[11px] text-[#43C6AC] font-bold block group-hover:text-emerald-300">طالع ناتال</span>
                              <span className="text-[10px] text-slate-300">اسد ♌ · طالع میزان ♎</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveTab('portal')}
                            className="w-full py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <span>ورود به پنل پرونده شخصی ←</span>
                          </button>
                        </div>

                        {/* Interactive Armahosh Card with Cyber-Glow */}
                        <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 cyber-glow-card">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setActiveTab('ai')}
                              className="text-xs text-[#43C6AC] hover:underline"
                            >
                              صفحه کامل آرماهوش ←
                            </button>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <Brain className="w-4 h-4 text-[#43C6AC]" />
                              <span>الان آرماهوش را روی چارتت باز کن</span>
                            </h3>
                          </div>

                          <p className="text-xs text-[#8BA19B]">
                            سه لایۀ روان، مزاج و آسمان روی همین صفحه جمع می‌شود.
                          </p>

                          {/* Quick chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {['تحلیل ترانزیت امروز', 'توصیه مزاجی من'].map((chip, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickAskAi(chip)}
                                className="px-2.5 py-1 rounded-lg bg-[#081816] hover:bg-[#0E2824] text-[#43C6AC] hover:text-white border border-[#164239] hover:border-[#43C6AC]/60 text-[11px] transition cursor-pointer"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={quickAiQuestion}
                              onChange={(e) => setQuickAiQuestion(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickAskAi()}
                              placeholder="سؤال خود را بنویسید..."
                              className="flex-1 bg-[#06100F] border border-[#142824] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-right"
                            />
                            <button
                              onClick={() => handleQuickAskAi()}
                              disabled={isAiLoading}
                              className="px-4 py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold cursor-pointer transition shadow-sm"
                            >
                              {isAiLoading ? '...' : 'برو'}
                            </button>
                          </div>

                          {quickAiAnswer && (
                            <div className="p-3 rounded-xl bg-[#081C18] border border-[#1E4D43] text-xs text-[#A9BAB4] leading-relaxed animate-fade-in">
                              <strong className="block text-[#43C6AC] mb-1">پاسخ آرماهوش:</strong>
                              {quickAiAnswer}
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Left Bento Column: 5 Cols (Guide & Missions) */}
                      <div className="md:col-span-5 space-y-3.5">
                        
                        {/* Guide Card with Cyber-Glow */}
                        <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 cyber-glow-card">
                          <h3 className="text-sm font-bold text-white">از کجا شروع کنم؟</h3>
                          <p className="text-xs text-[#8BA19B] leading-relaxed">
                            راهنمای قدم‌به‌قدم سایت — چهار قدم از حساب تا پروندۀ مشاوره، با نقشۀ دکمه‌ها.
                          </p>

                          <div className="space-y-1.5 text-xs text-slate-300">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#06100F] border border-[#142824] hover:border-[#43C6AC]/40 transition">
                              <span className="w-4 h-4 rounded-full bg-[#097565] text-white flex items-center justify-center text-[10px] font-bold">۱</span>
                              <span>تکمیل پروفایل و تولد</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#06100F] border border-[#142824] hover:border-[#43C6AC]/40 transition">
                              <span className="w-4 h-4 rounded-full bg-[#097565] text-white flex items-center justify-center text-[10px] font-bold">۲</span>
                              <span>مشاهده نقشه آسمان</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#06100F] border border-[#142824] hover:border-[#43C6AC]/40 transition">
                              <span className="w-4 h-4 rounded-full bg-[#097565] text-white flex items-center justify-center text-[10px] font-bold">۳</span>
                              <span>پرسش از آرماهوش</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveTab('courses')}
                            className="w-full py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer shadow-sm"
                          >
                            شروع سریع در راهنمای آرمانوین
                          </button>
                        </div>

                        {/* Missions Bento Card with Cyber-Glow */}
                        <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 cyber-glow-card">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#43C6AC] font-mono">
                              {missions.filter(m => m.done).length} از {missions.length} انجام شده
                            </span>
                            <h3 className="text-sm font-bold text-white">★ مأموریت‌های تو</h3>
                          </div>

                          <div className="space-y-2">
                            {missions.slice(0, 4).map((m) => (
                              <div
                                key={m.id}
                                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all duration-200 ${
                                  m.done 
                                    ? 'bg-[#091D1A]/40 border-emerald-900/40 opacity-70' 
                                    : 'bg-[#06100F] border-[#142824] hover:border-[#43C6AC]/50 hover:bg-[#091D1A]/30'
                                }`}
                              >
                                <button
                                  onClick={() => handleToggleMission(m.id)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition cursor-pointer ${
                                    m.done ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' : 'bg-[#081514] hover:bg-[#0E201E] text-white border-[#19322D]'
                                  }`}
                                >
                                  {m.done ? '✓' : m.hrefText}
                                </button>
                                <div className="text-right flex-1 truncate">
                                  <span className={`truncate block ${m.done ? 'line-through text-slate-400' : 'text-[#E8E2D5]'}`}>
                                    {m.title}
                                  </span>
                                </div>
                                <span className="font-mono text-[#43C6AC] font-bold text-[11px]">{m.points}+</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* COMPOSITION 3: TRI-PILLARS (آسمان | تن و مزاج | روان و هوش)       */}
                {/* ----------------------------------------------------------------- */}
                {activeComposition === 'tri-pillars' && (
                  <div className="space-y-3.5 animate-fade-in">
                    
                    {/* Top Philosophy Intro */}
                    <div className="p-4 rounded-2xl bg-[#071312] border border-[#1E433C] flex items-center justify-between">
                      <span className="text-xs text-[#8BA19B]">چیدمان متمرکز بر سه ستون اصیل آرمان‌وین</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#09221E] text-[#43C6AC] text-xs font-bold border border-[#164C42]">
                          آسمان · تن · روان
                        </span>
                      </div>
                    </div>

                    {/* 3 Pillars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      
                      {/* Pillar 1: آسمان و چارت */}
                      <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 text-right flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-[#142824] pb-2">
                            <span className="text-[10px] text-[#43C6AC] font-bold bg-[#09221E] px-2 py-0.5 rounded">ستاد آسمان</span>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <Compass className="w-4 h-4 text-[#43C6AC]" />
                              <span>۱. نقشه آسمان</span>
                            </h3>
                          </div>

                          <p className="text-xs text-[#8BA19B]">
                            چارت ناتال، مدار خورشید و گذر کواکب
                          </p>

                          <div className="p-3 rounded-xl bg-[#06100F] border border-[#142824] space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">برج خورشیدی:</span>
                              <span className="font-bold text-[#43C6AC]">{userData.sunSign}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">طالع صعودی:</span>
                              <span className="font-bold text-white">{userData.ascendant}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">سیاره حاکم:</span>
                              <span className="font-bold text-[#D4B483]">{userData.rulerPlanet}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('charts')}
                          className="w-full py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer"
                        >
                          مشاهده چارت‌ها ←
                        </button>
                      </div>

                      {/* Pillar 2: تن و مزاج */}
                      <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 text-right flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-[#142824] pb-2">
                            <span className="text-[10px] text-[#D4B483] font-bold bg-[#141F1A] px-2 py-0.5 rounded">ستاد تن</span>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <Flame className="w-4 h-4 text-[#D4B483]" />
                              <span>۲. طبع و مزاج</span>
                            </h3>
                          </div>

                          <p className="text-xs text-[#8BA19B]">
                            ارکان چهارگانه بدن، تدابیر فصلی و سلامت
                          </p>

                          <div className="p-3 rounded-xl bg-[#06100F] border border-[#142824] space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">طبع سرشتی:</span>
                              <span className="font-bold text-white">گرم و خشک</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">خلط غالب:</span>
                              <span className="font-bold text-[#D4B483]">صفراوی تعدیل‌شده</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">تدبیر فصل:</span>
                              <span className="font-bold text-emerald-400">تعدیل خشکی پاییز</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('portal')}
                          className="w-full py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer"
                        >
                          پنل پرونده شخصی ←
                        </button>
                      </div>

                      {/* Pillar 3: روان و کهن‌الگو */}
                      <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-3 text-right flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-[#142824] pb-2">
                            <span className="text-[10px] text-purple-400 font-bold bg-[#1A1624] px-2 py-0.5 rounded">ستاد روان</span>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <Brain className="w-4 h-4 text-purple-400" />
                              <span>۳. روان و آرماهوش</span>
                            </h3>
                          </div>

                          <p className="text-xs text-[#8BA19B]">
                            کهن‌الگوهای یونگی، سایه‌ها و هوش مصنوعی
                          </p>

                          <div className="p-3 rounded-xl bg-[#06100F] border border-[#142824] space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">کهن‌الگو:</span>
                              <span className="font-bold text-white">جوینده و خردمند</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">وضعیت سایه:</span>
                              <span className="font-bold text-purple-300">در حال یکپارچه‌سازی</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#8BA19B]">آرماهوش:</span>
                              <span className="font-bold text-[#43C6AC]">آماده پرسش</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('ai')}
                          className="w-full py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer"
                        >
                          الان آرماهوش را باز کن ←
                        </button>
                      </div>

                    </div>

                    {/* Integrated Missions for Tri-Pillars */}
                    <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8BA19B]">مأموریت‌های توزیع‌شده بر سه ساحت</span>
                        <h3 className="text-sm font-bold text-white">★ مأموریت‌های هفتگی</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {missions.slice(0, 4).map((m) => (
                          <div key={m.id} className="p-3 rounded-xl bg-[#06100F] border border-[#142824] flex items-center justify-between gap-2">
                            <button
                              onClick={() => handleToggleMission(m.id)}
                              className={`px-3 py-1 rounded text-xs font-medium border ${
                                m.done ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' : 'bg-[#081514] text-white border-[#19322D]'
                              }`}
                            >
                              {m.done ? 'انجام شد ✓' : m.hrefText}
                            </button>
                            <span className="text-right truncate">{m.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* COMPOSITION 4: COCKPIT COMMAND (کابین خلبانی و مرکز عملیات پیشرفت) */}
                {/* ----------------------------------------------------------------- */}
                {activeComposition === 'cockpit-command' && (
                  <div className="space-y-3.5 animate-fade-in">
                    
                    {/* Cockpit Status Toolbar */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#071715] via-[#071312] to-[#0B2520] border-2 border-[#1E433C] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 rounded-xl bg-[#09221E] text-[#43C6AC] font-bold border border-[#164C42] flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                          <span>استریک فعال: {userData.streakDays} روز پیوسته</span>
                        </span>
                        <span className="text-white font-mono">
                          سطح {userData.tier} · {userData.clubPoints} امتیاز
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowWalletModal(true)}
                          className="px-3 py-1 rounded-lg bg-[#097565] text-white font-bold"
                        >
                          + شارژ کیف پول ({userData.balanceToman} ت)
                        </button>
                      </div>
                    </div>

                    {/* Cockpit 2-Column Split: Actions Pod & Quest Center */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      
                      {/* Left Pod: 3 Quick Action Cards */}
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-2 text-right">
                          <span className="text-[10px] text-[#43C6AC] font-bold uppercase tracking-wider block">اکشن شماره ۱</span>
                          <h3 className="text-sm font-bold text-white">پنل پرونده شخصی</h3>
                          <p className="text-xs text-[#8BA19B]">چهار بخش پرونده، پیام مشاور و هماهنگی جلسه — همه در یک‌جا.</p>
                          <button
                            onClick={() => setActiveTab('portal')}
                            className="w-full py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition"
                          >
                            ورود مستقیم به پرونده ←
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-2 text-right">
                          <span className="text-[10px] text-[#D4B483] font-bold uppercase tracking-wider block">اکشن شماره ۲</span>
                          <h3 className="text-sm font-bold text-white">الان آرماهوش را روی چارتت باز کن</h3>
                          <p className="text-xs text-[#8BA19B]">سه لایۀ روان، مزاج و آسمان روی همین صفحه جمع می‌شود.</p>
                          <button
                            onClick={() => setActiveTab('ai')}
                            className="w-full py-2 rounded-xl bg-[#081816] hover:bg-[#0E2824] border border-[#164239] text-[#43C6AC] text-xs font-bold transition"
                          >
                            باز کردن کنسول آرماهوش ←
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#071312] border border-[#142824] space-y-2 text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">اکشن شماره ۳</span>
                          <h3 className="text-sm font-bold text-white">از کجا شروع کنم؟</h3>
                          <p className="text-xs text-[#8BA19B]">راهنمای قدم‌به‌قدم سایت — چهار قدم از حساب تا پروندۀ مشاوره.</p>
                          <button
                            onClick={() => setActiveTab('courses')}
                            className="w-full py-2 rounded-xl bg-[#06100F] hover:bg-[#0A1A18] border border-[#142824] text-slate-200 text-xs font-bold transition"
                          >
                            راهنمای قدم‌به‌قدم آرمانوین ←
                          </button>
                        </div>
                      </div>

                      {/* Right Pod: Quest Center (مأموریت‌های فعال) */}
                      <div className="p-5 rounded-2xl bg-[#071312] border border-[#142824] space-y-3.5 text-right flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-[#142824] pb-2">
                            <span className="text-xs font-mono text-[#D4B483] font-bold">
                              {missions.reduce((acc, m) => acc + (m.done ? m.points : 0), 0)} امتیاز کسب‌شده
                            </span>
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-amber-400" />
                              <span>مرکز مأموریت‌ها و چالش‌ها</span>
                            </h3>
                          </div>

                          <div className="space-y-2">
                            {missions.map((m) => (
                              <div
                                key={m.id}
                                className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                                  m.done ? 'bg-[#091D1A]/50 border-emerald-900/60' : 'bg-[#06100F] border-[#142824]'
                                }`}
                              >
                                <button
                                  onClick={() => handleToggleMission(m.id)}
                                  className={`px-3 py-1 rounded text-xs font-bold transition border ${
                                    m.done ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' : 'bg-[#097565] text-white border-transparent'
                                  }`}
                                >
                                  {m.done ? 'انجام شد ✓' : 'انجام و دریافت'}
                                </button>

                                <div className="text-right flex-1 truncate">
                                  <span className={`block truncate ${m.done ? 'line-through text-slate-400' : 'text-white'}`}>
                                    {m.title}
                                  </span>
                                </div>

                                <span className="text-xs font-mono font-bold text-[#43C6AC]">
                                  {m.points}+
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={handleCopyInvite}
                          className="w-full py-2.5 rounded-xl bg-[#0A1A18] hover:bg-[#0E2421] text-[#D4B483] border border-[#D4B483]/30 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
                          <span>{copiedInvite ? 'لینک کپی شد!' : '✦ دعوت دوستان و دریافت ۵۰ امتیاز'}</span>
                        </button>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}

            {/* ======================================================================= */}
            {/* SUB-TABS: FULLY BUILT ACCORDING TO USER'S SPECIALIZED DESIGN            */}
            {/* ======================================================================= */}

            {/* TAB: مینی دوره‌ها */}
            {activeTab === 'courses' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">مینی دوره‌های من</h3>
                    <p className="text-xs text-[#8BA19B]">دوره‌های شنیداری تخصصی آرمانوین در سه ساحت حکمت آسمان، مزاج و روانشناسی</p>
                  </div>
                  <span className="text-xs text-[#43C6AC] font-mono bg-[#09221E] px-3 py-1 rounded-xl border border-[#164C42] self-start sm:self-auto">
                    {MINI_COURSES_DATA.length} دوره فعال
                  </span>
                </div>

                <div className="space-y-3.5">
                  {MINI_COURSES_DATA.map((c) => (
                    <div 
                      key={c.id} 
                      className="p-4 sm:p-5 rounded-2xl bg-[#06100F] border border-[#142824] hover:border-[#1E433C] transition space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="order-2 sm:order-1 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveCourseAudio(activeCourseAudio?.id === c.id ? null : c);
                              setIsPlayingAudio(activeCourseAudio?.id !== c.id);
                            }}
                            className="px-4 py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                          >
                            {activeCourseAudio?.id === c.id && isPlayingAudio ? (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span>توقف پخش</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                <span>شنیدن دوره</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="order-1 sm:order-2 space-y-1 text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-[#0C1E1B] text-[#D4B483] border border-[#142824]">
                              {c.categoryLabel}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-white font-serif">{c.title}</h4>
                          </div>
                          <p className="text-xs text-[#8BA19B]">{c.subtitle}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-[#10221F]">
                        <div className="flex items-center justify-between text-[11px] text-[#8BA19B]">
                          <span>پیشرفت شما: {c.completedSessions} از {c.sessionCount} جلسه</span>
                          <span className="font-mono text-[#43C6AC] font-bold">{c.progressPercent}٪</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#0E201E] overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-l from-[#43C6AC] to-[#097565] rounded-full transition-all duration-500"
                            style={{ width: `${c.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {activeCourseAudio?.id === c.id && (
                        <div className="mt-3 p-3.5 rounded-xl bg-[#091D1A] border border-[#1E4D43] flex items-center justify-between gap-3 text-xs animate-fade-in">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                              className="w-8 h-8 rounded-full bg-[#43C6AC] text-[#040909] flex items-center justify-center font-bold"
                            >
                              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 mr-0.5" />}
                            </button>
                            <div>
                              <span className="font-bold text-white block">جلسه ۱: {c.lessons[0]?.title}</span>
                              <span className="text-[11px] text-[#8BA19B]">مدت فایل: {c.lessons[0]?.duration} دقیقه</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-emerald-300 font-mono animate-pulse">
                            {isPlayingAudio ? 'در حال پخش...' : 'متوقف'}
                          </span>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: تحلیل‌های من (چارت‌ها) */}
            {activeTab === 'charts' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">تحلیل‌های آسمان من</h3>
                    <p className="text-xs text-[#8BA19B]">چارت‌های ناتال تولد، نقشه‌های مقایسه‌ای (سیناستری) و ترانزیت‌های ثبت‌شده</p>
                  </div>
                  <button
                    onClick={() => setShowNewChartModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ساخت چارت جدید</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {userCharts.map((ch) => (
                    <div key={ch.id} className="p-4 sm:p-5 rounded-2xl bg-[#06100F] border border-[#142824] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 order-2 sm:order-1">
                          <button 
                            onClick={() => setActiveComposition('tri-pillars')}
                            className="px-3.5 py-1.5 rounded-lg bg-[#09221E] hover:bg-[#0E332D] text-[#43C6AC] border border-[#164C42] text-xs font-medium cursor-pointer"
                          >
                            مشاهده دایره‌البروج
                          </button>
                        </div>
                        <div className="space-y-1 text-right order-1 sm:order-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#0A1A18] text-[#D4B483] border border-[#142824] text-[10px]">
                              {ch.type}
                            </span>
                            <h4 className="text-sm font-bold text-white">{ch.title}</h4>
                          </div>
                          <p className="text-xs text-[#8BA19B] flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#43C6AC]" />
                            <span>{ch.date}</span>
                            <span>·</span>
                            <MapPin className="w-3.5 h-3.5 text-[#43C6AC]" />
                            <span>{ch.city}</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081816] border border-[#122B26] text-xs text-slate-300 flex items-center justify-between">
                        <span>خلاصه وضعیت: <b>{ch.ruler}</b></span>
                        <span className="text-[#43C6AC] text-[11px]">وضعیت: محاسبه‌شده دقیق</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: هوش مصنوعی آرماهوش */}
            {activeTab === 'ai' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-5 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">دستیار تحلیلی آرماهوش</h3>
                    <p className="text-xs text-[#8BA19B]">ترکیب همزمان سه‌گانه آسمان (چارت ناتال)، مزاج زیستی و کهن‌الگوهای روانشناسی</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-[#09221E] text-[#43C6AC] text-xs font-mono border border-[#164C42] self-start sm:self-auto">
                    آنلاین روی چارت مهدی عاری
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-[#8BA19B]">پرسش‌های سریع و کلیدی:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'تأثیر ترانزیت زحل روی شغل من',
                      'تعدیل طبع صفرا در فصل پاییز',
                      'کهن‌الگوی فعال و سایه در چارت من',
                      'توصیه ورزشی و تنفسی مناسب من'
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAiInputText(chip);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#06100F] hover:bg-[#0B1E1B] text-[#D4B483] border border-[#142824] hover:border-[#D4B483]/40 text-xs transition cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-72 overflow-y-auto p-4 rounded-2xl bg-[#050C0C] border border-[#142824] space-y-3.5 scrollbar-thin">
                  {aiChatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#097565] text-white rounded-tl-none text-right'
                            : 'bg-[#081816] border border-[#164239] text-[#E8E2D5] rounded-tr-none text-right'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="block text-[10px] text-slate-400 mt-1.5 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendFullAiChat()}
                    placeholder="پرسش خود را از آرماهوش بنویسید..."
                    className="flex-1 bg-[#06100F] border border-[#142824] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-right"
                  />
                  <button
                    onClick={handleSendFullAiChat}
                    className="px-5 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>ارسال</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB: سفارش‌ها */}
            {activeTab === 'orders' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-5 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4">
                  <h3 className="text-lg font-bold text-white font-serif">سفارش‌ها و بسته‌ها</h3>
                  <p className="text-xs text-[#8BA19B]">تاریخچه خرید بسته‌های آموزشی، تحلیل ناتال و مشاوره‌ها</p>
                </div>

                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 rounded-xl bg-[#06100F] border border-[#142824] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 order-2 sm:order-1">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-[11px] font-bold">
                          {o.status}
                        </span>
                        <span className="text-xs font-mono text-[#D4B483]">{o.amount}</span>
                      </div>

                      <div className="space-y-1 text-right order-1 sm:order-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#8BA19B]">{o.id}</span>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{o.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#8BA19B]">تاریخ ثبت: {o.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: کیف پول */}
            {activeTab === 'wallet' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">کیف پول آرمانوین</h3>
                    <p className="text-xs text-[#8BA19B]">موجودی نقدی، شارژ آنلاین و تراکنش‌های حساب</p>
                  </div>
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزایش موجودی</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#06100F] border border-[#142824] flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-[#43C6AC] block">
                      {userData.balanceToman.toLocaleString('fa-IR')}
                    </span>
                    <span className="text-xs text-[#8BA19B]">تومان</span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs text-[#8BA19B]">موجودی قابل استفاده در کلیه بخش‌های سایت</span>
                    <h4 className="text-sm font-bold text-white">اعتبار کیف پول من</h4>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white">تاریخچه تراکنش‌ها:</h4>
                  {walletHistory.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-xl bg-[#06100F] border border-[#142824] flex items-center justify-between text-xs">
                      <span className={`font-mono font-bold ${w.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {w.amount}
                      </span>
                      <div className="text-right">
                        <span className="text-white font-medium block">{w.title}</span>
                        <span className="text-[11px] text-[#8BA19B] font-mono">{w.id} · {w.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: کسب درآمد */}
            {activeTab === 'income' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4">
                  <h3 className="text-lg font-bold text-white font-serif">کسب درآمد و معرفی دوستان</h3>
                  <p className="text-xs text-[#8BA19B]">با معرفی آرمانوین به علاقه‌مندان خودشناسی، ۲۰٪ از هر خرید به عنوان پاداش به کیف پول شما اضافه می‌شود</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-1">
                    <span className="text-xs text-[#8BA19B]">تعداد کلیک لینک:</span>
                    <span className="text-lg font-bold font-mono text-white block">۲۴</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-1">
                    <span className="text-xs text-[#8BA19B]">عضویت موفق:</span>
                    <span className="text-lg font-bold font-mono text-[#43C6AC] block">{userData.invitedCount}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-1">
                    <span className="text-xs text-[#8BA19B]">درآمد کسب‌شده:</span>
                    <span className="text-lg font-bold font-mono text-[#D4B483] block">۰ ت</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-3">
                  <span className="text-xs text-white font-bold block">لینک دعوت اختصاصی شما:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyInvite}
                      className="px-4 py-2 rounded-lg bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedInvite ? 'کپی شد!' : 'کپی لینک'}</span>
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={`https://armanvein.com/login?ref=${userData.inviteCode}`}
                      className="flex-1 bg-[#040909] border border-[#142824] rounded-lg px-3 py-2 text-xs font-mono text-slate-300 text-left"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: باشگاه مشتریان */}
            {activeTab === 'club' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">باشگاه مشتریان و امتیازات</h3>
                    <p className="text-xs text-[#8BA19B]">با فعالیت در سایت امتیاز بگیرید و کدهای تخفیف و بسته‌های هدیه دریافت کنید</p>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-2xl font-bold text-[#D4B483]">{userData.clubPoints}</span>
                    <span className="text-xs text-[#8BA19B] mr-1">امتیاز کسب‌شده</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#38BDF8] font-bold">سطح بعدی: نقره‌ای (۱۰۰ امتیاز)</span>
                    <span className="text-white font-bold">رتبه فعلی: {userData.tier}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0E201E] overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-l from-[#D4B483] to-[#43C6AC] rounded-full"
                      style={{ width: `${(userData.clubPoints / 100) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#8BA19B]">تنها ۴۹ امتیاز دیگر تا ارتقا به رتبه نقره‌ای و دریافت ۲۰٪ تخفیف روی جلسات مشاوره</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white">جوایز و هدایای قابل فعال‌سازی با امتیاز:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">کوپن تخفیف ۲۰٪ دوره‌ها</span>
                        <span className="text-xs font-mono text-[#D4B483]">۵۰ امتیاز</span>
                      </div>
                      <p className="text-[11px] text-[#8BA19B]">قابل استفاده در خرید کلیه مینی دوره‌ها و پادکست‌ها</p>
                      <button className="w-full py-1.5 rounded-lg bg-[#097565] text-white text-xs font-bold">
                        فعال‌سازی جایزه
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">تفسیر اختصاصی ترانزیت روز</span>
                        <span className="text-xs font-mono text-[#D4B483]">۸۰ امتیاز</span>
                      </div>
                      <p className="text-[11px] text-[#8BA19B]">یک تحلیل هوشمند عمیق بر روی چارت ناتال شما</p>
                      <button className="w-full py-1.5 rounded-lg bg-[#081816] border border-[#164239] text-[#43C6AC] text-xs font-bold">
                        نیاز به ۳۰ امتیاز دیگر
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: پنل پرونده شخصی */}
            {activeTab === 'portal' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">پنل پرونده شخصی یکپارچه</h3>
                    <p className="text-xs text-[#8BA19B]">مرکز اطلاعات چهارگانه شما برای مراجعات، تحلیل‌ها و جلسات مشاوره</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-xs font-bold self-start sm:self-auto">
                    پرونده فعال
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                    <span className="text-[#43C6AC] font-bold text-xs block">بخش اول: پرونده طبع و مزاج</span>
                    <p className="text-xs text-slate-300">طبع سرشتی: {userData.temperament}</p>
                    <p className="text-[11px] text-[#8BA19B]">وضعیت اخلاط: بلغم در تعادل، صفرا با تدابیر تغذیه‌ای تعدیل گردیده است.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                    <span className="text-[#43C6AC] font-bold text-xs block">بخش دوم: چارت ناتال تولد</span>
                    <p className="text-xs text-slate-300">متولد: {userData.birthDate} در {userData.birthCity}</p>
                    <p className="text-[11px] text-[#8BA19B]">برج خورشیدی {userData.sunSign} و طالع {userData.ascendant}.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                    <span className="text-[#43C6AC] font-bold text-xs block">بخش سوم: کهن‌الگو و روانشناسی</span>
                    <p className="text-xs text-slate-300">کهن‌الگوی راهبر: جوینده (Seeker) / خردمند (Sage)</p>
                    <p className="text-[11px] text-[#8BA19B]">کانون توجه: شناخت سایه‌ها و تبدیل انرژی‌های سرکوب‌شده به خلاقیت فردی.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-2">
                    <span className="text-[#43C6AC] font-bold text-xs block">بخش چهارم: مشاوره و جلسات</span>
                    <p className="text-xs text-slate-300">مشاور تخصصی: گروه اساتید آرمانوین</p>
                    <p className="text-[11px] text-[#8BA19B]">وضعیت: پرونده بروزرسانی‌شده و آماده هماهنگی وقت جلسه حضوری یا آنلاین.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#081816] border border-[#164239] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span>آیا مایل به افزودن نکات جدید به پرونده مشاوره خود هستید؟</span>
                  <button 
                    onClick={() => setActiveTab('support')}
                    className="px-4 py-2 rounded-xl bg-[#097565] text-white font-bold cursor-pointer shrink-0"
                  >
                    ارسال پیام به مشاور
                  </button>
                </div>
              </div>
            )}

            {/* TAB: تیکت‌های من */}
            {activeTab === 'support' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">تیکت‌های پشتیبانی و مشاوره</h3>
                    <p className="text-xs text-[#8BA19B]">مکاتبات اختصاصی شما با تیم فنی و مشاوران آرمانوین</p>
                  </div>
                  <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>تیکت جدید</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl bg-[#06100F] border border-[#142824] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold">
                          {t.status}
                        </span>
                        <div className="text-right">
                          <h4 className="text-sm font-bold text-white">{t.title}</h4>
                          <span className="text-[11px] text-[#8BA19B] font-mono">{t.id} · {t.date} · دسته: {t.category}</span>
                        </div>
                      </div>

                      {t.answer && (
                        <div className="p-3 rounded-lg bg-[#081816] border border-[#164239] text-xs text-slate-300 leading-relaxed">
                          <strong className="text-[#43C6AC] block mb-1">پاسخ پشتیبانی:</strong>
                          <p>{t.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: اطلاعات حساب کاربری */}
            {activeTab === 'profile' && (
              <div className="rounded-2xl p-6 bg-[#071312] border border-[#142824] shadow-md space-y-6 text-right animate-fade-in">
                <div className="border-b border-[#142824] pb-4">
                  <h3 className="text-lg font-bold text-white font-serif">اطلاعات حساب کاربری</h3>
                  <p className="text-xs text-[#8BA19B]">مشخصات فردی و اطلاعات تولد برای محاسبه دقیق چارت و پرونده</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      value={userData.displayName}
                      onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-right"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">شماره تماس:</label>
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">ایمیل:</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">شهر محل تولد:</label>
                    <input
                      type="text"
                      value={userData.birthCity}
                      onChange={(e) => setUserData({ ...userData, birthCity: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-right"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">تاریخ تولد (شمسی):</label>
                    <input
                      type="text"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-left font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8BA19B] font-medium block">ساعت دقیق تولد:</label>
                    <input
                      type="text"
                      value={userData.birthTime}
                      onChange={(e) => setUserData({ ...userData, birthTime: e.target.value })}
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#43C6AC] text-left font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert('اطلاعات با موفقیت ذخیره شد.')}
                    className="px-6 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    ذخیره تغییرات حساب
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: SIDEBAR MENU (EXACT MATCH TO IMAGE.PNG)                   */}
          {/* ======================================================================= */}
          <div className="order-1 lg:order-2 space-y-2">
            <div className="rounded-2xl p-2.5 sm:p-3 bg-[#071312] border border-[#142824] shadow-md space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-[#097565] text-white font-bold shadow-[0_0_15px_rgba(9,117,101,0.35)]'
                        : 'text-[#A9BAB4] hover:bg-[#0C1E1B] hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8BA19B]'}`} />
                    <span className="font-medium mr-auto text-right">{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-[#142824] space-y-1">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] text-[#F87171] hover:bg-rose-950/20 hover:text-rose-300 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0 text-[#F87171]" />
                  <span className="font-medium mr-auto text-right">خروج از حساب</span>
                </button>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] text-[#F87171] hover:bg-rose-950/20 hover:text-rose-300 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0 text-[#F87171]" />
                  <span className="font-medium mr-auto text-right">خروج از همۀ دستگاه‌ها</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODAL: CHARGE WALLET                                                      */}
        {/* ========================================================================= */}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" dir="rtl">
            <div className="max-w-md w-full bg-[#071312] border border-[#142824] rounded-3xl p-6 space-y-5 text-right shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#142824] pb-3">
                <button onClick={() => setShowWalletModal(false)} className="text-[#8BA19B] hover:text-white text-sm font-bold">✕</button>
                <h3 className="text-base font-bold text-white font-serif">افزایش موجودی کیف پول</h3>
              </div>

              <div className="space-y-3">
                <label className="text-xs text-[#8BA19B]">مبلغ مورد نظر را انتخاب یا وارد کنید:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[50000, 100000, 250000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setChargeAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition border ${
                        chargeAmount === amt 
                          ? 'bg-[#097565] text-white border-[#43C6AC]' 
                          : 'bg-[#06100F] text-[#8BA19B] border-[#142824] hover:text-white'
                      }`}
                    >
                      {amt.toLocaleString('fa-IR')} ت
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(Number(e.target.value))}
                  className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-4 py-2.5 text-xs text-white font-mono text-left focus:outline-none focus:border-[#43C6AC]"
                  placeholder="مبلغ دلخواه به تومان..."
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleRechargeWallet}
                  className="flex-1 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer shadow-md"
                >
                  پرداخت و شارژ حساب
                </button>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#06100F] text-[#8BA19B] hover:text-white text-xs font-medium border border-[#142824]"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: NEW CHART                                                          */}
        {/* ========================================================================= */}
        {showNewChartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" dir="rtl">
            <div className="max-w-md w-full bg-[#071312] border border-[#142824] rounded-3xl p-6 space-y-4 text-right shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#142824] pb-3">
                <button onClick={() => setShowNewChartModal(false)} className="text-[#8BA19B] hover:text-white text-sm font-bold">✕</button>
                <h3 className="text-base font-bold text-white font-serif">ساخت نقشۀ آسمان جدید</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[#8BA19B]">عنوان یا نام صاحب چارت:</label>
                  <input
                    type="text"
                    value={newChartName}
                    onChange={(e) => setNewChartName(e.target.value)}
                    placeholder="مثال: چارت تولد همسر، دوست یا تحلیل رویداد"
                    className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[#8BA19B]">تاریخ تولد:</label>
                    <input
                      type="text"
                      value={newChartDate}
                      onChange={(e) => setNewChartDate(e.target.value)}
                      placeholder="۱۳۸۰/۰۱/۰۱"
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white font-mono text-left focus:outline-none focus:border-[#43C6AC]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#8BA19B]">شهر محل تولد:</label>
                    <input
                      type="text"
                      value={newChartCity}
                      onChange={(e) => setNewChartCity(e.target.value)}
                      placeholder="تهران، اصفهان..."
                      className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleCreateChart}
                  className="flex-1 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer shadow-md"
                >
                  محاسبه و ایجاد چارت
                </button>
                <button
                  onClick={() => setShowNewChartModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#06100F] text-[#8BA19B] hover:text-white text-xs font-medium border border-[#142824]"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: NEW TICKET                                                         */}
        {/* ========================================================================= */}
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" dir="rtl">
            <div className="max-w-md w-full bg-[#071312] border border-[#142824] rounded-3xl p-6 space-y-4 text-right shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#142824] pb-3">
                <button onClick={() => setShowNewTicketModal(false)} className="text-[#8BA19B] hover:text-white text-sm font-bold">✕</button>
                <h3 className="text-base font-bold text-white font-serif">ارسال تیکت جدید</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[#8BA19B]">موضوع تیکت:</label>
                  <input
                    type="text"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    placeholder="موضوع پرسش یا راهنمایی..."
                    className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#8BA19B]">دپارتمان:</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                    className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC]"
                  >
                    <option value="مشاوره">دپارتمان مشاوره و پرونده</option>
                    <option value="تحلیل چارت">واحد محاسبات آسمان و ناتال</option>
                    <option value="فنی و سایت">پشتیبانی فنی و حساب کاربری</option>
                    <option value="مالی">امور مالی و کیف پول</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#8BA19B]">شرح پیام:</label>
                  <textarea
                    rows={3}
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="توضیحات تکمیلی خود را بنویسید..."
                    className="w-full bg-[#06100F] border border-[#142824] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#43C6AC]"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleSubmitTicket}
                  className="flex-1 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs font-bold transition cursor-pointer shadow-md"
                >
                  ثبت و ارسال تیکت
                </button>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#06100F] text-[#8BA19B] hover:text-white text-xs font-medium border border-[#142824]"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
