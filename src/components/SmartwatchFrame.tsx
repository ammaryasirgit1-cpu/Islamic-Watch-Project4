import React, { useRef, useState } from 'react';
import { ScreenId, CaseMaterial, StrapStyle, PrayerTimeItem } from '../types/watch';
import { Screen1MainWatchFace } from './screens/Screen1MainWatchFace';
import { Screen2InfoRich } from './screens/Screen2InfoRich';
import { Screen3TraditionalAstrolabe } from './screens/Screen3TraditionalAstrolabe';
import { Screen4RamadanMode } from './screens/Screen4RamadanMode';
import { Screen5PrayerTimesList } from './screens/Screen5PrayerTimesList';
import { Screen6MonthCalendar } from './screens/Screen6MonthCalendar';
import { Screen7YearView } from './screens/Screen7YearView';
import { Screen8DateDetailsEvents } from './screens/Screen8DateDetailsEvents';
import { playBezelClick } from '../utils/audioAdhan';

interface SmartwatchFrameProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  time: Date;
  prayers: PrayerTimeItem[];
  caseMaterial?: CaseMaterial;
  strapStyle?: StrapStyle;
  isAod?: boolean;
  scale?: number; // scale factor (e.g. 1.0 for main simulator, 0.72 for gallery)
  showStraps?: boolean;
  onSelectCalendarDate?: (day: number, month: number) => void;
  onSelectCalendarMonth?: (month: number) => void;
  onOpenAdhanRecitation?: (isFajr: boolean) => void;
}

export const SmartwatchFrame: React.FC<SmartwatchFrameProps> = ({
  currentScreen,
  onScreenChange,
  time,
  prayers,
  caseMaterial = 'titanium-black',
  strapStyle = 'black-leather',
  isAod = false,
  scale = 1.0,
  showStraps = true,
  onSelectCalendarDate,
  onSelectCalendarMonth,
  onOpenAdhanRecitation,
}) => {
  const [bezelRotation, setBezelRotation] = useState(0);
  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);

  // Bezel rotation step
  const rotateBezelStep = (direction: 1 | -1) => {
    playBezelClick();
    setBezelRotation((prev) => prev + direction * 30);
    const nextScreen = ((((currentScreen - 1 + direction) % 8) + 8) % 8) + 1;
    onScreenChange(nextScreen as ScreenId);
  };

  // Case Styling
  const getCaseStyles = () => {
    switch (caseMaterial) {
      case 'rose-gold':
        return {
          caseRing: 'bg-gradient-to-tr from-[#9a5b3a] via-[#e2a878] to-[#6d3c22] border-[#c48259]',
          bezelRing: 'bg-gradient-to-b from-[#2a1e17] via-[#1a120d] to-[#120c09] border-[#a06846]/40',
          crown: 'bg-gradient-to-r from-[#d99b70] via-[#ffd6b0] to-[#8c4f2e]',
          lug: 'bg-gradient-to-b from-[#b07049] to-[#6d3c22]',
        };
      case 'brushed-silver':
        return {
          caseRing: 'bg-gradient-to-tr from-[#64748b] via-[#e2e8f0] to-[#334155] border-[#94a3b8]',
          bezelRing: 'bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] border-[#475569]/40',
          crown: 'bg-gradient-to-r from-[#cbd5e1] via-[#ffffff] to-[#64748b]',
          lug: 'bg-gradient-to-b from-[#94a3b8] to-[#475569]',
        };
      case 'titanium-black':
      default:
        return {
          caseRing: 'bg-gradient-to-tr from-[#171717] via-[#2d2d2d] to-[#0f0f0f] border-[#404040]',
          bezelRing: 'bg-gradient-to-b from-[#1c1c1c] via-[#111111] to-[#080808] border-neutral-700/50',
          crown: 'bg-gradient-to-r from-[#525252] via-[#737373] to-[#262626]',
          lug: 'bg-gradient-to-b from-[#303030] to-[#181818]',
        };
    }
  };

  // Strap Styling
  const renderStraps = () => {
    if (!showStraps) return null;

    let strapBg = 'bg-neutral-900 border-neutral-800';
    let texture = null;

    if (strapStyle === 'black-leather') {
      strapBg = 'bg-[#141416] border-[#26262b]';
      texture = (
        <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-between px-2 py-4">
          <div className="w-[1px] h-full border-r border-dashed border-amber-100" />
          <div className="w-[1px] h-full border-r border-dashed border-amber-100" />
        </div>
      );
    } else if (strapStyle === 'brown-leather') {
      strapBg = 'bg-[#3d2314] border-[#5e3720]';
      texture = (
        <div className="absolute inset-0 opacity-25 pointer-events-none flex justify-between px-2 py-4">
          <div className="w-[1px] h-full border-r border-dashed border-amber-200" />
          <div className="w-[1px] h-full border-r border-dashed border-amber-200" />
        </div>
      );
    } else if (strapStyle === 'steel-mesh') {
      strapBg = 'bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-700 border-neutral-600';
    } else if (strapStyle === 'sport-silicone') {
      strapBg = 'bg-[#181a20] border-[#222630]';
    }

    return (
      <>
        {/* Top Strap */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-44 h-28 rounded-t-xl ${strapBg} border shadow-2xl -z-10 overflow-hidden`}>
          {texture}
          <div className="w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Bottom Strap */}
        <div className={`absolute -bottom-24 left-1/2 -translate-x-1/2 w-44 h-28 rounded-b-xl ${strapBg} border shadow-2xl -z-10 overflow-hidden`}>
          {texture}
          <div className="w-full h-full bg-gradient-to-t from-black/40 via-transparent to-black/60" />
        </div>
      </>
    );
  };

  const caseColors = getCaseStyles();

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Optional Top & Bottom Straps */}
      {renderStraps()}

      {/* Watch Lugs (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
      <div className={`absolute -top-4 -left-2 w-7 h-12 rounded-tl-lg ${caseColors.lug} -z-10 shadow-lg`} />
      <div className={`absolute -top-4 -right-2 w-7 h-12 rounded-tr-lg ${caseColors.lug} -z-10 shadow-lg`} />
      <div className={`absolute -bottom-4 -left-2 w-7 h-12 rounded-bl-lg ${caseColors.lug} -z-10 shadow-lg`} />
      <div className={`absolute -bottom-4 -right-2 w-7 h-12 rounded-br-lg ${caseColors.lug} -z-10 shadow-lg`} />

      {/* Physical Hardware Buttons on Right Side */}
      {/* 1. Top Action Button (Quick toggle Ramadan Mode / Screen 4) */}
      <button
        onClick={() => {
          playBezelClick();
          onScreenChange(currentScreen === 4 ? 1 : 4);
        }}
        title="Top Button: Toggle Ramadan Mode"
        className={`absolute top-20 -right-4 w-3.5 h-10 rounded-r-md ${caseColors.crown} border-t border-r border-b border-neutral-600 shadow-md hover:brightness-110 active:translate-x-[-1px] transition-all cursor-pointer`}
      />

      {/* 2. Middle Digital Crown (Home Button / Screen 1) */}
      <button
        onClick={() => {
          playBezelClick();
          onScreenChange(1);
        }}
        title="Digital Crown: Return Home"
        className={`absolute top-1/2 -translate-y-1/2 -right-6 w-5 h-14 rounded-r-lg ${caseColors.crown} border-t border-r border-b border-neutral-700 shadow-xl hover:brightness-110 active:translate-x-[-1px] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer`}
      >
        <div className="w-1 h-1 rounded-full bg-neutral-900/60" />
        <div className="w-1 h-3 rounded-full bg-neutral-900/40" />
        <div className="w-1 h-1 rounded-full bg-neutral-900/60" />
      </button>

      {/* 3. Bottom Action Button (Quick Jump to Screen 5: Prayer Times) */}
      <button
        onClick={() => {
          playBezelClick();
          onScreenChange(5);
        }}
        title="Bottom Button: Today's Prayer Times"
        className={`absolute bottom-20 -right-4 w-3.5 h-10 rounded-r-md ${caseColors.crown} border-t border-r border-b border-neutral-600 shadow-md hover:brightness-110 active:translate-x-[-1px] transition-all cursor-pointer`}
      />

      {/* MAIN WATCH CASE BODY (Circular 360px x 360px outer) */}
      <div className={`relative w-[360px] h-[360px] rounded-full p-2.5 ${caseColors.caseRing} border-2 watch-bezel-shadow flex items-center justify-center`}>
        {/* ROTATING BEZEL RING (Outer textured bezel with tick notches) */}
        <div
          className={`relative w-full h-full rounded-full p-3.5 ${caseColors.bezelRing} border border-neutral-800 shadow-inner flex items-center justify-center transition-transform duration-300 ease-out`}
          style={{ transform: `rotate(${bezelRotation}deg)` }}
        >
          {/* Bezel Micro Notches / Indices */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 340 340">
            {Array.from({ length: 60 }).map((_, i) => {
              const rad = (i * 6 * Math.PI) / 180;
              const isMajor = i % 5 === 0;
              const r1 = 166;
              const r2 = isMajor ? 154 : 160;
              const x1 = 170 + r1 * Math.sin(rad);
              const y1 = 170 - r1 * Math.cos(rad);
              const x2 = 170 + r2 * Math.sin(rad);
              const y2 = 170 - r2 * Math.cos(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? '#e2e8f0' : '#64748b'}
                  strokeWidth={isMajor ? 1.5 : 0.8}
                />
              );
            })}
          </svg>

          {/* Inner Display Ring (300px x 300px Circular AMOLED Screen) */}
          <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden bg-black shadow-2xl flex items-center justify-center">
            {/* Screen Content Switcher */}
            {currentScreen === 1 && (
              <Screen1MainWatchFace time={time} prayers={prayers} isAod={isAod} />
            )}
            {currentScreen === 2 && (
              <Screen2InfoRich
                time={time}
                prayers={prayers}
                isAod={isAod}
                onOpenPrayerList={() => onScreenChange(5)}
              />
            )}
            {currentScreen === 3 && (
              <Screen3TraditionalAstrolabe time={time} prayers={prayers} isAod={isAod} />
            )}
            {currentScreen === 4 && (
              <Screen4RamadanMode
                time={time}
                prayers={prayers}
                isAod={isAod}
                onOpenPrayerList={() => onScreenChange(5)}
              />
            )}
            {currentScreen === 5 && (
              <Screen5PrayerTimesList
                prayers={prayers}
                isAod={isAod}
                onOpenAdhanRecitation={onOpenAdhanRecitation}
              />
            )}
            {currentScreen === 6 && (
              <Screen6MonthCalendar
                isAod={isAod}
                onSelectDate={(day, month) => {
                  if (onSelectCalendarDate) onSelectCalendarDate(day, month);
                  onScreenChange(8);
                }}
              />
            )}
            {currentScreen === 7 && (
              <Screen7YearView
                isAod={isAod}
                onSelectMonth={(month) => {
                  if (onSelectCalendarMonth) onSelectCalendarMonth(month);
                  onScreenChange(6);
                }}
              />
            )}
            {currentScreen === 8 && (
              <Screen8DateDetailsEvents isAod={isAod} />
            )}

            {/* Sapphire Crystal Glass Glare Reflection Layer */}
            <div className="absolute inset-0 watch-glass-glare pointer-events-none rounded-full z-40" />

            {/* AOD Low-Power Tint Filter if Enabled */}
            {isAod && (
              <div className="absolute inset-0 bg-black/60 pointer-events-none rounded-full z-50 flex items-center justify-center">
                <span className="absolute bottom-4 text-[8px] font-sans-clean text-neutral-500 uppercase tracking-widest">
                  Ambient AOD Mode
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Bezel Rotary Chevron Buttons (Left & Right) */}
        <button
          onClick={() => rotateBezelStep(-1)}
          title="Rotate Bezel Left (Previous Screen)"
          className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 shadow-lg flex items-center justify-center transition-all opacity-70 hover:opacity-100 z-30 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => rotateBezelStep(1)}
          title="Rotate Bezel Right (Next Screen)"
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 shadow-lg flex items-center justify-center transition-all opacity-70 hover:opacity-100 z-30 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
