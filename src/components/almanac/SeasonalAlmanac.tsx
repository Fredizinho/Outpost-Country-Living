import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Bookmark, BookmarkCheck, HardDrive, 
  MapPin, Search, Filter, Activity, Sparkles,
  Calendar, ShieldCheck, Snowflake
} from 'lucide-react';
import { SeasonalTag } from '@/data/skillsAndSeasons';
import { 
  getCachedSeasons, toggleOfflineBookmark, isItemBookmarked, 
  getOfflineFieldNotes, saveOfflineFieldNote, deleteOfflineFieldNote, OfflineFieldNote
} from '@/lib/offlineStorage';
import { 
  ACTIONABLE_ALMANAC_TASKS, TaskDomain, TaskPriority, 
  getTelemetryForDistrict, DistrictSeasonalTelemetry 
} from '@/data/actionableAlmanacData';
import { SeasonGaugeDial } from './SeasonGaugeDial';
import { HomesteadTelemetryBanner } from './HomesteadTelemetryBanner';
import { UrgentSeasonAlert } from './UrgentSeasonAlert';
import { DistrictMicroclimateSelector } from './DistrictMicroclimateSelector';
import { ActionableTaskCard } from './ActionableTaskCard';
import { ClimateTelemetry } from '@/components/climate/ClimateTelemetry';
import { getDistrictClimateData, DistrictClimateData } from '@/data/climateTelemetryData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export interface SeasonalAlmanacProps {
  initialDistrict?: string;
  initialSeason?: SeasonalTag;
  className?: string;
}

export function SeasonalAlmanac({
  initialDistrict,
  initialSeason,
  className
}: SeasonalAlmanacProps) {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const seasons = getCachedSeasons();

  // District Selection
  const districtParam = initialDistrict || searchParams.get('district');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (districtParam) return districtParam.toLowerCase();
    return (user?.district || 'Dedza').toLowerCase();
  });

  // Active Season Tag
  const seasonQueryParam = initialSeason || searchParams.get('season');
  const [activeSeasonKey, setActiveSeasonKey] = useState<SeasonalTag>(() => {
    if (seasonQueryParam) {
      const matched = seasons.find(s => s.season.toLowerCase() === seasonQueryParam.toLowerCase());
      if (matched) return matched.season;
    }
    return 'Hot Dry Preparation';
  });

  // Active season object
  const activeSeasonObj = useMemo(() => {
    return seasons.find(s => s.season === activeSeasonKey) || seasons[0];
  }, [seasons, activeSeasonKey]);

  // District Telemetry & Climate Data
  const districtTelemetry: DistrictSeasonalTelemetry = useMemo(() => {
    return getTelemetryForDistrict(selectedDistrict);
  }, [selectedDistrict]);

  const climateData: DistrictClimateData = useMemo(() => {
    return getDistrictClimateData(selectedDistrict);
  }, [selectedDistrict]);

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

  // Sync district parameter changes
  useEffect(() => {
    if (districtParam) {
      setSelectedDistrict(districtParam.toLowerCase());
    }
  }, [districtParam]);

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
      if (task.seasonKey !== activeSeasonKey) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (domainFilter !== 'all' && task.domain !== domainFilter) return false;
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

  // Dynamic Temperature Frost Alert Logic:
  // When active season is Cold Dry Season or district has high frost risk and winter temperatures dip
  const isWinterFrostCritical = (activeSeasonKey === 'Cold Dry Season' || climateData.frostRisk === 'High');

  return (
    <div className={cn("w-full flex flex-col gap-8 text-slate-900 font-sans", className)}>
      
      {/* 1. Header with Breadcrumb & Offline State */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-emerald-800 font-black uppercase text-caption tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 stroke-[1.75]" />
              Dynamic Action Engine
            </span>
            <span className="bg-emerald-100 text-emerald-900 text-caption font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
              <HardDrive className="w-3 h-3 stroke-[1.75]" /> Offline Synced
            </span>
            {selectedDistrict && (
              <span className="bg-amber-100 text-amber-900 text-caption font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                <MapPin className="w-3 h-3 stroke-[1.75]" /> District: {climateData.name}
              </span>
            )}
          </div>
          <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 leading-tight">
            Malawi Seasonal Almanac & Action Engine
          </h1>
          <p className="text-slate-600 max-w-3xl text-sm sm:text-base font-medium leading-relaxed">
            Directly orchestrates GIS land readiness, micro-climate telemetry, resource sizing calculators, Masterclass field manuals, and your Exodus Roadmap milestones.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
          <button
            onClick={handleBookmarkToggle}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-xs active:scale-95 cursor-pointer",
              bookmarked
                ? "bg-amber-500 text-slate-950 border-amber-400 font-black"
                : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50"
            )}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{bookmarked ? 'Saved Offline' : 'Bookmark Season'}</span>
          </button>

          <Link
            to="/tracker"
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Activity className="w-3.5 h-3.5 text-amber-400 stroke-[1.75]" />
            <span>Exodus Roadmap</span>
          </Link>
        </div>
      </header>

      {/* 2. Interactive Season Gauge / Dial */}
      <SeasonGaugeDial 
        activeSeason={activeSeasonKey}
        onSelectSeason={(newSeason) => setActiveSeasonKey(newSeason)}
      />

      {/* 3. Real-Time Homestead Telemetry Banner */}
      <HomesteadTelemetryBanner 
        telemetry={districtTelemetry}
        activeSeasonKey={activeSeasonKey}
      />

      {/* 4. High-Priority Winter Frost / Microclimate Alert if Applicable */}
      {isWinterFrostCritical && (
        <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-400/60 rounded-3xl p-5 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/40 w-11 h-11 flex items-center justify-center shrink-0">
              <Snowflake className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-400 text-slate-950 text-caption font-mono font-black uppercase px-2.5 py-0.5 rounded-full">
                  High-Priority Climate Alert
                </span>
                <span className="text-blue-200 text-xs font-mono">
                  {climateData.name} ({climateData.winterMinC}°C Cold Snaps)
                </span>
              </div>
              <h4 className="font-serif font-black text-lg text-white mt-0.5">
                Cold Valley Frost Warning & Mulching Tips
              </h4>
              <p className="text-xs text-blue-100/90 font-sans max-w-2xl mt-1 leading-relaxed">
                Cold air drainage into lower dambos creates ground frost below 1,350m. Apply 15cm straw mulch over potato & garlic root zones, and shelter nursery saplings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 relative z-10 shrink-0 self-end md:self-center">
            <Link
              to="/skills?search=frost"
              className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-mono font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Frost Defense Manual</span>
            </Link>
          </div>
        </div>
      )}

      {/* 5. Urgent Season Countdown / Alert Banner */}
      {topUrgentTask && !isWinterFrostCritical && (
        <UrgentSeasonAlert 
          urgentTaskTitle={topUrgentTask.title}
          urgentNotice={topUrgentTask.urgencyNotice || `${topUrgentTask.daysRemainingEstimate || 14} Days to Seasonal Window Closing: Finalize ${topUrgentTask.title}`}
          daysRemaining={topUrgentTask.daysRemainingEstimate || 14}
          calculatorTab={topUrgentTask.calculatorLink?.tab}
          calculatorLabel={topUrgentTask.calculatorLink?.label}
          fieldGuideSkillId={topUrgentTask.fieldGuideLink?.skillId}
        />
      )}

      {/* 6. Embedded Full Climate Telemetry Engine for Active District */}
      <ClimateTelemetry 
        initialDistrict={selectedDistrict}
        onDistrictChange={(newDist) => setSelectedDistrict(newDist)}
        showElevationSlider={true}
      />

      {/* 7. Actionable Task Engine & Domain Filters */}
      <div className="flex flex-col gap-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 w-8 h-8 flex items-center justify-center">
              <Calendar className="w-4 h-4 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-serif font-black text-xl text-slate-900">
                Actionable Seasonal Tasks ({filteredTasks.length})
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Field-tested protocols for {activeSeasonKey} in {climateData.name}
              </p>
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seasonal tasks..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <ActionableTaskCard 
              key={task.id}
              task={task}
              selectedDistrict={selectedDistrict}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeasonalAlmanac;
