import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Circle, ArrowRight, ShieldCheck, 
  Sparkles, BookOpen, Heart, DollarSign, Compass, 
  Sprout, Hammer, Trees, ChevronDown, ChevronUp,
  FileCheck, Edit3, Save, Info
} from 'lucide-react';
import { 
  TRANSITION_STAGES, 
  TRANSITION_MILESTONES, 
  TransitionMilestone 
} from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function TransitionReadinessLedger({ className }: { className?: string }) {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('outpost_transition_ledger');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>('m1-1');
  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('outpost_transition_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [activeEditingNoteId, setActiveEditingNoteId] = useState<string | null>(null);
  const [noteBuffer, setNoteBuffer] = useState<string>('');

  // Persist completed items
  const toggleMilestoneItem = (actionKey: string) => {
    const updated = {
      ...completedItems,
      [actionKey]: !completedItems[actionKey]
    };
    setCompletedItems(updated);
    try {
      localStorage.setItem('outpost_transition_ledger', JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
      }
    } catch {
      // ignore
    }
  };

  const handleSaveNote = (milestoneId: string) => {
    const updated = {
      ...personalNotes,
      [milestoneId]: noteBuffer
    };
    setPersonalNotes(updated);
    try {
      localStorage.setItem('outpost_transition_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setActiveEditingNoteId(null);
  };

  // Calculate stats
  const totalActionsCount = useMemo(() => {
    return TRANSITION_MILESTONES.reduce((acc, m) => acc + m.actionItems.length, 0);
  }, []);

  const completedActionsCount = useMemo(() => {
    return Object.values(completedItems).filter(Boolean).length;
  }, [completedItems]);

  const overallPercentage = Math.round((completedActionsCount / Math.max(1, totalActionsCount)) * 100);

  const stageMilestones = useMemo(() => {
    return TRANSITION_MILESTONES.filter(m => m.stageNumber === activeStage);
  }, [activeStage]);

  return (
    <section 
      id="transition-readiness-ledger"
      aria-label="Transition Readiness Ledger"
      className={cn(
        "rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8 text-stone-900 dark:text-stone-100 transition-colors",
        className
      )}
    >
      {/* Header & Overall Journey Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 1 Journey
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Step-by-Step Spiritual & Practical Path</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Country Living Transition Ledger
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Framing the move from the cities as a continuous spiritual transformation: 
            Financial Readiness → Land Selection → Living Soil → Simple Home → Outpost Ministry.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/80 dark:border-emerald-900/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-stone-700 dark:text-stone-300">Journey Progress</span>
            <span className="font-bold text-emerald-800 dark:text-amber-300 font-mono text-sm">{overallPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-800 dark:bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {completedActionsCount} of {totalActionsCount} practical steps achieved
          </span>
        </div>
      </div>

      {/* 5 Stage Horizontal Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {TRANSITION_STAGES.map((stage) => {
          const isActive = activeStage === stage.stageNumber;
          // Count completed in this stage
          const stageItems = TRANSITION_MILESTONES.filter(m => m.stageNumber === stage.stageNumber);
          const stageTotal = stageItems.reduce((acc, m) => acc + m.actionItems.length, 0);
          const stageDone = stageItems.reduce((acc, m) => {
            return acc + m.actionItems.filter((_, idx) => completedItems[`${m.id}-${idx}`]).length;
          }, 0);
          const isComplete = stageDone === stageTotal && stageTotal > 0;

          return (
            <button
              key={stage.stageNumber}
              type="button"
              onClick={() => setActiveStage(stage.stageNumber)}
              className={cn(
                "p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2.5 cursor-pointer",
                isActive 
                  ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 shadow-xs ring-2 ring-emerald-800/30"
                  : "bg-stone-50/70 dark:bg-[#14281D] hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-emerald-900/60"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md",
                  isActive ? "bg-white/20 text-emerald-100" : "bg-stone-200/70 dark:bg-emerald-950/80 text-stone-700 dark:text-stone-300"
                )}>
                  STAGE {stage.stageNumber}
                </span>
                {isComplete && (
                  <CheckCircle2 size={15} className={isActive ? "text-amber-300" : "text-emerald-700 dark:text-emerald-400"} />
                )}
              </div>

              <div>
                <h4 className={cn("text-xs sm:text-sm font-bold leading-snug", isActive ? "text-white" : "text-stone-900 dark:text-stone-100")}>
                  {stage.title}
                </h4>
                <p className={cn("text-xs leading-tight line-clamp-1 mt-0.5", isActive ? "text-emerald-200/90" : "text-stone-500 dark:text-stone-400")}>
                  {stage.subtitle}
                </p>
              </div>

              <div className="text-xs font-medium opacity-80">
                {stageDone}/{stageTotal} steps done
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Milestones List */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-emerald-900/40">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>Stage {activeStage}: {TRANSITION_STAGES.find(s => s.stageNumber === activeStage)?.title}</span>
          </h3>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {stageMilestones.length} Key Milestones
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {stageMilestones.map((milestone) => {
            const isExpanded = expandedMilestoneId === milestone.id;
            const milestoneActions = milestone.actionItems;
            const completedCount = milestoneActions.filter((_, idx) => completedItems[`${milestone.id}-${idx}`]).length;
            const isAllCompleted = completedCount === milestoneActions.length;

            return (
              <div
                key={milestone.id}
                className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  isAllCompleted 
                    ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200/70 dark:border-emerald-800/60" 
                    : "bg-[#FAF8F5] dark:bg-[#14281D] border-stone-200/80 dark:border-emerald-900/60 hover:border-stone-300 dark:hover:border-emerald-800"
                )}
              >
                {/* Milestone Summary Row */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedMilestoneId(isExpanded ? null : milestone.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedMilestoneId(isExpanded ? null : milestone.id);
                    }
                  }}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={cn(
                      "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all",
                      isAllCompleted 
                        ? "bg-emerald-800 dark:bg-emerald-700 text-white" 
                        : "bg-white dark:bg-[#0A140E] border border-stone-300 dark:border-emerald-900/80 text-stone-400"
                    )}>
                      {isAllCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          {milestone.category}
                        </span>
                        <span className="text-xs text-stone-400 dark:text-stone-400 font-mono">
                          {completedCount}/{milestoneActions.length} complete
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 shrink-0">
                    <span className="text-xs font-semibold hidden sm:inline">
                      {isExpanded ? "Collapse" : "View Steps"}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded Action Items & Counsel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-stone-200/80 dark:border-emerald-900/60 bg-white dark:bg-[#0A140E] p-4 sm:p-6 flex flex-col gap-5"
                    >
                      {/* Spirit of Prophecy Counsel Banner */}
                      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-3">
                        <BookOpen size={16} className="text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                        <div className="flex flex-col gap-1">
                          <p className="serif text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed">
                            "{milestone.spiritualGuidance.text}"
                          </p>
                          <span className="text-xs font-bold text-amber-900 dark:text-amber-300 font-mono">
                            — {milestone.spiritualGuidance.source}
                          </span>
                        </div>
                      </div>

                      {/* Action Items Checklist */}
                      <div className="flex flex-col gap-2.5">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                          Action Items & Verification Steps:
                        </h5>
                        <div className="grid grid-cols-1 gap-2">
                          {milestoneActions.map((action, idx) => {
                            const itemKey = `${milestone.id}-${idx}`;
                            const isChecked = !!completedItems[itemKey];

                            return (
                              <label
                                key={itemKey}
                                className={cn(
                                  "p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all",
                                  isChecked 
                                    ? "bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/60 text-stone-900 dark:text-stone-100" 
                                    : "bg-stone-50/50 dark:bg-[#14281D] hover:bg-stone-100/70 dark:hover:bg-emerald-950/60 border-stone-200/70 dark:border-emerald-900/60 text-stone-700 dark:text-stone-200"
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleMilestoneItem(itemKey)}
                                  className="w-4 h-4 rounded text-emerald-800 dark:text-emerald-500 border-stone-300 dark:border-emerald-800 focus:ring-emerald-700 mt-0.5 shrink-0 cursor-pointer"
                                />
                                <span className={cn("text-xs sm:text-sm leading-relaxed", isChecked && "line-through text-stone-400 dark:text-stone-500")}>
                                  {action}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Personal Reflection & Notes */}
                      <div className="pt-3 border-t border-stone-100 dark:border-emerald-900/40 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                            <Edit3 size={13} /> Personal Ledger Notes & Target Date
                          </span>
                          {activeEditingNoteId !== milestone.id && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveEditingNoteId(milestone.id);
                                setNoteBuffer(personalNotes[milestone.id] || '');
                              }}
                              className="text-xs font-semibold text-emerald-800 dark:text-amber-300 hover:underline cursor-pointer"
                            >
                              {personalNotes[milestone.id] ? "Edit Note" : "+ Add Note"}
                            </button>
                          )}
                        </div>

                        {activeEditingNoteId === milestone.id ? (
                          <div className="flex flex-col gap-2">
                            <textarea
                              rows={2}
                              value={noteBuffer}
                              onChange={(e) => setNoteBuffer(e.target.value)}
                              placeholder="Record your prayer, target date, village head contact, or progress details..."
                              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-800 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveEditingNoteId(null)}
                                className="px-3 py-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveNote(milestone.id)}
                                className="px-3.5 py-1.5 text-xs bg-emerald-800 dark:bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-900 flex items-center gap-1 cursor-pointer"
                              >
                                <Save size={12} /> Save Note
                              </button>
                            </div>
                          </div>
                        ) : personalNotes[milestone.id] ? (
                          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
                            "{personalNotes[milestone.id]}"
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
