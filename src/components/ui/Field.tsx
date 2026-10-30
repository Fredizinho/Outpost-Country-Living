import React from 'react';
import { cn } from '@/lib/utils';

export interface FieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  helperText,
  errorMessage,
  required = false,
  children,
  className
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-sans font-medium text-[var(--ink)] flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[var(--danger)] ml-0.5">*</span>}
          </span>
        </label>
      )}

      {children}

      {errorMessage ? (
        <p className="text-[12px] font-sans text-[var(--danger)] leading-tight">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-[12px] font-sans text-[var(--ink-muted)] leading-tight">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
