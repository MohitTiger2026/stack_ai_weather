export type TemperatureUnit = 'C' | 'F';

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  weather_code: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  surface_pressure: string;
  uv_index: string;
}

export interface CurrentWeatherData {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  uv_index: number;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  uv_index: number[];
  precipitation_probability?: number[];
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: CurrentWeatherUnits;
  current?: CurrentWeatherData;
  hourly?: HourlyWeatherData;
  daily?: DailyWeatherData;
}

export interface SavedLocation {
  id: string;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface WmoCodeInfo {
  label: string;
  description: string;
  icon: string; // lucide icon identifier
  badgeBg: string;
  badgeText: string;
  theme: 'clear-day' | 'clear-night' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';
}

export interface ActivityInsight {
  name: string;
  score: number; // 1 to 5 stars or scale
  status: 'Ideal' | 'Good' | 'Moderate' | 'Unfavorable';
  reason: string;
  icon: string;
}
