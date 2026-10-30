import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  shortcut?: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delayMs?: number;
  className?: string;
}

/**
 * Desktop-grade tooltip appearing strictly after 500ms hover delay
 * with clean 13px system font typography and keyboard shortcut hint.
 */
export function Tooltip({
  content,
  shortcut,
  children,
  side = 'bottom',
  delayMs = 500,
  className,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
  };

  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isOpen && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 pointer-events-none px-2.5 py-1.5',
            'bg-[var(--ink)] text-[var(--ground)]',
            'border border-[var(--border)] rounded-[var(--radius-control)] shadow-md',
            'flex items-center gap-2 whitespace-nowrap select-none',
            'text-[13px] font-sans font-medium animate-in fade-in-0 zoom-in-95 duration-150',
            positionClasses[side]
          )}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="px-1.5 py-0.5 rounded-xs bg-[var(--ground)]/20 border border-[var(--ground)]/30 text-[11px] font-mono leading-none">
              {shortcut}
            </kbd>
          )}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
