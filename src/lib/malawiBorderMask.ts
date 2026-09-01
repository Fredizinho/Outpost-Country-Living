import { MALAWI_COUNTRY_GEOMETRY, GeoFeatureGeometry } from '@/data/malawiGeoData';

// Global outer mask bounds covering all surrounding countries & oceans
export const WORLD_OUTER_MASK_RING: [number, number][] = [
  [-85.0, -180.0],
  [-85.0, 180.0],
  [85.0, 180.0],
  [85.0, -180.0],
  [-85.0, -180.0]
];

// Strict Malawi Geographic Bounds (Locks the Leaflet map within Malawi only)
export const MALAWI_STRICT_BOUNDS = {
  southWest: [-17.25, 32.40] as [number, number],
  northEast: [-9.20, 36.10] as [number, number],
  center: [-13.2543, 34.3015] as [number, number],
  minZoom: 6.5,
  maxZoom: 18,
  maxBounds: [
    [-17.60, 32.20],
    [-8.90, 36.40]
  ] as [[number, number], [number, number]]
};

/**
 * Extracts all polygon rings from MALAWI_COUNTRY_GEOMETRY and converts
 * [lng, lat] to Leaflet [lat, lng] format.
 */
export function getMalawiBorderRings(): [number, number][][] {
  const geom = MALAWI_COUNTRY_GEOMETRY;
  const rings: [number, number][][] = [];

  if (geom.type === 'Polygon') {
    const coords = geom.coordinates as [number, number][][];
    coords.forEach(ring => {
      rings.push(ring.map(([lng, lat]) => [lat, lng]));
    });
  } else if (geom.type === 'MultiPolygon') {
    const coords = geom.coordinates as [number, number][][][];
    coords.forEach(polygon => {
      polygon.forEach(ring => {
        rings.push(ring.map(([lng, lat]) => [lat, lng]));
      });
    });
  }

  return rings;
}

/**
 * Creates the Inverse Mask Polygon for Leaflet.
 * Outer ring = World bounds
 * Inner holes = Malawi border rings
 * When filled with canvas background color (e.g. #020617), all neighboring
 * countries (Mozambique, Zambia, Tanzania, etc.) and ocean are 100% masked out!
 */
export function getMalawiInverseMaskLatLngs(): [number, number][][][] {
  const malawiRings = getMalawiBorderRings();
  // In Leaflet, a polygon with hole is [[outerRing, hole1, hole2, ...]]
  return [[WORLD_OUTER_MASK_RING, ...malawiRings]];
}

/**
 * Returns clean line coordinates for the glowing sovereign border of Malawi
 */
export function getMalawiNationalBorderLines(): [number, number][][] {
  return getMalawiBorderRings();
}
