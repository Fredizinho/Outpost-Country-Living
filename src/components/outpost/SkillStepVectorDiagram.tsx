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
  const idLower = skillId.toLowerCase();
  const catLower = category.toLowerCase();

  // Map skill ID / category to domain-specific reference image and blueprint schematic
  const visualConfig = (() => {
    if (
      idLower.includes('tree') ||
      idLower.includes('graft') ||
      idLower.startsWith('ft-') ||
      idLower === 'fruit-tree-cultivation'
    ) {
      return {
        image: COUNTRY_IMAGES.childrenGarden,
        imageCaption: 'Ellen G. White Deep 3x3x3ft Orchard Pit & Rock Drainage',
        diagramTitle: '1m³ Excavated Tree Pit, Rock Drainage & Aged Compost Layering',
        diagramType: 'tree-pit' as const,
      };
    }
    if (
      idLower.includes('swale') ||
      idLower.includes('water-conservation') ||
      idLower.startsWith('wc-') ||
      idLower.includes('contour') ||
      idLower.includes('dambo')
    ) {
      return {
        image: COUNTRY_IMAGES.offgridHomesteadWater,
        imageCaption: 'A-Frame Contour Surveying & Keyline Water Swale Infiltration',
        diagramTitle: 'A-Frame Level Calibration & Contour Swale Retention Cross-Section',
        diagramType: 'water-swale' as const,
      };
    }
    if (idLower.includes('zeer') || idLower.startsWith('zp-') || idLower.includes('cool')) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Zero-Electricity Evaporative Cooling for Perishable Harvests',
        diagramTitle: 'Dual-Clay Zeer Pot Evaporative Refrigerator Cross-Section',
        diagramType: 'zeer-pot' as const,
      };
    }
    if (
      idLower.includes('bread') ||
      idLower.includes('milling') ||
      idLower.startsWith('wb-') ||
      idLower.includes('grain')
    ) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Stone Quern Milling & High-Thermal-Mass Cob Oven Baking',
        diagramTitle: 'Rotary Stone Burr Quern Mill & 210°C Cob Oven Heat Retention',
        diagramType: 'bread-milling' as const,
      };
    }
    if (
      idLower.includes('hydrotherapy') ||
      idLower.includes('poultice') ||
      idLower.startsWith('hc-') ||
      idLower.includes('remedies') ||
      idLower.includes('first-aid') ||
      idLower.startsWith('fa-') ||
      catLower.includes('medical') ||
      catLower.includes('health')
    ) {
      return {
        image: COUNTRY_IMAGES.natureSymbols,
        imageCaption: 'Natural Remedies, Charcoal Poultices & Contrast Hydrotherapy',
        diagramTitle: 'Contrast Hydrotherapy Vascular Wave & 4-Layer Charcoal Poultice',
        diagramType: 'hydrotherapy' as const,
      };
    }
    if (
      idLower.includes('plant-protein') ||
      idLower.includes('oil-press') ||
      idLower.startsWith('pp-') ||
      idLower.includes('nut-milk')
    ) {
      return {
        image: COUNTRY_IMAGES.permacultureGarden,
        imageCaption: 'Mechanical Ram-Press Cold Extraction & Soy Trypsin Inactivation',
        diagramTitle: 'Manual Ram-Press Screw Oil Extractor & Soy Coagulation Vat',
        diagramType: 'plant-press' as const,
      };
    }
    if (idLower.includes('seed') || idLower.startsWith('sv-') || idLower.includes('heirloom')) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Hermetic Seed Storage & Germination Viability Assay',
        diagramTitle: 'Airtight Glass/PICS Seed Canister (<8% Moisture) & 10-Seed Assay',
        diagramType: 'seed-vault' as const,
      };
    }
    if (
      idLower.includes('broadfork') ||
      idLower.startsWith('bf-') ||
      idLower.includes('no-till') ||
      idLower.includes('soil-science')
    ) {
      return {
        image: COUNTRY_IMAGES.permacultureGarden,
        imageCaption: 'Broadfork Deep 30cm Aeration Without Subsoil Microbial Inversion',
        diagramTitle: 'U-Bar Broadfork Tine Fracturing & Living Soil Profile Strata',
        diagramType: 'broadfork-soil' as const,
      };
    }
    if (
      idLower.includes('earth-block') ||
      idLower.includes('construction') ||
      idLower.startsWith('eb-') ||
      catLower.includes('construction')
    ) {
      return {
        image: COUNTRY_IMAGES.homesteadHighlands,
        imageCaption: 'Stabilized Earth Block (CEB) & Stone Rubble Trench Foundation',
        diagramTitle: 'Pressed Earth Block Wall, Damp-Proof Course & 1m Overhang',
        diagramType: 'earth-block' as const,
      };
    }
    if (
      idLower.includes('dehydration') ||
      idLower.includes('food-preservation') ||
      idLower.startsWith('fp-') ||
      catLower.includes('preservation')
    ) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Indirect Solar Food Dehydration & Hermetic Grain Storage',
        diagramTitle: 'Indirect Solar Air-Heater & Convection Flow Schematic',
        diagramType: 'preservation' as const,
      };
    }
    if (
      idLower.includes('water') ||
      idLower.includes('energy') ||
      idLower.includes('solar') ||
      catLower.includes('water') ||
      catLower.includes('energy')
    ) {
      return {
        image: COUNTRY_IMAGES.offgridHomesteadWater,
        imageCaption: 'Biosand Filtration & Solar Water Independence',
        diagramTitle: '5-Layer Biosand Filter & Solar Micro-Grid Cross-Section',
        diagramType: 'water-energy' as const,
      };
    }
    if (
      idLower.includes('education') ||
      idLower.includes('sabbath') ||
      idLower.startsWith('te-') ||
      idLower.startsWith('sb-') ||
      catLower.includes('education')
    ) {
      return {
        image: COUNTRY_IMAGES.childrenGarden,
        imageCaption: 'Avondale Head, Hand & Heart Schedule & Thermal Cooking',
        diagramTitle: 'Avondale 40/40/20 Education Wheel & Wonderbag Thermal Pot',
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
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-caption font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={12} />
            <span>Visual Skill Schematic &amp; Step Flow</span>
          </span>
          <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
            {visualConfig.diagramTitle}
          </span>
        </div>
        <span className="text-caption font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
          {steps.length} Sequential Steps
        </span>
      </div>

      {/* Middle Row: Ready Reference Image + Enhanced Vector Blueprint Diagram */}
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
            <span className="text-caption font-mono uppercase tracking-widest text-amber-300 font-bold block">
              {category} Reference
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
              {visualConfig.imageCaption}
            </p>
          </div>
        </div>

        {/* Right: Domain SVG Vector Schematic (8 cols) */}
        <div className="lg:col-span-8 bg-[#040E09] rounded-2xl p-3 sm:p-4 border border-emerald-900/80 overflow-hidden">
          {/* 1. ELLEN G. WHITE 3x3x3FT TREE PLANTING PIT SCHEMATIC */}
          {visualConfig.diagramType === 'tree-pit' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Ellen G White 3x3x3ft deep planting pit cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Natural Grade Line */}
              <line x1="20" y1="70" x2="350" y2="70" stroke="#78716C" strokeWidth="2" strokeDasharray="4 4" />
              <text x="40" y="62" fill="#A8A29E" fontSize="9" fontFamily="monospace">Original Ground Level</text>

              {/* 1m x 1m Excavated Pit */}
              <rect x="70" y="70" width="220" height="125" fill="#1C1917" stroke="#D97706" strokeWidth="1.5" />

              {/* Layer 1: Drainage River Stones & Volcanic Rocks (20cm) */}
              <rect x="72" y="165" width="216" height="28" fill="#44403C" stroke="#78716C" strokeWidth="0.8" />
              {[85, 115, 145, 175, 205, 235, 265].map((cx, i) => (
                <circle key={i} cx={cx} cy={179} r={8} fill="#78716C" opacity="0.8" />
              ))}
              <text x="180" y="183" textAnchor="middle" fill="#F5F5F4" fontSize="9" fontWeight="bold" fontFamily="monospace">
                20cm Drainage Stones &amp; Bones
              </text>

              {/* Layer 2: Aged Compost, Biochar (10%) & Bone Meal (30cm) */}
              <rect x="72" y="125" width="216" height="40" fill="#3E2723" stroke="#92400E" strokeWidth="0.8" />
              <text x="180" y="148" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold" fontFamily="monospace">
                30cm Compost + Biochar + Soil
              </text>

              {/* Layer 3: Topsoil Mound with Tree Rootball */}
              <rect x="72" y="72" width="216" height="53" fill="#292524" />
              {/* Central Trunk & Root Crown */}
              <line x1="180" y1="20" x2="180" y2="95" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
              {/* Crown Leaves */}
              <circle cx="180" cy="18" r="16" fill="#15803D" />
              <circle cx="168" cy="22" r="13" fill="#16A34A" />
              <circle cx="192" cy="22" r="13" fill="#16A34A" />
              {/* Radiating Deep Roots */}
              <path d="M180,95 Q150,110 120,135" stroke="#D97706" strokeWidth="2" fill="none" />
              <path d="M180,95 Q210,110 240,135" stroke="#D97706" strokeWidth="2" fill="none" />
              <path d="M180,95 Q180,120 180,150" stroke="#D97706" strokeWidth="2" fill="none" />

              {/* Surface Mulch Ring & Water Basin Saucer */}
              <ellipse cx="180" cy="70" rx="85" ry="6" fill="#78350F" opacity="0.8" />
              <text x="180" y="66" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="bold" fontFamily="monospace">
                8cm Surface Mulch Ring
              </text>

              {/* Right Technical Specification Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#10B981" />
              <text x="455" y="48" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                EGW PIT PROTOCOL (1M³)
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Dimensions: 1.0m × 1.0m × 1.0m</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Base: 20cm rocks break taproot rot</text>
              <text x="345" y="118" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Nutrition: 40kg compost + 4kg biochar</text>
              <text x="345" y="140" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Anchor: 2kg steamed bone meal</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Longevity: Sustains 40+ yr fruit yield</text>
            </svg>
          )}

          {/* 2. A-FRAME CONTOUR SWALE & WATER RETENTION */}
          {visualConfig.diagramType === 'water-swale' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="A-Frame swale survey and keyline water infiltration diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Sloping Hillside Ground */}
              <path d="M 20 60 Q 180 85 360 115" stroke="#78716C" strokeWidth="2" strokeDasharray="3 3" fill="none" />

              {/* Swale Trench Cross-Section (Level Ditch) */}
              <polygon points="70,72 170,72 145,145 95,145" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" opacity="0.85" />
              <text x="120" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Rain Infiltration
              </text>

              {/* Downhill Mound (Mtumbira) with Vetiver Roots */}
              <path d="M 170 72 Q 220 28 270 95 Z" fill="#3E2723" stroke="#D97706" strokeWidth="1.5" />
              {/* Vetiver Grass Clumps on Mound */}
              <line x1="220" y1="35" x2="215" y2="10" stroke="#22C55E" strokeWidth="2.5" />
              <line x1="220" y1="35" x2="225" y2="8" stroke="#16A34A" strokeWidth="2.5" />
              <line x1="220" y1="35" x2="232" y2="12" stroke="#15803D" strokeWidth="2.5" />
              {/* Deep Anchor Roots */}
              <path d="M220,50 Q215,100 210,165" stroke="#A16207" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
              <path d="M225,50 Q235,105 240,165" stroke="#A16207" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
              <text x="220" y="55" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="bold" fontFamily="monospace">
                Vetiver Berm
              </text>

              {/* Infiltration Plume Arrows into Water Table */}
              <path d="M 120 150 L 120 190" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
              <text x="120" y="202" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="monospace">
                Aquifer Recharge ↓
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#0284C7" />
              <text x="455" y="48" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                A-FRAME &amp; SWALE CALIBRATION
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Rule: Slow it, Spread it, Sink it</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Trench: 60cm wide × 35cm flat base</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Berm: Subsoil piled on downhill rim</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Anchors: Vetiver grass stops erosion</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Spillway: Stone-lined level sill overflow</text>
            </svg>
          )}

          {/* 3. ZEER POT DUAL-CLAY EVAPORATIVE REFRIGERATOR */}
          {visualConfig.diagramType === 'zeer-pot' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Zeer pot evaporative cooling refrigerator cross section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Outer Terracotta Pot */}
              <ellipse cx="170" cy="115" rx="105" ry="75" fill="#78350F" stroke="#D97706" strokeWidth="2" />

              {/* Damp Sand Layer */}
              <ellipse cx="170" cy="115" rx="85" ry="60" fill="#B45309" stroke="#FDE68A" strokeWidth="1.5" />
              <text x="170" y="165" textAnchor="middle" fill="#FEF3C7" fontSize="8" fontWeight="bold" fontFamily="monospace">
                Wet River Sand
              </text>

              {/* Inner Vegetable Chamber Pot */}
              <ellipse cx="170" cy="115" rx="65" ry="45" fill="#064E3B" stroke="#34D399" strokeWidth="1.8" />
              <text x="170" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                14°C – 17°C
              </text>
              <text x="170" y="126" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontFamily="monospace">
                Preserves Greens 21 Days
              </text>

              {/* Wet Burlap Jute Cover */}
              <path d="M 100 48 Q 170 38 240 48" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
              <text x="170" y="32" textAnchor="middle" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Wet Jute Cloth (Water Replenished 2× Daily)
              </text>

              {/* Evaporative Latent Heat Radiating Outward */}
              <path d="M 60 115 L 25 115" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
              <path d="M 280 115 L 315 115" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
              <text x="40" y="105" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="monospace">Heat Evaporates</text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#D97706" />
              <text x="455" y="48" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                ZEER EVAPORATIVE PHYSICS
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Power: 0 Watts (Electricity Free)</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Cooling: Drops 8°C–12°C below ambient</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Sand: Clean river sand kept damp</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Tomatoes: Stay fresh 20 days vs 2</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Placement: Elevated, ventilated shade</text>
            </svg>
          )}

          {/* 4. WHOLESOME BREADMAKING & STONE QUERN MILLING */}
          {visualConfig.diagramType === 'bread-milling' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Stone quern milling and cob bread oven cross section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Rotary Quern Stone Mill */}
              <rect x="30" y="90" width="120" height="25" rx="4" fill="#57534E" stroke="#A8A29E" strokeWidth="1.5" />
              <text x="90" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">
                Runner Stone
              </text>
              <rect x="25" y="115" width="130" height="30" rx="4" fill="#44403C" stroke="#78716C" strokeWidth="1.5" />
              <text x="90" y="133" textAnchor="middle" fill="#D6D3D1" fontSize="8" fontFamily="monospace">
                Bed Stone
              </text>
              {/* Hopper Funnel */}
              <polygon points="65,45 115,45 95,90 85,90" fill="#78350F" stroke="#D97706" strokeWidth="1.2" />
              <text x="90" y="40" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Whole Grain Hopper
              </text>

              {/* Cob Oven Thermal Mass Cross Section */}
              <path d="M 180 150 Q 240 50 300 150 Z" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
              {/* Interior Baking Hearth */}
              <path d="M 195 150 Q 240 75 285 150 Z" fill="#1C1917" />
              {/* Glowing Loaf */}
              <ellipse cx="240" cy="142" rx="24" ry="10" fill="#D97706" stroke="#FEF08A" strokeWidth="1" />
              <text x="240" y="115" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="bold" fontFamily="monospace">
                210°C Hearth
              </text>
              <text x="240" y="165" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace">
                Retained Thermal Heat
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#F59E0B" />
              <text x="455" y="48" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                STAFF OF LIFE PROTOCOL
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Mill: Fresh grind right before dough</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Ferment: 18-hr wild sourdough sponge</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Zero Chemicals: No soda, saleratus, lard</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Hearth: Cob oven high radiant heat</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Zwieback: Twice-baked for digestion</text>
            </svg>
          )}

          {/* 5. CONTRAST HYDROTHERAPY & CHARCOAL POULTICE */}
          {visualConfig.diagramType === 'hydrotherapy' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Contrast hydrotherapy and charcoal poultice schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Contrast Cycle Boxes */}
              <rect x="25" y="40" width="135" height="130" rx="10" fill="#450A0A" stroke="#F87171" strokeWidth="2" />
              <text x="92" y="70" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="bold" fontFamily="monospace">
                HOT PHASE (3 MIN)
              </text>
              <text x="92" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                40°C – 43°C
              </text>
              <text x="92" y="120" textAnchor="middle" fill="#FECACA" fontSize="9" fontFamily="monospace">
                Vasodilation &amp;
              </text>
              <text x="92" y="136" textAnchor="middle" fill="#FECACA" fontSize="9" fontFamily="monospace">
                White Cell Surge
              </text>

              <rect x="175" y="40" width="135" height="130" rx="10" fill="#082F49" stroke="#38BDF8" strokeWidth="2" />
              <text x="242" y="70" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="bold" fontFamily="monospace">
                COLD (30 SEC)
              </text>
              <text x="242" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                12°C – 16°C
              </text>
              <text x="242" y="120" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                Tonic Vascular Pump
              </text>
              <text x="242" y="136" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                Repeat × 3 Cycles
              </text>

              {/* Charcoal Poultice Stack */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#10B981" />
              <text x="455" y="48" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                4-LAYER CHARCOAL POULTICE
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Core: 1:1 hardwood charcoal + flaxseed</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Inner: Thin cotton muslin next to skin</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Barrier: Plastic wrap to hold moisture</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Outer: Warm wool flannel insulation</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Action: Adsorbs venom, toxins &amp; sepsis</text>
            </svg>
          )}

          {/* 6. RAM-PRESS COLD OIL EXTRACTION & SOY MILK */}
          {visualConfig.diagramType === 'plant-press' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Manual ram press and plant milk extraction diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Ram Press Cylinder */}
              <rect x="50" y="70" width="180" height="55" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
              {/* Threaded Ram Screw & Handle */}
              <line x1="15" y1="97" x2="130" y2="97" stroke="#CBD5E1" strokeWidth="6" />
              <circle cx="15" cy="97" r="14" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
              {/* Perforated Oil Drain Plate */}
              <line x1="180" y1="125" x2="180" y2="155" stroke="#FDE047" strokeWidth="3" strokeDasharray="3 3" />
              {/* Oil Beaker */}
              <path d="M 160 155 L 200 155 L 195 185 L 165 185 Z" fill="#EAB308" opacity="0.85" stroke="#CA8A04" strokeWidth="1.5" />
              <text x="180" y="198" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="bold" fontFamily="monospace">
                Cold Pressed Oil
              </text>
              <text x="135" y="60" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Manual Screw Compression (Sunflower / Moringa)
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#EAB308" />
              <text x="455" y="48" textAnchor="middle" fill="#FACC15" fontSize="10" fontWeight="bold" fontFamily="monospace">
                HOMESTEAD OIL &amp; PROTEIN
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Sunflower/Moringa: 35–40% oil yield</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Press: Cold physical ram extraction</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• By-Product: High-protein press cake</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Soy Milk: Simmer 20 min (kill trypsin)</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Tofu: Coagulate with lemon juice / nigari</text>
            </svg>
          )}

          {/* 7. HERMETIC SEED VAULT & GERMINATION ASSAY */}
          {visualConfig.diagramType === 'seed-vault' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Hermetic seed vault and germination assay diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Glass Seed Jar with Hermetic Seal */}
              <rect x="40" y="45" width="100" height="120" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="55" y="32" width="70" height="15" rx="3" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Seeds Inside Jar */}
              <rect x="45" y="80" width="90" height="80" fill="#78350F" opacity="0.6" rx="6" />
              <text x="90" y="120" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Heirloom Seeds
              </text>
              {/* Bottom Desiccant Layer (Dry Wood Ash / Silica) */}
              <rect x="45" y="148" width="90" height="14" fill="#64748B" rx="3" />
              <text x="90" y="159" textAnchor="middle" fill="#F8FAFC" fontSize="7" fontWeight="bold" fontFamily="monospace">
                Dry Wood Ash Desiccant
              </text>

              {/* 10-Seed Germination Assay Grid */}
              <rect x="170" y="45" width="120" height="120" rx="10" fill="#14532D" stroke="#22C55E" strokeWidth="1.5" />
              <text x="230" y="65" textAnchor="middle" fill="#86EFAC" fontSize="9" fontWeight="bold" fontFamily="monospace">
                10-Seed Paper Assay
              </text>
              {/* 10 Seeds with Sprouting Radicles */}
              {[
                [195, 85], [230, 85], [265, 85],
                [195, 110], [230, 110], [265, 110],
                [195, 135], [230, 135], [265, 135],
                [230, 155]
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={4} fill="#FEF08A" />
                  <path d={`M ${cx} ${cy} Q ${cx - 6} ${cy - 8} ${cx - 8} ${cy - 12}`} stroke="#4ADE80" strokeWidth="1.5" fill="none" />
                </g>
              ))}

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#22C55E" />
              <text x="455" y="48" textAnchor="middle" fill="#4ADE80" fontSize="10" fontWeight="bold" fontFamily="monospace">
                SEED VAULT PROTOCOL
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Moisture: Must be &lt; 8% before sealing</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Test: Shatters on hammer blow (not dent)</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Pest Defense: 10% sieved wood ash</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Target: 90%+ germination rate</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Storage: Hermetic cool dark location</text>
            </svg>
          )}

          {/* 8. BROADFORK DEEP LIVING SOIL AERATION */}
          {visualConfig.diagramType === 'broadfork-soil' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Broadfork soil aeration and microbial profile diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Broadfork Tool */}
              <rect x="110" y="20" width="6" height="70" fill="#94A3B8" />
              <rect x="150" y="20" width="6" height="70" fill="#94A3B8" />
              <rect x="100" y="18" width="66" height="6" fill="#D97706" />
              <rect x="95" y="88" width="76" height="8" fill="#475569" />
              {/* 5 Forged Tines Penetrating 30cm */}
              {[100, 115, 133, 150, 165].map((tx, i) => (
                <line key={i} x1={tx} y1={96} x2={tx} y2={155} stroke="#E2E8F0" strokeWidth="2.5" />
              ))}

              {/* Soil Strata Layers */}
              {/* O Horizon: 5cm God's Blanket Mulch */}
              <rect x="25" y="90" width="280" height="15" fill="#78350F" opacity="0.8" />
              <text x="40" y="101" fill="#FEF3C7" fontSize="8" fontWeight="bold" fontFamily="monospace">O: 5cm Mulch</text>

              {/* A Horizon: 25cm Topsoil Living Biological Matrix */}
              <rect x="25" y="105" width="280" height="50" fill="#3E2723" opacity="0.9" />
              <text x="40" y="132" fill="#86EFAC" fontSize="8" fontWeight="bold" fontFamily="monospace">A: Living Aerobic Zone</text>

              {/* B Horizon: Subsoil (Aerated, Not Inverted) */}
              <rect x="25" y="155" width="280" height="40" fill="#1C1917" />
              <text x="40" y="178" fill="#CBD5E1" fontSize="8" fontFamily="monospace">B: Subsoil (Never Inverted)</text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#10B981" />
              <text x="455" y="48" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                NO-TILL BROADFORK METHOD
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Depth: 30cm deep oxygen penetration</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Spacing: Pull back every 20cm step</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Biology: Protects fungal mycorrhizae</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Weed Seeds: Stays dormant in deep subsoil</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Water: Multiplies absorption by 400%</text>
            </svg>
          )}

          {/* 9. COMPRESSED EARTH BLOCK (CEB) & STONE FOUNDATION */}
          {visualConfig.diagramType === 'earth-block' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Pressed earth block wall and stone foundation cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Ground Level */}
              <line x1="20" y1="145" x2="330" y2="145" stroke="#A16207" strokeWidth="2.5" />
              {/* 60cm Stone Rubble Foundation */}
              <rect x="100" y="130" width="110" height="65" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
              <text x="155" y="168" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold" fontFamily="monospace">
                60cm Stone Trench
              </text>
              {/* Waterproof DPC Membrane */}
              <line x1="90" y1="128" x2="220" y2="128" stroke="#38BDF8" strokeWidth="4" />
              <text x="50" y="128" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                DPC Plastic →
              </text>
              {/* Pressed Earth Block Wall */}
              <rect x="115" y="52" width="80" height="76" fill="#9A3412" stroke="#F97316" strokeWidth="2" />
              <text x="155" y="94" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontWeight="bold" fontFamily="monospace">
                CEB Earth Wall
              </text>
              {/* Wide 1m Roof Overhang */}
              <polygon points="45,62 155,18 265,62" fill="#334155" stroke="#FBBF24" strokeWidth="2" />
              <text x="75" y="78" textAnchor="middle" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">
                ↔ 1.0m Overhang
              </text>

              {/* Right Specs */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#F97316" />
              <text x="455" y="48" textAnchor="middle" fill="#FB923C" fontSize="10" fontWeight="bold" fontFamily="monospace">
                EARTH BLOCK MIX (7:2:1)
              </text>
              <text x="345" y="74" fill="#FFFFFF" fontSize="9" fontFamily="monospace">• 70% Coarse Sand / Gritty Loam</text>
              <text x="345" y="96" fill="#FDE68A" fontSize="9" fontFamily="monospace">• 20% Subsoil Clay Binder</text>
              <text x="345" y="118" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• 8–10% Cement or Hydraulic Lime</text>
              <text x="345" y="140" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Compaction: 15–20 MPa manual press</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Cure: Wet under tarp shade 21 days</text>
            </svg>
          )}

          {/* 10. 5-LAYER BIOSAND FILTER & SOLAR MICRO-GRID */}
          {visualConfig.diagramType === 'water-energy' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Biosand water filter 5-layer cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Filter Column */}
              <rect x="40" y="20" width="160" height="175" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              {/* Layer 1: Diffuser & Standing Water */}
              <rect x="44" y="25" width="152" height="25" fill="#0284C7" opacity="0.5" />
              <text x="120" y="41" textAnchor="middle" fill="#E0F2FE" fontSize="8" fontWeight="bold" fontFamily="monospace">
                1. 5cm Biolayer (Schmutzdecke)
              </text>
              {/* Layer 2: Fine Silica Sand */}
              <rect x="44" y="50" width="152" height="75" fill="#D97706" opacity="0.85" />
              <text x="120" y="92" textAnchor="middle" fill="#FEF9C3" fontSize="9" fontWeight="bold" fontFamily="monospace">
                2. 45cm Washed Silica Sand
              </text>
              {/* Layer 3: Activated Charcoal */}
              <rect x="44" y="125" width="152" height="22" fill="#18181B" />
              <text x="120" y="140" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontWeight="bold" fontFamily="monospace">
                3. Crushed Hardwood Charcoal
              </text>
              {/* Layer 4: Coarse Sand & Pea Gravel */}
              <rect x="44" y="147" width="152" height="44" fill="#64748B" />
              <text x="120" y="173" textAnchor="middle" fill="#F8FAFC" fontSize="8" fontWeight="bold" fontFamily="monospace">
                4. 15cm Gravel Underbed
              </text>
              {/* Rising Outlet Weir Pipe */}
              <path d="M 200 175 L 245 175 L 245 45 L 290 45" stroke="#38BDF8" strokeWidth="5" fill="none" />
              <text x="245" y="35" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                High-Weir
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#38BDF8" />
              <text x="455" y="48" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                BIOSAND FILTRATION PURITY
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Weir: Keeps sand submerged 24/7</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Bio-Layer: Consumes parasites &amp; worms</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Efficiency: 98% bacteria &amp; turbidity</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Charcoal: Adsorbs pesticides &amp; odor</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Flow: 15–30 Liters per hour gravity</text>
            </svg>
          )}

          {/* 11. INDIRECT SOLAR CABINET DEHYDRATOR */}
          {visualConfig.diagramType === 'preservation' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Indirect solar cabinet dehydrator airflow diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Sloped Solar Collector */}
              <polygon points="25,175 195,115 195,135 25,195" fill="#18181B" stroke="#F59E0B" strokeWidth="2" />
              <text x="110" y="135" textAnchor="middle" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">
                SOLAR: Black Collector (52°C)
              </text>
              {/* Vertical Drying Cabinet */}
              <rect x="195" y="30" width="120" height="155" rx="6" fill="#3E2723" stroke="#D97706" strokeWidth="2" />
              {[60, 95, 130].map((y, idx) => (
                <g key={y}>
                  <line x1="205" y1={y} x2="305" y2={y} stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="255" y={y - 5} textAnchor="middle" fill="#FEF9C3" fontSize="8" fontFamily="monospace">
                    Mesh Tray #{idx + 1}
                  </text>
                </g>
              ))}
              {/* Rising Warm Airflow Arrow */}
              <path d="M 50 182 L 185 128 L 255 165 L 255 38" stroke="#F97316" strokeWidth="2.5" strokeDasharray="5 3" fill="none" />

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#F59E0B" />
              <text x="455" y="48" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                INDIRECT DRYING SPECS
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Temperature: 48°C – 55°C</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Shaded Cabinet: Blocks UV vitamin loss</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• Convection: Updraft removes moisture</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Blanching: 3-min steam before drying</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Pack: PICS airtight bags + wood ash</text>
            </svg>
          )}

          {/* 12. 18-DAY BERKELEY THERMOPHILIC COMPOST PILE */}
          {visualConfig.diagramType === 'farming' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Thermophilic compost and soil layering schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* Compost Mound Layers */}
              <path d="M 30 180 Q 165 20 300 180 Z" fill="#3E2723" stroke="#D97706" strokeWidth="2" />
              {/* Inner 65C Core */}
              <ellipse cx="165" cy="135" rx="65" ry="34" fill="#B45309" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="165" y="132" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="bold" fontFamily="monospace">
                55°C–65°C CORE
              </text>
              <text x="165" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
                30:1 Carbon : Nitrogen
              </text>
              {/* Center Aeration Bamboo Pole */}
              <rect x="162" y="25" width="6" height="155" fill="#84CC16" />
              <text x="165" y="18" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Bamboo Chimney
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#10B981" />
              <text x="455" y="48" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                18-DAY HOT COMPOST TURNS
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• Top Cap: 10cm dry straw moisture blanket</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• Green: 30% fresh legume &amp; manure</text>
              <text x="345" y="118" fill="#D6D3D1" fontSize="9" fontFamily="monospace">• Brown: 70% dry stalks, straw &amp; ash</text>
              <text x="345" y="140" fill="#93C5FD" fontSize="9" fontFamily="monospace">• Turn Schedule: Days 4, 7, 10, 14, 18</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Core Heat: Destroys pathogens &amp; weed seed</text>
            </svg>
          )}

          {/* 13. AVONDALE HEAD-HAND-HEART & WONDERBAG THERMAL POT */}
          {visualConfig.diagramType === 'education' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Avondale daily study-work rhythm and fireless thermal cooker schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill="#07170F" />
              {/* 3 Blocks of True Education */}
              <rect x="15" y="40" width="95" height="130" rx="8" fill="#1E293B" stroke="#FBBF24" strokeWidth="1.5" />
              <text x="62" y="66" textAnchor="middle" fill="#FDE047" fontSize="8" fontWeight="bold" fontFamily="monospace">
                05:30 – 11:30
              </text>
              <text x="62" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                HEAD &amp; HEART
              </text>
              <text x="62" y="112" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="monospace">
                Bible, Sciences,
              </text>
              <text x="62" y="128" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="monospace">
                Physiology &amp; Math
              </text>

              <rect x="118" y="40" width="95" height="130" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
              <text x="165" y="66" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontWeight="bold" fontFamily="monospace">
                13:30 – 16:30
              </text>
              <text x="165" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                HANDS &amp; TRADE
              </text>
              <text x="165" y="112" textAnchor="middle" fill="#D1FAE5" fontSize="8" fontFamily="monospace">
                Agriculture, Wood,
              </text>
              <text x="165" y="128" textAnchor="middle" fill="#D1FAE5" fontSize="8" fontFamily="monospace">
                Masonry &amp; Sewing
              </text>

              <rect x="220" y="40" width="95" height="130" rx="8" fill="#3E2723" stroke="#F97316" strokeWidth="1.5" />
              <text x="267" y="66" textAnchor="middle" fill="#FDBA74" fontSize="8" fontWeight="bold" fontFamily="monospace">
                SABBATH POT
              </text>
              <text x="267" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                &gt;68°C / 8 HRS
              </text>
              <text x="267" y="112" textAnchor="middle" fill="#FFEDD5" fontSize="8" fontFamily="monospace">
                Wonderbag Cooker
              </text>
              <text x="267" y="128" textAnchor="middle" fill="#FFEDD5" fontSize="8" fontFamily="monospace">
                Zero Fire Kindled
              </text>

              {/* Right Spec Card */}
              <rect x="330" y="25" width="250" height="165" rx="8" fill="#0F172A" stroke="#FBBF24" />
              <text x="455" y="48" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">
                AVONDALE TRUE EDUCATION
              </text>
              <text x="345" y="74" fill="#FEF3C7" fontSize="9" fontFamily="monospace">• 40% Head: Spiritual &amp; intellectual</text>
              <text x="345" y="96" fill="#A7F3D0" fontSize="9" fontFamily="monospace">• 40% Hand: Agriculture &amp; building crafts</text>
              <text x="345" y="118" fill="#BAE6FD" fontSize="9" fontFamily="monospace">• 20% Heart: Health, melody &amp; service</text>
              <text x="345" y="140" fill="#FDE68A" fontSize="9" fontFamily="monospace">• Student Plot: 5m × 5m personal garden</text>
              <text x="345" y="162" fill="#F8FAFC" fontSize="9" fontFamily="monospace">• Preparation: Friday sunset readiness</text>
            </svg>
          )}
        </div>
      </div>

      {/* Bottom Row: Connected Visual Step-by-Step Pipeline & Tools Strip */}
      {!compact && steps.length > 0 && (
        <div className="pt-4 border-t border-emerald-900/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono uppercase tracking-wider text-amber-300 font-bold">
              Step-by-Step Execution Flowchart
            </span>
            {toolsNeeded.length > 0 && (
              <span className="text-caption font-mono text-emerald-300 flex items-center gap-1">
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
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-mono text-caption font-extrabold">
                      STEP 0{idx + 1}
                    </span>
                    {idx < 3 && (
                      <ArrowRight size={13} className="text-emerald-400 hidden lg:inline" />
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-amber-200 leading-snug">
                    {stepHeading}
                  </h5>
                  <p className="text-caption text-emerald-100/80 leading-relaxed line-clamp-3">
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
