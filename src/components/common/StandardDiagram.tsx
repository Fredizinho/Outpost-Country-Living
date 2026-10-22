import React, { useState } from 'react';
import { 
  PLANTING_PIT_MEASUREMENTS,
  RIDGE_SPACING_MEASUREMENTS,
  SWALE_MEASUREMENTS,
  ROOF_TANK_MEASUREMENTS,
  ZEER_POT_MEASUREMENTS
} from '@/data/measurements';
import { cn } from '@/lib/utils';
import { Info, CheckCircle2, ShieldCheck, Ruler } from 'lucide-react';

export type StandardDiagramType = 
  | 'planting-pit'
  | 'ridge-spacing'
  | 'swale'
  | 'roof-tank'
  | 'zeer-pot';

export interface StandardDiagramProps {
  type: StandardDiagramType;
  titleOverride?: string;
  isReviewed?: boolean;
  reviewerName?: string;
  className?: string;
}

/**
 * Reusable SVG Symbol Definitions for all 5 Technical Homestead Field Diagrams.
 * Drawn on a 720x380 viewBox with labels at 16 units or larger, outside artwork with leader lines,
 * token classes (.dg-* / var(--dg-*)) for seamless Light and Dark modes.
 */
export function DiagramSymbolsDefs() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ display: 'none' }}>
      <defs>
        {/* ====================================================================
            1. PLANTING PIT SYMBOL (90x90x90cm / 3x3x3ft EGW Orchard Pit)
        ==================================================================== */}
        <symbol id="sym-planting-pit" viewBox="0 0 720 380">
          {/* Ground surface and sky */}
          <rect x="0" y="0" width="720" height="120" className="dg-sky" />
          <rect x="0" y="120" width="720" height="260" className="dg-ground" />
          <line x1="0" y1="120" x2="720" y2="120" stroke="var(--dg-soil-dark)" strokeWidth="3" />

          {/* Pit excavation boundary (x=240 to 480, y=120 to 340) */}
          <rect 
            x="240" 
            y="120" 
            width="240" 
            height="220" 
            className="dg-soil-dark" 
            stroke="var(--dg-highlight)" 
            strokeWidth="2.5" 
            strokeDasharray="6 4" 
          />

          {/* Layer 5: Bottom 20cm [8 in] Drainage Rocks & Charcoal */}
          <rect x="242" y="290" width="236" height="48" className="dg-rock" opacity="0.9" />
          {[260, 295, 330, 365, 400, 435, 460].map((cx, i) => (
            <circle key={i} cx={cx} cy={314} r={14} fill="#4B5563" stroke="#9CA3AF" strokeWidth="1.5" />
          ))}

          {/* Layer 4: 45cm [18 in] Compost, Biochar & Wood Ash */}
          <rect x="242" y="195" width="236" height="95" className="dg-soil-mid" />
          {/* Compost organic texture dots */}
          {[260, 300, 340, 380, 420, 460].map((x, i) => (
            <circle key={i} cx={x} cy={230 + (i % 3) * 18} r={3} fill="var(--dg-highlight)" opacity="0.6" />
          ))}

          {/* Layer 3: 25cm [10 in] Fine Topsoil around young roots */}
          <rect x="242" y="120" width="236" height="75" className="dg-soil-light" />
          <path d="M 240 120 Q 360 98 480 120 Z" className="dg-soil-light" />

          {/* Tree trunk, root crown, leaves */}
          <line x1="360" y1="140" x2="360" y2="40" className="dg-plant-stem" strokeWidth="10" strokeLinecap="round" />
          <path d="M 360 140 Q 330 170 300 190" stroke="var(--dg-soil-dark)" strokeWidth="3.5" fill="none" />
          <path d="M 360 140 Q 390 170 420 190" stroke="var(--dg-soil-dark)" strokeWidth="3.5" fill="none" />
          <path d="M 360 145 L 360 210" stroke="var(--dg-soil-dark)" strokeWidth="3.5" fill="none" />
          {/* Foliage canopy */}
          <circle cx="360" cy="38" r="26" className="dg-plant-leaf" />
          <circle cx="338" cy="48" r="18" fill="var(--dg-plant-leaf)" opacity="0.85" />
          <circle cx="382" cy="48" r="18" fill="var(--dg-plant-leaf)" opacity="0.85" />

          {/* Layer 1: Surface Mulch Donut Ring */}
          <rect x="235" y="102" width="75" height="18" rx="6" fill="#CA8A04" />
          <rect x="410" y="102" width="75" height="18" rx="6" fill="#CA8A04" />

          {/* Graft union callout dot */}
          <circle cx="360" cy="98" r="6" fill="var(--dg-highlight)" stroke="#FFFFFF" strokeWidth="2" />

          {/* ================================================================
              EXTERNAL LABELS & LEADER LINES (Font size 16+, outside artwork)
          ================================================================ */}
          {/* Left Side Label 1: Mulch ring (16px) */}
          <line x1="235" y1="110" x2="160" y2="110" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="110" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="110" r="13" className="dg-num-bg" />
          <text x="28" y="115" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">1</text>
          <text x="48" y="115" className="dg-label-text" fontSize="16" fontWeight="bold">
            Mulch Ring: 15 cm [6 in]
          </text>

          {/* Left Side Label 2: Graft Collar (16px) */}
          <line x1="354" y1="98" x2="200" y2="60" className="dg-leader" strokeWidth="1.75" />
          <line x1="200" y1="60" x2="160" y2="60" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="60" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="60" r="13" className="dg-num-bg" />
          <text x="28" y="65" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">2</text>
          <text x="48" y="65" className="dg-label-text" fontSize="16" fontWeight="bold">
            Graft Collar: +5 cm [2 in]
          </text>

          {/* Left Side Label 3: Fine Topsoil Layer (16px) */}
          <line x1="242" y1="155" x2="160" y2="175" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="175" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="175" r="13" className="dg-num-bg" />
          <text x="28" y="180" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">3</text>
          <text x="48" y="180" className="dg-label-text" fontSize="16" fontWeight="bold">
            Fine Topsoil: 25 cm [10 in]
          </text>

          {/* Right Side Label 4: Compost & Biochar (16px) */}
          <line x1="478" y1="240" x2="550" y2="240" className="dg-leader" strokeWidth="1.75" />
          <circle cx="550" cy="240" r="3" fill="var(--dg-leader)" />
          <circle cx="572" cy="240" r="13" className="dg-num-bg" />
          <text x="572" y="245" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">4</text>
          <text x="592" y="245" className="dg-label-text" fontSize="16" fontWeight="bold">
            Compost Mix: 45 cm [18 in]
          </text>

          {/* Right Side Label 5: Rock Drainage Base (16px) */}
          <line x1="478" y1="314" x2="550" y2="314" className="dg-leader" strokeWidth="1.75" />
          <circle cx="550" cy="314" r="3" fill="var(--dg-leader)" />
          <circle cx="572" cy="314" r="13" className="dg-num-bg" />
          <text x="572" y="319" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">5</text>
          <text x="592" y="319" className="dg-label-text" fontSize="16" fontWeight="bold">
            Rock Base: 20 cm [8 in]
          </text>

          {/* Bottom Dimension Indicator: 90 cm [3 ft] Wide (16px) */}
          <line x1="240" y1="355" x2="480" y2="355" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="240" y1="348" x2="240" y2="362" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="480" y1="348" x2="480" y2="362" stroke="var(--dg-highlight)" strokeWidth="2" />
          <text x="360" y="374" textAnchor="middle" className="dg-label-text" fontSize="16" fontWeight="bold">
            Total Width: 90 cm [3 ft] · Total Depth: 90 cm [3 ft]
          </text>
        </symbol>

        {/* ====================================================================
            2. RIDGE SPACING SYMBOL (Mitumbira & Sasakawa Precision Contour Ridges)
        ==================================================================== */}
        <symbol id="sym-ridge-spacing" viewBox="0 0 720 380">
          {/* Sky and Subsoil base */}
          <rect x="0" y="0" width="720" height="150" className="dg-sky" />
          <rect x="0" y="240" width="720" height="140" className="dg-soil-dark" />

          {/* Ridge 1 (Center-Left: x=210) & Ridge 2 (Center-Right: x=470) */}
          {/* Continuous contour profile with 2 ridges and middle furrow */}
          <path 
            d="M 60 240 Q 120 240 150 200 Q 210 130 270 200 Q 340 240 400 240 Q 430 240 460 200 Q 520 130 580 200 Q 610 240 660 240" 
            className="dg-ground" 
            stroke="var(--dg-soil-dark)" 
            strokeWidth="3" 
          />
          {/* Moist soil core inside ridge */}
          <ellipse cx="210" cy="180" rx="42" ry="24" className="dg-soil-mid" opacity="0.8" />
          <ellipse cx="520" cy="180" rx="42" ry="24" className="dg-soil-mid" opacity="0.8" />

          {/* Seed/Crop plant on Ridge 1 crest */}
          <line x1="210" y1="130" x2="210" y2="70" className="dg-plant-stem" strokeWidth="5" strokeLinecap="round" />
          <path d="M 210 90 Q 185 80 170 95" stroke="var(--dg-plant-leaf)" strokeWidth="3" fill="none" />
          <path d="M 210 80 Q 235 70 250 85" stroke="var(--dg-plant-leaf)" strokeWidth="3" fill="none" />
          <circle cx="210" cy="65" r="10" className="dg-plant-leaf" />

          {/* Seed/Crop plant on Ridge 2 crest */}
          <line x1="520" y1="130" x2="520" y2="70" className="dg-plant-stem" strokeWidth="5" strokeLinecap="round" />
          <path d="M 520 90 Q 495 80 480 95" stroke="var(--dg-plant-leaf)" strokeWidth="3" fill="none" />
          <path d="M 520 80 Q 545 70 560 85" stroke="var(--dg-plant-leaf)" strokeWidth="3" fill="none" />
          <circle cx="520" cy="65" r="10" className="dg-plant-leaf" />

          {/* Water pooling in middle furrow */}
          <path d="M 320 240 Q 365 248 410 240 Z" className="dg-water" stroke="var(--dg-water-stroke)" strokeWidth="1.5" />

          {/* Tied ridge cross-tie barrier marker in furrow */}
          <rect x="355" y="215" width="20" height="25" rx="3" fill="var(--dg-highlight)" opacity="0.85" />

          {/* ================================================================
              EXTERNAL LABELS & LEADER LINES (Font size 16+, outside artwork)
          ================================================================ */}
          {/* Top Label 1: Crest-to-Crest Spacing (75 cm [30 in]) */}
          <line x1="210" y1="45" x2="520" y2="45" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="210" y1="38" x2="210" y2="52" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="520" y1="38" x2="520" y2="52" stroke="var(--dg-highlight)" strokeWidth="2" />
          <circle cx="260" cy="22" r="13" className="dg-num-bg" />
          <text x="260" y="27" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">1</text>
          <text x="280" y="27" className="dg-label-text" fontSize="16" fontWeight="bold">
            Crest-to-Crest Spacing: 75 cm [30 in]
          </text>

          {/* Left Label 2: Ridge Height (30 cm [12 in]) */}
          <line x1="165" y1="130" x2="165" y2="240" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="158" y1="130" x2="172" y2="130" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="158" y1="240" x2="172" y2="240" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="165" y1="185" x2="120" y2="185" className="dg-leader" strokeWidth="1.75" />
          <circle cx="120" cy="185" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="185" r="13" className="dg-num-bg" />
          <text x="28" y="190" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">2</text>
          <text x="48" y="190" className="dg-label-text" fontSize="16" fontWeight="bold">
            Ridge Height: 30 cm [12 in]
          </text>

          {/* Left Label 4: Plant Station Spacing (25 cm [10 in]) */}
          <line x1="210" y1="100" x2="120" y2="120" className="dg-leader" strokeWidth="1.75" />
          <circle cx="120" cy="120" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="120" r="13" className="dg-num-bg" />
          <text x="28" y="125" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">4</text>
          <text x="48" y="125" className="dg-label-text" fontSize="16" fontWeight="bold">
            Plant Spacing: 25 cm [10 in]
          </text>

          {/* Right Label 3: Furrow Water Base (45 cm [18 in]) */}
          <line x1="365" y1="240" x2="520" y2="280" className="dg-leader" strokeWidth="1.75" />
          <circle cx="520" cy="280" r="3" fill="var(--dg-leader)" />
          <circle cx="542" cy="280" r="13" className="dg-num-bg" />
          <text x="542" y="285" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">3</text>
          <text x="562" y="285" className="dg-label-text" fontSize="16" fontWeight="bold">
            Furrow Channel: 45 cm [18 in]
          </text>

          {/* Right Label 5: Tied Ridge Check Dam (2 m to 3 m [6.5 to 10 ft]) */}
          <line x1="375" y1="225" x2="520" y2="225" className="dg-leader" strokeWidth="1.75" />
          <circle cx="520" cy="225" r="3" fill="var(--dg-leader)" />
          <circle cx="542" cy="225" r="13" className="dg-num-bg" />
          <text x="542" y="230" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">5</text>
          <text x="562" y="230" className="dg-label-text" fontSize="16" fontWeight="bold">
            Tied Ridges: 2–3 m [6.5–10 ft]
          </text>

          {/* Bottom helper text */}
          <text x="360" y="365" textAnchor="middle" className="dg-label-text" fontSize="16" fontWeight="bold">
            Contour Ridges (Mitumbira) slow runoff &amp; soak winter rains into root zone
          </text>
        </symbol>

        {/* ====================================================================
            3. SWALE SYMBOL (Contour Infiltration Trench & Downslope Bund)
        ==================================================================== */}
        <symbol id="sym-swale" viewBox="0 0 720 380">
          {/* Sloping hillside ground */}
          <rect x="0" y="0" width="720" height="110" className="dg-sky" />
          <rect x="0" y="260" width="720" height="120" className="dg-soil-dark" />

          {/* Slope line from upper-left (x=0, y=140) to lower-right (x=720, y=260) */}
          <path d="M 0 140 L 190 170" stroke="var(--dg-soil-dark)" strokeWidth="3" />

          {/* Swale Trench excavation: width 100cm, depth 50cm, flat base 60cm */}
          {/* x=190 (top-left) to x=280 (bottom-left), flat to x=340, up to x=390 (top-right) */}
          <polygon points="190,170 390,170 340,260 240,260" className="dg-soil-dark" />
          {/* Pooled rainwater in swale */}
          <polygon points="205,200 375,200 340,260 240,260" className="dg-water" stroke="var(--dg-water-stroke)" strokeWidth="2" />

          {/* Downslope Earth Bund (Berm): x=390 to 580, height 40cm (crest at y=110) */}
          <path d="M 390 170 Q 480 95 570 210 L 720 240" className="dg-ground" stroke="var(--dg-soil-dark)" strokeWidth="3" />

          {/* Vetiver Grass hedge anchored on bund crest */}
          <g transform="translate(470, 50)">
            <path d="M 10 55 L 2 10 M 10 55 L 10 5 M 10 55 L 18 10 M 10 55 L 26 15" stroke="var(--dg-plant-leaf)" strokeWidth="3.5" strokeLinecap="round" />
            {/* Deep vertical roots penetrating down through bund into subsoil */}
            <path d="M 10 55 L 8 130 M 10 55 L 12 140 M 10 55 L 15 120" stroke="#78350F" strokeWidth="2.5" strokeDasharray="3 3" />
          </g>

          {/* ================================================================
              EXTERNAL LABELS & LEADER LINES (Font size 16+, outside artwork)
          ================================================================ */}
          {/* Top Label 1: Swale Top Width: 100 cm [3.3 ft] */}
          <line x1="190" y1="150" x2="390" y2="150" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="190" y1="142" x2="190" y2="158" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="390" y1="142" x2="390" y2="158" stroke="var(--dg-highlight)" strokeWidth="2" />
          <line x1="290" y1="150" x2="200" y2="60" className="dg-leader" strokeWidth="1.75" />
          <circle cx="200" cy="60" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="60" r="13" className="dg-num-bg" />
          <text x="28" y="65" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">1</text>
          <text x="48" y="65" className="dg-label-text" fontSize="16" fontWeight="bold">
            Swale Width: 100 cm [3.3 ft]
          </text>

          {/* Left Label 2: Level Flat Base: 60 cm [24 in] */}
          <line x1="240" y1="260" x2="160" y2="300" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="300" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="300" r="13" className="dg-num-bg" />
          <text x="28" y="305" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">2</text>
          <text x="48" y="305" className="dg-label-text" fontSize="16" fontWeight="bold">
            Level Base: 60 cm [24 in]
          </text>

          {/* Left Label 3: Trench Depth: 50 cm [20 in] */}
          <line x1="180" y1="170" x2="180" y2="260" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="173" y1="170" x2="187" y2="170" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="173" y1="260" x2="187" y2="260" stroke="var(--dg-highlight)" strokeWidth="1.75" />
          <line x1="180" y1="215" x2="140" y2="215" className="dg-leader" strokeWidth="1.75" />
          <circle cx="140" cy="215" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="215" r="13" className="dg-num-bg" />
          <text x="28" y="220" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">3</text>
          <text x="48" y="220" className="dg-label-text" fontSize="16" fontWeight="bold">
            Trench Depth: 50 cm [20 in]
          </text>

          {/* Right Label 4: Downhill Bund: 40 cm [16 in] High */}
          <line x1="480" y1="110" x2="540" y2="110" className="dg-leader" strokeWidth="1.75" />
          <circle cx="540" cy="110" r="3" fill="var(--dg-leader)" />
          <circle cx="562" cy="110" r="13" className="dg-num-bg" />
          <text x="562" y="115" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">4</text>
          <text x="582" y="115" className="dg-label-text" fontSize="16" fontWeight="bold">
            Downhill Bund: 40 cm [16 in]
          </text>

          {/* Right Label 5: Vetiver Hedge: 10–15 cm [4–6 in] Spacing */}
          <line x1="490" y1="65" x2="540" y2="65" className="dg-leader" strokeWidth="1.75" />
          <circle cx="540" cy="65" r="3" fill="var(--dg-leader)" />
          <circle cx="562" cy="65" r="13" className="dg-num-bg" />
          <text x="562" y="70" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">5</text>
          <text x="582" y="70" className="dg-label-text" fontSize="16" fontWeight="bold">
            Vetiver Hedge: 10–15 cm [4–6 in]
          </text>

          {/* Bottom text */}
          <text x="360" y="365" textAnchor="middle" className="dg-label-text" fontSize="16" fontWeight="bold">
            Swales halt hill erosion · Deep vetiver roots lock water into the water table
          </text>
        </symbol>

        {/* ====================================================================
            4. ROOF CATCHMENT & TANK SYMBOL (Matches Guide reader visual mockup)
        ==================================================================== */}
        <symbol id="sym-roof-tank" viewBox="0 0 720 380">
          {/* Sky background */}
          <rect x="0" y="0" width="720" height="300" className="dg-sky" />
          {/* Ground line */}
          <rect x="0" y="300" width="720" height="80" className="dg-ground" />
          <line x1="0" y1="300" x2="720" y2="300" stroke="var(--dg-soil-dark)" strokeWidth="2.5" />

          {/* House structure: Roof & Wall */}
          {/* Building wall */}
          <rect x="220" y="195" width="105" height="105" className="dg-card-bg" stroke="#A8A29E" strokeWidth="1.5" />
          {/* Corrugated Iron Roof */}
          <polygon points="210,195 272,145 335,195" fill="#C26330" stroke="#9C441A" strokeWidth="2.5" />
          {/* Roof overhang eave */}
          <line x1="205" y1="197" x2="340" y2="197" stroke="#44403C" strokeWidth="4" />

          {/* Gutter along right roof edge (x=335, y=195) */}
          <rect x="333" y="193" width="10" height="12" rx="2" fill="#78716C" />

          {/* Downpipe from gutter down to first flush */}
          <path d="M 338 205 L 338 245 L 385 245 L 385 255" fill="none" stroke="#57534E" strokeWidth="4.5" strokeLinejoin="round" />

          {/* First Flush Diverter Column */}
          <rect x="375" y="255" width="20" height="42" rx="3" fill="#E5E5E5" stroke="#737373" strokeWidth="2" />
          {/* Floating ball inside first flush */}
          <circle cx="385" cy="272" r="6" fill="#F59E0B" />
          {/* Drain screw cap */}
          <line x1="375" y1="297" x2="395" y2="297" stroke="#DC2626" strokeWidth="3" />

          {/* Pipe horizontal bridge to tank intake */}
          <path d="M 395 260 L 435 260 L 435 180 L 445 180" fill="none" stroke="#57534E" strokeWidth="4" strokeLinejoin="round" />

          {/* Concrete Base Pad for Tank */}
          <rect x="430" y="285" width="115" height="15" rx="2" className="dg-rock" stroke="#475569" strokeWidth="1.5" />

          {/* Covered Rainwater Tank (Rounded food-grade plastic or ferro-cement) */}
          <rect x="435" y="165" width="105" height="120" rx="14" className="dg-card-bg" stroke="#3F7585" strokeWidth="3" />
          {/* Stored water inside tank */}
          <rect x="437" y="215" width="101" height="68" rx="6" className="dg-water" />
          {/* Tank lid / inspection cover */}
          <rect x="460" y="160" width="55" height="8" rx="3" fill="#3F7585" />
          {/* Mosquito mesh intake */}
          <line x1="440" y1="180" x2="455" y2="180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />

          {/* ================================================================
              EXTERNAL LABELS & LEADER LINES (Font size 16+, outside artwork)
          ================================================================ */}
          {/* Left Label 1: Roof Catchment: 60 cm [24 in] overhang */}
          <line x1="272" y1="145" x2="160" y2="105" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="105" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="105" r="13" className="dg-num-bg" />
          <text x="28" y="110" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">1</text>
          <text x="48" y="110" className="dg-label-text" fontSize="16" fontWeight="bold">
            Roof Catchment: 60 cm [24 in] overhang
          </text>

          {/* Left Label 2: Gutter fall: 1 cm per 1 m [1/8 in/ft] */}
          <line x1="335" y1="195" x2="160" y2="185" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="185" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="185" r="13" className="dg-num-bg" />
          <text x="28" y="190" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">2</text>
          <text x="48" y="190" className="dg-label-text" fontSize="16" fontWeight="bold">
            Sloped Gutter: 1 cm/m [1/8 in/ft] fall
          </text>

          {/* Left Label 3: First Flush Diverter: 25–50 L [6.6–13.2 gal] */}
          <line x1="375" y1="275" x2="160" y2="255" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="255" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="255" r="13" className="dg-num-bg" />
          <text x="28" y="260" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">3</text>
          <text x="48" y="260" className="dg-label-text" fontSize="16" fontWeight="bold">
            First Flush: 25–50 L [6.6–13.2 gal]
          </text>

          {/* Right Label 4: Covered Tank: 5,000–10,000 L [1,320–2,640 gal] */}
          <line x1="540" y1="195" x2="560" y2="195" className="dg-leader" strokeWidth="1.75" />
          <circle cx="560" cy="195" r="3" fill="var(--dg-leader)" />
          <circle cx="582" cy="195" r="13" className="dg-num-bg" />
          <text x="582" y="200" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">4</text>
          <text x="602" y="200" className="dg-label-text" fontSize="16" fontWeight="bold">
            Covered Tank: 5,000–10,000 L
          </text>

          {/* Right Label 5: Concrete Pad: 15 cm [6 in] slab */}
          <line x1="545" y1="292" x2="560" y2="292" className="dg-leader" strokeWidth="1.75" />
          <circle cx="560" cy="292" r="3" fill="var(--dg-leader)" />
          <circle cx="582" cy="292" r="13" className="dg-num-bg" />
          <text x="582" y="297" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">5</text>
          <text x="602" y="297" className="dg-label-text" fontSize="16" fontWeight="bold">
            Base Pad: 15 cm [6 in]
          </text>

          {/* Bottom text */}
          <text x="360" y="365" textAnchor="middle" className="dg-label-text" fontSize="16" fontWeight="bold">
            Clean rain storage: Divert dirty first flush · Keep tank sealed with mosquito mesh
          </text>
        </symbol>

        {/* ====================================================================
            5. ZEER POT SYMBOL (Pot-in-Pot Evaporative Refrigerator)
        ==================================================================== */}
        <symbol id="sym-zeer-pot" viewBox="0 0 720 380">
          {/* Shaded cool environment background */}
          <rect x="0" y="0" width="720" height="280" className="dg-sky" />
          <rect x="0" y="280" width="720" height="100" className="dg-ground" />
          <line x1="0" y1="280" x2="720" y2="280" stroke="var(--dg-soil-dark)" strokeWidth="2.5" />

          {/* Raised brick support feet for air circulation below pot */}
          <rect x="300" y="270" width="28" height="15" rx="2" fill="#B45309" stroke="#78350F" />
          <rect x="392" y="270" width="28" height="15" rx="2" fill="#B45309" stroke="#78350F" />

          {/* Outer Unglazed Earthenware Pot (x=270 to 450, diameter 50cm [20 in]) */}
          <path 
            d="M 270 120 Q 250 200 310 270 L 410 270 Q 470 200 450 120 Z" 
            fill="#B4531F" 
            stroke="#782A15" 
            strokeWidth="3.5" 
          />

          {/* Wet Sand Layer (5 to 7.5 cm [2 to 3 in] thick) */}
          <path 
            d="M 285 125 Q 268 198 320 260 L 400 260 Q 452 198 435 125 Z" 
            fill="#D97706" 
            opacity="0.8" 
          />
          {/* Moisture droplets in sand */}
          {[300, 330, 360, 390, 420].map((x, i) => (
            <circle key={i} cx={x} cy={165 + (i % 2) * 35} r={2.5} fill="#60A5FA" />
          ))}

          {/* Inner Food Chamber Pot (x=305 to 415, diameter 35cm [14 in]) */}
          <path 
            d="M 305 130 Q 295 195 330 250 L 390 250 Q 425 195 415 130 Z" 
            className="dg-card-bg" 
            stroke="#92400E" 
            strokeWidth="2.5" 
          />

          {/* Stored Fresh Vegetables/Fruit inside inner chamber */}
          <circle cx="345" cy="210" r="14" fill="#16A34A" />
          <circle cx="375" cy="215" r="12" fill="#EA580C" />
          <circle cx="360" cy="185" r="13" fill="#DC2626" />

          {/* Damp Burlap / Hessian Cloth Cover draped across top rim */}
          <path d="M 255 120 Q 360 110 465 120 L 460 130 Q 360 120 260 130 Z" fill="#78716C" stroke="#44403C" strokeWidth="2" />

          {/* Evaporative Cool Vapor Arrows radiating outward */}
          <g stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3">
            <line x1="250" y1="180" x2="220" y2="170" />
            <line x1="255" y1="220" x2="225" y2="225" />
            <line x1="465" y1="180" x2="495" y2="170" />
            <line x1="460" y1="220" x2="490" y2="225" />
          </g>

          {/* ================================================================
              EXTERNAL LABELS & LEADER LINES (Font size 16+, outside artwork)
          ================================================================ */}
          {/* Left Label 1: Outer Porous Pot: 50 cm [20 in] */}
          <line x1="260" y1="190" x2="160" y2="190" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="190" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="190" r="13" className="dg-num-bg" />
          <text x="28" y="195" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">1</text>
          <text x="48" y="195" className="dg-label-text" fontSize="16" fontWeight="bold">
            Outer Clay Pot: 50 cm [20 in]
          </text>

          {/* Left Label 2: Wet Sand Gap: 5–7.5 cm [2–3 in] */}
          <line x1="290" y1="230" x2="160" y2="255" className="dg-leader" strokeWidth="1.75" />
          <circle cx="160" cy="255" r="3" fill="var(--dg-leader)" />
          <circle cx="28" cy="255" r="13" className="dg-num-bg" />
          <text x="28" y="260" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">2</text>
          <text x="48" y="260" className="dg-label-text" fontSize="16" fontWeight="bold">
            Wet Sand Gap: 5–7.5 cm [2–3 in]
          </text>

          {/* Right Label 3: Inner Food Pot: 35 cm [14 in] */}
          <line x1="415" y1="160" x2="540" y2="160" className="dg-leader" strokeWidth="1.75" />
          <circle cx="540" cy="160" r="3" fill="var(--dg-leader)" />
          <circle cx="562" cy="160" r="13" className="dg-num-bg" />
          <text x="562" y="165" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">3</text>
          <text x="582" y="165" className="dg-label-text" fontSize="16" fontWeight="bold">
            Inner Pot: 35 cm [14 in]
          </text>

          {/* Right Label 4: Damp Burlap Cover: keeps shade */}
          <line x1="460" y1="120" x2="540" y2="95" className="dg-leader" strokeWidth="1.75" />
          <circle cx="540" cy="95" r="3" fill="var(--dg-leader)" />
          <circle cx="562" cy="95" r="13" className="dg-num-bg" />
          <text x="562" y="100" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">4</text>
          <text x="582" y="100" className="dg-label-text" fontSize="16" fontWeight="bold">
            Damp Burlap Lid: shade cooling
          </text>

          {/* Right Label 5: Temperature drop: 5°C to 10°C [9°F to 18°F] */}
          <line x1="495" y1="210" x2="540" y2="230" className="dg-leader" strokeWidth="1.75" />
          <circle cx="540" cy="230" r="3" fill="var(--dg-leader)" />
          <circle cx="562" cy="230" r="13" className="dg-num-bg" />
          <text x="562" y="235" textAnchor="middle" className="dg-num-text" fontSize="14" fontWeight="bold">5</text>
          <text x="582" y="235" className="dg-label-text" fontSize="16" fontWeight="bold">
            Cooling: 5–10°C [9–18°F] drop
          </text>

          {/* Bottom text */}
          <text x="360" y="365" textAnchor="middle" className="dg-label-text" fontSize="16" fontWeight="bold">
            Evaporation pulls heat away · Vegetables keep fresh 20 days [up from 2 days] without electricity
          </text>
        </symbol>
      </defs>
    </svg>
  );
}

/**
 * Metadata & Step list definitions for each diagram
 */
export const DIAGRAM_CONFIGS: Record<StandardDiagramType, {
  title: string;
  symbolId: string;
  desc: string;
  timeEstimate: string;
  category: string;
  steps: { num: number; title: string; instruction: string }[];
  safetyNote?: string;
}> = {
  'planting-pit': {
    title: 'Deep Tree Planting Pit Cross-Section',
    symbolId: 'sym-planting-pit',
    desc: 'Cross-sectional engineering schematic of a 90 cm [3 ft] deep fruit tree planting pit with bottom rock drainage, rich compost biochar layer, and mulch donut ring.',
    timeEstimate: '45 min per pit',
    category: 'Soil & Orchards',
    steps: [
      {
        num: 1,
        title: 'Excavate 1m³ Pit',
        instruction: `Dig a pit ${PLANTING_PIT_MEASUREMENTS.width.formatted} wide, ${PLANTING_PIT_MEASUREMENTS.length.formatted} long, and ${PLANTING_PIT_MEASUREMENTS.depth.formatted} deep. Keep dark topsoil separate from pale subsoil.`,
      },
      {
        num: 2,
        title: 'Rock Drainage Bed',
        instruction: `Place ${PLANTING_PIT_MEASUREMENTS.bottomDrainageLayer.formatted} of river stones and coarse charcoal at the bottom to stop waterlogging and break taproot rot.`,
      },
      {
        num: 3,
        title: 'Compost & Biochar Core',
        instruction: `Backfill ${PLANTING_PIT_MEASUREMENTS.middleCompostLayer.formatted} with equal parts topsoil and mature compost (${PLANTING_PIT_MEASUREMENTS.compostWeight.formatted}), charged with ${PLANTING_PIT_MEASUREMENTS.biocharWeight.formatted} crushed biochar and ${PLANTING_PIT_MEASUREMENTS.woodAshVolume.formatted} wood ash.`,
      },
      {
        num: 4,
        title: 'Root Placement & Fine Topsoil',
        instruction: `Center the young tree sapling. Pack ${PLANTING_PIT_MEASUREMENTS.topsoilLayer.formatted} of unamended fine topsoil around roots. Keep the graft collar ${PLANTING_PIT_MEASUREMENTS.graftCollarHeight.formatted} above soil level.`,
      },
      {
        num: 5,
        title: 'Mulch Donut Ring',
        instruction: `Spread a ${PLANTING_PIT_MEASUREMENTS.mulchRingDepth.formatted} thick ring of dry vetiver grass or straw around the drip line. Keep mulch 10 cm clear of the tree stem to prevent collar rot.`,
      },
    ],
    safetyNote: 'Wear sturdy boots and gloves when shoveling heavy rocks. Plant fruit trees during the cool morning before the hot sun dries exposed roots.',
  },

  'ridge-spacing': {
    title: 'Contour Ridge Spacing (Mitumbira) Cross-Section',
    symbolId: 'sym-ridge-spacing',
    desc: 'Contour crop ridge dimensions with 75 cm [30 in] spacing, 30 cm [12 in] ridge height, and 25 cm [10 in] plant spacing along the ridge.',
    timeEstimate: '2 hr per 100m',
    category: 'Crops & Soil Conservation',
    steps: [
      {
        num: 1,
        title: 'Survey Slope Contours',
        instruction: `Use an A-frame level to peg contour lines across the hillside at ${RIDGE_SPACING_MEASUREMENTS.markerRidgeInterval.formatted} intervals.`,
      },
      {
        num: 2,
        title: 'Build Raised Ridges',
        instruction: `Mound soil along the contour to a height of ${RIDGE_SPACING_MEASUREMENTS.ridgeHeight.formatted}, maintaining a crest-to-crest spacing of ${RIDGE_SPACING_MEASUREMENTS.ridgeSpacing.formatted}.`,
      },
      {
        num: 3,
        title: 'Shape Furrow Channels',
        instruction: `Keep furrow bottoms ${RIDGE_SPACING_MEASUREMENTS.furrowWidth.formatted} wide and level so rainfall soaks slowly into the subsoil rather than cutting gullies.`,
      },
      {
        num: 4,
        title: 'Single-Seed Planting',
        instruction: `Plant one seed every ${RIDGE_SPACING_MEASUREMENTS.plantSpacing.formatted} directly along the ridge crest into the moist soil core.`,
      },
      {
        num: 5,
        title: 'Shovel Tied Ridge Dams',
        instruction: `Throw small soil cross-ties every ${RIDGE_SPACING_MEASUREMENTS.tiedRidgeInterval.formatted} along furrows to create mini-reservoirs during heavy downpours.`,
      },
    ],
    safetyNote: 'Always shape ridges along true contour lines. Ridges sloped downhill create dangerous runoff channels that strip away topsoil.',
  },

  'swale': {
    title: 'Contour Water Swale and Infiltration Mound',
    symbolId: 'sym-swale',
    desc: 'Level hillside water-harvesting swale trench with 100 cm [3.3 ft] top width, 50 cm [20 in] depth, and downhill berm stabilized with vetiver grass.',
    timeEstimate: '1 day per 50m',
    category: 'Water Harvesting',
    steps: [
      {
        num: 1,
        title: 'Mark Dead-Level Line',
        instruction: `Use an A-frame level to calibrate a dead-level contour line across the upper slope.`,
      },
      {
        num: 2,
        title: 'Excavate Swale Trench',
        instruction: `Dig a ditch ${SWALE_MEASUREMENTS.trenchWidth.formatted} wide at ground surface and ${SWALE_MEASUREMENTS.trenchDepth.formatted} deep.`,
      },
      {
        num: 3,
        title: 'Level Trench Floor',
        instruction: `Ensure the bottom of the ditch has a flat base ${SWALE_MEASUREMENTS.flatBaseWidth.formatted} wide so pooled water spreads evenly from end to end.`,
      },
      {
        num: 4,
        title: 'Mound Downhill Earth Bund',
        instruction: `Mound all dug earth on the downhill side to form an uncompacted sponge berm ${SWALE_MEASUREMENTS.bundHeight.formatted} high and ${SWALE_MEASUREMENTS.bundBaseWidth.formatted} wide.`,
      },
      {
        num: 5,
        title: 'Anchor with Vetiver Hedge',
        instruction: `Plant vetiver grass slips ${SWALE_MEASUREMENTS.vetiverHedgeSpacing.formatted} apart along the top of the berm to lock the soil and filter water permanently.`,
      },
    ],
    safetyNote: 'Provide level stone sill spillways at both ends of long swales to release extreme overflow safely without breaching the earth bund.',
  },

  'roof-tank': {
    title: 'Roof Rainwater Catchment and Storage Tank',
    symbolId: 'sym-roof-tank',
    desc: 'Homestead corrugated iron roof catchment with sloped gutters, automatic first-flush downpipe diverter, and covered food-grade storage tank.',
    timeEstimate: '3 hr installation',
    category: 'Homestead Water',
    steps: [
      {
        num: 1,
        title: 'Inspect Roof Catchment',
        instruction: `Ensure corrugated roof sheets have a ${ROOF_TANK_MEASUREMENTS.roofOverhang.formatted} overhang past walls. Clear away leaves, dust, and moss.`,
      },
      {
        num: 2,
        title: 'Slope Collection Gutters',
        instruction: `Fasten gutters with a steady fall of ${ROOF_TANK_MEASUREMENTS.gutterSlope.formatted} toward the downpipe corner.`,
      },
      {
        num: 3,
        title: 'Fit First-Flush Diverter',
        instruction: `Install a ${ROOF_TANK_MEASUREMENTS.firstFlushDiverterDiameter.formatted} vertical pipe to trap the initial dirty wash (${ROOF_TANK_MEASUREMENTS.firstFlushCapacity.formatted}) before clean water reaches the tank.`,
      },
      {
        num: 4,
        title: 'Install Covered Tank',
        instruction: `Place a ${ROOF_TANK_MEASUREMENTS.tankCapacity.formatted} food-grade tank on a ${ROOF_TANK_MEASUREMENTS.concreteBasePadThickness.formatted} reinforced concrete pad.`,
      },
      {
        num: 5,
        title: 'Mosquito Wire Mesh',
        instruction: `Fit ${ROOF_TANK_MEASUREMENTS.wireMeshScreenOpening.formatted} stainless wire mesh over all inlet, overflow, and breather openings to prevent malaria mosquitoes from breeding.`,
      },
    ],
    safetyNote: 'Keep stored water covered and boil or filter through a biosand filter before drinking. If anyone is unwell, go to the nearest health facility.',
  },

  'zeer-pot': {
    title: 'Zeer Pot Evaporative Refrigerator (Pot-in-Pot)',
    symbolId: 'sym-zeer-pot',
    desc: 'Pot-in-pot zero-electricity evaporative cooler made from two nested unglazed earthenware pots with wet river sand insulation and damp burlap cover.',
    timeEstimate: '30 min build',
    category: 'Food Preservation',
    steps: [
      {
        num: 1,
        title: 'Select Unglazed Earthenware',
        instruction: `Obtain an outer porous earthenware pot ${ZEER_POT_MEASUREMENTS.outerPotDiameter.formatted} in diameter and an inner pot ${ZEER_POT_MEASUREMENTS.innerPotDiameter.formatted} in diameter.`,
      },
      {
        num: 2,
        title: 'Sand Cushion Base',
        instruction: `Pour 5 cm [2 in] of clean river sand into the base of the large pot to support the smaller pot evenly.`,
      },
      {
        num: 3,
        title: 'Fill Sand Insulation Gap',
        instruction: `Center the inner pot and fill the surrounding ${ZEER_POT_MEASUREMENTS.sandGapThickness.formatted} gap with clean, coarse river sand up to the rim.`,
      },
      {
        num: 4,
        title: 'Daily Water Saturation',
        instruction: `Pour ${ZEER_POT_MEASUREMENTS.dailyWaterAddition.formatted} of clean water onto the sand each morning and evening. Keep the sand moist at all times.`,
      },
      {
        num: 5,
        title: 'Cover with Damp Cloth',
        instruction: `Place produce inside the clean inner pot and drape a damp burlap cloth over the top. The ${ZEER_POT_MEASUREMENTS.temperatureDrop.formatted} temperature drop keeps food fresh for ${ZEER_POT_MEASUREMENTS.storageExtension.formatted}.`,
      },
    ],
    safetyNote: 'Keep the Zeer pot in an open, breezy, shaded veranda. Wind is required to evaporate moisture from the outer pot and chill the contents.',
  },
};

/**
 * StandardDiagram Component
 * Matches the reference format in Guide_reader_12x_43d15509.png:
 * - Rendered as an SVG <symbol> with token classes (--dg-*)
 * - Labels at 16 units or larger on a 720-wide viewBox
 * - Labels outside artwork with leader lines
 * - Numbered markers matching HTML step list in <figcaption>
 * - role="img" with <title> and <desc>
 * - Metric first with imperial in brackets from src/data/measurements.ts
 * - "Draft" chip until local reviewer signs off
 */
export function StandardDiagram({
  type,
  titleOverride,
  isReviewed = false,
  reviewerName,
  className,
}: StandardDiagramProps) {
  const config = DIAGRAM_CONFIGS[type];
  const title = titleOverride || config.title;
  const diagramTitleId = `diag-title-${type}`;
  const diagramDescId = `diag-desc-${type}`;

  return (
    <figure 
      className={cn(
        'w-full rounded-2xl bg-[#FFFDF8] dark:bg-[#0E1B13] border border-[#E4DCCB] dark:border-emerald-900/60 p-4 sm:p-6 flex flex-col gap-5 shadow-xs overflow-hidden',
        className
      )}
    >
      {/* Header bar: Title & "Draft" chip until local reviewer signs off */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4DCCB] dark:border-emerald-900/50 pb-3">
        <div className="flex items-center gap-2">
          <Ruler size={16} className="text-[#B4531F] dark:text-amber-400 shrink-0" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F2A22] dark:text-[#F6F1E7]">
            {title}
          </h3>
        </div>

        {/* The Draft Chip / Reviewer Signature Badge */}
        {isReviewed ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span>Reviewed locally {reviewerName ? `by ${reviewerName}` : '· Verified'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F3] dark:bg-amber-950/50 border border-[#E4DCCB] dark:border-amber-800/60 text-[#8C5320] dark:text-amber-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#B4531F] dark:bg-amber-400 shrink-0 animate-pulse" />
            <span>Draft · not yet checked locally</span>
          </span>
        )}
      </div>

      {/* Primary SVG Canvas: 720-wide viewBox, role="img", labels ≥ 16 units outside artwork with leader lines */}
      <div className="w-full bg-[#FAF7F0] dark:bg-[#07150E] rounded-xl border border-[#E4DCCB] dark:border-emerald-900/40 p-2 sm:p-4 overflow-x-auto">
        <svg
          viewBox="0 0 720 380"
          className="w-full min-w-[540px] max-w-full h-auto select-none"
          role="img"
          aria-labelledby={`${diagramTitleId} ${diagramDescId}`}
        >
          <title id={diagramTitleId}>{title}</title>
          <desc id={diagramDescId}>{config.desc}</desc>
          <use href={`#${config.symbolId}`} />
        </svg>
      </div>

      {/* Matching HTML Step List inside <figcaption> with numbered markers */}
      <figcaption className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-[#5A6458] dark:text-stone-400 uppercase tracking-wider">
          <span>Numbered field protocol</span>
          <span>{config.steps.length} sequential steps</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {config.steps.map((step) => (
            <div 
              key={step.num}
              className="p-3.5 rounded-xl bg-[#FFFDF8] dark:bg-[#112318] border border-[#E4DCCB] dark:border-emerald-900/50 flex flex-col gap-1.5 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B4531F] dark:bg-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {step.num}
                </span>
                <h4 className="font-serif text-xs font-bold text-[#1F2A22] dark:text-[#F6F1E7]">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-[#1F2A22]/90 dark:text-stone-300 leading-relaxed pl-8">
                {step.instruction}
              </p>
            </div>
          ))}
        </div>

        {/* Safety Note Callout */}
        {config.safetyNote && (
          <div className="p-3 rounded-xl bg-[#FFF9F3] dark:bg-[#1B281E] border border-[#E4DCCB] dark:border-amber-900/40 flex items-start gap-2.5 text-xs text-[#1F2A22] dark:text-stone-300 mt-1">
            <Info size={15} className="text-[#B4531F] dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#8C5320] dark:text-amber-300">Safety &amp; stewardship note: </strong>
              {config.safetyNote}
            </p>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * Interactive Standardized Diagram Gallery
 * Allows toggling between all 5 diagrams in order:
 * 1. planting pit
 * 2. ridge spacing
 * 3. swale
 * 4. roof catchment and tank
 * 5. zeer pot
 */
export function StandardDiagramGallery({
  defaultType = 'planting-pit',
  className,
}: {
  defaultType?: StandardDiagramType;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<StandardDiagramType>(defaultType);

  const tabs: { id: StandardDiagramType; label: string; num: string }[] = [
    { id: 'planting-pit', label: '1. Planting Pit', num: '01' },
    { id: 'ridge-spacing', label: '2. Ridge Spacing', num: '02' },
    { id: 'swale', label: '3. Swale', num: '03' },
    { id: 'roof-tank', label: '4. Roof Catchment & Tank', num: '04' },
    { id: 'zeer-pot', label: '5. Zeer Pot', num: '05' },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* 5 Tabs in strict required order */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-[#E4DCCB] dark:border-emerald-900/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border',
              activeTab === tab.id
                ? 'bg-[#B4531F] dark:bg-amber-500 text-white border-[#B4531F] shadow-xs font-bold'
                : 'bg-[#FFFDF8] dark:bg-[#112318] text-[#5A6458] dark:text-stone-300 border-[#E4DCCB] dark:border-emerald-900/50 hover:border-[#B4531F]'
            )}
          >
            <span className="font-mono text-[11px] opacity-80">{tab.num}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Render the Active Standard Diagram */}
      <StandardDiagram type={activeTab} />
    </div>
  );
}
