export interface MonthlyTaskItem {
  id: string;
  title: string;
  description: string;
  chichewaTerm?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface MonthlyCalendarSpec {
  monthIndex: number; // 0 = Jan, 11 = Dec
  monthName: string;
  shortName: string;
  seasonType: 'rainy' | 'dry';
  seasonName: string;
  chichewaSeason: string;
  rainfallAvgMm: number;
  tempAvgC: { min: number; max: number };
  summary: string;
  groups: {
    plant: MonthlyTaskItem[];
    prepare: MonthlyTaskItem[];
    harvest: MonthlyTaskItem[];
    careForAnimals: MonthlyTaskItem[];
    household: MonthlyTaskItem[];
  };
}

export const MONTHLY_CALENDAR: MonthlyCalendarSpec[] = [
  {
    monthIndex: 0,
    monthName: 'January',
    shortName: 'Jan',
    seasonType: 'rainy',
    seasonName: 'Main Rainy Season',
    chichewaSeason: 'Dzinja',
    rainfallAvgMm: 280,
    tempAvgC: { min: 18, max: 27 },
    summary: 'Peak rains and rapid vegetative growth across maize and companion legumes.',
    groups: {
      plant: [
        { id: 'jan-p1', title: 'Late sweet potato vines', description: 'Transplant orange-fleshed sweet potato mounds for late-season tuber reserves.', chichewaTerm: 'Mbatata' },
        { id: 'jan-p2', title: 'Cassava stem cuttings', description: 'Plant disease-free cassava cuttings at 45-degree angle in well-drained slopes.' }
      ],
      prepare: [
        { id: 'jan-pr1', title: 'Weed suppression with organic mulch', description: 'Hand-hoe annual grasses before they set seed; deposit as surface mulch.' },
        { id: 'jan-pr2', title: 'Contour swale spillway inspection', description: 'Check that swale level-sills gently disperse excess rainfall into dambo infiltration zones.' }
      ],
      harvest: [
        { id: 'jan-h1', title: 'Early indigenous greens', description: 'Harvest pumpkin leaves (mpiru, mtedza), amaranth (bonongwe), and sweet potato leaves.' }
      ],
      careForAnimals: [
        { id: 'jan-a1', title: 'Foot rot prevention for goats', description: 'Keep slatted khola floor dry and apply wood ash around shelter entrances.' },
        { id: 'jan-a2', title: 'Poultry Newcastle vaccination check', description: 'Administer I-2 thermotolerant eye-drop Newcastle vaccine to free-range village chickens.' }
      ],
      household: [
        { id: 'jan-hh1', title: 'Mosquito screening check', description: 'Inspect rainwater tank fine mesh and bedroom window netting during peak humidity.' }
      ]
    }
  },
  {
    monthIndex: 1,
    monthName: 'February',
    shortName: 'Feb',
    seasonType: 'rainy',
    seasonName: 'Late Rainy Season (Hunger Gap)',
    chichewaSeason: 'Dzinja',
    rainfallAvgMm: 240,
    tempAvgC: { min: 18, max: 26 },
    summary: 'Bridging the lean hunger gap before the main grain dry-down with green mealies and pumpkins.',
    groups: {
      plant: [
        { id: 'feb-p1', title: 'Fast-growing cowpeas', description: 'Sow quick 60-day cowpeas in garden borders for nitrogen fixation.' }
      ],
      prepare: [
        { id: 'feb-pr1', title: 'Prepare grain drying racks', description: 'Construct elevated bamboo/pole drying cribs with rodent guards.' },
        { id: 'feb-pr2', title: 'Inspect PICS hermetic bags', description: 'Inspect triple-layer hermetic bags and repair any punctures with sealing tape.' }
      ],
      harvest: [
        { id: 'feb-h1', title: 'Green mealies & fresh pumpkins', description: 'Harvest sweet corn for steaming and harvest early squash to relieve pantry pressures.' }
      ],
      careForAnimals: [
        { id: 'feb-a1', title: 'Forage gathering for drying', description: 'Harvest lush roadside Guinea grass and dry on racks for dry-season ruminant hay.' }
      ],
      household: [
        { id: 'feb-hh1', title: 'Herbal immune tea preparation', description: 'Dry and jar Artemisia annua leaves and ginger roots for autumn fever teas.' }
      ]
    }
  },
  {
    monthIndex: 2,
    monthName: 'March',
    shortName: 'Mar',
    seasonType: 'rainy',
    seasonName: 'Harvest Transition',
    chichewaSeason: 'Masika',
    rainfallAvgMm: 160,
    tempAvgC: { min: 17, max: 26 },
    summary: 'Rains taper off; maize stalks begin physiological drying in the fields.',
    groups: {
      plant: [
        { id: 'mar-p1', title: 'Winter dimba seedbed nursery', description: 'Sow brassicas, tomatoes, and onions in raised nursery beds under shade cloth.' }
      ],
      prepare: [
        { id: 'mar-pr1', title: 'Bend maize stalks', description: 'Bend drying maize cobs downward to shed late rains and protect against cob rot.' },
        { id: 'mar-pr2', title: 'Clean granary cribs', description: 'Sweep nkhokwe granaries and paint interior walls with fresh lime/wood-ash wash.' }
      ],
      harvest: [
        { id: 'mar-h1', title: 'Groundnuts and early bush beans', description: 'Lift groundnut plants by the roots when inner pod shells develop dark veins.' }
      ],
      careForAnimals: [
        { id: 'mar-a1', title: 'Goat worming & herbal browse', description: 'Feed freshly cut bitter Moringa and neem foliage as natural parasitic deterrents.' }
      ],
      household: [
        { id: 'mar-hh1', title: 'Solar food dehydrator tuning', description: 'Clean glass covers on solar dryers for upcoming banana and mango preservation.' }
      ]
    }
  },
  {
    monthIndex: 3,
    monthName: 'April',
    shortName: 'Apr',
    seasonType: 'rainy',
    seasonName: 'Harvest & Granary Filling',
    chichewaSeason: 'Masika',
    rainfallAvgMm: 60,
    tempAvgC: { min: 15, max: 25 },
    summary: 'Main staple grain harvest; grain drying down to <13% safe moisture.',
    groups: {
      plant: [
        { id: 'apr-p1', title: 'Transplant winter vegetables into dimba', description: 'Transfer hearty seedlings into moist valley bottom plots.' }
      ],
      prepare: [
        { id: 'apr-pr1', title: 'Salt and smoke curing prep', description: 'Prepare clean rock salt and cold smoker wood for vegetable preservation.' }
      ],
      harvest: [
        { id: 'apr-h1', title: 'Primary field maize harvest', description: 'Harvest dry ears and shell grain for sun-drying on tarpaulins.' },
        { id: 'apr-h2', title: 'Pigeon peas & soy harvest', description: 'Harvest mature legume pods; thresh on clean canvas.' }
      ],
      careForAnimals: [
        { id: 'apr-a1', title: 'Stover collection', description: 'Gather dry maize stalks from fields and stack under shelter for cattle and goat bedding.' }
      ],
      household: [
        { id: 'apr-hh1', title: 'Hermetic bag sealing', description: 'Seal dry maize and beans in triple-layer PICS bags with dried neem leaves.' }
      ]
    }
  },
  {
    monthIndex: 4,
    monthName: 'May',
    shortName: 'May',
    seasonType: 'dry',
    seasonName: 'Cold Dry Season',
    chichewaSeason: 'Chisanu',
    rainfallAvgMm: 15,
    tempAvgC: { min: 12, max: 23 },
    summary: 'Cool mountain winds begin; intensive valley dimba cultivation takes center stage.',
    groups: {
      plant: [
        { id: 'may-p1', title: 'Irish potatoes & carrots in dimba', description: 'Plant seed potatoes in deeply aerated compost beds along moist streams.' }
      ],
      prepare: [
        { id: 'may-pr1', title: 'Cut perimeter firebreaks', description: 'Hoe a 3-meter clean earth perimeter barrier around homestead boundary to repel bush fires.' }
      ],
      harvest: [
        { id: 'may-h1', title: 'Citrus & avocado early crop', description: 'Pick oranges, lemons, and early Hass avocados for fresh consumption and drying.' }
      ],
      careForAnimals: [
        { id: 'may-a1', title: 'Night animal shelter draft protection', description: 'Install windbreaks around chicken and goat coops to protect young stock against night chill.' }
      ],
      household: [
        { id: 'may-hh1', title: 'Thermal cooker sewing', description: 'Sew insulated cotton Wonderbags filled with dry rice hulls for Sabbath hot meals.' }
      ]
    }
  },
  {
    monthIndex: 5,
    monthName: 'June',
    shortName: 'Jun',
    seasonType: 'dry',
    seasonName: 'Peak Cold Season (Chisanu)',
    chichewaSeason: 'Chisanu',
    rainfallAvgMm: 5,
    tempAvgC: { min: 9, max: 21 },
    summary: 'Coolest nights of the year; valley gardens irrigated by gravity drip or watering cans.',
    groups: {
      plant: [
        { id: 'jun-p1', title: 'Garlic and shallot cloves', description: 'Plant garlic cloves in rich volcanic loam for spring medicinal harvest.' }
      ],
      prepare: [
        { id: 'jun-pr1', title: 'Mulch dimba beds heavily', description: 'Apply 10cm dry grass mulch over all vegetable beds to reduce watering needs 60%.' }
      ],
      harvest: [
        { id: 'jun-h1', title: 'Winter cabbages, spinach & kale', description: 'Continuous weekly harvest of fresh greens from dimba beds.' }
      ],
      careForAnimals: [
        { id: 'jun-a1', title: 'Warm morning drinking water', description: 'Provide warmed clean water for livestock to conserve body heat.' }
      ],
      household: [
        { id: 'jun-hh1', title: 'Wood-ash soap making', description: 'Leach potassium hydroxide lye from hardwood stove ashes and blend with coconut or palm oil.' }
      ]
    }
  },
  {
    monthIndex: 6,
    monthName: 'July',
    shortName: 'Jul',
    seasonType: 'dry',
    seasonName: 'Cold Dry Season',
    chichewaSeason: 'Chisanu',
    rainfallAvgMm: 3,
    tempAvgC: { min: 8, max: 22 },
    summary: 'Coldest month in highland areas like Dedza and Viphya; orchard pruning window.',
    groups: {
      plant: [
        { id: 'jul-p1', title: 'Fruit tree rootstocks', description: 'Propagate rough lemon and wild peach rootstocks in nursery tubes.' }
      ],
      prepare: [
        { id: 'jul-pr1', title: 'Prune deciduous fruit trees', description: 'Prune peaches, plums, and figs while dormant; seal cuts with beeswax/clay paste.' },
        { id: 'jul-pr2', title: 'Clean borehole solar panels', description: 'Wipe dust from solar PV modules weekly to maintain peak hydraulic pumping yield.' }
      ],
      harvest: [
        { id: 'jul-h1', title: 'Winter onions & garlic tops', description: 'Harvest green garlic tops and early scallions for culinary flavoring.' }
      ],
      careForAnimals: [
        { id: 'jul-a1', title: 'Compost manure turning', description: 'Turn livestock bedding manure piles with dry leaves for spring compost.' }
      ],
      household: [
        { id: 'jul-hh1', title: 'Zwieback twice-baked bread', description: 'Bake whole-grain sourdough loaves, slice thin, and dry slowly into long-keeping Zwieback.' }
      ]
    }
  },
  {
    monthIndex: 7,
    monthName: 'August',
    shortName: 'Aug',
    seasonType: 'dry',
    seasonName: 'Warming Dry Season',
    chichewaSeason: 'Chilimwe',
    rainfallAvgMm: 2,
    tempAvgC: { min: 11, max: 25 },
    summary: 'Temperatures rise; water table drops; begin land clearing and pit planning.',
    groups: {
      plant: [
        { id: 'aug-p1', title: 'Fruit tree grafting', description: 'Graft improved scions (Hass avocado, Keitt mango) onto vigorous local rootstocks.' }
      ],
      prepare: [
        { id: 'aug-pr1', title: 'Stave water conservation', description: 'Monitor borehole static water level and repair any leaky faucet washers.' }
      ],
      harvest: [
        { id: 'aug-h1', title: 'Late dimba tomatoes & peppers', description: 'Harvest sweet bell peppers and tomatoes; slice for solar dehydrator drying.' }
      ],
      careForAnimals: [
        { id: 'aug-a1', title: 'Deep litter bedding replenishment', description: 'Add fresh dry straw or wood shavings to chicken coops.' }
      ],
      household: [
        { id: 'aug-hh1', title: 'Charcoal retort pyrolyzing', description: 'Burn peach wood and eucalyptus branches in sealed steel retorts for medicinal charcoal.' }
      ]
    }
  },
  {
    monthIndex: 8,
    monthName: 'September',
    shortName: 'Sep',
    seasonType: 'dry',
    seasonName: 'Hot Dry Preparation',
    chichewaSeason: 'Chizimalupsya',
    rainfallAvgMm: 6,
    tempAvgC: { min: 14, max: 28 },
    summary: 'Hot, windy season; prime window for digging deep planting pits before rains soften soils.',
    groups: {
      plant: [
        { id: 'sep-p1', title: 'Vetiver nursery multiplication', description: 'Split vetiver grass slips in nursery beds ready for early rainy season contour planting.' }
      ],
      prepare: [
        { id: 'sep-pr1', title: 'Excavate 90cm deep planting pits', description: 'Excavate 90×90×90 cm pits; separate topsoil and subsoil piles.' },
        { id: 'sep-pr2', title: 'Charge biochar with manure tea', description: 'Soak crushed hardwood biochar in animal manure and compost tea for 14 days.' }
      ],
      harvest: [
        { id: 'sep-h1', title: 'Final dimba root harvest', description: 'Dig remaining sweet potatoes and cassava before soils bake into hardpan.' }
      ],
      careForAnimals: [
        { id: 'sep-a1', title: 'Provide adequate shade & water', description: 'Ensure animals have shaded paddocks and double clean drinking water volume.' }
      ],
      household: [
        { id: 'sep-hh1', title: 'Roof gutter inspection', description: 'Clear leaves and wind-blown dust from corrugated roof gutters and downspout pipes.' }
      ]
    }
  },
  {
    monthIndex: 9,
    monthName: 'October',
    shortName: 'Oct',
    seasonType: 'dry',
    seasonName: 'Hot Dry Phase (Peak Heat)',
    chichewaSeason: 'Chizimalupsya',
    rainfallAvgMm: 25,
    tempAvgC: { min: 17, max: 31 },
    summary: 'Hottest month; first scattered rain showers (chizimalupsya) appear; finalize seed and pit readiness.',
    groups: {
      plant: [
        { id: 'oct-p1', title: 'Seed germination viability tests', description: 'Place 20 seeds of each heirloom grain variety on damp cloth; verify >85% germination rate.' }
      ],
      prepare: [
        { id: 'oct-pr1', title: 'Backfill deep pits with compost', description: 'Blend subsoil with 50% manure, biochar, and dry leaves; fill pits to 10cm above ground.' },
        { id: 'oct-pr2', title: 'Clean cistern first-flush pipes', description: 'Scrub rainwater storage tanks and clean 20L PVC first-flush diverter barrels.' }
      ],
      harvest: [
        { id: 'oct-h1', title: 'Early mango varieties', description: 'Harvest early green mangoes for chutney, drying, and fresh fruit.' }
      ],
      careForAnimals: [
        { id: 'oct-a1', title: 'Deworming before seasonal rains', description: 'Administer pre-rain prophylactic checks before humidity increases parasite loads.' }
      ],
      household: [
        { id: 'oct-hh1', title: 'Inspect cottage roof fasteners', description: 'Check roofing screws and rubber washers to ensure zero leaks in first November storms.' }
      ]
    }
  },
  {
    monthIndex: 10,
    monthName: 'November',
    shortName: 'Nov',
    seasonType: 'rainy',
    seasonName: 'Early Rainy Planting',
    chichewaSeason: 'Dzinja',
    rainfallAvgMm: 110,
    tempAvgC: { min: 18, max: 29 },
    summary: 'Onset of primary rains; begin planting field crops once 25mm soaking rain penetrates.',
    groups: {
      plant: [
        { id: 'nov-p1', title: 'Primary field grain planting', description: 'Plant heirloom maize, pigeon peas, and groundnuts in prepared mulched pits following 25mm rain.' },
        { id: 'nov-p2', title: 'Plant vetiver contour hedgerows', description: 'Plant vetiver slips along surveyed contour lines at 10cm spacing.' }
      ],
      prepare: [
        { id: 'nov-pr1', title: 'Monitor first-flush diversion', description: 'Ensure the first 30 minutes of initial muddy roof runoff does not enter clean cisterns.' }
      ],
      harvest: [
        { id: 'nov-h1', title: 'Main mango harvest begins', description: 'Harvest abundance of mangoes; process in solar dehydrators to store for winter.' }
      ],
      careForAnimals: [
        { id: 'nov-a1', title: 'Transition livestock to green pasture', description: 'Introduce animals gradually to lush new grasses to prevent bloat.' }
      ],
      household: [
        { id: 'nov-hh1', title: 'Rainwater quality testing', description: 'Check initial cistern water clarity and test simple pH test strip.' }
      ]
    }
  },
  {
    monthIndex: 11,
    monthName: 'December',
    shortName: 'Dec',
    seasonType: 'rainy',
    seasonName: 'Main Rainy Season',
    chichewaSeason: 'Dzinja',
    rainfallAvgMm: 220,
    tempAvgC: { min: 18, max: 27 },
    summary: 'Consistent heavy precipitation; rapid seedling growth; critical first weeding phase.',
    groups: {
      plant: [
        { id: 'dec-p1', title: 'Intercrop companion beans', description: 'Sow climbing cowpeas and velvet beans adjacent to knee-high maize stalks.' }
      ],
      prepare: [
        { id: 'dec-pr1', title: 'First weeding & mulch retention', description: 'Suppress weed competition when maize is 20cm high; keep all organic matter on beds.' }
      ],
      harvest: [
        { id: 'dec-h1', title: 'Wild mushrooms & indigenous herbs', description: 'Forage verified edible indigenous wild mushrooms (tente, utale) in organic groves.' }
      ],
      careForAnimals: [
        { id: 'dec-a1', title: 'Tick prevention', description: 'Inspect cattle and goats weekly for ticks as vegetation densifies.' }
      ],
      household: [
        { id: 'dec-hh1', title: 'Sabbath meal planning in wet weather', description: 'Utilize thermal cookers to prepare hot meals without kitchen humidity.' }
      ]
    }
  }
];
