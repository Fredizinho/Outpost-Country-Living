import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Calculator,
  ShieldCheck,
  Sprout,
  Calendar,
  Layers,
  CheckCircle2,
  Home,
  Users,
  Sun,
  Droplets,
  ArrowRight,
  Search,
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
    description:
      'Find perennial rivers, mountain springs, shallow aquifers, and fertile farming valleys across all 28 Malawi districts.',
    route: '/scout-map',
    icon: Compass,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/70',
    badge: 'Interactive GIS',
    highlightText: '28 Districts Mapped',
  },
  {
    id: 'suitability-evaluator',
    name: 'Property Suitability Evaluator',
    category: 'scouting',
    categoryLabel: 'Land Scouting',
    description:
      'Score any prospective property against water security, Katondo red loam depth, healthy elevation, and distance from cities.',
    route: '/suitability',
    icon: ShieldCheck,
    iconColor: 'text-amber-800 dark:text-amber-300',
    iconBg: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800/70',
    badge: 'Decision Rubric',
    highlightText: 'Field Siting Score',
  },
  {
    id: 'solar-sizing',
    name: 'Solar PV & Lithium Battery Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description:
      'Calculate solar panel wattage and LiFePO4 battery storage needed for homestead lights, refrigeration, and borehole pumping.',
    route: '/calculators?tab=solar',
    icon: Sun,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800/70',
    badge: 'Engineering Sizer',
    highlightText: '48V Off-Grid Power',
  },
  {
    id: 'water-sizing',
    name: 'Rainwater Cistern & Catchment Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description:
      'Determine your roof rainwater collection capacity and storage tank volume using verified district rainfall normals.',
    route: '/calculators?tab=rainwater',
    icon: Droplets,
    iconColor: 'text-sky-700 dark:text-sky-300',
    iconBg: 'bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800/70',
    badge: 'Hydrology Sizer',
    highlightText: 'Dry Season Security',
  },
  {
    id: 'food-acreage',
    name: 'Family Acreage & Planting Pit Sizer',
    category: 'sizing',
    categoryLabel: 'Homestead Sizing',
    description:
      'Calculate plot dimensions, orchard pit counts, biochar requirements, and moisture retention banks per acre.',
    route: '/calculators?tab=land',
    icon: Calculator,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/70',
    badge: 'Agronomy Sizer',
    highlightText: 'Food & Pit Autonomy',
  },
  {
    id: 'planting-almanac',
    name: 'Seasonal Planting Almanac',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description:
      'Month-by-month planting cycles for the Chizimalupsya early rains, Mvula main rains, Chiperoni mist, and Dimba dry season.',
    route: '/seasons',
    icon: Calendar,
    iconColor: 'text-emerald-800 dark:text-emerald-200',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/70',
    badge: '12-Month Calendar',
    highlightText: 'Rain & Dimba Cycles',
  },
  {
    id: 'edenic-agriculture',
    name: 'Living Soil & Organic Compost Guide',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description:
      'Restore soil fertility naturally using Ellen G. White deep planting pits, Tithonia green manure, and biochar.',
    route: '/agriculture',
    icon: Sprout,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/70',
    badge: 'Field Manual',
    highlightText: 'Chemical-Free Soil',
  },
  {
    id: 'country-skills',
    name: '25 Essential Country Skills Manual',
    category: 'farming',
    categoryLabel: 'Edenic Farming',
    description:
      'Step-by-step guides for well-digging, food dehydration, solar installation, seed saving, and natural charcoal poultices.',
    route: '/skills',
    icon: CheckCircle2,
    iconColor: 'text-amber-800 dark:text-amber-300',
    iconBg: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800/70',
    badge: 'Curriculum',
    highlightText: 'Practical Mastery',
  },
  {
    id: 'outpost-blueprints',
    name: 'Outpost & Sanitarium Blueprints',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description:
      'Architectural designs for rural lifestyle education centers, hydrotherapy treatment rooms, and passive-cooling cottages.',
    route: '/blueprints',
    icon: Home,
    iconColor: 'text-stone-800 dark:text-stone-200',
    iconBg: 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700',
    badge: 'Architecture',
    highlightText: 'Medical Missionary',
  },
  {
    id: 'exodus-tracker',
    name: '15-Milestone Exodus Readiness Ledger',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description:
      'An orderly transition checklist from city debt payoff and family consensus to securing customary land and planting orchards.',
    route: '/tracker',
    icon: Layers,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800/70',
    badge: 'Progress Ledger',
    highlightText: 'Orderly Relocation',
  },
  {
    id: 'regional-profiles',
    name: 'Malawi Regional Profiles & Land Law',
    category: 'scouting',
    categoryLabel: 'Land Scouting',
    description:
      'Understand Customary Land Act (2016) procedures, Traditional Authority (TA) verification, and regional agro-ecological zones.',
    route: '/where',
    icon: Layers,
    iconColor: 'text-sky-800 dark:text-sky-300',
    iconBg: 'bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800/70',
    badge: 'Legal Reference',
    highlightText: 'Customary Title',
  },
  {
    id: 'believer-directory',
    name: 'Adventist Outpost & Believer Directory',
    category: 'outpost',
    categoryLabel: 'Outpost Ministry',
    description:
      'Connect with fellow Seventh-day Adventist country living families, sanitarium workers, and heirloom seed savers.',
    route: '/community',
    icon: Users,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/70',
    badge: 'Fellowship',
    highlightText: 'Country Network',
  },
];

export function HomesteadUtilitiesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'scouting' | 'sizing' | 'farming' | 'outpost'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUtilities = UTILITIES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlightText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section
      id="homestead-utilities-suite"
      aria-label="Homestead Utilities and Decision Tools"
      className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-18 flex flex-col gap-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-200 dark:border-emerald-950">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              Dedicated Field Suite
            </span>
            <span aria-hidden="true">·</span>
            <span>12 Specialized Homestead Modules</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mt-1 tracking-tight">
            Homestead Utilities & Decision Tools
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
            Practical calculators, land verification rubrics, and field manuals built for every stage of your country relocation.
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
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-[#0D1D13] border border-stone-200 dark:border-emerald-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Interactive Segmented Category Filter Bar (No decorative emoji prefixes) */}
      <div className="flex flex-wrap items-center gap-1.5">
        {(
          [
            { id: 'all', label: `All Utilities (${UTILITIES.length})` },
            { id: 'scouting', label: 'Land Scouting (3)' },
            { id: 'sizing', label: 'Sizing & Calculators (3)' },
            { id: 'farming', label: 'Edenic Agriculture (3)' },
            { id: 'outpost', label: 'Outpost Ministry (3)' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === tab.id
                ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                : 'bg-white dark:bg-[#0D1D13] text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-600/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Utilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUtilities.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.route}
              className="p-6 rounded-2xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs hover:border-emerald-600/60 dark:hover:border-emerald-600/60 transition-colors flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-700 dark:text-stone-300 font-medium">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-stone-900 dark:text-stone-50 text-base group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-emerald-950 text-xs">
                <span className="font-mono font-semibold text-emerald-800 dark:text-amber-300 tabular-nums">
                  {item.highlightText}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-stone-600 dark:text-stone-300 group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  <span>Open Tool</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredUtilities.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#0D1D13] rounded-2xl border border-stone-200 dark:border-emerald-900/50">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            No utilities match "{searchQuery}". Try another keyword or reset the filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-semibold text-emerald-800 dark:text-amber-300 underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
