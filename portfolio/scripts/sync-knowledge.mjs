// Run with Node 22+: node --experimental-strip-types scripts/sync-knowledge.mjs
import { writeFileSync } from 'node:fs';
import { PROFILE, EXPERIENCE, PROJECTS, RESEARCH, SKILL_GROUPS, ACHIEVEMENTS, CERTIFICATIONS } from '../src/lib/data.ts';
const context = '# Bhavin Baldota: verified portfolio facts\n\nSource: supplied research and ATS CVs. Metrics are reported in those CVs, not independently audited. Dataset work is a contribution, not a claim of sole authorship. Papers in preparation are not published or accepted. Do not sum overlapping jobs or internships into years of experience.\n\n';
writeFileSync(new URL('../../backend/knowledge_base/master_kb.md', import.meta.url), context + JSON.stringify({ PROFILE, EXPERIENCE, PROJECTS, RESEARCH, SKILL_GROUPS, ACHIEVEMENTS, CERTIFICATIONS }, null, 2));
