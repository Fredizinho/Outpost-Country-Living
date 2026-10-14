import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, X, Droplets, ShieldCheck, Zap, Signal, 
  Truck, Layers, CheckCircle, RotateCcw, Compass, Check, Sprout, Sparkles,
  Route, Car, AlertTriangle
} from 'lucide-react';
import { FilterState } from '@/hooks/useMapFilters';
import { cn } from '@/lib/utils';

interface MapFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  toggleMultiSelect: (key: 'selectedWater' | 'selectedTenure' | 'selectedRoadAccess' | 'selectedSoil', value: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  filteredCount: number;
  totalCount: number;
}

export function MapFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  toggleMultiSelect,
  resetFilters,
  activeFilterCount,
  filteredCount,
  totalCount
}: MapFilterDrawerProps) {
  const waterOptions = [
    { label: 'Perennial Stream', desc: 'Year-round flowing water' },
    { label: 'Seasonal Dambo', desc: 'Winter wetland moisture' },
    { label: 'Deep Aquifer', desc: 'Borehole water under 30m' },
    { label: 'Shallow Well', desc: 'Hand-dug water table' }
  ];

  const tenureOptions = [
    { label: 'Customary Estate Registered', badge: 'Safest' },
    { label: 'Private Leasehold', badge: 'Title Deed' },
    { label: 'Unregistered Customary', badge: 'TA Consent' }
  ];

  const roadAccessOptions = [
    { label: 'All-Weather Tarmac/Gravel', icon: Route },
    { label: '4x4 Dirt', icon: Car },
    { label: 'Impassable Dirt', icon: AlertTriangle }
  ];

  const soilOptions = [
    'Sandy Loam',
    'Heavy Clay/Dambo',
    'Gentle Slope Red Latosol',
    'Volcanic Rich'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md transition-opacity">
          {/* Backdrop Click */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Slide-Up Drawer Box */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative z-10 w-full sm:max-w-xl max-h-[85vh] bg-slate-950/98 text-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-amber-500/30 flex flex-col overflow-hidden"
          >
            {/* Top Drag Handle & Mobile Touch Bar */}
            <div className="w-full pt-3 pb-2 flex flex-col items-center justify-center cursor-pointer border-b border-white/10 bg-slate-900/60">
              <div className="w-12 h-1.5 rounded-full bg-slate-700 mb-2" />
              <div className="w-full px-6 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
                    <Filter size={18} />
                  </div>
                  <div>
                    <h3 className="serif text-xl font-bold text-white flex items-center gap-2">
                      Parcel Filters
                      {activeFilterCount > 0 && (
                        <span className="bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded-full">
                          {activeFilterCount} Active
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Showing <strong className="text-amber-400">{filteredCount}</strong> of {totalCount} surveyed parcels
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Filter Categories */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 text-slate-200 font-sans scrollbar-thin">
              
              {/* 1. Distance to ESCOM Grid Slider */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Zap size={15} className="text-amber-400" /> Max Distance to ESCOM Grid
                  </span>
                  <span className="text-xs font-black text-amber-300 bg-black/50 px-3 py-1 rounded-xl border border-amber-500/30 shadow-sm font-mono">
                    {filters.maxGridDistance === 15 ? 'Any Distance' : `≤ ${filters.maxGridDistance} km`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.5"
                  value={filters.maxGridDistance}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxGridDistance: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-caption font-mono text-slate-400">
                  <span>0.5 km (Adjacent)</span>
                  <span>5 km</span>
                  <span>10 km</span>
                  <span>15+ km (Pure Off-Grid)</span>
                </div>
              </div>

              {/* 2. Water Reliability */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Droplets size={15} className="text-sky-400" /> Water Security & Sources
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {waterOptions.map((opt) => {
                    const isSelected = filters.selectedWater.includes(opt.label);
                    return (
                      <button
                        key={opt.label}
                        onClick={() => toggleMultiSelect('selectedWater', opt.label)}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left transition-all min-h-[52px] flex items-start justify-between gap-2 cursor-pointer",
                          isSelected
                            ? "bg-sky-950/90 text-sky-200 border-sky-400 shadow-md ring-1 ring-sky-400/40"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-850 border-white/5"
                        )}
                      >
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1">
                            {opt.label}
                          </div>
                          <div className={cn("text-caption mt-0.5", isSelected ? "text-sky-300" : "text-slate-400")}>
                            {opt.desc}
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-sky-400 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Land Tenure */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-400" /> Land Tenure & Titling
                </label>
                <div className="flex flex-col gap-2">
                  {tenureOptions.map((opt) => {
                    const isSelected = filters.selectedTenure.includes(opt.label);
                    return (
                      <button
                        key={opt.label}
                        onClick={() => toggleMultiSelect('selectedTenure', opt.label)}
                        className={cn(
                          "p-3.5 rounded-2xl border transition-all min-h-[48px] flex items-center justify-between text-left cursor-pointer",
                          isSelected
                            ? "bg-emerald-950/90 text-emerald-200 border-emerald-400 shadow-md ring-1 ring-emerald-400/40"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-850 border-white/5"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold">{opt.label}</span>
                          <span className={cn(
                            "text-caption font-mono font-bold uppercase px-2 py-0.5 rounded-md border",
                            isSelected ? "bg-emerald-900 text-amber-300 border-emerald-700" : "bg-black/40 text-emerald-400 border-emerald-500/30"
                          )}>
                            {opt.badge}
                          </span>
                        </div>
                        {isSelected && <Check size={16} className="text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Connectivity & Telecom Signal */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Signal size={15} className="text-amber-400" /> Telecom Signal (TNM & Airtel)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'All', label: 'Any Signal' },
                    { key: '3G+', label: '3G or 4G' },
                    { key: '4G', label: '4G LTE' },
                  ].map((sig) => (
                    <button
                      key={sig.key}
                      onClick={() => setFilters(prev => ({ ...prev, signalFilter: sig.key as any }))}
                      className={cn(
                        "py-3 px-2 rounded-xl text-xs font-mono font-bold transition-all min-h-[44px] flex items-center justify-center gap-1 border cursor-pointer",
                        filters.signalFilter === sig.key
                          ? "bg-amber-500 text-slate-950 font-black border-amber-300 shadow-md"
                          : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-white/5"
                      )}
                    >
                      {sig.key === '4G' && <Zap size={11} className={filters.signalFilter === '4G' ? 'text-slate-950' : 'text-amber-400'} />}
                      <span>{sig.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Rainy Season Access */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Truck size={15} className="text-slate-300" /> Rainy Season Road Access
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {roadAccessOptions.map((opt) => {
                    const isSelected = filters.selectedRoadAccess.includes(opt.label);
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => toggleMultiSelect('selectedRoadAccess', opt.label)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-xs font-mono font-bold flex flex-col items-center justify-center gap-1.5 text-center min-h-[64px] cursor-pointer",
                          isSelected
                            ? "bg-emerald-950 text-emerald-200 border-emerald-400 shadow-md"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-white/5"
                        )}
                      >
                        <IconComponent size={18} className={isSelected ? "text-amber-400" : "text-slate-400"} />
                        <span className="text-caption font-bold leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Soil Profile & Pedology */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers size={15} className="text-emerald-400" /> Soil Profile & Pedology
                </label>
                <div className="flex flex-wrap gap-2">
                  {soilOptions.map((soil) => {
                    const isSelected = filters.selectedSoil.includes(soil);
                    return (
                      <button
                        key={soil}
                        onClick={() => toggleMultiSelect('selectedSoil', soil)}
                        className={cn(
                          "px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all border flex items-center gap-1.5 cursor-pointer",
                          isSelected
                            ? "bg-emerald-950 text-emerald-200 border-emerald-400 shadow-md"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-white/5"
                        )}
                      >
                        {isSelected && <Check size={14} className="text-amber-400" />}
                        <span>{soil}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Chief Verification Toggle Switch */}
              <div className="p-4 bg-slate-900/90 text-white rounded-2xl flex items-center justify-between border border-white/10 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
                      Research & Model Benchmarks
                    </span>
                    <span className="text-caption text-slate-300 font-medium">
                      Filter to national agricultural research stations & public model sites (Indicative reference only)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, chiefVerifiedOnly: !prev.chiefVerifiedOnly }))}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors relative p-1 shrink-0 cursor-pointer",
                    filters.chiefVerifiedOnly ? "bg-amber-500" : "bg-slate-800 border border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full bg-white transition-transform shadow-md",
                    filters.chiefVerifiedOnly ? "translate-x-5" : "translate-x-0"
                  )} />
                </button>
              </div>

            </div>

            {/* Bottom Apply Action Bar */}
            <div className="p-4 bg-slate-900/95 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 px-6 rounded-2xl text-xs font-mono font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply & View {filteredCount} Parcels</span>
                <Compass size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
