import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KeyMetricItem {
  label: string;
  value: string;
  hint?: string;
}

export interface KeyTakeawaysCardProps {
  title?: string;
  subtitle?: string;
  metrics?: KeyMetricItem[];
  takeaways: string[];
  advisory?: string;
  className?: string;
}

export function KeyTakeawaysCard({
  title = 'Key takeaways & field benchmarks',
  subtitle = 'Essential operational numbers and rules before field execution',
  metrics,
  takeaways,
  advisory,
  className
}: KeyTakeawaysCardProps) {
  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-[var(--accent)] shadow-xs flex flex-col gap-4 text-[var(--ink)] my-3',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
            <Sparkles size={12} />
          </span>
          <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[var(--ink)] tracking-tight">
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed pl-7">
            {subtitle}
          </p>
        )}
      </div>

      {/* Quantitative Benchmarks / Metrics Grid */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-0.5"
            >
              <span className="text-[11px] font-sans font-medium text-[var(--ink-muted)] truncate">
                {m.label}
              </span>
              <span className="font-mono text-[16px] sm:text-[18px] font-bold text-[var(--ink)] tabular-nums leading-tight">
                {m.value}
              </span>
              {m.hint && (
                <span className="text-[11px] text-[var(--ink-muted)] truncate mt-0.5">
                  {m.hint}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bulleted Takeaways List */}
      <ul className="flex flex-col gap-2 text-[14px] leading-relaxed text-[var(--ink)] max-w-[70ch]">
        {takeaways.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2
              size={15}
              className="text-[var(--accent)] shrink-0 mt-1"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Optional Advisory Callout */}
      {advisory && (
        <div className="p-3 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-start gap-2 text-[12.5px] text-[var(--ink-muted)] leading-relaxed">
          <AlertCircle size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--ink)] font-semibold">Rule of thumb: </strong>
            <span>{advisory}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default KeyTakeawaysCard;
