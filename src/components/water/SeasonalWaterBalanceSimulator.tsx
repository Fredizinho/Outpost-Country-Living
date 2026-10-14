import React, { useState, useMemo } from 'react';
import {
  CloudRain,
  Droplets,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Info,
  ShieldCheck,
  Download,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import { DISTRICT_LIST } from '@/constants';
import { cn } from '@/lib/utils';

export interface SeasonalWaterBalanceSimulatorProps {
  initialDistrictId?: string;
  initialFamilySize?: number;
  initialRoofAreaSqm?: number;
  className?: string;
}

// 12-Month Rainfall Distribution Profile for Malawi Agro-Ecological Zones (% of annual rainfall)
const MALAWI_MONTHLY_DISTRIBUTION: Record<string, number[]> = {
  // Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
  highlands: [0.22, 0.20, 0.18, 0.08, 0.03, 0.01, 0.01, 0.01, 0.01, 0.03, 0.08, 0.14],
  plateau: [0.24, 0.22, 0.16, 0.06, 0.01, 0.00, 0.00, 0.00, 0.00, 0.02, 0.09, 0.20],
  lakeshore: [0.20, 0.22, 0.24, 0.14, 0.04, 0.01, 0.01, 0.00, 0.00, 0.01, 0.04, 0.09],
  lowland: [0.25, 0.24, 0.15, 0.04, 0.01, 0.00, 0.00, 0.00, 0.00, 0.02, 0.09, 0.20],
};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const SEASON_LABELS = [
  'Dzinja (Main Rains)',
  'Dzinja (Main Rains)',
  'Chofunda (Late Rains)',
  'Chofunda (Late Rains)',
  'Mwera (Cold Dry)',
  'Mwera (Cold Dry)',
  'Mwera (Cold Dry)',
  'Chilimwe (Hot Dry)',
  'Chilimwe (Hot Dry)',
  'Chilimwe (Hot Dry)',
  'Kokalupsya (First Showers)',
  'Dzinja (Main Rains)',
];

export function SeasonalWaterBalanceSimulator({
  initialDistrictId = 'dedza',
  initialFamilySize = 5,
  initialRoofAreaSqm = 90,
  className = '',
}: SeasonalWaterBalanceSimulatorProps) {
  const [districtId, setDistrictId] = useState(initialDistrictId.toLowerCase());
  const [familySize, setFamilySize] = useState(initialFamilySize);
  const [roofAreaSqm, setRoofAreaSqm] = useState(initialRoofAreaSqm);
  const [tankCapacityLiters, setTankCapacityLiters] = useState(10000); // e.g. 2 x 5,000L tanks
  const [dailyPerCapitaNeed, setDailyPerCapitaNeed] = useState(85); // 85L/person/day
  const [copied, setCopied] = useState(false);

  const district = useMemo(() => {
    return DISTRICT_LIST.find((d) => d.id === districtId) || DISTRICT_LIST[0];
  }, [districtId]);

  // Determine regional rainfall distribution curve
  const distributionCurve = useMemo(() => {
    const isLakeshore = ['nkhata bay', 'salima', 'nkhotakota', 'karonga', 'mangochi'].includes(district.name.toLowerCase());
    const isHighland = ['mulanje', 'dedza', 'nyika', 'rumphi', 'chitipa', 'ntcheu'].includes(district.name.toLowerCase());
    const isLowland = ['chikwawa', 'nsanje', 'mwanza', 'neno'].includes(district.name.toLowerCase());

    if (isLakeshore) return MALAWI_MONTHLY_DISTRIBUTION.lakeshore;
    if (isHighland) return MALAWI_MONTHLY_DISTRIBUTION.highlands;
    if (isLowland) return MALAWI_MONTHLY_DISTRIBUTION.lowland;
    return MALAWI_MONTHLY_DISTRIBUTION.plateau;
  }, [district]);

  // Calculate 12-Month Hydrological Simulation
  const simulation = useMemo(() => {
    const monthlyRainfallMm = distributionCurve.map((pct) => Math.round(district.rainfallAnnualMm * pct));
    const runoffCoefficient = 0.85; // Corrugated iron / baked tile with first flush
    const monthlyHarvestLiters = monthlyRainfallMm.map((mm) => Math.round(roofAreaSqm * mm * runoffCoefficient));
    const monthlyDemandLiters = familySize * dailyPerCapitaNeed * 30;

    let currentStoredWater = 3000; // Starting baseline in January
    const monthlyLevels: {
      month: string;
      season: string;
      rainfallMm: number;
      harvestL: number;
      demandL: number;
      storedL: number;
      deficitL: number;
      overflowL: number;
    }[] = [];

    let totalDeficit = 0;
    let deficitMonthsCount = 0;
    let minStoredMonth = 0;
    let minStoredLevel = Infinity;

    for (let i = 0; i < 12; i++) {
      const harvest = monthlyHarvestLiters[i];
      const demand = monthlyDemandLiters;
      const net = harvest - demand;

      let nextStored = currentStoredWater + net;
      let deficit = 0;
      let overflow = 0;

      if (nextStored < 0) {
        deficit = Math.abs(nextStored);
        nextStored = 0;
        totalDeficit += deficit;
        deficitMonthsCount++;
      } else if (nextStored > tankCapacityLiters) {
        overflow = nextStored - tankCapacityLiters;
        nextStored = tankCapacityLiters;
      }

      if (nextStored < minStoredLevel) {
        minStoredLevel = nextStored;
        minStoredMonth = i;
      }

      currentStoredWater = nextStored;

      monthlyLevels.push({
        month: MONTH_NAMES[i],
        season: SEASON_LABELS[i],
        rainfallMm: monthlyRainfallMm[i],
        harvestL: harvest,
        demandL: demand,
        storedL: Math.round(nextStored),
        deficitL: Math.round(deficit),
        overflowL: Math.round(overflow),
      });
    }

    const annualHarvest = monthlyHarvestLiters.reduce((a, b) => a + b, 0);
    const annualDemand = monthlyDemandLiters * 12;
    const recommendedTankCapacity = Math.max(
      10000,
      Math.ceil((familySize * dailyPerCapitaNeed * 30 * 6) / 5000) * 5000
    );

    return {
      monthlyLevels,
      annualHarvest,
      annualDemand,
      totalDeficit,
      deficitMonthsCount,
      minStoredMonth: MONTH_NAMES[minStoredMonth],
      minStoredLevel: Math.round(minStoredLevel),
      recommendedTankCapacity,
      recommendedTanksCount: Math.ceil(recommendedTankCapacity / 5000),
    };
  }, [district, distributionCurve, familySize, roofAreaSqm, tankCapacityLiters, dailyPerCapitaNeed]);

  const handleCopySummary = () => {
    const text = `OUTPOST WATER BALANCE SIMULATION
District: ${district.name} (${district.rainfallAnnualMm} mm/yr)
Household: ${familySize} Persons · Roof: ${roofAreaSqm} m² · Cistern: ${tankCapacityLiters.toLocaleString()} L
Annual Rain Harvested: ${simulation.annualHarvest.toLocaleString()} L
Annual Family Demand: ${simulation.annualDemand.toLocaleString()} L
Status: ${simulation.totalDeficit === 0 ? '100% Autonomous (Zero Deficit)' : `Deficit of ${simulation.totalDeficit.toLocaleString()} L across ${simulation.deficitMonthsCount} months`}
Recommended Tank Storage: ${simulation.recommendedTankCapacity.toLocaleString()} L (${simulation.recommendedTanksCount} × 5,000L tanks)`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn('p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex flex-col gap-6 shadow-xl', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold mb-1">
            <Droplets size={14} />
            <span>Seasonal Rainwater Hydrograph Simulator</span>
            <span>·</span>
            <span className="text-stone-400">{district.name} District</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            12-Month Outpost Water Balance &amp; Dry-Season Security
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-stone-700 self-start sm:self-auto cursor-pointer"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied Summary' : 'Copy Water Brief'}</span>
        </button>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
        <div>
          <label className="text-stone-400 font-mono block mb-1">District</label>
          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-sky-400 focus:outline-none cursor-pointer"
          >
            {DISTRICT_LIST.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.rainfallAnnualMm}mm)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-stone-400 font-mono block mb-1">
            Family: <span className="text-amber-400 font-bold">{familySize} People</span>
          </label>
          <input
            type="range"
            min={1}
            max={12}
            value={familySize}
            onChange={(e) => setFamilySize(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer py-1"
          />
        </div>

        <div>
          <label className="text-stone-400 font-mono block mb-1">
            Catchment Roof: <span className="text-sky-400 font-bold">{roofAreaSqm} m²</span>
          </label>
          <input
            type="range"
            min={30}
            max={200}
            step={5}
            value={roofAreaSqm}
            onChange={(e) => setRoofAreaSqm(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer py-1"
          />
        </div>

        <div>
          <label className="text-stone-400 font-mono block mb-1">
            Cistern Storage: <span className="text-emerald-400 font-bold">{tankCapacityLiters.toLocaleString()} L</span>
          </label>
          <select
            value={tankCapacityLiters}
            onChange={(e) => setTankCapacityLiters(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-medium focus:ring-1 focus:ring-emerald-400 focus:outline-none cursor-pointer"
          >
            <option value={5000}>5,000 L (1 Tank)</option>
            <option value={10000}>10,000 L (2 Tanks)</option>
            <option value={15000}>15,000 L (3 Tanks)</option>
            <option value={20000}>20,000 L (4 Tanks / Masonry Tank)</option>
            <option value={30000}>30,000 L (Large Ferro-Cement Reservoir)</option>
          </select>
        </div>
      </div>

      {/* Primary KPI Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
          <span className="text-stone-400 text-xs font-mono block">Annual Harvest vs Demand</span>
          <div className="text-xl font-bold text-white tabular-nums mt-1">
            {Math.round(simulation.annualHarvest / 1000)}k <span className="text-xs font-normal text-stone-400">/ {Math.round(simulation.annualDemand / 1000)}k L</span>
          </div>
          <span className="text-caption text-stone-400 mt-1 block">
            {simulation.annualHarvest >= simulation.annualDemand ? (
              <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                <CheckCircle2 size={12} /> Surplus Harvest Potential
              </span>
            ) : (
              <span className="text-amber-400 font-semibold inline-flex items-center gap-1">
                <AlertTriangle size={12} /> Roof Catchment Too Small
              </span>
            )}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
          <span className="text-stone-400 text-xs font-mono block">Dry-Season Deficit</span>
          <div className="text-xl font-bold tabular-nums mt-1">
            {simulation.totalDeficit === 0 ? (
              <span className="text-emerald-400">0 Liters Deficit</span>
            ) : (
              <span className="text-rose-400">-{simulation.totalDeficit.toLocaleString()} L</span>
            )}
          </div>
          <span className="text-caption text-stone-400 mt-1 block">
            {simulation.totalDeficit === 0
              ? 'Full 100% Water Autonomy all 12 Months'
              : `Water runs dry in ${simulation.minStoredMonth} (${simulation.deficitMonthsCount} dry months)`}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
          <span className="text-stone-400 text-xs font-mono block">Recommended Tank Setup</span>
          <div className="text-xl font-bold text-sky-400 tabular-nums mt-1">
            {simulation.recommendedTankCapacity.toLocaleString()} Liters
          </div>
          <span className="text-caption text-stone-400 mt-1 block">
            Install {simulation.recommendedTanksCount} × 5,000L tanks to ensure 6-mo dry reserve
          </span>
        </div>
      </div>

      {/* Visual Monthly Balance Hydrograph */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider font-mono">
            Monthly Cistern Reservoir Levels &amp; Rain Inflow
          </h4>
          <div className="flex items-center gap-3 font-mono text-caption text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" /> Rain Harvested
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Cistern Water Level
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Deficit
            </span>
          </div>
        </div>

        {/* 12-Month Visual Bars */}
        <div className="grid grid-cols-12 gap-1.5 pt-2 pb-1 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
          {simulation.monthlyLevels.map((m, idx) => {
            const storedPercent = Math.min(100, Math.round((m.storedL / tankCapacityLiters) * 100));
            const isDryDeficit = m.deficitL > 0;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                {/* Visual Bar Column */}
                <div className="h-32 w-full bg-stone-900 rounded-md relative flex flex-col justify-end p-0.5 overflow-hidden border border-stone-800/80">
                  {/* Storage Fill Level */}
                  <div
                    style={{ height: `${storedPercent}%` }}
                    className={cn(
                      'w-full rounded-xs transition-all duration-300',
                      isDryDeficit
                        ? 'bg-rose-500/80'
                        : storedPercent > 75
                        ? 'bg-emerald-500/90'
                        : storedPercent > 30
                        ? 'bg-sky-500/90'
                        : 'bg-amber-500/90'
                    )}
                  />
                  {/* Harvest indicator dot */}
                  <div
                    title={`Rain Inflow: ${m.harvestL.toLocaleString()}L`}
                    className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-300 shadow-xs"
                  />
                </div>

                {/* Month Label */}
                <span className="text-caption font-mono font-bold text-stone-300">
                  {m.month}
                </span>

                {/* Stored Value Indicator */}
                <span className="text-caption font-mono text-stone-400 tabular-nums">
                  {Math.round(m.storedL / 1000)}k
                </span>
              </div>
            );
          })}
        </div>

        {/* Monthly Table / Summary */}
        <div className="p-3.5 rounded-xl bg-stone-950/40 border border-stone-800 text-xs text-stone-300 space-y-1 leading-relaxed">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-sky-400 shrink-0 mt-0.5" />
            <span>
              <strong>Dry Season Guidance for {district.name}:</strong> Main rains cease in April/May. From June through October (*Mwera* and *Chilimwe*), rainfall drops to under 5mm/month.
              {simulation.totalDeficit > 0 ? (
                <> To bridge the <strong>{simulation.totalDeficit.toLocaleString()} Liters</strong> dry season shortfall, increase storage to <strong>{simulation.recommendedTankCapacity.toLocaleString()} Liters</strong> or connect an auxiliary borehole / sand dam source.</>
              ) : (
                <> Your current <strong>{tankCapacityLiters.toLocaleString()} Liters</strong> storage comfortably spans the dry period with a minimum safety reserve of <strong>{simulation.minStoredLevel.toLocaleString()} Liters</strong> in {simulation.minStoredMonth}.</>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
