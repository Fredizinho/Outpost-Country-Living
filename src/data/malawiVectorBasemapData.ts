// High-Precision Vector Geometries for Offline Basemap Rendering of Malawi
// Includes Lakes, National Road Network (M1, M5, M3, etc.), Major Cities/Towns, and Topographic Zones

export interface LakeGeometry {
  id: string;
  name: string;
  type: 'lake' | 'lagoon';
  areaKm2: number;
  waterDepthMeters: string;
  coordinates: [number, number][]; // [lat, lng] polygon ring
}

export interface HighwayCorridor {
  id: string;
  code: string;
  name: string;
  surface: 'Tarmac / All-Weather' | 'Engineered Gravel';
  connectingBomas: string;
  coordinates: [number, number][]; // [lat, lng] polyline
}

export interface UrbanCenterNode {
  id: string;
  name: string;
  category: 'National Capital' | 'Commercial Hub' | 'Regional City' | 'District Boma' | 'Strategic Junction';
  region: 'Northern' | 'Central' | 'Southern';
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  marketDay: string;
}

// -------------------------------------------------------------
// 1. MAJOR LAKES & WATER BODIES (OFFLINE VECTOR GEOMETRIES)
// -------------------------------------------------------------
export const MALAWI_LAKES: LakeGeometry[] = [
  {
    id: 'lake-malawi',
    name: 'Lake Malawi (Lake Nyasa)',
    type: 'lake',
    areaKm2: 29600,
    waterDepthMeters: 'Up to 706m deep (Rift Valley Trench)',
    coordinates: [
      [-9.50, 33.95],
      [-9.70, 34.05],
      [-10.00, 34.15],
      [-10.40, 34.25],
      [-10.75, 34.20],
      [-11.10, 34.22],
      [-11.45, 34.30],
      [-11.75, 34.40],
      [-12.00, 34.55],
      [-12.35, 34.70],
      [-12.80, 34.75],
      [-13.20, 34.80],
      [-13.60, 34.90],
      [-13.95, 35.10],
      [-14.25, 35.15],
      [-14.40, 35.25],
      [-14.48, 35.15],
      [-14.40, 35.00],
      [-14.15, 34.85],
      [-13.80, 34.65],
      [-13.40, 34.35],
      [-13.00, 34.30],
      [-12.60, 34.25],
      [-12.10, 34.10],
      [-11.60, 34.20],
      [-11.20, 34.15],
      [-10.80, 34.10],
      [-10.40, 34.10],
      [-9.90, 33.90],
      [-9.50, 33.95]
    ]
  },
  {
    id: 'lake-malombe',
    name: 'Lake Malombe',
    type: 'lake',
    areaKm2: 450,
    waterDepthMeters: '4m – 7m (Upper Shire Basin)',
    coordinates: [
      [-14.60, 35.22],
      [-14.62, 35.32],
      [-14.78, 35.35],
      [-14.85, 35.28],
      [-14.82, 35.20],
      [-14.70, 35.18],
      [-14.60, 35.22]
    ]
  },
  {
    id: 'lake-chilwa',
    name: 'Lake Chilwa (Endorheic Wetland)',
    type: 'lake',
    areaKm2: 1750,
    waterDepthMeters: '1m – 3m (Alkaline Wetland & Fish Sanctuary)',
    coordinates: [
      [-15.10, 35.65],
      [-15.15, 35.85],
      [-15.35, 35.95],
      [-15.55, 35.85],
      [-15.50, 35.65],
      [-15.30, 35.55],
      [-15.10, 35.65]
    ]
  },
  {
    id: 'lake-chiuta',
    name: 'Lake Chiuta',
    type: 'lake',
    areaKm2: 200,
    waterDepthMeters: '3m – 5m (Eastern Border Basin)',
    coordinates: [
      [-14.75, 35.80],
      [-14.80, 35.95],
      [-15.00, 35.90],
      [-14.95, 35.78],
      [-14.75, 35.80]
    ]
  }
];

// -------------------------------------------------------------
// 2. PRIMARY NATIONAL HIGHWAYS (OFFLINE TRANSPORT ARTERIES)
// -------------------------------------------------------------
export const MALAWI_HIGHWAYS: HighwayCorridor[] = [
  {
    id: 'm1-highway',
    code: 'M1',
    name: 'M1 National Spine (North-South Trans-Malawi Corridor)',
    surface: 'Tarmac / All-Weather',
    connectingBomas: 'Songwe Border -> Karonga -> Mzuzu -> Kasungu -> Lilongwe -> Dedza -> Ntcheu -> Blantyre -> Nsanje',
    coordinates: [
      [-9.72, 33.88], // Songwe Border
      [-9.93, 33.93], // Karonga
      [-10.55, 34.02], // Chiweta Escarpment
      [-10.73, 34.03], // Rumphi Turnoff
      [-11.45, 34.02], // Mzuzu City
      [-11.90, 33.60], // Mzimba Boma
      [-12.38, 33.55], // Jenda
      [-13.03, 33.48], // Kasungu
      [-13.78, 33.72], // Mponela
      [-13.98, 33.78], // Lilongwe City
      [-14.37, 34.33], // Dedza Boma
      [-14.82, 34.63], // Ntcheu
      [-15.18, 34.95], // Balaka / Zalewa
      [-15.78, 35.00], // Blantyre City
      [-16.03, 35.13], // Thyolo
      [-16.52, 35.15], // Bangula
      [-16.92, 35.26]  // Nsanje / Marka Border
    ]
  },
  {
    id: 'm5-highway',
    code: 'M5',
    name: 'M5 Lakeshore Highway (Strategic Waterway Route)',
    surface: 'Tarmac / All-Weather',
    connectingBomas: 'Mzuzu -> Nkhata Bay -> Nkhotakota -> Salima -> Golomoti -> Balaka',
    coordinates: [
      [-11.45, 34.02], // Mzuzu
      [-11.60, 34.29], // Nkhata Bay
      [-12.18, 34.08], // Chintheche
      [-12.60, 34.18], // Dwangwa Sugar
      [-12.93, 34.29], // Nkhotakota
      [-13.78, 34.45], // Salima / Chipoka
      [-14.40, 34.60], // Golomoti
      [-15.00, 34.85]  // Chingeni / Balaka Junction
    ]
  },
  {
    id: 'm3-highway',
    code: 'M3',
    name: 'M3 Eastern Corridor (Shire Highlands & Massifs Route)',
    surface: 'Tarmac / All-Weather',
    connectingBomas: 'Lilongwe -> Salima -> Mangochi -> Liwonde -> Zomba -> Blantyre',
    coordinates: [
      [-14.47, 35.26], // Mangochi Boma
      [-15.06, 35.22], // Liwonde
      [-15.38, 35.33], // Zomba City
      [-15.78, 35.00]  // Blantyre City
    ]
  },
  {
    id: 'm2-highway',
    code: 'M2',
    name: 'M2 Mulanje-Mozambique Arterial',
    surface: 'Tarmac / All-Weather',
    connectingBomas: 'Blantyre -> Limbe -> Thyolo -> Luchenza -> Mulanje -> Muloza Border',
    coordinates: [
      [-15.78, 35.00], // Blantyre
      [-16.01, 35.14], // Thyolo
      [-16.01, 35.31], // Luchenza
      [-16.03, 35.50], // Mulanje Boma
      [-16.05, 35.73]  // Muloza Border
    ]
  },
  {
    id: 'm12-highway',
    code: 'M12',
    name: 'M12 Western Arterial (Mchinji-Zambia Corridor)',
    surface: 'Tarmac / All-Weather',
    connectingBomas: 'Lilongwe -> Namitete -> Mchinji -> Mwami Border',
    coordinates: [
      [-13.98, 33.78], // Lilongwe
      [-13.88, 33.35], // Namitete
      [-13.79, 32.89], // Mchinji Boma
      [-13.75, 32.75]  // Mwami / Chipata Border
    ]
  }
];

// -------------------------------------------------------------
// 3. MAJOR URBAN CENTRES & DISTRICT BOMAS (OFFLINE NODES)
// -------------------------------------------------------------
export const MALAWI_CITIES_AND_BOMAS: UrbanCenterNode[] = [
  // CITIES & REGIONAL CAPITALS
  {
    id: 'lilongwe-city',
    name: 'Lilongwe',
    category: 'National Capital',
    region: 'Central',
    coordinates: [-13.9833, 33.7833],
    elevationMeters: 1050,
    marketDay: 'Daily (Central Market & Area 2)'
  },
  {
    id: 'blantyre-city',
    name: 'Blantyre',
    category: 'Commercial Hub',
    region: 'Southern',
    coordinates: [-15.7861, 35.0058],
    elevationMeters: 1040,
    marketDay: 'Daily (Limbe & Blantyre CBD)'
  },
  {
    id: 'mzuzu-city',
    name: 'Mzuzu',
    category: 'Regional City',
    region: 'Northern',
    coordinates: [-11.4583, 34.0167],
    elevationMeters: 1250,
    marketDay: 'Daily (Mzuzu Main Market)'
  },
  {
    id: 'zomba-city',
    name: 'Zomba',
    category: 'Regional City',
    region: 'Southern',
    coordinates: [-15.3833, 35.3333],
    elevationMeters: 950,
    marketDay: 'Daily (Zomba Central Market)'
  },
  // KEY DISTRICT BOMAS
  {
    id: 'dedza-boma',
    name: 'Dedza Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-14.3667, 34.3333],
    elevationMeters: 1620,
    marketDay: 'Wednesday & Saturday'
  },
  {
    id: 'kasungu-boma',
    name: 'Kasungu Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-13.0333, 33.4833],
    elevationMeters: 1080,
    marketDay: 'Tuesday & Friday'
  },
  {
    id: 'mzimba-boma',
    name: 'Mzimba Boma',
    category: 'District Boma',
    region: 'Northern',
    coordinates: [-11.9000, 33.6000],
    elevationMeters: 1350,
    marketDay: 'Monday & Thursday'
  },
  {
    id: 'karonga-boma',
    name: 'Karonga Boma',
    category: 'District Boma',
    region: 'Northern',
    coordinates: [-9.9333, 33.9333],
    elevationMeters: 485,
    marketDay: 'Wednesday & Saturday'
  },
  {
    id: 'rumphi-boma',
    name: 'Rumphi Boma',
    category: 'District Boma',
    region: 'Northern',
    coordinates: [-10.7333, 33.8667],
    elevationMeters: 1100,
    marketDay: 'Thursday & Saturday'
  },
  {
    id: 'nkhotakota-boma',
    name: 'Nkhotakota Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-12.9333, 34.2900],
    elevationMeters: 490,
    marketDay: 'Wednesday & Saturday'
  },
  {
    id: 'salima-boma',
    name: 'Salima Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-13.7800, 34.4500],
    elevationMeters: 510,
    marketDay: 'Tuesday & Saturday'
  },
  {
    id: 'mangochi-boma',
    name: 'Mangochi Boma',
    category: 'District Boma',
    region: 'Southern',
    coordinates: [-14.4781, 35.2645],
    elevationMeters: 480,
    marketDay: 'Daily (Lakeshore Hub)'
  },
  {
    id: 'mulanje-boma',
    name: 'Mulanje Boma',
    category: 'District Boma',
    region: 'Southern',
    coordinates: [-16.0317, 35.5000],
    elevationMeters: 750,
    marketDay: 'Monday & Thursday'
  },
  {
    id: 'thyolo-boma',
    name: 'Thyolo Boma',
    category: 'District Boma',
    region: 'Southern',
    coordinates: [-16.0667, 35.1333],
    elevationMeters: 1020,
    marketDay: 'Wednesday & Saturday'
  },
  {
    id: 'ntcheu-boma',
    name: 'Ntcheu Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-14.8200, 34.6300],
    elevationMeters: 1280,
    marketDay: 'Tuesday & Friday'
  },
  {
    id: 'mchinji-boma',
    name: 'Mchinji Boma',
    category: 'District Boma',
    region: 'Central',
    coordinates: [-13.7900, 32.8900],
    elevationMeters: 1180,
    marketDay: 'Monday & Thursday'
  },
  {
    id: 'balaka-boma',
    name: 'Balaka Junction',
    category: 'Strategic Junction',
    region: 'Southern',
    coordinates: [-14.9800, 34.9500],
    elevationMeters: 620,
    marketDay: 'Daily (Railway & Highway Junction)'
  },
  {
    id: 'chikwawa-boma',
    name: 'Chikwawa Boma',
    category: 'District Boma',
    region: 'Southern',
    coordinates: [-16.0333, 34.8000],
    elevationMeters: 120,
    marketDay: 'Wednesday & Saturday'
  },
  {
    id: 'nsanje-boma',
    name: 'Nsanje Boma',
    category: 'District Boma',
    region: 'Southern',
    coordinates: [-16.9200, 35.2600],
    elevationMeters: 55,
    marketDay: 'Tuesday & Friday'
  }
];
