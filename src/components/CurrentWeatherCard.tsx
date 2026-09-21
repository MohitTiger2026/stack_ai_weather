import React from 'react';
import { MapPin, Clock, Bookmark, BookmarkCheck, ArrowUp, ArrowDown } from 'lucide-react';
import { CurrentWeatherData, DailyWeatherData, GeocodingResult, TemperatureUnit } from '../types';
import { getWmoInfo, formatTemp, degToCardinal } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  city: GeocodingResult;
  current: CurrentWeatherData;
  daily?: DailyWeatherData;
  timezone?: string;
  unit: TemperatureUnit;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  city,
  current,
  daily,
  timezone,
  unit,
  isSaved = false,
  onToggleSave,
}) => {
  const wmo = getWmoInfo(current.weather_code, current.is_day);
  const maxTemp = daily?.temperature_2m_max?.[0] ?? current.temperature_2m;
  const minTemp = daily?.temperature_2m_min?.[0] ?? current.temperature_2m;

  // Format local date and time if timezone present
  const nowStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: timezone || undefined,
  });

  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone || undefined,
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white p-6 md:p-8 shadow-2xl border border-sky-800/30">
      {/* Decorative Weather Glow background */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between gap-6">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-300 font-medium text-sm md:text-base">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {city.name}
                {city.admin1 ? `, ${city.admin1}` : ''}
                {city.country ? `, ${city.country}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-sky-200/70 mt-1">
              <Clock className="w-3.5 h-3.5 text-sky-400/80" />
              <span>{nowStr} • {timeStr}</span>
              {timezone && <span className="text-[10px] bg-sky-900/50 px-1.5 py-0.5 rounded text-sky-300 font-mono">{timezone}</span>}
            </div>
          </div>

          {/* Save / Bookmark Button */}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs font-medium"
              title={isSaved ? 'Remove from saved locations' : 'Save location'}
              id="save-location-btn"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-slate-200" />
                  <span className="hidden sm:inline">Bookmark</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Temperature & Main Icon Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 my-2">
          <div className="flex items-baseline gap-4">
            <span className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-md">
              {formatTemp(current.temperature_2m, unit)}
            </span>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-sky-100">
                <WeatherIcon name={wmo.icon} className="w-4 h-4 text-sky-300" />
                <span>{wmo.label}</span>
              </div>

              <div className="text-sm text-sky-200/90 font-medium">
                Feels like <span className="font-bold text-white">{formatTemp(current.apparent_temperature, unit)}</span>
              </div>
            </div>
          </div>

          {/* High / Low Range Pill */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 self-stretch md:self-auto justify-around">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                <ArrowUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider">High</div>
                <div className="text-base font-bold text-white">{formatTemp(maxTemp, unit)}</div>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider">Low</div>
                <div className="text-base font-bold text-white">{formatTemp(minTemp, unit)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Description Footnote */}
        <div className="text-xs md:text-sm text-sky-100/80 bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-between">
          <span>{wmo.description}</span>
          <span className="text-[11px] text-sky-300/60 shrink-0 ml-2 font-mono">
            Wind: {Math.round(current.wind_speed_10m)} km/h {degToCardinal(current.wind_direction_10m)}
          </span>
        </div>
      </div>
    </div>
  );
};
