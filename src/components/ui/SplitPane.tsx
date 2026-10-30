import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SplitPaneProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  defaultSplit?: number; // e.g., 60 (meaning 60% / 40%)
  collapsible?: boolean;
  minPrimaryWidth?: number;
  className?: string;
}

export function SplitPane({
  primary,
  secondary,
  defaultSplit = 60,
  collapsible = true,
  className
}: SplitPaneProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row w-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden',
        className
      )}
    >
      {/* Primary Pane */}
      <div
        className={cn(
          'transition-all duration-200 overflow-y-auto p-4 sm:p-6',
          isCollapsed ? 'w-full lg:w-full' : 'w-full'
        )}
        style={{
          flex: isCollapsed ? '1 1 100%' : `${defaultSplit} 1 0%`
        }}
      >
        {primary}
      </div>

      {/* Divider / Toggle Bar */}
      <div className="relative flex items-center justify-center bg-[var(--ground)] border-t lg:border-t-0 lg:border-l border-[var(--border)]">
        {collapsible && (
          <button
            type="button"
            aria-label={isCollapsed ? 'Show side panel' : 'Collapse side panel'}
            title={isCollapsed ? 'Show side panel' : 'Collapse side panel'}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-5 h-10 my-2 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {isCollapsed ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
          </button>
        )}
      </div>

      {/* Secondary Pane */}
      {!isCollapsed && (
        <div
          className="transition-all duration-200 overflow-y-auto p-4 sm:p-6 bg-[var(--surface-muted)]"
          style={{
            flex: `${100 - defaultSplit} 1 0%`
          }}
        >
          {secondary}
        </div>
      )}
    </div>
  );
}
