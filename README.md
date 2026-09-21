# Weather Intelligence

A modern, responsive Weather Intelligence web application that provides real-time weather conditions, 24-hour hourly trends, a 7-day forecast, and contextual outdoor activity insights powered by Open-Meteo public APIs.

---

## 🌟 Key Features

- 🔍 **City Geocoding & Autocomplete**: Search for any city worldwide with debounced autocompletion, popular destinations, search history, and browser GPS location support.
- 🌡️ **Current Weather Overview**: Live temperature with instant **°C / °F** conversion, "feels like" apparent temperature, weather condition badges, local date/time in location timezone, and bookmarking capability.
- 📊 **24-Hour Hourly Forecast**: Interactive view of the next 24 hours with a choice between a horizontal card list and a Recharts trend curve.
- 📅 **7-Day Forecast**: Comprehensive 7-day outlook featuring min/max temperatures with visual range bars relative to weekly extremes, precipitation probabilities, UV max, and wind speeds.
- 🌤️ **Detailed Weather Metrics**: Real-time meters for UV Index with health advisories, Wind Speed & Compass Direction, Relative Humidity with comfort assessment, Surface Pressure, and Sunrise/Sunset times.
- 🧠 **Intelligence & Activity Recommendations**: Automated condition scoring for outdoor plans (Running, Cycling, Outdoor Dining, Stargazing) and smart outfit/clothing suggestions based on temperature and rain.
- 🔖 **Bookmarks & Saved Locations**: Save favorite cities for quick one-click access stored in client `localStorage`.

---

## 📡 API Integrations

This application pulls data directly from the following Open-Meteo APIs (no API key required):

1. **Open-Meteo Geocoding API**
   - URL: `https://geocoding-api.open-meteo.com/v1/search`
   - Purpose: Resolves city names to geographical coordinates (latitude and longitude), country, state, and timezone.

2. **Open-Meteo Forecast API**
   - URL: `https://api.open-meteo.com/v1/forecast`
   - Purpose: Fetches current weather metrics (`current`), hourly weather forecasts (`hourly`), and 7-day daily forecasts (`daily`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Animations**: Motion (`motion/react`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License

Apache-2.0
