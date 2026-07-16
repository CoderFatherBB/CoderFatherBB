"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, BarChart } from "lucide-react";
import Image from "next/image";

type Experience = {
  id: string;
  role: string;
  company: string;
  domain: string;
  logoId: string;
  date: string;
  type: string;
  description: string;
  skills: string[];
  metrics: string[];
};

const experiences: Experience[] = [
  {
    id: "persistent",
    role: "Lead Software Engineer (GenAI/ML)",
    company: "Persistent Systems",
    domain: "persistent.com",
    logoId: "persistent",
    date: "Sep 2025 - Present",
    type: "Full-time | Hybrid",
    description: "Worked on enterprise-scale Generative AI and multi-agent AI systems focused on intelligent analytics, business automation, and conversational data access.",
    skills: ["Python", "FastAPI", "LangChain", "LLMs", "SQL", "PostgreSQL", "Multi-Agent Systems", "RAG", "Docker", "REST APIs"],
    metrics: [
      "Contributed to a Text-to-SQL Conversational AI Platform for enterprise users to interact with databases using natural language.",
      "Developed a multi-agent AI workflow handling query understanding, schema retrieval, SQL generation, and data summarization.",
      "Built a Text-to-SQL engine using LLMs with prompt engineering and database-aware context injection.",
      "Designed a dynamic Python visualization engine that automatically generated graphs/charts based on returned query data.",
      "Used FastAPI-based microservices for modular deployment, orchestration, and asynchronous communication."
    ]
  },
  {
    id: "mit",
    role: "Expert Collaborator & AI Mentor",
    company: "MIT World Peace University",
    domain: "mitwpu.edu.in",
    logoId: "mitwpu",
    date: "Apr 2025 - Dec 2025",
    type: "Freelance | Hybrid",
    description: "Worked on advanced AI/ML systems and real-world applied research projects focused on automation, intelligent analytics, and deep learning applications.",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Deep Learning", "Machine Learning", "Data Analytics"],
    metrics: [
      "Built AI-driven proof-of-concept systems for industrial and enterprise use cases.",
      "Developed end-to-end ML pipelines including data preprocessing, feature engineering, model training, and deployment.",
      "Collaborated on research-oriented experimentation involving Generative AI, Transformer architectures, and applied neural networks.",
      "Conducted comparative model analysis and optimization for production-ready deployment."
    ]
  },
  {
    id: "provilac-ai",
    role: "AI / ML Engineer",
    company: "Provilac Milk",
    domain: "provilac.com",
    logoId: "provilac",
    date: "Nov 2024 - Aug 2025",
    type: "Full-time | On-site",
    description: "Worked on multiple AI and Machine Learning projects aimed at improving operational intelligence, delivery validation, and logistics optimization.",
    skills: ["Python", "OpenCV", "YOLO", "FastAPI", "LangChain", "RAG", "Vector Databases", "Pandas", "APIs"],
    metrics: [
      "Delivery Personnel Proximity Validation: Built an AI-driven system using GPS analytics to validate delivery locations.",
      "Distance Tracking & Route Analysis: Developed a system using spatial analysis to optimize travel and monitor performance.",
      "Object Detection & Delivery Identification: Built workflows using Computer Vision to verify delivered products matched customer orders.",
      "LLM & RAG-Based Customer Support Chatbot: Designed architecture for a full-stack chatbot capable of subscription management and ticket raising."
    ]
  },
  {
    id: "drdo",
    role: "Research Intern",
    company: "DRDO, Ministry of Defence",
    domain: "drdo.gov.in",
    logoId: "drdo",
    date: "Jul 2024 - Dec 2024",
    type: "Internship | Hybrid",
    description: "Worked on AI and Machine Learning-based audio intelligence systems focused on perception, localization, and signal understanding applications.",
    skills: ["Python", "Audio Signal Processing", "TensorFlow", "PyTorch", "Spectrogram Analysis", "NumPy"],
    metrics: [
      "Developed models capable of audio source identification, sound direction estimation, and environmental audio analysis.",
      "Performed preprocessing and feature extraction on audio datasets using signal processing techniques.",
      "Experimented with Deep Learning architectures for audio classification and localization tasks.",
      "Conducted research and benchmarking for defense-oriented intelligent sensing applications."
    ]
  },
  {
    id: "vu",
    role: "Research And Development Intern",
    company: "Vishwakarma University - VU",
    domain: "vupune.ac.in",
    logoId: "vu",
    date: "Jul 2023 - Jan 2024",
    type: "Internship | Hybrid",
    description: "Worked on AI and ML research initiatives focused on solving real-world problems using intelligent systems.",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning", "Data Analytics"],
    metrics: [
      "Worked on research-oriented projects involving disease detection systems, predictive analytics, and intelligent automation.",
      "Developed and trained ML/DL models with 90%+ accuracy on selected datasets.",
      "Worked on data collection, cleaning, annotation, feature engineering, and model evaluation.",
      "Contributed to technical research documentation and publications."
    ]
  }
];

export default function Experience() {
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);

  return (
    <>
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Professional <span className="text-blue-400">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <p className="mt-4 text-white/50 tracking-widest text-sm uppercase">
              <span className="hidden md:inline">Hover</span><span className="inline md:hidden">Tap</span> cards to expand details
            </p>
          </motion.div>

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 cursor-pointer"
                onHoverStart={() => setHoveredExp(exp.id)}
                onHoverEnd={() => setHoveredExp(null)}
                onClick={() => setHoveredExp(hoveredExp === exp.id ? null : exp.id)}
              >
                {/* Timeline dot */}
                <div className="absolute w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0f1115] light:border-[#bae6fd] timeline-dot-bg -left-[13px] top-1 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"></div>
                
                <motion.div 
                  layout
                  className={`glass-card rounded-2xl p-6 md:p-8 transition-all duration-300 overflow-hidden relative ${hoveredExp === exp.id ? 'border-blue-500/50 exp-card-hover shadow-2xl shadow-blue-500/10' : 'border-white/10'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* Company Logo Thumbnail */}
                      <motion.div 
                        layout
                        className={`${hoveredExp === exp.id ? 'w-20 h-20 md:w-24 md:h-24 shadow-lg shadow-blue-500/20' : 'w-12 h-12'} rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300`}
                      >
                        <Image
                          src={`/logos/${exp.logoId}.png`} 
                          alt={exp.company}
                          width={96}
                          height={96}
                          unoptimized
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (!e.currentTarget.src.includes('clearbit') && !e.currentTarget.src.includes('ui-avatars')) {
                              e.currentTarget.src = `https://logo.clearbit.com/${exp.domain}`;
                            } else if (e.currentTarget.src.includes('clearbit')) {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=0D8ABC&color=fff`;
                            }
                          }}
                        />
                      </motion.div>
                      <div>
                        <motion.h3 layout className={`text-xl md:text-2xl font-bold transition-colors ${hoveredExp === exp.id ? 'text-blue-400' : 'text-white'}`}>{exp.role}</motion.h3>
                        <motion.div layout className="flex items-center space-x-2 text-slate-300 mt-1 font-medium">
                          <Briefcase size={16} className="text-blue-400" />
                          <span>{exp.company}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-sm">{exp.type}</span>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div layout className="flex items-center space-x-2 text-slate-400 text-sm mt-4 md:mt-0 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 h-fit shrink-0">
                      <Calendar size={14} />
                      <span>{exp.date}</span>
                    </motion.div>
                  </div>
                  
                  <motion.p layout className="text-slate-400 leading-relaxed mb-6">{exp.description}</motion.p>
                  
                  <AnimatePresence>
                    {hoveredExp === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-8 border-t border-white/10">
                          <div className="flex items-center gap-3 mb-4">
                            <BarChart className="text-blue-400" size={20} />
                            <h4 className="text-xl font-bold text-white">Key Projects & Contributions</h4>
                          </div>
                          <ul className="space-y-3">
                            {exp.metrics.map((metric, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05) }}
                                className="flex items-start gap-3 text-slate-300 text-sm md:text-base"
                              >
                                <ChevronRight size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                <span>{metric}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div layout className="flex flex-wrap gap-2 mt-auto">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
