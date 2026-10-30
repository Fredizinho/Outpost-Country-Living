import React, { useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Palette,
  Languages,
  WifiOff,
  ShieldCheck,
  Keyboard,
  Info,
  Search,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  LogIn,
  LogOut,
  User as UserIcon,
  Check,
  Sparkles,
  MapPin,
  Edit2,
  X
} from 'lucide-react';
import { useTheme, THEME_META, Theme, FontPairing } from '@/contexts/ThemeContext';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { useAuth } from '@/contexts/AuthContext';
import { DISTRICT_LIST } from '@/constants';
import {
  getOfflineSyncStatus,
  forceSyncOfflineCache,
  createFullAppBackup,
  restoreFullAppBackup
} from '@/lib/offlineStorage';
import {
  PageHeader,
  Button,
  Badge,
  Chip,
  Dialog,
  Select,
  Toggle,
  useToast
} from '@/components/ui';
import { SettingsRow } from '@/components/settings/SettingsRow';
import { ThemePreviewCard } from '@/components/settings/ThemePreviewCard';
import { KeyboardShortcutsList } from '@/components/settings/KeyboardShortcutsList';
import { DesktopDiagnosticsCard } from '@/components/settings/DesktopDiagnosticsCard';
import { cn } from '@/lib/utils';

export type SettingsCategory =
  | 'appearance'
  | 'language'
  | 'offline'
  | 'data'
  | 'shortcuts'
  | 'about';

interface CategoryNav {
  id: SettingsCategory;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CATEGORIES: CategoryNav[] = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'offline', label: 'Offline and sync', icon: WifiOff },
  { id: 'data', label: 'Data and privacy', icon: ShieldCheck },
  { id: 'shortcuts', label: 'Keyboard shortcuts', icon: Keyboard },
  { id: 'about', label: 'About', icon: Info }
];

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, setTheme, fontPairing, setFontPairing } = useTheme();
  const { user, isFirebaseAuthenticated, signInWithGoogle, signIn, signOut, updateProfile } = useAuth();
  const [activeDistrictId, setActiveDistrictId] = useActiveHomesteadDistrict();
  const { toast } = useToast();

  const tabParam = (searchParams.get('tab') as SettingsCategory) || 'appearance';
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>(
    ['appearance', 'language', 'offline', 'data', 'shortcuts', 'about'].includes(tabParam)
      ? tabParam
      : 'appearance'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [syncStatus, setSyncStatus] = useState(() => getOfflineSyncStatus());
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_reader_font_scale') === 'lg';
    } catch {
      return false;
    }
  });

  const [chichewaTermsEnabled, setChichewaTermsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outpost_chichewa_bilingual_v1') !== 'disabled';
    } catch {
      return true;
    }
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Profile edit draft state
  const [profileDraft, setProfileDraft] = useState({
    displayName: user?.displayName || 'Local Household Steward',
    familyMembers: user?.familyMembers || 4,
    landSizeAcres: user?.landSizeAcres || 2.5
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (cat: SettingsCategory) => {
    setActiveCategory(cat);
    setSearchParams({ tab: cat });
  };

  const handleLargeTextToggle = (enabled: boolean) => {
    setIsLargeText(enabled);
    try {
      localStorage.setItem('outpost_reader_font_scale', enabled ? 'lg' : 'normal');
      window.dispatchEvent(
        new CustomEvent('outpost:font-scale-changed', { detail: { scale: enabled ? 'lg' : 'normal' } })
      );
      toast({
        message: enabled ? 'Large reading text enabled' : 'Standard text restored',
        variant: 'default'
      });
    } catch {}
  };

  const handleChichewaToggle = (enabled: boolean) => {
    setChichewaTermsEnabled(enabled);
    try {
      localStorage.setItem('outpost_chichewa_bilingual_v1', enabled ? 'enabled' : 'disabled');
      toast({
        message: enabled ? 'Chichewa agricultural terms enabled' : 'English-only headers set',
        variant: 'default'
      });
    } catch {}
  };

  const handleSyncNow = () => {
    const updated = forceSyncOfflineCache();
    setSyncStatus(updated);
    toast({
      message: `Offline database synchronized (${updated.lastSyncFormatted})`,
      variant: 'success'
    });
  };

  const handleExportBackup = () => {
    try {
      const backupJson = createFullAppBackup();
      const blob = new Blob([JSON.stringify(backupJson, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Outpost_Sanctuary_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ message: 'Backup file exported successfully', variant: 'success' });
    } catch {
      toast({ message: 'Backup export failed', variant: 'destructive' });
    }
  };

  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        restoreFullAppBackup(parsed);
        toast({ message: 'Sanctuary data restored successfully', variant: 'success' });
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        toast({ message: 'Invalid backup file structure', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteAllLocalData = () => {
    try {
      localStorage.clear();
      setIsDeleteDialogOpen(false);
      toast({
        message: 'All local offline data cleared',
        variant: 'destructive',
        duration: 8000,
        undoLabel: 'Reload defaults',
        undo: () => window.location.reload()
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      toast({ message: 'Could not clear data', variant: 'destructive' });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast({ message: 'Signed in with Google account', variant: 'success' });
    } catch {
      toast({ message: 'Google sign in could not be completed', variant: 'destructive' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSaveProfile = () => {
    updateProfile({
      displayName: profileDraft.displayName.trim() || 'Local Household Steward',
      familyMembers: Number(profileDraft.familyMembers) || 4,
      landSizeAcres: Number(profileDraft.landSizeAcres) || 2.5
    });
    setIsProfileModalOpen(false);
    toast({ message: 'Household profile updated successfully', variant: 'success' });
  };

  // Search filter predicate
  const q = searchQuery.toLowerCase().trim();
  const matchesSearch = (text: string, desc?: string) => {
    if (!q) return true;
    return text.toLowerCase().includes(q) || (desc && desc.toLowerCase().includes(q));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="Settings & workspace preferences"
        eyebrow="Configuration Window"
        summary="Manage interface themes, language localization, offline synchronization, account profiles, and keyboard shortcuts."
        chips={
          <>
            <Badge status="Verified" />
            <Chip label="100% offline capable" />
            <Chip label={`Theme: ${THEME_META[theme]?.name || 'Light'}`} />
            <Chip label={`District: ${activeDistrictId}`} />
          </>
        }
      />

      {/* Main Settings Window Container */}
      <div className="flex flex-col lg:flex-row items-stretch rounded-[var(--radius-sheet)] border border-[var(--border)] bg-[var(--surface)] shadow-xs overflow-hidden min-h-[640px]">
        {/* Left Category List */}
        <aside className="w-full lg:w-64 bg-[var(--ground)] border-b lg:border-b-0 lg:border-r border-[var(--border)] p-4 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            {/* Search settings input */}
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-[var(--ink-muted)] pointer-events-none">
                <Search size={14} />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search settings..."
                className="w-full h-8 pl-8 pr-3 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Category Navigation Items */}
            <nav aria-label="Settings categories" className="flex flex-col gap-1 pt-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 text-[13px] font-sans font-medium rounded-[var(--radius-control)] transition-all cursor-pointer text-left',
                      isActive
                        ? 'bg-[var(--surface)] text-[var(--accent)] font-semibold shadow-2xs border border-[var(--border)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50'
                    )}
                  >
                    <Icon size={15} className={isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)]'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Account Profile Pill at Bottom of Nav */}
          <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-control)] border border-[var(--border)] flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-semibold shrink-0">
                {user?.displayName ? user.displayName[0].toUpperCase() : 'O'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[var(--ink)] truncate">
                  {user?.displayName || 'Local Household'}
                </span>
                <span className="text-[11px] text-[var(--ink-muted)] truncate">
                  {isFirebaseAuthenticated ? 'Cloud synced' : 'Local offline account'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCategoryChange('data')}
              className="text-[11px] font-semibold text-[var(--accent)] hover:underline shrink-0"
            >
              Manage
            </button>
          </div>
        </aside>

        {/* Right Content Pane: One Setting per Row */}
        <main className="flex-1 p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto">
          {searchQuery && (
            <div className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] text-[12px] text-[var(--ink-muted)] flex items-center justify-between">
              <span>
                Filtering settings for “<strong className="text-[var(--ink)]">{searchQuery}</strong>”
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[var(--accent)] hover:underline font-medium"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* CATEGORY 1: APPEARANCE */}
          {(activeCategory === 'appearance' || (searchQuery && matchesSearch('Appearance theme color font text scale'))) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
                  Appearance & typography
                </h3>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  Select daylight or dark sanctuary color palettes and adjust reading scale.
                </p>
              </div>

              {/* Live Theme Preview */}
              {!searchQuery && <ThemePreviewCard />}

              <div className="flex flex-col">
                {matchesSearch('Color theme', 'Calibrated color palettes conforming to 4.5:1+ contrast criteria') && (
                  <SettingsRow
                    label="Color theme"
                    description="Calibrated color palettes conforming to 4.5:1+ contrast criteria for bright field sunlight or nocturnal study."
                    control={
                      <div className="flex items-center gap-1.5 p-1 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-sans">
                        {(['light', 'dark', 'field'] as Theme[]).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTheme(t)}
                            className={cn(
                              'px-3 py-1 rounded-[calc(var(--radius-control)-2px)] font-medium transition-all cursor-pointer',
                              theme === t
                                ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs'
                                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                            )}
                          >
                            {THEME_META[t].name}
                          </button>
                        ))}
                      </div>
                    }
                  />
                )}

                {matchesSearch('Large reader text scale', 'Enlarges typography across edenic agriculture manuals and devotional guides') && (
                  <SettingsRow
                    label="Large reader text scale"
                    description="Enlarges typography to 18px body size across all edenic agriculture manuals and devotional study guides."
                    control={
                      <Toggle
                        checked={isLargeText}
                        onChange={handleLargeTextToggle}
                      />
                    }
                  />
                )}

                {matchesSearch('Primary font pairing', 'Headline typography pairing standardizing Fraunces editorial serif') && (
                  <SettingsRow
                    label="Primary font pairing"
                    description="Headline typography pairing standardizing Fraunces editorial serif with Plus Jakarta Sans interface chrome."
                    control={
                      <Select
                        value={fontPairing}
                        onChange={(e) => setFontPairing(e.target.value as FontPairing)}
                        options={[
                          { value: 'editorial', label: 'Fraunces + Plus Jakarta Sans (Editorial)' },
                          { value: 'inter', label: 'Plus Jakarta Sans UI (Modern Clean)' },
                          { value: 'warm', label: 'Playfair Display + Outfit (Warm)' }
                        ]}
                      />
                    }
                  />
                )}
              </div>
            </div>
          )}

          {/* CATEGORY 2: LANGUAGE & LOCALIZATION */}
          {(activeCategory === 'language' || (searchQuery && matchesSearch('Language chichewa vernacular district operational'))) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
                  Language & regional terminology
                </h3>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  Configure vernacular agricultural vocabulary and district operational telemetry.
                </p>
              </div>

              <div className="flex flex-col">
                {matchesSearch('Chichewa agricultural terminology', 'Displays bilingual headers and agricultural terms') && (
                  <SettingsRow
                    label="Chichewa agricultural terminology"
                    description="Displays bilingual headers and agricultural terms like Dimba (valley garden), Chisanu (cold season), and Sasakawa planting pits."
                    control={
                      <Toggle
                        checked={chichewaTermsEnabled}
                        onChange={handleChichewaToggle}
                      />
                    }
                  />
                )}

                {matchesSearch('Home operational district', 'Defaults all rainfall models and planting calendars to your primary outpost location') && (
                  <SettingsRow
                    label="Home operational district"
                    description="Defaults all rainfall models, aquifer depths, and planting calendars to your primary outpost location."
                    control={
                      <Select
                        value={activeDistrictId}
                        onChange={(e) => {
                          setActiveDistrictId(e.target.value);
                          toast({
                            message: `Operational district updated to ${e.target.value}`,
                            variant: 'success'
                          });
                        }}
                        options={DISTRICT_LIST.map((d) => ({
                          value: d.id,
                          label: `${d.name} (${d.region})`
                        }))}
                      />
                    }
                  />
                )}
              </div>
            </div>
          )}

          {/* CATEGORY 3: OFFLINE AND SYNC */}
          {(activeCategory === 'offline' || (searchQuery && matchesSearch('Offline sync storage database cache status'))) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
                  Offline storage & synchronization
                </h3>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  Verify local cached databases guaranteeing 100% standalone reliability when far from connectivity.
                </p>
              </div>

              <div className="flex flex-col">
                {matchesSearch('Local database status', 'stored in IndexedDB/localStorage') && (
                  <SettingsRow
                    label="Local database status"
                    description={`${syncStatus.skillsCount} skills, ${syncStatus.seasonsCount} seasonal guides, and ${syncStatus.districtsCount} districts stored in IndexedDB/localStorage.`}
                    badge={<Badge status="Verified" />}
                    control={
                      <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleSyncNow}>
                        Re-sync now
                      </Button>
                    }
                  />
                )}

                {matchesSearch('Last successful sync', 'Timestamp of the most recent offline asset bundle validation') && (
                  <SettingsRow
                    label="Last successful sync"
                    description="Timestamp of the most recent offline asset bundle validation."
                    control={
                      <span className="font-mono tabular-nums text-[13px] font-medium text-[var(--ink)]">
                        {syncStatus.lastSyncFormatted}
                      </span>
                    }
                  />
                )}
              </div>
            </div>
          )}

          {/* CATEGORY 4: DATA AND PRIVACY (MERGED ACCOUNT PROFILE, AUTH & DATA BACKUP) */}
          {(activeCategory === 'data' || (searchQuery && matchesSearch('Data privacy account profile backup export restore sign in delete'))) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
                  Steward profile, data & privacy
                </h3>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  Manage household demographics, sign in credentials, export JSON backup archives, or clear local storage.
                </p>
              </div>

              {/* Profile Card */}
              <div className="p-5 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <UserIcon size={18} className="text-[var(--accent)]" />
                    <h4 className="font-serif text-[17px] font-semibold text-[var(--ink)]">
                      Household steward profile
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                      onClick={() => {
                        setProfileDraft({
                          displayName: user?.displayName || 'Local Household Steward',
                          familyMembers: user?.familyMembers || 4,
                          landSizeAcres: user?.landSizeAcres || 2.5
                        });
                        setIsProfileModalOpen(true);
                      }}
                    >
                      Edit profile
                    </Button>
                    {isFirebaseAuthenticated ? (
                      <Button variant="ghost" size="sm" icon={LogOut} onClick={() => signOut()}>
                        Sign out
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={LogIn}
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                      >
                        {isGoogleLoading ? 'Connecting...' : 'Sign in with Google'}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[var(--ink-muted)]">Steward name:</span>
                    <span className="font-medium text-[var(--ink)]">{user?.displayName || 'Local Household Steward'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[var(--ink-muted)]">Household members:</span>
                    <span className="font-mono tabular-nums font-medium text-[var(--ink)]">
                      {user?.familyMembers || 4} people
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[var(--ink-muted)]">Homestead parcel size:</span>
                    <span className="font-mono tabular-nums font-medium text-[var(--ink)]">
                      {user?.landSizeAcres || 2.5} acres
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                {matchesSearch('Export data backup (.JSON)', 'Download a full encrypted backup of all field notes') && (
                  <SettingsRow
                    label="Export data backup (.JSON)"
                    description="Download a full encrypted backup of all field notes, checklist marks, calculator specs, and bookmarked parcels."
                    control={
                      <Button variant="secondary" size="sm" icon={Download} onClick={handleExportBackup}>
                        Export backup
                      </Button>
                    }
                  />
                )}

                {matchesSearch('Restore data from backup', 'Import and merge a previously saved .JSON sanctuary archive') && (
                  <SettingsRow
                    label="Restore data from backup"
                    description="Import and merge a previously saved .JSON sanctuary archive into this device."
                    control={
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".json"
                          onChange={handleFileRestore}
                          className="hidden"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Upload}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Restore backup
                        </Button>
                      </>
                    }
                  />
                )}

                {matchesSearch('Delete all local offline data', 'Permanently erase all local storage caches and notes') && (
                  <SettingsRow
                    label="Delete all local offline data"
                    description="Permanently erase all local storage caches, checklist marks, and recorded notes from this browser session."
                    control={
                      <Button
                        variant="destructive"
                        size="sm"
                        icon={Trash2}
                        onClick={() => setIsDeleteDialogOpen(true)}
                      >
                        Delete all data
                      </Button>
                    }
                  />
                )}
              </div>
            </div>
          )}

          {/* CATEGORY 5: KEYBOARD SHORTCUTS */}
          {(activeCategory === 'shortcuts' || (searchQuery && matchesSearch('Keyboard shortcuts hotkeys commands navigation'))) && (
            <KeyboardShortcutsList searchQuery={searchQuery} />
          )}

          {/* CATEGORY 6: ABOUT & DESKTOP DIAGNOSTICS */}
          {(activeCategory === 'about' || (searchQuery && matchesSearch('About Outpost diagnostics version mission telemetry'))) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
                <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
                  About Outpost Living
                </h3>
                <p className="text-[13px] text-[var(--ink-muted)]">
                  An open-source country living manual and sanctuary establishment tool for Southern Africa.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-3 text-[13px] leading-relaxed text-[var(--ink)] max-w-[70ch]">
                <p>
                  Outpost Living provides practical instructions, edenic agriculture methodologies, and prophetic timeline waymarks grounded in the written counsels of Ellen G. White and verified by regional Malawian agronomists and water engineers.
                </p>
                <p className="text-[var(--ink-muted)] text-[12px]">
                  Designed for 100% offline autonomy. All calculations, diagrams, and field guides remain fully functional without active internet connectivity.
                </p>
              </div>

              {/* Desktop Diagnostics moved under About with Copy diagnostics button */}
              <DesktopDiagnosticsCard />
            </div>
          )}
        </main>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit household profile"
        description="Update your household demographics and parcel sizing to personalize calculators and planting guidelines."
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsProfileModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveProfile}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[var(--ink)]">
              Steward or family name
            </label>
            <input
              type="text"
              value={profileDraft.displayName}
              onChange={(e) => setProfileDraft((p) => ({ ...p, displayName: e.target.value }))}
              className="h-9 px-3 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[var(--ink)]">
                Household members
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={profileDraft.familyMembers}
                onChange={(e) =>
                  setProfileDraft((p) => ({ ...p, familyMembers: Number(e.target.value) || 1 }))
                }
                className="h-9 px-3 text-[13px] font-mono bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[var(--ink)]">
                Land parcel size (Acres)
              </label>
              <input
                type="number"
                min={0.1}
                step={0.1}
                max={500}
                value={profileDraft.landSizeAcres}
                onChange={(e) =>
                  setProfileDraft((p) => ({ ...p, landSizeAcres: Number(e.target.value) || 1 }))
                }
                className="h-9 px-3 text-[13px] font-mono bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Erase all local sanctuary data?"
        description="This destructive action will clear all cached field notes, checklists, and saved specs from this device."
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAllLocalData}>
              Yes, erase local data
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[var(--ink)] leading-relaxed">
          Please make sure you have exported a .JSON backup before proceeding if you wish to preserve your notes or checklist state.
        </p>
      </Dialog>
    </div>
  );
}
