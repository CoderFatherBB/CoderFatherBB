"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Loader2, RotateCcw, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EXPERIENCE, PROFILE, PROJECTS, RESEARCH } from "@/lib/data";

type Message = { id: string; role: "user" | "assistant"; content: string };
const welcome: Message = { id: "welcome", role: "assistant", content: "Hi, I’m Bhavin’s portfolio assistant. Explore a CV highlight below, or ask me about his work, research, and experience." };
const highlights = [
  { label: "Production impact", answer: EXPERIENCE.filter(item => item.place === "Persistent Systems" || item.role === "AI & ML Engineer").reverse().map(item => `### ${item.role} · ${item.place}\n\n${item.detail}`).join("\n\n") },
  { label: "Research contributions", answer: RESEARCH.map(item => `**[${item.title}](${item.link})** · ${item.publication}\n\n${item.detail}`).join("\n\n") + "\n\n" + EXPERIENCE.find(item => item.place === "DRDO")!.detail + "\n\nPapers on applied deep learning and agent reliability remain in preparation." },
  { label: "Projects & stack", answer: PROJECTS.map(item => `### ${item.title}\n\n${item.description}\n\n${item.features.join(" · ")}\n\n**Stack:** ${item.tech.join(", ")}`).join("\n\n") },
];

export default function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (inputRef.current?.disabled) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
    else inputRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),a[href],[tabindex="0"]');
      if (!nodes?.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", key); previous?.focus(); };
  }, [isOpen, onClose]);
  useEffect(() => { if (isOpen && !loading) inputRef.current?.focus(); }, [isOpen, loading]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, isOpen]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim() || loading) return;
    const user: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    const history = [...messages, user];
    setMessages(history); setInput(""); setLoading(true);
    const id = crypto.randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/chat", { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
      if (!response.ok || !response.body) throw new Error("Assistant unavailable");
      setMessages(prev => [...prev, { id, role: "assistant", content: "" }]);
      const reader = response.body.getReader(), decoder = new TextDecoder();
      let pending = "", content = "";
      const consume = (line: string) => {
        const payload = line.trim().replace(/^data:\s*/, "");
        if (payload.startsWith("3:")) throw new Error("Assistant stream failed");
        if (!payload.startsWith("0:")) return;
        const text = JSON.parse(payload.slice(2));
        if (typeof text !== "string") return;
        content += text;
        setMessages(prev => prev.map(message => message.id === id ? { ...message, content } : message));
      };
      try {
        while (true) {
          const { value, done } = await reader.read();
          pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
          const lines = pending.split("\n"); pending = lines.pop() || ""; lines.forEach(consume);
          if (done) { if (pending.trim()) consume(pending); break; }
        }
        if (!content.trim()) throw new Error("Empty answer");
      } finally { reader.releaseLock(); }
    } catch {
      setMessages(prev => [...prev.filter(message => message.id !== id || message.content), { id: crypto.randomUUID(), role: "assistant", content: "I couldn’t answer that right now. Try a CV highlight below, or contact Bhavin directly." }]);
    } finally { clearTimeout(timeout); setLoading(false); }
  }
  if (!isOpen) return null;
  return <div className="assistant-overlay" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialog} className="assistant-panel" role="dialog" aria-modal="true" aria-label="Bhavin’s assistant" data-lenis-prevent>
      <header className="experience-header"><span className="experience-header-icon"><Bot size={24} aria-hidden="true" /></span><div><p className="eyebrow">A CONVERSATION WITH MY WORK</p><h2>Bhavin’s assistant</h2></div><button className="experience-icon-button" onClick={onClose} aria-label="Close assistant"><X size={20} /></button></header>
      <div ref={log} className="assistant-log" tabIndex={0} role="log" aria-live="polite" aria-label="Conversation" aria-busy={loading}>{messages.map(message => <article key={message.id} className={`assistant-message ${message.role}`}><span className="eyebrow">{message.role === "user" ? "YOU" : "BHAVIN’S ASSISTANT"}</span><ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content || "Thinking…"}</ReactMarkdown></article>)}</div>
      <div className="assistant-highlights"><span className="eyebrow">CV HIGHLIGHTS</span><div>{highlights.map(item => <button key={item.label} disabled={loading} onClick={() => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "user", content: item.label }, { id: crypto.randomUUID(), role: "assistant", content: item.answer }])}>{item.label} <ArrowUpRight size={13} aria-hidden="true" /></button>)}</div></div>
      <form className="assistant-form" onSubmit={send}><input ref={inputRef} aria-label="Ask about Bhavin" placeholder="What would you like to know?" value={input} onChange={event => setInput(event.target.value)} disabled={loading} maxLength={2000} /><button className="experience-send" aria-label="Send message" disabled={loading || !input.trim()}>{loading ? <Loader2 size={18} className="assistant-spinner" /> : <Send size={18} />}</button></form>
      <footer className="assistant-footer"><a href={`mailto:${PROFILE.email}`}>Contact Bhavin ↗</a><button disabled={loading} onClick={() => { setMessages([welcome]); setInput(""); inputRef.current?.focus(); }}><RotateCcw size={12} aria-hidden="true" /> New conversation</button></footer>
    </div>
  </div>;
}
