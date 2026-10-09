import { PROFILE, EXPERIENCE, PROJECTS, RESEARCH, SKILL_GROUPS, CERTIFICATIONS, ACHIEVEMENTS } from "./data";
import rules from "./assistant-rules.json";

export type ConversationMessage = { role: "user" | "assistant"; content: string };
export function sanitizeConversation(value: unknown): ConversationMessage[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap(message => {
    if (!message || typeof message !== "object") return [];
    const { role, content } = message as { role?: unknown; content?: unknown };
    return (role === "user" || role === "assistant") && typeof content === "string" && content.trim()
      ? [{ role, content }] : [];
  });
}
export function buildAssistantContext() {
  return rules.join("\n\n") + "\n\nVERIFIED PROFILE FACTS:\n" + JSON.stringify({ PROFILE, EXPERIENCE, PROJECTS, RESEARCH, SKILL_GROUPS, CERTIFICATIONS, ACHIEVEMENTS });
}

// Exact role clarifications use verified records rather than a model's reconstruction.
export function answerRoleClarification(messages: ConversationMessage[]): string | null {
  const users = messages.filter(message => message.role === "user");
  const latest = users.at(-1)?.content.toLowerCase() || "";
  const software = /software\s+(?:develop\w*|engineer\w*)/;
  const earlier = users.slice(0, -1).map(message => message.content.toLowerCase());
  const provilac = /provilac/.test(latest) || earlier.some(text => /provilac/.test(text));
  const latestExplicit = software.test(latest);
  if (latestExplicit && /later|2024|2025/.test(latest) && /ai\s*(?:\/|&|and)\s*ml|ai engineer|ml engineer/.test(latest)) return null;
  const priorExplicit = [...earlier].reverse().find(text => software.test(text) || /\b(?:ai\s*\/\s*ml|ai\s*(?:&|and)\s*ml|ai engineer|ml engineer)\b/.test(text));
  const followUp = /\b(?:there|that role|that job|this role|both|same time|full[-\s]?time|simultaneous)\b/.test(latest);
  if (!provilac || /persistent|drdo/.test(latest) || (!latestExplicit && !(followUp && priorExplicit && software.test(priorExplicit)))) return null;
  if (!latestExplicit && /\b(?:ai|ml|genai|rag|agentic)\b/.test(latest)) return null;
  const job = EXPERIENCE.find(item => item.id === "provilac-software")!;
  const degree = EXPERIENCE.find(item => item.id === "btech")!;
  const correction = /not this|not that|i mean|talking about|rather than/.test(latest);
  const overlap = /degree|university|\buni\b|b\.?tech|full[-\s]?time|both|simultaneous/.test([latest, ...earlier].join(" "));
  const intro = correction ? "Understood—you mean his earlier software-engineering role, not his later AI/ML position.\n\n" : "";
  const study = overlap ? `\n\nHis **${job.role} role and ${degree.role} were both full-time**, as Bhavin confirmed. The degree spans **${degree.date}**, overlapping the software role during **2021–2023**. The software role's precise end month is not documented.` : "";
  return `${intro}Bhavin was a **${job.role} at Provilac (${job.date})**, a full-time role. ${job.detail}${study}\n\nHis **AI & ML Engineer role at Provilac (Nov 2024–Aug 2025)** is separate. The **14 production AI/ML systems** belong to that later role.`;
}
