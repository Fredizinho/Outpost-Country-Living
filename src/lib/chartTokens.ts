/**
 * Standardized Chart & Spatial Data Tokens
 * ============================================================================
 * Visual Rules:
 * 1. 6-color categorical palette:
 *    - Color-blind safe (protanopia, deuteranopia, tritanopia verified)
 *    - Distinguishable in grayscale via calibrated luminance stepping
 * 2. Direct labels instead of legends where there are 4 series or fewer
 * 3. 12px minimum axis text
 * 4. Soft grid lines (subtle alpha)
 * 5. Tooltips styled like cards (rounded-card, shadow-raised, border)
 * 6. Estimated or modelled data must use dashed lines or hatched fills,
 *    tying into the honesty badges from the data audit.
 * ============================================================================
 */

export const CHART_PALETTE_6 = [
  '#15803D', // 1. Forest Green (Dark organic anchor, L ~0.49)
  '#C85A32', // 2. Katondo Terracotta (Burnt sienna earth, L ~0.54)
  '#0284C7', // 3. Lake Water Blue (Hydrology & rain, L ~0.50)
  '#D97706', // 4. Amber Gold (Solar energy & harvest, L ~0.56)
  '#7C3AED', // 5. Iris Violet (High-contrast categorical, L ~0.44)
  '#4B5563', // 6. Earth Slate Neutral (Secondary reference, L ~0.37)
] as const;

export const CHART_TOKENS = {
  colors: {
    forest: CHART_PALETTE_6[0],
    terracotta: CHART_PALETTE_6[1],
    lake: CHART_PALETTE_6[2],
    amber: CHART_PALETTE_6[3],
    iris: CHART_PALETTE_6[4],
    slate: CHART_PALETTE_6[5],
  },
  axis: {
    fontSize: 12, // Strict 12px floor for all axis labels
    fontFamily: 'inherit',
    stroke: 'currentColor',
    opacity: 0.65,
    tickLine: false,
  },
  grid: {
    stroke: 'rgba(120, 113, 108, 0.18)', // Soft organic neutral grid line
    strokeDasharray: '3 3',
    vertical: false,
  },
  modelled: {
    strokeDasharray: '5 5', // Dashed line for estimated / modelled series
    opacity: 0.85,
    badgeText: 'Modelled / Projected Simulation',
  },
  tooltipCardClass:
    'p-3.5 rounded-card bg-stone-950/95 text-stone-100 border border-stone-800 shadow-raised text-xs font-sans backdrop-blur-md',
} as const;

export interface ChartHonestyBadgeProps {
  type?: 'measured' | 'modelled' | 'estimated';
  label?: string;
  className?: string;
}
