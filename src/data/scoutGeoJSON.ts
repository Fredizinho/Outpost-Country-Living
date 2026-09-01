export interface ScoutParcelProperties {
  id: string;
  title: string;
  district: string;
  traditionalAuthority: string; // T/A
  groupVillageHeadman: string; // GVH
  hectares: number;
  acres: number;
  waterReliability: 'Perennial Stream' | 'Seasonal Dambo' | 'Deep Aquifer' | 'Shallow Well';
  landTenure: 'Customary Estate Registered' | 'Private Leasehold' | 'Unregistered Customary';
  tnmSignal: '4G' | '3G' | 'Edge' | 'None';
  airtelSignal: '4G' | '3G' | 'Edge' | 'None';
  distanceToGridKm: number;
  rainySeasonAccess: 'All-Weather Tarmac/Gravel' | '4x4 Dirt' | 'Impassable Dirt';
  soilProfile: 'Sandy Loam' | 'Heavy Clay/Dambo' | 'Gentle Slope Red Latosol' | 'Volcanic Rich';
  soilPh: number;
  soilOrganicMatterPct: number;
  soilTextureClass: string;
  soilCationExchangeCapacity: number; // meq/100g
  edenicStewardshipScore: number; // 0 - 100
  soilMicrobiologyStatus: string;
  erosionRisk: string;
  chiefVerification: 'Verified' | 'Pending' | 'In Review';
  priceMWK: number;
  priceUSD: number;
  scoutNotes: string;
  dateScouted: string;
  elevationMeters: number;
  nearestTown: string;
  // Micro-GIS & Topography Enhancements
  slopePct: number;
  catchmentBasin: string;
  escarpmentZone: string;
  microHydroPotentialKw: number;
  microHydroHeadMeters: number;
  microHydroFlowLps: number;
  recommendedSwaleSpacingMeters: number;
  canopyCoverPct: number;
  boundaryPolygon: [number, number][]; // [lat, lng] array
  contourElevationMin: number;
  contourElevationMax: number;
}

export interface ScoutParcelFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: ScoutParcelProperties;
}

export interface ScoutGeoJSONCollection {
  type: 'FeatureCollection';
  features: ScoutParcelFeature[];
}

export const DUMMY_SCOUT_GEOJSON: ScoutGeoJSONCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [34.3333, -14.3333] // Dedza Highlands
      },
      properties: {
        id: 'land-dedza-01',
        title: 'Bembeke Mountain Valley Springs Parcel',
        district: 'Dedza',
        traditionalAuthority: 'T/A Kaphuka',
        groupVillageHeadman: 'GVH Chimwala',
        hectares: 8.5,
        acres: 21.0,
        waterReliability: 'Perennial Stream',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '4G',
        airtelSignal: '4G',
        distanceToGridKm: 1.2,
        rainySeasonAccess: 'All-Weather Tarmac/Gravel',
        soilProfile: 'Gentle Slope Red Latosol',
        soilPh: 6.4,
        soilOrganicMatterPct: 4.2,
        soilTextureClass: 'Deep Red Katondo Latosol (Oxisol)',
        soilCationExchangeCapacity: 18.2,
        edenicStewardshipScore: 94,
        soilMicrobiologyStatus: 'Rich Mycorrhizal Fungi & Earthworms',
        erosionRisk: 'Low (Vetiver Contour Hedges Installed)',
        chiefVerification: 'Verified',
        priceMWK: 18500000,
        priceUSD: 10600,
        scoutNotes: 'Perennial mountain spring flowing at 22L/sec year-round. Deep friable red latosol soil perfect for irish potatoes, apples, and maize. Boundary demarcated with concrete beacons and signed by TA Kaphuka.',
        dateScouted: '2026-06-14',
        elevationMeters: 1620,
        nearestTown: 'Dedza Boma (14 km)',
        slopePct: 9.4,
        catchmentBasin: 'Linthipe & Dedza Highlands Basin',
        escarpmentZone: 'Dedza Mountain & Bembeke Escarpment',
        microHydroPotentialKw: 3.2,
        microHydroHeadMeters: 18,
        microHydroFlowLps: 22,
        recommendedSwaleSpacingMeters: 12,
        canopyCoverPct: 44,
        contourElevationMin: 1590,
        contourElevationMax: 1650,
        boundaryPolygon: [
          [-14.3315, 34.3310],
          [-14.3318, 34.3362],
          [-14.3355, 34.3358],
          [-14.3350, 34.3305]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [34.6333, -14.8167] // Ntcheu Livulezi
      },
      properties: {
        id: 'land-ntcheu-02',
        title: 'Livulezi River Basin Farmstead',
        district: 'Ntcheu',
        traditionalAuthority: 'T/A Ganya',
        groupVillageHeadman: 'GVH Makwangwala',
        hectares: 12.0,
        acres: 29.6,
        waterReliability: 'Perennial Stream',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '4G',
        airtelSignal: '3G',
        distanceToGridKm: 2.8,
        rainySeasonAccess: 'All-Weather Tarmac/Gravel',
        soilProfile: 'Volcanic Rich',
        soilPh: 6.7,
        soilOrganicMatterPct: 4.8,
        soilTextureClass: 'Volcanic Rich Alluvial Loam',
        soilCationExchangeCapacity: 24.5,
        edenicStewardshipScore: 96,
        soilMicrobiologyStatus: 'High Earthworm Activity & Humus',
        erosionRisk: 'Low (Flat River Floodplain Alluvium)',
        chiefVerification: 'Verified',
        priceMWK: 24000000,
        priceUSD: 13800,
        scoutNotes: 'Includes 400m river frontage along Livulezi. Excellent dimba wetland potential for off-season vegetable cultivation. Grid power transformer 2.8km along main M1 branch.',
        dateScouted: '2026-05-20',
        elevationMeters: 1280,
        nearestTown: 'Ntcheu Boma (22 km)',
        slopePct: 4.2,
        catchmentBasin: 'Linthipe & Dedza Highlands Basin',
        escarpmentZone: 'Tsangano Ridge Western Foothills',
        microHydroPotentialKw: 1.8,
        microHydroHeadMeters: 8,
        microHydroFlowLps: 30,
        recommendedSwaleSpacingMeters: 20,
        canopyCoverPct: 28,
        contourElevationMin: 1265,
        contourElevationMax: 1295,
        boundaryPolygon: [
          [-14.8145, 34.6305],
          [-14.8150, 34.6370],
          [-14.8190, 34.6360],
          [-14.8185, 34.6298]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [33.5956, -11.8847] // Mzimba South / Viphya
      },
      properties: {
        id: 'land-mzimba-03',
        title: 'Viphya Foothills Pine & Orchard Sanctuary',
        district: 'Mzimba',
        traditionalAuthority: 'T/A Mzikubola',
        groupVillageHeadman: 'GVH Jere',
        hectares: 25.0,
        acres: 61.7,
        waterReliability: 'Deep Aquifer',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '3G',
        airtelSignal: '4G',
        distanceToGridKm: 4.5,
        rainySeasonAccess: '4x4 Dirt',
        soilProfile: 'Sandy Loam',
        soilPh: 6.1,
        soilOrganicMatterPct: 3.6,
        soilTextureClass: 'Light Sandy Loam over Clay',
        soilCationExchangeCapacity: 14.8,
        edenicStewardshipScore: 88,
        soilMicrobiologyStatus: 'Virgin Forest Leaf Mold & Mycorrhizae',
        erosionRisk: 'Moderate (Gentle Slope - Needs Vetiver)',
        chiefVerification: 'Verified',
        priceMWK: 35000000,
        priceUSD: 20100,
        scoutNotes: 'Expansive acreage with established pine grove timber and high water table (hydrogeology borehole test confirmed water at 18m). Cool microclimate suitable for macadamia, avocados, and peaches.',
        dateScouted: '2026-07-02',
        elevationMeters: 1450,
        nearestTown: 'Mzuzu City (38 km)',
        slopePct: 14.8,
        catchmentBasin: 'Lake Malawi North Catchment',
        escarpmentZone: 'Viphya Forest Escarpment',
        microHydroPotentialKw: 5.4,
        microHydroHeadMeters: 35,
        microHydroFlowLps: 20,
        recommendedSwaleSpacingMeters: 8,
        canopyCoverPct: 62,
        contourElevationMin: 1410,
        contourElevationMax: 1490,
        boundaryPolygon: [
          [-11.8810, 33.5910],
          [-11.8820, 33.6010],
          [-11.8890, 33.5990],
          [-11.8875, 33.5900]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [35.3167, -15.3833] // Zomba Plateau Slopes
      },
      properties: {
        id: 'land-zomba-04',
        title: 'Domasi Mountain Gravity Springs Acreage',
        district: 'Zomba',
        traditionalAuthority: 'T/A Malemia',
        groupVillageHeadman: 'GVH Chikowi',
        hectares: 6.2,
        acres: 15.3,
        waterReliability: 'Perennial Stream',
        landTenure: 'Private Leasehold',
        tnmSignal: '4G',
        airtelSignal: '4G',
        distanceToGridKm: 0.5,
        rainySeasonAccess: 'All-Weather Tarmac/Gravel',
        soilProfile: 'Volcanic Rich',
        soilPh: 6.5,
        soilOrganicMatterPct: 5.2,
        soilTextureClass: 'Rich Volcanic Humus Loam',
        soilCationExchangeCapacity: 26.0,
        edenicStewardshipScore: 98,
        soilMicrobiologyStatus: 'Superior Earthworm Biomass & Humus',
        erosionRisk: 'Low (Terraced Gravity Springs)',
        chiefVerification: 'Verified',
        priceMWK: 32000000,
        priceUSD: 18400,
        scoutNotes: 'Natural high-pressure gravity flow water supply directly off Zomba Plateau. ESCOM 3-phase power line passes right at the plot boundary. Title deed 99-year lease registered in Ministry of Lands.',
        dateScouted: '2026-04-11',
        elevationMeters: 1100,
        nearestTown: 'Zomba City (11 km)',
        slopePct: 18.5,
        catchmentBasin: 'Lake Chilwa Endorheic Basin',
        escarpmentZone: 'Zomba Plateau Slopes',
        microHydroPotentialKw: 8.5,
        microHydroHeadMeters: 55,
        microHydroFlowLps: 20,
        recommendedSwaleSpacingMeters: 6,
        canopyCoverPct: 56,
        contourElevationMin: 1060,
        contourElevationMax: 1145,
        boundaryPolygon: [
          [-15.3810, 35.3135],
          [-15.3815, 35.3195],
          [-15.3860, 35.3190],
          [-15.3855, 35.3125]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [33.4833, -13.0167] // Kasungu Plateau
      },
      properties: {
        id: 'land-kasungu-05',
        title: 'Chinkhoma Grain & Legume Outpost',
        district: 'Kasungu',
        traditionalAuthority: 'T/A Lukwa',
        groupVillageHeadman: 'GVH Mwase',
        hectares: 18.0,
        acres: 44.4,
        waterReliability: 'Shallow Well',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '4G',
        airtelSignal: '4G',
        distanceToGridKm: 3.2,
        rainySeasonAccess: 'All-Weather Tarmac/Gravel',
        soilProfile: 'Sandy Loam',
        soilPh: 5.8,
        soilOrganicMatterPct: 2.9,
        soilTextureClass: 'Sandy Clay Loam Plains',
        soilCationExchangeCapacity: 12.4,
        edenicStewardshipScore: 82,
        soilMicrobiologyStatus: 'Moderate Humus - Benefits from Legume Rotation',
        erosionRisk: 'Low (Flat Plateau Terrain)',
        chiefVerification: 'Verified',
        priceMWK: 28000000,
        priceUSD: 16100,
        scoutNotes: 'Flat fertile plains ideal for mechanized maize, groundnuts, soya, and sunflower. 2 shallow hand-dug wells maintain 4m water head through October.',
        dateScouted: '2026-06-28',
        elevationMeters: 1040,
        nearestTown: 'Kasungu Boma (18 km)',
        slopePct: 2.1,
        catchmentBasin: 'Bua & Central Plateau Catchment',
        escarpmentZone: 'Kasungu Plateau Plains',
        microHydroPotentialKw: 0.5,
        microHydroHeadMeters: 3,
        microHydroFlowLps: 20,
        recommendedSwaleSpacingMeters: 35,
        canopyCoverPct: 18,
        contourElevationMin: 1030,
        contourElevationMax: 1050,
        boundaryPolygon: [
          [-13.0135, 33.4795],
          [-13.0140, 33.4875],
          [-13.0205, 33.4865],
          [-13.0195, 33.4785]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [34.4333, -13.7833] // Salima Lakeshore Hinterland
      },
      properties: {
        id: 'land-salima-06',
        title: 'Lifidzi Dambo Organic Eco-Farm',
        district: 'Salima',
        traditionalAuthority: 'T/A Maganga',
        groupVillageHeadman: 'GVH Pemba',
        hectares: 10.5,
        acres: 25.9,
        waterReliability: 'Seasonal Dambo',
        landTenure: 'Unregistered Customary',
        tnmSignal: '3G',
        airtelSignal: '3G',
        distanceToGridKm: 6.8,
        rainySeasonAccess: '4x4 Dirt',
        soilProfile: 'Heavy Clay/Dambo',
        soilPh: 6.9,
        soilOrganicMatterPct: 4.4,
        soilTextureClass: 'Heavy Black Dambo Alluvial Clay',
        soilCationExchangeCapacity: 28.5,
        edenicStewardshipScore: 90,
        soilMicrobiologyStatus: 'Anaerobic/Wetland Microbes & High Organic Silt',
        erosionRisk: 'Low (Lowland Basin Wetland)',
        chiefVerification: 'Pending',
        priceMWK: 14000000,
        priceUSD: 8000,
        scoutNotes: 'Abundant lowland dambo moisture holding water for winter rice, tomatoes, and sugarcane. Customary boundary meeting scheduled with TA Maganga for formal registration.',
        dateScouted: '2026-07-15',
        elevationMeters: 520,
        nearestTown: 'Salima Boma (16 km)',
        slopePct: 1.5,
        catchmentBasin: 'Linthipe & Dedza Highlands Basin',
        escarpmentZone: 'Salima Lakeshore Alluvial Basin',
        microHydroPotentialKw: 0.2,
        microHydroHeadMeters: 2,
        microHydroFlowLps: 15,
        recommendedSwaleSpacingMeters: 45,
        canopyCoverPct: 22,
        contourElevationMin: 515,
        contourElevationMax: 528,
        boundaryPolygon: [
          [-13.7810, 34.4295],
          [-13.7815, 34.4375],
          [-13.7865, 34.4365],
          [-13.7855, 34.4285]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [35.1333, -16.0667] // Thyolo Tea Slopes
      },
      properties: {
        id: 'land-thyolo-07',
        title: 'Bvumbwe Microclimate Fruit Orchard',
        district: 'Thyolo',
        traditionalAuthority: 'T/A Bvumbwe',
        groupVillageHeadman: 'GVH Kapeni',
        hectares: 5.0,
        acres: 12.3,
        waterReliability: 'Perennial Stream',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '4G',
        airtelSignal: '4G',
        distanceToGridKm: 0.8,
        rainySeasonAccess: 'All-Weather Tarmac/Gravel',
        soilProfile: 'Gentle Slope Red Latosol',
        soilPh: 6.3,
        soilOrganicMatterPct: 4.6,
        soilTextureClass: 'Deep Friable Red Katondo Latosol',
        soilCationExchangeCapacity: 21.0,
        edenicStewardshipScore: 95,
        soilMicrobiologyStatus: 'Active Soil Biology & Compost Mulch Layer',
        erosionRisk: 'Low (Contour Planted Macadamia)',
        chiefVerification: 'Verified',
        priceMWK: 21000000,
        priceUSD: 12000,
        scoutNotes: 'High-rainfall mist zone perfect for organic market gardening, avocados, citrus, and macadamia. Piped water access 100m away.',
        dateScouted: '2026-05-30',
        elevationMeters: 1180,
        nearestTown: 'Limbe / Blantyre (19 km)',
        slopePct: 12.0,
        catchmentBasin: 'Shire River & Southern Valley Basin',
        escarpmentZone: 'Thyolo & Shire Highlands Escarpment',
        microHydroPotentialKw: 4.5,
        microHydroHeadMeters: 25,
        microHydroFlowLps: 24,
        recommendedSwaleSpacingMeters: 10,
        canopyCoverPct: 48,
        contourElevationMin: 1150,
        contourElevationMax: 1210,
        boundaryPolygon: [
          [-16.0645, 35.1305],
          [-16.0650, 35.1365],
          [-16.0690, 35.1355],
          [-16.0685, 35.1298]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [34.3000, -12.9167] // Nkhotakota Chia Lagoon
      },
      properties: {
        id: 'land-nkhotakota-08',
        title: 'Chia Lagoon Wetland & Aquaponics Site',
        district: 'Nkhotakota',
        traditionalAuthority: 'T/A Malengachanzi',
        groupVillageHeadman: 'GVH Kafuzira',
        hectares: 14.0,
        acres: 34.5,
        waterReliability: 'Perennial Stream',
        landTenure: 'Unregistered Customary',
        tnmSignal: '4G',
        airtelSignal: '3G',
        distanceToGridKm: 8.5,
        rainySeasonAccess: 'Impassable Dirt',
        soilProfile: 'Heavy Clay/Dambo',
        soilPh: 6.8,
        soilOrganicMatterPct: 4.1,
        soilTextureClass: 'Lacustrine Lagoon Clay Silt',
        soilCationExchangeCapacity: 22.8,
        edenicStewardshipScore: 86,
        soilMicrobiologyStatus: 'Rich Wetland Biodiversity',
        erosionRisk: 'Low (Lagoon Ingress)',
        chiefVerification: 'Pending',
        priceMWK: 16500000,
        priceUSD: 9500,
        scoutNotes: 'Direct stream inlet into Chia Lagoon. High biodiversity and fishing potential. Requires 4x4 or tractor access in January-February peak rains.',
        dateScouted: '2026-07-22',
        elevationMeters: 490,
        nearestTown: 'Nkhotakota Boma (24 km)',
        slopePct: 1.8,
        catchmentBasin: 'Bua & Central Plateau Catchment',
        escarpmentZone: 'Nkhotakota Lakeshore Trench',
        microHydroPotentialKw: 0.4,
        microHydroHeadMeters: 3,
        microHydroFlowLps: 18,
        recommendedSwaleSpacingMeters: 40,
        canopyCoverPct: 35,
        contourElevationMin: 480,
        contourElevationMax: 500,
        boundaryPolygon: [
          [-12.9140, 34.2965],
          [-12.9145, 34.3045],
          [-12.9198, 34.3035],
          [-12.9190, 34.2955]
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [33.8000, -10.5833] // Rumphi Livingstonia Escarpment
      },
      properties: {
        id: 'land-rumphi-09',
        title: 'Manchewe Waterfalls Escarpment Retreat',
        district: 'Rumphi',
        traditionalAuthority: 'T/A Mwankhunikira',
        groupVillageHeadman: 'GVH Mhuju',
        hectares: 9.8,
        acres: 24.2,
        waterReliability: 'Perennial Stream',
        landTenure: 'Customary Estate Registered',
        tnmSignal: '3G',
        airtelSignal: 'None',
        distanceToGridKm: 5.1,
        rainySeasonAccess: '4x4 Dirt',
        soilProfile: 'Gentle Slope Red Latosol',
        soilPh: 6.2,
        soilOrganicMatterPct: 4.5,
        soilTextureClass: 'Mountain Slope Red Latosol',
        soilCationExchangeCapacity: 19.5,
        edenicStewardshipScore: 92,
        soilMicrobiologyStatus: 'Forest Ecosystem Biological Activity',
        erosionRisk: 'Moderate Slope (Natural Stone Terraced)',
        chiefVerification: 'Verified',
        priceMWK: 19800000,
        priceUSD: 11300,
        scoutNotes: 'Pristine mountain spring water directly off Viphya/Nyika plateau. Micro-hydro potential (15m water drop head). Ideal for off-grid self-sufficient homesteading.',
        dateScouted: '2026-06-05',
        elevationMeters: 1390,
        nearestTown: 'Rumphi Boma (28 km)',
        slopePct: 26.5,
        catchmentBasin: 'Lake Malawi North Catchment',
        escarpmentZone: 'Livingstonia Rift Wall Escarpment',
        microHydroPotentialKw: 14.2,
        microHydroHeadMeters: 68,
        microHydroFlowLps: 28,
        recommendedSwaleSpacingMeters: 5,
        canopyCoverPct: 68,
        contourElevationMin: 1320,
        contourElevationMax: 1460,
        boundaryPolygon: [
          [-10.5805, 33.7960],
          [-10.5815, 33.8045],
          [-10.5870, 33.8035],
          [-10.5860, 33.7950]
        ]
      }
    }
  ]
};
