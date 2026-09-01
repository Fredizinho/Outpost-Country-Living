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
    { id: 'p1', label: 'Bulk Grains (Chimanga, Mapira, Mawere, Rice)', checked: false },
    { id: 'p2', label: 'Home-Canned & Dried Vegetables (Mfutso, Mpiru, Nkhwani)', checked: false },
    { id: 'p3', label: 'Heirloom Non-GMO Seeds (Chimanga cha Makolo)', checked: false },
    { id: 'p4', label: 'Natural Herbal Medicines & Garlic (Galuwinki/Adyo)', checked: false },
    { id: 'p5', label: 'Legumes & Dried Beans (Nyemba, Chimbamba, Nandolo, Nzama)', checked: false },
    { id: 'p6', label: 'Cold-Pressed Oils & Honey (Saniflower, Ntedza Oil)', checked: false },
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
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Package className="text-emerald-700" size={32} />
          <h2 className="serif text-4xl md:text-5xl font-bold text-emerald-950">
            The Essentials
          </h2>
        </div>
        <p className="text-slate-600 max-w-2xl text-lg font-medium">
          Building the infrastructure of a self-sustaining home requires intentional stewardship of resources. Click any essential block for deep-dive guidance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {essentials.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedEssential(item)}
            className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl flex flex-col gap-5 card-hover cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-110 transition-transform">
              <item.icon size={28} />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="serif text-2xl font-bold text-emerald-950">{item.title}</h3>
              <Info size={16} className="text-emerald-600 opacity-60 group-hover:opacity-100" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider mt-auto underline decoration-emerald-300">Read Specs →</span>
          </div>
        ))}
      </div>

      {/* Malawi Crop Cultivation Blueprint & Agronomy Section */}
      <MalawiCropExplorer />

      {/* Country Pantry Section */}
      <section className="bg-emerald-900/90 backdrop-blur-md rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row gap-12 items-center border border-emerald-800 shadow-2xl overflow-hidden relative">
        <div className="flex-1 flex flex-col gap-6 relative z-10 w-full">
          <div>
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Pantry Stock Checklist</span>
            <h3 className="serif text-3xl md:text-4xl font-bold mt-1">The Country Pantry</h3>
            <p className="text-emerald-100/70 font-medium text-base leading-relaxed max-w-lg mt-2">
              A guide to storing food, based on inspired counsel to "preserve as much food as possible." Click items to mark off your stock!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider text-emerald-200">
            {pantryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePantryItem(item.id)}
                className={cn(
                  "flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-98",
                  item.checked 
                    ? "bg-emerald-800/80 border-emerald-500 text-emerald-100" 
                    : "bg-white/10 border-white/15 text-emerald-200 hover:bg-white/15"
                )}
              >
                {item.checked ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> : <Circle size={18} className="text-emerald-400/50 shrink-0" />}
                <span className={cn(item.checked && "line-through opacity-75")}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-inner group transition-all hover:bg-white/15 shrink-0">
          <h4 className="serif text-xl font-bold mb-4 opacity-90 italic underline underline-offset-8 decoration-emerald-500/50">Pro Stewardship</h4>
          <p className="text-sm opacity-90 leading-relaxed font-medium">
            "Buy tools that last a lifetime. In the country, your tools are your lifeline. Prefer forged steel and wooden handles over plastic."
          </p>
          <div className="mt-6 flex justify-between items-center">
             <span className="text-[10px] uppercase font-bold text-emerald-300">Malawi Quality Standard</span>
             <div className="w-8 h-8 rounded-full bg-emerald-800/50 flex items-center justify-center border border-white/10">
                <Shield size={14} className="text-emerald-300" />
             </div>
          </div>
        </div>
      </section>

      {/* Essential Detail Modal */}
      <AnimatePresence>
        {selectedEssential && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[3rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-emerald-100 flex flex-col gap-6 relative"
            >
              <button 
                onClick={() => setSelectedEssential(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 text-emerald-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <selectedEssential.icon size={28} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600">Building Details</span>
                  <h3 className="serif text-2xl font-bold text-emerald-950">{selectedEssential.title} Guide</h3>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  {selectedEssential.desc}
                </p>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed font-medium">
                  <strong>Practical Application:</strong> {selectedEssential.details}
                </div>
              </div>

              <button 
                onClick={() => setSelectedEssential(null)}
                className="bg-emerald-800 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
