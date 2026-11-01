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
    egwCitation: 'Country Living, p. 12',
    counselText:
      'The physical surroundings in the cities are often a peril to health. The constant hurry, the noise and confusion, the strife and discord, are a great tax on vital forces. Seek peace in the country.',
    question: 'Is the property situated safely beyond commuter sprawl and municipal turmoil?',
    beginnerFieldTest:
      'Check travel time to the nearest large city (Lilongwe/Blantyre/Mzuzu). It should ideally take 45–90 minutes by minibus or pickup. You want to be far enough to avoid city noise and water rationing, but close enough to deliver fresh produce or reach emergency clinics.',
    options: [
      {
        label: 'Quiet rural valley or mountain ridge (15–60km from city limits)',
        points: 10,
        explanation: 'Peaceful rural atmosphere insulated from municipal discord.',
      },
      {
        label: 'Semi-rural village outpost (8–15km beyond urban perimeter)',
        points: 7,
        explanation: 'Manageable buffer; monitor encroaching developments and subdivisions.',
      },
      {
        label: 'Peri-urban transition zone (3–8km from town center)',
        points: 4,
        explanation: 'Vulnerable to urban sprawl, property tax hikes, and noise.',
      },
      {
        label: 'Suburban corridor or inside municipal boundaries',
        points: 1,
        explanation: 'Not aligned with inspired counsel for quiet country sanctuaries.',
      },
    ],
  },
  {
    id: 'family-labor',
    name: 'Opportunity for Useful Physical Labor & Practical Education',
    shortLabel: 'Vocational Training (15%)',
    weight: 15,
    icon: Trees,
    egwCitation: 'Education, p. 219',
    counselText:
      'Working the soil provides the best physical and moral training. It develops physical strength, self-reliance, and cooperation with God.',
    question: 'Does the land layout permit varied physical occupations (building, orchard, bees)?',
    beginnerFieldTest:
      'Walk the perimeter: Is there level ground for a workshop and timber shed? Is there a hillside slope for terracing? Are there trees for shade and building poles? If the plot is too tiny (< 0.5 acre), children have no room for agricultural projects.',
    options: [
      {
        label: 'Sufficient acreage (> 2–5 acres) with room for workshop, orchard, bees',
        points: 10,
        explanation: 'Ample scope for teaching youth trades, woodworking, and gardening.',
      },
      {
        label: 'Modest parcel (1–2 acres) with space for family garden and small sheds',
        points: 8,
        explanation: 'Good for basic family self-reliance and daily homestead chores.',
      },
      {
        label: 'Constrained plot (0.5–1 acre) with limited room for expansion',
        points: 5,
        explanation: 'Tolerable for starter cottage; will limit livestock or training ministry.',
      },
      {
        label: 'Sub-quarter-acre high-density residential footprint',
        points: 2,
        explanation: 'Severely limits practical physical training and homestead industry.',
      },
    ],
  },
  {
    id: 'outpost-ministry',
    name: 'Outpost Ministry & Sanitarium Outreach Potential',
    shortLabel: 'Outpost Ministry (15%)',
    weight: 15,
    icon: HeartHandshake,
    egwCitation: 'Medical Ministry, p. 308',
    counselText:
      'From the outposts, messengers are to go into the cities to carry the truth, and then return to their country homes to rest and regain physical strength.',
    question: 'Can messengers travel back and forth to cities and villages for gospel and health ministry?',
    beginnerFieldTest:
      'Drive or walk the access road during the rainy season. Does the dirt road wash away in storms? Can a standard vehicle or motorcycle reach the main tarmac year-round? You need reliable passage to carry gospel literature and medical aid to surrounding communities.',
    options: [
      {
        label: 'All-weather unpaved feeder road connecting to highway within 5–15km',
        points: 10,
        explanation: 'Ideal outpost balance: Secluded retreat with dependable mission transit.',
      },
      {
        label: 'Secondary dirt track with seasonal mud spots requiring 4WD in Jan–Mar',
        points: 7,
        explanation: 'Viable with raised culverts and gravel reinforcement.',
      },
      {
        label: 'Rough rocky mountain track impassable to vehicles for weeks during rains',
        points: 4,
        explanation: 'High isolation; difficult to transport patients or mission produce.',
      },
      {
        label: 'Complete road isolation with footpaths only across flooded marshes',
        points: 1,
        explanation: 'Impractical for systematic outpost outreach and emergency transport.',
      },
    ],
  },
];

export function PropertySuitabilityCalculator({ className }: { className?: string }) {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedParcels, setSavedParcels] = useState<SavedSuitabilityParcel[]>(() => {
    try {
      const saved = localStorage.getItem(PARCELS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SAVED_PARCELS;
    } catch {
      return DEFAULT_SAVED_PARCELS;
    }
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
    setSelections({});
  };

  const totalScore = useMemo(() => {
    let score = 0;
    for (const criteria of EGW_PROPERTY_CRITERIA) {
      const selectedIndex = selections[criteria.id] ?? 0;
      const option = criteria.options[selectedIndex];
      if (option) {
        score += (option.points * criteria.weight) / 10;
      }
    }
    return Math.round(score);
  }, [selections]);

  const verdict = useMemo(() => {
    if (totalScore >= 88) {
      return {
        badge: 'Exceptional Outpost Sanctuary',
        colorClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
        summary:
          'This parcel strongly embodies inspired counsel: abundant water, fertile soil, seclusion from city strife, and access for outpost ministry.',
        recommendation:
          'Proceed confidently with soil mineral testing, customary title boundary verification, and water easement registration.',
      };
    }
    if (totalScore >= 70) {
      return {
        badge: 'Favorable Outpost Potential',
        colorClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
        summary:
          'Strong foundational suitability with 1–2 manageable engineering or logistical hurdles (e.g., seasonal water storage or soil enrichment).',
        recommendation:
          'Plan budget for rainwater harvesting tanks or solar pumping; implement heavy organic composting during the first dry season.',
      };
    }
    return {
      badge: 'Challenging — High Mitigation Needed',
      colorClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
      summary:
        'Significant deficits in perennial water access, soil depth, or outreach connectivity require heavy capital outlay and labor to overcome.',
      recommendation:
        'Seek counsel before purchase; consider alternative nearby valleys with active mountain springs and established access tracks.',
    };
  }, [totalScore]);

  const handleSaveCandidateParcel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = parcelName.trim() || `Plot ${parcelDistrict} (${new Date().toLocaleDateString()})`;
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
        'rounded-[var(--radius-sheet)] bg-[var(--surface)] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8 text-stone-900 dark:text-stone-100 transition-colors',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-emerald-800 dark:text-amber-300">
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
            className="text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-control)] border border-stone-200 dark:border-emerald-900/60 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
          >
            <Printer size={13} />
            <span>Print scorecard</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-control)] border border-stone-200 dark:border-emerald-900/60 hover:bg-stone-50 dark:hover:bg-emerald-950/60 transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset scores</span>
          </button>
        </div>
      </div>

      {/* Main Score Result Card */}
      <div className="rounded-[var(--radius-card)] bg-[var(--ground)] border border-stone-200/90 dark:border-emerald-900/60 p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className={cn('font-semibold px-3 py-1 rounded-[var(--radius-control)] border', verdict.colorClass)}>
              {verdict.badge}
            </span>
            <span className="text-stone-500 dark:text-stone-400">· EGW Criteria Alignment</span>
          </div>
          <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
            Parcel Suitability Index: {totalScore} / 100
          </h3>
          <p className="text-sm text-stone-700 dark:text-stone-300 max-w-2xl leading-relaxed">
            {verdict.summary}
          </p>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 font-medium bg-emerald-50/90 dark:bg-emerald-950/60 p-3 rounded-[var(--radius-control)] border border-emerald-100 dark:border-emerald-800/60">
            <strong>Counsel Guidance:</strong> {verdict.recommendation}
          </p>
        </div>

        {/* Circular Gauge Representation */}
        <div className="shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-800/80 dark:border-emerald-500 bg-[var(--surface)] shadow-inner">
          <span className="text-3xl font-black font-mono text-stone-900 dark:text-stone-50 tabular-nums">
            {totalScore}
          </span>
          <span className="text-caption font-semibold text-stone-500 dark:text-stone-400">
            Out of 100
          </span>
        </div>
      </div>

      {/* Save Current Parcel to Candidate Comparison Bar */}
      <form
        onSubmit={handleSaveCandidateParcel}
        className="rounded-[var(--radius-card)] bg-stone-50 dark:bg-[var(--surface)] border border-stone-200/90 dark:border-emerald-900/60 p-4 sm:p-5 flex flex-col gap-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
            <Save size={15} className="text-emerald-700 dark:text-amber-400" />
            <span>Save This Evaluation to Candidate Parcel Comparison</span>
          </div>
          {saveNotice && (
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1">
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
            className="sm:col-span-4 px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--surface)] border border-stone-300 dark:border-emerald-800/70 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <select
            value={parcelDistrict}
            onChange={(e) => setParcelDistrict(e.target.value)}
            className="sm:col-span-2 px-3 py-2 rounded-[var(--radius-control)] bg-[var(--surface)] border border-stone-300 dark:border-emerald-800/70 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
            className="sm:col-span-4 px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--surface)] border border-stone-300 dark:border-emerald-800/70 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="sm:col-span-2 px-4 py-2 rounded-[var(--radius-control)] bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Save size={14} />
            <span>Save Plot ({totalScore})</span>
          </button>
        </div>
      </form>

      {/* Side-by-Side Candidate Parcel Comparison Matrix */}
      {savedParcels.length > 0 && (
        <div className="rounded-[var(--radius-card)] border border-stone-200/90 dark:border-emerald-900/60 bg-[var(--ground)] p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-caption font-semibold text-emerald-800 dark:text-amber-300">
                Side-by-side field ledger · {savedParcels.length} saved candidate plots
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
                <tr className="border-b border-stone-200 dark:border-emerald-900/60 text-stone-500 dark:text-stone-400 text-caption">
                  <th className="py-2.5 pr-4 font-semibold">Candidate plot & district</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Score</th>
                  {EGW_PROPERTY_CRITERIA.map((c) => (
                    <th key={c.id} className="py-2.5 px-2.5 font-semibold text-center whitespace-nowrap">
                      {c.shortLabel}
                    </th>
                  ))}
                  <th className="py-2.5 pl-3 font-semibold text-right">Actions</th>
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
                          'px-2.5 py-1 rounded-[var(--radius-control)]',
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
                          className="px-2.5 py-1 rounded-[var(--radius-control)] bg-emerald-800/10 dark:bg-emerald-800/30 hover:bg-emerald-800 hover:text-white text-emerald-900 dark:text-emerald-200 font-semibold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteParcel(parcel.id)}
                          className="p-1.5 rounded-[var(--radius-control)] text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
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
                className="p-5 sm:p-6 rounded-[var(--radius-card)] border border-stone-200/90 dark:border-emerald-900/60 bg-[var(--surface)] shadow-xs flex flex-col gap-4"
              >
                {/* Criteria Header & Counsel Quote */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[var(--radius-control)] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption font-semibold text-stone-500 dark:text-stone-400">
                          Criterion #{cIndex + 1} · {criteria.weight}% Weight
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
                <div className="p-3.5 rounded-[var(--radius-control)] bg-stone-50 dark:bg-[var(--ground)] border border-stone-200/70 dark:border-emerald-900/40 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic flex items-start gap-2.5">
                  <BookOpen size={15} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed serif">"{criteria.counselText}"</p>
                </div>

                {/* Question */}
                <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {criteria.question}
                </div>

                {/* Beginner Field Test Tip Box */}
                <div className="p-3 rounded-[var(--radius-control)] bg-amber-50/80 dark:bg-emerald-950/40 border border-amber-200/80 dark:border-emerald-800/50 text-xs text-stone-700 dark:text-stone-200 flex items-start gap-2">
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
                          'p-3.5 sm:p-4 rounded-[var(--radius-control)] border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer',
                          isSelected
                            ? 'bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 shadow-xs ring-2 ring-emerald-800/30'
                            : 'bg-[var(--ground)] hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-200'
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
                              'text-caption font-mono font-bold px-1.5 py-0.5 rounded-[var(--radius-control)] tabular-nums',
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
