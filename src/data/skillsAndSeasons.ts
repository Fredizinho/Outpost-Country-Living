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
  category: 'Farming' | 'Water & Energy' | 'Food & Preservation' | 'Construction' | 'Medical & Health' | 'Livestock & Health' | 'SDA Education & Sustenance';
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
    recommendations: ['Build solar seed dehydrators', 'Construct contour marker ridges (mitumbira ya mizere / mikwingwirima) for rain capture', 'Plant windbreaks of bamboo and acacias']
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
    { id: 'wc-3', title: 'Downhill Earth Berm (Mtumbira / Bund) Shaper', summary: 'Mounding excavated soil on downhill edge with Vetiver grass living root anchors.' },
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
  ],
  'sda-true-education-curriculum': [
    { id: 'ed-1', title: 'Balanced Morning Academic & Bible Block (08:00–11:30)', summary: 'Teaching Scripture, physiology, practical arithmetic, bookkeeping, and natural sciences from creation.' },
    { id: 'ed-2', title: 'Individual Student 5m × 5m Garden Plot Stewardship', summary: 'Assigning each child a personal raised bed plot to cultivate, harvest, and log yields.' },
    { id: 'ed-3', title: 'Afternoon Vocational Trade Rotation (13:30–16:30)', summary: 'Hands-on mastery in carpentry, earth masonry, grafting, sewing, and hygienic cookery.' },
    { id: 'ed-4', title: 'Homestead Bookkeeping & Debt-Free Accounting', summary: 'Double-entry ledger tracking seed inputs, harvest weights, tithe, and emergency reserves.' },
    { id: 'ed-5', title: 'Nature Object Lessons & Field Botany Walks', summary: 'Connecting agricultural parables (germination, pruning, soil aeration) to spiritual character growth.' }
  ],
  'wholesome-breadmaking-grain-milling': [
    { id: 'wb-1', title: 'Fresh Whole-Grain Milling (Wheat, Sorghum, Millet)', summary: 'Grinding whole berries on a cast-iron or stone burr mill immediately before dough mixing.' },
    { id: 'wb-2', title: 'Sweet Wild Yeast Starter & Potato Water Ferment', summary: 'Cultivating non-sour natural yeast without harmful baking soda or saleratus.' },
    { id: 'wb-3', title: 'Retained-Heat Clay Drum & Cob Oven Baking', summary: 'Firing a high-thermal-mass clay oven to 210°C for thorough, even crust baking.' },
    { id: 'wb-4', title: 'Twice-Baked Zwieback Rusk Dehydration', summary: 'Slicing whole-grain loaves into 12mm slices and slow-toasting at 120°C to convert starch to dextrin.' },
    { id: 'wb-5', title: 'Unleavened Whole-Grain Flatbreads & Rolls', summary: 'Aerating whole-meal dough with cold water, nut cream, and vigorous kneading for light rolls.' }
  ],
  'hydrotherapy-charcoal-poultice-remedies': [
    { id: 'hc-1', title: 'Contrast Hot & Cold Fomentation Protocol', summary: 'Three cycles of 3-min hot wool fomentations and 30-sec cold friction rubs to boost white blood cells.' },
    { id: 'hc-2', title: 'Derivative Hot Foot Bath (40°C–43°C)', summary: 'Drawing congestion away from the brain, lungs, and pelvic organs during fevers or headaches.' },
    { id: 'hc-3', title: 'Medical-Grade Hardwood Charcoal Pyrolysis', summary: 'Carbonizing clean eucalyptus or peach branches in sealed tins and grinding to 200-mesh powder.' },
    { id: 'hc-4', title: 'Activated Charcoal & Flax/Cassava Poultice', summary: 'Mixing 3 tbsp charcoal + 3 tbsp ground flax/cassava meal in boiling water to draw out venom and sepsis.' },
    { id: 'hc-5', title: 'Eucalyptus & Lemongrass Steam Inhalation', summary: 'Tent inhalation with fresh crushed Eucalyptus globulus leaves for bronchial relief.' }
  ],
  'plant-protein-nut-milks-oil-pressing': [
    { id: 'pp-1', title: 'Soybean & Groundnut Milk Extraction', summary: 'Soaking, wet-grinding, straining, and 20-minute simmering to deactivate trypsin inhibitors.' },
    { id: 'pp-2', title: 'Artisanal Tofu & Soy Curd Coagulation', summary: 'Coagulating hot soy milk with fresh lemon juice or magnesium chloride into firm protein blocks.' },
    { id: 'pp-3', title: '72-Hour Legume Sprouting & Phytic Acid Breakdown', summary: 'Germinating mung beans, lentils, and cowpeas to multiply vitamin C and slash cooking fuel by 50%.' },
    { id: 'pp-4', title: 'Manual Ram-Press Sunflower & Moringa Oil Extraction', summary: 'Cold-pressing sun-dried black oilseed sunflower and moringa seeds for pure cooking oil and livestock cake.' },
    { id: 'pp-5', title: 'Nut Butter & Sesame Tahini Stone Grinding', summary: 'Roasting and grinding groundnuts, macadamia, and sesame into high-calorie shelf-stable pastes.' }
  ],
  'wood-ash-soap-natural-fibers-tailoring': [
    { id: 'ws-1', title: 'Hardwood Ash Lye (KOH) Gravity Leaching Barrel', summary: 'Percolating rain water through white hardwood ash over straw to reach specific gravity egg-float density.' },
    { id: 'ws-2', title: 'Hot-Process Vegetable Oil Saponification', summary: 'Boiling leached wood-ash lye with sunflower, coconut, and moringa oil to trace.' },
    { id: 'ws-3', title: 'Antiseptic Neem, Aloe & Lemongrass Bar Curing', summary: 'Folding botanical extracts into soap trace and curing on slatted wooden racks for 4 weeks.' },
    { id: 'ws-4', title: 'Non-Electric Foot-Treadle Sewing Machine Servicing', summary: 'Leather belt tensioning, bobbin timing, and castor oil lubrication for off-grid tailoring.' },
    { id: 'ws-5', title: 'Healthful, Unconstricted Work Garment Drafting', summary: 'Drafting durable cotton/linen garments supported from the shoulders without chest or waist compression.' }
  ],
  'sabbath-sanctuary-fireless-thermal-cooking': [
    { id: 'sb-1', title: 'Insulated Rice-Hull / Hay-Box Thermal Cooker (Wonderbag)', summary: 'Sewing double-wall cotton cushions packed with dry rice hulls or wool to slow-cook for 8 hours without fire.' },
    { id: 'sb-2', title: 'Insulated Pumice & Clay Rocket Stove Construction', summary: 'Building an L-tube insulated combustion chamber that cuts firewood consumption by 75%.' },
    { id: 'sb-3', title: 'Friday Preparation Day Protocol & Sundown Readiness', summary: 'Completing all bread baking, bean simmering, bath water heating, and tool cleaning before Friday sunset.' },
    { id: 'sb-4', title: 'Solar Audio-Bible & Literature Outpost Station', summary: 'Charging solar Chichewa audio-Bibles and organizing health/gospel tracts for surrounding villages.' }
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
    summary: 'Build hot compost piles with brown dry leaves and green manure. The pile heats up to kill weeds and makes rich black soil in six to eight weeks.',
    description: 'Hot composting uses tiny helpful microbes to turn plant waste into rich garden soil. Layer dry brown stalks with fresh green manure and kitchen scraps. Keep the pile damp like a squeezed sponge. The heap heats up within three days to kill pest eggs and weed seeds.',
    steps: [
      'Choose a shaded spot at least five feet wide. Loosen the ground with a garden fork.',
      'Lay a base of dry twigs and maize cobs for airflow.',
      'Add a six-inch brown layer of dry grass and chopped straw.',
      'Add a four-inch green layer of fresh animal manure and kitchen scraps.',
      'Dust lightly with wood ash and charcoal. Sprinkle water until damp.',
      'Repeat brown and green layers up to five feet high.',
      'Push a dry stick into the center to check the heat each day.',
      'Turn the pile inside out on Day 4, Day 10, and Day 17 to give microbes fresh air.',
      'Let the compost rest for four weeks until it smells sweet like forest soil.'
    ],
    toolsNeeded: ['Pitchfork / Digging Fork', 'Watering Can / Bucket', 'Hoe (Khasu)', 'Compost Thermometer / Dry Stick', 'Organic Mulch / Tarp'],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find unexpected treasures. The earth must be given back that which is taken from it." — Education, p. 211',
    commonMistakes: [
      'Piles smaller than three feet across lose heat too fast and stay cold.',
      'Too much water makes the pile soggy and smelly.',
      'Too much wood ash turns the compost bitter and drives away nitrogen.'
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
    summary: 'Learn essential emergency care for country homes. Treat broken bones, snakebites, burns, and swallowed poisons with simple natural supplies.',
    description: 'Outpost homes often sit far away from hospitals and clinics. Knowing fast first aid saves lives. Learn how to splint broken bones with bamboo and wrap snakebites safely. Cool burns with water and raw honey. Use food-grade charcoal for accidental poisons.',
    steps: [
      'Broken Bones: Keep the injured limb still. Tie straight wooden or bamboo sticks on both sides with soft cloth. Never force bones back into place.',
      'Snakebite Care: Keep the person calm and resting flat. Wrap a wide cloth bandage firmly from fingers or toes up toward the body. Splint the limb still. Never cut the skin or use tight tourniquets.',
      'Spitting Cobra Venom: Rinse the eyes right away with clean boiled water or fresh milk for fifteen minutes.',
      'Burns: Pour cool clean water over burns for fifteen minutes. Spread raw unheated honey over the skin to prevent infection. Cover loosely with clean cloth.',
      'Swallowed Poison: Stir three spoonfuls of fine wood charcoal into drinking water right away. Charcoal catches poisons in the stomach before they enter blood.',
      'Shock and Weakness: Lay the person down and raise their feet one foot high. Keep them warm with blankets and give sips of clean water with a pinch of salt and sugar.'
    ],
    toolsNeeded: ['Rigid Wooden / Bamboo Splints', 'Elastic Crepe & Gauze Bandages', 'Food-Grade Activated Charcoal Powder', 'Sterile Saline / Clean Boiled Water', 'Raw Honey & Fresh Aloe Vera', 'Medical Scissors & Tweezers'],
    inspiredCounsel: '"Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature\'s remedial agencies and how to apply them." — E.G. White, The Ministry of Healing, p. 127',
    commonMistakes: [
      'Using tight rubber bands or ropes for snakebites, which cuts off blood and kills healthy muscle.',
      'Putting butter, flour, or ice on fresh burns, which traps heat and causes infection.',
      'Giving charcoal powder to an unconscious person who cannot swallow safely.'
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
    summary: 'Plant long-lived fruit trees in deep, rich planting pits. Feed the roots with compost, biochar, and mulch to survive dry winter months.',
    description: 'Grow healthy fruit trees that bear sweet fruit for decades. Dig large three-foot planting holes. Fill the bottom with compost, crushed charcoal, and rocks to catch water. Mulch the surface heavily so roots stay cool through hot dry months.',
    steps: [
      'Dig a planting pit three feet wide and three feet deep during the dry season.',
      'Keep the dark topsoil in one pile and subsoil in another pile.',
      'Place stones and crushed charcoal in the bottom for drainage and moisture sponge.',
      'Mix the topsoil with cured compost and a cup of wood ash.',
      'Place the young fruit sapling upright so the stem base sits level with the ground.',
      'Fill around the roots with the rich soil mix and press gently with your hands.',
      'Water thoroughly with two buckets of clean water to settle the soil.',
      'Build a low earth ring around the tree to catch seasonal rainwater.',
      'Cover the ground with four inches of dry grass mulch, keeping mulch two inches away from the tree bark.'
    ],
    toolsNeeded: ['Shovel & Digging Hoe (Khasu)', 'Razor Sharp Grafting Knife & Parafilm', 'Secateurs / Pruning Shears', 'River Stones / Gravel for Drainage Layer', 'Aged Compost, Biochar & Bone Meal', 'Tree Support Stakes & Mulch'],
    inspiredCounsel: '"While we were in Australia, we adopted the plan of digging deep trenches and filling them in with dressing that would provide nourishment for the roots... This was done with tomatoes, oranges, lemons, peaches, and grapes." — Ellen G. White, Letter 350, 1907 (Ellen G. White Estate)',
    commonMistakes: [
      'Digging small shallow holes that force tree roots into hard subsoil.',
      'Piling wet mulch directly against the tree trunk, which invites termites and rot.',
      'Planting trees below the original ground level, causing the stem collar to rot.'
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
    summary: 'Breed earthworms in shaded wooden boxes. Worms turn kitchen peels and manure into the richest natural plant food for your garden.',
    description: 'Earthworms are tireless garden helpers. Keep them in cool wooden or clay boxes fed with vegetable peels and dry grass. Worm droppings make gentle, weed-free plant food that helps seedlings grow strong roots.',
    steps: [
      'Build a shaded wooden box or use clay pots with small drainage holes in the bottom.',
      'Line the bottom with damp shredded cardboard, dry leaves, and aged manure.',
      'Add earthworms gently onto the damp bedding.',
      'Bury kitchen vegetable peels and fruit rinds two inches deep under the leaves.',
      'Sprinkle a handful of crushed eggshells once a month to keep the bedding sweet.',
      'Keep the bedding damp like a squeezed cloth. Protect the box from hot sun and ants.',
      'Collect worm droppings from the bottom after two months to feed your garden beds.',
      'Make worm tea: soak two cups of worm castings in a bucket of water for one day. Water your vegetable leaves with this liquid.'
    ],
    toolsNeeded: ['Tiered Wooden/Plastic Worm Bins', 'Shredded Cardboard & Leaf Mulch', 'Crushed Eggshells', 'Compost Worm Starter Colony', 'Burlap Sacks', 'Fine Mesh Sieve'],
    inspiredCounsel: '"Go to the ant, thou sluggard; consider her ways, and be wise... In nature God has given us humble teachers to instruct us in His laws of diligence and order." — Proverbs 6:6 / Education, p. 117',
    commonMistakes: [
      'Letting worm bins dry out in the hot afternoon sun.',
      'Feeding onions, hot peppers, oily foods, or meat scraps that attract flies and sour the box.',
      'Flooding the bin with too much water so worms drown in the bottom tray.'
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
    summary: 'Catch every drop of rain using contour swales, deep mulch, and vetiver grass. Store water deep in the ground to keep crops green all year.',
    description: 'In dry regions, heavy seasonal rain often washes away rich topsoil. Dig level ditch swales across hill slopes to slow down running water. The water sinks deep into underground sponges. Downhill crops and fruit trees stay green through dry winter months.',
    steps: [
      'Use an A-frame level to mark exact level lines across your sloping ground.',
      'Dig a flat-bottomed trench two feet wide and one foot deep along the line.',
      'Pile the excavated earth into a rounded mound on the downhill side of the ditch.',
      'Plant thick vetiver grass along the downhill mound to hold the soil tightly.',
      'Fill the ditch with coarse wood chips and dry maize stalks to prevent mosquito pools.',
      'Cut a level stone overflow sill at each end to safely guide flood water away.',
      'Plant fruit trees and bananas along the downhill side of the swale mound.'
    ],
    toolsNeeded: ['Wooden A-Frame Level & Plumb Line', 'Marking Stakes & Twine', 'Digging Hoe (Khasu) & Spade', 'Vetiver Grass Slips', 'River Stones for Spillways'],
    inspiredCounsel: '"He turneth the wilderness into a standing water, and dry ground into watersprings. And there he maketh the hungry to dwell, that they may prepare a city for habitation." — Psalm 107:35-36',
    commonMistakes: [
      'Digging swales on a slope instead of a true level contour, which causes water to pool and break the mound.',
      'Leaving open stagnant water that breeds mosquitoes instead of filling ditches with mulch.',
      'Building steep bare dirt mounds without planting grass roots to anchor the soil.'
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
    summary: 'Grow hardy grains and legumes that thrive through dry spells. Plant cassava, sorghum, pigeon peas, and cowpeas for dependable food security.',
    description: 'Dry spells often threaten shallow-rooted hybrid crops. Protect your family by growing drought-hardy traditional crops. Cassava, sorghum, pearl millet, cowpeas, and pigeon peas reach deep moisture in the soil. They yield nutritious food even in low-rainfall years.',
    steps: [
      'Select open-pollinated seeds of sorghum, pearl millet, pigeon peas, and cowpeas.',
      'Take healthy, mature cassava stems and cut them into nine-inch planting stakes.',
      'Plant seeds right after the first soaking rain in November.',
      'Intercrop tall sorghum with pigeon peas so the legumes fix nitrogen in the ground.',
      'Cover bare soil between crop rows with dry grass mulch to stop moisture evaporation.',
      'Weed beds twice while plants are small so weeds do not steal soil water.',
      'Harvest sorghum grains when heads dry golden brown. Store dry seeds in airtight bags.'
    ],
    toolsNeeded: ['Pointed Planting Stick (Dibbler)', 'Hoe (Khasu)', 'Soaking Basins for Seed Priming', 'Organic Mulch / Crop Residues', 'Heirloom Drought-Tolerant Seeds'],
    inspiredCounsel: '"He that observeth the wind shall not sow; and he that regardeth the clouds shall not reap... In the morning sow thy seed, and in the evening withhold not thine hand." — Ecclesiastes 11:4, 6',
    commonMistakes: [
      'Relying solely on thirsty hybrid maize that wilts during two-week dry spells.',
      'Planting upside down cassava cuttings that sprout poorly.',
      'Leaving bare soil exposed to baking sun without mulch covers.'
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
    summary: 'Grow simple healing herbs around your homestead. Cultivate fever grass, garlic, ginger, rosemary, and comfrey for daily family health.',
    description: 'God gave healing herbs to comfort and restore the sick. Plant a fragrant apothecary garden near your kitchen door. Grow lemongrass for fevers, ginger for digestion, garlic for infections, and comfrey for sprains. Harvest leaves on dry sunny mornings.',
    steps: [
      'Prepare a sunny raised garden bed with plenty of finished compost.',
      'Plant root divisions of lemongrass and mint six inches apart in damp soil.',
      'Bury plump ginger and turmeric root rhizomes two inches deep under rich leaf mulch.',
      'Plant garlic cloves with the pointed end facing upward in loose, sandy soil.',
      'Prune comfrey leaves every month to make mineral-rich mulch for vegetables.',
      'Pick fresh herb leaves in the morning after dew dries for strongest fragrance.',
      'Hang herbs in loose bundles inside a warm, shaded, well-ventilated room to dry.',
      'Store dried herb leaves in clean, dry glass jars away from direct sunlight.'
    ],
    toolsNeeded: ['Pruning Shears / Sharp Scissors', 'Well-Drained Raised Garden Beds', 'Coarse River Sand & Compost', 'Drying Racks / Hanging Twine', 'Airtight Glass Storage Jars'],
    inspiredCounsel: '"And by the river upon the bank thereof, on this side and on that side, shall grow all trees for meat, whose leaf shall not fade... and the fruit thereof shall be for meat, and the leaf thereof for medicine." — Ezekiel 47:12',
    commonMistakes: [
      'Drying herbs in bright direct sunshine, which bleaches colors and destroys healing oils.',
      'Storing herbs before they are fully dry, causing mold inside jars.',
      'Planting invasive mint in open garden beds where it crowds out vegetables.'
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
    summary: 'Preserve your seasonal harvest without chemicals. Use solar drying, sealed airtight bags, and clay cold pots to store food all year.',
    description: 'Abundant harvests in April can easily spoil if stored poorly. Learn simple, reliable ways to keep food fresh for months. Dry fruit and vegetables in clean solar boxes. Store dry grain in airtight bags where insects cannot breathe. Keep greens cool in clay pots.',
    steps: [
      'Solar Fruit Drying: Slice ripe mangoes and sweet potatoes into thin strips. Place on clean mesh screens inside a solar dryer for two sunny days.',
      'Grain Storage: Check that maize and beans are completely dry. Drop kernels on a flat rock: dry grain cracks with a sharp click.',
      'Airtight Bag Packing: Pour clean dry grain into triple-layer plastic bags. Tie each layer tightly with twine so no air enters.',
      'Vegetable Salt Curing: Shred cabbage and toss with two percent salt. Pack tightly into clean earthenware crocks until juice covers the shreds.',
      'Root Cellar Storage: Store whole sweet potatoes and pumpkins on wooden slatted shelves in a cool, dark room.'
    ],
    toolsNeeded: ['Indirect Solar Cabinet Dehydrator', 'Triple-Layer PICS Hermetic Bags', 'Airtight Fermentation Jars with Air-locks', 'Coarse Non-Iodized Salt', 'Nested Terracotta Zeer Pots'],
    inspiredCounsel: '"He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame." — Proverbs 10:5',
    commonMistakes: [
      'Packing grain before it is fully dry, which causes mold and grain heating.',
      'Puncturing the plastic inner liners of airtight storage bags with sharp sticks.',
      'Placing stored grain directly on cold concrete floors where dampness rises.'
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
    summary: 'Operate and maintain essential off-grid tools. Keep solar pumps, diesel walking tractors, and hand tools running smoothly without power lines.',
    description: 'Country living relies on durable, reliable equipment. Master simple maintenance for solar water pumps, two-wheel garden tractors, and metal hand tools. Regular cleaning, oil changes, and blade sharpening keep your homestead working smoothly.',
    steps: [
      'Solar Pump Care: Inspect the water intake screen every month. Clear away river silt and weeds so the motor pumps freely.',
      'Electrical Connections: Check that all battery terminals and solar wire connections stay tight and clean without white corrosion.',
      'Walking Tractor Maintenance: Check engine oil levels before every work day. Change engine oil every fifty operating hours.',
      'Air Cleaner Service: Clean the air filter sponge with kerosene and dry thoroughly. Add a few drops of clean oil.',
      'Hand Tool Care: Sharpen hoes, axes, and machetes with a flat mill file at a thirty-degree angle. Rub oiled rags on metal blades after work.'
    ],
    toolsNeeded: ['Digital True-RMS Multimeter', 'Insulated Electrical Hand Tools & Wire Crimpers', 'Socket & Wrench Set (Metric 8mm–24mm)', 'Bastard Mill Files & Wet Sharpening Stones', 'Grease Gun & Lubricants'],
    inspiredCounsel: '"If the iron be blunt, and he do not whet the edge, then must he put to more strength: but wisdom is profitable to direct." — Ecclesiastes 10:10',
    commonMistakes: [
      'Letting water pumps run dry when well levels drop, which burns out pump seals.',
      'Running small diesel engines with dirty oil or clogged fuel filters.',
      'Leaving iron hoes and axes outside in the rain to rust.'
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
    summary: 'Manage beneficial bees and deter crop pests naturally. Use top-bar beehives, companion planting, and natural plant sprays.',
    description: 'Healthy farms welcome beneficial insects while managing pests gently. Build top-bar beehives to pollinate fruit trees and harvest pure honey. Make organic sprays from neem leaves and garlic to control aphids and caterpillars without chemical poisons.',
    steps: [
      'Top-Bar Beekeeping: Build simple wooden hives with thirty-two millimeter wide top bars. Hang hives six feet high in shady trees.',
      'Baiting Hives: Rub melted beeswax and lemongrass oil inside clean hives to attract wild bee swarms in September.',
      'Ant Barriers: Wrap grease bands or engine oil rags around hanging hive wires so ants cannot reach the bees.',
      'Neem Pest Spray: Pound fresh neem leaves and soak overnight in a bucket of water. Strain liquid and spray on crops to repel chewing caterpillars.',
      'Companion Planting: Grow fragrant marigolds and basil alongside tomatoes to keep away pest flies and soil worms.'
    ],
    toolsNeeded: ['Kenyan Top-Bar Beehive', 'Bee Veil, Gloves & Smoker', 'Lemongrass Essential Oil / Bait Wax', 'Pounding Mortar & Cloth Strainer', 'Knapsack Sprayer'],
    inspiredCounsel: '"My son, eat thou honey, because it is good; and the honeycomb, which is sweet to thy taste: So shall the knowledge of wisdom be unto thy soul." — Proverbs 24:13-14',
    commonMistakes: [
      'Using synthetic pesticide sprays near flowering trees, which kills honeybees and beneficial predators.',
      'Using hot, harsh smoke when opening beehives, which burns and irritates bees.',
      'Harvesting brood combs containing baby bees instead of only capped honeycombs.'
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
    summary: 'Diagnose and control plant diseases using clean seed, weekly checks, crop rotation, and organic sprays.',
    description: 'Plant diseases can quickly ruin your potatoes, tomatoes, and cassava. Check your plants every week. Remove sick plants early and rotate crops.',
    steps: [
      'Weekly Plant Checks: Inspect leaves for dark spots or yellow patterns. Look on the underside of leaves for white mold.',
      'Bacterial Wilt Water Test: Cut a short stem from a wilting tomato plant. Place it in a clear glass of water for two minutes: cloudy white threads flowing down mean bacterial wilt.',
      'Organic Bordeaux Spray: Mix equal small parts of copper sulfate and hydrated lime in clean water. Spray tomato leaves in damp weather to prevent blight.',
      'Milk Spray for Mildew: Mix one cup of fresh milk with nine cups of clean water. Spray on pumpkin and squash leaves in bright sun to stop white powdery mildew.',
      'Remove Sick Plants: Pull up plants with virus symptoms or bacterial wilt. Burn or bury them deeply far away from garden beds.',
      'Crop Rotation: Never plant tomatoes or potatoes in the same bed two years in a row. Follow them with beans, peas, or cabbage.'
    ],
    toolsNeeded: ['Hand Lens / Magnifying Glass', 'Copper Sulfate & Hydrated Lime (Bordeaux Mix)', 'Knapsack Sprayer with Brass Nozzle', 'Pruning Shears & Rubbing Alcohol (70%)', 'Baking Soda & Fresh Milk'],
    inspiredCounsel: '"Cleanse out the old leaven that you may be a new lump... In physical as in spiritual life, cleanliness and vigilance are the price of preservation." — 1 Corinthians 5:7 / Ministry of Healing',
    commonMistakes: [
      'Throwing diseased potato and tomato vines into compost heaps where disease spreads to other beds.',
      'Spraying plants in the hot midday sun, which scorches leaves.',
      'Watering garden leaves late in the evening so leaves stay wet all night.'
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
    summary: 'Understand your soil horizons, texture, and living earth. Use jar tests, lime, and compost to build fertile living ground.',
    description: 'Healthy soil is alive with millions of helpful creatures. Learn to read your soil by sight and feel. Check if your ground is sand, silt, or rich clay. Add compost, crushed charcoal, and agricultural lime so plants receive steady nutrition.',
    steps: [
      'Jar Texture Test: Fill a clear glass jar one-third with soil. Add water, shake hard for one minute, and set on a flat table. Sand settles in one minute, silt in two hours, and clay in two days.',
      'Hand Ribbon Test: Moisten a handful of soil and knead into a ball. Squeeze it out between your thumb and forefinger to make a flat ribbon. Long smooth ribbons mean heavy clay.',
      'Soil Acidity Check: Test soil with simple pH paper or test kits. If soil tests too acidic, scatter two handfuls of agricultural limestone per square yard.',
      'Wood Ash Feeding: Sprinkle small amounts of sifted wood ash across garden beds to give potassium, but never use large piles.',
      'Compost and Charcoal: Work three inches of finished compost and biochar into the top four inches of soil to feed living earthworms.'
    ],
    toolsNeeded: ['Straight-Sided Glass Sedimentation Jars', 'Soil pH Test Strips / Digital Soil Probe', 'Agricultural Dolomitic Lime', 'Sieved Hardwood Ash', 'Measuring Ruler & Notebook'],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find that unexpected treasures open before him... Nature is an open lesson book; the soil, the seed, the tree, the blossom, the fruit, all have their lessons for us." — E.G. White, The Ministry of Healing, p. 241',
    commonMistakes: [
      'Tilling wet clay soil, which packs it into hard concrete-like lumps.',
      'Adding large buckets of wood ash in one spot, which locks up plant minerals.',
      'Leaving fertile soil bare and unmulched in hot sun and driving rain.'
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
    iconName: 'broadfork',
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
    iconName: 'seedvault',
    summary: 'Save your own vegetable and grain seeds each harvest. Select strong plants, dry seeds fully, and store in cool airtight glass jars.',
    description: 'Saving seeds gives your homestead true independence. Keep seeds only from healthy, productive parent plants. Clean seeds carefully and dry them in the shade. Store seeds in airtight glass jars with dry wood ash so they sprout vigorously next spring.',
    steps: [
      'Select Seeds: Tag the strongest, healthiest plants in your garden before harvest.',
      'Harvest Ripe Seeds: Let seed pods dry brown on the plant before picking.',
      'Dry in the Shade: Spread cleaned seeds on cloth screens in a warm, breezy room for one week.',
      'Test Dryness: Press large seeds with a thumbnail. They should feel rock hard without leaving an indent.',
      'Airtight Storage: Pour dry seeds into clean glass jars with a spoonful of fine wood ash or silica pack.',
      'Seal and Label: Screw jar lids tight. Write the plant name, variety, and harvest date on a paper label.',
      'Store Cool: Keep seed jars in a dark, cool cupboard or underground storage box.'
    ],
    toolsNeeded: ['Fine Mesh Strainers', 'Glass Jars', 'Silica Gel Desiccants', 'Parchment Paper'],
    inspiredCounsel: '"While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not cease." — Genesis 8:22',
    commonMistakes: [
      'Saving seeds from commercial hybrid plants, which grow unevenly and produce poor yields.',
      'Putting seeds into jars before they are fully dry, causing mold to kill the seed germ.',
      'Storing seeds in hot tin sheds where heat weakens germination rates.'
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
    summary: 'Purify drinking water using gravity, sand, and gravel. Build a bio-sand filter that removes dirt and germs without electricity.',
    description: 'Clean drinking water is vital for family health. Build a slow bio-sand filter in a clean drum. Water trickles down through layers of fine sand and gravel. Helpful microbes on top destroy harmful germs, giving clear safe water every day.',
    steps: [
      'Wash a clean food-grade plastic or concrete barrel thoroughly.',
      'Place a perforated plastic pipe at the bottom connected to an outside outlet tap.',
      'Add two inches of clean coarse gravel over the bottom pipe.',
      'Add two inches of clean coarse sand over the gravel layer.',
      'Pour in twenty inches of fine washed silica sand, keeping the surface flat and level.',
      'Place a perforated diffuser plate or plastic lid two inches above the sand to shield the bed.',
      'Pour raw water gently into the top every day. Keep two inches of standing water over the sand bed.',
      'Let the top biological layer mature for two weeks before using filtered water for drinking.'
    ],
    toolsNeeded: ['Food-Grade Drum/Concrete Shell', 'Graded Sand & Gravel', 'Diffuser Plate', 'PVC Outlet Pipe'],
    inspiredCounsel: '"In health and in sickness, pure water is one of Heaven\'s choicest blessings. Its proper use promotes health." — E.G. White, The Ministry of Healing, p. 237',
    commonMistakes: [
      'Disturbing or scraping the top sand layer where helpful microbes live.',
      'Letting the filter dry out completely, which kills the living filter layer.',
      'Pouring water directly onto bare sand without a diffuser plate.'
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
    summary: 'Dry fruits, vegetables, and greens using warm sunshine and air. Preserve sweet mangoes, bananas, and tomatoes for the dry season.',
    description: 'Harness the heat of the sun to preserve surplus garden harvests. Build a simple solar dryer with black metal, glass, and wood. Warm air rises through slatted trays, drying sliced food gently in two sunny days without flies or dust.',
    steps: [
      'Build a wooden box with a black painted bottom and a clear glass or plastic lid.',
      'Cut air intake vents at the bottom front and exhaust vents at the top back.',
      'Wash and slice fruits or vegetables into uniform quarter-inch slices.',
      'Spread food slices in a single layer on stainless or nylon mesh drying trays.',
      'Place the dryer in full sunshine facing the midday sun.',
      'Check the internal air temperature: keep it between forty-five and sixty degrees Celsius.',
      'Remove dried fruit when it feels leathery and bends without sticky wetness.',
      'Pack dried food into airtight jars or clean bags and store in a dark pantry.'
    ],
    toolsNeeded: ['Glazed Glass/Polycarbonate', 'Black Metal Sheet', 'Stainless Mesh Trays', 'Wood/Plywood Frame'],
    inspiredCounsel: '"Gather up the fragments that remain, that nothing be lost." — John 6:12',
    commonMistakes: [
      'Slicing food in uneven thick chunks that dry too slowly and turn sour.',
      'Blocking ventilation vents, which traps humid air and cooks food instead of drying it.',
      'Leaving dried food outside overnight where cool evening mist softens it.'
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
    summary: 'Set up an off-grid solar power system. Power your water pump, lights, and refrigerator using rooftop solar panels and batteries.',
    description: 'Solar electricity brings clean lighting and power to rural outposts. Connect solar panels on your roof to a battery charger and battery bank. An inverter turns battery power into normal wall current for lights, pumps, and grain mills.',
    steps: [
      'List Your Daily Power: Add up the watt-hours needed for LED lights, water pumps, and electronics.',
      'Mount Solar Panels: Bolt panels securely to your roof facing north at a fifteen-degree tilt.',
      'Wire the Charge Controller: Connect the solar charger to your battery bank first with a proper fuse.',
      'Connect the Solar Panels: Run heavy copper cables from rooftop panels down to the solar charge controller.',
      'Install the Inverter: Mount the inverter close to batteries using thick short cables.',
      'Add Circuit Breakers: Install DC safety breakers on battery wires and AC breakers on house wiring.',
      'Ground the System: Drive an eight-foot copper rod into damp soil and connect metal frames with ground wire.'
    ],
    toolsNeeded: ['Solar Panels (Mono PERC)', 'MPPT Charge Controller', 'LiFePO4 Lithium Battery', 'Pure Sine Wave Inverter', 'DC Circuit Breakers'],
    inspiredCounsel: '"Sunlight is one of the most benevolent remedies which God has given to man... Room after room should be flooded with light and heat." — E.G. White, Testimonies for the Church, Vol. 2, p. 527',
    commonMistakes: [
      'Connecting solar panels to the charger before connecting the battery bank.',
      'Using thin undersized wires that overheat and drop electrical voltage.',
      'Draining batteries completely flat, which ruins battery life.'
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
    iconName: 'earthblock',
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
    iconName: 'zeerpot',
    summary: 'Keep vegetables fresh without electricity using clay pots. Evaporating water in damp sand cools the inner pot by ten degrees.',
    description: 'A Zeer pot is a natural refrigerator made from two unglazed clay pots. Place a smaller clay pot inside a larger pot and fill the gap with sand. When you wet the sand, evaporating water draws away heat, keeping tomatoes, leafy greens, and fruit cool and crisp.',
    steps: [
      'Find two porous unglazed clay pots, with one pot three inches smaller than the other.',
      'Fill the bottom of the larger pot with three inches of clean river sand.',
      'Place the smaller clay pot inside on top of the sand base.',
      'Fill the ring gap between the two pots with clean sand up to the top rim.',
      'Pour clean water slowly onto the sand until it is completely soaked.',
      'Place fresh vegetables and fruits inside the dry inner clay pot.',
      'Cover the top with a damp cotton cloth or clean jute sack.',
      'Set the pot in a breezy, shaded hallway with good airflow.',
      'Pour water onto the sand twice a day: once in the morning and once in the evening.'
    ],
    toolsNeeded: ['2 Nested Unglazed Earthenware Clay Pots', 'Coarse River Sand', 'Clean Water', 'Jute/Burlap Sack or Towel'],
    inspiredCounsel: '"He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame." — Proverbs 10:5',
    commonMistakes: [
      'Using glazed or painted clay pots that block water evaporation.',
      'Placing the pot in direct hot sunshine or inside a closed room without moving air.',
      'Letting the sand dry out during hot windy afternoons.'
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
    iconName: 'poultry',
    summary: 'Raise healthy free-range chickens and small livestock. Build raised coops, feed natural grain rations, and use natural parasite care.',
    description: 'Chickens and small livestock provide valuable eggs, meat, and rich manure for your garden. House poultry in raised bamboo coops with good airflow to stay healthy. Feed them grain bran, sunflower seeds, and greens. Prevent parasites with wood ash dust baths.',
    steps: [
      'Build a raised poultry coop three feet above the ground with slatted bamboo floors for easy cleaning.',
      'Set up a dry dust bath box filled with clean wood ash and sand so birds clean off lice.',
      'Provide clean drinking water daily with two crushed cloves of fresh garlic to repel worms.',
      'Mix wholesome poultry feed using maize bran, crushed pigeon peas, sunflower seeds, and green leaves.',
      'Vaccinate young chicks against Newcastle disease at three weeks and three months.',
      'Lock coop doors securely every evening to protect birds from nocturnal predators.',
      'Collect poultry manure weekly and compost it thoroughly for one month before garden use.'
    ],
    toolsNeeded: ['Elevated Bamboo/Lumber Coop', 'Clay Drinking Troughs', 'Wood Ash & Fresh Garlic', 'Newcastle Disease Eye-Drop Vaccine'],
    inspiredCounsel: '"A righteous man regardeth the life of his beast: but the tender mercies of the wicked are cruel." — Proverbs 12:10',
    commonMistakes: [
      'Keeping chickens in dark, crowded, damp coops where respiratory disease spreads quickly.',
      'Putting fresh hot poultry manure directly on vegetable beds, which burns tender roots.',
      'Skipping Newcastle vaccination during the windy dry season.'
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
    iconName: 'saltcuring',
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
    iconName: 'swale',
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
    iconName: 'borehole',
    summary: 'Pump shallow wetland groundwater with solar power. Water dry-season vegetable beds and fruit trees without costly fuel.',
    description: 'Valley dambos hold abundant water close to the surface all year. Dig a shallow brick-lined well in the wetland edge. Submerge a small direct-drive solar pump powered by two solar panels. Pump cool clean water directly to garden beds and storage tanks.',
    steps: [
      'Dig a shallow well ten to twenty feet deep in the dry season on the wetland edge.',
      'Line the well with open brick rings or concrete rings to keep sand from caving in.',
      'Suspend a submersible solar pump three feet above the well bottom with safety rope.',
      'Mount two solar panels on a pole near the well facing north.',
      'Connect the solar panels directly to the pump controller with waterproof cables.',
      'Run thick plastic pipe from the pump uphill to an elevated header tank.',
      'Distribute water to vegetable garden beds through gravity-fed drip pipes or trenches.'
    ],
    toolsNeeded: ['24V DC Solar Submersible Pump', 'Solar Pump Controller', '2x 350W Solar Panels', '32mm HDPE Pipe', 'Water Level Sensors'],
    inspiredCounsel: '"For I will pour water upon him that is thirsty, and floods upon the dry ground: I will pour my spirit upon thy seed, and my blessing upon thine offspring." — Isaiah 44:3',
    commonMistakes: [
      'Resting the water pump directly on the muddy well floor where sand clogs pump gears.',
      'Using thin wires over long distances from solar panels, causing voltage drops.',
      'Pumping dirty silt water into drip lines without an intake filter screen.'
    ],
    seasonalTag: 'Hot Dry Preparation',
    prerequisiteSkillIds: ['solar-pv-lithium-bank', 'rainwater-swale-dambo-capture'],
    prerequisiteNote: 'Requires prior completion of Off-Grid Solar PV wiring and Contour Swale water catchment design.'
  },
  {
    id: 'sda-true-education-curriculum',
    title: 'SDA True Education & Manual Training Curriculum (Head, Hand & Heart)',
    category: 'SDA Education & Sustenance',
    difficulty: 'Intermediate',
    timeToMaster: '1 Season',
    iconName: 'trueeducation',
    summary: 'Train children with a balanced rhythm of Bible study, academic skills, manual trades, and garden care on the land.',
    description: 'True education develops the physical, mental, and spiritual powers together. Children learn Bible truths and practical academics in the morning. In the afternoon, they work with their hands in gardens, carpentry workshops, and sewing rooms.',
    steps: [
      'Morning Study (8:00–11:30): Teach Scripture, practical arithmetic, reading, physiology, and natural science.',
      'Student Garden Plots (11:30–12:30): Give each child a personal raised bed to plant, weed, and harvest vegetables.',
      'Noon Rest and Meal (12:30–13:30): Share a wholesome plant-based meal and rest in the shade.',
      'Vocational Trades (13:30–16:30): Teach practical trades including carpentry, earth brick building, sewing, and first aid.',
      'Family Worship and Nature Walks: Conclude the day with songs of praise, prayer, and lessons from nature.'
    ],
    toolsNeeded: ['Bible & Spirit of Prophecy Library', 'Student Garden Plot Tools (Small Fork, Hoe, Watering Can)', 'Double-Entry Farm Ledger & Measuring Tape', 'Carpentry Hand Tools (Saw, Chisel, Plane, Square)', 'Soil pH & Thermometer Kit'],
    inspiredCounsel: '"Manual training is worthy of far more attention than it has received... It trains the hands and makes the mind clear and strong." — Education, p. 218',
    commonMistakes: [
      'Keeping children sitting indoors over books all day without vigorous physical work in open air.',
      'Treating garden and workshop labor as drudgery or punishment instead of an honorable blessing.',
      'Teaching theory without allowing children to build real things with their hands.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteSkillIds: ['compost-making'],
    prerequisiteNote: 'Pairs directly with basic composting and garden bed preparation for student plots.'
  },
  {
    id: 'wholesome-breadmaking-grain-milling',
    title: 'Wholesome Breadmaking, Sourdough, Zwieback & Whole-Grain Milling',
    category: 'Food & Preservation',
    difficulty: 'Beginner',
    timeToMaster: '2 Weeks',
    iconName: 'breadmaking',
    summary: 'Mill whole grains and bake wholesome loaves. Make sweet non-sour bread and crisp double-baked zwieback in a simple cob oven.',
    description: 'Good bread is the true staff of life. Grind whole wheat, sorghum, or millet fresh before baking so nutrients are preserved. Ferment dough gently with sweet wild yeast without baking soda. Bake in a warm clay oven, and toast leftover bread into crisp, digestible zwieback.',
    steps: [
      'Mill Whole Grains: Grind whole wheat berries or sorghum fine on a stone or cast-iron mill.',
      'Mix Dough: Combine whole flour, warm water, sweet yeast starter, and a pinch of salt.',
      'Knead Dough: Knead vigorously on a clean table for fifteen minutes until smooth and elastic.',
      'Gentle Rise: Place dough in a warm bowl covered with a damp cloth for two hours until doubled.',
      'Shape Loaves: Form into small loaves and place in greased tins for a final thirty-minute rise.',
      'Bake in Clay Oven: Slide loaves into a hot wood-fired clay oven and bake until crusts ring hollow when tapped.',
      'Make Zwieback: Slice cool bread thin and toast in a slow warm oven until crisp and golden brown.'
    ],
    toolsNeeded: ['Manual Cast-Iron or Stone Burr Grain Mill', 'Glass Jar for Sweet Yeast Starter', 'Wood-Fired Clay Thermal Oven or Cast-Iron Dutch Oven', 'Bread Loaf Pans & Cooling Wire Racks', 'Airtight Glass or Tin Zwieback Containers'],
    inspiredCounsel: '"Bread should be light and sweet. Not the least taint of sourness should be tolerated." — Ministry of Healing, p. 301',
    commonMistakes: [
      'Using harmful chemical baking powders or saleratus that irritate delicate stomach linings.',
      'Eating fresh, hot, heavy bread straight from the oven before it cools.',
      'Letting dough over-ferment until it turns sour and acidic.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Foundational SDA culinary and off-grid sustenance skill. No prerequisites required.'
  },
  {
    id: 'hydrotherapy-charcoal-poultice-remedies',
    title: 'Medical Missionary Hydrotherapy, Fomentations & Charcoal Poultices',
    category: 'Medical & Health',
    difficulty: 'Intermediate',
    timeToMaster: '3 Weeks',
    iconName: 'hydrotherapy',
    summary: 'Apply hot and cold water treatments and charcoal poultices to relieve pain, draw inflammation, and stimulate circulation.',
    description: 'Simple natural remedies work with the body to restore health. Use hot foot baths to draw congestion away from the head and chest. Apply warm moist cloths followed by brief cold wipes to relieve soreness. Use charcoal poultices on wounds and insect bites.',
    steps: [
      'Hot Foot Bath: Place feet in warm water (40°C). Gradually add hot water up to 43°C. Keep a cool wet cloth on the forehead. After twenty minutes, pour cool water over the feet and dry thoroughly.',
      'Hot and Cold Fomentations: Apply a steaming moist cloth over sore joints or chest for three minutes. Follow with a brisk thirty-second wipe with a cold cloth. Repeat three times, always finishing with cold.',
      'Charcoal Poultice: Stir three spoonfuls of fine wood charcoal and ground flaxseed into warm water to make a thick paste.',
      'Wrap the Poultice: Spread paste on clean cloth, fold edges inward, and place over inflammation or insect bites.',
      'Rest and Warmth: Tuck the patient into bed with warm blankets and encourage plenty of clean drinking water.'
    ],
    toolsNeeded: ['Wool Flannel Fomentation Blankets & Cotton Towels', 'Deep Foot Bath Tub & Water Thermometer', 'Sealed Metal Pyrolysis Tin & Mortar/Pestle', 'Pulverized Hardwood Charcoal Powder (Eucalyptus/Peach)', 'Ground Flaxseed or Cassava Meal', 'Kettle & Double Boiler'],
    inspiredCounsel: '"There are many ways of applying water to relieve pain and check disease. All should become intelligent in its use in simple home treatments." — Ministry of Healing, p. 237',
    commonMistakes: [
      'Leaving a cold wet cloth on the skin without drying, which chills the patient.',
      'Using boiling water directly against skin without protecting towels underneath.',
      'Letting charcoal paste dry into a hard crust instead of keeping it moist under a wrap.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteSkillIds: ['offgrid-first-aid', 'herbs-cultivation-medicinal'],
    prerequisiteNote: 'Builds upon emergency first aid triage and medicinal herb garden preparation.'
  },
  {
    id: 'plant-protein-nut-milks-oil-pressing',
    title: 'Edenic Sustenance: Plant Milks, Tofu Curds, Sprouting & Cold Oil Pressing',
    category: 'Food & Preservation',
    difficulty: 'Beginner',
    timeToMaster: '2 Weeks',
    iconName: 'oilpress',
    summary: 'Make rich plant milks, tofu, and cold-pressed oils. Process soybeans, groundnuts, and sunflower seeds for wholesome family nutrition.',
    description: 'Wholesome plant foods provide abundant protein, healthy fats, and minerals without animal diseases. Make fresh soy and groundnut milk for children. Press golden oil from home-grown sunflower seeds, and sprout beans for fresh winter greens.',
    steps: [
      'Soy and Nut Milk: Soak dry soybeans or groundnuts in clean water for eight hours. Grind fine with water in a clean mortar. Boil gently for twenty minutes and strain through cloth.',
      'Fresh Tofu: While hot soy milk simmers at eighty degrees, stir in fresh lemon juice. Watch white curds form. Scoop curds into a cloth-lined wooden press box and weigh down with a stone for thirty minutes.',
      'Cold Oil Pressing: Sun-dry clean sunflower seeds until crisp. Feed seeds into a hand-lever press to squeeze out pure golden oil.',
      'Clarify Oil: Let raw oil sit in tall glass jars for two days until sediment settles at the bottom, then pour off clear oil.',
      'Sprouting Beans: Soak lentils or mung beans in water overnight. Rinse twice a day in a shaded jar until fresh green sprouts appear.'
    ],
    toolsNeeded: ['Muslin / Cheesecloth Straining Bags', 'Perforated Wooden Tofu Press Box', 'Wide-Mouth Glass Sprouting Jars with Mesh Lids', 'Manual Lever Oilseed Ram-Press', 'Heavy Cast-Iron Skillet & Burr Grinder'],
    inspiredCounsel: '"Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator." — Ministry of Healing, p. 296',
    commonMistakes: [
      'Under-cooking raw soybean milk, which leaves an earthy taste and causes stomach upset.',
      'Using rancid, moldy, or damp oilseeds for pressing oil.',
      'Eating rich nut preparations in excessive quantities at single meals.'
    ],
    seasonalTag: 'Harvest & Storage',
    prerequisiteSkillIds: ['drought-resistant-crops'],
    prerequisiteNote: 'Pairs with harvesting and drying homestead legumes, soybeans, and oilseeds.'
  },
  {
    id: 'wood-ash-soap-natural-fibers-tailoring',
    title: 'Domestic Self-Reliance: Wood-Ash Soap Making & Treadle Tailoring',
    category: 'SDA Education & Sustenance',
    difficulty: 'Intermediate',
    timeToMaster: '3 Weeks',
    iconName: 'soapmaking',
    summary: 'Make pure homestead soap from wood ash and pressed oils. Sew modest, durable work garments using a manual treadle sewing machine.',
    description: 'Learn valuable household crafts for complete country independence. Leach natural potassium lye from clean wood ash. Cook lye with sunflower oil and beeswax into gentle cleansing soap. Maintain a foot-treadle sewing machine to sew comfortable work clothes.',
    steps: [
      'Leach Ash Lye: Pack cold white hardwood ash into a wooden barrel over straw and pebbles. Pour soft rainwater slowly over the ash. Collect dark amber lye dripping from the bottom.',
      'Test Lye Strength: Float a clean raw egg in the lye. If a coin-sized patch of egg floats above liquid, the lye is strong enough.',
      'Simmer Soap: Pour two liters of lye and one and a half liters of warm sunflower oil into an iron pot. Simmer gently over an outdoor fire, stirring until thick.',
      'Mold and Cure: Pour thick soap into a cloth-lined wooden box. Let firm for two days, cut into bars with wire, and cure on open racks for four weeks.',
      'Treadle Sewing: Clean and oil your foot-treadle sewing machine weekly. Sew comfortable clothes that hang from the shoulders without tight waistbands.'
    ],
    toolsNeeded: ['Ash Leaching Barrel with Spigot & Straw Filter', 'Stainless Steel or Cast-Iron Soap Pot (No Aluminum)', 'Wooden Soap Molds & Wire Cutter', 'Cast-Iron Foot-Treadle Sewing Machine', 'Tailoring Shears, Measuring Tape & Heavy Cotton Fabric'],
    inspiredCounsel: '"Strict habits of cleanliness should be maintained. Many are susceptible to disease merely because of their uncleanly habits... Our clothing, while modest and simple, should be of good quality, of becoming colors, and suited for service. It should be chosen for durability rather than display; and it should provide warmth and proper protection, leaving the lungs and limbs free to act." — E.G. White, Counsels on Health, p. 101 & Education, p. 248 (CH 101.2 · Ed 248.2)',
    commonMistakes: [
      'Using aluminum pots for cooking soap, which lye dissolves and ruins.',
      'Using fresh un-cured soap that still bites the skin with unreacted lye.',
      'Sewing tight work garments that restrict deep breathing and easy movement.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Foundational domestic economy and sanitation trade skill. No prerequisites required.'
  },
  {
    id: 'sabbath-sanctuary-fireless-thermal-cooking',
    title: 'Sabbath Preparation, Fireless Thermal Cookers & Outpost Literature Ministry',
    category: 'SDA Education & Sustenance',
    difficulty: 'Beginner',
    timeToMaster: '1 Week',
    iconName: 'thermalcooker',
    summary: 'Prepare peacefully for the holy Sabbath. Cook Friday dishes in an insulated Wonderbag and keep your home quiet and restful.',
    description: 'The Sabbath is a joyful sanctuary in time. Complete all cooking, cleaning, and field work on Friday afternoon before sunset. Boil pots of beans and stew for fifteen minutes, then seal them inside an insulated cloth cooker to finish cooking without fire on Sabbath morning.',
    steps: [
      'Friday Morning Prep: Gather vegetables, grind meal, and wash family garments early.',
      'Start the Food: Bring pots of beans, soups, or porridge to a rolling boil on the stove for fifteen minutes.',
      'Insulated Box Cooking: Transfer the boiling pot with lid straight into an insulated Wonderbag or straw box. Close tightly so trapped heat cooks food for six hours.',
      'Friday Afternoon Rest: Tidy living rooms, polish work shoes, and take warm baths before the sun sets.',
      'Sunset Welcome: Gather family at sunset with singing, prayer, and scripture to welcome the sacred Sabbath hours.',
      'Sabbath Meal: Open the insulated cooker on Sabbath noon. The food is warm, tender, and delicious without building a fire.'
    ],
    toolsNeeded: ['Heavy Cotton Fabric & Dry Rice Hulls / Kapok Insulation', 'Tight-Fitting Lidded Stainless or Cast-Iron Stockpot', 'Clay-Sand Insulated Rocket Stove', 'Solar Audio-Bible & Health Literature Pouch'],
    inspiredCounsel: '"On Friday let the preparation for the Sabbath be completed... On the Sabbath let no fire be kindled to cook food." — Testimonies, Vol. 6, p. 355',
    commonMistakes: [
      'Leaving heavy cooking, washing, and chopping until Sabbath hours.',
      'Opening the insulated cooker repeatedly, which lets valuable cooking heat escape.',
      'Rushing into Sabbath sunset with frantic, unfinished household chores.'
    ],
    seasonalTag: 'Year-Round / Any Season',
    prerequisiteNote: 'Essential Seventh-day Adventist homestead rhythm and energy-conservation skill.'
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
