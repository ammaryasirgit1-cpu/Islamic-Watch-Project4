import React from 'react';
import { ISLAMIC_MONTHS_1447 } from '../../utils/hijriCalendar';
import { playBezelClick } from '../../utils/audioAdhan';

interface Screen7Props {
  isAod?: boolean;
  onSelectMonth?: (monthIndex: number) => void;
}

export const Screen7YearView: React.FC<Screen7Props> = ({
  isAod = false,
  onSelectMonth,
}) => {
  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center pt-5 pb-4 px-6 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#080d16] via-[#0d1624] to-[#05090f]'}`}>
      {/* Header */}
      <div className="flex flex-col items-center mb-2 shrink-0">
        <h3 className="text-[13px] font-sans-clean font-bold text-white tracking-wide flex items-center gap-1">
          Islamic Year 1447 <span className="font-arabic text-[14px] text-amber-300">هـ</span>
        </h3>
      </div>

      {/* 12 Months List */}
      <div className="w-full flex-1 overflow-y-auto px-1 space-y-1.5 scrollbar-thin">
        {ISLAMIC_MONTHS_1447.map((m) => {
          const isCurrentMonth = m.index === 3; // Rabi al-Awwal in reference
          const isStarEvent = m.index === 9 || m.index === 12; // Ramadan & Eid al-Adha

          return (
            <div
              key={m.index}
              onClick={() => {
                playBezelClick();
                if (onSelectMonth) onSelectMonth(m.index - 1);
              }}
              className={`w-full py-1 px-2.5 rounded-lg flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                isCurrentMonth
                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                  : 'bg-neutral-900/50 hover:bg-neutral-800/60 border border-neutral-800/30 text-neutral-300'
              }`}
            >
              {/* Left: Index badge + Name */}
              <div className="flex items-center gap-2">
                {isCurrentMonth ? (
                  <span className="w-4 h-4 rounded-full border border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold text-[9px] flex items-center justify-center">
                    {m.index}
                  </span>
                ) : isStarEvent ? (
                  <span className="text-amber-400 text-[10px] w-4 text-center">★</span>
                ) : (
                  <span className="text-neutral-500 text-[10px] w-4 font-mono text-center">
                    {m.index}
                  </span>
                )}

                <span className={`font-sans-clean font-medium ${isCurrentMonth ? 'text-emerald-300 font-semibold' : 'text-neutral-200'}`}>
                  {m.nameEn}
                </span>
              </div>

              {/* Right: Gregorian Start Date */}
              <div className="text-right">
                <span className="text-[10px] font-sans-clean text-neutral-400 tabular-nums">
                  {m.gregorianStart}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom indicator */}
      <div className="w-6 h-1 rounded-full bg-neutral-700/60 mt-1 shrink-0" />
    </div>
  );
};
