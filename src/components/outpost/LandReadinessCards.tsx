import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Droplets, Sun, Sprout, Search, Filter, 
  ChevronRight, Compass, ShieldCheck, Waves, Mountain, 
  ArrowUpRight, Info, Check, CheckCircle2, ChevronDown, 
  ChevronUp, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DISTRICT_READINESS_CARDS, 
  DistrictReadinessCardData 
} from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function LandReadinessCards({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Central' | 'Northern' | 'Southern'>('All');
  const [selectedRating, setSelectedRating] = useState<'All' | 'Prime Outpost' | 'Very Good' | 'Favorable'>('All');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('dedza');

  // Filtered district cards
  const filteredCards = useMemo(() => {
    return DISTRICT_READINESS_CARDS.filter((card) => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.edenicCrops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRegion = selectedRegion === 'All' || card.region === selectedRegion;
      const matchesRating = selectedRating === 'All' || card.readinessRating === selectedRating;

      return matchesSearch && matchesRegion && matchesRating;
    });
  }, [searchQuery, selectedRegion, selectedRating]);

  return (
    <section 
      id="land-readiness-cards"
      aria-label="Simplified Land Readiness Cards"
      className={cn("flex flex-col gap-6", className)}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 2 Reconnaissance
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Simplified Land Readiness Cards</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Malawi Outpost District Scouting
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Essential land telemetry (soil pH, groundwater depths, rainfall, solar insolation) presented in clean, calm cards designed for peaceful decision making without cognitive overload.
          </p>
        </div>

        {/* Link to Full GPS Scout Map */}
        <Link
          to="/scout-map"
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-emerald-800 hover:bg-emerald-900 dark:hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all"
        >
          <Compass size={15} />
          <span>Interactive GPS Vector Map</span>
          <ArrowUpRight size={14} className="text-emerald-300" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, crop (e.g. Macadamia, Potatoes), or soil..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] focus:outline-none focus:ring-2 focus:ring-emerald-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
        </div>

        {/* Region Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['All', 'Central', 'Northern', 'Southern'] as const).map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer",
                selectedRegion === region
                  ? "bg-emerald-800 dark:bg-emerald-700 text-white font-semibold"
                  : "bg-white dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
              )}
            >
              {region === 'All' ? 'All Regions' : `${region} Region`}
            </button>
          ))}
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCards.map((card) => {
          const isExpanded = expandedCardId === card.id;

          return (
            <div
              key={card.id}
              className={cn(
                "rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-white dark:bg-[#0E1D14] shadow-xs hover:border-stone-400/80 dark:hover:border-emerald-700/80",
                isExpanded ? "ring-2 ring-emerald-800/20 border-emerald-800/40 dark:border-emerald-600/60" : "border-stone-200/90 dark:border-emerald-900/60"
              )}
            >
              {/* Card Header & Scores */}
              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        {card.region} Malawi
                      </span>
                      <span className="text-[10px] text-stone-400">•</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        {card.distanceFromMajorCities}
                      </span>
                    </div>
                    <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                      {card.name} District
                    </h3>
                  </div>

                  {/* Readiness Score Badge */}
                  <div className="flex flex-col items-end">
                    <span className={cn(
                      "text-xs font-black font-mono px-2.5 py-1 rounded-lg border",
                      card.readinessScore >= 90 
                        ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300"
                        : card.readinessScore >= 80
                        ? "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300"
                        : "bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200"
                    )}>
                      {card.readinessScore}/100
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase mt-0.5">
                      {card.readinessRating}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                  {card.summary}
                </p>

                {/* Micro-Telemetry Pills (Simplified) */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-emerald-900/40 text-xs">
                  {/* Water */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50">
                    <Droplets size={14} className="text-sky-700 dark:text-sky-400 shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-sky-900 dark:text-sky-300">Aquifer Depth</div>
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">{card.waterProfile.aquiferDepth}</div>
                    </div>
                  </div>

                  {/* Soil */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
                    <Sprout size={14} className="text-amber-700 dark:text-amber-400 shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300">Soil pH</div>
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">{card.soilProfile.phRange}</div>
                    </div>
                  </div>

                  {/* Rainfall */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                    <Waves size={14} className="text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300">Annual Rain</div>
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">{card.climateProfile.annualRainfallMm} mm/yr</div>
                    </div>
                  </div>

                  {/* Solar */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50">
                    <Sun size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-stone-700 dark:text-stone-300">Solar Power</div>
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">{card.climateProfile.solarPotential}</div>
                    </div>
                  </div>
                </div>

                {/* Key Edenic Crops Chips */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {card.edenicCrops.slice(0, 4).map((crop) => (
                    <span
                      key={crop}
                      className="text-xs font-medium bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md"
                    >
                      {crop}
                    </span>
                  ))}
                  {card.edenicCrops.length > 4 && (
                    <span className="text-xs text-stone-400 dark:text-stone-500 self-center">
                      +{card.edenicCrops.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Expandable Comprehensive Drawer */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="border-t border-stone-200/80 dark:border-emerald-900/60 bg-[#FAF8F5] dark:bg-[#14281D] p-5 flex flex-col gap-4 text-xs"
                  >
                    {/* Water Details */}
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 mb-1">
                        <Droplets size={13} className="text-sky-700 dark:text-sky-400" /> Water Supply & Gravity Head
                      </h4>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        <strong className="text-stone-800 dark:text-stone-100">Source:</strong> {card.waterProfile.sourceType}
                      </p>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                        <strong className="text-stone-800 dark:text-stone-100">Gravity:</strong> {card.waterProfile.gravityPotential}
                      </p>
                    </div>

                    {/* Soil Details */}
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 mb-1">
                        <Sprout size={13} className="text-amber-800 dark:text-amber-400" /> Soil Science & Organic Matter
                      </h4>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        <strong className="text-stone-800 dark:text-stone-100">Classification:</strong> {card.soilProfile.primaryType}
                      </p>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                        <strong className="text-stone-800 dark:text-stone-100">Natural Care:</strong> {card.soilProfile.organicMatterTip}
                      </p>
                    </div>

                    {/* Outpost Advantages */}
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 mb-1.5">
                        <ShieldCheck size={13} className="text-emerald-800 dark:text-emerald-400" /> Outpost Living Advantages
                      </h4>
                      <ul className="flex flex-col gap-1">
                        {card.outpostAdvantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300 leading-relaxed">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Toggle Button */}
              <button
                type="button"
                onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                className="w-full py-2.5 px-4 bg-stone-50 dark:bg-[#122419] hover:bg-stone-100 dark:hover:bg-emerald-950/60 border-t border-stone-200 dark:border-emerald-900/60 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{isExpanded ? "Hide Detailed Telemetry" : "View Complete Land Profile"}</span>
                {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
