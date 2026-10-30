import React from 'react';
import {
  AlertCircle,
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Inbox
} from 'lucide-react';
import { TrackerTask, isDateOverdue, isDateThisWeek } from './types';
import { KanbanCard } from './KanbanCard';
import { Badge, Card } from '@/components/ui';

export interface TrackerThisWeekViewProps {
  tasks: TrackerTask[];
  onToggleComplete: (task: TrackerTask) => void;
  onUpdateTask: (task: TrackerTask) => void;
  onDeleteTask: (task: TrackerTask) => void;
  onMoveStage: (task: TrackerTask, direction: 'prev' | 'next') => void;
  onQuickAdd: (columnId?: string) => void;
}

export function TrackerThisWeekView({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onMoveStage,
  onQuickAdd
}: TrackerThisWeekViewProps) {
  // 1. Overdue tasks
  const overdueTasks = tasks.filter((t) => !t.completed && isDateOverdue(t.dueDate));

  // 2. Due this week
  const dueThisWeekTasks = tasks.filter((t) => !t.completed && isDateThisWeek(t.dueDate));

  // 3. In-progress tasks not specifically due this week or overdue
  const inProgressTasks = tasks.filter(
    (t) =>
      t.columnId === 'inprogress' &&
      !t.completed &&
      !isDateOverdue(t.dueDate) &&
      !isDateThisWeek(t.dueDate)
  );

  // 4. Completed
  const completedTasks = tasks.filter((t) => t.completed);

  const totalThisWeekCount = overdueTasks.length + dueThisWeekTasks.length + inProgressTasks.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Telemetry Banner */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                Active sprint schedule
              </span>
              <Badge status={overdueTasks.length > 0 ? 'Estimate' : 'Verified'}>
                {overdueTasks.length > 0 ? `${overdueTasks.length} overdue` : 'On schedule'}
              </Badge>
            </div>
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)] leading-snug">
              This week's homestead focus ({totalThisWeekCount} active items)
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onQuickAdd('inprogress')}
          className="px-3.5 py-2 text-[12px] font-sans font-semibold rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={14} />
          <span>Add task for this week (N)</span>
        </button>
      </div>

      {/* 3 Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* SECTION 1: OVERDUE OR URGENT */}
        <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 dark:text-rose-400" />
              <h4 className="font-serif text-[15px] font-bold text-[var(--ink)]">
                Overdue attention
              </h4>
            </div>
            <span className="font-mono text-[11px] tabular-nums font-semibold px-2 py-0.5 rounded-[var(--radius-control)] bg-rose-500/15 text-rose-800 dark:text-rose-200 border border-rose-500/30">
              {overdueTasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {overdueTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[12px] text-[var(--ink-muted)] gap-1.5">
                <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span>Zero overdue tasks. Everything is current.</span>
              </div>
            ) : (
              overdueTasks.map((t) => (
                <KanbanCard
                  key={t.id}
                  task={t}
                  onToggleComplete={onToggleComplete}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onMoveStage={onMoveStage}
                />
              ))
            )}
          </div>
        </div>

        {/* SECTION 2: DUE THIS WEEK */}
        <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-amber-600 dark:text-amber-400" />
              <h4 className="font-serif text-[15px] font-bold text-[var(--ink)]">
                Due this week
              </h4>
            </div>
            <span className="font-mono text-[11px] tabular-nums font-semibold px-2 py-0.5 rounded-[var(--radius-control)] bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
              {dueThisWeekTasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {dueThisWeekTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[12px] text-[var(--ink-muted)] gap-1.5">
                <Inbox size={18} className="text-[var(--ink-muted)]" />
                <span>No tasks specifically due this week.</span>
                <button
                  type="button"
                  onClick={() => onQuickAdd('todo')}
                  className="text-[12px] text-[var(--accent)] hover:underline"
                >
                  + Schedule one
                </button>
              </div>
            ) : (
              dueThisWeekTasks.map((t) => (
                <KanbanCard
                  key={t.id}
                  task={t}
                  onToggleComplete={onToggleComplete}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onMoveStage={onMoveStage}
                />
              ))
            )}
          </div>
        </div>

        {/* SECTION 3: IN PROGRESS / ACTIVE WORKS */}
        <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[var(--accent)]" />
              <h4 className="font-serif text-[15px] font-bold text-[var(--ink)]">
                Active in progress
              </h4>
            </div>
            <span className="font-mono text-[11px] tabular-nums font-semibold px-2 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)]">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {inProgressTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[12px] text-[var(--ink-muted)] gap-1.5">
                <Inbox size={18} className="text-[var(--ink-muted)]" />
                <span>No active works marked in progress.</span>
              </div>
            ) : (
              inProgressTasks.map((t) => (
                <KanbanCard
                  key={t.id}
                  task={t}
                  onToggleComplete={onToggleComplete}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onMoveStage={onMoveStage}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
