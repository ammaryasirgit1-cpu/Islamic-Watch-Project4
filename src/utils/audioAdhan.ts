/**
 * Authentic Adhan (Azan) Recitation Engine & Audio Synthesizer
 * Contains exact canonical verses in proper Islamic sequence,
 * Sunnah responses, transliterations, translations, and acoustic synthesizer.
 */

export interface AdhanVerse {
  index: number;
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  repeatCount: number;
  sunnahResponse: string;
  sunnahResponseAr: string;
  isFajrOnly?: boolean;
  notes?: string;
}

/**
 * Authentic 8-part sequence of the Islamic Call to Prayer (الأذان)
 */
export const ADHAN_VERSES: AdhanVerse[] = [
  {
    index: 1,
    id: 'takbeer-1',
    arabic: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar, Allāhu Akbar',
    translation: 'Allah is the Greatest, Allah is the Greatest',
    repeatCount: 2, // Recited twice (making 4 Takbeers in total)
    sunnahResponse: 'Repeat: Allāhu Akbar, Allāhu Akbar',
    sunnahResponseAr: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ',
    notes: 'Opening declaration of the supreme greatness of Allah',
  },
  {
    index: 2,
    id: 'shahada-tawhid',
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ',
    transliteration: 'Ash-hadu an lā ilāha illallāh',
    translation: 'I bear witness that there is no deity worthy of worship except Allah',
    repeatCount: 2,
    sunnahResponse: 'Repeat: Ash-hadu an lā ilāha illallāh',
    sunnahResponseAr: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ',
    notes: 'Testimony of the Oneness of Allah (Tawheed)',
  },
  {
    index: 3,
    id: 'shahada-risalah',
    arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
    transliteration: 'Ash-hadu anna Muḥammadan Rasūlullāh',
    translation: 'I bear witness that Muhammad is the Messenger of Allah',
    repeatCount: 2,
    sunnahResponse: 'Repeat: Ash-hadu anna Muḥammadan Rasūlullāh',
    sunnahResponseAr: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
    notes: 'Testimony of the Prophethood of Muhammad ﷺ',
  },
  {
    index: 4,
    id: 'hayya-ala-salah',
    arabic: 'حَيَّ عَلَى الصَّلَاةِ',
    transliteration: 'Ḥayya ‘alaṣ-Ṣalāh',
    translation: 'Hasten to the prayer',
    repeatCount: 2,
    sunnahResponse: 'Say: Lā ḥawla wa lā quwwata illā billāh (There is no power nor might except with Allah)',
    sunnahResponseAr: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
    notes: 'Call to perform the obligatory worship',
  },
  {
    index: 5,
    id: 'hayya-ala-falah',
    arabic: 'حَيَّ عَلَى الْفَلَاحِ',
    transliteration: 'Ḥayya ‘alal-Falāḥ',
    translation: 'Hasten to success / salvation',
    repeatCount: 2,
    sunnahResponse: 'Say: Lā ḥawla wa lā quwwata illā billāh',
    sunnahResponseAr: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
    notes: 'Call to eternal success in this life and the Hereafter',
  },
  {
    index: 6,
    id: 'tathweeb-fajr',
    arabic: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ',
    transliteration: 'Aṣ-Ṣalātu khayrun minan-nawm',
    translation: 'Prayer is better than sleep',
    repeatCount: 2,
    sunnahResponse: 'Say: Ṣadaqta wa barirta (You have spoken the truth) or repeat the phrase',
    sunnahResponseAr: 'صَدَقْتَ وَبَرِرْتَ',
    isFajrOnly: true,
    notes: 'Specific to the Fajr (Dawn) prayer calling believers from their beds',
  },
  {
    index: 7,
    id: 'takbeer-final',
    arabic: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar, Allāhu Akbar',
    translation: 'Allah is the Greatest, Allah is the Greatest',
    repeatCount: 1,
    sunnahResponse: 'Repeat: Allāhu Akbar, Allāhu Akbar',
    sunnahResponseAr: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ',
    notes: 'Closing declaration of Allah\'s supreme grandeur',
  },
  {
    index: 8,
    id: 'kalimat-tawhid',
    arabic: 'لَا إِلٰهَ إِلَّا اللهُ',
    transliteration: 'Lā ilāha illallāh',
    translation: 'There is no deity worthy of worship except Allah',
    repeatCount: 1,
    sunnahResponse: 'Repeat: Lā ilāha illallāh',
    sunnahResponseAr: 'لَا إِلٰهَ إِلَّا اللهُ',
    notes: 'The ultimate seal and foundation of faith',
  },
];

/**
 * Authentic Dua Recited Immediately Following the Adhan
 * (Sunnah from Sahih al-Bukhari 614)
 */
export const DUA_AFTER_ADHAN = {
  title: 'Dua After Hearing the Adhan',
  arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
  transliteration: 'Allāhumma Rabba hādhihid-da‘watit-tāmma, waṣ-ṣalātil-qā’imah, āti Muḥammadanil-wasīlata wal-faḍīlah, wab‘ath-hu maqāman maḥmūdanil-ladhī wa‘adtah.',
  translation: 'O Allah, Lord of this perfect call and of the established prayer, grant Muhammad the highest rank of intercession and distinction, and raise him to the praiseworthy station which You have promised him.',
  virtue: 'The Prophet Muhammad ﷺ said: "Whoever says this upon hearing the Adhan, my intercession becomes guaranteed for him on the Day of Resurrection." (Sahih al-Bukhari)',
};

// Web Audio API Context
let audioCtx: AudioContext | null = null;
let currentPlaybackAbort: (() => void) | null = null;
let isPlaybackRunning = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Melodic notes and intervals for each verse in classical Maqam Bayati / Hijaz
 */
interface MelodicNote {
  freq: number;
  duration: number;
  isProlonged?: boolean;
}

const VERSE_MELODIES: Record<string, MelodicNote[]> = {
  // 1. Allahu Akbar, Allahu Akbar (Rising noble declaration)
  'takbeer-1': [
    { freq: 293.66, duration: 0.8 }, // D4: Al-
    { freq: 349.23, duration: 1.0 }, // F4: laahu
    { freq: 392.00, duration: 1.8, isProlonged: true }, // G4: Ak-
    { freq: 349.23, duration: 0.9 }, // F4: bar
    { freq: 293.66, duration: 0.9 }, // D4: Al-
    { freq: 440.00, duration: 1.2 }, // A4: laahu
    { freq: 392.00, duration: 2.2, isProlonged: true }, // G4: Akbar
  ],
  // 2. Ash-hadu an la ilaha illallah (Sober, reverent testimony)
  'shahada-tawhid': [
    { freq: 349.23, duration: 0.9 }, // Ash-
    { freq: 392.00, duration: 1.1 }, // hadu
    { freq: 440.00, duration: 1.0 }, // an laa
    { freq: 466.16, duration: 1.3 }, // i-laa-
    { freq: 440.00, duration: 1.0 }, // ha
    { freq: 392.00, duration: 1.2 }, // il-lal-
    { freq: 349.23, duration: 2.4, isProlonged: true }, // laah
  ],
  // 3. Ash-hadu anna Muhammadan Rasoolullah (Warm veneration)
  'shahada-risalah': [
    { freq: 349.23, duration: 0.9 }, // Ash-
    { freq: 392.00, duration: 1.0 }, // hadu
    { freq: 440.00, duration: 1.2 }, // an-na
    { freq: 392.00, duration: 1.1 }, // Mu-ham-
    { freq: 440.00, duration: 1.2 }, // ma-dan
    { freq: 466.16, duration: 1.3 }, // Ra-soo-
    { freq: 392.00, duration: 2.5, isProlonged: true }, // lul-laah
  ],
  // 4. Hayya 'ala-s-Salah (Elevating call to worship)
  'hayya-ala-salah': [
    { freq: 392.00, duration: 1.1 }, // Hay-
    { freq: 440.00, duration: 1.2 }, // ya
    { freq: 523.25, duration: 1.5, isProlonged: true }, // 'a-las-
    { freq: 466.16, duration: 1.2 }, // Sa-
    { freq: 392.00, duration: 2.6, isProlonged: true }, // laah
  ],
  // 5. Hayya 'ala-l-Falah (Soul-stirring call to true victory)
  'hayya-ala-falah': [
    { freq: 392.00, duration: 1.1 }, // Hay-
    { freq: 440.00, duration: 1.2 }, // ya
    { freq: 523.25, duration: 1.4 }, // 'a-lal-
    { freq: 466.16, duration: 1.4 }, // Fa-
    { freq: 349.23, duration: 2.8, isProlonged: true }, // laah
  ],
  // 6. As-Salatu khayrun minan-nawm (Gentle awakening for Fajr)
  'tathweeb-fajr': [
    { freq: 349.23, duration: 1.2 }, // As-Sa-
    { freq: 392.00, duration: 1.3 }, // laa-tu
    { freq: 440.00, duration: 1.4 }, // khay-
    { freq: 392.00, duration: 1.0 }, // rum-
    { freq: 349.23, duration: 1.2 }, // mi-nan-
    { freq: 293.66, duration: 2.6, isProlonged: true }, // nawm
  ],
  // 7. Allahu Akbar, Allahu Akbar (Resolute culmination)
  'takbeer-final': [
    { freq: 349.23, duration: 0.9 }, // Al-
    { freq: 392.00, duration: 1.2 }, // laahu
    { freq: 440.00, duration: 1.5 }, // Ak-bar
    { freq: 392.00, duration: 1.0 }, // Al-laahu
    { freq: 349.23, duration: 2.2, isProlonged: true }, // Akbar
  ],
  // 8. La ilaha illallah (Serene, peaceful resolution)
  'kalimat-tawhid': [
    { freq: 349.23, duration: 1.0 }, // Laa
    { freq: 392.00, duration: 1.2 }, // i-laa-ha
    { freq: 349.23, duration: 1.2 }, // il-lal-
    { freq: 293.66, duration: 3.2, isProlonged: true }, // laah
  ],
};

/**
 * Synthesizes a vocal chant note using warm multi-harmonic acoustic oscillators
 */
function playChantNote(
  ctx: AudioContext,
  note: MelodicNote,
  startTime: number
) {
  // 1. Fundamental tone
  const osc1 = ctx.createOscillator();
  // 2. Warm third harmonic for vocal resonance
  const osc2 = ctx.createOscillator();
  // 3. Subtle sub-octave for chest resonance
  const oscSub = ctx.createOscillator();

  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc2.type = 'triangle';
  oscSub.type = 'sine';

  osc1.frequency.setValueAtTime(note.freq, startTime);
  osc2.frequency.setValueAtTime(note.freq * 2, startTime);
  oscSub.frequency.setValueAtTime(note.freq * 0.5, startTime);

  // Gentle acoustic vibrato
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(4.8, startTime);
  lfoGain.gain.setValueAtTime(4.0, startTime);
  lfo.connect(osc1.frequency);
  lfo.start(startTime);
  lfo.stop(startTime + note.duration);

  // Natural vocal envelope (attack, sustain, gentle release)
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.26, startTime + 0.15);
  gain.gain.setValueAtTime(0.24, startTime + note.duration - 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration + 0.35);

  osc1.connect(gain);
  osc2.connect(gain);
  oscSub.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(startTime);
  osc2.start(startTime);
  oscSub.start(startTime);

  const stopTime = startTime + note.duration + 0.4;
  osc1.stop(stopTime);
  osc2.stop(stopTime);
  oscSub.stop(stopTime);
}

/**
 * Plays an individual Adhan verse by its ID
 */
export function playVerseMelody(
  verseId: string,
  onEnd?: () => void
): () => void {
  const ctx = getAudioContext();
  if (!ctx) {
    if (onEnd) onEnd();
    return () => {};
  }

  // Cancel any running playback
  if (currentPlaybackAbort) {
    currentPlaybackAbort();
  }

  let isAborted = false;
  const abortFn = () => {
    isAborted = true;
    isPlaybackRunning = false;
  };
  currentPlaybackAbort = abortFn;
  isPlaybackRunning = true;

  const notes = VERSE_MELODIES[verseId] || VERSE_MELODIES['takbeer-1'];
  let timeOffset = ctx.currentTime + 0.05;

  notes.forEach((note) => {
    if (isAborted) return;
    playChantNote(ctx, note, timeOffset);
    timeOffset += note.duration + 0.12;
  });

  const totalTimeMs = (timeOffset - ctx.currentTime) * 1000;
  const timer = setTimeout(() => {
    if (!isAborted) {
      isPlaybackRunning = false;
      if (onEnd) onEnd();
    }
  }, totalTimeMs);

  return () => {
    clearTimeout(timer);
    abortFn();
  };
}

/**
 * Starts full sequential Adhan recitation through all authentic verses
 */
export function startFullAdhanSequence(
  isFajr: boolean = false,
  onVerseChange?: (verse: AdhanVerse, currentVerseIdx: number) => void,
  onComplete?: () => void
): () => void {
  const versesToPlay = ADHAN_VERSES.filter((v) => !v.isFajrOnly || isFajr);
  let currentIndex = 0;
  let isCancelled = false;
  let activeVerseCanceller: (() => void) | null = null;

  const stopSequence = () => {
    isCancelled = true;
    isPlaybackRunning = false;
    if (activeVerseCanceller) {
      activeVerseCanceller();
    }
  };

  const playNext = () => {
    if (isCancelled || currentIndex >= versesToPlay.length) {
      isPlaybackRunning = false;
      if (!isCancelled && onComplete) onComplete();
      return;
    }

    const currentVerse = versesToPlay[currentIndex];
    if (onVerseChange) {
      onVerseChange(currentVerse, currentIndex);
    }

    // Play melody of the current verse
    activeVerseCanceller = playVerseMelody(currentVerse.id, () => {
      if (isCancelled) return;
      // Reverent pause between verses as practiced in traditional Adhan
      const pauseDuration = 1400;
      setTimeout(() => {
        if (!isCancelled) {
          currentIndex++;
          playNext();
        }
      }, pauseDuration);
    });
  };

  playNext();
  return stopSequence;
}

export function stopAdhan(): void {
  if (currentPlaybackAbort) {
    currentPlaybackAbort();
    currentPlaybackAbort = null;
  }
  isPlaybackRunning = false;
}

export function isAdhanPlaying(): boolean {
  return isPlaybackRunning;
}

/**
 * Tactile mechanical watch bezel click
 */
export function playBezelClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.025);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}

/**
 * Tasbih bead counter click
 */
export function playTasbihTap() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * Pure celestial chime
 */
export function playPrayerChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);

    gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.15);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + index * 0.15 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + index * 0.15);
    osc.stop(ctx.currentTime + index * 0.15 + 1.3);
  });
}
