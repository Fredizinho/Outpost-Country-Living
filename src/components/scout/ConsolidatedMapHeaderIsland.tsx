import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Map, FileText, BarChart3, Sprout, 
  Maximize2, Minimize2, Search, Sparkles, Menu, X, 
  MapPin, Calendar, Calculator, Hammer, BookOpen, 
  ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, WifiOff, Globe, Layers, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from '../common/OutpostLogo';
import { LandHubTab } from './UnifiedLandHub';

export interface ConsolidatedMapHeaderIslandProps {
  activeTab: LandHubTab;
  onTabChange: (tab: LandHubTab) => void;
  isFullCanvas: boolean;
  onToggleFullCanvas: () => void;
  viewMode?: 'map' | 'list';
  onToggleViewMode?: () => void;
  isOffline?: boolean;
  activeDistrictName?: string | null;
  onOpenLayersDeck?: () => void;
  activeLayerCount?: number;
}

export function ConsolidatedMapHeaderIsland({
  activeTab,
  onTabChange,
  isFullCanvas,
  onToggleFullCanvas,
  viewMode = 'map',
  onToggleViewMode,
  isOffline = false,
  activeDistrictName,
  onOpenLayersDeck,
  activeLayerCount,
}: ConsolidatedMapHeaderIslandProps) {
  const navigate = useNavigate();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close navigation menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsNavMenuOpen(false);
      }
    }
    if (isNavMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavMenuOpen]);

  const appNavLinks = [
    { label: 'GPS Scout Map', path: '/scout-map', icon: Compass, active: true },
    { label: 'Land & District Matrix', path: '/where', icon: MapPin },
    { label: 'Crops & Soil Pedology', path: '/what', icon: Sprout },
    { label: 'Seasonal Almanac', path: '/seasons', icon: Calendar },
    { label: 'Solar & Borehole Calculators', path: '/calculators', icon: Calculator },
    { label: 'Homestead Skills Manual', path: '/skills', icon: Hammer },
    { label: 'Relocation Blueprint', path: '/how', icon: BookOpen },
  ];

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('outpost:open-search'));
  };

  const handleOpenLayers = () => {
    if (onOpenLayersDeck) {
      onOpenLayersDeck();
    } else {
      window.dispatchEvent(new CustomEvent('outpost:open-layers'));
    }
  };

  const handleOpenCitations = () => {
    window.dispatchEvent(new CustomEvent('outpost:open-citations'));
  };

  // Ultra-compact trigger pill when user activates full canvas
  if (isFullCanvas) {
    return (
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-2">
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          onClick={onToggleFullCanvas}
          className="bg-slate-950/95 backdrop-blur-2xl border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-2xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          title="Restore Consolidated Control Island"
        >
          <Compass size={14} className="text-amber-400 animate-spin-slow" />
          <span>28 Districts Control Island</span>
          <Minimize2 size={12} className="text-amber-400" />
        </motion.button>
      </div>
    );
  }

  return (
    <header 
      id="consolidated-map-control-island"
      className="absolute top-2.5 left-2 right-2 sm:left-3 sm:right-3 z-40 pointer-events-auto select-none"
    >
      <div className="max-w-6xl mx-auto bg-slate-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl px-2.5 sm:px-4 py-1.5 flex items-center justify-between gap-2 sm:gap-3 text-white transition-all">
        
        {/* LEFT SECTION: GIS WORKSPACE INDICATOR */}
        <div className="flex items-center gap-2 shrink-0" ref={menuRef}>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] font-mono font-bold text-amber-300 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span>28 DISTRICTS GIS</span>
            {activeDistrictName && (
              <span className="text-white font-normal text-[10px] truncate max-w-[110px]">
                · {activeDistrictName}
              </span>
            )}
          </div>
        </div>

        {/* CENTER SECTION: CONSOLIDATED MAP MODE TOGGLE DOCK */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-white/10 overflow-x-auto custom-scrollbar shrink-1">
          <button
            onClick={() => onTabChange('scout')}
            className={cn(
              "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'scout'
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="Interactive GPS Map"
          >
            <Compass size={13} className={activeTab === 'scout' ? "text-slate-950" : "text-amber-400"} />
            <span>MAP</span>
          </button>

          <button
            onClick={() => onTabChange('parcels')}
            className={cn(
              "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'parcels'
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="28 Survey Stations Table"
          >
            <FileText size={13} className={activeTab === 'parcels' ? "text-slate-950" : "text-amber-400"} />
            <span className="hidden sm:inline">STATIONS</span>
            <span className="sm:hidden">PLOTS</span>
          </button>

          <button
            onClick={() => onTabChange('comparison')}
            className={cn(
              "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'comparison'
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="District Comparative Analytics"
          >
            <BarChart3 size={13} className={activeTab === 'comparison' ? "text-slate-950" : "text-sky-400"} />
            <span>ANALYTICS</span>
          </button>

          <button
            onClick={() => onTabChange('soilScience')}
            className={cn(
              "px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'soilScience'
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="Soil Science & Crops Guide"
          >
            <Sprout size={13} className={activeTab === 'soilScience' ? "text-slate-950" : "text-emerald-400"} />
            <span className="hidden sm:inline">SOIL GUIDE</span>
            <span className="sm:hidden">SOIL</span>
          </button>
        </div>

        {/* RIGHT SECTION: SHORTCUTS & FULL CANVAS CONTROLS */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Get AI Insights Button */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('outpost:open-ai-insights'));
            }}
            className="h-8 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-amber-600/30 hover:from-emerald-600/50 hover:to-amber-600/50 border border-emerald-400/50 text-emerald-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-emerald-500/20 active:scale-95"
            title="Get Field Insights on visible map view & layers"
          >
            <Sparkles size={13} className="text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI Insights</span>
          </button>

          {/* Quick Search Shortcut */}
          <button
            onClick={handleOpenSearch}
            className="h-8 px-2 sm:px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            title="Search Land & Districts (Cmd+K)"
          >
            <Search size={13} className="text-amber-400" />
            <span className="hidden lg:inline text-[11px] text-slate-400 font-normal">Cmd+K</span>
          </button>

          {/* What to Show on Map */}
          <button
            onClick={handleOpenLayers}
            className="h-8 px-2 sm:px-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="What to Show on Map (Layers & Options)"
          >
            <Eye size={13} className="text-emerald-400" />
            <span className="hidden md:inline">What to Show</span>
            {activeLayerCount !== undefined && activeLayerCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                {activeLayerCount}
              </span>
            )}
          </button>

          {/* Full Canvas Maximizer */}
          <button
            onClick={onToggleFullCanvas}
            className="h-8 px-2 sm:px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            title="Maximize Vertical Map Real Estate"
          >
            <Maximize2 size={13} className="text-amber-400" />
            <span className="hidden xl:inline text-[11px]">Full Canvas</span>
          </button>
        </div>

      </div>
    </header>
  );
}
