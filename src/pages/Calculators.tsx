import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sun, Droplets, Utensils, Compass, PieChart, ShieldCheck, Download, Sparkles, RefreshCw, Layers, CloudRain, DollarSign, Save, Check, Sprout, TrendingUp, Users, MapPin, Calendar, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { YieldComparisonChart } from '@/components/calculators/YieldComparisonChart';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { saveStoredSavedSpecs } from '@/lib/offlineStorage';
import { 
  SanctuaryCard, 
  SanctuaryButton, 
  SanctuaryBadge, 
  SanctuarySectionHeader, 
  SanctuaryStatBox 
} from '@/components/ui';

export default function Calculators() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const seasonParam = searchParams.get('season');

  const [showWizard, setShowWizard] = useState(false);
  const [activeTab, setActiveTab] = useState<'yield' | 'solar' | 'food' | 'land' | 'rainwater' | 'budget'>(() => {
    if (tabParam && ['yield', 'solar', 'food', 'land', 'rainwater', 'budget'].includes(tabParam)) {
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
  const initialDistrict = (user?.district || 'dedza').toLowerCase();

  // Solar Pump Sizing State
  const [depth, setDepth] = useState<number>(35); // meters
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
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(1100); // Dedza default mm
  const [districtPreset, setDistrictPreset] = useState<string>(initialDistrict);

  // Sync tab parameter changes from URL
  useEffect(() => {
    if (tabParam && ['yield', 'solar', 'food', 'land', 'rainwater', 'budget'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [tabParam]);

  // Auto-sync when profile updates
  useEffect(() => {
    if (user) {
      if (user.landSizeAcres) setAcres(user.landSizeAcres);
      if (user.familyMembers) {
        const ad = Math.max(1, Math.floor(user.familyMembers / 2));
        const ch = Math.max(0, user.familyMembers - ad);
        setAdults(ad);
        setChildren(ch);
        setWaterNeeded(user.familyMembers * 500);
      }
      if (user.district) {
        setDistrictPreset(user.district.toLowerCase());
      }
    }
  }, [user?.landSizeAcres, user?.familyMembers, user?.district]);

  // Budget Estimator State
  const [currency, setCurrency] = useState<'USD' | 'MWK'>('USD');
  const exchangeRate = 1750; // 1 USD ~ 1,750 MWK

  const [landCostUsd, setLandCostUsd] = useState<number>(3500); // per acre total for 3.5 acres
  const [waterSetupUsd, setWaterSetupUsd] = useState<number>(2800); // Borehole + Solar Pump
  const [solarSystemUsd, setSolarSystemUsd] = useState<number>(2200); // PV + LiFePO4
  const [fencingUsd, setFencingUsd] = useState<number>(650); // Fencing & Live Hedge
  const [cottageUsd, setCottageUsd] = useState<number>(4500); // Earth Block Cottage
  const [seedsToolingUsd, setSeedsToolingUsd] = useState<number>(500); // Heirloom Seeds & Tools

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
  // Harvestable Volume = Roof Area (m2) * Annual Rainfall (m) * 0.85 (runoff efficiency) * 1000 L/m3
  const harvestableVolumeLiters = Math.round(roofAreaM2 * (annualRainfallMm / 1000) * 0.85 * 1000);
  const drySeasonBufferDays = 150; // Nov to Apr rainy season means ~150 dry days
  const recommendedCisternLiters = Math.min(harvestableVolumeLiters, Math.round(waterNeeded * 90)); // 3 months dry coverage

  // Budget Total
  const totalBudgetUsd = landCostUsd + waterSetupUsd + solarSystemUsd + fencingUsd + cottageUsd + seedsToolingUsd;
  const totalBudgetMwk = totalBudgetUsd * exchangeRate;

  // Preset Rainfalls in Malawi
  const DISTRICT_RAINFALL_PRESETS: Record<string, { name: string; rainfall: number }> = {
    dedza: { name: 'Dedza / Ntcheu Highlands', rainfall: 1100 },
    mzimba: { name: 'Mzimba & Viphya Plateau', rainfall: 950 },
    mulanje: { name: 'Mulanje & Thyolo Tea Belt', rainfall: 1650 },
    lilongwe: { name: 'Lilongwe & Central Plains', rainfall: 850 },
    zomba: { name: 'Zomba Plateau', rainfall: 1250 },
    karonga: { name: 'Karonga & Northern Lake', rainfall: 1050 },
  };

  const handleDistrictChange = (key: string) => {
    setDistrictPreset(key);
    if (DISTRICT_RAINFALL_PRESETS[key]) {
      setAnnualRainfallMm(DISTRICT_RAINFALL_PRESETS[key].rainfall);
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

  const exportSummary = () => {
    const text = `OUTPOST LIVING - SANCTUARY PLANNING SHEET
========================================
Generated: ${new Date().toLocaleDateString()}

1. SOLAR BOREHOLE PUMP SPECIFICATIONS
- Target Well Depth: ${depth} meters
- Daily Water Needs: ${waterNeeded} Liters/day
- Peak Solar Irradiation: ${sunHours} Hours/day
-> Recommended Solar PV Array: ${recommendedPvWatts} Watts
-> Storage Tank Capacity: ${recommendedTankSize} Liters
-> Min Borehole Flow Yield: ${minimumBoreholeFlow} L/min

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

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sanctuary_Plan_${acres}Acres.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySpecsToClipboard = async () => {
    const text = `OUTPOST LIVING - SANCTUARY PLANNING SHEET
========================================
Generated: ${new Date().toLocaleDateString()}

1. SOLAR BOREHOLE PUMP SPECIFICATIONS
- Target Well Depth: ${depth} meters
- Daily Water Needs: ${waterNeeded} Liters/day
- Peak Solar Irradiation: ${sunHours} Hours/day
-> Recommended Solar PV Array: ${recommendedPvWatts} Watts
-> Storage Tank Capacity: ${recommendedTankSize} Liters
-> Min Borehole Flow Yield: ${minimumBoreholeFlow} L/min

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
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#121D16] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-600/40 flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check size={16} className="text-amber-400" />
          {toastMsg}
        </div>
      )}

      {/* Engineering Workbench Header */}
      <header className="bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-12 rounded-[2.5rem] border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full -mr-36 -mt-36 pointer-events-none blur-3xl" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-black uppercase px-3.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Quantitative Off-Grid Workbench
              </span>
              <span className="bg-emerald-500/15 text-emerald-300 font-mono text-[9px] font-black uppercase px-3 py-1 rounded-full border border-emerald-500/25">
                Auto-Synced to Steward Profile
              </span>
            </div>

            <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] leading-tight">
              Homestead Off-Grid Calculators
            </h1>
            <p className="text-emerald-100/90 max-w-2xl text-sm sm:text-base font-medium leading-relaxed italic">
              Determine solar pump wattage, food grain storage requirements, rainwater harvesting yields, and setup budgets for country sanctuaries in Malawi.
            </p>

            {/* Setup Profile Live Badge */}
            <div className="mt-2 bg-black/40 border border-amber-500/20 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200 font-medium">
                <MapPin size={15} className="text-amber-400 shrink-0" />
                <span>
                  Synced Outpost: <strong className="text-white font-mono">{user?.district || 'Dedza'} ({user?.region || 'Central'})</strong> • <strong className="text-amber-300 font-mono">{user?.familyMembers || 4} Members</strong> • <strong className="text-emerald-300 font-mono">{user?.landSizeAcres || 2.5} Acres</strong>
                </span>
              </div>
              <button
                onClick={() => setShowWizard(true)}
                className="text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-xl border border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <Sparkles size={12} className="text-amber-400" /> Tweak Profile
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
            <button
              onClick={copySpecsToClipboard}
              className={cn(
                "px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 border cursor-pointer",
                hasCopied 
                  ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-amber-200 border-amber-500/25"
              )}
            >
              {hasCopied ? <CheckCircle2 size={15} className="text-emerald-300" /> : <Copy size={15} className="text-amber-400" />}
              {hasCopied ? 'Copied!' : 'Copy Specs'}
            </button>

            <button
              onClick={saveSpecsToVault}
              className="bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/25 px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Save size={15} className="text-amber-400" /> Save
            </button>

            <button
              onClick={exportSummary}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
            >
              <Download size={15} /> Export
            </button>
          </div>
        </div>
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
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-mono font-black uppercase px-3.5 py-1.5 rounded-xl shrink-0 flex items-center gap-1 shadow-xs"
          >
            <span>Back to Almanac</span>
            <ArrowRight size={12} />
          </a>
        </div>
      )}

      {/* Workbench Navigation Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {[
          { id: 'yield', label: 'Crop Yield Comparison', icon: Sprout },
          { id: 'solar', label: 'Solar Pump & Well', icon: Sun },
          { id: 'food', label: 'Grain & Food Reserve', icon: Utensils },
          { id: 'land', label: 'Sanctuary Acreage', icon: PieChart },
          { id: 'rainwater', label: 'Rainwater Harvest', icon: CloudRain },
          { id: 'budget', label: 'Setup Budget', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs active:scale-95 border",
                isSelected
                  ? "bg-amber-500 text-slate-950 border-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] font-black"
                  : "backdrop-blur-md bg-white/5 text-emerald-200 border-amber-500/20 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={15} className={isSelected ? "text-slate-950" : "text-amber-400"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 0: CROP YIELD COMPARISON */}
      {activeTab === 'yield' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <YieldComparisonChart />
        </motion.div>
      )}

      {/* TAB 1: SOLAR PUMP SIZER */}
      {activeTab === 'solar' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 backdrop-blur-md bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Solar Water Sizing</span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">Shallow well: 10-25m | Deep borehole in Dedza/Lilongwe: 30-70m</span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">Family home: 300-800L | Vegetable garden & orchard: 2,000-5,000L</span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">Malawi dry season average: 5.5 - 6.5 hours of strong sunlight per day</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-[9px] tracking-widest block">
                    Calculated Solar Pump Engineering Output
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Recommended PV Setup</h3>
                </div>
                <Sun size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-amber-300">Min Solar Array Power</span>
                  <span className="serif text-3xl font-bold text-amber-300">
                    {recommendedPvWatts} W
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">e.g. {Math.ceil(recommendedPvWatts / 300)}x 300W Panels</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Elevated Storage Tank</span>
                  <span className="serif text-3xl font-bold text-white">
                    {recommendedTankSize.toLocaleString()} L
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">2-Day Gravity Buffer</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Min Well Flow Speed</span>
                  <span className="serif text-2xl font-bold text-white font-mono">
                    {minimumBoreholeFlow} L/min
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">Target water flow rate</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Solar Pump Controller</span>
                  <span className="serif text-2xl font-bold text-emerald-200 font-mono">
                    {depth > 50 ? '48V Controller' : '24V Controller'}
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">Direct Sun-Powered Drive</span>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/15 text-xs text-emerald-100/90 font-medium leading-relaxed">
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
          <div className="lg:col-span-6 backdrop-blur-md bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Food Autonomy Matrix</span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">12 months covers a full seasonal agricultural cycle through the lean period.</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-[9px] tracking-widest block">
                    {months}-Month Homestead Grain & Food Matrix
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Nutritional Targets</h3>
                </div>
                <ShieldCheck size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-amber-300">Maize / Staple Grain</span>
                  <span className="serif text-2xl font-bold text-amber-300">{maizeKg} kg</span>
                  <span className="text-[9px] text-emerald-200 font-mono">~{Math.ceil(maizeKg / 50)}x 50kg bags</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Beans & Legumes</span>
                  <span className="serif text-2xl font-bold text-white">{beansKg} kg</span>
                  <span className="text-[9px] text-emerald-200 font-mono">Protein & Soil Nitrogen</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Groundnuts / Oilseeds</span>
                  <span className="serif text-2xl font-bold text-white">{groundnutsKg} kg</span>
                  <span className="text-[9px] text-emerald-200 font-mono">Healthy Fats & Nsinjiro</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Sweet Potatoes / Cassava</span>
                  <span className="serif text-2xl font-bold text-white">{tubersKg} kg</span>
                  <span className="text-[9px] text-emerald-200 font-mono">Tubers & Drought Buffer</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Pure Water Reserve</span>
                  <span className="serif text-2xl font-bold text-emerald-300 font-mono">{waterLiters.toLocaleString()} L</span>
                  <span className="text-[9px] text-emerald-200 font-mono">Emergency Drinking Storage</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Mineral Salt</span>
                  <span className="serif text-2xl font-bold text-white">{saltKg} kg</span>
                  <span className="text-[9px] text-emerald-200 font-mono">Food Preservation & Health</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: LAND ALLOCATION CALCULATOR */}
      {activeTab === 'land' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 backdrop-blur-md bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Homestead Layout & Space</span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">
                ({(acres * 0.404686).toFixed(2)} Hectares / {Math.round(acres * 4046.86).toLocaleString()} sq. meters)
              </span>
            </div>

            <div className="bg-black/40 border border-amber-500/20 p-5 rounded-2xl flex flex-col gap-2 text-xs text-emerald-100/90 font-medium">
              <strong className="text-amber-300 font-mono">Smart Homestead Layout Plan:</strong>
              <p className="space-y-1 text-emerald-200/80 leading-relaxed">
                <strong>Zone 1 (Closest):</strong> House, kitchen garden & water tank<br />
                <strong>Zone 2 (Near):</strong> Fruit orchard, compost & chickens/goats<br />
                <strong>Zone 3 (Middle):</strong> Main crop fields (Maize, Groundnuts, Beans)<br />
                <strong>Zone 4 (Outer):</strong> Rain trenches (swales), pond & boundary trees
              </p>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-[9px] tracking-widest block">
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
                    <span className="text-[10px] text-emerald-200">Home, water tanks, composting</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneDwelling} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 1: Deep-Bed Kitchen Organic Garden</h5>
                    <span className="text-[10px] text-emerald-200">Greens, tomatoes, peppers, herbs</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneGarden} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 2: Orchard & Agroforestry</h5>
                    <span className="text-[10px] text-emerald-200">Mangoes, avocado, citrus, macadamia, windbreak</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneOrchard} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 3: Staple Crop Rotations</h5>
                    <span className="text-[10px] text-emerald-200">Maize, pigeon peas, groundnuts, cassava</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneCrops} Acres</span>
                </div>

                <div className="bg-black/30 p-4 rounded-2xl border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-emerald-300 font-mono">Zone 4: Water Swales, Ponds & Livestock</h5>
                    <span className="text-[10px] text-emerald-200">Rainwater infiltration trenches & goats/poultry</span>
                  </div>
                  <span className="serif text-xl font-bold text-white font-mono">{zoneLivestockWater} Acres</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: RAINWATER HARVESTING CALCULATOR */}
      {activeTab === 'rainwater' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-6 backdrop-blur-md bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Hydro Collection Modeling</span>
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
                <span>Catchment Roof Surface Area (m²)</span>
                <span className="text-amber-300 font-black text-sm bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl">
                  {roofAreaM2} m²
                </span>
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
              <span className="text-[10px] text-emerald-300/60 font-mono">Small cottage: 50-80m² | Standard home + shed: 120-200m²</span>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-[9px] tracking-widest block">
                    Rainwater Yield Potential
                  </span>
                  <h3 className="serif text-3xl font-bold text-[#FAF8F5] mt-1">Cistern & Tank Sizing</h3>
                </div>
                <CloudRain size={32} className="text-amber-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-amber-300">Annual Catchment Harvest</span>
                  <span className="serif text-3xl font-bold text-amber-300">
                    {harvestableVolumeLiters.toLocaleString()} L
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">Based on 85% corrugated sheet efficiency</span>
                </div>

                <div className="bg-black/30 p-5 rounded-2xl border border-amber-500/20 flex flex-col gap-1">
                  <span className="text-[9px] font-mono font-black uppercase text-emerald-300">Recommended Tank Capacity</span>
                  <span className="serif text-3xl font-bold text-white">
                    {recommendedCisternLiters.toLocaleString()} L
                  </span>
                  <span className="text-[9px] text-emerald-200 font-mono">e.g. {Math.ceil(recommendedCisternLiters / 5000)}x 5,000L Tanks</span>
                </div>
              </div>

              <div className="mt-6 bg-white/5 p-4 rounded-2xl border border-amber-500/15 text-xs text-emerald-100/90 font-medium leading-relaxed">
                <strong className="text-amber-300">First-Flush Diverter Strategy:</strong> Install a 20-liter PVC first-flush pipe to catch dusty initial roof runoff before diverting clean water directly into your food-grade storage tanks.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: SETUP BUDGET ESTIMATOR */}
      {activeTab === 'budget' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-7 backdrop-blur-md bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/25 shadow-2xl flex flex-col gap-6 text-white">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300">Capital Expenditure Modeler</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
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
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono font-bold text-emerald-400/60">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2316] via-[#0E2A1B] to-[#07180E] text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <span className="text-amber-300 font-mono font-black uppercase text-[9px] tracking-widest block">
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
                <span className="text-[10px] text-emerald-200 font-mono">
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
        </motion.div>
      )}

      <OnboardingWizard isOpen={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}

