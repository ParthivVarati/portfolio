import { education, links, metrics, profile } from "../../data/portfolio";

/* ANSI Shadow glyphs — joined row by row so the art stays aligned */
const GLYPHS = {
  P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
  A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
  T: ["████████╗", "╚══██╔══╝", "   ██║   ", "   ██║   ", "   ██║   ", "   ╚═╝   "],
  H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
  V: ["██╗   ██╗", "██║   ██║", "██║   ██║", "╚██╗ ██╔╝", " ╚████╔╝ ", "  ╚═══╝  "],
};

const ART = Array.from({ length: 6 }, (_, row) =>
  "PARTHIV".split("").map((ch) => GLYPHS[ch][row]).join(""),
).join("\n");

const INFO = [
  ["Role", `SDE-1 · ${profile.company}`],
  ["Location", profile.location],
  ["Focus", "Voice AI · Backend · RAG · AWS"],
  ["Stack", "Java · Spring Boot · Python · Terraform"],
  ["Education", `B.Tech CSE · ${education[0].institute.split(" ")[0]} '25`],
];

const STATS = [metrics.calls, metrics.latency, metrics.campaigns, metrics.clients];

const LINKS = [
  { label: "github", href: links.github },
  { label: "linkedin", href: links.linkedin },
  { label: "email", href: links.emailHref },
  { label: "résumé", href: links.resume },
];

const SWATCHES = ["#ff453a", "#ff9f0a", "#ffd60a", "#3dd68c", "#64d2ff", "#0a84ff", "#bf5af2", "#e8e8ed"];

export default function WelcomeCard({ onRun }) {
  return (
    <section className="welcome" aria-label={`${profile.name} — summary`}>
      <div className="welcome-top">
        <pre className="welcome-art" aria-hidden="true">{ART}</pre>

        <div className="welcome-info">
          <p className="welcome-id">
            <span className="t-user">{profile.handle}</span>
            <span className="t-at">@</span>
            <span className="t-host">vriksha-ai</span>
          </p>
          <p className="welcome-rule" aria-hidden="true">──────────────────</p>
          <h1 className="sr-only">{profile.fullName} — {profile.title}</h1>
          {INFO.map(([k, v]) => (
            <p key={k} className="welcome-row">
              <span className="welcome-key">{k}</span>
              <span>{v}</span>
            </p>
          ))}
          <p className="welcome-swatches" aria-hidden="true">
            {SWATCHES.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </p>
        </div>
      </div>

      <dl className="welcome-stats">
        {STATS.map((m) => (
          <div key={m.id}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="welcome-links">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label} ↗
          </a>
        ))}
        <button type="button" className="welcome-help" onClick={() => onRun?.("help")}>
          type <b>help</b> — or let Char drive
        </button>
      </div>
    </section>
  );
}
