import React from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { TemperatureUnit, GeocodingResult } from '../types';
import { CitySearch } from './CitySearch';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: (unit: TemperatureUnit) => void;
  onSelectCity: (city: GeocodingResult) => void;
  onUseCurrentLocation: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  isLoadingLocation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onSelectCity,
  onUseCurrentLocation,
  onRefresh,
  isRefreshing = false,
  isLoadingLocation = false,
}) => {
  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40 px-4 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 text-white rounded-2xl shadow-md shadow-sky-500/20">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight leading-none flex items-center gap-2">
                Weather <span className="text-sky-600 dark:text-sky-400 font-normal">Intelligence</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Real-time Weather &amp; 7-Day Forecast</p>
            </div>
          </div>

          {/* Mobile Refresh & Unit Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Refresh forecast data"
              id="mobile-refresh-btn"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
            </button>

            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => onToggleUnit('C')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  unit === 'C'
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onToggleUnit('F')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  unit === 'F'
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="w-full md:max-w-xl">
          <CitySearch
            onSelectCity={onSelectCity}
            onUseCurrentLocation={onUseCurrentLocation}
            isLoadingLocation={isLoadingLocation}
          />
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60"
            title="Refresh forecast data"
            id="desktop-refresh-btn"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
            <span>Refresh</span>
          </button>

          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => onToggleUnit('C')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                unit === 'C'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              id="unit-toggle-c"
            >
              °C
            </button>
            <button
              onClick={() => onToggleUnit('F')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                unit === 'F'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              id="unit-toggle-f"
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
