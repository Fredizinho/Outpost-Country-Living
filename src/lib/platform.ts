import { useState, useEffect } from 'react';
import { isTauri } from '@tauri-apps/api/core';

export type PlatformRuntime = 'tauri' | 'electron' | 'pwa' | 'browser';
export type PlatformOS = 'windows' | 'mac' | 'linux';

export interface PlatformInfo {
  runtime: PlatformRuntime;
  os: PlatformOS;
  isTauri: boolean;
  isElectron: boolean;
  isPWA: boolean;
  isBrowser: boolean;
  isDesktop: boolean;
}

/**
 * Detects if the current runtime environment is Tauri v2
 */
export function detectIsTauri(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (typeof (window as unknown as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__ !== 'undefined') {
      return true;
    }
    return isTauri();
  } catch {
    return false;
  }
}

/**
 * Detects if the app is hosted inside Electron legacy bridge
 */
export function detectIsElectron(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as {
    outpostDesktop?: unknown;
    electron?: unknown;
    process?: { type?: string };
  };
  return Boolean(
    win.outpostDesktop ||
    win.electron ||
    win.process?.type === 'renderer' ||
    /electron/i.test(navigator.userAgent || '')
  );
}

/**
 * Detects if the app is launched as an installed PWA (display-mode: standalone or window-controls-overlay)
 */
export function detectIsPWA(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const isStandaloneDisplay =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.matchMedia?.('(display-mode: window-controls-overlay)').matches;
    const isIOSStandalone = (navigator as unknown as { standalone?: boolean }).standalone === true;
    const isAndroidApp = typeof document !== 'undefined' && document.referrer.includes('android-app://');
    return Boolean(isStandaloneDisplay || isIOSStandalone || isAndroidApp);
  } catch {
    return false;
  }
}

/**
 * Resolves current execution runtime
 */
export function detectRuntime(): PlatformRuntime {
  if (detectIsTauri()) return 'tauri';
  if (detectIsElectron()) return 'electron';
  if (detectIsPWA()) return 'pwa';
  return 'browser';
}

/**
 * Resolves host Operating System
 */
export function detectOS(): PlatformOS {
  if (typeof window === 'undefined') return 'linux';
  const platformStr = (navigator.platform || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();

  if (platformStr.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    return 'mac';
  }
  if (platformStr.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  return 'linux';
}

/**
 * Returns a static snapshot of current platform metadata
 */
export function getPlatformInfo(): PlatformInfo {
  const runtime = detectRuntime();
  const os = detectOS();
  const isTauriVal = runtime === 'tauri';
  const isElectronVal = runtime === 'electron';
  const isPWAVal = runtime === 'pwa';
  const isBrowserVal = runtime === 'browser';
  const isDesktop = isTauriVal || isElectronVal;

  return {
    runtime,
    os,
    isTauri: isTauriVal,
    isElectron: isElectronVal,
    isPWA: isPWAVal,
    isBrowser: isBrowserVal,
    isDesktop,
  };
}

// Module-level platform singleton
export const platform: PlatformInfo = getPlatformInfo();

export const runtime: PlatformRuntime = platform.runtime;
export const os: PlatformOS = platform.os;

/**
 * React hook to access platform info with reactive updates on display mode shifts
 */
export function usePlatform(): PlatformInfo {
  const [platformState, setPlatformState] = useState<PlatformInfo>(() => getPlatformInfo());

  useEffect(() => {
    const update = () => {
      setPlatformState(getPlatformInfo());
    };

    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia('(display-mode: standalone)');
      mql.addEventListener?.('change', update);
    } catch {
      // Ignore in environments where matchMedia is restricted
    }

    return () => {
      mql?.removeEventListener?.('change', update);
    };
  }, []);

  return platformState;
}

export default platform;
