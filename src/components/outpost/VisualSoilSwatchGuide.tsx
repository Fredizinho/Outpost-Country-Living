import React from 'react';
import { Hand, Droplets, Sprout } from 'lucide-react';
import { MALAWI_SOIL_SWATCH_THEME } from '@/theme';

export interface SoilSwatchItem {
  id: string;
  chichewaName: string;
  englishName: string;
  faoClass: string;
  hexColor: string;
  accentColor: string;
  handRibbonTest: string;
  drainageSpeed: string;
  bestFix: string;
}

export const MALAWI_SOIL_SWATCHES: SoilSwatchItem[] = [
  {
    id: 'katondo',
    chichewaName: 'Katondo',
    englishName: 'Red Plateau Clay-Loam',
    faoClass: 'Chromic Luvisols / Lixisols',
    hexColor: MALAWI_SOIL_SWATCH_THEME.katondo.base,
    accentColor: MALAWI_SOIL_SWATCH_THEME.katondo.accent,
    handRibbonTest: 'Forms a firm 4–5 cm ribbon when squeezed wet between thumb and forefinger; stains palm brick-red.',
    drainageSpeed: 'Moderate (crusts on top if left bare in sun)',
    bestFix: 'Keep covered with 15 cm dry grass mulch (Udzu wofunda) and add compost (Manyowa) + wood ash (Phulusa).'
  },
  {
    id: 'makande',
    chichewaName: 'Makande',
    englishName: 'Black Cracking Valley Clay',
    faoClass: 'Pellic Vertisols',
    hexColor: MALAWI_SOIL_SWATCH_THEME.makande.base,
    accentColor: MALAWI_SOIL_SWATCH_THEME.makande.accent,
    handRibbonTest: 'Sticky like modeling clay when wet (forms a 7+ cm ribbon); opens deep cracks in September–October.',
    drainageSpeed: 'Slow (holds water long into dry season)',
    bestFix: 'Never plow when soaking wet. Mix in coarse river sand, rice husks, and heavy organic compost.'
  },
  {
    id: 'mchenga',
    chichewaName: 'Mchenga',
    englishName: 'Lakeshore & Plain Sandy Soil',
    faoClass: 'Arenosols / Fluvisols',
    hexColor: MALAWI_SOIL_SWATCH_THEME.mchenga.base,
    accentColor: MALAWI_SOIL_SWATCH_THEME.mchenga.accent,
    handRibbonTest: 'Feels gritty; crumbles immediately and cannot form a ribbon when squeezed in your hand.',
    drainageSpeed: 'Very Fast (water and nutrients leach quickly)',
    bestFix: 'Line planting pits with crushed charcoal (Makala / Biochar) and rich animal/plant compost to trap moisture.'
  },
  {
    id: 'chidothe',
    chichewaName: 'Chidothe / Dothi lakuda',
    englishName: 'Dark Forest & Dambo Humus Loam',
    faoClass: 'Humic Nitisols / Gleysols',
    hexColor: MALAWI_SOIL_SWATCH_THEME.chidothe.base,
    accentColor: MALAWI_SOIL_SWATCH_THEME.chidothe.accent,
    handRibbonTest: 'Feels soft, spongy, and earthy like a forest floor; forms a short 2–3 cm crumbly ribbon.',
    drainageSpeed: 'Ideal Balanced Sponge (retains moisture while breathing)',
    bestFix: 'Protect with living legume cover crops (Khobwe / Kalongonda) and contour Vetiver grass strips.'
  }
];

export function VisualSoilSwatchGuide() {
  return (
    <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-sans font-semibold text-[var(--accent)]">
            Visual hand-test guide · Chichewa soil swatches
          </span>
          <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
            Identify Your Soil by Color &amp; Wet-Hand Squeeze Test
          </h4>
        </div>
        <span className="text-xs text-[var(--ink-muted)]">
          Take 1 handful of moist soil at 15 cm depth and squeeze between thumb and finger
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MALAWI_SOIL_SWATCHES.map((swatch) => (
          <div
            key={swatch.id}
            className="p-4 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-[var(--radius-control)] shrink-0 border-2 border-white/30 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: swatch.hexColor }}
                  title={`${swatch.chichewaName} color swatch`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: swatch.accentColor }}
                  />
                </div>
                <div>
                  <span className="text-xs font-sans font-semibold text-[var(--moss)] dark:text-[var(--gold)] block">
                    {swatch.chichewaName}
                  </span>
                  <h5 className="font-serif text-sm font-bold text-[var(--ink)] leading-tight">
                    {swatch.englishName}
                  </h5>
                  <span className="text-caption text-[var(--ink-muted)] font-mono">
                    Technical: FAO {swatch.faoClass}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--ink)] leading-relaxed">
                <span className="font-semibold text-[var(--accent)] flex items-center gap-1 mb-0.5">
                  <Hand size={12} /> Hand Squeeze Test:
                </span>
                {swatch.handRibbonTest}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border)] text-xs">
              <div className="text-[var(--ink-muted)]">
                <strong className="text-[var(--ink)] inline-flex items-center gap-1">
                  <Droplets size={11} className="text-[var(--info)]" /> Drainage:
                </strong>{' '}
                {swatch.drainageSpeed}
              </div>
              <div className="text-[var(--success)]">
                <strong className="inline-flex items-center gap-1">
                  <Sprout size={11} /> Best fix:
                </strong>{' '}
                {swatch.bestFix}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
