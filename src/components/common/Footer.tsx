import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Headphones, 
  ShieldCheck, 
  Star, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  X,
  Sparkles,
  Terminal,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { ArmanveinLogo } from './ArmanveinLogo';
import { ArmanveinNavTab } from './HeaderNav';
import { HeaderFooterStyle } from '../../types';

interface FooterProps {
  onSelectTab?: (tab: ArmanveinNavTab) => void;
  onOpenContactModal?: () => void;
  style?: HeaderFooterStyle;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectTab, 
  onOpenContactModal, 
  style = 'style1-authentic' 
}) => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [isEnamadModalOpen, setIsEnamadModalOpen] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportMessage('');
      setIsSupportModalOpen(false);
    }, 1500);
  };

  // Reusable Social Links
  const renderSocials = (badgeClass: string) => (
    <div className="flex items-center gap-2 pt-1 flex-wrap">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={badgeClass} title="اینستاگرام">
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className={badgeClass} title="واتساپ">
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      </a>
      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className={badgeClass} title="تلگرام">
        <Send className="w-3.5 h-3.5" />
      </a>
      <div onClick={() => setIsSupportModalOpen(true)} className={`${badgeClass} text-[10px] font-bold cursor-pointer`} title="پیام‌رسان بله">
        بله
      </div>
      <div onClick={() => setIsSupportModalOpen(true)} className={`${badgeClass} text-[10px] font-bold cursor-pointer`} title="پیام‌رسان ایتا">
        ایتا
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. AUTHENTIC STYLE (منطبق بر تصویر image_3d70aa99.png)                     */}
      {/* ========================================================================= */}
      {style === 'style1-authentic' && (
        <footer className="w-full bg-[#020506] text-slate-300 border-t border-emerald-950/70 pt-14 pb-8 relative" dir="rtl">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
              
              {/* Right: Logo & Intro */}
              <div className="lg:col-span-4 space-y-4 text-right">
                <ArmanveinLogo size="lg" />
                <p className="text-xs sm:text-[13px] text-slate-400 font-light leading-relaxed max-w-sm pt-1">
                  سه زاویهٔ شناخت — روانشناسی، مزاج‌شناسی و آسترولوژی — کنار هم، در پروندهٔ شخصی شما.
                </p>
                <div className="pt-2 text-[11px] text-emerald-400/80 font-mono">
                  پلتفرم یکپارچه خودشناسی علمی و شهودی
                </div>
              </div>

              {/* Col 1 */}
              <div className="lg:col-span-2 space-y-3.5 text-right">
                <h3 className="text-sm font-bold text-teal-400">خدمات و آزمون‌ها</h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                  <li><button onClick={() => onSelectTab?.('package')} className="hover:text-teal-300 cursor-pointer">پکیج خودشناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('armahush')} className="hover:text-teal-300 cursor-pointer">آرماهوش</button></li>
                  <li><button onClick={() => onSelectTab?.('astrology')} className="hover:text-teal-300 cursor-pointer">آسترولوژی</button></li>
                  <li><button onClick={() => onSelectTab?.('temperament')} className="hover:text-teal-300 cursor-pointer">مزاج‌شناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('psychology')} className="hover:text-teal-300 cursor-pointer">روانشناسی</button></li>
                </ul>
              </div>

              {/* Col 2 */}
              <div className="lg:col-span-2 space-y-3.5 text-right">
                <h3 className="text-sm font-bold text-teal-400">آموزش و راهنما</h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                  <li><button onClick={() => onSelectTab?.('minicourses')} className="hover:text-teal-300 cursor-pointer text-emerald-300 font-medium">مینی دوره‌ها</button></li>
                  <li><button onClick={() => onSelectTab?.('guide')} className="hover:text-teal-300 cursor-pointer">راهنمای آرمانوین</button></li>
                  <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-teal-300 cursor-pointer">سؤالات متداول</button></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="lg:col-span-2 space-y-3.5 text-right">
                <h3 className="text-sm font-bold text-teal-400">پشتیبانی و قوانین</h3>
                <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                  <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-teal-300 cursor-pointer">تماس با ما</button></li>
                  <li><a href="#rules" className="hover:text-teal-300">قوانین و شرایط</a></li>
                  <li><a href="#privacy" className="hover:text-teal-300">حریم خصوصی</a></li>
                  <li><a href="#refund" className="hover:text-teal-300">بازگشت وجه</a></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="lg:col-span-2 space-y-3.5 text-right">
                <div className="border-r-2 border-teal-400 pr-2.5">
                  <h3 className="text-sm font-bold text-teal-400">راه‌های ارتباطی آرمانوین</h3>
                </div>
                <div className="space-y-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 text-[11px] block">شماره تماس</span>
                    <a href="tel:02191697283" className="font-mono text-emerald-300 hover:text-white font-bold flex items-center gap-1 text-xs" dir="ltr">
                      <Phone className="w-3 h-3 text-teal-400" />
                      <span>02191697283</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">ایمیل</span>
                    <a href="mailto:armanovein@gmail.com" className="font-mono text-slate-300 hover:text-teal-300 text-[11px]" dir="ltr">
                      armanovein@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block mb-1">شبکه‌های اجتماعی آرمانوین</span>
                    {renderSocials('w-8 h-8 rounded-lg bg-[#071314] hover:bg-[#0f2a2c] border border-emerald-950 hover:border-emerald-500/60 flex items-center justify-center text-slate-300 hover:text-emerald-300 transition shadow-sm')}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Enamad & Copyright */}
            <div className="pt-8 border-t border-emerald-950/70 flex flex-col items-center justify-center space-y-4">
              <div onClick={() => setIsEnamadModalOpen(true)} className="bg-white rounded-2xl p-4 sm:px-6 sm:py-3.5 border-2 border-emerald-500/80 shadow-[0_4px_25px_rgba(16,185,129,0.2)] text-center cursor-pointer hover:scale-105 transition">
                <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs sm:text-[13px] mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>نماد اعتماد الکترونیکی معتبر</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <span>آرمانوین — یک ستاره</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400 font-serif">© ۱۴۰۵ آرمانوین</p>
                <p className="text-[10px] text-slate-600 font-light mt-0.5">کلیه حقوق مادی و معنوی متعلق به آرمانوین است.</p>
              </div>
            </div>

          </div>

          {/* Floating Support Button in Bottom-Left */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.6)] hover:scale-110 transition cursor-pointer"
              title="پشتیبانی آنلاین آرمانوین"
            >
              <Headphones className="w-6 h-6 text-slate-950" />
            </button>
          </div>
        </footer>
      )}

      {/* ========================================================================= */}
      {/* 2. COSMIC AURIC GOLD FOOTER                                               */}
      {/* ========================================================================= */}
      {style === 'style2-cosmic-gold' && (
        <footer className="w-full bg-[#050711] text-slate-300 border-t border-amber-500/30 pt-16 pb-10 relative overflow-hidden" dir="rtl">
          <div className="max-w-[1400px] mx-auto px-6 space-y-12 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-xl font-bold text-white font-serif tracking-tight">آرمانوین طلایی</span>
                </div>
                <p className="text-xs sm:text-[13px] text-amber-200/80 leading-relaxed max-w-sm">
                  مسیر اتصال آگاهی با کالبد، روان و چرخه کیهان — نقشه جامع تعالی شما.
                </p>
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 inline-block text-xs text-amber-300 font-mono">
                  HOTLINE: ۰۲۱۹۱۶۹۷۲۸۳ ✦ ۲۴/۷
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <span>✦ خدمات تخصصی</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light">
                  <li><button onClick={() => onSelectTab?.('package')} className="hover:text-amber-300">پکیج خودشناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('armahush')} className="hover:text-amber-300">آرماهوش طلایی</button></li>
                  <li><button onClick={() => onSelectTab?.('astrology')} className="hover:text-amber-300">آسترولوژی زایشی</button></li>
                  <li><button onClick={() => onSelectTab?.('temperament')} className="hover:text-amber-300">مزاج‌شناسی جامع</button></li>
                </ul>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <span>✦ آکادمی و دانش</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light">
                  <li><button onClick={() => onSelectTab?.('minicourses')} className="hover:text-amber-300 text-amber-200 font-semibold">مینی‌دوره‌های صوتی</button></li>
                  <li><button onClick={() => onSelectTab?.('guide')} className="hover:text-amber-300">کتابچه راهنما</button></li>
                  <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-amber-300">پاسخ به ابهامات</button></li>
                </ul>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-sm font-bold text-amber-300">پیوند با کانون آرمانوین</h4>
                <div className="p-4 rounded-2xl bg-[#090d1e] border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">ایمیل دبیرخانه:</span>
                    <span className="text-amber-300 font-mono">armanovein@gmail.com</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1.5">کانال‌های ارتباطی رسمی:</span>
                    {renderSocials('w-8 h-8 rounded-full bg-[#121933] hover:bg-amber-400 hover:text-slate-950 border border-amber-500/40 text-amber-300 flex items-center justify-center transition shadow-sm')}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div onClick={() => setIsEnamadModalOpen(true)} className="flex items-center gap-2 p-2 px-4 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-300 cursor-pointer hover:bg-amber-400/20 transition">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>نماد رسمی اعتماد الکترونیک · نشان ستاره زرین</span>
              </div>
              <p className="font-serif">© ۱۴۰۵ زیست‌بوم آرمانوین · تمام حقوق محفوظ است</p>
            </div>

          </div>

          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-110 transition cursor-pointer"
            >
              <Headphones className="w-6 h-6" />
            </button>
          </div>
        </footer>
      )}

      {/* ========================================================================= */}
      {/* 3. CYBERNETIC HIGH-TECH FOOTER                                            */}
      {/* ========================================================================= */}
      {style === 'style3-cyber-studio' && (
        <footer className="w-full bg-[#020608] text-slate-300 border-t border-cyan-500/30 font-mono text-xs pt-14 pb-8" dir="rtl">
          <div className="max-w-[1400px] mx-auto px-6 space-y-10">
            
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pb-8 border-b border-cyan-900/40">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>ARMANVEIN_MAINFRAME // V2.5</span>
                </div>
                <p className="text-slate-400 font-sans text-xs max-w-md">
                  سه زاویهٔ شناخت: روانشناسی، مزاج‌شناسی و آسترولوژی در قالب پایگاه دانش سایبری.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-[#06181f] p-3 rounded-xl border border-cyan-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-200">VOICE_CHANNEL: 02191697283</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-sans">
              <div className="space-y-2">
                <span className="text-cyan-400 font-mono block text-xs">// 01_SERVICES</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><button onClick={() => onSelectTab?.('package')} className="hover:text-cyan-300">پکیج خودشناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('armahush')} className="hover:text-cyan-300">موتور هوش مصنوعی</button></li>
                  <li><button onClick={() => onSelectTab?.('astrology')} className="hover:text-cyan-300">ماتریس چارت تولد</button></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-cyan-400 font-mono block text-xs">// 02_COURSES</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><button onClick={() => onSelectTab?.('minicourses')} className="hover:text-cyan-300 text-cyan-300 font-bold">مینی‌دوره‌ها (صوتی)</button></li>
                  <li><button onClick={() => onSelectTab?.('guide')} className="hover:text-cyan-300">راهنمای سیستم</button></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-cyan-400 font-mono block text-xs">// 03_SECURITY</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="#rules" className="hover:text-cyan-300">پروتکل‌های محرمانگی</a></li>
                  <li><a href="#privacy" className="hover:text-cyan-300">رمزنگاری پرونده فردی</a></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-cyan-400 font-mono block text-xs">// 04_NETWORKS</span>
                {renderSocials('w-8 h-8 rounded-md bg-[#051c22] hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/50 text-cyan-300 flex items-center justify-center transition')}
              </div>
            </div>

            <div className="pt-6 border-t border-cyan-950 flex items-center justify-between font-mono text-[11px] text-slate-500">
              <div onClick={() => setIsEnamadModalOpen(true)} className="hover:text-cyan-400 cursor-pointer">
                [ TRUST_SEAL: CERTIFIED_1_STAR ]
              </div>
              <div>© 1405 ARMANVEIN CORE. ALL RIGHTS RESERVED.</div>
            </div>

          </div>

          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-13 h-13 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.8)] transition cursor-pointer font-bold"
            >
              <Headphones className="w-5 h-5" />
            </button>
          </div>
        </footer>
      )}

      {/* ========================================================================= */}
      {/* 4. AVANT-GARDE LUXURY EDITORIAL FOOTER                                    */}
      {/* ========================================================================= */}
      {style === 'style4-luxury-editorial' && (
        <footer className="w-full bg-[#08090d] text-slate-300 border-t border-slate-800 pt-16 pb-12" dir="rtl">
          <div className="max-w-[1400px] mx-auto px-8 space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-800">
              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-white font-serif">آرمـانـویـن</h3>
                <p className="text-xs text-slate-400 font-light max-w-md">
                  سه زاویهٔ شناخت — روانشناسی، مزاج‌شناسی و آسترولوژی — کنار هم، در پروندهٔ شخصی شما.
                </p>
              </div>

              <div className="text-left font-serif text-sm text-slate-300">
                تماس و پذیرش: <a href="tel:02191697283" className="text-white hover:underline">021-91697283</a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light">
              <div className="space-y-3">
                <span className="font-bold text-white tracking-wider block">بخش‌های تحلیلی</span>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => onSelectTab?.('package')} className="hover:text-white">پکیج خودشناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('armahush')} className="hover:text-white">آرماهوش</button></li>
                  <li><button onClick={() => onSelectTab?.('astrology')} className="hover:text-white">آسترولوژی</button></li>
                  <li><button onClick={() => onSelectTab?.('temperament')} className="hover:text-white">مزاج‌شناسی</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-white tracking-wider block">دوره‌ها و متون</span>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => onSelectTab?.('minicourses')} className="hover:text-white text-white font-medium">مینی‌دوره‌های صوتی</button></li>
                  <li><button onClick={() => onSelectTab?.('guide')} className="hover:text-white">راهنمای پلتفرم</button></li>
                  <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white">پرسش‌های متداول</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-white tracking-wider block">قوانین و پشتیبانی</span>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white">ارتباط با ما</button></li>
                  <li><a href="#rules" className="hover:text-white">ضوابط استفاده</a></li>
                  <li><a href="#privacy" className="hover:text-white">حریم خصوصی</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-white tracking-wider block">فضای مجازی</span>
                {renderSocials('w-8 h-8 rounded-full bg-slate-900 hover:bg-white hover:text-black border border-slate-700 text-slate-300 flex items-center justify-center transition')}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
              <div onClick={() => setIsEnamadModalOpen(true)} className="hover:text-white cursor-pointer">
                نماد اعتماد الکترونیک معتبر وزارت صنعت و معدن
              </div>
              <div>© ۱۴۰۵ کلیه حقوق برای آرمانوین محفوظ است.</div>
            </div>

          </div>

          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer"
            >
              <Headphones className="w-5 h-5" />
            </button>
          </div>
        </footer>
      )}

      {/* ========================================================================= */}
      {/* 5. FROSTED PRISM CRYSTAL FOOTER                                           */}
      {/* ========================================================================= */}
      {style === 'style5-frosted-crystal' && (
        <footer className="w-full py-10 px-4 sm:px-6 relative" dir="rtl">
          <div className="max-w-[1400px] mx-auto bg-[#0b101c]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <ArmanveinLogo size="md" />
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  سه زاویهٔ شناخت — روانشناسی، مزاج‌شناسی و آسترولوژی در بستری یکپارچه.
                </p>
                <div className="text-[11px] text-purple-300">توسعه یافته بر پایهٔ هوش و شهود</div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>دسترسی‌های اصلی</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light">
                  <li><button onClick={() => onSelectTab?.('minicourses')} className="hover:text-purple-300 text-teal-300 font-medium">مینی دوره‌ها</button></li>
                  <li><button onClick={() => onSelectTab?.('package')} className="hover:text-purple-300">پکیج خودشناسی</button></li>
                  <li><button onClick={() => onSelectTab?.('armahush')} className="hover:text-purple-300">آرماهوش</button></li>
                  <li><button onClick={() => onSelectTab?.('guide')} className="hover:text-purple-300">راهنما</button></li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>راه‌های ارتباط مستقیم</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div>تلفن: <a href="tel:02191697283" className="font-mono text-white hover:text-teal-300">02191697283</a></div>
                  <div>ایمیل: <a href="mailto:armanovein@gmail.com" className="font-mono text-slate-400 hover:text-white">armanovein@gmail.com</a></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">شبکه‌ها و نمادها</h4>
                  {renderSocials('w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition shadow-sm')}
                </div>

                <div onClick={() => setIsEnamadModalOpen(true)} className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center cursor-pointer hover:bg-white/20 transition text-[11px] text-white">
                  نماد اعتماد الکترونیک یک‌ستاره ✦
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-white/10 text-center text-xs text-slate-400">
              © ۱۴۰۵ زیست‌بوم جامع آرمانوین · تمامی حقوق محفوظ است.
            </div>

          </div>

          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 via-teal-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(45,212,191,0.5)] hover:scale-110 transition cursor-pointer"
            >
              <Headphones className="w-6 h-6" />
            </button>
          </div>
        </footer>
      )}

      {/* SHARED SUPPORT & ENAMAD MODALS */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="relative w-full max-w-lg bg-[#071315] border border-teal-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(20,184,166,0.25)]">
            <button onClick={() => setIsSupportModalOpen(false)} className="absolute left-4 top-4 p-2 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-bold text-white">پشتیبانی و ارتباط با آرمانوین</h3>
                <p className="text-xs text-slate-400">پاسخگویی سریع کارشناسان آرمانوین</p>
              </div>
            </div>

            {supportSent ? (
              <div className="p-6 rounded-2xl bg-teal-950/40 border border-teal-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">پیام شما با موفقیت ثبت شد</h4>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4 text-right">
                <div className="p-3.5 rounded-2xl bg-[#0b1c1e] border border-emerald-950/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">تماس مستقیم با واحد پذیرش:</span>
                  <a href="tel:02191697283" className="font-mono font-bold text-teal-300 hover:text-white" dir="ltr">02191697283</a>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">پیام یا سؤال شما</label>
                  <textarea
                    rows={4}
                    required
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="پرسش خود را درباره دوره‌ها، پکیج یا نحوه ثبت‌نام بنویسید..."
                    className="w-full p-3.5 rounded-2xl bg-[#0b1c1e] border border-teal-900/60 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                <button type="submit" className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition cursor-pointer flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>ارسال پیام به پشتیبانی</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {isEnamadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <div className="relative w-full max-w-md bg-[#071315] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4">
            <button onClick={() => setIsEnamadModalOpen(false)} className="absolute left-4 top-4 p-2 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">نماد اعتماد الکترونیکی آرمانوین</h3>
            <p className="text-xs text-slate-300 font-light">پلتفرم آرمانوین دارای مجوز رسمی و نماد اعتماد الکترونیکی از مرکز توسعه تجارت الکترونیکی است.</p>
            <div className="p-3.5 rounded-2xl bg-[#0b1c1e] border border-emerald-900/60 text-xs text-slate-400 font-mono space-y-1">
              <div>کد رهگیری: ARMAN-1405-97283</div>
              <div className="text-emerald-400">وضعیت: معتبر و فعال (یک ستاره)</div>
            </div>
            <button onClick={() => setIsEnamadModalOpen(false)} className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500">
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
