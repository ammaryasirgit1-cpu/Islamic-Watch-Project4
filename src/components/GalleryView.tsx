import React from 'react';
import { ScreenId, PrayerTimeItem, CaseMaterial, StrapStyle } from '../types/watch';
import { SmartwatchFrame } from './SmartwatchFrame';
import { playBezelClick } from '../utils/audioAdhan';

interface GalleryViewProps {
  time: Date;
  prayers: PrayerTimeItem[];
  caseMaterial: CaseMaterial;
  strapStyle: StrapStyle;
  activeScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
}

interface ScreenCardMeta {
  id: ScreenId;
  title: string;
  subtitle: string;
  badge: string;
}

export const SCREEN_METAS: ScreenCardMeta[] = [
  {
    id: 1,
    title: '1. MAIN WATCH FACE',
    subtitle: 'Clean & Elegant',
    badge: 'Analog & Celestial Arc',
  },
  {
    id: 2,
    title: '2. INFORMATION RICH',
    subtitle: 'More details at a glance',
    badge: 'Digital & Next Prayer',
  },
  {
    id: 3,
    title: '3. TRADITIONAL STYLE',
    subtitle: 'Islamic astronomical look',
    badge: 'Astrolabe & Calligraphy',
  },
  {
    id: 4,
    title: '4. RAMADAN MODE',
    subtitle: 'Suhoor — Iftar — Taraweeh',
    badge: 'Fasting Milestones',
  },
  {
    id: 5,
    title: '5. PRAYER TIMES SCREEN',
    subtitle: 'Full list for today',
    badge: 'Daily Adhan Schedule',
  },
  {
    id: 6,
    title: '6. ISLAMIC CALENDAR (MONTH)',
    subtitle: 'Hijri month view',
    badge: 'Lunar Fasting Grid',
  },
  {
    id: 7,
    title: '7. ISLAMIC YEAR VIEW',
    subtitle: 'Months & key events',
    badge: '12 Hijri Months',
  },
  {
    id: 8,
    title: '8. DATE DETAILS & EVENTS',
    subtitle: 'Selected date information',
    badge: 'Sunnah Countdowns',
  },
];

export const GalleryView: React.FC<GalleryViewProps> = ({
  time,
  prayers,
  caseMaterial,
  strapStyle,
  activeScreen,
  onSelectScreen,
}) => {
  return (
    <div className="w-full">
      {/* 4 Columns on desktop (matches the 4x2 grid of the reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 justify-items-center">
        {SCREEN_METAS.map((meta) => {
          const isSelected = activeScreen === meta.id;

          return (
            <div
              key={meta.id}
              onClick={() => {
                playBezelClick();
                onSelectScreen(meta.id);
              }}
              className={`group flex flex-col items-center cursor-pointer transition-all duration-300 p-3 rounded-2xl ${
                isSelected
                  ? 'bg-amber-500/10 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/30 scale-[1.02]'
                  : 'hover:bg-neutral-900/60 border border-transparent hover:border-neutral-800'
              }`}
            >
              {/* Scaled Smartwatch Frame */}
              <div className="relative h-[290px] w-[270px] flex items-center justify-center overflow-hidden">
                <SmartwatchFrame
                  currentScreen={meta.id}
                  onScreenChange={onSelectScreen}
                  time={time}
                  prayers={prayers}
                  caseMaterial={caseMaterial}
                  strapStyle={strapStyle}
                  scale={0.68}
                  showStraps={true}
                />
              </div>

              {/* Title & Subtitle Matching Image Typography */}
              <div className="flex flex-col items-center text-center mt-3 space-y-1">
                <span className="text-[13px] font-sans-clean font-bold tracking-wider text-amber-200/90 uppercase group-hover:text-amber-300 transition-colors">
                  {meta.title}
                </span>
                <span className="text-[12px] font-sans-clean text-neutral-400 font-medium">
                  {meta.subtitle}
                </span>

                <div className="pt-1">
                  <span className="inline-block text-[10px] font-sans-clean px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    {meta.badge}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
