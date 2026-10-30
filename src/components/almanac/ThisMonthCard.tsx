import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CloudRain,
  Thermometer,
  ArrowRight,
  Sprout,
  CheckCircle2,
  Wrench,
  Trees,
  Home
} from 'lucide-react';
import { MONTHLY_CALENDAR, MonthlyCalendarSpec } from '@/data/monthlyCalendarData';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface ThisMonthCardProps {
  monthIndex?: number; // 0-11, defaults to current month
  className?: string;
  showLinkToAlmanac?: boolean;
}

export function ThisMonthCard({
  monthIndex,
  className,
  showLinkToAlmanac = true
}: ThisMonthCardProps) {
  const currentMonthIdx = monthIndex !== undefined ? monthIndex : new Date().getMonth();
  const currentMonthData: MonthlyCalendarSpec =
    MONTHLY_CALENDAR[currentMonthIdx] || MONTHLY_CALENDAR[9]; // October fallback

  const isRainy = currentMonthData.seasonType === 'rainy';

  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-4',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              This month's seasonal guide
            </span>
            <Badge status={isRainy ? 'Verified' : 'Estimate'}>
              {currentMonthData.seasonName}
            </Badge>
          </div>
          <h3 className="font-serif text-[20px] sm:text-[24px] font-bold text-[var(--ink)] leading-snug">
            {currentMonthData.monthName} in Malawi ({currentMonthData.chichewaSeason})
          </h3>
        </div>

        {/* Climate Telemetry Pill */}
        <div className="flex items-center gap-3 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-mono tabular-nums text-[var(--ink)] shrink-0">
          <div className="flex items-center gap-1.5">
            <CloudRain size={14} className={isRainy ? 'text-sky-600 dark:text-sky-400' : 'text-[var(--ink-muted)]'} />
            <span>{currentMonthData.rainfallAvgMm} mm avg rain</span>
          </div>
          <span>&middot;</span>
          <div className="flex items-center gap-1.5">
            <Thermometer size={14} className="text-amber-600 dark:text-amber-400" />
            <span>{currentMonthData.tempAvgC.min}&deg;C to {currentMonthData.tempAvgC.max}&deg;C</span>
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-[14px] sm:text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-[70ch]">
        {currentMonthData.summary}
      </p>

      {/* Grouped Priorities Preview (No tiny labels or all-caps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        {/* Plant */}
        {currentMonthData.groups.plant[0] && (
          <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5">
            <span className="text-[12px] font-sans font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sprout size={14} />
              <span>Planting priority</span>
            </span>
            <h4 className="text-[13px] font-sans font-medium text-[var(--ink)] line-clamp-1">
              {currentMonthData.groups.plant[0].title}
            </h4>
            <p className="text-[12px] text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
              {currentMonthData.groups.plant[0].description}
            </p>
          </div>
        )}

        {/* Prepare */}
        {currentMonthData.groups.prepare[0] && (
          <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5">
            <span className="text-[12px] font-sans font-semibold text-[var(--accent)] flex items-center gap-1.5">
              <Wrench size={14} />
              <span>Site preparation</span>
            </span>
            <h4 className="text-[13px] font-sans font-medium text-[var(--ink)] line-clamp-1">
              {currentMonthData.groups.prepare[0].title}
            </h4>
            <p className="text-[12px] text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
              {currentMonthData.groups.prepare[0].description}
            </p>
          </div>
        )}

        {/* Harvest / Care */}
        {(currentMonthData.groups.harvest[0] || currentMonthData.groups.careForAnimals[0]) && (
          <div className="p-3.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] flex flex-col gap-1.5">
            <span className="text-[12px] font-sans font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Harvest and animal care</span>
            </span>
            <h4 className="text-[13px] font-sans font-medium text-[var(--ink)] line-clamp-1">
              {currentMonthData.groups.harvest[0]?.title || currentMonthData.groups.careForAnimals[0]?.title}
            </h4>
            <p className="text-[12px] text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
              {currentMonthData.groups.harvest[0]?.description || currentMonthData.groups.careForAnimals[0]?.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer Link */}
      {showLinkToAlmanac && (
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[12px] text-[var(--ink-muted)]">
          <span>Full 12-month agricultural almanac and checklists</span>
          <Link
            to="/seasons"
            className="inline-flex items-center gap-1 font-sans font-semibold text-[var(--accent)] hover:underline"
          >
            <span>Open seasonal guide</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}
