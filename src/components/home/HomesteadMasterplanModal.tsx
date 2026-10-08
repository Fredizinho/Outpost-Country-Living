import React, { useState, useMemo } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Compass,
  Sun,
  Droplets,
  Sprout,
  ShieldCheck,
  Layers,
  ChevronRight,
  Calculator,
  Download,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trees,
  Home,
  FileText,
} from 'lucide-react';
import { DISTRICT_LIST, PLANTING_PIT_SPECS } from '@/constants';
import { cn } from '@/lib/utils';

export interface HomesteadMasterplanModalProps {
  isOpen: boolean;
  onClose: () => void;
  districtId: string;
  familySize: number;
  roofAreaSqm: number;
  onUpdateDistrictId?: (id: string) => void;
  onUpdateFamilySize?: (size: number) => void;
  onUpdateRoofArea?: (sqm: number) => void;
}

type TabType = 'overview' | 'energy' | 'water' | 'agroforestry' | 'boq';

export function HomesteadMasterplanModal({
  isOpen,
  onClose,
  districtId,
  familySize,
  roofAreaSqm,
  onUpdateDistrictId,
  onUpdateFamilySize,
  onUpdateRoofArea,
}: HomesteadMasterplanModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);

  const district = useMemo(() => {
    return DISTRICT_LIST.find((d) => d.id === districtId) || DISTRICT_LIST[0];
  }, [districtId]);

  const pitSpec = useMemo(() => {
    return (
      PLANTING_PIT_SPECS[district.recommendedPitKey] || PLANTING_PIT_SPECS.egwDeepPit
    );
  }, [district]);

  // Comprehensive Engineering Calculations
  const metrics = useMemo(() => {
    // Land
    const stapleAcres = +(familySize * 0.5).toFixed(2);
    const orchardAcres = +(familySize * 0.25).toFixed(2);
    const livingBufferAcres = 0.5;
    const totalLandAcres = +(stapleAcres + orchardAcres + livingBufferAcres).toFixed(2);

    // Rainwater
    const runoffCoeff = 0.85;
    const annualRainwaterLiters = Math.round(roofAreaSqm * district.rainfallAnnualMm * runoffCoeff);
    const dailyWaterNeedLiters = familySize * 90;
    const dryMonths = 6;
    const drySeasonNeedLiters = dailyWaterNeedLiters * 30 * dryMonths;
    const recommendedTankCount5k = Math.max(2, Math.ceil(drySeasonNeedLiters / 5000));
    const storageCapacityLiters = recommendedTankCount5k * 5000;
    const waterIndependenceMonths = +(annualRainwaterLiters / (dailyWaterNeedLiters * 30)).toFixed(1);

    // Solar PV
    const dailyKwh = +(1.6 + familySize * 0.45).toFixed(1);
    const peakSunHours = district.solarKwhDay || 5.2;
    const systemEfficiency = 0.75;
    const pvWatts = Math.round((dailyKwh / (peakSunHours * systemEfficiency)) * 1000);
    const recommendedSolarKw = +(pvWatts / 1000).toFixed(2);
    const batteryKwh = +(dailyKwh * 1.8).toFixed(1); // 1.8 days autonomy (48V LiFePO4)
    const inverterKva = dailyKwh > 5 ? 5.0 : 3.0;

    // Agroforestry Pits
    const orchardPitCount = Math.max(16, Math.round(orchardAcres * 48));
    const totalBiocharKg = Math.round(orchardPitCount * pitSpec.biocharKgPerPit);
    const totalCompostTons = +(orchardPitCount * 0.08).toFixed(1);

    // Autonomy Score
    const waterScore = Math.min(100, (annualRainwaterLiters / drySeasonNeedLiters) * 100);
    const solarScore = Math.min(100, (peakSunHours / 5.2) * 100);
    const landScore = Math.min(100, (totalLandAcres / (familySize * 0.75)) * 100);
    const autonomyScore = Math.min(99, Math.max(70, Math.round(waterScore * 0.4 + solarScore * 0.35 + landScore * 0.25)));

    return {
      stapleAcres,
      orchardAcres,
      livingBufferAcres,
      totalLandAcres,
      annualRainwaterLiters,
      dailyWaterNeedLiters,
      drySeasonNeedLiters,
      recommendedTankCount5k,
      storageCapacityLiters,
      waterIndependenceMonths,
      dailyKwh,
      peakSunHours,
      recommendedSolarKw,
      batteryKwh,
      inverterKva,
      orchardPitCount,
      totalBiocharKg,
      totalCompostTons,
      autonomyScore,
    };
  }, [familySize, district, roofAreaSqm, pitSpec]);

  const generateMarkdownDocument = (): string => {
    return `# OUTPOST MASTERPLAN SPECIFICATION
**Location:** ${district.name} District (${district.region} Region, Malawi)
**Elevation & Rainfall:** ~${district.elevationRange} · ${district.rainfallAnnualMm} mm/annum
**Household Sizing:** ${familySize} Persons · ${roofAreaSqm} m² Corrugated/Tile Catchment
**Autonomy Resilience Index:** ${metrics.autonomyScore}%

---

### 1. LAND & AGROFORESTRY ALLOCATION
- Total Land Recommended: **${metrics.totalLandAcres} Acres**
  · Staple Crops (Bio-Intensive Maize, Cassava, Beans): ${metrics.stapleAcres} ac
  · Orchard & Perennial Food Forest: ${metrics.orchardAcres} ac
  · Shelterbelt, Living Fence & Woodlot: ${metrics.livingBufferAcres} ac
- Ellen White 3×3×3ft Planting Pits: **${metrics.orchardPitCount} Pits**
  · Biochar Requirement: ${metrics.totalBiocharKg} kg crushed hardwood biochar
  · Aerobic Compost Requirement: ~${metrics.totalCompostTons} tons
  · Target Species: Avocado (Hass/Fuerte), Papaya, Mango, Guava, Citrus, Moringa

### 2. WATER SECURITY & RAINWATER HARVESTING
- Annual Catchment Potential: **${metrics.annualRainwaterLiters.toLocaleString()} Liters**
- Daily Domestic Baseline: ~${metrics.dailyWaterNeedLiters} Liters/day
- Dry Season Storage Target (6 mos): **${metrics.storageCapacityLiters.toLocaleString()} Liters** (${metrics.recommendedTankCount5k} × 5,000L Cisterns)
- Water Independence Estimate: **~${metrics.waterIndependenceMonths} Months**
- Geological Aquifer Depth: ~${district.aquiferDepthM}m (Borehole / Hand-Dug Well Feasible)

### 3. OFF-GRID ENERGY SYSTEM
- Daily Electric Consumption: **${metrics.dailyKwh} kWh/day**
- Solar Photovoltaic Array: **${metrics.recommendedSolarKw} kWp** (${Math.ceil((metrics.recommendedSolarKw * 1000) / 450)} × 450W Monocrystalline Panels)
- Battery Storage Bank: **${metrics.batteryKwh} kWh (48V LiFePO4)** (1.8 Days Autonomy)
- Inverter Specification: **${metrics.inverterKva} kVA Pure Sine Wave Hybrid Inverter**
- Priority Load Schedule: Solar vaccine/food cooler, LED illumination, gravity pump, grain hammer mill.

---
*Generated by Outpost Living Malawi — Avondale Model for Self-Supporting Country Outposts*
`;
  };

  const handleCopyMarkdown = () => {
    const text = generateMarkdownDocument();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownDocument();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Outpost_Masterplan_${district.name.replace(/\s+/g, '_')}_${familySize}p.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="masterplan-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto"
    >
      <div
        className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-stone-100"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Compass size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                <span>Outpost Living Blueprint</span>
                <span>·</span>
                <span className="text-amber-400 font-semibold">{district.name} District</span>
                <span>·</span>
                <span className="text-emerald-400 font-bold">{metrics.autonomyScore}% Autonomy</span>
              </div>
              <h2 id="masterplan-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Homestead Masterplan Specification
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              title="Download Masterplan Markdown file (.md)"
              className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-emerald-700/60 cursor-pointer shadow-xs"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download .md</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              title="Copy complete markdown specification"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-stone-700 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              title="Print masterplan document"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono hidden sm:inline-flex items-center gap-1.5 transition-colors border border-stone-700 cursor-pointer"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Live Config Bar (Quick Adjustments & Archetypes) */}
        <div className="px-5 py-3 bg-stone-950/40 border-b border-stone-800/80 flex flex-col gap-2.5 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-stone-400 font-mono text-[11px] uppercase tracking-wider">
              Quick Archetypes:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: 'Family Homestead (5p / 90m²)', size: 5, roof: 90 },
                { label: 'Extended Clan (8p / 140m²)', size: 8, roof: 140 },
                { label: 'Outpost Training Center (12p / 220m²)', size: 12, roof: 220 },
              ].map((arch) => (
                <button
                  key={arch.label}
                  type="button"
                  onClick={() => {
                    onUpdateFamilySize?.(arch.size);
                    onUpdateRoofArea?.(arch.roof);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer',
                    familySize === arch.size && roofAreaSqm === arch.roof
                      ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                  )}
                >
                  {arch.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-stone-400 font-mono block mb-1">Target District</label>
              <select
                value={districtId}
                onChange={(e) => onUpdateDistrictId?.(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-amber-400 focus:outline-none cursor-pointer"
              >
                {DISTRICT_LIST.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.rainfallAnnualMm}mm/yr · {d.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-stone-400 font-mono block mb-1">
                Household Size: <span className="text-amber-400 font-bold">{familySize} People</span>
              </label>
              <input
                type="range"
                min={1}
                max={12}
                value={familySize}
                onChange={(e) => onUpdateFamilySize?.(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer py-1"
              />
            </div>

            <div>
              <label className="text-stone-400 font-mono block mb-1">
                Roof Area: <span className="text-sky-400 font-bold">{roofAreaSqm} m²</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[50, 90, 140].map((sqm) => (
                  <button
                    key={sqm}
                    type="button"
                    onClick={() => onUpdateRoofArea?.(sqm)}
                    className={cn(
                      'py-1 rounded font-mono text-center transition-colors cursor-pointer',
                      roofAreaSqm === sqm
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    )}
                  >
                    {sqm}m²
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-2 bg-stone-900 border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: '1. Executive Plan', icon: FileText },
            { id: 'energy', label: '2. Solar Energy', icon: Sun },
            { id: 'water', label: '3. Rainwater & Well', icon: Droplets },
            { id: 'agroforestry', label: '4. Permaculture & Pits', icon: Sprout },
            { id: 'boq', label: '5. Itemized BoQ', icon: Layers },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0',
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-stone-400 hover:text-stone-200 hover:border-stone-700'
                )}
              >
                <TabIcon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400 text-xs font-mono block">Recommended Land</span>
                  <span className="text-2xl font-bold text-white tabular-nums">
                    {metrics.totalLandAcres} <span className="text-sm font-normal text-stone-400">Acres</span>
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    {metrics.stapleAcres}ac staple + {metrics.orchardAcres}ac orchard
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400 text-xs font-mono block">Annual Rainwater</span>
                  <span className="text-2xl font-bold text-sky-400 tabular-nums">
                    {Math.round(metrics.annualRainwaterLiters / 1000)}k <span className="text-sm font-normal text-stone-400">Liters</span>
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    ~{metrics.waterIndependenceMonths} months dry reserve
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400 text-xs font-mono block">Solar PV Capacity</span>
                  <span className="text-2xl font-bold text-amber-400 tabular-nums">
                    {metrics.recommendedSolarKw} <span className="text-sm font-normal text-stone-400">kWp</span>
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    {metrics.batteryKwh} kWh LiFePO4 bank
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-stone-400 text-xs font-mono block">Tree Planting Pits</span>
                  <span className="text-2xl font-bold text-emerald-400 tabular-nums">
                    {metrics.orchardPitCount} <span className="text-sm font-normal text-stone-400">Pits</span>
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    {metrics.totalBiocharKg} kg biochar amended
                  </span>
                </div>
              </div>

              {/* District Agro-Ecological Context */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-2">
                <h3 className="font-display font-bold text-base text-white">
                  Regional Profile: {district.name} ({district.region} Region)
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Located in the {district.elevationRange} zone with annual rainfall averaging {district.rainfallAnnualMm}mm.
                  The dominant soil type is <strong className="text-amber-300">{district.primarySoil}</strong>, which requires deep organic matter incorporation.
                  Groundwater aquifers typically reach static water level at approximately <strong className="text-sky-300">{district.aquiferDepthM}m</strong> depth.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-mono">
                  <span>Sun Hours: {metrics.peakSunHours} kWh/m²/day</span>
                  <span>·</span>
                  <span>Rainfall Index: {district.rainfallAnnualMm >= 1000 ? 'High' : district.rainfallAnnualMm >= 800 ? 'Medium' : 'Semi-Arid'}</span>
                  <span>·</span>
                  <span>Soil Retention: Moderate to High</span>
                </div>
              </div>

              {/* Permaculture Zone Architecture */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-2.5">
                <h3 className="font-display font-bold text-base text-white">
                  Five-Zone Permaculture Architecture
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <strong className="text-amber-400 block mb-0.5">Zone 0 &amp; 1: Hearth, Solar &amp; Nursery</strong>
                    <span className="text-stone-300">
                      Family dwelling, rainwater roof collection, solar battery room, seed drying solarium, and culinary herbs.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <strong className="text-emerald-400 block mb-0.5">Zone 2: 3×3×3ft Fruit Orchard</strong>
                    <span className="text-stone-300">
                      {metrics.orchardPitCount} deep planting pits with avocados, papayas, citrus, and moringa mulched with vetiver grass.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <strong className="text-sky-400 block mb-0.5">Zone 3: Staple Grain &amp; Pulse Swales</strong>
                    <span className="text-stone-300">
                      {metrics.stapleAcres} acres of bio-intensive maize, cassava, groundnuts, and sweet potatoes following keyline swales.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <strong className="text-purple-400 block mb-0.5">Zone 4 &amp; 5: Living Fence &amp; Forest</strong>
                    <span className="text-stone-300">
                      {metrics.livingBufferAcres} acres of Gliricidia sepium living fence, firewood coppice, and wild biodiversity sanctuary.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOLAR ENERGY */}
          {activeTab === 'energy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200">
                <strong className="block text-sm font-bold text-amber-300 mb-1">
                  Solar Autonomy Benchmark: {metrics.recommendedSolarKw} kWp System
                </strong>
                Calculated for {familySize} family members with an average baseline of {metrics.dailyKwh} kWh/day and {metrics.peakSunHours} peak sun hours in {district.name}.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Photovoltaic Array</span>
                  <span className="text-xl font-bold text-amber-400">
                    {metrics.recommendedSolarKw} kWp
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    {Math.ceil((metrics.recommendedSolarKw * 1000) / 450)} × 450W Tier-1 Panels (Tilt 14° N)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Battery Storage (LiFePO4)</span>
                  <span className="text-xl font-bold text-amber-400">
                    {metrics.batteryKwh} kWh
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    48V 100Ah Rack Modules (1.8 Days Autonomy)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Hybrid Inverter</span>
                  <span className="text-xl font-bold text-amber-400">
                    {metrics.inverterKva} kVA
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    Pure Sine Wave 48V with MPPT Controller
                  </span>
                </div>
              </div>

              {/* Itemized Load Schedule */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Daily Critical Load Schedule
                </h4>
                <div className="divide-y divide-stone-800 text-xs">
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-stone-300">12V/24V High-Efficiency Solar Refrigerator &amp; Freezer (24 hrs)</span>
                    <span className="font-mono text-amber-300">~0.75 kWh/day</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-stone-300">Submersible DC Borehole Pump / Cistern Lift Pump (2 hrs run)</span>
                    <span className="font-mono text-amber-300">~0.60 kWh/day</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-stone-300">LED Lighting (10 fixtures × 8W × 5 hrs evening)</span>
                    <span className="font-mono text-amber-300">~0.40 kWh/day</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-stone-300">Laptops, Mobile Charging, Starlink / Satellite Comms</span>
                    <span className="font-mono text-amber-300">~0.50 kWh/day</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="text-stone-300">Small Kitchen Grain Mill / Workshop Power Tools (Intermittent)</span>
                    <span className="font-mono text-amber-300">~0.45 kWh/day</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAINWATER & WATER SECURITY */}
          {activeTab === 'water' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/40 text-xs text-sky-200">
                <strong className="block text-sm font-bold text-sky-300 mb-1">
                  Water Security Plan: {metrics.storageCapacityLiters.toLocaleString()} Liters Dedicated Reserve
                </strong>
                {roofAreaSqm}m² roof catchment captures {metrics.annualRainwaterLiters.toLocaleString()} Liters annually. Sized for {metrics.recommendedTankCount5k} × 5,000L tanks to ensure 6 full months of dry season autonomy.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Annual Catchment</span>
                  <span className="text-xl font-bold text-sky-400">
                    {Math.round(metrics.annualRainwaterLiters / 1000)}k L
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    Based on {district.rainfallAnnualMm}mm/yr in {district.name}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Recommended Tanks</span>
                  <span className="text-xl font-bold text-sky-400">
                    {metrics.recommendedTankCount5k} × 5,000L
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    Food-Grade Polyethylene or Ferro-Cement
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Dry Season Buffer</span>
                  <span className="text-xl font-bold text-sky-400">
                    ~{metrics.waterIndependenceMonths} Mos
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    At {metrics.dailyWaterNeedLiters} L/day baseline
                  </span>
                </div>
              </div>

              {/* 3-Stage Filtration Schematic */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  3-Stage Off-Grid Drinking Water Purification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-sky-400 font-bold block mb-1">Stage 1: First-Flush Diverter</span>
                    <span className="text-stone-300">
                      Discards the first 1-2mm of roof wash containing dust, pollen, and leaves.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-sky-400 font-bold block mb-1">Stage 2: Biosand Filter</span>
                    <span className="text-stone-300">
                      Biological layer (schmutzdecke) consumes pathogens, bacteria, and parasites organically.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="text-sky-400 font-bold block mb-1">Stage 3: Activated Biochar</span>
                    <span className="text-stone-300">
                      Crushed hardwood biochar polishes taste, adsorbs residual micro-pollutants, and clarifies.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGROFORESTRY & 3X3X3FT PITS */}
          {activeTab === 'agroforestry' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200">
                <strong className="block text-sm font-bold text-emerald-300 mb-1">
                  Ellen White 3×3×3ft Deep Planting Method ({metrics.orchardPitCount} Pits Sized)
                </strong>
                Each pit retains moisture during the 6-month dry winter, providing root resilience and perennial food security.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Total Orchard Pits</span>
                  <span className="text-xl font-bold text-emerald-400">
                    {metrics.orchardPitCount} Pits
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    Spaced 6m × 6m along keyline contours
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Biochar Requirement</span>
                  <span className="text-xl font-bold text-emerald-400">
                    {metrics.totalBiocharKg} kg
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    ~{pitSpec.biocharKgPerPit} kg per 3ft pit
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block">Aerobic Compost</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ~{metrics.totalCompostTons} Tons
                  </span>
                  <span className="text-xs text-stone-400 block mt-1">
                    2 wheelbarrows compost per pit
                  </span>
                </div>
              </div>

              {/* Exact Pit Cross-Section Layering */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  3×3×3ft Pit Soil Stratification Recipe
                </h4>
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">1</span>
                    <span><strong>Base Layer (Depth 2.5–3.0 ft):</strong> Small basalt/granite stones, bone pieces, and coarse woody biomass for subsoil drainage and long-term mineral release.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">2</span>
                    <span><strong>Nutrient Matrix (Depth 1.0–2.5 ft):</strong> 50% Katondo topsoil blended with 30% decomposed compost, 15kg inoculated biochar, and wood ash.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">3</span>
                    <span><strong>Root Zone (Depth 0–1.0 ft):</strong> Fine friable topsoil mound with seedling root flare set 2 inches above ground level to avoid collar rot.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[11px] font-bold">4</span>
                    <span><strong>Surface Mulch:</strong> 4-inch deep dry grass mulch ring kept 3 inches clear of the tree trunk to prevent fungal pests.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BILL OF QUANTITIES (BOQ) */}
          {activeTab === 'boq' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-sm font-bold text-white">Itemized Outpost Bill of Quantities (BoQ)</strong>
                  <span className="text-stone-400 font-mono text-[11px]">Estimates in USD / MWK</span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Budget allocations based on local Lilongwe/Blantyre hardware distributors, DCCMS hydrology data, and Malawian agricultural supply pricing.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 font-mono">
                      <th className="py-2.5 px-3">Item Category</th>
                      <th className="py-2.5 px-3">Specification</th>
                      <th className="py-2.5 px-3">Qty</th>
                      <th className="py-2.5 px-3 text-right">Estimated USD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 text-stone-300">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-amber-300">Solar PV Panels</td>
                      <td className="py-2.5 px-3">450W Tier-1 Monocrystalline Modules</td>
                      <td className="py-2.5 px-3 font-mono">{Math.ceil((metrics.recommendedSolarKw * 1000) / 450)} Units</td>
                      <td className="py-2.5 px-3 font-mono text-right">${Math.round(metrics.recommendedSolarKw * 480)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-amber-300">Battery Storage</td>
                      <td className="py-2.5 px-3">48V 100Ah LiFePO4 Battery Modules</td>
                      <td className="py-2.5 px-3 font-mono">{Math.max(1, Math.round(metrics.batteryKwh / 5))} Units</td>
                      <td className="py-2.5 px-3 font-mono text-right">${Math.round(metrics.batteryKwh * 320)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-amber-300">Hybrid Inverter</td>
                      <td className="py-2.5 px-3">{metrics.inverterKva}kVA Pure Sine Wave MPPT Unit</td>
                      <td className="py-2.5 px-3 font-mono">1 Unit</td>
                      <td className="py-2.5 px-3 font-mono text-right">${metrics.inverterKva > 3 ? 1200 : 750}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-sky-300">Rainwater Tanks</td>
                      <td className="py-2.5 px-3">5,000L Food-Grade Roto-Mold Tanks</td>
                      <td className="py-2.5 px-3 font-mono">{metrics.recommendedTankCount5k} Tanks</td>
                      <td className="py-2.5 px-3 font-mono text-right">${metrics.recommendedTankCount5k * 550}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-sky-300">Guttering &amp; Piping</td>
                      <td className="py-2.5 px-3">PVC 110mm Gutters, Downpipes, First-Flush</td>
                      <td className="py-2.5 px-3 font-mono">Full Setup</td>
                      <td className="py-2.5 px-3 font-mono text-right">$380</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-300">Biochar &amp; Soil Prep</td>
                      <td className="py-2.5 px-3">Inoculated hardwood biochar + mineral rock dust</td>
                      <td className="py-2.5 px-3 font-mono">{metrics.totalBiocharKg} kg</td>
                      <td className="py-2.5 px-3 font-mono text-right">${Math.round(metrics.orchardPitCount * 12)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-emerald-300">Orchard Saplings</td>
                      <td className="py-2.5 px-3">Grafted Hass avocado, dwarf papaya, mango, lime</td>
                      <td className="py-2.5 px-3 font-mono">{metrics.orchardPitCount} Trees</td>
                      <td className="py-2.5 px-3 font-mono text-right">${metrics.orchardPitCount * 8}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-stone-700 font-bold text-white">
                      <td colSpan={3} className="py-3 px-3">Estimated Total Turnkey Outpost Budget</td>
                      <td className="py-3 px-3 font-mono text-right text-amber-400">
                        ${(
                          Math.round(metrics.recommendedSolarKw * 480) +
                          Math.round(metrics.batteryKwh * 320) +
                          (metrics.inverterKva > 3 ? 1200 : 750) +
                          metrics.recommendedTankCount5k * 550 +
                          380 +
                          Math.round(metrics.orchardPitCount * 12) +
                          metrics.orchardPitCount * 8
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-stone-950/80 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-400 font-mono">
            <span>District: <strong className="text-white">{district.name}</strong></span>
            <span className="mx-2">·</span>
            <span>Family: <strong className="text-white">{familySize} People</strong></span>
            <span className="mx-2">·</span>
            <span>Roof: <strong className="text-white">{roofAreaSqm} m²</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              title="Download Masterplan Markdown (.md)"
              className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold font-mono transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-700/60"
            >
              <Download size={14} />
              <span>Download .md</span>
            </button>
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold font-mono transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied Specification' : 'Copy Specification'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
