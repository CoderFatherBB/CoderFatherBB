"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  Gamepad2,
  LockKeyhole,
  Map,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { GameChapterView } from "./GameChapterView";
import { discoveryZones, type Point } from "./portfolioGameData";

type PortfolioGameProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Direction = "up" | "down" | "left" | "right";

type ZoneFeedback = {
  id: string;
  label: string;
};

const WORLD_WIDTH = 1280;
const WORLD_HEIGHT = 720;
const PLAYER_SIZE = 42;
const DISCOVERY_RADIUS = 112;
const START_POSITION = { x: 390, y: 330 };

const portalPosition = { x: 1120, y: 550 };

const movementKeys: Record<string, Direction> = {
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
};

const directionVectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function distanceBetween(first: Point, second: Point) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function PortfolioGame({ isOpen, onClose }: PortfolioGameProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [player, setPlayer] = useState<Point>(START_POSITION);
  const [facing, setFacing] = useState<Direction>("down");
  const [isMoving, setIsMoving] = useState(false);
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);
  const [zoneFeedback, setZoneFeedback] = useState<ZoneFeedback | null>(null);
  const [stageSize, setStageSize] = useState({ width: 840, height: 560 });
  const stageRef = useRef<HTMLDivElement>(null);
  const pressedDirectionsRef = useRef<Set<Direction>>(new Set());
  const playerRef = useRef<Point>(START_POSITION);
  const discoveredIdsRef = useRef<string[]>([]);
  const zoneFeedbackTimeoutRef = useRef<number | null>(null);

  const playerCenter = useMemo(() => ({
    x: player.x + PLAYER_SIZE / 2,
    y: player.y + PLAYER_SIZE / 2,
  }), [player]);
  const activeZone = useMemo(() => discoveryZones.find(
    (zone) => distanceBetween(playerCenter, zone.position) <= DISCOVERY_RADIUS,
  ) ?? null, [playerCenter]);
  const isNearPortal = useMemo(
    () => distanceBetween(playerCenter, portalPosition) <= DISCOVERY_RADIUS,
    [playerCenter],
  );
  const progress = (discoveredIds.length / discoveryZones.length) * 100;
  const portalUnlocked = discoveredIds.length === discoveryZones.length;
  const openChapter = discoveryZones.find((zone) => zone.id === openChapterId) ?? null;

  const camera = useMemo(() => {
    const targetX = stageSize.width / 2 - (player.x + PLAYER_SIZE / 2);
    const targetY = stageSize.height / 2 - (player.y + PLAYER_SIZE / 2);

    return {
      x: clamp(targetX, Math.min(0, stageSize.width - WORLD_WIDTH), 0),
      y: clamp(targetY, Math.min(0, stageSize.height - WORLD_HEIGHT), 0),
    };
  }, [player, stageSize]);

  useEffect(() => {
    if (!isOpen || !stageRef.current) return;

    const stage = stageRef.current;
    const updateStageSize = () => {
      setStageSize({ width: stage.clientWidth, height: stage.clientHeight });
    };
    const resizeObserver = new ResizeObserver(updateStageSize);

    updateStageSize();
    resizeObserver.observe(stage);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  useEffect(() => () => {
    if (zoneFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(zoneFeedbackTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let animationFrame = 0;
    let previousTime = performance.now();
    const pressedDirections = pressedDirectionsRef.current;

    const updatePlayerPosition = (horizontalDelta: number, verticalDelta: number) => {
      const currentPlayer = playerRef.current;
      const nextPlayer = {
        x: clamp(currentPlayer.x + horizontalDelta, 24, WORLD_WIDTH - PLAYER_SIZE - 24),
        y: clamp(currentPlayer.y + verticalDelta, 24, WORLD_HEIGHT - PLAYER_SIZE - 24),
      };
      const nextCenter = {
        x: nextPlayer.x + PLAYER_SIZE / 2,
        y: nextPlayer.y + PLAYER_SIZE / 2,
      };
      const nearbyZone = discoveryZones.find(
        (zone) => distanceBetween(nextCenter, zone.position) <= DISCOVERY_RADIUS,
      );

      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);

      if (nearbyZone && !discoveredIdsRef.current.includes(nearbyZone.id)) {
        const nextDiscoveredIds = [...discoveredIdsRef.current, nearbyZone.id];
        discoveredIdsRef.current = nextDiscoveredIds;
        setDiscoveredIds(nextDiscoveredIds);
      }

      if (
        discoveredIdsRef.current.length === discoveryZones.length &&
        distanceBetween(nextCenter, portalPosition) <= DISCOVERY_RADIUS
      ) {
        setIsComplete(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (openChapterId) setOpenChapterId(null);
        else onClose();
        return;
      }

      const direction = movementKeys[event.key];
      if (direction && hasStarted && !isComplete && !openChapterId) {
        event.preventDefault();
        pressedDirections.add(direction);
        setFacing(direction);
        setIsMoving(true);

        if (!event.repeat) {
          const vector = directionVectors[direction];
          updatePlayerPosition(vector.x * 16, vector.y * 16);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const direction = movementKeys[event.key];
      if (direction) {
        pressedDirections.delete(direction);
        if (pressedDirections.size === 0) setIsMoving(false);
      }
    };

    const movePlayer = (time: number) => {
      const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      if (hasStarted && !isComplete && !openChapterId && pressedDirections.size > 0) {
        let horizontal = 0;
        let vertical = 0;

        pressedDirections.forEach((direction) => {
          horizontal += directionVectors[direction].x;
          vertical += directionVectors[direction].y;
        });

        const vectorLength = Math.hypot(horizontal, vertical) || 1;
        const speed = 235 * elapsedSeconds;

        updatePlayerPosition(
          (horizontal / vectorLength) * speed,
          (vertical / vectorLength) * speed,
        );
      }

      animationFrame = window.requestAnimationFrame(movePlayer);
    };

    const handleWindowBlur = () => {
      pressedDirections.clear();
      setIsMoving(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("game-active");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);
    animationFrame = window.requestAnimationFrame(movePlayer);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("game-active");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      pressedDirections.clear();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [hasStarted, isComplete, isOpen, onClose, openChapterId]);

  const setDirectionPressed = (direction: Direction, isPressed: boolean) => {
    if (isPressed) {
      pressedDirectionsRef.current.add(direction);
      setFacing(direction);
      setIsMoving(true);
    } else {
      pressedDirectionsRef.current.delete(direction);
      if (pressedDirectionsRef.current.size === 0) setIsMoving(false);
    }
  };

  const restart = () => {
    if (zoneFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(zoneFeedbackTimeoutRef.current);
      zoneFeedbackTimeoutRef.current = null;
    }
    setPlayer(START_POSITION);
    playerRef.current = START_POSITION;
    setFacing("down");
    setIsMoving(false);
    setDiscoveredIds([]);
    discoveredIdsRef.current = [];
    setIsComplete(false);
    setOpenChapterId(null);
    setZoneFeedback(null);
    setHasStarted(true);
  };

  const showChapter = (zoneId: string) => {
    if (zoneFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(zoneFeedbackTimeoutRef.current);
      zoneFeedbackTimeoutRef.current = null;
    }
    pressedDirectionsRef.current.clear();
    setIsMoving(false);
    setZoneFeedback(null);
    setOpenChapterId(zoneId);
  };

  const handleZoneClick = (zoneId: string, mapLabel: string, isDiscovered: boolean) => {
    if (isDiscovered) {
      showChapter(zoneId);
      return;
    }

    if (zoneFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(zoneFeedbackTimeoutRef.current);
    }

    setZoneFeedback({ id: zoneId, label: mapLabel });
    zoneFeedbackTimeoutRef.current = window.setTimeout(() => {
      setZoneFeedback(null);
      zoneFeedbackTimeoutRef.current = null;
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="game-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Bhavin's AI Lab exploration game"
        >
          <motion.div
            className="game-window"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <header className="game-topbar">
              <div className="flex items-center gap-3">
                <span className="game-live-dot" />
                <div>
                  <p className="hud-label text-blue-200">Bhavin&apos;s AI Lab</p>
                  <p className="hidden text-[10px] text-slate-500 sm:block">Exploration build · BB-1506</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 sm:flex">
                  <Map size={14} className="text-blue-300" />
                  <span className="font-mono text-xs text-slate-400">{discoveredIds.length}/{discoveryZones.length} fragments</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenChapterId(null);
                    onClose();
                  }}
                  className="game-icon-button"
                  aria-label="Close exploration game"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="game-progress-track">
              <motion.div className="game-progress-value" animate={{ width: `${progress}%` }} />
            </div>

            <div className="game-content-stack">
            <div className="game-layout" aria-hidden={openChapter ? true : undefined}>
              <div ref={stageRef} className="game-stage" aria-label="Explore Bhavin's AI Lab with arrow keys or WASD">
                <motion.div
                  className="game-world"
                  style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
                  animate={{ x: camera.x, y: camera.y }}
                  transition={{ type: "spring", damping: 32, stiffness: 260, mass: 0.55 }}
                >
                  <div className="game-grid-floor" />
                  <div className="game-path game-path-horizontal" />
                  <div className="game-path game-path-vertical" />
                  <div className="game-room-outline room-one" />
                  <div className="game-room-outline room-two" />
                  <div className="game-room-outline room-three" />

                  {discoveryZones.map((zone) => {
                    const isDiscovered = discoveredIds.includes(zone.id);
                    const isActive = activeZone?.id === zone.id;

                    return (
                      <button
                        type="button"
                        key={zone.id}
                        className={`game-zone game-fragment-zone ${isDiscovered ? "is-discovered" : ""} ${isActive ? "is-active" : ""}`}
                        style={{ left: zone.position.x, top: zone.position.y }}
                        onClick={() => handleZoneClick(zone.id, zone.mapLabel, isDiscovered)}
                        aria-label={`${zone.mapLabel} fragment. ${isDiscovered ? "Unlocked. Open chapter." : "Locked. Move closer to unlock."}`}
                      >
                        <div className="game-zone-beacon" />
                        <div className="game-zone-building">
                          <span className="game-zone-symbol">{isDiscovered ? <Check size={19} /> : zone.symbol}</span>
                          <span className="hud-label">{zone.mapLabel}</span>
                        </div>
                        {isActive && <span className="game-zone-prompt">Fragment collected</span>}
                      </button>
                    );
                  })}

                  <div
                    className={`game-zone game-portal ${portalUnlocked ? "is-unlocked" : ""} ${isNearPortal ? "is-active" : ""}`}
                    style={{ left: portalPosition.x, top: portalPosition.y }}
                  >
                    <div className="game-zone-beacon" />
                    <div className="game-portal-core">
                      {portalUnlocked ? <Sparkles size={24} /> : <LockKeyhole size={22} />}
                    </div>
                    <span className="hud-label">EXIT</span>
                    {isNearPortal && (
                      <span className="game-zone-prompt">
                        {portalUnlocked ? "Enter the portal" : `${discoveryZones.length - discoveredIds.length} fragments required`}
                      </span>
                    )}
                  </div>

                  <div
                    className={`game-player facing-${facing} ${isMoving ? "is-moving" : ""}`}
                    style={{ transform: `translate3d(${player.x}px, ${player.y}px, 0)` }}
                    aria-label="Player"
                  >
                    <span className="game-player-shadow" />
                    <span className="game-player-body">BB</span>
                    <span className="game-player-sensor" />
                  </div>
                </motion.div>

                <div className="game-stage-hud">
                  <div>
                    <p className="hud-label text-blue-200">Current objective</p>
                    <p className="mt-1 text-xs text-white">
                      {portalUnlocked ? "Reach the exit portal" : "Explore the glowing locations"}
                    </p>
                  </div>
                  <div className="game-key-hint">
                    <span>W</span><span>A</span><span>S</span><span>D</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {zoneFeedback && (
                    <motion.div
                      key={zoneFeedback.id}
                      className="game-zone-feedback"
                      role="status"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    >
                      <LockKeyhole size={16} />
                      <span><strong>{zoneFeedback.label}</strong> is too far away. Move closer to unlock it.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="game-mobile-controls" aria-label="Movement controls">
                  <button
                    type="button"
                    aria-label="Move up"
                    onPointerDown={() => setDirectionPressed("up", true)}
                    onPointerUp={() => setDirectionPressed("up", false)}
                    onPointerCancel={() => setDirectionPressed("up", false)}
                    onPointerLeave={() => setDirectionPressed("up", false)}
                  ><ArrowUp size={20} /></button>
                  <button
                    type="button"
                    aria-label="Move left"
                    onPointerDown={() => setDirectionPressed("left", true)}
                    onPointerUp={() => setDirectionPressed("left", false)}
                    onPointerCancel={() => setDirectionPressed("left", false)}
                    onPointerLeave={() => setDirectionPressed("left", false)}
                  ><ArrowLeft size={20} /></button>
                  <button
                    type="button"
                    aria-label="Move down"
                    onPointerDown={() => setDirectionPressed("down", true)}
                    onPointerUp={() => setDirectionPressed("down", false)}
                    onPointerCancel={() => setDirectionPressed("down", false)}
                    onPointerLeave={() => setDirectionPressed("down", false)}
                  ><ArrowDown size={20} /></button>
                  <button
                    type="button"
                    aria-label="Move right"
                    onPointerDown={() => setDirectionPressed("right", true)}
                    onPointerUp={() => setDirectionPressed("right", false)}
                    onPointerCancel={() => setDirectionPressed("right", false)}
                    onPointerLeave={() => setDirectionPressed("right", false)}
                  ><ArrowRight size={20} /></button>
                </div>

                {activeZone && hasStarted && !isComplete && (
                  <button
                    type="button"
                    onClick={() => showChapter(activeZone.id)}
                    className="game-mobile-fragment-button"
                  >
                    <BookOpen size={16} /> View {activeZone.mapLabel} chapter
                  </button>
                )}

                <AnimatePresence>
                  {!hasStarted && (
                    <motion.div className="game-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div className="game-intro-card" initial={{ y: 16 }} animate={{ y: 0 }}>
                        <div className="game-intro-icon"><Gamepad2 size={28} /></div>
                        <p className="hud-label mt-5 text-blue-300">Exploration mode</p>
                        <h2 id="game-title" className="mt-3 text-3xl font-semibold text-white md:text-5xl">Enter Bhavin&apos;s AI Lab</h2>
                        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-300 md:text-base">
                          Move through the lab, approach five glowing locations, and collect the story fragments hidden inside. No quiz—just explore.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
                          <span className="game-instruction-chip">WASD / arrows to move</span>
                          <span className="game-instruction-chip">Touch controls on mobile</span>
                        </div>
                        <button type="button" onClick={() => setHasStarted(true)} className="game-primary-button mt-7">
                          Enter the lab <ArrowRight size={17} />
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isComplete && (
                    <motion.div className="game-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.div className="game-intro-card" initial={{ scale: 0.97 }} animate={{ scale: 1 }}>
                        <div className="game-intro-icon"><Sparkles size={28} /></div>
                        <p className="hud-label mt-5 text-blue-300">Exploration complete</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">You mapped the whole lab.</h2>
                        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-300 md:text-base">
                          You found Bhavin&apos;s career, research, projects, technical stack, and the person connecting all of it.
                        </p>
                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                          <button type="button" onClick={() => showChapter("career")} className="game-primary-button">
                            Review recovered chapters <BookOpen size={16} />
                          </button>
                          <button type="button" onClick={restart} className="game-secondary-button">
                            <RotateCcw size={16} /> Explore again
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <aside className="game-discovery-panel" aria-live="polite">
                <div className="flex items-center justify-between">
                  <p className="hud-label text-blue-300">Discovery log</p>
                  <span className="font-mono text-[10px] text-slate-500">{Math.round(progress)}%</span>
                </div>

                <AnimatePresence mode="wait">
                  {activeZone ? (
                    <motion.div key={activeZone.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                      <p className="hud-label mt-8 text-cyan-300">{activeZone.eyebrow}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{activeZone.label}</h3>
                      <p className="mt-4 text-sm leading-6 text-slate-400">{activeZone.description}</p>
                      <ul className="mt-6 space-y-3">
                        {activeZone.facts.map((fact) => (
                          <li key={fact} className="flex gap-3 text-sm text-slate-300">
                            <Check size={15} className="mt-0.5 shrink-0 text-blue-300" />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => showChapter(activeZone.id)} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200">
                        Open full chapter <BookOpen size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="game-log-empty">
                      <Map size={25} className="text-blue-300" />
                      <h3 className="mt-5 text-lg font-semibold text-white">Nothing in range</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">Move toward a pulsing blue location to recover a profile fragment.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="game-fragment-list">
                  {discoveryZones.map((zone) => {
                    const isDiscovered = discoveredIds.includes(zone.id);
                    return (
                      <div key={zone.id} className={isDiscovered ? "is-discovered" : ""}>
                        <span>{isDiscovered ? <Check size={12} /> : "·"}</span>
                        <span>{zone.mapLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </aside>
            </div>
              <AnimatePresence>
                {openChapter && (
                  <GameChapterView
                    key={`chapter-${openChapter.id}`}
                    zone={openChapter}
                    zones={discoveryZones}
                    discoveredIds={discoveredIds}
                    onBack={() => setOpenChapterId(null)}
                    onSelectChapter={showChapter}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
