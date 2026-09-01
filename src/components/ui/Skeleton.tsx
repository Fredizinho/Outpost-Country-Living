import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'emerald' | 'amber';
}

export function Skeleton({ className, variant = 'light', ...props }: SkeletonProps) {
  const variantClasses = {
    light: 'bg-[#E6DFD1]/60',
    dark: 'bg-emerald-900/50',
    emerald: 'bg-emerald-800/40',
    amber: 'bg-amber-500/20',
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-xl',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  variant = 'light',
  className,
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
          variant={variant}
          className={cn(
            'h-3.5 rounded-md',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark' | 'emerald' | 'amber';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'p-6 rounded-[2.5rem] border flex flex-col gap-4',
        variant === 'dark' || variant === 'emerald'
          ? 'bg-emerald-950/80 border-emerald-800'
          : 'bg-[#FDFBF7] border-[#E6DFD1]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton variant={variant} className="h-5 w-1/3" />
        <Skeleton variant={variant} className="h-6 w-16 rounded-full" />
      </div>
      <SkeletonText lines={2} variant={variant} />
      <div className="flex items-center justify-between pt-3 border-t border-emerald-800/20 border-[#E6DFD1]/50">
        <Skeleton variant={variant} className="h-4 w-1/4" />
        <Skeleton variant={variant} className="h-8 w-24 rounded-2xl" />
      </div>
    </div>
  );
}
