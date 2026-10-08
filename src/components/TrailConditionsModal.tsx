import React, { useEffect, useState } from 'react';
import { 
  X, 
  CloudSun, 
  ShieldCheck, 
  Waves, 
  Wind, 
  Thermometer, 
  Compass, 
  Droplets, 
  Sun, 
  RefreshCw,
  Server,
  Activity
} from 'lucide-react';
import { api, TrailStatus, WeatherData, ServerHealth } from '../utils/api';

interface TrailConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailConditionsModal: React.FC<TrailConditionsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [trailStatus, setTrailStatus] = useState<TrailStatus | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [health, setHealth] = useState<ServerHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statusData, weatherData, healthData] = await Promise.all([
        api.getTrailStatus(),
        api.getWeather(),
        api.getHealth(),
      ]);
      setTrailStatus(statusData);
      setWeather(weatherData);
      setHealth(healthData);
    } catch (err) {
      console.error('Failed to load trail telemetry from Node.js server:', err);
      setError('Unable to reach Node.js telemetry service. Please check server status.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                Live Trail Telemetry & Weather
              </h3>
              <p className="text-xs text-stone-500">
                Kirindi Oya Nature Trails &bull; Powered by Node.js API
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              title="Refresh telemetry"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Live Weather Card */}
        {weather && (
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-5 mb-5 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Microclimate Sensor Station
                </span>
                <h4 className="text-xl font-bold mt-0.5">{weather.condition}</h4>
                <p className="text-xs text-emerald-200 mt-1">{weather.locationName}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold tracking-tight">
                  {weather.temperatureCelsius}°C
                </span>
                <p className="text-xs text-emerald-300">Feels like {weather.feelsLikeCelsius}°C</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-emerald-700/60 text-xs">
              <div className="bg-emerald-950/40 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="font-semibold">Humidity</span>
                </div>
                <span className="text-base font-bold">{weather.humidityPercent}%</span>
              </div>
              <div className="bg-emerald-950/40 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
                  <Wind className="w-3.5 h-3.5" />
                  <span className="font-semibold">Wind</span>
                </div>
                <span className="text-base font-bold">{weather.windSpeedKmh} km/h</span>
              </div>
              <div className="bg-emerald-950/40 rounded-xl p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
                  <Sun className="w-3.5 h-3.5" />
                  <span className="font-semibold">UV Index</span>
                </div>
                <span className="text-base font-bold">{weather.uvIndex} (Moderate)</span>
              </div>
            </div>
          </div>
        )}

        {/* Trail Status Grid */}
        {trailStatus && (
          <div className="space-y-3 mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Trail Conditions & Safety
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">Kirindi River Flow</span>
                  <span className="text-stone-600">{trailStatus.riverFlowLevel}</span>
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">Suspension Bridge</span>
                  <span className="text-stone-600">{trailStatus.suspensionBridge}</span>
                </div>
              </div>
            </div>

            {/* Advisory */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900">
              <span className="font-bold block mb-1">Ranger Advisory Note:</span>
              <p className="text-amber-800 leading-relaxed">{trailStatus.advisoryNote}</p>
            </div>

            {/* Ranger Station */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 block">Expedition Ranger Station</span>
                <span className="text-stone-500">{trailStatus.rangerStation.location} ({trailStatus.rangerStation.operationalHours})</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {trailStatus.rangerStation.status}
              </span>
            </div>
          </div>
        )}

        {/* Node.js Health Telemetry Footer */}
        {health && (
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>Node.js {health.nodeVersion} &bull; Express Backend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-700">Online ({health.uptimeSeconds}s uptime)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
