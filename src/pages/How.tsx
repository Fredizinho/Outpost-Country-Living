import { Sprout, Users, Hammer, HeartPulse, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getStoredMasteredSkills, saveStoredMasteredSkills } from '@/lib/offlineStorage';

const MASTERY_SKILLS = [
  { id: 's1', title: 'Deep Compost Pit (Mupando)', category: 'Gardening' },
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
    { title: 'Gardening', icon: Sprout, color: 'text-emerald-700', desc: 'Growing staple Chimanga, Chinangwa, legumes (Ntedza/Nzama), and leafy greens (Mpiru/Nkhwani).' },
    { title: 'Preservation', icon: Hammer, color: 'text-emerald-700', desc: 'Solar drying of green relish into Mfutso, and Nkhokwe granary ash preservation.' },
    { title: 'Handicrafts', icon: Users, color: 'text-emerald-700', desc: 'Skills for rural income: carpentry, tailoring, or digital remote work.' },
    { title: 'Health', icon: HeartPulse, color: 'text-emerald-700', desc: 'Hydrotherapy and the use of local herbs like Galuwinki (Garlic), Aloe, and Moringa.' },
  ];

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4 text-center items-center">
        <h2 className="serif text-4xl md:text-5xl font-bold text-emerald-950">How to Thrive</h2>
        <p className="text-slate-600 max-w-xl text-lg font-medium italic underline underline-offset-8 decoration-emerald-200">
          "The culture of the soil is the A, B, and C of the education which we should give."
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] flex flex-col gap-6 border border-white/60 shadow-xl card-hover group">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
              <skill.icon size={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="serif text-3xl font-bold text-emerald-950">{skill.title}</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed opacity-80">{skill.desc}</p>
            </div>
            <button className="mt-4 w-fit bg-white/60 hover:bg-white text-emerald-900 border border-white/80 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95">
              Explore Guide
            </button>
          </div>
        ))}
      </div>

      <section className="bg-white/40 backdrop-blur-md border border-white/60 p-8 md:p-12 rounded-[3rem] shadow-xl flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="serif text-3xl font-bold text-emerald-950 italic">Malawi Seasonal Guide</h3>
          <p className="text-sm text-slate-500 font-medium">Practical stewardship aligned with the Malawian agricultural cycle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SeasonCard 
            season="Rainy (Nov-Mar)" 
            color="text-emerald-600" 
            items={['Chimanga (Maize)', 'Nyemba (Beans)', 'Nandolo (Pigeon Pea)', 'Nkhwani (Pumpkin Leaves)']} 
            advice="Plant with the first effective rains on 75cm ridges. Focus on early weeding and applying organic compost in planting stations."
            event="National Tree Planting Month"
          />
          <SeasonCard 
            season="Harvest (Apr-Jun)" 
            color="text-amber-600" 
            items={['Soya (Soybeans)', 'Mbambaira (Sweet Potato)', 'Ntedza (Groundnuts)', 'Kachebere (Irish Potato)']} 
            advice="Harvest when crops reach physiological maturity. Ensure grains are dried on racks before storage in ventilated Nkhokwe granaries."
            event="Harvest Thanksgiving Gatherings"
          />
          <SeasonCard 
            season="Dry/Cold (Jul-Aug)" 
            color="text-emerald-800" 
            items={['Mpiru (African Mustard)', 'Sobola (Red Onion)', 'Galuwinki (Garlic)', 'Dimba Wetlands']} 
            advice="Utilize 'Dambo / Dimba' (wetland) treadle irrigation. Use residual moisture for vegetable beds. Protect young seedlings from highland frosts."
            event="Umhlangano Cultural Festivals"
          />
          <SeasonCard 
            season="Dry/Hot (Sep-Oct)" 
            color="text-slate-500" 
            items={['Land Prep (Misozi)', 'Nthochi (Banana Pits)', 'Manga (Mango Mulch)', 'Chitedze Cover Crop']} 
            advice="Clear fields and prepare planting stations (mupando). Mulch perennial crops like Manga and Avokado to preserve soil moisture during heat."
            event="Mlakho Wa Alhomwe Celebration"
          />
        </div>
      </section>

      <section className="bg-emerald-900/90 backdrop-blur-md p-10 md:p-12 rounded-[3.5rem] text-white border border-emerald-800 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="serif text-4xl font-bold">Skills Mastery</h3>
            <p className="text-emerald-100/60 font-medium max-w-md">Track your journey in acquiring the practical skills needed for self-reliance.</p>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
            <span className="text-2xl font-bold text-emerald-400">{masteredIds.length}</span>
            <span className="text-emerald-100/40 text-[10px] font-black uppercase tracking-widest ml-2">Skills Mastered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTERY_SKILLS.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={cn(
                "flex items-center justify-between p-6 rounded-[2rem] border transition-all active:scale-95 text-left",
                masteredIds.includes(skill.id) 
                  ? "bg-emerald-800 border-emerald-400/30 text-white" 
                  : "bg-white/5 border-white/10 text-emerald-100/60 hover:bg-white/10"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{skill.category}</span>
                <span className="font-bold tracking-tight">{skill.title}</span>
              </div>
              {masteredIds.includes(skill.id) ? (
                <CheckCircle2 size={24} className="text-emerald-400" />
              ) : (
                <Circle size={24} className="opacity-20" />
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SeasonCard({ season, color, items, advice, event }: any) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white/30 border border-white/40 flex flex-col gap-6 shadow-sm hover:bg-white/50 transition-colors">
      <div className="flex justify-between items-center">
        <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", color)}>{season}</span>
        <div className="h-px bg-emerald-100 flex-1 ml-4" />
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Core Crops</span>
          <div className="flex flex-wrap gap-2">
            {items.map((item: string) => (
              <span key={item} className="text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">{item}</span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Stewardship Advice</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed italic">{advice}</p>
        </div>

        <div className="pt-4 border-t border-white/40 flex flex-col gap-1">
          <span className="text-[9px] font-black uppercase text-emerald-800/40 tracking-widest">Community Context</span>
          <span className="text-xs font-bold text-emerald-900">{event}</span>
        </div>
      </div>
    </div>
  );
}
