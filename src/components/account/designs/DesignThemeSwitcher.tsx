import React, { useState } from 'react';
import { LayoutGrid, Compass, Clock, Columns, Info, Sparkles, Layers } from 'lucide-react';
import { StructuralLayoutId } from './types';
import { DesignComparisonModal } from './DesignComparisonModal';

interface DesignThemeSwitcherProps {
  currentLayout: StructuralLayoutId;
  onSelectLayout: (layout: StructuralLayoutId) => void;
}

export const DesignThemeSwitcher: React.FC<DesignThemeSwitcherProps> = ({
  currentLayout,
  onSelectLayout,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const layoutOptions: {
    id: StructuralLayoutId;
    title: string;
    icon: React.ElementType;
    badge: string;
    tagline: string;
  }[] = [
    {
      id: 'tri-pillar-hub',
      title: 'ترکیب ۱: هاب سه‌لایه کیهانی',
      icon: Compass,
      badge: 'آسمان · مزاج · روان',
      tagline: 'ساختار متمرکز بر ارکان سه‌گانه پرونده با میزکار تحلیلی',
    },
    {
      id: 'daily-journal',
      title: 'ترکیب ۲: تایم‌لاین و ژورنال روزانه',
      icon: Clock,
      badge: 'جریان ۴ مرحله‌ای روز',
      tagline: 'ساختار روزنگار با گام‌های صبحگاه، نیمروز، عصر و شب',
    },
    {
      id: 'split-workspace',
      title: 'ترکیب ۳: ورک‌اسپیس دو نیمه رصدخانه',
      icon: LayoutGrid,
      badge: 'چرخ افلاک تعاملی',
      tagline: 'ساختار اسپلیت: چرخ دایره‌البروج کواکب و کنسول پرونده',
    },
    {
      id: 'kanban-matrix',
      title: 'ترکیب ۴: تابلوی ماتریکس ستونی',
      icon: Columns,
      badge: 'کانبان ۴ ستونه',
      tagline: 'ساختار ستونی یکپارچه: امروز، پرونده، دوره‌ها و دارایی',
    },
  ];

  return (
    <>
      <div className="w-full bg-[#070C12] border-b border-white/10 px-3 sm:px-6 py-2.5 shadow-lg select-none">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-right">
          
          {/* Label */}
          <div className="flex items-center gap-2 text-xs sm:text-sm shrink-0">
            <span className="p-1.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <div className="text-right">
              <span className="font-extrabold text-white block">طرح‌ها و ترکیبات ساختاری حساب:</span>
              <span className="text-[11px] text-slate-400 hidden lg:inline">
                ۴ معماری و چیدمان کاملاً متفاوت بر اساس نیاز و سلیقه
              </span>
            </div>
          </div>

          {/* 4 Structural Layout Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {layoutOptions.map((opt) => {
              const Icon = opt.icon;
              const active = currentLayout === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectLayout(opt.id)}
                  title={opt.tagline}
                  className={`group px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-teal-500 text-slate-950 shadow-md ring-2 ring-teal-400/40'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-slate-950' : 'text-teal-400'}`} />
                  <span className="whitespace-nowrap">{opt.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-slate-950/20 text-slate-900 font-mono' : 'bg-black/30 text-slate-400 font-mono'
                  }`}>
                    {opt.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details Modal Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-teal-300 hover:text-teal-200 bg-teal-950/40 hover:bg-teal-900/60 border border-teal-700/40 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">بررسی معماری طرح‌ها</span>
          </button>

        </div>
      </div>

      {/* Comparison Modal */}
      <DesignComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeLayout={currentLayout}
        onSelectLayout={onSelectLayout}
      />
    </>
  );
};
