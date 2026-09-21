import { WmoCodeInfo, ActivityInsight, TemperatureUnit } from '../types';

/**
 * WMO Weather interpretation codes (WW)
 * Reference: https://open-meteo.com/en/docs
 */
export const WMO_CODES: Record<number, WmoCodeInfo> = {
  0: {
    label: 'Clear Sky',
    description: 'Mainly clear skies with plenty of sunshine.',
    icon: 'Sun',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/30',
    badgeText: 'text-amber-800 dark:text-amber-300',
    theme: 'clear-day',
  },
  1: {
    label: 'Mainly Clear',
    description: 'Mostly clear with minor scattered clouds.',
    icon: 'SunDim',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeText: 'text-amber-700 dark:text-amber-300',
    theme: 'clear-day',
  },
  2: {
    label: 'Partly Cloudy',
    description: 'Partly cloudy sky conditions throughout the day.',
    icon: 'CloudSun',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/30',
    badgeText: 'text-sky-800 dark:text-sky-300',
    theme: 'cloudy',
  },
  3: {
    label: 'Overcast',
    description: 'Dense cloud coverage dominating the sky.',
    icon: 'Cloud',
    badgeBg: 'bg-slate-100 dark:bg-slate-800/50',
    badgeText: 'text-slate-800 dark:text-slate-300',
    theme: 'cloudy',
  },
  45: {
    label: 'Foggy',
    description: 'Foggy conditions reducing surface visibility.',
    icon: 'CloudFog',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-700 dark:text-zinc-300',
    theme: 'foggy',
  },
  48: {
    label: 'Depositing Rime Fog',
    description: 'Freezing fog depositing frost on outdoor surfaces.',
    icon: 'CloudFog',
    badgeBg: 'bg-teal-100 dark:bg-teal-900/30',
    badgeText: 'text-teal-800 dark:text-teal-300',
    theme: 'foggy',
  },
  51: {
    label: 'Light Drizzle',
    description: 'Light, intermittent mist and drizzle.',
    icon: 'CloudDrizzle',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
    badgeText: 'text-blue-800 dark:text-blue-300',
    theme: 'rainy',
  },
  53: {
    label: 'Moderate Drizzle',
    description: 'Steady drizzle with damp air.',
    icon: 'CloudDrizzle',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-800 dark:text-blue-300',
    theme: 'rainy',
  },
  55: {
    label: 'Dense Drizzle',
    description: 'Heavy drizzle dampening ground surfaces rapidly.',
    icon: 'CloudRain',
    badgeBg: 'bg-blue-200 dark:bg-blue-900/50',
    badgeText: 'text-blue-900 dark:text-blue-200',
    theme: 'rainy',
  },
  56: {
    label: 'Freezing Light Drizzle',
    description: 'Light freezing drizzle creating slippery patches.',
    icon: 'CloudHail',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    theme: 'snowy',
  },
  57: {
    label: 'Freezing Dense Drizzle',
    description: 'Dense freezing drizzle with icing risk.',
    icon: 'CloudHail',
    badgeBg: 'bg-cyan-200 dark:bg-cyan-900/50',
    badgeText: 'text-cyan-900 dark:text-cyan-200',
    theme: 'snowy',
  },
  61: {
    label: 'Slight Rain',
    description: 'Gentle, light rainfall.',
    icon: 'CloudRain',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/40',
    badgeText: 'text-sky-800 dark:text-sky-300',
    theme: 'rainy',
  },
  63: {
    label: 'Moderate Rain',
    description: 'Steady, moderate rainfall.',
    icon: 'CloudRain',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-800 dark:text-blue-300',
    theme: 'rainy',
  },
  65: {
    label: 'Heavy Rain',
    description: 'Downpours with heavy rainfall intensity.',
    icon: 'CloudRainWind',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    theme: 'rainy',
  },
  66: {
    label: 'Light Freezing Rain',
    description: 'Freezing rain creating icy glazes.',
    icon: 'CloudHail',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    theme: 'snowy',
  },
  67: {
    label: 'Heavy Freezing Rain',
    description: 'Heavy freezing rain with hazardous road conditions.',
    icon: 'CloudHail',
    badgeBg: 'bg-cyan-200 dark:bg-cyan-900/60',
    badgeText: 'text-cyan-900 dark:text-cyan-200',
    theme: 'snowy',
  },
  71: {
    label: 'Slight Snow Fall',
    description: 'Light snowfall creating a light dusting.',
    icon: 'CloudSnow',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    theme: 'snowy',
  },
  73: {
    label: 'Moderate Snow Fall',
    description: 'Steady snowfall accumulating on surfaces.',
    icon: 'CloudSnow',
    badgeBg: 'bg-slate-200 dark:bg-slate-700',
    badgeText: 'text-slate-900 dark:text-slate-100',
    theme: 'snowy',
  },
  75: {
    label: 'Heavy Snow Fall',
    description: 'Heavy snow accumulation with low visibility.',
    icon: 'Snowflake',
    badgeBg: 'bg-slate-300 dark:bg-slate-600',
    badgeText: 'text-slate-900 dark:text-white',
    theme: 'snowy',
  },
  77: {
    label: 'Snow Grains',
    description: 'Small frozen snow grains falling gently.',
    icon: 'Snowflake',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    theme: 'snowy',
  },
  80: {
    label: 'Slight Rain Showers',
    description: 'Brief scattered rain showers.',
    icon: 'CloudRain',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-800 dark:text-blue-300',
    theme: 'rainy',
  },
  81: {
    label: 'Moderate Rain Showers',
    description: 'Passing rain showers with breezy intervals.',
    icon: 'CloudRainWind',
    badgeBg: 'bg-blue-200 dark:bg-blue-900/50',
    badgeText: 'text-blue-900 dark:text-blue-200',
    theme: 'rainy',
  },
  82: {
    label: 'Violent Rain Showers',
    description: 'Torrential rain showers with strong gusty winds.',
    icon: 'CloudRainWind',
    badgeBg: 'bg-indigo-200 dark:bg-indigo-900/60',
    badgeText: 'text-indigo-900 dark:text-indigo-200',
    theme: 'stormy',
  },
  85: {
    label: 'Slight Snow Showers',
    description: 'Intermittent brief snow showers.',
    icon: 'CloudSnow',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    theme: 'snowy',
  },
  86: {
    label: 'Heavy Snow Showers',
    description: 'Frequent heavy snow showers.',
    icon: 'Snowflake',
    badgeBg: 'bg-slate-200 dark:bg-slate-700',
    badgeText: 'text-slate-900 dark:text-slate-100',
    theme: 'snowy',
  },
  95: {
    label: 'Thunderstorm',
    description: 'Thunderstorm activity with lightning flashes.',
    icon: 'CloudLightning',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-800 dark:text-purple-300',
    theme: 'stormy',
  },
  96: {
    label: 'Thunderstorm with Light Hail',
    description: 'Thunderstorms accompanied by small hail.',
    icon: 'CloudLightning',
    badgeBg: 'bg-purple-200 dark:bg-purple-900/60',
    badgeText: 'text-purple-900 dark:text-purple-200',
    theme: 'stormy',
  },
  99: {
    label: 'Thunderstorm with Heavy Hail',
    description: 'Severe thunderstorm with heavy hail risk.',
    icon: 'CloudLightning',
    badgeBg: 'bg-purple-300 dark:bg-purple-900/80',
    badgeText: 'text-purple-950 dark:text-purple-100',
    theme: 'stormy',
  },
};

export function getWmoInfo(code: number, isDay = 1): WmoCodeInfo {
  const info = WMO_CODES[code] || {
    label: 'Unknown Weather',
    description: 'Weather conditions currently unavailable.',
    icon: 'Cloud',
    badgeBg: 'bg-gray-100 dark:bg-gray-800',
    badgeText: 'text-gray-800 dark:text-gray-200',
    theme: 'cloudy' as const,
  };

  if (!isDay && code === 0) {
    return {
      ...info,
      label: 'Clear Night',
      icon: 'Moon',
      theme: 'clear-night',
      badgeBg: 'bg-indigo-950 dark:bg-indigo-950/80',
      badgeText: 'text-indigo-200 dark:text-indigo-300',
    };
  }
  if (!isDay && (code === 1 || code === 2)) {
    return {
      ...info,
      icon: 'CloudMoon',
      theme: 'clear-night',
    };
  }

  return info;
}

export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const val = convertTemp(celsius, unit);
  return `${val}°${unit}`;
}

export function degToCardinal(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.floor((deg + 11.25) / 22.5) % 16;
  return directions[index];
}

export interface UvAssessment {
  level: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  color: string;
  advice: string;
}

export function getUvAssessment(uv: number): UvAssessment {
  if (uv <= 2) {
    return {
      level: 'Low',
      color: 'text-emerald-600 dark:text-emerald-400',
      advice: 'Minimal sun risk. Safe to enjoy outdoors without special protection.',
    };
  }
  if (uv <= 5) {
    return {
      level: 'Moderate',
      color: 'text-amber-600 dark:text-amber-400',
      advice: 'Wear sunglasses and apply SPF 30+ sunscreen if outdoors for extended periods.',
    };
  }
  if (uv <= 7) {
    return {
      level: 'High',
      color: 'text-orange-600 dark:text-orange-400',
      advice: 'Protection required. Seek shade during midday hours and wear a wide-brim hat.',
    };
  }
  if (uv <= 10) {
    return {
      level: 'Very High',
      color: 'text-rose-600 dark:text-rose-400',
      advice: 'Extra protection needed. Avoid prolonged sun exposure between 10 AM and 4 PM.',
    };
  }
  return {
    level: 'Extreme',
    color: 'text-purple-600 dark:text-purple-400',
    advice: 'Take full precautions! Unprotected skin and eyes can burn in minutes.',
  };
}

export function getHumidityAssessment(humidity: number): { label: string; advice: string } {
  if (humidity < 30) {
    return { label: 'Dry', advice: 'Low air humidity may cause dry skin or respiratory discomfort.' };
  }
  if (humidity <= 60) {
    return { label: 'Comfortable', advice: 'Optimal humidity level for indoor and outdoor comfort.' };
  }
  if (humidity <= 80) {
    return { label: 'Humid', advice: 'Slightly muggy air feel. Stay hydrated during activities.' };
  }
  return { label: 'Very Muggy', advice: 'High moisture concentration. Sweating is less effective for cooling.' };
}

export function calculateActivityInsights(
  tempC: number,
  weatherCode: number,
  windKmH: number,
  uvIndex: number,
  precipProb: number
): ActivityInsight[] {
  const isRainy = weatherCode >= 50 && weatherCode <= 99;
  const isSevere = weatherCode >= 95;

  // Running
  let runScore = 5;
  let runReason = 'Great outdoor conditions for running!';
  if (tempC > 28 || tempC < 2) {
    runScore -= 2;
    runReason = tempC > 28 ? 'Warm temperatures; hydrate frequently.' : 'Cold weather; dress in thermal layers.';
  }
  if (isRainy) {
    runScore -= 2;
    runReason = 'Wet ground and rain showers expected.';
  }
  if (windKmH > 35) {
    runScore -= 1;
    runReason = 'Strong gusts may create resistance.';
  }
  if (isSevere) {
    runScore = 1;
    runReason = 'Severe weather risk; run indoors on a treadmill.';
  }

  // Cycling
  let bikeScore = 5;
  let bikeReason = 'Pleasant conditions for cycling.';
  if (windKmH > 25) {
    bikeScore -= 2;
    bikeReason = `Windy conditions (${Math.round(windKmH)} km/h). Expect crosswinds.`;
  }
  if (isRainy) {
    bikeScore -= 3;
    bikeReason = 'Slippery roads and reduced braking efficiency.';
  }
  if (tempC < 5 || tempC > 32) {
    bikeScore -= 1;
  }

  // Outdoor Dining / Picnic
  let diningScore = 5;
  let diningReason = 'Ideal weather for outdoor dining or a coffee break.';
  if (isRainy || precipProb > 40) {
    diningScore = 1;
    diningReason = 'Rain probability suggests choosing indoor seating.';
  } else if (tempC < 15 || tempC > 30) {
    diningScore -= 2;
    diningReason = tempC < 15 ? 'Cool breeze outdoor; seating near a heater recommended.' : 'Hot outdoors; seek shaded patios.';
  } else if (uvIndex > 7) {
    diningScore -= 1;
    diningReason = 'High UV; select table with umbrella or canopy.';
  }

  // Stargazing / Night Walks
  let starScore = 5;
  let starReason = 'Clear skies offer excellent atmospheric viewing.';
  if (weatherCode >= 2) {
    starScore -= 3;
    starReason = 'Cloud cover will obscure sky views.';
  }
  if (isRainy) {
    starScore = 1;
    starReason = 'Precipitation present.';
  }

  const formatStatus = (s: number): ActivityInsight['status'] => {
    if (s >= 4) return 'Ideal';
    if (s === 3) return 'Good';
    if (s === 2) return 'Moderate';
    return 'Unfavorable';
  };

  return [
    { name: 'Running & Cardio', score: Math.max(1, runScore), status: formatStatus(runScore), reason: runReason, icon: 'Footprints' },
    { name: 'Cycling & Commuting', score: Math.max(1, bikeScore), status: formatStatus(bikeScore), reason: bikeReason, icon: 'Bike' },
    { name: 'Outdoor Dining & Patio', score: Math.max(1, diningScore), status: formatStatus(diningScore), reason: diningReason, icon: 'Utensils' },
    { name: 'Stargazing / Night Walks', score: Math.max(1, starScore), status: formatStatus(starScore), reason: starReason, icon: 'Sparkles' },
  ];
}

export function formatDayName(dateStr: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatFormattedDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatTimeShort(isoTimeStr: string): string {
  const d = new Date(isoTimeStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatHourOnly(isoTimeStr: string): string {
  const d = new Date(isoTimeStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}
