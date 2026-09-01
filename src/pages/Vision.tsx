import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EGW_QUOTES } from '@/data/content';
import { Book, Quote as QuoteIcon, Sparkles, Sprout, ArrowRight, ShieldCheck, Heart, Leaf, Search, Copy, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { WhyCountryLivingFeaturette } from '@/components/home/WhyCountryLivingFeaturette';
import { COUNTRY_IMAGES } from '@/assets/images';

export default function Vision() {
  const [filter, setFilter] = useState<'All' | 'Mental Health' | 'Children' | 'Physical Labor' | 'Spiritual Growth' | 'Vision'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Mental Health', 'Children', 'Physical Labor', 'Spiritual Growth', 'Vision'];

  const filteredQuotes = EGW_QUOTES.filter(q => {
    const matchesCategory = filter === 'All' || q.category === filter;
    const matchesSearch = !searchQuery || 
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyQuote = async (quote: typeof EGW_QUOTES[0]) => {
    const text = `"${quote.text}" — ${quote.source} (Country Living Counsel)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Header Banner with Inspiring Mountain Vista Background */}
      <header 
        className="bg-cover bg-center text-white rounded-[2.5rem] p-8 md:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col gap-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(4, 29, 16, 0.88), rgba(7, 24, 14, 0.82), rgba(4, 29, 16, 0.94)), url(${COUNTRY_IMAGES.mountainVista})`
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full -mr-36 -mt-36 pointer-events-none blur-3xl" />
        
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
            <Book size={13} className="text-amber-400" />
            <span>Country Living Counsel & Foundations</span>
          </span>
          <span className="text-emerald-300/60 text-xs hidden sm:inline">•</span>
          <span className="text-emerald-200/80 font-mono text-xs hidden sm:inline">
            Inspiring Guidance for Country Living
          </span>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] leading-tight">
            The Prophetic Vision & Blueprint
          </h1>
          <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed italic">
            "The instruction has been given that we should move out of the cities to the country, where we can grow our own fruit and vegetables."
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 pt-2 border-t border-amber-500/15">
          <Link
            to="/where"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Sprout size={14} /> Land Scouting Matrix <ArrowRight size={13} />
          </Link>
          <Link
            to="/tracker"
            className="bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-500/25 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all"
          >
            Exodus Checklist
          </Link>
        </div>
      </header>

      {/* Why Country Living Featurette */}
      <WhyCountryLivingFeaturette />

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-3.5 text-amber-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search counsel by keyword e.g. gardening, health, children, city, soil, disease..."
            className="w-full bg-slate-950/80 border border-amber-500/30 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-amber-300 hover:text-white uppercase font-mono font-bold"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 border cursor-pointer",
                    isSelected
                      ? "bg-amber-500 text-slate-950 border-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] font-black" 
                      : "backdrop-blur-md bg-white/5 text-emerald-200 border-amber-500/20 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono font-bold text-amber-300/80 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
            {filteredQuotes.length} {filteredQuotes.length === 1 ? 'Statement' : 'Statements'}
          </span>
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredQuotes.map((quote) => (
            <motion.div
              layout
              key={quote.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="backdrop-blur-md bg-white/5 p-8 sm:p-10 rounded-[2.5rem] border border-amber-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-6 relative group overflow-hidden hover:border-amber-500/50 transition-all"
            >
              <QuoteIcon className="text-amber-400/10 absolute -top-4 -left-4 w-32 h-32 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-500/30">
                    {quote.category}
                  </span>
                  <button
                    onClick={() => handleCopyQuote(quote)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 border cursor-pointer active:scale-90",
                      copiedId === quote.id
                        ? "bg-emerald-600 border-emerald-400 text-white"
                        : "bg-white/5 hover:bg-white/10 text-amber-200 border-amber-500/20"
                    )}
                  >
                    {copiedId === quote.id ? <CheckCircle2 size={11} className="text-emerald-300" /> : <Copy size={11} className="text-amber-400" />}
                    {copiedId === quote.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
                
                <p className="serif text-xl sm:text-2xl leading-relaxed text-slate-100 font-medium italic">
                  "{quote.text}"
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-amber-500/15">
                <p className="text-xs text-amber-300/80 font-mono font-bold uppercase tracking-wider">
                  — {quote.source}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Inspiring Sanctuary Banner */}
      <div 
        className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-12 border border-amber-500/40 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(4, 29, 16, 0.94), rgba(7, 24, 14, 0.85), rgba(4, 29, 16, 0.95)), url(${COUNTRY_IMAGES.homesteadHighlands})`
        }}
      >
        <div className="flex flex-col gap-3 max-w-2xl relative z-10">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full font-mono font-black uppercase text-[10px] tracking-widest w-fit flex items-center gap-2">
            <Leaf size={12} className="text-amber-400" />
            <span>Harmonious Outpost Principle</span>
          </span>
          <h3 className="serif text-2xl sm:text-3xl font-extrabold text-white">
            "An Education in Useful Labor"
          </h3>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            In the country, children and families are preserved from the corrupting associations of the cities. Working with the soil instills diligence, resilience, and quiet trust in Providence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto shrink-0">
          <Link
            to="/tracker"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-mono font-black text-xs uppercase px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Open Exodus Ledger</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {filteredQuotes.length === 0 && (
        <div className="py-20 text-center backdrop-blur-md bg-white/5 rounded-[2.5rem] border border-amber-500/20">
          <p className="serif text-2xl text-emerald-300/50 italic">Finding more light...</p>
        </div>
      )}
    </div>
  );
}
