export interface EightLawDetail {
  id: string;
  number: string;
  name: string;
  biblicalTitle: string;
  scriptureRef: string;
  scriptureText: string;
  propheticQuote: string;
  propheticSource: string;
  scientificMechanism: string;
  neuroNutritionalImpact: string;
  practicalGuidelines: string[];
  malawiContext: string;
  dailyHabitLabel: string;
}

export const SPIRITUAL_FOUNDATION = {
  sanctuaryConnection: {
    title: 'The 1844 Sanctuary cleansing and the human body-temple',
    subtitle: 'October 1844 Investigative Judgment & character purification',
    summary:
      'Physical health reform is an indispensable preparation for standing blameless in the presence of a holy God during the Investigative Judgment which commenced in October 1844. Cleansing the physical body of defiling habits aligns the earthly sanctuary of the believer’s body with the ongoing purification of the heavenly sanctuary above.',
    scriptures: [
      {
        ref: '1 Corinthians 3:16–17',
        text: 'Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you? If any man defile the temple of God, him shall God destroy; for the temple of God is holy, which temple ye are.'
      },
      {
        ref: '1 Corinthians 6:19–20',
        text: 'What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God’s.'
      }
    ],
    frontalLobeBiology:
      'The physiological-spiritual connection centers upon the frontal lobe of the human brain. The nervous system, specifically the delicate grey matter of the cerebral cortex, is the only medium through which the Holy Spirit communicates with humanity and through which Christian character is constructed. Physical habits that induce gastrointestinal fermentation, vascular congestion, or neuro-chemical irritation dull these fine brain centers. When the delicate nerve pathways are impaired, spiritual susceptibility is deadened, rendering the individual incapable of discerning deep biblical truth or resisting subtle temptation.'
  }
};

export const EIGHT_LAWS_COMPREHENSIVE: EightLawDetail[] = [
  {
    id: 'water',
    number: '01',
    name: 'Pure water & internal hydration',
    biblicalTitle: 'Living waters & micro-vascular perfusion',
    scriptureRef: 'Isaiah 12:3 / John 4:14',
    scriptureText: 'Therefore with joy shall ye draw water out of the wells of salvation.',
    propheticQuote: 'In health and in sickness, pure water is one of Heaven’s choicest blessings. Its proper use promotes health. It is the beverage which God provided to quench the thirst of animals and man.',
    propheticSource: 'The Ministry of Healing, p. 237',
    scientificMechanism:
      'Optimal internal fluid intake is mandatory for cellular clearance, systemic detoxification, and micro-vascular perfusion. Pure water transports oxygen and essential nutrients to tissue matrices while facilitating renal clearance and hepatic waste elimination. Consumed abundantly between meals, it ensures optimal plasma volume, maintains physiological blood viscosity, and prevents metabolic toxin accumulation.',
    neuroNutritionalImpact:
      'Processed drinks, commercial sodas, and caffeinated liquids introduce refined sugars and chemical additives that irritate gastric mucosa, delay gastric emptying, induce hyper-osmolar stress, and tax kidney filtration. External hydrotherapy strategically manipulates hemodynamics, stimulating arterial blood flow to congested internal organs, enhancing lymphatic drainage, and relieving localized inflammation without synthetic drug residues.',
    practicalGuidelines: [
      'Drink 6 to 8 glasses of pure room-temperature water daily, taken at least 30 minutes before or 2 hours after meals.',
      'Avoid drinking cold liquids with meals to prevent chilling the gastric enzymes and halting digestion.',
      'Employ external contrast hydrotherapy (hot fomentations, derivative foot baths) to stimulate autogenous healing rather than masking symptoms with synthetic pharmaceuticals.'
    ],
    malawiContext: 'Filter highland spring or borehole water through biosand and activated hardwood charcoal filters; avoid chlorinated additives where natural aerated gravity water is available.',
    dailyHabitLabel: 'Drink 2.5L pure water between meals & take morning cool contrast wash'
  },
  {
    id: 'nutrition',
    number: '02',
    name: 'Plant-based nutrition & neuro-nutrition',
    biblicalTitle: 'Edenic diet & cerebral micro-vascular health',
    scriptureRef: 'Genesis 1:29 / Daniel 1:12',
    scriptureText: 'Behold, I have given you every herb bearing seed... and every tree yielding seed; to you it shall be for meat.',
    propheticQuote: 'Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing.',
    propheticSource: 'The Ministry of Healing, p. 296',
    scientificMechanism:
      'God’s ideal regimen is 100% plant-based: fruits, vegetables, whole grains, nuts, seeds, and legumes. After the global Flood, when animal flesh was temporarily permitted, human lifespan experienced a catastrophic collapse from nearly 1,000 years to ~120 years. Animal products contain dense saturated fats, dietary cholesterol, endotoxins, and bio-accumulated environmental contaminants that overburden cardiovascular and nervous systems.',
    neuroNutritionalImpact:
      'Saturated animal fats foster atheromatous plaques within microscopic cerebral capillaries. Long before a major clinical stroke, clogged micro-vessels induce silent localized micro-strokes across the cerebral cortex, depriving delicate neuronal networks of oxygen, causing insidious cognitive decline, loss of emotional equilibrium, and weakening frontal lobe moral discernment.',
    practicalGuidelines: [
      'Combine non-heme plant iron (dark leafy greens, legumes, whole grains) with ascorbic acid (Vitamin C, fresh citrus, papaya) in the intestinal lumen to dramatically multiply iron bio-absorption efficiency and prevent cerebral hypoxia.',
      'Avoid heat-processed, denatured, and devitalized foods. Dr. Francis Pottenger’s multi-generational studies proved that heat-denatured diets induce progressive biological degeneration, skeletal softening, craniofacial malformations, neurological irritability, and reproductive failure by the 2nd and 3rd generations.',
      'Maintain complete plant diversity: pair mgaiwa (whole maize), nandolo (pigeon peas), groundnuts, avocados, and seasonal green vegetables.'
    ],
    malawiContext: 'Cultivate traditional heritage crops: finger millet (mawere), sorghum, pigeon peas, cowpeas, and indigenous greens (mpiru, bonongwe, chisoso) without synthetic fertilizers.',
    dailyHabitLabel: 'Consume whole unadulterated plant meals with Vitamin C iron-pairing'
  },
  {
    id: 'temperance',
    number: '03',
    name: 'Temperance & total abstinence',
    biblicalTitle: 'The double-edged principle of health reform',
    scriptureRef: '1 Corinthians 9:25 / Proverbs 23:1–3',
    scriptureText: 'And every man that striveth for the mastery is temperate in all things.',
    propheticQuote: 'True temperance teaches us to dispense entirely with everything hurtful and to use judiciously that which is healthful.',
    propheticSource: 'Patriarchs and Prophets, p. 562',
    scientificMechanism:
      'True temperance is double-edged: complete, uncompromising rejection of every biologically or spiritually harmful substance and practice, combined with judicious, well-balanced use of that which is inherently good. There is zero room for moderate indulgence in toxic compounds.',
    neuroNutritionalImpact:
      'Strict total abstinence must be maintained against animal flesh, animal fats, refined processed sugars, black tea, coffee, alcohol, tobacco, irritating spices, and chemical food additives like sodium benzoate and solvent-extracted emulsifiers (E322). Refined sugar ferments rapidly in the warm stomach, generating toxic alcohol-like byproducts, organic acids, and gas that irritate the gastric mucosa, trigger systemic inflammation, and cloud frontal lobe moral judgment.',
    practicalGuidelines: [
      'Eliminate all commercial sodas, energy drinks, and confectioneries containing refined cane sugar or high-fructose corn syrup.',
      'Discontinue coffee, black tea, and green tea; substitute with pure water and herbal infusions (lemongrass, peppermint, hibiscus).',
      'Discard pungent spices (black pepper, mustard, vinegar, chili) that inflame the stomach lining and overstimulate the nervous system.'
    ],
    malawiContext: 'Reject processed commercial flavor blocks, refined white sugar, and commercial alcohol; sweeten whole-grain porridges with pure banana puree or sun-dried raisins.',
    dailyHabitLabel: 'Practice complete abstinence from refined sugar, stimulants, and flesh'
  },
  {
    id: 'rest',
    number: '04',
    name: 'Rest & the two-meal digestive regimen',
    biblicalTitle: 'Cellular autophagy & fixed physiological rhythms',
    scriptureRef: 'Mark 6:31 / Exodus 20:8–11',
    scriptureText: 'Come ye yourselves apart into a desert place, and rest a while.',
    propheticQuote: 'In most cases two meals a day are preferable to three. Supper, when taken at an early hour, interferes with the digestion of the previous meal. When taken later, it is not digested before bedtime.',
    propheticSource: 'Counsels on Diet and Foods, p. 173',
    scientificMechanism:
      'The human digestive tract requires structured periods of activity and complete physiological rest. Implementing a strict two-meal-a-day schedule provides maximum therapeutic benefit: a substantial, nutrient-dense breakfast at 8:00 AM and a second wholesome meal 6 hours later at 2:00 PM. All late-night suppers, evening eating, and constant grazing between meals are eliminated.',
    neuroNutritionalImpact:
      'Ending the second meal by 2:00 PM creates an ~18-hour continuous digestive fasting window until the next morning. This triggers cellular autophagy—the Nobel Prize-verified mechanism by which cells dismantle and recycle damaged proteins, organelles, and intracellular pathogens. In the brain, digestive rest eliminates nocturnal gastric fermentation, clears morning brain fog, and sharpens moral discernment, as modeled by Elijah and Daniel.',
    practicalGuidelines: [
      'Take breakfast at 8:00 AM with wholesome whole grains, fruits, and plant proteins.',
      'Take dinner at 2:00 PM with cooked legumes, root crops, vegetables, and seeds.',
      'Allow zero food, snacks, or caloric drinks between meals or in the evening; drink only pure water.',
      'Sleep 7 to 8 hours in complete darkness, retiring before 9:30 PM to optimize melatonin production and glymphatic clearance.'
    ],
    malawiContext: 'Coordinate the homestead labor schedule so the heaviest outdoor agricultural tasks occur in the cool morning after breakfast, concluding field work before the 2:00 PM family meal.',
    dailyHabitLabel: 'Maintain two substantial meals with ~18-hour overnight digestive rest'
  },
  {
    id: 'exercise',
    number: '05',
    name: 'Exercise & outdoor physical activity',
    biblicalTitle: 'Purposeful agricultural labor & vascular equalization',
    scriptureRef: 'Genesis 2:15 / Ecclesiastes 5:12',
    scriptureText: 'The sleep of a labouring man is sweet, whether he eat little or much.',
    propheticQuote: 'Action is a law of our being. Every organ of the body has its appointed work, upon the performance of which its development and strength depend.',
    propheticSource: 'The Ministry of Healing, p. 237',
    scientificMechanism:
      'Sedentary indoor living drives muscular atrophy, venous stasis, metabolic dysfunction, and nervous exhaustion. Regular, systematic physical labor in the open air—specifically agricultural gardening and outdoor manual trades—engages the entire musculoskeletal framework in harmonious exercise.',
    neuroNutritionalImpact:
      'Vigorous physical exercise drives arterial blood from congested internal viscera out to the peripheral extremities and skeletal muscles. It increases cardiac output, expands pulmonary tidal volume, enhances systemic tissue oxygenation, and accelerates lymphatic drainage. Outdoor exercise relieves accumulated nervous tension, reduces circulating cortisol, and infuses the brain with oxygen-dense blood.',
    practicalGuidelines: [
      'Engage in 60 to 90 minutes of daily purposeful outdoor agricultural work (contour ridging, digging 3×3×3ft pits, wheelbarrowing compost).',
      'Walk briskly in the fresh air after meals rather than sitting or lying down, promoting gentle digestive peristalsis.',
      'Balance intellectual and mental study with physical manual labor to prevent brain congestion and nervous debility.'
    ],
    malawiContext: 'Utilize hand hoeing, planting pit excavation, and masonry block making on the rural homestead as primary cardiovascular health preservation.',
    dailyHabitLabel: '60+ minutes of vigorous outdoor gardening or constructive physical labor'
  },
  {
    id: 'air',
    number: '06',
    name: 'Fresh air & pulmonary oxygenation',
    biblicalTitle: 'Cellular respiration & nervous system calm',
    scriptureRef: 'Genesis 2:7 / Job 33:4',
    scriptureText: 'The spirit of God hath made me, and the breath of the Almighty hath given me life.',
    propheticQuote: 'In order to have good blood, we must breathe well. Full, deep inspirations of pure air, which fill the lungs with oxygen, purify the blood.',
    propheticSource: 'The Ministry of Healing, p. 272',
    scientificMechanism:
      'The continuous inhalation of pure, unpolluted outdoor air is essential for cellular respiration. Deep pulmonary oxygenation purifies the venous bloodstream as it passes through pulmonary capillaries, exchanging accumulated carbon dioxide for fresh oxygen, revitalizing organ tissues and brain cells.',
    neuroNutritionalImpact:
      'Exposure to clean outdoor air exerts a direct calming influence upon the central nervous system, soothing irritated autonomic nerve centers, reducing anxiety, and dispelling mental fatigue. Enclosed, poorly ventilated indoor environments accumulate carbon dioxide, volatile organic compounds (VOCs), and microbial pathogens, leading to cerebral hypoxia, morning headaches, and compromised immunity.',
    practicalGuidelines: [
      'Sleep with open windows or high cross-ventilating louvers year-round to ensure continuous air exchange.',
      'Practice deep diaphragmatic breathing outdoors before beginning daily tasks.',
      'Relocate dwellings away from stagnant valley bottoms and urban pollution nodes onto well-ventilated hills and ridges.'
    ],
    malawiContext: 'Build homestead cottages with high ceiling roof ventilators and wide veranda eaves that allow continuous fresh air cross-ventilation even during heavy tropical rains.',
    dailyHabitLabel: 'Maintain cross-ventilated sleeping rooms & practice deep outdoor breathing'
  },
  {
    id: 'sunlight',
    number: '07',
    name: 'Sunlight & biological vitality',
    biblicalTitle: 'Cutaneous Vitamin D3 synthesis & immune activation',
    scriptureRef: 'Malachi 4:2 / Ecclesiastes 11:7',
    scriptureText: 'Truly the light is sweet, and a pleasant thing it is for the eyes to behold the sun.',
    propheticQuote: 'If you would have your homes sweet and inviting, make them bright with air and sunshine. Remove your heavy curtains, open the windows, throw back the blinds, and enjoy the rich sunlight.',
    propheticSource: 'The Ministry of Healing, p. 274',
    scientificMechanism:
      'Direct exposure to natural solar radiation is a foundational biological requirement. Solar ultraviolet B (UVB) light interacts with 7-dehydrocholesterol in the skin to synthesize Vitamin D3—a master steroid hormone that regulates over 2,000 genes within the human genome.',
    neuroNutritionalImpact:
      'Sunlight enhances cellular immune defenses by activating white blood cells and stimulating endogenous antimicrobial peptides. Sunlight modulates circadian melatonin and serotonin rhythms, elevating mood, optimizing restorative sleep architecture, and enhancing neurological function. Natural sunlight acts as a biological tonic, boosting metabolic efficiency and physical vitality.',
    practicalGuidelines: [
      'Spend 20 to 30 minutes in direct morning sunlight with arms and face exposed.',
      'Air bedding, mattresses, and clothing outdoors weekly to utilize solar germicidal ultraviolet rays.',
      'Design living spaces with east- and north-facing windows to maximize interior natural illumination.'
    ],
    malawiContext: 'Take advantage of Malawi’s abundant year-round solar irradiance, drying food reserves, sanitizing household textiles, and receiving natural morning sun during field work.',
    dailyHabitLabel: 'Receive 30 minutes of natural outdoor sunlight & air bedding'
  },
  {
    id: 'trust',
    number: '08',
    name: 'Trust in divine power',
    biblicalTitle: 'Spiritual apex & psychosomatic restoration',
    scriptureRef: 'Proverbs 3:5–6 / Exodus 15:26',
    scriptureText: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
    propheticQuote: 'Courage, hope, faith, sympathy, love, promote health and prolong life. A contented mind, a cheerful spirit, is health to the body and strength to the soul.',
    propheticSource: 'The Ministry of Healing, p. 241',
    scientificMechanism:
      'Trust in divine power represents the spiritual cornerstone of all health laws. External compliance with physical health principles is powerless to achieve character transformation without living, unwavering faith in God. Human willpower alone is insufficient to conquer perverted appetite; divine power is the essential agent that empowers surrender and self-mastery.',
    neuroNutritionalImpact:
      'Unreserved faith in Jesus Christ and peace of conscience exert a profound physiological influence. Assurance of divine acceptance calms the sympathetic nervous system, lowers circulating catecholamines (adrenaline, noradrenaline), reduces baseline inflammatory cytokines, and relieves chronic psychosomatic stress. Spiritual peace operates in harmony with physiological law, creating an internal cellular environment where biological healing flourishes.',
    practicalGuidelines: [
      'Maintain faithful morning and evening family worship altars, opening the day with prayer and Scripture meditation.',
      'Surrender appetite and anxious worries to Christ daily, relying on His grace rather than human self-sufficiency.',
      'Cultivate an attitude of constant gratitude and praise, which acts as a powerful healing balm to the nervous system.'
    ],
    malawiContext: 'Begin every homestead day with family prayer and Scripture reading at dawn before opening the agricultural tools, trusting God for seasonal rains and protection.',
    dailyHabitLabel: 'Daily morning and evening family altar & surrender of appetite to Christ'
  }
];

export const SCIENTIFIC_EVIDENCE_DATA = {
  schaussSchoenthalerStudies: {
    title: 'Dr. Alexander Schauss & Stephen Schoenthaler behavioral nutrition trials',
    scope: '242 incarcerated juvenile offenders across controlled institutional facilities in the United States.',
    objective: 'Evaluating the neuro-biochemical link between refined commercial diet and institutional violent delinquency.',
    intervention: [
      'Total removal of refined sugars, white flour, and processed commercial snack items.',
      'Elimination of chemical preservatives (sodium benzoate) and solvent-extracted emulsifiers (E322 soya lecithin).',
      'Replacement with fresh whole fruits, raw and cooked vegetables, legumes, whole grains, and pure juices.',
      'Strategic inclusion of citrus juices rich in Vitamin C to maximize non-heme plant iron bio-absorption.'
    ],
    results: [
      '45% to 80% reduction in violent infractions and disciplinary actions across institutions.',
      'Physiological mechanism: Eliminating sugar-induced gastric fermentation stabilized blood glucose, cleared micro-capillary congestion, restored neuro-chemical balance, and enhanced prefrontal cortex impulse control.'
    ]
  },
  robertLandTraceElements: {
    title: 'Dr. Robert Land trace element analysis & neuro-biochemistry',
    scope: 'Clinical examination of 20 trace elements among 96 violent males and their 96 non-violent siblings.',
    findings:
      'Hair and serum micro-elemental analysis identified 9 consistently reliable trace element markers that differentiated violent individuals from their non-violent kin, proving that systemic mineral imbalances directly alter neuro-chemical stability and behavioral self-control.',
    ironDeficiencyMechanism:
      'Trace element deficiencies, particularly iron deficiency, directly impair prefrontal executive reasoning. Iron is an essential cofactor for dopamine and serotonin neurotransmitter synthesis and cerebral oxygen transport. Declining iron levels trigger cellular hypoxia in the prefrontal cortex, manifesting clinically as heightened emotional volatility, chronic brain fog, poor impulse control, and antisocial outbursts.'
  },
  faoEnvironmentalData: {
    title: 'United Nations FAO global environmental & ecological impact metrics',
    source: 'UN Food and Agriculture Organization (FAO) — Tackling Climate Change Through Livestock',
    metrics: [
      {
        label: 'Animal agriculture global greenhouse gas emissions',
        value: '14.5%',
        subtext: '7.1 Gigatonnes CO₂-equivalent annually — surpassing the entire global transportation sector (13.0%)'
      },
      {
        label: 'Carbon footprint per 1 kg of beef produced',
        value: '34.0 kg CO₂-eq',
        subtext: 'Equivalent to driving an average European car 250 kilometers or burning a 100W bulb for 20 continuous days'
      },
      {
        label: 'Agricultural land utilized by livestock',
        value: '> 50%',
        subtext: 'Consumes over half of global arable land and millions of liters of fresh water for minimal caloric return'
      },
      {
        label: 'Global calorie expansion if transitioned to plant-based',
        value: '+50%',
        subtext: 'Shifting human agriculture entirely to plant crops would instantly expand global food calories by 50%, eliminating global hunger'
      }
    ],
    cropYieldPerAcre: [
      { crop: 'Potatoes', yieldLbsPerAcre: 'Up to 79,000 lbs/acre', density: 'High caloric & potassium density' },
      { crop: 'Strawberries', yieldLbsPerAcre: 'Up to 66,000 lbs/acre', density: 'High antioxidant & Vitamin C yield' },
      { crop: 'Peach orchards & vegetables', yieldLbsPerAcre: 'Tens of thousands of lbs/acre', density: 'Sustainable perennial food forest' },
      { crop: 'Beef cattle grazing', yieldLbsPerAcre: '< 150 lbs edible meat/acre', density: 'Extreme resource depletion & water waste' }
    ]
  }
};

export const PRACTICAL_MISSIONARY_WORK = {
  homeHealthStewardship: {
    title: 'Home health stewardship & atmosphere',
    digitalDiscipline:
      'Establishing a sanctified home environment requires unyielding vigilance against modern secular intrusions: television, digital media addiction, intrusive internet screen consumption, and improper secular music. These digital distractions deaden moral sensibilities, alienate affections from God, corrupt imagination, desensitize the frontal lobe to the Holy Spirit, and steal precious probationary time.',
    familyAltar:
      'The morning and evening family worship altar is the primary spiritual anchor of the household. Consistent devotions featuring biblical instruction, sacred hymns, and earnest prayer create a sanctified spiritual atmosphere protecting all household members against worldly corruption.',
    childDevelopmentWindows: [
      {
        ageBand: 'Ages 0 to 7',
        role: 'Primary maternal character-shaping window',
        detail:
          'During the first seven years, the mother operates as the primary mind- and character-shaping influence in the child’s existence. Enforcing simple, unbending habits of temperance, providing abundant outdoor exercise, and feeding the child unadulterated plant nutrition builds robust physical health and solid moral stamina.'
      },
      {
        ageBand: 'Age 12 milestone',
        role: 'Independent moral accountability & executive reasoning',
        detail:
          'At age 12—the exact age Christ visited the temple in Jerusalem and demonstrated independent moral and spiritual understanding—a child’s brain undergoes significant prefrontal executive development. Protecting the child’s neuro-biology during early childhood ensures intellectual and moral readiness to choose unreserved obedience to God.'
      }
    ]
  },
  communityOutreach: {
    title: 'Community health outreach & medical missionary ministry',
    theRightArm:
      'Physical health reform is designed by God to operate as the "right arm" of the gospel ministry. Practical medical missionary work breaks down deep-seated prejudice, alleviates human suffering, restores physical health, and opens the doors of the heart for the reception of present truth.',
    centersOfInfluence: [
      {
        title: 'Simple natural remedy & hydrotherapy clinics',
        action: 'Treating acute respiratory and inflammatory conditions with hot/cold fomentations, charcoal, and herbs.'
      },
      {
        title: 'Plant-based cooking schools',
        action: 'Teaching communities how to prepare appetizing, nutrient-dense, whole-grain meals without animal fats.'
      },
      {
        title: 'Community lifestyle & health seminars',
        action: 'Presenting the eight laws of health, diabetes reversal, and cardiovascular wellness in community halls.'
      },
      {
        title: 'Individualized health counseling & home visits',
        action: 'Visiting the sick in their homes, ministering to their physical needs, and praying with the afflicted.'
      }
    ]
  }
};
