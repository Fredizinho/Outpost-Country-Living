import { SeasonalTag } from './skillsAndSeasons';
import { FARMING_PROTOCOLS } from './protocols/farmingProtocols';
import { SOIL_BREEDING_PROTOCOLS } from './protocols/soilAndBreedingProtocols';
import { WATER_ENERGY_PROTOCOLS } from './protocols/waterEnergyProtocols';
import { PRESERVATION_CONSTRUCTION_PROTOCOLS } from './protocols/preservationConstructionProtocols';

export interface TechnicalBlueprintMetric {
  label: string;
  value: string;
  detail: string;
}

export interface TechnicalBlueprint {
  dimensionsAndRatios: string[];
  sizingFormulas: string[];
  metrics: TechnicalBlueprintMetric[];
}

export interface FieldMaterialInput {
  name: string;
  localAvailability: string;
  purpose: string;
}

export interface ExecutionProtocolStep {
  stepNumber: number;
  phase: string;
  title: string;
  timing: string;
  seasonalWindow: string;
  instructions: string;
  criticalCheck: string;
}

export interface FieldTroubleshootingItem {
  pitfall: string;
  symptom: string;
  rootCause: string;
  fieldRemedy: string;
}

export interface RelatedCalculatorLink {
  tab: 'solar' | 'rainwater' | 'yield' | 'food' | 'land' | 'budget' | 'compost' | 'pantry';
  title: string;
  hint: string;
}

export interface AlmanacTimingLink {
  season: SeasonalTag;
  monthWindow: string;
  label: string;
  targetAction: string;
}

export interface DetailedSkillProtocol {
  id?: string;
  engineeringSpecs?: Record<string, any>;
  blueprint?: TechnicalBlueprint;
  materials: FieldMaterialInput[];
  protocol: ExecutionProtocolStep[];
  troubleshooting: FieldTroubleshootingItem[];
  calculator: RelatedCalculatorLink;
  almanac: AlmanacTimingLink;
}

export const SKILL_TECHNICAL_PROTOCOLS: Record<string, DetailedSkillProtocol> = {
  'compost-making': {
    blueprint: {
      dimensionsAndRatios: [
        'Heap Footprint: 1.5m (width) x 1.5m (length) x 1.5m (height) = 3.375 m³ bulk volume',
        'Carbon-to-Nitrogen (C:N) Ratio: 30:1 (3 parts dry brown biomass to 1 part fresh green nitrogen)',
        'Stratified Layering: 15cm coarse bottom aeration twigs, 15cm brown layer, 10cm green manure layer',
        'Moisture Target: 50%–60% moisture content (equivalent to a firmly wrung-out sponge)'
      ],
      sizingFormulas: [
        'Compost Pile Volume = 1.5m × 1.5m × 1.5m = ~3.38 m³ (shrinks to ~1.2 m³ of pure humic humus in 8 weeks)',
        'Annual Homestead Requirement = 500kg per 0.25 acre garden bed = 4 seasonal thermophilic heaps/year'
      ],
      metrics: [
        { label: 'Core Thermophilic Peak', value: '55°C – 65°C', detail: 'Reached within 48-72h; destroys pathogen spores & weed seeds' },
        { label: 'Optimum C:N Ratio', value: '30:1', detail: '3 parts dry maize stalks/straw to 1 part fresh manure/legume tops' },
        { label: 'Aerobic Turning Schedule', value: 'Days 4, 10 & 17', detail: 'Inside-out mechanical inversion to replenish oxygen levels' },
        { label: 'Finished Humus pH', value: 'pH 6.5 – 7.2', detail: 'Sweet forest loam aroma with high cation exchange capacity (CEC)' }
      ]
    },
    materials: [
      { name: 'Pitchfork / Digging Fork', localAvailability: 'Malawian agro-hardware or local blacksmith (Wosula zitsulo)', purpose: 'Lifting, aerating, and turning bulky layered organic matter' },
      { name: 'Khasu (Malawian Heavy Hoe)', localAvailability: 'Ubiquitous in all village markets', purpose: 'Excavating 20cm base soil loosening and site leveling' },
      { name: 'Dry Brown Carbon Biomass', localAvailability: 'Dry maize stalks, shredded grass, sorghum chaff', purpose: 'Carbon energy substrate preventing foul anaerobic collapse' },
      { name: 'Fresh Green Nitrogen Manure', localAvailability: 'Cattle dung, goat kraal droppings, Tithonia leaves', purpose: 'Rapid bacterial reproduction fueling core heat buildup' },
      { name: 'Crushed Hardwood Biochar & Ash', localAvailability: 'Homestead cooking hearth or charcoal kiln', purpose: 'Mineral inoculation (potassium/calcium) and fungal habitat' },
      { name: 'Perforated Bamboo Aeration Chimney', localAvailability: 'Local riverbank bamboo groves', purpose: 'Central convection chimney driving fresh oxygen into core' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Base Excavation & Aeration Grid',
        title: 'Loosen Subsoil & Lay Coarse Drainage Grid',
        timing: 'Day 1 (Morning, 07:00)',
        seasonalWindow: 'Cold Dry Season (July–August) / Pre-Rains (October)',
        instructions: 'Mark a 1.5m x 1.5m footprint in partial shade. Loosen native subsoil 20cm deep with a fork. Lay a 15cm criss-cross base grid of dry branches, pigeon pea stalks, and whole maize cobs to ensure unrestricted sub-floor airflow.',
        criticalCheck: 'Verify that water does not pool at the base site; subsoil must percolate freely.'
      },
      {
        stepNumber: 2,
        phase: 'Stratified 30:1 Layering',
        title: 'Alternate Brown Carbon and Green Nitrogen Strata',
        timing: 'Day 1 (Midday)',
        seasonalWindow: 'Cold Dry Season / Pre-Rains',
        instructions: 'Add a 15cm brown layer of shredded maize stalks and straw. Follow with a 10cm green layer of fresh cattle/goat manure and nitrogenous green weeds (Tithonia diversifolia). Dust with 2 handfuls of biochar and 1 cup of wood ash. Sprinkle with non-chlorinated water until moist like a wrung-out sponge.',
        criticalCheck: 'Squeeze a handful: exactly 1-2 drops of water should emerge between knuckles (55% moisture).'
      },
      {
        stepNumber: 3,
        phase: 'Vertical Stacking & Core Chimney',
        title: 'Build to 1.5m Height & Insert Vent Stick',
        timing: 'Day 1 (Late Afternoon)',
        seasonalWindow: 'Cold Dry Season / Pre-Rains',
        instructions: 'Repeat alternating layers until the stack reaches 1.5m high, tapering slightly like a loaf. Drive a sharpened 2m bamboo pole into the center. Cover with a 5cm dry grass mulch blanket or breathable canvas tarp to shield against heavy rain or scorching winds.',
        criticalCheck: 'Heap must reach at least 1 cubic meter minimum volume to maintain core heat.'
      },
      {
        stepNumber: 4,
        phase: 'Thermophilic Heating & First Turn',
        title: 'Monitor Core Heat (55°C–65°C) & Invert Heap',
        timing: 'Day 4',
        seasonalWindow: 'Active Fermentation Phase',
        instructions: 'Withdraw the central stick: it should feel hot to the touch (55°C–65°C) with a white actinomycetes bloom. Invert the heap completely using a pitchfork: peel outer cooler dry material and fold it into the core, moving the hot inner compost to the outer perimeter.',
        criticalCheck: 'If core smells foul or sour (anaerobic), add dry straw and turn immediately.'
      },
      {
        stepNumber: 5,
        phase: 'Second & Third Inversion Cycles',
        title: 'Secondary Turns & Moisture Stabilization',
        timing: 'Day 10 and Day 17',
        seasonalWindow: 'Active Maturation Phase',
        instructions: 'Perform complete inside-out turns on Day 10 and Day 17. Sprinkle light water if the pile appears dusty or gray. The core temperature will gradually moderate down to 35°C–40°C as complex lignins decompose.',
        criticalCheck: 'Original plant fibers should break down into crumbly brown fragments.'
      },
      {
        stepNumber: 6,
        phase: 'Humus Curing & Sifting',
        title: 'Cool Curing & Garden Bed Application',
        timing: 'Weeks 4 to 8',
        seasonalWindow: 'Late Dry Prep (September–November)',
        instructions: 'Allow the heap to rest undisturbed in shade for 3-4 weeks. The material will cool to ambient temperature, turning deep chocolate-black with a pleasant forest floor scent. Sift through a 12mm wire screen before applying to seedbeds or tree basins.',
        criticalCheck: 'Finished compost must not generate heat when moistened and bagged.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Heap Fails to Heat Above 40°C',
        symptom: 'Pile remains cool and decomposition stalls after 5 days',
        rootCause: 'Insufficient nitrogen (too much dry straw, C:N > 50:1) or pile volume is under 1 m³',
        fieldRemedy: 'Drench pile with 20L fresh cattle manure slurry or urine-water mix (1:5), and rebuild to 1.5m height.'
      },
      {
        pitfall: 'Foul Ammonia / Rotten Egg Odor',
        symptom: 'Offensive smell with black slimy patches and flies',
        rootCause: 'Anaerobic compaction caused by waterlogging (>70% moisture) and lack of structure',
        fieldRemedy: 'Tear down heap, mix in 30% dry coarse maize stalks or woodchips, and rebuild with central bamboo chimney.'
      },
      {
        pitfall: 'White Ashy Powder Throughout Heap',
        symptom: 'Compost is chalky, dried out, and microbes appear dead',
        rootCause: 'Overheating (>70°C) with zero moisture, causing fungal sporulation and nitrogen loss',
        fieldRemedy: 'Turn immediately, rehydrate thoroughly with watering can, and cap with thick thatch mulch.'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Bio-Intensive Yield & Soil Amendment Sizer',
      hint: 'Calculate required compost tonnage based on your acreage and crop targets.'
    },
    almanac: {
      season: 'Cold Dry Season',
      monthWindow: 'July – August',
      label: 'Winter Heap Building Window',
      targetAction: 'Build 4-6 thermophilic heaps during winter to cure in time for October planting stations.'
    }
  },

  'offgrid-first-aid': {
    blueprint: {
      dimensionsAndRatios: [
        'Oral Rehydration Solution (ORS): 1 Liter boiled water + 6 level tsp sugar + 1/2 level tsp unrefined salt',
        'Activated Hardwood Charcoal Suspension: 50g–100g powdered charcoal in 300ml clean boiled water (1:3 ratio)',
        'Pressure-Immobilization Bandage (Snakebite): 10cm–15cm elastic crepe bandage wrapped at 40–70 mmHg pressure',
        'Orthopedic Splint Extension: Rigid support extending beyond 1 joint above and 1 joint below fracture line'
      ],
      sizingFormulas: [
        'Pediatric Activated Charcoal Dosing = 1g per kg body weight mixed in 150ml water',
        'Burn Cooling Protocol = 15 to 20 minutes continuous immersion in 15°C–20°C clean non-iced water'
      ],
      metrics: [
        { label: 'Snakebite Bandage Tension', value: '40 – 70 mmHg', detail: 'Firm as for a sprained ankle; arterial pulse must remain detectable' },
        { label: 'Charcoal Triage Window', value: '< 60 Minutes', detail: 'Administer immediately after ingestion before toxic gut absorption' },
        { label: 'Burn Cooling Duration', value: '15 – 20 min', detail: 'Halts thermal burn progression into deeper subcutaneous tissue' },
        { label: 'Eye Flush Duration', value: '15 – 20 min', detail: 'Continuous stream for spitting cobra venom (saline or fresh milk)' }
      ]
    },
    materials: [
      { name: 'Split Bamboo & Carved Hardwood Splints', localAvailability: 'Homestead carpentry store / river bamboo', purpose: 'Rigid limb immobilization preventing bone displacement' },
      { name: 'Elastic Crepe & Calico Triangular Bandages', localAvailability: 'District pharmacy or dispensary kits', purpose: 'Even pressure distribution for snakebites and splint anchoring' },
      { name: 'Medical-Grade Activated Hardwood Charcoal', localAvailability: 'Homestead pyrolyzed clay retort / pharmacy', purpose: 'Universal broad-spectrum gastrointestinal toxin adsorbent' },
      { name: 'Raw Unheated Honey & Fresh Aloe Vera Gel', localAvailability: 'Homestead apiary & medicinal herb beds', purpose: 'Hyperosmotic broad-spectrum antimicrobial burn dressing' },
      { name: 'Sterile Eye Saline / Fresh Clean Milk', localAvailability: 'Homestead dairy / boiled cooled water with pinch salt', purpose: 'Neutralizing cytotoxic venom in eyes from Spitting Cobras' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Orthopedic Fracture Stabilization',
        title: 'Immobilize Bone Fractures with Rigid Padded Splints',
        timing: 'Immediate (Minutes 0–10)',
        seasonalWindow: 'Year-Round Protocol',
        instructions: 'Assess distal pulse and sensation. Pad bamboo splints with clean cloth. Position splints on opposing sides of the limb, bridging across the joints above and below the break. Secure with triangular bandages. Never attempt to manually reduce compound bone protruding through skin.',
        criticalCheck: 'Re-verify capillary refill (fingernail pink return < 2 sec) after securing splint.'
      },
      {
        stepNumber: 2,
        phase: 'Snakebite Pressure-Immobilization',
        title: 'Apply Broad Elastic Bandage & Restrict Movement',
        timing: 'Immediate (Minutes 0–5)',
        seasonalWindow: 'Year-Round Protocol (High Alert: Oct–March Rains)',
        instructions: 'Keep victim completely still and reassured to slow lymphatic flow. Wrap a 10cm crepe bandage directly over bite site, then wrap upward toward torso. Immobilize limb with a splint. Keep bitten limb level with the heart. Never cut, suction, wash the site, or apply a tourniquet.',
        criticalCheck: 'Ensure the bandage is snug but does not cut off blood circulation (pulse must remain palpable).'
      },
      {
        stepNumber: 3,
        phase: 'Venom Eye Irrigation (Spitting Cobra)',
        title: 'Continuous 15-Minute Saline/Milk Flush',
        timing: 'Immediate (Minutes 0–15)',
        seasonalWindow: 'Year-Round Protocol',
        instructions: 'Hold victim’s eyelids open gently without rubbing. Direct a continuous, gentle stream of sterile saline, boiled cooled water, or fresh cow’s milk across the eye from the inner to outer corner for 15 full minutes to wash out cytotoxic venom.',
        criticalCheck: 'Do not allow victim to rub eyes, which drives venom deeper into corneal tissue.'
      },
      {
        stepNumber: 4,
        phase: 'Thermal Burn Quenching & Raw Honey Seal',
        title: 'Cool Running Water & Honey Dressing',
        timing: 'Minutes 0–30',
        seasonalWindow: 'Year-Round Protocol',
        instructions: 'Cool thermal burn with clean running water for 15-20 minutes. Gently pat dry with sterile gauze. Coat the sterile burn area generously with pure unheated raw honey (or fresh inner aloe gel). Cover loosely with non-adherent sterile dressing. Never pop blisters.',
        criticalCheck: 'Never apply butter, grease, engine oil, or cow dung to burn wounds.'
      },
      {
        stepNumber: 5,
        phase: 'Acute Ingestion / Poisoning Triage',
        title: 'Oral Activated Charcoal Dosing',
        timing: 'Within 60 minutes of ingestion',
        seasonalWindow: 'Year-Round Protocol',
        instructions: 'Mix 50g (adult) or 25g (child) of powdered activated hardwood charcoal into 300ml clean boiled water. Have victim drink the slurry immediately. Follow with 200ml clear water to ensure transit through the stomach into the small intestine.',
        criticalCheck: 'Do NOT induce vomiting if victim swallowed caustic acids, alkalis, or petroleum fuels.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Application of Arterial Tourniquet to Snakebite',
        symptom: 'Limb turns blue/black, cold, and pulses disappear; severe localized gangrene',
        rootCause: 'Restricting arterial blood flow instead of lymphatic drainage with excessive tension',
        fieldRemedy: 'Do not suddenly snap off tourniquet (can cause systemic shock). Apply proper crepe bandage below it, then slowly ease off tourniquet over 2 minutes.'
      },
      {
        pitfall: 'Rupturing Burn Blisters with Needles',
        symptom: 'Rapid pus formation, high fever, and secondary bacterial septic infection',
        rootCause: 'Breaching the natural sterile biological skin barrier covering the dermis',
        fieldRemedy: 'Wash with boiled cooled saline, re-apply raw honey antimicrobial layer, and bandage with sterile non-stick dressing.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Homestead Infrastructure & First Aid Staging Sizer',
      hint: 'Plan rural medical supply reserves and emergency transport radius.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Every Quarter',
      label: 'First Aid Kit & Splint Inspection',
      targetAction: 'Restock activated charcoal powder, fresh crepe bandages, and check honey jar seals.'
    }
  },

  'fruit-tree-cultivation': {
    blueprint: {
      dimensionsAndRatios: [
        'Ellen G. White Deep Planting Pit: 100cm (width) x 100cm (length) x 100cm (depth) = 1.0 m³ pit volume',
        'Bottom Drainage Layer: 15cm–20cm of coarse river rocks and volcanic granite gravel (porous sump)',
        'Stratified Backfill Ratio: 50% enriched topsoil + 40% aged compost + 5% crushed biochar + 5% bone meal/ash',
        'Micro-Catchment Smile Bund: 1.2m radius downhill semicircular earth berm packed with 10cm vetiver mulch'
      ],
      sizingFormulas: [
        'Standard Orchard Spacing: Apples/Peaches = 4m × 4m (625 trees/ha); Avocados/Mangoes = 8m × 8m (156 trees/ha)',
        'Water Catchment Capacity = 1.2m smile bund captures ~85 Liters of runoff during a 25mm rainstorm'
      ],
      metrics: [
        { label: 'Planting Pit Dimensions', value: '1.0m × 1.0m × 1.0m', detail: 'Excavated 3ft deep into subsoil to shatter hardpans' },
        { label: 'Graft Collar Clearance', value: '10cm – 15cm ASL', detail: 'Must remain above final settled mulch level to prevent collar rot' },
        { label: 'Biochar Enrichment per Pit', value: '2.5kg – 3.0kg', detail: 'Pre-charged with manure tea to create lifelong microbial habitat' },
        { label: 'First-Year Water Requirement', value: '20L every 4 days', detail: 'Delivered via deep root pipe or sunken terracotta olla pot' }
      ]
    },
    materials: [
      { name: 'Heavy Digging Khasu (Hoe) & Pickaxe', localAvailability: 'Standard Malawian tool depot', purpose: 'Breaking compacted ferric subsoil hardpans to 1m depth' },
      { name: 'River Stones & Coarse Gravel', localAvailability: 'Local riverbeds or quarry tailings', purpose: 'Sub-pit bottom drainage bedding for lifelong taproot health' },
      { name: 'Thermophilic Compost & Bone Meal', localAvailability: 'Homestead compost heaps & local abattoirs', purpose: 'Phosphorus and calcium-rich root development matrix' },
      { name: 'Crushed Inoculated Biochar', localAvailability: 'Homestead pyrolysis kiln', purpose: 'Permanent moisture retention and nutrient sponge in root zone' },
      { name: 'Grafted Bare-Root or Potted Sapling', localAvailability: 'Certified agroforestry nursery (e.g. Bvumbwe / Dedza)', purpose: 'Elite scion grafted onto hardy local rootstock' },
      { name: 'Bamboo Support Stakes & Banana Fiber Twine', localAvailability: 'Homestead bamboo plantation', purpose: 'Bracing young sapling against fierce dry-season winds' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Dry-Season Pit Excavation',
        title: 'Dig 1m³ Pit & Separate Topsoil from Subsoil',
        timing: 'Month: September–October',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Mark a 1m x 1m square. Excavate the dark topsoil (0-30cm) and place in pile A. Excavate the reddish subsoil (30-100cm) into pile B. Scrape the pit sides to break slick glazing.',
        criticalCheck: 'Verify pit depth is a full 100cm; bottom must be flat and free of compacted hardpans.'
      },
      {
        stepNumber: 2,
        phase: 'Drainage Bedding Installation',
        title: 'Lay 20cm Rock Base & Mineral Stratum',
        timing: 'Month: October',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Place 15-20cm of clean fist-sized river rocks and coarse gravel at the bottom. Scatter 500g of steamed bone meal and 2kg of aged cattle manure directly over the stones to draw taproots deep.',
        criticalCheck: 'Ensure stones do not clog with loose fine dust before topsoil backfill begins.'
      },
      {
        stepNumber: 3,
        phase: 'Enriched Organic Backfill',
        title: 'Mix Topsoil with Compost, Biochar and Ash',
        timing: 'Month: October–November (Pre-Rains)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Blend topsoil pile A with 4 wheelbarrows of well-cured compost, 3kg charged biochar, and 200g hardwood ash. Backfill the pit until a firm mound rises 10cm above natural ground level to allow for settling.',
        criticalCheck: 'Do NOT use raw fresh manure in the backfill; it generates root-burning ammonia heat.'
      },
      {
        stepNumber: 4,
        phase: 'Sapling Placement & Root Collar Alignment',
        title: 'Position Tree & Settle Root Flare',
        timing: 'First Soaking Rain (November–December)',
        seasonalWindow: 'Rainy Planting Window',
        instructions: 'Open a center hole in the settled mound. Spread roots radially outward. Position the sapling so the root collar sits 3cm above ground level and the graft union is 10-15cm above soil line. Backfill and firm gently with foot.',
        criticalCheck: 'Never bury the graft union below soil; this induces deadly Phytophthora fungal rot.'
      },
      {
        stepNumber: 5,
        phase: 'Micro-Catchment & Guild Companion Sowing',
        title: 'Shape Smile Bund, Mulch & Intercrop Guilds',
        timing: 'December',
        seasonalWindow: 'Rainy Season',
        instructions: 'Shape a 1.2m semicircular earth bund downhill of the tree. Pack with 10cm of dry grass mulch, keeping mulch 5cm away from the trunk bark. Sow 4 pigeon pea seeds and 2 comfrey roots around the dripline perimeter.',
        criticalCheck: 'Keep raw mulch from directly touching the trunk bark to prevent termite girdling.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Graft Union Buried Below Soil Level',
        symptom: 'Scion produces its own roots, loses rootstock resistance, and trunk base develops black oozing canker',
        rootCause: 'Setting tree too deep during backfill or allowing settling mulch to bury trunk collar',
        fieldRemedy: 'Carefully excavate topsoil around trunk base until graft union is completely exposed 10cm to sunlight and air.'
      },
      {
        pitfall: 'Termite Attack on Young Sapling Bark',
        symptom: 'Mud tunnels rising on lower trunk and bark stripped clean at ground level',
        rootCause: 'Mulch touching wood stem and lack of natural repellent barrier',
        fieldRemedy: 'Paint lower 30cm of trunk with lime-ash whitewash slurry (1 part lime + 1 part ash + water) and clear mulch 10cm back.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Homestead Land Allocation & Food Forest Sizer',
      hint: 'Size your orchard guilds and calculate multi-year fruit yields.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Deep Pit Excavation Season',
      targetAction: 'Excavate all 1m³ fruit tree pits in October so backfills settle before the first November rains.'
    }
  },

  'vermiculture-worm-farming': {
    blueprint: {
      dimensionsAndRatios: [
        'Tiered Bin Dimensions: 60cm (length) x 40cm (width) x 25cm (depth) per stackable box unit',
        'Drainage Perforation Grid: 5mm holes spaced 5cm apart in base; 2mm ventilation holes along upper rim',
        'Bedding Moisture Ratio: 75% moisture (when squeezed firmly, only 3-4 drops release between fingers)',
        'Stocking Density: 500g worms (approx. 1,000 African Nightcrawlers / Red Wigglers) per 0.25 m² surface area'
      ],
      sizingFormulas: [
        'Worm Food Consumption Rate = 500g worms consume ~250g finely chopped food waste per day',
        'Castings Production = 1 m² active worm bed yields ~20kg to 30kg of pure vermicompost per month'
      ],
      metrics: [
        { label: 'Bedding Moisture Level', value: '70% – 80%', detail: 'Feels like a wrung-out sponge; worms breathe through skin' },
        { label: 'Optimal Temperature', value: '18°C – 28°C', detail: 'Kept in full shade; mortality occurs rapidly above 35°C' },
        { label: 'pH Balance Target', value: 'pH 6.5 – 7.5', detail: 'Buffered with crushed eggshells to neutralize organic acid' },
        { label: 'Worm Tea Brew Ratio', value: '1:10 Castings to Water', detail: 'Aerated with aquarium pump + 1 tbsp molasses for 24h' }
      ]
    },
    materials: [
      { name: 'Stackable Wooden / Clay Boxes', localAvailability: 'Homestead carpentry or local clay potter', purpose: 'Breathable, temperature-buffered worm housing units' },
      { name: 'Shredded Cardboard & Banana Fiber', localAvailability: 'Market boxes and homestead banana plants', purpose: 'Carbon bedding holding moisture without compacting' },
      { name: 'African Nightcrawlers (Eudrilus eugeniae)', localAvailability: 'Permaculture outposts / moist forest dambo soil', purpose: 'Epigeic composting earthworms with voracious appetite' },
      { name: 'Crushed Eggshell Powder', localAvailability: 'Homestead kitchen waste', purpose: 'Essential gizzard grit for worm digestion and pH buffer' },
      { name: 'Burlap Hessian Sacks', localAvailability: 'Coffee / grain stores', purpose: 'Moisture retention blanket shielding worms from light' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Housing Box Assembly & Drainage',
        title: 'Construct Breathable Tiered Boxes',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Assemble two wooden boxes (60x40x25cm) with cedar/pine or fired unglazed clay. Drill a grid of 5mm drainage holes in the base of box 1, and 2mm ventilation holes along upper side walls. Place over a collection tray to catch liquid leachate.',
        criticalCheck: 'Ensure no splinters or sharp wire meshes obstruct worm migration.'
      },
      {
        stepNumber: 2,
        phase: 'Carbon Bedding Conditioning',
        title: 'Soak & Squeeze Unbleached Bedding',
        timing: 'Day 1 (Midday)',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Tear corrugated brown cardboard, dried banana leaves, and coir into 2cm strips. Soak in clean rainwater for 2 hours. Squeeze out excess water until 75% damp. Fluff bedding into the box to a depth of 15cm.',
        criticalCheck: 'Bedding must be loose and airy, never pressed down into a dense soggy mat.'
      },
      {
        stepNumber: 3,
        phase: 'Colony Stocking & Acclimatization',
        title: 'Introduce Earthworm Colony in Shade',
        timing: 'Day 1 (Late Afternoon)',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Gently place 500g of live worms onto the bedding surface. Do not bury them; let them burrow down naturally away from light. Cover with a damp burlap cloth. Place the bin in a cool, deep shade corridor.',
        criticalCheck: 'Worms must burrow down within 15 minutes; if they flee upward, bedding is too acidic or wet.'
      },
      {
        stepNumber: 4,
        phase: 'Micro-Feeding & Grit Supplementation',
        title: 'Feed Chopped Scraps with Eggshell Grit',
        timing: 'Every 3 to 4 Days',
        seasonalWindow: 'Continuous Operation',
        instructions: 'Bury small pockets of finely chopped vegetable peels, sweet potato scraps, and aged cow manure 5cm under bedding. Sprinkle 1 teaspoon of finely crushed eggshells over the food pocket. Cover with burlap.',
        criticalCheck: 'Never feed onions, hot peppers, citrus peels, greasy oils, or fresh animal meat.'
      },
      {
        stepNumber: 5,
        phase: 'Harvesting Castings via Side-Migration',
        title: 'Harvest Pure Castings & Brew Foliar Tea',
        timing: 'Every 4 to 6 Weeks',
        seasonalWindow: 'Continuous Operation',
        instructions: 'Move all fresh feed to one side of the bin for 7 days. Once worms migrate to the feed side, scoop out the black, crumbly castings from the opposite half. Sift through a 3mm mesh to return cocoons.',
        criticalCheck: 'Castings should smell sweet and earthy, resembling rich black forest humus.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Sour Anaerobic Odor & Worm Mass Exodus',
        symptom: 'Worms clumping at lid edges, foul sour fermentation smell',
        rootCause: 'Over-feeding wet scraps in low oxygen, causing anaerobic bacterial rotting',
        fieldRemedy: 'Remove unconsumed rotting food immediately, mix in dry shredded cardboard, and leave lid off for 6h in indirect light.'
      },
      {
        pitfall: 'Ant Infestation in Worm Bedding',
        symptom: 'Trails of black/red ants invading bin and attacking earthworms',
        rootCause: 'Bin legs resting directly on dry ground with un-moistened surrounding perimeter',
        fieldRemedy: 'Place each bin leg into a shallow can filled with water or vegetable oil (moat barrier).'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Bio-Intensive Nursery & Liquid Tea Sizer',
      hint: 'Calculate castings requirements for seedling potting soil and worm tea foliar spray.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Monthly Cycle',
      label: 'Castings Sifting & Tea Brewing',
      targetAction: 'Harvest 25kg castings monthly to top-dress greenhouse seedlings and nursery beds.'
    }
  },

  'water-conservation-retention': {
    blueprint: {
      dimensionsAndRatios: [
        'Contour Swale Trench: 50cm (width) x 30cm (depth) flat-bottom level trench along elevation contour',
        'Downhill Msozi Berm: 60cm wide x 35cm high rounded earth mound on downhill edge of trench',
        'Vetiver Root Hedge: Double row spaced 15cm apart, slips planted every 10cm along the berm crown',
        'Level Sill Spillway: 1.5m wide stone-armored discharge sill set 10cm below berm crest at swale ends'
      ],
      sizingFormulas: [
        'Swale Water Holding Capacity = 0.50m (width) × 0.30m (depth) = 0.15 m³ water per linear meter (150 Liters/meter)',
        'Contour Spacing on 5% Slope = Vertical drop of 1.5m between swales = ~30 meters horizontal spacing'
      ],
      metrics: [
        { label: 'Trench Gradient Tolerance', value: '0.00% (Dead Level)', detail: 'Surveyed with A-frame plumb bob; prevents destructive water pooling' },
        { label: 'Infiltration Rate per Meter', value: '150 Liters / Lin. Meter', detail: 'Infiltrates runoff into subsoil water table within 24-48 hours' },
        { label: 'Vetiver Root Penetration', value: '3.0m – 4.0m deep', detail: 'Dense vertical root curtain locking subsoil and preventing berm blowouts' },
        { label: 'Spillway Safety Freeboard', value: '10cm Below Crest', detail: 'Safely discharges cyclonic flash flood overflow without eroding ridge' }
      ]
    },
    materials: [
      { name: 'Calibrated Wooden A-Frame & Plumb Line', localAvailability: 'Crafted on homestead with timber & mason twine', purpose: 'Surveying absolute dead-level elevation contours across slope' },
      { name: 'Bamboo Marking Pegs & Mallet', localAvailability: 'Local riverbank bamboo stands', purpose: 'Pinning contour line every 3 meters across field landscape' },
      { name: 'Malawian Makhasu (Hoes) & Round-Point Shovels', localAvailability: 'Local market blacksmiths', purpose: 'Excavating trench and mounding soil onto downhill berm' },
      { name: 'Vetiver Grass (Chrysopogon zizanioides) Slips', localAvailability: 'Agricultural research stations (Chitedze/Bvumbwe)', purpose: 'Deep living root reinforcement along contour berm crest' },
      { name: 'Flat Granite River Boulders', localAvailability: 'Nearby river gullies or quarry deposits', purpose: 'Armoring level sill overflow spillways to prevent gully cuts' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'A-Frame Calibration & Zero-Point Marking',
        title: 'Calibrate Wooden A-Frame on Level Ground',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Hot Dry Preparation (September–October)',
        instructions: 'Construct a 2m wooden A-frame with a plumb line hanging from the apex. Place feet on two spots, mark plumb position A. Reverse feet 180° into exact same spots, mark plumb position B. The exact midpoint between A and B is the true level mark.',
        criticalCheck: 'Re-verify level center before surveying any landscape contours.'
      },
      {
        stepNumber: 2,
        phase: 'Contour Line Surveying Across Acreage',
        title: 'Walk the Landscape & Stake Contour Pegs',
        timing: 'Day 1–2',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Start at the high point of the field. Place front foot of A-frame on starting peg. Pivot rear foot up and down the slope until the plumb bob aligns perfectly with the true level center mark. Drive a peg at the rear foot. Walk the entire field width.',
        criticalCheck: 'Contour line must follow the natural curve of the hill without any slope tilt.'
      },
      {
        stepNumber: 3,
        phase: 'Trench Excavation & Downhill Mounding',
        title: 'Excavate 50x30cm Trench & Shape Downhill Berm',
        timing: 'Day 3–5',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Dig a flat-bottom ditch 50cm wide and 30cm deep following the pegged contour line. Throw all excavated earth onto the downhill side. Shape the excavated earth into a wide, rounded mound (msozi berm) 60cm wide at base.',
        criticalCheck: 'Keep trench bottom flat; do NOT dig a V-shaped trench as it reduces water retention.'
      },
      {
        stepNumber: 4,
        phase: 'Level Sill Overflow Spillway Armoring',
        title: 'Pave Emergency Flood Spillways with Flat Stones',
        timing: 'Day 6',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'At both ends of the swale, cut a 1.5m wide level sill outlet set exactly 10cm lower than the berm crest. Armor this outlet and downhill splash apron with flat interlocking granite river stones to dissipate water energy.',
        criticalCheck: 'Spillway must discharge excess storm water into a designated vegetated dambo or pond.'
      },
      {
        stepNumber: 5,
        phase: 'Vegetative Anchoring & Organic Infill',
        title: 'Plant Vetiver Hedge & Pack Infiltration Trench',
        timing: 'First Rains (November)',
        seasonalWindow: 'Rainy Planting Window',
        instructions: 'Plant trimmed Vetiver grass slips in a dense double row (10cm spacing) along the berm crest. Fill the swale trench with coarse corn cobs, dry tree branches, and woodchips to filter silt and eliminate standing mosquito water.',
        criticalCheck: 'Water should soak into the mulch within 24-36 hours, leaving no standing mosquito pools.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Off-Contour Slope Tilt in Swale Trench',
        symptom: 'Water rushes to one low point in the swale, overtopping and breaching the berm during storm',
        rootCause: 'Imprecise A-frame surveying or miscalibrated center mark causing a downhill ditch slope',
        fieldRemedy: 'Locate low spot, backfill trench floor until dead level, and raise berm crest 15cm at the breach zone.'
      },
      {
        pitfall: 'Unarmored Spillway Causing Downslope Gully',
        symptom: 'Rapid erosion canyon cutting backward toward swale from the overflow outlet',
        rootCause: 'Failing to pave level sill with interlocking river stones and splash apron',
        fieldRemedy: 'Pack eroded channel with stone check dams and pave level discharge sill with flat granite boulders.'
      }
    ],
    calculator: {
      tab: 'rainwater',
      title: 'Rainwater Catchment & Contour Swale Sizer',
      hint: 'Calculate linear meters of swales and water volume stored across your acreage.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Contour Swale Excavation Season',
      targetAction: 'Dig all swales and pave stone spillways during the dry season before torrential rains arrive.'
    }
  },
  'sda-true-education-curriculum': {
    id: 'sda-true-education-curriculum',
    engineeringSpecs: {
      title: 'Avondale-Model Outpost School & Vocational Training Specifications',
      blueprintName: 'Head-Hand-Heart Balanced Daily Schedule & Student Plot Layout',
      dimensions: '5m × 5m (25 m²) Individual Student Raised Plot + 6m × 8m Timber & Tailoring Workshop',
      capacityOrYield: '3.5 hrs Sacred/Scientific Study + 3.5 hrs Vocational/Agricultural Mastery daily',
      criticalTolerance: 'Zero passive screen/cramming fatigue; 1:1 teacher-student field mentorship ratio',
      diagramType: 'soil_bed',
      keyMetrics: [
        { label: 'Morning Study Block', value: '08:00 – 11:30' },
        { label: 'Afternoon Trade Block', value: '13:30 – 16:30' },
        { label: 'Student Plot Size', value: '5m × 5m (25 m²)' },
        { label: 'Core Trades Mastered', value: '6 Self-Supporting Trades' }
      ]
    },
    materials: [
      { name: 'Bible (KJV) & Spirit of Prophecy Education Library', localAvailability: 'Malawi Union / ABC Bookstores & Offline Digital Archive', purpose: 'Foundational morning study in sacred history, prophecy, physiology, and nature parables' },
      { name: 'Junior Broadfork, Light Hoe (Khasu) & Steel Rake', localAvailability: 'Local blacksmith forged to child/youth height', purpose: 'Cultivating individual 25m² student garden plots without spinal strain' },
      { name: 'Double-Entry Homestead Ledger & Measuring Tape', localAvailability: 'Stationery suppliers (Blantyre / Lilongwe / Mzuzu)', purpose: 'Teaching practical arithmetic, seed-to-harvest yields, tithe calculation, and debt-free bookkeeping' },
      { name: 'Hand Carpentry Toolkit (Tenon Saw, Chisel, Jack Plane, Try-Square)', localAvailability: 'Hardware stores & rural tool markets', purpose: 'Afternoon vocational training in timber joinery, beehive building, and roof framing' },
      { name: 'Soil pH Test Strips, Hand Lens (10x) & Rain Gauge', localAvailability: 'Agricultural supply depots', purpose: 'Connecting botany, soil biology, and meteorology directly to field observation' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Morning Sacred & Scientific Foundation (08:00–11:30)',
        title: 'Conduct Morning Worship, Physiology & Practical Mathematics',
        timing: 'Daily 08:00 – 11:30',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Begin at sunrise with family worship, Scripture memorization, and sacred singing. Dedicate 08:00–11:30 to high-focus mental work: Bible history, human physiology and hygiene, practical geometry/arithmetic applied to building and land measurement, and agricultural botany.',
        criticalCheck: 'Ensure study room has cross-ventilation and natural daylight; pause every 50 minutes for 10 minutes of deep breathing and calisthenics.'
      },
      {
        stepNumber: 2,
        phase: 'Individual Student Plot Stewardship',
        title: 'Survey & Cultivate Dedicated 5m × 5m Youth Garden Plots',
        timing: 'Daily 11:30 – 12:15',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Assign each child or youth a staked 5m × 5m garden plot. Guide them to test soil texture, apply 10cm of compost and leaf mulch, sow heirloom vegetables and legumes, and manage drip/watering schedules independently.',
        criticalCheck: 'Parents and teachers must work alongside students with their own hands, dignifying labor as noble co-working with God.'
      },
      {
        stepNumber: 3,
        phase: 'Vocational Trade Rotation (13:30–16:30)',
        title: 'Apprentice in Carpentry, Masonry, Tailoring & Hydrotherapy',
        timing: 'Daily 13:30 – 16:30',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Rotate older children and youth through 6-week practical trade modules: (1) Carpentry & furniture joinery, (2) Compressed Earth Block (CEB) masonry, (3) Fruit tree grafting & nursery care, (4) Treadle sewing & garment making, (5) Hygienic breadmaking & food preservation, and (6) Simple hydrotherapy & first aid.',
        criticalCheck: 'Every student must produce functional, durable homestead goods rather than mere theoretical exercises.'
      },
      {
        stepNumber: 4,
        phase: 'Double-Entry Bookkeeping & Economic Stewardship',
        title: 'Log Harvest Weights, Expenses & Tithe in Farm Ledgers',
        timing: 'Weekly (Friday Morning)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Have students weigh harvested produce from their plots, calculate input costs vs. market value, set aside 10% sacred tithe and freewill offerings, and balance their personal account ledger to master debt-free financial stewardship.',
        criticalCheck: 'Verify mathematical accuracy and reinforce the counsel: "Owe no man anything."'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Treating Manual Labor as Drudgery or Punishment',
        symptom: 'Youth resent garden and workshop hours, viewing book learning as superior to hand labor',
        rootCause: 'Adults sitting idle or issuing commands from the shade instead of sharing joyfully in the physical work and explaining the science behind every task',
        fieldRemedy: 'Teachers and parents must lead with tool in hand, turning every furrow, graft, and mortise joint into a living object lesson in natural law.'
      },
      {
        pitfall: 'Mental Exhaustion from Unbalanced Book Cramming',
        symptom: 'Headaches, sluggish digestion, irritability, and myopia in children',
        rootCause: 'Exceeding 3.5 hours of sedentary indoor textbook study without outdoor muscular exercise and oxygen circulation',
        fieldRemedy: 'Strictly enforce the half-day mental, half-day manual balance counselled in Testimonies Vol. 6 and Education.'
      }
    ],
    calculator: {
      tab: 'compost',
      title: 'Student Garden Plot & Compost Calculator',
      hint: 'Calculate compost volume and plant spacing for youth training plots.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'January – December',
      label: 'Continuous Head-Hand-Heart Rhythm',
      targetAction: 'Align seasonal farm tasks (November sowing, May harvest, July grafting) with science lessons.'
    }
  },
  'wholesome-breadmaking-grain-milling': {
    id: 'wholesome-breadmaking-grain-milling',
    engineeringSpecs: {
      title: 'Hygienic Whole-Grain Milling, Sweet Leaven & Zwieback Thermal Specs',
      blueprintName: 'Insulated Clay Thermal Cob Oven & Two-Stage Dextrinization Protocol',
      dimensions: '75cm Internal Dome Diameter × 48cm Crown Height (63% Door-to-Dome Ratio)',
      capacityOrYield: '8 Small Whole-Grain Loaves (450g each) + 60 Slices Shelf-Stable Zwieback per firing',
      criticalTolerance: 'Fermentation at 28°C–32°C (Zero acetic sourness; zero sodium bicarbonate/soda)',
      diagramType: 'preserve',
      keyMetrics: [
        { label: 'Starter Temp', value: '30°C (Sweet Yeast)' },
        { label: 'First Bake Temp', value: '205°C for 42 mins' },
        { label: 'Zwieback Dextrin Temp', value: '115°C for 50 mins' },
        { label: 'Zwieback Shelf Life', value: '6–9 Months Dry' }
      ]
    },
    materials: [
      { name: 'Whole Wheat, Red Sorghum (Mapira) & Finger Millet (Mawere)', localAvailability: 'Dedza/Ntcheu highlands (wheat) & regional village markets', purpose: 'Nutrient-dense whole grain berries retaining mineral-rich bran and vitamin E germ' },
      { name: 'Cast-Iron Hand Burr Mill or Stone Flour Mill', localAvailability: 'Agricultural hardware suppliers', purpose: 'Grinding fresh whole-grain flour immediately prior to baking to prevent lipid oxidation' },
      { name: 'Peeled Irish Potato, Raw Honey & Pure Spring Water', localAvailability: 'Homestead garden & apiary', purpose: 'Cultivating a rapid, sweet wild yeast starter that leavens lightly without sour acid taint' },
      { name: 'Clay-Sand Thermal Cob Oven (with Wood-Ash Base Insulation)', localAvailability: 'Constructed on homestead from anthill clay, river sand & bottles', purpose: 'Radiant thermal mass baking of small loaves followed by residual-heat Zwieback drying' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Sweet Potato-Water Yeast Cultivation',
        title: 'Prepare Non-Sour Potato Ferment at 30°C',
        timing: '18 Hours Before Baking',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Boil 1 medium peeled Irish potato in 500ml water until soft. Mash potato in the cooking water, cool to 30°C, and whisk in 2 tbsp fresh whole wheat flour and 1 tsp honey. Cover with breathable muslin in a warm corner for 16–20 hours until foamy and sweet-smelling.',
        criticalCheck: 'Smell and taste a drop of starter: it must be sweet and yeasty. If it smells sharp, vinegary, or sour, discard and restart.'
      },
      {
        stepNumber: 2,
        phase: 'Fresh Milling & Gluten Development',
        title: 'Mill Whole Grains & Knead Dough Without Soda or Milk',
        timing: 'Baking Day Morning (45 mins)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Mill clean dry whole wheat (75%) and sorghum or millet (25%) into fine whole meal. Mix with lukewarm water (not milk, which sours bread if not baked perfectly), sweet yeast starter, and 1.5% sea salt. Knead briskly for 15 minutes until smooth and elastic.',
        criticalCheck: 'Never add baking soda (saleratus) or chemical baking powders, which inflame the stomach membranes (MH 300).'
      },
      {
        stepNumber: 3,
        phase: 'Small Loaf Proofing & Thorough Thermal Baking',
        title: 'Bake Small Loaves at 205°C Until Yeast Germs Are Destroyed',
        timing: '60 mins Proof + 42 mins Bake',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Proof dough until just doubled (do not over-proof). Divide into small 450g loaves so radiant heat penetrates rapidly to the core. Bake in a pre-heated clay oven or Dutch oven at 205°C for 40–45 minutes until golden brown across top and bottom.',
        criticalCheck: 'Tap loaf bottom—it must sound hollow and reach 96°C internal core temperature. Cool 24 hours on wire racks before serving.'
      },
      {
        stepNumber: 4,
        phase: 'Zwieback (Twice-Baked Rusk) Dextrinization',
        title: 'Slow-Bake 12mm Slices at 115°C in Residual Oven Warmth',
        timing: 'Day 2 (50 mins)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Slice 24-hour cooled bread into uniform 12mm slices. Lay across wire racks in a cooling clay oven (110°C–125°C) for 45–60 minutes until crisp, bone-dry, and lightly golden right to the center.',
        criticalCheck: 'Snap a test slice in half: zero moisture must remain in the center. Store in airtight glass jars or tins.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Heavy, Sour, or Clammy Loaf Interior',
        symptom: 'Bread smells acidic and leaves a pasty, fermenting mass in the stomach after eating',
        rootCause: 'Letting dough ferment too long in hot weather, or shaping oversize loaves that fail to bake through the center',
        fieldRemedy: 'Shorten bulk rise to 60 minutes in warm Malawi weather, shape narrower loaves, and convert any slightly dense bread into crisp Zwieback.'
      },
      {
        pitfall: 'Rancid or Bitter Whole-Grain Flour',
        symptom: 'Baked bread has a soapy or bitter aftertaste',
        rootCause: 'Storing pre-ground whole-grain flour in warm humidity for weeks, causing wheat germ oils to oxidize',
        fieldRemedy: 'Store grain exclusively as whole dry berries in hermetic containers and mill only what is needed on baking day.'
      }
    ],
    calculator: {
      tab: 'pantry',
      title: 'Family Grain & Flour Reserve Calculator',
      hint: 'Calculate annual whole grain kg needed for daily family bread and Zwieback.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Weekly Rhythm (Thursday/Friday)',
      label: 'Homestead Baking & Zwieback Cycle',
      targetAction: 'Bake whole-grain loaves and Zwieback on Thursday so bread is properly cooled and ready for Friday Sabbath preparation.'
    }
  },
  'hydrotherapy-charcoal-poultice-remedies': {
    id: 'hydrotherapy-charcoal-poultice-remedies',
    engineeringSpecs: {
      title: 'Clinical Hydrotherapy & Activated Charcoal Adsorption Specifications',
      blueprintName: 'Contrast Fomentation Thermal Cycle & Hardwood Pyrolysis Activation Unit',
      dimensions: '60cm × 90cm Triple-Fold Wool Fomentation Blankets + 15cm × 15cm Poultice Pad',
      capacityOrYield: '3× Hot/Cold Vascular Pump Cycles (3 min Hot @ 46°C / 30 sec Cold @ 12°C)',
      criticalTolerance: 'Foot bath strictly 40°C–43°C; always test fomentation heat on inner wrist first',
      diagramType: 'water',
      keyMetrics: [
        { label: 'Hot Foot Bath Temp', value: '40°C → 43°C Max' },
        { label: 'Contrast Cycle Ratio', value: '3 min Hot : 30s Cold' },
        { label: 'Charcoal Particle Size', value: '< 100 Micron Powder' },
        { label: 'Poultice Mixture Ratio', value: '1:1 Charcoal to Flax/Cassava' }
      ]
    },
    materials: [
      { name: 'Heavy Wool Flannel Blankets & Absorbent Cotton Towels', localAvailability: 'Local fabric markets & blanket suppliers', purpose: 'Retaining moist steam heat during chest, spinal, and hepatic fomentations' },
      { name: 'Deep Galvanized or Heavy Plastic Foot Tub & Thermometer', localAvailability: 'Rural hardware stores', purpose: 'Submerging feet and lower calves to draw blood congestion away from brain and lungs' },
      { name: 'Clean Eucalyptus, Guava, or Peach Hardwood Billets', localAvailability: 'Homestead woodlot & orchard prunings', purpose: 'Pyrolyzing inside a sealed metal tin to produce pure medicinal-grade adsorptive charcoal' },
      { name: 'Ground Flaxseed, Slippery Elm, or Fine Cassava Meal', localAvailability: 'Homestead harvest & health stores', purpose: 'Mucilaginous binder holding moist charcoal powder smoothly against inflamed tissue without drying out' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Medicinal Hardwood Charcoal Production',
        title: 'Pyrolyze Clean Hardwood in Sealed Retort Tin & Pulverize',
        timing: '2 Hours (Stockpile in Advance)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Pack debarked, unpainted eucalyptus or fruitwood billets tightly into a metal tin with a tight lid pierced by a single 3mm nail hole. Place in a hot campfire for 60 minutes until smoke jet turns clear/stops. Plug hole with mud, let cool completely airtight, then grind in a clean mortar and sieve through fine muslin.',
        criticalCheck: 'Store pulverized charcoal in sealed glass jars; exposure to damp air prematurely saturates its microscopic adsorption pores.'
      },
      {
        stepNumber: 2,
        phase: 'Derivative Hot Foot Bath Setup',
        title: 'Immerse Feet at 40°C–43°C with Cold Cephalic Compress',
        timing: '20–30 Minutes',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Seat or lay the patient comfortably wrapped in a blanket. Immerse feet in 40°C water, gradually adding hot water along the tub edge (away from skin) up to 43°C. As the patient begins to perspire, apply a cold wrung washcloth to the forehead and base of the skull.',
        criticalCheck: 'Conclude by pouring cool water over the feet for 15 seconds to restore vascular tone, then dry thoroughly and keep warm.'
      },
      {
        stepNumber: 3,
        phase: 'Hot & Cold Contrast Fomentations',
        title: 'Apply 3 Alternations of Steaming Wool & Brief Cold Friction',
        timing: '15–20 Minutes Total',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Fold a wet towel inside a dry wool flannel cover and steam or wring from boiling water. Place over a dry towel on the patient’s chest, back, or abdomen for 3 minutes. Lift fomentation, immediately rub skin briskly for 30 seconds with a cloth wrung from cold water, dry quickly, and apply the next hot fomentation. Complete 3 full cycles.',
        criticalCheck: 'Never leave the skin chilled; always finish on the brief cold friction rub followed by immediate thorough drying and warm covering.'
      },
      {
        stepNumber: 4,
        phase: 'Adsorptive Charcoal Poultice Application',
        title: 'Mix Charcoal-Cassava Paste & Apply Over Inflammation or Bite',
        timing: '4–8 Hours (or Overnight)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Stir 3 tbsp pulverized charcoal and 3 tbsp ground flaxseed or fine cassava meal into 150ml boiling water until it forms a thick paste. Spread 6mm thick on the center of a clean cotton cloth, fold all 4 edges inward to enclose the paste, apply warm to the boil, infected wound, or sting, cover with plastic film to retain moisture, and bind with a dry cloth.',
        criticalCheck: 'Do not apply raw black charcoal powder directly into deep open surgical wounds where tattooing could occur—always enclose inside the porous cotton poultice cloth.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Cutaneous Burn on Insensitive Skin',
        symptom: 'Excessive redness or blistering under fomentation pad',
        rootCause: 'Insufficient dry towel insulation underneath the steaming fomentation cloth, or treating a patient with diabetic neuropathy using excessive heat',
        fieldRemedy: 'Always place at least two layers of dry Turkish toweling between skin and hot fomentation, and lift immediately to fan if the patient feels stinging heat.'
      },
      {
        pitfall: 'Charcoal Poultice Drying into a Hard Cake',
        symptom: 'Poultice becomes stiff and stops drawing inflammation after 2 hours',
        rootCause: 'Omitting the mucilaginous binder (flaxseed/cassava meal) or omitting the outer moisture-barrier wrap',
        fieldRemedy: 'Always blend 1:1 with flaxseed or cassava starch and cover the cotton poultice exterior with a piece of banana leaf or plastic wrap under the wool bandage.'
      }
    ],
    calculator: {
      tab: 'rainwater',
      title: 'Pure Water Storage & Filtration Sizer',
      hint: 'Ensure abundant filtered rainwater storage for hydrotherapy and homestead sanitation.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Rainy Malaria & Cold Chiperoni Seasons',
      label: 'Outpost Medical Missionary Readiness',
      targetAction: 'Keep 2kg of pulverized hardwood charcoal and clean wool fomentation blankets ready in the homestead apothecary chest.'
    }
  },
  'plant-protein-nut-milks-oil-pressing': {
    id: 'plant-protein-nut-milks-oil-pressing',
    engineeringSpecs: {
      title: 'Off-Grid Plant Protein Extraction, Tofu Coagulation & Oil Pressing Specs',
      blueprintName: 'Manual Lever Oilseed Ram-Press & Thermal Soy/Groundnut Dairy System',
      dimensions: '20cm × 15cm × 12cm Hardwood Tofu Mold + Manual High-Pressure Lever Oil Press',
      capacityOrYield: '4L Rich Soy/Groundnut Milk + 650g Firm Tofu OR 320ml Virgin Oil per kg seed',
      criticalTolerance: 'Boil raw soy milk 20 mins @ 98°C+; Coagulate curds strictly at 76°C–80°C',
      diagramType: 'preserve',
      keyMetrics: [
        { label: 'Soy Enzyme Boil', value: '20 mins @ Rolling Boil' },
        { label: 'Curd Coagulation Temp', value: '78°C (Lemon / Nigari)' },
        { label: 'Sprouting Vitamin C Gain', value: '+300% in 72 Hours' },
        { label: 'Sunflower Oil Yield', value: '30%–35% by Weight' }
      ]
    },
    materials: [
      { name: 'Non-GMO Soybeans, Shelled Groundnuts & Mung Beans', localAvailability: 'Grown on homestead nitrogen-fixing garden beds', purpose: 'Primary complete plant protein, lecithin, and calcium sources replacing dairy and meats' },
      { name: 'Black-Hulled Oilseed Sunflower & Moringa oleifera Seeds', localAvailability: 'Homestead field borders & living fence trees', purpose: 'Cold-pressing fresh, unrefined culinary oils rich in Vitamin E and oleic fatty acids' },
      { name: 'Fine Weave Unbleached Muslin Filter Bags', localAvailability: 'Sewn on homestead treadle machine', purpose: 'Separating smooth plant milk from fibrous okara pulp' },
      { name: 'Perforated Hardwood Tofu Press Box', localAvailability: 'Crafted in homestead carpentry shop', purpose: 'Pressing coagulated soy curds into firm, sliceable protein blocks' },
      { name: 'Fresh Lemons/Limes or Food-Grade Magnesium Chloride (Nigari)', localAvailability: 'Homestead citrus orchard', purpose: 'Natural acid/mineral coagulant precipitating dissolved soy protein into tender curds' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Soaking, Dehulling & Wet Milling',
        title: 'Hydrate 500g Soybeans for 10 Hours & Grind Slurry',
        timing: 'Day 1 Evening → Day 2 Morning',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Soak 500g clean soybeans in 2L cool water for 10 hours. Rub beans vigorously between hands to float off hulls. Grind hydrated beans with 3.5L clean water using a wet burr grinder or heavy mortar until milky and fine. Squeeze through a muslin bag to extract raw soy milk.',
        criticalCheck: 'Save the high-fiber okara pulp remaining in the bag to mix into whole-grain bread dough or savory herb patties.'
      },
      {
        stepNumber: 2,
        phase: 'Thermal Enzyme Inactivation & Curd Coagulation',
        title: 'Simmer Milk 20 Mins, Cool to 78°C & Stir in Citrus Coagulant',
        timing: '45 Minutes',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Bring raw soy milk to a boil in a heavy stainless pot, stirring bottom constantly to prevent scorching, and simmer for 20 full minutes. Remove from heat and cool to 78°C. Dissolve 60ml fresh lemon juice in 100ml warm water; pour half into the milk using a slow figure-8 stroke, wait 3 minutes, gently stir in the remainder, and cover for 15 minutes.',
        criticalCheck: 'Curds should separate cleanly from translucent yellowish whey. Ladle into cloth-lined wooden press box and weight with a 2kg clean stone for 30 minutes.'
      },
      {
        stepNumber: 3,
        phase: '72-Hour Bio-Activated Legume Sprouting',
        title: 'Sprout Mung Beans & Lentils in Shaded Glass Jars',
        timing: '3 Days (2 mins/day maintenance)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Soak 1 cup mung beans or brown lentils for 8 hours in a wide-mouth jar covered with clean mosquito mesh or muslin. Drain completely, invert jar at a 45° angle in a shaded bowl, and rinse with cool filtered water every morning and evening for 3 days until sprouts reach 2cm.',
        criticalCheck: 'Keep jar out of direct sunlight and ensure complete water drainage after each rinse so sprouts stay crisp and sweet.'
      },
      {
        stepNumber: 4,
        phase: 'Manual Cold Oil Pressing & Gravity Clarification',
        title: 'Press Sun-Dried Sunflower/Moringa Seeds at <8% Moisture',
        timing: '2 Hours + 48 Hours Settling',
        seasonalWindow: 'Harvest & Storage',
        instructions: 'Sun-dry clean black sunflower seeds or dehulled Moringa seeds until crisp (<8% moisture). Warm seeds slightly in the sun (40°C) and feed into a manual lever ram-press. Collect raw oil in a stainless pail, pour into tall glass carboys, and allow fine seed sediment to settle for 48 hours before decanting clear golden oil.',
        criticalCheck: 'Use residual high-protein sunflower press-cake as prized poultry feed or compost activator.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Tofu Fails to Coagulate or Remains Milky',
        symptom: 'White curds do not separate from clear whey after adding lemon juice',
        rootCause: 'Milk temperature was too cool (<70°C) or too hot (>90°C), or insufficient coagulant was added',
        fieldRemedy: 'Re-warm milk gently to 78°C and drizzle an additional 20ml of diluted lemon juice slowly across the surface.'
      },
      {
        pitfall: 'Digestive Heaviness After Eating Nut Dishes',
        symptom: 'Stomach fullness or slow digestion after nut-based meals',
        rootCause: 'Using excessive quantities of concentrated nut fats without sufficient dilution or combining too many rich dishes at one meal',
        fieldRemedy: 'Follow Ellen White’s strict proportion in Counsels on Diet and Foods (p. 351): use only 1/10th to 1/6th part nut preparation mixed with grains or vegetables.'
      }
    ],
    calculator: {
      tab: 'pantry',
      title: 'Legume & Oilseed Pantry Reserve Sizer',
      hint: 'Calculate annual kg of soybeans, groundnuts, and oilseeds required for family nutrition.'
    },
    almanac: {
      season: 'Harvest & Storage',
      monthWindow: 'April – June (Main Harvest) & Year-Round Processing',
      label: 'Oilseed Pressing & Legume Storage Window',
      targetAction: 'Harvest and dry soybeans, groundnuts, and sunflowers in May; press fresh oil and make tofu weekly year-round.'
    }
  },
  'wood-ash-soap-natural-fibers-tailoring': {
    id: 'wood-ash-soap-natural-fibers-tailoring',
    engineeringSpecs: {
      title: 'Potash Lye Leaching, Hot-Process Saponification & Treadle Tailoring Specs',
      blueprintName: 'Straw-Filtered Hardwood Ash Leaching Barrel & Cast-Iron Treadle Station',
      dimensions: '60L Ash Leaching Drum (10cm Gravel + 10cm Straw Bed) + 12-Bar Wooden Soap Mold',
      capacityOrYield: '3.5 kg Antiseptic Neem-Sunflower Homestead Soap per batch (Zero chemical inputs)',
      criticalTolerance: 'Lye Specific Gravity ~1.08 (Fresh egg floats with 2cm coin-sized crown exposed)',
      diagramType: 'preserve',
      keyMetrics: [
        { label: 'Lye Density Check', value: 'Egg / Potato Float Test' },
        { label: 'Saponification Cook', value: '2.5 hrs @ Low Simmer' },
        { label: 'Bar Curing Window', value: '3–4 Weeks Ventilated' },
        { label: 'Garment Pattern Rule', value: 'Shoulder-Supported / Zero Waist Constriction' }
      ]
    },
    materials: [
      { name: 'White Sifted Hardwood Ash (Acacia, Mango, Combretum)', localAvailability: 'Collected daily from homestead rocket stove & bread oven', purpose: 'Rich in soluble potassium carbonate for leaching natural KOH lye' },
      { name: 'Soft Collected Rainwater', localAvailability: 'Homestead rainwater harvesting tank', purpose: 'Percolating through hardwood ash without calcium/magnesium mineral interference' },
      { name: 'Pressed Sunflower, Coconut, or Moringa Oil + Beeswax', localAvailability: 'Homestead oil press & apiary', purpose: 'Fatty acids that react with potash lye to form gentle cleansing soap and glycerin' },
      { name: 'Dried Neem Leaf Powder, Aloe Vera Gel & Sea Salt', localAvailability: 'Homestead medicinal garden', purpose: 'Antiseptic skin protection and sodium-chloride salting-out to harden potash soap bars' },
      { name: 'Cast-Iron Foot-Treadle Sewing Machine & Heavy Cotton Twill/Linen', localAvailability: 'Local tailoring markets & fabric depots', purpose: 'Sewing durable, non-constricting country work garments and thermal cookers without grid power' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Ash Leaching Barrel Assembly & Lye Percolation',
        title: 'Leach White Hardwood Ash with Rainwater to Specific Gravity 1.08',
        timing: 'Day 1 (24 Hours Drip)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Place a wooden or heavy plastic barrel on brick piers over a stainless or glass collection basin. Pack a 10cm layer of washed river pebbles at the bottom spigot, topped with 10cm of crisscrossing dry straw. Pack barrel tightly with cold, white sifted hardwood ash. Pour soft rainwater slowly into a hollow depression on top until amber lye drips out bottom.',
        criticalCheck: 'Float a fresh raw chicken egg or peeled potato cube in the collected lye: if it sinks, pour the lye back through fresh ash; when a coin-sized circle floats above the surface, concentration is exact.'
      },
      {
        stepNumber: 2,
        phase: 'Hot-Process Saponification & Salting-Out',
        title: 'Simmer Lye & Homestead Oils in Stainless Pot Until Trace',
        timing: 'Day 2 (2.5–3 Hours)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Pour 2L strained potash lye and 1.5L warm sunflower/moringa oil (plus 100g melted beeswax for hardness) into a heavy stainless steel or cast-iron pot (NEVER aluminum). Bring to a gentle simmer outdoors, stirring frequently for 2.5 hours until the mixture thickens into a translucent gel that ribbons off the wooden spoon without oil separation.',
        criticalCheck: 'Stir in 3 tbsp dissolved sea salt during the final 20 minutes to convert portion of soft potassium soap into firmer sodium soap bars, plus 2 tbsp neem powder.'
      },
      {
        stepNumber: 3,
        phase: 'Molding, Wire Cutting & Ventilated Curing',
        title: 'Pour into Cloth-Lined Wooden Molds & Cure for 21 Days',
        timing: '48 Hours Mold + 3 Weeks Cure',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Pour thick saponified soap into a wooden mold box lined with damp cotton cloth. Insulate with a towel for 48 hours, unmold, slice into uniform bars using taut brass wire or twine, and stack with 2cm air gaps on slatted bamboo racks for 3–4 weeks.',
        criticalCheck: 'Test cured bar pH with a strip or brief tongue-tip touch: zero sharp zap should remain, indicating complete saponification.'
      },
      {
        stepNumber: 4,
        phase: 'Treadle Machine Maintenance & Physiological Garment Drafting',
        title: 'Oil Treadle Bearings & Sew Shoulder-Supported Work Apparel',
        timing: 'Weekly Domestic Workshop',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Clean lint from the shuttle race of the foot-treadle sewing machine and apply 1 drop of fine oil to all moving pivot bearings. Draft family work trousers, aprons, and modest dresses from breathable cotton twill, using button-on shoulder straps or yokes so garment weight rests on the shoulders rather than constricting the waist and diaphragm.',
        criticalCheck: 'Ensure ankles and wrists are protected during cool highland mornings and field work, fulfilling the healthful dress principles of Education (p. 248).'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Weak Lye That Fails to Saponify Oil',
        symptom: 'Oil floats on top of liquid even after 2 hours of boiling',
        rootCause: 'Using ash from softwood pine, damp rain-leached firepits, or pouring hard borehole water too rapidly through the barrel',
        fieldRemedy: 'Boil the weak lye down in a stainless pot to evaporate excess water until a fresh egg floats to the proper 2cm crown level.'
      },
      {
        pitfall: 'Treadle Sewing Machine Skipping Stitches or Snapping Thread',
        symptom: 'Irregular bottom seam loops or frequent upper thread breakage on heavy canvas/cotton',
        rootCause: 'Blunt or slightly bent needle, or dried gummed vegetable oil in the shuttle race',
        fieldRemedy: 'Flush shuttle mechanism with kerosene, wipe dry, lubricate with light sewing machine oil, and install a fresh Size 16/100 heavy-duty needle.'
      }
    ],
    calculator: {
      tab: 'rainwater',
      title: 'Soft Rainwater Catchment Sizer',
      hint: 'Size rainwater storage for clean ash-lye leaching and homestead laundry.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Quarterly Soap Batch & Dry Season Tailoring',
      label: 'Domestic Economy & Sanitation Schedule',
      targetAction: 'Stockpile dry white hardwood ash from winter cooking fires in covered drums for quarterly soap boiling.'
    }
  },
  'sabbath-sanctuary-fireless-thermal-cooking': {
    id: 'sabbath-sanctuary-fireless-thermal-cooking',
    engineeringSpecs: {
      title: 'Fireless Thermal Retention Cooker (Hay-Box) & Rocket Stove Specifications',
      blueprintName: '10cm Insulated Rice-Hull Thermal Bag & Clay-Pumice L-Tube Rocket Stove',
      dimensions: '65cm Outer Bag Diameter × 45cm Inner Pot Cavity (100mm Rice-Hull/Kapok Wall)',
      capacityOrYield: 'Maintains 6L Stockpot > 68°C for 12–16 Hours (Zero Sabbath Fuel or Fire)',
      criticalTolerance: 'Food must boil 15 full mins before sealing; never open lid until mealtime',
      diagramType: 'preserve',
      keyMetrics: [
        { label: 'Pre-Boil Duration', value: '15 Mins Rolling Boil' },
        { label: '12-Hour Temp Retention', value: '68°C – 74°C (Food Safe)' },
        { label: 'Firewood Savings', value: '75% – 80% Reduction' },
        { label: 'Friday Cutoff Target', value: '30 Mins Before Sunset' }
      ]
    },
    materials: [
      { name: 'Heavy Cotton Canvas or Chitenge Fabric (3 Meters)', localAvailability: 'Local village tailors & fabric markets', purpose: 'Sewing concentric inner and outer cylinders plus top insulating crown pillow' },
      { name: 'Dry Rice Hulls, Raw Kapok Fiber, or Shredded Maize Husks', localAvailability: 'Rice mills (Karonga/Salima/Zomba) or homestead harvest', purpose: 'Trapping millions of microscopic dead-air pockets for ultra-low thermal conductivity' },
      { name: 'Heavy-Gauge Stainless Steel Pot with Tight-Fitting Lid', localAvailability: 'Household kitchenware suppliers', purpose: 'Retaining thermal mass and preventing convective steam loss inside the thermal cooker' },
      { name: 'Anthill Clay, Coarse River Sand & Crushed Charcoal Insulation', localAvailability: 'Homestead earth & firepit', purpose: 'Molding high-draft insulated rocket stove for rapid Friday preparation boiling' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Sewing & Packing the Fireless Thermal Cooker',
        title: 'Construct Concentric Cotton Bags Packed with 10cm Dry Rice Hulls',
        timing: '1 Afternoon (Treadle Sewing)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Cut and sew two round-bottomed fabric bags (outer bag 65cm diameter, inner lining 45cm diameter) stitched together at the top drawstring collar. Pack the 10cm space between inner and outer walls firmly with bone-dry rice hulls, kapok fiber, or raw washed sheep wool. Sew a matching 45cm diameter × 12cm thick circular top cushion filled with the same insulation.',
        criticalCheck: 'Include a removable waterproof or washable cotton liner at the bottom to catch any condensation drips.'
      },
      {
        stepNumber: 2,
        phase: 'Insulated Clay Rocket Stove Firing',
        title: 'Bring Friday Stews & Grains to a 15-Minute Rolling Boil',
        timing: 'Friday Afternoon (14:30 – 16:00)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Kindle small dry twigs in the horizontal feed tube of the insulated clay rocket stove. Place a tightly lidded pot of soaked beans, brown rice, or root vegetable stew (filled to at least 80% pot capacity for high thermal mass) over the chimney and boil vigorously for 15 minutes so heat penetrates the center of every bean or grain.',
        criticalCheck: 'Half-empty pots lose heat twice as fast; always use a pot size that matches the volume of food being cooked.'
      },
      {
        stepNumber: 3,
        phase: 'Hermetic Thermal Sealing for Sabbath Readiness',
        title: 'Transfer Boiling Pot Immediately into Thermal Cooker & Cinch Tight',
        timing: 'Friday 16:00 (Or Re-Boil Early Sabbath Morning if Needed)',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Without lifting the pot lid, lift the boiling pot straight from the stove into the center of the thermal cooker (set on a wooden trivet disk). Place the thick insulated top pillow tightly over the pot lid, draw the outer drawstring cord shut, and place in a warm, draft-free pantry corner.',
        criticalCheck: 'Never lift the lid to "check" the food—opening the seal for even 10 seconds drops internal steam temperature by 10°C–15°C.'
      },
      {
        stepNumber: 4,
        phase: 'Friday Sundown Preparation & Sabbath Outpost Ministry',
        title: 'Complete All Bathing, Boot Cleaning & Sanctuary Readiness 30 Mins Before Sunset',
        timing: 'Friday 17:00 → Sabbath Sunset',
        seasonalWindow: 'Year-Round / Any Season',
        instructions: 'Finish all sweeping, dishwashing, tool storage, and bathing 30 minutes before Friday sunset. Gather as a family with clean Sabbath garments to sing hymns, read Scripture, and welcome the sacred rest. On Sabbath afternoon, carry literature, audio-Bibles, and fresh fruit to encourage neighboring village families.',
        criticalCheck: '"On Friday let the preparation for the Sabbath be completed... Let the boots be blacked and the baths be taken." (6T 355.3)'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Food Lukewarm (<55°C) After 8 Hours in Thermal Bag',
        symptom: 'Stew or beans cool down prematurely overnight',
        rootCause: 'Pot was less than half full, insulation settled leaving thin spots around the top rim, or pot was placed directly on a cold concrete floor without a bottom wooden disk',
        fieldRemedy: 'Place a 3cm wooden disk under the pot inside the bag, pack extra kapok/rice hulls into the upper collar, and always fill the pot to 80%+ capacity.'
      },
      {
        pitfall: 'Damp Insulation Inside Thermal Cooker',
        symptom: 'Musty smell and reduced heat retention',
        rootCause: 'Steam escaping from a loose pot lid condensing into the rice-hull insulation',
        fieldRemedy: 'Fold a clean kitchen towel over the pot lid before closing to absorb stray steam, and sun-dry the thermal bag thoroughly every Monday.'
      }
    ],
    calculator: {
      tab: 'pantry',
      title: 'Homestead Pantry & Fuel Sizer',
      hint: 'Calculate dry legume and grain storage alongside 75% firewood reduction.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Every Friday Preparation Day',
      label: 'Weekly Sabbath Sanctuary Rhythm',
      targetAction: 'Prepare all Sabbath meals and thermal cookers every Friday afternoon before the sun sinks behind the hills.'
    }
  },
  ...FARMING_PROTOCOLS,
  ...SOIL_BREEDING_PROTOCOLS,
  ...WATER_ENERGY_PROTOCOLS,
  ...PRESERVATION_CONSTRUCTION_PROTOCOLS
};

