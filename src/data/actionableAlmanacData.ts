import { LucideIcon, Droplets, Sprout, Trees, Wheat, Home, CloudRain, Sun, Layers, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SeasonalTag } from './skillsAndSeasons';

export type TaskDomain = 'water' | 'soil' | 'fruit-trees' | 'crops' | 'infrastructure';
export type TaskPriority = 'urgent' | 'high' | 'upcoming';
export type ExodusStage = 'Land Prep' | 'Infrastructure' | 'Planting & Ecology' | 'Water Security' | 'Food Autonomy';

export interface ActionableTask {
  id: string;
  seasonKey: SeasonalTag;
  title: string;
  domain: TaskDomain;
  priority: TaskPriority;
  urgencyNotice?: string;
  daysRemainingEstimate?: number;
  exodusStage: ExodusStage;
  readinessPoints: number; // e.g. 5 points
  summary: string;
  
  // Cross-Module Hooks
  calculatorLink?: {
    tab: 'yield' | 'solar' | 'food' | 'land' | 'rainwater' | 'budget';
    label: string;
    tooltip: string;
    params?: Record<string, string>;
  };
  fieldGuideLink: {
    skillId: string;
    guideTitle: string;
    category?: string;
  };
  
  // Collapsible Step-by-Step Execution Drawer
  howToExecute: {
    overview: string;
    steps: string[];
    toolsNeeded: string[];
    malawiProTip: string;
    timingWindow: string;
    mistakesToAvoid: string[];
  };

  // Location / District-specific micro-climate notes
  districtVariations?: Record<string, string>;
}

export interface DistrictSeasonalTelemetry {
  district: string;
  zoneName: string;
  currentSoilReadiness: 'Prime for Trenching' | 'Moist & Seed Ready' | 'Active Growth Topsoil' | 'Dry Baked Hardpan' | 'Dambo Saturated';
  soilReadinessPct: number; // 0 - 100
  waterAvailabilityStatus: 'Peak Dambo Recharge' | 'Falling Water Table - Conserve' | 'High Surface Runoff' | 'Critically Low - Rely on Borehole';
  targetPlantingWindow: string;
  dailyWaterRequirementLitersM2: number;
  soilPrepFocus: string;
  frostRisk: 'None' | 'Low' | 'Moderate' | 'High (June-July)';
  urgentAlert?: string;
}

export const DISTRICT_TELEMETRY: Record<string, DistrictSeasonalTelemetry> = {
  'dedza': {
    district: 'Dedza',
    zoneName: 'Highland Frost & High Altitude Zone (1,400m - 1,800m)',
    currentSoilReadiness: 'Prime for Trenching',
    soilReadinessPct: 88,
    waterAvailabilityStatus: 'Falling Water Table - Conserve',
    targetPlantingWindow: 'Nov 15 – Dec 05 (Following 25mm soaking rain)',
    dailyWaterRequirementLitersM2: 5.2,
    soilPrepFocus: 'Deep Katondo Trenching & Vetiver Contour Bunds',
    frostRisk: 'High (June-July)',
    urgentAlert: 'Hot-Dry Phase: Finalize compost pit blending & clear contour swales before seasonal rains.'
  },
  'lilongwe': {
    district: 'Lilongwe Rural',
    zoneName: 'Central Agricultural Plateau (1,050m - 1,200m)',
    currentSoilReadiness: 'Prime for Trenching',
    soilReadinessPct: 92,
    waterAvailabilityStatus: 'Falling Water Table - Conserve',
    targetPlantingWindow: 'Nov 20 – Dec 10',
    dailyWaterRequirementLitersM2: 4.8,
    soilPrepFocus: 'Sasakawa Planting Basins & 10cm Biomass Mulch Blanket',
    frostRisk: 'Low',
    urgentAlert: 'Pre-Rain Window: Seal grain storage and service DC borehole pump.'
  },
  'zomba': {
    district: 'Zomba',
    zoneName: 'Southern Massifs & Chiperoni Rain Zone (900m - 1,600m)',
    currentSoilReadiness: 'Moist & Seed Ready',
    soilReadinessPct: 95,
    waterAvailabilityStatus: 'Peak Dambo Recharge',
    targetPlantingWindow: 'Nov 10 – Nov 30 (Early Chiperoni onset)',
    dailyWaterRequirementLitersM2: 3.9,
    soilPrepFocus: 'Gravity Hillside Terraces & Anti-Blight Bed Elevation',
    frostRisk: 'None',
    urgentAlert: 'Early rains expected: Clean roof gutters and connect first-flush diverters.'
  },
  'mulanje': {
    district: 'Mulanje',
    zoneName: 'Southern Massifs & Chiperoni Rain Zone (700m - 2,000m)',
    currentSoilReadiness: 'Moist & Seed Ready',
    soilReadinessPct: 96,
    waterAvailabilityStatus: 'Peak Dambo Recharge',
    targetPlantingWindow: 'Nov 05 – Nov 25',
    dailyWaterRequirementLitersM2: 3.5,
    soilPrepFocus: 'Perennial Orchard Pits & Gravity Pipeline Intakes',
    frostRisk: 'None',
    urgentAlert: 'High rainfall catchment active: Secure swale spillways with flat river rocks.'
  },
  'salima': {
    district: 'Salima',
    zoneName: 'Lakeshore Alluvial Plain & Aquifer Zone (480m - 600m)',
    currentSoilReadiness: 'Dry Baked Hardpan',
    soilReadinessPct: 74,
    waterAvailabilityStatus: 'Falling Water Table - Conserve',
    targetPlantingWindow: 'Dec 05 – Dec 25 (Later lake plain rains)',
    dailyWaterRequirementLitersM2: 6.5,
    soilPrepFocus: 'Zai Pits with Biochar Slurry & Drip Line Laydown',
    frostRisk: 'None',
    urgentAlert: 'High evaporation window: Apply 12cm thick straw mulch to retain residual subsoil moisture.'
  },
  'mzimba': {
    district: 'Mzimba',
    zoneName: 'Northern Highlands & Viphya Plateau (1,200m - 1,700m)',
    currentSoilReadiness: 'Prime for Trenching',
    soilReadinessPct: 89,
    waterAvailabilityStatus: 'Falling Water Table - Conserve',
    targetPlantingWindow: 'Nov 25 – Dec 15',
    dailyWaterRequirementLitersM2: 4.6,
    soilPrepFocus: 'Broadfork Agroforestry Pits & Contour Grass Strips',
    frostRisk: 'Moderate',
    urgentAlert: 'Timber & shelterbelt maintenance: Plant bamboo windbreaks along eastern boundary.'
  },
  'rumphi': {
    district: 'Rumphi',
    zoneName: 'Northern Escarpment & Nyika Foothills (1,100m - 1,800m)',
    currentSoilReadiness: 'Prime for Trenching',
    soilReadinessPct: 85,
    waterAvailabilityStatus: 'Falling Water Table - Conserve',
    targetPlantingWindow: 'Nov 20 – Dec 10',
    dailyWaterRequirementLitersM2: 5.0,
    soilPrepFocus: 'Hillside Stone Terraces & Mountain Spring Line Servicing',
    frostRisk: 'Moderate',
    urgentAlert: 'Spring line inspection: Desilt catchment box before first highland rains.'
  }
};

export const ACTIONABLE_ALMANAC_TASKS: ActionableTask[] = [
  // --------------------------------------------------------------------------
  // HOT DRY PREPARATION (Sep – Oct) - Current Phase
  // --------------------------------------------------------------------------
  {
    id: 'task-gutters-rainwater',
    seasonKey: 'Hot Dry Preparation',
    title: 'Inspect Roof Gutters, Downpipes & 5,000L First-Flush Diverters',
    domain: 'water',
    priority: 'urgent',
    urgencyNotice: 'Seasonal Window Target: Clear dry debris and service all roof channels before early storms.',
    daysRemainingEstimate: 14,
    exodusStage: 'Water Security',
    readinessPoints: 8,
    summary: 'Clear dry season leaf litter, repair zinc flashing, and install 100mm PVC first-flush sediment diverters to protect storage tanks from initial dirty runoff.',
    calculatorLink: {
      tab: 'rainwater',
      label: 'Calculate Rainwater Harvest Yield',
      tooltip: 'Calculate seasonal tank filling capacity based on your roof area in m² and district rainfall.'
    },
    fieldGuideLink: {
      skillId: 'rainwater-swale-dambo-capture',
      guideTitle: 'Rainwater Harvesting & Swale Storage',
      category: 'Water & Energy'
    },
    howToExecute: {
      overview: 'The initial 15 minutes of the first monsoon rain contains soot, dust, and bird droppings. A calibrated first-flush chamber diverts this contaminated water before clean rainwater flows into your food-grade storage tanks.',
      steps: [
        'Inspect all galvanized iron / PVC roof gutters for slope (minimum 1:100 drop toward downpipe).',
        'Clear dry branches, dust, and birds nests from gutters and scrub with stiff wire brush.',
        'Install a vertical 110mm PVC pipe (1.5m length) with a floating ball valve at the bottom of each downpipe.',
        'Install stainless steel 1mm leaf mesh screens over every tank inlet.',
        'Check tank overflow discharge pipe to ensure it directs water 5 meters away from building foundations.'
      ],
      toolsNeeded: ['Stiff Wire Brush', '110mm PVC Pipe & End Cap', 'PVC Cement / Solvent', 'Ladder', 'Stainless Steel Mesh'],
      malawiProTip: 'In Malawi highlands, heavy October windstorms blow dust across roofs. Never connect gutters directly to your main drinking cistern without a bypass valve.',
      timingWindow: 'September 15 – October 31 (Must be complete before first 20mm rainfall).',
      mistakesToAvoid: [
        'Letting initial dirty runoff enter the main tank, contaminating 5,000L with anaerobic sludge.',
        'Inadequate gutter slope causing water to pool and sag galvanized brackets during cyclonic downpours.'
      ]
    },
    districtVariations: {
      'dedza': 'High wind loads on mountain slopes require heavy-duty galvanized gutter brackets bolted into rafters.',
      'salima': 'High salt/mineral dust near the lake requires washing gutters with clean well water before first storm.'
    }
  },
  {
    id: 'task-egw-orchard-pits',
    seasonKey: 'Hot Dry Preparation',
    title: 'Excavate 1m³ Ellen G. White Tree Planting Pits with Rock Drainage',
    domain: 'fruit-trees',
    priority: 'urgent',
    urgencyNotice: '3 Weeks to Sowing Window: Excavate pits now while soil is dry and easy to dig.',
    daysRemainingEstimate: 21,
    exodusStage: 'Planting & Ecology',
    readinessPoints: 10,
    summary: 'Dig 1m x 1m x 1m deep orchard pits, place 20cm coarse river stones for subsoil drainage, and backfill with rich compost, biochar, bone meal, and topsoil.',
    calculatorLink: {
      tab: 'land',
      label: 'Plan Orchard Zoning & Tree Spacing',
      tooltip: 'Calculate how many avocado, citrus, and mango trees fit within Zone 2 permaculture acreage.'
    },
    fieldGuideLink: {
      skillId: 'fruit-tree-cultivation',
      guideTitle: 'Fruit Tree Cultivation, Orchard Guilds & Grafting',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'Following the Ellen G. White planting method creates a permanent subterranean root reservoir. Deep rock bedding prevents taproot rotting in heavy wet seasons while retaining cool moisture during dry months.',
      steps: [
        'Mark orchard tree locations on contour lines spaced 6m apart for avocados/mangoes or 4m for citrus/peaches.',
        'Excavate 1m wide by 1m long by 1m deep holes. Separate dark topsoil (top 30cm) from lighter subsoil.',
        'Place 15–20cm of coarse river stones, broken terracotta bricks, or volcanic rocks at the pit bottom.',
        'Mix topsoil 50/50 with well-aged thermophilic compost, 3kg crushed biochar, and 250g bone meal.',
        'Backfill pit leaving a 5cm depression to act as a rainwater catch basin (smile bund).'
      ],
      toolsNeeded: ['Pickaxe / Khasu (Hoe)', 'Shovel', 'Wheelbarrow', 'River Stones / Gravel', 'Compost & Biochar'],
      malawiProTip: 'In Dedza red latosol clay, adding coarse river sand to the compost mix increases porosity by 40%, preventing waterlogging during January downpours.',
      timingWindow: 'September 01 – October 25',
      mistakesToAvoid: [
        'Planting trees directly in narrow un-dug hardpan where roots become root-bound like a ceramic pot.',
        'Burying the root flare and graft union below ground level, causing Phytophthora collar rot.'
      ]
    }
  },
  {
    id: 'task-solar-pump-borehole',
    seasonKey: 'Hot Dry Preparation',
    title: 'Service DC Solar Submersible Pump & Test Borehole Drawdown',
    domain: 'water',
    priority: 'high',
    exodusStage: 'Infrastructure',
    readinessPoints: 7,
    summary: 'Test pump open-circuit voltage, desilt sand intake filters, calibrate MPPT controller low-water sensors, and test header tank float valves.',
    calculatorLink: {
      tab: 'solar',
      label: 'Calculate Solar Pump Size for Dry Season',
      tooltip: 'Size PV wattage and borehole head pressure for peak dry season water draw.'
    },
    fieldGuideLink: {
      skillId: 'solar-dambo-irrigation',
      guideTitle: 'Direct Solar Dambo & Shallow Well Surface Irrigation',
      category: 'Water & Energy'
    },
    howToExecute: {
      overview: 'October represents the lowest annual groundwater table in Malawi. Testing your pump performance under maximum head pressure guarantees reliable supply for year-round homestead resilience.',
      steps: [
        'Isolate solar PV array disconnect switch before handling DC high voltage cables.',
        'Pull pump up 1 meter to inspect stainless intake screen for mica silt or iron bacteria scaling.',
        'Clean intake screen with nylon brush and vinegar solution.',
        'Verify well water level recovery rate by timing draw-down with electric dip-meter.',
        'Test automated low-water probe cutoff to ensure pump cannot run dry and seize helical rotor.'
      ],
      toolsNeeded: ['Digital Multimeter', 'Pipe Wrench & Clamp', 'Safety Rope / Winch', 'Nylon Brush & Vinegar'],
      malawiProTip: 'Install a non-return brass check valve 3 meters above the pump head to prevent water hammer shock waves from shattering plastic HDPE fittings.',
      timingWindow: 'October 01 – October 31',
      mistakesToAvoid: [
        'Running pump dry without water immersion, which melts rubber stator bushings in under 60 seconds.',
        'Using undersized 2.5mm² wire runs over 30 meters, creating heavy DC voltage drop.'
      ]
    }
  },
  {
    id: 'task-katondo-broadforking',
    seasonKey: 'Hot Dry Preparation',
    title: 'Katondo Deep-Bed Broadforking & Organic Biomass Mulch Blanket',
    domain: 'soil',
    priority: 'high',
    exodusStage: 'Land Prep',
    readinessPoints: 6,
    summary: 'Aerate compacted subsoil 30cm deep using manual broadfork levering without inverting horizons, then lay a 10cm dry grass mulch blanket ("God\'s Blanket").',
    calculatorLink: {
      tab: 'yield',
      label: 'Calculate Bio-Intensive Garden Yield',
      tooltip: 'Estimate organic vegetable and grain harvest potential from aerated deep beds.'
    },
    fieldGuideLink: {
      skillId: 'broadforking-notill',
      guideTitle: 'Broadforking, No-Till Soil Aeration & Mulch Systems',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'Conventional moldboard plowing destroys beneficial mycorrhizal fungi and creates a hard compaction pan. Broadforking fractures subsoil hardpans, enabling crop roots to plunge 1.5m deep for moisture.',
      steps: [
        'Mark permanent 1.2m wide garden beds and 40cm walking paths (never step on garden beds).',
        'Step onto the broadfork crossbar, sinking all 5 forged tines 30cm into the soil.',
        'Pull back gently to 45 degrees to crack open subsoil compaction channels.',
        'Top-dress each bed with 5cm aged compost and 50g/m² hardwood ash.',
        'Cover entirely with a 10cm thick blanket of dry vetiver grass, maize straw, or hyperrhenia grass.'
      ],
      toolsNeeded: ['Forged Steel Broadfork', 'Rake', 'Wheelbarrow', 'Aged Compost', 'Dry Organic Straw'],
      malawiProTip: 'In hot October sun, bare soil reaches 55°C, sterilizing soil microbes. A 10cm mulch blanket keeps soil temperature at a cool 24°C, preserving moisture for early planting.',
      timingWindow: 'September 15 – October 30',
      mistakesToAvoid: [
        'Inverting or turning soil upside-down, which buries aerobic microbes and brings infertile subsoil to surface.',
        'Walking across aerated beds after broadforking, re-compacting delicate root channels.'
      ]
    }
  },
  {
    id: 'task-heirloom-seed-priming',
    seasonKey: 'Hot Dry Preparation',
    title: 'Sort, Germ-Test & Prime Heirloom Drought-Hardy Seed Stocks',
    domain: 'crops',
    priority: 'high',
    exodusStage: 'Food Autonomy',
    readinessPoints: 5,
    summary: 'Run wet rag germination tests on open-pollinated heirloom seeds (SC 719, Chimbamba beans, CG7 groundnuts, sorghum) and prepare compost-tea priming baths.',
    calculatorLink: {
      tab: 'food',
      label: 'Calculate Grain & Food Reserve Requirements',
      tooltip: 'Determine exact kilograms of maize, beans, and groundnuts needed for 12-month family independence.'
    },
    fieldGuideLink: {
      skillId: 'seed-saving-heirloom',
      guideTitle: 'Heirloom Seed Saving, Selection & Preservation',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'Pre-germination testing ensures >85% field emergence. Seed priming (soaking in aerated compost tea for 8 hours) accelerates root emergence by 48 hours, giving crops an unbeatable jump on early weeds.',
      steps: [
        'Count 20 seeds from each seed batch and wrap in a damp cotton cloth for 5 days.',
        'Check germination rate: if >17 seeds sprout (>85%), the batch is approved for main planting.',
        'Sort out cracked, weevil-bored, or discolored grains.',
        'Prepare 10L aerated compost tea for overnight soaking on the eve of first planting.',
        'Store dry stock in airtight glass jars or sealed PICS bags away from direct heat.'
      ],
      toolsNeeded: ['Cotton Test Cloths', 'Glass Mason Jars / PICS Bags', 'Aerated Compost Tea Bucket', 'Fine Mesh Sieve'],
      malawiProTip: 'Mix dried neem leaves and wood ash with your heirloom seed stock to repel Sitophilus weevils naturally without toxic chemical pesticides.',
      timingWindow: 'October 15 – November 10',
      mistakesToAvoid: [
        'Planting untested old seed stock with poor viability, requiring costly re-sowing after valuable early rains.',
        'Soaking seeds longer than 10 hours, causing seed suffocation and embryo death.'
      ]
    }
  },
  {
    id: 'task-contour-swales-vetiver',
    seasonKey: 'Hot Dry Preparation',
    title: 'Survey A-Frame Contours & Plant Vetiver Grass Hedgerow Anchors',
    domain: 'water',
    priority: 'upcoming',
    exodusStage: 'Land Prep',
    readinessPoints: 7,
    summary: 'Survey level contour lines using a wooden A-frame, dig 50cm wide swale ditches, and plant double rows of Vetiver grass slips to stop rainwater runoff.',
    calculatorLink: {
      tab: 'land',
      label: 'Calculate Permaculture Acreage & Earthworks',
      tooltip: 'Calculate swale retention volume and contour ditch length across your homestead slope.'
    },
    fieldGuideLink: {
      skillId: 'water-conservation-retention',
      guideTitle: 'Water Conservation, Keyline Swales & Dambo Retention',
      category: 'Water & Energy'
    },
    howToExecute: {
      overview: 'Level contour swales (misozi) capture 100% of hillside rainfall, turning damaging flash runoff into deep aquifer recharge that keeps your boreholes flowing year-round.',
      steps: [
        'Calibrate wooden A-frame level with a center plumb bob.',
        'Walk across the slope marking level contour points with wooden stakes every 3 meters.',
        'Dig a flat-bottom ditch 50cm wide by 30cm deep along the marked contour.',
        'Mound excavated soil on the downhill edge to form a continuous earth berm.',
        'Split Vetiver grass clumps into slips and plant tightly (10cm apart) along the berm crest.'
      ],
      toolsNeeded: ['Wooden A-Frame', 'Khasu (Hoe) & Shovel', 'Marking Pegs & String', 'Vetiver Grass Slips'],
      malawiProTip: 'Planting pigeon peas (nandolo) alongside Vetiver grass adds valuable nitrogen into the berm while yielding protein-rich edible pulses.',
      timingWindow: 'September 01 – October 31',
      mistakesToAvoid: [
        'Digging swales off-contour, which channels torrential flood water to one low spot and blows out the berm.',
        'Leaving the downhill berm unplanted, allowing bare soil to wash back into the trench during the first heavy thunderstorm.'
      ]
    }
  },

  // --------------------------------------------------------------------------
  // RAINY PLANTING SEASON (Nov – Mar)
  // --------------------------------------------------------------------------
  {
    id: 'task-monsoon-sowing-maize-beans',
    seasonKey: 'Rainy Planting',
    title: 'First-Rain Sowing: Maize, Chimbamba Beans & Groundnuts Intercrop',
    domain: 'crops',
    priority: 'urgent',
    urgencyNotice: 'First 25mm rain recorded: Sow primed seed within 48 hours into moist seedbed.',
    daysRemainingEstimate: 3,
    exodusStage: 'Planting & Ecology',
    readinessPoints: 9,
    summary: 'Sow primed staple grains and companion legumes into pre-dug Sasakawa planting stations to capture initial nitrogen flush and establish deep root anchoring.',
    calculatorLink: {
      tab: 'yield',
      label: 'Calculate Multi-Crop Intercrop Yield',
      tooltip: 'Compare organic maize + bean intercropping yields against conventional mono-cropping.'
    },
    fieldGuideLink: {
      skillId: 'drought-resistant-crops',
      guideTitle: 'Modern Crop Cultivation & Drought-Resistant Grains',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'The initial "chirimika" rains release a massive burst of mineralized nitrogen in the soil. Planting within 48 hours of the first 25mm soaking rain allows crops to capture this fertility before weeds germinate.',
      steps: [
        'Wait until soil is moist to a depth of at least 15cm (minimum 25mm rain gauge reading).',
        'Open small planting pockets 5cm deep in pre-mulched planting beds spaced 75cm x 25cm.',
        'Drop 2 primed maize seeds per station alongside 2 climbing bean seeds.',
        'Cover with fine compost-enriched soil and tamp down firmly with your foot for seed-to-soil contact.',
        'Ensure mulch cover is replaced around planting stations to shade soil from hot sun.'
      ],
      toolsNeeded: ['Pointed Dibbler Stick', 'Rain Gauge', 'Primed Heirloom Seeds', 'Compost Bucket'],
      malawiProTip: 'Planting groundnuts (CG7) in alternating double rows fixes up to 45kg of atmospheric nitrogen per acre, reducing organic fertilizer needs by half.',
      timingWindow: 'November 15 – December 15',
      mistakesToAvoid: [
        'Planting prematurely in dry soil after a brief 5mm shower ("false start"), causing germinated seeds to roast and die.',
        'Burying small seeds deeper than 5cm, exhausting seedling energy reserves before breaking surface.'
      ]
    }
  },
  {
    id: 'task-swale-overflow-monitoring',
    seasonKey: 'Rainy Planting',
    title: 'Monitor Swale Sills & Direct Heavy Runoff into Dambo Wetland Sponges',
    domain: 'water',
    priority: 'high',
    exodusStage: 'Water Security',
    readinessPoints: 6,
    summary: 'Inspect swale water levels during heavy downpours, clear level sill spillways, and direct overflow into bio-retention earth dams and perennial dambos.',
    calculatorLink: {
      tab: 'rainwater',
      label: 'Check Water Harvesting Saturation',
      tooltip: 'Calculate seasonal aquifer recharge from contour earthworks.'
    },
    fieldGuideLink: {
      skillId: 'water-conservation-retention',
      guideTitle: 'Water Conservation, Keyline Swales & Dambo Retention',
      category: 'Water & Energy'
    },
    howToExecute: {
      overview: 'During intense 50mm/hour thunderstorms, swales fill to capacity. Armored stone spillways ensure excess water discharges safely without eroding garden beds or cutting deep ravines.',
      steps: [
        'Walk perimeter earthworks during or immediately after the first heavy 40mm storm.',
        'Verify that water is pooling evenly along the entire length of each contour swale.',
        'Remove any silt or debris blocking the stone-paved level sill overflow points.',
        'Direct overflow trenches into downhill dambo sponge zones or banana circle pits.'
      ],
      toolsNeeded: ['Gum Boots', 'Shovel', 'Flat River Rocks', 'Raincoat'],
      malawiProTip: 'Plant water-loving bananas, sugarcane, and taro (madumbe) in swale overflow discharge basins to turn storm excess into lush food production.',
      timingWindow: 'December 01 – February 28',
      mistakesToAvoid: [
        'Allowing high-velocity storm runoff to breach unarmored dirt berms, which triggers catastrophic gully erosion.'
      ]
    }
  },
  {
    id: 'task-botanical-pest-sprays',
    seasonKey: 'Rainy Planting',
    title: 'Apply Organic Neem & Tephrosia Botanical Sprays for Armyworm Defense',
    domain: 'crops',
    priority: 'high',
    exodusStage: 'Food Autonomy',
    readinessPoints: 5,
    summary: 'Brew fresh pounded neem leaf and Tephrosia vogelii botanical extracts with natural soap to prevent Fall Armyworm (Spodoptera frugiperda) and stalk borers.',
    calculatorLink: {
      tab: 'yield',
      label: 'Estimate Crop Protection Efficacy',
      tooltip: 'Calculate cost savings of botanical sprays vs commercial synthetic chemicals.'
    },
    fieldGuideLink: {
      skillId: 'insect-handling-pest-control',
      guideTitle: 'Natural Pest Control, Beekeeping & Organic Sprays',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'Fall Armyworms attack tender whorl leaves within 3 weeks of maize germination. Pounded fresh neem leaves release azadirachtin, interrupting insect feeding and reproduction organically.',
      steps: [
        'Pound 500g fresh green neem leaves into a fine paste in a wooden mortar.',
        'Steep paste in 10L clean water for 12 hours overnight.',
        'Strain through fine muslin cloth and add 1 tbsp liquid biodegradable dish soap as a spreader.',
        'Spray directly into the central leaf whorl of young maize plants in the late afternoon (avoid hot sun).'
      ],
      toolsNeeded: ['Wooden Mortar & Pestle', 'Muslin Straining Cloth', 'Knapsack Sprayer', 'Fresh Neem Leaves'],
      malawiProTip: 'Dusting a small pinch of dry wood ash and fine river sand directly into the center funnel whorl of maize kills armyworm larvae mechanically by lacerating their skin.',
      timingWindow: 'December 10 – January 31',
      mistakesToAvoid: [
        'Spraying in hot midday sun, which degrades active neem phytochemicals and scorches tender leaves.'
      ]
    }
  },

  // --------------------------------------------------------------------------
  // HARVEST & STORAGE SEASON (Apr – Jun)
  // --------------------------------------------------------------------------
  {
    id: 'task-hermetic-pics-grain-storage',
    seasonKey: 'Harvest & Storage',
    title: 'Sun-Dry Grains to <12% Moisture & Pack Triple-Layer PICS Bags',
    domain: 'crops',
    priority: 'urgent',
    urgencyNotice: 'Post-Harvest Window: Pack dry grain before nocturnal moisture and weevils strike.',
    daysRemainingEstimate: 10,
    exodusStage: 'Food Autonomy',
    readinessPoints: 9,
    summary: 'Field-cure maize, shell beans, sun-dry on elevated bamboo racks to under 12% moisture (salt test), and seal in airtight hermetic PICS bags with dried neem.',
    calculatorLink: {
      tab: 'food',
      label: 'Verify 12-Month Storage Reserve',
      tooltip: 'Confirm your stored grain volume matches your household annual nutrition targets.'
    },
    fieldGuideLink: {
      skillId: 'food-preservation-techniques',
      guideTitle: 'Food Preservation: Solar Drying, PICS Bags & Zeer Pots',
      category: 'Food & Preservation'
    },
    howToExecute: {
      overview: 'Grain weevils (Prostephanus truncatus) cause up to 40% post-harvest loss in Malawi. Triple-layer PICS hermetic bags deplete oxygen within 72 hours, suffocating all insect pests without toxic synthetic chemicals.',
      steps: [
        'Dry grains on elevated racks until a test handful rattles like dry glass beads.',
        'Salt Test: Shake dry grain with dry table salt in a clean dry jar for 5 minutes. If salt sticks to the glass, moisture is >12% and grain needs more sun drying.',
        'Inspect the two high-density polyethylene inner liners of the PICS bag for any punctures or holes.',
        'Fill inner bag with clean dry grain and twist top tightly, folding over and tying securely with string.',
        'Tie second and third outer layers independently to maintain an airtight oxygen barrier.',
        'Store bags on raised wooden pallets 30cm off the floor away from direct sunlight.'
      ],
      toolsNeeded: ['Triple-Layer PICS Bags', 'Elevated Bamboo Drying Racks', 'Airtight Glass Test Jar', 'Jute Twine', 'Wooden Pallets'],
      malawiProTip: 'Never place hermetic bags directly on concrete or earth floors. Condensation forms under the bags, causing mold to ruin bottom grains.',
      timingWindow: 'April 15 – June 15',
      mistakesToAvoid: [
        'Bagging grain with >13% moisture, which triggers lethal aflatoxin mold growth inside hermetic seals.',
        'Re-using punctured or torn inner plastic bags without patching with heavy packing tape.'
      ]
    }
  },
  {
    id: 'task-potato-root-cellaring',
    seasonKey: 'Harvest & Storage',
    title: 'Cure Irish & Sweet Potatoes in Ventilated Dark Root Cellar',
    domain: 'crops',
    priority: 'high',
    exodusStage: 'Food Autonomy',
    readinessPoints: 6,
    summary: 'Cure potato skins for 10 days at 20°C in dark ventilated shade, then store in slatted wooden crates layered with dry wood ash and dry straw.',
    calculatorLink: {
      tab: 'food',
      label: 'Calculate Root Tuber Storage Needs',
      tooltip: 'Calculate root crop weight needed to bridge the winter food gap.'
    },
    fieldGuideLink: {
      skillId: 'food-preservation-techniques',
      guideTitle: 'Food Preservation: Solar Drying, PICS Bags & Zeer Pots',
      category: 'Food & Preservation'
    },
    howToExecute: {
      overview: 'Properly cured Irish potatoes (Dedza/Ntcheu varieties) develop thickened protective skins, healing minor harvest cuts and preventing rot for up to 6 months of dark cellar storage.',
      steps: [
        'Harvest tubers gently using a flat-tined digging fork to avoid bruising or slicing skins.',
        'Spread tubers in a single layer in a dark, warm, well-ventilated room (20°C–25°C) for 10 days.',
        'Sort tubers, immediately separating any punctured, bruised, or soft specimens for early consumption.',
        'Pack undamaged cured potatoes in slatted wooden boxes layered with dry bracken fern or straw.',
        'Dust lightly with dry hardwood ash to discourage tuber moths and fungal spores.'
      ],
      toolsNeeded: ['Slatted Wooden Crates', 'Digging Fork', 'Dry Straw / Ferns', 'Dry Wood Ash'],
      malawiProTip: 'Never expose storing potatoes to light. Light exposure stimulates toxic solanine production, turning skins green and unpalatable.',
      timingWindow: 'April 01 – May 30',
      mistakesToAvoid: [
        'Washing potatoes with water before storage. Washing removes protective natural skin oils and induces rapid bacterial soft rot.'
      ]
    }
  },

  // --------------------------------------------------------------------------
  // COLD DRY SEASON (Jul – Aug)
  // --------------------------------------------------------------------------
  {
    id: 'task-dambo-winter-gardening',
    seasonKey: 'Cold Dry Season',
    title: 'Plant Winter Cold-Tolerant Vegetables in Dambos & Irrigated Raised Beds',
    domain: 'crops',
    priority: 'urgent',
    urgencyNotice: 'Peak Dambo Moisture: Plant garlic, onions, brassicas, and Irish potatoes before wetlands dry.',
    daysRemainingEstimate: 7,
    exodusStage: 'Planting & Ecology',
    readinessPoints: 7,
    summary: 'Utilize receding wetland dambo moisture and drip systems to grow garlic, onions, carrots, cabbages, spinach, and second-season Irish potatoes.',
    calculatorLink: {
      tab: 'solar',
      label: 'Size Dambo Solar Drip Irrigation',
      tooltip: 'Calculate water volume needed to sustain 0.5 acre winter vegetable crops.'
    },
    fieldGuideLink: {
      skillId: 'herbs-cultivation-medicinal',
      guideTitle: 'Medicinal Herbs, Herbalism & Kitchen Pharmacy',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'During July and August, sunny days and cool nights create perfect conditions for temperate vegetables that struggle during hot summer months.',
      steps: [
        'Prepare 1.2m raised nursery beds in moist dambo fringes or near solar drip lines.',
        'Sow onion (Texas Early Grano), garlic cloves, Savoy cabbage, carrots, and garden peas.',
        'Apply well-rotted vermicompost tea weekly to feed leaf canopy development.',
        'Water beds in early morning (7:00 AM) so cold overnight frost thaws before hot noon sun.'
      ],
      toolsNeeded: ['Hand Trowel', 'Watering Can', 'Vermicompost Tea', 'Frost Straw Mats'],
      malawiProTip: 'In frost-prone valleys (Dedza, Ntcheu, Nyika), cover delicate young pepper and tomato beds with woven straw mats from 5:00 PM to 7:30 AM.',
      timingWindow: 'June 15 – August 15',
      mistakesToAvoid: [
        'Watering late in the evening during cold winter spells, which freezes around root stems and bursts cellular tissues.'
      ]
    }
  },
  {
    id: 'task-thermophilic-compost-heaps',
    seasonKey: 'Cold Dry Season',
    title: 'Build 1.5m Multi-Layer Thermophilic Compost Heaps with Dry Stalks',
    domain: 'soil',
    priority: 'high',
    exodusStage: 'Land Prep',
    readinessPoints: 8,
    summary: 'Transform post-harvest crop residues (dry maize stalks, legume vines, animal manure) into biologically active 60°C thermophilic compost for next season.',
    calculatorLink: {
      tab: 'land',
      label: 'Calculate Compost Volume per Acre',
      tooltip: 'Determine metric tons of organic compost needed to restore subsoil fertility.'
    },
    fieldGuideLink: {
      skillId: 'compost-making',
      guideTitle: 'Compost Making & Bio-Fertilizers',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'July provides abundant dry maize straw and post-harvest biomass. Building 1.5m³ thermophilic heaps achieves 55°C–65°C core heat, killing weed seeds and pathogens while yielding black humus.',
      steps: [
        'Lay a 15cm base of coarse woody brush and maize cobs for bottom airflow.',
        'Alternate 15cm brown carbon layers (chopped dry stalks) with 10cm green nitrogen layers (fresh manure/weeds).',
        'Dust each layer lightly with wood ash, biochar, and fertile topsoil.',
        'Water each layer until moist like a wrung-out sponge (55% moisture).',
        'Turn pile on Day 4, Day 10, and Day 17 to maintain aerobic respiration.'
      ],
      toolsNeeded: ['Pitchfork / Khasu (Hoe)', 'Water Buckets', 'Compost Thermometer or Dry Stick', 'Biochar & Hardwood Ash'],
      malawiProTip: 'Insert a dry bamboo stick into the center of the heap. Pull it out daily: if the tip is hot and smells sweet, your microbial combustion is perfect.',
      timingWindow: 'July 01 – August 31',
      mistakesToAvoid: [
        'Making heaps smaller than 1 cubic meter, which lose heat through surface area and fail to reach thermophilic temperature.'
      ]
    }
  },
  {
    id: 'task-scion-grafting-nursery',
    seasonKey: 'Cold Dry Season',
    title: 'Dormant Season Scion Grafting on Wild Fruit Rootstocks',
    domain: 'fruit-trees',
    priority: 'upcoming',
    exodusStage: 'Planting & Ecology',
    readinessPoints: 6,
    summary: 'Harvest pencil-thick dormant scions from elite high-yielding trees and execute whip-and-tongue or cleft grafts onto drought-hardy wild rootstocks.',
    calculatorLink: {
      tab: 'land',
      label: 'Calculate Nursery Propagation Yield',
      tooltip: 'Calculate orchard value generated from on-homestead grafted saplings.'
    },
    fieldGuideLink: {
      skillId: 'fruit-tree-grafting',
      guideTitle: 'Heirloom Fruit Tree Grafting & Nursery Propagation',
      category: 'Farming'
    },
    howToExecute: {
      overview: 'During winter dormancy (July-August), sap flow is slow and buds are plump. Aligning the green cambium layers of elite scions onto wild rootstocks ensures 90%+ graft success.',
      steps: [
        'Select pencil-thick dormant scions with 3–4 plump buds from proven mother trees.',
        'Make clean matching 2.5cm sloping cuts on rootstock and scion using a sterilized razor knife.',
        'Align green inner cambium layers with surgical precision on at least one edge.',
        'Wrap tightly with parafilm tape and seal top cut with melted beeswax.',
        'Place grafted pots in 50% shade cloth nursery and water base gently.'
      ],
      toolsNeeded: ['Razor-Sharp Grafting Knife', 'Parafilm Grafting Tape', 'Pure Beeswax & Methylated Spirits', 'Rootstock Saplings'],
      malawiProTip: 'Use wild local mango ("Mwembe wa m\'mudzi") seedlings as rootstock. They possess deep drought taproots and complete resistance to local nematode soils.',
      timingWindow: 'July 15 – August 31',
      mistakesToAvoid: [
        'Allowing cut surfaces to dry out in cold dry winds before binding tightly with tape.',
        'Failing to align the razor-thin green cambium layers, preventing vascular connection.'
      ]
    }
  }
];

export function getTasksForSeason(seasonKey: SeasonalTag): ActionableTask[] {
  return ACTIONABLE_ALMANAC_TASKS.filter(t => t.seasonKey === seasonKey);
}

export function getTelemetryForDistrict(districtName?: string): DistrictSeasonalTelemetry {
  if (!districtName) return DISTRICT_TELEMETRY['dedza'];
  const key = districtName.toLowerCase().trim();
  for (const [dKey, val] of Object.entries(DISTRICT_TELEMETRY)) {
    if (key.includes(dKey) || dKey.includes(key)) return val;
  }
  return DISTRICT_TELEMETRY['dedza'];
}
