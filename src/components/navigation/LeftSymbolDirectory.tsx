import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Compass, ShieldCheck, Calculator, Sprout, 
  Building2, Users, CheckCircle2, Calendar, ChevronRight, 
  X, Search, MapPin, Feather, Layers, ArrowUpRight,
  Sun, Droplets, HeartHandshake, FileText, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OutpostLogo } from '@/components/common/OutpostLogo';

export interface DirectoryItem {
  id: string;
  name: string;
  category: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  iconBg: string;
  description: string;
  badge?: string;
}

const DIRECTORY_CATEGORIES = [
  'Spiritual Foundation',
  'Land & Water Scouting',
  'Homestead Utilities',
  'Edenic Agriculture',
  'Outposts & Community'
] as const;

export const DIRECTORY_ITEMS: DirectoryItem[] = [
  // 1. Spiritual Foundation
  {
    id: 'devotional',
    name: 'Daily Manna Devotionals',
    category: 'Spiritual Foundation',
    path: '/devotional',
    icon: Feather,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Daily Spirit of Prophecy readings, Scripture, and faith for country living.',
    badge: 'Daily Manna'
  },
  {
    id: 'vision',
    name: 'Divine Counsel on Leaving Cities',
    category: 'Spiritual Foundation',
    path: '/vision',
    icon: BookOpen,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Ellen G. White writings and warnings on escaping city turmoil for rural homes.'
  },
  {
    id: 'tracker',
    name: '9-Step Exodus Readiness Ledger',
    category: 'Spiritual Foundation',
    path: '/tracker',
    icon: CheckCircle2,
    iconColor: 'text-amber-700 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Step-by-step progress checklist for prayer, land scouting, moving, and building.',
    badge: 'Core Guide'
  },

  // 2. Land & Water Scouting
  {
    id: 'scout-map',
    name: 'GPS Land & Water Scout Map',
    category: 'Land & Water Scouting',
    path: '/scout-map',
    icon: Compass,
    iconColor: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-300/80 dark:border-cyan-700/60',
    description: 'Interactive map showing rivers, dambos, springs, and soil types across Malawi.',
    badge: 'Live Map'
  },
  {
    id: 'suitability',
    name: '100-Point Land Evaluator',
    category: 'Land & Water Scouting',
    path: '/suitability',
    icon: ShieldCheck,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Five-point assessment: year-round water, soil quality, title safety, distance, and privacy.',
    badge: 'Assessment'
  },
  {
    id: 'where',
    name: 'Land Laws & Title Verification',
    category: 'Land & Water Scouting',
    path: '/where',
    icon: FileText,
    iconColor: 'text-stone-700 dark:text-stone-300',
    iconBg: 'bg-stone-200 dark:bg-stone-800 border-stone-300/80 dark:border-stone-700/60',
    description: 'Clear guidance on Customary land, Leasehold titles, and Chief approval.'
  },
  {
    id: 'regions',
    name: '28 District Regional Almanac',
    category: 'Land & Water Scouting',
    path: '/regions',
    icon: MapPin,
    iconColor: 'text-teal-700 dark:text-teal-300',
    iconBg: 'bg-teal-100 dark:bg-teal-950/80 border-teal-300/80 dark:border-teal-700/60',
    description: 'Farming zones, rainfall records, and elevation profiles for all districts.'
  },

  // 3. Homestead Utilities
  {
    id: 'calculators',
    name: 'Homestead Sizing Calculators',
    category: 'Homestead Utilities',
    path: '/calculators',
    icon: Calculator,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Calculators for solar panels, battery banks, rainwater tanks, and family crop acreage.',
    badge: 'Calculators'
  },

  // 4. Edenic Agriculture
  {
    id: 'weather',
    name: 'Malawi Agricultural Weather',
    category: 'Edenic Agriculture',
    path: '/#malawi-weather-forecast',
    icon: Sun,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Localized rain probability, soil moisture, and 7-day farming task forecasts.',
    badge: 'Weather & Climate'
  },
  {
    id: 'agriculture',
    name: 'Edenic Agriculture Field Manuals',
    category: 'Edenic Agriculture',
    path: '/agriculture',
    icon: Sprout,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Natural soil feeding, heavy mulching, compost tea, and non-chemical pest prevention.'
  },
  {
    id: 'seasons',
    name: 'Seasonal Planting Almanac',
    category: 'Edenic Agriculture',
    path: '/seasons',
    icon: Calendar,
    iconColor: 'text-lime-700 dark:text-lime-300',
    iconBg: 'bg-lime-100 dark:bg-lime-950/80 border-lime-300/80 dark:border-lime-700/60',
    description: 'Month-by-month planting and harvest schedule for both rainy and dry seasons.'
  },
  {
    id: 'what',
    name: 'Crops & Pantry Essentials',
    category: 'Edenic Agriculture',
    path: '/what',
    icon: Layers,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Essential staples, protein legumes, root crops, and long-term pantry storage.'
  },

  // 5. Outposts & Community
  {
    id: 'blueprints',
    name: 'Outpost & Sanitarium Blueprints',
    category: 'Outposts & Community',
    path: '/blueprints',
    icon: Building2,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Architectural floor plans for rural lifestyle training centers and treatment rooms.',
    badge: 'Ministry'
  },
  {
    id: 'community',
    name: 'Adventist Believer Directory',
    category: 'Outposts & Community',
    path: '/community',
    icon: Users,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Connect with fellow Seventh-day Adventist brethren, mentors, and country projects.'
  }
];

export function LeftSymbolDirectory() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Sync state changes with the application
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('outpost:directory-state-changed', { detail: { isOpen } })
    );
  }, [isOpen]);

  // Listen for global toggle / open events (e.g. from Header Directory button)
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('outpost:toggle-left-directory', handleToggle);
    window.addEventListener('outpost:open-left-directory', handleOpen);
    window.addEventListener('outpost:close-left-directory', handleClose);

    return () => {
      window.removeEventListener('outpost:toggle-left-directory', handleToggle);
      window.removeEventListener('outpost:open-left-directory', handleOpen);
      window.removeEventListener('outpost:close-left-directory', handleClose);
    };
  }, []);

  // Close directory when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter items
  const filteredItems = DIRECTORY_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const categories = Array.from(new Set(filteredItems.map(item => item.category)));

  return (
    <>
      {/* ==================================================================
          1. SLEEK LEFT DOCKED TAB (ZERO OVERLAP WITH PAGE CONTENT)
          Docked flush to the screen edge. Hidden on mobile to avoid touch clashes;
          Mobile users have the prominent top header "DIRECTORY" button.
      ================================================================== */}
      <aside 
        aria-label="Country Living Left Directory Trigger"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
      >
        <button
          onClick={() => setIsOpen(prev => !prev)}
          title="Open Country Living Directory"
          aria-expanded={isOpen}
          aria-controls="left-outpost-directory-panel"
          className="group relative flex flex-col items-center justify-center gap-2 py-3 px-1.5 rounded-r-2xl bg-[#0B2517]/95 hover:bg-[#0E3220] text-amber-200 border-y border-r border-amber-400/40 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {/* Subtle gold indicator pip */}
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />

          {/* High-quality vector icon */}
          <Compass size={17} className="text-amber-300 group-hover:rotate-45 transition-transform" />

          {/* Elegant vertical text */}
          <span className="text-[10px] font-sans font-bold tracking-widest text-amber-200/90 group-hover:text-white uppercase [writing-mode:vertical-rl] rotate-180 py-1">
            Directory
          </span>

          <ChevronRight size={13} className={cn("text-amber-400 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </aside>

      {/* ==================================================================
          2. CONVERGED FULL LEFT DIRECTORY DRAWER & OVERLAY
      ================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Slide-out Left Drawer */}
            <motion.div
              id="left-outpost-directory-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Country Living Directory"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#FAF7F0] dark:bg-[#0B1A12] border-r border-stone-300/80 dark:border-emerald-900/80 shadow-2xl flex flex-col text-stone-800 dark:text-stone-100 overflow-hidden"
            >
              {/* Drawer Top Header with Polished Logo */}
              <div className="p-4 sm:p-5 border-b border-stone-200/80 dark:border-emerald-900/60 bg-[#0B2517] flex items-center justify-between gap-3 text-white">
                <OutpostLogo size="sm" variant="header" />

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close directory"
                  className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Instant Search Bar & Category Filter Chips */}
              <div className="p-3.5 sm:p-4 border-b border-stone-200/60 dark:border-emerald-950/80 bg-white/60 dark:bg-stone-900/60 backdrop-blur-xs flex flex-col gap-2.5">
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-emerald-300/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides, scout map, tools, EGW counsel..."
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-stone-900 border border-stone-300/90 dark:border-emerald-800/60 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                  {['All', ...DIRECTORY_CATEGORIES].map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[11px] font-sans font-semibold shrink-0 transition-all cursor-pointer",
                          isSelected
                            ? "bg-emerald-800 text-amber-200 border border-amber-400/50 shadow-xs"
                            : "bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/60"
                        )}
                      >
                        {cat === 'All' ? 'All Guides' : cat.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categorized Directory List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
                {categories.length === 0 ? (
                  <div className="text-center py-16 text-stone-500 text-xs sm:text-sm">
                    No guides or tools found matching "{searchQuery}"
                  </div>
                ) : (
                  categories.map((category) => {
                    const items = filteredItems.filter(i => i.category === category);
                    return (
                      <div key={category} className="space-y-2">
                        {/* Section Header */}
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-900 dark:text-amber-300">
                            {category}
                          </span>
                          <span className="text-stone-300 dark:text-stone-700 text-xs">•</span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                            {items.length} {items.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>

                        {/* Items Stack */}
                        <div className="space-y-2">
                          {items.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                              <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 group/item",
                                  isActive
                                    ? "bg-amber-100/90 dark:bg-emerald-950/90 border-amber-400 dark:border-emerald-600 text-stone-900 dark:text-stone-50 shadow-xs ring-1 ring-amber-400/50"
                                    : "bg-white/80 dark:bg-stone-900/60 hover:bg-amber-50/70 dark:hover:bg-stone-800/80 border-stone-200/90 dark:border-emerald-950/80 text-stone-800 dark:text-stone-200"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  {/* High Quality Vector Symbol in Jewel Badge */}
                                  <div className={cn(
                                    "w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform shadow-2xs",
                                    item.iconBg
                                  )}>
                                    <Icon size={17} className={item.iconColor} />
                                  </div>

                                  <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover/item:text-emerald-900 dark:group-hover/item:text-amber-200 transition-colors">
                                        {item.name}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-sans font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 font-sans">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>

                                <ArrowUpRight 
                                  size={15} 
                                  className="text-stone-400 group-hover/item:text-emerald-700 dark:group-hover/item:text-amber-300 shrink-0 transition-colors mt-1" 
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Dignified Footer with EGW Recommended Resources */}
              <div className="p-3.5 sm:p-4 border-t border-stone-200/80 dark:border-emerald-900/60 bg-white/70 dark:bg-stone-900/70 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                    EGW Essential Books
                  </span>
                  <Link
                    to="/vision"
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Read Counsel</span>
                    <ArrowUpRight size={10} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    to="/vision"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-amber-50/70 dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700/60 text-left hover:bg-amber-100/80 transition-colors"
                  >
                    <div className="text-[10px] font-serif font-bold text-stone-900 dark:text-stone-100 truncate">Country Living</div>
                    <div className="text-[9px] text-stone-500 dark:text-stone-400">Escaping city snares</div>
                  </Link>
                  <Link
                    to="/vision"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-stone-800/80 border border-emerald-200/60 dark:border-stone-700/60 text-left hover:bg-emerald-100/80 transition-colors"
                  >
                    <div className="text-[10px] font-serif font-bold text-stone-900 dark:text-stone-100 truncate">Ministry of Healing</div>
                    <div className="text-[9px] text-stone-500 dark:text-stone-400">Sanitariums & nature</div>
                  </Link>
                </div>

                <div className="text-center pt-1">
                  <p className="font-serif italic text-xs text-stone-600 dark:text-stone-400">
                    “The cities are to be worked from outposts.”
                  </p>
                  <span className="text-[10px] font-sans font-semibold text-amber-800 dark:text-amber-300">
                    Ellen G. White — Country Living, p. 30
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
