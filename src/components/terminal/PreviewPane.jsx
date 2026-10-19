import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  architectures,
  certifications,
  education,
  experience,
  infrastructure,
  links,
  metrics,
  profile,
  projects,
  skillGroups,
} from "../../data/portfolio";
import { PROCESSES, shortHash } from "../../lib/terminalCommands";
import { SkillsGlobe } from "../SkillsGlobe";
import { GlobeErrorBoundary } from "../GlobeErrorBoundary";

const ease = [0.22, 1, 0.36, 1];

/* Staggered children — every view uses the same entrance rhythm */
function Stagger({ children, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }}
    >
      {children}
    </motion.div>
  );
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

function Item({ as = "div", className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item} {...rest}>
      {children}
    </Tag>
  );
}

function Eyebrow({ children }) {
  return <p className="pv-eyebrow">{children}</p>;
}

function Chips({ items, tone }) {
  return (
    <ul className={`pv-chips ${tone ? `is-${tone}` : ""}`}>
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

/* ─── README / start ─── */
const START_CARDS = [
  { cmd: "curl parthivvarati.me/whoami", title: "whoami", note: "Profile, as an API response" },
  { cmd: "git log", title: "git log", note: "Experience — one commit per role" },
  { cmd: "ls projects/", title: "projects/", note: "Voice platforms, agents, booking engines" },
  { cmd: "htop", title: "htop", note: "The production system he runs" },
  { cmd: "arch", title: "architecture", note: "How Vriksha Voice is wired" },
  { cmd: "skills --3d", title: "skills --3d", note: "The stack, on a globe" },
];

function StartView({ onType }) {
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>README.md</Eyebrow></Item>
      <Item as="h2" className="pv-hero">
        I build the systems behind <em>AI voice agents</em> — and keep them alive in production.
      </Item>
      <Item as="p" className="pv-lede">{profile.intro}</Item>
      <Item><Eyebrow>Run something — Char types it for you</Eyebrow></Item>
      <div className="pv-cmdgrid">
        {START_CARDS.map((card) => (
          <Item key={card.cmd} as="button" type="button" className="pv-cmdcard" onClick={() => onType(card.cmd)}>
            <span className="pv-cmdcard-cmd">$ {card.cmd}</span>
            <span className="pv-cmdcard-title">{card.title}</span>
            <span className="pv-cmdcard-note">{card.note}</span>
          </Item>
        ))}
      </div>
    </Stagger>
  );
}

/* ─── whoami ─── */
function AboutView() {
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>whoami.json · rendered</Eyebrow></Item>
      <Item as="h2" className="pv-name">{profile.fullName}</Item>
      <Item as="p" className="pv-role">
        {profile.title} · <span>{profile.company}</span> · {profile.location}
      </Item>
      <Item className="pv-facts">
        {profile.facts.map((f) => (
          <div key={f.label}>
            <span>{f.label}</span>
            <b>{f.value}</b>
          </div>
        ))}
      </Item>
      <Item><Eyebrow>The story</Eyebrow></Item>
      {profile.story.map((p) => (
        <Item as="p" key={p.slice(0, 24)} className="pv-prose">{p}</Item>
      ))}
      <Item><Eyebrow>Focus</Eyebrow></Item>
      <Item><Chips items={profile.focus} tone="accent" /></Item>
      <Item><Eyebrow>Education & certifications</Eyebrow></Item>
      <Item className="pv-list">
        {education.map((e) => (
          <p key={e.institute}>
            <b>{e.institute}</b> — {e.degree} <span>{e.period} · {e.score}</span>
          </p>
        ))}
        {certifications.map((c) => (
          <p key={c.name}>
            {c.name} <span>{c.org} · {c.year}</span>
          </p>
        ))}
      </Item>
    </Stagger>
  );
}

/* ─── git log ─── */
function ExperienceView() {
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>git log --graph</Eyebrow></Item>
      <ol className="pv-graph">
        {experience.map((role, i) => (
          <Item as="li" key={role.id} className={`pv-commit ${role.current ? "is-head" : ""}`}>
            <span className="pv-node" aria-hidden="true" />
            <p className="pv-commit-meta">
              <code>{shortHash(role.id)}</code>
              {i === 0 && <span className="pv-ref">HEAD → main</span>}
              <span>{role.period}</span>
            </p>
            <h3>{role.role}</h3>
            <p className="pv-commit-co">{role.company} · {role.location}</p>
            <p className="pv-prose">{role.summary}</p>
            <ul className="pv-diff">
              {role.points.map((pt) => (
                <li key={pt.slice(0, 30)}>{pt}</li>
              ))}
            </ul>
            <Chips items={role.skills} />
          </Item>
        ))}
        {education.map((ed) => (
          <Item as="li" key={ed.institute} className="pv-commit is-root">
            <span className="pv-node" aria-hidden="true" />
            <p className="pv-commit-meta">
              <code>{shortHash(ed.institute)}</code>
              <span className="pv-ref is-tag">tag: graduated</span>
              <span>{ed.period}</span>
            </p>
            <h3>{ed.institute}</h3>
            <p className="pv-commit-co">{ed.degree} · {ed.score}</p>
          </Item>
        ))}
      </ol>
    </Stagger>
  );
}

/* ─── projects/ ─── */
function ProjectsView({ onRun }) {
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>projects/ · {projects.length} entries</Eyebrow></Item>
      <div className="pv-cards">
        {featured.map((p, i) => (
          <Item
            key={p.id}
            as="button"
            type="button"
            className={`pv-card ${i === 0 ? "is-wide" : ""}`}
            onClick={() => onRun(`open ${p.slug}`)}
          >
            <span className="pv-card-top">
              <span className={`pv-status ${p.status === "Production" ? "is-live" : ""}`}>{p.status}</span>
              <span className="pv-card-kind">{p.kind}</span>
            </span>
            <span className="pv-card-title">{p.title}</span>
            <span className="pv-card-sum">{p.summary}</span>
            <span className="pv-card-stack">{p.stack.slice(0, 5).join(" · ")}</span>
            <span className="pv-card-open">open {p.slug} →</span>
          </Item>
        ))}
      </div>
      <Item><Eyebrow>archive</Eyebrow></Item>
      <Item className="pv-archive">
        {archive.map((p) => (
          <button key={p.id} type="button" onClick={() => onRun(`open ${p.slug}`)}>
            <b>{p.title}</b>
            <span>{p.kind} · {p.period}</span>
          </button>
        ))}
      </Item>
    </Stagger>
  );
}

function ProjectView({ slug, onRun }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const stats = p.metricIds.map((id) => metrics[id]).filter(Boolean);
  return (
    <Stagger className="pv-view">
      <Item>
        <button type="button" className="pv-back" onClick={() => onRun("ls projects/")}>← projects/</button>
      </Item>
      <Item className="pv-card-top">
        <span className={`pv-status ${p.status === "Production" ? "is-live" : ""}`}>{p.status}</span>
        <span className="pv-card-kind">{p.kind} · {p.period}</span>
      </Item>
      <Item as="h2" className="pv-name">{p.title}</Item>
      <Item as="p" className="pv-role">{p.company} · {p.role}</Item>
      <Item as="p" className="pv-lede">{p.summary}</Item>
      {stats.length > 0 && (
        <Item className="pv-stats">
          {stats.map((m) => (
            <div key={m.id}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </Item>
      )}
      {p.capabilities.length > 0 && (
        <>
          <Item><Eyebrow>Capabilities</Eyebrow></Item>
          <Item><Chips items={p.capabilities} /></Item>
        </>
      )}
      <Item><Eyebrow>Highlights</Eyebrow></Item>
      <ul className="pv-diff">
        {p.highlights.map((h) => (
          <Item as="li" key={h}>{h}</Item>
        ))}
      </ul>
      <Item><Eyebrow>Stack</Eyebrow></Item>
      <Item><Chips items={p.stack} tone="accent" /></Item>
      {p.architectureId && (
        <>
          <Item><Eyebrow>Architecture</Eyebrow></Item>
          <Item><ArchDiagram id={p.architectureId} /></Item>
        </>
      )}
      {p.href && (
        <Item>
          <a className="pv-cta" href={p.href} target="_blank" rel="noopener noreferrer">{p.cta} ↗</a>
        </Item>
      )}
    </Stagger>
  );
}

/* ─── htop ─── */
function HtopView() {
  const tiles = [metrics.calls, metrics.campaigns, metrics.clients, metrics.latency, metrics.concurrent, metrics.integrations];
  return (
    <Stagger className="pv-view">
      <Item className="pv-htop-head">
        <Eyebrow>htop · vriksha-voice</Eyebrow>
        <span className="pv-live"><i /> production</span>
      </Item>
      <Item as="h2" className="pv-hero is-small">
        A multi-tenant AI voice-agent platform. I'm a core contributor — from the services to the AWS infrastructure underneath.
      </Item>
      <div className="pv-tiles">
        {tiles.map((m) => (
          <Item key={m.id} className={`pv-tile ${m.value.length > 7 ? "is-long" : ""}`}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </Item>
        ))}
      </div>
      <Item><Eyebrow>Processes</Eyebrow></Item>
      <Item className="pv-proc">
        {PROCESSES.map(([name, note], i) => (
          <p key={name}>
            <span className="pv-proc-pid">{101 + i}</span>
            <span className="pv-proc-name">{name}</span>
            <span className="pv-proc-state"><i /> running</span>
            <span className="pv-proc-note">{note}</span>
          </p>
        ))}
      </Item>
      <Item><Eyebrow>Infrastructure</Eyebrow></Item>
      <Item className="pv-infra">
        {infrastructure.technologies.map((g) => (
          <div key={g.group}>
            <span>{g.group}</span>
            <Chips items={g.items} />
          </div>
        ))}
      </Item>
    </Stagger>
  );
}

/* ─── architecture ─── */
function ArchDiagram({ id }) {
  const arch = architectures[id];
  if (!arch) return null;

  if (arch.kind === "hub") {
    return (
      <div className="pv-hub">
        <div className="pv-hub-center">
          <b>{arch.center.label}</b>
          <span>{arch.center.note}</span>
        </div>
        <div className="pv-hub-spokes">
          {arch.spokes.map((s) => (
            <div key={s.id} className="pv-hub-spoke">
              <b>{s.label}</b>
              <span>{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ol className="pv-flow">
      {arch.stages.map((s) => (
        <li key={s.id} className="pv-flow-stage">
          <div className="pv-flow-node">
            <b>{s.label}</b>
            <span>{s.note}</span>
          </div>
          {s.branches && (
            <div className="pv-flow-branches">
              {s.branches.map((b) => (
                <span key={b.id}>{b.label}</span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function ArchitectureView({ id, onRun }) {
  const arch = architectures[id] || architectures["vriksha-voice"];
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>architecture/{arch.id}.md</Eyebrow></Item>
      <Item className="pv-seg" role="tablist">
        {Object.values(architectures).map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === arch.id}
            className={a.id === arch.id ? "is-on" : ""}
            onClick={() => a.id !== arch.id && onRun(`arch ${a.id}`)}
          >
            {a.title}
          </button>
        ))}
      </Item>
      <Item as="h2" className="pv-name">{arch.title}</Item>
      <Item as="p" className="pv-lede">{arch.intro}</Item>
      <Item><ArchDiagram id={arch.id} /></Item>
    </Stagger>
  );
}

/* ─── skills.3d ─── */
const SHORT = {
  "Data Structures and Algorithms": "DSA",
  "Object-Oriented Programming": "OOP",
  "Full-Stack Development": "Full-Stack",
  "Artificial Intelligence": "AI",
  "Information Retrieval": "Info Retrieval",
  "AWS (ECS, EC2, VPC, SQS, Load Balancing)": "AWS",
  "Razorpay APIs": "Razorpay",
};

const GROUP_STYLE = [
  { short: "Languages", color: "#ffb454" },
  { short: "CS", color: "#f78c6c" },
  { short: "Backend", color: "#7fd1b9" },
  { short: "AI / ML", color: "#c792ea" },
  { short: "Cloud", color: "#82aaff" },
  { short: "Tools", color: "#a6accd" },
];

function SkillsView() {
  const [group, setGroup] = useState("all");

  const items = useMemo(() => {
    const all = skillGroups.flatMap((g, gi) =>
      g.items.map((name) => ({ name: SHORT[name] || name, color: GROUP_STYLE[gi].color, group: gi })),
    );
    return group === "all" ? all : all.filter((s) => s.group === group);
  }, [group]);

  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>skills.3d · drag to spin</Eyebrow></Item>
      <Item className="pv-seg is-wrap" role="tablist">
        <button type="button" role="tab" aria-selected={group === "all"} className={group === "all" ? "is-on" : ""} onClick={() => setGroup("all")}>
          All
        </button>
        {GROUP_STYLE.map((g, gi) => (
          <button
            key={g.short}
            type="button"
            role="tab"
            aria-selected={group === gi}
            className={group === gi ? "is-on" : ""}
            onClick={() => setGroup(gi)}
          >
            <i style={{ background: g.color }} /> {g.short}
          </button>
        ))}
      </Item>
      <Item className="pv-globe">
        <GlobeErrorBoundary>
          <SkillsGlobe
            items={items}
            tint="#ffb454"
            className="pv-globe-canvas"
            labelClassName="pv-globe-label"
          />
        </GlobeErrorBoundary>
      </Item>
      <Item className="pv-infra">
        {skillGroups.map((g, gi) => (
          <div key={g.label}>
            <span><i style={{ background: GROUP_STYLE[gi].color }} /> {g.label}</span>
            <Chips items={g.items.map((n) => SHORT[n] || n)} />
          </div>
        ))}
      </Item>
    </Stagger>
  );
}

/* ─── contact.vcf ─── */
function useLocalTime(timeZone) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-IN", { timeZone, hour: "numeric", minute: "2-digit" });
}

function ContactView() {
  const time = useLocalTime(profile.timezone);
  const rows = [
    { k: "GitHub", v: links.github.replace("https://", ""), href: links.github },
    { k: "LinkedIn", v: links.linkedin.replace("https://www.", ""), href: links.linkedin },
    { k: "LeetCode", v: links.leetcode.replace("https://", ""), href: links.leetcode },
    { k: "Web", v: links.website.replace("https://", ""), href: links.website },
    { k: "Résumé", v: "Google Drive · PDF", href: links.resume },
  ];
  return (
    <Stagger className="pv-view">
      <Item><Eyebrow>contact.vcf</Eyebrow></Item>
      <Item as="h2" className="pv-hero">
        Got a hard systems problem? <em>Let's talk.</em>
      </Item>
      <Item as="p" className="pv-lede">
        It's {time} in {profile.location.split(",")[0]} right now.
      </Item>
      <Item>
        <a className="pv-mail" href={links.emailHref}>
          {links.email} <span>↗</span>
        </a>
      </Item>
      <Item className="pv-contact">
        {rows.map((r) => (
          <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer">
            <span>{r.k}</span>
            <b>{r.v}</b>
            <i>↗</i>
          </a>
        ))}
      </Item>
    </Stagger>
  );
}

/* ─── Router ─── */
export function PreviewView({ view, arg, onRun, onType }) {
  switch (view) {
    case "about":
      return <AboutView />;
    case "experience":
      return <ExperienceView />;
    case "projects":
      return <ProjectsView onRun={onRun} />;
    case "project":
      return <ProjectView slug={arg} onRun={onRun} />;
    case "htop":
      return <HtopView />;
    case "architecture":
      return <ArchitectureView id={arg} onRun={onRun} />;
    case "skills":
      return <SkillsView />;
    case "contact":
      return <ContactView />;
    default:
      return <StartView onType={onType} />;
  }
}

export default function PreviewPane({ view, arg, tabs, busy, onRun, onType, guideRef }) {
  const reduce = useReducedMotion();
  const activeTab = view === "project" ? "projects" : view;

  return (
    <aside className="pane" aria-label="Preview">
      <nav className="pane-tabs" aria-label="Sections">
        {tabs.map((tab) => (
          <button
            key={tab.view}
            type="button"
            className={tab.view === activeTab ? "is-on" : ""}
            disabled={busy}
            onClick={() => tab.view !== view && onRun(tab.cmd)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="pane-scroll">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${view}-${arg || ""}`}
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease }}
          >
            <PreviewView view={view} arg={arg} onRun={onRun} onType={onType} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pane-guide" ref={guideRef}>
        <span className="pane-guide-label">char · guide</span>
      </div>
    </aside>
  );
}
