import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, Plus, Minus, Globe, Target, SlidersHorizontal,
  Satellite, Map as MapIcon, WifiOff, Bot, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';

export interface UnifiedMapHudProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // Layers & Options
  onOpenLayersDeck: () => void;
  activeLayerCount: number;
  isDecluttered?: boolean;
  onToggleDeclutter?: () => void;
  // Basemap Toggle
  tileStyle?: string;
  onToggleSatelliteHybrid?: () => void;
  // AI Map Scout
  onOpenAiScout?: () => void;
  isAiScoutOpen?: boolean;
  // Zoom & Center
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetMapView: () => void;
  activeDistrict?: MalawiDistrictSpec | null;
  onFocusDistrict?: (district: MalawiDistrictSpec) => void;
  // View mode
  viewMode?: 'map' | 'list';
  onToggleViewMode?: () => void;
  // Offline
  isOffline?: boolean;
  onOpenOfflineModal?: () => void;
  // Auto-hide & wake (kept for backward compatibility)
  isAutoHideActive?: boolean;
  onToggleAutoHide?: () => void;
  isDetailsAutoHidden?: boolean;
  onWakeUp?: () => void;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function UnifiedMapHud({
  searchQuery,
  onSearchChange,
  onOpenLayersDeck,
  activeLayerCount,
  tileStyle = 'dark',
  onToggleSatelliteHybrid,
  onZoomIn,
  onZoomOut,
  onResetMapView,
  activeDistrict,
  onFocusDistrict,
  onOpenAiScout,
  isAiScoutOpen = false,
  isOffline = false,
  onOpenOfflineModal,
  onWakeUp,
}: UnifiedMapHudProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const isSatellite = tileStyle === 'satellite' || tileStyle === 'hybrid';

  return (
    <div 
      onMouseEnter={onWakeUp}
      className="absolute right-3 top-14 sm:top-16 z-30 flex flex-col items-end gap-2 pointer-events-auto"
      id="unified-map-hud"
    >
      {/* Search Popout Bar */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-2xl border border-stone-700 rounded-2xl px-3 py-2 shadow-2xl text-white w-64 sm:w-72"
          >
            <Search size={15} className="text-emerald-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search district or location..."
              className="w-full bg-transparent text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-stone-400 hover:text-white p-1 rounded transition-colors"
                title="Clear Search"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="text-xs text-emerald-400 hover:text-emerald-300 px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 shrink-0 cursor-pointer"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean, Intuitive Control Dock */}
      <div className="bg-stone-900/90 dark:bg-stone-950/90 backdrop-blur-2xl border border-stone-700/70 rounded-2xl p-1.5 shadow-2xl flex flex-col items-center gap-1.5 text-stone-200">
        
        {/* 0. AI MAP SCOUT (Maps Grounded Assistant) */}
        {onOpenAiScout && (
          <button
            onClick={onOpenAiScout}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
              isAiScoutOpen
                ? "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-900/50 scale-105"
                : "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900 hover:text-white"
            )}
            title="AI Map Scout (Gemini 3.8 Flash + Google Maps Grounding)"
          >
            <Bot size={18} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
          </button>
        )}

        {/* 1. WHAT TO SHOW (OPTIONS & FEATURES) */}
        <button
          onClick={onOpenLayersDeck}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
            activeLayerCount > 0
              ? "bg-emerald-800 text-emerald-100 hover:bg-emerald-700 shadow-md"
              : "hover:bg-stone-800 text-stone-300 hover:text-white"
          )}
          title={`What to Show on Map (${activeLayerCount} active)`}
        >
          <SlidersHorizontal size={17} />
          {activeLayerCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
              {activeLayerCount}
            </span>
          )}
        </button>

        {/* 2. SATELLITE VS CLEAN MAP TOGGLE */}
        {onToggleSatelliteHybrid && (
          <button
            onClick={onToggleSatelliteHybrid}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
              isSatellite
                ? "bg-sky-900/80 text-sky-200 border border-sky-600/50 shadow-md"
                : "hover:bg-stone-800 text-stone-300 hover:text-white"
            )}
            title={isSatellite ? "Switch to Clean Map" : "Switch to Satellite Aerial Photo"}
          >
            {isSatellite ? <MapIcon size={16} /> : <Satellite size={16} />}
          </button>
        )}

        {/* 3. SEARCH */}
        <button
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative",
            isSearchExpanded || searchQuery
              ? "bg-emerald-700 text-white shadow-md font-bold"
              : "hover:bg-stone-800 text-stone-300 hover:text-white"
          )}
          title={isSearchExpanded ? "Close Search" : "Search districts"}
        >
          <Search size={16} />
          {searchQuery && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        {/* SEPARATOR */}
        <div className="w-5 h-px bg-stone-700/70 my-0.5" />

        {/* 4. ZOOM IN */}
        <button
          onClick={onZoomIn}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-stone-800 text-stone-200 hover:text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus size={17} />
        </button>

        {/* 5. ZOOM OUT */}
        <button
          onClick={onZoomOut}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-stone-800 text-stone-200 hover:text-white transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus size={17} />
        </button>

        {/* 6. RESET TO ALL MALAWI */}
        <button
          onClick={onResetMapView}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-stone-800 text-stone-300 hover:text-emerald-300 transition-colors cursor-pointer"
          title="Show All of Malawi"
        >
          <Globe size={16} />
        </button>

        {/* 7. FOCUS DISTRICT (IF ACTIVE) */}
        {activeDistrict && (
          <button
            onClick={() => onFocusDistrict?.(activeDistrict)}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-800 hover:bg-emerald-700 text-white font-bold transition-all cursor-pointer shadow-md"
            title={`Center on ${activeDistrict.name} District`}
          >
            <Target size={16} />
          </button>
        )}

        {/* 8. OFFLINE NOTICE (IF OFFLINE) */}
        {isOffline && (
          <button
            onClick={onOpenOfflineModal}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-950/80 border border-amber-600/50 text-amber-300 hover:bg-amber-900 transition-all cursor-pointer"
            title="Offline Map Ready"
          >
            <WifiOff size={15} />
          </button>
        )}

      </div>
    </div>
  );
}
