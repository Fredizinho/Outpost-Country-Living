import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Calculator, ShieldCheck, Sprout, 
  Calendar, Layers, CheckCircle2, Home, 
  Users, Sun, Droplets, ArrowRight, Search, 
  Sparkles, Wrench
} from 'lucide-react';

interface UtilityItem {
  id: string;
  name: string;
  category: 'scouting' | 'sizing' | 'farming' | 'outpost';
  categoryLabel: string;
  description: string;
  route: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  badge: string;
  highlightText: string;
}

const UTILITIES: UtilityItem[] = [
  {
    id: 'scout-map',
    name: 'GPS Land & Water Scout Map',
    category: 'scouting',
    categoryLabel: 'Land Scouting',
    description: 'Find perennial rivers, mountain springs, shallow aquifers, and fertile farming valleys across Malawi.',
    route: '/scout-map',
    icon: Compass,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800',
    badge: 'Interactive GIS',
    highlightText: '28 Districts Mapped'
  },
  {
    id: 'suitability-evaluator',
    name: '100-Point Land Suitability Evaluator',
    category: 'scouting',
    categoryLabel: 'Land Scouting',
    description: 'Score any prospective property against water security, fertile soil, healthy elevation, and distance from cities.',
    route: '/suitability',
    icon: ShieldCheck,
    iconColor: 'text-amber-800 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800',
    badge: 'Decision Tool',
    highlightText: 'Objective 100-Pt Score'
  },
  {
    id: 'solar-sizing',
    name: 'Solar PV & Battery Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description: 'Calculate solar panel wattage and lithium battery storage needed for homestead lights, refrigeration, and water pumping.',
    route: '/calculators',
    icon: Sun,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800',
    badge: 'Calculator',
    highlightText: 'Off-Grid Power'
  },
  {
    id: 'water-sizing',
    name: 'Rainwater Tank & Catchment Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description: 'Determine your roof rainwater collection capacity and storage tank volume to survive the full dry season with confidence.',
    route: '/calculators',
    icon: Droplets,
    iconColor: 'text-sky-700 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-950/80 border-sky-300 dark:border-sky-800',
    badge: 'Calculator',
    highlightText: 'Dry Season Security'
  },
  {
    id: 'food-acreage',
    name: 'Family Food Acreage Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description: 'Calculate plot dimensions and crop yields required to feed your family with wholesome, organic produce year-round.',
    route: '/calculators',
    icon: Calculator,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800',
    badge: 'Calculator',
    highlightText: 'Food Autonomy'
  },
  {
    id: 'planting-almanac',
    name: 'Seasonal Planting Almanac',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description: 'Month-by-month planting cycles for the rainy season, cold winter season, and irrigated dry season.',
    route: '/seasons',
    icon: Calendar,
    iconColor: 'text-emerald-800 dark:text-emerald-200',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800',
    badge: 'Almanac',
    highlightText: 'Rain & Dry Cycles'
  },
  {
    id: 'edenic-agriculture',
    name: 'Living Soil & Organic Compost Guide',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description: 'Restore soil fertility naturally using biological composting, deep mulching, and non-chemical pest barriers.',
    route: '/agriculture',
    icon: Sprout,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800',
    badge: 'Field Guide',
    highlightText: 'Chemical-Free Soil'
  },
  {
    id: 'country-skills',
    name: '25 Essential Country Skills Manual',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description: 'Step-by-step guides for well-digging, food dehydration, solar installation, and off-grid homestead maintenance.',
    route: '/skills',
    icon: CheckCircle2,
    iconColor: 'text-amber-800 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800',
    badge: 'Curriculum',
    highlightText: 'Practical Mastery'
  },
  {
    id: 'outpost-blueprints',
    name: 'Outpost & Sanitarium Blueprints',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description: 'Architectural designs for rural lifestyle education centers, simple hydrotherapy treatment rooms, and passive-cooling homes.',
    route: '/blueprints',
    icon: Home,
    iconColor: 'text-stone-800 dark:text-stone-200',
    iconBg: 'bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700',
    badge: 'Architecture',
    highlightText: 'Medical Missionary'
  },
  {
    id: 'exodus-tracker',
    name: '9-Step Exodus Readiness Ledger',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description: 'An orderly transition checklist from city debt payoff and family consensus to securing land and building your country home.',
    route: '/tracker',
    icon: Layers,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800',
    badge: 'Step-by-Step',
    highlightText: 'Orderly Relocation'
  },
  {
    id: 'regional-profiles',
    name: 'Malawi Regional Profiles & Land Law',
    category: 'scouting',
    categoryLabel: 'Land Scouting',
    description: 'Understand customary land rights, village headman protocols, and regional climate variations in North, Central, and South.',
    route: '/where',
    icon: Layers,
    iconColor: 'text-sky-800 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-950/80 border-sky-300 dark:border-sky-800',
    badge: 'Reference',
    highlightText: 'Customary Title'
  },
  {
    id: 'believer-directory',
    name: 'Adventist Outpost & Believer Directory',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description: 'Connect with fellow Seventh-day Adventist country living families, sanitarium workers, and organic farming mentors.',
    route: '/community',
    icon: Users,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800',
    badge: 'Fellowship',
    highlightText: 'Country Network'
  }
];

export function HomesteadUtilitiesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'scouting' | 'sizing' | 'farming' | 'outpost'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUtilities = UTILITIES.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlightText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section 
      id="homestead-utilities-suite" 
      aria-label="Homestead Utilities and Decision Tools"
      className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 flex flex-col gap-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-950/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Divide & Conquer
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Dedicated Utility Pages
            </span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-50 mt-1">
            Homestead Utilities & Decision Tools
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
            Practical calculators, land verification tools, and field manuals built for every stage of your country living journey.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools & calculators..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-100'
          }`}
        >
          All Utilities ({UTILITIES.length})
        </button>

        <button
          onClick={() => setSelectedCategory('scouting')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'scouting'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-100'
          }`}
        >
          🧭 Land Scouting (3)
        </button>

        <button
          onClick={() => setSelectedCategory('sizing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'sizing'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-100'
          }`}
        >
          🧮 Sizing & Calculators (3)
        </button>

        <button
          onClick={() => setSelectedCategory('farming')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'farming'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-100'
          }`}
        >
          🌱 Edenic Agriculture (3)
        </button>

        <button
          onClick={() => setSelectedCategory('outpost')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'outpost'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:bg-stone-100'
          }`}
        >
          🏛️ Outpost Ministry (3)
        </button>
      </div>

      {/* Utilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUtilities.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.route}
              className="p-5 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-700/60 transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.iconBg} ${item.iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-stone-900 dark:text-stone-50 text-base group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs">
                <span className="font-semibold text-emerald-800 dark:text-amber-300">
                  {item.highlightText}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-stone-500 group-hover:text-emerald-700 dark:group-hover:text-amber-300 transition-colors">
                  <span>Open Tool</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredUtilities.length === 0 && (
        <div className="text-center py-12 bg-white/50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No utilities match your search. Try another word or clear the filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-emerald-800 dark:text-amber-300 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
