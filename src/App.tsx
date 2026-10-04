import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Shell } from './components/layout/Shell';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { lazyWithRetry } from './lib/lazyWithRetry';
import { scheduleDesktopIdleRoutePrefetch } from './lib/routePrefetch';
import Home from './pages/Home';

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
const ScoutMapPage = lazyWithRetry(() => import('./pages/ScoutMapPage'));
const Blueprints = lazyWithRetry(() => import('./pages/Blueprints'));
const Community = lazyWithRetry(() => import('./pages/Community'));
const Devotional = lazyWithRetry(() => import('./pages/Devotional'));
const Agriculture = lazyWithRetry(() => import('./pages/Agriculture'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 p-8 text-center text-emerald-950 dark:text-emerald-200">
      <div className="w-10 h-10 border-4 border-emerald-900 dark:border-emerald-400 border-t-amber-500 rounded-full animate-spin" />
      <span className="text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-300">
        Loading Sanctuary View...
      </span>
    </div>
  );
}

function AnimatedAppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.11, ease: 'easeOut' }}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Shell>
              <Suspense fallback={<PageFallback />}>
                <AnimatedAppRoutes />
              </Suspense>
            </Shell>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}



