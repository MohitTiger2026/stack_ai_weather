import React from 'react';
import {
  Sun,
  SunDim,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  CloudSnow,
  Snowflake,
  CloudLightning,
  Sparkles,
  Wind,
  Droplets,
  Eye,
  Compass,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
  ShieldAlert,
  Footprints,
  Bike,
  Utensils,
  MapPin,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Info,
  Sliders,
  Check
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={className} />;
    case 'SunDim':
      return <SunDim className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'CloudMoon':
      return <CloudMoon className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'CloudRainWind':
      return <CloudRainWind className={className} />;
    case 'CloudHail':
      return <CloudHail className={className} />;
    case 'CloudSnow':
      return <CloudSnow className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'Sunrise':
      return <Sunrise className={className} />;
    case 'Sunset':
      return <Sunset className={className} />;
    case 'Thermometer':
      return <Thermometer className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'Bike':
      return <Bike className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'RefreshCw':
      return <RefreshCw className={className} />;
    case 'Plus':
      return <Plus className={className} />;
    case 'Trash2':
      return <Trash2 className={className} />;
    case 'Bookmark':
      return <Bookmark className={className} />;
    case 'ChevronRight':
      return <ChevronRight className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Info':
      return <Info className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    case 'Check':
      return <Check className={className} />;
    case 'Cloud':
    default:
      return <Cloud className={className} />;
  }
};
