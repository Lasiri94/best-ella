import React from 'react';
import { LocationPoint } from '../types';
import { 
  X, 
  Mountain, 
  Footprints, 
  Clock, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Leaf,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface SiteDetailPanelProps {
  location: LocationPoint;
  allLocations: LocationPoint[];
  onClose: () => void;
  onNavigateToLocation: (loc: LocationPoint) => void;
  onOpenGuestbook?: (pointId: number) => void;
}

export const SiteDetailPanel: React.FC<SiteDetailPanelProps> = ({
  location,
  allLocations,
  onClose,
  onNavigateToLocation,
  onOpenGuestbook
}) => {
  // Find previous and next location by ID in sequential trail order (1 to 10)
  const currentIndex = allLocations.findIndex((l) => l.id === location.id);
  const prevLocation = currentIndex > 0 ? allLocations[currentIndex - 1] : allLocations[allLocations.length - 1];
  const nextLocation = currentIndex < allLocations.length - 1 ? allLocations[currentIndex + 1] : allLocations[0];

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Challenging':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <div
      id="site-detail-panel"
      className="w-full md:w-[420px] lg:w-[460px] h-full flex flex-col bg-white border-l border-stone-200 shadow-2xl z-30 overflow-hidden select-text"
    >
      {/* Header bar */}
      <div className="p-4 border-b border-stone-200 bg-stone-50/80 backdrop-blur flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center shadow-md text-base">
            {location.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                {location.category}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyBadge(location.difficulty)}`}>
                {location.difficulty}
              </span>
            </div>
            <h3 className="font-bold text-stone-900 text-base leading-tight mt-0.5">
              {location.name}
            </h3>
          </div>
        </div>

        <button
          id="btn-close-detail-panel"
          onClick={onClose}
          aria-label="Close panel"
          className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-stone-700 text-sm">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-stone-100/70 p-3 rounded-2xl border border-stone-200/80">
          <div className="flex flex-col items-center text-center p-1.5">
            <Mountain className="w-4 h-4 text-emerald-700 mb-1" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Elevation</span>
            <span className="font-semibold text-stone-800 text-xs mt-0.5">{location.elevation}</span>
          </div>
          <div className="flex flex-col items-center text-center p-1.5 border-x border-stone-200">
            <Clock className="w-4 h-4 text-emerald-700 mb-1" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Trek Time</span>
            <span className="font-semibold text-stone-800 text-xs mt-0.5">{location.trekTime}</span>
          </div>
          <div className="flex flex-col items-center text-center p-1.5">
            <Footprints className="w-4 h-4 text-emerald-700 mb-1" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Distance</span>
            <span className="font-semibold text-stone-800 text-xs mt-0.5">{location.distanceFromStart}</span>
          </div>
        </div>

        {/* Overview & Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Site Overview
          </h4>
          <p className="leading-relaxed text-stone-800 font-normal">
            {location.longDesc}
          </p>
        </div>

        {/* Historical Lore & Context */}
        <div className="bg-amber-50/60 border border-amber-200/70 p-4 rounded-2xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Heritage & Natural Lore
          </h4>
          <p className="text-xs leading-relaxed text-amber-900/90 italic">
            "{location.historyLore}"
          </p>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Key Site Highlights
          </h4>
          <ul className="space-y-2">
            {location.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wildlife & Flora to Spot */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            Highland Wildlife & Flora
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {location.wildlife.map((species, index) => (
              <span 
                key={index}
                className="text-xs bg-stone-100 text-stone-700 border border-stone-200 px-2.5 py-1 rounded-lg font-medium"
              >
                {species}
              </span>
            ))}
          </div>
        </div>

        {/* Adventure & Safety Tips */}
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Explorer Guidelines & Tips
          </h4>
          <ul className="space-y-2">
            {location.adventureTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-stone-700">
                <span className="text-emerald-700 font-bold shrink-0">&bull;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best Time to Visit */}
        <div className="flex items-start gap-3 p-3 bg-blue-50/60 border border-blue-200/80 rounded-2xl text-xs text-blue-900">
          <Calendar className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-blue-950 block">Optimal Exploration Hours</span>
            <span className="text-blue-800/90">{location.bestTimeToVisit}</span>
          </div>
        </div>

        {/* Hiker Guestbook CTA */}
        {onOpenGuestbook && (
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-xs text-amber-950 block">Hiker Guestbook</span>
              <span className="text-[11px] text-amber-800/90">Share your trail notes or read visitor logs for Point #{location.id}</span>
            </div>
            <button
              onClick={() => onOpenGuestbook(location.id)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Log Note</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar between points */}
      <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
        <button
          id="btn-prev-location"
          onClick={() => onNavigateToLocation(prevLocation)}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-800 px-3 py-2 rounded-xl hover:bg-stone-200/70 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>#{prevLocation.id} {prevLocation.name.split(' ')[0]}</span>
        </button>

        <span className="text-xs font-bold text-stone-600">
          {location.id} of 10
        </span>

        <button
          id="btn-next-location"
          onClick={() => onNavigateToLocation(nextLocation)}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-800 px-3 py-2 rounded-xl hover:bg-stone-200/70 transition-colors"
        >
          <span>#{nextLocation.id} {nextLocation.name.split(' ')[0]}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
