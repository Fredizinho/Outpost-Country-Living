import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Droplets, Zap, Sprout, Home, Layers, 
  Info, Eye, Compass, ShieldCheck, CheckCircle2, 
  ChevronRight, Sparkles, MapPin, Maximize2
} from 'lucide-react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  icon: React.ElementType;
  description: string;
  specs: string[];
  link: string;
}

const HOMESTEAD_HOTSPOTS: Hotspot[] = [
  {
    id: 'solar-microgrid',
    title: 'Off-Grid Solar PV & Battery Array',
    category: 'Energy Independence',
    x: 48,
    y: 36,
    icon: Sun,
    description: 'Rooftop monocrystalline array feeding LiFePO4 48V bank. Sized for borehole pumping, cold storage, and essential lighting through 4-day cloud covers.',
    specs: ['3.6 kW PV Array', '9.6 kWh LiFePO4 Storage', 'Pure Sine Inverter'],
    link: '/calculators'
  },
  {
    id: 'gravity-water',
    title: 'Gravity Rainwater & Header Tank Tower',
    category: 'Hydrological Security',
    x: 68,
    y: 28,
    icon: Droplets,
    description: 'Elevated 10,000L ferro-cement header cistern pressurized purely by gravity, feeding drip lines, kitchen sanitization, and bio-sand filtration.',
    specs: ['10,000L Capacity', 'Zero Power Pressure', 'First-Flush Diverter'],
    link: '/calculators'
  },
  {
    id: 'food-forest',
    title: 'Multi-Story Permaculture Food Guilds',
    category: 'Nutritional Sovereignty',
    x: 28,
    y: 72,
    icon: Sprout,
    description: '7-layer food forest with avocado overstory, citrus & macadamia midstory, pigeon pea nitrogen fixers, and sweet potato ground cover.',
    specs: ['Perennial Yields', 'Katondo Composted', 'Vetiver Swales'],
    link: '/skills'
  },
  {
    id: 'thermal-shelter',
    title: 'Locally Fired Eco-Brick Farmhouse',
    category: 'Thermal Architecture',
    x: 44,
    y: 52,
    icon: Home,
    description: 'High thermal-mass burnt brick construction with deep overhangs and cross-ventilation, keeping interiors temperate during October highs and July highland cold.',
    specs: ['Locally Sourced Brick', 'Deep Shaded Verandas', 'Passive Cooling'],
    link: '/vision'
  },
  {
    id: 'terraced-swales',
    title: 'Contour Bunds & Water Retention Swales',
    category: 'Soil Regeneration',
    x: 76,
    y: 78,
    icon: Layers,
    description: 'Keyline water harvesting trenches stabilized by dense vetiver grass hedge rows to stop flash soil erosion and recharge the local water table.',
    specs: ['Vetiver Hedge Rows', 'Zero Runoff Loss', 'Aquifer Recharge'],
    link: '/where'
  }
];

export function HomesteadHeroArtwork() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOMESTEAD_HOTSPOTS[0]);
  const [showHotspots, setShowHotspots] = useState(true);

  return (
    <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-amber-500/30 shadow-[0_30px_80px_rgba(0,0,0,0.7)] bg-[#041d10] group">
      
      {/* High-Resolution Photo Background */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] overflow-hidden">
        <img
          src={COUNTRY_IMAGES.malawiHomesteadSanctuary || COUNTRY_IMAGES.homesteadHighlands}
          alt="Highland Malawi Homestead Sanctuary Archetype"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Cinematic Vignette & Atmospheric Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041209] via-[#041209]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041209]/85 via-transparent to-[#041209]/85" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Top Header Floating Label Bar */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-xl border border-amber-500/35 px-4 py-1.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Malawi Highland Homestead Archetype
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all backdrop-blur-xl border flex items-center gap-2 cursor-pointer shadow-lg active:scale-95",
                showHotspots 
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "bg-slate-950/80 text-slate-400 border-white/10 hover:text-white"
              )}
            >
              <Eye size={13} className={showHotspots ? "text-amber-400" : "text-slate-400"} />
              <span className="hidden sm:inline">{showHotspots ? 'Map Pins Active' : 'Show Pins'}</span>
              <span className="sm:hidden">Pins</span>
            </button>
          </div>
        </div>

        {/* Interactive Hotspots Overlay */}
        {showHotspots && HOMESTEAD_HOTSPOTS.map((spot) => {
          const Icon = spot.icon;
          const isSelected = activeHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(spot)}
                className="relative group/pin p-2.5 cursor-pointer focus:outline-none"
                aria-label={`Inspect ${spot.title}`}
              >
                {/* Ping Rings */}
                <span className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none",
                  isSelected ? "bg-amber-400" : "bg-emerald-400"
                )} />
                
                {/* Pin Core */}
                <div className={cn(
                  "relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border",
                  isSelected 
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 border-amber-100 scale-110 ring-4 ring-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.6)]"
                    : "bg-slate-950/90 text-amber-300 border-amber-500/50 hover:scale-110 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                )}>
                  <Icon size={16} className="stroke-[2.5]" />
                </div>

                {/* Micro Label on Hover/Selected */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-slate-950/95 text-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold border border-amber-500/35 shadow-2xl transition-all pointer-events-none hidden md:block backdrop-blur-md",
                  isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover/pin:opacity-100 group-hover/pin:scale-100"
                )}>
                  {spot.title}
                </div>
              </button>
            </div>
          );
        })}

        {/* Bottom Interactive Spec Drawer on Active Hotspot Selection */}
        <AnimatePresence mode="wait">
          {activeHotspot && showHotspots && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-slate-950/92 backdrop-blur-2xl border border-amber-500/40 p-4 sm:p-6 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-30 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black border border-amber-500/40 tracking-wider">
                    {activeHotspot.category}
                  </span>
                  <span className="text-base sm:text-lg font-bold font-serif text-[#FAF8F5] truncate">
                    {activeHotspot.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl leading-relaxed">
                  {activeHotspot.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {activeHotspot.specs.map((spec, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-mono bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg shadow-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={activeHotspot.link}
                  className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-mono font-black px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(245,158,11,0.35)] active:scale-95 border border-amber-200 uppercase tracking-wider"
                >
                  <span>Explore Spec</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
