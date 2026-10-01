import React, { useState, useMemo, useEffect } from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { CountryLivingIntroQuote } from '@/components/home/CountryLivingIntroQuote';
import { MalawiAgriWeatherForecast } from '@/components/home/MalawiAgriWeatherForecast';
import { BotanicalEmblemCrestCard } from '@/components/home/BotanicalEmblemCrestCard';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { DistrictRegistryExplorer } from '@/components/home/DistrictRegistryExplorer';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { PropheticTimeline1844 } from '@/components/vision/PropheticTimeline1844';
import { CountryIcon, CountryIconName } from '@/components/icons/CountryIcons';
import { COUNTRY_IMAGES } from '@/assets/images';
import {
  DISTRICT_LIST,
  HOMESTEAD_GENERAL_CONSTANTS,
  PLANTING_PIT_SPECS,
} from '@/constants';
import { calculateHomesteadReadinessScore } from '@/lib/offlineStorage';
import { fetchVerifiedTelemetryWithFallback } from '@/lib/apiClient';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { BeginnerGlossaryModal } from '@/components/common/BeginnerGlossaryModal';
import { cn } from '@/lib/utils';

type WorkspaceTab = 'overview' | 'atlas' | 'sizer' | 'prophecy' | 'weather-strata';
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
    feel: 'Crisp mountain air (14–23°C), pine ridges & very low malaria risk.',
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
    feel: 'Balanced sunshine (24–28°C), mild nights & gentle contour slopes.',
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
    feel: 'Tropical warmth year-round (26–32°C) & peak solar power output.',
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
      'Trace the prophetic timeline from 1844 to the final crisis and see why raising children in nature builds resilient character.',
    proofLine: 'EGW Estate · Daniel 8:14',
    links: [
      { label: '1844 Prophetic Timeline', to: '/vision' },
      { label: 'Daily Devotionals', to: '/devotional' },
      { label: '15-Step Roadmap', to: '/tracker' },
    ],
  },
  {
    number: '02',
    title: 'Finding Water-Rich, Legal Land',
    subtitle: '28 Districts & Customary Law',
    iconName: 'map',
    summary:
      'Locate customary land with year-round spring water, check well depth before buying, and follow respectful village chief (Mfumu) steps.',
    proofLine: 'Land Act 2016 · AQUASTAT',
    links: [
      { label: '28-District GIS Map', to: '/scout-map' },
      { label: '100-Point Plot Rubric', to: '/suitability' },
      { label: 'Land Law & Chichewa', to: '/where' },
    ],
  },
  {
    number: '03',
    title: 'Growing Food & Harvesting Sun',
    subtitle: 'Permaculture & Off-Grid Sizing',
    iconName: 'soil',
    summary:
      'Turn red clay or sandy loam into a drought-proof food forest with 3×3×3ft moisture-sponge tree pits, rainwater tanks, and 48V solar.',
    proofLine: 'DCCMS · FAO HWSD v2.0',
    links: [
      { label: 'Acres, Water & Solar Sizer', to: '/calculators' },
      { label: 'Soil & 3×3×3ft Tree Pits', to: '/agriculture' },
      { label: 'Malawi Planting Calendar', to: '/seasons' },
    ],
  },
  {
    number: '04',
    title: 'Living Debt-Free & Self-Reliant',
    subtitle: 'Practical Skills & Natural Health',
    iconName: 'outpost',
    summary:
      'Master 25 hands-on country skills—from burnt-brick building and gravity water rams to hydrotherapy poultices and rural mission schools.',
    proofLine: 'Avondale Model · 25 Manuals',
    links: [
      { label: 'Homestead Blueprints', to: '/blueprints' },
      { label: '25 Country Skills Manual', to: '/skills' },
      { label: 'Outpost Family Directory', to: '/community' },
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

export default function Home() {
  const [showWelcomeQuote, setShowWelcomeQuote] = useState(false);
  const [showBeginnerWizard, setShowBeginnerWizard] = useState(false);
  const [showBeginnerGlossary, setShowBeginnerGlossary] = useState(false);
  const [glossaryInitialTab, setGlossaryInitialTab] = useState<'glossary' | 'visual-guide'>('glossary');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<WorkspaceTab>('overview');
  const [selectedClimateZone, setSelectedClimateZone] = useState<ClimateLifestyleId>('highlands');
  const [weatherSubView, setWeatherSubView] = useState<'weather' | 'strata'>('weather');
  const [devotionalIndex, setDevotionalIndex] = useState<number>(0);

  // Interactive Quick Homestead Sizer state
  const [quickFamilySize, setQuickFamilySize] = useState<number>(5);
  const [quickDistrictId, setQuickDistrictId] = useState<string>('dedza');
  const [quickRoofAreaSqm, setQuickRoofAreaSqm] = useState<number>(85);
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
    if (activeWorkspaceTab !== 'sizer') return;
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
  }, [quickDistrict, activeWorkspaceTab]);

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

  return (
    <div className="min-h-full bg-[#FAF8F5] dark:bg-[#08130D] text-stone-800 dark:text-stone-100 flex flex-col selection:bg-amber-200 dark:selection:bg-emerald-900 selection:text-amber-950 dark:selection:text-emerald-100 pb-12 transition-colors">
      <CountryLivingIntroQuote
        forceShow={showWelcomeQuote}
        onClose={() => setShowWelcomeQuote(false)}
      />

      {/* ====================================================================
          1. HERO STAGE: LAYERED VECTOR MOUNTAIN SCENERY + UN-SQUISHED CREST
      ==================================================================== */}
      <section
        id="hero-sanctuary"
        aria-label="Country Living Sanctuary Hero"
        className="relative border-b border-stone-200 dark:border-emerald-950 text-stone-100 overflow-hidden"
      >
        {/* Layered SVG Mountain Ridges, Golden Dawn Sunbeams, Elevation Contours & Living Stream */}
        <HomeSceneryBackground
          activeScene={
            selectedClimateZone === 'highlands'
              ? 'highlands'
              : selectedClimateZone === 'lakeshore'
              ? 'waters'
              : 'sanctuary'
          }
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 pb-5 relative z-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left (8 Cols): Clean Un-Boxed Hero Stage Directly Over Vector Mountain Scenery */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-4 text-left">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-mono font-bold text-amber-300 tracking-wider">
                  THE COUNTRY LIVING BLUEPRINT · MALAWI HIGHLANDS &amp; VALLEYS
                </span>
                <span className="text-emerald-500/60">·</span>
                <button
                  type="button"
                  onClick={() => setShowWelcomeQuote(true)}
                  className="inline-flex items-center gap-1 text-emerald-200 hover:text-amber-300 underline cursor-pointer font-medium"
                >
                  <Feather size={12} />
                  <span>Read the Inspired Call (CL 9.1)</span>
                </button>
              </div>

              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] text-balance drop-shadow-sm">
                  Step Out of the Cities. Build Your Family’s Self-Reliant Sanctuary.
                </h1>
                <p className="text-sm sm:text-base text-stone-200 mt-3 leading-relaxed max-w-2xl">
                  Discover where to find year-round spring water, fertile highland soil, and legal customary land across all 28 districts of Malawi—guided by timeless prophetic counsel and real field data.
                </p>
              </div>

              <blockquote className="border-l-2 border-amber-400 pl-4 py-1 text-xs sm:text-sm text-amber-100/95 italic font-serif max-w-2xl bg-black/25 backdrop-blur-xs rounded-r-xl pr-4">
                “Get out of the cities as soon as possible and purchase a little piece of land, where you can have a garden, where your children can watch the flowers growing, and learn from them lessons of simplicity and purity.”
                <span className="not-italic font-mono text-[11px] text-amber-300 ml-2">
                  — Ellen G. White, Country Living, p. 24.2
                </span>
              </blockquote>

              {/* Primary Hero Actions */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  to="/scout-map"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Compass size={14} />
                  <span>Explore Ideal Land on the Map</span>
                  <ArrowRight size={13} />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowBeginnerWizard(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-100 border border-emerald-500/40 font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap backdrop-blur-md"
                >
                  <Sprout size={14} className="text-amber-300" />
                  <span>Find My Best District (60-Sec Quiz)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGlossaryInitialTab('glossary');
                    setShowBeginnerGlossary(true);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-stone-950/70 hover:bg-stone-900 text-stone-200 border border-white/15 font-medium text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap backdrop-blur-md"
                >
                  <BookOpen size={13} className="text-amber-300" />
                  <span>Plain-English &amp; Chichewa Guide</span>
                </button>
              </div>

              {/* Sleek Single-Row Live Family Homestead & Transition Bar */}
              <div className="mt-1 p-3.5 rounded-2xl bg-stone-950/75 backdrop-blur-xl border border-white/15 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                {/* Family Size + Instant Sizer Numbers (7 Cols) */}
                <div className="sm:col-span-7 flex flex-wrap items-center justify-between gap-2 sm:border-r sm:border-white/10 sm:pr-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-stone-300 font-medium">Family of</span>
                    <button
                      type="button"
                      onClick={() => setQuickFamilySize((s) => Math.max(1, s - 1))}
                      className="w-5 h-5 rounded bg-emerald-900/90 hover:bg-emerald-700 text-white font-mono text-xs font-bold flex items-center justify-center cursor-pointer"
                      aria-label="Decrease family size"
                    >
                      −
                    </button>
                    <span className="font-mono font-bold text-amber-300 text-xs tabular-nums px-1">
                      {quickFamilySize}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickFamilySize((s) => Math.min(12, s + 1))}
                      className="w-5 h-5 rounded bg-emerald-900/90 hover:bg-emerald-700 text-white font-mono text-xs font-bold flex items-center justify-center cursor-pointer"
                      aria-label="Increase family size"
                    >
                      +
                    </button>
                    <span className="text-[11px] text-stone-400">needs:</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveWorkspaceTab('sizer')}
                    className="flex flex-wrap items-center gap-2.5 text-xs font-mono tabular-nums hover:text-amber-300 transition-colors cursor-pointer"
                    title="Click to open interactive Family Homestead Sizer"
                  >
                    <span className="text-white font-bold">{quickEstimates.totalAcres} Acres</span>
                    <span className="text-stone-500">·</span>
                    <span className="text-sky-300 font-bold">
                      {Math.round(quickEstimates.annualRainwaterLiters / 1000)}k L Rain
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-amber-300 font-bold">
                      {quickEstimates.recommendedSolarKw}kW Solar
                    </span>
                  </button>
                </div>

                {/* 15-Step Transition Roadmap Progress (5 Cols) */}
                <div className="sm:col-span-5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-emerald-300 font-semibold flex items-center gap-1 truncate">
                        <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                        <span>15-Step Roadmap</span>
                      </span>
                      <span className="font-mono text-amber-300 font-bold tabular-nums">
                        {completedMilestonesCount}/{totalPossibleItems} ({readinessPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-black/60 rounded-full h-1.5 border border-emerald-900 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(6, readinessPercentage)}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    to="/tracker"
                    className="text-[11px] font-semibold text-amber-300 hover:underline shrink-0"
                  >
                    Checklist →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right (4 Cols): Full-Width Un-Squished Botanical Emblem Crest Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <BotanicalEmblemCrestCard className="w-full max-w-sm" />
            </div>
          </div>

          {/* ====================================================================
              2. DESKTOP PERSPECTIVE SWITCHER BAR + DAILY THOUGHT TICKER
          ==================================================================== */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div
              role="tablist"
              aria-label="Sanctuary Home Desktop Views"
              className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-stone-950/85 backdrop-blur-xl border border-white/15"
            >
              {[
                { id: 'overview', label: '01 · Start Here: Vision & 4 Pillars' },
                { id: 'atlas', label: '02 · Compare All 28 Districts (Water & Soil)' },
                { id: 'sizer', label: '03 · How Much Land, Water & Solar Do We Need?' },
                { id: 'prophecy', label: '04 · From 1844 to the Final Crisis (Illustrated)' },
                { id: 'weather-strata', label: '05 · Live Weather & Underground Water' },
              ].map((tab) => {
                const isActive = activeWorkspaceTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveWorkspaceTab(tab.id as WorkspaceTab)}
                    className={cn(
                      'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
                      isActive
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Compact Daily Manna Inline Switcher */}
            <div className="hidden xl:flex items-center gap-2.5 text-xs text-stone-300 max-w-sm truncate">
              <span className="font-mono text-[11px] text-amber-300 shrink-0">
                {todayDevotional.egwQuote.egwCode}:
              </span>
              <span className="italic truncate text-stone-200">
                “{todayDevotional.egwQuote.text}”
              </span>
              <button
                type="button"
                onClick={() =>
                  setDevotionalIndex((prev) => (prev + 1) % DAILY_DEVOTIONALS.length)
                }
                className="text-emerald-300 hover:text-amber-300 font-mono text-[11px] shrink-0 cursor-pointer"
                title="Next Ellen G. White Country Living Quote"
              >
                ↻
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          WORKSPACE VIEW 1: HIGH-EFFICIENCY HORIZONTAL CARDS & CLIMATE MATCHER
      ==================================================================== */}
      {activeWorkspaceTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-5 w-full">
          {/* 1. Compact Horizontal Climate & District Matcher Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-3.5 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                  STEP 1 · PICK YOUR MALAWI CLIMATE ZONE
                </span>
                <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
                <span className="text-xs text-stone-600 dark:text-stone-300">
                  Click a growing zone to see matching districts &amp; switch the mountain backdrop:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-emerald-900/60">
                {[
                  { id: 'highlands' as const, label: 'Cool Mist Highlands', icon: Mountain },
                  { id: 'mid-hills' as const, label: 'Fertile Mid-Valleys', icon: Trees },
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
                        'px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer',
                        active
                          ? 'bg-emerald-800 text-white dark:bg-amber-400 dark:text-stone-950 font-bold shadow-2xs'
                          : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                      )}
                    >
                      <Icon size={13} />
                      <span>{zoneBtn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Single-Row Tabular Readout + District Quick-Jump Chips */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center pt-3 border-t border-stone-200/70 dark:border-emerald-900/50 text-xs">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    {activeClimateZone.title} ({activeClimateZone.elevation})
                  </span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium leading-snug block mt-0.5">
                    {activeClimateZone.feel}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Best Staples &amp; Orchards
                  </span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium leading-snug block mt-0.5">
                    {activeClimateZone.crops}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Springs, Wells &amp; Rain
                  </span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium leading-snug block mt-0.5">
                    {activeClimateZone.waterNote}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-wrap items-center justify-between lg:justify-end gap-1.5 lg:border-l lg:border-stone-200/80 dark:lg:border-emerald-900/50 lg:pl-3.5">
                {activeClimateZone.districts.map((dist) => (
                  <Link
                    key={dist.id}
                    to={`/scout-map?district=${dist.id}`}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-emerald-800 hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 border border-stone-200 dark:border-emerald-800/70 text-[11px] font-semibold text-stone-800 dark:text-stone-200 transition-colors"
                  >
                    {dist.name} →
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceTab('atlas')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-amber-300 border border-emerald-300/70 dark:border-emerald-700/60 text-[11px] font-bold hover:underline cursor-pointer"
                >
                  All 28 Districts →
                </button>
              </div>
            </div>
          </div>

          {/* 2. High-Efficiency 2×2 Horizontal Split-Cards for the Four Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FOUR_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col sm:flex-row items-stretch gap-4 shadow-2xs group hover:border-emerald-600/50 dark:hover:border-amber-400/40 transition-colors"
              >
                {/* Left: Dedicated Vector Illustration Panel */}
                <div className="w-full sm:w-36 md:w-40 shrink-0 rounded-xl bg-[#FAF6EE] dark:bg-[#07150E] border border-[#E6DFD1] dark:border-emerald-900/70 p-2.5 flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="absolute top-1.5 left-2 text-[10px] font-mono font-bold text-emerald-800 dark:text-amber-300">
                    {pillar.number}
                  </span>
                  <CountryIcon
                    name={pillar.iconName}
                    className="w-full h-24 sm:h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right: Compact Title, 1-Sentence Benefit & Horizontal Action Chips */}
                <div className="flex-1 flex flex-col justify-between gap-2.5 min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-semibold text-emerald-800 dark:text-amber-300">
                        {pillar.subtitle}
                      </span>
                      <span className="font-mono text-[10px] text-stone-400 dark:text-stone-500 truncate">
                        {pillar.proofLine}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-stone-900 dark:text-stone-50 leading-snug mt-0.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-1">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Horizontal 3-Chip Action Bar (No Vertical Link Stacking) */}
                  <div className="pt-2.5 border-t border-stone-100 dark:border-emerald-950/80 flex flex-wrap items-center gap-1.5">
                    {pillar.links.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-100/90 hover:bg-emerald-800 text-stone-800 hover:text-white dark:bg-stone-900/90 dark:text-stone-200 dark:hover:bg-amber-400 dark:hover:text-stone-950 border border-stone-200/80 dark:border-emerald-900/60 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={11} className="opacity-70" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Magnetic 1844 Prophetic Spotlight with 6-Plate Visual Filmstrip Preview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#091A11] border border-amber-500/35 flex flex-col gap-3.5 text-stone-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300 font-bold">
                  <Sparkles size={12} />
                  <span>ILLUSTRATED PROPHETIC PANORAMA · 1844 TO THE EARTH MADE NEW</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                  From 1844 to the Final Exodus: Why Country Living Is Not Optional
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceTab('prophecy')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>Open 1844 Interactive Chart</span>
                  <ArrowRight size={13} />
                </button>
                <Link
                  to="/vision"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 text-xs font-semibold whitespace-nowrap"
                >
                  Verbatim EGW Vault
                </Link>
              </div>
            </div>

            {/* 6-Plate Visual Filmstrip Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {PROPHETIC_PLATES_PREVIEW.map((plate) => (
                <button
                  key={plate.epoch}
                  type="button"
                  onClick={() => setActiveWorkspaceTab('prophecy')}
                  className="group relative h-22 rounded-xl overflow-hidden border border-white/15 hover:border-amber-400 transition-all text-left cursor-pointer bg-black"
                >
                  <img
                    src={plate.image}
                    alt={plate.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="text-[9px] font-mono font-bold text-amber-300 block">
                      {plate.epoch}
                    </span>
                    <span className="text-[11px] font-semibold text-white leading-tight line-clamp-1">
                      {plate.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          WORKSPACE VIEW 2: 28-DISTRICT SOIL, WATER & PLANTING PIT ATLAS
      ==================================================================== */}
      {activeWorkspaceTab === 'atlas' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 w-full">
          <DistrictRegistryExplorer embedded />
        </div>
      )}

      {/* ====================================================================
          WORKSPACE VIEW 3: INTERACTIVE FAMILY HOMESTEAD & SOLAR SIZER
      ==================================================================== */}
      {activeWorkspaceTab === 'sizer' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 w-full">
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-emerald-950">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                  FAMILY HOMESTEAD &amp; OFF-GRID SIZER
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  How Much Land, Rainwater Storage &amp; Solar Power Does Your Family Need?
                </h2>
              </div>
              <Link
                to="/calculators"
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                <Calculator size={14} />
                <span>Open Full 6-Calculator Suite &amp; Budget</span>
              </Link>
            </div>

            {/* 3 Interactive Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="home-quick-district"
                    className="font-semibold text-stone-700 dark:text-stone-200"
                  >
                    1. Choose a Malawi District
                  </label>
                  <span className="font-mono text-emerald-800 dark:text-emerald-400 tabular-nums">
                    {quickDistrict.region} Region
                  </span>
                </div>
                <select
                  id="home-quick-district"
                  value={quickDistrictId}
                  onChange={(e) => setQuickDistrictId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-emerald-900/60 text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {DISTRICT_LIST.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.rainfallAnnualMm} mm/yr · {d.agroZone})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                  {quickDistrict.elevationRange} · Typical Well Depth ~{quickDistrict.aquiferDepthM}m
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="home-quick-family"
                    className="font-semibold text-stone-700 dark:text-stone-200"
                  >
                    2. People on the Homestead
                  </label>
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300 tabular-nums">
                    {quickFamilySize} {quickFamilySize === 1 ? 'Person' : 'People'}
                  </span>
                </div>
                <input
                  id="home-quick-family"
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={quickFamilySize}
                  onChange={(e) => setQuickFamilySize(Number(e.target.value))}
                  className="w-full accent-emerald-700 dark:accent-emerald-400 cursor-pointer my-1.5"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                  <span>1 Solo</span>
                  <span>6 Family</span>
                  <span>12 Outpost Team</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="home-quick-roof"
                    className="font-semibold text-stone-700 dark:text-stone-200"
                  >
                    3. Roof Size for Catching Rain
                  </label>
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-300 tabular-nums">
                    {quickRoofAreaSqm} m²
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 my-0.5">
                  {[
                    { label: 'Cottage (50m²)', sqm: 50 },
                    { label: 'Family (90m²)', sqm: 90 },
                    { label: 'Large (140m²)', sqm: 140 },
                  ].map((preset) => (
                    <button
                      key={preset.sqm}
                      type="button"
                      onClick={() => setQuickRoofAreaSqm(preset.sqm)}
                      className={cn(
                        'py-1 px-2 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer',
                        quickRoofAreaSqm === preset.sqm
                          ? 'bg-sky-700 text-white border-sky-800'
                          : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-emerald-900/50 hover:bg-stone-100'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  id="home-quick-roof"
                  type="range"
                  min={40}
                  max={240}
                  step={10}
                  value={quickRoofAreaSqm}
                  onChange={(e) => setQuickRoofAreaSqm(Number(e.target.value))}
                  className="w-full accent-sky-600 dark:accent-sky-400 cursor-pointer"
                />
              </div>
            </div>

            {/* 4 Computed Outputs as High-Efficiency Horizontal Split-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/50 flex items-center gap-4">
                <div className="w-24 h-20 rounded-xl bg-[#FAF6EE] dark:bg-[#07150E] border border-stone-200/70 dark:border-emerald-900/50 p-1.5 shrink-0 flex items-center justify-center">
                  <CountryIcon name="homestead" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Total Land Needed</span>
                    <Sprout size={14} className="text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="font-mono text-2xl font-bold text-stone-900 dark:text-white tabular-nums">
                    {quickEstimates.totalAcres} Acres
                  </div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                    Yields ~{Math.ceil((quickFamilySize * 165) / 50)} × 50kg grain sacks/yr ({quickEstimates.stapleAcres}ac crops · {quickEstimates.orchardAcres}ac orchard)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/50 flex items-center gap-4">
                <div className="w-24 h-20 rounded-xl bg-[#FAF6EE] dark:bg-[#07150E] border border-stone-200/70 dark:border-emerald-900/50 p-1.5 shrink-0 flex items-center justify-center">
                  <CountryIcon name="cistern" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Free Roof Rainwater</span>
                    <Droplets size={14} className="text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="font-mono text-2xl font-bold text-stone-900 dark:text-white tabular-nums">
                    {quickEstimates.annualRainwaterLiters.toLocaleString()} L/yr
                  </div>
                  <div className="text-xs text-sky-800 dark:text-sky-300 font-semibold">
                    Store in {Math.max(1, Math.ceil((quickEstimates.annualRainwaterLiters * 0.25) / 5000))} × 5,000L tanks (~{Math.round(quickEstimates.annualRainwaterLiters / 365)} L/day)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/50 flex items-center gap-4">
                <div className="w-24 h-20 rounded-xl bg-[#FAF6EE] dark:bg-[#07150E] border border-stone-200/70 dark:border-emerald-900/50 p-1.5 shrink-0 flex items-center justify-center">
                  <CountryIcon name="solar" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Off-Grid Solar Power</span>
                    <Sun size={14} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="font-mono text-2xl font-bold text-stone-900 dark:text-white tabular-nums">
                    {quickEstimates.recommendedSolarKw} kW Solar
                  </div>
                  <div className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                    {Math.max(2, Math.ceil((quickEstimates.recommendedSolarKw * 1000) / 400))} × 400W panels + {quickEstimates.recommendedBatteryKwh}kWh battery ({quickEstimates.effectiveSunHours} hrs/day)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/50 flex items-center gap-4">
                <div className="w-24 h-20 rounded-xl bg-[#FAF6EE] dark:bg-[#07150E] border border-stone-200/70 dark:border-emerald-900/50 p-1.5 shrink-0 flex items-center justify-center">
                  <CountryIcon name="orchard" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>Drought-Proof Fruit Pits</span>
                    <Layers size={14} className="text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="font-mono text-2xl font-bold text-stone-900 dark:text-white tabular-nums">
                    {quickEstimates.orchardPitCount} Tree Pits
                  </div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                    Holds {quickPitSpec.waterRetentionLiters}L moisture/tree ({quickPitSpec.dimensionString} · {quickEstimates.totalBiocharKg}kg biochar)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/70 dark:border-emerald-950 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-900 dark:text-white">
                  {quickDistrict.name} Local Soil Profile:
                </span>
                <span>
                  {quickDistrict.primarySoil} ({quickDistrict.soilPh})
                </span>
                {isLoadingSizerTelemetry && (
                  <RefreshCw size={12} className="animate-spin text-emerald-600" />
                )}
              </div>

              <Link
                to={`/scout-map?district=${quickDistrict.id}`}
                className="font-semibold text-emerald-800 dark:text-amber-300 hover:underline inline-flex items-center gap-1"
              >
                <span>Explore {quickDistrict.name} on the Interactive Map</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          WORKSPACE VIEW 4: 1844 TO SECOND COMING PROPHETIC TIMELINE & VECTORS
      ==================================================================== */}
      {activeWorkspaceTab === 'prophecy' && (
        <div className="pt-2">
          <PropheticTimeline1844 />
        </div>
      )}

      {/* ====================================================================
          WORKSPACE VIEW 5: LIVE AGRO-WEATHER & SOIL / AQUIFER CUTAWAY
      ==================================================================== */}
      {activeWorkspaceTab === 'weather-strata' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-5 w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                LIVE WEATHER &amp; UNDERGROUND WATER GUIDE
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                {weatherSubView === 'weather'
                  ? '7-Day Malawi Farming Weather & Soil Moisture Forecast'
                  : 'How Rainwater Soaks Into Malawi’s Soil & Underground Wells'}
              </h2>
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-emerald-900/60">
              <button
                type="button"
                onClick={() => setWeatherSubView('weather')}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                  weatherSubView === 'weather'
                    ? 'bg-emerald-800 text-white'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                )}
              >
                7-Day Farming Weather
              </button>
              <button
                type="button"
                onClick={() => setWeatherSubView('strata')}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                  weatherSubView === 'strata'
                    ? 'bg-emerald-800 text-white'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                )}
              >
                Soil &amp; Well Depth Cutaway
              </button>
            </div>
          </div>

          {weatherSubView === 'weather' ? (
            <MalawiAgriWeatherForecast embedded />
          ) : (
            <SoilStrataBlueprint />
          )}
        </div>
      )}

      <OnboardingWizard
        isOpen={showBeginnerWizard}
        onClose={() => setShowBeginnerWizard(false)}
      />
      <BeginnerGlossaryModal
        isOpen={showBeginnerGlossary}
        onClose={() => setShowBeginnerGlossary(false)}
        initialTab={glossaryInitialTab}
      />
    </div>
  );
}
