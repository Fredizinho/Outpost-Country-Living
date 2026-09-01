import React from 'react';

/**
 * CountryIcons.tsx
 * =============================================================================
 * Unified Design-System Illustration & Custom SVG Vector Library.
 *
 * Visual Rules:
 * - Single source of truth for all custom Malawi Agrarian & Permaculture illustrations.
 * - Palette strictly aligned with index.css theme tokens:
 *     - Emeralds: #042614, #14532d, #166534, #15803d, #22c55e, #86efac, #dcfce7
 *     - Terracottas: #361009, #782a15, #933113, #b94218, #dc5c23, #f57d42, #ffd7b5
 *     - Earths: #25201a, #55483a, #6a5a47, #a18b6e, #d3c7b5, #f5f2ed
 *     - Ambers & Sun: #b45309, #d97706, #f59e0b, #fbbf24, #fef3c7
 *     - Hydrology/Lake: #0369a1, #0284c7, #38bdf8, #bae6fd, #f0f9ff
 * - Confident, organic stroke weights (1.5 - 2px), smooth curves, editorial woodcut/lithograph feel.
 * - No photographic or generic gradient slop. Pure geometric and artisan cartographic vectors.
 * =============================================================================
 */

export interface CountryIllustrationProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  badge?: string;
}

export const COUNTRY_PALETTE = {
  emerald: {
    darkest: '#042614',
    dark: '#14532d',
    primary: '#166534',
    leaf: '#15803d',
    vibrant: '#22c55e',
    light: '#86efac',
    mist: '#dcfce7',
    tint: '#f0fdf4',
  },
  terracotta: {
    deep: '#361009',
    brick: '#782a15',
    clay: '#933113',
    rich: '#b94218',
    primary: '#dc5c23',
    warm: '#f57d42',
    peach: '#ffd7b5',
    blush: '#fff8f3',
  },
  earth: {
    night: '#25201a',
    bark: '#55483a',
    soil: '#6a5a47',
    loam: '#a18b6e',
    sand: '#d3c7b5',
    cream: '#f5f2ed',
  },
  amber: {
    ochre: '#b45309',
    gold: '#d97706',
    sun: '#f59e0b',
    glow: '#fbbf24',
    dawn: '#fef3c7',
  },
  lakeSky: {
    deep: '#0369a1',
    water: '#0284c7',
    shore: '#38bdf8',
    foam: '#bae6fd',
    shimmer: '#f0f9ff',
  },
};

/**
 * 1. FLAGSHIP COUNTRY SCENE (Homestead Sanctuary)
 * Majestic mountain ridge backdrop, acacia tree canopy, solar roof cottage,
 * raised permaculture garden beds, water reservoir, and morning sun.
 */
export function CountryScene({
  className = 'w-full h-auto',
  width = 640,
  height = 360,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="cs-frame">
          <rect width="640" height="360" rx="24" />
        </clipPath>
        <linearGradient id="cs-sky" x1="320" y1="0" x2="320" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#fef9ee" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="cs-mountain" x1="0" y1="80" x2="640" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6a5a47" />
          <stop offset="50%" stopColor="#55483a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>

      <g clipPath="url(#cs-frame)">
        {/* Soft Atmosphere Sky */}
        <rect width="640" height="360" fill="url(#cs-sky)" />

        {/* Morning Sun Disk & Rays */}
        <circle cx="140" cy="110" r="42" fill="#fbbf24" fillOpacity="0.85" />
        <circle cx="140" cy="110" r="58" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.4" />
        <circle cx="140" cy="110" r="74" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.25" />

        {/* Distant Mountain Escarpment (Mulanje / Dedza Ridge) */}
        <path
          d="M-20 220 L70 145 L160 180 L280 110 L390 175 L490 125 L580 165 L660 130 L660 270 L-20 270 Z"
          fill="url(#cs-mountain)"
          fillOpacity="0.28"
        />
        <path
          d="M-20 235 L90 170 L210 205 L310 155 L430 200 L530 160 L660 215 L660 300 L-20 300 Z"
          fill="#166534"
          fillOpacity="0.4"
        />

        {/* Rolling Agrarian Foothills */}
        <path
          d="M-10 255 Q160 210 320 245 T650 225 L650 360 L-10 360 Z"
          fill="#15803d"
        />

        {/* Contour Terrace Bunds & Swale System */}
        <path
          d="M-10 290 Q180 260 360 285 T650 265"
          stroke="#86efac"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
        />
        <path
          d="M-10 315 Q220 285 420 310 T650 295"
          stroke="#dcfce7"
          strokeWidth="2"
          fill="none"
        />

        {/* Terracotta Homestead Cottage */}
        <g transform="translate(180, 205)">
          {/* Base Walls */}
          <rect x="0" y="24" width="76" height="42" rx="4" fill="#ffd7b5" stroke="#782a15" strokeWidth="2" />
          {/* Main Door */}
          <rect x="28" y="38" width="18" height="28" rx="2" fill="#782a15" />
          <circle cx="41" cy="52" r="1.5" fill="#fbbf24" />
          {/* Windows */}
          <rect x="8" y="34" width="14" height="14" rx="2" fill="#bae6fd" stroke="#782a15" strokeWidth="1.5" />
          <line x1="15" y1="34" x2="15" y2="48" stroke="#782a15" strokeWidth="1" />
          <line x1="8" y1="41" x2="22" y2="41" stroke="#782a15" strokeWidth="1" />
          <rect x="52" y="34" width="14" height="14" rx="2" fill="#bae6fd" stroke="#782a15" strokeWidth="1.5" />
          <line x1="59" y1="34" x2="59" y2="48" stroke="#782a15" strokeWidth="1" />
          <line x1="52" y1="41" x2="66" y2="41" stroke="#782a15" strokeWidth="1" />
          {/* Roof (Gabled Brick Terracotta) */}
          <polygon points="-8,25 38,-2 84,25" fill="#dc5c23" stroke="#782a15" strokeWidth="2" />
          {/* Solar Photovoltaic Panels on Roof */}
          <rect x="8" y="8" width="24" height="13" rx="1.5" fill="#0369a1" stroke="#0284c7" strokeWidth="1" transform="skewX(-14)" />
          <line x1="16" y1="8" x2="16" y2="21" stroke="#38bdf8" strokeWidth="0.8" transform="skewX(-14)" />
          <line x1="24" y1="8" x2="24" y2="21" stroke="#38bdf8" strokeWidth="0.8" transform="skewX(-14)" />
          {/* Chimney / Ventilation */}
          <rect x="56" y="2" width="8" height="14" fill="#933113" stroke="#782a15" strokeWidth="1.2" />
        </g>

        {/* Rainwater Harvesting Ferrocement Tank */}
        <g transform="translate(266, 235)">
          <rect x="0" y="8" width="22" height="28" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.8" />
          <ellipse cx="11" cy="8" rx="11" ry="3.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
          <line x1="4" y1="18" x2="18" y2="18" stroke="#bae6fd" strokeWidth="1" />
          <line x1="4" y1="26" x2="18" y2="26" stroke="#bae6fd" strokeWidth="1" />
          {/* Water Spigot */}
          <path d="M22 26 L26 26 L26 29" stroke="#782a15" strokeWidth="1.5" fill="none" />
        </g>

        {/* Indigenous Acacia Canopy Tree (Left) */}
        <g transform="translate(60, 185)">
          {/* Trunk */}
          <path d="M42 95 Q38 55 48 35 Q40 50 28 95 Z" fill="#55483a" stroke="#25201a" strokeWidth="1.5" />
          {/* Branches */}
          <path d="M46 45 Q70 28 85 20" stroke="#55483a" strokeWidth="2.5" fill="none" />
          <path d="M40 50 Q18 35 5 24" stroke="#55483a" strokeWidth="2.2" fill="none" />
          {/* Tiered Flat Acacia Crowns */}
          <ellipse cx="88" cy="18" rx="34" ry="10" fill="#14532d" stroke="#042614" strokeWidth="1.5" />
          <ellipse cx="88" cy="15" rx="26" ry="6" fill="#16a34a" />
          <ellipse cx="5" cy="22" rx="28" ry="9" fill="#14532d" stroke="#042614" strokeWidth="1.5" />
          <ellipse cx="5" cy="19" rx="20" ry="5" fill="#22c55e" />
          <ellipse cx="48" cy="10" rx="38" ry="11" fill="#14532d" stroke="#042614" strokeWidth="1.8" />
          <ellipse cx="48" cy="7" rx="30" ry="7" fill="#16a34a" />
        </g>

        {/* Majestic Baobab / Fruit Tree (Right) */}
        <g transform="translate(480, 170)">
          {/* Thick Baobab Trunk */}
          <path
            d="M45 110 C40 85 30 70 32 45 C35 25 45 18 55 18 C65 18 75 25 78 45 C80 70 70 85 65 110 Z"
            fill="#6a5a47"
            stroke="#25201a"
            strokeWidth="2"
          />
          {/* Canopy foliage */}
          <circle cx="35" cy="20" r="26" fill="#15803d" stroke="#042614" strokeWidth="1.5" />
          <circle cx="75" cy="22" r="28" fill="#166534" stroke="#042614" strokeWidth="1.5" />
          <circle cx="55" cy="8" r="32" fill="#14532d" stroke="#042614" strokeWidth="1.8" />
          <circle cx="55" cy="6" r="22" fill="#22c55e" fillOpacity="0.9" />
          {/* Hanging fruit pods */}
          <ellipse cx="42" cy="42" rx="3" ry="5" fill="#fbbf24" stroke="#782a15" strokeWidth="1" />
          <ellipse cx="68" cy="46" rx="3" ry="5" fill="#fbbf24" stroke="#782a15" strokeWidth="1" />
        </g>

        {/* Raised Garden Beds (Permaculture Bio-Intensive Rows) */}
        <g transform="translate(320, 260)">
          {/* Bed 1 */}
          <path d="M0 20 Q50 10 110 18 L105 32 Q45 24 -5 32 Z" fill="#933113" stroke="#782a15" strokeWidth="1.5" />
          {/* Crops in Bed 1 */}
          <g transform="translate(10, 12)">
            <circle cx="10" cy="0" r="4" fill="#22c55e" stroke="#042614" strokeWidth="1" />
            <circle cx="30" cy="-2" r="5" fill="#4ade80" stroke="#042614" strokeWidth="1" />
            <circle cx="52" cy="-1" r="4.5" fill="#22c55e" stroke="#042614" strokeWidth="1" />
            <circle cx="74" cy="0" r="5" fill="#86efac" stroke="#042614" strokeWidth="1" />
          </g>
          {/* Bed 2 */}
          <path d="M-20 42 Q40 32 100 40 L95 54 Q35 46 -25 54 Z" fill="#782a15" stroke="#361009" strokeWidth="1.5" />
          {/* Crops in Bed 2 (Maize & Pigeon Peas) */}
          <g transform="translate(-10, 32)">
            <line x1="8" y1="8" x2="8" y2="-8" stroke="#16a34a" strokeWidth="2" />
            <ellipse cx="8" cy="-8" rx="3" ry="5" fill="#fbbf24" />
            <line x1="28" y1="8" x2="28" y2="-10" stroke="#16a34a" strokeWidth="2" />
            <ellipse cx="28" cy="-10" rx="3" ry="5" fill="#fbbf24" />
            <line x1="48" y1="8" x2="48" y2="-9" stroke="#16a34a" strokeWidth="2" />
            <ellipse cx="48" cy="-9" rx="3" ry="5" fill="#fbbf24" />
            <line x1="68" y1="8" x2="68" y2="-8" stroke="#16a34a" strokeWidth="2" />
            <ellipse cx="68" cy="-8" rx="3" ry="5" fill="#fbbf24" />
          </g>
        </g>

        {/* Foreground Vetiver Contour Grass & Wildflowers */}
        <g transform="translate(0, 320)">
          <path
            d="M0 40 Q80 20 180 30 T360 25 T540 35 T640 20 L640 40 L0 40 Z"
            fill="#042614"
          />
          {/* Vetiver Grass Tufts */}
          <path d="M40 35 L45 15 M43 35 L50 18 M46 35 L54 22" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M120 32 L125 12 M123 32 L131 16 M126 32 L135 20" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M220 30 L225 10 M223 30 L232 14 M226 30 L237 18" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M440 32 L445 14 M443 32 L452 18 M446 32 L456 22" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M580 28 L585 10 M583 28 L592 14 M586 28 L596 18" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Clean Frame Border */}
        <rect x="1" y="1" width="638" height="358" rx="23" stroke="#14532d" strokeWidth="2" strokeOpacity="0.4" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 2. SOIL STRATA & KATONDO BLUEPRINT ILLUSTRATION
 * Cutaway cross-section of deep Katondo latosol, surface humus, and bedrock.
 */
export function SoilStrataIllustration({
  className = 'w-full h-auto',
  width = 400,
  height = 280,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="soil-frame">
          <rect width="400" height="280" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#soil-frame)">
        {/* Layer 1: Surface Vegetation & Mulch (0-5cm) */}
        <rect x="0" y="0" width="400" height="40" fill="#042614" />
        <path d="M0 40 Q50 35 100 40 T200 38 T300 40 T400 37 L400 42 L0 42 Z" fill="#14532d" />
        {/* Mulch & Sprout Grass */}
        <g stroke="#86efac" strokeWidth="1.5" strokeLinecap="round">
          <path d="M30 38 L34 20 M33 38 L39 23" />
          <path d="M90 38 L93 18 M92 38 L99 22" />
          <path d="M160 38 L165 19 M163 38 L171 24" />
          <path d="M240 38 L244 18 M243 38 L250 23" />
          <path d="M320 38 L325 21 M323 38 L331 25" />
          <path d="M370 38 L374 19 M373 38 L380 23" />
        </g>
        <text x="20" y="24" fill="#86efac" fontSize="11" fontWeight="800" letterSpacing="0.05em">
          01. ORGANIC HUMUS & MULCH (0-25cm) • pH 6.4
        </text>

        {/* Layer 2: Katondo Iron-Rich Latosol Subsoil (25-120cm) */}
        <rect x="0" y="42" width="400" height="130" fill="#782a15" />
        {/* Red Clay Minerals & Aggregate Textures */}
        <path d="M0 42 Q100 50 200 45 T400 48" stroke="#dc5c23" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        <path d="M0 100 Q150 108 300 98 T400 104" stroke="#933113" strokeWidth="2" strokeDasharray="12 6" fill="none" />
        {/* Mineral specks */}
        <circle cx="80" cy="80" r="4" fill="#dc5c23" />
        <circle cx="210" cy="70" r="5" fill="#f57d42" />
        <circle cx="310" cy="95" r="4.5" fill="#dc5c23" />
        <circle cx="150" cy="120" r="6" fill="#b94218" />
        <circle cx="280" cy="135" r="5" fill="#dc5c23" />
        <text x="20" y="85" fill="#ffd7b5" fontSize="11" fontWeight="800">
          02. KATONDO LATOSOL SUBSOIL (25-120cm)
        </text>
        <text x="20" y="102" fill="#ffd7b5" fontSize="9" opacity="0.85">
          High Fe & Al oxides • High water-holding capacity • pH 5.8-6.2
        </text>

        {/* Deep Taproots & Mycorrhizal Network traversing Katondo */}
        <g stroke="#ffd7b5" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M120 40 Q118 80 125 120 T115 160" />
          <path d="M120 70 Q140 85 155 105" strokeWidth="1.2" />
          <path d="M122 100 Q100 115 85 135" strokeWidth="1.2" />
          
          <path d="M260 40 Q265 85 258 130 T268 170" />
          <path d="M262 75 Q285 90 305 110" strokeWidth="1.2" />
          <path d="M260 110 Q240 125 225 145" strokeWidth="1.2" />
        </g>

        {/* Layer 3: Weathered Saprolite & Bedrock (120cm+) */}
        <rect x="0" y="172" width="400" height="108" fill="#25201a" />
        {/* Rock fissures and stone blocks */}
        <polygon points="40,200 90,190 110,225 60,235" fill="#55483a" stroke="#6a5a47" strokeWidth="1.5" />
        <polygon points="160,195 230,185 250,220 180,230" fill="#463c31" stroke="#6a5a47" strokeWidth="1.5" />
        <polygon points="290,205 360,195 380,235 310,245" fill="#55483a" stroke="#6a5a47" strokeWidth="1.5" />
        <text x="20" y="260" fill="#d3c7b5" fontSize="11" fontWeight="800">
          03. WEATHERED SAPROLITE & BASEMENT COMPLEX (1.2m+)
        </text>

        {/* Border */}
        <rect x="1" y="1" width="398" height="278" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 3. SOLAR WATER BOREHOLE & RESERVOIR ILLUSTRATION
 * Solar array, submersible DC pump, borehole head, crystal clean outflow.
 */
export function SolarBoreholeIllustration({
  className = 'w-full h-auto',
  width = 360,
  height = 240,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="sb-frame">
          <rect width="360" height="240" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#sb-frame)">
        {/* Background Sky */}
        <rect width="360" height="240" fill="#f0f9ff" />

        {/* Glowing Sun */}
        <circle cx="60" cy="50" r="28" fill="#fbbf24" />
        <circle cx="60" cy="50" r="38" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 4" />

        {/* Ground level */}
        <rect x="0" y="150" width="360" height="90" fill="#782a15" />
        <rect x="0" y="150" width="360" height="12" fill="#15803d" />

        {/* Solar PV Panel Array on Sturdy Timber Frame */}
        <g transform="translate(90, 70)">
          {/* Timber Legs */}
          <line x1="15" y1="40" x2="20" y2="80" stroke="#55483a" strokeWidth="3" strokeLinecap="round" />
          <line x1="55" y1="40" x2="60" y2="80" stroke="#55483a" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="60" x2="58" y2="60" stroke="#55483a" strokeWidth="2" />
          {/* Angled Solar Panels (30° Latitude Angle) */}
          <polygon points="0,40 70,25 75,45 5,60" fill="#0369a1" stroke="#0284c7" strokeWidth="2" />
          {/* Panel Grid Lines */}
          <line x1="24" y1="35" x2="29" y2="55" stroke="#38bdf8" strokeWidth="1" />
          <line x1="48" y1="30" x2="53" y2="50" stroke="#38bdf8" strokeWidth="1" />
          <line x1="3" y1="50" x2="73" y2="35" stroke="#38bdf8" strokeWidth="1" />
          {/* Inverter Box */}
          <rect x="62" y="58" width="12" height="16" rx="2" fill="#166534" stroke="#042614" strokeWidth="1" />
          <circle cx="68" cy="64" r="1.5" fill="#4ade80" />
        </g>

        {/* Concrete Wellhead Apron & Borehole Casing */}
        <g transform="translate(200, 130)">
          {/* Raised Concrete Pad */}
          <polygon points="-10,25 60,25 70,35 -20,35" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1.5" />
          {/* Borehole Steel Head */}
          <rect x="18" y="5" width="14" height="22" rx="2" fill="#042614" stroke="#14532d" strokeWidth="1.5" />
          {/* Rising Water Pipe */}
          <path d="M25 5 L25 -10 Q25 -20 38 -20 L75 -20" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Clean Water Gush */}
          <path d="M75 -20 Q85 -20 88 5 T92 30" stroke="#38bdf8" strokeWidth="3" fill="none" strokeDasharray="6 3" />
          {/* Terracotta Pot / Basin Under Spout */}
          <path d="M78 12 Q75 32 92 32 Q108 32 105 12 Z" fill="#dc5c23" stroke="#782a15" strokeWidth="1.5" />
          {/* Water Splash Ripples */}
          <ellipse cx="92" cy="14" rx="10" ry="3" fill="#bae6fd" />
        </g>

        {/* Title Badge */}
        <rect x="12" y="196" width="170" height="26" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="22" y="213" fill="#86efac" fontSize="10" fontWeight="800">
          ☀️ SOLAR PUMP • 45m AQUIFER
        </text>

        <rect x="1" y="1" width="358" height="238" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 4. PERMACULTURE SWALE & CONTOUR BUND
 * A-frame leveled swale trench, vetiver hedge, mulch basin, banana circle.
 */
export function PermacultureSwaleIllustration({
  className = 'w-full h-auto',
  width = 360,
  height = 240,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="sw-frame">
          <rect width="360" height="240" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#sw-frame)">
        {/* Soft Sky */}
        <rect width="360" height="240" fill="#f0fdf4" />

        {/* Rain clouds and gentle droplets */}
        <g transform="translate(180, 25)">
          <path d="M0 20 Q10 5 25 15 Q40 5 55 18 Q65 10 75 22 L0 22 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
          <line x1="15" y1="26" x2="10" y2="38" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="35" y1="26" x2="30" y2="40" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="55" y1="26" x2="50" y2="38" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Cross-section of Soil Slope */}
        <path
          d="M0 100 L120 120 L150 150 L200 150 L230 110 L360 135 L360 240 L0 240 Z"
          fill="#782a15"
          stroke="#361009"
          strokeWidth="2"
        />

        {/* Top Organic Soil Layer */}
        <path
          d="M0 100 L120 120 L150 150 L200 150 L230 110 L360 135 L360 150 L230 125 L200 162 L150 162 L120 132 L0 112 Z"
          fill="#14532d"
        />

        {/* Water Pool in Swale Base */}
        <path d="M145 150 Q175 145 205 150 L200 158 Q175 162 150 158 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
        {/* Infiltration Arrows into Aquifer */}
        <path d="M175 165 L175 190 M170 185 L175 190 L180 185" stroke="#38bdf8" strokeWidth="2" fill="none" />

        {/* Swale Mound (Berm) on Downhill Side */}
        {/* Vetiver Grass Barrier planted on berm crest */}
        <g transform="translate(225, 60)" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
          <path d="M5 50 L0 5 M5 50 L8 8 M5 50 L15 15" />
          <path d="M18 50 L14 10 M18 50 L22 12 M18 50 L28 20" />
        </g>

        {/* Banana Plant growing in nutrient-rich swale basin */}
        <g transform="translate(70, 45)">
          <path d="M25 75 Q20 50 30 35" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          {/* Banana Broad Leaves */}
          <path d="M30 35 Q10 20 -5 30 Q15 40 30 35" fill="#22c55e" stroke="#042614" strokeWidth="1.5" />
          <path d="M30 35 Q50 10 70 18 Q50 32 30 35" fill="#22c55e" stroke="#042614" strokeWidth="1.5" />
          <path d="M30 35 Q35 10 40 -5 Q42 15 30 35" fill="#4ade80" stroke="#042614" strokeWidth="1.5" />
        </g>

        {/* Annotation Label */}
        <rect x="12" y="196" width="195" height="26" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="22" y="213" fill="#86efac" fontSize="10" fontWeight="800">
          🌱 CONTOUR SWALE • WATER RETENTION
        </text>

        <rect x="1" y="1" width="358" height="238" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 5. TRADITIONAL NKHOKWE GRAIN SILO & HARVEST
 * Elevated woven granary on hardwood stilts with rodent baffles and thatched roof.
 */
export function GranaryStorageIllustration({
  className = 'w-full h-auto',
  width = 320,
  height = 240,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="gr-frame">
          <rect width="320" height="240" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#gr-frame)">
        <rect width="320" height="240" fill="#fef9ee" />

        {/* Ground */}
        <rect x="0" y="180" width="320" height="60" fill="#782a15" />
        <rect x="0" y="180" width="320" height="8" fill="#15803d" />

        {/* Nkhokwe Granary */}
        <g transform="translate(110, 45)">
          {/* Hardwood Support Stilts */}
          <line x1="15" y1="90" x2="15" y2="140" stroke="#55483a" strokeWidth="4" strokeLinecap="round" />
          <line x1="45" y1="90" x2="45" y2="140" stroke="#55483a" strokeWidth="4" strokeLinecap="round" />
          <line x1="75" y1="90" x2="75" y2="140" stroke="#55483a" strokeWidth="4" strokeLinecap="round" />

          {/* Rodent Guards / Metal Cones on Stilts */}
          <polygon points="5,112 25,112 15,102" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1" />
          <polygon points="35,112 55,112 45,102" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1" />
          <polygon points="65,112 85,112 75,102" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1" />

          {/* Granary Platform */}
          <rect x="0" y="85" width="90" height="10" rx="2" fill="#6a5a47" stroke="#25201a" strokeWidth="1.5" />

          {/* Woven Basket Cylinder Body */}
          <rect x="10" y="35" width="70" height="50" rx="6" fill="#ffd7b5" stroke="#782a15" strokeWidth="2" />
          {/* Woven Texture */}
          <line x1="10" y1="48" x2="80" y2="48" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="10" y1="60" x2="80" y2="60" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="10" y1="72" x2="80" y2="72" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="28" y1="35" x2="28" y2="85" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="45" y1="35" x2="45" y2="85" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="62" y1="35" x2="62" y2="85" stroke="#dc5c23" strokeWidth="1" strokeDasharray="4 2" />

          {/* Conical Thatch Roof */}
          <polygon points="-5,38 45,0 95,38" fill="#d97706" stroke="#782a15" strokeWidth="2" />
          {/* Thatch overhang lines */}
          <line x1="45" y1="0" x2="15" y2="38" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="45" y1="0" x2="45" y2="38" stroke="#fbbf24" strokeWidth="1.2" />
          <line x1="45" y1="0" x2="75" y2="38" stroke="#fbbf24" strokeWidth="1.2" />
        </g>

        {/* Baskets of Maize (Chimanga) & Legumes in Foreground */}
        <g transform="translate(210, 160)">
          <path d="M0 15 Q0 30 20 30 Q40 30 40 15 Z" fill="#dc5c23" stroke="#782a15" strokeWidth="1.5" />
          {/* Golden Maize Cobs */}
          <ellipse cx="14" cy="12" rx="4" ry="8" fill="#fbbf24" stroke="#b45309" strokeWidth="1" transform="rotate(-20 14 12)" />
          <ellipse cx="26" cy="12" rx="4" ry="8" fill="#fbbf24" stroke="#b45309" strokeWidth="1" transform="rotate(15 26 12)" />
        </g>

        {/* Badge */}
        <rect x="12" y="196" width="180" height="26" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="22" y="213" fill="#86efac" fontSize="10" fontWeight="800">
          🌽 NKHOKWE • POST-HARVEST STORAGE
        </text>

        <rect x="1" y="1" width="318" height="238" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 6. HERBAL MEDICINE & APOTHECARY GUILD
 * Moringa, Neem, Artemisia, Ginger root, clay mortar & pestle.
 */
export function HerbalApothecaryIllustration({
  className = 'w-full h-auto',
  width = 300,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 300 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ha-frame">
          <rect width="300" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ha-frame)">
        <rect width="300" height="220" fill="#f0fdf4" />

        {/* Clay Mortar and Wooden Pestle */}
        <g transform="translate(110, 95)">
          {/* Mortar Body */}
          <path d="M10 25 Q15 65 40 65 Q65 65 70 25 Z" fill="#933113" stroke="#361009" strokeWidth="2" />
          <ellipse cx="40" cy="25" rx="30" ry="8" fill="#782a15" stroke="#361009" strokeWidth="1.8" />
          {/* Ground green herbs inside */}
          <ellipse cx="40" cy="27" rx="20" ry="5" fill="#15803d" />
          {/* Pestle */}
          <line x1="28" y1="28" x2="10" y2="-10" stroke="#55483a" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* Moringa & Neem Leaves sprig */}
        <g transform="translate(45, 40)">
          <path d="M10 80 Q30 40 50 10" stroke="#15803d" strokeWidth="2.5" fill="none" />
          {/* Oval Moringa Leaflets */}
          <ellipse cx="20" cy="60" rx="7" ry="4" fill="#22c55e" stroke="#042614" strokeWidth="1" transform="rotate(-30 20 60)" />
          <ellipse cx="36" cy="50" rx="7" ry="4" fill="#22c55e" stroke="#042614" strokeWidth="1" transform="rotate(30 36 50)" />
          <ellipse cx="32" cy="32" rx="6" ry="4" fill="#4ade80" stroke="#042614" strokeWidth="1" transform="rotate(-25 32 32)" />
          <ellipse cx="45" cy="25" rx="6" ry="4" fill="#4ade80" stroke="#042614" strokeWidth="1" transform="rotate(25 45 25)" />
          <ellipse cx="50" cy="10" rx="5" ry="3" fill="#86efac" stroke="#042614" strokeWidth="1" />
        </g>

        {/* Fresh Ginger Rhizome */}
        <g transform="translate(190, 120)">
          <path
            d="M10 30 Q0 20 15 10 Q25 5 35 15 Q45 10 55 18 Q65 25 55 35 Q40 45 25 35 Z"
            fill="#d97706"
            stroke="#782a15"
            strokeWidth="1.8"
          />
          {/* Knobby Rings */}
          <path d="M22 15 Q26 28 20 32" stroke="#b45309" strokeWidth="1.2" fill="none" />
          <path d="M40 18 Q44 30 38 36" stroke="#b45309" strokeWidth="1.2" fill="none" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="185" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🌿 APOTHECARY • NATURAL REMEDIES
        </text>

        <rect x="1" y="1" width="298" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 7. LAKE MALAWI & ARTISANAL WATERWAYS
 * Lake Malawi shoreline, fisherman's wooden dhow boat with sail, reed beds.
 */
export function LakeMalawiIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="lm-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#lm-frame)">
        {/* Soft Golden Sunset Sky */}
        <rect width="340" height="220" fill="#fef3c7" />

        {/* Distant Escarpment across lake */}
        <path d="M0 110 L60 85 L140 100 L220 80 L300 95 L340 85 L340 130 L0 130 Z" fill="#6a5a47" fillOpacity="0.4" />

        {/* Lake Malawi Azure Waters */}
        <rect x="0" y="115" width="340" height="105" fill="#0284c7" />
        <path d="M0 115 Q85 105 170 115 T340 115 L340 220 L0 220 Z" fill="#0369a1" />

        {/* Water Ripple Waves */}
        <path d="M20 140 Q60 135 100 140" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M160 155 Q210 150 260 155" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M80 175 Q130 170 180 175" stroke="#bae6fd" strokeWidth="1.8" strokeLinecap="round" />

        {/* Traditional Wooden Dhow Boat */}
        <g transform="translate(130, 80)">
          {/* Hull */}
          <path d="M10 55 Q35 68 75 55 L85 45 L0 45 Z" fill="#782a15" stroke="#361009" strokeWidth="1.8" />
          {/* Mast */}
          <line x1="38" y1="45" x2="38" y2="10" stroke="#55483a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Triangular Lateen Sail */}
          <polygon points="38,12 80,38 38,42" fill="#fff8f3" stroke="#782a15" strokeWidth="1.2" />
        </g>

        {/* Chambo Fish Jumping */}
        <g transform="translate(70, 125)">
          <path d="M0 10 Q12 0 24 10 Q12 14 0 10" fill="#bae6fd" stroke="#0369a1" strokeWidth="1" />
          <polygon points="22,10 28,6 28,14" fill="#bae6fd" stroke="#0369a1" strokeWidth="1" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="190" height="24" rx="6" fill="#042614" stroke="#38bdf8" strokeWidth="1" />
        <text x="20" y="196" fill="#bae6fd" fontSize="9.5" fontWeight="800">
          🌊 LAKE MALAWI • AQUATIC GUILD
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 8. SABBATH PEACE & HOMESTEAD SANCTUARY
 * Golden twilight, open Scripture on rustic timber table, olive branch.
 */
export function SabbathSanctuaryIllustration({
  className = 'w-full h-auto',
  width = 320,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ss-frame">
          <rect width="320" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ss-frame)">
        {/* Serene Sunset Sky */}
        <rect width="320" height="220" fill="#fef3c7" />
        <circle cx="160" cy="70" r="45" fill="#f59e0b" fillOpacity="0.8" />
        <circle cx="160" cy="70" r="60" stroke="#d97706" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />

        {/* Distant Peaceful Hills */}
        <path d="M0 130 Q90 100 180 125 T320 115 L320 220 L0 220 Z" fill="#14532d" />

        {/* Rustic Wooden Table */}
        <g transform="translate(75, 110)">
          {/* Tabletop */}
          <polygon points="-10,35 180,35 170,45 -20,45" fill="#6a5a47" stroke="#25201a" strokeWidth="1.5" />
          {/* Table Legs */}
          <line x1="5" y1="45" x2="5" y2="75" stroke="#55483a" strokeWidth="3.5" />
          <line x1="155" y1="45" x2="155" y2="75" stroke="#55483a" strokeWidth="3.5" />

          {/* Open Bible */}
          <g transform="translate(55, 15)">
            {/* Pages Open */}
            <path d="M0 18 Q25 10 50 16 L50 24 Q25 18 0 24 Z" fill="#fff8f3" stroke="#782a15" strokeWidth="1.2" />
            <path d="M50 16 Q75 10 100 18 L100 24 Q75 18 50 24 Z" fill="#fff8f3" stroke="#782a15" strokeWidth="1.2" />
            {/* Book Spine & Bookmark ribbon */}
            <line x1="50" y1="16" x2="50" y2="24" stroke="#782a15" strokeWidth="2" />
            <path d="M50 24 Q55 30 52 38" stroke="#dc5c23" strokeWidth="1.8" fill="none" />
            {/* Text lines */}
            <line x1="8" y1="18" x2="42" y2="16" stroke="#d3c7b5" strokeWidth="1" />
            <line x1="8" y1="21" x2="40" y2="19" stroke="#d3c7b5" strokeWidth="1" />
            <line x1="58" y1="16" x2="92" y2="18" stroke="#d3c7b5" strokeWidth="1" />
            <line x1="60" y1="19" x2="92" y2="21" stroke="#d3c7b5" strokeWidth="1" />
          </g>

          {/* Olive / Peace Branch */}
          <g transform="translate(10, 18)">
            <path d="M0 15 Q20 5 40 10" stroke="#15803d" strokeWidth="1.8" fill="none" />
            <ellipse cx="12" cy="10" rx="4" ry="2.5" fill="#4ade80" transform="rotate(-20 12 10)" />
            <ellipse cx="26" cy="7" rx="4" ry="2.5" fill="#4ade80" transform="rotate(15 26 7)" />
          </g>
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="180" height="24" rx="6" fill="#042614" stroke="#fbbf24" strokeWidth="1" />
        <text x="20" y="196" fill="#fde68a" fontSize="9.5" fontWeight="800">
          🕊️ SABBATH SANCTUARY & REST
        </text>

        <rect x="1" y="1" width="318" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 10. THERMOPHILIC COMPOSTING ILLUSTRATION
 * Layered heap (carbon brown, nitrogen green, manure, soil bio-inoculant), aeration chimney, compost fork.
 */
export function CompostIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="cmp-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#cmp-frame)">
        {/* Soft Background */}
        <rect width="340" height="220" fill="#fef9ee" />

        {/* Ground */}
        <rect x="0" y="170" width="340" height="50" fill="#782a15" />
        <rect x="0" y="170" width="340" height="8" fill="#15803d" />

        {/* Compost Bin / Pallet Slat Frame */}
        <g transform="translate(60, 50)">
          {/* Slat Wood Posts */}
          <line x1="20" y1="120" x2="20" y2="30" stroke="#55483a" strokeWidth="6" strokeLinecap="round" />
          <line x1="180" y1="120" x2="180" y2="30" stroke="#55483a" strokeWidth="6" strokeLinecap="round" />

          {/* Layered Compost Heap Mound */}
          <path
            d="M20 120 L25 50 Q100 20 175 50 L180 120 Z"
            fill="#55483a"
            stroke="#25201a"
            strokeWidth="2"
          />

          {/* Layer 1: Coarse Sticks & Twigs at base (Carbon Air Drainage) */}
          <g stroke="#ffd7b5" strokeWidth="2" strokeLinecap="round">
            <line x1="30" y1="110" x2="70" y2="115" />
            <line x1="80" y1="115" x2="130" y2="110" />
            <line x1="135" y1="112" x2="170" y2="116" />
          </g>

          {/* Layer 2: Brown Carbon Layer (Dry grass, crushed maize stalks) */}
          <path d="M23 95 Q100 85 177 95 L179 110 Q100 100 21 110 Z" fill="#d97706" fillOpacity="0.85" />
          
          {/* Layer 3: Green Nitrogen Layer (Fresh leaves, weeds, kitchen waste) */}
          <path d="M24 75 Q100 65 176 75 L177 95 Q100 85 23 95 Z" fill="#15803d" fillOpacity="0.9" />

          {/* Layer 4: Animal Manure & Biochar Activator */}
          <path d="M24 55 Q100 40 176 55 L176 75 Q100 65 24 75 Z" fill="#361009" fillOpacity="0.9" />

          {/* Slat Boards on Front */}
          <line x1="15" y1="105" x2="185" y2="105" stroke="#a18b6e" strokeWidth="5" strokeLinecap="round" />
          <line x1="15" y1="80" x2="185" y2="80" stroke="#a18b6e" strokeWidth="5" strokeLinecap="round" />
          <line x1="15" y1="55" x2="185" y2="55" stroke="#a18b6e" strokeWidth="5" strokeLinecap="round" />

          {/* Microbial Heat Vapors (55°C–65°C) */}
          <g stroke="#f57d42" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" fill="none">
            <path d="M70 25 Q65 10 75 0" />
            <path d="M100 20 Q105 5 98 -5" />
            <path d="M130 25 Q135 10 128 0" />
          </g>

          {/* Compost Thermometer Probe */}
          <line x1="140" y1="20" x2="120" y2="70" stroke="#dc5c23" strokeWidth="2.5" />
          <circle cx="140" cy="20" r="5" fill="#dc5c23" stroke="#782a15" strokeWidth="1" />
        </g>

        {/* Forged Steel Pitchfork */}
        <g transform="translate(230, 45) rotate(15)">
          <line x1="10" y1="0" x2="10" y2="130" stroke="#55483a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-5 130 Q10 140 25 130" stroke="#6a5a47" strokeWidth="3" fill="none" />
          <line x1="-5" y1="130" x2="-5" y2="155" stroke="#6a5a47" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="133" x2="2" y2="158" stroke="#6a5a47" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="133" x2="18" y2="158" stroke="#6a5a47" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="130" x2="25" y2="155" stroke="#6a5a47" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="195" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🍂 THERMOPHILIC COMPOST • 60°C
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 11. EMERGENCY FIRST AID ILLUSTRATION
 * Splinted limb with timber slats, pressure bandage roll, Aloe leaf & activated charcoal vial.
 */
export function FirstAidIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="fa-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#fa-frame)">
        {/* Soft Background */}
        <rect width="340" height="220" fill="#fff8f3" />

        {/* Medical Cross Red/Terracotta Emblem in Background */}
        <g transform="translate(170, 70)" opacity="0.12">
          <rect x="-15" y="-45" width="30" height="90" rx="6" fill="#b94218" />
          <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#b94218" />
        </g>

        {/* Timber Fracture Splint with Cloth Ties */}
        <g transform="translate(45, 60)">
          {/* Arm / Limb outline */}
          <path d="M10 40 Q70 35 150 40 L150 70 Q70 75 10 70 Z" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.5" />
          {/* Lower Wood Splint Slat */}
          <rect x="5" y="68" width="145" height="10" rx="2" fill="#55483a" stroke="#25201a" strokeWidth="1.2" />
          {/* Upper Wood Splint Slat */}
          <rect x="5" y="32" width="145" height="10" rx="2" fill="#55483a" stroke="#25201a" strokeWidth="1.2" />
          {/* Fabric Tie Bandages */}
          <rect x="30" y="28" width="14" height="54" rx="2" fill="#f5f2ed" stroke="#b94218" strokeWidth="1.5" />
          <rect x="75" y="28" width="14" height="54" rx="2" fill="#f5f2ed" stroke="#b94218" strokeWidth="1.5" />
          <rect x="120" y="28" width="14" height="54" rx="2" fill="#f5f2ed" stroke="#b94218" strokeWidth="1.5" />
          {/* Tie Knot ribbons */}
          <circle cx="37" cy="26" r="3" fill="#b94218" />
          <circle cx="82" cy="26" r="3" fill="#b94218" />
          <circle cx="127" cy="26" r="3" fill="#b94218" />
        </g>

        {/* Activated Charcoal Powder Bottle */}
        <g transform="translate(230, 45)">
          <rect x="10" y="20" width="38" height="55" rx="4" fill="#25201a" stroke="#042614" strokeWidth="1.8" />
          <rect x="18" y="10" width="22" height="10" rx="2" fill="#55483a" stroke="#25201a" strokeWidth="1.5" />
          {/* Label */}
          <rect x="14" y="32" width="30" height="28" rx="2" fill="#ffd7b5" />
          <text x="18" y="44" fill="#361009" fontSize="6.5" fontWeight="900">CHAR</text>
          <text x="18" y="53" fill="#782a15" fontSize="5.5" fontWeight="700">COAL</text>
        </g>

        {/* Fresh Healing Aloe Vera Leaf for Burns */}
        <g transform="translate(200, 115)">
          <path
            d="M0 45 Q35 30 75 10 Q50 35 30 50 Z"
            fill="#15803d"
            stroke="#042614"
            strokeWidth="1.8"
          />
          {/* Leaf spikes */}
          <polygon points="20,38 23,34 26,39" fill="#86efac" />
          <polygon points="40,28 43,24 46,29" fill="#86efac" />
          <polygon points="60,18 63,14 66,19" fill="#86efac" />
          {/* Clear Healing Gel Droplet */}
          <circle cx="75" cy="10" r="3.5" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
        </g>

        {/* Clean Cotton Roll Bandage */}
        <g transform="translate(50, 130)">
          <ellipse cx="25" cy="20" rx="14" ry="18" fill="#f5f2ed" stroke="#d3c7b5" strokeWidth="1.5" />
          <ellipse cx="25" cy="20" rx="8" ry="10" fill="#ffd7b5" />
          <path d="M25 2 L65 2 L65 38 L25 38 Z" fill="#f5f2ed" stroke="#d3c7b5" strokeWidth="1.5" />
          {/* Red Cross detail on bandage wrap */}
          <rect x="42" y="15" width="6" height="14" fill="#dc5c23" />
          <rect x="38" y="19" width="14" height="6" fill="#dc5c23" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="205" height="24" rx="6" fill="#361009" stroke="#dc5c23" strokeWidth="1" />
        <text x="20" y="196" fill="#ffd7b5" fontSize="9.5" fontWeight="800">
          🩹 EMERGENCY FIRST AID & TRIAGE
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#782a15" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 12. FRUIT TREE CULTIVATION & ORCHARD GRAFTING
 * Grafted avocado/mango sapling with scion tape union, wide organic root basin, fruit pods.
 */
export function FruitTreeIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ft-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ft-frame)">
        <rect width="340" height="220" fill="#f0fdf4" />

        {/* Distant Orchard Rows */}
        <g opacity="0.35">
          <circle cx="60" cy="80" r="18" fill="#15803d" />
          <line x1="60" y1="80" x2="60" y2="120" stroke="#55483a" strokeWidth="2" />
          <circle cx="120" cy="75" r="22" fill="#166534" />
          <line x1="120" y1="75" x2="120" y2="120" stroke="#55483a" strokeWidth="2" />
          <circle cx="280" cy="80" r="20" fill="#15803d" />
          <line x1="280" y1="80" x2="280" y2="120" stroke="#55483a" strokeWidth="2" />
        </g>

        {/* Ground Mulch Basin (60cm pit) */}
        <path d="M0 145 Q170 135 340 145 L340 220 L0 220 Z" fill="#782a15" />
        {/* Mulch Layer ring */}
        <path d="M80 148 Q170 140 260 148 L255 160 Q170 152 85 160 Z" fill="#d97706" stroke="#b45309" strokeWidth="1" />

        {/* Central Grafted Tree Trunk */}
        <g transform="translate(150, 40)">
          {/* Lower Rootstock Trunk */}
          <path d="M15 110 L15 65 Q18 60 25 58 L25 110 Z" fill="#55483a" stroke="#25201a" strokeWidth="1.5" />
          
          {/* Grafting Union Joint with Wax & Tape */}
          <rect x="11" y="48" width="18" height="18" rx="2" fill="#fbbf24" stroke="#782a15" strokeWidth="1.5" />
          <line x1="11" y1="54" x2="29" y2="54" stroke="#d97706" strokeWidth="1" />
          <line x1="11" y1="60" x2="29" y2="60" stroke="#d97706" strokeWidth="1" />

          {/* Upper Scion Branching Canopy */}
          <path d="M20 48 L20 20 Q10 10 5 -5" stroke="#55483a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M20 30 Q35 15 45 -2" stroke="#55483a" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Lush Tree Foliage */}
          <circle cx="5" cy="-10" r="24" fill="#15803d" stroke="#042614" strokeWidth="1.5" />
          <circle cx="45" cy="-8" r="26" fill="#166534" stroke="#042614" strokeWidth="1.5" />
          <circle cx="22" cy="-25" r="30" fill="#14532d" stroke="#042614" strokeWidth="1.8" />
          <circle cx="22" cy="-28" r="20" fill="#22c55e" />

          {/* Hanging Ripe Hass Avocados / Mangoes */}
          <g transform="translate(5, -5)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#14532d" strokeWidth="1.5" />
            <path d="M-5 8 Q0 5 5 8 Q8 18 0 20 Q-8 18 -5 8 Z" fill="#14532d" stroke="#042614" strokeWidth="1" />
          </g>
          <g transform="translate(38, -2)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#14532d" strokeWidth="1.5" />
            <path d="M-5 8 Q0 5 5 8 Q8 18 0 20 Q-8 18 -5 8 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          </g>
        </g>

        {/* Pruning Shears on left */}
        <g transform="translate(45, 120) rotate(-20)">
          <path d="M0 0 L25 15 M5 20 L30 5" stroke="#dc5c23" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M25 15 L45 8 M30 5 L45 18" stroke="#d3c7b5" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="195" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🥑 FRUIT ORCHARDS & GRAFTING
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 13. VERMICULTURE & EARTHWORM CASTING ILLUSTRATION
 * Stacked wooden/plastic vermi-bins, red wigglers, organic castings layer, vermi-tea spigot.
 */
export function VermicultureIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="vm-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#vm-frame)">
        <rect width="340" height="220" fill="#fef9ee" />

        {/* Ground */}
        <rect x="0" y="175" width="340" height="45" fill="#782a15" />
        <rect x="0" y="175" width="340" height="8" fill="#15803d" />

        {/* 3-Tier Stacked Vermiculture Bin System */}
        <g transform="translate(100, 30)">
          {/* Top Bin (Active Feeding Layer) */}
          <rect x="0" y="20" width="140" height="32" rx="4" fill="#15803d" stroke="#042614" strokeWidth="2" />
          <text x="10" y="40" fill="#dcfce7" fontSize="8" fontWeight="800">TIER 1: FRESH VEGETABLE SCRAPS</text>

          {/* Middle Bin (Working Bedding & Worms) */}
          <rect x="0" y="56" width="140" height="34" rx="4" fill="#55483a" stroke="#25201a" strokeWidth="2" />
          <text x="10" y="76" fill="#ffd7b5" fontSize="8" fontWeight="800">TIER 2: VERMICASTINGS & COCOONS</text>

          {/* Bottom Sump Bin (Liquid Vermi-Tea Collector) */}
          <rect x="0" y="94" width="140" height="34" rx="4" fill="#361009" stroke="#25201a" strokeWidth="2" />
          <text x="10" y="114" fill="#ffd7b5" fontSize="8" fontWeight="800">TIER 3: LIQUID MICROBIAL TEA</text>

          {/* Brass Spigot Tap on bottom bin */}
          <path d="M140 110 L155 110 L155 118" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Droplet of nutrient vermi-tea */}
          <circle cx="155" cy="125" r="2.5" fill="#782a15" />

          {/* Bin Support Stilts with ant water moats */}
          <line x1="15" y1="128" x2="15" y2="150" stroke="#55483a" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="15" cy="145" rx="8" ry="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />

          <line x1="125" y1="128" x2="125" y2="150" stroke="#55483a" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="125" cy="145" rx="8" ry="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
        </g>

        {/* Wiggling Earthworms (Eisenia fetida) */}
        <g transform="translate(35, 75)" stroke="#dc5c23" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M0 10 Q10 0 20 10 T40 10" />
          <path d="M5 30 Q15 20 25 30 T45 28" />
          <path d="M0 50 Q10 40 20 50 T38 48" />
        </g>

        {/* Organic Castings Jar on Right */}
        <g transform="translate(260, 105)">
          <rect x="0" y="10" width="35" height="45" rx="4" fill="#25201a" stroke="#6a5a47" strokeWidth="1.5" />
          <rect x="5" y="4" width="25" height="8" rx="2" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1" />
          <circle cx="17" cy="30" r="10" fill="#ffd7b5" />
          <text x="10" y="33" fill="#782a15" fontSize="6" fontWeight="900">100%</text>
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="190" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🪱 VERMICULTURE & WORM TEA
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 14. WATER CONSERVATION & RETENTION
 * In-situ catchment, vetiver contour hedges, check dams, and micro-catchment ponds.
 */
export function WaterConservationIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="wc-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#wc-frame)">
        <rect width="340" height="220" fill="#f0f9ff" />

        {/* Terraced Hillside Contours */}
        <path d="M0 80 L80 90 L120 120 L220 130 L260 160 L340 170 L340 220 L0 220 Z" fill="#782a15" />
        <path d="M0 80 L80 90 L120 120 L220 130 L260 160 L340 170 L340 180 L260 170 L220 140 L120 130 L80 100 L0 90 Z" fill="#15803d" />

        {/* Vetiver Grass Barrier Hedgerows on Terraces */}
        <g stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
          <path d="M80 90 L75 65 M82 90 L85 68 M85 90 L92 72" />
          <path d="M220 130 L215 105 M222 130 L225 108 M225 130 L232 112" />
        </g>

        {/* Rainwater Infiltration Basins */}
        <ellipse cx="105" cy="115" rx="15" ry="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        <ellipse cx="245" cy="155" rx="18" ry="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />

        {/* Deep Soil Water Recharge Blue Arrows */}
        <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M105 125 L105 150 M100 145 L105 150 L110 145" />
          <path d="M245 165 L245 190 M240 185 L245 190 L250 185" />
        </g>

        {/* Rainwater Barrel Catchment with Overflow Pipe on top left */}
        <g transform="translate(20, 30)">
          <rect x="0" y="10" width="28" height="38" rx="3" fill="#0369a1" stroke="#0284c7" strokeWidth="1.5" />
          <ellipse cx="14" cy="10" rx="14" ry="4" fill="#38bdf8" />
          <line x1="2" y1="22" x2="26" y2="22" stroke="#bae6fd" strokeWidth="1" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="200" height="24" rx="6" fill="#042614" stroke="#0284c7" strokeWidth="1" />
        <text x="20" y="196" fill="#bae6fd" fontSize="9.5" fontWeight="800">
          💧 WATER RETENTION & KEYLINE
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 15. DROUGHT-RESILIENT CROPS ILLUSTRATION
 * Deep-rooting Sorghum, Pearl Millet, Cassava tubers, Pigeon Pea nitrogen shrubs.
 */
export function DroughtCropsIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="dc-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#dc-frame)">
        {/* Warm Golden Dryland Sky */}
        <rect width="340" height="220" fill="#fef3c7" />

        {/* Intense Sun */}
        <circle cx="280" cy="45" r="25" fill="#f59e0b" />
        <circle cx="280" cy="45" r="35" stroke="#d97706" strokeWidth="1" strokeDasharray="4 4" />

        {/* Dryland Soil Profile */}
        <rect x="0" y="130" width="340" height="90" fill="#782a15" />
        <rect x="0" y="130" width="340" height="8" fill="#a18b6e" />

        {/* Sorghum & Pearl Millet (Tall Deep-Rooted Grains) */}
        <g transform="translate(60, 20)">
          {/* Stalk */}
          <line x1="20" y1="110" x2="20" y2="15" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M20 70 Q0 50 -10 65" stroke="#15803d" strokeWidth="2.5" fill="none" />
          <path d="M20 50 Q40 30 55 45" stroke="#15803d" strokeWidth="2.5" fill="none" />
          <path d="M20 30 Q0 15 -12 25" stroke="#15803d" strokeWidth="2" fill="none" />
          {/* Dense Grain Head (Sorghum Panicle) */}
          <ellipse cx="20" cy="15" rx="8" ry="16" fill="#dc5c23" stroke="#782a15" strokeWidth="1.5" />
          {/* Deep Taproot penetrating subsoil */}
          <path d="M20 110 Q18 140 22 170" stroke="#ffd7b5" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Cassava Plant with Underground Carbohydrate Tubers */}
        <g transform="translate(170, 50)">
          {/* Cassava Knobby Stem */}
          <line x1="20" y1="80" x2="20" y2="20" stroke="#55483a" strokeWidth="3.5" strokeLinecap="round" />
          {/* Palmate Hand-like Leaves */}
          <circle cx="20" cy="15" r="14" fill="#22c55e" stroke="#042614" strokeWidth="1.2" />
          {/* Underground Cassava Tubers radiating outwards */}
          <g transform="translate(20, 80)">
            <ellipse cx="-18" cy="15" rx="16" ry="6" fill="#933113" stroke="#361009" strokeWidth="1.2" transform="rotate(25 -18 15)" />
            <ellipse cx="18" cy="15" rx="16" ry="6" fill="#933113" stroke="#361009" strokeWidth="1.2" transform="rotate(-25 18 15)" />
            <ellipse cx="0" cy="22" rx="18" ry="6" fill="#933113" stroke="#361009" strokeWidth="1.2" transform="rotate(85 0 22)" />
          </g>
        </g>

        {/* Pigeon Pea (Nandolo) Bush */}
        <g transform="translate(250, 70)">
          <path d="M15 60 L15 25" stroke="#15803d" strokeWidth="3" />
          <circle cx="15" cy="20" r="16" fill="#166534" stroke="#042614" strokeWidth="1.2" />
          {/* Yellow blossoms */}
          <circle cx="10" cy="15" r="2.5" fill="#fbbf24" />
          <circle cx="20" cy="22" r="2.5" fill="#fbbf24" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="205" height="24" rx="6" fill="#042614" stroke="#d97706" strokeWidth="1" />
        <text x="20" y="196" fill="#fde68a" fontSize="9.5" fontWeight="800">
          🌾 DROUGHT CROPS • SORGHUM & CASSAVA
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 16. MEDICINAL & CULINARY HERBS GUILD
 * Artemisia annua, Moringa, Neem sprig, Ginger rhizome, Garlic bulbs, herb drying bundle.
 */
export function HerbsCultivationIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="hb-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#hb-frame)">
        <rect width="340" height="220" fill="#f0fdf4" />

        {/* Hanging Bundles of Herbs Drying */}
        <g transform="translate(50, 15)">
          <line x1="0" y1="5" x2="240" y2="5" stroke="#55483a" strokeWidth="2.5" />
          
          {/* Bundle 1: Rosemary / Thyme */}
          <g transform="translate(40, 5)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#782a15" strokeWidth="1.5" />
            <path d="M0 12 L-10 45 M0 12 L0 48 M0 12 L10 45" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Bundle 2: Artemisia Annua */}
          <g transform="translate(110, 5)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#782a15" strokeWidth="1.5" />
            <path d="M0 12 L-12 50 M0 12 L0 55 M0 12 L12 50" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="-5" cy="30" r="3" fill="#86efac" />
            <circle cx="6" cy="35" r="3" fill="#86efac" />
          </g>

          {/* Bundle 3: Mint / Tulsi Holy Basil */}
          <g transform="translate(180, 5)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#782a15" strokeWidth="1.5" />
            <ellipse cx="0" cy="35" rx="12" ry="20" fill="#22c55e" stroke="#042614" strokeWidth="1.2" />
          </g>
        </g>

        {/* Rustic Timber Apothecary Table */}
        <g transform="translate(30, 95)">
          <rect x="0" y="45" width="280" height="12" rx="2" fill="#6a5a47" stroke="#25201a" strokeWidth="1.5" />
          <line x1="30" y1="57" x2="30" y2="85" stroke="#55483a" strokeWidth="4" />
          <line x1="250" y1="57" x2="250" y2="85" stroke="#55483a" strokeWidth="4" />

          {/* Stone Mortar & Wooden Pestle */}
          <g transform="translate(50, 10)">
            <path d="M5 15 Q10 40 30 40 Q50 40 55 15 Z" fill="#782a15" stroke="#361009" strokeWidth="1.8" />
            <ellipse cx="30" cy="15" rx="25" ry="6" fill="#933113" stroke="#361009" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="8" y2="-8" stroke="#55483a" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* Fresh Garlic Bulbs & Cloves */}
          <g transform="translate(140, 22)">
            <ellipse cx="12" cy="15" rx="10" ry="8" fill="#fff8f3" stroke="#d3c7b5" strokeWidth="1.2" />
            <ellipse cx="28" cy="15" rx="10" ry="8" fill="#fff8f3" stroke="#d3c7b5" strokeWidth="1.2" />
            <line x1="12" y1="7" x2="12" y2="2" stroke="#a18b6e" strokeWidth="1.5" />
          </g>

          {/* Fresh Knobby Ginger Rhizome */}
          <g transform="translate(200, 20)">
            <path d="M5 20 Q0 10 15 5 Q25 0 35 10 Q45 5 50 18 Q40 25 20 22 Z" fill="#d97706" stroke="#782a15" strokeWidth="1.5" />
          </g>
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="200" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🌿 HERBAL GUILD • LOCAL & EXOTIC
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 17. COMPREHENSIVE FOOD PRESERVATION
 * Solar dehydration rack, hermetic PICS grain sack, glass fermentation crocks, cured root crops.
 */
export function FoodPreservationIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="fp-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#fp-frame)">
        <rect width="340" height="220" fill="#fef9ee" />

        {/* Solar Drying Box Cabinet on Left */}
        <g transform="translate(30, 40)">
          {/* Angled Glass Top Collector */}
          <polygon points="0,35 65,15 70,35 5,55" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
          {/* Drying Cabinet Box */}
          <rect x="5" y="35" width="65" height="55" rx="3" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.8" />
          {/* Mesh Trays Inside with Dried Fruit/Vegetable Slices */}
          <line x1="10" y1="52" x2="65" y2="52" stroke="#dc5c23" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="10" y1="70" x2="65" y2="70" stroke="#dc5c23" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>

        {/* Hermetic PICS Grain Storage Bag (Insect-Free) */}
        <g transform="translate(135, 45)">
          <path
            d="M10 85 C5 50 12 25 25 15 C38 25 45 50 40 85 Z"
            fill="#0369a1"
            stroke="#042614"
            strokeWidth="1.8"
          />
          {/* Bag Tie at top */}
          <rect x="20" y="10" width="10" height="8" rx="2" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.2" />
          <text x="18" y="50" fill="#bae6fd" fontSize="7" fontWeight="900">PICS</text>
          <text x="14" y="60" fill="#ffffff" fontSize="5.5" fontWeight="700">HERMETIC</text>
        </g>

        {/* Fermentation Glass Mason Jars on Right */}
        <g transform="translate(225, 60)">
          {/* Jar 1 */}
          <rect x="0" y="10" width="30" height="42" rx="3" fill="#dcfce7" stroke="#14532d" strokeWidth="1.5" />
          <rect x="4" y="4" width="22" height="7" rx="1.5" fill="#d97706" stroke="#782a15" strokeWidth="1" />
          {/* Fermenting vegetables & bubbles */}
          <ellipse cx="15" cy="30" rx="8" ry="12" fill="#15803d" />
          <circle cx="10" cy="20" r="1.5" fill="#22c55e" />
          <circle cx="20" cy="18" r="1.5" fill="#22c55e" />

          {/* Jar 2 */}
          <rect x="38" y="18" width="28" height="34" rx="3" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.5" />
          <rect x="42" y="12" width="20" height="7" rx="1.5" fill="#d97706" stroke="#782a15" strokeWidth="1" />
        </g>

        {/* Ground Floor */}
        <rect x="0" y="145" width="340" height="75" fill="#782a15" />

        {/* Cured Pumpkins & Sweet Potatoes */}
        <g transform="translate(185, 140)">
          <ellipse cx="25" cy="12" rx="18" ry="12" fill="#f57d42" stroke="#782a15" strokeWidth="1.5" />
          <line x1="25" y1="0" x2="25" y2="4" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Badge */}
        <rect x="12" y="180" width="210" height="24" rx="6" fill="#042614" stroke="#dc5c23" strokeWidth="1" />
        <text x="20" y="196" fill="#ffd7b5" fontSize="9.5" fontWeight="800">
          🥫 FOOD PRESERVATION & FERMENTATION
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 18. OUTPOST TECHNOLOGY & MACHINERY HANDLING
 * Solar PV array, LiFePO4 battery rack, walk-behind cultivator gear, mechanical tool set.
 */
export function OutpostTechIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ot-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ot-frame)">
        <rect width="340" height="220" fill="#f0f9ff" />

        {/* Off-Grid Lithium (LiFePO4) Battery & Inverter Cabinet */}
        <g transform="translate(35, 30)">
          {/* Metal Enclosure */}
          <rect x="0" y="0" width="85" height="110" rx="4" fill="#25201a" stroke="#55483a" strokeWidth="2" />
          
          {/* Inverter Screen & Status LEDs */}
          <rect x="10" y="12" width="65" height="22" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
          <text x="16" y="26" fill="#bae6fd" fontSize="7" fontWeight="900">48.2V • 1.8kW</text>
          <circle cx="65" cy="22" r="2.5" fill="#4ade80" />

          {/* 48V LiFePO4 Server Rack Battery Modules */}
          <rect x="10" y="42" width="65" height="18" rx="2" fill="#361009" stroke="#782a15" strokeWidth="1.2" />
          <rect x="10" y="65" width="65" height="18" rx="2" fill="#361009" stroke="#782a15" strokeWidth="1.2" />
          <rect x="10" y="88" width="65" height="18" rx="2" fill="#361009" stroke="#782a15" strokeWidth="1.2" />
          {/* Battery Terminals */}
          <circle cx="16" cy="51" r="2" fill="#dc5c23" />
          <circle cx="22" cy="51" r="2" fill="#25201a" />
          <circle cx="16" cy="74" r="2" fill="#dc5c23" />
          <circle cx="22" cy="74" r="2" fill="#25201a" />
        </g>

        {/* Homestead Machinery (Walk-Behind Tractor / Cultivator Wheel & Gear) */}
        <g transform="translate(170, 50)">
          {/* Heavy Lugged Traction Wheel */}
          <circle cx="45" cy="55" r="32" fill="#55483a" stroke="#25201a" strokeWidth="3" />
          <circle cx="45" cy="55" r="16" fill="#d3c7b5" stroke="#25201a" strokeWidth="2" />
          {/* Wheel Lugs */}
          <rect x="42" y="16" width="6" height="8" fill="#25201a" />
          <rect x="42" y="86" width="6" height="8" fill="#25201a" />
          <rect x="10" y="52" width="8" height="6" fill="#25201a" />
          <rect x="80" y="52" width="8" height="6" fill="#25201a" />

          {/* Cultivator Steel Tine Bar & Handle Frame */}
          <line x1="45" y1="55" x2="110" y2="10" stroke="#dc5c23" strokeWidth="4" strokeLinecap="round" />
          <line x1="90" y1="25" x2="115" y2="20" stroke="#25201a" strokeWidth="4" strokeLinecap="round" />
          <path d="M25 75 L15 105 L5 98" stroke="#6a5a47" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Precision Mechanical Tools (Wrench & Digital Multimeter) */}
        <g transform="translate(40, 148)">
          {/* Wrench */}
          <path d="M0 8 L35 8 L45 0 L52 7 L42 16 L0 16 Z" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1.2" />
        </g>

        {/* Ground */}
        <rect x="0" y="168" width="340" height="52" fill="#782a15" />

        {/* Badge */}
        <rect x="12" y="180" width="220" height="24" rx="6" fill="#042614" stroke="#38bdf8" strokeWidth="1" />
        <text x="20" y="196" fill="#bae6fd" fontSize="9.5" fontWeight="800">
          ⚙️ OUTPOST MACHINERY & SOLAR TECH
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 19. INSECT HANDLING & BIOCONTROL
 * Kenyan Top-Bar Beehive, Honeybee workers, Neem/Tephrosia spray bottle, beneficial ladybugs.
 */
export function InsectHandlingIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ih-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ih-frame)">
        <rect width="340" height="220" fill="#fef9ee" />

        {/* Kenyan Top-Bar Beehive suspended between trees */}
        <g transform="translate(60, 45)">
          {/* Suspension wires (ant defense) */}
          <line x1="30" y1="-25" x2="30" y2="10" stroke="#6a5a47" strokeWidth="1.5" />
          <line x1="120" y1="-25" x2="120" y2="10" stroke="#6a5a47" strokeWidth="1.5" />

          {/* Trapezoidal Hive Body */}
          <polygon points="10,10 140,10 120,65 30,65" fill="#ffd7b5" stroke="#782a15" strokeWidth="2" />
          {/* Top Bars */}
          <rect x="5" y="5" width="140" height="8" rx="2" fill="#d97706" stroke="#782a15" strokeWidth="1.5" />
          {/* Entrance Flight Holes */}
          <circle cx="70" cy="40" r="3" fill="#361009" />
          <circle cx="80" cy="40" r="3" fill="#361009" />

          {/* Flying Honeybees */}
          <g transform="translate(95, 20)">
            <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#fbbf24" stroke="#782a15" strokeWidth="0.8" />
            <path d="M-2 -2 Q0 -6 3 -3" stroke="#bae6fd" strokeWidth="1" fill="none" />
          </g>
          <g transform="translate(115, 35)">
            <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#fbbf24" stroke="#782a15" strokeWidth="0.8" />
            <path d="M-2 -2 Q0 -6 3 -3" stroke="#bae6fd" strokeWidth="1" fill="none" />
          </g>
        </g>

        {/* Botanical Pest Spray Bottle (Neem & Tephrosia extract) */}
        <g transform="translate(235, 60)">
          {/* Spray Body */}
          <path d="M10 28 L32 28 L36 75 L6 75 Z" fill="#15803d" stroke="#042614" strokeWidth="1.8" />
          {/* Trigger Head */}
          <rect x="14" y="16" width="14" height="12" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.2" />
          <path d="M8 20 L28 14 L28 24 Z" fill="#dc5c23" stroke="#782a15" strokeWidth="1.2" />
          <line x1="8" y1="20" x2="2" y2="20" stroke="#782a15" strokeWidth="2" strokeLinecap="round" />
          {/* Fine Botanical Mist */}
          <g stroke="#86efac" strokeWidth="1" strokeDasharray="2 2">
            <line x1="2" y1="20" x2="-20" y2="10" />
            <line x1="2" y1="20" x2="-25" y2="20" />
            <line x1="2" y1="20" x2="-20" y2="30" />
          </g>
        </g>

        {/* Beneficial Ladybug on Leaf */}
        <g transform="translate(30, 115)">
          <path d="M0 25 Q30 5 60 15 Q35 35 0 25 Z" fill="#22c55e" stroke="#042614" strokeWidth="1.5" />
          {/* Ladybug */}
          <ellipse cx="32" cy="18" rx="6" ry="5" fill="#dc5c23" stroke="#361009" strokeWidth="1" />
          <circle cx="30" cy="16" r="1" fill="#25201a" />
          <circle cx="34" cy="19" r="1" fill="#25201a" />
        </g>

        {/* Ground */}
        <rect x="0" y="155" width="340" height="65" fill="#782a15" />

        {/* Badge */}
        <rect x="12" y="180" width="200" height="24" rx="6" fill="#042614" stroke="#fbbf24" strokeWidth="1" />
        <text x="20" y="196" fill="#fde68a" fontSize="9.5" fontWeight="800">
          🐝 INSECT GUILD & BEEKEEPING
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 20. ORGANIC DISEASE HANDLING & PLANT PATHOLOGY
 * Blight diagnostics, copper bio-spray, healthy vs diseased leaf comparison, microbial balance.
 */
export function DiseaseHandlingIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="dh-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#dh-frame)">
        <rect width="340" height="220" fill="#fff8f3" />

        {/* Comparative Diagnostic Split View */}
        {/* Left: Diseased Blight-Struck Tomato Leaf */}
        <g transform="translate(60, 40)">
          <path
            d="M0 60 Q20 20 60 10 Q65 40 40 70 Z"
            fill="#55483a"
            stroke="#25201a"
            strokeWidth="1.8"
          />
          {/* Necrotic Blight Lesions & Yellow Halo */}
          <ellipse cx="25" cy="40" rx="8" ry="6" fill="#25201a" stroke="#fbbf24" strokeWidth="1.5" />
          <ellipse cx="45" cy="25" rx="6" ry="4" fill="#25201a" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="5" y="85" fill="#782a15" fontSize="8" fontWeight="900">DISEASED / BLIGHT</text>
        </g>

        {/* Center Divider Arrow (Cured through Bio-Sanitation) */}
        <g transform="translate(155, 60)" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M0 20 L25 20 M18 12 L25 20 L18 28" />
        </g>

        {/* Right: Healthy Resilient Leaf protected by Wood Ash & Trichoderma */}
        <g transform="translate(200, 40)">
          <path
            d="M0 60 Q20 20 60 10 Q65 40 40 70 Z"
            fill="#15803d"
            stroke="#042614"
            strokeWidth="1.8"
          />
          {/* Vibrant healthy veins */}
          <path d="M0 60 Q30 35 60 10" stroke="#86efac" strokeWidth="1.5" fill="none" />
          <path d="M20 45 Q35 48 45 42" stroke="#86efac" strokeWidth="1.2" fill="none" />
          <path d="M35 32 Q45 32 52 24" stroke="#86efac" strokeWidth="1.2" fill="none" />
          <text x="5" y="85" fill="#14532d" fontSize="8" fontWeight="900">HEALTHY / PROTECTED</text>
        </g>

        {/* Organic Bio-Fungicide Vessel (Bordeaux Mix / Wood Ash slurry) */}
        <g transform="translate(135, 115)">
          <path d="M10 20 Q15 45 35 45 Q55 45 60 20 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.8" />
          <ellipse cx="35" cy="20" rx="25" ry="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.2" />
          <text x="18" y="36" fill="#ffffff" fontSize="6.5" fontWeight="900">BIO-CURE</text>
        </g>

        {/* Ground */}
        <rect x="0" y="165" width="340" height="55" fill="#782a15" />

        {/* Badge */}
        <rect x="12" y="180" width="205" height="24" rx="6" fill="#361009" stroke="#dc5c23" strokeWidth="1" />
        <text x="20" y="196" fill="#ffd7b5" fontSize="9.5" fontWeight="800">
          🔬 PLANT PATHOLOGY & BLIGHT CURE
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#782a15" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 21. IN-DEPTH SOIL SCIENCE & PEDOLOGY
 * Soil texture ribbon test, jar sedimentation analysis, pH color chart, cation exchange minerals.
 */
export function SoilScienceIllustration({
  className = 'w-full h-auto',
  width = 340,
  height = 220,
  ...props
}: CountryIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ssci-frame">
          <rect width="340" height="220" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#ssci-frame)">
        <rect width="340" height="220" fill="#fef9ee" />

        {/* Soil Sedimentation Jar Test on Left */}
        <g transform="translate(35, 30)">
          {/* Glass Jar */}
          <rect x="0" y="10" width="45" height="85" rx="4" fill="#ffffff" stroke="#6a5a47" strokeWidth="2" />
          <rect x="8" y="2" width="29" height="10" rx="2" fill="#d3c7b5" stroke="#6a5a47" strokeWidth="1.5" />

          {/* Settled Soil Layers */}
          {/* Sand (Bottom 40%) */}
          <rect x="2" y="65" width="41" height="28" fill="#d3c7b5" />
          <circle cx="15" cy="75" r="1.5" fill="#6a5a47" />
          <circle cx="30" cy="80" r="1.5" fill="#6a5a47" />
          <text x="50" y="80" fill="#55483a" fontSize="6.5" fontWeight="800">SAND (40%)</text>

          {/* Silt (Middle 35%) */}
          <rect x="2" y="40" width="41" height="25" fill="#933113" />
          <text x="50" y="55" fill="#782a15" fontSize="6.5" fontWeight="800">SILT (35%)</text>

          {/* Clay (Top 25%) */}
          <rect x="2" y="22" width="41" height="18" fill="#dc5c23" />
          <text x="50" y="32" fill="#dc5c23" fontSize="6.5" fontWeight="800">CLAY (25%)</text>

          {/* Water Column & Floating Humus */}
          <rect x="2" y="12" width="41" height="10" fill="#bae6fd" opacity="0.6" />
          <ellipse cx="22" cy="14" rx="12" ry="2" fill="#14532d" />
        </g>

        {/* Field Ribbon Test Hand & Soil Ball in Center */}
        <g transform="translate(170, 45)">
          {/* Artisan Hand Silhouette */}
          <path d="M0 45 Q20 30 50 35 L50 65 Q20 70 0 60 Z" fill="#ffd7b5" stroke="#782a15" strokeWidth="1.5" />
          {/* Cohesive Clay Ribbon Extrusion (5cm long = high clay Katondo) */}
          <path d="M48 40 Q75 38 90 55" stroke="#933113" strokeWidth="7" strokeLinecap="round" fill="none" />
          <text x="15" y="85" fill="#782a15" fontSize="7.5" fontWeight="900">RIBBON TEST: 5cm</text>
        </g>

        {/* pH Chemistry Indicator Scale on Right */}
        <g transform="translate(280, 30)">
          <rect x="0" y="0" width="22" height="12" fill="#b94218" />
          <text x="26" y="9" fill="#782a15" fontSize="6.5" fontWeight="800">pH 4.5</text>
          <rect x="0" y="14" width="22" height="12" fill="#d97706" />
          <text x="26" y="23" fill="#b45309" fontSize="6.5" fontWeight="800">pH 5.5</text>
          <rect x="0" y="28" width="22" height="12" fill="#15803d" />
          <text x="26" y="37" fill="#14532d" fontSize="6.5" fontWeight="900">pH 6.5 ★</text>
          <rect x="0" y="42" width="22" height="12" fill="#0284c7" />
          <text x="26" y="51" fill="#0369a1" fontSize="6.5" fontWeight="800">pH 7.5</text>
        </g>

        {/* Ground */}
        <rect x="0" y="155" width="340" height="65" fill="#782a15" />

        {/* Badge */}
        <rect x="12" y="180" width="210" height="24" rx="6" fill="#042614" stroke="#16a34a" strokeWidth="1" />
        <text x="20" y="196" fill="#86efac" fontSize="9.5" fontWeight="800">
          🔬 SOIL SCIENCE & PEDOLOGY MATRIX
        </text>

        <rect x="1" y="1" width="338" height="218" rx="15" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

/**
 * 22. DYNAMIC ICON DISPATCHER
 * Allows rendering any country illustration by key name with standard props.
 */
export type CountryIconName =
  | 'scene'
  | 'homestead'
  | 'soil'
  | 'borehole'
  | 'swale'
  | 'granary'
  | 'apothecary'
  | 'lake'
  | 'sabbath'
  | 'compost'
  | 'firstaid'
  | 'fruittree'
  | 'vermiculture'
  | 'waterconservation'
  | 'droughtcrops'
  | 'herbs'
  | 'foodpreservation'
  | 'outposttech'
  | 'insects'
  | 'diseases'
  | 'soilscience';

export interface CountryIconDispatcherProps extends CountryIllustrationProps {
  name: CountryIconName;
}

export function CountryIcon({ name, ...props }: CountryIconDispatcherProps) {
  switch (name) {
    case 'scene':
    case 'homestead':
      return <CountryScene {...props} />;
    case 'soil':
      return <SoilStrataIllustration {...props} />;
    case 'borehole':
      return <SolarBoreholeIllustration {...props} />;
    case 'swale':
      return <PermacultureSwaleIllustration {...props} />;
    case 'granary':
      return <GranaryStorageIllustration {...props} />;
    case 'apothecary':
      return <HerbalApothecaryIllustration {...props} />;
    case 'lake':
      return <LakeMalawiIllustration {...props} />;
    case 'sabbath':
      return <SabbathSanctuaryIllustration {...props} />;
    case 'compost':
      return <CompostIllustration {...props} />;
    case 'firstaid':
      return <FirstAidIllustration {...props} />;
    case 'fruittree':
      return <FruitTreeIllustration {...props} />;
    case 'vermiculture':
      return <VermicultureIllustration {...props} />;
    case 'waterconservation':
      return <WaterConservationIllustration {...props} />;
    case 'droughtcrops':
      return <DroughtCropsIllustration {...props} />;
    case 'herbs':
      return <HerbsCultivationIllustration {...props} />;
    case 'foodpreservation':
      return <FoodPreservationIllustration {...props} />;
    case 'outposttech':
      return <OutpostTechIllustration {...props} />;
    case 'insects':
      return <InsectHandlingIllustration {...props} />;
    case 'diseases':
      return <DiseaseHandlingIllustration {...props} />;
    case 'soilscience':
      return <SoilScienceIllustration {...props} />;
    default:
      return <CountryScene {...props} />;
  }
}

