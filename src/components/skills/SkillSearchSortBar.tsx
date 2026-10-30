import React, { useEffect, useRef } from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { Tooltip } from '@/components/ui';
import { cn } from '@/lib/utils';

export type SortOption = 'title-asc' | 'time-asc' | 'level-asc' | 'category-asc';

export interface SkillSearchSortBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

export function SkillSearchSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  className
}: SkillSearchSortBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+F / Cmd+F handler to focus search bar
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)]',
        className
      )}
    >
      {/* Search Input with Ctrl+F indicator */}
      <div className="relative flex-1 flex items-center">
        <span className="absolute left-3 text-[var(--ink-muted)] pointer-events-none">
          <Search size={15} />
        </span>
        <input
          ref={searchInputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search manuals, tools, protocols (Ctrl+F)..."
          className="w-full h-9 pl-9 pr-20 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 rounded-[var(--radius-control)] border border-[var(--border)] hover:border-[var(--ink-muted)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        />
        <div className="absolute right-2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
          <Tooltip content="Focus search bar" shortcut="Ctrl+F">
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono text-[var(--ink-muted)] bg-[var(--ground)] border border-[var(--border)] rounded-xs select-none">
              ⌘F
            </kbd>
          </Tooltip>
        </div>
      </div>

      {/* Sort Control */}
      <div className="flex items-center gap-2 shrink-0">
        <ArrowUpDown size={14} className="text-[var(--ink-muted)] shrink-0" />
        <span className="text-[12px] font-sans text-[var(--ink-muted)] whitespace-nowrap">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort guides"
          className="h-9 px-3 text-[13px] font-sans bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
        >
          <option value="title-asc">Title (A–Z)</option>
          <option value="time-asc">Time to master</option>
          <option value="level-asc">Difficulty level</option>
          <option value="category-asc">Subject pillar</option>
        </select>
      </div>
    </div>
  );
}
