export interface CalculationRow {
  marker: string;
  propheticCalculation: string;
  fulfillment: string;
}

export interface FeastRow {
  group: 'Spring' | 'Fall';
  convocations: string;
  historicalMeaning: string;
  propheticFulfillment: string;
}

export interface SealVsMarkRow {
  characteristic: string;
  sealOfGod: string;
  markOfTheBeast: string;
}

export interface PropheticStage {
  id: string;
  stageNumber: string;
  title: string;
  chichewaTitle: string;
  subtitle: string;
  timeframe: string;
  summary: string;
  scriptureRef: string;
  theologicalBasis: string;
  calculations?: CalculationRow[];
  healthStudies?: {
    name: string;
    finding: string;
    significance: string;
  }[];
  feasts?: FeastRow[];
  sealComparison?: SealVsMarkRow[];
  keyAttributes?: string[];
  fourDivineActs?: string[];
  soWhat: string;
}

export const PROPHETIC_STAGES_DATA: PropheticStage[] = [
  {
    id: 'stage-1',
    stageNumber: '01',
    title: 'The Historical & Prophetic Anchor',
    chichewaTitle: 'Maziko a Mbiri ndi Maulosi (457 BC – 1844 AD)',
    subtitle: 'From the Persian Decree to the Heavenly Sanctuary Cleansing',
    timeframe: '457 BC – October 22, 1844 AD',
    summary:
      'God anchored end-time prophecy in an unbroken mathematical timeline. Using the biblical day-for-a-year principle, Daniel 8 and 9 link the restoration of Jerusalem to the baptism, death of Christ, and the celestial Day of Atonement in 1844.',
    scriptureRef: 'Daniel 8:14; Daniel 9:24–27; Numbers 14:34; Ezekiel 4:6; Ezra 7',
    theologicalBasis:
      'The Hebrew verb chathak in Daniel 9:24 means severed or cut off. The 70 weeks (490 years) were cut off from the larger 2,300-year vision specifically for the Jewish nation. From 457 BC, the timeline unfolds with mathematical certainty, culminating on October 22, 1844, when Christ entered the Most Holy Place to begin the Investigative Judgment.',
    calculations: [
      {
        marker: '457 BC',
        propheticCalculation: 'Start of 2,300 years & 70 weeks (490 years)',
        fulfillment: 'Decree of Artaxerxes I Longimanus to rebuild Jerusalem (Ezra 7).',
      },
      {
        marker: '27 AD',
        propheticCalculation: '69 weeks = 483 years (457 BC to 27 AD)',
        fulfillment: 'Baptism of Jesus Christ. Anointed by the Holy Spirit as Messiah the Prince (Luke 3:21–22).',
      },
      {
        marker: '31 AD',
        propheticCalculation: 'Middle of 70th week (3.5 years after 27 AD)',
        fulfillment: 'Crucifixion of Christ. His sacrifice causes the earthly offerings to cease (Daniel 9:27).',
      },
      {
        marker: '34 AD',
        propheticCalculation: 'End of 70 weeks / 490 years (3.5 years after 31 AD)',
        fulfillment: 'Stoning of Stephen. The gospel formally transitions to the Gentile world (Acts 7:58).',
      },
      {
        marker: '1844 AD',
        propheticCalculation: 'Termination of remaining 1,810 years (2300 - 490 = 1810)',
        fulfillment: 'Christ enters the Most Holy Place in heaven to begin the Investigative Judgment on Yom Kippur.',
      },
    ],
    soWhat:
      'Understanding this anchor proves that the Advent movement arose at God’s appointed hour. It refutes dispensational futurism, which breaks off the 70th week. Human history is moving toward a divine finish.',
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    title: 'The Present Era: Investigative Judgment & Personal Reform',
    chichewaTitle: 'Chiweruzo cha Akufa ndi Kudzikonza kwa Moyo',
    subtitle: 'Prefrontal Cortex Biology, Health Stewardship & Holy Gatherings',
    timeframe: '1844 to the National Sunday Law Crisis',
    summary:
      'Christ is reviewing the records of professed believers who have died. Because judgment is active in heaven, believers must practice bodily health and media fasting so the Holy Spirit can communicate clearly through the mind.',
    scriptureRef: 'Leviticus 23; Daniel 1; 1 Corinthians 6:19–20; Revelation 14:7',
    theologicalBasis:
      'The physical body is the temple of the Holy Spirit. The prefrontal cortex of the brain is the sole medium of moral discernment. Diets loaded with heavy meat, refined sugar, and synthetic additives cause gut fermentation. This clouds the mind. Two daily meals with an 18-hour intermittent fast preserve peak mental clarity for prayer.',
    healthStudies: [
      {
        name: 'Washington Prison Diet Study (Dr. Alexander)',
        finding: '47% of 242 inmates had severe iron deficiency, impairing brain oxygenation.',
        significance: 'Adding Vitamin C rich juice and cutting sugar reduced disciplinary infractions and violence.',
      },
      {
        name: 'Sibling Trace-Element Research (Dr. Robert Land)',
        finding: 'Mineral imbalances differentiated 96 violent males from their 96 non-violent siblings.',
        significance: 'Proves trace mineral deficiencies directly affect emotional and neurological stability.',
      },
      {
        name: 'Generational Processed Feed Study (900 Animals)',
        finding: 'Animals on processed diets suffered severe bone softening and aggression by generation two.',
        significance: 'Demonstrates that natural unrefined food protects the nervous system across generations.',
      },
    ],
    feasts: [
      {
        group: 'Spring',
        convocations: 'Passover, Unleavened Bread, Firstfruits, Pentecost',
        historicalMeaning: 'Exodus deliverance from Egypt and spring harvest blessing.',
        propheticFulfillment: 'Christ’s crucifixion as the Lamb of God, resurrection, and Holy Spirit outpouring.',
      },
      {
        group: 'Fall',
        convocations: 'Trumpets, Day of Atonement (Yom Kippur), Tabernacles',
        historicalMeaning: 'Sacred assembly, sanctuary cleansing, and harvest rest.',
        propheticFulfillment: 'Investigative Judgment since 1844, character sealing, and eternal rest in God.',
      },
    ],
    soWhat:
      'Health reform and media fasting are not legalism. They are physical shields for character development. Indulgence weakens the brain. We cannot stand in the coming crisis if our physical mind is dulled.',
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    title: 'Global Catalysts: Ecumenism & Sunday Legislation',
    chichewaTitle: 'Mgwirizano wa Zipembedzo ndi Lamulo la Lamulungu',
    subtitle: 'Healing the Deadly Wound and Framing Sabbath-Keepers as Extremists',
    timeframe: 'Accelerating Today',
    summary:
      'Geopolitical turmoil and moral decay are driving religious bodies into ecumenical alliances under Rome. Historical protests are discarded. In this climate, Sunday observance will be legally enforced, framing commandment-keepers as threats to national unity.',
    scriptureRef: 'Revelation 13:3, 11–17; Revelation 17:12–13; Daniel 11:40–45',
    theologicalBasis:
      'The deadly wound of Revelation 13:3 is healing through ecumenical treaties (such as the 1999 Joint Declaration and the 2016 Reformation commemorations). As religious federations consolidate, faithful Sabbath observance will be labeled as anti-social extremism, as already seen in regional labor and court disputes in East Africa.',
    keyAttributes: [
      '1999 Joint Declaration on Justification signed in Augsburg, neutralizing the core Protestant protest.',
      'Papal interfaith assemblies gathering global religious leaders under shared social agendas.',
      '2015 Vatican reconciliation visits to Waldensians seeking historical pardon to silence ongoing protest.',
      '2016–2017 Lund commemorations declaring what unites is greater than what divides.',
      'Media framing in Zimbabwe and Kenya labeling Sabbath-keepers as economic and civic extremists.',
      'National Sunday Laws enacted as an emergency remedy for economic, social, and moral decay.',
    ],
    soWhat:
      'There is no neutral ground. The shift from religious freedom to state force will be swift. Believers must prepare their rural outposts before civil laws restrict employment and trade.',
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    title: 'The Transition: Judgment of the Living & The Sealing',
    chichewaTitle: 'Chiweruzo cha Anthu Amoyo ndi Chidindo cha Mulungu',
    subtitle: 'The 144,000 Remnant Tested under Sunday Legislation',
    timeframe: 'From Sunday Law to the Close of Probation',
    summary:
      'When civil laws mandate Sunday worship, Christ shifts His judicial review to the living (Chiweruzo cha Anthu Amoyo). Every person makes a final decision. The faithful receive God’s seal, while compromisers receive the mark of the beast.',
    scriptureRef: 'Ezekiel 9:4; Revelation 7:1–4; Revelation 14:1–5, 9–12',
    theologicalBasis:
      'The crisis forces every soul to choose between God’s Sabbath and human tradition. As cases are decided in heaven, the sins of the faithful are blotted out forever. They reflect the lovely image of Jesus without compromise.',
    sealComparison: [
      {
        characteristic: 'Anatomical Placement',
        sealOfGod: 'Forehead ONLY (conscious faith, moral conviction, and love for God).',
        markOfTheBeast: 'Forehead OR Hand (intellectual belief or mere economic compliance).',
      },
      {
        characteristic: 'Spiritual Meaning',
        sealOfGod: 'Complete allegiance to God’s holy law and total victory over sin.',
        markOfTheBeast: 'Submission to state and papal decrees for temporal comfort and safety.',
      },
      {
        characteristic: 'Visible Test',
        sealOfGod: 'Observance of the Seventh-day Sabbath as God’s memorial of creation.',
        markOfTheBeast: 'Enforced rest on Sunday, the human rival sabbath of tradition.',
      },
      {
        characteristic: 'Biblical Reference',
        sealOfGod: 'Ezekiel 9 mark placed on those who mourn over sin in the land.',
        markOfTheBeast: 'Coercive civil legislation of Revelation 13 and 14.',
      },
    ],
    keyAttributes: [
      'Sinless Overcomers: through grace, they overcome inherited and cultivated sinful habits.',
      'Faultless Before God: no deceit, guile, or compromise is found in their mouths.',
      'Reflect Christ Fully: purified characters reflecting the righteousness of Jesus.',
      'Firstfruits of the Living: redeemed from the earth as loyal witnesses.',
    ],
    soWhat:
      'Character cannot be formed in a moment of panic. Daily victories over appetite, screen time, and pride prepare us to receive the seal of God.',
  },
  {
    id: 'stage-5',
    stageNumber: '05',
    title: 'Close of Probation & The Day of Protection',
    chichewaTitle: 'Kutsekedwa kwa Chisomo & Chosala Mtsiku Lachitetezero',
    subtitle: 'Michael Stands Up, the Plagues Fall, and the Remnant are Sheltered',
    timeframe: 'From Close of Probation to the Deliverance at Midnight',
    summary:
      'Jesus finishes His high-priestly intercession in heaven. Revelation 22:11 is spoken. The Seven Last Plagues fall on the unrepentant, but God supernaturally shields His sealed people during this remaining day of divine protection.',
    scriptureRef: 'Daniel 12:1; Isaiah 33:16; Revelation 16; Revelation 22:11',
    theologicalBasis:
      'When Michael stands up, human mediation ends. The unsealed world is given over to unrestrained wrath and plagues. Believers flee to solitary mountains and country shelters under a death decree. Because their sins were blotted out during probation, Satan finds no foothold. Angels guard them, and their bread and water are guaranteed.',
    keyAttributes: [
      'Michael Stands Up: Jesus trades priestly vestments for royal robes of majesty.',
      'Universal Decree: "He that is unjust, let him be unjust still... he that is holy, let him be holy still."',
      'Seven Last Plagues: divine judgments fall without mixture on those with the mark of the beast.',
      'Chosala Mtsiku Lachitetezero: the remaining day of divine shelter and miraculous food for the sealed remnant.',
      'Jacob’s Time of Trouble: mental agony over past sins, ending in complete victory of faith.',
    ],
    soWhat:
      'Do not delay repentance until the plagues fall. When probation closes, character remains fixed forever. We must seek heart cleansing today.',
  },
  {
    id: 'stage-6',
    stageNumber: '06',
    title: 'The Second Coming of Jesus Christ',
    chichewaTitle: 'Kubwera Kwachiwiri kwa Ambuye Yesu Khristu',
    subtitle: 'Literal Deliverance, Bodily Resurrection, Translation & New Earth',
    timeframe: 'The Final Climax of Human History',
    summary:
      'Jesus returns visibly and audibly with all holy angels. The voice of God delivers His people at midnight. The righteous dead are raised, the living saints are translated, the wicked are consumed, and the thousand years begin.',
    scriptureRef: 'Matthew 24:30–31; 1 Thessalonians 4:16–17; Revelation 1:7; Revelation 19:11–16',
    theologicalBasis:
      'The advent is not secret or spiritualized. Every eye will see Him. Christ descends with an earth-shaking shout and the trump of God. The redeemed ascend together to the sea of glass, beginning the millennial review before inheriting the New Earth.',
    fourDivineActs: [
      '1. Deliverance: God’s voice speaks at midnight, breaking the death decree and rescuing His saints.',
      '2. First Resurrection: faithful dead from Abel onward rise in glorified, immortal bodies.',
      '3. Translation: living righteous are transformed in a moment and caught up to meet the Lord in the air.',
      '4. Divine Judgment: the brightness of Christ’s presence consumes the unrepentant, leaving the earth desolate.',
    ],
    soWhat:
      'The prophetic timeline from 457 BC to the Second Coming proves God’s Word is sure. Final events will be rapid. The divine call is simple: Prepare to Stand.',
  },
];
