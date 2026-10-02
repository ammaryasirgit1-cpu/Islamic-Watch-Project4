import React, { useState } from 'react';
import { ScreenId, CaseMaterial, StrapStyle, CityLocation } from '../types/watch';
import { DEFAULT_CITIES } from '../utils/prayerTimes';
import { QiblaCompass } from './QiblaCompass';
import { TasbihCounter } from './TasbihCounter';
import {
  ADHAN_VERSES,
  DUA_AFTER_ADHAN,
  playVerseMelody,
  startFullAdhanSequence,
  stopAdhan,
  playPrayerChime,
  playBezelClick,
  isAdhanPlaying,
} from '../utils/audioAdhan';
import { SCREEN_METAS } from './GalleryView';

interface CompanionDashboardProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  caseMaterial: CaseMaterial;
  onChangeCase: (c: CaseMaterial) => void;
  strapStyle: StrapStyle;
  onChangeStrap: (s: StrapStyle) => void;
  isAod: boolean;
  onToggleAod: () => void;
  currentCity: CityLocation;
  onChangeCity: (c: CityLocation) => void;
  onOpenAdhanModal: (isFajr: boolean) => void;
}

export const CompanionDashboard: React.FC<CompanionDashboardProps> = ({
  currentScreen,
  onScreenChange,
  caseMaterial,
  onChangeCase,
  strapStyle,
  onChangeStrap,
  isAod,
  onToggleAod,
  currentCity,
  onChangeCity,
  onOpenAdhanModal,
}) => {
  const [activeTab, setActiveTab] = useState<'watch' | 'adhan' | 'location' | 'qibla' | 'tasbih' | 'specs'>('watch');
  const [isPlayingAdhanInTab, setIsPlayingAdhanInTab] = useState(false);
  const [activeVerseId, setActiveVerseId] = useState<string | null>(null);
  const [tabAdhanIsFajr, setTabAdhanIsFajr] = useState(false);

  const handleToggleTabAdhan = () => {
    playBezelClick();
    if (isPlayingAdhanInTab) {
      stopAdhan();
      setIsPlayingAdhanInTab(false);
      setActiveVerseId(null);
    } else {
      setIsPlayingAdhanInTab(true);
      playPrayerChime();
      startFullAdhanSequence(
        tabAdhanIsFajr,
        (verse) => {
          setActiveVerseId(verse.id);
        },
        () => {
          setIsPlayingAdhanInTab(false);
          setActiveVerseId(null);
        }
      );
    }
  };

  const handlePlaySingleVerseInTab = (verseId: string) => {
    playBezelClick();
    stopAdhan();
    setIsPlayingAdhanInTab(false);
    setActiveVerseId(verseId);
    playVerseMelody(verseId, () => {
      setActiveVerseId(null);
    });
  };

  const currentTabVerses = ADHAN_VERSES.filter((v) => !v.isFajrOnly || tabAdhanIsFajr);

  return (
    <div className="w-full flex flex-col bg-neutral-900/40 rounded-2xl border border-neutral-800/80 p-5">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-neutral-800 scrollbar-none">
        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('watch');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'watch'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Watch Customizer
        </button>

        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('adhan');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'adhan'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <span>Azan Verses (الأذان)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </button>

        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('location');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'location'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          City & Prayers
        </button>

        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('qibla');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'qibla'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Qibla Compass
        </button>

        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('tasbih');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'tasbih'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Digital Tasbih
        </button>

        <button
          onClick={() => {
            playBezelClick();
            setActiveTab('specs');
          }}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-sans-clean font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'specs'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'bg-neutral-800/50 text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Design Specs
        </button>
      </div>

      {/* Tab 1: Watch Customizer & Screen Switcher */}
      {activeTab === 'watch' && (
        <div className="space-y-5">
          {/* Quick Screen Selector */}
          <div>
            <label className="block text-[11px] font-sans-clean font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Active Watch Face Screen (1 to 8)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCREEN_METAS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playBezelClick();
                    onScreenChange(m.id);
                  }}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    currentScreen === m.id
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="block text-[11px] font-bold truncate">{m.title}</span>
                  <span className="block text-[9.5px] text-neutral-400 truncate">{m.subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Watch Case Finishes */}
          <div>
            <label className="block text-[11px] font-sans-clean font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Watch Case Finish
            </label>
            <div className="flex gap-2">
              {[
                { id: 'titanium-black', label: 'Titanium Black', color: 'bg-neutral-900 border-neutral-700' },
                { id: 'brushed-silver', label: 'Brushed Silver', color: 'bg-slate-400 border-slate-300' },
                { id: 'rose-gold', label: 'Rose Gold', color: 'bg-[#d99b70] border-[#ffd6b0]' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    playBezelClick();
                    onChangeCase(c.id as CaseMaterial);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-sans-clean font-medium transition-all cursor-pointer ${
                    caseMaterial === c.id
                      ? 'bg-amber-500/20 text-white border-amber-400'
                      : 'bg-neutral-900/70 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.color} border`} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Strap Styles */}
          <div>
            <label className="block text-[11px] font-sans-clean font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Strap Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'black-leather', label: 'Black Italian Leather' },
                { id: 'brown-leather', label: 'Brown Saddle Leather' },
                { id: 'steel-mesh', label: 'Milanese Steel Mesh' },
                { id: 'sport-silicone', label: 'Sport Midnight Silicone' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playBezelClick();
                    onChangeStrap(s.id as StrapStyle);
                  }}
                  className={`p-2 rounded-xl text-left border text-[11px] font-sans-clean transition-all cursor-pointer ${
                    strapStyle === s.id
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                      : 'bg-neutral-900/70 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Always-On Display (AOD) & Audio Quick Launch */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playBezelClick();
                  onToggleAod();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-sans-clean font-medium transition-all cursor-pointer ${
                  isAod
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                }`}
              >
                <span>{isAod ? 'Disable AOD Mode' : 'Enable Ambient AOD (OLED)'}</span>
              </button>
              <span className="text-[10px] text-neutral-400">
                Low-power nocturnal ambient display
              </span>
            </div>

            <button
              onClick={() => onOpenAdhanModal(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-[11px] font-sans-clean text-emerald-200 font-medium transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>View Full Authentic Azan (الأذان)</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Azan Verses & Recitation (Authentic Sequence) */}
      {activeTab === 'adhan' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                  The Canonical Call to Prayer (الأذان)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Sunnah Sequence
                </span>
              </div>
              <h4 className="text-sm font-sans-clean font-bold text-white mt-0.5">
                Exact Verses in Proper Islamic Order
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTabAdhanIsFajr(!tabAdhanIsFajr)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  tabAdhanIsFajr
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                }`}
              >
                {tabAdhanIsFajr ? 'Fajr Mode (Includes As-Salatu Khayrun Minan-Nawm)' : 'Standard 5-Prayer Mode'}
              </button>

              <button
                onClick={handleToggleTabAdhan}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isPlayingAdhanInTab
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-sm'
                }`}
              >
                {isPlayingAdhanInTab ? 'Stop Adhan' : 'Recite All Verses'}
              </button>
            </div>
          </div>

          {/* Verses Table */}
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {currentTabVerses.map((verse, idx) => {
              const isCurrent = activeVerseId === verse.id;

              return (
                <div
                  key={verse.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-200">
                            {verse.transliteration}
                          </span>
                          <span className="text-[10px] text-amber-300/80 font-mono">
                            ({verse.repeatCount}x)
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400 block">
                          {verse.translation}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-arabic text-lg sm:text-xl text-amber-200 font-bold dir-rtl select-none">
                        {verse.arabic}
                      </span>

                      <button
                        onClick={() => handlePlaySingleVerseInTab(verse.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                        }`}
                      >
                        <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Sunnah Response */}
                  <div className="mt-2 pt-1.5 border-t border-neutral-800/60 flex items-center justify-between text-[10px]">
                    <span className="text-neutral-400">
                      Worshipper Response: <strong className="text-emerald-300 font-arabic text-xs">{verse.sunnahResponseAr}</strong> ({verse.sunnahResponse})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dua after Adhan preview */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">
                {DUA_AFTER_ADHAN.title}
              </span>
              <p className="font-arabic text-sm text-neutral-300 dir-rtl mt-0.5 select-none">
                {DUA_AFTER_ADHAN.arabic}
              </p>
            </div>
            <button
              onClick={() => onOpenAdhanModal(tabAdhanIsFajr)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-medium border border-amber-500/40 shrink-0 cursor-pointer"
            >
              Open Full Modal →
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: City Selector & Calculation Methods */}
      {activeTab === 'location' && (
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-sans-clean font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Select Global City (Recalculates astronomical solar angles & Qibla)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DEFAULT_CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    playBezelClick();
                    onChangeCity(c);
                  }}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    currentCity.name === c.name
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="block text-[11px] font-bold text-white">{c.name}</span>
                  <span className="block text-[9.5px] text-neutral-400">{c.country}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
            <h5 className="text-[12px] font-sans-clean font-semibold text-white mb-1">
              Active Calculation Method: {currentCity.calculationMethod}
            </h5>
            <p className="text-[11px] font-sans-clean text-neutral-400 leading-relaxed">
              Coordinates: {currentCity.latitude.toFixed(4)}° N, {currentCity.longitude.toFixed(4)}° E.
              Prayer calculation employs solar altitude angles (Fajr 18.5°, Isha 90m / 18°) aligned with Umm al-Qura and MWL horological standards.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Qibla Compass */}
      {activeTab === 'qibla' && <QiblaCompass currentCity={currentCity} />}

      {/* Tab 5: Digital Tasbih */}
      {activeTab === 'tasbih' && <TasbihCounter />}

      {/* Tab 6: Design Reference & Specs */}
      {activeTab === 'specs' && (
        <div className="space-y-4 text-neutral-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">1. Astronomical Sun Arc</span>
              <p className="text-[11px] text-neutral-400 mt-1">
                Semi-circular 180° radiant gradient mapping daylight from dawn (Fajr 05:03) to solar noon (Dhuhr 12:18 apex) to twilight dusk (Maghrib 18:11 & Isha 19:29).
              </p>
            </div>

            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">2. Ramadan Fasting Mode</span>
              <p className="text-[11px] text-neutral-400 mt-1">
                Dedicated emerald horology dial highlighting Suhoor (04:41), Iftar (18:11), and Taraweeh (20:00) with glowing crescent moon and mosque illumination.
              </p>
            </div>

            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">3. Traditional Astrolabe</span>
              <p className="text-[11px] text-neutral-400 mt-1">
                Antique brass celestial quadrant dials with gold calligraphy medallion of <strong>الله</strong> and illuminated minaret skyline silhouette.
              </p>
            </div>
          </div>

          <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
            <h5 className="text-[12px] font-bold text-white mb-1">
              8 Screen System Architecture (Matching Reference Image)
            </h5>
            <ol className="list-decimal list-inside text-[11px] text-neutral-400 space-y-1">
              <li><strong>Main Watch Face:</strong> Clean analog dials with top celestial sun arc & moon phase.</li>
              <li><strong>Information Rich:</strong> Prominent digital clock, next prayer countdown widget pill.</li>
              <li><strong>Traditional Style:</strong> Antique brass astrolabe plate & golden mosque skyline.</li>
              <li><strong>Ramadan Mode:</strong> Emerald dial dedicated to Suhoor, Iftar, and Taraweeh.</li>
              <li><strong>Prayer Times Screen:</strong> Full daily schedule with authentic Adhan audio previews and verses.</li>
              <li><strong>Islamic Calendar (Month):</strong> 30-day Hijri grid tracking Sunnah fasts & Ayyam al-Beed.</li>
              <li><strong>Islamic Year View:</strong> 12 Hijri months with Gregorian transitions and sacred highlights.</li>
              <li><strong>Date Details & Events:</strong> Live countdowns to Mawlid, New Year, and upcoming fasts.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
