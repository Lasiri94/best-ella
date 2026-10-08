import React, { useState } from 'react';
import { LocationPoint } from '../types';
import { 
  Search, 
  MapPin, 
  Compass, 
  Mountain, 
  Clock, 
  ChevronRight, 
  X, 
  SlidersHorizontal,
  Navigation,
  Eye
} from 'lucide-react';

interface LocationListSidebarProps {
  locations: LocationPoint[];
  selectedLocation: LocationPoint | null;
  onSelectLocation: (loc: LocationPoint) => void;
  isOpen: boolean;
  onClose: () => void;
  filterCategory: string;
  onFilterChange: (cat: string) => void;
}

export const LocationListSidebar: React.FC<LocationListSidebarProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  isOpen,
  onClose,
  filterCategory,
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.id.toString() === searchQuery.trim();

    const matchesCategory = filterCategory === 'All' || loc.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All',
    'River & Falls',
    'Viewpoint',
    'Adventure Crossing',
    'Eco-Sanctuary',
    'Resort & Dining'
  ];

  return (
    <div
      id="location-list-sidebar"
      className="w-full sm:w-80 md:w-96 h-full flex flex-col bg-white border-r border-stone-200 shadow-2xl z-30 overflow-hidden shrink-0"
    >
      {/* Header */}
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            10
          </div>
          <div>
            <h2 className="font-bold text-stone-900 text-sm">Points of Interest</h2>
            <p className="text-[11px] text-stone-500">Kirindi Oya Adventure Route</p>
          </div>
        </div>
        <button
          id="btn-close-sidebar"
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-3 border-b border-stone-200 bg-stone-50/50 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-locations"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sites, waterfalls, views..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
          />
        </div>

        {/* Categories scrollable row */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg border transition-all ${
                filterCategory === cat
                  ? 'bg-emerald-700 border-emerald-700 text-white font-medium shadow-xs'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;

          return (
            <div
              key={loc.id}
              id={`sidebar-card-${loc.id}`}
              onClick={() => onSelectLocation(loc)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-2 ring-emerald-600/20'
                  : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Number Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-100 text-stone-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                  }`}
                >
                  {loc.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                      {loc.category}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {loc.elevation}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                    {loc.name}
                  </h3>

                  <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {loc.shortDesc}
                  </p>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-100 text-[11px]">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {loc.trekTime}
                    </span>
                    <span className="font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <Eye className="w-3.5 h-3.5" />
                      Open 360°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="py-12 text-center text-stone-400 text-xs">
            No points match "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
