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
          'inline-flex items-baseline gap-0.5 border-b border-dotted border-[#B4531F] dark:border-[#D3672E] text-inherit cursor-help transition-colors font-medium hover:text-[#B4531F] dark:hover:text-[#D3672E]',
          className
        )}
        aria-label={`Definition for ${info.term}`}
        aria-expanded={isOpen}
      >
        <span>{displayText}</span>
        <span className="text-[10px] text-[#B4531F] dark:text-[#D3672E] font-mono leading-none select-none">
          ℹ
        </span>
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 rounded-xl bg-[#FFFDF8] dark:bg-[#16261C] border border-[#E4DCCB] dark:border-[#283C30] shadow-xl text-left select-text font-sans text-xs text-[#1F2A22] dark:text-[#F6F1E7] block animate-in fade-in zoom-in-95 duration-150 cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <span className="flex items-start justify-between gap-2 border-b border-[#E4DCCB] dark:border-[#283C30] pb-2 mb-2">
            <span className="flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-sm text-[#1F2A22] dark:text-[#FFFDF8] truncate">
                {info.term}
              </span>
              {info.category && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2C4A3E]/10 dark:bg-[#2C4A3E]/25 text-[#2C4A3E] dark:text-[#88B896] shrink-0 font-semibold">
                  {info.category}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#5A6458] dark:text-[#9FB3A4] hover:text-[#1F2A22] dark:hover:text-white p-0.5 rounded cursor-pointer"
              aria-label="Close definition"
            >
              <X size={13} />
            </button>
          </span>

          {/* Plain Meaning */}
          <span className="block text-xs leading-relaxed text-[#1F2A22] dark:text-[#E4EDE6] mb-2 font-normal">
            {info.plainMeaning}
          </span>

          {/* Chichewa term & chip */}
          <span className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] mb-2">
            <span className="text-[11px] font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
              Chichewa:
            </span>
            <span className="text-xs font-bold text-[#2C4A3E] dark:text-[#88B896]">
              {info.chichewa}
            </span>
            <span className="text-[9.5px] font-mono text-[#5A6458] dark:text-[#9FB3A4] bg-black/5 dark:bg-white/10 px-1 py-0.2 rounded">
              Draft translation
            </span>
          </span>

          {/* Example */}
          <span className="block text-[11px] text-[#5A6458] dark:text-[#A7B9AC] italic leading-snug mb-2.5">
            “{info.example}”
          </span>

          {/* Footer Guide Links */}
          {info.relatedGuides.length > 0 && (
            <span className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30]">
              <span className="text-[10.5px] font-medium text-[#5A6458] dark:text-[#9FB3A4] flex items-center gap-1">
                <BookOpen size={11} /> Guide:
              </span>
              {info.relatedGuides.map((guidePath) => (
                <Link
                  key={guidePath}
                  to={guidePath}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-mono font-semibold text-[#B4531F] dark:text-[#D3672E] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>{guidePath.replace('/', '')}</span>
                  <ExternalLink size={9} />
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
