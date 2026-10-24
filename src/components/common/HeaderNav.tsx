import React, { useState } from 'react';
import { 
  Menu, X, RotateCcw, Monitor, Tablet, Smartphone, LogIn, Sparkles, 
  ChevronDown, User, Sun, Brain, Eye, Leaf, Heart, BookOpen 
} from 'lucide-react';
import { DeviceMode, HeaderFooterStyle } from '../../types';
import { ArmanveinLogo } from './ArmanveinLogo';

export type ArmanveinNavTab =
  | 'home'
  | 'armahush'
  | 'astrology'
  | 'temperament'
  | 'psychology'
  | 'package'
  | 'minicourses'
  | 'guide'
  | 'account';

interface HeaderNavProps {
  activeTab: ArmanveinNavTab;
  onSelectTab: (tab: ArmanveinNavTab) => void;
  deviceMode?: DeviceMode;
  onDeviceChange?: (mode: DeviceMode) => void;
  onReplayLoader?: () => void;
  onOpenLoginModal: () => void;
  style?: HeaderFooterStyle;
  isLoggedIn?: boolean;
  userName?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onSelectTab,
  deviceMode = 'desktop',
  onDeviceChange,
  onReplayLoader,
  onOpenLoginModal,
  style = 'style1-authentic',
  isLoggedIn = false,
  userName = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact items from authentic Armanvein Header and mobile menu in image_95e7b2f6.png:
  const navTabs: { id: ArmanveinNavTab; label: string; numberStr: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'خانه', numberStr: '۰۱', icon: Sun },
    { id: 'armahush', label: 'آرماهوش', numberStr: '۰۲', icon: Brain },
    { id: 'astrology', label: 'آسترولوژی', numberStr: '۰۳', icon: Eye },
    { id: 'temperament', label: 'مزاج‌شناسی', numberStr: '۰۴', icon: Leaf },
    { id: 'psychology', label: 'روانشناسی', numberStr: '۰۵', icon: Eye },
    { id: 'package', label: 'پکیج', numberStr: '۰۶', icon: Heart },
    { id: 'minicourses', label: 'مینی دوره‌ها', numberStr: '۰۷', icon: Sparkles },
    { id: 'guide', label: 'راهنمای آرمانوین', numberStr: '۰۸', icon: BookOpen },
    { id: 'account', label: 'حساب کاربری', numberStr: '۰۹', icon: User },
  ];

  // =========================================================================
  // DESIGN 1: AUTHENTIC OBSIDIAN & EMERALD (منطبق بر تصویر کاربر)
  // =========================================================================
  if (style === 'style1-authentic') {
    return (
      <header className="w-full bg-[#030607]/95 backdrop-blur-md border-b border-emerald-950/60 sticky top-0 z-40" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo */}
            <div onClick={() => onSelectTab('home')} className="cursor-pointer group flex items-center shrink-0">
              <ArmanveinLogo size="md" />
            </div>

            {/* Exact 8 Pills Navigation from image_0bfcb414.png */}
            <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3.5 2xl:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#0b1c19] text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-semibold'
                        : 'bg-[#050b0c]/80 hover:bg-[#0a1517] text-slate-300 hover:text-white border border-emerald-950/70 hover:border-emerald-800/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Left Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {onReplayLoader && (
                <button
                  onClick={onReplayLoader}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-emerald-300 bg-[#061011] hover:bg-[#0c1d1f] border border-emerald-950/80 transition cursor-pointer"
                  title="مشاهده مجدد لودر"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden 2xl:inline text-[11px]">اجرای لودر</span>
                </button>
              )}

              {/* Exact Login or User Account button */}
              {isLoggedIn ? (
                <button
                  onClick={() => onSelectTab('account')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition cursor-pointer flex items-center gap-2 ${
                    activeTab === 'account'
                      ? 'bg-[#0E2421] text-[#43C6AC] border border-[#1E433C] shadow-[0_0_15px_rgba(67,198,172,0.25)]'
                      : 'bg-[#081315] hover:bg-[#0d2024] text-[#D4B483] border border-emerald-900/90'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#43C6AC]" />
                  <span>{userName || 'حساب کاربری'}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#081315] hover:bg-[#0d2024] border border-emerald-900/90 hover:border-emerald-500/60 shadow-[0_0_18px_rgba(16,185,129,0.15)] transition cursor-pointer flex items-center gap-2"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ورود / ثبت‌نام</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-[#061012] border border-emerald-950 text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Menu matching image_95e7b2f6.png */}
          {mobileMenuOpen && (
            <div className="xl:hidden mt-3 pt-3 border-t border-emerald-950/80 space-y-2 pb-3 animate-fade-in-up">
              {navTabs.map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0d9488] via-[#0b8a77] to-[#047857] text-white border-[#43C6AC] shadow-[0_0_20px_rgba(13,148,136,0.45)]'
                        : 'bg-[#051110] text-slate-200 hover:bg-[#0A1F1C] hover:text-white border-[#12302A]'
                    }`}
                  >
                    <span className="text-right font-bold">{tab.label}</span>
                    <IconComp className={`w-4 h-4 shrink-0 mr-2 ${isActive ? 'text-white' : 'text-[#43C6AC]'}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>
    );
  }

  // =========================================================================
  // DESIGN 2: COSMIC AURIC GOLD (کهکشانی و طلای زرین)
  // =========================================================================
  if (style === 'style2-cosmic-gold') {
    return (
      <header className="w-full bg-[#04060d]/95 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-40 relative" dir="rtl">
        {/* Top Gold Shimmer Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            
            <div onClick={() => onSelectTab('home')} className="cursor-pointer group flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/30 to-amber-200/10 border border-amber-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <span className="text-base font-bold text-white font-serif tracking-tight block">
                  آرمانوین
                </span>
                <span className="text-[10px] text-amber-400/80 font-light block">
                  کهکشان خودشناسی و بینش فردی
                </span>
              </div>
            </div>

            {/* Golden Ribbon Nav */}
            <nav className="hidden xl:flex items-center gap-1 bg-[#090e1d]/80 p-1.5 rounded-2xl border border-amber-500/20 shadow-inner">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/10 text-amber-200 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-bold'
                        : 'text-slate-300 hover:text-amber-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Gold Leaf Auth Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLoginModal}
                className="px-5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 shadow-[0_0_20px_rgba(251,191,36,0.35)] transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>ورود به سامانه ✦</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-[#090e1d] border border-amber-500/30 text-amber-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden mt-3 pt-3 border-t border-amber-500/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-medium ${
                      activeTab === tab.id ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-bold' : 'bg-[#090e1d] text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // =========================================================================
  // DESIGN 3: CYBERNETIC HIGH-TECH (سایبرنتیک های‌تک و فیروزه‌ای)
  // =========================================================================
  if (style === 'style3-cyber-studio') {
    return (
      <header className="w-full bg-[#020608]/95 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40 font-sans" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-4">
            
            <div onClick={() => onSelectTab('home')} className="cursor-pointer group flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#04161a] border border-cyan-400/60 flex items-center justify-center font-mono font-bold text-cyan-300 text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                AV
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-white tracking-widest block font-mono">
                  ARMANVEIN // OS
                </span>
                <span className="text-[10px] text-cyan-400 font-mono block -mt-0.5">
                  SYS_ACTIVE · v2.5
                </span>
              </div>
            </div>

            {/* Cyber Terminal Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer relative ${
                      isActive
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold'
                        : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-950/30 border border-transparent'
                    }`}
                  >
                    <span className="text-[10px] text-cyan-600 ml-1">/{tab.numberStr}</span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bracketed Cyber Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold text-cyan-300 bg-[#061a1f] hover:bg-[#0c2f37] border border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition cursor-pointer flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>[ ورود / ثبت‌نام ]</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-md bg-[#061a1f] border border-cyan-500/40 text-cyan-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden mt-2 pt-2 border-t border-cyan-500/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-md text-xs font-mono ${
                      activeTab === tab.id ? 'bg-cyan-950 text-cyan-300 border border-cyan-400' : 'bg-[#03090c] text-slate-400'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // =========================================================================
  // DESIGN 4: AVANT-GARDE LUXURY EDITORIAL (مجله‌ای آوانگارد)
  // =========================================================================
  if (style === 'style4-luxury-editorial') {
    return (
      <header className="w-full bg-[#08090d]/98 border-b border-slate-800 sticky top-0 z-40" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            
            <div onClick={() => onSelectTab('home')} className="cursor-pointer group flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                آرمـانـویـن
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-xs text-slate-400 font-light tracking-widest hidden sm:inline">
                EDITORIAL EDITION
              </span>
            </div>

            {/* Unboxed Text Links with Dot Separators */}
            <nav className="hidden xl:flex items-center gap-4 text-xs font-medium text-slate-300">
              {navTabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <React.Fragment key={tab.id}>
                    {idx > 0 && <span className="text-slate-700">·</span>}
                    <button
                      onClick={() => onSelectTab(tab.id)}
                      className={`hover:text-white transition-colors cursor-pointer tracking-wide ${
                        isActive ? 'text-white font-bold border-b-2 border-white pb-0.5' : 'text-slate-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Minimal Platinum Outlined Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLoginModal}
                className="px-5 py-2 rounded-full text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-white transition-colors cursor-pointer"
              >
                ورود / عضویت
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden mt-3 pt-3 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3 text-right">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onSelectTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1 text-xs text-right ${activeTab === tab.id ? 'text-white font-bold' : 'text-slate-400'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // =========================================================================
  // DESIGN 5: FROSTED PRISM CRYSTAL (کریستال شیشه‌ای بلورین)
  // =========================================================================
  return (
    <header className="w-full sticky top-0 z-40 py-2 sm:py-3 px-3 sm:px-6" dir="rtl">
      <div className="max-w-[1400px] mx-auto bg-[#0a0f18]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between gap-4">
          
          <div onClick={() => onSelectTab('home')} className="cursor-pointer group flex items-center shrink-0">
            <ArmanveinLogo size="md" />
          </div>

          {/* Floating Glass Pills */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/5">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Iridescent Glass Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLoginModal}
              className="px-5 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-purple-500/30 via-teal-400/30 to-amber-400/30 hover:from-purple-500/50 hover:to-amber-400/50 border border-white/20 shadow-lg backdrop-blur-md transition cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>ورود / ثبت‌نام</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-xs ${activeTab === tab.id ? 'bg-white/20 text-white font-bold' : 'text-slate-400'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
