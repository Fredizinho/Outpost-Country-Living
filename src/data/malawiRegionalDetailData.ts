import { GeoFeatureGeometry, RingCoords, PolygonCoords, MultiPolygonCoords } from './malawiGeoData';

export type DetachedRegionId = 'northern' | 'central' | 'southern';

export interface RegionalBoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface MountainPeak {
  name: string;
  altitudeMeters: number;
  lat: number;
  lng: number;
  description: string;
}

export interface TerrainProfile {
  name: string;
  zoneType: 'Alpine Highland' | 'High Plateau' | 'Rolling Midland' | 'Rift Valley Escarpment' | 'Lakeshore Plain' | 'Depression Lowland';
  altitudeRange: string;
  description: string;
  peaks: MountainPeak[];
}

export interface SoilZone {
  id: string;
  name: string;
  classification: string;
  phRange: string;
  texture: string;
  fertility: 'High' | 'Very High' | 'Moderate' | 'Specialized';
  color: string;
  polygon: [number, number][]; // [lng, lat]
  recommendedCrops: string[];
  notes: string;
}

export interface RainfallIsohyet {
  id: string;
  label: string;
  rangeMm: string;
  annualMmAvg: number;
  color: string;
  polygon: [number, number][]; // [lng, lat]
  rainyPattern: string;
  droughtVulnerability: 'Low' | 'Moderate' | 'High';
}

export interface CropHotspot {
  id: string;
  cropName: string;
  chichewaName?: string;
  category: 'Staple Grain' | 'High-Value Cash Crop' | 'Horticulture' | 'Tree Crop / Orchard' | 'Legume / Pulse';
  lat: number;
  lng: number;
  harvestWindow: string;
  suitabilityScore: string;
  notes: string;
}

export interface RoadArtery {
  id: string;
  code: string;
  name: string;
  surface: 'Bitumen Paved Highway' | 'All-Weather Graded' | 'Secondary Feeder Road';
  points: { lat: number; lng: number }[];
  color: string;
  keyStops: string[];
  freightSuitability: string;
}

export interface WaterArtery {
  id: string;
  name: string;
  type: 'Perennial River' | 'Lakeshore Basin' | 'Alpine Waterfall / Cascade' | 'Storage Dam / Reservoir';
  points: { lat: number; lng: number }[];
  flowReliability: 'Year-Round (Perennial)' | 'Seasonal High-Flow' | 'Permanent Water Body';
  irrigationPotential?: string;
  irrigationCapacity: string;
  notes: string;
}

export interface RegionalSettlement {
  id: string;
  name: string;
  type: 'Commercial Hub / City' | 'District Boma' | 'Strategic Agro-Trading Centre' | 'Border Transit Point';
  lat: number;
  lng: number;
  populationEstimate: string;
  marketDays: string;
  keyAgroServices: string[];
}

export interface ForestConservation {
  id: string;
  name: string;
  type: 'National Park' | 'Plantation Pine Forest' | 'Montane Rainforest Reserve' | 'Wildlife Reserve' | 'Biosphere Forest';
  hectares: string;
  lat: number;
  lng: number;
  polygon: [number, number][]; // [lng, lat]
  keyFloraFauna: string[];
  conservationStatus: string;
  ecologicalFunction: string;
}

export interface DetachedRegionDetails {
  id: DetachedRegionId;
  name: string;
  shortName: string;
  tagline: string;
  adminCapital: string;
  areaKm2: number;
  populationEstimate: string;
  bounds: RegionalBoundingBox;
  terrain: TerrainProfile;
  soilZones: SoilZone[];
  rainfallZones: RainfallIsohyet[];
  mainCrops: CropHotspot[];
  roads: RoadArtery[];
  rivers: WaterArtery[];
  settlements: RegionalSettlement[];
  forests: ForestConservation[];
  overallAgroSuitability: string;
  waterIndependenceRating: 'Superior (Gravity Springflow)' | 'High (Plentiful Groundwater)' | 'Moderate (Strategic Boreholes Needed)';
  homesteadVerdict: string;
}

/**
 * Projects a lat/lng coordinate inside specific regional bounds to SVG coordinate space
 */
export function projectGeoToRegionSvg(
  lat: number,
  lng: number,
  bounds: RegionalBoundingBox,
  viewBoxWidth: number = 720,
  viewBoxHeight: number = 620,
  padding: number = 40
): { x: number; y: number } {
  const midLat = (bounds.minLat + bounds.maxLat) / 2;
  const cosMidLat = Math.cos((midLat * Math.PI) / 180);

  const usableWidth = viewBoxWidth - padding * 2;
  const usableHeight = viewBoxHeight - padding * 2;

  const geoWidth = (bounds.maxLng - bounds.minLng) * cosMidLat;
  const geoHeight = bounds.maxLat - bounds.minLat;

  const scale = Math.min(usableWidth / geoWidth, usableHeight / geoHeight);

  const xOffset = padding + (usableWidth - geoWidth * scale) / 2;
  const yOffset = padding + (usableHeight - geoHeight * scale) / 2;

  const x = xOffset + (lng - bounds.minLng) * cosMidLat * scale;
  const y = yOffset + (bounds.maxLat - lat) * scale;

  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

/**
 * Converts geo coordinates array to SVG path string for regional bounds
 */
export function regionPolygonToSvgPath(
  coords: [number, number][],
  bounds: RegionalBoundingBox,
  viewBoxWidth: number = 720,
  viewBoxHeight: number = 620,
  padding: number = 40
): string {
  if (!coords || coords.length === 0) return '';
  return coords
    .map((pt, idx) => {
      const { x, y } = projectGeoToRegionSvg(pt[1], pt[0], bounds, viewBoxWidth, viewBoxHeight, padding);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';
}

export function regionGeomToSvgPath(
  geom: GeoFeatureGeometry,
  bounds: RegionalBoundingBox,
  viewBoxWidth: number = 720,
  viewBoxHeight: number = 620,
  padding: number = 40
): string {
  const convertRing = (ring: RingCoords) => {
    return ring
      .map((pt, idx) => {
        const { x, y } = projectGeoToRegionSvg(pt[1], pt[0], bounds, viewBoxWidth, viewBoxHeight, padding);
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';
  };

  if (geom.type === 'Polygon') {
    return (geom.coordinates as PolygonCoords).map(convertRing).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as MultiPolygonCoords)
      .map((poly) => poly.map(convertRing).join(' '))
      .join(' ');
  }
  return '';
}

// -------------------------------------------------------------
// DETACHED REGIONAL DATA DEFINITIONS
// -------------------------------------------------------------

export const DETACHED_REGIONS_DATA: Record<DetachedRegionId, DetachedRegionDetails> = {
  // =========================================================================
  // 1. NORTHERN REGION (Chitipa, Karonga, Rumphi, Mzimba, Nkhata Bay, Likoma)
  // =========================================================================
  northern: {
    id: 'northern',
    name: 'Northern Region',
    shortName: 'North',
    tagline: 'High-Altitude Alpine Sanctuaries, Perennial Streams & Macadamia Belts',
    adminCapital: 'Mzuzu City',
    areaKm2: 26931,
    populationEstimate: '2.3 Million',
    bounds: {
      minLat: -12.35,
      maxLat: -9.28,
      minLng: 32.70,
      maxLng: 34.90
    },
    terrain: {
      name: 'Northern Highland & Nyika Plateau Complex',
      zoneType: 'Alpine Highland',
      altitudeRange: '480m (Lakeshore) – 2,606m (Nyika Peak)',
      description: 'Rugged highlands dominated by the high Nyika Plateau, Misuku Hills, and Viphya Mountains dropping steeply into Lake Malawi.',
      peaks: [
        { name: 'Nganda Peak (Nyika)', altitudeMeters: 2606, lat: -10.45, lng: 33.82, description: 'Malawi\'s second highest point; rolling montane grassland and cold microclimate.' },
        { name: 'Misuku Ridge', altitudeMeters: 2124, lat: -9.67, lng: 33.52, description: 'Premier specialty Arabica coffee microclimate with volcanic soil origins.' },
        { name: 'Viphya Range Peak', altitudeMeters: 1954, lat: -11.85, lng: 33.85, description: 'Misty plateau home to the vast pine plantations and fresh mountain streams.' },
        { name: 'Livingstonia Escarpment', altitudeMeters: 1420, lat: -10.60, lng: 34.12, description: 'Dramatic cliffside perch overlooking the northern waters of Lake Malawi.' }
      ]
    },
    soilZones: [
      {
        id: 'n-soil-1',
        name: 'Highland Humic Peat & Mountain Loam',
        classification: 'Humic Acrisols & Dystric Cambisols (FAO HWSD v2.0)',
        phRange: 'pH 5.2 - 6.0',
        texture: 'Deep crumbly organic loam rich in humus',
        fertility: 'Very High',
        color: '#854d0e',
        polygon: [
          [33.40, -9.50], [33.95, -9.50], [34.10, -10.80], [33.60, -10.90], [33.40, -9.50]
        ],
        recommendedCrops: ['Arabica Coffee', 'Apples', 'Wheat', 'Irish Potatoes', 'Tea', 'Macadamia'],
        notes: 'Exceptional water retention, low risk of erosion when terraced, naturally weed-suppressive humus topsoil.'
      },
      {
        id: 'n-soil-2',
        name: 'Mzimba Red Ferralitic Sandy Clay Loam',
        classification: 'Rhodic Ferralsols',
        phRange: 'pH 5.6 - 6.4',
        texture: 'Deep porous red sandy clay loam',
        fertility: 'High',
        color: '#c2410c',
        polygon: [
          [33.10, -11.00], [34.00, -11.00], [34.10, -12.20], [33.20, -12.20], [33.10, -11.00]
        ],
        recommendedCrops: ['Maize', 'Soya Beans', 'Groundnuts', 'Sunflower', 'Pasture Grasses', 'Beekeeping'],
        notes: 'Broad rolling plateaus ideal for agroforestry, animal grazing, and mechanised broadfork no-till cultivation.'
      },
      {
        id: 'n-soil-3',
        name: 'Nkhata Bay / Lakeshore Alluvial Silt',
        classification: 'Eutric Fluvisols & Humic Ferralsols (FAO HWSD v2.0)',
        phRange: 'pH 6.2 - 7.0',
        texture: 'Silky alluvial river silt and lacustrine sands',
        fertility: 'High',
        color: '#d97706',
        polygon: [
          [34.10, -11.30], [34.60, -11.30], [34.40, -12.30], [34.05, -12.30], [34.10, -11.30]
        ],
        recommendedCrops: ['Cassava', 'Irrigated Paddy Rice', 'Bananas', 'Rubber', 'Mangos', 'Tilapia Fish Farming'],
        notes: 'Abundant sub-surface moisture from perennial lake breezes; requires zero irrigation for drought-hardy roots.'
      }
    ],
    rainfallZones: [
      {
        id: 'n-rain-1',
        label: 'Super-Humid Highland Belt (1,800 - 2,400mm)',
        rangeMm: '1,800 - 2,400mm / year',
        annualMmAvg: 2100,
        color: '#0284c7',
        polygon: [
          [33.50, -9.40], [34.20, -9.40], [34.40, -11.60], [33.70, -11.60], [33.50, -9.40]
        ],
        rainyPattern: 'Extended 7-month rainy season (Nov – May) with frequent morning mountain mist.',
        droughtVulnerability: 'Low'
      },
      {
        id: 'n-rain-2',
        label: 'Mzimba Plateau Agro-Rainfall (1,100 - 1,500mm)',
        rangeMm: '1,100 - 1,500mm / year',
        annualMmAvg: 1300,
        color: '#0d9488',
        polygon: [
          [33.00, -11.20], [34.00, -11.20], [33.90, -12.30], [33.00, -12.30], [33.00, -11.20]
        ],
        rainyPattern: 'Reliable unimodal summer rains with strong groundwater aquifer replenishment.',
        droughtVulnerability: 'Low'
      },
      {
        id: 'n-rain-3',
        label: 'Karonga Valley Lowland (750 - 1,000mm)',
        rangeMm: '750 - 1,000mm / year',
        annualMmAvg: 880,
        color: '#eab308',
        polygon: [
          [33.60, -9.35], [34.10, -9.35], [34.25, -10.20], [33.75, -10.20], [33.60, -9.35]
        ],
        rainyPattern: 'Warm tropical rains with river overflow supporting double-crop rice basins.',
        droughtVulnerability: 'Moderate'
      }
    ],
    mainCrops: [
      { id: 'nc-1', cropName: 'Misuku Arabica Coffee', chichewaName: 'Khofi wa Misuku', category: 'High-Value Cash Crop', lat: -9.67, lng: 33.55, harvestWindow: 'May – August', suitabilityScore: '98% (World Class)', notes: 'Grown at 1,700m - 2,000m; premium single-origin washed Arabica exported globally.' },
      { id: 'nc-2', cropName: 'Apples & Stone Fruit', chichewaName: 'Zipatso za Maapulo', category: 'Tree Crop / Orchard', lat: -10.55, lng: 33.80, harvestWindow: 'December – March', suitabilityScore: '94% (Highland Chill)', notes: 'Requires 400+ chill hours met easily in Nyika and upper Viphya hollows.' },
      { id: 'nc-3', cropName: 'Macadamia Nut Orchards', chichewaName: 'Mtedza wa Macadamia', category: 'Tree Crop / Orchard', lat: -11.45, lng: 34.05, harvestWindow: 'April – July', suitabilityScore: '95% (High Yield)', notes: 'Thrives in warm-humid transition zones of Nkhata Bay and Mzuzu peripheries.' },
      { id: 'nc-4', cropName: 'Irish Potatoes', chichewaName: 'Mbatata za Chizungu', category: 'Staple Grain', lat: -10.90, lng: 33.70, harvestWindow: 'Bi-annual (April & Oct)', suitabilityScore: '96% (Disease Free)', notes: 'Cold nights prevent blight; yields exceed 18 tonnes per hectare without synthetic fertilizer.' },
      { id: 'nc-5', cropName: 'Paddy Rice (Hara & Chilumba)', chichewaName: 'Mpunga wa pa Hara', category: 'Staple Grain', lat: -10.15, lng: 34.15, harvestWindow: 'May – July', suitabilityScore: '92% (Gravity Canal)', notes: 'Fed by North Rukuru and Lake coastal streams with zero pumping required.' },
      { id: 'nc-6', cropName: 'Cassava', chichewaName: 'Chinangwa Chokhazikika', category: 'Staple Grain', lat: -11.60, lng: 34.30, harvestWindow: 'Year-Round', suitabilityScore: '99% (Drought Immunity)', notes: 'Primary food security crop along the entire northern shoreline corridor.' }
    ],
    roads: [
      {
        id: 'nr-1',
        code: 'M1',
        name: 'M1 Northern Trans-National Spine',
        surface: 'Bitumen Paved Highway',
        color: '#f59e0b',
        points: [
          { lat: -9.40, lng: 33.80 },
          { lat: -9.93, lng: 33.93 },
          { lat: -10.55, lng: 34.05 },
          { lat: -11.46, lng: 34.02 },
          { lat: -11.90, lng: 33.60 },
          { lat: -12.35, lng: 33.50 }
        ],
        keyStops: ['Songwe Border', 'Karonga Boma', 'Chiweta Hills', 'Rumphi Turnoff', 'Mzuzu City', 'Mzimba Boma', 'Jenda Border'],
        freightSuitability: 'Heavy freight line connecting Malawi to Tanzania port of Dar es Salaam.'
      },
      {
        id: 'nr-2',
        code: 'M5',
        name: 'M5 Lakeshore Artery (North)',
        surface: 'Bitumen Paved Highway',
        color: '#38bdf8',
        points: [
          { lat: -11.46, lng: 34.02 },
          { lat: -11.60, lng: 34.30 },
          { lat: -11.85, lng: 34.15 },
          { lat: -12.35, lng: 34.10 }
        ],
        keyStops: ['Mzuzu City', 'Nkhata Bay Harbor', 'Chintheche Beaches', 'Dwangwa'],
        freightSuitability: 'Vital eco-tourism, agricultural produce, and rubber haulage highway.'
      },
      {
        id: 'nr-3',
        code: 'M26',
        name: 'M26 Rumphi – Nyika Alpine Connector',
        surface: 'All-Weather Graded',
        color: '#10b981',
        points: [
          { lat: -10.80, lng: 33.85 },
          { lat: -10.60, lng: 33.80 },
          { lat: -10.45, lng: 33.82 }
        ],
        keyStops: ['Rumphi Boma', 'Bolero Trading Centre', 'Nyika Gate', 'Chelinda Camp'],
        freightSuitability: 'Access road for highland agro-produce, seed potato transport, and national park supplies.'
      }
    ],
    rivers: [
      {
        id: 'nw-1',
        name: 'South Rukuru River',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -12.20, lng: 33.70 },
          { lat: -11.60, lng: 33.50 },
          { lat: -11.00, lng: 33.85 },
          { lat: -10.75, lng: 34.18 }
        ],
        irrigationCapacity: 'Tremendous; drains >12,000 km² basin supporting 25,000+ hectares of potential irrigation.',
        notes: 'Flows north through Mzimba plains then cuts east through Rumphi gorge into Lake Malawi.'
      },
      {
        id: 'nw-2',
        name: 'North Rukuru River',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -10.30, lng: 33.60 },
          { lat: -10.05, lng: 33.80 },
          { lat: -9.93, lng: 33.95 }
        ],
        irrigationCapacity: 'Feeds the Hara irrigation rice scheme and provides pure highland catchment water.',
        notes: 'Originates in the high Nyika wilderness and stays unpolluted along its entire course.'
      },
      {
        id: 'nw-3',
        name: 'Luweya River & Manchewe Falls',
        type: 'Alpine Waterfall / Cascade',
        flowReliability: 'Permanent Water Body',
        points: [
          { lat: -11.65, lng: 34.00 },
          { lat: -11.75, lng: 34.25 }
        ],
        irrigationCapacity: 'Perennial micro-hydro power potential and direct gravity water off-takes.',
        notes: 'Drops over 300 meters from high Viphya plateau to lake level, powering off-grid permaculture systems.'
      },
      {
        id: 'nw-4',
        name: 'Songwe Frontier River',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -9.50, lng: 33.30 },
          { lat: -9.40, lng: 33.80 }
        ],
        irrigationCapacity: 'Major international basin providing alluvial soil renewal and unlimited solar pumping.',
        notes: 'Forms the northern frontier border with Tanzania.'
      }
    ],
    settlements: [
      { id: 'ns-1', name: 'Mzuzu City', type: 'Commercial Hub / City', lat: -11.46, lng: 34.02, populationEstimate: '220,000', marketDays: 'Daily Central Market + Saturday Wholesale', keyAgroServices: ['Mzuzu University Agro-Lab', 'Commercial Cold Storage', 'TNM/Airtel 5G Hub', 'Fertilizer & Seed Depots'] },
      { id: 'ns-2', name: 'Karonga Boma', type: 'District Boma', lat: -9.93, lng: 33.93, populationEstimate: '65,000', marketDays: 'Tuesday & Friday', keyAgroServices: ['Rice Milling Co-ops', 'Cross-Border Logistics', 'Borehole Drilling Contractors'] },
      { id: 'ns-3', name: 'Rumphi Boma', type: 'District Boma', lat: -10.80, lng: 33.85, populationEstimate: '38,000', marketDays: 'Monday & Thursday', keyAgroServices: ['Highland Seed Distribution', 'Coffee Washing Stations', 'Extension Agriculture Office'] },
      { id: 'ns-4', name: 'Mzimba Boma', type: 'District Boma', lat: -11.90, lng: 33.60, populationEstimate: '42,000', marketDays: 'Wednesday & Saturday', keyAgroServices: ['Livestock Dip Tanks', 'Grain Silos (ADMARC)', 'Tractor Rental Co-op'] },
      { id: 'ns-5', name: 'Nkhata Bay', type: 'Strategic Agro-Trading Centre', lat: -11.60, lng: 34.30, populationEstimate: '28,000', marketDays: 'Daily Lake Market', keyAgroServices: ['Fish Drying Facilities', 'Ferry Port to Likoma Island', 'Lakeshore Nursery Hub'] },
      { id: 'ns-6', name: 'Livingstonia Mission', type: 'Strategic Agro-Trading Centre', lat: -10.60, lng: 34.12, populationEstimate: '12,000', marketDays: 'Saturday', keyAgroServices: ['Historic Stone Masonry Guilds', 'Gravity Water Reticulation', 'Organic Herbal Cooperative'] }
    ],
    forests: [
      {
        id: 'nf-1',
        name: 'Nyika National Park Wilderness',
        type: 'National Park',
        hectares: '3,200 km²',
        lat: -10.50,
        lng: 33.80,
        polygon: [
          [33.50, -10.20], [34.00, -10.20], [34.05, -10.90], [33.45, -10.90], [33.50, -10.20]
        ],
        keyFloraFauna: ['Endemic Orchids (200+ species)', 'Zambezian Montane Heath', 'Eland', 'Roan Antelope', 'Leopard'],
        conservationStatus: 'Strict Nature Reserve & Biosphere Candidate',
        ecologicalFunction: 'Primary water tower supplying rain and river flows to 4 Northern districts.'
      },
      {
        id: 'nf-2',
        name: 'Viphya Forest Plantation (Chikangawa)',
        type: 'Plantation Pine Forest',
        hectares: '53,000 ha',
        lat: -11.85,
        lng: 33.80,
        polygon: [
          [33.65, -11.70], [34.00, -11.70], [33.95, -12.20], [33.60, -12.20], [33.65, -11.70]
        ],
        keyFloraFauna: ['Pinus patula', 'Pinus kesiya', 'Eucalyptus grandis', 'Indigenous riparian miombo'],
        conservationStatus: 'Commercial & Watershed Sustainable Forestry',
        ecologicalFunction: 'Africa\'s largest man-made forest; generates massive microclimatic rain cooling effect.'
      },
      {
        id: 'nf-3',
        name: 'Mughese & Uzumara Rainforest Reserves',
        type: 'Montane Rainforest Reserve',
        hectares: '8,500 ha',
        lat: -9.65,
        lng: 33.55,
        polygon: [
          [33.48, -9.60], [33.65, -9.60], [33.65, -9.75], [33.48, -9.75], [33.48, -9.60]
        ],
        keyFloraFauna: ['Aningeria adolfi-friedericii', 'Tree Ferns', 'Wild Arabica relatives', 'Rare Sunbirds'],
        conservationStatus: 'Virgin Indigenous Cloud Forest',
        ecologicalFunction: 'Acts as moisture condenser creating perennial springflow for Misuku coffee terraces.'
      }
    ],
    overallAgroSuitability: 'Grade A+ (Superior Highland Sanctuary)',
    waterIndependenceRating: 'Superior (Gravity Springflow)',
    homesteadVerdict: 'The premier region in Malawi for completely off-grid retreats needing reliable gravity-fed spring water, cool temperate climate, zero malaria pressure at elevation, and premium export crops.'
  },

  // =========================================================================
  // 2. CENTRAL REGION (Kasungu, Nkhotakota, Ntchisi, Dowa, Salima, Lilongwe, Mchinji, Dedza, Ntcheu)
  // =========================================================================
  central: {
    id: 'central',
    name: 'Central Region',
    shortName: 'Central',
    tagline: 'Malawi\'s Breadbasket, High Volcanic Ridges & Extensive Arable Plains',
    adminCapital: 'Lilongwe (National Capital City)',
    areaKm2: 35592,
    populationEstimate: '7.5 Million',
    bounds: {
      minLat: -15.15,
      maxLat: -12.35,
      minLng: 32.65,
      maxLng: 34.95
    },
    terrain: {
      name: 'Central Plateau, Dedza Mountain & Lake Basin',
      zoneType: 'High Plateau',
      altitudeRange: '480m (Lakeshore) – 2,198m (Dedza Peak)',
      description: 'Expansive fertile undulating agricultural plateaus flanked by the high mist-covered Dedza/Kirk mountains to the south and the rift valley lakeshore to the east.',
      peaks: [
        { name: 'Dedza Mountain Peak', altitudeMeters: 2198, lat: -14.37, lng: 34.33, description: 'Highest peak in Central Malawi with cool pine forest and apple orchards.' },
        { name: 'Chongoni Mountain (UNESCO)', altitudeMeters: 2100, lat: -14.28, lng: 34.22, description: 'Granite inselberg complex with ancient rock art and rich endemic flora.' },
        { name: 'Tsangano / Kirk Range', altitudeMeters: 1750, lat: -14.82, lng: 34.63, description: 'Vegetable farming ridge with year-round cool breeze and deep volcanic soil.' },
        { name: 'Ntchisi Mountain Peak', altitudeMeters: 1640, lat: -13.37, lng: 33.95, description: 'Pristine rainforest canopy rising dramatically above the central plain.' }
      ]
    },
    soilZones: [
      {
        id: 'c-soil-1',
        name: 'Lilongwe Deep Red Ferric Lixisol',
        classification: 'Ferric Lixisols & Luvisols',
        phRange: 'pH 6.0 - 6.8',
        texture: 'Deep, rich structured red clay loam with excellent cation exchange',
        fertility: 'Very High',
        color: '#9a3412',
        polygon: [
          [33.10, -13.50], [34.10, -13.50], [34.20, -14.50], [33.10, -14.50], [33.10, -13.50]
        ],
        recommendedCrops: ['Maize (Commercial & Heirloom)', 'Soya Beans', 'Groundnuts', 'Sunflower', 'Tomatoes', 'Paprika'],
        notes: 'Malawi\'s premier grain production soil; excellent nutrient holding capacity and easy tilth.'
      },
      {
        id: 'c-soil-2',
        name: 'Dedza & Ntcheu Volcanic Humic Loam',
        classification: 'Eutric & Humic Nitisols (FAO HWSD v2.0)',
        phRange: 'pH 5.8 - 6.5',
        texture: 'Deep volcanic friable crumbly clay loam',
        fertility: 'Very High',
        color: '#7c2d12',
        polygon: [
          [34.10, -14.20], [34.75, -14.20], [34.80, -15.10], [34.20, -15.10], [34.10, -14.20]
        ],
        recommendedCrops: ['Irish Potatoes', 'Garlic', 'Onions', 'Cabbage', 'Apples', 'Wheat', 'Dairy Pastures'],
        notes: 'Feeds Lilongwe and Blantyre markets daily with cool-season vegetables.'
      },
      {
        id: 'c-soil-3',
        name: 'Bua & Linthipe Alluvial Dambo Silts',
        classification: 'Gleysols & Hydromorphic Fluvisols',
        phRange: 'pH 6.5 - 7.2',
        texture: 'Black and grey organic silt rich in moisture',
        fertility: 'High',
        color: '#451a03',
        polygon: [
          [33.20, -12.80], [34.30, -12.80], [34.35, -13.50], [33.20, -13.50], [33.20, -12.80]
        ],
        recommendedCrops: ['Off-season Winter Vegetables', 'Green Maize', 'Rice', 'Sugarcane', 'Beans'],
        notes: 'Sub-surface water table <2 meters during the dry season enables continuous solar irrigation.'
      }
    ],
    rainfallZones: [
      {
        id: 'c-rain-1',
        label: 'Dedza / Ntchisi Highland Mist Belt (1,300 - 1,600mm)',
        rangeMm: '1,300 - 1,600mm / year',
        annualMmAvg: 1450,
        color: '#0284c7',
        polygon: [
          [34.15, -14.15], [34.70, -14.15], [34.75, -15.05], [34.20, -15.05], [34.15, -14.15]
        ],
        rainyPattern: 'Prolonged rains with winter "Chiperoni" cool drizzle keeping soil humid year-round.',
        droughtVulnerability: 'Low'
      },
      {
        id: 'c-rain-2',
        label: 'Central Plateau Main Agricultural Belt (950 - 1,200mm)',
        rangeMm: '950 - 1,200mm / year',
        annualMmAvg: 1080,
        color: '#0d9488',
        polygon: [
          [32.80, -13.00], [34.00, -13.00], [34.10, -14.40], [32.80, -14.40], [32.80, -13.00]
        ],
        rainyPattern: 'Predictable unimodal rains from mid-November to early April with high solar radiation.',
        droughtVulnerability: 'Low'
      },
      {
        id: 'c-rain-3',
        label: 'Salima & Nkhotakota Lakeshore Zone (850 - 1,150mm)',
        rangeMm: '850 - 1,150mm / year',
        annualMmAvg: 980,
        color: '#eab308',
        polygon: [
          [34.20, -12.50], [34.60, -12.50], [34.50, -14.10], [34.10, -14.10], [34.20, -12.50]
        ],
        rainyPattern: 'Intense convective summer storms supported by unlimited Lake Malawi irrigation recharge.',
        droughtVulnerability: 'Moderate'
      }
    ],
    mainCrops: [
      { id: 'cc-1', cropName: 'Commercial & Heirloom Maize', chichewaName: 'Chimanga Chodzala', category: 'Staple Grain', lat: -13.80, lng: 33.50, harvestWindow: 'April – June', suitabilityScore: '99% (Breadbasket)', notes: 'Central Region produces >60% of Malawi\'s grain with deep clay holding seasonal moisture.' },
      { id: 'cc-2', cropName: 'Highland Irish Potatoes', chichewaName: 'Mbatata za ku Dedza', category: 'Horticulture', lat: -14.38, lng: 34.33, harvestWindow: 'Triple crop (Mar, Jul, Nov)', suitabilityScore: '97% (Frost Tolerant)', notes: 'Dedza & Ntcheu supply thousands of tons weekly to capital city supermarkets and markets.' },
      { id: 'cc-3', cropName: 'Soya Beans & Groundnuts', chichewaName: 'Soya ndi Mtedza', category: 'Legume / Pulse', lat: -13.30, lng: 33.40, harvestWindow: 'April – May', suitabilityScore: '96% (Nitrogen Fixing)', notes: 'Natural soil fertility builders that thrive in Kasungu and Mchinji red loams.' },
      { id: 'cc-4', cropName: 'Commercial Tomatoes & Cabbage', chichewaName: 'Mapwetekere ndi Makabichi', category: 'Horticulture', lat: -14.82, lng: 34.63, harvestWindow: 'Continuous (Year-Round)', suitabilityScore: '95% (Dambo Irrigation)', notes: 'Tsangano ridge growers utilize gravity channels from mountain springs.' },
      { id: 'cc-5', cropName: 'Kilombero & Faya Rice', chichewaName: 'Mpunga wa Nkhotakota', category: 'Staple Grain', lat: -12.92, lng: 34.30, harvestWindow: 'May – July', suitabilityScore: '93% (River Delta)', notes: 'Fragrant long-grain rice grown along the Bua and Dwangwa river floodplains.' },
      { id: 'cc-6', cropName: 'Sunflowers & Beekeeping', chichewaName: 'Mpendadzuwa ndi Uchi', category: 'High-Value Cash Crop', lat: -13.10, lng: 33.60, harvestWindow: 'May – August', suitabilityScore: '94% (High Oil)', notes: 'Used for on-farm edible oil pressing and high-value comb honey production.' }
    ],
    roads: [
      {
        id: 'cr-1',
        code: 'M1',
        name: 'M1 Central Arterial Corridor',
        surface: 'Bitumen Paved Highway',
        color: '#f59e0b',
        points: [
          { lat: -12.35, lng: 33.50 },
          { lat: -13.03, lng: 33.48 },
          { lat: -13.55, lng: 33.70 },
          { lat: -13.97, lng: 33.79 },
          { lat: -14.38, lng: 34.33 },
          { lat: -14.82, lng: 34.63 },
          { lat: -15.15, lng: 34.90 }
        ],
        keyStops: ['Kasungu Boma', 'Mponela Trading Centre', 'Lilongwe City Center', 'Dedza Boma', 'Ntcheu Boma', 'Balaka Junction'],
        freightSuitability: 'The primary domestic commercial lifeline connecting capital city markets with south and north.'
      },
      {
        id: 'cr-2',
        code: 'M12',
        name: 'M12 Lilongwe – Mchinji (Zambia Route)',
        surface: 'Bitumen Paved Highway',
        color: '#10b981',
        points: [
          { lat: -13.97, lng: 33.79 },
          { lat: -13.90, lng: 33.40 },
          { lat: -13.80, lng: 32.88 }
        ],
        keyStops: ['Lilongwe West', 'Namitete Market', 'Mchinji Boma', 'Mwami Border Post'],
        freightSuitability: 'Direct international freight corridor to Chipata and Lusaka (Zambia).'
      },
      {
        id: 'cr-3',
        code: 'M14',
        name: 'M14 Lilongwe – Salima / Lakeshore Route',
        surface: 'Bitumen Paved Highway',
        color: '#38bdf8',
        points: [
          { lat: -13.97, lng: 33.79 },
          { lat: -13.78, lng: 34.10 },
          { lat: -13.78, lng: 34.45 }
        ],
        keyStops: ['Lilongwe East', 'Chitukula', 'Salima Boma', 'Senga Bay'],
        freightSuitability: 'Rapid 1.5-hour link between the capital and the Lake Malawi supply zone.'
      },
      {
        id: 'cr-4',
        code: 'M5',
        name: 'M5 Central Lakeshore Highway',
        surface: 'Bitumen Paved Highway',
        color: '#38bdf8',
        points: [
          { lat: -12.35, lng: 34.10 },
          { lat: -12.92, lng: 34.30 },
          { lat: -13.78, lng: 34.45 }
        ],
        keyStops: ['Dwangwa Sugar Estate', 'Nkhotakota Boma', 'Salima Boma'],
        freightSuitability: 'Fast all-weather route along the central shoreline.'
      }
    ],
    rivers: [
      {
        id: 'cw-1',
        name: 'Bua River (Malawi\'s Longest River Basin)',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -13.60, lng: 32.90 },
          { lat: -13.20, lng: 33.20 },
          { lat: -13.00, lng: 33.50 },
          { lat: -12.80, lng: 34.10 },
          { lat: -12.75, lng: 34.28 }
        ],
        irrigationCapacity: 'Extensive; drains central agricultural plains into Lake Malawi with hundreds of dambos.',
        notes: 'Crucial for Mpasa (lake salmon) spawning and large-scale off-grid gravity farm intake.'
      },
      {
        id: 'cw-2',
        name: 'Linthipe River',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -14.45, lng: 34.00 },
          { lat: -14.15, lng: 34.30 },
          { lat: -13.90, lng: 34.60 }
        ],
        irrigationCapacity: 'Vast fertile silt deposits along lower floodplains in Salima.',
        notes: 'Carries nutrient-rich volcanic topsoil from Dedza highlands to the lake.'
      },
      {
        id: 'cw-3',
        name: 'Lilongwe River & Kamuzu Dams I & II',
        type: 'Storage Dam / Reservoir',
        flowReliability: 'Permanent Water Body',
        points: [
          { lat: -14.20, lng: 33.50 },
          { lat: -13.97, lng: 33.79 },
          { lat: -13.80, lng: 34.20 }
        ],
        irrigationCapacity: 'Provides metropolitan domestic supply and extensive peri-urban horticulture.',
        notes: 'Protected watershed originating in Dzalanyama forest reserve.'
      }
    ],
    settlements: [
      { id: 'cs-1', name: 'Lilongwe Capital City', type: 'Commercial Hub / City', lat: -13.97, lng: 33.79, populationEstimate: '1,150,000', marketDays: 'Daily Central Markets + Area 25 & Area 47 Hubs', keyAgroServices: ['Ministry of Agriculture Headquarters', 'Chitedze Research Station', 'LUANAR Bunda Agro-Campus', 'International Freight Terminals'] },
      { id: 'cs-2', name: 'Dedza Boma', type: 'District Boma', lat: -14.38, lng: 34.33, populationEstimate: '45,000', marketDays: 'Monday & Thursday', keyAgroServices: ['Highland Seed Distribution', 'Dedza Pottery Artisan Center', 'Forestry Seedlings Nursery'] },
      { id: 'cs-3', name: 'Kasungu Boma', type: 'District Boma', lat: -13.03, lng: 33.48, populationEstimate: '60,000', marketDays: 'Tuesday & Friday', keyAgroServices: ['Grain Silo Facilities', 'Tractor & Implement Dealers', 'Borehole Spares Hub'] },
      { id: 'cs-4', name: 'Ntcheu Boma', type: 'District Boma', lat: -14.82, lng: 34.63, populationEstimate: '36,000', marketDays: 'Wednesday & Saturday', keyAgroServices: ['Produce Loading Logistics', 'Vegetable Wholesalers', 'Mozambique Border Transit'] },
      { id: 'cs-5', name: 'Salima Boma', type: 'District Boma', lat: -13.78, lng: 34.45, populationEstimate: '40,000', marketDays: 'Daily', keyAgroServices: ['Cotton Ginning', 'Fish Hatcheries', 'Solar Pump Suppliers'] },
      { id: 'cs-6', name: 'Nkhotakota Boma', type: 'Strategic Agro-Trading Centre', lat: -12.92, lng: 34.30, populationEstimate: '35,000', marketDays: 'Monday & Friday', keyAgroServices: ['Rice Milling Centers', 'Lake Transport Pier', 'Chia Lagoon Fisheries'] }
    ],
    forests: [
      {
        id: 'cf-1',
        name: 'Dzalanyama Forest Reserve',
        type: 'Montane Rainforest Reserve',
        hectares: '98,900 ha',
        lat: -14.25,
        lng: 33.45,
        polygon: [
          [33.30, -14.00], [33.65, -14.00], [33.60, -14.60], [33.25, -14.60], [33.30, -14.00]
        ],
        keyFloraFauna: ['Brachystegia (Miombo) Woodland', 'Rare Miombo Bird Endemics', 'Perennial Mountain Catchments'],
        conservationStatus: 'Strategic National Watershed Protection Reserve',
        ecologicalFunction: 'The primary water source recharging the Lilongwe River and capital reservoirs.'
      },
      {
        id: 'cf-2',
        name: 'Nkhotakota Wildlife Reserve Canopy',
        type: 'Wildlife Reserve',
        hectares: '180,000 ha',
        lat: -13.00,
        lng: 34.00,
        polygon: [
          [33.80, -12.70], [34.25, -12.70], [34.25, -13.30], [33.80, -13.30], [33.80, -12.70]
        ],
        keyFloraFauna: ['Dense Pristine Miombo Canopy', '500+ Translocated Elephants', 'Bua River Cascades'],
        conservationStatus: 'African Parks Managed Sanctuary',
        ecologicalFunction: 'Regulates climate and humidity across the Central Lakeshore agricultural belt.'
      },
      {
        id: 'cf-3',
        name: 'Dedza Mountain Forest Reserve',
        type: 'Plantation Pine Forest',
        hectares: '2,900 ha',
        lat: -14.35,
        lng: 34.33,
        polygon: [
          [34.30, -14.30], [34.40, -14.30], [34.40, -14.42], [34.30, -14.42], [34.30, -14.30]
        ],
        keyFloraFauna: ['Pine and Cypress stands', 'Indigenous Protea grasslands', 'Mountain spring catchments'],
        conservationStatus: 'Forestry & Water Catchment Protection',
        ecologicalFunction: 'Generates year-round mist and gravity stream feeds for Dedza town and rural valleys.'
      }
    ],
    overallAgroSuitability: 'Grade A+ (National Food Security Backbone)',
    waterIndependenceRating: 'High (Plentiful Groundwater)',
    homesteadVerdict: 'The most strategically balanced region in Malawi: direct access to national commerce and government in Lilongwe, unmatched staple grain fertility, and cool mountain retreats in Dedza and Ntcheu with rapid market access.'
  },

  // =========================================================================
  // 3. SOUTHERN REGION (Mangochi, Machinga, Balaka, Zomba, Chiradzulu, Blantyre, Mwanza, Neno, Thyolo, Mulanje, Phalombe, Chikwawa, Nsanje)
  // =========================================================================
  southern: {
    id: 'southern',
    name: 'Southern Region',
    shortName: 'South',
    tagline: 'Towering Mulanje Massif, Shire River Lifeline, Tea Estates & Volcanic Soil',
    adminCapital: 'Blantyre (Commercial Capital City)',
    areaKm2: 31753,
    populationEstimate: '8.2 Million',
    bounds: {
      minLat: -17.20,
      maxLat: -14.30,
      minLng: 34.25,
      maxLng: 35.95
    },
    terrain: {
      name: 'Mulanje Massif, Zomba Plateau & Lower Shire Depression',
      zoneType: 'Alpine Highland',
      altitudeRange: '50m (Lower Shire at Nsanje) – 3,002m (Sapitwa Peak, Mulanje)',
      description: 'Extremes of elevation: from South-Central Africa\'s highest peak (Mulanje Massif) and the lush Zomba/Thyolo tea highlands down to the tropical Shire River depression.',
      peaks: [
        { name: 'Sapitwa Peak (Mount Mulanje)', altitudeMeters: 3002, lat: -15.95, lng: 35.58, description: 'Highest point in South-Central Africa; island in the sky with alpine endemic cedar.' },
        { name: 'Zomba Plateau Peak', altitudeMeters: 2087, lat: -15.35, lng: 35.30, description: 'Historic mountain plateau with perennial streams, trout dams, and pine forests.' },
        { name: 'Thyolo Mountain', altitudeMeters: 1462, lat: -16.12, lng: 35.15, description: 'Lush tea-covered volcanic ridge overlooking the Lower Shire escarpment.' },
        { name: 'Michiru Peak', altitudeMeters: 1473, lat: -15.75, lng: 34.95, description: 'Prominent conservation peak providing panoramic views over Blantyre metropolis.' }
      ]
    },
    soilZones: [
      {
        id: 's-soil-1',
        name: 'Thyolo & Mulanje Acidic Tea Humic Loam',
        classification: 'Humic Nitisols & Acrisols',
        phRange: 'pH 4.8 - 5.6',
        texture: 'Extremely deep, volcanic-derived humic red loam',
        fertility: 'Very High',
        color: '#991b1b',
        polygon: [
          [35.00, -15.80], [35.75, -15.80], [35.75, -16.30], [35.00, -16.30], [35.00, -15.80]
        ],
        recommendedCrops: ['Estate Tea', 'Macadamia', 'Avocado', 'Bananas & Plantains', 'Pineapples', 'Coffee'],
        notes: 'Malawi\'s premier perennial tree crop soil; receives high rainfall and never experiences water-logging.'
      },
      {
        id: 's-soil-2',
        name: 'Zomba & Shire Highlands Volcanic Loam',
        classification: 'Eutric Vertisols & Ferric Luvisols',
        phRange: 'pH 6.0 - 6.8',
        texture: 'Rich volcanic loam and rich alluvium',
        fertility: 'Very High',
        color: '#831843',
        polygon: [
          [34.80, -15.10], [35.60, -15.10], [35.60, -15.75], [34.80, -15.75], [34.80, -15.10]
        ],
        recommendedCrops: ['Strawberries', 'Market Vegetables', 'Pigeon Peas (Nandolo)', 'Macadamia', 'Poultry Farming'],
        notes: 'High organic matter content; ideal for intensive diversified organic market gardening.'
      },
      {
        id: 's-soil-3',
        name: 'Lower Shire Valley Heavy Vertisol & Silt',
        classification: 'Chromic Vertisols & Fluvisols',
        phRange: 'pH 6.8 - 7.8',
        texture: 'Heavy black cotton soil and nutrient-dense river silt',
        fertility: 'High',
        color: '#3b0764',
        polygon: [
          [34.50, -15.90], [35.20, -15.90], [35.35, -17.15], [34.70, -17.15], [34.50, -15.90]
        ],
        recommendedCrops: ['Commercial Sugarcane (Nchalo)', 'Cotton', 'Sorghum', 'Millet', 'Beef Cattle', 'Aquaculture'],
        notes: 'Warm tropical valley requiring irrigation from the Shire River to unlock massive biomass yields.'
      }
    ],
    rainfallZones: [
      {
        id: 's-rain-1',
        label: 'Mulanje / Thyolo High Precipitation Belt (1,600 - 2,400mm+)',
        rangeMm: '1,600 - 2,400mm+ / year',
        annualMmAvg: 2200,
        color: '#0284c7',
        polygon: [
          [35.10, -15.80], [35.85, -15.80], [35.85, -16.35], [35.10, -16.35], [35.10, -15.80]
        ],
        rainyPattern: 'Malawi\'s highest rainfall; regular afternoon orographic showers and winter mist.',
        droughtVulnerability: 'Low'
      },
      {
        id: 's-rain-2',
        label: 'Zomba & Blantyre Highlands (1,000 - 1,400mm)',
        rangeMm: '1,000 - 1,400mm / year',
        annualMmAvg: 1250,
        color: '#0d9488',
        polygon: [
          [34.80, -15.20], [35.60, -15.20], [35.50, -15.80], [34.70, -15.80], [34.80, -15.20]
        ],
        rainyPattern: 'Steady reliable rainfall with moderate temperatures and good water table recharge.',
        droughtVulnerability: 'Low'
      },
      {
        id: 's-rain-3',
        label: 'Lower Shire Rain-Shadow Depression (550 - 800mm)',
        rangeMm: '550 - 800mm / year',
        annualMmAvg: 680,
        color: '#eab308',
        polygon: [
          [34.40, -15.90], [35.20, -15.90], [35.35, -17.15], [34.60, -17.15], [34.40, -15.90]
        ],
        rainyPattern: 'Hot semi-arid climate dependent on perennial Shire River gravity canal systems.',
        droughtVulnerability: 'High'
      }
    ],
    mainCrops: [
      { id: 'sc-1', cropName: 'Estate & Smallholder Tea', chichewaName: 'Tiyi wa ku Mulanje', category: 'High-Value Cash Crop', lat: -16.03, lng: 35.50, harvestWindow: 'November – May', suitabilityScore: '99% (Historical Centre)', notes: 'Mulanje and Thyolo are the birthplace of African commercial tea production (since 1891).' },
      { id: 'sc-2', cropName: 'Macadamia & Pecan Nuts', chichewaName: 'Mtedza Wamtengo', category: 'Tree Crop / Orchard', lat: -15.90, lng: 35.20, harvestWindow: 'March – July', suitabilityScore: '96% (High Export)', notes: 'Lush evergreen canopy yields export-grade nuts with zero supplemental irrigation.' },
      { id: 'sc-3', cropName: 'Pigeon Peas', chichewaName: 'Nandolo Wopatsa Thanzi', category: 'Legume / Pulse', lat: -15.50, lng: 35.40, harvestWindow: 'July – September', suitabilityScore: '98% (Drought Hardy)', notes: 'Southern Region\'s vital protein staple and export legume; breaks hardpan soils.' },
      { id: 'sc-4', cropName: 'Cavendish & Red Bananas', chichewaName: 'Nthochi za ku Thyolo', category: 'Tree Crop / Orchard', lat: -16.10, lng: 35.15, harvestWindow: 'Continuous (Year-Round)', suitabilityScore: '97% (High Humidity)', notes: 'Thyolo escarpment hills produce over 80% of Malawi\'s banana supply.' },
      { id: 'sc-5', cropName: 'Commercial Sugarcane', chichewaName: 'Nzimbe za pa Nchalo', category: 'High-Value Cash Crop', lat: -16.00, lng: 34.85, harvestWindow: 'May – November', suitabilityScore: '95% (Canal Fed)', notes: 'Massive Illovo estates in Chikwawa irrigated by gravity offtakes from the Shire River.' },
      { id: 'sc-6', cropName: 'Strawberries & Market Herbs', chichewaName: 'Zipatso za Sitiroberi', category: 'Horticulture', lat: -15.38, lng: 35.32, harvestWindow: 'May – October', suitabilityScore: '94% (Highland Mist)', notes: 'Zomba Plateau microclimate produces sweet berries supplied daily to hotels and markets.' }
    ],
    roads: [
      {
        id: 'sr-1',
        code: 'M1',
        name: 'M1 Southern Artery (Zalewa – Blantyre – Nsanje)',
        surface: 'Bitumen Paved Highway',
        color: '#f59e0b',
        points: [
          { lat: -15.15, lng: 34.90 },
          { lat: -15.45, lng: 34.85 },
          { lat: -15.79, lng: 35.00 },
          { lat: -16.03, lng: 34.80 },
          { lat: -16.50, lng: 35.05 },
          { lat: -16.92, lng: 35.26 }
        ],
        keyStops: ['Balaka Junction', 'Zalewa Bridge', 'Blantyre City', 'Chikwawa Boma', 'Bangula Logistics Hub', 'Nsanje Port'],
        freightSuitability: 'Main commercial artery connecting southern towns with Blantyre industries.'
      },
      {
        id: 'sr-2',
        code: 'M2',
        name: 'M2 Shire Highlands Highway (Blantyre – Mulanje)',
        surface: 'Bitumen Paved Highway',
        color: '#fb923c',
        points: [
          { lat: -15.79, lng: 35.00 },
          { lat: -16.07, lng: 35.14 },
          { lat: -16.02, lng: 35.32 },
          { lat: -16.03, lng: 35.50 },
          { lat: -15.98, lng: 35.75 }
        ],
        keyStops: ['Limbe Commercial Suburb', 'Thyolo Boma', 'Luchenza Rail Hub', 'Mulanje Boma', 'Muloza Border (Mozambique)'],
        freightSuitability: 'Scenic, smooth tea route providing rapid access to Mozambique ports.'
      },
      {
        id: 'sr-3',
        code: 'M3',
        name: 'M3 Zomba – Liwonde – Mangochi Highway',
        surface: 'Bitumen Paved Highway',
        color: '#34d399',
        points: [
          { lat: -15.79, lng: 35.00 },
          { lat: -15.38, lng: 35.32 },
          { lat: -15.06, lng: 35.23 },
          { lat: -14.47, lng: 35.26 }
        ],
        keyStops: ['Limbe', 'Zomba City', 'Liwonde Barrage', 'Mangochi Boma', 'Monkey Bay'],
        freightSuitability: 'High-speed transit linking the former capital with the southern lake resort and fisheries.'
      },
      {
        id: 'sr-4',
        code: 'M6',
        name: 'M6 Mwanza Corridor (Tete / South Africa Route)',
        surface: 'Bitumen Paved Highway',
        color: '#a855f7',
        points: [
          { lat: -15.45, lng: 34.85 },
          { lat: -15.60, lng: 34.50 },
          { lat: -15.62, lng: 34.30 }
        ],
        keyStops: ['Zalewa', 'Mwanza Boma', 'Mwanza International Border'],
        freightSuitability: 'Primary import route connecting Malawi to South Africa via Mozambique & Zimbabwe.'
      }
    ],
    rivers: [
      {
        id: 'sw-1',
        name: 'Shire River (Malawi\'s Greatest River)',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -14.47, lng: 35.26 },
          { lat: -15.06, lng: 35.23 },
          { lat: -15.45, lng: 34.85 },
          { lat: -15.80, lng: 34.80 },
          { lat: -16.03, lng: 34.80 },
          { lat: -16.50, lng: 35.05 },
          { lat: -16.92, lng: 35.26 }
        ],
        irrigationCapacity: 'Tremendous; the only outlet of Lake Malawi powering 95% of national hydro and Shire Valley canals.',
        notes: 'Flows 402 km south to join the mighty Zambezi River.'
      },
      {
        id: 'sw-2',
        name: 'Ruo River & Mountain Streams',
        type: 'Perennial River',
        flowReliability: 'Year-Round (Perennial)',
        points: [
          { lat: -15.98, lng: 35.60 },
          { lat: -16.20, lng: 35.40 },
          { lat: -16.52, lng: 35.15 }
        ],
        irrigationCapacity: 'Perennial gravity waterfall feeds from the Mulanje Massif powering mini-hydro and tea factories.',
        notes: 'Cold crystal-clear water directly off Mulanje rocks.'
      },
      {
        id: 'sw-3',
        name: 'Likangala River & Lake Chilwa Basin',
        type: 'Lakeshore Basin',
        flowReliability: 'Permanent Water Body',
        points: [
          { lat: -15.35, lng: 35.32 },
          { lat: -15.38, lng: 35.55 },
          { lat: -15.30, lng: 35.75 }
        ],
        irrigationCapacity: 'Rich wetland ecosystem supporting thousands of smallholder rice and fish farming families.',
        notes: 'Endorheic lake surrounded by dense Typha wetlands.'
      }
    ],
    settlements: [
      { id: 'ss-1', name: 'Blantyre Commercial City', type: 'Commercial Hub / City', lat: -15.79, lng: 35.00, populationEstimate: '1,050,000', marketDays: 'Daily Central Market + Limbe & Chichiri Hubs', keyAgroServices: ['Heavy Engineering & Irrigation Fabricators', 'National Veterinary Laboratories', 'Commercial Banking & Export Exchanges', 'Fertilizer Blending Plants'] },
      { id: 'ss-2', name: 'Zomba City (University Capital)', type: 'Commercial Hub / City', lat: -15.38, lng: 35.32, populationEstimate: '140,000', marketDays: 'Daily Central Market', keyAgroServices: ['Chancellor College Botanical Labs', 'Forestry Research Institute (FRIM)', 'Zomba Trout Hatcheries'] },
      { id: 'ss-3', name: 'Mulanje Boma', type: 'District Boma', lat: -16.03, lng: 35.50, populationEstimate: '32,000', marketDays: 'Tuesday & Friday', keyAgroServices: ['Tea Research Foundation Central Labs', 'Mulanje Mountain Conservation Trust', 'Highland Plant Nurseries'] },
      { id: 'ss-4', name: 'Thyolo Boma', type: 'District Boma', lat: -16.07, lng: 35.14, populationEstimate: '26,000', marketDays: 'Monday & Thursday', keyAgroServices: ['Tea & Macadamia Processing', 'Banana Distribution Wholesalers', 'Soil Testing Field Clinics'] },
      { id: 'ss-5', name: 'Liwonde Logistics Hub', type: 'Strategic Agro-Trading Centre', lat: -15.06, lng: 35.23, populationEstimate: '38,000', marketDays: 'Daily', keyAgroServices: ['Dry Port Container Terminal', 'Shire River Barrage Controls', 'Fertilizer Transshipment Silos'] },
      { id: 'ss-6', name: 'Mangochi Boma', type: 'District Boma', lat: -14.47, lng: 35.26, populationEstimate: '55,000', marketDays: 'Wednesday & Saturday', keyAgroServices: ['Fisheries Research Station', 'Refrigerated Fish Transport', 'Lake Tourism Supply Hub'] }
    ],
    forests: [
      {
        id: 'sf-1',
        name: 'Mount Mulanje Biosphere Reserve',
        type: 'Biosphere Forest',
        hectares: '65,000 ha',
        lat: -15.95,
        lng: 35.58,
        polygon: [
          [35.45, -15.85], [35.75, -15.85], [35.75, -16.15], [35.45, -16.15], [35.45, -15.85]
        ],
        keyFloraFauna: ['Mulanje Cedar (Widdringtonia whytei)', 'Alpine Heathers', 'Endemic Chameleons', 'Forest Swifts'],
        conservationStatus: 'UNESCO Biosphere Reserve & Global Heritage Candidate',
        ecologicalFunction: 'The premier water tower of Southern Malawi generating rainfall for 9 surrounding districts.'
      },
      {
        id: 'sf-2',
        name: 'Zomba Mountain Forest Reserve',
        type: 'Plantation Pine Forest',
        hectares: '5,000 ha',
        lat: -15.35,
        lng: 35.30,
        polygon: [
          [35.25, -15.30], [35.38, -15.30], [35.38, -15.42], [35.25, -15.42], [35.25, -15.30]
        ],
        keyFloraFauna: ['Mexican Weeping Pine', 'Mulanje Cedar introductions', 'Indigenous cedar & ferns'],
        conservationStatus: 'Protected Catchment & Eco-Tourism Sanctuary',
        ecologicalFunction: 'Feeds the Mulunguzi Dam and provides pure gravity water for Zomba city.'
      },
      {
        id: 'sf-3',
        name: 'Liwonde National Park Riverine Forest',
        type: 'National Park',
        hectares: '54,800 ha',
        lat: -14.90,
        lng: 35.25,
        polygon: [
          [35.15, -14.75], [35.40, -14.75], [35.35, -15.15], [35.10, -15.15], [35.15, -14.75]
        ],
        keyFloraFauna: ['Riverine Palm Savannah', 'Baobabs', 'Black Rhino', 'Cheetah', 'Hippos & Crocodiles'],
        conservationStatus: 'African Parks Managed Premier National Park',
        ecologicalFunction: 'Maintains healthy riparian buffer along Upper Shire river channel.'
      }
    ],
    overallAgroSuitability: 'Grade A (High Productivity Highland & River Corridor)',
    waterIndependenceRating: 'Superior (Gravity Springflow)',
    homesteadVerdict: 'Ideal for permaculture pioneers seeking dramatic mountain backdrops, world-famous tea soils, continuous water cascades from Mulanje/Zomba, and immediate commercial proximity to Blantyre markets.'
  }
};
