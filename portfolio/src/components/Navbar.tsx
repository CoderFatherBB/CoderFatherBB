"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Play, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

type NavbarProps = {
  onStartGame: () => void;
};

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Research", href: "#publications" },
  { name: "Projects", href: "#projects" },
];

export default function Navbar({ onStartGame }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 md:px-8 ${isScrolled ? "pt-3" : "pt-5"}`}
    >
      <div className={`nav-shell mx-auto flex max-w-7xl items-center justify-between ${isScrolled ? "is-scrolled" : ""}`}>
        <motion.a
          href="#about"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-300/10 font-mono text-xs font-bold text-blue-200">BB</span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-none text-white">Bhavin Baldota</span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">AI systems engineer</span>
          </span>
        </motion.a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartGame}
            className="nav-play-button"
            aria-label="Play portfolio exploration game"
          >
            <Play size={13} fill="currentColor" />
            <span className="hidden sm:inline">Play game</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-menu-button game-icon-button lg:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="nav-mobile-menu mx-auto mt-2 max-w-7xl lg:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex items-center gap-4 border-t border-white/10 px-4 pt-4 text-slate-400">
              <a href="https://github.com/CoderFatherBB" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/bhavin-baldota-103553234/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
              <a href="https://www.youtube.com/@YourFatherAI" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={21} /></a>
              <a href="https://www.instagram.com/yourfather_ai/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={20} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
