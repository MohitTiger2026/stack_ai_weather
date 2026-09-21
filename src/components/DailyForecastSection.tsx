import React from 'react';
import { Calendar, Droplets, Sun, Wind } from 'lucide-react';
import { DailyWeatherData, TemperatureUnit } from '../types';
import { getWmoInfo, convertTemp, formatDayName, formatFormattedDate } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastSectionProps {
  daily?: DailyWeatherData;
  unit: TemperatureUnit;
}

export const DailyForecastSection: React.FC<DailyForecastSectionProps> = ({ daily, unit }) => {
  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  // Find min and max temperature across all 7 days for the visual bar calculation
  const allMins = daily.temperature_2m_min.map((t) => convertTemp(t, unit));
  const allMaxs = daily.temperature_2m_max.map((t) => convertTemp(t, unit));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const totalRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">7-Day Weather Forecast</h3>
            <p className="text-xs text-slate-400">Daily high/low temperature outlook and conditions</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const code = daily.weather_code[idx];
          const wmo = getWmoInfo(code);
          const maxTempRaw = daily.temperature_2m_max[idx];
          const minTempRaw = daily.temperature_2m_min[idx];
          const maxTemp = convertTemp(maxTempRaw, unit);
          const minTemp = convertTemp(minTempRaw, unit);
          const precipProb = daily.precipitation_probability_max[idx] ?? 0;
          const uvMax = daily.uv_index_max[idx] ?? 0;
          const windMax = Math.round(daily.wind_speed_10m_max[idx] ?? 0);

          // Bar calculations
          const leftPercent = Math.max(0, Math.min(100, ((minTemp - globalMin) / totalRange) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((globalMax - maxTemp) / totalRange) * 100));

          return (
            <div
              key={dateStr}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                idx === 0
                  ? 'bg-sky-50/60 dark:bg-sky-950/20 border-sky-200/80 dark:border-sky-800/40'
                  : 'bg-slate-50/40 dark:bg-slate-800/20 border-slate-200/60 dark:border-slate-800 hover:border-sky-200 dark:hover:border-sky-800'
              }`}
            >
              {/* Day & Date info */}
              <div className="flex items-center gap-3 md:w-44 shrink-0">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
                  <WeatherIcon name={wmo.icon} className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base flex items-center gap-1.5">
                    {formatDayName(dateStr, idx)}
                    {idx === 0 && (
                      <span className="text-[10px] bg-sky-500 text-white px-2 py-0.5 rounded-full font-semibold">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {formatFormattedDate(dateStr)} • {wmo.label}
                  </div>
                </div>
              </div>

              {/* Rain & UV Badges */}
              <div className="flex items-center gap-4 text-xs shrink-0">
                <div className="flex items-center gap-1 min-w-[50px] text-slate-500 dark:text-slate-400">
                  <Droplets className={`w-3.5 h-3.5 ${precipProb > 30 ? 'text-cyan-500 font-bold' : 'text-slate-400'}`} />
                  <span className={precipProb > 30 ? 'text-cyan-600 dark:text-cyan-400 font-bold' : ''}>
                    {precipProb}%
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-slate-400">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>UV {uvMax.toFixed(0)}</span>
                </div>

                <div className="hidden lg:flex items-center gap-1 text-slate-400">
                  <Wind className="w-3.5 h-3.5 text-sky-500" />
                  <span>{windMax} km/h</span>
                </div>
              </div>

              {/* Temperature Range Bar */}
              <div className="flex items-center gap-3 w-full md:w-64 shrink-0">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-10 text-right">
                  {minTemp}°
                </span>

                <div className="flex-1 bg-slate-200/80 dark:bg-slate-700/80 h-2 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500"
                    style={{
                      left: `${leftPercent}%`,
                      right: `${rightPercent}%`,
                    }}
                  />
                </div>

                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 w-10">
                  {maxTemp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
