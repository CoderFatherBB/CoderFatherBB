"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Publications", href: "#publications" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-display font-bold text-gradient"
        >
          Bhavin<span className="text-white">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-700"
          >
            <a href="https://github.com/CoderFatherBB" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/bhavin-baldota-103553234/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#0a66c2] transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@YourFatherAI" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#ff0000] transition-colors">
              <FaYoutube size={22} />
            </a>
            <a href="https://www.instagram.com/yourfather_ai/" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#e1306c] transition-colors">
              <FaInstagram size={21} />
            </a>
          </motion.div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-white/10 mt-4 px-6 py-4 flex flex-col space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-blue-400"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
