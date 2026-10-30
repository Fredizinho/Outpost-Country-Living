import React from 'react';
import { Filter, X, Bookmark, Check } from 'lucide-react';
import { Button, Chip } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface FilterState {
  pillar: string;
  district: string;
  season: string;
  level: string;
  status: string;
  bookmarkedOnly: boolean;
}

export interface SkillFilterRailProps {
  filters: FilterState;
  onChange: (updater: (prev: FilterState) => FilterState) => void;
  onClear: () => void;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

export const PILLARS = [
  'All',
  'Farming',
  'Water & Energy',
  'Food & Preservation',
  'Construction',
  'Medical & Health',
  'Livestock & Health',
  'SDA Education & Sustenance'
];

export const DISTRICTS = [
  'All',
  'Dedza',
  'Ntcheu',
  'Dowa',
  'Mzimba',
  'Zomba',
  'Mulanje',
  'Lilongwe',
  'Nkhata Bay'
];

export const SEASONS = [
  'All',
  'Rainy Planting',
  'Harvest & Storage',
  'Cold Dry Season',
  'Hot Dry Preparation',
  'Year-Round / Any Season'
];

export const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const STATUSES = ['All', 'Verified', 'Reviewed', 'Draft'];

export const SAVED_PRESETS: { name: string; filters: Partial<FilterState> }[] = [
  {
    name: 'Water security',
    filters: { pillar: 'Water & Energy', season: 'All', level: 'All', status: 'All' }
  },
  {
    name: 'True education',
    filters: { pillar: 'SDA Education & Sustenance', season: 'All', level: 'All', status: 'All' }
  },
  {
    name: 'Dry season prep',
    filters: { season: 'Hot Dry Preparation', pillar: 'All', level: 'All', status: 'All' }
  },
  {
    name: 'Verified guides',
    filters: { status: 'Verified', pillar: 'All', season: 'All', level: 'All' }
  }
];

export function SkillFilterRail({
  filters,
  onChange,
  onClear,
  totalCount,
  filteredCount,
  className
}: SkillFilterRailProps) {
  const isFiltered =
    filters.pillar !== 'All' ||
    filters.district !== 'All' ||
    filters.season !== 'All' ||
    filters.level !== 'All' ||
    filters.status !== 'All' ||
    filters.bookmarkedOnly;

  return (
    <aside
      className={cn(
        'w-full lg:w-64 shrink-0 flex flex-col gap-5 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]',
        className
      )}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-[var(--accent)]" />
          <h3 className="font-serif text-[16px] font-semibold text-[var(--ink)]">
            Filter library
          </h3>
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onClear}
            className="text-[12px] font-sans font-medium text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Saved Filter Presets */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          Saved filter presets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SAVED_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  ...preset.filters
                }))
              }
              className="text-[11px] font-sans px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmark Toggle */}
      <div className="pt-2 border-t border-[var(--border)]">
        <label className="flex items-center gap-2 text-[13px] font-sans font-medium text-[var(--ink)] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.bookmarkedOnly}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, bookmarkedOnly: e.target.checked }))
            }
            className="rounded-[3px] accent-[var(--accent)] cursor-pointer"
          />
          <Bookmark size={14} className={filters.bookmarkedOnly ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)]'} />
          <span>Bookmarked only</span>
        </label>
      </div>

      {/* Pillar / Category Filter */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border)]">
        <label htmlFor="filter-pillar" className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          Pillar / subject
        </label>
        <select
          id="filter-pillar"
          value={filters.pillar}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, pillar: e.target.value }))
          }
          className="w-full h-8 px-2.5 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          {PILLARS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* District Relevance Filter */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-district" className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          District suitability
        </label>
        <select
          id="filter-district"
          value={filters.district}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, district: e.target.value }))
          }
          className="w-full h-8 px-2.5 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Seasonal Tag Filter */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-season" className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          Seasonal window
        </label>
        <select
          id="filter-season"
          value={filters.season}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, season: e.target.value }))
          }
          className="w-full h-8 px-2.5 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Level */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-level" className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          Skill level
        </label>
        <select
          id="filter-level"
          value={filters.level}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, level: e.target.value }))
          }
          className="w-full h-8 px-2.5 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Status Badge */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-status" className="text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
          Status verification
        </label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, status: e.target.value }))
          }
          className="w-full h-8 px-2.5 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Count summary */}
      <div className="pt-3 border-t border-[var(--border)] text-[12px] font-sans text-[var(--ink-muted)] flex justify-between items-center">
        <span>Matching guides:</span>
        <span className="font-mono tabular-nums font-semibold text-[var(--ink)]">
          {filteredCount} / {totalCount}
        </span>
      </div>
    </aside>
  );
}
