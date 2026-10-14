import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Search, Filter, Droplets, 
  Layers, Calendar, TrendingUp, Sparkles, X, 
  Info, Leaf, CheckCircle2, Award, ArrowUpRight, Shield, BookOpen,
  ChevronDown, ChevronUp, MapPin, Compass, Wrench, Package, Trees
} from 'lucide-react';
import { MALAWI_CROPS_DATABASE, MalawiCrop } from '@/data/malawiCropsData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export function MalawiCropExplorer() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Default region filter matching user profile or 'All'
  const defaultRegion = user?.region ? `${user.region}` : 'All';
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>(defaultRegion);
  const [activeModalCrop, setActiveModalCrop] = useState<MalawiCrop | null>(null);
  const [expandedInlineCropId, setExpandedInlineCropId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.region) {
      // Find matching region chip label
      if (user.region === 'Central') setSelectedRegionFilter('Central Plateau');
      else if (user.region === 'Northern') setSelectedRegionFilter('Northern Plateau');
      else if (user.region === 'Southern') setSelectedRegionFilter('Southern Highlands');
    }
  }, [user?.region]);

  const categories = [
    'All',
    'Staple Grains',
    'Root & Tuber Crops',
    'Legumes & Soil Builders',
    'Leafy Greens & Relish',
    'Fruits & Orchards',
    'Spices & Vegetables'
  ];

  const regions = [
    'All',
    'Central Plateau',
    'Northern Plateau',
    'Southern Highlands',
    'Lakeshore',
    'Lower Shire'
  ];

  const filteredCrops = useMemo(() => {
    return MALAWI_CROPS_DATABASE.filter((crop) => {
      const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
      const matchesRegion = selectedRegionFilter === 'All' || crop.malawiRegions.some(r => r.toLowerCase().includes(selectedRegionFilter.toLowerCase()));
      
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        crop.name.toLowerCase().includes(q) ||
        crop.englishName.toLowerCase().includes(q) ||
        crop.chichewaName.toLowerCase().includes(q) ||
        crop.scientificName.toLowerCase().includes(q) ||
        crop.description.toLowerCase().includes(q) ||
        crop.preservationAndStorage.toLowerCase().includes(q);

      return matchesCategory && matchesRegion && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedRegionFilter]);

  return (
    <div className="flex flex-col gap-8 w-full" id="malawi-crops-section">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl border border-emerald-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <Sprout size={14} className="animate-pulse text-emerald-400" />
              <span>Malawi Agronomy Blueprint • 28 Verified Viable Crops</span>
            </div>
            <h2 className="serif text-3xl md:text-5xl font-bold text-white tracking-tight">
              Crop Cultivation & Local Agronomy Index
            </h2>
            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed font-medium">
              Verified Chichewa names (<span className="text-emerald-300 italic font-serif">Chimanga, Chinangwa, Mbambaira, Kachebere, Ntedza, Nzama, Nandolo</span>), ridge dimensions, soil pH, seed rates, water needs, companion synergies, and traditional preservation methods.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0 text-center">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold font-serif text-emerald-300">{MALAWI_CROPS_DATABASE.length}</div>
              <div className="text-caption font-bold text-emerald-200 uppercase tracking-wider">Viable Crops</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold font-serif text-amber-300">100%</div>
              <div className="text-caption font-bold text-emerald-200 uppercase tracking-wider">Local Chichewa</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold font-serif text-emerald-300">28</div>
              <div className="text-caption font-bold text-emerald-200 uppercase tracking-wider">Districts Covered</div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-800/80 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Chichewa name (e.g., Chimanga, Nkhwani, Nzama), English name, or details..."
              className="w-full bg-emerald-950/80 border border-emerald-700/60 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider mr-1">
              <Filter size={14} />
              <span>Region:</span>
            </div>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegionFilter(reg)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  selectedRegionFilter === reg
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800"
                )}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-2",
              selectedCategory === cat
                ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 ring-2 ring-emerald-600"
                : "bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-slate-200"
            )}
          >
            <Leaf size={14} className={selectedCategory === cat ? "text-emerald-300" : "text-emerald-600"} />
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Results Count Bar */}
      <div className="flex justify-between items-center px-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Showing <span className="text-emerald-800 font-extrabold">{filteredCrops.length}</span> of {MALAWI_CROPS_DATABASE.length} Malawian crops
        </p>
        {(selectedCategory !== 'All' || selectedRegionFilter !== 'All' || searchQuery) && (
          <button 
            onClick={() => { setSelectedCategory('All'); setSelectedRegionFilter('All'); setSearchQuery(''); }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Crops Cards Grid - Apple Notes Expandable Cards */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <Sprout size={32} />
          </div>
          <h4 className="font-bold text-emerald-950 text-lg">No Matching Agronomy Records</h4>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            No crops match your selected combination of category, region, and search keywords.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedRegionFilter('All'); }}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredCrops.map((crop) => {
            const isExpanded = expandedInlineCropId === crop.id;

            return (
              <motion.div
                key={crop.id}
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={cn(
                  "bg-white/90 backdrop-blur-xl rounded-[2rem] border transition-all duration-300 ease-in-out shadow-lg overflow-hidden",
                  isExpanded 
                    ? "border-emerald-600/80 ring-2 ring-emerald-500/20 lg:col-span-3 md:col-span-2 shadow-2xl" 
                    : "border-slate-200/80 hover:border-emerald-600/40 hover:shadow-xl"
                )}
              >

              <div className="p-6 md:p-7 flex flex-col gap-4">
                {/* Top Header Row */}
                <div 
                  onClick={() => setExpandedInlineCropId(isExpanded ? null : crop.id)}
                  className="flex justify-between items-start gap-3 cursor-pointer select-none"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-caption font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 inline-block">
                        {crop.category}
                      </span>
                      <span className="font-mono text-caption text-slate-500">
                        {crop.scientificName}
                      </span>
                    </div>
                    {/* Clean Header Title */}
                    <h3 className="font-serif text-emerald-950 text-xl font-semibold transition-colors">
                      {crop.name} <span className="text-sm font-sans font-normal text-slate-600">({crop.englishName})</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Right-aligned micro badge */}
                    <span className="font-mono text-caption text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {crop.maturityPeriod} • {crop.accessibilityScore.toUpperCase()}
                    </span>

                    <div className={cn(
                      "p-2 rounded-xl border transition-all duration-300 ease-in-out",
                      isExpanded 
                        ? "bg-emerald-950 text-white border-emerald-900" 
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50"
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

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {crop.description}
                </p>

                {/* Quick Agronomy Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-caption bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80 font-medium text-emerald-950">
                  <div className="flex items-center gap-1.5 truncate">
                    <Layers size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{crop.ridgeSpacing.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{crop.maturityPeriod}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Droplets size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{crop.waterAndRainfall.split('.')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <TrendingUp size={13} className="text-emerald-700 shrink-0" />
                    <span className="truncate">{crop.yieldPotential.split(' ')[0]} {crop.yieldPotential.split(' ')[1]}</span>
                  </div>
                </div>

                {/* In-Place Expanded Depth */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-slate-200/80 pt-5 flex flex-col gap-5 mt-1 overflow-hidden"
                    >
                      {/* 2-Column Concise Content Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        
                        {/* Left Column: Bulleted "Core Steps & Protocols" with bold lead-ins */}
                        <div className="lg:col-span-7 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="font-serif text-emerald-950 text-sm font-semibold flex items-center gap-2">
                              <Sparkles size={14} className="text-emerald-700" />
                              Key Growing Steps
                            </span>
                            <span className="font-mono text-caption text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                              Growing Guide
                            </span>
                          </div>

                          <ul className="flex flex-col gap-2.5">
                            <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                              <span className="w-5 h-5 rounded-lg bg-emerald-900 text-amber-300 font-mono text-caption font-bold flex items-center justify-center shrink-0 mt-0.5">
                                1
                              </span>
                              <div>
                                <strong className="text-emerald-950 font-semibold">Ridge & Bed Preparation:</strong>
                                <span className="text-slate-700 ml-1 leading-relaxed">{crop.ridgeSpacing}</span>
                              </div>
                            </li>

                            <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                              <span className="w-5 h-5 rounded-lg bg-emerald-900 text-amber-300 font-mono text-caption font-bold flex items-center justify-center shrink-0 mt-0.5">
                                2
                              </span>
                              <div>
                                <strong className="text-emerald-950 font-semibold">Storage & Traditional Preservation:</strong>
                                <span className="text-slate-700 ml-1 leading-relaxed">{crop.preservationAndStorage}</span>
                              </div>
                            </li>

                            {crop.companionPlanting && (
                              <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
                                <span className="w-5 h-5 rounded-lg bg-emerald-900 text-amber-300 font-mono text-caption font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  3
                                </span>
                                <div>
                                  <strong className="text-emerald-950 font-semibold">Companion Synergies:</strong>
                                  <span className="text-slate-700 ml-1 leading-relaxed">{crop.companionPlanting}</span>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Right Column: "Required Equipment & Metrics" in crisp font-mono */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="font-serif text-emerald-950 text-sm font-semibold flex items-center gap-2">
                              <Wrench size={14} className="text-emerald-700" />
                              Required Equipment & Metrics
                            </span>
                            <span className="font-mono text-caption text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                              Agronomy Specs
                            </span>
                          </div>

                          <div className="flex flex-col gap-2 font-mono text-xs">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                              <span className="text-caption uppercase text-slate-500 block mb-0.5 font-bold">Soil pH & Texture</span>
                              <span className="text-emerald-950 font-bold text-caption block">{crop.soilTypeAndPh}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                <span className="text-caption uppercase text-slate-500 block mb-0.5 font-bold">Seed Rate</span>
                                <span className="text-emerald-900 font-bold text-caption block truncate">{crop.seedRateOrPropagation}</span>
                              </div>
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                <span className="text-caption uppercase text-slate-500 block mb-0.5 font-bold">Yield Potential</span>
                                <span className="text-amber-800 font-bold text-caption block truncate">{crop.yieldPotential}</span>
                              </div>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                              <span className="text-caption uppercase text-slate-500 block mb-0.5 font-bold">Target Malawi Regions</span>
                              <span className="text-slate-700 text-caption font-sans font-medium">{crop.malawiRegions.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Single High-Contrast Action Button */}
                      <div className="pt-2 border-t border-slate-200">
                        <button
                          onClick={() => setActiveModalCrop(crop)}
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                        >
                          <span>[ LAUNCH MASTERCLASS GUIDE ]</span>
                          <ArrowUpRight size={14} className="text-slate-950" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Actions Footer */}
              <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setExpandedInlineCropId(isExpanded ? null : crop.id)}
                  className="text-xs font-mono font-bold text-slate-600 hover:text-emerald-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? "Collapse Blueprint" : "Inspect Agronomy Blueprint"}</span>
                  <ChevronDown 
                    size={14} 
                    className={cn(
                      "transition-transform duration-300 ease-in-out",
                      isExpanded && "rotate-180"
                    )} 
                  />
                </button>

                <button
                  onClick={() => setActiveModalCrop(crop)}
                  className="bg-emerald-950 text-amber-300 hover:bg-emerald-900 px-3.5 py-1.5 rounded-xl font-mono text-caption font-bold tracking-wide flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                >
                  <span>Interactive Modal</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}

      {/* Full Agronomy Blueprint Modal */}
      <AnimatePresence>
        {activeModalCrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-emerald-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 flex flex-col gap-6 relative my-auto max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setActiveModalCrop(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 pr-10">
                <div className="flex items-center gap-2">
                  <span className="text-caption font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    {activeModalCrop.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Scientific: <span className="italic font-serif text-slate-600">{activeModalCrop.scientificName}</span>
                  </span>
                </div>

                <h3 className="serif text-3xl md:text-4xl font-bold text-emerald-950 mt-1">
                  {activeModalCrop.chichewaName}
                </h3>
                <div className="text-sm font-bold text-emerald-800">
                  English: {activeModalCrop.englishName}
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100/90 text-sm text-emerald-950 font-medium leading-relaxed">
                {activeModalCrop.description}
              </div>

              {/* Deep Agronomy Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <Layers size={14} />
                    <span>Ridge & Plant Spacing</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.ridgeSpacing}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <Sprout size={14} />
                    <span>Seed Rate & Propagation</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.seedRateOrPropagation}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <Shield size={14} />
                    <span>Soil pH & Soil Type</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.soilTypeAndPh}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <Droplets size={14} />
                    <span>Water & Rainfall Needs</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.waterAndRainfall}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <Calendar size={14} />
                    <span>Maturity & Harvest Window</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.maturityPeriod}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-caption">
                    <TrendingUp size={14} />
                    <span>Malawi Yield Potential</span>
                  </div>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed mt-1">
                    {activeModalCrop.yieldPotential}
                  </p>
                </div>
              </div>

              {/* Companion Synergy & Preservation */}
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-950 leading-relaxed font-medium">
                  <strong className="text-amber-900 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Leaf size={13} className="text-emerald-700 shrink-0" />
                    <span>Companion Planting & Synergy:</span>
                  </strong>
                  {activeModalCrop.companionPlanting}
                </div>

                <div className="p-4 bg-emerald-900 text-white rounded-2xl border border-emerald-800 text-xs leading-relaxed font-medium">
                  <strong className="text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Package size={13} className="text-emerald-400 shrink-0" />
                    <span>Preservation & Storage Method:</span>
                  </strong>
                  {activeModalCrop.preservationAndStorage}
                </div>
              </div>

              {/* Pro Agronomist Tip */}
              <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl border border-emerald-700 flex gap-3 items-start">
                <Sparkles size={20} className="text-amber-300 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider block">Pro Agronomy Tip:</span>
                  <span className="text-emerald-100 font-medium leading-relaxed">{activeModalCrop.proCultivationTip}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center pt-2">
                <div className="text-caption text-slate-500 font-medium">
                  Primary Zones: <span className="font-bold text-slate-700">{activeModalCrop.malawiRegions.join(', ')}</span>
                </div>
                <button
                  onClick={() => setActiveModalCrop(null)}
                  className="bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
