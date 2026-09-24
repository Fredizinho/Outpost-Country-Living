import { HOMESTEAD_SKILLS, SEASONAL_CALENDAR, REGIONS_LIST, SkillItem, SeasonalTask, RegionData } from '@/data/skillsAndSeasons';

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
  SKILLS_CACHE: 'outpost_skills_cache_v4',
  SEASONS_CACHE: 'outpost_seasons_cache_v4',
  REGIONS_CACHE: 'outpost_regions_cache_v4',
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

// Initialize offline storage
export function initializeOfflineStorage() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  } catch (e) {
    console.warn('LocalStorage error during offline storage init:', e);
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
  const bookmarksCount = getOfflineBookmarks().length;
  const notesCount = getOfflineFieldNotes().length;

  return {
    lastSyncFormatted: new Date(lastSync).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
    skillsCount,
    seasonsCount,
    regionsCount,
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
  // 1. Exodus Steps
  const trackerData = getStoredTrackerData<any[]>() || [];
  let totalSubtasks = 0;
  let completedSubtasks = 0;
  if (Array.isArray(trackerData)) {
    trackerData.forEach(step => {
      if (step?.subtasks && Array.isArray(step.subtasks)) {
        totalSubtasks += step.subtasks.length;
        completedSubtasks += step.subtasks.filter((s: any) => s.completed).length;
      }
    });
  }
  const exodusScorePct = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // 2. Mastered Skills
  const masteredSkills = getStoredMasteredSkills() || [];
  const allSkills = getCachedSkills();
  const skillsMasteryPct = allSkills.length > 0 ? Math.min(100, Math.round((masteredSkills.length / allSkills.length) * 100)) : 0;

  // 3. Completed Seasonal Tasks
  const completedSeasonal = getCompletedSeasonalTasks();
  // Assume a benchmark of 8 active seasonal tasks per quarter
  const seasonalActionPct = Math.min(100, Math.round((completedSeasonal.length / 6) * 100));

  // 4. Land Checklist & Bookmarked Parcels
  const landChecklist = getStoredLandChecklist() || {};
  const checkedCount = Object.values(landChecklist).filter(Boolean).length;
  const bookmarkedParcels = getStoredBookmarkedParcels() || [];
  const landReadinessPct = Math.min(100, Math.round(((checkedCount * 5) + (bookmarkedParcels.length > 0 ? 30 : 0))));

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
    breakdown: {
      exodusScorePct,
      skillsMasteryPct,
      seasonalActionPct,
      landReadinessPct
    },
    totalPoints: (completedSubtasks * 10) + (masteredSkills.length * 25) + (completedSeasonal.length * 15) + (checkedCount * 5),
    maxPoints: (totalSubtasks * 10 || 200) + (allSkills.length * 25) + (10 * 15) + (20 * 5)
  };
}

// Force re-sync cached storage with default guide data
export function forceSyncOfflineCache() {
  localStorage.setItem(STORAGE_KEYS.SKILLS_CACHE, JSON.stringify(HOMESTEAD_SKILLS));
  localStorage.setItem(STORAGE_KEYS.SEASONS_CACHE, JSON.stringify(SEASONAL_CALENDAR));
  localStorage.setItem(STORAGE_KEYS.REGIONS_CACHE, JSON.stringify(REGIONS_LIST));
  localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  return getOfflineSyncStatus();
}
