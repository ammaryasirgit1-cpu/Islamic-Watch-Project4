import React from 'react';
import { PrayerTimeItem } from '../../types/watch';
import { getNextPrayerInfo } from '../../utils/prayerTimes';

interface Screen2Props {
  time: Date;
  prayers: PrayerTimeItem[];
  isAod?: boolean;
  onOpenPrayerList?: () => void;
}

export const Screen2InfoRich: React.FC<Screen2Props> = ({
  time,
  prayers,
  isAod = false,
  onOpenPrayerList,
}) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const nextInfo = getNextPrayerInfo(time, prayers);

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center justify-between p-4 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#030712] via-[#050c1a] to-[#02050c]'}`}>
      {/* Top Sun Arc & Prayer Indicators */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
        <defs>
          <linearGradient id="infoArcGrad" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Perimeter arc */}
        <path
          d="M 40 160 A 114 114 0 0 1 260 160"
          fill="none"
          stroke="url(#infoArcGrad)"
          strokeWidth="3"
        />

        {/* Active prayer indicator dot on arc */}
        <circle cx="150" cy="46" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
      </svg>

      {/* 1. FAJR (Left top) */}
      <div className="absolute top-[52px] left-[6px] flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span>Fajr</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-white tracking-tight">05:03</span>
      </div>

      {/* 2. SUNRISE (Left middle) */}
      <div className="absolute top-[108px] left-[3px] flex flex-col items-start pointer-events-none">
        <span className="text-[8.5px] font-sans-clean text-amber-300 flex items-center gap-1">
          Sunrise <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_#f59e0b]" />
        </span>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-neutral-200">06:24</span>
      </div>

      {/* 3. DHUHR (Top Apex) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
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
      <div className="absolute top-[52px] right-[8px] flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span>Asr</span>
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-white tracking-tight">15:42</span>
      </div>

      {/* 5. SUNSET (Right middle) */}
      <div className="absolute top-[108px] right-[4px] flex flex-col items-end pointer-events-none">
        <span className="text-[8.5px] font-sans-clean text-amber-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_5px_#ea580c]" /> Sunset
        </span>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-neutral-200">18:08</span>
      </div>

      {/* 6. MAGHRIB (Right lower) */}
      <div className="absolute top-[160px] right-[10px] flex flex-col items-end pointer-events-none">
        <span className="text-[8px] font-sans-clean text-orange-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]" /> Maghrib
        </span>
        <span className="text-[9.5px] font-mono tabular-nums font-semibold text-orange-200">18:11</span>
      </div>

      {/* 7. ISHA (Bottom) */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className="text-[8px] font-sans-clean text-indigo-300">Isha</span>
        <span className="text-[9px] font-mono tabular-nums font-semibold text-indigo-200">19:29</span>
      </div>

      {/* CENTER DIGITAL TIME & DATES */}
      <div className="relative z-10 flex flex-col items-center mt-14">
        {/* Massive Clear Digital Clock */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[42px] font-sans-clean font-extrabold text-white tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {displayHours}:{displayMinutes}
          </span>
          <span className="text-[12px] font-sans-clean font-bold text-neutral-400">{ampm}</span>
        </div>

        {/* Gregorian Date */}
        <span className="text-[12px] font-sans-clean font-medium text-neutral-300 tracking-wide mt-1">
          Wed 4 Sep 2024
        </span>

        {/* Hijri Date */}
        <span className="font-arabic text-[14px] text-amber-200 font-semibold tracking-normal dir-rtl mt-0.5">
          ١ ربيع الأول ١٤٤٧ هـ
        </span>
      </div>

      {/* NEXT PRAYER WIDGET BUTTON */}
      <div className="relative z-20 w-full px-5 pb-6">
        <button
          onClick={onOpenPrayerList}
          className="w-full mx-auto py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)] flex items-center justify-between transition-transform active:scale-95 cursor-pointer"
        >
          {/* Mosque Icon */}
          <div className="flex items-center gap-1.5 text-emerald-400">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 0-4 4v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4V6a4 4 0 0 0-4-4z" />
              <path d="M12 14v4" />
              <path d="M9 18h6" />
              <circle cx="12" cy="7" r="1" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-emerald-300/80 font-medium uppercase tracking-wider leading-none">Next Prayer</span>
              <span className="text-[12px] font-semibold text-emerald-200 capitalize leading-tight">Dhuhr</span>
            </div>
          </div>

          {/* Countdown Pill */}
          <div className="text-right">
            <span className="text-[13px] font-mono tabular-nums font-bold text-emerald-100 tracking-tight">
              {nextInfo.remainingFormatted || '1h 54m'}
            </span>
          </div>
        </button>
      </div>

      {/* Bottom Left Crescent Moon Graphic */}
      <div className="absolute bottom-6 left-6 pointer-events-none opacity-80">
        <svg className="w-4 h-4 text-cyan-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      </div>
    </div>
  );
};
