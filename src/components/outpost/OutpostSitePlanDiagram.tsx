import React from 'react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { Compass } from 'lucide-react';
import { OutpostBlueprint } from '@/data/outpostFourPillarsData';
import { OUTPOST_SCHEMATIC_THEME } from '@/theme';

interface OutpostSitePlanDiagramProps {
  blueprint: OutpostBlueprint;
}

export function OutpostSitePlanDiagram({ blueprint }: OutpostSitePlanDiagramProps) {
  const imageByType: Record<OutpostBlueprint['type'], { src: string; label: string }> = {
    'Home School': {
      src: COUNTRY_IMAGES.childrenGarden,
      label: 'Family Home-School Sanctuary & Children’s Garden Plots',
    },
    'Small Sanitarium': {
      src: COUNTRY_IMAGES.sanitariumNaturalDispensary,
      label: 'Natural Remedies Sanitarium Dispensary & Highland Cottages',
    },
    'Treatment Rooms': {
      src: COUNTRY_IMAGES.sanitariumNaturalDispensary,
      label: 'Hydrotherapy Fomentations & Charcoal Apothecary Dispensary',
    },
    'Agricultural Training': {
      src: COUNTRY_IMAGES.ruralIndustrialSanctuary,
      label: 'Avondale & Madison Vocational Carpentry, Agroforestry & Bakery Campus',
    },
  };

  const activeVisual = imageByType[blueprint.type] || imageByType['Home School'];

  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--ground)] border border-emerald-900/70 p-4 sm:p-6 text-white flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[var(--radius-control)] bg-amber-500/15 border border-amber-500/30 text-amber-300 text-caption font-semibold flex items-center gap-1.5">
            <Compass size={13} />
            <span>Architectural Site Zoning Plan &amp; Visual Reference</span>
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-300">
          Target Parcel: {blueprint.recommendedAcreage}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Ready Image (5 cols) */}
        <div className="lg:col-span-5 relative rounded-[var(--radius-card)] overflow-hidden border border-emerald-800/60 h-56 sm:h-64 bg-stone-950">
          <img
            src={activeVisual.src}
            alt={blueprint.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
            <span className="text-caption text-amber-300 font-semibold">
              {blueprint.type} Atmosphere
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug">
              {activeVisual.label}
            </p>
          </div>
        </div>

        {/* Right: Top-Down Vector Site Zoning Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-[var(--ground)] rounded-[var(--radius-card)] p-3 sm:p-4 border border-emerald-900/80 shadow-inner">
          <svg
            viewBox="0 0 580 280"
            className="w-full h-auto select-none"
            role="img"
            aria-label={`Site zoning blueprint diagram for ${blueprint.title}`}
          >
            <rect x="0" y="0" width="580" height="280" rx="12" fill={OUTPOST_SCHEMATIC_THEME.darkGreenForest} />

            {/* Topographical Contour Lines */}
            <path d="M0 45 Q190 30 390 48 T580 40" stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />
            <path d="M0 115 Q200 100 400 118 T580 110" stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />
            <path d="M0 185 Q210 172 410 188 T580 182" stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />

            {/* Compass Rose (Top Right) */}
            <g transform="translate(546, 34)">
              <circle cx="0" cy="0" r="16" fill={OUTPOST_SCHEMATIC_THEME.darkGreenBase} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="1" />
              <polygon points="0,-12 3,-2 0,-5 -3,-2" fill={OUTPOST_SCHEMATIC_THEME.goldBright} />
              <polygon points="0,12 3,2 0,5 -3,2" fill={OUTPOST_SCHEMATIC_THEME.emeraldText2} opacity="0.6" />
              <text x="0" y="-13" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="6.5" fontWeight="bold">N</text>
              <text x="14" y="2.5" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldText2} fontSize="6">E</text>
            </g>

            {/* ZONE 1 (Upper Ridge +30m): Windbreak Forest & Gravity Spring Header Tank */}
            <rect x="16" y="12" width="504" height="54" rx="8" fill={OUTPOST_SCHEMATIC_THEME.deepForest} fillOpacity="0.65" stroke={OUTPOST_SCHEMATIC_THEME.emeraldBright} strokeDasharray="5 3" />
            {/* Windbreak Pine/Bamboo Trees */}
            {[38, 62, 86, 110, 134, 420, 444, 468, 492].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="38" r="9" fill={OUTPOST_SCHEMATIC_THEME.forestMid} stroke={OUTPOST_SCHEMATIC_THEME.emeraldStroke} strokeWidth="1.2" />
                <circle cx={cx} cy="38" r="2.5" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} />
              </g>
            ))}
            {/* 10,000L Header Tank Icon */}
            <circle cx="268" cy="38" r="14" fill={OUTPOST_SCHEMATIC_THEME.deepBlueDark} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="1.8" />
            <circle cx="268" cy="38" r="7" fill={OUTPOST_SCHEMATIC_THEME.deepWater} stroke={OUTPOST_SCHEMATIC_THEME.waterSkyLight} strokeWidth="1" />
            {/* Gravity Main Water Pipe Flowing Down to Zones 2 & 3 */}
            <path d="M268 52 L268 82 M268 74 L145 74 L145 86 M268 74 L410 74 L410 86" stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <text x="268" y="21" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="9.5" fontWeight="bold">
              ZONE 1 (+30m RIDGE): 10,000L GRAVITY TANK &amp; MWERA WINDBREAK
            </text>
            <text x="268" y="61" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} fontSize="8">
              Perennial Spring Intake • 25 PSI Gravity Head Pressure
            </text>

            {/* ZONE 2 (Middle-Left): Sanctuary Core Buildings & Solar Array */}
            <rect x="16" y="80" width="266" height="96" rx="10" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="1.8" />
            {/* Architectural Building Footprint + Solar Array Roof */}
            <rect x="30" y="96" width="76" height="44" rx="4" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.goldBright} strokeWidth="1.2" />
            <line x1="30" y1="118" x2="106" y2="118" stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="1" />
            {/* Solar PV Grid on Roof */}
            <rect x="36" y="100" width="28" height="14" fill={OUTPOST_SCHEMATIC_THEME.deepWater} stroke={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} strokeWidth="0.8" />
            <rect x="70" y="100" width="28" height="14" fill={OUTPOST_SCHEMATIC_THEME.deepWater} stroke={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} strokeWidth="0.8" />
            <text x="186" y="104" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberPale} fontSize="10" fontWeight="bold">
              ZONE 2: {blueprint.type.toUpperCase()}
            </text>
            <text x="186" y="120" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="9" fontFamily="sans-serif">
              CSEB Earth-Block Cottages
            </text>
            <text x="186" y="135" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterPaleText} fontSize="8.5">
              48V LiFePO4 Solar + Roof Cisterns
            </text>
            <text x="150" y="164" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="8">
              East Morning Sun Verandas • Cross-Ventilation
            </text>

            {/* ZONE 3 (Middle-Right): Hydrotherapy / Vocational Workshop & Apothecary */}
            <rect x="298" y="80" width="266" height="96" rx="10" fill={OUTPOST_SCHEMATIC_THEME.slateDark} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="1.8" />
            {/* Treatment & Workshop Wing Footprint */}
            <rect x="312" y="96" width="68" height="44" rx="4" fill={OUTPOST_SCHEMATIC_THEME.cardBg} stroke={OUTPOST_SCHEMATIC_THEME.waterSky} strokeWidth="1.2" />
            <circle cx="332" cy="118" r="8" fill={OUTPOST_SCHEMATIC_THEME.blueMid} stroke={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} strokeWidth="1" />
            <circle cx="358" cy="118" r="8" fill={OUTPOST_SCHEMATIC_THEME.deepForest} stroke={OUTPOST_SCHEMATIC_THEME.emeraldStroke} strokeWidth="1" />
            <text x="468" y="104" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyMuted} fontSize="10" fontWeight="bold">
              ZONE 3: MINISTRY WING
            </text>
            <text x="468" y="120" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="9" fontFamily="sans-serif">
              Hydrotherapy &amp; Trade Shop
            </text>
            <text x="468" y="135" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldMint} fontSize="8.5">
              Charcoal &amp; Moringa Dispensary
            </text>
            <text x="430" y="164" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.waterSkyLight} fontSize="8">
              Greywater Reedbed Filter → Feeds Orchard
            </text>

            {/* ZONE 4 (Lower Contour Slopes & Dimba): 3x3x3ft Orchards & 75cm Ridges */}
            <rect x="16" y="190" width="548" height="76" rx="10" fill={OUTPOST_SCHEMATIC_THEME.earthDeep} stroke={OUTPOST_SCHEMATIC_THEME.amberWarm} strokeWidth="1.8" />
            {/* 3x3x3ft Orchard Tree Symbols on Left */}
            {[42, 74, 106, 138].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="224" r="10" fill={OUTPOST_SCHEMATIC_THEME.deepForest} stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx={cx} cy="224" r="3" fill={OUTPOST_SCHEMATIC_THEME.goldBright} />
              </g>
            ))}
            {/* 75cm Contour Ridges on Right */}
            <line x1="430" y1="208" x2="544" y2="208" stroke={OUTPOST_SCHEMATIC_THEME.emeraldStroke} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="430" y1="222" x2="544" y2="222" stroke={OUTPOST_SCHEMATIC_THEME.goldWarm} strokeWidth="2" strokeDasharray="4 2" />
            <line x1="430" y1="236" x2="544" y2="236" stroke={OUTPOST_SCHEMATIC_THEME.emeraldStroke} strokeWidth="2.5" strokeLinecap="round" />
            <text x="290" y="212" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.amberLight} fontSize="10" fontWeight="bold">
              ZONE 4: 3×3×3ft ORCHARD PITS &amp; 75cm CONTOUR RIDGES
            </text>
            <text x="290" y="230" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.slateLight} fontSize="9" fontFamily="sans-serif">
              Vetiver Contour Strips (Chisale) • Maize + Pigeon Pea + Pumpkin Guild
            </text>
            <text x="290" y="248" textAnchor="middle" fill={OUTPOST_SCHEMATIC_THEME.emeraldText2} fontSize="8.5">
              Valley Bottom Sub-Irrigated Winter Dimba Beds
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
