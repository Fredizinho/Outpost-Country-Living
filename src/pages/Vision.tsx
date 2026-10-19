import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  getAllQuotes,
  getVerifiedQuotes,
  getUnverifiedQuotes,
  VerifiedQuoteEntry,
  QuoteCategory,
} from '@/data/sources/quotes';
import { fetchVerifiedScriptureWithFallback } from '@/lib/apiClient';
import { PropheticTimeline1844 } from '@/components/vision/PropheticTimeline1844';
import { saveOfflineFieldNote } from '@/lib/offlineStorage';
import {
  ExternalLink,
  BookOpen,
  RefreshCw,
  Sparkles,
  Search,
  ShieldCheck,
  Compass,
  Quote as QuoteIcon,
  HeartHandshake,
  Hammer,
  Users,
  Sprout,
  Stethoscope,
  GraduationCap,
  Sun,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Check,
  ArrowRight,
  ChevronRight,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface VerifiedScriptureResult {
  reference: string;
  translation_name: string;
  text: string;
  verifiedSource: string;
  verifiedUrl: string;
}

const CATEGORY_PRACTICAL_LINKS: Record<string, { label: string; to: string }> = {
  'Medical Missionary': { label: 'Sanitarium & hydrotherapy', to: '/sanitarium' },
  'Sustenance & Diet': { label: 'Edenic country kitchen', to: '/kitchen' },
  'Education & Manual Training': { label: 'Avondale youth curriculum', to: '/blueprints?tab=education' },
  Children: { label: 'Family homestead curriculum', to: '/blueprints?tab=education' },
  'Physical Labor': { label: '3×3×3ft orchard pits', to: '/what?tab=orchard-pits' },
  Preparation: { label: 'Exodus readiness ledger', to: '/tracker' },
  Vision: { label: '28-district GIS scout map', to: '/scout-map' },
  'Mental Health': { label: '8 NEWSTART laws', to: '/sanitarium' },
  'Spiritual Growth': { label: 'Morning watch altar', to: '/devotional' },
};

export default function Vision() {
  const [activeDesktopTab, setActiveDesktopTab] = useState<'prophecy-atlas' | 'egw-archive' | 'split-all'>('prophecy-atlas');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [showLedgerAudit, setShowLedgerAudit] = useState(false);
  const [liveScriptures, setLiveScriptures] = useState<Record<string, VerifiedScriptureResult>>({});
  const [loadingScriptureId, setLoadingScriptureId] = useState<string | null>(null);
  const [scriptureError, setScriptureError] = useState<Record<string, string>>({});
  const [savedQuoteIds, setSavedQuoteIds] = useState<Record<string, boolean>>({});

  const allQuotes = useMemo(() => getAllQuotes(), []);
  const verifiedQuotes = useMemo(() => getVerifiedQuotes(), []);
  const unverifiedQuotes = useMemo(() => getUnverifiedQuotes(), []);

  // Quotes displayed based on audit toggle: if verified is 0 and audit is on, show all from store
  const activeQuotesSource = useMemo(() => {
    if (showLedgerAudit) {
      return allQuotes;
    }
    return verifiedQuotes;
  }, [showLedgerAudit, allQuotes, verifiedQuotes]);

  const handleSaveQuoteToNotes = (quote: VerifiedQuoteEntry) => {
    saveOfflineFieldNote(
      `egw-${quote.id}`,
      `${quote.title} (${quote.standardEgwCode})`,
      `“${quote.text}” — ${quote.source}\n\nApplication for country living:\n${quote.applicationForCountryLiving}\n\nAdventist perspective:\n${quote.adventistPerspective}`
    );
    setSavedQuoteIds((prev) => ({ ...prev, [quote.id]: true }));
  };

  const categories: { label: QuoteCategory | 'All'; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'All', icon: QuoteIcon },
    { label: 'Vision', icon: Compass },
    { label: 'Preparation', icon: ShieldCheck },
    { label: 'Education & Manual Training', icon: GraduationCap },
    { label: 'Sustenance & Diet', icon: Sprout },
    { label: 'Medical Missionary', icon: Stethoscope },
    { label: 'Children', icon: Users },
    { label: 'Physical Labor', icon: Hammer },
    { label: 'Mental Health', icon: HeartHandshake },
    { label: 'Spiritual Growth', icon: Sun },
  ];

  const filteredQuotes = useMemo(() => {
    return activeQuotesSource.filter((q) => {
      const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.text.toLowerCase().includes(query) ||
        q.source.toLowerCase().includes(query) ||
        q.title.toLowerCase().includes(query) ||
        q.standardEgwCode.toLowerCase().includes(query) ||
        q.summary.toLowerCase().includes(query) ||
        q.applicationForCountryLiving.toLowerCase().includes(query) ||
        q.adventistPerspective.toLowerCase().includes(query) ||
        (q.scriptureCompanion &&
          (q.scriptureCompanion.verse.toLowerCase().includes(query) ||
            q.scriptureCompanion.reference.toLowerCase().includes(query)))
      );
    });
  }, [activeQuotesSource, selectedCategory, searchQuery]);

  const toggleCardDetail = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchVerifiedScripture = async (quote: VerifiedQuoteEntry) => {
    if (!quote.scriptureCompanion?.reference) return;
    const refPart = quote.scriptureCompanion.reference.split(';')[0].trim();
    if (!refPart) return;

    setLoadingScriptureId(quote.id);
    setScriptureError((prev) => ({ ...prev, [quote.id]: '' }));
    try {
      const data = await fetchVerifiedScriptureWithFallback(
        refPart,
        quote.scriptureCompanion.verse
      );
      setLiveScriptures((prev) => ({ ...prev, [quote.id]: data }));
    } catch (err: any) {
      setScriptureError((prev) => ({
        ...prev,
        [quote.id]: err?.message || 'Unable to fetch scripture verification',
      }));
    } finally {
      setLoadingScriptureId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] dark:bg-[#0E1712] text-[#1F2A22] dark:text-[#F6F1E7] pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* ====================================================================
            STANDARD PAGE HEADER (Fraunces title, one-line summary, chips)
        ==================================================================== */}
        <header className="bg-[#FFFDF8] dark:bg-[#17241C] rounded-2xl p-5 sm:p-7 border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-5 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#2C4A3E] dark:text-[#88B896] font-medium">
                <Sparkles size={14} className="text-[#C25E2E] dark:text-[#D3672E]" />
                <span>Prophetic sanctuary foundations and Ellen G. White counsel</span>
                <span aria-hidden="true" className="text-[#A2B3A6]">
                  ·
                </span>
                <span className="font-mono text-xs">Daniel 8:14 · 1844 to consummation</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1F2A22] dark:text-[#F6F1E7] tracking-tight">
                Why we leave the cities: from 1844 to the final refuge
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#C5D3C8] max-w-3xl leading-relaxed">
                Explore seven prophetic milestones from 1844 to the second coming alongside verified Ellen G. White counsels on country living and spiritual refuge.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                to="/scout-map"
                className="bg-[#C25E2E] dark:bg-[#D3672E] hover:opacity-90 text-white font-mono font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Compass size={14} /> 28-district GIS map <ChevronRight size={13} />
              </Link>
              <Link
                to="/kitchen"
                className="bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] text-[#1F2A22] dark:text-[#F6F1E7] border border-[#E4DCCB] dark:border-[#283C30] font-mono text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
              >
                Edenic kitchen
              </Link>
            </div>
          </div>

          {/* Metadata Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30] text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#5A6458] dark:text-[#C5D3C8] font-medium">
              Standard EGW reference codes
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#5A6458] dark:text-[#C5D3C8] font-medium">
              Scripture from King James Version
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#5A6458] dark:text-[#C5D3C8] font-medium">
              7 prophetic milestones · 1844 to consummation
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#2C4A3E] dark:text-[#88B896] font-mono text-xs font-semibold">
              {allQuotes.length} quotes in verification ledger
            </span>
          </div>

          {/* Perspective Switcher Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E4DCCB] dark:border-[#283C30]">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
              <button
                type="button"
                onClick={() => setActiveDesktopTab('prophecy-atlas')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                  activeDesktopTab === 'prophecy-atlas'
                    ? 'bg-[#2C4A3E] text-white shadow-xs'
                    : 'text-[#5A6458] dark:text-[#C5D3C8] hover:text-[#1F2A22] dark:hover:text-white'
                )}
              >
                <Sparkles size={13} />
                <span>01. 1844 to second coming timeline</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDesktopTab('egw-archive')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                  activeDesktopTab === 'egw-archive'
                    ? 'bg-[#2C4A3E] text-white shadow-xs'
                    : 'text-[#5A6458] dark:text-[#C5D3C8] hover:text-[#1F2A22] dark:hover:text-white'
                )}
              >
                <BookOpen size={13} />
                <span>02. Spirit of Prophecy archive ({verifiedQuotes.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDesktopTab('split-all')}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                  activeDesktopTab === 'split-all'
                    ? 'bg-[#2C4A3E] text-white shadow-xs'
                    : 'text-[#5A6458] dark:text-[#C5D3C8] hover:text-[#1F2A22] dark:hover:text-white'
                )}
              >
                <Layers size={13} />
                <span>All open</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLedgerAudit((prev) => !prev)}
                className={cn(
                  'px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer',
                  showLedgerAudit
                    ? 'bg-[#C25E2E]/10 dark:bg-[#C25E2E]/20 border-[#C25E2E] text-[#C25E2E] dark:text-[#E27C44]'
                    : 'bg-[#F6F1E7] dark:bg-[#0E1712] border-[#E4DCCB] dark:border-[#283C30] text-[#5A6458] dark:text-[#C5D3C8] hover:text-[#1F2A22] dark:hover:text-white'
                )}
                title="Toggle inspection of unverified quotes queued in QUOTES_TO_VERIFY.md"
              >
                {showLedgerAudit ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>
                  {showLedgerAudit ? 'Hide unverified ledger entries' : `Audit ledger (${unverifiedQuotes.length} pending)`}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* ====================================================================
            PERSPECTIVE 01: 1844 TO SECOND COMING TIMELINE & VECTOR ATLAS
        ==================================================================== */}
        {(activeDesktopTab === 'prophecy-atlas' || activeDesktopTab === 'split-all') && (
          <PropheticTimeline1844 />
        )}

        {/* ====================================================================
            PERSPECTIVE 02: SPIRIT OF PROPHECY COUNSEL ARCHIVE
        ==================================================================== */}
        {(activeDesktopTab === 'egw-archive' || activeDesktopTab === 'split-all') && (
          <div className="flex flex-col gap-6 pt-2">
            {/* Verification Status Ledger Banner */}
            {unverifiedQuotes.length > 0 && (
              <div className="rounded-2xl p-4 sm:p-5 bg-[#FFFDF8] dark:bg-[#132018] border border-[#E4DCCB] dark:border-[#283C30] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2C4A3E]/10 dark:bg-[#2C4A3E]/20 text-[#2C4A3E] dark:text-[#88B896] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1F2A22] dark:text-[#F6F1E7]">
                        Verified quote store initialized
                      </span>
                      <span className="px-2 py-0.2 rounded-md bg-[#2C4A3E]/10 dark:bg-[#2C4A3E]/20 text-[#2C4A3E] dark:text-[#88B896] text-caption font-mono font-bold">
                        src/data/sources/quotes.ts
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6458] dark:text-[#C5D3C8] leading-relaxed">
                      All Ellen G. White quotes have been moved out of component and content files into the central verified store. Each quote starts marked as <span className="font-mono text-xs font-bold text-[#C25E2E] dark:text-[#E27C44]">verifiedBy: null</span> to remain hidden from public views until verified in <span className="font-mono text-xs font-bold text-[#2C4A3E] dark:text-[#88B896]">QUOTES_TO_VERIFY.md</span>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowLedgerAudit((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2C4A3E] hover:bg-[#233B31] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {showLedgerAudit ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{showLedgerAudit ? 'Close audit preview' : 'Audit ledger entries'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Search + Category Filter Bar */}
            <div className="bg-[#FFFDF8] dark:bg-[#17241C] p-4 rounded-2xl border border-[#E4DCCB] dark:border-[#283C30] shadow-sm flex flex-col gap-3.5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#C25E2E] dark:text-[#D3672E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, standard code (GC 422.1, MH 127.2, CL 9.6), or Scripture..."
                    className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#F6F1E7] placeholder:text-[#5A6458] dark:placeholder:text-[#9FB3A4] text-xs focus:outline-none focus:border-[#C25E2E] dark:focus:border-[#D3672E] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-caption font-mono font-bold text-[#C25E2E] dark:text-[#D3672E] hover:opacity-80 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-[#5A6458] dark:text-[#9FB3A4]">
                    Showing {filteredQuotes.length} of {activeQuotesSource.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandAllDetails((prev) => !prev)}
                    className="px-3 py-1.5 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] border border-[#E4DCCB] dark:border-[#283C30] text-xs font-semibold text-[#1F2A22] dark:text-[#F6F1E7] cursor-pointer transition-colors"
                  >
                    {expandAllDetails ? 'Compact view' : 'Expand all directives'}
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categories.map(({ label, icon: Icon }) => {
                  const isActive = selectedCategory === label;
                  const count =
                    label === 'All'
                      ? activeQuotesSource.length
                      : activeQuotesSource.filter((q) => q.category === label).length;
                  return (
                    <button
                      key={label}
                      onClick={() => setSelectedCategory(label)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer',
                        isActive
                          ? 'bg-[#2C4A3E] text-white shadow-xs'
                          : 'bg-[#F6F1E7] dark:bg-[#0E1712] text-[#5A6458] dark:text-[#9FB3A4] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] hover:text-[#1F2A22] dark:hover:text-[#F6F1E7] border border-[#E4DCCB] dark:border-[#283C30]'
                      )}
                    >
                      <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-[#D4A034]' : 'text-[#5A6458] dark:text-[#9FB3A4]')} />
                      <span>{label}</span>
                      <span
                        className={cn(
                          'px-1.5 py-0.2 rounded font-mono text-caption',
                          isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#5A6458] dark:text-[#9FB3A4]'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Empty State / Hidden Unverified State */}
            {filteredQuotes.length === 0 && (
              <div className="rounded-3xl p-8 sm:p-12 bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] text-center flex flex-col items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#C25E2E]/10 dark:bg-[#C25E2E]/20 text-[#C25E2E] dark:text-[#E27C44] flex items-center justify-center">
                  <AlertCircle size={28} />
                </div>
                <div className="flex flex-col gap-1 max-w-lg">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F2A22] dark:text-[#F6F1E7]">
                    {activeQuotesSource.length === 0
                      ? 'Quotes pending verification in ledger'
                      : 'No quotes match your filter'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6458] dark:text-[#C5D3C8] leading-relaxed">
                    {activeQuotesSource.length === 0
                      ? `All ${unverifiedQuotes.length} Ellen G. White quotes are safely cataloged in src/data/sources/quotes.ts with verifiedBy: null. They will appear here once marked verified in QUOTES_TO_VERIFY.md.`
                      : 'Try broadening your search keywords or choosing a different category.'}
                  </p>
                </div>

                {activeQuotesSource.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setShowLedgerAudit(true)}
                    className="px-4 py-2 rounded-xl bg-[#2C4A3E] hover:bg-[#233B31] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Audit unverified ledger entries ({unverifiedQuotes.length})</span>
                  </button>
                )}
              </div>
            )}

            {/* Grid of Verified / Audited Quote Cards */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredQuotes.map((quote, idx) => {
                  const liveVerse = liveScriptures[quote.id];
                  const isLoadingVerse = loadingScriptureId === quote.id;
                  const verseErr = scriptureError[quote.id];
                  const isExpanded = expandAllDetails || !!expandedCards[quote.id];
                  const isSavedToNotes = Boolean(savedQuoteIds[quote.id]);
                  const practicalLink =
                    CATEGORY_PRACTICAL_LINKS[quote.category] || CATEGORY_PRACTICAL_LINKS['Vision'];
                  const isVerified = quote.verifiedBy !== null;

                  return (
                    <motion.article
                      key={quote.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22, delay: Math.min(idx * 0.02, 0.15) }}
                      className={cn(
                        'bg-[#FFFDF8] dark:bg-[#132018] p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 relative overflow-hidden shadow-xs text-[#1F2A22] dark:text-[#F6F1E7]',
                        isVerified
                          ? 'border-[#E4DCCB] dark:border-[#283C30] hover:border-[#2C4A3E] dark:hover:border-[#88B896]'
                          : 'border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C25E2E]/60'
                      )}
                    >
                      {/* Top Bar: Verification Status & Standard Codes */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#2C4A3E]/10 dark:bg-[#2C4A3E]/20 text-[#2C4A3E] dark:text-[#88B896] font-semibold text-caption">
                            {quote.category}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#1F2A22] dark:text-[#F6F1E7] bg-[#F6F1E7] dark:bg-[#0E1712] px-2 py-0.5 rounded-md border border-[#E4DCCB] dark:border-[#283C30]">
                            {quote.standardEgwCode}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 text-caption font-semibold text-[#2C4A3E] dark:text-[#88B896]">
                              <Check size={12} />
                              <span>Verified by {quote.verifiedBy}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-caption font-mono text-[#C25E2E] dark:text-[#E27C44] bg-[#C25E2E]/10 px-2 py-0.5 rounded-md">
                              <span>Pending verification</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Template: 1. Title & Quote Text */}
                      <div className="flex flex-col gap-2">
                        <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1F2A22] dark:text-[#F6F1E7] leading-snug">
                          {quote.title}
                        </h2>

                        <blockquote className="font-serif text-sm sm:text-base text-[#3E4D40] dark:text-[#D0DAD2] leading-relaxed italic border-l-2 border-[#C25E2E]/50 pl-3.5 my-1">
                          “{quote.text}”
                        </blockquote>

                        <span className="text-xs text-[#5A6458] dark:text-[#9FB3A4]">
                          {quote.source}
                        </span>
                      </div>

                      {/* Content Template: 2. Summary */}
                      <div className="flex flex-col gap-1 p-3 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
                        <span className="text-caption font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
                          Summary
                        </span>
                        <p className="text-xs text-[#1F2A22] dark:text-[#D0DAD2] leading-relaxed">
                          {quote.summary}
                        </p>
                      </div>

                      {/* Content Template: 3. Timeline */}
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
                        <span className="text-caption font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
                          Timeline
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#2C4A3E] dark:text-[#88B896]">
                          {quote.timeline}
                        </span>
                      </div>

                      {/* Content Template: 4. References & Scripture Source */}
                      {quote.scriptureCompanion && (
                        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#F6F1E7] dark:bg-[#0E1712] border border-[#E4DCCB] dark:border-[#283C30]">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-caption font-mono font-bold text-[#2C4A3E] dark:text-[#88B896] flex items-center gap-1">
                              <Sparkles size={12} className="text-[#C25E2E] dark:text-[#D3672E]" />
                              <span>Scripture from {quote.scriptureCompanion.sourceName}</span>
                              <span className="font-mono text-caption text-[#5A6458] dark:text-[#9FB3A4]">
                                · {quote.scriptureCompanion.reference}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => fetchVerifiedScripture(quote)}
                              disabled={isLoadingVerse}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFFDF8] dark:bg-[#132018] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] text-[#1F2A22] dark:text-[#F6F1E7] text-caption font-semibold transition-colors cursor-pointer disabled:opacity-50 border border-[#E4DCCB] dark:border-[#283C30]"
                            >
                              <RefreshCw className={cn('w-2.5 h-2.5', isLoadingVerse ? 'animate-spin' : '')} />
                              <span>{liveVerse ? 'Checked' : 'Verify text'}</span>
                            </button>
                          </div>

                          <p className="text-xs text-[#3E4D40] dark:text-[#D0DAD2] italic leading-snug">
                            “{liveVerse ? liveVerse.text : quote.scriptureCompanion.verse}”
                          </p>
                          {verseErr && (
                            <p className="text-caption text-[#C25E2E] dark:text-[#E27C44] mt-0.5">{verseErr}</p>
                          )}
                        </div>
                      )}

                      {/* Content Template: 5. Application for Country Living */}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#2C4A3E] dark:text-[#88B896]">
                          Application for country living
                        </span>
                        <p className="text-xs text-[#1F2A22] dark:text-[#D0DAD2] leading-relaxed">
                          {quote.applicationForCountryLiving}
                        </p>
                      </div>

                      {/* Content Template: 6. Adventist Perspective */}
                      <div className="flex flex-col gap-1 pt-2 border-t border-[#E4DCCB] dark:border-[#283C30]">
                        <span className="text-xs font-semibold text-[#5A6458] dark:text-[#9FB3A4]">
                          Adventist perspective
                        </span>
                        <p className="text-xs text-[#3E4D40] dark:text-[#B2C4B7] leading-relaxed">
                          {quote.adventistPerspective}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-2 border-t border-[#E4DCCB] dark:border-[#283C30] flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#5A6458] dark:text-[#9FB3A4]">
                          {quote.references.book} · {quote.references.pageOrSection}
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveQuoteToNotes(quote)}
                            title="Save passage to field notes"
                            className="px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#EAE2D2] dark:hover:bg-[#1F3325] border border-[#E4DCCB] dark:border-[#283C30] text-caption font-semibold text-[#1F2A22] dark:text-[#F6F1E7] inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {isSavedToNotes ? (
                              <>
                                <Check className="w-3 h-3 text-[#2C4A3E]" />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3 h-3 text-[#C25E2E] dark:text-[#D3672E]" />
                                <span>Save note</span>
                              </>
                            )}
                          </button>

                          <Link
                            to={practicalLink.to}
                            className="px-2.5 py-1 rounded-lg bg-[#2C4A3E]/10 dark:bg-[#2C4A3E]/20 hover:bg-[#2C4A3E]/20 dark:hover:bg-[#2C4A3E]/30 border border-[#2C4A3E]/30 dark:border-[#283C30] text-caption font-semibold text-[#1F2A22] dark:text-[#F6F1E7] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>{practicalLink.label}</span>
                            <ArrowRight className="w-3 h-3 text-[#C25E2E] dark:text-[#D3672E]" />
                          </Link>

                          {quote.verifiedUrl && (
                            <a
                              href={quote.verifiedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F6F1E7] dark:bg-[#0E1712] hover:bg-[#2C4A3E] text-[#1F2A22] dark:text-[#F6F1E7] hover:text-white dark:hover:text-white border border-[#E4DCCB] dark:border-[#283C30] text-caption font-semibold transition-colors"
                              title="Standard EGW reference writings archive"
                            >
                              <span>Archive</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
