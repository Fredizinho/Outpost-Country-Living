import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sprout, Users, Layers, SlidersHorizontal, 
  ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, Check,
  Waves, Mountain, Home as HomeIcon, Info, Compass, Bot, ArrowRight,
  BookOpen, CloudRain, Landmark, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractiveSymbologyLegend } from './InteractiveSymbologyLegend';
import { useTheme } from '@/contexts/ThemeContext';

export interface ThematicLayerState {
  waterSources: boolean;
  arableLand: boolean;
  communitySettlements: boolean;
  rainfallIsohyets?: boolean;
  elevationTiers?: boolean;
  catchmentBasins?: boolean;
  riftEscarpments?: boolean;
  districtBoundaries?: boolean;
}

export interface ThematicLayerControlPanelProps {
  // All 8 thematic layer states
  waterSources: boolean;
  onToggleWaterSources: (active: boolean) => void;
  arableLand: boolean;
  onToggleArableLand: (active: boolean) => void;
  communitySettlements: boolean;
  onToggleCommunitySettlements: (active: boolean) => void;
  rainfallIsohyets?: boolean;
  onToggleRainfallIsohyets?: (active: boolean) => void;
  elevationTiers?: boolean;
  onToggleElevationTiers?: (active: boolean) => void;
  catchmentBasins?: boolean;
  onToggleCatchmentBasins?: (active: boolean) => void;
  riftEscarpments?: boolean;
  onToggleRiftEscarpments?: (active: boolean) => void;
  districtBoundaries?: boolean;
  onToggleDistrictBoundaries?: (active: boolean) => void;
  
  // Quick combo presets
  onApplyThemePreset?: (preset: 'all-on' | 'all-off' | 'homestead-ready') => void;
  
  // Extended configuration hook
  onOpenAdvancedLayers?: () => void;
  onOpenAiScout?: () => void;
  onGetAiInsights?: () => void;
  onSelectDistrictFocus?: (districtName: string) => void;
  
  // Auto-hide awareness
  isAutoHidden?: boolean;
  onWakeUp?: () => void;
  className?: string;
}

export function ThematicLayerControlPanel({
  waterSources,
  onToggleWaterSources,
  arableLand,
  onToggleArableLand,
  communitySettlements,
  onToggleCommunitySettlements,
  rainfallIsohyets = false,
  onToggleRainfallIsohyets,
  elevationTiers = false,
  onToggleElevationTiers,
  catchmentBasins = false,
  onToggleCatchmentBasins,
  riftEscarpments = false,
  onToggleRiftEscarpments,
  districtBoundaries = true,
  onToggleDistrictBoundaries,
  onApplyThemePreset,
  onOpenAdvancedLayers,
  onOpenAiScout,
  onGetAiInsights,
  onSelectDistrictFocus,
  isAutoHidden = false,
  onWakeUp,
  className
}: ThematicLayerControlPanelProps) {
  const { isLight, isDark, isField } = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'layers' | 'legend'>('layers');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);

  // 8 Thematic GIS Layers
  const thematicLayers = [
    {
      id: 'waterSources',
      title: 'Water Sources & Streams',
      shortTitle: 'Water',
      subtitle: 'Living Streams & Aquifers',
      desc: 'Perennial rivers, gravity stream headwaters, and borehole static water levels (<15m–30m depth). Siting near continuous gravity water eliminates reliance on electrical grid pumping.',
      icon: Droplets,
      active: waterSources,
      badge: 'Aquifer & Rivers',
      color: '#38bdf8',
      activeBg: 'bg-sky-500/20 border-sky-400 text-sky-200',
      activeDot: 'bg-sky-400 shadow-[0_0_8px_#38bdf8]',
      toggle: () => onToggleWaterSources(!waterSources)
    },
    {
      id: 'arableLand',
      title: 'Arable Land & Katondo Soils',
      shortTitle: 'Arable',
      subtitle: 'Katondo Red Loam (pH 6.0–6.5)',
      desc: 'Premier agricultural soils of Malawi. Deep, well-drained ferrallitic latosols ideal for self-sustaining orchards, heirloom grain legumes, and composted bio-intensive vegetable beds.',
      icon: Sprout,
      active: arableLand,
      badge: 'Soil & Loam',
      color: '#34d399',
      activeBg: 'bg-emerald-500/20 border-emerald-400 text-emerald-200',
      activeDot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
      toggle: () => onToggleArableLand(!arableLand)
    },
    {
      id: 'communitySettlements',
      title: 'Community Settlements & Outposts',
      shortTitle: 'Settlements',
      subtitle: 'Adventist Outpost Hubs & Clinics',
      desc: 'Decentralized rural church companies, lifestyle health sanitarium outposts, and family homestead clusters providing fellowship, mutual defense, and medical missionary service.',
      icon: Users,
      active: communitySettlements,
      badge: 'Villages & Hubs',
      color: '#fbbf24',
      activeBg: 'bg-amber-500/20 border-amber-400 text-amber-200',
      activeDot: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
      toggle: () => onToggleCommunitySettlements(!communitySettlements)
    },
    {
      id: 'rainfallIsohyets',
      title: 'Rainfall Isohyets & Precipitation',
      shortTitle: 'Rainfall',
      subtitle: 'Monsoonal Isohyet Contours',
      desc: 'Annual precipitation bands (800mm to 1,600mm/yr). Key indicator for rainwater harvesting cistern sizing and dry-season irrigation reservoir requirements.',
      icon: CloudRain,
      active: rainfallIsohyets,
      badge: '800–1600mm',
      color: '#60a5fa',
      activeBg: 'bg-blue-500/20 border-blue-400 text-blue-200',
      activeDot: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]',
      toggle: () => onToggleRainfallIsohyets ? onToggleRainfallIsohyets(!rainfallIsohyets) : onToggleWaterSources(!waterSources)
    },
    {
      id: 'elevationTiers',
      title: 'Elevation Tiers & Thermal Belts',
      shortTitle: 'Elevation',
      subtitle: 'Highland Inversion (1,200–1,600m)',
      desc: 'Temperate highland zones safe from frost drainage and lowland mosquito humidity. Ideal for temperate subtropical fruit trees, macadamia, and year-round vegetable yields.',
      icon: Mountain,
      active: elevationTiers,
      badge: 'Thermal Belt',
      color: '#a78bfa',
      activeBg: 'bg-purple-500/20 border-purple-400 text-purple-200',
      activeDot: 'bg-purple-400 shadow-[0_0_8px_#a78bfa]',
      toggle: () => onToggleElevationTiers ? onToggleElevationTiers(!elevationTiers) : null
    },
    {
      id: 'catchmentBasins',
      title: 'Catchment Basins & Dambo Sponges',
      shortTitle: 'Catchments',
      subtitle: 'Natural Hydrological Sponges',
      desc: 'Broad valley depressions storing wet-season runoff. Upper dambo margins allow year-round green relay gardening (Dimba) without expensive mechanized irrigation.',
      icon: Waves,
      active: catchmentBasins,
      badge: 'Dambo Hydrology',
      color: '#2dd4bf',
      activeBg: 'bg-teal-500/20 border-teal-400 text-teal-200',
      activeDot: 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]',
      toggle: () => onToggleCatchmentBasins ? onToggleCatchmentBasins(!catchmentBasins) : null
    },
    {
      id: 'riftEscarpments',
      title: 'Rift Escarpments & Slopes',
      shortTitle: 'Escarpment',
      subtitle: 'Steep Gradients & Keyline Swales',
      desc: 'Great Rift Valley elevation drops requiring Vetiver grass contour bunds and terraced agroforestry swales to prevent monsoonal topsoil erosion.',
      icon: Compass,
      active: riftEscarpments,
      badge: 'Keyline Terracing',
      color: '#f97316',
      activeBg: 'bg-orange-500/20 border-orange-400 text-orange-200',
      activeDot: 'bg-orange-400 shadow-[0_0_8px_#f97316]',
      toggle: () => onToggleRiftEscarpments ? onToggleRiftEscarpments(!riftEscarpments) : null
    },
    {
      id: 'districtBoundaries',
      title: 'District & Cadastral Boundaries',
      shortTitle: 'Boundaries',
      subtitle: 'Demarcation Lines & TA Zones',
      desc: 'Administrative boundaries, Traditional Authority (TA) jurisdictions, and verified survey stations under the Customary Land Act framework.',
      icon: Landmark,
      active: districtBoundaries,
      badge: '28 Districts',
      color: '#e2e8f0',
      activeBg: 'bg-stone-500/20 border-stone-300 text-stone-200',
      activeDot: 'bg-stone-200 shadow-[0_0_8px_#e2e8f0]',
      toggle: () => onToggleDistrictBoundaries ? onToggleDistrictBoundaries(!districtBoundaries) : null
    }
  ];

  const activeCount = thematicLayers.filter(l => l.active).length;

  return (
    <>
      {/* DESKTOP FLOATING PANEL (>= 768px) */}
      <div
        onMouseEnter={onWakeUp}
        className={cn(
          "hidden md:block absolute left-3 top-20 sm:top-24 z-20 pointer-events-auto transition-all duration-300 font-sans",
          isAutoHidden ? "opacity-35 hover:opacity-100" : "opacity-100",
          className
        )}
        id="thematic-map-layers-panel"
      >
        <div className={cn(
          "border rounded-[10px] shadow-sm overflow-hidden flex flex-col transition-colors duration-200 font-chrome text-[13px]",
          isField
            ? "bg-black border-2 border-white text-white"
            : "bg-[#FFFDF8] border-[#E4DCCB] text-[#1F2A22]",
          activeTab === 'legend' ? "w-[330px] sm:w-[380px]" : "w-[300px] sm:w-[320px]"
        )}>
        
        {/* Panel Header */}
        <div className="px-3.5 py-2.5 bg-[#F6F1E7] border-b border-[#E4DCCB] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5.5 h-5.5 rounded-[4px] bg-[#E4DCCB] flex items-center justify-center text-[#2B4636]">
              <Layers size={13} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium text-[13px] text-[#1F2A22]">
                  Layers
                </h3>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#3F6B4E]/15 text-[#3F6B4E] font-medium border border-[#3F6B4E]/30">
                  {activeCount} active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onOpenAdvancedLayers && (
              <button
                onClick={onOpenAdvancedLayers}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Open all GIS layer controls"
              >
                <SlidersHorizontal size={13} />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isExpanded ? "Collapse layer panel" : "Expand layer panel"}
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Collapsible Layer Toggle List or Interactive Legend */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-2.5 flex flex-col gap-2 bg-[#FFFDF8] max-h-[calc(100vh-140px)]"
            >
              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 p-0.5 bg-[#F6F1E7] border border-[#E4DCCB] rounded-[6px] shrink-0 text-[12px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('layers')}
                  className={cn(
                    "flex-1 py-1 px-2 rounded-[4px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                    activeTab === 'layers'
                      ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
                      : "text-[#5A6458] hover:text-[#1F2A22]"
                  )}
                >
                  <Layers size={12} />
                  <span>Thematic Layers</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('legend')}
                  className={cn(
                    "flex-1 py-1 px-2 rounded-[4px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                    activeTab === 'legend'
                      ? "bg-[#FFFDF8] text-[#1F2A22] shadow-xs font-semibold"
                      : "text-[#5A6458] hover:text-[#1F2A22]"
                  )}
                >
                  <BookOpen size={12} />
                  <span>Legend</span>
                </button>
              </div>

              {activeTab === 'legend' ? (
                <InteractiveSymbologyLegend
                  showWaterSources={waterSources}
                  showArableLand={arableLand}
                  showCommunitySettlements={communitySettlements}
                  onToggleWaterSources={onToggleWaterSources}
                  onToggleArableLand={onToggleArableLand}
                  onToggleCommunitySettlements={onToggleCommunitySettlements}
                  onSelectDistrictFocus={onSelectDistrictFocus}
                />
              ) : (
                <>
                  <div
                    id="thematic-controls-layer-list"
                    className="flex flex-col gap-1.5 overflow-y-auto min-h-0 max-h-[360px] sm:max-h-[420px] custom-scrollbar pr-1"
                  >
                    {thematicLayers.map((layer) => {
                      const Icon = layer.icon;
                      const isRowExpanded = expandedRowId === layer.id;

                      return (
                        <div
                          key={layer.id}
                          className={cn(
                            "rounded-[6px] border transition-colors overflow-hidden box-border shrink-0 flex flex-col",
                            layer.active
                              ? "bg-[#F6F1E7] border-[#E4DCCB]"
                              : "bg-[#FFFDF8] border-[#E4DCCB] hover:bg-[#F6F1E7]/50",
                            isRowExpanded
                              ? "h-auto ring-1 ring-[#C98A1B]"
                              : "h-[54px] min-h-[54px] max-h-[54px]"
                          )}
                        >
                          {/* Row Header Bar: 54px collapsed height */}
                          <div
                            onClick={() => {
                              setExpandedRowId(isRowExpanded ? null : layer.id);
                            }}
                            className="h-[52px] min-h-[52px] max-h-[52px] px-2.5 flex items-center justify-between gap-2 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              {/* Layer Icon Swatch */}
                              <div 
                                className={cn(
                                  "w-7 h-7 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors",
                                  layer.active
                                    ? "bg-[#FFFDF8] border-[#E4DCCB] text-[#1F2A22]"
                                    : "bg-[#F6F1E7] border-[#E4DCCB] text-[#5A6458]"
                                )}
                              >
                                <Icon size={14} className={layer.active ? "text-[#B4531F]" : "text-[#5A6458]"} />
                              </div>

                              {/* Title */}
                              <div className="flex flex-col min-w-0 flex-1 justify-center">
                                <span className={cn(
                                  "text-[12.5px] font-medium leading-tight line-clamp-2 break-words",
                                  layer.active ? "text-[#1F2A22]" : "text-[#5A6458]"
                                )}>
                                  {layer.title}
                                </span>
                              </div>
                            </div>

                            {/* Controls: Expand disclosure + Toggle switch */}
                            <div className="flex items-center gap-1.5 shrink-0 ml-1">
                              {/* On/Off Switch: Green active pill (#3F6B4E) */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (layer.toggle) layer.toggle();
                                }}
                                className={cn(
                                  "w-8.5 h-4.5 rounded-full transition-colors relative shrink-0 p-0.5 border cursor-pointer",
                                  layer.active
                                    ? "bg-[#3F6B4E] border-[#3F6B4E]"
                                    : "bg-[#E4DCCB] border-[#E4DCCB]"
                                )}
                                aria-pressed={layer.active}
                                title={`Toggle ${layer.title}`}
                              >
                                <span
                                  className={cn(
                                    "w-3.5 h-3.5 rounded-full bg-[#FFFDF8] block transition-transform shadow-xs",
                                    layer.active ? "translate-x-4" : "translate-x-0"
                                  )}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Content: Grows to fit, no fixed height, no line-clamp */}
                          {isRowExpanded && (
                            <div className="px-3 pb-3 pt-1 border-t border-white/10 bg-slate-950/70 flex flex-col gap-2 text-xs">
                              <p className="text-caption text-slate-300 leading-relaxed font-sans">
                                {layer.desc}
                              </p>
                              <div className="flex items-center justify-between text-caption font-mono pt-1 text-slate-400 border-t border-white/5">
                                <span>Cartographic Focus:</span>
                                <span className="text-emerald-300 font-bold">{layer.subtitle}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

    {/* MOBILE FLOATING TRIGGER BUTTON (< 768px) */}
    <div className="md:hidden fixed bottom-20 right-3 z-30 pointer-events-auto">
      <button
        type="button"
        onClick={() => setIsMobileSheetOpen(true)}
        className={cn(
          "min-h-[44px] px-4 py-2.5 rounded-full shadow-overlay flex items-center gap-2 border font-mono text-xs font-semibold cursor-pointer select-none",
          isField
            ? "bg-black text-white border-2 border-white"
            : isLight
            ? "bg-[#FAF6F0] text-[#1A1612] border-[#E3D8CC] shadow-raised"
            : "bg-slate-950/95 text-[#FEF3C7] border-amber-500/30 shadow-raised"
        )}
        aria-label="Open thematic map layers sheet"
      >
        <Layers size={15} className={isLight ? "text-[#C85A32]" : "text-amber-400"} />
        <span>Layers ({activeCount}/8)</span>
      </button>
    </div>

    {/* MOBILE BOTTOM SHEET (< 768px) */}
    <AnimatePresence>
      {isMobileSheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setIsMobileSheetOpen(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "w-full max-h-[75vh] rounded-t-3xl border-t shadow-2xl flex flex-col overflow-hidden pb-6",
              isField
                ? "bg-black text-white border-white"
                : isLight
                ? "bg-[#FAF6F0] text-[#1A1612] border-[#E3D8CC]"
                : "bg-slate-950/95 text-white border-white/20"
            )}
          >
            <div className="w-12 h-1 rounded-full bg-current/25 mx-auto my-2.5 shrink-0" />
            <div className="px-4 py-2 flex items-center justify-between border-b border-current/10">
              <div className="flex items-center gap-2">
                <Layers size={16} className={isLight ? "text-[#C85A32]" : "text-amber-400"} />
                <span className="font-semibold text-sm">Thematic GIS Layers ({activeCount}/8 ON)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSheetOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-current/10 cursor-pointer"
                aria-label="Close layers bottom sheet"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar flex flex-col gap-2.5">
              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 p-0.5 rounded-xl border border-current/15 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('layers')}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer normal-case",
                    activeTab === 'layers'
                      ? isLight
                        ? "bg-white text-[#1A1612] shadow-xs font-bold"
                        : "bg-slate-800 text-white shadow-xs font-bold"
                      : "opacity-75 hover:opacity-100"
                  )}
                >
                  <Layers size={12} />
                  <span>8 Thematic Layers</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('legend')}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer normal-case",
                    activeTab === 'legend'
                      ? isLight
                        ? "bg-white text-[#1A1612] shadow-xs font-bold"
                        : "bg-emerald-950 text-emerald-200 border border-emerald-500/40 shadow-xs font-bold"
                      : "opacity-75 hover:opacity-100"
                  )}
                >
                  <BookOpen size={12} />
                  <span>Symbology Legend</span>
                </button>
              </div>

              {activeTab === 'legend' ? (
                <InteractiveSymbologyLegend
                  showWaterSources={waterSources}
                  showArableLand={arableLand}
                  showCommunitySettlements={communitySettlements}
                  onToggleWaterSources={onToggleWaterSources}
                  onToggleArableLand={onToggleArableLand}
                  onToggleCommunitySettlements={onToggleCommunitySettlements}
                  onSelectDistrictFocus={onSelectDistrictFocus}
                />
              ) : (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] custom-scrollbar pr-1">
                  {thematicLayers.map((layer) => {
                    const Icon = layer.icon;
                    const isRowExpanded = expandedRowId === layer.id;
                    return (
                      <div
                        key={`mobile-${layer.id}`}
                        className={cn(
                          "rounded-xl border transition-all duration-200 overflow-hidden box-border shrink-0 flex flex-col",
                          layer.active
                            ? isLight
                              ? "bg-white border-[#C85A32]/40 shadow-xs"
                              : "bg-slate-900/90 border-white/20 shadow-md"
                            : isLight
                            ? "bg-black/5 border-transparent opacity-85"
                            : "bg-slate-900/40 border-white/10 opacity-85"
                        )}
                      >
                        <div
                          onClick={() => setExpandedRowId(isRowExpanded ? null : layer.id)}
                          className="min-h-[52px] px-2.5 flex items-center justify-between gap-2 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
                                layer.active
                                  ? isLight
                                    ? "bg-[#C85A32]/10 border-[#C85A32]/40 text-[#C85A32]"
                                    : layer.activeBg
                                  : "bg-black/10 border-current/10 text-current/60"
                              )}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="font-semibold text-xs leading-tight">
                                {layer.title}
                              </span>
                              <span className="text-caption font-mono opacity-70">
                                {layer.badge}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              layer.toggle();
                            }}
                            className={cn(
                              "w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 p-0.5",
                              layer.active ? "bg-emerald-600" : "bg-black/20 dark:bg-white/20"
                            )}
                            aria-label={`Toggle ${layer.title}`}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full bg-white transition-transform shadow-xs",
                                layer.active ? "translate-x-5" : "translate-x-0"
                              )}
                            />
                          </button>
                        </div>
                        {isRowExpanded && (
                          <div className="px-3 pb-3 pt-1 border-t border-current/10 text-xs">
                            <p className="leading-relaxed opacity-85 font-sans">
                              {layer.desc}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
