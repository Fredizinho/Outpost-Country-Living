import { RegionData } from './skillsAndSeasons';

export interface RegionalClimateZone {
  id: string;
  name: string;
  category: 'rainfall' | 'soil' | 'elevation' | 'macroRegion';
  color: string;
  borderColor: string;
  fillOpacity: number;
  coordinates: [number, number][]; // [lat, lng] array
  metrics: {
    elevation: string;
    soilProfile: string;
    aquiferDepth: string;
    rainfall: string;
    temperature: string;
    soilpH: string;
    topCrops: string[];
    feasibilityGrade: string;
    keyDistricts: string[];
    description: string;
  };
}

export interface RegionalRainfallOverlay {
  id: string;
  name: string;
  zone: string;
  color: string;
  fillOpacity: number;
  rainfallMm: number;
  coordinates: [number, number][];
}

export interface RegionalSoilOverlay {
  id: string;
  name: string;
  characteristics: string;
  soilpH: string;
  color: string;
  fillOpacity: number;
  coordinates: [number, number][];
}

export interface RegionalElevationOverlay {
  id: string;
  name: string;
  elevation: string;
  climate: string;
  color: string;
  fillOpacity: number;
  coordinates: [number, number][];
}

// 1. MACRO REGIONAL ZONES (Geographic Polygons)
export const MALAWI_MACRO_REGIONS: RegionalClimateZone[] = [
  {
    id: 'central-highlands',
    name: 'Dedza & Central Highlands Plateau',
    category: 'macroRegion',
    color: '#059669', // Emerald
    borderColor: '#34d399',
    fillOpacity: 0.18,
    coordinates: [
      [-13.5, 33.2],
      [-12.8, 33.5],
      [-13.2, 34.3],
      [-14.1, 34.8],
      [-14.9, 34.7],
      [-14.8, 34.1],
      [-14.2, 33.6],
      [-13.5, 33.2]
    ],
    metrics: {
      elevation: '1,100m – 2,100m ASL (Dedza Mountain Peak 2,198m)',
      soilProfile: 'Deep Volcanic Red Clay Loam (Katondo Oxisols) with high CEC',
      aquiferDepth: '15m – 25m (Shallow fractured basement & mountain springs)',
      rainfall: '1,100 – 1,450 mm/year (Unimodal + Winter Chiperoni mists)',
      temperature: '12°C – 26°C (Cool nights, winter lows drop to 6°C in Dedza)',
      soilpH: 'pH 6.0 – 6.5',
      topCrops: ['Irish Potatoes', 'Apples', 'Wheat', 'Beans', 'Groundnuts', 'Dairy', 'Peaches'],
      feasibilityGrade: 'A+ (Highest Feasibility)',
      keyDistricts: ['Dedza', 'Ntcheu', 'Lilongwe Rural', 'Dowa', 'Kasungu'],
      description: 'The agricultural heartbeat of Malawi. Cool temperate altitude, rich volcanic Katondo topsoil, and shallow perennial mountain aquifers create ideal conditions for perennial orchards, grain autonomy, and off-grid homesteading.'
    }
  },
  {
    id: 'northern-plateau',
    name: 'Viphya Plateau & Northern Highlands',
    category: 'macroRegion',
    color: '#0284c7', // Sky Blue
    borderColor: '#38bdf8',
    fillOpacity: 0.18,
    coordinates: [
      [-9.3, 33.4],
      [-9.8, 33.8],
      [-10.5, 34.2],
      [-11.5, 34.3],
      [-12.3, 33.8],
      [-12.2, 33.2],
      [-11.0, 33.4],
      [-9.3, 33.4]
    ],
    metrics: {
      elevation: '1,200m – 2,400m ASL (Nyika Plateau up to 2,600m)',
      soilProfile: 'Deep Humic Forest Acrisols & Red Loams with rich organic layer',
      aquiferDepth: '< 20m (Abundant perennial mountain gravity springs)',
      rainfall: '1,200 – 1,850 mm/year (Extended season through May/June)',
      temperature: '10°C – 25°C (Crisp montane climate)',
      soilpH: 'pH 5.0 – 6.0',
      topCrops: ['Arabica Coffee', 'Macadamia Nuts', 'Bananas', 'Cassava', 'Citrus', 'Timber'],
      feasibilityGrade: 'A+ (Very High Feasibility)',
      keyDistricts: ['Mzimba', 'Nkhata Bay', 'Rumphi', 'Chitipa (Misuku)', 'Karonga'],
      description: 'Pristine timberland and expansive highland plateaus with extensive rainfall windows and permanent gravity streams. Perfect for multi-tier food forests, coffee, and long-term agroforestry reserves.'
    }
  },
  {
    id: 'southern-massifs',
    name: 'Southern Massifs & Shire Highlands',
    category: 'macroRegion',
    color: '#d97706', // Amber
    borderColor: '#fbbf24',
    fillOpacity: 0.18,
    coordinates: [
      [-14.9, 35.1],
      [-15.2, 35.8],
      [-15.8, 35.9],
      [-16.2, 35.6],
      [-16.0, 35.0],
      [-15.4, 34.9],
      [-14.9, 35.1]
    ],
    metrics: {
      elevation: '700m – 2,000m ASL (Mulanje Massif Sapitwa Peak 3,002m)',
      soilProfile: 'Deep Humic Nitisols, Volcanic Loam & River Valley Silt',
      aquiferDepth: '12m – 30m (High recharge mountain aquifers & perennial streams)',
      rainfall: '1,400 – 2,400 mm/year (Mulanje windward slopes up to 2,600mm)',
      temperature: '14°C – 28°C (High winter Chiperoni humidity)',
      soilpH: 'pH 4.8 – 6.0',
      topCrops: ['Avocados', 'Tea', 'Pineapples', 'Vegetables', 'Papaya', 'Guavas', 'Macadamia'],
      feasibilityGrade: 'A (High Feasibility)',
      keyDistricts: ['Mulanje', 'Zomba', 'Thyolo', 'Blantyre Rural', 'Mwanza'],
      description: 'Towering granitic massifs and mist-fed cloud forests that receive the highest precipitation in Southern Africa. Outstanding orchard and tea microclimates with year-round river cascades.'
    }
  },
  {
    id: 'lakeshore-basin',
    name: 'Lake Malawi Basin & Alluvial Plains',
    category: 'macroRegion',
    color: '#06b6d4', // Cyan
    borderColor: '#22d3ee',
    fillOpacity: 0.16,
    coordinates: [
      [-10.0, 34.0],
      [-10.2, 34.3],
      [-11.5, 34.4],
      [-12.5, 34.3],
      [-13.8, 34.6],
      [-14.3, 34.8],
      [-14.1, 34.4],
      [-12.8, 34.1],
      [-11.5, 34.1],
      [-10.0, 34.0]
    ],
    metrics: {
      elevation: '475m – 650m ASL (Lakeshore plain)',
      soilProfile: 'Hydromorphic Alluvial Silts, Sandy Loams & Dambo Clays',
      aquiferDepth: '5m – 15m (Very shallow lake basin water table)',
      rainfall: '900 – 1,600 mm/year',
      temperature: '20°C – 33°C (Tropical warm lake climate)',
      soilpH: 'pH 6.2 – 7.2',
      topCrops: ['Rice', 'Cassava', 'Mangoes', 'Fish Farming / Aquaponics', 'Bananas', 'Sugarcane'],
      feasibilityGrade: 'B+ (High Irrigation Potential)',
      keyDistricts: ['Nkhotakota', 'Salima', 'Mangochi', 'Nkhata Bay Lakeshore', 'Karonga'],
      description: 'Lush tropical shoreline with unlimited fresh water access. Excellent for solar-pumped aquaponics, flood-recession horticulture, and year-round tropical fruits.'
    }
  },
  {
    id: 'lower-shire-valley',
    name: 'Lower Shire Valley & Floodplains',
    category: 'macroRegion',
    color: '#ea580c', // Orange-Red
    borderColor: '#f97316',
    fillOpacity: 0.16,
    coordinates: [
      [-15.9, 34.7],
      [-16.1, 35.1],
      [-16.8, 35.3],
      [-17.1, 35.2],
      [-16.9, 34.8],
      [-16.3, 34.5],
      [-15.9, 34.7]
    ],
    metrics: {
      elevation: '40m – 300m ASL (Lowest point in Malawi)',
      soilProfile: 'Heavy Black Cotton Soils (Vertisols) & Alluvial Floodplain Deposits',
      aquiferDepth: '15m – 40m (High salinity pockets in low valleys)',
      rainfall: '650 – 850 mm/year (Semi-arid with high evaporation)',
      temperature: '24°C – 38°C (Hot tropical lowland)',
      soilpH: 'pH 6.5 – 7.8',
      topCrops: ['Sugarcane', 'Cotton', 'Sorghum', 'Millet', 'Pigeon Peas', 'Tilapia'],
      feasibilityGrade: 'B (Requires Managed Irrigation)',
      keyDistricts: ['Chikwawa', 'Nsanje'],
      description: 'Sub-tropical Rift Valley floor fed by the mighty Shire River. High thermal units require shade canopy and drip irrigation systems for maximum yield.'
    }
  }
];

// 2. RAINFALL ISOHYET BANDS (Isohyets / Precipitation Overlays)
export const MALAWI_RAINFALL_OVERLAYS: RegionalRainfallOverlay[] = [
  {
    id: 'rain-high-north',
    name: 'High Rainfall Belt (>1,500mm / yr)',
    zone: 'Northern Highlands & Lakeshore Escarpment',
    color: '#0284c7',
    fillOpacity: 0.22,
    rainfallMm: 1750,
    coordinates: [
      [-9.4, 33.4],
      [-9.8, 33.9],
      [-10.8, 34.3],
      [-11.8, 34.4],
      [-11.9, 33.7],
      [-10.8, 33.4],
      [-9.4, 33.4]
    ]
  },
  {
    id: 'rain-high-south',
    name: 'Super-Humid Massif Belt (>1,800mm / yr)',
    zone: 'Mulanje Massif & Zomba Plateau',
    color: '#1d4ed8',
    fillOpacity: 0.25,
    rainfallMm: 2200,
    coordinates: [
      [-15.2, 35.2],
      [-15.6, 35.8],
      [-16.2, 35.7],
      [-16.1, 35.2],
      [-15.2, 35.2]
    ]
  },
  {
    id: 'rain-med-central',
    name: 'Moderate Breadbasket Rainfall (1,000 - 1,400mm / yr)',
    zone: 'Central Agricultural Plateau (Dedza, Lilongwe, Kasungu)',
    color: '#059669',
    fillOpacity: 0.18,
    rainfallMm: 1200,
    coordinates: [
      [-12.7, 33.3],
      [-13.1, 34.2],
      [-14.5, 34.6],
      [-14.8, 34.0],
      [-13.9, 33.4],
      [-12.7, 33.3]
    ]
  },
  {
    id: 'rain-low-shire',
    name: 'Semi-Arid Lowland Belt (650 - 850mm / yr)',
    zone: 'Lower Shire & Rain-Shadow Zones',
    color: '#d97706',
    fillOpacity: 0.18,
    rainfallMm: 750,
    coordinates: [
      [-15.9, 34.6],
      [-16.1, 35.1],
      [-17.0, 35.2],
      [-16.8, 34.7],
      [-15.9, 34.6]
    ]
  }
];

// 3. SOIL pH & PEDOLOGY PROFILE OVERLAYS
export const MALAWI_SOIL_OVERLAYS: RegionalSoilOverlay[] = [
  {
    id: 'soil-katondo-central',
    name: 'Katondo Red Latosols (Oxisols / Nitisols)',
    characteristics: 'Deep fertile red clay loam, pH 6.0–6.5, high CEC & rich mycorrhizae. Prime for staples & orchards.',
    soilpH: 'pH 6.0 – 6.5',
    color: '#b91c1c', // Crimson/Red
    fillOpacity: 0.2,
    coordinates: [
      [-13.4, 33.4],
      [-13.6, 34.3],
      [-14.7, 34.6],
      [-14.8, 33.9],
      [-14.1, 33.5],
      [-13.4, 33.4]
    ]
  },
  {
    id: 'soil-humic-north',
    name: 'Humic Montane Acrisols & Peat Soils',
    characteristics: 'High organic matter forest soils, pH 5.0–5.8. High porosity, perfect for coffee & agroforestry.',
    soilpH: 'pH 5.0 – 5.8',
    color: '#15803d', // Deep Green
    fillOpacity: 0.2,
    coordinates: [
      [-9.5, 33.5],
      [-10.2, 34.1],
      [-11.6, 34.2],
      [-11.8, 33.6],
      [-10.6, 33.5],
      [-9.5, 33.5]
    ]
  },
  {
    id: 'soil-alluvial-dambo',
    name: 'Hydromorphic Dambo Clays & Silt Basins',
    characteristics: 'Water-retentive valley floor soils, pH 6.2–7.2. Ideal for dry-season wetland furrow horticulture.',
    soilpH: 'pH 6.2 – 7.2',
    color: '#0891b2', // Cyan-Teal
    fillOpacity: 0.2,
    coordinates: [
      [-12.6, 33.5],
      [-12.8, 34.0],
      [-13.3, 34.3],
      [-13.4, 33.7],
      [-12.6, 33.5]
    ]
  },
  {
    id: 'soil-volcanic-south',
    name: 'Volcanic Humic Loams (Shire Highlands)',
    characteristics: 'Rich weathering mineral soils, pH 5.2–6.2. Exceptional fertility for avocados, macadamia, tea.',
    soilpH: 'pH 5.2 – 6.2',
    color: '#7c2d12', // Warm Earth Red
    fillOpacity: 0.22,
    coordinates: [
      [-15.1, 35.1],
      [-15.5, 35.7],
      [-16.2, 35.6],
      [-15.9, 35.0],
      [-15.1, 35.1]
    ]
  }
];

// 4. ELEVATION CONTOUR BANDS
export const MALAWI_ELEVATION_OVERLAYS: RegionalElevationOverlay[] = [
  {
    id: 'elev-highland-montane',
    name: 'Highland Montane Sanctuary (>1,500m – 3,000m)',
    elevation: '1,500m – 3,002m ASL',
    climate: 'Cool temperate, frost risk in June/July valleys, high mountain hydro potential.',
    color: '#14532d', // Dark Emerald
    fillOpacity: 0.25,
    coordinates: [
      [-14.1, 34.1],
      [-14.2, 34.5],
      [-14.7, 34.6],
      [-14.7, 34.2],
      [-14.1, 34.1]
    ]
  },
  {
    id: 'elev-highland-viphya',
    name: 'Viphya & Nyika Montane (>1,600m – 2,600m)',
    elevation: '1,600m – 2,600m ASL',
    climate: 'High-altitude cold mountain plateau, gravity spring heads.',
    color: '#14532d',
    fillOpacity: 0.25,
    coordinates: [
      [-10.4, 33.6],
      [-10.7, 34.0],
      [-11.7, 33.9],
      [-11.5, 33.5],
      [-10.4, 33.6]
    ]
  },
  {
    id: 'elev-plateau-plains',
    name: 'Agricultural Plateau Plains (950m – 1,400m)',
    elevation: '950m – 1,400m ASL',
    climate: 'Ideal sun hours, warm days, cool nights. The primary grain breadbasket.',
    color: '#16a34a', // Mid Green
    fillOpacity: 0.16,
    coordinates: [
      [-12.8, 33.1],
      [-13.2, 34.1],
      [-14.2, 34.2],
      [-14.4, 33.5],
      [-13.5, 33.1],
      [-12.8, 33.1]
    ]
  },
  {
    id: 'elev-lowland-rift',
    name: 'Rift Valley & Shire Lowlands (<700m)',
    elevation: '45m – 700m ASL',
    climate: 'Tropical heat, high evaporation, unlimited water availability from Lake & Shire.',
    color: '#eab308', // Yellow
    fillOpacity: 0.18,
    coordinates: [
      [-10.2, 34.1],
      [-11.5, 34.3],
      [-13.8, 34.6],
      [-14.3, 34.7],
      [-14.1, 34.4],
      [-12.5, 34.1],
      [-10.2, 34.1]
    ]
  }
];
