import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'right' | 'left';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = 'right',
  className
}: DrawerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div
        className={cn(
          'relative w-full max-w-md h-full bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-overlay)] z-10 flex flex-col',
          position === 'right'
            ? 'rounded-l-[var(--radius-sheet)] border-l border-[var(--border)]'
            : 'rounded-r-[var(--radius-sheet)] border-r border-[var(--border)]',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[var(--border)]">
          <div className="flex flex-col gap-1 pr-4">
            <h2 className="font-serif text-[20px] font-semibold text-[var(--ink)] leading-snug">
              {title}
            </h2>
            {description && (
              <p className="text-[13px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <IconButton
            icon={X}
            label="Close drawer"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="shrink-0 -mr-2 -mt-2"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-[16px] leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 sm:px-6 border-t border-[var(--border)] bg-[var(--ground)] flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
