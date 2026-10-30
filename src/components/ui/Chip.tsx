import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Chip({
  label,
  selected = false,
  onSelect,
  onDismiss,
  icon,
  disabled = false,
  className,
  ...props
}: ChipProps) {
  const isClickable = !!onSelect && !disabled;

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onSelect : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-sans font-medium select-none ' +
          'rounded-[var(--radius-control)] border transition-colors ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        selected
          ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
          : 'bg-[var(--ground)] text-[var(--ink)] border-[var(--border)] hover:border-[var(--ink-muted)]/50',
        isClickable && 'cursor-pointer',
        disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {onDismiss && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          disabled={disabled}
          className={cn(
            'p-0.5 rounded-xs transition-colors cursor-pointer',
            selected
              ? 'hover:bg-white/20 text-white'
              : 'hover:bg-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
          )}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
