import React from 'react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { Compass, Clock, Layers } from 'lucide-react';
import { OutpostBlueprint } from '@/data/outpostFourPillarsData';

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
    <div className="rounded-2xl bg-[#07160E] border border-emerald-900/70 p-4 sm:p-6 text-white flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-caption font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
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
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-800/60 h-56 sm:h-64 bg-stone-950">
          <img
            src={activeVisual.src}
            alt={blueprint.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
            <span className="text-caption font-mono uppercase tracking-widest text-amber-300 font-bold">
              {blueprint.type} Atmosphere
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug">
              {activeVisual.label}
            </p>
          </div>
        </div>

        {/* Right: Top-Down Vector Site Zoning Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-[#040E09] rounded-2xl p-3 sm:p-4 border border-emerald-900/80 shadow-inner">
          <svg
            viewBox="0 0 580 280"
            className="w-full h-auto select-none"
            role="img"
            aria-label={`Site zoning blueprint diagram for ${blueprint.title}`}
          >
            <rect x="0" y="0" width="580" height="280" rx="12" fill="#06150D" />

            {/* Topographical Contour Lines */}
            <path d="M0 45 Q190 30 390 48 T580 40" stroke="#10B981" strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />
            <path d="M0 115 Q200 100 400 118 T580 110" stroke="#10B981" strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />
            <path d="M0 185 Q210 172 410 188 T580 182" stroke="#10B981" strokeWidth="0.7" strokeDasharray="4 4" fill="none" opacity="0.35" />

            {/* Compass Rose (Top Right) */}
            <g transform="translate(546, 34)">
              <circle cx="0" cy="0" r="16" fill="#04110B" stroke="#F59E0B" strokeWidth="1" />
              <polygon points="0,-12 3,-2 0,-5 -3,-2" fill="#FBBF24" />
              <polygon points="0,12 3,2 0,5 -3,2" fill="#6EE7B7" opacity="0.6" />
              <text x="0" y="-13" textAnchor="middle" fill="#FDE68A" fontSize="6.5" fontFamily="monospace" fontWeight="bold">N</text>
              <text x="14" y="2.5" textAnchor="middle" fill="#6EE7B7" fontSize="6" fontFamily="monospace">E</text>
            </g>

            {/* ZONE 1 (Upper Ridge +30m): Windbreak Forest & Gravity Spring Header Tank */}
            <rect x="16" y="12" width="504" height="54" rx="8" fill="#064E3B" fillOpacity="0.65" stroke="#10B981" strokeDasharray="5 3" />
            {/* Windbreak Pine/Bamboo Trees */}
            {[38, 62, 86, 110, 134, 420, 444, 468, 492].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="38" r="9" fill="#047857" stroke="#34D399" strokeWidth="1.2" />
                <circle cx={cx} cy="38" r="2.5" fill="#A7F3D0" />
              </g>
            ))}
            {/* 10,000L Header Tank Icon */}
            <circle cx="268" cy="38" r="14" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="268" cy="38" r="7" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
            {/* Gravity Main Water Pipe Flowing Down to Zones 2 & 3 */}
            <path d="M268 52 L268 82 M268 74 L145 74 L145 86 M268 74 L410 74 L410 86" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <text x="268" y="21" textAnchor="middle" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
              ZONE 1 (+30m RIDGE): 10,000L GRAVITY TANK &amp; MWERA WINDBREAK
            </text>
            <text x="268" y="61" textAnchor="middle" fill="#7DD3FC" fontSize="8" fontFamily="monospace">
              Perennial Spring Intake • 25 PSI Gravity Head Pressure
            </text>

            {/* ZONE 2 (Middle-Left): Sanctuary Core Buildings & Solar Array */}
            <rect x="16" y="80" width="266" height="96" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.8" />
            {/* Architectural Building Footprint + Solar Array Roof */}
            <rect x="30" y="96" width="76" height="44" rx="4" fill="#1E293B" stroke="#FBBF24" strokeWidth="1.2" />
            <line x1="30" y1="118" x2="106" y2="118" stroke="#F59E0B" strokeWidth="1" />
            {/* Solar PV Grid on Roof */}
            <rect x="36" y="100" width="28" height="14" fill="#0284C7" stroke="#7DD3FC" strokeWidth="0.8" />
            <rect x="70" y="100" width="28" height="14" fill="#0284C7" stroke="#7DD3FC" strokeWidth="0.8" />
            <text x="186" y="104" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ZONE 2: {blueprint.type.toUpperCase()}
            </text>
            <text x="186" y="120" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="sans-serif">
              CSEB Earth-Block Cottages
            </text>
            <text x="186" y="135" textAnchor="middle" fill="#93C5FD" fontSize="8.5" fontFamily="monospace">
              48V LiFePO4 Solar + Roof Cisterns
            </text>
            <text x="150" y="164" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="monospace">
              East Morning Sun Verandas • Cross-Ventilation
            </text>

            {/* ZONE 3 (Middle-Right): Hydrotherapy / Vocational Workshop & Apothecary */}
            <rect x="298" y="80" width="266" height="96" rx="10" fill="#18181B" stroke="#38BDF8" strokeWidth="1.8" />
            {/* Treatment & Workshop Wing Footprint */}
            <rect x="312" y="96" width="68" height="44" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
            <circle cx="332" cy="118" r="8" fill="#0369A1" stroke="#7DD3FC" strokeWidth="1" />
            <circle cx="358" cy="118" r="8" fill="#065F46" stroke="#34D399" strokeWidth="1" />
            <text x="468" y="104" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ZONE 3: MINISTRY WING
            </text>
            <text x="468" y="120" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="sans-serif">
              Hydrotherapy &amp; Trade Shop
            </text>
            <text x="468" y="135" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">
              Charcoal &amp; Moringa Dispensary
            </text>
            <text x="430" y="164" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontFamily="monospace">
              Greywater Reedbed Filter → Feeds Orchard
            </text>

            {/* ZONE 4 (Lower Contour Slopes & Dimba): 3x3x3ft Orchards & 75cm Ridges */}
            <rect x="16" y="190" width="548" height="76" rx="10" fill="#2E1A12" stroke="#D97706" strokeWidth="1.8" />
            {/* 3x3x3ft Orchard Tree Symbols on Left */}
            {[42, 74, 106, 138].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="224" r="10" fill="#065F46" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx={cx} cy="224" r="3" fill="#FBBF24" />
              </g>
            ))}
            {/* 75cm Contour Ridges on Right */}
            <line x1="430" y1="208" x2="544" y2="208" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="430" y1="222" x2="544" y2="222" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="430" y1="236" x2="544" y2="236" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
            <text x="290" y="212" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ZONE 4: 3×3×3ft ORCHARD PITS &amp; 75cm CONTOUR RIDGES
            </text>
            <text x="290" y="230" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="sans-serif">
              Vetiver Contour Strips (Chisale) • Maize + Pigeon Pea + Pumpkin Guild
            </text>
            <text x="290" y="248" textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontFamily="monospace">
              Valley Bottom Sub-Irrigated Winter Dimba Beds
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
