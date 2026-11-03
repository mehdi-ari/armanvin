import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, Sparkles, Compass, Check, ChevronLeft, ChevronRight, RotateCcw, 
  MapPin, Calendar, Sun, Moon, Sunrise, Sunset, User, CheckCircle2, 
  Copy, HelpCircle, Activity, ShieldCheck, Flame, Star, Sliders, Zap,
  Layers, ArrowLeft, ArrowRight, Play, Eye, Brain, Home, LayoutGrid
} from 'lucide-react';
import { 
  RealisticSaturn, 
  RealisticJupiter, 
  RealisticMars, 
  RealisticVenus, 
  RealisticMercury, 
  RealisticSun, 
  RealisticNeptune,
  RealisticUranus,
  RealisticEarth,
  RealisticMoonGlobe 
} from './RealisticPlanets';
import { OrbitingPlanets } from './OrbitingPlanets';
import { TemperamentElementsSlide } from './TemperamentElementsSlide';
import { PsychologySlide } from './PsychologySlide';
import { SynergySlide } from './SynergySlide';
import { ArmanveinDashboard } from './ArmanveinDashboard';

export const ArmanveinMiniApp: React.FC = () => {
  // Main view mode: 'slides' (Intro 5 slides) | 'dashboard' (Square Grid) | 'birth_calc' (Questionnaire & Result)
  const [viewMode, setViewMode] = useState<'slides' | 'dashboard' | 'birth_calc'>('slides');

  // Intro Slides Index: 0 (Brand Intro) | 1 (Astrology & Orrery) | 2 (Temperament & Elements) | 3 (Psychology) | 4 (Synergy of 3 Sciences)
  const [introSlide, setIntroSlide] = useState<number>(0);
  const [logoAnimKey, setLogoAnimKey] = useState<number>(0);

  // Questionnaire / Calculator Step Index (0 to 4: Step 1 Daytime Window, Step 2 Trait, Step 3 Milestone, Step 4 Rhythm, Step 5 Result)
  const [calcStep, setCalcStep] = useState<number>(0);

  // Basic birth info
  const [birthDate, setBirthDate] = useState<string>('۱۳۷۹/۰۸/۲۰');
  const [birthCity, setBirthCity] = useState<string>('شیراز');
  
  // Step 1: Approximate Daytime Window
  const [selectedWindow, setSelectedWindow] = useState<string>('noon-afternoon');
  
  // Step 2: Physical & Temperament Traits (Ascendant marker)
  const [selectedTrait, setSelectedTrait] = useState<string>('air-balanced');
  
  // Step 3: Major Life Milestone (House marker)
  const [selectedMilestone, setSelectedMilestone] = useState<string>('career-success');
  
  // Step 4: Energy Peak & Circadian Rhythm
  const [selectedRhythm, setSelectedRhythm] = useState<string>('afternoon-focus');

  // Fine-tuner minute offset (+- minutes on final result)
  const [timeOffsetMinutes, setTimeOffsetMinutes] = useState<number>(0);
  
  // Calculation / Loading animation state
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [copiedTime, setCopiedTime] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePlanetInfo, setActivePlanetInfo] = useState<string | null>(null);
  const [selectedPlanetModal, setSelectedPlanetModal] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<'astrology' | 'temperament' | 'psychology' | null>(null);

  // Touch Swipe Gesture State
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'slides') {
        if (e.key === 'ArrowLeft') {
          if (introSlide < 4) setIntroSlide(prev => prev + 1);
        } else if (e.key === 'ArrowRight') {
          if (introSlide > 0) setIntroSlide(prev => prev - 1);
        }
      } else if (viewMode === 'birth_calc') {
        if (e.key === 'ArrowLeft') {
          goToNextCalcStep();
        } else if (e.key === 'ArrowRight') {
          goToPrevCalcStep();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, introSlide, calcStep]);

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    const threshold = 45;

    if (diffX > threshold) {
      // Swiping right-to-left -> Next in RTL
      if (viewMode === 'slides') {
        if (introSlide < 4) setIntroSlide(prev => prev + 1);
      } else if (viewMode === 'birth_calc') {
        goToNextCalcStep();
      }
    } else if (diffX < -threshold) {
      // Swiping left-to-right -> Prev in RTL
      if (viewMode === 'slides') {
        if (introSlide > 0) setIntroSlide(prev => prev - 1);
      } else if (viewMode === 'birth_calc') {
        goToPrevCalcStep();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Calculator Question Data
  const timeWindows = [
    {
      id: 'early-morning',
      title: 'صبح زود / اذان صبح',
      range: '۰۴:۰۰ تا ۰۷:۳۰',
      icon: Sunrise,
      zodiacDeg: 'عقرب ۱۲°',
      desc: 'هوا گرگ‌ومیش، پیش از طلوع آفتاب یا همزمان با دمیدن صبح',
      baseHour: 5,
      baseMin: 48,
    },
    {
      id: 'morning-noon',
      title: 'میانه صبح تا پیش از ظهر',
      range: '۰۷:۳۰ تا ۱۱:۴۵',
      icon: Sun,
      zodiacDeg: 'قوس ۱۸°',
      desc: 'آفتاب بالا آمده، ساعات پرانرژی صبحگاهی',
      baseHour: 9,
      baseMin: 20,
    },
    {
      id: 'noon-afternoon',
      title: 'حوالی ظهر تا عصر',
      range: '۱۱:۴۵ تا ۱۶:۳۰',
      icon: Sun,
      zodiacDeg: 'میزان ۰۸°',
      desc: 'اوج تابش خورشید، میانه روز تا عصرگاه',
      baseHour: 14,
      baseMin: 35,
    },
    {
      id: 'sunset-evening',
      title: 'غروب تا سر شب',
      range: '۱۶:۳۰ تا ۲۱:۰۰',
      icon: Sunset,
      zodiacDeg: 'جدی ۲۲°',
      desc: 'افول خورشید، تاریک شدن هوا و اول شب',
      baseHour: 18,
      baseMin: 40,
    },
    {
      id: 'night-midnight',
      title: 'نیمه‌شب تا سحرگاه',
      range: '۲۱:۰۰ تا ۰۴:۰۰',
      icon: Moon,
      zodiacDeg: 'حوت ۰۶°',
      desc: 'سکوت شب، خواب عمیق دیگران و تاریکی آسمان',
      baseHour: 23,
      baseMin: 15,
    },
    {
      id: 'unknown-full',
      title: 'کاملاً نامشخص / بدون هیچ اطلاعی',
      range: '۲۴ ساعت شبانه‌روز',
      icon: Clock,
      zodiacDeg: 'محاسبه کپلری',
      desc: 'از طریق ۳ گام بعدی (شکل فیزیکی، ریتم و وقایع) استخراج خواهد شد',
      baseHour: 12,
      baseMin: 0,
    }
  ];

  const physicalTraits = [
    {
      id: 'fire-energetic',
      title: 'طالع آتشی: چهره گرم، چشم نافذ و پرتحرک',
      desc: 'نگاه مصمم، پیشانی استوار، واکنش سریع و حضور پرانرژی در جمع.',
      element: 'آتش (حمل / اسد / قوس)'
    },
    {
      id: 'air-balanced',
      title: 'طالع هوایی: قرینگی چهره، ظرافت و نگاه جستجوگر',
      desc: 'لبخند گیرا، ساختار باریک و متناسب، کلام شیوا و انعطاف بالا.',
      element: 'هوا (جوزا / میزان / دلو)'
    },
    {
      id: 'earth-solid',
      title: 'طالع خاکی: استخوان‌بندی محکم، نگاه عمیق و شکیبا',
      desc: 'شانه‌های مستحکم، متانت در رفتار، طمأنینه و گام‌های استوار.',
      element: 'خاک (ثور / سنبله / جدی)'
    },
    {
      id: 'water-soft',
      title: 'طالع آبی: خطوط چهره مدور، نگاه مهربان و شهودی',
      desc: 'پوست لطیف، چشمان درخشان و پراحساس، دریافت شهودی قوی از فضا.',
      element: 'آب (سرطان / عقرب / حوت)'
    }
  ];

  const lifeMilestones = [
    {
      id: 'career-success',
      title: 'جهش شغلی ناگهانی یا ارتقای جایگاه اجتماعی',
      desc: 'نشانگر فعال شدن خانه دهم (MC) و تثبیت محور موقعیت عمومی فرد.'
    },
    {
      id: 'deep-relationship',
      title: 'دیدار با شریک زندگی یا تحول بزرگ عاطفی',
      desc: 'نشانگر محور افق و خانه هفتم (Descendant) در زمان ترانزیت ناهید.'
    },
    {
      id: 'migration-change',
      title: 'مهاجرت، تغییر محل زندگی یا سفر دوردست',
      desc: 'ارتباط مستقیم با زاویه خانه نهم و جابجایی کواکب متغیر.'
    },
    {
      id: 'spiritual-awakening',
      title: 'بحران روحی عمیق و بازتولد شخصیتی',
      desc: 'عبور زحل یا پلوتو از وتدهای اصلی و تولد دوباره اراده.'
    }
  ];

  const circadianRhythms = [
    {
      id: 'morning-lark',
      title: 'سحرخیزی طبیعی و اوج انرژی در ساعات اولیه روز',
      desc: 'ذهن پیش از ساعت ۱۰ صبح در روشن‌ترین و متمرکزترین حالت است.'
    },
    {
      id: 'afternoon-focus',
      title: 'اوج تمرکز در میانه روز و ساعات عصرگاهی',
      desc: 'بهترین بازدهی فکری و فیزیکی از ساعت ۱۴ تا ۱۹ رخ می‌دهد.'
    },
    {
      id: 'night-owl',
      title: 'بیدارباش شبانه و خلاقیت پس از غروب',
      desc: 'در آرامش شب، نبوغ و خلق ایده‌های نو فوران می‌کند.'
    }
  ];

  // Catalog of realistic astrological planets
  const planetCatalog = [
    {
      id: 'saturn',
      name: 'سیاره زحل (کیوان)',
      latin: 'Saturn · ♄',
      symbol: '♄',
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      archetype: 'آموزگار زمان، ساختار کارمیک، انضباط و بلوغ',
      domicile: 'جدی (بزغاله ♑) و دلو (آب‌ریز ♒)',
      exaltation: 'شرف در میزان ۲۱° (ترازو ♎) · هبوط در حمل (بره ♈)',
      element: 'عنصر خاک / سرد و خشک (سوداوی)',
      nature: 'نحس اکبر (بزرگ‌ترین آزمون‌گر و ثبات‌بخش اراده)',
      houses: 'خانه‌های وتدی ۴ (IC) و ۱۰ (MC) و ۱۲ (کارما)',
      visualFeatures: 'حلقه‌های سه‌بعدی کامل با شکاف کاسینی، حلقه حریر و سایه تیره کره سیاره بر پهنه حلقه‌ها.',
      astrologicalImpact: 'در استخراج و تصحیح ساعت تولد، زحل حاکم بر چرخه زمان، استخوان‌بندی چهره و تعیین سن دقیق رویدادهای سنگین کارمیک زندگی است.',
      renderPreview: (size: number) => <RealisticSaturn size={size} />
    },
    {
      id: 'jupiter',
      name: 'سیاره مشتری (برجیس)',
      latin: 'Jupiter · ♃',
      symbol: '♃',
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/40',
      archetype: 'سعد اکبر، برکت، خرد، انبساط و توسعه اجتماعی',
      domicile: 'قوس (کمان ♐) و حوت (ماهی ♓)',
      exaltation: 'شرف در سرطان ۱۵° (خرچنگ ♋) · هبوط در جدی (بزغاله ♑)',
      element: 'عنصر آتش / گرم و تر (دموی)',
      nature: 'سعد اکبر (بزرگ‌ترین فرخندگی و گشایش زندگی)',
      houses: 'خانه‌های ۹ (فلسفه و جهان‌بینی) و ۱۰ (شغل و شهرت)',
      visualFeatures: 'نوارهای طوفانی رنگارنگ جوی به همراه طوفان ۳۰۰ ساله «لکه سرخ بزرگ».',
      astrologicalImpact: 'محور اصلی صعود کاری و اجتماعی در خانه دهم (MC)؛ تعیین‌کننده سال جهش‌های شغلی در فرمول ردیابی تولد.',
      renderPreview: (size: number) => <RealisticJupiter size={size} />
    },
    {
      id: 'mars',
      name: 'سیاره مریخ (بهرام)',
      latin: 'Mars · ♂',
      symbol: '♂',
      color: 'from-red-500 to-rose-600',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/40',
      archetype: 'آتش اراده، شجاعت، کنشگری و سرزندگی',
      domicile: 'حمل (بره ♈) و عقرب (کژدم ♏)',
      exaltation: 'شرف در جدی ۲۸° (بزغاله ♑) · هبوط در سرطان (خرچنگ ♋)',
      element: 'عنصر آتش / گرم و خشک (صفراوی)',
      nature: 'نحس اصغر (موتور محرک عمل، استقامت و دفاع)',
      houses: 'خانه ۱ (طالع صاعد / فیزیک بدن) و خانه ۸ (تحول)',
      visualFeatures: 'کره سرخ اکسید آهن با کلاهک یخی سپید در قطب شمال و دهانه‌های آتشفشانی بزرگ.',
      astrologicalImpact: 'تعیین درجه طالع‌های پرتحرک، سرعت واکنش بدنی و تشخیص ساعات زایچه‌های روزانه و شبانه.',
      renderPreview: (size: number) => <RealisticMars size={size} />
    },
    {
      id: 'venus',
      name: 'سیاره زهره (ناهید)',
      latin: 'Venus · ♀',
      symbol: '♀',
      color: 'from-yellow-400 to-amber-500',
      textColor: 'text-yellow-300',
      borderColor: 'border-yellow-400/40',
      archetype: 'زیبایی، تناسب اجزا، هنر و پیوند عاطفی',
      domicile: 'ثور (گاو ♉) و میزان (ترازو ♎)',
      exaltation: 'شرف در حوت ۲۷° (ماهی ♓) · هبوط در سنبله (خوشه ♍)',
      element: 'عنصر خاک و هوا / معتدل و مرطوب (بلغم معتدل)',
      nature: 'سعد اصغر (الهه صلح، ظرافت و عشق)',
      houses: 'خانه ۷ (پیوند و ازدواج - DC) و خانه ۲ (دارایی)',
      visualFeatures: 'ابرهای متراکم و چرخان اسید سولفوریک با درخشندگی مرواریدگونه زرین.',
      astrologicalImpact: 'کلید هماهنگی در طالع‌های هوایی و خاکی، قرینگی چهره، لطافت صدا و زمان رخداد پیوند ازدواج.',
      renderPreview: (size: number) => <RealisticVenus size={size} />
    },
    {
      id: 'mercury',
      name: 'سیاره عطارد (تیر)',
      latin: 'Mercury · ☿',
      symbol: '☿',
      color: 'from-slate-400 to-cyan-500',
      textColor: 'text-cyan-300',
      borderColor: 'border-cyan-500/40',
      archetype: 'هوش تحلیلی، کلام، ارتباطات و تقسیمات زمان',
      domicile: 'جوزا (دوقلو ♊) و سنبله (خوشه ♍)',
      exaltation: 'شرف در سنبله ۱۵° (خوشه ♍) · هبوط در حوت (ماهی ♓)',
      element: 'عنصر هوا و خاک / خنثی و منطبق با همنشین',
      nature: 'کاتب فلک (حاکم تبادل داده و هوشمندی عقلانی)',
      houses: 'خانه ۳ (خواهر/برادر و کلام) و خانه ۶ (روزمرگی و کار)',
      visualFeatures: 'سطح صخره‌ای نقره‌ای-خاکستری با دهانه‌های برخوردی متعدد و خطوط شکستگی.',
      astrologicalImpact: 'عطارد متغیرترین سیاره و تعیین‌کننده ریزدقایق تولد است؛ همچنین ساعت فعالیت ذهنی و کرونوتایپ را تنظیم می‌کند.',
      renderPreview: (size: number) => <RealisticMercury size={size} />
    },
    {
      id: 'sun',
      name: 'ستاره خورشید (شمس)',
      latin: 'The Sun · ☉',
      symbol: '☉',
      color: 'from-amber-400 to-red-500',
      textColor: 'text-amber-300',
      borderColor: 'border-amber-400/40',
      archetype: 'گوهر حیات، سرزندگی، مرکزیت روح و آگاهی',
      domicile: 'اسد (شیر ♌)',
      exaltation: 'شرف در حمل ۱۹° (بره ♈) · هبوط در میزان (ترازو ♎)',
      element: 'عنصر آتش ناب / گرم و خشک در کمال اعتدال',
      nature: 'نیّر اعظم (سلطان روشنایی و آگاهی فردی)',
      houses: 'خانه ۵ (خلاقیت و فرزندان) و قطب‌نمای افق زایچه',
      visualFeatures: 'گوی گداخته پلاسما با پرتوهای تاج خورشیدی، گرانول‌های فوتوسفر و درخشش سوزان.',
      astrologicalImpact: 'خط مرجع اصلی برای تعیین بازه شبانه‌روز و نقطه آغاز تقسیم‌بندی ۱۲ خانه.',
      renderPreview: (size: number) => <RealisticSun size={size} />
    },
    {
      id: 'moon',
      name: 'کره ماه (قمر)',
      latin: 'The Moon · ☽',
      symbol: '☽',
      color: 'from-slate-200 to-blue-300',
      textColor: 'text-slate-200',
      borderColor: 'border-slate-300/40',
      archetype: 'احساسات عمیق، حافظه، شهود و ضمیر ناخودآگاه',
      domicile: 'سرطان (خرچنگ ♋)',
      exaltation: 'شرف در ثور ۳° (گاو ♉) · هبوط در عقرب (کژدم ♏)',
      element: 'عنصر آب / سرد و تر (بلغم غلیظ)',
      nature: 'نیّر اصغر (ملکه شب و دریافت‌های شهودی)',
      houses: 'خانه ۴ (ریشه‌ها و خانه پدری) و زاویه IC',
      visualFeatures: 'دریاهای بازالتی تیره، دهانه تیکو با پرتوهای سپید و فازهای نوری هلالی.',
      astrologicalImpact: 'ماه سریع‌ترین جرم آسمانی است؛ هر ۲ ساعت یک درجه جابجا می‌شود و اصلی‌ترین کلید کشف دقیقه تولد است.',
      renderPreview: (size: number) => <RealisticMoonGlobe size={size} />
    }
  ];

  // Calculation formula
  const getCalculatedTime = () => {
    let baseHour = 14;
    let baseMin = 35;
    let ascendant = 'میزان ۰۸° (ترازو ♎)';
    let mc = 'اسد ۲۶° (Midheaven)';
    let confidence = 96;

    if (selectedWindow === 'early-morning') {
      baseHour = 5;
      baseMin = 48;
      ascendant = 'عقرب ۱۲° (کژدم ♏)';
      mc = 'اسد ۰۴° (شیر ♌)';
      confidence = 94;
    } else if (selectedWindow === 'morning-noon') {
      baseHour = 9;
      baseMin = 20;
      ascendant = 'قوس ۱۸° (کمان ♐)';
      mc = 'سنبله ۱۰° (دوشیزه ♍)';
      confidence = 91;
    } else if (selectedWindow === 'noon-afternoon') {
      baseHour = 14;
      baseMin = selectedTrait === 'air-balanced' ? 35 : 22;
      ascendant = selectedTrait === 'air-balanced' ? 'میزان ۰۸° (ترازو ♎)' : 'عقرب ۱۴° (کژدم ♏)';
      mc = 'اسد ۲۶° (Midheaven)';
      confidence = 96;
    } else if (selectedWindow === 'sunset-evening') {
      baseHour = 18;
      baseMin = 40;
      ascendant = 'جدی ۲۲° (بزغاله ♑)';
      mc = 'میزان ۱۵° (ترازو ♎)';
      confidence = 89;
    } else if (selectedWindow === 'night-midnight') {
      baseHour = 23;
      baseMin = 15;
      ascendant = 'حوت ۰۶° (ماهی ♓)';
      mc = 'قوس ۱۸° (کمان ♐)';
      confidence = 88;
    } else {
      baseHour = selectedRhythm === 'morning-lark' ? 8 : (selectedRhythm === 'night-owl' ? 22 : 14);
      baseMin = 30;
      ascendant = 'میزان ۱۴° (ترازو ♎)';
      mc = 'اسد ۲۰° (شیر ♌)';
      confidence = 86;
    }

    let totalMinutes = baseHour * 60 + baseMin + timeOffsetMinutes;
    if (totalMinutes < 0) totalMinutes += 1440;
    totalMinutes = totalMinutes % 1440;

    const finalHour = Math.floor(totalMinutes / 60);
    const finalMin = totalMinutes % 60;
    const formattedTime = `${String(finalHour).padStart(2, '0')}:${String(finalMin).padStart(2, '0')}`;

    return {
      time: formattedTime,
      hour: finalHour,
      min: finalMin,
      ascendant,
      mc,
      confidence,
      dayPeriod: finalHour >= 5 && finalHour < 12 ? 'صبحگاه' : (finalHour >= 12 && finalHour < 17 ? 'بعدازظهر' : (finalHour >= 17 && finalHour < 21 ? 'غروبگاه' : 'شبگاه')),
      timeZone: 'Asia/Tehran (+3.5 UTC)'
    };
  };

  const calculatedResult = getCalculatedTime();

  // Calculator step navigation (0 to 4)
  const goToNextCalcStep = () => {
    if (calcStep < 3) {
      setCalcStep(prev => prev + 1);
    } else if (calcStep === 3) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setCalcStep(4);
        showToast('ساعت دقیق تولد با موفقیت استخراج شد! ✨');
      }, 900);
    }
  };

  const goToPrevCalcStep = () => {
    if (calcStep > 0) {
      setCalcStep(prev => prev - 1);
    }
  };

  const handleResetCalc = () => {
    setCalcStep(0);
    setTimeOffsetMinutes(0);
    setCopiedTime(false);
    showToast('پرسشنامه مجدداً آماده پاسخگویی است');
  };

  const handleCopyTime = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(calculatedResult.time);
    }
    setCopiedTime(true);
    showToast(`ساعت ${calculatedResult.time} با موفقیت کپی شد`);
    setTimeout(() => setCopiedTime(false), 2000);
  };

  const calcStepTitles = [
    'بازه شبانه‌روز',
    'نشانه‌های فیزیکی و طالع',
    'رویدادهای سرنوشت‌ساز',
    'ریتم انرژی و کرونوتایپ',
    'ساعت دقیق زایچه'
  ];

  return (
    <div className="w-full h-full max-w-[430px] mx-auto text-right font-sans select-none flex flex-col justify-between overflow-hidden relative" dir="rtl">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce border border-cyan-400 bg-[#071626]/95 text-cyan-300 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.4)]">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. VIEW MODE: DASHBOARD (پیشخوان کارها به صورت مربع مربع)            */}
      {/* =================================================================== */}
      {viewMode === 'dashboard' && (
        <ArmanveinDashboard
          onOpenBirthCalculator={() => {
            setViewMode('birth_calc');
            setCalcStep(0);
            showToast('ابزار رصد و استخراج ساعت تولد فراخوانی شد');
          }}
          onOpenIntroSlides={() => {
            setViewMode('slides');
            setIntroSlide(0);
            showToast('اسلایدهای معرفی آکادمی آرمانوین');
          }}
          showToast={showToast}
        />
      )}

      {/* =================================================================== */}
      {/* 2. VIEW MODE: INTRO SLIDES (5 SLIDES: 0 to 4)                       */}
      {/* =================================================================== */}
      {viewMode === 'slides' && (
        <div 
          className="h-full w-full rounded-none sm:rounded-[28px] border-0 sm:border border-cyan-500/30 shadow-none sm:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.25)] overflow-hidden relative text-[#E2F0FD] bg-[#07111D]/90 backdrop-blur-2xl flex flex-col justify-between min-h-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient Lights */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          {/* SLIDE CAROUSEL TRACK (5 Slides) */}
          <div className="w-full overflow-hidden flex-1 relative z-10 flex min-h-0">
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-out shrink-0"
              style={{
                transform: `translateX(${introSlide * 100}%)`,
              }}
            >
              
              {/* SLIDE 0: ARMANVEIN BRAND INTRO */}
              <div className="w-full h-full shrink-0 flex flex-col justify-between text-right animate-fade-in relative overflow-hidden px-3.5 py-2 sm:px-4 sm:py-3.5 bg-[#030B10]/95 min-h-0">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                <div className="absolute top-44 -right-10 w-52 h-52 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                {/* Top bar */}
                <div className="flex items-center justify-between z-20 pb-0.5 shrink-0">
                  <button
                    onClick={() => setViewMode('dashboard')}
                    className="text-xs text-amber-300 hover:text-white transition-colors cursor-pointer py-1 px-2 font-medium flex items-center gap-1"
                  >
                    <span>ورود به پیشخوان</span>
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => showToast('زبان فارسی فعال است')}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-slate-700/80 bg-white/5 hover:bg-white/10 text-slate-200 transition cursor-pointer flex items-center gap-1.5 backdrop-blur-md shadow-sm"
                  >
                    <span>English</span>
                    <span className="text-[12px]">🌐</span>
                  </button>
                </div>

                {/* Animated Logo & Title */}
                <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-0.5 z-10 text-center">
                  <div 
                    key={logoAnimKey}
                    className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto flex items-center justify-center my-0.5 sm:my-1 cursor-pointer animate-logo-float select-none shrink-0"
                    onClick={() => {
                      setLogoAnimKey(prev => prev + 1);
                      showToast('بازپخش انیمیشن ساخت نشان آرمانوین ✦');
                    }}
                    title="کلیک برای بازپخش انیمیشن"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-emerald-500/20 via-teal-500/10 to-transparent blur-xl pointer-events-none" />
                    <div className="relative w-full h-full flex items-center justify-center animate-logo-build">
                      <picture className="w-full h-full flex items-center justify-center">
                        <source srcSet="/assets/aistudio/armanvein_logo_optimized.webp" type="image/webp" />
                        <img
                          src="/assets/aistudio/__________cfb5adf4.png"
                          alt="نشان رسمی آرمانوین"
                          className="w-full h-full object-contain pointer-events-none transition-transform duration-300 hover:scale-105"
                          loading="eager"
                        />
                      </picture>
                    </div>
                  </div>

                  <div className="mt-1 space-y-0.5 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)]">
                      آرمانوین
                    </h1>
                    <p className="text-xs sm:text-sm font-bold text-amber-300 font-serif tracking-wide drop-shadow-xs">
                      آکادمی سه‌بعدی توسعه فردی
                    </p>
                  </div>

                  {/* 3 Pillars */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-2 sm:mt-2.5 w-full max-w-[420px] mx-auto text-center shrink-0">
                    <div 
                      onClick={() => {
                        setSelectedPillar(prev => prev === 'astrology' ? null : 'astrology');
                        showToast('استرولوژی: تحلیل هندسه کواکب و چارت زایچه');
                      }}
                      className={`p-1.5 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-md flex flex-col items-center gap-1 border ${
                        selectedPillar === 'astrology'
                          ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-amber-500/25 hover:border-amber-400/50'
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-300 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-[11px] sm:text-xs font-bold text-amber-300 font-serif">استرولوژی</h3>
                        <span className="text-[7.5px] sm:text-[8px] font-mono text-amber-400/70 block">Astrology</span>
                        <p className="text-[8.5px] sm:text-[9.5px] text-slate-300/90 leading-tight">چارت زایچه و افلاک</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => {
                        setSelectedPillar(prev => prev === 'temperament' ? null : 'temperament');
                        showToast('مزاج‌شناسی: طبایع چهارگانه و تعادل بیولوژیک بدن');
                      }}
                      className={`p-1.5 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-md flex flex-col items-center gap-1 border ${
                        selectedPillar === 'temperament'
                          ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-emerald-500/25 hover:border-emerald-400/50'
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-[11px] sm:text-xs font-bold text-emerald-300 font-serif">مزاج‌شناسی</h3>
                        <span className="text-[7.5px] sm:text-[8px] font-mono text-emerald-400/70 block">Temperament</span>
                        <p className="text-[8.5px] sm:text-[9.5px] text-slate-300/90 leading-tight">طبایع و اخلاط بدن</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => {
                        setSelectedPillar(prev => prev === 'psychology' ? null : 'psychology');
                        showToast('روانشناسی: کهن‌الگوها و کاوش در ناخودآگاه');
                      }}
                      className={`p-1.5 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-md flex flex-col items-center gap-1 border ${
                        selectedPillar === 'psychology'
                          ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-cyan-500/25 hover:border-cyan-400/50'
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-[11px] sm:text-xs font-bold text-cyan-300 font-serif">روانشناسی</h3>
                        <span className="text-[7.5px] sm:text-[8px] font-mono text-cyan-400/70 block">Psychology</span>
                        <p className="text-[8.5px] sm:text-[9.5px] text-slate-300/90 leading-tight">کهن‌الگو و ناخودآگاه</p>
                      </div>
                    </div>
                  </div>

                  {selectedPillar && (
                    <div className="mt-1.5 p-2 rounded-xl bg-[#031B15]/95 border border-emerald-400/40 text-right backdrop-blur-md animate-fade-in shadow-lg shrink-0 w-full max-w-[420px]">
                      <div className="flex items-center justify-between pb-0.5">
                        <span className="text-[10px] font-bold text-amber-300">
                          {selectedPillar === 'astrology' && 'تحلیل تخصصی استرولوژی و چارت زایچه ✦'}
                          {selectedPillar === 'temperament' && 'رویکرد مزاج‌شناسی و تعادل طبایع ✦'}
                          {selectedPillar === 'psychology' && 'کاوش روانشناسی کهن‌الگوها و خودآگاهی ✦'}
                        </span>
                        <button 
                          onClick={() => setSelectedPillar(null)}
                          className="text-[10px] text-slate-400 hover:text-white px-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-200 leading-snug">
                        {selectedPillar === 'astrology' && 'تحلیل هندسه کواکب، زوایای فلکی و ترسیم چارت زایچه برای کشف رسالت و پتانسیل‌های فردی.'}
                        {selectedPillar === 'temperament' && 'شناخت طبایع چهارگانه، تعادل اخلاط بیولوژیک و همگام‌سازی سبک زندگی با طبیعت بدن.'}
                        {selectedPillar === 'psychology' && 'تحلیل کهن‌الگوها و سایه‌های شخصیتی، کاوش در ناخودآگاه و هدایت توسعه فردی.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination (5 Dots) & Next Button */}
                <div className="space-y-1.5 sm:space-y-2 pt-1 pb-1 z-20 text-center shrink-0">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-7 h-1.5 rounded-full bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.7)]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                  </div>

                  <button
                    onClick={() => setIntroSlide(1)}
                    className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-[20px] bg-[#E5A93C] hover:bg-[#D69A30] active:scale-[0.98] text-[#1A1104] font-extrabold text-sm sm:text-base transition-all duration-200 shadow-[0_4px_20px_rgba(229,169,60,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>ورود به رصد کیهانی و ادامه</span>
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* SLIDE 1: COSMIC ORRERY ZODIAC */}
              <div className="w-full h-full shrink-0 flex flex-col justify-between text-right animate-fade-in relative overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-3 bg-[#05080E]/95 min-h-0">
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                <div className="absolute top-36 right-4 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between z-20 pt-0.5 pb-1 shrink-0">
                  <button
                    onClick={() => setIntroSlide(0)}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5 font-medium flex items-center gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>معرفی آرمانوین</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('dashboard')}
                      className="text-xs text-amber-300 hover:text-white transition-colors cursor-pointer py-1 px-1.5 font-medium flex items-center gap-1"
                    >
                      <span>پیشخوان</span>
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-center my-0 z-10 overflow-hidden">
                  <OrbitingPlanets
                    onSelectPlanet={(planetId) => setSelectedPlanetModal(planetId)}
                    activePlanetInfo={activePlanetInfo}
                    setActivePlanetInfo={setActivePlanetInfo}
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2 pt-1 pb-1 z-20 text-center shrink-0">
                  <h2 className="text-sm sm:text-lg font-extrabold text-white font-serif tracking-tight drop-shadow-sm">
                    کشف زایچه، زودگذرتر از آن است که فکر می‌کنید
                  </h2>
                  <p className="text-[10px] sm:text-xs text-slate-300/90 leading-tight max-w-[340px] mx-auto px-1 line-clamp-2 sm:line-clamp-none">
                    هر لحظه از تولد تو فرصتی است که تکرار نمی‌شود. هوش نجومی آرمانوین، ساعت دقیق تولد و طالع سرنوشتت را آشکار می‌سازد.
                  </p>

                  <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-7 h-1.5 rounded-full bg-[#E5A93C] shadow-[0_0_8px_rgba(229,169,60,0.7)]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700/80" />
                  </div>

                  <button
                    onClick={() => setIntroSlide(2)}
                    className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-[20px] bg-[#E5A93C] hover:bg-[#D69A30] active:scale-[0.98] text-[#1A1104] font-extrabold text-sm sm:text-base transition-all duration-200 shadow-[0_4px_20px_rgba(229,169,60,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>ادامه به مزاج‌شناسی و طبایع ۴گانه</span>
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* SLIDE 2: TEMPERAMENT & 4 ELEMENTS */}
              <TemperamentElementsSlide
                onNext={() => setIntroSlide(3)}
                onPrev={() => setIntroSlide(1)}
                onSkipToQuestions={() => setViewMode('dashboard')}
                showToast={showToast}
              />

              {/* SLIDE 3: PSYCHOLOGY */}
              <PsychologySlide
                onNext={() => setIntroSlide(4)}
                onPrev={() => setIntroSlide(2)}
                onSkipToQuestions={() => setViewMode('dashboard')}
                showToast={showToast}
              />

              {/* SLIDE 4: SYNERGY OF 3 SCIENCES (اسلاید پنجم: ترکیب ۳ علم و ورود به آرمانوین) */}
              <SynergySlide
                onEnterArmanvein={() => {
                  setViewMode('dashboard');
                  showToast('به سامانه جامع آرمانوین خوش آمدید ✨');
                }}
                onPrev={() => setIntroSlide(3)}
                onSkipToQuestions={() => setViewMode('dashboard')}
                showToast={showToast}
              />

            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. VIEW MODE: BIRTH TIME CALCULATOR (پرسشنامه ۴ گامی + نتیجه نهایی)  */}
      {/* =================================================================== */}
      {viewMode === 'birth_calc' && (
        <div 
          className="h-full w-full rounded-none sm:rounded-[28px] border-0 sm:border border-cyan-500/30 shadow-none sm:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.25)] overflow-hidden relative text-[#E2F0FD] bg-[#07111D]/90 backdrop-blur-2xl flex flex-col justify-between min-h-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Back to Dashboard */}
          <div className="p-2.5 sm:p-3.5 border-b border-cyan-500/20 relative z-20 backdrop-blur-xl bg-gradient-to-b from-cyan-950/40 via-[#0A1828]/60 to-transparent shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-lg bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.4)] shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-wider text-cyan-300 font-bold block">
                    خدمات آرمانوین · رصد زایچه
                  </span>
                  <h1 className="text-[11px] sm:text-xs font-bold text-white">
                    پیدا کردن و استخراج ساعت تولد
                  </h1>
                </div>
              </div>

              {/* Back to Dashboard Button */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="px-2.5 py-1 rounded-full text-[10px] text-amber-300 hover:text-white border border-amber-400/40 bg-amber-950/40 hover:bg-amber-900/50 transition cursor-pointer flex items-center gap-1 font-bold shadow-xs"
                >
                  <Home className="w-3 h-3 text-amber-400" />
                  <span>پیشخوان آرمانوین</span>
                </button>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border border-cyan-400/40 bg-cyan-950/70 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)] font-mono">
                  {calcStep === 4 ? 'نتیجه نهایی' : `گام ${calcStep + 1} از ۴`}
                </span>
              </div>
            </div>

            {/* Step Segments */}
            <div className="grid grid-cols-5 gap-1.5 pt-0.5">
              {[0, 1, 2, 3, 4].map((sIndex) => {
                const isPast = sIndex < calcStep;
                const isCurrent = sIndex === calcStep;
                return (
                  <button
                    key={sIndex}
                    onClick={() => setCalcStep(sIndex)}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_rgba(56,189,248,0.7)] scale-y-125' 
                        : (isPast ? 'bg-cyan-600/70' : 'bg-white/10 hover:bg-white/20')
                    }`}
                    title={calcStepTitles[sIndex]}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-1.5 font-mono">
              <span className="text-cyan-300 font-bold">{calcStepTitles[calcStep]}</span>
              <span className="text-[8.5px] opacity-75">کشیدن به چپ یا راست ↔</span>
            </div>
          </div>

          {/* Calculator Carousel Track */}
          <div className="w-full overflow-hidden flex-1 relative z-10 flex min-h-0">
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-out shrink-0"
              style={{
                transform: `translateX(${calcStep * 100}%)`,
              }}
            >
              
              {/* STEP 0: TIME WINDOW */}
              <div className="w-full h-full shrink-0 p-3 sm:p-5 flex flex-col justify-between text-right animate-fade-in min-h-0 overflow-y-auto sm:overflow-visible space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>گام ۱: بازهٔ احتمالی تولد در شبانه‌روز</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">گام ۱ از ۴</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">
                      طبق شنیده‌های خانواده یا حدس اولیه، در کدام بخش شبانه‌روز متولد شده‌اید؟
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs">
                    <div className="p-2 sm:p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block">تاریخ تولد:</span>
                      <input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none focus:text-cyan-300"
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block">شهر تولد:</span>
                      <input
                        type="text"
                        value={birthCity}
                        onChange={(e) => setBirthCity(e.target.value)}
                        className="w-full bg-transparent text-white text-xs focus:outline-none focus:text-cyan-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 max-h-[250px] overflow-y-auto pr-0.5 no-scrollbar">
                    {timeWindows.map((win) => {
                      const Icon = win.icon;
                      const isSelected = selectedWindow === win.id;
                      return (
                        <div
                          key={win.id}
                          onClick={() => setSelectedWindow(win.id)}
                          className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                            isSelected 
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-cyan-950/60 text-cyan-400'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <span className="text-[11px] sm:text-xs font-bold text-white block">{win.title}</span>
                                <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono">{win.range}</span>
                              </div>
                            </div>
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-cyan-400 border-cyan-300 text-slate-950' : 'border-white/20'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-slate-400 text-center font-mono pt-1">
                  پس از انتخاب بازه، برای گام بعد روی دکمه بعدی بزنید
                </div>
              </div>

              {/* STEP 1: PHYSICAL & TEMPERAMENT TRAITS */}
              <div className="w-full h-full shrink-0 p-3 sm:p-5 flex flex-col justify-between text-right animate-fade-in min-h-0 overflow-y-auto sm:overflow-visible space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>گام ۲: فرم استخوان‌بندی و طالع صاعد</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">گام ۲ از ۴</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">
                      طالع (خانه اول) تعیین‌کننده فیزیک چهره و لحن اولیه است. کدام به شما نزدیک‌تر است؟
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    {physicalTraits.map((trait) => {
                      const isSelected = selectedTrait === trait.id;
                      return (
                        <div
                          key={trait.id}
                          onClick={() => setSelectedTrait(trait.id)}
                          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                            isSelected 
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] sm:text-xs font-bold text-white block">{trait.title}</span>
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-cyan-400 border-cyan-300 text-slate-950' : 'border-white/20'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 leading-snug">{trait.desc}</p>
                          <span className="text-[8.5px] text-cyan-300 font-mono mt-1 block">{trait.element}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-slate-400 text-center font-mono pt-1">
                  انتخاب فرم چهره به تعیین دقیق افق و زاویه صاعد کمک می‌کند
                </div>
              </div>

              {/* STEP 2: MAJOR MILESTONES */}
              <div className="w-full h-full shrink-0 p-3 sm:p-5 flex flex-col justify-between text-right animate-fade-in min-h-0 overflow-y-auto sm:overflow-visible space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        <span>گام ۳: مهم‌ترین تحول سرنوشت‌ساز زندگی</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">گام ۳ از ۴</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">
                      رویدادهای بزرگ با گذر کواکب از وتدها (زاویه MC و خانه‌های ۴، ۷، ۱۰) همگام هستند.
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    {lifeMilestones.map((milestone) => {
                      const isSelected = selectedMilestone === milestone.id;
                      return (
                        <div
                          key={milestone.id}
                          onClick={() => setSelectedMilestone(milestone.id)}
                          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                            isSelected 
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] sm:text-xs font-bold text-white block">{milestone.title}</span>
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-cyan-400 border-cyan-300 text-slate-950' : 'border-white/20'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 leading-snug">{milestone.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-slate-400 text-center font-mono pt-1">
                  رویدادهای کارمیک، دقیق‌ترین قفل‌گشای اوج آسمان (Midheaven) هستند
                </div>
              </div>

              {/* STEP 3: CIRCADIAN RHYTHM */}
              <div className="w-full h-full shrink-0 p-3 sm:p-5 flex flex-col justify-between text-right animate-fade-in min-h-0 overflow-y-auto sm:overflow-visible space-y-2 sm:space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>گام ۴: ساعت اوج ریتم زیستی و کرونوتایپ</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">گام ۴ از ۴</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">
                      طبیعت بدن و ساعت بیداری طبیعی، درجه قرارگیری عطارد و خورشید را تفکیک می‌کند.
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    {circadianRhythms.map((rhythm) => {
                      const isSelected = selectedRhythm === rhythm.id;
                      return (
                        <div
                          key={rhythm.id}
                          onClick={() => setSelectedRhythm(rhythm.id)}
                          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                            isSelected 
                              ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] sm:text-xs font-bold text-white block">{rhythm.title}</span>
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-cyan-400 border-cyan-300 text-slate-950' : 'border-white/20'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 leading-snug">{rhythm.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-cyan-300 text-center font-mono pt-1">
                  با کلیک روی «محاسبه ساعت»، الگوریتم هوشمند زایچه را استخراج می‌کند
                </div>
              </div>

              {/* STEP 4: FINAL RESULT */}
              <div className="w-full h-full shrink-0 p-3 sm:p-5 flex flex-col justify-between text-right animate-fade-in min-h-0 overflow-y-auto sm:overflow-visible space-y-2 sm:space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold">نتیجه استخراج ساعت زایچه (آرمانوین)</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300">
                      دقت {calculatedResult.confidence}٪
                    </span>
                  </div>

                  {/* Big Calculated Time Display */}
                  <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-tr from-cyan-950/70 via-[#07192C]/90 to-blue-950/60 border border-cyan-400/50 text-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.25)]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-cyan-400/10 blur-xl pointer-events-none" />
                    
                    <span className="text-[10px] text-slate-300 block mb-1 font-mono">ساعت محاسبه‌شده بر اساس تقاطع داده‌ها:</span>
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-teal-200 drop-shadow-[0_2px_15px_rgba(56,189,248,0.6)] dir-ltr inline-block">
                      {calculatedResult.time}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-1.5 text-[10px] text-slate-300">
                      <span>بازه روزانه: {calculatedResult.dayPeriod}</span>
                      <span>·</span>
                      <span>منطقه: {calculatedResult.timeZone}</span>
                    </div>

                    {/* Fine-tuner Minute Slider */}
                    <div className="mt-3 pt-2 border-t border-white/10 text-right">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Sliders className="w-3 h-3 text-cyan-400" />
                          <span>تنظیم دستی دقیقه (+/-):</span>
                        </span>
                        <span className="text-cyan-300 font-mono font-bold">
                          {timeOffsetMinutes > 0 ? `+${timeOffsetMinutes}` : timeOffsetMinutes} دقیقه
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        step="1"
                        value={timeOffsetMinutes}
                        onChange={(e) => setTimeOffsetMinutes(parseInt(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-cyan-950 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Ascendant & MC summary */}
                  <div className="grid grid-cols-2 gap-1.5 text-right text-xs">
                    <div className="p-2 rounded-xl border border-white/10 bg-white/5 space-y-0.5">
                      <span className="text-[9px] text-slate-400 block">طالع کشف‌شده (Ascendant):</span>
                      <span className="text-[11px] sm:text-xs font-bold text-white block">{calculatedResult.ascendant}</span>
                    </div>
                    <div className="p-2 rounded-xl border border-white/10 bg-white/5 space-y-0.5">
                      <span className="text-[9px] text-slate-400 block">اوج آسمان (MC):</span>
                      <span className="text-[11px] sm:text-xs font-bold text-white block">{calculatedResult.mc}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1.5 pt-0.5">
                  <button
                    onClick={handleCopyTime}
                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                  >
                    {copiedTime ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTime ? 'ساعت تولد کپی شد!' : `کپی ساعت تولد (${calculatedResult.time})`}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={handleResetCalc}
                      className="py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>محاسبه مجدد</span>
                    </button>

                    <button
                      onClick={() => setViewMode('dashboard')}
                      className="py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 hover:text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5 border border-amber-400/40 cursor-pointer"
                    >
                      <Home className="w-3 h-3 text-amber-400" />
                      <span>پیشخوان آرمانوین</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Calculator Bottom Dock (قبلی / بعدی) */}
          <div className="p-2 sm:p-3 border-t border-cyan-500/20 relative z-20 backdrop-blur-xl bg-black/60 flex items-center justify-between gap-2.5 animate-fade-in shrink-0">
            <button
              onClick={goToPrevCalcStep}
              className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>قبلی</span>
            </button>

            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCalcStep(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    calcStep === idx 
                      ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]' 
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={calcStepTitles[idx]}
                />
              ))}
            </div>

            <button
              onClick={goToNextCalcStep}
              disabled={isCalculating}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer active:scale-95 text-white ${
                calcStep === 4
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-extrabold'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
              }`}
            >
              <span>
                {isCalculating ? 'محاسبه...' : (calcStep === 3 ? 'محاسبه ساعت' : (calcStep === 4 ? 'اتمام' : 'بعدی'))}
              </span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* PLANET OBSERVATORY HIGH-RESOLUTION MODAL */}
      {selectedPlanetModal && (() => {
        const currentPlanet = planetCatalog.find(p => p.id === selectedPlanetModal) || planetCatalog[0];
        const currentIndex = planetCatalog.findIndex(p => p.id === currentPlanet.id);
        const prevPlanet = planetCatalog[(currentIndex - 1 + planetCatalog.length) % planetCatalog.length];
        const nextPlanet = planetCatalog[(currentIndex + 1) % planetCatalog.length];

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 animate-fade-in" dir="rtl">
            <div className="relative w-full max-w-[420px] rounded-[28px] border border-cyan-400/40 bg-[#06121E]/95 shadow-[0_0_50px_rgba(56,189,248,0.35)] p-5 text-right overflow-hidden flex flex-col justify-between max-h-[92vh] overflow-y-auto">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentPlanet.symbol}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{currentPlanet.name}</span>
                      <span className="text-[11px] font-mono text-cyan-400">{currentPlanet.latin}</span>
                    </h3>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      نمای سه‌بعدی و مشخصات فیزیکی-نجومی سیاره
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanetModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs transition cursor-pointer border border-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="relative py-5 flex flex-col items-center justify-center my-1">
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/10 via-amber-500/10 to-transparent blur-2xl pointer-events-none animate-pulse" />
                <div className="relative z-10 transition-all duration-500 transform hover:scale-105 my-1">
                  {currentPlanet.renderPreview(120)}
                </div>
                <span className={`mt-3 px-3 py-1 rounded-full text-[11px] font-bold border ${currentPlanet.borderColor} bg-black/60 ${currentPlanet.textColor} shadow-sm font-mono`}>
                  {currentPlanet.archetype}
                </span>
              </div>

              <div className="space-y-2 text-xs relative z-10">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-slate-400 block text-[10px] font-mono">بروج تحت حاکمیت:</span>
                    <span className="text-cyan-300 font-bold block">{currentPlanet.domicile}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-slate-400 block text-[10px] font-mono">شرف و هبوط:</span>
                    <span className="text-amber-300 font-bold block">{currentPlanet.exaltation}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-slate-400 block text-[10px] font-mono">عنصر و اخلاط:</span>
                    <span className="text-teal-300 font-bold block">{currentPlanet.element}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                    <span className="text-slate-400 block text-[10px] font-mono">طبیعت و خانه‌ها:</span>
                    <span className="text-purple-300 font-bold block">{currentPlanet.nature}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>نقش سیاره در استخراج دقیق ساعت تولد (آرمانوین):</span>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {currentPlanet.astrologicalImpact}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10 relative z-10">
                <button
                  onClick={() => setSelectedPlanetModal(prevPlanet.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] flex items-center gap-1 transition cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>{prevPlanet.name.split(' ')[1] || prevPlanet.name}</span>
                </button>

                <button
                  onClick={() => setSelectedPlanetModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(56,189,248,0.4)] transition cursor-pointer"
                >
                  بستن نما
                </button>

                <button
                  onClick={() => setSelectedPlanetModal(nextPlanet.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] flex items-center gap-1 transition cursor-pointer"
                >
                  <span>{nextPlanet.name.split(' ')[1] || nextPlanet.name}</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
