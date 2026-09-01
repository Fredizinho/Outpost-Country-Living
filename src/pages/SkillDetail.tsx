import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Wrench, Clock, Sparkles, Bookmark, BookmarkCheck, 
  Plus, Trash2, HardDrive, AlertTriangle, Layers, Calendar, ArrowRight, 
  Calculator, Ruler, Zap, ShieldAlert, Scale, HelpCircle, Check, Info
} from 'lucide-react';
import { 
  getCachedSkills, toggleOfflineBookmark, isItemBookmarked, 
  getOfflineFieldNotes, saveOfflineFieldNote, deleteOfflineFieldNote, OfflineFieldNote 
} from '@/lib/offlineStorage';
import { SKILL_TECHNICAL_PROTOCOLS, DetailedSkillProtocol } from '@/data/skillsTechnicalProtocols';
import { cn } from '@/lib/utils';
import { CountryIcon, CountryIconName } from '@/components/icons';

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

  useEffect(() => {
    if (id) {
      setBookmarked(isItemBookmarked(id, 'skill'));
      setNotes(getOfflineFieldNotes(id));
      
      // Load completed step state from localStorage
      try {
        const savedSteps = localStorage.getItem(`homestead_skill_steps_${id}`);
        if (savedSteps) {
          setCompletedSteps(JSON.parse(savedSteps));
        }
      } catch (e) {
        // ignore
      }
    }
  }, [id]);

  const toggleStepCompleted = (stepNumber: number) => {
    if (!id) return;
    const updated = {
      ...completedSteps,
      [stepNumber]: !completedSteps[stepNumber]
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`homestead_skill_steps_${id}`, JSON.stringify(updated));
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
    <div className="px-4 md:px-10 lg:px-12 py-10 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Top Breadcrumb & Offline Indicator */}
      <div className="flex items-center justify-between">
        <Link
          to="/skills"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-800 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Skills Manual
        </Link>

        <div className="flex items-center gap-2">
          {protocol && (
            <span className="bg-amber-100 text-amber-900 text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-300">
              <Ruler size={10} /> Full Field Protocol
            </span>
          )}
          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
            <HardDrive size={10} /> Saved Offline
          </span>
        </div>
      </div>

      {/* Header Section */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {skill.category}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {skill.difficulty} Level
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200">
              <Clock size={12} /> {skill.timeToMaster}
            </span>
            {skill.seasonalTag && (
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Calendar size={12} className="text-amber-700" /> Season: {skill.seasonalTag}
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkToggle}
            className={cn(
              "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-md active:scale-95",
              bookmarked
                ? "bg-amber-500 text-white border-amber-600"
                : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50"
            )}
          >
            {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {bookmarked ? 'Saved to Offline Bookmarks' : 'Save Offline Bookmark'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {skill.iconName && (
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white border border-[#E6DFD1] p-2 shadow-xs overflow-hidden flex items-center justify-center">
              <CountryIcon name={skill.iconName as CountryIconName} className="w-full h-full" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="serif text-3xl md:text-5xl font-bold text-emerald-950 leading-tight">
              {skill.title}
            </h1>
            <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed mt-2">
              {skill.description}
            </p>
          </div>
        </div>
      </header>

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
        <section className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center border border-indigo-200 shrink-0">
                <Ruler size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-800">
                  Engineering Specifications
                </span>
                <h3 className="serif text-2xl font-bold text-slate-900">
                  📐 Technical Blueprint & Field Metrics
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-indigo-200">
              Precision Standards
            </span>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {protocol.blueprint.metrics.map((metric, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-1 shadow-2xs"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {metric.label}
                </span>
                <div className="text-base md:text-lg font-black text-indigo-950 my-0.5">
                  {metric.value}
                </div>
                <p className="text-[10px] font-medium text-slate-600 leading-tight">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Dimensions, Ratios & Sizing Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-950 flex items-center gap-1.5">
                <Scale size={14} className="text-amber-800" /> Dimensions, Ratios & Sizing Formulas
              </span>
              <ul className="flex flex-col gap-2">
                {protocol.blueprint.dimensionsAndRatios.map((item, idx) => (
                  <li key={idx} className="text-xs font-semibold text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-950 flex items-center gap-1.5">
                <Calculator size={14} className="text-emerald-800" /> Sizing Formulas & Capacity Math
              </span>
              <ul className="flex flex-col gap-2">
                {protocol.blueprint.sizingFormulas.map((item, idx) => (
                  <li key={idx} className="text-xs font-semibold text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
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
        <section className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200 shrink-0">
                <Wrench size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                  Local Malawian Inputs & Equipment
                </span>
                <h3 className="serif text-2xl font-bold text-slate-900">
                  🛠️ Field Tools & Materials Matrix
                </h3>
              </div>
            </div>
            <span className="bg-amber-50 text-amber-800 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-200">
              {protocol.materials.length} Required Inputs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {protocol.materials.map((mat, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 shadow-2xs hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    {mat.name}
                  </h4>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md shrink-0 border border-emerald-200">
                    {mat.localAvailability}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Purpose:</strong> {mat.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Fallback Tools Section if protocol is not loaded */
        <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <Wrench className="text-emerald-700" size={22} /> Required Equipment & Materials
          </h3>
          <div className="flex flex-wrap gap-2">
            {skill.toolsNeeded.map((tool, idx) => (
              <span key={idx} className="bg-white border border-slate-200 px-4 py-2 rounded-2xl text-xs font-bold text-slate-800 shadow-sm">
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Before You Start - Prerequisites Note & Chain */}
      <section className="bg-amber-50/90 border border-amber-300/80 p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-950 font-bold text-sm">
          <span className="bg-amber-600 text-white p-2 rounded-xl shadow-xs">
            <Layers size={18} />
          </span>
          <span className="serif text-xl font-bold text-amber-950">BEFORE YOU START — Recommended Prerequisites</span>
        </div>

        {skill.prerequisiteNote && (
          <p className="text-xs md:text-sm font-semibold text-amber-950 leading-relaxed bg-amber-100/90 p-4 rounded-2xl border border-amber-200/90 shadow-2xs">
            {skill.prerequisiteNote}
          </p>
        )}

        {prereqSkills.length > 0 ? (
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
              Prerequisite Homestead Skills to Master First:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prereqSkills.map(prereq => (
                <Link
                  key={prereq.id}
                  to={`/skills/${prereq.id}`}
                  className="bg-white hover:bg-amber-100/60 p-4 rounded-2xl border border-amber-200/90 flex items-center justify-between group transition-all shadow-xs hover:shadow-md"
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">
                      {prereq.category} • {prereq.difficulty} Level
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                      {prereq.title}
                    </h4>
                  </div>
                  <ArrowRight size={16} className="text-amber-700 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> No prior homesteading skills required — ideal standalone skill for beginners!
          </div>
        )}
      </section>

      {/* SECTION 3: ⚡ Step-by-Step Execution Protocol */}
      {protocol ? (
        <section className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center border border-emerald-200 shrink-0">
                <Zap size={20} />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                  Sequential Field Instructions
                </span>
                <h3 className="serif text-2xl font-bold text-slate-900">
                  ⚡ Step-by-Step Execution Protocol
                </h3>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-emerald-200">
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
                    "p-5 rounded-2xl border transition-all shadow-xs flex flex-col gap-3",
                    isDone 
                      ? "bg-emerald-50/80 border-emerald-300" 
                      : "bg-white border-slate-200"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleStepCompleted(step.stepNumber)}
                        className={cn(
                          "w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                          isDone 
                            ? "bg-emerald-700 text-white shadow-xs" 
                            : "bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800"
                        )}
                        title={isDone ? "Mark Incomplete" : "Mark Step Completed"}
                      >
                        {isDone ? <Check size={14} /> : step.stepNumber}
                      </button>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                        Phase: {step.phase}
                      </span>
                      <h4 className={cn("text-sm font-bold text-slate-900", isDone && "line-through text-slate-500")}>
                        {step.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock size={10} /> {step.timing}
                      </span>
                      <span className="text-[9px] font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                        {step.seasonalWindow}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-slate-800 leading-relaxed">
                    {step.instructions}
                  </p>

                  <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/90 flex items-start gap-2.5">
                    <ShieldAlert size={14} className="text-amber-800 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-amber-950 leading-tight">
                      <strong className="text-amber-900 uppercase">Critical Check:</strong> {step.criticalCheck}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* Fallback Step-by-Step Instructions */
        <section className="bg-white/40 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-6">
          <h3 className="serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-700" size={22} /> Execution Steps
          </h3>

          <div className="flex flex-col gap-4">
            {skill.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white/70 p-5 rounded-2xl border border-white/80 shadow-sm">
                <span className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {idx + 1}
                </span>
                <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed pt-1">
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
            <span className="bg-amber-900/60 text-amber-300 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-700">
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
            <span className="bg-amber-500/20 text-amber-300 border border-amber-700/80 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
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
        <section className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
              <Layers className="text-amber-700" size={22} /> Core Subskills & Technical Modules
            </h3>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-300/80">
              {skill.subskills.length} Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skill.subskills.map((sub, idx) => (
              <div 
                key={sub.id || idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col gap-2 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-emerald-950 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-800">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-emerald-950">
                    {sub.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed pl-9">
                  {sub.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inspired Counsel Callout */}
      <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col gap-2 border border-emerald-800">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={16} /> Inspired Principle
        </div>
        <p className="serif text-xl italic font-semibold text-emerald-100">
          "{skill.inspiredCounsel}"
        </p>
      </div>

      {/* Field Notes Section */}
      <section className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-md flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="serif text-2xl font-bold text-emerald-950">
              Offline Field Log & Personal Reminders
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Store custom notes, local vendor contacts, or tool adjustments directly on your device.
            </p>
          </div>
          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} /> Add Note
          </button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleAddNote} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-inner">
            <input
              type="text"
              placeholder="Note Title (e.g., Solar pump supplier in Kasungu)"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-white px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <textarea
              placeholder="Notes or measurements..."
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="bg-white p-4 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-700"
              >
                Save Note Offline
              </button>
            </div>
          </form>
        )}

        {notes.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white/50 p-4 rounded-2xl border border-white/60">
            No offline notes logged for this skill guide yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-emerald-950">{note.title}</h5>
                    <span className="text-[9px] text-slate-400 font-medium">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="self-end text-rose-600 hover:text-rose-800 text-[10px] font-bold uppercase flex items-center gap-1 pt-2"
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
