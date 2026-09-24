import { 
  CloudRain, Wheat, Layers, Sun, Sprout, ShieldCheck, Droplets, Thermometer, 
  LucideIcon, Calendar, Compass, Sparkles, Leaf
} from 'lucide-react';
import { SEASONAL_CALENDAR, SeasonalTask, SeasonalTag } from '@/data/skillsAndSeasons';

export interface SeasonalPalette {
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentText: string;
  accentBg: string;
  highlightBorder: string;
  headerBannerBg: string;
  headerBannerText: string;
  soilColorName: string;
  soilHex: string;
  accentHex: string;
  rainOrSunHex: string;
}

export interface AlmanacInfo {
  seasonKey: SeasonalTag;
  name: string;
  monthsLabel: string;
  currentMonthName: string;
  isCurrentRealMonth: boolean;
  tagline: string;
  soilProfileName: string;
  palette: SeasonalPalette;
  icon: LucideIcon;
  journalTone: string;
  keyActivities: string[];
  recommendedCrops: string[];
  proTip: string;
  almanacWisdom: string;
  soilAdvice: string;
  climateOverview: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Returns the automatic Malawi seasonal phase based on the current calendar month
 */
export function getCurrentMalawiSeason(date: Date = new Date()): SeasonalTag {
  const month = date.getMonth(); // 0 = Jan, 1 = Feb ... 11 = Dec

  if (month === 10 || month === 11 || month === 0 || month === 1 || month === 2) {
    // Nov, Dec, Jan, Feb, Mar
    return 'Rainy Planting';
  } else if (month >= 3 && month <= 5) {
    // Apr, May, Jun
    return 'Harvest & Storage';
  } else if (month === 6 || month === 7) {
    // Jul, Aug
    return 'Cold Dry Season';
  } else {
    // Sep, Oct (Months 8, 9)
    return 'Hot Dry Preparation';
  }
}

export function getAlmanacInfo(seasonOverride?: SeasonalTag | string, date: Date = new Date()): AlmanacInfo {
  const realMonthName = MONTH_NAMES[date.getMonth()];
  const realSeason = getCurrentMalawiSeason(date);
  
  const activeSeasonKey: SeasonalTag = (
    seasonOverride && ['Rainy Planting', 'Harvest & Storage', 'Cold Dry Season', 'Hot Dry Preparation'].includes(seasonOverride)
      ? seasonOverride as SeasonalTag
      : realSeason
  );

  const isCurrentRealMonth = activeSeasonKey === realSeason;

  switch (activeSeasonKey) {
    case 'Rainy Planting':
      return {
        seasonKey: 'Rainy Planting',
        name: 'Rainy Planting Season (Monsoon Earth)',
        monthsLabel: 'November – March',
        currentMonthName: realMonthName,
        isCurrentRealMonth,
        tagline: 'Monsoon rains nourishing topsoil, high crop growth & active contour erosion defense',
        soilProfileName: 'Deep Wet Katondo Silt & Humic Forest Topsoil',
        icon: CloudRain,
        journalTone: 'Lush, vibrant, high-precipitation monsoon atmosphere',
        palette: {
          bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
          cardBg: 'bg-emerald-950/80',
          cardBorder: 'border-emerald-700/60',
          badgeBg: 'bg-emerald-900/90',
          badgeText: 'text-emerald-200',
          badgeBorder: 'border-emerald-600/70',
          accentText: 'text-sky-300',
          accentBg: 'bg-sky-500/10',
          highlightBorder: 'border-sky-500/40',
          headerBannerBg: 'bg-gradient-to-r from-emerald-950 via-teal-900 to-sky-950',
          headerBannerText: 'text-emerald-50',
          soilColorName: 'Rich Moist Clay Silt',
          soilHex: '#134e4a',
          accentHex: '#38bdf8',
          rainOrSunHex: '#0284c7',
        },
        keyActivities: [
          'Plant staple maize, beans, groundnuts, and sweet potatoes with first rains',
          'Maintain contour ridges (misozi) & vetiver hedges to halt topsoil washouts',
          'Fill 5,000L rain tanks & shallow earthen swales during heavy downpours',
          'Apply organic compost tea & neem spray for natural pest prevention'
        ],
        recommendedCrops: ['Maize (SC 719 / MH 26)', 'Chimbamba Beans', 'CG7 Groundnuts', 'Sweet Potatoes', 'Pumpkins'],
        proTip: 'Never leave topsoil bare during heavy rain downpours. Intercrop maize with squash or beans for ground cover.',
        almanacWisdom: '"He that watereth shall be watered also himself." — Ensure your contour swales catch every drop before it leaves your land.',
        soilAdvice: 'Nitrogen flush occurs with early rains. Top-dress compost tea near plant roots within 14 days of germination.',
        climateOverview: 'High humidity, heavy thunderstorms (850–1,200mm annual span), warm days (22°C–28°C).'
      };

    case 'Harvest & Storage':
      return {
        seasonKey: 'Harvest & Storage',
        name: 'Harvest & Post-Harvest Storage',
        monthsLabel: 'April – June',
        currentMonthName: realMonthName,
        isCurrentRealMonth,
        tagline: 'Golden maize sheaves, field curing, hermetic grain storage & seed preservation',
        soilProfileName: 'Golden Baked Clay & Hardened Red Latosol',
        icon: Wheat,
        journalTone: 'Warm golden grain, rich earth harvest, dried sheaves',
        palette: {
          bgGradient: 'from-amber-950 via-stone-900 to-amber-900',
          cardBg: 'bg-amber-950/80',
          cardBorder: 'border-amber-700/60',
          badgeBg: 'bg-amber-900/90',
          badgeText: 'text-amber-200',
          badgeBorder: 'border-amber-600/70',
          accentText: 'text-amber-300',
          accentBg: 'bg-amber-500/10',
          highlightBorder: 'border-amber-500/40',
          headerBannerBg: 'bg-gradient-to-r from-amber-950 via-stone-900 to-yellow-950',
          headerBannerText: 'text-amber-50',
          soilColorName: 'Warm Terracotta Clay',
          soilHex: '#78350f',
          accentHex: '#f59e0b',
          rainOrSunHex: '#d97706',
        },
        keyActivities: [
          'Harvest mature maize ears, beans, and groundnuts as stalks turn golden',
          'Sun-dry grains on raised bamboo racks to under 12% moisture',
          'Pack dry grains in hermetic PICS bags with dried neem leaves to prevent weevils',
          'Cure Irish potatoes in dark, cool, ventilated root cellars'
        ],
        recommendedCrops: ['Harvest Maize', 'Dry Legumes', 'Winter Vegetable Nursery', 'Irish Potatoes'],
        proTip: 'Insects cannot survive in hermetic PICS bags where oxygen is depleted. Store grain bone-dry and tightly tied.',
        almanacWisdom: '"He that gathereth in summer is a wise son." — Fortify granary stilts with metal rat-guards before storing grains.',
        soilAdvice: 'Incorporate crop stalks and bean husks back into the soil as organic mulch instead of burning them.',
        climateOverview: 'Mild temperatures, dropping humidity, cool breezes, virtually zero rainfall (dry curing window).'
      };

    case 'Cold Dry Season':
      return {
        seasonKey: 'Cold Dry Season',
        name: 'Cold Dry Season (Winter Dimba)',
        monthsLabel: 'July – August',
        currentMonthName: realMonthName,
        isCurrentRealMonth,
        tagline: 'Chiperoni mountain mists, cool valley dimba gardening, winter wheat & garlic',
        soilProfileName: 'Cold Wetland Silt & Dambo Alluvial Clay',
        icon: Layers,
        journalTone: 'Cool highland mist, slate mountain soil, moist riverbeds',
        palette: {
          bgGradient: 'from-slate-950 via-teal-950 to-stone-950',
          cardBg: 'bg-slate-900/90',
          cardBorder: 'border-slate-700/70',
          badgeBg: 'bg-slate-800/90',
          badgeText: 'text-teal-200',
          badgeBorder: 'border-teal-600/60',
          accentText: 'text-teal-300',
          accentBg: 'bg-teal-500/10',
          highlightBorder: 'border-teal-500/40',
          headerBannerBg: 'bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950',
          headerBannerText: 'text-slate-50',
          soilColorName: 'Moist Dambo Silt',
          soilHex: '#1e293b',
          accentHex: '#2dd4bf',
          rainOrSunHex: '#0d9488',
        },
        keyActivities: [
          'Plant cold-tolerant vegetables (cabbage, carrots, garlic, onions, peas) in irrigated dimba beds',
          'Collect and ferment heirloom seeds from spring harvests',
          'Build hot composting piles using dry maize stalks, manure, and forest litter',
          'Protect seedling nursery beds from cool highland night frosts with grass thatch'
        ],
        recommendedCrops: ['Irish Potatoes', 'Garlic', 'Onions', 'Cabbage', 'Peas', 'Carrots', 'Strawberries'],
        proTip: 'Highland districts like Dedza & Mzimba experience chilly night drops (down to 6°C). Irrigate early morning.',
        almanacWisdom: '"The sluggard will not plow by reason of the cold; therefore shall he beg in harvest." — Utilize dambo groundwater now.',
        soilAdvice: 'Dambo soils remain naturally moist. Add river sand or compost to improve drainage for root crops like garlic and onions.',
        climateOverview: 'Chiperoni overcast mists, cold nights (6°C–14°C), pleasant sunny afternoons (18°C–22°C).'
      };

    case 'Hot Dry Preparation':
    default:
      return {
        seasonKey: 'Hot Dry Preparation',
        name: 'Hot Dry Land Prep (Solar & Ridge Prep)',
        monthsLabel: 'September – October',
        currentMonthName: realMonthName,
        isCurrentRealMonth,
        tagline: 'Ridge tillage, manure incorporation, solar water pump setup & fruit tree planting',
        soilProfileName: 'Warm Dry Katondo Ridge & Baked Sun Clay',
        icon: Sun,
        journalTone: 'Warm terracotta clay, intense solar radiation, pre-rain preparation',
        palette: {
          bgGradient: 'from-orange-950 via-stone-950 to-amber-950',
          cardBg: 'bg-orange-950/80',
          cardBorder: 'border-orange-800/60',
          badgeBg: 'bg-orange-900/90',
          badgeText: 'text-orange-200',
          badgeBorder: 'border-orange-600/70',
          accentText: 'text-amber-400',
          accentBg: 'bg-amber-500/10',
          highlightBorder: 'border-amber-500/40',
          headerBannerBg: 'bg-gradient-to-r from-orange-950 via-stone-900 to-amber-950',
          headerBannerText: 'text-amber-50',
          soilColorName: 'Dry Red Katondo Clay',
          soilHex: '#9a3412',
          accentHex: '#f59e0b',
          rainOrSunHex: '#ea580c',
        },
        keyActivities: [
          'Prepare ridges (misozi) and mulched no-till beds before first rains',
          'Dig fruit tree planting pits (80cm x 80cm x 80cm) and mix topsoil with well-rotted manure',
          'Inspect and service solar water pumps, rooftop rain gutters, and filter barrels',
          'Prepare nursery seedbeds for early rain transplants'
        ],
        recommendedCrops: ['Fruit Saplings (Avocado, Mango, Citrus)', 'Pigeon Peas', 'Organic Mulch Layers'],
        proTip: 'Preparing beds in September allows you to sow seeds on the exact day the first chirimika rain falls.',
        almanacWisdom: '"Prepare thy work without, and make it fit for thyself in the field." — Early land prep captures initial soil nitrogen flush.',
        soilAdvice: 'Apply well-decomposed cattle or chicken manure into ridge centers now so soil microbes digest nutrients prior to planting.',
        climateOverview: 'Hot, dry, high solar irradiance (6.5–7.2 kWh/m²/day), peak temperatures (28°C–36°C).'
      };
  }
}
