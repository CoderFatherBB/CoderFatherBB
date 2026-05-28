"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "Vishwakarma University - VU",
    degree: "Bachelor of Technology - BTech, Artificial Intelligence",
    date: "Jun 2021 - Jun 2025",
    grade: "9.01 CGPA",
    domain: "vupune.ac.in",
    logoId: "vu",
    skills: ["Deep Learning", "Machine Learning", "Generative AI", "Computer Vision", "Natural Language Processing"]
  },
  {
    institution: "Mahaveer Jr. College",
    degree: "High School, Science",
    date: "Jun 2019 - May 2021",
    grade: "89.88%",
    domain: "mahaveercollege.org",
    logoId: "mahaveer",
    skills: ["Physics", "Chemistry", "Mathematics"]
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Academic <span className="text-blue-400">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-colors group flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-6">
                {/* Institution Logo */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  <img 
                    src={`/logos/${edu.logoId}.png`} 
                    alt={edu.institution}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (!e.currentTarget.src.includes('clearbit') && !e.currentTarget.src.includes('ui-avatars')) {
                        e.currentTarget.src = `https://logo.clearbit.com/${edu.domain}`;
                      } else if (e.currentTarget.src.includes('clearbit')) {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(edu.institution)}&background=0D8ABC&color=fff`;
                      }
                    }}
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {edu.institution}
                  </h3>
                  <p className="text-blue-300 font-medium mt-2">{edu.degree}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 text-sm text-slate-400 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-slate-400" />
                  <span>{edu.date}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-medium bg-white/5 px-3 py-1 rounded-full">
                  <Award size={16} className="text-yellow-400" />
                  <span>Grade: {edu.grade}</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill, i) => (
                    <span key={i} className="text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
