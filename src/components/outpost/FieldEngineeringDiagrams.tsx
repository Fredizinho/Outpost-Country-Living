import React, { useState } from 'react';
import { Sprout, Compass, CloudRain, CheckCircle2, Info, Layers, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

type DiagramTab = 'orchard-pit' | 'a-frame' | 'first-flush';

export function FieldEngineeringDiagrams() {
  const [activeDiagram, setActiveDiagram] = useState<DiagramTab>('orchard-pit');

  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1C12] border border-stone-200/90 dark:border-emerald-900/60 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-emerald-900/50 pb-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-amber-300 font-bold">
            <Wrench size={14} />
            <span>Visual Field Schematics · Illustrated Cross-Sections</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Step-by-Step Illustrated Field Diagrams
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-2xl">
            Clear cross-sectional blueprints so any family—even without engineering or farming background—can build these three foundational homestead structures accurately.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveDiagram('orchard-pit')}
            className={cn(
              'px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border',
              activeDiagram === 'orchard-pit'
                ? 'bg-emerald-900 text-white border-emerald-700 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-600/40'
            )}
          >
            <Sprout size={15} />
            <span>1. 3×3×3 ft Orchard Pit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagram('a-frame')}
            className={cn(
              'px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border',
              activeDiagram === 'a-frame'
                ? 'bg-emerald-900 text-white border-emerald-700 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-600/40'
            )}
          >
            <Compass size={15} />
            <span>2. Wooden A-Frame Level</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagram('first-flush')}
            className={cn(
              'px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border',
              activeDiagram === 'first-flush'
                ? 'bg-emerald-900 text-white border-emerald-700 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200/80 dark:border-emerald-900/50 hover:border-emerald-600/40'
            )}
          >
            <CloudRain size={15} />
            <span>3. Rainwater Diverter</span>
          </button>
        </div>
      </div>

      {/* DIAGRAM 1: 3x3x3 ft ORCHARD PIT */}
      {activeDiagram === 'orchard-pit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-[#091910] rounded-2xl p-4 sm:p-6 border border-emerald-900/80 flex flex-col items-center">
            <svg
              viewBox="0 0 600 420"
              className="w-full max-w-xl h-auto select-none"
              role="img"
              aria-label="Cross-section diagram of a 90cm by 90cm by 90cm fruit tree planting pit"
            >
              {/* Sky & Ground Surface */}
              <rect x="0" y="0" width="600" height="120" fill="#0B2216" />
              <rect x="0" y="120" width="600" height="300" fill="#2A1B12" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#A16207" strokeWidth="3" />

              {/* Pit Cutout (x=150 to 450, y=120 to 380) */}
              <rect x="150" y="120" width="300" height="260" fill="#18120E" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" />

              {/* Layer 4 (Bottom): 20cm River Stones & Slow-Release Rock */}
              <rect x="152" y="325" width="296" height="53" fill="#334155" opacity="0.85" />
              <circle cx="190" cy="352" r="14" fill="#64748B" />
              <circle cx="235" cy="356" r="16" fill="#475569" />
              <circle cx="285" cy="350" r="15" fill="#64748B" />
              <circle cx="335" cy="355" r="17" fill="#475569" />
              <circle cx="385" cy="350" r="14" fill="#64748B" />
              <circle cx="422" cy="356" r="12" fill="#94A3B8" />
              <text x="300" y="355" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold" fontFamily="monospace">
                LAYER 4 (BOTTOM 20cm): Porous Stones &amp; Crushed Charcoal
              </text>

              {/* Layer 3 (Middle-Lower): 50% Topsoil + 50% Mature Compost + Wood Ash */}
              <rect x="152" y="215" width="296" height="110" fill="#3E2723" />
              <text x="300" y="262" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                LAYER 3 (45cm): 50% Topsoil + 50% Manyowa (Compost)
              </text>
              <text x="300" y="282" textAnchor="middle" fill="#D6D3D1" fontSize="11" fontFamily="monospace">
                + 2 Cups Wood Ash (Phulusa) &amp; Crushed Biochar (Makala)
              </text>

              {/* Layer 2 (Upper Root Zone): Unamended Fine Topsoil Mound */}
              <rect x="152" y="120" width="296" height="95" fill="#4E342E" />
              <path d="M 150 120 Q 300 92 450 120 Z" fill="#5D4037" />
              <text x="300" y="175" textAnchor="middle" fill="#A7F3D0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                LAYER 2 (TOP 25cm): Fine Topsoil Around Young Roots
              </text>

              {/* Layer 1 (Top Surface): Mulch Donut Ring (Udzu Wofunda) */}
              <rect x="145" y="98" width="95" height="20" rx="8" fill="#CA8A04" />
              <rect x="360" y="98" width="95" height="20" rx="8" fill="#CA8A04" />
              <text x="192" y="112" textAnchor="middle" fill="#FEF9C3" fontSize="10" fontWeight="bold">
                15cm Mulch
              </text>
              <text x="407" y="112" textAnchor="middle" fill="#FEF9C3" fontSize="10" fontWeight="bold">
                15cm Mulch
              </text>

              {/* Sapling Trunk & Graft Union */}
              <line x1="300" y1="150" x2="300" y2="35" stroke="#854D0E" strokeWidth="8" strokeLinecap="round" />
              {/* Roots */}
              <path d="M 300 145 Q 270 175 240 195" stroke="#A16207" strokeWidth="3" fill="none" />
              <path d="M 300 145 Q 330 175 360 195" stroke="#A16207" strokeWidth="3" fill="none" />
              <path d="M 300 150 L 300 200" stroke="#A16207" strokeWidth="3" fill="none" />
              {/* Leaves */}
              <circle cx="300" cy="35" r="22" fill="#15803D" />
              <circle cx="282" cy="45" r="16" fill="#16A34A" />
              <circle cx="318" cy="45" r="16" fill="#16A34A" />

              {/* Graft Union Callout */}
              <circle cx="300" cy="95" r="5" fill="#EF4444" stroke="#FEF2F2" strokeWidth="1.5" />
              <line x1="308" y1="95" x2="465" y2="65" stroke="#F87171" strokeWidth="1.5" />
              <rect x="465" y="45" width="125" height="36" rx="6" fill="#450A0A" stroke="#F87171" />
              <text x="527" y="60" textAnchor="middle" fill="#FECACA" fontSize="9" fontWeight="bold">
                GRAFT UNION (+5cm)
              </text>
              <text x="527" y="73" textAnchor="middle" fill="#FCA5A5" fontSize="8">
                Keep above soil &amp; mulch!
              </text>

              {/* Dimension Arrows */}
              <line x1="115" y1="120" x2="115" y2="380" stroke="#34D399" strokeWidth="2" />
              <line x1="108" y1="120" x2="122" y2="120" stroke="#34D399" strokeWidth="2" />
              <line x1="108" y1="380" x2="122" y2="380" stroke="#34D399" strokeWidth="2" />
              <text x="62" y="250" textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="bold" fontFamily="monospace">
                90 cm
              </text>
              <text x="62" y="266" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontFamily="monospace">
                (3 Feet)
              </text>

              <line x1="150" y1="402" x2="450" y2="402" stroke="#34D399" strokeWidth="2" />
              <text x="300" y="416" textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="bold" fontFamily="monospace">
                Width: 90 cm (3 Feet Wide)
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
              <span className="text-xs font-mono font-bold uppercase text-emerald-900 dark:text-amber-300">
                Why 3×3×3 Feet (90×90×90 cm) Works in Malawi
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 mt-1.5 leading-relaxed">
                Malawi’s dry season (<em>Chilimwe</em>) lasts 6 months without rain. Breaking through compacted clay hardpan to 90 cm and filling with <em>Manyowa</em> (compost) and <em>Makala</em> (biochar) creates an underground water sponge so young Avocado, Mango, and Citrus trees thrive without daily pumping.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/40 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 dark:text-white">Separate Topsoil from Subsoil:</strong> Pile dark top 30 cm soil on one side and red bottom clay on the other. Put the dark topsoil back into the root zone first.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/40 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 dark:text-white">Protect the Graft Scar:</strong> Keep the graft union 5 cm above the soil line and keep dry grass mulch (<em>Udzu wofunda</em>) 10 cm back from the bark to prevent collar rot and termites (<em>Chiswe</em>).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 2: WOODEN A-FRAME CONTOUR LEVEL */}
      {activeDiagram === 'a-frame' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-[#091910] rounded-2xl p-4 sm:p-6 border border-emerald-900/80 flex flex-col items-center">
            <svg
              viewBox="0 0 600 400"
              className="w-full max-w-xl h-auto select-none"
              role="img"
              aria-label="Diagram of a 2-meter wooden A-frame plumb-bob contour level"
            >
              <rect x="0" y="0" width="600" height="400" fill="#0B2216" />
              {/* Level Ground Line */}
              <line x1="60" y1="340" x2="540" y2="340" stroke="#34D399" strokeWidth="3" strokeDasharray="8 4" />
              <text x="300" y="375" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                2.0 Meter Span Along Equal-Elevation Contour Line (Mitumbira ya Mizere)
              </text>

              {/* Left Pole (2m) */}
              <line x1="300" y1="50" x2="140" y2="340" stroke="#D97706" strokeWidth="12" strokeLinecap="round" />
              {/* Right Pole (2m) */}
              <line x1="300" y1="50" x2="460" y2="340" stroke="#D97706" strokeWidth="12" strokeLinecap="round" />
              {/* Horizontal Crossbar (1m) */}
              <line x1="205" y1="220" x2="395" y2="220" stroke="#B45309" strokeWidth="10" strokeLinecap="round" />

              {/* Top Nail & Plumb String */}
              <circle cx="300" cy="50" r="6" fill="#F8FAFC" />
              <line x1="300" y1="50" x2="300" y2="285" stroke="#FDE047" strokeWidth="2.5" />
              {/* Stone Plumb Weight */}
              <polygon points="288,285 312,285 318,310 282,310" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="2" />
              <text x="300" y="328" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="bold">
                River Stone Weight
              </text>

              {/* Center Level Notch */}
              <line x1="300" y1="210" x2="300" y2="230" stroke="#EF4444" strokeWidth="4" />
              <rect x="320" y="175" width="195" height="34" rx="6" fill="#064E3B" stroke="#34D399" />
              <text x="417" y="196" textAnchor="middle" fill="#ECFDF5" fontSize="11" fontWeight="bold">
                Center Level Notch (Dead Level)
              </text>

              {/* Pole Dimension Labels */}
              <text x="180" y="155" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold" fontFamily="monospace">
                2.0m Pole
              </text>
              <text x="420" y="155" textAnchor="middle" fill="#FCD34D" fontSize="12" fontWeight="bold" fontFamily="monospace">
                2.0m Pole
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
              <span className="text-xs font-mono font-bold uppercase text-emerald-900 dark:text-amber-300">
                Zero-Cost Surveying for Sloped Land
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 mt-1.5 leading-relaxed">
                Tie 3 straight bamboo or bluegum poles into an “A” shape and hang a stone from the top nail with string. Once calibrated, it marks dead-level contour ridges (<em>Mitumbira ya mizere / Mikwingwirima</em>) so heavy storm runoff soaks in instead of washing away your topsoil.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/40">
                <strong className="text-stone-900 dark:text-white">Step 1 — Calibrate in 60 Seconds:</strong> Stand the A-frame on any ground, mark two stakes at the feet, and pencil Mark #1 where the string crosses the crossbar. Reverse the legs on the exact same two stakes and pencil Mark #2. Halfway between Mark #1 and #2 is true level!
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/40">
                <strong className="text-stone-900 dark:text-white">Step 2 — Walk the Slope:</strong> Pivot the A-frame across your hillside keeping the string on the center notch, driving a stake at each step. Plant Vetiver grass (<em>Chisale</em>) along this line.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 3: FIRST-FLUSH RAINWATER DIVERTER */}
      {activeDiagram === 'first-flush' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-[#091910] rounded-2xl p-4 sm:p-6 border border-emerald-900/80 flex flex-col items-center">
            <svg
              viewBox="0 0 600 400"
              className="w-full max-w-xl h-auto select-none"
              role="img"
              aria-label="Diagram of a roof gutter first-flush rainwater diverter feeding a clean storage tank"
            >
              <rect x="0" y="0" width="600" height="400" fill="#0B2216" />

              {/* Corrugated Roof & Gutter */}
              <polygon points="40,40 240,95 240,110 40,55" fill="#94A3B8" />
              <text x="135" y="55" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold">
                Iron Sheet Roof (Malata)
              </text>
              {/* Gutter Leaf Screen */}
              <rect x="230" y="95" width="45" height="22" rx="4" fill="#0284C7" stroke="#BAE6FD" strokeWidth="2" />
              <text x="252" y="90" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="bold">
                Leaf Mesh
              </text>

              {/* T-Junction Pipe */}
              <rect x="244" y="117" width="16" height="65" fill="#CBD5E1" />
              <rect x="244" y="150" width="135" height="16" fill="#CBD5E1" />

              {/* Vertical First-Flush Chamber (20L PVC Pipe) */}
              <rect x="236" y="182" width="32" height="165" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              {/* Dirty First-Flush Water */}
              <rect x="238" y="210" width="28" height="135" fill="#78350F" opacity="0.85" />
              {/* Floating Sealing Ball */}
              <circle cx="252" cy="195" r="11" fill="#FACC15" stroke="#FEF08A" strokeWidth="2" />
              <text x="140" y="200" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="bold">
                Floating Ball Valve →
              </text>
              <text x="140" y="255" textAnchor="middle" fill="#FCD34D" fontSize="10" fontFamily="monospace">
                20L Vertical PVC Pipe
              </text>
              <text x="140" y="272" textAnchor="middle" fill="#D6D3D1" fontSize="9">
                Traps first dusty roof wash
              </text>
              {/* Bottom Slow Drain Cap */}
              <rect x="240" y="347" width="24" height="12" rx="2" fill="#EF4444" />
              <text x="252" y="376" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="bold">
                Clean-Out Drain Cap
              </text>

              {/* Main Clean Water Tank (5,000L) */}
              <rect x="375" y="140" width="175" height="220" rx="14" fill="#064E3B" stroke="#10B981" strokeWidth="3" />
              <rect x="380" y="195" width="165" height="160" rx="10" fill="#0284C7" opacity="0.65" />
              <text x="462" y="265" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                CLEAN CISTERN
              </text>
              <text x="462" y="285" textAnchor="middle" fill="#BAE6FD" fontSize="11" fontFamily="monospace">
                5,000L – 10,000L Tank
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
              <span className="text-xs font-mono font-bold uppercase text-emerald-900 dark:text-amber-300">
                Keep Bird Droppings &amp; Dry-Season Dust Out of Your Tank
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 mt-1.5 leading-relaxed">
                When the first November rains (<em>Chizimalupsya</em>) hit your iron roof (<em>Malata</em>), the first 20 liters wash off months of dust and ash. A simple PVC T-pipe drops that dirty first flush into a vertical chamber; once full, a floating ball seals the chamber and sends crystal-clear rainwater into your tank.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-emerald-900/40 text-xs sm:text-sm">
              <strong className="text-stone-900 dark:text-white">Rule of Thumb:</strong> Divert <strong>1 liter of first-flush pipe capacity per 1 m² of roof area</strong> (a 100mm × 2m PVC downpipe holds ~16 liters), and unscrew the bottom cap after each storm.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
