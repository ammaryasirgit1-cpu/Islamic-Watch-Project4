import React from 'react';
import { PrayerTimeItem } from '../../types/watch';
import { getNextPrayerInfo } from '../../utils/prayerTimes';

interface Screen4Props {
  time: Date;
  prayers: PrayerTimeItem[];
  isAod?: boolean;
  onOpenPrayerList?: () => void;
}

export const Screen4RamadanMode: React.FC<Screen4Props> = ({
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
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center justify-between p-4 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#022c22] via-[#043329] to-[#011a14]'}`}>
      {/* Emerald Radiant Glow & Starry Sky */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-amber-400/10 blur-2xl" />
      </div>

      {/* Decorative Outer Arc with Emerald to Gold Sheen */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
        <defs>
          <linearGradient id="ramadanArcGrad" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#34d399" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="65%" stopColor="#34d399" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <path
          d="M 42 165 A 112 112 0 0 1 258 165"
          fill="none"
          stroke="url(#ramadanArcGrad)"
          strokeWidth="3"
        />

        {/* Delicate inner decorative starlight dots */}
        <circle cx="80" cy="80" r="1" fill="#fef08a" opacity="0.8" />
        <circle cx="100" cy="65" r="1.2" fill="#fef08a" opacity="0.9" />
        <circle cx="200" cy="65" r="1.2" fill="#fef08a" opacity="0.9" />
        <circle cx="220" cy="80" r="1" fill="#fef08a" opacity="0.8" />
      </svg>

      {/* 1. SUHOOR (Left Top) */}
      <div className="absolute top-[48px] left-[5px] flex flex-col items-start pointer-events-none">
        <div className="flex items-center gap-1 text-[8px] font-sans-clean font-medium text-emerald-300">
          <span>Suhoor</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </div>
        <span className="text-[10px] font-mono tabular-nums font-bold text-white tracking-tight">04:41</span>
      </div>

      {/* 2. FAJR (Left Middle) */}
      <div className="absolute top-[102px] left-[2px] flex flex-col items-start pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span>Fajr</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-neutral-200">05:03</span>
      </div>

      {/* 3. DHUHR (Top Apex 12 o'clock) */}
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

      {/* 4. ASR (Right Top) */}
      <div className="absolute top-[48px] right-[7px] flex flex-col items-end pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span>Asr</span>
        </div>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-white tracking-tight">15:42</span>
      </div>

      {/* 5. IFTAR (MAGHRIB) (Right Middle - Highlighting Fast Break) */}
      <div className="absolute top-[102px] right-[3px] flex flex-col items-end pointer-events-none">
        <div className="flex items-center gap-1 text-[8.5px] font-sans-clean font-bold text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span>Iftar</span>
        </div>
        <span className="text-[7.5px] text-amber-200/80 font-sans-clean">(Maghrib)</span>
        <span className="text-[10.5px] font-mono tabular-nums font-bold text-amber-200">18:11</span>
      </div>

      {/* 6. ISHA (Right Lower) */}
      <div className="absolute top-[154px] right-[8px] flex flex-col items-end pointer-events-none">
        <span className="text-[8px] font-sans-clean text-emerald-300 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400" /> Isha
        </span>
        <span className="text-[9.5px] font-mono tabular-nums font-semibold text-neutral-200">19:29</span>
      </div>

      {/* 7. TARAWEEH (Right Bottom) */}
      <div className="absolute bottom-[24px] right-[10px] flex flex-col items-end pointer-events-none">
        <span className="text-[8px] font-sans-clean text-teal-300 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-teal-400" /> Taraweeh
        </span>
        <span className="text-[9px] font-mono tabular-nums font-semibold text-teal-200">20:00</span>
      </div>

      {/* CENTER GLOWING CRESCENT MOON & ILLUMINATED MOSQUE BACKGROUND */}
      <div className="relative z-0 mt-8 flex flex-col items-center pointer-events-none">
        {/* Crescent Moon Graphic */}
        <div className="relative mb-0.5">
          <svg className="w-11 h-11 text-amber-300 drop-shadow-[0_0_14px_rgba(253,230,138,0.9)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 text-amber-200">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>

        {/* Serene Mosque Dome & Minarets Silhouette */}
        <svg className="w-28 h-8 text-emerald-950/70 opacity-90 -mt-2" viewBox="0 0 120 40">
          <path
            d="
              M 0 40 L 20 40 L 20 22 L 23 22 L 23 10 L 25 5 L 27 10 L 27 22 L 30 22 L 30 40
              L 40 40 Q 60 12 80 40
              L 90 40 L 90 22 L 93 22 L 93 10 L 95 5 L 97 10 L 97 22 L 100 22 L 100 40 L 120 40
              Z
            "
            fill="currentColor"
          />
        </svg>
      </div>

      {/* CENTER DIGITAL TIME & RAMADAN DATES */}
      <div className="relative z-10 flex flex-col items-center -mt-3 pointer-events-none">
        {/* Digital Time */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[34px] font-sans-clean font-extrabold text-white tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {displayHours}:{displayMinutes}
          </span>
          <span className="text-[11px] font-sans-clean font-bold text-emerald-300/80">{ampm}</span>
        </div>

        {/* Gregorian Date */}
        <span className="text-[11px] font-sans-clean font-medium text-neutral-300 tracking-wide mt-0.5">
          Wed 4 Mar 2025
        </span>

        {/* Ramadan Date */}
        <span className="font-arabic text-[13px] text-amber-300 font-bold tracking-normal dir-rtl mt-0.5">
          ٤ رمضان ١٤٤٦ هـ
        </span>
      </div>

      {/* NEXT PRAYER / FASTING WIDGET */}
      <div className="relative z-20 w-full px-5 pb-5">
        <button
          onClick={onOpenPrayerList}
          className="w-full mx-auto py-1 px-3 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-amber-400/30 shadow-[0_0_14px_rgba(251,191,36,0.2)] flex items-center justify-between transition-transform active:scale-95 cursor-pointer"
        >
          {/* Mosque Icon */}
          <div className="flex items-center gap-1.5 text-amber-400">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 0-4 4v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4V6a4 4 0 0 0-4-4z" />
              <path d="M12 14v4" />
              <path d="M9 18h6" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[8.5px] text-amber-300/80 font-medium uppercase tracking-wider leading-none">Next Prayer</span>
              <span className="text-[11px] font-semibold text-white capitalize leading-tight">Dhuhr</span>
            </div>
          </div>

          {/* Countdown Pill */}
          <div className="text-right">
            <span className="text-[12px] font-mono tabular-nums font-bold text-amber-200 tracking-tight">
              {nextInfo.remainingFormatted || '1h 54m'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
