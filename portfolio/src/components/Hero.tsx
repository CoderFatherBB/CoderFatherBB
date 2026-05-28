"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 border border-blue-500/30"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-200">Available for innovative AI/ML roles</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6"
          >
            Hi, I'm <span className="text-gradient">Bhavin Baldota</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-slate-300 mb-8 leading-relaxed"
          >
            Lead Software Engineer (GenAI/ML) <br className="hidden md:block" />
            <span className="text-blue-400">@ Persistent</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Researcher in Deep Learning, Generative AI, LLMs, RAG Systems, and Computer Vision. I build state-of-the-art intelligent systems, co-founded AIoT Tech, and hold over <a href="https://www.linkedin.com/in/bhavin-baldota-103553234/details/certifications/" target="_blank" rel="noreferrer" className="font-bold text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-500/30 underline-offset-4">60+ technical certifications</a>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a
              href="#experience"
              className="group flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-blue-500/25"
            >
              <span>View Experience</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/bhavin-baldota-103553234/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-medium transition-all"
            >
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl z-0 pointer-events-none opacity-50 flex justify-center items-center">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen -ml-40 mt-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen ml-40 -mt-20"></div>
      </div>
    </section>
  );
}
