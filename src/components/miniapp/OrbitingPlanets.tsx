import React, { useEffect, useRef, useState } from 'react';
import {
  RealisticSaturn,
  RealisticJupiter,
  RealisticMars,
  RealisticVenus,
  RealisticMercury,
  RealisticSun,
  RealisticNeptune,
  RealisticUranus,
  RealisticEarth,
  RealisticMoonGlobe
} from './RealisticPlanets';

export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  element: 'آتش' | 'خاک' | 'هوا' | 'آب';
  elementEn: 'fire' | 'earth' | 'air' | 'water';
  angleDeg: number; // Midpoint angle of the constellation chamber (0 to 360)
  ruler: string;
  quality: string;
}

// 12 Astrological Constellation Chambers situated along the Tilted Celestial Belt
// Perfectly calibrated to match the 3D perspective facing the screen (Gemini/Taurus in front, Sagittarius in rear)
export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { id: 'virgo', name: 'سنبله', symbol: '♍', element: 'خاک', elementEn: 'earth', angleDeg: 0, ruler: 'عطارد ☿', quality: 'ذوجسدین (خرد و نظم)' },
  { id: 'leo', name: 'اسد', symbol: '♌', element: 'آتش', elementEn: 'fire', angleDeg: 30, ruler: 'خورشید ☉', quality: 'ثابت (اقتدار و نور)' },
  { id: 'cancer', name: 'سرطان', symbol: '♋', element: 'آب', elementEn: 'water', angleDeg: 60, ruler: 'ماه ☽', quality: 'منقلب (سرچشمه عواطف)' },
  { id: 'gemini', name: 'جوزا', symbol: '♊', element: 'هوا', elementEn: 'air', angleDeg: 90, ruler: 'عطارد ☿', quality: 'ذوجسدین (پیوند و هوش)' },
  { id: 'taurus', name: 'ثور', symbol: '♉', element: 'خاک', elementEn: 'earth', angleDeg: 120, ruler: 'زهره ♀', quality: 'ثابت (باروری و استواری)' },
  { id: 'aries', name: 'حمل', symbol: '♈', element: 'آتش', elementEn: 'fire', angleDeg: 150, ruler: 'مریخ ♂', quality: 'منقلب (آغازگر بهار)' },
  { id: 'pisces', name: 'حوت', symbol: '♓', element: 'آب', elementEn: 'water', angleDeg: 180, ruler: 'مشتری ♃', quality: 'ذوجسدین (اشراق و ادراک)' },
  { id: 'aquarius', name: 'دلو', symbol: '♒', element: 'هوا', elementEn: 'air', angleDeg: 210, ruler: 'زحل ♄', quality: 'ثابت (نوآوری و کیهان)' },
  { id: 'capricorn', name: 'جدی', symbol: '♑', element: 'خاک', elementEn: 'earth', angleDeg: 240, ruler: 'زحل ♄', quality: 'منقلب (بلندپروازی و صبر)' },
  { id: 'sagittarius', name: 'قوس', symbol: '♐', element: 'آتش', elementEn: 'fire', angleDeg: 270, ruler: 'مشتری ♃', quality: 'ذوجسدین (حکمت و سفر)' },
  { id: 'scorpio', name: 'عقرب', symbol: '♏', element: 'آب', elementEn: 'water', angleDeg: 300, ruler: 'مریخ ♂', quality: 'ثابت (دگرگونی و ژرفا)' },
  { id: 'libra', name: 'میزان', symbol: '♎', element: 'هوا', elementEn: 'air', angleDeg: 330, ruler: 'زهره ♀', quality: 'منقلب (تعادل و دادگری)' },
];

export interface OrbitPlanetConfig {
  id: string;
  name: string;
  symbol: string;
  badgeColor: string;
  badgeBorder: string;
  rx: number;          // semi-major axis in constellation channel
  ry: number;          // semi-minor axis in constellation channel
  speed: number;       // angular orbital velocity in rad/sec
  initialAngle: number; // initial position angle
  size: number;
  component: React.ReactNode;
}

interface OrbitingPlanetsProps {
  onSelectPlanet: (planetId: string) => void;
  activePlanetInfo: string | null;
  setActivePlanetInfo: (info: string | null) => void;
  characterSrc?: string; // Kept for backwards compatibility
}

export const OrbitingPlanets: React.FC<OrbitingPlanetsProps> = ({
  onSelectPlanet,
  activePlanetInfo,
  setActivePlanetInfo,
}) => {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSignInfo | null>(null);
  const [stageScale, setStageScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Constellation Highway Dimensions: Tilted 3D perspective boldly facing the audience
  // Widened track so the zodiac figures sit with ample breathing room inside each bounded chamber
  const ZODIAC_IN_RX = 138;
  const ZODIAC_IN_RY = 80;
  const ZODIAC_MID_RX = 165;
  const ZODIAC_MID_RY = 97;
  const ZODIAC_OUT_RX = 192;
  const ZODIAC_OUT_RY = 114;

  // Planets revolving INSIDE the Constellation Highway (در مسیر و داخل خود صورت فلکی)
  // All planets' orbits (rx: 148..176, ry: 87..104) are strictly centered inside the golden highway
  // Each planet passes physically OVER the zodiac constellation shapes
  const planetsConfig: OrbitPlanetConfig[] = [
    {
      id: 'mercury',
      name: 'عطارد ☿',
      symbol: '☿',
      badgeColor: 'text-slate-200',
      badgeBorder: 'border-slate-400/50',
      rx: 153,
      ry: 90,
      speed: 0.46,
      initialAngle: 0.8,
      size: 17,
      component: <RealisticMercury size={17} />
    },
    {
      id: 'venus',
      name: 'زهره ♀',
      symbol: '♀',
      badgeColor: 'text-yellow-200',
      badgeBorder: 'border-yellow-400/50',
      rx: 160,
      ry: 94,
      speed: 0.35,
      initialAngle: 2.1,
      size: 20,
      component: <RealisticVenus size={20} />
    },
    {
      id: 'moon',
      name: 'ماه ☽',
      symbol: '☽',
      badgeColor: 'text-slate-100',
      badgeBorder: 'border-slate-300/50',
      rx: 148,
      ry: 87,
      speed: 0.42,
      initialAngle: 3.5,
      size: 16,
      component: <RealisticMoonGlobe size={16} />
    },
    {
      id: 'sun',
      name: 'خورشید ☉',
      symbol: '☉',
      badgeColor: 'text-amber-200',
      badgeBorder: 'border-amber-400/50',
      rx: 165,
      ry: 97,
      speed: 0.27,
      initialAngle: 5.1,
      size: 32,
      component: (
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-1.5 rounded-full bg-amber-400/60 blur-[2px] animate-pulse" />
          <RealisticSun size={32} />
        </div>
      )
    },
    {
      id: 'mars',
      name: 'مریخ ♂',
      symbol: '♂',
      badgeColor: 'text-rose-200',
      badgeBorder: 'border-rose-400/50',
      rx: 172,
      ry: 101,
      speed: 0.21,
      initialAngle: 1.4,
      size: 21,
      component: <RealisticMars size={21} />
    },
    {
      id: 'jupiter',
      name: 'مشتری ♃',
      symbol: '♃',
      badgeColor: 'text-amber-200',
      badgeBorder: 'border-amber-400/50',
      rx: 164,
      ry: 96,
      speed: 0.15,
      initialAngle: 4.2,
      size: 32,
      component: <RealisticJupiter size={32} />
    },
    {
      id: 'saturn',
      name: 'زحل ♄',
      symbol: '♄',
      badgeColor: 'text-amber-100',
      badgeBorder: 'border-amber-300/50',
      rx: 176,
      ry: 104,
      speed: 0.11,
      initialAngle: 2.8,
      size: 36,
      component: <RealisticSaturn size={36} />
    },
    {
      id: 'uranus',
      name: 'اورانوس ♅',
      symbol: '♅',
      badgeColor: 'text-teal-200',
      badgeBorder: 'border-teal-400/50',
      rx: 157,
      ry: 92,
      speed: 0.08,
      initialAngle: 0.2,
      size: 20,
      component: <RealisticUranus size={20} />
    },
    {
      id: 'neptune',
      name: 'نپتون ♆',
      symbol: '♆',
      badgeColor: 'text-sky-200',
      badgeBorder: 'border-sky-400/50',
      rx: 170,
      ry: 100,
      speed: 0.06,
      initialAngle: 3.8,
      size: 20,
      component: <RealisticNeptune size={20} />
    }
  ];

  const planetNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const planetAnglesRef = useRef<number[]>(planetsConfig.map(p => p.initialAngle));

  // Dynamic responsive scaling for mobile screens without overflow or drift
  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        const parentWidth = stageRef.current.parentElement?.clientWidth || window.innerWidth;
        const targetScale = Math.min(1, Math.max(0.72, (parentWidth - 16) / 440));
        setStageScale(targetScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current transiting zodiac constellation given angle in radians
  const getTransitingSign = (angleRad: number): ZodiacSignInfo => {
    let normalized = angleRad % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;
    const deg = (normalized * 180) / Math.PI;
    const sign = ZODIAC_SIGNS.find(s => {
      let diff = Math.abs(s.angleDeg - deg);
      if (diff > 180) diff = 360 - diff;
      return diff <= 15;
    }) || ZODIAC_SIGNS[0];
    return sign;
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      planetsConfig.forEach((planet, index) => {
        const node = planetNodesRef.current[index];
        if (node) {
          // Increment orbital angle in astronomical counter-clockwise direction inside the constellation highway
          planetAnglesRef.current[index] += planet.speed * dt;
          const currentAngle = planetAnglesRef.current[index];

          // Elliptical coordinate on the tilted constellation highway
          const x = Math.cos(currentAngle) * planet.rx;
          const y = Math.sin(currentAngle) * planet.ry;

          // 3D Perspective Depth effect:
          const sinVal = Math.sin(currentAngle);
          const isFront = sinVal > 0;
          const depthScale = 0.82 + 0.34 * ((sinVal + 1) / 2); // 0.82 to 1.16

          // CRITICAL: Planets are strictly on layers ABOVE the zodiac figures (which are at z-10 / z-12)
          // Front planets get z-index 40 (above central Earth at 20); back planets get z-index 32 (above zodiac at 10)
          // Result: Planets unequivocally pass OVER the zodiac figures everywhere in the orbit!
          const zIndex = isFront ? 40 : 32;
          const opacity = isFront ? 1.0 : 0.88;

          node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${depthScale})`;
          node.style.zIndex = `${zIndex}`;
          node.style.opacity = `${opacity}`;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute curved annular sector SVG path for each chamber frame (کادر مجزا برای هر برج)
  const getChamberSectorPath = (centerDeg: number) => {
    const startDeg = centerDeg - 15;
    const endDeg = centerDeg + 15;
    const r1 = (startDeg * Math.PI) / 180;
    const r2 = (endDeg * Math.PI) / 180;

    const xOuter1 = Math.cos(r1) * ZODIAC_OUT_RX;
    const yOuter1 = Math.sin(r1) * ZODIAC_OUT_RY;
    const xOuter2 = Math.cos(r2) * ZODIAC_OUT_RX;
    const yOuter2 = Math.sin(r2) * ZODIAC_OUT_RY;

    const xInner2 = Math.cos(r2) * ZODIAC_IN_RX;
    const yInner2 = Math.sin(r2) * ZODIAC_IN_RY;
    const xInner1 = Math.cos(r1) * ZODIAC_IN_RX;
    const yInner1 = Math.sin(r1) * ZODIAC_IN_RY;

    return `M ${xInner1} ${yInner1} L ${xOuter1} ${yOuter1} A ${ZODIAC_OUT_RX} ${ZODIAC_OUT_RY} 0 0 1 ${xOuter2} ${yOuter2} L ${xInner2} ${yInner2} A ${ZODIAC_IN_RX} ${ZODIAC_IN_RY} 0 0 0 ${xInner1} ${yInner1} Z`;
  };

  return (
    <div 
      ref={stageRef}
      className="relative w-full max-w-[440px] h-[225px] sm:h-[285px] mx-auto flex flex-col items-center justify-center overflow-visible select-none my-0"
    >
      
      {/* =================================================================== */}
      {/* 1. DEEP EMERALD COSMIC NEBULA & STARRY BACKGROUND                   */}
      {/* =================================================================== */}
      <div className="absolute inset-0 bg-gradient-radial from-[#043328]/50 via-[#021A15]/80 to-[#010B09]/95 rounded-3xl pointer-events-none" />
      <div className="absolute top-4 left-6 w-48 h-36 bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-8 w-56 h-40 bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-amber-500/10 blur-2xl pointer-events-none" />

      {/* Top Right Spiral Galaxy Graphic */}
      <div className="absolute top-2 right-4 w-12 h-12 pointer-events-none opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <defs>
            <radialGradient id="spiralCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#042F2E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="42" ry="22" transform="rotate(-30 50 50)" fill="url(#spiralCore)" />
          <path
            d="M50 50 Q65 30 80 40 Q90 55 75 70 Q55 85 40 75 Q20 60 30 40 Q40 20 60 25"
            stroke="#FDE68A"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Ambient Stardust Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-7 left-12 w-1.5 h-1.5 bg-amber-200 rounded-full blur-[0.5px] animate-pulse" />
        <span className="absolute top-18 left-24 w-1 h-1 bg-teal-200 rounded-full opacity-80" />
        <span className="absolute top-8 right-24 w-1 h-1 bg-amber-300 rounded-full opacity-70" />
        <span className="absolute bottom-10 left-16 w-1.5 h-1.5 bg-emerald-200 rounded-full blur-[0.5px] animate-pulse" />
        <span className="absolute bottom-14 right-18 w-1 h-1 bg-amber-200 rounded-full opacity-90" />
        <span className="absolute bottom-6 right-28 w-1.5 h-1.5 bg-cyan-200 rounded-full opacity-75" />
      </div>

      {/* Floating Interactive Tooltip Banner for Hovered / Touched Planet or Constellation */}
      {(activePlanetInfo || selectedZodiac) && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 px-3 py-0.5 rounded-full bg-[#031D18]/95 border border-[#F59E0B]/80 text-[10px] text-amber-200 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-fade-in font-mono whitespace-nowrap flex items-center gap-1.5">
          {selectedZodiac ? (
            <span>
              برج {selectedZodiac.name} {selectedZodiac.symbol} • طبع: {selectedZodiac.element} ({selectedZodiac.quality}) • حاکم: {selectedZodiac.ruler}
            </span>
          ) : (
            <span>{activePlanetInfo}</span>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. THE 3D CELESTIAL STAGE (CONTAINING TRACK, EARTH & PLANETS)       */}
      {/* Perfectly scaled to fit mobile screens without pixel drift          */}
      {/* =================================================================== */}
      <div 
        className="relative w-[440px] h-[260px] flex items-center justify-center shrink-0 transition-transform duration-200"
        style={{ 
          transform: `scale(${stageScale})`,
          transformOrigin: 'center center'
        }}
      >
        
        {/* ================================================================= */}
        {/* LAYER A (z-10): THE ZODIAC HIGHWAY & BOUNDED CHAMBERS             */}
        {/* All constellation figures are rendered here ON A LAYER UNDER PLANETS */}
        {/* Strictly clipped inside the annular belt so zero overflow occurs   */}
        {/* ================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <svg
            className="w-[440px] h-[260px] overflow-visible"
            viewBox="-220 -130 440 260"
            fill="none"
          >
            <defs>
              {/* Metallic Golden Gradient for the Highway Rims & Dividing Pillars */}
              <linearGradient id="goldHighwayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#FDE68A" stopOpacity="1.0" />
                <stop offset="50%" stopColor="#B45309" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#FDE68A" stopOpacity="1.0" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
              </linearGradient>

              {/* Glowing Aura Filter */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Crisp Drop Shadow for Zodiac Constellation Figures */}
              <filter id="goldDropShadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.85" />
              </filter>

              {/* Earth Central Atmospheric Aura */}
              <radialGradient id="earthCentralAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#0284C7" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#042F2E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#010B09" stopOpacity="0" />
              </radialGradient>

              {/* RIGID MATHEMATICAL CLIPPING PATH FOR THE ZODIAC BELT:               */}
              {/* Strictly clips everything between ZODIAC_OUT and ZODIAC_IN so that   */}
              {/* absolutely NO element, text, or figure can ever protrude outside!  */}
              <clipPath id="zodiacBeltClip" clipRule="evenodd">
                <path
                  d={`M ${-ZODIAC_OUT_RX} 0 A ${ZODIAC_OUT_RX} ${ZODIAC_OUT_RY} 0 1 0 ${ZODIAC_OUT_RX} 0 A ${ZODIAC_OUT_RX} ${ZODIAC_OUT_RY} 0 1 0 ${-ZODIAC_OUT_RX} 0 Z M ${-ZODIAC_IN_RX} 0 A ${ZODIAC_IN_RX} ${ZODIAC_IN_RY} 0 1 1 ${ZODIAC_IN_RX} 0 A ${ZODIAC_IN_RX} ${ZODIAC_IN_RY} 0 1 1 ${-ZODIAC_IN_RX} 0 Z`}
                />
              </clipPath>
            </defs>

            {/* Central Earth Atmospheric Aura Behind Orbits */}
            <circle cx="0" cy="0" r="24" fill="url(#earthCentralAura)" className="animate-pulse" />

            {/* Concentric Celestial Astrolabe Guide Rings */}
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_IN_RX - 36}
              ry={ZODIAC_IN_RY - 22}
              stroke="#0D9488"
              strokeWidth="0.75"
              strokeOpacity="0.3"
              strokeDasharray="3 5"
              fill="none"
            />
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_IN_RX - 72}
              ry={ZODIAC_IN_RY - 44}
              stroke="#0D9488"
              strokeWidth="0.75"
              strokeOpacity="0.2"
              fill="none"
            />

            {/* ============================================================= */}
            {/* 12 DISTINCT BOUNDED CHAMBER CELLS (کادرهای ۱۲گانه برج‌ها)      */}
            {/* Zero protrusion: each chamber has clean boundaries & backing   */}
            {/* ============================================================= */}
            <g clipPath="url(#zodiacBeltClip)">
              {ZODIAC_SIGNS.map((sign, i) => {
                const isSelected = selectedZodiac?.id === sign.id;
                const pathData = getChamberSectorPath(sign.angleDeg);

                // Alternating luxurious translucent jade-emerald glass backings
                const baseFill = i % 2 === 0 ? 'rgba(3, 38, 30, 0.55)' : 'rgba(2, 26, 21, 0.45)';
                const chamberFill = isSelected ? 'rgba(245, 158, 11, 0.28)' : baseFill;
                const chamberStroke = isSelected ? '#F59E0B' : 'rgba(253, 230, 138, 0.15)';

                return (
                  <path
                    key={`chamber-${sign.id}`}
                    d={pathData}
                    fill={chamberFill}
                    stroke={chamberStroke}
                    strokeWidth={isSelected ? '1.2' : '0.5'}
                    className="cursor-pointer transition-colors duration-200 pointer-events-auto"
                    onClick={() => {
                      setSelectedZodiac(prev => prev?.id === sign.id ? null : sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onTouchStart={() => {
                      setSelectedZodiac(sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onMouseEnter={() => {
                      setSelectedZodiac(sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onMouseLeave={() => {
                      setSelectedZodiac(null);
                      setActivePlanetInfo(null);
                    }}
                  />
                );
              })}
            </g>

            {/* Outer Luminous Glow Halo */}
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_OUT_RX + 1}
              ry={ZODIAC_OUT_RY + 1}
              stroke="url(#goldHighwayGrad)"
              strokeWidth="7"
              strokeOpacity="0.22"
              fill="none"
            />

            {/* Outermost Solid Metallic Golden Rim of the Constellations */}
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_OUT_RX}
              ry={ZODIAC_OUT_RY}
              stroke="url(#goldHighwayGrad)"
              strokeWidth="2.2"
              filter="url(#goldGlow)"
              fill="none"
            />

            {/* Central Planetary Guide Rail within the Constellation Channel */}
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_MID_RX}
              ry={ZODIAC_MID_RY}
              stroke="#FDE68A"
              strokeWidth="1.0"
              strokeOpacity="0.45"
              strokeDasharray="4 6"
              fill="none"
            />

            {/* Innermost Solid Metallic Golden Rim of the Constellations */}
            <ellipse
              cx="0"
              cy="0"
              rx={ZODIAC_IN_RX}
              ry={ZODIAC_IN_RY}
              stroke="url(#goldHighwayGrad)"
              strokeWidth="1.8"
              filter="url(#goldGlow)"
              fill="none"
            />

            {/* 12 Golden Radial Divider Beams Separating the Constellation Chambers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angleDeg = i * 30 + 15;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x1 = Math.cos(angleRad) * ZODIAC_IN_RX;
              const y1 = Math.sin(angleRad) * ZODIAC_IN_RY;
              const x2 = Math.cos(angleRad) * ZODIAC_OUT_RX;
              const y2 = Math.sin(angleRad) * ZODIAC_OUT_RY;

              return (
                <g key={`divider-${i}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#FDE68A"
                    strokeWidth="1.3"
                    strokeOpacity="0.85"
                  />
                  {/* Glowing Jewel at the Outer Rim Junction */}
                  <circle
                    cx={x2}
                    cy={y2}
                    r="1.4"
                    fill="#FFF"
                    filter="url(#goldGlow)"
                  />
                  {/* Inner Fastener Pin */}
                  <circle
                    cx={x1}
                    cy={y1}
                    r="0.9"
                    fill="#FDE68A"
                    opacity="0.75"
                  />
                </g>
              );
            })}

            {/* ============================================================= */}
            {/* 12 CONSTELLATION FIGURES & SHAPES (شکل برج‌ها بدون هیچ نوشته)   */}
            {/* Perfectly sized, centered in each chamber, clipped with 0 overflow */}
            {/* Sits at z-10: Planets pass cleanly OVER these figures!         */}
            {/* ============================================================= */}
            <g clipPath="url(#zodiacBeltClip)">
              {ZODIAC_SIGNS.map((sign) => {
                const angleRad = (sign.angleDeg * Math.PI) / 180;
                const cx = Math.cos(angleRad) * ZODIAC_MID_RX;
                const cy = Math.sin(angleRad) * ZODIAC_MID_RY;

                // Perspective depth facing viewer:
                // Front signs (Gemini, Taurus, Cancer, Aries, Leo) are closer and slightly larger
                const sinVal = Math.sin(angleRad);
                const isFront = sinVal > 0;
                
                // Carefully calibrated font size: fits comfortably inside the 34px-54px chamber
                const fontSize = isFront ? 16 : 13.5;
                const glyphFill = isFront ? 'url(#goldHighwayGrad)' : '#FDE68A';
                const isSelected = selectedZodiac?.id === sign.id;

                // Subtle micro constellation star coordinates around the glyph
                const starOffset = isFront ? 9 : 7;

                return (
                  <g 
                    key={`glyph-${sign.id}`}
                    className="cursor-pointer pointer-events-auto group"
                    onClick={() => {
                      setSelectedZodiac(prev => prev?.id === sign.id ? null : sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onTouchStart={() => {
                      setSelectedZodiac(sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onMouseEnter={() => {
                      setSelectedZodiac(sign);
                      setActivePlanetInfo(`برج ${sign.name} (${sign.symbol}) • طبع: ${sign.element} • حاکم: ${sign.ruler}`);
                    }}
                    onMouseLeave={() => {
                      setSelectedZodiac(null);
                      setActivePlanetInfo(null);
                    }}
                  >
                    {/* Micro Constellation Stardust Lines in Chamber Background */}
                    <line
                      x1={cx - starOffset}
                      y1={cy - 2}
                      x2={cx + starOffset}
                      y2={cy + 2}
                      stroke="#FDE68A"
                      strokeWidth="0.5"
                      strokeOpacity={isSelected ? 0.6 : 0.25}
                    />
                    <circle
                      cx={cx - starOffset}
                      cy={cy - 2}
                      r={0.8}
                      fill="#FFF"
                      opacity={isSelected ? 0.9 : 0.5}
                    />
                    <circle
                      cx={cx + starOffset}
                      cy={cy + 2}
                      r={0.8}
                      fill="#FDE68A"
                      opacity={isSelected ? 0.9 : 0.5}
                    />

                    {/* Pure Sculpted Golden Constellation Shape (شکل برج بدون هیچ نوشته) */}
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={glyphFill}
                      fontSize={fontSize}
                      fontWeight="bold"
                      filter="url(#goldDropShadow)"
                      className="select-none transition-all duration-200"
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        filter: isSelected ? 'url(#goldGlow)' : undefined,
                      }}
                    >
                      {sign.symbol}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ================================================================= */}
        {/* LAYER B (z-20): THE CENTRAL EARTH (زمین در مرکز رصد زایچه)         */}
        {/* ================================================================= */}
        <div
          onClick={() => {
            onSelectPlanet('earth');
            setActivePlanetInfo('زمین ♁: مرکز رصد، زایچه و نقطه دید ناظر کیهانی (کلیک برای تحلیل)');
          }}
          onTouchStart={() => {
            setActivePlanetInfo('زمین ♁: مرکز رصد، زایچه و نقطه دید ناظر کیهانی (کلیک برای تحلیل)');
          }}
          onMouseEnter={() => setActivePlanetInfo('زمین ♁: مرکز رصد، زایچه و نقطه دید ناظر کیهانی (کلیک برای تحلیل)')}
          onMouseLeave={() => setActivePlanetInfo(null)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer pointer-events-auto group flex flex-col items-center justify-center transition-transform hover:scale-120"
          title="زمین ♁ - مرکز زایچه و نقطه رصد کیهانی"
        >
          {/* Enhanced Photorealistic Compact Earth Component in Center */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-radial from-cyan-400/50 via-teal-500/25 to-transparent blur-sm animate-pulse" />
            <RealisticEarth size={26} />
          </div>
          {/* Hover / Touch Label Badge (مخفی به صورت پیش‌فرض، فقط با لمس یا هاور ظاهر می‌شود) */}
          <span className="opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none text-[9px] font-mono font-bold text-cyan-200 bg-[#02130F]/95 px-2 py-0.5 rounded-full border border-cyan-400/50 mt-1 shadow-md whitespace-nowrap transition-all duration-200 transform scale-90 group-hover:scale-100">
            زمین ♁ (مرکز)
          </span>
        </div>

        {/* ================================================================= */}
        {/* LAYER C (z-30): ORBITING PLANETS MOVING OVER THE ZODIAC FIGURES   */}
        {/* z-index 32 to 40 strictly exceeds z-10 (zodiac figures):          */}
        {/* Planets visibly and physically glide OVER the zodiac shapes!      */}
        {/* ================================================================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-30 pointer-events-none">
          {planetsConfig.map((planet, index) => (
            <div
              key={planet.id}
              ref={(el) => {
                planetNodesRef.current[index] = el;
              }}
              onClick={() => onSelectPlanet(planet.id)}
              onTouchStart={() => {
                const currentAngle = planetAnglesRef.current[index];
                const transitingSign = getTransitingSign(currentAngle);
                setActivePlanetInfo(`${planet.name} در برج ${transitingSign.name} ${transitingSign.symbol} (کلیک برای تحلیل کامل)`);
              }}
              onMouseEnter={() => {
                const currentAngle = planetAnglesRef.current[index];
                const transitingSign = getTransitingSign(currentAngle);
                setActivePlanetInfo(`${planet.name} در برج ${transitingSign.name} ${transitingSign.symbol} (کلیک برای تحلیل کامل)`);
              }}
              onMouseLeave={() => setActivePlanetInfo(null)}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center transition-shadow"
              title={`${planet.name} - در حال گذر از روی صورت‌های فلکی دایره‌البروج`}
            >
              {/* Visual Planet Component */}
              <div className="transform transition-transform group-hover:scale-130 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {planet.component}
              </div>

              {/* Planet Label Badge - Only visible on hover or touch/active */}
              <span
                className={`opacity-0 group-hover:opacity-100 group-active:opacity-100 pointer-events-none text-[8.5px] font-mono font-bold ${planet.badgeColor} bg-[#02130F]/95 px-2 py-0.5 rounded-full border ${planet.badgeBorder} group-hover:border-amber-300 mt-1 shadow-[0_2px_10px_rgba(0,0,0,0.85)] whitespace-nowrap transition-all duration-200 transform scale-90 group-hover:scale-100 z-50`}
              >
                {planet.name}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
