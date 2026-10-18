import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Skeleton, SkeletonCard, SkeletonText } from '@/components/ui/Skeleton';
import { fadeUp } from '@/lib/motion';
import { Shell } from './components/layout/Shell';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { lazyWithRetry } from './lib/lazyWithRetry';
import { scheduleDesktopIdleRoutePrefetch } from './lib/routePrefetch';
import { DesktopLaunchSplash } from './components/common/DesktopLaunchSplash';
import Home from './pages/Home';
import ScoutMapPage from './pages/ScoutMapPage';

// Lazy-loaded routes with auto-retry and chunk fault tolerance
const Vision = lazyWithRetry(() => import('./pages/Vision'));
const Where = lazyWithRetry(() => import('./pages/Where'));
const What = lazyWithRetry(() => import('./pages/What'));
const How = lazyWithRetry(() => import('./pages/How'));
const Tracker = lazyWithRetry(() => import('./pages/Tracker'));
const Account = lazyWithRetry(() => import('./pages/Account'));
const RegionDetail = lazyWithRetry(() => import('./pages/RegionDetail'));
const SeasonalGuide = lazyWithRetry(() => import('./pages/SeasonalGuide'));
const Skills = lazyWithRetry(() => import('./pages/Skills'));
const SkillDetail = lazyWithRetry(() => import('./pages/SkillDetail'));
const Calculators = lazyWithRetry(() => import('./pages/Calculators'));
const Blueprints = lazyWithRetry(() => import('./pages/Blueprints'));
const Community = lazyWithRetry(() => import('./pages/Community'));
const Devotional = lazyWithRetry(() => import('./pages/Devotional'));
const Agriculture = lazyWithRetry(() => import('./pages/Agriculture'));
const DevPalette = lazyWithRetry(() => import('./pages/DevPalette'));
const SettingsPage = lazyWithRetry(() => import('./pages/SettingsPage'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col gap-6 animate-pulse">
      <div className="rounded-card bg-surface-raised border border-border p-6 flex flex-col justify-between gap-4">
        <Skeleton className="h-6 w-52 rounded-control bg-stone-300/40 dark:bg-stone-800/60" />
        <SkeletonText lines={2} className="max-w-xl" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-9 w-36 rounded-control bg-amber-500/20" />
          <Skeleton className="h-9 w-28 rounded-control bg-stone-300/40 dark:bg-stone-800/60" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCard className="h-44" />
        <SkeletonCard className="h-44" />
        <SkeletonCard className="h-44" />
      </div>
    </div>
  );
}

function AnimatedAppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [splashDone, setSplashDone] = useState(false);

  // Restore previous session's last active tab on initial launch (if at root)
  useEffect(() => {
    try {
      const savedRoute = localStorage.getItem('outpost_desktop_last_active_route_v1');
      if (savedRoute && savedRoute !== '/' && location.pathname === '/') {
        navigate(savedRoute, { replace: true });
      }
    } catch {}
  }, []);

  // Track and save active tab route for subsequent session restoration
  useEffect(() => {
    try {
      if (location.pathname) {
        localStorage.setItem(
          'outpost_desktop_last_active_route_v1',
          `${location.pathname}${location.search}`
        );
      }
    } catch {}
  }, [location.pathname, location.search]);

  useEffect(() => {
    const desktopBridge = (
      window as unknown as {
        outpostDesktop?: { onNavigate?: (cb: (route: string) => void) => () => void };
      }
    ).outpostDesktop;
    if (desktopBridge?.onNavigate) {
      return desktopBridge.onNavigate((routePath) => {
        navigate(routePath);
      });
    }
  }, [navigate]);

  useEffect(() => {
    scheduleDesktopIdleRoutePrefetch();
  }, []);

  // Smooth scroll restoration on route or hash navigation
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      const scrollContainer = document.getElementById('outpost-scroll-Viewport');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      {!splashDone && (
        <DesktopLaunchSplash onReady={() => setSplashDone(true)} />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-full"
        >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/where" element={<Where />} />
          <Route path="/what" element={<What />} />
          <Route path="/how" element={<How />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Account />} />
          <Route path="/signin" element={<Account />} />

          {/* Secondary route aliases */}
          <Route path="/regions" element={<ScoutMapPage />} />
          <Route path="/scout" element={<ScoutMapPage />} />
          <Route path="/scout-map" element={<ScoutMapPage />} />
          <Route path="/map" element={<ScoutMapPage />} />
          <Route path="/regions/:id" element={<RegionDetail />} />
          <Route path="/seasons" element={<SeasonalGuide />} />
          <Route path="/almanac" element={<SeasonalGuide />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skills/:id" element={<SkillDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/suitability" element={<Where />} />
          <Route path="/property-evaluator" element={<Where />} />
          <Route path="/blueprints" element={<Blueprints />} />
          <Route path="/sanitarium" element={<Blueprints />} />
          <Route path="/kitchen" element={<What />} />
          <Route path="/community" element={<Community />} />
          <Route path="/directory" element={<Community />} />
          <Route path="/devotional" element={<Devotional />} />
          <Route path="/devotionals" element={<Devotional />} />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/edenic-farming" element={<Agriculture />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/preferences" element={<SettingsPage />} />
          <Route path="/dev/palette" element={<DevPalette />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <MotionConfig reducedMotion="user">
            <Router>
              <Shell>
                <Suspense fallback={<PageFallback />}>
                  <AnimatedAppRoutes />
                </Suspense>
              </Shell>
            </Router>
          </MotionConfig>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}



