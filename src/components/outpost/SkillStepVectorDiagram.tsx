import React from 'react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { Layers, CheckCircle2, ArrowRight, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillStepVectorDiagramProps {
  skillId: string;
  title: string;
  category: string;
  steps: string[];
  toolsNeeded?: string[];
  compact?: boolean;
}

export function SkillStepVectorDiagram({
  skillId,
  title,
  category,
  steps,
  toolsNeeded = [],
  compact = false,
}: SkillStepVectorDiagramProps) {
  const catLower = category.toLowerCase();

  // Map category to ready image and custom vector blueprint type
  const visualConfig = (() => {
    if (catLower.includes('water') || catLower.includes('energy') || skillId.includes('water') || skillId.includes('solar')) {
      return {
        image: COUNTRY_IMAGES.offgridHomesteadWater,
        imageCaption: 'Biosand Filtration & Solar Water Independence',
        diagramTitle: '5-Layer Biosand Filter & Solar Micro-Grid Cross-Section',
        diagramType: 'water-energy' as const,
      };
    }
    if (catLower.includes('food') || catLower.includes('preservation') || skillId.includes('bread') || skillId.includes('dehydration')) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Indirect Solar Food Dehydration & Hermetic Grain Storage',
        diagramTitle: 'Indirect Solar Air-Heater & Convection Flow Schematic',
        diagramType: 'preservation' as const,
      };
    }
    if (catLower.includes('construction') || skillId.includes('earth') || skillId.includes('carpentry')) {
      return {
        image: COUNTRY_IMAGES.homesteadHighlands,
        imageCaption: 'Stabilized Earth Block (CEB) & Stone Rubble Trench Foundation',
        diagramTitle: 'Pressed Earth Block Wall, Damp-Proof Course & 1m Overhang',
        diagramType: 'construction' as const,
      };
    }
    if (catLower.includes('medical') || catLower.includes('health') || skillId.includes('hydrotherapy') || skillId.includes('herb')) {
      return {
        image: COUNTRY_IMAGES.natureSymbols,
        imageCaption: 'Natural Remedies, Charcoal Poultices & Contrast Hydrotherapy',
        diagramTitle: 'Contrast Hydrotherapy & Activated Charcoal Poultice Layers',
        diagramType: 'health' as const,
      };
    }
    if (catLower.includes('education') || skillId.includes('sabbath') || skillId.includes('education')) {
      return {
        image: COUNTRY_IMAGES.childrenGarden,
        imageCaption: 'Avondale Head, Hand & Heart Schedule & Thermal Cooking',
        diagramTitle: 'Insulated Clay Rocket Stove & 10cm Wonderbag Thermal Retention',
        diagramType: 'education' as const,
      };
    }
    return {
      image: COUNTRY_IMAGES.permacultureGarden,
      imageCaption: '18-Day Thermophilic Hot Compost & Deep Pit Agronomy',
      diagramTitle: 'Thermophilic Compost Pile (55°C–65°C Core) & Moisture Sponge',
      diagramType: 'farming' as const,
    };
  })();

  return (
    <div className="rounded-3xl bg-[#07160E] border border-emerald-900/70 p-5 sm:p-7 text-white flex flex-col gap-6 shadow-lg">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={12} />
            <span>Visual Skill Schematic &amp; Step Flow</span>
          </span>
          <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
            {visualConfig.diagramTitle}
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
          {steps.length} Sequential Steps
        </span>
      </div>

      {/* Middle Row: Ready Reference Image + Vector Blueprint Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Ready Image (4 cols) */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-emerald-800/60 h-48 sm:h-56 bg-stone-950">
          <img
            src={visualConfig.image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
              {category} Reference
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
              {visualConfig.imageCaption}
            </p>
          </div>
        </div>

        {/* Right: Domain SVG Vector Schematic (8 cols) */}
        <div className="lg:col-span-8 bg-[#040E09] rounded-2xl p-3 sm:p-4 border border-emerald-900/80">
          {visualConfig.diagramType === 'farming' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Thermophilic compost and soil layering schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Compost Mound Layers */}
              <path d="M 50 180 Q 200 20 350 180 Z" fill="#3E2723" stroke="#D97706" strokeWidth="2" />
              {/* Inner 65C Core */}
              <ellipse cx="200" cy="135" rx="75" ry="38" fill="#B45309" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="200" y="132" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="bold" fontFamily="monospace">
                55°C–65°C CORE
              </text>
              <text x="200" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace">
                30:1 Carbon : Nitrogen
              </text>
              {/* Center Aeration Bamboo Pole */}
              <rect x="196" y="25" width="8" height="155" fill="#84CC16" />
              <text x="200" y="18" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Bamboo Air Chimney
              </text>
              {/* Right Spec Callout */}
              <rect x="375" y="35" width="205" height="145" rx="8" fill="#0F172A" stroke="#10B981" />
              <text x="477" y="58" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                LAYER PROTOCOL
              </text>
              <text x="390" y="82" fill="#FDE68A" fontSize="10" fontFamily="monospace">• Top: 10cm Dry Grass Cap</text>
              <text x="390" y="104" fill="#A7F3D0" fontSize="10" fontFamily="monospace">• Green: 30% Legume/Manure</text>
              <text x="390" y="126" fill="#D6D3D1" fontSize="10" fontFamily="monospace">• Brown: 70% Dry Stalks/Ash</text>
              <text x="390" y="148" fill="#93C5FD" fontSize="10" fontFamily="monospace">• Base: 15cm Coarse Twigs</text>
              <text x="390" y="168" fill="#F8FAFC" fontSize="9" fontFamily="monospace">Turn Days: 4, 7, 10, 14, 18</text>
            </svg>
          )}

          {visualConfig.diagramType === 'water-energy' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Biosand water filter 5-layer cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Filter Column */}
              <rect x="70" y="20" width="160" height="175" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              {/* Layer 1: Diffuser & Standing Water */}
              <rect x="74" y="25" width="152" height="25" fill="#0284C7" opacity="0.5" />
              <text x="150" y="41" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="bold" fontFamily="monospace">
                1. 5cm Standing Water + Biofilm
              </text>
              {/* Layer 2: Fine Silica Sand */}
              <rect x="74" y="50" width="152" height="75" fill="#D97706" opacity="0.85" />
              <text x="150" y="92" textAnchor="middle" fill="#FEF9C3" fontSize="10" fontWeight="bold" fontFamily="monospace">
                2. 45cm Fine Washed Sand
              </text>
              {/* Layer 3: Activated Charcoal */}
              <rect x="74" y="125" width="152" height="22" fill="#18181B" />
              <text x="150" y="140" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">
                3. Crushed Hardwood Charcoal
              </text>
              {/* Layer 4: Coarse Sand & Pea Gravel */}
              <rect x="74" y="147" width="152" height="44" fill="#64748B" />
              <text x="150" y="173" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold" fontFamily="monospace">
                4. 15cm Coarse Sand &amp; Gravel
              </text>
              {/* Rising Outlet Weir Pipe */}
              <path d="M 230 175 L 265 175 L 265 45 L 310 45" stroke="#38BDF8" strokeWidth="5" fill="none" />
              <text x="445" y="65" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                HIGH-WEIR OUTLET SPOUT
              </text>
              <text x="445" y="88" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
                Keeps sand submerged 24/7
              </text>
              <text x="445" y="112" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Removes 98% Bacteria &amp; Turbidity
              </text>
              <text x="445" y="135" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace">
                Boil or SODIS for final viral safety
              </text>
            </svg>
          )}

          {visualConfig.diagramType === 'preservation' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Indirect solar cabinet dehydrator airflow diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Sloped Solar Collector */}
              <polygon points="35,175 235,115 235,135 35,195" fill="#18181B" stroke="#F59E0B" strokeWidth="2" />
              <text x="135" y="132" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">
                ☀️ Black Solar Collector (52°C)
              </text>
              {/* Vertical Drying Cabinet */}
              <rect x="235" y="30" width="145" height="155" rx="6" fill="#3E2723" stroke="#D97706" strokeWidth="2" />
              {[60, 95, 130].map((y, idx) => (
                <g key={y}>
                  <line x1="248" y1={y} x2="368" y2={y} stroke="#FDE68A" strokeWidth="3" strokeDasharray="6 3" />
                  <text x="308" y={y - 6} textAnchor="middle" fill="#FEF9C3" fontSize="9" fontFamily="monospace">
                    Mesh Tray #{idx + 1} (Shaded)
                  </text>
                </g>
              ))}
              {/* Rising Warm Airflow Arrow */}
              <path d="M 60 182 L 225 128 L 308 165 L 308 38" stroke="#F97316" strokeWidth="2.5" strokeDasharray="5 3" fill="none" />
              {/* Right Info Box */}
              <rect x="405" y="40" width="175" height="135" rx="8" fill="#0F172A" stroke="#F59E0B" />
              <text x="492" y="65" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                INDIRECT DRYING SPECS
              </text>
              <text x="492" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                Temp: 48°C – 55°C
              </text>
              <text x="492" y="112" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontFamily="monospace">
                Blocks UV vitamin loss
              </text>
              <text x="492" y="134" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                Blanch greens 3 min first
              </text>
              <text x="492" y="156" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace">
                Store in PICS bags + Ash
              </text>
            </svg>
          )}

          {visualConfig.diagramType === 'construction' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Pressed earth block wall and stone foundation cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Ground Level */}
              <line x1="20" y1="145" x2="420" y2="145" stroke="#A16207" strokeWidth="2.5" />
              {/* 60cm Stone Rubble Foundation */}
              <rect x="155" y="130" width="110" height="65" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
              <text x="210" y="168" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold" fontFamily="monospace">
                60cm Stone Trench
              </text>
              {/* Waterproof DPC Membrane */}
              <line x1="145" y1="128" x2="275" y2="128" stroke="#38BDF8" strokeWidth="4" />
              <text x="90" y="128" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                DPC Plastic →
              </text>
              {/* Pressed Earth Block Wall */}
              <rect x="170" y="52" width="80" height="76" fill="#9A3412" stroke="#F97316" strokeWidth="2" />
              <text x="210" y="94" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontWeight="bold" fontFamily="monospace">
                CEB Earth Wall
              </text>
              {/* Wide 1m Roof Overhang */}
              <polygon points="85,62 210,18 335,62" fill="#334155" stroke="#FBBF24" strokeWidth="2" />
              <text x="115" y="80" textAnchor="middle" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">
                ↔ 1.0m Overhang
              </text>
              {/* Right Specs */}
              <rect x="365" y="35" width="215" height="145" rx="8" fill="#0F172A" stroke="#F97316" />
              <text x="472" y="58" textAnchor="middle" fill="#FB923C" fontSize="10" fontWeight="bold" fontFamily="monospace">
                EARTH BLOCK MIX (7:2:1)
              </text>
              <text x="380" y="84" fill="#FFFFFF" fontSize="10" fontFamily="monospace">• 70% Coarse Sand / Loam</text>
              <text x="380" y="106" fill="#FDE68A" fontSize="10" fontFamily="monospace">• 20% Subsoil Clay Binder</text>
              <text x="380" y="128" fill="#A7F3D0" fontSize="10" fontFamily="monospace">• 8–10% Cement or Lime</text>
              <text x="380" y="152" fill="#93C5FD" fontSize="9" fontFamily="monospace">Cure wet under shade 21 days</text>
            </svg>
          )}

          {visualConfig.diagramType === 'health' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Contrast hydrotherapy and charcoal poultice schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Contrast Cycle Boxes */}
              <rect x="25" y="40" width="160" height="130" rx="10" fill="#450A0A" stroke="#F87171" strokeWidth="2" />
              <text x="105" y="72" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="bold" fontFamily="monospace">
                HOT PHASE (3–4 MIN)
              </text>
              <text x="105" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                40°C – 43°C
              </text>
              <text x="105" y="122" textAnchor="middle" fill="#FECACA" fontSize="9" fontFamily="monospace">
                Vasodilation &amp; Leukocyte
              </text>
              <text x="105" y="138" textAnchor="middle" fill="#FECACA" fontSize="9" fontFamily="monospace">
                Circulation Rush
              </text>

              <rect x="210" y="40" width="160" height="130" rx="10" fill="#082F49" stroke="#38BDF8" strokeWidth="2" />
              <text x="290" y="72" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="bold" fontFamily="monospace">
                COLD PHASE (30–60 SEC)
              </text>
              <text x="290" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                12°C – 16°C
              </text>
              <text x="290" y="122" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                Tonic Vasoconstriction
              </text>
              <text x="290" y="138" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                Repeat × 3 Cycles
              </text>

              {/* Charcoal Poultice Stack */}
              <rect x="395" y="40" width="185" height="130" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
              <text x="487" y="66" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                CHARCOAL POULTICE
              </text>
              <text x="487" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                1:1 Charcoal + Cassava/Flax
              </text>
              <text x="487" y="112" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontFamily="monospace">
                Wrapped in Cotton Muslin
              </text>
              <text x="487" y="134" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace">
                + Wool Flannel Outer Wrap
              </text>
            </svg>
          )}

          {visualConfig.diagramType === 'education' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Avondale daily study-work rhythm and fireless thermal cooker schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* 3 Blocks of True Education */}
              <rect x="20" y="40" width="170" height="130" rx="10" fill="#1E293B" stroke="#FBBF24" strokeWidth="2" />
              <text x="105" y="68" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">
                05:30 – 11:30 MORNING
              </text>
              <text x="105" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                HEART &amp; HEAD
              </text>
              <text x="105" y="118" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace">
                Worship, Bible, Physiology,
              </text>
              <text x="105" y="134" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace">
                Farm Math &amp; Bookkeeping
              </text>

              <rect x="215" y="40" width="170" height="130" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
              <text x="300" y="68" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                13:30 – 16:30 AFTERNOON
              </text>
              <text x="300" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                TRAINED HANDS
              </text>
              <text x="300" y="118" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontFamily="monospace">
                3×3×3ft Orchards, Carpentry,
              </text>
              <text x="300" y="134" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontFamily="monospace">
                Tailoring &amp; Potash Soap
              </text>

              <rect x="410" y="40" width="170" height="130" rx="10" fill="#3E2723" stroke="#F97316" strokeWidth="2" />
              <text x="495" y="68" textAnchor="middle" fill="#FDBA74" fontSize="10" fontWeight="bold" fontFamily="monospace">
                SABBATH THERMAL POT
              </text>
              <text x="495" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                &gt; 68°C FOR 8 HRS
              </text>
              <text x="495" y="118" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontFamily="monospace">
                10cm Rice-Hull Wonderbag
              </text>
              <text x="495" y="134" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontFamily="monospace">
                Zero Sabbath Fire Kindled
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* Bottom Row: Connected Visual Step-by-Step Pipeline & Tools Strip */}
      {!compact && steps.length > 0 && (
        <div className="pt-4 border-t border-emerald-900/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              Step-by-Step Execution Flowchart
            </span>
            {toolsNeeded.length > 0 && (
              <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1">
                <Wrench size={12} /> {toolsNeeded.slice(0, 3).join(' · ')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.slice(0, 4).map((stepText, idx) => {
              const colonIdx = stepText.indexOf(':');
              const stepHeading =
                colonIdx > 0 && colonIdx < 36
                  ? stepText.slice(0, colonIdx)
                  : `Phase 0${idx + 1}`;
              const stepBody =
                colonIdx > 0 && colonIdx < 36
                  ? stepText.slice(colonIdx + 1).trim()
                  : stepText;

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-emerald-800/50 flex flex-col justify-between gap-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold">
                      STEP 0{idx + 1}
                    </span>
                    {idx < 3 && (
                      <ArrowRight size={13} className="text-emerald-400 hidden lg:inline" />
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-amber-200 leading-snug">
                    {stepHeading}
                  </h5>
                  <p className="text-[11px] text-emerald-100/80 leading-relaxed line-clamp-3">
                    {stepBody}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
