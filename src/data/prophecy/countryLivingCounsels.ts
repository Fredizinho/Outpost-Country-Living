export interface DiagnosticFocusRow {
  dimension: string;
  physicalFocus: string;
  propheticFocus: string;
  balancedIdeal: string;
}

export interface CityHazard {
  number: number;
  hazard: string;
  chichewaTitle: string;
  counselSummary: string;
  egwCitation: string;
}

export interface OutpostPrinciple {
  title: string;
  chichewaTitle: string;
  description: string;
  application: string;
}

export const DUAL_READINESS_ROWS: DiagnosticFocusRow[] = [
  {
    dimension: 'Primary Emphasis',
    physicalFocus: 'Geographical relocation, health preservation, establishing rural homesteads, and agricultural independence.',
    propheticFocus: 'Systematic study of apocalyptic sequences, prophetic waymarks in Daniel and Revelation, and signs of the times.',
    balancedIdeal: 'Synchronizes physical preparation with spiritual vigilance: rural outposts foster character and enable mission.',
  },
  {
    dimension: 'Vulnerability when Isolated',
    physicalFocus: 'Risk of fanaticism, legalistic self-preservation, reliance on geography over Christ, and premature panic.',
    propheticFocus: 'Spiritual complacency, theoretical intellectualism, exposure to urban crisis triggers, and lack of practical survival skills.',
    balancedIdeal: 'Guards against both panic-driven survivalism and unready complacency. Anchors faith in Christ.',
  },
  {
    dimension: 'Role in Final Crisis',
    physicalFocus: 'Provides clean food, pure water, and shelter away from industrial strikes and food supply shutdowns.',
    propheticFocus: 'Provides discernment to recognize prophetic signals, withstand master deceptions, and know when to act.',
    balancedIdeal: 'Serves as a sanctuary for spiritual growth and an operational base for medical missionary work in nearby towns.',
  },
];

export const CITY_HAZARDS: CityHazard[] = [
  {
    number: 1,
    hazard: 'Moral Contamination & Environmental Hazards',
    chichewaTitle: 'Kuonongeka kwa Makhalidwe ndi Matenda',
    counselSummary:
      'Cities function as breeding grounds for vice, where lawlessness is normalized and physical health is undermined by pollution and density.',
    egwCitation: 'Testimonies for the Church, vol. 9, p. 11',
  },
  {
    number: 2,
    hazard: 'Trade Unions & Economic Coercion',
    chichewaTitle: 'Migwirizano ya Ntchito ndi Zovuta Zachuma',
    counselSummary:
      'Consolidated labor unions and industrial trusts demand moral compromises, making it nearly impossible for Sabbath-keepers to maintain jobs or business without surrendering integrity.',
    egwCitation: 'Selected Messages, vol. 2, pp. 141–142',
  },
  {
    number: 3,
    hazard: 'Religious Coercion & Civil Legislation',
    chichewaTitle: 'Kukakamiza Kupembedza ndi Malamulo a Boma',
    counselSummary:
      'Urban municipalities serve as initial proving grounds for enforcing Sunday rest laws and restricting biblical freedom of conscience.',
    egwCitation: 'The Great Controversy, p. 594',
  },
  {
    number: 4,
    hazard: 'Divine Judgments in Quick Succession',
    chichewaTitle: 'Chiweruzo cha Mulungu M’matauni',
    counselSummary:
      'As evil consolidates, divine judgments in fire, flood, earthquake, and war will strike major cities in rapid succession.',
    egwCitation: 'Prophets and Kings, p. 278; 9T 11.1',
  },
];

export const OUTPOST_PRINCIPLES: OutpostPrinciple[] = [
  {
    title: 'Establishment of Rural Bases',
    chichewaTitle: 'Kukhazikitsa Malo Akunja kwa Matauni',
    description:
      'Believers and institutions establish homes, vegetable gardens, schools, and small treatment rooms in peaceful rural areas.',
    application: 'Acquire agricultural land with reliable water in highland or rural districts (e.g. Dedza, Ntcheu, Viphya).',
  },
  {
    title: 'Operational Evangelism Strategy',
    chichewaTitle: 'Njira Yogwirira Ntchito M’matauni Kuchokera Kumudzi',
    description:
      'From rural bases, gospel workers enter cities to conduct health clinics, distribute literature, and minister, then return to their country homes.',
    application: 'Keep the family in a pure country environment while maintaining active, targeted ministry to urban centers.',
  },
  {
    title: 'Avoidance of Panic & Rash Moves',
    chichewaTitle: 'Kupewa Mantha ndi Kuthamanga Mosalingalira',
    description:
      'Moves must never be conducted under sudden alarm or sensational agitation, which causes financial hardship and brings reproach upon the faith.',
    application: 'Plan deliberately with seasoned counsel, debt elimination, and clear divine providence before relocating.',
  },
  {
    title: 'No Borrowing Trouble Beforehand',
    chichewaTitle: 'Kusalowetsa Nkhawa za Mawa M’moyo Walero',
    description:
      'God gives grace for present duties, not for imagined future trials. Focusing on future horrors distracts from daily character refinement.',
    application: 'Faithfully fulfill today’s family, work, and community responsibilities while calmly preparing practical reserves.',
  },
];
