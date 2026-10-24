import React, { useState } from 'react';
import { 
  Sun, Moon, Sparkles, Brain, Leaf, Compass, ArrowLeft, Check, 
  Star, ChevronLeft, Shield, Rocket, User, Wallet, Crown, BookOpen, 
  HelpCircle, ExternalLink, Calendar, Flame
} from 'lucide-react';
import { SharedLayoutProps } from './types';

export const TriPillarHubLayout: React.FC<SharedLayoutProps> = ({
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
  const [selectedPillar, setSelectedPillar] = useState<'asman' | 'mezaj' | 'ravan'>('asman');
  const [aiQuickAsk, setAiQuickAsk] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleAskPillarAi = (topic: string) => {
    setAiQuickAsk(topic);
    if (selectedPillar === 'asman') {
      setAiAnswer('بر اساس گذر فعلی خورشید در منطقه البروج، زمان مناسبی برای تثبیت اهداف شخصی و تمرکز بر انرژی حیاتی است.');
    } else if (selectedPillar === 'mezaj') {
      setAiAnswer('با توجه به طبع پایه گرم و خشک و تغییر فصل، مصرف عرق کاسنی، شربت بنفشه و کاهش ادویه‌جات تند توصیه می‌شود.');
    } else {
      setAiAnswer('کهن‌الگوی «جوینده» نیازمند خلوت فکری و یادداشت‌برداری از رویاهاست تا قطب‌نمای درونی شما روشن بماند.');
    }
  };

  return (
    <div className="w-full bg-[#05090C] text-[#F3EFE6] py-6 sm:py-10 px-3 sm:px-6 select-none font-sans" dir="rtl">
      <div className="max-w-[1160px] mx-auto space-y-6">

        {/* ========================================================================= */}
        {/* COMPOSITION 1 HEADER: ORBITAL STATUS BANNER                              */}
        {/* ========================================================================= */}
        <header className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#071318] via-[#0C1E24] to-[#071318] border border-[#16353F] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Identity & Cosmic Coordinates */}
            <div className="space-y-2 text-right">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#0E2C35] text-[#38BDF8] border border-[#1D4A57] font-bold">
                  هاب جامع ارکان سه‌گانه
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">شناسه حساب: <strong className="font-mono text-white">{userData.inviteCode}</strong></span>
                <span className="text-slate-500">·</span>
                <span className="text-[#34D399]">رتبه {userData.tier}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>سلام، {userData.displayName}</span>
                <span className="text-xl">✨</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                در این ترکیب ساختاری، تمام داده‌های پرونده شما در سه رکن بنیادی «آسمان (نجوم)»، «تن (مزاج)» و «روان (یونگ)» به صورت هم‌ارز و متصل به پرونده شخصی سازماندهی شده‌اند.
              </p>
            </div>

            {/* Live Metrics Ribbon */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full lg:w-auto">
              {/* Points */}
              <div 
                onClick={() => setActiveTab('club')}
                className="flex-1 sm:flex-initial p-3 rounded-2xl bg-[#091D24] border border-[#173D49] text-center min-w-[100px] cursor-pointer hover:border-[#38BDF8] transition"
              >
                <span className="text-[11px] text-slate-400 block">امتیاز باشگاه</span>
                <span className="text-lg font-bold font-mono text-[#38BDF8]">{userData.clubPoints}</span>
              </div>

              {/* Balance */}
              <div 
                onClick={() => setActiveTab('wallet')}
                className="flex-1 sm:flex-initial p-3 rounded-2xl bg-[#091D24] border border-[#173D49] text-center min-w-[100px] cursor-pointer hover:border-[#34D399] transition"
              >
                <span className="text-[11px] text-slate-400 block">کیف پول</span>
                <span className="text-lg font-bold font-mono text-[#34D399]">{userData.balanceToman}</span>
                <span className="text-[10px] text-slate-400 block">تومان</span>
              </div>

              {/* Dossier Quick Access */}
              <button
                onClick={() => setActiveTab('portal')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#38BDF8] hover:to-[#0EA5E9] text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Rocket className="w-4 h-4" />
                <span>پرونده جامع شخصی</span>
              </button>
            </div>

          </div>
        </header>

        {/* ========================================================================= */}
        {/* CORE THREE PILLARS MATRIX (آسمان · تن و مزاج · روان)                      */}
        {/* ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#38BDF8]" />
              <span>ماتریس ارکان سه‌گانه پرونده {userData.displayName}</span>
            </h2>
            <span className="text-xs text-slate-400">روی هر ستون کلیک کنید تا جزئیات فعال شود</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* PILLAR 1: آسمان و نجوم */}
            <div 
              onClick={() => setSelectedPillar('asman')}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPillar === 'asman'
                  ? 'bg-[#0A1F29] border-[#0EA5E9] shadow-[0_0_25px_rgba(14,165,233,0.15)] ring-1 ring-[#0EA5E9]/50'
                  : 'bg-[#071318] border-[#142D36] hover:border-[#1E4552]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F3542] text-[#38BDF8] flex items-center justify-center">
                    <Sun className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#38BDF8] px-2.5 py-0.5 rounded-full bg-[#0B252E] border border-[#164452]">
                    رکن ۱: آسمان
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <h3 className="text-base font-bold text-white">چارت آسمان و افلاک</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    محاسبه طالع تولد ({userData.birthDate})، زاویه کواکب نسبت به مدار تهران و تأثیر ترانزیت‌ها.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#051116] border border-[#102730] text-xs space-y-1.5 text-right font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">برج خورشیدی:</span>
                    <span className="text-[#38BDF8] font-bold">اسد (Leo ♌)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">طالع صعودی:</span>
                    <span className="text-white">میزان (Libra ♎)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">سیاره حاکم:</span>
                    <span className="text-amber-300">خورشید (Sun ☉)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('charts');
                }}
                className="w-full py-2 rounded-xl bg-[#0E2E39] hover:bg-[#143E4D] text-[#38BDF8] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>رسم چارت در آسمان نما</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* PILLAR 2: تن و مزاج */}
            <div 
              onClick={() => setSelectedPillar('mezaj')}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPillar === 'mezaj'
                  ? 'bg-[#0A261D] border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-[#10B981]/50'
                  : 'bg-[#071318] border-[#142D36] hover:border-[#1E4552]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#0D382B] text-[#34D399] flex items-center justify-center">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#34D399] px-2.5 py-0.5 rounded-full bg-[#08241C] border border-[#144737]">
                    رکن ۲: تن و مزاج
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <h3 className="text-base font-bold text-white">طبع و ارکان بدن</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    تشخیص اخلاط چهارگانه (صفرا، سودا، دم، بلغم) و ارائه رژیم اختصاصی تعدیل و تعادل زیستی.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#051116] border border-[#102730] text-xs space-y-1.5 text-right font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">طبع سرشتی:</span>
                    <span className="text-[#34D399] font-bold">گرم و خشک (صفرا)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">غلبه عارضی:</span>
                    <span className="text-amber-300">سودای خفیف فصلی</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">توصیه امروز:</span>
                    <span className="text-white font-sans text-[11px]">پرهیز از خشکی شبانه</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('portal');
                }}
                className="w-full py-2 rounded-xl bg-[#0D382B] hover:bg-[#124D3C] text-[#34D399] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>مشاهده پرونده تغذیه و مزاج</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* PILLAR 3: روان و ذهن */}
            <div 
              onClick={() => setSelectedPillar('ravan')}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPillar === 'ravan'
                  ? 'bg-[#1A182E] border-[#A855F7] shadow-[0_0_25px_rgba(168,85,247,0.15)] ring-1 ring-[#A855F7]/50'
                  : 'bg-[#071318] border-[#142D36] hover:border-[#1E4552]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#292247] text-[#C084FC] flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#C084FC] px-2.5 py-0.5 rounded-full bg-[#1D1736] border border-[#3E2F6B]">
                    رکن ۳: روان و ذهن
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <h3 className="text-base font-bold text-white">روانشناسی تحلیلی و کهن‌الگو</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    شناخت سایه‌ها، آنیما/آنیموس و کشف موانع ناخودآگاه در تصمیم‌گیری‌های شغلی و عاطفی.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#051116] border border-[#102730] text-xs space-y-1.5 text-right font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">کهن‌الگوی غالب:</span>
                    <span className="text-[#C084FC] font-bold">جوینده (Seeker)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">کهن‌الگوی مکمل:</span>
                    <span className="text-white">خردمند (Sage)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 font-sans">مأموریت آگاهی:</span>
                    <span className="text-amber-300 font-sans text-[11px]">انضباط ذهن در بحران</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('ai');
                }}
                className="w-full py-2 rounded-xl bg-[#292247] hover:bg-[#382E61] text-[#C084FC] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>مشاوره روانی با آرماهوش</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE WORKBENCH: DETAILED PILLAR DEEP DIVE                          */}
        {/* ========================================================================= */}
        <section className="p-6 rounded-3xl bg-[#071318] border border-[#142D36] shadow-xl space-y-5 text-right">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#142D36] pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#38BDF8]">میزکار تعاملی رکن انتخابی</span>
              <h3 className="text-base font-bold text-white">
                {selectedPillar === 'asman' && '🪐 جزئیات تحلیلی مدار کواکب مهدی عاری'}
                {selectedPillar === 'mezaj' && '🌿 برنامه تدابیر سلامتی و پاکسازی مزاجی'}
                {selectedPillar === 'ravan' && '🧠 پرونده شناخت سایه‌ها و کهن‌الگوهای رفتاری'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAskPillarAi('تحلیل جامع')}
                className="px-3.5 py-1.5 rounded-xl bg-[#0E2E39] hover:bg-[#143E4D] border border-[#1D4A57] text-xs text-[#38BDF8] font-bold transition cursor-pointer"
              >
                تحلیل هوشمند این بخش
              </button>
            </div>
          </div>

          {aiAnswer && (
            <div className="p-4 rounded-2xl bg-[#09222C] border border-[#0EA5E9]/30 text-xs text-[#BAE6FD] leading-relaxed animate-fade-in">
              <strong className="block text-[#38BDF8] font-bold mb-1">نتیجه پردازش آرماهوش روی رکن انتخاب‌شده:</strong>
              {aiAnswer}
            </div>
          )}

          {/* Missions & Tasks in this Architecture */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>مأموریت‌های فعال برای ارتقای رتبه و دریافت پاداش</span>
              </h4>
              <span className="text-xs text-slate-400">
                {missions.filter(m => m.done).length} از {missions.length} مأموریت تکمیل شد
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {missions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onToggleMission(m.id)}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                    m.done 
                      ? 'bg-[#0A261D]/60 border-[#10B981]/50 text-slate-400' 
                      : 'bg-[#051116] border-[#102730] hover:border-[#1E4552] text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      m.done ? 'bg-[#10B981] border-[#10B981] text-slate-950 font-bold' : 'border-slate-600'
                    }`}>
                      {m.done && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs ${m.done ? 'line-through text-slate-400' : 'text-white'}`}>{m.title}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#38BDF8]">+{m.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Utility Strip */}
          <div className="pt-4 border-t border-[#142D36] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleReminder}
                className={`px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                  browserReminderActive 
                    ? 'bg-[#0D382B] border-[#10B981] text-[#34D399]' 
                    : 'bg-[#051116] border-[#142D36] text-slate-400 hover:text-white'
                }`}
              >
                {browserReminderActive ? 'یادآور مرورگر فعال شد' : 'فعال‌سازی یادآور نجومی'}
              </button>

              <button
                onClick={onCopyInvite}
                className="px-3 py-1.5 rounded-xl bg-[#051116] border border-[#142D36] text-amber-300 hover:text-amber-200 transition cursor-pointer"
              >
                {copiedInvite ? 'لینک دعوت کپی شد ✓' : 'دعوت همراهان با کد اختصاصی'}
              </button>
            </div>

            <button
              onClick={onLogout}
              className="text-rose-400 hover:text-rose-300 transition cursor-pointer"
            >
              خروج از حساب کاربری
            </button>
          </div>

        </section>

      </div>
    </div>
  );
};
