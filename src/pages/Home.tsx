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
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { CountryLivingIntroQuote } from '@/components/home/CountryLivingIntroQuote';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon, CountryIconName } from '@/components/icons/CountryIcons';
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

const FOUR_PILLARS: {
  number: string;
  title: string;
  subtitle: string;
  iconName: CountryIconName;
  summary: string;
  proofLine: string;
  links: { label: string; to: string }[];
}[] = [
  {
    number: '01',
    title: 'Why We Leave the Cities',
    subtitle: 'Prophetic & Family Purpose',
    iconName: 'prophecy-1844',
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
    summary:
      'Develop essential self-reliance skills, medical missionary principles, and sustainable rural outpost campuses.',
    proofLine: 'Avondale Model · 25 Manuals',
    links: [
      { label: 'Outpost Blueprints', to: '/blueprints' },
      { label: 'Country Skills Manual', to: '/skills' },
      { label: 'Steward Directory', to: '/community' },
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
    epoch: 'CL 9.6',
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
  const { palette } = useTheme();
  const isCharcoal = palette === 'charcoal';
  const isSapphire = palette === 'sapphire' || palette === 'midnight';
  const isSienna = palette === 'sienna';
  const isMidnight = palette === 'midnight';

  const [showWelcomeQuote, setShowWelcomeQuote] = useState(false);
  const [showBeginnerWizard, setShowBeginnerWizard] = useState(false);
  const [showBeginnerGlossary, setShowBeginnerGlossary] = useState(false);
  const [glossaryInitialTab, setGlossaryInitialTab] = useState<'glossary' | 'visual-guide'>('glossary');

  const [selectedClimateZone, setSelectedClimateZone] = useState<ClimateLifestyleId>('highlands');
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

  const completedMilestonesCount = readinessStats.completedMilestones;
  const totalPossibleItems = readinessStats.totalMilestones;
  const readinessPercentage = readinessStats.breakdown.exodusScorePct;

  const glassSurfaceClass = isSapphire ? 'glass-depth-blue' : 'glass-depth-emerald';
  const glassHeroClass = isSapphire ? 'glass-depth-blue-hero' : 'glass-depth-emerald-hero';

  return (
    <div
      className={cn(
        'min-h-full text-stone-800 dark:text-stone-100 flex flex-col pb-14 transition-colors duration-300',
        isCharcoal
          ? 'bg-[#F4F4F6] dark:bg-[#121214]'
          : isMidnight
          ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F0F9FF] dark:from-[#030917] dark:via-[#071426] dark:to-[#040D1A]'
          : isSienna
          ? 'bg-gradient-to-b from-[#F5EFE4] via-[#EFE5D4] to-[#E6D7C3] dark:from-[#120806] dark:via-[#1D0C08] dark:to-[#140805]'
          : isSapphire
          ? 'bg-gradient-to-b from-[#EDF5FC] via-[#F4F8FD] to-[#E9F2FA] dark:from-[#041122] dark:via-[#06182E] dark:to-[#040E1C]'
          : 'bg-gradient-to-b from-[#F9F6EE] via-[#F4EFE4] to-[#EDE6D6] dark:from-[#04140B] dark:via-[#071F12] dark:to-[#041009]'
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
              Outpost Sanctuary Command Center
            </span>
            <span aria-hidden="true" className="text-stone-400 dark:text-white/25">
              ·
            </span>
            <button
              type="button"
              onClick={() => setShowWelcomeQuote(true)}
              className="inline-flex items-center gap-1 text-emerald-800 dark:text-amber-300 hover:underline cursor-pointer font-semibold text-xs"
            >
              <Feather size={12} />
              <span>Inspired Counsel (CL 9.1)</span>
            </button>
            <span aria-hidden="true" className="text-stone-400 dark:text-white/30">
              ·
            </span>
            <Link
              to="/account"
              className="inline-flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 hover:text-amber-400 transition-colors text-xs"
            >
              <span>Steward Access</span>
              <ArrowRight size={11} />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-700 dark:text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sanctuary Engine Live</span>
            </span>
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
              selectedClimateZone === 'highlands'
                ? 'highlands'
                : selectedClimateZone === 'lakeshore'
                ? 'waters'
                : 'sanctuary'
            }
          />

          {/* Polished Subtle Atmospheric Gradient for Text Zone (Non-Muddy, Scenery Fully Visible) */}
          <div
            className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-r from-stone-950/30 via-transparent to-transparent max-w-xl"
            aria-hidden="true"
          />

          <div className="px-5 sm:px-8 py-7 lg:py-9 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT (7 Cols): Clean Left-Axis Command Stage with High Contrast & Scenic Depth */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-7 flex flex-col justify-between gap-5 text-left"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/20 backdrop-blur-[1.5px] border border-white/10 shadow-lg">
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.1] text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Meet Outpost — Your Modular Command Center for Country Living in Malawi
                  </h1>
                  <p className="text-sm sm:text-base mt-3 leading-relaxed max-w-[60ch] text-pretty text-stone-100 font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    Welcome to Outpost — a modular desktop sanctuary built to guide your family’s transition from the city to water-rich, debt-free country land across all 28 districts of Malawi.
                  </p>
                </div>

                {/* Clean Hairline EGW Counsel Blockquote with High-Contrast Background */}
                <blockquote className="border-l-4 border-amber-400 pl-4 py-2.5 text-xs sm:text-sm italic font-serif max-w-[60ch] text-stone-100 bg-stone-950/30 backdrop-blur-sm rounded-r-2xl border-y border-r border-white/10 shadow-md">
                  “Get out of the cities as soon as possible and purchase a little piece of land, where you can have a garden, where your children can watch the flowers growing, and learn from them lessons of simplicity and purity.”
                  <span className="not-italic font-mono text-xs text-amber-300 font-bold ml-2 block sm:inline mt-1 sm:mt-0">
                    — Ellen G. White, Country Living, p. 24.2
                  </span>
                </blockquote>

                {/* Purposeful Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowBeginnerWizard(true)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-sm"
                  >
                    <Sparkles size={14} className="text-amber-300" />
                    <span>Getting Started: 60-Sec District Quiz</span>
                  </button>

                  <Link
                    to="/scout-map"
                    className="px-4 py-2.5 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold text-xs shadow-lg transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass size={14} />
                    <span>Explore 28-District GIS Map</span>
                    <ArrowRight size={13} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setGlossaryInitialTab('glossary');
                      setShowBeginnerGlossary(true);
                    }}
                    className="px-2.5 py-2 text-xs font-semibold text-stone-100 hover:text-amber-300 underline underline-offset-4 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <BookOpen size={13} className="text-amber-300" />
                    <span>Field Glossary &amp; Protocols</span>
                  </button>
                </div>
              </motion.div>

              {/* RIGHT (5 Cols): Live Sizer Deck & Integrated Command Tray */}
              <div className="lg:col-span-5 flex flex-col justify-center min-h-[330px]">
                {/* Live Homestead Sizer Control Console with Integrated Quick Suites Tray */}
                <div className="p-5 rounded-2xl bg-stone-950/45 backdrop-blur-xl border border-white/20 flex flex-col gap-3.5 shadow-2xl">
                  {/* Integrated Command Tray: 5 Quick Suites */}
                  <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/12">
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                      Quick Suites
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[
                        { label: '28 GIS', to: '/scout-map', icon: Compass },
                        { label: 'Solar PV', to: '/calculators?tab=solar', icon: Sun },
                        { label: 'NEWSTART', to: '/sanitarium', icon: HeartPulse },
                        { label: '3×3×3ft', to: '/what', icon: Sprout },
                        { label: '1844', to: '/vision', icon: BookOpen },
                      ].map((orb) => {
                        const OrbIcon = orb.icon;
                        return (
                          <Link
                            key={orb.label}
                            to={orb.to}
                            title={`Open ${orb.label}`}
                            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 hover:text-amber-300 text-[10px] font-mono font-semibold transition-all inline-flex items-center gap-1 shadow-xs"
                          >
                            <OrbIcon size={11} className="text-amber-300" />
                            <span>{orb.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-amber-300 font-semibold block">
                        Live Homestead Sizer · Updates Quick Stats Below
                      </span>
                      <h2 className="font-display text-base font-bold text-white">
                        Configure Target District &amp; Household
                      </h2>
                    </div>
                    <Link
                      to="/calculators"
                      className="text-xs font-semibold text-amber-300 hover:text-white underline underline-offset-4 shrink-0"
                    >
                      Full Suite →
                    </Link>
                  </div>

                  {/* 3 Strict 2-Column Aligned Controls */}
                  <div className="flex flex-col gap-2.5 text-xs">
                    <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                      <label htmlFor="hero-district-select" className="text-stone-200 font-medium">
                        1. Target District
                      </label>
                      <select
                        id="hero-district-select"
                        value={quickDistrictId}
                        onChange={(e) => setQuickDistrictId(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-black/45 border border-white/20 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                      >
                        {DISTRICT_LIST.map((d) => (
                          <option key={d.id} value={d.id} className="bg-stone-900 text-white">
                            {d.name} ({d.rainfallAnnualMm}mm/yr)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                      <label htmlFor="hero-family-range" className="text-stone-200 font-medium">
                        2. Household Size
                      </label>
                      <div className="flex items-center gap-2.5 w-full">
                        <input
                          id="hero-family-range"
                          type="range"
                          min={1}
                          max={12}
                          step={1}
                          value={quickFamilySize}
                          onChange={(e) => setQuickFamilySize(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                        <span className="font-mono font-bold text-amber-300 tabular-nums w-16 text-right shrink-0">
                          {quickFamilySize} {quickFamilySize === 1 ? 'person' : 'people'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                      <span className="text-stone-200 font-medium">3. Roof Catchment</span>
                      <div className="grid grid-cols-3 rounded-xl bg-black/40 border border-white/15 p-0.5 w-full">
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
                              'py-1 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer text-center',
                              quickRoofAreaSqm === p.sqm
                                ? 'bg-white text-stone-950 font-bold'
                                : 'text-stone-300 hover:text-white'
                            )}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/12">
                    <span className="truncate">
                      <strong className="text-white">{quickDistrict.name}:</strong> {quickDistrict.primarySoil} · Well ~{quickDistrict.aquiferDepthM}m
                      {isLoadingSizerTelemetry && (
                        <RefreshCw size={10} className="inline ml-1.5 animate-spin text-amber-300" />
                      )}
                    </span>
                    <Link
                      to={`/scout-map?district=${quickDistrict.id}`}
                      className="text-amber-300 hover:underline shrink-0 font-semibold ml-2"
                    >
                      GIS Map →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================================
          2. NEURONEST-GUIDED PASTEL BENTO QUICK STATS & 2-COLUMN COMMAND SPLIT
      ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 flex flex-col gap-7 w-full">
        {/* 2A. QUICK STATS: 4 SOFT PASTEL BENTO CARDS (EXACT NEURONEST PROPORTIONS) */}
        <section aria-label="Quick Stats Family Homestead Baseline" className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
              Quick Stats
            </h2>
            <span className="text-xs font-mono font-semibold text-stone-700 dark:text-stone-300">
              Live Sizing for {quickDistrict.name} ({quickDistrict.rainfallAnnualMm}mm/yr) · {quickFamilySize} Members · {quickRoofAreaSqm}m² Roof
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Pastel Card 1: Soft Ice Blue (#DCE6F2 / dark:slate) */}
            <Link
              to="/calculators?tab=land"
              className="group p-5 rounded-3xl bg-[#DCE6F2] dark:bg-[#182333] hover:bg-[#d0ddec] dark:hover:bg-[#1F2E42] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-white/15 dark:ring-1 dark:ring-white/5 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[156px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-950 text-white dark:bg-sky-500/20 dark:text-sky-300 flex items-center justify-center shadow-xs">
                  <Sprout size={18} />
                </div>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-sky-300 group-hover:underline">
                  {quickEstimates.stapleAcres}ac crops + {quickEstimates.orchardAcres}ac trees →
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white tabular-nums">
                  {quickEstimates.totalAcres}+ ac
                </div>
                <div className="text-xs font-bold text-stone-800 dark:text-stone-300 mt-1">
                  Recommended Family Land
                </div>
              </div>
            </Link>

            {/* Pastel Card 2: Soft Sage Mint (#DCF2DE / dark:emerald) */}
            <Link
              to="/calculators?tab=rainwater"
              className="group p-5 rounded-3xl bg-[#DCF2DE] dark:bg-[#12281D] hover:bg-[#ceebD1] dark:hover:bg-[#183526] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-emerald-600/35 dark:ring-1 dark:ring-white/5 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[156px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-950 text-white dark:bg-emerald-500/20 dark:text-emerald-300 flex items-center justify-center shadow-xs">
                  <Droplets size={18} />
                </div>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-emerald-300 group-hover:underline">
                  ~{Math.max(1, Math.ceil((quickEstimates.annualRainwaterLiters * 0.25) / 5000))} × 5,000L Tanks →
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white tabular-nums">
                  {Math.round(quickEstimates.annualRainwaterLiters / 1000)}k L
                </div>
                <div className="text-xs font-bold text-stone-800 dark:text-stone-300 mt-1">
                  Annual Roof Rainwater
                </div>
              </div>
            </Link>

            {/* Pastel Card 3: Soft Buttercream Gold (#FBF3C9 / dark:amber) */}
            <Link
              to="/calculators?tab=solar"
              className="group p-5 rounded-3xl bg-[#FBF3C9] dark:bg-[#282110] hover:bg-[#f7ecb4] dark:hover:bg-[#352B15] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-amber-600/35 dark:ring-1 dark:ring-white/5 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[156px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-950 text-white dark:bg-amber-500/20 dark:text-amber-300 flex items-center justify-center shadow-xs">
                  <Sun size={18} />
                </div>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-amber-300 group-hover:underline">
                  {quickEstimates.recommendedBatteryKwh} kWh LiFePO4 →
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white tabular-nums">
                  {quickEstimates.recommendedSolarKw} kW
                </div>
                <div className="text-xs font-bold text-stone-800 dark:text-stone-300 mt-1">
                  Off-Grid Solar Array
                </div>
              </div>
            </Link>

            {/* Pastel Card 4: Soft Lavender (#EAE2F8 / dark:purple) */}
            <Link
              to="/tracker"
              className="group p-5 rounded-3xl bg-[#EAE2F8] dark:bg-[#231A30] hover:bg-[#dfd4f4] dark:hover:bg-[#2C213D] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-purple-600/35 dark:ring-1 dark:ring-white/5 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[156px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-950 text-white dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center shadow-xs">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-purple-300 group-hover:underline">
                  {completedMilestonesCount}/{totalPossibleItems} Tasks →
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white tabular-nums">
                  {readinessPercentage}%
                </div>
                <div className="text-xs font-bold text-stone-800 dark:text-stone-300 mt-1">
                  Exodus Readiness Score
                </div>
              </div>
            </Link>
          </motion.div>
        </section>

        {/* 2B. 2-COLUMN MODULAR SPLIT: QUICK LAUNCH WORKBENCHES & SANCTUARY ACTIVITY (NEURONEST LAYOUT) */}
        <section
          aria-label="Quick Launch Workbenches and Sanctuary Activity"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* LEFT CONTAINER (6 Cols): Quick Launch Workbenches (Matte Charcoal Cards + Active Pills) */}
          <div
            className={cn(
              'lg:col-span-6 p-5 sm:p-6 rounded-3xl border flex flex-col justify-between gap-4',
              isCharcoal
                ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                : glassSurfaceClass
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-stone-900 dark:text-white tracking-tight">
                Quick Launch Workbenches
              </h2>
              <Link
                to="/calculators"
                className="text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                All Suites →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {POWER_TOOLS_DOCK.slice(0, 4).map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    to={tool.to}
                    className="group p-4 rounded-2xl bg-stone-100/90 dark:bg-[#1E1E22] hover:bg-stone-200/80 dark:hover:bg-[#25252A] border border-stone-200/90 dark:border-white/10 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        {quickDistrict.name} · {tool.meta}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        <span>Active</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-amber-300 transition-colors">
                        {tool.title}
                      </h3>
                      <Icon size={16} className={cn('shrink-0', tool.accent)} />
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
                      {tool.desc}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-semibold">
                        <Layers size={12} className="text-stone-400 shrink-0" />
                        <span>{quickEstimates.orchardPitCount} Pits · {quickDistrict.rainfallAnnualMm}mm/yr</span>
                      </span>
                      <span className="text-emerald-700 dark:text-amber-300 font-bold group-hover:underline">
                        Open Suite →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTAINER (6 Cols): Recent Activity & Adventist Family Hearth (Pastel Cards) */}
          <div
            className={cn(
              'lg:col-span-6 p-5 sm:p-6 rounded-3xl border flex flex-col justify-between gap-4',
              isCharcoal
                ? 'bg-white dark:bg-[#161619] border-stone-300/80 dark:border-white/12'
                : glassSurfaceClass
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-stone-900 dark:text-white tracking-tight">
                Family Hearth &amp; Sabbath Watch
              </h2>
              <button
                type="button"
                onClick={() =>
                  setDevotionalIndex((prev) => (prev + 1) % DAILY_DEVOTIONALS.length)
                }
                className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Next Devotional</span>
                <RefreshCw size={11} />
              </button>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* Pastel Activity Card 1 (Soft Ice Blue #DCE6F2 / dark:slate — Family Worship Altar) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#DCE6F2] dark:bg-[#182333] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-white/15 dark:ring-1 dark:ring-white/5 flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-xs text-stone-900 dark:text-stone-200 font-bold">
                  <span>Morning &amp; Evening Altar · {todayDevotional.scripture.reference} (KJV)</span>
                  <Link
                    to="/devotional"
                    title="Open Devotional Treasury"
                    className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-stone-950 dark:text-stone-100 font-bold"
                  >
                    <BookOpen size={14} />
                  </Link>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-stone-950 dark:text-white leading-snug">
                  “{todayDevotional.scripture.verse}”
                </h3>

                <p className="text-xs text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                  <strong className="text-stone-950 dark:text-white font-bold">{todayDevotional.egwQuote.egwCode}:</strong> “{todayDevotional.egwQuote.text}”
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/15 dark:border-white/10">
                  <span className="font-mono text-xs font-bold text-[#1E3A8A] dark:text-sky-300">
                    Spirit of Prophecy · Family Altar
                  </span>
                  <Link
                    to="/devotional"
                    className="text-xs font-extrabold text-stone-950 dark:text-amber-300 hover:underline"
                  >
                    Read Full Study →
                  </Link>
                </div>
              </div>

              {/* Pastel Activity Card 2 (Soft Sage Mint #DCF2DE / dark:emerald — Malawi Sabbath Sunset) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#DCF2DE] dark:bg-[#12281D] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-emerald-600/35 dark:ring-1 dark:ring-white/5 flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-xs text-stone-900 dark:text-stone-200 font-bold">
                  <span>Malawi Sabbath Eve Sunset · {currentMonthName} (CAT UTC+2)</span>
                  <Sun size={14} className="text-stone-950 dark:text-amber-300" />
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-stone-950 dark:text-white tabular-nums">
                  North {sabbathSunset.north} · Central {sabbathSunset.central} · South {sabbathSunset.south}
                </h3>

                <p className="text-xs text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                  Friday tool-down: <strong className="text-stone-950 dark:text-white font-bold">{sabbathSunset.guardCentral} CAT</strong>. Before sunset, gather the family to read God’s word, sing and pray (<em>6T 356</em>).
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/15 dark:border-white/10">
                  <span className="font-mono text-xs font-bold text-[#14532D] dark:text-emerald-300">
                    Leviticus 23:32 · 6T 356
                  </span>
                  <Link
                    to="/devotional"
                    className="text-xs font-extrabold text-stone-950 dark:text-amber-300 hover:underline"
                  >
                    Friday Checklist →
                  </Link>
                </div>
              </div>

              {/* Pastel Activity Card 3 (Soft Buttercream #FBF3C9 / dark:amber — Children's Nature Classroom) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF3C9] dark:bg-[#282110] text-stone-950 dark:text-stone-100 border border-black/10 dark:border-amber-600/35 dark:ring-1 dark:ring-white/5 flex flex-col gap-2.5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-900 dark:text-stone-200 font-bold">
                  <span>Children’s Nature Classroom ({activeYouthTrack.counselRef})</span>
                  <div className="inline-flex items-center gap-1 bg-black/10 dark:bg-white/10 p-0.5 rounded-lg">
                    {(['ages-4-8', 'ages-9-13', 'ages-14-18'] as YouthAgeTrack[]).map(
                      (trackKey) => {
                        const track = FAMILY_NATURE_CURRICULUM[trackKey];
                        const active = selectedAgeTrack === trackKey;
                        return (
                          <button
                            key={trackKey}
                            type="button"
                            onClick={() => setSelectedAgeTrack(trackKey)}
                            className={cn(
                              'px-2 py-0.5 rounded-md font-mono text-xs transition-colors cursor-pointer',
                              active
                                ? 'bg-stone-950 dark:bg-amber-400 text-white dark:text-stone-950 font-bold'
                                : 'text-stone-800 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-semibold'
                            )}
                          >
                            {track.label}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-stone-950 dark:text-white">
                  {activeYouthTrack.subtitle}
                </h3>

                <p className="text-xs text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                  <strong className="text-stone-950 dark:text-white font-bold">Lesson:</strong> {activeYouthTrack.objectLesson} · <strong className="text-stone-950 dark:text-white font-bold">Trade:</strong> {activeYouthTrack.practicalSkill}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-black/15 dark:border-white/10">
                  <span className="font-mono text-xs font-bold text-stone-900 dark:text-amber-300">
                    Avondale Model
                  </span>
                  <Link
                    to={activeYouthTrack.linkTo}
                    className="text-xs font-extrabold text-stone-950 dark:text-amber-300 hover:underline"
                  >
                    {activeYouthTrack.linkLabel} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE CLIMATE ZONE & 28-DISTRICT EXPLORER */}
        <section
          id="climate-explorer-section"
          aria-label="Malawi Climate Zones and 28-District Explorer"
          className={cn('p-5 sm:p-6 rounded-2xl flex flex-col gap-4 scroll-mt-20', glassSurfaceClass)}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <span
                className={cn(
                  'text-xs font-semibold',
                  isSapphire ? 'text-sky-700 dark:text-sky-300' : 'text-emerald-800 dark:text-amber-300'
                )}
              >
                Malawi Agro-Ecological Zones · 28 Districts
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                Match Your Family to the Right Altitude, Rainfall &amp; Soil
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className={cn(
                  'inline-flex items-center gap-1 p-1 rounded-xl border',
                  isSapphire
                    ? 'bg-sky-50/90 dark:bg-[#051326]/90 border-sky-200/80 dark:border-sky-800/60'
                    : 'bg-stone-100/90 dark:bg-[#06150D]/90 border-stone-200/90 dark:border-emerald-800/60'
                )}
              >
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
                        'px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer',
                        active
                          ? isSapphire
                            ? 'bg-sky-700 text-white dark:bg-sky-500 font-bold shadow-xs'
                            : 'bg-emerald-800 text-white dark:bg-amber-400 dark:text-stone-950 font-bold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                      )}
                    >
                      <Icon size={13} />
                      <span>{zoneBtn.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowFullDistrictMatrix((prev) => !prev)}
                className={cn(
                  'px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors',
                  showFullDistrictMatrix
                    ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                    : 'bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-stone-800 dark:text-stone-100 border-stone-300/80 dark:border-white/15'
                )}
              >
                <span>{showFullDistrictMatrix ? 'Hide 28-District Table' : 'Compare All 28 Districts'}</span>
                <ChevronDown
                  size={13}
                  className={cn('transition-transform', showFullDistrictMatrix && 'rotate-180')}
                />
              </button>
            </div>
          </div>

          {/* Clean Hairline 3-Column Readout + District Links */}
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-3.5 border-t text-xs',
              isSapphire
                ? 'border-sky-200/70 dark:border-sky-800/50'
                : 'border-stone-200/80 dark:border-emerald-900/60'
            )}
          >
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">
                  {activeClimateZone.title} · <strong className="font-mono text-stone-800 dark:text-stone-200">{activeClimateZone.elevation}</strong>
                </span>
                <p className="text-stone-800 dark:text-stone-100 font-medium leading-relaxed mt-1">
                  {activeClimateZone.feel}
                </p>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">
                  Ideal Staples &amp; Orchards
                </span>
                <p className="text-stone-800 dark:text-stone-100 font-medium leading-relaxed mt-1">
                  {activeClimateZone.crops}
                </p>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block">
                  Aquifers, Springs &amp; Rainfall
                </span>
                <p className="text-stone-800 dark:text-stone-100 font-medium leading-relaxed mt-1">
                  {activeClimateZone.waterNote}
                </p>
              </div>
            </div>

            <div
              className={cn(
                'lg:col-span-4 flex flex-col gap-1.5 lg:border-l lg:pl-4',
                isSapphire
                  ? 'lg:border-sky-200/80 dark:lg:border-sky-800/50'
                  : 'lg:border-stone-200/80 dark:lg:border-emerald-900/60'
              )}
            >
              <span className="text-stone-500 dark:text-stone-400">
                Inspect District on GIS Map:
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {activeClimateZone.districts.map((dist) => (
                  <Link
                    key={dist.id}
                    to={`/scout-map?district=${dist.id}`}
                    className={cn(
                      'text-xs font-semibold hover:underline inline-flex items-center gap-0.5',
                      isSapphire ? 'text-sky-800 dark:text-sky-300' : 'text-emerald-800 dark:text-amber-300'
                    )}
                  >
                    <span>{dist.name}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Expandable Full 28-District Comparison Matrix */}
          {showFullDistrictMatrix && (
            <div className="pt-4 border-t border-stone-200/80 dark:border-white/10 flex flex-col gap-3">
              <Suspense
                fallback={
                  <div className="p-6 text-center text-xs font-mono text-stone-500">
                    Loading 28-District Soil &amp; Water Comparison Matrix...
                  </div>
                }
              >
                <DistrictRegistryExplorer embedded />
              </Suspense>
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullDistrictMatrix(false);
                    document.getElementById('climate-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-200/90 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <ChevronDown size={13} className="rotate-180" />
                  <span>Collapse 28-District Table ↑</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 3. THE FOUR PILLARS OF COUNTRY LIVING (ZERO NESTED CARD BORDERS) */}
        <section aria-label="The Four Pillars of Country Living" className="flex flex-col gap-3.5">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
              The Four Pillars of Sanctuary Living
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 font-medium">
              Grounded in Spirit of Prophecy counsel, Malawi customary law, and practical agro-engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FOUR_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className={cn(
                  'p-5 rounded-2xl card-depth-lift flex flex-col sm:flex-row items-stretch gap-5 group',
                  glassSurfaceClass
                )}
              >
                {/* Unboxed Vector Illustration Showcase */}
                <div className="w-full sm:w-32 shrink-0 flex flex-col items-center justify-center relative">
                  <span
                    className={cn(
                      'self-start text-xs font-mono font-bold',
                      isSapphire ? 'text-sky-700 dark:text-sky-300' : 'text-emerald-800 dark:text-amber-300'
                    )}
                  >
                    {pillar.number}.
                  </span>
                  <CountryIcon
                    name={pillar.iconName}
                    className="w-full h-24 sm:h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Editorial Content + Clean Typographic Links */}
                <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                      <span
                        className={cn(
                          'font-bold',
                          isSapphire ? 'text-sky-800 dark:text-sky-300' : 'text-emerald-800 dark:text-emerald-300'
                        )}
                      >
                        {pillar.subtitle}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-stone-700 dark:text-stone-200">{pillar.proofLine}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-stone-950 dark:text-white leading-snug mt-1">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-stone-800 dark:text-stone-100 font-medium leading-relaxed mt-1">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Clean Unboxed Typographic Navigation Links */}
                  <div
                    className={cn(
                      'pt-2.5 border-t flex flex-wrap items-center gap-x-3 gap-y-1 text-xs',
                      isSapphire
                        ? 'border-sky-100 dark:border-sky-900/60'
                        : 'border-stone-200/80 dark:border-emerald-900/60'
                    )}
                  >
                    {pillar.links.map((item, idx) => (
                      <React.Fragment key={item.to}>
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-stone-400 dark:text-white/30">
                            ·
                          </span>
                        )}
                        <Link
                          to={item.to}
                          className={cn(
                            'font-bold hover:underline inline-flex items-center gap-1',
                            isSapphire
                              ? 'text-sky-900 dark:text-sky-300'
                              : 'text-emerald-900 dark:text-amber-300'
                          )}
                        >
                          <span>{item.label}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ILLUSTRATED 1844 PROPHETIC PANORAMA & LIVE AGRO-WEATHER */}
        <section
          id="prophetic-section"
          aria-label="Prophetic Panorama and Live Agro-Weather"
          className={cn('p-5 sm:p-6 rounded-2xl flex flex-col gap-4 text-stone-100 scroll-mt-20', glassHeroClass)}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <Sparkles size={13} />
                <span>Illustrated Prophetic Panorama · 1844 to the Earth Made New</span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                From 1844 to the Final Exodus: Why Packing Before the Siege Beats Waiting for a Traffic Report
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowFullPropheticChart((prev) => !prev)}
                className="px-4 py-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md"
              >
                <span>{showFullPropheticChart ? 'Collapse 1844 Chart' : 'Expand Interactive 1844 Chart'}</span>
                <ChevronDown
                  size={13}
                  className={cn('transition-transform', showFullPropheticChart && 'rotate-180')}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveDeepTelemetry((prev) => (prev === 'weather' ? 'none' : 'weather'))
                }
                className={cn(
                  'px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors',
                  activeDeepTelemetry !== 'none'
                    ? 'bg-white/20 text-white border-amber-300/60'
                    : 'bg-white/5 hover:bg-white/12 text-stone-200 border-white/15'
                )}
              >
                <CloudSun size={13} className="text-amber-300" />
                <span>7-Day Weather &amp; Soil Cutaway</span>
              </button>

              <Link
                to="/vision"
                className="px-3 py-2 text-xs font-semibold text-amber-200 hover:text-white underline underline-offset-4 whitespace-nowrap"
              >
                EGW Vault →
              </Link>
            </div>
          </div>

          {/* 6-Plate Visual Filmstrip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PROPHETIC_PLATES_PREVIEW.map((plate) => (
              <button
                key={plate.epoch}
                type="button"
                onClick={() => setShowFullPropheticChart((prev) => !prev)}
                className={cn(
                  'group relative h-28 rounded-xl overflow-hidden border transition-all text-left cursor-pointer shadow-md',
                  isSapphire
                    ? 'border-sky-300/25 hover:border-amber-400 bg-[#030D1A]'
                    : 'border-emerald-300/25 hover:border-amber-400 bg-[#030E08]'
                )}
              >
                <img
                  src={plate.image}
                  alt={plate.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_22%] opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2">
                  <span className="text-xs font-mono font-bold text-amber-300 block">
                    {plate.epoch}
                  </span>
                  <span className="text-xs font-semibold text-white leading-tight line-clamp-1">
                    {plate.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Inline Expandable 1844 Prophetic Panorama */}
          {showFullPropheticChart && (
            <div className="pt-4 border-t border-white/15 flex flex-col gap-3">
              <Suspense
                fallback={
                  <div className="p-6 text-center text-xs font-mono text-stone-300">
                    Loading 1844 Prophetic Panorama...
                  </div>
                }
              >
                <PropheticTimeline1844 />
              </Suspense>
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullPropheticChart(false);
                    document.getElementById('prophetic-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                >
                  <ChevronDown size={13} className="rotate-180" />
                  <span>Collapse 1844 Panorama ↑</span>
                </button>
              </div>
            </div>
          )}

          {/* Inline Expandable 7-Day Agro-Weather & Soil Cutaway */}
          {activeDeepTelemetry !== 'none' && (
            <div className="pt-4 border-t border-white/15 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-amber-300 font-bold">
                  LIVE MALAWI AGRO-METEOROLOGY &amp; AQUIFER CUTAWAY
                </span>
                <div className="inline-flex items-center rounded-xl bg-black/35 border border-white/15 p-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveDeepTelemetry('weather')}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer',
                      activeDeepTelemetry === 'weather'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-300 hover:text-white'
                    )}
                  >
                    7-Day Farming Weather
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepTelemetry('strata')}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer',
                      activeDeepTelemetry === 'strata'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-300 hover:text-white'
                    )}
                  >
                    Soil &amp; Well Depth Cutaway
                  </button>
                </div>
              </div>

              <div className="text-stone-900 dark:text-stone-100">
                <Suspense
                  fallback={
                    <div className="p-6 text-center text-xs font-mono text-stone-300">
                      Loading Agro-Weather &amp; Soil Strata Telemetry...
                    </div>
                  }
                >
                  {activeDeepTelemetry === 'weather' ? (
                    <MalawiAgriWeatherForecast embedded />
                  ) : (
                    <SoilStrataBlueprint />
                  )}
                </Suspense>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDeepTelemetry('none');
                    document.getElementById('prophetic-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                >
                  <ChevronDown size={13} className="rotate-180" />
                  <span>Collapse Telemetry &amp; Cutaway ↑</span>
                </button>
              </div>
            </div>
          )}
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
    </div>
  );
}
