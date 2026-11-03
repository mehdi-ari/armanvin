import React from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal } from 'lucide-react';
import { DeviceMode } from '../types';

interface DeviceSimulatorProps {
  device: DeviceMode;
  children: React.ReactNode;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ device, children }) => {
  if (device === 'desktop' || device === 'responsive') {
    return (
      <div className="w-full transition-all duration-300">
        {children}
      </div>
    );
  }

  if (device === 'tablet') {
    return (
      <div className="w-full flex justify-center py-6 px-2">
        <div className="w-full max-w-[820px] rounded-[36px] bg-[#050b0b] p-4 border-[8px] border-[#182a28] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Tablet Status Bar */}
          <div className="flex items-center justify-between px-6 py-2 text-[11px] text-neutral-400 border-b border-teal-950/40 mb-2">
            <span>۰۹:۴۱</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          <div data-scroll-container className="max-h-[800px] overflow-y-auto pr-1 scroll-smooth">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Mobile mode (390px iPhone-style frame on desktop, fluid on mobile)
  return (
    <div className="w-full flex justify-center py-2 sm:py-6 px-0 sm:px-2 overflow-x-hidden">
      <div className="w-full max-w-[410px] sm:rounded-[44px] bg-[#07030e] p-1.5 sm:p-3 border-0 sm:border-[8px] sm:border-[#1d102e] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden relative">
        {/* Notch / Dynamic Island (Only on desktop simulator) */}
        <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#0e0719] rounded-full z-20 items-center justify-center border border-white/5">
          <div className="w-2 h-2 rounded-full bg-black/60 mr-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-950" />
        </div>

        {/* Mobile Status Bar (Only on desktop simulator) */}
        <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-2 text-[11px] text-neutral-400 mb-1 z-10 relative">
          <span className="font-semibold text-white">۰۹:۴۱</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-neutral-300" />
            <Wifi className="w-3 h-3 text-neutral-300" />
            <Battery className="w-4 h-4 text-neutral-300" />
          </div>
        </div>

        {/* Scrollable Mobile Viewport */}
        <div data-scroll-container className="w-full max-h-[820px] overflow-y-auto overflow-x-hidden px-0 sm:px-1 scroll-smooth">
          {children}
        </div>

        {/* Bottom Home Indicator (Only on desktop simulator) */}
        <div className="hidden sm:block w-32 h-1 bg-white/20 rounded-full mx-auto my-2" />
      </div>
    </div>
  );
};
