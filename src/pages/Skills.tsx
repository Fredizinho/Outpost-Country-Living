import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, BookmarkCheck, Bookmark, HardDrive, Calendar, Layers, 
  ChevronDown, ChevronUp, CheckCircle2, Wrench, Quote, AlertTriangle, 
  ExternalLink, Sparkles, Columns2, LayoutGrid
} from 'lucide-react';
import { SkillItem, SeasonalTag } from '@/data/skillsAndSeasons';
import { getCachedSkills, isItemBookmarked, toggleOfflineBookmark } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';
import { SanctuaryBadge } from '@/components/ui';
import { CountryIcon, CountryIconName } from '@/components/icons';
import { COUNTRY_IMAGES } from '@/assets/images';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { SkillStepVectorDiagram } from '@/components/outpost/SkillStepVectorDiagram';
import { TropicalSanitariumDispensary } from '@/components/health/TropicalSanitariumDispensary';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [bookmarksUpdated, setBookmarksUpdated] = useState(0);
  const [activeSdaTab, setActiveSdaTab] = useState<'education' | 'sustenance' | 'remedies'>('education');
  const [activePerspective, setActivePerspective] = useState<'all-guides' | 'sda-foundations' | 'dispensary' | 'homestead-zones'>('all-guides');
  const [viewLayout, setViewLayout] = useState<'split' | 'cards'>('split');

  const skills = getCachedSkills();
  const [selectedSplitSkillId, setSelectedSplitSkillId] = useState<string>(() => skills[0]?.id || '');
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
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Compact Practical Manuals Workspace Header */}
      <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>Practical Homestead Manuals · 100% Offline Ready</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">
                {skills.length} Field Blueprints — Tested for When You Are 40 km From the Nearest Hardware Shop
              </span>
            </div>
            <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              25 Off-Grid Country Living Skills &amp; Field Manuals
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/calculators"
              className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>7 Sizing Calculators</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/seasonal-guide"
              className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-mono text-xs font-bold uppercase px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Seasonal Calendar</span>
            </Link>
          </div>
        </div>

        {/* Perspective Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200/80 dark:border-emerald-900/40">
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
            {([
              { id: 'all-guides', label: `01. All ${skills.length} Field Manuals & Filters` },
              { id: 'sda-foundations', label: '02. True Education, Diet & Natural Remedies' },
              { id: 'dispensary', label: '03. Tropical Dispensary & Natural Pharmacy' },
            ] as const).map((tab) => {
              const active = activePerspective === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePerspective(tab.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    active
                      ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Interactive SDA True Education & Off-Grid Sustenance Matrix */}
      {activePerspective === 'sda-foundations' && (
      <section className="rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 p-6 sm:p-8 md:p-10 shadow-xs text-stone-900 dark:text-stone-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200 dark:border-emerald-900/50">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-amber-300 text-xs font-sans font-semibold mb-1">
              <Sparkles size={13} />
              <span>Spirit of Prophecy Off-Grid Sustenance &amp; Education Blueprint</span>
            </div>
            <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
              SDA Off-Grid Sustenance &amp; True Education Curriculum
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
            <button
              onClick={() => setActiveSdaTab('education')}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer",
                activeSdaTab === 'education'
                  ? "bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
              )}
            >
              01. Head, Hand &amp; Heart Education
            </button>
            <button
              onClick={() => setActiveSdaTab('sustenance')}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer",
                activeSdaTab === 'sustenance'
                  ? "bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
              )}
            >
              02. Edenic Diet &amp; Sustenance
            </button>
            <button
              onClick={() => setActiveSdaTab('remedies')}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer",
                activeSdaTab === 'remedies'
                  ? "bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800"
              )}
            >
              03. Hydrotherapy &amp; Remedies
            </button>
          </div>
        </div>

        {activeSdaTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="trueeducation" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  Morning Sacred &amp; Scientific Block (08:00–11:30)
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Bible, Physiology &amp; Farm Bookkeeping
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Patterned after the Avondale blueprint (<em>Education</em>, p. 218; <em>6T</em> 179.2): morning mental hours are devoted to Scripture history, human physiology, practical geometry, and double-entry homestead accounting (“owe no man anything”).
                </p>
              </div>
              <Link
                to="/skills/sda-true-education-curriculum"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Curriculum Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="soapmaking" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-emerald-300 font-semibold">
                  Afternoon Vocational Trades (13:30–16:30)
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Agriculture, Carpentry, Tailoring &amp; Soap
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Every son and daughter masters self-supporting trades: cultivating a personal 5m × 5m garden plot, grafting fruit trees, leaching hardwood ash for antiseptic potash soap, and sewing shoulder-supported garments on a foot-treadle machine.
                </p>
              </div>
              <Link
                to="/skills/wood-ash-soap-natural-fibers-tailoring"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Domestic Trades Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="thermalcooker" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  Friday Preparation &amp; Sabbath Rhythm (6T 355.3)
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Fireless Thermal Cookers &amp; Literature Work
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Build insulated clay rocket stoves (75% firewood reduction) and sew 10cm rice-hull thermal cookers (Wonderbags) that keep Friday-boiled beans and whole grains piping hot (&gt;68°C) through Sabbath afternoon without kindling a fire.
                </p>
              </div>
              <Link
                to="/skills/sabbath-sanctuary-fireless-thermal-cooking"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Thermal Cooker Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeSdaTab === 'sustenance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="breadmaking" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  The Ministry of Healing, pp. 300–302
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Whole-Grain Milling, Sweet Yeast &amp; Zwieback
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Mill whole wheat, red sorghum (mapira), and finger millet (mawere) fresh on baking day. Ferment with sweet potato-water yeast (zero baking soda/saleratus; zero sourness), bake in a clay cob oven, and twice-bake slices into shelf-stable Zwieback.
                </p>
              </div>
              <Link
                to="/skills/wholesome-breadmaking-grain-milling"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Bread &amp; Zwieback Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="oilpress" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-emerald-300 font-semibold">
                  Counsels on Diet &amp; Foods, pp. 206, 351
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Plant Milks, Tofu Curds &amp; Cold Oil Pressing
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Replace disease-prone dairy and flesh meats with homestead soybean and groundnut milks, lemon-coagulated tofu curds (78°C), 72-hour sprouted mung beans (+300% Vitamin C), and cold-pressed sunflower &amp; Moringa oils.
                </p>
              </div>
              <Link
                to="/skills/plant-protein-nut-milks-oil-pressing"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Plant Sustenance Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="foodpreservation" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  Year-Round Harvest Independence
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Solar Dehydration &amp; Hermetic Grain Storage
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Preserve seasonal surpluses of mangoes, bananas, tomatoes, and leafy greens in indirect solar air-heaters, while sealing dry maize, beans, and millet in triple-layer PICS bags with dried neem leaves.
                </p>
              </div>
              <Link
                to="/skills/solar-food-dehydration"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Solar Preservation Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {activeSdaTab === 'remedies' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="hydrotherapy" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  Selected Messages Book 2, p. 294 · MH 237
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Contrast Fomentations &amp; Hot Foot Baths
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Master derivative hot foot baths (40°C–43°C) with cold forehead compresses to relieve internal brain and lung congestion, paired with 3 cycles of steaming wool fomentations and brisk cold friction rubs.
                </p>
              </div>
              <Link
                to="/skills/hydrotherapy-charcoal-poultice-remedies"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Hydrotherapy Protocol</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="firstaid" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-emerald-300 font-semibold">
                  Adsorptive Antidote &amp; Poultice Therapy
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Pulverized Hardwood Charcoal Poultices
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Pyrolyze clean eucalyptus or peach wood in a sealed metal retort tin, grind to &lt;100 micron powder, and blend 1:1 with ground flaxseed or cassava meal to draw out venom, bacterial endotoxins, and severe inflammation.
                </p>
              </div>
              <Link
                to="/skills/hydrotherapy-charcoal-poultice-remedies"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Charcoal Poultice Specs</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-5 border border-stone-200/90 dark:border-emerald-900/50 flex flex-col justify-between gap-4">
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 dark:border-emerald-900/60 mb-3.5 bg-emerald-950">
                  <CountryIcon name="herbs" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-sans text-emerald-800 dark:text-amber-300 font-semibold">
                  Rural Outpost Dispensary
                </span>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Medicinal Herbs &amp; Apothecary Cultivation
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Cultivate Artemisia annua, Moringa oleifera, ginger, turmeric, lemongrass, and peppermint in raised apothecary beds for fevers, digestive colic, and respiratory steam inhalations.
                </p>
              </div>
              <Link
                to="/skills/herbs-cultivation-medicinal"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
              >
                <span>Open Apothecary Garden Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </section>
      )}

      {/* Perspective 03: Tropical Sanitarium Dispensary & Natural Pharmacy */}
      {activePerspective === 'dispensary' && (
        <TropicalSanitariumDispensary />
      )}

      {/* Perspective 01: Interactive Filter Controls & Horizontal Split Skill Blueprints */}
      {activePerspective === 'all-guides' && (
      <>
      <div className="flex flex-col gap-4 bg-white dark:bg-[#0D1D13] p-5 md:p-6 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-xs">
        {/* Seasonal Tag Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-sans font-semibold text-emerald-800 dark:text-amber-300 flex items-center gap-1.5">
            <Calendar size={13} className="text-emerald-700 dark:text-amber-400" /> Filter by Seasonal Actionability
          </span>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all active:scale-95 flex items-center gap-1.5 border cursor-pointer",
                  selectedSeason === season
                    ? "bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs border-emerald-900 dark:border-amber-400 font-bold"
                    : "bg-stone-50 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-emerald-900/50"
                )}
              >
                {season === 'All' ? 'All Seasons' : season}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-col gap-2 pt-3 border-t border-stone-200/80 dark:border-emerald-900/40">
          <span className="text-xs font-sans font-semibold text-stone-700 dark:text-emerald-300">
            Filter by Skill Domain
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all active:scale-95 border cursor-pointer",
                  selectedCategory === cat
                    ? "bg-emerald-800 text-white shadow-xs border-emerald-700 font-bold"
                    : "bg-stone-50 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-emerald-900/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Banner & Desktop Split-Pane / Card Grid Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans font-medium text-stone-700 dark:text-stone-300 px-1">
        <div className="flex items-center gap-3">
          <span>Showing <strong className="font-mono font-bold text-emerald-900 dark:text-amber-400">{filteredSkills.length}</strong> of <span className="font-mono">{skills.length}</span> homestead skills</span>
          {(selectedCategory !== 'All' || selectedSeason !== 'All') && (
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedSeason('All'); }}
              className="text-emerald-800 dark:text-amber-400 hover:underline font-sans font-semibold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-900/90 p-1 rounded-xl border border-stone-200/80 dark:border-stone-800">
          <button
            type="button"
            onClick={() => setViewLayout('split')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 cursor-pointer transition-all',
              viewLayout === 'split'
                ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
            )}
          >
            <Columns2 size={13} />
            <span>Split-Pane Reader</span>
          </button>
          <button
            type="button"
            onClick={() => setViewLayout('cards')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 cursor-pointer transition-all',
              viewLayout === 'cards'
                ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 shadow-xs font-bold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
            )}
          >
            <LayoutGrid size={13} />
            <span>Card Grid</span>
          </button>
        </div>
      </div>

      {/* Desktop Split-Pane Reader Mode */}
      {viewLayout === 'split' && filteredSkills.length > 0 && (() => {
        const activeSplitSkill = filteredSkills.find(s => s.id === selectedSplitSkillId) || filteredSkills[0];
        const splitBookmarked = isItemBookmarked(activeSplitSkill.id, 'skill');
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Pane: Compact Dense Directory List */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 rounded-3xl p-3 flex flex-col gap-1.5 max-h-[740px] overflow-y-auto custom-scrollbar shadow-xs">
              {filteredSkills.map((s, idx) => {
                const isSelected = s.id === activeSplitSkill.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSplitSkillId(s.id)}
                    className={cn(
                      'w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer',
                      isSelected
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/90 border-emerald-500/60 dark:border-amber-500/60 text-stone-900 dark:text-white shadow-2xs'
                        : 'bg-stone-50/70 dark:bg-stone-900/50 border-stone-200/70 dark:border-emerald-900/30 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                    )}
                  >
                    <span className={cn(
                      'w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 tabular-nums',
                      isSelected ? 'bg-emerald-900 dark:bg-amber-500 text-white dark:text-stone-950' : 'bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    )}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-sans font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                        {s.title}
                      </div>
                      <div className="text-xs font-sans text-stone-500 dark:text-stone-400 truncate mt-0.5">
                        {s.category} · {s.difficulty} · <span className="font-mono">{s.timeToMaster}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Pane: Full Step-by-Step Schematic & Field Protocol Inspector */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 rounded-3xl p-6 md:p-7 flex flex-col gap-5 shadow-xs text-stone-900 dark:text-stone-100">
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-emerald-900/50 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-300">
                    <span>{activeSplitSkill.category}</span>
                    <span>·</span>
                    <span className="text-stone-600 dark:text-emerald-300">{activeSplitSkill.difficulty}</span>
                    {activeSplitSkill.seasonalTag && (
                      <>
                        <span>·</span>
                        <span className="text-stone-500 dark:text-stone-300 font-normal">{activeSplitSkill.seasonalTag}</span>
                      </>
                    )}
                  </div>
                  <h3 className="serif text-2xl font-bold text-stone-900 dark:text-white mt-1">
                    {activeSplitSkill.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-1.5">
                    {activeSplitSkill.summary}
                  </p>
                </div>

                <button
                  onClick={(e) => handleToggleBookmark(e, activeSplitSkill.id)}
                  className={cn(
                    "p-2 rounded-xl transition-all border shrink-0 cursor-pointer",
                    splitBookmarked
                      ? "bg-amber-500 text-stone-950 border-amber-400"
                      : "bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-emerald-900/50 hover:text-emerald-800 dark:hover:text-amber-300"
                  )}
                  title="Bookmark Skill"
                >
                  {splitBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>

              <SkillStepVectorDiagram
                skillId={activeSplitSkill.id}
                title={activeSplitSkill.title}
                category={activeSplitSkill.category}
                steps={activeSplitSkill.steps}
                toolsNeeded={activeSplitSkill.toolsNeeded}
                compact
              />

              <div className="flex flex-col gap-2.5">
                <span className="font-serif text-stone-900 dark:text-amber-200 text-base font-bold">
                  Field Execution Steps
                </span>
                <ul className="flex flex-col gap-2.5">
                  {activeSplitSkill.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-xl border border-stone-200/80 dark:border-emerald-900/40 text-sm leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-amber-500/20 text-emerald-900 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-300 dark:border-amber-500/30 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="text-stone-800 dark:text-stone-100">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeSplitSkill.inspiredCounsel && (
                <div className="bg-amber-50/80 dark:bg-amber-500/10 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/20 flex items-start gap-2.5">
                  <Quote size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-amber-200/90 leading-relaxed">
                    &ldquo;{activeSplitSkill.inspiredCounsel}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-200 dark:border-emerald-900/50">
                <div className="text-xs font-sans text-stone-500 dark:text-stone-400">
                  Mastery Time: <strong className="font-mono text-emerald-900 dark:text-amber-300">{activeSplitSkill.timeToMaster}</strong>
                </div>
                <Link
                  to={`/skills/${activeSplitSkill.id}`}
                  className="bg-emerald-900 hover:bg-emerald-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-sans font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-xs"
                >
                  <span>Open Full Masterclass</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Skills Grid - Expandable Cards */}
      {viewLayout === 'cards' && (
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
                "rounded-3xl border transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden bg-white dark:bg-[#0D1D13] shadow-xs",
                isExpanded 
                  ? "border-emerald-600/60 dark:border-amber-500/50 md:col-span-2 ring-2 ring-emerald-500/15 dark:ring-amber-500/20" 
                  : "border-stone-200/90 dark:border-emerald-900/60 hover:border-emerald-700/50 dark:hover:border-amber-500/40"
              )}
            >
              {/* Card Header */}
              <div 
                onClick={() => handleToggleExpand(skill.id)}
                className="p-6 md:p-7 flex flex-col gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold text-emerald-800 dark:text-amber-300">
                    <span>{skill.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-600 dark:text-emerald-300">{skill.difficulty}</span>
                    {skill.seasonalTag && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-500 dark:text-stone-400 font-normal flex items-center gap-1">
                          <Calendar size={11} className="text-emerald-700 dark:text-amber-400" /> {skill.seasonalTag}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-stone-500 dark:text-stone-400 tabular-nums">
                      {skill.subskills?.length || skill.steps.length} {skill.subskills?.length ? 'Modules' : 'Steps'}
                    </span>

                    <button
                      onClick={(e) => handleToggleBookmark(e, skill.id)}
                      className={cn(
                        "p-1.5 rounded-lg transition-all border shrink-0",
                        bookmarked 
                          ? "bg-amber-500 text-stone-950 border-amber-400 shadow-2xs" 
                          : "bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-emerald-900/50 hover:text-emerald-800 dark:hover:text-amber-300"
                      )}
                      title={bookmarked ? "Bookmarked offline" : "Bookmark this skill"}
                    >
                      {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                    </button>
                  </div>
                </div>

                {/* Horizontal Split-Card Body */}
                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                  {skill.iconName && (
                    <div className="relative w-full sm:w-36 h-36 sm:h-28 rounded-2xl bg-[#07150D] border border-stone-200 dark:border-emerald-500/25 overflow-hidden shadow-inner shrink-0 group/illus">
                      <CountryIcon
                        name={skill.iconName as CountryIconName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/illus:scale-[1.04]"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex items-start justify-between gap-3 min-w-0">
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif text-stone-900 dark:text-amber-100 text-lg md:text-xl font-bold transition-colors leading-snug">
                        {skill.title}
                      </h3>
                      <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-medium mt-1.5 line-clamp-3">
                        {skill.summary}
                      </p>
                    </div>

                    <div className={cn(
                      "p-2 rounded-xl border transition-all duration-300 ease-in-out shrink-0 mt-0.5",
                      isExpanded 
                        ? "bg-emerald-900 dark:bg-amber-500 text-white dark:text-stone-950 border-emerald-800 dark:border-amber-400" 
                        : "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-amber-400 border-stone-200 dark:border-emerald-900/50"
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
                </div>

                {/* Subskills Preview Tags */}
                {skill.subskills && skill.subskills.length > 0 && !isExpanded && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-200/80 dark:border-emerald-900/40">
                    {skill.subskills.map((sub, sIdx) => (
                      <span 
                        key={sub.id || sIdx}
                        className="bg-stone-50 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-emerald-900/40 text-xs font-sans font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-amber-400 inline-block shrink-0" />
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
                    className="border-t border-stone-200 dark:border-emerald-900/50 bg-stone-50/70 dark:bg-black/30 px-6 md:px-8 py-6 flex flex-col gap-5 overflow-hidden"
                  >
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
                      <div className="lg:col-span-7 flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-stone-200 dark:border-emerald-900/50 pb-2">
                          <span className="font-serif text-stone-900 dark:text-amber-200 text-sm font-bold flex items-center gap-2">
                            <Sparkles size={14} className="text-emerald-700 dark:text-amber-400" />
                            Core Steps &amp; Protocols
                          </span>
                          <span className="font-sans text-xs font-semibold text-emerald-800 dark:text-amber-300">
                            Action Sequence
                          </span>
                        </div>

                        {skill.subskills && skill.subskills.length > 0 ? (
                          <div className="flex flex-col gap-2.5">
                            {skill.subskills.map((sub, sIdx) => (
                              <div 
                                key={sub.id || sIdx}
                                className="bg-white dark:bg-stone-900/70 p-3 rounded-xl border border-stone-200/80 dark:border-emerald-900/40 flex items-start gap-2.5"
                              >
                                <span className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-amber-500/20 text-emerald-900 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-300 dark:border-amber-500/30 mt-0.5 tabular-nums">
                                  {sIdx + 1}
                                </span>
                                <div className="text-xs sm:text-sm">
                                  <strong className="text-stone-900 dark:text-amber-300 font-semibold">{sub.title}:</strong>
                                  <span className="text-stone-700 dark:text-stone-200 ml-1 leading-relaxed">{sub.summary}</span>
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
                                <li key={idx} className="flex items-start gap-2.5 bg-white dark:bg-stone-900/70 p-3 rounded-xl border border-stone-200/80 dark:border-emerald-900/40">
                                  <span className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-amber-500/20 text-emerald-900 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-300 dark:border-amber-500/30 mt-0.5 tabular-nums">
                                    {idx + 1}
                                  </span>
                                  <div className="text-xs sm:text-sm leading-relaxed">
                                    <strong className="text-stone-900 dark:text-amber-300 font-semibold">{leadIn}</strong>
                                    <span className="text-stone-700 dark:text-stone-200">{remainder}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {skill.inspiredCounsel && (
                          <div className="bg-amber-50/80 dark:bg-amber-500/10 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/20 flex items-start gap-2.5 mt-1">
                            <Quote size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <p className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-amber-200/90 leading-relaxed">
                              &ldquo;{skill.inspiredCounsel}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-stone-200 dark:border-emerald-900/50 pb-2">
                          <span className="font-serif text-stone-900 dark:text-amber-200 text-sm font-bold flex items-center gap-2">
                            <Wrench size={14} className="text-emerald-700 dark:text-amber-400" />
                            Required Equipment &amp; Metrics
                          </span>
                          <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                            Specs
                          </span>
                        </div>

                        <div className="flex flex-col gap-2.5 text-xs">
                          {skill.toolsNeeded && skill.toolsNeeded.length > 0 && (
                            <div className="bg-white dark:bg-stone-900/80 p-3 rounded-xl border border-stone-200/80 dark:border-emerald-900/40 flex flex-col gap-1.5">
                              <span className="text-xs font-sans text-stone-500 dark:text-stone-400 font-semibold">
                                Required Equipment &amp; Tools:
                              </span>
                              <div className="flex flex-wrap gap-1.5 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                                {skill.toolsNeeded.map((tool, idx) => (
                                  <span key={idx} className="bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/30">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white dark:bg-stone-900/80 p-2.5 rounded-xl border border-stone-200/80 dark:border-emerald-900/40">
                              <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">Time to Master</span>
                              <span className="text-stone-900 dark:text-amber-300 font-mono font-bold text-xs block">{skill.timeToMaster}</span>
                            </div>
                            <div className="bg-white dark:bg-stone-900/80 p-2.5 rounded-xl border border-stone-200/80 dark:border-emerald-900/40">
                              <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">Seasonal Window</span>
                              <span className="text-emerald-800 dark:text-emerald-300 font-sans font-bold text-xs truncate block">{skill.seasonalTag}</span>
                            </div>
                          </div>

                          {hasPrereqs && prereqNames && prereqNames.length > 0 && (
                            <div className="bg-white dark:bg-stone-900/80 p-2.5 rounded-xl border border-stone-200/80 dark:border-emerald-900/40">
                              <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">Prerequisites</span>
                              <span className="text-stone-800 dark:text-stone-200 font-medium text-xs">{prereqNames.join(', ')}</span>
                            </div>
                          )}

                          {skill.commonMistakes && skill.commonMistakes.length > 0 && (
                            <div className="bg-rose-50 dark:bg-rose-950/25 p-3 rounded-xl border border-rose-200 dark:border-rose-500/20 font-sans text-rose-900 dark:text-rose-200 text-xs">
                              <span className="font-sans text-xs text-rose-800 dark:text-rose-300 font-bold block mb-0.5">
                                Critical Pitfall to Avoid:
                              </span>
                              <span>{skill.commonMistakes[0]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 dark:border-emerald-900/50">
                      <Link
                        to={`/skills/${skill.id}`}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 font-sans font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xs active:scale-98 cursor-pointer"
                      >
                        <span>Open Full Masterclass Guide</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Footer (Collapsed state) */}
              {!isExpanded && (
                <div 
                  onClick={() => handleToggleExpand(skill.id)}
                  className="px-6 pb-5 pt-0 flex items-center justify-between cursor-pointer border-t border-transparent"
                >
                  <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    Mastery: {skill.timeToMaster}
                  </span>
                  <span className="font-sans text-xs font-semibold text-emerald-800 dark:text-amber-400 flex items-center gap-1 hover:underline transition-all">
                    <span>Inspect Blueprint</span> 
                    <ChevronDown size={14} />
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      )}
      </>
      )}
    </div>
  );
}

