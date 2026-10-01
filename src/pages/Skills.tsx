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
import { SkillStepVectorDiagram } from '@/components/outpost/SkillStepVectorDiagram';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [bookmarksUpdated, setBookmarksUpdated] = useState(0);
  const [activeSdaTab, setActiveSdaTab] = useState<'education' | 'sustenance' | 'remedies'>('education');

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

  const categories = ['All', 'SDA Education & Sustenance', 'Farming', 'Water & Energy', 'Food & Preservation', 'Construction', 'Medical & Health', 'Livestock & Health'];
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
            Essential Country Homestead Skills & SDA Sustenance
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed italic">
            Step-by-step off-grid sustenance manuals grounded in the Avondale True Education model, wholesome breadmaking & Zwieback, plant protein & oilseed independence, hydrotherapy, and natural construction.
          </p>
        </div>
      </header>

      {/* Interactive SDA True Education & Off-Grid Sustenance Matrix */}
      <section className="rounded-[2.5rem] bg-gradient-to-br from-[#142219] via-[#0F1B14] to-[#0A130E] border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl text-[#FAF8F5]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
              <Sparkles size={12} /> Spirit of Prophecy Off-Grid Sustenance & Education Blueprint
            </div>
            <h2 className="serif text-2xl sm:text-3xl font-bold text-white">
              SDA Off-Grid Sustenance & True Education Curriculum
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveSdaTab('education')}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                activeSdaTab === 'education'
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-emerald-100/75 hover:text-white hover:bg-white/5"
              )}
            >
              1. Head, Hand & Heart Education
            </button>
            <button
              onClick={() => setActiveSdaTab('sustenance')}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                activeSdaTab === 'sustenance'
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-emerald-100/75 hover:text-white hover:bg-white/5"
              )}
            >
              2. Edenic Diet & Sustenance
            </button>
            <button
              onClick={() => setActiveSdaTab('remedies')}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                activeSdaTab === 'remedies'
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-emerald-100/75 hover:text-white hover:bg-white/5"
              )}
            >
              3. Hydrotherapy & Remedies
            </button>
          </div>
        </div>

        {activeSdaTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="trueeducation" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Morning Sacred & Scientific Block (08:00–11:30)
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Bible, Physiology & Farm Bookkeeping
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Patterned after the Avondale blueprint (<em>Education</em>, p. 218; <em>6T</em> 179.2): morning mental hours are devoted to Scripture history, human physiology, practical geometry, and double-entry homestead accounting (“owe no man anything”).
                </p>
              </div>
              <Link
                to="/skills/sda-true-education-curriculum"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Curriculum Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="soapmaking" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                  Afternoon Vocational Trades (13:30–16:30)
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Agriculture, Carpentry, Tailoring & Soap
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Every son and daughter masters self-supporting trades: cultivating a personal 5m × 5m garden plot, grafting fruit trees, leaching hardwood ash for antiseptic potash soap, and sewing shoulder-supported garments on a foot-treadle machine.
                </p>
              </div>
              <Link
                to="/skills/wood-ash-soap-natural-fibers-tailoring"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Domestic Trades Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="thermalcooker" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Friday Preparation & Sabbath Rhythm (6T 355.3)
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Fireless Thermal Cookers & Literature Work
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Build insulated clay rocket stoves (75% firewood reduction) and sew 10cm rice-hull thermal cookers (Wonderbags) that keep Friday-boiled beans and whole grains piping hot (&gt;68°C) through Sabbath afternoon without kindling a fire.
                </p>
              </div>
              <Link
                to="/skills/sabbath-sanctuary-fireless-thermal-cooking"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Thermal Cooker Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeSdaTab === 'sustenance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="breadmaking" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  The Ministry of Healing, pp. 300–302
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Whole-Grain Milling, Sweet Yeast & Zwieback
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Mill whole wheat, red sorghum (mapira), and finger millet (mawere) fresh on baking day. Ferment with sweet potato-water yeast (zero baking soda/saleratus; zero sourness), bake in a clay cob oven, and twice-bake slices into shelf-stable Zwieback.
                </p>
              </div>
              <Link
                to="/skills/wholesome-breadmaking-grain-milling"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Bread & Zwieback Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="oilpress" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                  Counsels on Diet & Foods, pp. 206, 351
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Plant Milks, Tofu Curds & Cold Oil Pressing
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Replace disease-prone dairy and flesh meats with homestead soybean and groundnut milks, lemon-coagulated tofu curds (78°C), 72-hour sprouted mung beans (+300% Vitamin C), and cold-pressed sunflower & Moringa oils.
                </p>
              </div>
              <Link
                to="/skills/plant-protein-nut-milks-oil-pressing"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Plant Sustenance Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="foodpreservation" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Year-Round Harvest Independence
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Solar Dehydration & Hermetic Grain Storage
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Preserve seasonal surpluses of mangoes, bananas, tomatoes, and leafy greens in indirect solar air-heaters, while sealing dry maize, beans, and millet in triple-layer PICS bags with dried neem leaves.
                </p>
              </div>
              <Link
                to="/skills/solar-food-dehydration"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Solar Preservation Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeSdaTab === 'remedies' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="hydrotherapy" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Selected Messages Book 2, p. 294 · MH 237
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Contrast Fomentations & Hot Foot Baths
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Master derivative hot foot baths (40°C–43°C) with cold forehead compresses to relieve internal brain and lung congestion, paired with 3 cycles of steaming wool fomentations and brisk cold friction rubs.
                </p>
              </div>
              <Link
                to="/skills/hydrotherapy-charcoal-poultice-remedies"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Hydrotherapy Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="firstaid" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                  Adsorptive Antidote & Poultice Therapy
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Pulverized Hardwood Charcoal Poultices
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Pyrolyze clean eucalyptus or peach wood in a sealed metal retort tin, grind to &lt;100 micron powder, and blend 1:1 with ground flaxseed or cassava meal to draw out venom, bacterial endotoxins, and severe inflammation.
                </p>
              </div>
              <Link
                to="/skills/hydrotherapy-charcoal-poultice-remedies"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Charcoal Poultice Specs</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 mb-3.5 bg-black/30">
                  <CountryIcon name="herbs" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Rural Outpost Dispensary
                </span>
                <h3 className="serif text-xl font-bold text-white mt-1 mb-2">
                  Medicinal Herbs & Apothecary Cultivation
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Cultivate Artemisia annua, Moringa oleifera, ginger, turmeric, lemongrass, and peppermint in raised apothecary beds for fevers, digestive colic, and respiratory steam inhalations.
                </p>
              </div>
              <Link
                to="/skills/herbs-cultivation-medicinal"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Open Apothecary Garden Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </section>

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

                {/* Artisan Vector Lithograph Illustration Banner */}
                {skill.iconName && (
                  <div className="relative w-full h-40 sm:h-44 rounded-2xl bg-[#07150D] border border-emerald-500/25 overflow-hidden shadow-inner group/illus">
                    <CountryIcon
                      name={skill.iconName as CountryIconName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/illus:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
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
                    {/* Visual Skill Schematic & Ready Reference Image */}
                    <SkillStepVectorDiagram
                      skillId={skill.id}
                      title={skill.title}
                      category={skill.category}
                      steps={skill.steps}
                      toolsNeeded={skill.toolsNeeded}
                      compact
                    />

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

