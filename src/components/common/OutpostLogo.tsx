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
 * Minimalist Logo Mark and Wordmark for Outpost Living Malawi.
 * Wordmark: Fraunces serif, normal tracking, balanced editorial presence.
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
    sm: 24,
    md: 32,
    lg: 40,
    xl: 56,
    '2xl': 72,
  };

  const titleSizes = {
    xs: 'text-[14px]',
    sm: 'text-[15px]',
    md: 'text-[17px] sm:text-[18px]',
    lg: 'text-[20px] sm:text-[22px]',
    xl: 'text-[26px] sm:text-[28px]',
    '2xl': 'text-[32px] sm:text-[36px]',
  };

  const subtitleSizes = {
    xs: 'text-[11px]',
    sm: 'text-[11px]',
    md: 'text-[12px]',
    lg: 'text-[12px]',
    xl: 'text-[13px]',
    '2xl': 'text-[14px]',
  };

  const isHeader = variant === 'header';

  const titleColor = isHeader
    ? 'text-white'
    : 'text-[var(--ink)]';

  const subtitleColor = isHeader
    ? 'text-stone-300'
    : 'text-[var(--ink-muted)]';

  const px = iconPixelSizes[size];

  return (
    <div
      className={cn(
        'group select-none inline-flex items-center transition-transform duration-150',
        layout === 'vertical' ? 'flex-col text-center gap-2' : 'flex-row gap-2.5',
        className
      )}
    >
      {/* Native desktop squircle emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-all duration-150 group-hover:scale-105"
        style={{ width: px, height: px }}
      >
        <svg
          viewBox="0 0 32 32"
          width={px}
          height={px}
          className="w-full h-full overflow-visible drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* App Squircle Tile */}
          <rect
            x="1.5"
            y="1.5"
            width="29"
            height="29"
            rx="7"
            className="fill-stone-900/90 dark:fill-[#16161A] stroke-white/15 dark:stroke-white/15"
            strokeWidth="1"
          />

          {/* Golden Dawn Aura Glow */}
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
            className="group-hover:fill-amber-300 transition-colors duration-150"
          />

          {/* Symmetrical Geometric Sanctuary Peak */}
          <path
            d="M16 8L7.5 22.5H13L16 17.5L19 22.5H24.5L16 8Z"
            fill="url(#logo-peak-gradient)"
            className="transition-all duration-150"
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

          <defs>
            <linearGradient id="logo-peak-gradient" x1="16" y1="8" x2="16" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.6" stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* New Fraunces Wordmark with Normal Tracking */}
      {!iconOnly && (
        <div className={cn('flex flex-col leading-tight', layout === 'vertical' ? 'items-center' : 'items-start')}>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'font-serif font-semibold tracking-normal transition-colors',
                titleSizes[size],
                titleColor
              )}
            >
              Outpost Living
            </span>
          </div>

          {showSubtitle && (
            <span
              className={cn(
                'font-sans font-normal tracking-normal transition-colors',
                subtitleSizes[size],
                subtitleColor
              )}
            >
              Southern Africa Sanctuary
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default OutpostLogo;
