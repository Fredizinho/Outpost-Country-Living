import React from 'react';
import {
  Compass,
  CheckCircle2,
} from 'lucide-react';
import {
  DUAL_READINESS_ROWS,
  CITY_HAZARDS,
  OUTPOST_PRINCIPLES,
} from '@/data/prophecy/countryLivingCounsels';

export function CountryLivingBlueprintViewer() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Header Banner */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-sans text-[var(--accent)] font-semibold">
          <Compass size={14} />
          <span>Ellen G. White Counsels &amp; Operational Blueprint</span>
          <span className="text-[var(--ink-muted)]" aria-hidden="true">·</span>
          <span className="font-serif italic font-normal text-[var(--ink-muted)]">
            Physical preparation &amp; prophetic discernment
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
          Country Living &amp; The Outpost Center Model
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-3xl leading-relaxed">
          Physical relocation cannot be isolated from prophetic timeline study. An unbalanced emphasis produces fanaticism or spiritual complacency. True readiness synthesizes physical outposts with spiritual vigilance.
        </p>
      </div>

      {/* 2. Diagnostic Focus Table: Physical Focus vs Prophetic Focus vs Balanced Ideal */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] overflow-hidden shadow-xs flex flex-col">
        <div className="p-4 sm:p-5 bg-[var(--ground)] border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] block">
              Analytical diagnostic framework
            </span>
            <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
              Dual Readiness: Harmonizing Physical Outposts &amp; Spiritual Vigilance
            </h3>
          </div>
          <span className="text-caption font-mono text-[var(--ink-muted)]">
            The Great Controversy, p. 594
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[var(--ground)]/60 border-b border-[var(--border)] text-caption font-sans font-medium text-[var(--ink-muted)]">
              <tr>
                <th className="p-3.5 w-36">Dimension</th>
                <th className="p-3.5 text-amber-800 dark:text-amber-300">Physical / practical focus alone</th>
                <th className="p-3.5 text-sky-800 dark:text-sky-300">Prophetic / spiritual focus alone</th>
                <th className="p-3.5 text-[var(--moss)] dark:text-[var(--success)] font-semibold">Balanced ideal (dual readiness)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
              {DUAL_READINESS_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--ground)]/50 transition-colors">
                  <td className="p-3.5 font-sans font-semibold text-[var(--ink)]">
                    {row.dimension}
                  </td>
                  <td className="p-3.5 text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {row.physicalFocus}
                  </td>
                  <td className="p-3.5 text-sky-900 dark:text-sky-200/90 leading-relaxed">
                    {row.propheticFocus}
                  </td>
                  <td className="p-3.5 text-[var(--moss)] dark:text-[var(--success)] font-medium leading-relaxed bg-[var(--success)]/5">
                    {row.balancedIdeal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Four Primary Hazards Dictating Urban Departure */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-sans text-caption font-semibold text-[var(--accent)] block">
            Counsels on leaving the cities
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
            Four Hazards Requiring Urban Exit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CITY_HAZARDS.map((hazard) => (
            <div
              key={hazard.number}
              className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-caption font-semibold text-[var(--accent)]">
                  Hazard 0{hazard.number}
                </span>
                <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                  {hazard.egwCitation}
                </span>
              </div>
              <h4 className="font-serif text-base font-bold text-[var(--ink)]">
                {hazard.hazard}
              </h4>
              <span className="font-sans italic text-xs text-[var(--ink-muted)]">
                {hazard.chichewaTitle}
              </span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed pt-1 border-t border-[var(--border)]">
                {hazard.counselSummary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Outpost Center Operational Model & Pastoral Governance */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-sans text-caption font-semibold text-[var(--moss)] dark:text-[var(--gold)] block">
            The outpost center operational model (Evangelism 194–195)
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)]">
            Rural Sanctuary &amp; Pastoral Governance Guidelines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OUTPOST_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2 shadow-xs"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-serif text-base font-bold text-[var(--ink)]">
                  {principle.title}
                </h4>
                <span className="font-mono text-caption text-[var(--moss)] dark:text-[var(--gold)] font-bold">
                  0{idx + 1}
                </span>
              </div>
              <span className="font-sans italic text-xs text-[var(--ink-muted)]">
                {principle.chichewaTitle}
              </span>
              <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                {principle.description}
              </p>
              <div className="mt-1 p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-xs text-[var(--ink-muted)] flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--success)] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[var(--ink)]">Field Application: </strong>
                  {principle.application}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
