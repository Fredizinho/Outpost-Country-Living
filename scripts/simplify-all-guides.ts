import fs from 'fs';
import path from 'path';

// Load files
const skillsFile = path.resolve(process.cwd(), 'src/data/skillsAndSeasons.ts');
const protocolsFile = path.resolve(process.cwd(), 'src/data/skillsTechnicalProtocols.ts');
const glossaryFile = path.resolve(process.cwd(), 'src/data/glossary.ts');

console.log("Simplifying guide texts for Grade 7-8 plain language...");
