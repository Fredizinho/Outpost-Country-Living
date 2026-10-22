import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Layers, 
  Calendar, 
  ArrowRight, 
  Calculator, 
  Ruler, 
  ShieldAlert, 
  Check, 
  ChevronRight,
  BookOpen,
  ShieldCheck,
  FileText
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
import { cn } from '@/lib/utils';
import { SkillStepVectorDiagram } from '@/components/outpost/SkillStepVectorDiagram';
import { StandardDiagram, DiagramSymbolsDefs, StandardDiagramType } from '@/components/common/StandardDiagram';
import { COUNTRY_IMAGES } from '@/assets/images';

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const skills = getCachedSkills();

  // Support alias for 'ram-pump' or 'rainwater'
  const resolvedId = id === 'ram-pump' ? 'rainwater-swale-dambo-capture' : id;
  const skill = skills.find(s => s.id === resolvedId) || skills.find(s => s.id === id) || skills[0];
  const protocol: DetailedSkillProtocol | undefined = (skill?.detailedProtocol) || (resolvedId ? SKILL_TECHNICAL_PROTOCOLS[resolvedId] : undefined);

  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<OfflineFieldNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isMastered, setIsMastered] = useState<boolean>(false);

  useEffect(() => {
    if (skill?.id) {
      setBookmarked(isItemBookmarked(skill.id, 'skill'));
      setNotes(getOfflineFieldNotes(skill.id));
      setIsMastered(getStoredMasteredSkills().includes(skill.id));
      
      try {
        const savedSteps = localStorage.getItem(`homestead_skill_steps_${skill.id}`);
        if (savedSteps) {
          setCompletedSteps(JSON.parse(savedSteps));
        } else {
          setCompletedSteps({});
        }
      } catch (e) {
        // ignore
      }
    }
  }, [skill?.id]);

  const handleToggleMastered = () => {
    if (!skill?.id) return;
    const current = getStoredMasteredSkills();
    const exists = current.includes(skill.id);
    const updated = exists ? current.filter((item) => item !== skill.id) : [...current, skill.id];
    saveStoredMasteredSkills(updated);
    setIsMastered(!exists);
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
      const totalStepsCount = protocol ? protocol.protocol.length : (skill?.steps.length || 0);
      const completedCount = Object.values(updated).filter(Boolean).length;
      if (totalStepsCount > 0 && completedCount >= totalStepsCount && !isMastered) {
        const currentMastered = getStoredMasteredSkills();
        if (!currentMastered.includes(skill.id)) {
          saveStoredMasteredSkills([...currentMastered, skill.id]);
          setIsMastered(true);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const handleBookmarkToggle = () => {
    if (!skill) return;
    const isNowBookmarked = toggleOfflineBookmark({
      id: skill.id,
      type: 'skill',
      title: skill.title
    });
    setBookmarked(isNowBookmarked);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill?.id || !newNoteTitle.trim() || !newNoteContent.trim()) return;
    saveOfflineFieldNote(skill.id, newNoteTitle, newNoteContent);
    setNotes(getOfflineFieldNotes(skill.id));
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowNoteForm(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (!skill?.id) return;
    deleteOfflineFieldNote(noteId);
    setNotes(getOfflineFieldNotes(skill.id));
  };

  if (!skill) {
    return (
      <div className="min-h-[70vh] bg-[#F6F1E7] px-6 py-20 text-center flex flex-col items-center justify-center gap-4 text-[#1F2A22]">
        <h2 className="font-serif text-3xl font-bold">Guide Not Found</h2>
        <p className="text-[#5A6458] text-xs">The requested homestead guide could not be retrieved from the local manual.</p>
        <Link to="/skills" className="px-4 py-2 rounded-control bg-[#B4531F] text-white text-xs font-semibold shadow-2xs hover:bg-[#9c4518] transition-colors">
          Browse All Guides
        </Link>
      </div>
    );
  }

  const isRainwaterGuide = skill.id.includes('rainwater') || id === 'ram-pump';
  const displayCategory = isRainwaterGuide ? 'Water' : skill.category;
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

  return (
    <div className="w-full min-h-screen bg-[#F6F1E7] text-[#1F2A22] font-chrome">
      {/* SVG Symbol Definitions for standard diagrams */}
      <DiagramSymbolsDefs />
      
      {/* Top Container with Max Width matching reference layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* ====================================================================
            MAIN ARTICLE COLUMN (Matches Guide reader@1x.png)
        ==================================================================== */}
        <article className="flex-1 min-w-0 flex flex-col gap-6">
          
          {/* Top Banner Image with rounded corners matching reference */}
          <div className="w-full h-32 sm:h-44 rounded-2xl overflow-hidden border border-[#E4DCCB] dark:border-emerald-900/50 shadow-2xs bg-stone-900">
            <img 
              src={bannerImage} 
              alt={displayTitle}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Breadcrumbs: "Water › Rainwater harvesting" */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5A6458]">
            <Link to="/skills" className="hover:text-[#1F2A22] transition-colors">
              {displayCategory}
            </Link>
            <ChevronRight size={13} className="text-[#5A6458]/60 shrink-0" />
            <span className="text-[#1F2A22] font-medium truncate">
              {isRainwaterGuide ? 'Rainwater harvesting' : skill.title}
            </span>
          </nav>

          {/* Guide Heading: Fraunces serif */}
          <header className="flex flex-col gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2A22] tracking-tight leading-tight">
              {displayTitle}
            </h1>

            {/* Metadata Tags Row: "Draft · not yet checked", "8 min", "Beginner", "Offline ready" */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#5A6458]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFFDF8] border border-[#E4DCCB] text-[#8C5320] font-normal text-[11.5px]">
                Draft · not yet checked
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#5A6458]" />
                <span>{skill.timeToMaster || '8 min'}</span>
              </span>
              <span>·</span>
              <span>{skill.difficulty || 'Beginner'}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-[#3F6B4E] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3F6B4E] shrink-0" />
                <span>Offline ready</span>
              </span>
            </div>
          </header>

          {/* Standardized Field Diagram Card (Matches Guide reader@1x.png layout) */}
          <section id="how-it-fits-together">
            <StandardDiagram type={diagramType} />
          </section>

          {/* Quick Action Bar for Stewards */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-[#E4DCCB] pb-4">
            <button
              type="button"
              onClick={handleToggleMastered}
              className="px-3.5 py-1.5 rounded-control bg-[#B4531F] hover:bg-[#9c4518] text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 size={13} />
              <span>{isMastered ? 'Mastered (Completed)' : 'Mark guide mastered'}</span>
            </button>

            <button
              type="button"
              onClick={handleBookmarkToggle}
              className="px-3 py-1.5 rounded-control border border-[#E4DCCB] hover:border-[#1F2A22] bg-[#FFFDF8] text-xs font-medium text-[#1F2A22] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck size={13} className="text-[#B4531F]" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark size={13} className="text-[#5A6458]" />
                  <span>Save bookmark</span>
                </>
              )}
            </button>
          </div>

          {/* Overview Paragraph */}
          <section id="overview" className="text-sm leading-relaxed text-[#1F2A22] font-normal">
            <p>
              {skill.description ||
                'Instead of letting heavy rain runoff erode topsoil into rivers, rainwater harvesting captures precipitation from corrugated homestead roofs and ground swales into food-grade storage and perennial contour infiltration basins.'}
            </p>
          </section>

          {/* Adventist Perspective Parchment Callout Box (#EDE6D6) */}
          <section 
            id="adventist-perspective"
            className="p-5 rounded-card bg-[#EDE6D6] border border-[#E4DCCB] flex flex-col gap-2.5 shadow-2xs"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#B4531F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F2A22]">
                Adventist perspective
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#1F2A22] font-normal">
              {skill.inspiredCounsel ||
                '[Principle in plain words, with a verified reference added before this guide is marked Reviewed.]'}
            </p>
          </section>


          {/* Section: Steps (Fraunces serif) */}
          <section id="steps" className="flex flex-col gap-4 pt-2">
            <h2 className="font-serif text-2xl font-bold text-[#1F2A22]">
              Steps
            </h2>

            <div className="flex flex-col gap-3">
              {(protocol ? protocol.protocol : skill.steps.map((s, idx) => ({ stepNumber: idx + 1, title: `Step ${idx + 1}`, instructions: s, criticalCheck: 'Verify level alignment and secure fittings.' }))).map((step) => {
                const isDone = !!completedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    className={cn(
                      'p-4 rounded-card border transition-all flex flex-col gap-2.5 bg-[#FFFDF8]',
                      isDone ? 'border-[#3F6B4E] bg-[#FFFDF8]' : 'border-[#E4DCCB]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Numbered Step Circle */}
                        <button
                          type="button"
                          onClick={() => toggleStepCompleted(step.stepNumber)}
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 transition-colors cursor-pointer',
                            isDone
                              ? 'bg-[#3F6B4E] text-white'
                              : 'bg-[#F6F1E7] border border-[#E4DCCB] text-[#1F2A22] hover:border-[#1F2A22]'
                          )}
                          title={isDone ? 'Mark as incomplete' : 'Mark step completed'}
                        >
                          {isDone ? <Check size={13} /> : step.stepNumber}
                        </button>

                        <div className="flex flex-col gap-1">
                          <h3 className={cn('text-sm font-semibold text-[#1F2A22]', isDone && 'line-through text-[#5A6458]')}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-[#1F2A22]/90 leading-relaxed">
                            {step.instructions}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Critical check note if provided */}
                    {step.criticalCheck && (
                      <div className="ml-9 p-2.5 rounded-control bg-[#F6F1E7] border border-[#E4DCCB] text-[11.5px] text-[#5A6458]">
                        <strong className="text-[#1F2A22] font-semibold">Verification check: </strong>
                        <span>{step.criticalCheck}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Safety Callout Card with bold label */}
          <section 
            id="safety"
            className="p-5 rounded-card bg-[#FFFDF8] border border-[#E4DCCB] flex flex-col gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-1.5 text-[#B4531F]">
              <ShieldAlert size={15} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F2A22]">
                Safety
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#1F2A22]/90">
              Always install stainless insect mesh over all cistern intake pipes, inspection ports, and overflow spillways to prevent malaria mosquito propagation. When climbing corrugated roofs to clean leaf gutters, utilize secured ladders and safety ropes. Never drink untreated first-flush water without biological slow sand filtration or boiling.
            </p>
          </section>

          {/* Tools & Materials Needed */}
          <section id="tools" className="flex flex-col gap-3 pt-2">
            <h2 className="font-serif text-xl font-bold text-[#1F2A22]">
              Tools and materials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skill.toolsNeeded.map((tool, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-card bg-[#FFFDF8] border border-[#E4DCCB] flex items-center gap-2 text-xs text-[#1F2A22]"
                >
                  <Wrench size={12} className="text-[#5A6458] shrink-0" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Offline Field Notes */}
          <section id="notes" className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#1F2A22]">
                Field notes
              </h2>
              <button
                type="button"
                onClick={() => setShowNoteForm((prev) => !prev)}
                className="px-2.5 py-1 rounded-control border border-[#E4DCCB] bg-[#FFFDF8] hover:border-[#1F2A22] text-xs font-medium text-[#1F2A22] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus size={12} />
                <span>Add note</span>
              </button>
            </div>

            {showNoteForm && (
              <form onSubmit={handleAddNote} className="p-4 rounded-card bg-[#FFFDF8] border border-[#E4DCCB] flex flex-col gap-2.5 shadow-2xs">
                <input
                  type="text"
                  placeholder="Note title (e.g. Tank supplier in Dedza boma)"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="px-2.5 py-1.5 rounded-control bg-[#F6F1E7] border border-[#E4DCCB] text-xs text-[#1F2A22] focus:outline-none focus:border-[#1F2A22]"
                />
                <textarea
                  placeholder="Observations, dimensions, or cost estimates..."
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="px-2.5 py-1.5 rounded-control bg-[#F6F1E7] border border-[#E4DCCB] text-xs text-[#1F2A22] focus:outline-none focus:border-[#1F2A22]"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowNoteForm(false)}
                    className="px-3 py-1 rounded-control text-xs text-[#5A6458] hover:text-[#1F2A22] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-control bg-[#1F2A22] text-white text-xs font-medium cursor-pointer"
                  >
                    Save note
                  </button>
                </div>
              </form>
            )}

            {notes.length > 0 ? (
              <div className="flex flex-col gap-2">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-card bg-[#FFFDF8] border border-[#E4DCCB] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-[#1F2A22]">{note.title}</h4>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-[#5A6458] hover:text-[#B4531F] p-0.5 cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="text-xs text-[#5A6458] leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#5A6458] italic">No local field notes recorded yet.</p>
            )}
          </section>

        </article>

        {/* ====================================================================
            RIGHT STICKY SIDEBAR: "ON THIS PAGE" (Matches Guide reader@1x.png)
        ==================================================================== */}
        <aside className="w-full lg:w-56 shrink-0">
          <div className="sticky top-12 flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A6458]">
              On this page
            </h3>
            <nav aria-label="Table of contents" className="flex flex-col gap-1 text-xs">
              <a
                href="#how-it-fits-together"
                className="py-1 px-2 rounded-control text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#EDE6D6]/60 transition-colors"
              >
                How it fits together
              </a>
              <a
                href="#adventist-perspective"
                className="py-1 px-2 rounded-control text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#EDE6D6]/60 transition-colors"
              >
                Principle
              </a>
              <a
                href="#steps"
                className="py-1 px-2 rounded-control text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#EDE6D6]/60 transition-colors"
              >
                Steps
              </a>
              <a
                href="#safety"
                className="py-1 px-2 rounded-control text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#EDE6D6]/60 transition-colors"
              >
                Safety
              </a>
              <a
                href="#notes"
                className="py-1 px-2 rounded-control text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#EDE6D6]/60 transition-colors"
              >
                Questions for a local expert
              </a>
            </nav>

          </div>
        </aside>

      </div>

    </div>
  );
}
