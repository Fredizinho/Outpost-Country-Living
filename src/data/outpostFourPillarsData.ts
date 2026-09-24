// ============================================================================
// OUTPOST: FOUR PILLARS DATA REPOSITORY
// Grounded in Adventist Country Living Counsel (Spirit of Prophecy & Scripture)
// and Practical Self-Reliance for Malawi Homesteaders
// ============================================================================

export interface DailyDevotional {
  id: string;
  dayOfYear?: number;
  theme: 'Nature Study' | 'Agricultural Parables' | 'Health & Healing' | 'Family Education' | 'The Outpost Vision';
  title: string;
  scripture: {
    verse: string;
    reference: string;
  };
  egwQuote: {
    text: string;
    source: string;
    book: string;
  };
  practicalReflection: string;
  prayerPrompt: string;
}

export interface TransitionMilestone {
  id: string;
  stageNumber: 1 | 2 | 3 | 4 | 5;
  stageName: string;
  title: string;
  description: string;
  actionItems: string[];
  spiritualGuidance: {
    text: string;
    source: string;
  };
  category: 'Spiritual' | 'Financial' | 'Land' | 'Agriculture' | 'Shelter' | 'Ministry';
}

export interface DistrictReadinessCardData {
  id: string;
  name: string;
  region: 'Central' | 'Northern' | 'Southern';
  readinessRating: 'Prime Outpost' | 'Very Good' | 'Favorable' | 'Specialized';
  readinessScore: number; // 0-100
  summary: string;
  waterProfile: {
    sourceType: string;
    aquiferDepth: string;
    gravityPotential: string;
    qualityNotes: string;
  };
  soilProfile: {
    primaryType: string;
    phRange: string;
    fertility: string;
    organicMatterTip: string;
  };
  climateProfile: {
    annualRainfallMm: number;
    dzinjaMonths: string;
    chilimweNotes: string;
    solarPotential: string; // e.g., "6.4 kWh/m²/day"
  };
  outpostAdvantages: string[];
  edenicCrops: string[];
  distanceFromMajorCities: string;
}

export interface EdenicAgricultureGuide {
  id: string;
  title: string;
  subtitle: string;
  scripturalPrinciple: string;
  counselReference: string;
  steps: {
    stepNumber: number;
    heading: string;
    explanation: string;
    practicalTip: string;
  }[];
  commonMistakes: string[];
  objectLesson: string;
}

export interface OutpostBlueprint {
  id: string;
  type: 'Home School' | 'Small Sanitarium' | 'Treatment Rooms' | 'Agricultural Training';
  title: string;
  purpose: string;
  counselQuote: {
    text: string;
    source: string;
  };
  keyFeatures: string[];
  dailyRhythm: string[];
  recommendedAcreage: string;
  operationalSteps: string[];
}

export interface CommunityDirectoryEntry {
  id: string;
  title: string;
  contactPerson: string;
  district: string;
  region: 'Central' | 'Northern' | 'Southern';
  primaryRole: 'Seed Savers' | 'Organic Growers' | 'Natural Builders' | 'Water & Solar' | 'Health & Lifestyle' | 'Country Fellowship';
  description: string;
  offeringsOrNeeds: string[];
  locationHint: string;
  contactChannel: string;
}

// ----------------------------------------------------------------------------
// PILLAR 1: DAILY COUNTRY LIVING DEVOTIONALS
// ----------------------------------------------------------------------------
export const DAILY_DEVOTIONALS: DailyDevotional[] = [
  {
    id: 'dev-1',
    theme: 'Nature Study',
    title: "God's Second Great Book of Truth",
    scripture: {
      verse: "The heavens declare the glory of God; and the firmament sheweth his handywork. Day unto day uttereth speech, and night unto night sheweth knowledge.",
      reference: "Psalm 19:1, 2"
    },
    egwQuote: {
      text: "To the little child, not yet capable of learning from the printed page or of being introduced to the routine of the schoolroom, nature presents an unfailing source of instruction and delight.",
      source: "Education, p. 100",
      book: "Education"
    },
    practicalReflection: "In the country, every morning sunrise and growing seedling becomes an open lesson book. Today, take 10 minutes to walk silently with a family member or in quiet contemplation, observing how God provides for the wild birds and trees.",
    prayerPrompt: "Lord, open my spiritual eyes to read Your hand of love written in the soil, trees, and skies today."
  },
  {
    id: 'dev-2',
    theme: 'The Outpost Vision',
    title: "Out of the Cities: The Sacred Call",
    scripture: {
      verse: "My people shall dwell in a peaceable habitation, and in sure dwellings, and in quiet resting places.",
      reference: "Isaiah 32:18"
    },
    egwQuote: {
      text: "The time has come when, as God opens the way, families should move out of the cities. The children should be taken into the country. The parents should get as suitable a place as their means will allow. Though the dwelling may be small, yet there should be land in connection with it, that may be cultivated.",
      source: "Country Living, p. 24",
      book: "Country Living"
    },
    practicalReflection: "Country living is not meant to be selfish isolation, but a holy retreat from which to gather physical and moral stamina. If you are still in town, take one concrete step today toward debt reduction and simplification.",
    prayerPrompt: "Father in heaven, grant our family courage to surrender city attractions and guide our footsteps toward a peaceful country refuge."
  },
  {
    id: 'dev-3',
    theme: 'Agricultural Parables',
    title: "The Soil of the Heart and the Field",
    scripture: {
      verse: "Break up your fallow ground, and sow not among thorns. Sow to yourselves in righteousness, reap in mercy.",
      reference: "Jeremiah 4:3; Hosea 10:12"
    },
    egwQuote: {
      text: "The cultivation of the soil is good work for children and youth. It brings them into direct contact with nature and nature's God. In the tilling of the soil the earnest laborer will find lessons of humility, faith, and patience.",
      source: "Counsels to Parents, Teachers, and Students, p. 186",
      book: "Counsels on Education"
    },
    practicalReflection: "Just as hard red clay (Katondo) needs organic matter, aeration, and gentle rain to become fertile, a hardened spirit softens when bathed in God's word and honest outdoor labor. Physical digging relieves mental congestion.",
    prayerPrompt: "Master Gardener, plow through the stubborn corners of my heart and cultivate fruits of patience, temperance, and kindness."
  },
  {
    id: 'dev-4',
    theme: 'Health & Healing',
    title: "Pure Air, Sunlight, and Living Water",
    scripture: {
      verse: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.",
      reference: "3 John 1:2"
    },
    egwQuote: {
      text: "Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature's remedial agencies and how to apply them.",
      source: "The Ministry of Healing, p. 127",
      book: "The Ministry of Healing"
    },
    practicalReflection: "In crowded cities, air is heavy with dust and smoke. In the country, morning mountain breezes oxygenate the blood and calm troubled nerves. Ensure your home has cross-ventilation and drink clean, living spring water today.",
    prayerPrompt: "Lord, thank You for the eight natural doctors You gave freely. Teach me to trust in Your simple natural remedies."
  },
  {
    id: 'dev-5',
    theme: 'Family Education',
    title: "The Garden: God's Original Classroom",
    scripture: {
      verse: "And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it.",
      reference: "Genesis 2:15"
    },
    egwQuote: {
      text: "Study in agricultural lines should be the A, B, and C of the education given in our schools. This is the very work that should be entered upon with earnestness.",
      source: "Testimonies for the Church, Vol. 6, p. 179",
      book: "Testimonies Vol. 6"
    },
    practicalReflection: "Children learn mathematics by measuring crop spacing, science by watching seeds sprout, and moral diligence by pulling weeds before they choke tender plants. Involve children in practical soil work today.",
    prayerPrompt: "Dear Lord, bless our children with a love for honest physical labor and guard their minds against the vain pursuits of the world."
  },
  {
    id: 'dev-6',
    theme: 'The Outpost Vision',
    title: "Outposts of Light and Mercy",
    scripture: {
      verse: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      reference: "Matthew 5:14"
    },
    egwQuote: {
      text: "It was not God's purpose that His people should be crowded into cities, huddled together in terraces and tenements. In the country, families should be established to be outposts from which to work the cities with truth and health ministry.",
      source: "Selected Messages, Book 2, p. 358",
      book: "Selected Messages Book 2"
    },
    practicalReflection: "The country home is a launching pad for ministry. Grow extra vegetables, dry medicinal herbs, and learn simple hydrotherapy treatments so your homestead can bless neighbors in times of disease and crisis.",
    prayerPrompt: "Heavenly Father, make our country homestead a beacon of hope, health, and salvation to everyone in our surrounding district."
  },
  {
    id: 'dev-7',
    theme: 'Agricultural Parables',
    title: "The Mystery of the Seed and Resurrection",
    scripture: {
      verse: "Verily, verily, I say unto you, Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit.",
      reference: "John 12:24"
    },
    egwQuote: {
      text: "The seed dies to spring forth into new life, and in this we are taught the lesson of the resurrection. All who love God will live again in the Eden above.",
      source: "Christ's Object Lessons, p. 87",
      book: "Christ's Object Lessons"
    },
    practicalReflection: "When you plant a seed of corn or bean into the dark earth, you exercise simple faith. God commands the moisture and sunlight to awaken the germ of life. Trust Him with your uncertainties today.",
    prayerPrompt: "Lord, as I place seeds into the earth, help me surrender my selfish desires so Christ may live and flourish in me."
  }
];

// ----------------------------------------------------------------------------
// PILLAR 1: TRANSITION READINESS LEDGER (5 STAGES)
// ----------------------------------------------------------------------------
export const TRANSITION_STAGES: { stageNumber: 1 | 2 | 3 | 4 | 5; title: string; subtitle: string }[] = [
  { stageNumber: 1, title: 'Spiritual & Financial Readiness', subtitle: 'Consecration, Debt Liberation, and Simplicity' },
  { stageNumber: 2, title: 'Property Scouting & Land Selection', subtitle: 'Water Source, Soil Depth, and Sacred Buffer' },
  { stageNumber: 3, title: 'Soil Preparation & Edenic Agriculture', subtitle: 'Building Living Topsoil, Orchards, and Seeds' },
  { stageNumber: 4, title: 'Home Building & Simple Living', subtitle: 'Hygienic Shelter, Natural Ventilation, and Off-Grid Water' },
  { stageNumber: 5, title: 'Outpost Work & Ministry Launch', subtitle: 'Training Grounds, Treatment Rooms, and Community Service' }
];

export const TRANSITION_MILESTONES: TransitionMilestone[] = [
  // Stage 1
  {
    id: 'm1-1',
    stageNumber: 1,
    stageName: 'Spiritual & Financial Readiness',
    title: 'Family Covenant & Prayerful Dedication',
    description: 'Gather the family to study Ellen White’s Country Living counsels and establish a shared vision.',
    actionItems: [
      'Read chapters 1–4 of Country Living together during family worship',
      'Commit the relocation plans to God in united daily prayer',
      'Reach a unified family decision without friction or compulsion'
    ],
    spiritualGuidance: {
      text: "Before families move, there should be earnest prayer and diligent counsel with experienced brethren.",
      source: "Country Living, p. 27"
    },
    category: 'Spiritual'
  },
  {
    id: 'm1-2',
    stageNumber: 1,
    stageName: 'Spiritual & Financial Readiness',
    title: 'Total Debt Elimination Plan',
    description: 'Sever consumer debt, cancel unnecessary city subscriptions, and build a modest relocation reserve.',
    actionItems: [
      'List all current debts and create an aggressive repayment schedule',
      'Downsize unnecessary city belongings and sell unused furniture/gadgets',
      'Avoid taking on new loans or speculative land debts'
    ],
    spiritualGuidance: {
      text: "Be determined never to incur another debt. Deny yourself a thousand things rather than run in debt.",
      source: "Testimonies for the Church, Vol. 7, p. 206"
    },
    category: 'Financial'
  },
  {
    id: 'm1-3',
    stageNumber: 1,
    stageName: 'Spiritual & Financial Readiness',
    title: 'Practical Skills Audit',
    description: 'Learn foundational country skills while still in the city (gardening in containers, baking bread, simple natural remedies).',
    actionItems: [
      'Practice sprouting seeds and growing greens in small patches or pots',
      'Learn how to apply hot and cold compresses, charcoal, and herbal teas',
      'Learn basic carpentry, tool sharpening, and knot tying'
    ],
    spiritualGuidance: {
      text: "Useful manual labor is a safeguard against the temptations of youth.",
      source: "Counsels to Parents, Teachers, and Students, p. 275"
    },
    category: 'Spiritual'
  },

  // Stage 2
  {
    id: 'm2-1',
    stageNumber: 2,
    stageName: 'Property Scouting & Land Selection',
    title: 'Perennial Water Source Verification',
    description: 'Ensure the property has year-round unpolluted water (flowing spring, clear stream, or verifiable shallow water table).',
    actionItems: [
      'Visit the parcel at the peak of the dry season (September/October in Malawi) to inspect water flow',
      'Test water clarity, taste, and inspect upstream for contamination or pit latrines',
      'Check elevation drop for potential gravity-fed water delivery to garden and dwelling'
    ],
    spiritualGuidance: {
      text: "He leadeth me beside the still waters. An abundant water supply is essential for health and cultivation.",
      source: "Ministry of Healing, p. 267"
    },
    category: 'Land'
  },
  {
    id: 'm2-2',
    stageNumber: 2,
    stageName: 'Property Scouting & Land Selection',
    title: 'Topsoil Depth & Drainage Examination',
    description: 'Dig test pits (at least 60cm deep) to inspect topsoil color, organic humus layer, and subsoil clay drainage.',
    actionItems: [
      'Dig 3 test holes across the property to examine soil horizons',
      'Perform the jar shake test to check sand, silt, and clay proportions',
      'Check for waterlogging during heavy rains and avoid stagnant swamps'
    ],
    spiritualGuidance: {
      text: "Get as suitable a place as your means will allow, where you can have a garden and cultivate the land.",
      source: "Country Living, p. 24"
    },
    category: 'Land'
  },
  {
    id: 'm2-3',
    stageNumber: 2,
    stageName: 'Property Scouting & Land Selection',
    title: 'Customary & Legal Land Verification (Malawi Land Act)',
    description: 'Verify customary tenure boundaries with the Village Head, Group Village Headman, and Land Committee.',
    actionItems: [
      'Meet with the local chief and elders on site with adjacent parcel owners present',
      'Document boundary marks (natural trees, stone beacons, streams) with GPS coordinates',
      'Obtain signed Village Land Committee agreement and register Customary Estate lease'
    ],
    spiritualGuidance: {
      text: "Provide things honest in the sight of all men. Let all business transactions be transparent and just.",
      source: "Romans 12:17"
    },
    category: 'Land'
  },

  // Stage 3
  {
    id: 'm3-1',
    stageNumber: 3,
    stageName: 'Soil Preparation & Edenic Agriculture',
    title: 'Living Soil Building & Thick Mulching',
    description: 'Cover bare ground immediately with dry grass, leaves, and organic matter to protect soil biology from tropical heat.',
    actionItems: [
      'Cut wild grasses and layer 15–20cm of mulch across garden beds',
      'Dig contour swales along slope contours to trap all rainwater run-off',
      'Establish a 3-pile thermal composting system with plant scraps and manure'
    ],
    spiritualGuidance: {
      text: "Nature's methods are to be respected. The ground must be treated with loving care and nourished.",
      source: "Education, p. 111"
    },
    category: 'Agriculture'
  },
  {
    id: 'm3-2',
    stageNumber: 3,
    stageName: 'Soil Preparation & Edenic Agriculture',
    title: 'Orchard & Perennial Food Forest Establishment',
    description: 'Plant fruit trees early so roots establish before the dry season (Avocados, Citrus, Mangoes, Peaches, Macadamia).',
    actionItems: [
      'Dig deep tree planting pits (80cm x 80cm) filled with rich compost and topsoil',
      'Plant fruit trees suited to the district microclimate (highland vs plateau)',
      'Intercrop with pigeon peas and nitrogen-fixing trees (Tephrosia, Gliricidia)'
    ],
    spiritualGuidance: {
      text: "Plant fruit trees, for their fruit is meat. A little piece of land where you can have fruit and vegetables.",
      source: "Country Living, p. 18"
    },
    category: 'Agriculture'
  },
  {
    id: 'm3-3',
    stageNumber: 3,
    stageName: 'Soil Preparation & Edenic Agriculture',
    title: 'Heirloom Seed Bank & Diversity',
    description: 'Collect, preserve, and test non-hybrid, open-pollinated seeds that reproduce true to type year after year.',
    actionItems: [
      'Source local open-pollinated maize, groundnuts, beans, pumpkins, and indigenous greens (Bonongwe, Chisoso)',
      'Store seeds in airtight glass jars with dry wood ash to prevent weevil damage',
      'Never become dependent on commercial hybrid seeds that cannot be saved'
    ],
    spiritualGuidance: {
      text: "Whose seed is in itself, upon the earth: and it was so.",
      source: "Genesis 1:11"
    },
    category: 'Agriculture'
  },

  // Stage 4
  {
    id: 'm4-1',
    stageNumber: 4,
    stageName: 'Home Building & Simple Living',
    title: 'Sanitary, Modest & Ventilated Dwelling',
    description: 'Construct a simple, durable shelter utilizing local stone, compressed earth bricks, and generous roof overhangs.',
    actionItems: [
      'Orient the building to capture morning sunlight and cross-ventilation breezes',
      'Incorporate wide verandas (khonde) to shade walls from harsh midday sun',
      'Ensure the home is simple, clean, pest-proof, and free from ostentation'
    ],
    spiritualGuidance: {
      text: "In building, let everything be plain, neat, and substantial, without any display or extravagance.",
      source: "Testimonies for the Church, Vol. 7, p. 100"
    },
    category: 'Shelter'
  },
  {
    id: 'm4-2',
    stageNumber: 4,
    stageName: 'Home Building & Simple Living',
    title: 'Gravity-Fed Water & Rain Catchment System',
    description: 'Install gutters along the roofline directing rainwater into clean storage tanks, and pipe spring water if available.',
    actionItems: [
      'Install metal or PVC gutters with first-flush diverters on all rooflines',
      'Set up food-grade storage tanks with fine mesh screens against mosquitoes',
      'Build a simple sand-gravel-charcoal biological water filter for drinking'
    ],
    spiritualGuidance: {
      text: "The healthfulness of the water supply is of the highest importance to the physical welfare of the family.",
      source: "Ministry of Healing, p. 274"
    },
    category: 'Shelter'
  },
  {
    id: 'm4-3',
    stageNumber: 4,
    stageName: 'Home Building & Simple Living',
    title: 'Independent Energy & Root Cellar Storage',
    description: 'Set up modest DC solar power for essential lighting and tools, plus a cool subterranean pantry for harvest storage.',
    actionItems: [
      'Install a reliable 12V/24V solar system with lithium or deep-cycle battery bank',
      'Dig an underground root cellar or shaded pantry for sweet potatoes, onions, and squash',
      'Build a fuel-efficient clay rocket stove for clean cooking'
    ],
    spiritualGuidance: {
      text: "Prepare thy work without, and make it fit for thyself in the field; and afterwards build thine house.",
      source: "Proverbs 24:27"
    },
    category: 'Shelter'
  },

  // Stage 5
  {
    id: 'm5-1',
    stageNumber: 5,
    stageName: 'Outpost Work & Ministry Launch',
    title: 'Home School & Family Training Ground',
    description: 'Organize the daily routine where book study is balanced with practical agricultural chores and Bible research.',
    actionItems: [
      'Design a dedicated schoolroom overlooking nature with comfortable, upright seating',
      'Balance academic lessons with 2–3 hours of daily outdoor gardening and trade skills',
      'Integrate nature object lessons into everyday character education'
    ],
    spiritualGuidance: {
      text: "In connection with our schools, there should be land for cultivation, that students may have physical exercise.",
      source: "Counsels on Education, p. 187"
    },
    category: 'Ministry'
  },
  {
    id: 'm5-2',
    stageNumber: 5,
    stageName: 'Outpost Work & Ministry Launch',
    title: 'Community Treatment Room & Natural Healing Ministry',
    description: 'Equip a clean, quiet treatment room to minister to sick neighbors using hydrotherapy and natural remedies.',
    actionItems: [
      'Stock pure activated charcoal powder, eucalyptus oil, garlic, and clean fomentation cloths',
      'Provide free treatments for fevers, joint pain, colds, and minor wounds to village neighbors',
      'Offer simple lifestyle and plant-based cooking demonstrations'
    ],
    spiritualGuidance: {
      text: "Christ's method alone will give true success in reaching the people. The Saviour mingled with men as one who desired their good.",
      source: "Ministry of Healing, p. 143"
    },
    category: 'Ministry'
  },
  {
    id: 'm5-3',
    stageNumber: 5,
    stageName: 'Outpost Work & Ministry Launch',
    title: 'Agricultural Demonstration & Seed Sharing',
    description: 'Open your fields to local smallholders to teach God’s regenerative methods (Farming God’s Way / Edenic agriculture).',
    actionItems: [
      'Show neighbors how thick mulching preserves soil moisture without expensive chemical fertilizers',
      'Give away heirloom seeds to families who agree to practice no-burn farming',
      'Host small Sabbath Bible studies and health fellowship circles under the shade trees'
    ],
    spiritualGuidance: {
      text: "Christ's method alone will give true success in reaching the people. The Saviour mingled with men as one who desired their good. He showed His sympathy for them, ministered to their needs, and won their confidence. Then He bade them, 'Follow Me.'",
      source: "The Ministry of Healing, p. 143"
    },
    category: 'Ministry'
  }
];

// ----------------------------------------------------------------------------
// PILLAR 2: SIMPLIFIED LAND READINESS CARDS (ALL 28 DISTRICTS OF MALAWI)
// ----------------------------------------------------------------------------
export const DISTRICT_READINESS_CARDS: DistrictReadinessCardData[] = [
  {
    id: 'dedza',
    name: 'Dedza',
    region: 'Central',
    readinessRating: 'Prime Outpost',
    readinessScore: 94,
    summary: 'Temperate mountain highlands with volcanic red clay loams, perennial spring water, and year-round vegetable and orchard potential.',
    waterProfile: {
      sourceType: 'Perennial gravity mountain springs & shallow aquifers',
      aquiferDepth: '8m – 22m',
      gravityPotential: 'Exceptional (steep escarpment drops allow unpowered piped water)',
      qualityNotes: 'Pristine mountain filtration, low mineral hardness, sweet taste'
    },
    soilProfile: {
      primaryType: 'Katondo Red Clay Loam (Rich Humic Oxisols)',
      phRange: '5.8 – 6.5 (Ideal for fruit trees & root vegetables)',
      fertility: 'High natural organic matter; responds rapidly to grass mulching',
      organicMatterTip: 'Layer dry pine needles and maize stalks to protect against cool winter winds'
    },
    climateProfile: {
      annualRainfallMm: 1250,
      dzinjaMonths: 'November to April (Reliable, heavy)',
      chilimweNotes: 'Frequent winter misty drizzles (Chiperoni) keep soil moist through July',
      solarPotential: '5.8 kWh/m²/day (Moderate mist days in winter)'
    },
    outpostAdvantages: [
      'Free gravity water drastically reduces initial solar pumping expenses',
      'Cool climate allows temperate fruit trees (Peaches, Apples, Plums, Macadamia)',
      'Just 85 km from Lilongwe along M1—close enough to minister, far enough for complete peace'
    ],
    edenicCrops: ['Irish Potatoes', 'Macadamia Nuts', 'Peaches', 'Carrots', 'Cabbage', 'Garlic', 'Wheat'],
    distanceFromMajorCities: '85 km south of Lilongwe City'
  },
  {
    id: 'ntcheu',
    name: 'Ntcheu',
    region: 'Central',
    readinessRating: 'Prime Outpost',
    readinessScore: 91,
    summary: 'Highland plateau bordering Mozambique with brisk breezes, deep red soil, abundant springs, and excellent transport access.',
    waterProfile: {
      sourceType: 'Kirk Range mountain springs & weathered basement aquifers',
      aquiferDepth: '12m – 28m',
      gravityPotential: 'Very High in Kirk Range foothills',
      qualityNotes: 'Clean, reliable drinking water year-round'
    },
    soilProfile: {
      primaryType: 'Deep Ferruginous Loams & Katondo Clay',
      phRange: '6.0 – 6.7',
      fertility: 'Very High; famous for commercial cabbage and tomato yields',
      organicMatterTip: 'Use composted cow manure and green clover mulch'
    },
    climateProfile: {
      annualRainfallMm: 1100,
      dzinjaMonths: 'November to April',
      chilimweNotes: 'Cool winters with light Chiperoni drizzle',
      solarPotential: '6.1 kWh/m²/day'
    },
    outpostAdvantages: [
      'Fertile valley dambos allow year-round double cropping',
      'Strong Adventist church presence and rural fellowship network',
      'Equidistant between Lilongwe and Blantyre'
    ],
    edenicCrops: ['Cabbage', 'Irish Potatoes', 'Tomatoes', 'Maize', 'Soybeans', 'Beans', 'Citrus'],
    distanceFromMajorCities: '140 km from Lilongwe / 160 km from Blantyre'
  },
  {
    id: 'zomba',
    name: 'Zomba',
    region: 'Southern',
    readinessRating: 'Prime Outpost',
    readinessScore: 93,
    summary: 'Lush plateau and mountain foothills with very high rainfall, perennial mountain streams, and rich microclimates for diverse food forests.',
    waterProfile: {
      sourceType: 'Zomba Plateau perennial streams & fast-flowing rivers',
      aquiferDepth: '10m – 20m',
      gravityPotential: 'Outstanding along slopes of Zomba Massif',
      qualityNotes: 'Mountain pure; minimal treatment needed for domestic use'
    },
    soilProfile: {
      primaryType: 'Rich Humic Forest Loams & Volcanic Sandy Loam',
      phRange: '5.5 – 6.4',
      fertility: 'Exceptionally rich in organic matter',
      organicMatterTip: 'Incorporate forest leaf mold and shredded prunings'
    },
    climateProfile: {
      annualRainfallMm: 1400,
      dzinjaMonths: 'November to May (Extended)',
      chilimweNotes: 'Regular mountain mists and cool nights',
      solarPotential: '5.9 kWh/m²/day'
    },
    outpostAdvantages: [
      'Abundant gravity water supports large-scale permaculture irrigation',
      'Close proximity to universities for student outpost ministry and health literature distribution',
      'High biodiversity allows sub-tropical and temperate crops side by side'
    ],
    edenicCrops: ['Avocados', 'Bananas', 'Coffee', 'Strawberries', 'Sweet Potatoes', 'Vegetables', 'Pecan Nuts'],
    distanceFromMajorCities: '65 km north of Blantyre Commercial Hub'
  },
  {
    id: 'rumphi',
    name: 'Rumphi',
    region: 'Northern',
    readinessRating: 'Prime Outpost',
    readinessScore: 92,
    summary: 'Highland mountain valleys along Nyika foothills with crystalline streams, cool climate, high rainfall, and deep serenity.',
    waterProfile: {
      sourceType: 'Nyika National Park pristine mountain watershed & perennial rivers',
      aquiferDepth: '8m – 18m',
      gravityPotential: 'Superior (abundant natural water head)',
      qualityNotes: 'Unpolluted mountain run-off from protected watershed'
    },
    soilProfile: {
      primaryType: 'Deep Humic Loams & Red Sandy Clays',
      phRange: '5.8 – 6.6',
      fertility: 'High; virgin forest qualities in higher valleys',
      organicMatterTip: 'Protect steep slopes with vetiver grass and contour terrace mulching'
    },
    climateProfile: {
      annualRainfallMm: 1300,
      dzinjaMonths: 'December to May',
      chilimweNotes: 'Brisk, cold winter months with heavy mountain dew',
      solarPotential: '6.2 kWh/m²/day'
    },
    outpostAdvantages: [
      'Secluded, tranquil mountain atmosphere ideal for sanitariums and schools',
      'Pure air and clean mountain streams free from industrial smoke',
      'Superb for temperate fruits and organic coffee/macadamia cash crops'
    ],
    edenicCrops: ['Apples', 'Coffee', 'Macadamia', 'Irish Potatoes', 'Beans', 'Honey / Apiculture', 'Citrus'],
    distanceFromMajorCities: '70 km north of Mzuzu City'
  },
  {
    id: 'mulanje',
    name: 'Mulanje',
    region: 'Southern',
    readinessRating: 'Prime Outpost',
    readinessScore: 90,
    summary: 'Dramatic mountain massif with Africa’s highest granite peak, highest rainfall in Malawi, endless gravity streams, and tropical tea/fruit belts.',
    waterProfile: {
      sourceType: 'Mulanje Mountain river basins (Likhubula, Ruo, Thuchila)',
      aquiferDepth: '6m – 15m',
      gravityPotential: 'Maximum gravity head potential anywhere in Malawi',
      qualityNotes: 'Pure granite rock catchment, crystal clear'
    },
    soilProfile: {
      primaryType: 'Volcanic Acidic Loams & Humic Forest Soils',
      phRange: '5.0 – 6.0 (May need light wood ash for brassicas)',
      fertility: 'High humus; extremely fast biological activity',
      organicMatterTip: 'Add wood ash from cooking fires to gently sweeten acidic topsoils'
    },
    climateProfile: {
      annualRainfallMm: 1800,
      dzinjaMonths: 'November to May (Heaviest rain in Central Africa)',
      chilimweNotes: 'Winter rain showers keep soils continuously green',
      solarPotential: '5.6 kWh/m²/day'
    },
    outpostAdvantages: [
      'Unsurpassed water abundance—drought is virtually unheard of here',
      'Fruit trees produce year-round crops due to steady moisture',
      'Magnificent scenery inspires deep communion with the Creator'
    ],
    edenicCrops: ['Tea', 'Pineapples', 'Bananas', 'Avocados', 'Guavas', 'Sweet Potatoes', 'Ginger'],
    distanceFromMajorCities: '75 km east of Blantyre'
  },
  {
    id: 'mzimba',
    name: 'Mzimba',
    region: 'Northern',
    readinessRating: 'Very Good',
    readinessScore: 88,
    summary: 'Vast, gently undulating plateau with extensive arable land, productive boreholes, and peaceful, uncrowded rural communities.',
    waterProfile: {
      sourceType: 'South Rukuru river basin & weathered basement aquifers',
      aquiferDepth: '20m – 40m',
      gravityPotential: 'Low in plateau center; moderate near Viphya escarpments',
      qualityNotes: 'Sweet groundwater, requires solar borehole pump'
    },
    soilProfile: {
      primaryType: 'Sandy Clay Loams & Ferruginous Oxisols',
      phRange: '6.0 – 6.8',
      fertility: 'Medium to High; deep profile with good moisture retention',
      organicMatterTip: 'Heavy compost dressing needed in sandy sections'
    },
    climateProfile: {
      annualRainfallMm: 950,
      dzinjaMonths: 'December to April',
      chilimweNotes: 'Dry, sunny, and crisp; cool nights in June/July',
      solarPotential: '6.5 kWh/m²/day (Excellent solar pumping potential)'
    },
    outpostAdvantages: [
      'Very affordable, expansive acreage—easy to acquire 5 to 20+ hectares',
      'Ideal for grain production, legumes, and large livestock integration',
      'Low population density provides deep quiet and peace'
    ],
    edenicCrops: ['Maize', 'Groundnuts', 'Sunflower', 'Soybeans', 'Cassava', 'Pigeon Peas', 'Pumpkins'],
    distanceFromMajorCities: '90 km south of Mzuzu City'
  },
  {
    id: 'kasungu',
    name: 'Kasungu',
    region: 'Central',
    readinessRating: 'Very Good',
    readinessScore: 86,
    summary: 'Broad agricultural plains with rich sandy clay loam, dependable sunlight, and extensive grain and legume farming tradition.',
    waterProfile: {
      sourceType: 'Boreholes in fractured gneiss basement & seasonal dambos',
      aquiferDepth: '25m – 45m',
      gravityPotential: 'Low (flat plains; solar pumping recommended)',
      qualityNotes: 'Good drinking water; test for seasonal water table drop'
    },
    soilProfile: {
      primaryType: 'Sandy Clay Loams & Mchinji Soil Series',
      phRange: '6.2 – 6.8',
      fertility: 'High arable quality, easy to plow and cultivate',
      organicMatterTip: 'Incorporate crop residue rather than burning fields'
    },
    climateProfile: {
      annualRainfallMm: 900,
      dzinjaMonths: 'November to April',
      chilimweNotes: 'Long dry season; dambo valley gardens (Dimba) thrive in winter',
      solarPotential: '6.6 kWh/m²/day (Top-tier solar power generation)'
    },
    outpostAdvantages: [
      'Flat topography makes mechanized or animal-draft farming straightforward',
      'High solar insolation provides surplus energy for food dehydration and storage',
      'Good road access to Lilongwe for mission work'
    ],
    edenicCrops: ['Groundnuts', 'Maize', 'Sunflower', 'Soybeans', 'Sweet Potatoes', 'Watermelons'],
    distanceFromMajorCities: '125 km north of Lilongwe City'
  },
  {
    id: 'thyolo',
    name: 'Thyolo',
    region: 'Southern',
    readinessRating: 'Prime Outpost',
    readinessScore: 91,
    summary: 'Rolling emerald hills covered in tea and macadamia estates, rich red soils, cool damp climate, and perennial stream network.',
    waterProfile: {
      sourceType: 'Perennial hillside springs and Shire river feeder streams',
      aquiferDepth: '10m – 25m',
      gravityPotential: 'Very High across rolling hills',
      qualityNotes: 'Clean, sweet mountain runoff'
    },
    soilProfile: {
      primaryType: 'Deep Red Clay Loams (Katondo) & Humic Loam',
      phRange: '5.4 – 6.3',
      fertility: 'Exceptionally fertile; excellent water retention',
      organicMatterTip: 'Mulch heavily with banana leaves and cut grass'
    },
    climateProfile: {
      annualRainfallMm: 1350,
      dzinjaMonths: 'November to May',
      chilimweNotes: 'Frequent winter mist (Chiperoni) prevents severe soil drying',
      solarPotential: '5.7 kWh/m²/day'
    },
    outpostAdvantages: [
      'Prime macadamia, avocado, and banana growing conditions',
      'Only 35–45 minutes from Blantyre city outskirts for medical and health ministry',
      'Lush green landscape promotes peace and calm for weary minds'
    ],
    edenicCrops: ['Macadamia', 'Avocados', 'Bananas', 'Pineapples', 'Passion Fruit', 'Maize', 'Vegetables'],
    distanceFromMajorCities: '40 km south of Blantyre'
  },
  {
    id: 'dowa',
    name: 'Dowa',
    region: 'Central',
    readinessRating: 'Very Good',
    readinessScore: 87,
    summary: 'Fertile plateau hills just north of Lilongwe with high agricultural productivity, dambo winter gardens, and thriving market gardens.',
    waterProfile: {
      sourceType: 'Boreholes, shallow wells & dambo streams',
      aquiferDepth: '15m – 35m',
      gravityPotential: 'Moderate in eastern hills',
      qualityNotes: 'Reliable water; shallow dambos support winter hand-pump irrigation'
    },
    soilProfile: {
      primaryType: 'Ferruginous Sandy Loams & Dambo Clays',
      phRange: '6.0 – 6.8',
      fertility: 'High; widely considered the vegetable basket of Lilongwe',
      organicMatterTip: 'Rotate with groundnuts and composted chicken manure'
    },
    climateProfile: {
      annualRainfallMm: 1000,
      dzinjaMonths: 'November to April',
      chilimweNotes: 'Cold dry winters; valleys maintain green vegetation year-round',
      solarPotential: '6.4 kWh/m²/day'
    },
    outpostAdvantages: [
      'Direct access to Lilongwe market for produce and evangelistic health lectures',
      'Year-round dambo moisture guarantees winter green vegetable harvest',
      'Rich community of Seventh-day Adventist believers throughout the district'
    ],
    edenicCrops: ['Tomatoes', 'Cabbage', 'Onions', 'Maize', 'Soybeans', 'Sweet Potatoes', 'Papayas'],
    distanceFromMajorCities: '50 km north-east of Lilongwe City'
  },
  {
    id: 'ntchisi',
    name: 'Ntchisi',
    region: 'Central',
    readinessRating: 'Prime Outpost',
    readinessScore: 90,
    summary: 'Undiscovered mountain retreat with indigenous rainforest, cool climate, crystalline springs, and quiet seclusion away from commercial traffic.',
    waterProfile: {
      sourceType: 'Ntchisi Forest Reserve spring watershed & clear streams',
      aquiferDepth: '10m – 22m',
      gravityPotential: 'High (mountain topography)',
      qualityNotes: 'Pristine, sweet, uncontaminated'
    },
    soilProfile: {
      primaryType: 'Rich Humic Loams & Red Sandy Clays',
      phRange: '5.8 – 6.5',
      fertility: 'Very High natural fertility with deep organic surface layer',
      organicMatterTip: 'Preserve existing indigenous trees as windbreaks and mulch sources'
    },
    climateProfile: {
      annualRainfallMm: 1200,
      dzinjaMonths: 'November to April',
      chilimweNotes: 'Misty and cool in winter; mild summers',
      solarPotential: '6.0 kWh/m²/day'
    },
    outpostAdvantages: [
      'Very low commercial noise and complete freedom from urban vices',
      'Ideal sanctuary location for small lifestyle retreat or home school',
      'High forest canopy maintains cool, oxygen-rich air'
    ],
    edenicCrops: ['Macadamia', 'Coffee', 'Irish Potatoes', 'Beans', 'Citrus', 'Vegetables', 'Avocados'],
    distanceFromMajorCities: '85 km north of Lilongwe'
  },
  {
    id: 'salima',
    name: 'Salima',
    region: 'Central',
    readinessRating: 'Favorable',
    readinessScore: 78,
    summary: 'Warm lakeshore alluvial plains with very shallow groundwater, abundant mangoes, and year-round dimba farming along lake tributaries.',
    waterProfile: {
      sourceType: 'Lake Malawi alluvial sand aquifers & river deltas (Linthipe)',
      aquiferDepth: '5m – 15m',
      gravityPotential: 'Minimal (flat plain)',
      qualityNotes: 'Very shallow; verify against seasonal salinity in low basins'
    },
    soilProfile: {
      primaryType: 'Alluvial Loams & Sandy Silt',
      phRange: '6.5 – 7.5',
      fertility: 'High alluvial deposit fertility',
      organicMatterTip: 'Thick straw mulching is mandatory to prevent heat evaporation'
    },
    climateProfile: {
      annualRainfallMm: 850,
      dzinjaMonths: 'December to March',
      chilimweNotes: 'Hot dry season; shallow water allows easy solar pump irrigation',
      solarPotential: '6.7 kWh/m²/day (Intense, reliable solar irradiance)'
    },
    outpostAdvantages: [
      'Shallowest groundwater in Malawi—inexpensive hand-dug wells or tube wells',
      'Superb for tropical fruits (Mangoes, Papayas, Bananas, Guavas, Citrus)',
      '1.5 hours to Lilongwe on tarmac M5/M14'
    ],
    edenicCrops: ['Mangoes', 'Papayas', 'Cassava', 'Sweet Potatoes', 'Rice', 'Watermelons', 'Tomatoes'],
    distanceFromMajorCities: '100 km east of Lilongwe City'
  },
  {
    id: 'mangochi',
    name: 'Mangochi',
    region: 'Southern',
    readinessRating: 'Favorable',
    readinessScore: 79,
    summary: 'Upper Shire River & Lake southern basin with warm climate, shallow aquifers, tropical fruit paradise, and extensive winter dambo grounds.',
    waterProfile: {
      sourceType: 'Shire River and Lake alluvial aquifers',
      aquiferDepth: '6m – 18m',
      gravityPotential: 'Low in valleys; moderate in eastern hills (Namwera)',
      qualityNotes: 'Abundant water; eastern highlands (Namwera) offer superior spring water'
    },
    soilProfile: {
      primaryType: 'Alluvial Loams in basin; Red Clays in Namwera hills',
      phRange: '6.2 – 7.2',
      fertility: 'High alluvial fertility',
      organicMatterTip: 'Cover soil continuously to protect earthworms from direct heat'
    },
    climateProfile: {
      annualRainfallMm: 950,
      dzinjaMonths: 'December to April',
      chilimweNotes: 'Hot dry season; Namwera plateau remains cool',
      solarPotential: '6.6 kWh/m²/day'
    },
    outpostAdvantages: [
      'Namwera sub-district offers temperate highland retreat conditions',
      'Year-round abundant fruit production and solar drying opportunities',
      'Diverse population with high need for medical missionary work'
    ],
    edenicCrops: ['Papayas', 'Mangoes', 'Bananas', 'Cassava', 'Maize', 'Tomatoes', 'Pineapples'],
    distanceFromMajorCities: '120 km north of Zomba'
  }
];

// ----------------------------------------------------------------------------
// PILLAR 3: EDENIC AGRICULTURE FIELD MANUALS
// ----------------------------------------------------------------------------
export const EDENIC_AGRICULTURE_GUIDES: EdenicAgricultureGuide[] = [
  {
    id: 'soil-building',
    title: 'God’s Forest Floor: Organic Soil Building & Mulching',
    subtitle: 'Restoring Katondo Clay and Depleted Soils through Biblical Permaculture',
    scripturalPrinciple: "A land of wheat, and barley, and vines, and fig trees, and pomegranates; a land of oil olive, and honey; a land wherein thou shalt not eat bread without scarceness.",
    counselReference: "Education, p. 111 & Ministry of Healing, p. 298",
    steps: [
      {
        stepNumber: 1,
        heading: "Never Burn Field Stubble",
        explanation: "Burning agricultural stubble kills beneficial earthworms, fungi, and nitrogen-fixing bacteria. When you burn, you vaporize valuable nitrogen and leave soil exposed to sun baking and erosion.",
        practicalTip: "Cut maize stalks and grass with a slasher and lay them directly on the soil surface as a protective armor."
      },
      {
        stepNumber: 2,
        heading: "Apply Thick Blanket Mulch",
        explanation: "In nature’s forest floor, God never leaves soil naked. A 15–20cm layer of dry grass, maize stalks, or leaves keeps soil temperature up to 12°C cooler, prevents weed germination, and cuts irrigation needs by 70%.",
        practicalTip: "Collect dry grass during May–July and store bundles under roof eaves for year-round bed mulching."
      },
      {
        stepNumber: 3,
        heading: "Aerate Without Inverting the Soil (No-Till Principle)",
        explanation: "Deep mechanical plowing turns the delicate anaerobic bacteria into the sun and buries aerobic biology where it suffocates. Instead, use a broadfork or digging fork to pierce and loosen the hardpan without flipping the layers.",
        practicalTip: "Drive a garden fork vertically 25cm into the soil and gently rock it backwards to crack the soil crust without turning it over."
      },
      {
        stepNumber: 4,
        heading: "Incorporate Wood Ash and Crushed Eggshells",
        explanation: "Malawi Katondo soils are naturally slightly acidic (pH 5.4–6.0). Sifting clean wood ash from your cooking fire provides potassium, calcium, and trace minerals while naturally buffering soil acidity without commercial chemical lime.",
        practicalTip: "Dust 1 small cup of sifted wood ash per square meter every 4 months, raking it beneath the mulch."
      }
    ],
    commonMistakes: [
      "Leaving garden beds bare between seasons, allowing the African sun to bake earth into concrete.",
      "Using synthetic chemical fertilizers (Urea/CAN) that acidify soil and destroy soil micro-organisms.",
      "Walking on garden beds and compacting the aerated soil paths."
    ],
    objectLesson: "Just as mulch protects tender soil organisms from scorching sun, God’s grace shields our fragile souls from the fiery darts of temptation."
  },
  {
    id: 'thermal-composting',
    title: 'The Living Compost Heap: Turning Waste into Black Gold',
    subtitle: 'Rapid Aerobic Thermal Composting Using Simple Farm Materials',
    scripturalPrinciple: "He that tilleth his land shall be satisfied with bread.",
    counselReference: "Counsels on Education, p. 165",
    steps: [
      {
        stepNumber: 1,
        heading: "The Golden Carbon-to-Nitrogen Ratio (Browns & Greens)",
        explanation: "A healthy compost pile needs balance: 3 parts dry brown material (dry grass, maize stalks, dead leaves, cardboard) to 1 part fresh green material (fresh weeds, kitchen scraps, green manure, animal droppings).",
        practicalTip: "Build your pile in layers: 15cm of dry brown grass, followed by 5cm of fresh green tithonia leaves or kitchen scraps, and a dusting of topsoil."
      },
      {
        stepNumber: 2,
        heading: "Build to Critical Thermal Mass (1m x 1m x 1m)",
        explanation: "A compost pile must be at least 1 meter wide, 1 meter long, and 1 meter high to generate internal thermal heat (55°C – 65°C). This heat pasteurizes weed seeds, kills plant pathogens, and rapidly breaks down tough cellulose.",
        practicalTip: "Push a wooden stick or metal rod into the center of the pile. Pull it out after 3 days; if it is hot to the touch, your biology is thriving."
      },
      {
        stepNumber: 3,
        heading: "Maintain Moisture Like a Wrung-Out Sponge",
        explanation: "Bacteria and actinomycetes require a thin film of water to move and consume organic matter. If the pile is too dry, decomposition stops; if soggy, it goes anaerobic and smells sour.",
        practicalTip: "Sprinkle water gently over each layer as you build. When you squeeze a handful of compost, only 1 or 2 drops of water should come out."
      },
      {
        stepNumber: 4,
        heading: "Turn the Pile on Day 7 and Day 14",
        explanation: "Turning moves the un-decomposed outer crust into the hot interior, introducing fresh oxygen for the aerobic microbes. Within 21–28 days in Malawi's warm climate, you will have dark, fragrant, earth-scented humus.",
        practicalTip: "Use a pitchfork to flip the pile onto an adjacent patch, moving outside material to the inside core."
      }
    ],
    commonMistakes: [
      "Adding diseased plant foliage or noxious perennial weed roots (like couch grass) without sufficient heat.",
      "Allowing heavy monsoon rain to leach nutrients out of the pile (cover with thatch or banana leaves).",
      "Using meat scraps or oily foods that attract stray dogs and pests."
    ],
    objectLesson: "God can take the discarded, broken fragments of our past lives and, through the fire of the Holy Spirit, transform them into rich blessings that nourish others."
  },
  {
    id: 'crop-rotation',
    title: 'Crop Rotation & Natural Pest Stewardship',
    subtitle: 'Guarding Plant Health Without Poisonous Synthetic Pesticides',
    scripturalPrinciple: "Six years thou shalt sow thy field... But the seventh year shall be a sabbath of rest unto the land.",
    counselReference: "Ministry of Healing, p. 280",
    steps: [
      {
        stepNumber: 1,
        heading: "The 4-Bed Rotational Cycle",
        explanation: "Never plant crops from the same botanical family in the same soil two seasons in a row. Group 1: Heavy Feeders (Maize, Squash, Cabbage) -> Group 2: Legumes & Soil Fixers (Beans, Groundnuts, Pigeon Peas) -> Group 3: Light Feeders (Root crops, Carrots, Onions) -> Group 4: Soil Rest & Green Manure Cover Crops.",
        practicalTip: "Draw a simple 4-quadrant map of your vegetable garden and rotate your crops clockwise every season."
      },
      {
        stepNumber: 2,
        heading: "Companion Planting (Plant Allies)",
        explanation: "Certain plants emit natural aromatic volatiles that confuse insect pests. Planting Marigolds (African marigold), Basil, and Onions alongside tomatoes deters nematodes, aphids, and hornworms.",
        practicalTip: "Plant a border of marigolds around every cabbage and tomato bed."
      },
      {
        stepNumber: 3,
        heading: "Natural Botanical Sprays (Neem, Garlic, and Chili)",
        explanation: "Commercial pesticides poison beneficial bees and accumulate in the human liver. An organic brew of crushed garlic, hot peri-peri chili, and crushed neem leaves soaked in soapy water kills soft-bodied aphids and caterpillars on contact without toxicity.",
        practicalTip: "Steep 3 crushed garlic cloves and 5 small chilies in 1 liter of warm water overnight with a teaspoon of non-detergent bar soap. Strain and spray on leaves in early morning."
      },
      {
        stepNumber: 4,
        heading: "Deep-Rooted Legumes for Nitrogen Fixation",
        explanation: "Pigeon peas have deep taproots that break through hard subsoil pans, drawing minerals to the surface and hosting nitrogen-fixing Rhizobium bacteria in their root nodules.",
        practicalTip: "Plant pigeon peas along boundary lines and field edges. Prune the leaves three times a year to drop rich green nitrogen mulch."
      }
    ],
    commonMistakes: [
      "Planting tomatoes after Irish potatoes (both are Nightshades and share devastating late blight spores).",
      "Spraying chemical poisons that eradicate ladybugs, praying mantises, and predatory wasps.",
      "Neglecting crop hygiene by leaving rotten fruit on the ground to harbor fruit fly larvae."
    ],
    objectLesson: "Diversity in the garden brings strength and pest resilience, just as diverse talents working in harmony strengthen God's church."
  },
  {
    id: 'seasonal-calendar',
    title: 'Malawi Country Living Almanac: Seasonal Planting Cycles',
    subtitle: 'Month-by-Month Agricultural Rhythm for Food Independence in Malawi',
    scripturalPrinciple: "To every thing there is a season, and a time to every purpose under the heaven: A time to plant, and a time to pluck up that which is planted.",
    counselReference: "Ecclesiastes 3:1, 2",
    steps: [
      {
        stepNumber: 1,
        heading: "August – October (Dry Season & Pre-Rain Preparation)",
        explanation: "Prepare all garden swales and compost beds while the ground is dry. Dig compost into planting pits. Collect mulch grass. Test borehole pumps and inspect rainwater catchment gutters before the first showers.",
        practicalTip: "Never wait for the rains to start before preparing your land; early prepared land absorbs the valuable first nitrogen-rich storms."
      },
      {
        stepNumber: 2,
        heading: "November – December (Rainy Season / Main Crop Sowing)",
        explanation: "Plant main staple crops on the second soaking rain (usually 25mm+). Sow local open-pollinated maize, climbing beans, groundnuts, pumpkin seeds, and sorghum. Sow seeds with compost in each planting station.",
        practicalTip: "Plant 2 seeds per station: one for you and one for the soil biology, thinning to the strongest seedling after 2 weeks."
      },
      {
        stepNumber: 3,
        heading: "January – March (Peak Growth & Weeding)",
        explanation: "Keep weeds slashed to create ongoing surface mulch. Earth up potatoes and sweet potatoes. Harvest sweet green corn, fresh amaranth greens, and tender cowpea leaves for daily nourishment.",
        practicalTip: "Spray neem/chili tea if fall armyworm appears on young maize whorls."
      },
      {
        stepNumber: 4,
        heading: "April – July (Winter Harvest & Valley Garden Season)",
        explanation: "Harvest and thoroughly sun-dry grain and legumes. Store in airtight metal silos or sealed drums with wood ash. Transition garden focus to valley wetlands and sub-irrigated beds for winter Irish potatoes, garlic, onions, and cool-season greens.",
        practicalTip: "Use the moisture-rich valley soils to produce fresh market vegetables when upland fields are dry."
      }
    ],
    commonMistakes: [
      "Planting too early on false starter showers in October, causing seedlings to scorch when rains pause.",
      "Storing grain with high moisture content (> 13%), leading to aflatoxin contamination and mold.",
      "Failing to make compost during the warm wet months when biological decomposition is at its peak."
    ],
    objectLesson: "He that observeth the wind shall not sow; and he that regardeth the clouds shall not reap. Faithful, diligent labor in season brings God’s abundant increase."
  }
];

// ----------------------------------------------------------------------------
// PILLAR 4: OUTPOST CENTER BLUEPRINTS & OPERATIONAL MODELS
// ----------------------------------------------------------------------------
export const OUTPOST_BLUEPRINTS: OutpostBlueprint[] = [
  {
    id: 'home-school-blueprint',
    type: 'Home School',
    title: 'Edenic Family Home School & Manual Training Ground',
    purpose: 'To provide harmonious development of the physical, mental, and spiritual powers, educating children away from the corrupting atmosphere of crowded cities.',
    counselQuote: {
      text: "Parents should seek a location where their children will not be surrounded by evil associations. Let them find a home in the country, where the land may be cultivated, and where the children can be taught to work with their hands.",
      source: "Country Living, p. 12"
    },
    keyFeatures: [
      'Dedicated nature classroom with large screened windows capturing natural morning sunlight',
      'Individual garden plot (5m x 5m) for each child to manage their own crops and keep financial records',
      'Small workshop equipped with manual carpentry, weaving, and mechanical tools',
      'Nature observation trail and weather recording station (rainfall gauge and thermometer)'
    ],
    dailyRhythm: [
      '6:00 AM: Family Worship, Bible memorization, and praise',
      '6:45 AM: Wholesome plant-based breakfast & domestic responsibilities',
      '8:00 AM – 11:30 AM: Academic disciplines (Mathematics, Language, Bible history, Geography)',
      '11:30 AM – 1:00 PM: Vigorous outdoor soil cultivation, tree planting, and building trades',
      '1:30 PM: Nourishing midday meal & quiet rest/reading',
      '3:00 PM – 5:00 PM: Practical home skills (Baking, sewing, tool maintenance, community visitation)'
    ],
    recommendedAcreage: '2 to 5 Hectares (Allows space for orchard, school garden, playing field, and privacy buffer)',
    operationalSteps: [
      'Establish a clear curriculum balancing spiritual truth, mental rigor, and useful physical industry.',
      'Assign daily chores not as drudgery, but as sacred contributions to the family welfare.',
      'Take regular field study walks through surrounding hills to examine plants, insects, and rocks.'
    ]
  },
  {
    id: 'sanitarium-blueprint',
    type: 'Small Sanitarium',
    title: 'Rural Lifestyle Center & Rest Sanctuary',
    purpose: 'To provide a peaceful country haven where sick, stressed, and broken individuals can find physical restoration and spiritual hope through nature’s simple remedies.',
    counselQuote: {
      text: "Our sanitariums should be located in the country, among green trees and fragrant flowers, where the air is pure and fresh. Here the sick will be brought into close contact with nature, and their thoughts will be drawn from themselves to God.",
      source: "Testimonies for the Church, Vol. 7, p. 77"
    },
    keyFeatures: [
      'Simple, spotless guest chalets constructed from breathable earth blocks and thatch or tile roofs',
      'Natural hydrotherapy facilities (hot fomentation tables, steam inhalation, sitz baths)',
      'Extensive walking paths through indigenous trees and fragrant herbal gardens',
      'Demonstration kitchen teaching simple, appetizing, unrefined plant-based nutrition'
    ],
    dailyRhythm: [
      '6:30 AM: Morning sunshine walk & deep breathing exercises',
      '7:30 AM: Fresh fruit and whole-grain breakfast',
      '9:00 AM: Individual hydrotherapy, charcoal poultices, and therapeutic massage',
      '11:00 AM: Educational health lecture (Physiology, God’s 8 Natural Laws)',
      '1:00 PM: Nutritious dinner (legumes, steamed greens, root crops, salads)',
      '3:00 PM: Guided garden therapy or practical breadmaking class',
      '6:30 PM: Evening devotional worship and quiet restful sleep by 9:00 PM'
    ],
    recommendedAcreage: '4 to 10+ Hectares (Essential for buffer zones, organic food production, and walking trails)',
    operationalSteps: [
      'Secure a verified perennial mountain spring with gravity flow to supply pure water for treatments.',
      'Train a dedicated core of consecrated missionary nurses committed to Christ-centered ministry.',
      'Never rely on synthetic pharmaceutical drugs when nature’s simple remedies can restore vitality.'
    ]
  },
  {
    id: 'treatment-rooms-blueprint',
    type: 'Treatment Rooms',
    title: 'Outpost Community Treatment Rooms & Health Cabinet',
    purpose: 'A low-overhead, village-level ministry offering compassionate natural treatments and lifestyle guidance to suffering neighbors in rural districts.',
    counselQuote: {
      text: "Medical missionary work is the right arm of the gospel of salvation... In every city and town where we have churches, there should be places where people can receive simple treatments.",
      source: "Medical Ministry, p. 238"
    },
    keyFeatures: [
      'Hygienic treatment room with water boilers, clean linen, basin stands, and massage tables',
      'Natural remedy dispensary: pure activated charcoal, eucalyptus oil, garlic tincture, dried herbs (Chikasu, Moringa, Neem)',
      'Private lifestyle counseling corner for spiritual counsel and prayer with patients',
      'Literature rack stocked with simple health tracts, Bible lessons, and family guides'
    ],
    dailyRhythm: [
      '8:00 AM: Staff prayer consecration and inventory check',
      '8:30 AM – 12:30 PM: Walk-in treatment hours (Fever management, joint fomentations, charcoal for poison/colic)',
      '1:30 PM – 3:30 PM: Home visits to bedridden or elderly villagers in surrounding settlements',
      '4:00 PM: Free health class on sanitation, clean drinking water, and child nutrition'
    ],
    recommendedAcreage: '0.5 to 1 Hectare (Can be integrated onto homestead edge or village trading post border)',
    operationalSteps: [
      'Stock pure activated charcoal powder made from clean hardwood (such as eucalyptus or peach wood).',
      'Build trusted relationships with local village headmen and clinics by offering voluntary help.',
      'Always pray with the patient before and after applying treatments, pointing them to the Great Physician.'
    ]
  },
  {
    id: 'ag-training-blueprint',
    type: 'Agricultural Training',
    title: 'Model Homestead & Agricultural Training Ground',
    purpose: 'A living demonstration farm that teaches smallholder farmers how to escape debt and hunger by cooperating with God’s natural agricultural laws.',
    counselQuote: {
      text: "The cultivation of the soil will prove a great blessing to the people. In connection with our mission stations, there should be schools where students can learn how to cultivate the soil according to the best methods.",
      source: "Testimonies for the Church, Vol. 6, p. 182"
    },
    keyFeatures: [
      'Demonstration plots comparing "Farming God’s Way" (deep mulch, no-burn, zero-till) alongside conventional burnt soil',
      'Heirloom seed multiplication garden sharing free seeds with faithful learners',
      'Composting education center demonstrating rapid thermal piles and liquid bio-fertilizer',
      'Gravity irrigation systems and solar water pumping models in active daily use'
    ],
    dailyRhythm: [
      '7:00 AM: Practical field demonstration in the soil for visiting farmers',
      '9:30 AM: Object lesson connecting soil biology to Bible spiritual principles',
      '10:30 AM: Hands-on seed extraction, cleaning, and storage workshop',
      '1:00 PM: Communal farm meal prepared from homestead produce'
    ],
    recommendedAcreage: '2 to 8 Hectares',
    operationalSteps: [
      'Maintain the demonstration plots with the highest standard of excellence and tidiness.',
      'Establish a seed-savers network where farmers return double the seed quantity after harvest.',
      'Host seasonal field days at harvest time so neighboring villages can see the superior yields with their own eyes.'
    ]
  }
];

// ----------------------------------------------------------------------------
// PILLAR 4: COMMUNITY CONNECTION DIRECTORY (MALAWI DISTRICTS)
// ----------------------------------------------------------------------------
export const COMMUNITY_DIRECTORY_ENTRIES: CommunityDirectoryEntry[] = [
  {
    id: 'comm-1',
    title: 'Dedza Highlands Heirloom Seed Circle',
    contactPerson: 'Elder John Mwale',
    district: 'Dedza',
    region: 'Central',
    primaryRole: 'Seed Savers',
    description: 'Preserving non-hybrid, open-pollinated local maize, climbing beans, and temperate fruit scions. We host monthly seed swaps at Linthipe and Dedza Boma.',
    offeringsOrNeeds: [
      'Offer: Open-pollinated yellow maize seeds, traditional climbing beans',
      'Offer: Peach and macadamia grafting cuttings',
      'Need: Heirloom wheat and cold-hardy cabbage seeds'
    ],
    locationHint: 'Dedza Mountain Foothills / Linthipe turn-off',
    contactChannel: 'Sabbath fellowship at Linthipe Rural Outpost'
  },
  {
    id: 'comm-2',
    title: 'Zomba Sanitarium & Natural Health Ministry',
    contactPerson: 'Sister Grace Gondwe',
    district: 'Zomba',
    region: 'Southern',
    primaryRole: 'Health & Lifestyle',
    description: 'Practical training in hydrotherapy, charcoal poultices, and lifestyle consultations for chronic ailments. Operating home treatment rooms in Zomba rural.',
    offeringsOrNeeds: [
      'Offer: Free hydrotherapy training workshops for country families',
      'Offer: Medical missionary herb garden starts (Moringa, Artemisia, Neem)',
      'Need: Clean flannel cloths for hot fomentations'
    ],
    locationHint: 'Chingale road, 12 km from Zomba Boma',
    contactChannel: 'Monthly health seminars on the 2nd Sunday'
  },
  {
    id: 'comm-3',
    title: 'Viphya & Rumphi Mountain Fellowship',
    contactPerson: 'Brother Chimwemwe Banda',
    district: 'Rumphi',
    region: 'Northern',
    primaryRole: 'Country Fellowship',
    description: 'A circle of Seventh-day Adventist families who have relocated to Nyika foothills. We hold combined Sabbath worship and share tools and seasonal labor.',
    offeringsOrNeeds: [
      'Offer: Temporary lodging assistance for scouting families visiting Rumphi',
      'Offer: Advice on customary land acquisition under traditional chiefs',
      'Need: Skilled carpenter for timber framed home construction'
    ],
    locationHint: 'Bolero / Nyika junction area',
    contactChannel: 'Weekly Sabbath worship under the hillside trees'
  },
  {
    id: 'comm-4',
    title: 'Central Plateau Solar & Gravity Water Guild',
    contactPerson: 'Ephraim Nyirenda',
    district: 'Lilongwe',
    region: 'Central',
    primaryRole: 'Water & Solar',
    description: 'Experienced Adventist electrician and water technician assisting rural homesteaders with DC solar pump sizing, spring catchment piping, and battery systems.',
    offeringsOrNeeds: [
      'Offer: Sizing and installation of gravity pipelines and 24V solar pumping arrays',
      'Offer: Troubleshooting flooded solar inverters and battery banks',
      'Need: Apprentice youth seeking to learn off-grid electrical trade'
    ],
    locationHint: 'Bunda / Mitundu rural corridor',
    contactChannel: 'Available throughout Central Region districts'
  },
  {
    id: 'comm-5',
    title: 'Ntcheu Kirk Range Natural Builders Circle',
    contactPerson: 'Mathews Phiri',
    district: 'Ntcheu',
    region: 'Central',
    primaryRole: 'Natural Builders',
    description: 'Master craftsmen in compressed stabilized earth bricks (CSEB), stone foundation masonry, and timber truss fabrication without cement extravagance.',
    offeringsOrNeeds: [
      'Offer: Earth block manual press rental and on-site soil testing',
      'Offer: Stone masonry construction for fireproof country houses',
      'Need: Quality seasoned pine timber supplier'
    ],
    locationHint: 'Biriwiri / Tsangano turnoff',
    contactChannel: 'Ntcheu Boma & rural fellowships'
  },
  {
    id: 'comm-6',
    title: 'Thyolo & Mulanje Permaculture Edenic Growers',
    contactPerson: 'David & Mary Chibambo',
    district: 'Thyolo',
    region: 'Southern',
    primaryRole: 'Organic Growers',
    description: 'Operating a 4-hectare chemical-free food forest with 40 varieties of fruit trees, contour swales, and bee sanctuaries. We mentor newly arriving families.',
    offeringsOrNeeds: [
      'Offer: Avocado, banana sucker, and pineapple shoot stock',
      'Offer: Hands-on compost and swale construction workshops',
      'Need: Beehive boxes and beekeeping protective suits'
    ],
    locationHint: 'Luchenza rural outskirts',
    contactChannel: 'Visitors welcome by prior Sabbath arrangement'
  }
];
