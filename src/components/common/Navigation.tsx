import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Calculator,
  Compass,
  X,
  Sparkles,
  User as UserIcon,
  Sun,
  Moon,
  BookOpen,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sprout,
  CheckCircle2,
  Home as HomeIcon,
  Plus,
  PanelLeft,
  Columns2,
  ShieldCheck,
  Hammer,
  Calendar,
  Building2,
  Users,
  Feather,
  RotateCcw,
  Palette,
  Settings,
  HeartPulse,
  UtensilsCrossed,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from './OutpostLogo';
import { SettingsModalTab } from '../layout/SettingsAndAboutModal';

export interface NavigationProps {
  onOpenCitations?: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onToggleInspector?: () => void;
  isInspectorOpen?: boolean;
  onOpenSettings?: (tab?: SettingsModalTab) => void;
}

export interface WorkspaceTabDefinition {
  id: string;
  basePath: string;
  currentPath: string;
  title: string;
  pillar: string;
  iconKey: string;
  pinned?: boolean;
}

interface CatalogRouteMeta {
  id: string;
  basePath: string;
  title: string;
  pillar: string;
  wittyNote: string;
  iconKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentClass: string;
  badgeBg: string;
  shortcut?: string;
}

export const DESKTOP_MODULE_CATALOG: CatalogRouteMeta[] = [
  {
    id: 'home',
    basePath: '/',
    title: 'Sanctuary Home',
    pillar: 'Overview',
    wittyNote: 'Sanctuary overview & family acreage sizer',
    iconKey: 'home',
    icon: HomeIcon,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
    shortcut: 'Alt+1',
  },
  {
    id: 'scout-map',
    basePath: '/scout-map',
    title: 'District GIS Map',
    pillar: 'Land & Water',
    wittyNote: '28-district GIS aquifers & topography',
    iconKey: 'compass',
    icon: Compass,
    accentClass: 'text-cyan-300',
    badgeBg: 'bg-cyan-500/20 border-cyan-400/35',
    shortcut: 'Alt+3',
  },
  {
    id: 'where',
    basePath: '/where',
    title: 'Land Tenure & Evaluation',
    pillar: 'Land & Water',
    wittyNote: 'Customary tenure, community protocols & land scoring',
    iconKey: 'mappin',
    icon: MapPin,
    accentClass: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/35',
    shortcut: 'Alt+2',
  },
  {
    id: 'what',
    basePath: '/what',
    title: 'Agronomy & Soils',
    pillar: 'Agronomy',
    wittyNote: 'Soil classifications, swatches & crop rotations',
    iconKey: 'sprout',
    icon: Sprout,
    accentClass: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/35',
    shortcut: 'Alt+4',
  },
  {
    id: 'agriculture',
    basePath: '/agriculture',
    title: 'Bio-Intensive Farming',
    pillar: 'Agronomy',
    wittyNote: 'Thermal compost & tree sponge planting',
    iconKey: 'sun',
    icon: Sun,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
  },
  {
    id: 'seasons',
    basePath: '/seasons',
    title: 'Seasonal Almanac',
    pillar: 'Agronomy',
    wittyNote: 'Rainfall cycles & planting windows',
    iconKey: 'calendar',
    icon: Calendar,
    accentClass: 'text-lime-300',
    badgeBg: 'bg-lime-500/20 border-lime-400/35',
  },
  {
    id: 'sanitarium',
    basePath: '/sanitarium',
    title: 'Sanitarium & Health',
    pillar: 'Health & Lifestyle',
    wittyNote: 'Rational hydrotherapy & 8 health principles',
    iconKey: 'building',
    icon: HeartPulse,
    accentClass: 'text-rose-300',
    badgeBg: 'bg-rose-500/20 border-rose-400/35',
  },
  {
    id: 'kitchen',
    basePath: '/kitchen',
    title: 'Country Kitchen',
    pillar: 'Nutrition',
    wittyNote: 'Whole foods, seed emulsions & drying',
    iconKey: 'sprout',
    icon: UtensilsCrossed,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
  },
  {
    id: 'calculators',
    basePath: '/calculators',
    title: 'Homestead Calculators',
    pillar: 'Engineering',
    wittyNote: 'Solar, cistern, and budget estimators',
    iconKey: 'calculator',
    icon: Calculator,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
    shortcut: 'Alt+6',
  },
  {
    id: 'how',
    basePath: '/how',
    title: 'Build Schematics',
    pillar: 'Engineering',
    wittyNote: 'Architectural details & water systems',
    iconKey: 'book',
    icon: Hammer,
    accentClass: 'text-sky-300',
    badgeBg: 'bg-sky-500/20 border-sky-400/35',
    shortcut: 'Alt+5',
  },
  {
    id: 'skills',
    basePath: '/skills',
    title: 'Country Skills',
    pillar: 'Self-Reliance',
    wittyNote: 'Rural trades & homestead fabrication',
    iconKey: 'hammer',
    icon: BookOpen,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
  },
  {
    id: 'blueprints',
    basePath: '/blueprints',
    title: 'Outpost Blueprints',
    pillar: 'Sanctuary Campus',
    wittyNote: 'Rural schools, clinics & living centers',
    iconKey: 'building',
    icon: Building2,
    accentClass: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/35',
  },
  {
    id: 'community',
    basePath: '/community',
    title: 'Steward Directory',
    pillar: 'Fellowship',
    wittyNote: 'Country stewards & heirloom seed registry',
    iconKey: 'users',
    icon: Users,
    accentClass: 'text-teal-300',
    badgeBg: 'bg-teal-500/20 border-teal-400/35',
  },
  {
    id: 'tracker',
    basePath: '/tracker',
    title: 'Transition Tracker',
    pillar: 'Sanctuary Path',
    wittyNote: 'Equier-guided Kanban & milestone ledger',
    iconKey: 'check',
    icon: CheckCircle2,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
    shortcut: 'Alt+T',
  },
  {
    id: 'devotional',
    basePath: '/devotional',
    title: 'Daily Devotional',
    pillar: 'Devotion',
    wittyNote: 'Morning Scripture & Spirit of Prophecy',
    iconKey: 'feather',
    icon: Feather,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
  },
  {
    id: 'vision',
    basePath: '/vision',
    title: 'EGW Archive',
    pillar: 'Counsels',
    wittyNote: 'Archival counsels & historical charts',
    iconKey: 'book',
    icon: BookOpen,
    accentClass: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/35',
  },
  {
    id: 'account',
    basePath: '/account',
    title: 'Steward Profile',
    pillar: 'Settings',
    wittyNote: 'Sync status & regional preferences',
    iconKey: 'user',
    icon: UserIcon,
    accentClass: 'text-sky-300',
    badgeBg: 'bg-sky-500/20 border-sky-400/35',
  },
];

// Focused 3-Tab Default Set (Zero initial tab-bar bloat; new tabs open as you navigate)
const DEFAULT_OPEN_TABS: WorkspaceTabDefinition[] = [
  {
    id: 'home',
    basePath: '/',
    currentPath: '/',
    title: 'Sanctuary Home',
    pillar: 'Overview',
    iconKey: 'home',
    pinned: true,
  },
  {
    id: 'scout-map',
    basePath: '/scout-map',
    currentPath: '/scout-map',
    title: 'District GIS Map',
    pillar: 'Land & Water',
    iconKey: 'compass',
  },
  {
    id: 'tracker',
    basePath: '/tracker',
    currentPath: '/tracker',
    title: 'Transition Tracker',
    pillar: 'Sanctuary Path',
    iconKey: 'check',
  },
];

const TABS_STORAGE_KEY = 'outpost_desktop_open_tabs_v4';

function resolveRouteMeta(pathname: string): CatalogRouteMeta {
  if (pathname === '/') return DESKTOP_MODULE_CATALOG[0];
  if (['/scout', '/scout-map', '/map', '/regions'].some((p) => pathname.startsWith(p))) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'scout-map')!;
  }
  if (pathname.startsWith('/almanac') || pathname.startsWith('/seasons')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'seasons')!;
  }
  if (
    pathname.startsWith('/property-evaluator') ||
    pathname.startsWith('/suitability') ||
    pathname.startsWith('/where')
  ) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'where')!;
  }
  if (pathname.startsWith('/edenic-farming') || pathname.startsWith('/agriculture')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'agriculture')!;
  }
  if (pathname.startsWith('/directory') || pathname.startsWith('/community')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'community')!;
  }
  if (pathname.startsWith('/devotionals') || pathname.startsWith('/devotional')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'devotional')!;
  }
  const matched = DESKTOP_MODULE_CATALOG.find(
    (m) => m.basePath !== '/' && pathname.startsWith(m.basePath)
  );
  return matched || DESKTOP_MODULE_CATALOG[0];
}

const QUICK_LAUNCH_SUITES = [
  {
    id: 'SANCTUARY',
    title: '01 · Sanctuary & Vision',
    ids: ['home', 'tracker', 'devotional', 'vision'],
  },
  {
    id: 'LAND_GIS',
    title: '02 · Land, Water & Agronomy',
    ids: ['scout-map', 'where', 'what', 'agriculture', 'seasons'],
  },
  {
    id: 'SANITARIUM',
    title: '03 · Sanitarium & Kitchen',
    ids: ['sanitarium', 'kitchen'],
  },
  {
    id: 'ENGINEERING',
    title: '04 · Engineering & Outposts',
    ids: ['calculators', 'how', 'skills', 'blueprints', 'community'],
  },
];

export function Navigation({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor,
  onToggleInspector,
  isInspectorOpen,
  onOpenSettings,
}: NavigationProps) {
  const { user, isFirebaseAuthenticated, signInWithGoogle, signOut } = useAuth();
  const { palette } = useTheme();
  const isSapphire = palette === 'sapphire' || palette === 'midnight';
  const isSienna = palette === 'sienna';
  const isCharcoal = palette === 'charcoal';
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNewTabMenuOpen, setIsNewTabMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [openTabs, setOpenTabs] = useState<WorkspaceTabDefinition[]>(() => {
    try {
      const saved = localStorage.getItem(TABS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_OPEN_TABS;
  });

  const userMenuRef = useRef<HTMLDivElement>(null);
  const newTabMenuRef = useRef<HTMLDivElement>(null);

  // Persist open tabs
  useEffect(() => {
    try {
      localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(openTabs));
      window.dispatchEvent(
        new CustomEvent('outpost:tabs-updated', { detail: { count: openTabs.length } })
      );
    } catch {}
  }, [openTabs]);

  // Ensure current route is represented in openTabs
  useEffect(() => {
    const meta = resolveRouteMeta(location.pathname);
    const fullPath = `${location.pathname}${location.search}`;

    let dynamicTitle = meta.title;
    if (location.pathname.startsWith('/skills/') && location.pathname.length > 8) {
      const slug = location.pathname.replace('/skills/', '').replace(/-/g, ' ');
      dynamicTitle = `Skill: ${slug.replace(/\b\w/g, (c) => c.toUpperCase())}`;
    }

    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === meta.id);
      if (existingIdx !== -1) {
        const current = prev[existingIdx];
        if (current.currentPath === fullPath && current.title === dynamicTitle) {
          return prev;
        }
        const updated = [...prev];
        updated[existingIdx] = {
          ...current,
          currentPath: fullPath,
          title: dynamicTitle,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: meta.id,
          basePath: meta.basePath,
          currentPath: fullPath,
          title: dynamicTitle,
          pillar: meta.pillar,
          iconKey: meta.iconKey,
          pinned: meta.id === 'home',
        },
      ];
    });
  }, [location.pathname, location.search]);

  const activeMeta = useMemo(
    () => resolveRouteMeta(location.pathname),
    [location.pathname]
  );

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (openTabs.length <= 1) return;

    const idx = openTabs.findIndex((t) => t.id === tabId);
    if (idx === -1) return;

    const nextTabs = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(nextTabs);

    if (activeMeta.id === tabId && nextTabs.length > 0) {
      const fallbackTab = nextTabs[Math.max(0, idx - 1)] || nextTabs[0];
      navigate(fallbackTab.currentPath);
    }
  };

  const handleResetDefaultTabs = () => {
    setOpenTabs(DEFAULT_OPEN_TABS);
    setIsNewTabMenuOpen(false);
  };

  const handleHeaderSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  // Sync header button state with the Left Directory
  useEffect(() => {
    const handleDirectoryState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof customEvent.detail?.isOpen === 'boolean') {
        setIsDrawerOpen(customEvent.detail.isOpen);
      }
    };
    window.addEventListener('outpost:directory-state-changed', handleDirectoryState);
    return () => {
      window.removeEventListener('outpost:directory-state-changed', handleDirectoryState);
    };
  }, []);

  const handleToggleDirectory = () => {
    window.dispatchEvent(new CustomEvent('outpost:toggle-left-directory'));
  };

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsNewTabMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (newTabMenuRef.current && !newTabMenuRef.current.contains(e.target as Node)) {
        setIsNewTabMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header
      id="outpost-main-header"
      className={cn(
        'shrink-0 w-full z-50 flex flex-col select-none',
        isSapphire ? 'glass-depth-nav' : 'glass-depth-nav-emerald'
      )}
      aria-label="Application Navigation and Workspace Tabs"
    >
      <div
        className={cn(
          'h-12 px-2.5 sm:px-3.5 flex items-center justify-between gap-2 bg-gradient-to-r',
          isCharcoal
            ? 'from-[#121215]/98 via-[#18181C]/96 to-[#121215]/98'
            : isSienna
            ? 'from-[#1F0B05]/96 via-[#2E1108]/94 to-[#1F0B05]/96'
            : isSapphire
            ? 'from-[#030F1E]/96 via-[#06182E]/94 to-[#030F1E]/96'
            : 'from-[#03110A]/96 via-[#071F12]/94 to-[#03110A]/96'
        )}
      >
        {/* ===================================================================
            LEFT ZONE: DESKTOP WINDOW CHROME + EXPLORER + MINIMALIST LOGO
        =================================================================== */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Native Desktop Window Dots (Traffic Lights) */}
          <div className="hidden sm:flex items-center gap-1.5 px-1 py-1 rounded-lg bg-black/25 border border-white/5 mr-0.5">
            <button
              type="button"
              onClick={() => navigate('/')}
              title="Return to Sanctuary Home"
              aria-label="Home"
              className="w-2.5 h-2.5 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer"
            />
            <button
              type="button"
              onClick={() => {
                const el = document.documentElement;
                if (!document.fullscreenElement) {
                  el.requestFullscreen?.().catch(() => {});
                } else {
                  document.exitFullscreen?.().catch(() => {});
                }
              }}
              title="Toggle Fullscreen Zen Mode (⌘F)"
              aria-label="Fullscreen Zen Mode"
              className="w-2.5 h-2.5 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
            />
            <button
              type="button"
              onClick={handleToggleDirectory}
              title="Toggle Field Directory Sidebar (⌘B)"
              aria-label="Toggle Sidebar"
              className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
            />
          </div>

          {/* Unified Window Control Capsule (Sidebar Toggle + Back/Forward) */}
          <div className="inline-flex items-center rounded-xl bg-white/[0.04] border border-white/12 p-0.5 shadow-inner">
            <button
              id="outpost-drawer-toggle"
              type="button"
              onClick={handleToggleDirectory}
              title="Toggle Field Suite Directory (⌘B)"
              aria-label="Toggle Workspace Explorer"
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
                isDrawerOpen
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-200 hover:text-amber-300 hover:bg-white/10'
              )}
            >
              <PanelLeft size={14} />
            </button>

            <span className="hidden lg:inline-block w-px h-3.5 bg-white/12 mx-0.5" />

            <button
              type="button"
              onClick={() => navigate(-1)}
              title="Navigate Back (Alt+←)"
              aria-label="Navigate Back"
              className="hidden lg:inline-flex p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              title="Navigate Forward (Alt+→)"
              aria-label="Navigate Forward"
              className="hidden lg:inline-flex p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Brand Crest */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg whitespace-nowrap"
            title="Outpost Country Living • Malawi Sanctuary Blueprint"
          >
            <OutpostLogo size="sm" variant="header" showSubtitle={false} />
          </Link>
        </div>

        {/* ===================================================================
            CENTER ZONE: SCULPTED 3D GLASS WORKSPACE TABS + COMPACT LAUNCHER
        =================================================================== */}
        <div
          role="tablist"
          aria-label="Open Workspace Tabs"
          className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0 px-1"
        >
          {openTabs.map((tab) => {
            const catalogEntry =
              DESKTOP_MODULE_CATALOG.find((m) => m.id === tab.id) ||
              DESKTOP_MODULE_CATALOG[0];
            const Icon = catalogEntry.icon;
            const isActive = activeMeta.id === tab.id;

            return (
              <div
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => navigate(tab.currentPath)}
                onAuxClick={(e) => {
                  if (e.button === 1 && !tab.pinned) {
                    handleCloseTab(e, tab.id);
                  }
                }}
                onMouseEnter={() => prefetchRoute(tab.basePath)}
                title={`${tab.title} — ${catalogEntry.wittyNote}${
                  catalogEntry.shortcut ? ` (${catalogEntry.shortcut})` : ''
                }`}
                className={cn(
                  'group relative h-8 pl-1.5 pr-2.5 rounded-xl border flex items-center gap-1.5 text-xs transition-all cursor-pointer shrink-0 max-w-[195px]',
                  isActive
                    ? isSapphire
                      ? 'bg-gradient-to-b from-sky-500/30 via-blue-900/65 to-slate-950/90 text-white border-sky-400/60 shadow-[0_4px_14px_rgba(14,165,233,0.28),inset_0_1px_0_rgba(255,255,255,0.3)] font-bold'
                      : 'bg-gradient-to-b from-emerald-500/30 via-emerald-950/75 to-stone-950/90 text-white border-emerald-400/60 shadow-[0_4px_14px_rgba(16,185,129,0.28),inset_0_1px_0_rgba(255,255,255,0.3)] font-bold'
                    : 'bg-white/[0.03] hover:bg-white/[0.09] text-stone-200/80 hover:text-white border-white/10 hover:border-white/25 font-medium'
                )}
              >
                {/* Jewelled Mini Symbol Badge inside Tab */}
                <span
                  className={cn(
                    'w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105',
                    isActive
                      ? catalogEntry.badgeBg
                      : 'bg-white/[0.04] border-white/10'
                  )}
                >
                  <Icon
                    size={11}
                    className={cn(
                      'shrink-0',
                      isActive ? catalogEntry.accentClass : 'text-stone-300 group-hover:text-white'
                    )}
                  />
                </span>

                <span className="truncate whitespace-nowrap text-xs">
                  {tab.title}
                </span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] shrink-0" />
                )}

                {!tab.pinned && openTabs.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    title="Close Tab"
                    aria-label={`Close ${tab.title} tab`}
                    className={cn(
                      'ml-0.5 p-0.5 rounded hover:bg-white/15 hover:text-amber-300 transition-opacity cursor-pointer',
                      isActive
                        ? 'opacity-80 hover:opacity-100 text-stone-200'
                        : 'opacity-0 group-hover:opacity-100 text-stone-400'
                    )}
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Compact '+' Quick-Launch Popover Trigger */}
          <div className="relative flex items-center gap-1 shrink-0" ref={newTabMenuRef}>
            <button
              type="button"
              onClick={() => setIsNewTabMenuOpen((prev) => !prev)}
              title="Launch or Pin Module Tab"
              aria-label="Open Module Quick Launcher"
              className={cn(
                'h-8 px-2.5 rounded-xl flex items-center gap-1 border text-xs font-semibold transition-all cursor-pointer',
                isNewTabMenuOpen
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-stone-950 border-amber-300 shadow-[0_4px_12px_rgba(245,158,11,0.4)] font-bold'
                  : 'bg-white/[0.05] hover:bg-white/[0.12] text-amber-200 hover:text-white border-white/15'
              )}
            >
              <Plus size={13} />
              <span className="hidden 2xl:inline">Modules</span>
            </button>

            {openTabs.length > 3 && (
              <button
                type="button"
                onClick={handleResetDefaultTabs}
                title="Tidy Workspace to 3 Core Tabs"
                className="hidden xl:inline-flex h-8 px-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-[11px] font-mono text-stone-300 hover:text-amber-300 items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>Tidy</span>
              </button>
            )}
          </div>
        </div>

        {/* ===================================================================
            RIGHT ZONE: 3 UNIFIED GLASS CAPSULES (ZERO REDUNDANCY)
        =================================================================== */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Capsule 1: Omnibar Search Trigger (⌘K) */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="h-8 px-2.5 rounded-xl bg-black/25 hover:bg-white/10 border border-white/15 hover:border-amber-400/50 flex items-center gap-2 text-xs text-stone-200 hover:text-white transition-all cursor-pointer shadow-inner"
              title="Search 28 districts, crops, calculators & EGW counsel (⌘K)"
            >
              <Search size={13} className="text-amber-300 shrink-0" />
              <span className="hidden xl:inline text-stone-300">Search...</span>
              <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-amber-300">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Capsule 2: Direct Field Utilities (Advisor · Split Sizer ⌘I · Sources) */}
          <div className="hidden sm:inline-flex items-center rounded-xl bg-white/[0.04] border border-white/14 p-0.5">
            {onOpenAdvisor && (
              <button
                type="button"
                onClick={onOpenAdvisor}
                title="Outpost Homestead Advisor (Districts, Water & EGW Counsel)"
                className="flex items-center gap-1 px-2 h-7 rounded-lg text-xs font-semibold text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Sparkles size={12} className="text-amber-300 shrink-0" />
                <span className="hidden lg:inline">Advisor</span>
              </button>
            )}

            {onToggleInspector && (
              <button
                type="button"
                onClick={onToggleInspector}
                title="Toggle Side-by-Side Acreage Sizer & Field Notes (⌘I)"
                className={cn(
                  'flex items-center gap-1 px-2 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                  isInspectorOpen
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-200 hover:text-white hover:bg-white/10'
                )}
              >
                <Columns2 size={12} className={isInspectorOpen ? 'text-stone-950' : 'text-emerald-300'} />
                <span className="hidden xl:inline">Sizer</span>
              </button>
            )}

            {onOpenCitations && (
              <button
                type="button"
                onClick={onOpenCitations}
                title="Verified Data & EGW Archival Sources"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-sky-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Verified Data Sources"
              >
                <ShieldCheck size={13} />
              </button>
            )}
          </div>

          {/* Capsule 3: Unified Settings & Appearance Symbol (Auto-Hides Theme Options Behind ⌘,) */}
          {onOpenSettings && (
            <button
              type="button"
              onClick={() => onOpenSettings('appearance')}
              className="flex items-center gap-1.5 px-2.5 h-8 rounded-xl bg-white/[0.04] hover:bg-white/10 text-stone-200 hover:text-amber-300 border border-white/14 transition-all cursor-pointer shadow-inner"
              title="Settings & Preferences (Themes, Fonts, Offline Vault & Dev Info: Alfred Pereira-Sozilho Onesi) (⌘,)"
              aria-label="Open Settings and Preferences"
            >
              <Settings size={13} className="text-amber-300 shrink-0" />
              <span className="hidden xl:inline text-xs font-semibold">Settings</span>
              <kbd className="hidden 2xl:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-amber-300">
                ⌘,
              </kbd>
            </button>
          )}

          {/* Capsule 4: Steward Profile / Google Sign-In */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 pl-1.5 pr-2 h-8 rounded-xl bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 text-xs font-semibold cursor-pointer"
                title={`Signed in as ${user.displayName || user.email}`}
              >
                <img
                  src={
                    user.photoURL ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                      user.displayName || 'Steward'
                    )}`
                  }
                  alt={user.displayName || 'Steward'}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded object-cover bg-emerald-950"
                />
                <span className="hidden 2xl:inline max-w-[72px] truncate text-amber-200">
                  {user.displayName?.split(' ')[0] || 'Steward'}
                </span>
                <ChevronDown size={11} className="text-stone-200" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className={cn(
                      'absolute right-0 mt-2 w-60 rounded-2xl p-2.5 flex flex-col gap-1 z-50 text-xs text-stone-100',
                      isSapphire ? 'glass-depth-blue-hero' : 'glass-depth-emerald-hero'
                    )}
                  >
                    <div className="px-2.5 py-2 border-b border-white/15 mb-1">
                      <p className="font-bold text-white truncate">
                        {user.displayName || 'Country Steward'}
                      </p>
                      <p className="text-[11px] text-stone-300 truncate">{user.email}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {isFirebaseAuthenticated ? 'Cloud Synced' : 'Local Cache Active'}
                      </span>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-stone-100 hover:text-white transition-colors"
                    >
                      <UserIcon size={13} className="text-amber-300" />
                      <span>My Sanctuary Profile</span>
                    </Link>

                    <Link
                      to="/tracker"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-stone-100 hover:text-white transition-colors"
                    >
                      <CheckCircle2 size={13} className="text-emerald-300" />
                      <span>Transition Tracker</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-rose-950/50 text-rose-300 hover:text-rose-200 transition-colors w-full text-left mt-1 border-t border-white/15 pt-2 cursor-pointer"
                    >
                      <LogOut size={13} className="text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleHeaderSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-1.5 px-3 h-8 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
              title="Sign in with Google"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          COMPACT QUICK LAUNCHER POPOVER (MINIMALIST DESKTOP APP COMMAND MENU)
      ===================================================================== */}
      <AnimatePresence>
        {isNewTabMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className={cn(
              'absolute top-12 left-3 sm:left-36 z-50 w-[94vw] max-w-xl rounded-2xl p-3.5 text-xs text-stone-100 shadow-2xl',
              isSapphire ? 'glass-depth-blue-hero' : 'glass-depth-emerald-hero'
            )}
          >
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/15">
              <span className="font-mono font-bold uppercase tracking-wider text-amber-300 text-[11px]">
                Module Launcher
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetDefaultTabs}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/12 text-[11px] text-stone-200 hover:text-amber-300 cursor-pointer"
                >
                  <RotateCcw size={10} />
                  <span>Reset 3 Core Tabs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewTabMenuOpen(false)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer"
                  aria-label="Close Launcher"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[62vh] overflow-y-auto custom-scrollbar pr-0.5">
              {QUICK_LAUNCH_SUITES.map((suite) => {
                const suiteModules = suite.ids
                  .map((id) => DESKTOP_MODULE_CATALOG.find((m) => m.id === id))
                  .filter(Boolean) as CatalogRouteMeta[];

                return (
                  <div
                    key={suite.id}
                    className="p-2.5 rounded-xl bg-black/25 border border-white/10 flex flex-col gap-1.5"
                  >
                    <span className="font-mono font-bold text-amber-300 text-[11px] px-1">
                      {suite.title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {suiteModules.map((mod) => {
                        const ModIcon = mod.icon;
                        const isCurrent = activeMeta.id === mod.id;

                        return (
                          <button
                            key={mod.id}
                            type="button"
                            onClick={() => {
                              navigate(mod.basePath);
                              setIsNewTabMenuOpen(false);
                            }}
                            className={cn(
                              'px-2 py-1.5 rounded-lg text-left flex items-center justify-between gap-2 border transition-all cursor-pointer group',
                              isCurrent
                                ? isSapphire
                                  ? 'bg-sky-500/25 text-white border-sky-400/50 font-semibold'
                                  : 'bg-emerald-500/25 text-white border-emerald-400/50 font-semibold'
                                : 'bg-white/[0.02] hover:bg-white/[0.08] text-stone-200 border-transparent hover:border-white/15'
                            )}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span
                                className={cn(
                                  'w-5 h-5 rounded-md border flex items-center justify-center shrink-0',
                                  mod.badgeBg
                                )}
                              >
                                <ModIcon size={11} className={mod.accentClass} />
                              </span>
                              <span className="truncate text-xs">{mod.title}</span>
                            </span>
                            {mod.shortcut && (
                              <kbd className="text-[10px] font-mono px-1 rounded bg-white/10 text-stone-300 shrink-0">
                                {mod.shortcut}
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navigation;
