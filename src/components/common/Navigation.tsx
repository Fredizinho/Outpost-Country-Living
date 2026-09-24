import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calculator, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  User as UserIcon, 
  Sun, 
  Moon,
  BookOpen, 
  Search,
  ChevronDown,
  LogOut,
  Sprout
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { OutpostLogo } from './OutpostLogo';

export interface NavigationProps {
  onOpenCitations?: () => void;
  onOpenSearch?: () => void;
  onOpenAdvisor?: () => void;
}

export function Navigation({
  onOpenCitations,
  onOpenSearch,
  onOpenAdvisor
}: NavigationProps) {
  const { user, isFirebaseAuthenticated, signInWithGoogle, signOut } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleHeaderSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  // Sync header button state with the converged Left Directory
  useEffect(() => {
    const handleDirectoryState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (typeof customEvent.detail?.isOpen === 'boolean') {
        setIsDrawerOpen(customEvent.detail.isOpen);
      }
    };
    window.addEventListener('outpost:directory-state-changed', handleDirectoryState);
    return () => {
      window.removeEventListener('outpost:directory-state-changed', handleDirectoryState);
    };
  }, []);

  const handleToggleDirectory = () => {
    window.dispatchEvent(new CustomEvent('outpost:toggle-left-directory'));
  };

  // Close user menu on route navigation
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isUserMenuOpen]);

  // Streamlined, high-clarity primary navigation tabs
  const primaryPills = [
    { label: 'Land & Districts', path: '/where', icon: MapPin },
    { label: 'GPS Scout Map', path: '/scout-map', icon: Compass, isHighlighted: true },
    { label: 'Crops & Soil', path: '/what', icon: Sprout },
    { label: 'Homestead Guide', path: '/how', icon: BookOpen },
    { label: 'Calculators & Tools', path: '/calculators', icon: Calculator },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. PERMANENT FIXED MODERN TOP HEADER BAR                                  */}
      {/* ========================================================================= */}
      <header 
        id="outpost-main-header"
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0B2517]/95 backdrop-blur-xl border-b border-[#14422A] px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-md select-none"
        aria-label="Primary Sanctuary Navigation"
      >
        {/* LEFT SIDE: LOGO MARK */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link 
            to="/" 
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
            title="OUTPOST: COUNTRY LIVING • Malawi Blueprint"
          >
            <OutpostLogo size="md" variant="header" />
          </Link>
        </div>

        {/* CENTER: QUICK-JUMP PILL TABS */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-[#06180E]/80 backdrop-blur-md rounded-xl border border-emerald-900/60">
          {primaryPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = location.pathname === pill.path || 
              (pill.path !== '/' && location.pathname.startsWith(pill.path));

            return (
              <NavLink
                key={pill.path}
                to={pill.path}
                className={cn(
                  "relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-sans font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "bg-emerald-800/90 text-amber-200 border border-amber-400/40 shadow-xs font-bold"
                    : pill.isHighlighted
                      ? "text-amber-200 hover:text-white bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30"
                      : "text-emerald-100/90 hover:text-white hover:bg-white/10 border border-transparent"
                )}
              >
                <Icon 
                  size={15} 
                  className={cn(
                    "transition-colors", 
                    isActive ? "text-amber-300" : pill.isHighlighted ? "text-amber-300" : "text-emerald-300/90 group-hover:text-emerald-100"
                  )} 
                />
                <span>{pill.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT SIDE: SEARCH, THEME TOGGLE, AI ADVISOR & CONVERGED DIRECTORY TRIGGER */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search Palette Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white border border-white/15 text-xs font-sans font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              title="Search Guides & Maps (Press ⌘K or /)"
              aria-label="Search Guides and Maps"
            >
              <Search size={15} className="text-amber-300" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-stone-300 border border-white/10">⌘K</kbd>
            </button>
          )}

          {/* Theme Switcher Toggle (Light Sanctuary vs Dark Evening Sanctuary) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title={isDark ? "Switch to Daylight Sanctuary (Light Theme)" : "Switch to Evening Sanctuary (Dark Theme)"}
            aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDark ? (
              <Sun size={17} className="text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={17} className="text-amber-200 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Quick AI Advisor Modal Button */}
          {onOpenAdvisor && (
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white border border-amber-400/40 text-xs font-sans font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-xs"
              title="Ask Outpost AI Homestead Advisor (Gemini 3.8)"
            >
              <Sparkles size={15} className="text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Advisor</span>
            </button>
          )}

          {/* User Sign-In or Profile Pill */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(prev => !prev)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-100 border border-white/20 transition-all text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-xs"
                title={`Signed in as ${user.displayName || user.email}`}
                aria-expanded={isUserMenuOpen}
              >
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.displayName || 'Steward')}`}
                  alt={user.displayName || 'User Avatar'}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-lg object-cover bg-emerald-950 border border-amber-300/40"
                />
                <span className="hidden md:inline max-w-[100px] truncate text-amber-200 font-medium">
                  {user.displayName?.split(' ')[0] || 'Steward'}
                </span>
                <ChevronDown size={13} className={cn("text-stone-300 transition-transform", isUserMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#081F13] border border-emerald-800/80 shadow-2xl p-2.5 flex flex-col gap-1 z-50 text-xs text-stone-200"
                  >
                    <div className="px-2.5 py-2 border-b border-emerald-900/60 mb-1">
                      <p className="font-bold text-white truncate">{user.displayName || 'Country Steward'}</p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 border border-emerald-700/60 text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {isFirebaseAuthenticated ? 'Cloud Synced' : 'Offline Ready'}
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
                    >
                      <UserIcon size={15} className="text-amber-300" />
                      <span>My Sanctuary Profile</span>
                    </Link>

                    <Link
                      to="/tracker"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
                    >
                      <Sparkles size={15} className="text-amber-300" />
                      <span>Exodus Progress Ledger</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                      }}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 transition-colors w-full text-left mt-1 border-t border-emerald-900/50 pt-2 cursor-pointer"
                    >
                      <LogOut size={14} className="text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleHeaderSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-950 font-bold text-xs font-sans transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              title="Sign in with your Google Account"
            >
              {isSigningIn ? (
                <div className="w-3.5 h-3.5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              )}
              <span>Sign In</span>
            </button>
          )}

          {/* Converged Directory Trigger Button (Toggles Left Directory) */}
          <button
            id="outpost-drawer-toggle"
            onClick={handleToggleDirectory}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-xs",
              isDrawerOpen
                ? "bg-amber-400 text-stone-950 border border-amber-200 shadow-amber-500/30 scale-[1.02]"
                : "bg-white/15 hover:bg-white/20 text-amber-100 hover:text-white border border-white/20"
            )}
            aria-expanded={isDrawerOpen}
            aria-controls="left-outpost-directory-panel"
            aria-label={isDrawerOpen ? "Close Country Living Directory" : "Open Country Living Directory"}
          >
            {isDrawerOpen ? (
              <>
                <X size={16} className="text-stone-950" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu size={16} className="text-amber-300" />
                <span>Directory</span>
              </>
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Navigation;
