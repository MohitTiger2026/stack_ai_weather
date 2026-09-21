import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HourlyWeatherData, TemperatureUnit } from '../types';
import { getWmoInfo, convertTemp, formatHourOnly } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Clock, LineChart, LayoutGrid, Droplets } from 'lucide-react';

interface HourlyForecastSectionProps {
  hourly?: HourlyWeatherData;
  unit: TemperatureUnit;
}

export const HourlyForecastSection: React.FC<HourlyForecastSectionProps> = ({ hourly, unit }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');

  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  // Filter next 24 hours starting from current time
  const nowIndex = 0; // next 24 hours
  const hours24 = hourly.time.slice(nowIndex, nowIndex + 24).map((time, idx) => {
    const rawTemp = hourly.temperature_2m[idx];
    const displayTemp = convertTemp(rawTemp, unit);
    const code = hourly.weather_code[idx];
    const wmo = getWmoInfo(code);
    const precip = hourly.precipitation_probability ? hourly.precipitation_probability[idx] : 0;
    const wind = hourly.wind_speed_10m ? Math.round(hourly.wind_speed_10m[idx]) : 0;

    return {
      timeIso: time,
      timeFormatted: idx === 0 ? 'Now' : formatHourOnly(time),
      rawTemp,
      displayTemp,
      code,
      wmo,
      precip,
      wind,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
      {/* Section Header with View Mode Switcher */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">24-Hour Forecast</h3>
            <p className="text-xs text-slate-400">Hourly temperature and precipitation probability</p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Card View"
            id="hourly-view-cards-btn"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'chart'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Chart View"
            id="hourly-view-chart-btn"
          >
            <LineChart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trend Chart</span>
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 -mx-2 px-2">
          {hours24.map((item, idx) => (
            <div
              key={item.timeIso}
              className={`flex-none w-24 p-3.5 rounded-2xl border text-center transition-all ${
                idx === 0
                  ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-800 text-slate-800 dark:text-slate-100'
              }`}
            >
              <div className={`text-xs font-semibold ${idx === 0 ? 'text-sky-100' : 'text-slate-400'}`}>
                {item.timeFormatted}
              </div>

              <div className="my-3 flex justify-center">
                <WeatherIcon
                  name={item.wmo.icon}
                  className={`w-7 h-7 ${idx === 0 ? 'text-white' : 'text-sky-500 dark:text-sky-400'}`}
                />
              </div>

              <div className={`text-lg font-bold ${idx === 0 ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                {item.displayTemp}°
              </div>

              {item.precip > 0 ? (
                <div className={`text-[11px] mt-2 flex items-center justify-center gap-0.5 ${idx === 0 ? 'text-sky-100 font-semibold' : 'text-cyan-600 dark:text-cyan-400 font-medium'}`}>
                  <Droplets className="w-3 h-3" />
                  <span>{item.precip}%</span>
                </div>
              ) : (
                <div className={`text-[11px] mt-2 ${idx === 0 ? 'text-sky-200/70' : 'text-slate-400'}`}>
                  {item.wind} km/h
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Chart View */
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hours24} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timeFormatted" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#cbd5e1" />
              <YAxis
                dataKey="displayTemp"
                unit={`°${unit}`}
                domain={['dataMin - 2', 'dataMax + 2']}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                stroke="#cbd5e1"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl border border-slate-800 space-y-1">
                        <div className="font-semibold text-sky-400">{data.timeFormatted}</div>
                        <div className="text-base font-bold">{data.displayTemp}°{unit} - {data.wmo.label}</div>
                        <div className="text-slate-300">Rain Chance: {data.precip}%</div>
                        <div className="text-slate-400">Wind: {data.wind} km/h</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="displayTemp"
                stroke="#0284c7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
