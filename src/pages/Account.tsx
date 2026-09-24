import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, User as UserIcon, Shield, CloudOff, RefreshCw, Edit3, Download, Upload, Check, X, MapPin, Compass, Sparkles, Mail, Key, HardDrive, Bookmark, Users, Wallet, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { 
  getOfflineSyncStatus, 
  forceSyncOfflineCache, 
  getStoredTrackerData, 
  getStoredLandChecklist, 
  getStoredPantryStock, 
  createFullAppBackup, 
  restoreFullAppBackup 
} from '@/lib/offlineStorage';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

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

  const [authTab, setAuthTab] = useState<'google' | 'quick' | 'register'>('google');
  const [isEditing, setIsEditing] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [syncStatus, setSyncStatus] = useState(getOfflineSyncStatus());
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      showToast('Signed in successfully with Google!');
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

  // Read real progress from offlineStorage
  const trackerData = (() => {
    try {
      const parsed = getStoredTrackerData();
      if (!parsed) return { completed: 0, total: 9, percentage: 0 };
      let completed = 0;
      let total = 0;
      if (Array.isArray(parsed)) {
        parsed.forEach((step: any) => {
          step.subtasks?.forEach((st: any) => {
            total++;
            if (st.completed) completed++;
          });
        });
      }
      return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
    } catch (e) {
      return { completed: 0, total: 9, percentage: 0 };
    }
  })();

  const landChecklistData = (() => {
    try {
      const parsed = getStoredLandChecklist<{ completedIds?: string[] }>();
      if (!parsed) return { count: 0 };
      return { count: parsed.completedIds?.length || 0 };
    } catch (e) {
      return { count: 0 };
    }
  })();

  const pantryData = (() => {
    try {
      const parsed = getStoredPantryStock();
      if (!parsed) return { count: 0 };
      return { count: Array.isArray(parsed) ? parsed.filter((i: any) => i.checked).length : 0 };
    } catch (e) {
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
      } catch (err) {
        showToast('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-emerald-600">
          <RefreshCw size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 border border-emerald-700 transition-all duration-300">
          <Check size={16} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}

      <header className="flex flex-col gap-3">
        <span className="text-emerald-700 font-extrabold uppercase text-[10px] tracking-[0.25em]">
          Country Life Stewardship
        </span>
        <h2 className="serif text-4xl md:text-5xl font-bold text-emerald-950">
          {user ? 'My Sanctuary Profile' : 'Join the Country Exodus'}
        </h2>
        <p className="text-slate-600 text-base font-medium">
          {user 
            ? "Your progress and country homestead preferences are securely managed." 
            : "Sign in or create your profile to save progress, scout land, and store your homestead inventory."}
        </p>
      </header>

      {!user ? (
        <div className="bg-white/40 dark:bg-[#081F13]/70 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/60 dark:border-emerald-900/60 shadow-xl flex flex-col gap-8">
          {/* Auth Mode Tabs */}
          <div className="flex bg-slate-200/80 dark:bg-emerald-950/60 p-1.5 rounded-2xl max-w-lg mx-auto w-full border border-stone-200 dark:border-emerald-900/40">
            <button
              onClick={() => setAuthTab('google')}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer",
                authTab === 'google' 
                  ? "bg-amber-400 text-stone-950 shadow-md scale-[1.02]" 
                  : "text-slate-600 dark:text-emerald-300/70 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google Sign-In</span>
            </button>
            <button
              onClick={() => setAuthTab('quick')}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer",
                authTab === 'quick' 
                  ? "bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-md scale-[1.02]" 
                  : "text-slate-600 dark:text-emerald-300/70 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <LogIn size={15} /> Quick Guest
            </button>
            <button
              onClick={() => setAuthTab('register')}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer",
                authTab === 'register' 
                  ? "bg-white dark:bg-emerald-800 text-emerald-950 dark:text-white shadow-md scale-[1.02]" 
                  : "text-slate-600 dark:text-emerald-300/70 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <UserIcon size={15} /> Custom
            </button>
          </div>

          {authError && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-4 rounded-2xl flex items-center justify-between text-rose-800 dark:text-rose-200 text-xs">
              <span>{authError}</span>
              <button 
                onClick={clearAuthError}
                className="text-rose-500 hover:text-rose-700 dark:hover:text-white p-1"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {authTab === 'google' ? (
            <div className="flex flex-col items-center text-center gap-6 my-2 max-w-md mx-auto">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-500/20 rounded-[2rem] flex items-center justify-center text-amber-600 dark:text-amber-300 shadow-inner">
                <Sparkles size={40} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Firebase Firestore Cloud Persistence
                </div>
                <h3 className="serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-white">
                  Sign in with Google
                </h3>
                <p className="text-slate-600 dark:text-emerald-100/70 text-xs sm:text-sm font-medium leading-relaxed">
                  Sign in with your Google account to synchronize your Malawi scouted land parcels, homestead checklists, and country living progress securely to Google Cloud Firestore.
                </p>
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-950 px-8 sm:px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer disabled:opacity-75 w-full border border-amber-300"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
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

              <div className="grid grid-cols-2 gap-4 w-full pt-2 text-left">
                <div className="p-3 rounded-xl bg-white/60 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-800/40 flex items-start gap-2.5">
                  <Shield size={16} className="text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-emerald-950 dark:text-white">Encrypted Cloud</span>
                    <span className="text-[10px] text-slate-500 dark:text-stone-400">Strict per-user Firestore security rules</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/60 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-800/40 flex items-start gap-2.5">
                  <HardDrive size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-emerald-950 dark:text-white">Offline Resilience</span>
                    <span className="text-[10px] text-slate-500 dark:text-stone-400">Local storage mirror during rural field visits</span>
                  </div>
                </div>
              </div>
            </div>
          ) : authTab === 'quick' ? (
            <div className="flex flex-col items-center text-center gap-6 my-4 max-w-sm mx-auto">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 rounded-[2rem] flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-inner">
                <Sparkles size={40} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="serif text-2xl font-bold text-emerald-950 dark:text-white">Guest Steward Access</h3>
                <p className="text-slate-500 dark:text-stone-400 text-xs font-medium">
                  Instant offline access as a Country Living Steward without connecting your Google account.
                </p>
              </div>

              <button 
                onClick={() => signIn()}
                className="flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer w-full"
              >
                <LogIn size={18} /> Continue as Guest Steward
              </button>

              <div className="flex gap-6 mt-1">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-stone-400 text-[10px] font-bold uppercase">
                  <Shield size={14} /> Private & Offline
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-stone-400 text-[10px] font-bold uppercase">
                  <CloudOff size={14} /> Local Cache Only
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5 max-w-lg mx-auto w-full">
              <div className="text-center mb-2">
                <h3 className="serif text-2xl font-bold text-emerald-950 dark:text-white">Custom Steward Profile</h3>
                <p className="text-slate-500 dark:text-stone-400 text-xs font-medium">Enter your details to create your personalized homestead account.</p>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-stone-300 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chisomo Phiri"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-white/80 dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/60 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-stone-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="steward@example.mw"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-white/80 dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/60 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-stone-300 mb-1">Malawi Region</label>
                  <select
                    value={regRegion}
                    onChange={(e) => setRegRegion(e.target.value)}
                    className="w-full bg-white/80 dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/60 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Northern">Northern Region</option>
                    <option value="Central">Central Region</option>
                    <option value="Southern">Southern Region</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-stone-300 mb-1">Target District</label>
                  <input
                    type="text"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    placeholder="e.g. Mzimba, Dedza, Mulanje"
                    className="w-full bg-white/80 dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/60 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-stone-300 mb-1">Homestead Goal</label>
                <input
                  type="text"
                  value={regGoal}
                  onChange={(e) => setRegGoal(e.target.value)}
                  placeholder="e.g. Off-grid Organic Farm & Seed Nursery"
                  className="w-full bg-white/80 dark:bg-emerald-950/80 border border-slate-200 dark:border-emerald-800/60 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-emerald-800 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={18} /> Create & Save Profile
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Main Profile Header */}
          <div className="bg-emerald-900 text-white p-8 md:p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
            
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-28 h-28 rounded-[2rem] border-4 border-white/20 shadow-2xl relative z-10 shrink-0 bg-emerald-800"
            />
            
            <div className="flex-1 flex flex-col items-center md:items-start gap-2 relative z-10 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50">
                  Country Steward
                </span>
                <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isFirebaseAuthenticated ? 'Cloud Synced (Firebase)' : 'Local Storage Mode'}
                </span>
                {user.region && (
                  <span className="text-emerald-200 text-[10px] font-bold uppercase flex items-center gap-1">
                    <MapPin size={12} /> {user.district}, {user.region}
                  </span>
                )}
              </div>

              <h3 className="serif text-3xl md:text-4xl font-bold">{user.displayName}</h3>
              <p className="text-emerald-100/70 font-medium text-sm">{user.email}</p>
              
              {user.homesteadGoal && (
                <p className="text-xs text-emerald-300 italic mt-1 font-medium bg-white/10 px-4 py-1.5 rounded-xl border border-white/10">
                  Goal: "{user.homesteadGoal}"
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                {user.householdSize && (
                  <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1">
                    <Users size={12} /> {user.householdSize}
                  </span>
                )}
                {user.budgetBand && (
                  <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1">
                    <Wallet size={12} /> {user.budgetBand.split('(')[0]}
                  </span>
                )}
                {user.timeline && (
                  <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1">
                    <Calendar size={12} /> {user.timeline.split('(')[0]}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10 w-full md:w-auto">
              {!isFirebaseAuthenticated && (
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sync with Google</span>
                </button>
              )}
              <button 
                onClick={() => setShowWizard(true)}
                className="bg-terracotta-600 hover:bg-terracotta-500 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-terracotta-500 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Sparkles size={14} /> Personalization Quiz
              </button>
              <button 
                onClick={handleOpenEdit}
                className="bg-white/15 hover:bg-white/25 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <Edit3 size={14} /> Edit Basic Profile
              </button>
              <button 
                onClick={signOut}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/30 flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatusCard label="Exodus Journey" value={`${trackerData.percentage}% Ready`} color={trackerData.percentage > 0 ? "text-emerald-700" : "text-amber-600"} sub="9 Strategic Steps" />
             <StatusCard label="Land Scouting" value={`${landChecklistData.count} / 5 Criteria`} color={landChecklistData.count > 0 ? "text-emerald-700" : "text-slate-500"} sub="Location Evaluated" />
             <StatusCard label="Country Pantry" value={`${pantryData.count} Items Stored`} color={pantryData.count > 0 ? "text-emerald-700" : "text-slate-500"} sub="Pantry Inventory" />
          </div>

          {/* Data Backup & Restore Section */}
          <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="serif text-xl font-bold text-emerald-950">Homestead Data Management</h4>
              <p className="text-slate-600 text-xs font-medium">
                Export a backup of your profile, checklist progress, and pantry inventory to transfer between devices.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={exportBackup}
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
              >
                <Download size={14} /> Export Backup
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
              >
                <Upload size={14} /> Restore
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImportFile} 
                accept=".json" 
                className="hidden" 
              />
            </div>
          </section>

          {/* Offline Guide Cache Status Section */}
          <section className="bg-emerald-950 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-emerald-300 shrink-0 mt-1 shadow-inner">
                <HardDrive size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="serif text-xl font-bold text-white">Offline Guide Cache & Service Worker</h4>
                  <span className="bg-emerald-800 text-emerald-200 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-700">
                    Active
                  </span>
                </div>
                <p className="text-emerald-200/80 text-xs font-medium leading-relaxed">
                  {syncStatus.skillsCount} Skills, {syncStatus.seasonsCount} Seasonal Calendars, and {syncStatus.regionsCount} Regional Scout dossiers are cached offline in localStorage and PWA Cache API for remote off-grid access.
                </p>
                <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-bold uppercase text-emerald-400">
                  <span>Last Re-sync: {syncStatus.lastSyncFormatted}</span>
                  <span>Bookmarks: {syncStatus.bookmarksCount}</span>
                  <span>Field Notes: {syncStatus.notesCount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleForceSync}
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md shrink-0 flex items-center gap-2 border border-emerald-700 active:scale-95"
            >
              <RefreshCw size={14} /> Force Re-Sync Cache
            </button>
          </section>
        </div>
      )}

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[3rem] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-emerald-100 flex flex-col gap-6 relative"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 text-emerald-800">
                <Edit3 size={24} />
                <h3 className="serif text-2xl font-bold text-emerald-950">Update Profile</h3>
              </div>

              <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Region</label>
                    <select
                      value={editRegion}
                      onChange={(e) => setEditRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Northern">Northern</option>
                      <option value="Central">Central</option>
                      <option value="Southern">Southern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">District</label>
                    <input
                      type="text"
                      value={editDistrict}
                      onChange={(e) => setEditDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Homestead Goal</label>
                  <input
                    type="text"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-800 text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 shadow-md"
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

function StatusCard({ label, value, color, sub }: { label: string, value: string, color: string, sub: string }) {
  return (
    <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <span className={`serif text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">{sub}</span>
    </div>
  );
}

