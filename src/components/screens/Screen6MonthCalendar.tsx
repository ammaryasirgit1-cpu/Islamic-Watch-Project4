import React, { useState } from 'react';
import { getHijriMonthGrid, ISLAMIC_MONTHS_1447 } from '../../utils/hijriCalendar';
import { playBezelClick } from '../../utils/audioAdhan';

interface Screen6Props {
  isAod?: boolean;
  onSelectDate?: (day: number, monthIndex: number) => void;
}

export const Screen6MonthCalendar: React.FC<Screen6Props> = ({
  isAod = false,
  onSelectDate,
}) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(2); // Rabi al-Awwal (index 2)
  const [selectedDay, setSelectedDay] = useState(1); // 1 Rabi al-Awwal (Today)

  const monthData = ISLAMIC_MONTHS_1447[currentMonthIdx];
  const gridDays = getHijriMonthGrid(currentMonthIdx, selectedDay);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBezelClick();
    setCurrentMonthIdx((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBezelClick();
    setCurrentMonthIdx((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const handleDayClick = (dayNumber: number) => {
    playBezelClick();
    setSelectedDay(dayNumber);
    if (onSelectDate) {
      onSelectDate(dayNumber, currentMonthIdx);
    }
  };

  const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center pt-3 pb-3 px-4 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#090d14] via-[#0d131d] to-[#05080e]'}`}>
      {/* Month Navigation Header */}
      <div className="w-full flex items-center justify-between px-3 mt-1">
        <button
          onClick={handlePrevMonth}
          className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[12px] font-sans-clean font-bold text-white tracking-tight flex items-center gap-1">
            {monthData.nameEn} 1447 <span className="font-arabic text-[12px] text-amber-300">هـ</span>
          </span>
          <span className="text-[9px] font-sans-clean text-neutral-400">
            Sep – Oct 2024
          </span>
        </div>

        <button
          onClick={handleNextMonth}
          className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Weekday Column Headers (Sat-Fri) */}
      <div className="grid grid-cols-7 w-full max-w-[210px] text-center mt-1 mb-1">
        {weekdays.map((w) => (
          <span key={w} className="text-[8.5px] font-sans-clean font-medium text-neutral-400">
            {w}
          </span>
        ))}
      </div>

      {/* 30-Day Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 w-full max-w-[210px] text-center my-auto">
        {/* Leading empty cells for calendar alignment (Rabi al-Awwal 1447 starts on Sun -> 1 empty cell for Sat) */}
        <div className="w-6 h-6" />

        {gridDays.map((day) => {
          const isSelected = day.dayNumber === selectedDay;
          const isToday = day.dayNumber === 1; // Day 1 is Today in the reference

          return (
            <button
              key={day.dayNumber}
              onClick={() => handleDayClick(day.dayNumber)}
              className="w-6 h-6 mx-auto flex items-center justify-center relative cursor-pointer group"
            >
              {/* Day Cell Circle Styling */}
              {isToday ? (
                // Solid green circle for Today
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.7)]">
                  {day.dayNumber}
                </span>
              ) : isSelected ? (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
                  {day.dayNumber}
                </span>
              ) : day.isFastingDay ? (
                // Outlined gray/muted ring for Mon/Thu fasting
                <span className="w-5 h-5 rounded-full border border-neutral-600 bg-neutral-800/40 text-neutral-200 text-[10px] flex items-center justify-center">
                  {day.dayNumber}
                </span>
              ) : day.isAyyamAlBeed ? (
                // White dot / highlighted for Ayyam al-Beed
                <span className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-400/80 text-white font-medium text-[10px] flex items-center justify-center">
                  {day.dayNumber}
                </span>
              ) : (
                <span className="text-[10px] font-sans-clean text-neutral-300 group-hover:text-white">
                  {day.dayNumber}
                </span>
              )}

              {/* Special Event Star Marker (e.g. Day 12 Mawlid) */}
              {day.isIslamicEvent && (
                <span className="absolute -top-0.5 -right-0.5 text-[7px] text-amber-400">
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="w-full max-w-[230px] flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 pt-1 text-[7.5px] font-sans-clean text-neutral-400">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full border border-neutral-500" />
          <span>Fasting (Mon/Thu)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Ayyam al-Beed</span>
        </div>
        <div className="flex items-center gap-0.5 text-amber-400">
          <span>★</span>
          <span className="text-neutral-400">Islamic Event</span>
        </div>
      </div>
    </div>
  );
};
