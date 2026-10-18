import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  CheckCircle2,
  MapPin,
  Droplets,
  Hammer,
  Sprout,
  HeartPulse,
  BookOpen,
  Users,
  Calculator,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  Layers,
  Calendar,
  Compass,
  Feather,
  Building2,
  UtensilsCrossed,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { Tooltip } from '../common/Tooltip';

export interface ReferenceSidebarItem {
  id: string;
  name: string;
  path: string;
  matchPrefixes: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  subItems?: { label: string; path: string }[];
}

export const REFERENCE_SIDEBAR_ITEMS: ReferenceSidebarItem[] = [
  {
    id: 'start',
    name: 'Start',
    path: '/',
    matchPrefixes: ['/'],
    icon: Home,
  },
  {
    id: 'journey',
    name: 'Journey',
    path: '/tracker',
    matchPrefixes: ['/tracker', '/journey', '/readiness'],
    icon: CheckCircle2,
    subItems: [
      { label: 'Transition Ledger', path: '/tracker' },
      { label: 'Sanctuary Milestones', path: '/tracker?view=milestones' },
    ],
  },
  {
    id: 'land',
    name: 'Land',
    path: '/where',
    matchPrefixes: ['/where', '/land', '/plot'],
    icon: MapPin,
    subItems: [
      { label: 'Land Evaluation', path: '/where' },
      { label: 'Tenure & Customary Law', path: '/where?tab=tenure' },
    ],
  },
  {
    id: 'water',
    name: 'Water',
    path: '/scout-map',
    matchPrefixes: ['/scout-map', '/scout', '/water', '/map'],
    icon: Droplets,
    subItems: [
      { label: 'District Water & Aquifers', path: '/scout-map' },
      { label: 'Rainwater Harvesting', path: '/skills/ram-pump' },
    ],
  },
  {
    id: 'shelter',
    name: 'Shelter',
    path: '/how',
    matchPrefixes: ['/how', '/shelter', '/build', '/blueprints'],
    icon: Hammer,
    subItems: [
      { label: 'Build Blueprints', path: '/how' },
      { label: 'Natural Homestead Building', path: '/skills' },
    ],
  },
  {
    id: 'food',
    name: 'Food',
    path: '/what',
    matchPrefixes: ['/what', '/agriculture', '/seasons', '/food', '/kitchen'],
    icon: Sprout,
    subItems: [
      { label: 'Agronomy & Soils', path: '/what' },
      { label: 'Bio-Intensive Farming', path: '/agriculture' },
      { label: 'Seasonal Planting Almanac', path: '/seasons' },
      { label: 'Country Kitchen', path: '/kitchen' },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    path: '/sanitarium',
    matchPrefixes: ['/sanitarium', '/health'],
    icon: HeartPulse,
    subItems: [
      { label: 'Sanitarium & Lifestyle', path: '/sanitarium' },
      { label: 'Hydrotherapy & Fomentations', path: '/sanitarium?tab=hydrotherapy' },
      { label: '8 Health Laws', path: '/sanitarium?tab=principles' },
    ],
  },
  {
    id: 'family',
    name: 'Family and school',
    path: '/vision',
    matchPrefixes: ['/vision', '/education', '/family', '/devotional'],
    icon: BookOpen,
    subItems: [
      { label: 'Spirit of Prophecy Archive', path: '/vision' },
      { label: 'Daily Devotional & Reflection', path: '/devotional' },
      { label: 'Country Education & Manual Labor', path: '/vision?tab=education' },
    ],
  },
  {
    id: 'community',
    name: 'Community',
    path: '/community',
    matchPrefixes: ['/community', '/stewards'],
    icon: Users,
    subItems: [
      { label: 'Steward Registry & Outposts', path: '/community' },
      { label: 'Regional Mentors', path: '/community?tab=mentors' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    path: '/calculators',
    matchPrefixes: ['/calculators', '/tools', '/sizer'],
    icon: Calculator,
    subItems: [
      { label: 'Homestead Engineering Tools', path: '/calculators' },
      { label: 'Solar & Water BoQ Sizer', path: '/calculators?tab=solar' },
    ],
  },
];

export function LeftSymbolDirectory() {
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('outpost_directory_pinned_v1');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [explorerWidth, setExplorerWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('outpost_desktop_explorer_width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 180 && val <= 380) return val;
      }
    } catch {}
    return 232; // Reference default width: 232px
  });

  const [isDraggingExplorer, setIsDraggingExplorer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Drag-to-resize handle
  const handleExplorerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingExplorer(true);
  };

  const handleExplorerDoubleClick = () => {
    setExplorerWidth(232);
    try {
      localStorage.setItem('outpost_desktop_explorer_width', '232');
    } catch {}
  };

  useEffect(() => {
    if (!isDraggingExplorer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(380, Math.max(180, e.clientX));
      setExplorerWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDraggingExplorer(false);
      try {
        localStorage.setItem('outpost_desktop_explorer_width', String(explorerWidth));
      } catch {}
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingExplorer, explorerWidth]);

  // Sync state with global triggers
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

  const isItemActive = (item: ReferenceSidebarItem) => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && location.pathname.startsWith(item.path)) return true;
    return item.matchPrefixes.some((prefix) =>
      prefix !== '/' ? location.pathname.startsWith(prefix) : false
    );
  };

  const filteredItems = REFERENCE_SIDEBAR_ITEMS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.subItems && item.subItems.some((s) => s.label.toLowerCase().includes(q)))
    );
  });

  return (
    <AnimatePresence initial={false}>
      {isExplorerOpen && (
        <motion.aside
          id="left-outpost-directory-panel"
          role="navigation"
          aria-label="Outpost Workspace Directory"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: explorerWidth, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: isDraggingExplorer ? 0 : 0.15, ease: 'easeOut' }}
          style={{ width: `${explorerWidth}px` }}
          className="shrink-0 h-full bg-[#16261C] dark:bg-[#0E1712] border-r border-[#2B4636] dark:border-[#1F3325] flex flex-col select-none relative z-30 font-chrome text-[#F6F1E7] transition-colors duration-200"
        >
          {/* Top Search Filter inside Sidebar */}
          <div className="p-3 pb-2 border-b border-[#2B4636]/60 dark:border-[#1F3325]">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#F6F1E7]/50"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7.5 pr-6 py-1.5 rounded-[6px] bg-[#2B4636]/50 dark:bg-[#1A2C20]/60 border border-transparent focus:border-[#C98A1B]/60 focus:bg-[#2B4636] dark:focus:bg-[#1A2C20] text-[12.5px] text-[#FFFDF8] placeholder-[#F6F1E7]/40 outline-none transition-all duration-150"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F6F1E7]/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* 10 Clean Reference Categories */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5">
            {filteredItems.map((item) => {
              const active = isItemActive(item);
              const Icon = item.icon;
              const isExpanded = expandedItemId === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.id} className="flex flex-col">
                  <div
                    className={cn(
                      'group flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-[13px] font-normal transition-all duration-200 ease-out cursor-pointer select-none',
                      active
                        ? 'bg-[#2B4636] dark:bg-[#1E3326] text-[#FFFDF8] font-medium shadow-xs border-l-2 border-[#C98A1B]'
                        : 'text-[#F6F1E7]/75 hover:text-[#FFFDF8] hover:bg-[#2B4636]/60 dark:hover:bg-[#1E3326]/60 hover:translate-x-1 active:scale-[0.99]'
                    )}
                    onClick={() => {
                      navigate(item.path);
                      if (hasSubItems) {
                        setExpandedItemId(isExpanded ? null : item.id);
                      }
                    }}
                    onMouseEnter={() => prefetchRoute(item.path)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={15}
                        className={cn(
                          'shrink-0 transition-transform duration-200 ease-out',
                          active
                            ? 'text-[#C98A1B] scale-105'
                            : 'text-[#F6F1E7]/60 group-hover:text-[#F6F1E7] group-hover:scale-115'
                        )}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {hasSubItems && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedItemId(isExpanded ? null : item.id);
                        }}
                        className="p-0.5 rounded text-[#F6F1E7]/40 hover:text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight
                          size={12}
                          className={cn('transition-transform duration-200', isExpanded && 'rotate-90')}
                        />
                      </button>
                    )}
                  </div>

                  {/* Sub-items (collapsible) */}
                  {hasSubItems && isExpanded && (
                    <div className="pl-7 pr-1 py-1 space-y-0.5 border-l border-[#2B4636] dark:border-[#1F3325] ml-4 my-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.subItems!.map((sub) => {
                        const isSubActive =
                          location.pathname === sub.path ||
                          location.pathname + location.search === sub.path;

                        return (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className={cn(
                              'block px-2 py-1 rounded-[4px] text-[12px] truncate transition-all duration-150',
                              isSubActive
                                ? 'text-[#FFFDF8] bg-[#2B4636] dark:bg-[#1E3326] font-medium'
                                : 'text-[#F6F1E7]/65 hover:text-white hover:bg-[#2B4636]/30 dark:hover:bg-[#1E3326]/30 hover:translate-x-0.5'
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drag Handle on right border */}
          <div
            onMouseDown={handleExplorerMouseDown}
            onDoubleClick={handleExplorerDoubleClick}
            title="Drag to resize directory (Double click to reset to 232px)"
            className={cn(
              'absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#C98A1B]/50 transition-colors z-40',
              isDraggingExplorer && 'bg-[#C98A1B]'
            )}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default LeftSymbolDirectory;
