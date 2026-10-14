import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronDown, ChevronUp, Droplets, ShieldCheck, Mountain, MapPin, Eye, Compass, Church, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MapLegendProps {
  isAutoHidden?: boolean;
  onWakeUp?: () => void;
}

export function MapLegend({ isAutoHidden = false, onWakeUp }: MapLegendProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div 
      onMouseEnter={onWakeUp}
      className={cn(
        "absolute right-3 bottom-14 z-20 pointer-events-auto transition-all duration-300 font-mono text-xs",
        isAutoHidden ? "opacity-40 hover:opacity-100" : "opacity-100"
      )}
      id="map-minimalist-legend"
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-72 sm:w-80 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-3.5 shadow-2xl text-slate-200 flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="serif font-bold text-sm text-white tracking-wide">Cartographic Legend</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Collapse Legend"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Section 1: Groundwater & Water Reliability */}
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Droplets size={11} className="text-sky-400" />
                <span>Groundwater & Aquifer Table</span>
              </span>
              <div className="grid grid-cols-1 gap-1 text-caption pl-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300 shadow-sm shrink-0" />
                  <span className="text-emerald-300 font-semibold">Green:</span>
                  <span className="text-slate-300">High Groundwater / Perennial Spring (&lt;15m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300 shadow-sm shrink-0" />
                  <span className="text-amber-300 font-semibold">Amber:</span>
                  <span className="text-slate-300">Moderate / Seasonal Dambo (15m–25m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-300 shadow-sm shrink-0" />
                  <span className="text-rose-300 font-semibold">Red:</span>
                  <span className="text-slate-300">Deep Aquifer / Arid Basins (&gt;30m)</span>
                </div>
              </div>
            </div>

            {/* Section 2: Differentiated Boundaries & Vectors */}
            <div className="flex flex-col gap-1.5 border-t border-white/10 pt-2">
              <span className="text-caption uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Boundaries & Tenure Vectors</span>
              </span>
              <div className="flex flex-col gap-1.5 text-caption pl-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1 rounded bg-cyan-400 shadow-[0_0_8px_#22d3ee] shrink-0" />
                  <span className="text-cyan-300 font-bold">Thick Cyan Glow:</span>
                  <span className="text-slate-300">National & District Borders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 border-t-2 border-dashed border-amber-400 shrink-0" />
                  <span className="text-amber-300 font-bold">Dashed Amber:</span>
                  <span className="text-slate-300">Customary TA Boundary (Malire)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-emerald-500/35 border border-white rounded-sm shrink-0" />
                  <span className="text-white font-bold">Emerald & White:</span>
                  <span className="text-slate-300">Surveyed Agricultural Parcel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-dashed border-amber-400 bg-slate-950/70 shrink-0" />
                  <span className="text-amber-300 font-bold">Dashed Outline:</span>
                  <span className="text-slate-300">Dashed = illustrative example, not a listing</span>
                </div>
              </div>
            </div>

            {/* Section 3: Topographic Contours & Ridges */}
            <div className="flex flex-col gap-1.5 border-t border-white/10 pt-2">
              <span className="text-caption uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Mountain size={11} className="text-amber-400" />
                <span>Topography & Elevation</span>
              </span>
              <div className="flex flex-col gap-1 text-caption pl-1">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 border-t-2 border-dotted border-cyan-300 shrink-0" />
                  <span className="text-cyan-200">Cyan Dotted:</span>
                  <span className="text-slate-300">Valley Dambos & Wet Sponges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-amber-400 shrink-0" />
                  <span className="text-amber-200">Amber Solid:</span>
                  <span className="text-slate-300">Frost-Free Highland Ridges (&gt;1,400m)</span>
                </div>
              </div>
            </div>

            {/* Section 4: Thematic Layers & Settlements */}
            <div className="flex flex-col gap-1.5 border-t border-white/10 pt-2">
              <span className="text-caption uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <MapPin size={11} className="text-amber-400" />
                <span>Thematic Settlements & Soil</span>
              </span>
              <div className="flex flex-col gap-1 text-caption pl-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-900/80 border border-amber-400 flex items-center justify-center shrink-0">
                    <Church size={16} strokeWidth={1.75} className="text-amber-300" />
                  </span>
                  <span className="text-amber-300 font-bold">Church Pin:</span>
                  <span className="text-slate-300">Adventist Outpost & Mission Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950 border border-emerald-400 flex items-center justify-center shrink-0">
                    <Home size={16} strokeWidth={1.75} className="text-emerald-300" />
                  </span>
                  <span className="text-emerald-300 font-bold">House Pin:</span>
                  <span className="text-slate-300">Highland Homestead Cluster</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2.5 bg-emerald-600/30 border border-emerald-400 rounded-xs shrink-0" />
                  <span className="text-emerald-300 font-bold">Arable Belt:</span>
                  <span className="text-slate-300">Katondo Red Loam (pH 6.0–6.5)</span>
                </div>
              </div>
            </div>

            {/* Section 5: District Badges & Clusters */}
            <div className="flex flex-col gap-2 border-t border-white/10 pt-2 text-caption">
              <div className="flex items-center justify-between">
                <span className="text-caption uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Compass size={11} className="text-amber-400" />
                  <span>District Centroid Badges</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-amber-400 hover:underline cursor-pointer text-caption"
                >
                  Hide
                </button>
              </div>
              <div className="flex flex-col gap-1.5 pl-1">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-[10px] font-black text-amber-300 shrink-0 mt-0.5">
                    A+
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold">Grade Letters (A+, A, B+):</span>
                    <span className="text-slate-300 ml-1">
                      Outpost Agro-Feasibility Rating based on rainfall (&gt;900mm), arable Katondo loam soil, and water security.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/50 text-[10px] font-mono font-bold text-sky-300 shrink-0 mt-0.5">
                    15m
                  </div>
                  <div>
                    <span className="text-sky-300 font-bold">"15m" Depth:</span>
                    <span className="text-slate-300 ml-1">
                      Median static groundwater / aquifer depth to water table for shallow well or borehole drilling.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Collapsed Floating Pill */
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-slate-950/90 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/15 px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-xl transition-all cursor-pointer group"
            title="Open Map Cartographic Legend"
          >
            <Layers size={13} className="text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-caption">Map Legend</span>
            <div className="flex items-center gap-1 ml-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm" />
            </div>
            <ChevronUp size={12} className="text-slate-400 ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
