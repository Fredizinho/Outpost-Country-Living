import L from 'leaflet';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';

export type LabelOffsetMode = 'default' | 'offset-top' | 'offset-right' | 'offset-left' | 'hidden';

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function boxesIntersect(a: BoundingBox, b: BoundingBox, margin = 4): boolean {
  return !(
    a.x2 + margin < b.x1 ||
    a.x1 - margin > b.x2 ||
    a.y2 + margin < b.y1 ||
    a.y1 - margin > b.y2
  );
}

export interface DistrictMarkerCollisionResult {
  districtId: string;
  offsetMode: LabelOffsetMode;
  isExpanded: boolean;
  isSelected: boolean;
}

/**
 * Computes dynamic label collision avoidance for Malawi district centroid badges and nametags.
 * Detects collisions between expanded marker badges and neighboring district text labels,
 * automatically offsetting or hiding overlapping text for maximum cartographic clarity.
 */
export function computeDistrictLabelCollisions({
  districts,
  activeDistrictId,
  expandedDistrictId,
  map,
  currentZoom
}: {
  districts: MalawiDistrictSpec[];
  activeDistrictId: string | null;
  expandedDistrictId: string | null;
  map: L.Map | null;
  currentZoom: number;
}): Map<string, DistrictMarkerCollisionResult> {
  const results = new Map<string, DistrictMarkerCollisionResult>();
  if (!map || !districts || districts.length === 0) return results;

  // 1. Project all district centroids to 2D container pixel coordinates
  const projectedItems: {
    district: MalawiDistrictSpec;
    pt: L.Point;
    isSelected: boolean;
    isExpanded: boolean;
    badgeBox: BoundingBox;
    labelWidth: number;
    labelHeight: number;
  }[] = [];

  for (const district of districts) {
    if (!district.centroid) continue;
    try {
      const pt = map.latLngToContainerPoint(district.centroid as L.LatLngTuple);
      const isSelected = activeDistrictId !== null && 
        (district.id === activeDistrictId || district.name.toLowerCase() === activeDistrictId.toLowerCase());
      const isExpanded = isSelected || (expandedDistrictId !== null && district.id === expandedDistrictId);

      // Badge radius: expanded badges take up more screen space
      const badgeRadius = isExpanded ? 32 : 22;
      const badgeBox: BoundingBox = {
        x1: pt.x - badgeRadius,
        y1: pt.y - badgeRadius,
        x2: pt.x + badgeRadius,
        y2: pt.y + badgeRadius
      };

      // Label dimensions
      const labelWidth = Math.max(56, district.name.length * 7.5 + 12);
      const labelHeight = 18;

      projectedItems.push({
        district,
        pt,
        isSelected,
        isExpanded,
        badgeBox,
        labelWidth,
        labelHeight
      });
    } catch {
      // Map projection may fail if pane is detaching
    }
  }

  // 2. Sort by priority: Active/selected district first, then expanded badges, then alphabetically/prominence
  projectedItems.sort((a, b) => {
    if (a.isSelected) return -1;
    if (b.isSelected) return 1;
    if (a.isExpanded) return -1;
    if (b.isExpanded) return 1;
    return a.district.name.localeCompare(b.district.name);
  });

  // 3. Keep track of occupied bounding boxes: all badge boxes + placed label boxes
  const allBadgeBoxes = projectedItems.map(item => ({
    box: item.badgeBox,
    isExpanded: item.isExpanded,
    districtId: item.district.id
  }));
  const placedLabelBoxes: { box: BoundingBox; districtId: string }[] = [];

  // 4. Determine placement mode for each district label
  for (const item of projectedItems) {
    const { district, pt, isSelected, isExpanded, labelWidth, labelHeight } = item;
    const badgeRadius = isExpanded ? 32 : 22;

    // Active district label is NEVER hidden: if it's selected, keep it prominent
    if (isSelected) {
      const defaultBox: BoundingBox = {
        x1: pt.x - labelWidth / 2,
        y1: pt.y + badgeRadius + 2,
        x2: pt.x + labelWidth / 2,
        y2: pt.y + badgeRadius + 2 + labelHeight
      };
      placedLabelBoxes.push({ box: defaultBox, districtId: district.id });
      results.set(district.id, {
        districtId: district.id,
        offsetMode: 'default',
        isExpanded: true,
        isSelected: true
      });
      continue;
    }

    // Candidate positions:
    // 1) Default: below badge
    const defaultBox: BoundingBox = {
      x1: pt.x - labelWidth / 2,
      y1: pt.y + badgeRadius + 3,
      x2: pt.x + labelWidth / 2,
      y2: pt.y + badgeRadius + 3 + labelHeight
    };

    // 2) Offset Top: above badge
    const topBox: BoundingBox = {
      x1: pt.x - labelWidth / 2,
      y1: pt.y - badgeRadius - 3 - labelHeight,
      x2: pt.x + labelWidth / 2,
      y2: pt.y - badgeRadius - 3
    };

    // 3) Offset Right: to the right of badge
    const rightBox: BoundingBox = {
      x1: pt.x + badgeRadius + 4,
      y1: pt.y - labelHeight / 2,
      x2: pt.x + badgeRadius + 4 + labelWidth,
      y2: pt.y + labelHeight / 2
    };

    // 4) Offset Left: to the left of badge
    const leftBox: BoundingBox = {
      x1: pt.x - badgeRadius - 4 - labelWidth,
      y1: pt.y - labelHeight / 2,
      x2: pt.x - badgeRadius - 4,
      y2: pt.y + labelHeight / 2
    };

    const hasCollision = (candidateBox: BoundingBox) => {
      // Check against all badges from other districts (especially expanded badges)
      for (const b of allBadgeBoxes) {
        if (b.districtId !== district.id && boxesIntersect(candidateBox, b.box, b.isExpanded ? 6 : 3)) {
          return true;
        }
      }
      // Check against already placed higher-priority labels
      for (const l of placedLabelBoxes) {
        if (boxesIntersect(candidateBox, l.box, 4)) {
          return true;
        }
      }
      return false;
    };

    let chosenMode: LabelOffsetMode = 'default';
    let chosenBox: BoundingBox | null = null;

    if (!hasCollision(defaultBox)) {
      chosenMode = 'default';
      chosenBox = defaultBox;
    } else if (!hasCollision(topBox)) {
      chosenMode = 'offset-top';
      chosenBox = topBox;
    } else if (!hasCollision(rightBox)) {
      chosenMode = 'offset-right';
      chosenBox = rightBox;
    } else if (!hasCollision(leftBox)) {
      chosenMode = 'offset-left';
      chosenBox = leftBox;
    } else {
      // Collides in all orientations with an expanded badge or existing label -> hide text label
      chosenMode = 'hidden';
    }

    if (chosenBox && chosenMode !== 'hidden') {
      placedLabelBoxes.push({ box: chosenBox, districtId: district.id });
    }

    results.set(district.id, {
      districtId: district.id,
      offsetMode: chosenMode,
      isExpanded,
      isSelected
    });
  }

  return results;
}
