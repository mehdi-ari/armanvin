import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Lock, 
  Headphones, 
  Check, 
  Save, 
  Clock, 
  BookOpen, 
  Edit3,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { MiniCourse, Lesson } from '../../data/miniCoursesData';
import { NeonProgressBar } from '../common/NeonProgressBar';
import { AudioPlayerStudio } from './AudioPlayerStudio';

export type DetailViewMode = 'player-studio' | 'reader-focus';

interface MiniCourseDetailViewProps {
  course: MiniCourse;
  onBackToCatalog: () => void;
  onOpenLoginModal: () => void;
}

export const MiniCourseDetailView: React.FC<MiniCourseDetailViewProps> = ({
  course,
  onBackToCatalog,
  onOpenLoginModal,
}) => {
  const [detailMode, setDetailMode] = useState<DetailViewMode>('player-studio');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(course.lessons[0].currentTimeSeconds || 108); // 1:48 default
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'keypoints' | 'notes'>('transcript');

  // User notes state with localStorage persistence
  const [noteText, setNoteText] = useState<string>(() => {
    return localStorage.getItem(`armanvin_note_${course.id}`) || '';
  });
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  // Audio Context Ref for real synthetic ambient playback
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeLesson = course.lessons[0];
  const totalDurationSeconds = activeLesson.durationSeconds || 525; // 8:45

  // Playback timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, totalDurationSeconds]);

  // Audio tone generator
  const startAudioSynth = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(216, audioContextRef.current.currentTime);
      gain.gain.setValueAtTime(isMuted ? 0 : 0.04, audioContextRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      // AudioContext fallback
    }
  };

  const stopAudioSynth = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    } catch {
      // Ignore
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudioSynth();
      setIsPlaying(false);
    } else {
      startAudioSynth();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleSkipBackward = () => {
    setCurrentTime((prev) => Math.max(0, prev - 10));
  };

  const handleSkipForward = () => {
    setCurrentTime((prev) => Math.min(totalDurationSeconds, prev + 10));
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const toggleMute = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const nextMuted = !isMuted;
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : 0.04, audioContextRef.current.currentTime);
      setIsMuted(nextMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const sStr = s < 10 ? `0${s}` : s.toString();
    return `${m}:${sStr}`;
  };

  const handleSaveNote = () => {
    localStorage.setItem(`armanvin_note_${course.id}`, noteText);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] bg-[#07090e] text-slate-100 py-6 sm:py-10" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

        {/* ============================================================== */}
        {/* TOP BAR: Navigation & Switcher                                 */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            <span>بازگشت به فهرست مینی‌دوره‌ها</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0d121c] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setDetailMode('player-studio')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                detailMode === 'player-studio' ? 'bg-[#1b253b] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              استودیوی صوتی و جلسات
            </button>
            <button
              onClick={() => setDetailMode('reader-focus')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                detailMode === 'reader-focus' ? 'bg-[#1b253b] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              حالت مطالعه متنی و یادداشت
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COURSE HERO INTRO CARD WITH NEON PROGRESS BAR (image_890ae8db) */}
        {/* ============================================================== */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden shadow-2xl">
          
          {/* Top Celestial Emblem */}
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* 4 Authentic Metric Boxes from image_890ae8db.png */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto pt-2">
            {/* Box 1: Sessions */}
            <div className="p-3 rounded-2xl bg-[#0f1626] border border-slate-800/90 text-center space-y-0.5">
              <span className="text-base sm:text-lg font-black text-white font-mono block">
                {course.sessionCount}
              </span>
              <span className="text-[11px] text-slate-400 font-light block">جلسه</span>
            </div>

            {/* Box 2: Duration */}
            <div className="p-3 rounded-2xl bg-[#0f1626] border border-slate-800/90 text-center space-y-0.5">
              <span className="text-base sm:text-lg font-black text-white font-mono block">
                {course.totalDuration}
              </span>
              <span className="text-[11px] text-slate-400 font-light block">مدت</span>
            </div>

            {/* Box 3: Level */}
            <div className="p-3 rounded-2xl bg-[#0f1626] border border-slate-800/90 text-center space-y-0.5">
              <span className="text-xs sm:text-sm font-bold text-teal-300 block pt-0.5">
                {course.level}
              </span>
              <span className="text-[11px] text-slate-400 font-light block">سطح</span>
            </div>

            {/* Box 4: Progress */}
            <div className="p-3 rounded-2xl bg-[#0f1626] border border-slate-800/90 text-center space-y-0.5">
              <span className="text-base sm:text-lg font-black text-amber-300 font-mono block">
                {course.progressPercent}%
              </span>
              <span className="text-[11px] text-slate-400 font-light block">پیشرفت</span>
            </div>
          </div>

          {/* Neon Progress Bar underneath 4 boxes */}
          <div className="max-w-xl mx-auto pt-2">
            <NeonProgressBar
              progress={course.progressPercent}
              completedText="مسیر یادگیری تو"
              totalText={`${course.completedSessions} از ${course.sessionCount} جلسه تکمیل شده`}
              variant={
                course.category === 'astrology' ? 'gold' :
                course.category === 'temperament' ? 'emerald' :
                course.category === 'psychology' ? 'purple' : 'cyan'
              }
              size="md"
            />
          </div>

        </div>

        {/* ============================================================== */}
        {/* CONTINUE LEARNING BANNER CARD from image_890ae8db.png          */}
        {/* ============================================================== */}
        <div 
          onClick={togglePlay}
          className="bg-gradient-to-r from-[#0d1627] via-[#091120] to-[#0d1627] border border-indigo-900/50 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition shadow-lg group"
        >
          <div className="flex items-center gap-3.5">
            {/* Golden Round Play Button matching image_890ae8db.png */}
            <div className="w-11 h-11 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-transform group-hover:scale-105 shrink-0">
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 mr-0.5" />}
            </div>

            <div className="text-right">
              <span className="text-[11px] text-indigo-300 font-medium block">
                ادامۀ یادگیری
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                {activeLesson.sessionNumberStr}: {activeLesson.title}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                از {formatTime(currentTime)} / کل: {activeLesson.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-amber-300 transition-colors">
            <span className="hidden sm:inline">پخش مستقیم</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:translate-x-[-3px]" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* MASTER AUDIO PLAYER STUDIO (5 DISTINCT DESIGN MODELS)          */}
        {/* ============================================================== */}
        <AudioPlayerStudio
          course={course}
          activeLesson={activeLesson}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          currentTime={currentTime}
          totalDurationSeconds={totalDurationSeconds}
          handleSeek={handleSeek}
          handleSkipBackward={handleSkipBackward}
          handleSkipForward={handleSkipForward}
          formatTime={formatTime}
          playbackSpeed={playbackSpeed}
          cycleSpeed={cycleSpeed}
          isMuted={isMuted}
          toggleMute={toggleMute}
        />

        {/* ============================================================== */}
        {/* TABS: TRANSCRIPT / KEY POINTS / PERSONAL NOTEBOOK              */}
        {/* ============================================================== */}
        <div className="bg-[#0b0f1a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-1 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'transcript' ? 'bg-[#182136] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              متن کامل و سناریوی آموزشی
            </button>
            <button
              onClick={() => setActiveTab('keypoints')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'keypoints' ? 'bg-[#182136] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              نکات کلیدی جلسه
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'notes' ? 'bg-[#182136] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              دفترچه یادداشت من
            </button>
          </div>

          {/* Transcript Content */}
          {activeTab === 'transcript' && (
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line space-y-4 animate-fade-in">
              {activeLesson.transcript}
            </div>
          )}

          {/* Keypoints */}
          {activeTab === 'keypoints' && (
            <div className="space-y-3 animate-fade-in">
              {activeLesson.keyPoints.map((point, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#0e1424] border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Notes with LocalStorage */}
          {activeTab === 'notes' && (
            <div className="space-y-3 animate-fade-in">
              <textarea
                rows={5}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="برداشت‌ها، بینش‌ها و پاسخ تمرین‌های این جلسه را اینجا یادداشت کنید..."
                className="w-full p-4 rounded-2xl bg-[#0e1424] border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-light">
                  {isNoteSaved ? '✓ یادداشت در حافظه محلی ذخیره شد' : 'یادداشت‌های شما کاملاً خصوصی در همین مرورگر نگهداری می‌شوند.'}
                </span>
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>ذخیره یادداشت</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* REMAINING SESSIONS TRACKLIST                                    */}
        {/* ============================================================== */}
        <div className="space-y-3 pt-2">
          <div className="text-right">
            <h3 className="text-base font-bold text-white font-serif">سایر جلسات این دوره</h3>
            <p className="text-xs text-slate-400 font-light">
              جلسۀ اول رایگان است؛ برای شنیدن جلسات بعدی وارد حساب کاربری خود شوید.
            </p>
          </div>

          {course.lessons.slice(1).map((lesson) => (
            <div
              key={lesson.id}
              onClick={onOpenLoginModal}
              className="p-4 sm:p-5 rounded-2xl bg-[#0a0d16] border border-slate-800 hover:border-slate-700 transition flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#121828] border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                  ۰{lesson.id}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-200 transition-colors">
                    {lesson.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">{lesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-amber-300 transition-colors">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">ورود برای بازگشایی</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
