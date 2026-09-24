import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, AlertTriangle, Droplets, Sprout, 
  Trees, VolumeX, HeartHandshake, ShieldCheck, 
  HelpCircle, BookOpen, RotateCcw, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CriteriaItem {
  id: string;
  name: string;
  weight: number; // percentage
  icon: React.ElementType;
  egwCitation: string;
  counselText: string;
  question: string;
  options: {
    label: string;
    points: number; // 0 to 10
    explanation: string;
  }[];
}

const EGW_PROPERTY_CRITERIA: CriteriaItem[] = [
  {
    id: 'fruit-garden',
    name: 'Fruit & Vegetable Gardening Potential',
    weight: 25,
    icon: Sprout,
    egwCitation: 'Country Living, p. 18 & 24',
    counselText: 'Get as suitable a place as your means will allow, where you can have a garden and cultivate the land to raise your own fruit and vegetables.',
    question: 'What is the topsoil depth, natural drainage, and organic matter of the parcel?',
    options: [
      { label: 'Deep, rich topsoil (> 40cm), well-drained, untouched by heavy chemicals', points: 10, explanation: 'Ideal for establishing immediate organic food forests and vegetable beds.' },
      { label: 'Moderate topsoil (20–40cm), gentle slope, some compost required', points: 8, explanation: 'Good foundation; requires grass mulching and cover cropping.' },
      { label: 'Shallow or compacted clay (< 20cm), rocks or poor drainage', points: 4, explanation: 'Requires substantial soil building, contour swales, and compost.' },
      { label: 'Barren rocky hardpan or waterlogged swamp', points: 1, explanation: 'Extremely difficult to establish productive edible gardens.' }
    ]
  },
  {
    id: 'clean-water',
    name: 'Clean, Abundant & Gravity Water Source',
    weight: 25,
    icon: Droplets,
    egwCitation: 'Ministry of Healing, p. 274',
    counselText: 'The healthfulness of the water supply is of the highest importance to the physical welfare of the family. Seek pure living water.',
    question: 'How reliable, pure, and accessible is the water supply at the peak of the dry season (October)?',
    options: [
      { label: 'Perennial flowing mountain spring or clean stream with natural gravity head', points: 10, explanation: 'The gold standard—pure drinking water with unpowered gravity irrigation.' },
      { label: 'Reliable shallow groundwater (< 15m) or certified productive borehole', points: 8, explanation: 'Dependable year-round water; requires a modest solar pump system.' },
      { label: 'Seasonal stream or deep borehole requiring expensive drilling (> 50m)', points: 5, explanation: 'Requires significant capital investment or large rainwater tanks.' },
      { label: 'No water on parcel; dependent on distant shared village hand-pump', points: 2, explanation: 'High vulnerability during droughts and intensive garden operations.' }
    ]
  },
  {
    id: 'city-distance',
    name: 'Distance from City Noise, Strife & Vice',
    weight: 20,
    icon: VolumeX,
    egwCitation: 'Country Living, p. 6 & 14',
    counselText: 'The noise and bustle of the city, the cramped and artificial life, are a weariness and trial. The quiet and beauty of nature bring rest and healing.',
    question: 'How secluded is the land from commercial noise, industrial fumes, and moral hazards?',
    options: [
      { label: 'Quiet countryside buffer (> 20km from major city, quiet rural valley)', points: 10, explanation: 'Complete peace, fresh air, and moral shelter for children and the sick.' },
      { label: 'Semi-rural outskirts (10–20km from town, light traffic)', points: 7, explanation: 'Good balance of rural quiet while maintaining easy transit.' },
      { label: 'Peri-urban development zone with expanding housing and noisy bars nearby', points: 3, explanation: 'Risk of future city encroachment, noise, and moral distractions.' },
      { label: 'Near industrial corridor, main commercial truck highway, or city limits', points: 0, explanation: 'Directly violates the counsel to flee city turmoil and pollution.' }
    ]
  },
  {
    id: 'family-labor',
    name: 'Room for Family Labor & Useful Education',
    weight: 15,
    icon: Trees,
    egwCitation: 'Counsels to Parents, Teachers, and Students, p. 186',
    counselText: 'In connection with the home, there should be land for cultivation, where children can be taught useful manual trades and learn from nature.',
    question: 'Does the acreage allow space for children’s garden plots, an orchard, and animal pens?',
    options: [
      { label: 'Generous acreage (2 to 5+ hectares) with diverse terrain', points: 10, explanation: 'Abundant room for family trades, orchard, school garden, and privacy buffer.' },
      { label: 'Adequate land (0.5 to 2 hectares) for a family food forest and dwelling', points: 8, explanation: 'Sufficient space for intensive homesteading and children’s chore training.' },
      { label: 'Small plot (0.1 to 0.5 hectare) with limited room for orchards or buffer', points: 4, explanation: 'Crowded; limits the scope of outdoor education and livestock.' },
      { label: 'Tiny residential plot (< 0.1 hectare)', points: 1, explanation: 'Insufficient for real country self-reliance or useful manual labor.' }
    ]
  },
  {
    id: 'outpost-ministry',
    name: 'Access for Outpost Ministry to Surrounding Souls',
    weight: 15,
    icon: HeartHandshake,
    egwCitation: 'Selected Messages, Book 2, p. 358',
    counselText: 'In the country, families should be established to be outposts from which to work the cities with truth and health ministry.',
    question: 'Is the property accessible enough to minister to towns or rural villages without being absorbed by them?',
    options: [
      { label: 'Accessible by all-weather road; 30–60 min from cities and close to local villages', points: 10, explanation: 'Ideal outpost position—a safe retreat that can easily launch missionary efforts.' },
      { label: 'Good dry season road; somewhat isolated during peak heavy rains', points: 7, explanation: 'Feasible with seasonal planning and local village health ministry.' },
      { label: 'Extreme isolation; inaccessible to ambulances, visitors, or produce transport', points: 4, explanation: 'Impairs ministry outreach and emergency care for sick patients.' },
      { label: 'Completely cut off with no right-of-way or access road', points: 1, explanation: 'Will cause severe isolation and hinder the outpost mission.' }
    ]
  }
];

export function PropertySuitabilityCalculator({ className }: { className?: string }) {
  // Store selected option index for each criteria
  const [selections, setSelections] = useState<Record<string, number>>({
    'fruit-garden': 0,
    'clean-water': 0,
    'city-distance': 0,
    'family-labor': 0,
    'outpost-ministry': 0
  });

  const handleSelect = (criteriaId: string, optionIndex: number) => {
    setSelections(prev => ({
      ...prev,
      [criteriaId]: optionIndex
    }));
  };

  const handleReset = () => {
    setSelections({
      'fruit-garden': 0,
      'clean-water': 0,
      'city-distance': 0,
      'family-labor': 0,
      'outpost-ministry': 0
    });
  };

  // Calculate composite score (0 to 100)
  const totalScore = useMemo(() => {
    let score = 0;
    EGW_PROPERTY_CRITERIA.forEach((criteria) => {
      const selectedIndex = selections[criteria.id] ?? 0;
      const points = criteria.options[selectedIndex]?.points ?? 0; // 0 to 10
      // weight is 0 to 100, points is 0 to 10
      score += (points / 10) * criteria.weight;
    });
    return Math.round(score);
  }, [selections]);

  // Verdict analysis
  const verdict = useMemo(() => {
    if (totalScore >= 88) {
      return {
        badge: 'Exceptional Outpost Sanctuary',
        colorClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
        summary: 'This parcel closely aligns with Ellen White’s inspired counsels. It possesses water security, soil vitality, peace for character growth, and a strong foundation for an outpost center.',
        recommendation: 'Proceed prayerfully. Verify customary boundary tenure with the local village headman and test water purity before finalizing.'
      };
    } else if (totalScore >= 70) {
      return {
        badge: 'Favorable Outpost Potential (Targeted Work Required)',
        colorClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700',
        summary: 'A viable country property with good potential, though one or two areas (such as water storage or soil building) will require dedicated labor and capital.',
        recommendation: 'Prioritize water harvesting, compost preparation, and living boundary fences early in your development plan.'
      };
    } else if (totalScore >= 50) {
      return {
        badge: 'Marginal Suitability (High Challenges)',
        colorClass: 'bg-orange-50 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-700',
        summary: 'The parcel suffers from significant drawbacks—either lack of water security, poor soil, proximity to urban vices, or extreme isolation.',
        recommendation: 'Carefully calculate whether the financial cost and labor required to overcome these hurdles would deplete resources meant for the family and ministry.'
      };
    } else {
      return {
        badge: 'Unsuitable for Country Outpost',
        colorClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700',
        summary: 'This location conflicts with core Spirit of Prophecy country living principles. It lacks fundamental survival and health essentials.',
        recommendation: 'Continue seeking. The Lord will open the way to a more suitable location as you prayerfully wait upon Him.'
      };
    }
  }, [totalScore]);

  return (
    <section 
      id="property-suitability-calculator"
      aria-label="Ellen White Property Suitability Score Calculator"
      className={cn("rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8 text-stone-900 dark:text-stone-100 transition-colors", className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 2 Evaluation
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Grounded in Inspired Counsel</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Property Suitability Score Calculator
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Evaluate any prospective homestead parcel against Ellen White’s five cardinal criteria: 
            gardening potential, clean water, distance from city noise, room for family labor, and outpost access.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start md:self-auto text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-emerald-900/60 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Scores</span>
        </button>
      </div>

      {/* Main Score Result Card */}
      <div className="rounded-2xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/90 dark:border-emerald-900/60 p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border", verdict.colorClass)}>
              {verdict.badge}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">EGW Criteria Compliance</span>
          </div>
          <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
            Parcel Suitability Index: {totalScore} / 100
          </h3>
          <p className="text-sm text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
            {verdict.summary}
          </p>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 font-medium bg-emerald-50/90 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
            <strong>Counsel Guidance:</strong> {verdict.recommendation}
          </p>
        </div>

        {/* Circular Gauge Representation */}
        <div className="shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-800/80 dark:border-emerald-500 bg-white dark:bg-[#0E1D14] shadow-inner">
          <span className="text-3xl font-black font-mono text-stone-900 dark:text-stone-50">{totalScore}</span>
          <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">Out of 100</span>
        </div>
      </div>

      {/* Criteria Breakdown & Interactive Options */}
      <div className="flex flex-col gap-6">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>Evaluate Parcel Across the 5 Inspired Dimensions</span>
        </h3>

        <div className="flex flex-col gap-6">
          {EGW_PROPERTY_CRITERIA.map((criteria, cIndex) => {
            const Icon = criteria.icon;
            const currentSelectionIndex = selections[criteria.id] ?? 0;

            return (
              <div
                key={criteria.id}
                className="p-5 sm:p-6 rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 bg-white dark:bg-[#0E1D14] shadow-xs flex flex-col gap-4"
              >
                {/* Criteria Header & Counsel Quote */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">
                          CRITERION #{cIndex + 1} ({criteria.weight}% WEIGHT)
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                        {criteria.name}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/60 self-start">
                    {criteria.egwCitation}
                  </span>
                </div>

                {/* Ellen White Quote Banner */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200/70 dark:border-emerald-900/40 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic flex items-start gap-2.5">
                  <BookOpen size={15} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed serif">
                    "{criteria.counselText}"
                  </p>
                </div>

                {/* Question */}
                <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {criteria.question}
                </div>

                {/* Options Radio List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {criteria.options.map((opt, optIdx) => {
                    const isSelected = currentSelectionIndex === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelect(criteria.id, optIdx)}
                        className={cn(
                          "p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer",
                          isSelected
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 shadow-xs ring-2 ring-emerald-800/30"
                            : "bg-[#FAF8F5] dark:bg-[#14281D] hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-200"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={cn("text-xs sm:text-sm font-bold leading-snug", isSelected ? "text-white" : "text-stone-900 dark:text-stone-100")}>
                            {opt.label}
                          </span>
                          <span className={cn(
                            "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                            isSelected ? "bg-white/20 text-emerald-100" : "bg-stone-200 dark:bg-emerald-950/80 text-stone-700 dark:text-stone-300"
                          )}>
                            {opt.points}/10
                          </span>
                        </div>
                        <p className={cn("text-xs leading-relaxed", isSelected ? "text-emerald-200/90" : "text-stone-500 dark:text-stone-400")}>
                          {opt.explanation}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
