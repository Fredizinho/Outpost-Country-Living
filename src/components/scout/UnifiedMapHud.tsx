import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, Layers, Filter, Compass, Plus, Minus, Globe, 
  Target, Eye, EyeOff, Sliders, List, Map as MapIcon, WifiOff,
  Satellite, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';

export interface UnifiedMapHudProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // Layers & Declutter
  onOpenLayersDeck: () => void;
  activeLayerCount: number;
  isDecluttered: boolean;
  onToggleDeclutter: () => void;
  // Filters & Drawer
  onOpenFilters: () => void;
  activeFilterCount: number;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  // Basemap & Satellite Hybrid Toggle
  tileStyle?: string;
  onToggleSatelliteHybrid?: () => void;
  // Zoom & Center
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetMapView: () => void;
  activeDistrict: MalawiDistrictSpec | null;
  onFocusDistrict?: (district: MalawiDistrictSpec) => void;
  // Auto-hide
  isAutoHideActive: boolean;
  onToggleAutoHide: () => void;
  isDetailsAutoHidden?: boolean;
  onWakeUp?: () => void;
  // View mode
  viewMode: 'map' | 'list';
  onToggleViewMode: () => void;
  // Offline
  isOffline?: boolean;
  onOpenOfflineModal?: () => void;
}

export function UnifiedMapHud({
  searchQuery,
  onSearchChange,
  onOpenLayersDeck,
  activeLayerCount,
  isDecluttered,
  onToggleDeclutter,
  onOpenFilters,
  activeFilterCount,
  isSidebarOpen,
  onToggleSidebar,
  tileStyle = 'dark',
  onToggleSatelliteHybrid,
  onZoomIn,
  onZoomOut,
  onResetMapView,
  activeDistrict,
  onFocusDistrict,
  isAutoHideActive,
  onToggleAutoHide,
  isDetailsAutoHidden = false,
  onWakeUp,
  viewMode,
  onToggleViewMode,
  isOffline = false,
  onOpenOfflineModal
}: UnifiedMapHudProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <div 
      onMouseEnter={onWakeUp}
      className={cn(
        "absolute right-3 top-3 z-30 flex flex-col items-end gap-2 pointer-events-auto transition-all duration-300",
        isDetailsAutoHidden ? "opacity-35 hover:opacity-100" : "opacity-100"
      )}
      id="unified-map-hud"
    >
      {/* Search Popout Bar (Slides out smoothly to the left of the toolbar) */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 bg-slate-950/95 backdrop-blur-2xl border border-amber-500/50 rounded-2xl px-3 py-2 shadow-2xl text-white w-64 sm:w-80"
          >
            <Search size={15} className="text-amber-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search district, station, soil..."
              className="w-full bg-transparent text-white placeholder:text-slate-500 text-xs font-mono font-medium focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                title="Clear Search"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 shrink-0 cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Vertical Floating Toolbar */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col items-center gap-1.5 text-white">
        
        {/* 1. SEARCH TOGGLE */}
        <button
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
            isSearchExpanded || searchQuery
              ? "bg-amber-500 text-slate-950 shadow-md font-bold"
              : "hover:bg-slate-800 text-slate-300 hover:text-amber-300"
          )}
          title={isSearchExpanded ? "Close Search" : "Search Districts & Stations"}
        >
          <Search size={16} />
          {searchQuery && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        {/* 1.5 SATELLITE HYBRID / DARK GIS TOGGLE */}
        {onToggleSatelliteHybrid && (
          <button
            onClick={onToggleSatelliteHybrid}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
              tileStyle === 'satellite' || tileStyle === 'hybrid'
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md"
                : "hover:bg-slate-800 text-slate-300 hover:text-white"
            )}
            title={
              tileStyle === 'satellite' || tileStyle === 'hybrid'
                ? "Active: Satellite Hybrid (Tree canopy & soil imagery). Click for High-Contrast Dark GIS Vector."
                : "One-Tap: Switch to Satellite Hybrid Mode (Tree canopy & high-res terrain)"
            }
          >
            {tileStyle === 'satellite' || tileStyle === 'hybrid' ? (
              <Satellite size={16} className="text-emerald-400" />
            ) : (
              <Moon size={16} className="text-cyan-400" />
            )}
            <span className={cn(
              "absolute -bottom-0.5 text-[8px] font-black uppercase font-mono px-0.5 rounded",
              tileStyle === 'satellite' || tileStyle === 'hybrid' ? "text-emerald-400" : "text-cyan-400"
            )}>
              {tileStyle === 'satellite' || tileStyle === 'hybrid' ? 'SAT' : 'DARK'}
            </span>
          </button>
        )}

        {/* 2. LAYERS DECK */}
        <button
          onClick={onOpenLayersDeck}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative hover:bg-slate-800 text-slate-300 hover:text-sky-300",
            activeLayerCount > 0 && "text-sky-400"
          )}
          title={`GIS Layers & Overlays (${activeLayerCount} active)`}
        >
          <Layers size={16} />
          {activeLayerCount > 0 && (
            <span className="absolute top-1 right-1 bg-sky-500 text-slate-950 font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
              {activeLayerCount}
            </span>
          )}
        </button>

        {/* 3. FILTERS MODAL */}
        <button
          onClick={onOpenFilters}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative hover:bg-slate-800 text-slate-300 hover:text-emerald-300",
            activeFilterCount > 0 && "text-emerald-400"
          )}
          title={`Filter Stations & Soils (${activeFilterCount} active)`}
        >
          <Filter size={16} />
          {activeFilterCount > 0 && (
            <span className="absolute top-1 right-1 bg-emerald-500 text-slate-950 font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* 4. DECLUTTER TOGGLE */}
        <button
          onClick={onToggleDeclutter}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
            isDecluttered
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "hover:bg-slate-800 text-slate-400 hover:text-white"
          )}
          title={isDecluttered ? "Declutter Active (Focus View)" : "Toggle Declutter (Clean Map)"}
        >
          <Sliders size={16} />
          {isDecluttered && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
          )}
        </button>

        {/* 5. OVERVIEW / DOSSIER SHEET TOGGLE */}
        <button
          onClick={onToggleSidebar}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
            isSidebarOpen
              ? "bg-amber-500 text-slate-950 shadow-md font-bold"
              : "hover:bg-slate-800 text-slate-300 hover:text-white"
          )}
          title={isSidebarOpen ? "Close Overview Sheet" : "Open Overview Sheet & Dossier"}
        >
          <Compass size={16} />
        </button>

        {/* 6. LIST / MAP VIEW TOGGLE */}
        <button
          onClick={onToggleViewMode}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:bg-slate-800 text-slate-400 hover:text-white"
          title={viewMode === 'map' ? "Switch to Catalog List" : "Switch to Interactive Map"}
        >
          {viewMode === 'map' ? <List size={16} /> : <MapIcon size={16} />}
        </button>

        {/* SEPARATOR */}
        <div className="w-6 h-px bg-white/10 my-0.5" />

        {/* 7. ZOOM CONTROLS */}
        <button
          onClick={onZoomIn}
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer"
          title="Zoom In (+)"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={onZoomOut}
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer"
          title="Zoom Out (-)"
        >
          <Minus size={16} />
        </button>

        {/* 8. RESET VIEW (ENTIRE MALAWI) */}
        <button
          onClick={onResetMapView}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
          title="Reset Map to Full Malawi Extent"
        >
          <Globe size={16} />
        </button>

        {/* 9. DISTRICT TARGET (IF ACTIVE) */}
        {activeDistrict && (
          <button
            onClick={() => onFocusDistrict?.(activeDistrict)}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shadow-lg"
            title={`Center Camera on ${activeDistrict.name} District`}
          >
            <Target size={16} />
          </button>
        )}

        {/* 10. AUTO-HIDE TOGGLE */}
        <button
          onClick={onToggleAutoHide}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            isAutoHideActive
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400"
              : "hover:bg-slate-800 text-slate-400 hover:text-white"
          )}
          title={isAutoHideActive ? "Auto-Hide Active (extra details fade on pan)" : "Auto-Hide Disabled (details stay pinned)"}
        >
          {isAutoHideActive ? <EyeOff size={16} className="text-emerald-400" /> : <Eye size={16} />}
        </button>

        {/* 11. OFFLINE BADGE (IF OFFLINE) */}
        {isOffline && (
          <button
            onClick={onOpenOfflineModal}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-950/80 border border-amber-500/50 text-amber-400 hover:bg-amber-900 transition-all cursor-pointer"
            title="Offline GIS Vector Pack Active"
          >
            <WifiOff size={15} />
          </button>
        )}

      </div>
    </div>
  );
}
