import {
  experience,
  links,
  profile,
  projects,
  skillGroups,
} from "../data/portfolio";

/** Explore order — one clickable command at a time */
export const EXPLORE_FLOW = [
  "experience",
  "about",
  "projects",
  "skills",
  "contact",
];

export const PATH_CHIPS = [
  { cmd: "explore", label: "explore" },
  { cmd: "./portfolio.sh", label: "automate" },
];

const L = (text, tone = "text") => ({ text, tone });

function rule() {
  return L("────────────────────────────────────────", "rule");
}

function bar(pct = 100) {
  const filled = Math.round((pct / 100) * 36);
  return L(`${"#".repeat(filled)}${"-".repeat(36 - filled)} ${pct.toFixed(1)}%`, "bar");
}

/** Homebrew / package-install style section output */
export function renderSection(name) {
  switch (name) {
    case "ls":
      return [
        L("", "blank"),
        L("total 2", "muted"),
        L("drwxr-xr-x  explore/", "cyan"),
        L("-rwxr-xr-x  ./portfolio.sh*", "yellow"),
        L("", "blank"),
        L("  explore/         walk section by section", "muted"),
        L("  ./portfolio.sh   install everything at once", "muted"),
        L("", "blank"),
      ];
    case "experience":
      return [
        L("", "blank"),
        L("==> Downloading experience…", "brew"),
        bar(100),
        L("==> Pouring experience--1.0.0.arm64_sonoma.bottle.tar.gz", "brew"),
        rule(),
        L("EXPERIENCE", "header"),
        L("Roles & ownership across production systems", "muted"),
        L("", "blank"),
        ...experience.flatMap((role, i) => [
          L(`${i === 0 ? "●" : "○"}  ${role.role}`, "title"),
          L(`   ${role.company}`, "cyan"),
          L(`   ${role.period}  ·  ${role.location}`, "muted"),
          L(`   ${role.summary}`, "text"),
          ...role.points.slice(0, 4).map((p) => L(`   ▸ ${p}`, "bullet")),
          L("", "blank"),
        ]),
        L("✔ experience installed", "success"),
        L("", "blank"),
      ];
    case "about":
      return [
        L("", "blank"),
        L("==> Downloading about…", "brew"),
        bar(100),
        L("==> Pouring about--1.0.0.bottle.tar.gz", "brew"),
        rule(),
        L("ABOUT", "header"),
        L(`${profile.name}`, "title"),
        L(`${profile.title} @ ${profile.company}`, "cyan"),
        L(`${profile.location}  ·  ${profile.phone || ""}`, "muted"),
        L("", "blank"),
        L(profile.intro, "text"),
        L("", "blank"),
        L("FOCUS", "label"),
        ...profile.focus.map((f) => L(`   ▸ ${f}`, "bullet")),
        L("", "blank"),
        L("✔ about installed", "success"),
        L("", "blank"),
      ];
    case "projects":
      return [
        L("", "blank"),
        L("==> Downloading projects…", "brew"),
        bar(100),
        L("==> Pouring projects--1.0.0.bottle.tar.gz", "brew"),
        rule(),
        L("PROJECTS", "header"),
        L("Production systems owned end-to-end", "muted"),
        L("", "blank"),
        ...projects
          .filter((p) => p.featured)
          .flatMap((p) => [
            L(`◆  ${p.title}`, "title"),
            L(`   ${p.kind}  ·  ${p.status}  ·  ${p.period}`, "cyan"),
            L(`   ${p.summary}`, "text"),
            L(`   ${p.stack.slice(0, 6).join(" · ")}`, "yellow"),
            L("", "blank"),
          ]),
        L("archive  Emotional Companion · Forecast · SnapTrip · Freelancer", "muted"),
        L("featured  Vriksha Voice · Agentic Hiring · Clipztr · Signal Box · MyRush", "muted"),
        L("", "blank"),
        L("✔ projects installed", "success"),
        L("", "blank"),
      ];
    case "skills":
      return [
        L("", "blank"),
        L("==> brew list --formula", "brew"),
        bar(100),
        rule(),
        L("STACK", "header"),
        ...skillGroups.flatMap((g) => [
          L("", "blank"),
          L(g.label.toUpperCase(), "label"),
          L(`   ${g.items.join("  ·  ")}`, "text"),
        ]),
        L("", "blank"),
        L("✔ stack listed", "success"),
        L("", "blank"),
      ];
    case "contact":
      return [
        L("", "blank"),
        L("==> Downloading contact…", "brew"),
        bar(100),
        L("==> Pouring contact--1.0.0.bottle.tar.gz", "brew"),
        rule(),
        L("CONTACT", "header"),
        L(`   email     ${links.email}`, "text"),
        L(`   phone     ${profile.phone || ""}`, "text"),
        L(`   github    ${links.github}`, "cyan"),
        L(`   linkedin  ${links.linkedin}`, "cyan"),
        L(`   leetcode  ${links.leetcode || ""}`, "cyan"),
        L(`   web       ${links.website || ""}`, "cyan"),
        L(`   resume    type resume to open`, "yellow"),
        L("", "blank"),
        L("✔ contact installed", "success"),
        L("", "blank"),
      ];
    case "help":
      return [
        L("", "blank"),
        L("COMMANDS", "header"),
        L("   ls                start here", "text"),
        L("   explore           section by section", "text"),
        L("   ./portfolio.sh    full install (automate)", "text"),
        L("   experience about projects skills contact", "muted"),
        L("   clear help resume", "muted"),
      ];
    case "whoami":
      return [L(`${profile.name} — ${profile.title} @ ${profile.company}`, "cyan")];
    default:
      return null;
  }
}

/**
 * Char’s guided state — greet → ls → choose → explore one-by-one / automate
 */
export function liveGuide(typed, {
  stage = "greet",
  exploreStep = 0,
  busy = false,
  status = "",
} = {}) {
  if (busy) {
    return {
      mood: "think",
      thought: status || "on it…",
      hints: [],
    };
  }

  const t = typed.trim().toLowerCase();

  if (stage === "greet") {
    return {
      mood: "talk",
      thought: `Hey — I’m ${profile.handle}’s pet. I can help you explore his portfolio. Click ls — I’ll type it for you.`,
      hints: [{ cmd: "ls", label: "ls" }],
    };
  }

  if (stage === "choose") {
    return {
      mood: "talk",
      thought:
        "Want explore? I’ll hand you one command at a time — just click. Or automate to install everything at once.",
      hints: [
        { cmd: "explore", label: "explore" },
        { cmd: "./portfolio.sh", label: "automate" },
      ],
    };
  }

  if (stage === "explore") {
    const next = EXPLORE_FLOW[exploreStep];
    if (!next) {
      return {
        mood: "happy",
        thought:
          "That’s every section. Want the full dump again in one shot? Click automate.",
        hints: [
          { cmd: "./portfolio.sh", label: "automate" },
          { cmd: "ls", label: "ls" },
        ],
      };
    }
    const lines = {
      experience: "First package: experience. Click it — I’ll type + enter.",
      about: "Next: about. Click when you’re ready.",
      projects: "Now projects. One click.",
      skills: "Stack time — click skills.",
      contact: "Last one: contact. Then you’re done.",
    };
    return {
      mood: "talk",
      thought: lines[next] || `Next: ${next} — just click.`,
      hints: [
        { cmd: next, label: next },
        { cmd: "./portfolio.sh", label: "automate" },
      ],
    };
  }

  if (stage === "done") {
    return {
      mood: "happy",
      thought: "All set. Click ls anytime to start over, or automate for a full reinstall.",
      hints: [
        { cmd: "ls", label: "ls" },
        { cmd: "./portfolio.sh", label: "automate" },
      ],
    };
  }

  // Typing overrides — still helpful if they type freely
  if (t) {
    if (t === "ls" || "ls".startsWith(t)) {
      return { mood: "happy", thought: "ls — hit enter or click it", hints: [{ cmd: "ls", label: "ls" }] };
    }
    if ("explore".startsWith(t)) {
      return { mood: "think", thought: "explore — one command at a time", hints: [{ cmd: "explore", label: "explore" }] };
    }
    if (t.includes("port") || t.startsWith("./") || t.startsWith("auto")) {
      return {
        mood: "think",
        thought: "automate — full install in one go",
        hints: [{ cmd: "./portfolio.sh", label: "automate" }],
      };
    }
  }

  return {
    mood: "idle",
    thought: "listening… or click a command below",
    hints: [{ cmd: "ls", label: "ls" }],
  };
}

export function autoTourSections() {
  return [...EXPLORE_FLOW];
}

export function agentCopy(stage, exploreStep = 0) {
  return liveGuide("", { stage, exploreStep, busy: false });
}
