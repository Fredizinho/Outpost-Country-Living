import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MalawiTopographicInteractiveMap } from './MalawiTopographicInteractiveMap';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { 
  Droplets, Sprout, Wind, MapPin, 
  ArrowRight, Eye, Layers, Compass,
  Mountain, Sparkles, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface BotanicalEmblemCrestCardProps {
  className?: string;
  activeFilter?: 'water' | 'soil' | 'altitude' | 'settlement' | null;
  onDistrictSelect?: (district: MalawiDistrictSpec) => void;
}

export function BotanicalEmblemCrestCard({
  className,
  activeFilter = null,
  onDistrictSelect
}: BotanicalEmblemCrestCardProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<MalawiDistrictSpec | null>(null);
  const [showFullMap, setShowFullMap] = useState<boolean>(false);
  const [activePill, setActivePill] = useState<'water' | 'soil' | 'air' | null>(null);

  const handleDistrictClick = (district: MalawiDistrictSpec) => {
    setSelectedDistrict(district);
    if (onDistrictSelect) {
      onDistrictSelect(district);
    }
  };

  const handlePillClick = (pillar: 'water' | 'soil' | 'air') => {
    setActivePill(prev => (prev === pillar ? null : pillar));
  };

  return (
    <div 
      className={cn(
        "relative rounded-3xl overflow-hidden transition-all duration-300 group",
        "backdrop-blur-xl bg-stone-950/80 dark:bg-stone-950/85",
        "border border-white/10 dark:border-emerald-500/25 shadow-2xl shadow-black/50",
        "w-full max-w-sm sm:max-w-md mx-auto flex flex-col text-stone-100",
        className
      )}
    >
      {/* Soft Ambient Radial Light Glow Behind Crest inside the card */}
      <div 
        aria-hidden="true" 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-56 h-56 bg-radial from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl pointer-events-none z-0" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-10 right-0 w-44 h-44 bg-radial from-amber-500/10 to-transparent blur-2xl pointer-events-none z-0" 
      />

      {/* ====================================================================
          1. INTERACTIVE MALAWI VECTOR OUTLINE MAP IN CARD BACKGROUND
      ==================================================================== */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500 pointer-events-auto",
          showFullMap 
            ? "opacity-100 z-20 bg-stone-950/95 backdrop-blur-2xl" 
            : "opacity-25 hover:opacity-50 dark:opacity-20 dark:hover:opacity-45 z-0"
        )}
      >
        <MalawiTopographicInteractiveMap
          activeFilter={activeFilter}
          onSelectDistrict={handleDistrictClick}
          selectedDistrictId={selectedDistrict?.id}
          interactive={true}
        />
      </div>

      {/* Modern Sleek Header Bar */}
      <div className="relative z-10 px-4 py-3 flex items-center justify-between border-b border-white/10 dark:border-emerald-900/40 bg-stone-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Outpost Sanctuary
            </span>
            <span className="text-[9px] font-sans text-stone-400">
              Malawi Country Living GIS
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFullMap(prev => !prev)}
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer backdrop-blur-md",
            showFullMap
              ? "bg-emerald-600/90 text-white border-emerald-400/50 shadow-md shadow-emerald-950/60"
              : "bg-white/5 hover:bg-white/10 text-stone-200 border-white/10 hover:border-emerald-500/40"
          )}
          title={showFullMap ? "Return to Compact Emblem Crest" : "Inspect Interactive 28-District Vector Map"}
        >
          {showFullMap ? (
            <>
              <Eye size={12} className="text-white" />
              <span>Show Crest</span>
            </>
          ) : (
            <>
              <Layers size={12} className="text-emerald-400" />
              <span>Interactive Map</span>
            </>
          )}
        </button>
      </div>

      {/* ====================================================================
          2. MODERN SLEEK CIRCULAR CREST & PILL BADGES
      ==================================================================== */}
      <div className={cn(
        "relative z-10 p-5 sm:p-6 flex flex-col items-center text-center gap-5 transition-all duration-300",
        showFullMap && "pointer-events-none opacity-0 h-0 p-0 overflow-hidden"
      )}>
        
        {/* Compact Circular Crest: Modern Mountain Peaks, Sun Rays, and River Curves */}
        <div className="relative flex flex-col items-center">
          
          {/* Subtle Rotating Geometric Orbit Ticks */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            
            {/* Outer Subtle Concentric Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
            
            {/* Ambient Halo behind circular crest */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-amber-500/20 blur-md pointer-events-none" />

            {/* Circular Crest Body */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-b from-stone-900 via-stone-950 to-emerald-950 border-2 border-emerald-500/40 shadow-xl shadow-black/80 flex items-center justify-center">
              
              {/* Modern Vector Artwork: Sun Rays, Mountain Peaks & River Curves */}
              <svg 
                viewBox="0 0 120 120" 
                className="w-full h-full object-cover"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Sky Gradient */}
                  <linearGradient id="crestSkyGrad" x1="60" y1="0" x2="60" y2="80" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1C2E24" />
                    <stop offset="50%" stopColor="#0E1E17" />
                    <stop offset="100%" stopColor="#07110C" />
                  </linearGradient>

                  {/* Golden Sun & Radiant Rays */}
                  <radialGradient id="crestSun" cx="60" cy="46" r="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.6" />
                    <stop offset="70%" stopColor="#D97706" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                  </radialGradient>

                  {/* Back Mountain Silhouette (Mulanje Peak) */}
                  <linearGradient id="crestPeakBack" x1="60" y1="36" x2="60" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                    <stop offset="60%" stopColor="#065F46" />
                    <stop offset="100%" stopColor="#022C22" />
                  </linearGradient>

                  {/* Fore Mountain Peak (Dedza Ridge) */}
                  <linearGradient id="crestPeakFore" x1="60" y1="52" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="60%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#064E3B" />
                  </linearGradient>

                  {/* Living Water Stream Curve */}
                  <linearGradient id="crestRiver" x1="60" y1="62" x2="60" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="30%" stopColor="#38BDF8" />
                    <stop offset="70%" stopColor="#0284C7" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>
                </defs>

                {/* Circular Sky Base */}
                <rect width="120" height="120" fill="url(#crestSkyGrad)" />

                {/* Sun Glow */}
                <circle cx="60" cy="46" r="32" fill="url(#crestSun)" />

                {/* Modern Geometric Sun Rays */}
                <g stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity="0.45">
                  <line x1="60" y1="46" x2="60" y2="18" />
                  <line x1="60" y1="46" x2="74" y2="22" />
                  <line x1="60" y1="46" x2="86" y2="30" strokeDasharray="3 3" />
                  <line x1="60" y1="46" x2="46" y2="22" />
                  <line x1="60" y1="46" x2="34" y2="30" strokeDasharray="3 3" />
                </g>

                {/* Rising Sun Orb */}
                <circle cx="60" cy="46" r="10" fill="#F59E0B" filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))" />

                {/* Soaring Peace Dove Accent */}
                <path
                  d="M60 26 C57 23 53 22 49 23 C52 25 55 26 57 28 C55 29 52 30 50 31 C54 31 57 30 59 29 C59 31 58 33 57 35 C59 33 61 30 62 28 C63 28 65 29 66 28 C65 27 63 26 62 26 C62 24 61 22 60 26 Z"
                  fill="#FFFFFF"
                  opacity="0.9"
                />

                {/* Background Mountain Peaks (Mulanje Massif) */}
                <path
                  d="M12 94 L36 58 L54 74 L60 64 L78 82 L96 62 L112 94 Z"
                  fill="url(#crestPeakBack)"
                />
                {/* Back Peak Light Edge */}
                <path
                  d="M36 58 L54 74 L60 64 L78 82 L96 62"
                  stroke="#34D399"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* Foreground Mountain Peaks (Dedza & Shire Highlands) */}
                <path
                  d="M0 105 L26 72 L46 88 L60 70 L82 92 L104 76 L120 105 Z"
                  fill="url(#crestPeakFore)"
                />
                {/* Foreground Peak Ridge Crest */}
                <path
                  d="M26 72 L46 88 L60 70 L82 92 L104 76"
                  stroke="#6EE7B7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Winding Living Water River Curves */}
                <path
                  d="M60 70 
                     C58 76, 56 82, 62 88 
                     C68 94, 58 102, 52 110 
                     C48 116, 50 120, 50 120 
                     L70 120 
                     C68 116, 68 112, 74 106 
                     C80 98, 72 92, 66 86 
                     C63 81, 64 74, 60 70 Z"
                  fill="url(#crestRiver)"
                  filter="drop-shadow(0 0 4px rgba(56, 189, 248, 0.6))"
                />

                {/* River Highlight Ripples */}
                <path
                  d="M58 84 Q62 82 66 84 M55 96 Q60 93 67 96 M52 108 Q60 105 70 108"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* Inner Border Ring */}
                <circle cx="60" cy="60" r="58" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Motto and Sanctuary Subtitle */}
          <div className="flex flex-col items-center gap-1 mt-3">
            <span className="text-sm font-semibold tracking-wide text-white">
              Peace in the Open Country
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 tracking-wider uppercase">
              Malawi Sanctuary · Est. 1894
            </span>
          </div>
        </div>

        {/* Clean Pill Badges: Living Water, Fertile Loam, Pure Air */}
        <div className="w-full flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 px-1">
            <span>Core Sanctuary Pillars</span>
            <span className="text-emerald-400 text-[10px]">Spirit of Prophecy</span>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            {/* 1. Living Water Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('water')}
              className={cn(
                "group/pill flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md text-center",
                activePill === 'water'
                  ? "bg-sky-500/20 border-sky-400/60 shadow-lg shadow-sky-950/60 text-sky-200"
                  : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-sky-400/40 text-stone-300"
              )}
              title="Filter / inspect Living Water gravity sources"
            >
              <div className="w-7 h-7 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover/pill:scale-105 transition-transform mb-1.5">
                <Droplets size={14} />
              </div>
              <span className="text-xs font-semibold text-stone-100 group-hover/pill:text-sky-300 transition-colors">
                Living Water
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                Gravity Flow
              </span>
            </button>

            {/* 2. Fertile Loam Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('soil')}
              className={cn(
                "group/pill flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md text-center",
                activePill === 'soil'
                  ? "bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-950/60 text-emerald-200"
                  : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-emerald-400/40 text-stone-300"
              )}
              title="Filter / inspect Fertile Katondo Red Loam soil"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover/pill:scale-105 transition-transform mb-1.5">
                <Sprout size={14} />
              </div>
              <span className="text-xs font-semibold text-stone-100 group-hover/pill:text-emerald-300 transition-colors">
                Fertile Loam
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                Red Katondo
              </span>
            </button>

            {/* 3. Pure Air Pill */}
            <button
              type="button"
              onClick={() => handlePillClick('air')}
              className={cn(
                "group/pill flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md text-center",
                activePill === 'air'
                  ? "bg-teal-500/20 border-teal-400/60 shadow-lg shadow-teal-950/60 text-teal-200"
                  : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-teal-400/40 text-stone-300"
              )}
              title="Filter / inspect Pure Highland Air and altitude peace"
            >
              <div className="w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-400 group-hover/pill:scale-105 transition-transform mb-1.5">
                <Wind size={14} />
              </div>
              <span className="text-xs font-semibold text-stone-100 group-hover/pill:text-teal-300 transition-colors">
                Pure Air
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                Highland Peace
              </span>
            </button>
          </div>

          {/* Active Pillar Insight Callout */}
          <AnimatePresence>
            {activePill && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-stone-300 flex items-start gap-2">
                  <Sparkles size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    {activePill === 'water' && (
                      <span><strong>Perennial Gravity Water:</strong> Prioritize mountain spring headwaters in Mulanje, Zomba, Dedza & Viphya for unmetered irrigation and pure drinking supply.</span>
                    )}
                    {activePill === 'soil' && (
                      <span><strong>Katondo Red Loam:</strong> Rich, deep, well-drained volcanic-alluvial soils ideal for avocados, macadamias, sweet potatoes, and Edenic orchards.</span>
                    )}
                    {activePill === 'air' && (
                      <span><strong>Highland Altitude (1,000m - 1,800m):</strong> Temperate climate, zero oppressive humid heat, disease vector suppression, and Sabbath stillness.</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Geographic Summary Micro-Card */}
        <div className="w-full grid grid-cols-2 gap-2 text-left pt-0.5">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <Mountain size={13} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-mono text-stone-400 uppercase">Coverage</span>
              <span className="text-xs font-bold text-white truncate">28 Districts</span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplets size={13} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-mono text-stone-400 uppercase">Topography</span>
              <span className="text-xs font-bold text-white truncate">Rift Escarpment</span>
            </div>
          </div>
        </div>

      </div>

      {/* Selected District Callout (when user clicked on vector map) */}
      <AnimatePresence>
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative z-30 p-3 bg-stone-900/95 border-t border-emerald-500/40 flex items-center justify-between gap-2 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 min-w-0">
              <MapPin size={14} className="text-emerald-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-white truncate">
                  {selectedDistrict.name} ({selectedDistrict.region})
                </span>
                <span className="text-[10px] text-stone-300 font-sans truncate">
                  Feasibility: {selectedDistrict.feasibilityGrade}
                </span>
              </div>
            </div>

            <Link
              to={`/scout-map?district=${selectedDistrict.id}`}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold shrink-0 flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50"
            >
              <span>Explore</span>
              <ArrowRight size={11} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Map Hint Ribbon */}
      <div className="relative z-10 px-4 py-2 border-t border-white/10 bg-stone-900/70 text-center">
        <span className="text-[10px] text-stone-400 font-sans flex items-center justify-center gap-1.5">
          <Compass size={11} className="text-emerald-400" />
          <span>Move cursor to illuminate districts on vector map</span>
        </span>
      </div>

    </div>
  );
}

export default BotanicalEmblemCrestCard;
