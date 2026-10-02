import React from 'react';
import { PrayerTimeItem } from '../../types/watch';

interface Screen3Props {
  time: Date;
  prayers: PrayerTimeItem[];
  isAod?: boolean;
}

export const Screen3TraditionalAstrolabe: React.FC<Screen3Props> = ({
  time,
  isAod = false,
}) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center justify-center ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#120e06] via-[#1a140a] to-[#0a0703]'}`}>
      {/* Antique Astrolabe Radial Lines & Coordinate Grids */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 300 300">
        <defs>
          <radialGradient id="astrolabeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="150" cy="150" r="142" fill="url(#astrolabeGlow)" />
        <circle cx="150" cy="150" r="136" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 6" opacity="0.7" />
        <circle cx="150" cy="150" r="126" fill="none" stroke="#f59e0b" strokeWidth="0.75" opacity="0.5" />
        <circle cx="150" cy="150" r="88" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />

        {/* Astrolabe degree markings and meridian arcs */}
        {Array.from({ length: 24 }).map((_, i) => {
          const rad = (i * 15 * Math.PI) / 180;
          const x1 = 150 + 136 * Math.sin(rad);
          const y1 = 150 - 136 * Math.cos(rad);
          const x2 = 150 + 126 * Math.sin(rad);
          const y2 = 150 - 126 * Math.cos(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1" opacity="0.6" />;
        })}

        {/* Traditional Islamic arabesque curve arcs */}
        <path d="M 60 150 Q 150 70 240 150" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5" />
        <path d="M 60 150 Q 150 230 240 150" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5" />
      </svg>

      {/* PRAYER TIME MARKERS AROUND THE ASTROLABE PERIMETER */}
      {/* 1. FAJR (Left upper) */}
      <div className="absolute top-[68px] left-[10px] flex flex-col items-center pointer-events-none">
        <span className="text-[8.5px] font-serif-luxury text-amber-300">Fajr</span>
        <span className="text-[10px] font-mono tabular-nums font-bold text-amber-200">05:03</span>
      </div>

      {/* 2. SUNRISE (Left middle) */}
      <div className="absolute top-[120px] left-[5px] flex flex-col items-start pointer-events-none">
        <span className="text-[8.5px] font-serif-luxury text-amber-400">Sunrise</span>
        <span className="text-[10px] font-mono tabular-nums font-bold text-amber-200/90">06:24</span>
      </div>

      {/* 3. DHUHR (Top Apex 12 o'clock) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <span className="text-[9px] font-serif-luxury font-bold text-amber-300 tracking-wider">Dhuhr</span>
        <div className="w-1.5 h-1.5 my-0.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <span className="text-[11px] font-mono tabular-nums font-bold text-amber-200">12:18</span>
      </div>

      {/* 4. ASR (Right upper) */}
      <div className="absolute top-[68px] right-[10px] flex flex-col items-center pointer-events-none">
        <span className="text-[8.5px] font-serif-luxury text-amber-300">Asr</span>
        <span className="text-[10px] font-mono tabular-nums font-bold text-amber-200">15:42</span>
      </div>

      {/* 5. SUNSET (Right middle) */}
      <div className="absolute top-[120px] right-[5px] flex flex-col items-end pointer-events-none">
        <span className="text-[8.5px] font-serif-luxury text-amber-400">Sunset</span>
        <span className="text-[10px] font-mono tabular-nums font-bold text-amber-200/90">18:08</span>
      </div>

      {/* 6. MAGHRIB (Right lower) */}
      <div className="absolute top-[166px] right-[12px] flex flex-col items-end pointer-events-none">
        <span className="text-[8px] font-serif-luxury text-amber-300">Maghrib</span>
        <span className="text-[9.5px] font-mono tabular-nums font-bold text-amber-200">18:11</span>
      </div>

      {/* 7. ISHA (Bottom center) */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <span className="text-[8px] font-serif-luxury text-amber-300">Isha</span>
        <span className="text-[9.5px] font-mono tabular-nums font-bold text-amber-200">19:29</span>
      </div>

      {/* CENTER MEDALLION: SACRED ARABIC CALLIGRAPHY OF "الله" */}
      <div className="relative z-10 flex flex-col items-center justify-center -mt-6 pointer-events-none">
        <div className="relative w-20 h-20 rounded-full border border-amber-500/50 bg-gradient-to-b from-amber-950/60 to-black/80 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)]">
          {/* Inner ring */}
          <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center">
            {/* Calligraphy text "الله" in radiant gold with soft glow */}
            <span className="font-arabic text-[38px] text-amber-300 font-bold leading-none drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] pb-1 select-none">
              الله
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM MOSQUE SILHOUETTE SKYLINE WITH GOLDEN HAZE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 overflow-hidden flex items-end justify-center">
        <svg className="w-full h-full text-amber-500/80 drop-shadow-[0_-4px_12px_rgba(245,158,11,0.3)]" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mosqueSkyline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#b45309" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Golden starry dots in sky */}
          <circle cx="70" cy="18" r="1.2" fill="#fef08a" opacity="0.9" />
          <circle cx="120" cy="12" r="1" fill="#fef08a" opacity="0.7" />
          <circle cx="180" cy="14" r="1" fill="#fef08a" opacity="0.8" />
          <circle cx="230" cy="20" r="1.2" fill="#fef08a" opacity="0.9" />

          {/* Minarets, Arches & Domes Silhouette */}
          <path
            d="
              M 0 100
              L 30 100 L 30 75 L 35 75 L 35 60 L 32 60 L 32 45 L 35 45 L 35 25 L 37.5 15 L 40 25 L 40 45 L 43 45 L 43 60 L 40 60 L 40 75 L 50 75
              Q 70 50 90 75
              L 100 75 L 100 55 L 104 55 L 104 35 L 106 20 L 108 35 L 108 55 L 112 55 L 112 75
              Q 150 35 188 75
              L 192 75 L 192 55 L 196 55 L 196 35 L 198 20 L 200 35 L 200 55 L 204 55 L 204 75
              Q 230 50 250 75
              L 260 75 L 260 60 L 257 60 L 257 45 L 260 45 L 260 25 L 262.5 15 L 265 25 L 265 45 L 268 45 L 268 60 L 265 60 L 265 75 L 270 75 L 270 100
              Z
            "
            fill="url(#mosqueSkyline)"
          />
        </svg>
      </div>

      {/* ANALOG CLOCK HANDS (Traditional Dagger / Sword Golden Hands) */}
      {!isAod && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Hour Hand */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-75"
            style={{
              width: '4.5px',
              height: '56px',
              transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-amber-500 via-amber-300 to-amber-100 rounded-t-sm shadow-[0_2px_10px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Minute Hand */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-75"
            style={{
              width: '3px',
              height: '78px',
              transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-amber-400 via-amber-200 to-amber-50 rounded-t-sm shadow-[0_2px_10px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Second Hand */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom"
            style={{
              width: '1px',
              height: '94px',
              transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-amber-300 shadow-[0_0_5px_#fde047]" />
            <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 border border-neutral-900" />
          </div>

          {/* Center Pinion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 border border-amber-950 shadow-md z-40" />
        </div>
      )}
    </div>
  );
};
