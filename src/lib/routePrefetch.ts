/**
 * Desktop & SPA Zero-Latency Route Chunk Prefetcher
 * Preloads route modules on hover/focus and during browser idle time so switching
 * tabs in the Desktop App or Web App is instantaneous with zero spinner flash.
 */

const prefetchedPaths = new Set<string>();

const ROUTE_IMPORTERS: Record<string, () => Promise<unknown>> = {
  '/vision': () => import('../pages/Vision'),
  '/where': () => import('../pages/Where'),
  '/what': () => import('../pages/What'),
  '/how': () => import('../pages/How'),
  '/tracker': () => import('../pages/Tracker'),
  '/account': () => import('../pages/Account'),
  '/regions': () => import('../pages/RegionalMap'),
  '/scout-map': () => import('../pages/ScoutMapPage'),
  '/map': () => import('../pages/ScoutMapPage'),
  '/seasons': () => import('../pages/SeasonalGuide'),
  '/almanac': () => import('../pages/SeasonalGuide'),
  '/skills': () => import('../pages/Skills'),
  '/calculators': () => import('../pages/Calculators'),
  '/suitability': () => import('../pages/PropertyEvaluator'),
  '/property-evaluator': () => import('../pages/PropertyEvaluator'),
  '/blueprints': () => import('../pages/Blueprints'),
  '/community': () => import('../pages/Community'),
  '/directory': () => import('../pages/Community'),
  '/devotional': () => import('../pages/Devotional'),
  '/devotionals': () => import('../pages/Devotional'),
  '/agriculture': () => import('../pages/Agriculture'),
  '/edenic-farming': () => import('../pages/Agriculture'),
};

export function prefetchRoute(rawPath: string): void {
  if (!rawPath) return;
  const basePath = rawPath.split('?')[0].split('#')[0];
  if (!basePath || basePath === '/' || prefetchedPaths.has(basePath)) return;

  const importer = ROUTE_IMPORTERS[basePath];
  if (importer) {
    prefetchedPaths.add(basePath);
    importer().catch(() => {
      prefetchedPaths.delete(basePath);
    });
  }
}

let idlePreloadScheduled = false;

/**
 * Automatically preloads primary desktop navigation routes during idle frames
 * after initial paint so subsequent clicks require 0ms network/bundle wait.
 */
export function scheduleDesktopIdleRoutePrefetch(): void {
  if (idlePreloadScheduled || typeof window === 'undefined') return;
  idlePreloadScheduled = true;

  const primaryDesktopRoutes = [
    '/where',
    '/scout-map',
    '/what',
    '/how',
    '/calculators',
    '/tracker',
    '/skills',
    '/seasons',
    '/vision',
    '/devotional',
    '/blueprints',
    '/community',
  ];

  const runPrefetch = () => {
    primaryDesktopRoutes.forEach((route, idx) => {
      setTimeout(() => {
        prefetchRoute(route);
      }, idx * 120);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
      runPrefetch
    );
  } else {
    setTimeout(runPrefetch, 900);
  }
}
