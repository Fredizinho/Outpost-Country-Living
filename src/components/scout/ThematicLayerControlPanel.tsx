import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sprout, Users, Layers, SlidersHorizontal, 
  ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, Check,
  Waves, Mountain, Home as HomeIcon, Info, Compass, Bot, ArrowRight,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractiveSymbologyLegend } from './InteractiveSymbologyLegend';

export interface ThematicLayerState {
  waterSources: boolean;
  arableLand: boolean;
  communitySettlements: boolean;
}

export interface ThematicLayerControlPanelProps {
  // Primary thematic layer states
  waterSources: boolean;
  onToggleWaterSources: (active: boolean) => void;
  arableLand: boolean;
  onToggleArableLand: (active: boolean) => void;
  communitySettlements: boolean;
  onToggleCommunitySettlements: (active: boolean) => void;
  
  // Quick combo presets
  onApplyThemePreset?: (preset: 'all-on' | 'all-off' | 'homestead-ready') => void;
  
  // Extended configuration hook (optional, opens full GIS deck)
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
  onApplyThemePreset,
  onOpenAdvancedLayers,
  onOpenAiScout,
  onGetAiInsights,
  onSelectDistrictFocus,
  isAutoHidden = false,
  onWakeUp,
  className
}: ThematicLayerControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'layers' | 'legend'>('layers');

  const activeCount = (waterSources ? 1 : 0) + (arableLand ? 1 : 0) + (communitySettlements ? 1 : 0);

  const thematicLayers = [
    {
      id: 'waterSources',
      title: 'Water Sources',
      shortTitle: 'Water',
      subtitle: 'Living Streams & Basins',
      desc: 'Perennial rivers, catchment drainage basins & lake waterways',
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
      title: 'Arable Land',
      shortTitle: 'Arable Land',
      subtitle: 'Katondo Red Loam Soils',
      desc: 'Prime agricultural soils (pH 6.0–6.5) & high-yield fertile belts',
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
      title: 'Community Settlements',
      shortTitle: 'Settlements',
      subtitle: 'Outposts & Mission Hubs',
      desc: 'Rural settlements, Adventist mission hubs, and trading bomas',
      icon: Users,
      active: communitySettlements,
      badge: 'Villages & Hubs',
      color: '#fbbf24',
      activeBg: 'bg-amber-500/20 border-amber-400 text-amber-200',
      activeDot: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
      toggle: () => onToggleCommunitySettlements(!communitySettlements)
    }
  ];

  return (
    <div
      onMouseEnter={onWakeUp}
      className={cn(
        "absolute left-3 top-20 sm:top-24 z-20 pointer-events-auto transition-all duration-300 font-sans",
        isAutoHidden ? "opacity-35 hover:opacity-100" : "opacity-100",
        className
      )}
      id="thematic-map-layers-panel"
    >
      <div className={cn(
        "bg-slate-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
        activeTab === 'legend' ? "w-[330px] sm:w-[390px]" : "w-[290px] sm:w-[325px]"
      )}>
        
        {/* Panel Header */}
        <div className="px-3.5 py-2.5 bg-gradient-to-r from-slate-900/95 via-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-2xs">
              <Layers size={13} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="serif font-bold text-xs text-white tracking-wide">
                  Thematic Controls
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {activeCount}/3 ON
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
              transition={{ duration: 0.2 }}
              className="p-3 flex flex-col gap-2.5 bg-slate-950/60"
            >
              {/* Mode Switcher Tabs: Active Layers vs Interactive Symbology Legend */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('layers')}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                    activeTab === 'layers'
                      ? "bg-slate-800 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <Layers size={12} />
                  <span>Layers</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('legend')}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                    activeTab === 'legend'
                      ? "bg-emerald-950 text-emerald-200 border border-emerald-500/40 shadow-xs"
                      : "text-emerald-400/80 hover:text-emerald-200"
                  )}
                >
                  <BookOpen size={12} />
                  <span>Interactive Legend</span>
                </button>
              </div>

              {activeTab === 'legend' ? (
                /* Interactive Symbology Legend Component */
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
                /* Standard Layer Controls */
                <>
                  {/* Quick toggle chips row */}
                  <div className="grid grid-cols-3 gap-1 pb-1 border-b border-white/5">
                    {thematicLayers.map((layer) => {
                      const Icon = layer.icon;
                      return (
                        <button
                          key={`chip-${layer.id}`}
                          onClick={layer.toggle}
                          className={cn(
                            "py-1 px-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer active:scale-95",
                            layer.active
                              ? layer.activeBg
                              : "bg-slate-900/80 border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                          )}
                          title={`Toggle ${layer.title}`}
                        >
                          <Icon size={11} className={layer.active ? "" : "text-slate-500"} />
                          <span className="truncate">{layer.shortTitle}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Prominent 'Get AI Insights' Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onGetAiInsights) {
                        onGetAiInsights();
                      } else if (onOpenAiScout) {
                        onOpenAiScout();
                      }
                    }}
                    className="w-full relative group overflow-hidden rounded-xl p-[1px] shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 active:scale-[0.98] cursor-pointer"
                    title="Analyze current map view and selected layers"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-xl opacity-85 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-3 py-2 rounded-[11px] bg-slate-950/90 group-hover:bg-slate-900/90 transition-colors flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                          <Sparkles size={14} className="text-amber-300 animate-pulse" />
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white tracking-tight truncate">
                              Get AI Insights
                            </span>
                            <span className="text-[9px] font-mono font-semibold px-1 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 shrink-0">
                              {activeCount} {activeCount === 1 ? 'Layer' : 'Layers'}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-300 font-sans truncate">
                            Country living recommendations
                          </span>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </button>

                  {/* Detailed Toggle Rows */}
                  <div className="flex flex-col gap-2">
                    {thematicLayers.map((layer) => {
                      const Icon = layer.icon;
                      return (
                        <div
                          key={layer.id}
                          onClick={layer.toggle}
                          className={cn(
                            "group p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5",
                            layer.active
                              ? "bg-slate-900/90 border-white/20 shadow-md"
                              : "bg-slate-900/40 border-white/5 hover:border-white/15 opacity-80 hover:opacity-100"
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div 
                              className={cn(
                                "w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all",
                                layer.active
                                  ? layer.activeBg
                                  : "bg-slate-900 border-white/10 text-slate-500"
                              )}
                            >
                              <Icon size={16} />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className={cn(
                                  "text-xs font-bold tracking-tight truncate",
                                  layer.active ? "text-white" : "text-slate-300 group-hover:text-white"
                                )}>
                                  {layer.title}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                                  • {layer.badge}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-sans leading-tight line-clamp-1">
                                {layer.subtitle}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Inspect Symbology Shortcut */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('legend');
                              }}
                              className="p-1 rounded-md text-slate-500 hover:text-emerald-300 hover:bg-white/5 transition-colors cursor-pointer"
                              title={`View ${layer.title} symbology in legend`}
                            >
                              <Info size={13} />
                            </button>

                            {/* Custom Toggle Switch */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                layer.toggle();
                              }}
                              className={cn(
                                "w-10 h-5 rounded-full transition-colors relative shrink-0 p-0.5 border cursor-pointer",
                                layer.active
                                  ? "bg-emerald-600/90 border-emerald-400"
                                  : "bg-slate-800 border-slate-700"
                              )}
                              aria-pressed={layer.active}
                            >
                              <motion.div
                                layout
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className={cn(
                                  "w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center",
                                  layer.active ? "ml-auto" : "ml-0"
                                )}
                              >
                                {layer.active && <Check size={10} className="text-emerald-700" />}
                              </motion.div>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Actions Footer */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onToggleWaterSources(true);
                          onToggleArableLand(true);
                          onToggleCommunitySettlements(true);
                        }}
                        className="hover:text-emerald-300 underline cursor-pointer"
                      >
                        All ON
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => {
                          onToggleWaterSources(false);
                          onToggleArableLand(false);
                          onToggleCommunitySettlements(false);
                        }}
                        className="hover:text-amber-300 underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('legend')}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
                        title="Open interactive symbology legend"
                      >
                        <BookOpen size={11} />
                        <span>Symbology</span>
                      </button>
                      {onOpenAiScout && (
                        <button
                          onClick={onOpenAiScout}
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold cursor-pointer"
                          title="AI Map Scout Analysis"
                        >
                          <Bot size={11} />
                          <span>AI Scout</span>
                        </button>
                      )}
                      {onOpenAdvancedLayers && (
                        <button
                          onClick={onOpenAdvancedLayers}
                          className="text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <span>GIS</span>
                          <SlidersHorizontal size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
