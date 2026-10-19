import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  MapPin,
  Calendar,
  Hammer,
  Calculator,
  Sparkles,
  BookOpen,
  FileText,
  Layers,
  Sun,
  ShieldCheck,
  User,
  X,
  ChevronRight,
  Scale,
  MessageSquare,
  Feather,
  Building2,
  Users,
  Sprout,
  Settings,
  Code2,
  HeartPulse,
  UtensilsCrossed,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { prefetchRoute } from '@/lib/routePrefetch';
import { getCachedSkills, getCachedRegions } from '@/lib/offlineStorage';
import { EDENIC_AGRICULTURE_GUIDES } from '@/data/outpostFourPillarsData';

export interface CommandItem {
  id: string;
  title: string;
  category:
    | 'Land & Maps'
    | 'Farming & Climate'
    | 'Homestead Skills'
    | 'Calculators & BoQ'
    | 'Spiritual & Fellowship';
  subtitle?: string;
  path: string;
  icon: React.ElementType;
  keywords?: string[];
  shortcut?: string;
}

const COMMAND_REGISTRY: CommandItem[] = [
  // Land & Maps
  {
    id: 'scout-map',
    title: 'GPS Land Scout Map (28 Districts)',
    category: 'Land & Maps',
    subtitle: 'Interactive map of all 28 Malawi districts, river basins, aquifers & contours',
    path: '/scout-map',
    icon: Compass,
    keywords: ['map', 'gps', 'districts', 'gis', 'boundaries', 'satellite', 'elevation', 'rivers'],
    shortcut: 'Alt+3',
  },
  {
    id: 'where-matrix',
    title: 'Land Scouting Matrix & 5-Step Customary Land Act Checklist',
    category: 'Land & Maps',
    subtitle: 'Evaluate 28 districts, Customary Land Act (2016) protocol & Mfumu verification',
    path: '/where',
    icon: Scale,
    keywords: ['districts', 'land', 'customary', 'mfumu', 'nyakwawa', 'mwini mbumba', 'title', 'dedza'],
    shortcut: 'Alt+2',
  },
  {
    id: 'chichewa-phrasebook',
    title: 'Chichewa Chief (Mfumu) Etiquette & Phonetic Phrasebook',
    category: 'Land & Maps',
    subtitle: 'Phonetic Chichewa greetings, boundary walk phrases & village protocol',
    path: '/where',
    icon: MessageSquare,
    keywords: ['chichewa', 'phrasebook', 'mfumu', 'chief', 'odi', 'zikomo', 'language', 'etiquette'],
  },
  {
    id: 'suitability-rubric',
    title: 'Property Suitability Evaluator',
    category: 'Land & Maps',
    subtitle: 'Score candidate parcels on perennial water, soil, title safety & clinic distance',
    path: '/suitability',
    icon: ShieldCheck,
    keywords: ['suitability', 'evaluator', 'score', 'rubric', 'parcel', 'assessment'],
  },
  {
    id: 'agro-zones',
    title: 'Comparative District Analytics & Agro-Zones',
    category: 'Land & Maps',
    subtitle: 'Compare rainfall gradients, population density & borehole depth across Malawi',
    path: '/regions',
    icon: MapPin,
    keywords: ['regions', 'zones', 'highlands', 'analytics', 'comparison'],
  },

  // Farming & Climate
  {
    id: 'crops-guide',
    title: 'Crops, Visual Soil Swatches & 75cm Ridge Planner',
    category: 'Farming & Climate',
    subtitle: 'Katondo/Makande/Dambo soil ribbon guide, 75cm x 25cm Sasakawa ridges & pantry reserves',
    path: '/what',
    icon: Sprout,
    keywords: ['crops', 'soil', 'swatch', 'katondo', 'makande', 'dambo', 'ridges', 'maize', 'chimanga', 'nzama'],
    shortcut: 'Alt+4',
  },
  {
    id: 'edenic-agriculture',
    title: 'Edenic Agriculture & 18-Day Compost Manuals',
    category: 'Farming & Climate',
    subtitle: 'Deep orchard pit preparation, hot composting thermal curves & natural pest care',
    path: '/agriculture',
    icon: Sun,
    keywords: ['agriculture', 'edenic', 'compost', 'mulch', 'biochar', 'orchard', 'tithonia'],
  },
  {
    id: 'seasonal-almanac',
    title: 'Seasonal Almanac & Malawi Crop Calendar',
    category: 'Farming & Climate',
    subtitle: 'Month-by-month tasks for Dzinja (Rainy), Masika (Cool Harvest) & Chilimwe (Dry)',
    path: '/seasons',
    icon: Calendar,
    keywords: ['almanac', 'seasons', 'calendar', 'rainy', 'dry', 'dzinja', 'masika', 'chilimwe'],
  },

  // Homestead Skills & Engineering
  {
    id: 'engineering-diagrams',
    title: 'Field Engineering Schematics & Relocation Guide',
    category: 'Homestead Skills',
    subtitle: 'Interactive SVG cross-sections: 3x3x3ft EGW orchard pit, A-frame level & first-flush tank',
    path: '/how',
    icon: Layers,
    keywords: ['how', 'engineering', 'diagrams', 'a-frame', 'contour', 'first-flush', 'orchard pit'],
    shortcut: 'Alt+5',
  },
  {
    id: 'skills-hub',
    title: '25 Homestead Skills Masterclass',
    category: 'Homestead Skills',
    subtitle: 'Step-by-step visual protocols for solar dehydrators, biosand filters, rocket stoves & remedies',
    path: '/skills',
    icon: Hammer,
    keywords: ['skills', 'masterclass', 'brickmaking', 'compost', 'solar', 'biosand', 'hydrotherapy'],
  },

  // Calculators & BoQ
  {
    id: 'calculators-hub',
    title: 'Solar, Rainwater & Dry-Season Dimba Calculators',
    category: 'Calculators & BoQ',
    subtitle: 'Size off-grid LiFePO4 solar arrays, roof cisterns, gravity pipes & Chilimwe Dimba irrigation',
    path: '/calculators',
    icon: Calculator,
    keywords: ['calculators', 'solar', 'battery', 'borehole', 'rainwater', 'dimba', 'irrigation', 'sizing'],
    shortcut: 'Alt+6',
  },
  {
    id: 'boq-estimator',
    title: 'Malawi Homestead Bill of Quantities (MWK / USD Cost Estimator)',
    category: 'Calculators & BoQ',
    subtitle: 'Itemized hardware schedule & capital budget in Malawian Kwacha (MWK) and USD',
    path: '/calculators?tab=budget',
    icon: FileText,
    keywords: ['budget', 'boq', 'cost', 'kwacha', 'mwk', 'usd', 'price', 'hardware', 'materials'],
  },

  // Spiritual & Fellowship
  {
    id: 'tracker-roadmap',
    title: 'My Plan — Exodus Readiness Ledger & Roadmap',
    category: 'Spiritual & Fellowship',
    subtitle: 'Track overall readiness score, 5-stage transition ledger & personalized milestones',
    path: '/tracker',
    icon: Sparkles,
    keywords: ['tracker', 'exodus', 'roadmap', 'progress', 'milestones', 'checklist', 'plan'],
    shortcut: 'Alt+T',
  },
  {
    id: 'daily-devotional',
    title: 'Daily Country Living Devotionals & Worship Journal',
    category: 'Spiritual & Fellowship',
    subtitle: 'Morning Watch KJV Scripture, Spirit of Prophecy counsel & personal reflection vault',
    path: '/devotional',
    icon: Feather,
    keywords: ['devotional', 'journal', 'prayer', 'worship', 'scripture', 'kjv'],
  },
  {
    id: 'country-vision',
    title: 'The inspired blueprint — Spirit of Prophecy archive',
    category: 'Spiritual & Fellowship',
    subtitle: 'Searchable archive of Ellen G. White counsels with Scripture from King James Version',
    path: '/vision',
    icon: BookOpen,
    keywords: ['vision', 'ellen white', 'egw', 'counsel', 'country living', 'ministry of healing'],
  },
  {
    id: 'outpost-blueprints',
    title: 'Outpost Center & Rural Sanitarium Blueprints',
    category: 'Spiritual & Fellowship',
    subtitle: 'Architectural site plans modeled on Madison and Avondale training centers',
    path: '/blueprints',
    icon: Building2,
    keywords: ['blueprints', 'sanitarium', 'school', 'clinic', 'avondale', 'madison', 'architecture'],
  },
  {
    id: 'community-directory',
    title: 'Malawi Outpost & Believer Directory',
    category: 'Spiritual & Fellowship',
    subtitle: 'Connect with Seventh-day Adventist homesteaders, seed savers & solar builders',
    path: '/community',
    icon: Users,
    keywords: ['community', 'directory', 'fellowship', 'seed savers', 'believers'],
  },
  {
    id: 'sanitarium-apothecary',
    title: 'Medical Missionary & Sanitarium Apothecary (NEWSTART)',
    category: 'Homestead Skills',
    subtitle: 'Rational hydrotherapy fomentations, activated charcoal poultices & 8 NEWSTART laws',
    path: '/sanitarium',
    icon: HeartPulse,
    keywords: ['sanitarium', 'medical', 'hydrotherapy', 'remedies', 'charcoal', 'poultice', 'newstart'],
  },
  {
    id: 'country-kitchen',
    title: 'Edenic Country Kitchen & Unfermented Bread Table',
    category: 'Homestead Skills',
    subtitle: 'Zwischenbrot whole-grain bread, nut-milk emulsions & oil-free Malawi harvest cuisine',
    path: '/kitchen',
    icon: UtensilsCrossed,
    keywords: ['kitchen', 'recipes', 'bread', 'cooking', 'diet', 'nutrition', 'unfermented'],
  },
  {
    id: 'account-backup',
    title: 'Steward Profile, Cloud Sync & JSON Backup',
    category: 'Spiritual & Fellowship',
    subtitle: 'Manage Google Cloud Sync, export full Sanctuary JSON backup, or restore offline data',
    path: '/account',
    icon: User,
    keywords: ['account', 'profile', 'backup', 'export', 'restore', 'sync', 'offline'],
  },
  {
    id: 'workspace-settings',
    title: 'Workspace Settings, Theme Palette & Offline Backups',
    category: 'Spiritual & Fellowship',
    subtitle: 'Switch Highland Emerald / Sapphire Blue palettes, adjust font scale & export JSON backups',
    path: '#settings-preferences',
    icon: Settings,
    keywords: ['settings', 'preferences', 'theme', 'palette', 'sapphire', 'emerald', 'font', 'backup'],
    shortcut: '⌘,',
  },
  {
    id: 'developer-about',
    title: 'About Outpost Living & Lead Developer Info (Alfred Pereira-Sozilho Onesi)',
    category: 'Spiritual & Fellowship',
    subtitle: 'System architecture, prophetic foundations & developer contact (onesialfred@gmail.com)',
    path: '#settings-developer',
    icon: Code2,
    keywords: ['about', 'developer', 'alfred', 'pereira', 'sozilho', 'onesi', 'credits', 'contact', 'author', 'version'],
  },
  {
    id: 'homestead-ai-advisor',
    title: 'Homestead AI Sanctuary Advisor',
    category: 'Spiritual & Fellowship',
    subtitle: 'Ask questions on Malawi land scouting, borehole depth, Katondo soil & EGW counsel',
    path: '#advisor',
    icon: Sparkles,
    keywords: ['ai', 'advisor', 'ask', 'question', 'help', 'counsel'],
  },
];

export interface QuickCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor?: () => void;
}

export function QuickCommandPalette({
  isOpen,
  onClose,
  onOpenAdvisor,
}: QuickCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('outpost_recent_commands_v1');
      return raw ? JSON.parse(raw) : ['scout-map', 'calculators-hub', 'where-matrix'];
    } catch {
      return ['scout-map', 'calculators-hub', 'where-matrix'];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
    }
  }, [isOpen]);

  const allCommands = useMemo<CommandItem[]>(() => {
    const skillCommands: CommandItem[] = getCachedSkills().map((skill) => ({
      id: `skill-${skill.id}`,
      title: `Skill Protocol: ${skill.title}`,
      category: 'Homestead Skills',
      subtitle: `${skill.category} · ${skill.difficulty} · ${skill.timeToMaster}`,
      path: `/skills/${skill.id}`,
      icon: Hammer,
      keywords: [
        skill.title,
        skill.category,
        skill.seasonalTag || '',
        ...(skill.toolsNeeded || []),
      ],
    }));

    const regionCommands: CommandItem[] = getCachedRegions().map((region) => ({
      id: `region-${region.id}`,
      title: `Region Almanac: ${region.name}`,
      category: 'Land & Maps',
      subtitle: `${region.tagline} · Districts: ${region.keyDistricts.join(', ')}`,
      path: `/regions/${region.id}`,
      icon: MapPin,
      keywords: [region.name, ...region.keyDistricts, ...region.topCrops],
    }));

    const manualCommands: CommandItem[] = EDENIC_AGRICULTURE_GUIDES.map((guide) => ({
      id: `manual-${guide.id}`,
      title: `Edenic Manual: ${guide.title}`,
      category: 'Farming & Climate',
      subtitle: `${guide.subtitle} (${guide.counselReference})`,
      path: '/agriculture',
      icon: Sprout,
      keywords: [guide.title, guide.subtitle, guide.counselReference],
    }));

    return [...COMMAND_REGISTRY, ...skillCommands, ...regionCommands, ...manualCommands];
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return COMMAND_REGISTRY;
    const q = query.toLowerCase().trim();
    return allCommands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q);
      const matchCategory = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [query, allCommands]);

  // Prefetch currently highlighted command route
  useEffect(() => {
    if (!isOpen) return;
    const current = filteredResults[selectedIndex];
    if (current?.path && !current.path.startsWith('#')) {
      prefetchRoute(current.path);
    }
  }, [isOpen, filteredResults, selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length)
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  const handleSelect = (item: CommandItem) => {
    try {
      const nextRecents = [item.id, ...recentIds.filter((id) => id !== item.id)].slice(0, 5);
      setRecentIds(nextRecents);
      localStorage.setItem('outpost_recent_commands_v1', JSON.stringify(nextRecents));
    } catch {}

    if (item.id === 'homestead-ai-advisor') {
      onClose();
      onOpenAdvisor?.();
      return;
    }
    if (item.path === '#settings-preferences') {
      onClose();
      window.dispatchEvent(
        new CustomEvent('outpost:open-settings', { detail: { tab: 'preferences' } })
      );
      return;
    }
    if (item.path === '#settings-developer') {
      onClose();
      window.dispatchEvent(
        new CustomEvent('outpost:open-settings', { detail: { tab: 'developer' } })
      );
      return;
    }
    navigate(item.path);
    onClose();
  };

  const recentCommandItems = useMemo(
    () =>
      recentIds
        .map((id) => allCommands.find((c) => c.id === id))
        .filter((c): c is CommandItem => Boolean(c)),
    [recentIds, allCommands]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
          />

          {/* Palette Modal Box with Dark Mode Support */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="relative z-50 w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#0B1C12] border border-stone-300 dark:border-emerald-800/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 divide-y divide-stone-200 dark:divide-emerald-900/60"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 sm:px-6 py-4 gap-3 bg-white dark:bg-[#08150D]">
              <Search size={19} className="text-emerald-800 dark:text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Jump to any module, BoQ calculator, Chichewa phrasebook, or map..."
                className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 font-sans focus:outline-none"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-caption font-mono font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-emerald-950 border border-stone-200 dark:border-emerald-800">
                  ESC
                </kbd>
              )}
            </div>

            {/* Recently Visited Quick-Jump Chips (when query is empty) */}
            {!query.trim() && recentCommandItems.length > 0 && (
              <div className="px-4 sm:px-6 py-2.5 bg-stone-100/70 dark:bg-[#06110A] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-caption font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 shrink-0">
                  Recent:
                </span>
                {recentCommandItems.map((rec) => {
                  const RecIcon = rec.icon;
                  return (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => handleSelect(rec)}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-emerald-950/70 hover:bg-emerald-50 dark:hover:bg-emerald-900/80 border border-stone-200 dark:border-emerald-800/70 text-xs font-semibold text-stone-700 dark:text-stone-200 inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      <RecIcon size={12} className="text-emerald-700 dark:text-amber-300" />
                      <span className="truncate max-w-[160px]">{rec.title.split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Results List */}
            <div className="max-h-[58vh] overflow-y-auto custom-scrollbar p-2 sm:p-3 flex flex-col gap-1 bg-[#FAF8F5] dark:bg-[#0B1C12]">
              {filteredResults.length === 0 ? (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-2 text-stone-500 dark:text-stone-400">
                  <Compass size={32} className="text-emerald-800/40 dark:text-amber-400/40" />
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    No matching guides or tools found
                  </span>
                  <span className="text-xs">
                    Try searching for "boq", "chichewa", "solar", "customary", or "ridges"
                  </span>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => {
                        setSelectedIndex(index);
                        if (!item.path.startsWith('#')) prefetchRoute(item.path);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer border',
                        isSelected
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/90 border-emerald-300 dark:border-amber-500/40 text-stone-900 dark:text-white shadow-xs'
                          : 'bg-transparent border-transparent hover:bg-stone-100/80 dark:hover:bg-white/5 text-stone-700 dark:text-stone-300'
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                            isSelected
                              ? 'bg-emerald-800 dark:bg-amber-500 text-white dark:text-stone-950 shadow-xs'
                              : 'bg-stone-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-amber-300 border border-stone-200 dark:border-emerald-800/60'
                          )}
                        >
                          <Icon size={19} />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'text-sm font-bold truncate font-sans',
                                isSelected
                                  ? 'text-emerald-950 dark:text-amber-200'
                                  : 'text-stone-900 dark:text-stone-100'
                              )}
                            >
                              {item.title}
                            </span>
                            <span className="text-caption font-mono text-stone-500 dark:text-emerald-300/70 hidden sm:inline">
                              · {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <span className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5 font-normal">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.shortcut && (
                          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-caption font-mono text-stone-500 dark:text-stone-300 bg-white dark:bg-black/40 border border-stone-200 dark:border-emerald-800">
                            {item.shortcut}
                          </kbd>
                        )}
                        <ChevronRight
                          size={16}
                          className={cn(
                            'transition-transform',
                            isSelected
                              ? 'text-emerald-800 dark:text-amber-400 translate-x-0.5'
                              : 'text-stone-400'
                          )}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-[#08150D] flex flex-wrap items-center justify-between gap-2 text-caption font-mono text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span>⌘B Directory</span>
                <span>Alt+←/→ History</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
