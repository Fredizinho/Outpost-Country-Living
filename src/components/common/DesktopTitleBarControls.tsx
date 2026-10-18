import React, { useEffect, useState, useCallback } from 'react';
import { usePlatform } from '@/lib/platform';

/**
 * Windows / Linux Segoe-style 46x32px Native Title Bar Controls
 * Gated exclusively for Tauri runtime on Windows or Linux.
 * In browser, PWA, macOS, or AI Studio preview, renders null (nothing).
 */
export function DesktopTitleBarControls() {
  const { runtime, os } = usePlatform();
  const [isMaximized, setIsMaximized] = useState(false);

  const shouldRender = runtime === 'tauri' && (os === 'windows' || os === 'linux');

  // Query and sync maximized state from Tauri window
  useEffect(() => {
    if (!shouldRender) return;

    let unlisten: (() => void) | undefined;
    let mounted = true;

    async function initWindowState() {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const appWindow = getCurrentWindow();
        if (mounted) {
          const max = await appWindow.isMaximized();
          setIsMaximized(max);
        }

        unlisten = await appWindow.onResized(async () => {
          if (mounted) {
            const max = await appWindow.isMaximized();
            setIsMaximized(max);
          }
        });
      } catch (err) {
        console.warn('Desktop window state sync not active:', err);
      }
    }

    initWindowState();

    return () => {
      mounted = false;
      if (unlisten) {
        unlisten();
      }
    };
  }, [shouldRender]);

  const handleMinimize = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().minimize();
    } catch (err) {
      console.warn('Failed to minimize window:', err);
    }
  }, []);

  const handleToggleMaximize = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().toggleMaximize();
    } catch (err) {
      console.warn('Failed to toggle maximize window:', err);
    }
  }, []);

  const handleClose = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().close();
    } catch (err) {
      console.warn('Failed to close window:', err);
    }
  }, []);

  // Provide fallback toggle maximize / fullscreen if in browser
  const handleToggleFullscreenOrMaximize = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (runtime === 'tauri') {
        try {
          const { getCurrentWindow } = await import('@tauri-apps/api/window');
          await getCurrentWindow().toggleMaximize();
        } catch (err) {
          console.warn('Failed to toggle maximize window:', err);
        }
      } else {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
          setIsMaximized(true);
        } else {
          document.exitFullscreen?.().catch(() => {});
          setIsMaximized(false);
        }
      }
    },
    [runtime]
  );

  return (
    <div
      className="flex items-stretch h-[36px] shrink-0 select-none z-50 border-l border-white/10"
      data-tauri-drag-region="false"
      aria-label="Window Management Controls"
    >
      {/* Minimize Button: 46x36px */}
      <button
        type="button"
        onClick={handleMinimize}
        data-tauri-drag-region="false"
        title="Minimize"
        aria-label="Minimize Window"
        className="w-[46px] h-[36px] flex items-center justify-center text-[#F6F1E7]/70 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
      >
        <svg
          width="10"
          height="1"
          viewBox="0 0 10 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 0h10v1H0z" fill="currentColor" />
        </svg>
      </button>

      {/* Maximize / Restore Button: 46x36px */}
      <button
        type="button"
        onClick={handleToggleFullscreenOrMaximize}
        data-tauri-drag-region="false"
        title={isMaximized ? 'Restore Down' : 'Maximize'}
        aria-label={isMaximized ? 'Restore Down Window' : 'Maximize Window'}
        className="w-[46px] h-[36px] flex items-center justify-center text-[#F6F1E7]/70 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
      >
        {isMaximized ? (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2.5 0.5V2H0.5V9.5H8V8H9.5V0.5H2.5ZM7 8.5H1.5V3H7V8.5ZM8.5 7H8V2.5H3.5V1.5H8.5V7Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0.5 0.5V9.5H9.5V0.5H0.5ZM8.5 8.5H1.5V1.5H8.5V8.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>

      {/* Close Button: 46x36px (Turns red on hover) */}
      <button
        type="button"
        onClick={handleClose}
        data-tauri-drag-region="false"
        title="Close"
        aria-label="Close Window"
        className="w-[46px] h-[36px] flex items-center justify-center text-[#F6F1E7]/70 hover:text-white hover:bg-[#E81123] active:bg-[#C4101F] transition-colors cursor-pointer"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 0L0 1l4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4-1-1-4 4-4-4z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

export default DesktopTitleBarControls;
