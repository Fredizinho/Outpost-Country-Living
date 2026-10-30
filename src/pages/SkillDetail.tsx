import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Clock,
  Printer,
  FileEdit,
  ShieldAlert,
  HelpCircle,
  Wrench,
  BookOpen,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  Share2,
  ExternalLink
} from 'lucide-react';
import {
  getCachedSkills,
  toggleOfflineBookmark,
  isItemBookmarked,
  getOfflineFieldNotes,
  saveOfflineFieldNote,
  deleteOfflineFieldNote,
  OfflineFieldNote,
  getStoredMasteredSkills,
  saveStoredMasteredSkills
} from '@/lib/offlineStorage';
import { SKILL_TECHNICAL_PROTOCOLS, DetailedSkillProtocol } from '@/data/skillsTechnicalProtocols';
import { StandardDiagram, DiagramSymbolsDefs, StandardDiagramType } from '@/components/common/StandardDiagram';
import { COUNTRY_IMAGES } from '@/assets/images';
import {
  Button,
  IconButton,
  Badge,
  Card,
  Drawer,
  Field,
  Input,
  KeyTakeawaysCard,
  useToast
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const skills = getCachedSkills();

  // Support alias for 'ram-pump' or 'rainwater'
  const resolvedId = id === 'ram-pump' ? 'rainwater-swale-dambo-capture' : id;
  const currentSkillIndex = skills.findIndex(
    (s) => s.id === resolvedId || s.id === id
  );
  const skill = currentSkillIndex >= 0 ? skills[currentSkillIndex] : skills[0];
  const nextSkill = skills[(currentSkillIndex + 1) % skills.length];

  const protocol: DetailedSkillProtocol | undefined =
    skill?.detailedProtocol || (resolvedId ? SKILL_TECHNICAL_PROTOCOLS[resolvedId] : undefined);

  // Bookmarking, Mastering & Notes State
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [isMastered, setIsMastered] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [notes, setNotes] = useState<OfflineFieldNote[]>([]);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Reader Scroll-Spy and Reading Progress
  const [readProgress, setReadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (skill?.id) {
      setBookmarked(isItemBookmarked(skill.id, 'skill'));
      setNotes(getOfflineFieldNotes(skill.id));
      setIsMastered(getStoredMasteredSkills().includes(skill.id));

      try {
        const savedSteps = localStorage.getItem(`homestead_skill_steps_${skill.id}`);
        setCompletedSteps(savedSteps ? JSON.parse(savedSteps) : {});
      } catch {
        setCompletedSteps({});
      }
    }
  }, [skill?.id]);

  // Track scroll position for reading progress and active TOC section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadProgress(progress);
      }

      const sections = ['overview', 'schematic', 'adventist-perspective', 'steps', 'safety', 'expert-questions', 'tools'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookmarkToggle = () => {
    if (!skill) return;
    const isNowBookmarked = toggleOfflineBookmark({
      id: skill.id,
      type: 'skill',
      title: skill.title
    });
    setBookmarked(isNowBookmarked);
    toast({
      message: isNowBookmarked ? 'Saved to offline library' : 'Removed from bookmarks',
      variant: 'default'
    });
  };

  const handleToggleMastered = () => {
    if (!skill?.id) return;
    const current = getStoredMasteredSkills();
    const exists = current.includes(skill.id);
    const updated = exists ? current.filter((item) => item !== skill.id) : [...current, skill.id];
    saveStoredMasteredSkills(updated);
    setIsMastered(!exists);
    toast({
      message: !exists ? 'Marked as mastered!' : 'Mastery status reset',
      variant: 'success'
    });
  };

  const toggleStepCompleted = (stepNumber: number) => {
    if (!skill?.id) return;
    const updated = {
      ...completedSteps,
      [stepNumber]: !completedSteps[stepNumber]
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`homestead_skill_steps_${skill.id}`, JSON.stringify(updated));
    } catch {}
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill?.id || !newNoteTitle.trim() || !newNoteContent.trim()) return;
    saveOfflineFieldNote(skill.id, newNoteTitle.trim(), newNoteContent.trim());
    setNotes(getOfflineFieldNotes(skill.id));
    setNewNoteTitle('');
    setNewNoteContent('');
    toast({ message: 'Field note recorded', variant: 'success' });
  };

  const handleDeleteNote = (noteId: string) => {
    if (!skill?.id) return;
    const noteToDelete = notes.find((n) => n.id === noteId);
    deleteOfflineFieldNote(noteId);
    setNotes(getOfflineFieldNotes(skill.id));
    toast({
      message: 'Note deleted',
      variant: 'destructive',
      undoLabel: 'Undo',
      undo: () => {
        if (noteToDelete) {
          saveOfflineFieldNote(skill.id, noteToDelete.title, noteToDelete.content);
          setNotes(getOfflineFieldNotes(skill.id));
        }
      }
    });
  };

  if (!skill) {
    return (
      <div className="min-h-[70vh] px-6 py-20 text-center flex flex-col items-center justify-center gap-4 text-[var(--ink)]">
        <h2 className="font-serif text-3xl font-bold">Guide not found</h2>
        <p className="text-[var(--ink-muted)] text-[13px]">
          The requested homestead guide could not be retrieved from the local manual.
        </p>
        <Link to="/skills">
          <Button variant="primary">Browse all guides</Button>
        </Link>
      </div>
    );
  }

  const isRainwaterGuide = skill.id.includes('rainwater') || id === 'ram-pump';
  const displayCategory = isRainwaterGuide ? 'Water & Energy' : skill.category;
  const displayTitle = isRainwaterGuide ? 'Rainwater harvesting for a small homestead' : skill.title;

  const diagramType: StandardDiagramType = (() => {
    const idLower = (skill?.id || '').toLowerCase();
    if (idLower.includes('rainwater') || idLower.includes('water') || idLower.includes('tank') || id === 'ram-pump') {
      return 'roof-tank';
    }
    if (idLower.includes('tree') || idLower.includes('pit') || idLower.includes('graft') || idLower.startsWith('ft-')) {
      return 'planting-pit';
    }
    if (idLower.includes('swale') || idLower.includes('contour') || idLower.startsWith('wc-')) {
      return 'swale';
    }
    if (idLower.includes('ridge') || idLower.includes('spacing') || idLower.includes('sasakawa') || idLower.includes('crop')) {
      return 'ridge-spacing';
    }
    if (idLower.includes('zeer') || idLower.includes('cool') || idLower.includes('preserv') || idLower.startsWith('zp-')) {
      return 'zeer-pot';
    }
    return 'roof-tank';
  })();

  const bannerImage = (() => {
    if (isRainwaterGuide || diagramType === 'roof-tank' || diagramType === 'swale') {
      return COUNTRY_IMAGES.offgridHomesteadWater || COUNTRY_IMAGES.permacultureWaterHydraulics;
    }
    if (diagramType === 'planting-pit') {
      return COUNTRY_IMAGES.edenicDeepPlantingPit || COUNTRY_IMAGES.childrenGarden;
    }
    if (diagramType === 'ridge-spacing') {
      return COUNTRY_IMAGES.permacultureGarden;
    }
    if (diagramType === 'zeer-pot') {
      return COUNTRY_IMAGES.buyingSelling;
    }
    return COUNTRY_IMAGES.homesteadHighlands;
  })();

  const stepsList = protocol
    ? protocol.protocol
    : skill.steps.map((s, idx) => ({
        stepNumber: idx + 1,
        title: `Step ${idx + 1}`,
        instructions: s,
        criticalCheck: 'Verify level alignment and secure fittings.'
      }));

  // Related guides in same category or adjacent
  const relatedGuides = skills
    .filter((s) => s.id !== skill.id && (s.category === skill.category || s.difficulty === skill.difficulty))
    .slice(0, 3);

  const keyTakeawaysMetrics = useMemo(() => {
    if (protocol?.blueprint?.metrics && protocol.blueprint.metrics.length > 0) {
      return protocol.blueprint.metrics.slice(0, 3).map((m) => ({
        label: m.label,
        value: m.value,
        hint: m.detail,
      }));
    }
    return [
      { label: 'Mastery Time', value: skill.timeToMaster || '15 mins', hint: 'Field practice' },
      { label: 'Difficulty', value: skill.difficulty || 'Beginner', hint: 'Homestead level' },
      { label: 'Tools Needed', value: `${skill.toolsNeeded?.length || 4} items`, hint: 'Local sourcing' },
    ];
  }, [protocol, skill]);

  const keyTakeawaysList = useMemo(() => {
    if (protocol?.protocol && protocol.protocol.length > 0) {
      return protocol.protocol.slice(0, 3).map((s) => s.instructions);
    }
    if (skill.steps && skill.steps.length > 0) {
      return skill.steps.slice(0, 3);
    }
    return [
      'Assess topographical slope, contour lines, and soil percolation before excavating or installing hardware.',
      'Utilize locally sourced timber, stone foundations, and organic matter to keep construction costs zero-debt.',
      'Schedule annual inspections ahead of the Malawian rainy season in October/November.',
    ];
  }, [protocol, skill]);

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'takeaways', label: 'Key takeaways' },
    { id: 'schematic', label: 'Field schematic' },
    { id: 'adventist-perspective', label: 'Guiding counsel' },
    { id: 'steps', label: 'Operational steps' },
    { id: 'safety', label: 'Safety boundaries' },
    { id: 'expert-questions', label: 'Ask a local expert' },
    { id: 'tools', label: 'Tools and materials' }
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-20">
      <DiagramSymbolsDefs />

      {/* Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-100"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col lg:flex-row items-start justify-center gap-10">
        {/* ================================================================== */}
        {/* CENTERED 700PX READING COLUMN                                      */}
        {/* ================================================================== */}
        <article className="w-full max-w-[700px] flex flex-col gap-6 mx-auto lg:mx-0">
          {/* Back link & actions bar */}
          <div className="flex items-center justify-between text-[13px] text-[var(--ink-muted)]">
            <Link
              to="/skills"
              className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to skills library</span>
            </Link>

            <div className="flex items-center gap-2">
              <IconButton
                icon={bookmarked ? BookmarkCheck : Bookmark}
                label={bookmarked ? 'Bookmarked' : 'Save bookmark'}
                size="sm"
                variant="ghost"
                onClick={handleBookmarkToggle}
                className={bookmarked ? 'text-[var(--accent)]' : ''}
              />
              <IconButton
                icon={FileEdit}
                label="Open field notes"
                size="sm"
                variant="ghost"
                onClick={() => setIsNotesDrawerOpen(true)}
              />
              <IconButton
                icon={Printer}
                label="Print guide"
                size="sm"
                variant="ghost"
                onClick={() => window.print()}
              />
            </div>
          </div>

          {/* Banner Hero */}
          <div className="w-full h-40 sm:h-52 rounded-[var(--radius-card)] overflow-hidden border border-[var(--border)] bg-stone-900 shadow-xs">
            <img
              src={bannerImage}
              alt={displayTitle}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-[var(--ink-muted)]">
            <Link to="/skills" className="hover:text-[var(--ink)] transition-colors">
              {displayCategory}
            </Link>
            <ChevronRight size={12} className="opacity-60 shrink-0" />
            <span className="text-[var(--ink)] font-medium truncate">{displayTitle}</span>
          </nav>

          {/* Heading and Metadata */}
          <header className="flex flex-col gap-3">
            <h1 className="font-serif text-[28px] sm:text-[36px] font-bold text-[var(--ink)] tracking-tight leading-tight">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--ink-muted)]">
              <Badge status={protocol ? 'Verified' : 'Reviewed'} />
              <span>&middot;</span>
              <span className="flex items-center gap-1 font-mono tabular-nums">
                <Clock size={12} />
                <span>{skill.timeToMaster || '15 min read'}</span>
              </span>
              <span>&middot;</span>
              <span>{skill.difficulty || 'Beginner'}</span>
              <span>&middot;</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">100% offline ready</span>
            </div>
          </header>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-b border-[var(--border)] pb-4">
            <Button
              variant={isMastered ? 'secondary' : 'primary'}
              size="sm"
              icon={CheckCircle2}
              onClick={handleToggleMastered}
            >
              {isMastered ? 'Mastered (Completed)' : 'Mark guide mastered'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={FileEdit}
              onClick={() => setIsNotesDrawerOpen(true)}
            >
              Field notes ({notes.length})
            </Button>
          </div>

          {/* Section: Overview */}
          <section id="overview" className="text-[16px] leading-[1.75] text-[var(--ink)] max-w-[70ch]">
            <p>
              {skill.description ||
                'Rainwater harvesting captures precipitation from corrugated homestead roofs and ground swales into food-grade storage and perennial contour infiltration basins.'}
            </p>
          </section>

          {/* Section: Key Takeaways & Field Benchmarks */}
          <section id="takeaways">
            <KeyTakeawaysCard
              title={`${displayTitle} — Field Benchmarks`}
              subtitle="Critical operational numbers and verification rules before field implementation."
              metrics={keyTakeawaysMetrics}
              takeaways={keyTakeawaysList}
              advisory={skill.summary}
            />
          </section>

          {/* Section: Field Schematic */}
          <section id="schematic" className="flex flex-col gap-2">
            <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
              Field schematic & construction layout
            </h2>
            <StandardDiagram type={diagramType} />
          </section>

          {/* Section: Adventist Perspective Callout */}
          <section
            id="adventist-perspective"
            className="p-5 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[var(--accent)]">
              <BookOpen size={16} />
              <h3 className="text-[13px] font-sans font-semibold uppercase tracking-wider text-[var(--ink)]">
                Guiding counsel & inspired principle
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-[var(--ink)] italic max-w-[70ch]">
              &ldquo;{skill.inspiredCounsel ||
                'Study the books of Daniel and Revelation, and the counsels given on country living. In the closing scenes of this earth’s history, agriculture will be an education and a safeguard.'}&rdquo;
            </p>
          </section>

          {/* Section: Steps (Numbered Cards) */}
          <section id="steps" className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[22px] font-bold text-[var(--ink)]">
                Operational step-by-step
              </h2>
              <span className="font-mono tabular-nums text-[12px] text-[var(--ink-muted)]">
                {Object.values(completedSteps).filter(Boolean).length} / {stepsList.length} completed
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {stepsList.map((step) => {
                const isDone = !!completedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    className={cn(
                      'p-4 rounded-[var(--radius-card)] border transition-all flex flex-col gap-2 bg-[var(--surface)]',
                      isDone ? 'border-emerald-600/40 opacity-90' : 'border-[var(--border)]'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleStepCompleted(step.stepNumber)}
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-mono font-bold shrink-0 mt-0.5 transition-colors cursor-pointer select-none',
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[var(--ground)] border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)]'
                        )}
                        title={isDone ? 'Mark incomplete' : 'Mark completed'}
                      >
                        {isDone ? <Check size={13} /> : step.stepNumber}
                      </button>

                      <div className="flex flex-col gap-1 flex-1">
                        <h4
                          className={cn(
                            'text-[15px] font-sans font-semibold text-[var(--ink)]',
                            isDone && 'line-through text-[var(--ink-muted)]'
                          )}
                        >
                          {step.title}
                        </h4>
                        <p className="text-[14px] text-[var(--ink)] leading-relaxed max-w-[70ch]">
                          {step.instructions}
                        </p>
                      </div>
                    </div>

                    {step.criticalCheck && (
                      <div className="ml-9 p-2.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-[12px] text-[var(--ink-muted)]">
                        <strong className="text-[var(--ink)] font-semibold">Verification check: </strong>
                        <span>{step.criticalCheck}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Safety Callout */}
          <section
            id="safety"
            className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--danger)]/30 flex flex-col gap-2 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[var(--danger)]">
              <ShieldAlert size={16} />
              <h3 className="text-[13px] font-sans font-semibold uppercase tracking-wider text-[var(--ink)]">
                Safety boundaries
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-[var(--ink)] max-w-[70ch]">
              Always install stainless insect mesh over all cistern intake pipes, inspection ports, and overflow spillways to prevent malaria mosquito propagation. When climbing corrugated roofs to clean leaf gutters, utilize secured ladders and safety ropes. Never drink untreated first-flush water without biological slow sand filtration or boiling.
            </p>
          </section>

          {/* Section: Ask a Local Expert Callout */}
          <section
            id="expert-questions"
            className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[var(--accent)]">
              <HelpCircle size={16} />
              <h3 className="text-[13px] font-sans font-semibold uppercase tracking-wider text-[var(--ink)]">
                Questions for a local expert or agricultural extension officer
              </h3>
            </div>
            <ul className="text-[13px] text-[var(--ink)] list-disc pl-5 leading-relaxed flex flex-col gap-1.5 max-w-[70ch]">
              <li>What is the typical static water level depth during the peak October dry season in this specific ward?</li>
              <li>Are local clay soils expansive vertisols that require extra gravel drainage pads beneath tank foundations?</li>
              <li>Where is the nearest verified source of food-grade corrugated water storage tanks or certified HDPE pipe?</li>
            </ul>
          </section>

          {/* Section: Tools & Materials */}
          <section id="tools" className="flex flex-col gap-3 pt-2">
            <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
              Tools and materials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skill.toolsNeeded.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2 text-[13px] text-[var(--ink)]"
                >
                  <Wrench size={13} className="text-[var(--ink-muted)] shrink-0" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Verified Technical Standards & Source Citations */}
          <section id="citations" className="p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Factuality &amp; Standards
                </span>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[65ch]">
                  Technical formulas, flow rates, soil amendments, and dimensions in this guide conform to verified engineering guidelines from CAWST, Foundations for Farming, and Malawi Ministry extension manuals.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('outpost:open-citations'))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[12px] font-sans font-medium text-[var(--ink)] shrink-0 cursor-pointer transition-colors"
            >
              <span>View institutional citations</span>
              <ExternalLink size={12} className="text-[var(--accent)]" />
            </button>
          </section>

          {/* Next Guide Footer */}
          {nextSkill && (
            <div className="pt-6 mt-6 border-t border-[var(--border)] flex flex-col gap-2">
              <span className="text-[12px] font-sans uppercase tracking-wider text-[var(--ink-muted)]">
                Next recommended guide
              </span>
              <Link
                to={`/skills/${nextSkill.id}`}
                className="group p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] flex items-center justify-between transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-serif text-[17px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {nextSkill.title}
                  </h4>
                  <p className="text-[13px] text-[var(--ink-muted)] line-clamp-1">
                    {nextSkill.summary}
                  </p>
                </div>
                <ArrowRight size={18} className="text-[var(--accent)] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </Link>
            </div>
          )}

          {/* Related Guides Grid */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-3">
            <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)]">
              Related field manuals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedGuides.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/skills/${rel.id}`}
                  className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] hover:border-[var(--accent)]/50 transition-colors flex flex-col justify-between gap-2"
                >
                  <div>
                    <span className="text-[11px] font-sans font-medium text-[var(--accent)] block">
                      {rel.category}
                    </span>
                    <h5 className="font-serif text-[14px] font-semibold text-[var(--ink)] line-clamp-1">
                      {rel.title}
                    </h5>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-[var(--ink-muted)]">
                    {rel.timeToMaster}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* ================================================================== */}
        {/* STICKY TABLE OF CONTENTS (RIGHT RAIL)                              */}
        {/* ================================================================== */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-16">
          <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3">
            <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              On this page
            </span>
            <nav aria-label="Table of contents" className="flex flex-col gap-1 text-[13px]">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'px-2 py-1 rounded-[var(--radius-control)] transition-colors',
                      isActive
                        ? 'bg-[var(--ground)] text-[var(--accent)] font-semibold border-l-2 border-[var(--accent)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)]/50'
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                icon={FileEdit}
                onClick={() => setIsNotesDrawerOpen(true)}
              >
                Field notes ({notes.length})
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Field Notes Drawer */}
      <Drawer
        isOpen={isNotesDrawerOpen}
        onClose={() => setIsNotesDrawerOpen(false)}
        title="Offline field notes"
        description={`Record site dimensions, hardware prices, or local observations for "${displayTitle}".`}
      >
        <div className="flex flex-col gap-6">
          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="flex flex-col gap-3 p-4 bg-[var(--ground)] rounded-[var(--radius-card)] border border-[var(--border)]">
            <h4 className="font-serif text-[16px] font-semibold text-[var(--ink)]">
              Record new observation
            </h4>
            <Field label="Note title" required>
              <Input
                placeholder="e.g. Tank supplier price in Dedza"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
            </Field>
            <Field label="Content / measurement" required>
              <textarea
                rows={3}
                placeholder="Observed soil conditions, pipe sizing, hardware quotes..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full p-2.5 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </Field>
            <Button variant="primary" size="sm" type="submit">
              Save observation
            </Button>
          </form>

          {/* Notes List */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-[16px] font-semibold text-[var(--ink)]">
              Saved observations ({notes.length})
            </h4>
            {notes.length === 0 ? (
              <p className="text-[13px] text-[var(--ink-muted)] italic">
                No observations recorded yet. Notes are saved 100% offline in local storage.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-[var(--ground)] rounded-[var(--radius-card)] border border-[var(--border)] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-[13px] font-semibold text-[var(--ink)]">
                      {note.title}
                    </h5>
                    <IconButton
                      icon={Trash2}
                      label="Delete note"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                    />
                  </div>
                  <p className="text-[13px] text-[var(--ink)] leading-relaxed">
                    {note.content}
                  </p>
                  <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
