import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EGW_QUOTES, QuoteCategory, Quote } from '@/data/content';
import { COUNTRY_IMAGES } from '@/assets/images';
import { fetchVerifiedScriptureWithFallback } from '@/lib/apiClient';
import { PropheticTimeline1844 } from '@/components/vision/PropheticTimeline1844';
import {
  ExternalLink,
  BookOpen,
  CheckCircle2,
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
} from 'lucide-react';

interface VerifiedScriptureResult {
  reference: string;
  translation_name: string;
  text: string;
  verifiedSource: string;
  verifiedUrl: string;
}

export default function Vision() {
  const [activeDesktopTab, setActiveDesktopTab] = useState<'prophecy-atlas' | 'egw-archive' | 'split-all'>('prophecy-atlas');
  const [selectedCategory, setSelectedCategory] = useState<QuoteCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [expandAllDetails, setExpandAllDetails] = useState(false);
  const [liveScriptures, setLiveScriptures] = useState<Record<string, VerifiedScriptureResult>>({});
  const [loadingScriptureId, setLoadingScriptureId] = useState<string | null>(null);
  const [scriptureError, setScriptureError] = useState<Record<string, string>>({});

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
    <div className="min-h-screen bg-[#141D17] text-[#F7F4EC] pb-20 selection:bg-[#C89B3C]/30 selection:text-[#F7F4EC]">
      {/* Compact Desktop Command Header */}
      <div className="relative pt-8 pb-7 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={COUNTRY_IMAGES.malawiHomesteadSanctuary}
            alt="Spirit of Prophecy Counsel & Country Living Vision"
            className="w-full h-full object-cover opacity-15 scale-105 filter saturate-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141D17]/85 via-[#141D17]/95 to-[#141D17]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/15 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#E6B655]">
                EGW Estate Verbatim Vault · {EGW_QUOTES.length} Passages · 7 End-Time Plates
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#F7F4EC]">
              The Inspired <span className="italic text-[#E6B655]">Blueprint</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
              1844 Sanctuary Judgment chart, Three Angels’ proclamation, country living directives, and verbatim EGW citations with live KJV verification.
            </p>
          </div>

          {/* Desktop Perspective Switcher Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c140f]/90 border border-white/15 shrink-0">
            <button
              type="button"
              onClick={() => setActiveDesktopTab('prophecy-atlas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeDesktopTab === 'prophecy-atlas'
                  ? 'bg-[#C89B3C] text-[#141D17] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 · 1844 Prophetic Atlas</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDesktopTab('egw-archive')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeDesktopTab === 'egw-archive'
                  ? 'bg-[#C89B3C] text-[#141D17] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>02 · Verbatim EGW Vault ({EGW_QUOTES.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDesktopTab('split-all')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDesktopTab === 'split-all'
                  ? 'bg-[#C89B3C] text-[#141D17] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Open</span>
            </button>
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
          <div className="bg-[#1C2820]/95 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl mb-8 flex flex-col gap-3.5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword, book code (GC 422.1, MH 127.2, CL 9.6), or Scripture..."
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
                  {expandAllDetails ? 'Compact Cards' : 'Expand All Context'}
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

          {/* High-Density Archival Quote Grid with Progressive Disclosure */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredQuotes.map((quote, idx) => {
                const liveVerse = liveScriptures[quote.id];
                const isLoadingVerse = loadingScriptureId === quote.id;
                const verseErr = scriptureError[quote.id];
                const isExpanded = expandAllDetails || !!expandedCards[quote.id];

                return (
                  <motion.article
                    key={quote.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2) }}
                    className="bg-white/[0.03] backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#C89B3C]/40 transition-all flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div className="relative z-10">
                      {/* Illustrated Banner */}
                      {quote.image && (
                        <div className="mb-4 rounded-xl overflow-hidden border border-white/15 h-40 relative bg-black/50">
                          <img
                            src={quote.image}
                            alt={quote.imageAlt || quote.title || 'Spirit of Prophecy Illustration'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#141D17] via-transparent to-transparent" />
                          {quote.theme && (
                            <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/75 border border-[#C89B3C]/40 text-[10px] font-mono font-bold uppercase tracking-wider text-[#E6B655]">
                              {quote.theme}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Top Metadata Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C89B3C]/15 text-[#E6B655] border border-[#C89B3C]/30">
                          {quote.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {quote.egwCode && (
                            <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-[#E6B655]">
                              {quote.egwCode}
                            </span>
                          )}
                          {quote.yearWritten && (
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                              {quote.yearWritten}
                            </span>
                          )}
                        </div>
                      </div>

                      {quote.title && (
                        <h2 className="text-lg md:text-xl font-serif font-bold text-[#E6B655] mb-2">
                          {quote.title}
                        </h2>
                      )}

                      {/* Verbatim EGW Quote */}
                      <blockquote className="text-base md:text-lg font-serif text-[#F7F4EC] leading-relaxed mb-4 italic">
                        “{quote.text}”
                      </blockquote>

                      {/* Scripture Companion Bar (Always visible, concise) */}
                      {quote.scriptureCompanion && (
                        <div className="mb-3 p-3 rounded-xl bg-[#C89B3C]/[0.07] border border-[#C89B3C]/25">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E6B655] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> {quote.scriptureCompanion.reference}
                            </span>
                            <button
                              onClick={() => fetchVerifiedScripture(quote)}
                              disabled={isLoadingVerse}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#C89B3C]/20 hover:bg-[#C89B3C]/35 text-[#F7F4EC] text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <RefreshCw className={`w-2.5 h-2.5 ${isLoadingVerse ? 'animate-spin' : ''}`} />
                              {liveVerse ? 'KJV Verified' : 'Verify KJV'}
                            </button>
                          </div>

                          {liveVerse ? (
                            <div className="text-xs font-serif italic text-[#F7F4EC] leading-relaxed">
                              “{liveVerse.text}”
                              <span className="block not-italic text-[10px] font-mono text-[#86EFAC] mt-1">
                                ✓ {liveVerse.reference} ({liveVerse.translation_name})
                              </span>
                            </div>
                          ) : (
                            <p className="text-xs text-white/80 italic leading-relaxed">
                              “{quote.scriptureCompanion.verse}”
                            </p>
                          )}
                          {verseErr && <p className="text-[11px] text-amber-300 mt-1">{verseErr}</p>}
                        </div>
                      )}

                      {/* Progressive Disclosure Drawer for Historical Context & Malawi Application */}
                      {(quote.historicalContext || quote.malawiOutpostApplication) && (
                        <div className="mb-3">
                          <button
                            type="button"
                            onClick={() => toggleCardDetail(quote.id)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-[11px] font-mono font-semibold text-white/80 cursor-pointer transition-colors"
                          >
                            <span>
                              {isExpanded
                                ? 'Hide Archival Context & Malawi Field Application'
                                : 'Inspect Archival Context & Malawi Field Application'}
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#E6B655]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#E6B655]" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2 grid grid-cols-1 gap-2.5">
                              {quote.historicalContext && (
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E6B655] mb-1 flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" /> Archival Context
                                  </div>
                                  <p className="text-xs text-white/75 leading-relaxed">
                                    {quote.historicalContext}
                                  </p>
                                </div>
                              )}
                              {quote.malawiOutpostApplication && (
                                <div className="p-3 rounded-xl bg-[#2E6F40]/15 border border-[#2E6F40]/35">
                                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#86EFAC] mb-1 flex items-center gap-1">
                                    <Compass className="w-3 h-3" /> Malawi Field Application
                                  </div>
                                  <p className="text-xs text-white/85 leading-relaxed">
                                    {quote.malawiOutpostApplication}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Citation & Official EGW Writings Link */}
                    <div className="relative z-10 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs text-[#E6B655] font-semibold">{quote.source}</div>
                        {quote.originalDocument && (
                          <div className="text-[10px] text-white/50 font-mono">{quote.originalDocument}</div>
                        )}
                      </div>

                      {quote.verifiedUrl && (
                        <a
                          href={quote.verifiedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C89B3C] text-white/85 hover:text-[#141D17] border border-white/15 hover:border-[#C89B3C] text-[11px] font-mono font-bold uppercase tracking-wider transition-all"
                        >
                          <span>EGW Estate</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
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
