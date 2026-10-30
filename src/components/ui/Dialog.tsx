import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  actions,
  className
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Surface */}
      <div
        ref={dialogRef}
        className={cn(
          'relative w-full max-w-lg rounded-[var(--radius-sheet)] border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-overlay)] z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[var(--border)]">
          <div className="flex flex-col gap-1 pr-6">
            <h2 id="dialog-title" className="font-serif text-[20px] font-semibold text-[var(--ink)] leading-snug">
              {title}
            </h2>
            {description && (
              <p id="dialog-description" className="text-[13px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <IconButton
            icon={X}
            label="Close dialog"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="shrink-0 -mr-2 -mt-2"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-[16px] leading-relaxed flex-1">
          {children}
        </div>

        {/* Footer Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-2.5 p-4 sm:px-6 border-t border-[var(--border)] bg-[var(--ground)]">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
