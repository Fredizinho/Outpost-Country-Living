import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, BookOpen, Layers, ShieldCheck, HeartPulse, Sparkles, 
  FlaskConical, CheckCircle, HelpCircle, ChevronRight, ChevronDown, ChevronUp, Award, Flame, Sun
} from 'lucide-react';
import { SOIL_SCIENCE_KNOWLEDGE_BASE, evaluateSoilSample, SoilSampleInput, SoilEvaluationResult } from '@/data/soilScienceData';
import { cn } from '@/lib/utils';

interface AgroSoilBenchmark {
  id: string;
  name: string;
  station: string;
  district: string;
  input: SoilSampleInput;
}

const MALAWI_AGRO_SOIL_BENCHMARKS: AgroSoilBenchmark[] = [
  {
    id: 'dedza-bembeke',
    name: 'Dedza (Bembeke Latosol)',
    station: 'Bembeke Substation',
    district: 'Dedza',
    input: {
      ph: 6.2,
      organicMatterPct: 3.8,
      soilTexture: 'Deep Red Latosol (Katondo)',
      earthwormsPerSpade: 8,
      slopePct: 3,
      hasLegumesOrCoverCrop: true,
      hasVetiverHedges: true,
      usesChemicalPoisons: false
    }
  },
  {
    id: 'lilongwe-chitedze',
    name: 'Lilongwe (Chitedze Ferruginous)',
    station: 'Chitedze Research Station',
    district: 'Lilongwe',
    input: {
      ph: 5.9,
      organicMatterPct: 2.8,
      soilTexture: 'Ferruginous Sandy Clay Loam',
      earthwormsPerSpade: 5,
      slopePct: 2,
      hasLegumesOrCoverCrop: true,
      hasVetiverHedges: true,
      usesChemicalPoisons: false
    }
  },
  {
    id: 'chikwawa-kasinthula',
    name: 'Lower Shire (Kasinthula Alluvial)',
    station: 'Kasinthula Research Station',
    district: 'Chikwawa',
    input: {
      ph: 6.8,
      organicMatterPct: 1.9,
      soilTexture: 'Alluvial Vertisol',
      earthwormsPerSpade: 3,
      slopePct: 1,
      hasLegumesOrCoverCrop: false,
      hasVetiverHedges: false,
      usesChemicalPoisons: false
    }
  },
  {
    id: 'thyolo-bvumbwe',
    name: 'Shire Highlands (Bvumbwe Nitisol)',
    station: 'Bvumbwe Research Station',
    district: 'Thyolo',
    input: {
      ph: 5.6,
      organicMatterPct: 4.2,
      soilTexture: 'Humic Nitisol (Red Clay)',
      earthwormsPerSpade: 10,
      slopePct: 6,
      hasLegumesOrCoverCrop: true,
      hasVetiverHedges: true,
      usesChemicalPoisons: false
    }
  }
];

export function SoilScienceGuide() {
  const [activeTab, setActiveTab] = useState<'principles' | 'evaluator'>('principles');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>('dedza-bembeke');

  // Real Field Soil Test Input State
  const [fieldTestInput, setFieldTestInput] = useState<SoilSampleInput>(
    MALAWI_AGRO_SOIL_BENCHMARKS[0].input
  );

  const [evaluation, setEvaluation] = useState<SoilEvaluationResult>(() => evaluateSoilSample(fieldTestInput));

  const handleSelectBenchmark = (benchmark: AgroSoilBenchmark) => {
    setActiveBenchmarkId(benchmark.id);
    setFieldTestInput(benchmark.input);
    setEvaluation(evaluateSoilSample(benchmark.input));
  };

  const handleRunEvaluation = () => {
    setEvaluation(evaluateSoilSample(fieldTestInput));
  };

  const categories = ['All', 'Soil Biology & Humus', 'Soil Chemistry', 'Adventist Edenic Stewardship', 'Malawian Soil Types', 'Erosion & Conservation'];

  const filteredTopics = selectedCategory === 'All'
    ? SOIL_SCIENCE_KNOWLEDGE_BASE
    : SOIL_SCIENCE_KNOWLEDGE_BASE.filter(t => t.category === selectedCategory);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 p-6 rounded-3xl border border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-900 border border-emerald-400 text-amber-300 flex items-center justify-center shrink-0 shadow-lg">
            <Sprout size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-900 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-700">
                Soil Science & Agronomy
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                Stewardship
              </span>
            </div>
            <h3 className="serif text-2xl md:text-3xl font-bold text-white">
              Soil Guide & Field Assessment
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mt-0.5 leading-relaxed font-medium">
              Manage Katondo (Red Clay) fertility, Dambo (Wetland) moisture, and organic soil biology for high-yield harvests.
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('principles')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 min-h-[40px]",
              activeTab === 'principles'
                ? "bg-emerald-900 text-white shadow border border-emerald-700 font-extrabold"
                : "text-slate-400 hover:text-white"
            )}
          >
            <BookOpen size={16} />
            <span>Soil Principles</span>
          </button>
          <button
            onClick={() => setActiveTab('evaluator')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 min-h-[40px]",
              activeTab === 'evaluator'
                ? "bg-amber-500 text-slate-950 shadow font-black"
                : "text-slate-400 hover:text-white"
            )}
          >
            <FlaskConical size={16} />
            <span>Evaluate Soil</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Agronomy Knowledge Base */}
      {activeTab === 'principles' && (
        <div className="flex flex-col gap-6">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border min-h-[40px]",
                  selectedCategory === cat
                    ? "bg-emerald-900 text-amber-300 border-amber-400/60 shadow-md"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid - Apple Notes expandable cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;

              return (
                <motion.div
                  key={topic.id}
                  layout
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={cn(
                    "bg-slate-950/90 border rounded-3xl overflow-hidden transition-all duration-300 shadow-xl",
                    isExpanded 
                      ? "border-emerald-500/80 ring-2 ring-emerald-500/20 bg-slate-950 md:col-span-2" 
                      : "border-slate-800 hover:border-emerald-600/50"
                  )}
                >
                  {/* Summary Header */}
                  <div 
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="p-6 flex flex-col gap-3 cursor-pointer select-none"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800">
                        {topic.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Right-aligned micro badge */}
                        <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Target: {topic.optimalTarget}
                        </span>
                        <div className={cn(
                          "p-1.5 rounded-lg border transition-all duration-300 ease-in-out",
                          isExpanded 
                            ? "bg-amber-500 text-slate-950 border-amber-400" 
                            : "bg-slate-900 text-slate-400 border-slate-800"
                        )}>
                          <ChevronDown 
                            size={16} 
                            className={cn(
                              "transition-transform duration-300 ease-in-out",
                              isExpanded && "rotate-180"
                            )} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Clean Header Title */}
                    <h4 className="font-serif text-amber-200 text-lg sm:text-xl font-semibold transition-colors">
                      {topic.title}
                    </h4>

                    {!isExpanded && (
                      <p className="text-xs text-slate-400 font-medium line-clamp-2">
                        {topic.scientificPrinciple}
                      </p>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="px-6 pb-6 pt-0 border-t border-slate-800/80 flex flex-col gap-5 mt-2 overflow-hidden"
                      >
                        {/* 2-Column Concise Content Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3">
                          
                          {/* Left Column: Bulleted "Core Steps & Protocols" with bold lead-ins */}
                          <div className="lg:col-span-7 flex flex-col gap-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                                <Sparkles size={14} className="text-amber-400" />
                                Key Soil Steps
                              </span>
                              <span className="font-mono text-[10px] text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                Soil Field Guide
                              </span>
                            </div>

                            <ul className="flex flex-col gap-2.5">
                              <li className="flex items-start gap-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 text-xs">
                                <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  1
                                </span>
                                <div>
                                  <strong className="text-amber-300 font-semibold">Practical Action Step:</strong>
                                  <span className="text-slate-200 ml-1 leading-relaxed">{topic.practicalAction}</span>
                                </div>
                              </li>

                              <li className="flex items-start gap-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 text-xs">
                                <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  2
                                </span>
                                <div>
                                  <strong className="text-amber-300 font-semibold">Edenic Soil Principle:</strong>
                                  <span className="text-slate-200 ml-1 leading-relaxed">{topic.adventistPrinciple}</span>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* Right Column: "Required Equipment & Metrics" in crisp font-mono */}
                          <div className="lg:col-span-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                                <FlaskConical size={14} className="text-amber-400" />
                                Required Equipment & Metrics
                              </span>
                              <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                Benchmarks
                              </span>
                            </div>

                            <div className="flex flex-col gap-2 font-mono text-xs">
                              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                                <span className="text-[9px] uppercase text-slate-400 block mb-0.5 font-bold">Optimal Target Level</span>
                                <span className="text-emerald-300 font-bold text-[11px] block">{topic.optimalTarget}</span>
                              </div>

                              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                                <span className="text-[9px] uppercase text-slate-400 block mb-0.5 font-bold">Scientific Citations</span>
                                <span className="text-slate-300 text-[11px] block truncate">{topic.citations.join(' • ')}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Single High-Contrast Action Button */}
                        <div className="pt-2 border-t border-white/10">
                          <button
                            onClick={() => setActiveTab('evaluator')}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                          >
                            <span>[ LAUNCH MASTERCLASS GUIDE ]</span>
                            <FlaskConical size={14} className="text-slate-950" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <div 
                      onClick={() => setExpandedTopicId(topic.id)}
                      className="px-6 pb-4 pt-1 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 cursor-pointer hover:text-amber-300"
                    >
                      <span className="truncate mr-2">Action: {topic.practicalAction.slice(0, 45)}...</span>
                      <span className="text-amber-400 flex items-center gap-1 shrink-0">Inspect Science <ChevronDown size={12} /></span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Soil Health Evaluator */}
      {activeTab === 'evaluator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col gap-5">
            <div>
              <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                <FlaskConical size={20} className="text-amber-400" />
                Soil Health Diagnostic
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Enter field soil test values or select a research station benchmark:
              </p>
            </div>

            {/* Verified Research Station Benchmark Selectors */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Load Station Benchmark:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MALAWI_AGRO_SOIL_BENCHMARKS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelectBenchmark(b)}
                    className={cn(
                      "p-2.5 rounded-xl border text-left flex flex-col transition-all cursor-pointer",
                      activeBenchmarkId === b.id
                        ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm"
                        : "bg-slate-900 border-white/5 text-slate-300 hover:border-white/20 hover:bg-slate-800/80"
                    )}
                  >
                    <span className="text-xs font-bold font-mono">{b.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{b.station}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* pH Slider */}
            <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Soil pH Level (0.01M CaCl2 or Water Test):</span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-md text-xs font-black",
                  fieldTestInput.ph >= 6.0 && fieldTestInput.ph <= 6.8 ? "bg-emerald-900 text-amber-300" : "bg-amber-900 text-amber-200"
                )}>
                  pH {fieldTestInput.ph.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.5"
                max="8.5"
                step="0.1"
                value={fieldTestInput.ph}
                onChange={(e) => {
                  setActiveBenchmarkId('');
                  const ph = parseFloat(e.target.value);
                  setFieldTestInput(prev => ({ ...prev, ph }));
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                <span>Strongly Acidic (&lt;5.5)</span>
                <span>Optimal (6.0-6.8)</span>
                <span>Alkaline (&gt;7.2)</span>
              </div>
            </div>

            {/* Organic Matter % Slider */}
            <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Soil Organic Matter (Humus Target ≥ 3.5%):</span>
                <span className="bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-md text-xs font-black border border-emerald-800">
                  {fieldTestInput.organicMatterPct.toFixed(1)}% SOM
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={fieldTestInput.organicMatterPct}
                onChange={(e) => {
                  setActiveBenchmarkId('');
                  const organicMatterPct = parseFloat(e.target.value);
                  setFieldTestInput(prev => ({ ...prev, organicMatterPct }));
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Earthworm Count */}
            <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Earthworms per 30cm Spade Sample:</span>
                <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md text-xs font-black border border-amber-500/30">
                  {fieldTestInput.earthwormsPerSpade} Worms
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={fieldTestInput.earthwormsPerSpade}
                onChange={(e) => {
                  setActiveBenchmarkId('');
                  const earthwormsPerSpade = parseInt(e.target.value);
                  setFieldTestInput(prev => ({ ...prev, earthwormsPerSpade }));
                }}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slope % */}
            <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Terrain Slope Angle (%):</span>
                <span className="bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-md text-xs font-black">
                  {fieldTestInput.slopePct}% Slope
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={fieldTestInput.slopePct}
                onChange={(e) => {
                  setActiveBenchmarkId('');
                  const slopePct = parseInt(e.target.value);
                  setFieldTestInput(prev => ({ ...prev, slopePct }));
                }}
                className="w-full accent-slate-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Organic Toggles */}
            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-semibold cursor-pointer">
                <span>Integrated Legumes & Cover Cropping (Velvet Bean/Soya)?</span>
                <input
                  type="checkbox"
                  checked={fieldTestInput.hasLegumesOrCoverCrop}
                  onChange={(e) => {
                    setActiveBenchmarkId('');
                    setFieldTestInput(prev => ({ ...prev, hasLegumesOrCoverCrop: e.target.checked }));
                  }}
                  className="w-5 h-5 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-semibold cursor-pointer">
                <span>Vetiver Grass Hedges Along Contours?</span>
                <input
                  type="checkbox"
                  checked={fieldTestInput.hasVetiverHedges}
                  onChange={(e) => {
                    setActiveBenchmarkId('');
                    setFieldTestInput(prev => ({ ...prev, hasVetiverHedges: e.target.checked }));
                  }}
                  className="w-5 h-5 accent-emerald-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-semibold cursor-pointer">
                <span className="text-rose-300">History of Synthetic Herbicide/Chemical Burn?</span>
                <input
                  type="checkbox"
                  checked={fieldTestInput.usesChemicalPoisons}
                  onChange={(e) => {
                    setActiveBenchmarkId('');
                    setFieldTestInput(prev => ({ ...prev, usesChemicalPoisons: e.target.checked }));
                  }}
                  className="w-5 h-5 accent-rose-500 rounded"
                />
              </label>
            </div>

            <button
              onClick={handleRunEvaluation}
              className="mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all min-h-[48px] cursor-pointer"
            >
              <FlaskConical size={18} />
              <span>Calculate Soil Health</span>
            </button>
          </div>

          {/* Diagnosis & Recommendations Column */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Score & Grade Box */}
            <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-amber-950 p-6 rounded-3xl border border-emerald-500/40 shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                    Soil Health Rating
                  </span>
                  <h3 className="serif text-3xl font-bold text-white mt-1">
                    {evaluation.edenicGrade}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="serif text-4xl font-black text-amber-400">
                    {evaluation.fertilityScore}
                    <span className="text-xl text-slate-400 font-sans">/100</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Stewardship Score
                  </span>
                </div>
              </div>

              {/* Status Badges */}
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-medium">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">pH Status & Reaction:</span>
                  {evaluation.phStatus}
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-medium">
                  <span className="text-amber-400 font-bold block text-[10px] uppercase">Humus & Biology Rating:</span>
                  {evaluation.humusStatus}
                </div>
              </div>
            </div>

            {/* pH Amendment Recommendation */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col gap-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FlaskConical size={16} /> Soil pH Balancing Guide
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {evaluation.phAmendmentRecommendation}
              </p>
            </div>

            {/* Soil Organic Action Plan */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col gap-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sprout size={16} /> Natural Soil Building Steps
              </h5>
              <ul className="flex flex-col gap-2 text-xs text-slate-300 font-medium">
                {evaluation.organicActionPlan.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adventist Counsel */}
            <div className="bg-amber-950/20 p-5 rounded-3xl border border-amber-500/30 text-xs text-amber-200 italic font-serif leading-relaxed">
              {evaluation.adventistStewardshipCounsel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
