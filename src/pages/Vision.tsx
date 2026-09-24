import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EGW_QUOTES, Quote } from '@/data/content';
import { 
  Book, Quote as QuoteIcon, Sparkles, Sprout, ArrowRight, 
  ShieldCheck, Heart, Leaf, Search, Copy, CheckCircle2, 
  Compass, Eye, Calendar, Info, Layers, Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { WhyCountryLivingFeaturette } from '@/components/home/WhyCountryLivingFeaturette';
import { COUNTRY_IMAGES } from '@/assets/images';
import { DailyDevotionalWidget } from '@/components/outpost/DailyDevotionalWidget';

export default function Vision() {
  const [filter, setFilter] = useState<'All' | 'Preparation' | 'Vision' | 'Children' | 'Physical Labor' | 'Mental Health' | 'Spiritual Growth'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const categories = ['All', 'Preparation', 'Vision', 'Children', 'Physical Labor', 'Mental Health', 'Spiritual Growth'];

  const filteredQuotes = EGW_QUOTES.filter(q => {
    const matchesCategory = filter === 'All' || q.category === filter;
    const matchesSearch = !searchQuery || 
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.title && q.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.theme && q.theme.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyQuote = async (quote: Quote) => {
    const text = `"${quote.text}" — ${quote.source} (Country Living Counsel & Foundations)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-6xl mx-auto flex flex-col gap-10">
      
      {/* ====================================================================
          1. HEADER BANNER: THE PROPHETIC VISION & BLUEPRINT
      ==================================================================== */}
      <header 
        className="bg-cover bg-center text-white rounded-[2.5rem] p-8 md:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.90), rgba(7, 24, 14, 0.86), rgba(4, 29, 16, 0.96)), url(${COUNTRY_IMAGES.mountainVista})`
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-emerald-500/15 to-transparent rounded-full -mr-40 -mt-40 pointer-events-none blur-3xl" />
        
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full font-mono font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 backdrop-blur-md">
            <Book size={13} className="text-amber-400" />
            <span>Spirit of Prophecy Blueprint</span>
          </span>
          <span className="text-emerald-300/60 text-xs hidden sm:inline">•</span>
          <span className="text-emerald-200/90 font-mono text-xs hidden sm:inline">
            Adapted Imagery & Historical Contexts
          </span>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] leading-tight">
            The Prophetic Vision & Blueprint
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed italic border-l-2 border-amber-400/80 pl-4 py-1">
            "The instruction has been given that we should move out of the cities to the country, where we can grow our own fruit and vegetables... As the siege of Jerusalem was a signal for flight, so the decrees ahead call us to country sanctuaries."
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 pt-2 border-t border-amber-500/20">
          <Link
            to="/where"
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sprout size={14} /> 
            <span>Land Scouting Matrix</span>
            <ArrowRight size={13} />
          </Link>

          <Link
            to="/tracker"
            className="bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all"
          >
            Exodus Checklist
          </Link>

          <Link
            to="/devotional"
            className="bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all ml-auto hidden sm:inline-flex items-center gap-1.5"
          >
            <Calendar size={13} />
            <span>Daily Manna Treasury</span>
          </Link>
        </div>
      </header>

      {/* ====================================================================
          2. FEATURED SPOTLIGHT: THE JERUSALEM SIEGE SIGNAL & THE CALL TO FLIGHT
      ==================================================================== */}
      <section className="relative rounded-[2.5rem] overflow-hidden border border-amber-500/40 shadow-xl bg-stone-900 text-white group">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Adapted Image Column: Jerusalem Siege */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[460px] overflow-hidden">
            <img 
              src={COUNTRY_IMAGES.jerusalemSiege} 
              alt="Historical dramatic portrayal of Roman armies besieging ancient Jerusalem with fortified city walls and legions"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950" />
            
            <div className="absolute top-4 left-4 bg-red-950/80 text-amber-300 border border-red-700/60 px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
              <ShieldCheck size={12} className="text-amber-400" />
              <span>Prophetic Signal Parallel</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-200/90 bg-stone-950/80 backdrop-blur-md p-3 rounded-2xl border border-stone-800">
              <span className="font-bold text-amber-400">Historical Blueprint:</span> The Roman retreat in AD 66 allowed Christians to flee to Pella, escaping the catastrophic AD 70 destruction.
            </div>
          </div>

          {/* Quote & Counsel Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6 bg-gradient-to-b from-[#0e1f15] to-[#08150e]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                  Key Prophetic Mandate • Preparation
                </span>
                <button
                  onClick={() => handleCopyQuote(EGW_QUOTES[0])}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase transition-all flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer active:scale-95"
                >
                  {copiedId === EGW_QUOTES[0].id ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedId === EGW_QUOTES[0].id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] leading-snug">
                The Siege of Jerusalem & The Flight to Mountain Sanctuaries
              </h2>

              <blockquote className="serif text-base sm:text-lg text-emerald-100/95 italic leading-relaxed border-l-3 border-amber-400/90 pl-4 py-1">
                "{EGW_QUOTES[0].text}"
              </blockquote>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-mono font-bold text-amber-400 uppercase tracking-wider">
                — Ellen G. White, {EGW_QUOTES[0].source}
              </span>
              <Link
                to="/where"
                className="text-emerald-300 hover:text-white font-mono font-bold flex items-center gap-1 transition-colors"
              >
                <span>Scout Highland Sanctuaries</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Daily Devotional & Spirit of Prophecy Reflection Widget */}
      <section>
        <DailyDevotionalWidget />
      </section>

      {/* Why Country Living Featurette */}
      <WhyCountryLivingFeaturette />

      {/* ====================================================================
          3. SEARCH & CATEGORY FILTER BAR
      ==================================================================== */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-3.5 text-emerald-800" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search counsel by keyword e.g. Jerusalem, siege, buying and selling, children, mental health, garden..."
            className="w-full bg-white border border-stone-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-800 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-stone-500 hover:text-stone-900 uppercase font-sans font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-xs active:scale-95 border cursor-pointer",
                    isSelected
                      ? "bg-emerald-900 text-amber-100 border-emerald-950 shadow-sm font-bold" 
                      : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-sans font-semibold text-stone-700 bg-stone-200/90 px-3 py-1.5 rounded-xl border border-stone-300">
            Showing {filteredQuotes.length} {filteredQuotes.length === 1 ? 'Statement with Adapted Visual' : 'Statements with Adapted Visuals'}
          </span>
        </div>
      </div>

      {/* ====================================================================
          4. RICH QUOTES CARDS GRID WITH ADAPTED EGW IMAGERY & CONTEXT
      ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredQuotes.map((quote) => (
            <motion.article
              layout
              key={quote.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-700/50 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Image Banner */}
              {quote.image && (
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-900">
                  <img
                    src={quote.image}
                    alt={quote.imageAlt || quote.title || quote.source}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-300 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-500/40 backdrop-blur-md">
                      {quote.category}
                    </span>
                  </div>

                  {/* Copy Button Over Image */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleCopyQuote(quote)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl text-[11px] font-sans font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer backdrop-blur-md shadow-xs active:scale-90",
                        copiedId === quote.id
                          ? "bg-emerald-700 border-emerald-600 text-white"
                          : "bg-stone-900/80 hover:bg-stone-900 text-stone-200 border-stone-700/80"
                      )}
                      title="Copy quote citation"
                    >
                      {copiedId === quote.id ? <CheckCircle2 size={12} className="text-white" /> : <Copy size={12} />}
                      <span>{copiedId === quote.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Title & Theme Banner in Image Base */}
                  <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-0.5">
                    {quote.title && (
                      <h3 className="serif font-bold text-lg text-white leading-tight drop-shadow-sm">
                        {quote.title}
                      </h3>
                    )}
                    {quote.theme && (
                      <span className="text-[11px] font-mono text-amber-300/90 font-medium">
                        Theme: {quote.theme}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-5">
                
                {/* Historical context note if present */}
                {quote.historicalContext && (
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-stone-700 flex items-start gap-2.5 leading-relaxed">
                    <Info size={14} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-950">Context & Blueprint: </strong>
                      {quote.historicalContext}
                    </span>
                  </div>
                )}

                {/* Ellen G. White Quote Content */}
                <div className="relative">
                  <QuoteIcon className="text-stone-200 absolute -top-3 -left-3 w-16 h-16 pointer-events-none opacity-40" />
                  <p className="serif text-lg sm:text-xl leading-relaxed text-stone-900 font-normal italic relative z-10 pl-2">
                    "{quote.text}"
                  </p>
                </div>

                {/* Footer Citation */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    — {quote.source}
                  </span>
                  
                  <span className="text-[11px] font-sans text-stone-500 font-medium">
                    Country Living Principle
                  </span>
                </div>

              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredQuotes.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-stone-200 shadow-xs flex flex-col items-center gap-3">
          <Book className="text-stone-400" size={32} />
          <p className="serif text-2xl text-stone-700 italic">No counsel found matching your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilter('All'); }}
            className="text-xs font-bold text-emerald-800 underline uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ====================================================================
          5. INSPIRING HARMONIOUS SANCTUARY BANNER
      ==================================================================== */}
      <div 
        className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-12 border border-amber-500/40 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(4, 29, 16, 0.94), rgba(7, 24, 14, 0.88), rgba(4, 29, 16, 0.95)), url(${COUNTRY_IMAGES.homesteadHighlands})`
        }}
      >
        <div className="flex flex-col gap-3 max-w-2xl relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest w-fit flex items-center gap-2">
            <Leaf size={12} className="text-amber-400" />
            <span>Harmonious Outpost Principle</span>
          </span>
          <h3 className="serif text-2xl sm:text-3xl font-extrabold text-white">
            "An Education in Useful Labor & Nature's Lessons"
          </h3>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            In the country, children and families are preserved from the corrupting associations of the cities. Working with the soil instills diligence, resilience, peace of mind, and quiet trust in Providence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto shrink-0">
          <Link
            to="/tracker"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-mono font-bold text-xs uppercase px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Exodus Ledger</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

    </div>
  );
}
