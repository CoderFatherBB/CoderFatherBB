import { PROFILE, EXPERIENCE, PROJECTS, RESEARCH, SKILL_GROUPS, CERTIFICATIONS } from "@/lib/data";

export type Point = {
  x: number;
  y: number;
};

export type ChapterEntry = {
  title: string;
  meta?: string;
  description: string;
  tags?: string[];
  link?: string;
};

export type ChapterSection = {
  title: string;
  entries: ChapterEntry[];
};

export type DiscoveryZone = {
  id: string;
  label: string;
  mapLabel: string;
  eyebrow: string;
  description: string;
  facts: string[];
  position: Point;
  symbol: string;
  chapterTitle: string;
  chapterIntro: string;
  chapterStats: Array<{ value: string; label: string }>;
  chapterSections: ChapterSection[];
};

const zones = [
  { id: "origin", label: "Origin Terminal", mapLabel: "ORIGIN", position: { x: 155, y: 170 }, symbol: "BB", chapterTitle: "Bhavin, at the source", intro: PROFILE.summary, stats: [{ value: "9.01", label: "B.Tech CGPA" }, { value: "2nd", label: "Department rank" }], entries: EXPERIENCE.filter(item => item.kind === "Education").map(item => ({ title: item.role, meta: item.place + " · " + item.date, description: item.detail })) },
  { id: "career", label: "Career Mainframe", mapLabel: "CAREER", position: { x: 570, y: 145 }, symbol: "06", chapterTitle: "Professional field log", intro: "Engineering, research, and mentoring since 2020. Some roles overlap.", stats: [{ value: "14", label: "Production systems at Provilac" }, { value: "5+", label: "Enterprise GenAI systems at Persistent" }], entries: EXPERIENCE.filter(item => item.kind !== "Education").slice().reverse().map(item => ({ title: item.role, meta: item.place + " · " + item.date, description: item.detail })) },
  { id: "research", label: "Research Archive", mapLabel: "RESEARCH", position: { x: 1080, y: 170 }, symbol: "02", chapterTitle: "Research archive", intro: "Contributions to two published Elsevier Data in Brief datasets. Papers on applied deep learning and agent reliability remain in preparation.", stats: [{ value: "02", label: "Published dataset contributions" }, { value: "92%", label: "DRDO audio localization accuracy" }], entries: RESEARCH.map(item => ({ title: item.title, meta: item.publication, description: item.detail, link: item.link })) },
  { id: "projects", label: "Project Workshop", mapLabel: "PROJECTS", position: { x: 270, y: 565 }, symbol: "04", chapterTitle: "Project workshop", intro: "Selected research and production builds. Performance figures refer to their respective projects and reported baselines.", stats: [{ value: "09", label: "DeliverIQ modules" }, { value: "500+", label: "Daily agent-framework sessions" }], entries: PROJECTS.map(item => ({ title: item.title, meta: item.kicker, description: item.description + " " + item.features.join(" · "), tags: item.tech, link: item.github || undefined })) },
  { id: "systems", label: "Systems Reactor", mapLabel: "STACK", position: { x: 735, y: 545 }, symbol: "AI", chapterTitle: "Systems and skills reactor", intro: "A stack spanning experimentation, evaluation, retrieval, orchestration, and deployment.", stats: [{ value: "06", label: "Capability groups" }, { value: "60+", label: "Technical certifications" }], entries: SKILL_GROUPS.map(item => ({ title: item.name, description: item.skills.join(" · "), tags: item.skills })) },
  { id: "learning", label: "Learning Library", mapLabel: "LEARNING", position: { x: 90, y: 390 }, symbol: "60+", chapterTitle: "Always learning", intro: "From a strong academic foundation to continuous learning across AI, GenAI, LLMOps, cloud, and computer vision.", stats: [{ value: "60+", label: "Technical certifications" }, { value: "10/10", label: "CGPA in semesters 7 and 8" }], entries: CERTIFICATIONS.map(item => ({ title: item.name, meta: item.issuer, description: item.detail })) },
  { id: "mentoring", label: "Mentoring Studio", mapLabel: "MENTORING", position: { x: 1050, y: 420 }, symbol: "03", chapterTitle: "Building with others", intro: "Sharing what I learn through engineering mentorship, university workshops, and collaborative research.", stats: [{ value: "03", label: "Junior engineers mentored at Persistent" }, { value: "2025", label: "MIT WPU collaboration" }], entries: [{ title: "Mentoring at Persistent Systems", description: "Mentors three junior engineers while architecting enterprise GenAI systems." }, ...EXPERIENCE.filter(item => item.kind === "Mentoring").map(item => ({ title: item.role, meta: item.place + " · " + item.date, description: item.detail }))] },
];
export const discoveryZones: DiscoveryZone[] = zones.map((zone, index) => ({
  ...zone, eyebrow: `Profile fragment 0${index + 1}`, description: zone.intro, facts: zone.stats.map(stat => `${stat.value} · ${stat.label}`), chapterIntro: zone.intro, chapterStats: zone.stats, chapterSections: [{ title: zone.mapLabel, entries: zone.entries }],
}));
