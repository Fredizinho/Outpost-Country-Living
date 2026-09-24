import { COUNTRY_IMAGES } from '@/assets/images';

export interface Quote {
  id: string;
  title?: string;
  theme?: string;
  image?: string;
  imageAlt?: string;
  historicalContext?: string;
  text: string;
  source: string;
  category: 'Mental Health' | 'Children' | 'Physical Labor' | 'Spiritual Growth' | 'Preparation' | 'Vision';
}

export interface Guide {
  id: string;
  title: string;
  category: 'Where' | 'What' | 'How';
  content: string;
  icon: string;
}

export interface Devotional {
  id: string;
  text: string;
  source: string;
  theme: string;
}

export interface LandChecklistItem {
  id: string;
  category: 'Water' | 'Soil' | 'Legal' | 'Energy' | 'Location';
  label: string;
  description: string;
}

export const DEVOTIONAL_QUOTES: Devotional[] = [
  {
    id: 'd1',
    text: "There is no education to be gained by the study of the dead languages and of the sciences, that can compare with the education that is to be obtained from the book of nature.",
    source: "Fundamentals of Christian Education, p. 512",
    theme: "Nature's School"
  },
  {
    id: 'd2',
    text: "God would have His people move out from the cities and get ready for the coming of Christ. There is no place for them there.",
    source: "Country Living, p. 7",
    theme: "The Coming Crisis"
  },
  {
    id: 'd3',
    text: "The cultivation of the soil is the A, B, and C of the education which we should give in our schools.",
    source: "Counsels on Education, p. 165",
    theme: "Soil Education"
  },
  {
    id: 'd4',
    text: "In the natural world, God has placed in the hands of the children of men the key to unlock the treasure house of His word.",
    source: "Christian Education, p. 66",
    theme: "Keys to Truth"
  }
];

export const LAND_CHECKLIST_DATA: LandChecklistItem[] = [
  { id: 'w1', category: 'Water', label: 'Year-round Water Source', description: 'Search for active springs, creeks, or high-yield wells.' },
  { id: 's1', category: 'Soil', label: 'Topsoil Depth & Quality', description: 'Test for organic matter and avoid heavy compaction or chemical history.' },
  { id: 'l1', category: 'Legal', label: 'Zoning & Restrictions', description: 'Verify agricultural zoning and permit requirements for off-grid structures.' },
  { id: 'e1', category: 'Energy', label: 'Solar/Wind Potential', description: 'Assess south-facing slopes and natural wind corridors for power.' },
  { id: 'loc1', category: 'Location', label: 'Proximity to Mission', description: 'Ensure the land is an "outpost"—remote but accessible to those in need.' }
];

export interface OutpostZone {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  suitability: string;
  crops: string[];
  climate: string;
}

export const MALAWI_OUTPOST_ZONES: OutpostZone[] = [
  {
    id: 'z1',
    name: 'Viphya Plateau',
    region: 'Northern',
    suitability: 'High - Abundant water and pine forests.',
    crops: ['Potatoes', 'Macadamia', 'Coffee'],
    climate: 'Cool, high rainfall'
  },
  {
    id: 'z4',
    name: 'Misuku Hills',
    region: 'Northern',
    suitability: 'Moderate - Excellent soil but remote access.',
    crops: ['Coffee', 'Bananas', 'Citrus'],
    climate: 'Tropical Highland'
  },
  {
    id: 'z2',
    name: 'Dedza Highlands',
    region: 'Central',
    suitability: 'Very High - Volcanic soil, temperate climate.',
    crops: ['Peaches', 'Vegetables', 'Maize'],
    climate: 'Temperate, misty'
  },
  {
    id: 'z5',
    name: 'Kasungu Plain',
    region: 'Central',
    suitability: 'Moderate - Flat land, requires good boreholes.',
    crops: ['Sunflower', 'Groundnuts', 'Maize'],
    climate: 'Savanna'
  },
  {
    id: 'z3',
    name: 'Mulanje Massif',
    region: 'Southern',
    suitability: 'High - Unique microclimates, biodiversity.',
    crops: ['Tea', 'Avocados', 'Spices'],
    climate: 'High humidity, high rainfall'
  },
  {
    id: 'z6',
    name: 'Lower Shire Valley',
    region: 'Southern',
    suitability: 'Low - Extreme heat, but good for specific crops.',
    crops: ['Cotton', 'Sugar Cane', 'Sorghum'],
    climate: 'Semi-arid, hot'
  }
];

export const EGW_QUOTES: Quote[] = [
  {
    id: 'prep-1',
    title: "The Signal of the Roman Armies & Mountain Flight",
    theme: "The Jerusalem Parallel & Mountain Sanctuary",
    image: COUNTRY_IMAGES.jerusalemSiege,
    imageAlt: "Historical dramatic portrayal of Roman legions surrounding Jerusalem with fortified ancient stone walls",
    historicalContext: "In AD 66, Cestius Gallus unexpectedly withdrew Roman troops, giving obedient Christians their cue to flee to Pella without hesitation before Titus' final siege in AD 70.",
    text: "As the siege of Jerusalem by the Roman armies was a signal for flight to the Judean Christians, so the assumption of power on the part of our nation in the decree enforcing the papal sabbath will be a warning to us. It will then be time to leave the large cities, preparatory to leaving the smaller ones for retired homes in lonely places among the mountains.",
    source: "Country Living, p. 32",
    category: 'Preparation'
  },
  {
    id: '1',
    title: "Take Children into the Country & Cultivate the Soil",
    theme: "Family Relocation & Productive Ground",
    image: COUNTRY_IMAGES.mountainFlight,
    imageAlt: "Christian pioneer family at an off-grid country homestead in a misty mountain valley with cultivated soil",
    historicalContext: "Counsel given to families struggling in dense industrial urban centers, showing that small dwellings with ground to till yield true physical and spiritual security.",
    text: "The time has come when, as God opens the way, families should move out of the cities. The children should be taken into the country. The parents should get as suitable a place as their means will allow. Though the dwelling may be small, yet there should be land in connection with it, that may be cultivated.",
    source: "Country Living, p. 24",
    category: 'Vision'
  },
  {
    id: 'prep-2',
    title: "Provisions & The Future Crisis of Buying and Selling",
    theme: "Independent Homestead Food Sovereignty",
    image: COUNTRY_IMAGES.buyingSelling,
    imageAlt: "Homestead harvest with baskets of grains, vegetables, and fruit grown independently on country soil",
    historicalContext: "Revelation 13 foretells economic embargoes on God's commandment-keeping remnant; raising independent provisions safeguards faith and autonomy.",
    text: "Again and again the Lord has instructed that our people are to take their families away from the cities, into the country, where they can raise their own provisions; for in the future the problem of buying and selling will be a very serious one.",
    source: "Country Living, p. 9",
    category: 'Preparation'
  },
  {
    id: 'prep-3',
    title: "Judgments Impending on Large Cities",
    theme: "The Fragility of Urban Towers",
    image: COUNTRY_IMAGES.cityCrisis,
    imageAlt: "Metropolis with skyscrapers under ominous storm clouds and sirens depicting impending urban crisis",
    historicalContext: "God's judgments in fire, earthquake, and economic collapse will strike the proudest metropolitan centers, demonstrating human engineering cannot withstand His reckoning.",
    text: "The time is near when the large cities will be visited by the judgments of God. In a little while these cities will be terribly shaken. No matter how large or how strong their buildings, no matter how many fire-proof precautions are taken, one touch of God will destroy them in a few minutes or hours.",
    source: "Testimonies for the Church, Vol. 7, p. 83",
    category: 'Preparation'
  },
  {
    id: 'prep-4',
    title: "A Little Piece of Land Where Flowers Grow",
    theme: "Simplicity, Purity, and Children's Growth",
    image: COUNTRY_IMAGES.childrenGarden,
    imageAlt: "Children in cottage garden planting flowers and vegetables happily under morning sunshine",
    historicalContext: "Urban exposure hardens the tender sensibilities of children; soil and blooming flora cultivate reverence, gentle curiosity, and filial love.",
    text: "Get out of the cities as soon as possible, and purchase a little piece of land where you can have a garden, where your children can watch the flowers grow and learn from them lessons of simplicity and purity.",
    source: "Country Living, p. 18",
    category: 'Preparation'
  },
  {
    id: '3',
    title: "Guarding Children from Urban Contamination",
    theme: "Preserving Youth from Moral Corruption",
    image: COUNTRY_IMAGES.cityNoiseContrast,
    imageAlt: "Contrast between noisy crowded city streets and serene green mountain countryside",
    historicalContext: "Metropolises present unending spectacles, theater, liquor, and immoral amusements that erode the conscience of youth.",
    text: "Cities are filled with temptations. We should plan our work in such a way as to keep our young people as far as possible from this contamination.",
    source: "Country Living, p. 6",
    category: 'Children'
  },
  {
    id: '2',
    title: "Cultivation of the Soil as God's Schoolroom",
    theme: "Open-Air Physical Dignity",
    image: COUNTRY_IMAGES.openAirLabor,
    imageAlt: "Homesteader hoeing deep loamy soil in an open field under clear morning light",
    historicalContext: "Manual labor in harmony with nature restores muscle tone, deepens respiration, and gives practical object lessons in God's creative laws.",
    text: "Work in the open air is beneficial to both mind and body. The cultivation of the soil is a schoolroom where we can learn lessons from the book of nature.",
    source: "The Ministry of Healing, p. 265",
    category: 'Physical Labor'
  },
  {
    id: '4',
    title: "Nature's Symbols Unlock the Word of God",
    theme: "The Divine Character in Creation",
    image: COUNTRY_IMAGES.natureSymbols,
    imageAlt: "Open Bible on a rustic wooden table surrounded by wildflowers and mountain pine forest in golden sunlight",
    historicalContext: "Every seed, vine, branch, stream, and stone was used by Christ to illustrate eternal truths; country living opens this open-air sanctuary.",
    text: "Nature's symbols are the keys that unlock the treasures of the Word. The character of God is written in the grass, the flowers, and the trees.",
    source: "Education, p. 102",
    category: 'Spiritual Growth'
  },
  // Mental Health & Country Living Quotes
  {
    id: 'mh-1',
    title: "Root Cause of Disease: The Ailments of the Mind",
    theme: "Restoring Broken Life-Forces",
    image: COUNTRY_IMAGES.peacefulMind,
    imageAlt: "Peaceful figure resting beside tranquil mountain brook in gentle golden woodland light",
    historicalContext: "Nine-tenths of modern physical chronic illnesses originate in chronic mental anxiety, toxic city pressure, and broken domestic tranquility.",
    text: "Sickness of the mind prevails everywhere. Nine tenths of the diseases from which men suffer have their foundation here. Perhaps some living home trouble is like a canker eating to the very soul and weakening the life-forces.",
    source: "The Ministry of Healing, p. 241",
    category: 'Mental Health'
  },
  {
    id: 'mh-2',
    title: "Healing Medicine of Pure Air, Sunshine & Garden Exercise",
    theme: "Restoration for the Weary Mind",
    image: COUNTRY_IMAGES.permacultureGarden,
    imageAlt: "Lush permaculture orchard garden with raised beds, fruit trees, and sunlit paths",
    historicalContext: "Natural light, negative ions, aerobic exercise in planting, and fragrant botanical terpenes bring biological healing no pharmacy can match.",
    text: "The atmosphere of the country, the fresh air, the sunshine, the flowers and trees, the exercise of the garden and the field, bring health and strength to the invalid and peace to the weary mind.",
    source: "The Ministry of Healing, p. 268",
    category: 'Mental Health'
  },
  {
    id: 'mh-3',
    title: "Health-Giving Quiet for the Nervous and Weary",
    theme: "Sanctuary from Sensory Overload",
    image: COUNTRY_IMAGES.malawiHomesteadSanctuary,
    imageAlt: "Malawi highland homestead surrounded by mountains, green trees, and blue skies",
    historicalContext: "City noise over-stimulates the sympathetic nervous system; the country acts as an acoustic and physiological haven.",
    text: "In the natural surroundings of the country, there is for the sick and suffering a health-giving power. The quiet and freedom of the country are a great benefit to those who are nervous and weary.",
    source: "The Ministry of Healing, p. 365",
    category: 'Mental Health'
  },
  {
    id: 'mh-4',
    title: "City Clamor vs. The Rest and Healing of Nature",
    theme: "Escaping the Artificial Life",
    image: COUNTRY_IMAGES.homesteadHighlands,
    imageAlt: "Panoramic view of highland homestead overlooking misty valleys and fresh green plateaus",
    historicalContext: "The cramped, artificial routine of modern cities drains the soul; stepping into nature re-anchors our sense of identity and divine peace.",
    text: "The noise and bustle of the city, the cramped and artificial life, are a weariness and a trial to the sick and nervous. The quiet, the beauty, the freshness of nature bring rest and healing.",
    source: "Country Living, p. 14",
    category: 'Mental Health'
  }
];

export interface MalawiDistrictInfo {
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  altitude: string;
  rainfall: string;
  soil: string;
  soilTypeDetailed: string;
  soilPh: string;
  groundwaterDepthM: string;
  landCostBallpark: string;
  nearestMarketTown: string;
  m1DistanceKm: string;
  suitabilityScore: number; // 1 to 10
  bestCrops: string[];
  outpostStrategy: string;
  hydrogeologyNote: string;
  dccmsSourceRef: string;
}

export const MALAWI_DISTRICTS_DATA: Record<string, MalawiDistrictInfo> = {
  dedza: {
    name: 'Dedza District',
    region: 'Central',
    altitude: 'High Highland (1,350 - 1,850m)',
    rainfall: '1,000 - 1,350 mm/year',
    soil: 'Volcanic Ferric Nitisols & rich dark humic clays',
    soilTypeDetailed: 'Chromic/Eutric Nitisols with volcanic glass inclusions & deep organic A horizon.',
    soilPh: 'pH 5.5 - 6.3 (Slightly acidic, optimal for temperate & grain crops)',
    groundwaterDepthM: '20 - 35m (Fractured basement rock & spring headwaters)',
    landCostBallpark: 'MWK 800,000 - 2,500,000 per acre (~$450 - $1,400 USD)',
    nearestMarketTown: 'Dedza Boma & Lizulu Trading Centre (Direct on M1 Highway)',
    m1DistanceKm: '0 - 15 km from main M1 transport spine',
    suitabilityScore: 10,
    bestCrops: ['Irish Potatoes', 'Peaches', 'Cabbage', 'Maize', 'Carrots', 'Beans', 'Apples', 'Wheat'],
    outpostStrategy: 'Prime cold-climate highland sanctuary. High altitude yields cool nights (6°C in winter), ideal for seed saving, root cellars, and year-round vegetable cropping without heat stress.',
    hydrogeologyNote: 'High mountain catchment recharge ensures strong perennial springs. Gravity-fed pipelines work exceptionally well without electricity.',
    dccmsSourceRef: 'DCCMS Dedza Agromet Station (1,432m asl) & MoA Soil Survey Bulletin #4'
  },
  mzimba: {
    name: 'Mzimba District',
    region: 'Northern',
    altitude: 'High Highland & Plateau (1,200 - 1,600m)',
    rainfall: '950 - 1,250 mm/year',
    soil: 'Ferric Latosols & Orthic Acrisols',
    soilTypeDetailed: 'Well-drained deep red-brown sandy clay loams over weathered basement complexes.',
    soilPh: 'pH 5.2 - 6.0 (Moderately acidic; benefits from agricultural lime/wood ash)',
    groundwaterDepthM: '15 - 30m (Perennial dambo wetlands & weathered saprolite aquifer)',
    landCostBallpark: 'MWK 500,000 - 1,800,000 per acre (~$290 - $1,000 USD)',
    nearestMarketTown: 'Mzimba Boma, Ekwendeni & Mzuzu City (M1 North)',
    m1DistanceKm: '5 - 35 km depending on ward',
    suitabilityScore: 9,
    bestCrops: ['Maize', 'Beans', 'Macadamia', 'Irish Potatoes', 'Sunflowers', 'Fruit Trees', 'Coffee'],
    outpostStrategy: 'Vast land holdings with low population density. Excellent for broad-acre organic farming, solar food forests, livestock stewardship, and off-grid timber sanctuaries.',
    hydrogeologyNote: 'Abundant seasonal dambos (valley wetlands) retain moisture into late October. Shallow hand-dug wells and boreholes yield high-quality water.',
    dccmsSourceRef: 'DCCMS Mzimba Boma & Ekwendeni Rain Gauge Records (1995-2024)'
  },
  mulanje: {
    name: 'Mulanje District',
    region: 'Southern',
    altitude: 'Massif Slopes & Foothills (650 - 1,400m)',
    rainfall: '1,400 - 2,400 mm/year (Windward slopes reach 2,600mm)',
    soil: 'Deep Humic Ferralsols & Volcanic Massif soils',
    soilTypeDetailed: 'Friable, porous deep red latosols rich in iron oxides and organic litter.',
    soilPh: 'pH 4.8 - 5.8 (Acidic; ideal for tea, berries, macadamia, and citrus)',
    groundwaterDepthM: '10 - 25m (High rainfall mountain recharge zone)',
    landCostBallpark: 'MWK 1,200,000 - 3,500,000 per acre (~$700 - $2,000 USD)',
    nearestMarketTown: 'Mulanje Boma & Limbuli Border Market (Near M2 Highway)',
    m1DistanceKm: '65 km East of M1 via Thyolo/Blantyre M2',
    suitabilityScore: 9,
    bestCrops: ['Tea', 'Avocados', 'Bananas', 'Pineapples', 'Macadamia', 'Passionfruit', 'Sweet Potatoes'],
    outpostStrategy: 'Abundant natural mountain rivers flowing from Mulanje Massif. Winter Chiperoni mists maintain high relative humidity. Exceptional for tropical food forests and hydro micro-turbines.',
    hydrogeologyNote: 'Dozens of perennial mountain streams (Likhubula, Ruo, Thuchila) provide clean surface water for gravity filtration systems.',
    dccmsSourceRef: 'DCCMS Thornwood & Lujeri Estate Met Stations, Mulanje Massif'
  },
  kasungu: {
    name: 'Kasungu District',
    region: 'Central',
    altitude: 'Mid Savanna Plateau (1,000 - 1,150m)',
    rainfall: '800 - 1,020 mm/year',
    soil: 'Orthic Ferralsols & Sandy Clay Loam',
    soilTypeDetailed: 'Coarse to medium textured sandy loam over friable subsoil clays.',
    soilPh: 'pH 5.8 - 6.6 (Slightly acidic to near neutral, excellent for legumes)',
    groundwaterDepthM: '30 - 50m (Crystalline basement complex aquifer)',
    landCostBallpark: 'MWK 400,000 - 1,200,000 per acre (~$230 - $700 USD)',
    nearestMarketTown: 'Kasungu Boma & Nkhamenya Trading Centre (Direct M1 North)',
    m1DistanceKm: '0 - 20 km along M1 corridor',
    suitabilityScore: 8,
    bestCrops: ['Groundnuts', 'Sunflower', 'Maize', 'Pigeon Peas', 'Sorghum', 'Soybeans', 'Sesame'],
    outpostStrategy: 'Gentle, flat terrain ideal for animal-drawn broadforking, leguminous crop rotations, and solar-pumped borehole irrigation. Excellent dry grain storage conditions.',
    hydrogeologyNote: 'Deeper groundwater table requiring 35-50m drilled boreholes fitted with solar submersible pumps and elevated holding tanks.',
    dccmsSourceRef: 'DCCMS Kasungu Agromet Station (1,058m asl) & FAO Malawi Land Profile'
  },
  zomba: {
    name: 'Zomba District',
    region: 'Southern',
    altitude: 'Highland Slope & Basin (850 - 1,500m)',
    rainfall: '1,150 - 1,550 mm/year',
    soil: 'Fertile Orthic Nitisols & Alluvial Slope Clays',
    soilTypeDetailed: 'Red clay loams with high moisture retention capacity.',
    soilPh: 'pH 5.3 - 6.2 (Optimal for mixed horticulture & orchards)',
    groundwaterDepthM: '15 - 30m (Zomba Plateau aquifer recharge zone)',
    landCostBallpark: 'MWK 1,000,000 - 3,000,000 per acre (~$600 - $1,750 USD)',
    nearestMarketTown: 'Zomba City & Songani Trading Centre (M3 Highway)',
    m1DistanceKm: '40 km East of M1 via Zomba turnoff',
    suitabilityScore: 9,
    bestCrops: ['Vegetables', 'Strawberries', 'Maize', 'Beans', 'Macadamia', 'Avocados', 'Bananas'],
    outpostStrategy: 'Perennial mountain springs from Zomba Plateau provide cool mountain air and clean water. Historic agricultural hub with close proximity to Adventist health & education centers.',
    hydrogeologyNote: 'Mulunguzi River and mountain springs provide year-round gravity irrigation options for slope homesteads.',
    dccmsSourceRef: 'DCCMS Zomba Plateau Met Station & Ministry of Water Hydrogeology Map'
  },
  ntcheu: {
    name: 'Ntcheu District',
    region: 'Central',
    altitude: 'Plateau & Escarpment (1,100 - 1,500m)',
    rainfall: '900 - 1,200 mm/year',
    soil: 'Eutric Nitisols & Bwanje Valley Clay Loams',
    soilTypeDetailed: 'Rich red to dark-brown loam with high mineral fertility.',
    soilPh: 'pH 5.8 - 6.6 (Slightly acidic to neutral)',
    groundwaterDepthM: '22 - 40m (Escarpment fracture zones & valley dambos)',
    landCostBallpark: 'MWK 600,000 - 1,800,000 per acre (~$350 - $1,050 USD)',
    nearestMarketTown: 'Ntcheu Boma & Lizulu Market (M1 Highway)',
    m1DistanceKm: '0 - 10 km along M1 spine',
    suitabilityScore: 9,
    bestCrops: ['Irish Potatoes', 'Cabbage', 'Onions', 'Maize', 'Beans', 'Tomatoes', 'Peaches'],
    outpostStrategy: 'Located along the cool Kirk Range escarpment. Famous for vegetable production and rapid access to Lilongwe/Blantyre via M1. High agricultural self-reliance potential.',
    hydrogeologyNote: 'Springs along the Kirk Range feed gravity irrigation systems for vegetable terraces.',
    dccmsSourceRef: 'DCCMS Ntcheu Boma Rain Gauge & District Development Plan (2020-2025)'
  },
  nkhotakota: {
    name: 'Nkhotakota District',
    region: 'Northern',
    altitude: 'Lakeshore Lowland & Foothills (480 - 750m)',
    rainfall: '1,200 - 1,600 mm/year',
    soil: 'Sandy Alluvial Fluvisols & Humic Lakeshore Clays',
    soilTypeDetailed: 'Deep alluvial deposits along river basins (Bua, Kaombe, Dwangwa).',
    soilPh: 'pH 6.0 - 7.0 (Near neutral, rich in mineral silt)',
    groundwaterDepthM: '10 - 20m (Unconsolidated lakeshore alluvial aquifer)',
    landCostBallpark: 'MWK 500,000 - 1,500,000 per acre (~$290 - $870 USD)',
    nearestMarketTown: 'Nkhotakota Boma & Dwangwa Sugar Estates (M5 Lakeshore Highway)',
    m1DistanceKm: '75 km East of M1 via Nchisi/Kasungu roads',
    suitabilityScore: 8,
    bestCrops: ['Rice', 'Cassava', 'Bananas', 'Sweet Potatoes', 'Mangoes', 'Pineapples', 'Spices'],
    outpostStrategy: 'Abundant water supply from Lake Malawi and major rivers. High rainfall allows rainfed rice and cassava. Ideal for solar pump surface water irrigation.',
    hydrogeologyNote: 'Shallow water table (10-15m) allows low-cost tube well installation and solar surface pumps.',
    dccmsSourceRef: 'DCCMS Nkhotakota Lakeshore Met Station & FAO Water Profile'
  },
  chitipa: {
    name: 'Chitipa / Misuku Hills',
    region: 'Northern',
    altitude: 'High Highland (1,300 - 2,000m)',
    rainfall: '1,100 - 1,750 mm/year',
    soil: 'Rich Organic Humic Acrisols & Mountain Forest Soil',
    soilTypeDetailed: 'Deep forest humus over clay loams on high granite hills.',
    soilPh: 'pH 5.0 - 5.8 (Acidic, optimal for organic coffee & fruit trees)',
    groundwaterDepthM: '10 - 25m (Abundant high-altitude perennial mountain springs)',
    landCostBallpark: 'MWK 350,000 - 1,000,000 per acre (~$200 - $580 USD)',
    nearestMarketTown: 'Chitipa Boma & Nthalire Market',
    m1DistanceKm: '100+ km North-West of Karonga M1 junction',
    suitabilityScore: 9,
    bestCrops: ['Coffee (Misuku Arabica)', 'Bananas', 'Citrus', 'Maize', 'Beans', 'Macadamia', 'Wheat'],
    outpostStrategy: 'One of the most remote, pristine highland sanctuaries in Malawi. Surrounded by Misuku Hills forest reserve. Pristine spring water, untouched organic soil, and extreme seclusion.',
    hydrogeologyNote: 'Natural mountain springs feed pure drinking water directly to homesteads via gravity pipes with zero pumping required.',
    dccmsSourceRef: 'DCCMS Chitipa Boma & Misuku Forest Reserve Meteorological Posts'
  }
};

export interface CitationSource {
  id: string;
  category: 'Climate & Met' | 'Soil & Agriculture' | 'Water & Hydrogeology' | 'Land & Legal' | 'Inspired Counsel & Scripture';
  title: string;
  institution: string;
  description: string;
  verifiableURLOrDoc: string;
}

export const DATA_SOURCES_AND_CITATIONS: CitationSource[] = [
  {
    id: 'cit-dccms',
    category: 'Climate & Met',
    title: 'Malawi Annual Agro-Meteorological Normals & District Rainfall Statistics (1991-2020)',
    institution: 'Department of Climate Change and Meteorological Services (DCCMS), Ministry of Natural Resources & Climate Change, Government of Malawi',
    description: 'Provides official rainfall volume ranges, temperature extremes, seasonal start/end dates, and regional Chiperoni mist frequencies across Dedza, Mzimba, Mulanje, and Kasungu stations.',
    verifiableURLOrDoc: 'DCCMS Agro-Met Bulletin Series, Lilongwe, Malawi (www.metmalawi.gov.mw)'
  },
  {
    id: 'cit-moa-soil',
    category: 'Soil & Agriculture',
    title: 'Land Resources Conservation Department Soil Map & Suitability Survey of Malawi',
    institution: 'Ministry of Agriculture, Irrigation and Water Development (MoAIWD) & LUANAR Soil Science Dept',
    description: 'Soil classification mapping detailing Eutric Nitisols in Dedza/Ntcheu, Humic Ferralsols in Mulanje/Thyolo, and Orthic Ferralsols in Kasungu plateau, including pH ranges and texture profiles.',
    verifiableURLOrDoc: 'MoAIWD Land Resources Bulletin No. 4 & FAO Soil Map of the World (Malawi sheet)'
  },
  {
    id: 'cit-wateraid-hydro',
    category: 'Water & Hydrogeology',
    title: 'Groundwater Resources & Hydrogeological Map of Weathered Basement Aquifers in Malawi',
    institution: 'Ministry of Water & Sanitation Malawi & WaterAid Groundwater Assessment Report',
    description: 'Detailing drill depths, aquifer yields, and water table depths for crystalline basement aquifers (25-45m in Central Plateau) vs unconsolidated alluvial rift valley aquifers (10-20m along Lakeshore).',
    verifiableURLOrDoc: 'Malawi Hydrogeological Survey Paper #12, Blantyre / Lilongwe'
  },
  {
    id: 'cit-land-act',
    category: 'Land & Legal',
    title: 'Customary Land Act (2016) & Customary Land Regulations (2018)',
    institution: 'Ministry of Lands, Housing and Urban Development, Lilongwe, Malawi',
    description: 'Governs legal customary land allocation, Customary Estate registration, Traditional Authority (TA) jurisdiction, and conversion procedures from customary allocation to formal registered land title.',
    verifiableURLOrDoc: 'Malawi Parliament Act No. 19 of 2016 (Government Press, Zomba)'
  },
  {
    id: 'cit-egw-cl',
    category: 'Inspired Counsel & Scripture',
    title: 'Country Living & The Ministry of Healing',
    institution: 'Ellen G. White Estate & Seventh-day Adventist Publishing',
    description: 'Compilation of spiritual counsel regarding leaving crowded cities, cultivating soil, physical/mental health benefits of rural atmosphere, and establishing outpost sanctuaries.',
    verifiableURLOrDoc: 'Country Living (1946) & The Ministry of Healing (1905), Pacific Press'
  }
];

export const PRACTICAL_GUIDES: Guide[] = [
  {
    id: 'where-1',
    title: 'Soil & Water Evaluation',
    category: 'Where',
    icon: 'Droplets',
    content: 'Check for year-round springs, well depth in the area, and do a simple soil jar test to determine sand/silt/clay ratios.'
  },
  {
    id: 'what-1',
    title: 'Essential Hand Tools',
    category: 'What',
    icon: 'Hammer',
    content: 'A good broadfork, a high-quality hoe, and reliable canning equipment are the foundations of small-scale country independence.'
  },
  {
    id: 'how-1',
    title: 'Beginning the Garden',
    category: 'How',
    icon: 'Sprout',
    content: 'Start small. A 10x10 plot of high-density vegetables is better than an acre of weeds. Focus on soil health first.'
  }
];
