import { useEffect, useMemo, useRef, useState } from "react";
import {
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

const contact = {
  email: "mailto:parthivvarati@gmail.com",
  github: "https://github.com/ParthivVarati",
  linkedin: "https://www.linkedin.com/in/naga-parthiv/",
  resume: "https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing",
};

const projects = [
  {
    id: "companion",
    title: "Emotional Companion",
    period: "2025",
    copy: "Two AI roles share one conversation: one makes room for the feeling, the other helps find a practical next step.",
    stack: "LangChain · Gemini · React · Python",
    href: "https://myfeelingsbuddy.netlify.app/",
    cta: "Open live project",
  },
  {
    id: "forecast",
    title: "Electricity Forecast",
    period: "2025",
    copy: "A forecasting workflow that compares four model families and serves the result through a usable API.",
    stack: "CatBoost · Flask · React · Python",
    href: "https://github.com/ParthivVarati/Electricity-Forecast",
    cta: "View repository",
  },
  {
    id: "snaptrip",
    title: "SnapTrip",
    period: "2024",
    copy: "A visual travel search that turns an uploaded image into a location match through computer vision.",
    stack: "OpenCV · Flask · NumPy · JavaScript",
    href: "https://github.com/ParthivVarati/SNAPTRIP",
    cta: "View repository",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    period: "2024",
    copy: "A full-stack marketplace for posting work, finding professionals and managing opportunities in one place.",
    stack: "React · Flask · SQL · Python",
    href: "https://github.com/ParthivVarati/FREELANCER",
    cta: "View repository",
  },
];

const career = [
  ["APR 2026 — PRESENT", "SDE-1", "vriksha.ai", "Bengaluru · On-site"],
  ["SEP 2025 — MAR 2026", "AI Engineer", "nimoy.ai", "Gurugram · Remote"],
  ["JUN — JUL 2024", "Intern", "Exponential AI", "India"],
];

const machineStages = [
  { word: "READY", caption: "It began with a screen and one persistent question." },
  { word: "QUESTION", caption: "I wanted to know what was happening behind it." },
  { word: "CODE", caption: "So I made things. Then took them apart." },
  { word: "UNCERTAINTY", caption: "AI taught me that clever and dependable are different things." },
  { word: "SYSTEM", caption: "Production made every hidden decision matter." },
  { word: "USEFUL", caption: "Curiosity went in. Useful software came out." },
];

function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ duration: 0.95, smoothWheel: true, wheelMultiplier: 0.92 });
    let frame;
    const tick = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

function PageProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="gr-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function PillNav() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const escape = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => trigger.current?.focus());
    };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, [open]);

  return (
    <>
      <motion.header
        className="gr-nav"
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="gr-logo" href="#top">NP</a>
        <span className="gr-current"><i /> SDE-1 · BLR</span>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
        </nav>
        <a className="gr-talk" href={contact.email}>Get in touch <ArrowUpRight size={14} /></a>
        <button
          ref={trigger}
          className="gr-menu"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="gr-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.header>
      {open && (
        <motion.nav
          id="gr-mobile-nav"
          className="gr-mobile-nav"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {["about", "work", "journey"].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item}<ArrowRight size={15} /></a>
          ))}
          <a href={contact.email}>get in touch<ArrowUpRight size={15} /></a>
        </motion.nav>
      )}
    </>
  );
}

function IdentityPoster() {
  return (
    <motion.div
      className="gr-identity-poster"
      initial={{ opacity: 0, y: 22, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 1.5 }}
      transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="gr-poster-meta"><span>SOFTWARE ENGINEER</span><span>BENGALURU</span></div>
      <div className="gr-poster-mark"><span>N</span><i /><span>P</span></div>
      <div className="gr-poster-layers">
        <span>CODE</span><span>MODELS</span><span>SYSTEMS</span><span>PRODUCT</span>
      </div>
      <p>me, between layers</p>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="gr-hero">
      <div className="gr-shell gr-hero-grid">
        <div className="gr-hero-copy">
          <motion.p className="gr-hello" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Hello,
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.14 }}>
            I’m Naga Parthiv.
          </motion.h1>
          <motion.span className="gr-wave" initial={{ opacity: 0, rotate: -15 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 0.38 }}>👋</motion.span>
          <motion.div className="gr-intro" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
            <p>A software engineer in Bengaluru, currently working as <strong>SDE-1 at vriksha.ai</strong>.</p>
            <p>Previously an <strong>AI Engineer at nimoy.ai</strong>, building with agents, memory, vision and backend systems. I like moving across layers until the whole product works.</p>
          </motion.div>
          <motion.div className="gr-hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <a href={contact.email}>Say hello <Mail size={15} /></a>
            <a href={contact.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
          </motion.div>
        </div>
        <IdentityPoster />
      </div>
      <a className="gr-scroll" href="#about">A little more about me <ArrowDown size={15} /></a>
    </section>
  );
}

function AboutView({ view }) {
  if (view === "short") {
    return (
      <div className="gr-about-short">
        <p>SDE-1 who works comfortably across frontend, backend, models and infrastructure.</p>
        <p>I enjoy the handoff points: model to API, API to product, prototype to dependable system.</p>
        <p>Still curious. Better at shipping the answer.</p>
      </div>
    );
  }

  if (view === "timeline") {
    return (
      <ol className="gr-about-timeline">
        <li><span>2021—2025</span><p>Studied computer science at GITAM and kept following the layer underneath.</p></li>
        <li><span>2024</span><p>Built with data, testing and computer vision.</p></li>
        <li><span>2025</span><p>Worked as an AI Engineer across agents, memory and production pipelines.</p></li>
        <li><span>NOW</span><p>SDE-1 at vriksha.ai, closer to the whole product.</p></li>
      </ol>
    );
  }

  return (
    <div className="gr-about-story">
      <p>I started with the usual computer science questions—programming, databases, algorithms and software development. I thought I was learning technologies. Mostly, I was learning how many layers a working product hides.</p>
      <p>Machine learning led me to computer vision. Vision led to RAG, memory, agents and voice. Every project answered one question and quietly created the next one.</p>
      <p>Production changed the questions again. APIs fail. Queues back up. Latency is felt. Reliability decides whether an intelligent idea becomes useful software. That is how an AI Engineer became an SDE-1.</p>
    </div>
  );
}

function About() {
  const [view, setView] = useState("story");
  return (
    <section id="about" className="gr-about">
      <div className="gr-shell">
        <div className="gr-about-head">
          <Reveal as="h2">About</Reveal>
          <Reveal className="gr-view-switch" delay={0.06}>
            {[["story", "Story"], ["short", "In short"], ["timeline", "Timeline"]].map(([id, label]) => (
              <button key={id} type="button" className={view === id ? "is-active" : ""} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>
            ))}
          </Reveal>
        </div>
        <motion.div key={view} className="gr-about-content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <AboutView view={view} />
        </motion.div>
        <Reveal className="gr-artifact-strip">
          {[
            ["01", "CODE", "make the first thing"],
            ["02", "MODEL", "teach it a pattern"],
            ["03", "VISION", "give pixels meaning"],
            ["04", "SYSTEM", "make it survive reality"],
          ].map(([number, title, note], index) => (
            <article key={title} style={{ "--tilt": `${index % 2 ? 1.4 : -1.2}deg` }}>
              <span>{number}</span><strong>{title}</strong><p>{note}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function OneGoodTurn() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const wheelRef = useRef(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const lastAngle = useRef(0);
  const animation = useRef(null);

  const stageIndex = progress === 0 ? 0 : progress >= 100 ? 5 : Math.ceil(progress / 25);
  const stage = machineStages[stageIndex];

  useEffect(() => () => cancelAnimationFrame(animation.current), []);

  const angleAt = (event) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
  };

  const pointerDown = (event) => {
    cancelAnimationFrame(animation.current);
    dragging.current = true;
    moved.current = false;
    lastAngle.current = angleAt(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!dragging.current) return;
    const angle = angleAt(event);
    let delta = angle - lastAngle.current;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    if (Math.abs(delta) > 0.01) moved.current = true;
    lastAngle.current = angle;
    setProgress((value) => Math.max(0, Math.min(100, value + (delta / (Math.PI * 2)) * 100)));
  };

  const pointerUp = (event) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const autoplay = () => {
    if (moved.current) {
      moved.current = false;
      return;
    }
    if (reduced) {
      setProgress((value) => Math.min(100, value === 0 ? 25 : Math.ceil((value + 1) / 25) * 25));
      return;
    }
    cancelAnimationFrame(animation.current);
    const from = progress;
    if (from >= 100) return;
    const start = performance.now();
    const duration = Math.max(450, 1500 * ((100 - from) / 100));
    const tick = (time) => {
      const ratio = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(from + (100 - from) * eased);
      if (ratio < 1) animation.current = requestAnimationFrame(tick);
    };
    animation.current = requestAnimationFrame(tick);
  };

  const keyDown = (event) => {
    let next = progress;
    const step = event.shiftKey ? 25 : 5;
    if (["ArrowRight", "ArrowUp"].includes(event.key)) next += step;
    else if (["ArrowLeft", "ArrowDown"].includes(event.key)) next -= step;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    else if (["Enter", " "].includes(event.key)) return (event.preventDefault(), autoplay());
    else return;
    event.preventDefault();
    setProgress(Math.max(0, Math.min(100, next)));
  };

  const rodOffset = Math.sin((progress / 100) * Math.PI * 2) * 12;
  return (
    <section className="gr-machine-section">
      <div className="gr-shell">
        <Reveal className="gr-machine-intro">
          <span>A SMALL WORKING MODEL</span>
          <h2>Give curiosity one good turn.</h2>
          <p>Drag the handle once. <small>or use ← →</small></p>
        </Reveal>
        <Reveal className={`gr-machine ${progress >= 100 ? "is-complete" : ""}`} delay={0.08}>
          <div className="gr-paper-in"><span>CURIOSITY</span></div>
          <div className="gr-machine-body">
            <div className="gr-window"><small>INSPECTION WINDOW</small><strong key={stage.word}>{stage.word}</strong></div>
            <div className="gr-roller one" style={{ transform: `rotate(${progress * 7.2}deg)` }} />
            <div className="gr-roller two" style={{ transform: `rotate(${-progress * 7.2}deg)` }} />
            <i className="gr-rod" style={{ transform: `translateY(${rodOffset}px)` }} />
          </div>
          <div
            ref={wheelRef}
            className="gr-wheel"
            role="slider"
            tabIndex="0"
            aria-label="Turn the curiosity machine"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
            aria-valuetext={`${stage.word}: ${stage.caption}`}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            onPointerCancel={pointerUp}
            onClick={autoplay}
            onKeyDown={keyDown}
            style={{ transform: `rotate(${progress * 3.6}deg)` }}
          >
            <i /><span>DRAG</span><b />
          </div>
          <div className="gr-ticket" aria-hidden={progress < 100}>
            <small>CURRENT OUTPUT</small><strong>SOFTWARE ENGINEER</strong><span>SDE-1 · VRIKSHA.AI</span>
          </div>
        </Reveal>
        <div className="gr-machine-caption" aria-live="polite">
          <p>{stage.caption}</p>
          <span>{Math.round(progress).toString().padStart(3, "0")} / 100</span>
        </div>
        {progress >= 100 && (
          <button className="gr-machine-reset" type="button" onClick={() => setProgress(0)}>
            one more turn <RotateCcw size={14} />
          </button>
        )}
      </div>
    </section>
  );
}

function Interlude() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const backgroundColor = useTransform(scrollYProgress, [0, 0.18, 0.66, 0.94, 1], ["#f7f7f5", "#10110f", "#10110f", "#f7f7f5", "#f7f7f5"]);
  const color = useTransform(scrollYProgress, [0, 0.14, 0.18, 0.7, 0.72, 1], ["#171816", "#171816", "#f7f7f5", "#f7f7f5", "#171816", "#171816"]);
  const firstOpacity = useTransform(scrollYProgress, [0, 0.13, 0.25, 0.48, 0.57], [0, 0, 1, 1, 0]);
  const firstY = useTransform(scrollYProgress, [0.15, 0.55], [18, -20]);
  const secondOpacity = useTransform(scrollYProgress, [0.48, 0.61, 0.9, 1], [0, 1, 1, 1]);
  const secondY = useTransform(scrollYProgress, [0.48, 0.67], [18, 0]);
  const contoursY = useTransform(scrollYProgress, [0.35, 1], [180, 0]);
  const contoursOpacity = useTransform(scrollYProgress, [0.28, 0.5, 0.98], [0, 0.55, 0.18]);

  return (
    <motion.section className="gr-interlude" ref={ref} style={{ backgroundColor, color }}>
      <div className="gr-interlude-sticky">
        <motion.svg className="gr-contours" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true" style={{ y: contoursY, opacity: contoursOpacity }}>
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <path key={line} d={`M -40 ${420 - line * 38} C 180 ${230 - line * 18}, 330 ${510 - line * 28}, 540 ${310 - line * 26} S 900 ${160 + line * 16}, 1110 ${330 - line * 23} S 1370 ${210 + line * 14}, 1500 ${300 - line * 30}`} />
          ))}
        </motion.svg>
        <div className="gr-shell gr-interlude-stage">
          <motion.article style={{ opacity: firstOpacity, y: firstY }}>
            <h2>Sometimes, I step back.</h2>
            <p>The harder problem usually lives between the parts—not inside any single one.</p>
          </motion.article>
          <motion.article style={{ opacity: secondOpacity, y: secondY }}>
            <h2>Then I follow the whole path.</h2>
            <p>Until the clever part becomes the dependable part, and the system feels simple to use.</p>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}

function ProjectVisual({ id }) {
  if (id === "companion") {
    return <div className="gr-project-visual gr-companion" aria-hidden="true"><header>ONE CONVERSATION / TWO ROLES</header><div><span>FEEL</span><i /><span>ACT</span></div><footer>SHARED CONTEXT</footer></div>;
  }
  if (id === "forecast") {
    return <div className="gr-project-visual gr-forecast" aria-hidden="true"><header>FOUR MODELS / ONE FORECAST</header><div className="gr-models">{["RANDOM FOREST", "CATBOOST", "HISTGRADIENT", "MULTIOUTPUT"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}<i /></span>)}</div><footer>SELECT → SERVE → USE</footer></div>;
  }
  if (id === "snaptrip") {
    return <div className="gr-project-visual gr-snap" aria-hidden="true"><header>IMAGE IN / LOCATION OUT</header><div className="gr-snap-frame"><i /><i /><strong>MATCH</strong></div><footer>PIXELS → FEATURES → PLACE</footer></div>;
  }
  return <div className="gr-project-visual gr-freelancer" aria-hidden="true"><header>CLIENT / WORK / PROFESSIONAL</header><div><span>POST</span><span>FIND</span><span>MANAGE</span></div><footer>ONE STRAIGHTFORWARD MARKETPLACE</footer></div>;
}

function Work() {
  return (
    <section id="work" className="gr-work">
      <div className="gr-shell gr-work-title"><Reveal as="h2">Work</Reveal></div>
      {projects.map((project, index) => (
        <div className="gr-work-entry" key={project.id}>
          <div className={`gr-shell gr-work-grid ${index % 2 ? "is-reversed" : ""}`}>
            <Reveal className="gr-work-art"><ProjectVisual id={project.id} /></Reveal>
            <Reveal as="article" className="gr-work-copy" delay={0.06}>
              <span>{project.period}</span>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
              <small>{project.stack}</small>
              <a href={project.href} target="_blank" rel="noreferrer">{project.cta}<ArrowUpRight size={15} /></a>
            </Reveal>
          </div>
          {index === 0 && (
            <Reveal className="gr-story-card">
              <div><span>THE SHIFT</span><strong>AI ENGINEER</strong><i /><strong>SDE-1</strong></div>
              <p>The change wasn’t leaving AI. It was widening the responsibility—from the intelligent layer to the product around it.</p>
            </Reveal>
          )}
        </div>
      ))}
    </section>
  );
}

function LayerGallery() {
  return (
    <section className="gr-layers">
      <div className="gr-shell">
        <Reveal as="h2">Layers I keep returning to.</Reveal>
        <Reveal as="p" delay={0.06}>Different tools. The same instinct: understand the handoff.</Reveal>
        <div className="gr-layer-grid">
          {[
            ["01", "LANGUAGE", "APIs make separate decisions speak."],
            ["02", "MEMORY", "Context changes what intelligence can do."],
            ["03", "PERCEPTION", "Vision turns raw pixels into useful clues."],
            ["04", "RELIABILITY", "Queues and containers keep promises under load."],
          ].map(([number, title, note], index) => (
            <Reveal as="article" key={title} delay={index * 0.04}><span>{number}</span><div aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{note}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="gr-journey">
      <div className="gr-shell">
        <Reveal as="h2">Journey</Reveal>
        <div className="gr-career">
          {career.map(([period, role, company, place], index) => (
            <Reveal as="article" key={`${role}-${company}`} delay={index * 0.04}>
              <span>{period}</span><h3>{role}</h3><strong>{company}</strong><p>{place}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="gr-education"><span>EDUCATION</span><h3>B.Tech, Computer Science</h3><strong>GITAM · 2021—2025</strong><p>CGPA 8.57</p></Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="gr-footer">
      <div className="gr-shell gr-footer-inner">
        <Reveal as="p">NEXT QUESTION</Reveal>
        <Reveal as="h2" delay={0.05}>Let’s make something that feels obvious after it works.</Reveal>
        <Reveal as="p" className="gr-footer-note" delay={0.1}>I’m interested in useful products, dependable systems and the small engineering decisions that make both feel effortless.</Reveal>
        <Reveal className="gr-footer-contact" delay={0.14}><a href={contact.email}>Email Parthiv <ArrowUpRight size={18} /></a></Reveal>
        <div className="gr-footer-bottom">
          <div><a href={contact.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href={contact.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} /></a></div>
          <span>Bengaluru, India</span>
          <a href="#top">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioReference() {
  useSmoothScroll();
  useEffect(() => {
    if (!location.hash) return undefined;
    const timer = setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ block: "start" }), 80);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <a className="gr-skip" href="#main-content">Skip to content</a>
      <PageProgress />
      <PillNav />
      <main id="main-content">
        <Hero />
        <About />
        <OneGoodTurn />
        <Interlude />
        <Work />
        <LayerGallery />
        <Journey />
      </main>
      <Footer />
    </>
  );
}
