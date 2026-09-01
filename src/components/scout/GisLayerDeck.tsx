import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, X, Check, Thermometer, Droplets, Sprout, Mountain, 
  AlertTriangle, Waves, MapPin, Eye, EyeOff, Sparkles, Sliders,
  Compass, ShieldCheck, Zap, RefreshCw
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
  showEscarpments: boolean;
  setShowEscarpments: (val: boolean) => void;
  showCatchmentBasins: boolean;
  setShowCatchmentBasins: (val: boolean) => void;
  showRivers: boolean;
  setShowRivers: (val: boolean) => void;
  showDistrictBoundaries: boolean;
  setShowDistrictBoundaries: (val: boolean) => void;
  showParcelBoundary: boolean;
  setShowParcelBoundary: (val: boolean) => void;
  // Presets
  onApplyPreset: (preset: 'clean' | 'climate' | 'soil' | 'water' | 'topo' | 'all') => void;
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
  showEscarpments,
  setShowEscarpments,
  showCatchmentBasins,
  setShowCatchmentBasins,
  showRivers,
  setShowRivers,
  showDistrictBoundaries,
  setShowDistrictBoundaries,
  showParcelBoundary,
  setShowParcelBoundary,
  onApplyPreset,
  isDecluttered,
  onToggleDeclutter
}: GisLayerDeckProps) {
  if (!isOpen) return null;

  const basemaps: { id: TileLayerType; label: string; desc: string; icon: string }[] = [
    { id: 'satellite', label: 'Satellite HD', desc: 'Detailed satellite aerial imagery', icon: '🛰️' },
    { id: 'terrain', label: '3D Terrain', desc: 'Topographic hills, contours & elevation', icon: '🗺️' },
    { id: 'hybrid', label: 'Hybrid View', desc: 'Satellite with high-contrast boundaries & roads', icon: '📍' },
    { id: 'standard', label: 'Clear Map', desc: 'Clean vector map showing towns and roads', icon: '🧭' },
    { id: 'offline-vector', label: 'Offline Vector', desc: '100% on-device map (works with no internet)', icon: '📶' },
  ];

  const presets = [
    { id: 'clean' as const, label: '✨ Clean Map', desc: 'Simple map + district lines only', icon: Sparkles },
    { id: 'climate' as const, label: '🌡️ Climate & Rain', desc: 'Temperatures and rain patterns', icon: Thermometer },
    { id: 'soil' as const, label: '🌱 Soil & Fertility', desc: 'Katondo red loam & soil pH', icon: Sprout },
    { id: 'water' as const, label: '💧 Rivers & Water', desc: 'Flowing rivers & groundwater', icon: Droplets },
    { id: 'topo' as const, label: '⛰️ Hills & Slopes', desc: 'Highlands, mountains & ridges', icon: Mountain },
    { id: 'all' as const, label: '🔍 All Layers', desc: 'Show all map indicators', icon: Layers },
  ];

  const layerItems = [
    {
      id: 'climate',
      name: 'Temperature & Frost Risk',
      desc: 'Highland cold pockets (Dedza/Ntcheu) vs warm lowlands and sunshine zones',
      color: '#f59e0b',
      icon: Thermometer,
      active: showClimateHeatmap,
      toggle: () => setShowClimateHeatmap(!showClimateHeatmap)
    },
    {
      id: 'rainfall',
      name: 'Yearly Rainfall Patterns',
      desc: 'Rainfall zones: 650mm dry valleys to 2,200mm high-rainfall mountain areas',
      color: '#38bdf8',
      icon: Droplets,
      active: showRainfallLayer,
      toggle: () => setShowRainfallLayer(!showRainfallLayer)
    },
    {
      id: 'soil',
      name: 'Soil Types & Acidity (pH)',
      desc: 'Fertile red loam (Katondo), moist valley wetlands (Dambo) & sandy loam',
      color: '#10b981',
      icon: Sprout,
      active: showSoilPhLayer,
      toggle: () => setShowSoilPhLayer(!showSoilPhLayer)
    },
    {
      id: 'elevation',
      name: 'Elevation & Heights',
      desc: 'Height above sea level from Shire valley (50m) to Dedza & Nyika (2,200m+)',
      color: '#fbbf24',
      icon: Mountain,
      active: showElevationLayer,
      toggle: () => setShowElevationLayer(!showElevationLayer)
    },
    {
      id: 'rivers',
      name: 'Permanent Rivers & Streams',
      desc: 'Year-round flowing rivers and streams for irrigation and gravity water',
      color: '#06b6d4',
      icon: Waves,
      active: showRivers,
      toggle: () => setShowRivers(!showRivers)
    },
    {
      id: 'catchments',
      name: 'Water Catchments & Valleys',
      desc: 'Natural watershed valleys and rain runoff collection paths',
      color: '#0ea5e9',
      icon: Droplets,
      active: showCatchmentBasins,
      toggle: () => setShowCatchmentBasins(!showCatchmentBasins)
    },
    {
      id: 'escarpments',
      name: 'Mountain Ridges & Escarpments',
      desc: 'Rift Valley ridges, steep mountain escarpments and hill slopes',
      color: '#f97316',
      icon: AlertTriangle,
      active: showEscarpments,
      toggle: () => setShowEscarpments(!showEscarpments)
    },
    {
      id: 'districts',
      name: '28 District Boundaries',
      desc: 'Official borders and Boma centers for all 28 districts across Malawi',
      color: '#a855f7',
      icon: Compass,
      active: showDistrictBoundaries,
      toggle: () => setShowDistrictBoundaries(!showDistrictBoundaries)
    },
    {
      id: 'parcels',
      name: 'Available Land Parcels',
      desc: 'Surveyed homestead plots with water source notes and verified customary tenure',
      color: '#10b981',
      icon: MapPin,
      active: showParcelBoundary,
      toggle: () => setShowParcelBoundary(!showParcelBoundary)
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-slate-950/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-5 overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="serif text-xl font-bold text-white flex items-center gap-2">
                  Map Layer Controls
                </h3>
                <p className="text-xs text-slate-400">
                  Turn on weather, soil, rivers, and elevation details
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="overflow-y-auto pr-1 flex flex-col gap-6 scrollbar-thin">
            
            {/* 1. Quick Presets Section */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles size={13} /> Quick Map Views
                </span>
                <span className="text-[10px] text-slate-400">Quick 1-click view setups</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onApplyPreset(p.id)}
                    className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-850 text-left transition-all flex flex-col gap-1 cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {p.label}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {p.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Basemap Tile Selector */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Compass size={13} /> Choose Map Style
                </span>
                {onOpenOfflineModal && (
                  <button
                    onClick={onOpenOfflineModal}
                    className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>📶 Offline Settings</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {basemaps.map((b) => {
                  const isSelected = tileLayerType === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => onSelectTileLayer(b.id)}
                      className={cn(
                        "p-3 rounded-2xl border transition-all text-left flex flex-col gap-1 cursor-pointer",
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-950/40 ring-1 ring-amber-400/50"
                          : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{b.icon}</span>
                        {isSelected && <Check size={14} className="text-amber-400" />}
                      </div>
                      <span className="text-xs font-bold mt-1 text-white">{b.label}</span>
                      <span className="text-[9px] text-slate-400 leading-tight line-clamp-2">{b.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Individual Layer Toggles */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers size={13} /> All Map Indicators
                </span>
                <button
                  onClick={onToggleDeclutter}
                  className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Eye size={12} /> {isDecluttered ? 'Enable All Layers' : 'Declutter (Clean View)'}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {layerItems.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.id}
                      onClick={layer.toggle}
                      className={cn(
                        "p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none",
                        layer.active
                          ? "bg-slate-900/90 border-slate-700 hover:border-amber-400/60"
                          : "bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: layer.active ? `${layer.color}20` : '#1e293b',
                            borderColor: layer.active ? layer.color : '#334155',
                            color: layer.color
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className={cn("text-xs font-bold", layer.active ? "text-white" : "text-slate-400")}>
                            {layer.name}
                          </span>
                          <span className="text-[10px] text-slate-400 leading-tight">
                            {layer.desc}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <div className={cn(
                          "w-11 h-6 rounded-full transition-colors p-0.5 flex items-center",
                          layer.active ? "bg-amber-500 justify-end" : "bg-slate-800 justify-start"
                        )}>
                          <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Active Layers: <strong className="text-amber-400">{layerItems.filter(l => l.active).length} of {layerItems.length}</strong>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
