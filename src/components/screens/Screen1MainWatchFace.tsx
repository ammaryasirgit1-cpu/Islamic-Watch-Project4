import React from 'react';
import { PrayerTimeItem } from '../../types/watch';

interface Screen1Props {
  time: Date;
  prayers: PrayerTimeItem[];
  isAod?: boolean;
}

export const Screen1MainWatchFace: React.FC<Screen1Props> = ({ time, isAod = false }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Analog hand angles
  const hourAngle = ((hours % 12) + minutes / 60) * 30; // 360 / 12 = 30 deg/hr
  const minuteAngle = (minutes + seconds / 60) * 6; // 360 / 60 = 6 deg/min
  const secondAngle = seconds * 6;

  // Format 12-hour time
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center justify-center ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-neutral-950 via-[#070b12] to-[#04060a]'}`}>
      {/* Outer minute / hour ticks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 300 300">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * 6 * Math.PI) / 180;
          const isMajor = i % 5 === 0;
          const r1 = 144;
          const r2 = isMajor ? 134 : 140;
          const x1 = 150 + r1 * Math.sin(angle);
          const y1 = 150 - r1 * Math.cos(angle);
          const x2 = 150 + r2 * Math.sin(angle);
          const y2 = 150 - r2 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMajor ? '#f59e0b' : '#64748b'}
              strokeWidth={isMajor ? 1.5 : 0.75}
            />
          );
        })}
      </svg>

      {/* TOP CELESTIAL SUN & PRAYER ARC (Semi-circle from 9 o'clock to 3 o'clock) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
        <defs>
          <linearGradient id="arcGlow" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="80%" stopColor="#ea580c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Semi-circular orbital prayer arc path (radius 112) */}
        {/* Fajr (~200° in standard SVG polar) through Dhuhr (270° top) to Sunset (~340°) */}
        <path
          d="M 46 168 A 110 110 0 0 1 254 168"
          fill="none"
          stroke="url(#arcGlow)"
          strokeWidth="3.5"
          filter="url(#glowFilter)"
        />
        {/* Subtle inner companion dashed track */}
        <path
          d="M 52 168 A 104 104 0 0 1 248 168"
          fill="none"
          stroke="rgba(245, 158, 11, 0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Live Sun position indicator on arc */}
        {/* Normalizes 6:00 to 18:00 across the 180° arc */}
        {(() => {
          const totalDayMinutes = 12 * 60;
          const currentDayMinutes = Math.min(Math.max((hours * 60 + minutes) - 6 * 60, 0), totalDayMinutes);
          const sunArcProgress = currentDayMinutes / totalDayMinutes; // 0 (sunrise) to 1 (sunset)
          const sunAngleRad = Math.PI - sunArcProgress * Math.PI; // from PI to 0
          const sunX = 150 + 110 * Math.cos(sunAngleRad);
          const sunY = 168 - 110 * Math.sin(sunAngleRad);

          return (
            <g>
              <circle cx={sunX} cy={sunY} r="7" fill="#fef08a" opacity="0.4" />
              <circle cx={sunX} cy={sunY} r="4.5" fill="#fde047" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          );
        })()}
      </svg>

      {/* PRAYER TIME BADGES ALONG THE PERIMETER */}
      {/* 1. FAJR (Left top) */}
      <div className="absolute top-[52px] left-[5px] flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span>Fajr</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-white tracking-tight">05:03</span>
      </div>

      {/* 2. SUNRISE (Left middle) */}
      <div className="absolute top-[110px] left-[2px] flex flex-col items-start pointer-events-none">
        <span className="text-[8.5px] font-sans-clean text-amber-300 flex items-center gap-1">
          Sunrise <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_#f59e0b]" />
        </span>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-neutral-200">06:24</span>
      </div>

      {/* 3. DHUHR (Top Apex 12 o'clock) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
        <div className="flex items-center gap-1">
          <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[9px] font-sans-clean font-semibold text-amber-300">Dhuhr</span>
        </div>
        <div className="w-2 h-2 my-0.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] border border-amber-200" />
        <span className="text-[10.5px] font-mono tabular-nums font-bold text-amber-300">12:18</span>
      </div>

      {/* 4. ASR (Right top) */}
      <div className="absolute top-[52px] right-[7px] flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span>Asr</span>
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-white tracking-tight">15:42</span>
      </div>

      {/* 5. SUNSET (Right middle) */}
      <div className="absolute top-[110px] right-[4px] flex flex-col items-end pointer-events-none">
        <span className="text-[8.5px] font-sans-clean text-amber-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_5px_#ea580c]" /> Sunset
        </span>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-neutral-200">18:08</span>
      </div>

      {/* 6. MAGHRIB (Right bottom-ish) */}
      <div className="absolute top-[162px] right-[10px] flex flex-col items-end pointer-events-none">
        <span className="text-[8px] font-sans-clean text-orange-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]" /> Maghrib
        </span>
        <span className="text-[9.5px] font-mono tabular-nums font-semibold text-orange-200">18:11</span>
      </div>

      {/* 7. ISHA (Bottom center-right) */}
      <div className="absolute bottom-[22px] right-[48px] flex flex-col items-center pointer-events-none">
        <span className="text-[8px] font-sans-clean text-indigo-300">Isha</span>
        <span className="text-[9px] font-mono tabular-nums font-semibold text-indigo-200">19:29</span>
      </div>

      {/* CENTER DIAL: DATE & DIGITAL TIME */}
      <div className="relative z-10 flex flex-col items-center -mt-2 pointer-events-none">
        {/* Gregorian Date */}
        <span className="text-[11px] font-sans-clean font-medium text-neutral-300 tracking-wide">
          Wed 4 Sep
        </span>

        {/* Digital Clock */}
        <div className="flex items-baseline gap-1 my-0.5">
          <span className="text-[26px] font-sans-clean font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {displayHours}:{displayMinutes}
          </span>
          <span className="text-[10px] font-sans-clean font-semibold text-neutral-400">{ampm}</span>
        </div>

        {/* Hijri Date in Arabic */}
        <span className="font-arabic text-[12px] text-amber-200/90 font-medium tracking-normal dir-rtl mt-0.5">
          ١ ربيع الأول ١٤٤٧ هـ
        </span>
      </div>

      {/* LOWER COMPLICATION: CELESTIAL MOON PHASE DISC */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="relative w-10 h-10 rounded-full border border-neutral-700/60 bg-gradient-to-b from-[#0f172a] to-[#020617] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Subtle stars in moon disc */}
          <div className="absolute w-0.5 h-0.5 rounded-full bg-white opacity-80 top-2 left-2" />
          <div className="absolute w-0.5 h-0.5 rounded-full bg-amber-200 opacity-60 top-3 right-2" />
          <div className="absolute w-0.5 h-0.5 rounded-full bg-white opacity-40 bottom-2 left-4" />

          {/* Crescent Moon */}
          <svg className="w-5 h-5 text-amber-200 drop-shadow-[0_0_5px_rgba(253,230,138,0.7)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </div>
      </div>

      {/* ANALOG CLOCK HANDS (Hour, Minute, and Second) */}
      {!isAod && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Hour Hand */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-75"
            style={{
              width: '4px',
              height: '52px',
              transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-amber-400 via-amber-200 to-white rounded-t-full shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Minute Hand */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-75"
            style={{
              width: '2.5px',
              height: '76px',
              transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-amber-300 via-amber-100 to-white rounded-t-full shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
          </div>

          {/* Second Hand (Fine Golden / Amber needle with counterbalance) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom"
            style={{
              width: '1px',
              height: '92px',
              transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
            }}
          >
            <div className="w-full h-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
            {/* Center counterbalance circle */}
            <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-neutral-900" />
          </div>

          {/* Center Pinion Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 border border-amber-900/80 shadow-md z-30" />
        </div>
      )}
    </div>
  );
};
