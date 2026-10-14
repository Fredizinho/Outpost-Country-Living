import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  CloudRain,
  Thermometer,
  Calendar,
  Layers,
  Info,
  Droplets,
  AlertTriangle,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHART_PALETTE_6, CHART_TOKENS } from '@/lib/chartTokens';
import {
  DISTRICT_CLIMATE_DATABASE,
  DistrictClimateData,
  CLIMATE_MONTHS,
} from '@/data/climateTelemetryData';

export interface RegionalClimateChartProps {
  initialDistrict?: string;
  onDistrictSelect?: (districtId: string) => void;
  className?: string;
}

// Monthly seasonal mapping across the 12-month calendar
const MONTH_METADATA = [
  { month: 'Jan', full: 'January', season: 'Rainy Planting', focus: 'Active monsoon, high leaching risk, top-dress compost' },
  { month: 'Feb', full: 'February', season: 'Rainy Planting', focus: 'Mid-summer flowering, monitor weed suppression & drainage' },
  { month: 'Mar', full: 'March', season: 'Rainy Planting', focus: 'Late monsoon tail, grain filling, prep grain drying storage' },
  { month: 'Apr', full: 'Harvest & Storage', focus: 'Main harvest onset, hermetic PICS bag sealing, sweet potato lifting' },
  { month: 'May', full: 'Harvest & Storage', focus: 'Winter dimba preparation, Chiperoni mists begin in South' },
  { month: 'Jun', full: 'Harvest & Storage', focus: 'Cold inversion dips, frost watch in valleys, wheat/potato dimba sowing' },
  { month: 'Jul', full: 'Cold Dry Season', focus: 'Peak highland frost risk (2°C–5°C), mulch orchard basins, garlic care' },
  { month: 'Aug', full: 'Cold Dry Season', focus: 'Cold lifts, prune fruit orchards, prep 3x3x3ft tree planting pits' },
  { month: 'Sep', full: 'Hot Dry Preparation', focus: 'Extreme dry heat, service solar borehole pumps, compost pile turning' },
  { month: 'Oct', full: 'Hot Dry Preparation', focus: 'Chizimalupsya haze, clear contour swales, prep seed stocks for 25mm rain' },
  { month: 'Nov', full: 'Rainy Planting', focus: 'First planting rains (25mm trigger), sow staple grains within 48 hrs' },
  { month: 'Dec', full: 'Rainy Planting', focus: 'Heavy cloudbursts, first weeding cycle, vetiver contour reinforcement' },
];

// District temperature curves calibrated with DCCMS Malawi meteorological records
const DISTRICT_TEMP_CURVES: Record<string, { max: number[]; min: number[] }> = {
  dedza: {
    max: [23, 23, 23, 22, 21, 19, 19, 21, 24, 26, 25, 24],
    min: [15, 15, 14, 12, 9, 5, 3, 5, 9, 13, 14, 15],
  },
  mulanje: {
    max: [28, 28, 27, 26, 25, 23, 23, 25, 28, 30, 29, 28],
    min: [19, 19, 18, 16, 14, 11, 11, 12, 14, 17, 18, 19],
  },
  salima: {
    max: [30, 30, 30, 29, 28, 26, 26, 28, 31, 34, 33, 31],
    min: [22, 22, 21, 20, 17, 14, 14, 16, 19, 23, 24, 23],
  },
  lilongwe: {
    max: [26, 26, 26, 25, 24, 22, 22, 24, 27, 29, 29, 27],
    min: [17, 17, 16, 13, 10, 7, 6, 8, 11, 15, 17, 17],
  },
  chikwawa: {
    max: [34, 34, 33, 32, 30, 28, 28, 31, 35, 39, 38, 35],
    min: [24, 24, 23, 20, 17, 14, 14, 16, 19, 24, 25, 25],
  },
  mzimba: {
    max: [25, 25, 25, 24, 23, 21, 21, 23, 26, 28, 27, 26],
    min: [16, 16, 15, 13, 10, 7, 6, 7, 10, 14, 16, 16],
  },
  zomba: {
    max: [27, 27, 27, 26, 25, 23, 23, 25, 28, 30, 29, 28],
    min: [18, 18, 17, 15, 12, 9, 9, 11, 13, 16, 17, 18],
  },
  rumphi: {
    max: [27, 27, 27, 26, 25, 23, 23, 25, 28, 31, 30, 28],
    min: [17, 17, 16, 14, 11, 8, 7, 9, 12, 16, 17, 17],
  },
};

export const AVAILABLE_REGIONS = [
  { id: 'dedza', name: 'Dedza Highlands', region: 'Central High Altitude', elevation: '1,560m', tag: 'Frost Zone' },
  { id: 'mulanje', name: 'Mulanje Massif', region: 'Southern Cloud Massif', elevation: '1,100m', tag: 'Chiperoni Zone' },
  { id: 'salima', name: 'Salima Lakeshore', region: 'Central Lakeshore', elevation: '480m', tag: 'Alluvial Plain' },
  { id: 'lilongwe', name: 'Lilongwe Rural', region: 'Central Plateau', elevation: '1,100m', tag: 'Granary Belt' },
  { id: 'chikwawa', name: 'Lower Shire (Chikwawa)', region: 'Southern Lowland', elevation: '120m', tag: 'Semi-Arid' },
  { id: 'mzimba', name: 'Mzimba Plateau', region: 'Northern Plateau', elevation: '1,350m', tag: 'Highland Savanna' },
  { id: 'zomba', name: 'Zomba Plateau', region: 'Southern Highlands', elevation: '950m', tag: 'Perennial Springs' },
  { id: 'rumphi', name: 'Rumphi / Nyika', region: 'Northern Escarpment', elevation: '1,450m', tag: 'Montane Microclimate' },
];

export function RegionalClimateChart({
  initialDistrict = 'dedza',
  onDistrictSelect,
  className,
}: RegionalClimateChartProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialDistrict.toLowerCase());
  const [viewMode, setViewMode] = useState<'combined' | 'rainfall' | 'temperature'>('combined');
  const [compareDistrictId, setCompareDistrictId] = useState<string | null>(null);

  // Sync external changes
  React.useEffect(() => {
    if (initialDistrict) {
      setSelectedDistrictId(initialDistrict.toLowerCase());
    }
  }, [initialDistrict]);

  const handleSelectDistrict = (id: string) => {
    setSelectedDistrictId(id);
    if (onDistrictSelect) {
      onDistrictSelect(id);
    }
  };

  const primaryData: DistrictClimateData =
    DISTRICT_CLIMATE_DATABASE[selectedDistrictId] || DISTRICT_CLIMATE_DATABASE['dedza'];
  const compareData: DistrictClimateData | null =
    compareDistrictId && DISTRICT_CLIMATE_DATABASE[compareDistrictId]
      ? DISTRICT_CLIMATE_DATABASE[compareDistrictId]
      : null;

  const tempCurve = DISTRICT_TEMP_CURVES[selectedDistrictId] || DISTRICT_TEMP_CURVES['dedza'];
  const compareTempCurve = compareDistrictId ? DISTRICT_TEMP_CURVES[compareDistrictId] || null : null;

  // Build unified 12-month data series for Recharts
  const chartData = useMemo(() => {
    let cumulativeRain = 0;
    return CLIMATE_MONTHS.map((m, idx) => {
      const rain = primaryData.monthlyRainfallMm[idx] || 0;
      cumulativeRain += rain;
      const tMax = tempCurve.max[idx];
      const tMin = tempCurve.min[idx];
      const tMean = Math.round(((tMax + tMin) / 2) * 10) / 10;
      const meta = MONTH_METADATA[idx];

      const compareRain = compareData ? compareData.monthlyRainfallMm[idx] || 0 : undefined;
      const compareTMax = compareTempCurve ? compareTempCurve.max[idx] : undefined;
      const compareTMin = compareTempCurve ? compareTempCurve.min[idx] : undefined;

      return {
        month: m,
        monthFull: meta.full,
        season: meta.season,
        focus: meta.focus,
        rainfall: rain,
        cumulativeRain,
        tempMax: tMax,
        tempMin: tMin,
        tempMean: tMean,
        isFrostRisk: tMin <= 5,
        plantingTrigger: idx === 10 || idx === 11, // Nov/Dec planting window
        // Optional compare series
        compareRainfall: compareRain,
        compareTempMax: compareTMax,
        compareTempMin: compareTMin,
      };
    });
  }, [primaryData, tempCurve, compareData, compareTempCurve]);

  // Key Aggregated Metrics
  const totalAnnualRain = primaryData.annualRainfallMm;
  const peakRainMonth = useMemo(() => {
    let maxRain = 0;
    let maxMonth = 'Jan';
    primaryData.monthlyRainfallMm.forEach((r, i) => {
      if (r > maxRain) {
        maxRain = r;
        maxMonth = CLIMATE_MONTHS[i];
      }
    });
    return { month: maxMonth, mm: maxRain };
  }, [primaryData]);

  const winterMinimum = Math.min(...tempCurve.min);
  const summerMaximum = Math.max(...tempCurve.max);
  const rainWaterCapturePer100m2 = Math.round((totalAnnualRain * 100 * 0.85) / 1000) * 1000; // 85% runoff coefficient

  return (
    <div
      className={cn(
        'rounded-3xl bg-white dark:bg-[#0A160F] border border-stone-200/90 dark:border-emerald-900/60 p-5 sm:p-7 md:p-8 flex flex-col gap-6 shadow-sm text-stone-900 dark:text-stone-100 transition-colors',
        className
      )}
    >
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200/80 dark:border-emerald-900/50">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <CloudRain size={14} />
              <span>DCCMS Meteorological Hydro-Thermal Analytics</span>
            </span>
            <span>·</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">
              12-Month Agro-Ecological Cycle
            </span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
            Rainfall &amp; Temperature Distribution ({primaryData.name})
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
            Real seasonal weather telemetry across Malawi&apos;s distinct agro-ecological zones. Evaluate rainfall onset triggers, highland cold inversion sinks, winter frost pockets, and rainwater harvesting sizing before breaking ground.
          </p>
        </div>

        {/* View Mode Segmented Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-emerald-900/60 self-start lg:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('combined')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'combined'
                ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-amber-200'
            )}
          >
            <Layers size={13} />
            <span>Combined</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('rainfall')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'rainfall'
                ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-amber-200'
            )}
          >
            <CloudRain size={13} />
            <span>Precipitation (mm)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('temperature')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'temperature'
                ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-emerald-900 dark:hover:text-amber-200'
            )}
          >
            <Thermometer size={13} />
            <span>Thermal Curve (°C)</span>
          </button>
        </div>
      </div>

      {/* Regional Selector Pills */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-stone-600 dark:text-stone-300">
          <span>Select Agro-Ecological Region / District:</span>
          <span className="text-caption text-emerald-800 dark:text-amber-300">
            {primaryData.elevationRangeMeters} · {primaryData.region} Malawi
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {AVAILABLE_REGIONS.map((reg) => {
            const active = selectedDistrictId === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleSelectDistrict(reg.id)}
                className={cn(
                  'p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between gap-1 shadow-2xs cursor-pointer',
                  active
                    ? 'bg-emerald-900 dark:bg-emerald-800/90 text-white border-emerald-950 dark:border-emerald-600 ring-2 ring-emerald-700/40'
                    : 'bg-stone-50 dark:bg-[#0E1E14] text-stone-800 dark:text-stone-200 border-stone-200/90 dark:border-emerald-900/50 hover:border-emerald-600/60'
                )}
              >
                <div className="text-xs font-bold leading-tight truncate">{reg.name}</div>
                <div className="flex items-center justify-between text-caption font-mono opacity-85">
                  <span>{reg.elevation}</span>
                  <span className={cn('text-caption font-bold px-1 rounded', active ? 'bg-amber-400 text-stone-950' : 'text-stone-500 dark:text-amber-300/90')}>
                    {reg.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0F2217] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-1 shadow-2xs">
          <span className="text-caption font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <CloudRain size={12} className="text-emerald-700 dark:text-emerald-400" />
            <span>Annual Rainfall</span>
          </span>
          <div className="text-2xl font-black text-emerald-950 dark:text-amber-300 tabular-nums my-0.5">
            {totalAnnualRain.toLocaleString()} <span className="text-xs font-normal text-stone-500 dark:text-stone-400">mm/yr</span>
          </div>
          <span className="text-caption text-stone-600 dark:text-stone-300 font-medium">
            Wet Season: {primaryData.wetSeasonMonths}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0F2217] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-1 shadow-2xs">
          <span className="text-caption font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <TrendingUp size={12} className="text-cyan-700 dark:text-cyan-400" />
            <span>Peak Month</span>
          </span>
          <div className="text-2xl font-black text-cyan-900 dark:text-cyan-300 tabular-nums my-0.5">
            {peakRainMonth.month} ({peakRainMonth.mm} <span className="text-xs font-normal text-stone-500 dark:text-stone-400">mm</span>)
          </div>
          <span className="text-caption text-stone-600 dark:text-stone-300 font-medium">
            Requires contour swales &amp; silt traps
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0F2217] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-1 shadow-2xs">
          <span className="text-caption font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <Thermometer size={12} className="text-amber-700 dark:text-amber-400" />
            <span>Thermal Range &amp; Frost</span>
          </span>
          <div className="text-2xl font-black text-amber-900 dark:text-amber-300 tabular-nums my-0.5">
            {winterMinimum}°C – {summerMaximum}°C
          </div>
          <span className={cn('text-caption font-bold inline-flex items-center gap-1.5', winterMinimum <= 5 ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-400')}>
            {winterMinimum <= 5 ? (
              <>
                <AlertTriangle size={16} strokeWidth={1.75} className="shrink-0 text-amber-500" />
                <span>Ground Frost Watch (Jun–Jul)</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-emerald-500" />
                <span>100% Frost-Free All Year</span>
              </>
            )}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0F2217] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-1 shadow-2xs">
          <span className="text-caption font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <Droplets size={12} className="text-blue-700 dark:text-blue-400" />
            <span>100m² Roof Yield</span>
          </span>
          <div className="text-2xl font-black text-blue-900 dark:text-blue-300 tabular-nums my-0.5">
            {rainWaterCapturePer100m2.toLocaleString()} <span className="text-xs font-normal text-stone-500 dark:text-stone-400">Liters</span>
          </div>
          <span className="text-caption text-stone-600 dark:text-stone-300 font-medium">
            Calculated at 85% runoff efficiency
          </span>
        </div>
      </div>

      {/* Main Interactive Recharts Canvas */}
      <div className="w-full bg-[#05130A] rounded-3xl p-4 sm:p-6 border border-emerald-900/80 shadow-inner flex flex-col gap-4">
        {/* Chart Header Bar with Direct Series Labels & Honesty Badges (<= 4 series) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-200/90 pb-2 border-b border-emerald-900/60">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-3 h-3 rounded-sm bg-[#15803D] inline-block shadow-xs" />
              <span>Rainfall (mm)</span>
            </span>
            {(viewMode === 'combined' || viewMode === 'temperature') && (
              <>
                <span className="flex items-center gap-1.5 font-bold text-[#f59e0b]">
                  <span className="w-3 h-1 bg-[#C85A32] rounded-full inline-block" />
                  <span>Max Temp (°C)</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#38bdf8]">
                  <span className="w-3 h-1 bg-[#0284C7] rounded-full inline-block" />
                  <span>Min Temp (°C)</span>
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-caption text-stone-300">
            <span className="inline-block w-4 border-t-2 border-dashed border-[#FBBF24]" />
            <span className="px-2 py-0.5 rounded-control bg-amber-500/15 border border-amber-500/30 text-amber-200 font-mono text-caption">
              Honesty Badge: 25mm Modelled Sowing Trigger
            </span>
          </div>
        </div>

        {/* Recharts Composed Chart */}
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
            >
              <defs>
                {/* Rainfall Bar Gradient using Token Palette Forest Green */}
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15803D" stopOpacity={0.95} />
                  <stop offset="60%" stopColor="#166534" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#052e16" stopOpacity={0.65} />
                </linearGradient>

                {/* Dry Season Below 25mm Gradient using Token Terracotta/Amber */}
                <linearGradient id="drySeasonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C85A32" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#782A15" stopOpacity={0.6} />
                </linearGradient>

                {/* Thermal Diurnal Area Gradient */}
                <linearGradient id="thermalBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D97706" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity={0.06} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke={CHART_TOKENS.grid.stroke} strokeDasharray={CHART_TOKENS.grid.strokeDasharray} vertical={false} />

              <XAxis
                dataKey="month"
                stroke="#A7F3D0"
                fontSize={12}
                fontFamily="inherit"
                tickLine={false}
              />

              {/* Left Y-Axis: Rainfall mm (Strict 12px min) */}
              <YAxis
                yAxisId="left"
                stroke="#6EE7B7"
                fontSize={12}
                fontFamily="inherit"
                domain={[0, (dataMax: number) => Math.max(350, Math.ceil(dataMax / 50) * 50)]}
                tickFormatter={(val) => `${val}mm`}
                tickLine={false}
              />

              {/* Right Y-Axis: Temperature °C (Strict 12px min) */}
              {(viewMode === 'combined' || viewMode === 'temperature') && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#FDE68A"
                  fontSize={12}
                  fontFamily="inherit"
                  domain={[0, 45]}
                  tickFormatter={(val) => `${val}°C`}
                  tickLine={false}
                />
              )}

              {/* 25mm Planting Rain Threshold Line (Dashed for Modelled Threshold) */}
              <ReferenceLine
                yAxisId="left"
                y={25}
                stroke="#FBBF24"
                strokeDasharray="5 5"
                strokeWidth={1.75}
                label={{
                  value: '25mm Sowing Trigger',
                  fill: '#FDE047',
                  fontSize: 12,
                  fontFamily: 'inherit',
                  position: 'insideBottomRight',
                }}
              />

              {/* 5°C Frost Threshold Line */}
              {(viewMode === 'combined' || viewMode === 'temperature') && (
                <ReferenceLine
                  yAxisId="right"
                  y={5}
                  stroke="#38BDF8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: '5°C Ground Frost Risk',
                    fill: '#7DD3FC',
                    fontSize: 12,
                    fontFamily: 'inherit',
                    position: 'insideTopLeft',
                  }}
                />
              )}

              {/* Card-Styled Tooltip with Warm Shadows and Rounded-Card */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-stone-950/95 border border-stone-800 rounded-card p-4 shadow-raised text-white text-xs flex flex-col gap-2.5 max-w-xs font-sans backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-bold text-amber-300 font-mono text-sm">
                            {data.monthFull}
                          </span>
                          <span className="text-caption font-mono bg-emerald-950 px-2 py-0.5 rounded-control text-emerald-300 border border-emerald-800">
                            {data.season}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-caption font-mono">
                          <div>
                            <span className="text-stone-400 block text-caption uppercase">Rainfall:</span>
                            <span className="font-bold text-emerald-400 text-sm">{data.rainfall} mm</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-caption uppercase">Temp Range:</span>
                            <span className="font-bold text-amber-300 text-sm">{data.tempMin}°C – {data.tempMax}°C</span>
                          </div>
                        </div>

                        {data.isFrostRisk && (
                          <div className="text-caption text-amber-300 bg-amber-950/60 p-2 rounded-control border border-amber-800 flex items-center gap-1.5 font-mono">
                            <AlertTriangle size={14} className="shrink-0 text-amber-400" />
                            <span>Frost Alert: Protect seedlings &amp; mulch roots</span>
                          </div>
                        )}

                        <p className="text-caption text-stone-300 leading-snug border-t border-white/10 pt-2 font-normal">
                          <strong className="text-emerald-400 font-bold">Field Focus:</strong> {data.focus}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Rainfall Bars */}
              {(viewMode === 'combined' || viewMode === 'rainfall') && (
                <Bar
                  yAxisId="left"
                  dataKey="rainfall"
                  name="Monthly Precipitation"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={44}
                  fill="url(#rainGradient)"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rainfall < 25 ? 'url(#drySeasonGradient)' : 'url(#rainGradient)'}
                    />
                  ))}
                </Bar>
              )}

              {/* Temperature Curves */}
              {(viewMode === 'combined' || viewMode === 'temperature') && (
                <>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tempMax"
                    name="Daily Max Temp"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    dot={{ fill: '#F59E0B', r: 3.5 }}
                    activeDot={{ r: 6, fill: '#FEF08A' }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tempMin"
                    name="Nightly Min Temp"
                    stroke="#38BDF8"
                    strokeWidth={2.5}
                    dot={{ fill: '#38BDF8', r: 3.5 }}
                    activeDot={{ r: 6, fill: '#BAE6FD' }}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 12-Month Agro-Ecological Timeline Ribbon */}
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-1.5 pt-3 border-t border-emerald-900/60 text-center">
          {chartData.map((m, i) => {
            const isRainy = m.season === 'Rainy Planting';
            const isHarvest = m.season === 'Harvest & Storage';
            const isCold = m.season === 'Cold Dry Season';
            return (
              <div
                key={i}
                className={cn(
                  'p-1.5 rounded-lg border text-caption font-mono flex flex-col justify-between gap-0.5',
                  isRainy && 'bg-emerald-950/80 border-emerald-700/60 text-emerald-200',
                  isHarvest && 'bg-amber-950/60 border-amber-700/60 text-amber-200',
                  isCold && 'bg-sky-950/60 border-sky-700/60 text-sky-200',
                  m.season === 'Hot Dry Preparation' && 'bg-stone-900/80 border-stone-700/60 text-stone-300'
                )}
              >
                <div className="font-bold">{m.month}</div>
                <div className="text-caption opacity-80 tabular-nums">{m.rainfall}mm</div>
                <div className="text-caption font-bold truncate opacity-90">
                  {isRainy ? 'Monsoon' : isHarvest ? 'Harvest' : isCold ? 'Frost' : 'Hot Dry'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Agronomic Guidance Callout */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
            <ShieldCheck size={20} />
          </span>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100">
              {primaryData.name} Agricultural Verdict: {primaryData.thermalBeltZone}
            </h4>
            <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed max-w-2xl">
              {primaryData.thermalBeltAdvice}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-caption font-mono text-amber-900 dark:text-amber-300 font-bold bg-amber-200/60 dark:bg-amber-900/60 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700">
            Soil: {primaryData.soilPh}
          </span>
        </div>
      </div>
    </div>
  );
}
