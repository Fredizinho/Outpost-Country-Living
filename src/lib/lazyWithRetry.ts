import { lazy, ComponentType } from 'react';

/**
 * Robust lazy wrapper that retries chunk loading if a dynamic import fails
 * due to network hiccups or Vite asset hash changes after deployment.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  retriesLeft = 2,
  interval = 1000
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (retriesLeft <= 0) {
        // If out of retries in this session, check if we haven't force-refreshed yet
        const key = 'vite_chunk_retry_refreshed';
        const hasRefreshed = sessionStorage.getItem(key);
        if (!hasRefreshed) {
          sessionStorage.setItem(key, 'true');
          window.location.reload();
          return new Promise<{ default: T }>(() => {});
        }
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
      return factory();
    }
  });
}
