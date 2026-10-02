import React, { useState } from 'react';
import { calculateQibla } from '../utils/prayerTimes';
import { CityLocation } from '../types/watch';
import { playBezelClick } from '../utils/audioAdhan';

interface QiblaCompassProps {
  currentCity: CityLocation;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ currentCity }) => {
  const qiblaBearing = calculateQibla(currentCity.latitude, currentCity.longitude);
  const [deviceHeading, setDeviceHeading] = useState(0);

  // Rotate manually or simulate compass alignment
  const alignToKaaba = () => {
    playBezelClick();
    setDeviceHeading(360 - qiblaBearing);
  };

  const currentRelativeAngle = (qiblaBearing + deviceHeading) % 360;
  const isAligned = Math.abs(currentRelativeAngle) < 3 || Math.abs(currentRelativeAngle - 360) < 3;

  return (
    <div className="flex flex-col items-center p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800">
      <div className="flex items-center justify-between w-full mb-3">
        <div>
          <h4 className="text-[13px] font-sans-clean font-semibold text-white">Qibla Direction</h4>
          <span className="text-[11px] font-sans-clean text-neutral-400">
            {currentCity.name}, {currentCity.country}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[16px] font-mono tabular-nums font-bold text-amber-300">
            {qiblaBearing}°
          </span>
          <span className="block text-[10px] text-neutral-400">from North</span>
        </div>
      </div>

      {/* Compass Dial */}
      <div className="relative w-48 h-48 rounded-full border-2 border-neutral-700 bg-neutral-950 p-2 shadow-inner flex items-center justify-center">
        {/* Cardinal Directions */}
        <span className="absolute top-2 text-[10px] font-bold text-neutral-400">N</span>
        <span className="absolute bottom-2 text-[10px] font-bold text-neutral-400">S</span>
        <span className="absolute right-3 text-[10px] font-bold text-neutral-400">E</span>
        <span className="absolute left-3 text-[10px] font-bold text-neutral-400">W</span>

        {/* Graduations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 200 200">
          {Array.from({ length: 36 }).map((_, i) => {
            const rad = (i * 10 * Math.PI) / 180;
            const isMajor = i % 9 === 0;
            const r1 = 96;
            const r2 = isMajor ? 84 : 90;
            const x1 = 100 + r1 * Math.sin(rad);
            const y1 = 100 - r1 * Math.cos(rad);
            const x2 = 100 + r2 * Math.sin(rad);
            const y2 = 100 - r2 * Math.cos(rad);
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

        {/* Qibla Indicator Needle */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out flex items-center justify-center"
          style={{ transform: `rotate(${currentRelativeAngle}deg)` }}
        >
          {/* Kaaba Direction Arrow (Pointing to Holy Kaaba) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Kaaba Icon */}
            <div className="w-5 h-5 rounded bg-neutral-950 border border-amber-400 flex items-center justify-center shadow-[0_0_8px_#f59e0b]">
              <div className="w-2.5 h-1 bg-amber-400 mb-1" />
            </div>
            {/* Golden Pointer */}
            <div className="w-0.5 h-12 bg-gradient-to-t from-transparent via-amber-400 to-amber-200 mt-1" />
          </div>

          {/* Opposite Needle */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-neutral-600" />

          {/* Center Pivot */}
          <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-neutral-900 shadow-md" />
        </div>

        {/* Kaaba Alignment Status */}
        {isAligned && (
          <div className="absolute z-20 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-sans-clean text-emerald-300">
            Aligned with Kaaba
          </div>
        )}
      </div>

      <button
        onClick={alignToKaaba}
        className="mt-3 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-sans-clean font-medium text-neutral-200 transition-colors cursor-pointer"
      >
        Simulate Kaaba Alignment
      </button>
    </div>
  );
};
