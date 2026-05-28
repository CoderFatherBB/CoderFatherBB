"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, X, ChevronRight, BarChart } from "lucide-react";

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
    id: "aiot",
    role: "Co-Founder",
    company: "AIoT Tech",
    domain: "aiot.com",
    logoId: "aiot",
    date: "Feb 2024 - Jul 2025",
    type: "Self-employed | Hybrid",
    description: "Co-founded startup specializing in AI/ML solutions. Delivered tailored predictive analytics and computer vision solutions for industry clients. Directed engineering team.",
    skills: ["Start-up Leadership", "Project Management", "Predictive Analytics"],
    metrics: [
      "Secured $50K+ in early-stage contracts by delivering bespoke computer vision solutions to 4 B2B clients.",
      "Managed the end-to-end product lifecycle, accelerating MVP delivery times by 35% through agile methodologies.",
      "Directed a team of 6 developers, fostering a culture of rapid innovation and maintaining a 0% churn rate."
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
  },
  {
    id: "provilac-dev",
    role: "Software Developer",
    company: "Provilac Milk",
    domain: "provilac.com",
    logoId: "provilac",
    date: "Jun 2020 - Sep 2023",
    type: "Full-time | On-site",
    description: "Worked as a Python Software Developer focusing on backend development, automation, and operational software solutions.",
    skills: ["Python", "APIs", "Backend Development", "SQL", "Flask/FastAPI", "Data Processing"],
    metrics: [
      "Developed Python-based backend utilities and automation scripts.",
      "Worked on data processing, API integrations, backend workflows, and operational dashboards.",
      "Assisted in maintaining and improving internal software systems.",
      "Collaborated with teams to improve operational efficiency using automation."
    ]
  }
];

export default function Experience() {
  const [activeExp, setActiveExp] = useState<Experience | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (activeExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeExp]);

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
            <p className="mt-4 text-white/50 tracking-widest text-sm uppercase">Click cards to expand details</p>
          </motion.div>

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                layoutId={`card-container-${exp.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 cursor-pointer group"
                onClick={() => setActiveExp(exp)}
              >
                {/* Timeline dot */}
                <div className="absolute w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0f1115] -left-[13px] top-1 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                
                <motion.div 
                  layoutId={`card-${exp.id}`}
                  className="glass-card rounded-2xl p-6 md:p-8 hover:border-blue-500/50 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* Company Logo Thumbnail */}
                      <motion.div 
                        layoutId={`logo-${exp.id}`}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0"
                      >
                        <img 
                          src={`/logos/${exp.logoId}.png`} 
                          alt={exp.company}
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
                        <motion.h3 layoutId={`title-${exp.id}`} className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</motion.h3>
                        <motion.div layoutId={`subtitle-${exp.id}`} className="flex items-center space-x-2 text-slate-300 mt-1 font-medium">
                          <Briefcase size={16} className="text-blue-400" />
                          <span>{exp.company}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-sm">{exp.type}</span>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div layoutId={`date-${exp.id}`} className="flex items-center space-x-2 text-slate-400 text-sm mt-4 md:mt-0 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 h-fit">
                      <Calendar size={14} />
                      <span>{exp.date}</span>
                    </motion.div>
                  </div>
                  
                  <motion.p layoutId={`desc-${exp.id}`} className="text-slate-400 leading-relaxed mb-6">{exp.description}</motion.p>
                  
                  <motion.div layoutId={`skills-${exp.id}`} className="flex flex-wrap gap-2">
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

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {activeExp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
              onClick={() => setActiveExp(null)}
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={`card-${activeExp.id}`}
                className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto relative shadow-2xl shadow-blue-500/20 border border-blue-500/30"
                style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(4, 11, 22, 0.98) 100%)' }}
              >
                <button 
                  onClick={() => setActiveExp(null)}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 z-10"
                >
                  <X size={20} className="text-white" />
                </button>

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
                    {/* Enlarged Logo */}
                    <motion.div 
                      layoutId={`logo-${activeExp.id}`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-blue-500/20"
                    >
                      <img 
                        src={`/logos/${activeExp.logoId}.png`} 
                        alt={activeExp.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (!e.currentTarget.src.includes('clearbit') && !e.currentTarget.src.includes('ui-avatars')) {
                            e.currentTarget.src = `https://logo.clearbit.com/${activeExp.domain}`;
                          } else if (e.currentTarget.src.includes('clearbit')) {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeExp.company)}&background=0D8ABC&color=fff`;
                          }
                        }}
                      />
                    </motion.div>
                    
                    <div>
                      <motion.h3 layoutId={`title-${activeExp.id}`} className="text-3xl md:text-5xl font-bold text-white mb-2">{activeExp.role}</motion.h3>
                      <motion.div layoutId={`subtitle-${activeExp.id}`} className="flex items-center space-x-3 text-blue-300 text-lg md:text-xl font-medium mb-4">
                        <Briefcase size={20} />
                        <span>{activeExp.company}</span>
                        <span className="text-white/20">•</span>
                        <span>{activeExp.type}</span>
                      </motion.div>
                      <motion.div layoutId={`date-${activeExp.id}`} className="flex items-center space-x-2 text-slate-400 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                        <Calendar size={16} />
                        <span>{activeExp.date}</span>
                      </motion.div>
                    </div>
                  </div>

                  <motion.p layoutId={`desc-${activeExp.id}`} className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-blue-500 pl-4">
                    {activeExp.description}
                  </motion.p>

                  {/* Quantitative Details Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mb-10"
                  >
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <BarChart className="text-blue-400" size={24} />
                      <h4 className="text-2xl font-bold text-white">Key Projects & Contributions</h4>
                    </div>
                    
                    <ul className="space-y-4">
                      {activeExp.metrics.map((metric, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                          className="flex items-start gap-4 text-slate-300"
                        >
                          <ChevronRight size={20} className="text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-lg">{metric}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div layoutId={`skills-${activeExp.id}`} className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                    {activeExp.skills.map((skill, i) => (
                      <span key={i} className="text-sm font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
