import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    fullWidth = false,
    className,
    disabled,
    children,
    ...props
  },
  ref
) {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-medium transition-colors select-none cursor-pointer ' +
    'rounded-[var(--radius-control)] border focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--surface)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] hover:bg-[var(--accent-hover)] shadow-xs',
    secondary:
      'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:bg-[var(--ground)] hover:border-[var(--ink-muted)]/40',
    ghost:
      'bg-transparent text-[var(--ink)] border-transparent hover:bg-[var(--surface)] hover:text-[var(--ink)]',
    destructive:
      'bg-[var(--danger)] text-white border-[var(--danger)] hover:opacity-90 shadow-xs'
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-[13px] px-2.5 py-1 gap-1.5 h-8',
    md: 'text-[13px] px-3.5 py-1.5 gap-2 h-9',
    lg: 'text-[14px] px-4 py-2 gap-2.5 h-10'
  };

  const iconSizes: Record<ButtonSize, number> = {
    sm: 14,
    md: 16,
    lg: 18
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-3.5 w-3.5 shrink-0 text-current"
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
        Icon && iconPosition === 'left' && <Icon size={iconSizes[size]} className="shrink-0" />
      )}
      <span className="truncate">{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon size={iconSizes[size]} className="shrink-0" />
      )}
    </button>
  );
});
