// ============================================================================
// OUTPOST: FOUR PILLARS DATA REPOSITORY
// Grounded in Adventist Country Living Counsel (Spirit of Prophecy & Scripture)
// and Practical Self-Reliance for Malawi Homesteaders
// ============================================================================

import { DISTRICT_LIST, PLANTING_PIT_SPECS } from './dataRegistry';
import { DataVerificationStatus } from './malawiDistrictData';

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
    egwCode?: string;
    verifiedUrl?: string;
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
  verificationStatus: DataVerificationStatus;
  unverifiedFields: string[];
  verificationNote?: string;
  waterProfile: {
    sourceType: string;
    aquiferDepth: string;
    aquiferSource: string | null;
    gravityPotential: string;
    qualityNotes: string;
  };
  soilProfile: {
    faoSoilClassification: string;
    primaryType: string;
    phRange: string;
    soilSource: string | null;
    fertility: string;
    organicMatterTip: string;
  };
  climateProfile: {
    annualRainfallMm: number;
    rainfallSource: string | null;
    dzinjaMonths: string;
    chilimweNotes: string;
    solarPotential: string; // e.g., "5.8 kWh/m²/day"
    solarSource: string | null;
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
  isTemplateExample?: boolean;
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
      reference: "Psalm 19:1-2"
    },
    egwQuote: {
      text: "Next to the Bible, nature is to be our great lesson book... To the little child, not yet capable of learning from the printed page or of being introduced to the routine of the schoolroom, nature presents an unfailing source of instruction and delight. The heart not yet hardened by contact with evil is quick to recognize the Presence that pervades all created things.",
      source: "Education, p. 100 (1903)",
      book: "Education",
      egwCode: "Ed 100.1",
      verifiedUrl: "https://m.egwwritings.org/en/book/29.461"
    },
    practicalReflection: "In the country, every morning sunrise and growing seedling becomes an open lesson book. Today, take 10 minutes to walk silently with a family member or in quiet contemplation, observing how God provides for the wild birds and trees.",
    prayerPrompt: "Lord, open my spiritual eyes to read Your hand of love written in the soil, trees, and skies today."
  },
  {
    id: 'dev-2',
    theme: 'The Outpost Vision',
    title: "Out of the Cities: The Sacred Call",
    scripture: {
      verse: "And my people shall dwell in a peaceable habitation, and in sure dwellings, and in quiet resting places.",
      reference: "Isaiah 32:18"
    },
    egwQuote: {
      text: "Fathers and mothers who possess a piece of land and a comfortable home are kings and queens... Break away from the cities as soon as possible, and purchase a little piece of land, where you can have a garden, where your children can watch the flowers growing, and learn from them lessons of simplicity and purity.",
      source: "Adventist Home, p. 141 & Selected Messages Book 2, p. 356",
      book: "Country Living",
      egwCode: "AH 141.4 · CL 9.6",
      verifiedUrl: "https://m.egwwritings.org/en/book/18.42"
    },
    practicalReflection: "Country living is not meant to be selfish isolation, but a holy retreat from which to gather physical and moral stamina. If you are still in town, take one concrete step today toward debt reduction and simplification.",
    prayerPrompt: "Father in heaven, grant our family courage to surrender city attractions and guide our footsteps toward a peaceful country refuge."
  },
  {
    id: 'dev-3',
    theme: 'Agricultural Parables',
    title: "The Soil of the Heart and the Field",
    scripture: {
      verse: "Sow to yourselves in righteousness, reap in mercy; break up your fallow ground: for it is time to seek the LORD, till he come and rain righteousness upon you.",
      reference: "Hosea 10:12"
    },
    egwQuote: {
      text: "No line of manual training is of more value than agriculture. A greater effort should be made to create and to encourage an interest in agricultural pursuits. Let the teacher call attention to what the Bible says about agriculture: that it was God's plan for man to till the earth; that the first man, the ruler of the whole world, was given a garden to cultivate.",
      source: "Education, p. 219 (1903)",
      book: "Education",
      egwCode: "Ed 219.1",
      verifiedUrl: "https://m.egwwritings.org/en/book/29.1045"
    },
    practicalReflection: "Just as hard red clay (Katondo) needs organic matter, aeration, and gentle rain to become fertile, a hardened spirit softens when bathed in God's word and honest outdoor labor. Physical digging relieves mental congestion.",
    prayerPrompt: "Master Gardener, plow through the stubborn corners of my heart and cultivate fruits of patience, temperance, and kindness."
  },
  {
    id: 'dev-4',
    theme: 'Health & Healing',
    title: "The Eight True Natural Remedies",
    scripture: {
      verse: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.",
      reference: "3 John 1:2"
    },
    egwQuote: {
      text: "Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature's remedial agencies and how to apply them. It is essential both to understand the principles involved in the treatment of the sick and to have a practical training that will enable one rightly to use this knowledge.",
      source: "The Ministry of Healing, p. 127 (1905)",
      book: "The Ministry of Healing",
      egwCode: "MH 127.2",
      verifiedUrl: "https://m.egwwritings.org/en/book/135.561"
    },
    practicalReflection: "In crowded cities, air is heavy with dust and smoke. In the country, morning mountain breezes oxygenate the blood and calm troubled nerves. Ensure your home has cross-ventilation and drink clean, living spring water today.",
    prayerPrompt: "Lord, thank You for the eight natural doctors You gave freely. Teach me to trust in Your simple natural remedies."
  },
  {
    id: 'dev-5',
    theme: 'Family Education',
    title: "Agriculture: The A, B, and C of True Education",
    scripture: {
      verse: "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",
      reference: "Genesis 2:15"
    },
    egwQuote: {
      text: "Study in agricultural lines should be the A, B, and C of the education given in our schools. This is the very first work that should be entered upon. Our schools should not depend upon imported produce, for grain and vegetables, and the fruits so essential to health. Our youth need an education that will fit them for practical life.",
      source: "Testimonies for the Church, Vol. 6, p. 179 (1900)",
      book: "Testimonies Vol. 6",
      egwCode: "6T 179.2",
      verifiedUrl: "https://m.egwwritings.org/en/book/140.892"
    },
    practicalReflection: "Children learn mathematics by measuring crop spacing, science by watching seeds sprout, and moral diligence by pulling weeds before they choke tender plants. Involve children in practical soil work today.",
    prayerPrompt: "Dear Lord, bless our children with a love for honest physical labor and guard their minds against the vain pursuits of the world."
  },
  {
    id: 'dev-6',
    theme: 'The Outpost Vision',
    title: "Outpost Centers: Working the Cities from Without",
    scripture: {
      verse: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      reference: "Matthew 5:14"
    },
    egwQuote: {
      text: "As God's commandment-keeping people, we must leave the cities. As did Enoch, we must work in the cities but not dwell in them... From the light given me, I know that for the present the headquarters of the work in these cities should be in some retired locality just out of the cities, where we can have room for a school and a small sanitarium.",
      source: "Evangelism, pp. 77–78 & Selected Messages Book 2, p. 358",
      book: "Evangelism",
      egwCode: "Ev 77.1 · 2SM 358.1",
      verifiedUrl: "https://m.egwwritings.org/en/book/30.391"
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
      text: "In the matchless gift of His Son, God has encircled the whole world with an atmosphere of grace as real as the air which circulates around the globe. All who choose to breathe this life-giving atmosphere will live and grow up to the stature of men and women in Christ Jesus. As the flower turns to the sun, that the bright beams may aid in perfecting its beauty and symmetry, so should we turn to the Sun of Righteousness.",
      source: "Steps to Christ, p. 68 (1892)",
      book: "Steps to Christ",
      egwCode: "SC 68.1",
      verifiedUrl: "https://m.egwwritings.org/en/book/108.294"
    },
    practicalReflection: "When you plant a seed of corn or bean into the dark earth, you exercise simple faith. God commands the moisture and sunlight to awaken the germ of life. Trust Him with your uncertainties today.",
    prayerPrompt: "Lord, as I place seeds into the earth, help me surrender my selfish desires so Christ may live and flourish in me."
  },
  {
    id: 'dev-8',
    theme: 'Health & Healing',
    title: "Wholesome Bread and Edenic Sustenance",
    scripture: {
      verse: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
      reference: "Genesis 1:29"
    },
    egwQuote: {
      text: "Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing. They impart a strength, a power of endurance, and a vigor of intellect that are not afforded by a more complex and stimulating diet.",
      source: "The Ministry of Healing, p. 296 (1905)",
      book: "The Ministry of Healing",
      egwCode: "MH 296.1",
      verifiedUrl: "https://m.egwwritings.org/en/book/135.1376"
    },
    practicalReflection: "Growing and milling your own whole wheat, sorghum, millet, groundnuts, and garden fruits frees your family from refined commercial foods and builds resilient immunity and clear mental focus.",
    prayerPrompt: "Creator God, give us wisdom to cultivate and prepare simple, wholesome food that honors our bodies as temples of the Holy Spirit."
  },
  {
    id: 'dev-9',
    theme: 'Family Education',
    title: "Mastering Useful Trades & Self-Reliance",
    scripture: {
      verse: "And that ye study to be quiet, and to do your own business, and to work with your own hands, as we commanded you.",
      reference: "1 Thessalonians 4:11"
    },
    egwQuote: {
      text: "Manual training is deserving of far more attention than it has received. Schools should be established that, in addition to the highest mental and moral culture, shall provide the best possible facilities for physical development and industrial training. Instruction should be given in agriculture, manufactures—covering as many as possible of the most useful trades—also in household economy, healthful cookery, sewing, hygienic dressmaking, the treatment of the sick, and kindred lines.",
      source: "Education, p. 218 (1903)",
      book: "Education",
      egwCode: "Ed 218.2",
      verifiedUrl: "https://m.egwwritings.org/en/book/29.1041"
    },
    practicalReflection: "Every member of a country family—sons and daughters alike—should know how to bake wholesome bread, sew durable garments, frame timber, cultivate a garden, and administer hydrotherapy.",
    prayerPrompt: "Lord, bless the work of our hands and make our youth skillful, industrious, and self-supporting workers for Your cause."
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
// Synchronized with Central 28-District Registry (FAO HWSD v2.0, DCCMS, FAO AQUASTAT, NASA POWER)
// ----------------------------------------------------------------------------
const CURATED_DISTRICT_NOTES: Record<
  string,
  {
    readinessScore: number;
    distanceFromMajorCities: string;
    gravityPotential: string;
    qualityNotes: string;
    dzinjaMonths: string;
    chilimweNotes: string;
    outpostAdvantages: string[];
  }
> = {
  dedza: {
    readinessScore: 95,
    distanceFromMajorCities: '85 km south of Lilongwe City along M1',
    gravityPotential: 'Exceptional (steep escarpment drops allow unpowered piped water)',
    qualityNotes: 'Pristine mountain filtration, low mineral hardness',
    dzinjaMonths: 'November to April (Unimodal + Chiperoni)',
    chilimweNotes: 'Winter misty drizzles (Chiperoni) keep Eutric Nitisols moist through July',
    outpostAdvantages: [
      'Gravity-fed mountain springs reduce initial solar pumping costs',
      'Cool temperate climate supports peaches, apples, plums, Irish potatoes, and wheat',
      '85 km from Lilongwe along M1—ideal outpost distance for city health & gospel work'
    ]
  },
  ntcheu: {
    readinessScore: 92,
    distanceFromMajorCities: '140 km south of Lilongwe / 160 km north of Blantyre',
    gravityPotential: 'Very High across Kirk Range foothills',
    qualityNotes: 'Clean year-round spring and fractured-rock groundwater',
    dzinjaMonths: 'November to April',
    chilimweNotes: 'Cool winters with regular Kirk Range Chiperoni mist',
    outpostAdvantages: [
      'Deep Eutric & Humic Nitisols allow year-round vegetable double-cropping',
      'Strong rural Seventh-day Adventist fellowship network',
      'Strategic M1 corridor positioning between Lilongwe and Blantyre'
    ]
  },
  zomba: {
    readinessScore: 93,
    distanceFromMajorCities: '65 km north-east of Blantyre Commercial Hub',
    gravityPotential: 'Outstanding along Zomba Massif slopes (Mulunguzi & Domasi)',
    qualityNotes: 'Pure mountain headwater streams',
    dzinjaMonths: 'November to May',
    chilimweNotes: 'Regular plateau mists and cool nights preserve soil humus',
    outpostAdvantages: [
      'Abundant gravity stream water supports multi-tier permaculture food forests',
      'Proximity to university town enables student literature and lifestyle outreach',
      'Humic Nitisols and Rhodic Ferralsols support both temperate berries and subtropical fruit'
    ]
  },
  rumphi: {
    readinessScore: 92,
    distanceFromMajorCities: '70 km north of Mzuzu City',
    gravityPotential: 'Superior (Nyika watershed perennial headwaters)',
    qualityNotes: 'Crystalline mountain runoff from protected Nyika catchment',
    dzinjaMonths: 'December to May',
    chilimweNotes: 'Brisk winter months with heavy mountain dew',
    outpostAdvantages: [
      'Secluded mountain valleys ideal for country schools and sanitariums',
      'Humic Ferralsols & Humic Acrisols suited for Arabica coffee, apples, and macadamia',
      'Abundant gravity hydro and irrigation streams'
    ]
  },
  mulanje: {
    readinessScore: 94,
    distanceFromMajorCities: '65 km east of Blantyre via M2',
    gravityPotential: 'Maximum gravity head potential in Malawi (Likhubula, Ruo, Thuchila)',
    qualityNotes: 'Pure syenite/granite massif catchment streams',
    dzinjaMonths: 'November to May (2,200 mm/yr DCCMS Normal)',
    chilimweNotes: 'Winter Chiperoni mists keep soils continuously green',
    outpostAdvantages: [
      'Highest verified rainfall and perennial stream density in Malawi',
      'Humic Ferralsols & Acrisols thrive with avocados, macadamia, pineapples, and spices',
      'Close to Blantyre for medical missionary outpost work'
    ]
  },
  mzimba: {
    readinessScore: 89,
    distanceFromMajorCities: '30–95 km from Mzuzu Northern Hub',
    gravityPotential: 'Moderate near Viphya escarpments; solar borehole on plains',
    qualityNotes: 'Sweet weathered-basement groundwater & dambo margins',
    dzinjaMonths: 'November to April',
    chilimweNotes: 'Sunny, crisp dry season with high 5.9 kWh/m²/d solar yield',
    outpostAdvantages: [
      'Low population density (110/km²) allows spacious 5–20 hectare family or school estates',
      'Orthic Ferralsols respond rapidly to biochar, Mucuna cover crops, and compost',
      'Home to historic Lunjika Adventist Mission heritage'
    ]
  },
  kasungu: {
    readinessScore: 86,
    distanceFromMajorCities: '125 km north of Lilongwe City on M1',
    gravityPotential: 'Low (gently undulating plateau; solar submersible pump recommended)',
    qualityNotes: 'Reliable basement aquifer at 22m–42m depth',
    dzinjaMonths: 'December to April',
    chilimweNotes: 'High solar irradiance (6.1 kWh/m²/d) and fertile valley dambos',
    outpostAdvantages: [
      'Gentle terrain ideal for contour swales, broadforking, and legume-grain rotations',
      'Top-tier solar insolation for solar pumping and food dehydration',
      'Direct M1 access to Lilongwe and Mzuzu'
    ]
  },
  thyolo: {
    readinessScore: 92,
    distanceFromMajorCities: '38 km south-east of Blantyre',
    gravityPotential: 'Very High across Thyolo escarpment and Bvumbwe hills',
    qualityNotes: 'Clean highland spring and stream networks',
    dzinjaMonths: 'November to May',
    chilimweNotes: 'Frequent winter Chiperoni fog prevents topsoil desiccation',
    outpostAdvantages: [
      'Deep Humic Ferralsols & Eutric Nitisols ideal for macadamia, banana, and avocado guilds',
      'Home to Malamulo Adventist Mission & Hospital (established 1902)',
      'Easy outpost reach to Blantyre metropolis'
    ]
  }
};

export const DISTRICT_READINESS_CARDS: DistrictReadinessCardData[] = DISTRICT_LIST.map((d) => {
  const curated = CURATED_DISTRICT_NOTES[d.id];
  const pitSpec = PLANTING_PIT_SPECS[d.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit;

  const readinessRating: DistrictReadinessCardData['readinessRating'] =
    d.feasibilityGrade.startsWith('A+')
      ? 'Prime Outpost'
      : d.feasibilityGrade.startsWith('A')
        ? 'Very Good'
        : 'Favorable';

  const readinessScore =
    curated?.readinessScore ??
    (d.feasibilityGrade.startsWith('A+')
      ? 91
      : d.feasibilityGrade.startsWith('A-')
        ? 85
        : d.feasibilityGrade.startsWith('A')
          ? 88
          : d.feasibilityGrade.startsWith('B+')
            ? 82
            : 78);

  return {
    id: d.id,
    name: d.name,
    region: d.region,
    readinessRating,
    readinessScore,
    summary: d.description,
    verificationStatus: d.verificationStatus,
    unverifiedFields: d.unverifiedFields,
    verificationNote: d.verificationNote,
    waterProfile: {
      sourceType: `${d.waterRating} · ${d.aquiferDepth}`,
      aquiferDepth: `~${d.aquiferDepthM}m (${d.aquiferDepth.split('(')[0].trim()})`,
      aquiferSource: d.aquiferSource,
      gravityPotential:
        curated?.gravityPotential ??
        (d.agroZone === 'Highland Sanctuary'
          ? 'High (escarpment & mountain stream headwaters)'
          : d.agroZone === 'Lakeshore Alluvial Basin'
            ? 'Low slope gradient; shallow 6m–16m solar pump lift'
            : 'Moderate; solar borehole pump to elevated header tank recommended'),
      qualityNotes:
        curated?.qualityNotes ??
        `Verified ${d.waterRating.toLowerCase()} zone (${d.aquiferSource || 'Regional hydrogeology survey pending verification'})`,
    },
    soilProfile: {
      faoSoilClassification: d.faoSoilClassification,
      primaryType: d.primarySoil,
      phRange: d.soilPh,
      soilSource: d.soilSource,
      fertility: `${d.agroZone} pedology · Recommended Pit: ${pitSpec.name} (${pitSpec.dimensionString})`,
      organicMatterTip: d.soilAmendmentPrescription,
    },
    climateProfile: {
      annualRainfallMm: d.rainfallAnnualMm,
      rainfallSource: d.rainfallSource,
      dzinjaMonths: curated?.dzinjaMonths ?? d.rainfallPattern,
      chilimweNotes:
        curated?.chilimweNotes ??
        `${d.temperatureRangeC} · ${d.frostRisk}`,
      solarPotential: `${d.solarKwhDay} kWh/m²/day`,
      solarSource: d.solarSource,
    },
    outpostAdvantages:
      curated?.outpostAdvantages ?? [
        `FAO HWSD v2.0 Soil: ${d.primarySoil} (${d.soilPh})`,
        `Water & Solar Security: ~${d.aquiferDepthM}m aquifer depth with ${d.solarKwhDay} kWh/m²/day solar insolation`,
        `Customary Tenure: ${d.landCostBallpark} (${d.traditionalAuthorities.slice(0, 3).join(', ')})`,
      ],
    edenicCrops: d.topCrops,
    distanceFromMajorCities:
      curated?.distanceFromMajorCities ??
      `${d.region} Region (${Math.abs(d.lat).toFixed(2)}°S, ${d.lng.toFixed(2)}°E · ${d.elevationRange})`,
  };
});

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
  },
  {
    id: 'sda-offgrid-sustenance-guild',
    title: 'Edenic Sustenance Guild: Whole Grains, Plant Proteins & Oilseeds',
    subtitle: 'Designing a 100% Self-Sustaining Adventist Homestead Diet (Grains, Fruits, Nuts & Vegetables)',
    scripturalPrinciple: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat. (Genesis 1:29)",
    counselReference: "The Ministry of Healing, p. 296 & Counsels on Diet and Foods, p. 313",
    steps: [
      {
        stepNumber: 1,
        heading: "Cultivate the Four Pillars of the Original Diet",
        explanation: "Ellen White counsels that 'Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator' (MH 296.1). Allocate 40% of cultivated field space to heirloom whole grains (open-pollinated maize, finger millet, red sorghum, highland wheat), 30% to nitrogen-fixing legumes & oilseeds (soybeans, groundnuts, pigeon peas, cowpeas, sunflower), 20% to perennial fruit & nut orchards (avocado, mango, citrus, banana, macadamia), and 10% to intensive kitchen greens.",
        practicalTip: "Intercrop pigeon peas and groundnuts between maize and sorghum rows so the soil fixes atmospheric nitrogen while producing complete plant amino acids."
      },
      {
        stepNumber: 2,
        heading: "Transition from Dairy & Flesh Dependency to Plant Milks & Curds",
        explanation: "In Counsels on Diet and Foods (p. 206), we are warned that disease in animals will steadily increase until milk, cream, and eggs must be laid aside. Non-GMO soybeans and shelled groundnuts grown on the homestead yield rich, calcium-fortified plant milk, coagulated tofu curds, and savory nut creams without refrigeration or pasture disease risk.",
        practicalTip: "Soak 500g soybeans overnight, wet-grind with 3.5L water, strain through muslin, boil 20 minutes, and coagulate with fresh lemon juice at 78°C for homestead tofu."
      },
      {
        stepNumber: 3,
        heading: "On-Site Whole-Grain Milling & Zwieback Preservation",
        explanation: "Refined commercial white flour is stripped of mineral bran and vitamin germ, while baking soda inflames the stomach (MH 300.2). Store grains whole in hermetic metal drums or PICS bags, mill fresh on baking day, leaven with sweet potato-water yeast, and twice-bake slices into crisp Zwieback rusks that keep for 6+ months without electricity.",
        practicalTip: "Use residual heat in your outdoor clay cob oven after bread baking (115°C) to slowly dextrinize 12mm whole-wheat slices into golden Zwieback."
      },
      {
        stepNumber: 4,
        heading: "Cold-Pressing Sunflower, Sesame & Moringa Oils",
        explanation: "Rather than purchasing refined commercial cooking oils or animal lard, grow black-hulled oilseed sunflowers, white sesame (chitowe), and Moringa oleifera trees along homestead borders. A manual lever ram-press extracts pure, cold-pressed oil while leaving a 28% protein seed-cake for compost or poultry.",
        practicalTip: "Plant a perimeter hedge of Moringa oleifera spaced at 2m intervals—its leaves provide year-round iron-rich greens and its winged seeds yield 35% ben oil."
      }
    ],
    commonMistakes: [
      "Relying on monoculture hybrid maize that requires synthetic fertilizer and lacks complete amino acids (lysine/tryptophan) without legume pairing.",
      "Using excessive quantities of concentrated nut fats in a single dish rather than the 1/10th to 1/6th proportion counselled in Counsels on Diet and Foods, p. 351.",
      "Baking with commercial baking soda (saleratus) or eating hot, clammy fresh bread before yeast fermentation has cooled."
    ],
    objectLesson: "God’s original Edenic diet requires no bloodshed and no factory dependencies—teaching us that true abundance flows directly from humble cooperation with the Creator’s soil."
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
  },
  {
    id: 'avondale-industrial-blueprint',
    type: 'Home School',
    title: 'Avondale-Model Self-Supporting Industrial & Missionary Academy',
    purpose: 'A multi-family outpost training school patterned after the Avondale and Madison blueprints—uniting Bible mastery, physiology, bookkeeping, agriculture, carpentry, tailoring, and hygienic food production.',
    counselQuote: {
      text: "Manual training is deserving of far more attention than it has received. Schools should be established that, in addition to the highest mental and moral culture, shall provide the best possible facilities for physical development and industrial training.",
      source: "Education, p. 218 (Ed 218.2 · 6T 179.2)"
    },
    keyFeatures: [
      'Balanced Half-Day Schedule: 3.5 morning hours of Bible, physiology, bookkeeping, and science; 3.5 afternoon hours of vocational trades',
      'Vocational Trade Guilds: Timber carpentry, compressed earth block masonry, treadle tailoring, wood-ash soap making, and beekeeping',
      'Hygienic Bakery & Cannery: Wood-fired clay thermal oven producing whole-grain bread, Zwieback, nut butters, and solar-dried fruits',
      'Debt-Free Student Ledgers: Every youth manages a 25m² crop plot and learns double-entry farm accounting'
    ],
    dailyRhythm: [
      '05:30 AM: Personal devotion, cold-water wash, and morning family worship',
      '06:30 AM: Whole-grain porridge, fresh orchard fruit, and Zwieback breakfast',
      '08:00 AM – 11:30 AM: Sacred history, human physiology, farm bookkeeping, and agricultural botany',
      '11:30 AM – 12:30 PM: Individual student garden plot cultivation alongside instructors',
      '12:45 PM: Main midday plant-based dinner & 45-minute digestive rest',
      '02:00 PM – 05:00 PM: Industrial trade apprenticeships (Carpentry, Masonry, Tailoring, Bakery, Hydrotherapy)',
      '06:30 PM: Evening hymn singing, testimony, and early sleep by 08:45 PM'
    ],
    recommendedAcreage: '5 to 15 Hectares (Sufficient for student orchards, woodlot timber, apiary, and trade workshops)',
    operationalSteps: [
      'Ensure teachers and parents work with their own hands alongside students in the soil and workshops every afternoon.',
      'Eliminate all speculative debt; build classrooms and workshops incrementally using on-site earth blocks and seasoned timber.',
      'Train every student to graduate with at least two self-supporting practical trades alongside medical missionary competence.'
    ]
  }
];

// ----------------------------------------------------------------------------
// PILLAR 4: COMMUNITY CONNECTION DIRECTORY (ILLUSTRATIVE REGIONAL TEMPLATES)
// ----------------------------------------------------------------------------
export const COMMUNITY_DIRECTORY_ENTRIES: CommunityDirectoryEntry[] = [
  {
    id: 'comm-1',
    title: 'Dedza Highlands Heirloom Seed Circle (Template)',
    contactPerson: 'District Seed Circle Coordinator (Illustrative)',
    district: 'Dedza',
    region: 'Central',
    primaryRole: 'Seed Savers',
    description: 'Illustrative model for a district seed-saving circle preserving non-hybrid, open-pollinated local maize, climbing beans, and temperate fruit scions across Dedza and Linthipe.',
    offeringsOrNeeds: [
      'Offer: Open-pollinated yellow maize seeds, traditional climbing beans',
      'Offer: Peach and macadamia grafting cuttings',
      'Need: Heirloom wheat and cold-hardy cabbage seeds'
    ],
    locationHint: 'Dedza Mountain Foothills / Linthipe corridor',
    contactChannel: 'Connect via local Seventh-day Adventist district church',
    isTemplateExample: true
  },
  {
    id: 'comm-2',
    title: 'Zomba Natural Health & Hydrotherapy Outpost (Template)',
    contactPerson: 'Medical Missionary Coordinator (Illustrative)',
    district: 'Zomba',
    region: 'Southern',
    primaryRole: 'Health & Lifestyle',
    description: 'Illustrative model for rural hydrotherapy training, charcoal poultice preparation, and lifestyle education operating alongside home treatment rooms in Zomba rural.',
    offeringsOrNeeds: [
      'Offer: Hydrotherapy training workshops for country families',
      'Offer: Medical missionary herb garden starts (Moringa, Artemisia, Neem)',
      'Need: Clean cotton flannel cloths for hot fomentations'
    ],
    locationHint: 'Zomba Plateau foothills / Chingale corridor',
    contactChannel: 'Connect via South Malawi Field health ministries',
    isTemplateExample: true
  },
  {
    id: 'comm-3',
    title: 'Viphya & Rumphi Mountain Fellowship (Template)',
    contactPerson: 'Northern Highland Fellowship Lead (Illustrative)',
    district: 'Rumphi',
    region: 'Northern',
    primaryRole: 'Country Fellowship',
    description: 'Illustrative model for a circle of country-dwelling families in the Nyika/Viphya foothills holding Sabbath worship and sharing seasonal farm labor.',
    offeringsOrNeeds: [
      'Offer: Scouting orientation for families visiting Rumphi & Mzimba',
      'Offer: Guidance on Customary Land Act (2016) procedures with T/As',
      'Need: Skilled timber framing and orchard pruning collaborators'
    ],
    locationHint: 'Bolero / Nyika escarpment corridor',
    contactChannel: 'Connect via North Malawi Field district churches',
    isTemplateExample: true
  },
  {
    id: 'comm-4',
    title: 'Central Plateau Solar & Gravity Water Guild (Template)',
    contactPerson: 'Off-Grid Water & Solar Lead (Illustrative)',
    district: 'Lilongwe',
    region: 'Central',
    primaryRole: 'Water & Solar',
    description: 'Illustrative model for a technical mutual-aid guild assisting rural homesteaders with DC solar submersible pump sizing, spring catchment piping, and LiFePO4 battery banks.',
    offeringsOrNeeds: [
      'Offer: Sizing checklists for gravity pipelines and 24V/48V solar pumping arrays',
      'Offer: Peer review of off-grid inverter and charge controller schematics',
      'Need: Apprentice youth learning off-grid electrical and plumbing trades'
    ],
    locationHint: 'Bunda / Mitundu rural corridor',
    contactChannel: 'Central Malawi Field laymen & vocational guilds',
    isTemplateExample: true
  },
  {
    id: 'comm-5',
    title: 'Ntcheu Kirk Range Natural Builders Circle (Template)',
    contactPerson: 'Masonry & Timber Guild Lead (Illustrative)',
    district: 'Ntcheu',
    region: 'Central',
    primaryRole: 'Natural Builders',
    description: 'Illustrative model for craftsmen sharing compressed stabilized earth brick (CSEB) presses, stone foundation masonry, and timber truss fabrication without debt.',
    offeringsOrNeeds: [
      'Offer: Manual Cinva-Ram earth block press sharing and soil clay-ratio testing',
      'Offer: Granite stone foundation layout for country homes',
      'Need: Sustainably harvested pine and eucalyptus timber suppliers'
    ],
    locationHint: 'Biriwiri / Tsangano escarpment corridor',
    contactChannel: 'Ntcheu district vocational fellowship',
    isTemplateExample: true
  },
  {
    id: 'comm-6',
    title: 'Thyolo & Mulanje Edenic Agroforestry Guild (Template)',
    contactPerson: 'Shire Highlands Permaculture Lead (Illustrative)',
    district: 'Thyolo',
    region: 'Southern',
    primaryRole: 'Organic Growers',
    description: 'Illustrative model for a chemical-free food forest with perennial fruit trees, contour vetiver swales, and top-bar bee sanctuaries mentoring newly relocating families.',
    offeringsOrNeeds: [
      'Offer: Avocado scions, banana suckers, and pineapple crown stock',
      'Offer: Hands-on thermal compost and contour swale layout workshops',
      'Need: Kenyan top-bar beehive boxes and protective veils'
    ],
    locationHint: 'Luchenza / Mulanje piedmont corridor',
    contactChannel: 'Shire Highlands rural churches & farm co-ops',
    isTemplateExample: true
  }
];
