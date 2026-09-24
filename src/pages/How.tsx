import { Sprout, Users, Hammer, HeartPulse, CheckCircle2, Circle, ArrowRight, BookOpen, ShieldCheck, Home, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredMasteredSkills, saveStoredMasteredSkills } from '@/lib/offlineStorage';
import { EdenicAgricultureGuides } from '@/components/outpost/EdenicAgricultureGuides';
import { OutpostCenterBlueprints } from '@/components/outpost/OutpostCenterBlueprints';
import { CommunityDirectory } from '@/components/outpost/CommunityDirectory';

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

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-3 text-center items-center">
        <span className="text-amber-400 text-[10px] font-mono font-black uppercase tracking-[0.2em] bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 rounded-full">
          Homestead Education & Mastery
        </span>
        <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5]">How to Thrive</h2>
        <p className="text-emerald-100/80 max-w-xl text-base sm:text-lg font-medium italic underline underline-offset-8 decoration-amber-500/40">
          "The culture of the soil is the A, B, and C of the education which we should give."
        </p>
      </header>

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

      {/* Edenic Agriculture Guides (Pillar 3) */}
      <section>
        <EdenicAgricultureGuides />
      </section>

      {/* Outpost Center Blueprints (Pillar 4) */}
      <section>
        <OutpostCenterBlueprints />
      </section>

      {/* Community Connection Directory (Pillar 4) */}
      <section>
        <CommunityDirectory />
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
