import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.use(express.json());

// In-memory guestbook log for hikers and adventurers visiting Clio Ella & Kirindi Oya
interface GuestbookEntry {
  id: string;
  name: string;
  locationOrigin: string;
  rating: number; // 1 to 5
  message: string;
  locationPointId: number;
  locationName: string;
  createdAt: string;
}

const guestbookEntries: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Elena & Lucas',
    locationOrigin: 'Munich, Germany',
    rating: 5,
    message: 'The sunrise from Point 3 (Eagle\'s Ridge) was breathtaking! We could see the clouds drifting into Ella gap. A magical morning hike.',
    locationPointId: 3,
    locationName: 'Eagle\'s Ridge & Misty Gap Overlook',
    createdAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
  },
  {
    id: 'gb-2',
    name: 'Kasun Siriwardena',
    locationOrigin: 'Colombo, Sri Lanka',
    rating: 5,
    message: 'Kirindi Emerald Pools (Point 8) had crystal-clear natural mountain water. The suspension bridge swayed gently and was super fun to cross.',
    locationPointId: 8,
    locationName: 'Kirindi Emerald Pools & Natural Spa',
    createdAt: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
  },
  {
    id: 'gb-3',
    name: 'Chloe Tremblay',
    locationOrigin: 'Montreal, Canada',
    rating: 5,
    message: 'We spotted purple-faced leaf monkeys right near the Bamboo Trail Junction. The 360 panoramas on the map are remarkably accurate to being there in person.',
    locationPointId: 7,
    locationName: 'Bamboo Trail Junction & Spice Path',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
];

// Locations metadata for the Node.js API
const LOCATIONS_METADATA = [
  {
    id: 1,
    name: 'Valley Trailhead & Expedition Base',
    subtitle: 'Gateway to the Kirindi Oya Nature Trails',
    category: 'Trailhead',
    coordinates: { x: 33.5, y: 82.5 },
    elevation: '940 m',
    difficulty: 'Easy',
    trekTime: '0 mins (Start)',
    distanceFromStart: '0.0 km',
    panoramaType: 'bridge',
    shortDesc: 'The starting gateway at the end of the mountain access road, offering handcrafted walking sticks and the first view down toward Kirindi Oya.',
    connectedPoints: [7],
    highlights: [
      'Handcrafted bamboo trekking pole station',
      'Panoramic introductory view of Kirindi valley',
      'Wild cinnamon & aromatic lemongrass borders',
      'Expedition trail map & elevation guide'
    ],
    bestTimeToVisit: '07:00 AM – 09:00 AM for crisp mountain air and active bird calls'
  },
  {
    id: 2,
    name: 'Riverside Eco-Sanctuary & Stargazing Deck',
    subtitle: 'Luxury Glamping on Kirindi Oya Terraces',
    category: 'Eco-Sanctuary',
    coordinates: { x: 43.5, y: 79.0 },
    elevation: '910 m',
    difficulty: 'Easy',
    trekTime: '8 mins',
    distanceFromStart: '0.3 km',
    panoramaType: 'sanctuary',
    shortDesc: 'Safari-style luxury canvas tents on raised teak platforms, an open stone campfire circle, and hammocks strung over river rocks.',
    connectedPoints: [7, 8],
    highlights: [
      'Handmade timber stargazing and yoga platforms',
      'River-rock open campfire pit for twilight gatherings',
      'Hammocks suspended directly over the water rapids',
      'Solar-powered ambient lantern pathways'
    ],
    bestTimeToVisit: '05:30 PM – 09:00 PM for magical sunset light and evening campfire atmosphere'
  },
  {
    id: 3,
    name: "Eagle's Ridge & Misty Gap Overlook",
    subtitle: 'Highland Vantage Point Over Kirindi Gorge',
    category: 'Viewpoint',
    coordinates: { x: 49.0, y: 51.0 },
    elevation: '1,080 m',
    difficulty: 'Moderate',
    trekTime: '35 mins',
    distanceFromStart: '1.4 km',
    panoramaType: 'ridge',
    shortDesc: 'The highest panoramic ridge above the valley, commanding spectacular 360° views of Ella Rock, tea slopes, and the canyon.',
    connectedPoints: [4, 10],
    highlights: [
      'Unobstructed 360° vista of Ella Rock and Little Adam\'s Peak',
      'Dramatic morning cloud inversion phenomenon',
      'Rustic timber bench carved from fallen jackfruit wood',
      'View of the winding Kirindi Oya river shining like silver below'
    ],
    bestTimeToVisit: '06:00 AM – 07:30 AM for sunrise and 04:45 PM for golden hour'
  },
  {
    id: 4,
    name: 'Kirindi Oya Suspension Footbridge',
    subtitle: 'Canopy Walkway Across the White River',
    category: 'Adventure Crossing',
    coordinates: { x: 44.5, y: 53.5 },
    elevation: '925 m',
    difficulty: 'Moderate',
    trekTime: '20 mins',
    distanceFromStart: '0.8 km',
    panoramaType: 'bridge',
    shortDesc: 'A 35-meter timber suspension bridge suspended over roaring river rapids, linking the chalet hillside to the eastern trails.',
    connectedPoints: [3, 5],
    highlights: [
      '35-meter span suspended directly above white river rapids',
      'Canopy-level vantage into giant wild bamboo fronds',
      'Cool river spray blowing up through the wooden footboards',
      'Perfect framing for adventure photography and selfies'
    ],
    bestTimeToVisit: '10:00 AM – 03:00 PM when midday sun penetrates the deep gorge'
  },
  {
    id: 5,
    name: 'Lower Kirindi Cascade & Secret Falls',
    subtitle: 'Tiered Waterfall and Natural Plunge Basin',
    category: 'River & Falls',
    coordinates: { x: 41.5, y: 61.5 },
    elevation: '915 m',
    difficulty: 'Moderate',
    trekTime: '15 mins',
    distanceFromStart: '0.6 km',
    panoramaType: 'waterfall',
    shortDesc: 'A secluded two-tiered waterfall cascading down smooth black granite shelves into an emerald pool with refreshing spray.',
    connectedPoints: [4, 6],
    highlights: [
      'Two-tiered natural granite water cascades',
      'Refreshing cool mountain mist and spray zone',
      'Abundant wild ferns and tropical moss gardens',
      'Natural stone sitting ledges for meditation'
    ],
    bestTimeToVisit: '11:00 AM – 02:00 PM when rainbow prisms appear in the waterfall mist'
  },
  {
    id: 6,
    name: 'Granite Stepping Stones River Crossing',
    subtitle: 'Ancient Natural Ford Across Kirindi Currents',
    category: 'Adventure Crossing',
    coordinates: { x: 41.0, y: 69.5 },
    elevation: '905 m',
    difficulty: 'Moderate',
    trekTime: '12 mins',
    distanceFromStart: '0.5 km',
    panoramaType: 'river',
    shortDesc: 'A series of massive, water-smoothed prehistoric boulders providing a thrilling natural stepping-stone route across the river.',
    connectedPoints: [5, 7],
    highlights: [
      'Smooth granite stepping stones worn over millions of years',
      'Crystal-clear shallows showing shimmering quartz pebbles',
      'Interactive river hop experience across the flowing stream',
      'Shaded riverbank resting grove with bamboo benches'
    ],
    bestTimeToVisit: '09:00 AM – 11:30 AM when water visibility is at its absolute clearest'
  },
  {
    id: 7,
    name: 'Bamboo Trail Junction & Spice Path',
    subtitle: 'Central Crossroads of the Valley Trails',
    category: 'Botanical Trail',
    coordinates: { x: 40.5, y: 75.5 },
    elevation: '920 m',
    difficulty: 'Easy',
    trekTime: '5 mins',
    distanceFromStart: '0.2 km',
    panoramaType: 'bridge',
    shortDesc: 'A serene trail intersection shaded by towering golden bamboo groves, leading north to cascades or south to rock pools.',
    connectedPoints: [1, 2, 6],
    highlights: [
      'Cathedral canopy of 20-meter golden bamboo stalks',
      'Rustic wooden expedition waypost signs',
      'Aromatic wild lemongrass, ginger, and turmeric patches',
      'Gentle shaded gradient ideal for all fitness levels'
    ],
    bestTimeToVisit: 'Anytime; shaded canopy provides all-day cooling comfort'
  },
  {
    id: 8,
    name: 'Kirindi Emerald Pools & Natural Spa',
    subtitle: 'Deep Mountain Rock Basin for Wild Swimming',
    category: 'River & Falls',
    coordinates: { x: 44.5, y: 85.5 },
    elevation: '895 m',
    difficulty: 'Easy-Moderate',
    trekTime: '12 mins',
    distanceFromStart: '0.45 km',
    panoramaType: 'waterfall',
    shortDesc: 'A pristine, crystal-clear emerald swimming basin carved into solid bedrock, sheltered by overhanging tropical trees.',
    connectedPoints: [2, 9],
    highlights: [
      'Pristine natural swimming basin with deep emerald water',
      'Smooth granite sunbathing slabs bordering the pool',
      'Gentle natural hydro-massage under the mini rock ledge',
      'Changing cabana and towel hook station under the trees'
    ],
    bestTimeToVisit: '11:00 AM – 03:30 PM for warm sunlit waters and optimal swimming warmth'
  },
  {
    id: 9,
    name: 'Southern Canyon Rapids & Ravine',
    subtitle: 'Wild Whitewater Gorge and Geological Wonder',
    category: 'River & Falls',
    coordinates: { x: 48.5, y: 92.5 },
    elevation: '870 m',
    difficulty: 'Challenging',
    trekTime: '22 mins',
    distanceFromStart: '0.9 km',
    panoramaType: 'waterfall',
    shortDesc: 'A narrow, steep granite gorge where Kirindi Oya thunders through tight rock channels with dramatic force and roaring power.',
    connectedPoints: [8],
    highlights: [
      'Dramatic geological chasm with vertical granite walls',
      'Thunderous roar of powerful whitewater chutes',
      'High vantage viewing platform suspended over the gorge',
      'Raw, untamed highland nature far from crowds'
    ],
    bestTimeToVisit: '03:00 PM – 05:00 PM when the canyon walls catch rich warm shadows'
  },
  {
    id: 10,
    name: 'Clio Ella Central Pavilion & Panorama Deck',
    subtitle: 'The Heart of Clio Ella Resort',
    category: 'Resort & Dining',
    coordinates: { x: 55.5, y: 60.0 },
    elevation: '960 m',
    difficulty: 'Easy',
    trekTime: '15 mins',
    distanceFromStart: '0.6 km',
    panoramaType: 'ridge',
    shortDesc: 'The architectural centerpiece with an infinity dining terrace, artisanal tea bar, organic restaurant, and 180° valley views.',
    connectedPoints: [3, 2],
    highlights: [
      'Cantilevered timber infinity deck suspended over tea terraces',
      'Artisanal Ceylon single-estate tea bar & cupping room',
      'Organic garden-to-table cuisine featuring local spices',
      'Sunset cocktail lounge with acoustic evening music'
    ],
    bestTimeToVisit: '12:30 PM for relaxed lunch or 05:30 PM for sunset dinner & drinks'
  }
];

const LANDMARKS = [
  {
    id: 'viharathenna',
    name: 'Viharathenna Archaeological Site',
    subtitle: 'Ancient Monastic Ruins & Stone Inscriptions',
    coordinates: { x: 14.0, y: 28.0 },
    type: 'heritage',
    description: 'An ancient monastic complex dating back over a thousand years, featuring stone moonstones, meditating platforms, and hidden rock inscriptions overlooking the Ella hills.'
  },
  {
    id: 'chalets-west',
    name: 'Clio Ella Eco Chalets (West Ridge)',
    subtitle: 'Cliffside Forest Lodges',
    coordinates: { x: 29.5, y: 51.0 },
    type: 'lodging',
    description: 'A private row of luxury wooden chalets nestled along the western contour with direct balconies facing Kirindi Oya.'
  },
  {
    id: 'kirindi-river',
    name: 'Kirindi Oya',
    subtitle: 'Sacred Highland River',
    coordinates: { x: 43.0, y: 35.0 },
    type: 'river',
    description: 'Flowing from the high peaks of Bandarawela through Ella gorge towards the southern plains.'
  }
];

// --- Node.js API Endpoints ---

// 1. Health & Server Telemetry
app.get('/api/health', (_req: Request, res: Response) => {
  const mem = process.memoryUsage();
  res.json({
    status: 'ok',
    service: 'Clio Ella & Kirindi Oya Node.js Expedition Backend',
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    platform: process.platform,
    memoryUsageMB: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
    },
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

// 2. Locations List (with search & filter)
app.get('/api/locations', (req: Request, res: Response) => {
  const { category, search, difficulty } = req.query;

  let results = [...LOCATIONS_METADATA];

  if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
    results = results.filter((loc) =>
      loc.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (difficulty && typeof difficulty === 'string' && difficulty.toLowerCase() !== 'all') {
    results = results.filter((loc) =>
      loc.difficulty.toLowerCase().includes(difficulty.toLowerCase())
    );
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter((loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.subtitle.toLowerCase().includes(q) ||
      loc.shortDesc.toLowerCase().includes(q)
    );
  }

  res.json({
    count: results.length,
    totalPoints: LOCATIONS_METADATA.length,
    locations: results
  });
});

// 3. Location Details by ID
app.get('/api/locations/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const location = LOCATIONS_METADATA.find((loc) => loc.id === id);

  if (!location) {
    res.status(404).json({ error: `Location point #${req.params.id} not found.` });
    return;
  }

  // Find connected neighbors
  const connected = LOCATIONS_METADATA.filter((loc) =>
    location.connectedPoints.includes(loc.id)
  ).map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    elevation: c.elevation,
    trekTime: c.trekTime
  }));

  res.json({
    location,
    connectedNeighbors: connected
  });
});

// 4. Extra Topographic Landmarks
app.get('/api/landmarks', (_req: Request, res: Response) => {
  res.json({
    landmarks: LANDMARKS
  });
});

// 5. Live Trail Conditions & Ranger Status
app.get('/api/trail-status', (_req: Request, res: Response) => {
  res.json({
    trailSystem: 'Kirindi Oya Nature Reserve & Clio Ella Trails',
    overallStatus: 'Open & Favorable',
    riverFlowLevel: 'Moderate Normal Flow (Safe for Stepping Stones)',
    suspensionBridge: 'Open & Inspected',
    mistVisibility: 'Good (850m valley visibility)',
    advisoryNote: 'Morning mist clearing across Eagle\'s Ridge. Footpaths dry and clear. Bamboo walking poles recommended for gorge descents.',
    rangerStation: {
      location: 'Point 1 Trailhead Gateway',
      status: 'Manned & Active',
      emergencyContact: '+94 57 222 8410 (Valley Patrol)',
      operationalHours: '06:00 – 18:30 IST'
    },
    updatedAt: new Date().toISOString()
  });
});

// 6. Microclimate Weather Forecast
app.get('/api/weather', (_req: Request, res: Response) => {
  res.json({
    station: 'Clio Ella Highland Meteorological Sensor',
    locationName: 'Kirindi Oya Gorge, Ella, Badulla District',
    elevationMeters: 960,
    temperatureCelsius: 24.5,
    feelsLikeCelsius: 25.0,
    condition: 'Partly Cloudy & Mountain Mist',
    humidityPercent: 74,
    precipitationChancePercent: 15,
    windSpeedKmh: 8.5,
    windDirection: 'ENE (Gentle Valley Breeze)',
    uvIndex: 4,
    sunrise: '06:04 AM',
    sunset: '18:19 PM',
    lastUpdated: new Date().toISOString()
  });
});

// 7. Expedition Statistics Overview
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    totalPoints: 10,
    totalTrailDistanceKm: 4.2,
    elevationRange: {
      lowest: '870 m (Point 9 Southern Canyon)',
      highest: '1,080 m (Point 3 Eagle\'s Ridge)',
      netElevationVariance: '210 m'
    },
    features: {
      waterfallsAndRapids: 3,
      bridgesAndCrossings: 2,
      viewpointsAndRidges: 2,
      botanicalAndEcoSanctuaries: 2,
      resortPavilion: 1
    },
    photosphereCount: 10,
    activeGuestbookEntries: guestbookEntries.length
  });
});

// 8. Hiker Guestbook (GET & POST)
app.get('/api/guestbook', (_req: Request, res: Response) => {
  res.json({
    count: guestbookEntries.length,
    entries: guestbookEntries
  });
});

app.post('/api/guestbook', (req: Request, res: Response) => {
  const { name, locationOrigin, rating, message, locationPointId } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ error: 'Message cannot be empty' });
    return;
  }

  const pointId = typeof locationPointId === 'number' ? locationPointId : 1;
  const point = LOCATIONS_METADATA.find((p) => p.id === pointId);
  const locationName = point ? point.name : 'Kirindi Oya Valley';

  const newEntry: GuestbookEntry = {
    id: `gb-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: name.trim().slice(0, 50),
    locationOrigin: (locationOrigin || 'Explorer').toString().trim().slice(0, 60),
    rating: Math.min(5, Math.max(1, parseInt(rating, 10) || 5)),
    message: message.trim().slice(0, 400),
    locationPointId: pointId,
    locationName,
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);

  res.status(201).json({
    success: true,
    message: 'Hiker log entry added successfully',
    entry: newEntry
  });
});

// --- Server Lifecycle & Vite Middleware Mounting ---
async function startServer() {
  if (!isProduction) {
    // Mount Vite dev server in middleware mode
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Node.js Backend] Mounted Vite dev middleware');
  } else {
    // Serve production build from dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('[Node.js Backend] Serving static assets from dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Node.js Backend] Clio Ella server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Node.js Backend] Fatal error starting server:', err);
  process.exit(1);
});
