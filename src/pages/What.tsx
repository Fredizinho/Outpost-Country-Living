import { Shield, Hammer, Flame, Package, Zap, CheckCircle2, Circle, X, Info, Sprout, Calendar, Layers, UtensilsCrossed } from 'lucide-react';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { MalawiCropExplorer } from '@/components/crops/MalawiCropExplorer';
import { VisualSoilSwatchGuide } from '@/components/outpost/VisualSoilSwatchGuide';
import { MalawiRidgeAndSeedPlanner } from '@/components/outpost/MalawiRidgeAndSeedPlanner';
import { EdenicAgricultureGuides } from '@/components/outpost/EdenicAgricultureGuides';
import { SoilStrataBlueprint } from '@/components/home/SoilStrataBlueprint';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { getStoredPantryStock, saveStoredPantryStock } from '@/lib/offlineStorage';
import { SOIL_TYPES_REGISTRY } from '@/constants';

const EdenicCountryKitchen = lazy(() =>
  import('@/components/outpost/EdenicCountryKitchen').then((m) => ({
    default: m.EdenicCountryKitchen,
  }))
);

export default function What() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [workspaceTab, setWorkspaceTab] = useState<'soil-crops' | 'orchard-pits' | 'pantry-infra' | 'kitchen'>(() => {
    if (
      location.pathname.startsWith('/kitchen') ||
      searchParams.get('tab') === 'kitchen'
    ) {
      return 'kitchen';
    }
    if (searchParams.get('tab') === 'orchard-pits') return 'orchard-pits';
    if (searchParams.get('tab') === 'pantry-infra') return 'pantry-infra';
    return 'soil-crops';
  });

  useEffect(() => {
    if (
      location.pathname.startsWith('/kitchen') ||
      searchParams.get('tab') === 'kitchen'
    ) {
      setWorkspaceTab('kitchen');
    } else if (searchParams.get('tab') === 'orchard-pits') {
      setWorkspaceTab('orchard-pits');
    } else if (searchParams.get('tab') === 'pantry-infra') {
      setWorkspaceTab('pantry-infra');
    }
  }, [location.pathname, searchParams]);

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
  const [selectedSoilId, setSelectedSoilId] = useState<string>(SOIL_TYPES_REGISTRY[0].id);

  useEffect(() => {
    saveStoredPantryStock(pantryItems);
  }, [pantryItems]);

  useEffect(() => {
    if (!selectedEssential) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEssential(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedEssential]);

  const togglePantryItem = (id: string) => {
    setPantryItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const activeSoil = SOIL_TYPES_REGISTRY.find(s => s.id === selectedSoilId) || SOIL_TYPES_REGISTRY[0];

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-8">
      <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>Malawi Agronomy, Pedology &amp; Homestead Reserves</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">5 Soil Orders, 75cm Ridges &amp; How to Persuade Red Clay to Grow Apples</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              Crops, Soil Chemistry &amp; 3×3×3 ft Orchard Pits
            </h1>
          </div>

          <Link
            to="/seasons"
            className="self-start md:self-auto bg-emerald-900 hover:bg-emerald-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-sans font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Calendar size={13} />
            <span>Monthly Planting Almanac →</span>
          </Link>
        </div>

        {/* Consolidated 4-Tab Agronomy & Country Kitchen Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800 self-start">
          {([
            { id: 'soil-crops', label: '01. Crops, Soil Swatches & 75cm Ridges', icon: Sprout },
            { id: 'orchard-pits', label: '02. 3×3×3 ft Orchard Pits & Organic Manuals', icon: Layers },
            { id: 'pantry-infra', label: '03. Country Pantry & Shelter Specs', icon: Package },
            { id: 'kitchen', label: '04. Edenic Country Kitchen & Unfermented Bread', icon: UtensilsCrossed },
          ] as const).map((tab) => {
            const active = workspaceTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setWorkspaceTab(tab.id)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5',
                  active
                    ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                )}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <ActiveDistrictContextBar />
      </header>

      {workspaceTab === 'kitchen' && (
        <Suspense
          fallback={
            <div className="p-8 rounded-3xl text-center text-xs font-mono text-stone-500">
              Loading Edenic Country Kitchen &amp; Unfermented Bread Bakery...
            </div>
          }
        >
          <EdenicCountryKitchen />
        </Suspense>
      )}

      {workspaceTab === 'orchard-pits' && (
        <div className="flex flex-col gap-8">
          <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-xs">
            <EdenicAgricultureGuides />
          </div>
          <SoilStrataBlueprint />
        </div>
      )}

      {workspaceTab === 'pantry-infra' && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {essentials.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedEssential(item)}
            className="bg-white/95 dark:bg-[#0D1D13] p-7 rounded-3xl border border-stone-200 dark:border-emerald-900/60 shadow-xs flex flex-col gap-4 card-hover cursor-pointer group hover:border-emerald-700/50 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-xs group-hover:scale-105 transition-all">
              <item.icon size={24} />
            </div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">{item.title}</h3>
              <Info size={16} className="text-stone-400 shrink-0 group-hover:text-emerald-700 transition-colors mt-1" />
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium">{item.desc}</p>
            <span className="text-xs font-sans font-bold uppercase text-emerald-800 dark:text-emerald-400 tracking-wider mt-auto flex items-center gap-1">
              <span>Read Specs</span>
              <span>→</span>
            </span>
          </div>
        ))}
      </div>
      )}

      {/* Malawi Soil Orders & Organic Fertility Protocol Selector */}
      {workspaceTab === 'soil-crops' && (
      <>
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200 dark:border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400">Malawi Pedology Registry</span>
              <span aria-hidden="true">·</span>
              <span>5 Major Soil Orders</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
              Malawi Soil Chemistry & Organic Amendment Reference
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {SOIL_TYPES_REGISTRY.map((soil) => (
              <button
                key={soil.id}
                type="button"
                onClick={() => setSelectedSoilId(soil.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                  selectedSoilId === soil.id
                    ? 'bg-emerald-900 text-white dark:bg-emerald-700'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                )}
              >
                {soil.name.split(' ')[0]} {soil.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col gap-2.5 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/40">
            <span className="text-xs font-mono text-emerald-800 dark:text-amber-300 font-semibold">
              {activeSoil.chichewaName}
            </span>
            <h4 className="font-display text-xl font-bold text-stone-900 dark:text-white">
              {activeSoil.name}
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-stone-600 dark:text-stone-300 tabular-nums pt-1">
              <span>{activeSoil.phRange}</span>
              <span aria-hidden="true">·</span>
              <span>Drainage: {activeSoil.drainage}</span>
              <span aria-hidden="true">·</span>
              <span>Target OM: {activeSoil.organicMatterTarget}</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 pt-1">
              FAO Classification: {activeSoil.faoClassification}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/40">
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-white block mb-1">
                Organic Soil Restoration & Amendment Protocol
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                {activeSoil.amendmentProtocol}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200/70 dark:border-emerald-900/40 text-xs">
              <div>
                <span className="font-semibold text-stone-900 dark:text-white block">Primary Malawi Districts:</span>
                <span className="text-stone-600 dark:text-stone-300">{activeSoil.primaryDistricts.join(' · ')}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-900 dark:text-white block">Best Adapted Crops:</span>
                <span className="text-stone-600 dark:text-stone-300">{activeSoil.idealCrops.join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Soil Swatch & Hand-Ribbon Test Guide */}
        <VisualSoilSwatchGuide />
      </section>

      {/* Interactive 75cm Ridge Companion Planner & Malawi Seed Station Directory */}
      <MalawiRidgeAndSeedPlanner />

      {/* Malawi Crop Cultivation Blueprint & Agronomy Section */}
      <MalawiCropExplorer />
      </>
      )}

      {/* Country Pantry Section */}
      {(workspaceTab === 'pantry-infra' || workspaceTab === 'soil-crops') && (
      <section className="bg-white dark:bg-[#0D1D13] rounded-3xl p-6 sm:p-8 md:p-10 text-stone-900 dark:text-stone-100 flex flex-col md:flex-row gap-8 items-start border border-stone-200/90 dark:border-emerald-900/60 shadow-xs overflow-hidden relative">
        <div className="flex-1 flex flex-col gap-5 relative z-10 w-full">
          <div>
            <span className="text-emerald-800 dark:text-amber-400 text-xs font-sans font-semibold">Pantry Stock Checklist</span>
            <h3 className="serif text-2xl sm:text-3xl font-bold mt-1 text-stone-900 dark:text-stone-50">The Country Pantry &amp; Food Granary</h3>
            <p className="text-stone-600 dark:text-stone-300 font-medium text-sm leading-relaxed max-w-lg mt-1.5">
              A guide to preserving and storing staple harvests, based on inspired counsel to &ldquo;preserve as much food as possible.&rdquo; Click items to track your off-grid stock.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans font-medium">
            {pantryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePantryItem(item.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-all text-left active:scale-98 cursor-pointer leading-snug",
                  item.checked 
                    ? "bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 shadow-2xs" 
                    : "bg-stone-50/90 dark:bg-stone-900/60 border-stone-200/90 dark:border-emerald-900/40 text-stone-800 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-900"
                )}
              >
                {item.checked ? <CheckCircle2 size={18} className="text-emerald-700 dark:text-emerald-400 shrink-0" /> : <Circle size={18} className="text-stone-400 dark:text-stone-500 shrink-0" />}
                <span className={cn(item.checked && "line-through opacity-70 text-emerald-800 dark:text-emerald-300")}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-stone-50 dark:bg-stone-900/80 p-6 sm:p-7 rounded-2xl border border-stone-200/90 dark:border-emerald-900/50 shrink-0">
          <h4 className="serif text-xl font-bold mb-2.5 text-stone-900 dark:text-amber-200">Pro Stewardship</h4>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium italic">
            &ldquo;Buy tools that last a lifetime. In the country, your tools are your lifeline. Prefer forged steel and seasoned hardwood handles over cheap metal.&rdquo;
          </p>
          <div className="mt-5 flex justify-between items-center pt-3.5 border-t border-stone-200 dark:border-emerald-900/40">
             <span className="text-xs font-sans font-semibold text-emerald-800 dark:text-amber-300">Malawi Quality Standard</span>
             <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-amber-500/20 flex items-center justify-center border border-emerald-300 dark:border-amber-500/30">
                <Shield size={14} className="text-emerald-800 dark:text-amber-400" />
             </div>
          </div>
        </div>
      </section>
      )}

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
                  <span className="text-caption uppercase font-sans font-bold tracking-wider text-amber-300">Field Specification</span>
                  <h3 className="serif text-2xl font-bold text-white">{selectedEssential.title}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-stone-200 text-sm font-medium leading-relaxed">
                  {selectedEssential.desc}
                </p>
                <div className="p-4 bg-[#06180E] rounded-2xl border border-emerald-900/80 text-xs text-emerald-100 leading-relaxed font-medium">
                  <strong className="text-amber-300 block mb-1 font-sans uppercase text-caption tracking-wider">Practical Field Application:</strong> 
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
