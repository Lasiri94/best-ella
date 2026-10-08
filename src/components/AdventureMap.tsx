import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LocationPoint, MapViewMode, LocationCategory } from '../types';
import { RESORT_EXTRA_LANDMARKS } from '../data/locations';
import adventureMapImage from '../assets/images/adventure_map_base_1789146808589.jpg';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  Compass, 
  Layers, 
  Sparkles, 
  Eye, 
  Footprints,
  RotateCcw,
  Navigation,
  MapPin
} from 'lucide-react';

interface AdventureMapProps {
  locations: LocationPoint[];
  selectedLocation: LocationPoint | null;
  onSelectLocation: (loc: LocationPoint) => void;
  filterCategory: string;
  onFilterChange: (category: string) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  filterCategory,
  onFilterChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pan and zoom states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [hoveredLocation, setHoveredLocation] = useState<LocationPoint | null>(null);
  const [mapMode, setMapMode] = useState<MapViewMode>('illustrated');
  const [showTrailPath, setShowTrailPath] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.8));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary mouse button
    setIsPanning(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch pan handling
  const touchStart = useRef({ x: 0, y: 0 });
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      touchStart.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && e.touches.length === 1) {
      setPan({
        x: e.touches[0].clientX - touchStart.current.x,
        y: e.touches[0].clientY - touchStart.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom((prev) => Math.max(0.8, Math.min(prev + zoomFactor, 3.5)));
  };

  // Filtered locations
  const filteredLocations = locations.filter((loc) => {
    if (filterCategory === 'All') return true;
    return loc.category === filterCategory;
  });

  return (
    <div 
      id="adventure-map-viewport"
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-stone-900 select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Map Content Layer with Transform */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out origin-center flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Fullscreen Map Artboard filling the whole screen without black stripes */}
        <div 
          className="relative w-full h-full overflow-hidden pointer-events-auto bg-emerald-950"
        >
          {/* Mode 1: Illustrated Adventure Map Artwork */}
          {mapMode === 'illustrated' && (
            <div className="absolute inset-0 z-0">
              <img
                src={adventureMapImage}
                alt="Illustrated Adventure Map of Kirindi Oya"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
              />
            </div>
          )}

          {/* Mode 2: Topographical Explorer Vector Canvas */}
          {mapMode === 'topographic' && (
            <div className="absolute inset-0 z-0 bg-[#eef7ee] text-stone-800">
              {/* Contour lines simulation */}
              <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="contourPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2d6a4f" strokeWidth="1" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#2d6a4f" strokeWidth="1" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#2d6a4f" strokeWidth="1" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#2d6a4f" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#contourPattern)" />
              </svg>
            </div>
          )}

          {/* Mode 3: Original Map Reference Mode */}
          {mapMode === 'comparison' && (
            <div className="absolute inset-0 z-0 bg-[#d8f3dc]">
              {/* Stylized representation of the exact user layout */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <span className="text-emerald-950 font-bold tracking-widest uppercase text-xl">
                  Geographical Topography Alignment
                </span>
              </div>
            </div>
          )}

          {/* Dynamic SVG River & Trails Layer (matches exact geometry) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* River water gradient */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.85" />
              </linearGradient>

              {/* Glowing trail effect */}
              <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Kirindi Oya River Path (Exact curve matching user's map) */}
            {/* Starts top-center, curves left to (35, 25), then down (42, 44), (41, 62), (39, 78), (47, 92), (52, 100) */}
            <path
              d="M 18 0 Q 25 18 35 25 T 44 44 T 41 62 T 39 78 T 46 92 L 52 100"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
            {/* Animated water flow ripple */}
            <path
              d="M 18 0 Q 25 18 35 25 T 44 44 T 41 62 T 39 78 T 46 92 L 52 100"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              strokeLinecap="round"
              className="animate-pulse"
              strokeOpacity="0.9"
            />

            {/* Winding mountain road from bottom-left (Points 1 entrance) */}
            <path
              d="M 10 70 Q 15 64 18 70 T 22 62 T 26 78 T 33.5 82.5"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeDasharray="1.5 1"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* West Chalets access branch */}
            <path
              d="M 22 62 Q 26 56 29.5 51"
              fill="none"
              stroke="#fde047"
              strokeWidth="0.9"
              strokeDasharray="1 1"
              opacity="0.7"
            />

            {/* Adventure Hiking Trail Connecting 1 to 10 */}
            {showTrailPath && (
              <path
                d="M 33.5 82.5 Q 37 79 40.5 75.5 Q 40.8 72.5 41 69.5 Q 41.2 65.5 41.5 61.5 Q 43 57.5 44.5 53.5 Q 46.8 52 49 51 Q 52 55.5 55.5 60 Q 49.5 69.5 43.5 79 Q 44 82.2 44.5 85.5 Q 46.5 89 48.5 92.5"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.75"
                strokeDasharray="1.2 1.2"
                strokeLinecap="round"
                filter="url(#trailGlow)"
              />
            )}
          </svg>

          {/* River Label on Map */}
          <div 
            className="absolute z-10 pointer-events-none -rotate-70 text-[10px] sm:text-xs font-bold tracking-widest text-sky-800 drop-shadow-sm uppercase"
            style={{ left: '41.5%', top: '42%' }}
          >
            Kirindi Oya
          </div>

          {/* External Landmark Badges (Viharathenna, Clio Chalets, etc.) */}
          {RESORT_EXTRA_LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-default"
              style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
            >
              <div className="bg-stone-900/80 backdrop-blur-md border border-stone-600/80 text-white px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{landmark.name}</span>
              </div>
            </div>
          ))}

          {/* Interactive Points of Interest Pins (1 to 10) */}
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const isHovered = hoveredLocation?.id === loc.id;

            return (
              <div
                key={loc.id}
                id={`map-pin-${loc.id}`}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                style={{
                  left: `${loc.coordinates.x}%`,
                  top: `${loc.coordinates.y}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLocation(loc);
                }}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Outer pulsing radar ring */}
                <span
                  className={`absolute -inset-2 rounded-full pointer-events-none transition-all duration-300 ${
                    isSelected
                      ? 'bg-rose-500/40 animate-ping'
                      : 'bg-emerald-400/20 group-hover:bg-emerald-400/40 group-hover:animate-ping'
                  }`}
                />

                {/* Pin Button */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-115 ${
                    isSelected
                      ? 'scale-125 z-30'
                      : 'hover:z-30'
                  }`}
                >
                  {/* Pin Body */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-sm sm:text-base shadow-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-rose-600 border-white text-white ring-4 ring-rose-500/50 shadow-rose-900/50'
                        : 'bg-emerald-700 hover:bg-emerald-600 border-amber-300 text-amber-100 ring-2 ring-emerald-900/40 shadow-emerald-950/60'
                    }`}
                  >
                    {loc.id}
                  </div>

                  {/* 360 Camera badge on pin */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[9px] font-bold shadow-xs border border-white">
                    360
                  </div>
                </div>

                {/* Permanent or Hover Title Tag */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isSelected || isHovered
                      ? 'opacity-100 translate-y-0 scale-100 z-40'
                      : 'opacity-90 -translate-y-0.5 scale-95'
                  }`}
                >
                  <div className="bg-stone-950/90 backdrop-blur-md text-white border border-stone-700/90 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-xl shadow-xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{loc.name.split(' ')[0]}</span>
                    <span className="text-stone-400 hidden sm:inline">&bull; {loc.elevation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Map Controls & Info Overlays */}

      {/* Top Left: Title & Map Layer Toggles */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-sm">
        <div 
          className="backdrop-blur-md border border-stone-700/80 rounded-2xl p-3 text-white shadow-2xl"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <h1 
              className="text-sm sm:text-base font-bold tracking-tight"
              style={{ color: '#6a6a68' }}
            >
              Kirindi Oya & Clio Ella
            </h1>
          </div>
          <p className="text-xs text-stone-400 leading-snug">
            Interactive Adventure Map &bull; 10 Verified Points of Interest
          </p>

          {/* Map style selector */}
          <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center gap-1">
            <button
              id="btn-map-illustrated"
              onClick={() => setMapMode('illustrated')}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                mapMode === 'illustrated'
                  ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-xs'
                  : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:text-white'
              }`}
            >
              Adventure Map
            </button>
            <button
              id="btn-map-topographic"
              onClick={() => setMapMode('topographic')}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                mapMode === 'topographic'
                  ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-xs'
                  : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:text-white'
              }`}
            >
              Topography
            </button>
            <button
              id="btn-toggle-trail"
              onClick={() => setShowTrailPath(!showTrailPath)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                showTrailPath
                  ? 'bg-amber-600/80 border-amber-500 text-white font-semibold'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400'
              }`}
            >
              <Footprints className="w-3 h-3" />
              Trail
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Center: Instruction Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-full px-4 py-1.5 text-xs text-stone-300 shadow-xl flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Click any numbered point (1–10) to enter immersive 360° view</span>
        </div>
      </div>

      {/* Bottom Right: Zoom & Navigation Controls */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2">
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 text-stone-200">
          <button
            id="btn-map-zoom-in"
            title="Zoom In"
            onClick={handleZoomIn}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="btn-map-zoom-out"
            title="Zoom Out"
            onClick={handleZoomOut}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="btn-map-reset"
            title="Reset Map View"
            onClick={handleReset}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            id="btn-map-fullscreen"
            title={isFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"}
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border-t border-stone-800/80 pt-1.5"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-emerald-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
