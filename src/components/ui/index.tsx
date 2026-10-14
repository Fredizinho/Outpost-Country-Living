import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, AlertTriangle } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. SANCTUARY CARD PRIMITIVES                                               */
/* -------------------------------------------------------------------------- */

export interface SanctuaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'glass' | 'sand' | 'amber' | 'instrument' | 'featured';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  ambientGlow?: boolean | 'amber' | 'emerald' | 'dual';
  children: React.ReactNode;
}

export function SanctuaryCard({
  variant = 'light',
  hoverEffect = false,
  padding = 'md',
  ambientGlow = false,
  className,
  children,
  ...props
}: SanctuaryCardProps) {
  const variantClasses = {
    light: 'bg-slate-950/40 backdrop-blur-xl border border-white/[0.08] text-slate-100 shadow-2xl shadow-black/40 relative overflow-hidden',
    dark: 'bg-[#071A10]/90 backdrop-blur-2xl border border-amber-500/20 text-white shadow-2xl relative overflow-hidden',
    instrument: 'bg-slate-950/40 backdrop-blur-xl border border-amber-500/20 text-slate-100 shadow-2xl shadow-black/40 relative overflow-hidden',
    glass: 'bg-slate-950/40 backdrop-blur-xl border border-white/[0.08] text-slate-100 shadow-2xl shadow-black/40 relative overflow-hidden',
    sand: 'bg-slate-950/30 backdrop-blur-md border border-white/[0.06] text-slate-100 shadow-lg relative overflow-hidden',
    amber: 'bg-gradient-to-b from-amber-500/[0.08] to-slate-950/60 backdrop-blur-2xl border border-amber-500/30 text-slate-100 shadow-xl shadow-amber-900/10 relative overflow-hidden',
    featured: 'bg-gradient-to-b from-amber-500/[0.08] to-slate-950/60 backdrop-blur-2xl border border-amber-500/30 text-slate-100 shadow-xl shadow-amber-900/10 relative overflow-hidden'
  };

  const glowClasses = {
    true: 'before:absolute before:-top-12 before:-left-12 before:w-64 before:h-64 before:bg-amber-500/10 before:rounded-full before:blur-3xl before:pointer-events-none',
    amber: 'before:absolute before:-top-12 before:-left-12 before:w-64 before:h-64 before:bg-amber-500/10 before:rounded-full before:blur-3xl before:pointer-events-none',
    emerald: 'before:absolute before:-bottom-12 before:-right-12 before:w-64 before:h-64 before:bg-emerald-500/10 before:rounded-full before:blur-3xl before:pointer-events-none',
    dual: 'before:absolute before:-top-16 before:-left-16 before:w-72 before:h-72 before:bg-amber-500/10 before:rounded-full before:blur-3xl before:pointer-events-none after:absolute after:-bottom-16 after:-right-16 after:w-72 after:h-72 after:bg-emerald-500/10 after:rounded-full after:blur-3xl after:pointer-events-none'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6 md:p-7',
    lg: 'p-7 sm:p-8 md:p-10'
  };

  return (
    <div
      className={cn(
        'rounded-[2rem] transition-all duration-300 ease-out',
        variantClasses[variant],
        paddingClasses[padding],
        ambientGlow && glowClasses[ambientGlow === true ? 'amber' : ambientGlow],
        hoverEffect && 'hover:border-amber-500/40 hover:bg-slate-950/60 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SanctuaryCardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1 mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function SanctuaryCardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex-1 text-xs leading-relaxed font-medium text-slate-200', className)} {...props}>
      {children}
    </div>
  );
}

export function SanctuaryCardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-slate-300', className)} {...props}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. SANCTUARY BUTTON PRIMITIVES                                             */
/* -------------------------------------------------------------------------- */

export interface SanctuaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'amber' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function SanctuaryButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: SanctuaryButtonProps) {
  const variantClasses = {
    primary: 'bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold border border-amber-400/40 shadow-md focus-visible:ring-amber-400',
    secondary: 'backdrop-blur-md bg-white/10 hover:bg-white/15 text-slate-100 border border-white/15 shadow-sm focus-visible:ring-amber-400',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black border border-amber-300 shadow-md focus-visible:ring-amber-300',
    outline: 'backdrop-blur-md bg-transparent hover:bg-white/5 text-amber-200 border border-amber-500/30 focus-visible:ring-amber-400',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-200 focus-visible:ring-amber-400',
    danger: 'bg-rose-950 hover:bg-rose-900 text-rose-100 border border-rose-800 shadow-xs focus-visible:ring-rose-500'
  };

  const sizeClasses = {
    sm: 'text-caption font-mono font-black uppercase tracking-wider px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-xs font-mono font-black uppercase tracking-wider px-4 py-2.5 rounded-2xl gap-2',
    lg: 'text-xs font-mono font-black uppercase tracking-wider px-6 py-3.5 rounded-2xl gap-2.5'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-extrabold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={iconSizes[size]} className="shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={iconSizes[size]} className="shrink-0" />}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. SANCTUARY BADGE PRIMITIVE                                               */
/* -------------------------------------------------------------------------- */

export interface SanctuaryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'amber' | 'dark' | 'sand' | 'danger' | 'demo';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function SanctuaryBadge({
  variant = 'emerald',
  size = 'sm',
  className,
  children,
  ...props
}: SanctuaryBadgeProps) {
  const variantClasses = {
    emerald: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    dark: 'bg-black/50 text-amber-300 border border-white/10',
    sand: 'bg-white/10 text-slate-200 border border-white/15',
    danger: 'bg-rose-950/80 text-rose-300 border border-rose-500/40',
    demo: 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono'
  };

  const sizeClasses = {
    sm: 'text-caption font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md',
    md: 'text-caption font-mono font-black uppercase tracking-wider px-3 py-1 rounded-lg'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 shrink-0',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. SANCTUARY SECTION HEADER PRIMITIVE                                      */
/* -------------------------------------------------------------------------- */

export interface SanctuarySectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SanctuarySectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
  className
}: SanctuarySectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4 mb-6',
        align === 'center' && 'text-center sm:text-center sm:flex-col',
        align === 'right' && 'text-right sm:text-right',
        className
      )}
    >
      <div>
        {eyebrow && (
          <span className="text-amber-400/90 font-mono font-black uppercase text-caption tracking-widest block mb-1">
            {eyebrow}
          </span>
        )}
        <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-emerald-100/80 font-medium mt-1 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SANCTUARY BANNER & DISCLAIMER CALLOUT                                   */
/* -------------------------------------------------------------------------- */

export interface SanctuaryBannerProps {
  title?: string;
  badgeText?: string;
  variant?: 'demo' | 'warning' | 'info' | 'dark';
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SanctuaryBanner({
  title = 'DEMO MODE — Illustrative Example Data Only',
  badgeText = 'NOT A REAL LISTING',
  variant = 'demo',
  children,
  action,
  className
}: SanctuaryBannerProps) {
  const variantClasses = {
    demo: 'backdrop-blur-xl bg-amber-950/80 text-amber-200 border border-amber-500/50 shadow-lg',
    warning: 'backdrop-blur-xl bg-amber-950/70 text-amber-200 border border-amber-500/40 shadow-xs',
    info: 'backdrop-blur-xl bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 shadow-2xs',
    dark: 'backdrop-blur-xl bg-[#071A10]/95 text-white border border-amber-500/40 shadow-xl'
  };

  return (
    <div
      className={cn(
        'px-5 py-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle size={22} className="text-amber-400 shrink-0" />
        <div>
          {title && (
            <span className="font-mono font-black uppercase tracking-widest text-amber-300 text-caption block">
              {title}
            </span>
          )}
          <div className="text-xs font-medium leading-snug text-slate-200">{children}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badgeText && (
          <span className="bg-amber-500 text-slate-950 text-caption font-mono font-black uppercase px-3 py-1.5 rounded-xl tracking-wider shadow-xs">
            {badgeText}
          </span>
        )}
        {action}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. SANCTUARY STAT BOX PRIMITIVE                                            */
/* -------------------------------------------------------------------------- */

export interface SanctuaryStatBoxProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  variant?: 'sand' | 'light' | 'emerald' | 'amber' | 'instrument';
  className?: string;
}

export function SanctuaryStatBox({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'sand',
  className
}: SanctuaryStatBoxProps) {
  const variantClasses = {
    sand: 'bg-slate-950/40 backdrop-blur-xl border border-white/[0.08] text-slate-100 shadow-lg',
    light: 'bg-slate-950/40 backdrop-blur-xl border border-white/[0.08] text-slate-100 shadow-lg',
    emerald: 'bg-slate-950/50 backdrop-blur-xl bg-emerald-950/40 text-white border border-emerald-500/30 shadow-lg',
    amber: 'bg-gradient-to-b from-amber-500/[0.08] to-slate-950/60 backdrop-blur-xl border border-amber-500/30 text-amber-100 shadow-lg',
    instrument: 'bg-slate-950/40 backdrop-blur-xl border border-amber-500/20 text-slate-100 shadow-lg'
  };

  return (
    <div
      className={cn(
        'p-3.5 rounded-2xl flex flex-col justify-between gap-1.5 transition-all duration-200',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center justify-between text-caption font-mono font-extrabold uppercase tracking-wider text-emerald-300/80">
        <span>{label}</span>
        {Icon && <Icon size={14} className="text-amber-400" />}
      </div>
      <div className="font-mono font-black text-2xl tracking-tight text-amber-300">
        {value}
      </div>
      {subtext && (
        <span className="text-caption font-mono font-bold text-emerald-400/80">
          {subtext}
        </span>
      )}
    </div>
  );
}

export * from './Skeleton';

