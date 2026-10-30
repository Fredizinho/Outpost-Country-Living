import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  CloudRain,
  Thermometer,
  Sprout,
  Wrench,
  CheckCircle2,
  HeartPulse,
  Home,
  Check,
  ChevronRight,
  Info,
  CheckSquare
} from 'lucide-react';
import { MONTHLY_CALENDAR, MonthlyCalendarSpec, MonthlyTaskItem } from '@/data/monthlyCalendarData';
import { DISTRICT_RAINFALL_PRESETS } from '@/constants';
import { PageHeader, Badge, Chip, Select, Button, useToast } from '@/components/ui';
import { ActiveDistrictContextBar } from '@/components/common/ActiveDistrictContextBar';
import { getActiveHomesteadDistrictId, setActiveHomesteadDistrictId } from '@/lib/activeDistrictSync';
import { ThisMonthCard } from '@/components/almanac/ThisMonthCard';
import { cn } from '@/lib/utils';

export default function SeasonalGuide() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const realCurrentMonthIdx = new Date().getMonth(); // 0 - 11
  const monthQueryParam = searchParams.get('month');

  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(() => {
    if (monthQueryParam !== null) {
      const parsed = parseInt(monthQueryParam, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 11) return parsed;
    }
    return realCurrentMonthIdx;
  });

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(() =>
    getActiveHomesteadDistrictId('dedza')
  );

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('outpost_monthly_tasks_completed_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const activeMonthData: MonthlyCalendarSpec =
    MONTHLY_CALENDAR[selectedMonthIdx] || MONTHLY_CALENDAR[realCurrentMonthIdx];

  const districtPreset =
    DISTRICT_RAINFALL_PRESETS[selectedDistrictId.toLowerCase()] ||
    DISTRICT_RAINFALL_PRESETS.dedza;

  const handleSelectMonth = (idx: number) => {
    setSelectedMonthIdx(idx);
    setSearchParams((prev) => {
      const u = new URLSearchParams(prev);
      u.set('month', idx.toString());
      return u;
    });
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('outpost_monthly_tasks_completed_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleDistrictChange = (d: string) => {
    setSelectedDistrictId(d);
    setActiveHomesteadDistrictId(d);
  };

  // Grouped task categories
  const taskGroups = [
    {
      id: 'plant',
      label: 'Plant',
      sublabel: 'Seed sowing & root establishment',
      icon: Sprout,
      accent: 'text-emerald-700 dark:text-emerald-400',
      items: activeMonthData.groups.plant
    },
    {
      id: 'prepare',
      label: 'Prepare',
      sublabel: 'Site works, soil building & water swales',
      icon: Wrench,
      accent: 'text-[var(--accent)]',
      items: activeMonthData.groups.prepare
    },
    {
      id: 'harvest',
      label: 'Harvest',
      sublabel: 'Harvesting, seed saving & pantry drying',
      icon: CheckCircle2,
      accent: 'text-amber-800 dark:text-amber-300',
      items: activeMonthData.groups.harvest
    },
    {
      id: 'careForAnimals',
      label: 'Care for animals',
      sublabel: 'Poultry vaccination, khola bedding & forage',
      icon: HeartPulse,
      accent: 'text-rose-700 dark:text-rose-300',
      items: activeMonthData.groups.careForAnimals
    },
    {
      id: 'household',
      label: 'Household',
      sublabel: 'Hearth baking, rainwater filters & stores',
      icon: Home,
      accent: 'text-indigo-700 dark:text-indigo-300',
      items: activeMonthData.groups.household
    }
  ];

  // Screen reader accessible weather narrative
  const screenReaderSummary = useMemo(() => {
    return `For ${activeMonthData.monthName} in ${districtPreset.name}: Season is ${activeMonthData.seasonName} (${activeMonthData.chichewaSeason}). Regional precipitation averages ${activeMonthData.rainfallAvgMm} millimeters. Monthly temperatures range from ${activeMonthData.tempAvgC.min} degrees Celsius to ${activeMonthData.tempAvgC.max} degrees Celsius. Key agricultural focus: ${activeMonthData.summary}`;
  }, [activeMonthData, districtPreset]);

  // Count completed tasks for the current month
  const allCurrentMonthTasks = useMemo(() => {
    return [
      ...activeMonthData.groups.plant,
      ...activeMonthData.groups.prepare,
      ...activeMonthData.groups.harvest,
      ...activeMonthData.groups.careForAnimals,
      ...activeMonthData.groups.household
    ];
  }, [activeMonthData]);

  const monthCompletedCount = allCurrentMonthTasks.filter((t) => completedTasks[t.id]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-8">
      {/* 1. Page Header */}
      <PageHeader
        title="12-month agricultural almanac & seasonal guide"
        eyebrow="Chronological Field Guide"
        summary="A month-by-month agricultural roadmap aligned with Malawi’s tropical wet and dry seasons, guiding planting schedules, soil building, water harvesting, and food preservation."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="12-month year view" />
            <Chip label="5 grouped operational categories" />
            <Chip label={`Target district: ${districtPreset.name}`} />
          </>
        }
      />

      {/* 2. Active District Telemetry Bar */}
      <ActiveDistrictContextBar onDistrictSelect={handleDistrictChange} />

      {/* 3. Reusable "This Month" Hero Card */}
      <ThisMonthCard monthIndex={realCurrentMonthIdx} showLinkToAlmanac={false} />

      {/* ================================================================== */}
      {/* 4. 12-MONTH STRIP (RAINY & DRY COLORED, CURRENT MONTH HIGHLIGHTED) */}
      {/* ================================================================== */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[var(--accent)]" />
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              12-month agricultural timeline
            </h3>
          </div>

          <div className="flex items-center gap-4 text-[12px] font-sans">
            <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/40 border border-emerald-600/60" />
              <span>Rainy months (Nov&ndash;Apr)</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/60" />
              <span>Dry months (May&ndash;Oct)</span>
            </span>
          </div>
        </div>

        {/* 12-Month Strip Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {MONTHLY_CALENDAR.map((m) => {
            const isSelected = selectedMonthIdx === m.monthIndex;
            const isRealCurrent = realCurrentMonthIdx === m.monthIndex;
            const isRainy = m.seasonType === 'rainy';

            return (
              <button
                key={m.monthIndex}
                type="button"
                onClick={() => handleSelectMonth(m.monthIndex)}
                className={cn(
                  'relative p-2.5 rounded-[var(--radius-card)] border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1.5 min-h-[76px]',
                  isRainy
                    ? 'bg-emerald-950/5 dark:bg-emerald-950/25 border-emerald-600/30'
                    : 'bg-amber-500/5 dark:bg-amber-500/15 border-amber-600/30',
                  isSelected && 'ring-2 ring-[var(--accent)] border-[var(--accent)] bg-[var(--surface)] shadow-xs',
                  !isSelected && 'hover:border-[var(--accent)]/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[15px] font-bold text-[var(--ink)]">
                    {m.shortName}
                  </span>
                  {isRealCurrent && (
                    <span
                      className="px-1.5 py-0.2 rounded-xs bg-[var(--accent)] text-[var(--accent-ink)] text-[10px] font-mono font-bold"
                      title="Current active month"
                    >
                      Now
                    </span>
                  )}
                </div>

                <div className="flex flex-col text-[11px] font-mono tabular-nums leading-tight text-[var(--ink-muted)]">
                  <span>{m.rainfallAvgMm} mm</span>
                  <span className="truncate">{m.chichewaSeason}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Month Selector Dropdown for Rapid Access */}
        <div className="flex items-center justify-between gap-3 pt-1 text-[13px] text-[var(--ink-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">
              Select month:
            </span>
            <select
              value={selectedMonthIdx}
              onChange={(e) => handleSelectMonth(parseInt(e.target.value, 10))}
              className="px-2.5 py-1 text-[12px] font-sans bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              {MONTHLY_CALENDAR.map((m) => (
                <option key={m.monthIndex} value={m.monthIndex}>
                  {m.monthName} ({m.seasonName}) &mdash; {m.rainfallAvgMm} mm
                </option>
              ))}
            </select>
          </div>

          <span className="font-mono text-[12px] tabular-nums">
            {monthCompletedCount} of {allCurrentMonthTasks.length} tasks completed
          </span>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. "WHAT TO DO THIS MONTH" LIST (5 DISTINCT GROUPS)                */}
      {/* ================================================================== */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                What to do this month
              </span>
              <Badge status={activeMonthData.seasonType === 'rainy' ? 'Verified' : 'Estimate'}>
                {activeMonthData.seasonName}
              </Badge>
            </div>
            <h3 className="font-serif text-[22px] sm:text-[26px] font-bold text-[var(--ink)]">
              {activeMonthData.monthName} agronomy & homestead work ({activeMonthData.chichewaSeason})
            </h3>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-mono tabular-nums text-[var(--ink)]">
            <span>{activeMonthData.rainfallAvgMm} mm precipitation</span>
            <span>&middot;</span>
            <span>{activeMonthData.tempAvgC.min}&deg;C to {activeMonthData.tempAvgC.max}&deg;C</span>
          </div>
        </div>

        {/* 5 Grouped Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {taskGroups.map((group) => {
            const GroupIcon = group.icon;
            const groupTasks = group.items;
            const completedInGroup = groupTasks.filter((t) => completedTasks[t.id]).length;

            return (
              <div
                key={group.id}
                className="p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-3.5"
              >
                {/* Group Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={cn('p-1.5 rounded-[var(--radius-control)] bg-[var(--ground)]', group.accent)}>
                      <GroupIcon size={16} />
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-[var(--ink)] leading-snug">
                        {group.label}
                      </h4>
                      <p className="text-[12px] text-[var(--ink-muted)] line-clamp-1">
                        {group.sublabel}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] tabular-nums font-semibold px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] text-[var(--ink-muted)] border border-[var(--border)] shrink-0">
                    {completedInGroup}/{groupTasks.length}
                  </span>
                </div>

                {/* Tasks List */}
                {groupTasks.length === 0 ? (
                  <div className="py-6 text-center text-[12px] text-[var(--ink-muted)] italic">
                    No primary tasks scheduled for this phase.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {groupTasks.map((t) => {
                      const isDone = !!completedTasks[t.id];
                      return (
                        <div
                          key={t.id}
                          onClick={() => toggleTask(t.id)}
                          className={cn(
                            'p-3 rounded-[var(--radius-control)] border transition-all flex items-start gap-3 cursor-pointer select-none',
                            isDone
                              ? 'bg-[var(--ground)] border-emerald-600/40 opacity-80'
                              : 'bg-[var(--ground)]/60 border-[var(--border)] hover:border-[var(--accent)]/60'
                          )}
                        >
                          <button
                            type="button"
                            className={cn(
                              'w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                              isDone
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'
                            )}
                            aria-label={isDone ? `Mark ${t.title} incomplete` : `Mark ${t.title} complete`}
                          >
                            {isDone && <Check size={12} />}
                          </button>

                          <div className="flex flex-col gap-0.5 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={cn(
                                  'text-[13px] font-sans font-medium',
                                  isDone ? 'line-through text-[var(--ink-muted)]' : 'text-[var(--ink)]'
                                )}
                              >
                                {t.title}
                              </span>
                              {t.chichewaTerm && (
                                <span className="text-[11px] font-sans text-[var(--accent)] italic">
                                  ({t.chichewaTerm})
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed">
                              {t.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. RAINFALL AND TEMPERATURE CHARTS WITH THEME TOKENS               */}
      {/* ================================================================== */}
      <section className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-6">
        {/* Section Header with District Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Meteorological telemetry
            </span>
            <h3 className="font-serif text-[18px] sm:text-[22px] font-bold text-[var(--ink)]">
              Annual precipitation & temperature profile ({districtPreset.name})
            </h3>
          </div>

          <div className="w-full sm:w-64">
            <Select
              value={selectedDistrictId.toLowerCase()}
              onChange={(e) => handleDistrictChange(e.target.value)}
              options={Object.entries(DISTRICT_RAINFALL_PRESETS).map(([k, v]) => ({
                value: k,
                label: `${v.name} (${v.rainfall} mm)`
              }))}
            />
          </div>
        </div>

        {/* Screen Reader Accessible Narrative Box */}
        <div
          role="region"
          aria-label="Climate Telemetry Summary"
          className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-[13px] text-[var(--ink-muted)] leading-relaxed"
        >
          <div className="flex items-center gap-1.5 font-semibold text-[var(--ink)] mb-1">
            <Info size={14} className="text-[var(--accent)]" />
            <span>Accessible meteorological summary for {districtPreset.name}:</span>
          </div>
          <p>{screenReaderSummary}</p>
        </div>

        {/* Chart 1: Rainfall Distribution Bar Chart */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-sans font-semibold text-[var(--ink)] flex items-center gap-1.5">
              <CloudRain size={15} className="text-sky-600 dark:text-sky-400" />
              <span>Monthly rainfall distribution (mm)</span>
            </span>
            <span className="text-[12px] font-mono text-[var(--ink-muted)]">
              Click month to inspect
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 items-end h-40 pt-5 pb-2 border-b border-[var(--border)]">
            {MONTHLY_CALENDAR.map((m) => {
              const heightPct = Math.round((m.rainfallAvgMm / 300) * 100);
              const isSelected = selectedMonthIdx === m.monthIndex;
              const isRainy = m.seasonType === 'rainy';

              return (
                <div
                  key={m.monthIndex}
                  onClick={() => handleSelectMonth(m.monthIndex)}
                  className="flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                  title={`${m.monthName}: ${m.rainfallAvgMm} mm`}
                >
                  <span className="text-[10px] font-mono tabular-nums text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.rainfallAvgMm}
                  </span>
                  <div
                    className={cn(
                      'w-full rounded-t-[4px] transition-all',
                      isRainy ? 'bg-sky-700 dark:bg-sky-500' : 'bg-amber-600 dark:bg-amber-500',
                      isSelected ? 'ring-2 ring-[var(--accent)]' : 'opacity-80 group-hover:opacity-100'
                    )}
                    style={{ height: `${Math.max(6, heightPct)}%` }}
                  />
                  <span
                    className={cn(
                      'text-[11px] font-sans font-medium',
                      isSelected ? 'text-[var(--accent)] font-bold' : 'text-[var(--ink-muted)]'
                    )}
                  >
                    {m.shortName}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[12px] text-[var(--ink-muted)] pt-1 font-sans">
            <span>Peak rainy period: January &ndash; February (240&ndash;280 mm)</span>
            <span>Dry baseline: July &ndash; August (2&ndash;5 mm)</span>
          </div>
        </div>

        {/* Chart 2: Temperature Range Chart with Theme Tokens */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-sans font-semibold text-[var(--ink)] flex items-center gap-1.5">
              <Thermometer size={15} className="text-amber-600 dark:text-amber-400" />
              <span>Monthly temperature range (&deg;C)</span>
            </span>
            <span className="text-[12px] font-mono text-[var(--ink-muted)]">
              Min / Max averages
            </span>
          </div>

          <div className="grid grid-cols-12 gap-1.5 items-end h-36 pt-4 pb-2 border-b border-[var(--border)]">
            {MONTHLY_CALENDAR.map((m) => {
              const isSelected = selectedMonthIdx === m.monthIndex;
              // Normalize temp from 10 to 35 C
              const minHeightPct = Math.round(((m.tempAvgC.min - 10) / 25) * 100);
              const maxHeightPct = Math.round(((m.tempAvgC.max - 10) / 25) * 100);
              const barHeightPct = maxHeightPct - minHeightPct;

              return (
                <div
                  key={m.monthIndex}
                  onClick={() => handleSelectMonth(m.monthIndex)}
                  className="flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                  title={`${m.monthName}: ${m.tempAvgC.min}°C to ${m.tempAvgC.max}°C`}
                >
                  <span className="text-[10px] font-mono tabular-nums text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.tempAvgC.max}&deg;
                  </span>
                  <div className="w-full flex flex-col justify-end h-full">
                    <div
                      className={cn(
                        'w-full rounded-[3px] bg-gradient-to-t from-teal-700 to-amber-600 dark:from-teal-500 dark:to-amber-400 transition-all',
                        isSelected ? 'ring-2 ring-[var(--accent)]' : 'opacity-80 group-hover:opacity-100'
                      )}
                      style={{ height: `${Math.max(12, barHeightPct)}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[11px] font-sans font-medium',
                      isSelected ? 'text-[var(--accent)] font-bold' : 'text-[var(--ink-muted)]'
                    )}
                  >
                    {m.shortName}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[12px] text-[var(--ink-muted)] pt-1 font-sans">
            <span>Coolest months: June &ndash; July (12&ndash;22&deg;C)</span>
            <span>Warmest pre-rain months: October &ndash; November (20&ndash;31&deg;C)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
