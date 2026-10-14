import { lazy, ComponentType } from 'react';

/**
 * Robust lazy wrapper that retries chunk loading if a dynamic import fails
 * due to network hiccups, Vite asset hash updates, or dev server restarts.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  maxRetries = 3,
  interval = 800
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const module = await factory();
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('vite_chunk_retry_refreshed');
        }
        return module;
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, interval * Math.pow(1.4, attempt)));
        }
      }
    }

    if (typeof window !== 'undefined') {
      const key = 'vite_chunk_retry_refreshed';
      const hasRefreshed = sessionStorage.getItem(key);
      if (!hasRefreshed) {
        sessionStorage.setItem(key, 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
    }

    throw lastError;
  });
}

