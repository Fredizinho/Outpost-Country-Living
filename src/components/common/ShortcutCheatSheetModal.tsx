import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, Command } from 'lucide-react';
import { usePlatform } from '@/lib/platform';
import { formatAccelerator } from '@/lib/acceleratorUtils';

interface ShortcutCategory {
  title: string;
  items: {
    label: string;
    accelerator: string;
    description: string;
  }[];
}

interface ShortcutCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutCheatSheetModal({ isOpen, onClose }: ShortcutCheatSheetModalProps) {
  const { os } = usePlatform();

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const categories: ShortcutCategory[] = [
    {
      title: 'Global & Shell',
      items: [
        { label: 'Command Palette', accelerator: 'Ctrl+K', description: 'Universal search across guides & tools' },
        { label: 'Settings', accelerator: 'Ctrl+,', description: 'Open full workspace settings tab' },
        { label: 'Shortcut Cheat Sheet', accelerator: 'Ctrl+/', description: 'Show this keyboard reference' },
        { label: 'Toggle Explorer', accelerator: 'Ctrl+B', description: 'Show/hide left symbol directory' },
        { label: 'Toggle Inspector', accelerator: 'Ctrl+Shift+B', description: 'Show/hide right reference inspector' },
        { label: 'Full Screen', accelerator: 'F11', description: 'Toggle borderless workspace view' },
      ],
    },
    {
      title: 'Tabs & Navigation',
      items: [
        { label: 'New Tab', accelerator: 'Ctrl+T', description: 'Open module quick launcher' },
        { label: 'Close Active Tab', accelerator: 'Ctrl+W', description: 'Close current workspace tab' },
        { label: 'Reopen Closed Tab', accelerator: 'Ctrl+Shift+T', description: 'Restore previously closed tab' },
        { label: 'Cycle Tabs Forward', accelerator: 'Ctrl+Tab', description: 'Switch to next open tab' },
        { label: 'Cycle Tabs Backward', accelerator: 'Ctrl+Shift+Tab', description: 'Switch to previous open tab' },
        { label: 'Go Back', accelerator: 'Alt+ArrowLeft', description: 'Navigate backward in tab history' },
        { label: 'Go Forward', accelerator: 'Alt+ArrowRight', description: 'Navigate forward in tab history' },
      ],
    },
    {
      title: 'Quick Module Jump',
      items: [
        { label: 'Start / Home', accelerator: 'Alt+1', description: 'Sanctuary blueprint overview' },
        { label: 'Land Tenure', accelerator: 'Alt+2', description: 'Customary land & evaluation' },
        { label: 'District Map', accelerator: 'Alt+3', description: '28-district GIS aquifers & topography' },
        { label: 'Agronomy & Crops', accelerator: 'Alt+4', description: 'Soil classification & rotations' },
        { label: 'Seasonal Almanac', accelerator: 'Alt+5', description: 'Rainfall & planting windows' },
        { label: 'Transition Journey', accelerator: 'Alt+T', description: 'Readiness ledger & milestones' },
      ],
    },
    {
      title: 'File & View Controls',
      items: [
        { label: 'Export Data', accelerator: 'Ctrl+E', description: 'Download offline vault backup JSON' },
        { label: 'Print Current View', accelerator: 'Ctrl+P', description: 'Clean printout formatted for field study' },
        { label: 'Find in Page', accelerator: 'Ctrl+F', description: 'Search keywords in active guide' },
        { label: 'Zoom In / Out', accelerator: 'Ctrl+= / Ctrl+-', description: 'Adjust workspace font scale' },
        { label: 'Reset Zoom', accelerator: 'Ctrl+0', description: 'Return to default 13px chrome scale' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#16261C]/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#FFFDF8] border border-[#E4DCCB] rounded-[10px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#1F2A22]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#F6F1E7] border-b border-[#E4DCCB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[#16261C] text-[#FFFDF8] flex items-center justify-center shadow-xs">
                  <Keyboard size={16} />
                </div>
                <div>
                  <h2 className="font-serif text-lg text-[#1F2A22] font-semibold leading-tight">
                    Keyboard Accelerators & Shortcuts
                  </h2>
                  <p className="text-xs text-[#5A6458]">
                    Native desktop keybindings optimized for {os === 'mac' ? 'macOS (⌘ Command)' : 'Windows & Linux (Ctrl)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-[6px] text-[#5A6458] hover:text-[#1F2A22] hover:bg-[#E4DCCB]/50 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close shortcuts dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {categories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-xs font-semibold text-[#5A6458] uppercase tracking-wider mb-2.5">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-2.5 rounded-[6px] border border-[#E4DCCB] bg-[#FFFDF8] hover:bg-[#F6F1E7]/70 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-[13px] font-medium text-[#1F2A22] truncate">{item.label}</p>
                          <p className="text-[11px] text-[#5A6458] truncate">{item.description}</p>
                        </div>
                        <kbd className="shrink-0 px-2 py-0.5 rounded-[4px] bg-[#F6F1E7] border border-[#E4DCCB] text-[11px] font-mono font-semibold text-[#16261C] shadow-2xs">
                          {formatAccelerator(item.accelerator, os)}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#F6F1E7] border-t border-[#E4DCCB] flex items-center justify-between text-xs text-[#5A6458]">
              <span>Press <kbd className="font-mono text-[#16261C] font-semibold">Esc</kbd> to dismiss</span>
              <span>All accelerators work inside tabs and full screen</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
