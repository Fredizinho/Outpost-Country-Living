import { Variants, Transition } from 'motion/react';

/**
 * Standardized Motion System Tokens & Presets
 * ============================================================================
 * Tokens:
 * - Durations: fast (120ms), base (200ms), slow (320ms)
 * - Easing: One unified organic cubic-bezier curve [0.22, 1, 0.36, 1]
 * - Presets: fadeUp, sheet, stagger (with staggerItem)
 * ============================================================================
 */

export const motionDurations = {
  fast: 0.12,  // 120ms
  base: 0.20,  // 200ms
  slow: 0.32,  // 320ms
} as const;

export const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motionTransitions = {
  fast: {
    duration: motionDurations.fast,
    ease: motionEase,
  } satisfies Transition,
  base: {
    duration: motionDurations.base,
    ease: motionEase,
  } satisfies Transition,
  slow: {
    duration: motionDurations.slow,
    ease: motionEase,
  } satisfies Transition,
} as const;

/**
 * Preset 1: fadeUp
 * Smooth vertical entrance with slight elevation rise (12px).
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.base,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: motionTransitions.fast,
  },
};

/**
 * Preset 2: sheet
 * Bottom sheet, drawer, and modal rise transition.
 */
export const sheet: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.slow,
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: motionTransitions.base,
  },
};

/**
 * Preset 3: stagger (container) + staggerItem (child)
 * Coordinated list and card grid choreography.
 */
export const stagger: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.base,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: motionTransitions.fast,
  },
};
