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
  tab: 'solar' | 'rainwater' | 'yield' | 'food' | 'land' | 'budget';
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
  blueprint: TechnicalBlueprint;
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
  ...FARMING_PROTOCOLS,
  ...SOIL_BREEDING_PROTOCOLS,
  ...WATER_ENERGY_PROTOCOLS,
  ...PRESERVATION_CONSTRUCTION_PROTOCOLS
};

