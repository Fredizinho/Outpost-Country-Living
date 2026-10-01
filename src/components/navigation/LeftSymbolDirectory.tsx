import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Compass,
  ShieldCheck,
  Calculator,
  Sprout,
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  MapPin,
  Feather,
  Layers,
  Sun,
  FileText,
  Hammer,
  Home as HomeIcon,
  FolderTree,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from '@/components/common/OutpostLogo';

export interface DirectoryItem {
  id: string;
  name: string;
  shortName: string;
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
  'Outposts & Community',
] as const;

export const DIRECTORY_ITEMS: DirectoryItem[] = [
  // 1. Spiritual Foundation
  {
    id: 'devotional',
    name: 'Daily Manna Devotionals & Journal',
    shortName: 'Daily Manna',
    category: 'Spiritual Foundation',
    path: '/devotional',
    icon: Feather,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Daily Spirit of Prophecy readings, KJV Scripture, and personal worship reflection vault.',
    badge: 'Daily Manna',
  },
  {
    id: 'vision',
    name: 'Divine Counsel on Leaving Cities',
    shortName: 'EGW Archive',
    category: 'Spiritual Foundation',
    path: '/vision',
    icon: BookOpen,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Verbatim Ellen G. White archival writings on rural living and family education.',
  },
  {
    id: 'tracker',
    name: 'Exodus Readiness Ledger & Plan',
    shortName: 'Exodus Ledger',
    category: 'Spiritual Foundation',
    path: '/tracker',
    icon: CheckCircle2,
    iconColor: 'text-amber-700 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Unified readiness score, 5-stage transition ledger, and customizable relocation checklist.',
    badge: 'Core Guide',
  },

  // 2. Land & Water Scouting
  {
    id: 'scout-map',
    name: 'GPS Land & Water Scout Map',
    shortName: 'GIS Scout Map',
    category: 'Land & Water Scouting',
    path: '/scout-map',
    icon: Compass,
    iconColor: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-950/80 border-cyan-300/80 dark:border-cyan-700/60',
    description: 'Interactive 28-district GIS map showing aquifers, springs, contours, and soil zones.',
    badge: 'Live GIS',
  },
  {
    id: 'suitability',
    name: '100-Point Land Evaluator',
    shortName: '100-Pt Rubric',
    category: 'Land & Water Scouting',
    path: '/suitability',
    icon: ShieldCheck,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Weighted field scoring for perennial water, Katondo soil, title safety, and clinic reach.',
    badge: 'Assessment',
  },
  {
    id: 'where',
    name: 'Customary Land Law & Chichewa Guide',
    shortName: 'Land Law & Chief',
    category: 'Land & Water Scouting',
    path: '/where',
    icon: FileText,
    iconColor: 'text-stone-700 dark:text-stone-300',
    iconBg: 'bg-stone-200 dark:bg-stone-800 border-stone-300/80 dark:border-stone-700/60',
    description: '5-step Customary Land Act (2016) tracker and Chief (Mfumu) phonetic Chichewa phrasebook.',
  },
  {
    id: 'regions',
    name: '28 District Regional Almanac',
    shortName: 'District Atlas',
    category: 'Land & Water Scouting',
    path: '/regions',
    icon: MapPin,
    iconColor: 'text-teal-700 dark:text-teal-300',
    iconBg: 'bg-teal-100 dark:bg-teal-950/80 border-teal-300/80 dark:border-teal-700/60',
    description: 'Comparative analytics across Northern, Central, and Southern Malawi districts.',
  },

  // 3. Homestead Utilities
  {
    id: 'calculators',
    name: 'Calculators & Bill of Quantities (BoQ)',
    shortName: 'Calculators & BoQ',
    category: 'Homestead Utilities',
    path: '/calculators',
    icon: Calculator,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Solar PV, rainwater cistern, Dimba irrigation, and MWK/USD Bill of Quantities estimator.',
    badge: 'Calculators',
  },
  {
    id: 'how',
    name: 'Engineering Schematics & Build Guide',
    shortName: 'Schematics',
    category: 'Homestead Utilities',
    path: '/how',
    icon: Hammer,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Cross-sectional SVG diagrams for 3x3x3ft EGW pits, A-frame contours, and first-flush tanks.',
  },
  {
    id: 'skills',
    name: '25 Country Skills Masterclass',
    shortName: '25 Country Skills',
    category: 'Homestead Utilities',
    path: '/skills',
    icon: Layers,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Step-by-step illustrated field protocols for off-grid water, food preservation, and building.',
  },

  // 4. Edenic Agriculture
  {
    id: 'what',
    name: 'Crops, Soil Swatches & 75cm Ridges',
    shortName: 'Crops & Soils',
    category: 'Edenic Agriculture',
    path: '/what',
    icon: Sprout,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Malawi soil color swatch guide, 75cm x 25cm Sasakawa ridge guilds, and pantry reserves.',
  },
  {
    id: 'agriculture',
    name: 'Edenic Agriculture Field Manuals',
    shortName: 'Organic Farming',
    category: 'Edenic Agriculture',
    path: '/agriculture',
    icon: Sun,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: '18-day hot composting, deep orchard pit layering, and botanical pest stewardship.',
  },
  {
    id: 'seasons',
    name: 'Seasonal Planting Almanac',
    shortName: 'Almanac Wheel',
    category: 'Edenic Agriculture',
    path: '/seasons',
    icon: Calendar,
    iconColor: 'text-lime-700 dark:text-lime-300',
    iconBg: 'bg-lime-100 dark:bg-lime-950/80 border-lime-300/80 dark:border-lime-700/60',
    description: 'Month-by-month planting and harvest schedule for Dzinja, Masika, and Chilimwe seasons.',
  },

  // 5. Outposts & Community
  {
    id: 'blueprints',
    name: 'Outpost & Sanitarium Blueprints',
    shortName: 'Outpost Plans',
    category: 'Outposts & Community',
    path: '/blueprints',
    icon: Building2,
    iconColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300/80 dark:border-amber-700/60',
    description: 'Architectural zoning diagrams and budgets for rural schools, clinics, and training centers.',
    badge: 'Ministry',
  },
  {
    id: 'community',
    name: 'Adventist Believer Directory',
    shortName: 'Fellowship',
    category: 'Outposts & Community',
    path: '/community',
    icon: Users,
    iconColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-700/60',
    description: 'Connect with fellow Seventh-day Adventist country dwellers and seed savers across Malawi.',
  },
];

const ACTIVITY_RAIL_DOCK = [
  { id: 'home', label: 'Sanctuary Home', path: '/', icon: HomeIcon },
  { id: 'scout-map', label: '28-District GIS Map', path: '/scout-map', icon: Compass },
  { id: 'where', label: 'Land Law & Districts', path: '/where', icon: MapPin },
  { id: 'suitability', label: '100-Pt Land Evaluator', path: '/suitability', icon: ShieldCheck },
  { id: 'calculators', label: 'Calculators & BoQ', path: '/calculators', icon: Calculator },
  { id: 'skills', label: '25 Country Skills', path: '/skills', icon: Layers },
  { id: 'what', label: 'Crops & Soil Swatches', path: '/what', icon: Sprout },
  { id: 'seasons', label: 'Seasonal Almanac', path: '/seasons', icon: Calendar },
  { id: 'agriculture', label: 'Edenic Agriculture', path: '/agriculture', icon: Sun },
  { id: 'blueprints', label: 'Outpost Blueprints', path: '/blueprints', icon: Building2 },
  { id: 'tracker', label: 'Exodus Readiness Ledger', path: '/tracker', icon: CheckCircle2 },
  { id: 'devotional', label: 'Daily Manna & Counsel', path: '/devotional', icon: Feather },
];

export function LeftSymbolDirectory() {
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_directory_pinned_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const location = useLocation();
  const navigate = useNavigate();

  // Sync state with header button
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('outpost:directory-state-changed', { detail: { isOpen: isExplorerOpen } })
    );
    window.dispatchEvent(
      new CustomEvent('outpost:directory-pin-changed', { detail: { isPinned: isExplorerOpen } })
    );
  }, [isExplorerOpen]);

  const toggleExplorer = () => {
    setIsExplorerOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('outpost_directory_pinned_v1', String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const handleToggle = () => toggleExplorer();
    const handleOpen = () => setIsExplorerOpen(true);
    const handleClose = () => setIsExplorerOpen(false);

    window.addEventListener('outpost:toggle-left-directory', handleToggle);
    window.addEventListener('outpost:open-left-directory', handleOpen);
    window.addEventListener('outpost:close-left-directory', handleClose);

    return () => {
      window.removeEventListener('outpost:toggle-left-directory', handleToggle);
      window.removeEventListener('outpost:open-left-directory', handleOpen);
      window.removeEventListener('outpost:close-left-directory', handleClose);
    };
  }, []);

  const filteredItems = DIRECTORY_ITEMS.filter((item) => {
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

  const categories = Array.from(new Set(filteredItems.map((item) => item.category)));

  return (
    <>
      {/* ==================================================================
          1. NATIVE DESKTOP LEFT ACTIVITY RAIL (ALWAYS DOCKED ON MD+ SCREENS)
      ================================================================== */}
      <aside
        aria-label="Desktop Activity Dock"
        className="hidden md:flex flex-col items-center justify-between w-13 shrink-0 h-full bg-[#05120B] border-r border-emerald-950/90 py-2 select-none z-30"
      >
        {/* Top Dock Icons */}
        <div className="flex flex-col items-center gap-1 w-full px-1 overflow-y-auto no-scrollbar">
          {ACTIVITY_RAIL_DOCK.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path) ||
                  (item.path === '/scout-map' &&
                    ['/scout', '/map', '/regions'].some((p) =>
                      location.pathname.startsWith(p)
                    ));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                onMouseEnter={() => prefetchRoute(item.path)}
                title={item.label}
                aria-label={item.label}
                className={cn(
                  'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer group',
                  isActive
                    ? 'bg-emerald-900/90 text-amber-300 border border-amber-400/40 shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-white/10'
                )}
              >
                {isActive && (
                  <span className="absolute -left-1 w-1 h-5 rounded-r-full bg-amber-400" />
                )}
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        {/* Bottom Explorer Tree Toggle Button */}
        <div className="pt-2 border-t border-emerald-950 w-full flex flex-col items-center">
          <button
            type="button"
            onClick={toggleExplorer}
            title={
              isExplorerOpen
                ? 'Collapse Workspace Explorer Tree (⌘B)'
                : 'Expand Workspace Explorer Tree (⌘B)'
            }
            aria-label="Toggle Workspace Explorer Tree"
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
              isExplorerOpen
                ? 'bg-amber-400 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-amber-300 hover:bg-white/10'
            )}
          >
            {isExplorerOpen ? <ChevronLeft size={16} /> : <FolderTree size={16} />}
          </button>
        </div>
      </aside>

      {/* ==================================================================
          2. DOCKED DESKTOP WORKSPACE EXPLORER TREE (OR MOBILE DRAWER)
      ================================================================== */}
      <AnimatePresence initial={false}>
        {isExplorerOpen && (
          <>
            {/* Mobile Backdrop (Hidden on md+ desktop screens where it docks inline) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExplorerOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
            />

            <motion.aside
              id="left-outpost-directory-panel"
              role="navigation"
              aria-label="Outpost Workspace Explorer"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 272, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="fixed md:static top-0 bottom-0 left-0 z-50 md:z-20 w-[272px] shrink-0 h-full bg-[#F5F2EA] dark:bg-[#08160E] border-r border-stone-300/90 dark:border-emerald-900/80 flex flex-col overflow-hidden select-none shadow-xl md:shadow-none"
            >
              {/* Explorer Header */}
              <div className="h-9 px-3 bg-[#EAE5D7] dark:bg-[#06110B] border-b border-stone-300/80 dark:border-emerald-950 flex items-center justify-between gap-2 shrink-0">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-amber-300 truncate">
                  Workspace Explorer
                </span>
                <button
                  type="button"
                  onClick={() => setIsExplorerOpen(false)}
                  title="Collapse Explorer (⌘B)"
                  className="p-1 rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="p-2.5 border-b border-stone-200/80 dark:border-emerald-950/80 flex flex-col gap-2 shrink-0">
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    placeholder="Filter 15 modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-6 py-1.5 rounded-lg bg-white dark:bg-[#05100A] border border-stone-300/90 dark:border-emerald-900/70 text-xs text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {['All', ...DIRECTORY_CATEGORIES].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0',
                        selectedCategory === cat
                          ? 'bg-emerald-800 text-amber-200'
                          : 'bg-stone-200/70 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      )}
                    >
                      {cat === 'All' ? 'All (14)' : cat.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explorer Tree Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-3">
                {/* Sanctuary Home Root Item */}
                <Link
                  to="/"
                  className={cn(
                    'px-2.5 py-2 rounded-xl flex items-center justify-between gap-2 text-xs font-semibold transition-colors',
                    location.pathname === '/'
                      ? 'bg-emerald-900 text-amber-200 shadow-2xs'
                      : 'text-stone-800 dark:text-stone-200 hover:bg-stone-200/70 dark:hover:bg-white/5'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <HomeIcon size={14} className="text-amber-500 shrink-0" />
                    <span className="truncate">Sanctuary Home Overview</span>
                  </span>
                  <ChevronRight size={12} className="opacity-60 shrink-0" />
                </Link>

                {categories.map((category) => {
                  const items = filteredItems.filter((i) => i.category === category);
                  return (
                    <div key={category} className="flex flex-col gap-1">
                      <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-emerald-400/80">
                        {category}
                      </div>

                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          location.pathname === item.path ||
                          (item.path !== '/' && location.pathname.startsWith(item.path));

                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            onMouseEnter={() => prefetchRoute(item.path)}
                            className={cn(
                              'group px-2.5 py-1.5 rounded-xl flex items-center justify-between gap-2 text-xs transition-colors',
                              isActive
                                ? 'bg-emerald-900 text-white font-semibold shadow-2xs'
                                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-white/5'
                            )}
                            title={item.description}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Icon
                                size={14}
                                className={cn(
                                  'shrink-0',
                                  isActive ? 'text-amber-300' : item.iconColor
                                )}
                              />
                              <span className="truncate">{item.shortName || item.name}</span>
                            </span>
                            <ChevronRight
                              size={12}
                              className={cn(
                                'shrink-0 transition-transform group-hover:translate-x-0.5',
                                isActive ? 'text-amber-300' : 'text-stone-400 opacity-0 group-hover:opacity-100'
                              )}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
