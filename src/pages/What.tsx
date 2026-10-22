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
import { StandardDiagram } from '@/components/common/StandardDiagram';

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
      details: 'Block Making: 70% coarse sand/loam + 20% clay + 10% cement (or lime), pressed tightly using a hand-press machine. Roof Overhang: Keep roof edges at least 1 m [3.3 ft] wide to shield mud and earth walls from heavy downpours. Foundation: 60 cm [2 ft] deep stone base with waterproof plastic sheet to stop moisture rising.'
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
      details: 'Sand Water Filter: Clean drums filled with fine silica sand and gravel that clean dirty water naturally and remove bacteria. Rain Collection: A standard iron roof of 100 m² [1,076 sq ft] catches over 90,000 L [23,775 gal] of fresh rainwater in a normal Malawi rainy season.'
    },
    { 
      id: 'power',
      title: 'Solar Power & Batteries', 
      icon: Zap, 
      desc: 'Solar panels, long-lasting lithium batteries, and direct solar water pumping without fuel.',
      details: 'Simple Solar Setup: 4× 200 W solar panels (800 W total) paired with a 48 V lithium battery can run LED home lights, phone charging, a chest freezer, and daily water pumping with zero monthly bills or fuel costs.'
    },
  ];

  const defaultPantry = [
    { id: 'p1', label: 'Bulk Grains (Chimanga, Mapira, Mchewere, Mpunga)', checked: false },
    { id: 'p2', label: 'Home-Canned & Solar-Dried Vegetables (Mfutso, Tomatoes, Squash)', checked: false },
    { id: 'p3', label: 'Heirloom Non-GMO Seeds (Open-Pollinated Heritage Varieties)', checked: false },
    { id: 'p4', label: 'Natural Herbal Remedies & Pure Charcoal (Chamwamba, Chidole, Garlic)', checked: false },
    { id: 'p5', label: 'Protein Legumes & Dried Beans (Nyemba, Khobwe, Nandolo, Mtedza)', checked: false },
    { id: 'p6', label: 'Cold-Pressed Oils & Raw Honey (Uchi wa Njuchi, Sunflower & Groundnut Oil)', checked: false },
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
    <div className="min-h-screen bg-[#F6F1E7] dark:bg-[#0E1712] text-[#1F2A22] dark:text-[#F6F1E7] pb-16 transition-colors duration-200">
      <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-8">
        <header className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-xl p-5 sm:p-6 border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-4 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-[#2B4636] dark:text-[#D4A034] font-semibold">
                <span>Malawi Agronomy, Pedology &amp; Homestead Reserves</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5A6458] dark:text-[#9FB3A4] font-normal">5 Soil Orders, 75cm Ridges &amp; 3×3×3 ft Orchard Standards</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
                Crops, Soil Chemistry &amp; 3×3×3 ft Orchard Pits
              </h1>
            </div>

            <Link
              to="/seasons"
              className="self-start md:self-auto bg-[#B4531F] dark:bg-[#D3672E] hover:opacity-90 text-white font-sans font-semibold text-xs px-3.5 py-2 rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Monthly Planting Almanac →</span>
            </Link>
          </div>

          {/* Consolidated 4-Tab Agronomy & Country Kitchen Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F6F1E7] dark:bg-[#0E1712] p-1 rounded-lg border border-[#E4DCCB] dark:border-[#283C30] self-start">
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
                    'px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                    active
                      ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs font-bold'
                      : 'text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#FFFDF8] dark:hover:bg-[#17241C] hover:text-[#1F2A22] dark:hover:text-[#F6F1E7]'
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
              <div className="p-8 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] text-center text-xs font-mono text-[#5A6458] dark:text-[#9FB3A4]">
                Loading Edenic Country Kitchen &amp; Unfermented Bread Bakery...
              </div>
            }
          >
            <EdenicCountryKitchen />
          </Suspense>
        )}

        {workspaceTab === 'orchard-pits' && (
          <div className="flex flex-col gap-8">
            <div className="bg-[#FFFDF8] dark:bg-[#17241C] p-6 sm:p-8 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] shadow-sm">
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
              className="bg-[#FFFDF8] dark:bg-[#17241C] p-6 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-4 cursor-pointer group hover:border-[#B4531F] dark:hover:border-[#D3672E] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2B4636]/10 dark:bg-[#1F3325] border border-[#2B4636]/20 dark:border-[#283C30] flex items-center justify-center text-[#2B4636] dark:text-[#D4A034] shadow-xs group-hover:scale-105 transition-all">
                <item.icon size={20} />
              </div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-serif text-lg font-bold text-[#1F2A22] dark:text-[#FFFDF8] group-hover:text-[#B4531F] dark:group-hover:text-[#D4A034] transition-colors">{item.title}</h3>
                <Info size={15} className="text-[#5A6458] dark:text-[#9FB3A4] shrink-0 mt-1" />
              </div>
              <p className="text-xs text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed font-normal">{item.desc}</p>
              <span className="text-caption font-mono font-bold uppercase text-[#B4531F] dark:text-[#D4A034] tracking-wider mt-auto flex items-center gap-1">
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
        <section className="p-6 sm:p-8 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-5 transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E4DCCB] dark:border-[#283C30]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5A6458] dark:text-[#9FB3A4]">
                <span className="font-semibold text-[#2B4636] dark:text-[#D4A034]">Malawi Pedology Registry</span>
                <span aria-hidden="true">·</span>
                <span>5 Major Soil Orders</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] mt-0.5">
                Malawi Soil Chemistry &amp; Organic Amendment Reference
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SOIL_TYPES_REGISTRY.map((soil) => (
                <button
                  key={soil.id}
                  type="button"
                  onClick={() => setSelectedSoilId(soil.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap hover:-translate-y-0.5',
                    selectedSoilId === soil.id
                      ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs font-bold'
                      : 'bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
                  )}
                >
                  {soil.name.split(' ')[0]} {soil.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex flex-col gap-2.5 p-5 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
              <span className="text-xs font-mono text-[#B4531F] dark:text-[#D4A034] font-semibold">
                {activeSoil.chichewaName}
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                {activeSoil.name}
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#5A6458] dark:text-[#9FB3A4] tabular-nums pt-1">
                <span>{activeSoil.phRange}</span>
                <span aria-hidden="true">·</span>
                <span>Drainage: {activeSoil.drainage}</span>
                <span aria-hidden="true">·</span>
                <span>Target OM: {activeSoil.organicMatterTarget}</span>
              </div>
              <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] pt-1">
                FAO Classification: {activeSoil.faoClassification}
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3 p-5 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
              <div>
                <span className="text-xs font-bold text-[#1F2A22] dark:text-[#FFFDF8] block mb-1">
                  Organic Soil Restoration &amp; Amendment Protocol
                </span>
                <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
                  {activeSoil.amendmentProtocol}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30] text-xs">
                <div>
                  <span className="font-semibold text-[#1F2A22] dark:text-[#FFFDF8] block">Primary Malawi Districts:</span>
                  <span className="text-[#5A6458] dark:text-[#9FB3A4]">{activeSoil.primaryDistricts.join(' · ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1F2A22] dark:text-[#FFFDF8] block">Best Adapted Crops:</span>
                  <span className="text-[#5A6458] dark:text-[#9FB3A4]">{activeSoil.idealCrops.join(' · ')}</span>
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
      <section className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-xl p-6 sm:p-8 text-[#1F2A22] dark:text-[#F6F1E7] flex flex-col md:flex-row gap-8 items-start border border-[#E4DCCB] dark:border-[#283C30] shadow-sm overflow-hidden relative transition-colors">
        <div className="flex-1 flex flex-col gap-5 relative z-10 w-full">
          <div>
            <span className="text-[#2B4636] dark:text-[#D4A034] text-xs font-mono font-semibold uppercase tracking-wider">Pantry Stock Checklist</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#1F2A22] dark:text-[#FFFDF8]">The Country Pantry &amp; Food Granary</h3>
            <p className="text-[#5A6458] dark:text-[#9FB3A4] font-normal text-sm leading-relaxed max-w-lg mt-1.5">
              A guide to preserving and storing staple harvests, based on inspired counsel to &ldquo;preserve as much food as possible.&rdquo; Click items to track your off-grid stock.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans font-medium">
            {pantryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePantryItem(item.id)}
                className={cn(
                  "flex items-center gap-3 p-3.5 rounded-lg border transition-all duration-200 text-left active:scale-[0.98] cursor-pointer leading-snug hover:-translate-y-0.5",
                  item.checked 
                    ? "bg-[#2B4636]/10 dark:bg-[#1F3325] border-[#2B4636]/40 dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] shadow-xs" 
                    : "bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]"
                )}
              >
                {item.checked ? <CheckCircle2 size={16} className="text-[#3F6B4E] shrink-0" /> : <Circle size={16} className="text-[#5A6458] dark:text-[#9FB3A4] shrink-0" />}
                <span className={cn(item.checked && "line-through opacity-70 text-[#5A6458] dark:text-[#9FB3A4]")}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-[#F6F1E7] dark:bg-[#0E1712] p-6 rounded-lg border border-[#E4DCCB] dark:border-[#283C30] shrink-0">
          <h4 className="font-serif text-lg font-bold mb-2 text-[#1F2A22] dark:text-[#FFFDF8]">Pro Stewardship</h4>
          <p className="text-xs text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed italic">
            &ldquo;Buy tools that last a lifetime. In the country, your tools are your lifeline. Prefer forged steel and seasoned hardwood handles over cheap metal.&rdquo;
          </p>
          <div className="mt-4 flex justify-between items-center pt-3 border-t border-[#E4DCCB] dark:border-[#283C30]">
             <span className="text-xs font-mono font-semibold text-[#2B4636] dark:text-[#D4A034]">Malawi Quality Standard</span>
             <div className="w-7 h-7 rounded-md bg-[#2B4636]/15 dark:bg-[#1F3325] flex items-center justify-center border border-[#2B4636]/25 dark:border-[#283C30]">
                <Shield size={13} className="text-[#2B4636] dark:text-[#D4A034]" />
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
              className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-5 relative text-[#1F2A22] dark:text-[#F6F1E7] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedEssential(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-[#FFFDF8] transition-colors cursor-pointer border border-[#E4DCCB] dark:border-[#283C30]"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#2B4636]/10 dark:bg-[#1F3325] border border-[#2B4636]/20 dark:border-[#283C30] flex items-center justify-center text-[#2B4636] dark:text-[#D4A034]">
                  <selectedEssential.icon size={22} />
                </div>
                <div>
                  <span className="text-caption uppercase font-mono font-bold tracking-wider text-[#B4531F] dark:text-[#D4A034]">
                    Field Engineering Specification
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                    {selectedEssential.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] font-medium leading-relaxed">
                  {selectedEssential.desc}
                </p>

                {selectedEssential.id === 'water' && (
                  <div className="my-1 rounded-xl overflow-hidden border border-[#E4DCCB] dark:border-[#283C30] bg-[#F6F1E7] dark:bg-[#0E1712] p-2">
                    <StandardDiagram type="roof-tank" className="bg-transparent border-0" />
                  </div>
                )}

                <div className="p-4 bg-[#F6F1E7] dark:bg-[#0E1712] rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed font-medium">
                  <strong className="text-[#B4531F] dark:text-[#D4A034] block mb-1 font-mono uppercase text-caption tracking-wider">
                    Practical Field Application:
                  </strong> 
                  {selectedEssential.details}
                </div>
              </div>

              <button 
                onClick={() => setSelectedEssential(null)}
                className="bg-[#2B4636] hover:bg-[#1F3325] dark:bg-[#283C30] dark:hover:bg-[#344E3E] text-white py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Close Specification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
