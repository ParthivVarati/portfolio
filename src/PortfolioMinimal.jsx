import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  RotateCcw,
  X,
} from "lucide-react";

const links = {
  email: "mailto:parthivvarati@gmail.com",
  github: "https://github.com/ParthivVarati",
  linkedin: "https://www.linkedin.com/in/naga-parthiv/",
  resume: "https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing",
};

const storyChapters = [
  {
    number: "01",
    label: "CODE",
    title: "I wanted to know what lived behind the screen.",
    body: "Programming, databases and algorithms gave me answers. Every answer also exposed another layer worth understanding.",
  },
  {
    number: "02",
    label: "MODELS",
    title: "Then the questions became less obvious.",
    body: "Machine learning led to vision. Vision led to RAG, memory and agents. One project kept turning into three new questions.",
  },
];

const gameRounds = [
  {
    number: "01",
    before: "A photo should become",
    after: "a place.",
    answer: "VISION",
    choices: ["MEMORY", "VISION", "QUEUE"],
    note: "Computer vision taught me how machines turn raw input into meaning.",
  },
  {
    number: "02",
    before: "A conversation needs",
    after: "to remember tomorrow.",
    answer: "MEMORY",
    choices: ["CACHE", "QUEUE", "MEMORY"],
    note: "AI systems taught me that intelligence without context is short-lived.",
  },
  {
    number: "03",
    before: "A useful answer needs a",
    after: "to survive traffic.",
    answer: "QUEUE",
    choices: ["QUEUE", "PROMPT", "PIXEL"],
    note: "Software engineering taught me that the whole path has to survive reality.",
  },
];

const projects = [
  {
    index: "01",
    title: "Emotional Companion",
    year: "2025",
    type: "CONVERSATIONAL AI",
    description: "Two AI roles—one for empathy, one for action—share the same conversation context.",
    role: "Product engineering",
    stack: "Python, LangChain, Gemini, React",
    href: "https://myfeelingsbuddy.netlify.app/",
    cta: "Open live project",
    visual: "companion",
  },
  {
    index: "02",
    title: "Electricity Forecast",
    year: "2025",
    type: "MACHINE LEARNING",
    description: "Compared four model families and wrapped the forecasting workflow in a usable API.",
    role: "ML and full-stack",
    stack: "CatBoost, Flask, React, Python",
    href: "https://github.com/ParthivVarati/Electricity-Forecast",
    cta: "View repository",
    visual: "forecast",
  },
  {
    index: "03",
    title: "SnapTrip",
    year: "2024",
    type: "COMPUTER VISION",
    description: "Turned an uploaded image into a location match through visual comparison.",
    role: "Full-stack and vision",
    stack: "OpenCV, Flask, NumPy, JavaScript",
    href: "https://github.com/ParthivVarati/SNAPTRIP",
    cta: "View repository",
    visual: "snaptrip",
  },
];

const experience = [
  {
    period: "APR 2026 — PRESENT",
    role: "SDE-1",
    company: "vriksha.ai",
    place: "Bengaluru · On-site",
    note: "Building across product and software systems.",
  },
  {
    period: "SEP 2025 — MAR 2026",
    role: "AI Engineer",
    company: "nimoy.ai",
    place: "Gurugram · Remote",
    note: "Worked across agents, memory, vision and backend pipelines.",
  },
  {
    period: "JUN — JUL 2024",
    role: "Intern",
    company: "Exponential AI",
    place: "India",
    note: "Tested software, annotated data and investigated output quality.",
  },
];

function useSmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.92 });
    let frame;
    const loop = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

function PageProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="mn-page-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header className="mn-nav">
        <a className="mn-wordmark" href="#top" aria-label="Naga Parthiv, back to top">
          Naga Parthiv
        </a>
        <span className="mn-nav-role"><i /> SDE-1 / BLR</span>
        <nav aria-label="Primary navigation">
          <a href="#story">Story</a>
          <a href="#play">Play</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
        </nav>
        <a className="mn-nav-contact" href={links.email}>Email <ArrowUpRight size={14} /></a>
        <button
          ref={triggerRef}
          type="button"
          className="mn-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mn-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mn-mobile-menu"
            className="mn-mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {["story", "play", "work", "experience"].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => closeMenu()}>
                {item}<ArrowRight size={16} />
              </a>
            ))}
            <a href={links.email} onClick={() => closeMenu()}>email me<ArrowUpRight size={16} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="mn-hero">
      <div className="mn-container mn-hero-inner">
        <motion.div
          className="mn-hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span>SOFTWARE ENGINEER</span>
          <span>PORTFOLIO / 2026</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          I like knowing enough about every layer to make the whole thing work.
        </motion.h1>
        <motion.div
          className="mn-hero-bottom"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.42 }}
        >
          <p>
            I’m Parthiv, an SDE-1 at <strong>vriksha.ai</strong> in Bengaluru. I started with models,
            stayed for the systems, and now build wherever the product needs me.
          </p>
          <div className="mn-hero-links">
            <a href={links.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
            <a href={links.email}>Email <ArrowUpRight size={15} /></a>
          </div>
          <a className="mn-scroll-cue" href="#story">
            Read the story <span><ArrowDown size={15} /></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StoryChapter({ chapter }) {
  return (
    <article className="mn-story-chapter">
      <Reveal className="mn-container mn-chapter-grid">
        <span className="mn-chapter-number">{chapter.number} / {chapter.label}</span>
        <h3>{chapter.title}</h3>
        <p>{chapter.body}</p>
      </Reveal>
    </article>
  );
}

function StoryTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.68, 1],
    ["#e7e4dd", "#d0d0ca", "#4a4c48", "#1c1e1b"],
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.48, 0.51, 1],
    ["#171916", "#171916", "#f3f1ec", "#f3f1ec"],
  );
  const firstOpacity = useTransform(scrollYProgress, [0, 0.06, 0.45, 0.63], [1, 1, 1, 0]);
  const firstY = useTransform(scrollYProgress, [0, 0.62], [0, -18]);
  const secondOpacity = useTransform(scrollYProgress, [0.38, 0.58, 0.95, 1], [0, 1, 1, 1]);
  const secondY = useTransform(scrollYProgress, [0.38, 0.58], [18, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.03, 1]);

  return (
    <motion.section className="mn-threshold" ref={ref} style={{ backgroundColor, color }}>
      <div className="mn-threshold-sticky">
        <div className="mn-container mn-threshold-stage">
          <motion.div className="mn-threshold-rule" style={{ scaleX: lineScale }} />
          <motion.article className="mn-threshold-copy mn-threshold-first" style={{ opacity: firstOpacity, y: firstY }}>
            <span>03 / REALITY</span>
            <h3>A clever model is still only one part.</h3>
            <p>The interesting answer still has to leave the notebook and meet a real person.</p>
          </motion.article>
          <motion.article className="mn-threshold-copy mn-threshold-second" style={{ opacity: secondOpacity, y: secondY }}>
            <span>APIs · DATABASES · QUEUES · LATENCY · COST</span>
            <h3>Reality made the questions practical.</h3>
            <p>Reliability decides whether intelligent software becomes a useful product.</p>
          </motion.article>
          <span className="mn-threshold-note">KEEP SCROLLING</span>
        </div>
      </div>
    </motion.section>
  );
}

function Story() {
  return (
    <section id="story" className="mn-story">
      <div className="mn-container mn-story-intro">
        <Reveal as="p" className="mn-section-label">A SHORT HISTORY OF CURIOSITY</Reveal>
        <Reveal as="h2" delay={0.06}>Somewhere between code and curiosity.</Reveal>
        <Reveal as="p" className="mn-story-lede" delay={0.12}>
          I didn’t enter software through one perfect plan. I kept pulling at loose threads.
        </Reveal>
      </div>
      {storyChapters.map((chapter) => <StoryChapter key={chapter.number} chapter={chapter} />)}
      <StoryTransition />
    </section>
  );
}

function MissingPiecesGame() {
  const reduceMotion = useReducedMotion();
  const [round, setRound] = useState(0);
  const [solved, setSolved] = useState([]);
  const [message, setMessage] = useState("Choose the piece that completes the thought.");
  const [finished, setFinished] = useState(false);
  const targetRef = useRef(null);
  const completionRef = useRef(null);
  const current = gameRounds[round];
  const isSolved = solved.includes(round);

  const choose = (choice) => {
    if (isSolved || finished) return;
    if (choice === current.answer) {
      setSolved((items) => [...items, round]);
      setMessage(current.note);
    } else {
      setMessage(`${choice.toLowerCase()} belongs somewhere else. Try the piece that solves this sentence.`);
    }
  };

  const handleDrop = (choice, point) => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;
    const inside = point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    if (inside) choose(choice);
    else setMessage("Drop it into the empty space—or tap the piece.");
  };

  const next = () => {
    if (!isSolved) return;
    if (round === gameRounds.length - 1) {
      setFinished(true);
      setMessage("That path is why I work as an SDE-1 today.");
      return;
    }
    setRound((value) => value + 1);
    setMessage("Choose the piece that completes the thought.");
  };

  const reset = () => {
    setRound(0);
    setSolved([]);
    setFinished(false);
    setMessage("Choose the piece that completes the thought.");
  };

  useEffect(() => {
    if (!finished) return;
    const frame = window.requestAnimationFrame(() => {
      completionRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [finished, reduceMotion]);

  return (
    <section id="play" className="mn-game-section">
      <div className="mn-container">
        <Reveal className="mn-game-heading">
          <p className="mn-section-label">ONE SMALL INTERACTION · ABOUT 20 SECONDS</p>
          <h2>Three missing pieces.</h2>
          <p>Complete three thoughts. Together, they explain how I got here.</p>
        </Reveal>

        <Reveal className="mn-game" delay={0.08}>
          <header className="mn-game-topline">
            <span>PARTHIV / STORY STUDY</span>
            <span>{finished ? "COMPLETE" : `${String(round + 1).padStart(2, "0")} / 03`}</span>
          </header>
          <div className="mn-game-progress" aria-hidden="true">
            <motion.i animate={{ width: finished ? "100%" : `${((round + (isSolved ? 1 : 0)) / 3) * 100}%` }} />
          </div>

          <div className="mn-game-stage">
            {!finished ? (
              <motion.div
                key={round}
                className="mn-round"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <span className="mn-round-label">THOUGHT {current.number}</span>
                <p className="mn-round-sentence">
                  {current.before}
                  <span ref={targetRef} className={`mn-answer-slot ${isSolved ? "is-filled" : ""}`}>
                    {isSolved ? current.answer : "?"}
                  </span>
                  {current.after}
                </p>
                <div className="mn-piece-row" aria-label="Available pieces">
                  {current.choices.map((choice) => (
                    <motion.button
                      key={choice}
                      type="button"
                      className={isSolved && choice === current.answer ? "is-used" : ""}
                      drag={!isSolved}
                      dragSnapToOrigin
                      dragMomentum={false}
                      onDragEnd={(_, info) => handleDrop(choice, info.point)}
                      onClick={() => choose(choice)}
                      whileDrag={{ scale: 1.03 }}
                      disabled={isSolved}
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>
                <div className="mn-game-response">
                  <p aria-live="polite">{message}</p>
                  {isSolved && (
                    <button type="button" className="mn-next-button" onClick={next}>
                      {round === gameRounds.length - 1 ? "See where it led" : "Next thought"}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                ref={completionRef}
                key="complete"
                className="mn-game-complete"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span>04 / TODAY</span>
                <h3>I didn’t move away from AI. I moved closer to the whole product.</h3>
                <p>That is how an AI Engineer became an SDE-1—and why I still care about every layer.</p>
                <button type="button" onClick={reset}><RotateCcw size={15} /> Play again</button>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WorkTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    ["#1c1e1b", "#898b84", "#f3f1ec"],
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.64, 0.67, 1],
    ["#f3f1ec", "#f3f1ec", "#171916", "#171916"],
  );
  const y = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.86, 1], [0.7, 1, 1, 0.78]);

  return (
    <motion.section className="mn-work-transition" ref={ref} style={{ backgroundColor, color }}>
      <div className="mn-work-transition-sticky">
        <motion.div className="mn-container" style={{ y, opacity }}>
          <span>THE QUESTIONS BECAME WORK</span>
          <h2>Here is what they turned into.</h2>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CompanionFigure() {
  return (
    <div className="mn-project-figure mn-companion-figure" aria-hidden="true">
      <div className="mn-figure-header"><span>TWO MODES</span><span>ONE CONTEXT</span></div>
      <div className="mn-companion-pair">
        <div><small>LISTEN FIRST</small><strong>FEEL</strong></div>
        <i />
        <div><small>THEN MOVE</small><strong>ACT</strong></div>
      </div>
      <div className="mn-context-line"><span /> SHARED CONVERSATION STATE <span /></div>
    </div>
  );
}

function ForecastFigure() {
  return (
    <div className="mn-project-figure mn-forecast-figure" aria-hidden="true">
      <div className="mn-figure-header"><span>MODEL COMPARISON</span><span>FORECAST / 2025</span></div>
      <div className="mn-model-list">
        {[
          "RANDOM FOREST",
          "CATBOOST",
          "HISTGRADIENTBOOSTING",
          "MULTIOUTPUT REGRESSOR",
        ].map((model, index) => (
          <div key={model}><span>{String(index + 1).padStart(2, "0")}</span><b>{model}</b><i /></div>
        ))}
      </div>
      <div className="mn-forecast-output"><span>SELECT</span><strong>FORECAST API</strong></div>
    </div>
  );
}

function SnapTripFigure() {
  return (
    <div className="mn-project-figure mn-snaptrip-figure" aria-hidden="true">
      <div className="mn-figure-header"><span>IMAGE IN</span><span>LOCATION OUT</span></div>
      <div className="mn-viewfinder">
        <i className="mn-corner-one" /><i className="mn-corner-two" />
        <div className="mn-landform one" /><div className="mn-landform two" />
        <span>COMPARE / MATCH</span>
      </div>
      <div className="mn-match-row"><span>PIXELS</span><i /><span>FEATURES</span><i /><strong>PLACE</strong></div>
    </div>
  );
}

function ProjectFigure({ type }) {
  if (type === "companion") return <CompanionFigure />;
  if (type === "forecast") return <ForecastFigure />;
  return <SnapTripFigure />;
}

function Project({ project, index }) {
  return (
    <article className={`mn-project ${index % 2 ? "is-reversed" : ""}`}>
      <div className="mn-container mn-project-grid">
        <Reveal className="mn-project-copy">
          <div className="mn-project-index">{project.index} / {project.type}</div>
          <h3>{project.title}</h3>
          <p className="mn-project-description">{project.description}</p>
          <dl>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Stack</dt><dd>{project.stack}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
          </dl>
          <a href={project.href} target="_blank" rel="noreferrer">
            {project.cta}<ArrowUpRight size={17} />
          </a>
        </Reveal>
        <Reveal className="mn-project-art" delay={0.08}>
          <ProjectFigure type={project.visual} />
        </Reveal>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="mn-work">
      <div className="mn-container mn-work-intro">
        <Reveal as="p" className="mn-section-label">SELECTED WORK / 2024—2025</Reveal>
        <Reveal as="h2" delay={0.05}>Selected work.</Reveal>
        <Reveal as="p" delay={0.1}>Three projects, each answering a different kind of question.</Reveal>
      </div>
      {projects.map((project, index) => <Project key={project.title} project={project} index={index} />)}
      <div className="mn-container mn-archive-row">
        <span>ALSO BUILT</span>
        <a href="https://github.com/ParthivVarati/FREELANCER" target="_blank" rel="noreferrer">
          Freelancer — full-stack marketplace, 2024 <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mn-experience">
      <div className="mn-container">
        <div className="mn-experience-heading">
          <Reveal as="p" className="mn-section-label">EXPERIENCE</Reveal>
          <Reveal as="h2" delay={0.05}>The title changed. The instinct didn’t.</Reveal>
          <Reveal as="p" delay={0.1}>Learn a layer. Build with it. Notice the next layer underneath.</Reveal>
        </div>
        <div className="mn-experience-list">
          {experience.map((item, index) => (
            <Reveal as="article" key={`${item.company}-${item.role}`} delay={index * 0.04}>
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <strong>{item.company}</strong>
              <p>{item.note}</p>
              <small>{item.place}</small>
            </Reveal>
          ))}
        </div>
        <Reveal className="mn-education">
          <span>EDUCATION</span>
          <h3>B.Tech, Computer Science</h3>
          <strong>GITAM · 2021—2025</strong>
          <p>CGPA 8.57</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mn-footer">
      <div className="mn-container mn-footer-inner">
        <Reveal as="p" className="mn-section-label">ONE MORE QUESTION?</Reveal>
        <Reveal as="h2" delay={0.05}>If something here made you curious, say hello.</Reveal>
        <Reveal className="mn-footer-contact" delay={0.1}>
          <a href={links.email}>parthivvarati@gmail.com <Mail size={24} /></a>
        </Reveal>
        <div className="mn-footer-bottom">
          <div>
            <a href={links.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
            <a href={links.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} /></a>
          </div>
          <p>Naga Parthiv Varma Varati · Bengaluru, India</p>
          <a href="#top">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioMinimal() {
  useSmoothScroll();

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a className="mn-skip-link" href="#main-content">Skip to content</a>
      <PageProgress />
      <Nav />
      <main id="main-content">
        <Hero />
        <Story />
        <MissingPiecesGame />
        <WorkTransition />
        <Work />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
