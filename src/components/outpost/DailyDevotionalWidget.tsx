import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function DailyDevotionalWidget({ className }: { className?: string }) {
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const currentIndex = dayOfYear % DAILY_DEVOTIONALS.length;
  const devotional = DAILY_DEVOTIONALS[currentIndex] || DAILY_DEVOTIONALS[0];

  return (
    <div
      className={cn(
        'p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors',
        className
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5">
          <BookOpen size={16} />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Daily Scripture &middot; {devotional.scripture.reference}
            </span>
          </div>
          <p className="text-[14px] font-serif italic text-[var(--ink)] line-clamp-2 leading-relaxed mt-0.5">
            “{devotional.scripture.verse}”
          </p>
        </div>
      </div>

      <Link
        to={`/devotional?index=${currentIndex}`}
        className="shrink-0 self-stretch sm:self-auto px-3.5 py-2 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[13px] font-sans font-medium text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Open</span>
        <ArrowRight size={13} className="text-[var(--ink-muted)]" />
      </Link>
    </div>
  );
}
