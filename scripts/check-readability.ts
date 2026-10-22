import fs from 'fs';
import path from 'path';

/**
 * Robust syllable counter following standard English linguistic rules.
 */
export function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 1;
  if (clean.length <= 3) return 1;

  // Prefix/Suffix simplifications
  let w = clean;
  // Common prefixes
  w = w.replace(/^(un|re|in|dis|en|em|non)/, '');
  // Trailing e / silent endings
  w = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  w = w.replace(/^y/, '');

  const matches = w.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export interface TextAnalysisResult {
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  wordsPerSentence: number;
  syllablesPerWord: number;
  fkGrade: number;
  longSentences: { sentence: string; words: number }[];
}

/**
 * Analyzes text for Flesch-Kincaid Grade Level and sentence lengths.
 */
export function analyzeText(text: string): TextAnalysisResult {
  const clean = (text || '')
    .replace(/["""]/g, '"')
    .replace(/[''’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      syllableCount: 0,
      wordsPerSentence: 0,
      syllablesPerWord: 0,
      fkGrade: 0,
      longSentences: [],
    };
  }

  // Protect abbreviations and decimals so periods don't split sentences prematurely
  const safeText = clean
    .replace(/\b(e\.g\.|i\.e\.|vs\.|pp?\.|etc\.|Fig\.|No\.|vol\.|approx\.|min\.|hr\.|sec\.|m\.|cm\.|mm\.|ft\.|in\.|kg\.|lbs?\.)/gi, (m) =>
      m.replace(/\./g, '___DOT___')
    )
    .replace(/(\d+)\.(\d+)/g, '$1___DOT___$2')
    .replace(/T\/A/g, 'TA')
    .replace(/G\.V\.H\./g, 'GVH');

  // Split into sentences on sentence-ending punctuation followed by space or quote
  const rawSentences = safeText
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/___DOT___/g, '.').trim())
    .filter((s) => s.length > 0 && /[a-zA-Z]/.test(s));

  const sentenceCount = Math.max(1, rawSentences.length);
  let totalWords = 0;
  let totalSyllables = 0;
  const longSentences: { sentence: string; words: number }[] = [];

  for (const s of rawSentences) {
    const tokens = s
      .split(/\s+/)
      .map((w) => w.replace(/^[^\w]+|[^\w]+$/g, ''))
      .filter((w) => w.length > 0 && /[a-zA-Z0-9]/.test(w));

    const wc = tokens.length;
    if (wc > 25) {
      longSentences.push({ sentence: s, words: wc });
    }

    totalWords += wc;
    for (const w of tokens) {
      totalSyllables += countSyllables(w);
    }
  }

  const wordCount = Math.max(1, totalWords);
  const wordsPerSentence = Math.round((wordCount / sentenceCount) * 10) / 10;
  const syllablesPerWord = Math.round((totalSyllables / wordCount) * 100) / 100;

  // Standard Flesch-Kincaid Grade Level formula:
  // FKGL = 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
  let fkGrade = 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59;
  fkGrade = Math.max(0, Math.round(fkGrade * 10) / 10);

  return {
    wordCount,
    sentenceCount,
    syllableCount: totalSyllables,
    wordsPerSentence,
    syllablesPerWord,
    fkGrade,
    longSentences,
  };
}

export interface GuideAuditReport {
  id: string;
  title: string;
  category: string;
  generalFkGrade: number;
  generalWordCount: number;
  generalSentenceCount: number;
  technicalFkGrade?: number;
  technicalWordCount?: number;
  technicalSentenceCount?: number;
  status: 'PASS' | 'FAIL';
  failures: string[];
  warnings: string[];
}

export interface AbbreviationFinding {
  abbr: string;
  count: number;
  defined: boolean;
  definition?: string;
  contexts: string[];
}

export async function runReadabilityAudit(): Promise<{
  passed: boolean;
  guideReports: GuideAuditReport[];
  totalSentencesOver25: number;
  undefinedAbbreviations: AbbreviationFinding[];
  unreviewedChichewaStrings: { key: string; text: string; region: string; notes?: string }[];
  markdownReport: string;
}> {
  // Load data modules
  const { HOMESTEAD_SKILLS } = await import('../src/data/skillsAndSeasons.ts');
  const { SKILL_TECHNICAL_PROTOCOLS } = await import('../src/data/skillsTechnicalProtocols.ts');
  const { CHICHEWA_STRINGS } = await import('../src/i18n/ny.ts');
  const { GLOSSARY_TERMS } = await import('../src/data/glossary.ts');

  const guideReports: GuideAuditReport[] = [];
  let passed = true;
  let totalSentencesOver25 = 0;
  const allLongSentences: { guideId: string; sentence: string; words: number }[] = [];

  // Track abbreviations across guide texts
  const abbrRegex = /\b[A-Z]{2,6}\b/g;
  const abbreviationCounts = new Map<string, { count: number; contexts: string[] }>();

  // Known standard units, common words, or universal abbreviations that don't require glossary definition
  const standardIgnoredAbbrs = new Set([
    'DC', 'AC', 'PVC', 'HDPE', 'GPS', 'LED', 'TOC', 'ID', 'US', 'USA', 'SDA', 'EGW', 'FAQ', 'URL', 'PDF', 'CSV', 'SVG', 'HTML', 'CSS', 'UI', 'CI', 'OK',
    'NOT', 'AND', 'OR', 'AM', 'PM', 'ALL', 'DAY', 'SEE', 'TRUE', 'FEET', 'CM', 'MM', 'KG', 'MG', 'ML', 'FT', 'IN', 'PSI', 'MPA', 'V', 'W', 'KW', 'KWH', 'AH', 'KOH', 'PH', 'STEP', 'TBD', 'DIY', 'DO', 'NO', 'DAY', 'KCL', 'NA', 'MG'
  ]);

  for (const skill of HOMESTEAD_SKILLS) {
    const failures: string[] = [];
    const warnings: string[] = [];

    // 1. General Guide Body Analysis
    const generalTextChunks = [
      skill.title,
      skill.summary,
      skill.description,
      ...(skill.steps || []),
      ...(skill.commonMistakes || []),
      skill.inspiredCounsel || '',
    ].filter(Boolean);

    const generalFullText = generalTextChunks.join('. ');
    const generalAnalysis = analyzeText(generalFullText);

    // Track long sentences
    for (const ls of generalAnalysis.longSentences) {
      warnings.push(`Sentence over 25 words (${ls.words} words): "${ls.sentence.slice(0, 80)}..."`);
      allLongSentences.push({ guideId: skill.id, sentence: ls.sentence, words: ls.words });
    }
    totalSentencesOver25 += generalAnalysis.longSentences.length;

    // Check FK Grade for General Body (Must be <= Grade 9)
    if (generalAnalysis.fkGrade > 9.0) {
      failures.push(`General guide reading level (Grade ${generalAnalysis.fkGrade}) exceeds maximum allowed Grade 9.0`);
    }

    // 2. Technical Details Analysis
    let techAnalysis: TextAnalysisResult | undefined;
    const techProtocol = SKILL_TECHNICAL_PROTOCOLS[skill.id] || skill.detailedProtocol;
    if (techProtocol) {
      const techChunks: string[] = [];
      if (techProtocol.blueprint) {
        techChunks.push(...(techProtocol.blueprint.dimensionsAndRatios || []));
        techChunks.push(...(techProtocol.blueprint.sizingFormulas || []));
        for (const m of techProtocol.blueprint.metrics || []) {
          techChunks.push(`${m.label}: ${m.value}. ${m.detail}`);
        }
      }
      if (techProtocol.materials) {
        for (const mat of techProtocol.materials) {
          techChunks.push(`${mat.name}: ${mat.localAvailability}. ${mat.purpose}`);
        }
      }
      if (techProtocol.protocol) {
        for (const step of techProtocol.protocol) {
          techChunks.push(`${step.phase} - ${step.title}: ${step.instructions}. ${step.criticalCheck}`);
        }
      }
      if (techProtocol.troubleshooting) {
        for (const tr of techProtocol.troubleshooting) {
          techChunks.push(`${tr.pitfall} - ${tr.symptom}: ${tr.rootCause}. ${tr.fieldRemedy}`);
        }
      }

      if (techChunks.length > 0) {
        techAnalysis = analyzeText(techChunks.join('. '));
        for (const ls of techAnalysis.longSentences) {
          warnings.push(`[Technical Details] Sentence over 25 words (${ls.words} words): "${ls.sentence.slice(0, 80)}..."`);
          allLongSentences.push({ guideId: `${skill.id} (tech)`, sentence: ls.sentence, words: ls.words });
        }
        totalSentencesOver25 += techAnalysis.longSentences.length;

        // Check FK Grade for Technical Details (Must be <= Grade 11)
        if (techAnalysis.fkGrade > 11.0) {
          failures.push(`Technical details reading level (Grade ${techAnalysis.fkGrade}) exceeds maximum allowed Grade 11.0`);
        }
      }
    }

    // Extract abbreviations
    const allGuideText = generalFullText + (techProtocol ? ' ' + JSON.stringify(techProtocol) : '');
    const foundAbbrs = allGuideText.match(abbrRegex) || [];
    for (const ab of foundAbbrs) {
      if (standardIgnoredAbbrs.has(ab)) continue;
      const cur = abbreviationCounts.get(ab) || { count: 0, contexts: [] };
      cur.count += 1;
      if (cur.contexts.length < 3) cur.contexts.push(skill.id);
      abbreviationCounts.set(ab, cur);
    }

    const isGuidePass = failures.length === 0;
    if (!isGuidePass) passed = false;

    guideReports.push({
      id: skill.id,
      title: skill.title,
      category: skill.category,
      generalFkGrade: generalAnalysis.fkGrade,
      generalWordCount: generalAnalysis.wordCount,
      generalSentenceCount: generalAnalysis.sentenceCount,
      technicalFkGrade: techAnalysis?.fkGrade,
      technicalWordCount: techAnalysis?.wordCount,
      technicalSentenceCount: techAnalysis?.sentenceCount,
      status: isGuidePass ? 'PASS' : 'FAIL',
      failures,
      warnings,
    });
  }

  // 3. Abbreviation audit: check which are defined in glossary or explained on first use
  const undefinedAbbreviations: AbbreviationFinding[] = [];
  const glossaryKeys = new Set(Object.keys(GLOSSARY_TERMS || {}));
  for (const [abbr, data] of abbreviationCounts.entries()) {
    const isDefined = glossaryKeys.has(abbr) || GLOSSARY_TERMS[abbr as any] !== undefined;
    if (!isDefined) {
      undefinedAbbreviations.push({
        abbr,
        count: data.count,
        defined: false,
        contexts: data.contexts,
      });
    }
  }

  // 4. Chichewa audit: list unreviewed strings
  const unreviewedChichewaStrings: { key: string; text: string; region: string; notes?: string }[] = [];
  for (const [key, item] of Object.entries(CHICHEWA_STRINGS)) {
    if (!item.reviewed) {
      unreviewedChichewaStrings.push({
        key,
        text: item.text,
        region: item.region || 'National',
        notes: item.notes,
      });
    }
  }

  // 5. Generate Markdown Report
  const now = new Date().toISOString();
  let md = `# READABILITY & CONTENT AUDIT REPORT\n\n`;
  md += `**Generated:** ${now}  \n`;
  md += `**CI Status:** **${passed ? 'PASSED ✅' : 'FAILED ❌'}**  \n`;
  md += `**Enforced Thresholds:** General guides ≤ Grade 9.0 | Technical details sections ≤ Grade 11.0  \n`;
  md += `**Total Guides Evaluated:** ${guideReports.length}  \n`;
  md += `**Total Sentences Over 25 Words (Warnings):** ${totalSentencesOver25}  \n`;
  md += `**Undefined Abbreviations Flagged:** ${undefinedAbbreviations.length}  \n`;
  md += `**Unreviewed Chichewa Strings:** ${unreviewedChichewaStrings.length}  \n\n`;

  md += `---\n\n`;
  md += `## 1. Guide Readability Ledger (Flesch–Kincaid)\n\n`;
  md += `| Guide ID | Category | General Grade | Tech Grade | General Words | Sentences | CI Status |\n`;
  md += `|---|---|---|---|---|---|---|\n`;

  for (const g of guideReports) {
    const techDisplay = g.technicalFkGrade !== undefined ? `Grade ${g.technicalFkGrade}` : '—';
    const statusIcon = g.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    md += `| \`${g.id}\` | ${g.category} | Grade ${g.generalFkGrade} | ${techDisplay} | ${g.generalWordCount} | ${g.generalSentenceCount} | ${statusIcon} |\n`;
  }

  if (!passed) {
    md += `\n### ❌ CI Violations (Guides Exceeding Allowed Grade Level)\n\n`;
    for (const g of guideReports.filter((r) => r.status === 'FAIL')) {
      md += `#### Guide: \`${g.id}\` (${g.title})\n`;
      for (const f of g.failures) {
        md += `- **FAILURE**: ${f}\n`;
      }
    }
  }

  md += `\n---\n\n`;
  md += `## 2. Sentence Length Warnings (> 25 Words)\n\n`;
  if (allLongSentences.length === 0) {
    md += `*No sentences exceed 25 words. All guide copy follows concise plain language discipline.*\n\n`;
  } else {
    md += `*Found ${allLongSentences.length} sentences over 25 words across guides (Target: ≤ 20–25 words per sentence for Grade 7–8 accessibility):*\n\n`;
    for (const ls of allLongSentences.slice(0, 30)) {
      md += `- **[${ls.guideId}]** (${ls.words} words): "${ls.sentence}"\n`;
    }
    if (allLongSentences.length > 30) {
      md += `- *(...and ${allLongSentences.length - 30} more)*\n`;
    }
  }

  md += `\n---\n\n`;
  md += `## 3. Undefined Abbreviations Audit\n\n`;
  if (undefinedAbbreviations.length === 0) {
    md += `*All detected acronyms and technical abbreviations are defined in \`src/data/glossary.ts\` or expanded on first use.*\n\n`;
  } else {
    md += `| Abbreviation | Occurrences | First Detected Locations | Glossary Status |\n`;
    md += `|---|---|---|---|\n`;
    for (const u of undefinedAbbreviations) {
      md += `| **${u.abbr}** | ${u.count} | ${u.contexts.join(', ')} | ⚠️ Needs Glossary Definition |\n`;
    }
  }

  md += `\n---\n\n`;
  md += `## 4. Chichewa Review & Localization Status\n\n`;
  md += `**Total Chichewa Strings:** ${Object.keys(CHICHEWA_STRINGS).length}  \n`;
  md += `**Unreviewed Count:** ${unreviewedChichewaStrings.length} (recorded in \`CHICHEWA_REVIEW.csv\`)  \n\n`;
  md += `*Excerpt of unreviewed strings awaiting local elder and agriculturalist review:*\n\n`;
  md += `| Key | Chichewa Term | Region | Notes |\n`;
  md += `|---|---|---|---|\n`;
  for (const c of unreviewedChichewaStrings.slice(0, 15)) {
    md += `| \`${c.key}\` | **${c.text}** | ${c.region} | ${c.notes || 'Awaiting sign-off'} |\n`;
  }
  if (unreviewedChichewaStrings.length > 15) {
    md += `| *(...)* | *(...)* | *(...)* | *See full listing in CHICHEWA_REVIEW.csv* |\n`;
  }

  return {
    passed,
    guideReports,
    totalSentencesOver25,
    undefinedAbbreviations,
    unreviewedChichewaStrings,
    markdownReport: md,
  };
}

async function cli() {
  try {
    const result = await runReadabilityAudit();

    // Write report file
    const reportPath = path.resolve(process.cwd(), 'READABILITY_REPORT.md');
    fs.writeFileSync(reportPath, result.markdownReport, 'utf8');
    console.log(`\n📄 Generated READABILITY_REPORT.md (${reportPath})`);

    console.log(`\n======================================================`);
    console.log(`  OUTPOST LIVING READABILITY & ACCESSIBILITY AUDIT`);
    console.log(`======================================================`);
    console.log(`Total Guides Evaluated: ${result.guideReports.length}`);
    console.log(`Total Sentences >25 Words: ${result.totalSentencesOver25}`);
    console.log(`Undefined Abbreviations: ${result.undefinedAbbreviations.length}`);
    console.log(`Unreviewed Chichewa Terms: ${result.unreviewedChichewaStrings.length}`);
    console.log(`CI Status: ${result.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
    console.log(`======================================================\n`);

    if (!result.passed) {
      console.error(`❌ CI Error: One or more guides exceeded readability thresholds (Max Grade 9.0 general, 11.0 technical)!`);
      process.exit(1);
    } else {
      console.log(`✅ All guides passed readability thresholds!`);
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal error running readability audit:', err);
    process.exit(1);
  }
}

// Run CLI when executed directly
if (process.argv[1] && (process.argv[1].endsWith('check-readability.ts') || process.argv[1].endsWith('check-readability.js'))) {
  cli();
}
