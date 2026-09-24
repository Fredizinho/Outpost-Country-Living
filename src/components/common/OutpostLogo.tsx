import React from 'react';
import { cn } from '@/lib/utils';

export interface OutpostLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  variant?: 'auto' | 'header' | 'light' | 'dark';
}

export function OutpostLogo({ 
  size = 'md', 
  showSubtitle = true, 
  className,
  layout = 'horizontal',
  variant = 'header'
}: OutpostLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const titleSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm sm:text-base tracking-wide',
    lg: 'text-lg sm:text-xl tracking-tight',
    xl: 'text-2xl sm:text-3xl tracking-tight',
    '2xl': 'text-3xl sm:text-4xl tracking-tight',
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] sm:text-[9.5px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.25em]',
    xl: 'text-xs tracking-[0.28em]',
    '2xl': 'text-sm tracking-[0.3em]',
  };

  // Color styling based on variant context
  const isHeader = variant === 'header';
  const isDarkCanvas = variant === 'light'; // Light text for dark canvas

  const titleColor = isHeader
    ? 'text-white group-hover:text-amber-200'
    : isDarkCanvas
      ? 'text-stone-50 group-hover:text-amber-300'
      : 'text-stone-900 dark:text-stone-50 group-hover:text-emerald-800 dark:group-hover:text-amber-300';

  const accentColor = isHeader
    ? 'text-amber-300 group-hover:text-amber-200'
    : 'text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300';

  const subtitleColor = isHeader
    ? 'text-emerald-200/90 group-hover:text-white'
    : 'text-stone-600 dark:text-stone-300 group-hover:text-emerald-900 dark:group-hover:text-stone-100';

  return (
    <div className={cn(
      "group select-none flex items-center transition-transform duration-300",
      layout === 'vertical' ? "flex-col text-center gap-3" : "flex-row gap-3",
      className
    )}>
      {/* 
        MEMORABLE FREESTANDING OUTPOST EMBLEM 
        High-Definition Vector Crest: Soaring Peace Dove, Golden Dawn Sun, 
        Living Stream & Highland Ridge.
      */}
      <div className={cn(
        "relative shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 filter drop-shadow-md",
        iconSizes[size]
      )}>
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dawn Sun & Divine Light Gradient */}
            <linearGradient id="opDawnSun" x1="32" y1="12" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Highland Mountains - Rear Peak */}
            <linearGradient id="opMountainBack" x1="32" y1="26" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            {/* Highland Mountains - Front Peak */}
            <linearGradient id="opMountainFront" x1="32" y1="28" x2="32" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022C1A" />
            </linearGradient>

            {/* Stream of Living Waters */}
            <linearGradient id="opLivingStream" x1="32" y1="36" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Olive Sprout / Tree of Life */}
            <linearGradient id="opOliveLeaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            {/* Dove Luminous Body */}
            <linearGradient id="opDoveLight" x1="32" y1="4" x2="32" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            {/* Soft Ambient Halo Glow */}
            <radialGradient id="opHaloGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Emblem Outer Ring Filter */}
            <filter id="opShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 1. Gentle Sun Halo Glow */}
          <circle cx="32" cy="24" r="22" fill="url(#opHaloGlow)" />

          {/* 2. Golden Sunburst Rays radiating outward */}
          <g stroke="#FBBF24" strokeWidth="1.75" strokeLinecap="round" opacity="0.9">
            {/* Vertical top */}
            <line x1="32" y1="5" x2="32" y2="9.5" />
            {/* Diagonals */}
            <line x1="19" y1="10" x2="22.5" y2="13.5" />
            <line x1="45" y1="10" x2="41.5" y2="13.5" />
            {/* Horizontal sides */}
            <line x1="13" y1="23" x2="17.5" y2="23" />
            <line x1="51" y1="23" x2="46.5" y2="23" />
            {/* Lower diagonals */}
            <line x1="16" y1="34" x2="19.5" y2="32" />
            <line x1="48" y1="34" x2="44.5" y2="32" />
          </g>

          {/* 3. Golden Dawn Sun Rising Over the Hills */}
          <circle cx="32" cy="24" r="10.5" fill="url(#opDawnSun)" filter="url(#opShadow)" />

          {/* 4. Background High Ridge (Mulanje / Dedza Mountains) */}
          <path
            d="M12 52L26 27L36 42L46 28L58 52H12Z"
            fill="url(#opMountainBack)"
            opacity="0.96"
          />

          {/* 5. Foreground Foothills & Fertile Valleys */}
          <path
            d="M6 56L22 32L32 45L44 30L58 56H6Z"
            fill="url(#opMountainFront)"
          />

          {/* Mountain Ridge Highlights - Golden Sunlight touching the peaks */}
          <path
            d="M22 32L20 36M44 30L42 35"
            stroke="#FEF08A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 6. Meandering Pure Living Water Stream */}
          <path
            d="M32 45C31 49 27 51 28 55C29 57.5 31 59 34 60"
            stroke="url(#opLivingStream)"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* 7. Soaring Dove of Peace with Spread Wings at the Apex */}
          <g id="dove-crest" transform="translate(0, -1.5)">
            {/* Left Wing */}
            <path
              d="M32 14.5C26.5 9 19 10 15 13.5C18.5 15.5 23 15.5 27 16.5C29.5 17 31.5 17.5 32 18.5Z"
              fill="url(#opDoveLight)"
              stroke="#D97706"
              strokeWidth="0.6"
            />
            {/* Right Wing */}
            <path
              d="M32 14.5C37.5 9 45 10 49 13.5C45.5 15.5 41 15.5 37 16.5C34.5 17 32.5 17.5 32 18.5Z"
              fill="url(#opDoveLight)"
              stroke="#D97706"
              strokeWidth="0.6"
            />
            {/* Dove Head & Body */}
            <path
              d="M32 9.5C30.6 9.5 29.8 10.8 30.3 12.2L31.4 16.2L32 19.5L32.6 16.2L33.7 12.2C34.2 10.8 33.4 9.5 32 9.5Z"
              fill="#FFFFFF"
            />
            {/* Golden Beak */}
            <polygon points="32,8 31.1,9.8 32.9,9.8" fill="#F59E0B" />
          </g>

          {/* 8. Sprout of Olive Leaf of Hope (Held near bottom left) */}
          <g transform="translate(10, 48)">
            <path
              d="M0 8C3 4 8 2 12 4C9 7 6 9 0 8Z"
              fill="url(#opOliveLeaf)"
            />
            <path
              d="M3 6C6 3 10 2 13 3"
              stroke="#FDE68A"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </g>

          {/* Small companion olive leaf on right */}
          <g transform="translate(43, 49) scale(-1, 1)">
            <path
              d="M0 7C3 3 7 2 11 4C8 6 5 8 0 7Z"
              fill="url(#opOliveLeaf)"
            />
          </g>
        </svg>
      </div>

      {/* Typographic Identity */}
      <div className={cn("flex flex-col", layout === 'vertical' ? "items-center" : "items-start")}>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn(
            "serif font-extrabold tracking-tight transition-colors",
            titleSizes[size],
            titleColor
          )}>
            OUTPOST <span className={cn("italic font-normal transition-colors", accentColor)}>Country Living</span>
          </span>
        </div>

        {showSubtitle && (
          <span className={cn(
            "font-sans font-semibold uppercase transition-colors mt-0.5",
            subtitleSizes[size],
            subtitleColor
          )}>
            Malawi Sanctuary & Self-Reliance
          </span>
        )}
      </div>
    </div>
  );
}

export default OutpostLogo;

