import { Sprout, Users, Hammer, HeartPulse, CheckCircle2, Circle, ArrowRight, BookOpen, ShieldCheck, Home, Compass, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredMasteredSkills, saveStoredMasteredSkills } from '@/lib/offlineStorage';
import { PLANTING_PIT_SPECS, PlantingPitKey } from '@/constants';
import { FieldEngineeringDiagrams } from '@/components/outpost/FieldEngineeringDiagrams';

const MASTERY_SKILLS = [
  { id: 's1', title: 'Deep Organic Compost Pit', category: 'Gardening' },
  { id: 's2', title: 'Natural Yeast & Sourdough Bread', category: 'Handicrafts' },
  { id: 's3', title: 'Food Canning & Solar Sun-Drying', category: 'Preservation' },
  { id: 's4', title: 'Local Seed Saving & Storage', category: 'Gardening' },
  { id: 's5', title: 'Natural Healing & Charcoal Remedy', category: 'Healing' },
  { id: 's6', title: 'Timber Building & Wood Joinery', category: 'Handicrafts' },
  { id: 's7', title: 'Sand Water Filter Care', category: 'Clean Water' },
  { id: 's8', title: 'Vetiver Grass Planting on Slopes', category: 'Soil Care' },
  { id: 's9', title: 'Solar Panels & 48V Battery Wiring', category: 'Solar Power' },
  { id: 's10', title: 'Mountain Spring Water Piping', category: 'Clean Water' },
  { id: 's11', title: 'Broadfork Soil Aeration (No-Till)', category: 'Gardening' },
  { id: 's12', title: 'Herbal Teas & Natural Ointments', category: 'Healing' },
];

export default function How() {
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    return getStoredMasteredSkills();
  });
  const [activePitKey, setActivePitKey] = useState<PlantingPitKey>('egwDeepPit');

  useEffect(() => {
    saveStoredMasteredSkills(masteredIds);
  }, [masteredIds]);

  const toggleSkill = (id: string) => {
    setMasteredIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  const skills = [
    { title: 'Gardening & Soil Cultivation', icon: Sprout, path: '/what', desc: 'Growing staple grains, cassava, protein legumes, and mineral-rich green garden vegetables.' },
    { title: 'Food Preservation & Solar Drying', icon: Hammer, path: '/skills', desc: 'Solar drying of green vegetables, airtight seed saving, and ventilated granary ash preservation.' },
    { title: 'Rural Crafts & Homestead Trades', icon: Users, path: '/skills', desc: 'Self-sufficient trades for rural independence: carpentry, solar electrics, masonry, and remote digital productivity.' },
    { title: 'Natural Health & Hydrotherapy', icon: HeartPulse, path: '/vision', desc: 'Hydrotherapy treatments and the application of natural simple remedies like Garlic, Aloe vera, Charcoal, and Moringa.' },
  ];

  const activePit = PLANTING_PIT_SPECS[activePitKey];

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-12">
      <header className="p-8 md:p-12 rounded-3xl bg-stone-950 text-stone-100 border border-emerald-900/60 shadow-xl flex flex-col gap-3 text-center items-center">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
          <span>Homestead Education & Mastery</span>
          <span aria-hidden="true">·</span>
          <span>Practical Field Protocols</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
          How to Thrive on the Land
        </h1>
        <p className="text-emerald-100/85 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
          "The culture of the soil is the A, B, and C of the education which we should give."
        </p>
      </header>

      {/* Interactive Planting Pit & Bio-Intensive Bed Field Workshop */}
      <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200 dark:border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400">Standardized Agronomy Specs</span>
              <span aria-hidden="true">·</span>
              <span>6 Excavation Blueprints</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
              Planting Pit & Permaculture Bed Field Specifications
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.values(PLANTING_PIT_SPECS).map((pit) => (
              <button
                key={pit.key}
                type="button"
                onClick={() => setActivePitKey(pit.key)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                  activePitKey === pit.key
                    ? 'bg-emerald-900 text-white dark:bg-emerald-700'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                )}
              >
                {pit.name.replace('Ellen G. White ', 'EGW ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/40">
            <div>
              <span className="text-xs font-mono text-emerald-800 dark:text-amber-300 font-semibold">
                {activePit.chichewaName}
              </span>
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                {activePit.name}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-1.5">
                {activePit.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200/70 dark:border-emerald-900/40 font-mono text-xs tabular-nums">
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Dimensions</span>
                <span className="font-bold text-stone-900 dark:text-white">{activePit.dimensionString}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Moisture Retention</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-400">{activePit.waterRetentionLiters} L / pit</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Biochar / Compost</span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {activePit.biocharKgPerPit} kg · {activePit.compostWheelbarrows} barrows
                </span>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">Est. Field Labor</span>
                <span className="font-bold text-stone-900 dark:text-white">{activePit.laborHoursEstimate}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-emerald-900/40">
            <span className="text-xs font-bold text-stone-900 dark:text-white">
              Step-by-Step Horizon Filling Sequence
            </span>
            <div className="flex flex-col gap-2.5">
              {activePit.layers.map((layer, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200/70 dark:border-emerald-900/40 flex items-start gap-3 text-xs text-stone-700 dark:text-stone-200"
                >
                  <span className="font-mono font-bold text-emerald-800 dark:text-amber-300 tabular-nums shrink-0">
                    0{index + 1}.
                  </span>
                  <span className="leading-relaxed">{layer}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-xs text-stone-600 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-white">Ideal Crops: </strong>
              {activePit.idealCrops.join(' · ')}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <div 
            key={i} 
            className="backdrop-blur-xl bg-slate-950/70 p-8 sm:p-10 rounded-[2.5rem] flex flex-col gap-5 border border-amber-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.4)] card-hover group hover:border-amber-500/50 hover:bg-slate-950/90 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-400/50 transition-all shadow-inner">
              <skill.icon size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="serif text-2xl font-bold text-[#FAF8F5] group-hover:text-amber-200 transition-colors">{skill.title}</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">{skill.desc}</p>
            </div>
            <Link 
              to={skill.path}
              className="mt-auto w-fit bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        ))}
      </div>

      <section className="backdrop-blur-xl bg-slate-950/80 border border-amber-500/25 p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-300 tracking-widest">Agro-Ecological Seasons</span>
          <h3 className="serif text-3xl md:text-4xl font-bold text-[#FAF8F5]">Malawi Seasonal Guide</h3>
          <p className="text-sm text-emerald-100/70 font-medium max-w-lg">Practical stewardship aligned with the cyclical rainfall and farming seasons of Malawi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SeasonCard 
            season="Rainy Season (Nov – Mar)" 
            color="text-emerald-400" 
            items={['Maize & Corn', 'Field Beans', 'Pigeon Peas', 'Pumpkin Leaves & Squash']} 
            advice="Plant with the first effective soaking rains on prepared ridges. Focus on early weeding and applying mature compost directly in planting stations."
            event="Tree Planting & Sowing Period"
          />
          <SeasonCard 
            season="Harvest Season (Apr – Jun)" 
            color="text-amber-400" 
            items={['Soybeans', 'Sweet Potatoes', 'Groundnuts', 'Irish Potatoes']} 
            advice="Harvest when crops reach full physiological maturity. Ensure grains are dried thoroughly on raised racks before storage in ventilated pest-proof granaries."
            event="Harvest Thanksgiving Gatherings"
          />
          <SeasonCard 
            season="Cold Season (Jul – Aug)" 
            color="text-sky-400" 
            items={['Mustard Greens', 'Red Onions', 'Garlic', 'Sub-Irrigated Valley Beds']} 
            advice="Utilize moist valley beds and simple gravity/treadle irrigation. Use residual valley moisture for vegetable beds. Protect tender seedlings from cold plateau drafts."
            event="Winter Wheat & Green Relish Season"
          />
          <SeasonCard 
            season="Hot Dry Season (Sep – Oct)" 
            color="text-amber-300" 
            items={['Bed Preparation', 'Banana Mulch Pits', 'Fruit Tree Mulching', 'Legume Cover Crops']} 
            advice="Clear fields and prepare planting stations with compost. Mulch perennial orchards heavily (Mangoes & Avocados) to conserve deep subsoil moisture."
            event="Homestead Dry Season Building"
          />
        </div>
      </section>

      {/* Illustrated Cross-Sectional Engineering & Planting Schematics */}
      <FieldEngineeringDiagrams />

      <section className="bg-gradient-to-br from-[#071F13] via-slate-950 to-[#041209] backdrop-blur-2xl p-8 sm:p-12 rounded-[3.5rem] text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-amber-400 text-[10px] font-mono font-black uppercase tracking-widest">Self-Reliance Tracker</span>
            <h3 className="serif text-3xl sm:text-4xl font-bold text-[#FAF8F5]">Homestead Skills Mastery</h3>
            <p className="text-emerald-100/70 font-medium text-sm sm:text-base max-w-md">Track your progress acquiring the practical off-grid competencies required for country independence.</p>
          </div>
          <div className="bg-slate-950/80 px-6 py-3.5 rounded-2xl border border-amber-500/30 shadow-md flex items-center gap-3">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{masteredIds.length}</span>
            <span className="text-emerald-200/80 text-[10px] font-mono font-black uppercase tracking-wider">Skills<br />Mastered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTERY_SKILLS.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={cn(
                "flex items-center justify-between p-5 rounded-[1.75rem] border transition-all active:scale-95 text-left cursor-pointer shadow-xs",
                masteredIds.includes(skill.id) 
                  ? "bg-emerald-950/90 border-emerald-400/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                  : "bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-900 hover:text-white hover:border-amber-500/30"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-amber-400/80">{skill.category}</span>
                <span className="font-bold text-sm tracking-tight text-slate-100">{skill.title}</span>
              </div>
              {masteredIds.includes(skill.id) ? (
                <CheckCircle2 size={22} className="text-emerald-400 shrink-0 ml-2" />
              ) : (
                <Circle size={22} className="text-slate-600 shrink-0 ml-2" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Dedicated Pillar 3 & 4 Deep-Dive Directory (Replaces duplicate inline page renders) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs flex flex-col gap-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
            Continue Your Practical Preparation
          </span>
          <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
            Dedicated Field Manuals & Outpost Directories
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/agriculture"
            className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 border border-stone-200/90 dark:border-emerald-900/50 transition-colors flex flex-col justify-between gap-3 group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                PILLAR 03 · AGRONOMY
              </span>
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1 group-hover:text-emerald-800 dark:group-hover:text-amber-300">
                Edenic Soil & Compost Manuals
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Step-by-step guides for 3×3×3 ft fruit tree pits, hot compost piles, broadforking, and heirloom seed saving.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1">
              <span>Open Agronomy Manual</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            to="/blueprints"
            className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 border border-stone-200/90 dark:border-emerald-900/50 transition-colors flex flex-col justify-between gap-3 group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                PILLAR 04 · ARCHITECTURE
              </span>
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1 group-hover:text-emerald-800 dark:group-hover:text-amber-300">
                Outpost & Sanitarium Blueprints
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Explore site layouts for family homesteads, rural lifestyle sanitariums, and Avondale-style training schools.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1">
              <span>Open Outpost Blueprints</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            to="/community"
            className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 border border-stone-200/90 dark:border-emerald-900/50 transition-colors flex flex-col justify-between gap-3 group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300">
                PILLAR 04 · FELLOWSHIP
              </span>
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1 group-hover:text-emerald-800 dark:group-hover:text-amber-300">
                Malawi Outpost & Believer Directory
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                Save and organize local homesteading contacts, heirloom seed savers, and solar/borehole technicians.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1">
              <span>Open Believer Directory</span>
              <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function SeasonCard({ season, color, items, advice, event }: any) {
  return (
    <div className="p-7 rounded-[2.25rem] bg-slate-950/70 border border-amber-500/20 flex flex-col gap-5 shadow-inner hover:border-amber-500/40 transition-colors">
      <div className="flex justify-between items-center">
        <span className={cn("text-[10px] font-mono font-black uppercase tracking-[0.15em]", color)}>{season}</span>
        <div className="h-px bg-amber-500/20 flex-1 ml-4" />
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-[9px] font-mono font-black uppercase text-slate-400 tracking-widest block mb-2">Core Crops</span>
          <div className="flex flex-wrap gap-2">
            {items.map((item: string) => (
              <span key={item} className="text-xs font-bold text-emerald-200 bg-emerald-950/70 px-3 py-1 rounded-xl border border-emerald-500/30 font-mono">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[9px] font-mono font-black uppercase text-amber-400/80 tracking-widest block mb-1">Stewardship Advice</span>
          <p className="text-xs text-slate-300 font-medium leading-relaxed italic">{advice}</p>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-col gap-1">
          <span className="text-[9px] font-mono font-black uppercase text-emerald-400/60 tracking-widest">Community Context</span>
          <span className="text-xs font-bold text-slate-200">{event}</span>
        </div>
      </div>
    </div>
  );
}
