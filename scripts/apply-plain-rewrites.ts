import fs from 'fs';
import path from 'path';

// Plain English rewrites for BASE_HOMESTEAD_SKILLS
export const PLAIN_SKILLS_DATA: Record<string, {
  summary: string;
  description: string;
  steps: string[];
  commonMistakes: string[];
  inspiredCounsel?: string;
}> = {
  'compost-making': {
    summary: 'Build hot compost piles with brown dry leaves and green manure. The pile heats up to kill weeds and makes rich black soil in six to eight weeks.',
    description: 'Hot composting uses tiny helpful microbes to turn plant waste into rich garden soil. Layer dry brown stalks with fresh green manure and kitchen scraps. Keep the pile damp like a squeezed sponge. The heap heats up within three days to kill pest eggs and weed seeds.',
    steps: [
      'Choose a shaded spot at least five feet wide. Loosen the ground with a garden fork.',
      'Lay a base of dry twigs and maize cobs for airflow.',
      'Add a six-inch brown layer of dry grass and chopped straw.',
      'Add a four-inch green layer of fresh animal manure and kitchen scraps.',
      'Dust lightly with wood ash and charcoal. Sprinkle water until damp.',
      'Repeat brown and green layers up to five feet high.',
      'Push a dry stick into the center to check the heat each day.',
      'Turn the pile inside out on Day 4, Day 10, and Day 17 to give microbes fresh air.',
      'Let the compost rest for four weeks until it smells sweet like forest soil.'
    ],
    commonMistakes: [
      'Piles smaller than three feet across lose heat too fast and stay cold.',
      'Too much water makes the pile soggy and smelly.',
      'Too much wood ash turns the compost bitter and drives away nitrogen.'
    ],
    inspiredCounsel: '"In the cultivation of the soil the thoughtful worker will find unexpected treasures. The earth must be given back that which is taken from it." — Education, p. 211'
  },

  'offgrid-first-aid': {
    summary: 'Learn essential emergency care for country homes. Treat broken bones, snakebites, burns, and swallowed poisons with simple natural supplies.',
    description: 'Outpost homes often sit far away from hospitals and clinics. Knowing fast first aid saves lives. Learn how to splint broken bones with bamboo and wrap snakebites safely. Cool burns with water and raw honey. Use food-grade charcoal for accidental poisons.',
    steps: [
      'Broken Bones: Keep the injured limb still. Tie straight wooden or bamboo sticks on both sides with soft cloth. Never force bones back into place.',
      'Snakebite Care: Keep the person calm and resting flat. Wrap a wide cloth bandage firmly from fingers or toes up toward the body. Splint the limb still. Never cut the skin or use tight tourniquets.',
      'Spitting Cobra Venom: Rinse the eyes right away with clean boiled water or fresh milk for fifteen minutes.',
      'Burns: Pour cool clean water over burns for fifteen minutes. Spread raw unheated honey over the skin to prevent infection. Cover loosely with clean cloth.',
      'Swallowed Poison: Stir three spoonfuls of fine wood charcoal into drinking water right away. Charcoal catches poisons in the stomach before they enter blood.',
      'Shock and Weakness: Lay the person down and raise their feet one foot high. Keep them warm with blankets and give sips of clean water with a pinch of salt and sugar.'
    ],
    commonMistakes: [
      'Using tight rubber bands or ropes for snakebites, which cuts off blood and kills healthy muscle.',
      'Putting butter, flour, or ice on fresh burns, which traps heat and causes infection.',
      'Giving charcoal powder to an unconscious person who cannot swallow safely.'
    ]
  },

  'fruit-tree-cultivation': {
    summary: 'Plant long-lived fruit trees in deep, rich planting pits. Feed the roots with compost, biochar, and mulch to survive dry winter months.',
    description: 'Grow healthy fruit trees that bear sweet fruit for decades. Dig large three-foot planting holes. Fill the bottom with compost, crushed charcoal, and rocks to catch water. Mulch the surface heavily so roots stay cool through hot dry months.',
    steps: [
      'Dig a planting pit three feet wide and three feet deep during the dry season.',
      'Keep the dark topsoil in one pile and subsoil in another pile.',
      'Place stones and crushed charcoal in the bottom for drainage and moisture sponge.',
      'Mix the topsoil with cured compost and a cup of wood ash.',
      'Place the young fruit sapling upright so the stem base sits level with the ground.',
      'Fill around the roots with the rich soil mix and press gently with your hands.',
      'Water thoroughly with two buckets of clean water to settle the soil.',
      'Build a low earth ring around the tree to catch seasonal rainwater.',
      'Cover the ground with four inches of dry grass mulch, keeping mulch two inches away from the tree bark.'
    ],
    commonMistakes: [
      'Digging small shallow holes that force tree roots into hard subsoil.',
      'Piling wet mulch directly against the tree trunk, which invites termites and rot.',
      'Planting trees below the original ground level, causing the stem collar to rot.'
    ]
  },

  'vermiculture-worm-farming': {
    summary: 'Breed earthworms in shaded wooden boxes. Worms turn kitchen peels and manure into the richest natural plant food for your garden.',
    description: 'Earthworms are tireless garden helpers. Keep them in cool wooden or clay boxes fed with vegetable peels and dry grass. Worm droppings make gentle, weed-free plant food that helps seedlings grow strong roots.',
    steps: [
      'Build a shaded wooden box or use clay pots with small drainage holes in the bottom.',
      'Line the bottom with damp shredded cardboard, dry leaves, and aged manure.',
      'Add earthworms gently onto the damp bedding.',
      'Bury kitchen vegetable peels and fruit rinds two inches deep under the leaves.',
      'Sprinkle a handful of crushed eggshells once a month to keep the bedding sweet.',
      'Keep the bedding damp like a squeezed cloth. Protect the box from hot sun and ants.',
      'Collect worm droppings from the bottom after two months to feed your garden beds.',
      'Make worm tea: soak two cups of worm castings in a bucket of water for one day. Water your vegetable leaves with this liquid.'
    ],
    commonMistakes: [
      'Letting worm bins dry out in the hot afternoon sun.',
      'Feeding onions, hot peppers, oily foods, or meat scraps that attract flies and sour the box.',
      'Flooding the bin with too much water so worms drown in the bottom tray.'
    ]
  },

  'water-conservation-retention': {
    summary: 'Catch every drop of rain using contour swales, deep mulch, and vetiver grass. Store water deep in the ground to keep crops green all year.',
    description: 'In dry regions, heavy seasonal rain often washes away rich topsoil. Dig level ditch swales across hill slopes to slow down running water. The water sinks deep into underground sponges. Downhill crops and fruit trees stay green through dry winter months.',
    steps: [
      'Use an A-frame level to mark exact level lines across your sloping ground.',
      'Dig a flat-bottomed trench two feet wide and one foot deep along the line.',
      'Pile the excavated earth into a rounded mound on the downhill side of the ditch.',
      'Plant thick vetiver grass along the downhill mound to hold the soil tightly.',
      'Fill the ditch with coarse wood chips and dry maize stalks to prevent mosquito pools.',
      'Cut a level stone overflow sill at each end to safely guide flood water away.',
      'Plant fruit trees and bananas along the downhill side of the swale mound.'
    ],
    commonMistakes: [
      'Digging swales on a slope instead of a true level contour, which causes water to pool and break the mound.',
      'Leaving open stagnant water that breeds mosquitoes instead of filling ditches with mulch.',
      'Building steep bare dirt mounds without planting grass roots to anchor the soil.'
    ]
  },

  'drought-resistant-crops': {
    summary: 'Grow hardy grains and legumes that thrive through dry spells. Plant cassava, sorghum, pigeon peas, and cowpeas for dependable food security.',
    description: 'Dry spells often threaten shallow-rooted hybrid crops. Protect your family by growing drought-hardy traditional crops. Cassava, sorghum, pearl millet, cowpeas, and pigeon peas reach deep moisture in the soil. They yield nutritious food even in low-rainfall years.',
    steps: [
      'Select open-pollinated seeds of sorghum, pearl millet, pigeon peas, and cowpeas.',
      'Take healthy, mature cassava stems and cut them into nine-inch planting stakes.',
      'Plant seeds right after the first soaking rain in November.',
      'Intercrop tall sorghum with pigeon peas so the legumes fix nitrogen in the ground.',
      'Cover bare soil between crop rows with dry grass mulch to stop moisture evaporation.',
      'Weed beds twice while plants are small so weeds do not steal soil water.',
      'Harvest sorghum grains when heads dry golden brown. Store dry seeds in airtight bags.'
    ],
    commonMistakes: [
      'Relying solely on thirsty hybrid maize that wilts during two-week dry spells.',
      'Planting upside down cassava cuttings that sprout poorly.',
      'Leaving bare soil exposed to baking sun without mulch covers.'
    ]
  },

  'herbs-cultivation-medicinal': {
    summary: 'Grow simple healing herbs around your homestead. Cultivate fever grass, garlic, ginger, rosemary, and comfrey for daily family health.',
    description: 'God gave healing herbs to comfort and restore the sick. Plant a fragrant apothecary garden near your kitchen door. Grow lemongrass for fevers, ginger for digestion, garlic for infections, and comfrey for sprains. Harvest leaves on dry sunny mornings.',
    steps: [
      'Prepare a sunny raised garden bed with plenty of finished compost.',
      'Plant root divisions of lemongrass and mint six inches apart in damp soil.',
      'Bury plump ginger and turmeric root rhizomes two inches deep under rich leaf mulch.',
      'Plant garlic cloves with the pointed end facing upward in loose, sandy soil.',
      'Prune comfrey leaves every month to make mineral-rich mulch for vegetables.',
      'Pick fresh herb leaves in the morning after dew dries for strongest fragrance.',
      'Hang herbs in loose bundles inside a warm, shaded, well-ventilated room to dry.',
      'Store dried herb leaves in clean, dry glass jars away from direct sunlight.'
    ],
    commonMistakes: [
      'Drying herbs in bright direct sunshine, which bleaches colors and destroys healing oils.',
      'Storing herbs before they are fully dry, causing mold inside jars.',
      'Planting invasive mint in open garden beds where it crowds out vegetables.'
    ]
  },

  'food-preservation-techniques': {
    summary: 'Preserve your seasonal harvest without chemicals. Use solar drying, sealed airtight bags, and clay cold pots to store food all year.',
    description: 'Abundant harvests in April can easily spoil if stored poorly. Learn simple, reliable ways to keep food fresh for months. Dry fruit and vegetables in clean solar boxes. Store dry grain in airtight bags where insects cannot breathe. Keep greens cool in clay pots.',
    steps: [
      'Solar Fruit Drying: Slice ripe mangoes and sweet potatoes into thin strips. Place on clean mesh screens inside a solar dryer for two sunny days.',
      'Grain Storage: Check that maize and beans are completely dry. Drop kernels on a flat rock: dry grain cracks with a sharp click.',
      'Airtight Bag Packing: Pour clean dry grain into triple-layer plastic bags. Tie each layer tightly with twine so no air enters.',
      'Vegetable Salt Curing: Shred cabbage and toss with two percent salt. Pack tightly into clean earthenware crocks until juice covers the shreds.',
      'Root Cellar Storage: Store whole sweet potatoes and pumpkins on wooden slatted shelves in a cool, dark room.'
    ],
    commonMistakes: [
      'Packing grain before it is fully dry, which causes mold and grain heating.',
      'Puncturing the plastic inner liners of airtight storage bags with sharp sticks.',
      'Placing stored grain directly on cold concrete floors where dampness rises.'
    ]
  },

  'outpost-technology-machinery': {
    summary: 'Operate and maintain essential off-grid tools. Keep solar pumps, diesel walking tractors, and hand tools running smoothly without power lines.',
    description: 'Country living relies on durable, reliable equipment. Master simple maintenance for solar water pumps, two-wheel garden tractors, and metal hand tools. Regular cleaning, oil changes, and blade sharpening keep your homestead working smoothly.',
    steps: [
      'Solar Pump Care: Inspect the water intake screen every month. Clear away river silt and weeds so the motor pumps freely.',
      'Electrical Connections: Check that all battery terminals and solar wire connections stay tight and clean without white corrosion.',
      'Walking Tractor Maintenance: Check engine oil levels before every work day. Change engine oil every fifty operating hours.',
      'Air Cleaner Service: Clean the air filter sponge with kerosene and dry thoroughly. Add a few drops of clean oil.',
      'Hand Tool Care: Sharpen hoes, axes, and machetes with a flat mill file at a thirty-degree angle. Rub oiled rags on metal blades after work.'
    ],
    commonMistakes: [
      'Letting water pumps run dry when well levels drop, which burns out pump seals.',
      'Running small diesel engines with dirty oil or clogged fuel filters.',
      'Leaving iron hoes and axes outside in the rain to rust.'
    ]
  },

  'insect-handling-pest-control': {
    summary: 'Manage beneficial bees and deter crop pests naturally. Use top-bar beehives, companion planting, and natural plant sprays.',
    description: 'Healthy farms welcome beneficial insects while managing pests gently. Build top-bar beehives to pollinate fruit trees and harvest pure honey. Make organic sprays from neem leaves and garlic to control aphids and caterpillars without chemical poisons.',
    steps: [
      'Top-Bar Beekeeping: Build simple wooden hives with thirty-two millimeter wide top bars. Hang hives six feet high in shady trees.',
      'Baiting Hives: Rub melted beeswax and lemongrass oil inside clean hives to attract wild bee swarms in September.',
      'Ant Barriers: Wrap grease bands or engine oil rags around hanging hive wires so ants cannot reach the bees.',
      'Neem Pest Spray: Pound fresh neem leaves and soak overnight in a bucket of water. Strain liquid and spray on crops to repel chewing caterpillars.',
      'Companion Planting: Grow fragrant marigolds and basil alongside tomatoes to keep away pest flies and soil worms.'
    ],
    commonMistakes: [
      'Using synthetic pesticide sprays near flowering trees, which kills honeybees and beneficial predators.',
      'Using hot, harsh smoke when opening beehives, which burns and irritates bees.',
      'Harvesting brood combs containing baby bees instead of only capped honeycombs.'
    ]
  },

  'crop-disease-handling': {
    summary: 'Diagnose and control plant diseases using clean seed, weekly checks, crop rotation, and organic sprays.',
    description: 'Plant diseases can quickly ruin your potatoes, tomatoes, and cassava. Check your plants every week. Remove sick plants early and rotate crops.',
    steps: [
      'Weekly Plant Checks: Inspect leaves for dark spots or yellow patterns. Look on the underside of leaves for white mold.',
      'Bacterial Wilt Water Test: Cut a short stem from a wilting tomato plant. Place it in a clear glass of water for two minutes: cloudy white threads flowing down mean bacterial wilt.',
      'Organic Bordeaux Spray: Mix equal small parts of copper sulfate and hydrated lime in clean water. Spray tomato leaves in damp weather to prevent blight.',
      'Milk Spray for Mildew: Mix one cup of fresh milk with nine cups of clean water. Spray on pumpkin and squash leaves in bright sun to stop white powdery mildew.',
      'Remove Sick Plants: Pull up plants with virus symptoms or bacterial wilt. Burn or bury them deeply far away from garden beds.',
      'Crop Rotation: Never plant tomatoes or potatoes in the same bed two years in a row. Follow them with beans, peas, or cabbage.'
    ],
    commonMistakes: [
      'Throwing diseased potato and tomato vines into compost heaps where disease spreads to other beds.',
      'Spraying plants in the hot midday sun, which scorches leaves.',
      'Watering garden leaves late in the evening so leaves stay wet all night.'
    ]
  },

  'soil-science-indepth': {
    summary: 'Understand your soil horizons, texture, and living earth. Use jar tests, lime, and compost to build fertile living ground.',
    description: 'Healthy soil is alive with millions of helpful creatures. Learn to read your soil by sight and feel. Check if your ground is sand, silt, or rich clay. Add compost, crushed charcoal, and agricultural lime so plants receive steady nutrition.',
    steps: [
      'Jar Texture Test: Fill a clear glass jar one-third with soil. Add water, shake hard for one minute, and set on a flat table. Sand settles in one minute, silt in two hours, and clay in two days.',
      'Hand Ribbon Test: Moisten a handful of soil and knead into a ball. Squeeze it out between your thumb and forefinger to make a flat ribbon. Long smooth ribbons mean heavy clay.',
      'Soil Acidity Check: Test soil with simple pH paper or test kits. If soil tests too acidic, scatter two handfuls of agricultural limestone per square yard.',
      'Wood Ash Feeding: Sprinkle small amounts of sifted wood ash across garden beds to give potassium, but never use large piles.',
      'Compost and Charcoal: Work three inches of finished compost and biochar into the top four inches of soil to feed living earthworms.'
    ],
    commonMistakes: [
      'Tilling wet clay soil, which packs it into hard concrete-like lumps.',
      'Adding large buckets of wood ash in one spot, which locks up plant minerals.',
      'Leaving fertile soil bare and unmulched in hot sun and driving rain.'
    ]
  },

  'seed-saving-heirloom': {
    summary: 'Save your own vegetable and grain seeds each harvest. Select strong plants, dry seeds fully, and store in cool airtight glass jars.',
    description: 'Saving seeds gives your homestead true independence. Keep seeds only from healthy, productive parent plants. Clean seeds carefully and dry them in the shade. Store seeds in airtight glass jars with dry wood ash so they sprout vigorously next spring.',
    steps: [
      'Select Seeds: Tag the strongest, healthiest plants in your garden before harvest.',
      'Harvest Ripe Seeds: Let seed pods dry brown on the plant before picking.',
      'Dry in the Shade: Spread cleaned seeds on cloth screens in a warm, breezy room for one week.',
      'Test Dryness: Press large seeds with a thumbnail. They should feel rock hard without leaving an indent.',
      'Airtight Storage: Pour dry seeds into clean glass jars with a spoonful of fine wood ash or silica pack.',
      'Seal and Label: Screw jar lids tight. Write the plant name, variety, and harvest date on a paper label.',
      'Store Cool: Keep seed jars in a dark, cool cupboard or underground storage box.'
    ],
    commonMistakes: [
      'Saving seeds from commercial hybrid plants, which grow unevenly and produce poor yields.',
      'Putting seeds into jars before they are fully dry, causing mold to kill the seed germ.',
      'Storing seeds in hot tin sheds where heat weakens germination rates.'
    ]
  },

  'gravity-water-filtration': {
    summary: 'Purify drinking water using gravity, sand, and gravel. Build a bio-sand filter that removes dirt and germs without electricity.',
    description: 'Clean drinking water is vital for family health. Build a slow bio-sand filter in a clean drum. Water trickles down through layers of fine sand and gravel. Helpful microbes on top destroy harmful germs, giving clear safe water every day.',
    steps: [
      'Wash a clean food-grade plastic or concrete barrel thoroughly.',
      'Place a perforated plastic pipe at the bottom connected to an outside outlet tap.',
      'Add two inches of clean coarse gravel over the bottom pipe.',
      'Add two inches of clean coarse sand over the gravel layer.',
      'Pour in twenty inches of fine washed silica sand, keeping the surface flat and level.',
      'Place a perforated diffuser plate or plastic lid two inches above the sand to shield the bed.',
      'Pour raw water gently into the top every day. Keep two inches of standing water over the sand bed.',
      'Let the top biological layer mature for two weeks before using filtered water for drinking.'
    ],
    commonMistakes: [
      'Disturbing or scraping the top sand layer where helpful microbes live.',
      'Letting the filter dry out completely, which kills the living filter layer.',
      'Pouring water directly onto bare sand without a diffuser plate.'
    ]
  },

  'solar-food-dehydration': {
    summary: 'Dry fruits, vegetables, and greens using warm sunshine and air. Preserve sweet mangoes, bananas, and tomatoes for the dry season.',
    description: 'Harness the heat of the sun to preserve surplus garden harvests. Build a simple solar dryer with black metal, glass, and wood. Warm air rises through slatted trays, drying sliced food gently in two sunny days without flies or dust.',
    steps: [
      'Build a wooden box with a black painted bottom and a clear glass or plastic lid.',
      'Cut air intake vents at the bottom front and exhaust vents at the top back.',
      'Wash and slice fruits or vegetables into uniform quarter-inch slices.',
      'Spread food slices in a single layer on stainless or nylon mesh drying trays.',
      'Place the dryer in full sunshine facing the midday sun.',
      'Check the internal air temperature: keep it between forty-five and sixty degrees Celsius.',
      'Remove dried fruit when it feels leathery and bends without sticky wetness.',
      'Pack dried food into airtight jars or clean bags and store in a dark pantry.'
    ],
    commonMistakes: [
      'Slicing food in uneven thick chunks that dry too slowly and turn sour.',
      'Blocking ventilation vents, which traps humid air and cooks food instead of drying it.',
      'Leaving dried food outside overnight where cool evening mist softens it.'
    ]
  },

  'solar-pv-lithium-bank': {
    summary: 'Set up an off-grid solar power system. Power your water pump, lights, and refrigerator using rooftop solar panels and batteries.',
    description: 'Solar electricity brings clean lighting and power to rural outposts. Connect solar panels on your roof to a battery charger and battery bank. An inverter turns battery power into normal wall current for lights, pumps, and grain mills.',
    steps: [
      'List Your Daily Power: Add up the watt-hours needed for LED lights, water pumps, and electronics.',
      'Mount Solar Panels: Bolt panels securely to your roof facing north at a fifteen-degree tilt.',
      'Wire the Charge Controller: Connect the solar charger to your battery bank first with a proper fuse.',
      'Connect the Solar Panels: Run heavy copper cables from rooftop panels down to the solar charge controller.',
      'Install the Inverter: Mount the inverter close to batteries using thick short cables.',
      'Add Circuit Breakers: Install DC safety breakers on battery wires and AC breakers on house wiring.',
      'Ground the System: Drive an eight-foot copper rod into damp soil and connect metal frames with ground wire.'
    ],
    commonMistakes: [
      'Connecting solar panels to the charger before connecting the battery bank.',
      'Using thin undersized wires that overheat and drop electrical voltage.',
      'Draining batteries completely flat, which ruins battery life.'
    ]
  },

  'zeer-pot-evaporative-cooling': {
    summary: 'Keep vegetables fresh without electricity using clay pots. Evaporating water in damp sand cools the inner pot by ten degrees.',
    description: 'A Zeer pot is a natural refrigerator made from two unglazed clay pots. Place a smaller clay pot inside a larger pot and fill the gap with sand. When you wet the sand, evaporating water draws away heat, keeping tomatoes, leafy greens, and fruit cool and crisp.',
    steps: [
      'Find two porous unglazed clay pots, with one pot three inches smaller than the other.',
      'Fill the bottom of the larger pot with three inches of clean river sand.',
      'Place the smaller clay pot inside on top of the sand base.',
      'Fill the ring gap between the two pots with clean sand up to the top rim.',
      'Pour clean water slowly onto the sand until it is completely soaked.',
      'Place fresh vegetables and fruits inside the dry inner clay pot.',
      'Cover the top with a damp cotton cloth or clean jute sack.',
      'Set the pot in a breezy, shaded hallway with good airflow.',
      'Pour water onto the sand twice a day: once in the morning and once in the evening.'
    ],
    commonMistakes: [
      'Using glazed or painted clay pots that block water evaporation.',
      'Placing the pot in direct hot sunshine or inside a closed room without moving air.',
      'Letting the sand dry out during hot windy afternoons.'
    ]
  },

  'small-livestock-poultry': {
    summary: 'Raise healthy free-range chickens and small livestock. Build raised coops, feed natural grain rations, and use natural parasite care.',
    description: 'Chickens and small livestock provide valuable eggs, meat, and rich manure for your garden. House poultry in raised bamboo coops with good airflow to stay healthy. Feed them grain bran, sunflower seeds, and greens. Prevent parasites with wood ash dust baths.',
    steps: [
      'Build a raised poultry coop three feet above the ground with slatted bamboo floors for easy cleaning.',
      'Set up a dry dust bath box filled with clean wood ash and sand so birds clean off lice.',
      'Provide clean drinking water daily with two crushed cloves of fresh garlic to repel worms.',
      'Mix wholesome poultry feed using maize bran, crushed pigeon peas, sunflower seeds, and green leaves.',
      'Vaccinate young chicks against Newcastle disease at three weeks and three months.',
      'Lock coop doors securely every evening to protect birds from nocturnal predators.',
      'Collect poultry manure weekly and compost it thoroughly for one month before garden use.'
    ],
    commonMistakes: [
      'Keeping chickens in dark, crowded, damp coops where respiratory disease spreads quickly.',
      'Putting fresh hot poultry manure directly on vegetable beds, which burns tender roots.',
      'Skipping Newcastle vaccination during the windy dry season.'
    ]
  },

  'solar-dambo-irrigation': {
    summary: 'Pump shallow wetland groundwater with solar power. Water dry-season vegetable beds and fruit trees without costly fuel.',
    description: 'Valley dambos hold abundant water close to the surface all year. Dig a shallow brick-lined well in the wetland edge. Submerge a small direct-drive solar pump powered by two solar panels. Pump cool clean water directly to garden beds and storage tanks.',
    steps: [
      'Dig a shallow well ten to twenty feet deep in the dry season on the wetland edge.',
      'Line the well with open brick rings or concrete rings to keep sand from caving in.',
      'Suspend a submersible solar pump three feet above the well bottom with safety rope.',
      'Mount two solar panels on a pole near the well facing north.',
      'Connect the solar panels directly to the pump controller with waterproof cables.',
      'Run thick plastic pipe from the pump uphill to an elevated header tank.',
      'Distribute water to vegetable garden beds through gravity-fed drip pipes or trenches.'
    ],
    commonMistakes: [
      'Resting the water pump directly on the muddy well floor where sand clogs pump gears.',
      'Using thin wires over long distances from solar panels, causing voltage drops.',
      'Pumping dirty silt water into drip lines without an intake filter screen.'
    ]
  },

  'sda-true-education-curriculum': {
    summary: 'Train children with a balanced rhythm of Bible study, academic skills, manual trades, and garden care on the land.',
    description: 'True education develops the physical, mental, and spiritual powers together. Children learn Bible truths and practical academics in the morning. In the afternoon, they work with their hands in gardens, carpentry workshops, and sewing rooms.',
    steps: [
      'Morning Study (8:00–11:30): Teach Scripture, practical arithmetic, reading, physiology, and natural science.',
      'Student Garden Plots (11:30–12:30): Give each child a personal raised bed to plant, weed, and harvest vegetables.',
      'Noon Rest and Meal (12:30–13:30): Share a wholesome plant-based meal and rest in the shade.',
      'Vocational Trades (13:30–16:30): Teach practical trades including carpentry, earth brick building, sewing, and first aid.',
      'Family Worship and Nature Walks: Conclude the day with songs of praise, prayer, and lessons from nature.'
    ],
    commonMistakes: [
      'Keeping children sitting indoors over books all day without vigorous physical work in open air.',
      'Treating garden and workshop labor as drudgery or punishment instead of an honorable blessing.',
      'Teaching theory without allowing children to build real things with their hands.'
    ],
    inspiredCounsel: '"Manual training is worthy of far more attention than it has received... It trains the hands and makes the mind clear and strong." — Education, p. 218'
  },

  'wholesome-breadmaking-grain-milling': {
    summary: 'Mill whole grains and bake wholesome loaves. Make sweet non-sour bread and crisp double-baked zwieback in a simple cob oven.',
    description: 'Good bread is the true staff of life. Grind whole wheat, sorghum, or millet fresh before baking so nutrients are preserved. Ferment dough gently with sweet wild yeast without baking soda. Bake in a warm clay oven, and toast leftover bread into crisp, digestible zwieback.',
    steps: [
      'Mill Whole Grains: Grind whole wheat berries or sorghum fine on a stone or cast-iron mill.',
      'Mix Dough: Combine whole flour, warm water, sweet yeast starter, and a pinch of salt.',
      'Knead Dough: Knead vigorously on a clean table for fifteen minutes until smooth and elastic.',
      'Gentle Rise: Place dough in a warm bowl covered with a damp cloth for two hours until doubled.',
      'Shape Loaves: Form into small loaves and place in greased tins for a final thirty-minute rise.',
      'Bake in Clay Oven: Slide loaves into a hot wood-fired clay oven and bake until crusts ring hollow when tapped.',
      'Make Zwieback: Slice cool bread thin and toast in a slow warm oven until crisp and golden brown.'
    ],
    commonMistakes: [
      'Using harmful chemical baking powders or saleratus that irritate delicate stomach linings.',
      'Eating fresh, hot, heavy bread straight from the oven before it cools.',
      'Letting dough over-ferment until it turns sour and acidic.'
    ],
    inspiredCounsel: '"Bread should be light and sweet. Not the least taint of sourness should be tolerated." — Ministry of Healing, p. 301'
  },

  'hydrotherapy-charcoal-poultice-remedies': {
    summary: 'Apply hot and cold water treatments and charcoal poultices to relieve pain, draw inflammation, and stimulate circulation.',
    description: 'Simple natural remedies work with the body to restore health. Use hot foot baths to draw congestion away from the head and chest. Apply warm moist cloths followed by brief cold wipes to relieve soreness. Use charcoal poultices on wounds and insect bites.',
    steps: [
      'Hot Foot Bath: Place feet in warm water (40°C). Gradually add hot water up to 43°C. Keep a cool wet cloth on the forehead. After twenty minutes, pour cool water over the feet and dry thoroughly.',
      'Hot and Cold Fomentations: Apply a steaming moist cloth over sore joints or chest for three minutes. Follow with a brisk thirty-second wipe with a cold cloth. Repeat three times, always finishing with cold.',
      'Charcoal Poultice: Stir three spoonfuls of fine wood charcoal and ground flaxseed into warm water to make a thick paste.',
      'Wrap the Poultice: Spread paste on clean cloth, fold edges inward, and place over inflammation or insect bites.',
      'Rest and Warmth: Tuck the patient into bed with warm blankets and encourage plenty of clean drinking water.'
    ],
    commonMistakes: [
      'Leaving a cold wet cloth on the skin without drying, which chills the patient.',
      'Using boiling water directly against skin without protecting towels underneath.',
      'Letting charcoal paste dry into a hard crust instead of keeping it moist under a wrap.'
    ],
    inspiredCounsel: '"There are many ways of applying water to relieve pain and check disease. All should become intelligent in its use in simple home treatments." — Ministry of Healing, p. 237'
  },

  'plant-protein-nut-milks-oil-pressing': {
    summary: 'Make rich plant milks, tofu, and cold-pressed oils. Process soybeans, groundnuts, and sunflower seeds for wholesome family nutrition.',
    description: 'Wholesome plant foods provide abundant protein, healthy fats, and minerals without animal diseases. Make fresh soy and groundnut milk for children. Press golden oil from home-grown sunflower seeds, and sprout beans for fresh winter greens.',
    steps: [
      'Soy and Nut Milk: Soak dry soybeans or groundnuts in clean water for eight hours. Grind fine with water in a clean mortar. Boil gently for twenty minutes and strain through cloth.',
      'Fresh Tofu: While hot soy milk simmers at eighty degrees, stir in fresh lemon juice. Watch white curds form. Scoop curds into a cloth-lined wooden press box and weigh down with a stone for thirty minutes.',
      'Cold Oil Pressing: Sun-dry clean sunflower seeds until crisp. Feed seeds into a hand-lever press to squeeze out pure golden oil.',
      'Clarify Oil: Let raw oil sit in tall glass jars for two days until sediment settles at the bottom, then pour off clear oil.',
      'Sprouting Beans: Soak lentils or mung beans in water overnight. Rinse twice a day in a shaded jar until fresh green sprouts appear.'
    ],
    commonMistakes: [
      'Under-cooking raw soybean milk, which leaves an earthy taste and causes stomach upset.',
      'Using rancid, moldy, or damp oilseeds for pressing oil.',
      'Eating rich nut preparations in excessive quantities at single meals.'
    ],
    inspiredCounsel: '"Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator." — Ministry of Healing, p. 296'
  },

  'wood-ash-soap-natural-fibers-tailoring': {
    summary: 'Make pure homestead soap from wood ash and pressed oils. Sew modest, durable work garments using a manual treadle sewing machine.',
    description: 'Learn valuable household crafts for complete country independence. Leach natural potassium lye from clean wood ash. Cook lye with sunflower oil and beeswax into gentle cleansing soap. Maintain a foot-treadle sewing machine to sew comfortable work clothes.',
    steps: [
      'Leach Ash Lye: Pack cold white hardwood ash into a wooden barrel over straw and pebbles. Pour soft rainwater slowly over the ash. Collect dark amber lye dripping from the bottom.',
      'Test Lye Strength: Float a clean raw egg in the lye. If a coin-sized patch of egg floats above liquid, the lye is strong enough.',
      'Simmer Soap: Pour two liters of lye and one and a half liters of warm sunflower oil into an iron pot. Simmer gently over an outdoor fire, stirring until thick.',
      'Mold and Cure: Pour thick soap into a cloth-lined wooden box. Let firm for two days, cut into bars with wire, and cure on open racks for four weeks.',
      'Treadle Sewing: Clean and oil your foot-treadle sewing machine weekly. Sew comfortable clothes that hang from the shoulders without tight waistbands.'
    ],
    commonMistakes: [
      'Using aluminum pots for cooking soap, which lye dissolves and ruins.',
      'Using fresh un-cured soap that still bites the skin with unreacted lye.',
      'Sewing tight work garments that restrict deep breathing and easy movement.'
    ]
  },

  'sabbath-sanctuary-fireless-thermal-cooking': {
    summary: 'Prepare peacefully for the holy Sabbath. Cook Friday dishes in an insulated Wonderbag and keep your home quiet and restful.',
    description: 'The Sabbath is a joyful sanctuary in time. Complete all cooking, cleaning, and field work on Friday afternoon before sunset. Boil pots of beans and stew for fifteen minutes, then seal them inside an insulated cloth cooker to finish cooking without fire on Sabbath morning.',
    steps: [
      'Friday Morning Prep: Gather vegetables, grind meal, and wash family garments early.',
      'Start the Food: Bring pots of beans, soups, or porridge to a rolling boil on the stove for fifteen minutes.',
      'Insulated Box Cooking: Transfer the boiling pot with lid straight into an insulated Wonderbag or straw box. Close tightly so trapped heat cooks food for six hours.',
      'Friday Afternoon Rest: Tidy living rooms, polish work shoes, and take warm baths before the sun sets.',
      'Sunset Welcome: Gather family at sunset with singing, prayer, and scripture to welcome the sacred Sabbath hours.',
      'Sabbath Meal: Open the insulated cooker on Sabbath noon. The food is warm, tender, and delicious without building a fire.'
    ],
    commonMistakes: [
      'Leaving heavy cooking, washing, and chopping until Sabbath hours.',
      'Opening the insulated cooker repeatedly, which lets valuable cooking heat escape.',
      'Rushing into Sabbath sunset with frantic, unfinished household chores.'
    ],
    inspiredCounsel: '"On Friday let the preparation for the Sabbath be completed... On the Sabbath let no fire be kindled to cook food." — Testimonies, Vol. 6, p. 355'
  }
};

// Also simplify Technical details in SKILL_TECHNICAL_PROTOCOLS where needed
export function applySimplifications() {
  const skillsPath = path.resolve(process.cwd(), 'src/data/skillsAndSeasons.ts');
  let content = fs.readFileSync(skillsPath, 'utf8');

  // For each skill in PLAIN_SKILLS_DATA, update its fields in BASE_HOMESTEAD_SKILLS
  for (const [id, data] of Object.entries(PLAIN_SKILLS_DATA)) {
    // Regex to match the skill block in BASE_HOMESTEAD_SKILLS
    const skillRegex = new RegExp(`id:\\s*'${id}',[\\s\\S]*?seasonalTag:`, 'g');
    const match = content.match(skillRegex);
    if (match) {
      const block = match[0];
      let newBlock = block;

      // Replace summary
      newBlock = newBlock.replace(/summary:\s*'.*?',/, `summary: '${data.summary.replace(/'/g, "\\'")}',`);
      // Replace description
      newBlock = newBlock.replace(/description:\s*'.*?',/, `description: '${data.description.replace(/'/g, "\\'")}',`);

      // Replace steps
      const stepsStr = `steps: [\n      ` + data.steps.map(s => `'${s.replace(/'/g, "\\'")}'`).join(',\n      ') + `\n    ],`;
      newBlock = newBlock.replace(/steps:\s*\[[\s\S]*?\],/, stepsStr);

      // Replace commonMistakes
      const mistakesStr = `commonMistakes: [\n      ` + data.commonMistakes.map(m => `'${m.replace(/'/g, "\\'")}'`).join(',\n      ') + `\n    ],`;
      newBlock = newBlock.replace(/commonMistakes:\s*\[[\s\S]*?\],/, mistakesStr);

      if (data.inspiredCounsel && newBlock.includes('inspiredCounsel:')) {
        newBlock = newBlock.replace(/inspiredCounsel:\s*'.*?',/, `inspiredCounsel: '${data.inspiredCounsel.replace(/'/g, "\\'")}',`);
      }

      content = content.replace(block, newBlock);
    }
  }

  fs.writeFileSync(skillsPath, content, 'utf8');
  console.log("Updated skills in skillsAndSeasons.ts with plain English.");

  // Now simplify protocols in skillsTechnicalProtocols.ts
  const protocolsPath = path.resolve(process.cwd(), 'src/data/skillsTechnicalProtocols.ts');
  let protoContent = fs.readFileSync(protocolsPath, 'utf8');

  // In sda-true-education-curriculum:
  protoContent = protoContent.replace(
    /instructions: 'Rotate older children and youth through 6-week practical trade modules:[\s\S]*?',/,
    `instructions: 'Rotate older youth through practical trade modules. Teach carpentry, earth brick building, tree grafting, sewing, bread baking, and simple first aid.',`
  );
  protoContent = protoContent.replace(
    /instructions: 'Have students weigh harvested produce from their plots, calculate input costs[\s\S]*?',/,
    `instructions: 'Students weigh garden produce and record yields in farm ledgers. They calculate input costs, set aside ten percent tithe, and practice debt-free living.',`
  );
  protoContent = protoContent.replace(
    /rootCause: 'Adults sitting idle or issuing commands[\s\S]*?',/,
    `rootCause: 'Adults giving orders from the shade instead of working joyfully alongside youth and explaining nature laws.',`
  );
  protoContent = protoContent.replace(
    /rootCause: 'Exceeding 3.5 hours of sedentary indoor textbook study[\s\S]*?',/,
    `rootCause: 'Studying indoors too long without fresh air, exercise, and active manual work.',`
  );

  // In wood-ash-soap:
  protoContent = protoContent.replace(
    /instructions: 'Place a wooden or heavy plastic barrel on brick piers over a stainless or glass collection basin[\s\S]*?',/,
    `instructions: 'Place a barrel on bricks over a basin. Put pebbles and straw at the bottom spigot. Pack with white wood ash. Pour soft rainwater slowly over ash until amber lye drips out.',`
  );
  protoContent = protoContent.replace(
    /instructions: 'Pour 2L strained potash lye and 1.5L warm sunflower\/moringa oil[\s\S]*?',/,
    `instructions: 'Pour two liters lye and one and a half liters warm sunflower oil into an iron pot. Simmer gently outdoors for two hours until thick and creamy.',`
  );
  protoContent = protoContent.replace(
    /instructions: 'Clean lint from the shuttle race of the foot-treadle sewing machine[\s\S]*?',/,
    `instructions: 'Clean and oil the foot-treadle sewing machine weekly. Sew family work garments from breathable cotton. Use shoulder straps so clothes do not constrict the waist.',`
  );

  // In hydrotherapy:
  protoContent = protoContent.replace(
    /instructions: 'Pack debarked, unpainted eucalyptus or fruitwood billets tightly into a metal tin with a tight lid pierced by a single 3mm nail hole[\s\S]*?',/,
    `instructions: 'Pack clean wood billets tightly into a metal tin with a small hole in the lid. Heat in a hot fire for one hour until smoke stops. Cool airtight, grind fine, and sift.',`
  );
  protoContent = protoContent.replace(
    /instructions: 'Fold a wet towel inside a dry wool flannel cover and steam or wring from boiling water[\s\S]*?',/,
    `instructions: 'Fold a damp steaming towel inside a wool cover. Place on the chest for three minutes. Wipe skin briskly with a cold cloth for thirty seconds. Repeat three times.',`
  );
  protoContent = protoContent.replace(
    /instructions: 'Stir 3 tbsp pulverized charcoal and 3 tbsp ground flaxseed or fine cassava meal into 150ml boiling water[\s\S]*?',/,
    `instructions: 'Stir three spoonfuls of charcoal and ground flaxseed into warm water to make a thick paste. Spread on cloth, fold edges in, place on the bite, and wrap.',`
  );

  fs.writeFileSync(protocolsPath, protoContent, 'utf8');
  console.log("Updated technical protocols in skillsTechnicalProtocols.ts with plain English.");
}

applySimplifications();
