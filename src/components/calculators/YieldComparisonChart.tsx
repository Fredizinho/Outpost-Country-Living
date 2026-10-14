import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';
import { 
  Sprout, TrendingUp, DollarSign, Calendar, Layers, ShieldCheck, 
  Info, ArrowUpRight, Sparkles, CheckCircle2, ChevronRight, Scale,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHART_PALETTE_6, CHART_TOKENS } from '@/lib/chartTokens';

export interface CropData {
  id: string;
  name: string;
  chinyanjaName: string;
  unitLabel: string;
  tradYieldPerAcre: number; // in 50kg bags
  impYieldPerAcre: number;  // in 50kg bags
  pricePerBagMwk: number;
  tradCostPerAcreUsd: number;
  impCostPerAcreUsd: number;
  keyImprovements: string[];
  tradPractice: string;
  impPractice: string;
  waterRetentionGain: number; // percentage
  droughtResistanceScore: number; // 1-10
}

export const CROPS_DATABASE: CropData[] = [
  {
    id: 'maize',
    name: 'Maize (Staple Grain)',
    chinyanjaName: 'Chimanga (Sasakawa Method)',
    unitLabel: '50kg Bags',
    tradYieldPerAcre: 12,
    impYieldPerAcre: 32,
    pricePerBagMwk: 38000,
    tradCostPerAcreUsd: 70,
    impCostPerAcreUsd: 110,
    tradPractice: 'Monocropping, 90x75cm spacing (3-4 seeds per hill), synthetic fertilizer only, zero mulching.',
    impPractice: 'Sasakawa 75x25cm spacing (1 seed per hill), compost/bokashi pits, legume intercropping, mulching swales.',
    keyImprovements: [
      'Sasakawa precision spacing (44,444 plants/acre vs 17,777)',
      'Pit planting (Zaï pits) to harvest rainwater',
      'Compost incorporation reduces fertilizer burning',
      'Pigeon pea interplanting for natural nitrogen fixation'
    ],
    waterRetentionGain: 140,
    droughtResistanceScore: 9
  },
  {
    id: 'soybeans',
    name: 'Soybeans & Legumes',
    chinyanjaName: 'Soya & Nyemba',
    unitLabel: '50kg Bags',
    tradYieldPerAcre: 8,
    impYieldPerAcre: 22,
    pricePerBagMwk: 45000,
    tradCostPerAcreUsd: 50,
    impCostPerAcreUsd: 80,
    tradPractice: 'Random broadcasting, uninoculated seed, late planting without ridge mulching.',
    impPractice: 'Rhizobium inoculant treatment, double-row ridge planting, bio-char & organic manure.',
    keyImprovements: [
      'Rhizobium inoculation doubles root nodule formation',
      'Ridge mulching retains soil moisture during dry spells',
      'Optimal plant density (100,000+ plants/acre)',
      'Fixes up to 60kg N/acre for subsequent maize crop'
    ],
    waterRetentionGain: 110,
    droughtResistanceScore: 8
  },
  {
    id: 'potatoes',
    name: 'Highland Irish Potatoes',
    chinyanjaName: "Apoteto a M'Mawoko (Dedza/Ntcheu)",
    unitLabel: '50kg Bags',
    tradYieldPerAcre: 40,
    impYieldPerAcre: 110,
    pricePerBagMwk: 30000,
    tradCostPerAcreUsd: 140,
    impCostPerAcreUsd: 240,
    tradPractice: 'Degraded farm-saved seed tubers, shallow ridges, no late blight organic management.',
    impPractice: 'Certified disease-free seed tubers, deep compost beds, copper/botanical sprays, straw mulching.',
    keyImprovements: [
      'Clean seed tubers eliminate bacterial wilt propagation',
      'Deep raised organic beds double tuber expansion volume',
      'Heavy straw mulching keeps soil temperature cool in highlands',
      'Drip irrigation integration during dry months'
    ],
    waterRetentionGain: 160,
    droughtResistanceScore: 8.5
  },
  {
    id: 'groundnuts',
    name: 'Groundnuts (CG7 / Nsinjiro)',
    chinyanjaName: "Mtedza wa M'Munda",
    unitLabel: '50kg Bags',
    tradYieldPerAcre: 10,
    impYieldPerAcre: 26,
    pricePerBagMwk: 48000,
    tradCostPerAcreUsd: 55,
    impCostPerAcreUsd: 85,
    tradPractice: 'Wide ridge spacing, late harvesting leading to aflatoxin, untreated seed.',
    impPractice: 'Close double-line spacing (10cm between seeds), gypsum application for pod filling, timely drying on tarps.',
    keyImprovements: [
      'Gypsum (calcium) application eliminates empty pops',
      'High density planting smothers weeds naturally',
      'Improved CG7 & Nsinjiro seed varieties',
      'Proper post-harvest tarp drying prevents dangerous aflatoxins'
    ],
    waterRetentionGain: 125,
    droughtResistanceScore: 9
  },
  {
    id: 'sweetpotatoes',
    name: 'Orange-Fleshed Sweet Potatoes',
    chinyanjaName: 'Kanthomba / Mfumu',
    unitLabel: '50kg Bags',
    tradYieldPerAcre: 35,
    impYieldPerAcre: 85,
    pricePerBagMwk: 22000,
    tradCostPerAcreUsd: 40,
    impCostPerAcreUsd: 65,
    tradPractice: 'Random vine cuttings, flat ground planting, zero organic soil conditioning.',
    impPractice: 'High-ridge or mound planting with compost, clean disease-free vine cuttings, soil moisture swales.',
    keyImprovements: [
      'High Pro-Vitamin A beta-carotene biofortified varieties',
      'Deep loose mound aeration for jumbo tuber development',
      'Minimal fertilizer requirement — thrives on compost',
      'Extremely high drought tolerance once established'
    ],
    waterRetentionGain: 180,
    droughtResistanceScore: 9.5
  }
];

export function YieldComparisonChart() {
  const [selectedCropId, setSelectedCropId] = useState<string>('maize');
  const [acres, setAcres] = useState<number>(2.0);
  const [chartView, setChartView] = useState<'yield' | 'revenue' | 'trajectory' | 'radar'>('yield');
  const [currency, setCurrency] = useState<'USD' | 'MWK'>('MWK');
  const exchangeRate = 1750; // 1 USD ~ 1,750 MWK

  const currentCrop = CROPS_DATABASE.find(c => c.id === selectedCropId) || CROPS_DATABASE[0];

  // Calculations
  const tradTotalBags = Math.round(currentCrop.tradYieldPerAcre * acres);
  const impTotalBags = Math.round(currentCrop.impYieldPerAcre * acres);
  const bagGain = impTotalBags - tradTotalBags;
  const percentageGain = Math.round(((impTotalBags - tradTotalBags) / tradTotalBags) * 100);

  // Revenue math
  const tradRevenueMwk = tradTotalBags * currentCrop.pricePerBagMwk;
  const impRevenueMwk = impTotalBags * currentCrop.pricePerBagMwk;
  const revenueGainMwk = impRevenueMwk - tradRevenueMwk;

  const tradCostMwk = currentCrop.tradCostPerAcreUsd * acres * exchangeRate;
  const impCostMwk = currentCrop.impCostPerAcreUsd * acres * exchangeRate;

  const tradNetProfitMwk = tradRevenueMwk - tradCostMwk;
  const impNetProfitMwk = impRevenueMwk - impCostMwk;
  const netProfitGainMwk = impNetProfitMwk - tradNetProfitMwk;

  // Formatting helpers
  const formatMoney = (valMwk: number) => {
    if (currency === 'USD') {
      const valUsd = Math.round(valMwk / exchangeRate);
      return `$${valUsd.toLocaleString()}`;
    }
    return `K${Math.round(valMwk).toLocaleString()}`;
  };

  // Recharts Data 1: Single Crop Yield & Profit Bar Chart Data
  const singleCropBarData = [
    {
      method: 'Traditional Method',
      yieldBags: tradTotalBags,
      yieldKg: tradTotalBags * 50,
      revenue: currency === 'USD' ? Math.round(tradRevenueMwk / exchangeRate) : tradRevenueMwk,
      cost: currency === 'USD' ? Math.round(tradCostMwk / exchangeRate) : tradCostMwk,
      netProfit: currency === 'USD' ? Math.round(tradNetProfitMwk / exchangeRate) : tradNetProfitMwk,
      color: CHART_PALETTE_6[1] // Katondo Terracotta
    },
    {
      method: 'Improved / Regenerative',
      yieldBags: impTotalBags,
      yieldKg: impTotalBags * 50,
      revenue: currency === 'USD' ? Math.round(impRevenueMwk / exchangeRate) : impRevenueMwk,
      cost: currency === 'USD' ? Math.round(impCostMwk / exchangeRate) : impCostMwk,
      netProfit: currency === 'USD' ? Math.round(impNetProfitMwk / exchangeRate) : impNetProfitMwk,
      color: CHART_PALETTE_6[0] // Forest Green
    }
  ];

  // Recharts Data 2: Multi-Crop Portfolio Overview Data
  const multiCropPortfolioData = CROPS_DATABASE.map(crop => {
    const tBags = Math.round(crop.tradYieldPerAcre * acres);
    const iBags = Math.round(crop.impYieldPerAcre * acres);
    return {
      name: crop.name.split(' ')[0],
      fullName: crop.name,
      Traditional: tBags,
      Improved: iBags,
      GainPercent: Math.round(((iBags - tBags) / tBags) * 100)
    };
  });

  // Recharts Data 3: 5-Year Soil Regeneration Yield Trajectory Data
  // Traditional degrades over time without organic matter; Improved compounds as humus & living microbes build up.
  const trajectoryData = [
    {
      year: 'Year 1',
      Traditional: Math.round(currentCrop.tradYieldPerAcre * acres * 1.0),
      Improved: Math.round(currentCrop.impYieldPerAcre * acres * 0.85),
      note: 'Initial soil transition & bed prep'
    },
    {
      year: 'Year 2',
      Traditional: Math.round(currentCrop.tradYieldPerAcre * acres * 0.95),
      Improved: Math.round(currentCrop.impYieldPerAcre * acres * 1.0),
      note: 'Compost humus & leguminous nitrogen kicks in'
    },
    {
      year: 'Year 3',
      Traditional: Math.round(currentCrop.tradYieldPerAcre * acres * 0.90),
      Improved: Math.round(currentCrop.impYieldPerAcre * acres * 1.15),
      note: 'Swale moisture bank protects against dry spell'
    },
    {
      year: 'Year 4',
      Traditional: Math.round(currentCrop.tradYieldPerAcre * acres * 0.88),
      Improved: Math.round(currentCrop.impYieldPerAcre * acres * 1.30),
      note: 'Mature soil food web & deep mulching'
    },
    {
      year: 'Year 5',
      Traditional: Math.round(currentCrop.tradYieldPerAcre * acres * 0.82),
      Improved: Math.round(currentCrop.impYieldPerAcre * acres * 1.42),
      note: 'Self-sustaining regenerative ecosystem peak'
    }
  ];

  // Recharts Data 4: Radar Chart for Multi-Attribute Sustainability
  const radarData = [
    { subject: 'Yield Output', Traditional: 35, Improved: 95, fullMark: 100 },
    { subject: 'Water Efficiency', Traditional: 30, Improved: 90, fullMark: 100 },
    { subject: 'Drought Survival', Traditional: 25, Improved: 92, fullMark: 100 },
    { subject: 'Soil Organic Carbon', Traditional: 20, Improved: 88, fullMark: 100 },
    { subject: 'ROI % Margin', Traditional: 40, Improved: 85, fullMark: 100 },
    { subject: 'Climate Resilience', Traditional: 20, Improved: 95, fullMark: 100 },
  ];

  // Custom Recharts Tooltip Component styled like a card with warm tones
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-950/95 text-stone-100 p-4 rounded-card shadow-raised border border-stone-800 text-xs font-sans max-w-xs backdrop-blur-md">
          <p className="font-bold text-amber-300 font-mono mb-1.5 pb-1 border-b border-white/10 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-stone-300 font-medium truncate">{entry.name || entry.dataKey}:</span>
              </div>
              <span className="font-bold font-mono text-white shrink-0">
                {typeof entry.value === 'number' && entry.dataKey && entry.dataKey.toLowerCase().includes('revenue')
                  ? formatMoney(entry.value)
                  : typeof entry.value === 'number'
                  ? entry.value.toLocaleString()
                  : entry.value} {chartView === 'yield' ? currentCrop.unitLabel : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 md:p-10 rounded-[3rem] border border-white/80 shadow-xl flex flex-col gap-8">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-caption font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200">
              Interactive Agronomic Visualization
            </span>
            <span className="text-xs text-slate-500 font-bold">Malawi Homestead Yield Simulator</span>
          </div>
          <h3 className="serif text-3xl font-bold text-emerald-950 mt-1 flex items-center gap-2">
            <Sprout className="text-emerald-700" size={28} /> Crop Yield & Regenerative Comparison
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1 max-w-xl">
            Compare expected harvest yields, net income, and long-term soil buildup between conventional monoculture farming and high-yield regenerative practices.
          </p>
        </div>

        {/* Currency & Acreage Selectors */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-600">Land Area:</span>
            <input
              type="number"
              min={0.25}
              max={50}
              step={0.25}
              value={acres}
              onChange={(e) => setAcres(Math.max(0.25, Number(e.target.value)))}
              className="w-16 bg-slate-100 text-emerald-950 font-black text-sm px-2 py-1 rounded-xl text-center focus:outline-none focus:ring-2 ring-emerald-600"
            />
            <span className="text-xs font-bold text-slate-800">Acres</span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setCurrency('MWK')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-black transition-all",
                currency === 'MWK' ? "bg-emerald-900 text-white shadow-sm" : "text-slate-600 hover:text-emerald-950"
              )}
            >
              MWK (K)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-black transition-all",
                currency === 'USD' ? "bg-emerald-900 text-white shadow-sm" : "text-slate-600 hover:text-emerald-950"
              )}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* Crop Selector Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-caption font-black uppercase text-slate-500 tracking-wider">
          Select Crop Profile:
        </span>
        <div className="flex flex-wrap gap-2">
          {CROPS_DATABASE.map((crop) => {
            const isSelected = crop.id === selectedCropId;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={cn(
                  "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm active:scale-95",
                  isSelected
                    ? "bg-emerald-900 text-white border-emerald-800 ring-2 ring-emerald-500/40 shadow-lg"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-950"
                )}
              >
                <Sprout size={15} className={isSelected ? "text-amber-400" : "text-emerald-700"} />
                <div className="flex flex-col text-left">
                  <span className="font-extrabold leading-tight">{crop.name}</span>
                  <span className={cn("text-caption font-medium", isSelected ? "text-emerald-200" : "text-slate-400")}>
                    {crop.chinyanjaName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-emerald-950 text-white p-5 rounded-3xl border border-emerald-900 shadow-lg flex flex-col justify-between">
          <span className="text-caption font-black uppercase tracking-widest text-emerald-400">
            Traditional Harvest ({acres} Acres)
          </span>
          <div className="my-2">
            <span className="serif text-3xl font-extrabold text-slate-200">
              {tradTotalBags}
            </span>
            <span className="text-xs text-emerald-300 font-bold ml-2">50kg Bags</span>
          </div>
          <span className="text-caption text-slate-400 font-medium">
            ~{(tradTotalBags * 0.05).toFixed(1)} Metric Tonnes
          </span>
        </div>

        <div className="bg-emerald-900 text-white p-5 rounded-3xl border border-emerald-700 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-700/40 rounded-full blur-xl" />
          <span className="text-caption font-black uppercase tracking-widest text-amber-300">
            Improved / Sasakawa Yield
          </span>
          <div className="my-2">
            <span className="serif text-3xl font-extrabold text-amber-300">
              {impTotalBags}
            </span>
            <span className="text-xs text-emerald-200 font-bold ml-2">50kg Bags</span>
          </div>
          <span className="text-caption text-emerald-200 font-bold flex items-center gap-1">
            <TrendingUp size={12} className="text-amber-400" /> +{percentageGain}% Increase (+{bagGain} Bags)
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
          <span className="text-caption font-black uppercase tracking-widest text-slate-500">
            Gross Harvest Value
          </span>
          <div className="my-2">
            <span className="serif text-2xl font-black text-emerald-950">
              {formatMoney(impRevenueMwk)}
            </span>
            <span className="text-xs text-slate-400 font-bold ml-1">Total</span>
          </div>
          <span className="text-caption text-emerald-700 font-extrabold">
            vs {formatMoney(tradRevenueMwk)} Traditional
          </span>
        </div>

        <div className="bg-amber-500/10 border border-amber-400/40 p-5 rounded-3xl shadow-md flex flex-col justify-between">
          <span className="text-caption font-black uppercase tracking-widest text-amber-800">
            Net Farmer Profit Gain
          </span>
          <div className="my-2">
            <span className="serif text-2xl font-black text-amber-950">
              +{formatMoney(netProfitGainMwk)}
            </span>
          </div>
          <span className="text-caption text-amber-900 font-bold">
            After deducting extra seeds & compost costs
          </span>
        </div>
      </div>

      {/* CHART VIEW TOGGLE BUTTONS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-2 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setChartView('yield')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
              chartView === 'yield'
                ? "bg-emerald-900 text-white shadow-md"
                : "text-slate-600 hover:text-emerald-950 hover:bg-white"
            )}
          >
            <Layers size={14} /> Yield Output Comparison
          </button>

          <button
            onClick={() => setChartView('revenue')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
              chartView === 'revenue'
                ? "bg-emerald-900 text-white shadow-md"
                : "text-slate-600 hover:text-emerald-950 hover:bg-white"
            )}
          >
            <DollarSign size={14} /> Revenue & Profit Breakdown
          </button>

          <button
            onClick={() => setChartView('trajectory')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
              chartView === 'trajectory'
                ? "bg-emerald-900 text-white shadow-md"
                : "text-slate-600 hover:text-emerald-950 hover:bg-white"
            )}
          >
            <Calendar size={14} /> 5-Year Soil Trajectory
          </button>

          <button
            onClick={() => setChartView('radar')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
              chartView === 'radar'
                ? "bg-emerald-900 text-white shadow-md"
                : "text-slate-600 hover:text-emerald-950 hover:bg-white"
            )}
          >
            <Scale size={14} /> Sustainability Radar
          </button>
        </div>

        <div className="text-caption font-bold text-slate-500 px-2">
          Visualization Mode: <span className="text-emerald-900 uppercase font-black">{chartView}</span>
        </div>
      </div>

      {/* RECHARTS CANVAS CONTAINER */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/90 shadow-inner flex flex-col gap-4">
        {/* VIEW 1: YIELD OUTPUT BAR CHART */}
        {chartView === 'yield' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-950 text-base">
                  Expected Harvest Comparison ({currentCrop.name})
                </h4>
                <p className="text-xs text-slate-500">
                  Total output calculated for {acres} acres in {currentCrop.unitLabel}
                </p>
              </div>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                +{percentageGain}% Production Boost
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={singleCropBarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 113, 108, 0.18)" vertical={false} />
                  <XAxis dataKey="method" tick={{ fill: '#0f172a', fontWeight: 'bold', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: currentCrop.unitLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#475569', fontSize: 12 } }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="yieldBags" name="Harvest Output (50kg Bags)" radius={[12, 12, 0, 0]}>
                    {singleCropBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* VIEW 2: REVENUE & PROFIT COMPARISON */}
        {chartView === 'revenue' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
              <div>
                <h4 className="font-bold text-emerald-950 text-base">
                  Financial Return &amp; Profit Margin ({currentCrop.name})
                </h4>
                <p className="text-xs text-slate-500">
                  Gross Harvest Revenue vs Inputs Cost vs Net Profit ({currency})
                </p>
              </div>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-xl border border-amber-200">
                Net Profit: +{formatMoney(netProfitGainMwk)}
              </span>
            </div>

            {/* Direct Series Labels (<= 4 series) */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-3 h-3 rounded-sm bg-[#0284c7]" /> Gross Revenue ({currency})
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-3 h-3 rounded-sm bg-[#C85A32]" /> Production Cost ({currency})
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-3 h-3 rounded-sm bg-[#15803D]" /> Net Profit ({currency})
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={singleCropBarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 113, 108, 0.18)" vertical={false} />
                  <XAxis dataKey="method" tick={{ fill: '#0f172a', fontWeight: 'bold', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name={`Gross Revenue (${currency})`} fill="#0284c7" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="cost" name={`Inputs & Production Cost (${currency})`} fill="#C85A32" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="netProfit" name={`Net Profit (${currency})`} fill="#15803D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* VIEW 3: 5-YEAR SOIL TRAJECTORY LINE CHART (MODELLED DATA WITH DASHED LINES & HONESTY BADGE) */}
        {chartView === 'trajectory' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
              <div>
                <h4 className="font-bold text-emerald-950 text-base">
                  5-Year Yield Trajectory &amp; Soil Regeneration Curve
                </h4>
                <p className="text-xs text-slate-500">
                  Conventional soil mining depletes organic matter; regenerative practices compound microbial humus over 5 years.
                </p>
              </div>
              <span className="text-caption font-mono font-bold px-2.5 py-1 rounded-control bg-amber-100 text-amber-900 border border-amber-300">
                Honesty Badge: 5-Year Modelled Projection (Dashed)
              </span>
            </div>

            {/* Direct Series Labels for Line Chart (<= 4 series) */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="w-4 border-t-2 border-solid border-[#4B5563]" /> Traditional Baseline (Degrading)
              </span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="w-4 border-t-2 border-dashed border-[#15803D]" /> Improved Regenerative (Modelled Humus Buildup)
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 113, 108, 0.18)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: '#0f172a', fontWeight: 'bold', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} label={{ value: '50kg Bags Harvested', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#475569', fontSize: 12 } }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="Traditional" 
                    name="Traditional Baseline" 
                    stroke="#4B5563" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#4B5563' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Improved" 
                    name="Improved Regenerative (Modelled)" 
                    stroke="#15803D" 
                    strokeWidth={3}
                    strokeDasharray="5 5" 
                    dot={{ r: 5, fill: '#15803D' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2 border-t border-slate-100">
              {trajectoryData.map((d, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-xl text-caption border border-slate-200/60">
                  <span className="font-extrabold text-emerald-950 block">{d.year}</span>
                  <span className="text-slate-500">{d.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: RADAR CHART FOR MULTI-ATTRIBUTE SUSTAINABILITY */}
        {chartView === 'radar' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-950 text-base">
                  Multi-Metric Sustainability Radar
                </h4>
                <p className="text-xs text-slate-500">
                  Holistic evaluation across water retention, climate resilience, and financial performance
                </p>
              </div>
            </div>

            <div className="h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(120, 113, 108, 0.25)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f172a', fontSize: 12, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#78716c" tick={{ fontSize: 12 }} />
                  <Radar name="Traditional Monoculture" dataKey="Traditional" stroke="#C85A32" fill="#C85A32" fillOpacity={0.25} />
                  <Radar name="Regenerative System" dataKey="Improved" stroke="#15803D" fill="#15803D" fillOpacity={0.45} />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* DETAILED METHODOLOGY & AGRONOMIC BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        {/* Traditional Practice Box */}
        <div className="bg-rose-50/70 p-6 rounded-3xl border border-rose-200/80 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-white text-caption font-black uppercase px-2 py-0.5 rounded-lg">
              Traditional Farming
            </span>
            <h5 className="font-bold text-rose-950 text-sm">Conventional Farming Pitfalls</h5>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {currentCrop.tradPractice}
          </p>
          <div className="mt-2 text-caption text-rose-900 bg-white/80 p-3 rounded-2xl border border-rose-200 font-semibold flex items-start gap-1.5">
            <AlertTriangle size={16} strokeWidth={1.75} className="text-rose-600 shrink-0 mt-0.5" />
            <span><strong>Soil Impact:</strong> Vulnerable to mid-season dry spells, high weed competition, rapid soil organic matter depletion, and costly annual fertilizer reliance.</span>
          </div>
        </div>

        {/* Improved Practice Box */}
        <div className="bg-emerald-50/80 p-6 rounded-3xl border border-emerald-200/80 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-800 text-amber-300 text-caption font-black uppercase px-2 py-0.5 rounded-lg">
              Regenerative Standard
            </span>
            <h5 className="font-bold text-emerald-950 text-sm">Improved Method Innovations</h5>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {currentCrop.impPractice}
          </p>
          <ul className="flex flex-col gap-1.5 mt-1">
            {currentCrop.keyImprovements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900 font-bold">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
