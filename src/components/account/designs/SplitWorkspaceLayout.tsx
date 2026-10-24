import React, { useState } from 'react';
import { 
  Sun, Moon, Compass, Sparkles, Brain, Rocket, Eye, Shield, 
  Wallet, Crown, ArrowLeft, Check, Star, RefreshCw, Send, 
  ExternalLink, Layers, Award, Terminal 
} from 'lucide-react';
import { SharedLayoutProps } from './types';

export const SplitWorkspaceLayout: React.FC<SharedLayoutProps> = ({
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
  const [selectedPlanet, setSelectedPlanet] = useState<string>('sun');
  const [activeConsoleTab, setActiveConsoleTab] = useState<'portal' | 'ai' | 'missions' | 'wallet'>('portal');
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `درود بر مهدی عاری عزیز. چارت ناتال شما با محوریت خورشید در برج اسد و طالع میزان بررسی شده است. در خصوص کدام سیاره یا زاویه سؤالی دارید؟` }
  ]);

  const planetsData: Record<string, { name: string; symbol: string; sign: string; house: string; interpretation: string }> = {
    sun: { name: 'خورشید', symbol: '☉', sign: 'اسد (Leo)', house: 'خانه یازدهم', interpretation: 'کانون اقتدار، تابش هویت فردی، هدایت گروه‌ها و آرمان‌های بلندمدت.' },
    moon: { name: 'ماه', symbol: '☽', sign: 'جوزا (Gemini)', house: 'خانه نهم', interpretation: 'شهود فکری سریع، کنجکاوی در فلسفه و گرایش به سفرهای فکری و یادگیری پیوسته.' },
    mercury: { name: 'عطارد', symbol: '☿', sign: 'سنبله (Virgo)', house: 'خانه دوازدهم', interpretation: 'تحلیل دقیق جزئیات پنهان، شهود ذهنی قوی و مهارت در بازشناسی الگوهای ناخودآگاه.' },
    venus: { name: 'زهره', symbol: '♀', sign: 'سرطان (Cancer)', house: 'خانه دهم', interpretation: 'روابط عاطفی عمیق، وفاداری، پیوند حس امنیت خانوادگی با جایگاه اجتماعی.' },
    mars: { name: 'مریخ', symbol: '♂', sign: 'قوس (Sagittarius)', house: 'خانه سوم', interpretation: 'شجاعت در ابراز عقاید، حرکت پرشور در مسیر آرمان‌ها و صراحت کلام.' },
    jupiter: { name: 'مشتری', symbol: '♃', sign: 'جدی (Capricorn)', house: 'خانه چهارم', interpretation: 'رشد از طریق استقامت و ساختاربندی محکم، برکت در ریشه‌ها و میراث خانوادگی.' },
  };

  const handleSendAi = () => {
    if (!aiChatInput.trim()) return;
    const userText = aiChatInput;
    setAiChatLog((prev) => [...prev, { role: 'user', text: userText }]);
    setAiChatInput('');

    setTimeout(() => {
      const selected = planetsData[selectedPlanet];
      setAiChatLog((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `تحلیل آرماهوش: در رابطه با «${userText}» و با در نظر گرفتن موقعیت ${selected.name} (${selected.sign} در ${selected.house})، نقطه تعادل شما در اتکا به اعتمادبه‌نفس اصیل و حفظ نظم درونی شکل می‌گیرد.`
        }
      ]);
    }, 600);
  };

  return (
    <div className="w-full bg-[#05070D] text-slate-100 py-6 sm:py-8 px-3 sm:px-6 select-none font-sans" dir="rtl">
      <div className="max-w-[1240px] mx-auto space-y-5">

        {/* Top Slim Status Ribbon */}
        <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20">
              ترکیب ۳: ورک‌اسپیس دو نیمه رصدخانه
            </span>
            <span className="text-white font-bold">{userData.displayName}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{userData.birthDate} · مدار تهران</span>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <span>امتیاز: <strong className="text-teal-400">{userData.clubPoints}</strong></span>
            <span className="text-slate-600">/</span>
            <span>اعتبار: <strong className="text-emerald-400">{userData.balanceToman}</strong> ت</span>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-sans">رتبه {userData.tier}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EQUAL SPLIT-SCREEN WORKSPACE (OBSERVATORY RIGHT, CONSOLE LEFT)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* ======================================================================= */}
          {/* RIGHT HALF: INTERACTIVE ZODIAC OBSERVATORY                               */}
          {/* ======================================================================= */}
          <div className="p-6 rounded-3xl bg-[#090D17] border border-[#1C2538] shadow-2xl flex flex-col justify-between space-y-6">
            
            {/* Header of Observatory */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="space-y-0.5 text-right">
                <span className="text-[11px] font-mono text-teal-400 uppercase tracking-widest">
                  OBSERVATORY ENGINE
                </span>
                <h3 className="text-base font-bold text-white font-serif">
                  چرخ دایره‌البروج و کواکب تولد
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 font-mono">
                  طالع ناتال فعال
                </span>
              </div>
            </div>

            {/* Interactive SVG Zodiac Wheel */}
            <div className="relative w-full max-w-[340px] aspect-square mx-auto flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_0_20px_rgba(45,212,191,0.15)]">
                {/* Outer Ring */}
                <circle cx="120" cy="120" r="110" fill="none" stroke="#1E293B" strokeWidth="2" />
                <circle cx="120" cy="120" r="95" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="120" cy="120" r="60" fill="#0B1120" stroke="#1E293B" strokeWidth="1" />
                
                {/* 12 House Sectors */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="120"
                    y1="120"
                    x2={120 + 95 * Math.cos((deg * Math.PI) / 180)}
                    y2={120 + 95 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#1E293B"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                ))}

                {/* Aspect Triangle Lines */}
                <polygon
                  points="120,40 185,155 55,155"
                  fill="rgba(45,212,191,0.04)"
                  stroke="#2DD4BF"
                  strokeWidth="1.2"
                  opacity="0.7"
                />

                {/* Center Core */}
                <circle cx="120" cy="120" r="22" fill="#0F172A" stroke="#2DD4BF" strokeWidth="1.5" />
                <text x="120" y="125" textAnchor="middle" fill="#2DD4BF" fontSize="12" fontWeight="bold">
                  مهدی
                </text>
              </svg>

              {/* Orbital Interactive Planet Glyphs around wheel */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] text-slate-500 font-mono">۳۶۰° SPHERE</span>
              </div>
            </div>

            {/* Planet Selector Strip */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>انتخاب کوکب برای مشاهده موقعیت:</span>
                <span className="text-teal-400 font-bold">{planetsData[selectedPlanet].name} ({planetsData[selectedPlanet].symbol})</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {Object.entries(planetsData).map(([key, data]) => {
                  const isSelected = selectedPlanet === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPlanet(key)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-bold shadow-sm'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/15 text-slate-400'
                      }`}
                    >
                      <span className="text-base block">{data.symbol}</span>
                      <span className="text-[11px] block truncate">{data.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Planet Interpretation Card */}
            <div className="p-4 rounded-2xl bg-[#0E1424] border border-[#232F47] text-right space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-teal-400 text-sm">{planetsData[selectedPlanet].symbol}</span>
                  <span>{planetsData[selectedPlanet].name} در {planetsData[selectedPlanet].sign}</span>
                </span>
                <span className="font-mono text-amber-300 text-[11px] px-2 py-0.5 rounded bg-black/40">
                  {planetsData[selectedPlanet].house}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {planetsData[selectedPlanet].interpretation}
              </p>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* LEFT HALF: THE OPERATIONS & DOSSIER CONSOLE                             */}
          {/* ======================================================================= */}
          <div className="p-6 rounded-3xl bg-[#090D17] border border-[#1C2538] shadow-2xl flex flex-col justify-between space-y-6">
            
            {/* Console Tabs */}
            <div className="p-1 rounded-2xl bg-[#0F1424] border border-[#1C2538] flex items-center justify-between gap-1">
              {[
                { id: 'portal', label: 'پرونده شخصی', icon: Rocket },
                { id: 'ai', label: 'آرماهوش AI', icon: Brain },
                { id: 'missions', label: 'مأموریت‌ها', icon: Star },
                { id: 'wallet', label: 'دارایی و باشگاه', icon: Wallet },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeConsoleTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveConsoleTab(tab.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-teal-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Console Body Based on Active Tab */}
            <div className="flex-1 space-y-4">
              
              {/* TAB 1: PORTAL */}
              {activeConsoleTab === 'portal' && (
                <div className="space-y-4 text-right animate-fade-in">
                  <div className="p-4 rounded-2xl bg-[#0E1424] border border-[#232F47] space-y-2">
                    <span className="text-[11px] text-teal-400 font-bold">وضعیت پرونده جامع مهدی عاری:</span>
                    <h4 className="text-sm font-bold text-white">جلسه و ارزیابی ۴گانه خودآگاهی</h4>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      پرونده شما شامل بررسی مزاج ارکان چهارگانه، چارت ناتال و پرسشنامه روانشناسی یونگی فعال است.
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('portal')}
                        className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                      >
                        ورود به پنل پرونده شخصی ←
                      </button>
                      <span className="text-xs text-slate-400">هماهنگی جلسه مشاوره</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#0B101E] border border-[#1C2538] space-y-1">
                      <span className="text-slate-400">مشاور پرونده:</span>
                      <p className="font-bold text-white">دپارتمان ارشد آرمانوین</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#0B101E] border border-[#1C2538] space-y-1">
                      <span className="text-slate-400">آخرین به‌روزرسانی:</span>
                      <p className="font-bold text-white font-mono">امروز</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI CO-PILOT CHAT */}
              {activeConsoleTab === 'ai' && (
                <div className="space-y-3 text-right flex flex-col h-[280px] animate-fade-in">
                  <div className="flex-1 overflow-y-auto space-y-2 p-3 rounded-2xl bg-[#070A12] border border-[#1C2538] text-xs">
                    {aiChatLog.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl leading-relaxed ${
                          msg.role === 'ai'
                            ? 'bg-[#0E1526] text-teal-200 border border-teal-500/20'
                            : 'bg-teal-500/20 text-white border border-teal-400/40 text-left'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 block font-bold mb-0.5">
                          {msg.role === 'ai' ? 'آرماهوش:' : 'شما:'}
                        </span>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
                      placeholder="سؤال درباره تأثیر کوکب یا زاویه..."
                      className="flex-1 bg-[#0E1424] border border-[#232F47] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400 text-right"
                    />
                    <button
                      onClick={handleSendAi}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                    >
                      ارسال
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: MISSIONS */}
              {activeConsoleTab === 'missions' && (
                <div className="space-y-2.5 text-right animate-fade-in">
                  <span className="text-xs text-slate-400 block">انجام مأموریت‌ها برای دریافت امتیاز باشگاه:</span>
                  <div className="space-y-2 max-h-[260px] overflow-y-auto">
                    {missions.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => onToggleMission(m.id)}
                        className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                          m.done 
                            ? 'bg-teal-950/20 border-teal-800/40 text-slate-400' 
                            : 'bg-[#0B101E] border-[#1C2538] hover:border-teal-500/30 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            m.done ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-600'
                          }`}>
                            {m.done && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`text-xs ${m.done ? 'line-through' : ''}`}>{m.title}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-teal-400">+{m.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WALLET & CLUB */}
              {activeConsoleTab === 'wallet' && (
                <div className="space-y-3 text-right animate-fade-in">
                  <div className="p-4 rounded-2xl bg-[#0E1424] border border-[#232F47] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">موجودی کیف پول</span>
                      <strong className="text-lg font-bold font-mono text-emerald-400">{userData.balanceToman} تومان</strong>
                    </div>
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      افزایش موجودی
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0E1424] border border-[#232F47] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">باشگاه مشتریان و امتیازات</span>
                      <strong className="text-lg font-bold font-mono text-amber-300">{userData.clubPoints} امتیاز</strong>
                    </div>
                    <span className="text-xs text-slate-400">رتبه {userData.tier}</span>
                  </div>

                  <button
                    onClick={onCopyInvite}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-teal-300 transition cursor-pointer"
                  >
                    {copiedInvite ? 'کد دعوت کپی شد ✓' : `کپی لینک اختصاصی (${userData.inviteCode})`}
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Actions of Console */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>اتصال زنده دپارتمان آسترولوژی و طب سنتی</span>
              <button
                onClick={onLogout}
                className="text-rose-400 hover:underline cursor-pointer"
              >
                خروج از حساب
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
