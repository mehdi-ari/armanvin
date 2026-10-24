import React, { useState } from 'react';
import { HeaderNav, ArmanveinNavTab } from './components/common/HeaderNav';
import { Footer } from './components/common/Footer';
import { ArmanveinBespokeLoader } from './components/common/ArmanveinBespokeLoader';
import { AuthModal } from './components/common/AuthModal';
import { DeviceSimulator } from './components/DeviceSimulator';
import { UserAccountDashboard } from './components/account/UserAccountDashboard';
import { DeviceMode } from './types';
import { Sparkles, Layers, Compass, Palette, User, ArrowLeft } from 'lucide-react';

export default function App() {
  // Device viewport preview mode: desktop | tablet | mobile
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  // Key to allow replaying the bespoke Armanvein lotus loader
  const [loaderKey, setLoaderKey] = useState<number>(1);

  // Active navigation tab — default to 'account' as requested by the user
  const [activeTab, setActiveTab] = useState<ArmanveinNavTab>('account');

  // User auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('مهدی عاری');

  // Auth / Login Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: ArmanveinNavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('account');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030708] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200 flex flex-col justify-between" dir="rtl">
      
      {/* Bespoke Armanvein Sacred Lotus Loader */}
      <ArmanveinBespokeLoader
        key={loaderKey}
        minDurationMs={800}
      />

      {/* Authentic Armanvein Header */}
      <HeaderNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        deviceMode={deviceMode}
        onDeviceChange={(mode) => setDeviceMode(mode)}
        onReplayLoader={() => setLoaderKey((prev) => prev + 1)}
        onOpenLoginModal={() => setIsAuthModalOpen(true)}
        style="style1-authentic"
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Content inside Device Simulator Viewport */}
      <main className="w-full flex-1">
        <DeviceSimulator device={deviceMode}>
          {activeTab === 'account' ? (
            <UserAccountDashboard
              onLogout={handleLogout}
              onNavigateToCourse={() => {
                // Course navigation handler
              }}
            />
          ) : (
            <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-4" dir="rtl">
              <div className="max-w-xl w-full mx-auto text-center space-y-6 p-8 rounded-3xl bg-[#071312] border border-[#142824] shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#091F1C] border border-[#1E433C] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(67,198,172,0.2)]">
                  <User className="w-8 h-8 text-[#43C6AC]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white font-serif">
                    صفحه حساب کاربری مهدی عاری
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8BA19B] leading-relaxed">
                    طرح اصلی حساب کاربری با منوی اختصاصی، مأموریت‌ها، اطلاعات چارت و پنل پرونده شخصی طراحی شده است.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('account')}
                  className="px-5 py-2.5 rounded-xl bg-[#097565] hover:bg-[#0c8a77] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <span>ورود به داشبورد حساب کاربری</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </DeviceSimulator>
      </main>

      {/* Authentic Armanvein Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenContactModal={() => setIsAuthModalOpen(true)}
        style="style1-authentic"
      />

      {/* Authentic Armanvein Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={handleLoginSuccess}
      />
    </div>
  );
}
