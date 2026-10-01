import { COUNTRY_IMAGES } from '@/assets/images';

export type QuoteCategory =
  | 'Mental Health'
  | 'Children'
  | 'Physical Labor'
  | 'Spiritual Growth'
  | 'Preparation'
  | 'Vision'
  | 'Education & Manual Training'
  | 'Sustenance & Diet'
  | 'Medical Missionary';

export interface Quote {
  id: string;
  title?: string;
  theme?: string;
  image?: string;
  imageAlt?: string;
  historicalContext?: string;
  text: string;
  source: string;
  egwCode?: string;
  yearWritten?: string;
  originalDocument?: string;
  verifiedUrl?: string;
  scriptureCompanion?: {
    verse: string;
    reference: string;
  };
  malawiOutpostApplication?: string;
  category: QuoteCategory;
}

export interface Guide {
  id: string;
  title: string;
  category: 'Where' | 'What' | 'How';
  content: string;
  icon: string;
}

export interface Devotional {
  id: string;
  text: string;
  source: string;
  egwCode?: string;
  verifiedUrl?: string;
  theme: string;
}

export interface LandChecklistItem {
  id: string;
  category: 'Water' | 'Soil' | 'Legal' | 'Energy' | 'Location';
  label: string;
  description: string;
}

export const DEVOTIONAL_QUOTES: Devotional[] = [
  {
    id: 'd1',
    text: "There is no education to be gained by the study of the dead languages and of the sciences, that can compare with the education that is to be obtained from the book of nature. Let the children be taught to see in nature an expression of the love and the wisdom of God.",
    source: "Fundamentals of Christian Education, p. 512",
    egwCode: "FE 512.1",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=FE+512.1",
    theme: "Nature's School"
  },
  {
    id: 'd2',
    text: "Out of the cities; out of the cities!—this is the message the Lord has been giving me. The earthquakes will come; the floods will come; and we are not to establish ourselves in the wicked cities, where the enemy is served in every way, and where God is so often forgotten.",
    source: "Country Living, p. 7 (Loma Linda, April 16, 1906)",
    egwCode: "CL 7.1",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CL+7.1",
    theme: "The Coming Crisis"
  },
  {
    id: 'd3',
    text: "Study in agricultural lines should be the A, B, and C of the education given in our schools. This is the very first work that should be entered upon. Our schools should not depend upon imported produce, for grain and vegetables, and the fruits so essential to health.",
    source: "Testimonies for the Church, Vol. 6, p. 179",
    egwCode: "6T 179.2",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=6T+179.2",
    theme: "Soil Education"
  },
  {
    id: 'd4',
    text: "In the natural world God has placed in the hands of the children of men the key to unlock the treasure house of His Word. The unseen is illustrated by the seen; divine wisdom, eternal truth, infinite grace, are understood by the things that God has made.",
    source: "Counsels to Parents, Teachers, and Students, p. 187",
    egwCode: "CT 187.3",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CT+187.3",
    theme: "Keys to Truth"
  }
];

export const LAND_CHECKLIST_DATA: LandChecklistItem[] = [
  { id: 'w1', category: 'Water', label: 'Year-round Water Source', description: 'Verify perennial mountain springs, gravity-head elevation drop, or weathered basement aquifer depth (15m–45m) tested at peak dry season (October).' },
  { id: 's1', category: 'Soil', label: 'Topsoil Depth & Quality', description: 'Excavate 60cm test pits to verify Eutric Nitisol / Katondo clay-loam horizons, pH 5.5–6.6, and absence of synthetic chemical hardpan.' },
  { id: 'l1', category: 'Legal', label: 'Customary Land Act & Title Verification', description: 'Verify Customary Estate allocation with Village Headman (Mfumu), Group Village Headman, Traditional Authority, and District Land Registry under Act No. 19 of 2016.' },
  { id: 'e1', category: 'Energy', label: 'Solar Insolation & Gravity Micro-Hydro', description: 'Confirm North-facing solar exposure (5.5–6.5 kWh/m²/day) free of cliff shading, and evaluate stream head for gravity filtration.' },
  { id: 'loc1', category: 'Location', label: 'Outpost Proximity & Rural Seclusion', description: 'Select an "easy distance" from urban mission fields—isolated from metropolitan clamor yet accessible via all-weather feeder roads for medical and literature outreach.' }
];

export interface OutpostZone {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  suitability: string;
  crops: string[];
  climate: string;
}

export const MALAWI_OUTPOST_ZONES: OutpostZone[] = [
  {
    id: 'z1',
    name: 'Viphya Plateau',
    region: 'Northern',
    suitability: 'High - Abundant water and pine forests.',
    crops: ['Potatoes', 'Macadamia', 'Coffee'],
    climate: 'Cool, high rainfall'
  },
  {
    id: 'z4',
    name: 'Misuku Hills',
    region: 'Northern',
    suitability: 'Moderate - Excellent soil but remote access.',
    crops: ['Coffee', 'Bananas', 'Citrus'],
    climate: 'Tropical Highland'
  },
  {
    id: 'z2',
    name: 'Dedza Highlands',
    region: 'Central',
    suitability: 'Very High - Volcanic soil, temperate climate.',
    crops: ['Peaches', 'Vegetables', 'Maize'],
    climate: 'Temperate, misty'
  },
  {
    id: 'z5',
    name: 'Kasungu Plain',
    region: 'Central',
    suitability: 'Moderate - Flat land, requires good boreholes.',
    crops: ['Sunflower', 'Groundnuts', 'Maize'],
    climate: 'Savanna'
  },
  {
    id: 'z3',
    name: 'Mulanje Massif',
    region: 'Southern',
    suitability: 'High - Unique microclimates, biodiversity.',
    crops: ['Tea', 'Avocados', 'Spices'],
    climate: 'High humidity, high rainfall'
  },
  {
    id: 'z6',
    name: 'Lower Shire Valley',
    region: 'Southern',
    suitability: 'Low - Extreme heat, but good for specific crops.',
    crops: ['Cotton', 'Sugar Cane', 'Sorghum'],
    climate: 'Semi-arid, hot'
  }
];

export const EGW_QUOTES: Quote[] = [
  {
    id: 'prophecy-1844-sanctuary',
    title: "1844: Christ Enters the Most Holy Place of the Heavenly Sanctuary",
    theme: "Termination of the 2300 Days & Investigative Judgment",
    image: COUNTRY_IMAGES.sanctuary1844Judgment,
    imageAlt: "Heavenly Sanctuary Most Holy Place opened in 1844 showing the golden Ark of the Covenant and Shekinah glory",
    historicalContext: "The 2,300 prophetic days of Daniel 8:14 began in autumn 457 BC with the decree of Artaxerxes to restore Jerusalem and terminated on October 22, 1844, when Christ entered the Second Apartment (Most Holy Place) to perform the closing work of atonement.",
    text: "At the termination of the 2300 days, in 1844, Christ entered the most holy place of the heavenly sanctuary to perform the closing work of atonement, preparatory to His coming... When in the investigative judgment the work of examining the records of life is ended, then the destiny of all will have been decided.",
    source: "The Great Controversy, p. 422 (1911)",
    egwCode: "GC 422.1",
    yearWritten: "1911",
    originalDocument: "The Great Controversy, Chapter 23 — 'What Is the Sanctuary?'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=GC+422.1",
    scriptureCompanion: {
      verse: "And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.",
      reference: "Daniel 8:14"
    },
    malawiOutpostApplication: "Living during the antitypical Day of Atonement calls every rural household to daily heart preparation, family altar worship, and faithful stewardship of health, soil, and Sabbath time.",
    category: 'Vision'
  },
  {
    id: 'prophecy-three-angels',
    title: "Watchmen Proclaiming the First, Second, and Third Angels' Messages",
    theme: "The Final Warning to Every Nation, Kindred, Tongue, and People",
    image: COUNTRY_IMAGES.threeAngelsProclamation,
    imageAlt: "Three radiant angelic heralds flying in midheaven proclaiming the everlasting gospel of Revelation 14",
    historicalContext: "Following 1844, the Three Angels' Messages of Revelation 14:6–12 unite the announcement of the Judgment Hour with the call to worship the Creator of heaven, earth, and the fountains of waters.",
    text: "In a special sense Seventh-day Adventists have been set in the world as watchmen and light bearers. To them has been entrusted the last warning for a perishing world. On them is shining wonderful light from the word of God. They have been given a work of the most solemn import—the proclamation of the first, second, and third angels' messages. There is no other work of so great importance. They are to allow nothing else to absorb their attention.",
    source: "Testimonies for the Church, Vol. 9, p. 19 (1909)",
    egwCode: "9T 19.1",
    yearWritten: "1909",
    originalDocument: "Testimonies for the Church, Volume 9, Chapter 'Called to Be Witnesses'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=9T+19.1",
    scriptureCompanion: {
      verse: "Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters.",
      reference: "Revelation 14:7"
    },
    malawiOutpostApplication: "Every Malawi country outpost is designed to be a missionary lighthouse—combining natural remedies, agricultural demonstration, and gospel literature to share the Three Angels' Messages with surrounding villages and cities.",
    category: 'Vision'
  },
  {
    id: 'prophecy-second-coming-eden',
    title: "The Second Coming & The Eternal Country Inheritance",
    theme: "Deliverance of the Saints & Earth Made New",
    image: COUNTRY_IMAGES.secondComingDeliverance,
    imageAlt: "Glorious appearing of Christ in the clouds of heaven above mountain strongholds and the restored Edenic country",
    historicalContext: "The closing chapter of The Great Controversy connects earthly country stewardship with the eternal inheritance of the redeemed in the Earth Made New (Isaiah 65:21–22).",
    text: "In the Bible the inheritance of the saved is called 'a country.' Heb. 11:14–16. There the heavenly Shepherd leads His flock to fountains of living waters. The tree of life yields its fruit every month, and the leaves of the tree are for the service of the nations. There are ever-flowing streams, clear as crystal, and beside them waving trees cast their shadows upon the paths prepared for the ransomed of the Lord.",
    source: "The Great Controversy, p. 675 (1911)",
    egwCode: "GC 675.2",
    yearWritten: "1911",
    originalDocument: "The Great Controversy, Chapter 42 — 'The Controversy Ended'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=GC+675.2",
    scriptureCompanion: {
      verse: "And they shall build houses, and inhabit them; and they shall plant vineyards, and eat the fruit of them.",
      reference: "Isaiah 65:21"
    },
    malawiOutpostApplication: "Cultivating orchards, restoring living soils, and building peaceful country homes today is a foretaste and training school for the eternal Edenic country home promised at Christ's return.",
    category: 'Spiritual Growth'
  },
  {
    id: 'prep-1',
    title: "The Signal of the Roman Armies & Mountain Flight",
    theme: "The Jerusalem Parallel & Mountain Sanctuary",
    image: COUNTRY_IMAGES.jerusalemSiege,
    imageAlt: "Historical dramatic portrayal of Roman legions surrounding Jerusalem with fortified ancient stone walls",
    historicalContext: "In AD 66, Cestius Gallus unexpectedly withdrew Roman legions from besieging Jerusalem. Recognizing Christ's prophetic sign in Matthew 24:15–16, Not a single Christian perished in the AD 70 destruction because they fled immediately to Pella in the mountains of Perea.",
    text: "It is no time now for God's people to be fixing their affections or laying up their treasure in the world. The time is not far distant, when, like the early disciples, we shall be forced to seek a refuge in desolate and solitary places. As the siege of Jerusalem by the Roman armies was a signal for flight to the Judean Christians, so the assumption of power on the part of our nation in the decree enforcing the papal sabbath will be a warning to us. It will then be time to leave the large cities, preparatory to leaving the smaller ones for retired homes in lonely places among the mountains.",
    source: "Testimonies for the Church, Vol. 5, pp. 464–465 (Country Living, p. 32)",
    egwCode: "5T 464.3 · CL 32.1",
    yearWritten: "1885",
    originalDocument: "Testimonies for the Church, Volume 5, Chapter 'The Impending Conflict'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=5T+464.3",
    scriptureCompanion: {
      verse: "When ye therefore shall see the abomination of desolation, spoken of by Daniel the prophet, stand in the holy place, (whoso readeth, let him understand:) Then let them which be in Judaea flee into the mountains.",
      reference: "Matthew 24:15-16"
    },
    malawiOutpostApplication: "Establish primary rural outposts within reach of mission towns now, while scouting higher-elevation mountain sanctuaries (Dedza Escarpment, Nyika/Rumphi foothills, Zomba/Mulanje slopes, Ntchisi forest border) with perennial gravity springs.",
    category: 'Preparation'
  },
  {
    id: '1',
    title: "Take Children into the Country & Cultivate the Soil",
    theme: "Family Relocation & Productive Ground",
    image: COUNTRY_IMAGES.mountainFlight,
    imageAlt: "Christian pioneer family at an off-grid country homestead in a misty mountain valley with cultivated soil",
    historicalContext: "Written to Seventh-day Adventist parents raising families in congested industrial cities, emphasizing that even a modest cottage surrounded by arable acreage provides superior moral and physical protection.",
    text: "The time has come when, as God opens the way, families should move out of the cities. The children should be taken into the country. The parents should get as suitable a place as their means will allow. Though the dwelling may be small, yet there should be land in connection with it, that may be cultivated.",
    source: "Country Living, p. 24 (Manuscript 50, 1903)",
    egwCode: "CL 24.1",
    yearWritten: "1903",
    originalDocument: "Manuscript 50, 1903 — 'Instruction to Families Regarding Country Living'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CL+24.1",
    scriptureCompanion: {
      verse: "And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it.",
      reference: "Genesis 2:15"
    },
    malawiOutpostApplication: "Prioritize 2 to 5 acres of debt-free customary or leasehold land with deep Katondo loam over an expensive concrete house in Lilongwe or Blantyre. Build a modest compressed-earth block dwelling first and invest in soil fertility.",
    category: 'Vision'
  },
  {
    id: 'prep-2',
    title: "Raising Provisions Before the Crisis of Buying and Selling",
    theme: "Independent Homestead Food Sovereignty",
    image: COUNTRY_IMAGES.buyingSelling,
    imageAlt: "Homestead harvest with baskets of grains, vegetables, and fruit grown independently on country soil",
    historicalContext: "Written in 1909 as a solemn repetition of decades of instruction connecting Revelation 13:17 with practical agricultural self-support.",
    text: "Again and again the Lord has instructed that our people are to take their families away from the cities, into the country, where they can raise their own provisions; for in the future the problem of buying and selling will be a very serious one. We should now begin to heed the instruction given us over and over again: Get out of the cities into rural districts, where the houses are not crowded closely together, and where you will be free from the interference of enemies.",
    source: "Country Living, pp. 9–10 (Letter 5, 1904)",
    egwCode: "CL 9.6 · 2SM 141.2",
    yearWritten: "1904",
    originalDocument: "Letter 5, 1904 — Written from 'Elmshaven', St. Helena, California",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CL+9.6",
    scriptureCompanion: {
      verse: "And that no man might buy or sell, save he that had the mark, or the name of the beast, or the number of his name.",
      reference: "Revelation 13:17"
    },
    malawiOutpostApplication: "Cultivate open-pollinated heirloom maize (Chimanga cha Makolo), sorghum, cassava, pigeon peas, and perennial fruit trees so your family never depends on commercial hybrid seed corporations or urban supermarkets.",
    category: 'Preparation'
  },
  {
    id: 'vision-outpost-1',
    title: "Working the Cities from Rural Outpost Centers",
    theme: "The Enoch & Outpost Evangelism Blueprint",
    image: COUNTRY_IMAGES.mountainVista,
    imageAlt: "Sunlight breaking over highland mountain ridges overlooking distant valley settlements",
    historicalContext: "In 1902, Ellen White clarified that moving to the country is not monastic withdrawal, but the strategic establishment of rural training, publishing, and medical missionary bases.",
    text: "Repeatedly the Lord has instructed us that we are to work the cities from outpost centers. In these cities there are to be houses of worship, as memorials for God; but institutions for the publication of our literature, for the healing of the sick, and for the training of workers are to be established outside the cities. Especially is it important that our youth be shielded from the temptations of city life.",
    source: "Selected Messages, Book 2, p. 358 (Testimonies, Vol. 7, p. 250)",
    egwCode: "2SM 358.2",
    yearWritten: "1902",
    originalDocument: "Special Testimonies, Series B, No. 8, 1902",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=2SM+358.2",
    scriptureCompanion: {
      verse: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      reference: "Matthew 5:14"
    },
    malawiOutpostApplication: "Position your homestead 30–85 km outside major cities (such as Dedza or Dowa near Lilongwe; Zomba or Thyolo near Blantyre; Rumphi or Ekwendeni near Mzuzu) to operate treatment rooms, seed sanctuaries, and Sabbath mission work.",
    category: 'Vision'
  },
  {
    id: 'prep-3',
    title: "Impending Judgments Upon the Large Cities",
    theme: "The Fragility of Urban Towers & Infrastructure",
    image: COUNTRY_IMAGES.cityCrisis,
    imageAlt: "Metropolis with skyscrapers under ominous storm clouds and sirens depicting impending urban crisis",
    historicalContext: "Written shortly before the 1906 San Francisco earthquake, warning that human architectural pride and fireproof engineering cannot withstand divine reckonings.",
    text: "The time is near when the large cities will be visited by the judgments of God. In a little while these cities will be terribly shaken. No matter how large or how strong their buildings, no matter how many fire-proof precautions are taken, one touch of God will destroy them in a few minutes or hours. The ungodly cities are to be swept away by the besom of destruction. In the calamities that are now befalling immense buildings and large portions of cities, God is showing us what will come upon the whole earth.",
    source: "Testimonies for the Church, Vol. 7, p. 83 (Evangelism, p. 29)",
    egwCode: "7T 83.1",
    yearWritten: "1902",
    originalDocument: "Testimonies for the Church, Volume 7, Section 'Sensational Revivalism'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=7T+83.1",
    scriptureCompanion: {
      verse: "And every island fled away, and the mountains were not found.",
      reference: "Revelation 16:20"
    },
    malawiOutpostApplication: "Avoid investing retirement savings in dense urban real estate; construct single-story, earthquake-resilient Compressed Stabilized Earth Block (CSEB) homes with independent water and solar power.",
    category: 'Preparation'
  },
  {
    id: 'edu-1',
    title: "Agriculture: The A, B, and C of True Education",
    theme: "Harmonious Development of Hand, Head, and Heart",
    image: COUNTRY_IMAGES.openAirLabor,
    imageAlt: "Students and parents cultivating fertile garden soil together in morning light",
    historicalContext: "Given during the establishment of Avondale School for Christian Workers in Cooranbong, Australia (1897–1900), where Ellen White saw barren soil transformed into a thriving orchard and farm school.",
    text: "Study in agricultural lines should be the A, B, and C of the education given in our schools. This is the very first work that should be entered upon. Our schools should not depend upon imported produce, for grain and vegetables, and the fruits so essential to health. Our youth need an education to be gained from the tillage of the soil as well as from the study of books.",
    source: "Testimonies for the Church, Vol. 6, p. 179 (Counsels on Education, p. 165)",
    egwCode: "6T 179.2",
    yearWritten: "1900",
    originalDocument: "Testimonies for the Church, Volume 6, Chapter 'Manual Training'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=6T+179.2",
    scriptureCompanion: {
      verse: "He that tilleth his land shall be satisfied with bread: but he that followeth vain persons is void of understanding.",
      reference: "Proverbs 12:11"
    },
    malawiOutpostApplication: "Integrate 2–3 hours of daily agricultural and trade training into home schooling. Teach children to test soil pH, graft fruit trees, build compost heaps, and maintain accurate farm accounting ledgers.",
    category: 'Education & Manual Training'
  },
  {
    id: 'edu-2',
    title: "Practical Domestic Trades: Carpentry, Farming, Cooking & Sewing",
    theme: "Self-Supporting Industrial & Missionary Competence",
    image: COUNTRY_IMAGES.childrenGarden,
    imageAlt: "Youth learning practical gardening, carpentry, and domestic skills on a country homestead",
    historicalContext: "In the book Education (1903), Ellen White outlined the curriculum of the ancient Schools of the Prophets, where every student sustained himself through a skilled trade.",
    text: "Manual training is deserving of far more attention than it has received. Schools should be established that, in addition to the highest mental and moral culture, shall provide the best possible facilities for physical development and industrial training. Instruction should be given in agriculture, manufactures,—covering as many as possible of the most useful trades,—also in household economy, healthful cookery, sewing, hygienic dressmaking, the treatment of the sick, and kindred lines. Gardens, workshops, and treatment rooms should be provided, and the work in every line should be under the direction of skilled instructors.",
    source: "Education, pp. 218–219",
    egwCode: "Ed 218.2",
    yearWritten: "1903",
    originalDocument: "Education, Chapter 24 — 'Manual Training'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=Ed+218.2",
    scriptureCompanion: {
      verse: "And that ye study to be quiet, and to do your own business, and to work with your own hands, as we commanded you.",
      reference: "1 Thessalonians 4:11"
    },
    malawiOutpostApplication: "Equip your homestead with a manual woodworking bench, treadle sewing machine, clay bread oven, and hydrotherapy treatment kit so both sons and daughters master practical self-supporting trades.",
    category: 'Education & Manual Training'
  },
  {
    id: 'sustenance-1',
    title: "The Australian Deep-Trench & Rock-Bedding Orchard Method",
    theme: "Inspired Agronomy for Drought-Resilient Fruit Trees",
    image: COUNTRY_IMAGES.permacultureGarden,
    imageAlt: "Lush fruit orchard with deep mulched basins and thriving citrus, peach, and avocado trees",
    historicalContext: "When critics declared the sandy, ironstone-hardpan soil of Cooranbong, Australia incapable of growing fruit, Ellen White directed workers to excavate deep pits filled with dressed compost, stones, and topsoil—yielding the finest peaches, oranges, and grapes in the district.",
    text: "While we were in Australia, we adopted the plan of digging deep trenches and filling them in with dressing that would provide nourishment for the roots. This was done with the cultivation of tomatoes, oranges, lemons, peaches, and grapes. The trees grew rapidly, and bore abundant fruit of the finest quality.",
    source: "Selected Messages, Book 3, p. 328 (Letter 350, 1907)",
    egwCode: "3SM 328.1 · Lt 350, 1907",
    yearWritten: "1907",
    originalDocument: "Letter 350, 1907 — Written to Brethren at Loma Linda",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=3SM+328.1",
    scriptureCompanion: {
      verse: "For he shall be as a tree planted by the waters, and that spreadeth out her roots by the river, and shall not see when heat cometh, but her leaf shall be green.",
      reference: "Jeremiah 17:8"
    },
    malawiOutpostApplication: "Excavate 90cm x 90cm x 90cm pits during the September–October dry season; lay 15cm of river stones and coarse charcoal at the base, then backfill with 50% native topsoil, 40% thermophilic compost, bone meal, and wood ash.",
    category: 'Sustenance & Diet'
  },
  {
    id: 'sustenance-2',
    title: "The Edenic Diet: Grains, Fruits, Nuts, and Vegetables",
    theme: "Complete Plant-Based Nutrition from the Homestead",
    image: COUNTRY_IMAGES.buyingSelling,
    imageAlt: "Abundant harvest of whole grains, legumes, macadamia nuts, avocados, and garden vegetables",
    historicalContext: "Published in The Ministry of Healing (1905), establishing the scientific and scriptural basis for a nutrient-dense, unrefined plant-based diet grown on one's own land.",
    text: "Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing. They impart a strength, a power of endurance, and a vigor of intellect that are not afforded by a more complex and stimulating diet.",
    source: "The Ministry of Healing, p. 296 (Counsels on Diet and Foods, p. 81)",
    egwCode: "MH 296.1",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'Diet and Health'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+296.1",
    scriptureCompanion: {
      verse: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
      reference: "Genesis 1:29"
    },
    malawiOutpostApplication: "Combine Malawi's staple grains (whole maize, sorghum, finger millet/mawere, brown rice) with complete-protein legumes (soybeans, pigeon peas, groundnuts), oil-rich macadamia/avocados, and dark leafy greens (bonongwe, moringa, pumpkin leaves).",
    category: 'Sustenance & Diet'
  },
  {
    id: 'sustenance-3',
    title: "The Sacred Art of Wholesome Whole-Grain Breadmaking",
    theme: "Natural Fermentation, Zwieback & Culinary Science",
    image: COUNTRY_IMAGES.openAirLabor,
    imageAlt: "Artisan whole-grain bread loaves and zwieback cooling beside a traditional thermal oven",
    historicalContext: "Ellen White regarded wholesome breadmaking as an essential religious duty and domestic science, warning against chemical leavening agents (baking soda/saleratus) and heavy, sour loaves.",
    text: "The use of soda or baking powder in breadmaking is harmful and unnecessary. Soda causes inflammation of the stomach and often poisons theentire system... Bread should be light and sweet. Not the least taint of sourness should be tolerated. The loaves should be small, and so thoroughly baked that, so far as possible, the yeast germs shall be destroyed. For those who can use them, good vegetables and fruits, and whole-wheat bread, or zwieback, are the best articles of diet.",
    source: "The Ministry of Healing, pp. 300–301",
    egwCode: "MH 300.2",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'Preparation of Food'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+300.2",
    scriptureCompanion: {
      verse: "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God.",
      reference: "1 Corinthians 10:31"
    },
    malawiOutpostApplication: "Mill whole wheat, sorghum, and millet fresh on the homestead; bake small loaves thoroughly in a wood-fired clay thermal oven, and slice loaves to twice-bake into crisp, shelf-stable Zwieback rusks that keep for months without refrigeration.",
    category: 'Sustenance & Diet'
  },
  {
    id: 'med-1',
    title: "Heaven's Eight True Remedies & Natural Healing",
    theme: "The Foundation of Medical Missionary Work",
    image: COUNTRY_IMAGES.malawiHomesteadSanctuary,
    imageAlt: "Sunlit mountain homestead surrounded by pure flowing water, pine trees, and fresh air",
    historicalContext: "The classic cornerstone statement of Seventh-day Adventist lifestyle medicine, accessible to every rich or poor family without costly pharmaceuticals.",
    text: "Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power—these are the true remedies. Every person should have a knowledge of nature's remedial agencies and how to apply them. It is essential both to understand the principles involved in the treatment of the sick and to have a practical training that will enable one rightly to use this knowledge.",
    source: "The Ministry of Healing, p. 127",
    egwCode: "MH 127.2",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'Rational Remedies'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+127.2",
    scriptureCompanion: {
      verse: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.",
      reference: "3 John 1:2"
    },
    malawiOutpostApplication: "Design your outpost around the 8 laws of health: cross-ventilated bedrooms, daily outdoor cultivation, gravity-fed pure spring water for drinking and hydrotherapy, and sunset Sabbath rest.",
    category: 'Medical Missionary'
  },
  {
    id: 'med-2',
    title: "Pulverized Hardwood Charcoal, Poultices & Hydrotherapy",
    theme: "Simple Field Remedies for Inflammation, Poison & Sepsis",
    image: COUNTRY_IMAGES.peacefulMind,
    imageAlt: "Natural apothecary preparation with activated hardwood charcoal, eucalyptus leaves, and linen fomentation cloths",
    historicalContext: "Ellen White repeatedly prescribed pulverized wood charcoal both internally and externally as a life-saving adsorbent for gastrointestinal toxins, reptile bites, and severe tissue inflammation.",
    text: "I will tell you a little about my experience with charcoal as a remedy. For some forms of indigestion, it is more efficacious than drugs. A little olive oil into which some of this powder has been stirred tones and cleanses the stomach. I have found it to be excellent. Pulverized charcoal, wet with water or used in poultices, is most successful in checking inflammation and drawing out poison.",
    source: "Selected Messages, Book 2, p. 294 (Letter 100, 1903)",
    egwCode: "2SM 294.2",
    yearWritten: "1903",
    originalDocument: "Letter 100, 1903 — 'The Use of Simple Remedies'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=2SM+294.2",
    scriptureCompanion: {
      verse: "And Isaiah said, Take a lump of figs. And they took and laid it on the boil, and he recovered.",
      reference: "2 Kings 20:7"
    },
    malawiOutpostApplication: "Produce medical-grade hardwood charcoal from clean eucalyptus or peach wood in a sealed pyrolysis tin, pulverize into fine powder, and store in airtight glass jars alongside flaxseed/cassava meal for emergency poultices.",
    category: 'Medical Missionary'
  },
  {
    id: 'prep-4',
    title: "A Little Piece of Land Where Flowers and Fruit Grow",
    theme: "Simplicity, Purity, and Children's Moral Growth",
    image: COUNTRY_IMAGES.childrenGarden,
    imageAlt: "Children in cottage garden planting flowers and vegetables happily under morning sunshine",
    historicalContext: "Urban exposure hardens the tender sensibilities of children; soil and blooming flora cultivate reverence, gentle curiosity, and filial love.",
    text: "Get out of the cities as soon as possible, and purchase a little piece of land where you can have a garden, where your children can watch the flowers grow and learn from them lessons of simplicity and purity.",
    source: "Country Living, p. 18 (Selected Messages, Book 2, p. 356)",
    egwCode: "CL 18.2 · 2SM 356.1",
    yearWritten: "1903",
    originalDocument: "General Conference Bulletin, April 6, 1903",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CL+18.2",
    scriptureCompanion: {
      verse: "Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these.",
      reference: "Matthew 6:28-29"
    },
    malawiOutpostApplication: "Assign each child a dedicated 4m x 4m raised garden plot bordered with marigolds, hibiscus, strawberries, and heirloom vegetables to steward as their own outdoor classroom.",
    category: 'Children'
  },
  {
    id: '3',
    title: "Guarding Children from Urban Contamination & Vice",
    theme: "Preserving Youth from Moral Corruption",
    image: COUNTRY_IMAGES.cityNoiseContrast,
    imageAlt: "Contrast between noisy crowded city streets and serene green mountain countryside",
    historicalContext: "Metropolises present unending spectacles, tumult, and immoral amusements that erode the conscience of youth; rural homes offer a sanctuary of industry and peace.",
    text: "It is not God's will that His people shall settle in the cities, where there is constant turmoil and confusion. Their children should be spared this; for the whole system is demoralized by the hurry and rush and noise. The Lord desires His people to move into the country, where they can settle on the land, and raise their own fruit and vegetables, and where their children can be brought in direct contact with the works of God in nature.",
    source: "Country Living, p. 13 (Selected Messages, Book 2, p. 357)",
    egwCode: "CL 13.1 · 2SM 357.3",
    yearWritten: "1902",
    originalDocument: "Manuscript 133, 1902",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=CL+13.1",
    scriptureCompanion: {
      verse: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
      reference: "Proverbs 22:6"
    },
    malawiOutpostApplication: "Replace screen addiction and street noise with bird identification, beekeeping, stream hydrology walks, and family evening worship under the Southern Cross.",
    category: 'Children'
  },
  {
    id: '2',
    title: "Cultivation of the Soil as God's Restorative Schoolroom",
    theme: "Open-Air Physical Dignity & Nerve Recovery",
    image: COUNTRY_IMAGES.openAirLabor,
    imageAlt: "Homesteader broadforking deep loamy soil in an open field under clear morning light",
    historicalContext: "Manual labor in harmony with nature restores muscle tone, deepens respiration, oxygenates the blood, and gives practical object lessons in God's creative laws.",
    text: "No line of manual training is of more value than agriculture. A greater effort should be made to create and to encourage an interest in agricultural pursuits. Let the teacher call attention to what the Bible says about agriculture: that it was God's plan for man to till the earth; that the first man, the ruler of the whole world, was given a garden to cultivate; and that many of the world's greatest men, its real nobility, have been tillers of the soil.",
    source: "Education, p. 219",
    egwCode: "Ed 219.1",
    yearWritten: "1903",
    originalDocument: "Education, Chapter 24 — 'Manual Training'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=Ed+219.1",
    scriptureCompanion: {
      verse: "Moreover the profit of the earth is for all: the king himself is served by the field.",
      reference: "Ecclesiastes 5:9"
    },
    malawiOutpostApplication: "Honor agricultural work as a noble calling rather than menial labor. Use ergonomic broadforks and mulched no-till beds to make soil cultivation joyful and sustainable.",
    category: 'Physical Labor'
  },
  {
    id: '4',
    title: "Nature's Symbols Unlock the Treasures of the Word",
    theme: "The Divine Character Written in Creation",
    image: COUNTRY_IMAGES.natureSymbols,
    imageAlt: "Open Bible on a rustic wooden table surrounded by wildflowers and mountain pine forest in golden sunlight",
    historicalContext: "Every seed, vine, branch, stream, and stone was used by Christ to illustrate eternal truths; country living opens this living commentary on Scripture.",
    text: "So far as possible, let the child from his earliest years be placed where this wonderful lesson book shall be open before him. Let him behold the glorious scenes painted by the great Master Artist upon the shifting canvas of the heavens, let him become acquainted with the wonders of earth and sea, let him watch the unfolding mysteries of the changing seasons, and in all His works learn of the Creator.",
    source: "Education, pp. 100–101",
    egwCode: "Ed 100.3",
    yearWritten: "1903",
    originalDocument: "Education, Chapter 11 — 'Lessons of Life'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=Ed+100.3",
    scriptureCompanion: {
      verse: "For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead.",
      reference: "Romans 1:20"
    },
    malawiOutpostApplication: "Connect every farm activity—sowing seed, pruning dead wood, grafting scions, and harvesting grain—to Christ's parables in Matthew 13 and John 15 during morning field worship.",
    category: 'Spiritual Growth'
  },
  {
    id: 'mh-1',
    title: "Root Cause of Disease: The Ailments of the Mind",
    theme: "Restoring Broken Life-Forces Through Peace",
    image: COUNTRY_IMAGES.peacefulMind,
    imageAlt: "Peaceful figure resting beside tranquil mountain brook in gentle golden woodland light",
    historicalContext: "Decades before modern psychosomatic medicine, Ellen White identified that nine-tenths of chronic physical illnesses originate in mental grief, anxiety, guilt, and urban stress.",
    text: "Sickness of the mind prevails everywhere. Nine tenths of the diseases from which men suffer have their foundation here. Perhaps some living home trouble is like a canker eating to the very soul and weakening the life-forces. Remorse for sin sometimes undermines the constitution and unbalances the mind.",
    source: "The Ministry of Healing, p. 241 (Mind, Character, and Personality, Vol. 1, p. 59)",
    egwCode: "MH 241.1",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'Mind Cure'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+241.1",
    scriptureCompanion: {
      verse: "A merry heart doeth good like a medicine: but a broken spirit drieth the bones.",
      reference: "Proverbs 17:22"
    },
    malawiOutpostApplication: "Create a quiet prayer grove and garden walking trail on your homestead where family members and visiting city guests can unburden their minds in solitude and nature.",
    category: 'Mental Health'
  },
  {
    id: 'mh-2',
    title: "Healing Medicine of Pure Air, Sunshine & Garden Exercise",
    theme: "Restoration for the Weary Invalid & Overworked Mind",
    image: COUNTRY_IMAGES.permacultureGarden,
    imageAlt: "Lush permaculture orchard garden with raised beds, fruit trees, and sunlit paths",
    historicalContext: "Natural sunlight, negative ions near flowing mountain streams, aerobic exercise in planting, and fragrant botanical terpenes bring biological healing no pharmacy can match.",
    text: "There is nothing moreaidu to health of body and mind than the spirit of gratitude and praise... In the country the sick find a thousand things to call their attention away from themselves and their sufferings. Every breath of pure air, every ray of sunshine, the beauty of the flowers and trees, the song of the birds, all minister to the restoration of health.",
    source: "The Ministry of Healing, pp. 264–265",
    egwCode: "MH 264.3",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'In Contact With Nature'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+264.1",
    scriptureCompanion: {
      verse: "Unto you that fear my name shall the Sun of righteousness arise with healing in his wings.",
      reference: "Malachi 4:2"
    },
    malawiOutpostApplication: "Schedule light morning garden care (06:30–08:30) for convalescing guests or stressed family members to absorb early vitamin-D sunlight and aromatic pine/eucalyptus air.",
    category: 'Mental Health'
  },
  {
    id: 'mh-3',
    title: "Country Sanitariums & Healing Retreats for the Suffering",
    theme: "Sanctuary from Sensory Overload",
    image: COUNTRY_IMAGES.malawiHomesteadSanctuary,
    imageAlt: "Malawi highland homestead surrounded by mountains, green trees, and blue skies",
    historicalContext: "Ellen White counseled that every sanitarium and lifestyle treatment center should be situated amidst rural hills, trees, and gardens rather than noisy downtown streets.",
    text: "Our sanitariums should be located in the country, among green trees and fragrant flowers, where the air is pure and fresh. Here the sick will be brought into close contact with nature, and their thoughts will be drawn from themselves to God. In the natural surroundings of the country, there is for the sick and suffering a health-giving power.",
    source: "Testimonies for the Church, Vol. 7, p. 77 (The Ministry of Healing, p. 365)",
    egwCode: "7T 77.1 · MH 365.1",
    yearWritten: "1902",
    originalDocument: "Testimonies for the Church, Volume 7, Section 'Country Sanitariums'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=7T+77.1",
    scriptureCompanion: {
      verse: "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
      reference: "Psalm 23:2-3"
    },
    malawiOutpostApplication: "Build 1 or 2 simple, spotless guest cottages on your rural acreage so burned-out pastors, teachers, and sick neighbors can experience a 10-day natural lifestyle restoration.",
    category: 'Mental Health'
  },
  {
    id: 'mh-4',
    title: "Escaping the Artificial Life of the Crowded Metropolis",
    theme: "Returning to God's Original Design",
    image: COUNTRY_IMAGES.homesteadHighlands,
    imageAlt: "Panoramic view of highland homestead overlooking misty valleys and fresh green plateaus",
    historicalContext: "The cramped, artificial routine of modern cities drains spiritual and nervous vitality; stepping into nature re-anchors our identity in the Creator.",
    text: "The noise and bustle of the city, the cramped and artificial life, are a weariness and a trial to the sick and nervous. The quiet, the beauty, the freshness of nature bring rest and healing. To the chronic invalid nothing so tends to restore health and happiness as living in the attractive country environment.",
    source: "Country Living, p. 14 (The Ministry of Healing, p. 262)",
    egwCode: "CL 14.4 · MH 262.1",
    yearWritten: "1905",
    originalDocument: "The Ministry of Healing, Chapter 'In Contact With Nature'",
    verifiedUrl: "https://m.egwwritings.org/en/search?query=MH+262.1",
    scriptureCompanion: {
      verse: "And my people shall dwell in a peaceable habitation, and in sure dwellings, and in quiet resting places.",
      reference: "Isaiah 32:18"
    },
    malawiOutpostApplication: "Design homestead living spaces with wide shaded verandas (khonde) facing mountain ridges or orchards to encourage outdoor reading, prayer, and quiet reflection.",
    category: 'Mental Health'
  }
];

import { DISTRICT_LIST } from './dataRegistry';

export interface MalawiDistrictInfo {
  id?: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  altitude: string;
  rainfall: string;
  rainfallAnnualMm: number;
  soil: string;
  faoSoilClassification: string;
  soilTypeDetailed: string;
  soilPh: string;
  groundwaterDepthM: string;
  aquiferDepthM: number;
  solarKwhDay: number;
  landCostBallpark: string;
  nearestMarketTown: string;
  m1DistanceKm: string;
  suitabilityScore: number; // 1 to 10
  verificationStatus: 'verified' | 'partial' | 'unverified' | 'pending';
  unverifiedFields: string[];
  verificationNote?: string;
  bestCrops: string[];
  outpostStrategy: string;
  hydrogeologyNote: string;
  dccmsSourceRef: string;
}

const DISTRICT_CURATED_META: Record<
  string,
  {
    nearestMarketTown: string;
    m1DistanceKm: string;
    outpostStrategy: string;
    hydrogeologyNote: string;
  }
> = {
  dedza: {
    nearestMarketTown: 'Dedza Boma & Lizulu Trading Centre (Direct on M1 Highway)',
    m1DistanceKm: '0 – 15 km from main M1 transport spine',
    outpostStrategy:
      'Prime cold-climate highland sanctuary. High altitude yields cool nights (6°C in winter), ideal for seed saving, root cellars, and year-round vegetable cropping without heat stress.',
    hydrogeologyNote:
      'High mountain catchment recharge ensures strong perennial springs. Gravity-fed pipelines work exceptionally well without electricity.',
  },
  mzimba: {
    nearestMarketTown: 'Mzimba Boma, Ekwendeni & Mzuzu City (M1 North)',
    m1DistanceKm: '5 – 35 km depending on ward',
    outpostStrategy:
      'Vast land holdings with low population density. Excellent for broad-acre organic farming, solar food forests, livestock stewardship, and off-grid timber sanctuaries.',
    hydrogeologyNote:
      'Abundant seasonal dambos (valley wetlands) retain moisture into late October. Shallow hand-dug wells and boreholes yield high-quality water.',
  },
  mulanje: {
    nearestMarketTown: 'Mulanje Boma & Limbuli Border Market (Near M2 Highway)',
    m1DistanceKm: '65 km East of M1 via Thyolo/Blantyre M2',
    outpostStrategy:
      'Abundant natural mountain rivers flowing from Mulanje Massif. Winter Chiperoni mists maintain high relative humidity. Exceptional for tropical food forests and hydro micro-turbines.',
    hydrogeologyNote:
      'Dozens of perennial mountain streams (Likhubula, Ruo, Thuchila) provide clean surface water for gravity filtration systems.',
  },
  kasungu: {
    nearestMarketTown: 'Kasungu Boma & Nkhamenya Trading Centre (Direct M1 North)',
    m1DistanceKm: '0 – 20 km along M1 corridor',
    outpostStrategy:
      'Gentle, flat terrain ideal for animal-drawn broadforking, leguminous crop rotations, and solar-pumped borehole irrigation. Excellent dry grain storage conditions.',
    hydrogeologyNote:
      'Weathered crystalline basement aquifer (~32m mean depth) requiring drilled boreholes fitted with solar submersible pumps and elevated holding tanks.',
  },
  zomba: {
    nearestMarketTown: 'Zomba City & Songani Trading Centre (M3 Highway)',
    m1DistanceKm: '40 km East of M1 via Zomba turnoff',
    outpostStrategy:
      'Perennial mountain springs from Zomba Plateau provide cool mountain air and clean water. Historic agricultural hub with close proximity to Adventist health & education centers.',
    hydrogeologyNote:
      'Mulunguzi River and mountain springs provide year-round gravity irrigation options for slope homesteads.',
  },
  ntcheu: {
    nearestMarketTown: 'Ntcheu Boma & Lizulu Market (M1 Highway)',
    m1DistanceKm: '0 – 10 km along M1 spine',
    outpostStrategy:
      'Located along the cool Kirk Range escarpment. Famous for vegetable production and rapid access to Lilongwe/Blantyre via M1. High agricultural self-reliance potential.',
    hydrogeologyNote:
      'Springs along the Kirk Range feed gravity irrigation systems for vegetable terraces (~22m mean aquifer depth).',
  },
  nkhotakota: {
    nearestMarketTown: 'Nkhotakota Boma & Dwangwa Trading Centre (M5 Lakeshore Highway)',
    m1DistanceKm: '75 km East of M1 via Ntchisi/Kasungu roads',
    outpostStrategy:
      'Abundant water supply from Lake Malawi and major rivers (Bua, Kaombe, Dwangwa). High rainfall allows rainfed rice, cassava, and tropical agroforestry.',
    hydrogeologyNote:
      'Shallow unconsolidated lakeshore alluvial water table (~10m mean depth) allows low-head solar surface and submersible pumping.',
  },
  chitipa: {
    nearestMarketTown: 'Chitipa Boma, Kapoka & Misuku Trading Centres',
    m1DistanceKm: '95 km North-West of Karonga M1 junction via M26',
    outpostStrategy:
      'Remote, pristine highland sanctuary bordering the Misuku Hills forest reserve. Pristine spring water, deep Humic Acrisol & Nitisol soils, and quiet rural seclusion.',
    hydrogeologyNote:
      'Natural mountain springs and shallow highland aquifers (~22m mean depth) feed pure drinking water via gravity pipes.',
  },
};

export const MALAWI_DISTRICTS_DATA: Record<string, MalawiDistrictInfo> = Object.fromEntries(
  DISTRICT_LIST.map((d) => {
    const meta = DISTRICT_CURATED_META[d.id];
    return [
      d.id,
      {
        id: d.id,
        name: `${d.name} District`,
        region: d.region,
        altitude: `${d.agroZone} (${d.elevationRange})`,
        rainfall: `${d.rainfallAnnualMm.toLocaleString()} mm/year (${d.rainfallPattern})`,
        rainfallAnnualMm: d.rainfallAnnualMm,
        soil: d.primarySoil,
        faoSoilClassification: d.faoSoilClassification,
        soilTypeDetailed: `${d.primarySoil} — ${d.soilAmendmentPrescription}`,
        soilPh: d.soilPh,
        groundwaterDepthM: d.aquiferDepth,
        aquiferDepthM: d.aquiferDepthM,
        solarKwhDay: d.solarKwhDay,
        landCostBallpark: d.landCostBallpark,
        nearestMarketTown:
          meta?.nearestMarketTown ??
          `${d.name} Boma & T/A Trading Centres (${d.traditionalAuthorities.slice(0, 2).join(', ')})`,
        m1DistanceKm:
          meta?.m1DistanceKm ??
          `${d.region} Region transport network (${Math.abs(d.lat).toFixed(2)}°S, ${d.lng.toFixed(2)}°E)`,
        suitabilityScore: d.suitabilityScore,
        verificationStatus: d.verificationStatus,
        unverifiedFields: d.unverifiedFields,
        bestCrops: d.topCrops,
        outpostStrategy: meta?.outpostStrategy ?? d.description,
        hydrogeologyNote:
          meta?.hydrogeologyNote ??
          `${d.waterRating}. Aquifer depth: ${d.aquiferDepth} (${d.aquiferSource || 'Regional hydrogeology survey pending field verification'}).`,
        dccmsSourceRef: `${d.rainfallSource || 'DCCMS Regional Estimate'} · ${d.soilSource || 'FAO HWSD v2.0'}`,
      },
    ];
  })
);

export interface CitationSource {
  id: string;
  category: 'Climate & Met' | 'Soil & Agriculture' | 'Water & Hydrogeology' | 'Land & Legal' | 'Inspired Counsel & Scripture';
  title: string;
  institution: string;
  description: string;
  verifiableURLOrDoc: string;
  directUrl?: string;
}

export const DATA_SOURCES_AND_CITATIONS: CitationSource[] = [
  {
    id: 'cit-dccms',
    category: 'Climate & Met',
    title: 'Malawi Annual Agro-Meteorological Normals & District Rainfall Statistics (1991-2024)',
    institution: 'Department of Climate Change and Meteorological Services (DCCMS), Ministry of Natural Resources & Climate Change, Government of Malawi',
    description: 'Official rainfall volume ranges, temperature extremes, seasonal onset/cessation dates, and regional Chiperoni mist frequencies across all 28 Malawi districts.',
    verifiableURLOrDoc: 'DCCMS Agro-Met Bulletin Series, Lilongwe, Malawi (www.metmalawi.gov.mw)',
    directUrl: 'https://www.metmalawi.gov.mw/'
  },
  {
    id: 'cit-openmeteo-ecmwf',
    category: 'Climate & Met',
    title: 'ECMWF IFS Land Surface Model & FAO-56 Penman-Monteith Evapotranspiration Telemetry',
    institution: 'Copernicus Climate Change Service (ERA5-Land) & Open-Meteo Scientific API',
    description: 'Real-time satellite and numerical weather prediction telemetry providing root-zone volumetric soil moisture (0–9cm), soil temperature, solar shortwave radiation (W/m²), and daily ET₀.',
    verifiableURLOrDoc: 'Open-Meteo Forecast & Elevation API (api.open-meteo.com)',
    directUrl: 'https://open-meteo.com/en/docs'
  },
  {
    id: 'cit-moa-soil',
    category: 'Soil & Agriculture',
    title: 'Harmonized World Soil Database (HWSD v2.0) & Malawi Land Resources Survey',
    institution: 'Food and Agriculture Organization of the United Nations (FAO), ISRIC World Soil Information & LUANAR',
    description: 'Pedological mapping detailing Eutric Nitisols in Dedza/Ntcheu, Humic Ferralsols in Mulanje/Thyolo, and Orthic Ferralsols in Kasungu plateau, including pH and CEC profiles.',
    verifiableURLOrDoc: 'FAO Land & Water Profile for Malawi & MoAIWD Land Resources Bulletin No. 4',
    directUrl: 'https://www.fao.org/countryprofiles/index/en/?iso3=MWI'
  },
  {
    id: 'cit-wateraid-hydro',
    category: 'Water & Hydrogeology',
    title: 'AQUASTAT Malawi Water Resources & Weathered Basement Aquifer Atlas',
    institution: 'FAO AQUASTAT Global Information System on Water and Agriculture & Ministry of Water Malawi',
    description: 'Drill depths, borehole yields, and water table depths for crystalline basement aquifers (25–45m in Central Plateau) vs. unconsolidated alluvial aquifers (5–20m along Lakeshore).',
    verifiableURLOrDoc: 'FAO AQUASTAT Country Profile: Malawi & Hydrogeological Survey Paper #12',
    directUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/MWI'
  },
  {
    id: 'cit-land-act',
    category: 'Land & Legal',
    title: 'Customary Land Act (Act No. 19 of 2016) & Customary Land Regulations (2018)',
    institution: 'Parliament of Malawi & Malawi Legal Information Institute (MalawiLII)',
    description: 'Statutory framework governing Traditional Land Management Areas (TLMAs), Customary Estate registration, Traditional Authority (TA) consent, and dispute resolution.',
    verifiableURLOrDoc: 'Malawi Parliament Act No. 19 of 2016 (MalawiLII Official Statutory Archive)',
    directUrl: 'https://malawilii.org/akn/mw/act/2016/19/eng@2016-09-01'
  },
  {
    id: 'cit-egw-cl',
    category: 'Inspired Counsel & Scripture',
    title: 'Ellen G. White Estate Complete Published Writings & Archival Manuscripts',
    institution: 'Ellen G. White Estate, Inc. (Silver Spring, Maryland, USA)',
    description: 'Verbatim primary source texts including Country Living (1946), The Ministry of Healing (1905), Education (1903), Testimonies for the Church (Vols. 1–9), and Selected Messages.',
    verifiableURLOrDoc: 'Official EGW Writings Digital Archive (m.egwwritings.org)',
    directUrl: 'https://m.egwwritings.org/en/folders/2'
  }
];

export const PRACTICAL_GUIDES: Guide[] = [
  {
    id: 'where-1',
    title: 'Soil & Water Evaluation',
    category: 'Where',
    icon: 'Droplets',
    content: 'Verify year-round gravity spring flow in October (peak dry season), check basement aquifer depths (15–45m), and perform a 48-hour mason jar sedimentation test to measure sand/silt/clay fractions.'
  },
  {
    id: 'what-1',
    title: 'Essential Hand Tools',
    category: 'What',
    icon: 'Hammer',
    content: 'A forged 5-tine broadfork, heavy Malawian hoe (khasu), A-frame contour level, indirect solar dehydrator, and manual grain mill are the foundations of small-scale country independence.'
  },
  {
    id: 'how-1',
    title: 'Beginning the Garden',
    category: 'How',
    icon: 'Sprout',
    content: 'Establish permanent no-till beds covered with 15cm of dry grass mulch, excavate 90cm deep Ellen G. White tree pits with bottom stone drainage, and intercrop heirloom grains with nitrogen-fixing legumes.'
  }
];
