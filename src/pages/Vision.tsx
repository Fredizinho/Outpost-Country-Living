import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { EGW_QUOTES, QuoteCategory, Quote } from '@/data/content';
import { fetchVerifiedScriptureWithFallback } from '@/lib/apiClient';
import { PropheticTimeline1844 } from '@/components/vision/PropheticTimeline1844';
import { HomeSceneryBackground } from '@/components/home/HomeSceneryBackground';
import { CountryIcon } from '@/components/icons/CountryIcons';
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
} from 'lucide-react';

interface VerifiedScriptureResult {
  reference: string;
  translation_name: string;
  text: string;
  verifiedSource: string;
  verifiedUrl: string;
}

const CATEGORY_PRACTICAL_LINKS: Record<string, { label: string; to: string }> = {
  'Medical Missionary': { label: 'Sanitarium & Hydrotherapy', to: '/sanitarium' },
  'Sustenance & Diet': { label: 'Edenic Country Kitchen', to: '/kitchen' },
  'Education & Manual Training': { label: 'Avondale Youth Curriculum', to: '/blueprints?tab=education' },
  Children: { label: 'Family Homestead Curriculum', to: '/blueprints?tab=education' },
  'Physical Labor': { label: '3×3×3ft Orchard Pits', to: '/what?tab=orchard-pits' },
  Preparation: { label: 'Exodus Readiness Ledger', to: '/tracker' },
  Vision: { label: '28-District GIS Scout Map', to: '/scout-map' },
  'Mental Health': { label: '8 NEWSTART Laws', to: '/sanitarium' },
  'Spiritual Growth': { label: 'Morning Watch Altar', to: '/devotional' },
};

export default function Vision() {
  const [activeDesktopTab, setActiveDesktopTab] = useState<'prophecy-atlas' | 'egw-archive' | 'split-all'>('prophecy-atlas');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [liveScriptures, setLiveScriptures] = useState<Record<string, VerifiedScriptureResult>>({});
  const [loadingScriptureId, setLoadingScriptureId] = useState<string | null>(null);
  const [scriptureError, setScriptureError] = useState<Record<string, string>>({});
  const [savedQuoteIds, setSavedQuoteIds] = useState<Record<string, boolean>>({});

  const handleSaveQuoteToNotes = (quote: Quote) => {
    saveOfflineFieldNote(
      `egw-${quote.id}`,
      `${quote.title || quote.category} (${quote.egwCode || quote.source})`,
      `“${quote.text}” — ${quote.source}${
        quote.malawiOutpostApplication ? `\n\nMalawi Application: ${quote.malawiOutpostApplication}` : ''
      }`
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
    return EGW_QUOTES.filter((q) => {
      const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.text.toLowerCase().includes(query) ||
        q.source.toLowerCase().includes(query) ||
        (q.title && q.title.toLowerCase().includes(query)) ||
        (q.egwCode && q.egwCode.toLowerCase().includes(query)) ||
        (q.historicalContext && q.historicalContext.toLowerCase().includes(query)) ||
        (q.malawiOutpostApplication && q.malawiOutpostApplication.toLowerCase().includes(query)) ||
        (q.scriptureCompanion &&
          (q.scriptureCompanion.verse.toLowerCase().includes(query) ||
            q.scriptureCompanion.reference.toLowerCase().includes(query)))
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleCardDetail = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchVerifiedScripture = async (quote: Quote) => {
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
        [quote.id]: err?.message || 'Unable to reach live Bible API',
      }));
    } finally {
      setLoadingScriptureId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B1610] text-stone-800 dark:text-[#F7F4EC] pb-20 transition-colors">
      {/* Vector-Backed Hero Stage with Un-Squished Sanctuary Illustration */}
      <div className="relative pt-8 pb-6 px-6 overflow-hidden border-b border-stone-200 dark:border-white/10 bg-[#141D17] text-[#F7F4EC]">
        <HomeSceneryBackground activeScene="sanctuary" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#E6B655]">
                <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
                <span className="font-bold tracking-wider uppercase">
                  SPIRIT OF PROPHECY &amp; 1844 SANCTUARY ATLAS · {EGW_QUOTES.length} VERBATIM PASSAGES
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#F7F4EC] leading-[1.12]">
                Why We Leave the Cities: <span className="italic text-[#E6B655]">From 1844 to the Final Refuge</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">
                Explore 7 oil-painted prophetic epochs from October 22, 1844 to the Second Coming alongside verbatim Ellen G. White counsels on country living, natural remedies, and raising children in nature.
              </p>
            </div>

            {/* Right 4 Cols: Full-Proportion 1844 Sanctuary Vector Plate */}
            <div className="lg:col-span-4 rounded-2xl bg-stone-950/80 backdrop-blur-xl border border-amber-400/30 p-4 flex flex-col items-center justify-center shadow-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 mb-1.5">
                Daniel 8:14 · October 22, 1844
              </span>
              <CountryIcon
                name="prophecy-1844"
                className="w-full max-w-[240px] h-32 object-contain"
              />
            </div>
          </div>

          {/* Desktop Perspective Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-950/85 backdrop-blur-xl border border-white/15">
              <button
                type="button"
                onClick={() => setActiveDesktopTab('prophecy-atlas')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeDesktopTab === 'prophecy-atlas'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>01 · 1844 to Second Coming Illustrated Timeline</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDesktopTab('egw-archive')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeDesktopTab === 'egw-archive'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>02 · Searchable EGW Counsel Library ({EGW_QUOTES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDesktopTab('split-all')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeDesktopTab === 'split-all'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Open</span>
              </button>
            </div>

            <span className="hidden xl:inline text-xs font-mono text-stone-400">
              Official EGW Estate Reference Codes · Live KJV Scripture Verification
            </span>
          </div>
        </div>
      </div>

      {/* PERSPECTIVE 01: 1844 to Second Coming Interactive Prophetic Timeline & Vector Atlas */}
      {(activeDesktopTab === 'prophecy-atlas' || activeDesktopTab === 'split-all') && (
        <PropheticTimeline1844 />
      )}

      {/* PERSPECTIVE 02: Verbatim EGW Counsel Library */}
      {(activeDesktopTab === 'egw-archive' || activeDesktopTab === 'split-all') && (
        <div className="max-w-7xl mx-auto px-6 pt-8">
          {/* Search + Category Filter + Progressive Disclosure Control Bar */}
          <div className="bg-[#1C2820]/95 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl mb-6 flex flex-col gap-3.5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, book code (GC 422.1, MH 127.2, CL 9.6), or Scripture..."
                  className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-black/30 border border-white/15 text-[#F7F4EC] placeholder:text-white/40 text-xs focus:outline-none focus:border-[#C89B3C]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold uppercase text-[#E6B655] hover:text-white cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-white/60">
                  Showing {filteredQuotes.length} of {EGW_QUOTES.length}
                </span>
                <button
                  type="button"
                  onClick={() => setExpandAllDetails((prev) => !prev)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono font-bold text-[#E6B655] cursor-pointer transition-colors"
                >
                  {expandAllDetails ? 'Compact View' : 'Expand All Field Notes'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = selectedCategory === label;
                const count =
                  label === 'All'
                    ? EGW_QUOTES.length
                    : EGW_QUOTES.filter((q) => q.category === label).length;
                return (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C89B3C] text-[#141D17] shadow-xs'
                        : 'bg-white/[0.03] text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#141D17]' : 'text-[#C89B3C]'}`} />
                    <span>{label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                        isActive ? 'bg-[#141D17]/20 text-[#141D17]' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-Efficiency Horizontal Split-Card Archival Grid */}
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

                return (
                  <motion.article
                    key={quote.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, delay: Math.min(idx * 0.02, 0.15) }}
                    className="bg-white dark:bg-[#132018]/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200/90 dark:border-white/10 hover:border-amber-500/60 transition-all flex flex-col justify-between gap-4 relative overflow-hidden group shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Left Thumbnail Plate (Un-Squished, Fixed Aspect Ratio) */}
                      {quote.image && (
                        <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden border border-stone-200 dark:border-white/15 shrink-0 relative bg-stone-900">
                          <img
                            src={quote.image}
                            alt={quote.imageAlt || quote.title || 'Spirit of Prophecy Illustration'}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          {quote.egwCode && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-[#C89B3C]/40 text-[10px] font-mono font-bold text-[#E6B655]">
                              {quote.egwCode}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Right Quote Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-[11px] font-mono">
                          <span className="text-emerald-800 dark:text-[#E6B655] font-bold uppercase tracking-wider">
                            {quote.category}
                          </span>
                          <span className="text-stone-500 dark:text-white/50">
                            {quote.egwCode} {quote.yearWritten ? `· ${quote.yearWritten}` : ''}
                          </span>
                        </div>

                        {quote.title && (
                          <h2 className="text-base md:text-lg font-serif font-bold text-stone-900 dark:text-[#F7F4EC] mb-1.5 leading-snug">
                            {quote.title}
                          </h2>
                        )}

                        <blockquote className="text-sm md:text-base font-serif text-stone-700 dark:text-stone-200 leading-relaxed italic">
                          “{quote.text}”
                        </blockquote>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {/* Compact Scripture Bar */}
                      {quote.scriptureCompanion && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-[#C89B3C]/[0.07] border border-amber-200 dark:border-[#C89B3C]/25">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-[#E6B655] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> {quote.scriptureCompanion.reference}
                            </span>
                            <button
                              onClick={() => fetchVerifiedScripture(quote)}
                              disabled={isLoadingVerse}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-200/70 dark:bg-[#C89B3C]/20 hover:bg-amber-300 dark:hover:bg-[#C89B3C]/35 text-stone-900 dark:text-[#F7F4EC] text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <RefreshCw className={`w-2.5 h-2.5 ${isLoadingVerse ? 'animate-spin' : ''}`} />
                              {liveVerse ? 'KJV Verified' : 'Verify KJV'}
                            </button>
                          </div>

                          <p className="text-xs text-stone-700 dark:text-white/85 italic leading-snug mt-1">
                            “{liveVerse ? liveVerse.text : quote.scriptureCompanion.verse}”
                          </p>
                          {verseErr && <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">{verseErr}</p>}
                        </div>
                      )}

                      {/* Progressive Disclosure Drawer + Study Actions + Footer Citation */}
                      <div className="pt-2.5 border-t border-stone-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-emerald-900 dark:text-[#E6B655] font-semibold truncate">
                          {quote.source}
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveQuoteToNotes(quote)}
                            title="Save passage to your personal Field Notes (⌘I)"
                            className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 hover:bg-amber-100 dark:hover:bg-white/10 border border-stone-200 dark:border-white/15 text-[11px] font-mono font-semibold text-stone-700 dark:text-stone-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {isSavedToNotes ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Saved to Notes</span>
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-3 h-3 text-amber-600 dark:text-[#E6B655]" />
                                <span>Pin Note</span>
                              </>
                            )}
                          </button>

                          <Link
                            to={practicalLink.to}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-700/50 text-[11px] font-mono font-semibold text-emerald-900 dark:text-emerald-200 inline-flex items-center gap-1 transition-colors"
                          >
                            <span>{practicalLink.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>

                          {(quote.historicalContext || quote.malawiOutpostApplication) && (
                            <button
                              type="button"
                              onClick={() => toggleCardDetail(quote.id)}
                              className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-200 dark:border-white/15 text-[11px] font-mono font-semibold text-stone-700 dark:text-stone-200 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide' : 'Context'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3 h-3 text-amber-600 dark:text-[#E6B655]" />
                              ) : (
                                <ChevronDown className="w-3 h-3 text-amber-600 dark:text-[#E6B655]" />
                              )}
                            </button>
                          )}

                          {quote.verifiedUrl && (
                            <a
                              href={quote.verifiedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 hover:bg-[#C89B3C] text-stone-800 dark:text-white/85 hover:text-[#141D17] border border-stone-200 dark:border-white/15 hover:border-[#C89B3C] text-[11px] font-mono font-bold uppercase transition-all"
                            >
                              <span>EGW</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {quote.historicalContext && (
                            <div className="p-3 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200 dark:border-white/10">
                              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-[#E6B655] mb-0.5">
                                Archival Context
                              </div>
                              <p className="text-xs text-stone-700 dark:text-white/75 leading-relaxed">
                                {quote.historicalContext}
                              </p>
                            </div>
                          )}
                          {quote.malawiOutpostApplication && (
                            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-[#2E6F40]/15 border border-emerald-200 dark:border-[#2E6F40]/35">
                              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 dark:text-[#86EFAC] mb-0.5">
                                Malawi Homestead Application
                              </div>
                              <p className="text-xs text-stone-800 dark:text-white/85 leading-relaxed">
                                {quote.malawiOutpostApplication}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
