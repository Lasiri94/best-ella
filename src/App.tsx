import React, { useState, useCallback } from 'react';
import { LocationPoint } from './types';
import { LOCATIONS_DATA } from './data/locations';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { PanoramaViewer } from './components/PanoramaViewer';
import { SiteDetailPanel } from './components/SiteDetailPanel';
import { LocationListSidebar } from './components/LocationListSidebar';
import { TrailConditionsModal } from './components/TrailConditionsModal';
import { GuestbookModal } from './components/GuestbookModal';
import confetti from 'canvas-confetti';
import { Compass, X, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // Node.js Backend Modals
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [isGuestbookModalOpen, setIsGuestbookModalOpen] = useState(false);
  const [guestbookTargetPointId, setGuestbookTargetPointId] = useState<number>(1);

  // Select location to open 360 view and detail panel
  const handleSelectLocation = useCallback((loc: LocationPoint) => {
    setSelectedLocation(loc);
    // If it's Point 10 (terminus of the expedition), trigger a confetti burst
    if (loc.id === 10) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, []);

  // Return to the Adventure Map
  const handleBackToMap = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  // Start sequential guided tour from Point 1
  const handleStartGuidedTour = useCallback(() => {
    const point1 = LOCATIONS_DATA.find((p) => p.id === 1) || LOCATIONS_DATA[0];
    setSelectedLocation(point1);
    setShowWelcomeModal(false);
  }, []);

  // Open Guestbook for a specific location
  const handleOpenGuestbookForPoint = useCallback((pointId: number) => {
    setGuestbookTargetPointId(pointId);
    setIsGuestbookModalOpen(true);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-stone-900 text-stone-900 font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        selectedLocation={selectedLocation}
        onClearSelectedLocation={handleBackToMap}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenConditions={() => setIsConditionsModalOpen(true)}
        onOpenGuestbook={() => {
          setGuestbookTargetPointId(selectedLocation ? selectedLocation.id : 1);
          setIsGuestbookModalOpen(true);
        }}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left Side: Browse Locations Drawer */}
        <LocationListSidebar
          locations={LOCATIONS_DATA}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
        />

        {/* Center Canvas Area: Either the 360 Panorama Viewer OR the Interactive Adventure Map */}
        <main className="flex-1 relative h-full w-full overflow-hidden">
          {selectedLocation ? (
            /* 360 VR Photosphere Experience */
            <div className="relative w-full h-full">
              <PanoramaViewer
                location={selectedLocation}
                onClose={handleBackToMap}
              />

              {/* Floating Mini-Map in bottom left corner when in 360 mode to quickly hop between pins */}
              <div className="absolute bottom-6 left-6 z-20 hidden md:block">
                <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-2.5 shadow-2xl text-white">
                  <div className="flex items-center justify-between gap-3 mb-2 px-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      Estate Trail Radar
                    </span>
                    <button
                      onClick={handleBackToMap}
                      className="text-[10px] text-stone-400 hover:text-white underline"
                    >
                      Full Map
                    </button>
                  </div>
                  {/* Grid of 10 points for rapid switching */}
                  <div className="grid grid-cols-5 gap-1">
                    {LOCATIONS_DATA.map((pt) => (
                      <button
                        key={pt.id}
                        id={`radar-point-${pt.id}`}
                        onClick={() => handleSelectLocation(pt)}
                        title={`#${pt.id} ${pt.name}`}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                          selectedLocation.id === pt.id
                            ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400'
                            : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                        }`}
                      >
                        {pt.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Adventure Map */
            <AdventureMap
              locations={LOCATIONS_DATA}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
            />
          )}
        </main>

        {/* Right Side: Site Detail Information Panel (Visible when a location is active in 360) */}
        {selectedLocation && (
          <SiteDetailPanel
            location={selectedLocation}
            allLocations={LOCATIONS_DATA}
            onClose={handleBackToMap}
            onNavigateToLocation={handleSelectLocation}
            onOpenGuestbook={handleOpenGuestbookForPoint}
          />
        )}
      </div>

      {/* Welcome & Orientation Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              id="btn-close-welcome"
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 shadow-xs mx-auto">
              <Compass className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-extrabold text-stone-900 mt-3 tracking-tight text-center">
              Interactive Adventure Map & 360° Explorer
            </h2>

            <p className="text-sm text-stone-600 mt-2.5 leading-relaxed text-center">
              Welcome to the digital adventure map of Kirindi Oya and Clio Ella, powered by a full-stack Node.js server. All 10 points of interest are ready for you to explore:
            </p>

            <div className="mt-4 space-y-2.5 bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  1
                </span>
                <span><strong>Click any numbered pin (1–10)</strong> to enter an immersive 360° photosphere.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  2
                </span>
                <span><strong>Drag & pan 360°</strong>, zoom in/out, and discover interactive site hotspots inside the scene.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  3
                </span>
                <span><strong>Live Trail & Weather</strong>: Real-time telemetry, microclimate metrics, and visitor guestbook via Node.js backend.</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                id="btn-welcome-explore-map"
                onClick={() => setShowWelcomeModal(false)}
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all text-center"
              >
                Explore Adventure Map
              </button>
              <button
                id="btn-welcome-start-tour"
                onClick={handleStartGuidedTour}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Start Tour from Point #1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Conditions & Weather Modal (Node.js API) */}
      <TrailConditionsModal
        isOpen={isConditionsModalOpen}
        onClose={() => setIsConditionsModalOpen(false)}
      />

      {/* Hiker Guestbook & Visitor Log Modal (Node.js API) */}
      <GuestbookModal
        isOpen={isGuestbookModalOpen}
        onClose={() => setIsGuestbookModalOpen(false)}
        defaultLocationId={guestbookTargetPointId}
      />
    </div>
  );
}
