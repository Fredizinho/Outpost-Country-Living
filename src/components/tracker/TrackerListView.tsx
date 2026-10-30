import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Trash2,
  Edit2,
  ArrowRight,
  Inbox
} from 'lucide-react';
import { TrackerTask, KanbanColumnId, KANBAN_COLUMNS, ALL_TAGS, formatDueDate, isDateOverdue } from './types';
import { Badge, Tooltip } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface TrackerListViewProps {
  tasks: TrackerTask[];
  onToggleComplete: (task: TrackerTask) => void;
  onUpdateTask: (task: TrackerTask) => void;
  onDeleteTask: (task: TrackerTask) => void;
  onQuickAdd: (columnId?: string) => void;
}

export function TrackerListView({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onQuickAdd
}: TrackerListViewProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (task: TrackerTask) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = (task: TrackerTask) => {
    if (editTitle.trim()) {
      onUpdateTask({ ...task, title: editTitle.trim() });
    }
    setEditingTaskId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] text-center text-[13px] text-[var(--ink-muted)] gap-3 shadow-xs">
        <Inbox size={24} className="text-[var(--ink-muted)] stroke-[1.5]" />
        <div>
          <p className="font-serif text-[16px] font-semibold text-[var(--ink)]">No tasks match current filters</p>
          <p className="text-[13px] text-[var(--ink-muted)] mt-0.5">Try clearing your filters or create a new task</p>
        </div>
        <button
          type="button"
          onClick={() => onQuickAdd()}
          className="mt-1 px-3 py-1.5 text-[12px] font-sans font-semibold rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
        >
          + Add new task (N)
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs overflow-hidden flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-3 p-3.5 bg-[var(--ground)] border-b border-[var(--border)] text-[12px] font-sans font-semibold text-[var(--ink-muted)]">
        <div className="col-span-1 flex items-center justify-center">Done</div>
        <div className="col-span-5 sm:col-span-5">Task description</div>
        <div className="col-span-3 sm:col-span-2">Stage</div>
        <div className="col-span-3 sm:col-span-2">Tag</div>
        <div className="hidden sm:block sm:col-span-2">Due date</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[var(--border)]">
        {tasks.map((task) => {
          const isEditing = editingTaskId === task.id;
          const isOverdue = !task.completed && isDateOverdue(task.dueDate);

          return (
            <div
              key={task.id}
              className={cn(
                'grid grid-cols-12 gap-3 p-3 sm:p-3.5 items-center hover:bg-[var(--ground)]/60 transition-colors text-[13px]',
                task.completed && 'opacity-75 bg-[var(--ground)]/30'
              )}
            >
              {/* Done checkbox */}
              <div className="col-span-1 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onToggleComplete(task)}
                  className="cursor-pointer text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle size={16} />
                  )}
                </button>
              </div>

              {/* Title / Inline edit */}
              <div className="col-span-5 sm:col-span-5 min-w-0 pr-2">
                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={editTitle}
                      autoFocus
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(task);
                        if (e.key === 'Escape') setEditingTaskId(null);
                      }}
                      className="w-full px-2 py-1 text-[13px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(task)}
                      className="px-2 py-1 text-[11px] font-semibold rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group/row">
                    <span
                      onDoubleClick={() => handleStartEdit(task)}
                      className={cn(
                        'truncate font-medium',
                        task.completed ? 'line-through text-[var(--ink-muted)]' : 'text-[var(--ink)]'
                      )}
                      title="Double click to edit"
                    >
                      {task.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(task)}
                      className="opacity-0 group-hover/row:opacity-100 text-[var(--ink-muted)] hover:text-[var(--ink)] p-0.5 transition-opacity cursor-pointer shrink-0"
                      aria-label="Edit title"
                    >
                      <Edit2 size={11} />
                    </button>
                  </div>
                )}
              </div>

              {/* Stage Column Selector */}
              <div className="col-span-3 sm:col-span-2">
                <select
                  value={task.columnId}
                  onChange={(e) => {
                    const newCol = e.target.value as KanbanColumnId;
                    onUpdateTask({
                      ...task,
                      columnId: newCol,
                      completed: newCol === 'completed'
                    });
                  }}
                  className="w-full px-2 py-1 text-[12px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {KANBAN_COLUMNS.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Selector */}
              <div className="col-span-3 sm:col-span-2">
                <select
                  value={task.tag}
                  onChange={(e) => {
                    onUpdateTask({ ...task, tag: e.target.value as any });
                  }}
                  className="w-full px-2 py-1 text-[12px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {ALL_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date & Action */}
              <div className="hidden sm:flex sm:col-span-2 items-center justify-between gap-2">
                <input
                  type="date"
                  value={task.dueDate || ''}
                  onChange={(e) => {
                    onUpdateTask({ ...task, dueDate: e.target.value || undefined });
                  }}
                  className={cn(
                    'px-2 py-0.5 text-[12px] font-mono tabular-nums bg-[var(--ground)] border rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]',
                    isOverdue
                      ? 'border-rose-500/50 text-rose-700 dark:text-rose-300'
                      : 'border-[var(--border)] text-[var(--ink-muted)]'
                  )}
                />

                <Tooltip content="Delete task" delayMs={400}>
                  <button
                    type="button"
                    onClick={() => onDeleteTask(task)}
                    className="p-1 rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:text-[var(--danger)] hover:bg-[var(--ground)] transition-colors cursor-pointer shrink-0"
                    aria-label="Delete task"
                  >
                    <Trash2 size={13} />
                  </button>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
