// Indicative Traditional Authority Reference Lines (Customary Malire Overviews)
// NOTE: INDICATIVE / REFERENCE ONLY. These vector lines are approximate educational representations 
// of traditional authority jurisdictions. They are NOT legal cadastral boundaries or land survey demarcations.
// Any actual customary boundary must be physically walked and verified with the Village Headman (Mfumu),
// Traditional Authority (T/A), and the local Customary Land Committee under the Ministry of Lands.

export interface CustomaryBoundaryLine {
  id: string;
  traditionalAuthority: string;
  district: string;
  chiefTitle: string;
  tenureType: 'Customary Land' | 'Customary Estate';
  coordinates: [number, number][]; // [lat, lng] polyline
  description: string;
}

export const MALAWI_CUSTOMARY_BOUNDARIES: CustomaryBoundaryLine[] = [
  // ==========================================
  // DEDZA HIGHLANDS T/A DEMARCATIONS (MALIRE)
  // ==========================================
  {
    id: 'malire-dedza-kaphuka',
    traditionalAuthority: 'T/A Kaphuka',
    district: 'Dedza',
    chiefTitle: 'Senior Chief Kaphuka',
    tenureType: 'Customary Estate',
    description: 'Premier potato and wheat farming catchment on the cool slopes of Dedza Mountain.',
    coordinates: [
      [-14.28, 34.15],
      [-14.32, 34.25],
      [-14.38, 34.32],
      [-14.44, 34.28],
      [-14.42, 34.18]
    ]
  },
  {
    id: 'malire-dedza-tambala',
    traditionalAuthority: 'T/A Tambala',
    district: 'Dedza',
    chiefTitle: 'Senior Chief Tambala',
    tenureType: 'Customary Land',
    description: 'Latosol slopes toward Linthipe River, renowned for organic pulses and dairy.',
    coordinates: [
      [-14.18, 34.22],
      [-14.25, 34.30],
      [-14.30, 34.42],
      [-14.22, 34.48]
    ]
  },
  {
    id: 'malire-dedza-chauma',
    traditionalAuthority: 'T/A Chauma',
    district: 'Dedza',
    chiefTitle: 'Chief Chauma',
    tenureType: 'Customary Land',
    description: 'Eastern escarpment border running towards the Salima lakeshore alluvial plains.',
    coordinates: [
      [-14.35, 34.45],
      [-14.42, 34.52],
      [-14.55, 34.48],
      [-14.60, 34.40]
    ]
  },

  // ==========================================
  // LILONGWE PLAINS T/A DEMARCATIONS (MALIRE)
  // ==========================================
  {
    id: 'malire-ll-malili',
    traditionalAuthority: 'T/A Malili',
    district: 'Lilongwe',
    chiefTitle: 'Senior Chief Malili',
    tenureType: 'Customary Estate',
    description: 'Surrounds Chitedze Research Station; prime red Katondo loam seed multiplication corridor.',
    coordinates: [
      [-13.92, 33.58],
      [-13.95, 33.68],
      [-14.02, 33.72],
      [-14.08, 33.62]
    ]
  },
  {
    id: 'malire-ll-chadza',
    traditionalAuthority: 'T/A Chadza',
    district: 'Lilongwe',
    chiefTitle: 'Chief Chadza',
    tenureType: 'Customary Land',
    description: 'Southern Lilongwe plains bordering Dedza West; extensive commercial soya and maize belts.',
    coordinates: [
      [-14.12, 33.75],
      [-14.18, 33.88],
      [-14.28, 33.82],
      [-14.25, 33.68]
    ]
  },
  {
    id: 'malire-ll-kabudula',
    traditionalAuthority: 'T/A Kabudula',
    district: 'Lilongwe',
    chiefTitle: 'Senior Chief Kabudula',
    tenureType: 'Customary Land',
    description: 'Northern Lilongwe alluvial plains along Bua River drainage basin.',
    coordinates: [
      [-13.72, 33.48],
      [-13.78, 33.60],
      [-13.85, 33.55],
      [-13.88, 33.42]
    ]
  },

  // ==========================================
  // THYOLO & MULANJE T/A DEMARCATIONS (MALIRE)
  // ==========================================
  {
    id: 'malire-thyolo-bvumbwe',
    traditionalAuthority: 'T/A Bvumbwe',
    district: 'Thyolo',
    chiefTitle: 'Chief Bvumbwe',
    tenureType: 'Customary Estate',
    description: 'Mist-belt horticultural benchmark; avocado, macadamia, and coffee nursery custodianship.',
    coordinates: [
      [-15.86, 35.02],
      [-15.92, 35.10],
      [-15.98, 35.08],
      [-15.95, 34.98]
    ]
  },
  {
    id: 'malire-mulanje-mabuka',
    traditionalAuthority: 'T/A Mabuka',
    district: 'Mulanje',
    chiefTitle: 'Senior Chief Mabuka',
    tenureType: 'Customary Land',
    description: 'Lichenya River and tea estate perimeter along the base of Mulanje Massif.',
    coordinates: [
      [-15.98, 35.52],
      [-16.05, 35.58],
      [-16.12, 35.52],
      [-16.08, 35.45]
    ]
  },

  // ==========================================
  // MZIMBA & NORTHERN T/A DEMARCATIONS (MALIRE)
  // ==========================================
  {
    id: 'malire-mzimba-mmbelwa',
    traditionalAuthority: 'Inkosi ya Makosi M’mbelwa',
    district: 'Mzimba',
    chiefTitle: 'Inkosi ya Makosi M’mbelwa V',
    tenureType: 'Customary Land',
    description: 'Central Ngoni kingdom custodianship; expansive livestock pastures and grain acreage.',
    coordinates: [
      [-11.85, 33.55],
      [-11.95, 33.70],
      [-12.10, 33.65],
      [-12.05, 33.48]
    ]
  },

  // ==========================================
  // SALIMA LAKESHORE T/A DEMARCATIONS (MALIRE)
  // ==========================================
  {
    id: 'malire-salima-khombeza',
    traditionalAuthority: 'T/A Khombeza',
    district: 'Salima',
    chiefTitle: 'Chief Khombeza',
    tenureType: 'Customary Land',
    description: 'Lifidzi and Linthipe river irrigation corridor with ultra-shallow aquifer access.',
    coordinates: [
      [-13.62, 34.28],
      [-13.70, 34.38],
      [-13.82, 34.35],
      [-13.78, 34.22]
    ]
  }
];
