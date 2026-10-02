import React, { useState } from 'react';
import { playTasbihTap, playPrayerChime } from '../utils/audioAdhan';

export const TasbihCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);

  const dhikrs = [
    { title: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', translation: 'Glory be to Allah' },
    { title: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', translation: 'Praise be to Allah' },
    { title: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', translation: 'Allah is the Greatest' },
    { title: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', translation: 'I seek forgiveness from Allah' },
    { title: 'La Ilaha Illallah', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', translation: 'None has the right to be worshipped except Allah' },
  ];

  const currentDhikr = dhikrs[selectedDhikrIndex];

  const handleTap = () => {
    playTasbihTap();
    const nextCount = count + 1;
    if (nextCount === 33) {
      playPrayerChime();
      setCount(0);
      setRounds((r) => r + 1);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
    setRounds(0);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800">
      <div className="flex items-center justify-between w-full mb-3">
        <h4 className="text-[13px] font-sans-clean font-semibold text-white">Digital Tasbih</h4>
        <div className="flex items-center gap-1.5 text-[11px] font-sans-clean text-neutral-400">
          <span>Completed:</span>
          <span className="font-mono text-amber-300 font-bold">{rounds} rounds</span>
        </div>
      </div>

      {/* Dhikr Selector Tabs */}
      <div className="w-full flex gap-1 overflow-x-auto pb-2 scrollbar-none mb-3">
        {dhikrs.map((d, idx) => (
          <button
            key={d.title}
            onClick={() => {
              setSelectedDhikrIndex(idx);
              setCount(0);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans-clean whitespace-nowrap transition-colors cursor-pointer ${
              idx === selectedDhikrIndex
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      {/* Main Dhikr Tap Surface */}
      <button
        onClick={handleTap}
        className="w-full py-6 rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700/60 hover:border-amber-500/50 active:scale-[0.98] transition-all flex flex-col items-center justify-center cursor-pointer shadow-lg group relative overflow-hidden"
      >
        <span className="font-arabic text-2xl text-amber-300 font-semibold mb-1 group-hover:scale-105 transition-transform">
          {currentDhikr.arabic}
        </span>
        <span className="text-[12px] font-sans-clean text-neutral-300 font-medium">
          {currentDhikr.title}
        </span>
        <span className="text-[10px] font-sans-clean text-neutral-400 mb-3">
          {currentDhikr.translation}
        </span>

        {/* Counter readout */}
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-mono tabular-nums font-extrabold text-white">
            {count}
          </span>
          <span className="text-sm font-mono text-neutral-400">/ 33</span>
        </div>

        <span className="text-[9px] font-sans-clean text-neutral-400 mt-2 uppercase tracking-widest">
          Tap anywhere to count
        </span>
      </button>

      {/* Reset Button */}
      <div className="w-full flex justify-end mt-2">
        <button
          onClick={handleReset}
          className="text-[10px] font-sans-clean text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset count
        </button>
      </div>
    </div>
  );
};
