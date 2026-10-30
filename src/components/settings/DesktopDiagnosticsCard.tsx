import React, { useState } from 'react';
import { Copy, Check, Terminal, CheckCircle2 } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import { usePlatform } from '@/lib/platform';
import { getOfflineSyncStatus } from '@/lib/offlineStorage';

export function DesktopDiagnosticsCard() {
  const platform = usePlatform();
  const syncStatus = getOfflineSyncStatus();
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const diagnosticsData = {
    appVersion: '2.4.0 (Outpost Living Build)',
    platform: platform.isTauri ? 'Desktop (Tauri Native)' : platform.isPWA ? 'Progressive Web App' : 'Web Browser',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    viewport: typeof window !== 'undefined' ? `${window.innerWidth} × ${window.innerHeight}` : 'N/A',
    screenResolution: typeof window !== 'undefined' ? `${window.screen.width} × ${window.screen.height}` : 'N/A',
    offlineSynced: syncStatus.skillsCount > 0 ? 'Yes (Local storage cached)' : 'No',
    lastSync: syncStatus.lastSyncFormatted,
    skillsCached: syncStatus.skillsCount,
    seasonsCached: syncStatus.seasonsCount,
    districtsCached: syncStatus.districtsCount
  };

  const handleCopyDiagnostics = async () => {
    const text = `OUTPOST LIVING - SYSTEM DIAGNOSTICS
====================================
Timestamp: ${new Date().toISOString()}
App Version: ${diagnosticsData.appVersion}
Runtime Platform: ${diagnosticsData.platform}
Viewport: ${diagnosticsData.viewport}
Screen Resolution: ${diagnosticsData.screenResolution}
Offline Cache Status: ${diagnosticsData.offlineSynced}
Last Sync Timestamp: ${diagnosticsData.lastSync}
Cached Guides: ${diagnosticsData.skillsCached} skills, ${diagnosticsData.seasonsCached} seasons, ${diagnosticsData.districtsCached} districts
User Agent: ${diagnosticsData.userAgent}
====================================`;

    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      toast({ message: 'Diagnostics copied to clipboard', variant: 'success' });
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      toast({ message: 'Could not copy diagnostics', variant: 'destructive' });
    }
  };

  return (
    <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-[var(--accent)]" />
          <h4 className="font-serif text-[17px] font-semibold text-[var(--ink)]">
            Desktop diagnostics & system telemetry
          </h4>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={hasCopied ? Check : Copy}
          onClick={handleCopyDiagnostics}
        >
          {hasCopied ? 'Copied diagnostics' : 'Copy diagnostics'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
        <div className="flex justify-between p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
          <span className="text-[var(--ink-muted)]">Runtime platform:</span>
          <span className="font-mono tabular-nums text-[var(--ink)] font-medium">
            {diagnosticsData.platform}
          </span>
        </div>

        <div className="flex justify-between p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
          <span className="text-[var(--ink-muted)]">Active viewport:</span>
          <span className="font-mono tabular-nums text-[var(--ink)] font-medium">
            {diagnosticsData.viewport}
          </span>
        </div>

        <div className="flex justify-between p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
          <span className="text-[var(--ink-muted)]">Offline sync:</span>
          <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>{diagnosticsData.offlineSynced}</span>
          </span>
        </div>

        <div className="flex justify-between p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
          <span className="text-[var(--ink-muted)]">Cached library:</span>
          <span className="font-mono tabular-nums text-[var(--ink)] font-medium">
            {diagnosticsData.skillsCached} skills &middot; {diagnosticsData.districtsCached} districts
          </span>
        </div>
      </div>
    </div>
  );
}
