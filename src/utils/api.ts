export interface ServerHealth {
  status: string;
  service: string;
  uptimeSeconds: number;
  nodeVersion: string;
  platform: string;
  memoryUsageMB: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  environment: string;
  timestamp: string;
}

export interface TrailStatus {
  trailSystem: string;
  overallStatus: string;
  riverFlowLevel: string;
  suspensionBridge: string;
  mistVisibility: string;
  advisoryNote: string;
  rangerStation: {
    location: string;
    status: string;
    emergencyContact: string;
    operationalHours: string;
  };
  updatedAt: string;
}

export interface WeatherData {
  station: string;
  locationName: string;
  elevationMeters: number;
  temperatureCelsius: number;
  feelsLikeCelsius: number;
  condition: string;
  humidityPercent: number;
  precipitationChancePercent: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  lastUpdated: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  locationOrigin: string;
  rating: number;
  message: string;
  locationPointId: number;
  locationName: string;
  createdAt: string;
}

export interface TrailStats {
  totalPoints: number;
  totalTrailDistanceKm: number;
  elevationRange: {
    lowest: string;
    highest: string;
    netElevationVariance: string;
  };
  features: {
    waterfallsAndRapids: number;
    bridgesAndCrossings: number;
    viewpointsAndRidges: number;
    botanicalAndEcoSanctuaries: number;
    resortPavilion: number;
  };
  photosphereCount: number;
  activeGuestbookEntries: number;
}

export const api = {
  async getHealth(): Promise<ServerHealth> {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Failed to fetch server health');
    return res.json();
  },

  async getTrailStatus(): Promise<TrailStatus> {
    const res = await fetch('/api/trail-status');
    if (!res.ok) throw new Error('Failed to fetch trail status');
    return res.json();
  },

  async getWeather(): Promise<WeatherData> {
    const res = await fetch('/api/weather');
    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
  },

  async getStats(): Promise<TrailStats> {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async getGuestbook(): Promise<GuestbookEntry[]> {
    const res = await fetch('/api/guestbook');
    if (!res.ok) throw new Error('Failed to fetch guestbook');
    const data = await res.json();
    return data.entries || [];
  },

  async postGuestbook(entry: {
    name: string;
    locationOrigin: string;
    rating: number;
    message: string;
    locationPointId: number;
  }): Promise<GuestbookEntry> {
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit guestbook entry');
    }
    const data = await res.json();
    return data.entry;
  },
};
