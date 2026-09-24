import { Shield, Hammer, Flame, Package, Zap, CheckCircle2, Circle, X, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { MalawiCropExplorer } from '@/components/crops/MalawiCropExplorer';
import { getStoredPantryStock, saveStoredPantryStock } from '@/lib/offlineStorage';

export default function What() {
  const essentials = [
    { 
      id: 'shelter',
      title: 'Home Building & Strong Shelter', 
      icon: Shield, 
      desc: 'Pressed earth blocks, stone foundations, and timber roofing built to withstand heavy Malawi rains.',
      details: 'Block Making: 70% coarse sand/loam + 20% clay + 10% cement (or lime), pressed tightly using a hand-press machine. Roof Overhang: Keep roof edges at least 1 meter wide to shield mud and earth walls from heavy downpours. Foundation: 60cm deep stone base with waterproof plastic sheet to stop moisture rising.'
    },
    { 
      id: 'tools',
      title: 'Hand Tools & Farm Equipment', 
      icon: Hammer, 
      desc: 'Durable forged hoes, saws, broadforks, treadle pumps, and solar food drying trays.',
      details: 'Choose forged steel over cheap iron. Stock heavy hoes (makhasu), tree-cutting saws, digging forks, and foot-powered Treadle Pumps (Money Maker) for garden irrigation. Food Drying: Simple wooden solar dryers with glass or mesh covers to dry fruit, greens, and beans.'
    },
    { 
      id: 'water',
      title: 'Clean Water & Rain Harvesting', 
      icon: Flame, 
      desc: 'Hillside stream pipes, metal roof rain collection tanks, solar well pumps, and sand water filters.',
      details: 'Sand Water Filter: Clean drums filled with fine silica sand and gravel that clean dirty water naturally and remove bacteria. Rain Collection: A standard iron roof of 100 sq. meters catches over 90,000 liters of fresh rainwater in a normal Malawi rainy season.'
    },
    { 
      id: 'power',
      title: 'Solar Power & Batteries', 
      icon: Zap, 
      desc: 'Solar panels, long-lasting lithium batteries, and direct solar water pumping without fuel.',
      details: 'Simple Solar Setup: 4x 200W solar panels (800W total) paired with a 48V lithium battery can run LED home lights, phone charging, a chest freezer, and daily water pumping with zero monthly bills or fuel costs.'
    },
  ];

  const defaultPantry = [
    { id: 'p1', label: 'Bulk Grains (Corn, Sorghum, Millet, Rice)', checked: false },
    { id: 'p2', label: 'Home-Canned & Solar-Dried Vegetables (Dried Greens, Tomatoes, Squash)', checked: false },
    { id: 'p3', label: 'Heirloom Non-GMO Seeds (Open-Pollinated Heritage Varieties)', checked: false },
    { id: 'p4', label: 'Natural Herbal Remedies & Pure Charcoal (Garlic, Moringa, Aloe)', checked: false },
    { id: 'p5', label: 'Protein Legumes & Dried Beans (Field Beans, Cowpeas, Pigeon Peas, Groundnuts)', checked: false },
    { id: 'p6', label: 'Cold-Pressed Oils & Raw Honey (Sunflower Oil, Groundnut Oil, Honey)', checked: false },
  ];

  const [pantryItems, setPantryItems] = useState(() => {
    const saved = getStoredPantryStock();
    return saved && Array.isArray(saved) && saved.length > 0 ? saved : defaultPantry;
  });

  const [selectedEssential, setSelectedEssential] = useState<typeof essentials[0] | null>(null);

  useEffect(() => {
    saveStoredPantryStock(pantryItems);
  }, [pantryItems]);

  const togglePantryItem = (id: string) => {
    setPantryItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
            <Package size={26} />
          </div>
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest font-bold text-emerald-800">Homestead Infrastructure</span>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900">
              The Essentials & Farm Infrastructure
            </h2>
          </div>
        </div>
        <p className="text-stone-600 max-w-3xl text-sm sm:text-base font-serif font-medium leading-relaxed">
          Building the infrastructure of a self-sustaining home requires intentional stewardship of resources. Click any essential pillar below to inspect detailed field specifications.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {essentials.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedEssential(item)}
            className="bg-white/95 p-7 rounded-3xl border border-stone-200 shadow-xs flex flex-col gap-4 card-hover cursor-pointer group hover:border-emerald-700/50 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-xs group-hover:scale-105 group-hover:bg-emerald-100 transition-all">
              <item.icon size={24} />
            </div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="serif text-xl font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">{item.title}</h3>
              <Info size={16} className="text-stone-400 shrink-0 group-hover:text-emerald-700 transition-colors mt-1" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">{item.desc}</p>
            <span className="text-[11px] font-sans font-bold uppercase text-emerald-800 tracking-wider mt-auto flex items-center gap-1 group-hover:text-emerald-950">
              <span>Read Specs</span>
              <span>→</span>
            </span>
          </div>
        ))}
      </div>

      {/* Malawi Crop Cultivation Blueprint & Agronomy Section */}
      <MalawiCropExplorer />

      {/* Country Pantry Section */}
      <section className="bg-gradient-to-br from-[#071F13] via-slate-950 to-[#041209] backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row gap-10 items-center border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 flex flex-col gap-6 relative z-10 w-full">
          <div>
            <span className="text-amber-400 text-[10px] font-mono font-black uppercase tracking-[0.2em] bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">Pantry Stock Checklist</span>
            <h3 className="serif text-3xl md:text-4xl font-bold mt-2 text-[#FAF8F5]">The Country Pantry & Food Granary</h3>
            <p className="text-emerald-100/80 font-medium text-sm sm:text-base leading-relaxed max-w-lg mt-2">
              A guide to preserving and storing staple harvests, based on inspired counsel to "preserve as much food as possible." Click items to track your off-grid stock!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono font-bold uppercase tracking-wider text-emerald-200">
            {pantryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePantryItem(item.id)}
                className={cn(
                  "flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-98 cursor-pointer shadow-xs",
                  item.checked 
                    ? "bg-emerald-950/90 border-emerald-400/50 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                    : "bg-slate-950/70 border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white"
                )}
              >
                {item.checked ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> : <Circle size={18} className="text-slate-500 shrink-0" />}
                <span className={cn(item.checked && "line-through opacity-75 text-emerald-300")}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-slate-950/80 backdrop-blur-xl p-7 md:p-8 rounded-[2.5rem] border border-amber-500/25 shadow-xl group transition-all shrink-0">
          <h4 className="serif text-xl font-bold mb-3 text-amber-200 italic underline underline-offset-8 decoration-amber-500/40">Pro Stewardship</h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            "Buy tools that last a lifetime. In the country, your tools are your lifeline. Prefer forged steel and seasoned hardwood handles over cheap metal."
          </p>
          <div className="mt-6 flex justify-between items-center pt-4 border-t border-amber-500/20">
             <span className="text-[10px] uppercase font-mono font-bold text-amber-300">Malawi Quality Standard</span>
             <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <Shield size={14} className="text-amber-400" />
             </div>
          </div>
        </div>
      </section>

      {/* Essential Detail Modal */}
      <AnimatePresence>
        {selectedEssential && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B2517] rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-emerald-800 flex flex-col gap-6 relative text-stone-100"
            >
              <button 
                onClick={() => setSelectedEssential(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-amber-300">
                  <selectedEssential.icon size={26} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-sans font-bold tracking-wider text-amber-300">Field Specification</span>
                  <h3 className="serif text-2xl font-bold text-white">{selectedEssential.title}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-stone-200 text-sm font-medium leading-relaxed">
                  {selectedEssential.desc}
                </p>
                <div className="p-4 bg-[#06180E] rounded-2xl border border-emerald-900/80 text-xs text-emerald-100 leading-relaxed font-medium">
                  <strong className="text-amber-300 block mb-1 font-sans uppercase text-[10px] tracking-wider">Practical Field Application:</strong> 
                  {selectedEssential.details}
                </div>
              </div>

              <button 
                onClick={() => setSelectedEssential(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/50 py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Close Specification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
