// Comprehensive Soil Science & Adventist Edenic Agronomy Integration Engine
// Incorporates principles from agronomy textbooks (Brady & Weil's "The Nature and Properties of Soils", FAO Soil Taxonomy)
// alongside Seventh-day Adventist Country Living & Organic Stewardship Principles (Ellen G. White counsel on soil restoration, Edenic farming, & health reform).

export interface SoilScienceTopic {
  id: string;
  title: string;
  category?: 'Soil Chemistry' | 'Soil Biology & Humus' | 'Adventist Edenic Stewardship' | 'Malawian Soil Types' | 'Erosion & Conservation';
  scientificPrinciple: string;
  adventistPrinciple: string;
  practicalAction: string;
  optimalTarget: string;
  citations: string[];
}

export const SOIL_SCIENCE_KNOWLEDGE_BASE: SoilScienceTopic[] = [
  {
    id: 'humus-biology',
    title: 'Soil Organic Matter & Mycorrhizal Fungi (Living Soil)',
    category: 'Soil Biology & Humus',
    scientificPrinciple: 'Humus acts as a biological sponge, increasing Water Holding Capacity (WHC) and Cation Exchange Capacity (CEC). Glomalin produced by arbuscular mycorrhizal fungi glues soil aggregates together, creating friable pore space.',
    adventistPrinciple: 'God created the earth rich in organic life ("out of the ground grew every tree that is pleasant to the sight", Gen 2:9). E.G. White emphasized returning organic waste to the earth to build up living soil rather than relying on stimulant chemical poisons.',
    practicalAction: 'Incorporate thermophilic compost, biochar impregnated with compost tea, and green manures (Velvet bean/Chitedze) to maintain SOM above 3.5%.',
    optimalTarget: 'Soil Organic Matter ≥ 3.5% - 5.0%; Earthworm count > 10 per 30cm spade sample.',
    citations: ['Brady & Weil, The Nature and Properties of Soils (15th Ed.)', 'E.G. White, Ministry of Healing, p. 296', 'FAO Soil Organic Carbon Guidelines']
  },
  {
    id: 'ph-cation-exchange',
    title: 'Soil pH Balancing & Nutrient Availability',
    category: 'Soil Chemistry',
    scientificPrinciple: 'Soil pH determines plant nutrient solubility. At pH 6.0–6.8, primary macro-nutrients (N, P, K) and micro-nutrients (Ca, Mg, B, Zn) reach maximum bio-availability without aluminum toxicity.',
    adventistPrinciple: 'Order, precision, and harmony govern divine natural laws. Balancing soil chemistry without synthetic chemical burn honors the Creator’s design for wholesome food.',
    practicalAction: 'For acidic Malawian red soils (pH < 5.5), apply calcitic or dolomitic agricultural lime at 1.5-2.5 tonnes/ha or crushed hardwood ash; for alkaline soils, add sulfur-rich compost.',
    optimalTarget: 'pH 6.2 – 6.8; Base Saturation > 70%.',
    citations: ['Malawi Agricultural Research Institute (DARTS) Manual', 'Soil Science Society of America (SSSA) Handbook']
  },
  {
    id: 'edenic-polyculture',
    title: 'Edenic Polyculture & Legume Nitrogen Fixation',
    category: 'Adventist Edenic Stewardship',
    scientificPrinciple: 'Rhizobium bacteria in legume root nodules fix atmospheric nitrogen (N2) into plant-available ammonium (NH4+), reducing synthetic fertilizer dependency.',
    adventistPrinciple: 'In Eden, plants grew in symbiotic harmony. Monoculture depletes the earth; polycultures mimic divine creation and ensure household food security.',
    practicalAction: 'Intercrop maize with pigeon peas, groundnuts, or cowpeas. Leave crop residue on fields as protective mulch.',
    optimalTarget: '30-40% legume canopy integration in crop rotations.',
    citations: ['E.G. White, Education, "Study of Agriculture", p. 219', 'IITA Legume Nitrogen Fixation Protocols']
  },
  {
    id: 'katondo-malawi-latosol',
    title: 'FAO HWSD v2.0 Malawian Nitisol, Ferralsol & Fluvisol Profiles',
    category: 'Malawian Soil Types',
    scientificPrinciple: 'Eutric & Humic Nitisols and Rhodic Ferralsols (Katondo red clay loams, pH 5.2–6.4) are deep, well-drained pedons rich in sesquioxides. Valley-bottom Eutric Fluvisols and Gleysols (Dambo wetlands, pH 6.0–7.0) retain fine alluvial silt and high dry-season moisture.',
    adventistPrinciple: 'Discernment of land features allows families to plant fruit trees on well-drained Eutric Nitisols and Rhodic Ferralsols while conserving lowland Dambo Fluvisol fringes for winter garden crops.',
    practicalAction: 'Plant perennial orchards (Avocado, Macadamia, Mango) in 1m³ deep pits on Eutric Nitisol & Ferralsol slopes; build raised bio-intensive beds for greens and onions in moist Eutric Fluvisol valley fringes.',
    optimalTarget: 'Soil depth > 1.5m on Nitisols/Ferralsols; pH 5.8–6.6 buffered with wood ash and compost.',
    citations: ['FAO Harmonized World Soil Database (HWSD v2.0)', 'Malawi Soil Survey Division Bulletin No. 4', 'ICRAF Agroforestry Guide for Southern Africa']
  },
  {
    id: 'erosion-contour-vetiver',
    title: 'Contour Farming & Vetiver Grass Bio-Barriers',
    category: 'Erosion & Conservation',
    scientificPrinciple: 'Vetiver grass (Vetiveria zizanioides) has massive vertical root networks down to 3m that lock slope soil, prevent gully formation, and recharge aquifers.',
    adventistPrinciple: 'Stewardship of the land requires preserving topsoil from washouts. Neglect of the soil is a violation of faithful Christian stewardship.',
    practicalAction: 'Plant dense vetiver hedges along A-frame level contour lines across sloped fields. Construct contour marker ridges (Mitumbira ya mizere / Mikwingwirima) to hold heavy rainy season runoff.',
    optimalTarget: '100% contour barrier protection on slopes exceeding 3%.',
    citations: ['E.G. White, Patriarchs and Prophets, p. 50', 'World Bank Vetiver Network Technical Paper']
  },
  {
    id: 'sabbath-land-rest',
    title: 'Land Rest, Crop Rotation & Cover Cropping',
    category: 'Adventist Edenic Stewardship',
    scientificPrinciple: 'Continuous cropping without rest exhausts soil micronutrients and builds up soil-borne pathogens. Cover crops break pest cycles and restore carbon.',
    adventistPrinciple: 'The Biblical principle of land Sabbath (Leviticus 25:4) teaches that the soil needs periodic rest and rejuvenation through fallow cover crops.',
    practicalAction: 'Rotate field parcels every 3-4 years into deep-rooting cover crops (Sunn hemp, Mucuna/Chitedze) allowed to decompose in situ without heavy tillage.',
    optimalTarget: '1 out of every 4 parcels under nitrogen-restorative green manure fallow.',
    citations: ['Leviticus 25:1-7', 'E.G. White, Mind, Character, and Personality, Vol 2']
  }
];

// Interactive Soil Sample Evaluator Function
export interface SoilSampleInput {
  ph: number;
  organicMatterPct: number;
  soilTexture: string;
  earthwormsPerSpade: number;
  slopePct: number;
  hasLegumesOrCoverCrop: boolean;
  hasVetiverHedges: boolean;
  usesChemicalPoisons: boolean;
}

export interface SoilEvaluationResult {
  fertilityScore: number; // 0 - 100
  edenicGrade: 'Edenic Prime' | 'Stewardship Grade A' | 'Restoration Needed' | 'Depleted Soil';
  phStatus: string;
  phAmendmentRecommendation: string;
  humusStatus: string;
  organicActionPlan: string[];
  adventistStewardshipCounsel: string;
}

export function evaluateSoilSample(input: SoilSampleInput): SoilEvaluationResult {
  let score = 50; // base score

  // 1. pH Evaluation
  let phStatus = '';
  let phRec = '';
  if (input.ph >= 6.0 && input.ph <= 6.8) {
    score += 20;
    phStatus = 'Optimal (pH 6.0 - 6.8) - Maximum Nutrient Bio-availability';
    phRec = 'No mineral lime required. Maintain with organic compost and wood ash.';
  } else if (input.ph >= 5.5 && input.ph < 6.0) {
    score += 10;
    phStatus = 'Slightly Acidic (pH 5.5 - 5.9)';
    phRec = 'Apply 500kg/ha of agricultural dolomitic lime or top-dress with hardwood ash.';
  } else if (input.ph < 5.5) {
    score -= 10;
    phStatus = 'Strongly Acidic (pH < 5.5) - Risk of Aluminum Toxicity & Phosphorus Lockup';
    phRec = 'Apply 1.5 - 2.5 tonnes/ha of agricultural calcitic lime. Incorporate compost tea to buffer acidity.';
  } else {
    score += 5;
    phStatus = 'Alkaline (pH > 7.0)';
    phRec = 'Incorporate organic matter, pine needle mulch, or composted oak leaves to gradually lower pH.';
  }

  // 2. Organic Matter %
  let humusStatus = '';
  if (input.organicMatterPct >= 4.0) {
    score += 20;
    humusStatus = 'Rich Humus (> 4.0%) - Superior Moisture & Microbe Retention';
  } else if (input.organicMatterPct >= 2.5) {
    score += 10;
    humusStatus = 'Moderate Organic Content (2.5% - 3.9%)';
  } else {
    score -= 15;
    humusStatus = 'Deficient Organic Content (< 2.5%) - Poor Soil Aggregation';
  }

  // 3. Earthworm / Soil Life count
  if (input.earthwormsPerSpade >= 8) {
    score += 10;
  } else if (input.earthwormsPerSpade === 0) {
    score -= 10;
  }

  // 4. Slope & Erosion Protection
  if (input.slopePct > 5) {
    if (input.hasVetiverHedges) {
      score += 10;
    } else {
      score -= 15;
    }
  }

  // 5. Chemical usage vs Organic Stewardship
  if (input.usesChemicalPoisons) {
    score -= 15;
  } else {
    score += 10;
  }

  if (input.hasLegumesOrCoverCrop) {
    score += 10;
  }

  // Clamp score
  const finalScore = Math.max(0, Math.min(100, score));

  let edenicGrade: SoilEvaluationResult['edenicGrade'] = 'Restoration Needed';
  if (finalScore >= 85) edenicGrade = 'Edenic Prime';
  else if (finalScore >= 70) edenicGrade = 'Stewardship Grade A';
  else if (finalScore >= 50) edenicGrade = 'Restoration Needed';
  else edenicGrade = 'Depleted Soil';

  // Action plan building
  const actions: string[] = [];
  if (input.organicMatterPct < 3.5) {
    actions.push('Build a 3-chamber thermophilic compost bin using dry maize stalks, green leaves, and poultry manure.');
    actions.push('Apply biochar inoculated with liquid seaweed or cow dung slurry at 5 tonnes/ha to permanently hold carbon.');
  }
  if (!input.hasLegumesOrCoverCrop) {
    actions.push('Plant Chitedze (Velvet bean) or Sunn Hemp cover crops to build natural nitrogen reserves without synthetic fertilizer.');
  }
  if (input.slopePct > 3 && !input.hasVetiverHedges) {
    actions.push('Establish Vetiver grass contour lines spaced every 1.5m vertical fall to stop rainwater runoff.');
  }
  if (input.usesChemicalPoisons) {
    actions.push('Discontinue synthetic weedkillers and systemic pesticides to restore beneficial mycorrhizal fungi in the root zone.');
  }
  if (actions.length === 0) {
    actions.push('Soil is in excellent natural condition! Continue annual crop rotation and fallow rest periods.');
  }

  const adventistCounsel = finalScore >= 75
    ? '"The soil is God’s gift... handled with care and intelligent labor, it will yield rich blessings to those who honor His natural laws." — E.G. White'
    : '"To restore depleted land requires patient, intelligent labor. Work with nature, not against her, bringing back organic life to God’s soil."';

  return {
    fertilityScore: finalScore,
    edenicGrade,
    phStatus,
    phAmendmentRecommendation: phRec,
    humusStatus,
    organicActionPlan: actions,
    adventistStewardshipCounsel: adventistCounsel
  };
}
