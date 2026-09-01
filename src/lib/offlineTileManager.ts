// Offline Tile Caching & Field Mode Manager for Outpost Malawi
// Interacts with browser CacheStorage API to store and retrieve map tiles and GIS assets offline

const TILE_CACHE_NAME = 'outpost-malawi-tiles-v1';
const FORCE_OFFLINE_KEY = 'outpost_force_offline_mode';

export interface TileCacheStats {
  isSupported: boolean;
  cachedTileCount: number;
  estimatedSizeMb: number;
  lastCachedAt: string | null;
}

export function isForceOfflineActive(): boolean {
  try {
    return localStorage.getItem(FORCE_OFFLINE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setForceOfflineActive(active: boolean): void {
  try {
    localStorage.setItem(FORCE_OFFLINE_KEY, active ? 'true' : 'false');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('outpost:offline-mode-changed', { detail: { isOffline: active } }));
    }
  } catch (e) {
    console.warn('Failed setting force offline mode:', e);
  }
}

/**
 * Checks if CacheStorage is supported in this browser environment
 */
export function isCacheStorageAvailable(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

/**
 * Calculates current cached tiles count and size
 */
export async function getTileCacheStats(): Promise<TileCacheStats> {
  if (!isCacheStorageAvailable()) {
    return { isSupported: false, cachedTileCount: 0, estimatedSizeMb: 0, lastCachedAt: null };
  }

  try {
    const cache = await caches.open(TILE_CACHE_NAME);
    const keys = await cache.keys();
    const count = keys.length;
    // Estimate ~25KB per tile average
    const estimatedSizeMb = Number(((count * 25) / 1024).toFixed(2));
    const lastCachedAt = localStorage.getItem('outpost_tiles_last_cached');

    return {
      isSupported: true,
      cachedTileCount: count,
      estimatedSizeMb,
      lastCachedAt
    };
  } catch (e) {
    console.warn('Failed querying tile cache stats:', e);
    return { isSupported: true, cachedTileCount: 0, estimatedSizeMb: 0, lastCachedAt: null };
  }
}

/**
 * Pre-caches tiles for a given bounding box at standard scouting zoom levels (zoom 8-12)
 */
export async function precacheRegionTiles(
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  tileUrlTemplate: string = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  onProgress?: (progressPct: number, currentTile: number, totalTiles: number) => void
): Promise<{ success: boolean; cachedCount: number; errors: number }> {
  if (!isCacheStorageAvailable()) {
    return { success: false, cachedCount: 0, errors: 0 };
  }

  try {
    const cache = await caches.open(TILE_CACHE_NAME);
    const zooms = [8, 9, 10, 11];
    const tileCoords: { z: number; x: number; y: number }[] = [];

    // Helper: lat/lng to tile coordinate
    const latLngToTile = (lat: number, lng: number, zoom: number) => {
      const n = Math.pow(2, zoom);
      const x = Math.floor(((lng + 180) / 360) * n);
      const latRad = (lat * Math.PI) / 180;
      const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
      return { x, y };
    };

    zooms.forEach(z => {
      const minTile = latLngToTile(bounds.maxLat, bounds.minLng, z);
      const maxTile = latLngToTile(bounds.minLat, bounds.maxLng, z);

      const minX = Math.min(minTile.x, maxTile.x);
      const maxX = Math.max(minTile.x, maxTile.x);
      const minY = Math.min(minTile.y, maxTile.y);
      const maxY = Math.max(minTile.y, maxTile.y);

      // Limit max tile batch to prevent overwhelming network
      const countX = Math.min(maxX - minX + 1, 15);
      const countY = Math.min(maxY - minY + 1, 15);

      for (let x = minX; x < minX + countX; x++) {
        for (let y = minY; y < minY + countY; y++) {
          tileCoords.push({ z, x, y });
        }
      }
    });

    const total = tileCoords.length;
    let completed = 0;
    let errors = 0;

    // Fetch and store in batches of 4
    for (let i = 0; i < tileCoords.length; i += 4) {
      const batch = tileCoords.slice(i, i + 4);
      await Promise.all(
        batch.map(async ({ z, x, y }) => {
          const url = tileUrlTemplate
            .replace('{z}', z.toString())
            .replace('{y}', y.toString())
            .replace('{x}', x.toString())
            .replace('{s}', 'a');

          try {
            const resp = await fetch(url, { mode: 'cors' });
            if (resp.ok) {
              await cache.put(url, resp);
            } else {
              errors++;
            }
          } catch {
            errors++;
          } finally {
            completed++;
            if (onProgress) {
              const pct = Math.round((completed / total) * 100);
              onProgress(pct, completed, total);
            }
          }
        })
      );
    }

    localStorage.setItem('outpost_tiles_last_cached', new Date().toISOString());
    return { success: true, cachedCount: completed - errors, errors };
  } catch (e) {
    console.error('Failed precaching region tiles:', e);
    return { success: false, cachedCount: 0, errors: 1 };
  }
}

/**
 * Clears the offline tile cache
 */
export async function clearTileCache(): Promise<boolean> {
  if (!isCacheStorageAvailable()) return false;
  try {
    await caches.delete(TILE_CACHE_NAME);
    localStorage.removeItem('outpost_tiles_last_cached');
    return true;
  } catch (e) {
    console.warn('Failed clearing tile cache:', e);
    return false;
  }
}
