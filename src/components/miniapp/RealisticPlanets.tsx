import React from 'react';

interface PlanetProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
}

// 1. زحل (Saturn) با حلقهٔ سه‌بعدی و سایهٔ واقعی کره روی حلقه‌ها
export const RealisticSaturn: React.FC<PlanetProps> = ({ size = 48, className = '', showGlow = true }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size * 1.5, height: size }}>
      <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
        <defs>
          {/* Planet Sphere Gradient */}
          <radialGradient id="saturnGlobe" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#451A03" />
          </radialGradient>

          {/* Planetary Cloud Belts Filter */}
          <linearGradient id="saturnBands" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#FEF3C7" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#D97706" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#92400E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.9" />
          </linearGradient>

          {/* Ring Gradient with Cassini Division */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="48%" stopColor="#78350F" stopOpacity="0.9" />
            {/* Cassini Division */}
            <stop offset="50%" stopColor="#05080E" stopOpacity="0.95" />
            <stop offset="53%" stopColor="#05080E" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#D97706" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.4" />
          </linearGradient>

          {/* Mask for Back Ring (behind planet) */}
          <mask id="backRingMask">
            <rect width="120" height="80" fill="white" />
            <circle cx="60" cy="40" r="22" fill="black" />
          </mask>

          {/* Mask for Front Ring (in front of planet) */}
          <clipPath id="frontRingClip">
            <rect x="0" y="40" width="120" height="40" />
          </clipPath>
        </defs>

        {/* Back portion of the rings (Behind the planet globe) */}
        <g transform="rotate(-24 60 40)">
          {/* Outer ring back */}
          <ellipse cx="60" cy="40" rx="54" ry="15" fill="none" stroke="url(#ringGrad)" strokeWidth="11" opacity="0.9" mask="url(#backRingMask)" />
          {/* Crepe ring back */}
          <ellipse cx="60" cy="40" rx="34" ry="9" fill="none" stroke="#D97706" strokeWidth="3" opacity="0.4" mask="url(#backRingMask)" />
        </g>

        {/* Planet Sphere */}
        <circle cx="60" cy="40" r="22" fill="url(#saturnGlobe)" />

        {/* Atmospheric Striping across the sphere */}
        <g clipPath="url(#globeClip)">
          <clipPath id="globeClip">
            <circle cx="60" cy="40" r="22" />
          </clipPath>
          <rect x="38" y="18" width="44" height="44" fill="url(#saturnBands)" opacity="0.45" />
          {/* Shadow from Ring on Globe */}
          <ellipse cx="60" cy="38" rx="28" ry="5" fill="#1C0A00" opacity="0.5" transform="rotate(-24 60 38)" />
          {/* Planet Edge Shading / 3D Terminator */}
          <circle cx="60" cy="40" r="22" fill="none" stroke="#451A03" strokeWidth="3" opacity="0.6" />
        </g>

        {/* Front portion of the rings (Passing in front of the planet globe) */}
        <g transform="rotate(-24 60 40)" clipPath="url(#frontRingClip)">
          {/* Main Ring Front */}
          <ellipse cx="60" cy="40" rx="54" ry="15" fill="none" stroke="url(#ringGrad)" strokeWidth="11" opacity="0.95" />
          {/* Inner Crepe Ring Front */}
          <ellipse cx="60" cy="40" rx="34" ry="9" fill="none" stroke="#FDE68A" strokeWidth="3" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

// 2. مشتری (Jupiter) با نوارهای ابری گازهای جوی و لکه بزرگ سرخ (Great Red Spot)
export const RealisticJupiter: React.FC<PlanetProps> = ({ size = 44, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.55)]">
        <defs>
          <radialGradient id="jupiter3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FED7AA" />
            <stop offset="65%" stopColor="#EA580C" />
            <stop offset="85%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>

          <clipPath id="jupiterClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* 3D Base Globe */}
        <circle cx="50" cy="50" r="46" fill="url(#jupiter3D)" />

        {/* Jovian Atmospheric Bands & Stripes */}
        <g clipPath="url(#jupiterClip)">
          {/* North Polar Region */}
          <ellipse cx="50" cy="14" rx="46" ry="7" fill="#7C2D12" opacity="0.65" />
          {/* North Temperate Belt */}
          <ellipse cx="50" cy="25" rx="46" ry="5.5" fill="#C2410C" opacity="0.75" />
          <ellipse cx="50" cy="30" rx="46" ry="3" fill="#FED7AA" opacity="0.5" />
          {/* North Equatorial Belt */}
          <ellipse cx="50" cy="38" rx="46" ry="7" fill="#9A3412" opacity="0.85" />
          {/* Equatorial White Zone */}
          <ellipse cx="50" cy="47" rx="46" ry="5" fill="#FFF7ED" opacity="0.7" />
          {/* South Equatorial Belt with turbulent ripples */}
          <ellipse cx="50" cy="58" rx="46" ry="8" fill="#7C2D12" opacity="0.85" />
          
          {/* Famous Great Red Spot (طوفان سرخ مشتری) */}
          <g transform="translate(62, 59)">
            {/* Red Spot Outer Aura */}
            <ellipse cx="0" cy="0" rx="10" ry="6" fill="#C2410C" opacity="0.9" />
            {/* Red Spot Inner Core */}
            <ellipse cx="-1" cy="0" rx="7" ry="4" fill="#EA580C" />
            <ellipse cx="-1" cy="0" rx="4" ry="2.2" fill="#FED7AA" opacity="0.6" />
          </g>

          {/* South Temperate Belt */}
          <ellipse cx="50" cy="72" rx="46" ry="5" fill="#9A3412" opacity="0.7" />
          {/* South Polar Hood */}
          <ellipse cx="50" cy="85" rx="46" ry="8" fill="#7C2D12" opacity="0.7" />

          {/* 3D Sphere Shadow Vignette on right/bottom edge */}
          <radialGradient id="jupiterShadow" cx="30%" cy="30%" r="70%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="90%" stopColor="#431407" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E0700" stopOpacity="0.9" />
          </radialGradient>
          <circle cx="50" cy="50" r="46" fill="url(#jupiterShadow)" />
        </g>
      </svg>
    </div>
  );
};

// 3. مریخ (Mars) سیاره سرخ با کلاهک یخی قطب و دره‌های سنگی
export const RealisticMars: React.FC<PlanetProps> = ({ size = 36, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_14px_rgba(239,68,68,0.6)]">
        <defs>
          <radialGradient id="mars3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="25%" stopColor="#F87171" />
            <stop offset="55%" stopColor="#DC2626" />
            <stop offset="80%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
          <clipPath id="marsClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Mars 3D Globe */}
        <circle cx="50" cy="50" r="46" fill="url(#mars3D)" />

        {/* Craters & Dark Basins (Syrtis Major & Acidalia Planitia) */}
        <g clipPath="url(#marsClip)">
          {/* Northern Polar Ice Cap (کلاهک یخی سفید قطب شمال مریخ) */}
          <ellipse cx="48" cy="8" rx="16" ry="6" fill="#F8FAFC" opacity="0.95" />
          <ellipse cx="48" cy="11" rx="19" ry="4" fill="#E2E8F0" opacity="0.6" />

          {/* Dark Geological Basins */}
          <path d="M25,35 Q40,30 55,42 Q70,40 75,55 Q60,65 45,58 Q30,62 25,48 Z" fill="#7F1D1D" opacity="0.75" />
          <path d="M50,55 Q65,58 70,72 Q55,80 40,75 Q32,68 50,55 Z" fill="#5A1010" opacity="0.8" />
          <circle cx="32" cy="44" r="5" fill="#450A0A" opacity="0.6" />
          <circle cx="68" cy="62" r="7" fill="#450A0A" opacity="0.7" />

          {/* Southern Polar Frost */}
          <ellipse cx="52" cy="94" rx="12" ry="4" fill="#F1F5F9" opacity="0.8" />

          {/* Thin Atmospheric Blue/Dust Limb */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#FCA5A5" strokeWidth="2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

// 4. زهره (Venus) سیاره درخشان با ابرهای چرخشی ابریشمی زرین
export const RealisticVenus: React.FC<PlanetProps> = ({ size = 38, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_16px_rgba(251,191,36,0.65)]">
        <defs>
          <radialGradient id="venus3D" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </radialGradient>
          <clipPath id="venusClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="46" fill="url(#venus3D)" />

        {/* Swirling Sulfuric Atmosphere Waves */}
        <g clipPath="url(#venusClip)" opacity="0.45">
          <path d="M0,25 Q30,40 60,20 T100,30" fill="none" stroke="#FEF9C3" strokeWidth="8" />
          <path d="M0,45 Q40,30 70,55 T100,45" fill="none" stroke="#FDE68A" strokeWidth="10" />
          <path d="M0,65 Q35,80 65,60 T100,75" fill="none" stroke="#F59E0B" strokeWidth="7" />
          <circle cx="48" cy="48" r="46" fill="none" stroke="#FEF08A" strokeWidth="3" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};

// 5. عطارد (Mercury) سیاره صخره‌ای و دهانه‌دار نزدیک خورشید
export const RealisticMercury: React.FC<PlanetProps> = ({ size = 30, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(148,163,184,0.5)]">
        <defs>
          <radialGradient id="mercury3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="60%" stopColor="#64748B" />
            <stop offset="85%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
          <clipPath id="mercuryClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="46" fill="url(#mercury3D)" />

        {/* Impact Craters (دهانه‌های برخوردی عطارد) */}
        <g clipPath="url(#mercuryClip)" opacity="0.65">
          <circle cx="35" cy="35" r="9" fill="#475569" stroke="#94A3B8" strokeWidth="1.2" />
          <circle cx="34" cy="34" r="2.5" fill="#E2E8F0" />
          
          <circle cx="62" cy="45" r="7" fill="#334155" stroke="#64748B" strokeWidth="1" />
          <circle cx="48" cy="65" r="11" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <circle cx="47" cy="64" r="3" fill="#CBD5E1" />

          <circle cx="25" cy="60" r="5" fill="#334155" stroke="#64748B" strokeWidth="0.8" />
          <circle cx="70" cy="28" r="6" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

// 6. خورشید (Sun) گوی آتشین حیات با شراره‌ها و هالهٔ سوزان
export const RealisticSun: React.FC<PlanetProps> = ({ size = 42, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(250,204,21,0.85)] animate-pulse" style={{ animationDuration: '3s' }}>
        <defs>
          <radialGradient id="sunCore" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#FBBF24" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </radialGradient>
        </defs>

        {/* Solar Corona Rays */}
        <circle cx="50" cy="50" r="48" fill="#F59E0B" opacity="0.25" />
        <circle cx="50" cy="50" r="45" fill="#FBBF24" opacity="0.4" />
        
        {/* Sun Core */}
        <circle cx="50" cy="50" r="40" fill="url(#sunCore)" />
      </svg>
    </div>
  );
};

// 7. نپتون (Neptune) غول یخی لاجوردی با طوفان‌های متانی سفید
export const RealisticNeptune: React.FC<PlanetProps> = ({ size = 36, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.65)]">
        <defs>
          <radialGradient id="neptune3D" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="30%" stopColor="#38BDF8" />
            <stop offset="65%" stopColor="#2563EB" />
            <stop offset="85%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#0B133E" />
          </radialGradient>
          <clipPath id="neptuneClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="46" fill="url(#neptune3D)" />

        {/* High Altitude Methane Cirrus Cloud Streaks */}
        <g clipPath="url(#neptuneClip)" opacity="0.6">
          <ellipse cx="50" cy="32" rx="42" ry="4" fill="#E0F2FE" opacity="0.75" />
          <ellipse cx="55" cy="52" rx="35" ry="3.5" fill="#BAE6FD" opacity="0.8" />
          {/* Great Dark Spot of Neptune */}
          <ellipse cx="42" cy="46" rx="8" ry="4.5" fill="#1E3A8A" opacity="0.85" />
          <ellipse cx="48" cy="74" rx="38" ry="3" fill="#E0F2FE" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

// 8. اورانوس (Uranus) سیاره یخی زمردی-فیروزه‌ای با رینگ‌های نازک
export const RealisticUranus: React.FC<PlanetProps> = ({ size = 34, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_14px_rgba(45,212,191,0.6)]">
        <defs>
          <radialGradient id="uranus3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#CCFBF1" />
            <stop offset="30%" stopColor="#5EEAD4" />
            <stop offset="65%" stopColor="#0D9488" />
            <stop offset="85%" stopColor="#115E59" />
            <stop offset="100%" stopColor="#042F2E" />
          </radialGradient>
        </defs>

        {/* Uranus Thin Faint Ring */}
        <ellipse cx="50" cy="50" rx="48" ry="8" fill="none" stroke="#A7F3D0" strokeWidth="1" transform="rotate(78 50 50)" opacity="0.6" />
        {/* Planet Globe */}
        <circle cx="50" cy="50" r="42" fill="url(#uranus3D)" />
      </svg>
    </div>
  );
};

// 9. کره زمین (Earth) فوق‌العاده واقع‌گرایانه (NASA Blue Marble) با اقیانوس‌های ژرف، فلات‌های قاره‌ای، اتمسفر و ابرهای چرخان
export const RealisticEarth: React.FC<PlanetProps> = ({ size = 28, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]">
        <defs>
          {/* Deep Ocean 3D Spherical Shading */}
          <radialGradient id="earthOceanRealistic" cx="36%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="25%" stopColor="#0284C7" />
            <stop offset="55%" stopColor="#0369A1" />
            <stop offset="80%" stopColor="#075985" />
            <stop offset="100%" stopColor="#082F49" />
          </radialGradient>

          {/* 3D Sphere Terminator / Spherical Shadow for realistic globe curvature */}
          <radialGradient id="earthTerminator" cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.15" />
            <stop offset="45%" stopColor="transparent" />
            <stop offset="75%" stopColor="#021422" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#010A12" stopOpacity="0.9" />
          </radialGradient>

          {/* Specular Sunglint on Ocean */}
          <radialGradient id="earthGlint" cx="38%" cy="34%" r="18%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          <clipPath id="earthClipRealistic">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Base Ocean Sphere */}
        <circle cx="50" cy="50" r="46" fill="url(#earthOceanRealistic)" />

        {/* Continents, Coastlines, Deserts and Ice Caps */}
        <g clipPath="url(#earthClipRealistic)">
          {/* Cyan Shallow Water / Continental Shelves */}
          <path d="M41,18 Q55,14 67,23 Q80,30 82,49 Q74,66 56,59 Q50,50 40,40 Z" fill="#06B6D4" opacity="0.35" />
          <path d="M43,44 Q60,46 58,72 Q45,82 35,64 Q38,50 43,44 Z" fill="#06B6D4" opacity="0.35" />
          <path d="M10,22 Q25,18 30,36 Q25,48 14,44 Z" fill="#06B6D4" opacity="0.3" />

          {/* Africa & Arabia & Eurasia Landmass */}
          <path d="M43,20 Q54,16 66,24 Q78,31 79,47 Q72,62 57,56 Q51,48 42,41 Z" fill="#15803D" opacity="0.9" />
          {/* Sahara & Middle East Desert Tones (Ochre / Tan) */}
          <path d="M44,28 Q56,23 68,30 Q74,38 72,45 Q64,48 52,44 Q46,38 44,28 Z" fill="#B45309" opacity="0.85" />
          <path d="M48,32 Q58,28 66,33 Q68,40 60,42 Q52,40 48,32 Z" fill="#D97706" opacity="0.8" />
          
          {/* Central & Southern Africa Rainforest / Savannah */}
          <path d="M45,45 Q59,47 56,70 Q46,80 37,63 Q39,51 45,45 Z" fill="#166534" opacity="0.9" />
          <path d="M48,48 Q55,50 53,64 Q46,70 42,60 Q43,53 48,48 Z" fill="#15803D" opacity="0.85" />

          {/* Mediterranean Sea Cutout */}
          <path d="M49,27 Q56,26 62,29 Q58,31 52,30 Z" fill="#0369A1" opacity="0.75" />

          {/* North & South Polar Ice Caps */}
          <ellipse cx="50" cy="7" rx="26" ry="6" fill="#F8FAFC" opacity="0.95" />
          <ellipse cx="50" cy="94" rx="28" ry="7" fill="#F1F5F9" opacity="0.95" />

          {/* Specular Sunglint */}
          <circle cx="38" cy="34" r="18" fill="url(#earthGlint)" />

          {/* Realistic Swirling Cloud Weather Systems (Feathered White Swirls) */}
          {/* Northern Hemisphere Storm Vortex */}
          <path d="M22,25 Q35,16 52,22 Q65,28 76,20 Q62,32 45,30 Q30,28 22,25 Z" fill="#FFFFFF" opacity="0.78" />
          <path d="M38,20 Q48,15 58,22 Q50,26 42,24 Z" fill="#F8FAFC" opacity="0.85" />

          {/* Intertropical Convergence Zone (ITCZ) Equatorial Cloud Belt */}
          <path d="M12,48 Q28,54 48,46 Q68,52 86,43 Q72,56 52,52 Q32,58 12,48 Z" fill="#FFFFFF" opacity="0.72" />
          <path d="M50,47 Q62,44 74,48 Q64,52 54,50 Z" fill="#F8FAFC" opacity="0.8" />

          {/* Southern Ocean Roaring Forties Cyclonic Cloud Swirls */}
          <path d="M25,72 Q42,66 64,74 Q78,70 84,77 Q68,82 48,78 Q32,82 25,72 Z" fill="#FFFFFF" opacity="0.75" />
          <path d="M40,70 Q52,65 65,71 Q55,76 44,74 Z" fill="#F1F5F9" opacity="0.85" />

          {/* 3D Curvature Terminator Shadow */}
          <circle cx="50" cy="50" r="46" fill="url(#earthTerminator)" />

          {/* Atmospheric Rayleigh Scattering (Luminous Cyan Outer Ring) */}
          <circle cx="50" cy="50" r="45.5" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.75" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

// 10. کره ماه (Moon) با دریاوارهای بازالتی و دهانه‌های برخوردی دقیق
export const RealisticMoonGlobe: React.FC<PlanetProps> = ({ size = 32, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(226,232,240,0.65)]">
        <defs>
          <radialGradient id="moonGlobeGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="90%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>
          <clipPath id="moonClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="46" fill="url(#moonGlobeGrad)" />

        {/* Lunar Maria (Dark Basalt Plains: Sea of Tranquility, etc.) */}
        <g clipPath="url(#moonClip)" opacity="0.55">
          <path d="M30,25 Q45,20 52,32 Q42,42 28,35 Z" fill="#334155" />
          <path d="M50,38 Q68,34 72,50 Q58,56 46,45 Z" fill="#1E293B" />
          <path d="M25,48 Q40,46 42,62 Q26,68 20,56 Z" fill="#334155" />
          <path d="M42,64 Q60,60 62,75 Q48,82 38,72 Z" fill="#1E293B" />
          {/* Tycho & Copernicus Crater Rays */}
          <circle cx="64" cy="68" r="4" fill="#F8FAFC" />
          <line x1="64" y1="68" x2="80" y2="58" stroke="#F8FAFC" strokeWidth="0.8" opacity="0.6" />
          <line x1="64" y1="68" x2="52" y2="82" stroke="#F8FAFC" strokeWidth="0.8" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

