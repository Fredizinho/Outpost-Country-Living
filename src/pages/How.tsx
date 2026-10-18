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
  
  const activePit = PLANTING_PIT_SPECS[activePitKey];

  return (
    <div className="min-h-screen bg-[#F6F1E7] dark:bg-[#0E1712] text-[#1F2A22] dark:text-[#F6F1E7] pb-16 transition-colors duration-200">
      <div className="px-4 sm:px-6 md:px-10 py-6 max-w-6xl mx-auto flex flex-col gap-8">
        <header className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-xl p-5 sm:p-6 border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-[#2B4636] dark:text-[#D4A034] font-semibold">
              <span>Pillar 3 · Field Engineering &amp; Excavation Schematics</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4] font-normal">6 Pit Standards &amp; 5 Cross-Sections</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
              Engineering Schematics, Planting Pits &amp; Competency Checklist
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/skills"
              className="bg-[#B4531F] dark:bg-[#D3672E] hover:opacity-90 text-white font-sans font-semibold text-xs px-3.5 py-2 rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>25 Country Skills</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/seasons"
              className="bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] text-[#1F2A22] dark:text-[#F6F1E7] border border-[#E4DCCB] dark:border-[#283C30] font-sans text-xs font-semibold px-3.5 py-2 rounded-lg transition-all"
            >
              Seasonal Almanac
            </Link>
          </div>
        </header>

        {/* Interactive Planting Pit & Bio-Intensive Bed Field Workshop */}
        <section className="p-6 sm:p-8 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-6 transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E4DCCB] dark:border-[#283C30]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5A6458] dark:text-[#9FB3A4]">
                <span className="font-semibold text-[#2B4636] dark:text-[#D4A034]">Standardized Agronomy Specs</span>
                <span aria-hidden="true">·</span>
                <span>6 Excavation Blueprints</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] mt-1">
                Planting Pit &amp; Permaculture Bed Field Specifications
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {Object.values(PLANTING_PIT_SPECS).map((pit) => (
                <button
                  key={pit.key}
                  type="button"
                  onClick={() => setActivePitKey(pit.key)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap hover:-translate-y-0.5',
                    activePitKey === pit.key
                      ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs font-bold'
                      : 'bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
                  )}
                >
                  {pit.name.replace('Ellen G. White ', 'EGW ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4 p-5 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
              <div>
                <span className="text-xs font-mono text-[#B4531F] dark:text-[#D4A034] font-semibold">
                  {activePit.chichewaName}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] mt-0.5">
                  {activePit.name}
                </h3>
                <p className="text-xs text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed mt-1.5">
                  {activePit.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30] font-mono text-xs tabular-nums">
                <div>
                  <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4] block">Dimensions</span>
                  <span className="font-bold text-[#1F2A22] dark:text-[#FFFDF8]">{activePit.dimensionString}</span>
                </div>
                <div>
                  <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4] block">Moisture Retention</span>
                  <span className="font-bold text-[#3F6B4E] dark:text-[#86EFAC]">{activePit.waterRetentionLiters} L / pit</span>
                </div>
                <div>
                  <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4] block">Biochar / Compost</span>
                  <span className="font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                    {activePit.biocharKgPerPit} kg · {activePit.compostWheelbarrows} barrows
                  </span>
                </div>
                <div>
                  <span className="text-caption text-[#5A6458] dark:text-[#9FB3A4] block">Est. Field Labor</span>
                  <span className="font-bold text-[#1F2A22] dark:text-[#FFFDF8]">{activePit.laborHoursEstimate}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3 p-5 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
              <span className="text-xs font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                Step-by-Step Horizon Filling Sequence
              </span>
              <div className="flex flex-col gap-2.5">
                {activePit.layers.map((layer, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-md bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex items-start gap-3 text-xs text-[#1F2A22] dark:text-[#F6F1E7]"
                  >
                    <span className="font-mono font-bold text-[#B4531F] dark:text-[#D4A034] tabular-nums shrink-0">
                      0{index + 1}.
                    </span>
                    <span className="leading-relaxed">{layer}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-[#5A6458] dark:text-[#D0DAD2]">
                <strong className="text-[#1F2A22] dark:text-[#FFFDF8]">Ideal Crops: </strong>
                {activePit.idealCrops.join(' · ')}
              </div>
            </div>
          </div>
        </section>

        {/* Illustrated Cross-Sectional Engineering & Planting Schematics */}
        <FieldEngineeringDiagrams />

        <section className="bg-[#FFFDF8] dark:bg-[#17241C] p-6 sm:p-8 rounded-xl text-[#1F2A22] dark:text-[#F6F1E7] border border-[#E4DCCB] dark:border-[#283C30] shadow-sm relative overflow-hidden transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-5 border-b border-[#E4DCCB] dark:border-[#283C30]">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#2B4636] dark:text-[#D4A034] text-xs font-mono font-semibold uppercase tracking-wider">Self-Reliance Competency Checklist</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">Homestead Skills Mastery</h3>
              <p className="text-[#5A6458] dark:text-[#9FB3A4] text-sm max-w-xl">Track your progress acquiring the practical off-grid competencies required for country independence.</p>
            </div>
            <div className="bg-[#F6F1E7] dark:bg-[#0E1712] px-5 py-3 rounded-lg border border-[#E4DCCB] dark:border-[#283C30] flex items-center gap-3 shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-[#2B4636] dark:text-[#D4A034] font-mono tabular-nums">{masteredIds.length}/12</span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4] text-xs font-sans font-semibold leading-tight">Skills<br />Mastered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {MASTERY_SKILLS.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all duration-200 active:scale-[0.98] text-left cursor-pointer hover:-translate-y-0.5",
                  masteredIds.includes(skill.id) 
                    ? "bg-[#2B4636]/10 dark:bg-[#1F3325] border-[#2B4636]/40 dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] shadow-xs" 
                    : "bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]"
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono font-medium text-[#B4531F] dark:text-[#D4A034]">{skill.category}</span>
                  <span className="font-semibold text-sm text-[#1F2A22] dark:text-[#FFFDF8]">{skill.title}</span>
                </div>
                {masteredIds.includes(skill.id) ? (
                  <CheckCircle2 size={18} className="text-[#3F6B4E] shrink-0 ml-2" />
                ) : (
                  <Circle size={18} className="text-[#5A6458] dark:text-[#9FB3A4] shrink-0 ml-2" />
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
    </div>
  );
}
