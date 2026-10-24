import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Headphones
} from 'lucide-react';
import { MiniCourse, Lesson } from '../../data/miniCoursesData';

interface AudioPlayerStudioProps {
  course: MiniCourse;
  activeLesson: Lesson;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  totalDurationSeconds: number;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSkipBackward: () => void;
  handleSkipForward: () => void;
  formatTime: (secs: number) => string;
  playbackSpeed: number;
  cycleSpeed: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export const AudioPlayerStudio: React.FC<AudioPlayerStudioProps> = ({
  course,
  activeLesson,
  isPlaying,
  togglePlay,
  currentTime,
  totalDurationSeconds,
  handleSeek,
  handleSkipBackward,
  handleSkipForward,
  formatTime,
  playbackSpeed,
  cycleSpeed,
  isMuted,
  toggleMute,
}) => {
  return (
    <div className="space-y-4" dir="rtl">
      {/* ========================================================================= */}
      {/* AUTHENTIC CLASSIC AUDIO PLAYER (منطبق بر دقیق عکس ارسالی image_7e4528b2.png) */}
      {/* ========================================================================= */}
      <div className="bg-[#0b101c] border border-slate-800/90 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-44 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
        
        {/* Top Header matching image_7e4528b2.png */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 relative z-10">
          <div className="text-right space-y-0.5">
            <span className="text-xs text-amber-400 font-medium block">
              در حال پخش رایگان
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-white font-serif tracking-tight">
              {activeLesson.title}
            </h2>
          </div>

          {/* Left badge "جلسه اول" */}
          <div className="px-4 py-2 rounded-2xl bg-[#11192e] border border-slate-700/80 text-xs font-bold text-slate-300 shadow-inner flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeLesson.sessionNumberStr}</span>
          </div>
        </div>

        {/* Centered Waveform Graphic matching image_7e4528b2.png */}
        <div className="flex items-center justify-center gap-1.5 h-14 py-2 relative z-10">
          {[25, 45, 60, 35, 75, 45, 30, 65, 80, 55, 40, 70, 30, 60, 50, 70, 75, 35, 55, 45, 70, 80, 50, 35, 65, 40, 60, 70, 50, 30, 55, 65].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-slate-700/50'
              }`}
              style={{
                height: isPlaying 
                  ? `${Math.max(20, (h * ((i % 4) + 1) * 0.35) % 100)}%` 
                  : `${h * 0.35}%`,
              }}
            />
          ))}
        </div>

        {/* Scrubber Bar matching image_7e4528b2.png with Yellow Knob */}
        <div className="space-y-1.5 relative z-10">
          <input
            type="range"
            min={0}
            max={totalDurationSeconds}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 transition"
          />
          <div className="flex items-center justify-between text-xs font-mono text-slate-400" dir="ltr">
            <span>{activeLesson.duration}</span>
            <span className="text-amber-300 font-bold">{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Controls Row matching image_7e4528b2.png: 1x, ↺, Large Yellow Play, ↻, 🔊 */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 relative z-10">
          
          {/* 1x Speed */}
          <button
            onClick={cycleSpeed}
            className="w-10 h-10 rounded-full bg-[#131b2e] hover:bg-[#1a253e] text-amber-300 border border-slate-800 font-mono text-xs font-bold flex items-center justify-center cursor-pointer transition active:scale-95 shadow-sm"
            title="سرعت پخش"
          >
            {playbackSpeed}x
          </button>

          {/* Skip Backward 10s */}
          <button
            onClick={handleSkipBackward}
            className="w-11 h-11 rounded-full bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center cursor-pointer transition active:scale-95 shadow-sm"
            title="۱۰ ثانیه به عقب"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Primary Big Glowing Yellow Play Button matching image_7e4528b2.png */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title={isPlaying ? 'توقف' : 'پخش'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 mr-1" />
            )}
          </button>

          {/* Skip Forward 10s */}
          <button
            onClick={handleSkipForward}
            className="w-11 h-11 rounded-full bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center cursor-pointer transition active:scale-95 shadow-sm"
            title="۱۰ ثانیه به جلو"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Volume / Mute Button */}
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center cursor-pointer transition active:scale-95 shadow-sm"
            title={isMuted ? 'وصل صدا' : 'بی‌صدا'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </div>
  );
};
