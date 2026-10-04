import React from 'react';
import { cn } from '@/lib/utils';

export interface OutpostLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  variant?: 'auto' | 'header' | 'light' | 'dark';
  iconOnly?: boolean;
}

/**
 * OutpostLogo.tsx
 * =============================================================================
 * Redesigned Minimalist Logo Mark for Outpost Living Malawi.
 *
 * Design Concept:
 * - Simple, iconic, memorable desktop-grade emblem.
 * - Geometric architectural sanctuary gable & Mount Mulanje peak silhouette.
 * - Rising Golden Dawn Sun / Morning Star radiating in the apex.
 * - Sits on a native desktop-app squircle tile with subtle ambient lighting.
 * =============================================================================
 */
export function OutpostLogo({
  size = 'md',
  showSubtitle = true,
  className,
  layout = 'horizontal',
  variant = 'header',
  iconOnly = false,
}: OutpostLogoProps) {
  const iconPixelSizes = {
    xs: 20,
    sm: 26,
    md: 34,
    lg: 44,
    xl: 60,
    '2xl': 80,
  };

  const titleSizes = {
    xs: 'text-[11px] tracking-[0.18em]',
    sm: 'text-xs tracking-[0.18em]',
    md: 'text-sm sm:text-base tracking-[0.20em]',
    lg: 'text-lg sm:text-xl tracking-[0.22em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.24em]',
    '2xl': 'text-3xl sm:text-4xl tracking-[0.26em]',
  };

  const subtitleSizes = {
    xs: 'text-[7px] tracking-[0.22em]',
    sm: 'text-[8px] tracking-[0.22em]',
    md: 'text-[9px] tracking-[0.24em]',
    lg: 'text-[10px] tracking-[0.26em]',
    xl: 'text-xs tracking-[0.28em]',
    '2xl': 'text-sm tracking-[0.3em]',
  };

  const isHeader = variant === 'header';
  const isDarkCanvas = variant === 'light';

  const titleColor = isHeader
    ? 'text-white'
    : isDarkCanvas
    ? 'text-stone-50'
    : 'text-stone-950 dark:text-white';

  const subtitleColor = isHeader
    ? 'text-stone-300'
    : 'text-stone-500 dark:text-stone-400';

  const px = iconPixelSizes[size];

  return (
    <div
      className={cn(
        'group select-none inline-flex items-center transition-transform duration-200',
        layout === 'vertical' ? 'flex-col text-center gap-2' : 'flex-row gap-2.5',
        className
      )}
    >
      {/* 
        DESKTOP APP EMBLEM SQUIRCLE:
        - Sleek bevel tile with subtle matte depth
        - Crisp geometric sanctuary peak with dawn star
      */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-all duration-200 group-hover:scale-105"
        style={{ width: px, height: px }}
      >
        <svg
          viewBox="0 0 32 32"
          width={px}
          height={px}
          className="w-full h-full overflow-visible drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* App Squircle Tile */}
          <rect
            x="1.5"
            y="1.5"
            width="29"
            height="29"
            rx="7.5"
            className="fill-stone-900/90 dark:fill-[#16161A] stroke-white/15 dark:stroke-white/15"
            strokeWidth="1"
          />

          {/* Golden Dawn Aura Glow in squircle */}
          <circle
            cx="16"
            cy="11"
            r="6"
            className="fill-amber-500/25"
          />

          {/* Morning Star / Dawn Sun */}
          <circle
            cx="16"
            cy="11"
            r="2.8"
            fill="#F59E0B"
            className="group-hover:fill-amber-300 transition-colors"
          />

          {/* Symmetrical Geometric Sanctuary Peak (Mount Mulanje & Refuge Roofline) */}
          <path
            d="M16 8L7.5 22.5H13L16 17.5L19 22.5H24.5L16 8Z"
            fill="url(#logo-peak-gradient)"
            className="transition-all"
          />

          {/* Inner Negative Space Gateway Arch */}
          <path
            d="M16 18.5L13.5 22.5H18.5L16 18.5Z"
            className="fill-stone-900 dark:fill-[#16161A]"
          />

          {/* Monoline Ground Foundation */}
          <rect
            x="8"
            y="24.5"
            width="16"
            height="1.5"
            rx="0.75"
            fill="#F59E0B"
          />

          {/* Definition for smooth metallic / jewel gradient */}
          <defs>
            <linearGradient id="logo-peak-gradient" x1="16" y1="8" x2="16" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.6" stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typographic Identity */}
      {!iconOnly && (
        <div className={cn('flex flex-col leading-none', layout === 'vertical' ? 'items-center' : 'items-start')}>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'font-display font-black transition-colors uppercase',
                titleSizes[size],
                titleColor
              )}
            >
              OUTPOST
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-widest hidden sm:inline">
              MALAWI
            </span>
          </div>

          {showSubtitle && (
            <span
              className={cn(
                'font-mono font-medium uppercase transition-colors mt-1',
                subtitleSizes[size],
                subtitleColor
              )}
            >
              Country Sanctuary
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default OutpostLogo;
