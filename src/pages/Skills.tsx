import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, BookmarkCheck, Bookmark, HardDrive, Calendar, Layers, 
  ChevronDown, ChevronUp, CheckCircle2, Wrench, Quote, AlertTriangle, 
  ExternalLink, Sparkles 
} from 'lucide-react';
import { SkillItem, SeasonalTag } from '@/data/skillsAndSeasons';
import { getCachedSkills, isItemBookmarked, toggleOfflineBookmark } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';
import { SanctuaryBadge } from '@/components/ui';
import { CountryIcon, CountryIconName } from '@/components/icons';
import { COUNTRY_IMAGES } from '@/assets/images';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [bookmarksUpdated, setBookmarksUpdated] = useState(0);

  const skills = getCachedSkills();
  const skillMap = new Map(skills.map(s => [s.id, s.title]));

  const handleToggleBookmark = (e: React.MouseEvent, skillId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const title = skillMap.get(skillId) || skillId;
    toggleOfflineBookmark({ id: skillId, type: 'skill', title });
    setBookmarksUpdated(prev => prev + 1);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedSkillId(prev => (prev === id ? null : id));
  };

  const categories = ['All', 'Farming', 'Water & Energy', 'Food & Preservation', 'Construction', 'Medical & Health', 'Livestock & Health'];
  const seasons = ['All', 'Hot Dry Preparation', 'Rainy Planting', 'Harvest & Storage', 'Cold Dry Season', 'Year-Round / Any Season'];

  const filteredSkills = skills.filter(s => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSeason = selectedSeason === 'All' || s.seasonalTag === selectedSeason;
    return matchesCategory && matchesSeason;
  });

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 md:py-10 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header Banner with Inspiring Homestead Background */}
      <header 
        className="bg-cover bg-center text-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.90), rgba(7, 24, 14, 0.84), rgba(4, 29, 16, 0.95)), url(${COUNTRY_IMAGES.offgridHomesteadWater})`
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full -mr-36 -mt-36 pointer-events-none blur-3xl" />

        <div className="flex items-center gap-2 relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
            <Wrench size={12} className="text-amber-400" />
            <span>Self-Reliance Field Manual</span>
          </span>
          <span className="bg-emerald-950/60 text-emerald-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
            <HardDrive size={10} /> Persistent Offline Vault
          </span>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          <h1 className="serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] leading-tight">
            Essential Country Homestead Skills
          </h1>
          <p className="text-emerald-100/90 max-w-2xl text-sm sm:text-base md:text-lg font-medium leading-relaxed italic">
            Step-by-step practical field guides with prerequisite chains, seasonal calendar timing, gravity water setups, and natural construction.
          </p>
        </div>
      </header>

      {/* Seasonal & Category Filter Controls */}
      <div className="flex flex-col gap-4 backdrop-blur-xl bg-slate-950/70 p-6 md:p-8 rounded-[2.5rem] border border-amber-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        {/* Seasonal Tag Filter */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
            <Calendar size={13} className="text-amber-400" /> Filter by Seasonal Actionability:
          </span>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center gap-1.5 border cursor-pointer",
                  selectedSeason === season
                    ? "bg-amber-500 text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.3)] border-amber-300 font-black"
                    : "bg-white/5 text-emerald-100 hover:bg-white/10 border-white/10 hover:border-amber-500/30"
                )}
              >
                {season === 'All' ? '🗓️ All Seasons' : season}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-amber-500/15">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-300">
            Filter by Skill Domain:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 border cursor-pointer",
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] border-emerald-400 font-black"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border-white/10 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-2">
        <span>Showing <strong className="text-amber-400">{filteredSkills.length}</strong> of {skills.length} homestead skills</span>
        {(selectedCategory !== 'All' || selectedSeason !== 'All') && (
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedSeason('All'); }}
            className="text-amber-400 hover:text-amber-300 underline font-mono font-black uppercase text-[10px] cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Skills Grid - Apple Notes Expandable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;
          const bookmarked = isItemBookmarked(skill.id, 'skill');
          const hasPrereqs = skill.prerequisiteSkillIds && skill.prerequisiteSkillIds.length > 0;
          const prereqNames = skill.prerequisiteSkillIds
            ?.map(id => skillMap.get(id))
            .filter(Boolean);

          return (
            <motion.div
              key={skill.id}
              layout
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={cn(
                "rounded-3xl border transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden backdrop-blur-md shadow-xl",
                isExpanded 
                  ? "border-amber-500/50 bg-slate-950/80 md:col-span-2 ring-2 ring-amber-500/20" 
                  : "border-white/10 bg-slate-900/40 hover:border-amber-500/30 hover:bg-slate-900/60"
              )}
            >
              {/* Card Header */}
              <div 
                onClick={() => handleToggleExpand(skill.id)}
                className="p-6 md:p-7 flex flex-col gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      {skill.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-emerald-400/90 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {skill.difficulty}
                    </span>
                    {skill.seasonalTag && (
                      <span className="font-mono text-[10px] text-slate-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Calendar size={10} className="text-amber-400" /> {skill.seasonalTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Right-aligned micro badge showing count or status */}
                    <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {skill.subskills?.length || skill.steps.length} {skill.subskills?.length ? 'Modules' : 'Steps'}
                    </span>

                    <button
                      onClick={(e) => handleToggleBookmark(e, skill.id)}
                      className={cn(
                        "p-1.5 rounded-lg transition-all border shrink-0",
                        bookmarked 
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-2xs" 
                          : "bg-white/5 text-slate-400 border-white/10 hover:text-amber-300 hover:bg-white/10"
                      )}
                      title={bookmarked ? "Bookmarked offline" : "Bookmark this skill"}
                    >
                      {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {skill.iconName && (
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-2xs overflow-hidden flex items-center justify-center">
                        <CountryIcon name={skill.iconName as CountryIconName} className="w-full h-full text-amber-400" />
                      </div>
                    )}
                    <div>
                      {/* Clean Header Title */}
                      <h3 className="font-serif text-amber-200 text-lg md:text-xl font-semibold transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium mt-1">
                        {skill.summary}
                      </p>
                    </div>
                  </div>

                  <div className={cn(
                    "p-2 rounded-xl border transition-all duration-300 ease-in-out shrink-0 mt-1",
                    isExpanded 
                      ? "bg-amber-500 text-slate-950 border-amber-400" 
                      : "bg-white/5 text-amber-400 border-white/10 hover:bg-white/10"
                  )}>
                    <ChevronDown 
                      size={16} 
                      className={cn(
                        "transition-transform duration-300 ease-in-out",
                        isExpanded && "rotate-180"
                      )} 
                    />
                  </div>
                </div>

                {/* Subskills Preview Tags */}
                {skill.subskills && skill.subskills.length > 0 && !isExpanded && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {skill.subskills.map((sub, sIdx) => (
                      <span 
                        key={sub.id || sIdx}
                        className="bg-white/5 text-slate-300 border border-white/10 text-[10.5px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shrink-0" />
                        <span>{sub.title.split(' (')[0]}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Expandable Body Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-t border-white/10 bg-black/40 px-6 md:px-8 py-6 flex flex-col gap-5 overflow-hidden"
                  >
                    {/* 2-Column Concise Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Column: Bulleted "Core Steps & Protocols" with bold lead-ins */}
                      <div className="lg:col-span-7 flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                            <Sparkles size={14} className="text-amber-400" />
                            Core Steps & Protocols
                          </span>
                          <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Action Sequence
                          </span>
                        </div>

                        {/* If subskills exist, show modular protocols, else show steps */}
                        {skill.subskills && skill.subskills.length > 0 ? (
                          <div className="flex flex-col gap-2.5">
                            {skill.subskills.map((sub, sIdx) => (
                              <div 
                                key={sub.id || sIdx}
                                className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-start gap-2.5"
                              >
                                <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
                                  {sIdx + 1}
                                </span>
                                <div className="text-xs">
                                  <strong className="text-amber-300 font-semibold">{sub.title}:</strong>
                                  <span className="text-slate-200 ml-1 leading-relaxed">{sub.summary}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="flex flex-col gap-2.5">
                            {skill.steps.map((step, idx) => {
                              const colonIndex = step.indexOf(':');
                              const hasColon = colonIndex > 0 && colonIndex < 35;
                              const leadIn = hasColon ? step.slice(0, colonIndex + 1) : `Step ${idx + 1}:`;
                              const remainder = hasColon ? step.slice(colonIndex + 1) : ` ${step}`;

                              return (
                                <li key={idx} className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-xl border border-white/5">
                                  <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <div className="text-xs leading-relaxed">
                                    <strong className="text-amber-300 font-semibold">{leadIn}</strong>
                                    <span className="text-slate-200">{remainder}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* Counsel Quote if present */}
                        {skill.inspiredCounsel && (
                          <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20 flex items-start gap-2.5 mt-1">
                            <Quote size={16} className="text-amber-400 shrink-0 mt-0.5" />
                            <p className="font-serif italic text-xs text-amber-200/90 leading-relaxed">
                              "{skill.inspiredCounsel}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Column: "Required Equipment & Metrics" in crisp font-mono */}
                      <div className="lg:col-span-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-serif text-amber-200 text-sm font-semibold flex items-center gap-2">
                            <Wrench size={14} className="text-amber-400" />
                            Required Equipment & Metrics
                          </span>
                          <span className="font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Specs
                          </span>
                        </div>

                        <div className="flex flex-col gap-2.5 font-mono text-xs">
                          {/* Equipment List */}
                          {skill.toolsNeeded && skill.toolsNeeded.length > 0 && (
                            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1.5">
                              <span className="text-[10px] uppercase text-slate-400 tracking-wider font-bold">
                                Required Equipment & Tools:
                              </span>
                              <div className="flex flex-wrap gap-1.5 text-[11px] text-emerald-200 font-medium">
                                {skill.toolsNeeded.map((tool, idx) => (
                                  <span key={idx} className="bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Key Metrics Grid */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Time to Master</span>
                              <span className="text-amber-300 font-bold text-[11px] block">{skill.timeToMaster}</span>
                            </div>
                            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Seasonal Tag</span>
                              <span className="text-emerald-300 font-bold text-[11px] truncate block">{skill.seasonalTag}</span>
                            </div>
                          </div>

                          {/* Prerequisites if any */}
                          {hasPrereqs && prereqNames && prereqNames.length > 0 && (
                            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-white/10">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Prerequisites</span>
                              <span className="text-slate-200 font-medium text-[11px]">{prereqNames.join(', ')}</span>
                            </div>
                          )}

                          {/* Common Mistakes */}
                          {skill.commonMistakes && skill.commonMistakes.length > 0 && (
                            <div className="bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/20 font-sans text-rose-200 text-[11px]">
                              <span className="font-mono text-[9px] uppercase text-rose-300 font-bold block mb-1">
                                Critical Pitfall to Avoid:
                              </span>
                              <span>{skill.commonMistakes[0]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Single High-Contrast Action Button */}
                    <div className="pt-2 border-t border-white/10">
                      <Link
                        to={`/skills/${skill.id}`}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
                      >
                        <span>[ LAUNCH MASTERCLASS GUIDE ]</span>
                        <ArrowRight size={14} className="text-slate-950" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Footer (Collapsed state) */}
              {!isExpanded && (
                <div 
                  onClick={() => handleToggleExpand(skill.id)}
                  className="px-6 pb-6 pt-0 flex items-center justify-between cursor-pointer border-t border-transparent"
                >
                  <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
                    Mastery: {skill.timeToMaster}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 hover:text-amber-300 transition-all">
                    <span>Inspect Blueprint</span> 
                    <ChevronDown size={14} />
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

