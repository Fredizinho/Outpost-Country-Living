import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export interface HomeSceneryBackgroundProps {
  className?: string;
  variant?: 'hero' | 'panoramic' | 'full';
}

/**
 * Elegant, dark architectural blueprint style background.
 * Features:
 * - Deep slate gradient: from-stone-950 via-stone-900 to-emerald-950
 * - Dynamic, subtle vector topographic contour lines (stroke-emerald-500/15)
 * - Blueprint coordinate grid, elevation markers & cartographic transects
 * - Soft radial ambient light glows positioned behind the hero emblem card
 * - Smooth multi-layer parallax scrolling
 */
export function HomeSceneryBackground({ 
  className,
  variant = 'hero'
}: HomeSceneryBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking with smooth spring dampening
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Layered parallax translations
  const gridY = useTransform(smoothScrollY, [0, 800], [0, 24]);
  const backContourY = useTransform(smoothScrollY, [0, 800], [0, 48]);
  const midContourY = useTransform(smoothScrollY, [0, 800], [0, 80]);
  const foreContourY = useTransform(smoothScrollY, [0, 800], [0, 110]);
  const glowY = useTransform(smoothScrollY, [0, 800], [0, 35]);

  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none",
        "bg-gradient-to-b from-stone-950 via-stone-900 to-emerald-950",
        className
      )}
    >
      {/* ====================================================================
          1. SOFT RADIAL AMBIENT LIGHT GLOWS (BEHIND HERO CARD & HORIZON)
      ==================================================================== */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Primary Soft Radial Light Glow: Specifically positioned behind the Left Hero Card */}
        <div 
          className="absolute top-[18%] left-[12%] sm:left-[18%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-emerald-500/20 via-emerald-600/8 to-transparent blur-3xl"
        />

        {/* Secondary Cyan Spring Aura behind the Rift Water Channel */}
        <div 
          className="absolute top-[40%] left-[26%] w-[320px] h-[320px] rounded-full bg-radial from-cyan-500/15 via-sky-600/5 to-transparent blur-3xl"
        />

        {/* Subtle Warm Amber Dawn Rim Light behind the mountain peaks */}
        <div 
          className="absolute top-[15%] right-[25%] w-[420px] h-[260px] rounded-full bg-radial from-amber-500/10 via-amber-600/3 to-transparent blur-3xl"
        />

        {/* Broad Ambient Slate-Emerald Base Glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[320px] bg-gradient-to-t from-emerald-950/40 via-stone-900/20 to-transparent blur-2xl"
        />
      </motion.div>

      {/* ====================================================================
          2. ARCHITECTURAL BLUEPRINT GRID & CARTOGRAPHIC TICKS
      ==================================================================== */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fine 40x40 Blueprint Architectural Grid Pattern */}
            <pattern id="blueprintGrid40" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="rgba(16, 185, 129, 0.08)" 
                strokeWidth="0.75" 
              />
              {/* Subtle Grid Intersection Cross */}
              <path 
                d="M 19 20 L 21 20 M 20 19 L 20 21" 
                stroke="rgba(16, 185, 129, 0.22)" 
                strokeWidth="1" 
              />
            </pattern>

            {/* Major 200x200 Blueprint Section Grid */}
            <pattern id="blueprintMajorGrid" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#blueprintGrid40)" />
              <path 
                d="M 200 0 L 0 0 0 200" 
                fill="none" 
                stroke="rgba(16, 185, 129, 0.16)" 
                strokeWidth="1.2" 
                strokeDasharray="4 4"
              />
            </pattern>
          </defs>

          {/* Blueprint Grid Overlay */}
          <rect width="1600" height="800" fill="url(#blueprintMajorGrid)" />

          {/* Cartographic Coordinate Border Rulers & Ticks */}
          <g stroke="rgba(16, 185, 129, 0.25)" strokeWidth="0.8" opacity="0.6">
            {/* Top Coordinate Line */}
            <line x1="40" y1="30" x2="1560" y2="30" />
            <line x1="100" y1="24" x2="100" y2="36" />
            <line x1="300" y1="26" x2="300" y2="34" />
            <line x1="500" y1="24" x2="500" y2="36" />
            <line x1="700" y1="26" x2="700" y2="34" />
            <line x1="900" y1="24" x2="900" y2="36" />
            <line x1="1100" y1="26" x2="1100" y2="34" />
            <line x1="1300" y1="24" x2="1300" y2="36" />
            <line x1="1500" y1="24" x2="1500" y2="36" />
          </g>

          {/* Blueprint Technical Cartography Labels */}
          <g fill="rgba(16, 185, 129, 0.45)" fontFamily="monospace" fontSize="9" letterSpacing="0.16em">
            <text x="50" y="22">LAT 09°30'S · 17°00'S</text>
            <text x="720" y="22">MALAWI TOPOGRAPHIC TRANSECT · ARC 1950 DATUM</text>
            <text x="1350" y="22">LON 32°40'E · 35°55'E</text>

            <text x="50" y="780">INTERVAL: 50m ELEVATION</text>
            <text x="650" y="780">HYDROLOGY: PERENNIAL GRAVITY SPRING SYSTEMS</text>
            <text x="1380" y="780">SCALE 1:50,000 ARCH</text>
          </g>

          {/* Cardinal Orientation Compass Rose in Top Right Corner */}
          <g transform="translate(1500, 85)" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="0.8" fill="none">
            <circle cx="0" cy="0" r="24" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="16" />
            <line x1="0" y1="-28" x2="0" y2="28" />
            <line x1="-28" y1="0" x2="28" y2="0" />
            <polygon points="0,-24 4,-12 0,-16 -4,-12" fill="rgba(16, 185, 129, 0.5)" stroke="none" />
            <text x="-3" y="-30" fill="rgba(16, 185, 129, 0.7)" fontFamily="monospace" fontSize="8" stroke="none">N</text>
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          3. DISTANT TOPOGRAPHIC CONTOUR LINES & HIGH PEAKS (PARALLAX LAYER 1)
      ==================================================================== */}
      <motion.div 
        style={{ y: backContourY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Mountain Peak Silhouette Shading */}
          <path
            d="M 0 380 
               Q 140 320 280 340 
               L 420 270 
               L 560 330 
               L 680 230 
               L 820 310 
               L 960 210 
               L 1100 290 
               L 1260 240 
               Q 1420 310 1600 280 
               L 1600 800 
               L 0 800 Z"
            fill="rgba(6, 78, 59, 0.12)"
          />

          {/* High Peak Topographic Elevation Contours (stroke-emerald-500/15) */}
          <g stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" fill="none" strokeLinecap="round">
            {/* Sapitwa / Mulanje Peak 2,800m - 3,000m contour loop */}
            <path d="M 920 230 Q 960 205 1000 230 Q 980 250 940 245 Z" />
            <path d="M 900 245 Q 960 215 1020 245 Q 990 270 930 265 Z" strokeDasharray="3 3" />
            <path d="M 870 265 Q 960 225 1050 265 Q 1000 295 910 285 Z" />

            {/* Dedza Plateau 2,000m - 2,200m contour loop */}
            <path d="M 650 250 Q 680 225 710 250 Q 695 268 665 265 Z" />
            <path d="M 630 265 Q 680 235 730 265 Q 710 285 645 280 Z" strokeDasharray="3 3" />

            {/* Continuous Trans-Malawi High Elevation Contour (+2,100m) */}
            <path d="M 0 330 Q 180 290 340 320 T 680 230 T 960 210 T 1320 260 T 1600 290" />
            <path d="M 0 350 Q 180 310 340 340 T 680 250 T 960 230 T 1320 280 T 1600 310" strokeDasharray="6 4" />
            <path d="M 0 370 Q 190 330 360 360 T 700 270 T 980 250 T 1340 300 T 1600 330" />
          </g>

          {/* High Elevation Labels */}
          <g fill="rgba(16, 185, 129, 0.35)" fontFamily="monospace" fontSize="8" letterSpacing="0.12em">
            <text x="965" y="202">+3,002m SAPITWA PEAK</text>
            <text x="660" y="222">+2,198m DEDZA MOUNTAIN</text>
            <text x="400" y="262">+2,050m ZOMBA PLATEAU</text>
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          4. MID-ELEVATION RIDGE CONTOURS & ESCARPMENTS (PARALLAX LAYER 2)
      ==================================================================== */}
      <motion.div 
        style={{ y: midContourY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mid Ridge Shading */}
          <path
            d="M 0 440 
               Q 200 370 400 410 
               Q 600 450 780 360 
               Q 950 280 1120 370 
               Q 1300 440 1600 380 
               L 1600 800 
               L 0 800 Z"
            fill="rgba(4, 120, 87, 0.08)"
          />

          {/* Dynamic Mid-Tier Topographic Contour Lines (stroke-emerald-500/15) */}
          <g stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.1" fill="none" strokeLinecap="round">
            {/* Escarpment Contour Tier 1 (+1,600m) */}
            <path d="M 0 410 Q 150 360 300 380 T 620 400 T 940 330 T 1280 390 T 1600 360" />
            
            {/* Escarpment Contour Tier 2 (+1,450m) with index tick marks */}
            <path d="M 0 435 Q 170 385 330 405 T 650 425 T 970 355 T 1310 415 T 1600 385" stroke="rgba(16, 185, 129, 0.22)" />
            
            {/* Escarpment Contour Tier 3 (+1,300m) */}
            <path d="M 0 460 Q 190 410 360 430 T 680 445 T 1000 380 T 1340 440 T 1600 410" strokeDasharray="8 4" />
            
            {/* Escarpment Contour Tier 4 (+1,150m Lilongwe & Kasungu Plateau) */}
            <path d="M 0 490 Q 210 440 400 460 T 720 470 T 1040 410 T 1380 470 T 1600 440" />

            {/* Great Rift Valley Western Boundary Escarpment Ribbons */}
            <path d="M 280 390 Q 320 440 310 500 T 350 580" stroke="rgba(56, 189, 248, 0.18)" strokeDasharray="4 4" />
            <path d="M 300 395 Q 340 445 330 505 T 370 585" stroke="rgba(56, 189, 248, 0.14)" />
          </g>

          {/* Contour Elevation Number Tags */}
          <g fill="rgba(16, 185, 129, 0.4)" fontFamily="monospace" fontSize="8" letterSpacing="0.1em">
            <text x="140" y="375">+1,600m</text>
            <text x="490" y="415">+1,450m</text>
            <text x="820" y="350">+1,300m</text>
            <text x="1220" y="405">+1,450m</text>
            <text x="1490" y="380">+1,300m</text>

            <text x="325" y="485" fill="rgba(56, 189, 248, 0.35)">RIFT ESCARPMENT FAULT</text>
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          5. FOREGROUND TERRACES & LIVING WATER HYDROLOGY (PARALLAX LAYER 3)
      ==================================================================== */}
      <motion.div 
        style={{ y: foreContourY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Foreground Terrace Fill */}
          <path
            d="M 0 540 
               Q 220 480 460 520 
               Q 700 560 900 470 
               Q 1100 450 1340 540 
               Q 1480 490 1600 550 
               L 1600 800 
               L 0 800 Z"
            fill="rgba(6, 95, 70, 0.08)"
          />

          {/* Foreground Topographic Contours (stroke-emerald-500/15) */}
          <g stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1" fill="none" strokeLinecap="round">
            <path d="M 0 530 Q 220 470 450 510 T 890 480 T 1320 520 T 1600 530" />
            <path d="M 0 565 Q 240 500 480 540 T 920 510 T 1350 550 T 1600 560" strokeDasharray="5 3" />
            <path d="M 0 600 Q 260 535 520 575 T 960 540 T 1390 580 T 1600 595" stroke="rgba(16, 185, 129, 0.2)" />
            <path d="M 0 640 Q 280 575 560 615 T 1000 575 T 1430 615 T 1600 635" />
          </g>

          {/* Living Water Stream Blueprint Vector with Cyan Luminance */}
          <g stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round">
            {/* Main Spring Gravity Channel */}
            <path 
              d="M 960 380 
                 Q 940 430 920 480 
                 Q 890 540 930 600 
                 Q 970 660 940 730 
                 Q 920 780 910 800"
              strokeDasharray="6 3"
            />
            {/* Left Tributary Stream from Highlands */}
            <path 
              d="M 680 440 
                 Q 750 480 820 510 
                 Q 880 540 910 570" 
              stroke="rgba(56, 189, 248, 0.22)"
              strokeWidth="1.2"
            />
            {/* Right Perennial Spring Tributary */}
            <path 
              d="M 1200 460 
                 Q 1110 510 1040 550 
                 Q 980 580 930 600" 
              stroke="rgba(56, 189, 248, 0.22)"
              strokeWidth="1.2"
            />
          </g>

          {/* Hydrographic Monospace Annotation */}
          <g fill="rgba(56, 189, 248, 0.45)" fontFamily="monospace" fontSize="8" letterSpacing="0.14em">
            <text x="945" y="475">PERENNIAL HEADWATER SPRING</text>
            <text x="830" y="660">UNMETERED GRAVITY IRRIGATION TRANSECT</text>
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          6. SEAMLESS BOTTOM VIGNETTE BLEND
      ==================================================================== */}
      <div 
        className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent pointer-events-none"
      />
    </div>
  );
}

export default HomeSceneryBackground;
