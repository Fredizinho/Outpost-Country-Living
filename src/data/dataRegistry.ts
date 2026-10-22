// Centralized Data Registry for Outpost Living
// Single source of truth for all 28 Malawi Districts: Telemetry, Coordinates, Rainfall (DCCMS), Soil Taxonomy (FAO HWSD v2.0), Aquifers (FAO AQUASTAT), and Solar Insolation (NASA POWER)

import { MALAWI_DISTRICTS, DataVerificationStatus } from './malawiDistrictData';
import { MALAWI_DISTRICT_RESOURCES, DistrictResourceStats } from './districtResourceData';

export type AgroEcologicalZone =
  | 'Highland Sanctuary'
  | 'Mid-Elevation Savanna Plateau'
  | 'Lakeshore Alluvial Basin'
  | 'Rift Valley & Wetland Floor';

export type PlantingPitKey =
  | 'egwDeepPit'
  | 'standardFruitTreePit'
  | 'compactTreePit'
  | 'zaiPit'
  | 'bananaCirclePit'
  | 'biointensiveBed';

export interface DistrictRegistryRecord {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  agroZone: AgroEcologicalZone;
  centroid: [number, number]; // [latitude, longitude]
  lat: number;
  lng: number;
  optimalZoom: number;
  elevationRange: string;
  temperatureRangeC: string;
  frostRisk: string;
  rainfallAnnualMm: number; // Canonical annual rainfall normal (DCCMS source of truth)
  rainfallPattern: string;
  rainfallSource: string | null;
  faoSoilClassification: string; // Strictly FAO HWSD v2.0 classification
  primarySoil: string; // FAO HWSD v2.0 classification + Malawian local soil name
  soilPh: string; // Strictly numeric pH range (e.g. 'pH 5.8 – 6.5')
  soilSource: string | null;
  soilAmendmentPrescription: string;
  recommendedPitKey: PlantingPitKey;
  topCrops: string[];
  traditionalAuthorities: string[];
  feasibilityGrade: string;
  suitabilityScore: number;
  aquiferDepth: string;
  aquiferDepthM: number;
  aquiferSource: string | null;
  solarKwhDay: number;
  solarSource: string | null;
  verificationStatus: DataVerificationStatus;
  unverifiedFields: string[];
  verificationNote?: string;
  waterRating: string;
  landSpace: string;
  landCostBallpark: string;
  population?: number;
  areaKm2?: number;
  densityPerKm2?: number;
  arableLandPct?: number;
  description: string;
  boundary: [number, number][];
}

// Canonical Planting Pit & Permaculture Bed Dimensions
export interface PlantingPitSpec {
  id: string;
  key: PlantingPitKey;
  name: string;
  chichewaName: string;
  widthCm: number;
  lengthCm: number;
  depthCm: number;
  volumeM3: number;
  volumeLiters: number;
  dimensionString: string;
  rockDrainageDepthCm: number;
  biocharKgPerPit: number;
  compostWheelbarrows: number;
  waterRetentionLiters: number;
  laborHoursEstimate: string;
  layers: string[];
  idealCrops: string[];
  description: string;
}

export const PLANTING_PIT_SPECS: Record<PlantingPitKey, PlantingPitSpec> = {
  egwDeepPit: {
    id: 'egw-deep-pit',
    key: 'egwDeepPit',
    name: 'Ellen G. White Deep Planting Pit',
    chichewaName: 'Dzenje Lalikulu la Mitengo (1m³)',
    widthCm: 100,
    lengthCm: 100,
    depthCm: 100,
    volumeM3: 1.0,
    volumeLiters: 1000,
    dimensionString: '1.0 m × 1.0 m × 1.0 m [3.3 × 3.3 × 3.3 ft] (1.0 m³)',
    rockDrainageDepthCm: 20,
    biocharKgPerPit: 3.0,
    compostWheelbarrows: 4,
    waterRetentionLiters: 240,
    laborHoursEstimate: '2.5 – 3.5 hrs per pit',
    layers: [
      'Bottom (80–100 cm [31–39 in]): 20 cm [8 in] coarse river stones & fractured rock for taproot aeration & drainage',
      'Lower Mid (50–80 cm [20–31 in]): Chopped dry maize stalks, kasarani grass & pruned legume branches',
      'Upper Mid (15–50 cm [6–20 in]): Topsoil blended with 4 wheelbarrows thermophilic compost, 3 kg charged biochar & 200 g wood ash',
      'Crown (0–15 cm [0–6 in]): Unamended collar around root flare + 5 cm [2 in] sunken rainwater smile-bund & 10 cm [4 in] dry grass mulch',
    ],
    idealCrops: ['Apples', 'Peaches', 'Avocados (Hass)', 'Macadamia', 'Mangoes', 'Citrus'],
    description:
      'Excavated 100 cm [3.3 ft] deep into subsoil with coarse rock drainage layer, layered thermophilic compost, charged biochar, and topsoil to shatter hardpans and establish drought-proof taproots.',
  },
  standardFruitTreePit: {
    id: 'standard-orchard-pit',
    key: 'standardFruitTreePit',
    name: 'Standard Orchard Tree Pit',
    chichewaName: 'Dzenje la Zipatso (80cm)',
    widthCm: 80,
    lengthCm: 80,
    depthCm: 80,
    volumeM3: 0.512,
    volumeLiters: 512,
    dimensionString: '80 × 80 × 80 cm [31 × 31 × 31 in] (0.51 m³)',
    rockDrainageDepthCm: 15,
    biocharKgPerPit: 2.0,
    compostWheelbarrows: 2.5,
    waterRetentionLiters: 130,
    laborHoursEstimate: '1.5 – 2.0 hrs per pit',
    layers: [
      'Bottom (65–80 cm [26–31 in]): 15 cm [6 in] gravel or broken terracotta brick for drainage',
      'Core (15–65 cm [6–26 in]): Friable Eutric Nitisol red loam mixed with 2.5 wheelbarrows cured compost & 2 kg biochar',
      'Surface (0–15 cm [0–6 in]): Mulch ring kept 10 cm [4 in] clear of graft union',
    ],
    idealCrops: ['Citrus', 'Guava', 'Loquat (Masuku)', 'Papaya', 'Pomegranate', 'Coffee'],
    description:
      'Medium-deep orchard pit suited for citrus, avocado, macadamia, and coffee in deep friable Eutric Nitisol (Katondo) red loams.',
  },
  compactTreePit: {
    id: 'compact-tree-pit',
    key: 'compactTreePit',
    name: 'Compact Agroforestry Pit',
    chichewaName: 'Dzenje la Mitengo Yothandiza Nthaka',
    widthCm: 60,
    lengthCm: 60,
    depthCm: 60,
    volumeM3: 0.216,
    volumeLiters: 216,
    dimensionString: '60 × 60 × 60 cm [24 × 24 × 24 in] (0.22 m³)',
    rockDrainageDepthCm: 10,
    biocharKgPerPit: 1.0,
    compostWheelbarrows: 1.5,
    waterRetentionLiters: 65,
    laborHoursEstimate: '45 – 60 mins per pit',
    layers: [
      'Bottom (50–60 cm [20–24 in]): loosened subsoil + coarse organic litter',
      'Main Fill (10–50 cm [4–20 in]): 1:1 topsoil and cured compost with 1 kg biochar',
      'Surface (0–10 cm [0–4 in]): Vetiver grass mulch cover',
    ],
    idealCrops: ['Moringa (Chamwamba)', 'Gliricidia', 'Tephrosia', 'Pigeon Pea (Nandolo)', 'Mulberry'],
    description:
      'Rapid-excavation transplant pit for fast-growing nitrogen-fixing pioneer trees, fodder banks, and windbreak hedges.',
  },
  zaiPit: {
    id: 'zai-water-harvesting-pit',
    key: 'zaiPit',
    name: 'Traditional Zaï Water-Harvesting Pit',
    chichewaName: 'Mbowo Zosungira Chinyezi (Zaï)',
    widthCm: 30,
    lengthCm: 30,
    depthCm: 20,
    volumeM3: 0.018,
    volumeLiters: 18,
    dimensionString: '30 × 30 × 20 cm deep [12 × 12 × 8 in]',
    rockDrainageDepthCm: 0,
    biocharKgPerPit: 0.25,
    compostWheelbarrows: 0.2,
    waterRetentionLiters: 12,
    laborHoursEstimate: '10 – 15 mins per 5 pits',
    layers: [
      'Bottom (10–20 cm [4–8 in]): Two handfuls (500 g) well-rotted kraal manure + pinch of charged biochar',
      'Top (0–10 cm [0–4 in]): 5 cm [2 in] topsoil cover leaving a 5 cm [2 in] sunken catch basin to trap overland storm runoff',
    ],
    idealCrops: ['Maize (Chimanga)', 'Sorghum (Mapira)', 'Pearl Millet (Mchewere)', 'Cowpeas (Khobwe)', 'Groundnuts'],
    description:
      'Sunken micro-basin filled with compost/manure slurry to concentrate rainfall and runoff directly in crop root zones in semi-arid plains and Shire Valley floors.',
  },
  bananaCirclePit: {
    id: 'banana-circle-pit',
    key: 'bananaCirclePit',
    name: 'Banana & Taro Sponge Mulch Basin',
    chichewaName: 'Chitsime cha Nthochi ndi Coco',
    widthCm: 200,
    lengthCm: 200,
    depthCm: 100,
    volumeM3: 2.1,
    volumeLiters: 2100,
    dimensionString: '2.0 m [6.6 ft] diameter × 1.0 m [3.3 ft] center depth',
    rockDrainageDepthCm: 15,
    biocharKgPerPit: 5.0,
    compostWheelbarrows: 8,
    waterRetentionLiters: 650,
    laborHoursEstimate: '4.0 – 5.0 hrs per circle',
    layers: [
      'Center Bowl (0–100 cm [0–39 in]): Rough wood logs, banana pseudostems, maize stover & kitchen greywater inflow',
      'Raised Berm Ring: Excavated topsoil mounded 40 cm [16 in] high around perimeter, planted with 4–6 banana suckers & sweet potato vines',
    ],
    idealCrops: ['Bananas (Nthochi)', 'Plantains (Matoki)', 'Taro (Masimbi)', 'Papaya', 'Sweet Potato Vines', 'Lemongrass'],
    description:
      'Central organic sponge basin receiving roof overflow or swale water, ringed by heavy-feeding banana, papaya, and taro guilds.',
  },
  biointensiveBed: {
    id: 'biointensive-double-dug-bed',
    key: 'biointensiveBed',
    name: 'Double-Dug Bio-Intensive Bed',
    chichewaName: 'Tanthwe Lolimidwa Mozama (60cm)',
    widthCm: 120,
    lengthCm: 600,
    depthCm: 60,
    volumeM3: 4.32,
    volumeLiters: 4320,
    dimensionString: '1.2 m width × 6.0 m length × 60 cm depth [4 × 20 × 2 ft]',
    rockDrainageDepthCm: 0,
    biocharKgPerPit: 6.0,
    compostWheelbarrows: 6,
    waterRetentionLiters: 900,
    laborHoursEstimate: '3.5 – 4.5 hrs per 6m bed',
    layers: [
      'Lower Subsoil (30–60cm): Fractured in-place with broadfork or digging fork without inverting onto surface',
      'Upper Topsoil (0–30cm): Aerated and blended with 6 wheelbarrows cured compost, 6kg biochar & 1kg bone/ash mineral mix',
      'Canopy Cover: Hexagonal close-spacing plant matrix + 8cm fine grass mulch',
    ],
    idealCrops: ['Rape / Tanaposi', 'Tomatoes', 'Onions', 'Garlic', 'Carrots', 'Cabbage', 'Amaranth (Bonongwe)'],
    description:
      'Standard 1.2m wide permanent no-compaction bed loosened to 60cm depth, yielding 3–4× conventional output per square meter.',
  },
};

// Comprehensive Soil Types Registry for Malawi (Strictly Reconciled to FAO HWSD v2.0)
export interface MalawiSoilTypeSpec {
  id: string;
  name: string;
  chichewaName: string;
  faoClassification: string;
  phRange: string;
  drainage: 'Rapid' | 'Well-Drained' | 'Moderate' | 'Seasonal Waterlogging';
  waterHoldingCapacity: 'High' | 'Medium-High' | 'Moderate' | 'Very High (Swelling Clay)';
  organicMatterTarget: string;
  amendmentProtocol: string;
  primaryDistricts: string[];
  idealCrops: string[];
}

export const SOIL_TYPES_REGISTRY: MalawiSoilTypeSpec[] = [
  {
    id: 'katondo-red-loam',
    name: 'Eutric & Humic Nitisols (Katondo Red Clay Loam)',
    chichewaName: 'Katondo Wofiira (Rich Red Loam)',
    faoClassification: 'Eutric & Humic Nitisols / Rhodic Ferralsols (FAO HWSD v2.0)',
    phRange: 'pH 5.8 – 6.5',
    drainage: 'Well-Drained',
    waterHoldingCapacity: 'High',
    organicMatterTarget: '3.8% – 5.0% SOM',
    amendmentProtocol:
      'Maintain permanent 10–15cm organic mulch cover; incorporate 3kg charged biochar per orchard pit and rotate maize with velvet bean (Kalongonda) or pigeon pea (Nandolo).',
    primaryDistricts: ['Dedza', 'Ntcheu', 'Lilongwe', 'Dowa', 'Ntchisi', 'Mchinji', 'Zomba', 'Chiradzulu'],
    idealCrops: ['Irish Potatoes', 'Apples', 'Peaches', 'Wheat', 'Beans', 'Soybeans', 'Cabbage'],
  },
  {
    id: 'ferruginous-sandy-clay',
    name: 'Orthic Ferralsols & Ferric Luvisols (Sandy Clay Loam)',
    chichewaName: 'Mchenga Wosakaniza ndi Katondo',
    faoClassification: 'Orthic Ferralsols & Ferric Luvisols (FAO HWSD v2.0)',
    phRange: 'pH 5.5 – 6.3',
    drainage: 'Rapid',
    waterHoldingCapacity: 'Moderate',
    organicMatterTarget: '3.0% – 4.2% SOM',
    amendmentProtocol:
      'Counteract leaching with high-carbon thermophilic compost, contour vetiver hedgerows, and sunken Zaï planting basins.',
    primaryDistricts: ['Kasungu', 'Mzimba', 'Balaka', 'Machinga', 'Blantyre', 'Mwanza', 'Neno'],
    idealCrops: ['Groundnuts', 'Sunflowers', 'Maize', 'Sorghum', 'Pigeon Peas', 'Sweet Potatoes'],
  },
  {
    id: 'alluvial-fluvisol',
    name: 'Eutric Fluvisols & Calcaric Gleysols (Alluvial Silt)',
    chichewaName: 'Chonde cha M’mphepete mwa Nyanja',
    faoClassification: 'Eutric Fluvisols & Alluvial Gleysols (FAO HWSD v2.0)',
    phRange: 'pH 6.2 – 7.2',
    drainage: 'Moderate',
    waterHoldingCapacity: 'High',
    organicMatterTarget: '3.5% – 4.8% SOM',
    amendmentProtocol:
      'Use raised contour beds in wet months and sunken moisture-retaining mulch basins during the dry winter solar pumping season.',
    primaryDistricts: ['Salima', 'Karonga', 'Nkhotakota', 'Mangochi', 'Phalombe', 'Nsanje'],
    idealCrops: ['Kilombero Rice', 'Cassava', 'Bananas', 'Mangoes', 'Citrus', 'Winter Tomatoes'],
  },
  {
    id: 'acidic-mountain-acrisol',
    name: 'Humic Ferralsols & Humic Acrisols (Montane Loam)',
    chichewaName: 'Nthaka Yachonde ya ku Mapiri',
    faoClassification: 'Humic Ferralsols & Humic Acrisols (FAO HWSD v2.0)',
    phRange: 'pH 4.8 – 5.8',
    drainage: 'Well-Drained',
    waterHoldingCapacity: 'High',
    organicMatterTarget: '4.5% – 6.5% SOM',
    amendmentProtocol:
      'Apply 200g–350g dolomitic agricultural lime or hardwood ash per planting pit to buffer aluminum acidity for annual vegetables; ideal naturally for acid-loving perennials.',
    primaryDistricts: ['Mulanje', 'Thyolo', 'Nkhata Bay', 'Rumphi', 'Chitipa'],
    idealCrops: ['Arabica Coffee', 'Macadamia', 'Tea', 'Avocados', 'Pineapples', 'Berries', 'Bananas'],
  },
  {
    id: 'dambo-vertisol',
    name: 'Pellic Vertisols & Humic Gleysols (Makande / Dambo Clay)',
    chichewaName: 'Makande / Dambo Clay',
    faoClassification: 'Pellic Vertisols & Humic Gleysols (FAO HWSD v2.0)',
    phRange: 'pH 6.4 – 7.6',
    drainage: 'Seasonal Waterlogging',
    waterHoldingCapacity: 'Very High (Swelling Clay)',
    organicMatterTarget: '4.0% – 6.0% SOM',
    amendmentProtocol:
      'Never plow with heavy machinery; build 40cm raised bio-intensive beds on upper wetland fringes for dry-season residual moisture cropping (Dimba).',
    primaryDistricts: ['Chikwawa', 'Nsanje', 'Phalombe', 'Dedza', 'Lilongwe', 'Mzimba'],
    idealCrops: ['Dry-Season Leafy Greens', 'Onions', 'Garlic', 'Irish Potatoes', 'Sorghum', 'Taro'],
  },
];

// Map resources by district ID
const resourceMap = new Map<string, DistrictResourceStats>();
MALAWI_DISTRICT_RESOURCES.forEach((r) => resourceMap.set(r.id.toLowerCase(), r));

function deriveAgroZone(id: string, elevationRange: string): AgroEcologicalZone {
  const lowerId = id.toLowerCase();
  if (['salima', 'karonga', 'nkhotakota', 'mangochi', 'likoma', 'nkhata-bay'].includes(lowerId)) {
    return 'Lakeshore Alluvial Basin';
  }
  if (['chikwawa', 'nsanje', 'balaka', 'machinga', 'phalombe'].includes(lowerId)) {
    return 'Rift Valley & Wetland Floor';
  }
  if (
    ['dedza', 'ntcheu', 'mzimba', 'rumphi', 'chitipa', 'zomba', 'mulanje', 'thyolo', 'ntchisi', 'neno', 'mwanza'].includes(
      lowerId
    ) ||
    elevationRange.includes('1,800') ||
    elevationRange.includes('2,000')
  ) {
    return 'Highland Sanctuary';
  }
  return 'Mid-Elevation Savanna Plateau';
}

function deriveRecommendedPit(agroZone: AgroEcologicalZone, rainfallMm: number): PlantingPitKey {
  if (agroZone === 'Rift Valley & Wetland Floor' || rainfallMm < 900) {
    return 'zaiPit';
  }
  if (agroZone === 'Lakeshore Alluvial Basin' && rainfallMm >= 1200) {
    return 'bananaCirclePit';
  }
  if (agroZone === 'Highland Sanctuary') {
    return 'egwDeepPit';
  }
  return 'standardFruitTreePit';
}

function deriveSuitabilityScore(grade: string): number {
  if (grade.startsWith('A+')) return 10;
  if (grade.startsWith('A-')) return 8.5;
  if (grade.startsWith('A')) return 9.2;
  if (grade.startsWith('B+')) return 8.0;
  return 7.5;
}

function deriveLandCostBallpark(agroZone: AgroEcologicalZone, id: string): string {
  if (['lilongwe', 'blantyre', 'zomba'].includes(id)) {
    return 'Statutory Leasehold / Peri-Urban Customary Estate (Malawi Land Act No. 16 & No. 19 of 2016)';
  }
  if (agroZone === 'Highland Sanctuary') {
    return 'Customary Estate Allocation via TLMA Committee & T/A (Customary Land Act No. 19 of 2016)';
  }
  if (agroZone === 'Lakeshore Alluvial Basin') {
    return 'Customary Estate & Littoral Buffer Verification (Customary Land Act No. 19 of 2016)';
  }
  return 'Customary Estate Registration via Village Land Committee & District Registry (Act No. 19 of 2016)';
}

function deriveAmendmentPrescription(soilPh: string, primarySoil: string): string {
  if (soilPh.includes('4.') || soilPh.includes('5.0') || soilPh.includes('5.2') || soilPh.includes('5.4')) {
    return 'Apply 250g dolomitic lime or hardwood ash + 3kg charged biochar & 4 wheelbarrows cured compost per 1m³ pit to buffer acidity.';
  }
  if (primarySoil.toLowerCase().includes('sandy') || primarySoil.toLowerCase().includes('luvisol') || primarySoil.toLowerCase().includes('ferralsol')) {
    return 'Incorporate high-humus thermophilic compost + 2.5kg biochar & intercrop Mucuna/pigeon pea to boost cation exchange & water retention.';
  }
  return 'Blend 3 wheelbarrows aged compost + 2kg charged biochar & rock phosphate/wood ash into top 40cm root zone.';
}

// Build comprehensive unified dictionary for all 28 districts
export const DISTRICT_REGISTRY: Record<string, DistrictRegistryRecord> = {};
export const DISTRICT_LIST: DistrictRegistryRecord[] = MALAWI_DISTRICTS.map((spec) => {
  const res = resourceMap.get(spec.id.toLowerCase());
  const agroZone = deriveAgroZone(spec.id, spec.elevationRange);
  const recommendedPitKey = deriveRecommendedPit(agroZone, spec.rainfallAnnualMm);

  const record: DistrictRegistryRecord = {
    id: spec.id,
    name: spec.name,
    region: spec.region,
    agroZone,
    centroid: spec.centroid,
    lat: spec.centroid[0],
    lng: spec.centroid[1],
    optimalZoom: spec.optimalZoom,
    elevationRange: spec.elevationRange,
    temperatureRangeC:
      agroZone === 'Highland Sanctuary'
        ? '11°C – 24°C (Cool Temperate Highland)'
        : agroZone === 'Lakeshore Alluvial Basin'
          ? '21°C – 32°C (Warm Lakeshore Littoral)'
          : agroZone === 'Rift Valley & Wetland Floor'
            ? '22°C – 36°C (Tropical Lowland Basin)'
            : '15°C – 28°C (Moderate Savanna Plateau)',
    frostRisk:
      spec.id === 'dedza' || spec.id === 'ntcheu' || spec.id === 'chitipa' || spec.id === 'rumphi'
        ? 'Occasional June–July High-Valley Frost (>1,650m)'
        : 'Frost-Free Year-Round',
    rainfallAnnualMm: spec.rainfallAnnualMm,
    rainfallPattern: spec.rainfallPattern,
    rainfallSource: spec.rainfallSource,
    faoSoilClassification: spec.faoSoilClassification,
    primarySoil: spec.primarySoil,
    soilPh: spec.soilPh,
    soilSource: spec.soilSource,
    soilAmendmentPrescription: deriveAmendmentPrescription(spec.soilPh, spec.primarySoil),
    recommendedPitKey,
    topCrops: spec.topCrops,
    traditionalAuthorities: spec.traditionalAuthorities,
    feasibilityGrade: spec.feasibilityGrade,
    suitabilityScore: deriveSuitabilityScore(spec.feasibilityGrade),
    aquiferDepth: spec.aquiferDepth,
    aquiferDepthM: spec.aquiferDepthM,
    aquiferSource: spec.aquiferSource,
    solarKwhDay: spec.solarKwhDay,
    solarSource: spec.solarSource,
    verificationStatus: spec.verificationStatus,
    unverifiedFields: spec.unverifiedFields,
    verificationNote: spec.verificationNote,
    waterRating: res?.waterRating || 'Shallow Aquifer',
    landSpace: res?.landSpace || 'Good Space',
    landCostBallpark: deriveLandCostBallpark(agroZone, spec.id),
    population: res?.population,
    areaKm2: res?.areaKm2,
    densityPerKm2: res?.densityPerKm2,
    arableLandPct: res?.arableLandPct,
    description: spec.description,
    boundary: spec.boundary,
  };
  DISTRICT_REGISTRY[spec.id.toLowerCase()] = record;
  DISTRICT_REGISTRY[spec.name.toLowerCase()] = record;
  return record;
});

// Canonical Rainfall & Hydrogeology Presets for All 28 Districts in Calculators
export const DISTRICT_RAINFALL_PRESETS: Record<
  string,
  {
    name: string;
    rainfall: number;
    region: string;
    aquiferDepthM: number;
    solarKwhDay: number;
    soil: string;
    faoSoilClassification: string;
    soilPh: string;
    recommendedPitKey: PlantingPitKey;
    verificationStatus: DataVerificationStatus;
  }
> = Object.fromEntries(
  DISTRICT_LIST.map((d) => [
    d.id,
    {
      name: `${d.name} (${d.region})`,
      rainfall: d.rainfallAnnualMm,
      region: d.region,
      aquiferDepthM: d.aquiferDepthM,
      solarKwhDay: d.solarKwhDay,
      soil: d.primarySoil,
      faoSoilClassification: d.faoSoilClassification,
      soilPh: d.soilPh,
      recommendedPitKey: d.recommendedPitKey,
      verificationStatus: d.verificationStatus,
    },
  ])
);

// Canonical Urban Hubs
export const URBAN_HUBS = {
  lilongwe: { name: 'Lilongwe City (Capital)', lat: -13.97, lng: 33.79 },
  blantyre: { name: 'Blantyre Commercial Hub', lat: -15.79, lng: 35.0 },
  mzuzu: { name: 'Mzuzu Northern Hub', lat: -11.46, lng: 34.02 },
} as const;

// Single Source of Truth for Water Norms & Engineering Constants
export const HOMESTEAD_WATER_CONSTANTS = {
  adultBaselineLpd: 50,
  adultHotDryLpd: 70,
  childBaselineLpd: 30,
  childHotDryLpd: 45,
  gardenLitersPerM2PerDay: 6,
  smallLivestockLpd: 5,
  runoffEfficiency: 0.85,
  drySeasonBufferDays: 150,
  reserveBufferDays: 90,
} as const;

export const HOMESTEAD_GENERAL_CONSTANTS = {
  LAND_ACRES_PER_PERSON_STAPLE: 0.35,
  LAND_ACRES_PER_PERSON_ORCHARD: 0.15,
  LAND_ACRES_BASE_WOODLOT_SHELTER: 0.75,
  DEFAULT_ROOF_RUNOFF_COEFF: 0.85,
  SOLAR_SYSTEM_EFFICIENCY: 0.78,
} as const;

// Helper Functions
export function getDistrictRecord(idOrName: string): DistrictRegistryRecord | undefined {
  if (!idOrName) return undefined;
  const q = idOrName.trim().toLowerCase();
  if (DISTRICT_REGISTRY[q]) return DISTRICT_REGISTRY[q];
  return DISTRICT_LIST.find(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      q.includes(d.name.toLowerCase()) ||
      d.id.toLowerCase().includes(q)
  );
}

export function getDistrictRainfall(idOrName: string, fallbackMm = 1100): number {
  const d = getDistrictRecord(idOrName);
  return d ? d.rainfallAnnualMm : fallbackMm;
}

export function getDistrictCentroid(idOrName: string): [number, number] {
  const d = getDistrictRecord(idOrName);
  return d ? d.centroid : [-13.97, 33.79];
}

export function getDistrictSoil(idOrName: string): {
  faoSoilClassification: string;
  primarySoil: string;
  soilPh: string;
} {
  const d = getDistrictRecord(idOrName);
  return {
    faoSoilClassification: d?.faoSoilClassification || 'Eutric & Humic Nitisols (FAO HWSD v2.0)',
    primarySoil: d?.primarySoil || 'Eutric & Humic Nitisols (Katondo Red Clay Loam)',
    soilPh: d?.soilPh || 'pH 5.8 – 6.5',
  };
}
