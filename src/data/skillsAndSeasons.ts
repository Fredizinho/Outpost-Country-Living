import { DetailedSkillProtocol, SKILL_TECHNICAL_PROTOCOLS } from './skillsTechnicalProtocols';
export * from './skillsTechnicalProtocols';

export type SeasonalTag = 'Rainy Planting' | 'Harvest & Storage' | 'Cold Dry Season' | 'Hot Dry Preparation' | 'Year-Round / Any Season';

export interface SubSkillItem {
  id: string;
  title: string;
  summary: string;
}

export interface SkillItem {
  id: string;
  title: string;
  category: 'Farming' | 'Water & Energy' | 'Food & Preservation' | 'Construction' | 'Medical & Health' | 'Livestock & Health';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToMaster: string;
  summary: string;
  description: string;
  steps: string[];
  toolsNeeded: string[];
  inspiredCounsel: string;
  commonMistakes: string[];
  seasonalTag: SeasonalTag;
  iconName?: string;
  prerequisiteSkillIds?: string[];
  prerequisiteNote?: string;
  subskills?: SubSkillItem[];
  detailedProtocol?: DetailedSkillProtocol;
}

export interface SeasonalTask {
  id: string;
  season: 'Rainy Planting' | 'Harvest & Storage' | 'Cold Dry Season' | 'Hot Dry Preparation';
  months: string;
  focus: string;
  keyActivities: string[];
  recommendedCrops: string[];
  proTip: string;
}

export interface RegionData {
  id: string;
  name: string;
  tagline: string;
  altitude: string;
  rainfall: string;
  temperatureRange: string;
  soilPhRange: string;
  boreholeDepthMeters: string;
  rainfallPattern: string;
  dataSourceRef: string;
  keyDistricts: string[];
  soilCharacteristics: string;
  outpostFeasibility: 'Highest' | 'High' | 'Moderate';
  description: string;
  topCrops: string[];
  waterSources: string;
  challenges: string[];
  recommendations: string[];
}

export const REGIONS_LIST: RegionData[] = [
  {
    id: 'central-highlands',
    name: 'Central Highlands & Plateau',
    tagline: 'The Agricultural Heart of Malawi (Dedza, Ntcheu, Lilongwe Rural)',
    altitude: '1,100 - 1,800 meters',
    rainfall: '850 - 1,250 mm/year',
    temperatureRange: '12°C - 27°C (June minimums drop to 6°C in Dedza)',
    soilPhRange: 'pH 5.5 - 6.5 (Eutric Nitisols & Ferric Latosols)',
    boreholeDepthMeters: '25 - 45 meters (Weathered basement rock aquifer)',
    rainfallPattern: 'Unimodal (Nov/Dec - Mar/Apr). 4-month dry winter with cold highland winds.',
    dataSourceRef: 'Malawi Meteorological Dept (DCCMS) Agro-met Bulletins & MoA Land Resources Division',
    keyDistricts: ['Dedza', 'Ntcheu', 'Lilongwe Rural', 'Dowa', 'Kasungu'],
    soilCharacteristics: 'Volcanic loam, rich red latosols, and well-drained clay-loam with high cation exchange capacity.',
    outpostFeasibility: 'Highest',
    description: 'The Central Highlands present prime conditions for homestead self-sufficiency. High altitude provides cool nights, crisp air, and consistent rain patterns ideal for staple grains, pulses, Irish potatoes, and temperate fruit orchards.',
    topCrops: ['Irish Potatoes', 'Maize', 'Beans', 'Groundnuts', 'Peaches', 'Cabbage', 'Soybeans'],
    waterSources: 'Perennial dambos, mountain springs, and weathered basement boreholes (25-45m depth).',
    challenges: ['Frost in high Dedza & Ntcheu escarpment pockets during June/July', 'Highland dry spells in October before main rains'],
    recommendations: ['Build solar seed dehydrators', 'Construct contour ridges (misozi) for rain capture', 'Plant windbreaks of bamboo and acacias']
  },
  {
    id: 'northern-plateau',
    name: 'Northern Highlands & Viphya Plateau',
    tagline: 'Vast Timberland, Cool Altitudes & Extended Rainfall (Mzimba, Mzuzu, Nkhata Bay, Misuku)',
    altitude: '1,200 - 2,300 meters (Nyika up to 2,600m)',
    rainfall: '1,000 - 1,850 mm/year (Nkhata Bay & Usisya up to 2,200mm)',
    temperatureRange: '10°C - 26°C (Viphya/Nyika night lows drop to 4°C)',
    soilPhRange: 'pH 5.0 - 6.2 (Humic Ferralsols & Acrisols)',
    boreholeDepthMeters: '15 - 35 meters (Shallow alluvial & mountain fracture springs)',
    rainfallPattern: 'Extended Unimodal to Bimodal. Rains start Dec and extend into May/June ("Chiperoni-extended").',
    dataSourceRef: 'FAO Malawi Soil & Water Country Profile & DCCMS Mzuzu Agro-met Station Data',
    keyDistricts: ['Mzimba', 'Nkhata Bay', 'Rumphi', 'Chitipa (Misuku)', 'Karonga'],
    soilCharacteristics: 'Deep organic forest soils, humic latosols, and well-structured hillside clay.',
    outpostFeasibility: 'Highest',
    description: 'The Northern region offers extensive land area with lower population density and a long rain window. Ideal for extensive agroforestry, food forests, macadamia, coffee, and perennial stream gravity systems.',
    topCrops: ['Coffee', 'Macadamia Nuts', 'Bananas', 'Cassava', 'Irish Potatoes', 'Wheat', 'Sunflowers'],
    waterSources: 'Perennial mountain rivers, forest springs, and Lake Malawi escarpment tributaries.',
    challenges: ['Hilly terrain requires contour terracing', 'Longer transport distances to Lilongwe/Blantyre markets'],
    recommendations: ['Establish food forests on hillside contours', 'Utilize gravity-fed water piping from higher springs']
  },
  {
    id: 'southern-shires',
    name: 'Southern Massifs & Shire Highlands',
    tagline: 'Abundant Springs & Tropical Orchard Microclimates (Mulanje, Zomba, Thyolo)',
    altitude: '600 - 2,000 meters (Mulanje Massif peak 3,002m)',
    rainfall: '1,200 - 2,400 mm/year (Mulanje windward slopes reach 2,600mm)',
    temperatureRange: '14°C - 28°C',
    soilPhRange: 'pH 4.8 - 6.0 (Humic Nitisols & Deep Ferralsols)',
    boreholeDepthMeters: '12 - 30 meters (High recharge mountain aquifers & perennial streams)',
    rainfallPattern: 'Unimodal with winter "Chiperoni" mists (May-July) bringing high humidity.',
    dataSourceRef: 'Ministry of Water & Sanitation Hydrogeology Survey & LUANAR Soil Research',
    keyDistricts: ['Mulanje', 'Zomba', 'Thyolo', 'Blantyre Rural', 'Mwanza'],
    soilCharacteristics: 'Deep red latosols, volcanic mountain soils, and rich river valley deposits.',
    outpostFeasibility: 'High',
    description: 'Dominated by Mount Mulanje and Zomba Plateau, this region enjoys some of the highest precipitation in the country. Microclimates nurture citrus, avocados, tea, pineapples, and year-round vegetable production.',
    topCrops: ['Avocados', 'Tea', 'Pineapples', 'Vegetables', 'Cassava', 'Papaya', 'Guavas'],
    waterSources: 'Perennial mountain streams originating from Mulanje Massif and Zomba Plateau.',
    challenges: ['Land availability is tight due to commercial estates', 'High humidity requires careful fungal pest management'],
    recommendations: ['Focus on intensive permaculture garden beds', 'Capture gravity spring water for micro-hydro or irrigation']
  }
];

export const SKILL_SUBSKILLS_DATA: Record<string, SubSkillItem[]> = {
  'compost-making': [
    { id: 'cm-1', title: '30:1 Carbon-to-Nitrogen Layering', summary: 'Alternating dry brown stalks (maize/straw) and high-nitrogen green manures/weeds.' },
    { id: 'cm-2', title: 'Thermophilic Heat Control (55°C–65°C)', summary: 'Monitoring core temperature to destroy weed seeds while preserving beneficial biology.' },
    { id: 'cm-3', title: 'Aerobic Turning Schedule', summary: 'Systematic inside-out turning on Days 4, 10, and 17 to maintain aerobic respiration.' },
    { id: 'cm-4', title: 'Mineral & Biochar Inoculation', summary: 'Dosing wood ash and biochar at 5-10% to lock minerals into stable humic complexes.' }
  ],
  'offgrid-first-aid': [
    { id: 'fa-1', title: 'Orthopedic Fracture & Sprain Splinting', summary: 'Rigid bamboo/wood limb stabilization immobilizing joints above and below fracture.' },
    { id: 'fa-2', title: 'Snakebite Pressure-Immobilization', summary: 'Broad crepe bandaging protocol for Mamba/Cobra bites without harmful tourniquets.' },
    { id: 'fa-3', title: 'Thermal Burn Cooling & Raw Honey Dressing', summary: 'Immediate 15-min clean water cooling and sterile honey/aloe antimicrobial dressing.' },
    { id: 'fa-4', title: 'Activated Charcoal Detox Triage', summary: '50g-100g oral activated hardwood charcoal suspension to adsorb swallowed toxins.' },
    { id: 'fa-5', title: 'Spitting Cobra Eye Saline Irrigation', summary: 'Continuous 15-20 min saline/milk eye flushing to prevent corneal chemical burns.' }
  ],
  'fruit-tree-cultivation': [
    { id: 'ft-1', title: 'Ellen G. White Tree Planting Method (Deep Pit & Rock Bedding)', summary: 'Excavating 80cm–1m³ planting pits with bottom drainage rocks, layered aged compost, biochar, bone meal, and enriched topsoil for permanent root anchoring.' },
    { id: 'ft-2', title: 'Cultivation of Apples, Peaches & Pears (Highlands)', summary: 'Highland low-chill varieties (Anna, Dorsett Golden), chill-hour management in Dedza/Nyika/Zomba, dormancy pruning, and powdery mildew control.' },
    { id: 'ft-3', title: 'Cultivation of Guavas, Mangoes, Citrus & Avocados', summary: 'Sub-tropical & lowland orchard spacing, organic fruit fly traps, rootstock vigor, and citrus greening management across Shire/Lakeshore zones.' },
    { id: 'ft-4', title: 'Whip-and-Tongue, T-Budding & Cleft Grafting', summary: 'Aligning green cambium layers of elite scions onto drought-hardy wild rootstocks, parafilm binding, and wax sealing for early, true-to-type fruit yields.' },
    { id: 'ft-5', title: 'Orchard Guilds & Micro-Swale Water Catchments', summary: 'Companion nitrogen-fixing pigeon peas, deep-rooting comfrey dynamic accumulators, aromatic pest barriers, and 1-meter contour smile bund rainwater basins.' }
  ],
  'vermiculture-worm-farming': [
    { id: 'vw-1', title: 'Tiered Shaded Worm Bin Construction', summary: 'Multi-box wooden/clay bins with 5mm drainage base holes for vermicompost.' },
    { id: 'vw-2', title: 'Moistened Carbon Bedding Preparation', summary: 'Shredded unbleached cardboard and coir conditioned to 75% damp sponge moisture.' },
    { id: 'vw-3', title: 'Optimal Feeding & Calcium Grit Balance', summary: 'Finely chopped kitchen scraps, aged manure, and crushed eggshells for gizzard grit.' },
    { id: 'vw-4', title: 'Castings Migration & Sifting', summary: 'Side-shift feed migration technique to harvest pure black worm castings easily.' },
    { id: 'vw-5', title: 'Aerated Microbial Worm Tea Brewing', summary: '24-hour aerated castings and molasses suspension for potent foliar bio-fertilization.' }
  ],
  'water-conservation-retention': [
    { id: 'wc-1', title: 'A-Frame Plumb-Line Calibration', summary: 'Zero-point calibration for surveying exact contour lines across rolling acreage.' },
    { id: 'wc-2', title: 'Contour Swale Ditch Excavation', summary: 'Level 50cm wide x 30cm deep trenches that slow, spread, and sink surface runoff.' },
    { id: 'wc-3', title: 'Downhill Earth Berm (Msozi) Shaper', summary: 'Mounding excavated soil on downhill edge with Vetiver grass living root anchors.' },
    { id: 'wc-4', title: 'Stone-Paved Level Sill Flood Spillways', summary: 'Armored discharge sills at swale ends preventing gully erosion during flash floods.' },
    { id: 'wc-5', title: 'Dambo Wetland Aquifer Recharging', summary: 'Interception swales feeding seasonal dambo sponges for dry-season shallow wells.' }
  ],
  'drought-resistant-crops': [
    { id: 'dr-1', title: 'Traditional Grain & Staple Selection', summary: 'Proven drought varieties: Sorghum (Pilira 1), Pearl Millet, Cassava, and Pigeon Pea.' },
    { id: 'dr-2', title: 'Overnight Seed Priming & Soaking', summary: '8-hour water/compost tea pre-soak accelerating field germination by 48 hours.' },
    { id: 'dr-3', title: 'Zai / Sasakawa Zero-Till Basins', summary: '15x15cm compost-packed planting stations conserving moisture in root zones.' },
    { id: 'dr-4', title: 'Companion Cowpea Living Canopy', summary: 'Intercropping trailing legumes to suppress weeds and create a dense living groundcover.' },
    { id: 'dr-5', title: "God's Blanket Continuous Surface Mulch", summary: '8cm thick organic residue blanket slashing soil surface evaporation by 70%.' }
  ],
  'herbs-cultivation-medicinal': [
    { id: 'hb-1', title: '30% Coarse Sand Raised Drainage Beds', summary: '20cm elevated beds preventing root rot in wet season humidity.' },
    { id: 'hb-2', title: 'Indigenous Healing Species (Moringa & Artemisia)', summary: 'Propagating Moringa truncheons, Artemisia annua, and ginger rhizomes.' },
    { id: 'hb-3', title: 'Mediterranean Herb Cuttings Guild', summary: 'Rooting 10cm semi-hardwood Rosemary, Thyme, and Lavender in damp coarse sand.' },
    { id: 'hb-4', title: 'Companion Pest-Repelling Bed Borders', summary: 'Planting aromatic border herbs around brassicas and nightshades to repel pests.' },
    { id: 'hb-5', title: 'Morning Harvest & Shaded Glass Jar Curing', summary: 'Dew-point harvesting and dark room convection drying to preserve essential oils.' }
  ],
  'food-preservation-techniques': [
    { id: 'fp-1', title: 'Indirect Solar Thermal Cabinet Drying', summary: 'Convective 50°C–60°C warm air dehydrating fruits and greens below 10% moisture.' },
    { id: 'fp-2', title: 'Triple-Layer PICS Hermetic Grain Bagging', summary: 'Chemical-free oxygen-depletion bagging asphyxiating grain weevils in 72 hours.' },
    { id: 'fp-3', title: 'Wild 2% Saline Lacto-Fermentation', summary: 'Lactic acid vegetable curing creating probiotics and shelf-stable nutrition.' },
    { id: 'fp-4', title: 'Ventilated Root Cellaring & Skin Curing', summary: '10-day 28°C skin hardening followed by cool, dark slatted shelf storage.' },
    { id: 'fp-5', title: 'Double-Clay Zeer Pot Cooling Chamber', summary: 'Thermodynamic evaporative cooling lowering perishable storage by 10°C–15°C.' }
  ],
  'outpost-technology-machinery': [
    { id: 'ot-1', title: 'Digital Multimeter Solar Diagnostics', summary: 'Testing open-circuit voltage (Voc), short-circuit current (Isc), and cell balance.' },
    { id: 'ot-2', title: 'MPPT Charge Controller LiFePO4 Sizing', summary: 'Configuring absorption, float, and low voltage disconnect parameters accurately.' },
    { id: 'ot-3', title: 'Submersible DC Solar Pump Servicing', summary: 'Sand intake screen cleaning and dry-run low water table sensor verification.' },
    { id: 'ot-4', title: 'Two-Wheel Diesel Walking Tractor Maintenance', summary: 'SAE 15W-40 oil changes, fuel filter bleeding, and kerosene air cleaner servicing.' },
    { id: 'ot-5', title: '30° Bevel Edge Hand Tool Grinding & Honing', summary: 'Bastard mill file profiling and oilstone honing for hoes (makhasu), axes, and machetes.' }
  ],
  'insect-handling-pest-control': [
    { id: 'ih-1', title: 'Kenyan Top-Bar Hive Precision Construction', summary: 'Crafting top bars with exact 32mm width spacing tailored for African honeybees.' },
    { id: 'ih-2', title: 'Lemongrass Baiting & Ant Grease Suspension', summary: 'Hanging hives 2m high with tree grease barriers and beeswax pheromone baits.' },
    { id: 'ih-3', title: 'Gentle Smoker Inspection & Brood Protection', summary: 'Cool smoke inspection preserving golden rear honeycombs without disturbing brood.' },
    { id: 'ih-4', title: 'Neem Leaf Botanical Aphid Spray', summary: 'Fresh pounded neem leaf cold aqueous extract with biodegradable surfactant.' },
    { id: 'ih-5', title: 'Tephrosia vogelii Armyworm Knockdown', summary: 'Rotenone-rich organic extract for immediate control of Fall Armyworm larvae.' }
  ],
  'crop-disease-handling': [
    { id: 'cd-1', title: 'Differential Pathology Diagnosis', summary: 'Differentiating fungal concentric lesions from bacterial wilt and viral mosaics.' },
    { id: 'cd-2', title: 'Clear Glass Bacterial Streaming Test', summary: '2-minute stem cut suspension confirming vascular Ralstonia solanacearum ooze.' },
    { id: 'cd-3', title: 'Organic Copper & Lime Bordeaux Mixture', summary: '1:1 copper sulfate and hydrated lime foliar spray for highland Chiperoni blight.' },
    { id: 'cd-4', title: 'Milk & Baking Soda Mildew Eradication', summary: '1:9 fresh milk foliar spray creating sunlight free radicals that kill mildew.' },
    { id: 'cd-5', title: 'Strict 4-Year Solanaceae Bed Rotation', summary: 'Breaking soil pathogen cycles by rotating nightshades with legumes and brassicas.' }
  ],
  'soil-science-indepth': [
    { id: 'ss-1', title: 'Mason Jar Sedimentation Texture Fractioning', summary: '1-min sand, 2-hr silt, and 48-hr clay settlement on USDA texture triangle.' },
    { id: 'ss-2', title: 'Field Ribbon Hand Texture Assessment', summary: 'Kneading soil ribbons to classify sandy loam, clay loam, or heavy vertisols.' },
    { id: 'ss-3', title: 'Soil pH Testing & Agricultural Lime Dosing', summary: 'Applying 200g-400g/m² dolomitic limestone to raise acidic highland soils.' },
    { id: 'ss-4', title: 'Hardwood Ash Potassium Dosing Limits', summary: 'Controlled 50g/m² application preventing excessive alkalinity lockup.' },
    { id: 'ss-5', title: 'Indigenous Microorganism (IMO) Inoculation', summary: 'Culturing forest leaf mold microbes to rebuild mycorrhizal fungal networks.' }
  ],
  'broadforking-notill': [
    { id: 'bf-1', title: 'Pre-Soak Bed Preparation (24 Hours)', summary: 'Conditioning soil moisture for effortless tine penetration into subsoil.' },
    { id: 'bf-2', title: 'Body Weight Lever Crossbar Drive (30cm)', summary: 'Stepping onto forged steel crossbar to sink 5 tines without muscle strain.' },
    { id: 'bf-3', title: '45° Subsoil Hardpan Fracturing', summary: 'Gentle backward levering to aerate compaction while leaving horizons intact.' },
    { id: 'bf-4', title: 'Compost Top-Dressing & Straw Blanket', summary: '5cm finished compost mulch layer protecting newly aerated earthworm channels.' }
  ],
  'seed-saving-heirloom': [
    { id: 'sh-1', title: 'Parent Plant Rogueing & Elite Selection', summary: 'Tagging the most vigorous, disease-free, high-yielding specimens for seed.' },
    { id: 'sh-2', title: '3-Day Wet Seed Pulp Fermentation', summary: 'Natural fermentation breaking down germination inhibitors and seed coats.' },
    { id: 'sh-3', title: 'Fine Mesh Sieve Rinsing & Parchment Drying', summary: '14-day ambient shade dehydration to reach <8% internal seed moisture.' },
    { id: 'sh-4', title: 'Hermetic Glass Mason Jar Silica Storage', summary: 'Airtight glass jars with food-grade desiccant packets for multi-year viability.' }
  ],
  'gravity-water-filtration': [
    { id: 'gw-1', title: 'Food-Grade Column & PVC Under-Drain Assembly', summary: '200L shell with perforated lower collector pipe and flow regulator.' },
    { id: 'gw-2', title: 'Graded Gravel & Coarse Sand Underbedding', summary: '5cm 12mm gravel and 5cm coarse sand supporting the fine filtration bed.' },
    { id: 'gw-3', title: 'Fine Silica Sand Column (50cm, 0.7mm Grain)', summary: 'Precision washed silica sand creating microscopic physical filtration pores.' },
    { id: 'gw-4', title: 'Biological Schmutzdecke Living Layer Care', summary: 'Maintaining 5cm standing water to sustain pathogen-eating micro-organisms.' },
    { id: 'gw-5', title: 'Perforated Diffuser Plate Turbulence Shield', summary: 'Evenly distributing raw water without scouring the delicate biological layer.' }
  ],
  'solar-food-dehydration': [
    { id: 'sd-1', title: 'Thermal Solar Collector Box Assembly', summary: 'Glazed glass and black absorber sheet generating convective rising hot air.' },
    { id: 'sd-2', title: 'Stainless Mesh Food Trays (5mm Slice Layout)', summary: 'Single-layer uniform slicing for rapid 24-48 hour dehydration.' },
    { id: 'sd-3', title: 'Adjustable Top Vent Heat Control (45°C–60°C)', summary: 'Modulating exhaust air to prevent enzyme scorching while exhausting moisture.' },
    { id: 'sd-4', title: 'Crisp Texture & Hermetic Storage Check', summary: 'Confirming <10% moisture content prior to packing in airtight containers.' }
  ],
  'solar-pv-lithium-bank': [
    { id: 'sp-1', title: 'Daily Kilowatt-Hour (kWh) Consumption Sizing', summary: 'Auditing critical loads (pumps, refrigeration, lighting, tools) for inverter sizing.' },
    { id: 'sp-2', title: 'North-Facing 15° Solar Panel Installation', summary: 'Optimizing solar tilt angle for Southern Hemisphere / Malawi sun paths.' },
    { id: 'sp-3', title: '48V 100Ah LiFePO4 BMS Wiring & Breakers', summary: 'Connecting battery strings with DC disconnects, fuses, and cell balancing.' },
    { id: 'sp-4', title: '3kVA Pure Sine Wave Inverter Configuration', summary: 'Delivering clean 230V AC electricity for sensitive electronics and motors.' }
  ],
  'earth-block-masonry': [
    { id: 'eb-1', title: 'Soil Clay-Sand Balance Testing (15-30% Clay)', summary: 'Jar and drop ball tests ensuring ideal binding clay and structural sand ratios.' },
    { id: 'eb-2', title: '6-8% Lime or Portland Cement Stabilization', summary: 'Dry-mixing stabilizing binders with soil before controlled water addition.' },
    { id: 'eb-3', title: 'Manual Lever Press (Cinva-Ram) Operation', summary: 'High-pressure hydraulic/toggle lever compaction into dense uniform blocks.' },
    { id: 'eb-4', title: '21-Day Damp Plastic Sheet Curing', summary: 'Daily light misting and airtight plastic covering for maximum brick strength.' }
  ],
  'zeer-pot-evaporative-cooling': [
    { id: 'zp-1', title: 'Double-Walled Unglazed Clay Pot Nesting', summary: 'Pairing porous earthenware pots with a 3-5cm interstitial perimeter gap.' },
    { id: 'zp-2', title: 'Coarse River Sand Thermal Infill', summary: 'Filling interstitial cavity with sand and saturating with clean water.' },
    { id: 'zp-3', title: 'Shaded Breezy Draft Corridor Placement', summary: 'Positioning pot in continuous airflow to drive rapid evaporative cooling.' },
    { id: 'zp-4', title: 'Twice-Daily Water Re-Saturation Protocol', summary: 'Replenishing sand moisture morning and evening to maintain 10°C–15°C depression.' }
  ],
  'small-livestock-poultry': [
    { id: 'lp-1', title: 'Elevated 1-Meter Bamboo Coop with Slatted Floor', summary: 'Predator-proof housing with drop-through droppings management.' },
    { id: 'lp-2', title: 'Fresh Garlic Water & Wood Ash Dust Baths', summary: 'Natural parasite repellent water and dusting stations preventing mites/lice.' },
    { id: 'lp-3', title: 'Natural Feed Formulation (Bran, Legumes, Termites)', summary: 'High-protein homestead rations combining maize bran, pigeon peas, and insects.' },
    { id: 'lp-4', title: 'Newcastle Disease Eye-Drop Vaccination', summary: 'District veterinary drop administration at 3 weeks and 3 months of age.' },
    { id: 'lp-5', title: '30-Day Manure Thermophilic Compost Aging', summary: 'Safe pathogen-free poultry and goat manure curing before applying to food beds.' }
  ],
  'salt-curing-solar-biltong': [
    { id: 'sc-1', title: '1cm Grain-Aligned Strip Trimming', summary: 'Preparing clean lean meat strips or butterflied freshwater fish (Chambo/Usipa).' },
    { id: 'sc-2', title: 'Coarse Rock Salt & Spice Dredging (6 Hours)', summary: 'Osmotic dehydration with non-iodized rock salt, cracked coriander, and pepper.' },
    { id: 'sc-3', title: 'Citrus & Vinegar Wash pH Balancing', summary: 'Quick acidic rinse setting surface pH and removing excess surface salinity.' },
    { id: 'sc-4', title: 'Fly-Proof Mesh Solar Smoke Drying Chamber', summary: 'Hanging strips in a shaded, screened cabinet until 50% moisture weight loss.' }
  ],
  'rainwater-swale-dambo-capture': [
    { id: 'rs-1', title: 'A-Frame Plumb-Line Level Surveying', summary: 'Pegging exact level contour lines across rolling land contours.' },
    { id: 'rs-2', title: '50x30cm Ditch Excavation & Downhill Berm Mound', summary: 'Cutting water catchment trenches with stabilized downhill earth mounds.' },
    { id: 'rs-3', title: 'Vetiver Grass & Pigeon Pea Soil Anchoring', summary: 'Planting deep-rooting vegetative hedges along the earth ridge.' },
    { id: 'rs-4', title: 'Coarse Mulch Infiltration Bedding', summary: 'Packing swale beds with woody debris to prevent standing water and mosquitoes.' }
  ],
  'biochar-composting': [
    { id: 'bc-1', title: 'Low-Oxygen Trench / Cone Kiln Pyrolysis', summary: 'Burning dry woody brush and maize cobs in oxygen-limited pits to red embers.' },
    { id: 'bc-2', title: 'Liquid Manure Tea Water Quenching', summary: 'Rapid water quenching to trap microscopic carbon porosity and pore structures.' },
    { id: 'bc-3', title: '2-5mm Mechanical Tamper Crushing', summary: 'Crushing cooled biochar into fine gravel-sized particles for soil blending.' },
    { id: 'bc-4', title: '14-Day 1:4 Thermophilic Compost Charging', summary: 'Inoculating biochar with hot compost and liquid microbes to prevent nitrogen lock.' }
  ],
  'fruit-tree-grafting': [
    { id: 'fg-1', title: 'Hardy Seedling Rootstock Propagation', summary: 'Growing local wild mango or sour orange rootstocks to pencil thickness.' },
    { id: 'fg-2', title: 'Dormant Scion Twig Collection (3-4 Buds)', summary: 'Selecting vigorous dormant twigs from proven high-yield mother trees.' },
    { id: 'fg-3', title: 'Whip-and-Tongue Cambium Layer Mating', summary: 'Precision 2.5cm sloping cuts matching inner green cambium vascular tissues.' },
    { id: 'fg-4', title: 'Parafilm Binding & Beeswax Tip Sealing', summary: 'Airtight grafting tape wrap and wax seal to prevent moisture loss during union.' }
  ],
  'solar-dambo-irrigation': [
    { id: 'si-1', title: '4-8 Meter Shallow Dambo Well Brick Casing', summary: 'Perforated brick or concrete ring casing in seasonal wetland aquifers.' },
    { id: 'si-2', title: '24V DC Helical Screw Pump Submersion', summary: 'Suspending stainless submersible pump above silt floor with safety cable.' },
    { id: 'si-3', title: 'Solar Pump Controller & Dry-Run Sensor Sizing', summary: 'Connecting water-level probe controller preventing low water table motor damage.' },
    { id: 'si-4', title: 'Direct-Drive 2x 350W Panel Array Connection', summary: 'Zero-battery direct solar PV array delivering 5,000L-10,000L daily water.' },
    { id: 'si-5', title: '32mm HDPE Pipeline to 2,000L Header Tank', summary: 'Gravity-fed distribution pipeline to garden drip lines and trench furrows.' }
  ]
};

const BASE_HOMESTEAD_SKILLS: SkillItem[] = [
  {
    id: 'compost-making',
    title: 'Compost Making & Thermophilic Heap Inoculation',
    category: 'Farming',
    difficulty: 'Beginner',
    timeToMaster: '3 Weeks',
    iconName: 'compost',
    summary: 'Constructing high-temperature thermal compost heaps with a balanced 30:1 Carbon-to-Nitrogen ratio, reaching 55°C–65°C to destroy weed seeds and pathogens, creating dark nutrient-dense humus in 6–8 weeks.',
    description: 'Hot thermophilic composting harnesses aerobic bacteria, actinomycetes, and fungi to rapidly break down organic waste. By alternating carbon-rich brown materials (dry maize stalks, straw, dry leaves) with nitrogen-rich greens (fresh manure, green weeds, kitchen waste, legume cuttings) and keeping moisture at 50–60%, temperatures climb to 55°C–65°C within 72 hours. This heat sterilizes pest larvae and weed seeds while concentrating minerals into bio-available microbial humus.',
    steps: [
      'Choose a shaded, well-drained site (minimum 1.5m x 1.5m footprint) and loosen the native soil base 20cm deep with a broadfork.',
      'Lay a coarse bottom base (15cm thick) of dry twigs and maize cobs for foundational bottom aeration.',
      'Add a 15cm brown layer of dry grass, chopped straw, and dried leaves (high carbon, C:N ~ 60:1).',
      'Add a 10cm green layer of fresh animal manure (cattle/goat/poultry), green weeds, and kitchen scraps (high nitrogen, C:N ~ 15:1).',
      'Dust lightly with wood ash and biochar, then sprinkle with water until as moist as a wrung-out sponge (50–60% moisture).',
      'Repeat alternating brown and green layers up to a height of 1.5 meters, tapering toward a rounded top.',
      'Insert a central ventilation branch or perforated bamboo stalk into the center to monitor internal heat.',
      'Turn the entire heap inside-out on Day 4, Day 10, and Day 17 to re-oxygenate aerobic microbes and ensure uniform heating.',
      'Allow the pile to cure for 3–4 weeks until it cools to ambient temperature and smells like sweet forest earth.'
    ],
    toolsNeeded: ['Pitchfork / Digging Fork', 'Watering Can / Bucket', 'Hoe (Khasu)', 'Compost Thermometer / Dry Stick', 'Organic Mulch / Tarp'],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find that unexpected treasures open before him... The earth must be given back that which is taken from it, that its strength may not be exhausted." — E.G. White, Education, p. 211',
    commonMistakes: [
      'Making piles too small (<1 cubic meter), which lose heat quickly and fail to achieve thermophilic temperatures (55°C+).',
      'Over-saturating the pile with water, creating anaerobic conditions, foul ammonia odors, and nutrient leaching.',
      'Adding excessive wood ash in thick layers, raising pile pH above 8.5 and causing volatile nitrogen loss as ammonia gas.'
    ],
    seasonalTag: 'Cold Dry Season',
    prerequisiteNote: 'Foundational homestead fertility skill. No prerequisites required.'
  },
  {
    id: 'offgrid-first-aid',
    title: 'Emergency First Aid: Fractures, Snakebites, Burns & Triage',
    category: 'Medical & Health',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'firstaid',
    summary: 'Stabilizing bone fractures with rigid padded splints, pressure-immobilization for venomous snakebites (Boomslang, Mamba, Spitting Cobra), natural cooling for 1st/2nd degree burns, and activated charcoal poisoning triage.',
    description: 'In rural outposts located far from district hospitals (e.g. 40+ km from Dedza, Ntcheu, or Mzimba clinics), immediate emergency self-triage is life-saving. This comprehensive guide details emergency orthopedic splinting, pressure-immobilization without harmful tourniquets, burn stabilization with cool clean water and medical-grade honey/aloe, eye flushing for venom spit, and rapid activated charcoal detox protocols.',
    steps: [
      'Fracture Protocol: Check neurovascular status (pulse, warmth, sensation). Pad the injured limb with soft cloth and immobilize using rigid wooden/bamboo splints securing the joint above and below the fracture. Never attempt to force displaced bone back.',
      'Snakebite Protocol (Cytotoxic/Neurotoxic/Hemotoxic): Keep the victim completely still and calm to slow lymphatic venom spread. Apply a broad crepe pressure immobilization bandage firmly along the entire limb (firm as for an ankle sprain). Immobilize with a splint. Keep bite at heart level. Never cut, suck, or apply arterial tourniquets.',
      'Snake Venom Eye Spitting Protocol: Immediately flush the eyes with continuous clean stream/boiled saline water or fresh milk for at least 15–20 minutes without rubbing.',
      'Burn Protocol: Cool thermal burns immediately with clean cool running water for 10–20 minutes. Apply pure raw unheated honey or sterile Aloe vera inner gel to prevent microbial infection. Cover loosely with sterile non-stick gauze. Never apply butter, flour, or ice.',
      'Poisoning / Ingestion Triage: Immediately mix 50–100 grams of food-grade activated hardwood charcoal powder in 300ml clean boiled water and administer orally to adsorb ingested botanical or chemical toxins before systemic absorption.',
      'Hydration & Shock Management: Elevate legs 30cm if shock symptoms appear (pale, clammy, rapid pulse), cover with a warm blanket, and administer oral rehydration salts (1L boiled water + 6 level tsp sugar + 1/2 tsp salt).'
    ],
    toolsNeeded: ['Rigid Wooden / Bamboo Splints', 'Elastic Crepe & Gauze Bandages', 'Food-Grade Activated Charcoal Powder', 'Sterile Saline / Clean Boiled Water', 'Raw Honey & Fresh Aloe Vera', 'Medical Scissors & Tweezers'],
    inspiredCounsel: '"Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature\'s remedial agencies and how to apply them." — E.G. White, The Ministry of Healing, p. 127',
    commonMistakes: [
      'Applying tight arterial tourniquets or cutting/sucking snakebites, which causes catastrophic localized tissue necrosis and gangrene.',
      'Bursting burn blisters or putting dirty grease/soot on open wounds, creating rapid bacterial sepsis.',
      'Moving an un-splinted compound bone fracture, risking severed arteries and permanent nerve damage.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Essential emergency survival skill. Read and practice drills before moving to rural acreage.'
  },
  {
    id: 'fruit-tree-cultivation',
    title: 'Fruit Tree Cultivation, Orchard Guilds & Grafting',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'fruittree',
    summary: 'Establishing lifelong high-yield perennial orchards (Apples, Guavas, Mangoes, Avocados, Citrus, Peaches) using the Ellen G. White deep-pit planting method with rock bedding, cambium grafting, and micro-swale guilds.',
    description: 'Perennial food forests provide multi-generational food security, microclimate temperature buffering, and cash income with decreasing labor over time. Successful orchard establishment follows the proven Ellen G. White method: excavating deep 1m³ pits with bottom drainage rocks and enriched organic stratifications, selecting zone-specific varieties (low-chill apples in highland Dedza/Nyika vs. guavas, mangoes, and citrus in sub-tropical lowlands), executing precision whip-and-tongue/cleft grafting, and intercropping companion guilds.',
    steps: [
      'Ellen G. White Deep Pit Excavation: Dig 80cm x 80cm x 80cm planting holes (up to 1m³ for deep taproot avocados and mangoes on heavy clay) during the dry season. Place a 15–20cm base layer of coarse river stones and volcanic gravel at the bottom for lifelong aeration and deep taproot drainage.',
      'Stratified Organic Backfill: Mix separated topsoil 50/50 with well-aged thermophilic compost, 3kg crushed biochar, 250g steamed bone meal, and 100g hardwood ash to build a lifelong nutrient reservoir.',
      'Highland vs. Lowland Variety Selection: For cool highlands (Dedza, Nyika, Zomba), plant low-chill apples (Anna, Dorsett Golden), peaches, and plums. For warmer sub-tropical/lakeshore valleys, establish guavas (pink/white heirloom), improved mangoes (Tommy Atkins, Kent), avocados (Hass/Fuerte), and citrus.',
      'Precision Scion Grafting: Collect pencil-thick dormant scions with 3–4 plump vegetative buds. Align the green inner cambium layers with hardy local wild rootstocks using whip-and-tongue or cleft cuts; bind tightly with parafilm and seal cut ends with beeswax.',
      'Planting & Root Flare Alignment: Center the young sapling so the root collar sits 3cm above ground level (accounting for soil settling). Ensure the graft union remains 10–15cm above soil level to prevent scion rooting and crown rot.',
      '1-Meter Smile Bund Rainwater Catchment: Shape a semi-circular downhill earthen berm (smile bund) around the tree dripline and pack with 10cm of coarse grass mulch to harvest wet-season runoff.',
      'Symbiotic Guild Establishment: Plant nitrogen-fixing pigeon peas (nandolo) on the windward side, deep-rooting comfrey around the dripline for mineral pumping, and aromatic lemongrass/marigolds to deter root-knot nematodes and fruit pests.'
    ],
    toolsNeeded: ['Shovel & Digging Hoe (Khasu)', 'Razor Sharp Grafting Knife & Parafilm', 'Secateurs / Pruning Shears', 'River Stones / Gravel for Drainage Layer', 'Aged Compost, Biochar & Bone Meal', 'Tree Support Stakes & Mulch'],
    inspiredCounsel: '"While we were in Australia, we adopted the plan of digging deep trenches and filling them in with dressing that would provide nourishment for the roots... This was done with tomatoes, oranges, lemons, peaches, and grapes." — Ellen G. White, Letter 350, 1907 (Ellen G. White Estate)',
    commonMistakes: [
      'Burying the tree stem too deep with the graft union under soil, which leads to deadly collar rot (Phytophthora) and loss of rootstock resistance.',
      'Skipping the bottom drainage layer in heavy clay soils, resulting in waterlogging and anaerobic root suffocation during torrential wet seasons.',
      'Failing to whitewash or shade young grafted stems from intense tropical sunscald.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['compost-making'],
    prerequisiteNote: 'Requires understanding of rich thermophilic compost preparation for planting pit backfills.'
  },
  {
    id: 'vermiculture-worm-farming',
    title: 'Vermiculture & Earthworm Castings Bio-Production',
    category: 'Farming',
    difficulty: 'Beginner',
    timeToMaster: '3 Weeks',
    iconName: 'vermiculture',
    summary: 'Cultivating African Nightcrawlers (Eudrilus eugeniae) and Red Wigglers in stacked wooden or clay bin systems to transform kitchen scraps and animal manure into microbial vermicompost and liquid foliar tea.',
    description: 'Vermiculture utilizes epigeic earthworms to rapidly process organic waste into worm castings (vermicompost)—the richest organic plant food on earth, packed with humus, beneficial bacteria, auxins, and enzymes. A single square meter worm bin can produce 20kg of premium organic fertilizer per month while generating a potent liquid bio-fertilizer that boosts seedling root vigor and disease resistance.',
    steps: [
      'Bin Construction: Build a dark, shaded 2- or 3-tier wooden box (or repurposed ventilated plastic totes) with 5mm drainage holes drilled in the bottom base.',
      'Prepare Bedding: Shred unbleached cardboard, coconut coir, or dried banana leaves. Soak in clean water and squeeze out excess until 75% moisture (feels like a damp sponge).',
      'Stocking Worms: Add 500g–1kg of healthy compost worms (African Nightcrawlers / Red Wigglers) onto the bedding and cover with a damp burlap sack in deep shade.',
      'Feeding Protocol: Feed worms finely chopped fruit scraps, vegetable peelings, crushed eggshells (for grit and pH balance), and aged herbivore manure.',
      'Moisture & Aeration: Maintain bedding moisture at 70–80% and temperature between 18°C–28°C. Add crushed wood ash sparingly if pH drops below 6.5.',
      'Harvesting Castings: Shift feed to one half of the bin for 7 days so worms migrate; scoop rich black castings from the opposite side.',
      'Brewing Worm Tea: Suspend 2 cups of fresh castings in 10L clean de-chlorinated water with 1 tbsp molasses; bubble with an aerator for 24 hours to create foliar bio-fertilizer.'
    ],
    toolsNeeded: ['Tiered Wooden/Plastic Worm Bins', 'Shredded Cardboard & Leaf Mulch', 'Crushed Eggshells', 'Compost Worm Starter Colony', 'Burlap Sacks', 'Fine Mesh Sieve'],
    inspiredCounsel: '"Go to the ant, thou sluggard; consider her ways, and be wise... In nature God has given us humble teachers to instruct us in His laws of diligence and order." — Proverbs 6:6 / Education, p. 117',
    commonMistakes: [
      'Feeding heavy quantities of citrus peels, raw onions, oily foods, or fresh dog/cat feces, which acidifies or poisons the worm bedding.',
      'Exposing worm bins to hot direct midday sunlight (>35°C), which cooks earthworms in their bins within hours.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Foundational bio-fertility skill. No prerequisites required.'
  },
  {
    id: 'water-conservation-retention',
    title: 'Water Conservation, Keyline Swales & Dambo Retention',
    category: 'Water & Energy',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'waterconservation',
    summary: 'Capturing and infiltrating 100% of rainwater runoff on homestead land using precision A-frame contour swales, deep organic mulching, Vetiver grass vegetative barriers, and dambo wetland sponge recharge.',
    description: 'In semi-arid or unimodal rainfall climates (such as Malawi with a 7-month dry season), rain must be slowed, spread, and sunk into the subsoil rather than running off to erode topsoil. By cutting level contour ditches (misozi) with downhill earth berms, planting dense Vetiver grass hedges, and creating deep woodchip swale reservoirs, you recharge underground aquifers, keeping down-slope crops green throughout the dry season.',
    steps: [
      'A-Frame Calibration: Build a 2-meter wooden A-frame with a center plumb-line weight. Calibrate on level ground and reverse to mark exact zero-level center.',
      'Contour Surveying: Walk the landscape across the slope, placing wooden marker stakes every 3 meters along the exact level contour line.',
      'Swale Trench Excavation: Dig a level, flat-bottom trench 50cm wide by 30cm deep along the staked line (never sloping).',
      'Downhill Berm Construction: Pile excavated soil on the downhill side of the trench, shaping a wide rounded mound (msozi berm).',
      'Vegetative Stabilization: Plant double rows of Vetiver grass (Chrysopogon zizanioides) slips or pigeon pea seeds along the berm crest to anchor the soil.',
      'Organic Infiltration Bedding: Fill the trench bottom with coarse branches, corn stalks, and dry mulch to absorb water and prevent standing mosquito puddles.',
      'Level Sill Spillways: Construct wide, stone-paved level spillways at each end of the swale to discharge overflow safely during extreme cyclonic storms.'
    ],
    toolsNeeded: ['Wooden A-Frame Level & Plumb Line', 'Marking Stakes & Twine', 'Digging Hoe (Khasu) & Spade', 'Vetiver Grass Slips', 'River Stones for Spillways'],
    inspiredCounsel: '"He turneth the wilderness into a standing water, and dry ground into watersprings. And there he maketh the hungry to dwell, that they may prepare a city for habitation." — Psalm 107:35-36',
    commonMistakes: [
      'Digging swales off-contour without an A-frame, which channels torrents of water into low spots and blows out the berm during downpours.',
      'Failing to pave level overflow spillways with flat stones, allowing emergency storm overflows to cut deep erosive gullies across gardens.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteNote: 'Foundational land hydration skill. No prerequisites required.'
  },
  {
    id: 'drought-resistant-crops',
    title: 'Modern Crop Cultivation & Drought-Resistant Grains',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'droughtcrops',
    summary: 'Growing high-yield climate-resilient dryland staples—Sorghum, Pearl Millet, Cassava, Pigeon Peas, and Cowpeas—using seed priming, bio-intensive spacing, and minimum soil disturbance.',
    description: 'As rainfall patterns become erratic and mid-season dry spells more frequent, relying solely on water-hungry hybrid maize risks total crop failure. Modern agroecological cultivation combines drought-hardy traditional grains and deep-rooting legumes with bio-intensive planting techniques: soaking seeds (priming) before sowing, zero-till planting basins, and companion intercropping that locks in residual soil moisture.',
    steps: [
      'Crop Selection: Choose proven drought-hardy varieties: Sorghum, Pearl Millet, Cassava, and Pigeon Peas.',
      'Seed Priming: Soak sorghum/millet seeds in clean water or aerated compost tea for 8 hours overnight; surface dry in shade for 1 hour before sowing to accelerate germination by 48 hours.',
      'No-Till Planting Stations (Zai Pits / Bio-basins): Dig small 15cm x 15cm planting basins spaced 75cm apart along contour lines; place 2 handfuls of rich compost in each station.',
      'Intercropping Guilds: Intercrop 2 rows of sorghum/maize with 1 row of trailing cowpeas or climbing beans to provide a dense living mulch canopy.',
      'Mulch Retention (God’s Blanket): Keep a continuous 8cm cover of dry crop residue across the soil surface to reduce evaporation by up to 70%.',
      'Thinning & Weeding: Thin seedlings to the strongest 2 plants per station at 2 weeks. Uproot weeds early before they compete for soil moisture.'
    ],
    toolsNeeded: ['Pointed Planting Stick (Dibbler)', 'Hoe (Khasu)', 'Soaking Basins for Seed Priming', 'Organic Mulch / Crop Residues', 'Heirloom Drought-Tolerant Seeds'],
    inspiredCounsel: '"He that observeth the wind shall not sow; and he that regardeth the clouds shall not reap... In the morning sow thy seed, and in the evening withhold not thine hand." — Ecclesiastes 11:4, 6',
    commonMistakes: [
      'Burning crop residues (chitukuko burning) after harvest instead of leaving them on the soil as protective moisture-retaining mulch.',
      'Planting seeds too deep (>5cm) in dry soil, causing seeds to exhaust their energy before reaching the surface.'
    ],
    seasonalTag: 'Rainy Planting',
    prerequisiteSkillIds: ['compost-making'],
    prerequisiteNote: 'Assumes basic composting knowledge for preparing bio-intensive planting basins.'
  },
  {
    id: 'herbs-cultivation-medicinal',
    title: 'Important Herbs Cultivation (Local & Non-Local Guilds)',
    category: 'Medical & Health',
    difficulty: 'Beginner',
    timeToMaster: '1 Month',
    iconName: 'herbs',
    summary: 'Cultivating essential African and introduced healing and culinary herbs: local species (Moringa oleifera, Neem, Artemisia annua, Ginger, Garlic) and temperate varieties (Rosemary, Thyme, Peppermint, Tulsi/Holy Basil) for remedies, teas, and pest protection.',
    description: 'An off-grid medicinal garden is a natural dispensary. Herbs require minimal space, provide essential micronutrients and botanical compounds, repel harmful garden pests, and attract pollinators. This guide covers intensive raised-bed cultivation, soil drainage preparation, propagation via cuttings and root division, companion planting, and proper harvesting and drying for long shelf-life.',
    steps: [
      'Bed Preparation: Construct raised garden beds (20cm high) incorporating 30% coarse river sand and 30% compost for rapid drainage, essential for Mediterranean and perennial herbs.',
      'Local Species Propagation: Plant Moringa from fresh seeds or 1m hardwood truncheons; sow Artemisia annua seeds surface-sown on fine silt; plant Ginger/Turmeric rhizomes 5cm deep in semi-shade.',
      'Non-Local Culinary Guilds: Take 10cm semi-hardwood cuttings of Rosemary, Lavender, and Thyme; strip lower leaves, dip in raw honey or aloe gel, and root in moist sand for 21 days.',
      'Companion Planting Layout: Border cabbage/brassica beds with Rosemary and Thyme to deter whiteflies; plant Basil next to tomatoes to enhance flavor and repel hornworms.',
      'Harvesting Timing: Harvest leaves early in the morning immediately after dew dries, but before the hot midday sun evaporates volatile essential oils.',
      'Shade Drying & Curing: Hang herb bundles upside down in a dark, warm, well-ventilated drying shed (never in direct sunlight) for 7–10 days until crisp; pack in airtight glass jars.'
    ],
    toolsNeeded: ['Pruning Shears / Sharp Scissors', 'Well-Drained Raised Garden Beds', 'Coarse River Sand & Compost', 'Drying Racks / Hanging Twine', 'Airtight Glass Storage Jars'],
    inspiredCounsel: '"And by the river upon the bank thereof, on this side and on that side, shall grow all trees for meat, whose leaf shall not fade... and the fruit thereof shall be for meat, and the leaf thereof for medicine." — Ezekiel 47:12',
    commonMistakes: [
      'Over-watering Mediterranean herbs (Rosemary, Thyme, Sage) in heavy waterlogged clay, leading to black root rot within 2 weeks.',
      'Drying harvested herbs in direct sunlight, which bleaches out chlorophyll and vaporizes valuable medicinal essential oils.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Foundational homestead wellness skill. No prior skills required.'
  },
  {
    id: 'food-preservation-techniques',
    title: 'Comprehensive Food Preservation: Solar Drying, Hermetic Storage & Fermentation',
    category: 'Food & Preservation',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'foodpreservation',
    summary: 'Mastering multi-method seasonal surplus preservation: indirect solar thermal dehydration, triple-layer hermetic PICS bags for weevil-free grain storage, wild lacto-fermentation, root cellaring, and clay Zeer pot evaporative cooling.',
    description: 'Post-harvest losses in rural areas can exceed 30–40% due to insect pests, molds, and lack of refrigeration. Mastering comprehensive non-electric preservation techniques turns a bumper harvest into year-round food security. Learn thermal solar drying for vegetables and fruits, hermetic oxygen-depletion grain preservation in PICS bags without chemical pesticides, and natural lactic acid vegetable fermentation.',
    steps: [
      'Solar Thermal Dehydration: Slice mangoes, tomatoes, squashes, and leafy greens (mustard, pumpkin leaves) to uniform 5mm thickness. Blanch greens for 60 seconds. Place on stainless mesh trays in an indirect solar cabinet at 50°C–60°C until moisture drops below 10% (crisp texture).',
      'Hermetic Grain Bagging (PICS Method): Sun-dry harvested maize, cowpeas, and beans to <12% moisture. Inspect for zero live larvae. Pack grain into a high-density double-polyethylene liner inside a woven outer bag. Tie each layer independently with twine. As insects respire, oxygen drops below 5%, naturally asphyxiating all weevils within 72 hours.',
      'Lacto-Fermentation: Shred fresh cabbage, carrots, or radishes; toss with 2% non-iodized coarse salt by weight (20g salt per 1kg vegetable). Massage until brine releases. Pack tightly into clean glass jars, submerging vegetables below the brine line. Ferment at 18°C–24°C for 7–14 days.',
      'Root Cellaring: Cure unwashed sweet potatoes and butternut squashes in a warm shady spot (28°C) for 10 days to set tough skins; transfer to a cool, dark, ventilated root cellar room on slatted wooden shelves.',
      'Zeer Pot Evaporative Cooling: Nest two unglazed terracotta pots with 4cm of wet river sand in between. Place fresh perishables inside the inner pot; cover with a damp cloth in a breezy shade corridor to drop internal temperature by up to 12°C below ambient.'
    ],
    toolsNeeded: ['Indirect Solar Cabinet Dehydrator', 'Triple-Layer PICS Hermetic Bags', 'Airtight Fermentation Jars with Air-locks', 'Coarse Non-Iodized Salt', 'Nested Terracotta Zeer Pots'],
    inspiredCounsel: '"He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame." — Proverbs 10:5',
    commonMistakes: [
      'Packing grain into hermetic PICS bags before it is thoroughly sun-dried (<12% moisture), causing internal moisture condensation and mold growth.',
      'Allowing fermented vegetables to rise above the brine surface, which allows white kahm yeast and mold to form on the surface.'
    ],
    seasonalTag: 'Harvest & Storage',
    prerequisiteSkillIds: ['solar-food-dehydration'],
    prerequisiteNote: 'Builds upon basic solar food dehydration concepts.'
  },
  {
    id: 'outpost-technology-machinery',
    title: 'Outpost Technology & Machinery Maintenance',
    category: 'Water & Energy',
    difficulty: 'Advanced',
    timeToMaster: '1 Month',
    iconName: 'outposttech',
    summary: 'Operating, sizing, and repairing off-grid homestead critical technology: 24V/48V LiFePO4 battery banks, MPPT controllers, DC submersible borehole pumps, walking two-wheel tractors, grain mills, and precision tool sharpening.',
    description: 'True self-reliance requires keeping mechanical and electrical equipment operational without relying on urban repair shops. This guide covers off-grid electrical system troubleshooting with digital multimeters, preventative engine maintenance for two-wheel diesel walking tractors and grain mills (oil, fuel filters, valve clearances), helical DC pump replacement, and tool refurbishment.',
    steps: [
      'Multimeter Electrical Diagnostics: Measure solar open-circuit voltage (Voc) and short-circuit current (Isc) at the combiner box. Check LiFePO4 battery string voltage balance (must stay within 0.05V per cell).',
      'Solar Charge Controller Configuration: Program MPPT controller for LiFePO4 chemistry: Absorption voltage 56.8V (for 48V bank), Float 54.0V, Low Voltage Disconnect (LVD) 48.0V (to prevent deep discharge).',
      'Submersible Solar Pump Maintenance: Inspect DC helical pump every 6 months. Clean sand intake screen; verify water-level probe wiring to prevent pump burnout from dry-running during low dry season aquifer levels.',
      'Small Diesel Engine Servicing (Walking Tractor / Mill): Change SAE 15W-40 engine oil every 50 operating hours; clean diesel sediment bowl and bleed air from fuel injector lines; clean foam air filter in kerosene and re-oil.',
      'Precision Hand Tool Sharpening: Grind nicks out of hoes (makhasu), axes, and machetes using a bastard mill file held at a consistent 30° bevel angle; hone with a medium oilstone and coat metal with linseed oil.'
    ],
    toolsNeeded: ['Digital True-RMS Multimeter', 'Insulated Electrical Hand Tools & Wire Crimpers', 'Socket & Wrench Set (Metric 8mm–24mm)', 'Bastard Mill Files & Wet Sharpening Stones', 'Grease Gun & Lubricants'],
    inspiredCounsel: '"If the iron be blunt, and he do not whet the edge, then must he put to more strength: but wisdom is profitable to direct." — Ecclesiastes 10:10',
    commonMistakes: [
      'Running diesel engines or generators low on engine oil or with clogged air filters, causing catastrophic cylinder scoring within weeks.',
      'Allowing lead-acid or lithium battery banks to sit discharged for days, resulting in permanent capacity degradation and BMS lockouts.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteSkillIds: ['solar-pv-lithium-bank'],
    prerequisiteNote: 'Requires prior completion of Off-Grid Solar PV & Battery Bank Setup.'
  },
  {
    id: 'insect-handling-pest-control',
    title: 'Insect Handling, Beekeeping & Botanical Biocontrol',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'insects',
    summary: 'Managing beneficial insects through Kenyan Top-Bar beekeeping and pollinator sanctuaries, combined with organic botanical insect repellents (Neem oil, Tephrosia vogelii, chili-garlic-ash emulsion) against Fall Armyworms and aphids.',
    description: 'In an ecological homestead, insects are not all enemies: bees provide pollination and raw honey, predatory wasps and ladybugs consume pests, while pest outbreaks are controlled without toxic commercial synthetic chemicals. This skill covers hive management with local materials, gentle smoking, honey harvesting without destroying brood comb, and brewing natural botanical biopesticides from farm-grown trees.',
    steps: [
      'Top-Bar Hive Construction: Build a Kenyan Top-Bar Hive from seasoned cedar/bamboo with 30 top bars (exact 32mm width for African honeybees *Apis mellifera scutellata*).',
      'Hive Siting & Baiting: Hang the hive 2 meters high in deep tree shade near clean water; bait interior top bars with melted beeswax and lemongrass oil (Cymbopogon). Grease hanging wires to block ants.',
      'Gentle Inspection & Smoke: Use dry cow dung, dried maize cobs, or cedar wood shavings in a smoker. Smoke hive entrance gently; lift bars vertically to inspect comb without crushing bees.',
      'Brood Protection & Harvesting: Never harvest dark brood combs containing larvae; harvest only capped golden honey combs located at the rear of the hive during evening hours.',
      'Neem Botanical Spray: Pound 500g of fresh green Neem leaves in 5L water; let stand overnight, strain through cloth, add 1 tsp biodegradable soap, and spray directly on crops infested with aphids or caterpillars.',
      'Fish Bean (*Tephrosia vogelii*) Biocontrol: Extract fresh Tephrosia leaves in water (contains natural rotenone) to create a rapid knockdown spray for Fall Armyworms on maize.'
    ],
    toolsNeeded: ['Kenyan Top-Bar Beehive', 'Bee Veil, Gloves & Smoker', 'Lemongrass Essential Oil / Bait Wax', 'Pounding Mortar & Cloth Strainer', 'Knapsack Sprayer'],
    inspiredCounsel: '"My son, eat thou honey, because it is good; and the honeycomb, which is sweet to thy taste: So shall the knowledge of wisdom be unto thy soul." — Proverbs 24:13-14',
    commonMistakes: [
      'Using synthetic chemical pesticides near homestead hives, wiping out the entire honeybee colony within hours.',
      'Harvesting honey during hot daylight hours or with excessive aggressive smoke, causing African honeybees to abscond from the hive.'
    ],
    seasonalTag: 'Rainy Planting',
    prerequisiteNote: 'Foundational integrated homestead biology skill. No prerequisites required.'
  },
  {
    id: 'crop-disease-handling',
    title: 'Crop Disease Handling & Plant Pathology Control',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'diseases',
    summary: 'Diagnosing and controlling major agricultural plant diseases: fungal Late Blight (Phytophthora infestans), Bacterial Wilt (Ralstonia), Cassava Mosaic Virus (CMV), powdery mildew, and damping-off using certified clean seed, wood ash, and organic Bordeaux fungicides.',
    description: 'Plant diseases thrive in humid or poorly drained soils, decimating potato, tomato, and cassava yields if not intercepted early. Modern ecological disease handling relies on early visual diagnosis (differentiating fungal concentric lesions from bacterial vascular wilt and viral leaf curling), strict crop rotation, cultural sanitation, and organic foliar bio-fungicides (dilute copper sulfate + hydrated lime Bordeaux mixture, aerated compost tea, and milk foliar sprays).',
    steps: [
      'Differential Diagnosis: Inspect foliage daily. Fungal blight shows dark brown water-soaked lesions with white mold on leaf undersides; Bacterial wilt causes sudden midday wilting while leaves remain green; Viral infections display mosaic yellow mottling and crinkled leaf margins.',
      'Bacterial Wilt Water Test: Cut a 3cm stem of a suspected wilted tomato/potato; suspend in a clear glass of clean water for 2 minutes. A cloudy streaming bacterial ooze confirms Ralstonia solanacearum.',
      'Formulating Organic Bordeaux Mixture: Dissolve 100g copper sulfate and 100g hydrated lime in 10L clean water. Strain and spray on tomato and potato foliage early morning every 7–10 days during rainy Chiperoni weather to prevent Late Blight.',
      'Milk & Baking Soda Mildew Spray: Mix 1 part fresh cow/goat milk with 9 parts water and 1 tsp baking soda (sodium bicarbonate); spray on squash and cucurbit leaves in bright sunlight to kill powdery mildew spores.',
      'Strict Sanitation & Rogueing: Uproot and burn or bury deeply (>1 meter) any plants infected with Cassava Mosaic Virus or Bacterial Wilt. Never put diseased tissue in compost heaps.',
      '4-Year Solanaceae Rotation: Never plant tomatoes, potatoes, eggplants, or peppers in the same bed in consecutive years; rotate with legumes (beans/cowpeas) and brassicas (cabbage/kale).'
    ],
    toolsNeeded: ['Hand Lens / Magnifying Glass', 'Copper Sulfate & Hydrated Lime (Bordeaux Mix)', 'Knapsack Sprayer with Brass Nozzle', 'Pruning Shears & Rubbing Alcohol (70%)', 'Baking Soda & Fresh Milk'],
    inspiredCounsel: '"Cleanse out the old leaven that you may be a new lump... In physical as in spiritual life, cleanliness and vigilance are the price of preservation." — 1 Corinthians 5:7 / Ministry of Healing',
    commonMistakes: [
      'Tossing diseased potato/tomato vines with Late Blight or Bacterial Wilt into compost piles, contaminating the entire homestead garden soil for years.',
      'Overhead watering foliage in the late evening, creating prolonged leaf wetness that enables fungal spores to germinate.'
    ],
    seasonalTag: 'Rainy Planting',
    prerequisiteSkillIds: ['compost-making'],
    prerequisiteNote: 'Assumes basic composting and garden bed hygiene understanding.'
  },
  {
    id: 'soil-science-indepth',
    title: 'Soil Science In-Depth: Pedology, Texture & Living Humus',
    category: 'Farming',
    difficulty: 'Advanced',
    timeToMaster: '1 Month',
    iconName: 'soilscience',
    summary: 'Mastering soil physics, chemistry, and biology: soil profile horizon reading (O-A-B-C), mason jar sedimentation testing, field ribbon texture assessment, Cation Exchange Capacity (CEC), pH correction via agricultural lime and wood ash, and nourishing the living mycorrhizal web.',
    description: 'Healthy soil is not dead dirt—it is a complex living ecosystem containing billions of bacteria, fungal mycorrhizae, nematodes, and protozoa per tablespoon. Deep understanding of soil physical texture (sand, silt, clay ratios), soil chemistry (pH, organic carbon, cation balance), and pedological horizons enables you to correct infertile sandy latosols or heavy compacted dambo clays into world-class fertile loam.',
    steps: [
      'Mason Jar Soil Texture Test: Fill a straight-sided clear glass jar 1/3 full with soil. Add clean water and 1 tsp detergent; shake vigorously for 3 minutes. Sand settles in 1 minute (measure height); Silt settles in 2 hours; Clay settles in 48 hours. Calculate percentages to classify soil on the USDA Soil Texture Triangle.',
      'Field Ribbon Test: Moisten a golf-ball-sized soil sample. Knead and squeeze out between thumb and forefinger to form a ribbon. If ribbon breaks before 2.5cm = Sandy Loam; 2.5cm–5cm = Clay Loam; >5cm flexible ribbon = Heavy Clay.',
      'pH Testing & Agricultural Lime Correction: Measure soil pH with indicator strips or digital probe (ideal: pH 6.0–6.8). For acidic soils (pH < 5.5 common in high-rainfall highlands like Mulanje/Viphya), apply 200g–400g of finely ground agricultural dolomitic limestone per square meter.',
      'Wood Ash Potassium & Calcium Boost: Apply sieved hardwood ash at max 50g per square meter to provide immediate potassium, calcium, and raise acidic soil pH.',
      'Soil Food Web Inoculation: Apply compost extracts rich in indigenous microorganisms (IMO) and avoid synthetic chemical fertilizers (Urea/NPK) that burn mycorrhizal fungi and salt out soil earthworms.',
      'Organic Matter Stratification: Keep soil covered with 10cm of carbon mulch at all times to feed endogeic earthworms and build permanent humic glomalin substances.'
    ],
    toolsNeeded: ['Straight-Sided Glass Sedimentation Jars', 'Soil pH Test Strips / Digital Soil Probe', 'Agricultural Dolomitic Lime', 'Sieved Hardwood Ash', 'Measuring Ruler & Notebook'],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find that unexpected treasures open before him... Nature is an open lesson book; the soil, the seed, the tree, the blossom, the fruit, all have their lessons for us." — E.G. White, The Ministry of Healing, p. 241',
    commonMistakes: [
      'Applying massive quantities of unmeasured wood ash, spiking soil pH above 8.0 and locking up iron, zinc, and phosphorus.',
      'Deep rototilling dry clay-rich soils, destroying soil aggregates and pulverizing fungal hyphae into lifeless powder that bakes into hardpan.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['broadforking-notill', 'compost-making'],
    prerequisiteNote: 'Requires prior completion of No-Till Broadforking and Compost Making.'
  },
  {
    id: 'broadforking-notill',
    title: 'No-Till Broadforking & Deep Bed Aeration',
    category: 'Farming',
    difficulty: 'Beginner',
    timeToMaster: '2 Weeks',
    iconName: 'soilscience',
    summary: 'Aerating soil deeply without turning over delicate microbial layers, preserving organic humus and earthworm pathways.',
    description: 'Traditional tilling flips subsoil over topsoil, destroying fungal mycorrhizae and exposing soil to baking sun. Broadforking uses a heavy 5-tine forged steel tool inserted into the soil and leaned back to fracture hardpan subsoil while leaving soil biology intact.',
    steps: [
      'Moisten garden bed 24 hours prior to broadforking.',
      'Step onto the broadfork crossbar, driving tines 30cm deep into the earth using body weight.',
      'Pull handles back gently 45 degrees to fracture subsoil crust.',
      'Step back 20cm and repeat along the entire bed length.',
      'Top dress bed with 5cm of rich compost and cover with straw mulch.'
    ],
    toolsNeeded: ['Forged Steel Broadfork', 'Rake', 'Aged Compost', 'Organic Mulch'],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find that unexpected treasures open before him... Working the soil is a source of health and spiritual strength." — E.G. White, The Ministry of Healing, p. 241',
    commonMistakes: [
      'Levering the broadfork back with brute arm force instead of stepping onto the crossbar and using body weight, causing back strain and handle breakage.',
      'Broadforking in dry, rock-hard soil without pre-soaking, which bends tines or fails to penetrate subsoil hardpan.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteNote: 'Foundational soil preparation skill. No prerequisites required.'
  },
  {
    id: 'seed-saving-heirloom',
    title: 'Heirloom Seed Selection & Preservation',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'droughtcrops',
    summary: 'Selecting, fermenting, drying, and hermetically sealing non-GMO heirloom seeds for infinite generations.',
    description: 'Commercial hybrid seeds do not breed true in subsequent generations. True heirloom seed saving guarantees food security independently of commercial seed suppliers.',
    steps: [
      'Select seed crops from the healthiest, most vigorous, disease-resistant plants.',
      'For wet seeds (tomatoes, squashes), ferment seed pulp in water for 3 days to remove germination inhibitors.',
      'Rinse clean seeds thoroughly in fine mesh sieves.',
      'Spread seeds on unbleached parchment paper in a shady, well-ventilated room for 14 days.',
      'Pack thoroughly dried seeds in airtight glass mason jars with food-grade silica gel packets.'
    ],
    toolsNeeded: ['Fine Mesh Strainers', 'Glass Jars', 'Silica Gel Desiccants', 'Parchment Paper'],
    inspiredCounsel: '"While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not cease." — Genesis 8:22',
    commonMistakes: [
      'Saving seeds from hybrid (F1) market produce, which produce unpredictable, low-yielding offspring in subsequent seasons.',
      'Storing seeds in sealed plastic bags or humid environments before they reach <8% moisture content, leading to mold rot and lost seed viability.'
    ],
    seasonalTag: 'Cold Dry Season',
    prerequisiteSkillIds: ['broadforking-notill'],
    prerequisiteNote: 'Assumes basic experience in aerated soil cultivation and harvesting healthy parent crops.'
  },
  {
    id: 'gravity-water-filtration',
    title: 'Bio-Sand Gravity Water Filtration',
    category: 'Water & Energy',
    difficulty: 'Intermediate',
    timeToMaster: '3 Days',
    iconName: 'waterconservation',
    summary: 'Constructing a multi-layered sand, gravel, and active biological layer filter for crystal-clear drinking water without electricity.',
    description: 'Bio-sand filters eliminate 99% of pathogens, parasites, and turbidity using gravity flow through biologically active sand columns.',
    steps: [
      'Prepare a food-grade 200L barrel or masonry column with a lower PVC outlet pipe.',
      'Fill bottom 5cm with washed underbedding gravel (12mm size).',
      'Add middle 5cm layer of coarse sand (1-2mm size).',
      'Fill upper 50cm with clean, fine silica sand (0.7mm size).',
      'Maintain a 5cm standing water layer above sand to nourish the biological schmutzdecke layer.',
      'Pour raw stream/rain water gently onto diffuser plate.'
    ],
    toolsNeeded: ['Food-Grade Drum/Concrete Shell', 'Graded Sand & Gravel', 'Diffuser Plate', 'PVC Outlet Pipe'],
    inspiredCounsel: '"In health and in sickness, pure water is one of Heaven\'s choicest blessings. Its proper use promotes health." — E.G. White, The Ministry of Healing, p. 237',
    commonMistakes: [
      'Scraping or disturbing the top biological "schmutzdecke" layer during routine cleaning, destroying the pathogen-filtering ecosystem.',
      'Using unwashed or dirty river sand with high silt/clay content, which clogs the filter pores within 48 hours.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Essential water sanitation skill. No prerequisites required.'
  },
  {
    id: 'solar-food-dehydration',
    title: 'Passive Solar Thermal Food Dehydration',
    category: 'Food & Preservation',
    difficulty: 'Beginner',
    timeToMaster: '1 Week',
    iconName: 'foodpreservation',
    summary: 'Building a passive indirect solar cabinet to dry fruits, greens, and grains in 24-48 hours.',
    description: 'Indirect solar drying uses thermal air convection to draw warm air through food trays without direct ultraviolet light destroying vitamins or scorching produce.',
    steps: [
      'Construct a tilted solar collector box lined with black metal absorbing plate under glass.',
      'Attach collector base to an insulated drying cabinet fitted with mesh food trays.',
      'Provide adjustable top exhaust vents to regulate temperature between 45°C and 60°C.',
      'Slice fruits/vegetables uniformly (5mm thickness) and arrange in single layers on trays.',
      'Monitor until food reaches <10% moisture content (crisp or leathery texture).'
    ],
    toolsNeeded: ['Glazed Glass/Polycarbonate', 'Black Metal Sheet', 'Stainless Mesh Trays', 'Wood/Plywood Frame'],
    inspiredCounsel: '"Gather up the fragments that remain, that nothing be lost." — John 6:12',
    commonMistakes: [
      'Exposing sliced produce directly to intense, direct sunlight rather than indirect thermal hot air, destroying heat-sensitive vitamins and darkening fruit skin.',
      'Overcrowding food slices on mesh trays, blocking thermal convection airflow and causing moisture entrapment and souring.'
    ],
    seasonalTag: 'Harvest & Storage',
    prerequisiteNote: 'Foundational food preservation skill. No prerequisites required.'
  },
  {
    id: 'solar-pv-lithium-bank',
    title: 'Off-Grid Solar PV & Battery Bank Setup',
    category: 'Water & Energy',
    difficulty: 'Advanced',
    timeToMaster: '1 Month',
    iconName: 'outposttech',
    summary: 'Sizing, wiring, and installing a reliable 24V/48V solar array with LiFePO4 lithium batteries for off-grid power.',
    description: 'An independent solar energy system powers water pumps, seed refrigeration, grain mills, and household lighting independently of power grids.',
    steps: [
      'Calculate daily kilowatt-hour (kWh) consumption (e.g. 3kWh/day).',
      'Mount 4x 400W solar panels facing North at 15° tilt (for Southern Hemisphere/Malawi latitude).',
      'Connect panels to an MPPT Charge Controller via 6mm² solar cable.',
      'Wire MPPT output to a 48V 100Ah LiFePO4 battery bank with integrated BMS.',
      'Connect battery bank to a 3kVA Pure Sine Wave Inverter for standard household AC power.'
    ],
    toolsNeeded: ['Solar Panels (Mono PERC)', 'MPPT Charge Controller', 'LiFePO4 Lithium Battery', 'Pure Sine Wave Inverter', 'DC Circuit Breakers'],
    inspiredCounsel: '"Sunlight is one of the most benevolent remedies which God has given to man... Room after room should be flooded with light and heat." — E.G. White, Testimonies for the Church, Vol. 2, p. 527',
    commonMistakes: [
      'Connecting LiFePO4 batteries in parallel without balancing individual cell voltages first, causing severe current imbalance and premature BMS shutdown.',
      'Undersizing DC solar cables between panels and controller, causing high voltage drops, excessive heat, and lost charging efficiency.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['gravity-water-filtration'],
    prerequisiteNote: 'Assumes basic homestead infrastructure awareness and safe handling of low-voltage DC electrics.'
  },
  {
    id: 'earth-block-masonry',
    title: 'Compressed Stabilized Earth Block (CSEB) Construction',
    category: 'Construction',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'soilscience',
    summary: 'Pressing local soil with 5-8% lime or cement into dense, fireproof, thermally insulating building blocks.',
    description: 'CSEB blocks require no wood burning for kilns (unlike traditional clay bricks), saving forests while producing ultra-durable, thermal-mass walls.',
    steps: [
      'Test local soil clay-sand ratio (ideal: 15-30% clay, 60-70% sand).',
      'Mix soil thoroughly with 6-8% Portland cement or hydrated lime.',
      'Add minimal water until soil holds shape when squeezed without dripping.',
      'Load mixture into a manual lever press (e.g. Auram or Cinva-Ram press) and compress fully.',
      'Cure pressed blocks under damp plastic sheets for 21 days before laying walls.'
    ],
    toolsNeeded: ['Manual Block Press', 'Soil Sieve (5mm)', 'Cement/Lime', 'Mixing Tarp'],
    inspiredCounsel: '"Whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock." — Matthew 7:24',
    commonMistakes: [
      'Using high-clay subsoil (>35% clay) without adding coarse river sand, leading to severe brick cracking and shrinkage during curing.',
      'Allowing fresh cement-stabilized blocks to dry in direct sun without damp plastic cover, preventing proper 21-day hydration.'
    ],
    seasonalTag: 'Cold Dry Season',
    prerequisiteNote: 'Foundational natural building skill. No prior skills required.'
  },
  {
    id: 'zeer-pot-evaporative-cooling',
    title: 'Non-Electric Evaporative Clay Pot Cooling (Zeer Pots) & Root Cellars',
    category: 'Food & Preservation',
    difficulty: 'Beginner',
    timeToMaster: '3 Days',
    iconName: 'foodpreservation',
    summary: 'Preserving fresh vegetables, eggs, and fruits for weeks without electricity using double-walled terracotta clay pots and wet river sand.',
    description: 'In off-grid homesteads, electricity for refrigeration is costly or unavailable. Zeer pot cooling operates on the thermodynamic principle of evaporative cooling: as water evaporates through porous unglazed terracotta outer clay walls, heat is drawn away from the inner chamber, lowering internal temperature by up to 10°C-15°C below ambient air.',
    steps: [
      'Nest a smaller unglazed earthenware clay pot inside a larger porous terracotta clay pot, leaving a 3-5cm gap between walls.',
      'Fill the interstitial gap completely with clean, coarse river sand.',
      'Pour clean water into the sand until fully saturated.',
      'Place vegetables, tomatoes, greens, or fruit inside the inner dry pot and cover with a clean, wet jute cloth or damp towel.',
      'Elevate the pot off the ground in a shaded, well-ventilated draft corridor and re-water the sand twice daily.'
    ],
    toolsNeeded: ['2 Nested Unglazed Earthenware Clay Pots', 'Coarse River Sand', 'Clean Water', 'Jute/Burlap Sack or Towel'],
    inspiredCounsel: '"He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame." — Proverbs 10:5',
    commonMistakes: [
      'Placing the Zeer pot inside an unventilated indoor corner where humidity accumulates, stopping water evaporation and cooling action.',
      'Using glazed or painted outer clay pots, which blocks moisture from seeping through outer walls to evaporate.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteNote: 'Foundational non-electric refrigeration skill. No prerequisites required.'
  },
  {
    id: 'small-livestock-poultry',
    title: 'Free-Range Local Poultry & Small Livestock Husbandry',
    category: 'Livestock & Health',
    difficulty: 'Intermediate',
    timeToMaster: '1 Month',
    iconName: 'insects',
    summary: 'Housing, feeding, and disease prevention for local indigenous chickens (kuku wa chimaye) and dairy goats on natural forage.',
    description: 'Poultry and goats provide essential protein (eggs, milk, manure) and weed control for rural homesteads. Managing hardy local breeds requires elevated predator-proof coops, balanced natural feed mixes (grain, termites, greens, crushed eggshells for calcium), and herbal pest protection.',
    steps: [
      'Construct an elevated bamboo or wood coop 1 meter above ground with slatted flooring for droppings and predator security.',
      'Supply clean water mixed with garlic cloves and wood ash dusting baths to prevent external mites and lice.',
      'Prepare daily supplemental feed combining maize bran (gaga), crushed pigeon peas, dried termites, and greens.',
      'Vaccinate chicks against Newcastle Disease (Kasozi/Chitopa) at 3 weeks and 3 months using district veterinary drops.',
      'Collect manure daily to age for 30 days in compost piles before applying to vegetable garden beds.'
    ],
    toolsNeeded: ['Elevated Bamboo/Lumber Coop', 'Clay Drinking Troughs', 'Wood Ash & Fresh Garlic', 'Newcastle Disease Eye-Drop Vaccine'],
    inspiredCounsel: '"A righteous man regardeth the life of his beast: but the tender mercies of the wicked are cruel." — Proverbs 12:10',
    commonMistakes: [
      'Keeping poultry coops directly on damp ground without slatted elevation, encouraging parasitic worm infestations and respiratory disease.',
      'Skipping seasonal Newcastle disease eye-drop vaccinations, risking sudden 90%+ flock loss during district outbreaks.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Foundational animal husbandry skill. No prerequisites required.'
  },
  {
    id: 'salt-curing-solar-biltong',
    title: 'Traditional Salt Curing, Meat Smoking & Solar Biltong Preservation',
    category: 'Food & Preservation',
    difficulty: 'Intermediate',
    timeToMaster: '1 Week',
    iconName: 'foodpreservation',
    summary: 'Preserving meat and fish without refrigeration using coarse rock salt, natural hardwood smoke, and solar air drying.',
    description: 'Before electric freezers, families preserved surplus meat and freshwater fish (such as Chambo or Usipa) using dry salt curing, vinegar/citrus wash, and slow cold smoking. Salt draws out moisture while hardwood smoke creates an antimicrobial coating that inhibits bacterial growth for months.',
    steps: [
      'Trim fresh lean meat into thin 1cm strips along the grain or butterfly fresh fish.',
      'Dredge strips thoroughly in coarse non-iodized sea/rock salt, black pepper, and coriander seeds for 6 hours.',
      'Rinse excess surface salt quickly with diluted lemon juice or wild vinegars to set pH.',
      'Hang strips in a fly-screened, well-ventilated solar drying chamber or cool smoker house for 3-5 days until 50% weight loss.',
      'Store dried biltong or smoked fish in breathable linen sacks or sealed glass containers in a cool dry pantry.'
    ],
    toolsNeeded: ['Coarse Rock/Sea Salt', 'Black Pepper & Coriander', 'Fly-Proof Mesh Drying Cabinet', 'Hardwood Logs (Acacia/Fruitwood)'],
    inspiredCounsel: '"Salt is good: but if the salt have lost his saltness, wherewith will ye season it? Have salt in yourselves, and have peace one with another." — Mark 9:50',
    commonMistakes: [
      'Using fine iodized table salt instead of coarse rock salt, resulting in bitter chemical off-flavors and insufficient moisture extraction.',
      'Hanging meat strips in humid, unventilated enclosures without fly mesh netting, leading to blowfly infestation and meat spoilage.'
    ],
    seasonalTag: 'Harvest & Storage',
    prerequisiteSkillIds: ['solar-food-dehydration'],
    prerequisiteNote: 'Assumes understanding of thermal airflow, moisture extraction, and hygiene in food drying chambers.'
  },
  {
    id: 'rainwater-swale-dambo-capture',
    title: 'Contour Swale Construction & Dambo Water Retention',
    category: 'Water & Energy',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'waterconservation',
    summary: 'Digging level contour ditches (misozi) and mini-catchment earth dams to infiltrate rainwater into subsoil aquifers.',
    description: 'Instead of letting heavy rain runoff erode topsoil into rivers, swales are level ditches dug precisely along contour lines. Water collects in the swale, slowly soaking into the ground to hydrate down-slope crops, recharge shallow wells, and nourish perennial fruit trees throughout the dry season.',
    steps: [
      'Locate exact land contour lines using a simple wooden A-frame level with a plumb line.',
      'Mark contour line with stakes and dig a trench 50cm wide by 30cm deep along the level line.',
      'Mound the excavated earth on the downhill side of the trench to form a stable berm.',
      'Plant vetiver grass or pigeon peas on the berm to anchor the soil and stabilize the ridge.',
      'Fill the swale trench with coarse organic mulch, branches, or corn stalks to prevent mosquito breeding and slow evaporation.'
    ],
    toolsNeeded: ['Wooden A-Frame Level', 'Hoe (Khasu)', 'Shovel', 'Vetiver Grass Slips / Pigeon Pea Seeds', 'Organic Mulch'],
    inspiredCounsel: '"He turneth the wilderness into a standing water, and dry ground into watersprings. And there he maketh the hungry to dwell." — Psalm 107:35-36',
    commonMistakes: [
      'Digging swales off-contour without an A-frame level, causing runoff to pool at one end and breach the earth berm during torrential downpours.',
      'Leaving downhill berm earth exposed without planting deep-rooting vetiver grass, causing rapid soil erosion back into the ditch.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['broadforking-notill'],
    prerequisiteNote: 'Assumes basic soil contour awareness and manual earth-moving techniques.'
  },
  {
    id: 'biochar-composting',
    title: 'Biochar Production & Thermophilic Compost Inoculation',
    category: 'Farming',
    difficulty: 'Intermediate',
    timeToMaster: '2 Weeks',
    iconName: 'compost',
    summary: 'Creating high-surface-area pyrolyzed biochar inoculated with active compost tea to permanently lock minerals and carbon in garden soil.',
    description: 'Raw charcoal strips soil nutrients if applied directly. Biochar pyrolyzed at high temperatures must be crushed and inoculated ("charged") with rich thermophilic compost or manure slurry before applying to garden beds.',
    steps: [
      'Pyrolyze woody brush and maize cobs in a low-oxygen trench or cone kiln until glowing red.',
      'Quench glowing char with water or liquid manure tea to trap microscopic pores.',
      'Crush cooled biochar into fine 2-5mm grains.',
      'Mix 1 part crushed biochar with 4 parts fresh hot thermophilic compost and age for 14 days.',
      'Broadfork charged biochar into soil beds at 10% volume.'
    ],
    toolsNeeded: ['Pyrolysis Pit/Kiln', 'Water Hose/Bucket', 'Crushing Tamper/Block', 'Active Hot Compost Heap'],
    inspiredCounsel: '"The earth is the Lord\'s, and the fulness thereof; the world, and they that dwell therein." — Psalm 24:1',
    commonMistakes: [
      'Adding raw, un-inoculated biochar directly to planting soil, which temporarily sucks existing nitrogen out of root zones.',
      'Failing to quench the pyrolysis burn with water at the right moment, turning valuable carbon char into useless white ash.'
    ],
    seasonalTag: 'Cold Dry Season',
    prerequisiteSkillIds: ['broadforking-notill'],
    prerequisiteNote: 'Assumes basic understanding of soil structure, organic compost mixing, and no-till bed aeration.'
  },
  {
    id: 'fruit-tree-grafting',
    title: 'Heirloom Fruit Tree Grafting & Nursery Propagation',
    category: 'Farming',
    difficulty: 'Advanced',
    timeToMaster: '1 Season',
    iconName: 'fruittree',
    summary: 'Propagating disease-resistant rootstocks with high-yielding heirloom scions (avocado, mango, citrus) via whip-and-tongue or cleft grafting.',
    description: 'Fruit trees grown from seed do not reproduce exact parent fruit quality. Grafting dormant heirloom scion wood onto hardy local rootstock guarantees elite fruit production within 3 years.',
    steps: [
      'Grow hardy local seedling rootstock (e.g. wild local mango or sour orange) to pencil thickness.',
      'Collect dormant, healthy scion twigs with 3-4 dormant buds from proven high-yield trees.',
      'Make clean matching sloping cuts (2.5cm) on rootstock and scion using a sterilized grafting knife.',
      'Align cambium green inner layers precisely and bind tightly with grafting tape.',
      'Seal cut tip with beeswax or grafting wax and shade nursery plant for 3 weeks until buds break.'
    ],
    toolsNeeded: ['Razor-Sharp Grafting Knife', 'Parafilm Grafting Tape', 'Beeswax/Sealer', 'Rubbing Alcohol'],
    inspiredCounsel: '"Thou art standest by faith. Be not highminded, but fear: For if God spared not the natural branches, take heed lest he also spare not thee." — Romans 11:20-21',
    commonMistakes: [
      'Failing to align the thin green cambium layers between scion and rootstock, preventing vascular union and killing the scion.',
      'Using unsterilized blades or allowing scion cuts to dry out in hot wind before binding tightly with grafting tape.'
    ],
    seasonalTag: 'Cold Dry Season',
    prerequisiteSkillIds: ['seed-saving-heirloom'],
    prerequisiteNote: 'Assumes prior nursery experience in seed germination, seedling care, and plant tissue sanitation.'
  },
  {
    id: 'solar-dambo-irrigation',
    title: 'Direct Solar Dambo & Shallow Well Surface Irrigation',
    category: 'Water & Energy',
    difficulty: 'Advanced',
    timeToMaster: '2 Weeks',
    iconName: 'waterconservation',
    summary: 'Installing direct-drive DC solar submersible pumps in shallow dambo wells for zero-cost drip and trench crop irrigation.',
    description: 'Pumping water manually with treadle pumps or buckets limits dry season crop acreage. DC solar pumps connect directly to PV panels to automatically deliver 5,000–10,000 liters of water daily during peak sunshine hours without fuel costs or expensive batteries.',
    steps: [
      'Dig or line a 4-8 meter shallow dambo well with perforated concrete rings or brick casing.',
      'Lower a 24V DC stainless steel helical screw pump into the water column above well floor silt.',
      'Connect pump wires to a Solar Pump Controller with water level sensors to prevent dry running.',
      'Wire controller to a dedicated 2x 350W solar panel array mounted near the dambo.',
      'Run 32mm HDPE main pipeline to elevated 2,000L header tank feeding gravity drip irrigation lines.'
    ],
    toolsNeeded: ['24V DC Solar Submersible Pump', 'Solar Pump Controller', '2x 350W Solar Panels', '32mm HDPE Pipe', 'Water Level Sensors'],
    inspiredCounsel: '"For I will pour water upon him that is thirsty, and floods upon the dry ground: I will pour my spirit upon thy seed, and my blessing upon thine offspring." — Isaiah 44:3',
    commonMistakes: [
      'Restricting pump intake directly on the muddy bottom of the well, sucking in sand and destroying pump impellers within weeks.',
      'Operating the pump without a dry-run sensor controller during October low water tables, causing motor burnout.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['solar-pv-lithium-bank', 'rainwater-swale-dambo-capture'],
    prerequisiteNote: 'Requires prior completion of Off-Grid Solar PV wiring and Contour Swale water catchment design.'
  }
];

export const HOMESTEAD_SKILLS: SkillItem[] = BASE_HOMESTEAD_SKILLS.map(skill => ({
  ...skill,
  subskills: SKILL_SUBSKILLS_DATA[skill.id] || [],
  detailedProtocol: SKILL_TECHNICAL_PROTOCOLS[skill.id]
}));

export interface MicroclimateZone {
  id: string;
  name: string;
  districts: string[];
  rainfallPattern: string;
  temperatureProfile: string;
  anomaliesAndAdvice: string;
  keyAdaptations: string[];
}

export const MICROCLIMATE_ZONES: MicroclimateZone[] = [
  {
    id: 'highland-frost',
    name: 'Highland Frost & High Altitude Zone',
    districts: ['Dedza', 'Ntcheu', 'Nyika Plateau', 'Viphya Highlands', 'Rumphi West'],
    rainfallPattern: '900 – 1,400 mm/year (Nov – Apr). Cool mists through May.',
    temperatureProfile: 'Cool temperate (10°C – 24°C). Winter nights drop to 2°C – 5°C with ground frost.',
    anomaliesAndAdvice: 'Severe July/August ground frost in Dedza/Ntcheu valleys kills unprotected tomatoes and peppers. Water seedling beds early in the morning so frost thaws before hot midday sunshine strikes.',
    keyAdaptations: ['Straw mulch covers for night frost protection', 'Windbreak bamboo planting', 'Cold-tolerant crops (Irish potatoes, garlic, cabbage, wheat)']
  },
  {
    id: 'lakeshore-alluvial',
    name: 'Lakeshore Alluvial Plain & Aquifer Zone',
    districts: ['Salima', 'Nkhotakota', 'Karonga', 'Mangochi', 'Nkhata Bay'],
    rainfallPattern: '1,000 – 1,600 mm/year (Dec – Apr). Intense lake breeze squalls.',
    temperatureProfile: 'Warm to tropical (22°C – 34°C). High humidity.',
    anomaliesAndAdvice: 'Frequent 10-14 day dry spells occur in January/February, followed by high flood risk in March. High shallow water table allows year-round residual moisture farming (mdimba).',
    keyAdaptations: ['Shallow solar borehole pumps (< 25m)', 'Elevated grain granaries on stone pillars', 'Dual cropping in receded dambo wetlands']
  },
  {
    id: 'southern-chiperoni',
    name: 'Southern Massifs & Chiperoni Rain Zone',
    districts: ['Mulanje', 'Thyolo', 'Zomba', 'Blantyre Rural', 'Phalombe'],
    rainfallPattern: '1,400 – 2,200 mm/year. Unimodal main rains + May–July "Chiperoni" drizzle.',
    temperatureProfile: 'Mild to humid warm (14°C – 28°C).',
    anomaliesAndAdvice: 'Moist southeasterly Chiperoni winds bring unexpected cold drizzles in June/July. While excellent for tree crops, high humidity increases late blight risk on tomatoes and potatoes.',
    keyAdaptations: ['Raised permaculture garden beds', 'Wood ash and organic copper sprays for blight control', 'Gravity-fed spring pipelines from Mulanje Massif']
  },
  {
    id: 'lower-shire-valley',
    name: 'Lower Shire Valley Semi-Arid Zone',
    districts: ['Chikwawa', 'Nsanje', 'Mwanza South'],
    rainfallPattern: '500 – 800 mm/year (Dec – March). Short, erratic rainy season.',
    temperatureProfile: 'Hot tropical (25°C – 42°C in Oct–Nov). Extreme heat stress.',
    anomaliesAndAdvice: 'Highest drought and cyclone flood risk in Malawi. Main rains start late (mid-December) and end early in March. Traditional maize frequently suffers total heat failure.',
    keyAdaptations: ['Drought-resistant crops (sorghum, pearl millet, pigeon peas, sesame)', 'Deep organic mulch layers to prevent soil baking', 'Shade cloth for vegetable nurseries']
  },
  {
    id: 'central-plateau',
    name: 'Central Agricultural Plateau',
    districts: ['Lilongwe Rural', 'Mchinji', 'Kasungu', 'Dowa', 'Ntchisi'],
    rainfallPattern: '800 – 1,100 mm/year (Nov – Apr). Classic unimodal tropical climate.',
    temperatureProfile: 'Moderate warm (15°C – 29°C).',
    anomaliesAndAdvice: 'Closely matches the national general seasonal calendar. Early November land preparation is critical to capture the initial heavy nitrogen flush ("chirimika rains").',
    keyAdaptations: ['Contour ridges (misozi) for topsoil retention', 'Bio-intensive composting', 'Hermetic PICS bag grain storage']
  }
];

export const SEASONAL_CALENDAR: SeasonalTask[] = [
  {
    id: 's1',
    season: 'Rainy Planting',
    months: 'November – March',
    focus: 'Main Crop Planting, Weed Management & Rain Capture',
    keyActivities: [
      'Plant staple maize, beans, groundnuts, and sweet potatoes with first rains',
      'Maintain contour ridges (misozi) to prevent topsoil erosion',
      'Harvest rainwater into 5,000L tanks and earth dams',
      'Apply organic compost tea and neem leaf tea for natural insect control'
    ],
    recommendedCrops: ['Maize', 'Beans (Chimbamba)', 'Groundnuts', 'Cassava', 'Pumpkins', 'Soybeans'],
    proTip: 'Never leave topsoil bare during heavy rain downpours. Intercrop maize with squash or beans to cover the ground.'
  },
  {
    id: 's2',
    season: 'Harvest & Storage',
    months: 'April – June',
    focus: 'Crop Harvesting, Grain Drying & Food Preservation',
    keyActivities: [
      'Harvest mature maize ears, beans, and groundnuts when stalks turn golden',
      'Sun-dry grains on elevated drying racks to below 12% moisture',
      'Pack dried grains into hermetic PICS bags or sealed metal drums with dried neem leaves',
      'Cure harvested Irish potatoes and sweet potatoes in dark, ventilated root cellars'
    ],
    recommendedCrops: ['Harvest Maize', 'Dry Legumes', 'Winter Vegetable Nursery', 'Irish Potatoes'],
    proTip: 'Insects cannot survive in hermetic bags where oxygen is depleted. Store grain dry and tightly sealed.'
  },
  {
    id: 's3',
    season: 'Cold Dry Season',
    months: 'July – August',
    focus: 'Highland Vegetable Gardening, Seed Saving & Winter Crops',
    keyActivities: [
      'Plant cold-tolerant vegetables (cabbage, carrots, peas, garlic, onions, spinach) in dambos or irrigated beds',
      'Collect and ferment heirloom seeds from mature spring crops',
      'Build compost piles using crop residues, manure, and forest leaf litter',
      'Protect delicate seedling beds from chilly highland night frost using straw grass covers'
    ],
    recommendedCrops: ['Irish Potatoes', 'Garlic', 'Onions', 'Cabbage', 'Peas', 'Strawberries', 'Carrots'],
    proTip: 'Highland areas like Dedza experience cool nights in July. Water beds in early morning, not evening.'
  },
  {
    id: 's4',
    season: 'Hot Dry Preparation',
    months: 'September – October',
    focus: 'Land Clearing, No-Till Bed Preparation & Tree Planting',
    keyActivities: [
      'Broadfork and mulch main planting beds before rains arrive',
      'Dig tree planting holes (80cm x 80cm x 80cm) for fruit trees and fill with compost/topsoil mixture',
      'Inspect and clean rooftop rain gutters and water filter barrels',
      'Prepare nursery seedbeds for early rain transplants'
    ],
    recommendedCrops: ['Fruit Tree Saplings (Avocado, Citrus, Mango)', 'Pigeon Peas', 'Mulch Layers'],
    proTip: 'Preparing planting beds in September allows you to sow seeds on the exact day the first heavy rain falls.'
  }
];
