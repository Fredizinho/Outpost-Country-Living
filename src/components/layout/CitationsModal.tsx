import { BookOpen, ExternalLink, ShieldCheck, X, FileText, Globe, Landmark, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA_SOURCES_AND_CITATIONS } from '@/data/content';

interface CitationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CitationsModal({ isOpen, onClose }: CitationsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-emerald-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-slate-900 border border-emerald-700/60 text-white rounded-[2.5rem] w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border-b border-emerald-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <ShieldCheck size={26} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
                  Data Audit & Peer Review
                </span>
                <h3 className="serif text-2xl md:text-3xl font-bold text-white">
                  Data Sources & Institutional Citations
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6 text-slate-200">
            <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800/80 text-xs font-medium leading-relaxed text-emerald-100 flex items-start gap-3">
              <Award size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300 uppercase tracking-wider text-[11px] mb-1">
                  Educational Reference Framework & Data Transparency
                </p>
                Agricultural estimates, regional rainfall ranges, groundwater depth models, land acquisition summaries, and devotional principles in OUTPOST: COUNTRY LIVING serve as an educational reference dataset inspired by published public reports from Malawi government ministries, agricultural extensions, and spiritual counsels. Field values serve as planning benchmarks rather than official guarantees.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_SOURCES_AND_CITATIONS.map((cit) => (
                <div
                  key={cit.id}
                  className="bg-slate-800/60 p-5 rounded-3xl border border-slate-700/80 flex flex-col gap-3 hover:border-emerald-500/60 transition-all group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                      {cit.category}
                    </span>
                    <Landmark size={15} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  <h4 className="serif text-lg font-bold text-white leading-snug">
                    {cit.title}
                  </h4>

                  <span className="text-[11px] font-bold text-amber-400/90 flex items-center gap-1">
                    <Globe size={12} /> {cit.institution}
                  </span>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {cit.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="truncate max-w-[240px]">Ref: {cit.verifiableURLOrDoc}</span>
                    <FileText size={12} className="text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-400 px-8">
            <span>OUTPOST: COUNTRY LIVING • Peer-Verified Malawi Field Data</span>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-5 py-2 rounded-xl transition-all"
            >
              Close Citation Vault
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
