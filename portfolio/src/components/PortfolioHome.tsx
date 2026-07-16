"use client";

import { useCallback, useState } from "react";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PortfolioGame from "@/components/PortfolioGame";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";

export default function PortfolioHome() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const openGame = useCallback(() => setIsGameOpen(true), []);
  const closeGame = useCallback(() => setIsGameOpen(false), []);

  return (
    <main className="portfolio-shell min-h-screen">
      <Navbar onStartGame={openGame} />
      <Hero onStartGame={openGame} />
      <div className="portfolio-chapters">
        <Experience />
        <Education />
        <Publications />
        <Projects />
      </div>
      <Footer />
      <PortfolioGame isOpen={isGameOpen} onClose={closeGame} />
    </main>
  );
}
