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
  const [isQuestOpen, setIsQuestOpen] = useState(false);
  const openQuest = useCallback(() => setIsQuestOpen(true), []);
  const closeQuest = useCallback(() => setIsQuestOpen(false), []);

  return (
    <main className="portfolio-shell min-h-screen">
      <Navbar onStartQuest={openQuest} />
      <Hero onStartQuest={openQuest} />
      <div className="portfolio-chapters">
        <Experience />
        <Education />
        <Publications />
        <Projects />
      </div>
      <Footer />
      <PortfolioGame isOpen={isQuestOpen} onClose={closeQuest} />
    </main>
  );
}
