import React, { useState, useEffect, useRef } from 'react';
import {
  ADHAN_VERSES,
  DUA_AFTER_ADHAN,
  AdhanVerse,
  startFullAdhanSequence,
  stopAdhan,
  playVerseMelody,
  isAdhanPlaying,
  playBezelClick,
} from '../utils/audioAdhan';

interface AdhanRecitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIsFajr?: boolean;
}

export const AdhanRecitationModal: React.FC<AdhanRecitationModalProps> = ({
  isOpen,
  onClose,
  initialIsFajr = false,
}) => {
  const [isFajr, setIsFajr] = useState(initialIsFajr);
  const [activeVerseId, setActiveVerseId] = useState<string | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const stopSequenceRef = useRef<(() => void) | null>(null);

  // Filter verses based on whether it is Fajr Adhan or Standard Adhan
  const currentVerses = ADHAN_VERSES.filter((v) => !v.isFajrOnly || isFajr);

  // Stop playback when modal closes or unmounts
  useEffect(() => {
    if (!isOpen) {
      if (stopSequenceRef.current) {
        stopSequenceRef.current();
        stopSequenceRef.current = null;
      }
      stopAdhan();
      setIsPlayingFull(false);
      setActiveVerseId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePlayFull = () => {
    playBezelClick();
    if (isPlayingFull) {
      if (stopSequenceRef.current) {
        stopSequenceRef.current();
        stopSequenceRef.current = null;
      }
      stopAdhan();
      setIsPlayingFull(false);
      setActiveVerseId(null);
    } else {
      setIsPlayingFull(true);
      const stopFn = startFullAdhanSequence(
        isFajr,
        (verse) => {
          setActiveVerseId(verse.id);
        },
        () => {
          setIsPlayingFull(false);
          setActiveVerseId(null);
        }
      );
      stopSequenceRef.current = stopFn;
    }
  };

  const handlePlaySingleVerse = (verse: AdhanVerse) => {
    playBezelClick();
    if (stopSequenceRef.current) {
      stopSequenceRef.current();
      stopSequenceRef.current = null;
    }
    stopAdhan();
    setIsPlayingFull(false);
    setActiveVerseId(verse.id);

    playVerseMelody(verse.id, () => {
      setActiveVerseId(null);
    });
  };

  const handleSwitchFajr = (fajr: boolean) => {
    playBezelClick();
    if (stopSequenceRef.current) {
      stopSequenceRef.current();
      stopSequenceRef.current = null;
    }
    stopAdhan();
    setIsPlayingFull(false);
    setActiveVerseId(null);
    setIsFajr(fajr);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090d14] border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* MODAL HEADER */}
        <div className="p-5 sm:px-8 border-b border-neutral-800 bg-gradient-to-r from-[#0d1420] via-[#090d14] to-[#0d1420] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                Authentic Islamic Call to Prayer (الأذان)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mt-0.5">
              The Adhan Verses & Sunnah Sequence
            </h3>
            <span className="text-xs text-neutral-400">
              Preserved in its complete, authentic canonical order with Sunnah responses and Dua
            </span>
          </div>

          <button
            onClick={() => {
              playBezelClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* CONTROLS BAR: MODE SWITCHER & MASTER PLAY/PAUSE */}
        <div className="px-5 sm:px-8 py-3 bg-[#0c111a] border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Adhan Mode Toggle (Standard vs Fajr) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
            <button
              onClick={() => handleSwitchFajr(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                !isFajr
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Standard Adhan (Dhuhr, Asr, Maghrib, Isha)
            </button>
            <button
              onClick={() => handleSwitchFajr(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                isFajr
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Fajr Adhan (with As-Salatu Khayrun Minan-Nawm)
            </button>
          </div>

          {/* Master Play/Stop Full Adhan */}
          <button
            onClick={handleTogglePlayFull}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
              isPlayingFull
                ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isPlayingFull ? (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Stop Adhan Recitation</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Recite Full Adhan in Sequence</span>
              </>
            )}
          </button>
        </div>

        {/* SCROLLABLE VERSES LIST */}
        <div className="flex-1 overflow-y-auto p-5 sm:px-8 space-y-4 scrollbar-thin">
          <div className="grid grid-cols-1 gap-3">
            {currentVerses.map((verse, idx) => {
              const isCurrent = activeVerseId === verse.id;

              return (
                <div
                  key={verse.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/50 scale-[1.01]'
                      : 'bg-neutral-900/50 hover:bg-neutral-900/80 border-neutral-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left: Verse sequence index, repetitions, and phonetic details */}
                    <div className="flex-1 space-y-1.5 order-2 sm:order-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono font-bold text-amber-300 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-neutral-300">
                          {verse.transliteration}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800/80 text-amber-200/90 font-mono border border-neutral-700">
                          Repeat {verse.repeatCount}x
                        </span>
                        {verse.isFajrOnly && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-500/30">
                            Fajr Exclusive
                          </span>
                        )}
                      </div>

                      {/* English Meaning */}
                      <p className="text-xs text-neutral-400 font-sans-clean pl-8">
                        "{verse.translation}"
                      </p>

                      {/* Sunnah Response */}
                      <div className="mt-2 pl-8 pt-2 border-t border-neutral-800/60 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="text-amber-400 font-semibold">Sunnah Response:</span>
                        <span className="text-emerald-300 font-arabic text-sm dir-rtl font-medium">
                          {verse.sunnahResponseAr}
                        </span>
                        <span className="text-neutral-400 text-[10px]">
                          ({verse.sunnahResponse})
                        </span>
                      </div>
                    </div>

                    {/* Right: Sacred Arabic Calligraphy & Play Single Verse Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 order-1 sm:order-2">
                      <span className="font-arabic text-xl sm:text-2xl text-amber-200 font-bold leading-none dir-rtl select-none">
                        {verse.arabic}
                      </span>

                      <button
                        onClick={() => handlePlaySingleVerse(verse)}
                        title="Listen to this verse"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-400 text-neutral-950 shadow-[0_0_12px_#f59e0b]'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700'
                        }`}
                      >
                        {isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-sm bg-neutral-950 animate-pulse" />
                        ) : (
                          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DUA AFTER ADHAN SECTION */}
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-amber-500/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">🤲</span>
                <h4 className="text-sm font-sans-clean font-bold text-white uppercase tracking-wider">
                  {DUA_AFTER_ADHAN.title}
                </h4>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                Sahih al-Bukhari 614
              </span>
            </div>

            {/* Arabic Dua */}
            <div className="text-right py-2">
              <p className="font-arabic text-lg sm:text-xl text-amber-200 font-semibold leading-relaxed dir-rtl select-none">
                {DUA_AFTER_ADHAN.arabic}
              </p>
            </div>

            {/* Transliteration */}
            <p className="text-xs text-neutral-300 font-medium italic">
              {DUA_AFTER_ADHAN.transliteration}
            </p>

            {/* English Translation */}
            <p className="text-xs text-neutral-400 font-sans-clean leading-relaxed">
              "{DUA_AFTER_ADHAN.translation}"
            </p>

            {/* Virtue Note */}
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
              <strong>Virtue:</strong> {DUA_AFTER_ADHAN.virtue}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:px-8 border-t border-neutral-800 bg-[#07090e] flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <span>Sunnah of the Prophet Muhammad ﷺ · Sahih Muslim & Bukhari</span>
          <button
            onClick={() => {
              playBezelClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
