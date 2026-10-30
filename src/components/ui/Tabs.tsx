import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'segmented';
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className
}: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          'inline-flex items-center gap-1 p-1 bg-[var(--ground)] border border-[var(--border)] rounded-[var(--radius-control)]',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-sans font-medium transition-colors select-none cursor-pointer ' +
                  'rounded-[calc(var(--radius-control)-2px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ' +
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                isActive
                  ? 'bg-[var(--surface)] text-[var(--ink)] shadow-2xs font-semibold'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50'
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'font-mono text-[11px] px-1.5 py-0.2 rounded-xs',
                    isActive
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'bg-[var(--border)] text-[var(--ink-muted)]'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn('flex items-center gap-6 border-b border-[var(--border)]', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 pb-2.5 pt-1 text-[13px] font-sans font-medium transition-colors border-b-2 -mb-px select-none cursor-pointer ' +
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ' +
                'disabled:opacity-40 disabled:cursor-not-allowed',
              isActive
                ? 'border-[var(--accent)] text-[var(--accent)] font-semibold'
                : 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--border)]'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'font-mono text-[11px] px-1.5 py-0.2 rounded-xs border',
                  isActive
                    ? 'border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
                    : 'border-[var(--border)] bg-[var(--ground)] text-[var(--ink-muted)]'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
