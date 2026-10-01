import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { cn } from '@/lib/utils';

export interface HomeSceneryBackgroundProps {
  className?: string;
  variant?: 'hero' | 'panoramic' | 'full';
  activeScene?: 'sanctuary' | 'highlands' | 'waters';
}

/**
 * Upgraded Malawi Highland Sanctuary Scenery Background.
 * Combines high-resolution country living highland photography, warm golden-dawn
 * atmospheric light rays, layered mountain ridge silhouettes, and a measured
 * WCAG contrast scrim — free of ghost text watermarks or cluttered grid labels.
 */
export function HomeSceneryBackground({
  className,
  activeScene = 'sanctuary',
}: HomeSceneryBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring-dampened parallax scroll tracking
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const photoY = useTransform(smoothScrollY, [0, 900], [0, 65]);
  const photoScale = useTransform(smoothScrollY, [0, 900], [1.03, 1.1]);
  const sunGlowY = useTransform(smoothScrollY, [0, 900], [0, 40]);
  const distantRidgeY = useTransform(smoothScrollY, [0, 900], [0, 50]);
  const foreRidgeY = useTransform(smoothScrollY, [0, 900], [0, 25]);

  const bgImageSrc =
    activeScene === 'highlands'
      ? COUNTRY_IMAGES.mountainVista || COUNTRY_IMAGES.homesteadHighlands
      : activeScene === 'waters'
        ? COUNTRY_IMAGES.offgridHomesteadWater || COUNTRY_IMAGES.malawiHomesteadSanctuary
        : COUNTRY_IMAGES.malawiHomesteadSanctuary || COUNTRY_IMAGES.homesteadHighlands;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden select-none bg-[#06130C]',
        className
      )}
    >
      {/* ====================================================================
          1. HIGH-DEFINITION MALAWI HIGHLAND SANCTUARY PHOTOGRAPHY LAYER
      ==================================================================== */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={bgImageSrc}
          alt="Malawi Highland Country Sanctuary Landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 dark:opacity-40 filter saturate-[1.12] contrast-[1.05]"
        />
      </motion.div>

      {/* ====================================================================
          2. MEASURED CONTRAST SCRIM & GOLDEN DAWN ATMOSPHERIC LIGHTING
      ==================================================================== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041009]/80 via-[#071910]/65 to-[#06130C]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041009]/85 via-[#06150D]/45 to-[#041009]/80" />

      {/* Warm Golden Sunrise & Living Water Ambient Glows */}
      <motion.div style={{ y: sunGlowY }} className="absolute inset-0">
        {/* Golden Dawn Crest Sunbeam */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[780px] h-[420px] rounded-full bg-radial from-amber-400/22 via-amber-500/8 to-transparent blur-3xl" />

        {/* Lush Highland Emerald Mist Aura (Left) */}
        <div className="absolute top-[22%] left-[18%] w-[460px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-emerald-500/20 via-emerald-700/8 to-transparent blur-3xl" />

        {/* Mountain Spring Cyan Luminance (Right) */}
        <div className="absolute top-[38%] right-[12%] w-[400px] h-[360px] rounded-full bg-radial from-sky-400/14 via-teal-600/6 to-transparent blur-3xl" />
      </motion.div>

      {/* ====================================================================
          3. SERENE HIGHLAND MOUNTAIN SILHOUETTES & SUN RAYS (VIVID VECTOR ART)
      ==================================================================== */}
      <motion.div style={{ y: distantRidgeY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Warm Golden Sunburst Gradient */}
            <radialGradient
              id="heroDawnSunGrad"
              cx="1050"
              cy="170"
              r="440"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.24" />
              <stop offset="70%" stopColor="#D97706" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>

            {/* Distant Mulanje & Zomba Highland Silhouette */}
            <linearGradient
              id="distantHighlandFill"
              x1="800"
              y1="210"
              x2="800"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#065F46" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#064E3B" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#04130B" stopOpacity="0.95" />
            </linearGradient>

            {/* Mid-Elevation Dedza & Viphya Forested Ridge */}
            <linearGradient
              id="midHighlandFill"
              x1="800"
              y1="340"
              x2="800"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#047857" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#064E3B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#05180E" stopOpacity="0.98" />
            </linearGradient>

            {/* Golden Rim Light on Mountain Ridges */}
            <linearGradient
              id="ridgeRimGlow"
              x1="0"
              y1="0"
              x2="1600"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
              <stop offset="45%" stopColor="#6EE7B7" stopOpacity="0.6" />
              <stop offset="68%" stopColor="#FDE68A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Golden Dawn Sun Orb, Concentric Halo Rings & Geometric Sunbeams */}
          <circle cx="1050" cy="170" r="420" fill="url(#heroDawnSunGrad)" />
          <circle cx="1050" cy="170" r="76" fill="#FDE68A" fillOpacity="0.14" stroke="#FCD34D" strokeOpacity="0.35" strokeWidth="1.2" />
          <circle cx="1050" cy="170" r="145" stroke="#FDE68A" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="1050" cy="170" r="230" stroke="#34D399" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 8" />

          <g stroke="#FDE68A" strokeWidth="1.25" strokeLinecap="round" opacity="0.32">
            <line x1="1050" y1="170" x2="680" y2="20" />
            <line x1="1050" y1="170" x2="810" y2="10" />
            <line x1="1050" y1="170" x2="930" y2="5" />
            <line x1="1050" y1="170" x2="1050" y2="0" />
            <line x1="1050" y1="170" x2="1175" y2="10" />
            <line x1="1050" y1="170" x2="1310" y2="30" />
            <line x1="1050" y1="170" x2="1460" y2="75" />
          </g>

          {/* Distant Highland Range Silhouette (Sapitwa & Zomba Peaks) */}
          <path
            d="M 0 410
               Q 150 330 300 365
               L 470 260
               Q 560 305 660 225
               L 820 310
               L 995 205
               L 1155 290
               L 1320 225
               Q 1460 290 1600 265
               L 1600 800
               L 0 800 Z"
            fill="url(#distantHighlandFill)"
          />

          {/* Crisp Golden Sunlight Ridge Rim */}
          <path
            d="M 0 410
               Q 150 330 300 365
               L 470 260
               Q 560 305 660 225
               L 820 310
               L 995 205
               L 1155 290
               L 1320 225
               Q 1460 290 1600 265"
            stroke="url(#ridgeRimGlow)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Mid-Elevation Rolling Foothills & Valleys */}
          <path
            d="M 0 490
               Q 220 400 440 450
               Q 660 495 860 390
               Q 1060 310 1260 410
               Q 1430 465 1600 420
               L 1600 800
               L 0 800 Z"
            fill="url(#midHighlandFill)"
          />
          <path
            d="M 0 490
               Q 220 400 440 450
               Q 660 495 860 390
               Q 1060 310 1260 410
               Q 1430 465 1600 420"
            stroke="rgba(110, 231, 183, 0.42)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Topographic Elevation Contours & Terraced Swale Lines */}
          <g stroke="rgba(110, 231, 183, 0.26)" strokeWidth="1.15" fill="none" strokeLinecap="round">
            <path d="M 0 455 Q 220 380 440 420 T 880 365 T 1320 390 T 1600 390" />
            <path
              d="M 0 530 Q 240 455 480 490 T 920 445 T 1360 470 T 1600 475"
              strokeDasharray="8 6"
            />
            <path
              d="M 0 570 Q 260 505 520 535 T 960 495 T 1400 520 T 1600 525"
              stroke="rgba(252, 211, 77, 0.22)"
              strokeDasharray="4 8"
            />
          </g>
        </svg>
      </motion.div>

      {/* ====================================================================
          4. FOREGROUND TERRACED SANCTUARY VALLEY, PINE TREES & LIVING STREAM
      ==================================================================== */}
      <motion.div style={{ y: foreRidgeY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="livingStreamGrad"
              x1="990"
              y1="390"
              x2="880"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Gentle Foreground Valley Slope */}
          <path
            d="M 0 595
               Q 280 530 560 580
               Q 840 625 1120 540
               Q 1360 490 1600 555
               L 1600 800
               L 0 800 Z"
            fill="rgba(4, 22, 14, 0.78)"
            stroke="rgba(52, 211, 153, 0.28)"
            strokeWidth="1.2"
          />

          {/* Winding Mountain Stream Curve */}
          <path
            d="M 995 390
               C 970 450, 930 500, 955 555
               C 980 610, 915 675, 875 740
               C 855 770, 850 790, 845 800
               L 930 800
               C 940 780, 950 755, 970 725
               C 1010 660, 1025 595, 985 545
               C 960 500, 990 445, 995 390 Z"
            fill="url(#livingStreamGrad)"
          />
          <path
            d="M 960 495 Q 975 490 990 495 M 950 575 Q 972 568 995 575 M 915 665 Q 945 656 975 665"
            stroke="#E0F2FE"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* ====================================================================
          5. SEAMLESS BOTTOM TRANSITION VIGNETTE
      ==================================================================== */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#06130C] via-[#06130C]/75 to-transparent" />
    </div>
  );
}

export default HomeSceneryBackground;
