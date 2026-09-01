import { 
  CloudRain, 
  Sun, 
  Thermometer, 
  Snowflake, 
  Zap, 
  Waves, 
  Mountain, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle,
  Flame,
  Layers,
  Sprout
} from 'lucide-react';

export type FrostRiskLevel = 'None' | 'Low' | 'Moderate' | 'High';
export type HydroPotentialLevel = 'None / Arid Basin' | 'Seasonal Stream (Dec–Apr)' | 'Moderate Hill Catchment' | 'High Perennial Gravity Catchment' | 'Major River Basin (Shire / Lake)';
export type ThermalBeltType = 'Frost-Free Ridge & Mid-Slope Thermal Belt' | 'Cold Air Drainage Inversion Sink' | 'Warm Lakeshore Basin Buffer' | 'Protected Mountain Windward Slope' | 'Undulating Plateau Corridor';

export interface DistrictClimateData {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  elevationRangeMeters: string;
  elevationMeanM: number;
  agroEcologicalClassification: string;
  
  // Rainfall Metrics
  annualRainfallMm: number;
  rainfallRangeMm: string;
  monthlyRainfallMm: number[]; // Jan - Dec (12 items)
  rainfallDistributionType: string;
  wetSeasonMonths: string;
  drySeasonMonths: string;
  
  // Temperature & Thermal Metrics
  summerMinC: number;
  summerMaxC: number;
  winterMinC: number;
  winterMaxC: number;
  annualMeanTempC: number;
  currentSimulatedTemp: {
    min: number;
    max: number;
    mean: number;
  };
  
  // Frost & Thermal Belt Properties
  frostRisk: FrostRiskLevel;
  frostRiskDetails: string;
  thermalBeltZone: ThermalBeltType;
  thermalBeltElevationWindow: string;
  thermalBeltAdvice: string;
  
  // Solar & Hydrology
  solarRadiationKwhM2Day: number;
  solarPeakHoursRange: string;
  microHydroPotential: HydroPotentialLevel;
  microHydroNotes: string;
  aquiferDepthMeters: string;
  
  // Soil & Permaculture
  soilType: string;
  soilPh: string;
  windRegime: string;
  dimbaGardenPotential: string;
  frostProtectionProtocols: string[];
  seasonalAlert: {
    title: string;
    description: string;
    urgency: 'high' | 'medium' | 'low';
    seasonTag: string;
  };
}

export const DISTRICT_CLIMATE_DATABASE: Record<string, DistrictClimateData> = {
  'dedza': {
    id: 'dedza',
    name: 'Dedza Highlands',
    region: 'Central',
    elevationRangeMeters: '1,200m – 2,198m ASL',
    elevationMeanM: 1560,
    agroEcologicalClassification: 'High-Altitude Moist Montane Plateau & Escarpment',
    annualRainfallMm: 1280,
    rainfallRangeMm: '1,150mm – 1,600mm',
    monthlyRainfallMm: [290, 245, 190, 65, 18, 8, 6, 5, 10, 32, 125, 286],
    rainfallDistributionType: 'Unimodal Monsoon + Winter Chiperoni Orographic Mists',
    wetSeasonMonths: 'November – April',
    drySeasonMonths: 'May – October',
    summerMinC: 14,
    summerMaxC: 26,
    winterMinC: 3,
    winterMaxC: 19,
    annualMeanTempC: 16.8,
    currentSimulatedTemp: { min: 7, max: 21, mean: 14.5 },
    frostRisk: 'High',
    frostRiskDetails: 'High frost vulnerability in low-lying valley bottoms & dambo frost pockets (June–July); Mid-slope thermal belt (1,380m–1,650m) remains frost-free.',
    thermalBeltZone: 'Frost-Free Ridge & Mid-Slope Thermal Belt',
    thermalBeltElevationWindow: '1,380m – 1,650m ASL',
    thermalBeltAdvice: 'Construct dwellings and sensitive perennial orchards (avocado, citrus, macadamia) along the 1,400m contour line where nocturnal cold air drainage bypasses slope ridges.',
    solarRadiationKwhM2Day: 5.4,
    solarPeakHoursRange: '5.2 – 6.6 kWh/m²/day (Peak July–October)',
    microHydroPotential: 'High Perennial Gravity Catchment',
    microHydroNotes: 'Perennial mountain streams originating from Dedza Mountain Forest Reserve generate 15–40 L/s with 20m–45m workable gravity head.',
    aquiferDepthMeters: '10m – 22m (Perennial gravity springs & shallow fracture zones)',
    soilType: 'Deep Volcanic Katondo Red Clay Loam (Rich Humic Oxisols)',
    soilPh: 'pH 6.0 – 6.5',
    windRegime: 'Strong Southeasterly Mwera winds (May–August), gusts up to 45 km/h. Essential to establish multi-tier bamboo/Tephrosia windbreaks.',
    dimbaGardenPotential: 'Exceptional year-round dambo wetlands for winter wheat, Irish potatoes, cabbage, garlic, and cool-season brassicas.',
    frostProtectionProtocols: [
      'Site nursery beds and sensitive fruit trees on northern and western mid-slopes above the cold-air inversion line.',
      'Apply 15cm dry maize-stalk/grass mulch over dimba root crops prior to June 1 cold dips.',
      'Construct dense live windbreaks using Vetiver grass and Bambusa vulgaris along eastern slope shoulders.'
    ],
    seasonalAlert: {
      title: 'High Altitude Winter Frost & Wind Watch',
      description: 'Temperatures dip to 3°C–5°C in valleys during early morning hours. Mulch dimba beds and shield tender tomato seedlings with burlap/grass tents.',
      urgency: 'high',
      seasonTag: 'Cold Dry Season'
    }
  },

  'mulanje': {
    id: 'mulanje',
    name: 'Mulanje Massif',
    region: 'Southern',
    elevationRangeMeters: '650m – 3,002m ASL (Sapitwa Peak)',
    elevationMeanM: 1100,
    agroEcologicalClassification: 'Ultra-High Precipitation Montane Cloud Massif & Tea Belt',
    annualRainfallMm: 1850,
    rainfallRangeMm: '1,400mm – 2,400mm',
    monthlyRainfallMm: [340, 310, 290, 140, 55, 38, 42, 35, 30, 65, 175, 330],
    rainfallDistributionType: 'Bimodal/Extended Monsoon + Year-Round Orographic Chiperoni Showers',
    wetSeasonMonths: 'October – May (Perennial moisture)',
    drySeasonMonths: 'June – September (Mild)',
    summerMinC: 18,
    summerMaxC: 29,
    winterMinC: 11,
    winterMaxC: 24,
    annualMeanTempC: 21.2,
    currentSimulatedTemp: { min: 14, max: 26, mean: 20 },
    frostRisk: 'Low',
    frostRiskDetails: 'Frost restricted only to high plateau bomas (>2,000m); lower agricultural foothills are 100% frost-free year-round.',
    thermalBeltZone: 'Protected Mountain Windward Slope',
    thermalBeltElevationWindow: '700m – 1,300m ASL',
    thermalBeltAdvice: 'High cloud cover moderates thermal fluctuations. Ideal for perennial tree crops, macadamia, tea, coffee, and tropical fruits.',
    solarRadiationKwhM2Day: 5.1,
    solarPeakHoursRange: '4.8 – 6.2 kWh/m²/day (Reduced during overcast Chiperoni days)',
    microHydroPotential: 'High Perennial Gravity Catchment',
    microHydroNotes: 'Pristine granite mountain rivers (Lichenya, Ruo, Likhubula) provide 50–200 L/s with 30m–120m gravity head potential.',
    aquiferDepthMeters: '6m – 14m (Abundant surface gravity streams & sub-surface river aquifers)',
    soilType: 'Deep Tropical Red Nitisols & Humic Alluvial Loam',
    soilPh: 'pH 5.2 – 6.0 (Naturally acidic, prime for tea, macadamia & pineapples)',
    windRegime: 'Moist south-easterly Chiperoni cloud mists. Low structural wind damage risk in sheltered ravines.',
    dimbaGardenPotential: 'Year-round gravity-fed furrow cultivation of vegetables, spices, ginger, turmeric, and passion fruit without diesel pumps.',
    frostProtectionProtocols: [
      'Frost protection unnecessary below 1,500m; focus on hillside contour swales to prevent heavy rain topsoil scour.',
      'Maintain gravel check dams along steep stream beds to handle monsoon flash runoff.',
      'Lime acidic soils (apply 200g dolomite/m²) when cultivating brassicas and legumes.'
    ],
    seasonalAlert: {
      title: 'High-Volume Catchment & Swale Spillway Check',
      description: 'Mountain precipitation rates exceed 80mm/hour during convective storms. Ensure stone-lined spillways are clear to prevent terrace breaches.',
      urgency: 'medium',
      seasonTag: 'Rainy Planting'
    }
  },

  'salima': {
    id: 'salima',
    name: 'Salima Lakeshore',
    region: 'Central',
    elevationRangeMeters: '475m – 620m ASL',
    elevationMeanM: 510,
    agroEcologicalClassification: 'Humid Tropical Lakeshore Plain & Alluvial Basin',
    annualRainfallMm: 1050,
    rainfallRangeMm: '900mm – 1,250mm',
    monthlyRainfallMm: [260, 240, 180, 45, 8, 2, 0, 1, 3, 18, 95, 200],
    rainfallDistributionType: 'Unimodal Summer Convective Rain + Lake Evaporative Cycles',
    wetSeasonMonths: 'December – March',
    drySeasonMonths: 'April – November',
    summerMinC: 22,
    summerMaxC: 34,
    winterMinC: 15,
    winterMaxC: 28,
    annualMeanTempC: 25.4,
    currentSimulatedTemp: { min: 18, max: 31, mean: 24.5 },
    frostRisk: 'None',
    frostRiskDetails: 'Zero frost risk. Lake Malawi acts as a massive thermal reservoir moderating nocturnal minimum temperatures.',
    thermalBeltZone: 'Warm Lakeshore Basin Buffer',
    thermalBeltElevationWindow: '475m – 550m ASL',
    thermalBeltAdvice: 'High ambient solar irradiance and thermal stability allow 3 harvest cycles per year when paired with solar drip irrigation.',
    solarRadiationKwhM2Day: 6.2,
    solarPeakHoursRange: '5.8 – 7.2 kWh/m²/day (National top tier for solar PV yield)',
    microHydroPotential: 'None / Arid Basin',
    microHydroNotes: 'Low hydraulic gradient. Hydro power unavailable; optimal for low-head solar DC submersible borehole pumping.',
    aquiferDepthMeters: '8m – 15m (Ultra-shallow alluvial lake basin aquifer)',
    soilType: 'Rich River Silt, Fine Sandy Loam & Vertic Alluvial Clay',
    soilPh: 'pH 6.2 – 7.2 (Neutral, highly fertile for horticulture & grains)',
    windRegime: 'Diurnal Lake/Land breezes. Mwera lake surges produce gusty easterly winds during morning hours.',
    dimbaGardenPotential: 'Immense winter irrigation potential from shallow boreholes: watermelon, tomatoes, onions, sweetcorn, and Kilombero rice.',
    frostProtectionProtocols: [
      'Zero frost defenses required.',
      'Focus 100% on high-evaporation moisture conservation: install heavy 10cm straw mulch and drip emitters.',
      'Plant shade guilds (Moringa, Gliricidia, Papaya) to shelter sensitive leafy greens from 34°C midday heat.'
    ],
    seasonalAlert: {
      title: 'Solar Pumping & Drip Irrigation Prime Window',
      description: 'Clear skies yield 6.5+ kWh/m²/day solar output. Maximize lake-basin winter vegetable production with solar-powered drip lines.',
      urgency: 'low',
      seasonTag: 'Cold Dry Season'
    }
  },

  'mzimba': {
    id: 'mzimba',
    name: 'Mzimba / Viphya Plateau',
    region: 'Northern',
    elevationRangeMeters: '1,150m – 1,850m ASL',
    elevationMeanM: 1380,
    agroEcologicalClassification: 'High-Altitude Sub-Humid Montane Plateau & Timber Belt',
    annualRainfallMm: 1180,
    rainfallRangeMm: '1,000mm – 1,450mm',
    monthlyRainfallMm: [260, 230, 190, 70, 12, 4, 2, 2, 8, 25, 110, 267],
    rainfallDistributionType: 'Unimodal Extended Northern Monsoon (Nov–Apr)',
    wetSeasonMonths: 'November – April',
    drySeasonMonths: 'May – October',
    summerMinC: 15,
    summerMaxC: 27,
    winterMinC: 5,
    winterMaxC: 22,
    annualMeanTempC: 18.6,
    currentSimulatedTemp: { min: 9, max: 24, mean: 17 },
    frostRisk: 'Moderate',
    frostRiskDetails: 'Cold air drainage down the Viphya pine slopes causes ground frost in low dambo hollows during late June and early July.',
    thermalBeltZone: 'Frost-Free Ridge & Mid-Slope Thermal Belt',
    thermalBeltElevationWindow: '1,250m – 1,500m ASL',
    thermalBeltAdvice: 'Place homesteads on gentle mid-slope crests. Excellent soil depth for broadfork bio-intensive beds and timber agroforestry.',
    solarRadiationKwhM2Day: 5.6,
    solarPeakHoursRange: '5.2 – 6.5 kWh/m²/day',
    microHydroPotential: 'Moderate Hill Catchment',
    microHydroNotes: 'South Rukuru tributaries and Viphya streams offer seasonal micro-hydro and year-round gravity irrigation lines.',
    aquiferDepthMeters: '14m – 28m (Weathered gneiss and quartz aquifer bands)',
    soilType: 'Deep Sandy Clay Loam & Humic Forest Topsoil',
    soilPh: 'pH 5.8 – 6.4',
    windRegime: 'Moderate easterly plateau winds. Pine and eucalyptus shelterbelts provide effective wind protection.',
    dimbaGardenPotential: 'Extensive dambo drainage networks ideal for winter beans, garlic, cabbages, and finger millet.',
    frostProtectionProtocols: [
      'Erect grass mulch skirts around tender grafted avocado and macadamia saplings in May.',
      'Avoid tilling cold dambo soil during freezing weeks to preserve stored diurnal solar heat in the soil bed.',
      'Plant vetiver grass strips to channel cold air downhill past orchard plots.'
    ],
    seasonalAlert: {
      title: 'Plateau Frost & Agroforestry Pruning Window',
      description: 'Mild frost dips expected in lower dambos. Ensure nursery seedbeds have raised thatch covers and mulch fruit tree drip-lines.',
      urgency: 'medium',
      seasonTag: 'Cold Dry Season'
    }
  },

  'lilongwe': {
    id: 'lilongwe',
    name: 'Lilongwe Plateau',
    region: 'Central',
    elevationRangeMeters: '1,050m – 1,250m ASL',
    elevationMeanM: 1120,
    agroEcologicalClassification: 'Central Agricultural Undulating Plateau',
    annualRainfallMm: 960,
    rainfallRangeMm: '850mm – 1,150mm',
    monthlyRainfallMm: [230, 210, 160, 40, 6, 1, 0, 1, 4, 15, 85, 208],
    rainfallDistributionType: 'Unimodal Summer Monsoon (Nov–Apr)',
    wetSeasonMonths: 'November – April',
    drySeasonMonths: 'May – October',
    summerMinC: 16,
    summerMaxC: 28,
    winterMinC: 7,
    winterMaxC: 23,
    annualMeanTempC: 19.8,
    currentSimulatedTemp: { min: 11, max: 26, mean: 19 },
    frostRisk: 'Low',
    frostRiskDetails: 'Light ground frost occurs only in deep river valleys (e.g. Lingadzi / Lilongwe river depressions) during rare cold snaps.',
    thermalBeltZone: 'Undulating Plateau Corridor',
    thermalBeltElevationWindow: '1,080m – 1,200m ASL',
    thermalBeltAdvice: 'Expansive open plains benefit from high sunshine hours. Utilize Sasakawa planting basins and deep mulch blankets to retain moisture.',
    solarRadiationKwhM2Day: 5.7,
    solarPeakHoursRange: '5.4 – 6.8 kWh/m²/day',
    microHydroPotential: 'None / Arid Basin',
    microHydroNotes: 'Gentle landscape gradient; rely on solar DC borehole systems (1.5kW – 3kW arrays).',
    aquiferDepthMeters: '18m – 35m (Basement weathered zone aquifer)',
    soilType: 'Ferruginous Red Clay Loam & Kandic Oxisols',
    soilPh: 'pH 5.8 – 6.4',
    windRegime: 'Moderate seasonal winds; open plain requires living fences and Pigeon Pea contour hedgerows.',
    dimbaGardenPotential: 'Extensive commercial vegetable production along perennial dambo drainage basins.',
    frostProtectionProtocols: [
      'Low frost risk; maintain 10cm mulch for moisture retention rather than thermal cover.',
      'Protect winter tomatoes in low-lying dambos during the last two weeks of June.'
    ],
    seasonalAlert: {
      title: 'Grain Storage Fumigation & Solar Pump Servicing',
      description: 'Prepare solar pumping systems and ensure nkhokwe hermetic granaries are clean ahead of seasonal seed storage.',
      urgency: 'low',
      seasonTag: 'Harvest & Storage'
    }
  },

  'zomba': {
    id: 'zomba',
    name: 'Zomba Massif',
    region: 'Southern',
    elevationRangeMeters: '850m – 2,087m ASL (Zomba Plateau)',
    elevationMeanM: 1150,
    agroEcologicalClassification: 'Sub-Tropical Montane Plateau & Shire Highlands Foothills',
    annualRainfallMm: 1420,
    rainfallRangeMm: '1,200mm – 1,800mm',
    monthlyRainfallMm: [290, 270, 240, 95, 30, 20, 18, 15, 18, 45, 140, 279],
    rainfallDistributionType: 'Bimodal/Extended Monsoon + Frequent Chiperoni Orographic Rain',
    wetSeasonMonths: 'November – May',
    drySeasonMonths: 'June – October',
    summerMinC: 17,
    summerMaxC: 28,
    winterMinC: 8,
    winterMaxC: 22,
    annualMeanTempC: 19.4,
    currentSimulatedTemp: { min: 12, max: 25, mean: 18.5 },
    frostRisk: 'Low',
    frostRiskDetails: 'Frost is limited to the uninhabited upper plateau rim (>1,800m); lower residential contours are frost-free.',
    thermalBeltZone: 'Frost-Free Ridge & Mid-Slope Thermal Belt',
    thermalBeltElevationWindow: '900m – 1,400m ASL',
    thermalBeltAdvice: 'Plentiful gravity mountain runoff and rich volcanic slopes make this ideal for bio-intensive organic permaculture and fish ponds.',
    solarRadiationKwhM2Day: 5.3,
    solarPeakHoursRange: '5.0 – 6.4 kWh/m²/day',
    microHydroPotential: 'High Perennial Gravity Catchment',
    microHydroNotes: 'Mulunguzi River and mountain streams offer steady perennial micro-hydro and pressurized gravity water feeds.',
    aquiferDepthMeters: '8m – 18m (Mountain spring lines & fracture aquifer)',
    soilType: 'Volcanic Red Clay Loam & Deep Humic Topsoil',
    soilPh: 'pH 5.6 – 6.3',
    windRegime: 'Sheltered western and southern mountain slopes; moderate easterly Chiperoni mists.',
    dimbaGardenPotential: 'Exceptional gravity-irrigated market gardening: strawberries, leeks, carrots, passionfruit, and herbs.',
    frostProtectionProtocols: [
      'Elevate plant nursery tables 1 meter above damp ground to avoid cold humidity mold.',
      'Mulch vegetable beds with pine needles and compost.'
    ],
    seasonalAlert: {
      title: 'Gravity Stream Intake Cleansing',
      description: 'Inspect mountain stream intake boxes before monsoon flow picks up to remove silt and pine debris.',
      urgency: 'medium',
      seasonTag: 'Hot Dry Preparation'
    }
  },

  'rumphi': {
    id: 'rumphi',
    name: 'Rumphi / Nyika Escarpment',
    region: 'Northern',
    elevationRangeMeters: '1,000m – 2,600m ASL (Nyika High Plateau)',
    elevationMeanM: 1450,
    agroEcologicalClassification: 'High Montane Escarpment & Rift Valley Transition',
    annualRainfallMm: 1220,
    rainfallRangeMm: '1,050mm – 1,550mm',
    monthlyRainfallMm: [270, 240, 210, 85, 15, 5, 2, 2, 6, 22, 105, 258],
    rainfallDistributionType: 'Unimodal Northern Monsoon (Nov–Apr) + Montane Fog',
    wetSeasonMonths: 'November – April',
    drySeasonMonths: 'May – October',
    summerMinC: 13,
    summerMaxC: 26,
    winterMinC: 4,
    winterMaxC: 20,
    annualMeanTempC: 17.2,
    currentSimulatedTemp: { min: 8, max: 22, mean: 15 },
    frostRisk: 'High',
    frostRiskDetails: 'High frost risk on Nyika foothills and valleys in June–July (drops to 0°C–3°C); Escarpment mid-slopes remain warm.',
    thermalBeltZone: 'Frost-Free Ridge & Mid-Slope Thermal Belt',
    thermalBeltElevationWindow: '1,200m – 1,600m ASL',
    thermalBeltAdvice: 'Settle mid-slope terraces overlooking the South Rukuru gorge where air circulation prevents frost pooling.',
    solarRadiationKwhM2Day: 5.5,
    solarPeakHoursRange: '5.2 – 6.6 kWh/m²/day',
    microHydroPotential: 'High Perennial Gravity Catchment',
    microHydroNotes: 'Fast-flowing perennial mountain tributaries dropping from Nyika provide exceptional micro-hydro heads (25m–80m).',
    aquiferDepthMeters: '10m – 20m (Mountain fracture springs)',
    soilType: 'Rocky Sandy Clay Loam & Forest Mollisols',
    soilPh: 'pH 5.8 – 6.5',
    windRegime: 'Strong valley updrafts during day, cool katabatic downdrafts at night.',
    dimbaGardenPotential: 'Coffee, macadamia, temperate fruit trees (apples, plums, peaches), and winter wheat along escarpment channels.',
    frostProtectionProtocols: [
      'Plant cold-sensitive crops only on east-facing terraces to capture early morning sunrise warmth.',
      'Use dense stone-wall terracing to absorb daytime solar heat and radiate warmth to plants at night.',
      'Maintain thick organic mulch blankets over root systems in June and July.'
    ],
    seasonalAlert: {
      title: 'Nyika Katabatic Frost Watch',
      description: 'Cold night airflow descending from Nyika plateau. Shelter fruit saplings and irrigate dimba beds during late afternoons.',
      urgency: 'high',
      seasonTag: 'Cold Dry Season'
    }
  },

  'nkhata-bay': {
    id: 'nkhata-bay',
    name: 'Nkhata Bay / Northern Lakeshore',
    region: 'Northern',
    elevationRangeMeters: '475m – 1,100m ASL',
    elevationMeanM: 520,
    agroEcologicalClassification: 'Hyper-Humid Tropical Lakeshore & Rainforest Escarpment',
    annualRainfallMm: 1750,
    rainfallRangeMm: '1,500mm – 2,200mm',
    monthlyRainfallMm: [310, 290, 270, 180, 80, 40, 25, 20, 18, 45, 142, 330],
    rainfallDistributionType: 'Extended Monsoon + Lake Convective Systems',
    wetSeasonMonths: 'November – May',
    drySeasonMonths: 'June – October (Short & mild)',
    summerMinC: 21,
    summerMaxC: 32,
    winterMinC: 16,
    winterMaxC: 27,
    annualMeanTempC: 24.2,
    currentSimulatedTemp: { min: 18, max: 29, mean: 23.5 },
    frostRisk: 'None',
    frostRiskDetails: 'Zero frost risk. Tropical micro-climate with year-round warmth and high relative humidity.',
    thermalBeltZone: 'Warm Lakeshore Basin Buffer',
    thermalBeltElevationWindow: '475m – 700m ASL',
    thermalBeltAdvice: 'Premier location for tropical agroforestry: cocoa, rubber, vanilla, black pepper, cassava, bananas, and coconuts.',
    solarRadiationKwhM2Day: 5.8,
    solarPeakHoursRange: '5.4 – 6.8 kWh/m²/day',
    microHydroPotential: 'Moderate Hill Catchment',
    microHydroNotes: 'Short steep coastal streams cascading from the Viphya into Lake Malawi.',
    aquiferDepthMeters: '5m – 12m (Abundant high water table)',
    soilType: 'Deep Alluvial Humic Sandy Loam & Rainforest Silt',
    soilPh: 'pH 5.5 – 6.5',
    windRegime: 'Strong easterly lake breezes; design wind-permeable agroforestry canopies.',
    dimbaGardenPotential: 'Perennial production of cassava, sweet potatoes, pineapple, and aquaculture fish ponds.',
    frostProtectionProtocols: [
      'Zero frost protection needed.',
      'Focus on fungal blight prevention during peak monsoon: space crops for cross-ventilation.'
    ],
    seasonalAlert: {
      title: 'Rainforest Runoff & Drainage Clearance',
      description: 'Ensure hillside diversion trenches are maintained to prevent waterlogging around tropical root crops.',
      urgency: 'low',
      seasonTag: 'Rainy Planting'
    }
  },

  'chikwawa': {
    id: 'chikwawa',
    name: 'Chikwawa / Lower Shire Valley',
    region: 'Southern',
    elevationRangeMeters: '60m – 350m ASL',
    elevationMeanM: 120,
    agroEcologicalClassification: 'Semi-Arid Lowland Alluvial Rift Basin',
    annualRainfallMm: 780,
    rainfallRangeMm: '650mm – 950mm',
    monthlyRainfallMm: [210, 180, 140, 30, 4, 1, 0, 0, 2, 12, 65, 136],
    rainfallDistributionType: 'Short Unimodal Monsoon (Dec–Mar) with High Drought Vulnerability',
    wetSeasonMonths: 'December – March',
    drySeasonMonths: 'April – November (Prolonged dry heat)',
    summerMinC: 24,
    summerMaxC: 38,
    winterMinC: 16,
    winterMaxC: 30,
    annualMeanTempC: 27.5,
    currentSimulatedTemp: { min: 20, max: 35, mean: 27.5 },
    frostRisk: 'None',
    frostRiskDetails: 'Zero frost risk. Hottest micro-climate in Malawi; summer peak temperatures regularly cross 40°C.',
    thermalBeltZone: 'Warm Lakeshore Basin Buffer',
    thermalBeltElevationWindow: '60m – 250m ASL',
    thermalBeltAdvice: 'Focus on extreme heat and drought tolerance: drought-tolerant sorghum, pearl millet, pigeon peas, baobab, and solar irrigation from Shire River.',
    solarRadiationKwhM2Day: 6.4,
    solarPeakHoursRange: '6.0 – 7.4 kWh/m²/day (National highest solar yield)',
    microHydroPotential: 'Major River Basin (Shire / Lake)',
    microHydroNotes: 'Shire River provides continuous massive flow volume suitable for large-scale river pumping and canal diversions.',
    aquiferDepthMeters: '12m – 25m (Shire River alluvial flood plain aquifer)',
    soilType: 'Heavy Black Cotton Clay (Vertisols) & Alluvial River Loam',
    soilPh: 'pH 6.8 – 7.8 (Slightly alkaline, high mineral fertility)',
    windRegime: 'Hot dry valley winds; shelterbelts of Neem, Baobab, and Moringa essential.',
    dimbaGardenPotential: 'Vast winter irrigation potential from Shire River: sugarcane, cotton, sesame, winter maize, and beans.',
    frostProtectionProtocols: [
      'Zero frost defenses needed.',
      'Implement heat mitigation: shade cloth for vegetable nurseries, 15cm biochar-compost mulch to reduce soil surface temperatures.'
    ],
    seasonalAlert: {
      title: 'High Heat Evaporation Warning',
      description: 'Midday temperatures exceed 36°C. Shift irrigation schedules to early mornings (05:30) and late evenings (17:00) to prevent 40% evaporative water loss.',
      urgency: 'high',
      seasonTag: 'Hot Dry Preparation'
    }
  }
};

/**
 * Helper to fetch district climate data with fallback to Dedza
 */
export function getDistrictClimateData(districtKeyOrName: string): DistrictClimateData {
  if (!districtKeyOrName) return DISTRICT_CLIMATE_DATABASE['dedza'];
  const key = districtKeyOrName.toLowerCase().trim().replace(/ /g, '-');
  
  if (DISTRICT_CLIMATE_DATABASE[key]) {
    return DISTRICT_CLIMATE_DATABASE[key];
  }
  
  // Try partial search
  const foundKey = Object.keys(DISTRICT_CLIMATE_DATABASE).find(k => 
    k.includes(key) || key.includes(k) || DISTRICT_CLIMATE_DATABASE[k].name.toLowerCase().includes(key)
  );
  
  if (foundKey) {
    return DISTRICT_CLIMATE_DATABASE[foundKey];
  }
  
  return DISTRICT_CLIMATE_DATABASE['dedza'];
}

/**
 * Returns month names for the 12-month climate distribution
 */
export const CLIMATE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
