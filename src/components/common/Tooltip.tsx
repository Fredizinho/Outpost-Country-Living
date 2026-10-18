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
            'absolute z-50 pointer-events-none px-2 py-1',
            'bg-stone-900/95 dark:bg-stone-950/95 text-stone-100',
            'border border-white/15 rounded-[6px] shadow-sm',
            'flex items-center gap-1.5 whitespace-nowrap select-none',
            'text-[12px] font-chrome animate-in fade-in-0 zoom-in-95 duration-100',
            positionClasses[side]
          )}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="px-1 py-0.5 rounded-[4px] bg-white/10 border border-white/20 text-[10px] font-mono text-amber-300 leading-none">
              {shortcut}
            </kbd>
          )}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
