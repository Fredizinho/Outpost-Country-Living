import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Droplets,
  Calendar,
  Sprout,
  ShieldCheck,
  MapPin,
  ArrowRight,
  RefreshCw,
  Feather,
  ExternalLink,
  WifiOff,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { getCachedWeather, saveCachedWeather } from '@/lib/offlineStorage';
import { useOnlineStatus } from '@/components/common/OfflinePwaStatusBanner';

export interface DailyForecast {
  day: string;
  date: string;
  isSabbath?: boolean;
  tempHigh: number;
  tempLow: number;
  condition:
    | 'Sunny'
    | 'Partly Cloudy'
    | 'Light Rain'
    | 'Scattered Showers'
    | 'Mountain Mist'
    | 'Dry & Warm';
  rainProbability: number;
  rainMm: number;
  solarHours: number;
  faoEt0Mm?: number;
  farmAction: string;
}

export interface RegionClimateProfile {
  id: string;
  name: string;
  stationName: string;
  lat: number;
  lng: number;
  districts: string;
  zoneTitle: string;
  elevation: string;
  dccmsAnnualRainfallMm: string;
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeedKmH: number;
  solarKwhM2: number;
  soilMoisturePct: number;
  soilTempRootC: number;
  faoEt0Mm: number;
  sowingReadiness: string;
  seasonName: string;
  dailyForecasts: DailyForecast[];
  agronomicAdvisory: {
    title: string;
    description: string;
    scriptureOrEgw: {
      quote: string;
      source: string;
      egwCode?: string;
      verifiedUrl: string;
    };
  };
}

export const MALAWI_REGIONS_WEATHER: RegionClimateProfile[] = [
  {
    id: 'central-plateau',
    name: 'Central Plateau',
    stationName: 'Dedza Agro-Met Station (WMO 67585)',
    lat: -14.37,
    lng: 34.33,
    districts: 'Dedza, Lilongwe, Ntcheu, Dowa',
    zoneTitle: 'Eutric Nitisol Highland Belt',
    elevation: '1,200m – 2,198m ASL',
    dccmsAnnualRainfallMm: '950 – 1,250 mm/yr (DCCMS Normal)',
    currentTemp: 22,
    feelsLike: 21,
    humidity: 64,
    windSpeedKmH: 14,
    solarKwhM2: 5.8,
    soilMoisturePct: 26.8,
    soilTempRootC: 20.4,
    faoEt0Mm: 4.1,
    sowingReadiness: 'Optimal for Contour Swales, Biochar Pits & Mulching',
    seasonName: 'Temperate Highland Regime',
    dailyForecasts: [
      {
        day: 'Today',
        date: 'Day 1',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 0.5,
        solarHours: 8.5,
        faoEt0Mm: 4.1,
        farmAction: 'Spread 10cm dry vetiver grass mulch on garden beds to conserve subsoil moisture.',
      },
      {
        day: 'Day 2',
        date: 'Day 2',
        tempHigh: 24,
        tempLow: 14,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.2,
        faoEt0Mm: 4.4,
        farmAction: 'Solar dehydration window: dry open-pollinated beans, maize, and culinary herbs.',
      },
      {
        day: 'Day 3',
        date: 'Day 3',
        tempHigh: 22,
        tempLow: 13,
        condition: 'Scattered Showers',
        rainProbability: 45,
        rainMm: 4.2,
        solarHours: 6.5,
        faoEt0Mm: 3.6,
        farmAction: 'Inspect roof rainwater gutters and first-flush diverter chambers.',
      },
      {
        day: 'Day 4',
        date: 'Day 4',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 1.0,
        solarHours: 7.8,
        faoEt0Mm: 3.9,
        farmAction: 'Transplant nursery seedlings into double-dug bio-intensive beds.',
      },
      {
        day: 'Day 5',
        date: 'Day 5',
        tempHigh: 24,
        tempLow: 14,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 8.8,
        faoEt0Mm: 4.3,
        farmAction: 'Excavate 1m³ Ellen G. White deep planting pits with 20cm bottom stone drainage.',
      },
      {
        day: 'Friday',
        date: 'Prep Day',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 8.9,
        faoEt0Mm: 4.2,
        farmAction: 'Preparation Day: complete irrigation checks and prepare fireless thermal cookers before sunset.',
      },
      {
        day: 'Sabbath',
        date: 'Sabbath Rest',
        isSabbath: true,
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.0,
        faoEt0Mm: 4.1,
        farmAction: 'Holy Sabbath Rest (Exodus 20:8–11). Fellowship and study God’s creative works in nature.',
      },
    ],
    agronomicAdvisory: {
      title: 'Central Highland Pedology & Moisture Advisory',
      description:
        'Eutric Nitisols (Katondo red clay loams, pH 5.8–6.5) in Dedza and Ntcheu exhibit high moisture retention when protected from surface crusting by 10cm organic mulch and contour vetiver bunds.',
      scriptureOrEgw: {
        quote:
          '“He watereth the hills from his chambers: the earth is satisfied with the fruit of thy works. He causeth the grass to grow for the cattle, and herb for the service of man.”',
        source: 'Psalm 104:13–14 (KJV)',
        verifiedUrl: 'https://bible-api.com/Psalm%20104:13-14?translation=kjv',
      },
    },
  },
  {
    id: 'southern-highlands',
    name: 'Southern Highlands',
    stationName: 'Mimosa / Mulanje Agro-Met Station (WMO 67693)',
    lat: -16.03,
    lng: 35.5,
    districts: 'Mulanje, Thyolo, Zomba Plateau',
    zoneTitle: 'Perennial Mountain Spring & Acrisol Belt',
    elevation: '1,100m – 3,002m ASL',
    dccmsAnnualRainfallMm: '1,450 – 2,200 mm/yr (DCCMS Normal)',
    currentTemp: 21,
    feelsLike: 20,
    humidity: 76,
    windSpeedKmH: 12,
    solarKwhM2: 5.3,
    soilMoisturePct: 32.4,
    soilTempRootC: 19.6,
    faoEt0Mm: 3.7,
    sowingReadiness: 'Ideal for Perennial Fruit Guilds & Gravity Spring Intakes',
    seasonName: 'Orographic Mist & Perennial Stream Flow',
    dailyForecasts: [
      {
        day: 'Today',
        date: 'Day 1',
        tempHigh: 22,
        tempLow: 13,
        condition: 'Mountain Mist',
        rainProbability: 55,
        rainMm: 6.5,
        solarHours: 6.5,
        faoEt0Mm: 3.5,
        farmAction: 'Inspect gravity spring intake screens and slow-sand bio-filter heads.',
      },
      {
        day: 'Day 2',
        date: 'Day 2',
        tempHigh: 23,
        tempLow: 14,
        condition: 'Scattered Showers',
        rainProbability: 45,
        rainMm: 4.8,
        solarHours: 7.0,
        faoEt0Mm: 3.7,
        farmAction: 'Plant avocado, macadamia, and citrus saplings on contour terraces.',
      },
      {
        day: 'Day 3',
        date: 'Day 3',
        tempHigh: 21,
        tempLow: 12,
        condition: 'Light Rain',
        rainProbability: 40,
        rainMm: 3.5,
        solarHours: 7.2,
        faoEt0Mm: 3.6,
        farmAction: 'Reinforce double-row vetiver grass slips along slope contour lines.',
      },
      {
        day: 'Day 4',
        date: 'Day 4',
        tempHigh: 22,
        tempLow: 13,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 1.2,
        solarHours: 8.0,
        faoEt0Mm: 3.9,
        farmAction: 'Apply 250g dolomitic lime or hardwood ash per pit to buffer acidic Acrisol pH.',
      },
      {
        day: 'Day 5',
        date: 'Day 5',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 8.5,
        faoEt0Mm: 4.1,
        farmAction: 'Prune lower fruit tree branches to improve airflow and prevent fungal blight.',
      },
      {
        day: 'Friday',
        date: 'Prep Day',
        tempHigh: 23,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 8.5,
        faoEt0Mm: 4.0,
        farmAction: 'Harvest fresh garden greens and fruit for Sabbath preparation before sunset.',
      },
      {
        day: 'Sabbath',
        date: 'Sabbath Rest',
        isSabbath: true,
        tempHigh: 22,
        tempLow: 12,
        condition: 'Partly Cloudy',
        rainProbability: 20,
        rainMm: 0.5,
        solarHours: 7.8,
        faoEt0Mm: 3.8,
        farmAction: 'Holy Sabbath Rest. Worship and medical missionary visitation in neighboring villages.',
      },
    ],
    agronomicAdvisory: {
      title: 'Mulanje & Shire Highlands Hydro-Agronomy',
      description:
        'High annual precipitation (up to 2,200 mm/yr per DCCMS) leached cations from Humic Acrisols (pH 4.8–5.7). Buffer planting pits with wood ash and composted biomass while anchoring slopes with Vetiveria zizanioides.',
      scriptureOrEgw: {
        quote:
          '“In the cultivation of the soil the thoughtful worker will find that treasures little dreamed of are opening up before him. No one can succeed in agriculture or gardening without attention to the laws Involved.”',
        source: 'Ellen G. White, Education, pp. 111–112 (ED 111.4)',
        egwCode: 'ED 111.4',
        verifiedUrl: 'https://m.egwwritings.org/en/search?query=ED+111.4',
      },
    },
  },
  {
    id: 'northern-highlands',
    name: 'Northern Highlands',
    stationName: 'Mzimba / Viphya Agro-Met Station (WMO 67581)',
    lat: -11.9,
    lng: 33.6,
    districts: 'Mzimba, Rumphi, Viphya Plateau, Chitipa',
    zoneTitle: 'Highland Savanna & Humic Plateau',
    elevation: '1,300m – 2,000m ASL',
    dccmsAnnualRainfallMm: '900 – 1,650 mm/yr (DCCMS Normal)',
    currentTemp: 23,
    feelsLike: 22,
    humidity: 58,
    windSpeedKmH: 15,
    solarKwhM2: 6.1,
    soilMoisturePct: 24.2,
    soilTempRootC: 20.1,
    faoEt0Mm: 4.3,
    sowingReadiness: 'Optimal for Thermophilic Composting & Legume Rotation',
    seasonName: 'High Insolation & Cool Nights',
    dailyForecasts: [
      {
        day: 'Today',
        date: 'Day 1',
        tempHigh: 24,
        tempLow: 12,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.4,
        faoEt0Mm: 4.4,
        farmAction: 'Build 1.5m³ thermophilic compost piles with Tithonia diversifolia and dry stover.',
      },
      {
        day: 'Day 2',
        date: 'Day 2',
        tempHigh: 25,
        tempLow: 13,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.5,
        faoEt0Mm: 4.5,
        farmAction: 'Cure and grade heirloom beans and open-pollinated maize to <12% moisture.',
      },
      {
        day: 'Day 3',
        date: 'Day 3',
        tempHigh: 23,
        tempLow: 12,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 1.5,
        solarHours: 8.2,
        faoEt0Mm: 4.1,
        farmAction: 'Incorporate 3kg nutrient-charged biochar into orchard planting pits.',
      },
      {
        day: 'Day 4',
        date: 'Day 4',
        tempHigh: 22,
        tempLow: 11,
        condition: 'Scattered Showers',
        rainProbability: 35,
        rainMm: 3.2,
        solarHours: 7.4,
        faoEt0Mm: 3.8,
        farmAction: 'Intercrop nitrogen-fixing pigeon peas (Nandolo) and Mucuna cover crops.',
      },
      {
        day: 'Day 5',
        date: 'Day 5',
        tempHigh: 24,
        tempLow: 12,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.0,
        faoEt0Mm: 4.3,
        farmAction: 'Maintain firebreaks around homestead woodlots and apiary Kenyan top-bar hives.',
      },
      {
        day: 'Friday',
        date: 'Prep Day',
        tempHigh: 23,
        tempLow: 12,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.1,
        faoEt0Mm: 4.2,
        farmAction: 'Complete field cultivation and bake whole-grain sourdough loaves before Friday sunset.',
      },
      {
        day: 'Sabbath',
        date: 'Sabbath Rest',
        isSabbath: true,
        tempHigh: 23,
        tempLow: 11,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.2,
        faoEt0Mm: 4.2,
        farmAction: 'Holy Sabbath Rest. Gather for rural outpost worship and literature ministry.',
      },
    ],
    agronomicAdvisory: {
      title: 'Mzimba, Rumphi & Misuku Soil Stewardship',
      description:
        'Orthic Ferralsols across the Mzimba plain respond strongly to biochar + thermophilic compost integration, while Misuku and Nyika foothills offer perennial gravity springs for Arabica coffee, wheat, and temperate orchards.',
      scriptureOrEgw: {
        quote:
          '“That I will give you the rain of your land in his due season, the first rain and the latter rain, that thou mayest gather in thy corn, and thy wine, and thine oil.”',
        source: 'Deuteronomy 11:14 (KJV)',
        verifiedUrl: 'https://bible-api.com/Deuteronomy%2011:14?translation=kjv',
      },
    },
  },
  {
    id: 'lakeside-belt',
    name: 'Lakeshore Basin',
    stationName: 'Salima Lakeshore Met Station (WMO 67586)',
    lat: -13.78,
    lng: 34.43,
    districts: 'Salima, Nkhotakota, Nkhata Bay, Karonga',
    zoneTitle: 'Eutric Fluvisol Alluvial Littoral Zone',
    elevation: '475m – 650m ASL',
    dccmsAnnualRainfallMm: '1,050 – 1,950 mm/yr (DCCMS Normal)',
    currentTemp: 28,
    feelsLike: 30,
    humidity: 66,
    windSpeedKmH: 18,
    solarKwhM2: 6.3,
    soilMoisturePct: 23.5,
    soilTempRootC: 25.8,
    faoEt0Mm: 5.2,
    sowingReadiness: 'Shallow Alluvial Aquifer Active · Solar Drip Irrigation',
    seasonName: 'Warm Littoral & High Solar Yield',
    dailyForecasts: [
      {
        day: 'Today',
        date: 'Day 1',
        tempHigh: 29,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.6,
        faoEt0Mm: 5.2,
        farmAction: 'Mulch banana circle basins with 15cm elephant grass to counter 5.2mm/day ET₀.',
      },
      {
        day: 'Day 2',
        date: 'Day 2',
        tempHigh: 30,
        tempLow: 21,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.8,
        faoEt0Mm: 5.4,
        farmAction: 'Run solar DC submersible pump during peak 10:00–14:00 irradiance to fill header tank.',
      },
      {
        day: 'Day 3',
        date: 'Day 3',
        tempHigh: 29,
        tempLow: 20,
        condition: 'Partly Cloudy',
        rainProbability: 25,
        rainMm: 1.8,
        solarHours: 8.5,
        faoEt0Mm: 4.9,
        farmAction: 'Apply aqueous neem leaf and wood-ash extract to protect brassicas from pests.',
      },
      {
        day: 'Day 4',
        date: 'Day 4',
        tempHigh: 28,
        tempLow: 19,
        condition: 'Scattered Showers',
        rainProbability: 35,
        rainMm: 3.5,
        solarHours: 7.9,
        faoEt0Mm: 4.6,
        farmAction: 'Mound alluvial silt ridges for orange-fleshed sweet potato and cassava cuttings.',
      },
      {
        day: 'Day 5',
        date: 'Day 5',
        tempHigh: 29,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.5,
        faoEt0Mm: 5.1,
        farmAction: 'Establish Moringa oleifera and pigeon pea alley-cropping shade rows.',
      },
      {
        day: 'Friday',
        date: 'Prep Day',
        tempHigh: 30,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.5,
        faoEt0Mm: 5.2,
        farmAction: 'Harvest papayas, mangoes, and cassava leaves before Friday evening Sabbath welcome.',
      },
      {
        day: 'Sabbath',
        date: 'Sabbath Rest',
        isSabbath: true,
        tempHigh: 29,
        tempLow: 19,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.6,
        faoEt0Mm: 5.1,
        farmAction: 'Holy Sabbath Rest. Rejoice in the Creator’s provision along the lakeshore.',
      },
    ],
    agronomicAdvisory: {
      title: 'Lakeshore Alluvial Basin & Evapotranspiration Management',
      description:
        'Unconsolidated lakeshore aquifers lie at 5m–20m depth (FAO AQUASTAT), ideal for 48V DC solar pumping. Because daily reference evapotranspiration (ET₀) exceeds 5.0 mm/day, use sunken mulch basins and living sweet-potato ground cover.',
      scriptureOrEgw: {
        quote:
          '“And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.”',
        source: 'Psalm 1:3 (KJV)',
        verifiedUrl: 'https://bible-api.com/Psalm%201:3?translation=kjv',
      },
    },
  },
  {
    id: 'lower-shire',
    name: 'Lower Shire Valley',
    stationName: 'Ngabu / Chikwawa Agro-Met Station (WMO 67692)',
    lat: -16.03,
    lng: 34.8,
    districts: 'Chikwawa, Nsanje, Balaka, Machinga',
    zoneTitle: 'Rift Valley Vertisol & Semi-Arid Basin',
    elevation: '50m – 500m ASL',
    dccmsAnnualRainfallMm: '750 – 850 mm/yr (DCCMS Normal)',
    currentTemp: 32,
    feelsLike: 34,
    humidity: 46,
    windSpeedKmH: 20,
    solarKwhM2: 6.5,
    soilMoisturePct: 19.4,
    soilTempRootC: 28.2,
    faoEt0Mm: 5.9,
    sowingReadiness: 'Zaï Water-Harvesting Pits & Subsurface Clay Olla Irrigation',
    seasonName: 'High Solar Insolation & Water Conservation Regime',
    dailyForecasts: [
      {
        day: 'Today',
        date: 'Day 1',
        tempHigh: 33,
        tempLow: 21,
        condition: 'Dry & Warm',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 10.0,
        faoEt0Mm: 5.9,
        farmAction: 'Excavate 30×30×20cm Zaï micro-catchment pits charged with kraal compost and biochar.',
      },
      {
        day: 'Day 2',
        date: 'Day 2',
        tempHigh: 34,
        tempLow: 22,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 10.2,
        faoEt0Mm: 6.1,
        farmAction: 'Seal dried Sorghum (Mapira) and Pearl Millet (Mchewere) in hermetic storage vessels.',
      },
      {
        day: 'Day 3',
        date: 'Day 3',
        tempHigh: 33,
        tempLow: 21,
        condition: 'Dry & Warm',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.8,
        faoEt0Mm: 5.8,
        farmAction: 'Refill buried unglazed clay ollas beside fruit saplings for zero-evaporation seepage.',
      },
      {
        day: 'Day 4',
        date: 'Day 4',
        tempHigh: 32,
        tempLow: 20,
        condition: 'Partly Cloudy',
        rainProbability: 15,
        rainMm: 0,
        solarHours: 9.0,
        faoEt0Mm: 5.4,
        farmAction: 'Erect 50% shade lattice over vegetable nursery seedbeds to lower leaf temperature.',
      },
      {
        day: 'Day 5',
        date: 'Day 5',
        tempHigh: 33,
        tempLow: 21,
        condition: 'Sunny',
        rainProbability: 10,
        rainMm: 0,
        solarHours: 9.7,
        faoEt0Mm: 5.7,
        farmAction: 'Wipe dust from solar PV panels at dawn to maintain peak MPPT charging current.',
      },
      {
        day: 'Friday',
        date: 'Prep Day',
        tempHigh: 33,
        tempLow: 21,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 9.9,
        faoEt0Mm: 5.8,
        farmAction: 'Complete heavy outdoor duties during cool dawn hours; prepare for Sabbath rest.',
      },
      {
        day: 'Sabbath',
        date: 'Sabbath Rest',
        isSabbath: true,
        tempHigh: 32,
        tempLow: 20,
        condition: 'Sunny',
        rainProbability: 5,
        rainMm: 0,
        solarHours: 10.0,
        faoEt0Mm: 5.7,
        farmAction: 'Holy Sabbath Rest. Worship under shaded veranda and share living water with neighbors.',
      },
    ],
    agronomicAdvisory: {
      title: 'Rift Valley Floor Dryland Farming Protocol',
      description:
        'With DCCMS annual rainfall normals of 750–850 mm/yr and high potential evapotranspiration (ET₀ ~5.8 mm/day), Pellic Vertisols (Makande black cotton clays) require no-till sunken Zaï pits, drought-hardy sorghum/millet, and deep mulch.',
      scriptureOrEgw: {
        quote:
          '“He turneth the wilderness into a standing water, and dry ground into watersprings. And there he maketh the hungry to dwell, that they may prepare a city for habitation.”',
        source: 'Psalm 107:35–36 (KJV)',
        verifiedUrl: 'https://bible-api.com/Psalm%20107:35-36?translation=kjv',
      },
    },
  },
];

function deriveDailyFarmAction(
  isSabbath: boolean,
  isFriday: boolean,
  rainMm: number,
  tempMax: number,
  et0Mm: number,
  fallbackAction: string
): string {
  if (isSabbath) {
    return 'Holy Sabbath Rest (Exodus 20:8–11). Cease field labor; gather for worship, nature study, and fellowship.';
  }
  if (isFriday) {
    return 'Preparation Day (Exodus 16:23): Complete garden harvesting, water storage checks, and Sabbath meal preparation before sunset.';
  }
  if (rainMm >= 5) {
    return `Active rainfall (${rainMm} mm forecast): Inspect contour vetiver swales, silt traps, and roof rainwater diverters.`;
  }
  if (tempMax >= 31 || et0Mm >= 5.2) {
    return `High evaporative demand (${tempMax}°C, ET₀ ${et0Mm} mm/day): Apply 10cm dry grass mulch around root crowns and irrigate at dawn.`;
  }
  return fallbackAction;
}

export function MalawiAgriWeatherForecast({ embedded = false }: { embedded?: boolean } = {}) {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('central-plateau');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [liveDataMap, setLiveDataMap] = useState<Record<string, any>>({});
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isServingOfflineCache, setIsServingOfflineCache] = useState<boolean>(false);
  const isOnline = useOnlineStatus();

  const baseRegion =
    MALAWI_REGIONS_WEATHER.find((r) => r.id === selectedRegionId) || MALAWI_REGIONS_WEATHER[0];

  const fetchLiveRegionWeather = useCallback(async (reg: RegionClimateProfile) => {
    const cachedEnvelope = getCachedWeather(reg.id);
    if (!navigator.onLine && cachedEnvelope?.data?.current) {
      setLiveDataMap((prev) => ({ ...prev, [reg.id]: cachedEnvelope.data }));
      setIsServingOfflineCache(true);
      setLastSyncedAt(
        new Date(cachedEnvelope.cachedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      return;
    }

    setIsLoadingLive(true);
    try {
      const params = new URLSearchParams({
        lat: String(reg.lat),
        lng: String(reg.lng),
        key: reg.id,
        name: reg.stationName,
        region: reg.name,
        altitude: reg.elevation,
      });
      const res = await fetch(`/api/weather?${params.toString()}`);
      const fromSwCache = res.headers.get('X-Outpost-Offline-Cache') === 'true';
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();
      if (data && data.current) {
        setLiveDataMap((prev) => ({ ...prev, [reg.id]: data }));
        setIsServingOfflineCache(fromSwCache || !navigator.onLine);
        if (!fromSwCache) {
          saveCachedWeather(reg.id, data);
        }
        setLastSyncedAt(
          new Date(data.lastUpdated || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      }
    } catch {
      // Fallback to cached weather forecast in localStorage or verified DCCMS climatological baseline if offline
      if (cachedEnvelope?.data?.current) {
        setLiveDataMap((prev) => ({ ...prev, [reg.id]: cachedEnvelope.data }));
        setIsServingOfflineCache(true);
        setLastSyncedAt(
          new Date(cachedEnvelope.cachedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      } else {
        setIsServingOfflineCache(!navigator.onLine);
      }
    } finally {
      setIsLoadingLive(false);
    }
  }, []);

  useEffect(() => {
    if (!liveDataMap[baseRegion.id]) {
      fetchLiveRegionWeather(baseRegion);
    }
  }, [baseRegion, liveDataMap, fetchLiveRegionWeather]);

  const livePayload = liveDataMap[baseRegion.id];

  // Merge live ECMWF / Open-Meteo satellite telemetry onto the region profile
  const mergedForecasts: DailyForecast[] =
    Array.isArray(livePayload?.daily) && livePayload.daily.length > 0
      ? livePayload.daily.map((d: any, idx: number) => {
          const fallbackDay =
            baseRegion.dailyForecasts[idx] ||
            baseRegion.dailyForecasts[baseRegion.dailyForecasts.length - 1];
          const isSabbath = Boolean(d.isSabbath);
          const isFriday = d.dayOfWeek === 'Fri' || d.fullDayName === 'Friday';
          const et0 = typeof d.faoEt0Mm === 'number' ? d.faoEt0Mm : fallbackDay.faoEt0Mm || 4.2;
          return {
            day: idx === 0 ? `Today (${d.dayOfWeek})` : isSabbath ? 'Sabbath' : d.fullDayName || d.dayOfWeek,
            date: d.date,
            isSabbath,
            tempHigh: typeof d.tempMaxC === 'number' ? d.tempMaxC : fallbackDay.tempHigh,
            tempLow: typeof d.tempMinC === 'number' ? d.tempMinC : fallbackDay.tempLow,
            condition: d.condition || fallbackDay.condition,
            rainProbability:
              typeof d.precipProbMax === 'number' ? d.precipProbMax : fallbackDay.rainProbability,
            rainMm: typeof d.precipSumMm === 'number' ? d.precipSumMm : fallbackDay.rainMm,
            solarHours:
              typeof d.sunshineHours === 'number' ? d.sunshineHours : fallbackDay.solarHours,
            faoEt0Mm: et0,
            farmAction: deriveDailyFarmAction(
              isSabbath,
              isFriday,
              d.precipSumMm || 0,
              d.tempMaxC || fallbackDay.tempHigh,
              et0,
              fallbackDay.farmAction
            ),
          };
        })
      : baseRegion.dailyForecasts;

  const region: RegionClimateProfile = {
    ...baseRegion,
    currentTemp: livePayload?.current?.tempC ?? baseRegion.currentTemp,
    feelsLike: livePayload?.current?.feelsLikeC ?? baseRegion.feelsLike,
    humidity: livePayload?.current?.humidity ?? baseRegion.humidity,
    windSpeedKmH: livePayload?.current?.windSpeedKmH ?? baseRegion.windSpeedKmH,
    solarKwhM2: livePayload?.current?.solarKwhM2 ?? baseRegion.solarKwhM2,
    soilMoisturePct:
      livePayload?.current?.soilMoistureVolumetricPct ?? baseRegion.soilMoisturePct,
    soilTempRootC: livePayload?.current?.soilTempRootC ?? baseRegion.soilTempRootC,
    faoEt0Mm: livePayload?.current?.faoEt0Mm ?? baseRegion.faoEt0Mm,
    dailyForecasts: mergedForecasts,
  };

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
      className={embedded ? 'w-full pt-2' : 'max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-18'}
    >
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm relative overflow-hidden">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-stone-200/80 dark:border-emerald-950/80 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                Live Agro-Meteorological Telemetry
              </span>
              <span aria-hidden="true">·</span>
              <span>ECMWF IFS / ERA5-Land & DCCMS Malawi</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {!isOnline || isServingOfflineCache
                  ? `Offline Cached Forecast (${lastSyncedAt || 'DCCMS Baseline'})`
                  : livePayload
                    ? `Live Synced (${lastSyncedAt || 'Now'})`
                    : 'DCCMS Station Normals'}
              </span>
              {(!isOnline || isServingOfflineCache) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/50 font-mono text-caption font-semibold">
                  <WifiOff size={11} />
                  <span>Offline Mode · Cached Data</span>
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Regional Climate, Soil Physics & Agronomy Forecast
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Real-time satellite and meteorological station readings for root-zone soil moisture (0–9cm), FAO-56 Penman-Monteith evapotranspiration (ET₀), solar insolation, and 7-day precipitation across Malawi’s 5 agro-climatic zones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fetchLiveRegionWeather(baseRegion)}
              disabled={isLoadingLive}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-emerald-800 dark:hover:text-amber-300 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-emerald-800/60 transition-colors cursor-pointer whitespace-nowrap"
              title="Fetch latest live satellite telemetry from Open-Meteo / ECMWF"
            >
              <RefreshCw size={13} className={cn(isLoadingLive && 'animate-spin')} />
              <span>{isLoadingLive ? 'Syncing...' : 'Sync Live API'}</span>
            </button>

            <Link
              to="/seasons"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-amber-300 hover:text-emerald-950 dark:hover:text-amber-100 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-emerald-800/60 transition-colors whitespace-nowrap"
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
                  type="button"
                  onClick={() => {
                    setSelectedRegionId(r.id);
                    setSelectedDayIndex(0);
                  }}
                  className={cn(
                    'flex flex-col text-left px-4 py-2.5 rounded-2xl border transition-colors duration-150 shrink-0 cursor-pointer',
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-600 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-emerald-950/80'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={13}
                      className={
                        isSelected ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                      }
                    />
                    <span className="font-display font-bold text-xs sm:text-sm whitespace-nowrap">
                      {r.name}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'text-caption font-mono mt-0.5 truncate max-w-[185px] tabular-nums',
                      isSelected ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400'
                    )}
                  >
                    {Math.abs(r.lat).toFixed(2)}°S, {r.lng.toFixed(2)}°E · {r.districts.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Primary Regional Status Card */}
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-emerald-900/50 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Current Live Temperature & Station Reference */}
            <div className="md:col-span-4 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-stone-200/80 dark:border-emerald-950/80 pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums">
                <span className="font-semibold text-emerald-800 dark:text-amber-300 truncate">
                  {region.stationName}
                </span>
                <span className="text-stone-500 dark:text-stone-400 shrink-0">
                  {region.elevation}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-1">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 dark:bg-amber-950/70 border border-amber-300/80 dark:border-amber-700/60 flex items-center justify-center shrink-0">
                  {getWeatherIcon(activeDay.condition, 28)}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1 font-mono tabular-nums">
                    <span className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
                      {selectedDayIndex === 0 ? region.currentTemp : activeDay.tempHigh}°
                    </span>
                    <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
                      / {activeDay.tempLow}°C
                    </span>
                  </div>
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    {activeDay.condition} · {region.dccmsAnnualRainfallMm}
                  </span>
                </div>
              </div>

              <div className="mt-1 pt-2 border-t border-stone-200/70 dark:border-emerald-900/40 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                <Sprout size={14} className="shrink-0" />
                <span className="truncate">{region.sowingReadiness}</span>
              </div>
            </div>

            {/* Center: 4 Verifiable Agro-Climatic & Soil Physics Metrics */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Precipitation & FAO ET0 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-sky-600 dark:text-sky-400 mb-1">
                  <span className="text-caption font-medium text-stone-500 dark:text-stone-400">
                    Precipitation
                  </span>
                  <CloudRain size={15} />
                </div>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {activeDay.rainProbability}%
                  </span>
                  <span className="text-xs text-stone-500">({activeDay.rainMm} mm)</span>
                </div>
                <span className="text-caption text-stone-500 mt-1 font-mono tabular-nums">
                  ET₀: {activeDay.faoEt0Mm ?? region.faoEt0Mm} mm/d
                </span>
              </div>

              {/* Root-Zone Volumetric Soil Moisture (0-9cm) */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
                  <span className="text-caption font-medium text-stone-500 dark:text-stone-400">
                    Soil Moisture (0–9cm)
                  </span>
                  <Droplets size={15} />
                </div>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {region.soilMoisturePct}%
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    Vol.
                  </span>
                </div>
                <span className="text-caption text-stone-500 mt-1 font-mono tabular-nums">
                  Root Temp: {region.soilTempRootC}°C
                </span>
              </div>

              {/* Solar Insolation */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
                  <span className="text-caption font-medium text-stone-500 dark:text-stone-400">
                    Solar Insolation
                  </span>
                  <Sun size={15} />
                </div>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {region.solarKwhM2}
                  </span>
                  <span className="text-xs text-stone-500">kWh/m²</span>
                </div>
                <span className="text-caption text-stone-500 mt-1 font-mono tabular-nums">
                  {activeDay.solarHours}h sunshine
                </span>
              </div>

              {/* Wind & Humidity */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-emerald-950/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-teal-600 dark:text-teal-400 mb-1">
                  <span className="text-caption font-medium text-stone-500 dark:text-stone-400">
                    Wind & Humidity
                  </span>
                  <Wind size={15} />
                </div>
                <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {region.windSpeedKmH}
                  </span>
                  <span className="text-xs text-stone-500">km/h</span>
                </div>
                <span className="text-caption text-stone-500 mt-1 font-mono tabular-nums">
                  {region.humidity}% rel. humidity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 7-Day Agronomic Forecast Matrix */}
        <div className="mt-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Calendar size={14} className="text-amber-600 dark:text-amber-400" />
              <span>7-Day Meteorological Forecast & Homestead Schedule</span>
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Select any day to inspect field tasks & Sabbath preparation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {region.dailyForecasts.map((forecast, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={`${forecast.day}-${idx}`}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={cn(
                    'p-3 rounded-2xl border text-left transition-colors flex flex-col justify-between gap-2 cursor-pointer',
                    forecast.isSabbath
                      ? isSelected
                        ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-xs'
                        : 'bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100/80 border-amber-300/80 dark:border-amber-800/60 text-stone-900 dark:text-amber-200'
                      : isSelected
                        ? 'bg-emerald-900 text-white border-emerald-600 shadow-xs'
                        : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/80 border-stone-200/90 dark:border-emerald-950/80 text-stone-800 dark:text-stone-200'
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">{forecast.day}</span>
                    {forecast.isSabbath && (
                      <span className="text-caption font-mono font-semibold opacity-85 shrink-0">
                        Rest
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center shrink-0">
                      {getWeatherIcon(forecast.condition, 16)}
                    </div>
                    <div className="flex flex-col font-mono tabular-nums">
                      <span className="font-bold text-sm">{forecast.tempHigh}°</span>
                      <span className="text-caption opacity-75">{forecast.tempLow}°C</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-caption pt-1 border-t border-current/10 font-mono tabular-nums">
                    <span className="flex items-center gap-1">
                      <CloudRain size={11} />
                      {forecast.rainProbability}%
                    </span>
                    <span>{forecast.solarHours}h</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Day Homestead Farming Action */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-[#102217] border border-amber-200/90 dark:border-emerald-800/60 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 dark:bg-emerald-900/80 border border-amber-300/80 dark:border-emerald-700/60 flex items-center justify-center shrink-0 text-amber-900 dark:text-amber-200">
              <Sprout size={18} />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <span className="font-semibold text-amber-900 dark:text-amber-300">
                  Agronomic Field Guidance
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{activeDay.date}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {region.name} ({region.districts})
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                {activeDay.farmAction}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-end">
            <Link
              to="/agriculture"
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Edenic Soil Manual</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* 5. Verifiable Source Attribution & Agricultural Guidance Bar */}
        <div className="mt-4 pt-4 border-t border-stone-200/80 dark:border-emerald-950/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 relative z-10 text-xs">
          <div className="flex items-start sm:items-center gap-2">
            <Feather size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-stone-600 dark:text-stone-400 italic">
              {region.agronomicAdvisory.scriptureOrEgw.quote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-caption">
            <a
              href={region.agronomicAdvisory.scriptureOrEgw.verifiedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-800 dark:text-amber-300 hover:underline inline-flex items-center gap-1"
            >
              <span>{region.agronomicAdvisory.scriptureOrEgw.source}</span>
              <ExternalLink size={11} />
            </a>

            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">
              ·
            </span>

            <a
              href={`https://open-meteo.com/en/docs#latitude=${region.lat}&longitude=${region.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <ShieldCheck size={12} />
              <span>ECMWF / Open-Meteo API ({Math.abs(region.lat).toFixed(2)}°S, {region.lng.toFixed(2)}°E)</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MalawiAgriWeatherForecast;
