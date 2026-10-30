import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string; // Accessible aria-label
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon: Icon,
    label,
    variant = 'secondary',
    size = 'md',
    isLoading = false,
    className,
    disabled,
    ...props
  },
  ref
) {
  const baseClasses =
    'inline-flex items-center justify-center transition-colors cursor-pointer select-none ' +
    'rounded-[var(--radius-control)] border focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--surface)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantClasses: Record<IconButtonVariant, string> = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-xs',
    secondary:
      'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:bg-[var(--ground)] hover:border-[var(--ink-muted)]/40',
    ghost:
      'bg-transparent text-[var(--ink)] border-transparent hover:bg-[var(--ground)] hover:text-[var(--ink)]',
    destructive:
      'bg-[var(--danger)] text-white border-[var(--danger)] hover:opacity-90 shadow-xs'
  };

  const sizeClasses: Record<IconButtonSize, string> = {
    sm: 'w-8 h-8 p-1',
    md: 'w-9 h-9 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes: Record<IconButtonSize, number> = {
    sm: 15,
    md: 17,
    lg: 19
  };

  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      disabled={disabled || isLoading}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-3.5 w-3.5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <Icon size={iconSizes[size]} className="shrink-0" />
      )}
    </button>
  );
});
