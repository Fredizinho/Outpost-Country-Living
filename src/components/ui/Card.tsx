import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised';
}

export function Card({ elevation = 'flat', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)]',
        elevation === 'flat' && 'shadow-[var(--shadow-flat)]',
        elevation === 'raised' && 'shadow-[var(--shadow-raised)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-5 pb-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-serif text-[18px] sm:text-[20px] font-semibold text-[var(--ink)] leading-snug tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-[13px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5 pt-2 text-[16px] text-[var(--ink)] leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 p-5 pt-3 border-t border-[var(--border)] text-[13px] text-[var(--ink-muted)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
