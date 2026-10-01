import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import '@/lib/leafletSafePatch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Zap, Droplets, ShieldCheck, Signal, 
  Layers, CheckCircle2, Navigation, Bookmark, 
  Copy, Check, X, Compass, Grid, Sparkles, 
  Mountain, Trees, Activity, Waves, AlertTriangle, Target,
  ChevronRight, Sliders, Eye, EyeOff, Calendar, ArrowUpRight, Sprout,
  Globe, Sun, ChevronDown, ChevronUp, ArrowRight, BookOpen, Clock, HardDrive,
  FileText, Satellite, Map as MapIcon, Route, Thermometer, Snowflake, Flame, CloudRain,
  Wifi, WifiOff, Download, Maximize2, Minimize2, Bot
} from 'lucide-react';
import { getTelemetryForDistrict, DistrictSeasonalTelemetry } from '@/data/actionableAlmanacData';
import { getDistrictClimateData, DistrictClimateData } from '@/data/climateTelemetryData';
import { useMapFilters } from '@/hooks/useMapFilters';
import { MapFilterDrawer } from './MapFilterDrawer';
import { RegionFocusBar } from './RegionFocusBar';
import { UnifiedMapHud } from './UnifiedMapHud';
import { CompactRegionPicker } from './CompactRegionPicker';
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
import { computeDistrictLabelCollisions } from './labelCollisionDetector';
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
import { MALAWI_ELEVATION_CONTOURS } from '@/data/malawiContourData';
import { MALAWI_CUSTOMARY_BOUNDARIES } from '@/data/malawiCustomaryBoundaries';
import { MALAWI_COMMUNITY_SETTLEMENTS, CommunitySettlementNode } from '@/data/malawiSettlementsData';
import { ThematicLayerControlPanel } from './ThematicLayerControlPanel';
import { MapScoutAiDrawer } from './MapScoutAiDrawer';
import { MapLegend } from './MapLegend';
import { MapCompassAndScale } from './MapCompassAndScale';
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
  initialViewMode?: 'map' | 'list';
  isAutoHideProp?: boolean;
  onMapInteract?: () => void;
  onNavigateSoilScience?: () => void;
  onNavigateComparison?: () => void;
}

export type TileLayerType = 'dark' | 'satellite' | 'hybrid' | 'terrain' | 'standard' | 'offline-vector';

export function ScoutingMap({ 
  initialMode = 'regional', 
  initialSearchQuery, 
  initialRegionId,
  initialFocusRegion = 'all',
  initialViewMode = 'map',
  isAutoHideProp,
  onMapInteract,
  onNavigateSoilScience,
  onNavigateComparison
}: ScoutingMapProps = {}) {
  // Dual-mode state: Regional Overview vs Parcel Detail
  const [activeMode, setActiveMode] = useState<'regional' | 'parcels'>(initialMode);

  // Auto-hide overlays for immediate visual feedback on the map
  const [isAutoHideActive, setIsAutoHideActive] = useState<boolean>(isAutoHideProp ?? true);
  const [isDetailsAutoHidden, setIsDetailsAutoHidden] = useState<boolean>(false);
  const [isSpotlightMinimized, setIsSpotlightMinimized] = useState<boolean>(true);
  const [isDrawerMinimized, setIsDrawerMinimized] = useState<boolean>(true);
  const [expandedDistrictId, setExpandedDistrictId] = useState<string | null>(null);
  const districtMarkerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const onMapInteractRef = useRef(onMapInteract);
  useEffect(() => {
    onMapInteractRef.current = onMapInteract;
  }, [onMapInteract]);

  const isAutoHideActiveRef = useRef(isAutoHideActive);
  useEffect(() => {
    isAutoHideActiveRef.current = isAutoHideActive;
  }, [isAutoHideActive]);

  useEffect(() => {
    if (isAutoHideProp !== undefined) {
      setIsAutoHideActive(isAutoHideProp);
    }
  }, [isAutoHideProp]);

  // Idle timer to auto-hide extra details
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const wakeUpControls = useCallback(() => {
    setIsDetailsAutoHidden(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isAutoHideActiveRef.current) {
      idleTimerRef.current = setTimeout(() => {
        if (isAutoHideActiveRef.current) {
          setIsDetailsAutoHidden(true);
        }
      }, 5000);
    }
  }, []);

  const triggerAutoHide = useCallback(() => {
    if (isAutoHideActiveRef.current) {
      setIsDetailsAutoHidden(true);
    }
  }, []);

  // Active Geographic Focus Region: 'all' | 'north' | 'central' | 'south'
  const [searchParams] = useSearchParams();
  const [activeFocusRegion, setActiveFocusRegion] = useState<FocusRegionId>(() => {
    const regParam = searchParams.get('region')?.toLowerCase();
    if (regParam === 'north' || regParam === 'northern') return 'north';
    if (regParam === 'central') return 'central';
    if (regParam === 'south' || regParam === 'southern') return 'south';
    return initialFocusRegion;
  });
  
  // Active District for deep microclimate inspection & vector highlighting
  const [activeDistrict, setActiveDistrict] = useState<MalawiDistrictSpec | null>(() => {
    const distParam = searchParams.get('district');
    if (distParam) {
      const matched = getDistrictByIdOrName(distParam);
      if (matched) return matched;
    }
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

  // Sidebar / Drawer Open State (default false for clean, spacious map)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLayersDeckOpen, setIsLayersDeckOpen] = useState(false);
  const [isAiScoutDrawerOpen, setIsAiScoutDrawerOpen] = useState(false);
  const [aiScoutLayerInsightsMode, setAiScoutLayerInsightsMode] = useState(false);
  const [activeParcel, setActiveParcel] = useState<ScoutParcelProperties | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>(initialViewMode);
  const [tileStyle, setTileStyle] = useState<TileLayerType>('dark');
  
  // Toggleable Map Overlays State (Starts clean and calm to prevent clutter)
  const [showClimateHeatmap, setShowClimateHeatmap] = useState(false);
  const [showRainfallLayer, setShowRainfallLayer] = useState(false);
  const [showSoilPhLayer, setShowSoilPhLayer] = useState(false);
  const [showElevationLayer, setShowElevationLayer] = useState(false);
  const [showContourLines, setShowContourLines] = useState(false);
  const [showCatchmentBasins, setShowCatchmentBasins] = useState(false);
  const [showEscarpments, setShowEscarpments] = useState(false);
  const [showRivers, setShowRivers] = useState(true);
  const [showDistrictBoundaries, setShowDistrictBoundaries] = useState(true);
  const [showCustomaryBoundaries, setShowCustomaryBoundaries] = useState(false);
  const [showParcelBoundary, setShowParcelBoundary] = useState(true);
  const [showCommunitySettlements, setShowCommunitySettlements] = useState(true);

  // Zoom and Map View Telemetry
  const [currentZoom, setCurrentZoom] = useState<number>(7.25);
  const [currentMapCenter, setCurrentMapCenter] = useState<{ lat: number; lng: number }>({ lat: -13.2543, lng: 34.3015 });

  // Live telemetry state on cursor movement
  const [liveCursorCoords, setLiveCursorCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    return getStoredBookmarkedParcels();
  });
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [sentEvaluatorNotice, setSentEvaluatorNotice] = useState<string | null>(null);

  // Persistent Custom GPS Field Waypoints
  const [droppedWaypoint, setDroppedWaypoint] = useState<{
    lat: number;
    lng: number;
    districtName: string;
    elevationRange: string;
    rainfallMm: number;
    aquiferDepth: string;
    soilPh: string;
  } | null>(null);

  const [savedWaypoints, setSavedWaypoints] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
    districtName: string;
    savedAt: string;
  }>>(() => {
    try {
      const raw = localStorage.getItem('outpost_saved_waypoints_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleSaveWaypoint = (wp: { lat: number; lng: number; districtName: string }) => {
    const newEntry = {
      id: `wp-${Date.now()}`,
      label: `${wp.districtName} Field Pin (${wp.lat.toFixed(3)}°, ${wp.lng.toFixed(3)}°)`,
      lat: wp.lat,
      lng: wp.lng,
      districtName: wp.districtName,
      savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    };
    setSavedWaypoints(prev => {
      const next = [newEntry, ...prev].slice(0, 15);
      try {
        localStorage.setItem('outpost_saved_waypoints_v1', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setSentEvaluatorNotice(`Saved GPS Pin in ${wp.districtName}`);
    setTimeout(() => setSentEvaluatorNotice(null), 3000);
  };

  const handleSendToEvaluatorFromMap = (title: string, district: string, note: string) => {
    try {
      const raw = localStorage.getItem('outpost_suitability_parcels_v1');
      const existing = raw ? JSON.parse(raw) : [];
      const defaultScores = {
        w1: 10, w2: 8, w3: 7,
        s1: 8, s2: 6, s3: 6,
        t1: 5, t2: 5, t3: 5,
        i1: 8, i2: 6, i3: 6,
        c1: 5, c2: 5, c3: 5,
      };
      const entry = {
        id: `map-${Date.now()}`,
        name: title,
        district,
        acreageNote: note,
        scores: defaultScores,
        totalScore: 95,
        savedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      const updated = [entry, ...existing.filter((p: any) => p.name !== title)].slice(0, 12);
      localStorage.setItem('outpost_suitability_parcels_v1', JSON.stringify(updated));
      localStorage.setItem(
        'outpost_suitability_active_v1',
        JSON.stringify({
          scores: defaultScores,
          parcelName: title,
          parcelDistrict: district,
          parcelAcreageNote: note,
        })
      );
      setSentEvaluatorNotice(`Added "${title}" to 100-Point Evaluator`);
      setTimeout(() => setSentEvaluatorNotice(null), 3500);
    } catch {
      // ignore
    }
  };

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
  const contoursLayerRef = useRef<L.LayerGroup | null>(null);
  const customaryLayerRef = useRef<L.LayerGroup | null>(null);
  const catchmentsLayerRef = useRef<L.LayerGroup | null>(null);
  const escarpmentsLayerRef = useRef<L.LayerGroup | null>(null);
  const riversLayerRef = useRef<L.LayerGroup | null>(null);
  const boundaryLayerRef = useRef<L.LayerGroup | null>(null);
  const settlementsLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const districtBadgesLayerRef = useRef<L.LayerGroup | null>(null);
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

    const handleOpenLayersEvent = () => {
      setIsLayersDeckOpen(true);
    };

    const handleOpenAiInsightsEvent = () => {
      setAiScoutLayerInsightsMode(true);
      setIsAiScoutDrawerOpen(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('outpost:offline-mode-changed', handleOfflineModeChange);
    window.addEventListener('outpost:open-layers', handleOpenLayersEvent);
    window.addEventListener('outpost:open-ai-insights', handleOpenAiInsightsEvent);

    // Desktop Keyboard Shortcuts for Map Scout (L = Layers, F = Filters, A = AI Scout, D = District Dossier, Esc = Close)
    const handleMapKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName;
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag) || (e.target as HTMLElement)?.isContentEditable;
      if (isTyping || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        setIsLayersDeckOpen(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFilterDrawerOpen(prev => !prev);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setIsAiScoutDrawerOpen(prev => !prev);
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
        setIsDrawerMinimized(false);
      } else if (e.key === 'Escape') {
        setIsLayersDeckOpen(false);
        setIsFilterDrawerOpen(false);
        setIsAiScoutDrawerOpen(false);
        setIsOfflineModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleMapKeyDown);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('outpost:offline-mode-changed', handleOfflineModeChange);
      window.removeEventListener('outpost:open-layers', handleOpenLayersEvent);
      window.removeEventListener('outpost:open-ai-insights', handleOpenAiInsightsEvent);
      window.removeEventListener('keydown', handleMapKeyDown);
    };
  }, []);

  // React to URL ?district= or ?region= query parameter changes
  useEffect(() => {
    const distParam = searchParams.get('district');
    if (distParam) {
      const matched = getDistrictByIdOrName(distParam);
      if (matched) {
        setActiveDistrict(matched);
        setIsSpotlightMinimized(false);
        setIsSidebarOpen(true);
        setIsDrawerMinimized(false);
        if (mapInstanceRef.current && matched.centroid) {
          mapInstanceRef.current.flyTo(matched.centroid as L.LatLngTuple, matched.optimalZoom || 10.5, { duration: 1.2 });
        }
      }
    }
  }, [searchParams]);

  // Invalidate map size on window resize or sidebar change
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (mapInstanceRef.current && (mapInstanceRef.current as any)._mapPane) {
        try {
          mapInstanceRef.current.invalidateSize({ pan: false });
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('resize', handleResize);
    timeout = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeout) clearTimeout(timeout);
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
  const handleApplyPreset = (preset: 'egw' | 'clean' | 'climate' | 'soil' | 'water' | 'topo' | 'all') => {
    switch (preset) {
      case 'egw':
        setShowRivers(true);
        setShowSoilPhLayer(true);
        setShowRainfallLayer(true);
        setShowParcelBoundary(true);
        setShowDistrictBoundaries(true);
        setShowClimateHeatmap(false);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(false);
        setShowContourLines(false);
        setShowCustomaryBoundaries(false);
        break;
      case 'clean':
        setShowClimateHeatmap(false);
        setShowRainfallLayer(false);
        setShowSoilPhLayer(false);
        setShowElevationLayer(false);
        setShowEscarpments(false);
        setShowCatchmentBasins(false);
        setShowContourLines(false);
        setShowCustomaryBoundaries(false);
        setShowRivers(false);
        setShowDistrictBoundaries(true);
        setShowParcelBoundary(false);
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
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
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
      case 'dark':
        return '&copy; OpenStreetMap contributors &copy; CARTO';
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

    // Clear any previous Leaflet ID on the container to prevent reuse conflicts
    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

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
      subdomains: tileStyle === 'dark' ? 'abcd' : 'abc'
    }).addTo(map);

    // Initialize Layer Groups in optical Z-order
    vectorBasemapLayerRef.current = L.layerGroup().addTo(map);
    regionsLayerRef.current = L.layerGroup().addTo(map);
    climateHeatmapLayerRef.current = L.layerGroup().addTo(map);
    rainfallLayerRef.current = L.layerGroup().addTo(map);
    soilLayerRef.current = L.layerGroup().addTo(map);
    elevationLayerRef.current = L.layerGroup().addTo(map);
    contoursLayerRef.current = L.layerGroup().addTo(map);
    catchmentsLayerRef.current = L.layerGroup().addTo(map);
    escarpmentsLayerRef.current = L.layerGroup().addTo(map);
    riversLayerRef.current = L.layerGroup().addTo(map);
    customaryLayerRef.current = L.layerGroup().addTo(map);
    districtsLayerRef.current = L.layerGroup().addTo(map);
    activeDistrictBeaconRef.current = L.layerGroup().addTo(map);
    districtBadgesLayerRef.current = L.layerGroup().addTo(map);
    boundaryLayerRef.current = L.layerGroup().addTo(map);
    settlementsLayerRef.current = L.layerGroup().addTo(map);
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

    // Click-to-Drop Field Waypoint on Map Canvas
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      // Find nearest Malawi district centroid
      let nearest = MALAWI_DISTRICTS[0];
      let minDist = Infinity;
      for (const d of MALAWI_DISTRICTS) {
        const dLat = d.centroid[0] - lat;
        const dLng = d.centroid[1] - lng;
        const distSq = dLat * dLat + dLng * dLng;
        if (distSq < minDist) {
          minDist = distSq;
          nearest = d;
        }
      }
      setDroppedWaypoint({
        lat,
        lng,
        districtName: nearest.name,
        elevationRange: nearest.elevationRange,
        rainfallMm: nearest.rainfallAnnualMm,
        aquiferDepth: nearest.aquiferDepth.split('(')[0].trim(),
        soilPh: nearest.soilPh,
      });
    });

    // Auto-hide overlays during active map pan / zoom for unobstructed visual feedback
    const onMapMove = () => {
      if (isAutoHideActiveRef.current) {
        setIsDetailsAutoHidden(true);
      }
      onMapInteractRef.current?.();
      setIsDrawerMinimized(true);
    };

    const updateViewTelemetry = () => {
      if (!map || !(map as any)._mapPane) return;
      try {
        setCurrentZoom(map.getZoom());
        const center = map.getCenter();
        setCurrentMapCenter({ lat: center.lat, lng: center.lng });
      } catch {
        // ignore
      }
    };

    map.on('movestart', onMapMove);
    map.on('zoomstart', onMapMove);
    map.on('dragstart', onMapMove);
    map.on('zoomend', updateViewTelemetry);
    map.on('moveend', updateViewTelemetry);

    mapInstanceRef.current = map;

    // Trigger initial fit bounds for maximum wide display or deep-linked district focus
    let initTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      if (mapInstanceRef.current && (mapInstanceRef.current as any)._mapPane) {
        try {
          mapInstanceRef.current.invalidateSize({ pan: false });
          const distParam = new URLSearchParams(window.location.search).get('district');
          if (distParam) {
            const matched = getDistrictByIdOrName(distParam);
            if (matched && matched.centroid) {
              mapInstanceRef.current.flyTo(matched.centroid as L.LatLngTuple, matched.optimalZoom || 10.5, { duration: 1.1 });
            }
          }
          updateViewTelemetry();
        } catch {
          // ignore
        }
      }
    }, 200);

    return () => {
      if (initTimer) {
        clearTimeout(initTimer);
        initTimer = null;
      }
      map.off('movestart', onMapMove);
      map.off('zoomstart', onMapMove);
      map.off('dragstart', onMapMove);
      map.off('zoomend', updateViewTelemetry);
      map.off('moveend', updateViewTelemetry);
      try {
        if (typeof (map as any)._stop === 'function') {
          (map as any)._stop();
        }
        map.remove();
      } catch (err) {
        console.warn('Map cleanup safely caught:', err);
      }
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

    // 1. Outer World Mask Polygon: Covers everything outside Malawi in deep forest cartographic obsidian
    const maskLatLngs = getMalawiInverseMaskLatLngs();
    const maskPolygon = L.polygon(maskLatLngs as unknown as L.LatLngExpression[][], {
      fillColor: '#06110B', // Deep Forest Cartographic Obsidian
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
            <div style="font-weight: 800; font-size: 12px; color: #38bdf8; display: flex; items-center; gap: 4px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#38bdf8;margin-right:4px;"></span>
              ${lake.name}
            </div>
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
            <div style="font-weight: 800; font-size: 11px; display: flex; items-center; gap: 4px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#f59e0b;margin-right:4px;"></span>
              ${hwy.name}
            </div>
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
            <div style="font-weight: 800; font-size: 11px; color: #fbbf24; display: flex; items-center; gap: 4px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#fbbf24;margin-right:4px;"></span>
              ${city.name}
            </div>
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
            <span style="color:#fb7185;margin-right:4px;">●</span><strong>Temp:</strong> ${climate.winterMinC}°C min to ${climate.summerMaxC}°C max
          </div>
          <div style="font-size: 10px; color: #38bdf8; margin-bottom: 2px;">
            <span style="color:#38bdf8;margin-right:4px;">●</span><strong>Rain:</strong> ${climate.annualRainfallMm} mm/yr (${climate.rainfallRangeMm})
          </div>
          <div style="font-size: 10px; color: #fbbf24; margin-bottom: 2px;">
            <span style="color:#fbbf24;margin-right:4px;">●</span><strong>Solar:</strong> ${climate.solarRadiationKwhM2Day} kWh/m²/day
          </div>
          <div style="font-size: 10px; color: #cbd5e1; margin-bottom: 2px;">
            <span style="color:#34d399;margin-right:4px;">●</span><strong>Zone:</strong> ${climate.agroEcologicalClassification.split('(')[0]}
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
  // 7. RENDER RIFT VALLEY ESCARPMENTS (3D FAULT TERRACES)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!escarpmentsLayerRef.current) return;
    escarpmentsLayerRef.current.clearLayers();

    if (!showEscarpments) return;

    MALAWI_ESCARPMENTS.forEach((scarp) => {
      const coords = scarp.points.map(pt => [pt.lat, pt.lng] as L.LatLngTuple);
      
      // Layer 1: Geological depression shadow band
      const shadowBand = L.polyline(coords, {
        color: '#1c1917',
        weight: 12,
        opacity: 0.55,
        lineCap: 'square',
        className: 'escarpment-terrace-shadow'
      });
      escarpmentsLayerRef.current?.addLayer(shadowBand);

      // Layer 2: Terracotta rock face scarp
      const scarpFace = L.polyline(coords, {
        color: '#c2410c',
        weight: 4.5,
        opacity: 0.9,
        lineCap: 'round'
      });
      escarpmentsLayerRef.current?.addLayer(scarpFace);

      // Layer 3: Geological crest ridge highlight line
      const crestLine = L.polyline(coords, {
        color: '#fed7aa',
        weight: 1.6,
        opacity: 0.95,
        lineCap: 'round',
        className: 'escarpment-crest-highlight'
      });

      crestLine.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #ea580c; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
          <div style="font-weight: 800; color: #fb923c; font-size: 12px; display: flex; align-items: center; gap: 5px;">
            <span>⚠️</span> ${scarp.name}
          </div>
          <div style="font-size: 10px; color: #fde047; font-weight: bold; margin-top: 3px;">Geological Drop: ${scarp.dropElevationMeters}</div>
          <div style="font-size: 9px; color: #cbd5e1; margin-top: 2px;">Terracing: ${scarp.swaleDesignSpec}</div>
        </div>
      `, { sticky: true });

      escarpmentsLayerRef.current?.addLayer(crestLine);
    });
  }, [showEscarpments]);

  // -------------------------------------------------------------
  // 8. RENDER PERENNIAL RIVERS & STREAMS (LIVING WATER FLOW RIBBONS)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!riversLayerRef.current) return;
    riversLayerRef.current.clearLayers();

    if (!showRivers) return;

    MALAWI_RIVERS.forEach((river) => {
      const coords = river.points.map(pt => [pt.lat, pt.lng] as L.LatLngTuple);
      
      // Layer 1: Ambient riparian moisture corridor halo
      const moistureHalo = L.polyline(coords, {
        color: '#0891b2',
        weight: 10,
        opacity: 0.22,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'river-ambient-glow'
      });
      riversLayerRef.current?.addLayer(moistureHalo);

      // Layer 2: Main azure river flow channel
      const waterChannel = L.polyline(coords, {
        color: '#06b6d4',
        weight: 3.8,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      });
      riversLayerRef.current?.addLayer(waterChannel);

      // Layer 3: Crystalline central stream highlight
      const coreStream = L.polyline(coords, {
        color: '#f0fdfa',
        weight: 1.6,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'river-core-stream'
      });

      coreStream.bindTooltip(`
        <div style="font-family: sans-serif; padding: 5px 8px; background: #020617; color: #22d3ee; border-radius: 8px; border: 1px solid #0891b2; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 16px rgba(6,182,212,0.35);">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22d3ee;box-shadow:0 0 8px #22d3ee;"></span>
          <div>
            <div style="font-weight: 800; font-size: 11px; letter-spacing: 0.2px;">${river.name}</div>
            <div style="font-size: 9px; color: #a5f3fc; margin-top: 1px;">Living Perennial Stream • Gravity Water Source</div>
          </div>
        </div>
      `, { sticky: true });

      riversLayerRef.current?.addLayer(coreStream);
    });
  }, [showRivers]);

  // -------------------------------------------------------------
  // 9. RENDER CUSTOMARY T/A BOUNDARIES (ANCESTRAL MALIRE CORRIDORS)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!customaryLayerRef.current) return;
    customaryLayerRef.current.clearLayers();

    if (!showCustomaryBoundaries) return;

    MALAWI_CUSTOMARY_BOUNDARIES.forEach((ta) => {
      const coords = ta.coordinates.map(pt => [pt[0], pt[1]] as L.LatLngTuple);
      
      // Layer 1: Territorial buffer corridor
      const buffer = L.polyline(coords, {
        color: '#b45309',
        weight: 9,
        opacity: 0.16,
        lineCap: 'round',
        lineJoin: 'round'
      });
      customaryLayerRef.current?.addLayer(buffer);

      // Layer 2: Warm golden Malire boundary thread
      const polyline = L.polyline(coords, {
        color: '#f59e0b',
        weight: 2.4,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round',
        className: 'customary-boundary-corridor'
      });
      customaryLayerRef.current?.addLayer(polyline);

      // Layer 3: Inner fine gold stitch
      const innerStitch = L.polyline(coords, {
        color: '#fef08a',
        weight: 1.1,
        opacity: 0.95,
        dashArray: '3, 13',
        lineCap: 'round'
      });

      innerStitch.bindTooltip(`
        <div style="font-family: sans-serif; padding: 6px 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #f59e0b; box-shadow: 0 8px 20px rgba(0,0,0,0.6);">
          <div style="font-size: 10px; font-weight: 800; color: #f59e0b; text-transform: uppercase; display: flex; align-items: center; gap: 4px;">
            <span style="display:inline-block;width:7px;height:7px;border-radius:2px;background:#f59e0b;margin-right:4px;"></span>
            Customary Malire (Ancestral Boundary)
          </div>
          <div style="font-weight: 800; color: #f8fafc; font-size: 12px; margin-top: 3px;">${ta.traditionalAuthority} (${ta.district} District)</div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">Custodianship: ${ta.chiefTitle}</div>
          <div style="font-size: 9px; color: #34d399; font-weight: bold; margin-top: 2px;">Tenure: ${ta.tenureType} • ${ta.description}</div>
        </div>
      `, { sticky: true });

      customaryLayerRef.current?.addLayer(innerStitch);
    });
  }, [showCustomaryBoundaries]);

  // -------------------------------------------------------------
  // 10. RENDER ELEVATION CONTOURS & DAMBO ALLUVIAL VECTORS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!contoursLayerRef.current) return;
    contoursLayerRef.current.clearLayers();

    if (!showContourLines) return;

    MALAWI_ELEVATION_CONTOURS.forEach((contour) => {
      const coords = contour.coordinates.map(pt => [pt[0], pt[1]] as L.LatLngTuple);
      const isDambo = contour.type === 'dambo-depression';
      const isHighland = contour.type === 'frost-free-ridge';
      const isIndex = contour.type === 'index';

      if (isHighland) {
        // Summit ridge emerald corridor
        const halo = L.polyline(coords, {
          color: '#059669',
          weight: 7,
          opacity: 0.22,
          lineCap: 'round'
        });
        contoursLayerRef.current?.addLayer(halo);

        const ridge = L.polyline(coords, {
          color: '#10b981',
          weight: 2.4,
          opacity: 0.9,
          lineCap: 'round'
        });
        ridge.bindTooltip(`
          <div style="font-family: sans-serif; padding: 5px 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #10b981; box-shadow: 0 8px 20px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; color: #34d399; font-size: 11px;">⛰️ ${contour.name} (${contour.elevationMeters}m)</div>
            <div style="font-size: 9px; color: #a7f3d0; margin-top: 2px;">Frost-Free Thermal Belt • ${contour.description}</div>
          </div>
        `, { sticky: true });
        contoursLayerRef.current?.addLayer(ridge);
      } else if (isDambo) {
        // Alluvial wetland corridor
        const buffer = L.polyline(coords, {
          color: '#0284c7',
          weight: 7,
          opacity: 0.2,
          lineCap: 'round'
        });
        contoursLayerRef.current?.addLayer(buffer);

        const wetland = L.polyline(coords, {
          color: '#38bdf8',
          weight: 2.0,
          opacity: 0.85,
          dashArray: '5, 5',
          lineCap: 'round'
        });
        wetland.bindTooltip(`
          <div style="font-family: sans-serif; padding: 5px 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #38bdf8; box-shadow: 0 8px 20px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; color: #38bdf8; font-size: 11px;">🌾 ${contour.name} (${contour.elevationMeters}m)</div>
            <div style="font-size: 9px; color: #bae6fd; margin-top: 2px;">Alluvial Dambo Wetland • Year-Round Moisture</div>
          </div>
        `, { sticky: true });
        contoursLayerRef.current?.addLayer(wetland);
      } else {
        const color = isIndex ? '#f59e0b' : '#64748b';
        const polyline = L.polyline(coords, {
          color: color,
          weight: isIndex ? 1.8 : 1.1,
          opacity: 0.75,
          lineCap: 'round'
        });
        polyline.bindTooltip(`
          <div style="font-family: sans-serif; padding: 5px 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid ${color}; box-shadow: 0 8px 20px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; color: ${color}; font-size: 11px;">${contour.name} (${contour.elevationMeters}m)</div>
            <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">Zone: ${contour.zone} • ${contour.description}</div>
          </div>
        `, { sticky: true });
        contoursLayerRef.current?.addLayer(polyline);
      }
    });
  }, [showContourLines]);

  // -------------------------------------------------------------
  // 11. RENDER DISTRICT ADMINISTRATIVE BOUNDARIES & CENTROID BADGES
  // -------------------------------------------------------------
  useEffect(() => {
    if (!districtsLayerRef.current || !activeDistrictBeaconRef.current || !districtBadgesLayerRef.current) return;
    districtsLayerRef.current.clearLayers();
    activeDistrictBeaconRef.current.clearLayers();
    districtBadgesLayerRef.current.clearLayers();
    districtMarkerMapRef.current.clear();

    if (!showDistrictBoundaries) return;

    MALAWI_DISTRICTS.forEach((district) => {
      const isSelected = activeDistrict?.name.toLowerCase() === district.name.toLowerCase();

      if (isSelected) {
        // Radiant luminous warm amber corridor for selected district
        const halo = L.polygon(district.boundary as L.LatLngTuple[], {
          color: '#f59e0b',
          weight: 7,
          opacity: 0.35,
          fillColor: '#f59e0b',
          fillOpacity: 0.12,
          className: 'district-glow-selected'
        });
        districtsLayerRef.current?.addLayer(halo);

        const core = L.polygon(district.boundary as L.LatLngTuple[], {
          color: '#fbbf24',
          weight: 2.5,
          opacity: 1,
          fillColor: 'transparent',
          fillOpacity: 0
        });
        core.on('click', () => {
          const dSpec = getDistrictByIdOrName(district.name);
          handleFocusDistrict(dSpec || null);
        });
        core.bindTooltip(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 8px 10px; background: rgba(6, 19, 12, 0.96); color: #f8fafc; border-radius: 10px; border: 1.5px solid #f59e0b; box-shadow: 0 10px 24px rgba(0,0,0,0.75);">
            <div style="font-family: 'Fraunces', Georgia, serif; font-weight: 700; color: #fde68a; font-size: 13px;">${district.name} District (Selected)</div>
            <div style="font-size: 10px; color: #d6d3d1; margin-top: 2px;">${district.region} Region · ${district.elevationRange}</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #34d399; font-weight: 700; margin-top: 3px;">Suitability Grade: ${district.feasibilityGrade}</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #7dd3fc; margin-top: 1px;">Aquifer: ${district.aquiferDepth.split('(')[0]}</div>
          </div>
        `, { sticky: true });
        districtsLayerRef.current?.addLayer(core);
      } else {
        // Warm Botanical Emerald & Topographic Slate district borders (saving cyan strictly for water)
        const halo = L.polygon(district.boundary as L.LatLngTuple[], {
          color: '#047857',
          weight: 2.6,
          opacity: 0.22,
          fillColor: 'transparent',
          fillOpacity: 0
        });
        districtsLayerRef.current?.addLayer(halo);

        const polygon = L.polygon(district.boundary as L.LatLngTuple[], {
          color: '#34d399',
          weight: 1.15,
          opacity: 0.65,
          fillColor: 'transparent',
          fillOpacity: 0,
          className: 'district-glow-subtle'
        });
        polygon.on('click', () => {
          const dSpec = getDistrictByIdOrName(district.name);
          handleFocusDistrict(dSpec || null);
        });
        polygon.bindTooltip(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 8px 10px; background: rgba(6, 19, 12, 0.96); color: #f8fafc; border-radius: 10px; border: 1px solid rgba(52, 211, 153, 0.45); box-shadow: 0 10px 24px rgba(0,0,0,0.75);">
            <div style="font-family: 'Fraunces', Georgia, serif; font-weight: 700; color: #6ee7b7; font-size: 13px;">${district.name} District</div>
            <div style="font-size: 10px; color: #d6d3d1; margin-top: 2px;">${district.region} Region · ${district.elevationRange}</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #fde68a; font-weight: 700; margin-top: 3px;">Suitability Grade: ${district.feasibilityGrade}</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #7dd3fc; margin-top: 1px;">Aquifer: ${district.aquiferDepth.split('(')[0]}</div>
          </div>
        `, { sticky: true });
        districtsLayerRef.current?.addLayer(polygon);
      }

      // District Centroid Badge (Water Table Depth & Agro Feasibility Grade)
      if (district.centroid) {
        const gradeLetter = district.feasibilityGrade ? district.feasibilityGrade.split(' ')[0] : 'A';
        const depthText = district.aquiferDepth ? (district.aquiferDepth.match(/\d+m/)?.[0] || '15m') : '15m';
        const isExpanded = isSelected || expandedDistrictId === district.id;

        const centroidIcon = L.divIcon({
          className: 'district-centroid-badge-container',
          html: `
            <div class="district-centroid-badge ${isExpanded ? 'active-district expanded-badge' : ''}" data-district-id="${district.id}">
              <span class="district-badge-grade">${gradeLetter}</span>
              <span class="district-badge-depth">${depthText}</span>
            </div>
            <div class="district-badge-nametag ${isSelected ? 'active-nametag' : ''}" data-district-id="${district.id}">${district.name}</div>
          `,
          iconSize: [60, 60],
          iconAnchor: [30, 22]
        });

        const badgeMarker = L.marker(district.centroid as L.LatLngTuple, { icon: centroidIcon });
        districtMarkerMapRef.current.set(district.id, badgeMarker);

        badgeMarker.on('mouseover', () => {
          setExpandedDistrictId(district.id);
        });

        badgeMarker.on('mouseout', () => {
          setExpandedDistrictId(prev => prev === district.id ? null : prev);
        });

        badgeMarker.on('click', () => {
          const dSpec = getDistrictByIdOrName(district.name);
          handleFocusDistrict(dSpec || null);
          setExpandedDistrictId(district.id);
          mapInstanceRef.current?.flyTo(district.centroid as L.LatLngTuple, district.optimalZoom || 10.5, { duration: 1.2 });
        });

        districtBadgesLayerRef.current?.addLayer(badgeMarker);
      }

      // If this district is selected, drop an animated beacon ring
      if (isSelected && district.centroid) {
        const beaconCircle = L.circleMarker(district.centroid as L.LatLngTuple, {
          radius: 14,
          color: '#f59e0b',
          weight: 3,
          fillColor: '#fbbf24',
          fillOpacity: 0.8
        });

        activeDistrictBeaconRef.current?.addLayer(beaconCircle);
      }
    });
  }, [showDistrictBoundaries, activeDistrict, expandedDistrictId]);

  // -------------------------------------------------------------
  // 12. RENDER COMMUNITY SETTLEMENTS & ADVENTIST MISSION HUBS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!settlementsLayerRef.current) return;
    settlementsLayerRef.current.clearLayers();

    if (!showCommunitySettlements) return;

    MALAWI_COMMUNITY_SETTLEMENTS.forEach((settlement) => {
      const isMission = settlement.category === 'Adventist Outpost & Mission Hub';
      const isHighland = settlement.category === 'Highland Homestead Cluster';
      const isAgro = settlement.category === 'Agricultural Community Settlement';

      const pinColor = isMission ? '#f59e0b' : isHighland ? '#10b981' : isAgro ? '#06b6d4' : '#fb923c';
      const bgStyle = isMission 
        ? 'background: #78350f; border-color: #f59e0b; color: #fef3c7;' 
        : isHighland 
        ? 'background: #064e3b; border-color: #10b981; color: #ecfdf5;' 
        : 'background: #164e63; border-color: #06b6d4; color: #cffafe;';

      const iconEmoji = isMission ? '⛪' : isHighland ? '🏡' : isAgro ? '🌱' : '🏪';

      const settlementIcon = L.divIcon({
        className: 'community-settlement-icon-marker',
        html: `
          <div style="
            width: 26px;
            height: 26px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            border: 1.5px solid;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            cursor: pointer;
            transition: transform 0.2s;
            ${bgStyle}
          ">
            ${iconEmoji}
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(settlement.coordinates as L.LatLngTuple, { icon: settlementIcon });

      marker.bindTooltip(`
        <div style="font-family: sans-serif; padding: 7px 9px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1.5px solid ${pinColor}; box-shadow: 0 10px 25px rgba(0,0,0,0.7); min-width: 190px;">
          <div style="font-weight: 800; color: ${pinColor}; font-size: 12px; display: flex; align-items: center; gap: 4px;">
            <span>${iconEmoji}</span>
            <span>${settlement.name}</span>
          </div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">
            ${settlement.district} District • <strong>${settlement.elevationMeters}m ASL</strong>
          </div>
          <div style="font-size: 9px; color: #fbbf24; font-weight: 600; margin-top: 2px;">
            ${settlement.category}
          </div>
          <div style="font-size: 9px; color: #94a3b8; margin-top: 3px; line-height: 1.3;">
            ${settlement.settlementDescription}
          </div>
          <div style="font-size: 9px; color: #34d399; margin-top: 3px; font-weight: bold;">
            Amenities: ${settlement.communityAmenities.slice(0, 3).join(', ')}
          </div>
        </div>
      `, { sticky: true });

      settlementsLayerRef.current?.addLayer(marker);
    });
  }, [showCommunitySettlements]);

  // -------------------------------------------------------------
  // DYNAMIC LABEL COLLISION AVOIDANCE ENGINE
  // Detects when marker badges are expanded, and automatically offsets
  // or hides overlapping district text labels for maximum legibility.
  // -------------------------------------------------------------
  const runCollisionDetection = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const collisionResults = computeDistrictLabelCollisions({
      districts: MALAWI_DISTRICTS,
      activeDistrictId: activeDistrict?.id || null,
      expandedDistrictId,
      map,
      currentZoom
    });

    collisionResults.forEach((result, districtId) => {
      const marker = districtMarkerMapRef.current.get(districtId);
      if (!marker) return;
      const el = marker.getElement();
      if (!el) return;

      const badgeEl = el.querySelector('.district-centroid-badge');
      const nametagEl = el.querySelector('.district-badge-nametag');

      if (badgeEl) {
        if (result.isExpanded) {
          badgeEl.classList.add('expanded-badge');
        } else {
          badgeEl.classList.remove('expanded-badge');
        }
      }

      if (nametagEl) {
        nametagEl.classList.remove('collision-hidden', 'offset-top', 'offset-right', 'offset-left');
        if (result.offsetMode === 'hidden') {
          nametagEl.classList.add('collision-hidden');
        } else if (result.offsetMode === 'offset-top') {
          nametagEl.classList.add('offset-top');
        } else if (result.offsetMode === 'offset-right') {
          nametagEl.classList.add('offset-right');
        } else if (result.offsetMode === 'offset-left') {
          nametagEl.classList.add('offset-left');
        }
      }
    });
  }, [activeDistrict, expandedDistrictId, currentZoom]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runCollisionDetection();
    }, 80);
    return () => clearTimeout(timer);
  }, [runCollisionDetection, showDistrictBoundaries]);

  // Dynamic collision avoidance on map zoom and pan
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleMapMovement = () => {
      runCollisionDetection();
    };

    map.on('move', handleMapMovement);
    map.on('zoomend', handleMapMovement);

    return () => {
      map.off('move', handleMapMovement);
      map.off('zoomend', handleMapMovement);
    };
  }, [runCollisionDetection]);

  // -------------------------------------------------------------
  // 12. RENDER SURVEYED PARCEL BOUNDARIES & DYNAMIC CLUSTERING
  // -------------------------------------------------------------
  useEffect(() => {
    if (!markersLayerRef.current || !boundaryLayerRef.current) return;
    markersLayerRef.current.clearLayers();
    boundaryLayerRef.current.clearLayers();

    if (!showParcelBoundary) return;

    // When zoomed out (< 9), dynamically group parcels into district cluster badges
    if (currentZoom < 9) {
      // Group parcels by district
      const groupedByDistrict: Record<string, ScoutParcelFeature[]> = {};
      filteredFeatures.forEach(feat => {
        const dist = feat.properties.district;
        if (!groupedByDistrict[dist]) groupedByDistrict[dist] = [];
        groupedByDistrict[dist].push(feat);
      });

      Object.entries(groupedByDistrict).forEach(([distName, feats]) => {
        if (feats.length === 0) return;
        // Average coordinates of parcels in this district
        const avgLat = feats.reduce((acc, f) => acc + f.geometry.coordinates[1], 0) / feats.length;
        const avgLng = feats.reduce((acc, f) => acc + f.geometry.coordinates[0], 0) / feats.length;

        const clusterIcon = L.divIcon({
          className: 'parcel-cluster-container',
          html: `
            <div class="parcel-cluster-badge">
              <div class="cluster-glow-ring"></div>
              <div class="cluster-count-circle">${feats.length}</div>
              <span class="cluster-label-text">${feats.length === 1 ? '1 Parcel' : `${feats.length} Parcels`} in ${distName}</span>
            </div>
          `,
          iconSize: [140, 36],
          iconAnchor: [70, 18]
        });

        const clusterMarker = L.marker([avgLat, avgLng], { icon: clusterIcon });
        clusterMarker.on('click', () => {
          mapInstanceRef.current?.flyTo([avgLat, avgLng], 10.5, { duration: 1.2 });
          const dSpec = getDistrictByIdOrName(distName);
          if (dSpec) handleFocusDistrict(dSpec);
        });

        clusterMarker.bindTooltip(`
          <div style="font-family: sans-serif; padding: 6px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1px solid #10b981; box-shadow: 0 8px 16px rgba(0,0,0,0.6);">
            <div style="font-weight: 800; color: #34d399; font-size: 12px;">${feats.length} Surveyed Agricultural Parcels</div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">District: ${distName} • Click to expand & view plots</div>
          </div>
        `, { sticky: true });

        markersLayerRef.current?.addLayer(clusterMarker);
      });
      return;
    }

    // When zoomed in (>= 9), render individual high-accuracy parcel polygons & markers
    filteredFeatures.forEach((feat) => {
      const p = feat.properties;
      const [lng, lat] = feat.geometry.coordinates;
      const isSelected = activeParcel?.id === p.id;
      const isBookmarked = bookmarkedIds.includes(p.id);

      // Boundary polygon: Semi-transparent emerald with high-contrast white/cyan stroke
      if (p.boundaryPolygon && p.boundaryPolygon.length > 0) {
        const latLngs = p.boundaryPolygon as L.LatLngTuple[];
        const boundaryPoly = L.polygon(latLngs, {
          color: isSelected ? '#34d399' : '#ffffff',
          weight: isSelected ? 3.5 : 2.0,
          opacity: 0.95,
          fillColor: '#10b981',
          fillOpacity: isSelected ? 0.45 : 0.22,
          dashArray: isSelected ? undefined : '4, 4'
        });

        boundaryPoly.on('click', () => {
          setActiveParcel(p);
          setIsSidebarOpen(true);
        });

        boundaryLayerRef.current?.addLayer(boundaryPoly);
      }

      // Individual Parcel Marker with glowing pin
      const iconInnerSvg = isBookmarked
        ? `<svg width="${isSelected ? '20' : '15'}" height="${isSelected ? '20' : '15'}" viewBox="0 0 24 24" fill="${isSelected ? '#022c22' : '#f59e0b'}" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
        : `<svg width="${isSelected ? '20' : '15'}" height="${isSelected ? '20' : '15'}" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#022c22' : '#34d399'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`;

      const customIcon = L.divIcon({
        className: 'parcel-pin-container',
        html: `
          <div class="parcel-pin-badge ${isSelected ? 'selected' : ''}" style="
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            ${iconInnerSvg}
          </div>
        `,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 19 : 15],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.bindTooltip(`
        <div style="font-family: sans-serif; padding: 8px; background: #020617; color: #f8fafc; border-radius: 8px; border: 1.5px solid #10b981; box-shadow: 0 10px 25px rgba(0,0,0,0.7); min-width: 170px;">
          <div style="font-weight: 800; color: #34d399; font-size: 13px;">${p.title}</div>
          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${p.district} • <strong>${p.acres} Acres (${p.hectares} ha)</strong></div>
          <div style="font-size: 9px; color: #38bdf8; font-weight: bold; margin-top: 3px; display: flex; items-center; gap: 4px;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#38bdf8;margin-right:4px;"></span>
            Water: ${p.waterReliability.split('(')[0]}
          </div>
          <div style="font-size: 9px; color: #f59e0b; margin-top: 1px;">Tenure: ${p.landTenure}</div>
        </div>
      `, { sticky: true });

      marker.on('click', () => {
        setActiveParcel(p);
        setIsSidebarOpen(true);
        setIsDrawerMinimized(true);
        mapInstanceRef.current?.flyTo([lat, lng], 13.5, { duration: 1.2 });
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredFeatures, activeParcel, bookmarkedIds, showParcelBoundary, currentZoom]);

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
    <div className="w-full h-screen min-h-[600px] relative overflow-hidden shadow-2xl bg-[#06110B] flex flex-col" id="scouting-map-root">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. COMPACT TOP-LEFT REGION PICKER & UNIFIED FLOATING HUD      */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'map' && (
        <>
          {/* Top-Left Compact Region & District Picker */}
          <CompactRegionPicker
            activeFocusRegion={activeFocusRegion}
            onSelectRegion={handleFocusRegion}
            activeDistrict={activeDistrict}
            onSelectDistrict={handleFocusDistrict}
            activeMode={activeMode}
            onToggleMode={setActiveMode}
            onOpenAiScout={() => setIsAiScoutDrawerOpen(true)}
            isAutoHidden={isDetailsAutoHidden}
            onWakeUp={wakeUpControls}
          />

          {/* Top-Right Unified Map HUD (Clean & Intuitive Controls Dock) */}
          <UnifiedMapHud
            searchQuery={filters.searchQuery}
            onSearchChange={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
            onOpenLayersDeck={() => setIsLayersDeckOpen(true)}
            activeLayerCount={activeLayerCount}
            tileStyle={tileStyle}
            onToggleSatelliteHybrid={() => setTileStyle(tileStyle === 'satellite' || tileStyle === 'hybrid' ? 'standard' : 'satellite')}
            onOpenAiScout={() => setIsAiScoutDrawerOpen(true)}
            isAiScoutOpen={isAiScoutDrawerOpen}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetMapView={handleResetMapView}
            activeDistrict={activeDistrict}
            onFocusDistrict={handleFocusDistrict}
            isOffline={!isOnlineState || isForceOfflineState || tileStyle === 'offline-vector'}
            onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
            onWakeUp={wakeUpControls}
          />

          {/* Offline Status Notice (Discreet pill below picker) */}
          {(!isOnlineState || isForceOfflineState || tileStyle === 'offline-vector') && !isDetailsAutoHidden && (
            <div className="absolute top-16 left-3 z-20 bg-amber-950/90 border border-amber-500/50 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-auto text-xs text-amber-200">
              <WifiOff size={13} className="text-amber-400 animate-pulse" />
              <span className="font-mono text-[11px]">
                <strong>Offline Vector Map:</strong> 28 districts available offline
              </span>
              <button
                onClick={() => setIsOfflineModalOpen(true)}
                className="underline text-[10px] text-amber-300 hover:text-white font-mono cursor-pointer ml-1"
              >
                Settings
              </button>
            </div>
          )}
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. MAP CANVAS VIEW OR LIST CATALOGUE VIEW                     */}
      {/* ------------------------------------------------------------- */}
      <div className={cn("relative w-full h-full", viewMode !== 'map' && "hidden")}>
        {/* Leaflet DOM Canvas container */}
        <div ref={mapContainerRef} className="w-full h-full z-0 bg-[#06110B]" />

        {/* Bottom Floating Spotlight Card & Telemetry Pill */}
          <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex flex-col sm:flex-row items-end justify-between gap-3">
            
            {/* Center-Left Contextual Spotlight Card */}
            <div 
              onMouseEnter={wakeUpControls}
              className={cn(
                "pointer-events-auto w-full max-w-lg transition-all duration-300",
                isDetailsAutoHidden && !isSpotlightMinimized ? "opacity-35 hover:opacity-100" : "opacity-100"
              )}
            >
              <AnimatePresence>
                {activeParcel ? (
                  isSpotlightMinimized ? (
                    <motion.div
                      key="parcel-minimized"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-slate-950/95 backdrop-blur-xl border border-emerald-500/40 px-3 py-1.5 rounded-xl shadow-xl flex items-center justify-between gap-2 text-white"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-emerald-300 font-bold truncate">{activeParcel.title}</span>
                        <span className="text-slate-400 shrink-0">({activeParcel.acres} ac • {activeParcel.district})</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button 
                          onClick={() => setIsSpotlightMinimized(false)}
                          className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                        >
                          Expand
                        </button>
                        <button onClick={() => setActiveParcel(null)} className="text-slate-400 hover:text-white p-1">
                          <X size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Active Parcel Spotlight */
                    <motion.div
                      key="parcel-spotlight"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="bg-slate-950/95 backdrop-blur-xl border border-emerald-500/40 p-3.5 sm:p-4 rounded-2xl shadow-2xl flex flex-col gap-2 text-white"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold uppercase">
                              {activeParcel.district} District
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {activeParcel.acres} Acres
                            </span>
                          </div>
                          <h4 className="serif text-base sm:text-lg font-bold text-white leading-tight mt-1">
                            {activeParcel.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setIsSpotlightMinimized(true)}
                            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            title="Minimize details"
                          >
                            <Minimize2 size={13} />
                          </button>
                          <button
                            onClick={() => setActiveParcel(null)}
                            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            title="Dismiss"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono py-1 border-y border-white/10 text-slate-300">
                        <div>
                          <span className="text-slate-500 text-[9px] block">Water Reliability</span>
                          <span className="text-sky-300 font-bold truncate block">{activeParcel.waterReliability.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[9px] block">Soil Profile</span>
                          <span className="text-emerald-300 font-bold truncate block">{activeParcel.soilProfile.split(',')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[9px] block">Land Tenure</span>
                          <span className="text-amber-300 font-bold truncate block">{activeParcel.landTenure}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          onClick={() => setIsSidebarOpen(true)}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <FileText size={13} />
                          <span>Inspect Dossier</span>
                          <ChevronRight size={13} />
                        </button>
                        <button
                          onClick={() =>
                            handleSendToEvaluatorFromMap(
                              activeParcel.title,
                              activeParcel.district,
                              `${activeParcel.acres} Acres (${activeParcel.hectares} ha) • ${activeParcel.landTenure}`
                            )
                          }
                          className="py-1.5 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-mono text-xs flex items-center gap-1 transition-all cursor-pointer"
                          title="Send this parcel to the 100-Point Land Evaluator"
                        >
                          <ShieldCheck size={13} />
                          <span>Evaluate</span>
                        </button>
                        <button
                          onClick={() => setIsAiScoutDrawerOpen(true)}
                          className="py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/50 text-emerald-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          title="Ask AI Scout about this station with Google Maps Grounding"
                        >
                          <Bot size={13} className="text-emerald-400" />
                          <span>AI Scout</span>
                          <Sparkles size={11} className="text-amber-400" />
                        </button>
                      </div>
                    </motion.div>
                  )
                ) : activeDistrict ? (
                  isSpotlightMinimized ? (
                    <motion.div
                      key="district-minimized"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-950/95 backdrop-blur-2xl border border-amber-500/50 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-white pointer-events-auto"
                      id="district-slim-status-bar"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          <Compass size={14} className="text-amber-400" />
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-amber-300 font-bold text-xs tracking-tight truncate">
                            {activeDistrict.name} District
                          </span>
                          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold shrink-0">
                            Grade {activeDistrict.feasibilityGrade}
                          </span>
                          <span className="text-slate-400 text-[11px] font-mono hidden md:inline truncate">
                            {activeDistrict.rainfallAnnualMm}mm/yr • pH {activeDistrict.soilPh} • Aquifer: {activeDistrict.aquiferDepth.split('(')[0]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onClick={() => setIsSpotlightMinimized(false)}
                          className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer hover:scale-105"
                          title="Expand Telemetry Drawer"
                        >
                          <ChevronUp size={13} />
                          <span>Expand Drawer</span>
                        </button>
                        <button 
                          onClick={() => setActiveDistrict(null)} 
                          className="w-6 h-6 rounded-lg text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                          title="Dismiss District"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Active District Spotlight (Expanded Telemetry Drawer) */
                    <motion.div
                      key="district-spotlight"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-950/95 backdrop-blur-2xl border border-amber-500/50 p-4 rounded-3xl shadow-2xl flex flex-col gap-2.5 text-white pointer-events-auto max-w-lg"
                      id="district-expanded-drawer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="serif text-lg font-bold text-amber-300">
                              {activeDistrict.name} District
                            </span>
                            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 font-bold">
                              Grade {activeDistrict.feasibilityGrade}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                              {activeDistrict.region} Region
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setIsSpotlightMinimized(true)}
                            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-all cursor-pointer border border-white/10"
                            title="Collapse to status bar"
                          >
                            <ChevronDown size={13} />
                            <span>Collapse</span>
                          </button>
                          <button
                            onClick={() => setActiveDistrict(null)}
                            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            title="Dismiss Spotlight"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono py-1.5 border-y border-white/10 text-slate-300">
                        <div>
                          <span className="text-slate-500 text-[9px] block">Rainfall</span>
                          <span className="text-sky-300 font-bold">{activeDistrict.rainfallAnnualMm}mm/yr</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[9px] block">Soil & pH</span>
                          <span className="text-emerald-300 font-bold truncate block">{activeDistrict.soilPh}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[9px] block">Aquifer Depth</span>
                          <span className="text-amber-300 font-bold truncate block">{activeDistrict.aquiferDepth.split('(')[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          onClick={() => setIsSidebarOpen(true)}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                        >
                          <Sliders size={13} />
                          <span>District Intel</span>
                          <ChevronRight size={13} />
                        </button>
                        <button
                          onClick={() => setIsAiScoutDrawerOpen(true)}
                          className="py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/50 text-emerald-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          title="Ask AI Scout about this district with Google Maps Grounding"
                        >
                          <Bot size={13} className="text-emerald-400" />
                          <span>AI Scout</span>
                          <Sparkles size={11} className="text-amber-400" />
                        </button>
                        <button
                          onClick={() => handleFocusDistrict(activeDistrict)}
                          className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-mono text-xs flex items-center gap-1 transition-all cursor-pointer"
                          title="Center map on district"
                        >
                          <Target size={12} className="text-amber-400" />
                          <span className="hidden sm:inline">Re-Center</span>
                        </button>
                      </div>
                    </motion.div>
                  )
                ) : null}
              </AnimatePresence>
            </div>

            {/* Bottom Right: Live GPS Coordinate Ticker, Dropped Waypoint Pill & Active Tile Mode */}
            <div className="flex flex-col items-end gap-2 ml-auto shrink-0 pointer-events-auto">
              {sentEvaluatorNotice && (
                <div className="bg-emerald-950/95 border border-emerald-400/60 text-emerald-200 px-3 py-1.5 rounded-xl shadow-xl text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>{sentEvaluatorNotice}</span>
                  <Link to="/suitability" className="underline text-amber-300 hover:text-white font-bold ml-1">
                    Open Evaluator →
                  </Link>
                </div>
              )}

              {droppedWaypoint && (
                <div className="bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 px-3 py-2 rounded-2xl shadow-2xl flex flex-col gap-1.5 text-xs font-mono text-slate-200 max-w-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span>GPS Pin • {droppedWaypoint.districtName}</span>
                    </div>
                    <button
                      onClick={() => setDroppedWaypoint(null)}
                      className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                      title="Clear GPS Pin"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {droppedWaypoint.lat.toFixed(4)}°S, {droppedWaypoint.lng.toFixed(4)}°E • {droppedWaypoint.rainfallMm}mm/yr • {droppedWaypoint.soilPh} • Aquifer: {droppedWaypoint.aquiferDepth}
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <button
                      onClick={() => handleSaveWaypoint(droppedWaypoint)}
                      className="px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-[10px] font-bold cursor-pointer"
                    >
                      + Save Waypoint ({savedWaypoints.length})
                    </button>
                    <button
                      onClick={() =>
                        handleSendToEvaluatorFromMap(
                          `${droppedWaypoint.districtName} GPS Plot (${droppedWaypoint.lat.toFixed(3)}°, ${droppedWaypoint.lng.toFixed(3)}°)`,
                          droppedWaypoint.districtName,
                          `GPS ${droppedWaypoint.lat.toFixed(4)}°, ${droppedWaypoint.lng.toFixed(4)}° • ${droppedWaypoint.aquiferDepth}`
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[10px] font-bold cursor-pointer"
                    >
                      Evaluate Plot
                    </button>
                    <button
                      onClick={() => handleCopyCoords([droppedWaypoint.lng, droppedWaypoint.lat])}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] cursor-pointer"
                    >
                      {copiedCoords ? 'Copied!' : 'Copy GPS'}
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-slate-950/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2.5 text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Navigation size={12} className="text-amber-400 rotate-45" />
                  <span>
                    {liveCursorCoords 
                      ? `${liveCursorCoords.lat.toFixed(4)}°, ${liveCursorCoords.lng.toFixed(4)}°`
                      : `-13.2543°, 34.3015°`}
                  </span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-semibold hidden md:inline">
                  {tileStyle === 'offline-vector' ? 'Offline Vector' : tileStyle.toUpperCase()}
                </span>
                <span className="text-slate-600 hidden lg:inline">|</span>
                <span className="text-[10px] text-slate-400 hidden lg:inline" title="Desktop Shortcuts: L (Layers), F (Filters), A (AI Scout), D (Dossier)">
                  Keys: <strong className="text-amber-300">L</strong> Layers · <strong className="text-amber-300">F</strong> Filter · <strong className="text-amber-300">A</strong> AI · <strong className="text-amber-300">D</strong> Intel
                </span>
              </div>
            </div>

          </div>

          {/* Precision Compass Rose & Dynamic Metric Scale Bar */}
          <MapCompassAndScale 
            currentZoom={currentZoom}
            centerLat={currentMapCenter.lat}
            isAutoHidden={isDetailsAutoHidden}
            onWakeUp={wakeUpControls}
          />

          {/* Quick Thematic Map Layers UI Control Panel (Water Sources, Arable Land, Community Settlements) */}
          <ThematicLayerControlPanel
            waterSources={showRivers && showCatchmentBasins}
            onToggleWaterSources={(active) => {
              setShowRivers(active);
              setShowCatchmentBasins(active);
            }}
            arableLand={showSoilPhLayer}
            onToggleArableLand={(active) => {
              setShowSoilPhLayer(active);
            }}
            communitySettlements={showCommunitySettlements}
            onToggleCommunitySettlements={(active) => {
              setShowCommunitySettlements(active);
            }}
            onOpenAdvancedLayers={() => setIsLayersDeckOpen(true)}
            onOpenAiScout={() => {
              setAiScoutLayerInsightsMode(false);
              setIsAiScoutDrawerOpen(true);
            }}
            onGetAiInsights={() => {
              setAiScoutLayerInsightsMode(true);
              setIsAiScoutDrawerOpen(true);
            }}
            onSelectDistrictFocus={(districtName) => {
              const dSpec = getDistrictByIdOrName(districtName);
              if (dSpec) {
                handleFocusDistrict(dSpec);
              }
            }}
            isAutoHidden={isDetailsAutoHidden}
            onWakeUp={wakeUpControls}
          />

          {/* Collapsible GIS Map Legend */}
          <MapLegend 
            isAutoHidden={isDetailsAutoHidden}
            onWakeUp={wakeUpControls}
          />
        </div>

      {/* LIST CATALOGUE VIEW */}
      {viewMode === 'list' && (
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
        isMinimized={isDrawerMinimized}
        onToggleMinimize={setIsDrawerMinimized}
        activeFocusRegion={activeFocusRegion}
        selectedRegion={selectedRegion}
        activeDistrict={activeDistrict}
        climateZone={activeDistrictClimate}
        activeParcel={activeParcel}
        onSelectParcel={(p) => {
          setActiveParcel(p);
          setIsDrawerMinimized(true);
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
        onOpenAiScout={() => setIsAiScoutDrawerOpen(true)}
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
        showContourLines={showContourLines}
        setShowContourLines={setShowContourLines}
        showCustomaryBoundaries={showCustomaryBoundaries}
        setShowCustomaryBoundaries={setShowCustomaryBoundaries}
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
        showCommunitySettlements={showCommunitySettlements}
        setShowCommunitySettlements={setShowCommunitySettlements}
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

      {/* ------------------------------------------------------------- */}
      {/* 7. AI MAP SCOUT (GEMINI 3.8 FLASH + GOOGLE MAPS GROUNDING)    */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isAiScoutDrawerOpen && (
          <MapScoutAiDrawer
            isOpen={isAiScoutDrawerOpen}
            onClose={() => setIsAiScoutDrawerOpen(false)}
            activeDistrict={activeDistrict}
            activeParcelTitle={activeParcel?.title}
            currentCoordinates={
              liveCursorCoords 
                ? liveCursorCoords 
                : activeDistrict?.centroid 
                  ? { lat: activeDistrict.centroid[0], lng: activeDistrict.centroid[1] } 
                  : currentMapCenter
            }
            onFlyToCoordinates={(lat, lng) => {
              mapInstanceRef.current?.flyTo([lat, lng], 11, { duration: 1.2 });
            }}
            activeLayers={{
              waterSources: showRivers && showCatchmentBasins,
              arableLand: showSoilPhLayer,
              communitySettlements: showCommunitySettlements,
              rainfallIsohyets: showRainfallLayer,
              elevationTiers: showElevationLayer,
              catchmentBasins: showCatchmentBasins,
              riftEscarpments: showEscarpments,
              customaryBoundaries: showCustomaryBoundaries,
              districtBoundaries: showDistrictBoundaries
            }}
            layerInsightsMode={aiScoutLayerInsightsMode}
            zoomLevel={currentZoom}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
