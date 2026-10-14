import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react';
import {
  BookOpen,
  Compass,
  Sprout,
  ArrowRight,
  Sun,
  Droplets,
  Calculator,
  Feather,
  Layers,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Mountain,
  Trees,
  Waves,
  ShieldCheck,
  HeartPulse,
  UtensilsCrossed,
  ChevronDown,
  CloudSun,
  Search,
  Copy,
  Check,
  FileText,
  Calendar,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { SEASONAL_CALENDAR } from '@/data/skillsAndSeasons';
import { CountryLivingIntroQuote } from '@/components/home/CountryLivingIntroQuote';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon, CountryIconName } from '@/components/icons/CountryIcons';
import { CountryImage } from '@/components/common/CountryImage';
import { COUNTRY_IMAGES } from '@/assets/images';
import {
  DISTRICT_LIST,
  HOMESTEAD_GENERAL_CONSTANTS,
  PLANTING_PIT_SPECS,
} from '@/constants';
import { calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { fetchVerifiedTelemetryWithFallback } from '@/lib/apiClient';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const DistrictRegistryExplorer = lazy(() =>
  import('@/components/home/DistrictRegistryExplorer').then((m) => ({
    default: m.DistrictRegistryExplorer,
  }))
);
const PropheticTimeline1844 = lazy(() =>
  import('@/components/vision/PropheticTimeline1844').then((m) => ({
    default: m.PropheticTimeline1844,
  }))
);
const MalawiAgriWeatherForecast = lazy(() =>
  import('@/components/home/MalawiAgriWeatherForecast').then((m) => ({
    default: m.MalawiAgriWeatherForecast,
  }))
);
const SoilStrataBlueprint = lazy(() =>
  import('@/components/home/SoilStrataBlueprint').then((m) => ({
    default: m.SoilStrataBlueprint,
  }))
);
const OnboardingWizard = lazy(() =>
  import('@/components/onboarding/OnboardingWizard').then((m) => ({
    default: m.OnboardingWizard,
  }))
);
const BeginnerGlossaryModal = lazy(() =>
  import('@/components/common/BeginnerGlossaryModal').then((m) => ({
    default: m.BeginnerGlossaryModal,
  }))
);
const HomesteadMasterplanModal = lazy(() =>
  import('@/components/home/HomesteadMasterplanModal').then((m) => ({
    default: m.HomesteadMasterplanModal,
  }))
);

type ClimateLifestyleId = 'highlands' | 'mid-hills' | 'lakeshore';

const CLIMATE_LIFESTYLE_ZONES: {
  id: ClimateLifestyleId;
  title: string;
  elevation: string;
  feel: string;
  crops: string;
  waterNote: string;
  districts: { id: string; name: string }[];
}[] = [
  {
    id: 'highlands',
    title: 'Cool Mist Highlands',
    elevation: '1,200–2,200m',
    feel: 'Crisp mountain climate (14–23°C), pine ridges, low disease pressure, and temperate perennial growth.',
    crops: 'Apples, peaches, plums, Irish potatoes, wheat, garlic & berries',
    waterNote: 'Gravity mountain springs, perennial dambos & 950–1,600 mm/yr rain',
    districts: [
      { id: 'dedza', name: 'Dedza' },
      { id: 'mzimba', name: 'Mzimba' },
      { id: 'zomba', name: 'Zomba' },
      { id: 'ntcheu', name: 'Ntcheu' },
      { id: 'rumphi', name: 'Rumphi' },
      { id: 'chitipa', name: 'Chitipa' },
    ],
  },
  {
    id: 'mid-hills',
    title: 'Fertile Mid-Valleys',
    elevation: '800–1,200m',
    feel: 'Temperate plateau conditions (24–28°C), fertile red Katondo loam, and high agricultural versatility.',
    crops: 'Avocados, macadamia, maize, soya, groundnuts & sweet potatoes',
    waterNote: 'Shallow hand-pump wells (12–25m) & 850–1,200 mm/yr rain',
    districts: [
      { id: 'lilongwe', name: 'Lilongwe Rural' },
      { id: 'dowa', name: 'Dowa' },
      { id: 'kasungu', name: 'Kasungu' },
      { id: 'mchinji', name: 'Mchinji' },
      { id: 'thyolo', name: 'Thyolo' },
      { id: 'ntchisi', name: 'Ntchisi' },
    ],
  },
  {
    id: 'lakeshore',
    title: 'Warm Lakeshore & Basins',
    elevation: '400–800m',
    feel: 'Tropical climate (26–32°C), high solar insolation, and rapid year-round perennial biomass accumulation.',
    crops: 'Mangoes, citrus, papaya, cassava, pigeon peas, rice & moringa',
    waterNote: 'High-yield alluvial aquifers (6–18m) & up to 2,200 mm/yr in Nkhata Bay',
    districts: [
      { id: 'nkhata-bay', name: 'Nkhata Bay' },
      { id: 'salima', name: 'Salima' },
      { id: 'karonga', name: 'Karonga' },
      { id: 'nkhotakota', name: 'Nkhotakota' },
      { id: 'mangochi', name: 'Mangochi' },
      { id: 'balaka', name: 'Balaka' },
    ],
  },
];

const POWER_TOOLS_DOCK = [
  {
    title: 'District GIS Scout Map',
    meta: 'Aquifers · Contours · Agro-Zones',
    desc: 'Inspect borehole depths, perennial rivers, and customary land zones before visiting a plot.',
    to: '/scout-map',
    icon: Compass,
    accent: 'text-cyan-600 dark:text-cyan-300',
  },
  {
    title: 'Property Evaluator',
    meta: 'Water · Soil · Title Safety',
    desc: 'Score prospective rural property across weighted criteria for water access, soil, and tenure security.',
    to: '/where?tab=evaluator',
    icon: ShieldCheck,
    accent: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    title: 'Homestead Calculators',
    meta: 'Solar · Cisterns · BoQ',
    desc: 'Size solar borehole pumps, roof rainwater storage, food storage quotas, and itemized build budgets.',
    to: '/calculators',
    icon: Calculator,
    accent: 'text-amber-600 dark:text-amber-300',
  },
  {
    title: 'Sanitarium & Health',
    meta: 'Hydrotherapy · Charcoal · Herbs',
    desc: 'Rational fomentation protocols, poultices, and the 8 physiological laws of health.',
    to: '/sanitarium',
    icon: HeartPulse,
    accent: 'text-rose-600 dark:text-rose-300',
  },
  {
    title: 'Edenic Country Kitchen',
    meta: 'Unfermented Bread · Sinjiro',
    desc: 'Whole-grain hearth baking, groundnut emulsions, and solar food preservation.',
    to: '/kitchen',
    icon: UtensilsCrossed,
    accent: 'text-amber-600 dark:text-amber-300',
  },
  {
    title: 'Country Skills Manual',
    meta: 'Ram Pumps · Earth Blocks',
    desc: 'Step-by-step field blueprints for off-grid water, natural building, and seed saving.',
    to: '/skills',
    icon: Layers,
    accent: 'text-sky-600 dark:text-sky-300',
  },
];

const CORE_ENTRY_POINTS = [
  {
    title: 'Land & District GIS Scout',
    description: 'Inspect groundwater aquifers, contour elevations, and customary land tenure protocols across all 28 districts.',
    to: '/scout-map',
    icon: Compass,
    accent: 'text-cyan-600 dark:text-cyan-400',
    meta: '28 Districts · Hydro-GIS',
  },
  {
    title: 'Off-Grid Sizing Calculators',
    description: 'Size solar borehole pumps, rainwater cistern storage, food security quotas, and itemized bills of quantities.',
    to: '/calculators',
    icon: Calculator,
    accent: 'text-amber-600 dark:text-amber-400',
    meta: 'Solar · Water · BoQ',
  },
  {
    title: 'Edenic Agriculture & Living Soil',
    description: 'Establish deep 3×3×3ft tree planting pits, biochar strata, and drought-resilient bio-intensive orchard guilds.',
    to: '/agriculture',
    icon: Sprout,
    accent: 'text-emerald-600 dark:text-emerald-400',
    meta: '3×3×3ft Pits · Living Soil',
  },
  {
    title: 'Sanitarium & Natural Health',
    description: 'Access rational hydrotherapy fomentation guides, charcoal poultices, and NEWSTART health laws.',
    to: '/sanitarium',
    icon: HeartPulse,
    accent: 'text-rose-600 dark:text-rose-400',
    meta: 'Hydrotherapy · Herbs · Laws',
  },
  {
    title: 'Country Skills & Outpost Blueprints',
    description: 'Master hydraulic ram pumps, compressed earth brick masonry, solar food dehydration, and seed saving.',
    to: '/skills',
    icon: Layers,
    accent: 'text-sky-600 dark:text-sky-400',
    meta: '25 Field Manuals · Trades',
  },
  {
    title: 'Prophetic Exodus & Family Altar',
    description: 'Study 1844 sanctuary blueprints, daily Spirit of Prophecy family altar counsel, and sabbath sunset guards.',
    to: '/vision',
    icon: BookOpen,
    accent: 'text-amber-600 dark:text-amber-400',
    meta: '1844 Sanctuary · Devotional',
  },
];

const FOUR_PILLARS: {
  number: string;
  title: string;
  subtitle: string;
  iconName: CountryIconName;
  illustrationImage: string;
  illustrationAlt: string;
  summary: string;
  proofLine: string;
  links: { label: string; to: string }[];
}[] = [
  {
    number: '01',
    title: 'Why We Leave the Cities',
    subtitle: 'Prophetic & Family Purpose',
    iconName: 'prophecy-1844',
    illustrationImage: COUNTRY_IMAGES.jerusalemSiege,
    illustrationAlt: 'Prophetic exodus and flight to mountain sanctuary',
    summary:
      'Explore the biblical and prophetic foundation for country living, family sanctuaries, and practical rural education.',
    proofLine: 'EGW Estate · Daniel 8:14',
    links: [
      { label: 'Prophetic Timeline', to: '/vision' },
      { label: 'Daily Devotionals', to: '/devotional' },
      { label: 'Transition Roadmap', to: '/tracker' },
    ],
  },
  {
    number: '02',
    title: 'Finding Water-Rich, Legal Land',
    subtitle: '28 Districts & Customary Law',
    iconName: 'map',
    illustrationImage: COUNTRY_IMAGES.permacultureWaterHydraulics,
    illustrationAlt: 'Off-grid gravity hydraulics, ram pump water lifting, and mountain aquifers',
    summary:
      'Evaluate groundwater aquifers, customary land titles, and community protocols across all 28 districts in Malawi.',
    proofLine: 'Land Act 2016 · AQUASTAT',
    links: [
      { label: 'District GIS Map', to: '/scout-map' },
      { label: 'Property Evaluation Rubric', to: '/where?tab=evaluator' },
      { label: 'Land Tenure & Protocols', to: '/where' },
    ],
  },
  {
    number: '03',
    title: 'Growing Food & Harvesting Sun',
    subtitle: 'Permaculture & Off-Grid Sizing',
    iconName: 'soil',
    illustrationImage: COUNTRY_IMAGES.edenicDeepPlantingPit,
    illustrationAlt: 'Edenic 3x3x3ft deep planting pit strata and biochar living soil',
    summary:
      'Establish bio-intensive garden guilds, 3×3×3ft tree planting pits, rainwater harvesting, and off-grid solar infrastructure.',
    proofLine: 'DCCMS · FAO HWSD v2.0',
    links: [
      { label: 'Solar & Water Calculators', to: '/calculators' },
      { label: 'Agronomy & Tree Pits', to: '/agriculture' },
      { label: 'Seasonal Almanac', to: '/seasons' },
    ],
  },
  {
    number: '04',
    title: 'Living Debt-Free & Self-Reliant',
    subtitle: 'Practical Skills & Natural Health',
    iconName: 'outpost',
    illustrationImage: COUNTRY_IMAGES.ruralIndustrialSanctuary,
    illustrationAlt: 'Avondale Madison trades workshop and rural family sanctuary',
    summary:
      'Develop essential self-reliance skills, medical missionary principles, and sustainable rural outpost campuses.',
    proofLine: 'Avondale Model · 25 Manuals',
    links: [
      { label: 'Outpost Blueprints', to: '/blueprints' },
      { label: 'Sanitarium Dispensary', to: '/sanitarium' },
      { label: 'Country Skills Manual', to: '/skills' },
    ],
  },
];

const PROPHETIC_PLATES_PREVIEW = [
  {
    epoch: '1844',
    title: 'Heavenly Sanctuary Cleansed',
    image: COUNTRY_IMAGES.sanctuary1844Judgment,
  },
  {
    epoch: 'Rev 14',
    title: 'Three Angels’ Proclamation',
    image: COUNTRY_IMAGES.threeAngelsProclamation,
  },
  {
    epoch: 'Outposts',
    title: 'Outpost Centers Established',
    image: COUNTRY_IMAGES.outpostMissionCenter,
  },
  {
    epoch: '5T 464',
    title: 'The Siege Signal & Flight',
    image: COUNTRY_IMAGES.siegeSignalExodus,
  },
  {
    epoch: 'GC 629',
    title: 'Mountain Refuge & Bread Given',
    image: COUNTRY_IMAGES.timeOfTroubleRefuge,
  },
  {
    epoch: 'Rev 19',
    title: 'The Glorious Appearing',
    image: COUNTRY_IMAGES.secondComingDeliverance,
  },
];

const MALAWI_SUNSET_BY_MONTH: Record<
  number,
  { north: string; central: string; south: string; guardCentral: string }
> = {
  0: { north: '18:16', central: '18:19', south: '18:23', guardCentral: '17:49' },
  1: { north: '18:12', central: '18:13', south: '18:15', guardCentral: '17:43' },
  2: { north: '17:59', central: '17:58', south: '17:57', guardCentral: '17:28' },
  3: { north: '17:43', central: '17:39', south: '17:36', guardCentral: '17:09' },
  4: { north: '17:34', central: '17:28', south: '17:22', guardCentral: '16:58' },
  5: { north: '17:35', central: '17:27', south: '17:20', guardCentral: '16:57' },
  6: { north: '17:41', central: '17:34', south: '17:28', guardCentral: '17:04' },
  7: { north: '17:46', central: '17:42', south: '17:38', guardCentral: '17:12' },
  8: { north: '17:47', central: '17:45', south: '17:43', guardCentral: '17:15' },
  9: { north: '17:49', central: '17:50', south: '17:51', guardCentral: '17:20' },
  10: { north: '17:58', central: '18:01', south: '18:04', guardCentral: '17:31' },
  11: { north: '18:11', central: '18:15', south: '18:19', guardCentral: '17:45' },
};

type YouthAgeTrack = 'ages-4-8' | 'ages-9-13' | 'ages-14-18';

const FAMILY_NATURE_CURRICULUM: Record<
  YouthAgeTrack,
  {
    label: string;
    subtitle: string;
    counselRef: string;
    objectLesson: string;
    practicalSkill: string;
    sabbathWalkPrompt: string;
    linkLabel: string;
    linkTo: string;
  }
> = {
  'ages-4-8': {
    label: 'Ages 4–8',
    subtitle: 'Nature’s First Lesson Book',
    counselRef: 'Child Guidance, p. 46.1',
    objectLesson:
      'Planting pigeon-pea and pumpkin seeds in a small child’s garden plot to watch germination, root faith, and God’s care for birds.',
    practicalSkill:
      'Gathering dry kindling, feeding free-range hens, and washing fresh garden greens for Friday preparation.',
    sabbathWalkPrompt:
      'Count 5 different bird songs or wildflower shapes along the stream and thank the Creator for each one.',
    linkLabel: 'Open Family Curriculum',
    linkTo: '/blueprints?tab=education',
  },
  'ages-9-13': {
    label: 'Ages 9–13',
    subtitle: 'Garden Stewardship & Hearth Baking',
    counselRef: 'Education, p. 219.2',
    objectLesson:
      'Layering a 3×3×3ft orchard pit with topsoil, compost, and biochar—learning how deep preparation bears sweet fruit in drought.',
    practicalSkill:
      'Baking unfermented whole-grain Sabbath bread, mixing groundnut sinjiro, and preparing simple charcoal poultices.',
    sabbathWalkPrompt:
      'Trace how mountain spring water flows into the terraced swales and compare it to Psalm 1:3.',
    linkLabel: 'Open Country Kitchen',
    linkTo: '/kitchen',
  },
  'ages-14-18': {
    label: 'Ages 14–18',
    subtitle: 'Avondale Trades & Medical Ministry',
    counselRef: 'Counsels to Parents & Teachers, p. 307',
    objectLesson:
      'Harmonizing head, hand, and heart—mastering off-grid engineering so youth are never helpless or dependent on city wages.',
    practicalSkill:
      'Sizing 48V solar arrays, tuning hydraulic ram pumps, pressing earthen blocks, and administering rational hydrotherapy.',
    sabbathWalkPrompt:
      'Review the 1844 Sanctuary timeline and discuss how country outposts serve neighboring villages.',
    linkLabel: 'Open 25 Skills Manual',
    linkTo: '/skills',
  },
};

export default function Home() {
  const { theme, isLight, isDark, isField } = useTheme();
  const isCharcoal = false;
  const isSapphire = false;
  const isSienna = false;
  const isMidnight = false;

  const [showWelcomeQuote, setShowWelcomeQuote] = useState(false);
  const [showBeginnerWizard, setShowBeginnerWizard] = useState(false);
  const [showBeginnerGlossary, setShowBeginnerGlossary] = useState(false);
  const [glossaryInitialTab, setGlossaryInitialTab] = useState<'glossary' | 'visual-guide'>('glossary');
  const [isMasterplanOpen, setIsMasterplanOpen] = useState(false);

  const [selectedClimateZone, setSelectedClimateZone] = useState<ClimateLifestyleId>('highlands');
  const [sceneryStyle, setSceneryStyle] = useState<'illustrated' | 'vector'>('illustrated');
  const [selectedAgeTrack, setSelectedAgeTrack] = useState<YouthAgeTrack>('ages-4-8');
  const [showFullDistrictMatrix, setShowFullDistrictMatrix] = useState(false);
  const [showFullPropheticChart, setShowFullPropheticChart] = useState(false);
  const [activeDeepTelemetry, setActiveDeepTelemetry] = useState<'none' | 'weather' | 'strata'>('none');
  const [devotionalIndex, setDevotionalIndex] = useState<number>(0);

  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long' });
  const sabbathSunset = MALAWI_SUNSET_BY_MONTH[currentMonth] || MALAWI_SUNSET_BY_MONTH[9];
  const activeYouthTrack = FAMILY_NATURE_CURRICULUM[selectedAgeTrack];

  // Live Interactive Homestead Sizer State (Directly accessible in Hero)
  const [quickFamilySize, setQuickFamilySize] = useState<number>(5);
  const [quickDistrictId, setQuickDistrictId] = useActiveHomesteadDistrict();
  const [quickRoofAreaSqm, setQuickRoofAreaSqm] = useState<number>(90);
  const [sizerLiveTelemetry, setSizerLiveTelemetry] = useState<any>(null);
  const [isLoadingSizerTelemetry, setIsLoadingSizerTelemetry] = useState<boolean>(false);

  const quickDistrict = useMemo(() => {
    return DISTRICT_LIST.find((d) => d.id === quickDistrictId) || DISTRICT_LIST[0];
  }, [quickDistrictId]);

  const quickPitSpec = useMemo(() => {
    return (
      PLANTING_PIT_SPECS[quickDistrict.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit
    );
  }, [quickDistrict]);

  const activeClimateZone = useMemo(() => {
    return (
      CLIMATE_LIFESTYLE_ZONES.find((z) => z.id === selectedClimateZone) ||
      CLIMATE_LIFESTYLE_ZONES[0]
    );
  }, [selectedClimateZone]);

  const [districtSearchQuery, setDistrictSearchQuery] = useState<string>('');

  const searchableDistricts = useMemo(() => {
    const q = districtSearchQuery.trim().toLowerCase();
    if (!q) return activeClimateZone.districts;
    return DISTRICT_LIST.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.primarySoil.toLowerCase().includes(q)
    ).map((d) => ({ id: d.id, name: d.name, rainfallMm: d.rainfallAnnualMm }));
  }, [districtSearchQuery, activeClimateZone]);

  useEffect(() => {
    let cancelled = false;
    async function loadSizerTelemetry() {
      setIsLoadingSizerTelemetry(true);
      try {
        const data = await fetchVerifiedTelemetryWithFallback({
          lat: quickDistrict.lat,
          lng: quickDistrict.lng,
          key: quickDistrict.id,
          name: `${quickDistrict.name} District`,
          region: quickDistrict.region,
        });
        if (!cancelled && data?.verified) {
          setSizerLiveTelemetry(data);
        }
      } catch {
        // Fallback to DCCMS / FAO registry baseline
      } finally {
        if (!cancelled) setIsLoadingSizerTelemetry(false);
      }
    }
    loadSizerTelemetry();
    return () => {
      cancelled = true;
    };
  }, [quickDistrict]);

  const quickEstimates = useMemo(() => {
    const stapleAcres = +(
      quickFamilySize * HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_PER_PERSON_STAPLE
    ).toFixed(2);
    const orchardAcres = +(
      quickFamilySize * HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_PER_PERSON_ORCHARD
    ).toFixed(2);
    const gardenShelterAcres = HOMESTEAD_GENERAL_CONSTANTS.LAND_ACRES_BASE_WOODLOT_SHELTER;
    const totalAcres = +(stapleAcres + orchardAcres + gardenShelterAcres).toFixed(2);

    const annualRainwaterLiters = Math.round(
      quickRoofAreaSqm *
        quickDistrict.rainfallAnnualMm *
        HOMESTEAD_GENERAL_CONSTANTS.DEFAULT_ROOF_RUNOFF_COEFF
    );

    const effectiveSunHours =
      sizerLiveTelemetry?.telemetry?.livePeakSunHoursKwh || quickDistrict.solarKwhDay;

    const dailyEnergyKwh = +(1.8 + quickFamilySize * 0.45).toFixed(1);
    const recommendedSolarKw = +(
      dailyEnergyKwh /
      (effectiveSunHours * HOMESTEAD_GENERAL_CONSTANTS.SOLAR_SYSTEM_EFFICIENCY)
    ).toFixed(2);
    const recommendedBatteryKwh = +(dailyEnergyKwh * 1.6).toFixed(1);

    const orchardPitCount = Math.max(12, Math.round(orchardAcres * 48));
    const totalBiocharKg = +(orchardPitCount * quickPitSpec.biocharKgPerPit).toFixed(0);

    return {
      stapleAcres,
      orchardAcres,
      gardenShelterAcres,
      totalAcres,
      annualRainwaterLiters,
      effectiveSunHours,
      recommendedSolarKw,
      recommendedBatteryKwh,
      orchardPitCount,
      totalBiocharKg,
    };
  }, [quickFamilySize, quickDistrict, quickRoofAreaSqm, quickPitSpec, sizerLiveTelemetry]);

  const [copiedSizerPlan, setCopiedSizerPlan] = useState(false);

  const autonomyIndex = useMemo(() => {
    const targetAnnualWater = quickFamilySize * 100 * 365;
    const waterScore = Math.min(100, Math.round((quickEstimates.annualRainwaterLiters / targetAnnualWater) * 100));
    const solarScore = Math.min(100, Math.round((quickEstimates.effectiveSunHours / 5.2) * 100));
    const landScore = Math.min(100, Math.round((quickEstimates.totalAcres / (quickFamilySize * 0.6)) * 100));
    return Math.min(99, Math.max(68, Math.round(waterScore * 0.4 + solarScore * 0.35 + landScore * 0.25)));
  }, [quickEstimates, quickFamilySize]);

  const handleCopySizerPlan = () => {
    const text = `OUTPOST LIVING — HOMESTEAD SPECIFICATION
Target District: ${quickDistrict.name} (${quickDistrict.region} Region)
Annual Rainfall: ${quickDistrict.rainfallAnnualMm} mm/yr | Soil: ${quickDistrict.primarySoil}
Household Size: ${quickFamilySize} people | Roof Catchment: ${quickRoofAreaSqm} m²

ESTIMATED AUTONOMY & CAPACITY:
• Land Required: ${quickEstimates.totalAcres} acres (${quickEstimates.stapleAcres}ac crops, ${quickEstimates.orchardAcres}ac orchard)
• 3×3×3ft Planting Pits: ${quickEstimates.orchardPitCount} pits (${quickEstimates.totalBiocharKg} kg biochar)
• Annual Rainwater: ~${Math.round(quickEstimates.annualRainwaterLiters / 1000)}k Liters (~${Math.max(1, Math.round(quickEstimates.annualRainwaterLiters / (quickFamilySize * 100 * 30)))} mos dry reserve)
• Off-Grid Solar PV: ${quickEstimates.recommendedSolarKw} kWp array
• Battery Storage: ${quickEstimates.recommendedBatteryKwh} kWh 48V bank
• Autonomy Resilience Score: ${autonomyIndex}%

Generated via Outpost Living Malawi (Avondale Model & DCCMS/FAO Standards)`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedSizerPlan(true);
      setTimeout(() => setCopiedSizerPlan(false), 2500);
    }
  };

  const todayDevotional = DAILY_DEVOTIONALS[devotionalIndex % DAILY_DEVOTIONALS.length];

  const [readinessStats, setReadinessStats] = useState(() => calculateHomesteadReadinessScore());

  useEffect(() => {
    const refreshReadiness = () => setReadinessStats(calculateHomesteadReadinessScore());
    window.addEventListener('outpost:progress-updated', refreshReadiness);
    window.addEventListener('outpost:readiness-updated', refreshReadiness);
    return () => {
      window.removeEventListener('outpost:progress-updated', refreshReadiness);
      window.removeEventListener('outpost:readiness-updated', refreshReadiness);
    };
  }, []);

  const readinessPercentage = readinessStats.breakdown.exodusScorePct;

  const hasProgress = useMemo(() => {
    return (
      (readinessStats?.breakdown?.exodusScorePct ?? 0) > 0 ||
      (readinessStats?.totalScorePct ?? 0) > 0 ||
      (readinessStats?.breakdown?.skillsMasteryPct ?? 0) > 0 ||
      (readinessStats?.breakdown?.landReadinessPct ?? 0) > 0
    );
  }, [readinessStats]);

  const currentSeasonalTask = useMemo(() => {
    if (currentMonth >= 10 || currentMonth <= 2) {
      return SEASONAL_CALENDAR.find((s) => s.season === 'Rainy Planting') || SEASONAL_CALENDAR[0];
    }
    if (currentMonth >= 3 && currentMonth <= 5) {
      return SEASONAL_CALENDAR.find((s) => s.season === 'Harvest & Storage') || SEASONAL_CALENDAR[1];
    }
    if (currentMonth >= 6 && currentMonth <= 7) {
      return SEASONAL_CALENDAR.find((s) => s.season === 'Cold Dry Season') || SEASONAL_CALENDAR[2];
    }
    return SEASONAL_CALENDAR.find((s) => s.season === 'Hot Dry Preparation') || SEASONAL_CALENDAR[3];
  }, [currentMonth]);

  const [expandedGuides, setExpandedGuides] = useState<Record<string, boolean>>({
    sizer: false,
    districts: false,
    pillars: false,
    prophecy: false,
    hearth: false,
  });

  const toggleGuide = (key: string) => {
    setExpandedGuides((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const areAllGuidesExpanded = useMemo(() => {
    return Object.values(expandedGuides).every(Boolean);
  }, [expandedGuides]);

  const toggleAllGuides = () => {
    const nextState = !areAllGuidesExpanded;
    setExpandedGuides({
      sizer: nextState,
      districts: nextState,
      pillars: nextState,
      prophecy: nextState,
      hearth: nextState,
    });
  };

  const glassSurfaceClass = isField ? 'bg-black text-white border-2 border-white' : 'glass-depth-emerald';
  const glassHeroClass = isField ? 'bg-black text-white border-2 border-white' : 'glass-depth-emerald-hero';

  return (
    <div
      className={cn(
        'min-h-full flex flex-col pb-14 transition-colors duration-300',
        isField
          ? 'bg-black text-white'
          : isSienna
          ? 'bg-gradient-to-b from-[#F5EFE4] via-[#EFE5D4] to-[#E6D7C3] dark:from-[#120806] dark:via-[#1D0C08] dark:to-[#140805] text-stone-800 dark:text-stone-100'
          : 'bg-gradient-to-b from-[#F9F6EE] via-[#F4EFE4] to-[#EDE6D6] dark:from-[#04140B] dark:via-[#071F12] dark:to-[#041009] text-stone-800 dark:text-stone-100'
      )}
    >
      <CountryLivingIntroQuote
        forceShow={showWelcomeQuote}
        onClose={() => setShowWelcomeQuote(false)}
      />

      {/* ====================================================================
          1. MODULAR COMMAND CENTER HERO (GUIDED BY NEURONEST FRAME LAYOUT)
      ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 w-full">
        {/* Minimalist Command Strip (Themes auto-hidden under Settings ⌘,) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Home
            </span>
            <span aria-hidden="true" className="text-stone-400 dark:text-white/30">
              ·
            </span>
            <Link
              to="/account"
              className="inline-flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 hover:text-amber-400 transition-colors text-xs"
            >
              <span>Sign in</span>
              <ArrowRight size={11} />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-caption font-mono text-stone-600 dark:text-stone-300">
            <span>28 Districts</span>
          </div>
        </div>

        {/* Framed Rounded-3xl Hero Card — Scenery Background Pops through Translucent Depth */}
        <section
          id="hero-sanctuary"
          aria-label="Country Living Sanctuary Hero"
          className={cn(
            'relative rounded-3xl border text-stone-100 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-all duration-300',
            isCharcoal
              ? 'border-white/15 bg-transparent'
              : isSapphire
              ? 'border-sky-300/40 dark:border-sky-800/60 bg-transparent'
              : 'border-emerald-800/30 dark:border-emerald-800/60 bg-transparent'
          )}
        >
          <HomeSceneryBackground
            activeScene={
              sceneryStyle === 'illustrated'
                ? 'illustrated'
                : selectedClimateZone === 'highlands'
                ? 'highlands'
                : selectedClimateZone === 'lakeshore'
                ? 'waters'
                : 'sanctuary'
            }
          />

          {/* Gradient Scrim (Bottom-to-Top, Moss-Deep #071A10 0 to 75% for 4.5:1+ Contrast) */}
          <div
            className="absolute inset-0 pointer-events-none z-[1] hero-scrim-moss"
            aria-hidden="true"
          />

          <div className="px-5 sm:px-8 py-6 lg:py-8 relative z-10">
            {/* Panoramic Scenic Vista Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-caption font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                  <Mountain size={13} />
                  <span>Panoramic Scenery:</span>
                </span>
                
                {/* Style Toggle: Illustrated Masterpiece vs Procedural Vector Dawn */}
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/15">
                  <button
                    type="button"
                    onClick={() => setSceneryStyle('illustrated')}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-caption font-mono font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer',
                      sceneryStyle === 'illustrated'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Sparkles size={12} />
                    <span>Illustrated Homestead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSceneryStyle('vector')}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-caption font-mono font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer',
                      sceneryStyle === 'vector'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Layers size={12} />
                    <span>Vector Horizons</span>
                  </button>
                </div>

                {/* Sub-zone Selector when Vector Horizons is active */}
                {sceneryStyle === 'vector' && (
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/15">
                    {[
                      { id: 'highlands' as const, label: 'Mulanje Highlands', icon: Mountain },
                      { id: 'lakeshore' as const, label: 'Lake Waters', icon: Waves },
                      { id: 'mid-hills' as const, label: 'Mid-Valleys', icon: Trees },
                    ].map((v) => {
                      const Icon = v.icon;
                      const isActive = selectedClimateZone === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedClimateZone(v.id)}
                          className={cn(
                            'px-2 py-0.5 rounded-lg text-caption font-mono font-semibold transition-all inline-flex items-center gap-1 cursor-pointer',
                            isActive
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'text-stone-300 hover:text-white hover:bg-white/10'
                          )}
                        >
                          <Icon size={11} />
                          <span>{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-caption font-mono text-emerald-300">
                <ShieldCheck size={13} />
                <span>Malawi Country Living Standard · 28 Districts</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT (7 Cols): Clean Left-Axis Command Stage with High Contrast & Scenic Depth */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-7 flex flex-col justify-between gap-5 text-left"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/30 backdrop-blur-md border border-white/15 shadow-xl">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                    <span>Country Living Guide</span>
                    <span aria-hidden="true">·</span>
                    <span>Malawi Outpost Model</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
                    Meet Outpost — Your Modular Home for Country Living in Malawi
                  </h1>
                  <p className="text-sm sm:text-base mt-3 leading-relaxed max-w-[60ch] text-pretty text-stone-100 font-normal">
                    Welcome to Outpost — a modular desktop home built to guide your family’s transition from the city to water-rich, debt-free country land across all 28 districts of Malawi.
                  </p>
                </div>

                {/* ONE Primary Action Button in Hero Viewport + Subtle Ghost Triggers */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {hasProgress ? (
                    <Link
                      to="/tracker"
                      className="px-5 py-3 rounded-control bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-raised transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Continue where you left off</span>
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      to="/scout-map"
                      className="px-5 py-3 rounded-control bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-raised transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Compass size={14} />
                      <span>Start with your land</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowBeginnerWizard(true)}
                    className="px-3.5 py-2.5 rounded-control bg-white/10 hover:bg-white/20 border border-white/20 text-stone-100 font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                  >
                    <span>60-Sec District Quiz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGlossaryInitialTab('glossary');
                      setShowBeginnerGlossary(true);
                    }}
                    className="px-3 py-2 text-xs font-semibold text-stone-200 hover:text-amber-300 underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <BookOpen size={13} className="text-amber-300" />
                    <span>Field Protocols &amp; Glossary</span>
                  </button>
                </div>
              </motion.div>

              {/* RIGHT (5 Cols): Compact Active District Pulse & Quick Navigation Dock */}
              <div id="hero-pulse" className="lg:col-span-5 flex flex-col justify-center">
                <div className="p-4 sm:p-5 rounded-card bg-stone-950/60 backdrop-blur-xl border border-white/20 flex flex-col gap-3.5 shadow-raised">
                  {/* Quick Suites Bar */}
                  <div className="flex items-center justify-between gap-1.5 pb-2.5 border-b border-white/15">
                    <span className="text-caption font-mono text-amber-300 font-bold uppercase tracking-wider">
                      Quick Suites
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        { label: '28 GIS', to: '/scout-map', icon: Compass },
                        { label: 'Solar PV', to: '/calculators?tab=solar', icon: Sun },
                        { label: 'Health', to: '/sanitarium', icon: HeartPulse },
                        { label: '3×3×3ft', to: '/what', icon: Sprout },
                        { label: '1844', to: '/vision', icon: BookOpen },
                      ].map((orb) => {
                        const OrbIcon = orb.icon;
                        return (
                          <Link
                            key={orb.label}
                            to={orb.to}
                            title={`Open ${orb.label}`}
                            className="px-2 py-1 rounded-control bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 hover:text-amber-300 text-caption font-mono font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <OrbIcon size={11} className="text-amber-300" />
                            <span>{orb.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active District Status Readout */}
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-caption font-mono text-amber-300 font-bold uppercase">
                          Target District Pulse
                        </span>
                        <span className="text-caption font-mono font-bold text-emerald-400">
                          · {autonomyIndex}% Autonomy
                        </span>
                        <span
                          className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/35 font-semibold"
                          title="Formula: Water security (40%) + Solar yield (35%) + Land buffer (25%)"
                        >
                          Formula Est.
                        </span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-white mt-0.5">
                        {quickDistrict.name} ({quickDistrict.region})
                      </h2>
                    </div>
                    <Link
                      to={`/scout-map?district=${quickDistrict.id}`}
                      className="text-xs font-semibold text-amber-300 hover:text-white underline underline-offset-4 shrink-0"
                    >
                      GIS View →
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-control bg-black/50 border border-white/10 text-xs font-mono">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-stone-400 text-caption uppercase tracking-wider">Rainfall</span>
                        <span
                          className="text-[9.5px] text-sky-300/90 font-mono px-1 py-0.2 rounded bg-sky-950/70 border border-sky-400/30"
                          title="Source: Malawi DCCMS meteorological baseline"
                        >
                          DCCMS Est.
                        </span>
                      </div>
                      <span className="text-sky-300 font-bold tabular-nums">
                        {quickDistrict.rainfallAnnualMm} mm/yr
                      </span>
                    </div>
                    <div className="flex flex-col border-x border-white/10 px-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-stone-400 text-caption uppercase tracking-wider">Aquifer</span>
                        <span
                          className="text-[9.5px] text-emerald-300/90 font-mono px-1 py-0.2 rounded bg-emerald-950/70 border border-emerald-400/30"
                          title="Source: National Water Resources Authority groundwater survey"
                        >
                          NWRA Est.
                        </span>
                      </div>
                      <span className="text-emerald-300 font-bold tabular-nums">
                        ~{quickDistrict.aquiferDepthM}m well
                      </span>
                    </div>
                    <div className="flex flex-col pl-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-stone-400 text-caption uppercase tracking-wider">Soil Order</span>
                        <span
                          className="text-[9.5px] text-amber-300/90 font-mono px-1 py-0.2 rounded bg-amber-950/70 border border-amber-400/30"
                          title="Source: FAO / HWSD v2.0 global soil classification"
                        >
                          FAO Est.
                        </span>
                      </div>
                      <span className="text-amber-300 font-bold truncate">
                        {quickDistrict.primarySoil.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedGuides((prev) => ({ ...prev, sizer: true }));
                        document.getElementById('guide-sizer')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-stone-200 hover:text-amber-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Calculator size={12} className="text-amber-400" />
                      <span>Configure Household &amp; Roof Catchment ↓</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMasterplanOpen(true)}
                      className="px-2.5 py-1 rounded-control bg-amber-400/90 hover:bg-amber-300 text-stone-950 font-bold text-caption font-mono cursor-pointer transition-colors"
                    >
                      Masterplan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================================
          STANDARDIZED MAIN STACK: CARD PAD (16/24) & SECTION GAPS (32/48)
      ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-8 sm:gap-12 mt-8 sm:mt-12">
        {/* ====================================================================
            2. A SINGLE "THIS SEASON" CARD FROM THE ALMANAC
        ==================================================================== */}
        <section
          id="this-season"
          aria-label="Current Season in Malawi"
          className={cn(
            'p-4 sm:p-6 rounded-card border transition-all',
            isCharcoal
              ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
              : glassSurfaceClass,
            'shadow-raised'
          )}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-200/80 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-control bg-amber-400/20 dark:bg-amber-400/10 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  <span>This Season in Malawi</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentSeasonalTask.months}</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                  {currentSeasonalTask.season}
                </h2>
              </div>
            </div>

            <Link
              to="/seasons"
              className="px-3.5 py-1.5 rounded-control border border-stone-300/90 dark:border-white/15 bg-stone-100/80 dark:bg-white/5 hover:bg-stone-200/80 dark:hover:bg-white/10 text-stone-800 dark:text-stone-100 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-start lg:self-auto"
            >
              <span>Open Full Farm Almanac</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 text-xs sm:text-sm">
            <div className="md:col-span-7 flex flex-col gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                  Priority Agronomy &amp; Homestead Focus:
                </span>
                <p className="text-stone-900 dark:text-stone-100 font-semibold mt-0.5 text-base leading-snug">
                  {currentSeasonalTask.focus}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Key Field Tasks:
                </span>
                <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                  {currentSeasonalTask.keyActivities.slice(0, 3).map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">·</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between gap-3 p-3.5 rounded-control bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 dark:border-amber-400/15">
              <div>
                <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block">
                  Recommended Crops:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {currentSeasonalTask.recommendedCrops.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-control bg-white/80 dark:bg-black/40 text-stone-800 dark:text-stone-200 font-semibold text-xs border border-stone-200/80 dark:border-white/10"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/20 dark:border-amber-400/15 text-xs italic text-stone-800 dark:text-stone-200">
                “{currentSeasonalTask.proTip}”
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            3. A 2-COLUMN GRID OF UP TO SIX ENTRY POINTS
        ==================================================================== */}
        <section id="gateways" aria-label="Core Homestead Gateways" className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              Essential Pathways
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
              Homestead Gateways &amp; Core Manuals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CORE_ENTRY_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className={cn(
                    'group p-4 sm:p-6 rounded-card border transition-all duration-200 flex flex-col justify-between gap-3',
                    isCharcoal
                      ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12 hover:border-amber-400/60'
                      : glassSurfaceClass,
                    'shadow-raised hover:-translate-y-0.5'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-control bg-stone-100 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={20} className={item.accent} />
                      </div>
                      <div>
                        <span className="text-caption font-mono text-stone-500 dark:text-stone-400 font-semibold block">
                          {item.meta}
                        </span>
                        <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            4. EVERYTHING ELSE BEHIND "MORE GUIDES" COLLAPSIBLE SECTIONS
        ==================================================================== */}
        <section
          id="more-guides"
          aria-label="More Guides and Detailed Workbenches"
          className="flex flex-col gap-4 pt-2 border-t border-stone-200/80 dark:border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Full Technical Suite
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                More Guides &amp; Detailed Workbenches
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Explore in-depth engineering sizers, 28-district GIS telemetry, the 4 Pillars, 1844 chart, and family hearth.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleAllGuides}
              className="px-3.5 py-1.5 rounded-control bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-stone-800 dark:text-stone-100 text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
            >
              <span>{areAllGuidesExpanded ? 'Collapse All Guides ↑' : 'Expand All Guides ↓'}</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* COLLAPSIBLE 1: LIVE DISTRICT & HOUSEHOLD SIZER CONSOLE */}
            <div
              id="guide-sizer"
              className={cn(
                'rounded-card border transition-all overflow-hidden',
                isCharcoal
                  ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                  : glassSurfaceClass,
                'shadow-raised'
              )}
            >
              <button
                type="button"
                onClick={() => toggleGuide('sizer')}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-amber-400/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Calculator size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white leading-tight">
                      Live Homestead Sizer &amp; Specification Engine
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      Size water cisterns, solar PV arrays, biochar quota, and land acres for your household.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-500 transition-transform shrink-0',
                    expandedGuides.sizer && 'rotate-180'
                  )}
                />
              </button>

              {expandedGuides.sizer && (
                <div className="p-4 sm:p-6 border-t border-stone-200/80 dark:border-white/10 flex flex-col gap-4 bg-stone-50/50 dark:bg-black/20">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                    {/* District selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="guide-district-select" className="font-bold text-stone-800 dark:text-stone-200">
                        1. Target District:
                      </label>
                      <select
                        id="guide-district-select"
                        value={quickDistrictId}
                        onChange={(e) => setQuickDistrictId(e.target.value)}
                        className="w-full px-3 py-2 rounded-control bg-white dark:bg-stone-900 border border-stone-300 dark:border-white/20 text-xs font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                      >
                        {DISTRICT_LIST.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.rainfallAnnualMm}mm/yr · {d.primarySoil})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Household slider */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="guide-household-range" className="font-bold text-stone-800 dark:text-stone-200">
                          2. Household Size:
                        </label>
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                          {quickFamilySize} people
                        </span>
                      </div>
                      <input
                        id="guide-household-range"
                        type="range"
                        min={1}
                        max={16}
                        step={1}
                        value={quickFamilySize}
                        onChange={(e) => setQuickFamilySize(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex items-center justify-between gap-1 pt-1">
                        {[
                          { label: 'Couple (2)', size: 2, roof: 50 },
                          { label: 'Family (5)', size: 5, roof: 90 },
                          { label: 'Homestead (8)', size: 8, roof: 110 },
                          { label: 'Outpost (12)', size: 12, roof: 140 },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setQuickFamilySize(preset.size);
                              setQuickRoofAreaSqm(preset.roof);
                            }}
                            className={cn(
                              'px-2 py-0.5 rounded-control text-caption font-mono transition-colors cursor-pointer border',
                              quickFamilySize === preset.size
                                ? 'bg-amber-400 text-stone-950 font-bold border-amber-500'
                                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:bg-stone-100'
                            )}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Roof Catchment */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-stone-800 dark:text-stone-200">3. Roof Catchment:</span>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { label: '50m²', sqm: 50 },
                          { label: '90m²', sqm: 90 },
                          { label: '140m²', sqm: 140 },
                        ].map((p) => (
                          <button
                            key={p.sqm}
                            type="button"
                            onClick={() => setQuickRoofAreaSqm(p.sqm)}
                            className={cn(
                              'py-1.5 rounded-control font-mono text-xs font-semibold transition-colors cursor-pointer text-center border',
                              quickRoofAreaSqm === p.sqm
                                ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-bold border-transparent'
                                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10'
                            )}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Output HUD */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-control bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-stone-500 text-caption uppercase block">Rainwater</span>
                      <span className="text-sky-600 dark:text-sky-300 font-bold text-sm">
                        ~{Math.round(quickEstimates.annualRainwaterLiters / 1000)}k L/yr
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-caption uppercase block">Dry Reserve</span>
                      <span className="text-emerald-600 dark:text-emerald-300 font-bold text-sm">
                        ~{Math.max(1, Math.round(quickEstimates.annualRainwaterLiters / (quickFamilySize * 100 * 30)))} mos
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-caption uppercase block">Solar PV &amp; Bank</span>
                      <span className="text-amber-600 dark:text-amber-300 font-bold text-sm">
                        {quickEstimates.recommendedSolarKw}kWp · {quickEstimates.recommendedBatteryKwh}kWh
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 text-caption uppercase block">Land &amp; Pits</span>
                      <span className="text-stone-900 dark:text-white font-bold text-sm">
                        {quickEstimates.totalAcres}ac · {quickEstimates.orchardPitCount} pits
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80 dark:border-white/10 text-xs">
                    <span className="text-stone-600 dark:text-stone-400">
                      <strong>{quickDistrict.name}:</strong> {quickDistrict.primarySoil} (Soil Estimate) · Aquifer ~{quickDistrict.aquiferDepthM}m (Depth Estimate)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySizerPlan}
                        className="px-3 py-1.5 rounded-control border border-stone-300 dark:border-white/20 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-mono text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSizerPlan ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copiedSizerPlan ? 'Copied' : 'Export Spec'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMasterplanOpen(true)}
                        className="px-3 py-1.5 rounded-control bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileText size={12} />
                        <span>Masterplan Blueprint</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COLLAPSIBLE 2: 28-DISTRICT AGRO-ECOLOGICAL ZONES & COMPARISON */}
            <div
              id="guide-districts"
              className={cn(
                'rounded-card border transition-all overflow-hidden',
                isCharcoal
                  ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                  : glassSurfaceClass,
                'shadow-raised'
              )}
            >
              <button
                type="button"
                onClick={() => toggleGuide('districts')}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-cyan-400/20 text-cyan-800 dark:text-cyan-300 flex items-center justify-center shrink-0">
                    <Compass size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white leading-tight">
                      28-District Agro-Ecological Zones &amp; Soil Matrix
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      Compare Highlands, Mid-Valleys, and Lakeshore zones; search all 28 Malawian districts.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-500 transition-transform shrink-0',
                    expandedGuides.districts && 'rotate-180'
                  )}
                />
              </button>

              {expandedGuides.districts && (
                <div className="p-4 sm:p-6 border-t border-stone-200/80 dark:border-white/10 flex flex-col gap-4 bg-stone-50/50 dark:bg-black/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1 p-1 rounded-control bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-white/10">
                      {[
                        { id: 'highlands' as const, label: 'Cool Highlands', icon: Mountain },
                        { id: 'mid-hills' as const, label: 'Mid-Valleys', icon: Trees },
                        { id: 'lakeshore' as const, label: 'Warm Lakeshore', icon: Waves },
                      ].map((zoneBtn) => {
                        const Icon = zoneBtn.icon;
                        const active = selectedClimateZone === zoneBtn.id;
                        return (
                          <button
                            key={zoneBtn.id}
                            type="button"
                            onClick={() => setSelectedClimateZone(zoneBtn.id)}
                            className={cn(
                              'px-3 py-1 rounded-control text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors',
                              active
                                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                                : 'text-stone-700 dark:text-stone-300 hover:text-stone-950'
                            )}
                          >
                            <Icon size={12} />
                            <span>{zoneBtn.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowFullDistrictMatrix((prev) => !prev)}
                      className="px-3 py-1.5 rounded-control border border-stone-300 dark:border-white/15 bg-white dark:bg-stone-800 text-xs font-semibold cursor-pointer"
                    >
                      {showFullDistrictMatrix ? 'Hide 28-District Table' : 'Compare All 28 Districts'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-control bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-xs">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">
                        {activeClimateZone.title} ({activeClimateZone.elevation})
                      </span>
                      <p className="text-stone-600 dark:text-stone-300 mt-1">{activeClimateZone.feel}</p>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Staples &amp; Orchards</span>
                      <p className="text-stone-600 dark:text-stone-300 mt-1">{activeClimateZone.crops}</p>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">Aquifers &amp; Rainfall</span>
                      <p className="text-stone-600 dark:text-stone-300 mt-1">{activeClimateZone.waterNote}</p>
                    </div>
                  </div>

                  {/* Search Bar & Districts List */}
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Search district by name or soil order..."
                        value={districtSearchQuery}
                        onChange={(e) => setDistrictSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-3 py-1.5 rounded-control bg-white dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                      {searchableDistricts.map((d) => (
                        <Link
                          key={d.id}
                          to={`/scout-map?district=${d.id}`}
                          onClick={() => setQuickDistrictId(d.id)}
                          className={cn(
                            'px-2 py-0.5 rounded-control text-xs font-semibold border transition-colors inline-flex items-center gap-1',
                            d.id === quickDistrictId
                              ? 'bg-amber-400 text-stone-950 border-amber-500 font-bold'
                              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/10 hover:bg-stone-100'
                          )}
                        >
                          <span>{d.name}</span>
                          <span className="text-caption opacity-70">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {showFullDistrictMatrix && (
                    <div className="pt-3 border-t border-stone-200 dark:border-white/10">
                      <Suspense fallback={<div className="p-4 text-center text-xs">Loading matrix...</div>}>
                        <DistrictRegistryExplorer embedded />
                      </Suspense>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* COLLAPSIBLE 3: THE FOUR PILLARS OF SANCTUARY LIVING */}
            <div
              id="guide-pillars"
              className={cn(
                'rounded-card border transition-all overflow-hidden',
                isCharcoal
                  ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                  : glassSurfaceClass,
                'shadow-raised'
              )}
            >
              <button
                type="button"
                onClick={() => toggleGuide('pillars')}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white leading-tight">
                      The Four Pillars of Country Living
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      Grounded in Spirit of Prophecy counsel, Land Act 2016, and Avondale/Madison self-reliance.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-500 transition-transform shrink-0',
                    expandedGuides.pillars && 'rotate-180'
                  )}
                />
              </button>

              {expandedGuides.pillars && (
                <div className="p-4 sm:p-6 border-t border-stone-200/80 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-4 bg-stone-50/50 dark:bg-black/20">
                  {FOUR_PILLARS.map((pillar) => (
                    <div
                      key={pillar.number}
                      className="p-4 sm:p-5 rounded-card bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 shadow-sm"
                    >
                      <div className="w-full sm:w-40 h-36 rounded-control overflow-hidden shrink-0 relative bg-stone-950">
                        <img
                          src={pillar.illustrationImage}
                          alt={pillar.illustrationAlt}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-control bg-black/75 text-amber-300 font-mono text-xs font-bold border border-white/20">
                          {pillar.number}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400">{pillar.subtitle}</span>
                            <span aria-hidden="true">·</span>
                            <span>{pillar.proofLine}</span>
                          </div>
                          <h4 className="font-display text-base font-bold text-stone-900 dark:text-white mt-0.5">
                            {pillar.title}
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                            {pillar.summary}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-stone-100 dark:border-white/10 text-xs">
                          {pillar.links.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className="font-bold text-emerald-800 dark:text-amber-300 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>{link.label}</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLLAPSIBLE 4: ILLUSTRATED 1844 PROPHETIC PANORAMA & LIVE AGRO-WEATHER */}
            <div
              id="guide-prophecy"
              className={cn(
                'rounded-card border transition-all overflow-hidden',
                isCharcoal
                  ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                  : glassSurfaceClass,
                'shadow-raised'
              )}
            >
              <button
                type="button"
                onClick={() => toggleGuide('prophecy')}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-indigo-400/20 text-indigo-800 dark:text-indigo-300 flex items-center justify-center shrink-0">
                    <Sun size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white leading-tight">
                      Illustrated 1844 Prophetic Panorama &amp; Agro-Weather
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      6 masterclass prophetic plates, interactive 1844 timeline, and 7-day farming meteorology.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-500 transition-transform shrink-0',
                    expandedGuides.prophecy && 'rotate-180'
                  )}
                />
              </button>

              {expandedGuides.prophecy && (
                <div className="p-4 sm:p-6 border-t border-stone-200/80 dark:border-white/10 flex flex-col gap-4 bg-stone-50/50 dark:bg-black/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                      1844 TO THE EARTH MADE NEW · 6 PROPHETIC EPOCHS
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowFullPropheticChart((p) => !p)}
                        className="px-3 py-1.5 rounded-control bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer"
                      >
                        {showFullPropheticChart ? 'Hide 1844 Chart' : 'Expand Interactive 1844 Chart'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDeepTelemetry((p) => (p === 'weather' ? 'none' : 'weather'))
                        }
                        className="px-3 py-1.5 rounded-control border border-stone-300 dark:border-white/15 bg-white dark:bg-stone-800 text-xs font-semibold cursor-pointer"
                      >
                        {activeDeepTelemetry !== 'none' ? 'Hide Weather' : '7-Day Agro-Weather'}
                      </button>
                    </div>
                  </div>

                  {/* 6 plates filmstrip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {PROPHETIC_PLATES_PREVIEW.map((plate) => (
                      <button
                        key={plate.epoch}
                        type="button"
                        onClick={() => setShowFullPropheticChart((p) => !p)}
                        className="group relative h-24 rounded-control overflow-hidden border border-stone-200 dark:border-white/10 text-left cursor-pointer"
                      >
                        <img
                          src={plate.image}
                          alt={plate.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                        <div className="absolute bottom-1 left-1.5 right-1.5 text-white">
                          <span className="text-caption font-mono font-bold text-amber-300 block">{plate.epoch}</span>
                          <span className="text-caption font-semibold leading-tight line-clamp-1">{plate.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showFullPropheticChart && (
                    <div className="pt-3 border-t border-stone-200 dark:border-white/10">
                      <Suspense fallback={<div className="p-4 text-center text-xs">Loading chart...</div>}>
                        <PropheticTimeline1844 />
                      </Suspense>
                    </div>
                  )}

                  {activeDeepTelemetry !== 'none' && (
                    <div className="pt-3 border-t border-stone-200 dark:border-white/10">
                      <Suspense fallback={<div className="p-4 text-center text-xs">Loading weather...</div>}>
                        {activeDeepTelemetry === 'weather' ? (
                          <MalawiAgriWeatherForecast embedded />
                        ) : (
                          <SoilStrataBlueprint />
                        )}
                      </Suspense>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* COLLAPSIBLE 5: ADVENTIST FAMILY HEARTH & SABBATH WATCH */}
            <div
              id="guide-hearth"
              className={cn(
                'rounded-card border transition-all overflow-hidden',
                isCharcoal
                  ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                  : glassSurfaceClass,
                'shadow-raised'
              )}
            >
              <button
                type="button"
                onClick={() => toggleGuide('hearth')}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-rose-400/20 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0">
                    <HeartPulse size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white leading-tight">
                      Adventist Family Hearth, Sabbath Watch &amp; Nature Curriculum
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      Morning &amp; evening devotional altar, Malawi Sabbath eve sunset guard, and youth trade lessons.
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-500 transition-transform shrink-0',
                    expandedGuides.hearth && 'rotate-180'
                  )}
                />
              </button>

              {expandedGuides.hearth && (
                <div className="p-4 sm:p-6 border-t border-stone-200/80 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50/50 dark:bg-black/20 text-xs">
                  {/* Card 1: Altar */}
                  <div className="p-4 rounded-card bg-[#DCE6F2] dark:bg-[#182333] text-stone-900 dark:text-stone-100 flex flex-col justify-between gap-2.5 border border-black/10 dark:border-white/15">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Altar · {todayDevotional.scripture.reference}</span>
                        <button
                          type="button"
                          onClick={() => setDevotionalIndex((p) => (p + 1) % DAILY_DEVOTIONALS.length)}
                          className="hover:underline cursor-pointer"
                        >
                          <RefreshCw size={11} />
                        </button>
                      </div>
                      <h4 className="font-display text-sm font-bold mt-1">“{todayDevotional.scripture.verse}”</h4>
                      <p className="text-xs mt-1.5 opacity-90">
                        <strong>{todayDevotional.egwQuote.egwCode}:</strong> “{todayDevotional.egwQuote.text}”
                      </p>
                    </div>
                    <Link to="/devotional" className="font-bold hover:underline pt-2 border-t border-black/10 dark:border-white/10">
                      Read Devotional Treasury →
                    </Link>
                  </div>

                  {/* Card 2: Sabbath Sunset */}
                  <div className="p-4 rounded-card bg-[#DCF2DE] dark:bg-[#12281D] text-stone-900 dark:text-stone-100 flex flex-col justify-between gap-2.5 border border-black/10 dark:border-emerald-600/35">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Sabbath Eve Sunset · {currentMonthName}</span>
                        <Sun size={13} />
                      </div>
                      <h4 className="font-display text-sm font-bold mt-1">
                        North {sabbathSunset.north} · Central {sabbathSunset.central} · South {sabbathSunset.south}
                      </h4>
                      <p className="text-xs mt-1.5 opacity-90">
                        Friday tool-down: <strong>{sabbathSunset.guardCentral} CAT</strong>. Gather the family to sing, read, and pray (6T 356).
                      </p>
                    </div>
                    <Link to="/devotional" className="font-bold hover:underline pt-2 border-t border-black/10 dark:border-white/10">
                      Friday Preparation Checklist →
                    </Link>
                  </div>

                  {/* Card 3: Youth Curriculum */}
                  <div className="p-4 rounded-card bg-[#FBF3C9] dark:bg-[#282110] text-stone-900 dark:text-stone-100 flex flex-col justify-between gap-2.5 border border-black/10 dark:border-amber-600/35">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Children’s Nature Classroom</span>
                        <div className="flex gap-1">
                          {(['ages-4-8', 'ages-9-13', 'ages-14-18'] as YouthAgeTrack[]).map((trk) => (
                            <button
                              key={trk}
                              type="button"
                              onClick={() => setSelectedAgeTrack(trk)}
                              className={cn(
                                'px-1.5 py-0.5 rounded-control text-caption font-mono cursor-pointer',
                                selectedAgeTrack === trk
                                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-bold'
                                  : 'bg-black/10 dark:bg-white/10'
                              )}
                            >
                              {FAMILY_NATURE_CURRICULUM[trk].label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <h4 className="font-display text-sm font-bold mt-1">{activeYouthTrack.subtitle}</h4>
                      <p className="text-xs mt-1.5 opacity-90">
                        <strong>Lesson:</strong> {activeYouthTrack.objectLesson} · <strong>Trade:</strong> {activeYouthTrack.practicalSkill}
                      </p>
                    </div>
                    <Link to={activeYouthTrack.linkTo} className="font-bold hover:underline pt-2 border-t border-black/10 dark:border-white/10">
                      {activeYouthTrack.linkLabel} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {showBeginnerWizard && (
        <Suspense fallback={null}>
          <OnboardingWizard
            isOpen={showBeginnerWizard}
            onClose={() => setShowBeginnerWizard(false)}
          />
        </Suspense>
      )}
      {showBeginnerGlossary && (
        <Suspense fallback={null}>
          <BeginnerGlossaryModal
            isOpen={showBeginnerGlossary}
            onClose={() => setShowBeginnerGlossary(false)}
            initialTab={glossaryInitialTab}
          />
        </Suspense>
      )}
      {isMasterplanOpen && (
        <Suspense fallback={null}>
          <HomesteadMasterplanModal
            isOpen={isMasterplanOpen}
            onClose={() => setIsMasterplanOpen(false)}
            districtId={quickDistrictId}
            familySize={quickFamilySize}
            roofAreaSqm={quickRoofAreaSqm}
            onUpdateDistrictId={setQuickDistrictId}
            onUpdateFamilySize={setQuickFamilySize}
            onUpdateRoofArea={setQuickRoofAreaSqm}
          />
        </Suspense>
      )}
    </div>
  );
}
