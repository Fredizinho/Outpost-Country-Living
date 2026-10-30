import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { X, Undo2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface ToastOptions {
  id?: string;
  message: string;
  variant?: 'default' | 'success' | 'destructive';
  duration?: number;
  undo?: () => void;
  undoLabel?: string;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextType {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ duration = 5000, ...options }: ToastOptions) => {
      const id = options.id || Math.random().toString(36).slice(2, 9);
      const newToast: ToastItem = { ...options, id, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-raised)] text-[13px] text-[var(--ink)] animate-in fade-in slide-in-from-bottom-2 duration-150',
              t.variant === 'destructive' && 'border-[var(--danger)]/50',
              t.variant === 'success' && 'border-emerald-600/40'
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {t.variant === 'destructive' && (
                <AlertCircle size={16} className="text-[var(--danger)] shrink-0" />
              )}
              {t.variant === 'success' && (
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              <span className="truncate leading-snug">{t.message}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {t.undo && (
                <button
                  type="button"
                  onClick={() => {
                    t.undo!();
                    dismiss(t.id);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[12px] font-sans font-semibold rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Undo2 size={12} />
                  <span>{t.undoLabel || 'Undo'}</span>
                </button>
              )}
              <button
                type="button"
                aria-label="Dismiss toast"
                onClick={() => dismiss(t.id)}
                className="p-1 rounded-[var(--radius-control)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--ground)] transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
