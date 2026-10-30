import React, { useState } from 'react';
import {
  Clock,
  Layers,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ENDLINE_CHRONOLOGICAL_EVENTS, ChronologicalEvent } from '@/data/prophecy/endlineChronologicalEvents';

export function ChronologicalEventsViewer() {
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const selectedEvent = ENDLINE_CHRONOLOGICAL_EVENTS[selectedEventIndex];

  return (
    <div className="flex flex-col gap-6">
      {/* Header & View Mode Switcher */}
      <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#B85D36] dark:text-[#E2875A] font-bold">
            <Clock size={14} />
            <span>Orderly Apocalyptic Progression</span>
            <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
            <span className="font-serif italic font-normal text-[#5A6458] dark:text-[#9FB3A4]">
              "Event After Event" (DA 634; GC 594)
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight mt-1">
            The 10 Chronological End-Time Events
          </h2>
        </div>

        <div className="inline-flex items-center gap-1 bg-[#F6F1E7] dark:bg-[#0E1712] p-1 rounded-lg border border-[#E4DCCB] dark:border-[#283C30] text-xs font-mono self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={cn(
              'px-3 py-1.5 rounded-md transition-all cursor-pointer font-semibold',
              viewMode === 'timeline'
                ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs'
                : 'text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-[#FFFDF8]'
            )}
          >
            Sequential Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={cn(
              'px-3 py-1.5 rounded-md transition-all cursor-pointer font-semibold',
              viewMode === 'table'
                ? 'bg-[#2B4636] dark:bg-[#283C30] text-white shadow-xs'
                : 'text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-[#FFFDF8]'
            )}
          >
            Comparative Table
          </button>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 10-Step Index Rail */}
          <div className="lg:col-span-5 flex flex-col gap-2 bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-3 sm:p-4 shadow-xs">
            <span className="font-mono text-caption uppercase tracking-wider font-bold text-[#5A6458] dark:text-[#9FB3A4] px-1 pb-1 border-b border-[#E4DCCB] dark:border-[#283C30]">
              Chronological Sequence
            </span>
            <div className="flex flex-col gap-1.5 max-h-[560px] overflow-y-auto pr-1">
              {ENDLINE_CHRONOLOGICAL_EVENTS.map((event, idx) => {
                const active = idx === selectedEventIndex;
                return (
                  <button
                    key={event.step}
                    type="button"
                    onClick={() => setSelectedEventIndex(idx)}
                    className={cn(
                      'p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2',
                      active
                        ? 'bg-[#2B4636] dark:bg-[#283C30] border-[#2B4636] dark:border-[#283C30] text-white shadow-xs'
                        : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325]'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={cn('font-mono text-caption font-bold tabular-nums shrink-0', active ? 'text-[#D4A034]' : 'text-[#B85D36] dark:text-[#E2875A]')}>
                        {event.step < 10 ? `0${event.step}` : event.step}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-serif font-bold truncate leading-snug">
                          {event.phase}
                        </span>
                        <span className={cn('text-[10px] truncate italic', active ? 'text-emerald-100/70' : 'text-[#5A6458] dark:text-[#9FB3A4]')}>
                          {event.chichewaTitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={13} className={cn('shrink-0', active ? 'text-[#D4A034]' : 'text-[#5A6458] dark:text-[#9FB3A4]')} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Event Detailed Dossier */}
          <div className="lg:col-span-7 bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-6 sm:p-7 flex flex-col gap-5 shadow-xs">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[#E4DCCB] dark:border-[#283C30]">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#B85D36] dark:text-[#E2875A] font-bold">
                  WAYMARK {selectedEvent.step < 10 ? `0${selectedEvent.step}` : selectedEvent.step} OF 10
                </span>
                <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
                <span className="text-[#2B4636] dark:text-[#D4A034] font-semibold">
                  {selectedEvent.scriptureEgwRef}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
                {selectedEvent.phase}
              </h3>
              <span className="font-sans italic text-xs text-[#B85D36] dark:text-[#E2875A]">
                {selectedEvent.chichewaTitle}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-xs sm:text-sm">
                <strong className="text-[#B85D36] dark:text-[#E2875A] font-mono text-caption uppercase tracking-wider block mb-1">
                  Theological &amp; Event Trigger:
                </strong>
                <p className="text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed">
                  {selectedEvent.trigger}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#2B4636]/10 dark:bg-[#1F3325] border border-[#2B4636]/30 dark:border-[#283C30] text-xs sm:text-sm">
                <strong className="text-[#2B4636] dark:text-[#D4A034] font-mono text-caption uppercase tracking-wider block mb-1">
                  Practical &amp; Spiritual Impact on Believers:
                </strong>
                <p className="text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed">
                  {selectedEvent.impactOnBelievers}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30]">
              <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#5A6458] dark:text-[#9FB3A4]">
                Analytical Exegesis:
              </span>
              <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
                {selectedEvent.detailedAnalysis}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Comparative Sequence Table */
        <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 bg-[#F6F1E7] dark:bg-[#0E1712] border-b border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-between">
            <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034]">
              Comparative Sequence Table: Waymarks 01 through 10
            </span>
            <span className="text-caption font-mono text-[#5A6458] dark:text-[#9FB3A4]">
              10 Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F6F1E7]/60 dark:bg-[#0E1712]/60 border-b border-[#E4DCCB] dark:border-[#283C30] text-caption font-mono uppercase text-[#5A6458] dark:text-[#9FB3A4]">
                <tr>
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3 w-48">Prophetic Phase</th>
                  <th className="p-3">Key Theological / Event Trigger</th>
                  <th className="p-3">Practical / Spiritual Impact</th>
                  <th className="p-3 w-36">Citations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DCCB] dark:divide-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C]">
                {ENDLINE_CHRONOLOGICAL_EVENTS.map((event) => (
                  <tr key={event.step} className="hover:bg-[#F6F1E7]/50 dark:hover:bg-[#0E1712]/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-center text-[#B85D36] dark:text-[#E2875A] tabular-nums">
                      {event.step < 10 ? `0${event.step}` : event.step}
                    </td>
                    <td className="p-3">
                      <span className="font-serif font-bold text-[#1F2A22] dark:text-[#FFFDF8] block">
                        {event.phase}
                      </span>
                      <span className="font-sans text-[10px] italic text-[#5A6458] dark:text-[#9FB3A4] block mt-0.5">
                        {event.chichewaTitle}
                      </span>
                    </td>
                    <td className="p-3 text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed">
                      {event.trigger}
                    </td>
                    <td className="p-3 text-[#2B4636] dark:text-[#86EFAC] leading-relaxed font-medium">
                      {event.impactOnBelievers}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#5A6458] dark:text-[#9FB3A4]">
                      {event.scriptureEgwRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
