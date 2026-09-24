import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sprout, Mountain, Users, X, ArrowRight, 
  Sparkles, CheckCircle2, Compass, ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type QuickFilterCategory = 'water' | 'soil' | 'altitude' | 'settlement' | null;

export interface HeroQuickPreviewOverlaysProps {
  activeFilter: QuickFilterCategory;
  onFilterChange: (category: QuickFilterCategory) => void;
  className?: string;
}

interface FilterChipDef {
  id: 'water' | 'soil' | 'altitude' | 'settlement';
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  badge: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}

const FILTER_CHIPS: FilterChipDef[] = [
  {
    id: 'water',
    label: 'Water Sources',
    shortLabel: 'Water',
    icon: Droplets,
    accentColor: 'text-sky-600 dark:text-sky-400',
    badge: 'Gravity Streams',
    activeBg: 'bg-sky-500/15 dark:bg-sky-950/80',
    activeBorder: 'border-sky-500/60 dark:border-sky-400/80',
    activeText: 'text-sky-950 dark:text-sky-200'
  },
  {
    id: 'soil',
    label: 'Arable Red Loam',
    shortLabel: 'Red Loam',
    icon: Sprout,
    accentColor: 'text-emerald-700 dark:text-emerald-400',
    badge: 'Katondo Oxisols',
    activeBg: 'bg-emerald-500/15 dark:bg-emerald-950/80',
    activeBorder: 'border-emerald-500/60 dark:border-emerald-400/80',
    activeText: 'text-emerald-950 dark:text-emerald-200'
  },
  {
    id: 'altitude',
    label: 'Highland Altitude',
    shortLabel: 'Highlands',
    icon: Mountain,
    accentColor: 'text-amber-700 dark:text-amber-400',
    badge: '1,200m+ Ridge',
    activeBg: 'bg-amber-500/15 dark:bg-amber-950/80',
    activeBorder: 'border-amber-500/60 dark:border-amber-400/80',
    activeText: 'text-amber-950 dark:text-amber-200'
  },
  {
    id: 'settlement',
    label: 'Adventist Outposts',
    shortLabel: 'Outposts',
    icon: Users,
    accentColor: 'text-teal-700 dark:text-teal-400',
    badge: 'Rural Churches',
    activeBg: 'bg-teal-500/15 dark:bg-teal-950/80',
    activeBorder: 'border-teal-500/60 dark:border-teal-400/80',
    activeText: 'text-teal-950 dark:text-teal-200'
  }
];

export function HeroQuickPreviewOverlays({
  activeFilter,
  onFilterChange,
  className
}: HeroQuickPreviewOverlaysProps) {
  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      
      {/* Floating Quick-Access Pills Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
          <Sparkles size={11} className="text-amber-600 dark:text-amber-400" />
          Quick Layers:
        </span>

        {FILTER_CHIPS.map((chip) => {
          const Icon = chip.icon;
          const isActive = activeFilter === chip.id;

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onFilterChange(isActive ? null : chip.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border shadow-2xs active:scale-95",
                isActive
                  ? cn(chip.activeBg, chip.activeBorder, chip.activeText, "ring-2 ring-amber-400/40 shadow-sm")
                  : "bg-white/80 dark:bg-stone-900/80 border-stone-300/80 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:border-amber-400/80 hover:text-stone-950 dark:hover:text-white"
              )}
              title={`Preview ${chip.label} instantly`}
            >
              <Icon size={13} className={isActive ? "" : chip.accentColor} />
              <span>{chip.label}</span>
              <span className="text-[10px] font-mono opacity-70 hidden sm:inline">
                · {chip.badge}
              </span>
            </button>
          );
        })}

        {activeFilter && (
          <button
            type="button"
            onClick={() => onFilterChange(null)}
            className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs flex items-center gap-1 ml-1 cursor-pointer transition-colors"
            title="Clear preview overlay"
          >
            <X size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* ====================================================================
          INSTANT PREVIEW OVERLAY DRAWER (Appears right in hero without navigation)
      ==================================================================== */}
      <AnimatePresence mode="wait">
        {activeFilter === 'water' && (
          <motion.div
            key="preview-water"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-sky-50/80 to-white dark:from-[#091D26] dark:via-[#081720] dark:to-[#07131A] border-2 border-sky-300/90 dark:border-sky-800/80 shadow-lg flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 border-b border-sky-200/80 dark:border-sky-900/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-900/80 border border-sky-300 dark:border-sky-700 flex items-center justify-center text-sky-700 dark:text-sky-300 shadow-2xs">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <h3 className="serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                      Water Sources & Gravity Intakes
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-700">
                        100% Flow Vectors
                      </span>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-sans">
                      Perennial mountain streams, hydric dambo wetlands, and unpowered gravity siphon feasibility.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-sky-200/60 dark:border-sky-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-sky-800 dark:text-sky-400 font-bold uppercase">Gravity Elevation Head</span>
                  <span className="font-semibold text-stone-900 dark:text-white">40m – 120m Natural Fall</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Zero electricity needed to irrigate tiered orchards</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-sky-200/60 dark:border-sky-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-sky-800 dark:text-sky-400 font-bold uppercase">Shallow Dambo Aquifer</span>
                  <span className="font-semibold text-stone-900 dark:text-white">&lt; 15m Static Water Table</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Low-cost hand-dug wells for year-round dimba relish</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-sky-200/60 dark:border-sky-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-sky-800 dark:text-sky-400 font-bold uppercase">Top Water Catchments</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Dedza, Mulanje, Viphya</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Pristine river headwaters above industrial runoff</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-600 dark:text-stone-400 italic font-serif">
                  "A pure stream of water should be secured if possible..." — EGW
                </span>
                <Link
                  to="/scout-map?theme=water"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Inspect Water Layer on Map</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {activeFilter === 'soil' && (
          <motion.div
            key="preview-soil"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-50/80 to-white dark:from-[#091F13] dark:via-[#08180E] dark:to-[#06120B] border-2 border-emerald-300/90 dark:border-emerald-800/80 shadow-lg flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 border-b border-emerald-200/80 dark:border-emerald-900/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-2xs">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <h3 className="serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                      Arable Katondo Red Loam Soil
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700">
                        pH 5.8 – 6.5 Optimal
                      </span>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-sans">
                      Deep, well-drained ferrallitic oxisols engineered for deep-rooting fruit trees and organic subsistence.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-emerald-200/60 dark:border-emerald-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Soil Profile</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Volcanic Katondo Loam</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">High cation exchange capacity & natural microbial activity</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-emerald-200/60 dark:border-emerald-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Permanent Food Forest</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Avocados, Macadamia, Citrus</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Guaranteed nutrition without synthetic chemical inputs</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-emerald-200/60 dark:border-emerald-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Prime Soil Belts</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Dedza, Thyolo, Mchinji</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Deep arable horizon resistant to surface drought</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-600 dark:text-stone-400 italic font-serif">
                  "Study the soil and how to enrich it..." — Testimonies, Vol. 6
                </span>
                <Link
                  to="/scout-map?theme=soil"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Inspect Soil Layer on Map</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {activeFilter === 'altitude' && (
          <motion.div
            key="preview-altitude"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-50/80 to-white dark:from-[#211608] dark:via-[#191106] dark:to-[#120B04] border-2 border-amber-300/90 dark:border-amber-800/80 shadow-lg flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 border-b border-amber-200/80 dark:border-amber-900/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/80 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-800 dark:text-amber-300 shadow-2xs">
                    <Mountain size={16} />
                  </div>
                  <div>
                    <h3 className="serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                      Highland Altitude & Pure Air Ridges
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700">
                        1,200m – 2,200m ASL
                      </span>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-sans">
                      Thermal inversion ridges with cool temperate nights, zero stagnant heat, and natural vector suppression.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-amber-200/60 dark:border-amber-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase">Thermal Inversion</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Frost-Free Ridge Shelves</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Cold air drains down to valleys; ridges stay temperate</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-amber-200/60 dark:border-amber-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase">Health & Respiration</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Clean Mountain Oxygen</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Low humidity, refreshing sleep, revitalized nervous system</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-amber-200/60 dark:border-amber-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400 font-bold uppercase">Prime Highland Districts</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Dedza, Zomba, Nyika, Neno</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Temperate climates ideal for wheat, apples, & dairy</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-600 dark:text-stone-400 italic font-serif">
                  "The invigorating air of the highlands gives strength to the body." — Ministry of Healing
                </span>
                <Link
                  to="/scout-map?theme=altitude"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Inspect Elevation Contours on Map</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {activeFilter === 'settlement' && (
          <motion.div
            key="preview-settlement"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-teal-50/80 to-white dark:from-[#081F1E] dark:via-[#061716] dark:to-[#04100F] border-2 border-teal-300/90 dark:border-teal-800/80 shadow-lg flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 border-b border-teal-200/80 dark:border-teal-900/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/80 border border-teal-300 dark:border-teal-700 flex items-center justify-center text-teal-800 dark:text-teal-300 shadow-2xs">
                    <Users size={16} />
                  </div>
                  <div>
                    <h3 className="serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                      Adventist Outposts & Fellowship Companies
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-300 font-bold border border-teal-300 dark:border-teal-700">
                        42+ Rural Sanctuaries
                      </span>
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-sans">
                      Active Sabbath fellowship companies, lifestyle sanitariums, and Christian mutual-aid communities.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-teal-200/60 dark:border-teal-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400 font-bold uppercase">Sabbath Worship</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Active Rural Companies</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Worship within walking or short cycling distance</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-teal-200/60 dark:border-teal-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400 font-bold uppercase">Health Ministry</span>
                  <span className="font-semibold text-stone-900 dark:text-white">Sanitariums & Dispensaries</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Malamulo, Luwazi, and natural remedies network</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-teal-200/60 dark:border-teal-950 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400 font-bold uppercase">Seclusion Buffer</span>
                  <span className="font-semibold text-stone-900 dark:text-white">15km – 40km from Bomas</span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Close enough to evangelize; distant enough for peace</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-600 dark:text-stone-400 italic font-serif">
                  "Let outposts be established... schools and sanitariums..." — Country Living
                </span>
                <Link
                  to="/scout-map?theme=settlement"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Inspect Settlements on Map</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
