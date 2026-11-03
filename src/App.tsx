import React, { useState } from 'react';
import { ArmanveinMiniApp } from './components/miniapp/ArmanveinMiniApp';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  // Simple viewport preview toggle: 'mobile' (default) or 'responsive'
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#030708] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between overflow-hidden p-0 sm:py-2 sm:px-4" dir="rtl">
      
      {/* Minimal Top Brand Bar - Shown on desktop/tablet */}
      <header className="hidden sm:flex max-w-[430px] mx-auto w-full items-center justify-between pb-2 px-1 border-b border-white/5 mb-1 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.35)]">
            <div className="w-full h-full bg-[#050D14] rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-white font-serif block">
              برنامک استخراج ساعت تولد
            </span>
            <span className="text-[9px] text-cyan-400 font-mono block">
              آکادمی آرمانوین · طراحی اسلایدی
            </span>
          </div>
        </div>

        {/* Viewport Frame Toggle */}
        <div className="flex items-center gap-1 bg-[#07131D] p-0.5 rounded-lg border border-cyan-500/20">
          <button
            onClick={() => setIsMobileFrame(true)}
            className={`px-2 py-1 rounded-md text-[10px] transition cursor-pointer flex items-center gap-1 ${
              isMobileFrame 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="نمای فریم موبایل"
          >
            <Smartphone className="w-3 h-3" />
            <span>موبایل</span>
          </button>
          <button
            onClick={() => setIsMobileFrame(false)}
            className={`px-2 py-1 rounded-md text-[10px] transition cursor-pointer flex items-center gap-1 ${
              !isMobileFrame 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
            title="نمای فراگیر"
          >
            <Monitor className="w-3 h-3" />
            <span>فراگیر</span>
          </button>
        </div>
      </header>

      {/* Main MVP Content View - Exactly 100% height on mobile without scroll */}
      <main className="w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden">
        <div className={`w-full h-full transition-all duration-300 flex flex-col justify-center ${isMobileFrame ? 'max-w-[430px]' : 'max-w-[480px]'}`}>
          <ArmanveinMiniApp />
        </div>
      </main>

      {/* Minimal Footer - hidden on mobile to guarantee zero scroll */}
      <footer className="hidden sm:block text-center pt-1 text-[9px] text-slate-500 font-mono shrink-0">
        نسخه اختصاصی آکادمی آرمانوین · طراحی فیت موبایل و بدون اسکرول
      </footer>

    </div>
  );
}
