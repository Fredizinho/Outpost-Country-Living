import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  Pin,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { OutpostLogo } from './OutpostLogo';
import { SettingsModalTab } from '../layout/SettingsAndAboutModal';
import { usePlatform } from '@/lib/platform';
import { DesktopTitleBarControls } from './DesktopTitleBarControls';
import { Tooltip } from './Tooltip';
import { BreadcrumbsBar } from './BreadcrumbsBar';
import { ApplicationMenu } from '../layout/ApplicationMenu';
import { formatAccelerator } from '@/lib/acceleratorUtils';

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
  history?: string[];
  historyIndex?: number;
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
    title: 'Home',
    pillar: 'Overview',
    wittyNote: 'Home overview & family acreage sizer',
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
    wittyNote: 'Interactive Kanban & milestone ledger',
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
  {
    id: 'settings',
    basePath: '/settings',
    title: 'Workspace Settings',
    pillar: 'System',
    wittyNote: 'Theme, offline vault & preferences',
    iconKey: 'settings',
    icon: Settings,
    accentClass: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 border-amber-400/35',
    shortcut: '⌘,',
  },
];

// Focused 3-Tab Default Set matching Start@1x1.png
const DEFAULT_OPEN_TABS: WorkspaceTabDefinition[] = [
  {
    id: 'home',
    basePath: '/',
    currentPath: '/',
    title: 'Start',
    pillar: 'Overview',
    iconKey: 'home',
    pinned: true,
  },
  {
    id: 'scout-map',
    basePath: '/scout-map',
    currentPath: '/scout-map',
    title: 'District map',
    pillar: 'Land & Water',
    iconKey: 'compass',
  },
  {
    id: 'skills',
    basePath: '/skills/ram-pump',
    currentPath: '/skills/ram-pump',
    title: 'Rainwater guide',
    pillar: 'Water',
    iconKey: 'droplet',
  },
];

const TABS_STORAGE_KEY = 'outpost_desktop_open_tabs_v4';

function resolveRouteMeta(pathname: string): CatalogRouteMeta {
  if (pathname === '/') return DESKTOP_MODULE_CATALOG[0];
  if (pathname.startsWith('/settings') || pathname.startsWith('/preferences')) {
    return DESKTOP_MODULE_CATALOG.find((m) => m.id === 'settings')!;
  }
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
  const { theme, isLight, isDark, isField, toggleTheme } = useTheme();
  const isSapphire = false;
  const isSienna = false;
  const isCharcoal = false;
  const location = useLocation();
  const navigate = useNavigate();
  const platform = usePlatform();

  const handleHeaderDoubleClick = useCallback(async (e: React.MouseEvent) => {
    if (platform.runtime !== 'tauri') return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, [role="tab"], [data-tauri-drag-region="false"]')) {
      return;
    }
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().toggleMaximize();
    } catch (err) {
      console.warn('Double click toggleMaximize error', err);
    }
  }, [platform.runtime]);

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

  const [recentlyClosedTabs, setRecentlyClosedTabs] = useState<WorkspaceTabDefinition[]>(() => {
    try {
      const saved = sessionStorage.getItem('outpost_desktop_recently_closed_tabs_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const newTabMenuRef = useRef<HTMLDivElement>(null);
  const tabStripRef = useRef<HTMLDivElement>(null);
  const moreTabsMenuRef = useRef<HTMLDivElement>(null);
  const [isMoreTabsOpen, setIsMoreTabsOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [tabContextMenu, setTabContextMenu] = useState<{
    x: number;
    y: number;
    tabId: string;
  } | null>(null);

  useEffect(() => {
    const handleGlobalClose = () => setTabContextMenu(null);
    window.addEventListener('click', handleGlobalClose);
    return () => {
      window.removeEventListener('click', handleGlobalClose);
    };
  }, []);

  // Check and update scroll boundaries for tab strip
  const checkTabScroll = () => {
    const el = tabStripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    checkTabScroll();
    const el = tabStripRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkTabScroll);
    window.addEventListener('resize', checkTabScroll);
    return () => {
      el.removeEventListener('scroll', checkTabScroll);
      window.removeEventListener('resize', checkTabScroll);
    };
  }, [openTabs]);

  const handleScrollTabs = (direction: 'left' | 'right') => {
    const el = tabStripRef.current;
    if (!el) return;
    const delta = direction === 'left' ? -200 : 200;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Close more tabs dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreTabsMenuRef.current && !moreTabsMenuRef.current.contains(e.target as Node)) {
        setIsMoreTabsOpen(false);
      }
    }
    if (isMoreTabsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMoreTabsOpen]);

  // Persist open tabs
  useEffect(() => {
    try {
      localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(openTabs));
      window.dispatchEvent(
        new CustomEvent('outpost:tabs-updated', { detail: { count: openTabs.length } })
      );
    } catch {}
  }, [openTabs]);

  // Ensure current route is represented in openTabs and track per-tab history
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
        const prevHistory = current.history || [current.currentPath || current.basePath];
        const prevIndex = current.historyIndex ?? (prevHistory.length - 1);

        let newHistory = prevHistory;
        let newIndex = prevIndex;

        if (current.currentPath !== fullPath) {
          newHistory = [...prevHistory.slice(0, prevIndex + 1), fullPath];
          newIndex = newHistory.length - 1;
        }

        if (
          current.currentPath === fullPath &&
          current.title === dynamicTitle &&
          current.history &&
          current.historyIndex === newIndex
        ) {
          return prev;
        }

        const updated = [...prev];
        updated[existingIdx] = {
          ...current,
          currentPath: fullPath,
          title: dynamicTitle,
          history: newHistory,
          historyIndex: newIndex,
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
          history: [fullPath],
          historyIndex: 0,
        },
      ];
    });
  }, [location.pathname, location.search]);

  const activeMeta = useMemo(
    () => resolveRouteMeta(location.pathname),
    [location.pathname]
  );

  const activeTabObj = useMemo(
    () => openTabs.find((t) => t.id === activeMeta.id),
    [openTabs, activeMeta.id]
  );

  const canTabGoBack = Boolean(
    activeTabObj?.history &&
    activeTabObj.historyIndex !== undefined &&
    activeTabObj.historyIndex > 0
  );

  const canTabGoForward = Boolean(
    activeTabObj?.history &&
    activeTabObj.historyIndex !== undefined &&
    activeTabObj.historyIndex < (activeTabObj.history.length - 1)
  );

  const handleTabBack = () => {
    if (canTabGoBack && activeTabObj) {
      const prevIdx = (activeTabObj.historyIndex ?? 1) - 1;
      const targetPath = activeTabObj.history![prevIdx];
      setOpenTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabObj.id
            ? { ...t, currentPath: targetPath, historyIndex: prevIdx }
            : t
        )
      );
      navigate(targetPath);
    } else {
      navigate(-1);
    }
  };

  const handleTabForward = () => {
    if (canTabGoForward && activeTabObj) {
      const nextIdx = (activeTabObj.historyIndex ?? 0) + 1;
      const targetPath = activeTabObj.history![nextIdx];
      setOpenTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabObj.id
            ? { ...t, currentPath: targetPath, historyIndex: nextIdx }
            : t
        )
      );
      navigate(targetPath);
    } else {
      navigate(1);
    }
  };

  const handleCloseTab = (e: React.MouseEvent | KeyboardEvent, tabId: string) => {
    if ('stopPropagation' in e) e.stopPropagation();
    if ('preventDefault' in e) e.preventDefault();
    if (openTabs.length <= 1) return;

    const idx = openTabs.findIndex((t) => t.id === tabId);
    if (idx === -1) return;
    const closingTab = openTabs[idx];
    if (closingTab.pinned) return;

    // Push to recentlyClosedTabs
    setRecentlyClosedTabs((prev) => {
      const updated = [...prev.slice(-10), closingTab];
      try {
        sessionStorage.setItem('outpost_desktop_recently_closed_tabs_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    const nextTabs = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(nextTabs);

    if (activeMeta.id === tabId && nextTabs.length > 0) {
      const fallbackTab = nextTabs[Math.max(0, idx - 1)] || nextTabs[0];
      navigate(fallbackTab.currentPath);
    }
  };

  const reopenLastClosedTab = useCallback(() => {
    if (recentlyClosedTabs.length === 0) return;
    const last = recentlyClosedTabs[recentlyClosedTabs.length - 1];
    const remaining = recentlyClosedTabs.slice(0, -1);
    setRecentlyClosedTabs(remaining);
    try {
      sessionStorage.setItem('outpost_desktop_recently_closed_tabs_v1', JSON.stringify(remaining));
    } catch {}

    setOpenTabs((prev) => {
      if (prev.some((t) => t.id === last.id)) return prev;
      return [...prev, last];
    });
    navigate(last.currentPath);
  }, [recentlyClosedTabs, navigate]);

  const handleTogglePinTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenTabs((prev) => {
      const target = prev.find((t) => t.id === tabId);
      if (!target) return prev;
      const nextPinned = !target.pinned;
      const updated = prev.map((t) => (t.id === tabId ? { ...t, pinned: nextPinned } : t));
      const pinned = updated.filter((t) => t.pinned);
      const unpinned = updated.filter((t) => !t.pinned);
      return [...pinned, ...unpinned];
    });
  };

  const handleDragStart = (e: React.DragEvent, tabId: string) => {
    setDraggedTabId(tabId);
    e.dataTransfer.setData('text/plain', tabId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropTab = (targetTabId: string) => {
    if (!draggedTabId || draggedTabId === targetTabId) return;

    setOpenTabs((prev) => {
      const fromIdx = prev.findIndex((t) => t.id === draggedTabId);
      const toIdx = prev.findIndex((t) => t.id === targetTabId);
      if (fromIdx === -1 || toIdx === -1) return prev;

      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);

      const pinned = copy.filter((t) => t.pinned);
      const unpinned = copy.filter((t) => !t.pinned);
      return [...pinned, ...unpinned];
    });
    setDraggedTabId(null);
  };

  const handleCloseOtherTabs = (keepTabId?: string) => {
    const targetId = keepTabId || activeMeta.id;
    setOpenTabs((prev) => {
      const activeTab = prev.find((t) => t.id === targetId);
      const pinned = prev.filter((t) => t.pinned);
      if (activeTab && !pinned.some((p) => p.id === activeTab.id)) {
        return [...pinned, activeTab];
      }
      return pinned.length > 0 ? pinned : (activeTab ? [activeTab] : [prev[0]]);
    });
    setIsNewTabMenuOpen(false);
    setIsMoreTabsOpen(false);
    setTabContextMenu(null);
  };

  const handleResetDefaultTabs = () => {
    setOpenTabs(DEFAULT_OPEN_TABS);
    setIsNewTabMenuOpen(false);
  };

  // Global Tab Navigation Shortcuts: Ctrl+W, Ctrl+Tab, Ctrl+Shift+T
  useEffect(() => {
    const handleTabKeyShortcuts = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag) || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      // Ctrl+W or Cmd+W: Close active tab
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'w') {
        const activeTab = openTabs.find((t) => t.id === activeMeta.id);
        if (activeTab && !activeTab.pinned && openTabs.length > 1) {
          e.preventDefault();
          handleCloseTab(e, activeTab.id);
        }
        return;
      }

      // Ctrl+Tab / Ctrl+Shift+Tab: Cycle tabs
      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        const activeIdx = openTabs.findIndex((t) => t.id === activeMeta.id);
        if (activeIdx !== -1 && openTabs.length > 1) {
          const delta = e.shiftKey ? -1 : 1;
          const nextIdx = (activeIdx + delta + openTabs.length) % openTabs.length;
          const target = openTabs[nextIdx];
          if (target) navigate(target.currentPath);
        }
        return;
      }

      // Ctrl+Shift+T or Cmd+Shift+T: Reopen last closed tab
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        reopenLastClosedTab();
        return;
      }
    };

    window.addEventListener('keydown', handleTabKeyShortcuts);
    return () => window.removeEventListener('keydown', handleTabKeyShortcuts);
  }, [openTabs, activeMeta.id, navigate, reopenLastClosedTab]);

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
    <>
      <header
      id="outpost-main-header"
      className="shrink-0 w-full z-50 flex flex-col select-none"
      aria-label="Application Navigation and Workspace Tabs"
    >
      <div
        data-tauri-drag-region
        onDoubleClick={handleHeaderDoubleClick}
        className={cn(
          'h-[36px] flex items-center justify-between gap-1.5 px-2 bg-[#16261C] dark:bg-[#0E1712] border-b border-[#2B4636] dark:border-[#1F3325] text-[#F6F1E7] transition-colors duration-200',
          platform.runtime === 'tauri' && platform.os === 'mac' && 'pl-20'
        )}
      >
        {/* ===================================================================
            LEFT ZONE: GOLD LOGO SQUARE + TAURI NATIVE/IN-APP APPLICATION MENU
        =================================================================== */}
        <div className="flex items-center gap-2 shrink-0" data-tauri-drag-region="false">
          {/* Gold Logo Mark Triangle + Brand Name "Outpost" matching Start@1x1.png */}
          <Link
            to="/"
            className="flex items-center gap-1.5 group px-1 py-0.5 rounded-[4px] hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Outpost Country Living • Malawi Sanctuary Blueprint"
          >
            <div className="w-5 h-5 rounded-[4px] bg-[#C98A1B] text-[#16261C] flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-110 transition-all duration-200 shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13H4.5L12 6.5z" />
              </svg>
            </div>
            <span className="font-sans font-bold text-[13px] tracking-tight text-white group-hover:text-[#F6F1E7] transition-colors">
              Outpost
            </span>
          </Link>

          {/* Native / In-Browser Application Menu */}
          <ApplicationMenu
            onOpenShortcuts={() => window.dispatchEvent(new CustomEvent('outpost:open-shortcuts'))}
            onOpenCitations={onOpenCitations}
            onOpenSearch={onOpenSearch}
            onToggleExplorer={handleToggleDirectory}
            onToggleInspector={onToggleInspector}
            onCloseCurrentTab={() => handleCloseTab({ stopPropagation: () => {} } as React.MouseEvent, activeMeta.id)}
            onNewTab={() => setIsNewTabMenuOpen(true)}
          />
        </div>

        {/* ===================================================================
            CENTER ZONE: WORKSPACE TABS + COMPACT LAUNCHER (28px height, 6px controls)
            Hidden on mobile (< 768px) in favor of bottom tab bar
        =================================================================== */}
        <div className="hidden md:flex flex-1 items-center min-w-0 gap-1 px-1">
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <div className="flex-none shrink-0" data-tauri-drag-region="false">
              <Tooltip content="Scroll tabs left">
                <button
                  type="button"
                  onClick={() => handleScrollTabs('left')}
                  className="h-7.5 w-6 rounded-[6px] bg-[#2B4636]/60 hover:bg-[#2B4636] border border-[#2B4636] text-[#F6F1E7]/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll tabs left"
                >
                  <ChevronLeft size={13} />
                </button>
              </Tooltip>
            </div>
          )}

          {/* Scrollable Tabs Track (Flex-1 with Min-W-0) */}
          <div
            ref={tabStripRef}
            role="tablist"
            aria-label="Open Workspace Tabs"
            data-tauri-drag-region
            onDoubleClick={handleHeaderDoubleClick}
            className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar min-w-0 px-0.5 scroll-smooth"
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
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, tab.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropTab(tab.id)}
                  data-tauri-drag-region="false"
                  aria-selected={isActive}
                  onClick={() => navigate(tab.currentPath)}
                  onAuxClick={(e) => {
                    if (e.button === 1 && !tab.pinned) {
                      handleCloseTab(e, tab.id);
                    }
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTabContextMenu({ x: e.clientX, y: e.clientY, tabId: tab.id });
                  }}
                  onMouseEnter={() => prefetchRoute(tab.basePath)}
                  title={`${tab.title}${tab.pinned ? ' (Pinned)' : ''}`}
                  className={cn(
                    'group relative h-[28px] pl-2 pr-1.5 rounded-[6px] flex items-center gap-1.5 text-[12.5px] font-chrome transition-all duration-200 cursor-pointer shrink-0 max-w-[210px]',
                    isActive
                      ? 'bg-[#FFFDF8] dark:bg-[#1E3326] text-[#1F2A22] dark:text-[#FFFDF8] font-medium shadow-xs border-b-2 border-[#C98A1B]'
                      : 'text-[#F6F1E7]/75 hover:text-[#FFFDF8] hover:bg-[#2B4636]/60 dark:hover:bg-[#1E3326]/60 font-normal hover:scale-[1.01]',
                    draggedTabId === tab.id && 'opacity-50 border-dashed border-[#C98A1B]'
                  )}
                >
                  {/* Mini Symbol Badge inside Tab */}
                  <span
                    className={cn(
                      'w-4.5 h-4.5 rounded-[4px] border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105',
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

                  <span 
                    className="truncate whitespace-nowrap text-[13px] font-chrome max-w-[125px]"
                    title={tab.title}
                  >
                    {tab.title}
                  </span>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C98A1B] shrink-0 animate-pulse" />
                  )}

                  {/* Pin / Unpin button */}
                  <button
                    type="button"
                    onClick={(e) => handleTogglePinTab(e, tab.id)}
                    title={tab.pinned ? 'Unpin tab' : 'Pin tab to front'}
                    aria-label={tab.pinned ? `Unpin ${tab.title}` : `Pin ${tab.title}`}
                    className={cn(
                      'p-0.5 rounded-[4px] hover:bg-white/15 transition-opacity cursor-pointer shrink-0',
                      tab.pinned
                        ? 'text-amber-400 opacity-90 hover:opacity-100'
                        : 'opacity-0 group-hover:opacity-70 hover:opacity-100 text-stone-400'
                    )}
                  >
                    <Pin size={10} className={tab.pinned ? '-rotate-45 text-amber-400' : ''} />
                  </button>

                  {!tab.pinned && openTabs.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      title="Close Tab (Ctrl+W / Middle-Click)"
                      aria-label={`Close ${tab.title} tab`}
                      className={cn(
                        'p-0.5 rounded-[4px] hover:bg-white/15 hover:text-amber-300 transition-opacity cursor-pointer',
                        isActive
                          ? 'opacity-80 hover:opacity-100 text-stone-600 dark:text-stone-200'
                          : 'opacity-0 group-hover:opacity-100 text-stone-400'
                      )}
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Scroll Arrow (Own Flex-None Slot) */}
          {canScrollRight && (
            <div className="flex-none shrink-0" data-tauri-drag-region="false">
              <Tooltip content="Scroll tabs right">
                <button
                  type="button"
                  onClick={() => handleScrollTabs('right')}
                  className="h-7.5 w-6 rounded-[6px] bg-[#2B4636]/60 hover:bg-[#2B4636] border border-[#2B4636] text-[#F6F1E7]/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                  aria-label="Scroll tabs right"
                >
                  <ChevronRight size={13} />
                </button>
              </Tooltip>
            </div>
          )}

          {/* "Tabs N" Dropdown Button (Own Flex-None Slot) */}
          <div className="flex-none shrink-0 relative" ref={moreTabsMenuRef} data-tauri-drag-region="false">
            <Tooltip content="View all open workspace tabs">
              <button
                type="button"
                onClick={() => setIsMoreTabsOpen((prev) => !prev)}
                aria-label="More tabs"
                className={cn(
                  'h-7.5 px-2.5 rounded-[6px] flex items-center gap-1.5 border text-[13px] font-chrome font-medium transition-all duration-200 cursor-pointer active:scale-95',
                  isMoreTabsOpen
                    ? 'bg-[#C98A1B] text-[#16261C] border-[#C98A1B] font-semibold shadow-xs'
                    : 'bg-white/[0.04] hover:bg-white/[0.1] text-stone-300 hover:text-white border-white/15'
                )}
              >
                <span className="hidden sm:inline">Tabs</span>
                <span className="w-4 h-4 rounded-full bg-white/10 text-[11px] font-mono flex items-center justify-center font-bold">
                  {openTabs.length}
                </span>
                <ChevronDown size={11} className={cn("transition-transform duration-150", isMoreTabsOpen && "rotate-180")} />
              </button>
            </Tooltip>

            {/* "More tabs" Dropdown Popover */}
            <AnimatePresence>
              {isMoreTabsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-9 w-64 bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#EBF2EC] rounded-[8px] p-2 shadow-xl z-50 flex flex-col gap-1 max-h-80 overflow-y-auto custom-scrollbar font-chrome animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-2 py-1 text-[11px] font-mono uppercase text-[#5A6458] dark:text-[#8E9E92] border-b border-[#E4DCCB] dark:border-[#283C30] font-bold flex items-center justify-between">
                    <span>Open Workspace Tabs</span>
                    <span>{openTabs.length}</span>
                  </div>
                  {openTabs.map((tab) => {
                    const catalogEntry =
                      DESKTOP_MODULE_CATALOG.find((m) => m.id === tab.id) ||
                      DESKTOP_MODULE_CATALOG[0];
                    const Icon = catalogEntry.icon;
                    const isActive = activeMeta.id === tab.id;

                    return (
                      <div
                        key={`more-tab-${tab.id}`}
                        onClick={() => {
                          navigate(tab.currentPath);
                          setIsMoreTabsOpen(false);
                        }}
                        className={cn(
                          "px-2 py-1.5 rounded-[6px] flex items-center justify-between gap-2 text-[13px] transition-all duration-150 cursor-pointer border",
                          isActive
                            ? "bg-[#2B4636] dark:bg-[#1E3326] text-[#FFFDF8] border-transparent font-medium shadow-2xs"
                            : "bg-transparent hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326]/60 text-[#1F2A22] dark:text-[#EBF2EC] border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon size={12} className={isActive ? "text-[#C98A1B]" : "text-[#5A6458] dark:text-[#8E9E92]"} />
                          <span className="truncate">{tab.title}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C98A1B]" />
                          )}
                          {!tab.pinned && openTabs.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseTab(e, tab.id);
                              }}
                              className="p-1 rounded-[4px] text-stone-400 hover:text-rose-500 hover:bg-stone-200/50 dark:hover:bg-white/10 transition-colors"
                              title="Close tab"
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Actions Drawer in Tabs Dropdown */}
                  <div className="pt-1.5 mt-1 border-t border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-0.5">
                    <button
                      type="button"
                      disabled={openTabs.length <= 1}
                      onClick={() => handleCloseOtherTabs()}
                      className={cn(
                        "w-full px-2 py-1.5 rounded-[6px] text-[12px] flex items-center justify-between transition-colors",
                        openTabs.length > 1
                          ? "hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-[#1F2A22] dark:text-[#EBF2EC] cursor-pointer font-medium"
                          : "opacity-40 cursor-not-allowed text-stone-400"
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        <RotateCcw size={12} className="text-[#C98A1B]" />
                        <span>Close other tabs</span>
                      </span>
                      {openTabs.length > 1 && (
                        <span className="text-[10px] font-mono text-[#5A6458] dark:text-[#8E9E92]">
                          Keep active
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleResetDefaultTabs();
                        setIsMoreTabsOpen(false);
                      }}
                      className="w-full px-2 py-1.5 rounded-[6px] text-[12px] flex items-center gap-1.5 hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-[#5A6458] dark:text-[#8E9E92] hover:text-[#1F2A22] dark:hover:text-[#EBF2EC] transition-colors cursor-pointer"
                    >
                      <Layers size={12} className="text-[#2C4A3E] dark:text-[#88B896]" />
                      <span>Reset core tabs</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick-Launch Popover Trigger (+ Button Kept Clean) */}
          <div className="flex-none shrink-0 relative flex items-center gap-1" ref={newTabMenuRef} data-tauri-drag-region="false">
            <Tooltip content="Open Module Quick Launcher">
              <button
                type="button"
                onClick={() => setIsNewTabMenuOpen((prev) => !prev)}
                aria-label="Open Module Quick Launcher"
                className={cn(
                  'h-7.5 px-2.5 rounded-[6px] flex items-center gap-1 border text-[13px] font-chrome font-medium transition-colors cursor-pointer',
                  isNewTabMenuOpen
                    ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold'
                    : 'bg-white/[0.05] hover:bg-white/[0.12] text-amber-200 hover:text-white border-white/15'
                )}
              >
                <Plus size={13} />
                <span className="hidden 2xl:inline">Modules</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* ===================================================================
            RIGHT ZONE: 3 UNIFIED GLASS CAPSULES (ZERO REDUNDANCY, 6px CONTROLS)
        =================================================================== */}
        <div className="flex items-center gap-1.5 shrink-0" data-tauri-drag-region="false">
          {/* Search Guides Input with Accelerator Badge matching Start@1x1.png */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="h-[28px] px-2.5 rounded-[6px] bg-[#2B4636]/60 hover:bg-[#2B4636] border border-[#2B4636] flex items-center gap-2 text-[12px] text-[#F6F1E7]/80 hover:text-[#FFFDF8] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label="Search guides (Ctrl+K)"
            >
              <Search size={12} className="text-[#C98A1B] shrink-0" />
              <span className="hidden sm:inline">Search guides</span>
              <kbd className="text-[10.5px] font-mono px-1 py-0.2 rounded bg-[#16261C] border border-[#2B4636] text-[#C98A1B]">
                {formatAccelerator('Ctrl+K', platform.os)}
              </kbd>
            </button>
          )}

          {/* Theme Toggle Button (Dark / Light Mode) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-[28px] w-[28px] rounded-[6px] bg-[#2B4636]/60 hover:bg-[#2B4636] border border-[#2B4636] flex items-center justify-center text-[#F6F1E7]/80 hover:text-[#FFFDF8] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode (or click to toggle)`}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun size={13} className="text-[#C98A1B] transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon size={13} className="text-[#F6F1E7] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* User Sign-In / Profile */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2 h-[28px] rounded-[6px] bg-[#2B4636]/40 hover:bg-[#2B4636] text-[#F6F1E7] text-[12px] font-chrome cursor-pointer"
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
                  className="w-4 h-4 rounded-[4px] object-cover"
                />
                <span className="hidden xl:inline max-w-[70px] truncate">
                  {user.displayName?.split(' ')[0] || 'Steward'}
                </span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-56 rounded-[6px] p-2 flex flex-col gap-1 z-50 text-[12.5px] font-chrome text-[#1F2A22] dark:text-[#EBF2EC] bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-xl animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-2 py-1.5 border-b border-[#E4DCCB] dark:border-[#283C30] mb-0.5">
                      <p className="font-semibold text-[#1F2A22] dark:text-[#EBF2EC] truncate">
                        {user.displayName || 'Country Steward'}
                      </p>
                      <p className="text-[11px] text-[#5A6458] dark:text-[#8E9E92] truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-[#1F2A22] dark:text-[#EBF2EC] transition-colors"
                    >
                      <UserIcon size={13} className="text-[#B4531F] dark:text-[#D3672E]" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/tracker"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-[#1F2A22] dark:text-[#EBF2EC] transition-colors"
                    >
                      <CheckCircle2 size={13} className="text-[#3F6B4E] dark:text-[#4E8761]" />
                      <span>Journey Tracker</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                      }}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] hover:bg-rose-500/10 text-rose-700 dark:text-rose-400 transition-colors w-full text-left mt-0.5 border-t border-[#E4DCCB] dark:border-[#283C30] pt-1.5 cursor-pointer"
                    >
                      <LogOut size={13} className="text-rose-600 dark:text-rose-400" />
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
              className="flex items-center gap-1.5 px-2.5 h-[28px] rounded-[6px] bg-[#2B4636]/60 hover:bg-[#2B4636] text-[#F6F1E7] hover:text-[#FFFDF8] text-[12px] font-chrome transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
              title="Sign in with Google"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Native Desktop Window Controls (Right-aligned, no fake dots) */}
          <DesktopTitleBarControls />
        </div>
      </div>

      {/* Desktop Breadcrumbs under the tab strip */}
      <BreadcrumbsBar />

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
            className="absolute top-12 left-3 sm:left-36 z-50 w-[94vw] max-w-xl rounded-[10px] p-4 text-xs text-[#1F2A22] dark:text-[#EBF2EC] bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E4DCCB] dark:border-[#283C30]">
              <span className="font-mono font-bold uppercase tracking-wider text-[#B4531F] dark:text-[#D3672E] text-[11px]">
                Module Launcher
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetDefaultTabs}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#E4DCCB] dark:hover:bg-[#1E3326] border border-[#E4DCCB] dark:border-[#283C30] text-[11px] text-[#1F2A22] dark:text-[#EBF2EC] hover:text-[#B4531F] cursor-pointer transition-colors"
                >
                  <RotateCcw size={10} />
                  <span>Reset 3 Core Tabs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewTabMenuOpen(false)}
                  className="p-1 rounded-[6px] bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#E4DCCB] dark:hover:bg-[#1E3326] text-[#5A6458] dark:text-[#8E9E92] hover:text-[#1F2A22] dark:hover:text-white cursor-pointer transition-colors"
                  aria-label="Close Launcher"
                >
                  <X size={13} />
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
                    className="p-2.5 rounded-[8px] bg-[#F6F1E7]/70 dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-1.5"
                  >
                    <span className="font-mono font-bold text-[#B4531F] dark:text-[#D3672E] text-[11px] px-1">
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
                              'px-2 py-1.5 rounded-[6px] text-left flex items-center justify-between gap-2 border transition-all duration-150 cursor-pointer group',
                              isCurrent
                                ? 'bg-[#2B4636] text-[#FFFDF8] border-transparent font-medium shadow-2xs'
                                : 'bg-[#FFFDF8] dark:bg-[#17241C] hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-[#1F2A22] dark:text-[#EBF2EC] border-[#E4DCCB]/60 dark:border-[#283C30] hover:translate-x-0.5'
                            )}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span
                                className={cn(
                                  'w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110',
                                  mod.badgeBg
                                )}
                              >
                                <ModIcon size={11} className={mod.accentClass} />
                              </span>
                              <span className="truncate text-xs">{mod.title}</span>
                            </span>
                            {mod.shortcut && (
                              <kbd className="text-[10px] font-mono px-1 rounded bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#5A6458] dark:text-[#8E9E92] shrink-0">
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

      {/* Tab Context Menu */}
      {tabContextMenu && (
        <div
          style={{
            top: Math.min(tabContextMenu.y, typeof window !== 'undefined' ? window.innerHeight - 150 : 200),
            left: Math.min(tabContextMenu.x, typeof window !== 'undefined' ? window.innerWidth - 200 : 200),
          }}
          className="fixed z-[100] min-w-44 bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-1.5 shadow-xl text-xs text-[#1F2A22] dark:text-[#EBF2EC] flex flex-col gap-0.5 animate-in fade-in duration-100 font-chrome"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              handleCloseTab(null, tabContextMenu.tabId);
              setTabContextMenu(null);
            }}
            disabled={openTabs.length <= 1}
            className={cn(
              "w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer",
              openTabs.length > 1
                ? "hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-stone-700 dark:text-stone-200"
                : "opacity-40 cursor-not-allowed text-stone-400"
            )}
          >
            <span>Close tab</span>
            <kbd className="font-mono text-[10px] text-stone-400">Ctrl+W</kbd>
          </button>
          <button
            type="button"
            onClick={() => handleCloseOtherTabs(tabContextMenu.tabId)}
            disabled={openTabs.length <= 1}
            className={cn(
              "w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer",
              openTabs.length > 1
                ? "hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-stone-700 dark:text-stone-200 font-medium"
                : "opacity-40 cursor-not-allowed text-stone-400"
            )}
          >
            <span>Close other tabs</span>
            <RotateCcw size={11} className="text-[#C98A1B]" />
          </button>
          <div className="my-1 border-t border-[#E4DCCB] dark:border-[#283C30]" />
          <button
            type="button"
            onClick={() => {
              handleTogglePinTab(null, tabContextMenu.tabId);
              setTabContextMenu(null);
            }}
            className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left hover:bg-[#F6F1E7] dark:hover:bg-[#1E3326] text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
          >
            <span>{openTabs.find((t) => t.id === tabContextMenu.tabId)?.pinned ? 'Unpin tab' : 'Pin tab'}</span>
            <Pin size={11} className="text-amber-400" />
          </button>
        </div>
      )}
    </header>

    {/* ===================================================================
        MOBILE BOTTOM TAB BAR (< 768px): Home · Map · Plan · Learn · More
        Strictly >= 44px touch targets, sentence-case, active indicator
    =================================================================== */}
    <nav
      aria-label="Mobile Bottom Navigation"
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-1 border-t backdrop-blur-xl flex items-center justify-around shadow-overlay select-none transition-colors",
        isField
          ? "bg-black text-white border-white"
          : isLight
          ? "bg-[#FAF6F0]/95 text-[#1A1612] border-[#E3D8CC]"
          : "bg-[#071A10]/95 text-[#FEF3C7] border-amber-500/20"
      )}
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      {[
        { id: 'home', label: 'Home', path: '/', icon: HomeIcon },
        { id: 'map', label: 'Map', path: '/map', icon: Compass },
        { id: 'plan', label: 'Plan', path: '/blueprints', icon: Calendar },
        { id: 'learn', label: 'Learn', path: '/skills', icon: BookOpen },
        { id: 'more', label: 'More', path: '#more', icon: PanelLeft, isAction: true },
      ].map((item) => {
        const Icon = item.icon;
        const isActive =
          item.id === 'home'
            ? location.pathname === '/'
            : item.isAction
            ? isDrawerOpen
            : location.pathname.startsWith(item.path);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.isAction) {
                handleToggleDirectory();
              } else {
                navigate(item.path);
              }
            }}
            className={cn(
              "min-h-[48px] min-w-[56px] px-2 py-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative",
              isActive
                ? isField
                  ? "text-amber-400 font-bold"
                  : isLight
                  ? "text-[#C85A32] font-semibold"
                  : "text-amber-300 font-bold"
                : isField
                ? "text-white/70 hover:text-white"
                : isLight
                ? "text-[#6E6255] hover:text-[#1A1612]"
                : "text-stone-300/80 hover:text-white"
            )}
          >
            <Icon size={18} className="shrink-0" />
            <span className="text-[12px] font-medium leading-none tracking-normal">
              {item.label}
            </span>
            {isActive && (
              <span
                className={cn(
                  "absolute bottom-0.5 w-6 h-0.5 rounded-full",
                  isField ? "bg-amber-400" : isLight ? "bg-[#C85A32]" : "bg-amber-400"
                )}
              />
            )}
          </button>
        );
      })}
    </nav>
    </>
  );
}

export default Navigation;
