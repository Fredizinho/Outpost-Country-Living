import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudRain, 
  Sun, 
  Thermometer, 
  Snowflake, 
  Zap, 
  Waves, 
  Mountain, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle,
  Flame,
  Layers,
  Sprout,
  Compass,
  MapPin,
  TrendingUp,
  Info,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Sliders,
  Sparkles
} from 'lucide-react';
import { 
  DISTRICT_CLIMATE_DATABASE, 
  DistrictClimateData, 
  getDistrictClimateData, 
  CLIMATE_MONTHS, 
  FrostRiskLevel 
} from '@/data/climateTelemetryData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ClimateTelemetryProps {
  initialDistrict?: string;
  onDistrictChange?: (districtId: string) => void;
  compact?: boolean;
  showElevationSlider?: boolean;
  className?: string;
}

export function ClimateTelemetry({
  initialDistrict = 'dedza',
  onDistrictChange,
  compact = false,
  showElevationSlider = true,
  className
}: ClimateTelemetryProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialDistrict.toLowerCase());
  const [elevationOffsetM, setElevationOffsetM] = useState<number>(0);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState<number | null>(null);

  // Sync if initialDistrict changes externally
  React.useEffect(() => {
    if (initialDistrict) {
      setSelectedDistrictId(initialDistrict.toLowerCase());
    }
  }, [initialDistrict]);

  const climate: DistrictClimateData = useMemo(() => {
    return getDistrictClimateData(selectedDistrictId);
  }, [selectedDistrictId]);

  const handleSelectDistrict = (id: string) => {
    setSelectedDistrictId(id);
    setElevationOffsetM(0);
    if (onDistrictChange) {
      onDistrictChange(id);
    }
  };

  // Calculate adjusted temperatures based on elevation slider (standard environmental lapse rate ~0.65°C per 100m)
  const adjustedSummerMin = Math.round((climate.summerMinC - (elevationOffsetM / 100) * 0.65) * 10) / 10;
  const adjustedSummerMax = Math.round((climate.summerMaxC - (elevationOffsetM / 100) * 0.65) * 10) / 10;
  const adjustedWinterMin = Math.round((climate.winterMinC - (elevationOffsetM / 100) * 0.65) * 10) / 10;
  const adjustedWinterMax = Math.round((climate.winterMaxC - (elevationOffsetM / 100) * 0.65) * 10) / 10;

  // Max rainfall value for chart scaling
  const maxMonthlyRain = Math.max(...climate.monthlyRainfallMm, 300);

  // Frost level badge colors
  const getFrostBadgeStyle = (level: FrostRiskLevel) => {
    switch (level) {
      case 'High':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Low':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'None':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div 
      id="climate-telemetry-engine" 
      className={cn(
        "w-full bg-slate-950/90 text-slate-100 rounded-3xl border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-6 relative overflow-hidden",
        className
      )}
    >
      {/* Subtle Background Atmospheric Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HEADER & DISTRICT QUICK-SELECTOR                                      */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-10 h-10 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif font-black text-lg sm:text-xl text-amber-200 tracking-tight">
                Local Weather & Land Guide
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Weather Data
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Detailed rain, temperature, frost risk, and solar sunshine information
            </p>
          </div>
        </div>

        {/* District Fast-Switching Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {Object.values(DISTRICT_CLIMATE_DATABASE).map((d) => {
            const isSelected = d.id === climate.id;
            return (
              <button
                key={d.id}
                onClick={() => handleSelectDistrict(d.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight transition-all duration-200 border cursor-pointer",
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20 font-black scale-[1.02]"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                )}
              >
                {d.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP TELEMETRY 4-METRIC GRID                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
        
        {/* Metric 1: Annual Rainfall & Distribution */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Yearly Rainfall
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <CloudRain className="w-4 h-4 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono font-black text-sky-300">
                {climate.annualRainfallMm}
              </span>
              <span className="text-xs font-mono text-slate-400">mm / year</span>
            </div>
            <div className="text-[11px] font-sans text-slate-300 font-medium mt-0.5">
              Normal Range: <strong className="text-white">{climate.rainfallRangeMm}</strong>
            </div>
            <div className="text-[10px] font-mono text-sky-400/90 mt-1 truncate">
              {climate.wetSeasonMonths}
            </div>
          </div>
        </div>

        {/* Metric 2: Temperatures & Daily Min/Max */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Temperature Range
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <Thermometer className="w-4 h-4 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-amber-300">
                {adjustedWinterMin}°C
              </span>
              <span className="text-xs text-slate-400 font-mono">to</span>
              <span className="text-2xl font-mono font-black text-orange-400">
                {adjustedSummerMax}°C
              </span>
            </div>
            <div className="text-[11px] font-sans text-slate-300 mt-0.5">
              Warm Season: {adjustedSummerMin}–{adjustedSummerMax}°C • Cold Season: {adjustedWinterMin}–{adjustedWinterMax}°C
            </div>
            <div className="text-[10px] font-mono text-amber-400/90 mt-1">
              Average Temp: {climate.annualMeanTempC}°C
            </div>
          </div>
        </div>

        {/* Metric 3: Solar Radiation & Peak Hours */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Solar Sunshine
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <Zap className="w-4 h-4 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono font-black text-amber-400">
                {climate.solarRadiationKwhM2Day}
              </span>
              <span className="text-xs font-mono text-slate-400">kWh/m²/day</span>
            </div>
            <div className="text-[11px] font-sans text-slate-300 mt-0.5">
              Peak Sun Hours: <strong className="text-white">{climate.solarPeakHoursRange}</strong>
            </div>
            <div className="text-[10px] font-mono text-emerald-400/90 mt-1">
              Solar Water Pump: Ideal conditions
            </div>
          </div>
        </div>

        {/* Metric 4: Frost Risk & Thermal Belt */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Frost & Cold Air Risk
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <Snowflake className="w-4 h-4 stroke-[1.75]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-2.5 py-0.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider border",
                getFrostBadgeStyle(climate.frostRisk)
              )}>
                {climate.frostRisk} Risk
              </span>
            </div>
            <div className="text-[11px] font-sans text-slate-300 mt-1.5 line-clamp-2">
              {climate.thermalBeltZone}
            </div>
            <div className="text-[10px] font-mono text-amber-300/80 mt-1">
              Warm height zone: {climate.thermalBeltElevationWindow}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MONTHLY RAINFALL DISTRIBUTION CHART & SEASONAL RAINFALL PHENOLOGY     */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <CloudRain className="w-4 h-4 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-200">
                12-Month Rainfall Pattern ({climate.name})
              </h4>
              <p className="text-[10px] text-slate-400 font-sans">
                Main rainy season (Nov–Apr) and cool winter mists (Jun–Jul)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" />
              <span>Heavy Rains (&gt;150mm)</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/60 inline-block" />
              <span>Dry Season / Stream Garden (Dimba)</span>
            </div>
          </div>
        </div>

        {/* Interactive Bar Chart */}
        <div className="grid grid-cols-12 gap-1.5 sm:gap-2.5 items-end pt-4 pb-2 h-44">
          {climate.monthlyRainfallMm.map((mm, idx) => {
            const heightPct = Math.max(8, (mm / maxMonthlyRain) * 100);
            const isWet = mm >= 100;
            const isHovered = hoveredMonthIdx === idx;

            return (
              <div 
                key={CLIMATE_MONTHS[idx]}
                className="flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredMonthIdx(idx)}
                onMouseLeave={() => setHoveredMonthIdx(null)}
              >
                {/* Floating Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-10 z-20 px-2 py-1 rounded-md bg-slate-950 border border-white/20 text-[10px] font-mono font-bold text-sky-300 shadow-xl whitespace-nowrap pointer-events-none"
                    >
                      {CLIMATE_MONTHS[idx]}: {mm} mm
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Amount on top of bar on hover or if high */}
                <span className={cn(
                  "text-[9px] font-mono mb-1 transition-opacity",
                  isHovered ? "opacity-100 text-amber-300 font-bold" : "opacity-60 text-slate-400 hidden sm:inline"
                )}>
                  {mm}
                </span>

                {/* Animated Vertical Bar */}
                <div 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-300 border-t border-x",
                    isWet 
                      ? "bg-gradient-to-t from-sky-900 via-sky-600 to-sky-400 border-sky-300/40 group-hover:from-sky-800 group-hover:to-sky-300 shadow-md shadow-sky-900/30" 
                      : "bg-gradient-to-t from-slate-900 via-amber-950 to-amber-700/60 border-amber-500/30 group-hover:from-amber-900 group-hover:to-amber-500"
                  )}
                  style={{ height: `${heightPct}%` }}
                />

                {/* Month Label */}
                <span className={cn(
                  "text-[10px] font-mono mt-2 transition-colors",
                  isHovered ? "text-amber-300 font-bold" : "text-slate-400"
                )}>
                  {CLIMATE_MONTHS[idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. THERMAL BELT & ELEVATION INVERSION SIMULATOR                           */}
      {/* ========================================================================= */}
      {showElevationSlider && (
        <div className="bg-gradient-to-br from-slate-900/90 to-emerald-950/30 rounded-2xl p-5 border border-emerald-500/20 flex flex-col gap-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
                <Mountain className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-black uppercase tracking-wider text-emerald-200">
                  Hill Height & Frost Simulator
                </h4>
                <p className="text-[10px] text-slate-400 font-sans">
                  See how temperatures change from cold valley bottoms to warm mid-slopes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Ground Height:</span>
              <span className="font-bold text-amber-300">{climate.elevationMeanM + elevationOffsetM} meters above sea level</span>
            </div>
          </div>

          {/* Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>-300m (Cold Valleys & Wetlands)</span>
              <span className="font-bold text-amber-400">
                {elevationOffsetM >= 0 ? `+${elevationOffsetM}m` : `${elevationOffsetM}m`} Offset
              </span>
              <span>+600m (High Mountain Slopes)</span>
            </div>

            <input 
              type="range"
              min="-300"
              max="600"
              step="50"
              value={elevationOffsetM}
              onChange={(e) => setElevationOffsetM(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Thermal Belt Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-black/40 p-3.5 rounded-xl border border-white/5">
            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold text-amber-300 uppercase text-[10px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Best Spot to Build Your Home:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                {climate.thermalBeltAdvice}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold text-amber-300 uppercase text-[10px] flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-sky-400" /> Wind & Soil Quality:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                {climate.windRegime} • <strong className="text-amber-200">{climate.soilType} ({climate.soilPh})</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. AGRO-ECOLOGICAL PROTOCOLS & ALMANAC CROSS-SYNC ALERT                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 relative z-10">
        
        {/* Left 2 Cols: Frost & Micro-Hydro Protocols */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <Sprout className="w-4 h-4 stroke-[1.75]" />
            </div>
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-amber-200">
              Farming Guidelines for {climate.agroEcologicalClassification}
            </h4>
          </div>

          <div className="space-y-2">
            {climate.frostProtectionProtocols.map((proto, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{proto}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-sky-400" />
              <span>Stream Power: <strong className="text-sky-300">{climate.microHydroPotential}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>Well Depth: <strong className="text-emerald-300">{climate.aquiferDepthMeters}</strong></span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Dynamic Seasonal Alert */}
        <div className="bg-gradient-to-br from-amber-950/80 to-slate-950 rounded-2xl p-4 border border-amber-500/40 flex flex-col justify-between gap-3 shadow-lg">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300">
                Current Farming Season Note
              </span>
            </div>
            <h5 className="text-xs font-bold text-white font-serif">
              {climate.seasonalAlert.title}
            </h5>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {climate.seasonalAlert.description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <Link
              to={`/seasons?district=${climate.id}`}
              className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Open Almanac</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              to={`/calculators?district=${climate.id}`}
              className="py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 text-[10px] font-mono font-bold uppercase transition-colors"
              title="Calculators for this district"
            >
              <Calculator className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ClimateTelemetry;
