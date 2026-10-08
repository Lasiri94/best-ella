import React from 'react';
import { 
  Map, 
  ListOrdered, 
  ChevronRight,
  Mountain,
  CloudSun,
  MessageSquare
} from 'lucide-react';
import { LocationPoint } from '../types';

interface NavbarProps {
  selectedLocation: LocationPoint | null;
  onClearSelectedLocation: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenConditions: () => void;
  onOpenGuestbook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedLocation,
  onClearSelectedLocation,
  isSidebarOpen,
  onToggleSidebar,
  onOpenConditions,
  onOpenGuestbook,
}) => {
  return (
    <header className="h-16 border-b border-stone-200 bg-white/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-40 shrink-0 shadow-xs">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onClearSelectedLocation}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Mountain className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-900 tracking-tight text-sm sm:text-base">
                Best of Ella - Clio Ella
              </span>
            </div>
          </div>
        </button>

        {/* Breadcrumb if currently in 360 view */}
        {selectedLocation && (
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-stone-200 text-xs text-stone-500">
            <button
              onClick={onClearSelectedLocation}
              className="hover:text-emerald-700 font-medium transition-colors"
            >
              Map
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-lg">
              #{selectedLocation.id} {selectedLocation.name}
            </span>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Return to Map Button (if currently viewing 360) */}
        {selectedLocation && (
          <button
            id="btn-nav-return-map"
            onClick={onClearSelectedLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Adventure Map</span>
          </button>
        )}

        {/* Live Trail Conditions & Weather (Node.js API) */}
        <button
          id="btn-nav-conditions"
          onClick={onOpenConditions}
          title="Live Trail Telemetry & Weather (Node.js API)"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-sky-200 bg-sky-50/80 hover:bg-sky-100 text-sky-900 text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          <CloudSun className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden md:inline">Live Weather</span>
        </button>

        {/* Hiker Guestbook (Node.js API) */}
        <button
          id="btn-nav-guestbook"
          onClick={onOpenGuestbook}
          title="Hiker Logbook & Guestbook (Node.js API)"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline">Guestbook</span>
        </button>

        {/* Points of interest drawer toggle */}
        <button
          id="btn-toggle-locations-list"
          onClick={onToggleSidebar}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border text-xs font-semibold rounded-xl transition-all ${
            isSidebarOpen
              ? 'bg-stone-900 text-white border-stone-900'
              : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Sites (10)</span>
        </button>
      </div>
    </header>
  );
};
