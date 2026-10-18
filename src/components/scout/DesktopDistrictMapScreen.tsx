import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Droplets, 
  Sprout, 
  Users, 
  CloudRain, 
  Mountain, 
  Compass, 
  Layers, 
  Check, 
  MapPin, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { MALAWI_DISTRICTS, MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { MALAWI_ELEVATION_CONTOURS } from '@/data/malawiContourData';
import { MALAWI_LAKES } from '@/data/malawiVectorBasemapData';
import { cn } from '@/lib/utils';

interface DesktopDistrictMapScreenProps {
  onToggleFullGis?: () => void;
  onOpenSoilScience?: () => void;
  onOpenComparison?: () => void;
}

// Projection bounds for Malawi
const LAT_MIN = -17.2;
const LAT_MAX = -9.2;
const LNG_MIN = 32.4;
const LNG_MAX = 36.0;
const MAP_WIDTH = 340;
const MAP_HEIGHT = 620;

function projectPoint(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_WIDTH;
  const y = ((lat - LAT_MAX) / (LAT_MIN - LAT_MAX)) * MAP_HEIGHT;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

export function DesktopDistrictMapScreen({
  onToggleFullGis,
  onOpenSoilScience,
  onOpenComparison,
}: DesktopDistrictMapScreenProps) {
  const navigate = useNavigate();

  // Active layer toggles matching reference design
  const [layers, setLayers] = useState({
    waterSources: false,
    arableLand: false,
    communitySettlements: true, // active green pill in reference
    rainfall: false,
    elevation: false,
  });

  // Selected district - default to Dedza as in reference
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dedza');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddedToComparison, setIsAddedToComparison] = useState(false);

  const selectedDistrict = useMemo(() => {
    return (
      MALAWI_DISTRICTS.find((d) => d.id === selectedDistrictId) ||
      MALAWI_DISTRICTS.find((d) => d.id === 'dedza') ||
      MALAWI_DISTRICTS[0]
    );
  }, [selectedDistrictId]);

  // Projected paths for districts
  const districtPaths = useMemo(() => {
    return MALAWI_DISTRICTS.map((d) => {
      const points = d.boundary.map(([lat, lng]) => projectPoint(lat, lng));
      const pathData =
        points.reduce((acc, [px, py], i) => {
          return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
        }, '') + ' Z';

      const [cx, cy] = projectPoint(d.centroid[0], d.centroid[1]);
      return {
        ...d,
        pathData,
        cx,
        cy,
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
        pathData,
      };
    });
  }, []);

  // Compute Lake Malawi outline
  const lakeMalawiPath = useMemo(() => {
    const lake = MALAWI_LAKES.find((l) => l.id === 'lake-malawi');
    if (!lake) return '';
    const points = lake.coordinates.map(([lat, lng]) => projectPoint(lat, lng));
    return (
      points.reduce((acc, [px, py], i) => {
        return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
      }, '') + ' Z'
    );
  }, []);

  // Featured reference markers: Kasungu, Salima, Dedza
  const referenceMarkers = useMemo(() => {
    const ids = ['kasungu', 'salima', 'dedza'];
    return ids
      .map((id) => {
        const dist = districtPaths.find((d) => d.id === id);
        return dist ? { id: dist.id, name: dist.name, cx: dist.cx, cy: dist.cy } : null;
      })
      .filter(Boolean) as { id: string; name: string; cx: number; cy: number }[];
  }, [districtPaths]);

  const handleToggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectDistrict = (id: string) => {
    setSelectedDistrictId(id);
    setIsDropdownOpen(false);
    setIsAddedToComparison(false);
  };

  const handleAddToComparison = () => {
    setIsAddedToComparison(true);
    if (onOpenComparison) {
      setTimeout(() => onOpenComparison(), 400);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#F6F1E7] dark:bg-[#0F1813] text-[#1F2A22] dark:text-[#EBF2EC] font-chrome overflow-hidden select-none transition-colors duration-200">
      
      {/* ====================================================================
          1. LEFT COLUMN: LAYERS (Matches District map@1x.png)
      ==================================================================== */}
      <aside className="w-full md:w-[230px] shrink-0 border-b md:border-b-0 md:border-r border-[#E4DCCB] dark:border-[#283C30] p-4 flex flex-col gap-4 bg-[#F6F1E7] dark:bg-[#121C16] transition-colors duration-200">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A6458] dark:text-[#8E9E92]">
            Layers
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          {/* Water sources */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C8BFAC] dark:hover:border-[#3E5848] text-xs transition-colors duration-200">
            <span className="text-[#1F2A22] dark:text-[#EBF2EC] font-normal">Water sources</span>
            <button
              type="button"
              onClick={() => handleToggleLayer('waterSources')}
              role="switch"
              aria-checked={layers.waterSources}
              className={cn(
                'w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer',
                layers.waterSources ? 'bg-[#3F6B4E] dark:bg-[#4E8761]' : 'bg-[#E4DCCB] dark:bg-[#283C30]'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-200',
                  layers.waterSources ? 'right-0.5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          {/* Arable land and soils */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C8BFAC] dark:hover:border-[#3E5848] text-xs transition-colors duration-200">
            <span className="text-[#1F2A22] dark:text-[#EBF2EC] font-normal">Arable land and soils</span>
            <button
              type="button"
              onClick={() => handleToggleLayer('arableLand')}
              role="switch"
              aria-checked={layers.arableLand}
              className={cn(
                'w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer',
                layers.arableLand ? 'bg-[#3F6B4E] dark:bg-[#4E8761]' : 'bg-[#E4DCCB] dark:bg-[#283C30]'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-200',
                  layers.arableLand ? 'right-0.5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          {/* Community settlements (Active green pill in reference) */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C8BFAC] dark:hover:border-[#3E5848] text-xs transition-colors duration-200">
            <span className="text-[#1F2A22] dark:text-[#EBF2EC] font-medium">Community settlements</span>
            <button
              type="button"
              onClick={() => handleToggleLayer('communitySettlements')}
              role="switch"
              aria-checked={layers.communitySettlements}
              className={cn(
                'w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer',
                layers.communitySettlements ? 'bg-[#3F6B4E] dark:bg-[#4E8761]' : 'bg-[#E4DCCB] dark:bg-[#283C30]'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-200',
                  layers.communitySettlements ? 'right-0.5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          {/* Rainfall */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C8BFAC] dark:hover:border-[#3E5848] text-xs transition-colors duration-200">
            <span className="text-[#1F2A22] dark:text-[#EBF2EC] font-normal">Rainfall</span>
            <button
              type="button"
              onClick={() => handleToggleLayer('rainfall')}
              role="switch"
              aria-checked={layers.rainfall}
              className={cn(
                'w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer',
                layers.rainfall ? 'bg-[#3F6B4E] dark:bg-[#4E8761]' : 'bg-[#E4DCCB] dark:bg-[#283C30]'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-200',
                  layers.rainfall ? 'right-0.5' : 'left-0.5'
                )}
              />
            </button>
          </div>

          {/* Elevation */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#C8BFAC] dark:hover:border-[#3E5848] text-xs transition-colors duration-200">
            <span className="text-[#1F2A22] dark:text-[#EBF2EC] font-normal">Elevation</span>
            <button
              type="button"
              onClick={() => handleToggleLayer('elevation')}
              role="switch"
              aria-checked={layers.elevation}
              className={cn(
                'w-8 h-4 rounded-full transition-colors duration-200 relative cursor-pointer',
                layers.elevation ? 'bg-[#3F6B4E] dark:bg-[#4E8761]' : 'bg-[#E4DCCB] dark:bg-[#283C30]'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-200',
                  layers.elevation ? 'right-0.5' : 'left-0.5'
                )}
              />
            </button>
          </div>
        </div>

        {/* Optional switch to deep GIS / Leaflet engine */}
        {onToggleFullGis && (
          <div className="mt-auto pt-4 border-t border-[#E4DCCB] dark:border-[#283C30]">
            <button
              type="button"
              onClick={onToggleFullGis}
              className="w-full py-1.5 px-2.5 rounded-control border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#1F2A22] dark:hover:border-white bg-[#FFFDF8] dark:bg-[#17241C] text-[12px] text-[#5A6458] dark:text-[#8E9E92] hover:text-[#1F2A22] dark:hover:text-[#EBF2EC] flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Maximize2 size={12} />
              <span>Deep GIS Satellite Map</span>
            </button>
          </div>
        )}
      </aside>

      {/* ====================================================================
          2. CENTER MAP AREA (Matches District map@1x.png)
      ==================================================================== */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F6F1E7] dark:bg-[#0F1813] relative transition-colors duration-200">
        
        {/* Top Control Bar: "Map", "Stations", "Soil guide", "Dedza district ▾" */}
        <div className="h-12 border-b border-[#E4DCCB] dark:border-[#283C30] px-4 flex items-center justify-between gap-2 bg-[#F6F1E7]/80 dark:bg-[#0F1813]/80 backdrop-blur-xs z-20 transition-colors duration-200">
          <div className="flex items-center gap-1.5">
            {/* "Map" button: styled as primary terracotta button in reference */}
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-control bg-[#B4531F] text-white text-xs font-medium shadow-2xs hover:bg-[#9c4518] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Map
            </button>

            {/* "Stations" */}
            <button
              type="button"
              onClick={() => handleToggleLayer('communitySettlements')}
              className={cn(
                'px-3 py-1.5 rounded-control text-xs font-medium transition-all duration-200 cursor-pointer border',
                layers.communitySettlements
                  ? 'bg-[#FFFDF8] dark:bg-[#17241C] border-[#E4DCCB] dark:border-[#283C30] text-[#1F2A22] dark:text-[#EBF2EC]'
                  : 'border-transparent hover:border-[#E4DCCB] dark:hover:border-[#283C30] text-[#5A6458] dark:text-[#8E9E92] hover:text-[#1F2A22] dark:hover:text-[#EBF2EC]'
              )}
            >
              Stations
            </button>

            {/* "Soil guide" */}
            <button
              type="button"
              onClick={onOpenSoilScience}
              className="px-3 py-1.5 rounded-control border border-transparent hover:border-[#E4DCCB] dark:hover:border-[#283C30] text-xs font-medium text-[#5A6458] dark:text-[#8E9E92] hover:text-[#1F2A22] dark:hover:text-[#EBF2EC] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Soil guide
            </button>
          </div>

          {/* District Dropdown Selector: "Dedza district ▾" */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="px-3 py-1.5 rounded-control bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#1F2A22] dark:hover:border-white text-xs font-medium text-[#1F2A22] dark:text-[#EBF2EC] flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-2xs"
            >
              <span>{selectedDistrict.name} district</span>
              <ChevronDown size={13} className="text-[#5A6458] dark:text-[#8E9E92]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 max-h-64 overflow-y-auto rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] shadow-lg z-50 py-1 text-xs">
                {MALAWI_DISTRICTS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleSelectDistrict(d.id)}
                    className={cn(
                      'w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F6F1E7] dark:hover:bg-[#1F3025] transition-colors cursor-pointer',
                      d.id === selectedDistrictId ? 'font-medium text-[#B4531F] bg-[#F6F1E7] dark:bg-[#1F3025]' : 'text-[#1F2A22] dark:text-[#EBF2EC]'
                    )}
                  >
                    <span>{d.name}</span>
                    {d.id === selectedDistrictId && <Check size={12} className="text-[#B4531F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vector Map Canvas */}
        <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-full max-h-[640px] object-contain"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lake Malawi Azure Silhouette */}
            {lakeMalawiPath && (
              <path
                d={lakeMalawiPath}
                fill="#C8DCE4"
                stroke="#A8C4CE"
                strokeWidth="0.8"
                className="opacity-70 dark:opacity-40"
              />
            )}

            {/* Elevation Contours (if toggled) */}
            {layers.elevation && (
              <g className="opacity-40 dark:opacity-30">
                {contourPaths.map((c, i) => (
                  <path
                    key={i}
                    d={c.pathData}
                    fill="none"
                    stroke="#8B7D6B"
                    strokeWidth="0.6"
                    strokeDasharray="2, 2"
                  />
                ))}
              </g>
            )}

            {/* District Polygons */}
            {districtPaths.map((d) => {
              const isSelected = d.id === selectedDistrictId;
              return (
                <path
                  key={d.id}
                  d={d.pathData}
                  fill={isSelected ? '#EFE7D8' : '#F6F1E7'}
                  stroke={isSelected ? '#1F2A22' : '#E4DCCB'}
                  strokeWidth={isSelected ? '1.5' : '0.8'}
                  onClick={() => handleSelectDistrict(d.id)}
                  className="cursor-pointer transition-colors duration-200 hover:fill-[#EDE6D6] dark:fill-[#121E17] dark:stroke-[#283C30] dark:hover:fill-[#1A2C21]"
                />
              );
            })}

            {/* Reference Markers: Kasungu, Salima, Dedza */}
            {referenceMarkers.map((m) => {
              const isSelected = m.id === selectedDistrictId;
              return (
                <g
                  key={m.id}
                  onClick={() => handleSelectDistrict(m.id)}
                  className="cursor-pointer group"
                >
                  {/* Dashed outer circle */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isSelected ? 16 : 13}
                    fill="none"
                    stroke={isSelected ? '#B4531F' : '#5A6458'}
                    strokeWidth={isSelected ? '1.5' : '1'}
                    strokeDasharray="3, 3"
                    className="transition-all duration-200 group-hover:scale-110"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isSelected ? 3.5 : 2.5}
                    fill={isSelected ? '#B4531F' : '#1F2A22'}
                    className="transition-colors duration-200"
                  />

                  {/* Text label */}
                  <text
                    x={m.cx + (isSelected ? 20 : 16)}
                    y={m.cy + 4}
                    fill={isSelected ? '#1F2A22' : '#5A6458'}
                    fontSize={isSelected ? '12px' : '10.5px'}
                    fontFamily="Segoe UI Variable, system-ui, sans-serif"
                    fontWeight={isSelected ? '600' : '500'}
                    className="transition-all duration-200 dark:fill-[#EBF2EC]"
                  >
                    {m.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom Map Disclaimer Text (from reference design) */}
          <div className="absolute bottom-2 left-4 right-4 text-center pointer-events-none">
            <p className="text-[11px] text-[#5A6458]/80 dark:text-[#8E9E92]/80 font-normal">
              Malawi Department of Climate Change &amp; Meteorological Services (DCCMS) · National Water Resources Authority · Surveyed 2024
            </p>
          </div>
        </div>
      </main>

      {/* ====================================================================
          3. RIGHT INSPECTOR (Matches District map@1x.png)
      ==================================================================== */}
      <aside className="w-full md:w-[280px] shrink-0 border-t md:border-t-0 md:border-l border-[#E4DCCB] dark:border-[#283C30] p-5 flex flex-col gap-5 bg-[#F6F1E7] dark:bg-[#121C16] transition-colors duration-200">
        
        {/* District Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl font-bold text-[#1F2A22] dark:text-[#EBF2EC] leading-tight">
            {selectedDistrict.name}
          </h2>
          <p className="text-xs text-[#5A6458] dark:text-[#8E9E92]">
            {selectedDistrict.region} region
          </p>
        </div>

        {/* Statistics Pills with "Estimate" badges */}
        <div className="flex flex-col gap-2.5">
          {/* Rainfall */}
          <div className="p-3 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-between transition-all duration-200 hover:border-[#C8BFAC] dark:hover:border-[#3E5848]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5A6458] dark:text-[#8E9E92]">Annual rainfall</span>
              <span className="text-sm font-semibold text-[#1F2A22] dark:text-[#EBF2EC]">
                {selectedDistrict.rainfallAnnualMm.toLocaleString()} mm
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#5A6458] dark:text-[#8E9E92] bg-[#F6F1E7] dark:bg-[#121C16] px-2 py-0.5 rounded-full border border-[#E4DCCB] dark:border-[#283C30]">
              Estimate
            </span>
          </div>

          {/* Elevation */}
          <div className="p-3 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-between transition-all duration-200 hover:border-[#C8BFAC] dark:hover:border-[#3E5848]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5A6458] dark:text-[#8E9E92]">Elevation</span>
              <span className="text-sm font-semibold text-[#1F2A22] dark:text-[#EBF2EC]">
                {selectedDistrict.elevationRange ? selectedDistrict.elevationRange.split(' ')[0] : '1,600 m'}
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#5A6458] dark:text-[#8E9E92] bg-[#F6F1E7] dark:bg-[#121C16] px-2 py-0.5 rounded-full border border-[#E4DCCB] dark:border-[#283C30]">
              Estimate
            </span>
          </div>

          {/* Aquifer depth */}
          <div className="p-3 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-between transition-all duration-200 hover:border-[#C8BFAC] dark:hover:border-[#3E5848]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5A6458] dark:text-[#8E9E92]">Aquifer depth</span>
              <span className="text-sm font-semibold text-[#1F2A22] dark:text-[#EBF2EC]">
                {selectedDistrict.aquiferDepth.split('(')[0].trim()}
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#5A6458] dark:text-[#8E9E92] bg-[#F6F1E7] dark:bg-[#121C16] px-2 py-0.5 rounded-full border border-[#E4DCCB] dark:border-[#283C30]">
              Estimate
            </span>
          </div>

          {/* Solar potential */}
          <div className="p-3 rounded-card bg-[#FFFDF8] dark:bg-[#17241C] border border-[#E4DCCB] dark:border-[#283C30] flex items-center justify-between transition-all duration-200 hover:border-[#C8BFAC] dark:hover:border-[#3E5848]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5A6458] dark:text-[#8E9E92]">Solar potential</span>
              <span className="text-sm font-semibold text-[#1F2A22] dark:text-[#EBF2EC]">
                {selectedDistrict.solarKwhDay} kWh/m²
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#5A6458] dark:text-[#8E9E92] bg-[#F6F1E7] dark:bg-[#121C16] px-2 py-0.5 rounded-full border border-[#E4DCCB] dark:border-[#283C30]">
              Estimate
            </span>
          </div>
        </div>

        {/* Buttons: One primary terracotta button per screen */}
        <div className="flex flex-col gap-2 mt-auto pt-4">
          {/* Primary terracotta button: "Open water guide" */}
          <button
            type="button"
            onClick={() => navigate('/skills/ram-pump')}
            className="w-full py-2.5 px-3 rounded-control bg-[#B4531F] hover:bg-[#9c4518] text-white text-xs font-semibold shadow-2xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open water guide</span>
            <ArrowRight size={13} />
          </button>

          {/* Secondary outline button: "Add to site comparison" */}
          <button
            type="button"
            onClick={handleAddToComparison}
            className="w-full py-2 px-3 rounded-control border border-[#E4DCCB] dark:border-[#283C30] hover:border-[#1F2A22] dark:hover:border-white bg-[#FFFDF8] dark:bg-[#17241C] hover:bg-[#F6F1E7] dark:hover:bg-[#1F3025] text-xs font-medium text-[#1F2A22] dark:text-[#EBF2EC] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isAddedToComparison ? (
              <>
                <Check size={13} className="text-[#3F6B4E] dark:text-[#4E8761]" />
                <span className="text-[#3F6B4E] dark:text-[#4E8761]">Added to comparison</span>
              </>
            ) : (
              <span>Add to site comparison</span>
            )}
          </button>
        </div>
      </aside>

    </div>
  );
}
