// Centralized Data Registry for Outpost Living
// Single source of truth for District Telemetry, Coordinates, Rainfall, Soil Types, and Agronomy/Pit Dimensions

import { MALAWI_DISTRICTS, MalawiDistrictSpec } from './malawiDistrictData';
import { MALAWI_DISTRICT_RESOURCES, DistrictResourceStats } from './districtResourceData';

export interface DistrictRegistryRecord {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  centroid: [number, number]; // [latitude, longitude]
  lat: number;
  lng: number;
  optimalZoom: number;
  elevationRange: string;
  rainfallAnnualMm: number; // Canonical annual rainfall normal (DCCMS source of truth)
  rainfallPattern: string;
  primarySoil: string;
  soilPh: string;
  topCrops: string[];
  traditionalAuthorities: string[];
  feasibilityGrade: string;
  aquiferDepth: string;
  aquiferDepthM: number;
  solarKwhDay: number;
  population?: number;
  areaKm2?: number;
  description: string;
  boundary: [number, number][];
}

// Map resources by district ID
const resourceMap = new Map<string, DistrictResourceStats>();
MALAWI_DISTRICT_RESOURCES.forEach((r) => resourceMap.set(r.id.toLowerCase(), r));

// Build comprehensive unified dictionary
export const DISTRICT_REGISTRY: Record<string, DistrictRegistryRecord> = {};
export const DISTRICT_LIST: DistrictRegistryRecord[] = MALAWI_DISTRICTS.map((spec) => {
  const res = resourceMap.get(spec.id.toLowerCase());
  const record: DistrictRegistryRecord = {
    id: spec.id,
    name: spec.name,
    region: spec.region,
    centroid: spec.centroid,
    lat: spec.centroid[0],
    lng: spec.centroid[1],
    optimalZoom: spec.optimalZoom,
    elevationRange: spec.elevationRange,
    // Canonical rainfall (Dedza = 1250mm, Mzimba = 1250mm, Mulanje = 2200mm, etc.)
    rainfallAnnualMm: spec.rainfallAnnualMm,
    rainfallPattern: spec.rainfallPattern,
    primarySoil: spec.primarySoil,
    soilPh: spec.soilPh,
    topCrops: spec.topCrops,
    traditionalAuthorities: spec.traditionalAuthorities,
    feasibilityGrade: spec.feasibilityGrade,
    aquiferDepth: spec.aquiferDepth,
    aquiferDepthM: res?.aquiferDepthM || 20,
    solarKwhDay: res?.solarKwhDay || 5.5,
    population: res?.population,
    areaKm2: res?.areaKm2,
    description: spec.description,
    boundary: spec.boundary,
  };
  DISTRICT_REGISTRY[spec.id.toLowerCase()] = record;
  DISTRICT_REGISTRY[spec.name.toLowerCase()] = record;
  return record;
});

// Canonical Rainfall Presets for Calculators & Agricultural Models
export const DISTRICT_RAINFALL_PRESETS: Record<string, { name: string; rainfall: number; region: string }> = {
  dedza: { name: 'Dedza / Ntcheu Highlands', rainfall: 1250, region: 'Central' },
  mzimba: { name: 'Mzimba & Viphya Plateau', rainfall: 1250, region: 'Northern' },
  mulanje: { name: 'Mulanje & Thyolo Tea Belt', rainfall: 2200, region: 'Southern' },
  lilongwe: { name: 'Lilongwe & Central Plains', rainfall: 950, region: 'Central' },
  zomba: { name: 'Zomba Plateau', rainfall: 1550, region: 'Southern' },
  kasungu: { name: 'Kasungu Savanna Plateau', rainfall: 1050, region: 'Central' },
  ntcheu: { name: 'Ntcheu / Kirk Range Ridge', rainfall: 1350, region: 'Central' },
  nkhotakota: { name: 'Nkhotakota & Lake Shore', rainfall: 1200, region: 'Central' },
  chitipa: { name: 'Chitipa / Misuku Hills', rainfall: 1450, region: 'Northern' },
  karonga: { name: 'Karonga & Northern Lake', rainfall: 1150, region: 'Northern' },
  salima: { name: 'Salima Lakeshore Basin', rainfall: 1100, region: 'Central' },
  rumphi: { name: 'Rumphi & Nyika Foothills', rainfall: 1100, region: 'Northern' },
};

// Canonical Planting Pit & Permaculture Bed Dimensions
export const PLANTING_PIT_SPECS = {
  egwDeepPit: {
    id: 'egw-deep-pit',
    name: 'Ellen G. White Deep Planting Pit',
    widthCm: 100,
    lengthCm: 100,
    depthCm: 100,
    volumeM3: 1.0,
    volumeLiters: 1000,
    dimensionString: '1.0m × 1.0m × 1.0m (1.0 m³)',
    rockDrainageDepthCm: 20,
    biocharKgPerPit: 3.0,
    compostWheelbarrows: 4,
    description: 'Excavated 100cm deep into subsoil with coarse rock drainage layer, layered thermophilic compost, charged biochar, and topsoil to break hardpan and allow lifelong taproot anchoring.',
  },
  standardFruitTreePit: {
    id: 'standard-orchard-pit',
    name: 'Standard Orchard Tree Pit',
    widthCm: 80,
    lengthCm: 80,
    depthCm: 80,
    volumeM3: 0.512,
    volumeLiters: 512,
    dimensionString: '80cm × 80cm × 80cm (0.5 m³)',
    rockDrainageDepthCm: 15,
    biocharKgPerPit: 2.0,
    compostWheelbarrows: 2.5,
    description: 'Medium deep orchard pit suited for citrus, avocado, macadamia, and guava in deep friable loams.',
  },
  compactTreePit: {
    id: 'compact-tree-pit',
    name: 'Compact Tree Pit',
    widthCm: 60,
    lengthCm: 60,
    depthCm: 60,
    volumeM3: 0.216,
    volumeLiters: 216,
    dimensionString: '60cm × 60cm × 60cm',
    rockDrainageDepthCm: 10,
    biocharKgPerPit: 1.0,
    compostWheelbarrows: 1.5,
    description: 'Standard nursery transplant pit for fast-growing pioneer trees and windbreak hedges.',
  },
  zaiPit: {
    id: 'zai-water-harvesting-pit',
    name: 'Traditional Zaï Water-Harvesting Pit',
    widthCm: 30,
    lengthCm: 30,
    depthCm: 20,
    volumeM3: 0.018,
    volumeLiters: 18,
    dimensionString: '30cm wide × 20cm deep',
    spacingCm: 75,
    description: 'Sunken micro-basin filled with compost/manure slurry to concentrate rainfall and runoff directly in crop root zones in semi-arid plains.',
  },
  bananaCirclePit: {
    id: 'banana-circle-pit',
    name: 'Banana Circle Mulch Basin',
    diameterM: 2.0,
    depthM: 1.0,
    dimensionString: '2.0m diameter × 1.0m center depth',
    description: 'Central organic sponge basin receiving roof overflow or swale water, ringed by 4-6 heavy-feeding banana or papaya trees.',
  },
  biointensiveBed: {
    id: 'biointensive-double-dug-bed',
    name: 'Double-Dug Bio-Intensive Bed',
    widthM: 1.2,
    lengthM: 6.0,
    depthCm: 60,
    dimensionString: '1.2m width × 6.0m length × 60cm depth',
    description: 'Standard 4ft wide garden bed loosened to 60cm depth without turning subsoil, providing aerated pore volume for multi-tier companion planting.',
  },
} as const;

// Canonical Urban Hubs
export const URBAN_HUBS = {
  lilongwe: { name: 'Lilongwe City (Capital)', lat: -13.97, lng: 33.79 },
  blantyre: { name: 'Blantyre Commercial Hub', lat: -15.79, lng: 35.00 },
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
  return d ? d.centroid : [-13.97, 33.79]; // default to Malawi central
}

export function getDistrictSoil(idOrName: string): { primarySoil: string; soilPh: string } {
  const d = getDistrictRecord(idOrName);
  return {
    primarySoil: d?.primarySoil || 'Ferruginous Red Clay Loam',
    soilPh: d?.soilPh || 'pH 6.0 – 6.5',
  };
}
