import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode
} from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextMenuItem {
  label: string;
  icon?: LucideIcon;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface ContextMenuContextType {
  openContextMenu: (e: React.MouseEvent, items: ContextMenuItem[]) => void;
  closeContextMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export function useContextMenu() {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return ctx;
}

export function ContextMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [items, setItems] = useState<ContextMenuItem[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const openContextMenu = (e: React.MouseEvent, menuItems: ContextMenuItem[]) => {
    e.preventDefault();
    e.stopPropagation();

    const clickX = e.clientX;
    const clickY = e.clientY;

    const estimatedWidth = 200;
    const estimatedHeight = menuItems.length * 36 + 16;

    let posX = clickX;
    let posY = clickY;

    if (typeof window !== 'undefined') {
      if (clickX + estimatedWidth > window.innerWidth) {
        posX = Math.max(8, window.innerWidth - estimatedWidth - 8);
      }
      if (clickY + estimatedHeight > window.innerHeight) {
        posY = Math.max(8, window.innerHeight - estimatedHeight - 8);
      }
    }

    setPosition({ x: posX, y: posY });
    setItems(menuItems);
    setIsOpen(true);
  };

  const closeContextMenu = () => {
    setIsOpen(false);
  };

  // Close on outside click, window resize, or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContextMenu();
      }
    };

    const handleScrollOrResize = () => {
      closeContextMenu();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu }}>
      {children}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999
          }}
          className="min-w-[190px] p-1 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] shadow-md text-[var(--ink)] animate-in fade-in zoom-in-95 duration-100 select-none text-[13px] font-sans"
        >
          {items.map((item, index) => {
            if (item.separator) {
              return <div key={index} className="h-[1px] bg-[var(--border)] my-1" />;
            }

            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  closeContextMenu();
                  item.onClick();
                }}
                className={cn(
                  'w-full flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-left transition-colors duration-150 cursor-pointer',
                  item.destructive
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-500/10'
                    : 'text-[var(--ink)] hover:bg-[var(--ground)]',
                  item.disabled && 'opacity-40 pointer-events-none'
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {Icon && <Icon size={14} className="shrink-0 text-[var(--ink-muted)]" />}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.shortcut && (
                  <span className="font-mono text-[11px] text-[var(--ink-muted)] shrink-0">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuTrigger({
  items,
  children,
  className
}: {
  items: ContextMenuItem[] | (() => ContextMenuItem[]);
  children: ReactNode;
  className?: string;
}) {
  const { openContextMenu } = useContextMenu();

  return (
    <div
      onContextMenu={(e) => {
        const resolvedItems = typeof items === 'function' ? items() : items;
        if (resolvedItems.length > 0) {
          openContextMenu(e, resolvedItems);
        }
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default ContextMenuProvider;
