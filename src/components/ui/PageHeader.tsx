import React from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  summary?: string;
  chips?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  eyebrow,
  summary,
  chips,
  actions,
  className
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-[var(--border)] pb-6 mb-8',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          {eyebrow && (
            <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
              {eyebrow}
            </span>
          )}
          <h1 className="font-serif text-[28px] sm:text-[34px] font-semibold text-[var(--ink)] tracking-tight leading-tight">
            {title}
          </h1>
          {summary && (
            <p className="text-[16px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed pt-0.5">
              {summary}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 self-start pt-1">
            {actions}
          </div>
        )}
      </div>

      {chips && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[13px]">
          {chips}
        </div>
      )}
    </header>
  );
}
