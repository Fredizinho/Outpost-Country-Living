import React from 'react';
import {
  LayoutGrid,
  List,
  Calendar,
  Layers,
  Search,
  Plus,
  Filter,
  Download,
  RotateCcw,
  X
} from 'lucide-react';
import { TrackerView, TrackerTag, ALL_TAGS, DueFilter } from './types';
import { Tabs, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface TrackerToolbarProps {
  currentView: TrackerView | 'readiness-ledger';
  onViewChange: (view: TrackerView | 'readiness-ledger') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  selectedDue: DueFilter;
  onDueChange: (due: DueFilter) => void;
  onQuickAdd: () => void;
  onExport: () => void;
  onReset: () => void;
  confirmingReset: boolean;
  totalTasks: number;
  filteredCount: number;
}

export function TrackerToolbar({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  selectedDue,
  onDueChange,
  onQuickAdd,
  onExport,
  onReset,
  confirmingReset,
  totalTasks,
  filteredCount
}: TrackerToolbarProps) {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedTag !== 'all' || selectedDue !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onTagChange('all');
    onDueChange('all');
  };

  const viewTabs = [
    { id: 'kanban', label: 'Kanban', icon: LayoutGrid },
    { id: 'list', label: 'List', icon: List },
    { id: 'this-week', label: 'This week', icon: Calendar },
    { id: 'readiness-ledger', label: 'Readiness ledger', icon: Layers }
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Top Bar: View Switcher Tabs + Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-1 border-b border-[var(--border)]">
        {/* Segmented View Tabs */}
        <div className="inline-flex items-center p-1 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)]">
          {viewTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onViewChange(tab.id as any)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-control)] text-[12px] font-sans font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold shadow-xs'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)]'
                )}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Quick Add (N), Export, Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={onQuickAdd}
          >
            <span>New task</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 ml-1 text-[10px] font-mono rounded bg-white/25 text-white">
              N
            </kbd>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={onExport}
          >
            Export
          </Button>

          <Button
            variant={confirmingReset ? 'destructive' : 'ghost'}
            size="sm"
            icon={RotateCcw}
            onClick={onReset}
          >
            {confirmingReset ? 'Confirm reset?' : 'Reset'}
          </Button>
        </div>
      </div>

      {/* Filter Bar: Search, Tag filter, Due filter, Reset filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-2.5 top-2.5 text-[var(--ink-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter tasks (Ctrl+F)..."
              className="w-full pl-8 pr-7 py-1.5 bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] text-[12px] font-sans placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-2 text-[var(--ink-muted)] hover:text-[var(--ink)] p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Tag Filter Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-sans text-[var(--ink-muted)] hidden sm:inline">Tag:</span>
            <select
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
              className="px-2.5 py-1.5 bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] text-[12px] font-sans focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              <option value="all">All tags</option>
              {ALL_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Due Filter Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-sans text-[var(--ink-muted)] hidden sm:inline">Due:</span>
            <select
              value={selectedDue}
              onChange={(e) => onDueChange(e.target.value as DueFilter)}
              className="px-2.5 py-1.5 bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] text-[12px] font-sans focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              <option value="all">All dates</option>
              <option value="overdue">Overdue only</option>
              <option value="this-week">Due this week</option>
              <option value="this-month">Due this month</option>
              <option value="no-date">No due date</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[11px] font-sans font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <X size={11} />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Counter indicator */}
        <div className="text-[12px] text-[var(--ink-muted)] font-mono tabular-nums shrink-0">
          Showing {filteredCount} of {totalTasks} tasks
        </div>
      </div>
    </div>
  );
}
