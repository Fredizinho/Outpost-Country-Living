import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Scale,
  Sparkles,
  ShieldCheck,
  Flame,
  Crown,
  HeartPulse,
  Compass,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROPHETIC_STAGES_DATA, PropheticStage } from '@/data/prophecy/propheticTimelineStages';

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
      <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4DCCB] dark:border-[#283C30] mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-caption text-[#B85D36] dark:text-[#E2875A] font-bold">
              6 Prophetic Stages
            </span>
            <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
            <span className="font-serif italic text-[#5A6458] dark:text-[#9FB3A4]">
              457 BC to the Second Coming
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={cn(
                'px-2.5 py-1 rounded-md border flex items-center gap-1 transition-all cursor-pointer',
                isFirst
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#5A6458]'
                  : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
              )}
            >
              <ChevronLeft size={13} />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <span className="text-caption font-bold text-[#2B4636] dark:text-[#D4A034] px-1">
              {stage.stageNumber} / 06
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={isLast}
              className={cn(
                'px-2.5 py-1 rounded-md border flex items-center gap-1 transition-all cursor-pointer',
                isLast
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#5A6458]'
                  : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
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
                  'p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1',
                  active
                    ? 'bg-[#2B4636] dark:bg-[#283C30] border-[#2B4636] dark:border-[#283C30] text-white shadow-xs'
                    : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-caption font-mono font-bold', active ? 'text-[#D4A034]' : 'text-[#B85D36] dark:text-[#E2875A]')}>
                    STAGE {s.stageNumber}
                  </span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A034]" />}
                </div>
                <span className="text-xs font-serif font-bold line-clamp-1 leading-snug">
                  {s.title}
                </span>
                <span className={cn('text-[10px] line-clamp-1 italic font-sans', active ? 'text-emerald-100/80' : 'text-[#5A6458] dark:text-[#9FB3A4]')}>
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
          className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
        >
          {/* Stage Header */}
          <div className="flex flex-col gap-2 pb-5 border-b border-[#E4DCCB] dark:border-[#283C30]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#B85D36] dark:text-[#E2875A] font-bold uppercase tracking-wider">
                STAGE {stage.stageNumber}
              </span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4]">{stage.timeframe}</span>
              <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
              <span className="text-[#2B4636] dark:text-[#D4A034] font-semibold">{stage.scriptureRef}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
                  {stage.title}
                </h2>
                <span className="font-sans italic text-sm text-[#B85D36] dark:text-[#E2875A] block mt-0.5">
                  {stage.chichewaTitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#9FB3A4] font-medium leading-relaxed mt-1">
              {stage.subtitle}
            </p>
          </div>

          {/* Overview Callout */}
          <div className="p-4 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-xs sm:text-sm text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed">
            <strong className="text-[#2B4636] dark:text-[#D4A034] font-mono text-caption uppercase tracking-wider block mb-1">
              Core Prophetic Summary:
            </strong>
            {stage.summary}
          </div>

          {/* Theological Basis & Exegesis */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-lg font-bold text-[#1F2A22] dark:text-[#FFFDF8] flex items-center gap-2">
              <BookOpen size={18} className="text-[#2B4636] dark:text-[#D4A034]" />
              Theological Exegesis &amp; Scripture Foundation
            </h3>
            <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
              {stage.theologicalBasis}
            </p>
          </div>

          {/* STAGE 1: Mathematical Calculation Table */}
          {stage.calculations && (
            <div className="flex flex-col gap-3">
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034]">
                Mathematical Calculations &amp; Historical Fulfillments
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#E4DCCB] dark:border-[#283C30]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F6F1E7] dark:bg-[#0E1712] border-b border-[#E4DCCB] dark:border-[#283C30] text-caption font-mono uppercase text-[#5A6458] dark:text-[#9FB3A4]">
                    <tr>
                      <th className="p-3 w-28">Timeline Marker</th>
                      <th className="p-3">Prophetic Calculation</th>
                      <th className="p-3">Historical &amp; Biblical Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DCCB] dark:divide-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C]">
                    {stage.calculations.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F6F1E7]/50 dark:hover:bg-[#0E1712]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#B85D36] dark:text-[#E2875A] whitespace-nowrap">
                          {row.marker}
                        </td>
                        <td className="p-3 font-mono text-[#1F2A22] dark:text-[#F6F1E7]">
                          {row.propheticCalculation}
                        </td>
                        <td className="p-3 text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
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
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] flex items-center gap-1.5">
                <HeartPulse size={14} />
                Scientific Health Studies: Biology of Character Formation
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stage.healthStudies.map((study, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-2"
                  >
                    <span className="font-serif font-bold text-sm text-[#1F2A22] dark:text-[#FFFDF8]">
                      {study.name}
                    </span>
                    <p className="text-xs text-[#5A6458] dark:text-[#9FB3A4] leading-relaxed">
                      <strong className="text-[#1F2A22] dark:text-[#F6F1E7]">Finding:</strong> {study.finding}
                    </p>
                    <p className="text-xs text-[#2B4636] dark:text-[#86EFAC] font-medium leading-relaxed pt-1 border-t border-[#E4DCCB] dark:border-[#283C30]">
                      <strong className="font-mono text-caption uppercase block">Significance:</strong>
                      {study.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage.feasts && (
            <div className="flex flex-col gap-3 pt-2">
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] flex items-center gap-1.5">
                <Calendar size={14} />
                Annual Holy Feast Convocations (Misonkhano Yopatulika)
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#E4DCCB] dark:border-[#283C30]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F6F1E7] dark:bg-[#0E1712] border-b border-[#E4DCCB] dark:border-[#283C30] text-caption font-mono uppercase text-[#5A6458] dark:text-[#9FB3A4]">
                    <tr>
                      <th className="p-3 w-28">Convocation</th>
                      <th className="p-3">Festivals</th>
                      <th className="p-3">Historical Meaning</th>
                      <th className="p-3">Prophetic Antitype</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DCCB] dark:divide-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C]">
                    {stage.feasts.map((f, idx) => (
                      <tr key={idx} className="hover:bg-[#F6F1E7]/50 dark:hover:bg-[#0E1712]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#B85D36] dark:text-[#E2875A]">
                          {f.group}
                        </td>
                        <td className="p-3 font-semibold text-[#1F2A22] dark:text-[#F6F1E7]">
                          {f.convocations}
                        </td>
                        <td className="p-3 text-[#5A6458] dark:text-[#D0DAD2]">
                          {f.historicalMeaning}
                        </td>
                        <td className="p-3 text-[#2B4636] dark:text-[#86EFAC] font-medium">
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
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] flex items-center gap-1.5">
                <Scale size={14} />
                The Seal of God vs. The Mark of the Beast
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#E4DCCB] dark:border-[#283C30]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F6F1E7] dark:bg-[#0E1712] border-b border-[#E4DCCB] dark:border-[#283C30] text-caption font-mono uppercase">
                    <tr>
                      <th className="p-3 text-[#5A6458] dark:text-[#9FB3A4] w-36">Dimension</th>
                      <th className="p-3 text-[#2B4636] dark:text-[#86EFAC]">The Seal of God (Chidindo cha Mulungu)</th>
                      <th className="p-3 text-rose-700 dark:text-rose-400">The Mark of the Beast (Chizindikiro cha Chilombo)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DCCB] dark:divide-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C]">
                    {stage.sealComparison.map((r, idx) => (
                      <tr key={idx} className="hover:bg-[#F6F1E7]/50 dark:hover:bg-[#0E1712]/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#1F2A22] dark:text-[#F6F1E7]">
                          {r.characteristic}
                        </td>
                        <td className="p-3 text-[#2B4636] dark:text-[#86EFAC] leading-relaxed">
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
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034]">
                Key Prophetic Attributes &amp; Observations
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {stage.keyAttributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex items-start gap-2 text-[#1F2A22] dark:text-[#F6F1E7]"
                  >
                    <CheckCircle2 size={14} className="text-[#3F6B4E] dark:text-[#86EFAC] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{attr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Four Divine Acts for Stage 6 */}
          {stage.fourDivineActs && (
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] flex items-center gap-1.5">
                <Crown size={14} />
                The Fourfold Divine Acts at Christ’s Literal Return
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {stage.fourDivineActs.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-1 text-[#1F2A22] dark:text-[#F6F1E7]"
                  >
                    <span className="font-serif font-bold text-sm text-[#B85D36] dark:text-[#E2875A]">
                      {act.split(':')[0]}
                    </span>
                    <span className="text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
                      {act.split(':')[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* "So What?" Analytical Synthesis Callout */}
          <div className="mt-2 p-5 rounded-xl bg-[#2B4636]/10 dark:bg-[#1F3325] border border-[#2B4636]/30 dark:border-[#283C30] flex flex-col gap-1.5">
            <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] flex items-center gap-1.5">
              <Sparkles size={14} />
              Analytical Synthesis ("So What?")
            </span>
            <p className="text-xs sm:text-sm text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed font-medium">
              {stage.soWhat}
            </p>
          </div>

          {/* Stepper Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E4DCCB] dark:border-[#283C30]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={cn(
                'px-4 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border',
                isFirst
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[#5A6458]'
                  : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
              )}
            >
              <ChevronLeft size={14} />
              <span>Previous Stage</span>
            </button>

            <span className="text-caption font-mono text-[#5A6458] dark:text-[#9FB3A4]">
              Stage {stage.stageNumber} of 06
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={isLast}
              className={cn(
                'px-4 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border',
                isLast
                  ? 'opacity-30 cursor-not-allowed border-transparent text-[#5A6458]'
                  : 'bg-[#2B4636] dark:bg-[#283C30] text-white border-transparent hover:bg-[#1F3325] dark:hover:bg-[#344E3E] shadow-xs'
              )}
            >
              <span>Next Stage</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
