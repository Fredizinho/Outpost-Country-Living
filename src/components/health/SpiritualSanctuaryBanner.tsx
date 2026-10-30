import React from 'react';
import { BookOpen, Sparkles, Brain, Clock, ShieldCheck } from 'lucide-react';
import { SPIRITUAL_FOUNDATION } from '@/data/eightLawsComprehensiveData';
import { Badge } from '@/components/ui';

export function SpiritualSanctuaryBanner() {
  const { sanctuaryConnection } = SPIRITUAL_FOUNDATION;

  return (
    <div className="p-5 sm:p-7 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-6 text-[var(--ink)]">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Spiritual foundation &amp; prophetic timeline
            </span>
            <Badge status="Verified">1844 Sanctuary connection</Badge>
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[var(--ink)] leading-snug">
            {sanctuaryConnection.title}
          </h2>
          <p className="text-[14px] text-[var(--ink-muted)] max-w-[70ch] leading-relaxed">
            {sanctuaryConnection.summary}
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 bg-[var(--ground)] rounded-[var(--radius-control)] border border-[var(--border)] text-[12px] font-mono tabular-nums text-[var(--ink)] shrink-0 self-start">
          <Clock size={15} className="text-[var(--accent)]" />
          <span>October 1844 &ndash; Present (&gt;173 yrs)</span>
        </div>
      </div>

      {/* Scripture Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sanctuaryConnection.scriptures.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-[var(--accent)]" />
              <span className="font-serif text-[14px] font-bold text-[var(--ink)]">
                {item.ref}
              </span>
            </div>
            <p className="text-[13px] italic font-sans text-[var(--ink)] leading-relaxed">
              &ldquo;{item.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Frontal Lobe Neuro-Biology Connection */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--surface-muted)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-start gap-3.5">
        <div className="w-9 h-9 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
          <Brain size={18} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[var(--ink)]">
            The frontal lobe: Sacred channel of Holy Spirit communication
          </h3>
          <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed max-w-[85ch]">
            {sanctuaryConnection.frontalLobeBiology}
          </p>
        </div>
      </div>
    </div>
  );
}
