import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'secondary';
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'primary',
  secondaryAction,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
        <Icon size={24} />
      </div>

      <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[var(--ink)] mb-2 tracking-tight">
        {title}
      </h3>

      <p className="text-[13px] text-[var(--ink-muted)] max-w-[50ch] leading-relaxed mb-6">
        {description}
      </p>

      {(actionLabel || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <Button variant={actionVariant} onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
