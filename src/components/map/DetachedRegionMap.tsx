import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mountain,
  Layers,
  Droplets,
  Sprout,
  Route,
  Waves,
  Building2,
  TreePine,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  HardDrive,
  Bookmark,
  BookmarkCheck,
  Copy,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  MapPin,
  X,
  ExternalLink,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DETACHED_REGIONS_DATA,
  DetachedRegionId,
  DetachedRegionDetails,
  projectGeoToRegionSvg,
  regionGeomToSvgPath,
  regionPolygonToSvgPath,
  MountainPeak,
  SoilZone,
  RainfallIsohyet,
  CropHotspot,
  RoadArtery,
  WaterArtery,
  RegionalSettlement,
  ForestConservation
} from '@/data/malawiRegionalDetailData';
import {
  NORTHERN_REGION_GEOMETRIES,
  CENTRAL_REGION_GEOMETRIES,
  SOUTHERN_REGION_GEOMETRIES,
  LAKE_MALAWI_GEOMETRY,
  LAKE_CHILWA_GEOMETRY
} from '@/data/malawiGeoData';
import { isItemBookmarked, toggleOfflineBookmark } from '@/lib/offlineStorage';

export type RegionalMapLayer = 
  | 'all'
  | 'terrain'
  | 'soil'
  | 'rainfall'
  | 'crops'
  | 'roads'
  | 'rivers'
  | 'settlements'
  | 'forests';

export type LayerPreset = 'all' | 'agro' | 'hydro' | 'logistics' | 'eco';

interface DetachedRegionMapProps {
  regionId: DetachedRegionId;
  onSelectRegion?: (regionId: DetachedRegionId) => void;
  onBackToFullCountry?: () => void;
}

export default function DetachedRegionMap({
  regionId,
  onSelectRegion,
  onBackToFullCountry
}: DetachedRegionMapProps) {
  const regionData: DetachedRegionDetails = DETACHED_REGIONS_DATA[regionId] || DETACHED_REGIONS_DATA.central;

  // View mode: 'map' (SVG Cartography) or 'catalog' (Concise Data Matrix)
  const [viewMode, setViewMode] = useState<'map' | 'catalog'>('map');

  // Active layer state & preset
  const [activePreset, setActivePreset] = useState<LayerPreset>('all');
  
  // Layer visibility toggles
  const [visibleLayers, setVisibleLayers] = useState({
    terrain: true,
    soil: true,
    rainfall: true,
    crops: true,
    roads: true,
    rivers: true,
    settlements: true,
    forests: true
  });

  // Selected item inspector state
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'peak' | 'soil' | 'rainfall' | 'crop' | 'road' | 'river' | 'settlement' | 'forest';
    data: any;
  } | null>(null);

  const [hoveredEntity, setHoveredEntity] = useState<{
    type: string;
    title: string;
    subtitle: string;
    metrics?: { label: string; value: string }[];
    x: number;
    y: number;
  } | null>(null);

  const [cursorGeo, setCursorGeo] = useState<{ lat: number; lng: number; estAltitude: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => isItemBookmarked(regionId, 'region'));
  const [dossierCopied, setDossierCopied] = useState<boolean>(false);
  const [itemCopied, setItemCopied] = useState<boolean>(false);
  const [isTheaterFullscreen, setIsTheaterFullscreen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');

  const SVG_W = 760;
  const SVG_H = 640;
  const SVG_PAD = 42;

  // Geometries for current region
  const regionGeometries =
    regionId === 'northern'
      ? NORTHERN_REGION_GEOMETRIES
      : regionId === 'central'
      ? CENTRAL_REGION_GEOMETRIES
      : SOUTHERN_REGION_GEOMETRIES;

  const applyPreset = (preset: LayerPreset) => {
    setActivePreset(preset);
    if (preset === 'all') {
      setVisibleLayers({
        terrain: true,
        soil: true,
        rainfall: true,
        crops: true,
        roads: true,
        rivers: true,
        settlements: true,
        forests: true
      });
    } else if (preset === 'agro') {
      setVisibleLayers({
        terrain: false,
        soil: true,
        rainfall: true,
        crops: true,
        roads: false,
        rivers: true,
        settlements: false,
        forests: false
      });
    } else if (preset === 'hydro') {
      setVisibleLayers({
        terrain: true,
        soil: false,
        rainfall: true,
        crops: false,
        roads: false,
        rivers: true,
        settlements: false,
        forests: false
      });
    } else if (preset === 'logistics') {
      setVisibleLayers({
        terrain: false,
        soil: false,
        rainfall: false,
        crops: true,
        roads: true,
        rivers: false,
        settlements: true,
        forests: false
      });
    } else if (preset === 'eco') {
      setVisibleLayers({
        terrain: true,
        soil: false,
        rainfall: false,
        crops: false,
        roads: false,
        rivers: true,
        settlements: false,
        forests: true
      });
    }
  };

  const toggleLayerVisibility = (layerKey: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      setActivePreset('all'); // Custom combination
      return next;
    });
  };

  const handleBookmarkToggle = () => {
    const updated = toggleOfflineBookmark({
      id: regionData.id,
      type: 'region',
      title: regionData.name
    });
    setIsBookmarked(updated);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - svgRect.left) / svgRect.width;
    const relY = (e.clientY - svgRect.top) / svgRect.height;

    const latSpan = regionData.bounds.maxLat - regionData.bounds.minLat;
    const lngSpan = regionData.bounds.maxLng - regionData.bounds.minLng;

    const lat = regionData.bounds.maxLat - relY * latSpan;
    const lng = regionData.bounds.minLng + relX * lngSpan;

    // Approximate altitude by zone and longitude
    let estAltitude = '1,100m';
    if (lng > 34.1) {
      estAltitude = '500m - 650m (Lake Plain)';
    } else if (lat > -10.8 && lng < 33.9) {
      estAltitude = '1,900m - 2,400m (High Nyika)';
    } else if (lat < -15.8 && lng > 35.3) {
      estAltitude = '1,800m - 2,800m (Mulanje Escarpment)';
    } else {
      estAltitude = '1,050m - 1,450m (Upland Plain)';
    }

    setCursorGeo({
      lat: Number(lat.toFixed(3)),
      lng: Number(lng.toFixed(3)),
      estAltitude
    });
  };

  const copyRegionDossier = () => {
    const text = `
MALAWI DETACHED REGIONAL SCOUTING DOSSIER
===========================================
Region: ${regionData.name} (${regionData.shortName})
Capital & Commerce: ${regionData.adminCapital}
Total Area: ${regionData.areaKm2.toLocaleString()} km²
Population: ${regionData.populationEstimate}
Agro-Suitability Grade: ${regionData.overallAgroSuitability}
Water Independence: ${regionData.waterIndependenceRating}

1. TERRAIN & ALTITUDE
- Zone Type: ${regionData.terrain.zoneType} (${regionData.terrain.altitudeRange})
- Summary: ${regionData.terrain.description}
- Major Peaks: ${regionData.terrain.peaks.map(p => `${p.name} (${p.altitudeMeters}m)`).join(', ')}

2. SOIL & PEDOLOGY
${regionData.soilZones.map(s => `• ${s.name} (${s.phRange}): ${s.texture} - Recommended: ${s.recommendedCrops.join(', ')}`).join('\n')}

3. PRECIPITATION & RAINFALL
${regionData.rainfallZones.map(r => `• ${r.label} [${r.rangeMm}] - Pattern: ${r.rainyPattern}`).join('\n')}

4. MAIN CROPS & PRODUCE
${regionData.mainCrops.map(c => `• ${c.cropName} (${c.category}): Harvest in ${c.harvestWindow} [Suitability: ${c.suitabilityScore}]`).join('\n')}

5. TRANSPORT & ROADS
${regionData.roads.map(r => `• ${r.code} - ${r.name} (${r.surface}): Key Stops -> ${r.keyStops.join(' > ')}`).join('\n')}

6. RIVERS & WATER BODIES
${regionData.rivers.map(w => `• ${w.name} (${w.type}): ${w.flowReliability} -> ${w.irrigationCapacity}`).join('\n')}

7. SETTLEMENTS & AGRO-HUBS
${regionData.settlements.map(st => `• ${st.name} (${st.type}, Pop: ${st.populationEstimate}): Markets on ${st.marketDays}`).join('\n')}

8. FORESTS & CONSERVATION
${regionData.forests.map(f => `• ${f.name} (${f.type}, ${f.hectares}): ${f.ecologicalFunction}`).join('\n')}

HOMESTEAD VERDICT:
"${regionData.homesteadVerdict}"
-------------------------------------------
Generated from Malawi Outpost Permaculture Cartography
    `.trim();

    navigator.clipboard.writeText(text);
    setDossierCopied(true);
    setTimeout(() => setDossierCopied(false), 2500);
  };

  const copySelectedItem = (title: string, summary: string) => {
    navigator.clipboard.writeText(`${title}\n${summary}`);
    setItemCopied(true);
    setTimeout(() => setItemCopied(false), 2000);
  };

  // Compile all entities for quick search and catalog
  const allEntities = [
    ...regionData.terrain.peaks.map(p => ({
      id: `peak-${p.name}`,
      type: 'peak' as const,
      category: 'Mountain Peak',
      name: p.name,
      badge: `${p.altitudeMeters}m Alt`,
      sub: p.description,
      data: p
    })),
    ...regionData.soilZones.map(s => ({
      id: s.id,
      type: 'soil' as const,
      category: 'Soil Zone',
      name: s.name,
      badge: s.phRange,
      sub: `${s.texture} • Fert: ${s.fertility}`,
      data: s
    })),
    ...regionData.rainfallZones.map(r => ({
      id: r.id,
      type: 'rainfall' as const,
      category: 'Rainfall Isohyet',
      name: r.label,
      badge: `${r.annualMmAvg}mm/yr`,
      sub: `Drought Risk: ${r.droughtVulnerability} • ${r.rainyPattern}`,
      data: r
    })),
    ...regionData.mainCrops.map(c => ({
      id: c.id,
      type: 'crop' as const,
      category: 'Crop Hotspot',
      name: c.cropName,
      badge: c.category,
      sub: `${c.chichewaName ? `${c.chichewaName} • ` : ''}Harvest: ${c.harvestWindow} (${c.suitabilityScore})`,
      data: c
    })),
    ...regionData.roads.map(rd => ({
      id: rd.id,
      type: 'road' as const,
      category: 'Road Artery',
      name: `${rd.code} - ${rd.name}`,
      badge: rd.surface.split(' ')[0],
      sub: `Key Corridor: ${rd.keyStops.join(' → ')}`,
      data: rd
    })),
    ...regionData.rivers.map(rv => ({
      id: rv.id,
      type: 'river' as const,
      category: 'River & Basin',
      name: rv.name,
      badge: rv.flowReliability.split(' ')[0],
      sub: rv.irrigationCapacity,
      data: rv
    })),
    ...regionData.settlements.map(st => ({
      id: st.id,
      type: 'settlement' as const,
      category: 'Settlement Hub',
      name: st.name,
      badge: st.type.split('/')[0].trim(),
      sub: `Pop: ${st.populationEstimate} • Market: ${st.marketDays}`,
      data: st
    })),
    ...regionData.forests.map(f => ({
      id: f.id,
      type: 'forest' as const,
      category: 'Forest Reserve',
      name: f.name,
      badge: f.hectares,
      sub: f.ecologicalFunction,
      data: f
    }))
  ];

  // Filtered entities based on search term & category filter
  const filteredEntities = allEntities.filter(e => {
    const matchesSearch = !searchTerm.trim() ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.sub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.badge.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      catalogCategory === 'all' ||
      (catalogCategory === 'peaks' && e.type === 'peak') ||
      (catalogCategory === 'soils' && e.type === 'soil') ||
      (catalogCategory === 'rainfall' && e.type === 'rainfall') ||
      (catalogCategory === 'crops' && e.type === 'crop') ||
      (catalogCategory === 'roads' && e.type === 'road') ||
      (catalogCategory === 'rivers' && e.type === 'river') ||
      (catalogCategory === 'settlements' && e.type === 'settlement') ||
      (catalogCategory === 'forests' && e.type === 'forest');

    return matchesSearch && matchesCategory;
  });

  const selectAndLocateEntity = (entity: typeof allEntities[0]) => {
    setSelectedEntity({ type: entity.type, data: entity.data });
    setViewMode('map');
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 transition-all duration-300",
        isTheaterFullscreen
          ? "fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 overflow-y-auto text-white"
          : "bg-white/40 backdrop-blur-md p-4 md:p-8 rounded-[3rem] border border-white/80 shadow-2xl"
      )}
    >
      {/* Detached Region Navigation Header & Switcher */}
      <div className="flex flex-col gap-4 border-b border-emerald-800/40 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onBackToFullCountry && (
              <button
                onClick={onBackToFullCountry}
                className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-emerald-300 shadow-sm"
              >
                <ArrowLeft size={14} />
                <span>Full Malawi Overview</span>
              </button>
            )}
            <span className="text-amber-800 font-extrabold uppercase text-caption tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
              <Sparkles size={11} className="text-amber-600" /> Detached Micro-Cartography View
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-caption font-black uppercase px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <HardDrive size={10} /> 100% Offline Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkToggle}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm",
                isBookmarked
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-black"
                  : "bg-white text-emerald-900 border-slate-200 hover:bg-emerald-50"
              )}
            >
              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              <span>{isBookmarked ? 'Bookmarked' : 'Save Region'}</span>
            </button>

            <button
              onClick={copyRegionDossier}
              className="px-3.5 py-1.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 shadow-sm"
            >
              {dossierCopied ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{dossierCopied ? 'Dossier Copied!' : 'Copy Dossier'}</span>
            </button>

            <button
              onClick={() => setIsTheaterFullscreen(!isTheaterFullscreen)}
              className="p-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all border border-emerald-600 shadow-sm"
              title={isTheaterFullscreen ? "Exit Theater Mode" : "Expand Fullscreen Theater Mode"}
            >
              {isTheaterFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Region Switcher Pills & Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className={cn("serif text-3xl md:text-4xl font-bold", isTheaterFullscreen ? "text-white" : "text-emerald-950")}>
                {regionData.name}
              </h2>
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-800 text-emerald-100 border border-emerald-700">
                {regionData.overallAgroSuitability}
              </span>
            </div>
            <p className={cn("text-xs md:text-sm font-medium mt-1", isTheaterFullscreen ? "text-slate-300" : "text-slate-600")}>
              {regionData.tagline} • Admin Capital: <strong>{regionData.adminCapital}</strong> ({regionData.areaKm2.toLocaleString()} km²)
            </p>
          </div>

          {/* Region Switcher Tabs */}
          {onSelectRegion && (
            <div className="flex items-center bg-slate-900/10 p-1.5 rounded-2xl border border-slate-300/40 shrink-0 gap-1">
              {(['northern', 'central', 'southern'] as DetachedRegionId[]).map((rId) => {
                const isCur = regionId === rId;
                const rInfo = DETACHED_REGIONS_DATA[rId];
                return (
                  <button
                    key={rId}
                    onClick={() => {
                      setSelectedEntity(null);
                      onSelectRegion(rId);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                      isCur
                        ? "bg-emerald-800 text-white shadow-md scale-102"
                        : "text-slate-700 hover:text-emerald-950 hover:bg-white/60"
                    )}
                  >
                    {rId === 'northern' && <Mountain size={13} />}
                    {rId === 'central' && <Sprout size={13} />}
                    {rId === 'southern' && <TreePine size={13} />}
                    <span>{rInfo.shortName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* SEARCH, EXPLORATION MODE & PRESET TOOLBAR */}
      <div className="bg-white/85 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3.5 text-slate-900">
        
        {/* Top bar: Mode Toggle & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Dual Exploration Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                viewMode === 'map'
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-950"
              )}
            >
              <Compass size={14} className="text-amber-400" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setViewMode('catalog')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                viewMode === 'catalog'
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-950"
              )}
            >
              <FileText size={14} className="text-emerald-400" />
              <span>Concise Catalog ({filteredEntities.length})</span>
            </button>
          </div>

          {/* Quick Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${regionData.name} crops, soils, rivers, roads, towns...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Layer Quick Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-caption font-black uppercase tracking-wider text-slate-400">
              Layer Presets:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => applyPreset('all')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-caption font-black uppercase tracking-wider transition-all flex items-center gap-1",
                  activePreset === 'all'
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Sparkles size={11} className={activePreset === 'all' ? "text-amber-300" : "text-slate-500"} />
                <span>All Layers</span>
              </button>
              <button
                onClick={() => applyPreset('agro')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-caption font-black uppercase tracking-wider transition-all flex items-center gap-1",
                  activePreset === 'agro'
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Sprout size={11} className={activePreset === 'agro' ? "text-emerald-300" : "text-slate-500"} />
                <span>Agro & Soils</span>
              </button>
              <button
                onClick={() => applyPreset('hydro')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-caption font-black uppercase tracking-wider transition-all flex items-center gap-1",
                  activePreset === 'hydro'
                    ? "bg-sky-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Droplets size={11} className={activePreset === 'hydro' ? "text-sky-300" : "text-slate-500"} />
                <span>Water & Hydrology</span>
              </button>
              <button
                onClick={() => applyPreset('logistics')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-caption font-black uppercase tracking-wider transition-all flex items-center gap-1",
                  activePreset === 'logistics'
                    ? "bg-amber-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Route size={11} className={activePreset === 'logistics' ? "text-amber-300" : "text-slate-500"} />
                <span>Logistics & Corridors</span>
              </button>
              <button
                onClick={() => applyPreset('eco')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-caption font-black uppercase tracking-wider transition-all flex items-center gap-1",
                  activePreset === 'eco'
                    ? "bg-teal-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <TreePine size={11} className={activePreset === 'eco' ? "text-teal-300" : "text-slate-500"} />
                <span>Eco & Forests</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 text-caption font-bold text-slate-500">
            <span>{allEntities.length} Features Mapped</span>
          </div>
        </div>

        {/* Individual Layer Toggle Pills with Counts */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => toggleLayerVisibility('terrain')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.terrain
                ? "bg-amber-50 text-amber-950 border-amber-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.terrain ? <Eye size={12} className="text-amber-700" /> : <EyeOff size={12} />}
            <Mountain size={12} className="text-amber-700 shrink-0" />
            <span>Peaks ({regionData.terrain.peaks.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('soil')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.soil
                ? "bg-amber-100/70 text-amber-950 border-amber-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.soil ? <Eye size={12} className="text-amber-800" /> : <EyeOff size={12} />}
            <Layers size={12} className="text-amber-800 shrink-0" />
            <span>Soils ({regionData.soilZones.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('rainfall')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.rainfall
                ? "bg-sky-50 text-sky-950 border-sky-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.rainfall ? <Eye size={12} className="text-sky-700" /> : <EyeOff size={12} />}
            <Droplets size={12} className="text-sky-700 shrink-0" />
            <span>Rainfall ({regionData.rainfallZones.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('crops')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.crops
                ? "bg-emerald-50 text-emerald-950 border-emerald-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.crops ? <Eye size={12} className="text-emerald-700" /> : <EyeOff size={12} />}
            <Sprout size={12} className="text-emerald-700 shrink-0" />
            <span>Crops ({regionData.mainCrops.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('roads')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.roads
                ? "bg-amber-50 text-amber-950 border-amber-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.roads ? <Eye size={12} className="text-amber-700" /> : <EyeOff size={12} />}
            <Route size={12} className="text-amber-700 shrink-0" />
            <span>Roads ({regionData.roads.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('rivers')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.rivers
                ? "bg-cyan-50 text-cyan-950 border-cyan-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.rivers ? <Eye size={12} className="text-cyan-700" /> : <EyeOff size={12} />}
            <Waves size={12} className="text-cyan-700 shrink-0" />
            <span>Rivers ({regionData.rivers.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('settlements')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.settlements
                ? "bg-indigo-50 text-indigo-950 border-indigo-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.settlements ? <Eye size={12} className="text-indigo-700" /> : <EyeOff size={12} />}
            <Building2 size={12} className="text-indigo-700 shrink-0" />
            <span>Towns ({regionData.settlements.length})</span>
          </button>

          <button
            onClick={() => toggleLayerVisibility('forests')}
            className={cn(
              "px-2.5 py-1 rounded-xl text-caption font-bold transition-all flex items-center gap-1.5 border",
              visibleLayers.forests
                ? "bg-teal-50 text-teal-950 border-teal-300 shadow-xs"
                : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
            )}
          >
            {visibleLayers.forests ? <Eye size={12} className="text-teal-700" /> : <EyeOff size={12} />}
            <TreePine size={12} className="text-teal-700 shrink-0" />
            <span>Forests ({regionData.forests.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE MAP CANVAS + INSPECTOR PANEL */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Vector SVG Canvas Column */}
          <div className="lg:col-span-8 bg-emerald-950 rounded-[2.5rem] p-4 md:p-6 border border-emerald-800/90 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[640px]">
            
            {/* Subtle Canvas Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e3a29_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Viewport Floating Top Status Bar */}
            <div className="relative z-10 flex items-center justify-between text-white bg-emerald-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-700/60 text-xs shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-extrabold uppercase tracking-wider text-amber-300 text-caption">
                  {regionData.name} Cartography • Scale 1:{regionId === 'northern' ? '350k' : '450k'}
                </span>
              </div>

              {/* Quick Zoom Tools */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.2))}
                  className="p-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-white transition-all"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
                  className="p-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-white transition-all"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-white transition-all"
                  title="Reset Zoom"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* High-Resolution SVG Canvas Viewport */}
            <div className="relative w-full h-[540px] md:h-[590px] my-3 flex items-center justify-center overflow-hidden rounded-2xl">
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                onMouseMove={handleSvgMouseMove}
                onMouseLeave={() => setCursorGeo(null)}
                className="w-full h-full drop-shadow-2xl transition-transform duration-500 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <defs>
                  <filter id="r-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  <linearGradient id="rLakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                  </linearGradient>

                  <pattern id="rTopoPattern" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 0 14 Q 7 7, 14 14 T 28 14" fill="none" stroke="#34d399" strokeWidth="0.7" opacity="0.18" />
                    <path d="M 0 24 Q 7 17, 14 24 T 28 24" fill="none" stroke="#6ee7b7" strokeWidth="0.4" opacity="0.12" />
                  </pattern>
                </defs>

                {/* 1. DETACHED REGION BASE DISTRICT BOUNDARIES */}
                <g className="transition-all duration-300">
                  {regionGeometries.map((geom, idx) => (
                    <path
                      key={`detached-geom-${idx}`}
                      d={regionGeomToSvgPath(geom, regionData.bounds, SVG_W, SVG_H, SVG_PAD)}
                      fill={
                        regionId === 'northern' ? '#064e3b' :
                        regionId === 'central' ? '#065f46' : '#047857'
                      }
                      stroke="#10b981"
                      strokeWidth="1.8"
                      className="opacity-95 drop-shadow-md"
                    />
                  ))}

                  {/* Topographic pattern overlay */}
                  {regionGeometries.map((geom, idx) => (
                    <path
                      key={`detached-topo-${idx}`}
                      d={regionGeomToSvgPath(geom, regionData.bounds, SVG_W, SVG_H, SVG_PAD)}
                      fill="url(#rTopoPattern)"
                      className="pointer-events-none"
                    />
                  ))}
                </g>

                {/* 2. ADJACENT LAKE MALAWI SHORELINE / WATER */}
                <g opacity="0.9">
                  <path
                    d={regionGeomToSvgPath(LAKE_MALAWI_GEOMETRY, regionData.bounds, SVG_W, SVG_H, SVG_PAD)}
                    fill="url(#rLakeGradient)"
                    stroke="#38bdf8"
                    strokeWidth="1.4"
                    className="drop-shadow-sm"
                  />
                  {LAKE_CHILWA_GEOMETRY && regionId === 'southern' && (
                    <path
                      d={regionGeomToSvgPath(LAKE_CHILWA_GEOMETRY, regionData.bounds, SVG_W, SVG_H, SVG_PAD)}
                      fill="url(#rLakeGradient)"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      className="drop-shadow-sm"
                    />
                  )}
                </g>

                {/* 3. SOIL TYPE ZONES OVERLAY (LAYER 2) */}
                {visibleLayers.soil && (
                  <g className="transition-all duration-500">
                    {regionData.soilZones.map((soil) => {
                      const isSelected = selectedEntity?.type === 'soil' && selectedEntity.data.id === soil.id;
                      const pathD = regionPolygonToSvgPath(soil.polygon, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                      return (
                        <g key={soil.id} className="cursor-pointer group">
                          <path
                            d={pathD}
                            fill={soil.color}
                            fillOpacity={isSelected ? 0.65 : 0.35}
                            stroke={soil.color}
                            strokeWidth={isSelected ? 3 : 1.5}
                            onClick={() => setSelectedEntity({ type: 'soil', data: soil })}
                            onMouseEnter={() => setHoveredEntity({
                              type: 'Soil Classification',
                              title: soil.name,
                              subtitle: `${soil.classification} • ${soil.phRange}`,
                              x: 0,
                              y: 0
                            })}
                            onMouseLeave={() => setHoveredEntity(null)}
                            className="transition-all hover:fill-opacity-60"
                          />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 4. RAINFALL ISOHYETS OVERLAY (LAYER 3) */}
                {visibleLayers.rainfall && (
                  <g className="transition-all duration-500 pointer-events-auto">
                    {regionData.rainfallZones.map((rain) => {
                      const isSelected = selectedEntity?.type === 'rainfall' && selectedEntity.data.id === rain.id;
                      const pathD = regionPolygonToSvgPath(rain.polygon, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                      return (
                        <path
                          key={rain.id}
                          d={pathD}
                          fill={rain.color}
                          fillOpacity={isSelected ? 0.55 : 0.22}
                          stroke={rain.color}
                          strokeWidth={isSelected ? 2.5 : 1.2}
                          strokeDasharray="6,4"
                          onClick={() => setSelectedEntity({ type: 'rainfall', data: rain })}
                          onMouseEnter={() => setHoveredEntity({
                            type: 'Rainfall Isohyet Zone',
                            title: rain.label,
                            subtitle: `${rain.rangeMm} • Drought Risk: ${rain.droughtVulnerability}`,
                            x: 0,
                            y: 0
                          })}
                          onMouseLeave={() => setHoveredEntity(null)}
                          className="cursor-pointer transition-all hover:fill-opacity-50"
                        />
                      );
                    })}
                  </g>
                )}

                {/* 5. FORESTS & PROTECTED RESERVES (LAYER 8) */}
                {visibleLayers.forests && (
                  <g className="transition-all duration-500">
                    {regionData.forests.map((forest) => {
                      const isSelected = selectedEntity?.type === 'forest' && selectedEntity.data.id === forest.id;
                      const polyPath = regionPolygonToSvgPath(forest.polygon, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                      const centerPos = projectGeoToRegionSvg(forest.lat, forest.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);

                      return (
                        <g key={forest.id} className="cursor-pointer group">
                          <path
                            d={polyPath}
                            fill="#15803d"
                            fillOpacity={isSelected ? 0.7 : 0.4}
                            stroke="#22c55e"
                            strokeWidth={isSelected ? 2.5 : 1.2}
                            onClick={() => setSelectedEntity({ type: 'forest', data: forest })}
                            onMouseEnter={() => setHoveredEntity({
                              type: forest.type,
                              title: forest.name,
                              subtitle: `${forest.hectares} • ${forest.conservationStatus}`,
                              x: centerPos.x,
                              y: centerPos.y
                            })}
                            onMouseLeave={() => setHoveredEntity(null)}
                            className="transition-all hover:fill-opacity-65"
                          />
                          {/* Forest Icon Marker */}
                          <g
                            transform={`translate(${centerPos.x}, ${centerPos.y})`}
                            onClick={() => setSelectedEntity({ type: 'forest', data: forest })}
                          >
                            <circle cx="0" cy="0" r="13" fill="#042f2e" stroke="#22c55e" strokeWidth="1.5" />
                            <text x="0" y="4" fill="#86efac" fontSize="11" textAnchor="middle">🌲</text>
                            <text x="0" y="16" fill="#bbf7d0" fontSize="8" fontWeight="800" textAnchor="middle" className="drop-shadow-md">
                              {forest.name.split(' ')[0]}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 6. RIVERS & WATER BODIES (LAYER 6) */}
                {visibleLayers.rivers && (
                  <g className="transition-all duration-500">
                    {regionData.rivers.map((river) => {
                      const isSelected = selectedEntity?.type === 'river' && selectedEntity.data.id === river.id;
                      const pathD = river.points
                        .map((pt, idx) => {
                          const { x, y } = projectGeoToRegionSvg(pt.lat, pt.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ');
                      
                      const midPt = river.points[Math.floor(river.points.length / 2)];
                      const midSvg = projectGeoToRegionSvg(midPt.lat, midPt.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);

                      return (
                        <g key={river.id} className="cursor-pointer group">
                          <path
                            d={pathD}
                            stroke="transparent"
                            strokeWidth="16"
                            fill="none"
                            onClick={() => setSelectedEntity({ type: 'river', data: river })}
                          />
                          <path
                            d={pathD}
                            stroke={isSelected ? "#38bdf8" : "#0284c7"}
                            strokeWidth={isSelected ? 4.5 : 3}
                            strokeDasharray={river.name.includes('Falls') ? '2,2' : 'none'}
                            fill="none"
                            onClick={() => setSelectedEntity({ type: 'river', data: river })}
                            onMouseEnter={() => setHoveredEntity({
                              type: river.type,
                              title: river.name,
                              subtitle: `${river.flowReliability} • ${river.irrigationCapacity.substring(0, 45)}...`,
                              x: midSvg.x,
                              y: midSvg.y
                            })}
                            onMouseLeave={() => setHoveredEntity(null)}
                            className="drop-shadow-md transition-all group-hover:stroke-sky-300"
                          />
                          <text
                            x={midSvg.x + 6}
                            y={midSvg.y - 4}
                            fill="#7dd3fc"
                            fontSize="9"
                            fontWeight="800"
                            className="drop-shadow-md pointer-events-none select-none"
                          >
                            💧 {river.name.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 7. MAIN ROADS NETWORK (LAYER 5) */}
                {visibleLayers.roads && (
                  <g className="transition-all duration-500">
                    {regionData.roads.map((road) => {
                      const isSelected = selectedEntity?.type === 'road' && selectedEntity.data.id === road.id;
                      const pathD = road.points
                        .map((pt, idx) => {
                          const { x, y } = projectGeoToRegionSvg(pt.lat, pt.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ');
                      
                      const midPt = road.points[Math.floor(road.points.length / 2)];
                      const midSvg = projectGeoToRegionSvg(midPt.lat, midPt.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);

                      return (
                        <g key={road.id} className="cursor-pointer group">
                          <path
                            d={pathD}
                            stroke="transparent"
                            strokeWidth="18"
                            fill="none"
                            onClick={() => setSelectedEntity({ type: 'road', data: road })}
                          />
                          <path
                            d={pathD}
                            stroke={road.color}
                            strokeWidth={isSelected ? 4.5 : road.code === 'M1' ? 3.5 : 2.8}
                            strokeDasharray={road.surface.includes('Gravel') ? '6,3' : 'none'}
                            fill="none"
                            onClick={() => setSelectedEntity({ type: 'road', data: road })}
                            onMouseEnter={() => setHoveredEntity({
                              type: road.surface,
                              title: `${road.code} - ${road.name}`,
                              subtitle: `Key Corridor: ${road.keyStops.join(' → ')}`,
                              x: midSvg.x,
                              y: midSvg.y
                            })}
                            onMouseLeave={() => setHoveredEntity(null)}
                            className="drop-shadow-md transition-all group-hover:brightness-125"
                          />
                          <g
                            transform={`translate(${midSvg.x}, ${midSvg.y})`}
                            onClick={() => setSelectedEntity({ type: 'road', data: road })}
                          >
                            <rect x="-14" y="-8" width="28" height="15" rx="4" fill="#042f2e" stroke={road.color} strokeWidth="1.2" />
                            <text x="0" y="3" fill={road.color} fontSize="9" fontWeight="900" textAnchor="middle">{road.code}</text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 8. TERRAIN MOUNTAIN PEAKS & ESCARPMENTS (LAYER 1) */}
                {visibleLayers.terrain && (
                  <g className="transition-all duration-500">
                    {regionData.terrain.peaks.map((peak) => {
                      const isSelected = selectedEntity?.type === 'peak' && selectedEntity.data.name === peak.name;
                      const { x, y } = projectGeoToRegionSvg(peak.lat, peak.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);

                      return (
                        <g
                          key={peak.name}
                          className="cursor-pointer group"
                          onClick={() => setSelectedEntity({ type: 'peak', data: peak })}
                          onMouseEnter={() => setHoveredEntity({
                            type: 'Mountain Peak Elevation',
                            title: peak.name,
                            subtitle: `${peak.altitudeMeters}m Altitude • ${peak.description}`,
                            x,
                            y
                          })}
                          onMouseLeave={() => setHoveredEntity(null)}
                        >
                          <path
                            d={`M ${x - 9} ${y + 7} L ${x} ${y - 9} L ${x + 9} ${y + 7} Z`}
                            fill={isSelected ? "#f59e0b" : "#d97706"}
                            stroke="#ffffff"
                            strokeWidth={isSelected ? 2 : 1.2}
                            className="drop-shadow-md transition-transform group-hover:scale-125"
                          />
                          <g transform={`translate(${x}, ${y + 18})`}>
                            <rect x="-30" y="-7" width="60" height="14" rx="4" fill="#042f2e" stroke="#fbbf24" strokeWidth="1" opacity="0.95" />
                            <text x="0" y="3" fill="#fde68a" fontSize="8" fontWeight="900" textAnchor="middle">
                              {peak.name.split(' ')[0]} • {peak.altitudeMeters}m
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 9. MAIN CROPS HOTSPOTS (LAYER 4) */}
                {visibleLayers.crops && (
                  <g className="transition-all duration-500">
                    {regionData.mainCrops.map((crop) => {
                      const isSelected = selectedEntity?.type === 'crop' && selectedEntity.data.id === crop.id;
                      const { x, y } = projectGeoToRegionSvg(crop.lat, crop.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);

                      return (
                        <g
                          key={crop.id}
                          className="cursor-pointer group"
                          onClick={() => setSelectedEntity({ type: 'crop', data: crop })}
                          onMouseEnter={() => setHoveredEntity({
                            type: crop.category,
                            title: crop.cropName,
                            subtitle: `${crop.chichewaName || ''} • Harvest: ${crop.harvestWindow} • ${crop.suitabilityScore}`,
                            x,
                            y
                          })}
                          onMouseLeave={() => setHoveredEntity(null)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 16 : 13}
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth={isSelected ? 2.5 : 1.5}
                            className="drop-shadow-md transition-transform group-hover:scale-125"
                          />
                          <text x={x} y={y + 4} fontSize="11" textAnchor="middle">🌱</text>
                          <text
                            x={x}
                            y={y - 15}
                            fill="#a7f3d0"
                            fontSize="8"
                            fontWeight="800"
                            textAnchor="middle"
                            className="drop-shadow-md pointer-events-none select-none"
                          >
                            {crop.cropName.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* 10. SETTLEMENTS & AGRO-HUBS (LAYER 7) */}
                {visibleLayers.settlements && (
                  <g className="transition-all duration-500">
                    {regionData.settlements.map((settlement) => {
                      const isSelected = selectedEntity?.type === 'settlement' && selectedEntity.data.id === settlement.id;
                      const { x, y } = projectGeoToRegionSvg(settlement.lat, settlement.lng, regionData.bounds, SVG_W, SVG_H, SVG_PAD);
                      const isMajorCity = settlement.type.includes('City');

                      return (
                        <g
                          key={settlement.id}
                          className="cursor-pointer group"
                          onClick={() => setSelectedEntity({ type: 'settlement', data: settlement })}
                          onMouseEnter={() => setHoveredEntity({
                            type: settlement.type,
                            title: settlement.name,
                            subtitle: `Pop: ${settlement.populationEstimate} • Market Days: ${settlement.marketDays}`,
                            x,
                            y
                          })}
                          onMouseLeave={() => setHoveredEntity(null)}
                        >
                          <rect
                            x={x - (isMajorCity ? 7 : 5)}
                            y={y - (isMajorCity ? 7 : 5)}
                            width={isMajorCity ? 14 : 10}
                            height={isMajorCity ? 14 : 10}
                            fill={isMajorCity ? "#f59e0b" : "#fbbf24"}
                            stroke="#ffffff"
                            strokeWidth={isSelected ? 2.5 : 1.5}
                            transform={`rotate(45 ${x} ${y})`}
                            className="transition-transform group-hover:scale-125 drop-shadow-md"
                          />
                          <text
                            x={x + 10}
                            y={y + 3}
                            fill={isSelected ? "#fef08a" : isMajorCity ? "#ffffff" : "#cbd5e1"}
                            fontSize={isMajorCity ? "10" : "8"}
                            fontWeight={isMajorCity ? "900" : "700"}
                            className="drop-shadow-md pointer-events-none select-none uppercase tracking-tight"
                          >
                            {settlement.name} {isMajorCity ? '★' : ''}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* COMPASS ROSE */}
                <g transform={`translate(${SVG_W - 45}, 48)`} className="pointer-events-none select-none opacity-85">
                  <circle cx="0" cy="0" r="18" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
                  <path d="M 0 0 L -4 0 L 0 -14 L 4 0 Z" fill="#ef4444" />
                  <path d="M 0 0 L -4 0 L 0 14 L 4 0 Z" fill="#94a3b8" />
                  <text x="0" y="-17" fill="#ef4444" fontSize="8" fontWeight="900" textAnchor="middle">N</text>
                </g>

                {/* SCALE BAR */}
                <g transform={`translate(28, ${SVG_H - 28})`} className="pointer-events-none select-none opacity-85">
                  <rect x="-4" y="-14" width="90" height="20" rx="4" fill="#042f2e" stroke="#0d9488" strokeWidth="1" />
                  <line x1="6" y1="0" x2="78" y2="0" stroke="#34d399" strokeWidth="2" />
                  <line x1="6" y1="-3" x2="6" y2="3" stroke="#34d399" strokeWidth="2" />
                  <line x1="42" y1="-2" x2="42" y2="2" stroke="#34d399" strokeWidth="1.5" />
                  <line x1="78" y1="-3" x2="78" y2="3" stroke="#34d399" strokeWidth="2" />
                  <text x="6" y="-5" fill="#a7f3d0" fontSize="7" fontWeight="bold">0</text>
                  <text x="42" y="-5" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">15km</text>
                  <text x="78" y="-5" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">30km</text>
                </g>
              </svg>

              {/* LIVE CURSOR TELEMETRY BADGE */}
              {cursorGeo && (
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-caption text-emerald-200 pointer-events-none shadow-lg flex items-center gap-2">
                  <MapPin size={11} className="text-amber-400" />
                  <span>{cursorGeo.lat}° S, {cursorGeo.lng}° E</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-amber-300 font-bold">{cursorGeo.estAltitude}</span>
                </div>
              )}

              {/* FLOATING HOVER CARD */}
              <AnimatePresence>
                {hoveredEntity && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/90 text-white p-3.5 rounded-2xl border border-emerald-500/60 shadow-2xl backdrop-blur-md z-30 pointer-events-none"
                  >
                    <div className="flex items-center gap-1.5 text-caption font-black uppercase tracking-wider text-amber-400">
                      <Sparkles size={11} /> {hoveredEntity.type}
                    </div>
                    <h5 className="serif text-base font-bold text-white mt-0.5">{hoveredEntity.title}</h5>
                    <p className="text-xs text-emerald-200 mt-0.5 leading-snug">{hoveredEntity.subtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Canvas Bottom Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-caption text-emerald-200 bg-emerald-900/80 px-4 py-2.5 rounded-xl border border-emerald-700/60">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> M1 Highway</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> Perennial River</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Main Crops</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Forest Reserve</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Mountain Peak</span>
              </div>
              <span className="text-amber-300 font-bold">Click any element on the map to inspect concise dossier</span>
            </div>
          </div>

          {/* DETACHED REGIONAL TELEMETRY & INSPECTION PANEL (4 columns on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Selected Entity Deep-Dive Card */}
            <AnimatePresence mode="wait">
              {selectedEntity ? (
                <motion.div
                  key={`entity-${selectedEntity.type}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-900 text-white p-5 md:p-6 rounded-[2.5rem] border border-emerald-700 shadow-2xl flex flex-col gap-4 relative"
                >
                  <button
                    onClick={() => setSelectedEntity(null)}
                    className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800"
                    title="Close Inspector"
                  >
                    <X size={16} />
                  </button>

                  <div className="flex items-center justify-between pr-8">
                    <span className="text-caption font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-emerald-800 text-amber-300 border border-emerald-700">
                      {selectedEntity.type.toUpperCase()} DOSSIER
                    </span>
                    <button
                      onClick={() => copySelectedItem(selectedEntity.data.name || selectedEntity.data.label || selectedEntity.data.cropName, JSON.stringify(selectedEntity.data))}
                      className="text-caption text-emerald-300 hover:text-white flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800"
                    >
                      <Copy size={10} />
                      <span>{itemCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Peak Details */}
                  {selectedEntity.type === 'peak' && (() => {
                    const p: MountainPeak = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Mountain size={20} className="text-amber-400" /> {p.name}
                        </h4>
                        
                        {/* 3-cell metric tiles */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Altitude</span>
                            <span className="font-black text-amber-300 text-sm">{p.altitudeMeters}m</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Imperial</span>
                            <span className="font-bold text-white text-xs">{Math.round(p.altitudeMeters * 3.28084)} ft</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Relief</span>
                            <span className="font-bold text-emerald-200 text-xs">Alpine</span>
                          </div>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-xs">{p.description}</p>
                        
                        <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800 text-caption text-emerald-200">
                          <strong className="text-amber-300 block mb-1">Permaculture Insight:</strong>
                          High chill hours and cool nocturnal temperatures create prime niches for apples, pears, and specialty Arabica coffee micro-lots.
                        </div>
                      </div>
                    );
                  })()}

                  {/* Soil Details */}
                  {selectedEntity.type === 'soil' && (() => {
                    const s: SoilZone = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Layers size={18} className="text-amber-400" /> {s.name}
                        </h4>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">pH Range</span>
                            <span className="font-black text-amber-300 text-xs">{s.phRange}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Fertility</span>
                            <span className="font-bold text-white text-xs">{s.fertility}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Texture</span>
                            <span className="font-bold text-emerald-200 text-caption">{s.texture.split(' ')[0]}</span>
                          </div>
                        </div>

                        <div className="flex justify-between border-b border-emerald-800/80 pb-1.5 text-caption">
                          <span className="text-emerald-300">Classification:</span>
                          <span className="font-bold text-white">{s.classification}</span>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{s.notes}</p>
                        
                        <div>
                          <span className="text-caption uppercase font-black tracking-wider text-amber-400 block mb-1.5">
                            Recommended Crops:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {s.recommendedCrops.map(c => (
                              <span key={c} className="bg-emerald-950 px-2 py-0.5 rounded-md text-caption font-bold text-emerald-200 border border-emerald-800">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Rainfall Details */}
                  {selectedEntity.type === 'rainfall' && (() => {
                    const r: RainfallIsohyet = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Droplets size={18} className="text-sky-400" /> {r.label}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Annual Average</span>
                            <span className="font-black text-sky-300 text-sm">{r.annualMmAvg} mm</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Drought Risk</span>
                            <span className="font-bold text-white text-xs">{r.droughtVulnerability}</span>
                          </div>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{r.rainyPattern}</p>
                        
                        <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800 text-caption text-emerald-200">
                          <strong className="text-sky-300 block mb-1">Water Strategy:</strong>
                          Pair on-contour swales with keyline ponds to recharge the subsoil sponge during torrential rains.
                        </div>
                      </div>
                    );
                  })()}

                  {/* Crop Details */}
                  {selectedEntity.type === 'crop' && (() => {
                    const c: CropHotspot = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Sprout size={18} className="text-emerald-400" /> {c.cropName}
                        </h4>
                        {c.chichewaName && (
                          <span className="text-emerald-300 font-semibold italic -mt-2">Chichewa: {c.chichewaName}</span>
                        )}
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Category</span>
                            <span className="font-bold text-white text-caption">{c.category.split(' ')[0]}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Harvest</span>
                            <span className="font-bold text-amber-300 text-caption">{c.harvestWindow.split('–')[0]}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Suitability</span>
                            <span className="font-bold text-emerald-300 text-caption">{c.suitabilityScore}</span>
                          </div>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{c.notes}</p>
                      </div>
                    );
                  })()}

                  {/* Road Details */}
                  {selectedEntity.type === 'road' && (() => {
                    const rd: RoadArtery = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Route size={18} className="text-amber-400" /> {rd.code} - {rd.name}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Surface</span>
                            <span className="font-bold text-white text-xs">{rd.surface.split(' ')[0]}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Accessibility</span>
                            <span className="font-bold text-amber-300 text-xs">All-Weather</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 border-b border-emerald-800 pb-2 text-caption">
                          <span className="text-emerald-300 font-bold">Transit Corridor:</span>
                          <span className="text-amber-200">{rd.keyStops.join(' → ')}</span>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{rd.freightSuitability}</p>
                      </div>
                    );
                  })()}

                  {/* River Details */}
                  {selectedEntity.type === 'river' && (() => {
                    const rv: WaterArtery = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Waves size={18} className="text-cyan-400" /> {rv.name}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Flow Type</span>
                            <span className="font-bold text-cyan-300 text-xs">{rv.flowReliability.split(' ')[0]}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Hydrology</span>
                            <span className="font-bold text-white text-xs">{rv.type.split(' ')[0]}</span>
                          </div>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{rv.notes}</p>
                        
                        <div className="bg-emerald-950/90 p-3 rounded-xl border border-emerald-800 text-caption text-emerald-200">
                          <strong className="text-cyan-300 block mb-1">Irrigation Potential:</strong>
                          {rv.irrigationCapacity}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Settlement Details */}
                  {selectedEntity.type === 'settlement' && (() => {
                    const st: RegionalSettlement = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <Building2 size={18} className="text-amber-400" /> {st.name}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Hierarchy</span>
                            <span className="font-bold text-white text-xs">{st.type.split('/')[0]}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Population</span>
                            <span className="font-bold text-amber-300 text-xs">{st.populationEstimate}</span>
                          </div>
                        </div>

                        <div className="flex justify-between border-b border-emerald-800 pb-1.5 text-caption">
                          <span className="text-emerald-300 font-bold">Market Days:</span>
                          <span className="font-bold text-emerald-200">{st.marketDays}</span>
                        </div>

                        <div>
                          <span className="text-caption uppercase font-black tracking-wider text-amber-400 block mb-1.5">
                            Hardware & Rural Services:
                          </span>
                          <ul className="flex flex-col gap-1 text-caption text-emerald-100">
                            {st.keyAgroServices.map(srv => (
                              <li key={srv} className="flex items-center gap-1.5">
                                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                                <span>{srv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Forest Details */}
                  {selectedEntity.type === 'forest' && (() => {
                    const f: ForestConservation = selectedEntity.data;
                    return (
                      <div className="flex flex-col gap-3 text-xs">
                        <h4 className="serif text-xl font-bold text-white flex items-center gap-2">
                          <TreePine size={18} className="text-emerald-400" /> {f.name}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Area</span>
                            <span className="font-bold text-amber-300 text-xs">{f.hectares}</span>
                          </div>
                          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                            <span className="text-caption uppercase font-bold text-emerald-400 block">Type</span>
                            <span className="font-bold text-white text-xs">{f.type.split(' ')[0]}</span>
                          </div>
                        </div>

                        <p className="text-emerald-100/90 leading-relaxed text-caption">{f.ecologicalFunction}</p>
                        
                        <div>
                          <span className="text-caption uppercase font-black tracking-wider text-emerald-300 block mb-1">
                            Key Biodiversity:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {f.keyFloraFauna.map(fl => (
                              <span key={fl} className="bg-emerald-950 px-2 py-0.5 rounded text-caption font-bold text-emerald-200 border border-emerald-800">
                                {fl}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Regional Summary & Agro-Audit Card */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/90 shadow-xl flex flex-col gap-5 text-slate-800">
              <div>
                <span className="text-emerald-800 font-extrabold uppercase text-caption tracking-widest block">
                  Regional Permaculture Audit
                </span>
                <h3 className="serif text-2xl font-bold text-emerald-950 mt-0.5">
                  {regionData.name} Summary
                </h3>
              </div>

              {/* Concise 4-cell stats matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-caption font-bold text-slate-500 block">Altitude Span</span>
                  <span className="font-extrabold text-emerald-950 text-xs">{regionData.terrain.altitudeRange.split('(')[0]}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-caption font-bold text-slate-500 block">Water Security</span>
                  <span className="font-extrabold text-emerald-700 text-xs">{regionData.waterIndependenceRating.split('(')[0]}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-caption font-bold text-slate-500 block">Primary Highway</span>
                  <span className="font-extrabold text-amber-700 text-xs">M1 Bitumen</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-caption font-bold text-slate-500 block">Urban Capital</span>
                  <span className="font-extrabold text-emerald-950 text-xs">{regionData.adminCapital}</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs leading-relaxed text-emerald-950">
                <strong className="text-emerald-900 font-black uppercase tracking-wider text-caption block mb-1">
                  Homestead Strategy Verdict:
                </strong>
                {regionData.homesteadVerdict}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CONCISE DATA CATALOG (MATRIX & LIST OF ALL REGIONAL FEATURES) */
        <div className="flex flex-col gap-5">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white/70 p-3 rounded-2xl border border-slate-200">
            {[
              { id: 'all', label: 'All Items', count: allEntities.length, icon: Sparkles },
              { id: 'peaks', label: 'Peaks', count: regionData.terrain.peaks.length, icon: Mountain },
              { id: 'soils', label: 'Soils', count: regionData.soilZones.length, icon: Layers },
              { id: 'rainfall', label: 'Rainfall', count: regionData.rainfallZones.length, icon: Droplets },
              { id: 'crops', label: 'Crops', count: regionData.mainCrops.length, icon: Sprout },
              { id: 'roads', label: 'Roads', count: regionData.roads.length, icon: Route },
              { id: 'rivers', label: 'Rivers', count: regionData.rivers.length, icon: Waves },
              { id: 'settlements', label: 'Towns', count: regionData.settlements.length, icon: Building2 },
              { id: 'forests', label: 'Forests', count: regionData.forests.length, icon: TreePine }
            ].map(cat => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCatalogCategory(cat.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                    catalogCategory === cat.id
                      ? "bg-emerald-900 text-white shadow-sm font-black"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  <IconComp size={12} className={catalogCategory === cat.id ? "text-amber-400" : "text-slate-500"} />
                  <span>{cat.label}</span>
                  <span className="text-caption opacity-75 font-normal">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Tabulated Concise Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntities.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 text-slate-800"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-caption font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="text-caption font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="serif text-lg font-bold text-emerald-950 mt-1">
                    {item.name}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.sub}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => selectAndLocateEntity(item)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 hover:underline"
                  >
                    <Compass size={13} />
                    <span>Locate on Map</span>
                  </button>
                  <button
                    onClick={() => copySelectedItem(item.name, item.sub)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Copy info"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEntities.length === 0 && (
            <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm font-medium">
                No features found matching "{searchTerm}". Try another search keyword.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
