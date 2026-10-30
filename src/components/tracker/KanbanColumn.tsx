import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, CheckCircle2, Inbox } from 'lucide-react';
import { KanbanColumnSpec, TrackerTask } from './types';
import { KanbanCard } from './KanbanCard';
import { Badge, Tooltip } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface KanbanColumnProps {
  column: KanbanColumnSpec;
  tasks: TrackerTask[];
  isCollapsed?: boolean;
  onToggleCollapse: (columnId: string) => void;
  onQuickAdd: (columnId: string) => void;
  onToggleComplete: (task: TrackerTask) => void;
  onUpdateTask: (task: TrackerTask) => void;
  onDeleteTask: (task: TrackerTask) => void;
  onMoveStage: (task: TrackerTask, direction: 'prev' | 'next') => void;
  onDragStartTask: (e: React.DragEvent, task: TrackerTask) => void;
  onDropTask: (e: React.DragEvent, targetColumnId: string) => void;
}

export function KanbanColumn({
  column,
  tasks,
  isCollapsed = false,
  onToggleCollapse,
  onQuickAdd,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onMoveStage,
  onDragStartTask,
  onDropTask
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set false if leaving this column container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropTask(e, column.id);
  };

  /* Collapsed Column: Sleek vertical strip */
  if (isCollapsed) {
    return (
      <div
        className={cn(
          'w-12 h-full min-h-[500px] py-4 px-1 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col items-center justify-between transition-all duration-200 cursor-pointer hover:border-[var(--accent)]/50',
          isDragOver && 'border-[var(--accent)] bg-[var(--accent)]/5'
        )}
        onClick={() => onToggleCollapse(column.id)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        title={`Expand ${column.label} column`}
      >
        <div className="flex flex-col items-center gap-2">
          <Tooltip content={`Expand ${column.label}`} delayMs={300}>
            <button
              type="button"
              className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              aria-label={`Expand ${column.label} column`}
            >
              <ChevronRight size={14} />
            </button>
          </Tooltip>
          <span className="font-mono text-[11px] tabular-nums font-semibold px-1.5 py-0.5 rounded-[var(--radius-control)] bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)]">
            {tasks.length}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center my-4">
          <span
            className="text-[12px] font-sans font-medium text-[var(--ink)] tracking-wider whitespace-nowrap select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {column.stageNumber} &middot; {column.label}
          </span>
        </div>

        <Tooltip content={`Quick add to ${column.label}`} shortcut="N" delayMs={300}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(column.id);
            }}
            className="p-1.5 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label={`Add task to ${column.label}`}
          >
            <Plus size={14} />
          </button>
        </Tooltip>
      </div>
    );
  }

  /* Expanded Column */
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col gap-3 p-3.5 sm:p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs min-h-[550px] transition-all duration-150',
        isDragOver && 'border-[var(--accent)] bg-[var(--accent)]/[0.03] ring-1 ring-[var(--accent)]'
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[11px] font-bold text-[var(--accent)] shrink-0">
            {column.stageNumber}
          </span>
          <h2 className="font-serif text-[15px] font-bold text-[var(--ink)] truncate">
            {column.label}
          </h2>
          <span className="font-mono text-[12px] tabular-nums font-semibold px-1.5 py-0.2 rounded-[var(--radius-control)] bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] shrink-0">
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Tooltip content={`Add task to ${column.label}`} shortcut="N" delayMs={400}>
            <button
              type="button"
              onClick={() => onQuickAdd(column.id)}
              className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              aria-label={`Add task to ${column.label}`}
            >
              <Plus size={15} />
            </button>
          </Tooltip>

          <Tooltip content="Collapse column" delayMs={400}>
            <button
              type="button"
              onClick={() => onToggleCollapse(column.id)}
              className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--ground)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              aria-label={`Collapse ${column.label} column`}
            >
              <ChevronLeft size={15} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Column Subtitle */}
      <p className="text-[12px] text-[var(--ink-muted)] line-clamp-1 leading-normal">
        {column.description}
      </p>

      {/* Task Cards List */}
      <div className="flex flex-col gap-2.5 flex-1">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-[var(--radius-control)] border border-dashed border-[var(--border)] text-center text-[12px] text-[var(--ink-muted)] gap-2">
            <Inbox size={20} className="text-[var(--ink-muted)]/70 stroke-[1.5]" />
            <span>No tasks in this stage</span>
            <button
              type="button"
              onClick={() => onQuickAdd(column.id)}
              className="text-[12px] font-sans font-medium text-[var(--accent)] hover:underline cursor-pointer"
            >
              + Add a task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onMoveStage={onMoveStage}
              onDragStart={onDragStartTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
