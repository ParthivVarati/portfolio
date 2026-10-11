import { useCallback, useEffect, useMemo, useState } from "react";
import { links, profile, STORAGE_KEYS } from "./data/portfolio";
import {
  completeCommand,
  helpLines,
  parseCommand,
  resolveProject,
} from "./lib/commands";
import BootSequence from "./components/system/BootSequence";
import TerminalDock from "./components/system/TerminalDock";
import {
  AboutView,
  ArchitectureView,
  ContactView,
  ExperienceView,
  HelpView,
  HomeView,
  PocsView,
  ProductView,
  ProjectsView,
  SkillsView,
  SystemsView,
} from "./components/system/views";

const NAV = [
  "about",
  "experience",
  "projects",
  "systems",
  "architecture",
  "pocs",
  "product",
  "skills",
  "contact",
];

function readHash() {
  const raw = window.location.hash.replace("#", "").trim();
  if (!raw) return { view: "home", project: null };
  const [view, extra] = raw.split("/");
  const parsed = parseCommand([view, extra].filter(Boolean).join(" "));
  if (parsed.type === "view") {
    return { view: parsed.command, project: parsed.project?.slug || extra || null };
  }
  return { view: "home", project: null };
}

function writeHash(view, project) {
  const next = view === "home" ? "" : project && (view === "projects" || view === "architecture")
    ? `#${view}/${project}`
    : `#${view}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next || window.location.pathname);
  }
}

function hasSeenBoot() {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.boot) === "1";
  } catch {
    return false;
  }
}

function markBootSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEYS.boot, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export default function PortfolioSystem() {
  const initial = useMemo(() => readHash(), []);
  const [booting, setBooting] = useState(() => !hasSeenBoot());
  const [view, setView] = useState(initial.view);
  const [project, setProject] = useState(initial.project);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState([
    { tone: "ok", text: `${profile.handle}@${profile.host} ready` },
    { tone: "", text: "try about, experience, projects, systems, or help" },
  ]);

  const pushLog = useCallback((text, tone = "") => {
    setLogs((current) => [...current.slice(-10), { text, tone }]);
  }, []);

  const openView = useCallback((nextView, nextProject = null) => {
    setView(nextView);
    setProject(nextProject);
    writeHash(nextView, nextProject);
    const workspace = document.getElementById("sys-workspace");
    workspace?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      pushLog(`copied ${links.email}`, "ok");
    } catch {
      window.location.href = links.emailHref;
    }
  }, [pushLog]);

  const run = useCallback((raw) => {
    const text = raw.trim();
    if (!text) return;
    setHistory((current) => [...current, text]);
    setHistoryIndex(-1);
    setInput("");
    pushLog(`${profile.handle}@${profile.host} ~ % ${text}`, "cmd");

    const parsed = parseCommand(text);
    if (parsed.type === "unknown") {
      pushLog(`command not found: ${parsed.input}. try help`, "err");
      return;
    }
    if (parsed.type === "clear") {
      setLogs([]);
      return;
    }
    if (parsed.type === "resume") {
      window.open(links.resume, "_blank", "noopener,noreferrer");
      pushLog("opening resume", "ok");
      return;
    }
    if (parsed.type === "boot") {
      setBooting(true);
      return;
    }
    if (parsed.command === "contact" && parsed.args[0] === "copy") {
      copyEmail();
      openView("contact");
      return;
    }
    if (parsed.command === "help") {
      helpLines().forEach((line) => pushLog(line));
      openView("help");
      return;
    }

    const nextProject = parsed.project?.slug || null;
    if ((parsed.command === "projects" || parsed.command === "architecture") && parsed.args[0] && !parsed.project) {
      pushLog(`unknown system: ${parsed.args[0]}`, "err");
    } else {
      pushLog(`opening ${parsed.command}${nextProject ? ` / ${nextProject}` : ""}`, "ok");
    }
    openView(parsed.command, nextProject);
  }, [copyEmail, openView, pushLog]);

  const historyNav = useCallback((direction) => {
    if (!history.length) return;
    const from = historyIndex === -1 ? history.length : historyIndex;
    const next = from + direction;
    if (next >= history.length) {
      setHistoryIndex(-1);
      setInput("");
      return;
    }
    const clamped = Math.max(0, next);
    setHistoryIndex(clamped);
    setInput(history[clamped]);
  }, [history, historyIndex]);

  const complete = useCallback(() => {
    const suggestion = completeCommand(input);
    if (suggestion) setInput(suggestion);
  }, [input]);

  const finishBoot = useCallback(() => {
    markBootSeen();
    setBooting(false);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = readHash();
      setView(next.view);
      setProject(next.project);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const selectedProject = resolveProject(project);

  return (
    <div className="sys">
      <a className="sys-skip" href="#sys-workspace">Skip to content</a>
      {booting && <BootSequence onDone={finishBoot} />}

      <header className="sys-chrome">
        <a className="sys-brand" href="#home" onClick={(event) => { event.preventDefault(); run("home"); }}>
          <i className="sys-led is-pulse" aria-hidden="true" />
          {profile.shortName.toUpperCase()} SYSTEM
        </a>
        <div className="sys-chrome-meta">
          <span>{profile.title} · {profile.company}</span>
          <span>{profile.location}</span>
        </div>
        <nav className="sys-chrome-links" aria-label="Persistent links">
          <a className="sys-link" href={links.resume} target="_blank" rel="noreferrer">RESUME</a>
          <a className="sys-link" href={links.github} target="_blank" rel="noreferrer">GITHUB</a>
          <a className="sys-link" href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
          <a className="sys-link" href={links.emailHref}>EMAIL</a>
        </nav>
      </header>

      <nav className="sys-nav" aria-label="Explorer">
        <div className="sys-nav-label">EXPLORER</div>
        <button type="button" className={view === "home" ? "is-active" : ""} onClick={() => run("home")}>
          <span>00</span>home
        </button>
        {NAV.map((id, index) => (
          <button
            key={id}
            type="button"
            className={view === id ? "is-active" : ""}
            onClick={() => run(id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {id}
          </button>
        ))}
      </nav>

      <main id="sys-workspace" className="sys-workspace" tabIndex={-1}>
        <div className="sys-workspace-inner">
          {view === "home" && <HomeView onOpen={(next, slug) => run(`${next} ${slug}`)} />}
          {view === "about" && <AboutView />}
          {view === "experience" && <ExperienceView />}
          {view === "projects" && (
            <ProjectsView selected={selectedProject} onSelect={(slug) => run(`projects ${slug}`)} />
          )}
          {view === "systems" && <SystemsView />}
          {view === "architecture" && (
            <ArchitectureView selected={project} onSelect={(slug) => run(`architecture ${slug}`)} />
          )}
          {view === "pocs" && <PocsView />}
          {view === "product" && <ProductView />}
          {view === "skills" && <SkillsView />}
          {view === "contact" && <ContactView onCopy={copyEmail} copied={copied} />}
          {view === "help" && <HelpView onRun={run} />}
        </div>
      </main>

      <TerminalDock
        logs={logs}
        value={input}
        onChange={setInput}
        onSubmit={run}
        onHistory={historyNav}
        onComplete={complete}
        activeCommand={view}
        onRun={run}
      />
    </div>
  );
}
