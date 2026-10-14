import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Map, FileText, BarChart3, Sprout, 
  Maximize2, Minimize2, Search, Sparkles, Menu, X, 
  MapPin, Calendar, Calculator, Hammer, BookOpen, 
  ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, WifiOff, Globe, Layers, Eye,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from '../common/OutpostLogo';
import { LandHubTab } from './UnifiedLandHub';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { isLight, isDark, isField } = useTheme();
  const navigate = useNavigate();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  // Close navigation and overflow menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsNavMenuOpen(false);
      }
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setIsOverflowOpen(false);
      }
    }
    if (isNavMenuOpen || isOverflowOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavMenuOpen, isOverflowOpen]);

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
          <Compass size={14} className="text-amber-400" />
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
      <div className={cn(
        "max-w-6xl mx-auto backdrop-blur-2xl rounded-2xl shadow-2xl px-2.5 sm:px-4 py-1.5 flex items-center justify-between gap-2 sm:gap-3 transition-all border",
        isField
          ? "bg-black text-white border-2 border-white"
          : isLight
          ? "bg-[#FAF6F0]/95 text-[#1A1612] border-[#E3D8CC] shadow-raised"
          : "bg-slate-950/90 text-white border-white/15"
      )}>
        
        {/* LEFT SECTION: GIS WORKSPACE INDICATOR */}
        <div className="flex items-center gap-2 shrink-0" ref={menuRef}>
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-caption font-mono font-bold shrink-0 border",
            isField
              ? "bg-black text-white border-white"
              : isLight
              ? "bg-[#F3ECE2] text-[#1A1612] border-[#E3D8CC]"
              : "bg-amber-500/10 border-amber-500/30 text-amber-300"
          )}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="normal-case">28 Districts GIS</span>
            {activeDistrictName && (
              <span className="font-normal text-caption truncate max-w-[110px]">
                · {activeDistrictName}
              </span>
            )}
          </div>
        </div>

        {/* CENTER SECTION: CONSOLIDATED MAP MODE TOGGLE DOCK */}
        <div className={cn(
          "flex items-center gap-1 p-1 rounded-xl border overflow-x-auto custom-scrollbar shrink-1",
          isField
            ? "bg-black border-white"
            : isLight
            ? "bg-[#F3ECE2] border-[#E3D8CC]"
            : "bg-slate-900/90 border-white/10"
        )}>
          <button
            onClick={() => onTabChange('scout')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 sm:py-1 min-h-[44px] sm:min-h-[34px] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer normal-case select-none",
              activeTab === 'scout'
                ? isField
                  ? "bg-white text-black font-bold shadow-md"
                  : isLight
                  ? "bg-[#C85A32] text-white font-bold shadow-md"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : isLight
                ? "text-[#6E6255] hover:text-[#1A1612] hover:bg-white/60"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="Interactive GPS Map"
          >
            <Compass size={14} className={activeTab === 'scout' ? (isLight ? "text-white" : "text-slate-950") : (isLight ? "text-[#C85A32]" : "text-amber-400")} />
            <span>Map</span>
          </button>

          <button
            onClick={() => onTabChange('parcels')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 sm:py-1 min-h-[44px] sm:min-h-[34px] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer normal-case select-none",
              activeTab === 'parcels'
                ? isField
                  ? "bg-white text-black font-bold shadow-md"
                  : isLight
                  ? "bg-[#C85A32] text-white font-bold shadow-md"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : isLight
                ? "text-[#6E6255] hover:text-[#1A1612] hover:bg-white/60"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="28 Survey Stations Table"
          >
            <FileText size={14} className={activeTab === 'parcels' ? (isLight ? "text-white" : "text-slate-950") : (isLight ? "text-[#C85A32]" : "text-amber-400")} />
            <span className="hidden sm:inline">Stations</span>
            <span className="sm:hidden">Plots</span>
          </button>

          <button
            onClick={() => onTabChange('comparison')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 sm:py-1 min-h-[44px] sm:min-h-[34px] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer normal-case select-none",
              activeTab === 'comparison'
                ? isField
                  ? "bg-white text-black font-bold shadow-md"
                  : isLight
                  ? "bg-[#C85A32] text-white font-bold shadow-md"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : isLight
                ? "text-[#6E6255] hover:text-[#1A1612] hover:bg-white/60"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="District Comparative Analytics"
          >
            <BarChart3 size={14} className={activeTab === 'comparison' ? (isLight ? "text-white" : "text-slate-950") : "text-sky-400"} />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => onTabChange('soilScience')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 sm:py-1 min-h-[44px] sm:min-h-[34px] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer normal-case select-none",
              activeTab === 'soilScience'
                ? isField
                  ? "bg-white text-black font-bold shadow-md"
                  : isLight
                  ? "bg-[#C85A32] text-white font-bold shadow-md"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md"
                : isLight
                ? "text-[#6E6255] hover:text-[#1A1612] hover:bg-white/60"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
            title="Soil Science & Crops Guide"
          >
            <Sprout size={14} className={activeTab === 'soilScience' ? (isLight ? "text-white" : "text-slate-950") : "text-emerald-500"} />
            <span className="hidden sm:inline">Soil Guide</span>
            <span className="sm:hidden">Soil</span>
          </button>
        </div>

        {/* RIGHT SECTION: SHORTCUTS & FULL CANVAS CONTROLS */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Visible on medium & large screens */}
          <div className="hidden md:flex items-center gap-1 sm:gap-1.5">
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
              <span className="hidden lg:inline text-caption text-slate-400 font-normal">Cmd+K</span>
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
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-caption flex items-center justify-center">
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
              <span className="hidden xl:inline text-caption">Full Canvas</span>
            </button>
          </div>

          {/* OVERFLOW MENU: Collapses tools on narrow/mobile viewports instead of clipping */}
          <div className="relative md:hidden flex items-center" ref={overflowRef}>
            <button
              type="button"
              onClick={() => setIsOverflowOpen(prev => !prev)}
              className={cn(
                "min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition-all cursor-pointer",
                isOverflowOpen
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                  : "bg-white/5 hover:bg-white/10 border-white/15 text-slate-300 hover:text-white"
              )}
              title="More map tools"
              aria-label="More map tools"
            >
              <MoreHorizontal size={18} />
            </button>

            <AnimatePresence>
              {isOverflowOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-56 bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1.5 text-xs font-sans"
                >
                  <button
                    onClick={() => {
                      setIsOverflowOpen(false);
                      window.dispatchEvent(new CustomEvent('outpost:open-ai-insights'));
                    }}
                    className="min-h-[44px] px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Sparkles size={16} className="text-amber-300 shrink-0" />
                    <span className="font-bold">AI Field Insights</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOverflowOpen(false);
                      handleOpenSearch();
                    }}
                    className="min-h-[44px] px-3 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Search size={16} className="text-amber-400 shrink-0" />
                    <span>Search Districts</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOverflowOpen(false);
                      handleOpenLayers();
                    }}
                    className="min-h-[44px] px-3 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Eye size={14} className="text-emerald-400 shrink-0" />
                      <span>What to Show (Layers)</span>
                    </div>
                    {activeLayerCount !== undefined && activeLayerCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-caption flex items-center justify-center">
                        {activeLayerCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsOverflowOpen(false);
                      onToggleFullCanvas();
                    }}
                    className="p-2 rounded-xl hover:bg-white/10 text-stone-300 hover:text-amber-300 flex items-center gap-2 cursor-pointer transition-colors border-t border-white/10"
                  >
                    <Maximize2 size={14} className="text-amber-400 shrink-0" />
                    <span>Full Canvas Map</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  );
}
