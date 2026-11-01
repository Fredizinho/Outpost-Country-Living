import React, { useState } from 'react';
import {
  Clock,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ENDLINE_CHRONOLOGICAL_EVENTS } from '@/data/prophecy/endlineChronologicalEvents';

export function ChronologicalEventsViewer() {
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const selectedEvent = ENDLINE_CHRONOLOGICAL_EVENTS[selectedEventIndex];

  return (
    <div className="flex flex-col gap-6">
      {/* Header & View Mode Switcher */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans text-[var(--accent)] font-semibold">
            <Clock size={14} />
            <span>Orderly apocalyptic progression</span>
            <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
            <span className="font-serif italic font-normal text-[var(--ink-muted)]">
              "Event After Event" (DA 634; GC 594)
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight mt-1">
            The 10 Chronological End-Time Events
          </h2>
        </div>

        <div className="inline-flex items-center gap-1 bg-[var(--ground)] p-1 rounded-[var(--radius-control)] border border-[var(--border)] text-xs font-sans self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={cn(
              'px-3 py-1.5 rounded-[var(--radius-control)] transition-all cursor-pointer font-semibold',
              viewMode === 'timeline'
                ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            Sequential cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={cn(
              'px-3 py-1.5 rounded-[var(--radius-control)] transition-all cursor-pointer font-semibold',
              viewMode === 'table'
                ? 'bg-[var(--color-moss-light)] text-white shadow-xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            Comparative table
          </button>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 10-Step Index Rail */}
          <div className="lg:col-span-5 flex flex-col gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-3 sm:p-4 shadow-xs">
            <span className="font-sans text-caption font-semibold text-[var(--ink-muted)] px-1 pb-1 border-b border-[var(--border)]">
              Chronological sequence
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
                      'p-2.5 rounded-[var(--radius-control)] border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2',
                      active
                        ? 'bg-[var(--color-moss-light)] border-[var(--color-moss-light)] text-white shadow-xs'
                        : 'bg-[var(--ground)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--ground)]/80'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={cn('font-mono text-caption font-bold tabular-nums shrink-0', active ? 'text-[var(--gold)]' : 'text-[var(--accent)]')}>
                        {event.step < 10 ? `0${event.step}` : event.step}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-serif font-bold truncate leading-snug">
                          {event.phase}
                        </span>
                        <span className={cn('text-[10px] truncate italic', active ? 'text-emerald-100/70' : 'text-[var(--ink-muted)]')}>
                          {event.chichewaTitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={13} className={cn('shrink-0', active ? 'text-[var(--gold)]' : 'text-[var(--ink-muted)]')} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Event Detailed Dossier */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-7 flex flex-col gap-5 shadow-xs">
            <div className="flex flex-col gap-1.5 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-sans">
                <span className="font-mono text-[var(--accent)] font-semibold">
                  Waymark {selectedEvent.step < 10 ? `0${selectedEvent.step}` : selectedEvent.step} of 10
                </span>
                <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
                <span className="font-mono text-[var(--moss)] dark:text-[var(--gold)] font-medium">
                  {selectedEvent.scriptureEgwRef}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--ink)] tracking-tight">
                {selectedEvent.phase}
              </h3>
              <span className="font-sans italic text-xs text-[var(--accent)]">
                {selectedEvent.chichewaTitle}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs sm:text-sm">
                <strong className="text-[var(--accent)] font-sans text-caption font-semibold block mb-1">
                  Theological &amp; event trigger:
                </strong>
                <p className="text-[var(--ink)] leading-relaxed">
                  {selectedEvent.trigger}
                </p>
              </div>

              <div className="p-4 rounded-[var(--radius-control)] bg-[var(--success)]/10 border border-[var(--border)] text-xs sm:text-sm">
                <strong className="text-[var(--moss)] dark:text-[var(--gold)] font-sans text-caption font-semibold block mb-1">
                  Practical &amp; spiritual impact on believers:
                </strong>
                <p className="text-[var(--ink)] leading-relaxed">
                  {selectedEvent.impactOnBelievers}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
              <span className="font-sans text-caption font-semibold text-[var(--ink-muted)]">
                Analytical exegesis:
              </span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                {selectedEvent.detailedAnalysis}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Comparative Sequence Table */
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] overflow-hidden shadow-xs">
          <div className="p-4 bg-[var(--ground)] border-b border-[var(--border)] flex items-center justify-between">
            <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)]">
              Comparative sequence table: Waymarks 01 through 10
            </span>
            <span className="text-caption font-mono text-[var(--ink-muted)]">
              10 Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[var(--ground)]/60 border-b border-[var(--border)] text-caption font-sans font-medium text-[var(--ink-muted)]">
                <tr>
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3 w-48">Prophetic phase</th>
                  <th className="p-3">Key theological / event trigger</th>
                  <th className="p-3">Practical / spiritual impact</th>
                  <th className="p-3 w-36">Citations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                {ENDLINE_CHRONOLOGICAL_EVENTS.map((event) => (
                  <tr key={event.step} className="hover:bg-[var(--ground)]/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-center text-[var(--accent)] tabular-nums">
                      {event.step < 10 ? `0${event.step}` : event.step}
                    </td>
                    <td className="p-3">
                      <span className="font-serif font-bold text-[var(--ink)] block">
                        {event.phase}
                      </span>
                      <span className="font-sans text-[10px] italic text-[var(--ink-muted)] block mt-0.5">
                        {event.chichewaTitle}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--ink-muted)] leading-relaxed">
                      {event.trigger}
                    </td>
                    <td className="p-3 text-[var(--moss)] dark:text-[var(--success)] leading-relaxed font-medium">
                      {event.impactOnBelievers}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[var(--ink-muted)]">
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
