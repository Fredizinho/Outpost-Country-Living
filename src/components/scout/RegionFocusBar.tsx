import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Mountain, Wheat, Sun, MapPin, Target, Search, X, 
  Layers, Compass, Grid, Sliders, ChevronDown, ChevronUp, Check, Sparkles,
  Wifi, WifiOff, Eye, Filter, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusRegionId, MALAWI_REGIONAL_BOUNDS } from './ScoutingMap';
import { MALAWI_DISTRICTS, MalawiDistrictSpec, getDistrictByIdOrName } from '@/data/malawiDistrictData';

interface RegionFocusBarProps {
  activeFocusRegion: FocusRegionId;
  onSelectRegion: (regionId: FocusRegionId) => void;
  activeDistrict: MalawiDistrictSpec | null;
  onSelectDistrict: (district: MalawiDistrictSpec | null) => void;
  activeMode: 'regional' | 'parcels';
  onToggleMode: (mode: 'regional' | 'parcels') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'map' | 'list';
  onToggleViewMode: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isDecluttered: boolean;
  onToggleDeclutter: () => void;
  onOpenLayersDeck: () => void;
  activeLayerCount: number;
  isOffline?: boolean;
  onOpenOfflineModal?: () => void;
  isAutoHidden?: boolean;
  onWakeUp?: () => void;
}

export function RegionFocusBar({
  activeFocusRegion,
  onSelectRegion,
  activeDistrict,
  onSelectDistrict,
  activeMode,
  onToggleMode,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
  isSidebarOpen,
  onToggleSidebar,
  isDecluttered,
  onToggleDeclutter,
  onOpenLayersDeck,
  activeLayerCount,
  isOffline = false,
  onOpenOfflineModal,
  isAutoHidden = false,
  onWakeUp
}: RegionFocusBarProps) {
  // State for retractable menu: expanded vs retracted
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDistrictListOpen, setIsDistrictListOpen] = useState<boolean>(false);

  const currentRegionSpec = MALAWI_REGIONAL_BOUNDS[activeFocusRegion];

  // Get list of districts for the active region
  const regionDistricts: MalawiDistrictSpec[] = React.useMemo(() => {
    if (activeFocusRegion === 'all') {
      return MALAWI_DISTRICTS;
    }
    const districtNames = MALAWI_REGIONAL_BOUNDS[activeFocusRegion].districts;
    return districtNames
      .map(name => getDistrictByIdOrName(name))
      .filter((d): d is MalawiDistrictSpec => d !== undefined);
  }, [activeFocusRegion]);

  return (
    <div 
      onMouseEnter={() => onWakeUp?.()}
      className={cn(
        "flex flex-col gap-2 w-full max-w-7xl mx-auto pointer-events-auto transition-all duration-300",
        isAutoHidden && !isExpanded ? "opacity-25 hover:opacity-100 focus-within:opacity-100" : "opacity-100"
      )} 
      id="region-focus-bar-root"
    >
      
      {/* ========================================================================= */}
      {/* 1. RETRACTABLE FLOATING HUD DOCK (COMPACT BY DEFAULT, EXPANDS ON CLICK)  */}
      {/* ========================================================================= */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* COMPACT MAIN BAR */}
        <div className="p-2 sm:p-2.5 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          
          {/* Left: Active Location Badge & Quick Expand Trigger */}
          <div className="flex items-center gap-2 overflow-hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer shrink-0 shadow-sm",
                isExpanded
                  ? "bg-amber-500 text-slate-950 border-amber-300 font-black shadow-amber-500/20"
                  : "bg-slate-900/90 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-slate-800"
              )}
              title={isExpanded ? "Close Controls" : "Select Region"}
            >
              <Compass size={14} className={isExpanded ? "text-slate-950" : "text-amber-400"} />
              <span className="font-bold tracking-tight">
                {activeDistrict ? `${activeDistrict.name} District` : currentRegionSpec.label}
              </span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Quick Status Tag */}
            <div className="hidden md:flex items-center gap-1.5 text-caption font-mono text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                {activeDistrict 
                  ? `Rain: ${activeDistrict.rainfallAnnualMm}mm • Soil: ${activeDistrict.soilPh}`
                  : currentRegionSpec.badge}
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            
            {/* Quick Search */}
            <div className="bg-slate-900/90 border border-white/10 rounded-xl px-2.5 py-1 flex items-center gap-1.5 w-28 sm:w-40 focus-within:w-52 transition-all">
              <Search size={13} className="text-amber-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search location..."
                className="w-full bg-transparent text-white placeholder:text-slate-400 text-xs font-semibold focus:outline-none min-h-[22px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Clean View / Declutter Switch */}
            <button
              onClick={onToggleDeclutter}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer",
                isDecluttered
                  ? "bg-emerald-500/30 text-emerald-300 border-emerald-400 shadow-md ring-1 ring-emerald-400/40"
                  : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:border-slate-600"
              )}
              title={isDecluttered ? "Declutter On" : "Declutter Off"}
            >
              <Sparkles size={13} className={isDecluttered ? "text-emerald-400" : "text-slate-400"} />
              <span className="hidden sm:inline">{isDecluttered ? "Clean" : "Declutter"}</span>
            </button>

            {/* Layers Deck Toggle */}
            <button
              onClick={onOpenLayersDeck}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-amber-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Map Layers"
            >
              <Layers size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Layers</span>
              <span className="bg-amber-500/20 text-amber-300 text-caption px-1.5 py-0.2 rounded-full border border-amber-500/40 font-mono">
                {activeLayerCount}
              </span>
            </button>

            {/* Offline / Field Sync */}
            {onOpenOfflineModal && (
              <button
                onClick={onOpenOfflineModal}
                className={cn(
                  "p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border cursor-pointer",
                  isOffline
                    ? "bg-amber-500/25 text-amber-300 border-amber-400 shadow-md"
                    : "bg-slate-900/80 text-emerald-400 border-emerald-500/30 hover:border-emerald-400"
                )}
                title={isOffline ? "Offline Mode" : "Online Sync"}
              >
                {isOffline ? <WifiOff size={13} className="text-amber-400 animate-pulse" /> : <Wifi size={13} className="text-emerald-400" />}
                <span className="hidden lg:inline">{isOffline ? "Offline" : "Sync"}</span>
              </button>
            )}

            {/* Telemetry Dossier Drawer Toggle */}
            <button
              onClick={onToggleSidebar}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm",
                isSidebarOpen 
                  ? "bg-amber-500/25 text-amber-300 border-amber-400/80 shadow-md shadow-amber-950/40" 
                  : "bg-gradient-to-r from-emerald-950 to-slate-900 text-emerald-300 border-emerald-500/50 hover:border-emerald-400"
              )}
              title="Toggle Details"
            >
              {isSidebarOpen ? <X size={13} className="text-amber-400" /> : <Sliders size={13} className="text-emerald-400" />}
              <span className="hidden sm:inline">Details</span>
            </button>

            {/* Expand / Retract Icon Pill */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-all"
              title={isExpanded ? "Close Controls" : "Select Region"}
            >
              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXPANDABLE SECTION: REGION SELECTOR & DISTRICT CHIPS                     */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="border-t border-white/10 p-3 bg-slate-950/95 flex flex-col gap-3"
            >
              {/* Row 1: Region Selection Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-caption font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1 shrink-0">
                    <Globe size={12} className="text-amber-400" /> Region:
                  </span>
                </div>

                {/* Region Switcher Buttons */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5">
                  {([
                    { id: 'all' as FocusRegionId, label: 'Entire Malawi', icon: Globe, badge: 'All 28' },
                    { id: 'north' as FocusRegionId, label: 'Northern Region', icon: Mountain, badge: 'Nyika / Viphya' },
                    { id: 'central' as FocusRegionId, label: 'Central Region', icon: Wheat, badge: 'Dedza / Lilongwe' },
                    { id: 'south' as FocusRegionId, label: 'Southern Region', icon: Sun, badge: 'Mulanje / Shire' }
                  ]).map((tab) => {
                    const isActive = activeFocusRegion === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          onSelectRegion(tab.id);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer border",
                          isActive
                            ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black border-amber-300 shadow-md shadow-amber-500/20 scale-[1.01]"
                            : "bg-slate-900/90 text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-white hover:bg-slate-800"
                        )}
                        title={`Select ${tab.label}`}
                      >
                        <Icon size={13} className={isActive ? "text-slate-950" : "text-amber-400"} />
                        <span className="truncate">{tab.label}</span>
                        <span className={cn(
                          "text-caption px-1 py-0.2 rounded font-sans hidden lg:inline",
                          isActive ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                        )}>
                          {tab.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: District Horizontal Chips Strip */}
              <div className="bg-slate-900/90 border border-white/10 rounded-xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                <div className="flex items-center gap-1.5 shrink-0 border-r border-white/10 pr-2.5">
                  <Target size={12} className="text-amber-400" />
                  <span className="text-caption font-mono font-bold uppercase text-amber-300">
                    Districts:
                  </span>
                </div>

                {/* All District button to reset to region bounds */}
                <button
                  onClick={() => onSelectDistrict(null)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-caption font-mono transition-all border shrink-0 cursor-pointer flex items-center gap-1",
                    activeDistrict === null
                      ? "bg-amber-500 text-slate-950 font-black border-amber-300 shadow-sm"
                      : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:border-slate-700"
                  )}
                >
                  <span>All Districts</span>
                </button>

                {/* Region Districts Chips */}
                {regionDistricts.map((d) => {
                  const isSelected = activeDistrict?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => onSelectDistrict(isSelected ? null : d)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-caption font-mono transition-all border shrink-0 cursor-pointer flex items-center gap-1.5",
                        isSelected
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-amber-400/40"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-slate-600"
                      )}
                      title={`Select ${d.name}`}
                    >
                      <MapPin size={10} className={isSelected ? "text-slate-950" : "text-amber-400"} />
                      <span className="font-semibold">{d.name}</span>
                      <span className={cn(
                        "text-caption px-1 py-0.2 rounded font-sans",
                        isSelected ? "bg-slate-950/25 text-slate-950 font-black" : "text-emerald-400 bg-emerald-950/50"
                      )}>
                        {d.feasibilityGrade.charAt(0)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Retract Bar Button */}
              <div className="flex items-center justify-end pt-1 border-t border-white/5 text-caption font-mono">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Close</span>
                  <ChevronUp size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
