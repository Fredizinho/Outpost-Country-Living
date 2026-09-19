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
  Droplets, 
  ShieldCheck, 
  User, 
  Database,
  ArrowRight,
  Command,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Land & Maps' | 'Farming & Climate' | 'Homestead Skills' | 'Calculators' | 'Account & Tools';
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
    title: 'GPS Land Scout Map',
    category: 'Land & Maps',
    subtitle: 'Interactive map of all 28 Malawi districts, river basins & elevations',
    path: '/scout-map',
    icon: Compass,
    keywords: ['map', 'gps', 'districts', 'gis', 'boundaries', 'satellite', 'elevation', 'rivers', 'coordinates'],
    shortcut: 'M'
  },
  {
    id: 'where-matrix',
    title: 'Land Scouting Matrix & Districts',
    category: 'Land & Maps',
    subtitle: 'Evaluate 28 districts for fertile Katondo soil, climate & water table',
    path: '/where',
    icon: MapPin,
    keywords: ['districts', 'land', 'dedza', 'zomba', 'rumphi', 'mzimba', 'lilongwe', 'mulanje', 'freehold', 'customary']
  },
  {
    id: 'agro-zones',
    title: 'Agricultural Climate Zones',
    category: 'Land & Maps',
    subtitle: 'Highland frost belts, lakeshore plains and Shire valley microclimates',
    path: '/regions',
    icon: Layers,
    keywords: ['regions', 'zones', 'highlands', 'plateau', 'weather', 'rain', 'temperature']
  },
  {
    id: 'customary-land',
    title: 'Customary Land Acquisition Guide',
    category: 'Land & Maps',
    subtitle: 'Step-by-step village land laws, Mfumu protocols & title conversion',
    path: '/how',
    icon: FileText,
    keywords: ['customary', 'chikhalidwe', 'chief', 'mfumu', 'land act', 'title deed', 'leasehold', 'law']
  },

  // Farming & Seasons
  {
    id: 'seasonal-almanac',
    title: 'Seasonal Almanac & Crop Calendar',
    category: 'Farming & Climate',
    subtitle: 'Month-by-month planting, mulching, compost and harvest schedule',
    path: '/seasons',
    icon: Calendar,
    keywords: ['almanac', 'seasons', 'calendar', 'rainy', 'dry', 'cold', 'planting', 'harvest', 'mvula', 'mpepo', 'chirimwe'],
    shortcut: 'S'
  },
  {
    id: 'crops-guide',
    title: 'Crops & Nutrition Field Manual',
    category: 'Farming & Climate',
    subtitle: 'Growing maize, groundnuts, beans, sweet potatoes & relish vegetables',
    path: '/what',
    icon: Sun,
    keywords: ['crops', 'maize', 'beans', 'groundnuts', 'chimanga', 'ntedza', 'nyemba', 'vegetables', 'food']
  },

  // Practical Skills
  {
    id: 'skills-hub',
    title: '25 Homestead Skills Masterclass',
    category: 'Homestead Skills',
    subtitle: 'Practical manuals for compost, solar wiring, brickmaking, food drying & herbal care',
    path: '/skills',
    icon: Hammer,
    keywords: ['skills', 'masterclass', 'brickmaking', 'compost', 'solar', 'herbal', 'canning', 'foraging', 'joinery'],
    shortcut: 'K'
  },
  {
    id: 'country-vision',
    title: 'Country Living Vision & Philosophy',
    category: 'Homestead Skills',
    subtitle: 'Spiritual and health foundation for peaceful self-reliance in rural sanctuaries',
    path: '/vision',
    icon: BookOpen,
    keywords: ['vision', 'philosophy', 'country living', 'ellen white', 'health', 'self reliance', 'peace']
  },

  // Off-Grid Calculators
  {
    id: 'calculators-hub',
    title: 'Off-Grid Sizing Calculators',
    category: 'Calculators',
    subtitle: 'Solar panels, battery banks, borehole pumps, rainwater tanks & land layout',
    path: '/calculators',
    icon: Calculator,
    keywords: ['calculators', 'solar', 'battery', 'borehole', 'water tank', 'rainwater', 'sizing', 'wattage', 'acreage'],
    shortcut: 'C'
  },

  // Progress & Profile
  {
    id: 'tracker-roadmap',
    title: 'Exodus Move Roadmap & Tracker',
    category: 'Account & Tools',
    subtitle: 'Interactive milestone tracker for land purchase, water setup & relocation',
    path: '/tracker',
    icon: Sparkles,
    keywords: ['tracker', 'exodus', 'roadmap', 'progress', 'milestones', 'checklist', 'journey'],
    shortcut: 'T'
  },
  {
    id: 'account-backup',
    title: 'Steward Profile & Data Backup',
    category: 'Account & Tools',
    subtitle: 'Export backup JSON, check offline cached guides and customize goals',
    path: '/account',
    icon: User,
    keywords: ['account', 'profile', 'backup', 'export', 'restore', 'sync', 'offline', 'settings']
  },
  {
    id: 'homestead-ai-advisor',
    title: 'Homestead AI Sanctuary Advisor',
    category: 'Account & Tools',
    subtitle: 'Ask AI questions on land scouting, water borehole sizing, Katondo soil & seasons',
    path: '#advisor',
    icon: Sparkles,
    keywords: ['ai', 'advisor', 'gemini', 'ask', 'question', 'help', 'counsel', 'assistant', 'bot', 'chat'],
    shortcut: 'A'
  }
];

export interface QuickCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor?: () => void;
}

export function QuickCommandPalette({ isOpen, onClose, onOpenAdvisor }: QuickCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Reset query and focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter commands by query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return COMMAND_REGISTRY;
    const q = query.toLowerCase().trim();
    return COMMAND_REGISTRY.filter(cmd => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q);
      const matchCategory = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
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
    if (item.id === 'homestead-ai-advisor') {
      onClose();
      onOpenAdvisor?.();
      return;
    }
    navigate(item.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Palette Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 w-full max-w-2xl bg-slate-950/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-slate-100 divide-y divide-white/10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 sm:px-6 py-4 gap-3">
              <Search size={20} className="text-amber-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Jump to any guide, calculator, district map or skill (e.g. 'solar', 'dedza', 'compost')..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 font-sans focus:outline-none"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-400 bg-white/5 border border-white/10">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2 sm:p-3 flex flex-col gap-1">
              {filteredResults.length === 0 ? (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Compass size={32} className="text-amber-400/40 animate-pulse" />
                  <span className="text-sm font-bold text-slate-300">No matching guides or tools found</span>
                  <span className="text-xs text-slate-400">Try searching for "solar", "water", "districts", "almanac", or "skills"</span>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer border",
                        isSelected
                          ? "bg-gradient-to-r from-amber-500/20 to-emerald-500/10 border-amber-500/40 text-white shadow-md"
                          : "bg-transparent border-transparent hover:bg-white/5 text-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                            : "bg-slate-900 text-amber-400 border border-white/10"
                        )}>
                          <Icon size={20} />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-sm font-bold truncate",
                              isSelected ? "text-amber-200" : "text-slate-100"
                            )}>
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 hidden sm:inline-block">
                              {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <span className="text-xs text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.shortcut && (
                          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-black/40 border border-white/10">
                            {item.shortcut}
                          </kbd>
                        )}
                        <ChevronRight size={16} className={cn(
                          "transition-transform",
                          isSelected ? "text-amber-400 translate-x-0.5" : "text-slate-400"
                        )} />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="hidden sm:flex items-center justify-between px-6 py-3 bg-slate-950/80 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">↵</kbd>
                  Open
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">ESC</kbd>
                  Close
                </span>
              </div>

              <span className="text-amber-400/80 font-semibold">
                Instant Navigation • Works Offline
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default QuickCommandPalette;
