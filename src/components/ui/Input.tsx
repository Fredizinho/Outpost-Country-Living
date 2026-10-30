import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isMonospace?: boolean;
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    icon: Icon,
    iconPosition = 'left',
    isMonospace = false,
    hasError = false,
    className,
    disabled,
    type,
    ...props
  },
  ref
) {
  const isNumeric = type === 'number' || isMonospace;

  return (
    <div className="relative flex items-center w-full">
      {Icon && iconPosition === 'left' && (
        <span className="absolute left-3 text-[var(--ink-muted)] pointer-events-none">
          <Icon size={15} />
        </span>
      )}
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'w-full h-9 px-3 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 ' +
            'rounded-[var(--radius-control)] border transition-colors ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ' +
            'disabled:opacity-50 disabled:cursor-not-allowed',
          hasError
            ? 'border-[var(--danger)] focus-visible:ring-[var(--danger)]'
            : 'border-[var(--border)] hover:border-[var(--ink-muted)]/50',
          Icon && iconPosition === 'left' && 'pl-9',
          Icon && iconPosition === 'right' && 'pr-9',
          isNumeric && 'font-mono tabular-nums',
          className
        )}
        {...props}
      />
      {Icon && iconPosition === 'right' && (
        <span className="absolute right-3 text-[var(--ink-muted)] pointer-events-none">
          <Icon size={15} />
        </span>
      )}
    </div>
  );
});
