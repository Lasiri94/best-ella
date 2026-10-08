import { LocationPoint } from '../types';

import panoRiverWaterfall from '../assets/images/pano_river_waterfall_1789146822440.jpg';
import panoResortRidge from '../assets/images/pano_resort_ridge_1789146836160.jpg';
import panoJungleBridge from '../assets/images/pano_jungle_bridge_1789146855227.jpg';

export const LOCATIONS_DATA: LocationPoint[] = [
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
    panoramaImage: panoJungleBridge,
    panoramaType: 'bridge',
    shortDesc: 'The starting gateway at the end of the mountain access road, offering handcrafted walking sticks and the first view down toward Kirindi Oya.',
    longDesc: 'Nestled at the terminus of the winding mountain road from Ella town, the Valley Trailhead is the ceremonial beginning of the expedition. Here, shaded by wild cinnamon trees and giant flowering acacia, travelers transition from vehicular transit to natural earth footpaths. A rustic timber briefing hut provides estate maps and carved bamboo trekking poles before leading downhill towards the riverbank.',
    historyLore: 'Historically, this hillside trail was trodden by Ceylon tea pluckers and estate foresters in the early 20th century. The granite milestone markers along the border still mark the boundary of the highland reserve.',
    highlights: [
      'Handcrafted bamboo trekking pole station',
      'Panoramic introductory view of Kirindi valley',
      'Wild cinnamon & aromatic lemongrass borders',
      'Expedition trail map & elevation guide'
    ],
    wildlife: [
      'Purple-faced Leaf Monkey (Semnopithecus vetulus)',
      'Sri Lanka Hanging Parrot (Loriculus beryllinus)',
      'Highland Bronze Skink'
    ],
    adventureTips: [
      'Equip yourself with a bamboo trekking pole before the river descent',
      'Check morning cloud coverage for rain preparedness',
      'Keep hydrated — elevation drops ~50m toward the riverbed'
    ],
    bestTimeToVisit: '07:00 AM – 09:00 AM for crisp mountain air and active bird calls',
    photosphereHotspots: [
      { id: '1-a', title: 'Mountain Access Road', description: 'Winding scenic road leading up from the Ella gap pass.', yaw: 200, pitch: -10 },
      { id: '1-b', title: 'Jungle Path Descent', description: 'Earthen trail winding through lush foliage towards Point 7.', yaw: 30, pitch: -15 },
      { id: '1-c', title: 'Trekking Stick Depot', description: 'Select an authentic bamboo walking staff for the expedition.', yaw: -80, pitch: -5 }
    ],
    connectedPoints: [7]
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
    panoramaImage: panoResortRidge,
    panoramaType: 'sanctuary',
    shortDesc: 'Safari-style luxury canvas tents on raised teak platforms, an open stone campfire circle, and hammocks strung over river rocks.',
    longDesc: 'Positioned on an alluvial river terrace shaded by towering teak trees, this eco-sanctuary offers complete immersion in the sights and sounds of the flowing water. High-grade safari tents feature open-air rain showers, comfortable king-size daybeds, and private viewing decks. In the twilight hours, the stone campfire becomes an intimate gathering spot for spiced tea, warm roasted cashew nuts, and acoustic music.',
    historyLore: 'Designed in harmony with sustainable bio-architecture guidelines, every deck is elevated on stilts to let monsoon runoff and nocturnal wildlife traverse freely beneath without disrupting the ecosystem.',
    highlights: [
      'Handmade timber stargazing and yoga platforms',
      'River-rock open campfire pit for twilight gatherings',
      'Hammocks suspended directly over the water rapids',
      'Solar-powered ambient lantern pathways'
    ],
    wildlife: [
      'Nocturnal Fireflies illuminating the canopy',
      'Sri Lanka Junglefowl (National Bird)',
      'Giant Flying Squirrel gliding between teak trees'
    ],
    adventureTips: [
      'Join the 7:00 PM campfire for freshly brewed ginger-cardamom tea',
      'Keep tent zipper screens closed to keep curious forest geckos out',
      'Bring a warm sweater for chilly mountain evenings'
    ],
    bestTimeToVisit: '05:30 PM – 09:00 PM for magical sunset light and evening campfire atmosphere',
    photosphereHotspots: [
      { id: '2-a', title: 'Riverside Glamping Tent', description: 'Safari canvas shelter on elevated teak timber deck.', yaw: 45, pitch: 0 },
      { id: '2-b', title: 'Campfire Circle', description: 'Granite hearth where guests gather under starlit skies.', yaw: -120, pitch: -20 },
      { id: '2-c', title: 'Kirindi Water Rapids', description: 'The soothing white waters of Kirindi Oya rushing past.', yaw: 160, pitch: -10 }
    ],
    connectedPoints: [7, 8]
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
    panoramaImage: panoResortRidge,
    panoramaType: 'ridge',
    shortDesc: 'The highest panoramic ridge above the valley, commanding spectacular 360° views of Ella Rock, tea slopes, and the canyon.',
    longDesc: 'Perched upon a weathered granite bluff high above the river, Eagle\'s Ridge is the crown jewel for photographers and trekkers. Standing here, the entire topography of the Kirindi Oya river basin unfurls below like a living green tapestry. On clear mornings, you can watch clouds rolling through the Ella gap pass, with distant views extending towards the southern plains of Wellawaya.',
    historyLore: 'Ancient lookout chronicles suggest this high ridge was utilized during the Kingdom of Ruhuna as a signal post, transmitting beacon fires across the central mountain passes to the southern coast.',
    highlights: [
      'Unobstructed 360° vista of Ella Rock and Little Adam\'s Peak',
      'Dramatic morning cloud inversion phenomenon',
      'Rustic timber bench carved from fallen jackfruit wood',
      'View of the winding Kirindi Oya river shining like silver below'
    ],
    wildlife: [
      'Black Eagle (Ictinaetus malaiensis) soaring thermals',
      'Crested Serpent Eagle scanning the tree line',
      'Highland Swallowtail butterflies'
    ],
    adventureTips: [
      'Arrive by 06:15 AM to witness sunrise rays illuminating the valley mist',
      'Bring a telephoto lens or binoculars for distant mountain ridges',
      'The trail climb includes stone steps; wear sturdy hiking shoes'
    ],
    bestTimeToVisit: '06:00 AM – 07:30 AM for sunrise and 04:45 PM for golden hour',
    photosphereHotspots: [
      { id: '3-a', title: 'Ella Rock Silhouette', description: 'Massive iconic cliff rising across the southeastern valley.', yaw: -40, pitch: 5 },
      { id: '3-b', title: 'Kirindi Gorge Below', description: 'Steep canyon where the river carves through ancient granite.', yaw: 110, pitch: -25 },
      { id: '3-c', title: 'Ceylon Tea Terraces', description: 'Emerald hillside plots producing famous high-grown black tea.', yaw: -150, pitch: -10 }
    ],
    connectedPoints: [4, 10]
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
    panoramaImage: panoJungleBridge,
    panoramaType: 'bridge',
    shortDesc: 'A 35-meter timber suspension bridge suspended over roaring river rapids, linking the chalet hillside to the eastern trails.',
    longDesc: 'Suspended 8 meters above the swirling torrents of Kirindi Oya, this wooden footbridge is an exhilarating centerpiece of the adventure trail. Built with thick steel cables and rustic timber planks, it sways gently as you walk across, giving adventurers an unmatched bird\'s-eye view into the foaming river rapids and mossy boulder fields beneath.',
    historyLore: 'Reconstructed by local craftsmen using traditional rope-tensioning engineering combined with modern safety cables, honoring the historic pedestrian rope bridges of the Uva province.',
    highlights: [
      '35-meter span suspended directly above white river rapids',
      'Canopy-level vantage into giant wild bamboo fronds',
      'Cool river spray blowing up through the wooden footboards',
      'Perfect framing for adventure photography and selfies'
    ],
    wildlife: [
      'Common Kingfisher diving from overhangs',
      'Asian Water Monitor swimming across the pools',
      'Dragonflies with shimmering turquoise wings'
    ],
    adventureTips: [
      'Hold the side guide cables while walking across the swinging span',
      'Early morning mist can make wooden slats slick — walk carefully',
      'Maximum 6 persons on the bridge at one time for optimal stability'
    ],
    bestTimeToVisit: '10:00 AM – 03:00 PM when midday sun penetrates the deep gorge',
    photosphereHotspots: [
      { id: '4-a', title: 'Swirling River Rapids', description: 'Frothing white water rushing around prehistoric boulders.', yaw: 0, pitch: -30 },
      { id: '4-b', title: 'Eastern Trail Ascent', description: 'Stone-carved pathway leading toward Point 3 and 10.', yaw: 90, pitch: 0 },
      { id: '4-c', title: 'Western Chalet Forest', description: 'Row of eco-lodges peeking through the highland canopy.', yaw: -90, pitch: 5 }
    ],
    connectedPoints: [3, 5]
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
    panoramaImage: panoRiverWaterfall,
    panoramaType: 'waterfall',
    shortDesc: 'A secluded two-tiered waterfall cascading down smooth black granite shelves into an emerald pool with refreshing spray.',
    longDesc: 'Where Kirindi Oya takes a dramatic plunge over ancient Precambrian granite shelves, the Lower Kirindi Cascade fills the air with the continuous roar of rushing water. Surrounded by wild maidenhair ferns, blooming wild ginger, and endemic orchids, the waterfall creates a perpetual cool microclimate where temperatures drop by several degrees.',
    historyLore: 'Local folklore tells of subterranean river spirits (Kumbhandas) who protected the pristine water source for ancient hermits meditating in nearby hillside caves.',
    highlights: [
      'Two-tiered natural granite water cascades',
      'Refreshing cool mountain mist and spray zone',
      'Abundant wild ferns and tropical moss gardens',
      'Natural stone sitting ledges for meditation'
    ],
    wildlife: [
      'Sri Lanka Torrent Toad (Adenomus kelaartii)',
      'Sri Lanka Whistling Thrush near the water spray',
      'Freshwater Mountain Crabs among crevices'
    ],
    adventureTips: [
      'Protect electronic devices from persistent fine water mist',
      'Rocks near the splash zone are slippery — stay on designated lookouts',
      'Take a moment to sit and practice mindful deep breathing'
    ],
    bestTimeToVisit: '11:00 AM – 02:00 PM when rainbow prisms appear in the waterfall mist',
    photosphereHotspots: [
      { id: '5-a', title: 'Upper Cascade Tier', description: 'Water dropping over the 6-meter upper granite ledge.', yaw: 10, pitch: 10 },
      { id: '5-b', title: 'Lower Emerald Pool', description: 'Swirling deep basin where the cascade decelerates.', yaw: 0, pitch: -25 },
      { id: '5-c', title: 'Lush Fern Alcove', description: 'Thick tapestry of wild highland ferns thriving in spray.', yaw: -70, pitch: -5 }
    ],
    connectedPoints: [4, 6]
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
    panoramaImage: panoRiverWaterfall,
    panoramaType: 'river',
    shortDesc: 'A series of massive, water-smoothed prehistoric boulders providing a thrilling natural stepping-stone route across the river.',
    longDesc: 'At this wider, shallower segment of Kirindi Oya, nature has placed an array of colossal water-worn gneiss boulders. Adventurers can step stone to stone across the crystalline river, feeling the cool water rush around their ankles and observing aquatic life in the sunlit shallows.',
    historyLore: 'For centuries prior to modern roads, this rock ford was a vital crossing for villagers transporting betel leaves, wild honey, and mountain spices from the slopes of Ella to the Badulla valley.',
    highlights: [
      'Smooth granite stepping stones worn over millions of years',
      'Crystal-clear shallows showing shimmering quartz pebbles',
      'Interactive river hop experience across the flowing stream',
      'Shaded riverbank resting grove with bamboo benches'
    ],
    wildlife: [
      'Ceylon Stone Sucker (Garra ceylonensis)',
      'Green Forest Lizard perched on warm granite',
      'White-breasted Waterhen darting along the reeds'
    ],
    adventureTips: [
      'Do not attempt crossing if river waters turn muddy or brown (sign of flash rain upstream)',
      'Step in the center of dry boulders for best shoe traction',
      'Great spot to dip your feet in the cool mountain water'
    ],
    bestTimeToVisit: '09:00 AM – 11:30 AM when water visibility is at its absolute clearest',
    photosphereHotspots: [
      { id: '6-a', title: 'Granite Stepping Boulder', description: 'Flat-topped boulder serving as the primary river walkway.', yaw: 180, pitch: -30 },
      { id: '6-b', title: 'Upstream Rapids View', description: 'Looking upstream towards the cascading rapids of Point 5.', yaw: -10, pitch: 0 },
      { id: '6-c', title: 'Shaded Riverbank Grove', description: 'Dense grove of wild ficus and wild ginger trees.', yaw: -110, pitch: -10 }
    ],
    connectedPoints: [5, 7]
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
    panoramaImage: panoJungleBridge,
    panoramaType: 'bridge',
    shortDesc: 'A serene trail intersection shaded by towering golden bamboo groves, leading north to cascades or south to rock pools.',
    longDesc: 'The pivotal crossroads where the trailhead path meets the main river trail. A towering grove of golden bamboo forms a natural Gothic archway overhead, their hollow trunks chiming softly in the mountain breeze. Trail signs carved into weathered wood point adventurers towards the upstream waterfalls or downstream swimming havens.',
    historyLore: 'The bamboo clumps here were planted generations ago to stabilize the riverbank soil during heavy monsoon seasons, creating one of the oldest living grove networks in the estate.',
    highlights: [
      'Cathedral canopy of 20-meter golden bamboo stalks',
      'Rustic wooden expedition waypost signs',
      'Aromatic wild lemongrass, ginger, and turmeric patches',
      'Gentle shaded gradient ideal for all fitness levels'
    ],
    wildlife: [
      'Ceylon Birdwing (Troides darsius) — Sri Lanka\'s largest butterfly',
      'Tickell\'s Blue Flycatcher singing in the bamboo thicket',
      'Toque Macaque (Endemic highland monkey troop)'
    ],
    adventureTips: [
      'Check the trail marker signs for estimated trek times in each direction',
      'Look up into the bamboo culms to spot roosting hornbills',
      'A great midpoint to drink water and re-tie trekking boots'
    ],
    bestTimeToVisit: 'Anytime; shaded canopy provides all-day cooling comfort',
    photosphereHotspots: [
      { id: '7-a', title: 'Golden Bamboo Culms', description: 'Enormous 20m bamboo stalks creating a shaded tunnel.', yaw: 70, pitch: 25 },
      { id: '7-b', title: 'Southbound Pool Path', description: 'Trail heading toward Glamping (Point 2) and Emerald Pools (Point 8).', yaw: 160, pitch: -10 },
      { id: '7-c', title: 'Northbound Falls Path', description: 'Trail leading to River Crossing (Point 6) and Falls (Point 5).', yaw: -30, pitch: -10 }
    ],
    connectedPoints: [1, 2, 6]
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
    panoramaImage: panoRiverWaterfall,
    panoramaType: 'waterfall',
    shortDesc: 'A pristine, crystal-clear emerald swimming basin carved into solid bedrock, sheltered by overhanging tropical trees.',
    longDesc: 'Widely celebrated as the most inviting natural swimming sanctuary along Kirindi Oya. Over thousands of years, swirling river currents carved a deep, calm rock basin filled with mineral-rich mountain water. Sunlight filters through the tropical canopy, illuminating the glowing jade-green depths and smooth underwater stone ledges where swimmers can relax.',
    historyLore: 'Local elders recount that royal retinues traveling from the ancient Dhowa rock temple would bathe in these emerald pools to cleanse and rejuvenate on long highland journeys.',
    highlights: [
      'Pristine natural swimming basin with deep emerald water',
      'Smooth granite sunbathing slabs bordering the pool',
      'Gentle natural hydro-massage under the mini rock ledge',
      'Changing cabana and towel hook station under the trees'
    ],
    wildlife: [
      'Smooth-coated Otter occasional sightings in early dawn',
      'Sri Lanka Spot-winged Thrush',
      'Native freshwater glass prawns in sheltered rocky nooks'
    ],
    adventureTips: [
      'Test water depth before diving — submerged rock ledges exist',
      'River temperature is around 20°C (68°F); wonderfully refreshing after hiking',
      'Life jackets are available on the bank for relaxed floating'
    ],
    bestTimeToVisit: '11:00 AM – 03:30 PM for warm sunlit waters and optimal swimming warmth',
    photosphereHotspots: [
      { id: '8-a', title: 'Emerald Plunge Basin', description: 'Deep jade-green mountain pool perfect for a swim.', yaw: 0, pitch: -20 },
      { id: '8-b', title: 'Sunbathing Granite Slabs', description: 'Naturally warmed flat rocks for relaxing after swimming.', yaw: 110, pitch: -15 },
      { id: '8-c', title: 'Overhanging Canopy', description: 'Wild figs and tropical banyans shading the water surface.', yaw: -80, pitch: 30 }
    ],
    connectedPoints: [2, 9]
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
    panoramaImage: panoRiverWaterfall,
    panoramaType: 'waterfall',
    shortDesc: 'A narrow, steep granite gorge where Kirindi Oya thunders through tight rock channels with dramatic force and roaring power.',
    longDesc: 'The southernmost point of the estate exploration trail. Here, the valley contracts into a steep-sided ravine of dark, sculpted rock. The river accelerates into dramatic whitewater chutes, crashing over submerged granite jaws before disappearing down toward the lower Uva plains. A reinforced timber viewing platform allows adventurers to peer safely into the roaring heart of the canyon.',
    historyLore: 'Geologists classify this formation as a major fault-line gorge formed during the tectonic uplift of the Central Highlands of Sri Lanka hundreds of millions of years ago.',
    highlights: [
      'Dramatic geological chasm with vertical granite walls',
      'Thunderous roar of powerful whitewater chutes',
      'High vantage viewing platform suspended over the gorge',
      'Raw, untamed highland nature far from crowds'
    ],
    wildlife: [
      'Peregrine Falcon nesting in high canyon crags',
      'Highland Rock Bats emerging at dusk',
      'Rare wild river moss and lichens adhering to wet cliffs'
    ],
    adventureTips: [
      'Swimming is strictly prohibited here due to violent underwater currents',
      'Remain behind safety timber railings at all times',
      'Wear shoes with good grip on the steep trail descent'
    ],
    bestTimeToVisit: '03:00 PM – 05:00 PM when the canyon walls catch rich warm shadows',
    photosphereHotspots: [
      { id: '9-a', title: 'Canyon Churning Chute', description: 'Whitewater accelerating through a narrow granite throat.', yaw: 15, pitch: -35 },
      { id: '9-b', title: 'Vertical Cliff Faces', description: 'Ancient Precambrian gneiss rock walls towering overhead.', yaw: -70, pitch: 20 },
      { id: '9-c', title: 'Canyon Lookout Platform', description: 'Sturdy timber balustrade offering safe views of the gorge.', yaw: 160, pitch: -10 }
    ],
    connectedPoints: [8]
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
    panoramaImage: panoResortRidge,
    panoramaType: 'ridge',
    shortDesc: 'The architectural centerpiece with an infinity dining terrace, artisanal tea bar, organic restaurant, and 180° valley views.',
    longDesc: 'Gracefully terraced into the eastern slope, the Clio Ella Central Pavilion blends luxury eco-architecture with the surrounding wilderness. Constructed with reclaimed teak, hand-chiseled river stones, and an expansive cantilevered observation deck, guests can savor farm-to-table Sri Lankan culinary creations while gazing across the Kirindi Oya valley and distant tea slopes.',
    historyLore: 'Inspired by traditional Uva mountain dwellings (Gedige) and tropical modernism pioneered by Geoffrey Bawa, designed to catch natural mountain drafts without requiring mechanical air conditioning.',
    highlights: [
      'Cantilevered timber infinity deck suspended over tea terraces',
      'Artisanal Ceylon single-estate tea bar & cupping room',
      'Organic garden-to-table cuisine featuring local spices',
      'Sunset cocktail lounge with acoustic evening music'
    ],
    wildlife: [
      'Sri Lanka Gray Hornbill in the surrounding canopy',
      'Hummingbird-like Sunbirds feeding on red ixora blossoms',
      'Geoffroy\'s Cat sightings on distant forest edges'
    ],
    adventureTips: [
      'Try the signature Kirindi Sunset Mocktail (passionfruit, lemongrass & mint)',
      'Reserve a deck table in advance for dinner under the highland stars',
      'Estate naturalists offer guided botanical walks departing from here'
    ],
    bestTimeToVisit: '12:30 PM for relaxed lunch or 05:30 PM for sunset dinner & drinks',
    photosphereHotspots: [
      { id: '10-a', title: 'Cantilevered Viewing Deck', description: 'Panoramic outdoor terrace overlooking the river valley.', yaw: 0, pitch: -5 },
      { id: '10-b', title: 'Artisanal Tea Lounge', description: 'Cozy interior pavilion serving premium Ceylon single-estate brews.', yaw: -130, pitch: 0 },
      { id: '10-c', title: 'Tea Slope Terraces', description: 'Estate tea gardens cascading down towards Kirindi Oya.', yaw: 90, pitch: -20 }
    ],
    connectedPoints: [3, 2]
  }
];

export const RESORT_EXTRA_LANDMARKS = [
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
