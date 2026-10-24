import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Check,
  ShieldCheck,
  Compass,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ArmanveinLogo } from './ArmanveinLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccessLogin 
}) => {
  // Form states
  const [identifier, setIdentifier] = useState('09121234567');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Bespoke Login Authentication Loader State
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [authProgress, setAuthProgress] = useState(0);

  // Cloudflare Turnstile simulation
  const [turnstileVerified, setTurnstileVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTurnstileVerified(false);
      setIsAuthenticating(false);
      setAuthStep(0);
      setAuthProgress(0);
      const timer = setTimeout(() => {
        setTurnstileVerified(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Bespoke Login Loader Steps Progression
  const authStepsList = [
    { label: 'برقراری اتصال امن با پروتکل رمزنگاری آرمانوین...', icon: Lock },
    { label: 'اعتبارسنجی شناسه کاربری و تحلیل امضای دیجیتال...', icon: ShieldCheck },
    { label: 'همگام‌سازی چارت خودشناسی و پرونده مینی‌دوره‌ها...', icon: Compass },
    { label: 'تأیید نهایی امنیت و گشودن درگاه اختصاصی...', icon: Sparkles },
    { label: 'خوش آمدید! احراز هویت با موفقیت انجام شد ✨', icon: Check },
  ];

  const handleStartAuthFlow = () => {
    setIsAuthenticating(true);
    setAuthProgress(5);
    setAuthStep(0);

    const stepInterval = setInterval(() => {
      setAuthProgress((prev) => {
        if (prev >= 98) {
          clearInterval(stepInterval);
          return 100;
        }
        const next = prev + 3;
        if (next > 25 && next <= 50) setAuthStep(1);
        else if (next > 50 && next <= 75) setAuthStep(2);
        else if (next > 75 && next <= 95) setAuthStep(3);
        else if (next > 95) setAuthStep(4);
        return next;
      });
    }, 45);

    // Conclude after 1800ms
    setTimeout(() => {
      setAuthStep(4);
      setAuthProgress(100);
      setTimeout(() => {
        setIsAuthenticating(false);
        onSuccessLogin?.();
        onClose();
      }, 700);
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartAuthFlow();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in" 
      dir="rtl"
    >
      {/* Outer Modal Container matching Authentic Classic Style */}
      <div className="relative w-full max-w-md bg-[#071010] border border-emerald-950/90 rounded-3xl shadow-[0_0_60px_rgba(4,18,16,0.9)] overflow-hidden my-4 transition-all duration-300">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Bar with Close Button */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[11px] text-teal-300/80 font-medium">درگاه امن آرمانوین</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#091516] hover:bg-[#122829] text-slate-400 hover:text-white border border-emerald-950 transition cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* BESPOKE LOGIN LOADER VIEW (وقتی کاربر دکمه ورود را می‌زند)       */}
        {/* ============================================================== */}
        {isAuthenticating ? (
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-7 animate-fade-in relative z-10 select-none">
            
            {/* Sacred Geometry Lotus Celestial Rings Loader */}
            <div className="relative w-32 h-32 flex items-center justify-center my-2">
              
              {/* Outer Golden Dotted Orbit */}
              <div className="absolute inset-0 rounded-full border border-amber-400/30 border-dashed animate-[spin_12s_linear_infinite]" />

              {/* Glowing Emerald Arc Ring */}
              <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-teal-400 border-l-emerald-300 animate-[spin_2s_linear_infinite] shadow-[0_0_20px_rgba(20,184,166,0.5)]" />

              {/* Counter-Spinning Golden Ring */}
              <div className="absolute inset-3.5 rounded-full border-2 border-transparent border-b-amber-300 border-r-amber-500/80 animate-[spin_2.8s_linear_infinite_reverse]" />

              {/* Central Pulsing Sacred Core */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#0f2e2a] via-[#071917] to-[#040e0d] border border-amber-300/60 p-2 shadow-[0_0_25px_rgba(45,212,191,0.6)] flex items-center justify-center animate-pulse">
                <svg
                  viewBox="0 0 100 100"
                  className="w-10 h-10 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="44" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 3" />
                  <path d="M50 16 C38 34, 38 66, 50 84 C62 66, 62 34, 50 16 Z" fill="url(#loginGlowGrad)" stroke="#2DD4BF" strokeWidth="1.5" />
                  <path d="M16 50 C34 38, 66 38, 84 50 C66 62, 34 62, 16 50 Z" fill="url(#loginGlowGrad)" stroke="#2DD4BF" strokeWidth="1.5" fillOpacity="0.4" />
                  <circle cx="50" cy="50" r="4.5" fill="#FBBF24" />
                  <defs>
                    <radialGradient id="loginGlowGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0F766E" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Status Text & Progress */}
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span>احراز هویت و بررسی پرونده خودشناسی</span>
              </div>

              <p className="text-xs text-teal-200/90 font-light min-h-[20px] transition-all duration-300">
                {authStepsList[authStep]?.label}
              </p>

              {/* Progress Bar with Percentage */}
              <div className="w-full bg-[#061213] rounded-full h-2 p-0.5 border border-teal-500/30 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(45,212,191,0.8)]"
                  style={{ width: `${authProgress}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-slate-400 block pt-1">
                {authProgress}% تکمیل شده
              </span>
            </div>

          </div>
        ) : (
          /* ============================================================== */
          /* AUTHENTIC CLASSIC LOGIN CARD (دقیقاً تصویر ارسالی image_54820c81) */
          /* ============================================================== */
          <div className="p-6 sm:p-8 space-y-6 relative z-10 text-right animate-fade-in">
            
            {/* Header: Logo + Titles from image_54820c81.png */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <ArmanveinLogo size="md" />
              </div>

              <div className="space-y-1 pt-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
                  ورود به زیست‌بوم آرمانوین
                </h2>
                <p className="text-xs text-teal-300/80 font-light">
                  سه زاویهٔ شناخت — روانشناسی، مزاج‌شناسی و آسترولوژی
                </p>
              </div>
            </div>

            {/* Authentic Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              
              {/* Field 1: Email or Mobile */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  ایمیل یا شمارهٔ موبایل
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="09121234567 یا name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#091515] border border-emerald-950 focus:border-teal-400 text-xs sm:text-sm text-white placeholder-[#546b68] focus:outline-none transition"
                  dir="rtl"
                />
              </div>

              {/* Field 2: Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white">
                    رمز عبور
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{showPassword ? 'مخفی' : 'نمایش'}</span>
                  </button>
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#091515] border border-emerald-950 focus:border-teal-400 text-xs sm:text-sm text-white placeholder-[#546b68] focus:outline-none transition font-mono tracking-wider"
                  dir="ltr"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); handleStartAuthFlow(); }}
                  className="text-xs text-teal-400 hover:text-teal-300 font-medium transition cursor-pointer"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </a>
              </div>

              {/* Primary Teal Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border border-teal-400/30 transition shadow-[0_0_20px_rgba(15,118,110,0.3)] cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>ورود</span>
                <Sparkles className="w-4 h-4 text-teal-200" />
              </button>
            </form>

            {/* Separator / Alternative Actions */}
            <div className="space-y-4 pt-1">
              
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleStartAuthFlow}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>ورود با گوگل</span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center text-xs text-slate-300">
                <span>حساب کاربری ندارید؟ </span>
                <a 
                  href="#register" 
                  onClick={(e) => { e.preventDefault(); handleStartAuthFlow(); }}
                  className="text-teal-400 hover:text-teal-300 font-bold underline underline-offset-4"
                >
                  ثبت‌نام کنید
                </a>
              </div>

              {/* Cloudflare Turnstile Box */}
              <div className="p-2.5 rounded-xl bg-[#091515] border border-emerald-950/90 flex items-center justify-between text-xs text-slate-300 select-none">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                  <div className="flex flex-col text-right">
                    <span className="font-mono font-bold text-white text-[11px] leading-tight">CLOUDFLARE</span>
                    <span className="text-[9px] text-slate-500">حریم خصوصی · کمک</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-300">
                    {turnstileVerified ? 'تأیید شدید' : 'در حال تأیید...'}
                  </span>
                  {turnstileVerified ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-fade-in">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
                  )}
                </div>
              </div>

              <p className="text-center text-[10px] text-slate-500 font-light pt-0.5">
                بررسی خودکار برای جلوگیری از سوءاستفادهٔ ربات‌ها
              </p>

              {/* Dedicated Tester Button for Bespoke Login Loader */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleStartAuthFlow}
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>آزمایش لودر اختصاصی ورود</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
