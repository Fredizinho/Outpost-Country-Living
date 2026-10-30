import React from 'react';
import { useTheme, THEME_META, Theme } from '@/contexts/ThemeContext';
import { Badge, Button } from '@/components/ui';

export function ThemePreviewCard() {
  const { theme, setTheme } = useTheme();
  const currentMeta = THEME_META[theme] || THEME_META.light;

  return (
    <div className="p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div>
          <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
            Live preview
          </span>
          <h4 className="font-serif text-[18px] font-semibold text-[var(--ink)]">
            {currentMeta.name}
          </h4>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)]">
          {currentMeta.swatches.map((color, idx) => (
            <span
              key={idx}
              className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
              style={{ backgroundColor: color }}
              title={`Swatch ${idx + 1}: ${color}`}
            />
          ))}
        </div>
      </div>

      <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[60ch]">
        {currentMeta.description}
      </p>

      {/* Interactive specimen inside preview */}
      <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge status="Verified" />
            <span className="font-mono tabular-nums text-[12px] text-[var(--ink)]">
              44px target
            </span>
          </div>
          <span className="text-[13px] font-sans font-medium text-[var(--ink)]">
            Sample sanctuary card container
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            Primary action
          </Button>
          <Button variant="secondary" size="sm">
            Secondary
          </Button>
        </div>
      </div>
    </div>
  );
}
