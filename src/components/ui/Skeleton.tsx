import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'emerald' | 'amber';
  radius?: 'control' | 'card' | 'sheet' | 'full';
}

export function Skeleton({
  className,
  variant = 'light',
  radius = 'control',
  ...props
}: SkeletonProps) {
  const radiusClasses = {
    control: 'rounded-[var(--radius-control)]',
    card: 'rounded-[var(--radius-card)]',
    sheet: 'rounded-[var(--radius-sheet)]',
    full: 'rounded-full'
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--ground)] border border-[var(--border)]/60 opacity-80',
        radiusClasses[radius],
        // Subtle shimmer animation without neon glow
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/5 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className
}: {
  lines?: number;
  variant?: 'light' | 'dark' | 'emerald' | 'amber';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2.5 w-full', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-3.5',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  className
}: {
  variant?: 'light' | 'dark' | 'emerald' | 'amber';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'p-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-16" />
      </div>
      <SkeletonText lines={2} />
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
