import fs from 'fs';
import path from 'path';

// Glossary additions for all acronyms
export function updateGlossary() {
  const glossaryPath = path.resolve(process.cwd(), 'src/data/glossary.ts');
  let content = fs.readFileSync(glossaryPath, 'utf8');

  const additions = `
  CEC: {
    term: 'CEC',
    plainMeaning: 'Cation Exchange Capacity. A measure of how well soil or biochar holds onto plant nutrients like calcium and potassium.',
    chichewa: 'Mphamvu ya Nthaka Yogwira Chakudya',
    chichewaReviewed: false,
    example: 'Adding compost and biochar raises the CEC of sandy soil so fertilizer does not wash away.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  ORS: {
    term: 'ORS',
    plainMeaning: 'Oral Rehydration Salts. A simple drink of clean water, sugar, and salt that prevents dehydration during fever or diarrhea.',
    chichewa: 'Mchere ndi Shuga Wopulumutsa Madzi m’Thupi',
    chichewaReviewed: false,
    example: 'Mix six teaspoons of sugar and half a teaspoon of salt into one liter of clean water for ORS.',
    relatedGuides: ['/skills'],
    category: 'Health & Nutrition',
  },
  PICS: {
    term: 'PICS',
    plainMeaning: 'Purdue Improved Crop Storage bags. Triple-layer plastic bags that keep grain airtight so weevils cannot survive without chemicals.',
    chichewa: 'Matumba a Pulasitiki Osatseguka a PICS',
    chichewaReviewed: false,
    example: 'Store dry maize in PICS bags to protect your harvest from weevils without chemical powder.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  MPPT: {
    term: 'MPPT',
    plainMeaning: 'Maximum Power Point Tracking. A smart solar charger that gets the most electricity out of solar panels on both sunny and cloudy days.',
    chichewa: 'Chowongolera Mphamvu ya Dzuwa ya MPPT',
    chichewaReviewed: false,
    example: 'An MPPT charge controller delivers up to thirty percent more power to your battery bank.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  BMS: {
    term: 'BMS',
    plainMeaning: 'Battery Management System. An electronic circuit that balances solar battery cells and protects them from overcharging.',
    chichewa: 'Choteteza Batire la Magetsi',
    chichewaReviewed: false,
    example: 'A good BMS stops the solar inverter before the lithium battery drops too low.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  TDH: {
    term: 'TDH',
    plainMeaning: 'Total Dynamic Head. The total height and friction resistance that a water pump must push against.',
    chichewa: 'Kukwera Konse kwa Madzi m’Phaipi',
    chichewaReviewed: false,
    example: 'Measure the height difference from well to tank to calculate the pump TDH.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  ASL: {
    term: 'ASL',
    plainMeaning: 'Above Sea Level. The elevation of land measured in meters or feet above the ocean.',
    chichewa: 'Kukwera Pamwamba pa Nyanja Yaikulu',
    chichewaReviewed: false,
    example: 'Dedza sits at 1,600 meters ASL, making nights cool and ideal for Irish potatoes.',
    relatedGuides: ['/where', '/skills'],
    category: 'Land & Legal',
  },
  CSEB: {
    term: 'CSEB',
    plainMeaning: 'Compressed Stabilized Earth Block. A durable building brick made by pressing damp subsoil and a little cement in a manual lever machine.',
    chichewa: 'Njerwa Zomangira Zokanikizidwa ndi Makina',
    chichewaReviewed: false,
    example: 'Build dry walls with CSEB blocks to save trees and keep rooms cool.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  CEB: {
    term: 'CEB',
    plainMeaning: 'Compressed Earth Block. Sun-cured building blocks made from subsoil without firing in a wood-burning kiln.',
    chichewa: 'Njerwa ya Dothi Yoponderezedwa',
    chichewaReviewed: false,
    example: 'CEB bricks cure in the shade under plastic for three weeks.',
    relatedGuides: ['/skills'],
    category: 'Water & Building',
  },
  IMO: {
    term: 'IMO',
    plainMeaning: 'Indigenous Microorganisms. Beneficial native soil bacteria and fungi collected from healthy local forest leaf mold.',
    chichewa: 'Tizilombo Tachilengedwe Tothandiza Nthaka',
    chichewaReviewed: false,
    example: 'Brew forest IMO tea to bring dead tired soil back to life with beneficial microbes.',
    relatedGuides: ['/skills'],
    category: 'Soil & Farming',
  },
  UV: {
    term: 'UV',
    plainMeaning: 'Ultraviolet rays. Invisible sunlight waves that sanitize water, dry fruit, and provide natural vitamin D.',
    chichewa: 'Mawanga a Dzuwa a UV',
    chichewaReviewed: false,
    example: 'Bright UV sunlight kills bacteria on thin-sliced fruit in a solar dryer.',
    relatedGuides: ['/skills'],
    category: 'Health & Nutrition',
  },
`;

  if (!content.includes('CEC: {')) {
    content = content.replace('export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {', 'export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {' + additions);
    fs.writeFileSync(glossaryPath, content, 'utf8');
    console.log("Updated glossary with missing abbreviations.");
  }
}

updateGlossary();
