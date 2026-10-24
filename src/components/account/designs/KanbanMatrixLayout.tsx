import React from 'react';
import { 
  Columns, CheckSquare, Rocket, BookOpen, Wallet, Star, Flame, 
  ArrowLeft, Check, Sparkles, User, Headphones, ExternalLink, 
  ChevronLeft, Plus, Send, Clock 
} from 'lucide-react';
import { SharedLayoutProps } from './types';

export const KanbanMatrixLayout: React.FC<SharedLayoutProps> = ({
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
  return (
    <div className="w-full bg-[#07090E] text-slate-100 py-6 sm:py-8 px-3 sm:px-6 select-none font-sans" dir="rtl">
      <div className="max-w-[1340px] mx-auto space-y-6">

        {/* Board Header Bar */}
        <div className="p-5 rounded-3xl bg-[#0D121F] border border-[#1E293B] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                ترکیب ۴: تابلوی ماتریکس ستونی ۴گانه
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">کاربر: <strong className="text-white">{userData.displayName}</strong></span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">سطح: {userData.plan}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-serif">
              تابلوی عملیاتی و یکپارچه حساب کاربری
            </h1>
            <p className="text-xs text-slate-400 font-light">
              در این چیدمان، تمام بخش‌ها در چهار ستون تخصصی «امروز من»، «پرونده و مشاوره»، «دانش و دوره‌ها» و «دارایی و باشگاه» پیش روی شما قرار دارند.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCopyInvite}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{copiedInvite ? 'کپی شد ✓' : 'دعوت همراهان'}</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-300 transition cursor-pointer"
            >
              خروج
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4-COLUMN KANBAN BOARD                                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          
          {/* ======================================================================= */}
          {/* COLUMN 1: امروز من (MY DAY & MISSIONS)                                  */}
          {/* ======================================================================= */}
          <div className="p-4 rounded-3xl bg-[#0D121F] border border-[#1E293B] shadow-lg space-y-3.5 text-right">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">۱. امروز من</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                {missions.filter(m => m.done).length}/{missions.length}
              </span>
            </div>

            {/* Streak Widget */}
            <div className="p-3 rounded-2xl bg-[#080B13] border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{userData.streakDays} روز استریک پیوسته</span>
                </span>
                <span className="text-[11px] text-slate-400">۳ روز تا پاداش 🔥</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>

            {/* Missions List */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 block font-medium">مأموریت‌های فعال هفتگی:</span>
              {missions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onToggleMission(m.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    m.done 
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-400' 
                      : 'bg-[#080B13] border-[#1C2538] hover:border-emerald-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs leading-snug ${m.done ? 'line-through text-slate-500' : 'text-white'}`}>
                      {m.title}
                    </span>
                    <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center mt-0.5 ${
                      m.done ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold' : 'border-slate-600'
                    }`}>
                      {m.done && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-emerald-400">
                    <span>امتیاز:</span>
                    <span className="font-bold">+{m.points} pt</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Browser Reminder Button */}
            <button
              onClick={onToggleReminder}
              className={`w-full py-2 rounded-xl text-xs font-medium border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                browserReminderActive
                  ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                  : 'bg-[#080B13] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span>{browserReminderActive ? 'یادآور مرورگر فعال است ✓' : 'فعال‌سازی یادآور مرورگر'}</span>
            </button>
          </div>

          {/* ======================================================================= */}
          {/* COLUMN 2: پرونده و مشاوره (DOSSIER & HEALTH)                           */}
          {/* ======================================================================= */}
          <div className="p-4 rounded-3xl bg-[#0D121F] border border-[#1E293B] shadow-lg space-y-3.5 text-right">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">۲. پرونده شخصی</h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                فعال
              </span>
            </div>

            {/* Main Portal Card */}
            <div className="p-4 rounded-2xl bg-[#080B13] border border-cyan-500/20 space-y-2.5">
              <span className="text-[11px] text-cyan-400 font-bold">پرونده جامع مهدی عاری</span>
              <h4 className="text-xs font-bold text-white leading-relaxed">
                چهار بخش پرونده، پیام مشاور و هماهنگی جلسه
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                سوابق چارت ناتال، ارزیابی مزاج و کهن‌الگو در پرونده ثبت است.
              </p>
              <button
                onClick={() => setActiveTab('portal')}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>ورود به پنل پرونده ←</span>
              </button>
            </div>

            {/* Birth Chart Quick Card */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">چارت آسمان ناتال</span>
                <span className="text-[11px] text-slate-400 font-mono">{userData.birthDate}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                مدار تهران · خورشید در اسد · طالع میزان
              </p>
              <button
                onClick={() => setActiveTab('charts')}
                className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 text-xs transition cursor-pointer"
              >
                مشاهده نقشه کواکب
              </button>
            </div>

            {/* AI Astrological Consultation */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">هوش مصنوعی آرماهوش</span>
                <span className="text-[10px] text-cyan-400 font-mono">ONLINE</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تحلیل هم‌زمان سه لایه روان، مزاج و آسمان
              </p>
              <button
                onClick={() => setActiveTab('ai')}
                className="w-full py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/40 text-xs transition cursor-pointer"
              >
                گفتگو با آرماهوش
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* COLUMN 3: دانش و دوره‌ها (LEARNING & MINI COURSES)                       */}
          {/* ======================================================================= */}
          <div className="p-4 rounded-3xl bg-[#0D121F] border border-[#1E293B] shadow-lg space-y-3.5 text-right">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">۳. مینی دوره‌ها</h3>
              </div>
              <span className="text-[11px] font-mono text-amber-400">۳ دوره فعال</span>
            </div>

            <div className="space-y-2.5">
              {courses.map((course) => (
                <div key={course.id} className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{course.emoji}</span>
                    <h4 className="text-xs font-bold text-white leading-snug">{course.title}</h4>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{course.lessons}</span>
                      <span className="font-mono text-amber-400">{course.progress}٪</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('courses')}
                    className="w-full py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition cursor-pointer"
                  >
                    ادامه مشاهده درس
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('courses')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition cursor-pointer"
            >
              مشاهده کاتالوگ دوره‌های آرمانوین
            </button>
          </div>

          {/* ======================================================================= */}
          {/* COLUMN 4: دارایی، باشگاه و پشتیبانی (ASSETS & SUPPORT)                 */}
          {/* ======================================================================= */}
          <div className="p-4 rounded-3xl bg-[#0D121F] border border-[#1E293B] shadow-lg space-y-3.5 text-right">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">۴. دارایی و باشگاه</h3>
              </div>
              <span className="text-[11px] font-mono text-purple-400">رتبه {userData.tier}</span>
            </div>

            {/* Wallet Card */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 block">موجودی کیف پول:</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-emerald-400">{userData.balanceToman} تومان</span>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition cursor-pointer"
                >
                  شارژ
                </button>
              </div>
            </div>

            {/* Club Points Card */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 block">امتیاز باشگاه مشتریان:</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-amber-300">{userData.clubPoints} pt</span>
                <button
                  onClick={() => setActiveTab('club')}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-bold transition cursor-pointer"
                >
                  جوایز
                </button>
              </div>
            </div>

            {/* Invite Affiliate */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 block">کسب درآمد و دعوت:</span>
              <p className="text-[11px] text-slate-300 font-mono">{userData.inviteCode}</p>
              <button
                onClick={onCopyInvite}
                className="w-full py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-bold transition cursor-pointer"
              >
                {copiedInvite ? 'کپی شد ✓' : 'کپی لینک معرف'}
              </button>
            </div>

            {/* Quick Ticket Drawer */}
            <div className="p-3.5 rounded-2xl bg-[#080B13] border border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 block">ارتباط با پشتیبانی:</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="پیام یا سؤال شما..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 text-right"
                />
                <button
                  onClick={onSubmitTicket}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  ارسال
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
