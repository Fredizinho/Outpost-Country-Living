// Comprehensive Geographic Boundary, Centroid, and Microclimate Dataset for all 28 Districts of Malawi
export type MalawiRegionType = 'Northern' | 'Central' | 'Southern';

export interface MalawiDistrictSpec {
  id: string;
  name: string;
  region: MalawiRegionType;
  centroid: [number, number]; // [lat, lng]
  optimalZoom: number; // 10.5 - 11.5
  elevationRange: string;
  rainfallAnnualMm: number;
  rainfallPattern: string;
  primarySoil: string;
  soilPh: string;
  topCrops: string[];
  traditionalAuthorities: string[];
  feasibilityGrade: string;
  aquiferDepth: string;
  description: string;
  boundary: [number, number][]; // [lat, lng] polygon approximation
}

export const MALAWI_DISTRICTS: MalawiDistrictSpec[] = [
  // ==========================================
  // CENTRAL REGION (9 DISTRICTS)
  // ==========================================
  {
    id: 'dedza',
    name: 'Dedza',
    region: 'Central',
    centroid: [-14.3667, 34.3333],
    optimalZoom: 11.0,
    elevationRange: '1,200m – 2,198m ASL (Dedza Mountain)',
    rainfallAnnualMm: 1250,
    rainfallPattern: 'Unimodal + Winter Chiperoni Mists (Nov–Apr + Jun)',
    primarySoil: 'Volcanic Katondo Red Clay Loam (Rich Humic Oxisols)',
    soilPh: 'pH 6.0 – 6.5',
    topCrops: ['Irish Potatoes', 'Apples', 'Wheat', 'Beans', 'Groundnuts', 'Dairy', 'Soybeans'],
    traditionalAuthorities: ['T/A Kaphuka', 'T/A Tambala', 'T/A Chauma', 'T/A Kamenyagwaza', 'T/A Chilikumwendo'],
    feasibilityGrade: 'A+ (Prime Mountain Sanctuary)',
    aquiferDepth: '12m – 22m (Perennial mountain gravity springs)',
    description: 'Premier highland district renowned for cool temperate climate, rich volcanic red soils, perennial mountain springs, and high agricultural autonomy.',
    boundary: [
      [-14.15, 34.05],
      [-14.10, 34.25],
      [-14.18, 34.55],
      [-14.40, 34.60],
      [-14.65, 34.45],
      [-14.60, 34.15],
      [-14.35, 34.00],
      [-14.15, 34.05]
    ]
  },
  {
    id: 'lilongwe',
    name: 'Lilongwe',
    region: 'Central',
    centroid: [-13.9833, 33.7833],
    optimalZoom: 10.5,
    elevationRange: '1,050m – 1,250m ASL (Central Plains)',
    rainfallAnnualMm: 950,
    rainfallPattern: 'Unimodal Summer Wet Season (Nov–Apr)',
    primarySoil: 'Ferruginous Red & Sandy Clay Loam (Kandic Oxisols)',
    soilPh: 'pH 5.8 – 6.4',
    topCrops: ['Maize', 'Groundnuts', 'Soybeans', 'Horticulture', 'Sunflower', 'Tobacco'],
    traditionalAuthorities: ['T/A Chadza', 'T/A Kabudula', 'T/A Chitukula', 'T/A Mazengera', 'T/A Malili'],
    feasibilityGrade: 'A (Prime Commercial Agricultural Hub)',
    aquiferDepth: '18m – 35m (Basement weathered zone aquifer)',
    description: 'National administrative hub with expansive fertile undulating plains, commercial seed breeding centers, and extensive arable acreage.',
    boundary: [
      [-13.60, 33.45],
      [-13.65, 33.95],
      [-14.15, 34.15],
      [-14.35, 33.85],
      [-14.20, 33.35],
      [-13.80, 33.30],
      [-13.60, 33.45]
    ]
  },
  {
    id: 'salima',
    name: 'Salima',
    region: 'Central',
    centroid: [-13.7833, 34.4333],
    optimalZoom: 11.0,
    elevationRange: '480m – 650m ASL (Lakeshore Alluvial Basin)',
    rainfallAnnualMm: 1100,
    rainfallPattern: 'High Summer Convective Rainfall + Lake Moisture',
    primarySoil: 'Rich Alluvial River Silt & Deep Sandy Loam',
    soilPh: 'pH 6.2 – 7.0',
    topCrops: ['Rice (Faya & Kilombero)', 'Cotton', 'Mangoes', 'Cassava', 'Aquaculture', 'Sugar Cane'],
    traditionalAuthorities: ['T/A Khombeza', 'T/A Maganga', 'T/A Ndindi', 'T/A Pemba', 'T/A Kambwiri'],
    feasibilityGrade: 'A- (Lakeshore Irrigation Paradise)',
    aquiferDepth: '8m – 15m (Ultra-shallow lake basin groundwater)',
    description: 'Abundant solar irradiance, shallow high-yield aquifers, and alluvial soils along Lake Malawi ideal for solar pump irrigation and double-cropping.',
    boundary: [
      [-13.45, 34.25],
      [-13.50, 34.60],
      [-13.95, 34.65],
      [-14.05, 34.35],
      [-13.85, 34.20],
      [-13.45, 34.25]
    ]
  },
  {
    id: 'ntcheu',
    name: 'Ntcheu',
    region: 'Central',
    centroid: [-14.8167, 34.6333],
    optimalZoom: 11.0,
    elevationRange: '1,100m – 1,800m ASL (Kirk Range Escarpment)',
    rainfallAnnualMm: 1150,
    rainfallPattern: 'Summer Rains + Regular Chiperoni Mountain Fog',
    primarySoil: 'Deep Friable Red Latosols & Mountain Loams',
    soilPh: 'pH 5.9 – 6.5',
    topCrops: ['Cabbage & Brassicas', 'Irish Potatoes', 'Tomatoes', 'Onions', 'Beans', 'Maize'],
    traditionalAuthorities: ['T/A Kwataine', 'T/A Mpando', 'T/A Njolomole', 'T/A Phambala', 'T/A Ganya'],
    feasibilityGrade: 'A+ (High-Yield Vegetable Valley)',
    aquiferDepth: '14m – 25m (High-elevation spring networks)',
    description: 'Known as the horticulture kitchen of Malawi. Kirk Range slope moisture sustains year-round cool vegetable production and gravity-fed irrigation.',
    boundary: [
      [-14.55, 34.45],
      [-14.60, 34.80],
      [-15.10, 34.85],
      [-15.15, 34.55],
      [-14.85, 34.40],
      [-14.55, 34.45]
    ]
  },
  {
    id: 'kasungu',
    name: 'Kasungu',
    region: 'Central',
    centroid: [-13.0333, 33.4833],
    optimalZoom: 10.5,
    elevationRange: '1,000m – 1,350m ASL (Western Woodland Plateau)',
    rainfallAnnualMm: 850,
    rainfallPattern: 'Unimodal Summer Season (Dec–Apr)',
    primarySoil: 'Sandy Ferric Luvisols & Deep Clay Subsoils',
    soilPh: 'pH 5.6 – 6.2',
    topCrops: ['Groundnuts', 'Maize', 'Soybeans', 'Sunflowers', 'Cassava', 'Honey'],
    traditionalAuthorities: ['T/A Kaomba', 'T/A Wimbe', 'T/A Mwase', 'T/A Chulu', 'T/A Santhe', 'T/A Lukwa'],
    feasibilityGrade: 'B+ (Broad-Acre Homestead Expansion)',
    aquiferDepth: '22m – 40m (Deep Basement Aquifers)',
    description: 'Vast continuous arable parcels with gentle topography, suited for large-scale permaculture swales, agroforestry shelterbelts, and apiaries.',
    boundary: [
      [-12.60, 33.15],
      [-12.65, 33.80],
      [-13.40, 33.85],
      [-13.50, 33.20],
      [-13.00, 33.00],
      [-12.60, 33.15]
    ]
  },
  {
    id: 'nkhotakota',
    name: 'Nkhotakota',
    region: 'Central',
    centroid: [-12.9167, 34.2833],
    optimalZoom: 10.8,
    elevationRange: '480m – 1,200m ASL (Chia Lagoon to Wildlife Escarpment)',
    rainfallAnnualMm: 1550,
    rainfallPattern: 'High Lakeshore Precipitation (Nov–May)',
    primarySoil: 'Alluvial Loams & Deep Coastal Humic Sands',
    soilPh: 'pH 5.5 – 6.3',
    topCrops: ['Rice', 'Cassava', 'Cashew Nuts', 'Bananas', 'Sugarcane', 'Fish Farming'],
    traditionalAuthorities: ['T/A Malengachanzi', 'T/A Kafuzira', 'T/A Mphonde', 'T/A Kanyenda'],
    feasibilityGrade: 'A (Abundant Natural Water Systems)',
    aquiferDepth: '5m – 15m (High surface water & perennial rivers)',
    description: 'Lush lakeshore rainforest corridor with Chia Lagoon, Bua River estuary, and excellent conditions for tropical agroforestry and perennial aquaculture.',
    boundary: [
      [-12.35, 33.95],
      [-12.45, 34.35],
      [-13.35, 34.40],
      [-13.40, 34.05],
      [-12.80, 33.85],
      [-12.35, 33.95]
    ]
  },
  {
    id: 'mchinji',
    name: 'Mchinji',
    region: 'Central',
    centroid: [-13.8000, 32.8833],
    optimalZoom: 11.0,
    elevationRange: '1,150m – 1,750m ASL (Mchinji Hills Frontier)',
    rainfallAnnualMm: 1050,
    rainfallPattern: 'Reliable Summer Unimodal (Nov–Apr)',
    primarySoil: 'Rich Dark Red Volcanic Loams (High Organic Content)',
    soilPh: 'pH 6.0 – 6.6',
    topCrops: ['Groundnuts', 'Irish Potatoes', 'Soybeans', 'Maize', 'Pigeon Peas', 'Pasture Cattle'],
    traditionalAuthorities: ['T/A Mlonyeni', 'T/A Zulu', 'T/A Simphasi', 'T/A Mkanda', 'T/A Mavwere', 'T/A Dambe'],
    feasibilityGrade: 'A+ (High Soil Fertility & Border Cross-Commerce)',
    aquiferDepth: '15m – 28m (High recharge rate)',
    description: 'Western breadbasket bordering Zambia with thick volcanic topsoils, deep perennial aquifers, and outstanding legume and grain yields.',
    boundary: [
      [-13.45, 32.70],
      [-13.55, 33.15],
      [-14.15, 33.25],
      [-14.25, 32.85],
      [-13.85, 32.65],
      [-13.45, 32.70]
    ]
  },
  {
    id: 'dowa',
    name: 'Dowa',
    region: 'Central',
    centroid: [-13.6500, 33.9333],
    optimalZoom: 11.0,
    elevationRange: '1,100m – 1,450m ASL (Dowa Highland Hills)',
    rainfallAnnualMm: 1000,
    rainfallPattern: 'Unimodal Summer Season (Dec–Apr)',
    primarySoil: 'Red Clay Loams & Weathered Basement Oxisols',
    soilPh: 'pH 5.8 – 6.4',
    topCrops: ['Maize', 'Soybeans', 'Groundnuts', 'Tomatoes', 'Poultry', 'Sweet Potatoes'],
    traditionalAuthorities: ['T/A Msakambewa', 'T/A Dzoole', 'T/A Kayembe', 'T/A Chiwere'],
    feasibilityGrade: 'A- (Strategic Proximity to Lilongwe Markets)',
    aquiferDepth: '16m – 30m',
    description: 'Undulating hills with high solar gain, fast access to national capital markets, and vibrant smallholder organic grower networks.',
    boundary: [
      [-13.40, 33.70],
      [-13.45, 34.15],
      [-13.90, 34.10],
      [-13.85, 33.75],
      [-13.40, 33.70]
    ]
  },
  {
    id: 'ntchisi',
    name: 'Ntchisi',
    region: 'Central',
    centroid: [-13.3667, 33.9167],
    optimalZoom: 11.2,
    elevationRange: '1,200m – 1,700m ASL (Ntchisi Montane Forest)',
    rainfallAnnualMm: 1200,
    rainfallPattern: 'Extended Summer Wet Season + Cloud Forest Mist',
    primarySoil: 'Deep Forest Humus & Volcanic Red Clay',
    soilPh: 'pH 5.5 – 6.2',
    topCrops: ['Arabica Coffee', 'Macadamia', 'Bananas', 'Beans', 'Citrus', 'Ginger'],
    traditionalAuthorities: ['T/A Malenga', 'T/A Kalumo', 'T/A Chilooko', 'T/A Kasakula'],
    feasibilityGrade: 'A (Pristine Montane Microclimates)',
    aquiferDepth: '10m – 20m (Gravity spring streams)',
    description: 'Enchanting indigenous rainforest reserve microclimate with steep fertile valleys, cool mountain temperatures, and perennial gravity stream networks.',
    boundary: [
      [-13.15, 33.75],
      [-13.20, 34.10],
      [-13.55, 34.15],
      [-13.50, 33.75],
      [-13.15, 33.75]
    ]
  },

  // ==========================================
  // NORTHERN REGION (6 DISTRICTS)
  // ==========================================
  {
    id: 'mzimba',
    name: 'Mzimba',
    region: 'Northern',
    centroid: [-11.9000, 33.6000],
    optimalZoom: 10.5,
    elevationRange: '1,200m – 1,750m ASL (Viphya South Plateau)',
    rainfallAnnualMm: 1150,
    rainfallPattern: 'Long Season Rain (Nov–May)',
    primarySoil: 'Deep Humic Sandy Loam & Red Forest Acrisols',
    soilPh: 'pH 5.2 – 6.0',
    topCrops: ['Maize', 'Beans', 'Timber (Pine/Eucalyptus)', 'Apples', 'Pasture Livestock', 'Soybeans'],
    traditionalAuthorities: ['Inkosi ya Makhosi M\'mbelwa', 'Inkosi Mpherembe', 'Inkosi Chindi', 'Inkosi Mabulabo'],
    feasibilityGrade: 'A+ (Expansive Grazing & Forest Autonomy)',
    aquiferDepth: '15m – 30m',
    description: 'Largest district in Malawi. Vast pine timber plantations, cool mountain highlands, and huge potential for silvopasture and broad-acre homesteads.',
    boundary: [
      [-11.35, 33.15],
      [-11.45, 34.05],
      [-12.45, 33.95],
      [-12.50, 33.20],
      [-11.85, 33.05],
      [-11.35, 33.15]
    ]
  },
  {
    id: 'rumphi',
    name: 'Rumphi',
    region: 'Northern',
    centroid: [-10.8000, 33.8500],
    optimalZoom: 10.8,
    elevationRange: '1,100m – 2,600m ASL (Nyika Plateau High Alpine)',
    rainfallAnnualMm: 1400,
    rainfallPattern: 'High Alpine Precipitation & Montane Mist',
    primarySoil: 'Rich Mountain Humic Loams & Peat Inclusions',
    soilPh: 'pH 4.8 – 5.8',
    topCrops: ['Arabica Coffee', 'Apples & Pears', 'Irish Potatoes', 'Honey', 'Tobacco', 'Macadamia'],
    traditionalAuthorities: ['T/A Chikulamayembe', 'T/A Mwankhunikira', 'T/A Mwahenga', 'T/A Kachulu'],
    feasibilityGrade: 'A+ (High Alpine Permaculture Wonderland)',
    aquiferDepth: '< 15m (Abundant high-gradient cold springs)',
    description: 'Gateway to the Nyika Plateau. Dramatic valleys, cold high-altitude orchards, and crystal-clear perennial trout streams cascading down the escarpment.',
    boundary: [
      [-10.45, 33.50],
      [-10.50, 34.25],
      [-11.15, 34.20],
      [-11.20, 33.60],
      [-10.80, 33.35],
      [-10.45, 33.50]
    ]
  },
  {
    id: 'chitipa',
    name: 'Chitipa',
    region: 'Northern',
    centroid: [-9.7000, 33.2667],
    optimalZoom: 10.8,
    elevationRange: '1,300m – 2,100m ASL (Misuku Hills Coffee Sanctuary)',
    rainfallAnnualMm: 1600,
    rainfallPattern: 'High Sustained Rainfall (Oct–Jun)',
    primarySoil: 'Deep Organic Mountain Forest Nitisols',
    soilPh: 'pH 5.4 – 6.2',
    topCrops: ['Misuku Specialty Coffee', 'Bananas', 'Beans', 'Finger Millet', 'Cardamom', 'Citrus'],
    traditionalAuthorities: ['T/A Mwaulambya', 'T/A Misuku', 'T/A Kameme', 'T/A Mwabulambya'],
    feasibilityGrade: 'A+ (Microclimate Coffee & Perennial Food Forest)',
    aquiferDepth: '< 10m (Year-round mountain gravity flow)',
    description: 'Famous for the Misuku Hills—Malawi’s crown jewel for specialty high-altitude coffee, lush perennial multi-tier banana-coffee agroforestry systems.',
    boundary: [
      [-9.35, 33.05],
      [-9.40, 33.65],
      [-10.15, 33.55],
      [-10.10, 33.10],
      [-9.70, 32.85],
      [-9.35, 33.05]
    ]
  },
  {
    id: 'karonga',
    name: 'Karonga',
    region: 'Northern',
    centroid: [-9.9333, 33.9333],
    optimalZoom: 10.8,
    elevationRange: '475m – 800m ASL (Northern Rift Basin)',
    rainfallAnnualMm: 1200,
    rainfallPattern: 'Summer Rains + Lakeshore Convective Storms',
    primarySoil: 'Rich Alluvial River Floodplain Soils & Silt Loams',
    soilPh: 'pH 6.5 – 7.5',
    topCrops: ['Kilombero Aromatic Rice', 'Cassava', 'Cotton', 'Cashews', 'Bananas', 'Livestock'],
    traditionalAuthorities: ['Paramount Chief Kyungu', 'T/A Wasambo', 'T/A Mwirang\'ombe', 'T/A Kilupula'],
    feasibilityGrade: 'A- (High Irrigation Potential & Rice Basket)',
    aquiferDepth: '6m – 16m',
    description: 'Northern lakeshore trade frontier with extensive floodplains fed by the Songwe and Rukuru rivers, ideally configured for large-scale solar irrigation.',
    boundary: [
      [-9.35, 33.65],
      [-9.45, 34.15],
      [-10.45, 34.30],
      [-10.40, 33.85],
      [-9.90, 33.70],
      [-9.35, 33.65]
    ]
  },
  {
    id: 'nkhata-bay',
    name: 'Nkhata Bay',
    region: 'Northern',
    centroid: [-11.6000, 34.2833],
    optimalZoom: 11.0,
    elevationRange: '475m – 1,400m ASL (Lake Escarpment Rainforest)',
    rainfallAnnualMm: 1850,
    rainfallPattern: 'Highest Rainfall in Central/North Malawi (Oct–Jul)',
    primarySoil: 'Humic Rainforest Oxisols & Granitic Loams',
    soilPh: 'pH 5.0 – 5.8',
    topCrops: ['Rubber', 'Cassava', 'Macadamia', 'Bananas', 'Pineapples', 'Cloves & Spices', 'Vanilla'],
    traditionalAuthorities: ['T/A Mkumbira', 'T/A Malengamzoma', 'T/A Timbiri', 'T/A Mankhambira'],
    feasibilityGrade: 'A+ (Tropical Agroforestry & Permaculture Haven)',
    aquiferDepth: '< 8m (Abundant high-velocity fresh streams)',
    description: 'Subtropical rainforest paradise on Lake Malawi. Over 1,800mm annual rainfall allows year-round vegetative growth, tropical spice cultivation, and hydro power.',
    boundary: [
      [-11.30, 34.05],
      [-11.40, 34.40],
      [-12.15, 34.25],
      [-12.05, 33.95],
      [-11.60, 33.90],
      [-11.30, 34.05]
    ]
  },
  {
    id: 'likoma',
    name: 'Likoma',
    region: 'Northern',
    centroid: [-12.0667, 34.7333],
    optimalZoom: 11.5,
    elevationRange: '475m – 620m ASL (Lake Malawi Island Sanctuary)',
    rainfallAnnualMm: 1100,
    rainfallPattern: 'Lake Convective Precipitation',
    primarySoil: 'Sandy Granitic Soils & Pocket Alluvial Clays',
    soilPh: 'pH 6.0 – 6.8',
    topCrops: ['Cassava', 'Mangoes', 'Baobab Products', 'Fisheries', 'Solar Powered Horticulture'],
    traditionalAuthorities: ['T/A Mkumpha'],
    feasibilityGrade: 'B+ (Unique Island Microclimate & Solar Autonomy)',
    aquiferDepth: '4m – 12m',
    description: 'Pristine island archipelago in Lake Malawi with historic stone architecture, pure island air, high solar insolation, and immense marine ecology potential.',
    boundary: [
      [-12.00, 34.68],
      [-12.00, 34.78],
      [-12.12, 34.78],
      [-12.12, 34.68],
      [-12.00, 34.68]
    ]
  },

  // ==========================================
  // SOUTHERN REGION (13 DISTRICTS)
  // ==========================================
  {
    id: 'mulanje',
    name: 'Mulanje',
    region: 'Southern',
    centroid: [-16.0333, 35.5000],
    optimalZoom: 11.0,
    elevationRange: '650m – 3,002m ASL (Mulanje Massif / Sapitwa)',
    rainfallAnnualMm: 2400,
    rainfallPattern: 'Highest Precipitation in Malawi (Continuous Chiperoni)',
    primarySoil: 'Deep Humic Volcanic Nitisols & Bauxite Mountain Loams',
    soilPh: 'pH 4.8 – 5.6',
    topCrops: ['Tea', 'Macadamia Nuts', 'Avocados (Hass & Fuerte)', 'Pineapples', 'Ginger', 'Cedar Timber'],
    traditionalAuthorities: ['T/A Mabuka', 'T/A Mkanda', 'T/A Chikumbu', 'T/A Juma', 'T/A Laston Njema'],
    feasibilityGrade: 'A+ (Super-Abundant High-Rainfall Microclimate)',
    aquiferDepth: '< 10m (Dozens of year-round pristine mountain rivers)',
    description: 'The legendary "Island in the Sky". Unmatched rainfall (up to 2,600mm), volcanic red soils, perennial mountain rivers with huge micro-hydro and orchard potential.',
    boundary: [
      [-15.80, 35.35],
      [-15.85, 35.80],
      [-16.25, 35.75],
      [-16.30, 35.40],
      [-16.05, 35.25],
      [-15.80, 35.35]
    ]
  },
  {
    id: 'zomba',
    name: 'Zomba',
    region: 'Southern',
    centroid: [-15.3833, 35.3333],
    optimalZoom: 11.0,
    elevationRange: '800m – 2,087m ASL (Zomba Plateau Alpine)',
    rainfallAnnualMm: 1450,
    rainfallPattern: 'High Summer Rains + Plateau Mist System',
    primarySoil: 'Deep Red Clay Loams & Forest Humus Inclusions',
    soilPh: 'pH 5.2 – 6.2',
    topCrops: ['Vegetables', 'Berries (Strawberries)', 'Macadamia', 'Maize', 'Dairy Cattle', 'Apples'],
    traditionalAuthorities: ['T/A Malemia', 'T/A Chikowi', 'T/A Mwambo', 'T/A Mlumbe', 'T/A Kuntumanji'],
    feasibilityGrade: 'A+ (Historic Botanical Capital & Mountain Water)',
    aquiferDepth: '10m – 20m (Mulunguzi River catchment)',
    description: 'Former capital with a spectacular 2,000m plateau. Year-round mountain streams, high biodiversity, vibrant university agronomy researchers, and temperate berry farming.',
    boundary: [
      [-15.15, 35.15],
      [-15.20, 35.60],
      [-15.65, 35.55],
      [-15.60, 35.10],
      [-15.15, 35.15]
    ]
  },
  {
    id: 'blantyre',
    name: 'Blantyre',
    region: 'Southern',
    centroid: [-15.7833, 35.0000],
    optimalZoom: 11.0,
    elevationRange: '850m – 1,600m ASL (Michiru & Soche Peaks)',
    rainfallAnnualMm: 1100,
    rainfallPattern: 'Summer Rain + Winter Chiperoni Humidity',
    primarySoil: 'Shallow to Moderately Deep Ferruginous Red Clay Loams',
    soilPh: 'pH 5.5 – 6.2',
    topCrops: ['Horticulture', 'Poultry', 'Maize', 'Citrus', 'Pigeon Peas', 'Agro-processing'],
    traditionalAuthorities: ['T/A Kapeni', 'T/A Machinjiri', 'T/A Somba', 'T/A Kunthembwe', 'T/A Lundu'],
    feasibilityGrade: 'A- (Highest Commercial Consumer Market)',
    aquiferDepth: '18m – 35m',
    description: 'Commercial and industrial capital of Malawi nestled among rocky massifs, offering premium proximity to high-value organic produce buyers and processing plants.',
    boundary: [
      [-15.60, 34.85],
      [-15.65, 35.20],
      [-16.05, 35.15],
      [-16.00, 34.80],
      [-15.60, 34.85]
    ]
  },
  {
    id: 'thyolo',
    name: 'Thyolo',
    region: 'Southern',
    centroid: [-16.0667, 35.1333],
    optimalZoom: 11.2,
    elevationRange: '800m – 1,450m ASL (Thyolo Mountain Escarpment)',
    rainfallAnnualMm: 1500,
    rainfallPattern: 'Rich Sustained Rainfall with Heavy Chiperoni',
    primarySoil: 'Deep Red Latosols (Deepest Topsoils in Southern Africa)',
    soilPh: 'pH 4.9 – 5.8',
    topCrops: ['Macadamia Nuts', 'Tea', 'Bananas & Plantains', 'Avocados', 'Pineapples', 'Coffee'],
    traditionalAuthorities: ['T/A Nchilamwendo', 'T/A Bvumbwe', 'T/A Changata', 'T/A Thomas', 'T/A Kapichi'],
    feasibilityGrade: 'A+ (The Fruit & Agroforestry Heart of the South)',
    aquiferDepth: '12m – 22m',
    description: 'Rolling emerald hills with deep, nutrient-dense red soils. Renowned as the banana and macadamia epicentre of Malawi with Bvumbwe Agricultural Research Station.',
    boundary: [
      [-15.90, 35.00],
      [-15.95, 35.35],
      [-16.35, 35.30],
      [-16.30, 34.95],
      [-15.90, 35.00]
    ]
  },
  {
    id: 'mangochi',
    name: 'Mangochi',
    region: 'Southern',
    centroid: [-14.4833, 35.2667],
    optimalZoom: 10.5,
    elevationRange: '475m – 1,100m ASL (Lake Malawi South Basin & Shire Outlet)',
    rainfallAnnualMm: 900,
    rainfallPattern: 'Warm Lakeshore Climate with River Moisture',
    primarySoil: 'Alluvial River Plains & Deep Sandy Clay Loam',
    soilPh: 'pH 6.2 – 7.2',
    topCrops: ['Rice', 'Cassava', 'Mangoes', 'Watermelons', 'Cotton', 'Tilapia Aquaculture'],
    traditionalAuthorities: ['T/A Mponda', 'T/A Makanjira', 'T/A Bwananyambi', 'T/A Jalasi', 'T/A Chimwala', 'T/A Katuli'],
    feasibilityGrade: 'A- (Massive Water Frontage & Year-Round Sun)',
    aquiferDepth: '5m – 15m (Shire River & Lake aquifer)',
    description: 'Spanning the south shore of Lake Malawi, Lake Malombe, and the upper Shire River. Outstanding solar energy yield and infinite freshwater irrigation capacity.',
    boundary: [
      [-13.95, 34.80],
      [-14.05, 35.65],
      [-14.95, 35.60],
      [-14.90, 34.95],
      [-14.30, 34.85],
      [-13.95, 34.80]
    ]
  },
  {
    id: 'chiradzulu',
    name: 'Chiradzulu',
    region: 'Southern',
    centroid: [-15.7000, 35.1833],
    optimalZoom: 11.2,
    elevationRange: '900m – 1,773m ASL (Chiradzulu Mountain Peak)',
    rainfallAnnualMm: 1150,
    rainfallPattern: 'Subtropical Summer Wet Season',
    primarySoil: 'Humic Red Loams & Mountain Colluvium',
    soilPh: 'pH 5.4 – 6.2',
    topCrops: ['Pigeon Peas', 'Maize', 'Tomatoes', 'Cassava', 'Chillies', 'Dairy Goats'],
    traditionalAuthorities: ['T/A Likoswe', 'T/A Kadewere', 'T/A Mpama', 'T/A Chitera'],
    feasibilityGrade: 'A- (High Fertility Valley Soils)',
    aquiferDepth: '14m – 25m',
    description: 'Iconic mountain peak dominating lush fertile valleys with high soil organic matter and exceptional pigeon pea and legume productivity.',
    boundary: [
      [-15.55, 35.05],
      [-15.60, 35.35],
      [-15.90, 35.30],
      [-15.85, 35.05],
      [-15.55, 35.05]
    ]
  },
  {
    id: 'phalombe',
    name: 'Phalombe',
    region: 'Southern',
    centroid: [-15.8000, 35.6500],
    optimalZoom: 11.0,
    elevationRange: '600m – 1,100m ASL (Phalombe Plain under Mulanje)',
    rainfallAnnualMm: 1300,
    rainfallPattern: 'Mulanje Massif Rain Shadow & Chiperoni Rains',
    primarySoil: 'Volcanic Wash Silt & Fertile Dark Clay (Makande)',
    soilPh: 'pH 5.8 – 6.8',
    topCrops: ['Rice (Lake Chilwa basin)', 'Pigeon Peas', 'Maize', 'Cassava', 'Bananas', 'Pineapples'],
    traditionalAuthorities: ['T/A Kaduya', 'T/A Jenala', 'T/A Chiwalo', 'T/A Nazombe'],
    feasibilityGrade: 'A (High Soil Nutrition from Mountain Alluvium)',
    aquiferDepth: '8m – 18m',
    description: 'Nestled on the northern flanks of Mulanje Massif leading towards Lake Chilwa. High soil fertility from mountain silt runoff and rapid seasonal crop turnaround.',
    boundary: [
      [-15.60, 35.50],
      [-15.65, 35.85],
      [-16.05, 35.80],
      [-16.00, 35.45],
      [-15.60, 35.50]
    ]
  },
  {
    id: 'machinga',
    name: 'Machinga',
    region: 'Southern',
    centroid: [-14.9667, 35.3000],
    optimalZoom: 10.8,
    elevationRange: '600m – 1,200m ASL (Liwonde Escarpment to Lake Chilwa)',
    rainfallAnnualMm: 950,
    rainfallPattern: 'Summer Precipitation + Shire Valley Warmth',
    primarySoil: 'Sandy Clay Loams & Lake Basin Alluvium',
    soilPh: 'pH 6.0 – 6.8',
    topCrops: ['Maize', 'Rice', 'Cassava', 'Pigeon Peas', 'Cotton', 'Sesame'],
    traditionalAuthorities: ['Paramount Chief Kawinga', 'T/A Liwonde', 'T/A Nyambi', 'T/A Chamba', 'T/A Mlomba'],
    feasibilityGrade: 'B+ (Strategic Shire River Water Highway)',
    aquiferDepth: '15m – 30m',
    description: 'Encompasses the Liwonde National Park corridor and upper Shire River plain. Ideal for solar water pumping, sesame, and resilient dryland food forestry.',
    boundary: [
      [-14.65, 35.05],
      [-14.70, 35.70],
      [-15.25, 35.65],
      [-15.20, 35.00],
      [-14.65, 35.05]
    ]
  },
  {
    id: 'balaka',
    name: 'Balaka',
    region: 'Southern',
    centroid: [-14.9833, 34.9500],
    optimalZoom: 11.0,
    elevationRange: '550m – 900m ASL (Upper Shire Valley Basin)',
    rainfallAnnualMm: 800,
    rainfallPattern: 'Unimodal Summer Season (Dec–Mar)',
    primarySoil: 'Permeable Sandy Loams & Pockets of Deep Clay',
    soilPh: 'pH 6.0 – 6.8',
    topCrops: ['Cotton', 'Cassava', 'Sorghum & Millets', 'Pigeon Peas', 'Cowpeas', 'Drought-Tolerant Maize'],
    traditionalAuthorities: ['T/A Nsamala', 'T/A Msamala', 'T/A Kalembo', 'T/A Chanthunya'],
    feasibilityGrade: 'B (High Solar Potential & Strategic Rail Crossway)',
    aquiferDepth: '20m – 38m',
    description: 'Major transportation crossroads of Malawi. Warm climate with abundant solar irradiation, ideal for deep-rooted agroforestry, moringa, and drought-hardy legumes.',
    boundary: [
      [-14.80, 34.80],
      [-14.85, 35.15],
      [-15.20, 35.10],
      [-15.15, 34.75],
      [-14.80, 34.80]
    ]
  },
  {
    id: 'mwanza',
    name: 'Mwanza',
    region: 'Southern',
    centroid: [-15.6000, 34.5167],
    optimalZoom: 11.0,
    elevationRange: '600m – 1,200m ASL (Mwanza River Basin & Mozambique Border)',
    rainfallAnnualMm: 950,
    rainfallPattern: 'Summer Rains + River Warmth',
    primarySoil: 'Rich Alluvial River Bank Loams & Colluvial Slopes',
    soilPh: 'pH 6.0 – 6.7',
    topCrops: ['Tangerines & Citrus (Malawi Citrus Capital)', 'Pigeon Peas', 'Maize', 'Soybeans', 'Honey'],
    traditionalAuthorities: ['T/A Kanduku', 'T/A Nthache'],
    feasibilityGrade: 'A- (Citrus & Fruit Tree Haven)',
    aquiferDepth: '12m – 25m (Mwanza River basin aquifer)',
    description: 'Acclaimed across Southern Africa as the "Tangerine Capital". Warm sheltered valleys produce the sweetest citrus, mangoes, and high-value border fruits.',
    boundary: [
      [-15.40, 34.35],
      [-15.45, 34.65],
      [-15.80, 34.65],
      [-15.75, 34.30],
      [-15.40, 34.35]
    ]
  },
  {
    id: 'neno',
    name: 'Neno',
    region: 'Southern',
    centroid: [-15.4000, 34.6833],
    optimalZoom: 11.0,
    elevationRange: '800m – 1,600m ASL (Neno Highland Ridge)',
    rainfallAnnualMm: 1100,
    rainfallPattern: 'High Elevation Summer Rains + Cool Mists',
    primarySoil: 'Deep Forest Loams & Granitic Red Oxisols',
    soilPh: 'pH 5.5 – 6.3',
    topCrops: ['Irish Potatoes', 'Tangerines & Oranges', 'Beans', 'Maize', 'Vegetables', 'Apples'],
    traditionalAuthorities: ['T/A Dambe', 'T/A Mlauli', 'T/A Chekucheku', 'T/A Symon'],
    feasibilityGrade: 'A (Secluded Mountain Sanctuary)',
    aquiferDepth: '10m – 20m (Perennial highland stream sources)',
    description: 'Tranquil highland retreat with crisp alpine air, scenic ridges, permanent spring streams, and thriving citrus and apple orchards away from urban congestion.',
    boundary: [
      [-15.20, 34.50],
      [-15.25, 34.85],
      [-15.65, 34.80],
      [-15.60, 34.45],
      [-15.20, 34.50]
    ]
  },
  {
    id: 'chikwawa',
    name: 'Chikwawa',
    region: 'Southern',
    centroid: [-16.0333, 34.8000],
    optimalZoom: 10.5,
    elevationRange: '50m – 400m ASL (Lower Shire Valley Floodplain)',
    rainfallAnnualMm: 750,
    rainfallPattern: 'Hot Tropical Semi-Arid with Massive Shire River Volume',
    primarySoil: 'Deep Black Cracking Clays (Vertisols/Makande) & Alluvium',
    soilPh: 'pH 6.8 – 8.0',
    topCrops: ['Sugarcane (Illovo Estate)', 'Cotton', 'Sorghum', 'Sesame', 'Goats & Cattle', 'Bananas (Irrigated)'],
    traditionalAuthorities: ['Paramount Chief Lundu', 'T/A Ngabu', 'T/A Chapananga', 'T/A Kasisi', 'T/A Katunga'],
    feasibilityGrade: 'B+ (Massive Commercial Gravity Irrigation Axis)',
    aquiferDepth: '10m – 25m (Shire Valley Mega-Aquifer)',
    description: 'Home to the monumental Shire Valley Transformation Program (SVTP). High-volume canal gravity irrigation transforming drylands into lush year-round cropland.',
    boundary: [
      [-15.75, 34.45],
      [-15.80, 34.95],
      [-16.35, 34.90],
      [-16.40, 34.40],
      [-15.75, 34.45]
    ]
  },
  {
    id: 'nsanje',
    name: 'Nsanje',
    region: 'Southern',
    centroid: [-16.9167, 35.2500],
    optimalZoom: 10.8,
    elevationRange: '40m – 300m ASL (Southernmost Tip & Elephant Marsh)',
    rainfallAnnualMm: 700,
    rainfallPattern: 'Tropical Lowland with Elephant Marsh Wetlands',
    primarySoil: 'Rich Heavy Alluvial Silts & Organic Wetland Peats',
    soilPh: 'pH 6.5 – 7.8',
    topCrops: ['Rice', 'Cotton', 'Watermelons', 'Sorghum', 'Sweet Potatoes', 'Livestock', 'Fish'],
    traditionalAuthorities: ['T/A Malemia', 'T/A Tengani', 'T/A Ndamera', 'T/A Chimombo', 'T/A Nyachikadza'],
    feasibilityGrade: 'B (Year-Round Wetland Moisture & Solar Power)',
    aquiferDepth: '5m – 15m (Ultra-shallow wetlands water table)',
    description: 'Malawi’s southern maritime and river gateway. Elephant Marsh wetlands preserve year-round moisture for winter residual cropping, cattle herds, and aquaculture.',
    boundary: [
      [-16.50, 35.05],
      [-16.55, 35.40],
      [-17.15, 35.35],
      [-17.10, 35.05],
      [-16.50, 35.05]
    ]
  }
];

// Helper lookup map for instant O(1) district resolution by ID or name
export const MALAWI_DISTRICTS_MAP = new Map<string, MalawiDistrictSpec>();
MALAWI_DISTRICTS.forEach(d => {
  MALAWI_DISTRICTS_MAP.set(d.id.toLowerCase(), d);
  MALAWI_DISTRICTS_MAP.set(d.name.toLowerCase(), d);
});

export function getDistrictByIdOrName(query: string): MalawiDistrictSpec | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  if (MALAWI_DISTRICTS_MAP.has(q)) return MALAWI_DISTRICTS_MAP.get(q);
  
  // Fuzzy match
  return MALAWI_DISTRICTS.find(d => 
    d.name.toLowerCase().includes(q) || 
    q.includes(d.name.toLowerCase()) ||
    d.id.toLowerCase().includes(q)
  );
}
