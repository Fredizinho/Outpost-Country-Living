import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MALAWI_DISTRICTS, MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { MALAWI_ELEVATION_CONTOURS } from '@/data/malawiContourData';
import { MALAWI_LAKES } from '@/data/malawiVectorBasemapData';
import { Mountain, Droplets, Sprout, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MalawiTopographicInteractiveMapProps {
  className?: string;
  onSelectDistrict?: (district: MalawiDistrictSpec) => void;
  selectedDistrictId?: string;
  activeFilter?: 'water' | 'soil' | 'altitude' | 'settlement' | null;
  interactive?: boolean;
}

// Projection bounds for Malawi
const LAT_MIN = -17.2;
const LAT_MAX = -9.2;
const LNG_MIN = 32.4;
const LNG_MAX = 36.0;
const MAP_WIDTH = 340;
const MAP_HEIGHT = 640;

function projectPoint(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_WIDTH;
  const y = ((lat - LAT_MAX) / (LAT_MIN - LAT_MAX)) * MAP_HEIGHT;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

export function MalawiTopographicInteractiveMap({
  className,
  onSelectDistrict,
  selectedDistrictId,
  activeFilter = null,
  interactive = true
}: MalawiTopographicInteractiveMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<MalawiDistrictSpec | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute SVG paths for all 28 districts
  const districtPaths = useMemo(() => {
    return MALAWI_DISTRICTS.map((d) => {
      const points = d.boundary.map(([lat, lng]) => projectPoint(lat, lng));
      const pathData = points.reduce((acc, [px, py], i) => {
        return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
      }, '') + ' Z';
      
      const [cx, cy] = projectPoint(d.centroid[0], d.centroid[1]);
      return {
        ...d,
        pathData,
        cx,
        cy
      };
    });
  }, []);

  // Compute contour line paths
  const contourPaths = useMemo(() => {
    return MALAWI_ELEVATION_CONTOURS.map((c) => {
      const points = c.coordinates.map(([lat, lng]) => projectPoint(lat, lng));
      const pathData = points.reduce((acc, [px, py], i) => {
        return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
      }, '');
      return {
        ...c,
        pathData
      };
    });
  }, []);

  // Compute Lake Malawi outline
  const lakeMalawiPath = useMemo(() => {
    const lake = MALAWI_LAKES.find(l => l.id === 'lake-malawi');
    if (!lake) return '';
    const points = lake.coordinates.map(([lat, lng]) => projectPoint(lat, lng));
    return points.reduce((acc, [px, py], i) => {
      return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
    }, '') + ' Z';
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredDistrict(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden select-none",
        interactive && "cursor-crosshair",
        className
      )}
    >
      {/* Dynamic Cursor Light Following Glow */}
      {mousePos && interactive && (
        <div
          className="absolute pointer-events-none rounded-full blur-2xl transition-opacity duration-200 z-10"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '180px',
            height: '180px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(16, 185, 129, 0.18) 45%, transparent 70%)'
          }}
        />
      )}

      {/* SVG Map of Malawi */}
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-full max-h-full object-contain filter drop-shadow-sm transition-all"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle parchment mesh */}
          <pattern id="contourGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-amber-500/10 dark:text-emerald-500/10" />
          </pattern>

          {/* Lake Malawi Azure Gradient */}
          <linearGradient id="lakeWaterGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.5" />
          </linearGradient>

          {/* District Glow Gradient */}
          <radialGradient id="hoverDistrictGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Topographic Mesh Lines */}
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#contourGrid)" opacity="0.6" />

        {/* Topographic Contour Lines across Highlands */}
        <g className="opacity-40 dark:opacity-30">
          {contourPaths.map((contour) => (
            <path
              key={contour.id}
              d={contour.pathData}
              stroke="currentColor"
              strokeWidth={contour.type === 'frost-free-ridge' ? 1.2 : 0.8}
              strokeDasharray={contour.type === 'dambo-depression' ? '2 2' : 'none'}
              className={
                contour.type === 'frost-free-ridge'
                  ? 'text-amber-500/50'
                  : contour.type === 'dambo-depression'
                  ? 'text-sky-500/50'
                  : 'text-stone-400/40 dark:text-emerald-600/40'
              }
              fill="none"
            />
          ))}
        </g>

        {/* Lake Malawi Shoreline Water Body */}
        {lakeMalawiPath && (
          <g>
            <path
              d={lakeMalawiPath}
              fill="url(#lakeWaterGradient)"
              stroke="#38BDF8"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              className="transition-opacity"
            />
            {/* Shimmer line */}
            <path
              d="M 220 180 Q 235 240 245 320 T 260 410"
              stroke="#BAE6FD"
              strokeWidth="0.7"
              strokeDasharray="4 6"
              strokeOpacity="0.5"
              fill="none"
            />
          </g>
        )}

        {/* 28 District Boundaries */}
        <g>
          {districtPaths.map((district) => {
            const isHovered = hoveredDistrict?.id === district.id;
            const isSelected = selectedDistrictId === district.id;
            
            // Filter highlighted districts
            let isFilterMatch = false;
            if (activeFilter === 'water' && (district.rainfallAnnualMm >= 1100 || district.id === 'nkhata-bay' || district.id === 'karonga' || district.id === 'salima')) {
              isFilterMatch = true;
            } else if (activeFilter === 'soil' && (district.primarySoil.toLowerCase().includes('latosol') || district.primarySoil.toLowerCase().includes('loam'))) {
              isFilterMatch = true;
            } else if (activeFilter === 'altitude' && (district.elevationRange.includes('1,200m') || district.elevationRange.includes('1,400m') || district.elevationRange.includes('Dedza') || district.elevationRange.includes('Nyika'))) {
              isFilterMatch = true;
            } else if (activeFilter === 'settlement' && (district.id === 'thyolo' || district.id === 'blantyre' || district.id === 'dedza' || district.id === 'mzimba')) {
              isFilterMatch = true;
            }

            return (
              <g 
                key={district.id}
                onMouseEnter={() => {
                  if (interactive) setHoveredDistrict(district);
                }}
                onClick={() => {
                  if (onSelectDistrict) onSelectDistrict(district);
                }}
                className={cn(
                  "transition-all duration-200",
                  interactive && "cursor-pointer"
                )}
              >
                <path
                  d={district.pathData}
                  className={cn(
                    "transition-all duration-300",
                    isSelected
                      ? "fill-emerald-500/40 stroke-emerald-400 stroke-[1.8]"
                      : isHovered
                      ? "fill-amber-400/35 stroke-amber-400 stroke-[1.6]"
                      : isFilterMatch
                      ? "fill-emerald-500/20 stroke-emerald-500/60 stroke-[1.2]"
                      : "fill-amber-500/[0.04] dark:fill-emerald-500/[0.04] stroke-stone-400/35 dark:stroke-emerald-800/40 stroke-[0.8] hover:fill-amber-400/20 hover:stroke-amber-400/70"
                  )}
                />

                {/* District Centroid Dot */}
                <circle
                  cx={district.cx}
                  cy={district.cy}
                  r={isSelected || isHovered ? 3.5 : isFilterMatch ? 2.5 : 1.5}
                  className={cn(
                    "transition-all duration-300",
                    isSelected
                      ? "fill-white stroke-emerald-600 stroke-[1.5]"
                      : isHovered
                      ? "fill-amber-300 stroke-amber-700 stroke-[1.5]"
                      : isFilterMatch
                      ? "fill-emerald-400"
                      : "fill-stone-400/60 dark:fill-emerald-700/60"
                  )}
                />

                {/* Major District Names (Northern, Central, Southern key hubs) */}
                {(isHovered || isSelected || ['chitipa', 'mzimba', 'dedza', 'lilongwe', 'mulanje', 'blantyre'].includes(district.id)) && (
                  <text
                    x={district.cx + 4}
                    y={district.cy + 3}
                    className={cn(
                      "text-caption font-mono font-bold select-none pointer-events-none transition-all",
                      isHovered || isSelected
                        ? "fill-stone-900 dark:fill-white font-black text-caption"
                        : "fill-stone-600/70 dark:fill-emerald-400/60"
                    )}
                  >
                    {district.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Cardinal Direction Compass Rose */}
        <g transform="translate(30, 80)" className="opacity-40">
          <circle cx="0" cy="0" r="14" stroke="currentColor" strokeWidth="0.6" className="text-amber-600 dark:text-emerald-500" fill="none" />
          <path d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" fill="currentColor" className="text-amber-600/40 dark:text-emerald-500/40" />
          <text x="-3" y="-14" className="text-caption font-mono font-bold fill-amber-700 dark:fill-emerald-400">N</text>
        </g>
      </svg>

      {/* Floating Hover Readout Pill */}
      <AnimatePresence>
        {hoveredDistrict && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-white/95 dark:bg-stone-900/95 border border-amber-300/80 dark:border-emerald-700/80 shadow-lg backdrop-blur-md z-20 flex flex-col gap-1 text-left pointer-events-none"
          >
            <div className="flex items-center justify-between gap-1.5 border-b border-stone-200/60 dark:border-stone-800 pb-1">
              <span className="serif font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {hoveredDistrict.name} District
              </span>
              <span className="text-caption font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-emerald-950 text-amber-900 dark:text-emerald-300 font-bold border border-amber-300/60 dark:border-emerald-800/60">
                {hoveredDistrict.region}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-caption text-stone-600 dark:text-stone-300 font-sans pt-0.5">
              <div className="flex items-center gap-1">
                <Mountain size={10} className="text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate">{hoveredDistrict.elevationRange.split('(')[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets size={10} className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="truncate">{hoveredDistrict.rainfallAnnualMm}mm/yr</span>
              </div>
            </div>

            <div className="text-caption text-emerald-800 dark:text-emerald-300 font-medium font-sans flex items-center gap-1 truncate pt-0.5">
              <Sprout size={10} className="shrink-0" />
              <span className="truncate">{hoveredDistrict.primarySoil.split('(')[0]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
