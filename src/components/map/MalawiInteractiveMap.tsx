import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Mountain, Droplets, Sun, Layers, Filter, Compass, 
  ArrowRight, ShieldCheck, Check, Sparkles, X, ChevronRight,
  HardDrive, Bookmark, BookmarkCheck, ExternalLink, Info, Search,
  Scale, Navigation, Copy, CheckCircle2, Truck, FileText, CloudSun, Zap,
  Maximize2, Minimize2, Navigation2, Crosshair, Route, Globe, Award, Tent,
  Sprout, TreePine, Table, Map, ArrowUpDown, SlidersHorizontal,
  Waves, AlertTriangle, Trees, Eye, Activity, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { isItemBookmarked, toggleOfflineBookmark, getCachedSkills, getStoredTrackerData, saveStoredTrackerData } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';
import { URBAN_HUBS as CENTRAL_URBAN_HUBS, getDistrictRecord, getDistrictRainfall } from '@/constants';
import {
  projectGeoToSvg,
  geoGeometryToSvgPath,
  MALAWI_COUNTRY_GEOMETRY,
  LAKE_MALAWI_GEOMETRY,
  LAKE_CHILWA_GEOMETRY,
  NORTHERN_REGION_GEOMETRIES,
  CENTRAL_REGION_GEOMETRIES,
  SOUTHERN_REGION_GEOMETRIES,
  MALAWI_RIVERS,
  MALAWI_MOUNTAIN_PEAKS,
  MALAWI_CATCHMENT_BASINS,
  MALAWI_ESCARPMENTS,
  MALAWI_ELEVATION_ZONES,
} from '@/data/malawiGeoData';
import DetachedRegionMap from '@/components/map/DetachedRegionMap';
import { DetachedRegionId, DETACHED_REGIONS_DATA } from '@/data/malawiRegionalDetailData';

export interface LocationSpot {
  id: string;
  name: string;
  regionId: 'central' | 'northern' | 'southern';
  regionName: string;
  district: string;
  altitudeMeters: number;
  altitudeLabel: string;
  feasibilityGrade: 'A+' | 'A' | 'B+';
  feasibilityText: 'Excellent' | 'Very High' | 'High' | 'Moderate';
  lat: number;
  lng: number;
  rainfallMm: number;
  waterTableDepth: string;
  soilType: string;
  soilpH: string;
  landCostMwk: string;
  topCrops: string[];
  distanceFromMajorCity: string;
  summary: string;
  boreholeSuccess: string;
  lastVerified: string;
  dataConfidence: string;
  recommendedSkillIds: string[];
}

export const SCOUTING_HOTSPOTS: LocationSpot[] = [
  {
    id: 'dedza-highlands',
    name: 'Dedza Highlands',
    regionId: 'central',
    regionName: 'Central Region',
    district: 'Dedza District',
    altitudeMeters: 1650,
    altitudeLabel: '1,650m - 2,100m',
    feasibilityGrade: 'A+',
    feasibilityText: 'Excellent',
    lat: -14.38,
    lng: 34.33,
    rainfallMm: 1450,
    waterTableDepth: '15m - 25m (Shallow)',
    soilType: 'Deep volcanic red clay loam',
    soilpH: 'pH 6.0 - 6.5',
    landCostMwk: '1.5M - 3.5M MWK / acre',
    topCrops: ['Apples', 'Irish Potatoes', 'Wheat', 'Peaches', 'Cabbage', 'Dairy'],
    distanceFromMajorCity: '85 km from Lilongwe (1.5 hrs via M1)',
    summary: 'Cool high-altitude mountain sanctuary with reliable perennial springs, temperate fruit suitability, and direct access to Lilongwe markets via M1.',
    boreholeSuccess: '94% success rate',
    lastVerified: 'June 2024',
    dataConfidence: 'High Confidence • Ministry of Agriculture Soil Survey & Central Region Borehole Logs',
    recommendedSkillIds: ['fruit-tree-grafting', 'broadforking-notill', 'solar-food-dehydration']
  },
  {
    id: 'kasungu-plateau',
    name: 'Kasungu Plateau',
    regionId: 'central',
    regionName: 'Central Region',
    district: 'Kasungu District',
    altitudeMeters: 1100,
    altitudeLabel: '1,050m - 1,250m',
    feasibilityGrade: 'A',
    feasibilityText: 'High',
    lat: -13.03,
    lng: 33.48,
    rainfallMm: 1050,
    waterTableDepth: '25m - 45m (Medium)',
    soilType: 'Sandy clay loam & alluvial deposits',
    soilpH: 'pH 5.8 - 6.2',
    landCostMwk: '800,000 - 2.0M MWK / acre',
    topCrops: ['Maize', 'Groundnuts', 'Soya Beans', 'Cassava', 'Beekeeping'],
    distanceFromMajorCity: '130 km from Lilongwe (2 hrs via M1)',
    summary: 'Extensive fertile agricultural plains fed by the Bua River basin. Excellent for grain independence, solar pump irrigation, and large-scale homesteading.',
    boreholeSuccess: '88% success rate',
    lastVerified: 'March 2024',
    dataConfidence: 'High Confidence • Bua Basin Hydrological Survey & DCCMS Rainfall Data',
    recommendedSkillIds: ['broadforking-notill', 'seed-saving-heirloom', 'biochar-composting']
  },
  {
    id: 'viphya-plateau',
    name: 'Viphya & Mzuzu Highlands',
    regionId: 'northern',
    regionName: 'Northern Region',
    district: 'Mzimba / Mzuzu',
    altitudeMeters: 1750,
    altitudeLabel: '1,500m - 1,900m',
    feasibilityGrade: 'A+',
    feasibilityText: 'Very High',
    lat: -11.83,
    lng: 33.90,
    rainfallMm: 1700,
    waterTableDepth: '< 20m (Mountain Springs)',
    soilType: 'Forest humus & red humic loam',
    soilpH: 'pH 5.5 - 6.0',
    landCostMwk: '1.0M - 2.5M MWK / acre',
    topCrops: ['Arabica Coffee', 'Macadamia', 'Tea', 'Citrus', 'Timber'],
    distanceFromMajorCity: '360 km from Lilongwe / 20 km from Mzuzu',
    summary: 'Pristine, high-rainfall forest belt with pure gravity-fed water streams and cooler climates ideal for perennial tree crops.',
    boreholeSuccess: '96% stream flow rate',
    lastVerified: 'November 2023',
    dataConfidence: 'High Confidence • Forestry Department Water Sampling & Mzuzu Extension Service',
    recommendedSkillIds: ['fruit-tree-grafting', 'gravity-water-filtration', 'solar-pv-lithium-bank']
  },
  {
    id: 'zomba-plateau',
    name: 'Zomba & Shire Highlands',
    regionId: 'southern',
    regionName: 'Southern Region',
    district: 'Zomba District',
    altitudeMeters: 1400,
    altitudeLabel: '1,200m - 1,800m',
    feasibilityGrade: 'A',
    feasibilityText: 'High',
    lat: -15.38,
    lng: 35.32,
    rainfallMm: 1550,
    waterTableDepth: '18m - 30m',
    soilType: 'Rich volcanic loam',
    soilpH: 'pH 6.0 - 6.4',
    landCostMwk: '2.0M - 5.0M MWK / acre',
    topCrops: ['Strawberries', 'Market Vegetables', 'Macadamia', 'Poultry'],
    distanceFromMajorCity: '65 km from Blantyre (1 hr via M3)',
    summary: 'Historic university town highlands with excellent rainfall, mountain streams, and strong local community networks.',
    boreholeSuccess: '92% success rate',
    lastVerified: 'May 2024',
    dataConfidence: 'High Confidence • LUANAR Agro-forestry Testing & Zomba Water Board Records',
    recommendedSkillIds: ['small-livestock-poultry', 'salt-curing-solar-biltong', 'broadforking-notill']
  },
  {
    id: 'nyika-misuku',
    name: 'Nyika & Misuku Hills',
    regionId: 'northern',
    regionName: 'Northern Region',
    district: 'Chitipa / Rumphi',
    altitudeMeters: 2100,
    altitudeLabel: '1,800m - 2,400m',
    feasibilityGrade: 'A',
    feasibilityText: 'High',
    lat: -10.55,
    lng: 33.80,
    rainfallMm: 1850,
    waterTableDepth: 'Surface streams & springs',
    soilType: 'Upland organic peat loam',
    soilpH: 'pH 5.5',
    landCostMwk: '500,000 - 1.5M MWK / acre',
    topCrops: ['Misuku Coffee', 'Apples', 'Wheat', 'Sheep & Goats', 'Herbs'],
    distanceFromMajorCity: '160 km north of Mzuzu',
    summary: 'Ultimate secluded retreat sanctuary with alpine microclimate, crystal-clear streams, and complete isolation from urban noise.',
    boreholeSuccess: '98% spring reliability',
    lastVerified: 'January 2024',
    dataConfidence: 'Moderate-High Confidence • Highland Spring Flow Metering & Extension Samples',
    recommendedSkillIds: ['fruit-tree-grafting', 'seed-saving-heirloom', 'gravity-water-filtration']
  },
  {
    id: 'ntcheu-tsangano',
    name: 'Ntcheu / Tsangano Ridge',
    regionId: 'central',
    regionName: 'Central Region',
    district: 'Ntcheu District',
    altitudeMeters: 1500,
    altitudeLabel: '1,400m - 1,750m',
    feasibilityGrade: 'A+',
    feasibilityText: 'Excellent',
    lat: -14.82,
    lng: 34.63,
    rainfallMm: 1350,
    waterTableDepth: '12m - 22m',
    soilType: 'Deep red humic clay',
    soilpH: 'pH 6.2 - 6.6',
    landCostMwk: '1.2M - 2.8M MWK / acre',
    topCrops: ['Onions', 'Cabbage', 'Tomatoes', 'Irish Potatoes', 'Garlic'],
    distanceFromMajorCity: '150 km from Lilongwe / 160 km from Blantyre',
    summary: 'Malawi\'s premier vegetable breadbasket ridge with cool breezes, rich deep soils, and equal access to both Lilongwe and Blantyre.',
    boreholeSuccess: '91% success rate',
    lastVerified: 'April 2024',
    dataConfidence: 'High Confidence • Commercial Market Producer Census & Well Logs',
    recommendedSkillIds: ['broadforking-notill', 'biochar-composting', 'zeer-pot-evaporative-cooling']
  },
  {
    id: 'nkhotakota-lakeshore',
    name: 'Nkhotakota & Lake Shore',
    regionId: 'central',
    regionName: 'Central / Lakeshore',
    district: 'Nkhotakota District',
    altitudeMeters: 550,
    altitudeLabel: '480m - 650m',
    feasibilityGrade: 'B+',
    feasibilityText: 'Moderate',
    lat: -12.92,
    lng: 34.30,
    rainfallMm: 1100,
    waterTableDepth: '5m - 15m (Very Shallow)',
    soilType: 'Alluvial sandy loam & river silt',
    soilpH: 'pH 6.5 - 7.0',
    landCostMwk: '800,000 - 2.2M MWK / acre',
    topCrops: ['Rice', 'Mangos', 'Papaya', 'Cassava', 'Aquaculture Tilapia'],
    distanceFromMajorCity: '200 km from Lilongwe via M5',
    summary: 'Warm tropical valley with unlimited water from Lake Malawi and Bua River for year-round solar irrigation and fish farming.',
    boreholeSuccess: '99% shallow water table',
    lastVerified: 'February 2024',
    dataConfidence: 'Moderate Confidence • Water Resources Board & Shallow Well Seasonal Samples',
    recommendedSkillIds: ['solar-dambo-irrigation', 'zeer-pot-evaporative-cooling', 'rainwater-swale-dambo-capture']
  },
  {
    id: 'mulanje-slopes',
    name: 'Mulanje Massif Foothills',
    regionId: 'southern',
    regionName: 'Southern Region',
    district: 'Mulanje District',
    altitudeMeters: 1150,
    altitudeLabel: '900m - 1,500m',
    feasibilityGrade: 'B+',
    feasibilityText: 'Moderate',
    lat: -16.03,
    lng: 35.50,
    rainfallMm: 2200,
    waterTableDepth: 'Perennial waterfalls & streams',
    soilType: 'Acidic red tea loam',
    soilpH: 'pH 5.0 - 5.5',
    landCostMwk: '1.8M - 4.0M MWK / acre',
    topCrops: ['Tea', 'Macadamia', 'Bananas', 'Avocado', 'Pineapples'],
    distanceFromMajorCity: '85 km from Blantyre via M2',
    summary: 'Dramatic mountain backdrop receiving Malawi\'s highest annual rainfall, rich evergreen vegetation, and gravity waterfall feeds.',
    boreholeSuccess: '95% gravity stream access',
    lastVerified: 'July 2024',
    dataConfidence: 'High Confidence • Tea Research Foundation Meteorological & Soil Chemistry Records',
    recommendedSkillIds: ['rainwater-swale-dambo-capture', 'gravity-water-filtration', 'fruit-tree-grafting']
  }
];

export const MALAWI_HIGHWAYS = [
  {
    name: 'M1 Highway (North-South Spine)',
    code: 'M1',
    color: '#f59e0b',
    points: [
      { lat: -9.70, lng: 33.27 },
      { lat: -9.93, lng: 33.93 },
      { lat: -10.50, lng: 34.00 },
      { lat: -11.46, lng: 34.02 },
      { lat: -11.90, lng: 33.60 },
      { lat: -13.03, lng: 33.48 },
      { lat: -13.97, lng: 33.79 },
      { lat: -14.38, lng: 34.33 },
      { lat: -14.82, lng: 34.63 },
      { lat: -15.79, lng: 35.00 }
    ]
  },
  {
    name: 'M5 Lakeshore Highway',
    code: 'M5',
    color: '#38bdf8',
    points: [
      { lat: -13.78, lng: 34.45 },
      { lat: -12.92, lng: 34.30 },
      { lat: -12.52, lng: 34.15 },
      { lat: -11.60, lng: 34.30 }
    ]
  },
  {
    name: 'M2 Shire Highlands Highway',
    code: 'M2',
    color: '#fb923c',
    points: [
      { lat: -15.79, lng: 35.00 },
      { lat: -16.07, lng: 35.14 },
      { lat: -16.03, lng: 35.50 }
    ]
  },
  {
    name: 'M3 Zomba Highway',
    code: 'M3',
    color: '#34d399',
    points: [
      { lat: -15.38, lng: 35.32 },
      { lat: -15.06, lng: 35.23 },
      { lat: -14.47, lng: 35.26 }
    ]
  }
];

export const URBAN_HUBS = CENTRAL_URBAN_HUBS;

export type MapImageryStyle = 'vector' | 'satellite' | 'hybrid' | 'relief3d';
export type MapLayer = 'feasibility' | 'topography' | 'catchments' | 'escarpments' | 'elevation' | 'water' | 'soil' | 'highways';

function getSpotVisualProps(spot: LocationSpot, activeLayer: MapLayer, isSelected: boolean, isHovered: boolean) {
  let radius = 12;
  let strokeWidth = isSelected || isHovered ? 3.5 : 2;
  let fillColor = '#10b981';
  let strokeColor = '#ffffff';
  let outerRingRadius = 0;
  let outerRingThickness = 0;
  let outerRingColor = '';

  if (activeLayer === 'feasibility') {
    if (spot.feasibilityGrade === 'A+') {
      radius = 16;
      fillColor = '#10b981'; // emerald
      outerRingRadius = 22;
      outerRingThickness = 2;
      outerRingColor = '#34d399';
    } else if (spot.feasibilityGrade === 'A') {
      radius = 13;
      fillColor = '#3b82f6'; // blue
      outerRingRadius = 18;
      outerRingThickness = 1.5;
      outerRingColor = '#60a5fa';
    } else { // B+
      radius = 10;
      fillColor = '#f59e0b'; // amber
      outerRingRadius = 14;
      outerRingThickness = 1.5;
      outerRingColor = '#fbbf24';
    }
  } else if (activeLayer === 'topography' || activeLayer === 'elevation') {
    const altRatio = (spot.altitudeMeters - 500) / (2200 - 500);
    radius = 10 + altRatio * 10;
    outerRingRadius = radius + 6 + altRatio * 3;
    outerRingThickness = 1.5 + altRatio * 3;
    
    if (spot.altitudeMeters >= 1600) {
      fillColor = '#854d0e'; // highland brown / gold
      strokeColor = '#fef08a';
      outerRingColor = '#ca8a04';
    } else if (spot.altitudeMeters >= 1200) {
      fillColor = '#15803d'; // mid-plateau
      strokeColor = '#bbf7d0';
      outerRingColor = '#4ade80';
    } else if (spot.altitudeMeters >= 800) {
      fillColor = '#16a34a';
      strokeColor = '#86efac';
      outerRingColor = '#22c55e';
    } else {
      fillColor = '#65a30d'; // valley green
      strokeColor = '#ecfccb';
      outerRingColor = '#a3e635';
    }
  } else if (activeLayer === 'catchments') {
    radius = 13;
    fillColor = '#0284c7';
    strokeColor = '#38bdf8';
    outerRingRadius = 18;
    outerRingThickness = 2;
    outerRingColor = '#7dd3fc';
  } else if (activeLayer === 'escarpments') {
    radius = 14;
    fillColor = '#dc2626';
    strokeColor = '#fca5a5';
    outerRingRadius = 20;
    outerRingThickness = 2.5;
    outerRingColor = '#f87171';
  } else if (activeLayer === 'water') {
    const rainRatio = (spot.rainfallMm - 1000) / (2200 - 1000);
    radius = 10 + rainRatio * 10;
    outerRingRadius = radius + 5 + rainRatio * 5;
    outerRingThickness = 1.5 + rainRatio * 3.5;

    if (spot.rainfallMm >= 1800) {
      fillColor = '#0284c7';
      strokeColor = '#e0f2fe';
      outerRingColor = '#38bdf8';
    } else if (spot.rainfallMm >= 1400) {
      fillColor = '#0d9488';
      strokeColor = '#ccfbf1';
      outerRingColor = '#2dd4bf';
    } else {
      fillColor = '#0284c7';
      strokeColor = '#bae6fd';
      outerRingColor = '#38bdf8';
    }
  } else if (activeLayer === 'soil') {
    if (spot.soilType.toLowerCase().includes('volcanic')) {
      radius = 16;
      fillColor = '#ea580c';
      strokeColor = '#ffedd5';
      outerRingRadius = 22;
      outerRingThickness = 2.5;
      outerRingColor = '#fb923c';
    } else if (spot.soilType.toLowerCase().includes('humic') || spot.soilType.toLowerCase().includes('peat') || spot.soilType.toLowerCase().includes('forest')) {
      radius = 14;
      fillColor = '#b45309';
      strokeColor = '#fef3c7';
      outerRingRadius = 19;
      outerRingThickness = 2;
      outerRingColor = '#f59e0b';
    } else {
      radius = 11;
      fillColor = '#d97706';
      strokeColor = '#fffbeb';
      outerRingRadius = 15;
      outerRingThickness = 1.5;
      outerRingColor = '#fbbf24';
    }
  } else if (activeLayer === 'highways') {
    radius = 13;
    fillColor = '#f59e0b';
    strokeColor = '#ffffff';
    outerRingRadius = 18;
    outerRingThickness = 2;
    outerRingColor = '#fef08a';
  }

  if (isSelected) {
    radius = Math.max(radius + 3, 17);
    strokeColor = '#ffffff';
    strokeWidth = 4;
  } else if (isHovered) {
    radius = radius + 2;
    strokeWidth = 3;
  }

  return {
    radius,
    strokeWidth,
    fillColor,
    strokeColor,
    outerRingRadius,
    outerRingThickness,
    outerRingColor,
  };
}

function calculateHubDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 1.22);
}

export default function MalawiInteractiveMap() {
  const [selectedDetachedRegion, setSelectedDetachedRegion] = useState<DetachedRegionId | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<LocationSpot>(SCOUTING_HOTSPOTS[0]);
  const [hoveredSpot, setHoveredSpot] = useState<LocationSpot | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayer>('feasibility');
  
  // High-Resolution Satellite & Visual Cartography Style State
  const [mapImageryStyle, setMapImageryStyle] = useState<MapImageryStyle>('vector');
  
  // Independent Micro-GIS Topographic Overlays & Toggles
  const [show3dRelief, setShow3dRelief] = useState<boolean>(false);
  const [showContours, setShowContours] = useState<boolean>(true);
  const [showCatchmentOverlay, setShowCatchmentOverlay] = useState<boolean>(false);
  const [showEscarpmentOverlay, setShowEscarpmentOverlay] = useState<boolean>(false);
  const [showCanopyInspection, setShowCanopyInspection] = useState<boolean>(false);
  const [showParcelDemarcation, setShowParcelDemarcation] = useState<boolean>(true);

  const [regionFilter, setRegionFilter] = useState<'all' | 'central' | 'northern' | 'southern'>('all');
  const [altitudeFilter, setAltitudeFilter] = useState<'all' | 'high' | 'mid' | 'low'>('all');
  const [cropFilter, setCropFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);
  const [dossierCopied, setDossierCopied] = useState<boolean>(false);
  const [trackerSavedToast, setTrackerSavedToast] = useState<boolean>(false);

  // View Mode: Interactive Cartography Map vs Concise Data Matrix
  const [viewMode, setViewMode] = useState<'map' | 'matrix'>('map');
  const [sortField, setSortField] = useState<'feasibility' | 'rainfall' | 'altitude' | 'cost' | 'name'>('feasibility');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [quickPreset, setQuickPreset] = useState<'all' | 'grade_a' | 'high_rain' | 'high_alt' | 'shallow_water' | 'volcanic_soil'>('all');

  // Inspector Sub-tab state
  const [inspectorTab, setInspectorTab] = useState<'overview' | 'microgis' | 'logistics' | 'crops'>('overview');
  const [selectedHubKey, setSelectedHubKey] = useState<'lilongwe' | 'blantyre' | 'mzuzu'>('lilongwe');

  // Microclimate Seasonal Simulator
  const [seasonMode, setSeasonMode] = useState<'dry' | 'rainy' | 'cold'>('dry');
  const [showHighwaysLayer, setShowHighwaysLayer] = useState<boolean>(true);
  const [isTheaterFullscreen, setIsTheaterFullscreen] = useState<boolean>(false);
  const [sonarRipple, setSonarRipple] = useState<{ x: number; y: number; key: number } | null>(null);

  // Comparison Tool State
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareSpots, setCompareSpots] = useState<LocationSpot[]>([SCOUTING_HOTSPOTS[0], SCOUTING_HOTSPOTS[2]]);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => isItemBookmarked(selectedSpot.id, 'region'));

  const allSkills = getCachedSkills();

  // High-Density SVG ViewBox Dimensions (600x950)
  const SVG_VW = 600;
  const SVG_VH = 950;
  const SVG_PAD = 35;

  const handleSelectSpot = (spot: LocationSpot) => {
    setSelectedSpot(spot);
    setIsBookmarked(isItemBookmarked(spot.id, 'region'));

    const { x, y } = projectGeoToSvg(spot.lat, spot.lng, SVG_VW, SVG_VH, SVG_PAD);
    setSonarRipple({ x, y, key: Date.now() });
  };

  const handleBookmarkToggle = () => {
    const updated = toggleOfflineBookmark({
      id: selectedSpot.id,
      type: 'region',
      title: selectedSpot.name
    });
    setIsBookmarked(updated);
  };

  const handleSaveToTracker = (spot: LocationSpot) => {
    toggleOfflineBookmark({
      id: spot.id,
      type: 'region',
      title: spot.name
    });
    setIsBookmarked(true);

    try {
      const trackerSteps = getStoredTrackerData();
      if (trackerSteps && Array.isArray(trackerSteps)) {
        const scoutStep = trackerSteps.find((s: any) => s.id === 'scout');
        if (scoutStep && Array.isArray(scoutStep.subtasks)) {
          const taskTitle = `Scout site & verify soil pH in ${spot.name} (${spot.district})`;
          const exists = scoutStep.subtasks.some((st: any) => st.title?.includes(spot.name) || st.label?.includes(spot.name));
          if (!exists) {
            scoutStep.subtasks.push({
              id: `scout-${spot.id}-${Date.now()}`,
              title: taskTitle,
              label: taskTitle,
              completed: false,
              estimatedDays: '3-5 Days',
              priority: 'High'
            });
            saveStoredTrackerData(trackerSteps);
          }
        }
      }
    } catch (e) {
      console.error('Error adding to Exodus Tracker', e);
    }

    setTrackerSavedToast(true);
    setTimeout(() => setTrackerSavedToast(false), 3000);
  };

  const toggleCompareSpot = (spot: LocationSpot) => {
    if (compareSpots.some(s => s.id === spot.id)) {
      if (compareSpots.length <= 1) return;
      setCompareSpots(compareSpots.filter(s => s.id !== spot.id));
    } else {
      if (compareSpots.length >= 3) return;
      setCompareSpots([...compareSpots, spot]);
    }
  };

  const copyCoordinates = () => {
    const text = `${selectedSpot.lat.toFixed(2)}° S, ${selectedSpot.lng.toFixed(2)}° E`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const exportDossier = () => {
    const text = `
MALAWI OUTPOST SCOUTING DOSSIER
==================================
Hotspot: ${selectedSpot.name} (${selectedSpot.district})
Region: ${selectedSpot.regionName}
Feasibility Grade: ${selectedSpot.feasibilityGrade} (${selectedSpot.feasibilityText})
GPS Coordinates: ${selectedSpot.lat.toFixed(2)}° S, ${selectedSpot.lng.toFixed(2)}° E
Data Verification: ${selectedSpot.lastVerified} (${selectedSpot.dataConfidence})

ENVIRONMENTAL & SOIL METRICS
- Altitude: ${selectedSpot.altitudeLabel} (${selectedSpot.altitudeMeters}m)
- Annual Rainfall: ${selectedSpot.rainfallMm} mm
- Water Table Depth: ${selectedSpot.waterTableDepth}
- Borehole Reliability: ${selectedSpot.boreholeSuccess}
- Soil Type & pH: ${selectedSpot.soilType} (${selectedSpot.soilpH})
- Land Price: ${selectedSpot.landCostMwk}

HIGH-YIELD PRODUCE & CROPS
${selectedSpot.topCrops.map(c => `- ${c}`).join('\n')}

LOGISTICS & DISTANCE
${selectedSpot.distanceFromMajorCity}

SUMMARY & ADVISORY
"${selectedSpot.summary}"
----------------------------------
Generated from Malawi Permaculture Sanctuary Builder
    `.trim();

    navigator.clipboard.writeText(text);
    setDossierCopied(true);
    setTimeout(() => setDossierCopied(false), 2500);
  };

  const POPULAR_CROPS = ['all', 'Arabica Coffee', 'Apples', 'Irish Potatoes', 'Macadamia', 'Tea', 'Maize', 'Rice'];

  const filteredSpots = SCOUTING_HOTSPOTS.filter(spot => {
    // Quick Presets
    if (quickPreset === 'grade_a' && spot.feasibilityGrade !== 'A+' && spot.feasibilityGrade !== 'A') return false;
    if (quickPreset === 'high_rain' && spot.rainfallMm < 1400) return false;
    if (quickPreset === 'high_alt' && spot.altitudeMeters < 1500) return false;
    if (quickPreset === 'shallow_water' && !spot.waterTableDepth.toLowerCase().includes('shallow') && !spot.waterTableDepth.toLowerCase().includes('stream') && !spot.waterTableDepth.toLowerCase().includes('< 20m')) return false;
    if (quickPreset === 'volcanic_soil' && !spot.soilType.toLowerCase().includes('volcanic')) return false;

    if (regionFilter !== 'all' && spot.regionId !== regionFilter) return false;
    if (altitudeFilter === 'high' && spot.altitudeMeters < 1400) return false;
    if (altitudeFilter === 'mid' && (spot.altitudeMeters < 900 || spot.altitudeMeters >= 1400)) return false;
    if (altitudeFilter === 'low' && spot.altitudeMeters >= 900) return false;

    if (cropFilter !== 'all') {
      const hasCrop = spot.topCrops.some(c => c.toLowerCase().includes(cropFilter.toLowerCase()));
      if (!hasCrop) return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = spot.name.toLowerCase().includes(q);
      const matchDistrict = spot.district.toLowerCase().includes(q);
      const matchSummary = spot.summary.toLowerCase().includes(q);
      const matchCrops = spot.topCrops.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchDistrict && !matchSummary && !matchCrops) return false;
    }

    return true;
  }).sort((a, b) => {
    let comp = 0;
    if (sortField === 'feasibility') {
      const gradeScore: Record<string, number> = { 'A+': 3, 'A': 2, 'B+': 1 };
      comp = (gradeScore[b.feasibilityGrade] || 0) - (gradeScore[a.feasibilityGrade] || 0);
    } else if (sortField === 'rainfall') {
      comp = b.rainfallMm - a.rainfallMm;
    } else if (sortField === 'altitude') {
      comp = b.altitudeMeters - a.altitudeMeters;
    } else if (sortField === 'name') {
      comp = a.name.localeCompare(b.name);
    } else if (sortField === 'cost') {
      comp = a.landCostMwk.localeCompare(b.landCostMwk);
    }
    return sortOrder === 'desc' ? comp : -comp;
  });

  const matchedSkills = allSkills.filter(skill =>
    selectedSpot.recommendedSkillIds.includes(skill.id)
  );

  // If detached zoomed region is active, render the dedicated DetachedRegionMap component
  if (selectedDetachedRegion) {
    return (
      <DetachedRegionMap
        regionId={selectedDetachedRegion}
        onSelectRegion={(id) => setSelectedDetachedRegion(id)}
        onBackToFullCountry={() => setSelectedDetachedRegion(null)}
      />
    );
  }

  return (
    <div className={cn(
      "flex flex-col gap-8 transition-all duration-300",
      isTheaterFullscreen
        ? "fixed inset-0 z-50 bg-slate-950 p-6 md:p-10 overflow-y-auto text-white"
        : "bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-[3rem] border border-white/80 shadow-2xl"
    )}>
      {/* Map Header & Main Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-terracotta-700 font-black uppercase text-[10px] tracking-[0.25em] bg-terracotta-100 px-3 py-0.5 rounded-full border border-terracotta-200">
              High-Precision Cartography Vector Engine
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
              <HardDrive size={10} /> Saved Offline
            </span>
          </div>
          <h3 className={cn("serif text-3xl md:text-4xl font-bold mt-2", isTheaterFullscreen ? "text-white" : "text-emerald-950")}>
            Malawi Outpost Scouting Map
          </h3>
          <p className={cn("text-xs md:text-sm font-medium mt-1", isTheaterFullscreen ? "text-slate-300" : "text-slate-600")}>
            High-resolution vector terrain map with altitude profiles, rainfall layers, M1 road network, and hydrogeological ground audits. Click any region to view a zoomed detached micro-cartography layer.
          </p>
        </div>

        {/* Map Control Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Primary View Switcher: Interactive Map vs Concise Data Matrix */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-700 shadow-md">
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                viewMode === 'map'
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              <Map size={14} /> Map View
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                viewMode === 'matrix'
                  ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              <Table size={14} /> Compare Table
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[9px] font-black",
                viewMode === 'matrix' ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-300"
              )}>
                {filteredSpots.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsTheaterFullscreen(!isTheaterFullscreen)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95 border border-emerald-600"
          >
            {isTheaterFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span>{isTheaterFullscreen ? 'Exit Theater' : 'Expand Theater Mode'}</span>
          </button>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={cn(
              "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm border active:scale-95",
              compareMode
                ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold ring-2 ring-amber-300"
                : "bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50"
            )}
          >
            <Scale size={15} />
            {compareMode ? 'Exit Compare Mode' : 'Compare Sites'}
          </button>

          {/* Layer Selector */}
          <div className="flex flex-wrap items-center gap-1 bg-white/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-sm text-slate-900">
            <button
              onClick={() => setActiveLayer('feasibility')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'feasibility'
                  ? "bg-emerald-800 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <ShieldCheck size={13} /> Feasibility
            </button>

            <button
              onClick={() => setActiveLayer('topography')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'topography'
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Mountain size={13} /> 3D Relief & Topo
            </button>

            <button
              onClick={() => setActiveLayer('catchments')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'catchments'
                  ? "bg-sky-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Droplets size={13} /> Catchments
            </button>

            <button
              onClick={() => setActiveLayer('escarpments')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'escarpments'
                  ? "bg-rose-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Zap size={13} /> Escarpments & Swales
            </button>

            <button
              onClick={() => setActiveLayer('elevation')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'elevation'
                  ? "bg-terracotta-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Mountain size={13} /> Altitude
            </button>

            <button
              onClick={() => setActiveLayer('water')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'water'
                  ? "bg-teal-700 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Droplets size={13} /> Water & Rivers
            </button>

            <button
              onClick={() => setActiveLayer('soil')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'soil'
                  ? "bg-amber-800 text-white shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Layers size={13} /> Soil & pH
            </button>

            <button
              onClick={() => setActiveLayer('highways')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1",
                activeLayer === 'highways'
                  ? "bg-amber-500 text-slate-950 font-black shadow-md"
                  : "text-slate-600 hover:text-emerald-900 hover:bg-slate-100"
              )}
            >
              <Route size={13} /> Highways
            </button>
          </div>
        </div>
      </div>

      {/* DETACHED REGION VIEW SELECTOR BAR */}
      <div className="bg-emerald-900/90 text-white p-4 rounded-2xl border border-emerald-700/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-black uppercase tracking-wider text-amber-200">
            Detached Regional Micro-Cartography:
          </span>
          <span className="text-xs text-emerald-200 hidden sm:inline">
            Zoom into any region for isolated terrain, soil type, rainfall, crops, roads, rivers, settlements, and forests.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedDetachedRegion('northern')}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all border border-emerald-600 flex items-center gap-1.5 hover:scale-102 shadow-sm"
          >
            <Mountain size={13} className="text-amber-300" />
            <span>Detached North</span>
          </button>

          <button
            onClick={() => setSelectedDetachedRegion('central')}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all border border-emerald-600 flex items-center gap-1.5 hover:scale-102 shadow-sm"
          >
            <Sprout size={13} className="text-emerald-300" />
            <span>Detached Central</span>
          </button>

          <button
            onClick={() => setSelectedDetachedRegion('southern')}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all border border-emerald-600 flex items-center gap-1.5 hover:scale-102 shadow-sm"
          >
            <TreePine size={13} className="text-teal-300" />
            <span>Detached South</span>
          </button>
        </div>
      </div>

      {/* Filtering & Search Toolbar */}
      <div className="flex flex-col gap-3 bg-white/70 p-4 rounded-2xl border border-white/90 text-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by hotspot, district, crop (e.g. Coffee, Dedza, M1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs font-bold text-emerald-950 placeholder-slate-400 focus:outline-none focus:ring-2 ring-emerald-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-terracotta-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Region:</span>
              <select
                value={regionFilter}
                onChange={(e: any) => setRegionFilter(e.target.value)}
                className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 ring-emerald-500 shadow-sm"
              >
                <option value="all">All Regions</option>
                <option value="central">Central Region</option>
                <option value="northern">Northern Region</option>
                <option value="southern">Southern Region</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <Mountain size={13} className="text-emerald-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Altitude:</span>
              <select
                value={altitudeFilter}
                onChange={(e: any) => setAltitudeFilter(e.target.value)}
                className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 ring-emerald-500 shadow-sm"
              >
                <option value="all">All Altitudes</option>
                <option value="high">Cool (&gt;1,400m)</option>
                <option value="mid">Mid (900m-1,400m)</option>
                <option value="low">Low (&lt;900m)</option>
              </select>
            </div>
          </div>

          <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
            Showing <span className="text-emerald-800 font-extrabold">{filteredSpots.length}</span> / {SCOUTING_HOTSPOTS.length} Hotspots
          </div>
        </div>

        {/* Quick Presets & Crop Filter Chips */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] font-black uppercase text-terracotta-700 tracking-wider mr-1 flex items-center gap-1">
              <Sparkles size={11} /> Quick Presets:
            </span>
            <button
              onClick={() => { setQuickPreset('all'); setCropFilter('all'); setRegionFilter('all'); setAltitudeFilter('all'); }}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all",
                quickPreset === 'all' && cropFilter === 'all' && regionFilter === 'all' && altitudeFilter === 'all'
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200"
              )}
            >
              All Zones ({SCOUTING_HOTSPOTS.length})
            </button>
            <button
              onClick={() => setQuickPreset(quickPreset === 'grade_a' ? 'all' : 'grade_a')}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1",
                quickPreset === 'grade_a'
                  ? "bg-emerald-800 text-white shadow-sm font-extrabold"
                  : "bg-white/80 text-emerald-900 hover:bg-emerald-50 border border-emerald-200"
              )}
            >
              <ShieldCheck size={11} className="text-emerald-500" /> Grade A/A+ Prime Sites
            </button>
            <button
              onClick={() => setQuickPreset(quickPreset === 'high_rain' ? 'all' : 'high_rain')}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1",
                quickPreset === 'high_rain'
                  ? "bg-sky-800 text-white shadow-sm font-extrabold"
                  : "bg-white/80 text-sky-900 hover:bg-sky-50 border border-sky-200"
              )}
            >
              <Droplets size={11} className="text-sky-500" /> High Rainfall (&gt;1,400mm)
            </button>
            <button
              onClick={() => setQuickPreset(quickPreset === 'high_alt' ? 'all' : 'high_alt')}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1",
                quickPreset === 'high_alt'
                  ? "bg-terracotta-800 text-white shadow-sm font-extrabold"
                  : "bg-white/80 text-terracotta-900 hover:bg-terracotta-50 border border-terracotta-200"
              )}
            >
              <Mountain size={11} className="text-amber-500" /> High Elevation (&gt;1,500m)
            </button>
            <button
              onClick={() => setQuickPreset(quickPreset === 'shallow_water' ? 'all' : 'shallow_water')}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1",
                quickPreset === 'shallow_water'
                  ? "bg-teal-800 text-white shadow-sm font-extrabold"
                  : "bg-white/80 text-teal-900 hover:bg-teal-50 border border-teal-200"
              )}
            >
              <Compass size={11} className="text-teal-400" /> Shallow Water Table
            </button>
            <button
              onClick={() => setQuickPreset(quickPreset === 'volcanic_soil' ? 'all' : 'volcanic_soil')}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1",
                quickPreset === 'volcanic_soil'
                  ? "bg-amber-800 text-white shadow-sm font-extrabold"
                  : "bg-white/80 text-amber-900 hover:bg-amber-50 border border-amber-200"
              )}
            >
              <Layers size={11} className="text-amber-400" /> Volcanic Loam Soil
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200/40">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider mr-1">
              Crop Focus:
            </span>
            {POPULAR_CROPS.map((crop) => (
              <button
                key={crop}
                onClick={() => setCropFilter(crop)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all",
                  cropFilter === crop
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-emerald-950 border border-slate-200"
                )}
              >
                {crop === 'all' ? 'All Produce' : crop}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARE MODE DRAWER */}
      {compareMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-emerald-950 text-white p-6 md:p-8 rounded-[2.5rem] border border-emerald-800 shadow-2xl flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
            <div>
              <span className="text-amber-400 font-black uppercase text-[9px] tracking-widest block">
                Side by Side
              </span>
              <h4 className="serif text-2xl font-bold text-white mt-0.5 flex items-center gap-2">
                <Scale size={20} className="text-amber-400" /> Compare Selected Locations
              </h4>
            </div>

            <span className="text-xs text-emerald-300 font-medium">
              Click pins on the map below to toggle comparison selection (Max 3 spots).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-emerald-900/80 p-5 rounded-2xl border border-emerald-700/80 flex flex-col justify-between gap-4 relative"
              >
                <button
                  onClick={() => toggleCompareSpot(spot)}
                  className="absolute top-3 right-3 text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800"
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-800 text-amber-300 border border-emerald-700">
                      Grade {spot.feasibilityGrade}
                    </span>
                    <span className="text-[9px] font-medium text-emerald-300">{spot.district}</span>
                  </div>
                  <h5 className="serif text-xl font-bold text-white mt-1">{spot.name}</h5>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                    <span className="text-emerald-300">Altitude</span>
                    <span className="font-bold text-white">{spot.altitudeLabel}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                    <span className="text-emerald-300">Annual Rainfall</span>
                    <span className="font-bold text-amber-300">{spot.rainfallMm} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                    <span className="text-emerald-300">Water Table</span>
                    <span className="font-bold text-white">{spot.waterTableDepth}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                    <span className="text-emerald-300">Soil Acidity</span>
                    <span className="font-bold text-white">{spot.soilpH}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                    <span className="text-emerald-300">Borehole Yield</span>
                    <span className="font-bold text-emerald-200">{spot.boreholeSuccess}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-emerald-300">Land Price/Acre</span>
                    <span className="font-extrabold text-amber-400">{spot.landCostMwk}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectSpot(spot)}
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition-all"
                >
                  Select on Map
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* View Mode Switching: Map View vs Concise Data Matrix */}
      {viewMode === 'matrix' ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Matrix Analytics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                Total Matching Sites
              </span>
              <div className="text-2xl font-extrabold text-emerald-950 mt-1">
                {filteredSpots.length} <span className="text-xs text-slate-500 font-normal">/ {SCOUTING_HOTSPOTS.length}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-2xs">
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">
                Grade A / A+ Prime
              </span>
              <div className="text-2xl font-extrabold text-emerald-800 mt-1">
                {filteredSpots.filter(s => s.feasibilityGrade === 'A+' || s.feasibilityGrade === 'A').length}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-2xs">
              <span className="text-[10px] font-black uppercase text-sky-700 tracking-wider block">
                Avg Annual Rainfall
              </span>
              <div className="text-2xl font-extrabold text-sky-900 mt-1">
                {filteredSpots.length > 0
                  ? Math.round(filteredSpots.reduce((acc, s) => acc + s.rainfallMm, 0) / filteredSpots.length)
                  : 0} <span className="text-xs text-slate-500 font-normal">mm</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-2xs">
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                Avg Elevation
              </span>
              <div className="text-2xl font-extrabold text-amber-900 mt-1">
                {filteredSpots.length > 0
                  ? Math.round(filteredSpots.reduce((acc, s) => acc + s.altitudeMeters, 0) / filteredSpots.length)
                  : 0} <span className="text-xs text-slate-500 font-normal">meters</span>
              </div>
            </div>
          </div>

          {/* Matrix Table & Quick Sort Controls */}
          <div className="bg-white rounded-[2rem] border border-[#E6DFD1] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#E6DFD1] flex flex-wrap items-center justify-between gap-4 bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Table size={18} className="text-amber-700" />
                <h3 className="serif text-lg font-bold text-emerald-950">
                  Compare Homestead Sites Across Malawi
                </h3>
                <span className="text-xs text-slate-500 font-medium ml-2">
                  ({filteredSpots.length} zones found)
                </span>
              </div>

              {/* Sort controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <ArrowUpDown size={13} /> Sort By:
                </span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as any)}
                  aria-label="Sort Table by Field"
                  className="bg-white border border-[#E6DFD1] rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-950 shadow-2xs focus:outline-emerald-800"
                >
                  <option value="feasibility">Suitability Grade</option>
                  <option value="rainfall">Annual Rainfall (High to Low)</option>
                  <option value="altitude">Elevation (High to Low)</option>
                  <option value="cost">Land Cost / Acre</option>
                  <option value="name">Site Name (A-Z)</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  aria-label="Toggle Sort Order"
                  className="bg-white border border-[#E6DFD1] hover:bg-slate-50 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all"
                >
                  {sortOrder === 'desc' ? 'High → Low' : 'Low → High'}
                </button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-[#E6DFD1] text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Hotspot & Region</th>
                    <th className="py-3.5 px-3 text-center">Grade</th>
                    <th className="py-3.5 px-3">Elevation</th>
                    <th className="py-3.5 px-3">Rainfall</th>
                    <th className="py-3.5 px-3">Water Table</th>
                    <th className="py-3.5 px-3">Soil & pH</th>
                    <th className="py-3.5 px-3">Price / Acre</th>
                    <th className="py-3.5 px-3">Top Crops</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {filteredSpots.map((spot) => {
                    const isSelected = selectedSpot.id === spot.id;
                    return (
                      <tr
                        key={spot.id}
                        onClick={() => setSelectedSpot(spot)}
                        className={cn(
                          "transition-colors hover:bg-emerald-50/50 cursor-pointer",
                          isSelected ? "bg-emerald-50/90 font-medium" : ""
                        )}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className={cn(
                              "w-2.5 h-2.5 rounded-full shrink-0",
                              spot.regionId === 'northern' ? "bg-amber-600" :
                              spot.regionId === 'central' ? "bg-emerald-600" : "bg-sky-600"
                            )} />
                            <div>
                              <div className="font-extrabold text-emerald-950 text-sm">
                                {spot.name}
                              </div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                {spot.regionName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-black",
                            spot.feasibilityGrade === 'A+' ? "bg-emerald-800 text-white shadow-2xs" :
                            spot.feasibilityGrade === 'A' ? "bg-emerald-600 text-white" :
                            "bg-amber-500 text-slate-950"
                          )}>
                            {spot.feasibilityGrade}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-extrabold text-slate-800">
                            {spot.altitudeMeters.toLocaleString()} m
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {spot.altitudeLabel}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-extrabold text-sky-900">
                            {spot.rainfallMm} mm
                          </div>
                          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className="bg-sky-600 h-full rounded-full"
                              style={{ width: `${Math.min(100, (spot.rainfallMm / 2000) * 100)}%` }}
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-800">
                            {spot.waterTableDepth}
                          </div>
                          <div className="text-[10px] text-emerald-800 font-medium">
                            Yield: {spot.boreholeSuccess}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-800 line-clamp-1 max-w-[140px]" title={spot.soilType}>
                            {spot.soilType}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            pH: <span className="font-bold text-emerald-900">{spot.soilpH}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-black text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                            {spot.landCostMwk}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {spot.topCrops.slice(0, 2).map((c, i) => (
                              <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                {c}
                              </span>
                            ))}
                            {spot.topCrops.length > 2 && (
                              <span className="text-[9px] text-slate-400 font-bold">
                                +{spot.topCrops.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectSpot(spot);
                                setViewMode('map');
                              }}
                              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all shadow-2xs flex items-center gap-1"
                            >
                              <Map size={11} /> Map View
                            </button>
                            <Link
                              to={`/regions/${spot.regionId}`}
                              onClick={(e) => e.stopPropagation()}
                              className="px-2.5 py-1.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 border border-terracotta-200 rounded-lg text-[11px] font-bold transition-all"
                            >
                              Region
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredSpots.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <Search size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="font-bold">No hotspots match the selected filters or quick preset.</p>
                <button
                  onClick={() => {
                    setQuickPreset('all');
                    setRegionFilter('all');
                    setAltitudeFilter('all');
                    setCropFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Main Split View: Huge Vector Map Canvas + Selected Location Inspector Panel */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SVG Cartography Canvas Viewport (7 Cols on desktop, expandable) */}
        <div className="lg:col-span-7 bg-emerald-950 rounded-[2.5rem] p-6 md:p-8 border border-emerald-800/80 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[620px] select-none">
          
          {/* Subtle Canvas Radial Texture & Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e3a29_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

          {/* Top Bar on Map Viewport: High-Resolution Satellite & Style Selector */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-white/90 bg-emerald-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-700/60 text-xs font-bold shadow-md">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-amber-400 animate-spin-slow" />
              <div className="flex flex-col">
                <span className="uppercase tracking-wider text-[11px] font-black text-amber-300 flex items-center gap-1.5">
                  Style: {mapImageryStyle.toUpperCase()}
                  {show3dRelief && <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-full">+ 3D RELIEF</span>}
                </span>
                <span className="text-[9px] text-emerald-300 font-semibold">
                  Layer: {activeLayer.toUpperCase()} • {filteredSpots.length} Sites Active
                </span>
              </div>
            </div>
            
            {/* Imagery & Micro-GIS Style Buttons */}
            <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-800">
              <button
                onClick={() => setMapImageryStyle('vector')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1",
                  mapImageryStyle === 'vector'
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                )}
                title="Artistic Vector Cartography"
              >
                <Layers size={11} /> Vector
              </button>

              <button
                onClick={() => setMapImageryStyle('satellite')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1",
                  mapImageryStyle === 'satellite'
                    ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-300 hover:text-white"
                )}
                title="High-Resolution Satellite Aerial View"
              >
                <Eye size={11} /> Satellite HD
              </button>

              <button
                onClick={() => setMapImageryStyle('hybrid')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1",
                  mapImageryStyle === 'hybrid'
                    ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                    : "text-slate-300 hover:text-white"
                )}
                title="Satellite Imagery with Highway Vector Overlay"
              >
                <Globe size={11} /> Hybrid
              </button>

              <button
                onClick={() => {
                  setMapImageryStyle('relief3d');
                  setShow3dRelief(true);
                  setShowContours(true);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1",
                  mapImageryStyle === 'relief3d'
                    ? "bg-amber-600 text-white font-black shadow-sm"
                    : "text-slate-300 hover:text-white"
                )}
                title="3D Shaded Relief & Hypsometric Gradients"
              >
                <Mountain size={11} /> 3D Relief
              </button>
            </div>
          </div>

          {/* Micro-GIS & Topographic Overlays Quick Toggle Ribbon */}
          <div className="relative z-10 mt-2 flex flex-wrap items-center justify-between gap-1.5 bg-emerald-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-800 text-[10px]">
            <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[9px] flex items-center gap-1">
              <Activity size={12} className="text-amber-400" /> Overlays:
            </span>

            <div className="flex flex-wrap items-center gap-1">
              <button
                onClick={() => setShow3dRelief(!show3dRelief)}
                className={cn(
                  "px-2 py-0.8 rounded-lg font-bold transition-all flex items-center gap-1 border",
                  show3dRelief
                    ? "bg-amber-500/20 text-amber-300 border-amber-400"
                    : "bg-emerald-900/40 text-slate-300 border-emerald-800 hover:text-white"
                )}
              >
                <Mountain size={10} /> 3D Elevation Relief
              </button>

              <button
                onClick={() => setShowContours(!showContours)}
                className={cn(
                  "px-2 py-0.8 rounded-lg font-bold transition-all flex items-center gap-1 border",
                  showContours
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                    : "bg-emerald-900/40 text-slate-300 border-emerald-800 hover:text-white"
                )}
              >
                <Layers size={10} /> 200m Contours
              </button>

              <button
                onClick={() => setShowCatchmentOverlay(!showCatchmentOverlay)}
                className={cn(
                  "px-2 py-0.8 rounded-lg font-bold transition-all flex items-center gap-1 border",
                  showCatchmentOverlay
                    ? "bg-sky-500/20 text-sky-300 border-sky-400"
                    : "bg-emerald-900/40 text-slate-300 border-emerald-800 hover:text-white"
                )}
              >
                <Droplets size={10} /> Catchment Basins
              </button>

              <button
                onClick={() => setShowEscarpmentOverlay(!showEscarpmentOverlay)}
                className={cn(
                  "px-2 py-0.8 rounded-lg font-bold transition-all flex items-center gap-1 border",
                  showEscarpmentOverlay
                    ? "bg-rose-500/20 text-rose-300 border-rose-400"
                    : "bg-emerald-900/40 text-slate-300 border-emerald-800 hover:text-white"
                )}
              >
                <AlertTriangle size={10} /> Escarpments & Swales
              </button>

              <button
                onClick={() => setShowCanopyInspection(!showCanopyInspection)}
                className={cn(
                  "px-2 py-0.8 rounded-lg font-bold transition-all flex items-center gap-1 border",
                  showCanopyInspection
                    ? "bg-teal-500/20 text-teal-300 border-teal-400"
                    : "bg-emerald-900/40 text-slate-300 border-emerald-800 hover:text-white"
                )}
              >
                <Trees size={10} /> Canopy & Parcels
              </button>
            </div>
          </div>

          {/* High-Density SVG Cartographic Map Viewport (600x950 coordinate space) */}
          <div className="relative w-full h-[580px] md:h-[640px] my-4 flex items-center justify-center overflow-hidden rounded-3xl">
            {filteredSpots.length === 0 ? (
              <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center p-6 text-center z-30">
                <div className="w-14 h-14 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-400 mb-3 shadow-lg">
                  <Search size={24} />
                </div>
                <h4 className="serif text-xl font-bold text-white">No Outpost Hotspots Found</h4>
                <p className="text-xs text-emerald-300 max-w-xs mt-1 leading-relaxed">
                  No sanctuary sites match your current search "{searchQuery}" or active filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setRegionFilter('all');
                    setAltitudeFilter('all');
                    setCropFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all border border-emerald-500 shadow-md"
                >
                  Reset Map Filters
                </button>
              </div>
            ) : null}

            <svg
              viewBox={`0 0 ${SVG_VW} ${SVG_VH}`}
              className="w-full h-full max-h-[640px] drop-shadow-2xl transition-transform duration-500 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.98" />
                </linearGradient>

                <linearGradient id="satelliteWaterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0369a1" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#082f49" stopOpacity="1" />
                </linearGradient>

                <pattern id="topoPattern" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 0 16 Q 8 8, 16 16 T 32 16" fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0.22" />
                  <path d="M 0 28 Q 8 20, 16 28 T 32 28" fill="none" stroke="#6ee7b7" strokeWidth="0.5" opacity="0.16" />
                  <path d="M 0 6 Q 8 12, 16 6 T 32 6" fill="none" stroke="#a7f3d0" strokeWidth="0.6" opacity="0.14" />
                </pattern>

                <pattern id="satelliteTexture" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect width="60" height="60" fill="#072214" opacity="0.5" />
                  <path d="M 0 30 Q 15 20, 30 30 T 60 30" fill="none" stroke="#164e2d" strokeWidth="1.2" opacity="0.35" />
                  <path d="M 30 0 Q 40 25, 30 60" fill="none" stroke="#14532d" strokeWidth="1.0" opacity="0.3" />
                  <circle cx="15" cy="15" r="3" fill="#15803d" opacity="0.25" />
                  <circle cx="45" cy="45" r="4" fill="#166534" opacity="0.25" />
                  <rect x="2" y="2" width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.3" />
                  <rect x="32" y="32" width="24" height="24" fill="none" stroke="#eab308" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.25" />
                </pattern>

                <pattern id="relief3dPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 20 Q 10 10, 20 20 T 40 20" fill="none" stroke="#ca8a04" strokeWidth="1.2" opacity="0.35" />
                  <path d="M 0 35 Q 10 25, 20 35 T 40 35" fill="none" stroke="#eab308" strokeWidth="0.8" opacity="0.3" />
                  <path d="M 0 5 Q 10 0, 20 5 T 40 5" fill="none" stroke="#fef08a" strokeWidth="0.6" opacity="0.25" />
                </pattern>
              </defs>

              {/* MALAWI REGIONAL & DISTRICT VECTOR BOUNDARIES */}
              <g className="transition-all duration-500">
                {/* Northern Region Group (Clickable for Detached Zoom) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedDetachedRegion('northern')}
                >
                  <title>Click to Zoom & Detach Northern Region</title>
                  {NORTHERN_REGION_GEOMETRIES.map((geom, idx) => (
                    <path
                      key={`north-reg-${idx}`}
                      d={geoGeometryToSvgPath(geom, SVG_VW, SVG_VH, SVG_PAD)}
                      fill={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#09291a' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#14532d' :
                        activeLayer === 'elevation' ? '#14532d' :
                        activeLayer === 'water' ? '#0f766e' :
                        activeLayer === 'soil' ? '#782a15' : '#064e3b'
                      }
                      stroke={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#22c55e' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#86efac' : '#10b981'
                      }
                      strokeWidth={mapImageryStyle === 'satellite' ? '2' : '1.6'}
                      style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
                      className="opacity-90 group-hover:opacity-100 group-hover:brightness-125"
                    />
                  ))}
                  {/* Region Zoom Badge */}
                  <g transform="translate(250, 195)" className="pointer-events-none drop-shadow-md">
                    <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#042f2e" stroke="#10b981" strokeWidth="1.2" opacity="0.92" />
                    <text x="0" y="4" fill="#a7f3d0" fontSize="9" fontWeight="900" textAnchor="middle">
                      Detach Northern Region
                    </text>
                  </g>
                </g>

                {/* Central Region Group (Clickable for Detached Zoom) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedDetachedRegion('central')}
                >
                  <title>Click to Zoom & Detach Central Region</title>
                  {CENTRAL_REGION_GEOMETRIES.map((geom, idx) => (
                    <path
                      key={`central-reg-${idx}`}
                      d={geoGeometryToSvgPath(geom, SVG_VW, SVG_VH, SVG_PAD)}
                      fill={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#0b3220' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#166534' :
                        activeLayer === 'elevation' ? '#166534' :
                        activeLayer === 'water' ? '#0d9488' :
                        activeLayer === 'soil' ? '#933113' : '#047857'
                      }
                      stroke={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#34d399' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#a7f3d0' : '#34d399'
                      }
                      strokeWidth={mapImageryStyle === 'satellite' ? '2' : '1.6'}
                      style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
                      className="opacity-90 group-hover:opacity-100 group-hover:brightness-125"
                    />
                  ))}
                  {/* Region Zoom Badge */}
                  <g transform="translate(265, 490)" className="pointer-events-none drop-shadow-md">
                    <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#042f2e" stroke="#34d399" strokeWidth="1.2" opacity="0.92" />
                    <text x="0" y="4" fill="#a7f3d0" fontSize="9" fontWeight="900" textAnchor="middle">
                      Detach Central Region
                    </text>
                  </g>
                </g>

                {/* Southern Region Group (Clickable for Detached Zoom) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedDetachedRegion('southern')}
                >
                  <title>Click to Zoom & Detach Southern Region</title>
                  {SOUTHERN_REGION_GEOMETRIES.map((geom, idx) => (
                    <path
                      key={`south-reg-${idx}`}
                      d={geoGeometryToSvgPath(geom, SVG_VW, SVG_VH, SVG_PAD)}
                      fill={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#092518' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#15803d' :
                        activeLayer === 'elevation' ? '#15803d' :
                        activeLayer === 'water' ? '#14b8a6' :
                        activeLayer === 'soil' ? '#b94218' : '#059669'
                      }
                      stroke={
                        mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid' ? '#6ee7b7' :
                        mapImageryStyle === 'relief3d' || show3dRelief ? '#6ee7b7' : '#6ee7b7'
                      }
                      strokeWidth={mapImageryStyle === 'satellite' ? '2' : '1.6'}
                      style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
                      className="opacity-90 group-hover:opacity-100 group-hover:brightness-125"
                    />
                  ))}
                  {/* Region Zoom Badge */}
                  <g transform="translate(330, 770)" className="pointer-events-none drop-shadow-md">
                    <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#042f2e" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.92" />
                    <text x="0" y="4" fill="#a7f3d0" fontSize="9" fontWeight="900" textAnchor="middle">
                      Detach Southern Region
                    </text>
                  </g>
                </g>

                {/* SATELLITE ORTHOPHOTO TEXTURE OVERLAY */}
                {(mapImageryStyle === 'satellite' || mapImageryStyle === 'hybrid') && (
                  <path
                    d={geoGeometryToSvgPath(MALAWI_COUNTRY_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                    fill="url(#satelliteTexture)"
                    className="pointer-events-none opacity-90"
                  />
                )}

                {/* Topographic Contour Texture Overlay */}
                <path
                  d={geoGeometryToSvgPath(MALAWI_COUNTRY_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                  fill={show3dRelief || mapImageryStyle === 'relief3d' ? "url(#relief3dPattern)" : "url(#topoPattern)"}
                  className="pointer-events-none opacity-85"
                />

                {/* 3D RELIEF & TOPOGRAPHIC CONTOUR TEXTURE */}
                {(show3dRelief || showContours || activeLayer === 'topography' || activeLayer === 'elevation' || mapImageryStyle === 'relief3d') && (
                  <g className="transition-opacity duration-500 pointer-events-none">
                    <path
                      d={geoGeometryToSvgPath(MALAWI_COUNTRY_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                      fill="#14532d"
                      fillOpacity="0.25"
                      stroke="#86efac"
                      strokeWidth="1.5"
                      strokeDasharray="4,2"
                    />
                  </g>
                )}

                {/* RIVER CATCHMENT BASINS LAYER */}
                {(showCatchmentOverlay || activeLayer === 'catchments') && (
                  <g className="transition-opacity duration-500">
                    {MALAWI_CATCHMENT_BASINS.map((basin) => {
                      const svgPath = basin.points
                        .map((pt, idx) => {
                          const { x, y } = projectGeoToSvg(pt.lat, pt.lng, SVG_VW, SVG_VH, SVG_PAD);
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ') + ' Z';
                      const centerSvg = projectGeoToSvg(basin.centerLat, basin.centerLng, SVG_VW, SVG_VH, SVG_PAD);

                      return (
                        <g key={basin.id} className="group">
                          <path
                            d={svgPath}
                            fill={basin.color}
                            fillOpacity="0.32"
                            stroke={basin.borderColor}
                            strokeWidth="2.5"
                            className="transition-all hover:fill-opacity-50"
                          >
                            <title>{basin.name} ({basin.areaKm2.toLocaleString()} km² • Discharge: {basin.dischargeM3PerSec} m³/s • Micro-Hydro: {basin.microHydroPotential})</title>
                          </path>
                          {/* Basin Tag Badge */}
                          <g transform={`translate(${centerSvg.x}, ${centerSvg.y})`} className="pointer-events-none drop-shadow-md">
                            <rect x="-65" y="-14" width="130" height="28" rx="10" fill="#042f2e" stroke={basin.borderColor} strokeWidth="1.4" opacity="0.95" />
                            <text x="0" y="-2" fill="#bae6fd" fontSize="8.5" fontWeight="900" textAnchor="middle">{basin.name.split(' Basin')[0]}</text>
                            <text x="0" y="8" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">{basin.dischargeM3PerSec} m³/s • {basin.microHydroPotential.split(' ')[0]}</text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* STEEP ESCARPMENT FAULT LINES & SWALE CONTOURS */}
                {(showEscarpmentOverlay || activeLayer === 'escarpments') && (
                  <g className="transition-opacity duration-500">
                    {MALAWI_ESCARPMENTS.map((esc) => {
                      const pathD = esc.points
                        .map((pt, idx) => {
                          const { x, y } = projectGeoToSvg(pt.lat, pt.lng, SVG_VW, SVG_VH, SVG_PAD);
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ');
                      const midPt = esc.points[Math.floor(esc.points.length / 2)];
                      const midSvg = projectGeoToSvg(midPt.lat, midPt.lng, SVG_VW, SVG_VH, SVG_PAD);

                      return (
                        <g key={esc.id}>
                          {/* Warning Glow Underlay */}
                          <path
                            d={pathD}
                            stroke="#dc2626"
                            strokeWidth="9"
                            fill="none"
                            opacity="0.35"
                          />
                          <path
                            d={pathD}
                            stroke="#ef4444"
                            strokeWidth="3.5"
                            strokeDasharray="6,3"
                            fill="none"
                            className="drop-shadow-md"
                          >
                            <title>{esc.name} (Slope: {esc.averageSlopePct}% • {esc.erosionVulnerability} Erosion Risk • Swale: {esc.swaleDesignSpec})</title>
                          </path>
                          {/* Escarpment Badge */}
                          <g transform={`translate(${midSvg.x + 12}, ${midSvg.y})`} className="pointer-events-none drop-shadow-md">
                            <rect x="-48" y="-10" width="96" height="20" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.2" opacity="0.95" />
                            <text x="0" y="3" fill="#fca5a5" fontSize="7.5" fontWeight="900" textAnchor="middle">
                              {esc.name.split(' ')[0]} ({esc.averageSlopePct}%)
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* CANOPY INSPECTION & PARCEL DEMARCATION OVERLAYS */}
                {(showCanopyInspection || (mapImageryStyle === 'satellite' && showParcelDemarcation)) && (
                  <g className="transition-opacity duration-500 pointer-events-none">
                    {SCOUTING_HOTSPOTS.map((spot) => {
                      const { x, y } = projectGeoToSvg(spot.lat, spot.lng, SVG_VW, SVG_VH, SVG_PAD);
                      return (
                        <g key={`canopy-${spot.id}`}>
                          {/* Parcel boundary box in satellite view */}
                          <rect
                            x={x - 22}
                            y={y - 22}
                            width="44"
                            height="44"
                            fill="none"
                            stroke="#eab308"
                            strokeWidth="0.8"
                            strokeDasharray="3,2"
                            opacity="0.6"
                          />
                          {/* Tree canopy halo */}
                          <circle
                            cx={x}
                            cy={y}
                            r={18}
                            fill="#16a34a"
                            fillOpacity="0.18"
                            stroke="#22c55e"
                            strokeWidth="0.6"
                          />
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Country Outer Border Outline */}
                <path
                  d={geoGeometryToSvgPath(MALAWI_COUNTRY_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                  fill="none"
                  stroke={mapImageryStyle === 'satellite' ? '#4ade80' : '#34d399'}
                  strokeWidth="2.5"
                  className="pointer-events-none drop-shadow-md"
                />

                {/* LAKE MALAWI VECTOR SHAPE */}
                <path
                  d={geoGeometryToSvgPath(LAKE_MALAWI_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                  fill={mapImageryStyle === 'satellite' ? 'url(#satelliteWaterGradient)' : 'url(#lakeGradient)'}
                  stroke={mapImageryStyle === 'satellite' ? '#38bdf8' : '#38bdf8'}
                  strokeWidth="1.5"
                  className="drop-shadow-md"
                />

                {/* LAKE CHILWA */}
                {LAKE_CHILWA_GEOMETRY && (
                  <path
                    d={geoGeometryToSvgPath(LAKE_CHILWA_GEOMETRY, SVG_VW, SVG_VH, SVG_PAD)}
                    fill={mapImageryStyle === 'satellite' ? 'url(#satelliteWaterGradient)' : 'url(#lakeGradient)'}
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    className="drop-shadow-sm opacity-90"
                  />
                )}

                {/* MAJOR RIVERS NETWORK */}
                {MALAWI_RIVERS.map((river) => {
                  const pathD = river.points
                    .map((pt, idx) => {
                      const { x, y } = projectGeoToSvg(pt.lat, pt.lng, SVG_VW, SVG_VH, SVG_PAD);
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  return (
                    <path
                      key={river.name}
                      d={pathD}
                      stroke="#38bdf8"
                      strokeWidth={river.name.includes('Shire') ? '3' : '2'}
                      strokeDasharray="4,3"
                      fill="none"
                      opacity="0.9"
                    >
                      <title>{river.name}</title>
                    </path>
                  );
                })}

                {/* MAJOR TRANSPORT HIGHWAY ARTERIES (M1, M5, M2, M3) */}
                {showHighwaysLayer && MALAWI_HIGHWAYS.map((hwy) => {
                  const pathD = hwy.points
                    .map((pt, idx) => {
                      const { x, y } = projectGeoToSvg(pt.lat, pt.lng, SVG_VW, SVG_VH, SVG_PAD);
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ');
                  const midPt = hwy.points[Math.floor(hwy.points.length / 2)];
                  const midSvg = projectGeoToSvg(midPt.lat, midPt.lng, SVG_VW, SVG_VH, SVG_PAD);

                  return (
                    <g key={hwy.code}>
                      <path
                        d={pathD}
                        stroke={hwy.color}
                        strokeWidth="3.5"
                        strokeDasharray={hwy.code === 'M1' ? 'none' : '5,3'}
                        fill="none"
                        opacity="0.85"
                        className="drop-shadow-md"
                      />
                      {/* Highway Badge */}
                      <g transform={`translate(${midSvg.x + 8}, ${midSvg.y - 8})`}>
                        <rect x="-10" y="-8" width="20" height="12" rx="3" fill="#042f2e" stroke={hwy.color} strokeWidth="1" />
                        <text x="0" y="0" fill={hwy.color} fontSize="8" fontWeight="900" textAnchor="middle">{hwy.code}</text>
                      </g>
                    </g>
                  );
                })}

                {/* MOUNTAIN PEAK RELIEF SYMBOLS */}
                {MALAWI_MOUNTAIN_PEAKS.map((peak) => {
                  const { x, y } = projectGeoToSvg(peak.lat, peak.lng, SVG_VW, SVG_VH, SVG_PAD);
                  return (
                    <g key={peak.name} opacity="0.9">
                      <path
                        d={`M ${x - 7} ${y + 5} L ${x} ${y - 7} L ${x + 7} ${y + 5}`}
                        stroke="#fcd34d"
                        strokeWidth="1.8"
                        fill="none"
                      />
                      <text x={x} y={y + 14} fill="#fde68a" fontSize="8" fontWeight="800" textAnchor="middle" className="drop-shadow-sm">
                        {peak.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* ELEGANT SVG COMPASS ROSE (TOP-RIGHT CORNER) */}
              <g transform={`translate(${SVG_VW - 45}, 55)`} className="pointer-events-none opacity-90 select-none">
                <circle cx="0" cy="0" r="22" fill="#042f2e" stroke="#10b981" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="26" fill="none" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
                {/* North Needle */}
                <path d="M 0 0 L -5 0 L 0 -17 L 5 0 Z" fill="#ef4444" />
                <path d="M 0 0 L 5 0 L 0 -17 L 0 0 Z" fill="#b91c1c" />
                {/* South Needle */}
                <path d="M 0 0 L -5 0 L 0 17 L 5 0 Z" fill="#94a3b8" />
                <path d="M 0 0 L 5 0 L 0 17 L 0 0 Z" fill="#64748b" />
                <text x="0" y="-20" fill="#ef4444" fontSize="9" fontWeight="900" textAnchor="middle">N</text>
                <text x="0" y="27" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
                <text x="25" y="3" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">E</text>
                <text x="-25" y="3" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">W</text>
              </g>

              {/* GEOGRAPHIC SCALE BAR INDICATOR (BOTTOM-LEFT CORNER) */}
              <g transform={`translate(28, ${SVG_VH - 35})`} className="pointer-events-none select-none opacity-90">
                <rect x="-4" y="-18" width="110" height="26" rx="6" fill="#042f2e" opacity="0.9" stroke="#0d9488" strokeWidth="1" />
                <line x1="8" y1="0" x2="96" y2="0" stroke="#34d399" strokeWidth="2" />
                <line x1="8" y1="-4" x2="8" y2="4" stroke="#34d399" strokeWidth="2" />
                <line x1="52" y1="-3" x2="52" y2="3" stroke="#34d399" strokeWidth="1.5" />
                <line x1="96" y1="-4" x2="96" y2="4" stroke="#34d399" strokeWidth="2" />
                <text x="8" y="-7" fill="#a7f3d0" fontSize="8" fontWeight="bold">0</text>
                <text x="52" y="-7" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">25km</text>
                <text x="96" y="-7" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">50km</text>
              </g>

              {/* REGIONAL WATER & MOUNTAIN LABELS */}
              {(() => {
                const lakePos = projectGeoToSvg(-12.10, 34.65, SVG_VW, SVG_VH, SVG_PAD);
                const northPos = projectGeoToSvg(-10.80, 33.30, SVG_VW, SVG_VH, SVG_PAD);
                const centralPos = projectGeoToSvg(-13.50, 33.20, SVG_VW, SVG_VH, SVG_PAD);
                const southPos = projectGeoToSvg(-15.80, 34.70, SVG_VW, SVG_VH, SVG_PAD);
                return (
                  <g className="select-none pointer-events-none">
                    <text x={lakePos.x} y={lakePos.y} fill="#bae6fd" fontSize="12" fontWeight="bold" opacity="0.85" transform={`rotate(75 ${lakePos.x} ${lakePos.y})`}>LAKE MALAWI</text>
                    <text x={northPos.x} y={northPos.y} fill="#a7f3d0" fontSize="11" fontWeight="bold" opacity="0.65">NORTHERN REGION</text>
                    <text x={centralPos.x} y={centralPos.y} fill="#a7f3d0" fontSize="11" fontWeight="bold" opacity="0.65">CENTRAL REGION</text>
                    <text x={southPos.x} y={southPos.y} fill="#a7f3d0" fontSize="11" fontWeight="bold" opacity="0.65">SOUTHERN REGION</text>
                  </g>
                );
              })()}

              {/* URBAN HUB VECTOR LINK TO SELECTED SPOT */}
              {(() => {
                const hub = URBAN_HUBS[selectedHubKey];
                if (!hub || !selectedSpot) return null;
                const { x: sx, y: sy } = projectGeoToSvg(selectedSpot.lat, selectedSpot.lng, SVG_VW, SVG_VH, SVG_PAD);
                const { x: hx, y: hy } = projectGeoToSvg(hub.lat, hub.lng, SVG_VW, SVG_VH, SVG_PAD);
                const midX = (sx + hx) / 2;
                const midY = (sy + hy) / 2 - 20;
                const distKm = calculateHubDistanceKm(selectedSpot.lat, selectedSpot.lng, hub.lat, hub.lng);
                const hrs = (distKm / 55).toFixed(1);

                return (
                  <g key="hub-vector-link" className="pointer-events-none transition-all duration-500">
                    <circle cx={hx} cy={hy} r="32" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" className="animate-pulse" />
                    <circle cx={hx} cy={hy} r="64" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.3" />

                    <path
                      d={`M ${sx} ${sy} Q ${midX} ${midY}, ${hx} ${hy}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      opacity="0.95"
                      className="drop-shadow-md"
                    />

                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect x="-42" y="-12" width="84" height="20" rx="9" fill="#042f2e" stroke="#f59e0b" strokeWidth="1.5" opacity="0.95" />
                      <text x="0" y="2" fill="#fde68a" fontSize="10" fontWeight="900" textAnchor="middle">
                        {distKm} km • ~{hrs}h
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* COMPARE MODE CONNECTING LINE */}
              {compareMode && compareSpots.length >= 2 && (() => {
                const p1 = projectGeoToSvg(compareSpots[0].lat, compareSpots[0].lng, SVG_VW, SVG_VH, SVG_PAD);
                const p2 = projectGeoToSvg(compareSpots[1].lat, compareSpots[1].lng, SVG_VW, SVG_VH, SVG_PAD);
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const altDiff = Math.abs(compareSpots[0].altitudeMeters - compareSpots[1].altitudeMeters);

                return (
                  <g key="compare-vector-link" className="pointer-events-none">
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" opacity="0.9" />
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect x="-45" y="-11" width="90" height="18" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.2" />
                      <text x="0" y="2" fill="#bae6fd" fontSize="9" fontWeight="900" textAnchor="middle">
                        Δ {altDiff}m Alt Gap
                      </text>
                    </g>
                  </g>
                );
              })()}

              {/* SONAR WAVE RIPPLE */}
              {sonarRipple && (
                <circle
                  key={sonarRipple.key}
                  cx={sonarRipple.x}
                  cy={sonarRipple.y}
                  r="35"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  className="animate-ping pointer-events-none opacity-80"
                />
              )}

              {/* MAJOR URBAN HUBS */}
              {Object.entries(URBAN_HUBS).map(([key, hub]) => {
                const { x: hx, y: hy } = projectGeoToSvg(hub.lat, hub.lng, SVG_VW, SVG_VH, SVG_PAD);
                const isSelectedHub = selectedHubKey === key;

                return (
                  <g
                    key={`hub-${key}`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHubKey(key as any)}
                  >
                    <rect
                      x={hx - (isSelectedHub ? 7 : 5)}
                      y={hy - (isSelectedHub ? 7 : 5)}
                      width={isSelectedHub ? "14" : "10"}
                      height={isSelectedHub ? "14" : "10"}
                      fill={isSelectedHub ? "#f59e0b" : "#fbbf24"}
                      stroke="#ffffff"
                      strokeWidth={isSelectedHub ? "2" : "1.5"}
                      transform={`rotate(45 ${hx} ${hy})`}
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <text
                      x={hx + 12}
                      y={hy + 4}
                      fill={isSelectedHub ? "#fef08a" : "#fde68a"}
                      fontSize={isSelectedHub ? "11" : "9"}
                      fontWeight="900"
                      className="select-none uppercase tracking-tight drop-shadow-md group-hover:fill-white"
                    >
                      {hub.name.split(' ')[0]} {isSelectedHub ? '★' : ''}
                    </text>
                  </g>
                );
              })}

              {/* HOTSPOT INTERACTIVE PINS */}
              {filteredSpots.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;
                const isHovered = hoveredSpot?.id === spot.id;
                const isCompared = compareSpots.some(s => s.id === spot.id);
                
                const visual = getSpotVisualProps(spot, activeLayer, isSelected, isHovered);
                const { x: cx, y: cy } = projectGeoToSvg(spot.lat, spot.lng, SVG_VW, SVG_VH, SVG_PAD);

                return (
                  <g
                    key={spot.id}
                    className="cursor-pointer group focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={`Hotspot ${spot.name}, District ${spot.district}, Feasibility ${spot.feasibilityGrade}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (compareMode) toggleCompareSpot(spot);
                        else handleSelectSpot(spot);
                      }
                    }}
                    onMouseEnter={() => setHoveredSpot(spot)}
                    onMouseLeave={() => setHoveredSpot(null)}
                    onClick={() => {
                      if (compareMode) {
                        toggleCompareSpot(spot);
                      } else {
                        handleSelectSpot(spot);
                      }
                    }}
                  >
                    {/* Generous Target Area */}
                    <circle cx={cx} cy={cy} r="26" fill="transparent" className="cursor-pointer" />

                    {/* Outer Ring */}
                    {visual.outerRingRadius > 0 && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={visual.outerRingRadius}
                        fill="none"
                        stroke={visual.outerRingColor}
                        strokeWidth={visual.outerRingThickness}
                        opacity={isSelected || isHovered ? "0.95" : "0.7"}
                        className={spot.feasibilityGrade === 'A+' && activeLayer === 'feasibility' ? "animate-pulse" : ""}
                        style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />
                    )}

                    {/* Selected Pulsing Ring */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={visual.radius + 8}
                        fill="none"
                        stroke="#dc5c23"
                        strokeWidth="2.5"
                        className="animate-ping opacity-80"
                      />
                    )}

                    {/* Compare Selection Ring */}
                    {isCompared && compareMode && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={visual.radius + 6}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="4,2"
                      />
                    )}

                    {/* Main Hotspot Pin Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={visual.radius}
                      fill={visual.fillColor}
                      stroke={visual.strokeColor}
                      strokeWidth={visual.strokeWidth}
                      filter={isSelected || isHovered ? "url(#glow)" : undefined}
                      style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />

                    {/* Inner White Core */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? "5" : "3.5"}
                      fill="#ffffff"
                      style={{ transition: 'r 0.2s ease' }}
                    />

                    {/* Pin Label Text */}
                    <text
                      x={cx + (isHovered || isSelected ? 20 : 16)}
                      y={cy + 4}
                      fill={isSelected ? "#ffeedd" : isHovered ? "#a5f3fc" : "#ffffff"}
                      fontSize={isSelected || isHovered ? "12" : "10"}
                      fontWeight={isSelected || isHovered ? "900" : "700"}
                      className="drop-shadow-md tracking-wider select-none pointer-events-none"
                      style={{ transition: 'fill 0.2s ease, font-size 0.2s ease' }}
                    >
                      {spot.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* FLOATING HOVER CARD POPUP ON MAP */}
            <AnimatePresence>
              {hoveredSpot && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-emerald-950/95 backdrop-blur-xl border border-emerald-600 text-white p-5 rounded-3xl shadow-2xl z-30 pointer-events-none"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-700/80">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                        {hoveredSpot.district}
                      </span>
                      <h5 className="serif font-bold text-base text-white">{hoveredSpot.name}</h5>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-600">
                      Grade {hoveredSpot.feasibilityGrade}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                    <div className="bg-emerald-900/80 p-2 rounded-xl border border-emerald-800">
                      <span className="text-emerald-400 font-medium">Altitude:</span>
                      <div className="font-extrabold text-white">{hoveredSpot.altitudeMeters}m</div>
                    </div>
                    <div className="bg-emerald-900/80 p-2 rounded-xl border border-emerald-800">
                      <span className="text-emerald-400 font-medium">Rainfall:</span>
                      <div className="font-extrabold text-white">{hoveredSpot.rainfallMm}mm/yr</div>
                    </div>
                    <div className="bg-emerald-900/80 p-2 rounded-xl border border-emerald-800">
                      <span className="text-emerald-400 font-medium">Water Table:</span>
                      <div className="font-bold text-emerald-200 line-clamp-1">{hoveredSpot.waterTableDepth}</div>
                    </div>
                    <div className="bg-emerald-900/80 p-2 rounded-xl border border-emerald-800">
                      <span className="text-emerald-400 font-medium">Land Price:</span>
                      <div className="font-bold text-amber-300 line-clamp-1">{hoveredSpot.landCostMwk}</div>
                    </div>
                  </div>

                  <div className="mt-2.5 text-[10px] font-semibold text-emerald-300/90 flex items-center justify-between pt-2 border-t border-emerald-800">
                    <span>Top Crops: {hoveredSpot.topCrops.slice(0, 2).join(', ')}</span>
                    <span className="text-amber-400 font-bold">Click to Inspect →</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Footer Legend & Controls */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-emerald-900/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-700/60 text-white text-xs">
            <div className="flex flex-wrap items-center gap-3 font-semibold">
              <span className="text-slate-300 font-bold uppercase text-[10px]">Legend:</span>
              
              {activeLayer === 'feasibility' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-200 shadow-sm inline-block" />
                    <span>A+ (Prime Outpost)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-blue-200 inline-block" />
                    <span>A Grade (High)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    <span>B+ Grade</span>
                  </span>
                </div>
              )}

              {activeLayer === 'topography' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-amber-900 border border-amber-400 rounded-sm inline-block" />
                    <span>Highland & Massif (&gt;1,800m)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-emerald-800 border border-emerald-400 rounded-sm inline-block" />
                    <span>Plateau Ridge (1,200m-1,800m)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-lime-700 border border-lime-400 rounded-sm inline-block" />
                    <span>Rift Valley / Shore (&lt;1,000m)</span>
                  </span>
                </div>
              )}

              {activeLayer === 'catchments' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-sky-500 rounded-sm inline-block opacity-80" />
                    <span>Lake Malawi Basin</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-cyan-600 rounded-sm inline-block opacity-80" />
                    <span>Shire River Basin</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-teal-600 rounded-sm inline-block opacity-80" />
                    <span>Lake Chilwa Endorheic</span>
                  </span>
                </div>
              )}

              {activeLayer === 'escarpments' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-1 bg-red-500 inline-block" />
                    <span>Active Fault Slope (&gt;20% Grade)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-300 font-bold">Vetiver & Swale Mandate</span>
                  </span>
                </div>
              )}

              {activeLayer === 'highways' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-1 bg-amber-400 inline-block" />
                    <span>M1 North-South Spine</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-1 bg-sky-400 inline-block" />
                    <span>M5 Lakeshore Arterial</span>
                  </span>
                </div>
              )}

              {activeLayer === 'elevation' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-950 border border-emerald-400 inline-block" />
                    <span>High (&gt;1,600m - Cold)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" />
                    <span>Mid (1,000-1,600m)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-lime-500 inline-block" />
                    <span>Low (&lt;1,000m)</span>
                  </span>
                </div>
              )}

              {activeLayer === 'water' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-sky-200 inline-block" />
                    <span>High Rainfall (&gt;1,400mm)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-teal-600 rounded-full inline-block" />
                    <span>Dambo Valley Recharge</span>
                  </span>
                </div>
              )}

              {activeLayer === 'soil' && (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 bg-terracotta-600 border border-terracotta-200 rounded-full inline-block" />
                    <span>Volcanic Loam (pH 6.0)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-amber-700 rounded-full inline-block" />
                    <span>Humic Peat</span>
                  </span>
                </div>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 self-end md:self-auto">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.15))}
                className="w-8 h-8 bg-emerald-800 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
                title="Zoom Out"
              >
                -
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all"
              >
                Reset
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.min(1.6, prev + 0.15))}
                className="w-8 h-8 bg-emerald-800 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
                title="Zoom In"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Selected Location Inspector Panel (5 Cols on desktop) */}
        <div className={cn(
          "lg:col-span-5 rounded-[2.5rem] p-6 md:p-8 border shadow-xl flex flex-col justify-between min-h-[620px]",
          isTheaterFullscreen ? "bg-slate-900 border-slate-800 text-white" : "bg-white/90 backdrop-blur-md border-white/90 text-slate-900"
        )}>
          <div className="flex flex-col gap-5">
            {/* Inspector Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {selectedSpot.district}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                    Grade {selectedSpot.feasibilityGrade}
                  </span>
                </div>

                <h4 className="serif text-2xl md:text-3xl font-bold mt-1.5 flex items-center gap-2">
                  {selectedSpot.name}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={exportDossier}
                  className="px-3 py-2 rounded-xl text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-all shadow-sm flex items-center gap-1"
                  title="Export Scouting Report Dossier"
                >
                  <FileText size={15} className="text-emerald-700" />
                  <span className="hidden sm:inline">{dossierCopied ? 'Copied!' : 'Report'}</span>
                </button>

                <button
                  onClick={copyCoordinates}
                  className="p-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 transition-all shadow-sm"
                  title="Copy GPS Coordinates"
                >
                  {copiedCoords ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>

                <button
                  onClick={handleBookmarkToggle}
                  className={cn(
                    "p-2.5 rounded-xl text-xs font-bold border transition-all shadow-sm active:scale-95 shrink-0",
                    isBookmarked
                      ? "bg-terracotta-600 text-white border-terracotta-700"
                      : "bg-white text-emerald-900 border-slate-200 hover:bg-emerald-50"
                  )}
                  title={isBookmarked ? "Bookmarked Offline" : "Bookmark this Zone"}
                >
                  {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>
            </div>

            {/* Inspector Sub-Nav Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800">
              <button
                onClick={() => setInspectorTab('overview')}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1",
                  inspectorTab === 'overview'
                    ? "bg-white text-emerald-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Info size={13} /> Overview
              </button>

              <button
                onClick={() => setInspectorTab('microgis')}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1",
                  inspectorTab === 'microgis'
                    ? "bg-white text-emerald-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Mountain size={13} /> Micro-GIS
              </button>

              <button
                onClick={() => setInspectorTab('logistics')}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1",
                  inspectorTab === 'logistics'
                    ? "bg-white text-emerald-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Truck size={13} /> Logistics
              </button>

              <button
                onClick={() => setInspectorTab('crops')}
                className={cn(
                  "flex-1 py-2 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all flex items-center justify-center gap-1",
                  inspectorTab === 'crops'
                    ? "bg-white text-emerald-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Layers size={13} /> Soil & Crops
              </button>
            </div>

            {/* TAB: MICRO-GIS & WATERSHED */}
            {inspectorTab === 'microgis' && (() => {
              // Find nearest catchment basin
              const matchedBasin = MALAWI_CATCHMENT_BASINS.reduce((prev, curr) => {
                const prevDist = Math.hypot(prev.points[0].lat - selectedSpot.lat, prev.points[0].lng - selectedSpot.lng);
                const currDist = Math.hypot(curr.points[0].lat - selectedSpot.lat, curr.points[0].lng - selectedSpot.lng);
                return currDist < prevDist ? curr : prev;
              }, MALAWI_CATCHMENT_BASINS[0]);

              // Find nearest escarpment
              const matchedEscarpment = MALAWI_ESCARPMENTS.reduce((prev, curr) => {
                const prevDist = Math.hypot(prev.points[0].lat - selectedSpot.lat, prev.points[0].lng - selectedSpot.lng);
                const currDist = Math.hypot(curr.points[0].lat - selectedSpot.lat, curr.points[0].lng - selectedSpot.lng);
                return currDist < prevDist ? curr : prev;
              }, MALAWI_ESCARPMENTS[0]);

              return (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3.5"
                >
                  {/* Topographic Relief Specs */}
                  <div className="bg-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 flex flex-col gap-2.5 shadow-md">
                    <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                        <Mountain size={13} /> Topographic Relief & Altitude
                      </span>
                      <span className="text-emerald-300 font-extrabold text-xs">
                        {selectedSpot.altitudeMeters}m MSL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-900/80 p-2.5 rounded-xl border border-emerald-800">
                        <span className="text-[9px] text-emerald-400 font-bold block uppercase">Elevation Band</span>
                        <span className="text-white font-extrabold text-xs">
                          {selectedSpot.altitudeMeters > 1500 ? 'Montane Highland' : selectedSpot.altitudeMeters > 900 ? 'Mid-Plateau Ridge' : 'Rift Floor / Shore'}
                        </span>
                      </div>
                      <div className="bg-emerald-900/80 p-2.5 rounded-xl border border-emerald-800">
                        <span className="text-[9px] text-emerald-400 font-bold block uppercase">Thermal Amplitude</span>
                        <span className="text-white font-extrabold text-xs">
                          {selectedSpot.altitudeMeters > 1500 ? '12°C - 24°C (Frost-free)' : '18°C - 32°C (Warm)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* River Catchment Basin */}
                  <div className="bg-sky-950 text-white p-4 rounded-2xl border border-sky-800 flex flex-col gap-2.5 shadow-md">
                    <div className="flex items-center justify-between border-b border-sky-800 pb-2">
                      <span className="text-[10px] font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
                        <Droplets size={13} /> Catchment Basin & Hydrology
                      </span>
                      <span className="text-sky-300 font-extrabold text-xs">
                        {matchedBasin.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-sky-900/70 p-2 rounded-xl border border-sky-800 text-center">
                        <span className="text-[8px] text-sky-400 font-bold block uppercase">Discharge</span>
                        <span className="text-white font-black">{matchedBasin.dischargeM3PerSec} m³/s</span>
                      </div>
                      <div className="bg-sky-900/70 p-2 rounded-xl border border-sky-800 text-center">
                        <span className="text-[8px] text-sky-400 font-bold block uppercase">Area</span>
                        <span className="text-amber-300 font-black">{matchedBasin.areaKm2.toLocaleString()} km²</span>
                      </div>
                      <div className="bg-sky-900/70 p-2 rounded-xl border border-sky-800 text-center">
                        <span className="text-[8px] text-sky-400 font-bold block uppercase">Drainage</span>
                        <span className="text-sky-200 font-bold text-[9px] truncate">{matchedBasin.majorRivers[0]}</span>
                      </div>
                    </div>

                    <div className="bg-sky-900/40 p-2.5 rounded-xl border border-sky-800 text-[10px] text-sky-200 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Zap size={11} className="text-amber-300 shrink-0" />
                        <span><span className="font-bold text-sky-100">Hydro Generation:</span> {matchedBasin.microHydroPotential}</span>
                      </div>
                      <span className="bg-sky-500/20 text-sky-300 font-extrabold px-2 py-0.5 rounded-md border border-sky-500/40 text-[9px]">
                        ~12 - 45 kW Pot.
                      </span>
                    </div>
                  </div>

                  {/* Escarpment Fault & Swale Plan */}
                  <div className="bg-amber-950 text-white p-4 rounded-2xl border border-amber-800 flex flex-col gap-2.5 shadow-md">
                    <div className="flex items-center justify-between border-b border-amber-800 pb-2">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                        <Zap size={13} /> Escarpment Fault & Swale Specs
                      </span>
                      <span className="text-amber-300 font-extrabold text-xs">
                        {matchedEscarpment.name}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs">
                      <div className="flex items-center justify-between bg-amber-900/70 p-2 rounded-xl border border-amber-800">
                        <span className="text-amber-200 font-semibold text-[10px]">Slope Gradient:</span>
                        <span className="text-white font-extrabold">{matchedEscarpment.averageSlopePct}%</span>
                      </div>
                      <div className="flex items-center justify-between bg-amber-900/70 p-2 rounded-xl border border-amber-800">
                        <span className="text-amber-200 font-semibold text-[10px]">Erosion Risk:</span>
                        <span className="text-rose-400 font-extrabold">{matchedEscarpment.erosionVulnerability} Risk</span>
                      </div>
                      <div className="bg-amber-900/50 p-2.5 rounded-xl border border-amber-700/80 text-[10px] text-amber-100 font-medium flex items-center gap-1.5">
                        <Sprout size={12} className="text-emerald-400 shrink-0" />
                        <span><span className="font-bold text-amber-300">Farming Tip:</span> {matchedEscarpment.swaleDesignSpec}</span>
                      </div>
                    </div>
                  </div>

                  {/* High-Resolution Canopy & Parcel Demarcation */}
                  <div className="bg-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 flex flex-col gap-2.5 shadow-md">
                    <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                      <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider flex items-center gap-1.5">
                        <Trees size={13} /> Satellite Canopy Cover & Parcel Demarcation
                      </span>
                      <span className="text-emerald-300 font-extrabold text-xs">
                        {selectedSpot.altitudeMeters > 1300 ? 'Dense Montane Canopy' : 'Savanna Agroforestry'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-900/70 p-2.5 rounded-xl border border-emerald-800">
                        <span className="text-[9px] text-emerald-400 font-bold block uppercase">Canopy Index</span>
                        <span className="text-white font-black text-sm">
                          {selectedSpot.altitudeMeters > 1400 ? '78% Forest' : '45% Agro-Silvo'}
                        </span>
                      </div>
                      <div className="bg-emerald-900/70 p-2.5 rounded-xl border border-emerald-800">
                        <span className="text-[9px] text-emerald-400 font-bold block uppercase">Thermal Buffer</span>
                        <span className="text-emerald-300 font-black text-sm">
                          -3.2°C Cooling
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800 text-[10px] text-emerald-200 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={11} className="text-amber-400" />
                        <span>High-Contrast Orthophoto GPS Demarcation:</span>
                      </span>
                      <span className="font-mono text-amber-300 font-bold text-[9px]">
                        {selectedSpot.lat.toFixed(4)}°S, {selectedSpot.lng.toFixed(4)}°E
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* TAB 1: OVERVIEW */}
            {inspectorTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-inner">
                  "{selectedSpot.summary}"
                </p>

                <div className="bg-emerald-50/90 p-3.5 rounded-2xl border border-emerald-200/80 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase text-emerald-900">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-700" /> Ground Field Audit
                    </span>
                    <span className="bg-emerald-200/80 text-emerald-950 px-2 py-0.5 rounded-md font-extrabold text-[9px]">
                      {selectedSpot.lastVerified}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-600 leading-tight mt-0.5">
                    {selectedSpot.dataConfidence}
                  </p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => handleSaveToTracker(selectedSpot)}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-black text-xs py-3 px-4 rounded-2xl border border-emerald-700 shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Tent size={16} className="text-amber-400" />
                    Save {selectedSpot.name} to Relocation Checklist
                  </button>

                  <AnimatePresence>
                    {trackerSavedToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-10 left-0 right-0 bg-amber-500 text-slate-950 text-xs font-black py-2 px-3 rounded-xl shadow-lg text-center flex items-center justify-center gap-1 border border-amber-300 z-20"
                      >
                        <CheckCircle2 size={15} /> Added to Exodus Relocation Checklist!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terrain Elevation Profile */}
                <div className="bg-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    <span className="flex items-center gap-1">
                      <Mountain size={13} className="text-amber-400" /> Topographic Slope Profile
                    </span>
                    <span className="text-amber-400 font-bold">{selectedSpot.altitudeMeters}m Elevation</span>
                  </div>

                  <div className="relative h-16 w-full bg-emerald-900/60 rounded-xl overflow-hidden border border-emerald-800/80 p-2 flex items-end">
                    <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 5 Q 30 12, 60 22 T 120 32 T 170 42 L 200 45 L 200 50 L 0 50 Z"
                        fill="url(#slopeGrad)"
                        stroke="#34d399"
                        strokeWidth="1.5"
                      />
                      <g transform="translate(100, 24)" className="animate-bounce">
                        <circle cx="0" cy="0" r="4" fill="#dc5c23" stroke="#ffffff" strokeWidth="1" />
                        <text x="0" y="-7" fill="#fde68a" fontSize="7" fontWeight="900" textAnchor="middle">Site Zone</text>
                      </g>
                      <line x1="0" y1="46" x2="200" y2="46" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                      <text x="195" y="44" fill="#7dd3fc" fontSize="5.5" fontWeight="bold" textAnchor="end">Water Table</text>
                    </svg>
                  </div>

                  <div className="flex justify-between text-[9px] font-bold text-emerald-300/80">
                    <span className="flex items-center gap-1">
                      <Mountain size={9} />
                      <span>Peak Ridge (High Rain)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={9} />
                      <span>Sloped Homestead</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplets size={9} />
                      <span>Dambo Valley Channel</span>
                    </span>
                  </div>
                </div>

                {/* Technical Scouting Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-emerald-800/60 flex items-center gap-1">
                      <Mountain size={11} /> Altitude
                    </span>
                    <span className="font-extrabold text-xs text-emerald-950">{selectedSpot.altitudeLabel}</span>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-emerald-800/60 flex items-center gap-1">
                      <Droplets size={11} /> Rainfall
                    </span>
                    <span className="font-extrabold text-xs text-emerald-950">{selectedSpot.rainfallMm} mm / year</span>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-emerald-800/60 flex items-center gap-1">
                      <Compass size={11} /> Water Table
                    </span>
                    <span className="font-extrabold text-xs text-emerald-950">{selectedSpot.waterTableDepth}</span>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-emerald-800/60 flex items-center gap-1">
                      <Layers size={11} /> Soil Acidity
                    </span>
                    <span className="font-extrabold text-xs text-emerald-950">{selectedSpot.soilpH}</span>
                  </div>
                </div>

                {matchedSkills.length > 0 && (
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-600" /> Recommended Permaculture Modules:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {matchedSkills.map(skill => (
                        <Link
                          key={skill.id}
                          to={`/skills?highlight=${skill.id}`}
                          className="bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 shadow-xs"
                        >
                          <span>{skill.title}</span>
                          <ArrowRight size={10} className="text-emerald-700" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: LOGISTICS & TRANSPORT */}
            {inspectorTab === 'logistics' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Calculate Access From Urban Hub:
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['lilongwe', 'blantyre', 'mzuzu'] as const).map(hubKey => {
                    const isSelected = selectedHubKey === hubKey;
                    return (
                      <button
                        key={hubKey}
                        onClick={() => setSelectedHubKey(hubKey)}
                        className={cn(
                          "py-2.5 px-2 rounded-xl text-[10px] font-extrabold transition-all border text-center flex flex-col items-center gap-0.5",
                          isSelected
                            ? "bg-emerald-900 text-white border-emerald-800 shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50"
                        )}
                      >
                        <span>{hubKey.toUpperCase()}</span>
                        <span className={cn("text-[8px] font-medium", isSelected ? "text-emerald-300" : "text-slate-400")}>
                          {hubKey === 'lilongwe' ? 'Central' : hubKey === 'blantyre' ? 'Southern' : 'Northern'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const currentHub = URBAN_HUBS[selectedHubKey];
                  const distKm = calculateHubDistanceKm(currentHub.lat, currentHub.lng, selectedSpot.lat, selectedSpot.lng);
                  const approxHours = (distKm / 65).toFixed(1);
                  const fuelLiters = Math.round(distKm / 8.5);

                  return (
                    <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 shadow-lg flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                          <Truck size={13} /> Route to {currentHub.name}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-300">
                          {distKm} km
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                        <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
                          <span className="text-[9px] font-normal text-emerald-300 block">Estimated Drive:</span>
                          <span className="text-white text-base font-black">{approxHours} Hours</span>
                        </div>

                        <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
                          <span className="text-[9px] font-normal text-emerald-300 block">4x4 Fuel Est:</span>
                          <span className="text-amber-300 text-base font-black">~{fuelLiters} Liters</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-emerald-200/90 leading-normal bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/80">
                        <span className="font-black text-amber-300">Highway & Access Note: </span>
                        {selectedSpot.altitudeMeters > 1500
                          ? 'Highland access requiring all-weather 4WD during heavy rainy seasons (Nov-March).'
                          : 'Paved highway arterial access (M1/M5) with well-maintained rural feeder tracks.'}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* TAB 3: SOIL & CROPS */}
            {inspectorTab === 'crops' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-300/40 text-slate-800 text-xs flex flex-col gap-1">
                  <span className="font-black text-emerald-950 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Layers size={13} className="text-amber-600" /> Soil Profile & pH Compatibility
                  </span>
                  <div className="font-bold text-xs text-emerald-900 mt-1">{selectedSpot.soilType}</div>
                  <div className="text-[10px] text-slate-600 font-medium">
                    Acidity Range: <span className="font-bold text-emerald-800">{selectedSpot.soilpH}</span> (Ideal for nitrogen-fixing legumes & perennials)
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Key Crop Recommendations:
                  </span>
                  <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1">
                    {selectedSpot.topCrops.map((crop, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-emerald-950">{crop}</span>
                        <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          High Yield
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Link Footer */}
          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 mt-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 font-bold">
                {selectedSpot.distanceFromMajorCity}
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedSpot.lat},${selectedSpot.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-terracotta-700 hover:underline font-black flex items-center gap-1"
              >
                <Navigation size={10} /> View in Google Maps <ExternalLink size={8} />
              </a>
            </div>

            <Link
              to={`/regions/${selectedSpot.regionId}`}
              className="bg-terracotta-600 hover:bg-terracotta-500 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 active:scale-95 border border-terracotta-500"
            >
              Region Dossier <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
      )}
    </div>
  );
}
