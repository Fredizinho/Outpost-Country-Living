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
import { 
  ACTIONABLE_ALMANAC_TASKS, ActionableTask, TaskDomain, TaskPriority, 
  DISTRICT_TELEMETRY, getTelemetryForDistrict, DistrictSeasonalTelemetry 
} from '@/data/actionableAlmanacData';
import { SeasonGaugeDial } from '@/components/almanac/SeasonGaugeDial';
import { HomesteadTelemetryBanner } from '@/components/almanac/HomesteadTelemetryBanner';
import { UrgentSeasonAlert } from '@/components/almanac/UrgentSeasonAlert';
import { DistrictMicroclimateSelector } from '@/components/almanac/DistrictMicroclimateSelector';
import { ActionableTaskCard } from '@/components/almanac/ActionableTaskCard';
import { ClimateTelemetry } from '@/components/climate/ClimateTelemetry';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { COUNTRY_IMAGES } from '@/assets/images';

export default function SeasonalGuide() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const seasons = getCachedSeasons();
  const allSkills = getCachedSkills();

  // District Selection (supports URL param e.g. /almanac?district=Salima)
  const districtParam = searchParams.get('district');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (districtParam) return districtParam.toLowerCase();
    return (user?.district || 'Dedza').toLowerCase();
  });

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
    <div className="px-4 sm:px-6 md:px-12 py-8 max-w-7xl mx-auto flex flex-col gap-8 text-slate-900 font-sans">
      
      {/* 1. Header with Breadcrumb, Inspiring Background & Offline State */}
      <header 
        className="bg-cover bg-center text-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.90), rgba(7, 24, 14, 0.84), rgba(4, 29, 16, 0.95)), url(${COUNTRY_IMAGES.permacultureGarden})`
        }}
      >
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" />
              Year-Round Farming Calendar
            </span>
            <span className="bg-emerald-950/60 text-emerald-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
              <HardDrive size={10} /> Works Offline
            </span>
            {districtParam && (
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 border border-amber-500/30">
                <MapPin size={10} /> District: {districtParam}
              </span>
            )}
          </div>
          <h1 className="serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FAF8F5] leading-tight">
            Malawi Seasonal Almanac & Farm Calendar
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base font-medium leading-relaxed italic">
            Know exactly what to plant, mulch, prune, and harvest during every month of the Malawi farming year.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 relative z-10">
          <button
            onClick={handleBookmarkToggle}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-xs active:scale-95 cursor-pointer",
              bookmarked
                ? "bg-amber-500 text-slate-950 border-amber-400 font-black"
                : "bg-white/10 text-amber-200 border-amber-500/30 hover:bg-white/20 hover:text-white"
            )}
          >
            {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            <span>{bookmarked ? 'Saved Offline' : 'Bookmark Season'}</span>
          </button>

          <Link
            to="/tracker"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Activity size={14} className="text-slate-950" />
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

      {/* 5. District Micro-Climate & Soil Readiness Filter */}
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

      {/* 5b. Comprehensive Micro-Climate Telemetry Engine */}
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

      {/* 6. Prioritization Buckets & Domain Filter Bar */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="serif text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 size={24} className="text-emerald-700" />
              Actionable Operations for {activeSeasonKey}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Checking off tasks automatically boosts your <strong>Homestead Readiness Score</strong> and syncs with your Exodus Roadmap.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks, tools, crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Priority Action Buckets */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setPriorityFilter('all')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border flex items-center gap-1.5",
              priorityFilter === 'all'
                ? "bg-slate-900 text-white border-slate-950 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            )}
          >
            <span>All Priorities ({priorityCounts.all})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('urgent')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-mono font-black uppercase transition-all border flex items-center gap-1.5",
              priorityFilter === 'urgent'
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            )}
          >
            <AlertTriangle size={13} className="text-amber-600" />
            <span>🚨 Urgent Windows ({priorityCounts.urgent})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('high')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border flex items-center gap-1.5",
              priorityFilter === 'high'
                ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
            )}
          >
            <Sprout size={13} className="text-emerald-600" />
            <span>⚡ High Priority ({priorityCounts.high})</span>
          </button>

          <button
            onClick={() => setPriorityFilter('upcoming')}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all border flex items-center gap-1.5",
              priorityFilter === 'upcoming'
                ? "bg-sky-800 text-white border-sky-900 shadow-sm"
                : "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100"
            )}
          >
            <Clock size={13} className="text-sky-600" />
            <span>📅 Upcoming ({priorityCounts.upcoming})</span>
          </button>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          <button
            onClick={() => setDomainFilter('all')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
              domainFilter === 'all'
                ? "bg-emerald-900 text-white border-emerald-950"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            )}
          >
            All Domains ({domainCounts.all})
          </button>

          <button
            onClick={() => setDomainFilter('water')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1",
              domainFilter === 'water'
                ? "bg-sky-700 text-white border-sky-800"
                : "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100"
            )}
          >
            <Droplets size={12} />
            <span>💧 Water Systems ({domainCounts.water})</span>
          </button>

          <button
            onClick={() => setDomainFilter('soil')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1",
              domainFilter === 'soil'
                ? "bg-emerald-700 text-white border-emerald-800"
                : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
            )}
          >
            <Sprout size={12} />
            <span>🌱 Soil & Compost ({domainCounts.soil})</span>
          </button>

          <button
            onClick={() => setDomainFilter('fruit-trees')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1",
              domainFilter === 'fruit-trees'
                ? "bg-amber-700 text-white border-amber-800"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            )}
          >
            <Trees size={12} />
            <span>🌳 Fruit Trees & Guilds ({domainCounts['fruit-trees']})</span>
          </button>

          <button
            onClick={() => setDomainFilter('crops')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1",
              domainFilter === 'crops'
                ? "bg-yellow-700 text-white border-yellow-800"
                : "bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100"
            )}
          >
            <Wheat size={12} />
            <span>🌾 Field Crops & Grains ({domainCounts.crops})</span>
          </button>
        </div>

        {/* 7. Actionable Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          {filteredTasks.length === 0 ? (
            <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center gap-3">
              <Sprout size={32} className="text-emerald-700 opacity-60" />
              <h4 className="serif text-xl font-bold text-slate-800">No tasks match your selected filter</h4>
              <p className="text-xs text-slate-500 max-w-md">
                Try clearing the priority or domain filters to view all actionable tasks for {activeSeasonKey}.
              </p>
              <button
                onClick={() => {
                  setPriorityFilter('all');
                  setDomainFilter('all');
                  setSearchQuery('');
                }}
                className="bg-emerald-800 text-white text-xs font-bold uppercase px-4 py-2 rounded-xl"
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
      <section className="bg-[#142118] text-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-amber-600/30 shadow-2xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400">
                Steward Field Journal
              </span>
            </div>
            <h3 className="serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
              Offline Field Notes for {activeSeasonKey}
            </h3>
            <p className="text-xs text-emerald-200/80 font-medium mt-1">
              Record local weather observations, soil moisture, and planting dates offline in the field.
            </p>
          </div>

          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <Plus size={14} /> Add Field Note
          </button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleAddNote} className="bg-black/40 p-5 rounded-2xl border border-emerald-700/60 flex flex-col gap-3 shadow-inner">
            <input
              type="text"
              placeholder="Note Title (e.g., Dedza first rain observation - 30mm recorded)"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-slate-900/90 text-white px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 ring-amber-400"
            />
            <textarea
              placeholder="Observation content or reminders..."
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="bg-slate-900/90 text-white p-4 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 ring-amber-400"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-500 text-slate-950 px-5 py-2 rounded-xl text-xs font-black uppercase shadow-sm hover:bg-amber-400"
              >
                Save Note Offline
              </button>
            </div>
          </form>
        )}

        {notes.length === 0 ? (
          <p className="text-xs text-slate-400 italic bg-white/5 p-4 rounded-2xl border border-white/10">
            No offline notes logged for {activeSeasonKey} yet. Click "Add Field Note" above to write down local observations.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-white">{note.title}</h5>
                    <span className="text-[9px] text-slate-400 font-medium">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="self-end text-rose-400 hover:text-rose-300 text-[10px] font-bold uppercase flex items-center gap-1 pt-2"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 9. District Meteorological & Microclimate Anomaly Section */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-[3rem] p-6 sm:p-8 md:p-12 border border-emerald-800 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-800 pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
                <CloudRain size={12} className="text-cyan-400" /> DCCMS Meteorological Data Cross-Check
              </span>
              <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                <MapPin size={12} /> Target: {selectedDistrict}
              </span>
            </div>
            <h3 className="serif text-3xl md:text-4xl font-bold">District Microclimate Variations</h3>
            <p className="text-xs text-emerald-200/80 font-medium max-w-2xl leading-relaxed">
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
                  "px-4 py-2.5 rounded-2xl text-xs font-bold uppercase transition-all flex items-center gap-2 border shadow-sm",
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-300 font-black shadow-lg"
                    : "bg-emerald-900/50 text-emerald-200 border-emerald-800 hover:bg-emerald-800"
                )}
              >
                <Compass size={14} className={isSelected ? "text-slate-950" : "text-emerald-400"} />
                <span>{zone.name}</span>
                {isUserZone && (
                  <span className="bg-amber-300 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    ACTIVE
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
          className="bg-emerald-900/40 backdrop-blur-md rounded-[2.5rem] p-6 md:p-8 border border-emerald-700/60 flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div>
              <span className="text-amber-300 text-[10px] font-black uppercase tracking-widest block mb-1">
                District Coverage: {selectedZone.districts.join(', ')}
              </span>
              <h4 className="serif text-2xl font-bold text-white">{selectedZone.name}</h4>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-emerald-950/80 border border-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-200 font-bold">
                <CloudRain size={14} className="text-cyan-400" /> {selectedZone.rainfallPattern}
              </span>
              <span className="bg-emerald-950/80 border border-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-200 font-bold">
                <Thermometer size={14} className="text-amber-400" /> {selectedZone.temperatureProfile}
              </span>
            </div>
          </div>

          {/* Anomaly & Warning Alert */}
          <div className="bg-amber-950/70 border border-amber-800/80 p-5 rounded-2xl flex items-start gap-4 text-amber-100">
            <AlertTriangle size={24} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <strong className="text-amber-300 text-xs font-black uppercase tracking-wider">
                Key Microclimate Anomaly & Calendar Deviation
              </strong>
              <p className="text-xs font-medium leading-relaxed">{selectedZone.anomaliesAndAdvice}</p>
            </div>
          </div>

          {/* Recommended Adaptations List */}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" /> Key Homestead Adaptations for {selectedZone.name}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedZone.keyAdaptations.map((adapt, idx) => (
                <div key={idx} className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 text-xs text-emerald-100 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  {adapt}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
