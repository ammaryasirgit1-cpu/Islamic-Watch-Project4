import React, { useState } from 'react';
import { PrayerTimeItem } from '../../types/watch';
import { playVerseMelody, playPrayerChime, isAdhanPlaying, playBezelClick } from '../../utils/audioAdhan';

interface Screen5Props {
  prayers: PrayerTimeItem[];
  isAod?: boolean;
  onOpenAdhanRecitation?: (isFajr: boolean) => void;
}

export const Screen5PrayerTimesList: React.FC<Screen5Props> = ({
  prayers,
  isAod = false,
  onOpenAdhanRecitation,
}) => {
  const [playingPrayerId, setPlayingPrayerId] = useState<string | null>(null);

  const handlePlayAdhan = (prayerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdhanPlaying()) return;

    setPlayingPrayerId(prayerId);
    playPrayerChime();

    const isFajr = prayerId === 'fajr';
    const verseKey = isFajr ? 'takbeer-1' : 'takbeer-1';

    setTimeout(() => {
      playVerseMelody(verseKey, () => {
        setPlayingPrayerId(null);
      });
    }, 300);
  };

  const getPrayerIcon = (id: string) => {
    switch (id) {
      case 'fajr':
        return (
          <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a4 4 0 0 0-4 4v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4V6a4 4 0 0 0-4-4z" />
          </svg>
        );
      case 'sunrise':
        return (
          <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M4.93 10.93l2.83 2.83M19.07 10.93l-2.83 2.83M2 18h20M7 18a5 5 0 0 1 10 0" />
          </svg>
        );
      case 'dhuhr':
        return (
          <svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'asr':
        return (
          <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        );
      case 'sunset':
        return (
          <svg className="w-3.5 h-3.5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 10v4M4.93 10.93l2.83-2.83M19.07 10.93l-2.83-2.83M2 18h20M7 18a5 5 0 0 1 10 0" />
          </svg>
        );
      case 'maghrib':
        return (
          <svg className="w-3.5 h-3.5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 18a5 5 0 0 0-10 0M12 9v3M2 18h20M4.93 10.93l1.41 1.41M19.07 10.93l-1.41 1.41" />
          </svg>
        );
      case 'isha':
      default:
        return (
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        );
    }
  };

  const listItems = [
    { id: 'fajr', name: 'Fajr', time: '05:03', color: 'text-emerald-400', isCurrent: false, hasAdhan: true },
    { id: 'sunrise', name: 'Sunrise', time: '06:24', color: 'text-amber-300', isCurrent: false, hasAdhan: false },
    { id: 'dhuhr', name: 'Dhuhr', time: '12:18', color: 'text-amber-400', isCurrent: true, hasAdhan: true },
    { id: 'asr', name: 'Asr', time: '15:42', color: 'text-amber-300', isCurrent: false, hasAdhan: true },
    { id: 'sunset', name: 'Sunset', time: '18:08', color: 'text-orange-400', isCurrent: false, hasAdhan: false },
    { id: 'maghrib', name: 'Maghrib', time: '18:11', color: 'text-orange-500', isCurrent: false, hasAdhan: true },
    { id: 'isha', name: 'Isha', time: '19:29', color: 'text-cyan-400', isCurrent: false, hasAdhan: true },
  ];

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden select-none flex flex-col items-center pt-4 pb-3 px-6 ${isAod ? 'bg-black text-neutral-400' : 'bg-gradient-to-b from-[#06090e] via-[#090e17] to-[#04060a]'}`}>
      {/* Header */}
      <div className="flex flex-col items-center mb-1 shrink-0">
        <h3 className="text-[13px] font-sans-clean font-bold text-white tracking-wide">
          Prayer Times
        </h3>
        <span className="text-[9px] font-sans-clean text-neutral-400">
          Today • Wed 4 Sep 2024
        </span>
      </div>

      {/* Scrollable List of Today's Prayers */}
      <div className="w-full flex-1 overflow-y-auto px-1 space-y-1 scrollbar-thin">
        {listItems.map((item) => {
          const isActive = item.isCurrent;
          const isPlayingThis = playingPrayerId === item.id;

          return (
            <div
              key={item.id}
              onClick={(e) => {
                if (item.hasAdhan) {
                  handlePlayAdhan(item.id, e);
                }
              }}
              className={`w-full py-1.5 px-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500/15 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                  : 'bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800/40'
              }`}
            >
              {/* Left: Icon & Name */}
              <div className="flex items-center gap-2">
                <span className="shrink-0">{getPrayerIcon(item.id)}</span>
                <span className={`text-[11.5px] font-sans-clean font-medium ${isActive ? 'text-white font-semibold' : 'text-neutral-200'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                )}
              </div>

              {/* Right: Time & Audio Indicator */}
              <div className="flex items-center gap-1.5">
                {isPlayingThis ? (
                  <span className="text-[8.5px] text-amber-300 font-sans-clean animate-pulse">Azan...</span>
                ) : null}
                <span className={`text-[11.5px] font-mono tabular-nums font-bold tracking-tight ${item.color}`}>
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Full Azan Verses Button */}
      {onOpenAdhanRecitation && (
        <button
          onClick={() => {
            playBezelClick();
            onOpenAdhanRecitation(false);
          }}
          className="mt-1 py-0.5 px-3 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-[9px] text-emerald-300 font-medium transition-colors cursor-pointer shrink-0"
        >
          View Azan Verses (الأذان)
        </button>
      )}
    </div>
  );
};
