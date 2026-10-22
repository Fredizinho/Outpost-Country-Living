import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Layers, Droplets, Sun, Sparkles, Compass, CheckCircle2, ShieldCheck, ArrowRight, Activity, HelpCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StrataLayer {
  id: string;
  name: string;
  depth: string;
  colorBg: string;
  borderColor: string;
  textColor: string;
  badge: string;
  ph: string;
  humus: string;
  cec: string;
  summary: string;
  adventistStewardship: string;
  recommendedAction: string;
  compatibleCrops: string[];
}

const STRATA_LAYERS: StrataLayer[] = [
  {
    id: 'topsoil',
    name: '01. Rich Topsoil & Organic Layer',
    depth: '0 - 25 cm',
    colorBg: 'bg-emerald-950/90 text-emerald-100',
    borderColor: 'border-emerald-500/50',
    textColor: 'text-emerald-300',
    badge: 'Growing Layer',
    ph: '6.2 - 6.8',
    humus: '4.2% - 5.5%',
    cec: 'High Fertility',
    summary: 'The living, dark surface soil full of earthworms, beneficial microbes, and broken-down leaves. This is where seeds sprout and plant roots absorb daily nutrients.',
    adventistStewardship: 'The earth has energy concealed within her... Those who cultivate the soil will find that it yields treasures. Keeping thick mulch on the ground preserves natural soil life.',
    recommendedAction: 'Cover soil with 10cm of dry grass mulch to protect against hot sun and heavy rain; avoid harsh chemicals that kill earthworms.',
    compatibleCrops: ['Sweet Potatoes', 'Maize & Pigeon Peas', 'Garden Greens & Relish', 'Tomatoes & Vegetables']
  },
  {
    id: 'latosol',
    name: '02. Red Loam & Clay Subsoil',
    depth: '25 - 120 cm',
    colorBg: 'bg-amber-950/90 text-amber-100',
    borderColor: 'border-amber-500/50',
    textColor: 'text-amber-300',
    badge: 'Root Anchor',
    ph: '5.8 - 6.4',
    humus: '1.8% - 2.5%',
    cec: 'Good Hold',
    summary: 'The deep red nutrient-rich clay subsoil. It stores deep water during the dry season and firmly anchors the roots of fruit trees and perennial crops.',
    adventistStewardship: 'Deep-rooting fruit trees draw minerals up from deep in the soil, giving your family strong, nutrient-rich food.',
    recommendedAction: 'Plant Vetiver grass along slope contour lines to stop heavy rain from washing away soil; mix in compost when planting tree seedlings.',
    compatibleCrops: ['Macadamia Trees', 'Avocados & Mangoes', 'Vetiver Grass', 'Cassava & Yams']
  },
  {
    id: 'bedrock',
    name: '03. Rock Bed & Natural Water Filter',
    depth: '1.2 - 3.5 m',
    colorBg: 'bg-stone-900 text-stone-200',
    borderColor: 'border-stone-700',
    textColor: 'text-amber-200',
    badge: 'Rock Base',
    ph: '6.5 - 7.0',
    humus: 'Trace',
    cec: 'Minerals',
    summary: 'Natural stone and broken granite that slowly filters rain as it seeps underground, purifying it into crystal-clear spring water.',
    adventistStewardship: 'Clean spring water flowing through natural rock beds provides pure, unpolluted drinking water for your homestead.',
    recommendedAction: 'Plant trees on high hills to help rainwater soak deep into the underground rock rather than running off as flood water.',
    compatibleCrops: ['Deep-Rooted Fruit Trees', 'Boundary Windbreak Trees', 'Moringa (Chamwamba)']
  },
  {
    id: 'aquifer',
    name: '04. Underground Water (Borehole Table)',
    depth: '4.0 - 25+ m',
    colorBg: 'bg-slate-950 text-cyan-200',
    borderColor: 'border-cyan-500/50',
    textColor: 'text-cyan-300',
    badge: 'Clean Water',
    ph: '7.1 (Pure)',
    humus: 'N/A',
    cec: 'Natural',
    summary: 'Clean underground water reservoir recharged each rainy season. Ideal for solar-powered water pumps to supply house and garden year-round.',
    adventistStewardship: 'Pure water is one of God’s greatest blessings. A protected solar-pumped well ensures continuous fresh water for home and garden.',
    recommendedAction: 'Use solar panels to pump water during sunny hours into an elevated 5,000L tank for simple gravity-fed garden irrigation.',
    compatibleCrops: ['Year-round Irrigated Vegetable Gardens (Dimba)', 'Dry-Season Relish Beds', 'Kitchen Herbs']
  }
];

export function SoilStrataBlueprint() {
  const [activeLayerId, setActiveLayerId] = useState<string>('topsoil');
  const activeLayer = STRATA_LAYERS.find(l => l.id === activeLayerId) || STRATA_LAYERS[0];

  return (
    <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#071F13] to-slate-950 p-6 sm:p-10 md:p-14 rounded-[3rem] text-white border border-emerald-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col gap-8 relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#164e6315_1px,transparent_1px),linear-gradient(to_bottom,#164e6315_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10 border-b border-emerald-500/25 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-300 bg-amber-950/90 border border-amber-500/40 px-3.5 py-1 rounded-full text-caption font-mono font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
              <Sparkles size={11} className="text-amber-400" /> Soil Profile & Pedology Matrix
            </span>
            <span className="text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full text-caption font-mono font-black uppercase tracking-widest hidden sm:inline-block">
              Malawi Soil & Aquifer Depth
            </span>
          </div>

          <h3 className="serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FAF8F5] flex items-center gap-3 tracking-tight">
            Malawi Soil Layers & Groundwater
            <Layers className="text-amber-400" size={30} />
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-emerald-100/80 mt-1.5 max-w-2xl font-medium leading-relaxed">
            Explore the underground architecture of Malawi — from fertile organic humus down to Katondo red clay and crystalline borehole aquifers.
          </p>
        </div>

        {/* Quick Legend Indicator */}
        <div className="flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/25 text-xs font-mono font-bold text-slate-300 shadow-md">
          <Activity size={15} className="text-amber-400 shrink-0" />
          <span>Interactive Cross-Section</span>
        </div>
      </div>

      {/* Main Interactive Grid: Left Strata Visual, Right Detailed Pedology Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Soil Layer Visual Stack (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <span className="text-caption font-mono font-black uppercase tracking-widest text-emerald-400 flex items-center justify-between">
            <span>Interactive Soil &amp; Aquifer Cutaway</span>
            <span>Click Any Stratum</span>
          </span>

          {/* Interactive SVG Cross-Section Cutaway Diagram */}
          <div className="rounded-2xl overflow-hidden border border-emerald-500/35 bg-[#04110B] shadow-inner relative">
            <svg
              viewBox="0 0 420 300"
              className="w-full h-auto select-none block"
              role="img"
              aria-label="Interactive Malawi Soil Profile & Groundwater Aquifer Cutaway"
            >
              {/* Sky & Surface Horizon (0 - 50px) */}
              <rect x="0" y="0" width="420" height="52" fill="#062216" />
              {/* Sun & Rain Infiltration Arrows */}
              <circle cx="375" cy="24" r="13" fill="#F59E0B" fillOpacity="0.25" stroke="#FBBF24" strokeWidth="1.5" />
              <circle cx="375" cy="24" r="6" fill="#FDE68A" />
              {/* Vetiver Grass & Fruit Tree Canopy on Surface */}
              <path d="M55 52 C55 34, 42 22, 34 14 M55 52 C55 32, 55 18, 55 10 M55 52 C55 34, 68 22, 76 14" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Fruit Tree Trunk & Canopy */}
              <path d="M195 52 L195 26" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
              <circle cx="195" cy="20" r="16" fill="#059669" fillOpacity="0.55" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="183" cy="23" r="10" fill="#10B981" fillOpacity="0.45" />
              <circle cx="207" cy="23" r="10" fill="#10B981" fillOpacity="0.45" />
              {/* Solar Borehole Pump Head at Surface */}
              <rect x="310" y="32" width="32" height="20" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="306" y1="26" x2="346" y2="20" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

              {/* LAYER 1: Rich Topsoil & Organic Humus (0-25cm) */}
              <g
                onClick={() => setActiveLayerId('topsoil')}
                className="cursor-pointer transition-opacity"
              >
                <rect
                  x="0"
                  y="52"
                  width="420"
                  height="56"
                  fill={activeLayerId === 'topsoil' ? '#064E3B' : '#052E22'}
                  stroke={activeLayerId === 'topsoil' ? '#FBBF24' : '#10B981'}
                  strokeWidth={activeLayerId === 'topsoil' ? '2.5' : '1'}
                />
                {/* Golden Surface Mulch Blanket */}
                <path d="M0 54 Q35 49 70 54 T140 54 T210 54 T280 54 T350 54 T420 54" stroke="#F59E0B" strokeWidth="3" fill="none" />
                {/* Fibrous Roots & Earthworm Channels */}
                <path d="M55 52 C50 68, 44 82, 38 98 M55 52 C58 70, 64 85, 70 100" stroke="#6EE7B7" strokeWidth="1.5" fill="none" />
                <path d="M115 76 Q128 70 140 78 T165 75" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="95" cy="72" r="2" fill="#A7F3D0" />
                <circle cx="150" cy="90" r="2" fill="#A7F3D0" />
                <circle cx="250" cy="75" r="2" fill="#A7F3D0" />
                <text x="14" y="70" fill="#A7F3D0" fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  O/A HORIZON · HUMUS &amp; MULCH (0–25cm)
                </text>
                <text x="14" y="88" fill="#6EE7B7" fontSize="12" fontFamily="monospace">
                  Mycorrhizal Fungi · Earthworms · pH 6.2–6.8
                </text>
              </g>

              {/* LAYER 2: Katondo Red Loam & Clay Subsoil (25-120cm) */}
              <g
                onClick={() => setActiveLayerId('latosol')}
                className="cursor-pointer transition-opacity"
              >
                <rect
                  x="0"
                  y="108"
                  width="420"
                  height="64"
                  fill={activeLayerId === 'latosol' ? '#78350F' : '#451A03'}
                  stroke={activeLayerId === 'latosol' ? '#FBBF24' : '#D97706'}
                  strokeWidth={activeLayerId === 'latosol' ? '2.5' : '1'}
                />
                {/* Deep Taproots & 3x3x3ft Biochar Pit */}
                <rect x="172" y="108" width="46" height="48" rx="6" fill="#1C1917" fillOpacity="0.6" stroke="#F59E0B" strokeDasharray="3 2" />
                <path d="M195 52 L195 150 M195 115 L178 142 M195 120 L212 146" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M55 95 L52 158 M58 95 L64 154" stroke="#34D399" strokeWidth="1.3" strokeDasharray="2 2" fill="none" />
                <text x="14" y="128" fill="#FDE68A" fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  B HORIZON · KATONDO RED LOAM (25–120cm)
                </text>
                <text x="14" y="146" fill="#FCD34D" fontSize="12" fontFamily="monospace">
                  3×3×3ft Orchard Pit Sponge · Deep Moisture Bank
                </text>
              </g>

              {/* LAYER 3: Weathered Saprolite & Fractured Granite Filter (1.2-3.5m) */}
              <g
                onClick={() => setActiveLayerId('bedrock')}
                className="cursor-pointer transition-opacity"
              >
                <rect
                  x="0"
                  y="172"
                  width="420"
                  height="60"
                  fill={activeLayerId === 'bedrock' ? '#292524' : '#1C1917'}
                  stroke={activeLayerId === 'bedrock' ? '#FBBF24' : '#57534E'}
                  strokeWidth={activeLayerId === 'bedrock' ? '2.5' : '1'}
                />
                {/* Fractured Stone Polygon Blocks & Percolation Drops */}
                <polygon points="240,182 270,178 278,198 246,204" fill="#44403C" stroke="#78716C" strokeWidth="1" />
                <polygon points="285,186 312,180 316,208 282,210" fill="#44403C" stroke="#78716C" strokeWidth="1" />
                <polygon points="185,190 222,185 228,216 190,220" fill="#44403C" stroke="#78716C" strokeWidth="1" />
                <path d="M232 176 L232 226 M279 176 L279 226" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="14" y="194" fill="#E7E5E4" fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  C HORIZON · SAPROLITE ROCK FILTER (1.2–3.5m)
                </text>
                <text x="14" y="212" fill="#A8A29E" fontSize="12" fontFamily="monospace">
                  Natural Mineral Filtration · Spring Percolation Zone
                </text>
              </g>

              {/* LAYER 4: Crystalline Basement Aquifer & Borehole Table (4-25m+) */}
              <g
                onClick={() => setActiveLayerId('aquifer')}
                className="cursor-pointer transition-opacity"
              >
                <rect
                  x="0"
                  y="232"
                  width="420"
                  height="68"
                  fill={activeLayerId === 'aquifer' ? '#083344' : '#041E2B'}
                  stroke={activeLayerId === 'aquifer' ? '#38BDF8' : '#0284C7'}
                  strokeWidth={activeLayerId === 'aquifer' ? '2.5' : '1'}
                />
                {/* Flowing Underground Water Waves */}
                <path d="M0 256 Q45 248 90 256 T180 256 T270 256 T360 256 T420 256" stroke="#38BDF8" strokeWidth="1.8" fill="none" opacity="0.65" />
                <path d="M0 276 Q45 268 90 276 T180 276 T270 276 T360 276 T420 276" stroke="#7DD3FC" strokeWidth="1.5" fill="none" opacity="0.5" />
                <text x="14" y="254" fill="#7DD3FC" fontSize="12.5" fontFamily="monospace" fontWeight="bold">
                  R AQUIFER · BASEMENT WATER TABLE (4–25m+)
                </text>
                <text x="14" y="272" fill="#BAE6FD" fontSize="12" fontFamily="monospace">
                  Solar Submersible Borehole Intake · pH 7.1 Pure
                </text>

              </g>

              {/* Continuous Borehole Casing Pipe from Surface to Aquifer */}
              <rect x="322" y="52" width="8" height="232" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
              <rect x="319" y="262" width="14" height="24" rx="3" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            {STRATA_LAYERS.map((layer) => {
              const isActive = layer.id === activeLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group relative overflow-hidden min-h-[68px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                    isActive
                      ? `${layer.colorBg} ${layer.borderColor} shadow-xl scale-[1.02] ring-2 ring-amber-400/80`
                      : "bg-slate-900/70 text-slate-300 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-transform group-hover:scale-110",
                      isActive ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"
                    )}>
                      {layer.id === 'topsoil' && <Sprout size={16} />}
                      {layer.id === 'latosol' && <Layers size={16} />}
                      {layer.id === 'bedrock' && <Compass size={16} />}
                      {layer.id === 'aquifer' && <Droplets size={16} />}
                    </div>

                    <div>
                      <span className={cn(
                        "text-xs font-black block tracking-tight transition-colors",
                        isActive ? layer.textColor : "text-white group-hover:text-amber-300"
                      )}>
                        {layer.name}
                      </span>
                      <span className="text-caption text-slate-400 font-bold uppercase tracking-wider block">
                        {layer.badge}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={cn(
                      "text-xs font-black px-2.5 py-1 rounded-lg border font-mono block",
                      isActive ? "bg-black/40 text-amber-300 border-amber-400/40" : "bg-slate-950 text-slate-400 border-slate-800"
                    )}>
                      {layer.depth}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3 mt-1">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
            <p className="font-medium text-caption leading-relaxed">
              Tested against Neno, Dedza, and Lilongwe soil pedology samples. Ensures long-term productivity without chemical degradation.
            </p>
          </div>
        </div>

        {/* Right Column: Active Layer Pedology & Ellen White Stewardship Blueprint (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950/90 border border-emerald-500/40 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl flex flex-col gap-6 relative"
            >
              {/* Top Banner inside Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-caption font-mono font-black uppercase tracking-widest text-amber-400 block">
                    Active Layer Dossier • {activeLayer.depth}
                  </span>
                  <h4 className="serif text-2xl font-bold text-white mt-0.5">
                    {activeLayer.name}
                  </h4>
                </div>

                <span className="bg-amber-500/20 text-amber-300 text-xs font-mono font-black uppercase px-3.5 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-1.5">
                  <Sparkles size={14} /> {activeLayer.badge}
                </span>
              </div>

              {/* Data Metric Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <span className="text-caption font-mono font-bold uppercase text-slate-400 block mb-0.5">Target pH</span>
                  <span className="text-amber-300 font-extrabold text-base font-mono">{activeLayer.ph}</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <span className="text-caption font-mono font-bold uppercase text-slate-400 block mb-0.5">Humus (SOM)</span>
                  <span className="text-emerald-300 font-extrabold text-base font-mono">{activeLayer.humus}</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <span className="text-caption font-mono font-bold uppercase text-slate-400 block mb-0.5">Cationic CEC</span>
                  <span className="text-cyan-300 font-extrabold text-base font-mono">{activeLayer.cec}</span>
                </div>
              </div>

              {/* Scientific & Ecological Summary */}
              <div className="flex flex-col gap-1.5">
                <span className="text-caption font-mono font-black uppercase tracking-wider text-emerald-400">
                  Pedological & Agronomic Dynamics:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
                  {activeLayer.summary}
                </p>
              </div>

              {/* Refined Quote Callout Block */}
              <div className="border-l-2 border-amber-500/50 bg-amber-500/5 p-4 rounded-r-xl flex flex-col gap-1.5">
                <span className="text-caption font-mono font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <BookOpen size={12} className="text-amber-400" /> Inspired Country Living Counsel:
                </span>
                <p className="font-serif text-sm italic text-amber-200/90 leading-relaxed">
                  "{activeLayer.adventistStewardship}"
                </p>
              </div>

              {/* Practical Action Steps */}
              <div className="flex flex-col gap-1.5">
                <span className="text-caption font-mono font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-cyan-400" /> Practical Homestead Action:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  {activeLayer.recommendedAction}
                </p>
              </div>

              {/* Compatible Crops */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
                <span className="text-caption font-mono font-black uppercase tracking-wider text-slate-400">
                  Optimal Crops & Agro-Forestry Compatibility:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.compatibleCrops.map((crop, idx) => (
                    <span 
                      key={idx}
                      className="bg-emerald-900/80 text-emerald-200 text-xs font-mono font-bold px-3 py-1 rounded-xl border border-emerald-700/60 flex items-center gap-1.5"
                    >
                      <Sprout size={12} className="text-emerald-400" />
                      <span>{crop}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
