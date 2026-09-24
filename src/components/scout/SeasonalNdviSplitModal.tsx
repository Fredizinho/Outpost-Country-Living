import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, SplitSquareVertical, Sliders, Droplets, Sun, Sparkles, 
  MapPin, ShieldCheck, ArrowRight, Eye, Calendar, Info, Layers
} from 'lucide-react';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';

interface SeasonalNdviSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDistrict: MalawiDistrictSpec | null;
}

export function SeasonalNdviSplitModal({
  isOpen,
  onClose,
  activeDistrict
}: SeasonalNdviSplitModalProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [selectedSeasonPreset, setSelectedSeasonPreset] = useState<'split' | 'dzinja' | 'chilimwe'>('split');

  if (!isOpen) return null;

  const districtName = activeDistrict ? activeDistrict.name : 'Dedza';
  const districtRainfall = activeDistrict ? activeDistrict.rainfallAnnualMm : 1250;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <SplitSquareVertical size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="serif text-lg font-bold text-white">Seasonal Vegetation & NDVI Comparison</h3>
                <span className="text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Dual-Pane Time-Series
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Comparing Peak Rainy Season vs Peak Dry Season for {districtName} District
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 scrollbar-thin">
          
          {/* Scout's Rule of Thumb Card */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
            <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 font-bold block mb-0.5">Scout's Golden Rule: Never Buy Land in Dzinja</strong>
              During the rains (January–March), even dry seasonal gullies look like roaring rivers and barren dambos appear lush. 
              The true test of groundwater and soil moisture retention occurs during <strong className="text-white">Chilimwe (September–October)</strong>. 
              Parcels that stay green in Chilimwe have natural springs or sub-surface aquifers.
            </div>
          </div>

          {/* Dual Visual Screen with Interactive Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>DZINJA (Jan – March) • NDVI 0.82</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>CHILIMWE (Sept – Nov) • NDVI 0.44</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              </div>
            </div>

            {/* Simulated Satellite Visual Canvas with Split Slider */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-700 select-none shadow-inner bg-slate-950">
              {/* Right Side: Chilimwe (Dry Season) */}
              <div 
                className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-4"
                style={{
                  background: 'linear-gradient(135deg, #1c1917 0%, #292524 40%, #44403c 70%, #1c1917 100%)'
                }}
              >
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 self-end bg-slate-950/80 backdrop-blur border border-amber-500/40 p-3 rounded-xl max-w-xs text-right">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Chilimwe Dry Baseline</span>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">Water Table: 18m – 24m</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Dambos dry up; only perennial springs flowing.</div>
                </div>
              </div>

              {/* Left Side: Dzinja (Rainy Season, Clipped by Slider) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div 
                  className="w-full h-full flex flex-col justify-end p-4 relative"
                  style={{
                    width: '100%',
                    minWidth: '400px',
                    background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #022c22 100%)'
                  }}
                >
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="relative z-10 bg-slate-950/80 backdrop-blur border border-emerald-500/40 p-3 rounded-xl max-w-xs">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Dzinja Lush Canopy</span>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">Water Table: 4m – 8m</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Heavy runoff; streams at peak 100% velocity.</div>
                  </div>
                </div>
              </div>

              {/* Slider Divider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold font-mono">
                  ↔
                </div>
              </div>

              {/* Native Range input overlaid transparently for smooth dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              />
            </div>

            {/* Slider Control Button Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>← Drag left for Chilimwe</span>
              <span>Position: {sliderPosition}% Dzinja</span>
              <span>Drag right for Dzinja →</span>
            </div>
          </div>

          {/* Metric Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Droplets size={12} className="text-sky-400" /> Groundwater Depth
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-[10px] text-emerald-400 block font-mono">Dzinja</span>
                  <span className="text-sm font-bold text-white font-mono">4m – 7m</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 block font-mono">Chilimwe</span>
                  <span className="text-sm font-bold text-white font-mono">15m – 22m</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Borehole drilling recommended in October.</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Sun size={12} className="text-amber-400" /> Solar Irradiance
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-[10px] text-emerald-400 block font-mono">Dzinja</span>
                  <span className="text-sm font-bold text-white font-mono">4.2 kWh/m²</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 block font-mono">Chilimwe</span>
                  <span className="text-sm font-bold text-white font-mono">6.4 kWh/m²</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Peak solar pumping output in dry season.</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Layers size={12} className="text-emerald-400" /> Road Accessibility
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <div>
                  <span className="text-[10px] text-emerald-400 block font-mono">Dzinja</span>
                  <span className="text-sm font-bold text-rose-400 font-mono">4x4 Mud Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 block font-mono">Chilimwe</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">All-Weather</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Check feeder bridges before rains start.</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            {districtName} District • Annual Rainfall {districtRainfall} mm
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase cursor-pointer transition-all"
          >
            Back to Map
          </button>
        </div>
      </motion.div>
    </div>
  );
}
