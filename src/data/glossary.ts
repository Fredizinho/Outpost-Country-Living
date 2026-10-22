/**
 * Outpost Living Glossary of Homestead, Agro-Ecological, and Technical Terms
 * Grade 7–8 reading level definitions with local Chichewa names and examples.
 */

export interface GlossaryTerm {
  term: string;
  plainMeaning: string;
  chichewa: string;
  chichewaReviewed: boolean;
  example: string;
  relatedGuides: string[];
  category?: 'Land & Legal' | 'Soil & Farming' | 'Water & Building' | 'Health & Nutrition';
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  CEC: {
    term: 'CEC',
    plainMeaning: 'Cation Exchange Capacity. A measure of how well soil or biochar holds onto plant nutrients like calcium and potassium.',
    chichewa: 'Mphamvu ya Nthaka Yogwira Chakudya',
    chichewaReviewed: false,
    example: 'Adding compost and biochar raises the CEC of sandy soil so fertilizer does not wash away.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  ORS: {
    term: 'ORS',
    plainMeaning: 'Oral Rehydration Salts. A simple drink of clean water, sugar, and salt that prevents dehydration during fever or diarrhea.',
    chichewa: 'Mchere ndi Shuga Wopulumutsa Madzi m’Thupi',
    chichewaReviewed: false,
    example: 'Mix six teaspoons of sugar and half a teaspoon of salt into one liter of clean water for ORS.',
    relatedGuides: ['/skills'],
    category: 'Health & Nutrition',
  },
  PICS: {
    term: 'PICS',
    plainMeaning: 'Purdue Improved Crop Storage bags. Triple-layer plastic bags that keep grain airtight so weevils cannot survive without chemicals.',
    chichewa: 'Matumba a Pulasitiki Osatseguka a PICS',
    chichewaReviewed: false,
    example: 'Store dry maize in PICS bags to protect your harvest from weevils without chemical powder.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  MPPT: {
    term: 'MPPT',
    plainMeaning: 'Maximum Power Point Tracking. A smart solar charger that gets the most electricity out of solar panels on both sunny and cloudy days.',
    chichewa: 'Chowongolera Mphamvu ya Dzuwa ya MPPT',
    chichewaReviewed: false,
    example: 'An MPPT charge controller delivers up to thirty percent more power to your battery bank.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  BMS: {
    term: 'BMS',
    plainMeaning: 'Battery Management System. An electronic circuit that balances solar battery cells and protects them from overcharging.',
    chichewa: 'Choteteza Batire la Magetsi',
    chichewaReviewed: false,
    example: 'A good BMS stops the solar inverter before the lithium battery drops too low.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  TDH: {
    term: 'TDH',
    plainMeaning: 'Total Dynamic Head. The total height and friction resistance that a water pump must push against.',
    chichewa: 'Kukwera Konse kwa Madzi m’Phaipi',
    chichewaReviewed: false,
    example: 'Measure the height difference from well to tank to calculate the pump TDH.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  ASL: {
    term: 'ASL',
    plainMeaning: 'Above Sea Level. The elevation of land measured in meters or feet above the ocean.',
    chichewa: 'Kukwera Pamwamba pa Nyanja Yaikulu',
    chichewaReviewed: false,
    example: 'Dedza sits at 1,600 meters ASL, making nights cool and ideal for Irish potatoes.',
    relatedGuides: ['/where', '/skills'],
    category: 'Land & Legal',
  },
  CSEB: {
    term: 'CSEB',
    plainMeaning: 'Compressed Stabilized Earth Block. A durable building brick made by pressing damp subsoil and a little cement in a manual lever machine.',
    chichewa: 'Njerwa Zomangira Zokanikizidwa ndi Makina',
    chichewaReviewed: false,
    example: 'Build dry walls with CSEB blocks to save trees and keep rooms cool.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  CEB: {
    term: 'CEB',
    plainMeaning: 'Compressed Earth Block. Sun-cured building blocks made from subsoil without firing in a wood-burning kiln.',
    chichewa: 'Njerwa ya Dothi Yoponderezedwa',
    chichewaReviewed: false,
    example: 'CEB bricks cure in the shade under plastic for three weeks.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  IMO: {
    term: 'IMO',
    plainMeaning: 'Indigenous Microorganisms. Beneficial native soil bacteria and fungi collected from healthy local forest leaf mold.',
    chichewa: 'Tizilombo Tachilengedwe Tothandiza Nthaka',
    chichewaReviewed: false,
    example: 'Brew forest IMO tea to bring dead tired soil back to life with beneficial microbes.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  UV: {
    term: 'UV',
    plainMeaning: 'Ultraviolet rays. Invisible sunlight waves that sanitize water, dry fruit, and provide natural vitamin D.',
    chichewa: 'Mawanga a Dzuwa a UV',
    chichewaReviewed: false,
    example: 'Bright UV sunlight kills bacteria on thin-sliced fruit in a solar dryer.',
    relatedGuides: ['/skills'],
    category: 'Health & Nutrition',
  },

  // Abbreviations explicitly required
  TLMA: {
    term: 'TLMA',
    plainMeaning: 'Traditional Land Management Area. This is customary village land managed by a Traditional Authority.',
    chichewa: 'Dera Loyang’aniridwa ndi Mfumu Yaikulu',
    chichewaReviewed: false,
    example: 'Before you buy land, ask the chief if the plot sits inside a registered TLMA.',
    relatedGuides: ['/where', '/scout-map'],
    category: 'Land & Legal',
  },
  TA: {
    term: 'TA',
    plainMeaning: 'Traditional Authority. A senior regional chief who oversees customary land, village headmen, and local disputes.',
    chichewa: 'Mfumu Yaikulu',
    chichewaReviewed: false,
    example: 'The TA signs customary land transfer forms alongside the village headman.',
    relatedGuides: ['/where'],
    category: 'Land & Legal',
  },
  OPV: {
    term: 'OPV',
    plainMeaning: 'Open-Pollinated Variety. Natural seeds that you can save and replant every year without losing quality.',
    chichewa: 'Mbewu Yobzala Nthawi Zonse',
    chichewaReviewed: false,
    example: 'Plant OPV maize varieties like ZM 625 so you never have to buy hybrid seeds again.',
    relatedGuides: ['/what', '/seasons', '/agriculture'],
    category: 'Soil & Farming',
  },
  SSB: {
    term: 'SSB',
    plainMeaning: 'Stabilized Soil Block. An interlocking building brick made by pressing subsoil and 6% cement without burning firewood.',
    chichewa: 'Njerwa Zosawotcha za Dothi ndi Simenti',
    chichewaReviewed: false,
    example: 'Build your house with dry-stacked SSB bricks to save firewood and keep rooms cool.',
    relatedGuides: ['/how', '/skills'],
    category: 'Water & Building',
  },
  BoQ: {
    term: 'BoQ',
    plainMeaning: 'Bill of Quantities. A complete list of all building materials, tools, and labor costs for a project.',
    chichewa: 'Mndandanda wa Zipangizo ndi Mtengo Wake',
    chichewaReviewed: false,
    example: 'Check your water tank BoQ before ordering cement, sand, and wire.',
    relatedGuides: ['/calculators', '/how'],
    category: 'Water & Building',
  },
  HDPE: {
    term: 'HDPE',
    plainMeaning: 'High-Density Polyethylene. Strong, flexible black plastic pipe that does not crack in hot sun or freeze in cold winters.',
    chichewa: 'Phaipi Yolimba ya Pulasitiki',
    chichewaReviewed: false,
    example: 'Run 32mm HDPE pipe from your mountain spring down to the storage tank.',
    relatedGuides: ['/skills', '/calculators', '/how'],
    category: 'Water & Building',
  },

  // Key Soil, Land & Agro Terms
  Katondo: {
    term: 'Katondo',
    plainMeaning: 'Deep red clay soil (Eutric Nitisol). It holds water well and grows great fruit trees when mulched.',
    chichewa: 'Katondo',
    chichewaReviewed: false,
    example: 'Katondo red clay becomes hard in dry months, so always cover it with thick mulch.',
    relatedGuides: ['/what', '/scout-map', '/where'],
    category: 'Soil & Farming',
  },
  Makande: {
    term: 'Makande',
    plainMeaning: 'Heavy black clay soil (Pellic Vertisol). It cracks wide when dry and turns sticky like glue when wet.',
    chichewa: 'Makande',
    chichewaReviewed: false,
    example: 'Makande soil is rich in minerals, but you must dig planting pits before it dries hard.',
    relatedGuides: ['/what', '/where'],
    category: 'Soil & Farming',
  },
  Dambo: {
    term: 'Dambo',
    plainMeaning: 'A low, broad wetland valley that stays wet long after the rains stop.',
    chichewa: 'Dambo',
    chichewaReviewed: false,
    example: 'Plant winter cabbage and garlic on raised beds along the dambo edge.',
    relatedGuides: ['/scout-map', '/what', '/seasons'],
    category: 'Soil & Farming',
  },
  Dimba: {
    term: 'Dimba',
    plainMeaning: 'A dry-season vegetable garden grown in damp valley soil using residual water.',
    chichewa: 'Dimba',
    chichewaReviewed: false,
    example: 'A dimba garden gives your family fresh greens and sweet potatoes in August.',
    relatedGuides: ['/seasons', '/what'],
    category: 'Soil & Farming',
  },
  Biochar: {
    term: 'Biochar',
    plainMeaning: 'Crushed charcoal made in a low-smoke kiln. It acts like a sponge in soil to hold water and natural fertilizer.',
    chichewa: 'Makala a M’nthaka Okhazikika',
    chichewaReviewed: false,
    example: 'Soak biochar in compost tea before mixing it into your fruit tree planting pits.',
    relatedGuides: ['/what', '/skills'],
    category: 'Soil & Farming',
  },
  Mulch: {
    term: 'Mulch',
    plainMeaning: 'A protective blanket of dry grass, straw, or leaves spread over garden soil to keep it moist and cool.',
    chichewa: 'Ubusa kapena Udzu Wophimba Nthaka',
    chichewaReviewed: false,
    example: 'Keep a 10cm blanket of mulch on your garden beds to stop the sun from baking your soil.',
    relatedGuides: ['/what', '/agriculture', '/seasons'],
    category: 'Soil & Farming',
  },
  Swale: {
    term: 'Swale',
    plainMeaning: 'A ditch dug on a level line across a hillside to catch rainwater and let it sink into the ground.',
    chichewa: 'Mugero Wogwira Madzi',
    chichewaReviewed: false,
    example: 'Plant vetiver grass on the downhill edge of your swale to stop soil erosion.',
    relatedGuides: ['/how', '/where', '/what'],
    category: 'Water & Building',
  },
  Aquifer: {
    term: 'Aquifer',
    plainMeaning: 'An underground sponge of sand, gravel, or cracked rock holding fresh drinking water.',
    chichewa: 'Madzi a Pansi pa Nthaka',
    chichewaReviewed: false,
    example: 'The shallow aquifer under the dambo allows hand-dug wells of only 6 meters.',
    relatedGuides: ['/scout-map', '/where'],
    category: 'Water & Building',
  },
  'PICS Bag': {
    term: 'PICS Bag',
    plainMeaning: 'Purdue Improved Crop Storage bag. A multi-layer airtight bag that stores maize and beans without chemical pesticides.',
    chichewa: 'Thumba Losalola Mpweya la PICS',
    chichewaReviewed: false,
    example: 'Seal your dry harvest in PICS bags to protect your food from weevils for two years.',
    relatedGuides: ['/what', '/seasons'],
    category: 'Soil & Farming',
  },
  'Zaï Pits': {
    term: 'Zaï Pits',
    plainMeaning: 'Small sunken planting basins filled with compost to collect rainwater in dry, rocky fields.',
    chichewa: 'Mabowo a Zaï Olerera Madzi',
    chichewaReviewed: false,
    example: 'In dry southern districts, plant sorghum in Zaï pits to harvest grain even during drought.',
    relatedGuides: ['/what', '/skills'],
    category: 'Soil & Farming',
  },

  // Health and Nutrition in Plain Words
  Hydrotherapy: {
    term: 'Hydrotherapy',
    plainMeaning: 'Natural healing that uses hot and cold water to increase blood flow and help white blood cells heal the body.',
    chichewa: 'Chithandizo Chogwiritsa Ntchito Madzi',
    chichewaReviewed: false,
    example: 'Apply contrast hydrotherapy to your sprained ankle to reduce swelling and relieve pain.',
    relatedGuides: ['/sanitarium'],
    category: 'Health & Nutrition',
  },
  Fomentation: {
    term: 'Fomentation',
    plainMeaning: 'A steaming moist cloth applied to the skin, followed by a brief cold towel wipe, to bring fresh blood to deep organs.',
    chichewa: 'Kukanikiza Nsalu Yotentha ya Madzi',
    chichewaReviewed: false,
    example: 'Give hot fomentations across the chest for 15 minutes to clear lung congestion.',
    relatedGuides: ['/sanitarium'],
    category: 'Health & Nutrition',
  },
  'Activated Charcoal': {
    term: 'Activated Charcoal',
    plainMeaning: 'Finely powdered hardwood charcoal that traps poisons, stomach acids, and bacteria in its millions of tiny pores.',
    chichewa: 'Makala a Mitengo Yowotcha Bwino',
    chichewaReviewed: false,
    example: 'Drink a tablespoon of activated charcoal in water to soothe food poisoning.',
    relatedGuides: ['/sanitarium', '/skills'],
    category: 'Health & Nutrition',
  },
  Sinjiro: {
    term: 'Sinjiro',
    plainMeaning: 'Pounded roasted groundnut meal mixed into cooked greens to provide complete proteins and healthy oils.',
    chichewa: 'Sinjiro ya Mtedza',
    chichewaReviewed: false,
    example: 'Stir fresh sinjiro into pumpkin leaves to give your children hearty country nourishment.',
    relatedGuides: ['/kitchen'],
    category: 'Health & Nutrition',
  },
  Wonderbag: {
    term: 'Wonderbag',
    plainMeaning: 'A heavily padded cloth cooker that finishes cooking hot pots of food for 8 hours using trapped heat alone.',
    chichewa: 'Chikwama Chofunda Chophikira',
    chichewaReviewed: false,
    example: 'Boil beans for 15 minutes on Friday morning, then seal the pot in a Wonderbag for Sabbath lunch.',
    relatedGuides: ['/kitchen', '/skills'],
    category: 'Health & Nutrition',
  },
};

/**
 * Normalizes term input to match glossary keys
 */
export function lookupGlossaryTerm(name: string): GlossaryTerm | undefined {
  if (!name) return undefined;
  const clean = name.trim();
  if (GLOSSARY_TERMS[clean]) return GLOSSARY_TERMS[clean];

  const lower = clean.toLowerCase();
  for (const [key, item] of Object.entries(GLOSSARY_TERMS)) {
    if (
      key.toLowerCase() === lower ||
      item.term.toLowerCase() === lower ||
      (item.chichewa && item.chichewa.toLowerCase() === lower)
    ) {
      return item;
    }
  }
  return undefined;
}
