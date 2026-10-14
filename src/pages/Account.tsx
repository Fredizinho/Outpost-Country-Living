import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  LogIn,
  LogOut,
  User as UserIcon,
  Shield,
  CloudOff,
  RefreshCw,
  Edit3,
  Download,
  Upload,
  Check,
  X,
  MapPin,
  Compass,
  Sparkles,
  Mail,
  Key,
  HardDrive,
  Users,
  Wallet,
  Calendar,
  Sun,
  Droplets,
  Sprout,
  CheckCircle2,
  ArrowRight,
  Palette,
  Eye,
  LayoutDashboard,
  ShieldCheck,
  Feather
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Skeleton, SkeletonCard, SkeletonText } from '@/components/ui/Skeleton';
import { 
  getOfflineSyncStatus, 
  forceSyncOfflineCache, 
  getStoredLandChecklist, 
  getStoredPantryStock, 
  createFullAppBackup, 
  restoreFullAppBackup,
  calculateHomesteadReadinessScore
} from '@/lib/offlineStorage';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { DISTRICT_LIST } from '@/constants';

export default function Account() {
  const { 
    user, 
    isFirebaseAuthenticated, 
    signInWithGoogle, 
    signIn, 
    signUp, 
    updateProfile, 
    signOut, 
    loading,
    authError,
    clearAuthError
  } = useAuth();

  const { theme, setTheme, isField, fontPairing, setFontPairing } = useTheme();
  const isCharcoal = false;

  const [authTab, setAuthTab] = useState<'google' | 'quick' | 'register'>('google');
  const [isEditing, setIsEditing] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [syncStatus, setSyncStatus] = useState(getOfflineSyncStatus());
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [previewDistrictId, setPreviewDistrictId] = useState('dedza');
  
  // When user is signed in, allow them to preview the NeuroNest login stage
  const [forcePreviewLogin, setForcePreviewLogin] = useState(false);

  const previewDistrict = DISTRICT_LIST.find((d) => d.id === previewDistrictId) || DISTRICT_LIST[0];

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      showToast('Signed in successfully with Google!');
      setForcePreviewLogin(false);
    } catch {
      showToast('Sign in could not be completed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForceSync = () => {
    const updated = forceSyncOfflineCache();
    setSyncStatus(updated);
    showToast('Offline guide data re-synced successfully!');
  };

  // Sign up state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRegion, setRegRegion] = useState('Central');
  const [regDistrict, setRegDistrict] = useState('Dedza');
  const [regGoal, setRegGoal] = useState('Self-Sufficient Organic Outpost');

  // Quick guest state
  const [guestName, setGuestName] = useState('Country Steward');

  // Edit state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editGoal, setEditGoal] = useState('');

  // Backup & toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Read real unified progress from offlineStorage
  const trackerData = (() => {
    try {
      const stats = calculateHomesteadReadinessScore();
      return {
        completed: stats.completedMilestones,
        total: stats.totalMilestones,
        percentage: stats.breakdown.exodusScorePct
      };
    } catch {
      return { completed: 0, total: 15, percentage: 0 };
    }
  })();

  const landChecklistData = (() => {
    try {
      const parsed = getStoredLandChecklist<{ completedIds?: string[] }>();
      if (!parsed) return { count: 0 };
      return { count: parsed.completedIds?.length || 0 };
    } catch {
      return { count: 0 };
    }
  })();

  const pantryData = (() => {
    try {
      const parsed = getStoredPantryStock();
      if (!parsed) return { count: 0 };
      return { count: Array.isArray(parsed) ? parsed.filter((i: any) => i.checked).length : 0 };
    } catch {
      return { count: 0 };
    }
  })();

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      showToast('Please enter both name and email.');
      return;
    }
    signUp(regEmail, regName, regRegion, regDistrict, regGoal);
    showToast('Profile created successfully!');
    setForcePreviewLogin(false);
  };

  const handleQuickSignIn = (e: FormEvent) => {
    e.preventDefault();
    signIn();
    showToast(`Welcome, ${guestName}!`);
    setForcePreviewLogin(false);
  };

  const handleOpenEdit = () => {
    if (!user) return;
    setEditName(user.displayName);
    setEditEmail(user.email);
    setEditRegion(user.region || 'Central');
    setEditDistrict(user.district || 'Dedza');
    setEditGoal(user.homesteadGoal || 'Self-Sufficient Outpost');
    setIsEditing(true);
  };

  const handleSaveEdit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName: editName,
      email: editEmail,
      region: editRegion,
      district: editDistrict,
      homesteadGoal: editGoal,
    });
    setIsEditing(false);
    showToast('Profile updated!');
  };

  const exportBackup = () => {
    const backupData = createFullAppBackup();
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outpost-sanctuary-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Sanctuary backup exported!');
  };

  const handleImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        restoreFullAppBackup(json);
        if (json.user) {
          window.location.reload();
        } else {
          showToast('Data imported successfully!');
        }
      } catch {
        showToast('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-8 max-w-7xl mx-auto flex flex-col gap-6 animate-pulse">
        <div className="p-6 rounded-card bg-surface-raised border border-border flex flex-col gap-4">
          <Skeleton className="h-6 w-48 rounded-control" />
          <SkeletonText lines={2} className="max-w-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard className="h-56" />
          <SkeletonCard className="h-56" />
        </div>
      </div>
    );
  }

  const showLoginView = !user || forcePreviewLogin;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto flex flex-col gap-6 text-stone-900 dark:text-stone-100">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 transition-all duration-300">
          <Check size={16} className="text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb & Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono">
          <Link to="/" className="hover:text-stone-950 dark:hover:text-white transition-colors">
            Outpost
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300 font-semibold">
            Authentication &amp; Stewardship
          </span>
          <span>/</span>
          <span className="text-stone-900 dark:text-amber-300 font-bold">
            {showLoginView ? 'Sign in' : 'Steward Profile Console'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Field Mode Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setTheme(theme === 'field' ? 'dark' : 'field');
            }}
            title="Toggle Maximum-Contrast Field Mode (18px Body & 48px+ Touch Targets)"
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs transition-all cursor-pointer border',
              theme === 'field'
                ? 'bg-white text-black border-white font-bold shadow-xs'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-stone-600 dark:text-stone-300 border-stone-300/80 dark:border-white/10'
            )}
          >
            <Eye size={12} className={theme === 'field' ? 'text-black' : 'text-amber-400'} />
            <span>{theme === 'field' ? 'Field Mode Active' : 'Field Mode (Max Contrast)'}</span>
          </button>

          {/* Toggle between Login view and Profile view if signed in */}
          {user && (
            <button
              type="button"
              onClick={() => setForcePreviewLogin(!forcePreviewLogin)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-stone-200 dark:bg-white/10 hover:bg-stone-300 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              {forcePreviewLogin ? (
                <>
                  <UserIcon size={12} />
                  <span>Return to Profile</span>
                </>
              ) : (
                <>
                  <Eye size={12} />
                  <span>Preview Login Screen</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ====================================================================
          NEURONEST SPLIT-STAGE SAAS LOGIN & DASHBOARD PREVIEW INTERFACE
      ==================================================================== */}
      {showLoginView ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* =================================================================
              LEFT COLUMN (5 Cols): Matte Charcoal Authentication Card
          ================================================================= */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141417] border border-stone-200/90 dark:border-white/12 shadow-xl flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              {/* Brand kicker + heading */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold font-mono text-sm shadow-xs">
                    OP
                  </div>
                  <span className="font-mono text-xs font-semibold text-stone-500 dark:text-stone-400">
                    Outpost Living · Malawi
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 dark:text-white">
                  Welcome to Outpost
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Sign in to synchronize your scouted parcels, soil water analyses, and exodus milestones to encrypted Cloud Firestore.
                </p>
              </div>

              {/* Segmented Auth Mode Switcher */}
              <div className="flex bg-stone-100 dark:bg-[#1C1C20] p-1 rounded-xl border border-stone-200 dark:border-white/10 text-xs">
                {[
                  { id: 'google' as const, label: 'Google Cloud' },
                  { id: 'quick' as const, label: 'One-Click Sign in' },
                  { id: 'register' as const, label: 'Local Profile' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAuthTab(tab.id)}
                    className={cn(
                      'flex-1 py-2 text-center rounded-lg font-semibold transition-all cursor-pointer text-xs truncate',
                      authTab === tab.id
                        ? 'bg-white dark:bg-[#27272A] text-stone-950 dark:text-white shadow-xs font-bold'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Error banner */}
              {authError && (
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-3.5 rounded-xl flex items-center justify-between text-rose-800 dark:text-rose-200 text-xs">
                  <span>{authError}</span>
                  <button 
                    onClick={clearAuthError}
                    className="text-rose-500 hover:text-rose-700 dark:hover:text-white p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Form Tab 1: Google Cloud Firestore */}
              {authTab === 'google' && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#1A1A1E] border border-stone-200 dark:border-white/10 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        Firebase Firestore Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Connects directly to your Firebase Firestore database for instant multi-device syncing, automated offline cache fallback, and verified ownership.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
                  >
                    {isGoogleLoading ? (
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    )}
                    <span>Continue with Google</span>
                  </button>
                </div>
              )}

              {/* Form Tab 2: One-Click Quick Sign in */}
              {authTab === 'quick' && (
                <form onSubmit={handleQuickSignIn} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Steward Display Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Country Steward or Chisomo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn size={15} />
                    <span>Enter as {guestName}</span>
                  </button>
                </form>
              )}

              {/* Form Tab 3: Local Profile Creation */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chisomo Phiri"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="steward@example.mw"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-caption font-semibold text-stone-700 dark:text-stone-300">Region</label>
                      <select
                        value={regRegion}
                        onChange={(e) => setRegRegion(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white"
                      >
                        <option value="Northern">Northern</option>
                        <option value="Central">Central</option>
                        <option value="Southern">Southern</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-caption font-semibold text-stone-700 dark:text-stone-300">Target District</label>
                      <input
                        type="text"
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        placeholder="e.g. Dedza"
                        className="w-full px-2 py-1.5 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check size={15} />
                    <span>Create &amp; Save Profile</span>
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Trust Row */}
            <div className="pt-4 border-t border-stone-200 dark:border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span className="text-caption">Strict Security Rules</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <HardDrive size={16} className="text-amber-400 shrink-0" />
                <span className="text-caption">Offline PWA Mirror</span>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN (7 Cols): Interactive NeuroNest SaaS Dashboard Preview
          ================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Interactive Preview Frame */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141417] border border-stone-200/90 dark:border-white/12 shadow-xl flex flex-col gap-6">
              {/* Preview Header & District Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={16} className="text-amber-400" />
                  <span className="font-display text-base font-bold text-stone-950 dark:text-white">
                    Live Outpost Home Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 dark:text-stone-400">Preview District:</span>
                  <select
                    value={previewDistrictId}
                    onChange={(e) => setPreviewDistrictId(e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-[#1E1E22] border border-stone-200 dark:border-white/10 text-xs font-semibold text-stone-900 dark:text-white"
                  >
                    {DISTRICT_LIST.map((d) => (
                      <option key={d.id} value={d.id} className="bg-stone-900 text-white">
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Framed Banner Simulation (NeuroNest Hero Card) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#18181B] via-[#222226] to-[#121214] text-white border border-white/15 shadow-md flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                  <span>Target Zone · {previewDistrict.name} ({previewDistrict.rainfallAnnualMm}mm/yr)</span>
                  <span className="text-stone-400">Ellen G. White Counsel</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                  “Get out of the cities as soon as possible and purchase a little piece of land...”
                </h3>
                <p className="text-xs text-stone-300 font-mono">
                  — Country Living, p. 24.2 · Sized for self-sufficient family life in Malawi.
                </p>

                {/* Circular Medallion Cluster */}
                <div className="flex items-center gap-2 pt-1">
                  {[
                    { label: '28 GIS', icon: Compass },
                    { label: 'Solar PV', icon: Sun },
                    { label: '3×3×3ft', icon: Sprout },
                    { label: 'Sabbath', icon: Feather },
                  ].map((m) => {
                    const MIcon = m.icon;
                    return (
                      <div
                        key={m.label}
                        className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1.5 text-caption font-mono"
                      >
                        <MIcon size={12} className="text-amber-300" />
                        <span>{m.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 Pastel Bento Stat Cards (NeuroNest Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Ice Blue (#DCE6F2) */}
                <div className="p-3.5 rounded-2xl bg-[#DCE6F2] text-[#141416] border border-black/5 flex flex-col justify-between min-h-[105px]">
                  <div className="flex items-center justify-between">
                    <Sprout size={16} className="text-stone-900" />
                    <span className="text-caption font-mono font-bold text-stone-700">CROPS</span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold tabular-nums">1.5+ ac</div>
                    <div className="text-caption font-medium text-stone-700">Family Land</div>
                  </div>
                </div>

                {/* 2. Sage Mint (#DCF2DE) */}
                <div className="p-3.5 rounded-2xl bg-[#DCF2DE] text-[#141416] border border-black/5 flex flex-col justify-between min-h-[105px]">
                  <div className="flex items-center justify-between">
                    <Droplets size={16} className="text-stone-900" />
                    <span className="text-caption font-mono font-bold text-stone-700">RAIN</span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold tabular-nums">81k L</div>
                    <div className="text-caption font-medium text-stone-700">Annual Roof</div>
                  </div>
                </div>

                {/* 3. Buttercream Gold (#FBF3C9) */}
                <div className="p-3.5 rounded-2xl bg-[#FBF3C9] text-[#141416] border border-black/5 flex flex-col justify-between min-h-[105px]">
                  <div className="flex items-center justify-between">
                    <Sun size={16} className="text-stone-900" />
                    <span className="text-caption font-mono font-bold text-stone-700">SOLAR</span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold tabular-nums">1.45 kW</div>
                    <div className="text-caption font-medium text-stone-700">LiFePO4 Array</div>
                  </div>
                </div>

                {/* 4. Soft Lavender (#EAE2F8) */}
                <div className="p-3.5 rounded-2xl bg-[#EAE2F8] text-[#141416] border border-black/5 flex flex-col justify-between min-h-[105px]">
                  <div className="flex items-center justify-between">
                    <CheckCircle2 size={16} className="text-stone-900" />
                    <span className="text-caption font-mono font-bold text-stone-700">EXODUS</span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold tabular-nums">{trackerData.percentage}%</div>
                    <div className="text-caption font-medium text-stone-700">Readiness</div>
                  </div>
                </div>
              </div>

              {/* Active Modules Telemetry List */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-xs font-semibold text-stone-500 dark:text-stone-400">
                  Active Modules in this District
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#1A1A1E] border border-stone-200 dark:border-white/10 flex items-center justify-between">
                    <span>{previewDistrict.name} Highland GIS</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-caption">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Running
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#1A1A1E] border border-stone-200 dark:border-white/10 flex items-center justify-between">
                    <span>Off-Grid Solar PV Sizer</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-caption">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Running
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ====================================================================
            PROFILE CONSOLE (WHEN USER IS SIGNED IN)
        ==================================================================== */
        <div className="flex flex-col gap-6">
          {/* Main Profile Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141417] border border-stone-200/90 dark:border-white/12 shadow-xl flex flex-col md:flex-row items-center gap-6">
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-24 h-24 rounded-2xl border-2 border-amber-400 shadow-md shrink-0 bg-stone-800 object-cover"
            />
            
            <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                <span className="font-mono text-amber-500 font-bold uppercase tracking-wider">
                  Country Living Steward
                </span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {isFirebaseAuthenticated ? 'Cloud Synced (Firebase Firestore)' : 'Local Storage Mode'}
                </span>
                {user.region && (
                  <>
                    <span aria-hidden="true" className="text-stone-400">·</span>
                    <span className="text-stone-600 dark:text-stone-300 font-medium">
                      {user.district}, {user.region}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white">
                {user.displayName}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">{user.email}</p>
              
              {user.homesteadGoal && (
                <p className="text-xs text-amber-700 dark:text-amber-300 italic font-medium bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
                  Homestead Goal: "{user.homesteadGoal}"
                </p>
              )}
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <button 
                onClick={() => setShowWizard(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} /> Personalization Quiz
              </button>
              <button 
                onClick={handleOpenEdit}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all border border-stone-300 dark:border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 size={14} /> Edit Profile
              </button>
              <button 
                onClick={signOut}
                className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-all border border-rose-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* 3 Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-[#DCE6F2] text-[#141416] border border-black/5 flex flex-col justify-between">
              <span className="text-caption font-mono font-bold text-stone-700 uppercase">Exodus Journey</span>
              <div className="text-3xl font-extrabold tracking-tight mt-2">{trackerData.percentage}% Ready</div>
              <span className="text-xs text-stone-700 mt-1">9 Strategic Relocation Phases</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#DCF2DE] text-[#141416] border border-black/5 flex flex-col justify-between">
              <span className="text-caption font-mono font-bold text-stone-700 uppercase">Land Scouting</span>
              <div className="text-3xl font-extrabold tracking-tight mt-2">{landChecklistData.count} / 5 Criteria</div>
              <span className="text-xs text-stone-700 mt-1">Water &amp; Soil Grounded</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#FBF3C9] text-[#141416] border border-black/5 flex flex-col justify-between">
              <span className="text-caption font-mono font-bold text-stone-700 uppercase">Country Pantry</span>
              <div className="text-3xl font-extrabold tracking-tight mt-2">{pantryData.count} Items Stored</div>
              <span className="text-xs text-stone-700 mt-1">Staple Food Reserves</span>
            </div>
          </div>

          {/* Backup & Offline Synchronization */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141417] border border-stone-200/90 dark:border-white/12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-lg font-bold text-stone-950 dark:text-white">
                Homestead Vault &amp; Field Backups
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Export an encrypted JSON backup of your checklist progress and local cache for transfer between phones or laptops.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={exportBackup}
                className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-950 text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={13} /> Export Backup
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-[#1E1E22] text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-white/10 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Upload size={13} /> Restore
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImportFile} 
                accept=".json" 
                className="hidden" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#18181B] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-white/15 flex flex-col gap-5 text-stone-900 dark:text-white"
            >
              <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Edit3 size={18} className="text-amber-400" />
                  <h3 className="font-display text-lg font-bold">Update Profile</h3>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Region</label>
                    <select
                      value={editRegion}
                      onChange={(e) => setEditRegion(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                    >
                      <option value="Northern">Northern</option>
                      <option value="Central">Central</option>
                      <option value="Southern">Southern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">District</label>
                    <input
                      type="text"
                      value={editDistrict}
                      onChange={(e) => setEditDistrict(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Homestead Goal</label>
                  <input
                    type="text"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-white/15 text-xs text-stone-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <OnboardingWizard 
        isOpen={showWizard} 
        onClose={() => setShowWizard(false)} 
      />
    </div>
  );
}
