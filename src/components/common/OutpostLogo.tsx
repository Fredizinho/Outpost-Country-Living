import React from 'react';
import { cn } from '@/lib/utils';

interface OutpostLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export function OutpostLogo({ size = 'md', showSubtitle = true, className }: OutpostLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm sm:text-base tracking-wide',
    lg: 'text-lg sm:text-xl tracking-tight',
    xl: 'text-2xl sm:text-3xl tracking-tight',
  };

  const subtitleSizes = {
    sm: 'text-[7.5px] tracking-[0.2em]',
    md: 'text-[8.5px] sm:text-[9px] tracking-[0.22em]',
    lg: 'text-[10px] tracking-[0.25em]',
    xl: 'text-xs tracking-[0.3em]',
  };

  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3 group select-none", className)}>
      {/* Bespoke Outpost Country Living Emblem Mark */}
      <div className={cn(
        "relative rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-emerald-950 p-[1.5px] shadow-lg shadow-amber-950/40 group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-105 shrink-0",
        iconSizes[size]
      )}>
        {/* Inner Glass Emblem Shield */}
        <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#062414] via-[#04190D] to-[#020D07] flex items-center justify-center relative overflow-hidden border border-amber-300/30">
          
          {/* Subtle Sunburst Background */}
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full p-1 text-amber-400/90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="logoMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
            </defs>

            {/* Rising Sun Rays */}
            <circle cx="20" cy="15" r="5" fill="url(#logoSunGrad)" />
            <line x1="20" y1="6" x2="20" y2="8" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="10" x2="14" y2="11.5" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="28" y1="10" x2="26" y2="11.5" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Dual Highland Mountain Ridge Peaks */}
            <path
              d="M6 32L17 17L25 27L34 16L38 32H6Z"
              fill="url(#logoMountainGrad)"
              stroke="#FDE68A"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* River Stream & Earth Furrow Lines */}
            <path
              d="M17 32C19 28 21 25 25 27"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Evergreen Tree Glyph */}
            <path
              d="M20 23L18 26H19L17.5 28H19L17 31H23L21 28H22.5L21 26H22L20 23Z"
              fill="#FAF8F5"
              opacity="0.9"
            />
          </svg>

          {/* Active Status Beacon Dot */}
          <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-slate-950 shadow-xs" />
        </div>
      </div>

      {/* Editorial Typographic Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "font-serif font-black bg-gradient-to-r from-[#FFF4D4] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent group-hover:from-white group-hover:via-amber-200 group-hover:to-amber-400 transition-colors drop-shadow-xs",
            titleSizes[size]
          )}>
            OUTPOST: <span className="italic font-bold text-amber-200 group-hover:text-amber-100">COUNTRY LIVING</span>
          </span>
        </div>

        {showSubtitle && (
          <span className={cn(
            "font-mono font-bold uppercase text-amber-400/80 group-hover:text-amber-300 transition-colors -mt-0.5",
            subtitleSizes[size]
          )}>
            MALAWI SANCTUARY & SELF-RELIANCE
          </span>
        )}
      </div>
    </div>
  );
}
