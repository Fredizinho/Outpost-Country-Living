import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Compass, MapPin, Sprout, 
  ArrowRight, HeartHandshake,
  Sun, Droplets, Mountain, Heart, ShieldCheck,
  Calculator, Home as HomeIcon, Sparkles, Feather,
  CheckCircle2, Layers, Calendar, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { OutpostLogo } from '@/components/common/OutpostLogo';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { CountryLivingIntroQuote } from '@/components/home/CountryLivingIntroQuote';
import { HomesteadUtilitiesGrid } from '@/components/home/HomesteadUtilitiesGrid';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { MalawiAgriWeatherForecast } from '@/components/home/MalawiAgriWeatherForecast';
import { BotanicalEmblemCrestCard } from '@/components/home/BotanicalEmblemCrestCard';
import { HeroQuickPreviewOverlays, QuickFilterCategory } from '@/components/home/HeroQuickPreviewOverlays';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useAuth();
  const [showWelcomeQuote, setShowWelcomeQuote] = React.useState(false);
  const [activeHeroFilter, setActiveHeroFilter] = React.useState<QuickFilterCategory>(null);
  
  // Daily devotional highlight for today
  const todayDevotional = DAILY_DEVOTIONALS[0];

  // Calculate completed steps from user storage
  const [completedMilestonesCount, setCompletedMilestonesCount] = React.useState<number>(() => {
    try {
      const saved = localStorage.getItem('outpost_completed_milestones');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) return arr.length;
      }
      const tracker = localStorage.getItem('exodus-tracker-v3');
      if (tracker) {
        const parsed = JSON.parse(tracker);
        if (Array.isArray(parsed)) {
          return parsed.filter((s: any) => s.completed || s.status === 'completed').length;
        }
      }
    } catch {
      // fallback
    }
    return 2; // initial default for country steward
  });

  const readinessPercentage = Math.min(100, Math.round((completedMilestonesCount / 9) * 100));

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#08130C] text-stone-800 dark:text-stone-100 flex flex-col selection:bg-amber-200 dark:selection:bg-emerald-900 selection:text-amber-950 dark:selection:text-emerald-100 pb-24 transition-colors">
      
      {/* Animated Welcoming Country Living Quote (Shows briefly on load or when triggered) */}
      <CountryLivingIntroQuote 
        forceShow={showWelcomeQuote} 
        onClose={() => setShowWelcomeQuote(false)} 
      />

      {/* ====================================================================
          1. REFINED SANCTUARY HERO: WARM, EDITORIAL & INSPIRING
      ==================================================================== */}
      <section 
        id="hero-sanctuary"
        aria-label="Country Living Sanctuary Welcome"
        className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-stone-800/80 dark:border-emerald-950/80 bg-stone-950 text-stone-100 overflow-hidden"
      >
        {/* Outpost Architectural Blueprint & Vector Contour Background */}
        <HomeSceneryBackground className="pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 bg-radial from-emerald-500/15 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6 sm:gap-8 z-10">
          
          {/* Top Editorial Kicker & Stewardship Utility Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 dark:border-emerald-800/30 pb-3">
            <div className="flex items-center gap-2 text-xs font-serif text-stone-300">
              <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[11px] font-mono">
                Outpost Living Malawi
              </span>
              <span className="text-stone-500" aria-hidden="true">·</span>
              <span className="hidden sm:inline font-sans text-stone-300 text-xs">
                Seventh-day Adventist Country Living Guide & Land GIS
              </span>
              <span className="sm:hidden font-sans text-stone-300 text-xs">
                SDA Country Living Guide
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowWelcomeQuote(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Play welcoming country living quote"
              >
                <Feather size={12} className="text-emerald-400" />
                <span>Inspirational Quote</span>
              </button>

              <span className="text-stone-600 hidden sm:inline" aria-hidden="true">·</span>

              {user ? (
                <Link
                  to="/account"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-950/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Steward {user.displayName?.split(' ')[0] || 'Alfred'}</span>
                </Link>
              ) : (
                <Link
                  to="/account"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-200 px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span>Sign In</span>
                  <ArrowRight size={11} />
                </Link>
              )}
            </div>
          </div>

          {/* Hero Main Presentation: Architectural Asymmetry with Classic Craft */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-1">
            
            {/* Left: Modern Sleek Dark Glassmorphic Crest Card with Interactive Malawi Vector Map Background */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start justify-center w-full">
              <BotanicalEmblemCrestCard activeFilter={activeHeroFilter} />
            </div>

            {/* Right: Welcoming Editorial Message, Quick Filter Chips & Direct Action Suite */}
            <div className="lg:col-span-8 flex flex-col gap-4 text-left p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-stone-950/75 dark:bg-stone-950/85 border border-white/10 dark:border-emerald-500/20 shadow-2xl text-stone-100">
              
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                <Sun size={14} className="text-amber-400 shrink-0" />
                <span>Step Out into the Quiet and Fruitfulness of Nature</span>
              </div>

              <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14]">
                Welcome Home to God’s Peaceful Countryside
              </h1>

              {/* Floating Quick-Access Pills: Below main headline with Instant Preview Overlays */}
              <HeroQuickPreviewOverlays 
                activeFilter={activeHeroFilter}
                onFilterChange={setActiveHeroFilter}
              />

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans font-normal">
                Step away from the rush, anxiety, and crowded noise of the city into a quiet, fruitful life on the land. 
                Whether you are seeking fertile Katondo red loam, clean mountain springs for gravity irrigation, or establishing a missionary outpost for Christ, you are warmly welcomed here.
              </p>

              {/* Ellen G. White Letterpress Quote Plaque */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-xs flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-400 shadow-2xs mt-0.5">
                    <Sprout size={16} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="serif text-xs sm:text-sm text-stone-100 italic leading-relaxed font-normal">
                      "Get out of the cities as soon as possible and purchase a little piece of land, where you can have a garden, where your children can watch the flowers growing and learn from them lessons of simplicity and purity."
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-sans font-semibold">
                      <span>Ellen G. White</span>
                      <span aria-hidden="true" className="text-stone-500">·</span>
                      <span className="font-normal text-stone-400">Country Living, p. 24</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Easy Guidance */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/scout-map"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <Compass size={18} className="text-amber-300" />
                  <span>Launch 28-District Scout Map</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/tracker"
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <BookOpen size={16} className="text-amber-400" />
                  <span>Your Readiness Steps</span>
                </Link>

                <Link
                  to="/calculators"
                  className="px-4 py-3.5 rounded-2xl hover:bg-white/10 text-stone-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator size={16} className="text-emerald-400" />
                  <span>Solar & Borehole Sizing</span>
                </Link>
              </div>

            </div>
          </div>

          {/* AI MAP SCOUT FEATURE SPOTLIGHT CARD */}
          <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-amber-500/30 shadow-lg">
            <div className="rounded-[23px] bg-gradient-to-br from-white via-[#FCFAF5] to-emerald-50/20 dark:from-[#0B1A12] dark:via-[#09150E] dark:to-[#0A1A12] p-5 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 backdrop-blur-xl">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-300 shadow-sm">
                  <Sparkles size={22} className="text-amber-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <span className="font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Gemini 3.8 Flash
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Maps Grounded Agronomist</span>
                    <span aria-hidden="true">·</span>
                    <span className="hidden sm:inline">28-District Analysis</span>
                  </div>
                  <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                    AI Map Scout & Country Living Agronomist
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    Instantly analyze water security, Katondo red loam fertility, altitude cooling, and Adventist church hubs across all 28 Malawi districts. Tap 'Get AI Insights' to inspect any layer combination.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
                <Link
                  to="/scout-map"
                  className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  <span>Try AI Insights on Map</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Clean Editorial 4-Pillar Stat Counter Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2 border-y border-stone-200/80 dark:border-emerald-950/80">
            <div className="flex flex-col p-3 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/70 dark:border-emerald-950/60 text-center">
              <span className="font-mono text-2xl font-black text-emerald-800 dark:text-emerald-300">28</span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-tight">Districts Surveyed</span>
            </div>
            <div className="flex flex-col p-3 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/70 dark:border-emerald-950/60 text-center">
              <span className="font-mono text-2xl font-black text-amber-600 dark:text-amber-300">100</span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-tight">EGW Evaluation Points</span>
            </div>
            <div className="flex flex-col p-3 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/70 dark:border-emerald-950/60 text-center">
              <span className="font-mono text-2xl font-black text-sky-600 dark:text-sky-300">100%</span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-tight">Perennial Water Flow</span>
            </div>
            <div className="flex flex-col p-3 rounded-2xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/70 dark:border-emerald-950/60 text-center">
              <span className="font-mono text-2xl font-black text-teal-700 dark:text-teal-300">Customary</span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-tight">Land Act Malire Data</span>
            </div>
          </div>

          {/* 3 Foundational Country Living Pillars (Interactive with Hero Preview) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            
            <button
              type="button"
              onClick={() => setActiveHeroFilter(prev => prev === 'water' ? null : 'water')}
              className={cn(
                "p-4 rounded-2xl bg-white/90 dark:bg-stone-900/80 border text-left shadow-xs transition-all flex items-start gap-3 group cursor-pointer",
                activeHeroFilter === 'water'
                  ? "border-sky-500 ring-2 ring-sky-400/40 bg-sky-50/50 dark:bg-sky-950/40"
                  : "border-stone-200/80 dark:border-emerald-900/50 hover:border-sky-300/80"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Droplets size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    Living Waters
                  </h2>
                  <span className="text-[10px] font-mono text-sky-700 dark:text-sky-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview →
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                  Flowing rivers and mountain springs for pure drinking water and unpowered gravity irrigation.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveHeroFilter(prev => prev === 'soil' ? null : 'soil')}
              className={cn(
                "p-4 rounded-2xl bg-white/90 dark:bg-stone-900/80 border text-left shadow-xs transition-all flex items-start gap-3 group cursor-pointer",
                activeHeroFilter === 'soil'
                  ? "border-emerald-500 ring-2 ring-emerald-400/40 bg-emerald-50/50 dark:bg-emerald-950/40"
                  : "border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-300/80"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sprout size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    Fertile Red Loam Soil
                  </h2>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview →
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                  Deep, nutrient-rich red loam soils for family orchards, garden relish, and food sovereignty.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveHeroFilter(prev => prev === 'altitude' ? null : 'altitude')}
              className={cn(
                "p-4 rounded-2xl bg-white/90 dark:bg-stone-900/80 border text-left shadow-xs transition-all flex items-start gap-3 group cursor-pointer",
                activeHeroFilter === 'altitude'
                  ? "border-amber-500 ring-2 ring-amber-400/40 bg-amber-50/50 dark:bg-amber-950/40"
                  : "border-stone-200/80 dark:border-emerald-900/50 hover:border-amber-300/80"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mountain size={20} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    Highland Air & Peace
                  </h2>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview →
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                  Cool plateaus and quiet retreats where children thrive and families worship in peace.
                </p>
              </div>
            </button>

          </div>

        </div>
      </section>

      {/* ====================================================================
          2. DAILY SPIRIT OF PROPHECY MANNA (COMPACT & SLEEK)
      ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1D13] border border-amber-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-emerald-950/80 border border-amber-300/80 dark:border-emerald-700/60 flex items-center justify-center shrink-0 text-amber-800 dark:text-amber-300 shadow-xs">
              <BookOpen size={22} />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-emerald-800/50">
                  Daily Manna • {todayDevotional.theme}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {todayDevotional.scripture.reference}
                </span>
              </div>

              <h2 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                "{todayDevotional.title}"
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic max-w-2xl leading-relaxed">
                "{todayDevotional.egwQuote.text}"
              </p>

              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                — {todayDevotional.egwQuote.source}
              </span>
            </div>
          </div>

          <Link
            to="/devotional"
            className="shrink-0 px-5 py-3 rounded-2xl bg-amber-100/90 hover:bg-amber-200/90 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-stone-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-300/80 dark:border-emerald-700/60 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>Open Devotional Treasury</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ====================================================================
          3. DIVIDE & CONQUER: THE FOUR PILLARS DEDICATED TOOLS PORTAL
      ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 flex flex-col gap-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
                Dedicated Outpost Tools
              </span>
              <span className="text-stone-300 dark:text-stone-600">•</span>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Focused Portals</span>
            </div>
            <h2 className="serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-50 mt-1">
              The Four Pillars of Country Living
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
              Explore specialized tools and guides built to walk you step-by-step through spiritual preparation, land verification, edible organic farming, and outpost ministry.
            </p>
          </div>

          <Link
            to="/tracker"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline"
          >
            <span>View Full 9-Step Milestone Ledger</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Dedicated Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PILLAR 1: SANCTUARY & COUNSEL */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                  <BookOpen size={22} />
                </div>
                <span className="text-xs font-mono font-bold uppercase text-stone-400 dark:text-stone-500">
                  Pillar 1
                </span>
              </div>

              <div>
                <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  Sanctuary & Inspired Counsel
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Establish the spiritual bedrock of your family's move. Anchored in God's Word and the counsels of Ellen G. White on leaving the cities before strife and economic distress intensify.
                </p>
              </div>

              {/* Dedicated Tool Links */}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/devotional"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Feather size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Country Living Daily Devotionals
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors" />
                </Link>

                <Link
                  to="/tracker"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      9-Step Country Exodus Readiness Ledger
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  to="/vision"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen size={16} className="text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Divine Counsel: The Call Out of Cities
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* PILLAR 2: LAND RECONNAISSANCE & VERIFICATION */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                  <MapPin size={22} />
                </div>
                <span className="text-xs font-mono font-bold uppercase text-stone-400 dark:text-stone-500">
                  Pillar 2
                </span>
              </div>

              <div>
                <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  Land Scouting & Verification
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Verify water security, fertile red loam topsoil depth, rainfall patterns, customary land governance, and safe distance from urban vice across Malawi's 28 districts.
                </p>
              </div>

              {/* Dedicated Tool Links */}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/scout-map"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      GPS Land & Water Scout Map
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  to="/suitability"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      100-Point EGW Land Suitability Evaluator
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors" />
                </Link>

                <Link
                  to="/where"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers size={16} className="text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Malawi Regional Profiles & Land Law
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* PILLAR 3: EDENIC FARMING & ENGINEERING */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 border border-sky-300/80 dark:border-sky-800/60 text-sky-800 dark:text-sky-300 flex items-center justify-center">
                  <Sprout size={22} />
                </div>
                <span className="text-xs font-mono font-bold uppercase text-stone-400 dark:text-stone-500">
                  Pillar 3
                </span>
              </div>

              <div>
                <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  Edenic Farming & Engineering
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Size your off-grid solar panels, calculate borehole pump requirements, harvest seasonal rainwater, and manage fertile red loam soils organically with God-given natural inputs.
                </p>
              </div>

              {/* Dedicated Tool Links */}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/calculators"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-sky-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Calculator size={16} className="text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Off-Grid Solar, Water & Food Sizing Calculators
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors" />
                </Link>

                <Link
                  to="/agriculture"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-sky-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Sprout size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Edenic Agriculture Field Manuals
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  to="/seasons"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-sky-50 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Malawi Seasonal Planting Almanac
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* PILLAR 4: OUTPOST CENTERS & FELLOWSHIP */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-300/80 dark:border-stone-700/60 text-stone-800 dark:text-stone-200 flex items-center justify-center">
                  <HeartHandshake size={22} />
                </div>
                <span className="text-xs font-mono font-bold uppercase text-stone-400 dark:text-stone-500">
                  Pillar 4
                </span>
              </div>

              <div>
                <h3 className="serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
                  Outposts & Believer Community
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Establish self-supporting country schools, sanitariums, and mission stations. Connect with Adventist seed savers, builders, and fellow country dwellers across Malawi.
                </p>
              </div>

              {/* Dedicated Tool Links */}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/blueprints"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <HomeIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Outpost Center & Sanitarium Blueprints
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  to="/community"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Malawi Believer & Outpost Directory
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors" />
                </Link>

                <Link
                  to="/skills"
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-emerald-950/50 border border-stone-200/70 dark:border-stone-700/50 transition-all flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      25 Essential Country Skills Manual
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-stone-400 group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          HOMESTEAD AGRICULTURAL WEATHER & CLIMATE FORECAST
      ==================================================================== */}
      <MalawiAgriWeatherForecast />

      {/* ====================================================================
          HOMESTEAD UTILITIES & DECISION TOOLS SUITE (DIVIDE & CONQUER)
      ==================================================================== */}
      <HomesteadUtilitiesGrid />

      {/* ====================================================================
          4. READINESS PULSE: PERSONAL FAMILY TRANSITION STATUS
      ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none" />

          <div className="flex flex-col gap-2 relative z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-700/60">
                Steward Readiness Pulse
              </span>
            </div>

            <h2 className="serif text-2xl sm:text-3xl font-bold">
              Your 9-Step Country Relocation Path
            </h2>

            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-xl leading-relaxed">
              Step out in orderly faith. From building family consensus and settling urban debts to securing customary land and planting your food forest.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
              <div className="w-36 bg-emerald-950 rounded-full h-3 border border-emerald-700/60 overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(10, readinessPercentage)}%` }} 
                />
              </div>
              <span className="text-xs font-bold text-amber-300 font-mono">
                {completedMilestonesCount} of 9 Milestones Active
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/tracker"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Your Milestones</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PRIME COUNTRY SANCTUARIES IN MALAWI SPOTLIGHT
      ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-stone-200/80 dark:border-emerald-950/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Prime Outpost Sanctuaries
            </span>
            <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-0.5">
              Highland Regions Suited for Country Living
            </h2>
          </div>

          <Link
            to="/scout-map"
            className="text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline flex items-center gap-1"
          >
            <span>View All 28 Districts on Map</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Dedza Highlands */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                  Central Highlands
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">1,600m Alt.</span>
              </div>
              <h3 className="serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Dedza Highland Plateau
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Cool temperate mountain climate, high rainfall, and rich deep red loam soil. Ideal for Irish potatoes, temperate apples, and peaceful family lifestyle centers.
              </p>
            </div>
            <Link
              to="/scout-map"
              className="text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline flex items-center gap-1 pt-2 border-t border-stone-100 dark:border-stone-800"
            >
              <span>Scout Dedza on Map</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Viphya Highlands */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                  Northern Highlands
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">1,750m Alt.</span>
              </div>
              <h3 className="serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Viphya High Forests (Mzimba)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Crisp mountain pine breezes, crystal-clear perennial streams, wide acreage availability, and complete quiet away from urban centers.
              </p>
            </div>
            <Link
              to="/scout-map"
              className="text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline flex items-center gap-1 pt-2 border-t border-stone-100 dark:border-stone-800"
            >
              <span>Scout Viphya on Map</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mulanje Mountain Slopes */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                  Southern Foothills
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">1,200m Alt.</span>
              </div>
              <h3 className="serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Mulanje Mountain Slopes
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Unrivaled year-round perennial mountain spring water, rich organic soils, tea and avocado microclimates with reliable unpowered gravity irrigation.
              </p>
            </div>
            <Link
              to="/scout-map"
              className="text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline flex items-center gap-1 pt-2 border-t border-stone-100 dark:border-stone-800"
            >
              <span>Scout Mulanje on Map</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. FAITH BENEDICTION
      ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16">
        <div className="p-8 rounded-3xl bg-amber-50/80 dark:bg-[#0A160F] border border-amber-200/80 dark:border-emerald-900/40 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/80 dark:bg-emerald-900/80 border border-amber-300 dark:border-emerald-700 flex items-center justify-center text-amber-800 dark:text-amber-300 shadow-xs">
            <Feather size={22} />
          </div>
          <p className="serif text-base sm:text-lg text-stone-900 dark:text-stone-100 max-w-2xl italic font-medium">
            "When the Lord says, 'Go into the country,' He will open the way before His people who walk in the light of His counsel. Move forward in faith, trusting Him for the harvest."
          </p>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            Outpost Country Living • For the Advent Movement in Malawi
          </span>
        </div>
      </section>

    </div>
  );
}
