import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Calendar, Tag, Layers } from 'lucide-react';
import { TrackerTask, KanbanColumnId, KANBAN_COLUMNS, ALL_TAGS, inferDueDateFromOffset } from './types';
import { Dialog, Button } from '@/components/ui';

export interface QuickAddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultColumnId?: KanbanColumnId;
  onAddTask: (newTask: Omit<TrackerTask, 'id'>) => void;
}

export function QuickAddTaskModal({
  isOpen,
  onClose,
  defaultColumnId = 'todo',
  onAddTask
}: QuickAddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [columnId, setColumnId] = useState<KanbanColumnId>(defaultColumnId);
  const [tag, setTag] = useState<any>('Water');
  const [dueDate, setDueDate] = useState<string>(() => inferDueDateFromOffset(7));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setColumnId(defaultColumnId);
      setTitle('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, defaultColumnId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      columnId,
      completed: columnId === 'completed',
      tag,
      dueDate: dueDate || undefined,
      stepId: columnId === 'scouting' ? 'scout' : columnId === 'inprogress' ? 'exodus' : 'prepare',
      stepTitle: KANBAN_COLUMNS.find((c) => c.id === columnId)?.label || 'General Tasks',
      priority: 'medium',
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xl p-6 flex flex-col gap-5 text-[var(--ink)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="font-serif text-[18px] font-bold text-[var(--ink)] leading-snug">
                Quick add task
              </h3>
              <p className="text-[12px] text-[var(--ink-muted)]">
                Press <kbd className="px-1 py-0.5 rounded bg-[var(--ground)] border border-[var(--border)] font-mono text-[11px]">N</kbd> anytime to open
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">
              Task description *
            </label>
            <input
              ref={inputRef}
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Test aquifer depth with NWRA hand drill or dig 3x3ft pit..."
              className="px-3 py-2 text-[13px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Stage Column */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-sans font-medium text-[var(--ink-muted)] flex items-center gap-1">
                <Layers size={13} />
                <span>Stage</span>
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value as KanbanColumnId)}
                className="px-2.5 py-1.5 text-[12px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {KANBAN_COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-sans font-medium text-[var(--ink-muted)] flex items-center gap-1">
                <Tag size={13} />
                <span>Tag</span>
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as any)}
                className="px-2.5 py-1.5 text-[12px] font-sans bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              >
                {ALL_TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Due date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-sans font-medium text-[var(--ink-muted)] flex items-center gap-1">
                <Calendar size={13} />
                <span>Due date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-2.5 py-1.5 text-[12px] font-mono tabular-nums bg-[var(--ground)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--border)] mt-2">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Add task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
