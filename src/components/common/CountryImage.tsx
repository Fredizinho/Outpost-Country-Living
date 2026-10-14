import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface CountryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  slot?: 'hero' | 'card' | 'square' | 'banner';
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'custom';
  objectPosition?: string;
  isAiGenerated?: boolean;
  caption?: string;
  showCaption?: boolean;
  containerClassName?: string;
}

// Calibrated focal point per known country living illustration
const CALIBRATED_OBJECT_POSITIONS: Record<string, string> = {
  malawiHomesteadMorning: 'center 35%',
  malawiHomesteadSanctuary: 'center 30%',
  homesteadHighlands: 'center 40%',
  permacultureGarden: 'center 45%',
  mountainVista: 'center 50%',
  offgridHomesteadWater: 'center 35%',
  edenicDeepPlantingPit: 'center 50%',
  sanitariumNaturalDispensary: 'center 40%',
  ruralIndustrialSanctuary: 'center 35%',
  permacultureWaterHydraulics: 'center 40%',
  malawiOutpostBotanical: 'center 35%',
  jerusalemSiege: 'center 35%',
  mountainFlight: 'center 30%',
  cityCrisis: 'center 40%',
  childrenGarden: 'center 40%',
  peacefulMind: 'center 35%',
  buyingSelling: 'center 40%',
  openAirLabor: 'center 35%',
  sanctuary1844Judgment: 'center 25%',
  threeAngelsProclamation: 'center 30%',
  secondComingDeliverance: 'center 25%',
};

function getFocalPosition(src: string, customPos?: string): string {
  if (customPos) return customPos;
  for (const [key, pos] of Object.entries(CALIBRATED_OBJECT_POSITIONS)) {
    if (src.toLowerCase().includes(key.toLowerCase())) {
      return pos;
    }
  }
  return 'center 40%';
}

export function CountryImage({
  src,
  alt,
  slot = 'card',
  aspectRatio,
  objectPosition,
  isAiGenerated = true,
  caption = 'Illustrative image',
  showCaption = true,
  className,
  containerClassName,
  loading = 'lazy',
  ...props
}: CountryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine standard aspect ratio per slot
  const resolvedRatio = aspectRatio ?? (slot === 'hero' || slot === 'banner' ? '16:9' : '4:3');
  const aspectClass =
    resolvedRatio === '16:9'
      ? 'aspect-[16/9]'
      : resolvedRatio === '4:3'
      ? 'aspect-[4/3]'
      : resolvedRatio === '1:1'
      ? 'aspect-square'
      : '';

  const resolvedPosition = getFocalPosition(src, objectPosition);

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-card border border-border/80 bg-stone-900 group select-none',
        aspectClass,
        containerClassName
      )}
    >
      {/* Blur-Up Placeholder Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-[#1A1209] transition-opacity duration-700 pointer-events-none',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(245, 158, 11, 0.15) 0%, rgba(7, 26, 16, 0.85) 100%)',
          filter: 'blur(16px)',
        }}
      >
        <div className="w-full h-full animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Main Image with Subtle Warm Grade Treatment */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        style={{
          objectPosition: resolvedPosition,
        }}
        className={cn(
          'w-full h-full object-cover transition-all duration-700 country-image-grade',
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm',
          className
        )}
        {...props}
      />

      {/* Subtle Warm Amber Atmospheric Overlay for Consistent Grade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent mix-blend-multiply opacity-60"
      />

      {/* "Illustrative image" Caption Badge */}
      {isAiGenerated && showCaption && (
        <figcaption
          className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded-control text-caption font-mono font-medium text-stone-200/90 bg-stone-950/75 backdrop-blur-md border border-white/10 shadow-flat pointer-events-none"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default CountryImage;
