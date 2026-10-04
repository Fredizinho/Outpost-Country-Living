import { useState, useEffect, useCallback } from 'react';

const ACTIVE_DISTRICT_STORAGE_KEY = 'outpost_active_district_id_v1';
const ACTIVE_DISTRICT_EVENT = 'outpost:active-district-changed';

export function getActiveHomesteadDistrictId(fallback = 'dedza'): string {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(ACTIVE_DISTRICT_STORAGE_KEY);
    if (raw && raw.trim()) {
      return raw.trim().toLowerCase();
    }
  } catch {
    // ignore storage errors
  }
  return fallback;
}

export function setActiveHomesteadDistrictId(districtId: string): void {
  if (typeof window === 'undefined' || !districtId) return;
  const normalized = districtId.replace(/\s+district$/i, '').trim().toLowerCase().replace(/\s+/g, '-');
  try {
    localStorage.setItem(ACTIVE_DISTRICT_STORAGE_KEY, normalized);
    window.dispatchEvent(
      new CustomEvent<{ districtId: string }>(ACTIVE_DISTRICT_EVENT, {
        detail: { districtId: normalized },
      })
    );
  } catch {
    // ignore storage errors
  }
}

export function useActiveHomesteadDistrict(initialOverride?: string | null): [string, (id: string) => void] {
  const [districtId, setDistrictIdState] = useState<string>(() => {
    if (initialOverride && initialOverride.trim()) {
      return initialOverride.trim().toLowerCase();
    }
    return getActiveHomesteadDistrictId('dedza');
  });

  useEffect(() => {
    if (initialOverride && initialOverride.trim()) {
      const norm = initialOverride.trim().toLowerCase();
      setDistrictIdState(norm);
      setActiveHomesteadDistrictId(norm);
    }
  }, [initialOverride]);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{ districtId: string }>;
      if (custom.detail?.districtId) {
        setDistrictIdState(custom.detail.districtId);
      }
    };
    window.addEventListener(ACTIVE_DISTRICT_EVENT, handleSync);
    return () => window.removeEventListener(ACTIVE_DISTRICT_EVENT, handleSync);
  }, []);

  const updateDistrict = useCallback((nextId: string) => {
    const norm = nextId.replace(/\s+district$/i, '').trim().toLowerCase().replace(/\s+/g, '-');
    setDistrictIdState(norm);
    setActiveHomesteadDistrictId(norm);
  }, []);

  return [districtId, updateDistrict];
}
