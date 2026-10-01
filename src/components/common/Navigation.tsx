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
  Maximize2,
  Minimize2,
  RotateCcw,
  Pin,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from './OutpostLogo';
import { PWAInstallButton } from './PWAInstallButton';

export interface NavigationProps {
  onOpenCitations?: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
  onToggleInspector?: () => void;
  isInspectorOpen?: boolean;
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
  iconKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentClass: string;
  shortcut?: string;
}

export const DESKTOP_MODULE_CATALOG: CatalogRouteMeta[] = [
  {
    id: 'home',
    basePath: '/',
    title: 'Sanctuary Home',
    pillar: 'Overview',
    iconKey: 'home',
    icon: HomeIcon,
    accentClass: 'text-amber-300',
    shortcut: 'Alt+1',
  },
  {
    id: 'scout-map',
    basePath: '/scout-map',
    title: '28-District GIS Map',
    pillar: 'Pillar 2 · Land & Water',
    iconKey: 'compass',
    icon: Compass,
    accentClass: 'text-cyan-300',
    shortcut: 'Alt+3',
  },
  {
    id: 'where',
    basePath: '/where',
    title: 'Land Law & Districts',
    pillar: 'Pillar 2 · Land & Water',
    iconKey: 'mappin',
    icon: MapPin,
    accentClass: 'text-emerald-300',
    shortcut: 'Alt+2',
  },
  {
    id: 'suitability',
    basePath: '/suitability',
    title: '100-Pt Land Evaluator',
    pillar: 'Pillar 2 · Land & Water',
    iconKey: 'shield',
    icon: ShieldCheck,
    accentClass: 'text-teal-300',
  },
  {
    id: 'what',
    basePath: '/what',
    title: 'Crops & Soil Swatches',
    pillar: 'Pillar 3 · Agronomy',
    iconKey: 'sprout',
    icon: Sprout,
    accentClass: 'text-emerald-300',
    shortcut: 'Alt+4',
  },
  {
    id: 'agriculture',
    basePath: '/agriculture',
    title: 'Edenic Agriculture',
    pillar: 'Pillar 3 · Agronomy',
    iconKey: 'sun',
    icon: Sun,
    accentClass: 'text-amber-300',
  },
  {
    id: 'seasons',
    basePath: '/seasons',
    title: 'Seasonal Almanac',
    pillar: 'Pillar 3 · Agronomy',
    iconKey: 'calendar',
    icon: Calendar,
    accentClass: 'text-lime-300',
  },
  {
    id: 'calculators',
    basePath: '/calculators',
    title: 'Calculators & BoQ',
    pillar: 'Pillar 3 · Engineering',
    iconKey: 'calculator',
    icon: Calculator,
    accentClass: 'text-amber-300',
    shortcut: 'Alt+6',
  },
  {
    id: 'how',
    basePath: '/how',
    title: 'Engineering Schematics',
    pillar: 'Pillar 3 · Engineering',
    iconKey: 'book',
    icon: BookOpen,
    accentClass: 'text-sky-300',
    shortcut: 'Alt+5',
  },
  {
    id: 'skills',
    basePath: '/skills',
    title: '25 Country Skills',
    pillar: 'Pillar 4 · Outposts',
    iconKey: 'hammer',
    icon: Hammer,
    accentClass: 'text-amber-300',
  },
  {
    id: 'blueprints',
    basePath: '/blueprints',
    title: 'Outpost Blueprints',
    pillar: 'Pillar 4 · Outposts',
    iconKey: 'building',
    icon: Building2,
    accentClass: 'text-emerald-300',
  },
  {
    id: 'community',
    basePath: '/community',
    title: 'Believer Directory',
    pillar: 'Pillar 4 · Outposts',
    iconKey: 'users',
    icon: Users,
    accentClass: 'text-teal-300',
  },
  {
    id: 'tracker',
    basePath: '/tracker',
    title: 'Exodus Readiness Ledger',
    pillar: 'Pillar 1 · Sanctuary',
    iconKey: 'check',
    icon: CheckCircle2,
    accentClass: 'text-amber-300',
    shortcut: 'Alt+T',
  },
  {
    id: 'devotional',
    basePath: '/devotional',
    title: 'Daily Manna & Counsel',
    pillar: 'Pillar 1 · Sanctuary',
    iconKey: 'feather',
    icon: Feather,
    accentClass: 'text-amber-300',
  },
  {
    id: 'vision',
    basePath: '/vision',
    title: 'EGW Counsel Archive',
    pillar: 'Pillar 1 · Sanctuary',
    iconKey: 'book',
    icon: BookOpen,
    accentClass: 'text-emerald-300',
  },
  {
    id: 'account',
    basePath: '/account',
    title: 'Steward Profile',
    pillar: 'System',
    iconKey: 'user',
    icon: UserIcon,
    accentClass: 'text-amber-300',
  },
];

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
    title: '28-District GIS Map',
    pillar: 'Pillar 2 · Land & Water',
    iconKey: 'compass',
  },
  {
    id: 'where',
    basePath: '/where',
    currentPath: '/where',
    title: 'Land Law & Districts',
    pillar: 'Pillar 2 · Land & Water',
    iconKey: 'mappin',
  },
  {
    id: 'calculators',
    basePath: '/calculators',
    currentPath: '/calculators',
    title: 'Calculators & BoQ',
    pillar: 'Pillar 3 · Engineering',
    iconKey: 'calculator',
  },
  {
    id: 'skills',
    basePath: '/skills',
    currentPath: '/skills',
    title: '25 Country Skills',
    pillar: 'Pillar 4 · Outposts',
    iconKey: 'hammer',
  },
  {
    id: 'seasons',
    basePath: '/seasons',
    currentPath: '/seasons',
    title: 'Seasonal Almanac',
    pillar: 'Pillar 3 · Agronomy',
    iconKey: 'calendar',
  },
  {
    id: 'tracker',
    basePath: '/tracker',
    currentPath: '/tracker',
    title: 'Exodus Readiness Ledger',
    pillar: 'Pillar 1 · Sanctuary',
    iconKey: 'check',
  },
];

const TABS_STORAGE_KEY = 'outpost_desktop_open_tabs_v2';

function resolveRouteMeta(pathname: string): CatalogRouteMeta {
  if (pathname === '/') return DESKTOP_MODULE_CATALOG[0];
  if (['/scout', '/scout-map', '/map', '/regions'].some((p) => pathname.startsWith(p))) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'scout-map')!;
  }
  if (pathname.startsWith('/almanac') || pathname.startsWith('/seasons')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'seasons')!;
  }
  if (pathname.startsWith('/property-evaluator') || pathname.startsWith('/suitability')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'suitability')!;
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

export function Navigation({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor,
  onToggleInspector,
  isInspectorOpen,
}: NavigationProps) {
  const { user, isFirebaseAuthenticated, signInWithGoogle, signOut } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNewTabMenuOpen, setIsNewTabMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

    // Dynamic sub-title for skill detail pages
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
    const tabToClose = openTabs[idx];
    if (tabToClose.pinned && openTabs.length > 1) {
      // Unpin first if user clicks close on a pinned tab
    }

    const nextTabs = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(nextTabs);

    if (activeMeta.id === tabId && nextTabs.length > 0) {
      const fallbackTab = nextTabs[Math.max(0, idx - 1)] || nextTabs[0];
      navigate(fallbackTab.currentPath);
    }
  };

  const handleTogglePinTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenTabs((prev) =>
      prev.map((t) => (t.id === tabId ? { ...t, pinned: !t.pinned } : t))
    );
  };

  const handleResetDefaultTabs = () => {
    setOpenTabs(DEFAULT_OPEN_TABS);
    setIsNewTabMenuOpen(false);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
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

  // Close menus on route navigation
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsNewTabMenuOpen(false);
  }, [location.pathname]);

  // Close menus when clicking outside
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
      className="shrink-0 w-full z-50 bg-[#05120B] border-b border-emerald-950 flex flex-col select-none shadow-md"
      aria-label="Desktop Application Titlebar and Workspace Tabs"
    >
      {/* =====================================================================
          TIER 1: NATIVE DESKTOP TITLE BAR & MULTI-TAB WORKSPACE STRIP
      ===================================================================== */}
      <div className="h-10 px-2 sm:px-3 flex items-center justify-between gap-2 bg-[#040E08] border-b border-emerald-950/90">
        {/* LEFT: DESKTOP WINDOW TRAFFIC CONTROLS + APP TITLE + SIDEBAR DOCK + HISTORY */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Window Frame Controls */}
          <div
            className="hidden md:flex items-center gap-1.5 px-1.5 py-1"
            title="Desktop Window Controls"
          >
            <button
              type="button"
              onClick={() => navigate('/')}
              title="Return to Sanctuary Home (Alt+1)"
              className="w-3 h-3 rounded-full bg-rose-500/85 hover:bg-rose-400 border border-rose-600/50 transition-colors cursor-pointer"
              aria-label="Home Window Control"
            />
            <button
              type="button"
              onClick={handleToggleDirectory}
              title="Toggle Left Workspace Explorer (⌘B)"
              className="w-3 h-3 rounded-full bg-amber-400/90 hover:bg-amber-300 border border-amber-500/50 transition-colors cursor-pointer"
              aria-label="Toggle Explorer Window Control"
            />
            <button
              type="button"
              onClick={handleToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen Window' : 'Enter Fullscreen Desktop Mode'}
              className="w-3 h-3 rounded-full bg-emerald-500/90 hover:bg-emerald-400 border border-emerald-600/50 transition-colors cursor-pointer"
              aria-label="Toggle Fullscreen Window Control"
            />
          </div>

          {/* App Brand Emblem */}
          <Link
            to="/"
            className="flex items-center gap-1.5 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg whitespace-nowrap"
            title="OUTPOST DESKTOP • Malawi Country Living Workstation"
          >
            <OutpostLogo size="sm" variant="header" showSubtitle={false} />
          </Link>

          {/* Toggle Left Sidebar Explorer Button */}
          <button
            id="outpost-drawer-toggle"
            type="button"
            onClick={handleToggleDirectory}
            title="Toggle Workspace Explorer Sidebar (⌘B)"
            className={cn(
              'p-1.5 rounded-lg border text-xs transition-colors cursor-pointer',
              isDrawerOpen
                ? 'bg-emerald-800/80 text-amber-300 border-amber-400/40'
                : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10'
            )}
            aria-label="Toggle Workspace Explorer"
          >
            <PanelLeft size={14} />
          </button>

          {/* Native Desktop Back / Forward History Controls */}
          <div
            className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10"
            role="group"
            aria-label="Workspace History Navigation"
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-1 rounded text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Navigate Back (Alt+Left)"
              aria-label="Navigate Back"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              className="p-1 rounded text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Navigate Forward (Alt+Right)"
              aria-label="Navigate Forward"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* CENTER: INTERACTIVE MULTI-TAB WORKSPACE STRIP */}
        <div
          role="tablist"
          aria-label="Open Desktop Workspace Tabs"
          className="flex-1 flex items-end gap-1 overflow-x-auto no-scrollbar h-full pt-1.5 min-w-0"
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
                title={`${tab.title} • ${tab.pillar}${
                  catalogEntry.shortcut ? ` (${catalogEntry.shortcut})` : ''
                }`}
                className={cn(
                  'group relative h-8.5 px-2.5 sm:px-3 rounded-t-lg border-t border-x flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer shrink-0 max-w-[195px]',
                  isActive
                    ? 'bg-[#0C2316] text-white border-t-2 border-t-amber-400 border-x-emerald-800/80 shadow-sm z-10 font-semibold'
                    : 'bg-[#07160E]/85 hover:bg-[#0A1D13] text-stone-400 hover:text-stone-200 border-t-emerald-950/60 border-x-emerald-950/70'
                )}
              >
                <Icon
                  size={13}
                  className={cn(
                    'shrink-0',
                    isActive ? catalogEntry.accentClass : 'text-stone-400 group-hover:text-stone-200'
                  )}
                />
                <span className="truncate whitespace-nowrap text-[11px] sm:text-xs">
                  {tab.title}
                </span>

                {/* Pin or Close Tab Affordance */}
                {tab.pinned ? (
                  <button
                    type="button"
                    onClick={(e) => handleTogglePinTab(e, tab.id)}
                    title="Pinned Workspace Tab (Click to unpin)"
                    className="ml-0.5 p-0.5 rounded text-amber-400/80 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Pin size={10} />
                  </button>
                ) : (
                  openTabs.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      title="Close Tab"
                      aria-label={`Close ${tab.title} tab`}
                      className={cn(
                        'ml-0.5 p-0.5 rounded hover:bg-white/15 hover:text-amber-300 transition-opacity cursor-pointer',
                        isActive
                          ? 'opacity-80 hover:opacity-100 text-stone-300'
                          : 'opacity-0 group-hover:opacity-100 text-stone-400'
                      )}
                    >
                      <X size={11} />
                    </button>
                  )
                )}
              </div>
            );
          })}

          {/* '+' OPEN NEW WORKSPACE TAB BUTTON & LAUNCHER POPOVER */}
          <div className="relative flex items-center self-center ml-0.5" ref={newTabMenuRef}>
            <button
              type="button"
              onClick={() => setIsNewTabMenuOpen((prev) => !prev)}
              title="Open Module in Tab (+)"
              aria-label="Open New Workspace Tab"
              className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center border transition-colors cursor-pointer',
                isNewTabMenuOpen
                  ? 'bg-amber-400 text-stone-950 border-amber-300'
                  : 'bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border-white/10'
              )}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* RIGHT: SYSTEM TRAY, INSTALL DESKTOP APP, THEME & STEWARD PROFILE */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Install Desktop / Mobile App Button */}
          <PWAInstallButton className="px-2.5 py-1 rounded-lg text-[11px]" />

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-amber-300 border border-white/10 transition-colors cursor-pointer"
            title={
              isDark
                ? 'Switch to Daylight Workspace (Light Mode)'
                : 'Switch to Evening Workspace (Dark Mode)'
            }
            aria-label="Toggle Workspace Theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Steward Profile / Google Sign-In */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-stone-100 border border-white/15 text-[11px] font-semibold cursor-pointer"
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
                <span className="hidden xl:inline max-w-[75px] truncate text-amber-200">
                  {user.displayName?.split(' ')[0] || 'Steward'}
                </span>
                <ChevronDown size={11} className="text-stone-300" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#071A10] border border-emerald-800/80 shadow-2xl p-2.5 flex flex-col gap-1 z-50 text-xs text-stone-200"
                  >
                    <div className="px-2.5 py-2 border-b border-emerald-900/60 mb-1">
                      <p className="font-bold text-white truncate">
                        {user.displayName || 'Country Steward'}
                      </p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {isFirebaseAuthenticated ? 'Cloud Synced' : 'Offline Ready'}
                      </span>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
                    >
                      <UserIcon size={14} className="text-amber-300" />
                      <span>My Sanctuary Profile</span>
                    </Link>

                    <Link
                      to="/tracker"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
                    >
                      <Sparkles size={14} className="text-amber-300" />
                      <span>Exodus Progress Ledger</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 transition-colors w-full text-left mt-1 border-t border-emerald-900/50 pt-2 cursor-pointer"
                    >
                      <LogOut size={14} className="text-rose-400" />
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-[11px] transition-colors cursor-pointer whitespace-nowrap"
              title="Sign in with Google"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          TIER 2: DESKTOP ADDRESS / BREADCRUMB BAR & WORKSPACE ACTION DOCK
      ===================================================================== */}
      <div className="h-9 px-2.5 sm:px-4 bg-[#0C2316] flex items-center justify-between gap-3 text-xs">
        {/* Left: Active Workspace Breadcrumb & Quick Module Switcher */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#07150D] border border-emerald-900/70 text-[11px] font-mono text-stone-300 truncate">
            <span className="text-emerald-400 hidden sm:inline">outpost://malawi</span>
            <span className="text-stone-600 hidden sm:inline">/</span>
            <span className="text-stone-400 hidden md:inline">{activeMeta.pillar}</span>
            <span className="text-stone-600 hidden md:inline">/</span>
            <span className="text-amber-300 font-semibold truncate">{activeMeta.title}</span>
          </div>

          {/* Quick Open Module Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsNewTabMenuOpen((prev) => !prev)}
            className="hidden lg:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>All 15 Modules</span>
            <ChevronDown size={11} />
          </button>
        </div>

        {/* Center: Desktop Command Search Omni-Bar */}
        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex-1 max-w-md h-7 px-3 rounded-lg bg-[#06140C]/90 hover:bg-[#06140C] border border-emerald-800/70 hover:border-amber-400/50 flex items-center justify-between gap-2 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Open Command & Search Palette (⌘K or /)"
          >
            <span className="flex items-center gap-2 truncate">
              <Search size={12} className="text-amber-300 shrink-0" />
              <span className="truncate">
                Search 28 districts, crops, calculators, or jump to tab...
              </span>
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-amber-200 border border-white/10 shrink-0">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Right: Desktop Workspace Tools (AI Advisor, Split Reference Inspector, Citations) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenAdvisor && (
            <button
              type="button"
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white border border-amber-400/35 text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
              title="Open Outpost Homestead Advisor"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span className="hidden sm:inline">Advisor</span>
            </button>
          )}

          {onToggleInspector && (
            <button
              type="button"
              onClick={onToggleInspector}
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap',
                isInspectorOpen
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                  : 'bg-white/5 hover:bg-white/15 text-stone-200 border-white/15'
              )}
              title="Toggle Side-by-Side Reference Sizer & Scratchpad Dock (⌘I)"
            >
              <Columns2 size={12} />
              <span className="hidden lg:inline">Inspector Dock</span>
            </button>
          )}

          {onOpenCitations && (
            <button
              type="button"
              onClick={onOpenCitations}
              className="hidden xl:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-emerald-300 border border-white/10 text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap"
              title="Verify DCCMS, FAO HWSD v2.0 & EGW Citations"
            >
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Sources</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          NEW TAB / MODULE LAUNCHER POPOVER MENU
      ===================================================================== */}
      <AnimatePresence>
        {isNewTabMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute top-19 left-4 sm:left-48 z-50 w-88 sm:w-96 rounded-2xl bg-[#071910] border border-emerald-800/90 shadow-2xl p-3 text-xs text-stone-200"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/70">
              <span className="font-mono font-bold uppercase tracking-wider text-amber-300 text-[11px]">
                Open Workspace Tab
              </span>
              <button
                type="button"
                onClick={handleResetDefaultTabs}
                className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:underline cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>Reset Default Tabs</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-80 overflow-y-auto custom-scrollbar">
              {DESKTOP_MODULE_CATALOG.map((mod) => {
                const ModIcon = mod.icon;
                const isAlreadyOpen = openTabs.some((t) => t.id === mod.id);
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
                      'p-2 rounded-xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer',
                      isCurrent
                        ? 'bg-emerald-800/80 text-white border border-amber-400/40'
                        : 'hover:bg-white/10 text-stone-200'
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <ModIcon size={14} className={cn('shrink-0', mod.accentClass)} />
                      <span className="truncate font-medium">{mod.title}</span>
                    </span>
                    {isAlreadyOpen && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                        Open
                      </span>
                    )}
                  </button>
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
