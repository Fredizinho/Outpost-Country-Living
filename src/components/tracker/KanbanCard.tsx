import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Trash2,
  Edit2,
  Check,
  X,
  GripVertical,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Copy
} from 'lucide-react';
import { TrackerTask, KanbanColumnId, formatDueDate, isDateOverdue, isDateThisWeek, ALL_TAGS } from './types';
import { Badge, IconButton, Tooltip, useContextMenu, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface KanbanCardProps {
  task: TrackerTask;
  isSelected?: boolean;
  onSelect?: () => void;
  onToggleComplete: (task: TrackerTask) => void;
  onUpdateTask: (updated: TrackerTask) => void;
  onDeleteTask: (task: TrackerTask) => void;
  onMoveStage: (task: TrackerTask, direction: 'prev' | 'next') => void;
  onDragStart?: (e: React.DragEvent, task: TrackerTask) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const TAG_COLOR_MAP: Record<string, string> = {
  Water: 'bg-sky-500/15 text-sky-800 dark:text-sky-200 border-sky-500/30',
  Solar: 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/30',
  Soil: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30',
  Land: 'bg-teal-500/15 text-teal-800 dark:text-teal-200 border-teal-500/30',
  Finance: 'bg-stone-500/15 text-stone-800 dark:text-stone-200 border-stone-500/30',
  Food: 'bg-orange-500/15 text-orange-800 dark:text-orange-200 border-orange-500/30',
  Shelter: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-200 border-indigo-500/30',
  Sanctuary: 'bg-purple-500/15 text-purple-800 dark:text-purple-200 border-purple-500/30',
  General: 'bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--border)]'
};

export function KanbanCard({
  task,
  isSelected = false,
  onSelect,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onMoveStage,
  onDragStart,
  onDragEnd
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editTag, setEditTag] = useState(task.tag);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      setIsEditing(false);
      setEditTitle(task.title);
      return;
    }
    onUpdateTask({
      ...task,
      title: editTitle.trim(),
      tag: editTag,
      dueDate: editDueDate || undefined
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditTag(task.tag);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveEdit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancelEdit();
      }
      return;
    }

    // Keyboard stage moves: Alt + ArrowRight / Alt + ArrowLeft
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      onMoveStage(task, 'next');
    } else if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      onMoveStage(task, 'prev');
    } else if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      setIsEditing(true);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      // If card has focus and backspace is hit
      if (document.activeElement === cardRef.current) {
        e.preventDefault();
        onDeleteTask(task);
      }
    }
  };

  const { openContextMenu } = useContextMenu();
  const { toast } = useToast();

  const handleContextMenu = (e: React.MouseEvent) => {
    openContextMenu(e, [
      {
        label: task.completed ? 'Mark incomplete' : 'Mark complete',
        icon: task.completed ? Circle : CheckCircle2,
        shortcut: 'Space',
        onClick: () => onToggleComplete(task)
      },
      {
        label: 'Inline edit task',
        icon: Edit2,
        shortcut: 'E',
        onClick: () => setIsEditing(true)
      },
      {
        label: 'Move to next column',
        icon: ArrowRight,
        shortcut: 'Alt+→',
        onClick: () => onMoveStage(task, 'next')
      },
      {
        label: 'Move to previous column',
        icon: ArrowLeft,
        shortcut: 'Alt+←',
        onClick: () => onMoveStage(task, 'prev')
      },
      {
        label: 'Copy task title',
        icon: Copy,
        onClick: async () => {
          try {
            await navigator.clipboard.writeText(task.title);
            toast({ message: 'Task title copied', variant: 'success' });
          } catch {}
        }
      },
      {
        separator: true,
        label: '',
        onClick: () => {}
      },
      {
        label: 'Delete task',
        icon: Trash2,
        destructive: true,
        onClick: () => onDeleteTask(task)
      }
    ]);
  };

  const isOverdue = !task.completed && isDateOverdue(task.dueDate);
  const isThisWeek = isDateThisWeek(task.dueDate);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="article"
      aria-label={`${task.title}, stage: ${task.columnId}, tag: ${task.tag}`}
      draggable={!isEditing}
      onDragStart={(e) => onDragStart?.(e, task)}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
      className={cn(
        'group relative p-3 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] transition-all duration-150',
        'hover:border-[var(--accent)]/60 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-grab active:cursor-grabbing',
        task.completed && 'opacity-80 bg-[var(--ground)]',
        isSelected && 'ring-2 ring-[var(--accent)] border-[var(--accent)]'
      )}
    >
      {/* Edit Mode */}
      {isEditing ? (
        <div className="flex flex-col gap-2.5" onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-2.5 py-1.5 text-[13px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="Task description..."
          />
          <div className="flex items-center gap-2">
            <select
              value={editTag}
              onChange={(e) => setEditTag(e.target.value as any)}
              className="px-2 py-1 text-[12px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              {ALL_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-2 py-1 text-[12px] font-mono tabular-nums bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
          <div className="flex items-center justify-end gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-2 py-1 text-[11px] font-sans rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:bg-[var(--ground)] transition-colors cursor-pointer"
            >
              Cancel (Esc)
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-2.5 py-1 text-[11px] font-sans font-semibold rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
            >
              Save (Enter)
            </button>
          </div>
        </div>
      ) : (
        /* Normal Card View */
        <div className="flex flex-col gap-2">
          {/* Header Row: Checkbox, Title & Action Buttons */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 min-w-0 flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete(task);
                }}
                className="mt-0.5 text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-xs"
                title={task.completed ? 'Mark incomplete' : 'Mark completed'}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark completed'}
              >
                {task.completed ? (
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Circle size={16} className="hover:text-[var(--accent)]" />
                )}
              </button>

              <span
                onDoubleClick={() => setIsEditing(true)}
                className={cn(
                  'text-[13px] font-sans font-medium leading-snug break-words select-text',
                  task.completed ? 'line-through text-[var(--ink-muted)]' : 'text-[var(--ink)]'
                )}
                title="Double click to edit"
              >
                {task.title}
              </span>
            </div>

            {/* Quick Action Buttons (shown on hover or focus) */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0">
              <Tooltip content="Edit task" shortcut="E" delayMs={400}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="p-1 rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)] transition-colors cursor-pointer"
                  aria-label="Edit task"
                >
                  <Edit2 size={12} />
                </button>
              </Tooltip>
              <Tooltip content="Delete task" delayMs={400}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task);
                  }}
                  className="p-1 rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:text-[var(--danger)] hover:bg-[var(--ground)] transition-colors cursor-pointer"
                  aria-label="Delete task"
                >
                  <Trash2 size={12} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Footer Metadata Row: Tag, Due Date, Keyboard Move Hint */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)] text-[12px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Tag Badge */}
              <span
                className={cn(
                  'px-2 py-0.5 text-[11px] font-sans font-medium rounded-[var(--radius-control)] border',
                  TAG_COLOR_MAP[task.tag] || TAG_COLOR_MAP.General
                )}
              >
                {task.tag}
              </span>

              {/* Due Date Indicator */}
              {task.dueDate && (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-mono tabular-nums rounded-[var(--radius-control)]',
                    isOverdue
                      ? 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border border-rose-500/30'
                      : isThisWeek
                      ? 'text-amber-800 dark:text-amber-300 bg-amber-500/15 border border-amber-500/30'
                      : 'text-[var(--ink-muted)] bg-[var(--ground)] border border-[var(--border)]'
                  )}
                  title={isOverdue ? 'Overdue' : isThisWeek ? 'Due this week' : `Due: ${task.dueDate}`}
                >
                  <Calendar size={11} className={isOverdue ? 'text-rose-600' : ''} />
                  <span>{formatDueDate(task.dueDate)}</span>
                </span>
              )}
            </div>

            {/* Quick Column Advance Controls */}
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {task.columnId !== 'todo' && (
                <Tooltip content="Move left" shortcut="Alt+←" delayMs={500}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveStage(task, 'prev');
                    }}
                    className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                    aria-label="Move to previous stage"
                  >
                    <ArrowLeft size={11} />
                  </button>
                </Tooltip>
              )}
              {task.columnId !== 'completed' && (
                <Tooltip content="Move right" shortcut="Alt+→" delayMs={500}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveStage(task, 'next');
                    }}
                    className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    aria-label="Move to next stage"
                  >
                    <ArrowRight size={11} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
