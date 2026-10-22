import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplets,
  Sprout,
  Mountain,
  Users,
  X,
  ArrowRight,
  ExternalLink,
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
  metric: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  activeClass: string;
}

const FILTER_CHIPS: FilterChipDef[] = [
  {
    id: 'water',
    label: 'Water Sources',
    metric: 'FAO AQUASTAT',
    icon: Droplets,
    accentColor: 'text-sky-400',
    activeClass: 'bg-sky-950/90 border-sky-400/70 text-sky-100 ring-1 ring-sky-400/40',
  },
  {
    id: 'soil',
    label: 'Arable Red Loam',
    metric: 'FAO HWSD v2.0',
    icon: Sprout,
    accentColor: 'text-emerald-400',
    activeClass: 'bg-emerald-950/90 border-emerald-400/70 text-emerald-100 ring-1 ring-emerald-400/40',
  },
  {
    id: 'altitude',
    label: 'Highland Climate',
    metric: 'DCCMS Normals',
    icon: Mountain,
    accentColor: 'text-amber-400',
    activeClass: 'bg-amber-950/90 border-amber-400/70 text-amber-100 ring-1 ring-amber-400/40',
  },
  {
    id: 'settlement',
    label: 'Adventist Outposts',
    metric: 'Mission Heritage',
    icon: Users,
    accentColor: 'text-teal-400',
    activeClass: 'bg-teal-950/90 border-teal-400/70 text-teal-100 ring-1 ring-teal-400/40',
  },
];

export function HeroQuickPreviewOverlays({
  activeFilter,
  onFilterChange,
  className,
}: HeroQuickPreviewOverlaysProps) {
  return (
    <div className={cn('flex flex-col gap-3 w-full', className)}>
      {/* Interactive Segmented Layer Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-stone-300 font-medium mr-1 whitespace-nowrap">
          Inspect Verified Layer:
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
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 cursor-pointer border whitespace-nowrap shrink-0',
                isActive
                  ? chip.activeClass
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-stone-200 hover:text-white'
              )}
              title={`Preview verified ${chip.label} data`}
            >
              <Icon size={13} className={chip.accentColor} />
              <span>{chip.label}</span>
              <span className="text-caption font-mono text-stone-400 hidden sm:inline tabular-nums">
                · {chip.metric}
              </span>
            </button>
          );
        })}

        {activeFilter && (
          <button
            type="button"
            onClick={() => onFilterChange(null)}
            className="text-stone-400 hover:text-white text-xs flex items-center gap-1 ml-1 cursor-pointer transition-colors whitespace-nowrap"
            title="Clear preview overlay"
          >
            <X size={13} />
            <span>Close</span>
          </button>
        )}
      </div>

      {/* ====================================================================
          INSTANT PREVIEW OVERLAY DRAWER (VERIFIED INSTITUTIONAL DATA)
      ==================================================================== */}
      <AnimatePresence mode="wait">
        {activeFilter === 'water' && (
          <motion.div
            key="preview-water"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#071821] border border-sky-500/40 shadow-lg flex flex-col gap-3 text-stone-100">
              <div className="flex items-start justify-between gap-3 border-b border-sky-500/20 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-white">
                        Malawi Water Catchments & Basement Aquifers
                      </h3>
                      <span className="text-xs font-mono text-sky-300 tabular-nums">
                        · FAO AQUASTAT & Ministry of Water
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Hydrogeological profiles of perennial highland streams, lakeshore alluvial tables, and weathered basement aquifers.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-sky-300 font-semibold">
                    Highland Gravity Springs
                  </span>
                  <span className="font-semibold text-white">
                    Mulanje · Zomba · Dedza · Rumphi
                  </span>
                  <span className="text-caption text-stone-400">
                    Perennial headwater streams enabling unpowered gravity irrigation
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-sky-300 font-semibold">
                    Alluvial vs. Basement Depth
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    5–20m Alluvial · 25–45m Plateau
                  </span>
                  <span className="text-caption text-stone-400">
                    Documented in FAO AQUASTAT Malawi Hydrogeological Survey
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-sky-300 font-semibold">
                    Dambo Seasonal Wetlands
                  </span>
                  <span className="font-semibold text-white">
                    Residual Subsoil Moisture
                  </span>
                  <span className="text-caption text-stone-400">
                    Supports dry-season winter garden cropping (May–October)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <a
                  href="https://m.egwwritings.org/en/search?query=3SM+289.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 hover:text-sky-300 italic inline-flex items-center gap-1"
                >
                  <span>
                    "There is a pure stream of water, which is a treasure..." — Ellen G. White (3SM 289.1)
                  </span>
                  <ExternalLink size={11} className="shrink-0" />
                </a>
                <Link
                  to="/scout-map?theme=water"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#071B11] border border-emerald-500/40 shadow-lg flex flex-col gap-3 text-stone-100">
              <div className="flex items-start justify-between gap-3 border-b border-emerald-500/20 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <Sprout size={16} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-white">
                        Malawi Pedology & Katondo Red Clay Loams
                      </h3>
                      <span className="text-xs font-mono text-emerald-300 tabular-nums">
                        · FAO HWSD v2.0 & ISRIC SoilGrids
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Five documented FAO soil orders across Malawi: Eutric Nitisols, Ferralsols, Fluvisols, Humic Acrisols, and Vertisols.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-emerald-300 font-semibold">
                    Katondo (Red Clay Soil)
                  </span>
                  <span className="text-[11px] font-mono text-stone-300">
                    Technical: FAO Eutric &amp; Chromic Nitisols
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    pH 5.8 – 6.5 (Red Clay Loam)
                  </span>
                  <span className="text-caption text-stone-400">
                    Dedza, Ntcheu, Lilongwe, Dowa, Mchinji &amp; Zomba
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-emerald-300 font-semibold">
                    Chidothe (Highland Humus Soil)
                  </span>
                  <span className="text-[11px] font-mono text-stone-300">
                    Technical: FAO Humic Acrisols &amp; Ferralsols
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    pH 4.8 – 5.7 (Highland Forest Humus)
                  </span>
                  <span className="text-caption text-stone-400">
                    Mulanje, Thyolo, Nkhata Bay, Rumphi &amp; Misuku Hills
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-emerald-300 font-semibold">
                    Dambo (Wetland &amp; Valley Alluvium)
                  </span>
                  <span className="text-[11px] font-mono text-stone-300">
                    Technical: FAO Eutric Fluvisols
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    pH 6.2 – 7.2 (Mineral Silt &amp; Alluvium)
                  </span>
                  <span className="text-caption text-stone-400">
                    Salima, Karonga, Nkhotakota &amp; Shire Basin
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <a
                  href="https://m.egwwritings.org/en/search?query=6T+179.2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 hover:text-emerald-300 italic inline-flex items-center gap-1"
                >
                  <span>
                    "Study in agricultural lines should be the A, B, and C of the education..." — Testimonies, Vol. 6, p. 179 (6T 179.2)
                  </span>
                  <ExternalLink size={11} className="shrink-0" />
                </a>
                <Link
                  to="/scout-map?theme=soil"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1C1408] border border-amber-500/40 shadow-lg flex flex-col gap-3 text-stone-100">
              <div className="flex items-start justify-between gap-3 border-b border-amber-500/20 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Mountain size={16} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-white">
                        Highland Elevation & Thermal Belts
                      </h3>
                      <span className="text-xs font-mono text-amber-300 tabular-nums">
                        · DCCMS Malawi & SRTM 30m DEM
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Verified elevation ranges and agro-climatic temperature regimes across Malawi’s highland plateaus and rift escarpments.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-amber-300 font-semibold">
                    Highland Sanctuary Belt
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    1,200m – 2,198m ASL
                  </span>
                  <span className="text-caption text-stone-400">
                    Dedza Mountain, Zomba Plateau, Viphya & Nyika Foothills
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-amber-300 font-semibold">
                    Annual Rainfall Normals
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    850 – 2,200 mm / year
                  </span>
                  <span className="text-caption text-stone-400">
                    DCCMS 30-year station climatology (Nov–Apr rains + Chiperoni)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-amber-300 font-semibold">
                    Temperate Crop Window
                  </span>
                  <span className="font-semibold text-white font-mono tabular-nums">
                    11°C – 24°C Mean Range
                  </span>
                  <span className="text-caption text-stone-400">
                    Suited for Irish potatoes, apples, peaches, beans & wheat
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <a
                  href="https://m.egwwritings.org/en/search?query=7T+85.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 hover:text-amber-300 italic inline-flex items-center gap-1"
                >
                  <span>
                    "In the country the sick find many things to call their attention away from themselves..." — Testimonies, Vol. 7, p. 85 (7T 85.1)
                  </span>
                  <ExternalLink size={11} className="shrink-0" />
                </a>
                <Link
                  to="/scout-map?theme=altitude"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#061A19] border border-teal-500/40 shadow-lg flex flex-col gap-3 text-stone-100">
              <div className="flex items-start justify-between gap-3 border-b border-teal-500/20 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-white">
                        Historical Adventist Missions & Outpost Centers
                      </h3>
                      <span className="text-xs font-mono text-teal-300 tabular-nums">
                        · Malamulo (1902) & Lunjika (1932)
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Documented Seventh-day Adventist rural mission hospitals, agricultural schools, and outpost sanctuaries in Malawi.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onFilterChange(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-teal-300 font-semibold">
                    Malamulo Mission (Makwasa)
                  </span>
                  <span className="font-semibold text-white">
                    Founded 1902 · Thyolo District
                  </span>
                  <span className="text-caption text-stone-400">
                    Historic rural mission hospital, college of health sciences & farm
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-teal-300 font-semibold">
                    Lunjika & Luwazi Missions
                  </span>
                  <span className="font-semibold text-white">
                    Mzimba & Nkhata Bay Highlands
                  </span>
                  <span className="text-caption text-stone-400">
                    Northern rural educational and medical missionary outposts
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-caption text-teal-300 font-semibold">
                    Outpost Distance Principle
                  </span>
                  <span className="font-semibold text-white">
                    "Easy Distance" from Cities
                  </span>
                  <span className="text-caption text-stone-400">
                    Rural acreage outside Lilongwe, Blantyre, Zomba & Mzuzu
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <a
                  href="https://m.egwwritings.org/en/search?query=2SM+358.2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 hover:text-teal-300 italic inline-flex items-center gap-1"
                >
                  <span>
                    "Repeatedly the Lord has instructed us that we are to work the cities from outpost centers." — 2SM 358.2
                  </span>
                  <ExternalLink size={11} className="shrink-0" />
                </a>
                <Link
                  to="/scout-map?theme=settlement"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>Inspect Outposts on Map</span>
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
