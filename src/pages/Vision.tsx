import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Bookmark,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Sliders,
  Sparkles,
  Compass,
  Layers,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import {
  getAllQuotes,
  getVerifiedQuotes,
  VerifiedQuoteEntry,
  QuoteCategory
} from '@/data/sources/quotes';
import { PropheticTimeline1844 } from '@/components/vision/PropheticTimeline1844';
import { saveOfflineFieldNote } from '@/lib/offlineStorage';
import { PageHeader, Badge, Button, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

type ReadingSize = 'sm' | 'md' | 'lg';

const FONT_SIZE_CLASSES: Record<ReadingSize, { body: string; quote: string; heading: string }> = {
  sm: {
    body: 'text-[14px] leading-relaxed',
    quote: 'text-[15px] leading-relaxed',
    heading: 'text-[22px] leading-snug'
  },
  md: {
    body: 'text-[16px] leading-[1.75]',
    quote: 'text-[17px] leading-[1.75]',
    heading: 'text-[26px] leading-snug'
  },
  lg: {
    body: 'text-[18px] leading-[1.8]',
    quote: 'text-[20px] leading-[1.8]',
    heading: 'text-[30px] leading-snug'
  }
};

const CATEGORIES: (QuoteCategory | 'All')[] = [
  'All',
  'Vision',
  'Preparation',
  'Education & Manual Training',
  'Sustenance & Diet',
  'Medical Missionary',
  'Children',
  'Physical Labor',
  'Mental Health',
  'Spiritual Growth'
];

export default function Vision() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'reader' | 'timeline'>('reader');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readingSize, setReadingSize] = useState<ReadingSize>(() => {
    try {
      const saved = localStorage.getItem('outpost_reading_size');
      return saved === 'sm' || saved === 'lg' ? saved : 'md';
    } catch {
      return 'md';
    }
  });

  const [savedNotes, setSavedNotes] = useState<Record<string, boolean>>({});
  const [hasCopiedRef, setHasCopiedRef] = useState(false);

  // Quotes source strictly from verified store
  const allVerifiedQuotes = useMemo(() => getVerifiedQuotes(), []);

  const filteredQuotes = useMemo(() => {
    return allVerifiedQuotes.filter((q) => {
      const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.text.toLowerCase().includes(query) ||
        q.source.toLowerCase().includes(query) ||
        q.title.toLowerCase().includes(query) ||
        q.standardEgwCode.toLowerCase().includes(query) ||
        q.applicationForCountryLiving.toLowerCase().includes(query) ||
        (q.scriptureCompanion &&
          (q.scriptureCompanion.verse.toLowerCase().includes(query) ||
            q.scriptureCompanion.reference.toLowerCase().includes(query)))
      );
    });
  }, [allVerifiedQuotes, selectedCategory, searchQuery]);

  // Keep currentIndex in bounds
  const safeIndex = filteredQuotes.length > 0 ? Math.min(currentIndex, filteredQuotes.length - 1) : 0;
  const currentQuote: VerifiedQuoteEntry | undefined = filteredQuotes[safeIndex];

  const handleSizeChange = (size: ReadingSize) => {
    setReadingSize(size);
    try {
      localStorage.setItem('outpost_reading_size', size);
    } catch {}
  };

  const handleNext = () => {
    if (safeIndex < filteredQuotes.length - 1) {
      setCurrentIndex(safeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const handleSaveToNotes = () => {
    if (!currentQuote) return;
    saveOfflineFieldNote(
      `egw-${currentQuote.id}`,
      `${currentQuote.title} (${currentQuote.standardEgwCode})`,
      `“${currentQuote.text}”\n— ${currentQuote.source}\n\nScripture:\n${currentQuote.scriptureCompanion?.reference || ''} — "${currentQuote.scriptureCompanion?.verse || ''}"\n\nApplication for Country Living:\n${currentQuote.applicationForCountryLiving}`
    );
    setSavedNotes((prev) => ({ ...prev, [currentQuote.id]: true }));
    toast({
      message: 'Counsel saved to local field notes',
      variant: 'success'
    });
  };

  const handleCopyReference = async () => {
    if (!currentQuote) return;
    const textToCopy = `${currentQuote.scriptureCompanion ? `${currentQuote.scriptureCompanion.reference} · ` : ''}${currentQuote.source} (${currentQuote.standardEgwCode})\n“${currentQuote.text}”`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setHasCopiedRef(true);
      toast({
        message: 'Reference and counsel copied to clipboard',
        variant: 'success'
      });
      setTimeout(() => setHasCopiedRef(false), 2000);
    } catch {
      toast({ message: 'Could not copy reference', variant: 'destructive' });
    }
  };

  const fontConfig = FONT_SIZE_CLASSES[readingSize];

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-20 transition-colors">
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* Page Header */}
        <PageHeader
          title="Prophetic foundations & country living counsel"
          eyebrow="Vision & Sanctuary Counsel"
          summary="A quiet reading experience through verified Ellen G. White writings and Scripture companions for outposts and family country living."
          chips={
            <>
              <Badge status="Verified" />
              <span className="text-[12px] text-[var(--ink-muted)]">
                {allVerifiedQuotes.length} verified passages
              </span>
            </>
          }
        />

        {/* View Switcher: Reader vs 1844 Timeline */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div
            role="tablist"
            className="flex items-center gap-1.5 p-1 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reader'}
              onClick={() => setActiveTab('reader')}
              className={cn(
                'px-3.5 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[13px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5',
                activeTab === 'reader'
                  ? 'bg-[var(--ground)] text-[var(--ink)] font-semibold shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              <BookOpen size={14} />
              <span>Counsel reader</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'timeline'}
              onClick={() => setActiveTab('timeline')}
              className={cn(
                'px-3.5 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[13px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5',
                activeTab === 'timeline'
                  ? 'bg-[var(--ground)] text-[var(--ink)] font-semibold shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              )}
            >
              <Compass size={14} />
              <span>1844 Prophetic timeline</span>
            </button>
          </div>

          {activeTab === 'reader' && (
            <div className="flex items-center gap-1 text-[12px] text-[var(--ink-muted)]">
              <span className="hidden sm:inline mr-1">Reading size:</span>
              <div className="flex items-center p-0.5 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)]">
                {(['sm', 'md', 'lg'] as ReadingSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSizeChange(s)}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-sans font-medium rounded-[calc(var(--radius-control)-2px)] transition-all cursor-pointer uppercase',
                      readingSize === s
                        ? 'bg-[var(--ground)] text-[var(--ink)] font-semibold shadow-2xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {activeTab === 'timeline' ? (
          <div className="py-2">
            <PropheticTimeline1844 />
          </div>
        ) : (
          /* ====================================================================
             FOCUSED READING EXPERIENCE: SINGLE COLUMN UP TO 70 CHARACTERS
          ==================================================================== */
          <div className="flex flex-col gap-6">
            {/* Reader Controls: Category & Search */}
            <div className="max-w-[70ch] mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-[13px]">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value as QuoteCategory | 'All');
                    setCurrentIndex(0);
                  }}
                  className="h-8 px-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[13px] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'All themes' : c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative min-w-[220px]">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  placeholder="Search counsel..."
                  className="w-full h-8 pl-8 pr-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                />
              </div>
            </div>

            {filteredQuotes.length === 0 ? (
              <div className="max-w-[70ch] mx-auto w-full p-8 text-center text-[13px] text-[var(--ink-muted)] border border-dashed border-[var(--border)] rounded-[var(--radius-card)]">
                No verified counsel matches your search. Clear search or select another theme.
              </div>
            ) : currentQuote ? (
              <article className="max-w-[70ch] mx-auto w-full flex flex-col gap-6 py-2">
                {/* Meta Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-[12px] text-[var(--ink-muted)]">
                  <span>
                    {currentQuote.category} &middot; Entry {safeIndex + 1} of {filteredQuotes.length}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-[var(--ink-muted)]">
                    {currentQuote.standardEgwCode}
                  </span>
                </div>

                {/* Fraunces Title */}
                <h2 className={cn('font-serif font-bold text-[var(--ink)] tracking-tight', fontConfig.heading)}>
                  {currentQuote.title}
                </h2>

                {/* Quiet Scripture Block with Reference Above */}
                {currentQuote.scriptureCompanion && (
                  <div className="flex flex-col gap-1.5 my-1">
                    <span className="text-[12px] font-sans text-[var(--ink-muted)] font-medium">
                      Scripture Anchor: {currentQuote.scriptureCompanion.reference}
                    </span>
                    <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border-l-2 border-[var(--border)] text-[var(--ink)] italic leading-relaxed">
                      “{currentQuote.scriptureCompanion.verse}”
                    </div>
                  </div>
                )}

                {/* Counsel Quotation */}
                <div className="flex flex-col gap-3 my-2">
                  <blockquote className={cn('font-serif italic text-[var(--ink)]', fontConfig.quote)}>
                    “{currentQuote.text}”
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--border)] text-[13px] text-[var(--ink-muted)] font-sans">
                    <div>
                      — Ellen G. White, <cite className="not-italic font-medium text-[var(--ink)]">{currentQuote.source}</cite>
                      {currentQuote.yearWritten && <span className="ml-1 text-[var(--ink-muted)]">({currentQuote.yearWritten})</span>}
                    </div>

                    {currentQuote.verifiedUrl && (
                      <a
                        href={currentQuote.verifiedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-sans font-medium text-[var(--accent)] hover:underline shrink-0"
                        title={`Verify ${currentQuote.standardEgwCode} at Ellen G. White Estate`}
                      >
                        <span>Verify at egwwritings.org</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans text-[var(--ink-muted)]">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 size={12} /> Standard code: {currentQuote.standardEgwCode}
                    </span>
                    {currentQuote.originalDocument && (
                      <span className="hidden sm:inline">&middot; {currentQuote.originalDocument}</span>
                    )}
                  </div>
                </div>

                {/* Application Paragraph */}
                {currentQuote.applicationForCountryLiving && (
                  <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2">
                    <span className="text-[12px] font-sans font-semibold text-[var(--accent)]">
                      Homestead Application
                    </span>
                    <p className={cn('text-[var(--ink)]', fontConfig.body)}>
                      {currentQuote.applicationForCountryLiving}
                    </p>
                  </div>
                )}

                {/* Action Bar & Previous / Next */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={savedNotes[currentQuote.id] ? Check : Bookmark}
                      onClick={handleSaveToNotes}
                    >
                      {savedNotes[currentQuote.id] ? 'Saved to notes' : 'Save to notes'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={hasCopiedRef ? Check : Copy}
                      onClick={handleCopyReference}
                    >
                      {hasCopiedRef ? 'Copied' : 'Copy reference'}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={ChevronLeft}
                      onClick={handlePrevious}
                      disabled={safeIndex === 0}
                    >
                      Previous
                    </Button>
                    <span className="text-[12px] font-mono tabular-nums text-[var(--ink-muted)]">
                      {safeIndex + 1} / {filteredQuotes.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNext}
                      disabled={safeIndex >= filteredQuotes.length - 1}
                    >
                      <span>Next</span>
                      <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
