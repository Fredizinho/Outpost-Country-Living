import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Copy, Check, Home, ChevronDown } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface ErrorStateCardProps {
  title?: string;
  description?: string;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function ErrorStateCard({
  title = 'Unable to display this view',
  description = 'An unexpected error occurred while processing this section. You can retry immediately or return to the main workspace.',
  error,
  onRetry,
  className
}: ErrorStateCardProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const handleCopyDetails = async () => {
    const errorDetails = `OUTPOST LIVING - ERROR REPORT
==============================
Timestamp: ${new Date().toISOString()}
Message: ${error?.message || 'Unknown runtime error'}
Stack: ${error?.stack || 'No stack trace available'}
URL: ${typeof window !== 'undefined' ? window.location.href : 'N/A'}
User Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
==============================`;

    try {
      await navigator.clipboard.writeText(errorDetails);
      setHasCopied(true);
      toast({ message: 'Error details copied to clipboard', variant: 'success' });
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      toast({ message: 'Could not copy error details', variant: 'destructive' });
    }
  };

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-[var(--radius-card)] bg-[var(--surface)] border border-red-500/20 shadow-xs flex flex-col items-center text-center max-w-lg mx-auto w-full my-8 text-[var(--ink)]',
        className
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-[var(--radius-control)] bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
        <AlertTriangle size={24} />
      </div>

      {/* Heading & Summary */}
      <h3 className="font-serif text-[20px] sm:text-[22px] font-semibold text-[var(--ink)] mb-2 tracking-tight">
        {title}
      </h3>

      <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mb-6 max-w-[46ch]">
        {description}
      </p>

      {/* Action Buttons: Retry and Copy details */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
        {onRetry && (
          <Button variant="primary" icon={RefreshCw} onClick={onRetry}>
            Retry
          </Button>
        )}

        <Button
          variant="secondary"
          icon={hasCopied ? Check : Copy}
          onClick={handleCopyDetails}
        >
          {hasCopied ? 'Copied' : 'Copy details'}
        </Button>

        <Link
          to="/"
          className="px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[13px] font-sans font-medium text-[var(--ink)] inline-flex items-center gap-1.5 transition-colors"
        >
          <Home size={14} className="text-[var(--ink-muted)]" />
          <span>Return to Start</span>
        </Link>
      </div>

      {/* Optional Technical Details Disclosure */}
      {error && (
        <div className="w-full mt-6 pt-4 border-t border-[var(--border)] text-left">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails((p) => !p)}
            className="flex items-center justify-between w-full text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
          >
            <span>Technical diagnostics</span>
            <ChevronDown
              size={13}
              className={cn('transition-transform duration-150', showTechnicalDetails && 'rotate-180')}
            />
          </button>

          {showTechnicalDetails && (
            <div className="mt-2 p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] overflow-x-auto text-[11px] font-mono text-red-700 dark:text-red-400 leading-snug">
              <p className="font-bold">{error.message}</p>
              {error.stack && (
                <pre className="mt-1.5 whitespace-pre-wrap text-[10px] opacity-80 max-h-32 overflow-y-auto">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ErrorStateCard;
