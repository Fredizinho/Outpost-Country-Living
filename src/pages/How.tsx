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
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-6xl mx-auto flex flex-col gap-8">
      <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
            <span>Pillar 3 · Field Engineering &amp; Excavation Schematics</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">6 Pit Standards &amp; 5 Cross-Sections (Measure Twice, Dig the 3×3×3 ft Pit Once)</span>
          </div>
          <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
            Engineering Schematics, Planting Pits &amp; Competency Checklist
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            to="/skills"
            className="bg-emerald-900 hover:bg-emerald-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-sans font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>25 Country Skills</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/seasons"
            className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-sans text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
          >
            Seasonal Almanac
          </Link>
        </div>
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

      {/* Illustrated Cross-Sectional Engineering & Planting Schematics */}
      <FieldEngineeringDiagrams />

      <section className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 md:p-10 rounded-3xl text-stone-900 dark:text-stone-100 border border-stone-200/90 dark:border-emerald-900/60 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-5 border-b border-stone-200 dark:border-emerald-900/50">
          <div className="flex flex-col gap-1.5">
            <span className="text-emerald-800 dark:text-amber-400 text-xs font-sans font-semibold">Self-Reliance Competency Checklist</span>
            <h3 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">Homestead Skills Mastery</h3>
            <p className="text-stone-600 dark:text-stone-300 font-medium text-sm max-w-xl">Track your progress acquiring the practical off-grid competencies required for country independence.</p>
          </div>
          <div className="bg-stone-50 dark:bg-stone-900/80 px-5 py-3 rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 flex items-center gap-3 shrink-0">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-900 dark:text-amber-400 font-mono tabular-nums">{masteredIds.length}/12</span>
            <span className="text-stone-600 dark:text-stone-300 text-xs font-sans font-semibold leading-tight">Skills<br />Mastered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MASTERY_SKILLS.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={cn(
                "flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all active:scale-98 text-left cursor-pointer",
                masteredIds.includes(skill.id) 
                  ? "bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-500/50 text-stone-900 dark:text-white shadow-2xs" 
                  : "bg-stone-50/80 dark:bg-stone-900/60 border-stone-200/90 dark:border-emerald-900/40 text-stone-800 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-900 hover:border-emerald-700/40 dark:hover:border-amber-500/30"
              )}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-sans font-medium text-emerald-800 dark:text-amber-300/90">{skill.category}</span>
                <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">{skill.title}</span>
              </div>
              {masteredIds.includes(skill.id) ? (
                <CheckCircle2 size={20} className="text-emerald-700 dark:text-emerald-400 shrink-0 ml-2" />
              ) : (
                <Circle size={20} className="text-stone-400 dark:text-stone-600 shrink-0 ml-2" />
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
