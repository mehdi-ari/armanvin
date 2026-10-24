export interface Lesson {
  id: number;
  sessionNumberStr: string;
  title: string;
  duration: string;
  durationSeconds: number;
  currentTimeSeconds: number;
  isLocked: boolean;
  transcript: string;
  keyPoints: string[];
}

export interface MiniCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'celestial-star' | 'temperament-flame' | 'psyche-gem';
  sessionCount: number;
  totalDuration: string;
  level: string;
  category: 'astrology' | 'temperament' | 'psychology' | 'all';
  categoryLabel: string;
  accentColor: string;
  progressPercent: number;
  completedSessions: number;
  lessons: Lesson[];
}

export const MINI_COURSES_DATA: MiniCourse[] = [
  {
    id: 'hekmat-asman',
    title: 'حکمت آسمان',
    subtitle: 'آسترولوژی تکاملی از صفر تا چارت شخصی',
    description: 'زبان آسمان و نقشۀ راه تولدت — آسترولوژی تکاملی از صفر.',
    iconType: 'celestial-star',
    sessionCount: 6,
    totalDuration: '۸:۴۵',
    level: 'مقدماتی',
    category: 'astrology',
    categoryLabel: 'آسترولوژی تکاملی',
    accentColor: '#f59e0b',
    progressPercent: 21,
    completedSessions: 1,
    lessons: [
      {
        id: 1,
        sessionNumberStr: 'جلسه اول',
        title: 'ورود به حکمت کهکشانی و هندسه روح',
        duration: '۸:۴۵',
        durationSeconds: 525,
        currentTimeSeconds: 108,
        isLocked: false,
        keyPoints: [
          'گذر از فال‌بینی سنتی به نقشه راهروانی خودآگاهی',
          'چهار صورت فلکی و عناصر اساسی درون آدمی',
          'چگونه زاویه تولد پتانسیل‌های پنهان را آشکار می‌کند',
        ],
        transcript: `به حکمت آسمان خوش آمدید. آسمان صرفاً مجموعه‌ای از ستارگان دوردست نیست؛ بلکه آینه‌ای کهن از کهن‌الگوهای ناخودآگاه جمعی و هندسه پنهان روان آدمی است.

در آسترولوژی تکاملی، ما نقشه تولد را یک جبر مقدر نمی‌دانیم، بلکه آن را یک «قطب‌نمای کهکشانی» برای شناخت چالش‌ها، موهبت‌ها و رسالت روح می‌شناسیم.

محورهای کلیدی این جلسه:
۱. درک هندسه فلکی و زاویه‌شناسی سیارات نسبت به لحظه ورود شما به جهان.
۲. گذر از طالع‌بینی سنتی و پیشگویانه به تحلیل اگزیستانسیال و روان‌شناختی.
۳. مفهوم انرژی عناصر چهارگانه (آتش، خاک، هوا، آب) در نقشه زایشی شما.
۴. چگونگی تبدیل تنش‌های چارت تولد به سوخت شکوفایی فردی.

در طول این جلسه، روی تنفس و شنیدن شهودی تمرکز کنید و مفاهیم را با احوال درونی خود تطبیق دهید.`,
      },
      {
        id: 2,
        sessionNumberStr: 'جلسه دوم',
        title: 'خانه‌های دوازده‌گانه و عرصه‌های زیست انسانی',
        duration: '۱۴:۲۰',
        durationSeconds: 860,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: [
          'تحلیل قلمروهای دوازده‌گانه زندگی از هویت تا معنویت',
          'چگونگی جریان انرژی در خانه‌های فردی و جمعی',
        ],
        transcript: 'جلسۀ اول رایگان است. برای دسترسی به ادامه این جلسه وارد حساب کاربری خود شوید.',
      },
      {
        id: 3,
        sessionNumberStr: 'جلسه سوم',
        title: 'سیارات شخصی: خورشید، ماه، عطارد، زهره و مریخ',
        duration: '۱۲:۱۰',
        durationSeconds: 730,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: [
          'روان‌شناسی خورشید (رسالت) و ماه (امنیت هیجانی)',
          'تکمیل منظومه درونی احساس و اندیشه',
        ],
        transcript: 'جلسۀ اول رایگان است. برای دسترسی به ادامه این جلسه وارد حساب کاربری خود شوید.',
      },
      {
        id: 4,
        sessionNumberStr: 'جلسه چهارم',
        title: 'زوایا و کشمکش‌های رشدافزا در چارت',
        duration: '۱۶:۳۰',
        durationSeconds: 990,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: [
          'ترابرد تنش‌ها به موهبت‌های تکاملی',
          'ترینیتی‌ها و زوایای هماهنگ انرژی',
        ],
        transcript: 'جلسۀ اول رایگان است. برای دسترسی به ادامه این جلسه وارد حساب کاربری خود شوید.',
      },
      {
        id: 5,
        sessionNumberStr: 'جلسه پنجم',
        title: 'گره‌های کارمایی ماه: خاستگاه و مقصد روان',
        duration: '۱۱:۴۰',
        durationSeconds: 700,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: [
          'گره جنوبی (منطقه امن گذشته) و گره شمالی (دعوت آینده)',
          'نقشه رشد فردی در چرخه زندگی',
        ],
        transcript: 'جلسۀ اول رایگان است. برای دسترسی به ادامه این جلسه وارد حساب کاربری خود شوید.',
      },
      {
        id: 6,
        sessionNumberStr: 'جلسه ششم',
        title: 'تلفیق حکمت فلکی با بیداری هشیاری روزمره',
        duration: '۱۵:۰۰',
        durationSeconds: 900,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: [
          'به‌کارگیری چارت در تصمیم‌گیری‌های شغلی و عاطفی',
          'پایان دوره و دریافت نقشه راه یکپارچه',
        ],
        transcript: 'جلسۀ اول رایگان است. برای دسترسی به ادامه این جلسه وارد حساب کاربری خود شوید.',
      },
    ],
  },
  {
    id: 'mezaj-shenasi',
    title: 'مزاجت رو بشناس',
    subtitle: 'بیولوژی، انرژی زیستی و تعادل ارکان اربعه',
    description: 'بدن و انرژی‌ات از نگاه مزاج‌شناسی — چهار مزاج و جای تو میان آن‌ها.',
    iconType: 'temperament-flame',
    sessionCount: 5,
    totalDuration: '۷:۱۵',
    level: 'مقدماتی',
    category: 'temperament',
    categoryLabel: 'مزاج‌شناسی کاربردی',
    accentColor: '#10b981',
    progressPercent: 40,
    completedSessions: 2,
    lessons: [
      {
        id: 1,
        sessionNumberStr: 'جلسه اول',
        title: 'ارکان چهارگانه و زبان بیولوژیک بدن',
        duration: '۷:۱۵',
        durationSeconds: 435,
        currentTimeSeconds: 130,
        isLocked: false,
        keyPoints: [
          'شناخت گرمی، سردی، خشکی و تری در بافت و روان',
          'ویژگی‌های تیپ‌های دموی، صفراوی، بلغمی و سوداوی',
          'آهنگ متابولیسم و بیوریتم خواب و بیداری',
        ],
        transcript: `آشنایی با ارکان اربعه و کیفیت‌های پایه: گرمی، سردی، خشکی و تری.

مزاج‌شناسی صرفاً یک دانش سنتی برای انتخاب رژیم غذایی نیست؛ بلکه فهم ضرب‌آهنگ فیزیولوژیک و خلق‌وخوی اصیل شماست. هر فرد با ترکیبی منحصر‌به‌فرد از این چهار نیروی جهان آفریده شده است:

- دموی (گرم و تر): خونگرم، ارتباط‌گر، پرشور و گسترش‌یابنده.
- صفراوی (گرم و خشک): متمرکز بر هدف، بااراده، شتابنده و تیزهوش.
- بلغمی (سرد و تر): آرام، صبور، ذخیره‌کننده انرژی و سازگار.
- سوداوی (سرد و خشک): دقیق، موشکاف، اندیشه‌ورز و آینده‌نگر.

در این جلسه نخست، چگونگی رصد نشانه‌های فیزیکی و رفتاری برای تشخیص مزاج سرشتی را فرا می‌گیرید.`,
      },
      {
        id: 2,
        sessionNumberStr: 'جلسه دوم',
        title: 'مزاج سرشتی در برابر غلبه مزاج عارضی',
        duration: '۱۰:۰۰',
        durationSeconds: 600,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['شناسایی خروج از تعادل و نشانه‌های التهاب یا انجماد انرژی'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 3,
        sessionNumberStr: 'جلسه سوم',
        title: 'رژیم حیاتی و تغذیه سازگار با ریتم شما',
        duration: '۱۲:۳۰',
        durationSeconds: 750,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['ترکیب خوراک‌ها برای حفظ انرژی پایدار روزانه'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 4,
        sessionNumberStr: 'جلسه چهارم',
        title: 'تنظیم خلق و خوی روانی از مجرای کبد و قلب',
        duration: '۹:۴۵',
        durationSeconds: 585,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['ارتباط اخلاط اربعه با واکنش‌های اضطرابی و خشم'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 5,
        sessionNumberStr: 'جلسه پنجم',
        title: 'سبک زندگی هماهنگ و پایداری در سلامت',
        duration: '۱۴:۱۵',
        durationSeconds: 855,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['تنظیم ساعت خواب، ورزش و استراحت بر مبنای طبع'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
    ],
  },
  {
    id: 'memari-zehn',
    title: 'معماری ذهن',
    subtitle: 'نقشه ناهشیار، سایه‌ها و کهن‌الگوهای روانی',
    description: 'نقشۀ ذهن و الگوهای رفتاری‌ات — از نگاه روانشناسی تحلیلی.',
    iconType: 'psyche-gem',
    sessionCount: 6,
    totalDuration: '۹:۲۰',
    level: 'متوسط',
    category: 'psychology',
    categoryLabel: 'روانشناسی تحلیلی',
    accentColor: '#8b5cf6',
    progressPercent: 18,
    completedSessions: 1,
    lessons: [
      {
        id: 1,
        sessionNumberStr: 'جلسه اول',
        title: 'لایه‌های سه‌گانه روان و ساختار ناهشیار',
        duration: '۹:۲۰',
        durationSeconds: 560,
        currentTimeSeconds: 205,
        isLocked: false,
        keyPoints: [
          'نقاب اجتماعی (پرسونا) و هزینه‌های طرد خود واقعی',
          'مفهوم سایه روان و چگونگی فرافکنی آن روی دیگران',
          'سفر فردیت‌یابی و بازپس‌گیری انرژی حیاتی',
        ],
        transcript: `معماری ذهن: ساختارهای پنهان چگونه اعمال و انتخاب‌های روزمره ما را کارگردانی می‌کنند؟

در مکتب روانشناسی ژرفانگر کارل گوستاو یونگ، خودآگاه تنها بخش کوچکی از روان است که روی اقیانوسی پهناور از ناخودآگاه شناور مانده است.

آنچه در تاریکی ناخودآگاه می‌ماند، به شکل سرنوشت در برابرمان ظاهر می‌شود. با بررسی مفهوم سایه (Shadow)، نقاب (Persona) و کهن‌الگوها در این جلسه نخست، نخستین گام اساسی برای ادغام درونی و رهایی از رفتارهای تکراری خودتخریب‌گر را برمی‌داریم.`,
      },
      {
        id: 2,
        sessionNumberStr: 'جلسه دوم',
        title: 'شناسایی و مواجهه خلاق با سایه‌ها',
        duration: '۱۱:۵۰',
        durationSeconds: 710,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['تمرین‌های عملی برای مشاهده قضاوت‌ها و فرافکنی‌ها'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 3,
        sessionNumberStr: 'جلسه سوم',
        title: 'آنیما و آنیموس: کشف قطبیت‌های درون',
        duration: '۱۳:۱۵',
        durationSeconds: 795,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['تعادل انرژی زنانه و مردانه درون روان'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 4,
        sessionNumberStr: 'جلسه چهارم',
        title: 'زبان نمادها و تحلیل رویاها',
        duration: '۱۵:۰۰',
        durationSeconds: 900,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['چگونگی رمزگشایی از پیام‌های شبانه ضمیر ناهشیار'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 5,
        sessionNumberStr: 'جلسه پنجم',
        title: 'عقده‌های روانی و خلع سلاح محرک‌ها',
        duration: '۱۰:۴۰',
        durationSeconds: 640,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['مدیریت طوفان‌های عاطفی و واکنش‌های ناگهانی'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
      {
        id: 6,
        sessionNumberStr: 'جلسه ششم',
        title: 'تجلی خود برتر و یگانگی فردی',
        duration: '۱۴:۳۰',
        durationSeconds: 870,
        currentTimeSeconds: 0,
        isLocked: true,
        keyPoints: ['رسیدن به صلح اصیل درونی و انسجام روانی'],
        transcript: 'جلسۀ اول رایگان است. برای ادامه وارد شوید.',
      },
    ],
  },
];
