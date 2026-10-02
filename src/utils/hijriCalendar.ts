import { IslamicEvent } from '../types/watch';

export interface HijriMonthData {
  index: number; // 1-12
  nameEn: string;
  nameAr: string;
  gregorianStart: string; // e.g. "24 Aug 2025"
  daysCount: number; // 29 or 30
  isSacred?: boolean;
  highlightNote?: string;
  isRamadan?: boolean;
}

export const ISLAMIC_MONTHS_1447: HijriMonthData[] = [
  { index: 1, nameEn: 'Muharram', nameAr: 'المحرم', gregorianStart: '27 Jun 2025', daysCount: 30, isSacred: true, highlightNote: 'Islamic New Year & Ashura' },
  { index: 2, nameEn: 'Safar', nameAr: 'صفر', gregorianStart: '26 Jul 2025', daysCount: 29 },
  { index: 3, nameEn: 'Rabi al-Awwal', nameAr: 'ربيع الأول', gregorianStart: '24 Aug 2025', daysCount: 30, highlightNote: 'Mawlid an-Nabi' },
  { index: 4, nameEn: 'Rabi al-Thani', nameAr: 'ربيع الآخر', gregorianStart: '23 Sep 2025', daysCount: 29 },
  { index: 5, nameEn: 'Jumada al-Awwal', nameAr: 'جمادى الأولى', gregorianStart: '22 Oct 2025', daysCount: 30 },
  { index: 6, nameEn: 'Jumada al-Thani', nameAr: 'جمادى الآخرة', gregorianStart: '21 Nov 2025', daysCount: 29 },
  { index: 7, nameEn: 'Rajab', nameAr: 'رجب', gregorianStart: '21 Dec 2025', daysCount: 30, isSacred: true, highlightNote: 'Isra & Mi\'raj' },
  { index: 8, nameEn: 'Sha\'ban', nameAr: 'شعبان', gregorianStart: '20 Jan 2026', daysCount: 29, highlightNote: 'Nisf Sha\'ban' },
  { index: 9, nameEn: 'Ramadan', nameAr: 'رمضان', gregorianStart: '19 Feb 2026', daysCount: 30, isRamadan: true, highlightNote: 'Holy Fasting & Laylat al-Qadr' },
  { index: 10, nameEn: 'Shawwal (Eid al-Fitr)', nameAr: 'شوال', gregorianStart: '20 Mar 2026', daysCount: 29, highlightNote: 'Eid al-Fitr' },
  { index: 11, nameEn: 'Dhul-Qa\'dah', nameAr: 'ذو القعدة', gregorianStart: '18 Apr 2026', daysCount: 30, isSacred: true },
  { index: 12, nameEn: 'Dhul-Hijjah (Eid al-Adha)', nameAr: 'ذو الحجة', gregorianStart: '18 May 2026', daysCount: 30, isSacred: true, highlightNote: 'Hajj & Eid al-Adha' },
];

export const UPCOMING_EVENTS: IslamicEvent[] = [
  {
    id: 'new-year',
    title: 'Islamic New Year (1 Muharram)',
    hijriDateStr: '1 Muharram 1448 هـ',
    daysRemaining: 120,
    description: 'First day of the Islamic lunar calendar year, marking the Prophet\'s migration (Hijrah) to Madinah.',
    icon: 'star',
    category: 'holiday',
  },
  {
    id: 'mawlid',
    title: 'Mawlid (12 Rabi al-Awwal)',
    hijriDateStr: '12 Rabi al-Awwal 1447 هـ',
    daysRemaining: 11,
    description: 'Commemoration of the birth of the Prophet Muhammad ﷺ.',
    icon: 'lantern',
    category: 'historical',
  },
  {
    id: 'ayyam-al-beed',
    title: 'Ayyam al-Beed (13–15 Rabi al-Awwal)',
    hijriDateStr: '13–15 Rabi al-Awwal 1447 هـ',
    daysRemaining: 12,
    description: 'The White Days of the lunar month when the moon is brightest; fasting is highly recommended (Sunnah Mu\'akkadah).',
    icon: 'moon',
    category: 'fasting',
  },
  {
    id: 'next-monday',
    title: 'Next Monday (Fasting)',
    hijriDateStr: '6 Rabi al-Awwal 1447 هـ',
    daysRemaining: 5,
    description: 'Sunnah fasting on Mondays, following the practice of Prophet Muhammad ﷺ.',
    icon: 'calendar',
    category: 'fasting',
  },
  {
    id: 'next-thursday',
    title: 'Next Thursday (Fasting)',
    hijriDateStr: '9 Rabi al-Awwal 1447 هـ',
    daysRemaining: 8,
    description: 'Sunnah fasting on Thursdays when deeds are presented before Allah.',
    icon: 'calendar',
    category: 'fasting',
  },
  {
    id: 'ramadan-start',
    title: '1st Ramadan 1447 هـ',
    hijriDateStr: '1 Ramadan 1447 هـ',
    daysRemaining: 172,
    description: 'The blessed month of daily fasting, reflection, charity, and Quran recitation.',
    icon: 'crescent',
    category: 'holiday',
  },
  {
    id: 'eid-fitr',
    title: 'Eid al-Fitr (1 Shawwal)',
    hijriDateStr: '1 Shawwal 1447 هـ',
    daysRemaining: 202,
    description: 'Festival marking the conclusion of the holy month of Ramadan.',
    icon: 'gift',
    category: 'holiday',
  },
  {
    id: 'eid-adha',
    title: 'Eid al-Adha (10 Dhul-Hijjah)',
    hijriDateStr: '10 Dhul-Hijjah 1447 هـ',
    daysRemaining: 271,
    description: 'Festival of the Sacrifice celebrating the devotion of Ibrahim (AS).',
    icon: 'star',
    category: 'holiday',
  },
];

export interface MonthGridDay {
  dayNumber: number;
  weekdayName: string; // 'Sat', 'Sun', etc.
  weekdayIndex: number; // 0=Sat, 1=Sun, ..., 6=Fri
  isToday: boolean;
  isFastingDay: boolean; // Mon or Thu
  isAyyamAlBeed: boolean; // 13, 14, 15
  isIslamicEvent: boolean;
  eventTitle?: string;
}

/**
 * Builds the month calendar grid for a given Hijri month
 * Defaults to Rabi al-Awwal 1447 as shown in design reference
 */
export function getHijriMonthGrid(monthIndex: number = 2, selectedDayNumber: number = 1): MonthGridDay[] {
  // Days of week starting from Saturday (standard Islamic calendar display: Sat, Sun, Mon, Tue, Wed, Thu, Fri)
  const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  // Rabi al-Awwal 1447 starts on Sunday (weekdayIndex = 1) in reference
  const startWeekday = 1; // Sun
  const totalDays = 30;

  const days: MonthGridDay[] = [];

  for (let d = 1; d <= totalDays; d++) {
    const weekdayIdx = (startWeekday + d - 1) % 7;
    const weekday = weekdays[weekdayIdx];
    
    // Mon = 2, Thu = 5 (since Sat=0, Sun=1, Mon=2, Tue=3, Wed=4, Thu=5, Fri=6)
    const isMonOrThu = weekdayIdx === 2 || weekdayIdx === 5;
    const isAyyam = d === 13 || d === 14 || d === 15;
    const isEvent = d === 12; // 12 Rabi al-Awwal (Mawlid)
    
    days.push({
      dayNumber: d,
      weekdayName: weekday,
      weekdayIndex: weekdayIdx,
      isToday: d === selectedDayNumber,
      isFastingDay: isMonOrThu,
      isAyyamAlBeed: isAyyam,
      isIslamicEvent: isEvent,
      eventTitle: isEvent ? 'Mawlid an-Nabi ﷺ' : isAyyam ? 'Ayyam al-Beed' : isMonOrThu ? 'Sunnah Fast' : undefined,
    });
  }

  return days;
}
