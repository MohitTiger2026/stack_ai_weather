import { GeocodingResponse, GeocodingResult, WeatherForecastResponse } from '../types';

const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const url = `${GEOCODING_API_BASE}?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding failed with status ${response.status}`);
    }
    const data: GeocodingResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching city search results:', error);
    throw error;
  }
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecastResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure',
      'uv_index',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m',
      'uv_index',
      'precipitation_probability',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
    ].join(','),
    timezone: 'auto',
  });

  const url = `${FORECAST_API_BASE}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast request failed with status ${response.status}`);
    }
    const data: WeatherForecastResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

export const POPULAR_CITIES: GeocodingResult[] = [
  { id: 2643743, name: 'London', latitude: 51.50853, longitude: -0.12574, country: 'United Kingdom', admin1: 'England' },
  { id: 5128581, name: 'New York', latitude: 40.71427, longitude: -74.00597, country: 'United States', admin1: 'New York' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.69171, country: 'Japan', admin1: 'Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.85341, longitude: 2.3488, country: 'France', admin1: 'Île-de-France' },
  { id: 2147714, name: 'Sydney', latitude: -33.86785, longitude: 151.20732, country: 'Australia', admin1: 'New South Wales' },
  { id: 1880252, name: 'Singapore', latitude: 1.28967, longitude: 103.85007, country: 'Singapore' },
  { id: 5368361, name: 'Los Angeles', latitude: 34.05223, longitude: -118.24368, country: 'United States', admin1: 'California' },
];
