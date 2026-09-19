import { useState, useMemo, useEffect } from 'react';
import { VERIFIED_MALAWI_AGRO_SITES, ScoutGeoJSONCollection, ScoutParcelFeature } from '@/data/scoutGeoJSON';
import { getStoredMapGeoJSONCache, saveStoredMapGeoJSONCache } from '@/lib/offlineStorage';

export interface FilterState {
  searchQuery: string;
  selectedWater: string[];
  selectedTenure: string[];
  signalFilter: 'All' | '4G' | '3G+';
  maxGridDistance: number;
  selectedRoadAccess: string[];
  selectedSoil: string[];
  minOrganicMatter: number; // 0 to 5%
  minEdenicScore: number; // 0 to 95
  selectedPhRange: 'All' | 'Balanced (6.0-7.0)' | 'Acidic (<6.0)';
  chiefVerifiedOnly: boolean;
  quickChips: {
    gridNearby: boolean;
    perennialWater: boolean;
    registeredTenure: boolean;
    signal4G: boolean;
    chiefVerified: boolean;
    highHumus: boolean;
    edenicPrime: boolean;
  };
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedWater: [],
  selectedTenure: [],
  signalFilter: 'All',
  maxGridDistance: 15, // 0 to 15km
  selectedRoadAccess: [],
  selectedSoil: [],
  minOrganicMatter: 0,
  minEdenicScore: 0,
  selectedPhRange: 'All',
  chiefVerifiedOnly: false,
  quickChips: {
    gridNearby: false,
    perennialWater: false,
    registeredTenure: false,
    signal4G: false,
    chiefVerified: false,
    highHumus: false,
    edenicPrime: false,
  }
};

export function useMapFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [rawGeoJSON, setRawGeoJSON] = useState<ScoutGeoJSONCollection>(() => {
    try {
      const cached = getStoredMapGeoJSONCache<ScoutGeoJSONCollection>();
      if (cached && cached.features && cached.features.length > 0) {
        // Invalidate legacy mock parcels that had fake land- IDs
        const hasLegacyMock = cached.features.some(f => f.properties.id.startsWith('land-'));
        if (!hasLegacyMock) {
          return cached;
        }
      }
    } catch (err) {
      console.warn('Failed to load cached GeoJSON, using verified dataset:', err);
    }
    return VERIFIED_MALAWI_AGRO_SITES;
  });

  const [isOfflineCached, setIsOfflineCached] = useState(false);

  // Cache GeoJSON data for offline resilience
  useEffect(() => {
    try {
      saveStoredMapGeoJSONCache(rawGeoJSON);
      setIsOfflineCached(true);
    } catch (err) {
      console.error('Error caching GeoJSON data locally:', err);
    }
  }, [rawGeoJSON]);

  // Toggle quick chip selection
  const toggleQuickChip = (chipKey: keyof FilterState['quickChips']) => {
    setFilters((prev) => ({
      ...prev,
      quickChips: {
        ...prev.quickChips,
        [chipKey]: !prev.quickChips[chipKey]
      }
    }));
  };

  // Toggle array item (e.g. water, tenure, access, soil)
  const toggleMultiSelect = (key: 'selectedWater' | 'selectedTenure' | 'selectedRoadAccess' | 'selectedSoil', value: string) => {
    setFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim() !== '') count++;
    if (filters.selectedWater.length > 0) count += filters.selectedWater.length;
    if (filters.selectedTenure.length > 0) count += filters.selectedTenure.length;
    if (filters.signalFilter !== 'All') count++;
    if (filters.maxGridDistance < 15) count++;
    if (filters.selectedRoadAccess.length > 0) count += filters.selectedRoadAccess.length;
    if (filters.selectedSoil.length > 0) count += filters.selectedSoil.length;
    if (filters.minOrganicMatter > 0) count++;
    if (filters.minEdenicScore > 0) count++;
    if (filters.selectedPhRange !== 'All') count++;
    if (filters.chiefVerifiedOnly) count++;
    
    // Quick chips count
    Object.values(filters.quickChips).forEach((val) => {
      if (val) count++;
    });

    return count;
  }, [filters]);

  // Filter features real-time
  const filteredFeatures = useMemo(() => {
    return rawGeoJSON.features.filter((feature: ScoutParcelFeature) => {
      const p = feature.properties;

      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesQuery = 
          p.title.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.traditionalAuthority.toLowerCase().includes(q) ||
          p.groupVillageHeadman.toLowerCase().includes(q) ||
          p.nearestTown.toLowerCase().includes(q) ||
          (p.soilTextureClass && p.soilTextureClass.toLowerCase().includes(q)) ||
          p.scoutNotes.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Quick Chips
      if (filters.quickChips.gridNearby && p.distanceToGridKm > 3.0) return false;
      if (filters.quickChips.perennialWater && p.waterReliability !== 'Perennial Stream') return false;
      if (filters.quickChips.registeredTenure && (p.landTenure !== 'Customary Estate Registered' && p.landTenure !== 'Private Leasehold')) return false;
      if (filters.quickChips.signal4G && (p.tnmSignal !== '4G' && p.airtelSignal !== '4G')) return false;
      if (filters.quickChips.chiefVerified && p.chiefVerification !== 'Verified') return false;
      if (filters.quickChips.highHumus && (p.soilOrganicMatterPct || 0) < 3.5) return false;
      if (filters.quickChips.edenicPrime && (p.edenicStewardshipScore || 0) < 90) return false;

      // 3. Water Reliability
      if (filters.selectedWater.length > 0 && !filters.selectedWater.includes(p.waterReliability)) {
        return false;
      }

      // 4. Land Tenure
      if (filters.selectedTenure.length > 0 && !filters.selectedTenure.includes(p.landTenure)) {
        return false;
      }

      // 5. Telecom Signal
      if (filters.signalFilter === '4G') {
        if (p.tnmSignal !== '4G' && p.airtelSignal !== '4G') return false;
      } else if (filters.signalFilter === '3G+') {
        const valid = ['4G', '3G'];
        if (!valid.includes(p.tnmSignal) && !valid.includes(p.airtelSignal)) return false;
      }

      // 6. Max Grid Distance
      if (p.distanceToGridKm > filters.maxGridDistance) {
        return false;
      }

      // 7. Rainy Season Access
      if (filters.selectedRoadAccess.length > 0 && !filters.selectedRoadAccess.includes(p.rainySeasonAccess)) {
        return false;
      }

      // 8. Soil Profile
      if (filters.selectedSoil.length > 0 && !filters.selectedSoil.includes(p.soilProfile)) {
        return false;
      }

      // 9. Soil Organic Matter Min %
      if (filters.minOrganicMatter > 0 && (p.soilOrganicMatterPct || 0) < filters.minOrganicMatter) {
        return false;
      }

      // 10. Edenic Stewardship Score Min
      if (filters.minEdenicScore > 0 && (p.edenicStewardshipScore || 0) < filters.minEdenicScore) {
        return false;
      }

      // 11. Soil pH Range
      if (filters.selectedPhRange === 'Balanced (6.0-7.0)') {
        if ((p.soilPh || 0) < 6.0 || (p.soilPh || 0) > 7.0) return false;
      } else if (filters.selectedPhRange === 'Acidic (<6.0)') {
        if ((p.soilPh || 0) >= 6.0) return false;
      }

      // 12. Chief Verification
      if (filters.chiefVerifiedOnly && p.chiefVerification !== 'Verified') {
        return false;
      }

      return true;
    });
  }, [rawGeoJSON, filters]);

  const filteredGeoJSON = useMemo<ScoutGeoJSONCollection>(() => {
    return {
      type: 'FeatureCollection',
      features: filteredFeatures
    };
  }, [filteredFeatures]);

  return {
    filters,
    setFilters,
    rawGeoJSON,
    filteredGeoJSON,
    filteredFeatures,
    totalCount: rawGeoJSON.features.length,
    filteredCount: filteredFeatures.length,
    activeFilterCount,
    isOfflineCached,
    toggleQuickChip,
    toggleMultiSelect,
    resetFilters
  };
}
