import React from 'react';

export type SceneryTheme = 'highlands' | 'waters' | 'sanctuary';

export interface HomeSceneryBackgroundProps {
  activeScene?: SceneryTheme;
  variant?: 'hero' | 'page';
  className?: string;
  hideSizer?: boolean;
}

interface LandscapePaletteConfig {
  skyTop: string;
  skyMid: string;
  skyCoral: string;
  skyHorizon: string;
  sunCore: string;
  sunHalo: string;
  sunAtmosphere: string;
  distantPeak: string;
  distantPeakRidge: string;
  midMountainFar: string;
  midMountainNear: string;
  mistColor: string;
  lakeWaterTop: string;
  lakeWaterBottom: string;
  lakeShimmer: string;
  terraceHill: string;
  terraceStripe: string;
  soilBerm: string;
  foregroundFoliage: string;
  foregroundAccent: string;
  roofTile: string;
  roofRidge: string;
  cedarWood: string;
  stoneMasonry: string;
}

/**
 * Authentic Malawian Highland Dawn Palette — Enhanced Visibility & Vibrancy
 * Natural, luminous sunrise with live animated rising sun.
 * All surface highlights, water reflections, and cast shadows strictly
 * emanate from the rising sun at the eastern mountain horizon.
 */
const CANONICAL_MALAWI_LANDSCAPE: LandscapePaletteConfig = {
  skyTop: '#0B1E36',
  skyMid: '#1D3B64',
  skyCoral: '#C2410C',
  skyHorizon: '#F97316',
  sunCore: '#FFFFFF',
  sunHalo: '#F59E0B',
  sunAtmosphere: 'rgba(251, 191, 36, 0.40)',
  distantPeak: '#1E293B',
  distantPeakRidge: '#475569',
  midMountainFar: '#14532D',
  midMountainNear: '#166534',
  mistColor: 'rgba(254, 243, 199, 0.35)',
  lakeWaterTop: '#0284C7',
  lakeWaterBottom: '#075985',
  lakeShimmer: '#FEF08A',
  terraceHill: '#15803D',
  terraceStripe: '#4ADE80',
  soilBerm: '#B45309',
  foregroundFoliage: '#14532D',
  foregroundAccent: '#22C55E',
  roofTile: '#EA580C',
  roofRidge: '#FDE047',
  cedarWood: '#78350F',
  stoneMasonry: '#57534E',
};

export function HomeSceneryBackground({
  activeScene = 'highlands',
  variant = 'hero',
  className = '',
  hideSizer = false,
}: HomeSceneryBackgroundProps) {
  const c = CANONICAL_MALAWI_LANDSCAPE;
  const uid = React.useId().replace(/:/g, '');

  // Rising Sun Coordinates (Positioned in the open mountain saddle vista between hero left text and right sizer deck)
  const sunCenterX =
    activeScene === 'waters' ? 940 : activeScene === 'sanctuary' ? 1010 : 970;
  const sunCenterY = activeScene === 'waters' ? 268 : 252;

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover transition-all duration-700"
      >
        <defs>
          {/* Panoramic Dawn Sky Gradient (Deep Twilight to Luminous Amber Horizon) */}
          <linearGradient id={`sky-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c.skyTop} />
            <stop offset="30%" stopColor={c.skyMid} />
            <stop offset="60%" stopColor={c.skyCoral} />
            <stop offset="80%" stopColor={c.skyHorizon} />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.99" />
          </linearGradient>

          {/* Living Atmospheric Solar Bloom at the Mountain Horizon */}
          <radialGradient
            id={`sun-glow-core-${uid}`}
            cx={sunCenterX}
            cy={sunCenterY}
            r="460"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={c.sunCore} stopOpacity="1" />
            <stop offset="18%" stopColor="#FFF8D6" stopOpacity="0.92" />
            <stop offset="38%" stopColor="#FDE047" stopOpacity="0.65" />
            <stop offset="62%" stopColor="#F59E0B" stopOpacity="0.30" />
            <stop offset="82%" stopColor="#D97706" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Broad Ambient Sunrise Horizon Haze along the Mountain Saddle */}
          <radialGradient
            id={`sun-atmosphere-broad-${uid}`}
            cx={sunCenterX}
            cy={sunCenterY + 20}
            r="750"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.42" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#D97706" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#9A3412" stopOpacity="0" />
          </radialGradient>

          {/* Natural Horizontal Dawn Horizon Flare */}
          <linearGradient id={`sun-horizon-flare-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="25%" stopColor="#FDE047" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#FFFDF5" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#FDE047" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Mount Mulanje Granite Massif Shading — Enhanced Violet-Slate to Emerald Contrast */}
          <linearGradient id={`mulanje-base-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#253549" stopOpacity="1" />
            <stop offset="45%" stopColor="#1E293B" stopOpacity="1" />
            <stop offset="80%" stopColor="#14532D" stopOpacity="1" />
            <stop offset="100%" stopColor="#0F381E" stopOpacity="1" />
          </linearGradient>

          {/* Sunlit Granite Facets Facing Toward the Sunrise (East-facing slopes) */}
          <linearGradient id={`mulanje-sunlit-east-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#FDE047" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.65" />
            <stop offset="80%" stopColor="#34D399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#065F46" stopOpacity="0.25" />
          </linearGradient>

          {/* Sunlit Granite Facets Facing West (For peaks to the right of the sun) */}
          <linearGradient id={`mulanje-sunlit-west-${uid}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.90" />
            <stop offset="28%" stopColor="#FDE047" stopOpacity="0.80" />
            <stop offset="65%" stopColor="#D97706" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#15803D" stopOpacity="0.25" />
          </linearGradient>

          {/* Deep Granite Crevasses & Ruo Gorge Shadows */}
          <linearGradient id={`mulanje-cleft-shadow-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B132B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.40" />
          </linearGradient>

          {/* Mountain Waterfalls (Lichenya & Ruo Cascades) */}
          <linearGradient id={`falls-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#E0F2FE" stopOpacity="0.90" />
            <stop offset="85%" stopColor="#BAE6FD" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.60" />
          </linearGradient>

          {/* Mountain Gorge Swirling Cloud Mist */}
          <linearGradient id={`mist-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFBEB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
          </linearGradient>

          {/* Lake Malawi Clear Azure Depth */}
          <linearGradient id={`lake-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="70%" stopColor="#0E7490" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>

          {/* Lake Malawi Dawn Sun Reflection Glade */}
          <radialGradient
            id={`lake-glade-${uid}`}
            cx={sunCenterX}
            cy="580"
            rx="160"
            ry="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.90" />
            <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          {/* Terraced Tea Hill Green Gradient */}
          <linearGradient id={`terrace-slope-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>

          {/* Front Agroforestry Promontory Gradient */}
          <linearGradient id={`foreground-promontory-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="45%" stopColor="#14532D" />
            <stop offset="100%" stopColor="#0F381E" />
          </linearGradient>

          {/* Homestead Terracotta Roof Sunlit Gradient */}
          <linearGradient id={`roof-sunlit-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* Off-Grid Solar PV Glass Specular Glint */}
          <linearGradient id={`solar-sheen-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#0284C7" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#03436A" stopOpacity="0.95" />
          </linearGradient>

          {/* Gentle Editorial Scrim (Enhanced visibility: light feathered gradient so scenery pops) */}
          <linearGradient id={`left-scrim-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#020805" stopOpacity="0.28" />
            <stop offset="25%" stopColor="#020805" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#020805" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#020805" stopOpacity="0" />
          </linearGradient>

          {/* Mobile/Compact Protective Gradient */}
          <linearGradient id={`mobile-vertical-scrim-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020805" stopOpacity="0.10" />
            <stop offset="60%" stopColor="#020805" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#020805" stopOpacity="0.55" />
          </linearGradient>

          {/* Bottom Ground Transition Vignette */}
          <linearGradient id={`bottom-vignette-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020A05" stopOpacity="0" />
            <stop offset="70%" stopColor="#020A05" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#020A05" stopOpacity="0.65" />
          </linearGradient>

          {/* Living Scenery & Rising Sun Animations */}
          <style>{`
            /* ANIMATED RISING SUN: Majestic Dawn Ascent & Radiant Solar Expansion */
            @keyframes scenerySunAscent {
              0% {
                transform: translate(${sunCenterX}px, ${sunCenterY + 48}px) scale(0.92);
              }
              22% {
                transform: translate(${sunCenterX}px, ${sunCenterY - 26}px) scale(1.08);
              }
              38% {
                transform: translate(${sunCenterX}px, ${sunCenterY - 32}px) scale(1.10);
              }
              60% {
                transform: translate(${sunCenterX}px, ${sunCenterY - 28}px) scale(1.08);
              }
              80% {
                transform: translate(${sunCenterX}px, ${sunCenterY - 20}px) scale(1.05);
              }
              100% {
                transform: translate(${sunCenterX}px, ${sunCenterY + 48}px) scale(0.92);
              }
            }

            @keyframes scenerySunRaysRotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            @keyframes sceneryCoronaPulse {
              0%, 100% {
                opacity: 0.35;
                transform: scale(0.94);
              }
              50% {
                opacity: 0.85;
                transform: scale(1.20);
              }
            }

            @keyframes sceneryCoreGlow {
              0%, 100% {
                transform: scale(0.96);
                filter: drop-shadow(0 0 16px rgba(254, 240, 138, 0.75));
              }
              50% {
                transform: scale(1.06);
                filter: drop-shadow(0 0 34px rgba(254, 240, 138, 1));
              }
            }

            @keyframes sceneryHorizonFlare {
              0%, 100% {
                opacity: 0.45;
                transform: scaleX(0.88);
              }
              50% {
                opacity: 0.95;
                transform: scaleX(1.22);
              }
            }

            @keyframes sceneryWaterGladeShimmer {
              0%, 100% {
                opacity: 0.65;
                transform: scaleX(0.94);
              }
              50% {
                opacity: 1;
                transform: scaleX(1.10);
              }
            }

            @keyframes sceneryStarTwinkle {
              0%, 100% {
                opacity: 0.30;
                transform: scale(0.85);
              }
              50% {
                opacity: 1;
                transform: scale(1.3);
              }
            }

            @keyframes sceneryCloudFloat {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(45px); }
            }

            @keyframes sceneryEagleDrift {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(32px, -14px); }
            }

            @keyframes sceneryChimneySmoke {
              0% { opacity: 0.80; transform: translate(0, 0) scale(1); }
              50% { opacity: 0.45; transform: translate(16px, -24px) scale(1.4); }
              100% { opacity: 0; transform: translate(32px, -48px) scale(2.0); }
            }

            /* Animation Class Bindings */
            .anim-rising-sun-ascent {
              animation: scenerySunAscent 28s ease-in-out infinite;
              transform-origin: ${sunCenterX}px ${sunCenterY}px;
            }
            .anim-sun-rays {
              animation: scenerySunRaysRotate 50s linear infinite;
              transform-origin: 0px 0px;
            }
            .anim-corona-pulse {
              animation: sceneryCoronaPulse 7s ease-in-out infinite;
              transform-origin: 0px 0px;
            }
            .anim-core-glow {
              animation: sceneryCoreGlow 5s ease-in-out infinite;
              transform-origin: 0px 0px;
            }
            .anim-horizon-flare {
              animation: sceneryHorizonFlare 6s ease-in-out infinite;
              transform-origin: ${sunCenterX}px ${sunCenterY + 16}px;
            }
            .anim-water-glade {
              animation: sceneryWaterGladeShimmer 3.5s ease-in-out infinite;
              transform-origin: ${sunCenterX}px 580px;
            }
            .anim-star-1 {
              animation: sceneryStarTwinkle 4s ease-in-out infinite;
              transform-origin: center;
            }
            .anim-star-2 {
              animation: sceneryStarTwinkle 5.5s ease-in-out infinite 1.5s;
              transform-origin: center;
            }
            .anim-scenery-cloud {
              animation: sceneryCloudFloat 35s ease-in-out infinite;
            }
            .anim-scenery-eagles {
              animation: sceneryEagleDrift 14s ease-in-out infinite;
            }
            .anim-scenery-smoke {
              animation: sceneryChimneySmoke 5s ease-in-out infinite;
              transform-origin: 1067px 555px;
            }

            @media (prefers-reduced-motion: reduce) {
              .anim-rising-sun-ascent,
              .anim-sun-rays,
              .anim-corona-pulse,
              .anim-core-glow,
              .anim-horizon-flare,
              .anim-water-glade,
              .anim-star-1,
              .anim-star-2,
              .anim-scenery-cloud,
              .anim-scenery-eagles,
              .anim-scenery-smoke {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        {/* =================================================================
            1. SKY CANVAS & TWINKLING SOUTHERN CROSS STARS
        ================================================================= */}
        <rect width="1600" height="900" fill={`url(#sky-${uid})`} />

        {/* Broad Ambient Sunrise Horizon Haze */}
        <rect width="1600" height="900" fill={`url(#sun-atmosphere-broad-${uid})`} />

        {/* Southern Cross Constellation & Morning Twilight Stars in Deep Sky */}
        <g opacity="0.95">
          <circle cx="280" cy="72" r="2.5" fill={c.sunCore} className="anim-star-1" />
          <circle cx="282" cy="125" r="2.3" fill={c.sunCore} className="anim-star-2" />
          <circle cx="255" cy="98" r="2.1" fill={c.sunCore} className="anim-star-1" />
          <circle cx="308" cy="96" r="2.0" fill={c.sunCore} className="anim-star-2" />
          <circle cx="294" cy="112" r="1.5" fill={c.sunCore} opacity="0.80" />
          <line x1="280" y1="72" x2="282" y2="125" stroke={c.sunCore} strokeWidth="0.8" opacity="0.35" />
          <line x1="255" y1="98" x2="308" y2="96" stroke={c.sunCore} strokeWidth="0.8" opacity="0.35" />
          <circle cx="355" cy="115" r="2.4" fill={c.sunCore} className="anim-star-1" />
          <circle cx="388" cy="128" r="2.1" fill={c.sunCore} className="anim-star-2" />
          {[
            [140, 58, 1.8],
            [480, 85, 1.6],
            [640, 48, 1.5],
            [790, 92, 1.9],
            [940, 62, 2.2],
            [1380, 75, 1.9],
            [1480, 52, 2.2],
          ].map(([cx, cy, r], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r}
              fill={c.sunCore}
              className={idx % 2 === 0 ? 'anim-star-1' : 'anim-star-2'}
            />
          ))}
        </g>

        {/* Cirrus & Alto-Cumulus Morning Clouds Catching Solar Underlighting */}
        <g opacity="0.65" fill="#FFFBEB" className="anim-scenery-cloud">
          <path d="M70,135 Q250,110 430,135 Q280,150 70,135 Z" />
          <path d="M540,98 Q740,74 940,98 Q770,112 540,98 Z" />
          <path d="M1120,115 Q1300,92 1490,115 Q1330,130 1120,115 Z" />
          {/* Lower dawn gold cloud shelf */}
          <path d="M220,180 Q420,165 600,180 Q430,192 220,180 Z" fill="#FDE047" opacity="0.55" />
          <path d="M1250,170 Q1400,156 1560,170 Q1410,182 1250,170 Z" fill="#FDE047" opacity="0.55" />
        </g>

        {/* =================================================================
            2. ANIMATED RISING SUN
            Crowning the eastern mountain saddle with living dawn ascent,
            rotating corona rays, expanding chromosphere, and horizon flare.
        ================================================================= */}
        {/* Soft Radial Atmospheric Solar Bloom */}
        <rect width="1600" height="900" fill={`url(#sun-glow-core-${uid})`} />

        {/* Dynamic Horizontal Horizon Dawn Flare */}
        <ellipse
          cx={sunCenterX}
          cy={sunCenterY + 16}
          rx="380"
          ry="16"
          fill={`url(#sun-horizon-flare-${uid})`}
          className="anim-horizon-flare"
        />

        {/* The Animated Rising Sun Group (Ascending, Chromospheric Pulse & Core Disc) */}
        <g className="anim-rising-sun-ascent">
          {/* Rotating Soft Golden Sunburst Corona Rays */}
          <g className="anim-sun-rays">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * Math.PI) / 8;
              const x2 = Math.cos(angle) * 165;
              const y2 = Math.sin(angle) * 165;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  stroke="#FDE047"
                  strokeWidth={i % 2 === 0 ? '2.5' : '1.4'}
                  strokeDasharray="18 12"
                  opacity={i % 2 === 0 ? '0.45' : '0.25'}
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {/* Outermost breathing solar corona */}
          <circle r="148" fill={c.sunHalo} className="anim-corona-pulse" />
          {/* Mid solar atmosphere */}
          <circle r="96" fill="#FDE047" opacity="0.45" className="anim-corona-pulse" />
          {/* Chromosphere golden core */}
          <circle r="62" fill="#FEF08A" opacity="0.80" className="anim-core-glow" />
          {/* Blinding celestial solar core */}
          <circle r="42" fill={c.sunCore} opacity="0.99" className="anim-core-glow" />
        </g>

        {/* =================================================================
            3. DISTANT MOUNT MULANJE MASSIF (SAPITWA PEAK 3,002m & CHAMBE BASIN)
            Geological Realism: Monolithic granite inselberg batholith with
            sheer cliffs, jointed vertical rock crevasses, and chiseled facets.
        ================================================================= */}
        <g opacity="1">
          {/* Main Granite Massif Silhouette */}
          <path
            d="M-50,560 
               L50,445 Q110,405 170,385 
               L270,305 Q330,245 385,235 
               L435,280 Q505,205 555,190 
               L635,260 Q705,315 765,345 
               L865,390 Q935,335 995,320 
               L1075,355 Q1155,275 1215,260 
               L1305,210 Q1365,180 1415,240 
               L1505,330 Q1575,385 1650,435 
               L1650,750 L-50,750 Z"
            fill={`url(#mulanje-base-${uid})`}
          />

          {/* Geological Fault Lines & Vertical Granite Joint Crevices */}
          <g stroke="#0F172A" strokeWidth="1.6" opacity="0.90" fill="none">
            <path d="M385,235 L395,310 L410,420" />
            <path d="M555,190 L570,290 L560,440" />
            <path d="M765,345 L750,430 L760,490" />
            <path d="M995,320 L1010,400 L980,480" />
            <path d="M1215,260 L1230,340 L1220,440" />
            <path d="M1365,180 L1350,280 L1370,430" />
          </g>

          {/* Chiseled Granite Facets strictly lit by the Rising Sun:
              - Left of the sun (x < 1120): East-facing facets face the sun and glow with warm light
              - Right of the sun (x > 1120): West-facing facets face the sun and catch morning light
          */}
          {/* Peak 1: Chambe West Buttress (385, 235) — East face lit */}
          <polygon points="385,235 435,280 405,455 335,415" fill={`url(#mulanje-sunlit-east-${uid})`} />
          <polygon points="385,235 335,415 310,425" fill={`url(#mulanje-cleft-shadow-${uid})`} />

          {/* Peak 2: Sapitwa Main Summit (555, 190, 3,002m) — East chiseled face lit */}
          <polygon points="555,190 635,260 600,475 515,435" fill={`url(#mulanje-sunlit-east-${uid})`} />
          <polygon points="555,190 515,435 480,445" fill={`url(#mulanje-cleft-shadow-${uid})`} />

          {/* Peak 3: Central Saddle Gorge (995, 320) — East face lit */}
          <polygon points="995,320 1075,355 1035,505 945,475" fill={`url(#mulanje-sunlit-east-${uid})`} />
          <polygon points="995,320 945,475 920,485" fill={`url(#mulanje-cleft-shadow-${uid})`} />

          {/* Peak 4: Eastern Escarpment (1305, 210 to 1415, 240) — West face catches morning sun */}
          <polygon points="1305,210 1415,240 1365,485 1265,445" fill={`url(#mulanje-sunlit-west-${uid})`} />
          <polygon points="1415,240 1505,330 1460,490 1365,485" fill={`url(#mulanje-cleft-shadow-${uid})`} />

          {/* Twin Highland Waterfalls (Lichenya & Ruo Gorges) cascading down the granite face */}
          <path d="M558,235 Q568,335 552,445 L564,445 Q580,335 570,235 Z" fill={`url(#falls-${uid})`} />
          <path d="M1312,255 Q1302,345 1315,440 L1324,440 Q1309,345 1320,255 Z" fill={`url(#falls-${uid})`} />

          {/* Waterfall Aerated Spray Mist at Gorge Base Pools */}
          <ellipse cx="558" cy="446" rx="32" ry="11" fill={c.mistColor} opacity="0.90" />
          <ellipse cx="1319" cy="441" rx="28" ry="10" fill={c.mistColor} opacity="0.85" />
        </g>

        {/* High-Altitude Mountain Cloud Ribbon Swirling Through the Gorges */}
        <rect x="0" y="380" width="1600" height="85" fill={`url(#mist-${uid})`} />

        {/* =================================================================
            4. MID-RANGE PLATEAU RIDGES & LAKE MALAWI (THE LAKE OF STARS)
            Realism: Graduated lake depth, directionally coherent sun shimmer
            glade along the line of sight to the rising sun, and authentic
            Malawian lateen dhow (mbwato) with wake ripples.
        ================================================================= */}
        <g opacity="1">
          {/* Distant Escarpment Ridge (Deep Highland Forest) */}
          <path d="M-50,575 Q160,425 360,475 T760,440 T1160,465 T1650,415 L1650,780 L-50,780 Z" fill={c.midMountainFar} />
          {/* Near Escarpment Ridge (Rich Forest Emerald) */}
          <path d="M-50,615 Q240,485 510,535 T1000,510 T1410,485 T1650,515 L1650,810 L-50,810 Z" fill={c.midMountainNear} />

          {/* Evergreen Pine & Cedar Groves on the Mid-Ridge */}
          {[
            [180, 485, 0.65],
            [210, 492, 0.55],
            [240, 488, 0.60],
            [710, 465, 0.55],
            [735, 460, 0.65],
            [760, 468, 0.50],
            [1220, 482, 0.65],
            [1245, 476, 0.75],
            [1275, 484, 0.60],
            [1460, 498, 0.70],
          ].map(([tx, ty, scale], idx) => (
            <polygon
              key={idx}
              points="16,0 0,36 32,36"
              transform={`translate(${tx}, ${ty}) scale(${scale})`}
              fill="#0F381E"
            />
          ))}

          {/* Lake Malawi Shoreline & Sparkling Rift Water Surface */}
          <path
            d="M280,560 Q480,530 720,545 T1180,535 T1580,555 L1650,685 L220,685 Z"
            fill={`url(#lake-${uid})`}
          />

          {/* Shoreline Sandy Edge Highlight */}
          <path
            d="M280,560 Q480,530 720,545 T1180,535 T1580,555"
            stroke="#FDE68A"
            strokeWidth="1.8"
            fill="none"
            opacity="0.80"
          />

          {/* Solar Shimmer Reflection Glade strictly aligned with the Rising Sun */}
          <g className="anim-water-glade">
            <ellipse
              cx={sunCenterX}
              cy="580"
              rx="155"
              ry="28"
              fill={`url(#lake-glade-${uid})`}
            />
            {/* Shimmer Rhythms (Ripples reflecting golden dawn) */}
            {[
              [sunCenterX - 50, 568, 75, 2.2],
              [sunCenterX + 18, 576, 96, 2.4],
              [sunCenterX - 28, 584, 122, 2.6],
              [sunCenterX + 38, 592, 108, 2.4],
              [sunCenterX - 65, 602, 144, 2.8],
              [sunCenterX + 12, 612, 160, 2.6],
              [sunCenterX - 18, 624, 175, 2.4],
            ].map(([rx, ry, rw, rh], idx) => (
              <ellipse
                key={idx}
                cx={rx}
                cy={ry}
                rx={rw}
                ry={rh}
                fill={c.sunCore}
                opacity={0.70 + (idx % 3) * 0.15}
              />
            ))}
          </g>

          {/* Authentic Malawian Wooden Lateen Dhow (Mbwato) with White Canvas Sail */}
          <g transform="translate(1260, 558) scale(0.78)">
            {/* Curved hull */}
            <path d="M0,22 Q24,30 52,22 L46,14 L6,14 Z" fill="#3B1705" />
            <line x1="8" y1="14" x2="44" y2="14" stroke="#F59E0B" strokeWidth="1.2" />
            {/* Slanted lateen mast & yard */}
            <line x1="26" y1="20" x2="26" y2="3" stroke="#5C2406" strokeWidth="2.0" />
            <line x1="12" y1="24" x2="42" y2="0" stroke="#92400E" strokeWidth="1.6" />
            {/* Triangular canvas sail catching brilliant morning sun */}
            <polygon points="14,22 40,2 26,20" fill="#FFFDF5" opacity="0.99" />
            {/* Water wake ripple */}
            <ellipse cx="26" cy="24" rx="24" ry="2.2" fill="#E0F2FE" opacity="0.80" />
          </g>
        </g>

        {/* =================================================================
            5. FOREGROUND TERRACED HILLS, PERMACULTURE SWALES & LIVING HOMESTEAD
            Outpost permaculture design: Vetiver contour grass, 3x3x3ft pits,
            solar arrays facing the sun, fieldstone architecture, and baobabs.
        ================================================================= */}
        <g opacity="1">
          {/* Back Terraced Tea Hill Slope */}
          <path
            d="M-50,710 Q280,590 620,630 T1220,610 T1650,645 L1650,950 L-50,950 Z"
            fill={`url(#terrace-slope-${uid})`}
          />

          {/* Permaculture Keyline Contour Swales (Moisture Retention Ditches with Warm Earth Berms) */}
          <g stroke={c.soilBerm} strokeWidth="3" opacity="0.85" fill="none">
            <path d="M-20,735 Q290,618 625,655 T1230,638 T1640,670" />
            <path d="M-20,762 Q290,648 625,682 T1230,665 T1640,698" />
            <path d="M-20,792 Q310,680 645,712 T1245,695 T1640,728" />
          </g>

          {/* Vetiver Grass Hedgerow Tufts Stabilizing Swale Berms */}
          <g fill={c.terraceStripe} opacity="0.95">
            {[
              [140, 672], [180, 664], [220, 656], [260, 650], [300, 646],
              [420, 644], [460, 646], [500, 650], [540, 655], [580, 660],
              [780, 644], [820, 640], [860, 638], [900, 636], [940, 636],
              [1080, 636], [1120, 638], [1160, 640], [1200, 644],
            ].map(([vx, vy], idx) => (
              <polygon key={idx} points="0,0 -3.5,-10 0,-14 3.5,-10" transform={`translate(${vx}, ${vy})`} />
            ))}
          </g>

          {/* Main Front Agroforestry Promontory */}
          <path
            d="M-50,785 Q320,670 720,715 T1380,690 T1650,735 L1650,950 L-50,950 Z"
            fill={`url(#foreground-promontory-${uid})`}
          />

          {/* =============================================================
              THE COUNTRY LIVING HOMESTEAD & SANCTUARY OUTPOST (x=1010, y=520)
              Features:
              - Double-pitch pitched metal roof with solar array
              - Fieldstone plinth foundation & timber posts
              - Glass greenhouse solarium
              - Gravity water tower
              - Stone chimney with rising morning hearth smoke
              ============================================================= */}
          <g id={`homestead-cluster-${uid}`} transform="translate(1010, 520)">
            {/* Fieldstone Foundation Terrace Plinth */}
            <polygon
              points="10,85 185,85 175,102 -2,102"
              fill={c.stoneMasonry}
              stroke="#292524"
              strokeWidth="1.4"
            />
            {/* Masonry Course Details */}
            <line x1="8" y1="93" x2="180" y2="93" stroke="#78716C" strokeWidth="1.0" opacity="0.85" />

            {/* Main Residence Timber Post-and-Beam Walls */}
            <rect x="25" y="44" width="90" height="42" fill={c.cedarWood} />

            {/* Shaded Front Veranda (Khonde) for Family Fellowship & Reading */}
            <rect x="20" y="58" width="98" height="28" fill="#2E1005" opacity="0.85" />
            {/* Veranda Timber Pillars */}
            {[24, 46, 70, 94, 114].map((px) => (
              <rect key={px} x={px} y="58" width="4" height="28" fill="#B45309" />
            ))}

            {/* Casement Windows Reflecting Morning Sky */}
            <rect x="36" y="48" width="14" height="12" rx="1" fill="#BAE6FD" opacity="0.95" />
            <rect x="74" y="48" width="14" height="12" rx="1" fill="#BAE6FD" opacity="0.95" />
            <line x1="43" y1="48" x2="43" y2="60" stroke="#0284C7" strokeWidth="0.8" />
            <line x1="36" y1="54" x2="50" y2="54" stroke="#0284C7" strokeWidth="0.8" />
            <line x1="81" y1="48" x2="81" y2="60" stroke="#0284C7" strokeWidth="0.8" />
            <line x1="74" y1="54" x2="88" y2="54" stroke="#0284C7" strokeWidth="0.8" />

            {/* Main Residence Double-Pitch Gable Roof */}
            <polygon points="12,46 70,12 128,46" fill={`url(#roof-sunlit-${uid})`} />
            <polygon points="70,12 128,46 122,48 70,14" fill={c.roofRidge} />

            {/* Rooftop Off-Grid Solar PV Array (Oriented to Dawn Sun, Catching Specular Sheen) */}
            <polygon points="34,40 68,16 92,30 58,54" fill={`url(#solar-sheen-${uid})`} stroke="#38BDF8" strokeWidth="1" />
            {/* Solar Cell Grid Lines */}
            <line x1="45" y1="32" x2="70" y2="46" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.90" />
            <line x1="56" y1="24" x2="81" y2="38" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.90" />
            <line x1="48" y1="43" x2="80" y2="23" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.80" />

            {/* Stone Masonry Chimney */}
            <rect x="58" y="10" width="8" height="24" fill={c.stoneMasonry} stroke="#1C1917" strokeWidth="0.8" />
            <rect x="56" y="8" width="12" height="3" fill="#78716C" />

            {/* Gentle Morning Hearth Chimney Smoke */}
            <g className="anim-scenery-smoke">
              <ellipse cx="62" cy="4" rx="5" ry="4" fill="#FEF3C7" opacity="0.85" />
              <ellipse cx="68" cy="-8" rx="8" ry="6" fill="#F1F5F9" opacity="0.65" />
              <ellipse cx="76" cy="-22" rx="12" ry="9" fill="#E2E8F0" opacity="0.45" />
              <ellipse cx="88" cy="-38" rx="16" ry="12" fill="#CBD5E1" opacity="0.25" />
            </g>

            {/* Outpost Glass Solarium Greenhouse (Year-Round Seedling Nursery) */}
            <g transform="translate(125, 52)">
              <polygon points="0,34 0,16 22,4 44,16 44,34" fill="#065F46" stroke="#10B981" strokeWidth="1.2" />
              {/* Glass Panes Reflecting Sunrise Sky */}
              <polygon points="2,16 22,6 42,16 22,26" fill="#A7F3D0" opacity="0.85" />
              <rect x="4" y="18" width="16" height="15" fill="#6EE7B7" opacity="0.75" />
              <rect x="24" y="18" width="16" height="15" fill="#6EE7B7" opacity="0.75" />
              {/* Glazing bars */}
              <line x1="22" y1="6" x2="22" y2="34" stroke="#059669" strokeWidth="1" />
              <line x1="2" y1="25" x2="42" y2="25" stroke="#059669" strokeWidth="0.8" />
            </g>

            {/* Gravity Water Tank Tower (Piped from Mountain Spring) */}
            <g transform="translate(-18, 40)">
              {/* Timber Trestle Legs */}
              <line x1="2" y1="52" x2="8" y2="18" stroke="#92400E" strokeWidth="2.4" />
              <line x1="22" y1="52" x2="16" y2="18" stroke="#92400E" strokeWidth="2.4" />
              <line x1="3" y1="36" x2="21" y2="36" stroke="#B45309" strokeWidth="1.4" />
              <line x1="4" y1="36" x2="20" y2="18" stroke="#B45309" strokeWidth="1.2" />
              <line x1="20" y1="36" x2="4" y2="18" stroke="#B45309" strokeWidth="1.2" />
              {/* Platform */}
              <rect x="4" y="16" width="16" height="3" fill="#5C2406" />
              {/* Cylindrical Rainwater Storage Tank (5,000L) */}
              <rect x="5" y="0" width="14" height="16" rx="2" fill="#059669" stroke="#047857" strokeWidth="1.2" />
              <line x1="5" y1="5" x2="19" y2="5" stroke="#34D399" strokeWidth="0.8" />
              <line x1="5" y1="11" x2="19" y2="11" stroke="#34D399" strokeWidth="0.8" />
            </g>

            {/* Practical Agro-Tool Barn & Food Drying Workshop */}
            <g transform="translate(176, 44)">
              <polygon points="0,42 0,16 26,0 52,16 52,42" fill={c.cedarWood} stroke="#3B1705" strokeWidth="1" />
              <polygon points="-2,16 26,-2 54,16" fill={c.roofTile} />
              {/* Barn Dutch Barn Doors */}
              <rect x="14" y="18" width="24" height="24" fill="#451A03" stroke="#2E1005" strokeWidth="1" />
              <line x1="26" y1="18" x2="26" y2="42" stroke="#B45309" strokeWidth="1" />
              {/* Upper Hayloft / Herb Drying Window */}
              <rect x="21" y="8" width="10" height="7" rx="1" fill="#FEF08A" opacity="0.90" />
            </g>
          </g>

          {/* African Baobab Tree on Left Ridge (Sculptural Gnarled Silhouette with Warm Rim Lighting) */}
          <g transform="translate(110, 525)" fill={c.foregroundFoliage} opacity="0.96">
            <path d="M44,145 Q48,92 42,52 L62,52 Q56,92 64,145 Z" fill="#3E2723" />
            {/* Massive Gnarled Scaffold Branches */}
            <path
              d="M46,57 Q20,32 -6,40 M50,52 Q50,18 28,8 M56,54 Q84,26 116,35 M52,52 Q72,19 96,13"
              stroke="#3E2723"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Canopy Foliage Masses */}
            <ellipse cx="-4" cy="34" rx="32" ry="14" fill="#15803D" />
            <ellipse cx="34" cy="8" rx="38" ry="15" fill="#166534" />
            <ellipse cx="90" cy="13" rx="36" ry="14" fill="#15803D" />
            <ellipse cx="118" cy="31" rx="30" ry="13" fill="#14532D" />
            <ellipse cx="56" cy="23" rx="48" ry="18" fill="#166534" />
            {/* Morning sunrise rim glow on top-right edges */}
            <path d="M12,4 Q34,-2 60,6" stroke="#FDE047" strokeWidth="2.2" opacity="0.85" fill="none" />
            <path d="M70,8 Q95,4 115,18" stroke="#FDE047" strokeWidth="2.2" opacity="0.85" fill="none" />
          </g>

          {/* African Flat-Top Umbrella Acacia (Tiered Canopy catching dawn rim light) */}
          <g transform="translate(1380, 542)">
            <path d="M26,112 Q28,70 24,40 L34,40 Q32,70 36,112 Z" fill="#451A03" />
            <path
              d="M26,45 Q-5,22 -30,28 M28,40 Q28,15 12,8 M32,42 Q58,20 86,26"
              stroke="#451A03"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="-25" cy="24" rx="36" ry="9" fill="#15803D" />
            <ellipse cx="15" cy="6" rx="44" ry="10" fill="#166534" />
            <ellipse cx="78" cy="22" rx="38" ry="9" fill="#15803D" />
            <ellipse cx="30" cy="14" rx="58" ry="11" fill="#14532D" />
            {/* Top Tier Sunrise Rim Light */}
            <path d="M-15,4 Q15,0 45,6" stroke="#FDE047" strokeWidth="2.0" opacity="0.90" fill="none" />
          </g>

          {/* Mulanje Pines & Cedars Framing the Promontory */}
          <g fill="#0F381E" opacity="0.98">
            {[
              [80, 640, 0.95],
              [340, 650, 0.75],
              [375, 665, 0.65],
              [960, 645, 0.85],
              [990, 630, 0.95],
              [1280, 640, 0.90],
              [1320, 652, 0.75],
              [1510, 645, 0.95],
              [1550, 660, 0.80],
            ].map(([tx, ty, scale], idx) => (
              <g key={idx} transform={`translate(${tx}, ${ty}) scale(${scale})`}>
                <polygon points="16,0 0,26 32,26" fill="#15803D" />
                <polygon points="16,14 -4,42 36,42" fill="#166534" />
                <polygon points="16,28 -8,58 40,58" fill="#14532D" />
                <rect x="13" y="58" width="6" height="16" fill="#3B1705" />
              </g>
            ))}
          </g>

          {/* Permaculture Deep Planting Pits (3x3x3ft Agroforestry Mounds) */}
          <g fill={c.foregroundAccent} opacity="0.90">
            {[
              [480, 715],
              [520, 725],
              [560, 735],
              [600, 748],
              [640, 762],
              [780, 740],
              [820, 752],
              [860, 765],
            ].map(([px, py], idx) => (
              <g key={idx} transform={`translate(${px}, ${py})`}>
                <ellipse cx="0" cy="0" rx="9" ry="4" fill="#92400E" />
                <circle cx="0" cy="-3" r="2.2" fill={c.terraceStripe} />
              </g>
            ))}
          </g>

          {/* Soaring African Fish Eagles on Rising Mountain Thermals */}
          <g className="anim-scenery-eagles" stroke={c.sunCore} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.98">
            <path d="M680,225 Q693,212 706,223 Q719,212 732,225" />
            <path d="M745,204 Q754,194 763,203 Q772,194 781,204" />
            <path d="M648,248 Q656,240 664,247 Q672,240 680,248" />
          </g>
        </g>

        {/* =================================================================
            6. POLISHED ATMOSPHERIC OVERLAYS
            Refined non-linear scrim strictly under the text column.
        ================================================================= */}
        {/* A. Editorial Left Scrim (Smooth Feathered Gradient for Headline & Quote) */}
        <rect width="1600" height="900" fill={`url(#left-scrim-${uid})`} />

        {/* B. Mobile Viewport Protective Gradient (Top to Bottom for Compact Displays) */}
        <rect width="1600" height="900" fill={`url(#mobile-vertical-scrim-${uid})`} className="sm:hidden" />

        {/* C. Gentle Bottom Transition Vignette (Seamless Integration with Page Canvas) */}
        <rect y="790" width="1600" height="110" fill={`url(#bottom-vignette-${uid})`} />
      </svg>
    </div>
  );
}
