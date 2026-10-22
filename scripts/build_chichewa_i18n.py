#!/usr/bin/env python3
import os
import re
import csv
import json

def clean_chichewa_str(s):
    if not s:
        return ''
    s = s.replace('&mp;', '&').replace('&amp;', '&').replace('&quot;', '"')
    s = s.replace("'", "’")
    return s.strip()

def split_primary_and_alts(raw):
    s = clean_chichewa_str(raw)
    paren_contents = re.findall(r'\((.*?)\)', s)
    main_without_parens = re.sub(r'\(.*?\)', '', s).strip()
    
    parts = []
    for token in re.split(r'[/;]', main_without_parens):
        token = token.strip()
        if token:
            parts.append(token)
            
    for paren in paren_contents:
        for token in re.split(r'[/;]', paren):
            token = token.strip()
            if token:
                parts.append(token)
                
    seen = set()
    uniq = []
    for p in parts:
        if p and p not in seen:
            seen.add(p)
            uniq.append(p)
            
    primary = uniq[0] if uniq else s
    alternates = uniq[1:] if len(uniq) > 1 else []
    return primary, alternates

entries = []

# 1. src/data/glossary.ts
with open('src/data/glossary.ts', 'r', encoding='utf-8') as f:
    glossary_code = f.read()

pattern = re.compile(r'(\w+):\s*\{[^\}]*?term:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?plainMeaning:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewa:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in pattern.finditer(glossary_code):
    k = match.group(1)
    term = match.group(2)
    raw_chi = match.group(4)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/data/glossary.ts',
        'key': f'glossary.{k}',
        'english': term,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Outpost Technical Glossary',
        'notes': f'Defined as: {match.group(3)[:80]}...',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 2. src/data/malawiCropsData.ts
with open('src/data/malawiCropsData.ts', 'r', encoding='utf-8') as f:
    crops_code = f.read()

crops_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?englishName:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaName:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in crops_pattern.finditer(crops_code):
    cid = match.group(1)
    ename = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    status = 'flagged_uncertain' if cid == 'macadamia' else 'unreviewed'
    notes = 'Apostrophe repaired from Mtedza wa Mung\\\'ona; flagged for elder verification' if cid == 'macadamia' else (f'Alternates: {", ".join(alts)}' if alts else 'Standard local crop name')
    entries.append({
        'file': 'src/data/malawiCropsData.ts',
        'key': f'crop.{cid}',
        'english': ename,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Malawi Ministry of Agriculture & Extension Services',
        'notes': notes,
        'reviewer': 'Pending local review',
        'status': status
    })

# 3. src/data/malawiRegionalDetailData.ts
with open('src/data/malawiRegionalDetailData.ts', 'r', encoding='utf-8') as f:
    reg_code = f.read()

reg_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?cropName:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaName:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in reg_pattern.finditer(reg_code):
    rid = match.group(1)
    cname = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    reg_zone = 'Northern Region' if rid.startswith('nc-') else ('Central Region' if rid.startswith('cc-') else 'Southern Region')
    entries.append({
        'file': 'src/data/malawiRegionalDetailData.ts',
        'key': f'regional_crop.{rid}',
        'english': cname,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': reg_zone,
        'source': 'District Agricultural Office Surveys',
        'notes': 'Regional crop variety identifier',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 4. src/components/outpost/CustomaryLandChecklist.tsx
with open('src/components/outpost/CustomaryLandChecklist.tsx', 'r', encoding='utf-8') as f:
    cl_code = f.read()

cl_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?title:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaTerm:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in cl_pattern.finditer(cl_code):
    clid = match.group(1)
    title = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/components/outpost/CustomaryLandChecklist.tsx',
        'key': f'land_protocol.{clid}',
        'english': title,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'Central & Southern',
        'source': 'Malawi Customary Land Act (2016) Protocol',
        'notes': 'Customary authority & boundary term',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 5. src/components/outpost/MalawiRidgeAndSeedPlanner.tsx
with open('src/components/outpost/MalawiRidgeAndSeedPlanner.tsx', 'r', encoding='utf-8') as f:
    rsp_code = f.read()

# Extract items with chichewa
rsp_pattern = re.compile(r'name:\s*[\'\"]([^\'\"]+)[\'\"],\s*chichewa:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for idx, match in enumerate(rsp_pattern.finditer(rsp_code)):
    name = match.group(1)
    raw_chi = match.group(2)
    primary, alts = split_primary_and_alts(raw_chi)
    status = 'flagged_uncertain' if 'Chisale' in raw_chi else 'unreviewed'
    notes = 'Entity repaired from Chisale &mp; Udzu waimu; flagged for local botanist check' if 'Chisale' in raw_chi else 'Guild component crop'
    entries.append({
        'file': 'src/components/outpost/MalawiRidgeAndSeedPlanner.tsx',
        'key': f'guild_crop.item_{idx+1}',
        'english': name,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Agroforestry Guild Blueprint',
        'notes': notes,
        'reviewer': 'Pending local review',
        'status': status
    })

# 6. src/components/outpost/EdenicCountryKitchen.tsx
with open('src/components/outpost/EdenicCountryKitchen.tsx', 'r', encoding='utf-8') as f:
    eck_code = f.read()

eck_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?title:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaSubtitle:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in eck_pattern.finditer(eck_code):
    eid = match.group(1)
    title = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/components/outpost/EdenicCountryKitchen.tsx',
        'key': f'recipe.{eid}',
        'english': title,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Edenic Country Kitchen Recipes',
        'notes': 'Traditional healthful food recipe name',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 7. src/components/outpost/MedicalMissionarySanitarium.tsx
with open('src/components/outpost/MedicalMissionarySanitarium.tsx', 'r', encoding='utf-8') as f:
    mms_code = f.read()

mms_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?name:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaName:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in mms_pattern.finditer(mms_code):
    mid = match.group(1)
    name = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/components/outpost/MedicalMissionarySanitarium.tsx',
        'key': f'natural_remedy.{mid}',
        'english': name,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Tropical Sanitarium & Natural Pharmacy Guide',
        'notes': 'Botanical/simple remedy local designation',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 8. src/components/outpost/ChichewaFieldPhrasebook.tsx
with open('src/components/outpost/ChichewaFieldPhrasebook.tsx', 'r', encoding='utf-8') as f:
    cfp_code = f.read()

cfp_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewa:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?englishMeaning:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in cfp_pattern.finditer(cfp_code):
    pid = match.group(1)
    raw_chi = match.group(2)
    english = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/components/outpost/ChichewaFieldPhrasebook.tsx',
        'key': f'phrase.{pid}',
        'english': english,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Field Protocol Phrasebook',
        'notes': 'Traditional respectful spoken sentence',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

# 9. src/components/outpost/VisualSoilSwatchGuide.tsx
with open('src/components/outpost/VisualSoilSwatchGuide.tsx', 'r', encoding='utf-8') as f:
    vss_code = f.read()

vss_pattern = re.compile(r'id:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?soilClass:\s*[\'\"]([^\'\"]+)[\'\"],[^\}]*?chichewaName:\s*[\'\"]([^\'\"]+)[\'\"]', re.DOTALL)
for match in vss_pattern.finditer(vss_code):
    sid = match.group(1)
    sclass = match.group(2)
    raw_chi = match.group(3)
    primary, alts = split_primary_and_alts(raw_chi)
    entries.append({
        'file': 'src/components/outpost/VisualSoilSwatchGuide.tsx',
        'key': f'soil_swatch.{sid}',
        'english': sclass,
        'chichewa_raw': clean_chichewa_str(raw_chi),
        'primary': primary,
        'alternates': alts,
        'region': 'National',
        'source': 'Harmonized World Soil Database (HWSD) & Local Pedology',
        'notes': 'Local traditional soil texture designation',
        'reviewer': 'Pending local review',
        'status': 'unreviewed'
    })

print(f'Total extracted entries: {len(entries)}')

# Deduplicate by key if any
seen_keys = set()
unique_entries = []
for e in entries:
    if e['key'] not in seen_keys:
        seen_keys.add(e['key'])
        unique_entries.append(e)

# Write CHICHEWA_REVIEW.csv
csv_path = 'CHICHEWA_REVIEW.csv'
with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['file', 'key', 'English', 'Chichewa', 'region', 'notes', 'reviewer', 'status']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for e in unique_entries:
        writer.writerow({
            'file': e['file'],
            'key': e['key'],
            'English': e['english'],
            'Chichewa': e['chichewa_raw'],
            'region': e['region'],
            'notes': e['notes'],
            'reviewer': e['reviewer'],
            'status': e['status'],
        })

print(f'Successfully wrote {len(unique_entries)} records to {csv_path}')

# Write src/i18n/ny.ts
ts_path = 'src/i18n/ny.ts'
ts_lines = [
    '/**',
    ' * Outpost Living Chichewa (ChiCheŵa / Chinyanja) Localization Repository',
    ' *',
    ' * Each string is stored with its primary presentation text, review status,',
    ' * geographic region, provenance source, and alternative names / dialectal variants.',
    ' *',
    ' * Rule: Primary term is displayed in UI headers/labels, with alternatives presented',
    ' * under "Also called" in tooltips, modals, and detail cards.',
    ' */',
    '',
    'export interface ChichewaEntry {',
    '  text: string;',
    '  reviewed: boolean;',
    '  region: string;',
    '  source: string;',
    '  alternates: string[];',
    '  english?: string;',
    '  notes?: string;',
    '}',
    '',
    'export type ChichewaDictionary = Record<string, ChichewaEntry>;',
    '',
    'export const CHICHEWA_STRINGS: ChichewaDictionary = {'
]

for e in unique_entries:
    clean_key = re.sub(r'[^a-zA-Z0-9_.]', '_', e['key'])
    alts_json = json.dumps(e['alternates'], ensure_ascii=False)
    # Ensure quotes are properly escaped in TypeScript
    text_val = e['primary'].replace("'", "\\'")
    eng_val = e['english'].replace("'", "\\'")
    notes_val = e['notes'].replace("'", "\\'")
    source_val = e['source'].replace("'", "\\'")
    region_val = e['region'].replace("'", "\\'")
    
    ts_lines.append(f"  '{clean_key}': {{")
    ts_lines.append(f"    text: '{text_val}',")
    ts_lines.append(f"    reviewed: false,")
    ts_lines.append(f"    region: '{region_val}',")
    ts_lines.append(f"    source: '{source_val}',")
    ts_lines.append(f"    alternates: {alts_json},")
    ts_lines.append(f"    english: '{eng_val}',")
    ts_lines.append(f"    notes: '{notes_val}',")
    ts_lines.append("  },")

ts_lines.extend([
    '};',
    '',
    '/**',
    ' * Helper to resolve primary Chichewa term and optional "Also called" string.',
    ' * Slices primary term for UI display and packages alternatives under "Also called".',
    ' */',
    'export function getChichewaDisplay(keyOrRaw: string): {',
    '  primary: string;',
    '  alsoCalled?: string;',
    '  alternates: string[];',
    '  reviewed: boolean;',
    '  region?: string;',
    '} {',
    '  const entry = CHICHEWA_STRINGS[keyOrRaw];',
    '  if (entry) {',
    '    const alsoCalled = entry.alternates.length > 0',
    '      ? `Also called: ${entry.alternates.join(", ")}`',
    '      : undefined;',
    '    return {',
    '      primary: entry.text,',
    '      alsoCalled,',
    '      alternates: entry.alternates,',
    '      reviewed: entry.reviewed,',
    '      region: entry.region,',
    '    };',
    '  }',
    '',
    '  // If passed a raw compound string like "Ntedza / Mtedza (CG7)"',
    '  const cleanStr = keyOrRaw.replace(/&mp;/g, "&").replace(/&amp;/g, "&").replace(/\'/g, "’");',
    '  const parts = cleanStr.split(/[/;]/).map(s => s.trim()).filter(Boolean);',
    '  const primary = parts[0] || keyOrRaw;',
    '  const alternates = parts.slice(1);',
    '  const alsoCalled = alternates.length > 0 ? `Also called: ${alternates.join(", ")}` : undefined;',
    '',
    '  return {',
    '    primary,',
    '    alsoCalled,',
    '    alternates,',
    '    reviewed: false,',
    '  };',
    '}',
    '',
    '/**',
    ' * Format crop or term heading with primary Chichewa and "Also called" subtitle.',
    ' */',
    'export function formatChichewaBadge(keyOrRaw: string): string {',
    '  const { primary, alsoCalled } = getChichewaDisplay(keyOrRaw);',
    '  return alsoCalled ? `${primary} (${alsoCalled})` : primary;',
    '}',
    ''
])

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print(f'Successfully generated {ts_path}')
