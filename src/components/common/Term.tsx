import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lookupGlossaryTerm, GlossaryTerm } from '@/data/glossary';
import { Info, ExternalLink, X, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TermProps {
  term: string;
  children?: React.ReactNode;
  display?: string;
  className?: string;
}

export function Term({ term, children, display, className }: TermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const info: GlossaryTerm | undefined = lookupGlossaryTerm(term);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const displayText = children || display || term;

  if (!info) {
    return <span className={className}>{displayText}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onFocus={() => setIsOpen(true)}
        className={cn(
          'inline-flex items-baseline gap-0.5 border-b border-dotted border-[var(--accent)] text-inherit cursor-help transition-colors duration-150 font-medium hover:text-[var(--accent)]',
          className
        )}
        aria-label={`Definition for ${info.term}`}
        aria-expanded={isOpen}
      >
        <span>{displayText}</span>
        <span className="text-[11px] text-[var(--accent)] font-sans leading-none select-none opacity-80">
          ℹ
        </span>
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 sm:w-96 p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-md text-left select-text font-sans text-[13px] text-[var(--ink)] block animate-in fade-in zoom-in-95 duration-150 cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <span className="flex items-start justify-between gap-2 border-b border-[var(--border)] pb-2 mb-2.5">
            <span className="flex items-center gap-2 min-w-0">
              <span className="font-serif font-semibold text-[15px] text-[var(--ink)] truncate">
                {info.term}
              </span>
              {info.category && (
                <span className="px-2 py-0.5 rounded-[var(--radius-control)] text-[11px] font-sans bg-[var(--ground)] text-[var(--ink-muted)] border border-[var(--border)] shrink-0 font-medium">
                  {info.category}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[var(--ink-muted)] hover:text-[var(--ink)] p-0.5 rounded-[var(--radius-control)] cursor-pointer transition-colors duration-150"
              aria-label="Close definition"
            >
              <X size={14} />
            </button>
          </span>

          {/* Plain Meaning - Standard 13px Text */}
          <span className="block text-[13px] leading-relaxed text-[var(--ink)] mb-3 font-normal">
            {info.plainMeaning}
          </span>

          {/* Chichewa Translation Box - Standard 13px Text */}
          <span className="flex flex-wrap items-center gap-2 p-2.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] mb-2.5 text-[13px]">
            <span className="font-medium text-[var(--ink-muted)]">
              Chichewa:
            </span>
            <span className="font-semibold text-[var(--accent)]">
              {info.chichewa}
            </span>
            <span className="text-[11px] font-sans text-[var(--ink-muted)] bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.2 rounded">
              Vernacular term
            </span>
          </span>

          {/* Example in Context - Standard 13px Italic */}
          <span className="block text-[13px] text-[var(--ink-muted)] italic leading-relaxed mb-3">
            “{info.example}”
          </span>

          {/* Related Guides Footer */}
          {info.relatedGuides.length > 0 && (
            <span className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-[var(--border)] text-[12px]">
              <span className="font-medium text-[var(--ink-muted)] flex items-center gap-1">
                <BookOpen size={12} /> Related:
              </span>
              {info.relatedGuides.map((guidePath) => (
                <Link
                  key={guidePath}
                  to={guidePath}
                  onClick={() => setIsOpen(false)}
                  className="font-sans font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>{guidePath.replace('/', '')}</span>
                  <ExternalLink size={10} />
                </Link>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default Term;
