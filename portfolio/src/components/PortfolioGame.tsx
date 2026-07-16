"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ExternalLink,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

type PortfolioGameProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Choice = {
  label: string;
  isCorrect: boolean;
};

type Mission = {
  id: string;
  eyebrow: string;
  title: string;
  prompt: string;
  fact: string;
  sectionId: string;
  choices: Choice[];
};

const missions: Mission[] = [
  {
    id: "signal",
    eyebrow: "Signal 01 · Core profile",
    title: "Decode the engineer",
    prompt: "Which combination best describes Bhavin's current technical focus?",
    fact: "Bhavin works across Generative AI, multi-agent systems, RAG, computer vision, and production ML engineering.",
    sectionId: "about",
    choices: [
      { label: "Only frontend engineering", isCorrect: false },
      { label: "GenAI + ML systems + applied research", isCorrect: true },
      { label: "Only data reporting", isCorrect: false },
    ],
  },
  {
    id: "career",
    eyebrow: "Signal 02 · Career log",
    title: "Trace the production system",
    prompt: "Where did Bhavin help build an enterprise Text-to-SQL multi-agent platform?",
    fact: "At Persistent Systems, he has worked on multi-agent workflows spanning schema retrieval, SQL generation, data summarization, and dynamic visualization.",
    sectionId: "experience",
    choices: [
      { label: "Persistent Systems", isCorrect: true },
      { label: "Mahaveer Jr. College", isCorrect: false },
      { label: "Elsevier", isCorrect: false },
    ],
  },
  {
    id: "research",
    eyebrow: "Signal 03 · Research archive",
    title: "Recover the dataset",
    prompt: "How many images are documented across Bhavin's two published datasets?",
    fact: "The river pothole dataset contains 3,992 images and the coconut disease dataset contains 5,798—9,790 annotated images in total.",
    sectionId: "publications",
    choices: [
      { label: "4,200", isCorrect: false },
      { label: "9,790", isCorrect: true },
      { label: "60,000", isCorrect: false },
    ],
  },
  {
    id: "projects",
    eyebrow: "Signal 04 · Project vault",
    title: "Identify the learning agent",
    prompt: "Which project includes agents that learn Lunar Landing, pole balancing, and Mario?",
    fact: "Bhavin's Deep Reinforcement Learning repository explores game-playing and control agents built with PyTorch and Python.",
    sectionId: "projects",
    choices: [
      { label: "Offline OCR & Summary", isCorrect: false },
      { label: "Crop Doctor", isCorrect: false },
      { label: "Deep Reinforcement Learning", isCorrect: true },
    ],
  },
];

export default function PortfolioGame({ isOpen, onClose }: PortfolioGameProps) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const mission = missions[missionIndex];
  const progress = isComplete ? 100 : (missionIndex / missions.length) * 100;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("quest-active");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("quest-active");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const selectChoice = (choiceIndex: number) => {
    if (selectedChoice !== null) return;

    setSelectedChoice(choiceIndex);
    setScore((currentScore) =>
      currentScore + (mission.choices[choiceIndex].isCorrect ? 100 : 40),
    );
  };

  const continueMission = () => {
    if (missionIndex === missions.length - 1) {
      setIsComplete(true);
      return;
    }

    setMissionIndex((currentIndex) => currentIndex + 1);
    setSelectedChoice(null);
  };

  const restart = () => {
    setMissionIndex(0);
    setSelectedChoice(null);
    setScore(0);
    setIsComplete(false);
  };

  const closeAndExplore = (sectionId?: string) => {
    onClose();
    if (sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="quest-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quest-title"
        >
          <motion.div
            className="quest-window"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="quest-topbar">
              <div className="flex items-center gap-3">
                <span className="quest-live-dot" />
                <span className="hud-label">BB / PROFILE QUEST</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-slate-400 sm:inline">
                  XP {score.toString().padStart(3, "0")}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="quest-icon-button"
                  aria-label="Close profile quest"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {!isComplete ? (
              <div className="grid min-h-0 flex-1 lg:grid-cols-[0.65fr_1.35fr]">
                <aside className="quest-sidebar">
                  <p className="hud-label text-emerald-300">Mission map</p>
                  <div className="mt-7 space-y-5">
                    {missions.map((item, index) => {
                      const isCurrent = index === missionIndex;
                      const isDone = index < missionIndex;

                      return (
                        <div
                          key={item.id}
                          className={`quest-map-item ${isCurrent ? "is-current" : ""}`}
                        >
                          <span className={`quest-map-index ${isDone ? "is-done" : ""}`}>
                            {isDone ? <Check size={14} /> : String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {isDone ? "Signal decoded" : isCurrent ? "Active mission" : "Encrypted"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </aside>

                <motion.section
                  key={mission.id}
                  className="quest-content"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="hud-label text-cyan-300">{mission.eyebrow}</p>
                  <h2 id="quest-title" className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                    {mission.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                    {mission.prompt}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {mission.choices.map((choice, index) => {
                      const isSelected = selectedChoice === index;
                      const shouldRevealCorrect =
                        selectedChoice !== null && choice.isCorrect;

                      return (
                        <button
                          key={choice.label}
                          type="button"
                          onClick={() => selectChoice(index)}
                          disabled={selectedChoice !== null}
                          className={`quest-choice ${isSelected ? "is-selected" : ""} ${
                            shouldRevealCorrect ? "is-correct" : ""
                          }`}
                        >
                          <span className="quest-choice-key">{String.fromCharCode(65 + index)}</span>
                          <span>{choice.label}</span>
                          {shouldRevealCorrect && <Check className="ml-auto text-emerald-300" size={18} />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedChoice !== null && (
                      <motion.div
                        className="quest-reveal"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div>
                          <p className="hud-label text-emerald-300">Intel recovered</p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{mission.fact}</p>
                        </div>
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="button"
                            onClick={() => closeAndExplore(mission.sectionId)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                          >
                            Inspect full chapter <ExternalLink size={14} />
                          </button>
                          <button type="button" onClick={continueMission} className="quest-primary-button">
                            {missionIndex === missions.length - 1 ? "Complete quest" : "Next mission"}
                            <ArrowRight size={17} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              </div>
            ) : (
              <motion.div
                className="quest-complete"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="quest-complete-icon">
                  <Sparkles size={30} />
                </div>
                <p className="hud-label mt-7 text-emerald-300">Profile unlocked</p>
                <h2 id="quest-title" className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
                  You found the human<br />behind the systems.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                  Lead engineer. Applied AI researcher. Builder of production systems. Your final score is {score} XP—but the real story is in the work below.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={() => closeAndExplore("experience")} className="quest-primary-button">
                    Explore the full portfolio <ArrowRight size={17} />
                  </button>
                  <button type="button" onClick={restart} className="quest-secondary-button">
                    <RotateCcw size={16} /> Replay
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
