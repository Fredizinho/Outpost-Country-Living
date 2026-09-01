import { DetailedSkillProtocol } from '../skillsTechnicalProtocols';

export const FARMING_PROTOCOLS: Record<string, DetailedSkillProtocol> = {
  'drought-resistant-crops': {
    blueprint: {
      dimensionsAndRatios: [
        'Planting Station Grid: 75cm row spacing x 60cm between stations (Pfumvudza / Foundations for Farming grid)',
        'Station Pit Dimensions: 15cm (length) x 15cm (width) x 15cm (depth) dug with hoe (Khasu)',
        'Organic Basal Manure Application: 1 double-handful (~500g) of cured compost/manure per station pit',
        'Mulch Cover Target: 100% soil coverage with 5cm–8cm dry maize stover, grass, or sorghum stalks (God\'s Blanket)'
      ],
      sizingFormulas: [
        'Pfumvudza Standard Plot = 39m × 16m = 624 m² (1/16th hectare), containing exactly 1,456 planting stations',
        'Yield Expectation = 1 Pfumvudza plot with Sorghum/Pearl Millet yields ~800kg–1,200kg grain (1 year family staple)'
      ],
      metrics: [
        { label: 'Planting Station Spacing', value: '75cm × 60cm', detail: 'Precision grid optimizing root water catchment & canopy shade' },
        { label: 'Compost per Station', value: '500g Humus', detail: 'Concentrated nutrition directly beneath root crown' },
        { label: 'Sorghum/Millet Seed Depth', value: '2.0cm – 3.0cm', detail: 'Shallow precision sowing prevents seedling exhaustion' },
        { label: 'Mulch Shield Efficiency', value: '100% Cover (5cm deep)', detail: 'Reduces soil evaporation by 65% and stops crusting' }
      ]
    },
    materials: [
      { name: 'Survey Rope with Knots (75cm & 60cm)', localAvailability: 'Homestead sisal or nylon rope', purpose: 'Precision layout of Pfumvudza planting grid' },
      { name: 'Standard Malawian Khasu (Hoe)', localAvailability: 'Local hardware / blacksmith', purpose: 'Excavating 15x15x15cm basins without disturbing surrounding soil' },
      { name: 'Cured Thermophilic Compost or Kraal Dung', localAvailability: 'Homestead livestock pens / compost heaps', purpose: 'Concentrated microbial and nutrient pocket in basin floor' },
      { name: 'Heirloom Sorghum & Pearl Millet Seeds', localAvailability: 'National Seed Banks / local farmer elders', purpose: 'C4 photosynthesis drought-hardy grains resistant to dry spells' },
      { name: 'Dry Biomass Mulch (God\'s Blanket)', localAvailability: 'Field crop residue / dry veld grass', purpose: 'Shielding bare soil from baking sun and rain impact' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Precision Field Grid Layout',
        title: 'Lay Knotted Ropes & Mark Basins',
        timing: 'September (Dry Season)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Stretch the knotted guide rope across the field. Mark rows 75cm apart. Use pegs to mark planting stations every 60cm along the rope. Never plow or burn the rest of the field.',
        criticalCheck: 'Verify rows run strictly along elevation contour to prevent water runoff channeling.'
      },
      {
        stepNumber: 2,
        phase: 'Basin Excavation & Bottom Loosening',
        title: 'Excavate 15x15x15cm Planting Basins',
        timing: 'September–October',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Dig individual holes 15cm long, 15cm wide, and 15cm deep. Place loose soil on the downhill side of the hole to form a mini water-trapping lip. Keep undisturbed inter-row soil packed.',
        criticalCheck: 'Ensure the basin has vertical walls and a flat, uncompacted bottom.'
      },
      {
        stepNumber: 3,
        phase: 'Organic Basal Nutrition Placement',
        title: 'Place Compost & Cap with Topsoil',
        timing: 'October (Pre-Rains)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Place 1 double-handful (500g) of cured compost or well-aged cattle dung at the bottom of each pit. Scatter 1 tablespoon of wood ash. Cover with 3cm of clean topsoil to prevent seed burn.',
        criticalCheck: 'Do NOT leave raw manure exposed at the surface where nitrogen will volatilize in the sun.'
      },
      {
        stepNumber: 4,
        phase: 'Precision Sowing with First Rains',
        title: 'Sow 3 Grains per Basin after 25mm Rainfall',
        timing: 'November (First Soaking Rain)',
        seasonalWindow: 'Rainy Planting Window',
        instructions: 'When the first soaking rain (≥25mm) falls, sow 3 seeds of sorghum (or pearl millet) per basin at 2-3cm depth. Cover with fine soil and firm gently. Thin to the strongest 2 plants after 14 days.',
        criticalCheck: 'Never sow into dry dust before effective soaking rains arrive.'
      },
      {
        stepNumber: 5,
        phase: 'Continuous Mulch Shield Maintenance',
        title: 'Spread God\'s Blanket Across Inter-Row Soil',
        timing: 'Post-Emergence (December–February)',
        seasonalWindow: 'Rainy Season',
        instructions: 'Spread dry grass and crop residue 5-8cm thick across the entire field between plants. Pull any emerging weeds by hand at ground level without disturbing soil structure.',
        criticalCheck: 'Ensure zero bare soil is visible to direct midday sunlight.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Sowing Seeds Too Deep (>5cm) in Heavy Clay',
        symptom: 'Low germination rates; tiny curled seedlings die before piercing the crust',
        rootCause: 'Seeds exhaust starch reserves attempting to break through thick soil cap',
        fieldRemedy: 'Re-sow at strictly 2.5cm depth and place a light 1cm mulch shroud over the station.'
      },
      {
        pitfall: 'Chitukuko Field Residue Burning',
        symptom: 'Soil bakes into hard brick, torrential rain causes severe sheet erosion and moisture loss',
        rootCause: 'Traditional burning of dry stalks destroys carbon blanket and beneficial soil mycorrhizae',
        fieldRemedy: 'Enforce zero-burning mandate; harvest stalks as ground mulch to retain 100% soil moisture.'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Bio-Intensive Crop Yield & Pfumvudza Sizer',
      hint: 'Calculate seasonal grain harvest and station requirements for your household.'
    },
    almanac: {
      season: 'Rainy Planting',
      monthWindow: 'November – December',
      label: 'Main Grain Planting Window',
      targetAction: 'Plant sorghum, pearl millet, and cowpeas into pre-dug basins on day one of effective rains.'
    }
  },

  'herbs-cultivation-medicinal': {
    blueprint: {
      dimensionsAndRatios: [
        'Raised Herb Bed Dimensions: 1.2m (width) x 5.0m (length) x 25cm (raised height above pathway)',
        'Drainage Soil Blend Ratio: 40% loamy topsoil + 30% coarse river sand + 30% cured compost',
        'Herbal Cuttings Length: 10cm–12cm semi-hardwood stems with bottom 5cm stripped of leaves',
        'Shade Drying Chamber Temperature: 30°C–35°C in total dark with continuous cross-ventilation'
      ],
      sizingFormulas: [
        'Homestead Dispensary Footprint = 2 raised beds (1.2m × 5m = 12 m²) supplies full annual culinary & medicinal needs',
        'Tincture Extraction Ratio = 1:5 dry herb weight (g) to 40% alcohol volume (ml) macerated for 28 days'
      ],
      metrics: [
        { label: 'Bed Soil Drainage Index', value: 'Sand 30% / Loam 40%', detail: 'Prevents root rot on Mediterranean perennials (Rosemary, Thyme)' },
        { label: 'Harvesting Window', value: '08:00 – 10:00 AM', detail: 'After dew evaporates, before hot sun vaporizes essential oils' },
        { label: 'Drying Moisture Target', value: '< 8% Moisture', detail: 'Crisp crumbly leaf texture preserving bright green chlorophyll' },
        { label: 'Artemisia Annua Spacing', value: '50cm × 50cm', detail: 'High-biomass anti-malarial herbal guild spacing' }
      ]
    },
    materials: [
      { name: 'Sharp Pruning Shears / Carbon Scissors', localAvailability: 'Standard hardware depot', purpose: 'Clean surgical cuts without crushing vascular plant cambium' },
      { name: 'Coarse River Sand & Crushed Pumice', localAvailability: 'River sand deposits', purpose: 'Creating ultra-draining root bed for Mediterranean herbs' },
      { name: 'Hanging Tiered Herb Drying Racks', localAvailability: 'Homestead timber & mosquito netting', purpose: 'Dust-free, insect-free dark dehydration of harvested botanicals' },
      { name: 'Airtight Amber Glass Storage Jars', localAvailability: 'Repurposed condiment or pharmaceutical jars', purpose: 'Shielding cured herbs from UV oxidation and humidity' },
      { name: 'Raw Honey & Fresh Aloe Vera Gel', localAvailability: 'Homestead apiary / succulent beds', purpose: 'Natural botanical rooting hormone stimulator for cuttings' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'High-Drainage Bed Construction',
        title: 'Build Raised Beds with Sand-Compost Blend',
        timing: 'Month: August–September',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Construct raised wooden or stone borders 1.2m wide and 25cm high. Fill with a homogeneous mix of 40% loam, 30% coarse river sand, and 30% sifted compost. Water thoroughly to settle.',
        criticalCheck: 'Pour 10L water onto bed center: it must absorb immediately without pooling for >10 seconds.'
      },
      {
        stepNumber: 2,
        phase: 'Botanical Propagation & Rooting',
        title: 'Take Semi-Hardwood Cuttings & Dip in Honey',
        timing: 'Month: September–October',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Cut 10cm tips of Rosemary, Thyme, and Lavender just below a leaf node. Strip bottom leaves. Dip cut ends in raw honey or aloe gel. Insert into moist river sand beds under 50% shade for 21 days.',
        criticalCheck: 'Keep sand consistently damp with misting; do not over-saturate.'
      },
      {
        stepNumber: 3,
        phase: 'Companion Layout & Microclimate Zonation',
        title: 'Plant High-Demand Herbs & Pest Deterrents',
        timing: 'November',
        seasonalWindow: 'Rainy Planting Window',
        instructions: 'Transplant rooted herbs: Artemisia annua (50cm spacing), Moringa saplings (on sunny perimeter), Holy Basil/Tulsi next to solanaceous vegetables, and Mint in sunken clay pots to control spreading.',
        criticalCheck: 'Plant invasive mint varieties in isolated containers to prevent bed takeover.'
      },
      {
        stepNumber: 4,
        phase: 'Morning Peak Oil Harvesting',
        title: 'Harvest Botanicals Before Midday Heat',
        timing: 'Weekly (08:00–10:00 AM)',
        seasonalWindow: 'Continuous Harvest Window',
        instructions: 'Snip top 1/3 of vegetative growth right as flower buds begin to form. Never cut into old woody base stems. Shake gently to remove garden dust.',
        criticalCheck: 'Harvest only dry leaves; wet morning dew promotes brown mold during drying.'
      },
      {
        stepNumber: 5,
        phase: 'Dark Room Dehydration & Airtight Curing',
        title: 'Dry on Netting Trays & Jar Immediately',
        timing: '7 to 10 Days in Shade',
        seasonalWindow: 'Continuous Preservation',
        instructions: 'Spread harvested leaves thinly on suspended mesh racks in a dark, breezy room (never direct sun). When leaves crumble crisply between fingers, strip stems and store whole in airtight amber glass jars.',
        criticalCheck: 'Ensure zero exposure to sunlight during drying to preserve medicinal terpenes.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Sun-Bleaching Harvested Medicinal Herbs',
        symptom: 'Leaves turn straw-yellow, aroma vanishes, and active compounds degrade',
        rootCause: 'Drying leaves in direct sunlight where UV rays break down volatile oils and chlorophyll',
        fieldRemedy: 'Construct an indoor dark drying cabinet with black shade cloth and continuous passive ventilation.'
      },
      {
        pitfall: 'Root Rot in Heavy Waterlogged Clay',
        symptom: 'Rosemary and Thyme stems turn black at base, foliage drops rapidly within 10 days',
        rootCause: 'Poor drainage in un-amended heavy red Katondo clay soil',
        fieldRemedy: 'Replant into 30cm raised gravel beds with 40% coarse river sand and elevate root flare.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Homestead Land & Garden Guild Sizer',
      hint: 'Plan medicinal nursery beds and companion border layouts.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'September – October',
      label: 'Herb Nursery & Cuttings Window',
      targetAction: 'Propagate perennial herb cuttings in spring so root systems establish before heavy summer rains.'
    }
  },

  'insect-handling-pest-control': {
    blueprint: {
      dimensionsAndRatios: [
        'Neem Seed Foliar Spray: 500g crushed dry neem seeds soaked in 10L warm water for 24h + 20g pure soap',
        'Wood Ash Pest Dusting: 1kg sifted hardwood ash + 100g dry chili pepper powder dusted onto wet leaves',
        'Top-Bar Beehive Dimensions: 90cm (length) x 48cm (top width) x 20cm (bottom width) x 28cm (depth)',
        'Comb Top-Bar Width: Exactly 32mm–35mm bar spacing (aligns with natural African honeybee Apis mellifera adansonii comb spacing)'
      ],
      sizingFormulas: [
        'Beehive Hive Density = 2 to 4 colonized Kenyan Top-Bar hives per acre provides 100% orchard pollination + 30kg honey/year',
        'Organic Spray Application Rate = 10L neem/chili extract covers ~250 m² intensive vegetable canopy'
      ],
      metrics: [
        { label: 'Bee Top-Bar Width', value: '32mm – 35mm', detail: 'Critical biological spacing prevents cross-combing between bars' },
        { label: 'Neem Soaking Time', value: '24 Hours', detail: 'Extracts azadirachtin compound without bacterial fermentation' },
        { label: 'Hive Hanging Elevation', value: '1.8m – 2.2m ASL', detail: 'Hung with greased wire between trees out of honey badger reach' },
        { label: 'Natural Spray pH', value: 'pH 6.8 – 7.2', detail: 'Safe for plant leaves while fatal to chewing/sucking pests' }
      ]
    },
    materials: [
      { name: 'Crushed Neem (Azadirachta indica) Seeds', localAvailability: 'Abundant throughout rural Malawian lakeshore & villages', purpose: 'Broad-spectrum organic insect growth regulator (azadirachtin)' },
      { name: 'Dried Bird\'s Eye Chili Powder', localAvailability: 'Homestead garden beds', purpose: 'Contact deterrent against caterpillars, aphids, and beetles' },
      { name: 'Sifted Hardwood Kitchen Ash', localAvailability: 'Homestead cooking hearth', purpose: 'Physical desiccant destroying soft-bodied larvae and snails' },
      { name: 'Kenyan Top-Bar Beehive & Swarm Lure', localAvailability: 'Homestead carpentry + beeswax / lemongrass oil', purpose: 'Low-cost sustainable apiculture and intensive crop pollination' },
      { name: 'Beekeeper Veil, Heavy Cotton Gloves & Smoker', localAvailability: 'Local apiculture supply / fabricated from tin can', purpose: 'Safe handling of defensive African honeybees during harvest' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Neem Botanical Extract Preparation',
        title: 'Pound Dried Neem Seeds & Cold Macerate',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Continuous Pest Management',
        instructions: 'Pound 500g of dry neem seeds into a coarse powder. Tie loosely in a porous cloth bag. Immerse in a 10L bucket of clean water for 24 hours. Squeeze the bag thoroughly until the water turns milky brown.',
        criticalCheck: 'Use non-chlorinated water; chlorine breaks down active azadirachtin enzymes.'
      },
      {
        stepNumber: 2,
        phase: 'Surfactant Addition & Foliar Spraying',
        title: 'Mix Soap Emulsifier & Spray Underside of Leaves',
        timing: 'Day 2 (Late Afternoon, 16:30)',
        seasonalWindow: 'Active Growing Season',
        instructions: 'Dissolve 20g of pure unperfumed bar soap (or liquid soap) into the 10L neem tea as a sticking agent. Pour into a knapsack sprayer through a fine strainer. Spray undersides of leaves where aphids and mites congregate.',
        criticalCheck: 'Spray only in late afternoon; midday sun scorches soap-coated leaves.'
      },
      {
        stepNumber: 3,
        phase: 'Top-Bar Hive Baiting & Placement',
        title: 'Rub Bars with Lemongrass Oil & Hang Hive',
        timing: 'August–September (Swarming Season)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Melt pure beeswax along the center groove of each 35mm wooden top-bar. Rub interior walls with crushed fresh lemongrass leaves. Hang the hive 2m high between shaded trees using grease-coated steel wire to prevent ant invasions.',
        criticalCheck: 'Ensure top-bars fit snugly together with zero gaps to keep wasps and moths out.'
      },
      {
        stepNumber: 4,
        phase: 'Non-Destructive Night Honey Harvesting',
        title: 'Smoke Calmly & Harvest Only Sealed Honeycombs',
        timing: 'April–May and November (Post-Nectar Flow)',
        seasonalWindow: 'Harvest Season',
        instructions: 'Approach hive at dusk with a smoker fueled by dry maize cobs and cow dung. Puff cool smoke at the entrance. Remove bars from the rear of the hive. Cut off only capped honeycombs, leaving all brood combs intact in the front cluster.',
        criticalCheck: 'Never harvest unsealed nectar combs (moisture > 20% causes sour fermentation).'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Harvesting Uncapped Watery Honey',
        symptom: 'Honey ferments in the jar, bubbles vigorously, and turns into sour alcohol vinegar',
        rootCause: 'Bees have not finished dehydrating nectar down to 18% moisture and capping cells with wax',
        fieldRemedy: 'Harvest strictly 100% wax-capped combs; test honey with a refractometer or visual drip test.'
      },
      {
        pitfall: 'Ants Invading Top-Bar Beehive',
        symptom: 'Honeybee colony suddenly absconds (vacates) leaving empty hive box',
        rootCause: 'Hanging wires lack grease cups, allowing columns of aggressive driver ants to enter',
        fieldRemedy: 'Slide repurposed plastic cups onto suspension wires and pack them with thick automotive axle grease.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Homestead Apiary & Orchard Sizer',
      hint: 'Size top-bar beehives and estimate seasonal honey yield.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'August – September',
      label: 'Swarm Catching & Baiting Season',
      targetAction: 'Bait all empty top-bar hives with lemongrass oil before spring bee swarming peaks.'
    }
  },

  'crop-disease-handling': {
    blueprint: {
      dimensionsAndRatios: [
        'Bordeaux Mixture (1% Organic Fungicide): 100g Copper Sulfate + 100g Hydrated Quicklime + 10L Clean Water',
        'Milk-Water Viral/Powdery Mildew Spray: 1 Part Fresh Unpasteurized Milk to 9 Parts Water (1:9 ratio)',
        '4-Year Crop Rotation Grid: Plot A (Nightshades) -> Plot B (Legumes) -> Plot C (Brassicas/Alliums) -> Plot D (Root Crops)',
        'Bacterial Wilt Sanitation Trench: 30cm deep trench isolating infected garden sector packed with quicklime'
      ],
      sizingFormulas: [
        'Bordeaux Sizing Formula = 10L of 1% Bordeaux spray protects ~200 tomato/potato plants against Late Blight (Phytophthora)',
        'Crop Rotation Matrix = 4 distinct botanical family blocks rotated annually eliminates soil-borne nematodes & Fusarium'
      ],
      metrics: [
        { label: 'Bordeaux pH Target', value: 'pH 7.0 – 7.5 (Neutral)', detail: 'Tested with clean iron nail; prevents acidic leaf scorch' },
        { label: 'Late Blight Spray Window', value: 'Every 7 – 10 Days', detail: 'Applied proactively before rainy cold mists hit foliage' },
        { label: 'Crop Family Rotation Cycle', value: '4-Year Minimum', detail: 'Starves host-specific fungal spores and root-knot nematodes' },
        { label: 'Pruning Tool Dip Strength', value: '70% Isopropyl / 10% Bleach', detail: 'Sterilize blades between every cut on infected vines' }
      ]
    },
    materials: [
      { name: 'Copper Sulfate Crystals (Blue Vitriol)', localAvailability: 'Agricultural chemical depots / pharmacy', purpose: 'Broad-spectrum organic preventive contact fungicide' },
      { name: 'Hydrated Agricultural Lime (Calcium Hydroxide)', localAvailability: 'Hardware / construction lime depots', purpose: 'Neutralizing acidic copper sulfate and preventing plant burn' },
      { name: 'Plastic Buckets (Non-Metal)', localAvailability: 'Standard village market plastic buckets', purpose: 'Mixing copper sulfate safely without corrosive metal reactions' },
      { name: 'Clean Iron Nail or Knife Blade', localAvailability: 'Homestead workshop', purpose: 'Quick field test for acid balance in freshly brewed Bordeaux' },
      { name: 'Knapsack Pressure Sprayer with Brass Nozzle', localAvailability: 'Local agro-dealers', purpose: 'Fine mist foliar coverage over upper and lower leaf surfaces' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Bordeaux Mixture Dissolution (Vessel A & B)',
        title: 'Dissolve Copper Sulfate & Lime in Separate Plastic Buckets',
        timing: 'Day of Spraying (Morning)',
        seasonalWindow: 'Rainy Season (High Blight Risk: Dec–March)',
        instructions: 'Dissolve 100g copper sulfate in 5L clean water in Plastic Bucket A. In Plastic Bucket B, slake 100g hydrated lime in 5L water. Never use metal buckets.',
        criticalCheck: 'Verify all copper crystals are completely dissolved before blending.'
      },
      {
        stepNumber: 2,
        phase: 'Neutralization & Chemical Blending',
        title: 'Pour Copper Solution Slowly into Lime Slurry',
        timing: 'Immediate',
        seasonalWindow: 'Rainy Season',
        instructions: 'Slowly pour the blue copper sulfate solution into the white lime slurry while stirring vigorously with a wooden stick. The mixture will turn into a sky-blue suspension.',
        criticalCheck: 'Always pour copper INTO lime, never lime into copper.'
      },
      {
        stepNumber: 3,
        phase: 'Iron Nail Acidity Safety Test',
        title: 'Test pH Neutrality with Clean Iron Blade',
        timing: 'Immediate (Prior to Application)',
        seasonalWindow: 'Rainy Season',
        instructions: 'Dip a bright, non-rusty iron nail into the mixture for 1 minute. If a reddish copper coating forms on the nail, the liquid is too acidic (will burn leaves). Add more lime slurry until nail stays clean.',
        criticalCheck: 'Nail must come out completely clean with zero copper plate deposits.'
      },
      {
        stepNumber: 4,
        phase: 'Proactive Full Canopy Spraying',
        title: 'Mist Foliage Before Heavy Chiperoni Drizzle',
        timing: 'Every 7–10 Days in Rainy Weather',
        seasonalWindow: 'Rainy Season',
        instructions: 'Strain mixture through cheesecloth into knapsack sprayer. Spray leaves until thoroughly wet, targeting lower surfaces. Apply proactively before persistent rainy spells.',
        criticalCheck: 'Apply only on dry foliage so the copper film adheres securely.'
      },
      {
        stepNumber: 5,
        phase: 'Infected Tissue Quarantine & Incineration',
        title: 'Isolate & Burn Viral / Bacterial Wilt Plants',
        timing: 'Immediate on Detection',
        seasonalWindow: 'Continuous Monitoring',
        instructions: 'If a plant shows irreversible bacterial wilt (Ralstonia) or mosaic virus, dig up the entire plant and root ball into a bucket. Burn in a hot fire pit away from garden beds. Dust hole with lime.',
        criticalCheck: 'Never put diseased tomato or potato vines into compost piles.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Acidic Bordeaux Burning Crop Leaves',
        symptom: 'Leaves develop scorched brown holes and drop off 24h after spraying',
        rootCause: 'Insufficient lime added to neutralize copper sulfate, creating corrosive acidic spray',
        fieldRemedy: 'Perform the iron nail test on every batch; add extra hydrated lime until nail remains shiny.'
      },
      {
        pitfall: 'Composting Bacterial Wilt (Ralstonia) Plants',
        symptom: 'Next season’s entire tomato/potato crop collapses simultaneously in wet soil',
        rootCause: 'Soil-borne bacteria survived in poorly heated compost and contaminated new beds',
        fieldRemedy: 'Excavate infected soil 30cm deep, quarantine bed from nightshades for 4 years, and plant maize/beans.'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Bio-Intensive Crop Rotation & Field Sizer',
      hint: 'Design 4-year crop rotation blocks to break soil-borne disease cycles.'
    },
    almanac: {
      season: 'Rainy Planting',
      monthWindow: 'December – February',
      label: 'Fungal Blight Prevention Window',
      targetAction: 'Spray prophylactic Bordeaux mixture on tomato and potato foliage every 10 days during continuous rains.'
    }
  }
};
