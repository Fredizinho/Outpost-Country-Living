import { DetailedSkillProtocol } from '../skillsTechnicalProtocols';

export const PRESERVATION_CONSTRUCTION_PROTOCOLS: Record<string, DetailedSkillProtocol> = {
  'food-preservation-techniques': {
    blueprint: {
      dimensionsAndRatios: [
        'Lacto-Fermentation Brine Ratio: 2.0% Non-Iodized Sea Salt by Weight (20g pure coarse salt per 1,000g prepared vegetables)',
        'Hermetic PICS Grain Storage: Triple-layer polyethylene liner bag (80-micron thickness) sealed independently with sisal twine',
        'Grain Safe Storage Moisture Threshold: < 12.0% Moisture Content (tested with salt jar test or grain moisture meter)',
        'Root Cellar Storage Atmosphere: 10°C–14°C temperature with 85%–90% relative humidity in ventilated darkness'
      ],
      sizingFormulas: [
        'PICS Bag Capacity = 50kg or 100kg grain capacity; insect respiration drops O2 < 5% within 72h, asphyxiating 100% of weevils',
        'Annual Fermentation Needs = 1L lacto-fermented vegetables per person per week = 52 Liters / person / year'
      ],
      metrics: [
        { label: 'Brine Salinity Ratio', value: '2.0% Salt by Weight', detail: 'Inhibits spoilage bacteria (Clostridium) while encouraging Leuconostoc & Lactobacillus' },
        { label: 'Hermetic O2 Depletion', value: '< 5% Oxygen Level', detail: 'Natural biological asphyxiation of maize weevils (Prostephanus truncatus)' },
        { label: 'Safe Grain Moisture', value: '< 12% Moisture', detail: 'Prevents Aspergillus flavus fungal growth and carcinogenic aflatoxin synthesis' },
        { label: 'Sweet Potato Curing Temp', value: '28°C–30°C for 10 Days', detail: 'Heals skin abrasions and converts starches to natural preserving sugars' }
      ]
    },
    materials: [
      { name: 'PICS Triple-Layer Hermetic Grain Bags (50kg/100kg)', localAvailability: 'Agro-dealers & grain marketing depots', purpose: '100% chemical-free oxygen-depletion grain preservation for 2+ years' },
      { name: 'Pure Coarse Non-Iodized Sea/Rock Salt', localAvailability: 'Village markets / lake salt suppliers', purpose: 'Creating pure lactic fermentation brine without iodine interfering with culture' },
      { name: 'Wide-Mouth Glass Fermentation Jars & Ceramic Weights', localAvailability: 'Homestead kitchen & pottery workshops', purpose: 'Submerging fermented vegetables below brine line to maintain anaerobic state' },
      { name: 'Dry Clean Table Salt & Glass Vial (Moisture Test)', localAvailability: 'Homestead pantry', purpose: 'Field salt-jar test to confirm grain moisture is below 12% before bagging' },
      { name: 'Wooden Storage Pallets & Raised Granary Pillars', localAvailability: 'Homestead timber / stone masonry', purpose: 'Elevating grain bags 15cm off floor away from moisture and rodents' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Grain Sun-Drying & Salt-Jar Moisture Test',
        title: 'Sun-Dry Grains & Perform Salt-Jar Test',
        timing: 'Day 1–3 (Post-Harvest)',
        seasonalWindow: 'Harvest & Storage Season (April–May)',
        instructions: 'Spread harvested maize/beans on clean tarps in full sun for 3 days. Put 2 handfuls of grain + 1 teaspoon of dry table salt into a dry glass jar. Shake for 1 minute. If salt clumps or sticks to the glass, grain is too wet (>13%). Continue sun-drying.',
        criticalCheck: 'Never bag grain if salt sticks to jar glass (guarantees mold and aflatoxins).'
      },
      {
        stepNumber: 2,
        phase: 'Triple-Layer PICS Bagging & Independent Tying',
        title: 'Pack PICS Bag & Tie Each Layer Separately',
        timing: 'Day 4',
        seasonalWindow: 'Harvest & Storage Season',
        instructions: 'Inspect high-density PICS inner liners for punctures. Pour dry, clean grain into the first inner liner. Compress grain to remove excess air. Twist neck tightly and tie with sisal twine. Repeat for second inner liner, then tie the outer woven protective bag.',
        criticalCheck: 'Tie all 3 layers INDEPENDENTLY; never bunch and tie all layers together.'
      },
      {
        stepNumber: 3,
        phase: 'Lacto-Fermentation Vegetable Shredding',
        title: 'Shred Vegetables & Massage with 2% Salt',
        timing: 'Harvest Days',
        seasonalWindow: 'Continuous Harvest',
        instructions: 'Weigh 1,000g of shredded cabbage, carrots, or radishes. Add exactly 20g of pure non-iodized coarse salt. Massage with clean hands for 5-8 minutes until cell walls break and abundant natural brine releases.',
        criticalCheck: 'Do NOT use iodized table salt (iodine inhibits beneficial lactic acid bacteria).'
      },
      {
        stepNumber: 4,
        phase: 'Anaerobic Submergence & Fermentation',
        title: 'Pack into Jars & Submerge Below Brine',
        timing: 'Days 1 to 14',
        seasonalWindow: 'Continuous Preservation',
        instructions: 'Pack salted vegetables tightly into clean glass jars, pressing out all air bubbles. Place a clean glass/ceramic weight on top to keep all solids submerged under 2cm of brine. Seal with an airlock or burp daily at 18°C–24°C for 14 days.',
        criticalCheck: 'Ensure zero vegetable pieces float above the brine surface to prevent mold.'
      },
      {
        stepNumber: 5,
        phase: 'Root Crop Curing & Slatted Shelf Cellaring',
        title: 'Cure Sweet Potatoes at 28°C & Transfer to Cellar',
        timing: '10 Days Curing + Multi-Month Storage',
        seasonalWindow: 'Harvest Season (May–June)',
        instructions: 'Lay unwashed sweet potatoes in a warm (28°C), humid, shady spot for 10 days to heal digging cuts and toughen skins. Transfer to a cool, dark, ventilated root cellar on slatted timber shelves.',
        criticalCheck: 'Never wash sweet potatoes with water before curing and storage.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Puncturing PICS Bag Liners with Sharp Objects',
        symptom: 'Weevils multiply inside bag, turning grain into white powdery frass within 6 months',
        rootCause: 'Tiny hole in polyethylene liner allows continuous oxygen entry, sustaining insect life',
        fieldRemedy: 'Inspect bags before filling; repair any micro-holes with heavy vinyl tape or replace inner liner.'
      },
      {
        pitfall: 'Vegetables Floating Above Brine Line in Fermentation',
        symptom: 'White fuzzy or pink mold forms on exposed surface, ruining the entire jar',
        rootCause: 'Failing to use a submergence weight, allowing oxygen contact with top vegetable shreds',
        fieldRemedy: 'Use sterile ceramic weights or a brine-filled plastic bag to keep 100% of vegetables submerged.'
      }
    ],
    calculator: {
      tab: 'food',
      title: 'Food Reserve & Storage Sizer',
      hint: 'Calculate annual staple grain, bean, and fermented vegetable reserves for your family.'
    },
    almanac: {
      season: 'Harvest & Storage',
      monthWindow: 'April – June',
      label: 'Main Grain Bagging & Curing Season',
      targetAction: 'Sun-dry maize, test with salt-jars, and pack into PICS bags during dry autumn weather.'
    }
  },

  'solar-food-dehydration': {
    blueprint: {
      dimensionsAndRatios: [
        'Indirect Solar Dehydrator Cabinet: 1.2m (collector length) x 60cm (cabinet width) x 90cm (tower height)',
        'Collector-to-Drying Chamber Ratio: 2:1 collector surface area relative to horizontal drying tray area',
        'Operating Temperature Range: 50°C to 60°C (ideal thermal window dehydrating food without cooking enzymes)',
        'Food Slice Thickness: 4mm to 5mm uniform slices (ensures even moisture loss without case-hardening)'
      ],
      sizingFormulas: [
        'Drying Efficiency = Indirect solar cabinet dehydrates 10kg fresh mangoes/greens into 1.2kg shelf-stable dried food in 12–18 hours',
        'Safe Dehydrated Moisture = Fruit dried to < 15% moisture (pliable leather); Vegetables/Greens dried to < 8% moisture (crisp)'
      ],
      metrics: [
        { label: 'Collector Tilt (Malawi)', value: '25° – 30° True North', detail: 'Maximizes thermal absorption of solar collector black plate' },
        { label: 'Air Chimney Flow Velocity', value: '0.3 – 0.5 m / second', detail: 'Natural thermal buoyancy convection drawing moist air out top' },
        { label: 'Chamber Operating Temp', value: '52°C – 58°C Optimal', detail: 'Prevents enzymatic nutrient degradation & bacterial growth' },
        { label: 'Stainless Mesh Size', value: 'Food-Grade 304 Mesh', detail: 'Corrosion-proof, toxic-free contact surface for acidic fruits' }
      ]
    },
    materials: [
      { name: 'Treated Hardwood / Marine Plywood Board', localAvailability: 'Homestead carpentry workshop', purpose: 'Constructing insulated collector box and multi-tier drying tower' },
      { name: 'Black Corrugated Metal Sheet (Collector Absorber)', localAvailability: 'Local roofing suppliers', purpose: 'Absorbing solar radiation and superheating incoming fresh airflow' },
      { name: 'Clear 4mm Tempered Glass / UV Polycarbonate Sheet', localAvailability: 'Glazing & hardware store', purpose: 'Trapping greenhouse thermal energy over black collector absorber' },
      { name: 'Food-Grade Stainless Steel Wire Mesh (304)', localAvailability: 'Hardware / food equipment stores', purpose: 'Drying trays with unrestricted vertical airflow (never use galvanized wire)' },
      { name: 'Fine Mosquito Screen Fly Mesh', localAvailability: 'Hardware store', purpose: 'Sealing air intake and exhaust vents against flies, wasps, and beetles' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Thermal Solar Collector Assembly',
        title: 'Build 30° Tilted Glazed Solar Heat Box',
        timing: 'Day 1',
        seasonalWindow: 'Dry Season Fabrication',
        instructions: 'Construct a wooden box 1.2m long by 60cm wide. Line the bottom with 5cm charcoal insulation. Mount a matte-black corrugated steel sheet. Cover with clear glass 5cm above the metal. Tilt box at 30° facing True North.',
        criticalCheck: 'Ensure bottom air intake is sealed with fine fly screen mesh.'
      },
      {
        stepNumber: 2,
        phase: 'Multi-Tier Tower & Exhaust Chimney',
        title: 'Build Insulated Vertical Drying Tower',
        timing: 'Day 2',
        seasonalWindow: 'Dry Season Fabrication',
        instructions: 'Attach a vertical cabinet to the high end of the collector. Install wooden runners holding 5-6 sliding stainless mesh trays spaced 10cm apart. Cut a top exhaust chimney slot with an adjustable damper and fly screen.',
        criticalCheck: 'Insulate cabinet walls to retain heat on breezy afternoons.'
      },
      {
        stepNumber: 3,
        phase: 'Produce Washing, Slicing & Steam Blanching',
        title: 'Slice Uniform 5mm Slices & Blanch Leafy Greens',
        timing: 'Morning of Drying Day (07:00)',
        seasonalWindow: 'Continuous Harvest',
        instructions: 'Wash fresh mangoes, tomatoes, squashes, or pumpkin leaves. Slice uniformly to 4-5mm thickness. Steam blanch greens for 60 seconds and plunge into cold water to preserve bright green vitamins and enzymes.',
        criticalCheck: 'Uniform slice thickness is mandatory; thick pieces remain wet inside and spoil.'
      },
      {
        stepNumber: 4,
        phase: 'Tray Loading & Airflow Regulation',
        title: 'Load Trays in Single Layer & Monitor Temp',
        timing: '08:00 to 16:00 (Full Sunshine)',
        seasonalWindow: 'Continuous Operation',
        instructions: 'Spread slices in a single layer on stainless mesh trays with 5mm gaps between pieces. Slide trays into tower. Adjust top exhaust damper so internal thermometer reads 52°C–58°C.',
        criticalCheck: 'Rotate upper and lower trays once at midday for perfectly uniform drying.'
      },
      {
        stepNumber: 5,
        phase: 'Cooling, Conditioning & Hermetic Sealing',
        title: 'Condition Dried Food & Pack in Glass Jars',
        timing: 'Late Afternoon',
        seasonalWindow: 'Preservation Phase',
        instructions: 'Remove food when fruit feels like dry leather (no wet spots) and greens snap crisply. Cool for 30 minutes. Pack into clean glass jars. Shake jars daily for 7 days (conditioning); if moisture droplets appear, return to dehydrator for 2 hours.',
        criticalCheck: 'Conditioning confirms zero hidden moisture pockets before long-term storage.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Case-Hardening Due to Excessive Heat (>70°C)',
        symptom: 'Outside of fruit turns into a hard rubbery shell while the center remains wet and ferments',
        rootCause: 'Cabinet temperature exceeded 70°C, sealing outer moisture pores before water could evaporate',
        fieldRemedy: 'Open top exhaust damper to increase airflow velocity and keep temperature strictly between 50°C and 60°C.'
      },
      {
        pitfall: 'Using Toxic Galvanized Zinc Wire Mesh Trays',
        symptom: 'Acidic tomato/mango juices corrode zinc coating, contaminating food with toxic zinc salts',
        rootCause: 'Deploying galvanized chicken wire or hardware cloth instead of food-grade stainless steel',
        fieldRemedy: 'Use exclusively 304 food-grade stainless steel mesh or food-grade nylon drying screens.'
      }
    ],
    calculator: {
      tab: 'food',
      title: 'Solar Dehydration & Pantry Sizer',
      hint: 'Calculate seasonal produce drying yields and jar storage requirements.'
    },
    almanac: {
      season: 'Harvest & Storage',
      monthWindow: 'April – June',
      label: 'Solar Dehydration Peak Season',
      targetAction: 'Dehydrate surplus harvest fruits, tomatoes, and pumpkin leaves before rainy humidity returns.'
    }
  },

  'earth-block-masonry': {
    blueprint: {
      dimensionsAndRatios: [
        'CSEB Block Dimensions: 295mm (length) x 140mm (width) x 90mm (thickness) produced via manual Cinva-Ram press',
        'Stabilizer Cement Ratio: 6% to 8% Portland Cement by Weight (approx. 1 bag cement per 120–140 compressed blocks)',
        'Soil Composition Matrix: 60%–75% Sand/Gravel + 15%–25% Silt + 10%–18% Clay (sifted through 6mm screen)',
        'Moisture Drop Test: Squeeze soil ball in hand; drop from 1.0m height onto hard ground — must shatter into 3-4 pieces'
      ],
      sizingFormulas: [
        'Homestead Cottage Block Count = 10m × 8m cottage with 3m walls requires ~4,500 CSEB interlocking blocks',
        'Cement Efficiency = 4,500 blocks ÷ 130 blocks/bag = ~35 bags Portland cement (90% cheaper than fired brick mortar)'
      ],
      metrics: [
        { label: 'Cinva-Ram Compression Force', value: '2.0 – 3.0 MPa', detail: 'High mechanical compression yielding dense, weather-resistant block' },
        { label: 'Soil Clay Fraction Limit', value: '10% – 18% Max Clay', detail: 'High clay causes shrinkage cracks; sandy loam soil is ideal' },
        { label: 'Drop Test Ball Shatter', value: '3 – 4 Clean Pieces', detail: 'Confirms exact optimum 8%–10% molding moisture content' },
        { label: 'Shade Curing Duration', value: '28 Days Under Plastic', detail: 'Slow hydration cure maximizing Portland cement compressive strength' }
      ]
    },
    materials: [
      { name: 'Cinva-Ram / Auram Manual Block Press', localAvailability: 'Fabricated by local metal workshops / NGO tooling', purpose: 'Applying 20 kN manual toggle-lever compaction force to earth mix' },
      { name: 'Subsoil Sandy Loam (Red Katondo base)', localAvailability: 'Excavated from foundation trenches / water dams (0.5m depth)', purpose: 'Primary mineral matrix for compressed earth blocks' },
      { name: 'Portland Cement (CEM II 32.5N / 42.5N)', localAvailability: 'Standard building supply stores across Malawi', purpose: 'Hydraulic stabilization binding sand and silt particles permanently' },
      { name: '6mm Wire Sifting Screen & Khasu (Hoe)', localAvailability: 'Hardware store / wire mesh depots', purpose: 'Sifting raw subsoil to remove roots, clods, and pebbles > 6mm' },
      { name: 'Heavy Black Agricultural Poly-Sheeting (Tarp)', localAvailability: 'Agro-dealers', purpose: 'Covering stacked curing blocks to trap 100% humidity for 28 days' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Subsoil Sifting & Clay Content Validation',
        title: 'Excavate Subsoil & Sift Through 6mm Screen',
        timing: 'Day 1',
        seasonalWindow: 'Cold Dry Season (June–August)',
        instructions: 'Excavate subsoil from below the organic topsoil layer (0.5m–1.5m depth). Sift through a 6mm wire mesh into a clean pile. Perform jar test to confirm clay content is between 12% and 18%.',
        criticalCheck: 'Never use organic black topsoil (humus prevents cement from curing).'
      },
      {
        stepNumber: 2,
        phase: 'Homogeneous Dry Cement Blending',
        title: 'Mix 1 Bag Cement with 14 Wheelbarrows Soil',
        timing: 'Day 2 (Morning)',
        seasonalWindow: 'Block Production Season',
        instructions: 'Spread 14 level wheelbarrows of dry sifted subsoil on a clean slab. Spread 1 bag (50kg) of Portland cement evenly on top. Turn the dry pile 3 full times with shovels until the color is completely uniform.',
        criticalCheck: 'Mix thoroughly while DRY before adding a single drop of water.'
      },
      {
        stepNumber: 3,
        phase: 'Moisture Optimization & Drop Test',
        title: 'Sprinkle Water & Perform 1-Meter Drop Test',
        timing: 'Immediate',
        seasonalWindow: 'Active Production',
        instructions: 'Sprinkle water fine mist over the mix while turning. Squeeze a handful into a firm ball. Drop the ball from 1.0m height onto hard ground. It must break into 3-4 pieces. If it pulverizes to dust, add water. If it flattens like dough, it is too wet.',
        criticalCheck: 'Never press wet soggy mix (blocks will slump, warp, and stick to mold walls).'
      },
      {
        stepNumber: 4,
        phase: 'Cinva-Ram Compression & Ejection',
        title: 'Pack Mold Box & Pull Toggle Lever with Full Weight',
        timing: 'Within 45 Minutes of Wetting',
        seasonalWindow: 'Active Production',
        instructions: 'Fill the Cinva-Ram mold box level with soil mix. Close lid. Pull the long toggle handle down using full body weight to compress block. Reverse lever and eject the block. Handle gently with flat palms.',
        criticalCheck: 'Press all wetted mix within 45 minutes before cement begins its initial set.'
      },
      {
        stepNumber: 5,
        phase: '28-Day Humid Shade Curing Protocol',
        title: 'Stack Under Black Tarp & Water Daily for 28 Days',
        timing: 'Days 1 to 28',
        seasonalWindow: 'Curing Phase',
        instructions: 'Stack fresh blocks on a level sand bed in deep shade. Cover tightly with black plastic tarps. Starting on Day 2, sprinkle water over the blocks every morning and re-seal the plastic to maintain 100% relative humidity for 28 full days.',
        criticalCheck: 'Never let blocks dry in direct sun; premature drying destroys 70% of block strength.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Curing Fresh Earth Blocks in Direct Sunlight',
        symptom: 'Blocks develop extensive spiderweb shrinkage cracks and crumble at edges when handled',
        rootCause: 'Water evaporates before Portland cement can undergo crystal hydration bonding',
        fieldRemedy: 'Keep blocks under sealed heavy black plastic in deep shade; water daily for 28 consecutive days.'
      },
      {
        pitfall: 'Using Soil with >25% Heavy Katondo Clay',
        symptom: 'Blocks swell during molding, stick to metal walls, and crack severely while drying',
        rootCause: 'Excessive expanding smectite/illite clay mineral content',
        fieldRemedy: 'Blend in 30% coarse river sand to dilute clay content down to the target 15% range.'
      }
    ],
    calculator: {
      tab: 'budget',
      title: 'Earth Block Cottage & Masonry Sizer',
      hint: 'Calculate total CSEB blocks, cement bags, and masonry labor for your homestead buildings.'
    },
    almanac: {
      season: 'Cold Dry Season',
      monthWindow: 'June – August',
      label: 'CSEB Block Pressing Season',
      targetAction: 'Press and cure all earth masonry blocks during the cool dry winter months before rains.'
    }
  },

  'zeer-pot-evaporative-cooling': {
    blueprint: {
      dimensionsAndRatios: [
        'Nested Pot Diameter Ratio: Outer Unglazed Pot (50cm–60cm diameter) + Inner Unglazed Pot (35cm–40cm diameter)',
        'Sand Cavity Insulation Gap: Exactly 4cm to 5cm uniform sand barrier between outer and inner pot walls',
        'Sand Moisture Saturation: 2 to 3 Liters of clean water added daily to inter-pot river sand bed',
        'Thermal Cooling Delta: Drops internal food storage temperature by 8°C to 12°C below hot dry ambient temperature'
      ],
      sizingFormulas: [
        'Thermodynamic Cooling Rate = 1 Zeer pot holding 25kg fresh vegetables extends shelf life from 2 days to 21+ days',
        'Sand Sizing = ~15kg to 20kg fine clean river sand required to fill the 4cm inter-pot insulation cavity'
      ],
      metrics: [
        { label: 'Inner Storage Temperature', value: '16°C – 20°C in Hot Heat', detail: 'Keeps vegetables cool and crisp without electricity' },
        { label: 'Internal Humidity Level', value: '90% – 95% RH', detail: 'Prevents leafy greens, tomatoes, and carrots from wilting' },
        { label: 'Water Addition Schedule', value: '2× Daily (Morning & Noon)', detail: 'Maintains continuous thermodynamic evaporative cooling' },
        { label: 'Tomato Shelf-Life Extension', value: '20+ Days (vs 3 days ambient)', detail: 'Extends post-harvest shelf life by 600%' }
      ]
    },
    materials: [
      { name: 'Two Unglazed Fired Terracotta Clay Pots (50cm & 40cm)', localAvailability: 'Village traditional clay potters (Woumba)', purpose: 'Porous unglazed ceramic allowing microscopic water evaporation' },
      { name: 'Washed Fine River Sand', localAvailability: 'Local riverbed deposits', purpose: 'Water reservoir and thermodynamic conduction medium between pot walls' },
      { name: 'Clean Coarse Burlap / Hessian Cloth', localAvailability: 'Grain / coffee depots', purpose: 'Damp top cover shield maintaining 95% humidity in inner chamber' },
      { name: 'Elevated Wooden / Clay Stand', localAvailability: 'Homestead carpentry workshop', purpose: 'Elevating pot into natural cross-breeze shade corridor for maximum airflow' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Clay Pot Selection & Drainage Sealing',
        title: 'Select Porous Pots & Seal Base Drainage Hole',
        timing: 'Day 1',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Obtain two unglazed terracotta pots (outer 50cm, inner 40cm). If pots have drainage holes, seal the inner pot hole completely with beeswax or cement cork. Leave outer pot porous.',
        criticalCheck: 'Ensure pots are 100% UNGLAZED; shiny glazed ceramics cannot evaporate water.'
      },
      {
        stepNumber: 2,
        phase: 'Bottom Sand Bedding & Concentric Centering',
        title: 'Pour 5cm Base Sand & Center Inner Pot',
        timing: 'Day 1 (Midday)',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Pour 5cm of clean, dry river sand into the base of the outer pot. Place the inner pot directly in the center on top of the sand bed so their top rims align flush at the same height.',
        criticalCheck: 'Verify a uniform 4-5cm gap exists around the entire circumference.'
      },
      {
        stepNumber: 3,
        phase: 'Sand Cavity Filling & Water Saturation',
        title: 'Pack Sand Between Walls & Saturate with Water',
        timing: 'Day 1 (Afternoon)',
        seasonalWindow: 'Year-Round Setup',
        instructions: 'Fill the 4cm gap between pot walls with fine river sand up to the rim. Slowly pour 3-4 Liters of clean water into the sand until it is completely saturated and water glistens at the sand surface.',
        criticalCheck: 'Do NOT spill water inside the inner pot chamber; keep inner floor clean and dry.'
      },
      {
        stepNumber: 4,
        phase: 'Shaded Breezeway Placement',
        title: 'Elevate on Stand in Shady, Breezy Corridor',
        timing: 'Day 1 (Late Afternoon)',
        seasonalWindow: 'Operational Phase',
        instructions: 'Place the Zeer pot assembly on an elevated stand in a shaded outdoor porch or breezeway where wind moves freely. Cover the inner pot opening with a clean, damp hessian burlap cloth.',
        criticalCheck: 'Evaporative cooling requires moving air and shade; never place inside a closed stagnant room.'
      },
      {
        stepNumber: 5,
        phase: 'Daily Rehydration & Produce Stacking',
        title: 'Add Water 2x Daily & Store Harvested Produce',
        timing: '07:00 and 13:00 Daily',
        seasonalWindow: 'Continuous Operation',
        instructions: 'Pour 1-2L of water into the sand cavity twice daily. Place fresh leafy greens, tomatoes, peppers, and fruits inside. Produce stays fresh, crisp, and cold for up to 3 weeks.',
        criticalCheck: 'Wash and re-wet the top burlap cover cloth daily to keep it fresh and odor-free.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Placing Zeer Pot in a Stagnant, Closed Kitchen',
        symptom: 'Zero temperature drop inside pot; vegetables turn slimy and develop mold',
        rootCause: 'Evaporative cooling fails without moving air to carry away saturated water vapor',
        fieldRemedy: 'Move the Zeer pot outdoors onto a covered shaded veranda with active cross-breezes.'
      },
      {
        pitfall: 'Allowing Inter-Pot Sand to Dry Out Completely',
        symptom: 'Internal temperature rises to ambient hot air temperature within 4 hours',
        rootCause: 'Water supply in sand depleted during peak afternoon heat',
        fieldRemedy: 'Establish a strict morning and midday watering routine; keep sand permanently damp.'
      }
    ],
    calculator: {
      tab: 'food',
      title: 'Food Preservation & Cooling Sizer',
      hint: 'Size evaporative Zeer pot storage volume for your vegetable harvest.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Zeer Pot Commissioning Season',
      targetAction: 'Set up Zeer evaporative coolers to preserve garden produce during intense spring heat.'
    }
  },

  'small-livestock-poultry': {
    blueprint: {
      dimensionsAndRatios: [
        'Mobile Chicken Tractor Footprint: 3.0m (length) x 1.8m (width) x 1.2m (height) with 1.8m² roost/nest shelter',
        'Pasture Stocking Density: 6 to 8 laying hens per tractor unit moved 3.0m onto fresh pasture every 24 hours',
        'Goat Kraal Night Shelter: 1.5 m² elevated slatted bamboo floor per adult goat with 15cm manure drop clearance',
        'High-Protein Maggot/Black Soldier Fly Bioreactor: 500g daily fresh larvae yield from kitchen scraps & offal'
      ],
      sizingFormulas: [
        'Pasture Rotation Math = 8 hens in mobile tractor fully scratch, weed, and manure 100 m² garden bed in 18 days',
        'Egg Production Target = 8 heritage dual-purpose hens yield ~4 to 6 fresh eggs daily on pasture + sprouted grains'
      ],
      metrics: [
        { label: 'Chicken Tractor Move Frequency', value: 'Every 24 Hours', detail: 'Prevents ground parasite cycles & deposits concentrated nitrogen manure' },
        { label: 'Goat Kraal Slatted Floor Gap', value: '15mm Slatted Spacing', detail: 'Manure pellets fall through freely, keeping hooves dry and rot-free' },
        { label: 'Predator Mesh Wire Gauge', value: '1.2mm Welded Wire', detail: 'Buried 20cm skirt outward stopping honey badgers, rats, and mongooses' },
        { label: 'Botanical Deworming Recipe', value: 'Pumpkin Seed & Papaya Seed', detail: 'Natural anthelmintic eliminating internal intestinal nematodes' }
      ]
    },
    materials: [
      { name: 'Lightweight Timber / Bamboo Poles', localAvailability: 'Homestead woodlot / river bamboo stands', purpose: 'Framing lightweight, rigid mobile chicken tractors and shelters' },
      { name: '1.2mm Heavy Welded Wire Mesh & Poultry Netting', localAvailability: 'Hardware store', purpose: 'Predator-proof perimeter enclosing pasture run and roost box' },
      { name: 'Pneumatic Wheels or Hardwood Sled Skids', localAvailability: 'Hardware / repurposed wheelbarrow wheels', purpose: 'Enabling 1 person to move chicken tractor across garden beds easily' },
      { name: 'Corrugated Iron Roofing Sheet (Tin)', localAvailability: 'Local building suppliers', purpose: 'Waterproof shade canopy protecting roost box from torrential rain' },
      { name: 'Papaya Seeds & Crushed Raw Garlic Cloves', localAvailability: 'Homestead orchard & vegetable beds', purpose: 'Natural botanical vermifuge and immune system booster for poultry and goats' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Chicken Tractor Framing & Predator Skirt',
        title: 'Construct 3m x 1.8m Lightweight A-Frame Tractor',
        timing: 'Day 1–2',
        seasonalWindow: 'Year-Round Construction',
        instructions: 'Build a 3m x 1.8m A-frame structure using bamboo or 50x50mm pine. Enclose rear 1m as a weather-tight roost box with perches and 2 nest boxes. Wrap pasture run in 1.2mm welded wire mesh with a 20cm outward wire skirt.',
        criticalCheck: 'Ensure total tractor weight allows 1 adult to lift and pull easily with front tow rope.'
      },
      {
        stepNumber: 2,
        phase: 'Daily Rotational Pasture Grazing Cadence',
        title: 'Move Tractor 3m Forward Every Morning',
        timing: '07:30 Daily',
        seasonalWindow: 'Continuous Management',
        instructions: 'Release birds into run at dawn. Pull tractor forward 3 meters onto a fresh patch of grass or harvested garden bed. Hens consume weed seeds, insects, and deposit manure in an even grid.',
        criticalCheck: 'Never leave birds in the same spot >48 hours to prevent soil compaction and parasite buildup.'
      },
      {
        stepNumber: 3,
        phase: 'Goat Kraal Slatted Floor & Fodder Racks',
        title: 'Build Elevated Slatted Goat Kraal',
        timing: 'Day 3–4',
        seasonalWindow: 'Dry Season Construction',
        instructions: 'Construct an elevated goat shelter 50cm above ground with a 15mm-spaced slatted bamboo floor. Manure drops through to the ground below for easy daily raking. Mount elevated hay mangers for Moringa and Leucaena fodder.',
        criticalCheck: 'Keep goats off damp ground at night to eliminate foot rot and internal lung parasites.'
      },
      {
        stepNumber: 4,
        phase: 'Botanical Parasite Control Protocol',
        title: 'Administer Crushed Papaya & Pumpkin Seeds',
        timing: 'Monthly Routine',
        seasonalWindow: 'Year-Round Health Protocol',
        instructions: 'Pound dried papaya seeds and raw pumpkin seeds into a fine powder. Mix into morning feed ration (1 tablespoon per 5 birds) for 3 consecutive days. Add crushed raw garlic cloves to drinking water.',
        criticalCheck: 'Natural cucurbitacin in pumpkin seeds paralyzes intestinal worms for rapid expulsion.'
      },
      {
        stepNumber: 5,
        phase: 'Deep Bedding Manure Harvesting & Composting',
        title: 'Rake Kraal Manure Directly into Compost Heaps',
        timing: 'Weekly',
        seasonalWindow: 'Continuous Fertility Cycle',
        instructions: 'Rake the dry nitrogenous goat manure pellets from underneath the slatted floor. Mix directly into thermophilic compost heaps or use as basal nutrition for Pfumvudza planting stations.',
        criticalCheck: 'Compost poultry and goat manure for at least 6 weeks before applying to root vegetable beds.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Predator Burrowing Under Chicken Tractor Skirt',
        symptom: 'Mongoose or stray dogs dig under frame at night, killing poultry flock',
        rootCause: 'Failing to install a 20cm outward-facing flat wire mesh skirt around tractor base',
        fieldRemedy: 'Lace a 20cm wide welded wire apron along bottom perimeter that lays flat on grass.'
      },
      {
        pitfall: 'Foot Rot in Goats from Wet Muddy Kraal Floors',
        symptom: 'Goats limp, hooves turn soft and emit foul odor with deep bacterial sores',
        rootCause: 'Goats penned overnight on wet, urine-soaked ground or un-drained mud pens',
        fieldRemedy: 'Transfer flock to an elevated slatted floor shelter and dip affected hooves in 10% zinc sulfate solution.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Livestock & Pasture Rotation Sizer',
      hint: 'Calculate paddock rotation schedules and daily livestock feed requirements.'
    },
    almanac: {
      season: 'Year-Round / Any Season',
      monthWindow: 'Monthly Cycle',
      label: 'Livestock Health & Deworming Routine',
      targetAction: 'Administer monthly botanical dewormers and inspect chicken tractor wire security.'
    }
  },

  'salt-curing-solar-biltong': {
    blueprint: {
      dimensionsAndRatios: [
        'Dry Salt-Curing Ratio (Fish / Beef): 30g–35g Non-Iodized Pure Coarse Salt + 5g Cracked Black Pepper per 1kg Fresh Meat (3.5% Salt by Weight)',
        'Vinegar Surface Sterilization Bath: Dip meat strips in 5% Acidity Vinegar solution for 20 seconds before seasoning',
        'Meat Strip Slicing Dimensions: 15cm–20cm (length) x 3cm (width) x 1.5cm (thickness) cut strictly along the muscle grain',
        'Biltong Solar Drying Box Temperature: 32°C to 38°C with continuous passive cross-ventilation in total shade'
      ],
      sizingFormulas: [
        'Weight Loss Yield = 10kg fresh lean beef/fish cures into ~4.5kg to 5.0kg of shelf-stable biltong (50% weight loss)',
        'Storage Shelf-Life = Properly cured biltong stored in airtight jars with silica packs remains stable for 12+ months'
      ],
      metrics: [
        { label: 'Salt Curing Concentration', value: '3.0% – 3.5% by Weight', detail: 'Lowers water activity (Aw < 0.85) stopping bacterial growth' },
        { label: 'Vinegar Bath Contact', value: '20 Seconds Dip', detail: 'Acidifies meat surface (pH < 4.6), killing Salmonella & Listeria' },
        { label: 'Target Moisture Loss', value: '45% – 55% Weight Loss', detail: 'Deep mahogany interior with zero wet or squishy core pockets' },
        { label: 'Hanging Airflow Velocity', value: '0.2 – 0.4 m / second', detail: 'Constant warm breeze preventing surface moisture stagnation' }
      ]
    },
    materials: [
      { name: 'Pure Coarse Non-Iodized Sea Salt', localAvailability: 'Lake Chilwa / coastal salt depots', purpose: 'Osmotic dehydration extracting moisture from muscle fibers' },
      { name: 'Brown Vinegar (5% Acetic Acid)', localAvailability: 'Standard grocery store', purpose: 'Surface sterilization and tenderizing outer meat fibers' },
      { name: 'Toasted Crushed Coriander & Black Pepper', localAvailability: 'Homestead spice beds / local market', purpose: 'Natural antioxidant, antimicrobial, and insect deterrent spice crust' },
      { name: 'Stainless Steel Meat S-Hooks', localAvailability: 'Hardware store / fabricated from stainless wire', purpose: 'Hanging meat strips with zero point-to-point surface contact' },
      { name: 'Ventilated Biltong Drying Box with Fly Screen', localAvailability: 'Homestead carpentry workshop', purpose: 'Fly-proof, dust-proof shaded convection dehydration chamber' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Muscle Trimming & Grain-Parallel Slicing',
        title: 'Trim All Soft Fat & Slice Along Meat Grain',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Dry Season Processing (April–August)',
        instructions: 'Trim away all soft yellow fat, gristle, and silver-skin from fresh beef or lake fish. Cut meat into 1.5cm thick, 3cm wide strips cutting strictly ALONG the natural grain of the muscle.',
        criticalCheck: 'Never cut across the grain for biltong (strips will tear and break when hung).'
      },
      {
        stepNumber: 2,
        phase: 'Vinegar Surface Dip & Acidification',
        title: 'Submerge Strips in Vinegar for 20 Seconds',
        timing: 'Immediate',
        seasonalWindow: 'Processing Phase',
        instructions: 'Submerge meat strips in a bowl of 5% brown vinegar for 20 seconds. Remove and gently squeeze off excess liquid. The acid immediately lowers surface pH, killing any surface pathogens.',
        criticalCheck: 'Do not soak meat in vinegar for hours (turns meat mushy and sour).'
      },
      {
        stepNumber: 3,
        phase: 'Spicing & Dry Curing Rub',
        title: 'Coat Evenly with Salt, Pepper & Toasted Coriander',
        timing: 'Immediate',
        seasonalWindow: 'Processing Phase',
        instructions: 'Toast whole coriander seeds in a dry pan and crush coarsely. Blend 35g coarse salt, 15g coriander, and 5g black pepper per 1kg meat. Rub seasoning thoroughly into every strip. Layer in a glass dish for 4 hours in cool shade.',
        criticalCheck: 'Use coarse salt crystals; fine table salt penetrates too quickly, creating an overly salty crust.'
      },
      {
        stepNumber: 4,
        phase: 'Hanging in Shaded Biltong Drying Box',
        title: 'Hang on Stainless S-Hooks with Zero Contact',
        timing: 'Day 1 (Afternoon)',
        seasonalWindow: 'Drying Phase',
        instructions: 'Insert stainless S-hooks into the thick end of each strip. Hang inside the fly-proof biltong box. Ensure strips hang freely without touching adjacent pieces or side walls. Position box in a breezy, shaded corridor.',
        criticalCheck: 'Ensure fly-screen is 100% gap-free (a single blowfly can lay eggs in drying meat).'
      },
      {
        stepNumber: 5,
        phase: 'Weight-Loss Verification & Airtight Storage',
        title: 'Dry for 4 to 6 Days Until 50% Weight Loss',
        timing: 'Days 4 to 6',
        seasonalWindow: 'Storage Phase',
        instructions: 'Weigh sample strips daily. When strips lose 50% of their starting weight and feel firm with slight flex, cure is complete. Slice thinly with a sharp knife or store whole in airtight glass jars with oxygen absorbers.',
        criticalCheck: 'Store in airtight jars in a dark, cool pantry; never store in humid plastic bags.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Fly Contamination (Blowfly Maggot Infestation)',
        symptom: 'Tiny white fly larvae appear in crevices of drying meat strips within 48 hours',
        rootCause: 'Biltong box had tiny tears in fly mesh or door was left cracked open during daylight',
        fieldRemedy: 'Discard infested meat; inspect box with a flashlight, seal all joints, and replace mesh with fine stainless wire screen.'
      },
      {
        pitfall: 'Case-Hardening in High Heat (>45°C)',
        symptom: 'Outside turns into black rock while the center remains wet, raw, and starts rotting',
        rootCause: 'Drying in hot direct sun or using high-wattage heating lamps without adequate air movement',
        fieldRemedy: 'Dry strictly in passive shaded ambient air with continuous gentle cross-ventilation.'
      }
    ],
    calculator: {
      tab: 'food',
      title: 'Meat Preservation & Food Reserve Sizer',
      hint: 'Calculate seasonal cured biltong yields and long-term pantry protein reserves.'
    },
    almanac: {
      season: 'Cold Dry Season',
      monthWindow: 'June – August',
      label: 'Winter Meat Curing & Biltong Season',
      targetAction: 'Cure and dehydrate biltong during the cool, dry winter months when humidity and fly activity are lowest.'
    }
  }
};
