import React from 'react';
import { Bookmark, MapPin, X } from 'lucide-react';
import { SavedLocation } from '../types';

interface SavedLocationsBarProps {
  savedLocations: SavedLocation[];
  activeLocationId?: number | string;
  onSelectSaved: (location: SavedLocation) => void;
  onRemoveSaved: (id: string) => void;
}

export const SavedLocationsBar: React.FC<SavedLocationsBarProps> = ({
  savedLocations,
  activeLocationId,
  onSelectSaved,
  onRemoveSaved,
}) => {
  if (savedLocations.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
        <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span>Bookmarks:</span>
      </div>

      {savedLocations.map((loc) => {
        const isActive = activeLocationId === loc.id || activeLocationId?.toString() === loc.id.toString();

        return (
          <div
            key={loc.id}
            onClick={() => onSelectSaved(loc)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 cursor-pointer transition-all shrink-0 border ${
              isActive
                ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700'
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-500'}`} />
            <span>{loc.name}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSaved(loc.id);
              }}
              className={`p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-rose-500'
              }`}
              title="Remove bookmark"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
