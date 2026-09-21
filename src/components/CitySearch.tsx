import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, History, X, Sparkles, Navigation } from 'lucide-react';
import { GeocodingResult } from '../types';
import { searchCities, POPULAR_CITIES } from '../services/weatherService';

interface CitySearchProps {
  onSelectCity: (city: GeocodingResult) => void;
  onUseCurrentLocation: () => void;
  isLoadingLocation?: boolean;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  onSelectCity,
  onUseCurrentLocation,
  isLoadingLocation = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentCities, setRecentCities] = useState<GeocodingResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load recent cities on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('weather_recent_cities');
      if (saved) {
        setRecentCities(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load recent cities from localStorage', e);
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search logic using Open-Meteo Geocoding API
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchCities(query);
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (city: GeocodingResult) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);

    // Save to recents
    setRecentCities((prev) => {
      const filtered = prev.filter((item) => item.id !== city.id);
      const updated = [city, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('weather_recent_cities', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeRecent = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setRecentCities((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('weather_recent_cities', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-30" ref={wrapperRef}>
      {/* Search Input Bar */}
      <div className="relative flex items-center shadow-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-sky-500/30 focus-within:border-sky-500">
        <div className="pl-4 pr-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city, region or country (e.g. Tokyo, London, Paris)..."
          className="w-full py-3.5 pr-10 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm md:text-base outline-none"
          id="city-search-input"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="p-1.5 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search"
            id="clear-search-btn"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {isSearching && (
          <div className="pr-4 text-sky-500">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}

        {/* GPS Current Location button */}
        <button
          onClick={onUseCurrentLocation}
          disabled={isLoadingLocation}
          className="mr-2 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/80 text-sky-700 dark:text-sky-300 font-medium text-xs md:text-sm rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
          title="Use current location"
          id="use-current-location-btn"
        >
          {isLoadingLocation ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600 dark:text-sky-400" />
          ) : (
            <Navigation className="w-3.5 h-3.5 fill-current" />
          )}
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
          {/* Active Search Results */}
          {query.trim().length >= 2 && (
            <div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Matching Cities ({results.length})
              </div>
              {results.length === 0 && !isSearching ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No cities found matching &quot;{query}&quot;. Try searching for another name or check spelling.
                </div>
              ) : (
                results.map((city) => (
                  <button
                    key={`${city.id}-${city.latitude}-${city.longitude}`}
                    onClick={() => handleSelect(city)}
                    className="w-full px-4 py-3 text-left hover:bg-sky-50/70 dark:hover:bg-sky-950/40 flex items-center justify-between transition-colors group"
                    id={`city-result-${city.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-sky-100 dark:group-hover:bg-sky-900 group-hover:text-sky-600 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-100 text-sm md:text-base group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {city.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {[city.admin1, city.country].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentCities.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Recent Searches
                </span>
              </div>
              {recentCities.map((city) => (
                <div
                  key={`recent-${city.id}`}
                  onClick={() => handleSelect(city)}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                        {city.name}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => removeRecent(e, city.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Remove from history"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Popular Cities */}
          {!query.trim() && (
            <div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Popular Destinations
              </div>
              <div className="p-3 flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={`popular-${city.id}`}
                    onClick={() => handleSelect(city)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-sky-950 text-slate-700 hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300 text-xs font-medium rounded-xl transition-colors border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {city.name}, {city.country}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
