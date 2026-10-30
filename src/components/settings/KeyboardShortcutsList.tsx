import React from 'react';

export interface ShortcutItem {
  keys: string[];
  label: string;
  category: 'Global & navigation' | 'Reading & study' | 'Tasks & actions' | 'Module shortcuts';
}

export const REAL_KEYBOARD_SHORTCUTS: ShortcutItem[] = [
  {
    keys: ['Ctrl', 'K'],
    label: 'Open quick search or command palette',
    category: 'Global & navigation'
  },
  {
    keys: ['Ctrl', ','],
    label: 'Open workspace settings',
    category: 'Global & navigation'
  },
  {
    keys: ['Ctrl', '/'],
    label: 'Open shortcut cheat sheet',
    category: 'Global & navigation'
  },
  {
    keys: ['Ctrl', 'F'],
    label: 'Focus search bar in manuals library and district registry',
    category: 'Global & navigation'
  },
  {
    keys: ['Esc'],
    label: 'Close active modal, drawer, or dialog sheet',
    category: 'Global & navigation'
  },
  {
    keys: ['Ctrl', 'P'],
    label: 'Print current field manual, dossier, or calculator summary',
    category: 'Reading & study'
  },
  {
    keys: ['1', '2', '3', '4'],
    label: 'Switch between overview, climate, soils, crops, and water tabs',
    category: 'Reading & study'
  },
  {
    keys: ['Enter'],
    label: 'Confirm active dialog or execute default primary action',
    category: 'Tasks & actions'
  },
  {
    keys: ['Space'],
    label: 'Toggle checkboxes, task items, or switches',
    category: 'Tasks & actions'
  },
  {
    keys: ['N'],
    label: 'Quick add a new homestead relocation task in Tracker',
    category: 'Tasks & actions'
  },
  {
    keys: ['Alt', '← / →'],
    label: 'Move active task to previous or next Kanban column',
    category: 'Tasks & actions'
  },
  {
    keys: ['E'],
    label: 'Inline edit selected task title and details',
    category: 'Tasks & actions'
  },
  {
    keys: ['Alt', '1'],
    label: 'Jump to Start / Getting started overview',
    category: 'Module shortcuts'
  },
  {
    keys: ['Alt', '2'],
    label: 'Jump to Land evaluation & district dossier',
    category: 'Module shortcuts'
  },
  {
    keys: ['Alt', '3'],
    label: 'Jump to 28-district GIS map & hydrology',
    category: 'Module shortcuts'
  },
  {
    keys: ['Alt', '4'],
    label: 'Jump to Agronomy & seasonal crop calendar',
    category: 'Module shortcuts'
  },
  {
    keys: ['Alt', 'T'],
    label: 'Jump to Transition ledger & readiness tracker',
    category: 'Module shortcuts'
  }
];

export function KeyboardShortcutsList({ searchQuery = '' }: { searchQuery?: string }) {
  const categories = [
    'Global & navigation',
    'Reading & study',
    'Tasks & actions',
    'Module shortcuts'
  ] as const;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredShortcuts = normalizedQuery
    ? REAL_KEYBOARD_SHORTCUTS.filter(
        (s) =>
          s.label.toLowerCase().includes(normalizedQuery) ||
          s.keys.some((k) => k.toLowerCase().includes(normalizedQuery)) ||
          s.category.toLowerCase().includes(normalizedQuery)
      )
    : REAL_KEYBOARD_SHORTCUTS;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
        <h3 className="font-serif text-[20px] font-semibold text-[var(--ink)]">
          Keyboard shortcut reference
        </h3>
        <p className="text-[13px] text-[var(--ink-muted)]">
          Accelerate navigation and operational tracking across all sanctuary tools with built-in desktop hotkeys.
        </p>
      </div>

      {filteredShortcuts.length === 0 ? (
        <div className="p-8 text-center text-[13px] text-[var(--ink-muted)] border border-dashed border-[var(--border)] rounded-[var(--radius-card)]">
          No shortcuts match “{searchQuery}”.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const items = filteredShortcuts.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="flex flex-col gap-2">
                <span className="text-[12px] font-sans font-semibold text-[var(--accent)]">
                  {cat}
                </span>

                <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden divide-y divide-[var(--border)]">
                  {items.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 text-[13px]"
                    >
                      <span className="text-[var(--ink)] font-sans">{s.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {s.keys.map((k, i) => (
                          <kbd
                            key={i}
                            className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-[var(--ground)] border border-[var(--border)] text-[var(--ink)] rounded-xs shadow-2xs"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
