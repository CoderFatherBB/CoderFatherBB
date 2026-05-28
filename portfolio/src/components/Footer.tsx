"use client";

import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black/40 pt-16 pb-8 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-display font-bold text-gradient mb-2">Bhavin Baldota</h2>
            <p className="text-slate-400 text-sm max-w-sm">
              Lead Software Engineer in GenAI/ML. Building the future of intelligent systems.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="mailto:bhavinbaldota15@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-blue-500 hover:text-white transition-all">
              <Mail size={18} />
            </a>
            <a href="https://github.com/CoderFatherBB" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-white hover:text-black transition-all">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/bhavin-baldota-103553234/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#0a66c2] hover:text-white transition-all">
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.youtube.com/@YourFatherAI" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#ff0000] hover:text-white transition-all">
              <FaYoutube size={18} />
            </a>
            <a href="https://www.instagram.com/yourfather_ai/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#e1306c] hover:text-white transition-all">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Bhavin Baldota. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
