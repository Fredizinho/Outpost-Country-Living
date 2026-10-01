import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Wrench, Clock, Sparkles, Bookmark, BookmarkCheck, 
  Plus, Trash2, HardDrive, AlertTriangle, Layers, Calendar, ArrowRight, 
  Calculator, Ruler, Zap, ShieldAlert, Scale, HelpCircle, Check, Info
} from 'lucide-react';
import { 
  getCachedSkills, toggleOfflineBookmark, isItemBookmarked, 
  getOfflineFieldNotes, saveOfflineFieldNote, deleteOfflineFieldNote, OfflineFieldNote,
  getStoredMasteredSkills, saveStoredMasteredSkills
} from '@/lib/offlineStorage';
import { SKILL_TECHNICAL_PROTOCOLS, DetailedSkillProtocol } from '@/data/skillsTechnicalProtocols';
import { cn } from '@/lib/utils';
import { CountryIcon, CountryIconName } from '@/components/icons';
import { SkillStepVectorDiagram } from '@/components/outpost/SkillStepVectorDiagram';

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const skills = getCachedSkills();

  const skill = skills.find(s => s.id === id);
  const protocol: DetailedSkillProtocol | undefined = (skill?.detailedProtocol) || (id ? SKILL_TECHNICAL_PROTOCOLS[id] : undefined);

  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<OfflineFieldNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isMastered, setIsMastered] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setBookmarked(isItemBookmarked(id, 'skill'));
      setNotes(getOfflineFieldNotes(id));
      setIsMastered(getStoredMasteredSkills().includes(id));
      
      // Load completed step state from localStorage
      try {
        const savedSteps = localStorage.getItem(`homestead_skill_steps_${id}`);
        if (savedSteps) {
          setCompletedSteps(JSON.parse(savedSteps));
        } else {
          setCompletedSteps({});
        }
      } catch (e) {
        // ignore
      }
    }
  }, [id]);

  const handleToggleMastered = () => {
    if (!id) return;
    const current = getStoredMasteredSkills();
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    saveStoredMasteredSkills(updated);
    setIsMastered(!exists);
  };

  const toggleStepCompleted = (stepNumber: number) => {
    if (!id) return;
    const updated = {
      ...completedSteps,
      [stepNumber]: !completedSteps[stepNumber]
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`homestead_skill_steps_${id}`, JSON.stringify(updated));
      const totalStepsCount = protocol ? protocol.protocol.length : (skill?.steps.length || 0);
      const completedCount = Object.values(updated).filter(Boolean).length;
      if (totalStepsCount > 0 && completedCount >= totalStepsCount && !isMastered) {
        const currentMastered = getStoredMasteredSkills();
        if (!currentMastered.includes(id)) {
          saveStoredMasteredSkills([...currentMastered, id]);
          setIsMastered(true);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  if (!skill) {
    return (
      <div className="px-6 py-20 text-center flex flex-col items-center gap-4">
        <h2 className="serif text-3xl font-bold text-emerald-950">Skill Guide Not Found</h2>
        <p className="text-slate-600 text-sm">The requested homesteading guide is not available in the offline cache.</p>
        <Link to="/skills" className="bg-emerald-800 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider">
          Back to Skills
        </Link>
      </div>
    );
  }

  const prereqSkills = skill.prerequisiteSkillIds
    ? skills.filter(s => skill.prerequisiteSkillIds?.includes(s.id))
    : [];

  const handleBookmarkToggle = () => {
    const isNowBookmarked = toggleOfflineBookmark({
      id: skill.id,
      type: 'skill',
      title: skill.title
    });
    setBookmarked(isNowBookmarked);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    saveOfflineFieldNote(skill.id, newNoteTitle, newNoteContent);
    setNotes(getOfflineFieldNotes(skill.id));
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowNoteForm(false);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteOfflineFieldNote(noteId);
    setNotes(getOfflineFieldNotes(skill.id));
  };

  return (
    <div className="px-4 md:px-10 lg:px-12 py-10 max-w-5xl mx-auto flex flex-col gap-8 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Breadcrumb & Offline Indicator */}
      <div className="flex items-center justify-between">
        <Link
          to="/skills"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-amber-300 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Skills Manual
        </Link>

        <div className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
          {protocol && (
            <span className="flex items-center gap-1 text-amber-800 dark:text-amber-300">
              <Ruler size={11} /> Full Field Protocol
            </span>
          )}
          <span className="flex items-center gap-1">
            <HardDrive size={11} /> Saved Offline
          </span>
        </div>
      </div>

      {/* Header Section */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-600 dark:text-stone-300">
            <span className="font-bold text-emerald-800 dark:text-amber-300 uppercase">
              {skill.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{skill.difficulty} Level</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {skill.timeToMaster}
            </span>
            {skill.seasonalTag && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-300 font-semibold">
                  <Calendar size={12} /> {skill.seasonalTag}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleToggleMastered}
              className={cn(
                "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-xs active:scale-95 cursor-pointer",
                isMastered
                  ? "bg-emerald-700 text-white border-emerald-600"
                  : "bg-white dark:bg-[#0D1D13] text-stone-800 dark:text-stone-200 border-stone-200 dark:border-emerald-800/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
              )}
            >
              <CheckCircle2 size={16} className={cn(isMastered ? "text-amber-300" : "text-emerald-700 dark:text-emerald-400")} />
              {isMastered ? 'Skill Mastered (Synced)' : 'Mark Skill Mastered'}
            </button>

            <button
              onClick={handleBookmarkToggle}
              className={cn(
                "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-xs active:scale-95 cursor-pointer",
                bookmarked
                  ? "bg-amber-500 text-stone-950 border-amber-400"
                  : "bg-white dark:bg-[#0D1D13] text-emerald-900 dark:text-emerald-200 border-stone-200 dark:border-emerald-800/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
              )}
            >
              {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {bookmarked ? 'Bookmarked' : 'Save Bookmark'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white dark:bg-[#0D1D13] p-5 sm:p-7 rounded-[2rem] border border-[#E6DFD1] dark:border-emerald-900/60 shadow-sm">
          <div className="lg:col-span-7 flex flex-col gap-2">
            <h1 className="serif text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              {skill.title}
            </h1>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed mt-1">
              {skill.description}
            </p>
          </div>
          {skill.iconName && (
            <div className="lg:col-span-5 w-full rounded-2xl bg-[#06140C] border border-emerald-800/60 p-2 shadow-md overflow-hidden flex flex-col gap-1.5">
              <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden">
                <CountryIcon name={skill.iconName as CountryIconName} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-0.5 flex items-center justify-between text-[10px] font-mono text-emerald-300/90">
                <span>FIELD MANUAL PLATE • {skill.category.toUpperCase()}</span>
                <span className="text-amber-300 font-bold">{skill.difficulty.toUpperCase()}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Visual Skill Blueprint, Ready Field Photography & Connected Step Flowchart */}
      <SkillStepVectorDiagram
        skillId={skill.id}
        title={skill.title}
        category={skill.category}
        steps={skill.steps}
        toolsNeeded={skill.toolsNeeded}
      />

      {/* Dynamic Contextual Action Bar: Calculator & Seasonal Almanac Shortcuts */}
      {protocol && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Related Calculator Shortcut */}
          <Link
            to={`/calculators?tab=${protocol.calculator.tab}`}
            className="group bg-linear-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl border border-emerald-800/80 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-700 group-hover:scale-105 transition-transform">
                <Calculator size={24} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                    Interactive Engineering Tool
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
                  {protocol.calculator.title}
                </h4>
                <p className="text-xs text-emerald-200/80 mt-1 line-clamp-2">
                  {protocol.calculator.hint}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} className="text-emerald-200" />
            </div>
          </Link>

          {/* Seasonal Almanac Shortcut */}
          <Link
            to={`/almanac?season=${encodeURIComponent(protocol.almanac.season)}`}
            className="group bg-linear-to-br from-amber-900 to-amber-950 text-white p-6 rounded-3xl border border-amber-800/80 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-800/80 text-amber-300 flex items-center justify-center shrink-0 border border-amber-700 group-hover:scale-105 transition-transform">
                <Calendar size={24} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    Seasonal Timing & Almanac
                  </span>
                  <span className="text-[9px] bg-amber-800/80 px-2 py-0.5 rounded text-amber-200 font-bold">
                    {protocol.almanac.monthWindow}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  {protocol.almanac.label}
                </h4>
                <p className="text-xs text-amber-200/80 mt-1 line-clamp-2">
                  {protocol.almanac.targetAction}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} className="text-amber-200" />
            </div>
          </Link>
        </section>
      )}

      {/* SECTION 1: 📐 Technical Blueprint & Metrics */}
      {protocol ? (
        <section className="bg-white dark:bg-[#0D1D13] p-6 md:p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0">
                <Ruler size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-amber-300">
                  Engineering Specifications
                </span>
                <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                  📐 Technical Blueprint & Field Metrics
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
              Precision Standards
            </span>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {protocol.blueprint.metrics.map((metric, idx) => (
              <div 
                key={idx}
                className="bg-stone-50 dark:bg-[#14281D] p-4 rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-1 shadow-2xs"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {metric.label}
                </span>
                <div className="text-base md:text-lg font-black text-emerald-950 dark:text-amber-300 my-0.5 tabular-nums">
                  {metric.value}
                </div>
                <p className="text-[10px] font-medium text-stone-600 dark:text-stone-300 leading-tight">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Dimensions, Ratios & Sizing Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-800/50 flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                <Scale size={14} className="text-amber-800 dark:text-amber-400" /> Dimensions, Ratios & Sizing Formulas
              </span>
              <ul className="flex flex-col gap-2">
                {protocol.blueprint.dimensionsAndRatios.map((item, idx) => (
                  <li key={idx} className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                <Calculator size={14} className="text-emerald-800 dark:text-emerald-400" /> Sizing Formulas & Capacity Math
              </span>
              <ul className="flex flex-col gap-2">
                {protocol.blueprint.sizingFormulas.map((item, idx) => (
                  <li key={idx} className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* SECTION 2: 🛠️ Field Tools & Materials Needed */}
      {protocol ? (
        <section className="bg-white dark:bg-[#0D1D13] p-6 md:p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center border border-amber-200 dark:border-amber-800 shrink-0">
                <Wrench size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  Local Malawian Inputs & Equipment
                </span>
                <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                  🛠️ Field Tools & Materials Matrix
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300">
              {protocol.materials.length} Required Inputs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {protocol.materials.map((mat, idx) => (
              <div 
                key={idx}
                className="bg-stone-50 dark:bg-[#14281D] p-4 rounded-2xl border border-stone-200 dark:border-emerald-900/60 flex flex-col justify-between gap-2 shadow-2xs hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {mat.name}
                  </h4>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 shrink-0">
                    {mat.localAvailability}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-stone-600 dark:text-stone-300 leading-relaxed">
                  <strong className="text-stone-800 dark:text-stone-100">Purpose:</strong> {mat.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Fallback Tools Section if protocol is not loaded */
        <section className="bg-white dark:bg-[#0D1D13] p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Wrench className="text-emerald-700 dark:text-amber-400" size={22} /> Required Equipment & Materials
          </h3>
          <div className="flex flex-wrap gap-2">
            {skill.toolsNeeded.map((tool, idx) => (
              <span key={idx} className="bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 px-4 py-2 rounded-2xl text-xs font-bold text-stone-800 dark:text-stone-200">
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Before You Start - Prerequisites Note & Chain */}
      <section className="bg-amber-50/90 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-800/50 p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-amber-950 dark:text-amber-200 font-bold text-sm">
          <span className="bg-amber-600 text-white p-2 rounded-xl shadow-xs">
            <Layers size={18} />
          </span>
          <span className="serif text-xl font-bold text-amber-950 dark:text-amber-100">BEFORE YOU START — Recommended Prerequisites</span>
        </div>

        {skill.prerequisiteNote && (
          <p className="text-xs md:text-sm font-semibold text-amber-950 dark:text-amber-100 leading-relaxed bg-white/80 dark:bg-[#14281D] p-4 rounded-2xl border border-amber-200/90 dark:border-amber-800/60 shadow-2xs">
            {skill.prerequisiteNote}
          </p>
        )}

        {prereqSkills.length > 0 ? (
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Prerequisite Homestead Skills to Master First:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prereqSkills.map(prereq => (
                <Link
                  key={prereq.id}
                  to={`/skills/${prereq.id}`}
                  className="bg-white dark:bg-[#0D1D13] hover:bg-amber-100/60 dark:hover:bg-emerald-950/60 p-4 rounded-2xl border border-amber-200/90 dark:border-emerald-800/60 flex items-center justify-between group transition-all shadow-xs"
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800 dark:text-amber-300">
                      {prereq.category} · {prereq.difficulty} Level
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-amber-200">
                      {prereq.title}
                    </h4>
                  </div>
                  <ArrowRight size={16} className="text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" /> No prior homesteading skills required — ideal standalone skill for beginners!
          </div>
        )}
      </section>

      {/* SECTION 3: ⚡ Step-by-Step Execution Protocol */}
      {protocol ? (
        <section className="bg-white dark:bg-[#0D1D13] p-6 md:p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-emerald-900/40 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0">
                <Zap size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-amber-300">
                  Sequential Field Instructions
                </span>
                <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                  ⚡ Step-by-Step Execution Protocol
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300">
              {protocol.protocol.length} Sequential Steps
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {protocol.protocol.map((step) => {
              const isDone = !!completedSteps[step.stepNumber];
              return (
                <div 
                  key={step.stepNumber}
                  className={cn(
                    "p-5 rounded-2xl border transition-all shadow-2xs flex flex-col gap-3",
                    isDone 
                      ? "bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700" 
                      : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/70 dark:border-emerald-900/40 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleStepCompleted(step.stepNumber)}
                        className={cn(
                          "w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all cursor-pointer",
                          isDone 
                            ? "bg-emerald-700 text-white shadow-xs" 
                            : "bg-white dark:bg-[#0D1D13] text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900"
                        )}
                        title={isDone ? "Mark Incomplete" : "Mark Step Completed"}
                      >
                        {isDone ? <Check size={14} /> : step.stepNumber}
                      </button>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                        {step.phase}
                      </span>
                      <h4 className={cn("text-sm font-bold text-stone-900 dark:text-stone-100", isDone && "line-through text-stone-500 dark:text-stone-400")}>
                        {step.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} /> {step.timing}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{step.seasonalWindow}</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                    {step.instructions}
                  </p>

                  <div className="bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/90 dark:border-amber-800/50 flex items-start gap-2.5">
                    <ShieldAlert size={14} className="text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-amber-950 dark:text-amber-200 leading-tight">
                      <strong className="text-amber-900 dark:text-amber-300 uppercase">Critical Check:</strong> {step.criticalCheck}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* Fallback Step-by-Step Instructions */
        <section className="bg-white dark:bg-[#0D1D13] p-8 md:p-10 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
          <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-700 dark:text-emerald-400" size={22} /> Execution Steps
          </h3>

          <div className="flex flex-col gap-4">
            {skill.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-stone-50 dark:bg-[#14281D] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
                <span className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs md:text-sm font-semibold text-stone-800 dark:text-stone-200 leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: ⚠️ Common Pitfalls & Field Troubleshooting */}
      {protocol ? (
        <section className="bg-amber-950 text-amber-100 p-6 md:p-8 rounded-[2.5rem] border border-amber-800/80 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-amber-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-900 text-amber-300 flex items-center justify-center border border-amber-700 shrink-0">
                <AlertTriangle size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Mistakes to Avoid & Real-World Diagnostics
                </span>
                <h3 className="serif text-2xl font-bold text-white">
                  ⚠️ Common Pitfalls & Field Troubleshooting
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-300">
              Field Diagnostics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {protocol.troubleshooting.map((item, idx) => (
              <div 
                key={idx}
                className="bg-amber-900/40 p-5 rounded-2xl border border-amber-800/80 flex flex-col gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                    !
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {item.pitfall}
                  </h4>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-amber-200/90 pl-8">
                  <p>
                    <strong className="text-amber-400">Symptom:</strong> {item.symptom}
                  </p>
                  <p>
                    <strong className="text-amber-400">Root Cause:</strong> {item.rootCause}
                  </p>
                  <div className="bg-emerald-950/80 text-emerald-200 p-2.5 rounded-xl border border-emerald-700/60 mt-1">
                    <strong className="text-emerald-300">Actionable Field Remedy:</strong> {item.fieldRemedy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : skill.commonMistakes && skill.commonMistakes.length > 0 ? (
        <section className="bg-amber-950/90 text-amber-100 p-8 md:p-10 rounded-[2.5rem] border border-amber-800 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-300 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-400" /> Crucial First-Timer Warnings
            </span>
          </div>

          <h3 className="serif text-2xl md:text-3xl font-bold text-white">
            Common First-Timer Mistakes to Avoid
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skill.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="bg-amber-900/60 p-5 rounded-2xl border border-amber-800/80 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                  !
                </span>
                <p className="text-xs font-semibold leading-relaxed text-amber-100">
                  {mistake}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Subskills & Core Technical Competencies */}
      {skill.subskills && skill.subskills.length > 0 && (
        <section className="bg-white dark:bg-[#0D1D13] p-6 md:p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
              <Layers className="text-amber-700 dark:text-amber-400" size={22} /> Core Subskills & Technical Modules
            </h3>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300">
              {skill.subskills.length} Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skill.subskills.map((sub, idx) => (
              <div 
                key={sub.id || idx}
                className="bg-stone-50 dark:bg-[#14281D] p-5 rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 shadow-2xs flex flex-col gap-2 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-emerald-950 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-800">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {sub.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed pl-9">
                  {sub.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inspired Counsel Callout */}
      <div className="bg-emerald-900 dark:bg-[#0F2418] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col gap-2 border border-emerald-800">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={16} /> Inspired Principle
        </div>
        <p className="serif text-xl italic font-semibold text-emerald-100">
          "{skill.inspiredCounsel}"
        </p>
      </div>

      {/* Field Notes Section */}
      <section className="bg-white dark:bg-[#0D1D13] p-6 md:p-8 rounded-[2.5rem] border border-stone-200 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="serif text-2xl font-bold text-stone-900 dark:text-stone-50">
              Offline Field Log & Personal Reminders
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium mt-1">
              Store custom notes, local vendor contacts, or tool adjustments directly on your device.
            </p>
          </div>
          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Note
          </button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleAddNote} className="bg-stone-50 dark:bg-[#14281D] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Note Title (e.g., Solar pump supplier in Kasungu)"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-white dark:bg-[#0B1810] text-stone-900 dark:text-stone-100 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-emerald-800/70 text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <textarea
              placeholder="Notes or measurements..."
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="bg-white dark:bg-[#0B1810] text-stone-900 dark:text-stone-100 p-4 rounded-xl border border-stone-300 dark:border-emerald-800/70 text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 cursor-pointer"
              >
                Save Note Offline
              </button>
            </div>
          </form>
        )}

        {notes.length === 0 ? (
          <p className="text-xs text-stone-500 dark:text-stone-400 italic bg-stone-50 dark:bg-[#14281D] p-4 rounded-2xl border border-stone-200/70 dark:border-emerald-900/50">
            No offline notes logged for this skill guide yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-stone-50 dark:bg-[#14281D] p-4 rounded-2xl border border-stone-200 dark:border-emerald-900/60 shadow-2xs flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-stone-900 dark:text-stone-100">{note.title}</h5>
                    <span className="text-[10px] font-mono text-stone-400">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="self-end text-rose-600 dark:text-rose-400 hover:text-rose-800 text-[10px] font-bold uppercase flex items-center gap-1 pt-2 cursor-pointer"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
