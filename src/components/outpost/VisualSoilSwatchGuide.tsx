import React from 'react';
import { Hand, Droplets, Sprout } from 'lucide-react';

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
    hexColor: '#9A3412',
    accentColor: '#F97316',
    handRibbonTest: 'Forms a firm 4–5 cm ribbon when squeezed wet between thumb and forefinger; stains palm brick-red.',
    drainageSpeed: 'Moderate (crusts on top if left bare in sun)',
    bestFix: 'Keep covered with 15 cm dry grass mulch (Udzu wofunda) and add compost (Manyowa) + wood ash (Phulusa).'
  },
  {
    id: 'makande',
    chichewaName: 'Makande',
    englishName: 'Black Cracking Valley Clay',
    faoClass: 'Pellic Vertisols',
    hexColor: '#27272A',
    accentColor: '#A1A1AA',
    handRibbonTest: 'Sticky like modeling clay when wet (forms a 7+ cm ribbon); opens deep cracks in September–October.',
    drainageSpeed: 'Slow (holds water long into dry season)',
    bestFix: 'Never plow when soaking wet. Mix in coarse river sand, rice husks, and heavy organic compost.'
  },
  {
    id: 'mchenga',
    chichewaName: 'Mchenga',
    englishName: 'Lakeshore & Plain Sandy Soil',
    faoClass: 'Arenosols / Fluvisols',
    hexColor: '#D97706',
    accentColor: '#FBBF24',
    handRibbonTest: 'Feels gritty; crumbles immediately and cannot form a ribbon when squeezed in your hand.',
    drainageSpeed: 'Very Fast (water and nutrients leach quickly)',
    bestFix: 'Line planting pits with crushed charcoal (Makala / Biochar) and rich animal/plant compost to trap moisture.'
  },
  {
    id: 'chidothe',
    chichewaName: 'Chidothe / Dothi lakuda',
    englishName: 'Dark Forest & Dambo Humus Loam',
    faoClass: 'Humic Nitisols / Gleysols',
    hexColor: '#3E2723',
    accentColor: '#10B981',
    handRibbonTest: 'Feels soft, spongy, and earthy like a forest floor; forms a short 2–3 cm crumbly ribbon.',
    drainageSpeed: 'Ideal Balanced Sponge (retains moisture while breathing)',
    bestFix: 'Protect with living legume cover crops (Khobwe / Kalongonda) and contour Vetiver grass strips.'
  }
];

export function VisualSoilSwatchGuide() {
  return (
    <div className="mt-6 pt-6 border-t border-stone-200/80 dark:border-emerald-900/50 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
            Visual Hand-Test Guide · Chichewa Soil Swatches
          </span>
          <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white">
            Identify Your Soil by Color &amp; Wet-Hand Squeeze Test
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          Take 1 handful of moist soil at 15 cm depth and squeeze between thumb and finger
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MALAWI_SOIL_SWATCHES.map((swatch) => (
          <div
            key={swatch.id}
            className="p-4 rounded-2xl bg-stone-50 dark:bg-[#08150D] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col justify-between gap-3"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl shrink-0 border-2 border-white/30 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: swatch.hexColor }}
                  title={`${swatch.chichewaName} color swatch`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: swatch.accentColor }}
                  />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-300 block">
                    {swatch.chichewaName}
                  </span>
                  <h5 className="font-display text-sm font-bold text-stone-900 dark:text-white leading-tight">
                    {swatch.englishName}
                  </h5>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                    {swatch.faoClass}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900/80 border border-stone-200/70 dark:border-emerald-950 text-xs text-stone-700 dark:text-stone-200 leading-relaxed">
                <span className="font-bold text-stone-900 dark:text-amber-200 flex items-center gap-1 mb-0.5">
                  <Hand size={12} /> Hand Squeeze Test:
                </span>
                {swatch.handRibbonTest}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-stone-200/60 dark:border-emerald-900/40 text-xs">
              <div className="text-stone-600 dark:text-stone-300">
                <strong className="text-stone-900 dark:text-white inline-flex items-center gap-1">
                  <Droplets size={11} className="text-sky-600 dark:text-sky-400" /> Drainage:
                </strong>{' '}
                {swatch.drainageSpeed}
              </div>
              <div className="text-emerald-900 dark:text-emerald-300">
                <strong className="inline-flex items-center gap-1">
                  <Sprout size={11} /> Best Fix:
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
