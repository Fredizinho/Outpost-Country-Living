import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Scale,
  Sparkles,
  HeartPulse,
  Calendar,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROPHETIC_STAGES_DATA } from '@/data/prophecy/propheticTimelineStages';

export function PropheticStageStepper() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stage = PROPHETIC_STAGES_DATA[currentStageIndex];
  const isFirst = currentStageIndex === 0;
  const isLast = currentStageIndex === PROPHETIC_STAGES_DATA.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStageIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentStageIndex((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 6-Step Stepper Navigation Ribbon */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-sans text-caption text-[var(--accent)] font-semibold">
              6 Prophetic stages
            </span>
            <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
            <span className="font-serif italic text-[var(--ink-muted)]">
              457 BC to the Second Coming
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-sans text-xs">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={cn(
                'px-2.5 py-1 rounded-[var(--radius-control)] border flex items-center gap-1 transition-all cursor-pointer',
                isFirst
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                  : 'bg-[var(--ground)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--ground)]/80'
              )}
            >
              <ChevronLeft size={13} />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <span className="text-caption font-mono tabular-nums font-bold text-[var(--moss)] dark:text-[var(--gold)] px-1">
              {stage.stageNumber} / 06
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={isLast}
              className={cn(
                'px-2.5 py-1 rounded-[var(--radius-control)] border flex items-center gap-1 transition-all cursor-pointer',
                isLast
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                  : 'bg-[var(--ground)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--ground)]/80'
              )}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PROPHETIC_STAGES_DATA.map((s, idx) => {
            const active = idx === currentStageIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStageIndex(idx)}
                className={cn(
                  'p-2.5 rounded-[var(--radius-control)] border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1',
                  active
                    ? 'bg-[var(--color-moss-light)] border-[var(--color-moss-light)] text-white shadow-xs'
                    : 'bg-[var(--ground)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--ground)]/80'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-caption font-mono font-bold', active ? 'text-[var(--gold)]' : 'text-[var(--accent)]')}>
                    Stage {s.stageNumber}
                  </span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />}
                </div>
                <span className="text-xs font-serif font-bold line-clamp-1 leading-snug">
                  {s.title}
                </span>
                <span className={cn('text-[10px] line-clamp-1 italic font-sans', active ? 'text-emerald-100/80' : 'text-[var(--ink-muted)]')}>
                  {s.chichewaTitle.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Presentation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
        >
          {/* Stage Header */}
          <div className="flex flex-col gap-2 pb-5 border-b border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
              <span className="font-mono text-[var(--accent)] font-semibold">
                Stage {stage.stageNumber}
              </span>
              <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
              <span className="font-mono text-[var(--ink-muted)]">{stage.timeframe}</span>
              <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
              <span className="font-mono text-[var(--moss)] dark:text-[var(--gold)] font-medium">{stage.scriptureRef}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
                  {stage.title}
                </h2>
                <span className="font-sans italic text-sm text-[var(--accent)] block mt-0.5">
                  {stage.chichewaTitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-medium leading-relaxed mt-1">
              {stage.subtitle}
            </p>
          </div>

          {/* Overview Callout */}
          <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
            <strong className="text-[var(--moss)] dark:text-[var(--gold)] font-sans text-caption font-semibold block mb-1">
              Core prophetic summary:
            </strong>
            {stage.summary}
          </div>

          {/* Theological Basis & Exegesis */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <BookOpen size={18} className="text-[var(--moss)] dark:text-[var(--gold)]" />
              Theological Exegesis &amp; Scripture Foundation
            </h3>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
              {stage.theologicalBasis}
            </p>
          </div>

          {/* STAGE 1: Mathematical Calculation Table */}
          {stage.calculations && (
            <div className="flex flex-col gap-3">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
                Mathematical calculations &amp; historical fulfillments
              </span>
              <div className="overflow-x-auto rounded-[var(--radius-control)] border border-[var(--border)]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[var(--ground)] border-b border-[var(--border)] text-caption font-sans font-medium text-[var(--ink-muted)]">
                    <tr>
                      <th className="p-3 w-28">Timeline marker</th>
                      <th className="p-3">Prophetic calculation</th>
                      <th className="p-3">Historical &amp; biblical fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                    {stage.calculations.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[var(--ground)]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[var(--accent)] whitespace-nowrap">
                          {row.marker}
                        </td>
                        <td className="p-3 font-mono text-[var(--ink)]">
                          {row.propheticCalculation}
                        </td>
                        <td className="p-3 text-[var(--ink-muted)] leading-relaxed">
                          {row.fulfillment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STAGE 2: Health Studies & Feast Convocations */}
          {stage.healthStudies && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
                <HeartPulse size={14} />
                Scientific health studies: Biology of character formation
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stage.healthStudies.map((study, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2"
                  >
                    <span className="font-serif font-bold text-sm text-[var(--ink)]">
                      {study.name}
                    </span>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                      <strong className="text-[var(--ink)]">Finding:</strong> {study.finding}
                    </p>
                    <p className="text-xs text-[var(--moss)] dark:text-[var(--success)] font-medium leading-relaxed pt-1 border-t border-[var(--border)]">
                      <strong className="font-sans text-caption font-semibold block">Significance:</strong>
                      {study.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage.feasts && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
                <Calendar size={14} />
                Annual holy feast convocations (Misonkhano Yopatulika)
              </span>
              <div className="overflow-x-auto rounded-[var(--radius-control)] border border-[var(--border)]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[var(--ground)] border-b border-[var(--border)] text-caption font-sans font-medium text-[var(--ink-muted)]">
                    <tr>
                      <th className="p-3 w-28">Convocation</th>
                      <th className="p-3">Festivals</th>
                      <th className="p-3">Historical meaning</th>
                      <th className="p-3">Prophetic antitype</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                    {stage.feasts.map((f, idx) => (
                      <tr key={idx} className="hover:bg-[var(--ground)]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[var(--accent)]">
                          {f.group}
                        </td>
                        <td className="p-3 font-semibold text-[var(--ink)]">
                          {f.convocations}
                        </td>
                        <td className="p-3 text-[var(--ink-muted)]">
                          {f.historicalMeaning}
                        </td>
                        <td className="p-3 text-[var(--moss)] dark:text-[var(--success)] font-medium">
                          {f.propheticFulfillment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STAGE 4: Seal of God vs Mark of the Beast Comparison */}
          {stage.sealComparison && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
                <Scale size={14} />
                The seal of God vs. the mark of the beast
              </span>
              <div className="overflow-x-auto rounded-[var(--radius-control)] border border-[var(--border)]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[var(--ground)] border-b border-[var(--border)] text-caption font-sans font-medium">
                    <tr>
                      <th className="p-3 text-[var(--ink-muted)] w-36">Dimension</th>
                      <th className="p-3 text-[var(--moss)] dark:text-[var(--success)]">The Seal of God (Chidindo cha Mulungu)</th>
                      <th className="p-3 text-rose-700 dark:text-rose-400">The Mark of the Beast (Chizindikiro cha Chilombo)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                    {stage.sealComparison.map((r, idx) => (
                      <tr key={idx} className="hover:bg-[var(--ground)]/50 transition-colors">
                        <td className="p-3 font-sans font-semibold text-[var(--ink)]">
                          {r.characteristic}
                        </td>
                        <td className="p-3 text-[var(--moss)] dark:text-[var(--success)] leading-relaxed">
                          {r.sealOfGod}
                        </td>
                        <td className="p-3 text-rose-800 dark:text-rose-300 leading-relaxed">
                          {r.markOfTheBeast}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Attributes List if applicable */}
          {stage.keyAttributes && (
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
                Key prophetic attributes &amp; observations
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {stage.keyAttributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-start gap-2 text-[var(--ink)]"
                  >
                    <CheckCircle2 size={14} className="text-[var(--success)] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{attr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Four Divine Acts for Stage 6 */}
          {stage.fourDivineActs && (
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
                <Crown size={14} />
                The fourfold divine acts at Christ’s literal return
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {stage.fourDivineActs.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1 text-[var(--ink)]"
                  >
                    <span className="font-serif font-bold text-sm text-[var(--accent)]">
                      {act.split(':')[0]}
                    </span>
                    <span className="text-[var(--ink-muted)] leading-relaxed">
                      {act.split(':')[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* "So What?" Analytical Synthesis Callout */}
          <div className="mt-2 p-5 rounded-[var(--radius-card)] bg-[var(--success)]/10 border border-[var(--border)] flex flex-col gap-1.5">
            <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] flex items-center gap-1.5">
              <Sparkles size={14} />
              Analytical synthesis ("So What?")
            </span>
            <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed font-medium">
              {stage.soWhat}
            </p>
          </div>

          {/* Stepper Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={cn(
                'px-4 py-2 rounded-[var(--radius-control)] font-sans text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border',
                isFirst
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                  : 'bg-[var(--ground)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--ground)]/80'
              )}
            >
              <ChevronLeft size={14} />
              <span>Previous stage</span>
            </button>

            <span className="text-caption font-mono tabular-nums text-[var(--ink-muted)]">
              Stage {stage.stageNumber} of 06
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={isLast}
              className={cn(
                'px-4 py-2 rounded-[var(--radius-control)] font-sans text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border',
                isLast
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                  : 'bg-[var(--color-moss-light)] text-white border-transparent hover:bg-[var(--color-moss)] shadow-xs'
              )}
            >
              <span>Next stage</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
