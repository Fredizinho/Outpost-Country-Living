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
    compatibleCrops: ['Sweet Potatoes (Mbathata)', 'Maize & Pigeon Peas (Nandolo)', 'Relish Vegetables (Nkhwani)', 'Tomatoes & Greens']
  },
  {
    id: 'latosol',
    name: '02. Red Clay Subsoil (Katondo)',
    depth: '25 - 120 cm',
    colorBg: 'bg-amber-950/90 text-amber-100',
    borderColor: 'border-amber-500/50',
    textColor: 'text-amber-300',
    badge: 'Root Anchor',
    ph: '5.8 - 6.4',
    humus: '1.8% - 2.5%',
    cec: 'Good Hold',
    summary: 'The deep red African clay soil (Katondo). It stores deep water during the dry season and firmly anchors the roots of fruit trees and perennial crops.',
    adventistStewardship: 'Deep-rooting fruit trees draw minerals up from deep in the soil, giving your family strong, nutrient-rich food.',
    recommendedAction: 'Plant Vetiver grass along slope contour lines to stop heavy rain from washing away soil; mix in compost when planting tree seedlings.',
    compatibleCrops: ['Macadamia Trees', 'Avocados & Mangoes (Mitengo ya Chipatso)', 'Vetiver Grass', 'Cassava (Chinangwa)']
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
            <span className="text-amber-300 bg-amber-950/90 border border-amber-500/40 px-3.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
              <Sparkles size={11} className="text-amber-400" /> Soil Profile & Pedology Matrix
            </span>
            <span className="text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest hidden sm:inline-block">
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
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 mb-1 flex items-center justify-between">
            <span>Soil Profile Cross-Section</span>
            <span>Depth Scale</span>
          </span>

          <div className="flex flex-col gap-2.5">
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
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
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
            <p className="font-medium text-[11px] leading-relaxed">
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
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 block">
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
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block mb-0.5">Target pH</span>
                  <span className="text-amber-300 font-extrabold text-base font-mono">{activeLayer.ph}</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block mb-0.5">Humus (SOM)</span>
                  <span className="text-emerald-300 font-extrabold text-base font-mono">{activeLayer.humus}</span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block mb-0.5">Cationic CEC</span>
                  <span className="text-cyan-300 font-extrabold text-base font-mono">{activeLayer.cec}</span>
                </div>
              </div>

              {/* Scientific & Ecological Summary */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400">
                  Pedological & Agronomic Dynamics:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
                  {activeLayer.summary}
                </p>
              </div>

              {/* Refined Quote Callout Block */}
              <div className="border-l-2 border-amber-500/50 bg-amber-500/5 p-4 rounded-r-xl flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <BookOpen size={12} className="text-amber-400" /> Inspired Country Living Counsel:
                </span>
                <p className="font-serif text-sm italic text-amber-200/90 leading-relaxed">
                  "{activeLayer.adventistStewardship}"
                </p>
              </div>

              {/* Practical Action Steps */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-cyan-400" /> Practical Homestead Action:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  {activeLayer.recommendedAction}
                </p>
              </div>

              {/* Compatible Crops */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">
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
