import { COUNTRY_IMAGES } from '@/assets/images';

export type QuoteCategory =
  | 'Mental Health'
  | 'Children'
  | 'Physical Labor'
  | 'Spiritual Growth'
  | 'Preparation'
  | 'Vision'
  | 'Education & Manual Training'
  | 'Sustenance & Diet'
  | 'Medical Missionary';

export interface Quote {
  id: string;
  title?: string;
  theme?: string;
  image?: string;
  imageAlt?: string;
  historicalContext?: string;
  text: string;
  source: string;
  egwCode?: string;
  yearWritten?: string;
  originalDocument?: string;
  verifiedUrl?: string;
  scriptureCompanion?: {
    verse: string;
    reference: string;
  };
  malawiOutpostApplication?: string;
  category: QuoteCategory;
}

export interface Guide {
  id: string;
  title: string;
  category: 'Where' | 'What' | 'How';
  content: string;
  icon: string;
}

export interface Devotional {
  id: string;
  text: string;
  source: string;
  egwCode?: string;
  verifiedUrl?: string;
  theme: string;
}

export interface LandChecklistItem {
  id: string;
  category: 'Water' | 'Soil' | 'Legal' | 'Energy' | 'Location';
  label: string;
  description: string;
}

export const DEVOTIONAL_QUOTES: Devotional[] = getVerifiedQuotes()
  .filter((q) => q.id.startsWith('d') || q.category === 'Spiritual Growth')
  .map((q) => ({
    id: q.id,
    text: q.text,
    source: q.source,
    egwCode: q.standardEgwCode,
    verifiedUrl: q.verifiedUrl,
    theme: q.theme || q.title,
  }));

export const LAND_CHECKLIST_DATA: LandChecklistItem[] = [
  { id: 'w1', category: 'Water', label: 'Year-round Water Source', description: 'Verify perennial mountain springs, gravity-head elevation drop, or weathered basement aquifer depth (15m–45m) tested at peak dry season (October).' },
  { id: 's1', category: 'Soil', label: 'Topsoil Depth & Quality', description: 'Excavate 60cm test pits to verify Eutric Nitisol / Katondo clay-loam horizons, pH 5.5–6.6, and absence of synthetic chemical hardpan.' },
  { id: 'l1', category: 'Legal', label: 'Customary Land Act & Title Verification', description: 'Verify Customary Estate allocation with Village Headman (Mfumu), Group Village Headman, Traditional Authority, and District Land Registry under Act No. 19 of 2016.' },
  { id: 'e1', category: 'Energy', label: 'Solar Insolation & Gravity Micro-Hydro', description: 'Confirm North-facing solar exposure (5.5–6.5 kWh/m²/day) free of cliff shading, and evaluate stream head for gravity filtration.' },
  { id: 'loc1', category: 'Location', label: 'Outpost Proximity & Rural Seclusion', description: 'Select an "easy distance" from urban mission fields—isolated from metropolitan clamor yet accessible via all-weather feeder roads for medical and literature outreach.' }
];

export interface OutpostZone {
  id: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  suitability: string;
  crops: string[];
  climate: string;
}

export const MALAWI_OUTPOST_ZONES: OutpostZone[] = [
  {
    id: 'z1',
    name: 'Viphya Plateau',
    region: 'Northern',
    suitability: 'High - Abundant water and pine forests.',
    crops: ['Potatoes', 'Macadamia', 'Coffee'],
    climate: 'Cool, high rainfall'
  },
  {
    id: 'z4',
    name: 'Misuku Hills',
    region: 'Northern',
    suitability: 'Moderate - Excellent soil but remote access.',
    crops: ['Coffee', 'Bananas', 'Citrus'],
    climate: 'Tropical Highland'
  },
  {
    id: 'z2',
    name: 'Dedza Highlands',
    region: 'Central',
    suitability: 'Very High - Volcanic soil, temperate climate.',
    crops: ['Peaches', 'Vegetables', 'Maize'],
    climate: 'Temperate, misty'
  },
  {
    id: 'z5',
    name: 'Kasungu Plain',
    region: 'Central',
    suitability: 'Moderate - Flat land, requires good boreholes.',
    crops: ['Sunflower', 'Groundnuts', 'Maize'],
    climate: 'Savanna'
  },
  {
    id: 'z3',
    name: 'Mulanje Massif',
    region: 'Southern',
    suitability: 'High - Unique microclimates, biodiversity.',
    crops: ['Tea', 'Avocados', 'Spices'],
    climate: 'High humidity, high rainfall'
  },
  {
    id: 'z6',
    name: 'Lower Shire Valley',
    region: 'Southern',
    suitability: 'Low - Extreme heat, but good for specific crops.',
    crops: ['Cotton', 'Sugar Cane', 'Sorghum'],
    climate: 'Semi-arid, hot'
  }
];

import { getVerifiedQuotes } from '@/data/sources/quotes';

/**
 * All Ellen G. White quotes have been moved to the centralized verified quote store:
 * src/data/sources/quotes.ts
 *
 * Entries with verifiedBy === null are hidden until verified.
 * To review and verify entries, see QUOTES_TO_VERIFY.md.
 */
export const EGW_QUOTES: Quote[] = getVerifiedQuotes().map((vq) => ({
  id: vq.id,
  title: vq.title,
  theme: vq.theme,
  text: vq.text,
  source: vq.source,
  egwCode: vq.standardEgwCode,
  yearWritten: vq.yearWritten,
  originalDocument: vq.originalDocument,
  verifiedUrl: vq.verifiedUrl,
  scriptureCompanion: vq.scriptureCompanion
    ? {
        verse: vq.scriptureCompanion.verse,
        reference: vq.scriptureCompanion.reference,
      }
    : undefined,
  malawiOutpostApplication: vq.applicationForCountryLiving,
  category: vq.category,
}));

import { DISTRICT_LIST } from './dataRegistry';

export interface MalawiDistrictInfo {
  id?: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  altitude: string;
  rainfall: string;
  rainfallAnnualMm: number;
  soil: string;
  faoSoilClassification: string;
  soilTypeDetailed: string;
  soilPh: string;
  groundwaterDepthM: string;
  aquiferDepthM: number;
  solarKwhDay: number;
  landCostBallpark: string;
  nearestMarketTown: string;
  m1DistanceKm: string;
  suitabilityScore: number; // 1 to 10
  verificationStatus: 'verified' | 'partial' | 'unverified' | 'pending';
  unverifiedFields: string[];
  verificationNote?: string;
  bestCrops: string[];
  outpostStrategy: string;
  hydrogeologyNote: string;
  dccmsSourceRef: string;
}

const DISTRICT_CURATED_META: Record<
  string,
  {
    nearestMarketTown: string;
    m1DistanceKm: string;
    outpostStrategy: string;
    hydrogeologyNote: string;
  }
> = {
  dedza: {
    nearestMarketTown: 'Dedza Boma & Lizulu Trading Centre (Direct on M1 Highway)',
    m1DistanceKm: '0 – 15 km from main M1 transport spine',
    outpostStrategy:
      'Prime cold-climate highland sanctuary. High altitude yields cool nights (6°C in winter), ideal for seed saving, root cellars, and year-round vegetable cropping without heat stress.',
    hydrogeologyNote:
      'High mountain catchment recharge ensures strong perennial springs. Gravity-fed pipelines work exceptionally well without electricity.',
  },
  mzimba: {
    nearestMarketTown: 'Mzimba Boma, Ekwendeni & Mzuzu City (M1 North)',
    m1DistanceKm: '5 – 35 km depending on ward',
    outpostStrategy:
      'Vast land holdings with low population density. Excellent for broad-acre organic farming, solar food forests, livestock stewardship, and off-grid timber sanctuaries.',
    hydrogeologyNote:
      'Abundant seasonal dambos (valley wetlands) retain moisture into late October. Shallow hand-dug wells and boreholes yield high-quality water.',
  },
  mulanje: {
    nearestMarketTown: 'Mulanje Boma & Limbuli Border Market (Near M2 Highway)',
    m1DistanceKm: '65 km East of M1 via Thyolo/Blantyre M2',
    outpostStrategy:
      'Abundant natural mountain rivers flowing from Mulanje Massif. Winter Chiperoni mists maintain high relative humidity. Exceptional for tropical food forests and hydro micro-turbines.',
    hydrogeologyNote:
      'Dozens of perennial mountain streams (Likhubula, Ruo, Thuchila) provide clean surface water for gravity filtration systems.',
  },
  kasungu: {
    nearestMarketTown: 'Kasungu Boma & Nkhamenya Trading Centre (Direct M1 North)',
    m1DistanceKm: '0 – 20 km along M1 corridor',
    outpostStrategy:
      'Gentle, flat terrain ideal for animal-drawn broadforking, leguminous crop rotations, and solar-pumped borehole irrigation. Excellent dry grain storage conditions.',
    hydrogeologyNote:
      'Weathered crystalline basement aquifer (~32m mean depth) requiring drilled boreholes fitted with solar submersible pumps and elevated holding tanks.',
  },
  zomba: {
    nearestMarketTown: 'Zomba City & Songani Trading Centre (M3 Highway)',
    m1DistanceKm: '40 km East of M1 via Zomba turnoff',
    outpostStrategy:
      'Perennial mountain springs from Zomba Plateau provide cool mountain air and clean water. Historic agricultural hub with close proximity to Adventist health & education centers.',
    hydrogeologyNote:
      'Mulunguzi River and mountain springs provide year-round gravity irrigation options for slope homesteads.',
  },
  ntcheu: {
    nearestMarketTown: 'Ntcheu Boma & Lizulu Market (M1 Highway)',
    m1DistanceKm: '0 – 10 km along M1 spine',
    outpostStrategy:
      'Located along the cool Kirk Range escarpment. Famous for vegetable production and rapid access to Lilongwe/Blantyre via M1. High agricultural self-reliance potential.',
    hydrogeologyNote:
      'Springs along the Kirk Range feed gravity irrigation systems for vegetable terraces (~22m mean aquifer depth).',
  },
  nkhotakota: {
    nearestMarketTown: 'Nkhotakota Boma & Dwangwa Trading Centre (M5 Lakeshore Highway)',
    m1DistanceKm: '75 km East of M1 via Ntchisi/Kasungu roads',
    outpostStrategy:
      'Abundant water supply from Lake Malawi and major rivers (Bua, Kaombe, Dwangwa). High rainfall allows rainfed rice, cassava, and tropical agroforestry.',
    hydrogeologyNote:
      'Shallow unconsolidated lakeshore alluvial water table (~10m mean depth) allows low-head solar surface and submersible pumping.',
  },
  chitipa: {
    nearestMarketTown: 'Chitipa Boma, Kapoka & Misuku Trading Centres',
    m1DistanceKm: '95 km North-West of Karonga M1 junction via M26',
    outpostStrategy:
      'Remote, pristine highland sanctuary bordering the Misuku Hills forest reserve. Pristine spring water, deep Humic Acrisol & Nitisol soils, and quiet rural seclusion.',
    hydrogeologyNote:
      'Natural mountain springs and shallow highland aquifers (~22m mean depth) feed pure drinking water via gravity pipes.',
  },
};

export const MALAWI_DISTRICTS_DATA: Record<string, MalawiDistrictInfo> = Object.fromEntries(
  DISTRICT_LIST.map((d) => {
    const meta = DISTRICT_CURATED_META[d.id];
    return [
      d.id,
      {
        id: d.id,
        name: `${d.name} District`,
        region: d.region,
        altitude: `${d.agroZone} (${d.elevationRange})`,
        rainfall: `${d.rainfallAnnualMm.toLocaleString()} mm/year (${d.rainfallPattern})`,
        rainfallAnnualMm: d.rainfallAnnualMm,
        soil: d.primarySoil,
        faoSoilClassification: d.faoSoilClassification,
        soilTypeDetailed: `${d.primarySoil} — ${d.soilAmendmentPrescription}`,
        soilPh: d.soilPh,
        groundwaterDepthM: d.aquiferDepth,
        aquiferDepthM: d.aquiferDepthM,
        solarKwhDay: d.solarKwhDay,
        landCostBallpark: d.landCostBallpark,
        nearestMarketTown:
          meta?.nearestMarketTown ??
          `${d.name} Boma & T/A Trading Centres (${d.traditionalAuthorities.slice(0, 2).join(', ')})`,
        m1DistanceKm:
          meta?.m1DistanceKm ??
          `${d.region} Region transport network (${Math.abs(d.lat).toFixed(2)}°S, ${d.lng.toFixed(2)}°E)`,
        suitabilityScore: d.suitabilityScore,
        verificationStatus: d.verificationStatus,
        unverifiedFields: d.unverifiedFields,
        bestCrops: d.topCrops,
        outpostStrategy: meta?.outpostStrategy ?? d.description,
        hydrogeologyNote:
          meta?.hydrogeologyNote ??
          `${d.waterRating}. Aquifer depth: ${d.aquiferDepth} (${d.aquiferSource || 'Regional hydrogeology survey pending field verification'}).`,
        dccmsSourceRef: `${d.rainfallSource || 'DCCMS Regional Estimate'} · ${d.soilSource || 'FAO HWSD v2.0'}`,
      },
    ];
  })
);

export interface CitationSource {
  id: string;
  category: 'Climate & Met' | 'Soil & Agriculture' | 'Water & Hydrogeology' | 'Land & Legal' | 'Inspired Counsel & Scripture';
  title: string;
  institution: string;
  description: string;
  verifiableURLOrDoc: string;
  directUrl?: string;
}

export const DATA_SOURCES_AND_CITATIONS: CitationSource[] = [
  {
    id: 'cit-dccms',
    category: 'Climate & Met',
    title: 'Malawi Annual Agro-Meteorological Normals & District Rainfall Statistics (1991-2024)',
    institution: 'Department of Climate Change and Meteorological Services (DCCMS), Ministry of Natural Resources & Climate Change, Government of Malawi',
    description: 'Official rainfall volume ranges, temperature extremes, seasonal onset/cessation dates, and regional Chiperoni mist frequencies across all 28 Malawi districts.',
    verifiableURLOrDoc: 'DCCMS Agro-Met Bulletin Series, Lilongwe, Malawi (www.metmalawi.gov.mw)',
    directUrl: 'https://www.metmalawi.gov.mw/'
  },
  {
    id: 'cit-openmeteo-ecmwf',
    category: 'Climate & Met',
    title: 'ECMWF IFS Land Surface Model & FAO-56 Penman-Monteith Evapotranspiration Telemetry',
    institution: 'Copernicus Climate Change Service (ERA5-Land) & Open-Meteo Scientific API',
    description: 'Real-time satellite and numerical weather prediction telemetry providing root-zone volumetric soil moisture (0–9cm), soil temperature, solar shortwave radiation (W/m²), and daily ET₀.',
    verifiableURLOrDoc: 'Open-Meteo Forecast & Elevation API (api.open-meteo.com)',
    directUrl: 'https://open-meteo.com/en/docs'
  },
  {
    id: 'cit-moa-soil',
    category: 'Soil & Agriculture',
    title: 'Harmonized World Soil Database (HWSD v2.0) & Malawi Land Resources Survey',
    institution: 'Food and Agriculture Organization of the United Nations (FAO), ISRIC World Soil Information & LUANAR',
    description: 'Pedological mapping detailing Eutric Nitisols in Dedza/Ntcheu, Humic Ferralsols in Mulanje/Thyolo, and Orthic Ferralsols in Kasungu plateau, including pH and CEC profiles.',
    verifiableURLOrDoc: 'FAO Land & Water Profile for Malawi & MoAIWD Land Resources Bulletin No. 4',
    directUrl: 'https://www.fao.org/countryprofiles/index/en/?iso3=MWI'
  },
  {
    id: 'cit-wateraid-hydro',
    category: 'Water & Hydrogeology',
    title: 'AQUASTAT Malawi Water Resources & Weathered Basement Aquifer Atlas',
    institution: 'FAO AQUASTAT Global Information System on Water and Agriculture & Ministry of Water Malawi',
    description: 'Drill depths, borehole yields, and water table depths for crystalline basement aquifers (25–45m in Central Plateau) vs. unconsolidated alluvial aquifers (5–20m along Lakeshore).',
    verifiableURLOrDoc: 'FAO AQUASTAT Country Profile: Malawi & Hydrogeological Survey Paper #12',
    directUrl: 'https://www.fao.org/aquastat/en/countries-and-basins/country-profiles/country/MWI'
  },
  {
    id: 'cit-land-act',
    category: 'Land & Legal',
    title: 'Customary Land Act (Act No. 19 of 2016) & Customary Land Regulations (2018)',
    institution: 'Parliament of Malawi & Malawi Legal Information Institute (MalawiLII)',
    description: 'How land is managed in your area: how to register it, why you need the chief’s agreement, and what to do if there is a dispute.',
    verifiableURLOrDoc: 'Malawi Parliament Act No. 19 of 2016 (MalawiLII Official Statutory Archive)',
    directUrl: 'https://malawilii.org/akn/mw/act/2016/19/eng@2016-09-01'
  },
  {
    id: 'cit-egw-cl',
    category: 'Inspired Counsel & Scripture',
    title: 'Ellen G. White Estate Complete Published Writings & Archival Manuscripts',
    institution: 'Ellen G. White Estate, Inc. (Silver Spring, Maryland, USA)',
    description: 'Primary source texts including Country Living (1946), The Ministry of Healing (1905), Education (1903), Testimonies for the Church (Vols. 1–9), and Selected Messages.',
    verifiableURLOrDoc: 'Official EGW Writings Digital Archive (m.egwwritings.org)',
    directUrl: 'https://m.egwwritings.org/en/folders/2'
  }
];

export const PRACTICAL_GUIDES: Guide[] = [
  {
    id: 'where-1',
    title: 'Soil & Water Evaluation',
    category: 'Where',
    icon: 'Droplets',
    content: 'Verify year-round gravity spring flow in October (peak dry season), check basement aquifer depths (15–45m), and perform a 48-hour mason jar sedimentation test to measure sand/silt/clay fractions.'
  },
  {
    id: 'what-1',
    title: 'Essential Hand Tools',
    category: 'What',
    icon: 'Hammer',
    content: 'A forged 5-tine broadfork, heavy Malawian hoe (khasu), A-frame contour level, indirect solar dehydrator, and manual grain mill are the foundations of small-scale country independence.'
  },
  {
    id: 'how-1',
    title: 'Beginning the Garden',
    category: 'How',
    icon: 'Sprout',
    content: 'Establish permanent no-till beds covered with 15cm of dry grass mulch, excavate 90cm deep Ellen G. White tree pits with bottom stone drainage, and intercrop heirloom grains with nitrogen-fixing legumes.'
  }
];
