import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Heart, ShieldCheck, ArrowRight, Sparkles, Leaf, Compass, Sun, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturetteItem {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  linkTo: string;
  linkLabel: string;
  accentColor: string;
}

const PILLARS: FeaturetteItem[] = [
  {
    id: 'self-reliance',
    icon: Sprout,
    title: 'True Self-Reliance',
    badge: 'Autonomy & Sovereignty',
    description: 'Grow organic heirloom crops, secure year-round clean borehole water, and generate off-grid solar energy.',
    highlights: ['Organic Heirloom Crops (Mbewu za M\'munda)', 'Year-Round Borehole Water', 'Off-Grid Solar Energy'],
    linkTo: '/calculators',
    linkLabel: 'Launch Calculators',
    accentColor: 'from-amber-500/20 via-emerald-500/10 to-transparent'
  },
  {
    id: 'peace-space',
    icon: Heart,
    title: 'Peace & Space',
    badge: 'Sanctuary & Health',
    description: 'Leave behind urban congestion for clean mountain air, rich living soils, and natural seasonal rhythms.',
    highlights: ['Clean Mountain Air & Mist', 'Rich Living Loam Soil', 'Natural Dry & Rainy Seasons'],
    linkTo: '/where',
    linkLabel: 'Scout Land Zones',
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'legacy-security',
    icon: ShieldCheck,
    title: 'Legacy & Security',
    badge: 'Enduring Foundation',
    description: 'Build a sustainable family estate and master time-tested homesteading skills for generations.',
    highlights: ['Multigenerational Homestead', 'Orchards (Mitengo ya Chipatso)', 'Resilient Family Haven'],
    linkTo: '/tracker',
    linkLabel: 'View Exodus Milestones',
    accentColor: 'from-amber-600/20 via-amber-400/10 to-transparent'
  }
];

export function WhyCountryLivingFeaturette({ className = '' }: { className?: string }) {
  return (
    <section className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-300 pb-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
            <span className="text-caption font-sans font-bold uppercase tracking-[0.2em] text-emerald-800">
              The Vision & Philosophy
            </span>
          </div>
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Why Country Living?
          </h2>
          <p className="text-sm md:text-base text-stone-600 max-w-2xl font-serif font-medium leading-relaxed italic">
            Connecting with your deepest calling for independence, tranquility, and generational sanctuary.
          </p>
        </div>

        <Link
          to="/vision"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/60 px-4 py-2.5 rounded-xl transition-all w-fit shadow-xs group"
        >
          <Sparkles size={14} className="text-amber-600 group-hover:rotate-12 transition-transform" />
          <span>Read Prophetic Counsel</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Featurette Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar, idx) => {
          const IconComponent = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="backdrop-blur-xl bg-gradient-to-br from-[#0B2316]/95 via-[#0E2A1B]/90 to-[#07180E]/95 border border-amber-500/30 hover:border-amber-500/60 rounded-[2.5rem] p-7 md:p-8 flex flex-col justify-between gap-6 shadow-[0_16px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Soft Ambient Background Glow */}
              <div className={`absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl ${pillar.accentColor} rounded-full -mr-20 -mt-20 pointer-events-none blur-3xl group-hover:scale-150 transition-transform duration-700`} />

              <div className="flex flex-col gap-5 relative z-10">
                {/* Badge & Vector Icon Row */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/35 px-3.5 py-1 rounded-xl shadow-xs">
                    <IconComponent size={13} className="text-amber-400" />
                    <span>{pillar.badge}</span>
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-black/50 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-inner group-hover:border-amber-400/50 group-hover:bg-amber-500/10 transition-colors">
                    <IconComponent size={22} />
                  </div>
                </div>

                {/* Title & Core Copy */}
                <div className="flex flex-col gap-2">
                  <h3 className="serif text-2xl md:text-3xl font-extrabold text-[#FAF8F5] group-hover:text-amber-200 transition-colors flex items-center gap-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-emerald-100/90 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-amber-500/15">
                  {pillar.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="relative z-10 pt-4 border-t border-amber-500/15">
                <Link
                  to={pillar.linkTo}
                  className="inline-flex items-center justify-between w-full bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/25 hover:border-amber-400 px-4.5 py-3 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all group/btn shadow-xs active:scale-95"
                >
                  <span>{pillar.linkLabel}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
