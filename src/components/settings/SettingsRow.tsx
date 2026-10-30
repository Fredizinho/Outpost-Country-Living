import React from 'react';
import { cn } from '@/lib/utils';

export interface SettingsRowProps {
  label: string;
  description?: string;
  control: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function SettingsRow({
  label,
  description,
  control,
  badge,
  className
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-[var(--border)] last:border-b-0',
        className
      )}
    >
      <div className="flex flex-col gap-1 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-sans font-medium text-[var(--ink)]">
            {label}
          </span>
          {badge}
        </div>
        {description && (
          <p className="text-[13px] font-sans text-[var(--ink-muted)] max-w-[54ch] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center">{control}</div>
    </div>
  );
}
