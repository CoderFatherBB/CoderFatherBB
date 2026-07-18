"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, LockKeyhole, Map, Sparkles } from "lucide-react";
import type { DiscoveryZone } from "./portfolioGameData";

type GameChapterViewProps = {
  zone: DiscoveryZone;
  zones: DiscoveryZone[];
  discoveredIds: string[];
  onBack: () => void;
  onSelectChapter: (zoneId: string) => void;
};

export function GameChapterView({
  zone,
  zones,
  discoveredIds,
  onBack,
  onSelectChapter,
}: GameChapterViewProps) {
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  return (
    <motion.main
      className="game-chapter-view"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      aria-labelledby="game-chapter-title"
    >
      <div className="game-chapter-sidebar">
        <button ref={backButtonRef} type="button" onClick={onBack} className="game-chapter-back">
          <ArrowLeft size={17} /> Back to map
        </button>

        <div className="game-chapter-nav-heading">
          <Map size={15} />
          <span>Chapters · {discoveredIds.length}/{zones.length} unlocked</span>
        </div>
        <p className="game-chapter-nav-help">Explore each map location to unlock its chapter.</p>

        <nav aria-label="All game chapters" className="game-chapter-nav">
          {zones.map((chapterZone) => {
            const isUnlocked = discoveredIds.includes(chapterZone.id);
            const isActive = chapterZone.id === zone.id;

            return (
              <button
                key={chapterZone.id}
                type="button"
                onClick={() => onSelectChapter(chapterZone.id)}
                className={`${isActive ? "is-active" : ""} ${isUnlocked ? "" : "is-locked"}`.trim()}
                aria-current={isActive ? "page" : undefined}
                aria-label={isUnlocked ? `${chapterZone.label} chapter` : `${chapterZone.label} chapter locked. Explore the map to unlock it.`}
                disabled={!isUnlocked}
              >
                <span className="game-chapter-nav-symbol">
                  {chapterZone.symbol}
                  {!isUnlocked && <LockKeyhole className="game-chapter-nav-lock" size={11} />}
                </span>
                <span>
                  <strong>{chapterZone.mapLabel}</strong>
                  <small>{isUnlocked ? chapterZone.label : "Locked · explore to unlock"}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="game-chapter-content">
        <div className="game-chapter-hero">
          <div>
            <p className="hud-label text-cyan-300">{zone.eyebrow}</p>
            <h2 id="game-chapter-title">{zone.chapterTitle}</h2>
            <p>{zone.chapterIntro}</p>
          </div>
          <div className="game-chapter-badge" aria-hidden="true">
            <span>{zone.symbol}</span>
            <small>{zone.mapLabel}</small>
          </div>
        </div>

        <div className="game-chapter-stats" aria-label={`${zone.label} highlights`}>
          {zone.chapterStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="game-chapter-sections">
          {zone.chapterSections.map((section) => (
            <section key={section.title}>
              <div className="game-chapter-section-title">
                <Sparkles size={16} />
                <h3>{section.title}</h3>
              </div>

              <div className="game-chapter-entry-grid">
                {section.entries.map((entry) => (
                  <article key={`${section.title}-${entry.title}`} className="game-chapter-entry">
                    <div className="game-chapter-entry-heading">
                      <Check size={16} />
                      <div>
                        <h4>{entry.title}</h4>
                        {entry.meta && <p>{entry.meta}</p>}
                      </div>
                    </div>
                    <p className="game-chapter-entry-description">{entry.description}</p>
                    {entry.tags && (
                      <div className="game-chapter-tags">
                        {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
