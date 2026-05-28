"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    name: "NLP Bank Complaints",
    description: "Natural Language Processing model to categorize and analyze banking complaints efficiently.",
    tech: ["NLP", "Machine Learning", "Data Science"],
    repo: "https://github.com/CoderFatherBB/Natural_Language_Processing"
  },
  {
    name: "Delivery Intelligence System",
    description: "AI-driven logistics routing system with proximity fraud prevention and Computer Vision delivery checks.",
    tech: ["FastAPI", "OpenCV", "MongoDB"],
    repo: "https://github.com/CoderFatherBB/Delivery-Intelligance-System"
  },
  {
    name: "Offline OCR & Summary",
    description: "Fully offline pipeline for handwritten text extraction and NLP-based summarization using Transformers.",
    tech: ["PyTorch", "HuggingFace", "Flask"],
    repo: "https://github.com/CoderFatherBB/Offline_OCR_and_Summary_Generation"
  },
  {
    name: "Deep Reinforcement Learning",
    description: "Advanced implementations of Lunar Landing, Pole Balancing, and automated Mario game playing agents.",
    tech: ["RL Algorithms", "PyTorch", "Python"],
    repo: "https://github.com/CoderFatherBB/Deep_Reinforcement_Learning"
  },
  {
    name: "Machine Learning Implementations",
    description: "Extensive repository of practical Machine Learning models, algorithms, and data science implementations.",
    tech: ["Scikit-learn", "Python", "Predictive Modeling"],
    repo: "https://github.com/CoderFatherBB/Machine_Learning"
  },
  {
    name: "Crop Doctor",
    description: "Deep learning agricultural assistant capable of diagnosing multi-crop diseases via CNNs on mobile edge.",
    tech: ["TensorFlow", "Keras", "Deep Learning"],
    repo: "https://github.com/CoderFatherBB/Crop-Doctor-Final-Year-Project-"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <a
            href="https://github.com/CoderFatherBB"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mt-4 md:mt-0"
          >
            <span>View All on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                  <FolderGit2 size={20} />
                </div>
                <a href={project.repo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2">
                  <FaGithub size={20} />
                </a>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.name}</h3>
              <p className="text-slate-400 leading-relaxed mb-6 flex-grow text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <a
            href="https://github.com/CoderFatherBB"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All Repositories</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
