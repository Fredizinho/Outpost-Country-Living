import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Hammer, 
  Calculator, 
  Compass, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  User as UserIcon, 
  Sun, 
  Droplets, 
  WifiOff, 
  Radio, 
  BookOpen, 
  Layers, 
  HeartHandshake, 
  FileText, 
  CheckCircle2, 
  Search,
  ChevronRight,
  Database,
  ArrowUpRight,
  Sprout,
  Trees,
  Sliders,
  Pin,
  PinOff,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { OutpostLogo } from './OutpostLogo';

export interface NavigationProps {
  onOpenCitations?: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  sublabel?: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  isExternal?: boolean;
}

interface NavGroup {
  id: string;
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

export function Navigation({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor
}: NavigationProps) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [drawerSearch, setDrawerSearch] = useState('');

  const drawerRef = useRef<HTMLDivElement>(null);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Keyboard shortcut (Escape to close drawer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        e.preventDefault();
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Close drawer on route navigation
  useEffect(() => {
    setIsDrawerOpen(false);
    setDrawerSearch('');
  }, [location.pathname]);

  // Primary High-Impact Navigation Tabs with clear, intuitive labels
  const primaryPills = [
    { label: 'Land & Districts', path: '/where', icon: MapPin },
    { label: 'GPS Map', path: '/scout-map', icon: Compass, isHighlighted: true },
    { label: 'Crops & Soil', path: '/what', icon: Sprout },
    { label: 'Seasonal Almanac', path: '/seasons', icon: Calendar },
    { label: 'Calculators', path: '/calculators', icon: Calculator },
    { label: 'Skills Manual', path: '/skills', icon: Hammer },
    { label: 'Homestead Guide', path: '/how', icon: BookOpen },
  ];

  // 4 Organized Navigation Drawer Groups with Authentic, Simplified Terms
  const navigationGroups: NavGroup[] = [
    {
      id: 'land-scouting',
      title: 'Land & District Scouting',
      icon: MapPin,
      items: [
        {
          id: 'district-scout',
          label: 'GPS Land Scout Map',
          sublabel: 'Interactive map for all 28 Malawi districts, boundaries & parcels',
          path: '/scout-map',
          icon: Compass,
          badge: 'GPS Tool'
        },
        {
          id: 'land-matrix',
          label: 'Malawi Land Matrix',
          sublabel: 'Customary (Chikhalidwe), Leasehold & Freehold land verification',
          path: '/where',
          icon: MapPin,
          badge: 'Verified'
        },
        {
          id: 'agro-zones',
          label: 'Agricultural Zones',
          sublabel: 'Highlands (Mapiri), Lakeshore (Nyanja) & Valley farming zones',
          path: '/regions',
          icon: Layers
        },
        {
          id: 'land-act',
          label: 'Customary Land Guide',
          sublabel: 'Village Land Committees, Chiefs (Mfumu) & Title conversion laws',
          path: '/how',
          icon: FileText
        }
      ]
    },
    {
      id: 'operations-almanac',
      title: 'Farming & Seasonal Almanac',
      icon: Sprout,
      items: [
        {
          id: 'seasonal-almanac',
          label: 'Seasonal Almanac',
          sublabel: 'Rainy Season (Mvula), Cold Season (Mpepo) & Hot Season (Chirimwe)',
          path: '/seasons',
          icon: Calendar,
          badge: 'Live Cycle'
        },
        {
          id: 'planting-calendar',
          label: 'Planting & Crop Guide',
          sublabel: 'Maize (Chimanga), Groundnuts (Ntedza), Beans (Nyemba) & Relish',
          path: '/what',
          icon: Sun
        },
        {
          id: 'solar-water',
          label: 'Solar & Water Calculators',
          sublabel: 'Solar panels, rainwater tanks & borehole depth calculators',
          path: '/calculators',
          icon: Droplets,
          badge: 'Offline Calc'
        },
        {
          id: 'homestead-mastery',
          label: 'Relocation Blueprint',
          sublabel: '3-stage step-by-step transition from city to rural sanctuary',
          path: '/how',
          icon: BookOpen
        }
      ]
    },
    {
      id: 'sanctuary-manuals',
      title: 'Skills & Practical Manuals',
      icon: Trees,
      items: [
        {
          id: 'vision-philosophy',
          label: 'Country Living Vision',
          sublabel: 'Biblical foundation for self-reliance and country living',
          path: '/vision',
          icon: BookOpen
        },
        {
          id: 'homestead-skills',
          label: 'Homestead Skills Manual',
          sublabel: '25 field guides: compost, borehole pumps, bricklaying & food storage',
          path: '/skills',
          icon: Hammer,
          badge: '25 Skills'
        },
        {
          id: 'emergency-protocols',
          label: 'Community & Village Living',
          sublabel: 'Building peaceful relations with local chiefs and neighbors',
          path: '/how',
          icon: HeartHandshake
        }
      ]
    },
    {
      id: 'system-vault',
      title: 'Progress & Settings',
      icon: Sliders,
      items: [
        {
          id: 'exodus-ledger',
          label: 'Exodus Progress Ledger',
          sublabel: 'Track land purchase, water setup, building & harvest milestones',
          path: '/tracker',
          icon: Sparkles,
          badge: 'Milestones'
        },
        {
          id: 'offline-vault',
          label: 'Offline Data & Cache',
          sublabel: 'Save map packs and field guides for offline use in rural areas',
          path: '/account',
          icon: Database,
          badge: isOffline ? 'Offline' : 'Synced'
        },
        {
          id: 'steward-account',
          label: 'My Saved Parcels & Preferences',
          sublabel: 'Bookmarks, soil bookmarks & district preferences',
          path: '/account',
          icon: UserIcon
        }
      ]
    }
  ];

  // Filter drawer items by search
  const filteredGroups = useMemo(() => {
    if (!drawerSearch.trim()) return navigationGroups;
    const q = drawerSearch.toLowerCase();
    return navigationGroups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(q) ||
        (item.sublabel && item.sublabel.toLowerCase().includes(q))
      )
    })).filter(group => group.items.length > 0);
  }, [drawerSearch, navigationGroups]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. PERMANENT FIXED MODERN TOP HEADER BAR                                  */}
      {/* ========================================================================= */}
      <header 
        id="outpost-main-header"
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#071A10]/95 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-xl select-none"
        aria-label="Primary Sanctuary Navigation"
      >
        {/* LEFT SIDE: LOGO MARK */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link 
            to="/" 
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
            title="OUTPOST: COUNTRY LIVING • Malawi Blueprint"
          >
            <OutpostLogo size="md" />
          </Link>
        </div>

        {/* CENTER: QUICK-JUMP PILL TABS */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10">
          {primaryPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = location.pathname === pill.path || 
              (pill.path !== '/' && location.pathname.startsWith(pill.path));

            return (
              <NavLink
                key={pill.path}
                to={pill.path}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/40 shadow-xs shadow-amber-500/10 font-black"
                    : pill.isHighlighted
                      ? "text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon 
                  size={14} 
                  className={cn(
                    "transition-colors", 
                    isActive ? "text-amber-400" : pill.isHighlighted ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"
                  )} 
                />
                <span>{pill.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT SIDE: AI ADVISOR, SEARCH & MENU TRIGGER */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick AI Advisor Modal Button */}
          {onOpenAdvisor && (
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-xs"
              title="Ask Outpost AI Sanctuary Advisor (Gemini 3.8)"
            >
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-extrabold hidden sm:inline">AI Advisor</span>
            </button>
          )}

          {/* Quick Search Palette Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              title="Search Guides & Maps (Press ⌘K or /)"
            >
              <Search size={14} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Search</span>
              <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-black/40 text-slate-400 border border-white/10">⌘K</kbd>
            </button>
          )}

          {/* Quick Citations Modal Button */}
          {onOpenCitations && (
            <button
              onClick={onOpenCitations}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300/90 hover:text-amber-200 border border-white/10 text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              title="View Malawi Meteorological Services & FAO Sources"
            >
              <ShieldCheck size={14} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Sources</span>
            </button>
          )}

          {/* Collapsible Menu Trigger Button */}
          <button
            id="outpost-drawer-toggle"
            onClick={() => setIsDrawerOpen(prev => !prev)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-md",
              isDrawerOpen
                ? "bg-amber-500 text-slate-950 border border-amber-300 shadow-amber-500/30 scale-[1.02]"
                : "bg-white/10 hover:bg-white/15 text-amber-200 hover:text-white border border-white/15 hover:border-amber-400/40"
            )}
            aria-expanded={isDrawerOpen}
            aria-controls="outpost-collapsible-drawer"
            aria-label={isDrawerOpen ? "Close Outpost Menu Drawer" : "Open Outpost Menu Drawer"}
          >
            {isDrawerOpen ? (
              <>
                <X size={16} className="text-slate-950" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu size={16} className="text-amber-400" />
                <span className="text-xs">Directory</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. SLEEK COLLAPSIBLE DRAWER PANEL & BACKDROP OVERLAY                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Smooth Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 transition-opacity cursor-pointer"
              aria-hidden="true"
            />

            {/* Sliding Overlay Drawer */}
            <motion.aside
              id="outpost-collapsible-drawer"
              ref={drawerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 z-50 shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar text-slate-100"
              role="dialog"
              aria-label="Navigation Drawer"
              aria-modal="true"
            >
              {/* Top Drawer Controls */}
              <div className="flex flex-col gap-5">
                {/* Header Row */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <OutpostLogo size="sm" />

                  <div className="flex items-center gap-2">
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                      Esc
                    </kbd>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      aria-label="Close drawer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Search Quick Filter */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    placeholder="Search guides, tools, districts..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-400 font-sans focus:outline-none focus:ring-2 focus:ring-amber-400/60 transition-all"
                  />
                  {drawerSearch && (
                    <button
                      onClick={() => setDrawerSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* AI Sanctuary Advisor Quick Action Card */}
                {onOpenAdvisor && (
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenAdvisor();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-950/40 to-slate-900 border border-amber-500/30 hover:border-amber-400 text-left transition-all group flex items-center justify-between gap-3 shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-black uppercase tracking-wider text-[#FAF8F5] group-hover:text-amber-200">
                          AI Homestead Advisor
                        </span>
                        <span className="text-[10px] font-mono text-emerald-200/70">
                          Ask Gemini 3.8 on soil, solar & water
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                )}

                {/* 4 Categorized Navigation Groups */}
                <div className="flex flex-col gap-6">
                  {filteredGroups.map((group) => (
                    <div key={group.id} className="flex flex-col gap-2">
                      {/* Group Title Header */}
                      <div className="flex items-center gap-2 px-1">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 w-6 h-6 flex items-center justify-center">
                          <group.icon size={13} className="stroke-[1.75]" />
                        </div>
                        <h3 className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300">
                          {group.title}
                        </h3>
                      </div>

                      {/* Group Navigation Links */}
                      <div className="flex flex-col gap-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;

                          return (
                            <NavLink
                              key={item.id}
                              to={item.path}
                              onClick={() => setIsDrawerOpen(false)}
                              className={cn(
                                "group relative flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                                isActive
                                  ? "bg-amber-500/15 text-amber-200 border-amber-500/40 shadow-xs shadow-amber-500/10"
                                  : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 border-white/5 hover:border-white/10"
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={cn(
                                  "p-1.5 rounded-lg shrink-0 transition-colors",
                                  isActive
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-white/5 text-slate-400 group-hover:text-amber-300"
                                )}>
                                  <Icon size={16} />
                                </div>

                                <div className="flex flex-col min-w-0">
                                  <span className={cn(
                                    "text-xs font-bold truncate leading-tight",
                                    isActive ? "text-amber-200 font-extrabold" : "text-slate-100 group-hover:text-white"
                                  )}>
                                    {item.label}
                                  </span>
                                  {item.sublabel && (
                                    <span className="text-[10px] text-slate-400 truncate leading-normal">
                                      {item.sublabel}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                {item.badge && (
                                  <span className={cn(
                                    "text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
                                    isActive 
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
                                      : "bg-white/5 text-slate-400 border-white/10 group-hover:text-slate-200"
                                  )}>
                                    {item.badge}
                                  </span>
                                )}
                                <ChevronRight size={13} className={cn(
                                  "text-slate-400 transition-transform group-hover:translate-x-0.5",
                                  isActive && "text-amber-400"
                                )} />
                              </div>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Quick Action: Citations Modal Trigger */}
                  {onOpenCitations && (
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        onOpenCitations();
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-amber-950/60 hover:from-emerald-900/80 hover:to-amber-900/80 border border-amber-500/30 text-amber-200 transition-all text-xs font-mono font-bold cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                        <div className="text-left">
                          <span className="block font-bold">Field Sources & Verification</span>
                          <span className="block text-[10px] text-slate-400 font-normal">DCCMS, FAO & Inspired Agronomy</span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-amber-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Footer Telemetry */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300 font-bold">OUTPOST ONLINE</span>
                  </div>
                  <span className="text-amber-300 font-bold">13.2543° S, 34.3015° E</span>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>DCCMS & FAO VERIFIED DATA</span>
                  <span>MALAWI SANCTUARY</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
