import React from 'react';
import { Sparkles, Shirt, ShieldCheck, Footprints, Bike, Utensils, Star, Info } from 'lucide-react';
import { CurrentWeatherData, DailyWeatherData } from '../types';
import { calculateActivityInsights, getUvAssessment } from '../utils/weatherUtils';

interface IntelligenceInsightsProps {
  current: CurrentWeatherData;
  daily?: DailyWeatherData;
}

export const IntelligenceInsights: React.FC<IntelligenceInsightsProps> = ({ current, daily }) => {
  const precipProb = daily?.precipitation_probability_max?.[0] ?? 0;
  const activities = calculateActivityInsights(
    current.temperature_2m,
    current.weather_code,
    current.wind_speed_10m,
    current.uv_index,
    precipProb
  );

  const uvAssessment = getUvAssessment(current.uv_index);

  // Clothing recommendation
  const getClothingAdvice = (tempC: number, precip: number) => {
    if (tempC < 5) {
      return { title: 'Heavy Thermal Wear', desc: 'Heavy winter coat, insulated gloves, beanie, and warm scarf recommended.' };
    }
    if (tempC < 15) {
      return { title: 'Light Jacket or Fleece', desc: 'Layer with a warm sweater or windbreaker coat for outdoor comfort.' };
    }
    if (tempC < 25) {
      return { title: 'Breathable Casual Wear', desc: 'Comfortable jeans or chinos with a cotton shirt or hoodie.' };
    }
    return { title: 'Light Summer Attire', desc: 'Breathable t-shirt, shorts, sunglasses, and UV protection.' };
  };

  const clothing = getClothingAdvice(current.temperature_2m, precipProb);

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-4 h-4 text-sky-500" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-emerald-500" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Activity Outlook */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Outdoor Intelligence &amp; Activity Planner</h3>
            <p className="text-xs text-slate-400">Automated condition suitability score for common outdoor plans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activities.map((act) => (
            <div
              key={act.name}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                    {getActivityIcon(act.icon)}
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{act.name}</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    act.status === 'Ideal'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : act.status === 'Good'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      : act.status === 'Moderate'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {act.status}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                {act.reason}
              </p>

              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= act.score
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Clothing & Health Guidance */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Clothing &amp; Protection</h3>
              <p className="text-xs text-slate-400">Smart outfit recommendations</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 mb-4">
            <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {clothing.title}
            </div>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1.5 leading-relaxed">
              {clothing.desc}
            </p>
          </div>

          {/* UV Advisory */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <div className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              UV Exposure Advisory: {uvAssessment.level}
            </div>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1.5 leading-relaxed">
              {uvAssessment.advice}
            </p>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800">
          <Info className="w-3.5 h-3.5 shrink-0 text-sky-500" />
          <span>Weather data powered directly by Open-Meteo API APIs.</span>
        </div>
      </div>
    </div>
  );
};
