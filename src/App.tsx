import React, { useState, useEffect } from 'react';
import { ScreenId, CaseMaterial, StrapStyle, CityLocation } from './types/watch';
import { DEFAULT_CITIES, getPrayerTimes, getNextPrayerInfo } from './utils/prayerTimes';
import { SmartwatchFrame } from './components/SmartwatchFrame';
import { GalleryView, SCREEN_METAS } from './components/GalleryView';
import { CompanionDashboard } from './components/CompanionDashboard';
import { AdhanRecitationModal } from './components/AdhanRecitationModal';
import { playBezelClick } from './utils/audioAdhan';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [viewMode, setViewMode] = useState<'gallery' | 'simulator' | 'specs'>('gallery');
  const [caseMaterial, setCaseMaterial] = useState<CaseMaterial>('titanium-black');
  const [strapStyle, setStrapStyle] = useState<StrapStyle>('black-leather');
  const [isAod, setIsAod] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityLocation>(DEFAULT_CITIES[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Authentic Adhan Recitation Modal State
  const [isAdhanModalOpen, setIsAdhanModalOpen] = useState(false);
  const [isAdhanModalFajr, setIsAdhanModalFajr] = useState(false);

  // Live real-time clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayers = getPrayerTimes(currentTime, currentCity);
  const nextInfo = getNextPrayerInfo(currentTime, prayers);

  const handleOpenAdhanModal = (isFajr: boolean = false) => {
    playBezelClick();
    setIsAdhanModalFajr(isFajr);
    setIsAdhanModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 flex flex-col font-sans-clean antialiased selection:bg-amber-500/20 selection:text-amber-200">
      {/* TOP NAVIGATION BAR (Strict 3-zone contract) */}
      <header className="h-16 px-6 sm:px-10 border-b border-neutral-800/80 bg-[#07090e]/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a href="/" className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wider text-amber-200 hover:text-amber-100 transition-colors">
            NOOR CELESTIAL
          </a>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Islamic Smartwatch OS
          </span>
        </div>

        {/* Zone 2: Navigation Links / Segmented View Controls */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800">
          <button
            onClick={() => {
              playBezelClick();
              setViewMode('gallery');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'gallery'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            8-Screen Gallery
          </button>
          <button
            onClick={() => {
              playBezelClick();
              setViewMode('simulator');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'simulator'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Interactive Watch Simulator
          </button>
          <button
            onClick={() => {
              playBezelClick();
              setViewMode('specs');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'specs'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Design Architecture
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Authentic Azan Verses & Recitation) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenAdhanModal(false)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-200 bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span>Azan Verses (الأذان)</span>
          </button>
        </div>
      </header>

      {/* MOBILE SEGMENTED CONTROL */}
      <div className="md:hidden flex items-center justify-center p-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1 p-0.5 bg-neutral-950 rounded-lg">
          <button
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${viewMode === 'gallery' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'}`}
          >
            8 Screens
          </button>
          <button
            onClick={() => setViewMode('simulator')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${viewMode === 'simulator' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'}`}
          >
            Interactive
          </button>
          <button
            onClick={() => setViewMode('specs')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${viewMode === 'specs' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'}`}
          >
            Specs
          </button>
        </div>
      </div>

      {/* SUB-HEADER STATUS BAR */}
      <div className="w-full bg-[#0a0d14] border-b border-neutral-800/60 px-6 sm:px-10 py-2.5 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span>Location:</span>
          <strong className="text-white font-medium">{currentCity.name}, {currentCity.country}</strong>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Hijri:</span>
          <strong className="text-amber-300 font-arabic text-[13px]">١ ربيع الأول ١٤٤٧ هـ</strong>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400">Next Prayer:</span>
            <span className="text-emerald-400 font-bold uppercase">{nextInfo.nextPrayer.name}</span>
            <span className="font-mono text-white font-semibold">({nextInfo.remainingFormatted})</span>
          </div>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <div className="font-mono tabular-nums text-neutral-300">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* VIEW 1: 8-SCREEN GALLERY (Direct reproduction of the user's reference image) */}
        {viewMode === 'gallery' && (
          <div className="space-y-10">
            {/* Editorial Intro Banner */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Islamic Smartwatch OS · Complete Design Suite
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
                  8-Screen Watch Face System
                </h1>
                <p className="text-neutral-400 text-sm max-w-2xl mt-1.5">
                  Astronomical solar trajectory arcs, digital horology, antique brass astrolabe, dedicated Ramadan fasting mode, interactive Hijri calendar, and Sunnah event countdowns.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('simulator')}
                  className="px-4 py-2 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all font-sans-clean font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
                >
                  Open Interactive Watch Simulator
                </button>
              </div>
            </div>

            {/* 4x2 Grid Matching User's Image */}
            <GalleryView
              time={currentTime}
              prayers={prayers}
              caseMaterial={caseMaterial}
              strapStyle={strapStyle}
              activeScreen={currentScreen}
              onSelectScreen={(s) => {
                setCurrentScreen(s);
                setViewMode('simulator');
              }}
            />

            {/* Footnote matching image caption style */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <strong className="text-neutral-200">Interactive Preview:</strong> Click any watch face above to launch the full-screen interactive simulator with tactile rotating bezel, crown controls, and Adhan audio.
              </div>
              <button
                onClick={() => setViewMode('simulator')}
                className="text-amber-300 hover:text-amber-200 font-medium underline shrink-0 cursor-pointer"
              >
                Launch Simulator →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE WATCH SIMULATOR */}
        {viewMode === 'simulator' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Live Interactive Wear OS Simulator
                </span>
                <h2 className="text-xl sm:text-3xl font-serif-luxury font-bold text-white mt-0.5">
                  {SCREEN_METAS.find((m) => m.id === currentScreen)?.title}
                </h2>
                <span className="text-neutral-400 text-xs">
                  {SCREEN_METAS.find((m) => m.id === currentScreen)?.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('gallery')}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
                >
                  ← Back to 8-Screen Grid
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Interactive Hardware Watch Container */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0e131d]/60 to-[#070a10]/60 rounded-3xl border border-neutral-800/80 shadow-2xl relative overflow-hidden min-h-[580px]">
                {/* Background Ambient Glow */}
                <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                {/* Instructions Hint */}
                <div className="w-full flex items-center justify-between text-[11px] text-neutral-400 mb-6 z-10 px-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Rotate bezel or tap side buttons
                  </span>
                  <span>Screen {currentScreen} of 8</span>
                </div>

                {/* The Smartwatch Frame */}
                <div className="my-6">
                  <SmartwatchFrame
                    currentScreen={currentScreen}
                    onScreenChange={setCurrentScreen}
                    time={currentTime}
                    prayers={prayers}
                    caseMaterial={caseMaterial}
                    strapStyle={strapStyle}
                    isAod={isAod}
                    scale={1.05}
                    showStraps={true}
                    onSelectCalendarDate={() => setCurrentScreen(8)}
                    onSelectCalendarMonth={() => setCurrentScreen(6)}
                    onOpenAdhanRecitation={handleOpenAdhanModal}
                  />
                </div>

                {/* Quick Screen Pill Bar */}
                <div className="flex items-center gap-1.5 mt-8 z-10 flex-wrap justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        playBezelClick();
                        setCurrentScreen(num as ScreenId);
                      }}
                      className={`w-7 h-7 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentScreen === num
                          ? 'bg-amber-400 text-neutral-950 shadow-[0_0_10px_#f59e0b] scale-110'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Companion Dashboard & Customizer */}
              <div className="lg:col-span-6 space-y-6">
                <CompanionDashboard
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                  caseMaterial={caseMaterial}
                  onChangeCase={setCaseMaterial}
                  strapStyle={strapStyle}
                  onChangeStrap={setStrapStyle}
                  isAod={isAod}
                  onToggleAod={() => setIsAod(!isAod)}
                  currentCity={currentCity}
                  onChangeCity={setCurrentCity}
                  onOpenAdhanModal={handleOpenAdhanModal}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: DESIGN SPECIFICATIONS & ARCHITECTURE */}
        {viewMode === 'specs' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-neutral-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Design System & Engineering Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mt-1">
                Islamic Horology & Astronomical Math
              </h2>
              <p className="text-neutral-400 text-sm max-w-3xl mt-1.5">
                Detailed design principles, solar angle geometry, lunar Hijri calendar synchronizer, and visual specifications corresponding to the 8 watch displays.
              </p>
            </div>

            {/* Generated Studio Render Asset Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60">
              <img
                src="/src/assets/images/smartwatch_hero_showcase_1790956017740.jpg"
                alt="Noor Celestial Smartwatch Horology Showcase"
                className="w-full h-80 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Horological Excellence
                  </span>
                  <h3 className="text-xl font-serif-luxury font-bold text-white">
                    Circular AMOLED Display with Mechanical Astrolabe Aesthetics
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-2xl mt-1">
                    Combining traditional Arabic astronomical quadrant calculations with modern Wear OS rotary ergonomics, tactile haptics, and instant prayer alerts.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Screen Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SCREEN_METAS.map((screen) => (
                <div key={screen.id} className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                        Screen 0{screen.id}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {screen.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-sans-clean font-bold text-white">
                      {screen.title}
                    </h4>
                    <span className="text-xs font-medium text-amber-200/80">
                      {screen.subtitle}
                    </span>

                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {screen.id === 1 && 'Equipped with a 180-degree celestial solar arc showing the sun\'s passage across Fajr, Sunrise, Dhuhr (solar apex), Asr, Sunset, Maghrib, and Isha. Complemented with dual golden analog hands and an illuminated lunar phase disc.'}
                      {screen.id === 2 && 'Optimized for glanceability with an ultra-bold digital time readout, Arabic Hijri date, perimeter prayer position indicators, and an interactive emerald widget highlighting the next prayer countdown.'}
                      {screen.id === 3 && 'Inspired by antique brass Islamic astrolabes, featuring the sacred calligraphy of Allah (الله) inside an ornamental medallion, astrolabe coordinate graduation arcs, and a golden minaret skyline.'}
                      {screen.id === 4 && 'Designed for the holy month of Ramadan. Highlights Suhoor, Iftar (Maghrib), and Taraweeh milestones against an emerald nocturnal sky with crescent moon and serene mosque silhouette.'}
                      {screen.id === 5 && 'Full daily prayer timetable with active prayer glow highlights, remaining countdowns, and instant synthesized Adhan previews with acoustic harmonic resonance.'}
                      {screen.id === 6 && 'Complete 30-day Hijri lunar grid tracking Sunnah fasting days (Mondays & Thursdays), Ayyam al-Beed (13, 14, 15 White Days), and major Islamic calendar events with previous/next month navigation.'}
                      {screen.id === 7 && 'Yearly overview of all 12 Islamic lunar months (Muharram through Dhul-Hijjah) with Gregorian date cross-referencing, sacred month badges, and direct jump to any month.'}
                      {screen.id === 8 && 'Daily spiritual insights and event countdowns, including Islamic New Year, Mawlid an-Nabi, upcoming Sunnah fasting days, and Sunnah intention reminders.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setCurrentScreen(screen.id);
                        setViewMode('simulator');
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 font-medium cursor-pointer"
                    >
                      View in Simulator →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FULL AUTHENTIC ADHAN RECITATION MODAL */}
      <AdhanRecitationModal
        isOpen={isAdhanModalOpen}
        onClose={() => setIsAdhanModalOpen(false)}
        initialIsFajr={isAdhanModalFajr}
      />

      {/* FOOTER */}
      <footer className="mt-auto border-t border-neutral-800/80 bg-neutral-950 py-6 px-6 sm:px-10 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif-luxury font-bold text-neutral-300">NOOR CELESTIAL</span>
          <span aria-hidden="true">·</span>
          <span>Islamic Smartwatch OS & Watch Faces</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <span>Authentic Adhan Verses & Sunnah Responses</span>
          <span aria-hidden="true">·</span>
          <span>Umm al-Qura Astronomical Standards</span>
        </div>
      </footer>
    </div>
  );
}
