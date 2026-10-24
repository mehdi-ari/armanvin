import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface NeonProgressBarProps {
  progress: number; // 0 to 100
  completedText?: string;
  totalText?: string;
  showLabels?: boolean;
  variant?: 'cyan' | 'emerald' | 'gold' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const NeonProgressBar: React.FC<NeonProgressBarProps> = ({
  progress,
  completedText,
  totalText,
  showLabels = true,
  variant = 'cyan',
  size = 'md',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  // Color theme definitions with deep neon glows
  const themes = {
    cyan: {
      gradient: 'from-teal-400 via-cyan-400 to-emerald-300',
      trackBg: 'bg-[#041315]',
      trackBorder: 'border-cyan-900/60',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.7),0_0_30px_rgba(6,182,212,0.4)]',
      headParticle: 'bg-white shadow-[0_0_10px_#22d3ee,0_0_16px_#fff]',
      textColor: 'text-cyan-300',
      badgeBg: 'bg-cyan-950/70 border-cyan-800/60',
    },
    emerald: {
      gradient: 'from-emerald-500 via-teal-400 to-green-300',
      trackBg: 'bg-[#031510]',
      trackBorder: 'border-emerald-900/60',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.7),0_0_30px_rgba(5,150,105,0.4)]',
      headParticle: 'bg-white shadow-[0_0_10px_#34d399,0_0_16px_#fff]',
      textColor: 'text-emerald-300',
      badgeBg: 'bg-emerald-950/70 border-emerald-800/60',
    },
    gold: {
      gradient: 'from-amber-500 via-yellow-400 to-amber-200',
      trackBg: 'bg-[#161104]',
      trackBorder: 'border-amber-900/60',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.7),0_0_30px_rgba(217,119,6,0.4)]',
      headParticle: 'bg-white shadow-[0_0_10px_#fde047,0_0_16px_#fff]',
      textColor: 'text-amber-300',
      badgeBg: 'bg-amber-950/70 border-amber-800/60',
    },
    purple: {
      gradient: 'from-purple-500 via-indigo-400 to-pink-300',
      trackBg: 'bg-[#11081f]',
      trackBorder: 'border-purple-900/60',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.7),0_0_30px_rgba(147,51,234,0.4)]',
      headParticle: 'bg-white shadow-[0_0_10px_#c084fc,0_0_16px_#fff]',
      textColor: 'text-purple-300',
      badgeBg: 'bg-purple-950/70 border-purple-800/60',
    },
  };

  const currentTheme = themes[variant];

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full select-none ${className}`} dir="rtl">
      
      {/* Optional Top Labels */}
      {showLabels && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.textColor} bg-current animate-pulse`} />
            <span className="text-slate-300 text-[11px] font-medium">
              {completedText || 'پیشرفت یادگیری:'}
            </span>
            <span className={`font-mono font-bold text-xs ${currentTheme.textColor}`}>
              {clamped}%
            </span>
          </div>

          {totalText && (
            <span className="text-[11px] text-slate-400 font-mono">
              {totalText}
            </span>
          )}
        </div>
      )}

      {/* Neon Progress Bar Track */}
      <div className={`w-full ${currentTheme.trackBg} rounded-full ${heights[size]} p-0.5 border ${currentTheme.trackBorder} relative overflow-hidden shadow-inner`}>
        {/* Animated Neon Fill */}
        <div
          className={`h-full rounded-full bg-gradient-to-r ${currentTheme.gradient} transition-all duration-700 ease-out relative ${currentTheme.glow}`}
          style={{ width: `${clamped}%` }}
        >
          {/* Pulsing Neon Head Particle */}
          {clamped > 2 && (
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${currentTheme.headParticle} animate-pulse`}
            />
          )}

          {/* Micro shimmer sweep across the progress bar */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer opacity-40" />
        </div>
      </div>

    </div>
  );
};
