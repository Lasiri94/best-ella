import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { LocationPoint, Hotspot } from '../types';
import { 
  Compass, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Play, 
  Pause, 
  ZoomIn, 
  ZoomOut, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

interface PanoramaViewerProps {
  location: LocationPoint;
  onClose?: () => void;
  onSelectHotspot?: (hotspot: Hotspot) => void;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  location,
  onSelectHotspot
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Interaction tracking
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const phi = useRef(0);
  const theta = useRef(0);

  // Component state
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentFov, setCurrentFov] = useState(70);
  const [heading, setHeading] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewMode, setViewMode] = useState<'realistic' | 'vibrant' | 'dusk'>('realistic');

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    setIsLoading(true);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(currentFov, width / height, 1, 1100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // 4. Geometry & Texture
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert geometry so faces point inward
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      location.panoramaImage,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffffff
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        sphereMeshRef.current = mesh;
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading panorama texture:', err);
        // Fallback ambient color sphere
        const fallbackMat = new THREE.MeshBasicMaterial({ color: 0x1e3a2b });
        const mesh = new THREE.Mesh(geometry, fallbackMat);
        scene.add(mesh);
        sphereMeshRef.current = mesh;
        setIsLoading(false);
      }
    );

    // Initial orientation
    lon.current = 0;
    lat.current = 0;

    // Render loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (isAutoRotating && !isDragging.current) {
        lon.current += 0.08;
      }

      // Constrain vertical look
      lat.current = Math.max(-85, Math.min(85, lat.current));

      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      const targetX = 500 * Math.sin(phi.current) * Math.cos(theta.current);
      const targetY = 500 * Math.cos(phi.current);
      const targetZ = 500 * Math.sin(phi.current) * Math.sin(theta.current);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);

      // Update heading (0-360 degrees)
      const currentHeading = (Math.round((lon.current % 360) + 360) % 360);
      setHeading(currentHeading);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (sphereMeshRef.current) {
        sphereMeshRef.current.geometry.dispose();
        if (Array.isArray(sphereMeshRef.current.material)) {
          sphereMeshRef.current.material.forEach((m) => m.dispose());
        } else {
          sphereMeshRef.current.material.dispose();
        }
      }
      renderer.dispose();
    };
  }, [location.panoramaImage]);

  // Color Filter presets for atmospheric mood
  useEffect(() => {
    if (!sphereMeshRef.current) return;
    const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
    if (!mat) return;

    if (viewMode === 'vibrant') {
      mat.color.setHex(0xfff5ea); // warm vivid sun
    } else if (viewMode === 'dusk') {
      mat.color.setHex(0xd6c2b4); // ambient golden twilight
    } else {
      mat.color.setHex(0xffffff); // natural
    }
  }, [viewMode]);

  // Mouse & Touch Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    lon.current -= deltaX * 0.14;
    lat.current += deltaY * 0.14;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const newFov = Math.max(35, Math.min(95, cameraRef.current.fov + e.deltaY * 0.05));
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    setCurrentFov(Math.round(newFov));
  };

  const zoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    const newFov = Math.max(35, cameraRef.current.fov - 10);
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    setCurrentFov(Math.round(newFov));
  }, []);

  const zoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    const newFov = Math.min(95, cameraRef.current.fov + 10);
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    setCurrentFov(Math.round(newFov));
  }, []);

  const resetView = useCallback(() => {
    lon.current = 0;
    lat.current = 0;
    if (cameraRef.current) {
      cameraRef.current.fov = 70;
      cameraRef.current.updateProjectionMatrix();
      setCurrentFov(70);
    }
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getCardinalDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return 'N (North)';
    if (deg >= 22.5 && deg < 67.5) return 'NE';
    if (deg >= 67.5 && deg < 112.5) return 'E (East)';
    if (deg >= 112.5 && deg < 157.5) return 'SE';
    if (deg >= 157.5 && deg < 202.5) return 'S (South)';
    if (deg >= 202.5 && deg < 247.5) return 'SW';
    if (deg >= 247.5 && deg < 292.5) return 'W (West)';
    return 'NW';
  };

  return (
    <div
      id="panorama-viewer-container"
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden bg-stone-950 cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin mb-4" />
          <p className="text-stone-200 font-medium tracking-wide text-sm">
            Calibrating 360° Spherical Photosphere...
          </p>
          <span className="text-xs text-stone-400 mt-1">
            Site #{location.id} &bull; {location.name}
          </span>
        </div>
      )}

      {/* Top Banner overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        {/* Site Header Badge */}
        <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700/60 rounded-xl px-4 py-2 text-white shadow-xl pointer-events-auto flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 font-bold text-sm flex items-center justify-center text-white shadow">
            {location.id}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm sm:text-base text-stone-100 tracking-tight">
                {location.name}
              </h2>
              <span className="text-[10px] uppercase font-semibold tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                360° View
              </span>
            </div>
            <p className="text-xs text-stone-400 flex items-center gap-2">
              <span>{location.elevation}</span>
              <span>&bull;</span>
              <span>{location.category}</span>
            </p>
          </div>
        </div>

        {/* Top Right Controls (Orientation & Compass) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Compass pill */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700/60 rounded-xl px-3 py-1.5 text-xs text-stone-300 flex items-center gap-2 shadow">
            <Compass 
              className="w-4 h-4 text-amber-400 transition-transform duration-200" 
              style={{ transform: `rotate(${-heading}deg)` }}
            />
            <span className="font-mono text-stone-200">{heading}°</span>
            <span className="text-stone-400 font-medium hidden sm:inline">
              {getCardinalDirection(heading)}
            </span>
          </div>

          {/* Atmosphere Preset Selector */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700/60 rounded-xl p-1 flex items-center gap-1 shadow">
            <button
              id="btn-filter-natural"
              title="Natural Daylight"
              onClick={() => setViewMode('realistic')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                viewMode === 'realistic' 
                  ? 'bg-emerald-600 text-white font-medium' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Natural
            </button>
            <button
              id="btn-filter-vibrant"
              title="Vibrant Sunrays"
              onClick={() => setViewMode('vibrant')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                viewMode === 'vibrant' 
                  ? 'bg-amber-600 text-white font-medium' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Sunray
            </button>
            <button
              id="btn-filter-dusk"
              title="Golden Twilight"
              onClick={() => setViewMode('dusk')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                viewMode === 'dusk' 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Twilight
            </button>
          </div>
        </div>
      </div>

      {/* Floating 360 Hotspots layer on bottom left */}
      {location.photosphereHotspots && location.photosphereHotspots.length > 0 && (
        <div className="absolute bottom-20 left-4 z-10 max-w-sm pointer-events-auto">
          <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-3 text-white shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                Site Hotspots & Landmarks
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {location.photosphereHotspots.map((h) => (
                <button
                  key={h.id}
                  id={`hotspot-${h.id}`}
                  onClick={() => {
                    setActiveHotspot(h);
                    // Smoothly orient toward hotspot yaw
                    lon.current = h.yaw;
                    lat.current = h.pitch;
                    onSelectHotspot?.(h);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                    activeHotspot?.id === h.id
                      ? 'bg-emerald-600/90 border-emerald-400 text-white font-medium shadow'
                      : 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700/90'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {h.title}
                </button>
              ))}
            </div>

            {/* Active Hotspot Detail Popup */}
            {activeHotspot && (
              <div className="mt-2.5 pt-2.5 border-t border-stone-700/80 text-xs">
                <div className="flex items-center justify-between text-emerald-300 font-medium mb-1">
                  <span>{activeHotspot.title}</span>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-stone-400 hover:text-white text-[10px] uppercase font-bold"
                  >
                    Close
                  </button>
                </div>
                <p className="text-stone-300 leading-relaxed text-[11px]">
                  {activeHotspot.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Center Drag Hint (fades out on interaction) */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none z-10">
        <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700/60 rounded-full px-4 py-1.5 text-xs text-stone-300 shadow-xl flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Drag to pan 360°
          </span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400">Scroll to Zoom</span>
        </div>
      </div>

      {/* Floating Bottom Right Viewer Toolbar */}
      <div className="absolute bottom-6 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/70 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 text-stone-200">
          {/* Auto rotate toggle */}
          <button
            id="btn-toggle-autorotate"
            title={isAutoRotating ? 'Pause auto-rotation' : 'Start auto-rotation'}
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-xl transition-colors ${
              isAutoRotating 
                ? 'bg-emerald-600/90 text-white' 
                : 'hover:bg-stone-800 text-stone-300'
            }`}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Reset position */}
          <button
            id="btn-reset-view"
            title="Reset to default angle"
            onClick={resetView}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Zoom In */}
          <button
            id="btn-zoom-in"
            title="Zoom In"
            onClick={zoomIn}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            id="btn-zoom-out"
            title="Zoom Out"
            onClick={zoomOut}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            id="btn-toggle-fullscreen"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-stone-800 text-stone-300 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
