// Topographic Elevation Contours & Valley Dambo Vectors for Malawi
// Highlighting elevation intervals (480m Lakeshore floor to 2200m+ Frost-Free Highland Ridges)
// Provides visual cues on Valley Dambos vs Frost-Free Highland Ridges

export interface ElevationContourLine {
  id: string;
  elevationMeters: number;
  type: 'index' | 'intermediate' | 'dambo-depression' | 'frost-free-ridge';
  name: string;
  zone: string;
  coordinates: [number, number][]; // [lat, lng] polyline
  description: string;
}

export const MALAWI_ELEVATION_CONTOURS: ElevationContourLine[] = [
  // ==========================================
  // 1. VALLEY DAMBO DEPRESSIONS & LOWLAND CONTOURS (480m - 600m)
  // High groundwater tables (2m - 6m), seasonal waterlogging, rice/winter dimba cropping
  // ==========================================
  {
    id: 'dambo-linthipe-salima',
    elevationMeters: 520,
    type: 'dambo-depression',
    name: 'Linthipe Alluvial Basin & Lakeshore Dambo (520m)',
    zone: 'Lakeshore Alluvial Trench',
    description: 'Shallow groundwater table (2m–5m). Heavy clay vertisols with high organic water retention.',
    coordinates: [
      [-13.68, 34.30],
      [-13.72, 34.38],
      [-13.80, 34.46],
      [-13.92, 34.52],
      [-14.05, 34.45],
      [-14.15, 34.40]
    ]
  },
  {
    id: 'dambo-lilongwe-west',
    elevationMeters: 1040,
    type: 'dambo-depression',
    name: 'Lilongwe River Dambo Wetland Corridor (1,040m)',
    zone: 'Central Plateau Dambo',
    description: 'Perennial dambo valley floor. Sub-surface moisture allows year-round winter horticulture without motorized pumps.',
    coordinates: [
      [-13.90, 33.55],
      [-13.94, 33.68],
      [-13.98, 33.76],
      [-14.05, 33.85],
      [-14.12, 33.95]
    ]
  },
  {
    id: 'dambo-bua-headwaters',
    elevationMeters: 1080,
    type: 'dambo-depression',
    name: 'Bua River Wetland Sponge Dambo (1,080m)',
    zone: 'Mchinji-Kasungu Basin',
    description: 'Vital groundwater recharge sponge. Unbroken water table at 3m–6m depth.',
    coordinates: [
      [-13.60, 33.10],
      [-13.45, 33.25],
      [-13.30, 33.42],
      [-13.15, 33.58]
    ]
  },

  // ==========================================
  // 2. CENTRAL AGRICULTURAL PLATEAU CONTOURS (1,000m - 1,200m)
  // The prime Katondo red loam belt (Lilongwe, Mchinji, Kasungu, Dowa)
  // ==========================================
  {
    id: 'contour-1000m-central',
    elevationMeters: 1000,
    type: 'index',
    name: 'Central Plain 1,000m Index Contour',
    zone: 'Central Agricultural Plateau',
    description: 'Transition contour between lower drainage basins and prime grain-growing undulating plains.',
    coordinates: [
      [-13.30, 33.90],
      [-13.50, 33.85],
      [-13.75, 33.88],
      [-14.10, 34.02],
      [-14.30, 34.05],
      [-14.50, 34.12]
    ]
  },
  {
    id: 'contour-1150m-lilongwe',
    elevationMeters: 1150,
    type: 'index',
    name: 'Lilongwe-Mchinji 1,150m Plateau Ridge Contour',
    zone: 'Prime Katondo Red Loam Heartland',
    description: 'Optimal elevation for aerobic composting, groundnuts, soya, and orchard establishment.',
    coordinates: [
      [-13.70, 33.20],
      [-13.85, 33.40],
      [-13.95, 33.60],
      [-14.10, 33.75],
      [-14.25, 33.65]
    ]
  },

  // ==========================================
  // 3. FROST-FREE HIGHLAND RIDGES (1,400m - 2,200m)
  // Mountain sanctuaries: Dedza, Viphya, Nyika, Zomba, Mulanje
  // Thermal inversion belts (frost-free ridges with winter Chiperoni moisture)
  // ==========================================
  {
    id: 'ridge-dedza-1600m',
    elevationMeters: 1600,
    type: 'frost-free-ridge',
    name: 'Dedza Mountain 1,600m Frost-Free Thermal Belt',
    zone: 'Dedza Highlands Thermal Sanctuary',
    description: 'Thermal inversion belt where cold air drains into valleys, keeping apple/stone-fruit orchards frost-free.',
    coordinates: [
      [-14.22, 34.25],
      [-14.30, 34.32],
      [-14.37, 34.35],
      [-14.45, 34.30],
      [-14.40, 34.20],
      [-14.28, 34.18],
      [-14.22, 34.25]
    ]
  },
  {
    id: 'ridge-dedza-2000m',
    elevationMeters: 2000,
    type: 'frost-free-ridge',
    name: 'Dedza Peak Crest Contour (2,000m)',
    zone: 'Dedza Alpine Crest',
    description: 'High montane catchment. Feeds permanent gravity-fed streams and mountain springs.',
    coordinates: [
      [-14.34, 34.31],
      [-14.37, 34.33],
      [-14.40, 34.32],
      [-14.38, 34.28],
      [-14.34, 34.31]
    ]
  },
  {
    id: 'ridge-kirk-range-1500m',
    elevationMeters: 1500,
    type: 'frost-free-ridge',
    name: 'Kirk Range Escarpment Ridge (1,500m)',
    zone: 'Ntcheu-Dedza Border Highlands',
    description: 'Persistent cool winds, Chiperoni mists, excellent winter wheat, dairy pastures, and potato terraces.',
    coordinates: [
      [-14.60, 34.50],
      [-14.75, 34.55],
      [-14.90, 34.62],
      [-15.05, 34.68]
    ]
  },
  {
    id: 'ridge-zomba-plateau-1600m',
    elevationMeters: 1600,
    type: 'frost-free-ridge',
    name: 'Zomba Plateau Escarpment Contour (1,600m)',
    zone: 'Shire Highlands Montane Zone',
    description: 'Abundant mountain runoff, trout dams, pine/cedar forests, and perennial berry/macadamia microclimate.',
    coordinates: [
      [-15.32, 35.28],
      [-15.35, 35.33],
      [-15.40, 35.34],
      [-15.42, 35.30],
      [-15.38, 35.26],
      [-15.32, 35.28]
    ]
  },
  {
    id: 'ridge-mulanje-1800m',
    elevationMeters: 1800,
    type: 'frost-free-ridge',
    name: 'Mulanje Massif Outer Basal Contour (1,800m)',
    zone: 'Mulanje High Rainfall Massif',
    description: 'Extreme orographic rainfall (>2,200mm/yr). Feeds perennial Ruo and Lichenya river cascades.',
    coordinates: [
      [-15.90, 35.55],
      [-15.95, 35.65],
      [-16.02, 35.68],
      [-16.08, 35.60],
      [-16.02, 35.50],
      [-15.93, 35.52],
      [-15.90, 35.55]
    ]
  },
  {
    id: 'ridge-viphya-1700m',
    elevationMeters: 1700,
    type: 'frost-free-ridge',
    name: 'Viphya High Plateau Contour (1,700m)',
    zone: 'Northern Montane Plateau',
    description: 'Extensive highland plateau with rich humic soils, perennial cold mists, and timber/agroforestry belts.',
    coordinates: [
      [-11.70, 33.75],
      [-11.90, 33.82],
      [-12.10, 33.88],
      [-12.30, 33.85],
      [-12.50, 33.90]
    ]
  },
  {
    id: 'ridge-nyika-2200m',
    elevationMeters: 2200,
    type: 'frost-free-ridge',
    name: 'Nyika High Montane Crest (2,200m)',
    zone: 'Nyika High Alpine Plateau',
    description: 'Malawi highest expansive montane grassland. Primary water reservoir feeding North Rukuru River.',
    coordinates: [
      [-10.45, 33.70],
      [-10.60, 33.80],
      [-10.75, 33.85],
      [-10.85, 33.75],
      [-10.70, 33.65],
      [-10.45, 33.70]
    ]
  }
];
