import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  Droplets,
  Sprout,
  Trees,
  VolumeX,
  HeartHandshake,
  HelpCircle,
  BookOpen,
  RotateCcw,
  Save,
  Trash2,
  MapPin,
  Printer,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CriteriaItem {
  id: string;
  name: string;
  shortLabel: string;
  weight: number; // percentage
  icon: React.ElementType;
  egwCitation: string;
  counselText: string;
  question: string;
  beginnerFieldTest: string;
  options: {
    label: string;
    points: number; // 0 to 10
    explanation: string;
  }[];
}

export interface SavedSuitabilityParcel {
  id: string;
  name: string;
  district: string;
  notes: string;
  selections: Record<string, number>;
  totalScore: number;
  verdictBadge: string;
  savedAt: string;
}

const ACTIVE_STORAGE_KEY = 'outpost_suitability_active_v1';
const PARCELS_STORAGE_KEY = 'outpost_suitability_parcels_v1';

const DEFAULT_SAVED_PARCELS: SavedSuitabilityParcel[] = [
  {
    id: 'sample-dedza-spring',
    name: 'Bembeke Foothill Spring Plot (4.5 Acres)',
    district: 'Dedza',
    notes: 'Perennial gravity spring 18m above house site; deep red Katondo loam; 2.2km off M1 tarmac.',
    selections: {
      'fruit-garden': 0,
      'clean-water': 0,
      'city-distance': 0,
      'family-labor': 1,
      'outpost-ministry': 0,
    },
    totalScore: 97,
    verdictBadge: 'Exceptional Outpost Sanctuary',
    savedAt: '2026-09-15',
  },
  {
    id: 'sample-ntcheu-valley',
    name: 'Tsangano / Sharpevale Stream Plot (3 Acres)',
    district: 'Ntcheu',
    notes: 'Good year-round stream; needs Vetiver contour swales and bridge reinforcement for January rains.',
    selections: {
      'fruit-garden': 1,
      'clean-water': 1,
      'city-distance': 0,
      'family-labor': 1,
      'outpost-ministry': 1,
    },
    totalScore: 83,
    verdictBadge: 'Favorable Outpost Potential',
    savedAt: '2026-09-20',
  },
];

const EGW_PROPERTY_CRITERIA: CriteriaItem[] = [
  {
    id: 'fruit-garden',
    name: 'Fruit & Vegetable Gardening Potential',
    shortLabel: 'Soil & Orchard (25%)',
    weight: 25,
    icon: Sprout,
    egwCitation: 'Country Living, p. 18 & 24',
    counselText:
      'Get as suitable a place as your means will allow, where you can have a garden and cultivate the land to raise your own fruit and vegetables.',
    question: 'What is the topsoil depth, natural drainage, and organic matter of the parcel?',
    beginnerFieldTest:
      'Dig 1 spade blade deep (30cm). Good soil is dark or rich red-brown, smells fresh, and forms a soft ball when squeezed damp. If your spade hits hard rock right away or smells sour like swamp mud, score it lower.',
    options: [
      {
        label: 'Deep, rich topsoil (> 40cm / deeper than a spade), well-drained',
        points: 10,
        explanation: 'Ideal for establishing immediate organic food forests and vegetable beds.',
      },
      {
        label: 'Moderate topsoil (20–40cm / 1 spade deep), gentle slope, needs mulch',
        points: 8,
        explanation: 'Good foundation; requires grass mulching and cover cropping.',
      },
      {
        label: 'Shallow or compacted clay (< 20cm), rocks or poor drainage',
        points: 4,
        explanation: 'Requires substantial soil building, contour swales, and compost.',
      },
      {
        label: 'Barren rocky hardpan or waterlogged swamp',
        points: 1,
        explanation: 'Extremely difficult to establish productive edible gardens.',
      },
    ],
  },
  {
    id: 'clean-water',
    name: 'Clean, Abundant & Gravity Water Source',
    shortLabel: 'Perennial Water (25%)',
    weight: 25,
    icon: Droplets,
    egwCitation: 'Ministry of Healing, p. 274',
    counselText:
      'The healthfulness of the water supply is of the highest importance to the physical welfare of the family. Seek pure living water.',
    question: 'How reliable, pure, and accessible is the water supply at the peak of the dry season (October)?',
    beginnerFieldTest:
      'Never judge water by how green the land looks in the rainy season (Jan–Mar). Ask 2–3 elderly neighbors: "Does this spring or well still have water in late October?" Look at the nearest village borehole to see how easily it pumps.',
    options: [
      {
        label: 'Perennial flowing mountain spring or clean stream higher than the house',
        points: 10,
        explanation: 'The gold standard—pure drinking water with unpowered gravity irrigation.',
      },
      {
        label: 'Reliable shallow groundwater (< 25m) or proven year-round borehole',
        points: 8,
        explanation: 'Dependable year-round water; requires a modest solar pump system.',
      },
      {
        label: 'Seasonal stream (dries in Sept/Oct) or deep borehole (> 50m)',
        points: 5,
        explanation: 'Requires significant capital investment or large rainwater tanks.',
      },
      {
        label: 'No water on parcel; dependent on distant shared village hand-pump',
        points: 2,
        explanation: 'High vulnerability during droughts and intensive garden operations.',
      },
    ],
  },
  {
    id: 'city-distance',
    name: 'Distance from City Noise, Strife & Vice',
    shortLabel: 'Rural Seclusion (20%)',
    weight: 20,
    icon: VolumeX,
    egwCitation: 'Country Living, p. 6 & 14',
    counselText:
      'The noise and bustle of the city, the cramped and artificial life, are a weariness and trial. The quiet and beauty of nature bring rest and healing.',
    question: 'How secluded is the land from commercial noise, industrial fumes, and moral hazards?',
    beginnerFieldTest:
      'Stand quietly on the plot for 2 minutes around 5:00 PM. Can you hear loud bottle-store music, highway trucks, or crowded market noise? Aim to be at least 1.5–2 km off busy trading centers.',
    options: [
      {
        label: 'Quiet countryside buffer (> 20km from major city, quiet rural valley)',
        points: 10,
        explanation: 'Complete peace, fresh air, and moral shelter for children and the sick.',
      },
      {
        label: 'Semi-rural outskirts (10–20km from town, light traffic)',
        points: 7,
        explanation: 'Good balance of rural quiet while maintaining easy transit.',
      },
      {
        label: 'Peri-urban development zone with expanding housing and noisy bars nearby',
        points: 3,
        explanation: 'Risk of future city encroachment, noise, and moral distractions.',
      },
      {
        label: 'Near industrial corridor, main commercial truck highway, or city limits',
        points: 0,
        explanation: 'Directly violates the counsel to flee city turmoil and pollution.',
      },
    ],
  },
  {
    id: 'family-labor',
    name: 'Room for Family Labor & Useful Education',
    shortLabel: 'Acreage & Labor (15%)',
    weight: 15,
    icon: Trees,
    egwCitation: 'Counsels to Parents, Teachers, and Students, p. 186',
    counselText:
      'In connection with the home, there should be land for cultivation, where children can be taught useful manual trades and learn from nature.',
    question: 'Does the acreage allow space for children’s garden plots, an orchard, and animal pens?',
    beginnerFieldTest:
      'Visualizing size: 1 Acre is about 1 standard football field (64m × 64m). A family of 4–6 needs at least 2.5 to 5 Acres (1 to 2 Hectares) to grow year-round maize, beans, vegetables, and fruit trees.',
    options: [
      {
        label: 'Generous land (5+ Acres / 2+ Hectares — 5 football fields)',
        points: 10,
        explanation: 'Abundant room for family trades, orchard, school garden, and privacy buffer.',
      },
      {
        label: 'Adequate land (1.5 to 5 Acres / 0.6 to 2 Hectares)',
        points: 8,
        explanation: 'Sufficient space for intensive homesteading and children’s chore training.',
      },
      {
        label: 'Small plot (0.5 to 1.2 Acres) with limited room for orchards',
        points: 4,
        explanation: 'Crowded; limits the scope of outdoor education and staple grain self-reliance.',
      },
      {
        label: 'Tiny city-style residential plot (< 0.25 Acre)',
        points: 1,
        explanation: 'Insufficient for real country self-reliance or useful manual labor.',
      },
    ],
  },
  {
    id: 'outpost-ministry',
    name: 'Access for Outpost Ministry to Surrounding Souls',
    shortLabel: 'Outpost Access (15%)',
    weight: 15,
    icon: HeartHandshake,
    egwCitation: 'Selected Messages, Book 2, p. 358',
    counselText:
      'In the country, families should be established to be outposts from which to work the cities with truth and health ministry.',
    question: 'Is the property accessible enough to minister to towns or rural villages without being absorbed by them?',
    beginnerFieldTest:
      'Check the dirt access road and bridges. Sticky black clay roads or unbridged streams can trap vehicles during January storms. Ask locals: "Can a small car or ambulance reach here in February?"',
    options: [
      {
        label: 'Accessible by all-weather gravel/earth road; 30–60 min from town',
        points: 10,
        explanation: 'Ideal outpost position—a safe retreat that can easily launch missionary efforts.',
      },
      {
        label: 'Good dry season road; needs careful driving during peak heavy rains',
        points: 7,
        explanation: 'Feasible with seasonal planning and local village health ministry.',
      },
      {
        label: 'Extreme isolation; inaccessible to vehicles or visitors in rainy season',
        points: 4,
        explanation: 'Impairs ministry outreach and emergency care for sick patients.',
      },
      {
        label: 'Completely cut off with no legal right-of-way or footpath only',
        points: 1,
        explanation: 'Will cause severe isolation and hinder the outpost mission.',
      },
    ],
  },
];

function computeScoreFromSelections(selections: Record<string, number>): number {
  let score = 0;
  EGW_PROPERTY_CRITERIA.forEach((criteria) => {
    const selectedIndex = selections[criteria.id] ?? 0;
    const points = criteria.options[selectedIndex]?.points ?? 0;
    score += (points / 10) * criteria.weight;
  });
  return Math.round(score);
}

export function PropertySuitabilityCalculator({ className }: { className?: string }) {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(ACTIVE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {
      // ignore
    }
    return {
      'fruit-garden': 0,
      'clean-water': 0,
      'city-distance': 0,
      'family-labor': 0,
      'outpost-ministry': 0,
    };
  });

  const [savedParcels, setSavedParcels] = useState<SavedSuitabilityParcel[]>(() => {
    try {
      const raw = localStorage.getItem(PARCELS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_SAVED_PARCELS;
  });

  const [parcelName, setParcelName] = useState('');
  const [parcelDistrict, setParcelDistrict] = useState('Dedza');
  const [parcelNotes, setParcelNotes] = useState('');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(selections));
    } catch {
      // ignore
    }
  }, [selections]);

  useEffect(() => {
    try {
      localStorage.setItem(PARCELS_STORAGE_KEY, JSON.stringify(savedParcels));
    } catch {
      // ignore
    }
  }, [savedParcels]);

  const handleSelect = (criteriaId: string, optionIndex: number) => {
    setSelections((prev) => ({
      ...prev,
      [criteriaId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelections({
      'fruit-garden': 0,
      'clean-water': 0,
      'city-distance': 0,
      'family-labor': 0,
      'outpost-ministry': 0,
    });
  };

  const totalScore = useMemo(() => computeScoreFromSelections(selections), [selections]);

  const verdict = useMemo(() => {
    if (totalScore >= 88) {
      return {
        badge: 'Exceptional Outpost Sanctuary',
        colorClass:
          'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
        summary:
          'This parcel closely aligns with Ellen White’s inspired counsels. It possesses water security, soil vitality, peace for character growth, and a strong foundation for an outpost center.',
        recommendation:
          'Proceed prayerfully. Verify customary boundary tenure with the local village headman and test water purity before finalizing.',
      };
    } else if (totalScore >= 70) {
      return {
        badge: 'Favorable Outpost Potential',
        colorClass:
          'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700',
        summary:
          'A viable country property with good potential, though one or two areas (such as water storage or soil building) will require dedicated labor and capital.',
        recommendation:
          'Prioritize water harvesting, compost preparation, and living boundary fences early in your development plan.',
      };
    } else if (totalScore >= 50) {
      return {
        badge: 'Marginal Suitability',
        colorClass:
          'bg-orange-50 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-700',
        summary:
          'The parcel suffers from significant drawbacks—either lack of water security, poor soil, proximity to urban vices, or extreme isolation.',
        recommendation:
          'Carefully calculate whether the financial cost and labor required to overcome these hurdles would deplete resources meant for the family and ministry.',
      };
    } else {
      return {
        badge: 'Unsuitable for Country Outpost',
        colorClass:
          'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700',
        summary:
          'This location conflicts with core Spirit of Prophecy country living principles. It lacks fundamental survival and health essentials.',
        recommendation:
          'Continue seeking. The Lord will open the way to a more suitable location as you prayerfully wait upon Him.',
      };
    }
  }, [totalScore]);

  const handleSaveCandidateParcel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = parcelName.trim() || `${parcelDistrict} Candidate Parcel (${totalScore}/100)`;
    const newParcel: SavedSuitabilityParcel = {
      id: `parcel-${Date.now()}`,
      name: cleanName,
      district: parcelDistrict,
      notes:
        parcelNotes.trim() ||
        `Evaluated at ${totalScore}/100 (${verdict.badge}).`,
      selections: { ...selections },
      totalScore,
      verdictBadge: verdict.badge,
      savedAt: new Date().toISOString().slice(0, 10),
    };

    setSavedParcels((prev) => [newParcel, ...prev]);
    setParcelName('');
    setParcelNotes('');
    setSaveNotice(`Saved "${cleanName}" to Candidate Plot Comparison.`);
    setTimeout(() => setSaveNotice(null), 3500);
  };

  const handleLoadParcel = (parcel: SavedSuitabilityParcel) => {
    setSelections({ ...parcel.selections });
    setParcelName(parcel.name);
    setParcelDistrict(parcel.district);
    setParcelNotes(parcel.notes);
  };

  const handleDeleteParcel = (id: string) => {
    setSavedParcels((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section
      id="property-suitability-calculator"
      aria-label="Ellen White Property Suitability Score Calculator"
      className={cn(
        'rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8 text-stone-900 dark:text-stone-100 transition-colors',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-bold text-emerald-800 dark:text-amber-300 uppercase tracking-wider">
              Pillar 2 Evaluation
            </span>
            <span aria-hidden="true">·</span>
            <span>Grounded in Inspired Counsel</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Property Suitability Score & Multi-Parcel Comparator
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Evaluate any prospective homestead parcel against Ellen White’s five cardinal criteria, save candidate plots offline, and compare them side-by-side.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-emerald-900/60 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
          >
            <Printer size={13} />
            <span>Print Scorecard</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-emerald-900/60 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Scores</span>
          </button>
        </div>
      </div>

      {/* Main Score Result Card */}
      <div className="rounded-2xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/90 dark:border-emerald-900/60 p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className={cn('font-bold uppercase tracking-wider px-3 py-1 rounded-lg border', verdict.colorClass)}>
              {verdict.badge}
            </span>
            <span className="text-stone-500 dark:text-stone-400 font-mono">· EGW Criteria Alignment</span>
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
          <span className="text-3xl font-black font-mono text-stone-900 dark:text-stone-50 tabular-nums">
            {totalScore}
          </span>
          <span className="text-caption uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">
            Out of 100
          </span>
        </div>
      </div>

      {/* Save Current Parcel to Candidate Comparison Bar */}
      <form
        onSubmit={handleSaveCandidateParcel}
        className="rounded-2xl bg-stone-50 dark:bg-[#112319] border border-stone-200/90 dark:border-emerald-900/60 p-4 sm:p-5 flex flex-col gap-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
            <Save size={15} className="text-emerald-700 dark:text-amber-400" />
            <span>Save This Evaluation to Candidate Parcel Comparison</span>
          </div>
          {saveNotice && (
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
              <CheckCircle2 size={16} strokeWidth={1.75} />
              <span>{saveNotice}</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="text"
            value={parcelName}
            onChange={(e) => setParcelName(e.target.value)}
            placeholder="Plot Name (e.g., Ntchisi Forest Edge 5 Acres)"
            className="sm:col-span-4 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B1810] border border-stone-300 dark:border-emerald-800/70 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <select
            value={parcelDistrict}
            onChange={(e) => setParcelDistrict(e.target.value)}
            className="sm:col-span-2 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1810] border border-stone-300 dark:border-emerald-800/70 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {[
              'Dedza',
              'Ntcheu',
              'Mzimba',
              'Rumphi',
              'Ntchisi',
              'Zomba',
              'Mulanje',
              'Thyolo',
              'Dowa',
              'Kasungu',
              'Lilongwe Rural',
              'Nkhata Bay',
              'Chitipa',
              'Mangochi',
              'Salima',
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={parcelNotes}
            onChange={(e) => setParcelNotes(e.target.value)}
            placeholder="Field notes (asking price in MWK, spring flow, Nyakwawa contact)..."
            className="sm:col-span-4 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B1810] border border-stone-300 dark:border-emerald-800/70 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="sm:col-span-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Save size={14} />
            <span>Save Plot ({totalScore})</span>
          </button>
        </div>
      </form>

      {/* Side-by-Side Candidate Parcel Comparison Matrix */}
      {savedParcels.length > 0 && (
        <div className="rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 bg-[#FAF8F5] dark:bg-[#112319] p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-caption font-mono uppercase tracking-wider text-emerald-800 dark:text-amber-300 font-bold">
                Side-by-Side Field Ledger · {savedParcels.length} Saved Candidate Plots
              </span>
              <h3 className="serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50">
                Candidate Homestead Parcel Comparison Matrix
              </h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Click “Load” on any row to inspect or edit its rubric
            </span>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-emerald-900/60 text-stone-500 dark:text-stone-400 font-mono text-caption">
                  <th className="py-2.5 pr-4 font-bold">Candidate Plot & District</th>
                  <th className="py-2.5 px-3 font-bold text-center">Score</th>
                  {EGW_PROPERTY_CRITERIA.map((c) => (
                    <th key={c.id} className="py-2.5 px-2.5 font-bold text-center whitespace-nowrap">
                      {c.shortLabel}
                    </th>
                  ))}
                  <th className="py-2.5 pl-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70 dark:divide-emerald-900/40">
                {savedParcels.map((parcel) => (
                  <tr
                    key={parcel.id}
                    className="hover:bg-white/80 dark:hover:bg-emerald-950/40 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        <MapPin size={13} className="text-emerald-700 dark:text-amber-400 shrink-0" />
                        <span>{parcel.name}</span>
                      </div>
                      <p className="text-caption text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                        {parcel.district} · {parcel.notes}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-black text-sm tabular-nums">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-lg',
                          parcel.totalScore >= 88
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300'
                            : parcel.totalScore >= 70
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300'
                        )}
                      >
                        {parcel.totalScore}/100
                      </span>
                    </td>
                    {EGW_PROPERTY_CRITERIA.map((c) => {
                      const idx = parcel.selections[c.id] ?? 0;
                      const pts = c.options[idx]?.points ?? 0;
                      return (
                        <td
                          key={c.id}
                          className="py-3 px-2.5 text-center font-mono tabular-nums text-stone-700 dark:text-stone-300"
                        >
                          {pts}/10
                        </td>
                      );
                    })}
                    <td className="py-3 pl-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleLoadParcel(parcel)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-800/10 dark:bg-emerald-800/30 hover:bg-emerald-800 hover:text-white text-emerald-900 dark:text-emerald-200 font-semibold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteParcel(parcel.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete saved plot"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Criteria Breakdown & Interactive Options */}
      <div className="flex flex-col gap-6">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Layers size={18} className="text-emerald-800 dark:text-amber-400" />
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
                        <span className="text-caption font-mono font-bold uppercase text-stone-500 dark:text-stone-400">
                          CRITERION #{cIndex + 1} · {criteria.weight}% WEIGHT
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                        {criteria.name}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-amber-900 dark:text-amber-300 self-start">
                    {criteria.egwCitation}
                  </span>
                </div>

                {/* Ellen White Quote Banner */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200/70 dark:border-emerald-900/40 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic flex items-start gap-2.5">
                  <BookOpen size={15} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed serif">"{criteria.counselText}"</p>
                </div>

                {/* Question */}
                <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {criteria.question}
                </div>

                {/* Beginner Field Test Tip Box */}
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-emerald-950/40 border border-amber-200/80 dark:border-emerald-800/50 text-xs text-stone-700 dark:text-stone-200 flex items-start gap-2">
                  <HelpCircle size={15} className="text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 dark:text-white">
                      How a Beginner Can Check This on the Ground (2-Min Test):{' '}
                    </strong>
                    <span>{criteria.beginnerFieldTest}</span>
                  </div>
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
                          'p-3.5 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer',
                          isSelected
                            ? 'bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 shadow-xs ring-2 ring-emerald-800/30'
                            : 'bg-[#FAF8F5] dark:bg-[#14281D] hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-200'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={cn(
                              'text-xs sm:text-sm font-bold leading-snug',
                              isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-100'
                            )}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={cn(
                              'text-caption font-mono font-bold px-1.5 py-0.5 rounded tabular-nums',
                              isSelected
                                ? 'bg-white/20 text-emerald-100'
                                : 'bg-stone-200 dark:bg-emerald-950/80 text-stone-700 dark:text-stone-300'
                            )}
                          >
                            {opt.points}/10
                          </span>
                        </div>
                        <p
                          className={cn(
                            'text-xs leading-relaxed',
                            isSelected ? 'text-emerald-200/90' : 'text-stone-500 dark:text-stone-400'
                          )}
                        >
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
