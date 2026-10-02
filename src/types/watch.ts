/**
 * Types for the Noor Celestial Islamic Smartwatch OS
 */

export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ScreenMeta {
  id: ScreenId;
  title: string;
  subtitle: string;
  category: 'watchface' | 'prayer' | 'calendar' | 'events';
}

export interface PrayerTimeItem {
  id: 'suhoor' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'sunset' | 'maghrib' | 'isha' | 'taraweeh';
  name: string;
  arabicName: string;
  time: string; // "05:03"
  angle: number; // 0-360 degrees on 24h dial
  isCurrent?: boolean;
  isNext?: boolean;
  type?: 'prayer' | 'sun' | 'fasting';
}

export interface CityLocation {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  calculationMethod: string;
}

export interface CalculationMethod {
  id: string;
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  note?: string;
}

export interface HijriDateInfo {
  day: number;
  monthIndex: number; // 0-11
  monthNameEn: string;
  monthNameAr: string;
  year: number;
  gregorianDateStr: string;
  isAyyamAlBeed: boolean;
  isMondayOrThursday: boolean;
  specialEvent?: string;
}

export interface IslamicEvent {
  id: string;
  title: string;
  hijriDateStr: string;
  daysRemaining: number;
  description: string;
  icon: string;
  category: 'holiday' | 'fasting' | 'historical';
}

export type CaseMaterial = 'titanium-black' | 'brushed-silver' | 'rose-gold';
export type StrapStyle = 'black-leather' | 'steel-mesh' | 'sport-silicone' | 'brown-leather';
