import { detectOS, PlatformOS } from './platform';

/**
 * Formats a key accelerator string according to the host platform.
 * Example: 'Ctrl+K' -> '⌘K' on macOS, 'Ctrl+K' on Windows/Linux
 *          'Ctrl+Shift+B' -> '⌘⇧B' on macOS, 'Ctrl+Shift+B' on Windows/Linux
 *          'Alt+1' -> '⌥1' on macOS, 'Alt+1' on Windows/Linux
 */
export function formatAccelerator(shortcut: string, targetOs?: PlatformOS): string {
  if (!shortcut) return '';
  const currentOs = targetOs || detectOS();
  const isMac = currentOs === 'mac';

  if (!isMac) {
    return shortcut;
  }

  return shortcut
    .replace(/Ctrl\+/gi, '⌘')
    .replace(/Cmd\+/gi, '⌘')
    .replace(/Command\+/gi, '⌘')
    .replace(/Shift\+/gi, '⇧')
    .replace(/Alt\+/gi, '⌥')
    .replace(/Option\+/gi, '⌥')
    .replace(/Enter/gi, '↵')
    .replace(/Backspace/gi, '⌫')
    .replace(/Escape/gi, '⎋')
    .replace(/ArrowLeft/gi, '←')
    .replace(/ArrowRight/gi, '→')
    .replace(/ArrowUp/gi, '↑')
    .replace(/ArrowDown/gi, '↓');
}

/**
 * Normalizes modifier key string for Tauri accelerators
 */
export function toTauriAccelerator(shortcut: string): string {
  return shortcut
    .replace(/⌘/g, 'CmdOrCtrl+')
    .replace(/Ctrl\+/gi, 'CmdOrCtrl+')
    .replace(/Cmd\+/gi, 'CmdOrCtrl+')
    .replace(/Shift\+/gi, 'Shift+')
    .replace(/Alt\+/gi, 'Alt+');
}
