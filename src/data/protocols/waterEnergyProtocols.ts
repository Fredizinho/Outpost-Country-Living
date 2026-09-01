import { DetailedSkillProtocol } from '../skillsTechnicalProtocols';

export const WATER_ENERGY_PROTOCOLS: Record<string, DetailedSkillProtocol> = {
  'gravity-water-filtration': {
    blueprint: {
      dimensionsAndRatios: [
        'Bio-Sand Filter Vessel: 1.0m (height) x 30cm (internal diameter) food-grade drum or reinforced concrete column',
        'Stratified Media Depths: 5cm bottom drainage gravel (6mm–12mm) -> 5cm separating fine gravel (2mm–6mm) -> 45cm fine silica sand (0.15mm–0.35mm)',
        'Biolayer Water Standing Depth: Exactly 5cm (±0.5cm) of standing water above sand surface at rest',
        'Controlled Flow Rate: 0.4 to 0.6 Liters per minute (approx. 25–35 Liters/hour through 30cm diameter column)'
      ],
      sizingFormulas: [
        'Flow Rate Limit = 0.4L to 0.6L/min ensures 99% bacterial, protozoan, and parasitic cyst filtration without bypassing',
        'Homestead Daily Clean Water Output = 1 filter operating 4 hours/day yields ~100–140 Liters pure drinking water'
      ],
      metrics: [
        { label: 'Sand Media Effective Size', value: '0.15mm – 0.35mm', detail: 'Uniform silica river sand washed 5 times to remove silt and clay' },
        { label: 'Biolayer (Schmutzdecke) Depth', value: 'Top 1cm – 2cm of Sand', detail: 'Living ecosystem of predatory microbes consuming pathogens' },
        { label: 'Standing Water Head', value: 'Exactly 5.0cm ASL', detail: 'Maintains dissolved oxygen diffusion to keep biolayer alive' },
        { label: 'Pathogen Removal Rate', value: '98.5% – 99.9%', detail: 'Eliminates Cryptosporidium, Giardia, E. coli, and Cholera vibrio' }
      ]
    },
    materials: [
      { name: 'Food-Grade 100L Blue Barrel / Cast Concrete Shell', localAvailability: 'Plastic container depot / local cement casting', purpose: 'Watertight vertical housing column for stratified filter media' },
      { name: 'Washed Quartz Silica River Sand', localAvailability: 'Local sandy riverbeds (sifted through mosquito netting)', purpose: 'Mechanical straining and biological substrate for the Schmutzdecke' },
      { name: 'Graded River Gravel (2mm-6mm & 6mm-12mm)', localAvailability: 'River gully deposits sifted with wire mesh', purpose: 'Under-drainage layer preventing fine sand from washing into outlet pipe' },
      { name: 'Perforated Diffuser Basin / Plate', localAvailability: 'Perforated plastic basin or ceramic lid', purpose: 'Dissipating poured water energy so sand surface is not disrupted' },
      { name: '1/2-Inch PVC Outlet Pipe with Elevated Loop', localAvailability: 'Hardware plumbing store', purpose: 'Creating an elevated siphon maintaining exactly 5cm standing water level' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Sand Washing & Sieve Calibration',
        title: 'Wash Silica River Sand 5 Times in Clean Water',
        timing: 'Day 1 (Morning)',
        seasonalWindow: 'Year-Round Installation',
        instructions: 'Sift coarse river sand through a 1mm wire window screen to remove pebbles. Place sifted sand in a bucket, fill with water, swirl vigorously, and pour off muddy water. Repeat 5 times until rinse water runs crystal clear.',
        criticalCheck: 'Do NOT use crushed masonry quarry dust or beach sand containing salt and shells.'
      },
      {
        stepNumber: 2,
        phase: 'Stratified Media Packing & Submergence',
        title: 'Pack Gravel & Sand Layers Under Water',
        timing: 'Day 1 (Afternoon)',
        seasonalWindow: 'Year-Round Installation',
        instructions: 'Install the 1/2" PVC under-drain pipe. Fill filter 1/3 with clean water. Add 5cm of coarse gravel (6-12mm), followed by 5cm of fine gravel (2-6mm). Slowly pour in 45cm of wet fine silica sand, tapping the sides to prevent air pockets.',
        criticalCheck: 'Always pour sand into water to eliminate dry trapped air bubbles that create water bypass channels.'
      },
      {
        stepNumber: 3,
        phase: 'Diffuser Plate & Elevation Loop Setting',
        title: 'Install Diffuser Plate & Set 5cm Water Head',
        timing: 'Day 1 (Late Afternoon)',
        seasonalWindow: 'Year-Round Installation',
        instructions: 'Place the perforated plastic diffuser plate 5cm above the sand surface. Adjust the external PVC outlet pipe height so that when water stops flowing, exactly 5cm of standing water remains above the sand bed.',
        criticalCheck: 'Verify that standing water level never drops below 4cm or exceeds 6cm.'
      },
      {
        stepNumber: 4,
        phase: 'Biological Schmutzdecke Cultivation',
        title: 'Feed Filter Daily with River Water for 21 Days',
        timing: 'Days 1 to 21 (Maturation Period)',
        seasonalWindow: 'Biological Activation',
        instructions: 'Pour 20L of non-chlorinated river or well water through the filter every single day. Over 14-21 days, a living biofilm (Schmutzdecke) of predatory protozoa and beneficial bacteria will colonize the top 2cm of sand.',
        criticalCheck: 'Never pour chlorinated water into a Bio-Sand filter (chlorine instantly kills the biolayer).'
      },
      {
        stepNumber: 5,
        phase: 'Swirl & Dump Maintenance Protocol',
        title: 'Perform Surface Swirl & Dump when Flow Stalls',
        timing: 'Every 2 to 3 Months (When flow < 0.2 L/min)',
        seasonalWindow: 'Routine Maintenance',
        instructions: 'When biological sediment slows flow to a trickle, remove the diffuser. Gently swirl the top 1cm of standing water with your palm to suspend trapped silt. Scoop out the dirty water. Do NOT dig into deeper sand.',
        criticalCheck: 'Never remove or wash the main 45cm sand column; only clean the surface 1cm water zone.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Chlorinating Raw Water Before Bio-Sand Filtration',
        symptom: 'Filter operates with zero biological pathogen reduction (total biological kill-off)',
        rootCause: 'Chlorine bleaches and sterilizes the living Schmutzdecke predatory biofilm',
        fieldRemedy: 'Filter raw water first through the Bio-Sand filter; add chlorine drops only to the clean post-filtered water bucket.'
      },
      {
        pitfall: 'Standing Water Drains Below Sand Surface',
        symptom: 'Sand dries out, cracks form, and biological biofilm dies within 12 hours',
        rootCause: 'PVC outlet pipe is set too low or leaky siphon connection allows standing water to siphon out',
        fieldRemedy: 'Raise the external PVC discharge pipe elbow until resting water level stays exactly 5cm above sand.'
      }
    ],
    calculator: {
      tab: 'rainwater',
      title: 'Water Purification & Tank Sizer',
      hint: 'Calculate household daily drinking water and filter column capacity.'
    },
    almanac: {
      season: 'Rainy Planting',
      monthWindow: 'November – December',
      label: 'Turbid Water Filtration Window',
      targetAction: 'Commission bio-sand filters before high-turbidity rainy season river runoffs begin.'
    }
  },

  'solar-pv-lithium-bank': {
    blueprint: {
      dimensionsAndRatios: [
        'System Voltage Architecture: 48V DC nominal (Four 12.8V 100Ah LiFePO4 modules in series or 51.2V server rack)',
        'PV Array Tilt & Azimuth (Malawi -13°S): 15° to 20° North-Facing Fixed Tilt Angle (cleans with rain & captures year-round sun)',
        'Battery Sizing Formula: Total Daily Wh ÷ 0.80 (80% Depth of Discharge) × 2 Days Autonomy ÷ 48V = Battery Ah Capacity',
        'Solar PV Sizing Formula: Total Daily Wh ÷ (5.5 Peak Sun Hours × 0.80 System Efficiency Factor) = Array Wattage (Wp)'
      ],
      sizingFormulas: [
        'Example Homestead Daily Load = 3,500 Wh/day (Refrigeration + Solar Pump + LED Lights + Starlink + Tools)',
        'Solar Array Sizing = 3,500 Wh ÷ (5.5 PSH × 0.80) = 795W -> Install 3× 400W Tier-1 Monocrystalline Panels (1,200Wp)',
        'LiFePO4 Battery Bank = (3,500 Wh × 1.5 Days) ÷ (48V × 0.80 DoD) = 136 Ah -> Install 48V 150Ah (7.68 kWh Bank)'
      ],
      metrics: [
        { label: 'LiFePO4 Usable DoD', value: '80% – 90% DoD', detail: 'Delivers 4,000–6,000 cycles (15+ year operational lifespan)' },
        { label: 'Solar Panel Tilt (Malawi)', value: '15° True North', detail: 'Optimized for latitude 13°S with self-cleaning rain angle' },
        { label: 'MPPT Charge Controller Efficiency', value: '98.5% Peak Tracking', detail: 'Converts high string voltage (90V–150V) down to 48V with zero power loss' },
        { label: 'Grounding Earth Resistance', value: '< 5.0 Ohms', detail: '2.4m copper earth rod bonded to surge protection devices (SPDs)' }
      ]
    },
    materials: [
      { name: 'Tier-1 Mono PERC Solar Panels (400W–550W)', localAvailability: 'Solar equipment distributors in Lilongwe / Blantyre', purpose: 'High-efficiency photovoltaic solar generation in tropical temperatures' },
      { name: 'Lithium Iron Phosphate (LiFePO4) 48V Battery', localAvailability: 'Specialty renewable energy suppliers', purpose: 'Thermal-runaway-safe, deep-cycle long-life energy storage' },
      { name: 'MPPT Solar Inverter/Charger (48V 3kVA–5kVA)', localAvailability: 'Certified solar energy outlets', purpose: 'Integrated solar charging, 230V pure sine wave inversion & grid/gen transfer' },
      { name: '6mm² Double-Insulated UV Solar Cable & MC4s', localAvailability: 'Electrical trade wholesalers', purpose: 'Low-loss DC power transmission from roof array to inverter' },
      { name: '2.4m Copper Earth Rod & DC Surge Arrestor (SPD)', localAvailability: 'Electrical hardware depot', purpose: 'Lightning protection and dissipation of high-voltage atmospheric surges' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Load Audit & System Architecture Sizing',
        title: 'Calculate Exact Daily Watt-Hours & Voltage',
        timing: 'Day 1',
        seasonalWindow: 'Planning & Engineering Phase',
        instructions: 'Itemize all homestead AC loads: Refrigerator (800Wh), Submersible Pump (1,200Wh), Lighting (200Wh), Starlink/Laptops (600Wh). Total = 2,800Wh/day. Select 48V DC bus architecture to keep current below 60A and minimize cable resistance.',
        criticalCheck: 'Never use 12V architecture for loads over 1,000W (causes overheating and high voltage drop).'
      },
      {
        stepNumber: 2,
        phase: 'Roof Mounting & 15° North Azimuth Alignment',
        title: 'Mount Anodized Racks Facing True North',
        timing: 'Day 2 (Morning)',
        seasonalWindow: 'Dry Season Installation',
        instructions: 'Secure aluminum mounting rails to roof rafters. Align panels facing True North (magnetic compass corrected for local declination). Set tilt angle to 15°. Fasten panels using stainless mid and end-clamps.',
        criticalCheck: 'Verify that zero trees or chimneys cast shadows on panels between 08:30 and 16:30.'
      },
      {
        stepNumber: 3,
        phase: 'DC String Wiring & Lightning Earth Bond',
        title: 'Wire Panels in Series Strings & Ground Rails',
        timing: 'Day 2 (Afternoon)',
        seasonalWindow: 'Dry Season Installation',
        instructions: 'Wire 2-3 panels in series to create a 90V–150V DC string well within the MPPT voltage window. Connect 6mm² copper earth wire from panel frames to a 2.4m copper ground rod driven deep into moist soil.',
        criticalCheck: 'Check string open-circuit voltage (Voc) with a multimeter before connecting to inverter.'
      },
      {
        stepNumber: 4,
        phase: '48V LiFePO4 Battery Bank & Inverter Hookup',
        title: 'Install 48V Battery, Class-T Fuse & Inverter',
        timing: 'Day 3 (Morning)',
        seasonalWindow: 'Dry Season Installation',
        instructions: 'Mount the hybrid inverter on a fireproof cement-board wall. Connect the 48V LiFePO4 battery bank using 35mm² flexible copper cables through a 125A Class-T DC fuse and battery isolator switch.',
        criticalCheck: 'Verify polarity (Red = Positive, Black = Negative) before closing the DC circuit breaker.'
      },
      {
        stepNumber: 5,
        phase: 'Inverter Parameter Configuration & Testing',
        title: 'Configure LiFePO4 Charge Voltages & Commission',
        timing: 'Day 3 (Afternoon)',
        seasonalWindow: 'Commissioning Phase',
        instructions: 'Turn on battery power first, then PV isolator. Program inverter charge settings: Bulk/Absorb = 56.8V, Float = 54.0V, Low DC Cutoff = 48.0V (20% SoC). Power on AC sub-panel and verify 230V 50Hz pure sine wave output.',
        criticalCheck: 'Confirm MPPT display shows active solar wattage flowing into the battery.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Connecting Solar Panels to Inverter with Battery Disconnected',
        symptom: 'Inverter throws fatal Error 04 / high voltage arc destroys internal MPPT circuitry',
        rootCause: 'MPPT controllers require active battery reference voltage to regulate incoming PV voltage',
        fieldRemedy: 'ALWAYS turn ON the battery DC breaker first before closing the PV solar panel isolator switch.'
      },
      {
        pitfall: 'Mixing Old Lead-Acid Batteries with New LiFePO4 Modules',
        symptom: 'Massive internal circulating currents, boiling electrolyte, and rapid battery failure',
        rootCause: 'Fundamental mismatch in internal resistance and chemical voltage curves',
        fieldRemedy: 'Never mix battery chemistries or different age banks; deploy 100% unified LiFePO4 cells.'
      }
    ],
    calculator: {
      tab: 'solar',
      title: 'Solar PV & LiFePO4 Battery Sizer',
      hint: 'Size solar panels, battery capacity, and inverter wattage for your electrical loads.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Solar Array Optimization Window',
      targetAction: 'Wash dust from solar panels and check battery terminal torque before peak summer insolation.'
    }
  },

  'outpost-technology-machinery': {
    blueprint: {
      dimensionsAndRatios: [
        'Helical Screw DC Solar Pump Sizing: 24V–48V DC Direct-Drive stainless steel pump with MPPT controller',
        'Total Dynamic Head (TDH) Equation: Static Vertical Lift (m) + Friction Losses in Pipe (m) + Header Tank Elevation (m)',
        'Tool Maintenance Honing Angles: Wood chisels & plane irons = 25° primary bevel + 30° micro-bevel; Axes = 35° convex bevel',
        'Fuel Storage Stabilization: 10ml Fuel Stabilizer per 5L Petrol/Diesel in airtight metal Jerry cans (max 12-month shelf life)'
      ],
      sizingFormulas: [
        'Total Dynamic Head (TDH) = Static Well Depth (35m) + Surface Elevation to Tank (10m) + Friction (5m) = 50m TDH',
        'Daily Water Yield = 500W Solar Array on 50m TDH delivers ~5,000 to 8,000 Liters per day in full sun'
      ],
      metrics: [
        { label: 'Helical Rotor Speed', value: '1,500 – 3,000 RPM', detail: 'Variable speed tracking direct solar irradiance without batteries' },
        { label: 'Pipe Sizing Minimum', value: '32mm (1-Inch) HDPE', detail: 'Keeps friction head loss below 2 meters per 100m pipe run' },
        { label: 'Chisel Honing Grit Progression', value: '400 -> 1000 -> 6000 Grit', detail: 'Waterstone sharpening achieving razor-sharp slicing edge' },
        { label: 'Dry-Run Sensor Response', value: '< 2 Seconds Shutoff', detail: 'Prevents stator rubber burnout when well water level drops' }
      ]
    },
    materials: [
      { name: '24V/48V DC Submersible Helical Solar Pump', localAvailability: 'Specialty pump distributors in Lilongwe', purpose: 'High-lift borehole water delivery powered directly by solar panels' },
      { name: '32mm Class 10 PN12.5 HDPE Poly Pipe', localAvailability: 'Hardware plumbing suppliers', purpose: 'Flexible, UV-resistant high-pressure delivery line' },
      { name: 'Water-Level Probe Sensor Cables', localAvailability: 'Supplied with solar pump kit', purpose: 'Borehole low-water and tank-full automatic shutoff automation' },
      { name: 'Japanese Waterstones / Arkansas Oil Stones', localAvailability: 'Specialty carpentry imports / fine sandstone', purpose: 'Precision honing and flattening of carbon steel homestead hand tools' },
      { name: 'Boiled Linseed Oil & Beeswax Paste', localAvailability: 'Homestead apiary + paint suppliers', purpose: 'Rust-inhibiting protective coating for steel tools and wooden handles' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Total Dynamic Head (TDH) & Pump Selection',
        title: 'Measure Well Depth & Calculate Friction Head',
        timing: 'Day 1',
        seasonalWindow: 'Pre-Installation Engineering',
        instructions: 'Measure static water level in borehole (e.g. 25m). Add vertical height to top of elevated tank (15m). Calculate 10% pipe friction (4m). Total TDH = 44m. Select a DC pump rated for 50m TDH and 1,000 L/hr.',
        criticalCheck: 'Verify borehole recharge rate exceeds pump extraction capacity.'
      },
      {
        stepNumber: 2,
        phase: 'Pump Suspension & Submersible Cabling',
        title: 'Lower Pump on Poly Rope with Dry-Run Sensor',
        timing: 'Day 2 (Morning)',
        seasonalWindow: 'Dry Season Installation',
        instructions: 'Attach pump to 32mm HDPE pipe using a brass compression fitting. Tape waterproof power cable and low-water sensor wire every 2 meters along pipe. Suspend pump with 8mm stainless or nylon rope 3m above well bottom.',
        criticalCheck: 'Never suspend the pump by its electrical power cable.'
      },
      {
        stepNumber: 3,
        phase: 'Direct-Drive Solar MPPT Controller Hookup',
        title: 'Wire Dedicated Solar Array to Pump Controller',
        timing: 'Day 2 (Afternoon)',
        seasonalWindow: 'Dry Season Installation',
        instructions: 'Mount two 350W solar panels facing True North near the wellhead. Wire panels in series to the Solar Pump Controller input. Connect pump motor leads (U, V, W) and tank float switch wires.',
        criticalCheck: 'Ensure the pump controller is housed in a weatherproof, ventilated steel enclosure.'
      },
      {
        stepNumber: 4,
        phase: 'Homestead Tool Restoration & Bevel Grinding',
        title: 'Flatten Tool Backs & Hone 30° Micro-Bevels',
        timing: 'Weekly Maintenance',
        seasonalWindow: 'Year-Round Workshop Routine',
        instructions: 'Flatten chisel and plane blade backs on a 400-grit diamond stone until mirror flat. Grind a 25° primary bevel. Hone the cutting edge on a 1000/6000 waterstone at 30° until it shaves arm hair cleanly.',
        criticalCheck: 'Do not overheat carbon steel on dry grinding wheels (blue discoloration destroys temper).'
      },
      {
        stepNumber: 5,
        phase: 'Preventative Rust & Handle Protection',
        title: 'Oil Steel Blades & Condition Wood Handles',
        timing: 'Monthly',
        seasonalWindow: 'Year-Round Workshop Routine',
        instructions: 'Wipe all metal tool heads with a 50:50 blend of boiled linseed oil and beeswax. Rub warm linseed oil into ash and hickory wooden handles to prevent splintering and drying in arid winter heat.',
        criticalCheck: 'Store oiled rags in an airtight metal container to prevent spontaneous combustion.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Running Submersible Pump Dry Without Sensor',
        symptom: 'Pump motor hums loudly, water stops flowing, and rubber helical stator melts within 60 seconds',
        rootCause: 'Water table dropped below pump intake during October dry season with disabled sensor',
        fieldRemedy: 'Always wire low-water well probes 1m above pump intake; replace damaged EPDM stator cartridge.'
      },
      {
        pitfall: 'Using Undersized 16mm Hose on 50m Borehole',
        symptom: 'Pump motor overheats and flow drops by 75% despite full bright sunshine',
        rootCause: 'Extreme fluid friction resistance in narrow pipe creates massive artificial head pressure',
        fieldRemedy: 'Upgrade delivery line to minimum 32mm (1-Inch) or 40mm Class 10 HDPE pipe.'
      }
    ],
    calculator: {
      tab: 'solar',
      title: 'Solar Water Pumping Sizer',
      hint: 'Calculate borehole dynamic lift, pipe friction, and solar panel array requirements.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Pump Testing & Wellhead Servicing',
      targetAction: 'Service solar pump controllers and inspect borehole water levels at the lowest annual water table.'
    }
  },

  'rainwater-swale-dambo-capture': {
    blueprint: {
      dimensionsAndRatios: [
        'Smile Bund (Semicircular Earth Bund) Geometry: 3.0m radius downhill arc, 40cm height, 60cm wide base',
        'Infiltration Basin Dimensions: 2.0m (length) x 1.0m (width) x 50cm (depth) dug at lowest swale terminus',
        'Rooftop Rain Catchment Yield Equation: Roof Area (m²) × Annual Rainfall (mm) × 0.85 (Runoff Coefficient) = Harvestable Liters',
        'First-Flush Diverter Sizing: 1 to 2 Liters per m² of roof area diverted before entering clean storage tank'
      ],
      sizingFormulas: [
        '100 m² Corrugated Iron Roof in Dedza (1,000mm rain) = 100 × 1,000 × 0.85 = 85,000 Liters harvested annually',
        'Smile Bund Water Capacity = 3m radius semicircular basin holds ~1,200 Liters of stormwater runoff per rain event'
      ],
      metrics: [
        { label: 'Runoff Harvesting Efficiency', value: '85% Collection Efficiency', detail: 'Corrugated iron roof with seamless gutters and leaf screen' },
        { label: 'First Flush Volume per 100m²', value: '100 – 150 Liters', detail: 'Flushes atmospheric dust, bird droppings, and leaves out of system' },
        { label: 'Smile Bund Slope Placement', value: '2% – 8% Land Gradient', detail: 'Captures sheet runoff on gentle slopes without overflowing' },
        { label: 'Infiltration Velocity', value: '100% Infiltrated in < 24h', detail: 'Prevents mosquito larvae breeding in earth basins' }
      ]
    },
    materials: [
      { name: 'Seamless PVC / Galvanized Roof Gutters', localAvailability: 'Hardware building suppliers', purpose: 'Collecting high-volume rainwater runoff from roof eaves' },
      { name: 'First-Flush Diverter Pipe (110mm PVC + Floating Ball)', localAvailability: 'Plumbing stores / fabricated with PVC fittings', purpose: 'Automatically sealing off initial dirty wash water before tank' },
      { name: '5,000L / 10,000L Corrugated Poly Storage Tank', localAvailability: 'National tank distributors (Roto / Poly-Tanks)', purpose: 'Long-term clean domestic and garden water storage' },
      { name: 'Vetiver Grass (Chrysopogon zizanioides)', localAvailability: 'Agroforestry nurseries', purpose: 'Living root reinforcement stabilizing smile bund berm tips' },
      { name: 'Khasu (Heavy Hoe) & Pickaxe', localAvailability: 'Local blacksmiths (Wosula zitsulo)', purpose: 'Shaping semicircular smile bunds and subterranean infiltration pits' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Catchment Yield & Storage Tank Sizing',
        title: 'Calculate Annual Roof Runoff Volume',
        timing: 'Day 1',
        seasonalWindow: 'Pre-Rains Engineering',
        instructions: 'Measure roof dimensions (e.g. 10m x 12m = 120 m²). Multiply by local annual rainfall (e.g. 1,000mm) and 0.85 coefficient = 102,000 Liters. Plan tank storage and overflow diversion swales.',
        criticalCheck: 'Ensure tank foundation is a level, reinforced 15cm concrete slab on solid ground.'
      },
      {
        stepNumber: 2,
        phase: 'Gutter Slope & First-Flush Diverter Installation',
        title: 'Install 1:100 Sloped Gutters & First-Flush Pipe',
        timing: 'Day 2–3',
        seasonalWindow: 'Hot Dry Preparation (October)',
        instructions: 'Mount gutters with a 1cm drop per 1 meter of run toward the downspout. Install a vertical 110mm PVC first-flush pipe (holds 100L) with a floating rubber ball. Clean water flows to tank once the ball seals.',
        criticalCheck: 'Drill a tiny 1mm drain weep-hole at base of first-flush pipe so it self-empties slowly over 24h.'
      },
      {
        stepNumber: 3,
        phase: 'Semicircular Smile Bund Layout on Field Slope',
        title: 'Survey 3m Radius Arcs with Center Peg & String',
        timing: 'Day 4',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Drive a center peg on a 3-5% field slope. Attach a 3m rope and scribe a semicircular arc with the open ends pointing directly uphill. Dig soil from the inside basin and pile it into a 40cm high downhill bund.',
        criticalCheck: 'Ensure the two tips of the smile bund are at the exact same elevation (dead level).'
      },
      {
        stepNumber: 4,
        phase: 'Infiltration Pit Sinking & Organic Packing',
        title: 'Dig 50cm Basin & Pack with Coarse Biomass',
        timing: 'Day 5',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Deepen the inner basin to 50cm. Fill with coarse maize cobs, dry tree limbs, and woodchips. This organic sponge holds thousands of liters of runoff and prevents standing water from breeding mosquitoes.',
        criticalCheck: 'Water should soak into the subterranean sponge within 12 hours.'
      },
      {
        stepNumber: 5,
        phase: 'Planting Fruit Trees in Moisture Zone',
        title: 'Plant Banana / Papaya / Citrus at Basin Edge',
        timing: 'First Soaking Rain (November)',
        seasonalWindow: 'Rainy Planting Window',
        instructions: 'Plant moisture-loving fruit trees (Bananas, Papayas, Mangoes) on the upper inner shoulder of the smile bund where they access subsoil moisture reserves all through the 6-month dry season.',
        criticalCheck: 'Never plant the tree at the bottom of the pit where waterlogging could rot roots.'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Omitting the First-Flush Rooftop Diverter',
        symptom: 'Storage tank collects a thick layer of black sludge, bird feces, and water turns foul and cloudy',
        rootCause: 'Dry-season roof dust and animal droppings wash straight into the clean storage tank',
        fieldRemedy: 'Retrofit a 110mm vertical PVC first-flush pipe with a floating ball seal and clean-out screw cap.'
      },
      {
        pitfall: 'Uneven Smile Bund Berm Tips',
        symptom: 'Runoff over-tops one low tip of the smile bund, eroding the berm and cutting a new gully',
        rootCause: 'Failing to check that both tips of the semicircular bund are on the exact same elevation contour',
        fieldRemedy: 'Use an A-frame level to verify both tips are level; raise the low tip with packed soil and stone rip-rap.'
      }
    ],
    calculator: {
      tab: 'rainwater',
      title: 'Rainwater Roof Catchment & Smile Bund Sizer',
      hint: 'Calculate harvestable rainfall from your roof and required storage tank capacity.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Gutter Cleaning & Smile Bund Digging',
      targetAction: 'Clear roof gutters, clean first-flush pipes, and dig smile bunds before torrential rains arrive.'
    }
  },

  'solar-dambo-irrigation': {
    blueprint: {
      dimensionsAndRatios: [
        'Dambo Shallow Well Dimensions: 1.2m (internal diameter) x 4.0m–6.0m (depth) cased with perforated concrete rings',
        'Header Storage Tank Elevation: 3.0m–4.0m steel/timber platform (delivers 0.3–0.4 bar gravity head for drip lines)',
        'Drip Line Operating Pressure: 0.5 bar to 1.0 bar pressure-compensating drip tape with 20cm–30cm emitter spacing',
        'Direct Solar Pumping Hours: 6 to 8 hours daily direct solar pumping (no batteries required)'
      ],
      sizingFormulas: [
        'Drip Irrigation Water Demand = 1 acre high-density vegetables requires ~20,000 Liters per day in October dry heat',
        'Direct PV Array Sizing = 2× 350W Panels in series (700W) powers a 48V DC pump delivering ~2,500 L/hr at 15m Head'
      ],
      metrics: [
        { label: 'Operating Voltage Range', value: '30V – 90V DC Direct', detail: 'Direct-drive MPPT variable frequency motor tracking sunshine' },
        { label: 'Shallow Dambo Well Depth', value: '4m – 8m Typical', detail: 'Taps high alluvial water table in valley floor wetlands' },
        { label: 'Drip Emitter Flow Rate', value: '1.0 – 1.5 L / hour', detail: 'Delivers water directly to plant root zone with 95% efficiency' },
        { label: 'Tank Elevation Gravity Head', value: '3.0m (0.3 Bar Head)', detail: 'Provides adequate head pressure for low-pressure gravity drip networks' }
      ]
    },
    materials: [
      { name: 'Direct-Drive DC Solar Submersible Pump', localAvailability: 'Solar irrigation suppliers in Lilongwe', purpose: 'Pumping water continuously during daylight without expensive batteries' },
      { name: 'Two 350W Monocrystalline Solar Panels', localAvailability: 'Renewable energy distributors', purpose: 'Supplying 700W DC power directly to pump motor controller' },
      { name: 'Reinforced Perforated Concrete Well Rings', localAvailability: 'Local village masons casting well rings', purpose: 'Lining shallow dambo well to prevent sidewall mud collapse' },
      { name: '2,000L / 5,000L Elevated Header Tank', localAvailability: 'Plastic tank depots', purpose: 'Storing pumped water for regulated morning and evening gravity drip feeding' },
      { name: '16mm Pressure-Compensating Drip Tape & Screen Filter', localAvailability: 'Agro-dealers & irrigation suppliers', purpose: 'High-efficiency, zero-waste root zone irrigation with 120-mesh disc filter' }
    ],
    protocol: [
      {
        stepNumber: 1,
        phase: 'Dambo Well Excavation & Ring Sinking',
        title: 'Sink Perforated Concrete Rings into Dambo',
        timing: 'September (Lowest Water Table)',
        seasonalWindow: 'Hot Dry Preparation',
        instructions: 'Excavate 1.2m diameter hole in the dambo wetland during the driest month (September). Lower perforated concrete rings into the hole. Dig inside the rings as they sink until you reach 5m depth with strong recharge.',
        criticalCheck: 'Pack bottom 30cm of well with clean washed gravel to prevent sand suction.'
      },
      {
        stepNumber: 2,
        phase: 'Solar Pump Suspension & Sensor Rigging',
        title: 'Suspend 48V DC Pump 50cm Above Gravel Floor',
        timing: 'Day 2',
        seasonalWindow: 'Dry Season Setup',
        instructions: 'Attach the DC solar pump to 32mm HDPE pipe. Rig dry-run sensor probes 50cm above pump intake. Lower pump to 1m above the well gravel floor using safety rope. Connect 32mm pipeline to elevated header tank.',
        criticalCheck: 'Never rest pump on the muddy bottom (sucks silt and destroys screw rotor).'
      },
      {
        stepNumber: 3,
        phase: 'Dedicated Solar Array Direct Wiring',
        title: 'Wire 2x 350W Panels to MPPT Controller',
        timing: 'Day 3',
        seasonalWindow: 'Dry Season Setup',
        instructions: 'Mount two 350W panels on a 3m pole near the wellhead facing True North (15° tilt). Wire panels in series directly to the MPPT pump controller. Connect float switch in elevated tank to controller.',
        criticalCheck: 'Ensure the float switch automatically cuts pump power when header tank is 100% full.'
      },
      {
        stepNumber: 4,
        phase: '120-Mesh Disc Filter & Mainline Laying',
        title: 'Install Disc Filter on Header Tank Outlet',
        timing: 'Day 4',
        seasonalWindow: 'Dry Season Setup',
        instructions: 'Install a 1-inch 120-mesh disc filter at the discharge valve of the 3m elevated tank. Lay a 32mm HDPE mainline down the center of the garden plot. Install ball-valve shutoffs for each drip lateral line.',
        criticalCheck: 'Disc filter is mandatory; without it, algae and silt will clog drip emitters in 48 hours.'
      },
      {
        stepNumber: 5,
        phase: 'Gravity Drip Lateral Line Balancing',
        title: 'Roll Out Drip Tape & Flush Lateral Lines',
        timing: 'Day 5',
        seasonalWindow: 'Active Dry-Season Irrigation',
        instructions: 'Lay 16mm drip tape along vegetable rows with emitter holes facing UP. Open end caps and flush clean water through lines for 2 minutes to remove debris. Fold and clamp line ends with figure-8 clips.',
        criticalCheck: 'Verify even drip rates across all rows (approx. 1 drop per second per emitter).'
      }
    ],
    troubleshooting: [
      {
        pitfall: 'Clogging Drip Emitters with Unfiltered Silt',
        symptom: 'Half the drip emitters stop dripping water, causing dry dead patches in vegetable beds',
        rootCause: 'Omitting the 120-mesh disc filter or failing to clean the filter element weekly',
        fieldRemedy: 'Unscrew disc filter weekly, wash discs in clean water, and flush all lateral line end caps for 60 seconds.'
      },
      {
        pitfall: 'Mounting Solar Panels in Shaded Valley Corridors',
        symptom: 'Pump shuts down between 10:00 AM and 14:00 PM when nearby tall eucalyptus trees cast shadows',
        rootCause: 'Placing solar array too low in a tree-lined dambo pocket',
        fieldRemedy: 'Mount panels on an elevated 4m steel pole in the clear center of the open wetland acreage.'
      }
    ],
    calculator: {
      tab: 'solar',
      title: 'Solar Irrigation & Drip System Sizer',
      hint: 'Calculate daily pumping volume, dynamic head, and drip irrigation runtime.'
    },
    almanac: {
      season: 'Hot Dry Preparation',
      monthWindow: 'September – October',
      label: 'Dambo Well Sinking & Solar Setup',
      targetAction: 'Dig shallow dambo wells at lowest annual water table and commission solar drip systems.'
    }
  }
};
