import React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className
}: ToggleProps) {
  return (
    <label
      className={cn(
        'inline-flex items-start gap-3 select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
          checked
            ? 'bg-[var(--accent)] border-[var(--accent)]'
            : 'bg-[var(--ground)] border-[var(--border)]'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-[var(--surface)] shadow-xs transition-transform',
            checked ? 'translate-x-4.5' : 'translate-x-0.5'
          )}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-[13px] font-sans font-medium text-[var(--ink)] leading-snug">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[12px] font-sans text-[var(--ink-muted)] max-w-[50ch] leading-relaxed">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
