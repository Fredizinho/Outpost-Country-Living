import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, hasError = false, className, children, disabled, ...props },
  ref
) {
  return (
    <div className="relative flex items-center w-full">
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full h-9 pl-3 pr-8 text-[13px] font-sans appearance-none bg-[var(--surface)] text-[var(--ink)] ' +
            'rounded-[var(--radius-control)] border transition-colors cursor-pointer ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ' +
            'disabled:opacity-50 disabled:cursor-not-allowed',
          hasError
            ? 'border-[var(--danger)] focus-visible:ring-[var(--danger)]'
            : 'border-[var(--border)] hover:border-[var(--ink-muted)]/50',
          className
        )}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      <span className="absolute right-2.5 pointer-events-none text-[var(--ink-muted)]">
        <ChevronDown size={14} />
      </span>
    </div>
  );
});
