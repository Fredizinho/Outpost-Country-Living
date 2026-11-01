import React from 'react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { Layers, ArrowRight, Wrench } from 'lucide-react';
import { StandardDiagram } from '@/components/common/StandardDiagram';
import { OUTPOST_SCHEMATIC_THEME } from '@/theme';

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
      idLower.includes('roof') ||
      idLower.includes('rainwater') ||
      idLower.includes('tank') ||
      idLower.includes('catchment')
    ) {
      return {
        image: COUNTRY_IMAGES.offgridHomesteadWater,
        imageCaption: 'Rainwater Catchment Gutters, First Flush Diverter & 5,000L Storage Tank',
        diagramTitle: 'Roof Catchment, 110mm First Flush Diverter & Concrete Base',
        diagramType: 'roof-tank' as const,
      };
    }
    if (
      idLower.includes('ridge') ||
      idLower.includes('sasakawa') ||
      idLower.includes('spacing') ||
      idLower.includes('drought-resistant')
    ) {
      return {
        image: COUNTRY_IMAGES.permacultureGarden,
        imageCaption: 'Contour Ridge Spacing (75cm) & Station Planting (30cm)',
        diagramTitle: 'Sasakawa Contour Ridges, 75cm Furrows & Infiltration Basins',
        diagramType: 'ridge-spacing' as const,
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
      idLower.includes('remedy') ||
      idLower.startsWith('hr-') ||
      idLower.includes('poultice')
    ) {
      return {
        image: COUNTRY_IMAGES.sanitariumNaturalDispensary,
        imageCaption: 'Contrast Hydrotherapy & Activated Charcoal Poultice Protocol',
        diagramTitle: 'Vascular Response Waves & 4-Layer Charcoal Matrix Cross-Section',
        diagramType: 'hydrotherapy' as const,
      };
    }
    if (
      idLower.includes('oil') ||
      idLower.includes('tofu') ||
      idLower.includes('protein') ||
      idLower.includes('milk') ||
      idLower.startsWith('po-')
    ) {
      return {
        image: COUNTRY_IMAGES.buyingSelling,
        imageCaption: 'Manual Ram-Press Cold Extraction & Fresh Soy Coagulation',
        diagramTitle: 'Continuous Cold Press Screw & Curd Coagulation Profile',
        diagramType: 'plant-press' as const,
      };
    }
    if (
      idLower.includes('seed') ||
      idLower.includes('vault') ||
      idLower.startsWith('sv-') ||
      idLower.includes('bank')
    ) {
      return {
        image: COUNTRY_IMAGES.permacultureGarden,
        imageCaption: 'Hermetic Non-GMO Seed Vault & 10-Seed Germination Assay',
        diagramTitle: 'Hermetic Glass Desiccant Vault & Moisture Test Benchmark',
        diagramType: 'seed-vault' as const,
      };
    }
    if (
      idLower.includes('soil') ||
      idLower.includes('broadfork') ||
      idLower.startsWith('sb-') ||
      idLower.includes('aeration')
    ) {
      return {
        image: COUNTRY_IMAGES.edenicDeepPlantingPit,
        imageCaption: 'Deep U-Bar Broadfork Aeration & Living Fungal Profile',
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
    <div className="rounded-[var(--radius-sheet)] bg-[var(--ground)] border border-emerald-900/70 p-5 sm:p-7 text-white flex flex-col gap-6 shadow-lg">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-amber-500/15 border border-amber-500/30 text-amber-300 text-caption font-semibold flex items-center gap-1.5">
            <Layers size={12} />
            <span>Visual skill schematic and step flow</span>
          </span>
          <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
            {visualConfig.diagramTitle}
          </span>
        </div>
        <span className="text-caption font-medium text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-[var(--radius-control)] border border-emerald-800">
          {steps.length} sequential steps
        </span>
      </div>

      {/* Middle Row: Ready Reference Image + Enhanced Vector Blueprint Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Ready Image (4 cols) */}
        <div className="lg:col-span-4 relative rounded-[var(--radius-card)] overflow-hidden border border-emerald-800/60 h-48 sm:h-56 bg-stone-950">
          <img
            src={visualConfig.image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4">
            <span className="text-caption text-amber-300 font-semibold block">
              {category} Reference
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
              {visualConfig.imageCaption}
            </p>
          </div>
        </div>

        {/* Right: Domain SVG Vector Schematic (8 cols) */}
        <div className="lg:col-span-8 bg-[var(--ground)] rounded-[var(--radius-card)] p-3 sm:p-4 border border-emerald-900/80 overflow-hidden">
          {visualConfig.diagramType === 'tree-pit' && <StandardDiagram type="planting-pit" />}
          {visualConfig.diagramType === 'ridge-spacing' && <StandardDiagram type="ridge-spacing" />}
          {visualConfig.diagramType === 'water-swale' && <StandardDiagram type="swale" />}
          {visualConfig.diagramType === 'roof-tank' && <StandardDiagram type="roof-tank" />}
          {visualConfig.diagramType === 'zeer-pot' && <StandardDiagram type="zeer-pot" />}

          {/* BREADMAKING & STONE QUERN MILLING */}
          {visualConfig.diagramType === 'bread-milling' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Stone quern milling and cob bread oven cross section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="30" y="90" width="120" height="25" rx="4" fill={OUTPOST_SCHEMATIC_THEME.stoneQuernRunner} stroke={OUTPOST_SCHEMATIC_THEME.stoneQuernStroke} strokeWidth="1.5" />
              <text x="90" y="106" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12" fontWeight="bold">
                Runner Stone
              </text>
              <rect x="25" y="115" width="130" height="30" rx="4" fill={OUTPOST_SCHEMATIC_THEME.stoneQuernBed} stroke={OUTPOST_SCHEMATIC_THEME.stoneQuernBedStroke} strokeWidth="1.5" />
              <text x="90" y="133" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.stoneDryingText} fontSize="12">
                Bed Stone
              </text>
              <polygon points="65,45 115,45 95,90 85,90" fill={OUTPOST_SCHEMATIC_THEME.earthBrown} stroke={OUTPOST_SCHEMATIC_THEME.amberWarm} strokeWidth="1.2" />
              <text x="90" y="40" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12" fontWeight="bold">
                Whole Grain Hopper
              </text>

              <path d="M 180 150 Q 240 50 300 150 Z" fill={OUTPOST_SCHEMATIC_THEME.earthBrown} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="2" />
              <path d="M 195 150 Q 240 75 285 150 Z" fill={OUTPOST_SCHEMATIC_THEME.hearthDark} />
              <ellipse cx="240" cy="142" rx="24" ry="10" fill={OUTPOST_SCHEMATIC_THEME.amberWarm} stroke={OUTPOST_SCHEMATIC_THEME.goldSoft} strokeWidth="1" />
              <text x="240" y="115" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12" fontWeight="bold" fontFamily="monospace">
                210°C Hearth
              </text>
              <text x="240" y="165" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldWarm} fontSize="12">
                Retained Thermal Heat
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldBright} fontSize="12" fontWeight="bold">
                STAFF OF LIFE PROTOCOL
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Mill: Fresh grind right before dough</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Ferment: 18-hr wild sourdough sponge</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Zero Chemicals: No soda, saleratus, lard</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Hearth: Cob oven high radiant heat</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Zwieback: Twice-baked for digestion</text>
            </svg>
          )}

          {/* HYDROTHERAPY & CHARCOAL POULTICE */}
          {visualConfig.diagramType === 'hydrotherapy' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Contrast hydrotherapy and charcoal poultice schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="25" y="40" width="135" height="130" rx="10" fill={OUTPOST_SCHEMATIC_THEME.hotPhaseRed} stroke={OUTPOST_SCHEMATIC_THEME.hotPhaseStroke} strokeWidth="2" />
              <text x="92" y="70" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.hotPhaseText} fontSize="12" fontWeight="bold">
                HOT PHASE (3 MIN)
              </text>
              <text x="92" y="96" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="13" fontWeight="bold" fontFamily="monospace">
                40°C – 43°C
              </text>
              <text x="92" y="120" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.hotPhasePale} fontSize="12">
                Vasodilation &amp;
              </text>
              <text x="92" y="136" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.hotPhasePale} fontSize="12">
                White Cell Surge
              </text>

              <rect x="175" y="40" width="135" height="130" rx="10" fill={OUTPOST_SCHEMATIC_THEME.coldPhaseBlue} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="2" />
              <text x="242" y="70" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} fontSize="12" fontWeight="bold">
                COLD (30 SEC)
              </text>
              <text x="242" y="96" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="13" fontWeight="bold" fontFamily="monospace">
                12°C – 16°C
              </text>
              <text x="242" y="120" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">
                Tonic Vascular Pump
              </text>
              <text x="242" y="136" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">
                Repeat × 3 Cycles
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldStroke} fontSize="12" fontWeight="bold">
                4-LAYER CHARCOAL POULTICE
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Core: 1:1 hardwood charcoal + flaxseed</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Inner: Thin cotton muslin next to skin</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Barrier: Plastic wrap to hold moisture</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Outer: Warm wool flannel insulation</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Action: Adsorbs venom, toxins &amp; sepsis</text>
            </svg>
          )}

          {/* RAM-PRESS OIL EXTRACTION */}
          {visualConfig.diagramType === 'plant-press' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Manual ram press and plant milk extraction diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="50" y="70" width="180" height="55" rx="6" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.slateMuted} strokeWidth="2" />
              <line x1="15" y1="97" x2="130" y2="97" stroke={OUTPOST_SCHEMATIC_THEME.slateBorder} strokeWidth="6" />
              <circle cx="15" cy="97" r="14" fill={OUTPOST_SCHEMATIC_THEME.darkSlateGutter} stroke={OUTPOST_SCHEMATIC_THEME.slateMuted} strokeWidth="2" />
              <line x1="180" y1="125" x2="180" y2="155" stroke={OUTPOST_SCHEMATIC_THEME.amberPale} strokeWidth="3" strokeDasharray="3 3" />
              <path d="M 160 155 L 200 155 L 195 185 L 165 185 Z" fill={OUTPOST_SCHEMATIC_THEME.goldWarm} opacity="0.85" stroke={OUTPOST_SCHEMATIC_THEME.amberWarm} strokeWidth="1.5" />
              <text x="180" y="198" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12" fontWeight="bold">
                Cold Pressed Oil
              </text>
              <text x="135" y="60" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12" fontWeight="bold">
                Manual Screw Compression
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.yellowDot} fontSize="12" fontWeight="bold">
                HOMESTEAD OIL &amp; PROTEIN
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Sunflower/Moringa: 35–40% oil yield</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Press: Cold physical ram extraction</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• By-Product: High-protein press cake</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Soy Milk: Simmer 20 min (kill trypsin)</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Tofu: Coagulate with lemon juice / nigari</text>
            </svg>
          )}

          {/* HERMETIC SEED VAULT */}
          {visualConfig.diagramType === 'seed-vault' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Hermetic seed vault and germination assay diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="40" y="45" width="100" height="120" rx="12" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="2" />
              <rect x="55" y="32" width="70" height="15" rx="3" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.slateMuted} strokeWidth="1.5" />
              <rect x="45" y="80" width="90" height="80" fill={OUTPOST_SCHEMATIC_THEME.earthBrown} opacity="0.6" rx="6" />
              <text x="90" y="120" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12" fontWeight="bold">
                Heirloom Seeds
              </text>
              <rect x="45" y="148" width="90" height="14" fill={OUTPOST_SCHEMATIC_THEME.slateLine} rx="3" />
              <text x="90" y="159" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12" fontWeight="bold">
                Dry Wood Ash Desiccant
              </text>

              <rect x="170" y="45" width="120" height="120" rx="10" fill={OUTPOST_SCHEMATIC_THEME.deepForest} stroke={OUTPOST_SCHEMATIC_THEME.emeraldLight} strokeWidth="1.5" />
              <text x="230" y="65" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldLight} fontSize="12" fontWeight="bold">
                10-Seed Paper Assay
              </text>
              {[
                [195, 85], [230, 85], [265, 85],
                [195, 110], [230, 110], [265, 110],
                [195, 135], [230, 135], [265, 135],
                [230, 155]
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={4} fill={OUTPOST_SCHEMATIC_THEME.goldSoft} />
                  <path d={`M ${cx} ${cy} Q ${cx - 6} ${cy - 8} ${cx - 8} ${cy - 12}`} stroke={OUTPOST_SCHEMATIC_THEME.emeraldStroke} strokeWidth="1.5" fill="none" />
                </g>
              ))}

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.emeraldLight} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldStroke} fontSize="12" fontWeight="bold">
                SEED VAULT PROTOCOL
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Moisture: Must be &lt; 8% before sealing</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Test: Shatters on hammer blow (not dent)</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Pest Defense: 10% sieved wood ash</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Target: 90%+ germination rate</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Storage: Hermetic cool dark location</text>
            </svg>
          )}

          {/* BROADFORK LIVING SOIL */}
          {visualConfig.diagramType === 'broadfork-soil' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Broadfork soil aeration and microbial profile diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="110" y="20" width="6" height="70" fill={OUTPOST_SCHEMATIC_THEME.slateMuted} />
              <rect x="150" y="20" width="6" height="70" fill={OUTPOST_SCHEMATIC_THEME.slateMuted} />
              <rect x="100" y="18" width="66" height="6" fill={OUTPOST_SCHEMATIC_THEME.amberWarm} />
              <rect x="95" y="88" width="76" height="8" fill={OUTPOST_SCHEMATIC_THEME.darkSlateGutter} />
              {[100, 115, 133, 150, 165].map((tx, i) => (
                <line key={i} x1={tx} y1={96} x2={tx} y2={155} stroke={OUTPOST_SCHEMATIC_THEME.slateLight} strokeWidth="2.5" />
              ))}

              <rect x="25" y="90" width="280" height="15" fill={OUTPOST_SCHEMATIC_THEME.earthBrown} opacity="0.8" />
              <text x="40" y="101" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12" fontWeight="bold">O: 5cm Mulch</text>

              <rect x="25" y="105" width="280" height="50" fill={OUTPOST_SCHEMATIC_THEME.earthDeep} opacity="0.9" />
              <text x="40" y="132" fill={OUTPOST_SCHEMATIC_THEME.emeraldLight} fontSize="12" fontWeight="bold">A: Living Aerobic Zone</text>

              <rect x="25" y="155" width="280" height="40" fill={OUTPOST_SCHEMATIC_THEME.hearthDark} />
              <text x="40" y="178" fill={OUTPOST_SCHEMATIC_THEME.slateBorder} fontSize="12">B: Subsoil (Never Inverted)</text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldStroke} fontSize="12" fontWeight="bold">
                NO-TILL BROADFORK METHOD
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Depth: 30cm deep oxygen penetration</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Spacing: Pull back every 20cm step</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Biology: Protects fungal mycorrhizae</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Weed Seeds: Stays dormant in deep subsoil</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Water: Multiplies absorption by 400%</text>
            </svg>
          )}

          {/* COMPRESSED EARTH BLOCK */}
          {visualConfig.diagramType === 'earth-block' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Pressed earth block wall and stone foundation cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <line x1="20" y1="145" x2="330" y2="145" stroke={OUTPOST_SCHEMATIC_THEME.groundGold} strokeWidth="2.5" />
              <rect x="100" y="130" width="110" height="65" fill={OUTPOST_SCHEMATIC_THEME.darkSlateGutter} stroke={OUTPOST_SCHEMATIC_THEME.slateMuted} strokeWidth="2" />
              <text x="155" y="168" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12" fontWeight="bold">
                60cm Stone Trench
              </text>
              <line x1="90" y1="128" x2="220" y2="128" stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="4" />
              <text x="50" y="128" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSky} fontSize="12" fontWeight="bold">
                DPC Plastic →
              </text>
              <rect x="115" y="52" width="80" height="76" fill={OUTPOST_SCHEMATIC_THEME.orangeRust} stroke={OUTPOST_SCHEMATIC_THEME.orangeRust} strokeWidth="2" />
              <text x="155" y="94" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12" fontWeight="bold">
                CEB Earth Wall
              </text>
              <polygon points="45,62 155,18 265,62" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.goldBright} strokeWidth="2" />
              <text x="75" y="78" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberPale} fontSize="12" fontWeight="bold">
                ↔ 1.0m Overhang
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.orangeRust} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.orangeRust} fontSize="12" fontWeight="bold">
                EARTH BLOCK MIX (7:2:1)
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12">• 70% Coarse Sand / Gritty Loam</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• 20% Subsoil Clay Binder</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• 8–10% Cement or Hydraulic Lime</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Compaction: 15–20 MPa manual press</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Cure: Wet under tarp shade 21 days</text>
            </svg>
          )}

          {/* BIOSAND FILTER */}
          {visualConfig.diagramType === 'water-energy' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Biosand water filter 5-layer cross-section">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="40" y="20" width="160" height="175" rx="6" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="2" />
              <rect x="44" y="25" width="152" height="25" fill={OUTPOST_SCHEMATIC_THEME.deepWater} opacity="0.5" />
              <text x="120" y="41" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyPale} fontSize="12" fontWeight="bold">
                1. 5cm Biolayer (Schmutzdecke)
              </text>
              <rect x="44" y="50" width="152" height="75" fill={OUTPOST_SCHEMATIC_THEME.amberWarm} opacity="0.85" />
              <text x="120" y="92" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12" fontWeight="bold">
                2. 45cm Washed Silica Sand
              </text>
              <rect x="44" y="125" width="152" height="22" fill={OUTPOST_SCHEMATIC_THEME.slateDark} />
              <text x="120" y="140" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12" fontWeight="bold">
                3. Crushed Hardwood Charcoal
              </text>
              <rect x="44" y="147" width="152" height="44" fill={OUTPOST_SCHEMATIC_THEME.slateLine} />
              <text x="120" y="173" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12" fontWeight="bold">
                4. 15cm Gravel Underbed
              </text>
              <path d="M 200 175 L 245 175 L 245 45 L 290 45" stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="5" fill="none" />
              <text x="245" y="35" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSky} fontSize="12" fontWeight="bold">
                High-Weir
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSky} fontSize="12" fontWeight="bold">
                BIOSAND FILTRATION PURITY
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Weir: Keeps sand submerged 24/7</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Bio-Layer: Consumes parasites &amp; worms</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Efficiency: 98% bacteria &amp; turbidity</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Charcoal: Adsorbs pesticides &amp; odor</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Flow: 15–30 Liters per hour gravity</text>
            </svg>
          )}

          {/* SOLAR DEHYDRATOR */}
          {visualConfig.diagramType === 'preservation' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Indirect solar cabinet dehydrator airflow diagram">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <polygon points="25,175 195,115 195,135 25,195" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="2" />
              <text x="110" y="135" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberPale} fontSize="12" fontWeight="bold">
                SOLAR: Black Collector (52°C)
              </text>
              <rect x="195" y="30" width="120" height="155" rx="6" fill={OUTPOST_SCHEMATIC_THEME.earthDeep} stroke={OUTPOST_SCHEMATIC_THEME.amberWarm} strokeWidth="2" />
              {[60, 95, 130].map((y, idx) => (
                <g key={y}>
                  <line x1="205" y1={y} x2="305" y2={y} stroke={OUTPOST_SCHEMATIC_THEME.amberLight} strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="255" y={y - 5} textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12">
                    Mesh Tray #{idx + 1}
                  </text>
                </g>
              ))}
              <path d="M 50 182 L 185 128 L 255 165 L 255 38" stroke={OUTPOST_SCHEMATIC_THEME.orangeRust} strokeWidth="2.5" strokeDasharray="5 3" fill="none" />

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldBright} fontSize="12" fontWeight="bold">
                INDIRECT DRYING SPECS
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Temperature: 48°C – 55°C</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Shaded Cabinet: Blocks UV vitamin loss</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• Convection: Updraft removes moisture</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Blanching: 3-min steam before drying</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Pack: PICS airtight bags + wood ash</text>
            </svg>
          )}

          {/* 18-DAY HOT COMPOST */}
          {visualConfig.diagramType === 'farming' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Thermophilic compost and soil layering schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <path d="M 30 180 Q 165 20 300 180 Z" fill={OUTPOST_SCHEMATIC_THEME.earthDeep} stroke={OUTPOST_SCHEMATIC_THEME.amberWarm} strokeWidth="2" />
              <ellipse cx="165" cy="135" rx="65" ry="34" fill={OUTPOST_SCHEMATIC_THEME.earthBrown} stroke={OUTPOST_SCHEMATIC_THEME.amberPale} strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="165" y="132" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12" fontWeight="bold">
                55°C–65°C CORE
              </text>
              <text x="165" y="148" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12">
                30:1 Carbon : Nitrogen
              </text>
              <rect x="162" y="25" width="6" height="155" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} />
              <text x="165" y="18" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12" fontWeight="bold">
                Bamboo Chimney
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldStroke} fontSize="12" fontWeight="bold">
                18-DAY HOT COMPOST TURNS
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• Top Cap: 10cm dry straw moisture blanket</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• Green: 30% fresh legume &amp; manure</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.stoneDryingText} fontSize="12">• Brown: 70% dry stalks, straw &amp; ash</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.waterPaleText} fontSize="12">• Turn Schedule: Days 4, 7, 10, 14, 18</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Core Heat: Destroys pathogens &amp; weed seed</text>
            </svg>
          )}

          {/* AVONDALE EDUCATION & WONDERBAG */}
          {visualConfig.diagramType === 'education' && (
            <svg viewBox="0 0 600 210" className="w-full h-auto select-none" role="img" aria-label="Avondale daily study-work rhythm and fireless thermal cooker schematic">
              <rect x="0" y="0" width="600" height="210" rx="10" fill={OUTPOST_SCHEMATIC_THEME.canvasBg} />
              <rect x="15" y="40" width="95" height="130" rx="8" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.goldBright} strokeWidth="1.5" />
              <text x="62" y="66" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberPale} fontSize="12" fontWeight="bold" fontFamily="monospace">
                05:30 – 11:30
              </text>
              <text x="62" y="90" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12" fontWeight="bold">
                HEAD &amp; HEART
              </text>
              <text x="62" y="112" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateBorder} fontSize="12">
                Bible, Sciences,
              </text>
              <text x="62" y="128" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateBorder} fontSize="12">
                Physiology &amp; Math
              </text>

              <rect x="118" y="40" width="95" height="130" rx="8" fill={OUTPOST_SCHEMATIC_THEME.deepForest} stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} strokeWidth="1.5" />
              <text x="165" y="66" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12" fontWeight="bold" fontFamily="monospace">
                13:30 – 16:30
              </text>
              <text x="165" y="90" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12" fontWeight="bold">
                HANDS &amp; TRADE
              </text>
              <text x="165" y="112" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.mintPale} fontSize="12">
                Agriculture, Wood,
              </text>
              <text x="165" y="128" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.mintPale} fontSize="12">
                Masonry &amp; Sewing
              </text>

              <rect x="220" y="40" width="95" height="130" rx="8" fill={OUTPOST_SCHEMATIC_THEME.earthDeep} stroke={OUTPOST_SCHEMATIC_THEME.orangeRust} strokeWidth="1.5" />
              <text x="267" y="66" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldSoft} fontSize="12" fontWeight="bold">
                SABBATH POT
              </text>
              <text x="267" y="90" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.white} fontSize="12" fontWeight="bold" fontFamily="monospace">
                &gt;68°C / 8 HRS
              </text>
              <text x="267" y="112" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">
                Wonderbag Cooker
              </text>
              <text x="267" y="128" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">
                Zero Fire Kindled
              </text>

              <rect x="330" y="25" width="250" height="165" rx="8" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.goldBright} />
              <text x="455" y="48" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberPale} fontSize="12" fontWeight="bold">
                AVONDALE TRUE EDUCATION
              </text>
              <text x="345" y="74" fill={OUTPOST_SCHEMATIC_THEME.goldLight} fontSize="12">• 40% Head: Spiritual &amp; intellectual</text>
              <text x="345" y="96" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="12">• 40% Hand: Agriculture &amp; building crafts</text>
              <text x="345" y="118" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="12">• 20% Heart: Health, melody &amp; service</text>
              <text x="345" y="140" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="12">• Student Plot: 5m × 5m personal garden</text>
              <text x="345" y="162" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="12">• Preparation: Friday sunset readiness</text>
            </svg>
          )}
        </div>
      </div>

      {/* Bottom Row: Connected Visual Step-by-Step Pipeline & Tools Strip */}
      {!compact && steps.length > 0 && (
        <div className="pt-4 border-t border-emerald-900/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-semibold text-amber-300">
              Step-by-Step Execution Flowchart
            </span>
            {toolsNeeded.length > 0 && (
              <span className="text-caption text-emerald-300 flex items-center gap-1">
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
                  className="p-3.5 rounded-[var(--radius-card)] bg-white/[0.04] border border-emerald-800/50 flex flex-col justify-between gap-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-[var(--radius-control)] bg-amber-500 text-slate-950 font-mono text-caption font-extrabold">
                      Step {idx + 1}
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
