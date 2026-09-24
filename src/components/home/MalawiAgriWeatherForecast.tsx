import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, CloudRain, CloudSun, Wind, Droplets, 
  Thermometer, Calendar, Sprout, ShieldCheck, 
  MapPin, Compass, ArrowRight, Sparkles, CheckCircle2,
  AlertTriangle, RefreshCw, Feather
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface DailyForecast {
  day: string;
  date: string;
  isSabbath?: boolean;
  tempHigh: number;
  tempLow: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Light Rain' | 'Scattered Showers' | 'Mountain Mist' | 'Dry & Warm';
  rainProbability: number;
  rainMm: number;
  solarHours: number;
  farmAction: string;
}

export interface RegionClimateProfile {
  id: string;
  name: string;
  districts: string;
  zoneTitle: string;
  elevation: string;
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeedKmH: number;
  solarKwhM2: number;
  soilMoisturePct: number;
  sowingReadiness: string;
  readinessColor: string;
  seasonName: string;
  seasonDescription: string;
  primaryAlert?: string;
  dailyForecasts: DailyForecast[];
  agronomicAdvisory: {
    title: string;
    description: string;
    recommendedTasks: string[];
    scriptureOrEgw: {
      quote: string;
      source: string;
    };
  };
}

export const MALAWI_REGIONS_WEATHER: RegionClimateProfile[] = [
  {
    id: 'central-plateau',
    name: 'Central Plateau',
    districts: 'Dedza, Lilongwe, Ntcheu, Dowa',
    zoneTitle: 'Temperate Red Loam Belt',
    elevation: '1,200m – 1,600m Altitude',
    currentTemp: 24,
    feelsLike: 23,
    humidity: 64,
    windSpeedKmH: 14,
    solarKwhM2: 5.8,
    soilMoisturePct: 68,
    sowingReadiness: 'Optimal for Mulching & Swale Digging',
    readinessColor: 'text-emerald-700 bg-emerald-100 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700',
    seasonName: 'Pre-Planting Land Preparation Window',
    seasonDescription: 'Temperate breezes and moderate humidity. Topsoil is pliable for contour swales, deep mulching, and nursery bed shading.',
    primaryAlert: 'Ideal atmospheric pressure for solar pumping and garden bed aerating.',
    dailyForecasts: [
      {
        day: 'Monday',
        date: 'Today',
        tempHigh: 25,
        tempLow: 14,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 3,
        solarHours: 8.5,
        farmAction: 'Spread grass mulch 10cm deep on garden beds to retain subsoil moisture.'
      },
      {
        day: 'Tuesday',
        date: 'Tomorrow',
        tempHigh: 26,
        tempLow: 15,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.2,
        farmAction: 'Peak solar drying window: air dried beans, maize, and medicinal herbs.'
      },
      {
        day: 'Wednesday',
        date: 'Midweek',
        tempHigh: 24,
        tempLow: 14,
        condition: 'Scattered Showers',
        rainProbability: 55,
        rainMm: 8,
        solarHours: 6.0,
        farmAction: 'Clean rainwater harvesting roof gutters and check silt collection traps.'
      },
      {
        day: 'Thursday',
        date: 'Day 4',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Partly Cloudy',
        rainProbability: 30,
        rainMm: 4,
        solarHours: 7.8,
        farmAction: 'Transplant nursery seedlings into compost-rich sunken beds.'
      },
      {
        day: 'Friday',
        date: 'Preparation Day',
        tempHigh: 24,
        tempLow: 14,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 8.8,
        farmAction: 'Complete physical farm duties early; secure livestock shelters and tools.'
      },
      {
        day: 'Sabbath',
        date: 'Rest & Worship',
        isSabbath: true,
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.0,
        farmAction: 'Holy Sabbath Rest. Contemplate God’s creative wisdom in the open hills.'
      },
      {
        day: 'Sunday',
        date: 'Day 7',
        tempHigh: 25,
        tempLow: 14,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 2,
        solarHours: 8.2,
        farmAction: 'Inspect compost mounds and turn layers with dry straw and wood ash.'
      }
    ],
    agronomicAdvisory: {
      title: 'Central Highland Homestead Strategy',
      description: 'The deep red loam of Dedza and surrounding plateaus holds moisture exceptionally well once covered. Avoid chemical sprays that kill earthworms; instead, rely on companion planting with marigolds, garlic, and heavy vetiver grass hedgerows.',
      recommendedTasks: [
        'Dig hillside swales along the contour to capture every drop of run-off rain.',
        'Inoculate non-hybrid legume seeds (soya and sugar beans) with organic leaf compost.',
        'Prune orchard trees (peaches, apples, and avocado) before budding intensifies.'
      ],
      scriptureOrEgw: {
        quote: '“He watereth the hills from His chambers: the earth is satisfied with the fruit of Thy works. He causeth the grass to grow for the cattle, and herb for the service of man.”',
        source: 'Psalm 104:13, 14'
      }
    }
  },
  {
    id: 'southern-highlands',
    name: 'Southern Highlands',
    districts: 'Mulanje, Thyolo, Zomba Plateau',
    zoneTitle: 'Perennial Mountain Spring Zone',
    elevation: '1,100m – 2,000m Altitude',
    currentTemp: 21,
    feelsLike: 20,
    humidity: 78,
    windSpeedKmH: 11,
    solarKwhM2: 5.2,
    soilMoisturePct: 84,
    sowingReadiness: 'Ideal for Fruit Trees & Gravity Drip Irrigation',
    readinessColor: 'text-sky-700 bg-sky-100 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-700',
    seasonName: 'Highland Mist & Perennial Stream Flow',
    seasonDescription: 'Cool mountain air with frequent Chiperoni drizzle. Mountain springs are flowing pure and cold, requiring zero electric pumping.',
    dailyForecasts: [
      {
        day: 'Monday',
        date: 'Today',
        tempHigh: 22,
        tempLow: 12,
        condition: 'Mountain Mist',
        rainProbability: 60,
        rainMm: 12,
        solarHours: 6.5,
        farmAction: 'Inspect gravity water pipe screens at mountain stream intake.'
      },
      {
        day: 'Tuesday',
        date: 'Tomorrow',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Scattered Showers',
        rainProbability: 50,
        rainMm: 8,
        solarHours: 7.0,
        farmAction: 'Plant citrus, avocado, and macadamia seedlings on hillside terraces.'
      },
      {
        day: 'Wednesday',
        date: 'Midweek',
        tempHigh: 21,
        tempLow: 11,
        condition: 'Light Rain',
        rainProbability: 40,
        rainMm: 5,
        solarHours: 7.2,
        farmAction: 'Reinforce vetiver grass barrier lines along steep contour drops.'
      },
      {
        day: 'Thursday',
        date: 'Day 4',
        tempHigh: 22,
        tempLow: 12,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 2,
        solarHours: 8.0,
        farmAction: 'Mulch passion fruit vines and vegetable beds with composted tea leaves.'
      },
      {
        day: 'Friday',
        date: 'Preparation Day',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 8.5,
        farmAction: 'Gather kitchen herbs and greens for the Sabbath before evening falls.'
      },
      {
        day: 'Sabbath',
        date: 'Rest & Worship',
        isSabbath: true,
        tempHigh: 21,
        tempLow: 12,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 1,
        solarHours: 7.5,
        farmAction: 'Praise the Lord for pure mountain water and tranquil sabbath stillness.'
      },
      {
        day: 'Sunday',
        date: 'Day 7',
        tempHigh: 22,
        tempLow: 12,
        condition: 'Mountain Mist',
        rainProbability: 45,
        rainMm: 6,
        solarHours: 6.8,
        farmAction: 'Check drainage paths around homestead foundation to prevent soil pooling.'
      }
    ],
    agronomicAdvisory: {
      title: 'Mulanje Mountain Slopes Advisory',
      description: 'Due to the steep incline and bountiful rainfall, soil erosion is your only major threat. Never leave bare soil exposed. Plant deep-rooted vetiver grass across all slope borders and allow fallen leaves to decay naturally into rich dark humus.',
      recommendedTasks: [
        'Utilize natural fall height for unpowered gravity water filtration into holding tanks.',
        'Plant multi-story agroforestry: avocado over coffee, with ground cover sweet potato.',
        'Keep nursery shade cloths in place during rare dry midday spells.'
      ],
      scriptureOrEgw: {
        quote: '“In the cultivation of the soil the thoughtful worker will find that treasures little dreamed of are opening up before him... The earth brings forth its strength in obedience to divine laws.”',
        source: 'Ellen G. White, Education, p. 112'
      }
    }
  },
  {
    id: 'northern-highlands',
    name: 'Northern Highlands',
    districts: 'Mzimba, Rumphi, Viphya Plateau, Chitipa',
    zoneTitle: 'Breezy Pine & Grassland Plateau',
    elevation: '1,300m – 1,850m Altitude',
    currentTemp: 23,
    feelsLike: 22,
    humidity: 58,
    windSpeedKmH: 16,
    solarKwhM2: 6.1,
    soilMoisturePct: 62,
    sowingReadiness: 'Optimal for Compost Piles & Legume Prep',
    readinessColor: 'text-amber-800 bg-amber-100 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700',
    seasonName: 'Crisp Highland Air & Early Sowing Prep',
    seasonDescription: 'Cool mountain mornings with generous daily sunshine. Ample room for spacious orchards, non-hybrid grain storage, and rural sanitarium cottages.',
    dailyForecasts: [
      {
        day: 'Monday',
        date: 'Today',
        tempHigh: 24,
        tempLow: 12,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.4,
        farmAction: 'Turn large 3-meter thermal compost piles with manure and dry grasses.'
      },
      {
        day: 'Tuesday',
        date: 'Tomorrow',
        tempHigh: 25,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.5,
        farmAction: 'Dry and grade heirloom beans and yellow corn in direct sunlight.'
      },
      {
        day: 'Wednesday',
        date: 'Midweek',
        tempHigh: 23,
        tempLow: 11,
        condition: 'Partly Cloudy',
        rainProbability: 30,
        rainMm: 3,
        solarHours: 8.0,
        farmAction: 'Dig tree pits (60cm x 60cm) for upcoming rainy season fruit orchard.'
      },
      {
        day: 'Thursday',
        date: 'Day 4',
        tempHigh: 22,
        tempLow: 11,
        condition: 'Scattered Showers',
        rainProbability: 40,
        rainMm: 5,
        solarHours: 7.4,
        farmAction: 'Apply wood ash around cabbage and spinach to naturally deter cutworms.'
      },
      {
        day: 'Friday',
        date: 'Preparation Day',
        tempHigh: 23,
        tempLow: 12,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.0,
        farmAction: 'Conclude field work early; inspect perimeter fencing and bee hives.'
      },
      {
        day: 'Sabbath',
        date: 'Rest & Worship',
        isSabbath: true,
        tempHigh: 22,
        tempLow: 11,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.2,
        farmAction: 'Rest in the Lord. Fellowship with brethren under the open pines.'
      },
      {
        day: 'Sunday',
        date: 'Day 7',
        tempHigh: 24,
        tempLow: 12,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 2,
        solarHours: 8.6,
        farmAction: 'Incorporate charcoal biochar into nursery seedbeds for rich microbial soil.'
      }
    ],
    agronomicAdvisory: {
      title: 'Mzimba & Viphya Agronomy Guidance',
      description: 'The sandy clay soils in the north require steady inputs of decomposed organic matter. Mix pine needles with cattle manure and wood ash to balance pH. Abundant space makes this region top tier for self-sufficient family life and church schools.',
      recommendedTasks: [
        'Collect dry woodland mulch before the first lightning rains spark bushfires.',
        'Build raised seedbeds with compost cores for winter spinach and carrots.',
        'Maintain solar battery banks with clean panel wiping during dry dusty days.'
      ],
      scriptureOrEgw: {
        quote: '“He will give you the rain of your land in his due season, the first rain and the latter rain, that thou mayest gather in thy corn, and thy wine, and thine oil.”',
        source: 'Deuteronomy 11:14'
      }
    }
  },
  {
    id: 'lakeside-belt',
    name: 'Lakeside Belt',
    districts: 'Salima, Nkhotakota, Nkhata Bay, Karonga',
    zoneTitle: 'Alluvial Basin & Lake Breeze Zone',
    elevation: '480m – 600m Altitude',
    currentTemp: 29,
    feelsLike: 31,
    humidity: 68,
    windSpeedKmH: 19,
    solarKwhM2: 6.4,
    soilMoisturePct: 54,
    sowingReadiness: 'Dambo Moisture Active • Banana & Mango Season',
    readinessColor: 'text-teal-800 bg-teal-100 border-teal-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-700',
    seasonName: 'Warm Tropical Growth & Dambo Farming',
    seasonDescription: 'Balmy breezes from Lake Malawi with rapid plant growth. High evaporation requires heavy mulch on sandy loam beds.',
    dailyForecasts: [
      {
        day: 'Monday',
        date: 'Today',
        tempHigh: 30,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.8,
        farmAction: 'Mulch banana mats deeply with dry elephant grass to conserve water.'
      },
      {
        day: 'Tuesday',
        date: 'Tomorrow',
        tempHigh: 31,
        tempLow: 21,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.9,
        farmAction: 'Check low-cost drip lines in dambo garden beds during morning hours.'
      },
      {
        day: 'Wednesday',
        date: 'Midweek',
        tempHigh: 29,
        tempLow: 20,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 2,
        solarHours: 8.5,
        farmAction: 'Spray natural neem leaf extract to prevent leaf-chewing caterpillars.'
      },
      {
        day: 'Thursday',
        date: 'Day 4',
        tempHigh: 29,
        tempLow: 19,
        condition: 'Scattered Showers',
        rainProbability: 35,
        rainMm: 4,
        solarHours: 7.9,
        farmAction: 'Mound fertile soil around sweet potato and cassava root cuttings.'
      },
      {
        day: 'Friday',
        date: 'Preparation Day',
        tempHigh: 30,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.5,
        farmAction: 'Harvest ripe mangoes, papayas, and garden relish for Sabbath hospitality.'
      },
      {
        day: 'Sabbath',
        date: 'Rest & Worship',
        isSabbath: true,
        tempHigh: 29,
        tempLow: 19,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.6,
        farmAction: 'Sabbath rest. Enjoy the cooling breezes and peaceful family prayer.'
      },
      {
        day: 'Sunday',
        date: 'Day 7',
        tempHigh: 30,
        tempLow: 20,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 1,
        solarHours: 8.8,
        farmAction: 'Aerate shallow well intake and test manual water hand pumps.'
      }
    ],
    agronomicAdvisory: {
      title: 'Lakeside Agricultural Stewardship',
      description: 'The lake shore yields abundant fruit, cassava, and sweet potatoes, but high evaporation can dry unprotected beds within 48 hours. Keep every square foot shaded by living ground cover or thick dry grass.',
      recommendedTasks: [
        'Plant fast-growing moringa and pigeon pea hedgerows as windbreaks.',
        'Use shallow dambo water table for low-energy winter garden greens.',
        'Ensure grain stores are elevated on stone pillars with rodent-proof metal collars.'
      ],
      scriptureOrEgw: {
        quote: '“He caused the grass to grow for the cattle, and herb for the service of man... the trees of the Lord are full of sap.”',
        source: 'Psalm 104:14, 16'
      }
    }
  },
  {
    id: 'lower-shire',
    name: 'Lower Shire Valley',
    districts: 'Chikwawa, Nsanje',
    zoneTitle: 'Semi-Arid Resilient Basin',
    elevation: '50m – 150m Altitude',
    currentTemp: 33,
    feelsLike: 35,
    humidity: 42,
    windSpeedKmH: 22,
    solarKwhM2: 6.8,
    soilMoisturePct: 38,
    sowingReadiness: 'Zai Pit Sinking & Drought Grain Storage',
    readinessColor: 'text-amber-900 bg-amber-100 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
    seasonName: 'Dry Heat & Water Catchment Preparation',
    seasonDescription: 'Hot valley sunshine. Exceptional solar energy potential. Requires sunken beds, deep organic zai pits, and hardy traditional staples.',
    dailyForecasts: [
      {
        day: 'Monday',
        date: 'Today',
        tempHigh: 34,
        tempLow: 22,
        condition: 'Dry & Warm',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 10.0,
        farmAction: 'Dig traditional sunken Zai pits (20cm deep) filled with dry manure.'
      },
      {
        day: 'Tuesday',
        date: 'Tomorrow',
        tempHigh: 35,
        tempLow: 23,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 10.2,
        farmAction: 'Store non-hybrid Sorghum and Pearl Millet seeds in airtight clay pots.'
      },
      {
        day: 'Wednesday',
        date: 'Midweek',
        tempHigh: 34,
        tempLow: 22,
        condition: 'Dry & Warm',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.8,
        farmAction: 'Water tree saplings using recycled sub-surface clay pot irrigation.'
      },
      {
        day: 'Thursday',
        date: 'Day 4',
        tempHigh: 33,
        tempLow: 21,
        condition: 'Partly Cloudy',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.0,
        farmAction: 'Erect shade lattice shelters over delicate seedling nursery beds.'
      },
      {
        day: 'Friday',
        date: 'Preparation Day',
        tempHigh: 34,
        tempLow: 22,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.9,
        farmAction: 'Finish manual outdoor chores before midday heat peaks.'
      },
      {
        day: 'Sabbath',
        date: 'Rest & Worship',
        isSabbath: true,
        tempHigh: 33,
        tempLow: 21,
        condition: 'Sunny',
        rainProbability: 0,
        rainMm: 0,
        solarHours: 10.0,
        farmAction: 'Holy Sabbath Rest. Praise the Lord who provides water in the desert.'
      },
      {
        day: 'Sunday',
        date: 'Day 7',
        tempHigh: 34,
        tempLow: 22,
        condition: 'Dry & Warm',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.7,
        farmAction: 'Inspect solar bore pump panels and clean dust for peak pumping amp output.'
      }
    ],
    agronomicAdvisory: {
      title: 'Shire Basin Water Defense',
      description: 'The heat of the Lower Shire demands water-saving wisdom. Conventional plowing destroys soil life here. Practice no-till farming with sunken pits that hold every single milliliter of moisture close to deep plant roots.',
      recommendedTasks: [
        'Prioritize drought-resilient crops: Sorghum, Millet, Pigeon Peas, and Cassava.',
        'Bury porous unglazed clay ollas next to vegetables for slow subterranean seepage.',
        'Use excess solar PV generation to pump water into elevated shaded holding tanks.'
      ],
      scriptureOrEgw: {
        quote: '“He turneth the wilderness into a standing water, and dry ground into watersprings. And there He maketh the hungry to dwell, that they may prepare a city for habitation.”',
        source: 'Psalm 107:35, 36'
      }
    }
  }
];

export function MalawiAgriWeatherForecast() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('central-plateau');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const region = MALAWI_REGIONS_WEATHER.find(r => r.id === selectedRegionId) || MALAWI_REGIONS_WEATHER[0];
  const activeDay = region.dailyForecasts[selectedDayIndex] || region.dailyForecasts[0];

  const getWeatherIcon = (condition: DailyForecast['condition'], size = 20) => {
    switch (condition) {
      case 'Sunny':
      case 'Dry & Warm':
        return <Sun size={size} className="text-amber-500 dark:text-amber-400" />;
      case 'Partly Cloudy':
        return <CloudSun size={size} className="text-amber-600 dark:text-amber-300" />;
      case 'Light Rain':
      case 'Scattered Showers':
        return <CloudRain size={size} className="text-sky-500 dark:text-sky-400" />;
      case 'Mountain Mist':
        return <Droplets size={size} className="text-cyan-500 dark:text-cyan-400" />;
      default:
        return <Sun size={size} className="text-amber-500" />;
    }
  };

  return (
    <section 
      id="malawi-weather-forecast"
      aria-label="Malawi Localized Agricultural Weather Forecast"
      className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16"
    >
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0C1C13]/95 border border-stone-200/90 dark:border-emerald-900/60 shadow-lg relative overflow-hidden backdrop-blur-md">
        
        {/* Decorative subtle dawn sky accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-200/30 via-emerald-100/20 to-transparent dark:from-emerald-700/15 pointer-events-none rounded-full blur-3xl -mr-20 -mt-20" />

        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-stone-200/80 dark:border-emerald-950/80 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300/70 dark:border-emerald-700/60">
                <Sun size={13} className="text-amber-500" />
                Agricultural Weather & Climate
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Localized for Country Living in Malawi
              </span>
            </div>

            <h2 className="serif text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50">
              Regional Climate Insights & Agronomy Forecast
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Track rainfall likelihood, subsoil moisture, and solar radiation to time your planting, mulching, rainwater collection, and irrigation with nature’s rhythms.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/seasons"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-amber-300 hover:text-emerald-950 dark:hover:text-amber-100 px-3 py-2 rounded-xl bg-amber-50 dark:bg-emerald-950/60 border border-amber-300/70 dark:border-emerald-700/60 transition-all shadow-xs"
            >
              <Calendar size={14} className="text-amber-600 dark:text-amber-400" />
              <span>Full Planting Almanac</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 1. Regional Selector Tabs */}
        <div className="pt-6 relative z-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar">
            {MALAWI_REGIONS_WEATHER.map((r) => {
              const isSelected = r.id === selectedRegionId;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRegionId(r.id);
                    setSelectedDayIndex(0);
                  }}
                  className={cn(
                    "flex flex-col text-left px-4 py-2.5 rounded-2xl border transition-all duration-200 shrink-0 cursor-pointer",
                    isSelected
                      ? "bg-emerald-800 text-white border-amber-400 shadow-md ring-2 ring-amber-400/30"
                      : "bg-white dark:bg-stone-900/80 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-emerald-950/80 shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className={isSelected ? "text-amber-300" : "text-emerald-600 dark:text-emerald-400"} />
                    <span className="font-serif font-bold text-xs sm:text-sm">
                      {r.name}
                    </span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-sans mt-0.5 truncate max-w-[150px]",
                    isSelected ? "text-emerald-100" : "text-stone-500 dark:text-stone-400"
                  )}>
                    {r.districts.split(',')[0]} & Plateau
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Primary Regional Status Card */}
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-emerald-900/50 shadow-xs relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Current Live Temperature & Weather Condition */}
            <div className="md:col-span-4 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-stone-200/80 dark:border-emerald-950/80 pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  {region.zoneTitle}
                </span>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 font-semibold">
                  {region.elevation}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-1">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 dark:bg-amber-950/70 border border-amber-300/80 dark:border-amber-700/60 flex items-center justify-center shrink-0 shadow-xs">
                  {getWeatherIcon(activeDay.condition, 28)}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-stone-900 dark:text-stone-50 font-serif">
                      {activeDay.tempHigh}°
                    </span>
                    <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
                      / {activeDay.tempLow}°C
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    {activeDay.condition} • {region.seasonName}
                  </span>
                </div>
              </div>

              {/* Sowing Status Badge */}
              <div className={cn(
                "mt-2 px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2",
                region.readinessColor
              )}>
                <Sprout size={15} className="shrink-0" />
                <span className="truncate">{region.sowingReadiness}</span>
              </div>
            </div>

            {/* Center: Key Agricultural Climate Metrics (Soil Moisture, Solar, Rain Probability) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Rain Chance */}
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between text-sky-600 dark:text-sky-400 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Rain Chance</span>
                  <CloudRain size={16} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{activeDay.rainProbability}%</span>
                  <span className="text-[10px] text-stone-500">({activeDay.rainMm} mm)</span>
                </div>
                <span className="text-[10px] text-stone-500 mt-1">Precipitation index</span>
              </div>

              {/* Soil Moisture */}
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Soil Moisture</span>
                  <Droplets size={16} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{region.soilMoisturePct}%</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Good</span>
                </div>
                <span className="text-[10px] text-stone-500 mt-1">Subsoil root zone</span>
              </div>

              {/* Solar Radiation */}
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Solar Energy</span>
                  <Sun size={16} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{region.solarKwhM2}</span>
                  <span className="text-[10px] text-stone-500">kWh/m²</span>
                </div>
                <span className="text-[10px] text-stone-500 mt-1">Pump & PV Yield</span>
              </div>

              {/* Wind Speed */}
              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between shadow-2xs">
                <div className="flex items-center justify-between text-teal-600 dark:text-teal-400 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Breeze & Air</span>
                  <Wind size={16} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{region.windSpeedKmH}</span>
                  <span className="text-[10px] text-stone-500">km/h</span>
                </div>
                <span className="text-[10px] text-stone-500 mt-1">{region.humidity}% humidity</span>
              </div>

            </div>

          </div>
        </div>

        {/* 3. 7-Day Agronomic Forecast Matrix */}
        <div className="mt-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Calendar size={14} className="text-amber-600 dark:text-amber-400" />
              7-Day Agricultural Field Work Schedule
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Select day to view specific farming task
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {region.dailyForecasts.map((forecast, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={forecast.day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer",
                    forecast.isSabbath 
                      ? isSelected 
                        ? "bg-amber-400 text-stone-950 border-amber-300 shadow-md ring-2 ring-amber-400/40"
                        : "bg-amber-100/70 dark:bg-amber-950/50 hover:bg-amber-200/80 border-amber-300/80 dark:border-amber-700/60 text-stone-900 dark:text-amber-200"
                      : isSelected
                        ? "bg-emerald-800 text-white border-amber-400 shadow-md ring-2 ring-amber-400/40"
                        : "bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 border-stone-200/90 dark:border-emerald-950/80 text-stone-800 dark:text-stone-200"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">
                      {forecast.day}
                    </span>
                    {forecast.isSabbath && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-amber-300 text-amber-950 dark:bg-amber-400 dark:text-stone-950">
                        Sabbath
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center shrink-0">
                      {getWeatherIcon(forecast.condition, 16)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-sm">
                        {forecast.tempHigh}°
                      </span>
                      <span className="text-[10px] opacity-75">
                        {forecast.tempLow}°C
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-current/10">
                    <span className="flex items-center gap-1">
                      <CloudRain size={11} />
                      {forecast.rainProbability}%
                    </span>
                    <span>{forecast.solarHours}h sun</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Day Homestead Farming Action & Adventist Principle */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-[#102217] border border-amber-200/90 dark:border-emerald-800/60 shadow-xs relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 dark:bg-emerald-900/80 border border-amber-300/80 dark:border-emerald-700/60 flex items-center justify-center shrink-0 text-amber-900 dark:text-amber-200 shadow-2xs">
              <Sprout size={18} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Daily Farm Priority • {activeDay.day}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                  {region.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100 mt-0.5">
                {activeDay.farmAction}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-end">
            <Link
              to="/agriculture"
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Edenic Soil Manual</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 5. Ellen G. White Agronomy Reflection & Scripture Card */}
        <div className="mt-4 pt-4 border-t border-stone-200/80 dark:border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left relative z-10">
          <div className="flex items-center gap-2">
            <Feather size={15} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-xs text-stone-600 dark:text-stone-400 italic">
              {region.agronomicAdvisory.scriptureOrEgw.quote}
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 font-sans shrink-0">
            — {region.agronomicAdvisory.scriptureOrEgw.source}
          </span>
        </div>

      </div>
    </section>
  );
}

export default MalawiAgriWeatherForecast;
