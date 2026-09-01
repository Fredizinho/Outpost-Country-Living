import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Zap, Droplets, ShieldCheck, Signal, 
  Layers, CheckCircle2, Navigation, Bookmark, 
  Copy, Check, X, Compass, Grid, Sparkles, 
  Mountain, Trees, Activity, Waves, AlertTriangle, Target,
  ChevronRight, Sliders, Eye, Calendar, ArrowUpRight, Sprout,
  Globe, Sun, ChevronDown, ChevronUp, ArrowRight, BookOpen, Clock, HardDrive,
  FileText, Satellite, Map, Route, Thermometer, Snowflake, Flame, CloudRain,
  Wifi, WifiOff, Download, Maximize2
} from 'lucide-react';
import { getTelemetryForDistrict, DistrictSeasonalTelemetry } from '@/data/actionableAlmanacData';
import { getDistrictClimateData, DistrictClimateData } from '@/data/climateTelemetryData';
import { useMapFilters } from '@/hooks/useMapFilters';
import { MapFilterDrawer } from './MapFilterDrawer';
import { RegionFocusBar } from './RegionFocusBar';
import { GisLayerDeck } from './GisLayerDeck';
import { ScoutTelemetryDrawer } from './ScoutTelemetryDrawer';
import { OfflineMapModal } from './OfflineMapModal';
import { ResourceDensityBottomSheet } from './ResourceDensityBottomSheet';
import { ScoutParcelFeature, ScoutParcelProperties } from '@/data/scoutGeoJSON';
import { 
  MALAWI_CATCHMENT_BASINS, 
  MALAWI_ESCARPMENTS, 
  MALAWI_RIVERS,
  CatchmentBasin,
  EscarpmentFeature
} from '@/data/malawiGeoData';
import { 
  MALAWI_MACRO_REGIONS, 
  MALAWI_RAINFALL_OVERLAYS, 
  MALAWI_SOIL_OVERLAYS, 
  MALAWI_ELEVATION_OVERLAYS,
  RegionalClimateZone
} from '@/data/malawiRegionalScoutData';
import { 
  MALAWI_DISTRICTS, 
  MalawiDistrictSpec,
  getDistrictByIdOrName
} from '@/data/malawiDistrictData';
import { 
  getMalawiInverseMaskLatLngs, 
  getMalawiNationalBorderLines, 
  MALAWI_STRICT_BOUNDS 
} from '@/lib/malawiBorderMask';
import { 
  MALAWI_LAKES, 
  MALAWI_HIGHWAYS, 
  MALAWI_CITIES_AND_BOMAS 
} from '@/data/malawiVectorBasemapData';
import { isForceOfflineActive, isCacheStorageAvailable } from '@/lib/offlineTileManager';
import { cn } from '@/lib/utils';
import { getStoredBookmarkedParcels, saveStoredBookmarkedParcels } from '@/lib/offlineStorage';
import { Link } from 'react-router-dom';

export type FocusRegionId = 'all' | 'north' | 'central' | 'south';

export interface RegionalFocusSpec {
  id: FocusRegionId;
  label: string;
  shortLabel: string;
  icon: string;
  badge: string;
  macroRegionId?: string;
  districts: string[];
  centroid: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]]; // [[southLat, westLng], [northLat, eastLng]]
  description: string;
}

export const MALAWI_REGIONAL_BOUNDS: Record<FocusRegionId, RegionalFocusSpec> = {
  all: {
    id: 'all',
    label: 'Entire Malawi',
    shortLabel: 'Entire Malawi',
    icon: '',
    badge: 'National Overview',
    districts: ['All 28 Districts', 'Northern Region', 'Central Region', 'Southern Region'],
    centroid: [-13.2543, 34.3015],
    zoom: 7.25,
    bounds: [[-17.15, 32.5], [-9.25, 36.0]],
    description: 'National overview encompassing all 28 districts across Northern, Central, and Southern agro-ecological zones.'
  },
  north: {
    id: 'north',
    label: 'Northern Region',
    shortLabel: 'North',
    icon: '',
    badge: 'Viphya & Nyika Highlands',
    macroRegionId: 'northern-plateau',
    districts: ['Mzimba', 'Rumphi', 'Chitipa', 'Karonga', 'Nkhata Bay', 'Likoma'],
    centroid: [-11.0, 33.8],
    zoom: 8.5,
    bounds: [[-12.3, 32.6], [-9.3, 34.9]],
    description: 'High-altitude plateaus (1,200m–2,400m), rich organic humic soils, abundant mountain gravity streams, and cool montane climate.'
  },
  central: {
    id: 'central',
    label: 'Central Region',
    shortLabel: 'Central',
    icon: '',
    badge: 'Dedza & Lilongwe Heartland',
    macroRegionId: 'central-highlands',
    districts: ['Dedza', 'Lilongwe', 'Salima', 'Kasungu', 'Ntcheu', 'Nkhotakota', 'Mchinji', 'Dowa', 'Ntchisi'],
    centroid: [-13.6, 33.8],
    zoom: 8.5,
    bounds: [[-14.9, 32.6], [-12.2, 34.9]],
    description: 'The agricultural heartland. Fertile red Katondo soils (pH 6.0–6.5), shallow perennial aquifers (15m–25m), and prime grain/orchard land.'
  },
  south: {
    id: 'south',
    label: 'Southern Region',
    shortLabel: 'South',
    icon: '',
    badge: 'Shire Highlands & Mulanje Massif',
    macroRegionId: 'southern-massifs',
    districts: ['Mulanje', 'Zomba', 'Blantyre', 'Thyolo', 'Mangochi', 'Chiradzulu', 'Mwanza', 'Neno', 'Phalombe', 'Chikwawa', 'Nsanje'],
    centroid: [-15.6, 35.1],
    zoom: 8.5,
    bounds: [[-17.1, 34.4], [-14.3, 35.9]],
    description: 'High-rainfall micro-climates (1,400–2,400mm), volcanic Nitisols, tea/macadamia agroforestry, and permanent Shire River tributaries.'
  }
};

export interface ScoutingMapProps {
  initialMode?: 'regional' | 'parcels';
  initialSearchQuery?: string;
  initialRegionId?: string;
  initialFocusRegion?: FocusRegionId;
  onNavigateSoilScience?: () => void;
}

export type TileLayerType = 'satellite' | 'hybrid' | 'terrain' | 'standard' | 'offline-vector';

export function ScoutingMap({ 
  initialMode = 'regional', 
  initialSearchQuery, 
  initialRegionId,
  initialFocusRegion = 'all',
  onNavigateSoilScience 
}: ScoutingMapProps = {}) {
  // Dual-mode state: Regional Overview vs Parcel Detail
  const [activeMode, setActiveMode] = useState<'regional' | 'parcels'>(initialMode);

  // Active Geographic Focus Region: 'all' | 'north' | 'central' | 'south'
  const [activeFocusRegion, setActiveFocusRegion] = useState<FocusRegionId>(initialFocusRegion);
  
  // Active District for deep microclimate inspection & vector highlighting
  const [activeDistrict, setActiveDistrict] = useState<MalawiDistrictSpec | null>(() => {
    return getDistrictByIdOrName('Dedza') || null;
  });
  
  // Selected Region for macro-telemetry
  const [selectedRegion, setSelectedRegion] = useState<RegionalClimateZone>(() => {
    if (initialRegionId) {
      const found = MALAWI_MACRO_REGIONS.find(r => r.id === initialRegionId);
      if (found) return found;
    }
    return MALAWI_MACRO_REGIONS[0]; // Default: Dedza & Central Highlands
  });

  const {
    filters,
    setFilters,
    filteredFeatures,
    totalCount,
    filteredCount,
    activeFilterCount,
    toggleQuickChip,
    toggleMultiSelect,
    resetFilters
  } = useMapFilters();

  useEffect(() => {
    if (initialSearchQuery) {
      setFilters(prev => ({ ...prev, searchQuery: initialSearchQuery }));
    }
  }, [initialSearchQuery, setFilters]);

  // Sidebar / Drawer Open State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLayersDeckOpen, setIsLayersDeckOpen] = useState(false);
  const [activeParcel, setActiveParcel] = useState<ScoutParcelProperties | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [tileStyle, setTileStyle] = useState<TileLayerType>('satellite');
  
  // Toggleable Map Overlays State
  const [showClimateHeatmap, setShowClimateHeatmap] = useState(true);
  const [showRainfallLayer, setShowRainfallLayer] = useState(true);
  const [showSoilPhLayer, setShowSoilPhLayer] = useState(true);
  const [showElevationLayer, setShowElevationLayer] = useState(false);
  const [showCatchmentBasins, setShowCatchmentBasins] = useState(false);
  const [showEscarpments, setShowEscarpments] = useState(true);
  const [showRivers, setShowRivers] = useState(true);
  const [showDistrictBoundaries, setShowDistrictBoundaries] = useState(true);
  const [showParcelBoundary, setShowParcelBoundary] = useState(true);

  // Live telemetry state on cursor movement
  const [liveCursorCoords, setLiveCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    return getStoredBookmarkedParcels();
  });
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Offline & Field Mode State
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [isOnlineState, setIsOnlineState] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isForceOfflineState, setIsForceOfflineState] = useState<boolean>(isForceOfflineActive);

  // Map and Layer References
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  // Layer Groups
  const vectorBasemapLayerRef = useRef<L.LayerGroup | null>(null);
  const climateHeatmapLayerRef = useRef<L.LayerGroup | null>(null);
  const regionsLayerRef = useRef<L.LayerGroup | null>(null);
  const districtsLayerRef = useRef<L.LayerGroup | null>(null);
  const activeDistrictBeaconRef = useRef<L.LayerGroup | null>(null);
  const rainfallLayerRef = useRef<L.LayerGroup | null>(null);
  const soilLayerRef = useRef<L.LayerGroup | null>(null);
  const elevationLayerRef = useRef<L.LayerGroup | null>(null);
  const catchmentsLayerRef = useRef<L.LayerGroup | null>(null);
  const escarpmentsLayerRef = useRef<L.LayerGroup | null>(null);
  const riversLayerRef = useRef<L.LayerGroup | null>(null);
  const boundaryLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const inverseMaskLayerRef = useRef<L.LayerGroup | null>(null);
  const nationalBorderLayerRef = useRef<L.LayerGroup | null>(null);

  // Monitor connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnlineState(true);
    const handleOffline = () => {
      setIsOnlineState(false);
      setTileStyle('offline-vector');
    };
    const handleOfflineModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOffline: boolean }>;
      setIsForceOfflineState(customEvent.detail.isOffline);
      if (customEvent.detail.isOffline) {
        setTileStyle('offline-vector');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('outpost:offline-mode-changed', handleOfflineModeChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('outpost:offline-mode-changed', handleOfflineModeChange);
    };
  }, []);

  // Invalidate map size on window resize or sidebar change
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    const timeout = setTimeout(handleResize, 350);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [isSidebarOpen, viewMode]);

  // Toggle bookmark parcel
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      saveStoredBookmarkedParcels(next);
      return next;
    });
  };

  // Declutter mode state helper
  const isDecluttered = !showClimateHeatmap && !showRainfallLayer && !showSoilPhLayer && !showElevationLayer && !showEscarpments && !showCatchmentBasins;

  const handleToggleDeclutter = () => {
    if (!isDecluttered) {
      // Turn off dense textured overlays for an ultra-clean, decluttered vector view
      setShowClimateHeatmap(false);
      setShowRainfallLayer(false);
      setShowSoilPhLayer(false);
      setShowElevationLayer(false);
      setShowEscarpments(false);
      setShowCatchmentBasins(false);
    } else {
      // Restore standard comprehensive GIS layers
      setShowClimateHeatmap(true);
      setShowRainfallLayer(true);
      setShowSoilPhLayer(true);
      setShowEscarpments(true);
      setShowRivers(true);
    }
  };

  // Preset Applicator
  const handleApplyPreset = (preset: 'clean' | 'climate' | 'soil' | 'water' | 'topo' | 'all') => {
    switch (preset) {
      case 'clean':
        setShowClimateHeatmap(false);
        setShowRainfallLayer(false);
        setShowSoilPhLayer(false);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(false);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        setShowParcelBoundary(true);
        break;
      case 'climate':
        setShowClimateHeatmap(true);
        setShowRainfallLayer(true);
        setShowSoilPhLayer(false);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(false);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        break;
      case 'soil':
        setShowClimateHeatmap(false);
        setShowRainfallLayer(true);
        setShowSoilPhLayer(true);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(false);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        break;
      case 'water':
        setShowClimateHeatmap(false);
        setShowRainfallLayer(true);
        setShowSoilPhLayer(false);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(true);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        break;
      case 'topo':
        setTileStyle('terrain');
        setShowClimateHeatmap(false);
        setShowRainfallLayer(false);
        setShowSoilPhLayer(false);
        setShowElevationLayer(true);
        setShowEscarpments(true);
        setShowCatchmentBasins(false);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        break;
      case 'all':
        setShowClimateHeatmap(true);
        setShowRainfallLayer(true);
        setShowSoilPhLayer(true);
        setShowElevationLayer(true);
        setShowEscarpments(true);
        setShowCatchmentBasins(true);
        setShowRivers(true);
        setShowDistrictBoundaries(true);
        setShowParcelBoundary(true);
        break;
    }
  };

  // Active layer counter
  const activeLayerCount = [
    showClimateHeatmap,
    showRainfallLayer,
    showSoilPhLayer,
    showElevationLayer,
    showCatchmentBasins,
    showEscarpments,
    showRivers,
    showDistrictBoundaries,
    showParcelBoundary
  ].filter(Boolean).length;

  // Tile Layer URLs & Attribution
  const getTileUrl = (style: TileLayerType) => {
    switch (style) {
      case 'satellite':
      case 'hybrid':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'offline-vector':
        // Transparent data pixel for native vector rendering
        return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      case 'standard':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  const getTileAttribution = (style: TileLayerType) => {
    switch (style) {
      case 'satellite':
      case 'hybrid':
        return '&copy; Esri, Maxar, Earthstar Geographics';
      case 'terrain':
        return '&copy; OpenTopoMap, SRTM, OpenStreetMap contributors';
      case 'offline-vector':
        return 'Outpost Malawi Native Vector GIS (Offline Basemap)';
      case 'standard':
      default:
        return '&copy; OpenStreetMap contributors';
    }
  };

  // -------------------------------------------------------------
  // 1. INITIALIZE LEAFLET MAP (LOCKED STRICTLY TO MALAWI ONLY)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const defaultCentroid = MALAWI_REGIONAL_BOUNDS[activeFocusRegion]?.centroid || [-13.2543, 34.3015];
    const defaultZoom = MALAWI_REGIONAL_BOUNDS[activeFocusRegion]?.zoom || 7.25;

    const map = L.map(mapContainerRef.current, {
      center: defaultCentroid as L.LatLngTuple,
      zoom: defaultZoom,
      minZoom: MALAWI_STRICT_BOUNDS.minZoom,
      maxZoom: MALAWI_STRICT_BOUNDS.maxZoom,
      maxBounds: MALAWI_STRICT_BOUNDS.maxBounds,
      maxBoundsViscosity: 1.0, // Strictly locks map panning within Malawi territory
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      zoomControl: false,
      attributionControl: false
    });

    // Base Tile Layer
    tileLayerRef.current = L.tileLayer(getTileUrl(tileStyle), {
      attribution: getTileAttribution(tileStyle),
      maxZoom: 18,
    }).addTo(map);

    // Initialize Layer Groups in optical Z-order
    vectorBasemapLayerRef.current = L.layerGroup().addTo(map);
    regionsLayerRef.current = L.layerGroup().addTo(map);
    climateHeatmapLayerRef.current = L.layerGroup().addTo(map);
    rainfallLayerRef.current = L.layerGroup().addTo(map);
    soilLayerRef.current = L.layerGroup().addTo(map);
    elevationLayerRef.current = L.layerGroup().addTo(map);
    catchmentsLayerRef.current = L.layerGroup().addTo(map);
    escarpmentsLayerRef.current = L.layerGroup().addTo(map);
    riversLayerRef.current = L.layerGroup().addTo(map);
    districtsLayerRef.current = L.layerGroup().addTo(map);
    activeDistrictBeaconRef.current = L.layerGroup().addTo(map);
    boundaryLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    // Inverse Mask on top of all outer borders so surrounding countries are completely clipped!
    inverseMaskLayerRef.current = L.layerGroup().addTo(map);
    nationalBorderLayerRef.current = L.layerGroup().addTo(map);

    // Live cursor coordinates tracking
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setLiveCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    map.on('mouseout', () => {
      setLiveCursorCoords(null);
    });

    mapInstanceRef.current = map;

    // Trigger initial fit bounds for maximum wide display
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update base tile when tileStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    if (tileStyle === 'offline-vector') {
      tileLayerRef.current.setOpacity(0);
    } else {
      tileLayerRef.current.setOpacity(1);
      tileLayerRef.current.setUrl(getTileUrl(tileStyle));
    }
  }, [tileStyle]);

  // -------------------------------------------------------------
  // 1.5 RENDER INVERSE MASK & SOVEREIGN GLOWING NATIONAL BORDER
  // Cuts out all neighboring borders so ONLY Malawi is visible!
  // -------------------------------------------------------------
  useEffect(() => {
    if (!inverseMaskLayerRef.current || !nationalBorderLayerRef.current) return;
    inverseMaskLayerRef.current.clearLayers();
    nationalBorderLayerRef.current.clearLayers();

    // 1. Outer World Mask Polygon: Covers everything outside Malawi in slate-950 canvas background
    const maskLatLngs = getMalawiInverseMaskLatLngs();
    const maskPolygon = L.polygon(maskLatLngs as unknown as L.LatLngExpression[][], {
      fillColor: '#020617', // Match the deep canvas slate background
      fillOpacity: 1.0,
      stroke: false,
      interactive: false
    });
    inverseMaskLayerRef.current.addLayer(maskPolygon);

    // 2. Sovereign Glowing National Border Line
    const borderRings = getMalawiNationalBorderLines();
    borderRings.forEach((ring) => {
      // Outer subtle emerald aura glow
      const outerGlow = L.polyline(ring as L.LatLngTuple[], {
        color: '#059669',
        weight: 7,
        opacity: 0.45,
        interactive: false
      });
      // Inner crisp illuminated border
      const sharpBorder = L.polyline(ring as L.LatLngTuple[], {
        color: '#10b981',
        weight: 2.4,
        opacity: 0.95,
        interactive: false
      });

      nationalBorderLayerRef.current?.addLayer(outerGlow);
      nationalBorderLayerRef.current?.addLayer(sharpBorder);
    });
  }, []);

  // -------------------------------------------------------------
  // 1.8 RENDER OFFLINE VECTOR GIS BASEMAP CARTOGRAPHY
  // Renders native Lakes, Highways, Cities/Bomas on-device
  // -------------------------------------------------------------
  useEffect(() => {
    if (!vectorBasemapLayerRef.current) return;
    vectorBasemapLayerRef.current.clearLayers();

    const isOfflineVectorActive = tileStyle === 'offline-vector' || isForceOfflineState || !isOnlineState;

    if (isOfflineVectorActive) {
      // 1. Major Lakes & Waterbodies
      MALAWI_LAKES.forEach((lake) => {
        const lakePoly = L.polygon(lake.coordinates as L.LatLngTuple[], {
          fillColor: '#0284c7',
          fillOpacity: 0.85,
          color: '#38bdf8',
          weight: 1.8
        });

        lakePoly.bindTooltip(`
          <div style="font-family: monospace; padding: 6px; background: #020617; color: #38bdf8; border: 1px solid #0284c7; border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; font-size: 12px; color: #38bdf8;">🌊 ${lake.name}</div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Depth: ${lake.waterDepthMeters}</div>
            <div style="font-size: 10px; color: #7dd3fc;">Surface Area: ${lake.areaKm2.toLocaleString()} km²</div>
          </div>
        `, { sticky: true });

        vectorBasemapLayerRef.current?.addLayer(lakePoly);
      });

      // 2. National Highways (M1, M5, M3, M2, M12)
      MALAWI_HIGHWAYS.forEach((hwy) => {
        const isSpine = hwy.code === 'M1';
        const line = L.polyline(hwy.coordinates as L.LatLngTuple[], {
          color: isSpine ? '#f59e0b' : '#94a3b8',
          weight: isSpine ? 3.5 : 2,
          opacity: isSpine ? 0.95 : 0.75,
          dashArray: isSpine ? undefined : '5, 4'
        });

        line.bindTooltip(`
          <div style="font-family: monospace; padding: 5px; background: #020617; color: #fbbf24; border: 1px solid #f59e0b; border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; font-size: 11px;">🛣️ ${hwy.name}</div>
            <div style="font-size: 9px; color: #cbd5e1; margin-top: 2px;">${hwy.connectingBomas}</div>
          </div>
        `, { sticky: true });

        vectorBasemapLayerRef.current?.addLayer(line);
      });

      // 3. Major Cities & District Bomas
      MALAWI_CITIES_AND_BOMAS.forEach((city) => {
        const isCap = city.category === 'National Capital';
        const isCom = city.category === 'Commercial Hub' || city.category === 'Regional City';
        const marker = L.circleMarker(city.coordinates as L.LatLngTuple, {
          radius: isCap ? 7 : isCom ? 5.5 : 4,
          fillColor: isCap ? '#f59e0b' : isCom ? '#10b981' : '#38bdf8',
          color: '#020617',
          weight: 2,
          fillOpacity: 1
        });

        marker.bindTooltip(`
          <div style="font-family: monospace; padding: 5px; background: #020617; color: #f8fafc; border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; font-size: 11px; color: #fbbf24;">📍 ${city.name}</div>
            <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">${city.category} · ${city.elevationMeters}m height</div>
            <div style="font-size: 9px; color: #34d399;">Market Day: ${city.marketDay}</div>
          </div>
        `, { sticky: true });

        vectorBasemapLayerRef.current?.addLayer(marker);
      });
    }
  }, [tileStyle, isForceOfflineState, isOnlineState]);

  // -------------------------------------------------------------
  // 2. RENDER CLIMATE HEATMAP LAYER
  // -------------------------------------------------------------
  useEffect(() => {
    if (!climateHeatmapLayerRef.current) return;
    climateHeatmapLayerRef.current.clearLayers();

    if (!showClimateHeatmap) return;

    MALAWI_DISTRICTS.forEach((district) => {
      const climate = getDistrictClimateData(district.id);
      const isCurrentActive = activeDistrict?.name.toLowerCase() === district.name.toLowerCase();
      const fillColor = climate.annualRainfallMm >= 1200 ? '#0284c7' : climate.annualRainfallMm >= 950 ? '#059669' : '#d97706';

      const polygon = L.polygon(district.boundary as L.LatLngTuple[], {
        color: isCurrentActive ? '#f59e0b' : '#38bdf8',
        weight: isCurrentActive ? 2.5 : 1,
        fillColor: fillColor,
        fillOpacity: isCurrentActive ? 0.38 : 0.2,
        dashArray: isCurrentActive ? undefined : '3, 3'
      });

      polygon.bindTooltip(`
        <div style="font-family: monospace; padding: 8px; background: #020617; color: #f8fafc; border-radius: 10px; border: 1px solid rgba(251, 191, 36, 0.5); box-shadow: 0 12px 24px -4px rgba(0,0,0,0.7);">
          <div style="font-weight: 800; color: #fbbf24; font-size: 13px; margin-bottom: 3px;">${district.name} District</div>
          <div style="font-size: 10px; color: #93c5fd; margin-bottom: 2px;">
            <strong>🌡️ Temp:</strong> ${climate.winterMinC}°C min to ${climate.summerMaxC}°C max
          </div>
          <div style="font-size: 10px; color: #38bdf8; margin-bottom: 2px;">
            <strong>🌧️ Rain:</strong> ${climate.annualRainfallMm} mm/yr (${climate.rainfallRangeMm})
          </div>
          <div style="font-size: 10px; color: #fbbf24; margin-bottom: 2px;">
            <strong>☀️ Solar:</strong> ${climate.solarRadiationKwhM2Day} kWh/m²/day
          </div>
          <div style="font-size: 10px; color: #cbd5e1; margin-bottom: 2px;">
            <strong>🏔️ Zone:</strong> ${climate.agroEcologicalClassification.split('(')[0]}
          </div>
          <div style="font-size: 9px; color: #a7f3d0; margin-top: 4px; font-style: italic;">
            ${climate.thermalBeltZone}
          </div>
        </div>
      `, { sticky: true });

      polygon.on('click', () => {
        const dSpec = getDistrictByIdOrName(district.name);
        handleFocusDistrict(dSpec || null);
      });

      climateHeatmapLayerRef.current?.addLayer(polygon);
    });
  }, [showClimateHeatmap, activeDistrict]);

  // -------------------------------------------------------------
  // 3. RENDER RAINFALL ISOHYET OVERLAYS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!rainfallLayerRef.current) return;
    rainfallLayerRef.current.clearLayers();

    if (!showRainfallLayer) return;

    MALAWI_RAINFALL_OVERLAYS.forEach((rain) => {
      const polygon = L.polygon(rain.coordinates as L.LatLngTuple[], {
        color: rain.color,
        weight: 1.8,
        fillColor: rain.color,
        fillOpacity: rain.fillOpacity,
        dashArray: '4, 4'
      });

      polygon.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid ${rain.color}; box-shadow: 0 8px 16px rgba(0,0,0,0.5);">
          <div style="font-weight: 800; color: #38bdf8; font-size: 12px;">${rain.name}</div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">Zone: ${rain.zone}</div>
          <div style="font-size: 10px; color: #34d399; font-weight: bold; margin-top: 2px;">Average Rainfall: ~${rain.rainfallMm} mm/year</div>
        </div>
      `, { sticky: true });

      rainfallLayerRef.current?.addLayer(polygon);
    });
  }, [showRainfallLayer]);

  // -------------------------------------------------------------
  // 4. RENDER SOIL pH & PEDOLOGY OVERLAYS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!soilLayerRef.current) return;
    soilLayerRef.current.clearLayers();

    if (!showSoilPhLayer) return;

    MALAWI_SOIL_OVERLAYS.forEach((soil) => {
      const polygon = L.polygon(soil.coordinates as L.LatLngTuple[], {
        color: soil.color,
        weight: 2,
        fillColor: soil.color,
        fillOpacity: soil.fillOpacity,
      });

      polygon.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid ${soil.color}; box-shadow: 0 8px 16px rgba(0,0,0,0.5);">
          <div style="font-weight: 800; color: #f87171; font-size: 12px;">${soil.name}</div>
          <div style="font-size: 10px; color: #fbbf24; font-weight: bold; margin-top: 2px;">Optimal Range: ${soil.soilpH}</div>
          <div style="font-size: 9px; color: #cbd5e1; max-width: 220px; margin-top: 2px;">${soil.characteristics}</div>
        </div>
      `, { sticky: true });

      soilLayerRef.current?.addLayer(polygon);
    });
  }, [showSoilPhLayer]);

  // -------------------------------------------------------------
  // 5. RENDER ELEVATION TIERS OVERLAYS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!elevationLayerRef.current) return;
    elevationLayerRef.current.clearLayers();

    if (!showElevationLayer) return;

    MALAWI_ELEVATION_OVERLAYS.forEach((elev) => {
      const polygon = L.polygon(elev.coordinates as L.LatLngTuple[], {
        color: elev.color,
        weight: 1.8,
        fillColor: elev.color,
        fillOpacity: elev.fillOpacity,
      });

      polygon.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid ${elev.color}; box-shadow: 0 8px 16px rgba(0,0,0,0.5);">
          <div style="font-weight: 800; color: #fbbf24; font-size: 12px;">${elev.name}</div>
          <div style="font-size: 10px; color: #38bdf8; font-weight: bold; margin-top: 2px;">Elevation: ${elev.elevation}</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 2px;">${elev.climate}</div>
        </div>
      `, { sticky: true });

      elevationLayerRef.current?.addLayer(polygon);
    });
  }, [showElevationLayer]);

  // -------------------------------------------------------------
  // 6. RENDER CATCHMENT DRAINAGE BASINS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!catchmentsLayerRef.current) return;
    catchmentsLayerRef.current.clearLayers();

    if (!showCatchmentBasins) return;

    MALAWI_CATCHMENT_BASINS.forEach((basin) => {
      const coords = basin.points.map(pt => [pt.lat, pt.lng] as L.LatLngTuple);
      const polygon = L.polygon(coords, {
        color: basin.borderColor || '#0284c7',
        weight: 1.8,
        fillColor: basin.color || '#38bdf8',
        fillOpacity: 0.16,
        dashArray: '5, 5'
      });

      polygon.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #0284c7; box-shadow: 0 8px 16px rgba(0,0,0,0.5);">
          <div style="font-weight: 800; color: #38bdf8; font-size: 12px;">${basin.name}</div>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">Major Rivers: ${basin.majorRivers.join(', ')}</div>
          <div style="font-size: 9px; color: #34d399; font-weight: bold; margin-top: 2px;">Drainage Area: ${basin.areaKm2.toLocaleString()} km²</div>
        </div>
      `, { sticky: true });

      catchmentsLayerRef.current?.addLayer(polygon);
    });
  }, [showCatchmentBasins]);

  // -------------------------------------------------------------
  // 7. RENDER RIFT VALLEY ESCARPMENTS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!escarpmentsLayerRef.current) return;
    escarpmentsLayerRef.current.clearLayers();

    if (!showEscarpments) return;

    MALAWI_ESCARPMENTS.forEach((scarp) => {
      const coords = scarp.points.map(pt => [pt.lat, pt.lng] as L.LatLngTuple);
      const polyline = L.polyline(coords, {
        color: '#ea580c',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '6, 4'
      });

      polyline.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #ea580c; box-shadow: 0 8px 16px rgba(0,0,0,0.5);">
          <div style="font-weight: 800; color: #fb923c; font-size: 12px;">⚠️ ${scarp.name}</div>
          <div style="font-size: 10px; color: #fde047; font-weight: bold; margin-top: 2px;">Drop: ${scarp.dropElevationMeters}</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 2px;">${scarp.swaleDesignSpec}</div>
        </div>
      `, { sticky: true });

      escarpmentsLayerRef.current?.addLayer(polyline);
    });
  }, [showEscarpments]);

  // -------------------------------------------------------------
  // 8. RENDER PERENNIAL RIVERS & STREAMS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!riversLayerRef.current) return;
    riversLayerRef.current.clearLayers();

    if (!showRivers) return;

    MALAWI_RIVERS.forEach((river) => {
      const coords = river.points.map(pt => [pt.lat, pt.lng] as L.LatLngTuple);
      const polyline = L.polyline(coords, {
        color: '#06b6d4',
        weight: 2.8,
        opacity: 0.9,
      });

      polyline.bindTooltip(`
        <div style="font-family: sans-serif; padding: 4px; background: #020617; color: #22d3ee; border-radius: 6px; border: 1px solid #0891b2;">
          <div style="font-weight: 800; font-size: 11px;">💧 ${river.name}</div>
        </div>
      `, { sticky: true });

      riversLayerRef.current?.addLayer(polyline);
    });
  }, [showRivers]);

  // -------------------------------------------------------------
  // 9. RENDER DISTRICT ADMINISTRATIVE BOUNDARIES & BEACON
  // -------------------------------------------------------------
  useEffect(() => {
    if (!districtsLayerRef.current || !activeDistrictBeaconRef.current) return;
    districtsLayerRef.current.clearLayers();
    activeDistrictBeaconRef.current.clearLayers();

    if (!showDistrictBoundaries) return;

    MALAWI_DISTRICTS.forEach((district) => {
      const isSelected = activeDistrict?.name.toLowerCase() === district.name.toLowerCase();

      const polygon = L.polygon(district.boundary as L.LatLngTuple[], {
        color: isSelected ? '#f59e0b' : '#64748b',
        weight: isSelected ? 3.2 : 1,
        fillColor: isSelected ? '#f59e0b' : 'transparent',
        fillOpacity: isSelected ? 0.25 : 0,
        dashArray: isSelected ? undefined : '2, 3'
      });

      polygon.on('click', () => {
        const dSpec = getDistrictByIdOrName(district.name);
        handleFocusDistrict(dSpec || null);
      });

      districtsLayerRef.current?.addLayer(polygon);

      // If this district is selected, drop an animated beacon ring
      if (isSelected && district.centroid) {
        const beaconCircle = L.circleMarker(district.centroid as L.LatLngTuple, {
          radius: 12,
          color: '#f59e0b',
          weight: 3,
          fillColor: '#fbbf24',
          fillOpacity: 0.8
        });

        beaconCircle.bindTooltip(`
          <div style="font-family: monospace; font-weight: bold; padding: 4px; background: #020617; color: #fbbf24; border-radius: 6px; border: 1px solid #f59e0b;">
            📍 Active Focus: ${district.name} District
          </div>
        `, { permanent: true, direction: 'top', offset: [0, -10] });

        activeDistrictBeaconRef.current?.addLayer(beaconCircle);
      }
    });
  }, [showDistrictBoundaries, activeDistrict]);

  // -------------------------------------------------------------
  // 10. RENDER SURVEYED PARCEL BOUNDARIES & MARKERS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!markersLayerRef.current || !boundaryLayerRef.current) return;
    markersLayerRef.current.clearLayers();
    boundaryLayerRef.current.clearLayers();

    if (!showParcelBoundary) return;

    filteredFeatures.forEach((feat) => {
      const p = feat.properties;
      const [lng, lat] = feat.geometry.coordinates;
      const isSelected = activeParcel?.id === p.id;
      const isBookmarked = bookmarkedIds.includes(p.id);

      // Boundary polygon if coordinates exist
      if (p.boundaryPolygon && p.boundaryPolygon.length > 0) {
        const latLngs = p.boundaryPolygon as L.LatLngTuple[];
        const boundaryPoly = L.polygon(latLngs, {
          color: isSelected ? '#10b981' : '#f59e0b',
          weight: isSelected ? 3.5 : 1.8,
          fillColor: isSelected ? '#10b981' : '#fbbf24',
          fillOpacity: isSelected ? 0.4 : 0.18,
          dashArray: isSelected ? undefined : '4, 4'
        });

        boundaryPoly.on('click', () => {
          setActiveParcel(p);
          setIsSidebarOpen(true);
        });

        boundaryLayerRef.current?.addLayer(boundaryPoly);
      }

      // Marker icon with glowing SVG styling
      const customIcon = L.divIcon({
        className: 'custom-parcel-marker',
        html: `
          <div style="
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 9999px;
            background: ${isSelected ? '#10b981' : '#0f172a'};
            border: 2.5px solid ${isSelected ? '#34d399' : '#f59e0b'};
            box-shadow: 0 6px 16px rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${isSelected ? '#022c22' : '#fbbf24'};
            font-weight: 900;
            font-size: ${isSelected ? '13px' : '11px'};
            cursor: pointer;
            transition: all 0.25s ease;
          ">
            ${isBookmarked ? '★' : '⌂'}
          </div>
        `,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #10b981; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
          <div style="font-weight: 800; color: #34d399; font-size: 12px;">${p.title}</div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${p.district} • <strong>${p.acres} Acres</strong></div>
          <div style="font-size: 9px; color: #38bdf8; font-weight: bold; margin-top: 2px;">Water: ${p.waterReliability.split('(')[0]}</div>
        </div>
      `, { sticky: true });

      marker.on('click', () => {
        setActiveParcel(p);
        setIsSidebarOpen(true);
        mapInstanceRef.current?.flyTo([lat, lng], 13, { duration: 1.2 });
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredFeatures, activeParcel, bookmarkedIds, showParcelBoundary]);

  // -------------------------------------------------------------
  // CAMERA TRANSITIONS & REGION FOCUS LOGIC
  // -------------------------------------------------------------
  const handleFocusRegion = (regionKey: FocusRegionId) => {
    setActiveFocusRegion(regionKey);
    const spec = MALAWI_REGIONAL_BOUNDS[regionKey];

    if (mapInstanceRef.current && spec) {
      if (regionKey === 'all') {
        mapInstanceRef.current.flyTo(spec.centroid, spec.zoom, { duration: 1.2 });
      } else {
        mapInstanceRef.current.flyToBounds(spec.bounds, { 
          padding: [40, 40],
          duration: 1.3 
        });
      }
    }

    if (spec.macroRegionId) {
      const match = MALAWI_MACRO_REGIONS.find(r => r.id === spec.macroRegionId);
      if (match) setSelectedRegion(match);
    }
  };

  const handleFocusDistrict = (district: MalawiDistrictSpec | null) => {
    setActiveDistrict(district);
    if (!district) {
      // Reset to region bounds
      handleFocusRegion(activeFocusRegion);
      return;
    }

    // Fly camera directly to district centroid
    if (mapInstanceRef.current && district.centroid) {
      mapInstanceRef.current.flyTo(district.centroid as L.LatLngTuple, district.optimalZoom, {
        duration: 1.2
      });
    }

    // Auto open telemetry dossier
    setIsSidebarOpen(true);
  };

  // Map Navigation Buttons
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetMapView = () => handleFocusRegion('all');

  const handleCopyCoords = (coords: [number, number]) => {
    const text = `${coords[1].toFixed(5)}, ${coords[0].toFixed(5)}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const activeDistrictClimate = useMemo(() => {
    if (activeDistrict) {
      return getDistrictClimateData(activeDistrict.id);
    }
    return getDistrictClimateData('dedza');
  }, [activeDistrict]);

  return (
    <div className="w-full h-[calc(100vh-3.2rem)] min-h-[820px] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950 flex flex-col" id="scouting-map-root">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP FLOATING RETRACTABLE CONTROLS                          */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'map' && (
        <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex flex-col gap-2 max-w-7xl mx-auto">
          <RegionFocusBar
            activeFocusRegion={activeFocusRegion}
            onSelectRegion={handleFocusRegion}
            activeDistrict={activeDistrict}
            onSelectDistrict={handleFocusDistrict}
            activeMode={activeMode}
            onToggleMode={setActiveMode}
            searchQuery={filters.searchQuery}
            onSearchChange={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isDecluttered={isDecluttered}
            onToggleDeclutter={handleToggleDeclutter}
            onOpenLayersDeck={() => setIsLayersDeckOpen(true)}
            activeLayerCount={activeLayerCount}
            isOffline={!isOnlineState || isForceOfflineState || tileStyle === 'offline-vector'}
            onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
          />

          {/* Offline Active Alert Ribbon */}
          {(!isOnlineState || isForceOfflineState || tileStyle === 'offline-vector') && (
            <div className="bg-amber-950/90 border border-amber-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg flex items-center justify-between pointer-events-auto text-xs text-amber-200">
              <div className="flex items-center gap-2 font-mono">
                <WifiOff size={13} className="text-amber-400 animate-pulse" />
                <span>
                  <strong>Offline Map Active:</strong> All 28 districts, roads, and rivers ready on your device.
                </span>
              </div>
              <button
                onClick={() => setIsOfflineModalOpen(true)}
                className="underline text-[11px] text-amber-300 hover:text-white font-mono cursor-pointer"
              >
                Offline Settings
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. MAP CANVAS VIEW OR LIST CATALOGUE VIEW                     */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'map' ? (
        <div className="relative w-full h-full">
          {/* Leaflet DOM Canvas container */}
          <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-950" />

          {/* Left Floating Action Buttons: Re-Center & Reset View */}
          <div className="absolute top-20 sm:top-24 left-3 z-20 flex flex-col gap-2 pointer-events-auto max-w-[240px]">
            {activeDistrict && (
              <button
                onClick={() => handleFocusDistrict(activeDistrict)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider shadow-2xl border-2 border-amber-300 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer ring-4 ring-amber-500/20"
                title={`Re-center camera on ${activeDistrict.name} District`}
              >
                <Target size={14} className="text-slate-950 animate-pulse shrink-0" />
                <span className="truncate">Center {activeDistrict.name}</span>
              </button>
            )}

            <button
              onClick={handleResetMapView}
              className="bg-slate-950/85 hover:bg-slate-900 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-2xl border border-white/20 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Reset viewport to entire Malawi national overview"
            >
              <Globe size={13} className="text-emerald-400 shrink-0" />
              <span>National Overview</span>
            </button>
          </div>

          {/* Zoom Buttons (Right side) */}
          <div className="absolute right-3 top-20 sm:top-24 z-20 flex flex-col gap-1.5 pointer-events-auto">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-slate-950/90 hover:bg-slate-900 text-white border border-white/20 rounded-xl shadow-2xl flex items-center justify-center font-bold text-lg active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-slate-950/90 hover:bg-slate-900 text-white border border-white/20 rounded-xl shadow-2xl flex items-center justify-center font-bold text-lg active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Zoom Out"
            >
              -
            </button>
          </div>

          {/* Collapsible Resource & Population Density Bottom-Sheet Overlay */}
          <div className="absolute bottom-16 sm:bottom-16 left-3 right-3 z-30 pointer-events-none flex justify-center">
            <div className="pointer-events-auto w-full max-w-4xl">
              <ResourceDensityBottomSheet
                selectedDistrictName={activeDistrict?.name}
                onSelectDistrictByName={(dName) => {
                  const d = getDistrictByIdOrName(dName);
                  if (d) handleFocusDistrict(d);
                }}
              />
            </div>
          </div>

          {/* Bottom Telemetry HUD Dock (Live Cursor Coordinates + District Profile) */}
          <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-end justify-between gap-3">
            
            {/* Bottom Left: District Telemetry Card */}
            <div className="pointer-events-auto max-w-md hidden sm:flex flex-col gap-2">
              <div className="bg-slate-950/90 backdrop-blur-xl border border-white/15 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold font-mono text-amber-300">
                      {activeDistrict ? `${activeDistrict.name} District` : MALAWI_REGIONAL_BOUNDS[activeFocusRegion].label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-md text-slate-300">
                    {activeDistrict ? `Grade ${activeDistrict.feasibilityGrade}` : MALAWI_REGIONAL_BOUNDS[activeFocusRegion].badge}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-1 border-t border-white/10">
                  <div>
                    <span className="text-slate-400 block">Rainfall</span>
                    <span className="font-bold text-sky-300">{activeDistrict ? `${activeDistrict.rainfallAnnualMm}mm` : '800-1400mm'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Soil pH</span>
                    <span className="font-bold text-emerald-300">{activeDistrict ? activeDistrict.soilPh : 'pH 6.0 - 6.5'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Well Depth</span>
                    <span className="font-bold text-amber-300">{activeDistrict ? activeDistrict.aquiferDepth.split('(')[0] : '15 - 35m'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right: Live GPS Coordinate Ticker */}
            <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-3 text-[11px] font-mono text-slate-300 ml-auto">
              <div className="flex items-center gap-1.5">
                <Navigation size={12} className="text-amber-400 rotate-45" />
                <span>
                  {liveCursorCoords 
                    ? `${liveCursorCoords.lat.toFixed(4)}°, ${liveCursorCoords.lng.toFixed(4)}°`
                    : `-13.2543°, 34.3015°`}
                </span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold hidden md:inline">
                {tileStyle === 'offline-vector' ? 'Offline Map' : tileStyle.toUpperCase()}
              </span>
            </div>

          </div>
        </div>
      ) : (
        /* LIST CATALOGUE VIEW */
        <div className="w-full h-full overflow-y-auto pt-24 pb-20 px-4 md:px-8 bg-slate-950">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="serif text-2xl font-bold text-white">
                  {activeMode === 'regional' ? 'Farming & Climate Zones' : 'Available Land Parcels'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing verified land and farming details across Malawi
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feat) => {
                const p = feat.properties;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveParcel(p);
                      setViewMode('map');
                      setIsSidebarOpen(true);
                    }}
                    className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer flex flex-col justify-between gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {p.district} District
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {p.acres} Acres
                        </span>
                      </div>
                      <h4 className="serif text-lg font-bold text-white mt-2">{p.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{p.traditionalAuthority} • {p.groupVillageHeadman}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex flex-col gap-1 text-xs text-slate-300 font-mono">
                      <div><strong className="text-sky-300">Water:</strong> {p.waterReliability}</div>
                      <div><strong className="text-emerald-300">Tenure:</strong> {p.landTenure}</div>
                      <div><strong className="text-amber-300">Slope:</strong> {p.slopePct || 6}%</div>
                    </div>

                    <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-all">
                      <span>View Land Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. REDESIGNED TELEMETRY DOSSIER SIDE DRAWER                   */}
      {/* ------------------------------------------------------------- */}
      <ScoutTelemetryDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeFocusRegion={activeFocusRegion}
        selectedRegion={selectedRegion}
        activeDistrict={activeDistrict}
        climateZone={activeDistrictClimate}
        activeParcel={activeParcel}
        onSelectParcel={(p) => {
          setActiveParcel(p);
          const feat = filteredFeatures.find(f => f.properties.id === p.id);
          if (feat && mapInstanceRef.current) {
            const [lng, lat] = feat.geometry.coordinates;
            mapInstanceRef.current.flyTo([lat, lng], 13, { duration: 1.2 });
          }
        }}
        filteredParcels={filteredFeatures}
        totalParcelCount={totalCount}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        copiedCoords={copiedCoords}
        onCopyCoords={handleCopyCoords}
        onOpenFiltersModal={() => setIsFilterDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
        tileLayerType={tileStyle}
        onSelectTileLayer={setTileStyle}
        isDecluttered={isDecluttered}
        onToggleDeclutter={handleToggleDeclutter}
        onOpenLayersModal={() => setIsLayersDeckOpen(true)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 4. GIS LAYERS DECK MODAL                                      */}
      {/* ------------------------------------------------------------- */}
      <GisLayerDeck
        isOpen={isLayersDeckOpen}
        onClose={() => setIsLayersDeckOpen(false)}
        tileLayerType={tileStyle}
        onSelectTileLayer={setTileStyle}
        showClimateHeatmap={showClimateHeatmap}
        setShowClimateHeatmap={setShowClimateHeatmap}
        showRainfallLayer={showRainfallLayer}
        setShowRainfallLayer={setShowRainfallLayer}
        showSoilPhLayer={showSoilPhLayer}
        setShowSoilPhLayer={setShowSoilPhLayer}
        showElevationLayer={showElevationLayer}
        setShowElevationLayer={setShowElevationLayer}
        showEscarpments={showEscarpments}
        setShowEscarpments={setShowEscarpments}
        showCatchmentBasins={showCatchmentBasins}
        setShowCatchmentBasins={setShowCatchmentBasins}
        showRivers={showRivers}
        setShowRivers={setShowRivers}
        showDistrictBoundaries={showDistrictBoundaries}
        setShowDistrictBoundaries={setShowDistrictBoundaries}
        showParcelBoundary={showParcelBoundary}
        setShowParcelBoundary={setShowParcelBoundary}
        onApplyPreset={handleApplyPreset}
        isDecluttered={isDecluttered}
        onToggleDeclutter={handleToggleDeclutter}
        onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
      />

      {/* ------------------------------------------------------------- */}
      {/* 5. PARCEL FILTER DRAWER MODAL                                 */}
      {/* ------------------------------------------------------------- */}
      <MapFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        toggleMultiSelect={toggleMultiSelect}
        resetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />

      {/* ------------------------------------------------------------- */}
      {/* 6. OFFLINE MAP & FIELD VECTOR PACK CACHE MODAL                */}
      {/* ------------------------------------------------------------- */}
      <OfflineMapModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        activeDistrict={activeDistrict}
        onSwitchToOfflineVector={() => setTileStyle('offline-vector')}
      />

    </div>
  );
}
