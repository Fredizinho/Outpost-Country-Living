import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Shell } from './components/layout/Shell';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { lazyWithRetry } from './lib/lazyWithRetry';
import Home from './pages/Home';

// Lazy-loaded routes with auto-retry and chunk fault tolerance
const Vision = lazyWithRetry(() => import('./pages/Vision'));
const Where = lazyWithRetry(() => import('./pages/Where'));
const What = lazyWithRetry(() => import('./pages/What'));
const How = lazyWithRetry(() => import('./pages/How'));
const Tracker = lazyWithRetry(() => import('./pages/Tracker'));
const Account = lazyWithRetry(() => import('./pages/Account'));
const RegionalMap = lazyWithRetry(() => import('./pages/RegionalMap'));
const RegionDetail = lazyWithRetry(() => import('./pages/RegionDetail'));
const SeasonalGuide = lazyWithRetry(() => import('./pages/SeasonalGuide'));
const Skills = lazyWithRetry(() => import('./pages/Skills'));
const SkillDetail = lazyWithRetry(() => import('./pages/SkillDetail'));
const Calculators = lazyWithRetry(() => import('./pages/Calculators'));
const ScoutMapPage = lazyWithRetry(() => import('./pages/ScoutMapPage'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 p-8 text-center text-emerald-950">
      <div className="w-10 h-10 border-4 border-emerald-900 border-t-amber-500 rounded-full animate-spin" />
      <span className="text-xs font-black uppercase tracking-widest text-emerald-900">
        Loading Sanctuary View...
      </span>
    </div>
  );
}

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Secondary route aliases */}
          <Route path="/regions" element={<RegionalMap />} />
          <Route path="/scout-map" element={<ScoutMapPage />} />
          <Route path="/regions/:id" element={<RegionDetail />} />
          <Route path="/seasons" element={<SeasonalGuide />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skills/:id" element={<SkillDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Shell>
            <Suspense fallback={<PageFallback />}>
              <AnimatedAppRoutes />
            </Suspense>
          </Shell>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}



