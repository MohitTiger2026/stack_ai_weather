import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CloudSun, RefreshCw, Loader2, Sparkles, Navigation } from 'lucide-react';
import { GeocodingResult, TemperatureUnit, WeatherForecastResponse, SavedLocation } from './types';
import { getWeatherForecast, POPULAR_CITIES } from './services/weatherService';
import { Header } from './components/Header';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { HourlyForecastSection } from './components/HourlyForecastSection';
import { DailyForecastSection } from './components/DailyForecastSection';
import { IntelligenceInsights } from './components/IntelligenceInsights';
import { SavedLocationsBar } from './components/SavedLocationsBar';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<GeocodingResult>(POPULAR_CITIES[0]); // Default London
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  // Initialize saved locations & unit preference from localStorage
  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('weather_temp_unit') as TemperatureUnit;
      if (savedUnit === 'C' || savedUnit === 'F') {
        setUnit(savedUnit);
      }

      const savedLocs = localStorage.getItem('weather_saved_locations');
      if (savedLocs) {
        setSavedLocations(JSON.parse(savedLocs));
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
  }, []);

  // Fetch forecast function
  const fetchWeather = useCallback(async (city: GeocodingResult, showFullLoader = true) => {
    if (showFullLoader) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const data = await getWeatherForecast(city.latitude, city.longitude);
      setForecast(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Unable to fetch weather data from Open-Meteo API. Please check your internet connection or try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Fetch whenever selected city changes
  useEffect(() => {
    fetchWeather(selectedCity, true);
  }, [selectedCity, fetchWeather]);

  // Unit toggle handler
  const handleToggleUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    try {
      localStorage.setItem('weather_temp_unit', newUnit);
    } catch (e) {
      console.error(e);
    }
  };

  // Saved location toggle
  const handleToggleSaveLocation = () => {
    const isAlreadySaved = savedLocations.some((item) => item.id.toString() === selectedCity.id.toString());
    let updated: SavedLocation[];

    if (isAlreadySaved) {
      updated = savedLocations.filter((item) => item.id.toString() !== selectedCity.id.toString());
    } else {
      const newLoc: SavedLocation = {
        id: selectedCity.id.toString(),
        name: selectedCity.name,
        country: selectedCity.country,
        admin1: selectedCity.admin1,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      };
      updated = [newLoc, ...savedLocations];
    }

    setSavedLocations(updated);
    try {
      localStorage.setItem('weather_saved_locations', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveSavedLocation = (id: string) => {
    const updated = savedLocations.filter((item) => item.id !== id);
    setSavedLocations(updated);
    try {
      localStorage.setItem('weather_saved_locations', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectSavedLocation = (loc: SavedLocation) => {
    const cityResult: GeocodingResult = {
      id: Number(loc.id) || Date.now(),
      name: loc.name,
      country: loc.country,
      admin1: loc.admin1,
      latitude: loc.latitude,
      longitude: loc.longitude,
    };
    setSelectedCity(cityResult);
  };

  // Browser Geolocation Detector
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const geoCity: GeocodingResult = {
          id: Date.now(),
          name: 'Current Location',
          latitude,
          longitude,
        };
        setSelectedCity(geoCity);
        setIsLoadingLocation(false);
      },
      (geoError) => {
        console.error('Geolocation error:', geoError);
        alert('Could not retrieve your location. Please ensure location permissions are allowed.');
        setIsLoadingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const isCurrentSaved = savedLocations.some((loc) => loc.id.toString() === selectedCity.id.toString());

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* Top Header */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onSelectCity={(city) => setSelectedCity(city)}
        onUseCurrentLocation={handleUseCurrentLocation}
        onRefresh={() => fetchWeather(selectedCity, false)}
        isRefreshing={isRefreshing}
        isLoadingLocation={isLoadingLocation}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Bookmarks bar */}
        <SavedLocationsBar
          savedLocations={savedLocations}
          activeLocationId={selectedCity.id}
          onSelectSaved={handleSelectSavedLocation}
          onRemoveSaved={handleRemoveSavedLocation}
        />

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchWeather(selectedCity, true)}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-xl font-medium text-xs hover:bg-rose-700 transition-colors shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content Loading State */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-sky-200 dark:border-sky-900 border-t-sky-600 animate-spin" />
              <CloudSun className="w-6 h-6 text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              Fetching weather data for {selectedCity.name}...
            </p>
          </div>
        ) : forecast && forecast.current ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCity.id}-${selectedCity.name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* 1. Main Current Weather Hero Card */}
              <CurrentWeatherCard
                city={selectedCity}
                current={forecast.current}
                daily={forecast.daily}
                timezone={forecast.timezone}
                unit={unit}
                isSaved={isCurrentSaved}
                onToggleSave={handleToggleSaveLocation}
              />

              {/* 2. Key Metrics Grid */}
              <WeatherMetricsGrid
                current={forecast.current}
                daily={forecast.daily}
                unit={unit}
              />

              {/* 3. 24-Hour Hourly Forecast */}
              <HourlyForecastSection
                hourly={forecast.hourly}
                unit={unit}
              />

              {/* 4. 7-Day Daily Forecast */}
              <DailyForecastSection
                daily={forecast.daily}
                unit={unit}
              />

              {/* 5. Intelligence Activity Insights & Dressing Guide */}
              <IntelligenceInsights
                current={forecast.current}
                daily={forecast.daily}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="py-16 text-center space-y-3">
            <CloudSun className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">No weather forecast available</h3>
            <p className="text-sm text-slate-400">Please select a city using the search bar above.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Weather Intelligence App</span>
          </div>
          <div>
            Data sourced directly from <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="underline hover:text-sky-500">Open-Meteo API</a> (Geocoding &amp; Forecast)
          </div>
        </div>
      </footer>
    </div>
  );
}
