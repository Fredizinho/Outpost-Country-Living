import { HOMESTEAD_SKILLS, SEASONAL_CALENDAR, REGIONS_LIST, SkillItem, SeasonalTask, RegionData } from '@/data/skillsAndSeasons';
import {
  DISTRICT_LIST,
  SOIL_TYPES_REGISTRY,
  PLANTING_PIT_SPECS,
  DistrictRegistryRecord,
  MalawiSoilTypeSpec,
  PlantingPitSpec
} from '@/data/dataRegistry';
import { EDENIC_AGRICULTURE_GUIDES } from '@/data/outpostFourPillarsData';

export const STORAGE_KEYS = {
  EXODUS_TRACKER: 'exodus-tracker-v4',
  LEGACY_EXODUS_TRACKER: 'exodus-tracker',
  LEGACY_EXODUS_TRACKER_V3: 'exodus-tracker-v3',
  LAND_CHECKLIST: 'land-checklist',
  PANTRY_STOCK: 'country-pantry-stock',
  SAVED_SPECS: 'outpost-saved-specs',
  MASTERED_SKILLS: 'mastered-skills',
  BOOKMARKED_PARCELS: 'bookmarked-scout-parcels',
  PINNED_ITEMS: 'outpost_pinned_items_v2',
  SIDEBAR_COLLAPSED: 'outpost_sidebar_collapsed_v1',
  USER_PROFILE: 'outpost_user',
  MAP_GEOJSON_CACHE: 'malawi_district_geojson_cache_v2',
  SKILLS_CACHE: 'outpost_skills_cache_v5',
  SEASONS_CACHE: 'outpost_seasons_cache_v5',
  REGIONS_CACHE: 'outpost_regions_cache_v5',
  DISTRICTS_CACHE: 'outpost_districts_28_cache_v5',
  SOILS_CACHE: 'outpost_fao_soils_cache_v5',
  PITS_CACHE: 'outpost_planting_pits_cache_v5',
  EDENIC_GUIDES_CACHE: 'outpost_edenic_guides_cache_v5',
  WEATHER_LIVE_CACHE: 'outpost_weather_live_cache_v5',
  TELEMETRY_LIVE_CACHE: 'outpost_telemetry_live_cache_v5',
  BOOKMARKS: 'outpost_offline_bookmarks',
  FIELD_NOTES: 'outpost_offline_field_notes',
  COMPLETED_SEASONAL_TASKS: 'outpost_completed_seasonal_tasks_v1',
  LAST_SYNC: 'outpost_offline_last_sync'
} as const;

export interface OfflineBookmark {
  id: string;
  type: 'skill' | 'season' | 'region';
  title: string;
  savedAt: string;
}

export interface OfflineFieldNote {
  id: string;
  guideId: string;
  title: string;
  content: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// TRACKER DOMAIN (exodus-tracker-v3)
// ----------------------------------------------------------------------------
export const TRACKER_STORAGE_KEY = STORAGE_KEYS.EXODUS_TRACKER;

export function getStoredTrackerData<T = any[]>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXODUS_TRACKER);
    if (raw) return JSON.parse(raw);

    // v3 migration fallback
    const v3 = localStorage.getItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER_V3);
    if (v3) {
      localStorage.setItem(STORAGE_KEYS.EXODUS_TRACKER, v3);
      return JSON.parse(v3);
    }

    // Legacy fallback check & auto-migration
    const legacy = localStorage.getItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER);
    if (legacy) {
      localStorage.setItem(STORAGE_KEYS.EXODUS_TRACKER, legacy);
      localStorage.removeItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER);
      return JSON.parse(legacy);
    }
    return null;
  } catch (e) {
    console.warn('Failed reading tracker data from localStorage:', e);
    return null;
  }
}

export function saveStoredTrackerData(data: any): void {
  try {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS.EXODUS_TRACKER, str);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
    }
  } catch (e) {
    console.warn('Failed saving tracker data to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// LAND CHECKLIST DOMAIN (land-checklist)
// ----------------------------------------------------------------------------
export function getStoredLandChecklist<T = Record<string, boolean>>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAND_CHECKLIST);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed reading land checklist from localStorage:', e);
    return null;
  }
}

export function saveStoredLandChecklist(data: any): void {
  try {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS.LAND_CHECKLIST, str);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
    }
  } catch (e) {
    console.warn('Failed saving land checklist to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// PANTRY STOCK DOMAIN (country-pantry-stock)
// ----------------------------------------------------------------------------
export function getStoredPantryStock<T = any[]>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PANTRY_STOCK);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed reading pantry stock from localStorage:', e);
    return null;
  }
}

export function saveStoredPantryStock(data: any): void {
  try {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS.PANTRY_STOCK, str);
  } catch (e) {
    console.warn('Failed saving pantry stock to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// SAVED SPECS DOMAIN (outpost-saved-specs)
// ----------------------------------------------------------------------------
export function getStoredSavedSpecs<T = any>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_SPECS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed reading saved specs from localStorage:', e);
    return null;
  }
}

export function saveStoredSavedSpecs(data: any): void {
  try {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS.SAVED_SPECS, str);
  } catch (e) {
    console.warn('Failed saving specs to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// MASTERED SKILLS DOMAIN (mastered-skills)
// ----------------------------------------------------------------------------
export function getStoredMasteredSkills(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MASTERED_SKILLS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed reading mastered skills from localStorage:', e);
    return [];
  }
}

export function saveStoredMasteredSkills(skillIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MASTERED_SKILLS, JSON.stringify(skillIds));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
    }
  } catch (e) {
    console.warn('Failed saving mastered skills to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// BOOKMARKED PARCELS DOMAIN (bookmarked-scout-parcels)
// ----------------------------------------------------------------------------
export function getStoredBookmarkedParcels(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_PARCELS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed reading bookmarked parcels from localStorage:', e);
    return [];
  }
}

export function saveStoredBookmarkedParcels(parcelIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_PARCELS, JSON.stringify(parcelIds));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
    }
  } catch (e) {
    console.warn('Failed saving bookmarked parcels to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// PINNED NAVIGATION ITEMS DOMAIN (outpost_pinned_items_v2)
// ----------------------------------------------------------------------------
export function getStoredPinnedItems<T = any[]>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PINNED_ITEMS);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed reading pinned items from localStorage:', e);
    return null;
  }
}

export function saveStoredPinnedItems(items: any[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PINNED_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed saving pinned items to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// SIDEBAR COLLAPSED DOMAIN (outpost_sidebar_collapsed_v1)
// ----------------------------------------------------------------------------
export function getStoredSidebarCollapsed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
    return raw ? JSON.parse(raw) : false;
  } catch (e) {
    return false;
  }
}

export function saveStoredSidebarCollapsed(isCollapsed: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, JSON.stringify(isCollapsed));
  } catch (e) {
    console.warn('Failed saving sidebar collapsed state to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// USER PROFILE DOMAIN (outpost_user)
// ----------------------------------------------------------------------------
export function getStoredUserProfile<T = any>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed reading user profile from localStorage:', e);
    return null;
  }
}

export function saveStoredUserProfile(user: any): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
  } catch (e) {
    console.warn('Failed saving user profile to localStorage:', e);
  }
}

export function removeStoredUserProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  } catch (e) {
    console.warn('Failed removing user profile from localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// MAP GEOJSON CACHE DOMAIN (malawi_district_geojson_cache_v1)
// ----------------------------------------------------------------------------
export function getStoredMapGeoJSONCache<T = any>(): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MAP_GEOJSON_CACHE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredMapGeoJSONCache(geojson: any): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MAP_GEOJSON_CACHE, JSON.stringify(geojson));
  } catch (e) {
    console.warn('Failed saving GeoJSON cache to localStorage:', e);
  }
}

// ----------------------------------------------------------------------------
// BACKUP EXPORT & RESTORE DOMAINS
// ----------------------------------------------------------------------------
export function createFullAppBackup() {
  const trackerData = getStoredTrackerData();
  const landChecklist = getStoredLandChecklist();
  const pantry = getStoredPantryStock();
  const savedSpecs = getStoredSavedSpecs();
  const user = getStoredUserProfile();
  const masteredSkills = getStoredMasteredSkills();
  const bookmarkedParcels = getStoredBookmarkedParcels();
  const bookmarks = getOfflineBookmarks();
  const fieldNotes = getOfflineFieldNotes();
  const completedSeasonalTasks = getCompletedSeasonalTasks();

  const transitionLedger = localStorage.getItem('outpost_transition_ledger');
  const transitionNotes = localStorage.getItem('outpost_transition_notes');
  const customaryLandSteps = localStorage.getItem('outpost_customary_land_steps_v1');
  const devotionalReflections = localStorage.getItem('outpost_devotional_reflections_v1');
  const suitabilityParcels = localStorage.getItem('outpost_suitability_parcels_v1');

  // Collect all individual skill step checklist states (homestead_skill_steps_*)
  const skillStepTicks: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('homestead_skill_steps_')) {
        const val = localStorage.getItem(key);
        if (val) skillStepTicks[key] = val;
      }
    }
  } catch (e) {
    console.warn('Failed reading skill step ticks for backup:', e);
  }

  return {
    user,
    tracker: trackerData ? (typeof trackerData === 'string' ? trackerData : JSON.stringify(trackerData)) : null,
    landChecklist: landChecklist ? (typeof landChecklist === 'string' ? landChecklist : JSON.stringify(landChecklist)) : null,
    pantry: pantry ? (typeof pantry === 'string' ? pantry : JSON.stringify(pantry)) : null,
    savedSpecs: savedSpecs ? (typeof savedSpecs === 'string' ? savedSpecs : JSON.stringify(savedSpecs)) : null,
    masteredSkills: masteredSkills ? JSON.stringify(masteredSkills) : null,
    bookmarkedParcels: bookmarkedParcels ? JSON.stringify(bookmarkedParcels) : null,
    bookmarks,
    fieldNotes,
    completedSeasonalTasks,
    transitionLedger,
    transitionNotes,
    customaryLandSteps,
    devotionalReflections,
    suitabilityParcels,
    skillStepTicks,
    timestamp: new Date().toISOString()
  };
}

export function restoreFullAppBackup(backupJson: any): void {
  if (!backupJson) return;

  if (backupJson.user) {
    saveStoredUserProfile(backupJson.user);
  }

  if (backupJson.tracker) {
    saveStoredTrackerData(backupJson.tracker);
  }

  if (backupJson.landChecklist) {
    saveStoredLandChecklist(backupJson.landChecklist);
  }

  if (backupJson.pantry) {
    saveStoredPantryStock(backupJson.pantry);
  }

  if (backupJson.savedSpecs) {
    saveStoredSavedSpecs(backupJson.savedSpecs);
  }

  if (backupJson.masteredSkills) {
    try {
      const parsed = typeof backupJson.masteredSkills === 'string' ? JSON.parse(backupJson.masteredSkills) : backupJson.masteredSkills;
      if (Array.isArray(parsed)) saveStoredMasteredSkills(parsed);
    } catch (e) {}
  }

  if (backupJson.bookmarkedParcels) {
    try {
      const parsed = typeof backupJson.bookmarkedParcels === 'string' ? JSON.parse(backupJson.bookmarkedParcels) : backupJson.bookmarkedParcels;
      if (Array.isArray(parsed)) saveStoredBookmarkedParcels(parsed);
    } catch (e) {}
  }

  if (backupJson.bookmarks && Array.isArray(backupJson.bookmarks)) {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(backupJson.bookmarks));
    } catch (e) {}
  }

  if (backupJson.fieldNotes && Array.isArray(backupJson.fieldNotes)) {
    try {
      localStorage.setItem(STORAGE_KEYS.FIELD_NOTES, JSON.stringify(backupJson.fieldNotes));
    } catch (e) {}
  }

  if (backupJson.completedSeasonalTasks && Array.isArray(backupJson.completedSeasonalTasks)) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_SEASONAL_TASKS, JSON.stringify(backupJson.completedSeasonalTasks));
    } catch (e) {}
  }

  if (backupJson.transitionLedger) {
    try {
      const val = typeof backupJson.transitionLedger === 'string' ? backupJson.transitionLedger : JSON.stringify(backupJson.transitionLedger);
      localStorage.setItem('outpost_transition_ledger', val);
    } catch (e) {}
  }

  if (backupJson.transitionNotes) {
    try {
      const val = typeof backupJson.transitionNotes === 'string' ? backupJson.transitionNotes : JSON.stringify(backupJson.transitionNotes);
      localStorage.setItem('outpost_transition_notes', val);
    } catch (e) {}
  }

  if (backupJson.customaryLandSteps) {
    try {
      const val = typeof backupJson.customaryLandSteps === 'string' ? backupJson.customaryLandSteps : JSON.stringify(backupJson.customaryLandSteps);
      localStorage.setItem('outpost_customary_land_steps_v1', val);
    } catch (e) {}
  }

  if (backupJson.devotionalReflections) {
    try {
      const val = typeof backupJson.devotionalReflections === 'string' ? backupJson.devotionalReflections : JSON.stringify(backupJson.devotionalReflections);
      localStorage.setItem('outpost_devotional_reflections_v1', val);
    } catch (e) {}
  }

  if (backupJson.suitabilityParcels) {
    try {
      const val = typeof backupJson.suitabilityParcels === 'string' ? backupJson.suitabilityParcels : JSON.stringify(backupJson.suitabilityParcels);
      localStorage.setItem('outpost_suitability_parcels_v1', val);
    } catch (e) {}
  }

  if (backupJson.skillStepTicks && typeof backupJson.skillStepTicks === 'object') {
    try {
      Object.entries(backupJson.skillStepTicks).forEach(([k, v]) => {
        if (typeof v === 'string') localStorage.setItem(k, v);
      });
    } catch (e) {}
  }

  // Always clean up legacy tracker keys
  try {
    localStorage.removeItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_EXODUS_TRACKER_V3);
  } catch (e) {}
}

export interface CachedPayloadEnvelope<T = any> {
  data: T;
  cachedAt: string;
}

// Initialize offline storage and pre-populate the local offline vault
export function initializeOfflineStorage() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.DISTRICTS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.DISTRICTS_CACHE, JSON.stringify(DISTRICT_LIST));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SOILS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.SOILS_CACHE, JSON.stringify(SOIL_TYPES_REGISTRY));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PITS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.PITS_CACHE, JSON.stringify(PLANTING_PIT_SPECS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EDENIC_GUIDES_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.EDENIC_GUIDES_CACHE, JSON.stringify(EDENIC_AGRICULTURE_GUIDES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKILLS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.SKILLS_CACHE, JSON.stringify(HOMESTEAD_SKILLS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SEASONS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.SEASONS_CACHE, JSON.stringify(SEASONAL_CALENDAR));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGIONS_CACHE)) {
      localStorage.setItem(STORAGE_KEYS.REGIONS_CACHE, JSON.stringify(REGIONS_LIST));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  } catch (e) {
    console.warn('LocalStorage error during offline storage init:', e);
  }
}

// Retrieve 28 districts: bundled registry + localStorage offline fallback
export function getCachedDistricts(): DistrictRegistryRecord[] {
  try {
    if (DISTRICT_LIST && DISTRICT_LIST.length > 0) return DISTRICT_LIST;
    const raw = localStorage.getItem(STORAGE_KEYS.DISTRICTS_CACHE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return DISTRICT_LIST;
  }
}

// Retrieve FAO HWSD v2.0 Soil Orders
export function getCachedSoilTypes(): MalawiSoilTypeSpec[] {
  try {
    if (SOIL_TYPES_REGISTRY && SOIL_TYPES_REGISTRY.length > 0) return SOIL_TYPES_REGISTRY;
    const raw = localStorage.getItem(STORAGE_KEYS.SOILS_CACHE);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return SOIL_TYPES_REGISTRY;
  }
}

// Retrieve Planting Pit Specifications
export function getCachedPlantingPits(): Record<string, PlantingPitSpec> {
  try {
    if (PLANTING_PIT_SPECS && Object.keys(PLANTING_PIT_SPECS).length > 0) return PLANTING_PIT_SPECS;
    const raw = localStorage.getItem(STORAGE_KEYS.PITS_CACHE);
    return raw ? JSON.parse(raw) : PLANTING_PIT_SPECS;
  } catch {
    return PLANTING_PIT_SPECS;
  }
}

// Save & Retrieve Cached Regional Weather Forecasts (for Offline PWA Mode)
export function saveCachedWeather(regionId: string, payload: any): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEATHER_LIVE_CACHE);
    const map: Record<string, CachedPayloadEnvelope> = raw ? JSON.parse(raw) : {};
    map[regionId] = {
      data: payload,
      cachedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.WEATHER_LIVE_CACHE, JSON.stringify(map));
  } catch (e) {
    console.warn('Failed caching weather payload:', e);
  }
}

export function getCachedWeather(regionId: string): CachedPayloadEnvelope | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEATHER_LIVE_CACHE);
    if (!raw) return null;
    const map: Record<string, CachedPayloadEnvelope> = JSON.parse(raw);
    return map[regionId] || null;
  } catch {
    return null;
  }
}

// Save & Retrieve Cached District Satellite & Soil Telemetry (for Offline PWA Mode)
export function saveCachedDistrictTelemetry(districtId: string, payload: any): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TELEMETRY_LIVE_CACHE);
    const map: Record<string, CachedPayloadEnvelope> = raw ? JSON.parse(raw) : {};
    map[districtId] = {
      data: payload,
      cachedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.TELEMETRY_LIVE_CACHE, JSON.stringify(map));
  } catch (e) {
    console.warn('Failed caching district telemetry payload:', e);
  }
}

export function getCachedDistrictTelemetry(districtId: string): CachedPayloadEnvelope | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TELEMETRY_LIVE_CACHE);
    if (!raw) return null;
    const map: Record<string, CachedPayloadEnvelope> = JSON.parse(raw);
    return map[districtId] || null;
  } catch {
    return null;
  }
}

// Retrieve skills: bundled fresh data is the authoritative source of truth
export function getCachedSkills(): SkillItem[] {
  return HOMESTEAD_SKILLS;
}

// Retrieve seasonal guide: bundled fresh data is authoritative
export function getCachedSeasons(): SeasonalTask[] {
  return SEASONAL_CALENDAR;
}

// Retrieve regions: bundled fresh data is authoritative
export function getCachedRegions(): RegionData[] {
  return REGIONS_LIST;
}

// Bookmarks management
export function getOfflineBookmarks(): OfflineBookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleOfflineBookmark(item: { id: string; type: 'skill' | 'season' | 'region'; title: string }): boolean {
  try {
    const bookmarks = getOfflineBookmarks();
    const existingIndex = bookmarks.findIndex(b => b.id === item.id && b.type === item.type);
    
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return false; // removed
    } else {
      bookmarks.push({
        id: item.id,
        type: item.type,
        title: item.title,
        savedAt: new Date().toLocaleDateString()
      });
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return true; // added
    }
  } catch (e) {
    return false;
  }
}

export function isItemBookmarked(id: string, type: 'skill' | 'season' | 'region'): boolean {
  const bookmarks = getOfflineBookmarks();
  return bookmarks.some(b => b.id === id && b.type === type);
}

// Offline Field Notes management
export function getOfflineFieldNotes(guideId?: string): OfflineFieldNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FIELD_NOTES);
    const allNotes: OfflineFieldNote[] = raw ? JSON.parse(raw) : [];
    if (guideId) {
      return allNotes.filter(n => n.guideId === guideId);
    }
    return allNotes;
  } catch (e) {
    return [];
  }
}

export function saveOfflineFieldNote(guideId: string, title: string, content: string): OfflineFieldNote {
  const allNotes = getOfflineFieldNotes();
  const newNote: OfflineFieldNote = {
    id: 'note_' + Date.now(),
    guideId,
    title,
    content,
    createdAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  };
  allNotes.unshift(newNote);
  try {
    localStorage.setItem(STORAGE_KEYS.FIELD_NOTES, JSON.stringify(allNotes));
  } catch (e) {
    console.warn('Failed saving offline note:', e);
  }
  return newNote;
}

export function deleteOfflineFieldNote(noteId: string) {
  const allNotes = getOfflineFieldNotes();
  const filtered = allNotes.filter(n => n.id !== noteId);
  try {
    localStorage.setItem(STORAGE_KEYS.FIELD_NOTES, JSON.stringify(filtered));
  } catch (e) {
    console.warn('Failed deleting note:', e);
  }
}

// Get cache sync status info
export function getOfflineSyncStatus() {
  const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || new Date().toISOString();
  const skillsCount = getCachedSkills().length;
  const seasonsCount = getCachedSeasons().length;
  const regionsCount = getCachedRegions().length;
  const districtsCount = getCachedDistricts().length;
  const soilsCount = getCachedSoilTypes().length;
  const pitsCount = Object.keys(getCachedPlantingPits()).length;
  const bookmarksCount = getOfflineBookmarks().length;
  const notesCount = getOfflineFieldNotes().length;

  let weatherCachedCount = 0;
  let telemetryCachedCount = 0;
  try {
    const rawW = localStorage.getItem(STORAGE_KEYS.WEATHER_LIVE_CACHE);
    if (rawW) weatherCachedCount = Object.keys(JSON.parse(rawW)).length;
    const rawT = localStorage.getItem(STORAGE_KEYS.TELEMETRY_LIVE_CACHE);
    if (rawT) telemetryCachedCount = Object.keys(JSON.parse(rawT)).length;
  } catch {}

  return {
    lastSyncFormatted: new Date(lastSync).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
    skillsCount,
    seasonsCount,
    regionsCount,
    districtsCount,
    soilsCount,
    pitsCount,
    weatherCachedCount,
    telemetryCachedCount,
    bookmarksCount,
    notesCount
  };
}

// ----------------------------------------------------------------------------
// COMPLETED SEASONAL ACTION TASKS DOMAIN
// ----------------------------------------------------------------------------
export function getCompletedSeasonalTasks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_SEASONAL_TASKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function isSeasonalTaskCompleted(taskId: string): boolean {
  const completed = getCompletedSeasonalTasks();
  return completed.includes(taskId);
}

export function toggleCompletedSeasonalTask(taskId: string): { completed: boolean; completedList: string[] } {
  const current = getCompletedSeasonalTasks();
  const exists = current.includes(taskId);
  const updated = exists ? current.filter(id => id !== taskId) : [...current, taskId];
  
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_SEASONAL_TASKS, JSON.stringify(updated));
    // Dispatch custom event for cross-module reactivity
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:readiness-updated', { detail: { taskId, completed: !exists } }));
      window.dispatchEvent(new CustomEvent('outpost:progress-updated'));
    }
  } catch (e) {
    console.warn('Failed saving completed seasonal tasks:', e);
  }
  return { completed: !exists, completedList: updated };
}

export interface ReadinessScoreResult {
  totalScorePct: number;
  levelLabel: string;
  badgeColor: string;
  completedMilestones: number;
  totalMilestones: number;
  breakdown: {
    exodusScorePct: number;
    skillsMasteryPct: number;
    seasonalActionPct: number;
    landReadinessPct: number;
  };
  totalPoints: number;
  maxPoints: number;
}

export function calculateHomesteadReadinessScore(): ReadinessScoreResult {
  // 1. Exodus Steps & 15-Milestone Transition Ledger
  const trackerData = getStoredTrackerData<any[]>() || [];
  let totalSubtasks = 0;
  let completedSubtasks = 0;
  if (Array.isArray(trackerData) && trackerData.length > 0) {
    trackerData.forEach(step => {
      if (step?.subtasks && Array.isArray(step.subtasks)) {
        totalSubtasks += step.subtasks.length;
        completedSubtasks += step.subtasks.filter((s: any) => s.completed).length;
      }
    });
  }

  // Also check the 15-milestone transition ledger (outpost_transition_ledger)
  let ledgerCompleted = 0;
  const ledgerTotal = 15;
  try {
    const rawLedger = localStorage.getItem('outpost_transition_ledger');
    if (rawLedger) {
      const parsedLedger = JSON.parse(rawLedger);
      if (parsedLedger && typeof parsedLedger === 'object') {
        ledgerCompleted = Object.values(parsedLedger).filter((v) => v === true).length;
      }
    }
  } catch {}

  const effectiveCompleted = totalSubtasks > 0 ? completedSubtasks : ledgerCompleted;
  const effectiveTotal = totalSubtasks > 0 ? totalSubtasks : ledgerTotal;
  const exodusScorePct = effectiveTotal > 0 ? Math.min(100, Math.round((effectiveCompleted / effectiveTotal) * 100)) : 0;

  // 2. Mastered Skills
  const masteredSkills = getStoredMasteredSkills() || [];
  const allSkills = getCachedSkills();
  const skillsMasteryPct = allSkills.length > 0 ? Math.min(100, Math.round((masteredSkills.length / allSkills.length) * 100)) : 0;

  // 3. Completed Seasonal Tasks
  const completedSeasonal = getCompletedSeasonalTasks();
  const seasonalActionPct = Math.min(100, Math.round((completedSeasonal.length / 6) * 100));

  // 4. Land Checklist, Customary Land Act Steps & Bookmarked Parcels
  const landChecklist = getStoredLandChecklist<any>() || {};
  const checkedCount = Array.isArray(landChecklist?.completedIds)
    ? landChecklist.completedIds.length
    : Object.values(landChecklist).filter((v) => v === true).length;
  let customaryStepsCount = 0;
  try {
    const rawCustomary = localStorage.getItem('outpost_customary_land_steps_v1');
    if (rawCustomary) {
      const parsedCustomary = JSON.parse(rawCustomary);
      if (Array.isArray(parsedCustomary)) customaryStepsCount = parsedCustomary.length;
    }
  } catch {}
  const bookmarkedParcels = getStoredBookmarkedParcels() || [];
  const landReadinessPct = Math.min(100, Math.round((checkedCount * 5) + (customaryStepsCount * 10) + (bookmarkedParcels.length > 0 ? 30 : 0)));

  // Weighted Total Score:
  // Exodus: 35%, Skills: 25%, Seasonal Actions: 25%, Land: 15%
  const totalScorePct = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (exodusScorePct * 0.35) +
        (skillsMasteryPct * 0.25) +
        (seasonalActionPct * 0.25) +
        (landReadinessPct * 0.15)
      )
    )
  );

  let levelLabel = 'Sanctuary Pioneer (Initiation)';
  let badgeColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';

  if (totalScorePct >= 80) {
    levelLabel = 'Autonomous Edenic Steward (Mastery)';
    badgeColor = 'text-emerald-300 border-emerald-400/50 bg-emerald-500/20';
  } else if (totalScorePct >= 55) {
    levelLabel = 'Established Homestead Builder (Operational)';
    badgeColor = 'text-sky-300 border-sky-400/50 bg-sky-500/20';
  } else if (totalScorePct >= 30) {
    levelLabel = 'Active Ground Scout (Preparation)';
    badgeColor = 'text-amber-300 border-amber-400/50 bg-amber-500/20';
  }

  return {
    totalScorePct,
    levelLabel,
    badgeColor,
    completedMilestones: effectiveCompleted,
    totalMilestones: effectiveTotal,
    breakdown: {
      exodusScorePct,
      skillsMasteryPct,
      seasonalActionPct,
      landReadinessPct
    },
    totalPoints: (effectiveCompleted * 10) + (masteredSkills.length * 25) + (completedSeasonal.length * 15) + (checkedCount * 5),
    maxPoints: (effectiveTotal * 10 || 150) + (allSkills.length * 25) + (10 * 15) + (20 * 5)
  };
}

// Force re-sync cached storage with default guide, 28-district, soil, and planting pit data
export function forceSyncOfflineCache() {
  try {
    localStorage.setItem(STORAGE_KEYS.DISTRICTS_CACHE, JSON.stringify(DISTRICT_LIST));
    localStorage.setItem(STORAGE_KEYS.SOILS_CACHE, JSON.stringify(SOIL_TYPES_REGISTRY));
    localStorage.setItem(STORAGE_KEYS.PITS_CACHE, JSON.stringify(PLANTING_PIT_SPECS));
    localStorage.setItem(STORAGE_KEYS.EDENIC_GUIDES_CACHE, JSON.stringify(EDENIC_AGRICULTURE_GUIDES));
    localStorage.setItem(STORAGE_KEYS.SKILLS_CACHE, JSON.stringify(HOMESTEAD_SKILLS));
    localStorage.setItem(STORAGE_KEYS.SEASONS_CACHE, JSON.stringify(SEASONAL_CALENDAR));
    localStorage.setItem(STORAGE_KEYS.REGIONS_CACHE, JSON.stringify(REGIONS_LIST));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:offline-vault-synced'));
    }
  } catch (e) {
    console.warn('Failed syncing offline vault:', e);
  }
  return getOfflineSyncStatus();
}
