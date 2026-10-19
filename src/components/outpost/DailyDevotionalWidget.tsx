import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DAILY_DEVOTIONALS } from '@/data/outpostFourPillarsData';
import { fetchVerifiedScriptureWithFallback } from '@/lib/apiClient';
import {
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Quote as QuoteIcon,
  Sun as SabbathRestIcon,
  BookOpen as SpiritualGrowthIcon,
  Sprout as EdenicDietIcon,
  Compass as SoilTestIcon,
  PenLine,
  Save
} from 'lucide-react';

const REFLECTIONS_STORAGE_KEY = 'outpost_devotional_reflections_v1';

interface DevotionalReflectionEntry {
  note: string;
  updatedAt: string;
}

export function DailyDevotionalWidget() {
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const initialIndex = dayOfYear % DAILY_DEVOTIONALS.length;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liveKjvText, setLiveKjvText] = useState<
    Record<string, { text: string; reference: string; source: string }>
  >({});
  const [verifyingScripture, setVerifyingScripture] = useState(false);

  // Personal & Family Prayer Reflection Journal persisted in local/backup vault
  const [reflections, setReflections] = useState<Record<string, DevotionalReflectionEntry>>(() => {
    try {
      const saved = localStorage.getItem(REFLECTIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [draftNote, setDraftNote] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const currentDevotional = DAILY_DEVOTIONALS[currentIndex];

  useEffect(() => {
    setDraftNote(reflections[currentDevotional.id]?.note || '');
    setSavedNotice(false);
  }, [currentDevotional.id, reflections]);

  const handleSaveReflection = () => {
    const updated: Record<string, DevotionalReflectionEntry> = {
      ...reflections,
      [currentDevotional.id]: {
        note: draftNote.trim(),
        updatedAt: new Date().toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      },
    };
    setReflections(updated);
    try {
      localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage quota errors
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_DEVOTIONALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DAILY_DEVOTIONALS.length) % DAILY_DEVOTIONALS.length);
  };

  const handleVerifyLiveScripture = async () => {
    const ref = currentDevotional.scripture.reference.split(';')[0].trim();
    setVerifyingScripture(true);
    try {
      const data = await fetchVerifiedScriptureWithFallback(
        ref,
        currentDevotional.scripture.verse
      );
      setLiveKjvText((prev) => ({
        ...prev,
        [currentDevotional.id]: {
          text: data.text,
          reference: data.reference,
          source: data.verifiedSource,
        },
      }));
    } catch {
      // Keep default text on offline fallback
    } finally {
      setVerifyingScripture(false);
    }
  };

  const verifiedVerse = liveKjvText[currentDevotional.id];
  const savedEntry = reflections[currentDevotional.id];

  return (
    <section className="py-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1C2A21] via-[#152019] to-[#0F1712] text-[#F7F4EC] p-6 sm:p-8 md:p-12 shadow-2xl border border-white/10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C89B3C]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#2E6F40]/15 blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#E6B655]">
                <SabbathRestIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.22em] text-[#E6B655]">
                  <span>Morning Watch & Country Counsel</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white/80">{currentDevotional.theme}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-normal text-white mt-0.5">
                  Daily Sanctuary Reflection
                </h3>
              </div>
            </div>

            {/* Day selector controls */}
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Previous devotional"
              >
                ← Prev
              </button>
              <span className="px-3 text-xs font-mono text-[#E6B655]">
                {currentIndex + 1} / {DAILY_DEVOTIONALS.length}
              </span>
              <button
                onClick={handleNext}
                className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Next devotional"
              >
                Next →
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentDevotional.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col gap-6"
            >
              <h4 className="text-2xl md:text-4xl font-serif font-normal text-[#F7F4EC] leading-tight">
                {currentDevotional.title}
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scripture Card with Live Verification */}
                <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2 text-[#86EFAC] text-xs font-bold uppercase tracking-widest">
                        <SpiritualGrowthIcon className="w-4 h-4" />
                        <span>The Sacred Word (KJV)</span>
                      </div>
                      <button
                        onClick={handleVerifyLiveScripture}
                        disabled={verifyingScripture}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C89B3C]/30 text-caption font-bold uppercase tracking-wider text-[#E6B655] transition-colors cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 ${verifyingScripture ? 'animate-spin' : ''}`} />
                        {verifiedVerse ? 'Verified Live' : 'Verify Live API'}
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-serif italic text-white/95 leading-relaxed mb-4">
                      “{verifiedVerse ? verifiedVerse.text : currentDevotional.scripture.verse}”
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#E6B655]">
                      — {verifiedVerse ? verifiedVerse.reference : currentDevotional.scripture.reference}
                    </div>
                    {verifiedVerse && (
                      <span className="inline-flex items-center gap-1 text-caption text-[#86EFAC] font-mono">
                        <CheckCircle2 className="w-3 h-3" /> {verifiedVerse.source}
                      </span>
                    )}
                  </div>
                </div>

                {/* Spirit of Prophecy Card */}
                <div className="bg-[#C89B3C]/[0.08] backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#C89B3C]/25 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2 text-[#E6B655] text-xs font-bold uppercase tracking-widest">
                        <QuoteIcon className="w-4 h-4" />
                        <span>Spirit of Prophecy Counsel</span>
                      </div>
                      {currentDevotional.egwQuote.egwCode && (
                        <span className="inline-flex items-center gap-1 text-caption font-mono text-[#E6B655]">
                          <ShieldCheck className="w-3 h-3" /> {currentDevotional.egwQuote.egwCode}
                        </span>
                      )}
                    </div>
                    <p className="text-base md:text-lg font-serif text-white/90 leading-relaxed mb-4">
                      “{currentDevotional.egwQuote.text}”
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#C89B3C]/20">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#E6B655]">
                      — Ellen G. White,{' '}
                      <span className="italic font-normal">{currentDevotional.egwQuote.source}</span>
                    </div>
                    {currentDevotional.egwQuote.verifiedUrl && (
                      <a
                        href={currentDevotional.egwQuote.verifiedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-caption font-bold uppercase tracking-wider text-white/80 hover:text-[#E6B655] transition-colors"
                      >
                        <span>EGW Estate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Practical Homestead Reflection & Prayer */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-black/25 rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#86EFAC]">
                    <SoilTestIcon className="w-4 h-4" />
                    <span>Homestead Application Today</span>
                  </div>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">
                    {currentDevotional.practicalReflection}
                  </p>
                </div>

                <div className="md:col-span-5 md:border-l border-white/10 md:pl-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E6B655]">
                    <EdenicDietIcon className="w-4 h-4" />
                    <span>Family Prayer Focus</span>
                  </div>
                  <p className="text-sm font-serif italic text-white/90 leading-relaxed">
                    “{currentDevotional.prayerPrompt}”
                  </p>
                </div>
              </div>

              {/* Personal & Family Reflection Journal Vault */}
              <div className="bg-white/[0.03] rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E6B655]">
                    <PenLine className="w-4 h-4" />
                    <span>Personal & Family Worship Journal</span>
                  </div>
                  {savedEntry?.updatedAt && (
                    <span className="text-caption font-mono text-white/60">
                      Last saved: {savedEntry.updatedAt}
                    </span>
                  )}
                </div>

                <textarea
                  rows={3}
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Record your family’s prayer requests, country-living impressions, or action steps from today’s reading (saved offline in your device vault)..."
                  className="w-full rounded-2xl bg-black/30 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C89B3C] transition-colors"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-caption text-white/50 font-mono">
                    Included automatically in Sanctuary JSON Backups
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveReflection}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C89B3C] hover:bg-[#d8ab4c] text-[#141D17] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {savedNotice ? (
                      <>
                        <CheckCircle2 size={16} strokeWidth={1.75} />
                        <span>Saved to Vault</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} strokeWidth={1.75} />
                        <span>Save Reflection</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
