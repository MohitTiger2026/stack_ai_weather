import React from 'react';
import { Wind, Droplets, Compass, Gauge, Sunrise, Sunset, CloudRain } from 'lucide-react';
import { CurrentWeatherData, DailyWeatherData, TemperatureUnit } from '../types';
import { degToCardinal, getUvAssessment, getHumidityAssessment, formatTimeShort } from '../utils/weatherUtils';

interface WeatherMetricsGridProps {
  current: CurrentWeatherData;
  daily?: DailyWeatherData;
  unit: TemperatureUnit;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ current, daily }) => {
  const uvInfo = getUvAssessment(current.uv_index);
  const humidityInfo = getHumidityAssessment(current.relative_humidity_2m);
  const sunriseStr = daily?.sunrise?.[0] ? formatTimeShort(daily.sunrise[0]) : '06:15 AM';
  const sunsetStr = daily?.sunset?.[0] ? formatTimeShort(daily.sunset[0]) : '07:30 PM';
  const precipProb = daily?.precipitation_probability_max?.[0] ?? Math.round(current.precipitation * 10);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 1. UV Index */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">UV Index</span>
          <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Gauge className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{current.uv_index.toFixed(1)}</span>
            <span className={`text-xs font-bold ${uvInfo.color}`}>{uvInfo.level}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (current.uv_index / 12) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Wind */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Wind</span>
          <span className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
            <Wind className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{Math.round(current.wind_speed_10m)}</span>
            <span className="text-xs text-slate-400 font-medium">km/h</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
            <Compass className="w-3.5 h-3.5 text-sky-500" style={{ transform: `rotate(${current.wind_direction_10m}deg)` }} />
            <span>
              {degToCardinal(current.wind_direction_10m)} ({current.wind_direction_10m}°)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Humidity */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Humidity</span>
          <span className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
            <Droplets className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{current.relative_humidity_2m}%</span>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">{humidityInfo.label}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${current.relative_humidity_2m}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Pressure */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pressure</span>
          <span className="p-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <Gauge className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{Math.round(current.surface_pressure)}</span>
            <span className="text-xs text-slate-400 font-medium">hPa</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {current.surface_pressure >= 1013 ? 'High Pressure' : 'Low Pressure'}
          </div>
        </div>
      </div>

      {/* 5. Precipitation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Rain Chance</span>
          <span className="p-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
            <CloudRain className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{precipProb}%</span>
            <span className="text-xs text-slate-400 font-medium">{current.precipitation} mm</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-500"
              style={{ width: `${Math.min(100, precipProb)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6. Sunrise / Sunset */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-800 transition-colors shadow-sm">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sun Cycle</span>
          <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Sunrise className="w-4 h-4" />
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-amber-500" /> Rise
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{sunriseStr}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Sunset className="w-3.5 h-3.5 text-orange-500" /> Set
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{sunsetStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
