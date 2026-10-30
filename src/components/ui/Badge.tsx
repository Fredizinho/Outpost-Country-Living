import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeStatus = 'Draft' | 'Reviewed' | 'Verified' | 'Estimate' | 'Illustrative';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  variant?: 'default' | 'accent' | 'muted' | 'success' | 'warning';
  children?: React.ReactNode;
}

const statusStyles: Record<BadgeStatus, { text: string; className: string }> = {
  Draft: {
    text: 'Draft',
    className: 'bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--border)]'
  },
  Reviewed: {
    text: 'Reviewed',
    className: 'bg-[var(--surface-muted)] text-[var(--ink)] border-[var(--border)]'
  },
  Verified: {
    text: 'Verified',
    className: 'bg-emerald-950/15 text-emerald-700 dark:text-emerald-300 border-emerald-600/30'
  },
  Estimate: {
    text: 'Estimate',
    className: 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-600/30 font-mono'
  },
  Illustrative: {
    text: 'Illustrative',
    className: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30'
  }
};

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--ground)] text-[var(--ink)] border-[var(--border)]',
  accent: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30',
  muted: 'bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--border)]',
  success: 'bg-emerald-950/15 text-emerald-700 dark:text-emerald-300 border-emerald-600/30',
  warning: 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-600/30 font-mono'
};

export function Badge({ status, variant, className, children, ...props }: BadgeProps) {
  const isPredefinedStatus = status && statusStyles[status];
  const styleClass = isPredefinedStatus
    ? statusStyles[status].className
    : variant
    ? variantStyles[variant] || variantStyles.default
    : variantStyles.default;

  const content = children || (status ? statusStyles[status]?.text : null);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[12px] font-sans font-medium select-none ' +
          'rounded-[var(--radius-control)] border border-solid',
        styleClass,
        className
      )}
      {...props}
    >
      {content}
    </span>
  );
}
