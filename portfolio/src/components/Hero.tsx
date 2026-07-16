"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Play, Sparkles } from "lucide-react";

type HeroProps = {
  onStartQuest: () => void;
};

const expertise = ["Generative AI", "Multi-agent systems", "RAG", "Computer vision"];

export default function Hero({ onStartQuest }: HeroProps) {
  return (
    <section id="about" className="hero-lab relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-6 pb-16 md:px-12 md:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-4 py-2"
          >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
              <span className="hud-label text-emerald-200">Open to ambitious AI missions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl text-5xl font-display font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-8xl"
          >
              I build intelligence<br />
              <span className="text-gradient">that leaves the lab.</span>
          </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
              I&apos;m <strong className="font-semibold text-white">Bhavin Baldota</strong>, a Lead Software Engineer in GenAI/ML at Persistent—turning LLMs, RAG, vision, and multi-agent ideas into systems people can actually use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {expertise.map((item) => (
                <span key={item} className="expertise-chip">{item}</span>
              ))}
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
              <button
                type="button"
                onClick={onStartQuest}
                className="hero-primary-button group"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-emerald-300">
                  <Play size={14} fill="currentColor" />
                </span>
                <span>Play my portfolio</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            <a
                href="#experience"
                className="hero-secondary-button group"
            >
                Explore normally
                <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 flex items-center gap-3 text-sm text-slate-500"
            >
              <Sparkles size={15} className="text-cyan-300" />
              <span>The interactive route takes about two minutes.</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="signal-console"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                <span className="hud-label text-slate-300">Candidate signal / live</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">BB-1505</span>
            </div>

            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-10">
              <div className="signal-orbit signal-orbit-one" />
              <div className="signal-orbit signal-orbit-two" />
              <div className="signal-orbit signal-orbit-three" />
              <div className="signal-core">
                <span className="text-4xl font-semibold tracking-[-0.05em] text-white">BB</span>
                <span className="hud-label mt-2 text-emerald-300">AI / ML</span>
              </div>
              <span className="signal-node signal-node-one">LLM</span>
              <span className="signal-node signal-node-two">RAG</span>
              <span className="signal-node signal-node-three">CV</span>
              <span className="signal-node signal-node-four">RL</span>
            </div>

            <div className="grid grid-cols-2 border-t border-white/10">
              {[
                ["05", "organizations"],
                ["02", "publications"],
                ["60+", "certifications"],
                ["9.01", "B.Tech CGPA"],
              ].map(([value, label]) => (
                <div key={label} className="signal-stat">
                  <span className="text-2xl font-semibold text-white">{value}</span>
                  <span className="hud-label mt-1 text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
