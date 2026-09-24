import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Thermometer, Droplets, Sprout, Mountain, 
  AlertTriangle, Waves, MapPin, Eye, Sparkles, SlidersHorizontal,
  Compass, ShieldCheck, Heart, Feather, CloudRain,
  Landmark, Layers, Moon, Home as HomeIcon, Sun, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TileLayerType } from './ScoutingMap';

export interface GisLayerDeckProps {
  isOpen: boolean;
  onClose: () => void;
  // Basemap
  tileLayerType: TileLayerType;
  onSelectTileLayer: (type: TileLayerType) => void;
  onOpenOfflineModal?: () => void;
  // Layer states
  showClimateHeatmap: boolean;
  setShowClimateHeatmap: (val: boolean) => void;
  showRainfallLayer: boolean;
  setShowRainfallLayer: (val: boolean) => void;
  showSoilPhLayer: boolean;
  setShowSoilPhLayer: (val: boolean) => void;
  showElevationLayer: boolean;
  setShowElevationLayer: (val: boolean) => void;
  showContourLines?: boolean;
  setShowContourLines?: (val: boolean) => void;
  showEscarpments: boolean;
  setShowEscarpments: (val: boolean) => void;
  showCatchmentBasins: boolean;
  setShowCatchmentBasins: (val: boolean) => void;
  showRivers: boolean;
  setShowRivers: (val: boolean) => void;
  showDistrictBoundaries: boolean;
  setShowDistrictBoundaries: (val: boolean) => void;
  showCustomaryBoundaries?: boolean;
  setShowCustomaryBoundaries?: (val: boolean) => void;
  showParcelBoundary: boolean;
  setShowParcelBoundary: (val: boolean) => void;
  showCommunitySettlements?: boolean;
  setShowCommunitySettlements?: (val: boolean) => void;
  // Presets
  onApplyPreset: (preset: 'egw' | 'clean' | 'climate' | 'soil' | 'water' | 'topo' | 'all') => void;
  isDecluttered: boolean;
  onToggleDeclutter: () => void;
}

export function GisLayerDeck({
  isOpen,
  onClose,
  tileLayerType,
  onSelectTileLayer,
  onOpenOfflineModal,
  showClimateHeatmap,
  setShowClimateHeatmap,
  showRainfallLayer,
  setShowRainfallLayer,
  showSoilPhLayer,
  setShowSoilPhLayer,
  showElevationLayer,
  setShowElevationLayer,
  showContourLines,
  setShowContourLines,
  showEscarpments,
  setShowEscarpments,
  showCatchmentBasins,
  setShowCatchmentBasins,
  showRivers,
  setShowRivers,
  showDistrictBoundaries,
  setShowDistrictBoundaries,
  showCustomaryBoundaries,
  setShowCustomaryBoundaries,
  showParcelBoundary,
  setShowParcelBoundary,
  showCommunitySettlements,
  setShowCommunitySettlements,
  onApplyPreset,
}: GisLayerDeckProps) {
  if (!isOpen) return null;

  const basemaps: { id: TileLayerType; label: string; desc: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'standard', label: 'Clean Map', desc: 'Clear roads, towns, and district borders', icon: Compass },
    { id: 'satellite', label: 'Satellite Photo', desc: 'Real aerial imagery of trees, green hills & terrain', icon: Layers },
    { id: 'hybrid', label: 'Photo + Roads', desc: 'Satellite photos with borders & town labels', icon: MapPin },
    { id: 'terrain', label: 'Hills & Slopes', desc: 'Shaded hills and mountain elevation', icon: Mountain },
    { id: 'dark', label: 'Night Mode', desc: 'Gentle dark background for night reading', icon: Moon },
  ];

  const presets = [
    { 
      id: 'egw' as const, 
      label: 'Country Living Essentials', 
      tag: 'EGW Recommended',
      desc: 'Living streams, fertile Katondo soil, good rainfall & homesteads', 
      icon: Feather,
      iconColor: 'text-amber-300',
      highlight: true
    },
    { 
      id: 'water' as const, 
      label: 'Pure Water Sources', 
      tag: 'Water & Springs',
      desc: 'Perennial rivers, flowing streams & shallow aquifers', 
      icon: Droplets,
      iconColor: 'text-sky-300',
      highlight: false
    },
    { 
      id: 'soil' as const, 
      label: 'Good Farming Soil', 
      tag: 'Gardens & Loam',
      desc: 'Rich red Katondo soil & fertile agricultural land', 
      icon: Sprout,
      iconColor: 'text-emerald-300',
      highlight: false
    },
    { 
      id: 'clean' as const, 
      label: 'Clear Simple Map', 
      tag: 'Quiet View',
      desc: 'Hides all overlays for a calm, distraction-free view', 
      icon: Eye,
      iconColor: 'text-stone-300',
      highlight: false
    },
  ];

  const layerItems = [
    {
      id: 'rivers',
      icon: Droplets,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/80 border-cyan-800/60',
      name: 'Living Rivers & Streams',
      desc: 'Year-round flowing rivers and streams for drinking water, gravity supply & garden irrigation',
      color: '#06b6d4',
      active: showRivers,
      toggle: () => setShowRivers(!showRivers)
    },
    {
      id: 'soil',
      icon: Sprout,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/80 border-emerald-800/60',
      name: 'Good Farming Soil (Katondo Red Loam)',
      desc: 'Rich, fertile red loam (pH 6.0–6.5) ideal for fruit orchards, family gardens, and staple crops',
      color: '#10b981',
      active: showSoilPhLayer,
      toggle: () => setShowSoilPhLayer(!showSoilPhLayer)
    },
    {
      id: 'rainfall',
      icon: CloudRain,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-950/80 border-sky-800/60',
      name: 'High Rainfall Areas (1,000mm+)',
      desc: 'Highlight regions with abundant, dependable seasonal rains for self-sufficient farming',
      color: '#38bdf8',
      active: showRainfallLayer,
      toggle: () => setShowRainfallLayer(!showRainfallLayer)
    },
    {
      id: 'parcels',
      icon: HomeIcon,
      iconColor: 'text-lime-400',
      iconBg: 'bg-lime-950/80 border-lime-800/60',
      name: 'Homestead Plots & Outposts',
      desc: 'Verified rural homestead locations, mission training outposts, and agricultural parcels',
      color: '#22c55e',
      active: showParcelBoundary,
      toggle: () => setShowParcelBoundary(!showParcelBoundary)
    },
    {
      id: 'elevation',
      icon: Mountain,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-950/80 border-amber-800/60',
      name: 'Highlands & Pure Air',
      desc: 'Elevated plateaus and mountain slopes with cool breezes, lower humidity, and fresh country air',
      color: '#f59e0b',
      active: showElevationLayer,
      toggle: () => setShowElevationLayer(!showElevationLayer)
    },
    {
      id: 'districts',
      icon: Landmark,
      iconColor: 'text-teal-400',
      iconBg: 'bg-teal-950/80 border-teal-800/60',
      name: 'District Boundaries',
      desc: 'Clear, readable border lines and administrative centers across Malawi’s 28 districts',
      color: '#06b6d4',
      active: showDistrictBoundaries,
      toggle: () => setShowDistrictBoundaries(!showDistrictBoundaries)
    },
    {
      id: 'catchments',
      icon: Waves,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-950/80 border-blue-800/60',
      name: 'Valleys & Natural Runoff',
      desc: 'Natural watershed valleys where moisture gathers naturally during dry months',
      color: '#0ea5e9',
      active: showCatchmentBasins,
      toggle: () => setShowCatchmentBasins(!showCatchmentBasins)
    },
    {
      id: 'climate',
      icon: Sun,
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-950/80 border-orange-800/60',
      name: 'Warm vs Cool Growing Zones',
      desc: 'Shows high-altitude cool climates (Dedza, Viphya) compared to warmer valley floors',
      color: '#f97316',
      active: showClimateHeatmap,
      toggle: () => setShowClimateHeatmap(!showClimateHeatmap)
    },
    ...(setShowCommunitySettlements ? [{
      id: 'settlements',
      icon: Users,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-950/80 border-amber-800/60',
      name: 'Community Settlements & Outposts',
      desc: 'Adventist mission centers, rural farming settlements, highland outposts, and agricultural bomas',
      color: '#fbbf24',
      active: !!showCommunitySettlements,
      toggle: () => setShowCommunitySettlements(!showCommunitySettlements)
    }] : []),
  ];

  const activeCount = layerItems.filter(l => l.active).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-stone-900/95 dark:bg-stone-950/95 backdrop-blur-2xl border border-stone-700/60 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 overflow-hidden text-stone-100"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-stone-700/50 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <h3 className="serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  What to Show on the Map
                </h3>
                <p className="text-xs text-stone-300">
                  Select the physical features and land details you want to view
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close options"
            >
              <X size={16} />
            </button>
          </div>

          {/* Ellen G. White Inspired Thought Banner */}
          <div className="bg-emerald-950/60 border border-emerald-700/40 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-100">
            <div className="w-7 h-7 rounded-xl bg-emerald-900 border border-emerald-600/60 flex items-center justify-center shrink-0 text-emerald-300 shadow-2xs">
              <Sprout size={15} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="italic leading-relaxed">
                "An abundance of pure water, fresh air, and fertile soil are among the greatest physical blessings we can secure in country living."
              </p>
              <span className="text-[11px] font-semibold text-emerald-300">
                — Ellen G. White, Country Living
              </span>
            </div>
          </div>

          <div className="overflow-y-auto pr-1 flex flex-col gap-5 scrollbar-thin">
            
            {/* 1. Quick 1-Click Views */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles size={13} /> Quick Choices
                </span>
                <span className="text-[11px] text-stone-400">1-click setups</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presets.map((p) => {
                  const PresetIcon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onApplyPreset(p.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer group",
                        p.highlight 
                          ? "bg-emerald-950/70 border-emerald-600/60 hover:bg-emerald-900/70"
                          : "bg-stone-800/80 border-stone-700 hover:bg-stone-800"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn("text-xs font-bold flex items-center gap-1.5", p.highlight ? "text-amber-200" : "text-white")}>
                          <PresetIcon size={14} className={p.iconColor} />
                          <span>{p.label}</span>
                        </span>
                        <span className={cn(
                          "text-[9px] px-2 py-0.5 rounded-full font-semibold",
                          p.highlight ? "bg-emerald-800 text-emerald-200" : "bg-stone-700 text-stone-300"
                        )}>
                          {p.tag}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-300 leading-snug">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose What Appears on the Map */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Eye size={13} /> Features to Show ({activeCount} active)
                </span>
                <button
                  onClick={() => onApplyPreset('clean')}
                  className="text-[11px] text-stone-400 hover:text-stone-200 underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {layerItems.map((layer) => {
                  const LayerIcon = layer.icon;
                  return (
                    <div
                      key={layer.id}
                      onClick={layer.toggle}
                      className={cn(
                        "p-3 rounded-2xl border transition-all flex items-start justify-between gap-2.5 cursor-pointer select-none",
                        layer.active
                          ? "bg-stone-800/90 border-emerald-500/60 shadow-sm"
                          : "bg-stone-900/50 border-stone-800 opacity-60 hover:opacity-90"
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={cn(
                          "w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs mt-0.5",
                          layer.iconBg
                        )}>
                          <LayerIcon size={15} className={layer.iconColor} />
                        </div>
                        <div className="flex flex-col">
                          <span className={cn("text-xs font-bold leading-tight", layer.active ? "text-white" : "text-stone-400")}>
                            {layer.name}
                          </span>
                          <span className="text-[11px] text-stone-300 leading-snug mt-0.5">
                            {layer.desc}
                          </span>
                        </div>
                      </div>

                      {/* Checkbox / Toggle Indicator */}
                      <div className="shrink-0 pt-0.5">
                        <div className={cn(
                          "w-5 h-5 rounded-lg border flex items-center justify-center transition-colors",
                          layer.active 
                            ? "bg-emerald-600 border-emerald-400 text-white" 
                            : "border-stone-600 bg-stone-800/80"
                        )}>
                          {layer.active && <Check size={13} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Choose Map Style */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Compass size={13} /> Map Appearance
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {basemaps.map((b) => {
                  const BIcon = b.icon;
                  const isSelected = tileLayerType === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => onSelectTileLayer(b.id)}
                      className={cn(
                        "p-2.5 rounded-2xl border transition-all text-left flex flex-col gap-1 cursor-pointer",
                        isSelected
                          ? "bg-emerald-950/90 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400"
                          : "bg-stone-800/70 border-stone-700 text-stone-300 hover:border-stone-500 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "w-7 h-7 rounded-xl flex items-center justify-center border",
                          isSelected 
                            ? "bg-emerald-900 border-emerald-400 text-emerald-200" 
                            : "bg-stone-900/80 border-stone-700 text-stone-300"
                        )}>
                          <BIcon size={14} />
                        </div>
                        {isSelected && <Check size={13} className="text-emerald-400" strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-bold text-white leading-tight mt-0.5">{b.label}</span>
                      <span className="text-[10px] text-stone-400 leading-tight line-clamp-2">{b.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-stone-700/50 flex items-center justify-between">
            <span className="text-xs text-stone-300">
              Showing <strong className="text-emerald-400">{activeCount}</strong> selected features
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
