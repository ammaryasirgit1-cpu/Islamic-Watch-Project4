import React from 'react';
import { UPCOMING_EVENTS } from '../../utils/hijriCalendar';
import { playBezelClick } from '../../utils/audioAdhan';

interface Screen8Props {
  isAod?: boolean;
}

export const Screen8DateDetailsEvents: React.FC<Screen8Props> = ({
  isAod = false,
}) => {
  const getEventIcon = (id: string) => {
    switch (id) {
      case 'new-year':
        return <span className="text-amber-400 text-[12px]">★</span>;
      case 'mawlid':
        return (
          <svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="7" y="5" width="10" height="14" rx="2" />
            <path d="M12 2v3M12 19v3M7 9h10M7 15h10" />
          </svg>
        );
      case 'ayyam-al-beed':
        return (
          <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-400 shadow-[0_0_5px_rgba(255,255,255,0.6)]" />
        );
      case 'next-monday':
      case 'next-thursday':
      default:
        return (
          <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center pt-4 pb-4 px-6 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#090e18] via-[#0d1726] to-[#060a12]'}`}>
      {/* Header with Navigation */}
      <div className="w-full flex items-center justify-between px-2 mb-1">
        <button
          onClick={() => playBezelClick()}
          className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[12px] font-sans-clean font-bold text-white tracking-tight flex items-center gap-1">
            1 Rabi al-Awwal 1447 <span className="font-arabic text-[12px] text-amber-300">هـ</span>
          </span>
          <span className="text-[9.5px] font-sans-clean text-neutral-400">
            Wed 4 Sep 2024
          </span>
        </div>

        <button
          onClick={() => playBezelClick()}
          className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Events List */}
      <div className="w-full flex-1 overflow-y-auto px-1 space-y-1.5 scrollbar-thin">
        {UPCOMING_EVENTS.slice(0, 5).map((evt) => (
          <div
            key={evt.id}
            onClick={() => playBezelClick()}
            className="w-full py-1.5 px-2.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800/40 flex items-center justify-between transition-colors cursor-pointer"
          >
            {/* Left: Icon & Title */}
            <div className="flex items-center gap-2 max-w-[140px]">
              <span className="shrink-0 flex items-center justify-center w-4 h-4">
                {getEventIcon(evt.id)}
              </span>
              <span className="text-[10.5px] font-sans-clean font-medium text-neutral-200 truncate">
                {evt.title}
              </span>
            </div>

            {/* Right: Days countdown */}
            <div className="text-right shrink-0">
              <span className="text-[9.5px] font-sans-clean text-neutral-400 font-medium">
                in {evt.daysRemaining} days
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom indicator */}
      <div className="w-6 h-1 rounded-full bg-neutral-700/60 mt-1 shrink-0" />
    </div>
  );
};
