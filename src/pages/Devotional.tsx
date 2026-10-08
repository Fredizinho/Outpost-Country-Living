import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  CheckCircle2,
  Clock,
  BookOpen,
  Compass,
  RotateCcw,
  Search,
  Quote,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { DailyDevotionalWidget } from '@/components/outpost/DailyDevotionalWidget';
import { DAILY_DEVOTIONALS, DailyDevotional } from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

interface FridayPrepItem {
  id: string;
  title: string;
  subtitle: string;
  counselRef: string;
}

const FRIDAY_PREP_CHECKLIST: FridayPrepItem[] = [
  {
    id: 'fp-bread',
    title: '01. Bake Unfermented Bread & Sabbath Meals',
    subtitle: 'Complete all baking and cooking on Friday morning so no kitchen fires are kindled on the Sabbath.',
    counselRef: 'Exodus 16:23 · 6T 355',
  },
  {
    id: 'fp-water',
    title: '02. Top Up Gravity Water Tank & Biosand Pitchers',
    subtitle: 'Ensure the header tank is full and 20L of filtered drinking water is drawn before sunset.',
    counselRef: 'Child Guidance, p. 528',
  },
  {
    id: 'fp-solar',
    title: '03. Verify Solar Battery Bank & Evening Lanterns',
    subtitle: 'Confirm LiFePO4 battery bank is at 95–100% state of charge by 3:00 PM Friday.',
    counselRef: 'Homestead Engineering',
  },
  {
    id: 'fp-tools',
    title: '04. Clean, Oil & Store All Hoes (Makhasu) & Tools',
    subtitle: 'Scrape red Katondo clay from hoes, wipe with oil, and lock workshop doors 1 hour before sunset.',
    counselRef: 'Education, p. 219',
  },
  {
    id: 'fp-garments',
    title: '05. Bathe & Lay Out Sabbath Garments',
    subtitle: 'Have all baths taken, boots brushed, and clean Sabbath clothing ready before the sun touches the western hills.',
    counselRef: 'Testimonies vol. 6, p. 355',
  },
  {
    id: 'fp-altar',
    title: '06. Gather at the Family Altar for Friday Vespers',
    subtitle: 'Welcome the Sabbath 20 minutes before sunset with hymns, thanksgiving, and KJV Scripture.',
    counselRef: 'Testimonies vol. 6, p. 356',
  },
];

// Approximate astronomical sunset time in Malawi (CAT / UTC+2) by month (0=Jan .. 11=Dec)
const MALAWI_SUNSET_BY_MONTH: Record<
  number,
  { north: string; central: string; south: string; guardCentral: string }
> = {
  0: { north: '18:16', central: '18:19', south: '18:23', guardCentral: '17:49' },
  1: { north: '18:12', central: '18:13', south: '18:15', guardCentral: '17:43' },
  2: { north: '17:59', central: '17:58', south: '17:57', guardCentral: '17:28' },
  3: { north: '17:43', central: '17:39', south: '17:36', guardCentral: '17:09' },
  4: { north: '17:34', central: '17:28', south: '17:22', guardCentral: '16:58' },
  5: { north: '17:35', central: '17:27', south: '17:20', guardCentral: '16:57' },
  6: { north: '17:41', central: '17:34', south: '17:28', guardCentral: '17:04' },
  7: { north: '17:46', central: '17:42', south: '17:38', guardCentral: '17:12' },
  8: { north: '17:47', central: '17:45', south: '17:43', guardCentral: '17:15' },
  9: { north: '17:49', central: '17:50', south: '17:51', guardCentral: '17:20' },
  10: { north: '17:58', central: '18:01', south: '18:04', guardCentral: '17:31' },
  11: { north: '18:11', central: '18:15', south: '18:19', guardCentral: '17:45' },
};

const FRIDAY_PREP_STORAGE_KEY = 'outpost_friday_prep_v1';

export default function Devotional() {
  const [checkedPrep, setCheckedPrep] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(FRIDAY_PREP_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { 'fp-bread': true, 'fp-water': true };
    } catch {
      return { 'fp-bread': true, 'fp-water': true };
    }
  });

  // Counsel Treasury Search and Filter
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentMonth = new Date().getMonth();
  const sunsetTimes = MALAWI_SUNSET_BY_MONTH[currentMonth] || MALAWI_SUNSET_BY_MONTH[9];
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long' });

  const togglePrep = (id: string) => {
    setCheckedPrep((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(FRIDAY_PREP_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetPrep = () => {
    setCheckedPrep({});
    try {
      localStorage.setItem(FRIDAY_PREP_STORAGE_KEY, JSON.stringify({}));
    } catch {}
  };

  const completedPrepCount = useMemo(
    () => FRIDAY_PREP_CHECKLIST.filter((i) => checkedPrep[i.id]).length,
    [checkedPrep]
  );

  const themes = useMemo(() => {
    const list = Array.from(new Set(DAILY_DEVOTIONALS.map((d) => d.theme)));
    return ['All', ...list];
  }, []);

  const filteredDevotionals = useMemo(() => {
    return DAILY_DEVOTIONALS.filter((d) => {
      const matchesTheme = selectedTheme === 'All' || d.theme === selectedTheme;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTheme;

      const matchesQuery =
        d.title.toLowerCase().includes(q) ||
        d.scripture.verse.toLowerCase().includes(q) ||
        d.scripture.reference.toLowerCase().includes(q) ||
        d.egwQuote.text.toLowerCase().includes(q) ||
        d.egwQuote.source.toLowerCase().includes(q) ||
        (d.egwQuote.egwCode && d.egwQuote.egwCode.toLowerCase().includes(q)) ||
        d.practicalReflection.toLowerCase().includes(q);

      return matchesTheme && matchesQuery;
    });
  }, [selectedTheme, searchQuery]);

  const handleCopyQuote = (item: DailyDevotional) => {
    const text = `“${item.egwQuote.text}”\n— Ellen G. White, ${item.egwQuote.source} (${item.egwQuote.egwCode || ''})\n\nScripture: ${item.scripture.reference} — "${item.scripture.verse}"\n\nOutpost Living Application:\n${item.practicalReflection}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#09150E] text-stone-800 dark:text-stone-100 flex flex-col pb-20 transition-colors">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-col gap-6">
        <header className="glass-depth-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-800 dark:text-amber-300 font-semibold">
              <span>Spirit of Prophecy, Sabbath Sunset &amp; Family Altar Treasury</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal">
                Quiet Morning Manna Before the Chickens Demand Breakfast
              </span>
            </div>
            <h1 className="serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              Morning Watch, Friday Preparation &amp; Country Devotionals
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/vision"
              className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-mono text-xs font-bold uppercase px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <BookOpen size={13} />
              <span>EGW Counsel Vault</span>
            </Link>
            <Link
              to="/tracker"
              className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>Readiness Ledger</span>
            </Link>
          </div>
        </header>

        {/* Sabbath Sunset & Friday Preparation Day Companion Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 5 Cols: Malawi Latitude Sunset Estimator */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#072013] to-stone-950 text-white border border-emerald-600/30 shadow-lg flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sun size={13} />
                  <span>MALAWI SABBATH EVE SUNSET ({monthName.toUpperCase()})</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-200">
                  CAT (UTC+2)
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-white">
                Guarding the Edges of the Sabbath (Lev. 23:32 · 6T 356)
              </h2>
              <p className="text-xs text-emerald-100/85 leading-relaxed">
                “Before the setting of the sun let the members of the family assemble to read God’s word, to sing and pray.” — <em>Testimonies vol. 6, p. 356</em>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                  North (Mzuzu)
                </span>
                <strong className="font-mono text-base sm:text-lg text-white block mt-0.5">
                  {sunsetTimes.north}
                </strong>
                <span className="text-[10px] text-stone-400">~11.4°S</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-center">
                <span className="text-[10px] font-mono uppercase text-amber-300 block">
                  Central (Dedza)
                </span>
                <strong className="font-mono text-base sm:text-lg text-amber-300 block mt-0.5">
                  {sunsetTimes.central}
                </strong>
                <span className="text-[10px] text-amber-200/80">~14.0°S</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                  South (Zomba)
                </span>
                <strong className="font-mono text-base sm:text-lg text-white block mt-0.5">
                  {sunsetTimes.south}
                </strong>
                <span className="text-[10px] text-stone-400">~15.8°S</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-300" />
                <span>Recommended Tool-Down &amp; Vespers Call:</span>
              </span>
              <strong className="text-amber-300">{sunsetTimes.guardCentral} CAT</strong>
            </div>
          </div>

          {/* Right 7 Cols: 6-Point Friday Preparation Day Checklist */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0D1D13] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200 dark:border-emerald-900/50">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  EXODUS 16:23 · FRIDAY PREPARATION DAY LEDGER
                </span>
                <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  Homestead Sabbath Eve Readiness ({completedPrepCount}/{FRIDAY_PREP_CHECKLIST.length} Complete)
                </h3>
              </div>

              <button
                type="button"
                onClick={resetPrep}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-xs font-mono text-stone-600 dark:text-stone-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>Reset for Next Friday</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FRIDAY_PREP_CHECKLIST.map((item) => {
                const isDone = Boolean(checkedPrep[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => togglePrep(item.id)}
                    className={cn(
                      'p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5',
                      isDone
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-400/60'
                        : 'bg-stone-50 dark:bg-black/25 border-stone-200/80 dark:border-white/10 hover:border-amber-400/60'
                    )}
                  >
                    <CheckCircle2
                      size={15}
                      className={cn(
                        'shrink-0 mt-0.5',
                        isDone
                          ? 'text-emerald-600 dark:text-amber-300'
                          : 'text-stone-300 dark:text-stone-600'
                      )}
                    />
                    <div className="min-w-0">
                      <strong className="text-xs font-bold text-stone-900 dark:text-white block leading-snug">
                        {item.title}
                      </strong>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-2">
                        {item.subtitle}
                      </p>
                      <span className="text-[10px] font-mono text-emerald-800 dark:text-amber-300/80 block mt-1">
                        {item.counselRef}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* The Daily Devotional & Personal Reflection Vault */}
        <div className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md">
          <DailyDevotionalWidget />
        </div>

        {/* SPIRIT OF PROPHECY COUNTRY LIVING COUNSEL EXPLORER */}
        <section className="bg-white dark:bg-[#0D1D13] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-emerald-900/60 shadow-md flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-emerald-900/40 pb-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-amber-300 font-bold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>Searchable Spirit of Prophecy Treasury</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                Ellen G. White Country Living &amp; Sanitarium Library
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl">
                Browse verified counsel passages from <em>Ministry of Healing</em>, <em>Education</em>, <em>Country Living</em>, and <em>Testimonies for the Church</em> with direct citations.
              </p>
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[260px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quotes, books, or codes..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-100 dark:bg-black/30 border border-stone-300 dark:border-emerald-900/60 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {themes.map((theme) => {
              const isActive = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    isActive
                      ? 'bg-emerald-950 dark:bg-amber-500 text-amber-300 dark:text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  )}
                >
                  {theme}
                </button>
              );
            })}
          </div>

          {/* Devotionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDevotionals.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-black/30 border border-stone-200/80 dark:border-emerald-900/40 flex flex-col justify-between gap-4 hover:border-amber-400/50 transition-colors"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-amber-300 font-bold bg-emerald-100/60 dark:bg-amber-400/10 px-2 py-0.5 rounded">
                        {item.theme}
                      </span>
                      {item.egwQuote.egwCode && (
                        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <ShieldCheck size={11} />
                          <span>{item.egwQuote.egwCode}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                      {item.title}
                    </h3>

                    <blockquote className="serif text-xs sm:text-sm text-stone-700 dark:text-stone-200 italic leading-relaxed border-l-2 border-amber-400 pl-3 my-1">
                      “{item.egwQuote.text}”
                    </blockquote>

                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 font-semibold block">
                      — Ellen G. White, {item.egwQuote.source}
                    </span>

                    <div className="p-3 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 mt-1">
                      <strong className="text-stone-900 dark:text-white block font-sans mb-0.5">
                        Scripture Anchor: {item.scripture.reference}
                      </strong>
                      <p className="italic text-[11px] text-stone-500 dark:text-stone-400">
                        "{item.scripture.verse}"
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      <strong>Homestead Application:</strong> {item.practicalReflection}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-200/60 dark:border-stone-800/80 text-xs">
                    {item.egwQuote.verifiedUrl ? (
                      <a
                        href={item.egwQuote.verifiedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 dark:text-amber-300 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>EGW Estate Verified</span>
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-stone-400">Verified Counsel</span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopyQuote(item)}
                      className="px-2.5 py-1 rounded-lg bg-stone-200 dark:bg-white/10 hover:bg-stone-300 dark:hover:bg-white/20 text-stone-800 dark:text-stone-200 text-xs font-mono inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{isCopied ? 'Copied' : 'Copy Quote'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDevotionals.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-stone-500">
              No counsel found matching "{searchQuery}". Try searching for words like "garden", "city", "water", or "education".
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
