/**
 * Standardized Homestead Measurements Repository
 * Metric first with imperial equivalent in brackets.
 * Used across technical field guides, diagrams, bills of quantities, and construction specs.
 */

export interface MeasurementValue {
  metric: string;
  imperial: string;
  formatted: string;
}

export function formatMeasure(metric: string, imperial: string): string {
  return `${metric} [${imperial}]`;
}

/**
 * 1. Deep Tree Planting Pit (Australian / Ellen G. White 1m³ Method)
 */
export const PLANTING_PIT_MEASUREMENTS = {
  width: {
    metric: '90 cm',
    imperial: '3 ft',
    formatted: '90 cm [3 ft]',
  },
  depth: {
    metric: '90 cm',
    imperial: '3 ft',
    formatted: '90 cm [3 ft]',
  },
  length: {
    metric: '90 cm',
    imperial: '3 ft',
    formatted: '90 cm [3 ft]',
  },
  bottomDrainageLayer: {
    metric: '20 cm',
    imperial: '8 in',
    formatted: '20 cm [8 in]',
  },
  middleCompostLayer: {
    metric: '45 cm',
    imperial: '18 in',
    formatted: '45 cm [18 in]',
  },
  topsoilLayer: {
    metric: '25 cm',
    imperial: '10 in',
    formatted: '25 cm [10 in]',
  },
  mulchRingDepth: {
    metric: '15 cm',
    imperial: '6 in',
    formatted: '15 cm [6 in]',
  },
  graftCollarHeight: {
    metric: '5 cm',
    imperial: '2 in',
    formatted: '5 cm [2 in]',
  },
  compostWeight: {
    metric: '40 kg',
    imperial: '88 lb',
    formatted: '40 kg [88 lb]',
  },
  biocharWeight: {
    metric: '4 kg',
    imperial: '9 lb',
    formatted: '4 kg [9 lb]',
  },
  woodAshVolume: {
    metric: '500 ml',
    imperial: '1 pt',
    formatted: '500 ml [1 pt]',
  },
} as const;

/**
 * 2. Ridge Spacing (Mitumbira & Sasakawa Precision Contour Ridges)
 */
export const RIDGE_SPACING_MEASUREMENTS = {
  ridgeSpacing: {
    metric: '75 cm',
    imperial: '30 in',
    formatted: '75 cm [30 in]',
  },
  ridgeHeight: {
    metric: '30 cm',
    imperial: '12 in',
    formatted: '30 cm [12 in]',
  },
  furrowWidth: {
    metric: '45 cm',
    imperial: '18 in',
    formatted: '45 cm [18 in]',
  },
  plantSpacing: {
    metric: '25 cm',
    imperial: '10 in',
    formatted: '25 cm [10 in]',
  },
  tiedRidgeInterval: {
    metric: '2 m to 3 m',
    imperial: '6.5 to 10 ft',
    formatted: '2 m to 3 m [6.5 to 10 ft]',
  },
  markerRidgeInterval: {
    metric: '10 m to 20 m',
    imperial: '33 to 66 ft',
    formatted: '10 m to 20 m [33 to 66 ft]',
  },
} as const;

/**
 * 3. Water Retention Contour Swale (Ditch, Mound & Infiltration Basin)
 */
export const SWALE_MEASUREMENTS = {
  trenchWidth: {
    metric: '100 cm',
    imperial: '3.3 ft',
    formatted: '100 cm [3.3 ft]',
  },
  trenchDepth: {
    metric: '50 cm',
    imperial: '20 in',
    formatted: '50 cm [20 in]',
  },
  flatBaseWidth: {
    metric: '60 cm',
    imperial: '24 in',
    formatted: '60 cm [24 in]',
  },
  bundHeight: {
    metric: '40 cm',
    imperial: '16 in',
    formatted: '40 cm [16 in]',
  },
  bundBaseWidth: {
    metric: '120 cm',
    imperial: '4 ft',
    formatted: '120 cm [4 ft]',
  },
  vetiverHedgeSpacing: {
    metric: '10 cm to 15 cm',
    imperial: '4 to 6 in',
    formatted: '10 cm to 15 cm [4 to 6 in]',
  },
  waterInfiltrationDepth: {
    metric: '35 cm',
    imperial: '14 in',
    formatted: '35 cm [14 in]',
  },
} as const;

/**
 * 4. Roof Catchment, First Flush & Storage Tank System
 */
export const ROOF_TANK_MEASUREMENTS = {
  roofOverhang: {
    metric: '60 cm',
    imperial: '24 in',
    formatted: '60 cm [24 in]',
  },
  gutterSlope: {
    metric: '1 cm per 1 m',
    imperial: '1/8 in per ft',
    formatted: '1 cm per 1 m [1/8 in per ft]',
  },
  firstFlushDiverterDiameter: {
    metric: '110 mm',
    imperial: '4 in',
    formatted: '110 mm [4 in]',
  },
  firstFlushCapacity: {
    metric: '25 L to 50 L',
    imperial: '6.6 to 13.2 gal',
    formatted: '25 L to 50 L [6.6 to 13.2 gal]',
  },
  tankCapacity: {
    metric: '5,000 L to 10,000 L',
    imperial: '1,320 to 2,640 gal',
    formatted: '5,000 L to 10,000 L [1,320 to 2,640 gal]',
  },
  concreteBasePadThickness: {
    metric: '15 cm',
    imperial: '6 in',
    formatted: '15 cm [6 in]',
  },
  wireMeshScreenOpening: {
    metric: '1 mm',
    imperial: '0.04 in',
    formatted: '1 mm [0.04 in]',
  },
} as const;

/**
 * 5. Zeer Pot Evaporative Refrigerator (Pot-in-Pot Cooling)
 */
export const ZEER_POT_MEASUREMENTS = {
  outerPotDiameter: {
    metric: '50 cm',
    imperial: '20 in',
    formatted: '50 cm [20 in]',
  },
  innerPotDiameter: {
    metric: '35 cm',
    imperial: '14 in',
    formatted: '35 cm [14 in]',
  },
  sandGapThickness: {
    metric: '5 cm to 7.5 cm',
    imperial: '2 to 3 in',
    formatted: '5 cm to 7.5 cm [2 to 3 in]',
  },
  dailyWaterAddition: {
    metric: '1 L to 2 L',
    imperial: '1 to 2 qt',
    formatted: '1 L to 2 L [1 to 2 qt]',
  },
  temperatureDrop: {
    metric: '5°C to 10°C',
    imperial: '9°F to 18°F',
    formatted: '5°C to 10°C [9°F to 18°F]',
  },
  storageExtension: {
    metric: '20 days (up from 2 days)',
    imperial: '20 days',
    formatted: '20 days [up from 2 days]',
  },
} as const;
