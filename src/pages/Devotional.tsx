import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Bookmark,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  Sun,
  RotateCcw,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { DAILY_DEVOTIONALS, DailyDevotional } from '@/data/outpostFourPillarsData';
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

interface FridayPrepItem {
  id: string;
  title: string;
  subtitle: string;
  counselRef: string;
}

const FRIDAY_PREP_CHECKLIST: FridayPrepItem[] = [
  {
    id: 'fp-bread',
    title: 'Bake unfermented bread and prepare Sabbath meals',
    subtitle: 'Complete all cooking and baking before Friday sundown so kitchen fires rest on the Sabbath hours.',
    counselRef: 'Exodus 16:23 · Testimonies vol. 6, p. 355'
  },
  {
    id: 'fp-water',
    title: 'Fill gravity water tank and biosand filter pitchers',
    subtitle: 'Ensure header storage is full and 20L of drinking water is settled before sunset.',
    counselRef: 'Child Guidance, p. 528'
  },
  {
    id: 'fp-solar',
    title: 'Verify battery bank charge and trim evening lanterns',
    subtitle: 'Confirm energy bank reaches top of charge by mid-afternoon and evening lamps are ready.',
    counselRef: 'Homestead Stewardship'
  },
  {
    id: 'fp-tools',
    title: 'Clean, oil, and store hoes and field implements',
    subtitle: 'Scrape soil from hoes, oil blades, and close the workshop before the sun descends.',
    counselRef: 'Education, p. 219'
  },
  {
    id: 'fp-garments',
    title: 'Bathing and Sabbath garments in order',
    subtitle: 'Complete all personal grooming and have Sabbath attire prepared before dusk.',
    counselRef: 'Testimonies vol. 6, p. 355'
  },
  {
    id: 'fp-altar',
    title: 'Gather for family vespers before sunset',
    subtitle: 'Welcome the Sabbath hours with family worship, hymns of praise, and Scripture reading.',
    counselRef: 'Testimonies vol. 6, p. 356'
  }
];

const FRIDAY_PREP_STORAGE_KEY = 'outpost_friday_prep_v1';

export default function Devotional() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const initialIndex = useMemo(() => {
    const p = searchParams.get('index');
    if (p && !isNaN(Number(p))) {
      return Math.max(0, Math.min(DAILY_DEVOTIONALS.length - 1, Number(p)));
    }
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    return dayOfYear % DAILY_DEVOTIONALS.length;
  }, [searchParams]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [showFridayPrep, setShowFridayPrep] = useState(false);

  const [checkedPrep, setCheckedPrep] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(FRIDAY_PREP_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { 'fp-bread': true, 'fp-water': true };
    } catch {
      return { 'fp-bread': true, 'fp-water': true };
    }
  });

  const togglePrep = (id: string) => {
    setCheckedPrep((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(FRIDAY_PREP_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const themes = useMemo(() => {
    const list = Array.from(new Set(DAILY_DEVOTIONALS.map((d) => d.theme)));
    return ['All', ...list];
  }, []);

  const filteredDevotionals = useMemo(() => {
    return DAILY_DEVOTIONALS.filter((d) => {
      const matchesTheme = selectedTheme === 'All' || d.theme === selectedTheme;
      if (!matchesTheme) return false;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.scripture.verse.toLowerCase().includes(q) ||
        d.scripture.reference.toLowerCase().includes(q) ||
        d.egwQuote.text.toLowerCase().includes(q) ||
        d.egwQuote.source.toLowerCase().includes(q) ||
        (d.egwQuote.egwCode && d.egwQuote.egwCode.toLowerCase().includes(q)) ||
        d.practicalReflection.toLowerCase().includes(q)
      );
    });
  }, [selectedTheme, searchQuery]);

  const safeIndex = filteredDevotionals.length > 0 ? Math.min(currentIndex, filteredDevotionals.length - 1) : 0;
  const currentDevotional: DailyDevotional | undefined = filteredDevotionals[safeIndex];

  const handleSizeChange = (size: ReadingSize) => {
    setReadingSize(size);
    try {
      localStorage.setItem('outpost_reading_size', size);
    } catch {}
  };

  const handleNext = () => {
    if (safeIndex < filteredDevotionals.length - 1) {
      setCurrentIndex(safeIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const handleSaveToNotes = () => {
    if (!currentDevotional) return;
    saveOfflineFieldNote(
      `devotional-${currentDevotional.id}`,
      `${currentDevotional.title} (${currentDevotional.scripture.reference})`,
      `Scripture: ${currentDevotional.scripture.reference}\n“${currentDevotional.scripture.verse}”\n\nCounsel:\n“${currentDevotional.egwQuote.text}”\n— Ellen G. White, ${currentDevotional.egwQuote.source} (${currentDevotional.egwQuote.egwCode || ''})\n\nApplication:\n${currentDevotional.practicalReflection}\n\nPrayer:\n${currentDevotional.prayerPrompt}`
    );
    setSavedNotes((prev) => ({ ...prev, [currentDevotional.id]: true }));
    toast({
      message: 'Devotional saved to local field notes',
      variant: 'success'
    });
  };

  const handleCopyReference = async () => {
    if (!currentDevotional) return;
    const textToCopy = `${currentDevotional.scripture.reference} · “${currentDevotional.scripture.verse}”\n\n“${currentDevotional.egwQuote.text}”\n— Ellen G. White, ${currentDevotional.egwQuote.source} (${currentDevotional.egwQuote.egwCode || ''})`;
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
          title="Morning watch & country living devotionals"
          eyebrow="Family Altar Treasury"
          summary="Daily devotional readings pairing Scripture anchors with verified Spirit of Prophecy counsel for rural homesteader character and prayer."
          chips={
            <>
              <Badge status="Verified" />
              <span className="text-[12px] text-[var(--ink-muted)]">
                {DAILY_DEVOTIONALS.length} daily readings
              </span>
            </>
          }
        />

        {/* Reader Toolbar: Reading Size */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)]">
            <BookOpen size={15} className="text-[var(--accent)]" />
            <span>Devotional reading mode</span>
          </div>

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
        </div>

        {/* ====================================================================
           FOCUSED READING EXPERIENCE: SINGLE COLUMN UP TO 70 CHARACTERS
        ==================================================================== */}
        <div className="flex flex-col gap-6">
          {/* Controls: Theme & Search */}
          <div className="max-w-[70ch] mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-[13px]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <select
                value={selectedTheme}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                  setCurrentIndex(0);
                }}
                className="h-8 px-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[13px] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {themes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All devotional themes' : t}
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
                placeholder="Search readings..."
                className="w-full h-8 pl-8 pr-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-control)] text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              />
            </div>
          </div>

          {filteredDevotionals.length === 0 ? (
            <div className="max-w-[70ch] mx-auto w-full p-8 text-center text-[13px] text-[var(--ink-muted)] border border-dashed border-[var(--border)] rounded-[var(--radius-card)]">
              No devotionals match your search. Clear search or select another theme.
            </div>
          ) : currentDevotional ? (
            <article className="max-w-[70ch] mx-auto w-full flex flex-col gap-6 py-2">
              {/* Meta Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-[12px] text-[var(--ink-muted)]">
                <span>
                  {currentDevotional.theme} &middot; Reading {safeIndex + 1} of {filteredDevotionals.length}
                </span>
                {currentDevotional.egwQuote.egwCode && (
                  <span className="font-mono text-[11px] font-medium text-[var(--ink-muted)]">
                    {currentDevotional.egwQuote.egwCode}
                  </span>
                )}
              </div>

              {/* Fraunces Title */}
              <h2 className={cn('font-serif font-bold text-[var(--ink)] tracking-tight', fontConfig.heading)}>
                {currentDevotional.title}
              </h2>

              {/* Quiet Scripture Block with Reference Above */}
              <div className="flex flex-col gap-1.5 my-1">
                <span className="text-[12px] font-sans text-[var(--ink-muted)] font-medium">
                  Scripture: {currentDevotional.scripture.reference}
                </span>
                <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border-l-2 border-[var(--border)] text-[var(--ink)] italic leading-relaxed">
                  “{currentDevotional.scripture.verse}”
                </div>
              </div>

              {/* Counsel Quotation */}
              <div className="flex flex-col gap-3 my-2">
                <blockquote className={cn('font-serif italic text-[var(--ink)]', fontConfig.quote)}>
                  “{currentDevotional.egwQuote.text}”
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--border)] text-[13px] text-[var(--ink-muted)] font-sans">
                  <div>
                    — Ellen G. White, <cite className="not-italic font-medium text-[var(--ink)]">{currentDevotional.egwQuote.source}</cite>
                  </div>

                  {currentDevotional.egwQuote.verifiedUrl && (
                    <a
                      href={currentDevotional.egwQuote.verifiedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-sans font-medium text-[var(--accent)] hover:underline shrink-0"
                      title="Verify source text at Ellen G. White Estate"
                    >
                      <span>Verify at egwwritings.org</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {currentDevotional.egwQuote.egwCode && (
                  <div className="flex items-center gap-2 text-[11px] font-sans text-[var(--ink-muted)]">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 size={12} /> Standard citation: {currentDevotional.egwQuote.egwCode}
                    </span>
                    {currentDevotional.egwQuote.book && (
                      <span className="hidden sm:inline">&middot; {currentDevotional.egwQuote.book}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Practical Reflection */}
              <div className="p-4 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2">
                <span className="text-[12px] font-sans font-semibold text-[var(--accent)]">
                  Homestead Reflection
                </span>
                <p className={cn('text-[var(--ink)]', fontConfig.body)}>
                  {currentDevotional.practicalReflection}
                </p>
              </div>

              {/* Prayer Prompt */}
              {currentDevotional.prayerPrompt && (
                <div className="p-4 rounded-[var(--radius-card)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1.5">
                  <span className="text-[11px] font-sans font-semibold text-[var(--ink-muted)] uppercase tracking-wide">
                    Family Altar Prayer
                  </span>
                  <p className="text-[13px] text-[var(--ink)] italic leading-relaxed">
                    “{currentDevotional.prayerPrompt}”
                  </p>
                </div>
              )}

              {/* Action Bar & Previous / Next */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={savedNotes[currentDevotional.id] ? Check : Bookmark}
                    onClick={handleSaveToNotes}
                  >
                    {savedNotes[currentDevotional.id] ? 'Saved to notes' : 'Save to notes'}
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
                    {safeIndex + 1} / {filteredDevotionals.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={safeIndex >= filteredDevotionals.length - 1}
                  >
                    <span>Next</span>
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            </article>
          ) : null}

          {/* Friday Preparation Companion Section (Collapsible) */}
          <div className="max-w-[70ch] mx-auto w-full mt-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowFridayPrep((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[var(--ground)]/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sun size={16} className="text-[var(--accent)]" />
                <span className="font-serif text-[16px] font-semibold text-[var(--ink)]">
                  Friday preparation day companion (Exodus 16:23)
                </span>
              </div>
              <ChevronDown
                size={16}
                className={cn('text-[var(--ink-muted)] transition-transform duration-200', showFridayPrep && 'rotate-180')}
              />
            </button>

            {showFridayPrep && (
              <div className="p-5 pt-0 border-t border-[var(--border)] flex flex-col gap-3">
                <p className="text-[13px] text-[var(--ink-muted)] pt-3 leading-relaxed">
                  “Before the setting of the sun let the members of the family assemble to read God’s word, to sing and pray.” — <em>Testimonies vol. 6, p. 356</em>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {FRIDAY_PREP_CHECKLIST.map((item) => {
                    const isDone = Boolean(checkedPrep[item.id]);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => togglePrep(item.id)}
                        className={cn(
                          'p-3 rounded-[var(--radius-control)] border text-left transition-all cursor-pointer flex items-start gap-2.5',
                          isDone
                            ? 'bg-[var(--surface)] border-[var(--border)] opacity-85'
                            : 'bg-[var(--ground)] border-[var(--border)] hover:border-[var(--accent)]'
                        )}
                      >
                        <CheckCircle2
                          size={15}
                          className={cn(
                            'shrink-0 mt-0.5',
                            isDone ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)]/50'
                          )}
                        />
                        <div className="min-w-0">
                          <strong className={cn('text-[13px] font-sans font-medium block text-[var(--ink)]', isDone && 'line-through text-[var(--ink-muted)]')}>
                            {item.title}
                          </strong>
                          <span className="text-[11px] font-sans text-[var(--ink-muted)] block mt-0.5">
                            {item.counselRef}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
