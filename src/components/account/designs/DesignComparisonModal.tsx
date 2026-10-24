import React from 'react';
import { X, Check, Sparkles, Compass, Clock, LayoutGrid, Columns, Layers } from 'lucide-react';
import { StructuralLayoutId } from './types';

interface DesignComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayout: StructuralLayoutId;
  onSelectLayout: (layout: StructuralLayoutId) => void;
}

export const DesignComparisonModal: React.FC<DesignComparisonModalProps> = ({
  isOpen,
  onClose,
  activeLayout,
  onSelectLayout,
}) => {
  if (!isOpen) return null;

  const compositions = [
    {
      id: 'tri-pillar-hub' as StructuralLayoutId,
      name: 'ترکیب ۱: هاب سه‌لایه کیهانی (Tri-Pillar Nexus)',
      subtitle: 'ساختار اختصاصی متمرکز بر فلسفه آرمانوین: آسمان (نجوم) · تن (مزاج) · روان (یونگ)',
      icon: Compass,
      tag: 'تعادل بنیادین',
      wireframe: 'نوار افقی وضعیت مدار روز + ماتریس ۳ ستونه متقارن ارکان + میزکار تحلیلی تعاملی پایین',
      highlights: [
        'چینش هم‌ارز و متقارن ۳ رکن اصلی بدون نیاز به سایدبار سنتی',
        'کارت اختصاصی نجوم (برج اسد، طالع میزان، کوکب حاکم) با داده‌های ناتال',
        'کارت مزاج و ارکان بدن با تدابیر اختصاصی تعدیل و تعادل زیستی',
        'کارت روانشناسی یونگی با مأموریت‌های خودآگاهی و سایه',
        'میزکار تعاملی برای درخواست مشاوره مستقیم از آرماهوش روی هر رکن',
      ],
      idealFor: 'کسانی که مایلند ابعاد سه‌گانه پرونده خود را به طور هم‌زمان و متصل به هم در یک کادر مشاهده کنند.',
    },
    {
      id: 'daily-journal' as StructuralLayoutId,
      name: 'ترکیب ۲: تایم‌لاین و ژورنال تکاملی روزانه',
      subtitle: 'ساختار مبتنی بر جریان زمان و سفر پیوسته رشد آگاهی در طول روز',
      icon: Clock,
      tag: 'جریان روزنگار (Flow)',
      wireframe: 'تقویم افقی ۷ روز هفته با کواکب حاکم + تایم‌لاین عمودی ۴ فاز روزانه + فیلد ثبت بازخورد',
      highlights: [
        'ساماندهی فعالیت‌ها بر اساس گام‌های چهارگانه: صبحگاه (مزاج)، نیمروز (نجوم و AI)، عصرگاه (دوره‌ها)، شامگاه (بازخورد)',
        'نوار تقویم تعاملی شنبه تا جمعه با موقعیت فاز قمر و انرژی غالب هر روز',
        'امکان ثبت مستقیم یادداشت‌های روزانه در پرونده مشاوره با دریافت ۱۰ امتیاز باشگاه',
        'شمارنده استریک و زنجیره پیوستگی با انگیزش گیمیفیکیشن قوی',
      ],
      idealFor: 'کاربرانی که می‌خواهند از سامانه به عنوان یک همراه روزمره برای خودشناسی و عادات روزانه استفاده کنند.',
    },
    {
      id: 'split-workspace' as StructuralLayoutId,
      name: 'ترکیب ۳: ورک‌اسپیس دو نیمه رصدخانه',
      subtitle: 'ساختار حرفه‌ای تحلیلی (Split View) با چرخ دایره‌البروج تعاملی و کنسول پرونده',
      icon: LayoutGrid,
      tag: 'رصدخانه تخصصی',
      wireframe: 'نیمه راست: رصدخانه نجومی و چرخ ۳۶۰ درجه تعاملی | نیمه چپ: کنسول پرونده، چت آرماهوش و مأموریت‌ها',
      highlights: [
        'چرخ گرافیکی دایره‌البروج با ۱۲ خانه فلکی و زوایای تراز نسبت به مدار تولد',
        'امکان کلیک روی هر سیاره (خورشید، ماه، عطارد، زهره، مریخ، مشتری) و دریافت تفسیر اختصاصی',
        'کنسول یکپارچه عملیاتی در نیمه روبه‌رو با تب‌های پرونده شخصی، چت هوشمند و مأموریت‌ها',
        'بدون اسکرول‌های طولانی؛ دسترسی متمرکز به داده‌ها در یک نگاه حرفه‌ای',
      ],
      idealFor: 'علاقه‌مندان به مبانی عمیق آسترولوژی، چارت ناتال و کار با کنسول‌های تحلیلی مانیتورینگ.',
    },
    {
      id: 'kanban-matrix' as StructuralLayoutId,
      name: 'ترکیب ۴: تابلوی ماتریکس ستونی ۴گانه',
      subtitle: 'ساختار تابلوهای ستونی کانبان چابک با تفکیک کامل ۴ حوزه کاربری',
      icon: Columns,
      tag: 'چابک و با بهره‌وری بالا',
      wireframe: 'چهار ستون عملیاتی مجزا: ۱. امروز من | ۲. پرونده و مشاوره | ۳. مینی دوره‌ها | ۴. دارایی و باشگاه',
      highlights: [
        'تفکیک مأموریت‌های روز، امور پرونده، دوره‌های یادگیری و امور مالی در ستون‌های مستقل',
        'مشاهده پیشرفت دروس دوره‌ها (۸ از ۱۲ درس) همراه با درصد پیشرفت گرافیکی',
        'مدیریت یکپارچه موجودی کیف پول و امتیازات باشگاه در کنار ثبت سریع تیکت پشتیبانی',
        'دسترسی سریع به همه امکانات بدون نیاز به رفتن به صفحات تو در تو',
      ],
      idealFor: 'کاربران عمل‌گرا که عاشق نظم ساختاری، مدیریت وظایف، پیگیری دوره‌ها و مدیریت حساب هستند.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0A0E17] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl text-right text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                بررسی معماری و ترکیبات ساختاری حساب کاربری
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              این ۴ چیدمان، تغییرات ساختاری، منطقی و عملکردی در نحوه سازماندهی داده‌ها و ابزارهای شما ایجاد می‌کنند.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Compositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6">
          {compositions.map((comp) => {
            const isSelected = activeLayout === comp.id;
            const CompIcon = comp.icon;
            return (
              <div
                key={comp.id}
                onClick={() => {
                  onSelectLayout(comp.id);
                  onClose();
                }}
                className={`group relative rounded-3xl p-5 sm:p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-teal-950/20 border-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.15)] ring-1 ring-teal-400/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {comp.tag}
                    </span>
                    
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs text-teal-400 font-bold">
                        <Check className="w-4 h-4" />
                        <span>ترکیب فعال</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition flex items-center gap-2">
                      <CompIcon className="w-5 h-5 text-teal-400" />
                      <span>{comp.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {comp.subtitle}
                    </p>
                  </div>

                  {/* Wireframe schema */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-teal-200">
                    <strong className="block text-slate-300 mb-0.5">الگوی چیدمان و وایرفریم:</strong>
                    <span>{comp.wireframe}</span>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-slate-300">
                    {comp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400 mt-0.5">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {comp.idealFor}
                  </span>

                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}
                  >
                    {isSelected ? 'ترکیب فعال شما' : 'فعال‌سازی این چیدمان'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200">
          <span>اطلاعات پرونده، امتیازها و مأموریت‌های شما در تمام این ترکیبات به شکل یکسان و زنده حفظ می‌شود.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition shrink-0 cursor-pointer"
          >
            بستن و ادامه در سامانه
          </button>
        </div>

      </div>
    </div>
  );
};
