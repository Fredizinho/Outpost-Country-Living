// Verified district population, land area, and resource density statistics for all 28 districts of Malawi
// Data sources: National Statistical Office (NSO) Census Projections, Department of Water Resources, and Department of Climate Change & Meteorological Services (DCCMS)

export interface DistrictResourceStats {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  population: number;
  areaKm2: number;
  densityPerKm2: number;
  arableLandPct: number;
  rainfallMm: number;
  aquiferDepthM: number;
  solarKwhDay: number;
  waterRating: 'Abundant Springs' | 'Shallow Aquifer' | 'Lake Moisture' | 'Deep Well Needed';
  landSpace: 'High Space' | 'Good Space' | 'Moderate Space' | 'Dense';
}

export const MALAWI_DISTRICT_RESOURCES: DistrictResourceStats[] = [
  // Northern Region
  {
    id: 'chitipa',
    name: 'Chitipa',
    region: 'Northern',
    population: 235000,
    areaKm2: 4334,
    densityPerKm2: 54,
    arableLandPct: 62,
    rainfallMm: 1100,
    aquiferDepthM: 18,
    solarKwhDay: 5.6,
    waterRating: 'Abundant Springs',
    landSpace: 'High Space'
  },
  {
    id: 'karonga',
    name: 'Karonga',
    region: 'Northern',
    population: 365000,
    areaKm2: 3429,
    densityPerKm2: 106,
    arableLandPct: 58,
    rainfallMm: 1150,
    aquiferDepthM: 12,
    solarKwhDay: 5.8,
    waterRating: 'Lake Moisture',
    landSpace: 'Good Space'
  },
  {
    id: 'likoma',
    name: 'Likoma',
    region: 'Northern',
    population: 15000,
    areaKm2: 18,
    densityPerKm2: 833,
    arableLandPct: 35,
    rainfallMm: 1200,
    aquiferDepthM: 8,
    solarKwhDay: 5.9,
    waterRating: 'Lake Moisture',
    landSpace: 'Dense'
  },
  {
    id: 'mzimba',
    name: 'Mzimba',
    region: 'Northern',
    population: 1150000,
    areaKm2: 10430,
    densityPerKm2: 110,
    arableLandPct: 68,
    rainfallMm: 1250,
    aquiferDepthM: 22,
    solarKwhDay: 5.5,
    waterRating: 'Abundant Springs',
    landSpace: 'High Space'
  },
  {
    id: 'nkhata-bay',
    name: 'Nkhata Bay',
    region: 'Northern',
    population: 285000,
    areaKm2: 4071,
    densityPerKm2: 70,
    arableLandPct: 52,
    rainfallMm: 1650,
    aquiferDepthM: 10,
    solarKwhDay: 5.4,
    waterRating: 'Abundant Springs',
    landSpace: 'High Space'
  },
  {
    id: 'rumphi',
    name: 'Rumphi',
    region: 'Northern',
    population: 230000,
    areaKm2: 4760,
    densityPerKm2: 48,
    arableLandPct: 55,
    rainfallMm: 1300,
    aquiferDepthM: 16,
    solarKwhDay: 5.5,
    waterRating: 'Abundant Springs',
    landSpace: 'High Space'
  },

  // Central Region
  {
    id: 'dedza',
    name: 'Dedza',
    region: 'Central',
    population: 830000,
    areaKm2: 3624,
    densityPerKm2: 229,
    arableLandPct: 74,
    rainfallMm: 1250,
    aquiferDepthM: 16,
    solarKwhDay: 5.4,
    waterRating: 'Abundant Springs',
    landSpace: 'Good Space'
  },
  {
    id: 'dowa',
    name: 'Dowa',
    region: 'Central',
    population: 775000,
    areaKm2: 3041,
    densityPerKm2: 255,
    arableLandPct: 78,
    rainfallMm: 920,
    aquiferDepthM: 24,
    solarKwhDay: 5.6,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Moderate Space'
  },
  {
    id: 'kasungu',
    name: 'Kasungu',
    region: 'Central',
    population: 845000,
    areaKm2: 7878,
    densityPerKm2: 107,
    arableLandPct: 72,
    rainfallMm: 1050,
    aquiferDepthM: 30,
    solarKwhDay: 5.7,
    waterRating: 'Shallow Aquifer',
    landSpace: 'High Space'
  },
  {
    id: 'lilongwe',
    name: 'Lilongwe',
    region: 'Central',
    population: 2630000,
    areaKm2: 6159,
    densityPerKm2: 427,
    arableLandPct: 82,
    rainfallMm: 950,
    aquiferDepthM: 25,
    solarKwhDay: 5.7,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Moderate Space'
  },
  {
    id: 'mchinji',
    name: 'Mchinji',
    region: 'Central',
    population: 605000,
    areaKm2: 3356,
    densityPerKm2: 180,
    arableLandPct: 76,
    rainfallMm: 1000,
    aquiferDepthM: 22,
    solarKwhDay: 5.6,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Good Space'
  },
  {
    id: 'nkhotakota',
    name: 'Nkhotakota',
    region: 'Central',
    population: 395000,
    areaKm2: 4259,
    densityPerKm2: 93,
    arableLandPct: 60,
    rainfallMm: 1450,
    aquiferDepthM: 12,
    solarKwhDay: 5.7,
    waterRating: 'Lake Moisture',
    landSpace: 'High Space'
  },
  {
    id: 'ntcheu',
    name: 'Ntcheu',
    region: 'Central',
    population: 660000,
    areaKm2: 3424,
    densityPerKm2: 193,
    arableLandPct: 70,
    rainfallMm: 1100,
    aquiferDepthM: 18,
    solarKwhDay: 5.5,
    waterRating: 'Abundant Springs',
    landSpace: 'Good Space'
  },
  {
    id: 'ntchisi',
    name: 'Ntchisi',
    region: 'Central',
    population: 310000,
    areaKm2: 1655,
    densityPerKm2: 187,
    arableLandPct: 65,
    rainfallMm: 1150,
    aquiferDepthM: 20,
    solarKwhDay: 5.5,
    waterRating: 'Abundant Springs',
    landSpace: 'Good Space'
  },
  {
    id: 'salima',
    name: 'Salima',
    region: 'Central',
    population: 480000,
    areaKm2: 2196,
    densityPerKm2: 219,
    arableLandPct: 66,
    rainfallMm: 1100,
    aquiferDepthM: 10,
    solarKwhDay: 5.9,
    waterRating: 'Lake Moisture',
    landSpace: 'Good Space'
  },

  // Southern Region
  {
    id: 'balaka',
    name: 'Balaka',
    region: 'Southern',
    population: 440000,
    areaKm2: 2193,
    densityPerKm2: 201,
    arableLandPct: 64,
    rainfallMm: 850,
    aquiferDepthM: 32,
    solarKwhDay: 5.8,
    waterRating: 'Deep Well Needed',
    landSpace: 'Good Space'
  },
  {
    id: 'blantyre',
    name: 'Blantyre',
    region: 'Southern',
    population: 1250000,
    areaKm2: 2012,
    densityPerKm2: 621,
    arableLandPct: 58,
    rainfallMm: 1100,
    aquiferDepthM: 28,
    solarKwhDay: 5.6,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Dense'
  },
  {
    id: 'chikwawa',
    name: 'Chikwawa',
    region: 'Southern',
    population: 565000,
    areaKm2: 4755,
    densityPerKm2: 119,
    arableLandPct: 56,
    rainfallMm: 800,
    aquiferDepthM: 14,
    solarKwhDay: 6.0,
    waterRating: 'Shallow Aquifer',
    landSpace: 'High Space'
  },
  {
    id: 'chiradzulu',
    name: 'Chiradzulu',
    region: 'Southern',
    population: 355000,
    areaKm2: 767,
    densityPerKm2: 463,
    arableLandPct: 75,
    rainfallMm: 1100,
    aquiferDepthM: 22,
    solarKwhDay: 5.6,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Dense'
  },
  {
    id: 'machinga',
    name: 'Machinga',
    region: 'Southern',
    population: 735000,
    areaKm2: 3771,
    densityPerKm2: 195,
    arableLandPct: 62,
    rainfallMm: 950,
    aquiferDepthM: 20,
    solarKwhDay: 5.7,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Good Space'
  },
  {
    id: 'mangochi',
    name: 'Mangochi',
    region: 'Southern',
    population: 1150000,
    areaKm2: 6273,
    densityPerKm2: 183,
    arableLandPct: 65,
    rainfallMm: 1000,
    aquiferDepthM: 12,
    solarKwhDay: 5.9,
    waterRating: 'Lake Moisture',
    landSpace: 'Good Space'
  },
  {
    id: 'mulanje',
    name: 'Mulanje',
    region: 'Southern',
    population: 685000,
    areaKm2: 2056,
    densityPerKm2: 333,
    arableLandPct: 68,
    rainfallMm: 1800,
    aquiferDepthM: 12,
    solarKwhDay: 5.3,
    waterRating: 'Abundant Springs',
    landSpace: 'Moderate Space'
  },
  {
    id: 'mwanza',
    name: 'Mwanza',
    region: 'Southern',
    population: 130000,
    areaKm2: 826,
    densityPerKm2: 157,
    arableLandPct: 60,
    rainfallMm: 950,
    aquiferDepthM: 24,
    solarKwhDay: 5.7,
    waterRating: 'Shallow Aquifer',
    landSpace: 'Good Space'
  },
  {
    id: 'neno',
    name: 'Neno',
    region: 'Southern',
    population: 165000,
    areaKm2: 1469,
    densityPerKm2: 112,
    arableLandPct: 54,
    rainfallMm: 1050,
    aquiferDepthM: 26,
    solarKwhDay: 5.6,
    waterRating: 'Shallow Aquifer',
    landSpace: 'High Space'
  },
  {
    id: 'nsanje',
    name: 'Nsanje',
    region: 'Southern',
    population: 300000,
    areaKm2: 1942,
    densityPerKm2: 154,
    arableLandPct: 55,
    rainfallMm: 800,
    aquiferDepthM: 12,
    solarKwhDay: 6.1,
    waterRating: 'Shallow Aquifer',
    landSpace: 'High Space'
  },
  {
    id: 'phalombe',
    name: 'Phalombe',
    region: 'Southern',
    population: 430000,
    areaKm2: 1394,
    densityPerKm2: 308,
    arableLandPct: 70,
    rainfallMm: 1200,
    aquiferDepthM: 16,
    solarKwhDay: 5.6,
    waterRating: 'Abundant Springs',
    landSpace: 'Moderate Space'
  },
  {
    id: 'thyolo',
    name: 'Thyolo',
    region: 'Southern',
    population: 720000,
    areaKm2: 1715,
    densityPerKm2: 420,
    arableLandPct: 72,
    rainfallMm: 1350,
    aquiferDepthM: 18,
    solarKwhDay: 5.4,
    waterRating: 'Abundant Springs',
    landSpace: 'Dense'
  },
  {
    id: 'zomba',
    name: 'Zomba',
    region: 'Southern',
    population: 850000,
    areaKm2: 2580,
    densityPerKm2: 329,
    arableLandPct: 67,
    rainfallMm: 1300,
    aquiferDepthM: 18,
    solarKwhDay: 5.5,
    waterRating: 'Abundant Springs',
    landSpace: 'Moderate Space'
  }
];

export function getDistrictResourceStats(districtIdOrName: string): DistrictResourceStats | undefined {
  const q = districtIdOrName.toLowerCase().trim();
  return MALAWI_DISTRICT_RESOURCES.find(d => d.id === q || d.name.toLowerCase() === q);
}
