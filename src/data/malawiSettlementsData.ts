// Thematic Settlement & Community Hub Nodes across Malawi
// Specifically configured for Outpost Scouting & Community Settlement Map Layer
// Covers Rural Community Settlements, Outpost Centers, Mission Homestead Clusters, and Strategic Trading Bomas

export interface CommunitySettlementNode {
  id: string;
  name: string;
  category: 'Adventist Outpost & Mission Hub' | 'Agricultural Community Settlement' | 'Rural Agro-Trading Boma' | 'Highland Homestead Cluster';
  district: string;
  region: 'Northern' | 'Central' | 'Southern';
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  populationEstimate: string;
  communityAmenities: string[];
  settlementDescription: string;
  iconType: 'outpost' | 'village' | 'market' | 'mission';
}

export const MALAWI_COMMUNITY_SETTLEMENTS: CommunitySettlementNode[] = [
  // ==========================================
  // CENTRAL REGION SETTLEMENTS & OUTPOSTS
  // ==========================================
  {
    id: 'settlement-malamulo-central',
    name: 'Malamulo Adventist Mission Hub (Makwasa)',
    category: 'Adventist Outpost & Mission Hub',
    district: 'Thyolo',
    region: 'Southern',
    coordinates: [-16.0350, 35.1850],
    elevationMeters: 1040,
    populationEstimate: 'Historic Adventist Outpost Center & Health Training School',
    communityAmenities: ['Hospital & College', 'Organic Orchard', 'Gravity Spring Water', 'SDA Church'],
    settlementDescription: 'Pioneering SDA missionary campus founded in 1902; exemplary blueprint for rural health, vocational farming, and family sanctuaries.',
    iconType: 'mission'
  },
  {
    id: 'settlement-dedza-kaphuka',
    name: 'Kaphuka Highland Settlement',
    category: 'Highland Homestead Cluster',
    district: 'Dedza',
    region: 'Central',
    coordinates: [-14.3400, 34.2800],
    elevationMeters: 1650,
    populationEstimate: 'Approx. 3,200 rural families',
    communityAmenities: ['Gravity Spring Piping', 'Potato & Wheat Cooperatives', 'Highland Primary School'],
    settlementDescription: 'Cool temperate plateau community renowned for terraced organic potato hills, mountain stream irrigation, and peaceful village life.',
    iconType: 'outpost'
  },
  {
    id: 'settlement-mayani',
    name: 'Mayani Rural Settlement',
    category: 'Agricultural Community Settlement',
    district: 'Dedza',
    region: 'Central',
    coordinates: [-14.1800, 34.3300],
    elevationMeters: 1320,
    populationEstimate: 'Approx. 4,500 homesteaders',
    communityAmenities: ['Weekly Organic Crop Market', 'Borehole Wells', 'Rural Health Post'],
    settlementDescription: 'Thriving agricultural settlement with fertile red loam soils producing groundnuts, soya, and dry-season dambo gardens.',
    iconType: 'village'
  },
  {
    id: 'settlement-linthipe',
    name: 'Linthipe Valley Settlement',
    category: 'Rural Agro-Trading Boma',
    district: 'Dedza',
    region: 'Central',
    coordinates: [-14.1833, 34.1333],
    elevationMeters: 1220,
    populationEstimate: 'Approx. 6,800 residents',
    communityAmenities: ['M1 Highway Access', 'Grain Storage Depot', 'Linthipe River Basin Access'],
    settlementDescription: 'Strategic trading and farming hub along the Linthipe River corridor connecting farmers directly to capital grain markets.',
    iconType: 'market'
  },
  {
    id: 'settlement-mchinji-ludzi',
    name: 'Ludzi Mission Community',
    category: 'Agricultural Community Settlement',
    district: 'Mchinji',
    region: 'Central',
    coordinates: [-13.7200, 32.9800],
    elevationMeters: 1190,
    populationEstimate: 'Approx. 2,900 community members',
    communityAmenities: ['Agricultural Training Farm', 'Protected Springs', 'Vocational Workshop'],
    settlementDescription: 'Quiet country farming settlement near Zambian border with gentle rolling plains, abundant well water, and active youth clubs.',
    iconType: 'village'
  },
  {
    id: 'settlement-nkhoma',
    name: 'Nkhoma Mountain Community',
    category: 'Highland Homestead Cluster',
    district: 'Lilongwe',
    region: 'Central',
    coordinates: [-14.0700, 34.0900],
    elevationMeters: 1310,
    populationEstimate: 'Approx. 5,200 rural dwellers',
    communityAmenities: ['Mission Hospital', 'Mountain Stream Supply', 'Organic Vegetable Terrace'],
    settlementDescription: 'Picturesque village nestled under Nkhoma Mountain with rich history of community health and orchard nursery work.',
    iconType: 'mission'
  },

  // ==========================================
  // NORTHERN REGION SETTLEMENTS & OUTPOSTS
  // ==========================================
  {
    id: 'settlement-lunjika-sda',
    name: 'Lunjika Adventist Mission Station',
    category: 'Adventist Outpost & Mission Hub',
    district: 'Mzimba',
    region: 'Northern',
    coordinates: [-11.7500, 33.4500],
    elevationMeters: 1340,
    populationEstimate: 'SDA Secondary Campus & Surrounding Farming Villages',
    communityAmenities: ['SDA Secondary School', 'Clinic', 'Community Woodlot', 'Boreholes'],
    settlementDescription: 'Historic northern Adventist beacon station surrounded by vast open arable country, pine forests, and quiet prayer chapels.',
    iconType: 'mission'
  },
  {
    id: 'settlement-luwawa-viphya',
    name: 'Luwawa Forest Settlement',
    category: 'Highland Homestead Cluster',
    district: 'Mzimba',
    region: 'Northern',
    coordinates: [-12.1167, 33.7167],
    elevationMeters: 1680,
    populationEstimate: 'Forestry & Eco-Homestead Community (~1,800)',
    communityAmenities: ['Pure Mountain Streams', 'Luwawa Dam Reservoir', 'Forester Training'],
    settlementDescription: 'Crisp highland pine and indigenous forest community with 100% pure mountain catchment runoff and frost-free orchard microclimates.',
    iconType: 'outpost'
  },
  {
    id: 'settlement-livingstonia',
    name: 'Livingstonia Plateau Community',
    category: 'Highland Homestead Cluster',
    district: 'Rumphi',
    region: 'Northern',
    coordinates: [-10.6000, 34.1167],
    elevationMeters: 1380,
    populationEstimate: 'Approx. 3,500 plateau residents',
    communityAmenities: ['Historic Stone Architecture', 'Gravity Water Catchment', 'Technical College'],
    settlementDescription: 'High plateau settlement perched high above Lake Malawi; world-renowned model of self-contained hill station engineering.',
    iconType: 'mission'
  },
  {
    id: 'settlement-enukweni',
    name: 'Enukweni Agro Settlement',
    category: 'Agricultural Community Settlement',
    district: 'Mzimba',
    region: 'Northern',
    coordinates: [-11.2333, 33.8500],
    elevationMeters: 1200,
    populationEstimate: 'Approx. 4,100 homesteaders',
    communityAmenities: ['Rural Produce Market', 'Cattle Dipping Tank', 'Boreholes'],
    settlementDescription: 'Expansive grassland farming community with prime livestock pasture and maize/sunflower rotation fields.',
    iconType: 'village'
  },

  // ==========================================
  // SOUTHERN REGION SETTLEMENTS & OUTPOSTS
  // ==========================================
  {
    id: 'settlement-zomba-songani',
    name: 'Songani Valley Agricultural Settlement',
    category: 'Agricultural Community Settlement',
    district: 'Zomba',
    region: 'Southern',
    coordinates: [-15.2800, 35.3800],
    elevationMeters: 880,
    populationEstimate: 'Approx. 5,400 farmers',
    communityAmenities: ['Perennial Domasi River Canal', 'Vegetable Association', 'Mini Hydro Point'],
    settlementDescription: 'Verdant mountain-fed valley with year-round gravity irrigation furrow channels producing tomatoes, leafy greens, and green maize.',
    iconType: 'village'
  },
  {
    id: 'settlement-bembeke',
    name: 'Bembeke Country Settlement',
    category: 'Highland Homestead Cluster',
    district: 'Dedza',
    region: 'Central',
    coordinates: [-14.3600, 34.4200],
    elevationMeters: 1540,
    populationEstimate: 'Approx. 3,800 residents',
    communityAmenities: ['Community Forest Reserve', 'Pottery & Brickworks', 'Natural Springs'],
    settlementDescription: 'Peaceful rolling red-clay highland community close to mountain ridges with cool night breezes and rich vegetable loams.',
    iconType: 'outpost'
  },
  {
    id: 'settlement-thuchila',
    name: 'Thuchila Plain Community',
    category: 'Agricultural Community Settlement',
    district: 'Mulanje',
    region: 'Southern',
    coordinates: [-15.9500, 35.3800],
    elevationMeters: 710,
    populationEstimate: 'Approx. 6,100 residents',
    communityAmenities: ['Thuchila Agricultural Research Station', 'Flood-Safe Terraces', 'River Tributary'],
    settlementDescription: 'Arable loam plain lying between Mulanje Mountain and Thyolo hills, famous for macadamia, tea, and high cassava production.',
    iconType: 'village'
  },
  {
    id: 'settlement-namwera',
    name: 'Namwera Plateau Settlement',
    category: 'Rural Agro-Trading Boma',
    district: 'Mangochi',
    region: 'Southern',
    coordinates: [-14.3800, 35.5300],
    elevationMeters: 920,
    populationEstimate: 'Approx. 7,200 residents',
    communityAmenities: ['Highland Market Center', 'Springfed Catchments', 'Road Junction to Mozambique'],
    settlementDescription: 'Elevated fertile plateau in eastern Mangochi with reliable rainfall, cool microclimate, and abundant banana and pigeon pea groves.',
    iconType: 'market'
  }
];
