import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Compass,
  Calculator,
  Sprout,
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  X,
  Search,
  MapPin,
  Feather,
  Layers,
  Sun,
  Hammer,
  Home as HomeIcon,
  FolderTree,
  Settings,
  HeartPulse,
  UtensilsCrossed,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { useTheme } from '@/contexts/ThemeContext';

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
  subAction?: {
    label: string;
    path: string;
  };
}

const DIRECTORY_CATEGORIES = [
  '01 · Sanctuary & Prophecy',
  '02 · Land, Water & Agronomy',
  '03 · Sanitarium & Kitchen',
  '04 · Engineering & Outposts',
] as const;

export const DIRECTORY_ITEMS: DirectoryItem[] = [
  // 01 · Sanctuary & Prophecy
  {
    id: 'devotional',
    name: 'Daily Scripture & Devotional',
    shortName: 'Daily Devotional',
    category: '01 · Sanctuary & Prophecy',
    path: '/devotional',
    icon: Feather,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Daily Spirit of Prophecy readings, KJV Scripture, and personal reflection journal.',
    badge: 'Manna',
  },
  {
    id: 'vision',
    name: 'Spirit of Prophecy Archive',
    shortName: 'EGW Archive',
    category: '01 · Sanctuary & Prophecy',
    path: '/vision',
    icon: BookOpen,
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconBg: 'bg-emerald-500/15 border-emerald-400/35',
    description: 'Archival Ellen G. White counsels on rural living, family sanctuaries, and country education.',
  },
  {
    id: 'tracker',
    name: 'Transition Readiness Tracker',
    shortName: 'Transition Tracker',
    category: '01 · Sanctuary & Prophecy',
    path: '/tracker',
    icon: CheckCircle2,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Equier-guided Kanban board with 15 sequential milestones and weighted readiness scoring.',
    badge: 'Kanban',
  },

  // 02 · Land, Water & Agronomy
  {
    id: 'scout-map',
    name: 'District GIS & Hydrogeology Map',
    shortName: 'GIS District Map',
    category: '02 · Land, Water & Agronomy',
    path: '/scout-map',
    icon: Compass,
    iconColor: 'text-cyan-600 dark:text-cyan-300',
    iconBg: 'bg-cyan-500/15 border-cyan-400/35',
    description: '28-district GIS map with aquifer depths, borehole profiles, and agro-ecological zones.',
    badge: 'GIS',
  },
  {
    id: 'where',
    name: 'Land Tenure & Property Evaluation',
    shortName: 'Land & Evaluation',
    category: '02 · Land, Water & Agronomy',
    path: '/where',
    icon: MapPin,
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconBg: 'bg-emerald-500/15 border-emerald-400/35',
    description: 'Customary Land Act compliance, community protocols, and weighted plot evaluation.',
    subAction: {
      label: 'Plot Evaluator',
      path: '/where?tab=evaluator',
    },
  },
  {
    id: 'what',
    name: 'Agronomy, Soil Profiles & Crops',
    shortName: 'Agronomy & Soils',
    category: '02 · Land, Water & Agronomy',
    path: '/what',
    icon: Sprout,
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconBg: 'bg-emerald-500/15 border-emerald-400/35',
    description: 'Soil classification swatches, ridge cultivation standards, and companion guilds.',
  },
  {
    id: 'agriculture',
    name: 'Bio-Intensive Farming Manual',
    shortName: 'Edenic Farming',
    category: '02 · Land, Water & Agronomy',
    path: '/agriculture',
    icon: Sun,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Thermal hot composting, 3×3×3ft deep tree planting pits, and ecological pest stewardship.',
  },
  {
    id: 'seasons',
    name: 'Seasonal Planting & Weather Almanac',
    shortName: 'Seasonal Almanac',
    category: '02 · Land, Water & Agronomy',
    path: '/seasons',
    icon: Calendar,
    iconColor: 'text-lime-600 dark:text-lime-300',
    iconBg: 'bg-lime-500/15 border-lime-400/35',
    description: 'Malawi planting and harvest calendars for Dzinja, Masika, and Chilimwe cycles.',
  },

  // 03 · Sanitarium & Kitchen
  {
    id: 'sanitarium',
    name: 'Sanitarium & Lifestyle Medicine',
    shortName: 'Sanitarium & Health',
    category: '03 · Sanitarium & Kitchen',
    path: '/sanitarium',
    icon: HeartPulse,
    iconColor: 'text-rose-600 dark:text-rose-300',
    iconBg: 'bg-rose-500/15 border-rose-400/35',
    description: 'Hydrotherapy fomentations, charcoal poultices, and the 8 NEWSTART health principles.',
    badge: 'NEWSTART',
  },
  {
    id: 'kitchen',
    name: 'Country Kitchen & Food Preservation',
    shortName: 'Country Kitchen',
    category: '03 · Sanitarium & Kitchen',
    path: '/kitchen',
    icon: UtensilsCrossed,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Unfermented whole-grain baking, seed-protein sinjiro emulsions, and solar dehydrating.',
  },

  // 04 · Engineering & Outposts
  {
    id: 'calculators',
    name: 'Homestead Engineering Calculators',
    shortName: 'Calculators & BoQ',
    category: '04 · Engineering & Outposts',
    path: '/calculators',
    icon: Calculator,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Off-grid solar sizing, rainwater storage volumes, and infrastructure budgets.',
    badge: 'Calculators',
  },
  {
    id: 'how',
    name: 'Build Schematics & Blueprints',
    shortName: 'Build Schematics',
    category: '04 · Engineering & Outposts',
    path: '/how',
    icon: Hammer,
    iconColor: 'text-sky-600 dark:text-sky-300',
    iconBg: 'bg-sky-500/15 border-sky-400/35',
    description: 'Vector schematics for planting pits, A-frame levelers, and gravity-fed water cisterns.',
  },
  {
    id: 'skills',
    name: 'Self-Reliance Country Skills',
    shortName: 'Country Skills',
    category: '04 · Engineering & Outposts',
    path: '/skills',
    icon: Layers,
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconBg: 'bg-emerald-500/15 border-emerald-400/35',
    description: 'Step-by-step guides for ram pumps, natural building, and on-farm fabrication.',
  },
  {
    id: 'blueprints',
    name: 'Outpost Campus Architecture',
    shortName: 'Outpost Blueprints',
    category: '04 · Engineering & Outposts',
    path: '/blueprints',
    icon: Building2,
    iconColor: 'text-amber-600 dark:text-amber-300',
    iconBg: 'bg-amber-500/15 border-amber-400/35',
    description: 'Zoning models for rural lifestyle training centers, clinics, and family sanctuaries.',
  },
  {
    id: 'community',
    name: 'Homestead Steward Registry',
    shortName: 'Steward Registry',
    category: '04 · Engineering & Outposts',
    path: '/community',
    icon: Users,
    iconColor: 'text-teal-600 dark:text-teal-300',
    iconBg: 'bg-teal-500/15 border-teal-400/35',
    description: 'Directory of country stewards, regional mentors, and heirloom seed stewards in Malawi.',
  },
];

type SymbolGlyphId = 'sanctuary' | 'gis' | 'agronomy' | 'sanitarium' | 'engineering' | 'exodus';

interface DockSymbolMeta {
  id: SymbolGlyphId;
  title: string;
  subtitle: string;
  shortcut: string;
  primaryPath: string;
  matchPrefixes: string[];
  accentRing: string;
}

const MASTER_DOCK_SYMBOLS: DockSymbolMeta[] = [
  {
    id: 'sanctuary',
    title: 'Sanctuary & Vision',
    subtitle: 'Command center, Daily Manna & 1844 chart',
    shortcut: 'Alt+1',
    primaryPath: '/',
    matchPrefixes: ['/devotional', '/vision'],
    accentRing: 'from-amber-400/30 to-amber-600/10',
  },
  {
    id: 'gis',
    title: 'GIS & Land Scout',
    subtitle: '28-District aquifers, Land Act & 100-pt rubric',
    shortcut: 'Alt+2',
    primaryPath: '/scout-map',
    matchPrefixes: ['/scout', '/scout-map', '/map', '/regions', '/where', '/suitability', '/property-evaluator'],
    accentRing: 'from-cyan-400/30 to-sky-600/10',
  },
  {
    id: 'agronomy',
    title: 'Edenic Agronomy',
    subtitle: 'Katondo clay, 75cm ridges, 3×3ft pits & almanac',
    shortcut: 'Alt+4',
    primaryPath: '/what',
    matchPrefixes: ['/what', '/agriculture', '/edenic-farming', '/seasons', '/almanac'],
    accentRing: 'from-emerald-400/30 to-teal-600/10',
  },
  {
    id: 'sanitarium',
    title: 'Sanitarium & Kitchen',
    subtitle: 'NEWSTART hydrotherapy, charcoal & country bread',
    shortcut: 'Alt+S',
    primaryPath: '/sanitarium',
    matchPrefixes: ['/sanitarium', '/kitchen'],
    accentRing: 'from-rose-400/30 to-amber-500/10',
  },
  {
    id: 'engineering',
    title: 'Engineering & Skills',
    subtitle: 'Solar/cistern BoQ, schematics & 25 country skills',
    shortcut: 'Alt+5',
    primaryPath: '/calculators',
    matchPrefixes: ['/calculators', '/how', '/skills', '/blueprints'],
    accentRing: 'from-sky-400/30 to-amber-500/10',
  },
  {
    id: 'exodus',
    title: 'Exodus Readiness',
    subtitle: '15-milestone relocation ledger & believer network',
    shortcut: 'Alt+T',
    primaryPath: '/tracker',
    matchPrefixes: ['/tracker', '/community', '/directory'],
    accentRing: 'from-amber-400/30 to-emerald-500/10',
  },
];

/**
 * Custom Dual-Tone Engraved SVG Medallions for the Left Activity Bar.
 * Combines warm Sanctuary Gold (#FBBF24) with Luminous Emerald/Sapphire accents.
 */
function CustomSymbolGlyph({ id, isActive }: { id: SymbolGlyphId; isActive: boolean }) {
  const primaryStroke = isActive ? '#FDE68A' : '#E7E5E4';
  const accentStroke = isActive ? '#34D399' : '#FBBF24';

  switch (id) {
    case 'sanctuary':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Dawn Sun Halo */}
          <circle
            cx="12"
            cy="8"
            r="3.2"
            fill={isActive ? 'rgba(251,191,36,0.28)' : 'rgba(251,191,36,0.12)'}
            stroke={accentStroke}
            strokeWidth="1.5"
          />
          {/* Sun Rays */}
          <path
            d="M12 2.5V3.8M6.8 4.8L7.8 5.8M17.2 4.8L16.2 5.8"
            stroke="#FBBF24"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Twin Highland Sanctuary Peaks */}
          <path
            d="M3.5 19.5L8.8 11.5L13.2 17.5M10.5 19.5L15.4 12.2L20.5 19.5"
            stroke={primaryStroke}
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Base Covenant Horizon */}
          <path
            d="M3 19.5H21"
            stroke={accentStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'gis':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Outer Surveyor Compass Ring */}
          <circle
            cx="12"
            cy="12"
            r="8.5"
            stroke={primaryStroke}
            strokeWidth="1.5"
            strokeDasharray="3 1.5"
          />
          {/* 4-Point Precision Compass Rose */}
          <polygon
            points="12,4.5 14.3,9.7 19.5,12 14.3,14.3 12,19.5 9.7,14.3 4.5,12 9.7,9.7"
            fill={isActive ? 'rgba(56,189,248,0.25)' : 'rgba(56,189,248,0.1)'}
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.8" fill="#FBBF24" />
        </svg>
      );

    case 'agronomy':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Terraced Contour Ridges */}
          <path
            d="M3.5 19.5C6.5 17.5 10 17.5 12 19.5C14 17.5 17.5 17.5 20.5 19.5"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Living Stem */}
          <path
            d="M12 19V7.5"
            stroke={primaryStroke}
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          {/* Twin Edenic Leaves */}
          <path
            d="M12 13.5C8 13.5 5.5 10.5 6 6.5C10 6.5 12 9.5 12 13.5Z"
            fill={isActive ? 'rgba(52,211,153,0.3)' : 'rgba(52,211,153,0.14)'}
            stroke="#34D399"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.5C15.8 11.5 18.2 8.8 17.8 5C14 5 12 7.8 12 11.5Z"
            fill={isActive ? 'rgba(251,191,36,0.26)' : 'rgba(251,191,36,0.1)'}
            stroke={primaryStroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'sanitarium':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Apothecary Shield / Chalice Bowl */}
          <path
            d="M5 11.5C5 15.8 8.1 19.2 12 20.5C15.9 19.2 19 15.8 19 11.5V6.2L12 3.8L5 6.2V11.5Z"
            fill={isActive ? 'rgba(251,113,133,0.22)' : 'rgba(251,113,133,0.08)'}
            stroke={primaryStroke}
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          {/* Medical Missionary Cross + Pulse */}
          <path
            d="M12 8.5V15.5M8.5 12H15.5"
            stroke="#FB7185"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.3" fill="#FBBF24" />
        </svg>
      );

    case 'engineering':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Architect's Drafting Compass & Set Square */}
          <circle cx="12" cy="5.5" r="2" stroke="#FBBF24" strokeWidth="1.5" />
          <path
            d="M10.8 7.2L5.5 19.5M13.2 7.2L18.5 19.5"
            stroke={primaryStroke}
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          {/* Precision Calibration Arc */}
          <path
            d="M7 14.5C9.2 16 14.8 16 17 14.5"
            stroke="#38BDF8"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
          <path d="M12 9.5V16.5" stroke="#FBBF24" strokeWidth="1.3" strokeDasharray="2 1.5" />
        </svg>
      );

    case 'exodus':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 overflow-visible" fill="none">
          {/* Hexagonal Covenant Milestone Seal */}
          <polygon
            points="12,3.2 19.6,7.6 19.6,16.4 12,20.8 4.4,16.4 4.4,7.6"
            fill={isActive ? 'rgba(251,191,36,0.24)' : 'rgba(16,185,129,0.1)'}
            stroke={accentStroke}
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          {/* Readiness Checkmark */}
          <path
            d="M8.5 12.3L10.9 14.7L15.8 9.5"
            stroke={primaryStroke}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function LeftSymbolDirectory() {
  const { palette } = useTheme();
  const isSapphire = palette === 'sapphire' || palette === 'midnight';
  const isCharcoal = palette === 'charcoal';

  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_directory_pinned_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  // Sync state with header toggle
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
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.shortName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const isSymbolActive = (sym: DockSymbolMeta) => {
    if (sym.primaryPath === '/' && location.pathname === '/') return true;
    return sym.matchPrefixes.some((p) => location.pathname.startsWith(p));
  };

  const toggleGroupCollapse = (cat: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <>
      {/* ==================================================================
          1. SCULPTED 3D MEDALLION SYMBOL BAR (LEFT WORKSTATION DOCK)
      ================================================================== */}
      <aside
        aria-label="Workstation Symbol Dock"
        className={cn(
          'hidden md:flex flex-col items-center justify-between w-14 shrink-0 h-full bg-gradient-to-b border-r py-2.5 select-none z-30 relative shadow-[6px_0_28px_rgba(2,8,23,0.45)]',
          isCharcoal
            ? 'from-[#141416] via-[#18181B] to-[#111113] border-white/10'
            : isSapphire
            ? 'from-[#030E1D] via-[#06182E] to-[#030C18] border-sky-400/20'
            : 'from-[#031009] via-[#071E12] to-[#030D07] border-emerald-500/20'
        )}
      >
        {/* Top 6 Master Medallion Symbols */}
        <div className="flex flex-col items-center gap-2 w-full px-1.5">
          {MASTER_DOCK_SYMBOLS.map((sym) => {
            const active = isSymbolActive(sym);

            return (
              <div key={sym.id} className="relative group flex items-center justify-center w-full">
                {/* Active Luminous Gold Spine Indicator */}
                {active && (
                  <span className="absolute left-0 w-1 h-6 rounded-r-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_10px_#fbbf24]" />
                )}

                <button
                  type="button"
                  onClick={() => navigate(sym.primaryPath)}
                  onMouseEnter={() => prefetchRoute(sym.primaryPath)}
                  aria-label={`${sym.title} (${sym.shortcut})`}
                  className={cn(
                    'relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer border',
                    active
                      ? isSapphire
                        ? 'bg-gradient-to-b from-sky-500/35 via-blue-900/65 to-slate-950/90 border-sky-400/60 shadow-[0_6px_16px_rgba(14,165,233,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.03]'
                        : 'bg-gradient-to-b from-emerald-500/35 via-emerald-950/75 to-stone-950/90 border-emerald-400/60 shadow-[0_6px_16px_rgba(16,185,129,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.03]'
                      : 'bg-white/[0.03] hover:bg-white/[0.09] border-white/10 hover:border-amber-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:scale-[1.04]'
                  )}
                >
                  {/* Ambient Backlight Aura inside Medallion */}
                  <span
                    className={cn(
                      'absolute inset-1 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
                      sym.accentRing,
                      active && 'opacity-90'
                    )}
                  />
                  <CustomSymbolGlyph id={sym.id} isActive={active} />
                </button>

                {/* Instant 3D Glassmorphic Floating Hover Badge */}
                <div
                  role="tooltip"
                  className={cn(
                    'pointer-events-none fixed left-16 z-50 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 px-3 py-2 rounded-xl border shadow-2xl backdrop-blur-2xl min-w-[210px]',
                    isSapphire
                      ? 'bg-[#041224]/96 border-sky-400/40 text-sky-50'
                      : 'bg-[#04140B]/96 border-emerald-400/40 text-emerald-50'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-xs text-white tracking-tight">
                      {sym.title}
                    </span>
                    <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {sym.shortcut}
                    </kbd>
                  </div>
                  <p className="text-[11px] text-stone-300/85 mt-0.5 leading-snug">
                    {sym.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom System Symbol: Directory Drawer Toggle (⌘B) */}
        <div className="pt-2.5 border-t border-white/12 w-full flex flex-col items-center gap-2 px-1.5">
          <div className="relative group flex items-center justify-center w-full">
            <button
              type="button"
              onClick={toggleExplorer}
              aria-label="Toggle Field Manual Directory (⌘B)"
              className={cn(
                'w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer border',
                isExplorerOpen
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-inner'
                  : 'bg-white/[0.04] hover:bg-white/[0.1] text-stone-200 hover:text-amber-300 border-white/15'
              )}
            >
              {isExplorerOpen ? <ChevronLeft size={17} /> : <FolderTree size={17} />}
            </button>
            <div
              role="tooltip"
              className={cn(
                'pointer-events-none fixed left-16 z-50 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 px-3 py-2 rounded-xl border shadow-2xl backdrop-blur-2xl min-w-[200px]',
                isSapphire
                  ? 'bg-[#041224]/96 border-sky-400/40 text-sky-50'
                  : 'bg-[#04140B]/96 border-emerald-400/40 text-emerald-50'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-white">
                  {isExplorerOpen ? 'Collapse Directory' : 'Field Manual Directory'}
                </span>
                <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  ⌘B
                </kbd>
              </div>
              <p className="text-[11px] text-stone-300/85 mt-0.5">
                Browse 16 field manual modules &amp; tools
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ==================================================================
          2. STREAMLINED WORKSPACE EXPLORER DRAWER (ZERO FILTER-PILL BLOAT)
      ================================================================== */}
      <AnimatePresence initial={false}>
        {isExplorerOpen && (
          <>
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
              className={cn(
                'fixed md:static top-0 bottom-0 left-0 z-50 md:z-20 w-[272px] shrink-0 h-full backdrop-blur-2xl border-r flex flex-col overflow-hidden select-none shadow-2xl md:shadow-[8px_0_30px_rgba(2,8,23,0.2)]',
                isCharcoal
                  ? 'bg-[#F4F4F6]/96 dark:bg-[#161619]/96 border-stone-300/80 dark:border-white/10'
                  : isSapphire
                  ? 'bg-[#F2F7FC]/95 dark:bg-[#051428]/95 border-sky-200/90 dark:border-sky-400/20'
                  : 'bg-[#F8F5EE]/95 dark:bg-[#06180F]/95 border-stone-200/90 dark:border-emerald-500/20'
              )}
            >
              {/* Compact Drawer Header + Instant Search Input */}
              <div
                className={cn(
                  'p-2.5 border-b flex flex-col gap-2 shrink-0',
                  isCharcoal
                    ? 'bg-stone-200/70 dark:bg-[#121215] border-stone-300/80 dark:border-white/10'
                    : isSapphire
                    ? 'bg-sky-50/70 dark:bg-[#041122] border-sky-200/80 dark:border-sky-400/20'
                    : 'bg-stone-100/80 dark:bg-[#04130B] border-stone-200/80 dark:border-emerald-500/20'
                )}
              >
                <div className="flex items-center justify-between px-0.5">
                  <span
                    className={cn(
                      'text-[11px] font-mono font-bold uppercase tracking-wider',
                      isSapphire
                        ? 'text-sky-900 dark:text-amber-300'
                        : 'text-emerald-950 dark:text-amber-300'
                    )}
                  >
                    Outpost Suite Explorer
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsExplorerOpen(false)}
                    title="Collapse Directory (⌘B)"
                    className="p-1 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="relative">
                  <Search
                    size={13}
                    className={cn(
                      'absolute left-2.5 top-1/2 -translate-y-1/2',
                      isSapphire ? 'text-sky-500/80' : 'text-emerald-600/80'
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Filter modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      'w-full pl-7 pr-6 py-1.5 rounded-xl bg-white border text-xs text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 shadow-inner',
                      isSapphire
                        ? 'dark:bg-[#030D1C] border-sky-200/90 dark:border-sky-800/70 focus:ring-sky-500'
                        : 'dark:bg-[#041009] border-stone-200/90 dark:border-emerald-800/70 focus:ring-emerald-500'
                    )}
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
              </div>

              {/* Collapsible 4-Suite Tree */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-2.5">
                {/* Sanctuary Command Center Root */}
                <Link
                  to="/"
                  className={cn(
                    'px-2.5 py-2 rounded-xl flex items-center justify-between gap-2 text-xs font-semibold transition-all border',
                    location.pathname === '/'
                      ? isSapphire
                        ? 'bg-gradient-to-r from-sky-700 to-blue-800 text-white border-sky-400/50 shadow-sm'
                        : 'bg-gradient-to-r from-emerald-800 to-emerald-950 text-white border-emerald-400/50 shadow-sm'
                      : 'bg-white/75 dark:bg-white/[0.04] border-stone-200/80 dark:border-white/10 text-stone-800 dark:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-white/10'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <HomeIcon size={13} className="text-amber-500 dark:text-amber-300" />
                    </span>
                    <span className="truncate">Sanctuary Command Center</span>
                  </span>
                  <ChevronRight size={12} className="opacity-60 shrink-0" />
                </Link>

                {DIRECTORY_CATEGORIES.map((category) => {
                  const items = filteredItems.filter((i) => i.category === category);
                  if (items.length === 0) return null;
                  const isCollapsed = !!collapsedGroups[category] && !searchQuery.trim();

                  return (
                    <div key={category} className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => toggleGroupCollapse(category)}
                        className={cn(
                          'px-2 py-1 rounded-lg flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer',
                          isSapphire
                            ? 'text-sky-800 dark:text-sky-300/90'
                            : 'text-emerald-800 dark:text-emerald-300/90'
                        )}
                      >
                        <span className="truncate">{category}</span>
                        <ChevronDown
                          size={12}
                          className={cn(
                            'transition-transform duration-150 opacity-70',
                            isCollapsed && '-rotate-90'
                          )}
                        />
                      </button>

                      {!isCollapsed &&
                        items.map((item) => {
                          const Icon = item.icon;
                          const isActive =
                            location.pathname === item.path ||
                            (item.path !== '/' && location.pathname.startsWith(item.path)) ||
                            (item.id === 'where' &&
                              ['/suitability', '/property-evaluator'].some((p) =>
                                location.pathname.startsWith(p)
                              ));

                          return (
                            <div key={item.id} className="flex flex-col gap-0.5">
                              <Link
                                to={item.path}
                                onMouseEnter={() => prefetchRoute(item.path)}
                                className={cn(
                                  'group px-2 py-1.5 rounded-xl flex items-center justify-between gap-2 text-xs transition-all border',
                                  isActive
                                    ? isSapphire
                                      ? 'bg-gradient-to-r from-sky-700 to-blue-800 text-white font-semibold border-sky-400/50 shadow-sm'
                                      : 'bg-gradient-to-r from-emerald-800 to-emerald-950 text-white font-semibold border-emerald-400/50 shadow-sm'
                                    : 'border-transparent text-stone-700 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-white/[0.06] hover:border-stone-300/70 dark:hover:border-white/15'
                                )}
                                title={item.description}
                              >
                                <span className="flex items-center gap-2 min-w-0">
                                  <span
                                    className={cn(
                                      'w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105',
                                      isActive
                                        ? 'bg-black/25 border-amber-300/40'
                                        : item.iconBg
                                    )}
                                  >
                                    <Icon
                                      size={13}
                                      className={cn(
                                        'shrink-0',
                                        isActive ? 'text-amber-300' : item.iconColor
                                      )}
                                    />
                                  </span>
                                  <span className="truncate">{item.shortName}</span>
                                </span>

                                <div className="flex items-center gap-1 shrink-0">
                                  {item.subAction ? (
                                    <span
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigate(item.subAction!.path);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          navigate(item.subAction!.path);
                                        }
                                      }}
                                      className={cn(
                                        'text-[10px] font-mono px-1.5 py-0.5 rounded-md border transition-colors cursor-pointer',
                                        isActive
                                          ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                                          : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border-amber-400/30'
                                      )}
                                      title="Jump straight to the Property Evaluator"
                                    >
                                      {item.subAction.label}
                                    </span>
                                  ) : item.badge ? (
                                    <span
                                      className={cn(
                                        'text-[10px] font-mono px-1.5 py-0.5 rounded-md border',
                                        isActive
                                          ? 'bg-black/25 text-amber-200 border-amber-300/40'
                                          : isSapphire
                                          ? 'bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                                          : 'bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                      )}
                                    >
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </div>
                              </Link>
                            </div>
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
