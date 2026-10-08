export type LocationCategory = 
  | 'Trailhead'
  | 'River & Falls'
  | 'Viewpoint'
  | 'Adventure Crossing'
  | 'Eco-Sanctuary'
  | 'Botanical Trail'
  | 'Resort & Dining';

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  yaw: number;   // Horizontal angle in degrees (-180 to 180)
  pitch: number; // Vertical angle in degrees (-90 to 90)
  icon?: string;
}

export interface LocationPoint {
  id: number; // 1 to 10 matching user markings
  name: string;
  subtitle: string;
  category: LocationCategory;
  coordinates: {
    x: number; // Percentage 0-100 on the map
    y: number; // Percentage 0-100 on the map
  };
  elevation: string;
  difficulty: 'Easy' | 'Moderate' | 'Easy-Moderate' | 'Challenging';
  trekTime: string;
  distanceFromStart: string;
  panoramaImage: string;
  panoramaType: 'waterfall' | 'ridge' | 'bridge' | 'river' | 'sanctuary';
  shortDesc: string;
  longDesc: string;
  historyLore: string;
  highlights: string[];
  wildlife: string[];
  adventureTips: string[];
  bestTimeToVisit: string;
  photosphereHotspots: Hotspot[];
  connectedPoints: number[]; // Next logical points on the trail
}

export type MapViewMode = 'illustrated' | 'topographic' | 'comparison';
