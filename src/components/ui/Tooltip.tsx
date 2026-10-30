import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  shortcut?: string;
  children: React.ReactElement;
  delayMs?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  shortcut,
  children,
  delayMs = 500,
  position = 'top',
  className
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 pointer-events-none whitespace-nowrap px-2.5 py-1 text-[12px] font-sans font-medium',
            'bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] rounded-[var(--radius-control)] shadow-[var(--shadow-raised)]',
            'flex items-center gap-2 animate-in fade-in zoom-in-95 duration-100',
            positionClasses[position],
            className
          )}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="font-mono text-[11px] px-1 py-0.5 rounded-xs bg-[var(--ground)] border border-[var(--border)] text-[var(--ink-muted)]">
              {shortcut}
            </kbd>
          )}
        </div>
      )}
    </div>
  );
}
