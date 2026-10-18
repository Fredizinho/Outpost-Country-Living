import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '@/lib/platform';
import { formatAccelerator } from '@/lib/acceleratorUtils';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface ApplicationMenuProps {
  onOpenShortcuts?: () => void;
  onOpenCitations?: () => void;
  onOpenSearch?: () => void;
  onToggleExplorer?: () => void;
  onToggleInspector?: () => void;
  onCloseCurrentTab?: () => void;
  onNewTab?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  accelerator?: string;
  action: () => void;
  separator?: boolean;
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

export function ApplicationMenu({
  onOpenShortcuts,
  onOpenCitations,
  onOpenSearch,
  onToggleExplorer,
  onToggleInspector,
  onCloseCurrentTab,
  onNewTab,
}: ApplicationMenuProps) {
  const { os, isTauri } = usePlatform();
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hidden file input for "Open file…" import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        // Verify valid json
        JSON.parse(text);
        window.dispatchEvent(
          new CustomEvent('outpost:restore-backup', { detail: { content: text } })
        );
      } catch (err) {
        console.error('Invalid backup file', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExport = () => {
    window.dispatchEvent(new CustomEvent('outpost:export-backup'));
    navigate('/settings?tab=vault');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuit = async () => {
    if (isTauri) {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        await getCurrentWindow().close();
      } catch {
        window.close();
      }
    } else {
      if (confirm('Close Outpost application workspace?')) {
        window.close();
      }
    }
  };

  const handleUndo = () => {
    document.execCommand('undo');
  };

  const handleRedo = () => {
    document.execCommand('redo');
  };

  const handleCut = () => {
    document.execCommand('cut');
  };

  const handleCopy = () => {
    document.execCommand('copy');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      document.execCommand('insertText', false, text);
    } catch {
      // fallback browser paste
    }
  };

  const handleSelectAll = () => {
    document.execCommand('selectAll');
  };

  const handleFind = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      window.dispatchEvent(new CustomEvent('outpost:open-search'));
    }
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    const docEl = document.documentElement;
    let currentZoom = parseFloat(docEl.style.zoom || '1');
    if (direction === 'in') {
      currentZoom = Math.min(1.4, currentZoom + 0.08);
    } else if (direction === 'out') {
      currentZoom = Math.max(0.75, currentZoom - 0.08);
    } else {
      currentZoom = 1;
    }
    docEl.style.zoom = String(currentZoom);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleReportProblem = () => {
    const subject = encodeURIComponent('Outpost Country Living Application Feedback');
    const body = encodeURIComponent(
      `OS: ${os}\nRuntime: ${isTauri ? 'Tauri Desktop' : 'Web'}\nUser-Agent: ${navigator.userAgent}\n\nDescription of issue:\n`
    );
    window.location.href = `mailto:onesialfred@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleAbout = () => {
    navigate('/settings?tab=about');
  };

  // Define the 5 application menus required by user
  const menuSections: MenuSection[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new-tab',
          label: 'New tab',
          accelerator: 'Ctrl+T',
          action: () => {
            if (onNewTab) onNewTab();
            else window.dispatchEvent(new CustomEvent('outpost:open-new-tab'));
          },
        },
        {
          id: 'open-file',
          label: 'Open file…',
          accelerator: 'Ctrl+O',
          action: handleOpenFile,
        },
        {
          id: 'export',
          label: 'Export…',
          accelerator: 'Ctrl+E',
          action: handleExport,
        },
        {
          id: 'print',
          label: 'Print',
          accelerator: 'Ctrl+P',
          action: handlePrint,
        },
        {
          id: 'close-tab',
          label: 'Close tab',
          accelerator: 'Ctrl+W',
          action: () => {
            if (onCloseCurrentTab) onCloseCurrentTab();
            else window.dispatchEvent(new CustomEvent('outpost:close-active-tab'));
          },
          separator: true,
        },
        {
          id: 'quit',
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          action: handleQuit,
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { id: 'undo', label: 'Undo', accelerator: 'Ctrl+Z', action: handleUndo },
        { id: 'redo', label: 'Redo', accelerator: 'Ctrl+Y', action: handleRedo, separator: true },
        { id: 'cut', label: 'Cut', accelerator: 'Ctrl+X', action: handleCut },
        { id: 'copy', label: 'Copy', accelerator: 'Ctrl+C', action: handleCopy },
        { id: 'paste', label: 'Paste', accelerator: 'Ctrl+V', action: handlePaste, separator: true },
        { id: 'select-all', label: 'Select all', accelerator: 'Ctrl+A', action: handleSelectAll },
        { id: 'find', label: 'Find', accelerator: 'Ctrl+F', action: handleFind },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'toggle-explorer',
          label: 'Toggle explorer',
          accelerator: 'Ctrl+B',
          action: () => {
            if (onToggleExplorer) onToggleExplorer();
            else window.dispatchEvent(new CustomEvent('outpost:toggle-left-directory'));
          },
        },
        {
          id: 'toggle-inspector',
          label: 'Toggle inspector',
          accelerator: 'Ctrl+Shift+B',
          action: () => {
            if (onToggleInspector) onToggleInspector();
            else window.dispatchEvent(new CustomEvent('outpost:toggle-inspector'));
          },
          separator: true,
        },
        { id: 'zoom-in', label: 'Zoom in', accelerator: 'Ctrl+=', action: () => handleZoom('in') },
        { id: 'zoom-out', label: 'Zoom out', accelerator: 'Ctrl+-', action: () => handleZoom('out') },
        { id: 'reset-zoom', label: 'Reset zoom', accelerator: 'Ctrl+0', action: () => handleZoom('reset'), separator: true },
        { id: 'fullscreen', label: 'Full screen', accelerator: 'F11', action: handleToggleFullscreen },
        { id: 'theme', label: `Theme (${isDark ? 'Editorial Warm' : 'Field Night'})`, action: toggleTheme },
      ],
    },
    {
      id: 'go',
      label: 'Go',
      items: [
        { id: 'back', label: 'Back', accelerator: 'Alt+ArrowLeft', action: () => navigate(-1) },
        { id: 'forward', label: 'Forward', accelerator: 'Alt+ArrowRight', action: () => navigate(1), separator: true },
        { id: 'home', label: 'Home', accelerator: 'Alt+1', action: () => navigate('/') },
        { id: 'map', label: 'Map', accelerator: 'Alt+3', action: () => navigate('/scout-map') },
        { id: 'almanac', label: 'Almanac', accelerator: 'Alt+5', action: () => navigate('/seasons') },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        {
          id: 'shortcuts',
          label: 'Shortcuts',
          accelerator: 'Ctrl+/',
          action: () => {
            if (onOpenShortcuts) onOpenShortcuts();
            else window.dispatchEvent(new CustomEvent('outpost:open-shortcuts'));
          },
        },
        {
          id: 'sources',
          label: 'Sources',
          action: () => {
            if (onOpenCitations) onOpenCitations();
            else window.dispatchEvent(new CustomEvent('outpost:open-citations'));
          },
        },
        { id: 'report', label: 'Report a problem', action: handleReportProblem, separator: true },
        { id: 'about', label: 'About Outpost', action: handleAbout },
      ],
    },
  ];

  // Initialize native Tauri application menu when running inside Tauri desktop
  useEffect(() => {
    if (!isTauri) return;

    let isSubscribed = true;

    async function initTauriMenu() {
      try {
        const { Menu, Submenu, MenuItem } = await import('@tauri-apps/api/menu');

        const menuBarSubmenus = await Promise.all(
          menuSections.map(async (sec) => {
            const subitems = await Promise.all(
              sec.items.map(async (item) => {
                const menuItem = await MenuItem.new({
                  text: item.label,
                  accelerator: item.accelerator
                    ? item.accelerator.replace('Ctrl+', 'CmdOrCtrl+').replace('Alt+', 'Alt+')
                    : undefined,
                  action: () => {
                    item.action();
                  },
                });
                return menuItem;
              })
            );

            return await Submenu.new({
              text: sec.label,
              items: subitems,
            });
          })
        );

        if (isSubscribed) {
          const appMenu = await Menu.new({
            items: menuBarSubmenus,
          });
          await appMenu.setAsAppMenu();
        }
      } catch (err) {
        console.warn('Tauri native menu registration deferred or running in browser:', err);
      }
    }

    initTauriMenu();

    return () => {
      isSubscribed = false;
    };
  }, [isTauri]);

  // Click outside to dismiss menu popover
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center text-[13px] font-chrome select-none z-40"
      data-tauri-drag-region="false"
      aria-label="Application Menu Bar"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      {menuSections.map((sec) => {
        const isOpen = activeMenuId === sec.id;

        return (
          <div key={sec.id} className="relative">
            <button
              type="button"
              onClick={() => setActiveMenuId(isOpen ? null : sec.id)}
              onMouseEnter={() => {
                if (activeMenuId !== null) {
                  setActiveMenuId(sec.id);
                }
              }}
              className={cn(
                'px-2.5 py-1 rounded-[4px] text-[12.5px] transition-colors cursor-pointer leading-none',
                isOpen
                  ? 'bg-[#2B4636] text-[#FFFDF8] font-medium'
                  : 'text-[#F6F1E7]/80 hover:text-[#FFFDF8] hover:bg-[#2B4636]/60'
              )}
            >
              {sec.label}
            </button>

            {isOpen && (
              <div
                className="absolute left-0 top-full mt-1.5 w-60 rounded-[6px] bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-xl py-1.5 z-50 text-[#1F2A22] dark:text-[#EBF2EC] animate-in fade-in zoom-in-95 duration-150"
                role="menu"
              >
                {sec.items.map((item) => (
                  <React.Fragment key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuId(null);
                        item.action();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[12.5px] hover:bg-[#F6F1E7] dark:hover:bg-[#23382B] text-[#1F2A22] dark:text-[#EBF2EC] transition-all duration-150 cursor-pointer group"
                      role="menuitem"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">{item.label}</span>
                      {item.accelerator && (
                        <span className="text-[11px] font-mono text-[#5A6458] dark:text-[#8E9E92] pl-3 shrink-0">
                          {formatAccelerator(item.accelerator, os)}
                        </span>
                      )}
                    </button>
                    {item.separator && (
                      <div className="my-1.5 border-b border-[#E4DCCB]/80 dark:border-[#283C30]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
