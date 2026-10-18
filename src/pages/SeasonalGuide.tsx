import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Calendar, Sun, CheckCircle2, Sparkles, Bookmark, BookmarkCheck, 
  Plus, Trash2, ShieldCheck, HardDrive, CloudRain, Thermometer, 
  AlertTriangle, Compass, MapPin, Wrench, ArrowRight, Layers, 
  Search, Filter, Droplets, Sprout, Trees, Wheat, Home, Clock, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SeasonalTask, MICROCLIMATE_ZONES, MicroclimateZone, SeasonalTag } from '@/data/skillsAndSeasons';
import { 
  getCachedSeasons, getCachedSkills, toggleOfflineBookmark, isItemBookmarked, 
  getOfflineFieldNotes, saveOfflineFieldNote, deleteOfflineFieldNote, OfflineFieldNote,
  calculateHomesteadReadinessScore, getCompletedSeasonalTasks 
} from '@/lib/offlineStorage';
import { getCurrentMalawiSeason } from '@/lib/seasonalAlmanac';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';
import { 
  ACTIONABLE_ALMANAC_TASKS, ActionableTask, TaskDomain, TaskPriority, 
  DISTRICT_TELEMETRY, getTelemetryForDistrict, DistrictSeasonalTelemetry 
} from '@/data/actionableAlmanacData';
import { SeasonGaugeDial } from '@/components/almanac/SeasonGaugeDial';
import { HomesteadTelemetryBanner } from '@/components/almanac/HomesteadTelemetryBanner';
import { UrgentSeasonAlert } from '@/components/almanac/UrgentSeasonAlert';
import { DistrictMicroclimateSelector } from '@/components/almanac/DistrictMicroclimateSelector';
import { ActionableTaskCard } from '@/components/almanac/ActionableTaskCard';
import { RegionalClimateChart } from '@/components/almanac/RegionalClimateChart';
import { ClimateTelemetry } from '@/components/climate/ClimateTelemetry';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { COUNTRY_IMAGES } from '@/assets/images';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon } from '@/components/icons/CountryIcons';

export default function SeasonalGuide() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const seasons = getCachedSeasons();
  const allSkills = getCachedSkills();
  const [activePerspective, setActivePerspective] = useState<'tasks' | 'telemetry' | 'analytics'>('tasks');

  // District Selection (supports URL param e.g. /almanac?district=Salima and global active district)
  const districtParam = searchParams.get('district');
  const [selectedDistrict, setSelectedDistrictState] = useState<string>(() => {
    if (districtParam) return districtParam.toLowerCase();
    return getActiveHomesteadDistrictId(user?.district || 'dedza');
  });

  const setSelectedDistrict = (nextDist: string) => {
    const clean = nextDist.toLowerCase();
    setSelectedDistrictState(clean);
    setActiveHomesteadDistrictId(clean);
  };

  // Active Season Tag (defaults to dynamic current Malawi season)
  const seasonQueryParam = searchParams.get('season');
  const [activeSeasonKey, setActiveSeasonKey] = useState<SeasonalTag>(() => {
    if (seasonQueryParam) {
      const matched = seasons.find(s => s.season.toLowerCase() === seasonQueryParam.toLowerCase());
      if (matched) return matched.season;
    }
    return getCurrentMalawiSeason();
  });

  // Match the legacy activeSeason object for notes & compatibility
  const activeSeasonObj = useMemo(() => {
    return seasons.find(s => s.season === activeSeasonKey) || seasons[0];
  }, [seasons, activeSeasonKey]);

  // Telemetry for selected district
  const districtTelemetry: DistrictSeasonalTelemetry = useMemo(() => {
    return getTelemetryForDistrict(selectedDistrict);
  }, [selectedDistrict]);

  // Selected Microclimate Zone for DCCMS section
  const [selectedZone, setSelectedZone] = useState<MicroclimateZone>(() => {
    const matched = MICROCLIMATE_ZONES.find(z => 
      z.districts.some(d => d.toLowerCase().includes(selectedDistrict) || selectedDistrict.includes(d.toLowerCase()))
    );
    return matched || MICROCLIMATE_ZONES[0];
  });

  // Filters State
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | TaskDomain>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bookmarks & Field Notes State
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<OfflineFieldNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Sync district parameter changes & global district changes
  useEffect(() => {
    if (districtParam) {
      setSelectedDistrict(districtParam.toLowerCase());
    }
  }, [districtParam]);

  useEffect(() => {
    const onGlobalDistrict = (e: Event) => {
      const id = (e as CustomEvent<{ districtId: string }>).detail?.districtId;
      if (id) setSelectedDistrictState(id.toLowerCase());
    };
    window.addEventListener('outpost:active-district-changed', onGlobalDistrict);
    return () => window.removeEventListener('outpost:active-district-changed', onGlobalDistrict);
  }, []);

  useEffect(() => {
    if (activeSeasonObj?.id) {
      setBookmarked(isItemBookmarked(activeSeasonObj.id, 'season'));
      setNotes(getOfflineFieldNotes(activeSeasonObj.id));
    }
  }, [activeSeasonObj?.id]);

  const handleBookmarkToggle = () => {
    if (!activeSeasonObj) return;
    const isNowBookmarked = toggleOfflineBookmark({
      id: activeSeasonObj.id,
      type: 'season',
      title: activeSeasonObj.season
    });
    setBookmarked(isNowBookmarked);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !activeSeasonObj) return;
    saveOfflineFieldNote(activeSeasonObj.id, newNoteTitle, newNoteContent);
    setNotes(getOfflineFieldNotes(activeSeasonObj.id));
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowNoteForm(false);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteOfflineFieldNote(noteId);
    if (activeSeasonObj) {
      setNotes(getOfflineFieldNotes(activeSeasonObj.id));
    }
  };

  // Filter Tasks for the active season
  const filteredTasks = useMemo(() => {
    return ACTIONABLE_ALMANAC_TASKS.filter(task => {
      // Must match season
      if (task.seasonKey !== activeSeasonKey) return false;

      // Priority filter
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

      // Domain filter
      if (domainFilter !== 'all' && task.domain !== domainFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesSummary = task.summary.toLowerCase().includes(q);
        const matchesExodus = task.exodusStage.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesExodus) return false;
      }

      return true;
    });
  }, [activeSeasonKey, priorityFilter, domainFilter, searchQuery]);

  // Urgent Task for Banner
  const topUrgentTask = useMemo(() => {
    return ACTIONABLE_ALMANAC_TASKS.find(t => t.seasonKey === activeSeasonKey && t.priority === 'urgent');
  }, [activeSeasonKey]);

  // Domain Counts
  const domainCounts = useMemo(() => {
    const seasonTasks = ACTIONABLE_ALMANAC_TASKS.filter(t => t.seasonKey === activeSeasonKey);
    return {
      all: seasonTasks.length,
      water: seasonTasks.filter(t => t.domain === 'water').length,
      soil: seasonTasks.filter(t => t.domain === 'soil').length,
      'fruit-trees': seasonTasks.filter(t => t.domain === 'fruit-trees').length,
      crops: seasonTasks.filter(t => t.domain === 'crops').length,
      infrastructure: seasonTasks.filter(t => t.domain === 'infrastructure').length,
    };
  }, [activeSeasonKey]);

  // Priority Counts
  const priorityCounts = useMemo(() => {
    const seasonTasks = ACTIONABLE_ALMANAC_TASKS.filter(t => t.seasonKey === activeSeasonKey);
    return {
      all: seasonTasks.length,
      urgent: seasonTasks.filter(t => t.priority === 'urgent').length,
      high: seasonTasks.filter(t => t.priority === 'high').length,
      upcoming: seasonTasks.filter(t => t.priority === 'upcoming').length,
    };
  }, [activeSeasonKey]);

  return (
    <div className="min-h-screen bg-[#F6F1E7] dark:bg-[#0E1712] text-[#1F2A22] dark:text-[#F6F1E7] pb-16 transition-colors duration-200">
      <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* 1. Compact Seasonal Almanac Workspace Header */}
        <header className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#B85D36] dark:text-[#E2875A] font-semibold">
                <span>Malawi Year-Round Planting &amp; Harvest Almanac</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5A6458] dark:text-[#9FB3A4] font-normal">
                  Active Season: {activeSeasonKey} · {filteredTasks.length} Operations ({selectedDistrict})
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
                Monthly Planting, Mulching &amp; Harvest Operations
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleBookmarkToggle}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all shadow-xs active:scale-95 cursor-pointer",
                  bookmarked
                    ? "bg-[#B85D36] text-white border-[#B85D36] font-black"
                    : "bg-[#F6F1E7] dark:bg-[#102017] text-[#1F2A22] dark:text-[#F6F1E7] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#E4DCCB] dark:hover:bg-[#1A2920]"
                )}
              >
                {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                <span>{bookmarked ? 'Saved Offline' : 'Bookmark Season'}</span>
              </button>

              <Link
                to="/tracker"
                className="bg-[#2C4A3E] hover:bg-[#1F352C] dark:bg-[#B85D36] dark:hover:bg-[#A34F2C] text-white font-mono font-bold px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Activity size={14} />
                <span>Exodus Roadmap</span>
              </Link>
            </div>
          </div>

          {/* Perspective Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E4DCCB] dark:border-[#283C30]">
            <div className="flex flex-wrap items-center gap-1.5 bg-[#F6F1E7] dark:bg-[#102017] p-1 rounded-xl border border-[#E4DCCB] dark:border-[#283C30]">
              {([
                { id: 'tasks', label: '01. Monthly Tasks & Season Dial' },
                { id: 'telemetry', label: '02. District Micro-Climate & Soil Telemetry' },
                { id: 'analytics', label: '03. Regional Rainfall & Temp Analytics' },
              ] as const).map((tab) => {
                const active = activePerspective === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePerspective(tab.id)}
                    className={cn(
                      'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                      active
                        ? 'bg-[#B85D36] text-white shadow-xs font-bold'
                        : 'text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#FFFDF8] dark:hover:bg-[#17241C]'
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

      {/* 2. Interactive Season Gauge / Dial */}
      <SeasonGaugeDial 
        activeSeason={activeSeasonKey}
        onSelectSeason={(newSeason) => setActiveSeasonKey(newSeason)}
      />

      {/* 4. Urgent Season Countdown / Alert Banner */}
      {topUrgentTask && (
        <UrgentSeasonAlert 
          urgentTaskTitle={topUrgentTask.title}
          urgentNotice={topUrgentTask.urgencyNotice || `${topUrgentTask.daysRemainingEstimate || 14} Days to Seasonal Window Closing: Finalize ${topUrgentTask.title}`}
          daysRemaining={topUrgentTask.daysRemainingEstimate || 14}
          calculatorTab={topUrgentTask.calculatorLink?.tab}
          calculatorLabel={topUrgentTask.calculatorLink?.label}
          fieldGuideSkillId={topUrgentTask.fieldGuideLink?.skillId}
        />
      )}

      {/* Perspective 03: Regional Rainfall & Temperature Analytics (Recharts) */}
      {activePerspective === 'analytics' && (
        <section aria-label="Regional Rainfall and Temperature Analytics">
          <RegionalClimateChart 
            initialDistrict={selectedDistrict}
            onDistrictSelect={(dKey) => {
              setSelectedDistrict(dKey);
              const matchedZone = MICROCLIMATE_ZONES.find(z => 
                z.districts.some(d => d.toLowerCase().includes(dKey) || dKey.includes(d.toLowerCase()))
              );
              if (matchedZone) setSelectedZone(matchedZone);
            }}
          />
        </section>
      )}

      {/* Perspective 02: District Micro-Climate & Soil Readiness Telemetry */}
      {activePerspective === 'telemetry' && (
        <>
          <HomesteadTelemetryBanner 
            telemetry={districtTelemetry}
            activeSeasonKey={activeSeasonKey}
          />

          <DistrictMicroclimateSelector 
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(dKey) => {
              setSelectedDistrict(dKey);
              const matchedZone = MICROCLIMATE_ZONES.find(z => 
                z.districts.some(d => d.toLowerCase().includes(dKey) || dKey.includes(d.toLowerCase()))
              );
              if (matchedZone) setSelectedZone(matchedZone);
            }}
          />

          <RegionalClimateChart 
            initialDistrict={selectedDistrict}
            onDistrictSelect={(dKey) => {
              setSelectedDistrict(dKey);
              const matchedZone = MICROCLIMATE_ZONES.find(z => 
                z.districts.some(d => d.toLowerCase().includes(dKey) || dKey.includes(d.toLowerCase()))
              );
              if (matchedZone) setSelectedZone(matchedZone);
            }}
          />

          <ClimateTelemetry 
            initialDistrict={selectedDistrict}
            onDistrictChange={(dKey) => {
              setSelectedDistrict(dKey);
              const matchedZone = MICROCLIMATE_ZONES.find(z => 
                z.districts.some(d => d.toLowerCase().includes(dKey) || dKey.includes(d.toLowerCase()))
              );
              if (matchedZone) setSelectedZone(matchedZone);
            }}
          />
        </>
      )}

      {/* Perspective 01: Prioritization Buckets & Domain Filter Bar */}
      {activePerspective === 'tasks' && (
      <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] flex items-center gap-2">
              <CheckCircle2 size={22} className="text-[#2C4A3E] dark:text-[#7EA28C]" />
              Actionable Operations for {activeSeasonKey}
            </h3>
            <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] font-medium mt-0.5">
              Checking off tasks automatically boosts your <strong>Homestead Readiness Score</strong> and syncs with your Exodus Roadmap.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6458] dark:text-[#9FB3A4]" />
            <input
              type="text"
              placeholder="Search tasks, tools, crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFDF8] dark:bg-[#132018] pl-9 pr-4 py-2 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs font-medium text-[#1F2A22] dark:text-[#F6F1E7] placeholder:text-[#5A6458] dark:placeholder:text-[#7A8E80] focus:outline-none focus:ring-1 focus:ring-[#B85D36]"
            />
          </div>
        </div>

        {/* Priority Action Buckets */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setPriorityFilter('all')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer",
              priorityFilter === 'all'
                ? "bg-[#1F2A22] dark:bg-[#FFFDF8] text-white dark:text-[#0E1712] border-[#1F2A22] dark:border-[#FFFDF8] shadow-xs"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <span>All Priorities ({priorityCounts.all})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('urgent')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer",
              priorityFilter === 'urgent'
                ? "bg-[#B85D36] text-white border-[#B85D36] shadow-xs font-bold"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#B85D36] dark:text-[#E2875A] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <AlertTriangle size={13} className="text-[#B85D36] dark:text-[#E2875A]" />
            <span>Urgent Windows ({priorityCounts.urgent})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('high')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer",
              priorityFilter === 'high'
                ? "bg-[#2C4A3E] dark:bg-[#3D6354] text-white border-[#2C4A3E] shadow-xs"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#2C4A3E] dark:text-[#7EA28C] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Sprout size={13} className="text-[#2C4A3E] dark:text-[#7EA28C]" />
            <span>High Priority ({priorityCounts.high})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('upcoming')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all border flex items-center gap-1.5 cursor-pointer",
              priorityFilter === 'upcoming'
                ? "bg-[#4A5D6E] text-white border-[#4A5D6E] shadow-xs"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#4A5D6E] dark:text-[#9FB1C1] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Clock size={13} className="text-[#4A5D6E] dark:text-[#9FB1C1]" />
            <span>Upcoming ({priorityCounts.upcoming})</span>
          </button>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[#E4DCCB] dark:border-[#283C30]">
          <button
            onClick={() => setDomainFilter('all')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer",
              domainFilter === 'all'
                ? "bg-[#2C4A3E] text-white border-[#2C4A3E]"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            All Domains ({domainCounts.all})
          </button>

          <button
            onClick={() => setDomainFilter('water')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1 cursor-pointer",
              domainFilter === 'water'
                ? "bg-[#2C4A3E] text-white border-[#2C4A3E]"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Droplets size={12} />
            <span>Water Systems ({domainCounts.water})</span>
          </button>

          <button
            onClick={() => setDomainFilter('soil')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1 cursor-pointer",
              domainFilter === 'soil'
                ? "bg-[#2C4A3E] text-white border-[#2C4A3E]"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Sprout size={12} />
            <span>Soil &amp; Compost ({domainCounts.soil})</span>
          </button>

          <button
            onClick={() => setDomainFilter('fruit-trees')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1 cursor-pointer",
              domainFilter === 'fruit-trees'
                ? "bg-[#B85D36] text-white border-[#B85D36]"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Trees size={12} />
            <span>Fruit Trees &amp; Guilds ({domainCounts['fruit-trees']})</span>
          </button>

          <button
            onClick={() => setDomainFilter('crops')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1 cursor-pointer",
              domainFilter === 'crops'
                ? "bg-[#B85D36] text-white border-[#B85D36]"
                : "bg-[#FFFDF8] dark:bg-[#132018] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#F6F1E7] dark:hover:bg-[#1C2E23]"
            )}
          >
            <Wheat size={12} />
            <span>Field Crops &amp; Grains ({domainCounts.crops})</span>
          </button>
        </div>

        {/* 7. Actionable Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          {filteredTasks.length === 0 ? (
            <div className="col-span-2 bg-white dark:bg-[#0D1D13] p-8 rounded-3xl border border-stone-200 dark:border-emerald-900/60 text-center flex flex-col items-center justify-center gap-3">
              <Sprout size={32} className="text-emerald-700 dark:text-emerald-400 opacity-60" />
              <h4 className="serif text-xl font-bold text-stone-800 dark:text-stone-100">No tasks match your selected filter</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md">
                Try clearing the priority or domain filters to view all actionable tasks for {activeSeasonKey}.
              </p>
              <button
                onClick={() => {
                  setPriorityFilter('all');
                  setDomainFilter('all');
                  setSearchQuery('');
                }}
                className="bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <ActionableTaskCard 
                key={task.id}
                task={task}
                selectedDistrict={selectedDistrict}
              />
            ))
          )}
        </div>
      </section>

      {/* 8. Offline Field Notes Section */}
      <section className="bg-[#FFFDF8] dark:bg-[#17241C] text-[#1F2A22] dark:text-[#F6F1E7] rounded-2xl p-6 sm:p-8 border border-[#E4DCCB] dark:border-[#283C30] shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCCB] dark:border-[#283C30] pb-4">
          <div>
            <span className="text-xs font-sans font-semibold text-[#B85D36] dark:text-[#E2875A]">
              Steward Field Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] mt-0.5">
              Offline Field Notes for {activeSeasonKey}
            </h3>
            <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] font-medium mt-1">
              Record local weather observations, soil moisture, and planting dates offline in the field.
            </p>
          </div>

          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="bg-[#B85D36] hover:bg-[#A34F2C] text-white text-xs font-sans font-semibold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus size={14} /> Add Field Note
          </button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleAddNote} className="bg-[#F6F1E7] dark:bg-[#102017] p-5 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-3">
            <input
              type="text"
              placeholder="Note Title (e.g., Dedza first rain observation - 30mm recorded)"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-white dark:bg-[#17241C] text-[#1F2A22] dark:text-[#FFFDF8] px-4 py-2.5 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs font-medium focus:outline-none focus:ring-1 ring-[#B85D36]"
            />
            <textarea
              placeholder="Observation content or reminders..."
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="bg-white dark:bg-[#17241C] text-[#1F2A22] dark:text-[#FFFDF8] p-4 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs font-medium focus:outline-none focus:ring-1 ring-[#B85D36]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#E4DCCB] dark:hover:bg-[#1E3024] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#B85D36] hover:bg-[#A34F2C] text-white px-5 py-2 rounded-xl text-xs font-sans font-semibold shadow-xs cursor-pointer transition-colors"
              >
                Save Note Offline
              </button>
            </div>
          </form>
        )}

        {notes.length === 0 ? (
          <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] italic bg-[#F6F1E7] dark:bg-[#102017] p-4 rounded-xl border border-[#E4DCCB] dark:border-[#283C30]">
            No offline notes logged for {activeSeasonKey} yet. Click &ldquo;Add Field Note&rdquo; above to write down local observations.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-[#F6F1E7]/70 dark:bg-[#102017] p-4 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-[#1F2A22] dark:text-[#FFFDF8]">{note.title}</h5>
                    <span className="text-xs font-mono text-[#5A6458] dark:text-[#9FB3A4]">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] mt-1 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="self-end text-rose-600 dark:text-rose-400 hover:underline text-xs font-semibold flex items-center gap-1 pt-2 cursor-pointer"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 9. District Meteorological & Microclimate Anomaly Section */}
      <section className="bg-[#FFFDF8] dark:bg-[#17241C] text-[#1F2A22] dark:text-[#F6F1E7] rounded-2xl p-6 sm:p-8 border border-[#E4DCCB] dark:border-[#283C30] shadow-xs flex flex-col gap-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E4DCCB] dark:border-[#283C30] pb-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-semibold text-[#B85D36] dark:text-[#E2875A]">
              <span>DCCMS Meteorological Data Cross-Check</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4] font-normal">Target District: {selectedDistrict}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">District Microclimate Variations</h3>
            <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#9FB3A4] font-medium max-w-2xl leading-relaxed">
              Where the national calendar adjusts for local weather realities: lakeshore dry spells, highland winter frost, Chiperoni mists, and Lower Shire heat waves.
            </p>
          </div>
        </div>

        {/* Microclimate Zone Tabs */}
        <div className="flex flex-wrap gap-2">
          {MICROCLIMATE_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            const isUserZone = zone.districts.some(d => d.toLowerCase().includes(selectedDistrict));

            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer",
                  isSelected
                    ? "bg-[#B85D36] text-white border-[#B85D36] font-bold shadow-xs"
                    : "bg-[#F6F1E7] dark:bg-[#102017] text-[#5A6458] dark:text-[#9FB3A4] border-[#E4DCCB] dark:border-[#283C30] hover:bg-[#E4DCCB] dark:hover:bg-[#1E3024]"
                )}
              >
                <Compass size={14} className={isSelected ? "text-white" : "text-[#2C4A3E] dark:text-[#7EA28C]"} />
                <span>{zone.name}</span>
                {isUserZone && (
                  <span className="text-caption font-mono font-bold opacity-85">
                    · Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Microclimate Details Box */}
        <motion.div
          key={selectedZone.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F6F1E7]/70 dark:bg-[#102017] rounded-xl p-6 border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4DCCB] dark:border-[#283C30] pb-4">
            <div>
              <span className="text-[#B85D36] dark:text-[#E2875A] text-xs font-sans font-semibold block mb-0.5">
                District Coverage: {selectedZone.districts.join(', ')}
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">{selectedZone.name}</h4>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono tabular-nums">
              <span className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[#1F2A22] dark:text-[#F6F1E7] font-semibold">
                <CloudRain size={14} className="text-[#2C4A3E] dark:text-[#7EA28C]" /> {selectedZone.rainfallPattern}
              </span>
              <span className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[#1F2A22] dark:text-[#F6F1E7] font-semibold">
                <Thermometer size={14} className="text-[#B85D36] dark:text-[#E2875A]" /> {selectedZone.temperatureProfile}
              </span>
            </div>
          </div>

          {/* Anomaly & Warning Alert */}
          <div className="bg-[#FAF1EC] dark:bg-[#2C1F1A] border border-[#E6C3B3] dark:border-[#4D2F22] p-4 sm:p-5 rounded-xl flex items-start gap-3.5 text-[#6D2E17] dark:text-[#F3D5C8]">
            <AlertTriangle size={20} className="text-[#B85D36] dark:text-[#E2875A] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <strong className="text-[#873418] dark:text-[#E2875A] text-xs font-sans font-bold">
                Key Microclimate Anomaly &amp; Calendar Deviation
              </strong>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">{selectedZone.anomaliesAndAdvice}</p>
            </div>
          </div>

          {/* Recommended Adaptations List */}
          <div className="flex flex-col gap-2.5">
            <h5 className="text-xs font-sans font-bold text-[#1F2A22] dark:text-[#FFFDF8] flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#2C4A3E] dark:text-[#7EA28C]" /> Key Homestead Adaptations for {selectedZone.name}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedZone.keyAdaptations.map((adapt, idx) => (
                <div key={idx} className="bg-[#FFFDF8] dark:bg-[#17241C] p-3.5 rounded-xl border border-[#E4DCCB] dark:border-[#283C30] text-xs text-[#1F2A22] dark:text-[#F6F1E7] font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B85D36] dark:bg-[#E2875A] shrink-0" />
                  {adapt}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
      </>
      )}

      </div>
    </div>
  );
}
