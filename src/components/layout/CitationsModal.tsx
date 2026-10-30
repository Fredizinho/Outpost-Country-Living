import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  X,
  FileText,
  Globe,
  Landmark,
  Award,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA_SOURCES_AND_CITATIONS } from '@/data/content';
import { Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CitationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CitationsModal({ isOpen, onClose }: CitationsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(DATA_SOURCES_AND_CITATIONS.map((c) => c.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredCitations = useMemo(() => {
    if (selectedCategory === 'All') return DATA_SOURCES_AND_CITATIONS;
    return DATA_SOURCES_AND_CITATIONS.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="citations-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] rounded-[var(--radius-card)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[var(--border)] bg-[var(--ground)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Audit &amp; Institutional Evidence
                  </span>
                  <Badge status="Verified">Primary Sources</Badge>
                </div>
                <h3 id="citations-modal-title" className="font-serif text-[20px] sm:text-[24px] font-bold text-[var(--ink)] leading-snug">
                  Data Sources &amp; Verified Citations
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close citations dialog"
              className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-5 text-[14px]">
            {/* Methodology & Data Transparency Notice */}
            <div className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex items-start gap-3 text-[13px] leading-relaxed">
              <Award size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-sans font-semibold text-[var(--ink)]">
                  Factuality Standard &amp; Verification Protocol
                </span>
                <p className="text-[var(--ink-muted)] max-w-[70ch]">
                  All agronomic, meteorological, hydrogeological, and statutory data in <em>Outpost Living</em> are cross-checked against official published reports from the Government of Malawi (DCCMS, Ministry of Agriculture, MalawiLII), United Nations agencies (FAO, AQUASTAT), and the Ellen G. White Estate. Real external source repositories are hyperlinked for independent verification.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[12px] font-sans">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-3 py-1 rounded-[var(--radius-control)] whitespace-nowrap border transition-all cursor-pointer select-none',
                    selectedCategory === cat
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] font-semibold shadow-2xs'
                      : 'bg-[var(--surface)] text-[var(--ink-muted)] border-[var(--border)] hover:text-[var(--ink)]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Citations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCitations.map((cit) => (
                <div
                  key={cit.id}
                  className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col justify-between gap-3 text-[13px] shadow-2xs"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--border)]/60 pb-2">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[var(--accent)]">
                        {cit.category}
                      </span>
                      <Landmark size={14} className="text-[var(--ink-muted)] shrink-0" />
                    </div>

                    <h4 className="font-serif text-[16px] font-bold text-[var(--ink)] leading-snug">
                      {cit.title}
                    </h4>

                    <div className="flex items-start gap-1.5 text-[12px] text-[var(--accent)] font-medium">
                      <Globe size={13} className="shrink-0 mt-0.5" />
                      <span>{cit.institution}</span>
                    </div>

                    <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                      {cit.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--ink-muted)] truncate">
                      <FileText size={12} className="shrink-0 text-[var(--accent)]" />
                      <span className="truncate">{cit.verifiableURLOrDoc}</span>
                    </div>

                    {cit.directUrl && (
                      <a
                        href={cit.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] font-sans font-medium text-[var(--accent)] hover:underline shrink-0"
                        title={`Open official ${cit.institution} repository`}
                      >
                        <span>Verify</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:px-6 bg-[var(--ground)] border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[var(--ink-muted)]">
            <span className="inline-flex items-center gap-1.5 font-sans">
              <CheckCircle2 size={14} className="text-emerald-700 dark:text-emerald-400" />
              <span>All 10 institutional frameworks verified against primary sources</span>
            </span>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close vault
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
