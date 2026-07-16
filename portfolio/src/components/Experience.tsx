"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Briefcase, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

type Experience = {
  id: string;
  role: string;
  company: string;
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
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

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
              Select a card to expand details
            </p>
          </motion.div>

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0f1115] light:border-[#bae6fd] timeline-dot-bg -left-[13px] top-1 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"></div>
                
                <div
                  className={`glass-card relative overflow-hidden rounded-2xl border p-6 transition-[border-color,background-color,box-shadow] duration-200 md:p-8 ${expandedExp === exp.id ? "border-blue-500/50 exp-card-hover shadow-2xl shadow-blue-500/10" : "border-white/10"}`}
                >
                  <button
                    type="button"
                    aria-expanded={expandedExp === exp.id}
                    aria-controls={`experience-details-${exp.id}`}
                    onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                    className="w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
                  >
                    <div className="mb-4 flex flex-col justify-between md:flex-row md:items-start">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                          <Image
                            src={`/logos/${exp.logoId}.png`}
                            alt={`${exp.company} logo`}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold transition-colors md:text-2xl ${expandedExp === exp.id ? "text-blue-400" : "text-white"}`}>{exp.role}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-slate-300">
                            <Briefcase size={16} className="text-blue-400" />
                            <span>{exp.company}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-sm">{exp.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex h-fit shrink-0 items-center gap-3 md:mt-0">
                        <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-sm text-slate-400">
                          <Calendar size={14} />
                          <span>{exp.date}</span>
                        </span>
                        <ChevronDown
                          size={20}
                          className={`text-blue-300 transition-transform duration-200 ${expandedExp === exp.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                    <p className="mb-6 leading-relaxed text-slate-400">{exp.description}</p>
                  </button>

                  <div
                    id={`experience-details-${exp.id}`}
                    aria-hidden={expandedExp !== exp.id}
                    className={`experience-details-grid ${expandedExp === exp.id ? "is-open" : ""}`}
                  >
                    <div>
                      <div className="border-t border-white/10 pb-8 pt-4">
                        <div className="mb-4 flex items-center gap-3">
                          <BarChart className="text-blue-400" size={20} />
                          <h4 className="text-xl font-bold text-white">Key Projects & Contributions</h4>
                        </div>
                        <ul className="space-y-3">
                          {exp.metrics.map((metric) => (
                            <li key={metric} className="flex items-start gap-3 text-sm text-slate-300 md:text-base">
                              <ChevronRight size={18} className="mt-0.5 shrink-0 text-blue-500" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
