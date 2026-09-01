import { DetailedSkillProtocol } from '../skillsTechnicalProtocols';

export const SOIL_BREEDING_PROTOCOLS: Record<string, DetailedSkillProtocol> = {
  'soil-science-indepth': {
    blueprint: {
      dimensionsAndRatios: [
        'Mason Jar Soil Texture Test: 1/3 Soil Sample + 2/3 Water + 1 tsp Detergent in 1L Glass Mason Jar',
        'Settling Timeline Fractions: Sand settles at 1 minute, Silt settles at 2 hours, Clay settles at 48 hours',
        'Katondo Acidic Clay Correction: 250g–500g Agricultural Lime (CaCO3) or Wood Ash per square meter to raise pH by 1.0 unit',
        'Soil Organic Matter (SOM) Target: 5%–8% SOM in top 20cm of bio-intensive garden beds'
      ],
      sizingFormulas: [
        'Clay Fraction % = (Clay Layer Height mm / Total Soil Column Height mm) × 100',
        'Liming Requirement = 500g Dolomitic Lime per 1 m² on heavy Katondo clay raises pH from 5.2 to optimal 6.5'
      ],
      metrics: [
        { label: 'Optimal Soil pH Range', value: 'pH 6.2 – 6.8', detail: 'Maximizes phosphorus, calcium, and trace mineral bioavailability' },
        { label: 'Sand Fraction Settling', value: '1 Minute (Bottom)', detail: 'Coarse mineral particles dropping out of suspension rapidly' },
        { label: 'Clay Fraction Settling', value: '24 – 48 Hours (Top)', detail: 'Colloidal clay mineral plate platelets settling out last' },
        { label: 'Target Infiltration Rate', value: '25mm – 50mm / Hour', detail: 'Balances fast moisture absorption with high water retention' }
      ]
    },
    materials: [
      { name: '1-Liter Straight-Sided Glass Mason Jar', localAvailability: 'Homestead pantry stores', purpose: 'Performing precision volumetric soil texture settling test' },
      { name: 'Liquid Dishwashing Soap / Detergent', localAvailability: 'Standard local grocery store', purpose: 'Surfactant breaking soil aggregates into individual sand, silt, and clay particles' },
      { name: 'Millimeter Ruler & Permanent Marker', localAvailability: 'Stationery shop', purpose: 'Measuring settled mineral layer heights accurately' },
      { name: 'Agricultural Lime (Dolomite) & Wood Ash', localAvailability: 'Local lime quarries / homestead hearth', purpose: 'Buffering acidic tropical red Katondo soils (neutralizing Al3+ toxicity)' },
      { name: 'Cured Forest Loam Inoculant (IMO)', localAvailability: 'Undisturbed indigenous Miombo woodland floor', purpose: 'Seeding beneficial indigenous mycorrhizal fungi and bacteria' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Representative Core Sample Collection',
        title: 'Collect Soil Samples to 20cm Depth',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Hot Dry Preparation / Pre-Planting',
        instructions: 'Scrape away surface mulch. Take 5 representative soil cores (0-20cm depth) across the garden bed in a zig-zag pattern. Mix cores in a clean bucket. Remove stones and dry in shade for 24 hours.',
        criticalCheck: 'Do not sample muddy, waterlogged soil or spots directly under fresh manure piles.'
      },
      {
        stepNumber: 2,
        phase: 'Mason Jar Hydration & Agitation',
        title: 'Fill Jar, Add Surfactant & Shake Vigorously',
        timing: 'Day 2 (Morning)',
        seasonalWindow: 'Pre-Planting Analysis',
        instructions: 'Fill a straight-sided 1L glass jar 1/3 full with sifted dry soil. Add clean water until 4/5 full. Add 1 teaspoon of liquid soap. Cap tightly and shake vigorously for 5 full minutes until all clods disintegrate.',
        criticalCheck: 'Verify that all soil aggregates are completely suspended without dry clumps at the base.'
      },
      {
        stepNumber: 3,
        phase: 'Time-Phased Sedimentation Markings',
        title: 'Mark Sand (1 min), Silt (2 hrs) & Clay (48 hrs)',
        timing: 'Minutes 1 to 48 Hours',
        seasonalWindow: 'Laboratory Analysis',
        instructions: 'Place the jar on a level, vibration-free shelf. At exactly 1 minute, mark the top of the sand layer with a pen. At 2 hours, mark the top of the silt layer. At 48 hours, mark the top of the fine clay layer and total height.',
        criticalCheck: 'Do not bump or shake the jar during the 48-hour settling period.'
      },
      {
        stepNumber: 4,
        phase: 'USDA Texture Triangle Calculation',
        title: 'Calculate Percentages & Determine Soil Class',
        timing: 'Day 4',
        seasonalWindow: 'Soil Management Phase',
        instructions: 'Measure each layer in millimeters. Calculate: % Sand = (Sand / Total) x 100, % Silt = (Silt / Total) x 100, % Clay = (Clay / Total) x 100. Reference the USDA Soil Texture Triangle to determine if soil is Sandy Loam, Clay Loam, or Heavy Clay.',
        criticalCheck: 'Ensure the sum of all 3 percentages equals 100% (±1%).'
      },
      {
        stepNumber: 5,
        phase: 'Custom Mineral & Biological Amending',
        title: 'Apply Lime, Compost and Biochar for Katondo Clay',
        timing: 'Month: October (Pre-Rains)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'For heavy acidic Katondo clay (pH < 5.5, Clay > 40%), broadcast 500g agricultural lime and 5kg compost per square meter. Work into the top 15cm with a broadfork to flocculate clay and open air pores.',
        criticalCheck: 'Allow 4 weeks after liming before planting sensitive legume seedlings.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Jar Water Remains Turbid / Muddy After 48 Hours',
        symptom: 'Liquid never clears; fine colloidal particles stay suspended in water column',
        rootCause: 'Highly dispersed ultrafine sodium or organic colloids with insufficient surfactant/electrolyte',
        fieldRemedy: 'Add 1/2 teaspoon of alum (aluminum potassium sulfate) or table salt, shake briefly, and let settle for 12h.'
      },
      {
        pitfall: 'Over-Liming Soil Beyond pH 7.5',
        symptom: 'Crop leaves develop yellow interveinal chlorosis due to locked iron and manganese',
        rootCause: 'Applying excessive unmeasured wood ash or quicklime in one season',
        fieldRemedy: 'Top-dress with acidic pine needle mulch or sulfur-rich aged compost to bring pH back down to 6.5.'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Soil Amendment & Compost Sizer',
      hint: 'Calculate lime, biochar, and compost quantities based on your soil test results.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Soil Testing & Liming Window',
      targetAction: 'Perform jar tests and broadcast lime 6 weeks prior to planting so soil minerals rebalance.'
    }
  },

  'broadforking-notill': {
    blueprint: {
      dimensionsAndRatios: [
        'Bio-Intensive Bed Dimensions: 75cm–80cm (bed width) x 15m (length) x 30cm deep loosened root zone',
        'Broadfork Tine Dimensions: 5 tempered steel tines spaced 15cm apart, each 25cm–30cm long',
        'Permanent Pathway Width: 45cm–50cm wide dedicated walking trench (zero foot traffic on crop beds)',
        'Aeration Leverage Angle: Step on crossbar to sink tines vertically, pull handles back to maximum 45° angle'
      ],
      sizingFormulas: [
        'Standard Bed Footprint = 0.8m wide × 15m long = 12 m² active growing area per standard bio-intensive bed',
        'Broadfork Work Rate = 1 person aerates 100 linear meters of bed (80 m²) in ~45 minutes without tiring'
      ],
      metrics: [
        { label: 'Tine Penetration Depth', value: '25cm – 30cm', detail: 'Shatters subsoil hardpans without inverting stratified microbial layers' },
        { label: 'Handle Pull-Back Angle', value: '30° – 45° Maximum', detail: 'Cracks soil sub-layer; never lever past 45° to avoid turning soil' },
        { label: 'Permanent Pathway Width', value: '45cm Dedicated', detail: 'Concentrates 100% of human walking compaction away from root zone' },
        { label: 'Surface Till Depth', value: '0cm (Zero Inversion)', detail: 'Preserves delicate fungal hyphae and earthworm tunnels' }
      ]
    },
    materials: [
      { name: '5-Tine Steel Broadfork (U-Bar / Guerilu)', localAvailability: 'Homestead fabrication by village blacksmith / agro-depot', purpose: 'Deep subsoil aeration and hardpan fracturing with zero soil inversion' },
      { name: 'Bow Rake & Flat-Back Bed Shaper', localAvailability: 'Standard hardware store', purpose: 'Smoothing bed top 5cm tilth without disturbing deeper structure' },
      { name: 'Organic Compost / Worm Castings Layer', localAvailability: 'Homestead compost heaps', purpose: 'Surface top-dressing delivering nutrients downward via rain percolation' },
      { name: 'Thick Dry Straw / Vetiver Mulch Blanket', localAvailability: 'Field crop residue / cut vetiver grass', purpose: 'Continuous surface shield stopping weed seed germination and crusting' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Permanent Bed & Pathway Layout',
        title: 'Establish 80cm Beds with 45cm Footpaths',
        timing: 'September (Dry Season)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Mark permanent 80cm wide beds separated by 45cm walking paths using stakes and twine. Once established, never step onto the growing bed. All weeding, sowing, and harvesting are performed from pathways.',
        criticalCheck: 'Ensure bed width allows comfortable reach from either pathway without stepping on soil.'
      },
      {
        stepNumber: 2,
        phase: 'Vertical Broadfork Tine Insertion',
        title: 'Step on Crossbar to Drive Tines 30cm Deep',
        timing: 'Morning (When soil is slightly moist)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Position the broadfork perpendicular to the bed. Stand with both feet on the crossbar, using body weight to drive the 5 steel tines straight down 30cm into the soil.',
        criticalCheck: 'If soil is bone-dry and impenetrable, pre-soak bed with 20L water 12h beforehand.'
      },
      {
        stepNumber: 3,
        phase: 'Leverage & Subsoil Hardpan Fracturing',
        title: 'Pull Handles Back to 45° to Crack Soil',
        timing: 'Continuous Movement',
        seasonalWindow: 'Pre-Planting Aeration',
        instructions: 'Gently pull the dual wooden/steel handles back toward your body until they reach a 30°–45° angle. You will hear and feel the subsoil hardpan crack and lift. Never lever handles down to the ground.',
        criticalCheck: 'Do NOT invert or flip the soil; keep dark topsoil on top and subsoil underneath.'
      },
      {
        stepNumber: 4,
        phase: 'Step-Back Cadence Across Bed Length',
        title: 'Step Back 15cm–20cm & Repeat Down Bed',
        timing: '15 Minutes per 15m Bed',
        seasonalWindow: 'Pre-Planting Aeration',
        instructions: 'Step off the tool, lift the broadfork, move backward 15-20cm, and repeat the insertion. Work continuously down the full length of the 15m bed.',
        criticalCheck: 'Ensure consistent 15cm step intervals to create a uniform subterranean fracture network.'
      },
      {
        stepNumber: 5,
        phase: 'Surface Nutrition & Mulch Sealing',
        title: 'Top-Dress with 2cm Compost & Re-Mulch',
        timing: 'Immediately Post-Broadforking',
        seasonalWindow: 'Pre-Planting Preparation',
        instructions: 'Spread a 2cm layer of sifted compost and worm castings across the surface. Rake smooth with a bow rake. Earthworms and rainwater will carry the nutrients down into the newly opened fracture cracks.',
        criticalCheck: 'Cap immediately with a 5cm dry grass mulch blanket to protect aerated microbes.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Levering Handles All the Way to the Ground',
        symptom: 'Deep sterile subsoil and dormant weed seeds are brought to the surface, breaking fork handles',
        rootCause: 'Treating broadfork like a moldboard plow instead of a fracture aerator',
        fieldRemedy: 'Stop levering at exactly 45° angle once the soil surface heaves 3cm upwards.'
      },
      {
        pitfall: 'Walking on Broadforked Growing Beds',
        symptom: 'Soil re-compacts immediately, destroying all subterranean air channels within 24h',
        rootCause: 'Stepping into the bed instead of working exclusively from designated 45cm pathways',
        fieldRemedy: 'Install permanent corner wooden stakes or stone borders to physically delineate walking paths.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Homestead Bed & Pathway Layout Sizer',
      hint: 'Calculate number of standard 15m bio-intensive beds your parcel accommodates.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Deep Bed Aeration Window',
      targetAction: 'Broadfork all permanent vegetable beds before first rains to maximize infiltration.'
    }
  },

  'seed-saving-heirloom': {
    blueprint: {
      dimensionsAndRatios: [
        'Tomato/Cucumber Seed Wet Fermentation: Submerge seeds in pulp liquid in glass jar for 72 hours at 22°C–26°C',
        'Seed Dehydration Target: Dry on non-stick ceramic plates until moisture drops below 8% (shatters under hammer, does not dent)',
        'Storage Climate Equation: Storage Temp (°F) + Relative Humidity (%) must equal LESS than 100 (Harrington\'s Rule)',
        'Desiccant Sizing: 50g Food-grade Silica Gel or 100g Toasted Dry Powdered Rice per 1-Liter sealed glass jar'
      ],
      sizingFormulas: [
        'Harrington\'s Rule = Storage Temp (°F) + Relative Humidity (%) < 80 for elite 5-10 year heirloom seed viability',
        'Isolation Distance = 500m isolation (or insect mesh bagging) prevents cross-pollination between open-pollinated corn varieties'
      ],
      metrics: [
        { label: 'Fermentation Duration', value: '48 – 72 Hours', detail: 'Destroys gelatinous germination inhibitors & seed-borne pathogens' },
        { label: 'Target Seed Moisture', value: '6% – 8% Maximum', detail: 'Critical threshold preventing internal embryo fungal rot & decay' },
        { label: 'Germination Test Standard', value: '≥ 85% Viability', detail: 'Tested by sprouting 20 seeds on damp paper towel in darkness' },
        { label: 'Desiccant Re-activation', value: '120°C in Oven / Skillet', detail: 'Roast dry rice or silica gel for 1 hour before packing' }
      ]
    },
    materials: [
      { name: 'Airtight Glass Mason Jars with Rubber Seals', localAvailability: 'Homestead canning jars or repurposed glass bottles', purpose: '100% moisture-proof and rodent-proof seed storage vault' },
      { name: 'Food-Grade Silica Gel / Roasted Dry White Rice', localAvailability: 'Local pharmacies / village grocery stores', purpose: 'Internal desiccant absorbing ambient humidity inside sealed jars' },
      { name: 'Fine-Mesh Brass / Stainless Seed Strainers', localAvailability: 'Kitchen supply stores', purpose: 'Washing fermented gelatinous pulp away from clean seed coats' },
      { name: 'Unglazed Ceramic Plates / Parchment Paper', localAvailability: 'Homestead kitchen', purpose: 'Non-stick surface for uniform air-drying of damp seeds (never use paper towels)' },
      { name: 'Waterproof Labeling Tape & Archive Ink Pen', localAvailability: 'Stationery depot', purpose: 'Recording variety name, harvest date, and germination test score' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Elite Mother Plant Selection',
        title: 'Tag Disease-Free, High-Yielding Parent Plants',
        timing: 'Mid-Season (During Peak Growth)',
        seasonalWindow: 'Rainy Season (January–March)',
        instructions: 'Walk fields and tie brightly colored ribbons to the most vigorous, disease-free, and productive plants. Never save seed from weak or diseased specimens. Allow fruits to fully ripen on the vine.',
        criticalCheck: 'Verify that parent plants are open-pollinated heirlooms, NOT commercial F1 hybrids.'
      },
      {
        stepNumber: 2,
        phase: 'Wet Pulp Lactic Fermentation (Solanaceae)',
        title: 'Ferment Tomato/Squash Pulp for 72 Hours',
        timing: 'At Harvest (April–May)',
        seasonalWindow: 'Harvest & Storage Season',
        instructions: 'Squeeze tomato seeds and surrounding gel into a clean glass jar. Add 2 tablespoons of water. Leave uncovered at room temperature for 3 days. A layer of white mold will form on top, digesting the germination-inhibiting gel.',
        criticalCheck: 'Stir once daily; pour out immediately on Day 3 to prevent seeds from prematurely sprouting.'
      },
      {
        stepNumber: 3,
        phase: 'Decanting, Washing & Flotation Test',
        title: 'Decant Floating Chaff & Rinse Heavy Viable Seeds',
        timing: 'Day 3 of Fermentation',
        seasonalWindow: 'Harvest & Storage Season',
        instructions: 'Fill the jar with water and swirl. Pour off the floating mold, pulp, and hollow duds. Heavy viable seeds sink to the bottom. Repeat rinsing 3 times until only clean seeds remain. Pour into a fine mesh strainer.',
        criticalCheck: 'Discard all floating seeds; only bottom-sinking seeds possess fertile embryos.'
      },
      {
        stepNumber: 4,
        phase: 'Non-Stick Shade Dehydration',
        title: 'Spread on Ceramic Plates in Breeze for 7 Days',
        timing: 'Days 4 to 10',
        seasonalWindow: 'Harvest & Storage Season',
        instructions: 'Spread wet seeds thinly on unglazed ceramic plates or baking parchment in a warm, shady, well-ventilated room. Stir daily with fingers so seeds dry evenly without sticking.',
        criticalCheck: 'Never dry seeds on paper towels (they stick permanently) or in direct hot sun (kills embryos).'
      },
      {
        stepNumber: 5,
        phase: 'Dryness Nail Test & Sealed Jar Vaulting',
        title: 'Verify <8% Moisture & Seal with Desiccant',
        timing: 'Day 10',
        seasonalWindow: 'Harvest & Storage Season',
        instructions: 'Test dryness: press a seed with your fingernail. A dry seed resists denting and snaps cleanly under a hammer blow. Pack into airtight glass jars with 2 tablespoons of toasted dry rice. Store in the darkest, coolest room.',
        criticalCheck: 'Store jars in a cool, insulated cupboard (< 20°C); heat degrades seed lifespan rapidly.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Saving Seed from F1 Hybrid Varieties',
        symptom: 'Next generation crops produce wildly erratic yields, bitter fruits, and stunted stalks',
        rootCause: 'F1 hybrids segregate genetically in F2 generation according to Mendelian ratios',
        fieldRemedy: 'Source exclusively open-pollinated, true-breeding heirloom landrace seed stocks.'
      },
      {
        pitfall: 'Drying Seeds on Direct Corrugated Tin Roofs',
        symptom: 'Seeds appear beautiful but achieve 0% germination in subsequent season tests',
        rootCause: 'Temperatures above 40°C on hot metal cook and kill the living plant embryo inside the seed coat',
        fieldRemedy: 'Dry strictly in passive shaded rooms with cross-ventilation at temperatures below 35°C.'
      }
    ],
    calculator: {
      tab: 'food',
      title: 'Homestead Seed Bank & Food Reserve Sizer',
      hint: 'Calculate seed quantities required to plant your acreage next season.'
    },
    almanac: {
      season: 'Harvest & Storage',
      monthWindow: 'April – June',
      label: 'Heirloom Seed Extraction Window',
      targetAction: 'Ferment and preserve open-pollinated seeds from the best-performing autumn harvest crops.'
    }
  },

  'fruit-tree-grafting': {
    blueprint: {
      dimensionsAndRatios: [
        'Whip-and-Tongue Cut Length: 2.5cm–3.0cm matching sloping diagonal cut on rootstock and scion',
        'Scion Diameter Matching: 8mm–10mm caliper thickness (pencil thickness) matching rootstock stem exactly',
        'Cambium Alignment: Minimum 1 edge (ideally both edges) of thin green inner vascular cambium aligned precisely',
        'Parafilm Binding Tension: 4 overlapping wraps stretching film 200% to create airtight, moisture-proof seal'
      ],
      sizingFormulas: [
        'Grafting Success Rate = Aligning 2 cambium edges + airtight wax seal yields >90% take rate within 21 days',
        'Scionwood Harvest = Collect 15cm–20cm dormant terminal twigs with 3-4 plump dormant vegetative buds'
      ],
      metrics: [
        { label: 'Scion/Stock Caliper', value: '8mm – 10mm (Pencil)', detail: 'Matches active vascular flow volume between stock and scion' },
        { label: 'Cambium Contact Area', value: '> 85% Surface Area', detail: 'Interlocking tongue increases mechanical strength & cell bridging' },
        { label: 'Callus Formation Time', value: '14 – 21 Days', detail: 'Kept under 50% nursery shade until buds visibly burst' },
        { label: 'Grafting Knife Sharpness', value: 'Razor / Shaving Sharp', detail: 'Single clean slice prevents tearing or bruising delicate cambium' }
      ]
    },
    materials: [
      { name: 'Razor-Sharp Grafting Knife (Single Bevel)', localAvailability: 'Specialty agro-tool supplier / carbon steel pocketknife honed on oil stone', purpose: 'Making flat, un-bruised sloping planar cuts on wood' },
      { name: 'Parafilm / Stretch Grafting Poly-Tape', localAvailability: 'Nursery supply / repurposed flexible poly-strips', purpose: 'Airtight, waterproof wrapping that breathes and degrades in sunlight' },
      { name: 'Pure Molten Beeswax / Tree Grafting Sealer', localAvailability: 'Homestead apiary', purpose: 'Sealing exposed cut tip of scion against desiccation and fungal spores' },
      { name: '70% Isopropyl Alcohol / Rubbing Spirit', localAvailability: 'Village pharmacy', purpose: 'Sterilizing blade between every single plant to stop virus transfer' },
      { name: 'Dormant Scionwood Sticks & Damp Cloth', localAvailability: 'Elite mother orchard trees', purpose: 'Fresh vegetative propagation material stored cool in damp burlap' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Dormant Scion Collection & Storage',
        title: 'Collect Pencil-Thick Scions with Plump Buds',
        timing: 'July–August (Cold Dry Season)',
        seasonalWindow: 'Cold Dry Season',
        instructions: 'Cut 20cm healthy terminal shoots (pencil-thick) from proven high-yield mother trees while buds are dormant. Wrap in damp paper/cloth, place in a sealed plastic bag, and keep in a cool dark cellar.',
        criticalCheck: 'Collect scions strictly from dormant shoots before spring bud-burst occurs.'
      },
      {
        stepNumber: 2,
        phase: 'Rootstock & Scion Caliper Matching',
        title: 'Select Matching Seedling Rootstock',
        timing: 'August (Late Winter)',
        seasonalWindow: 'Cold Dry Season',
        instructions: 'Choose a vigorous 1-year-old seedling rootstock (e.g. wild local mango or sour orange). Measure diameter at 15cm above soil line. Select a scion stick of the exact same diameter (8-10mm).',
        criticalCheck: 'Verify both rootstock and scion wood are actively healthy with clean green inner bark.'
      },
      {
        stepNumber: 3,
        phase: 'Precision Whip & Tongue Cuts',
        title: 'Make Matching 2.5cm Sloping Cuts & Interlocking Tongues',
        timing: 'Immediate Assembly',
        seasonalWindow: 'Grafting Season',
        instructions: 'Wipe blade with alcohol. Make a single, smooth 2.5cm diagonal slice across the rootstock. Make an identical matching cut on the scion base. Cut a small downward interlocking slit (tongue) 1/3 down each face. Push tongues together.',
        criticalCheck: 'Ensure the thin bright-green cambium lines match up perfectly on at least one side.'
      },
      {
        stepNumber: 4,
        phase: 'Airtight Parafilm Binding & Tip Sealing',
        title: 'Wrap Tightly with Tape & Seal Scion Tip with Wax',
        timing: 'Immediate (<60 seconds after cut)',
        seasonalWindow: 'Grafting Season',
        instructions: 'Stretch grafting tape tightly around the union, overlapping each turn by 50% to lock cuts together with firm pressure. Dab molten beeswax over the exposed top cut of the scion to stop moisture loss.',
        criticalCheck: 'Wrap within 60 seconds of cutting; drying air rapidly kills exposed cambium cells.'
      },
      {
        stepNumber: 5,
        phase: 'Nursery Shade Care & Rootstock Sucker Pruning',
        title: 'Keep in 50% Shade & Rub Off Wild Suckers',
        timing: 'Weeks 1 to 4 Post-Graft',
        seasonalWindow: 'Spring Nursery Care',
        instructions: 'Place grafted pots in 50% shade. Water regularly. As rootstock pushes wild shoots (suckers) below the graft union, rub them off immediately with fingers so all energy feeds the scion buds.',
        criticalCheck: 'Scion buds will burst green within 21 days; do not remove tape until shoots reach 15cm.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Misaligning the Green Cambium Layers',
        symptom: 'Scion dries into a shriveled brown twig after 14 days without pushing any green buds',
        rootCause: 'Wood was placed centrally without ensuring green inner bark edges physically touch',
        fieldRemedy: 'Always align at least one outer edge perfectly flush so vascular pipelines bridge together.'
      },
      {
        pitfall: 'Allowing Wild Rootstock Suckers to Grow',
        symptom: 'Vigorous wild branches grow below graft while the elite scion starves and dies',
        rootCause: 'Rootstock naturally diverts all sap flow to its own native buds below the wound',
        fieldRemedy: 'Inspect nursery weekly; pinch off every single bud emerging below the graft tape line.'
      }
    ],
    calculator: {
      tab: 'land',
      title: 'Orchard Guild & Tree Nursery Sizer',
      hint: 'Plan rootstock propagation quantities and multi-year fruit yields.'
    },
    almanac: {
      season: 'Cold Dry Season',
      monthWindow: 'July – August',
      label: 'Winter Fruit Tree Grafting Season',
      targetAction: 'Perform whip-and-tongue and cleft grafts on dormant fruit trees before spring sap flow.'
    }
  },

  'biochar-composting': {
    blueprint: {
      dimensionsAndRatios: [
        'Pyrolysis Kon-Tiki Kiln Geometry: 1.2m (top diameter) x 60cm (base depth) cone-shaped steel/clay pit with 60° angle walls',
        'Quenching Volume Ratio: 1 Part Water (or Compost Tea) per 2 Parts Hot Biochar volume to halt combustion at pure carbon state',
        'Inoculation (Charging) Recipe: 100kg Crushed Biochar + 50L Fresh Manure Slurry + 5kg Wood Ash + 10L Worm Tea + 200L Compost Matrix',
        'Soil Application Rate: 5%–10% by volume in top 15cm of garden beds (approx. 2kg–3kg charged biochar per square meter)'
      ],
      sizingFormulas: [
        'Kon-Tiki Burn Yield = 1 burn cycle (2 hours) converts ~300kg dry branches into ~50kg pure porous biochar',
        'Lifetime Soil Impact = 1 single application of inoculated biochar permanently enhances cation exchange capacity (CEC) for 100+ years'
      ],
      metrics: [
        { label: 'Pyrolysis Temperature', value: '550°C – 650°C', detail: 'Burns off volatile smoke gases while preserving high-surface-area carbon skeleton' },
        { label: 'Surface Area Index', value: '300 – 400 m² / gram', detail: 'Microscopic honeycomb housing trillions of mycorrhizal fungi & bacteria' },
        { label: 'Quenching Window', value: 'Immediate at Ash Layer', detail: 'Quench with water the moment a thin white ash layer covers top embers' },
        { label: 'Inoculation Charging Period', value: '14 – 21 Days Minimum', detail: 'Must be saturated with nutrients BEFORE adding to garden beds' }
      ]
    },
    materials: [
      { name: 'Kon-Tiki Flame-Cap Cone Kiln / Pit', localAvailability: 'Sheet metal welded cone or excavated cone in soil', purpose: 'Creating clean top-lit oxygen-depleted flame cap pyrolysis' },
      { name: 'Dry Woody Biomass & Prunings', localAvailability: 'Homestead orchard prunings, dry maize stalks, bamboo', purpose: 'Carbon feedstock for high-porosity biochar production' },
      { name: 'Heavy Wooden Mallet / Tamper', localAvailability: 'Homestead carpentry', purpose: 'Crushing cooled biochar chunks to 2mm–6mm granular size' },
      { name: 'Fresh Cattle Dung & Compost Tea Slurry', localAvailability: 'Homestead livestock kraal', purpose: 'Charging biochar pores with concentrated nitrogen and beneficial microbes' },
      { name: 'High-Volume Water Drum & Hose/Buckets', localAvailability: 'Water storage tanks', purpose: 'Rapid quenching of glowing coals at the end of the burn cycle' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Kon-Tiki Flame-Cap Ignition',
        title: 'Ignite Kindling at Bottom of Cone Kiln',
        timing: 'Day 1 (Morning, Low Wind)',
        seasonalWindow: 'Cold Dry Season (July–August)',
        instructions: 'Stack dry kindling at the bottom of the 1.2m cone kiln. Light the top. Once a clean, roaring flame forms, the flame cap consumes all downward oxygen, creating an oxygen-starved pyrolysis zone below.',
        criticalCheck: 'Feed only dry wood; wet wood produces white smoke and lowers core kiln temperature.'
      },
      {
        stepNumber: 2,
        phase: 'Progressive Layering of Woody Biomass',
        title: 'Add Wood in Thin Layers as Embers Glow Red',
        timing: 'Minutes 15 to 90',
        seasonalWindow: 'Active Pyrolysis Phase',
        instructions: 'Add branch prunings in even layers across the fire. Wait until each layer turns black and glows red before adding the next layer. The top flame consumes all smoke, resulting in near-zero smoke emissions.',
        criticalCheck: 'Never smother the flames; keep an active yellow flame sheet across the entire top rim.'
      },
      {
        stepNumber: 3,
        phase: 'Water Quenching at Ash Cap',
        title: 'Quench Coals the Moment White Ash Forms',
        timing: 'Minute 90 (End of Burn)',
        seasonalWindow: 'Active Pyrolysis Phase',
        instructions: 'When the kiln is full of glowing coals and a thin film of white ash forms on top, immediately drench with 100L of water (or liquid manure tea). Stir thoroughly from the bottom until cold to the touch.',
        criticalCheck: 'Do not delay quenching; unquenched coals will burn down to mineral gray ash.'
      },
      {
        stepNumber: 4,
        phase: 'Mechanical Crushing to Granular Tilth',
        title: 'Crush Cooled Charcoal to 2mm–6mm Size',
        timing: 'Day 2',
        seasonalWindow: 'Preparation Phase',
        instructions: 'Spread damp biochar on a clean concrete slab or tarp. Crush with a heavy wooden tamper until pieces range from rice-grain to pea size (2mm–6mm).',
        criticalCheck: 'Never apply large uncrushed charcoal chunks; fine particle size maximizes soil contact.'
      },
      {
        stepNumber: 5,
        phase: 'Biological Charging & Inoculation',
        title: 'Inoculate with Manure Slurry for 21 Days',
        timing: 'Weeks 2 to 4',
        seasonalWindow: 'Pre-Planting Conditioning',
        instructions: 'Mix 100kg crushed biochar with 50L cattle manure slurry, 10L worm castings, and 200L active compost. Keep moist (60%) and let cure in shade for 3 weeks before adding to garden beds.',
        criticalCheck: 'CRITICAL: Never apply RAW uncharged biochar directly to crops (it locks up nitrogen).'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Applying Raw, Uncharged Biochar Directly to Soil',
        symptom: 'Crops turn pale yellow and stall completely for the entire season (severe nitrogen deficiency)',
        rootCause: 'Raw biochar acts like an empty chemical sponge, adsorbing all available soil nitrogen into its pores',
        fieldRemedy: 'Always pre-charge biochar with manure slurry and urine-water (1:5) for 21 days before soil application.'
      },
      {
        pitfall: 'Smothering Flame Cap with Wet Biomass',
        symptom: 'Thick choking white smoke fills the homestead and biochar is contaminated with sticky tar oils',
        rootCause: 'Adding oversized or wet green wood that drops pyrolysis temperature below 450°C',
        fieldRemedy: 'Use exclusively seasoned dry wood (< 15% moisture) and add small batches that catch fire in seconds.'
      }
    ],
    calculator: {
      tab: 'yield',
      title: 'Soil Amendment & Biochar Sizer',
      hint: 'Calculate biochar feedstock requirements and application tonnage per garden plot.'
    },
    almanac: {
      season: 'Cold Dry Season',
      monthWindow: 'July – August',
      label: 'Winter Biochar Pyrolysis Season',
      targetAction: 'Burn winter orchard prunings in Kon-Tiki kilns and inoculate biochar for spring planting beds.'
    }
  }
};
