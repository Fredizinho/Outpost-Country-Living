import React from 'react';
import {
  Compass,
  ShieldCheck,
  AlertTriangle,
  Home,
  HeartHandshake,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DUAL_READINESS_ROWS,
  CITY_HAZARDS,
  OUTPOST_PRINCIPLES,
} from '@/data/prophecy/countryLivingCounsels';

export function CountryLivingBlueprintViewer() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Header Banner */}
      <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B85D36] dark:text-[#E2875A] font-bold">
          <Compass size={14} />
          <span>Ellen G. White Counsels &amp; Operational Blueprint</span>
          <span className="text-[#5A6458] dark:text-[#9FB3A4]" aria-hidden="true">·</span>
          <span className="font-serif italic font-normal text-[#5A6458] dark:text-[#9FB3A4]">
            Physical Preparation &amp; Prophetic Discernment
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2A22] dark:text-[#FFFDF8] tracking-tight">
          Country Living &amp; The Outpost Center Model
        </h2>
        <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] max-w-3xl leading-relaxed">
          Physical relocation cannot be isolated from prophetic timeline study. An unbalanced emphasis produces fanaticism or spiritual complacency. True readiness synthesizes physical outposts with spiritual vigilance.
        </p>
      </div>

      {/* 2. Diagnostic Focus Table: Physical Focus vs Prophetic Focus vs Balanced Ideal */}
      <div className="bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] rounded-xl overflow-hidden shadow-xs flex flex-col">
        <div className="p-4 sm:p-5 bg-[#F6F1E7] dark:bg-[#0E1712] border-b border-[#E4DCCB] dark:border-[#283C30] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] block">
              Analytical Diagnostic Framework
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
              Dual Readiness: Harmonizing Physical Outposts &amp; Spiritual Vigilance
            </h3>
          </div>
          <span className="text-caption font-mono text-[#5A6458] dark:text-[#9FB3A4]">
            The Great Controversy, p. 594
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F6F1E7]/60 dark:bg-[#0E1712]/60 border-b border-[#E4DCCB] dark:border-[#283C30] text-caption font-mono uppercase text-[#5A6458] dark:text-[#9FB3A4]">
              <tr>
                <th className="p-3.5 w-36">Dimension</th>
                <th className="p-3.5 text-amber-800 dark:text-amber-300">Physical / Practical Focus Alone</th>
                <th className="p-3.5 text-sky-800 dark:text-sky-300">Prophetic / Spiritual Focus Alone</th>
                <th className="p-3.5 text-[#2B4636] dark:text-[#86EFAC]">Balanced Ideal (Dual Readiness)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DCCB] dark:divide-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C]">
              {DUAL_READINESS_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F6F1E7]/50 dark:hover:bg-[#0E1712]/50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                    {row.dimension}
                  </td>
                  <td className="p-3.5 text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {row.physicalFocus}
                  </td>
                  <td className="p-3.5 text-sky-900 dark:text-sky-200/90 leading-relaxed">
                    {row.propheticFocus}
                  </td>
                  <td className="p-3.5 text-[#2B4636] dark:text-[#86EFAC] font-medium leading-relaxed bg-[#2B4636]/5 dark:bg-[#1F3325]/30">
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
          <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#B85D36] dark:text-[#E2875A] block">
            Counsels on Leaving the Cities
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
            Four Hazards Requiring Urban Exit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CITY_HAZARDS.map((hazard) => (
            <div
              key={hazard.number}
              className="p-5 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-caption font-bold text-[#B85D36] dark:text-[#E2875A]">
                  HAZARD 0{hazard.number}
                </span>
                <span className="font-mono text-[11px] text-[#5A6458] dark:text-[#9FB3A4]">
                  {hazard.egwCitation}
                </span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                {hazard.hazard}
              </h4>
              <span className="font-sans italic text-xs text-[#5A6458] dark:text-[#9FB3A4]">
                {hazard.chichewaTitle}
              </span>
              <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#D0DAD2] leading-relaxed pt-1 border-t border-[#E4DCCB] dark:border-[#283C30]">
                {hazard.counselSummary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Outpost Center Operational Model & Pastoral Governance */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-mono text-caption font-bold uppercase tracking-wider text-[#2B4636] dark:text-[#D4A034] block">
            The Outpost Center Operational Model (Evangelism 194–195)
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
            Rural Sanctuary &amp; Pastoral Governance Guidelines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OUTPOST_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col gap-2 shadow-xs"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-serif text-base font-bold text-[#1F2A22] dark:text-[#FFFDF8]">
                  {principle.title}
                </h4>
                <span className="font-mono text-caption text-[#2B4636] dark:text-[#D4A034] font-bold">
                  0{idx + 1}
                </span>
              </div>
              <span className="font-sans italic text-xs text-[#5A6458] dark:text-[#9FB3A4]">
                {principle.chichewaTitle}
              </span>
              <p className="text-xs sm:text-sm text-[#1F2A22] dark:text-[#F6F1E7] leading-relaxed">
                {principle.description}
              </p>
              <div className="mt-1 p-3 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-xs text-[#5A6458] dark:text-[#D0DAD2] flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[#3F6B4E] dark:text-[#86EFAC] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1F2A22] dark:text-[#FFFDF8]">Field Application: </strong>
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
