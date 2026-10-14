import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sun, Droplets, Utensils, Compass, PieChart, ShieldCheck, Download, Sparkles, RefreshCw, Layers, CloudRain, DollarSign, Save, Check, Sprout, TrendingUp, Users, MapPin, Calendar, ArrowRight, Copy, CheckCircle2, Gauge } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { YieldComparisonChart } from '@/components/calculators/YieldComparisonChart';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { saveStoredSavedSpecs } from '@/lib/offlineStorage';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';
import { OffGridSizingTools } from '@/components/outpost/OffGridSizingTools';
import { HomesteadBoQEstimator } from '@/components/outpost/HomesteadBoQEstimator';
import { SeasonalWaterBalanceSimulator } from '@/components/water/SeasonalWaterBalanceSimulator';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon } from '@/components/icons/CountryIcons';
import { 
  SanctuaryCard, 
  SanctuaryButton, 
  SanctuaryBadge, 
  SanctuarySectionHeader, 
  SanctuaryStatBox 
} from '@/components/ui';
import { 
  DISTRICT_RAINFALL_PRESETS, 
  HOMESTEAD_WATER_CONSTANTS,
  PLANTING_PIT_SPECS,
  getDistrictRainfall 
} from '@/constants';

export default function Calculators() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const seasonParam = searchParams.get('season');

  const [showWizard, setShowWizard] = useState(false);
  const [activeTab, setActiveTab] = useState<'yield' | 'solar' | 'food' | 'land' | 'rainwater' | 'budget' | 'offgrid'>(() => {
    if (tabParam && ['yield', 'solar', 'food', 'land', 'rainwater', 'budget', 'offgrid'].includes(tabParam)) {
      return tabParam as any;
    }
    return 'yield';
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // Derived initial values from user setup profile
  const initialAcres = user?.landSizeAcres || 2.5;
  const initialMembers = user?.familyMembers || 4;
  const initialAdults = Math.max(1, Math.floor(initialMembers / 2));
  const initialChildren = Math.max(0, initialMembers - initialAdults);
  const districtQueryParam = searchParams.get('district');
  const initialDistrict = (districtQueryParam || getActiveHomesteadDistrictId(user?.district || 'dedza')).toLowerCase();

  // Solar Pump Sizing State
  const [depth, setDepth] = useState<number>(() => {
    const p = DISTRICT_RAINFALL_PRESETS[initialDistrict];
    return p?.aquiferDepthM || 35;
  }); // meters
  const [waterNeeded, setWaterNeeded] = useState<number>(() => {
    // If season is hot-dry, increase water requirements for dry season irrigation
    if (seasonParam === 'hot-dry') return initialMembers * 750;
    return initialMembers * 500;
  }); // Liters per day (~500L per person for domestic + irrigation)
  const [sunHours, setSunHours] = useState<number>(() => {
    if (seasonParam === 'hot-dry') return 6.5;
    if (seasonParam === 'cold-dry') return 5.8;
    if (seasonParam === 'rainy') return 4.5;
    return 5.5;
  }); // Peak sun hours per day

  // Food Reserve Sizing State
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);
  const [months, setMonths] = useState<number>(12);

  // Land Sizing State
  const [acres, setAcres] = useState<number>(initialAcres);

  // Rainwater Harvesting State
  const [roofAreaM2, setRoofAreaM2] = useState<number>(120); // square meters
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(() => {
    const p = DISTRICT_RAINFALL_PRESETS[initialDistrict];
    return p?.rainfall || 1100;
  }); // Dedza default mm
  const [districtPreset, setDistrictPreset] = useState<string>(initialDistrict);

  useEffect(() => {
    const onGlobalDistrict = (e: Event) => {
      const key = (e as CustomEvent<{ districtId: string }>).detail?.districtId;
      if (key && DISTRICT_RAINFALL_PRESETS[key]) {
        setDistrictPreset(key);
        const preset = DISTRICT_RAINFALL_PRESETS[key];
        setAnnualRainfallMm(preset.rainfall);
        if (preset.aquiferDepthM) setDepth(preset.aquiferDepthM);
        if (preset.solarKwhDay) setSunHours(preset.solarKwhDay);
      }
    };
    window.addEventListener('outpost:active-district-changed', onGlobalDistrict);
    return () => window.removeEventListener('outpost:active-district-changed', onGlobalDistrict);
  }, []);

  // Sync tab parameter changes from URL (including offgrid tab)
  useEffect(() => {
    if (tabParam && ['yield', 'solar', 'food', 'land', 'rainwater', 'budget', 'offgrid'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  // Auto-sync when profile updates, preserving seasonal hot-dry water multiplier
  useEffect(() => {
    if (user) {
      if (user.landSizeAcres) {
        setAcres(user.landSizeAcres);
        setLandCostUsd(Math.round(user.landSizeAcres * pricePerAcreUsd));
      }
      if (user.familyMembers) {
        const ad = Math.max(1, Math.floor(user.familyMembers / 2));
        const ch = Math.max(0, user.familyMembers - ad);
        setAdults(ad);
        setChildren(ch);
        const lpd = seasonParam === 'hot-dry' ? 750 : 500;
        setWaterNeeded(user.familyMembers * lpd);
      }
      if (user.district) {
        setDistrictPreset(user.district.toLowerCase());
      }
    }
  }, [user?.landSizeAcres, user?.familyMembers, user?.district, seasonParam]);

  // Budget Estimator State
  const [currency, setCurrency] = useState<'USD' | 'MWK'>('USD');
  const exchangeRate = 1750; // 1 USD ~ 1,750 MWK

  const [pricePerAcreUsd, setPricePerAcreUsd] = useState<number>(1000); // Standard rural Malawi customary estate guideline
  const [landCostUsd, setLandCostUsd] = useState<number>(() => Math.round(initialAcres * 1000));
  const [waterSetupUsd, setWaterSetupUsd] = useState<number>(2800); // Borehole + Solar Pump
  const [solarSystemUsd, setSolarSystemUsd] = useState<number>(2200); // PV + LiFePO4
  const [fencingUsd, setFencingUsd] = useState<number>(650); // Fencing & Live Hedge
  const [cottageUsd, setCottageUsd] = useState<number>(4500); // Earth Block Cottage
  const [seedsToolingUsd, setSeedsToolingUsd] = useState<number>(500); // Heirloom Seeds & Tools

  // Update land cost whenever user adjusts acres
  const handleAcresChange = (newAcres: number) => {
    setAcres(newAcres);
    setLandCostUsd(Math.round(newAcres * pricePerAcreUsd));
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // --- Calculations ---
  // Solar Pump Math
  const volumeM3 = waterNeeded / 1000;
  const hydraulicEnergyKWh = (1000 * 9.81 * depth * volumeM3) / 3600000;
  const requiredPvWattHours = (hydraulicEnergyKWh / 0.45) * 1000; // Wh
  const recommendedPvWatts = Math.round((requiredPvWattHours / sunHours) * 1.35); // 35% safety margin
  const recommendedTankSize = Math.round(waterNeeded * 2); // 2 days storage
  const minimumBoreholeFlow = (waterNeeded / (sunHours * 60)).toFixed(1); // L/min

  // Food Reserve Math
  const totalPeopleFactor = adults + (children * 0.65);
  const maizeKg = Math.round(totalPeopleFactor * 14 * months);
  const beansKg = Math.round(totalPeopleFactor * 3.5 * months);
  const groundnutsKg = Math.round(totalPeopleFactor * 2.2 * months);
  const tubersKg = Math.round(totalPeopleFactor * 9 * months);
  const saltKg = Math.round(totalPeopleFactor * 0.4 * months * 10) / 10;
  const waterLiters = Math.round(totalPeopleFactor * 300 * months);

  // Land Allocation Breakdown
  const zoneDwelling = Math.round(acres * 0.08 * 100) / 100; // 8%
  const zoneGarden = Math.round(acres * 0.15 * 100) / 100; // 15%
  const zoneOrchard = Math.round(acres * 0.22 * 100) / 100; // 22%
  const zoneCrops = Math.round(acres * 0.40 * 100) / 100; // 40%
  const zoneLivestockWater = Math.round(acres * 0.15 * 100) / 100; // 15%

  // Rainwater Catchment Math
  // Harvestable Volume = Roof Area (m2) * Annual Rainfall (m) * runoff efficiency * 1000 L/m3
  const harvestableVolumeLiters = Math.round(roofAreaM2 * (annualRainfallMm / 1000) * HOMESTEAD_WATER_CONSTANTS.runoffEfficiency * 1000);
  const drySeasonBufferDays = HOMESTEAD_WATER_CONSTANTS.drySeasonBufferDays; // Nov to Apr rainy season means ~150 dry days
  const recommendedCisternLiters = Math.min(harvestableVolumeLiters, Math.round(waterNeeded * HOMESTEAD_WATER_CONSTANTS.reserveBufferDays)); // 3 months dry coverage

  // Budget Total
  const totalBudgetUsd = landCostUsd + waterSetupUsd + solarSystemUsd + fencingUsd + cottageUsd + seedsToolingUsd;
  const totalBudgetMwk = totalBudgetUsd * exchangeRate;

  const [selectedPitType, setSelectedPitType] = useState<keyof typeof PLANTING_PIT_SPECS>('egwDeepPit');
  const [dimbaAreaSqm, setDimbaAreaSqm] = useState<number>(200);
  const dimbaDailyLiters = Math.round(dimbaAreaSqm * 4.5); // 4.5 L/m²/day mulched dry-season dimba rate
  const dimbaWateringCans20L = Math.ceil(dimbaDailyLiters / 20);
  const dimbaDripLinesMeters = Math.round(dimbaAreaSqm / 0.75); // 75cm ridge spacing

  const handleDistrictChange = (key: string) => {
    setDistrictPreset(key);
    setActiveHomesteadDistrictId(key);
    const preset = DISTRICT_RAINFALL_PRESETS[key];
    if (preset) {
      setAnnualRainfallMm(preset.rainfall);
      if (preset.aquiferDepthM) setDepth(preset.aquiferDepthM);
      if (preset.solarKwhDay) setSunHours(preset.solarKwhDay);
      if (preset.recommendedPitKey) setSelectedPitType(preset.recommendedPitKey);
    }
  };

  const saveSpecsToVault = () => {
    const specs = {
      timestamp: new Date().toISOString(),
      depth,
      waterNeeded,
      recommendedPvWatts,
      recommendedTankSize,
      adults,
      children,
      months,
      maizeKg,
      beansKg,
      acres,
      roofAreaM2,
      annualRainfallMm,
      harvestableVolumeLiters,
      totalBudgetUsd,
      totalBudgetMwk,
    };

    saveStoredSavedSpecs(specs);
    showToast('Sanctuary Specifications saved to your Outpost Vault!');
  };

  const generateSpecsSummaryText = (): string => {
    return `OUTPOST LIVING - SANCTUARY PLANNING SHEET
========================================
Generated: ${new Date().toLocaleDateString()}

1. SOLAR BOREHOLE PUMP SPECIFICATIONS
- Target Well Depth: ${depth} meters
- Daily Water Needs: ${waterNeeded} Liters/day
- Peak Solar Irradiation: ${sunHours} Hours/day
-> Recommended Solar PV Array: ${recommendedPvWatts} Watts
-> Storage Tank Capacity: ${recommendedTankSize} Liters
-> Min Borehole Flow Yield: ${minimumBoreholeFlow} L/min
-> Controller Spec: ${(recommendedPvWatts > 600 || depth > 45 || waterNeeded > 3500) ? '48V Controller' : '24V Controller'}

2. ${months}-MONTH HOMESTEAD FOOD & WATER RESERVE
- Household: ${adults} Adults, ${children} Children
-> Maize/Staple Grain: ${maizeKg} kg
-> Legumes / Beans: ${beansKg} kg
-> Oilseeds / Groundnuts: ${groundnutsKg} kg
-> Tubers (Sweet Potatoes/Cassava): ${tubersKg} kg
-> Mineral Salt Reserve: ${saltKg} kg
-> Pure Water Reserve Capacity: ${waterLiters} Liters

3. ${acres}-ACRE LAND ALLOCATION PLAN
- Dwelling & Rain Catchment: ${zoneDwelling} Acres
- Intensive Kitchen Organic Garden: ${zoneGarden} Acres
- Orchard & Agroforestry Windbreak: ${zoneOrchard} Acres
- Field Grain & Legume Crop Rotation: ${zoneCrops} Acres
- Livestock, Swales & Dambo Ponds: ${zoneLivestockWater} Acres

4. RAINWATER CATCHMENT ESTIMATE
- Iron Roof Surface Area: ${roofAreaM2} sq. meters
- Regional Annual Rainfall: ${annualRainfallMm} mm
-> Annual Harvest Potential: ${harvestableVolumeLiters.toLocaleString()} Liters
-> Recommended Cistern Capacity: ${recommendedCisternLiters.toLocaleString()} Liters

5. SANCTUARY ESTABLISHMENT BUDGET ESTIMATE
- Land Acquisition (${acres} Acres): $${landCostUsd.toLocaleString()} (${(landCostUsd * exchangeRate).toLocaleString()} MWK)
- Water Security (Borehole + Solar Pump): $${waterSetupUsd.toLocaleString()}
- Off-Grid Power (PV Array & LiFePO4): $${solarSystemUsd.toLocaleString()}
- Fencing & Live Hedgerow: $${fencingUsd.toLocaleString()}
- Compressed Earth Block Cottage: $${cottageUsd.toLocaleString()}
- Heirloom Seeds & Tools: $${seedsToolingUsd.toLocaleString()}
========================================
TOTAL ESTABLISHMENT ESTIMATE: $${totalBudgetUsd.toLocaleString()} USD (${totalBudgetMwk.toLocaleString()} MWK)
OUTPOST: COUNTRY LIVING - Malawi Sanctuary & Self-Reliance Blueprint
`;
  };

  const exportSummary = () => {
    const text = generateSpecsSummaryText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sanctuary_Plan_${acres}Acres.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySpecsToClipboard = async () => {
    const text = generateSpecsSummaryText();
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      showToast('Spec Sheet copied to clipboard!');
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      showToast('Please use the Export button to download.');
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 md:py-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#121D16] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-600/40 flex items-center gap-2 text-xs font-bold transition-all duration-300">
          <Check size={16} className="text-amber-400" />
          {toastMsg}
        </div>
      )}

      {/* Compact Engineering Workbench Header */}
      <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>7 Off-Grid Sizing Calculators</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">
                Synced Outpost: {user?.district || 'Dedza'} ({user?.region || 'Central'}) · {user?.familyMembers || 4} Members · {user?.landSizeAcres || 2.5} Acres — Honest Math for Solar, Wells &amp; Grain Sacks
              </span>
              <button
                onClick={() => setShowWizard(true)}
                className="text-emerald-800 dark:text-amber-300 underline hover:no-underline cursor-pointer ml-1"
              >
                Edit Household
              </button>
            </div>
            <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              Homestead Acreage, Solar Borehole, Rainwater &amp; Grain Calculators
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={copySpecsToClipboard}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 border cursor-pointer",
                hasCopied 
                  ? "bg-emerald-700 text-white border-emerald-500 shadow-xs"
                  : "bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700"
              )}
            >
              {hasCopied ? <CheckCircle2 size={14} className="text-emerald-200" /> : <Copy size={14} className="text-amber-600 dark:text-amber-400" />}
              {hasCopied ? 'Copied!' : 'Copy Spec Sheet'}
            </button>

            <button
              onClick={saveSpecsToVault}
              className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Save size={14} className="text-emerald-700 dark:text-amber-400" /> Save to Vault
            </button>

            <button
              onClick={exportSummary}
              className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
            >
              <Download size={14} /> Export .TXT
            </button>
          </div>
        </div>

        {/* Consolidated 4-Suite Engineering Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800 self-start">
          {[
            {
              id: 'land',
              matchIds: ['land', 'yield'],
              label: '01. Land Zoning, Pits & Crop Yields',
              icon: Sprout,
            },
            {
              id: 'solar',
              matchIds: ['solar', 'rainwater'],
              label: '02. Water Security (Solar Well & Rain Cisterns)',
              icon: Droplets,
            },
            {
              id: 'food',
              matchIds: ['food'],
              label: '03. 12-Month Grain & Seed Reserve',
              icon: Utensils,
            },
            {
              id: 'budget',
              matchIds: ['budget', 'offgrid'],
              label: '04. MWK/USD Bill of Quantities & Off-Grid Hardware',
              icon: DollarSign,
            },
          ].map((suite) => {
            const Icon = suite.icon;
            const isSelected = suite.matchIds.includes(activeTab);
            return (
              <button
                key={suite.id}
                type="button"
                onClick={() => setActiveTab(suite.id as any)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
                  isSelected
                    ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                )}
              >
                <Icon size={13} />
                <span>{suite.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Active Malawi District Telemetry Strip */}
        <ActiveDistrictContextBar onDistrictSelect={handleDistrictChange} />
      </header>

      {/* Seasonal Context Alert Banner */}
      {seasonParam && (
        <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-emerald-950/70 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between gap-4 text-amber-200 shadow-lg">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-amber-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-white block uppercase font-mono font-bold">
                Almanac Seasonal Context Applied: {seasonParam.replace('-', ' ').toUpperCase()}
              </strong>
              <span className="text-slate-300">
                Calculator variables (solar peak sun-hours, dry/wet season irrigation demands) have been pre-tuned for this operational window.
              </span>
            </div>
          </div>
          <a
            href="/almanac"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-caption font-mono font-black uppercase px-3.5 py-1.5 rounded-xl shrink-0 flex items-center gap-1 shadow-xs"
          >
            <span>Back to Almanac</span>
            <ArrowRight size={12} />
          </a>
        </div>
      )}

      {/* SUITE 1 (Part B): CROP YIELD COMPARISON */}
      {(activeTab === 'yield' || activeTab === 'land') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-2"
        >
          <YieldComparisonChart />
        </motion.div>
      )}

      {/* SUITE 2 (Part A): SOLAR PUMP SIZER */}
      {(activeTab === 'solar' || activeTab === 'rainwater') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 bg-stone-900/95 dark:bg-[#0A1A10]/95 backdrop-blur-md p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">Solar Water Sizing</span>
              <h3 className="serif text-2xl font-bold text-[#FAF8F5] flex items-center gap-2 mt-1">
                <Droplets size={22} className="text-amber-400" /> Well & Solar Pump Calculator
              </h3>
              <p className="text-xs text-emerald-100/70 font-medium mt-1">
                Set your well depth and water needs to calculate solar panel wattage and pump capacity.
              </p>
            </div>

            {/* Depth Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Well / Borehole Depth (Meters)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {depth} m
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={1}
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">Shallow well: 10-25m | Deep borehole in Dedza/Lilongwe: 30-70m</span>
            </div>

            {/* Water Volume Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Daily Water Needed (Liters per day)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {waterNeeded.toLocaleString()} L
                </span>
              </div>
              <input
                type="range"
                min={300}
                max={10000}
                step={100}
                value={waterNeeded}
                onChange={(e) => setWaterNeeded(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">Family home: 300-800L | Vegetable garden & orchard: 2,000-5,000L</span>
            </div>

            {/* Sun Hours */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Daily Sunshine Hours (Peak Sun)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {sunHours} Hours
                </span>
              </div>
              <input
                type="range"
                min={3.5}
                max={7.0}
                step={0.1}
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">Malawi dry season average: 5.5 - 6.5 hours of strong sunlight per day</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-caption tracking-widest block">
                    Calculated Solar Pump Engineering Output
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Recommended PV Setup</h3>
                </div>
                <Sun size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-caption font-mono font-black uppercase text-amber-300">Min Solar Array Power</span>
                  <span className="serif text-3xl font-bold text-amber-300">
                    {recommendedPvWatts} W
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">e.g. {Math.ceil(recommendedPvWatts / 300)}x 300W Panels</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Elevated Storage Tank</span>
                  <span className="serif text-3xl font-bold text-white">
                    {recommendedTankSize.toLocaleString()} L
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">2-Day Gravity Buffer</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Min Well Flow Speed</span>
                  <span className="serif text-2xl font-bold text-white font-mono">
                    {minimumBoreholeFlow} L/min
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">Target water flow rate</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-300">Solar Pump Controller</span>
                  <span className="serif text-2xl font-bold text-emerald-200 font-mono">
                    {(recommendedPvWatts > 600 || depth > 45 || waterNeeded > 3500) ? '48V Controller' : '24V Controller'}
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">
                    {(recommendedPvWatts > 600 || depth > 45 || waterNeeded > 3500) ? 'High-head brushless drive (low line loss)' : 'Standard brushless DC drive'}
                  </span>
                </div>
              </div>

              <div className="bg-stone-950/60 p-4 rounded-2xl border border-amber-500/20 text-xs text-emerald-100/90 font-medium leading-relaxed">
                <strong className="text-amber-300">Steward Note:</strong> Direct solar pumping to an elevated tank eliminates costly battery replacements and ensures uninterrupted gravity-fed water for drip irrigation even during outages.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: FOOD RESERVE CALCULATOR */}
      {activeTab === 'food' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 bg-stone-900/95 dark:bg-[#0A1A10]/95 backdrop-blur-md p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-caption font-mono font-black uppercase tracking-widest text-amber-300">Food Autonomy Matrix</span>
              <h3 className="serif text-2xl font-bold text-[#FAF8F5] flex items-center gap-2 mt-1">
                <Utensils size={22} className="text-amber-400" /> Household Demographics & Reserve Duration
              </h3>
              <p className="text-xs text-emerald-100/70 font-medium mt-1">
                Calculate nutritional staple grain and seed reserves for complete food independence.
              </p>
            </div>

            {/* Adults */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Number of Adults</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {adults} Adults
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
            </div>

            {/* Children */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Number of Children</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {children} Children
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
            </div>

            {/* Months */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Target Self-Reliance Duration (Months)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {months} Months
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={24}
                step={3}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">12 months covers a full seasonal agricultural cycle through the lean period.</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-caption tracking-widest block">
                    {months}-Month Homestead Grain & Food Matrix
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Nutritional Targets</h3>
                </div>
                <ShieldCheck size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-amber-300">Maize / Staple Grain</span>
                  <span className="serif text-2xl font-bold text-amber-300">{maizeKg} kg</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(maizeKg / 50)} × 50kg sacks (or {Math.ceil(maizeKg / 15)} × 20L buckets)
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Beans & Legumes</span>
                  <span className="serif text-2xl font-bold text-white">{beansKg} kg</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(beansKg / 50)} × 50kg sacks (or {Math.ceil(beansKg / 16)} × 20L buckets)
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Groundnuts / Oilseeds</span>
                  <span className="serif text-2xl font-bold text-white">{groundnutsKg} kg</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(groundnutsKg / 50)} × 50kg sacks (or {Math.ceil(groundnutsKg / 14)} × 20L buckets)
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Sweet Potatoes / Cassava</span>
                  <span className="serif text-2xl font-bold text-white">{tubersKg} kg</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(tubersKg / 50)} × 50kg sacks (keep growing in garden beds)
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Pure Water Reserve</span>
                  <span className="serif text-2xl font-bold text-emerald-300 font-mono">{waterLiters.toLocaleString()} L</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(waterLiters / 20)} × 20L jerrycans (emergency drinking)
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Mineral Salt</span>
                  <span className="serif text-2xl font-bold text-white">{saltKg} kg</span>
                  <span className="text-caption text-emerald-200 font-mono">
                    ≈ {Math.ceil(saltKg / 20)} × 20kg bags (keeps indefinitely if dry)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUITE 1 (Part A): LAND ALLOCATION CALCULATOR */}
      {(activeTab === 'land' || activeTab === 'yield') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 order-1"
        >
          {/* Controls */}
          <div className="lg:col-span-6 bg-stone-900/95 dark:bg-[#0A1A10]/95 backdrop-blur-md p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-caption font-mono font-black uppercase tracking-widest text-amber-300">Homestead Layout & Space</span>
              <h3 className="serif text-2xl font-bold text-[#FAF8F5] flex items-center gap-2 mt-1">
                <Compass size={22} className="text-amber-400" /> Total Land Area
              </h3>
              <p className="text-xs text-emerald-100/70 font-medium mt-1">
                Divide your land into practical sections for your house, vegetable garden, fruit trees, and fields.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Homestead Land Area (Acres)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {acres} Acres
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={20}
                step={0.5}
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">
                ({(acres * 0.404686).toFixed(2)} Hectares / {Math.round(acres * 4046.86).toLocaleString()} sq. meters)
              </span>
            </div>

            <div className="bg-black/40 border border-amber-500/20 p-5 rounded-2xl flex flex-col gap-3 text-xs text-emerald-100/90 font-medium">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-amber-300 font-mono">Orchard & Planting Pit Estimator:</strong>
                <select
                  value={selectedPitType}
                  onChange={(e) => setSelectedPitType(e.target.value as keyof typeof PLANTING_PIT_SPECS)}
                  aria-label="Select Planting Pit Specification"
                  className="bg-[#0E2A1B] border border-amber-500/30 rounded-lg px-2.5 py-1 text-caption font-mono text-amber-200 focus:outline-none"
                >
                  {Object.values(PLANTING_PIT_SPECS).map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.name} ({p.dimensionString})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-emerald-200/80 leading-relaxed">
                {PLANTING_PIT_SPECS[selectedPitType].description}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-caption tabular-nums">
                <div>
                  <span className="text-emerald-300/70 block">Est. Orchard Pits</span>
                  <span className="font-bold text-white">{Math.max(8, Math.round(zoneOrchard * 45))} pits</span>
                </div>
                <div>
                  <span className="text-emerald-300/70 block">Biochar Needed</span>
                  <span className="font-bold text-amber-300">
                    {Math.round(Math.max(8, Math.round(zoneOrchard * 45)) * PLANTING_PIT_SPECS[selectedPitType].biocharKgPerPit)} kg
                  </span>
                </div>
                <div>
                  <span className="text-emerald-300/70 block">Moisture Bank</span>
                  <span className="font-bold text-sky-300">
                    {(Math.max(8, Math.round(zoneOrchard * 45)) * PLANTING_PIT_SPECS[selectedPitType].waterRetentionLiters).toLocaleString()} L
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-caption tracking-widest block">
                    {acres}-Acre Permaculture Layout
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Zoning Allocations</h3>
                </div>
                <PieChart size={32} className="text-amber-400" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-amber-300 font-mono">Zone 1: Dwelling & Rain Catchment Roof</h5>
                    <span className="text-caption text-emerald-200">Home, water tanks, composting</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneDwelling} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 1: Deep-Bed Kitchen Organic Garden</h5>
                    <span className="text-caption text-emerald-200">Greens, tomatoes, peppers, herbs</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneGarden} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 2: Orchard & Agroforestry</h5>
                    <span className="text-caption text-emerald-200">Mangoes, avocado, citrus, macadamia, windbreak</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneOrchard} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 3: Staple Crop Rotations</h5>
                    <span className="text-caption text-emerald-200">Maize, pigeon peas, groundnuts, cassava</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneCrops} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 4: Water Swales, Ponds & Livestock</h5>
                    <span className="text-caption text-emerald-200">Rainwater infiltration trenches & goats/poultry</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneLivestockWater} Acres</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUITE 2 (Part B): RAINWATER HARVESTING & DIMBA CALCULATOR */}
      {(activeTab === 'rainwater' || activeTab === 'solar') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 bg-stone-900/95 dark:bg-[#0A1A10]/95 backdrop-blur-md p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-caption font-mono font-black uppercase tracking-widest text-amber-300">Hydro Collection Modeling</span>
              <h3 className="serif text-2xl font-bold text-[#FAF8F5] flex items-center gap-2 mt-1">
                <CloudRain size={22} className="text-amber-400" /> Roof Area & Regional Rainfall
              </h3>
              <p className="text-xs text-emerald-100/70 font-medium mt-1">
                Estimate annual rainwater yield collected from corrugated iron roofing into cisterns.
              </p>
            </div>

            {/* Regional Preset Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-bold text-emerald-200">Select District / Rainfall Preset</label>
              <select
                value={districtPreset}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-3 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Object.entries(DISTRICT_RAINFALL_PRESETS).map(([key, val]) => (
                  <option key={key} value={key} className="bg-[#0B2316] text-white">
                    {val.name} ({val.rainfall} mm/yr)
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Rainfall Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Annual Rainfall (mm/year)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {annualRainfallMm} mm
                </span>
              </div>
              <input
                type="range"
                min={600}
                max={2200}
                step={25}
                value={annualRainfallMm}
                onChange={(e) => setAnnualRainfallMm(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
            </div>

            {/* Roof Area Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-200">
                <span>Catchment Roof Surface Area (Tap a House Size or Slide)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {roofAreaM2} m²
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-1">
                {[
                  { label: 'Small Cabin (50m²)', val: 50 },
                  { label: '2-Bed Home (90m²)', val: 90 },
                  { label: '4-Bed Home (140m²)', val: 140 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setRoofAreaM2(preset.val)}
                    className={cn(
                      'py-1.5 px-2 rounded-xl text-caption font-mono font-bold border transition-all cursor-pointer',
                      roofAreaM2 === preset.val
                        ? 'bg-amber-500 text-slate-950 border-amber-300'
                        : 'bg-black/30 text-emerald-200 border-amber-500/20 hover:bg-white/10'
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={30}
                max={500}
                step={10}
                value={roofAreaM2}
                onChange={(e) => setRoofAreaM2(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-black/40 rounded-lg"
              />
              <span className="text-caption text-emerald-300/60 font-mono">Small cottage: 50-80m² | Standard home + shed: 120-200m²</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-caption tracking-widest block">
                    Rainwater Yield Potential
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Cistern & Tank Sizing</h3>
                </div>
                <CloudRain size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 flex flex-col gap-1">
                  <span className="text-caption font-mono font-black uppercase text-amber-300">Annual Catchment Harvest</span>
                  <span className="serif text-3xl font-bold text-amber-300">
                    {harvestableVolumeLiters.toLocaleString()} L
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">Based on 85% corrugated sheet efficiency</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 flex flex-col gap-1">
                  <span className="text-caption font-mono font-black uppercase text-emerald-300">Recommended Tank Capacity</span>
                  <span className="serif text-3xl font-bold text-white">
                    {recommendedCisternLiters.toLocaleString()} L
                  </span>
                  <span className="text-caption text-emerald-200 font-mono">e.g. {Math.ceil(recommendedCisternLiters / 5000)}x 5,000L Tanks</span>
                </div>
              </div>

              <div className="mt-6 bg-white/5 p-4 rounded-2xl border border-amber-500/15 text-xs text-emerald-100/90 font-medium leading-relaxed">
                <strong className="text-amber-300">First-Flush Diverter Strategy:</strong> Install a 20-liter PVC first-flush pipe to catch dusty initial roof runoff before diverting clean water directly into your food-grade storage tanks.
              </div>

              {/* Dry-Season Dimba (Chilimwe) Garden Irrigation Sizer */}
              <div className="mt-6 pt-6 border-t border-amber-500/20 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-caption font-mono font-bold uppercase tracking-wider text-amber-300 block">
                      May–October Dry Season (Chilimwe) · Valley Garden
                    </span>
                    <h4 className="serif text-xl font-bold text-white">
                      Dry-Season <em>Dimba</em> Irrigation Sizer
                    </h4>
                  </div>
                  <div className="flex gap-1.5">
                    {[100, 200, 400, 800].map((sqm) => (
                      <button
                        key={sqm}
                        type="button"
                        onClick={() => setDimbaAreaSqm(sqm)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer',
                          dimbaAreaSqm === sqm
                            ? 'bg-amber-500 text-slate-950 border-amber-300'
                            : 'bg-black/30 text-emerald-200 border-amber-500/20 hover:bg-white/10'
                        )}
                      >
                        {sqm}m²
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-black/30 p-3.5 rounded-xl border border-amber-500/20">
                    <span className="text-caption font-mono text-emerald-300 block">Daily Mulched Water</span>
                    <span className="font-mono text-lg font-extrabold text-white">{dimbaDailyLiters.toLocaleString()} L/day</span>
                  </div>
                  <div className="bg-black/30 p-3.5 rounded-xl border border-amber-500/20">
                    <span className="text-caption font-mono text-amber-300 block">20L Cans (Malegeni)</span>
                    <span className="font-mono text-lg font-extrabold text-amber-300">{dimbaWateringCans20L} cans/day</span>
                  </div>
                  <div className="bg-black/30 p-3.5 rounded-xl border border-amber-500/20">
                    <span className="text-caption font-mono text-emerald-300 block">75cm Drip Tape Length</span>
                    <span className="font-mono text-lg font-extrabold text-white">{dimbaDripLinesMeters} m</span>
                  </div>
                  <div className="bg-black/30 p-3.5 rounded-xl border border-amber-500/20">
                    <span className="text-caption font-mono text-sky-300 block">Gravity Tank Stand</span>
                    <span className="font-mono text-lg font-extrabold text-sky-300">1.5m – 2.5m head</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded 12-Month Seasonal Water Balance Hydrograph */}
            <div className="mt-8">
              <SeasonalWaterBalanceSimulator
                initialDistrictId={districtPreset}
                initialFamilySize={initialMembers}
                initialRoofAreaSqm={roofAreaM2}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* SUITE 4 (Part B): OFF-GRID SIZING WORKBENCH */}
      {(activeTab === 'offgrid' || activeTab === 'budget') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-2"
        >
          <OffGridSizingTools />
        </motion.div>
      )}

      {/* SUITE 4 (Part A): SETUP BUDGET ESTIMATOR */}
      {(activeTab === 'budget' || activeTab === 'offgrid') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 order-1"
        >
          {/* Controls */}
          <div className="lg:col-span-7 bg-stone-900/95 dark:bg-[#0A1A10]/95 backdrop-blur-md p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-caption font-mono font-black uppercase tracking-widest text-amber-300">Capital Expenditure Modeler</span>
                <h3 className="serif text-2xl font-bold text-[#FAF8F5] flex items-center gap-2 mt-1">
                  <DollarSign size={22} className="text-amber-400" /> Outpost Setup Cost Breakdown
                </h3>
                <p className="text-xs text-emerald-100/70 font-medium mt-1">
                  Customize capital expenditures for establishing a sanctuary in Malawi.
                </p>
              </div>

              {/* Currency Toggle */}
              <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-amber-500/20">
                <button
                  onClick={() => setCurrency('USD')}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-mono font-black transition-all",
                    currency === 'USD' ? "bg-amber-500 text-slate-950 shadow-md" : "text-emerald-300 hover:text-white"
                  )}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('MWK')}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-mono font-black transition-all",
                    currency === 'MWK' ? "bg-amber-500 text-slate-950 shadow-md" : "text-emerald-300 hover:text-white"
                  )}
                >
                  MWK (K)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Land Cost */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Land Acquisition ({acres} Acres)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={landCostUsd}
                    onChange={(e) => setLandCostUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>

              {/* Water Setup */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Borehole Drilling & Solar Pump</label>
                <div className="relative">
                  <input
                    type="number"
                    value={waterSetupUsd}
                    onChange={(e) => setWaterSetupUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>

              {/* Solar System */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Solar Power & LiFePO4 Batteries</label>
                <div className="relative">
                  <input
                    type="number"
                    value={solarSystemUsd}
                    onChange={(e) => setSolarSystemUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>

              {/* Fencing */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Perimeter Fencing & Live Hedge</label>
                <div className="relative">
                  <input
                    type="number"
                    value={fencingUsd}
                    onChange={(e) => setFencingUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>

              {/* Cottage */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Earth Block Cottage Build</label>
                <div className="relative">
                  <input
                    type="number"
                    value={cottageUsd}
                    onChange={(e) => setCottageUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>

              {/* Seeds & Tools */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-emerald-200">Heirloom Seeds & Hand Tools</label>
                <div className="relative">
                  <input
                    type="number"
                    value={seedsToolingUsd}
                    onChange={(e) => setSeedsToolingUsd(Number(e.target.value))}
                    className="w-full bg-[#0E2A1B] border border-amber-500/30 rounded-2xl px-4 py-2.5 text-xs font-mono font-bold text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-caption font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-caption tracking-widest block">
                    Sanctuary Capital Budget
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Total Budget</h3>
                </div>
                <DollarSign size={32} className="text-amber-400" />
              </div>

              <div className="bg-black/30 p-6 rounded-3xl border border-amber-500/20 flex flex-col gap-2 mb-6">
                <span className="text-xs font-mono font-black uppercase text-amber-300">Estimated Total Capital</span>
                <span className="serif text-4xl md:text-5xl font-extrabold text-amber-300">
                  {currency === 'USD'
                    ? `$${totalBudgetUsd.toLocaleString()}`
                    : `K${totalBudgetMwk.toLocaleString()}`}
                </span>
                <span className="text-caption text-emerald-200 font-mono">
                  {currency === 'USD'
                    ? `Equivalent to K${totalBudgetMwk.toLocaleString()} MWK`
                    : `Equivalent to $${totalBudgetUsd.toLocaleString()} USD`}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-xs font-mono text-emerald-100">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Land & Title</span>
                  <span className="font-bold text-white font-mono">
                    {currency === 'USD' ? `$${landCostUsd.toLocaleString()}` : `K${(landCostUsd * exchangeRate).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Borehole & Pump</span>
                  <span className="font-bold text-white font-mono">
                    {currency === 'USD' ? `$${waterSetupUsd.toLocaleString()}` : `K${(waterSetupUsd * exchangeRate).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Solar & Battery</span>
                  <span className="font-bold text-white font-mono">
                    {currency === 'USD' ? `$${solarSystemUsd.toLocaleString()}` : `K${(solarSystemUsd * exchangeRate).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Earth Block Dwelling</span>
                  <span className="font-bold text-white font-mono">
                    {currency === 'USD' ? `$${cottageUsd.toLocaleString()}` : `K${(cottageUsd * exchangeRate).toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Bill of Quantities (BoQ) Schedule */}
          <HomesteadBoQEstimator currency={currency} exchangeRate={exchangeRate} />
        </motion.div>
      )}

      <OnboardingWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}

