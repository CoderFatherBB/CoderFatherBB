"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ACHIEVEMENTS, CERTIFICATIONS, EXPERIENCE, NAV, PROFILE, PROJECTS, RESEARCH, SKILL_GROUPS } from "@/lib/data";
import TechLogo from "./TechLogo";

const subscribeTheme = (callback: () => void) => {
  window.addEventListener("portfolio-theme", callback);
  const storage = (event: StorageEvent) => { if (event.key === "portfolio-theme") { document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light"; callback(); } };
  window.addEventListener("storage", storage);
  return () => { window.removeEventListener("portfolio-theme", callback); window.removeEventListener("storage", storage); };
};
function ThemeButton() {
  const theme = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme || "light", () => "light");
  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme still works without storage. */ }
    window.dispatchEvent(new Event("portfolio-theme"));
  }
  return <button type="button" className="theme-button" onClick={toggle} aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`}><span aria-hidden="true">{theme === "light" ? "◐" : "☼"}</span></button>;
}

function Navigation() {
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -55% 0px" });
    ["Home", ...NAV].forEach(item => { const el = document.getElementById(item.toLowerCase()); if (el) observer.observe(el); });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
      });
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    const menuTrigger = trigger.current;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
      if (event.key === "Tab") {
        const nodes = menuRef.current?.querySelectorAll<HTMLElement>("a, button");
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); menuTrigger?.focus(); };
  }, [menu]);
  return <>
    <div className="reading-progress" ref={progress} aria-hidden="true" />
    <header className="site-nav">
      <a className="wordmark" href="#home" aria-label="bb. Bhavin Baldota, back to top"><span className="initials">bb.</span><span>Bhavin Baldota</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{NAV.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={active === item.toLowerCase() ? "location" : undefined}>{item}</a>)}</nav>
      <div className="nav-actions"><ThemeButton /><button ref={trigger} type="button" className="mobile-menu-button" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(true)}>Menu <span aria-hidden="true">＋</span></button></div>
    </header>
    {menu && <div className="mobile-menu" ref={menuRef} id="mobile-menu" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Navigation"><button className="pill" onClick={() => setMenu(false)}>Close ×</button><nav aria-label="Mobile navigation">{NAV.map((item, i) => <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenu(false)}><span className="mono">0{i + 1}</span>{item}<span aria-hidden="true">↗</span></a>)}</nav></div>}
  </>;
}

function Heading({ index, label, title, accent }: { index: string; label: string; title: string; accent: string }) {
  return <div className="section-heading reveal"><p className="eyebrow">{index} — {label}</p><h2>{title} <em>{accent}</em></h2></div>;
}

function TalkingHero({ experienceOpen }: { experienceOpen: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const playAttempt = useRef(0);
  const pausedByUser = useRef(false);
  const blockedAudio = useRef(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [sound, setSound] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  useEffect(() => {
    const player = video.current;
    if (!player || !section.current) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const cancelPendingPlay = () => { ++playAttempt.current; };
    const sync = () => {
      if (!experienceOpen && visible.current && !document.hidden && !pausedByUser.current && !reduced.matches) {
        const attempt = ++playAttempt.current;
        void player.play().catch(error => {
          if (attempt !== playAttempt.current) return;
          if (error.name !== "NotAllowedError" || experienceOpen || !visible.current || document.hidden || pausedByUser.current || reduced.matches) return;
          // Audible autoplay is browser-controlled. Keep the video running and
          // retry sound on the visitor's first interaction while it is visible.
          blockedAudio.current = true;
          setAudioBlocked(true);
          player.muted = true;
          setSound(false);
          void player.play().catch(() => {});
        });
      }
      else player.pause();
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === player) visible.current = entry.intersectionRatio >= .2;
      }
      sync();
    }, { threshold: [0, .2] });
    observer.observe(player);
    const enableBlockedAudio = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".video-controls")) return;
      if (experienceOpen || !blockedAudio.current || !visible.current || document.hidden || pausedByUser.current || reduced.matches) return;
      const attempt = ++playAttempt.current;
      player.muted = false;
      player.volume = 1;
      player.currentTime = 0;
      void player.play().then(() => { if (attempt !== playAttempt.current) return; blockedAudio.current = false; setAudioBlocked(false); setSound(true); }).catch(() => { if (attempt === playAttempt.current) { player.muted = true; setSound(false); } });
    };
    player.addEventListener("loadeddata", sync);
    sync(); document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    document.addEventListener("pointerdown", enableBlockedAudio);
    document.addEventListener("keydown", enableBlockedAudio);
    return () => { cancelPendingPlay(); observer.disconnect(); player.removeEventListener("loadeddata", sync); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); document.removeEventListener("pointerdown", enableBlockedAudio); document.removeEventListener("keydown", enableBlockedAudio); player.pause(); };
  }, [experienceOpen]);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const applyCaptionPreference = () => {
      const track = player.textTracks[0];
      if (!track) return;
      // Safari can leave a default track disabled; keep the visitor's CC choice explicit.
      track.mode = captions ? "showing" : "disabled";
    };
    const trackElement = player.querySelector("track");
    applyCaptionPreference();
    player.addEventListener("loadedmetadata", applyCaptionPreference);
    player.addEventListener("playing", applyCaptionPreference);
    player.textTracks.addEventListener("addtrack", applyCaptionPreference);
    trackElement?.addEventListener("load", applyCaptionPreference);
    return () => {
      player.removeEventListener("loadedmetadata", applyCaptionPreference);
      player.removeEventListener("playing", applyCaptionPreference);
      player.textTracks.removeEventListener("addtrack", applyCaptionPreference);
      trackElement?.removeEventListener("load", applyCaptionPreference);
    };
  }, [captions]);
  function toggleSound() {
    const player = video.current;
    if (!player) return;
    const attempt = ++playAttempt.current;
    const enableSound = player.muted;
    player.muted = !enableSound;
    player.volume = 1;
    setSound(enableSound);
    blockedAudio.current = false;
    setAudioBlocked(false);
    pausedByUser.current = false;
    if (enableSound) player.currentTime = 0;
    void player.play().catch(error => {
      if (attempt !== playAttempt.current || error.name !== "NotAllowedError") return;
      player.muted = true;
      setSound(false);
      blockedAudio.current = true;
      setAudioBlocked(true);
      void player.play().catch(() => {});
    });
  }
  function revealFirstFrame() {
    const player = video.current;
    if (!player) return;
    if ("requestVideoFrameCallback" in player) player.requestVideoFrameCallback(() => setFrameReady(true));
    else setFrameReady(true);
  }

  function togglePlayback() {
    const player = video.current;
    if (!player) return;
    if (player.paused) { pausedByUser.current = false; void player.play().catch(() => {}); }
    else { ++playAttempt.current; pausedByUser.current = true; player.pause(); }
  }
  function toggleCaptions() {
    const track = video.current?.textTracks[0];
    if (!track) return;
    // TextTrack.mode is mutable browser state, not a React-owned value.
    // eslint-disable-next-line react-hooks/immutability
    track.mode = captions ? "disabled" : "showing";
    setCaptions(!captions);
  }
  return <section className="talking-hero" id="home" ref={section} aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> AI ENGINEER & RESEARCHER · PUNE, INDIA</p>
      <h1 id="hero-title">I research,<br />develop, and<br /><em>deploy</em> AI.</h1>
      <p className="hero-description">{PROFILE.introduction}</p>
      <div className="hero-cta"><a className="pill primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="pill" href={PROFILE.resume} download>Résumé <span aria-hidden="true">↓</span></a></div>
      <div className="hero-current"><span className="mini-monogram" aria-hidden="true">P.</span><p>Currently at <strong>Persistent Systems</strong><br /><span>Lead Software Engineer · Generative AI</span></p></div>
    </div>
    <div className="hero-stage">
      <span className="ghost-name" aria-hidden="true">BHAVIN</span>
      <div className={`video-canvas ${frameReady ? "frame-ready" : ""}`}>
        <video ref={video} muted={!sound} loop playsInline preload="auto" poster="/hero/poster.webp" onPlay={() => setPlaying(true)} onPlaying={revealFirstFrame} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Bhavin's animated introduction" aria-describedby="intro-transcript">
          <source src="/hero/hero.mp4" type="video/mp4" /><source src="/hero/hero.webm" type="video/webm" /><track kind="captions" src="/hero/captions.vtt" srcLang="en" label="English" default />
        </video>
        <span className="video-loading-poster" aria-hidden="true" />
      </div>
      {!failed && <div className="video-controls"><button type="button" onClick={toggleSound} aria-label={sound ? "Mute introduction" : "Enable introduction sound"} aria-pressed={sound}>{sound ? "♫" : "♪"}<span className="sound-slash" aria-hidden="true">{sound ? "" : "/"}</span></button><button type="button" onClick={togglePlayback} aria-label={playing ? "Pause introduction" : "Play introduction"}>{playing ? "Ⅱ" : "▶"}</button><button type="button" className="caption-control" onClick={toggleCaptions} aria-label={captions ? "CC: Hide captions" : "CC: Show captions"} aria-pressed={captions}>CC</button><span className="mono">{!sound && audioBlocked ? "TAP ♪ FOR SOUND" : "MEET BHAVIN"}</span></div>}
      {failed && <p className="video-fallback">The introduction video could not load. Read the introduction below.</p>}
      <details className="intro-transcript" id="intro-transcript"><summary>Read introduction</summary><p>{PROFILE.transcript}</p></details>
    </div>
    <div className="hero-bottom mono"><span>RESEARCH → DEVELOPMENT → DEPLOYMENT</span><a href="#about">SCROLL TO DISCOVER ↓</a></div>
  </section>;
}

function About() {
  const [flipped, setFlipped] = useState(false);
  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <Heading index="01" label="A little about me" title="Curiosity meets" accent="craft." />
    <div className="about-grid">
      <div className="about-copy reveal"><h3 id="about-title">Hi, I’m Bhavin.</h3><p>{PROFILE.summary}</p><p className="about-note">My research interest: reliability and evaluation of LLM-based agentic systems.</p><div className="link-row"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><div className="resume-links"><a className="text-link" href={PROFILE.resume} download>Download résumé ↓</a></div></div>
      <div className="id-holder reveal"><div className="lanyard" aria-hidden="true">BHAVIN · AI</div><button type="button" className={`id-card ${flipped ? "flipped" : ""}`} aria-label={flipped ? "Show front of Bhavin's ID card" : "Flip Bhavin's ID card"} aria-pressed={flipped} onClick={() => setFlipped(!flipped)}>
        <span className="id-front" aria-hidden={flipped}><span className="id-band">RESEARCHER / ENGINEER</span><span className="id-portrait"><Image src="/portrait-bhavin.jpg" alt="Bhavin Baldota wearing a black blazer and burgundy shirt" width={960} height={1280} sizes="106px" /></span><strong>Bhavin Baldota</strong><span>AI · ML · GENERATIVE AI</span><span className="id-rows"><span>BASED IN <b>Pune, India</b></span><span>DEGREE <b>B.Tech · AI & DS</b></span><span>CLASS OF <b>2025</b></span></span><span className="barcode" aria-hidden="true" /><span className="mono flip-hint">TAP TO FLIP ↻</span></span>
        <span className="id-back" aria-hidden={!flipped}><span className="eyebrow">THE OTHER SIDE</span><strong>Research.<br />Develop.<br /><em>Deploy.</em></strong><span>Lead Software Engineer · GenAI</span><span>B.Tech · 9.01/10 CGPA</span><span>DRDO research experience</span><span>{PROFILE.venture}</span><span className="signature">Bhavin.</span><span className="mono flip-hint">TAP TO RETURN ↻</span></span>
      </button></div>
      <div className="quick-facts reveal"><p className="eyebrow">THE SHORT VERSION</p>{[["Location", PROFILE.location], ["Current role", "Lead Software Engineer"], ["Focus", "GenAI · Agents · Applied ML"], ["Education", "B.Tech · AI & Data Science"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<blockquote>“Turning research ideas into production applications.”</blockquote><a className="text-link" href={`mailto:${PROFILE.email}`}>Say hello ↗</a></div>
    </div>
  </section>;
}

const SYMBOLS: Record<string, string> = { Python: "Py", SQL: "Sq", JavaScript: "Js", LangChain: "Lc", LangGraph: "Lg", MCP: "Mc", "OpenAI API": "Ai", Groq: "Gq", Ollama: "Ol", ChromaDB: "Ch", FAISS: "Fa", PyTorch: "Pt", TensorFlow: "Tf", "scikit-learn": "Sk", "Hugging Face": "Hf", OpenCV: "Cv", FastAPI: "Fp", Flask: "Fl", Firebase: "Fb", AWS: "Aw", Docker: "Dk", LLMOps: "Lo" };
function Skills() {
  const skills = SKILL_GROUPS.flatMap(group => group.skills.map(name => ({ name, family: group.name, category: SKILL_GROUPS.indexOf(group) })));
  const [family, setFamily] = useState("All");
  const [selected, setSelected] = useState("Python");
  const skill = skills.find(item => item.name === selected)!;
  const projects = PROJECTS.filter(project => project.tech.includes(selected));
  return <section id="skills" className="section" aria-labelledby="skills-label">
    <Heading index="02" label="Tools of the trade" title="The elements of" accent="my stack." />
    <p id="skills-label" className="section-intro">From model experimentation to the infrastructure that brings it to life.</p>
    <div className="filter-row" role="group" aria-label="Filter skills by family">{["All", ...SKILL_GROUPS.map(group => group.name)].map(item => <button type="button" key={item} data-category={SKILL_GROUPS.findIndex(group => group.name === item)} aria-pressed={family === item} onClick={() => { setFamily(item); if (item !== "All") setSelected(SKILL_GROUPS.find(group => group.name === item)!.skills[0]); }}>{item}</button>)}</div>
    <div className="skills-layout"><div className="elements-grid">{skills.map((item, i) => <button type="button" key={item.name} disabled={family !== "All" && family !== item.family} data-category={item.category} className={`element ${family !== "All" && family !== item.family ? "dimmed" : ""} ${selected === item.name ? "selected" : ""}`} aria-pressed={selected === item.name} onClick={() => setSelected(item.name)} onFocus={() => setSelected(item.name)}><span className="element-number">{String(i + 1).padStart(2, "0")}</span><strong>{SYMBOLS[item.name] || item.name.replace(/[^A-Za-z]/g, "").slice(0, 2)}</strong><span className="element-name">{item.name}</span></button>)}</div>
      <aside className="skill-inspector" aria-label="Selected skill details"><p className="eyebrow">ELEMENT INSPECTOR</p><TechLogo name={selected} symbol={SYMBOLS[selected] || selected.slice(0, 2)} /><h3>{selected}</h3><p>{skill.family}</p><div className="inspector-projects"><span className="eyebrow">IN MY WORK</span>{projects.length ? projects.map(project => <a key={project.id} href="#work">{project.title} ↗</a>) : <p>Part of my technical toolkit.<br />See the CV for the full stack.</p>}</div></aside>
    </div>
  </section>;
}

function Work() {
  const [open, setOpen] = useState(0);
  return <section id="work" className="section" aria-labelledby="work-label">
    <Heading index="03" label="Selected work" title="Ideas made" accent="real." />
    <p className="section-intro" id="work-label">Research, engineering, and the space in between.</p>
    <div className="project-gallery">{PROJECTS.map((project, i) => <article key={project.id} className={`project-panel ${open === i ? "expanded" : ""}`}>
      <button className="project-trigger" type="button" aria-expanded={open === i} aria-controls={`project-${project.id}`} onClick={() => setOpen(i)}><span className="mono">0{i + 1}</span><span>{project.title}</span><span className="project-plus" aria-hidden="true">{open === i ? "−" : "+"}</span></button>
      <div className="project-content" id={`project-${project.id}`} hidden={open !== i}><div><p className="eyebrow">{project.kicker}</p><h3>{project.title}</h3><p>{project.description}</p><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="tech-chips">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>{project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">View on GitHub ↗</a>}</div><div className="project-illustration" aria-label={`${project.title} illustrative workflow`}><p className="mono">ILLUSTRATIVE WORKFLOW</p><div className="diagram-window"><div className="window-dots" aria-hidden="true">● ● ●</div><ol className="workflow-steps">{project.diagram.map((step, index) => <li className="diagram-step" key={step.title}><span className="mono" aria-hidden="true">0{index + 1}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div>{index < project.diagram.length - 1 && <span className="diagram-arrow" aria-hidden="true">↓</span>}</li>)}</ol></div><span className="diagram-caption">Concept illustration based on the project description · not an exact deployment diagram</span></div></div>
    </article>)}</div>
    <div className="section-tail"><p>More experiments, implementations, and open-source work.</p><a className="text-link" href={PROFILE.github} target="_blank" rel="noreferrer">Explore my GitHub ↗</a></div>
  </section>;
}

function Research() {
  return <section id="research" className="section" aria-labelledby="research-label">
    <Heading index="04" label="Research & contributions" title="Driven by" accent="questions." />
    <div className="research-layout"><div className="research-statement reveal"><p className="eyebrow">CURRENT RESEARCH INTEREST</p><h3 id="research-label">How do we make<br />intelligent agents<br /><em>more reliable?</em></h3><p>Detecting and correcting compounding errors in multi-step tool-calling pipelines, and evaluating agents in open-ended environments.</p><blockquote className="research-motto">“{PROFILE.motto}”</blockquote><span className="research-status"><span className="status-dot" /> Papers in preparation · 2025–2026</span><p className="small-copy">Work in preparation covers applied deep learning and agent reliability, including DeliverIQ. These papers have not yet been published.</p></div>
      <div className="research-papers">{RESEARCH.map((paper, i) => <article className="paper-card reveal" key={paper.title}><p className="eyebrow">0{i + 1} / DATASET CONTRIBUTION</p><h3>{paper.title}</h3><p className="paper-publisher">{paper.publication}</p><p>{paper.detail}</p><a className="text-link" href={paper.link} target="_blank" rel="noreferrer">Read published work ↗</a></article>)}</div></div>
  </section>;
}

function Certifications() {
  return <section id="certifications" className="section certification-section" aria-label="Certifications">
    <Heading index="05" label="Continuous learning" title="Always" accent="learning." />
    <div className="certification-list">{CERTIFICATIONS.map((cert, i) => <div className="certification-row reveal" key={cert.name} tabIndex={0}><span className="mono">0{i + 1}</span><div><h3>{cert.name}</h3><p>{cert.issuer}</p></div><span>{cert.detail}</span></div>)}</div>
  </section>;
}

function Timeline() {
  return <section id="experience" className="section" aria-labelledby="experience-label">
    <Heading index="06" label="The journey so far" title="Built along" accent="the way." />
    <p id="experience-label" className="section-intro">A path through research, industry, and learning. Some chapters run in parallel.</p>
    <div className="experience-path">{EXPERIENCE.map(item => <article key={item.date + item.role} className="timeline-stop reveal"><p className="timeline-date mono">{item.date}</p><div className="timeline-content"><span className="eyebrow">{item.kind}{item.employment ? ` · ${item.employment}` : ""}</span><h3>{item.role}</h3><p className="timeline-place">{item.place}</p><p>{item.detail}</p></div></article>)}<div className="timeline-next"><span className="eyebrow">THE NEXT CHAPTER</span><a href="#contact">Let’s build something meaningful. ↗</a></div></div>
  </section>;
}

function CountedValue({ value }: { value: string }) {
  const number = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = number.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = Number(match[1]), suffix = match[2], digits = match[1].includes(".") ? 2 : 0;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        el.textContent = (target * (1 - Math.pow(1 - progress, 4))).toFixed(digits) + suffix;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <strong className="achievement-value"><span ref={number} aria-hidden="true">{value}</span><span className="sr-only">{value}</span></strong>;
}

function Achievements() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = section.current, cards = track.current;
    if (!root || !cards) return;
    const media = matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (media.matches) { root.style.height = "auto"; cards.style.transform = "none"; return; }
        const travel = Math.max(0, cards.scrollWidth - cards.clientWidth);
        root.style.height = `${innerHeight + travel}px`;
        const fraction = travel > 0 ? Math.max(0, Math.min(1, -root.getBoundingClientRect().top / travel)) : 0;
        cards.style.transform = `translateX(${-travel * fraction}px)`;
        if (rail.current) rail.current.style.transform = `scaleX(${fraction})`;
      });
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); media.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); media.removeEventListener("change", update); };
  }, []);
  return <section id="achievements" className="achievements-section" ref={section} aria-label="Achievements"><div className="achievements-sticky section"><Heading index="07" label="Milestones, not finish lines" title="A few things" accent="along the way." /><div className="achievement-progress" aria-hidden="true"><div ref={rail} /></div><div className="achievement-window"><div className="achievement-track" ref={track}>{ACHIEVEMENTS.map((item, i) => <article className="achievement-card" key={item.label} tabIndex={0} onFocus={event => { if (matchMedia("(max-width:760px), (prefers-reduced-motion:reduce)").matches) return; const root = section.current, cards = track.current; if (!root || !cards) return; const travel = Math.max(0, cards.scrollWidth - cards.clientWidth); window.scrollTo({ top: scrollY + root.getBoundingClientRect().top + Math.min(travel, event.currentTarget.offsetLeft) }); }}><span className="eyebrow">0{i + 1} / 0{ACHIEVEMENTS.length}</span><CountedValue value={item.value} /><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div></div></div></section>;
}

function Contact() {
  const [copy, setCopy] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopy("Copied ✓"); }
    catch { setCopy("Copy unavailable — use the email link."); }
  }
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><p className="eyebrow">08 — LET’S TALK</p><h2 id="contact-title">Let’s build<br />something <em>meaningful.</em></h2><div className="contact-email"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a><button type="button" className="pill" onClick={copyEmail}>Copy ↗</button></div><p className="copy-status" role="status">{copy}</p><div className="contact-links"><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`tel:${PROFILE.phoneHref}`}>{PROFILE.phone} ↗</a></div><footer className="portfolio-footer"><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>Built with Next.js</span><a href="#home">Back to top ↑</a></footer></section>;
}

export default function TalkingPortfolio({ experienceOpen = false }: { experienceOpen?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-in"); observer.unobserve(entry.target); } }); }, { threshold: .06 });
    root.current?.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    if (!reduced.matches) root.current?.classList.add("is-enhanced");
    let stopScroll: (() => void) | undefined;
    let cancelled = false;
    if (!reduced.matches) void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: true, duration: .8 });
      const change = () => { if (reduced.matches) lenis.destroy(); };
      reduced.addEventListener("change", change);
      stopScroll = () => { lenis.destroy(); reduced.removeEventListener("change", change); };
    });
    return () => { observer.disconnect(); cancelled = true; stopScroll?.(); };
  }, []);
  return <main className="talking-portfolio" id="main-content" ref={root}><Navigation /><TalkingHero experienceOpen={experienceOpen} /><About /><Skills /><Work /><Research /><Certifications /><Timeline /><Achievements /><Contact /></main>;
}
