import {
  education,
  experience,
  links,
  metrics,
  profile,
  projects,
  skillGroups,
  architectures,
} from "../data/portfolio";

/**
 * Guided tour — Char types these one at a time.
 * `id` is the resolved command, `cmd` is what gets typed.
 */
export const EXPLORE_FLOW = [
  { id: "about", cmd: "curl parthivvarati.me/whoami", label: "whoami" },
  { id: "experience", cmd: "git log", label: "git log" },
  { id: "projects", cmd: "ls projects/", label: "ls projects/" },
  { id: "htop", cmd: "htop", label: "htop" },
  { id: "architecture", cmd: "arch", label: "arch" },
  { id: "skills", cmd: "skills --3d", label: "skills --3d" },
  { id: "contact", cmd: "contact", label: "contact" },
];

/** Preview-pane tabs (run directly, no typing) */
export const PANE_TABS = [
  { view: "start", cmd: "help", label: "README.md" },
  { view: "tldr", cmd: "tldr", label: "tldr" },
  { view: "about", cmd: "curl parthivvarati.me/whoami", label: "whoami.json" },
  { view: "experience", cmd: "git log", label: "git log" },
  { view: "projects", cmd: "ls projects/", label: "projects/" },
  { view: "htop", cmd: "htop", label: "htop" },
  { view: "architecture", cmd: "arch", label: "arch" },
  { view: "skills", cmd: "skills --3d", label: "skills.3d" },
  { view: "contact", cmd: "contact", label: "contact.vcf" },
];

/** Phone section bar — one tap, no typing */
export const MOBILE_NAV = [
  { view: "tldr", cmd: "tldr", label: "⚡ 60s summary", hot: true },
  { view: "about", cmd: "curl parthivvarati.me/whoami", label: "whoami" },
  { view: "experience", cmd: "git log", label: "experience" },
  { view: "projects", cmd: "ls projects/", label: "projects" },
  { view: "htop", cmd: "htop", label: "htop" },
  { view: "architecture", cmd: "arch", label: "arch" },
  { view: "skills", cmd: "skills --3d", label: "skills" },
  { view: "contact", cmd: "contact", label: "contact" },
];

/** The 60-second recruiter summary — shared by the terminal and the preview */
export const TLDR = {
  oneLiner: `${profile.title} at ${profile.company}, building multi-tenant AI voice platforms, backend services and AWS infrastructure.`,
  wins: [
    `Core contributor to Vriksha Voice — ${metrics.calls.value} calls, ${metrics.campaigns.value} campaigns, ${metrics.clients.value} business customers, ${metrics.latency.value} median voice latency.`,
    "Designed the provider-agnostic voice layer: STT, TTS, telephony and the in-house Signal Box engine behind one interface.",
    `Built a Thompson Sampling ROI experimentation engine and SQS-backed campaign orchestration for ${metrics.concurrent.value} concurrent calls.`,
    "Designs, deploys and maintains the AWS stack (ECS, DynamoDB, ElastiCache, PostgreSQL, SQS) with Terraform and GitHub Actions.",
  ],
  projects: ["vriksha-voice", "signal-box", "myrush", "agentic-hiring"],
  stack: ["Java", "Spring Boot", "Python", "AWS", "Terraform", "Docker", "PostgreSQL", "RAG / LLMs"],
  previously: "AI Engineer at Nimoy AI (Sep 2025 — Mar 2026): RAG pipelines and LLM orchestration.",
};

const COMPLETIONS = [
  "tldr",
  "ls",
  "help",
  "curl parthivvarati.me/whoami",
  "whoami",
  "git log",
  "ls projects/",
  ...projects.map((p) => `open ${p.slug}`),
  "htop",
  "arch",
  "arch vriksha-voice",
  "arch signal-box",
  "arch myrush",
  "skills --3d",
  "contact",
  "resume",
  "explore",
  "./portfolio.sh",
  "sudo hire parthiv",
  "clear",
];

/* ─── Line helpers ───
 * { text, tone }                  plain line
 * { parts: [{ text, tone, href, cmd }] }  mixed line (links / runnable commands)
 * { type: "view", view, arg }     preview marker (inline preview on phones)
 * { type: "welcome" }             neofetch card
 */
const L = (text, tone = "text") => ({ text, tone });
const P = (...parts) => ({ parts });
const t = (text, tone) => ({ text, tone });
const a = (text, href, tone = "link") => ({ text, href, tone });
const c = (text, cmd, tone = "cmd") => ({ text, cmd, tone });
const blank = () => L("", "blank");
const view = (name, arg) => ({ type: "view", view: name, arg });

const pad = (s, n) => (s.length >= n ? `${s} ` : s + " ".repeat(n - s.length));

export function shortHash(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/* ─── JSON pretty-printer with syntax tones + clickable URLs ─── */
function jsonValue(v) {
  if (typeof v === "string") {
    const s = JSON.stringify(v);
    return v.startsWith("http") || v.startsWith("mailto:")
      ? a(s, v, "j-link")
      : t(s, "j-str");
  }
  if (typeof v === "number") return t(String(v), "j-num");
  return t(String(v), "j-bool");
}

function jsonLines(obj, indent = 0) {
  const sp = "  ".repeat(indent);
  const entries = Object.entries(obj);
  const out = [];
  entries.forEach(([k, v], i) => {
    const comma = i < entries.length - 1 ? "," : "";
    const key = [t(`${sp}  `), t(`"${k}"`, "j-key"), t(": ")];
    if (Array.isArray(v)) {
      const inline = JSON.stringify(v);
      if (inline.length < 52) {
        const parts = [...key, t("[")];
        v.forEach((item, j) => {
          parts.push(jsonValue(item));
          if (j < v.length - 1) parts.push(t(", "));
        });
        parts.push(t(`]${comma}`));
        out.push(P(...parts));
      } else {
        out.push(P(...key, t("[")));
        v.forEach((item, j) => {
          out.push(P(t(`${sp}    `), jsonValue(item), t(j < v.length - 1 ? "," : "")));
        });
        out.push(L(`${sp}  ]${comma}`));
      }
    } else if (v && typeof v === "object") {
      out.push(P(...key, t("{")));
      jsonLines(v, indent + 1).slice(1, -1).forEach((l) => out.push(l));
      out.push(L(`${sp}  }${comma}`));
    } else {
      out.push(P(...key, jsonValue(v), t(comma)));
    }
  });
  return [L(`${sp}{`), ...out, L(`${sp}}`)];
}

/* ─── Command resolution ─── */
export function resolveCommand(raw) {
  const cmd = raw.trim().replace(/\s+/g, " ");
  const key = cmd.toLowerCase();
  const [head, ...rest] = key.split(" ");
  const arg = rest.join(" ").replace(/^projects\//, "").replace(/\/$/, "");

  if (["portfolio.sh", "./portfolio.sh", "sh", "auto", "automate"].includes(key)) {
    return { id: "automate" };
  }
  if (["explore", "manual", "tour"].includes(key)) return { id: "explore" };
  if (key === "clear" || key === "cls") return { id: "clear" };
  if (key === "resume" || key === "cv" || key === "open resume") return { id: "resume" };
  if (key === "ls" || key === "ls -la" || key === "ls ~" || key === "ll") return { id: "ls" };
  if (["help", "man", "?", "readme", "cat readme.md"].includes(key)) return { id: "help" };
  if (["tldr", "tl;dr", "tldr parthiv", "summary", "60s", "recruiter"].includes(key)) return { id: "tldr" };

  if (
    key === "about" ||
    key === "whoami" ||
    key === "cat whoami.json" ||
    (head === "curl" && key.includes("whoami"))
  ) {
    return { id: "about" };
  }
  if (head === "curl") return { id: "curl" };

  if (
    ["experience", "exp", "work", "git log", "git log --oneline", "git log --graph", "cat experience.log"].includes(key)
  ) {
    return { id: "experience" };
  }
  if (head === "git") return { id: "git" };

  if (
    ["projects", "project", "ls projects", "ls projects/", "ls -la projects/", "cd projects", "cd projects/"].includes(key)
  ) {
    return { id: "projects" };
  }
  if ((head === "open" || head === "cat" || head === "cd" || head === "projects") && arg) {
    if (arg === "architecture.md") return { id: "architecture", arg: "vriksha-voice" };
    if (arg === "contact.vcf") return { id: "contact" };
    if (arg === "skills.3d") return { id: "skills" };
    return { id: "project", arg };
  }

  if (["htop", "top", "metrics", "systems", "infra", "infrastructure", "uptime"].includes(key)) {
    return { id: "htop" };
  }
  if (["arch", "architecture", "tree", "cat architecture.md"].includes(head) || key === "cat architecture.md") {
    return { id: "architecture", arg: arg || "vriksha-voice" };
  }
  if (
    key === "skills" ||
    key === "skills --3d" ||
    key === "stack" ||
    key === "brew list" ||
    key === "open skills.3d"
  ) {
    return { id: "skills" };
  }
  if (["contact", "mail", "email", "cat contact.vcf"].includes(key)) return { id: "contact" };

  if (key === "sudo hire parthiv" || key === "hire parthiv" || key === "hire") return { id: "hire" };
  if (head === "sudo") return { id: "sudo" };
  if (["vim", "vi", "nano", "emacs"].includes(head)) return { id: "vim" };
  if ([":q", ":q!", ":wq", ":x", "zz"].includes(key)) return { id: "quitvim" };
  if (head === "rm") return { id: "rm" };
  if (key === "exit" || key === "logout") return { id: "exit" };
  if (key === "pwd") return { id: "pwd" };
  if (head === "cd") return { id: "cd" };
  if (head === "echo") return { id: "echo", arg: cmd.slice(5) };
  if (key === "date") return { id: "date" };
  if (head === "ping") return { id: "ping" };
  if (key === "brew coffee" || key === "coffee" || key === "make coffee") return { id: "coffee" };

  return { id: "unknown" };
}

/* ─── Sections ─── */
function featuredProjects() {
  return projects.filter((p) => p.featured);
}

function archAscii(id) {
  const arch = architectures[id];
  if (!arch) return [];
  if (arch.kind === "hub") {
    const out = [L(`  ┌─ ${arch.center.label} ─┐`, "title"), L("  │", "rule")];
    arch.spokes.forEach((s, i) => {
      const last = i === arch.spokes.length - 1;
      out.push(P(t(`  ${last ? "└" : "├"}──▶ `, "rule"), t(s.label, "cyan")));
      out.push(L(`  ${last ? " " : "│"}      ${s.note}`, "muted"));
    });
    return out;
  }
  const out = [];
  arch.stages.forEach((s, i) => {
    out.push(P(t("  ● ", "accent"), t(s.label, "title")));
    out.push(L(`  │ ${s.note}`, "muted"));
    if (s.branches) {
      s.branches.forEach((b, j) => {
        const last = j === s.branches.length - 1;
        out.push(P(t(`  │   ${last ? "└" : "├"}─ `, "rule"), t(b.label, "cyan")));
      });
    }
    if (i < arch.stages.length - 1) out.push(L("  ▼", "rule"));
  });
  return out;
}

const PROCESSES = [
  ["campaign-engine", "SQS-backed orchestration · 100+ concurrent calls"],
  ["provider-layer", "STT · TTS · telephony behind one interface"],
  ["signal-box", "in-house voice engine"],
  ["rag-kb-api", "embedding-based agent grounding"],
  ["roi-bandits", "Thompson Sampling script A/B tests"],
  ["intent-llm", "LLM call-intent classification"],
  ["billing-engine", "rule-based pricing · Razorpay"],
];
export { PROCESSES };

export function runCommand(raw) {
  const { id, arg } = resolveCommand(raw);

  switch (id) {
    case "ls":
      return {
        id,
        view: view("start"),
        lines: [
          L("total 9", "muted"),
          P(t("-rw-r--r--  "), c("whoami.json", "curl parthivvarati.me/whoami"), t("        who he is", "muted")),
          P(t("-rw-r--r--  "), c("experience.log", "git log"), t("     roles as commits", "muted")),
          P(t("drwxr-xr-x  "), c("projects/", "ls projects/"), t("          things he shipped", "muted")),
          P(t("-rwxr-xr-x  "), c("htop", "htop"), t("               production, live-ish", "muted")),
          P(t("-rw-r--r--  "), c("architecture.md", "arch"), t("    how it's wired", "muted")),
          P(t("-rw-r--r--  "), c("skills.3d", "skills --3d"), t("          stack, on a globe", "muted")),
          P(t("-rw-r--r--  "), c("contact.vcf", "contact"), t("        say hi", "muted")),
          P(t("-rwxr-xr-x  "), c("portfolio.sh*", "./portfolio.sh", "cmd-yellow"), t("      run everything", "muted")),
        ],
      };

    case "help":
      return {
        id,
        view: view("start"),
        lines: [
          L("COMMANDS", "header"),
          ...[
            ["tldr", "the 60-second summary"],
            ["curl parthivvarati.me/whoami", "profile as JSON"],
            ["git log", "experience, one commit per role"],
            ["ls projects/", "projects · then open <name>"],
            ["htop", "the production system he runs"],
            ["arch [vriksha-voice|signal-box|myrush]", "architecture diagrams"],
            ["skills --3d", "stack on a 3D globe"],
            ["contact", "email · github · linkedin"],
            ["resume", "open résumé"],
            ["explore / ./portfolio.sh", "guided tour / run everything"],
          ].flatMap(([cmd, note]) => [
            P(t("  "), c(cmd, cmd.split(" [")[0].split(" /")[0])),
            L(`      ${note}`, "muted"),
          ]),
          L("  clear · tab completes · ↑↓ history", "muted"),
        ],
      };

    case "tldr": {
      const tp = TLDR.projects.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean);
      return {
        id,
        view: view("tldr"),
        lines: [
          L("TL;DR — 60 seconds", "header"),
          L(TLDR.oneLiner, "title"),
          blank(),
          ...TLDR.wins.map((w) => P(t("  ✔ ", "success"), t(w, "text"))),
          blank(),
          P(t("projects  ", "label-inline"), ...tp.flatMap((p, i) => [c(p.slug, `open ${p.slug}`), t(i < tp.length - 1 ? " · " : "", "muted")])),
          P(t("stack     ", "label-inline"), t(TLDR.stack.join(" · "), "yellow")),
          P(t("before    ", "label-inline"), t(TLDR.previously, "muted")),
          P(t("reach     ", "label-inline"), a(links.email, links.emailHref), t(" · ", "muted"), a("résumé ↗", links.resume)),
        ],
      };
    }

    case "about":
      return {
        id,
        view: view("about"),
        lines: [
          P(t("HTTP/2 ", "muted"), t("200", "success"), t("  content-type: application/json", "muted")),
          ...jsonLines({
            name: profile.fullName,
            role: profile.title,
            company: profile.company,
            location: profile.location,
            focus: profile.focus,
            education: `${education[0].degree.replace("Bachelor of Technology in", "B.Tech")} · ${education[0].institute} · ${education[0].period.replace(" — ", "–")}`,
            github: links.github,
            linkedin: links.linkedin,
          }),
        ],
      };

    case "experience": {
      const out = [];
      experience.forEach((role, i) => {
        const refs = i === 0 ? [t(" (", "rule"), t("HEAD -> main", "cyan"), t(", ", "rule"), t("current", "yellow"), t(")", "rule")] : [];
        out.push(P(t("* ", "accent"), t(shortHash(role.id), "yellow"), ...refs, t(`  ${role.company} — ${role.role}`, "title")));
        out.push(L(`|  ${role.period} · ${role.location}`, "muted"));
        out.push(L(`|  ${role.summary}`, "text"));
        role.points.slice(0, 2).forEach((pt) => out.push(P(t("|  ", "rule"), t("+ ", "success"), t(pt, "bullet"))));
        if (role.points.length > 2) out.push(L(`|  … ${role.points.length - 2} more in preview`, "muted"));
        out.push(L("|", "rule"));
      });
      education.forEach((ed) => {
        out.push(P(t("* ", "accent"), t(shortHash(ed.institute), "yellow"), t(" (", "rule"), t("tag: graduated", "yellow"), t(")", "rule"), t(`  ${ed.institute} — B.Tech CSE · ${ed.score}`, "title")));
        out.push(L(`   ${ed.period}`, "muted"));
      });
      return { id, view: view("experience"), lines: out };
    }

    case "projects": {
      const rows = projects.map((p) =>
        P(
          t(p.featured ? "drwxr-xr-x  " : "-rw-r--r--  ", "muted"),
          c(p.slug + (p.featured ? "/" : ""), `open ${p.slug}`),
          t(" ".repeat(Math.max(1, 22 - p.slug.length - (p.featured ? 1 : 0)))),
          t(`${p.status === "Production" ? "●" : "○"} ${p.status}`, p.status === "Production" ? "success" : "muted"),
        ),
      );
      return {
        id,
        view: view("projects"),
        lines: [L(`total ${projects.length}`, "muted"), ...rows, L("tip: open <name> — or click one", "muted")],
      };
    }

    case "project": {
      const p = projects.find((x) => x.slug === arg || x.id === arg || x.slug.startsWith(arg));
      if (!p) {
        return {
          id: "unknown",
          lines: [
            L(`open: no such project: ${arg}`, "err"),
            P(t("try: ", "muted"), ...featuredProjects().flatMap((x, i) => [c(x.slug, `open ${x.slug}`), t(i < 4 ? " · " : "", "muted")])),
          ],
        };
      }
      const out = [
        L(`==> ${p.slug}`, "brew"),
        L(`${p.title}`, "title"),
        L(`${p.status} · ${p.period} · ${p.company} · ${p.role}`, "cyan"),
        L(p.summary, "text"),
        ...p.highlights.map((h) => P(t("  ▸ ", "accent"), t(h, "bullet"))),
        P(t("stack  ", "label-inline"), t(p.stack.join(" · "), "yellow")),
      ];
      if (p.architectureId) out.push(P(t("arch   ", "label-inline"), c(`arch ${p.architectureId}`, `arch ${p.architectureId}`)));
      if (p.href) out.push(P(t("link   ", "label-inline"), a(p.href, p.href)));
      return { id: "projects", view: view("project", p.slug), lines: out };
    }

    case "htop": {
      const m = metrics;
      return {
        id,
        view: view("htop"),
        lines: [
          P(t("vriksha-voice", "title"), t(" · ", "muted"), t("production", "success"), t(" · multi-tenant · AWS", "muted")),
          P(
            t("calls ", "muted"), t(m.calls.value, "accent"),
            t("   campaigns ", "muted"), t(m.campaigns.value, "accent"),
            t("   customers ", "muted"), t(m.clients.value, "accent"),
            t("   p50 ", "muted"), t(m.latency.value, "accent"),
            t("   concurrency ", "muted"), t(m.concurrent.value, "accent"),
          ),
          blank(),
          L("  PID  SERVICE            STATE", "th"),
          ...PROCESSES.map(([name], i) =>
            P(t(`  ${101 + i}  `, "muted"), t(pad(name, 19), "cyan"), t("running", "success")),
          ),
        ],
      };
    }

    case "architecture": {
      const archId = architectures[arg] ? arg : Object.keys(architectures).find((k) => k.startsWith(arg));
      if (!archId) {
        return {
          id: "unknown",
          lines: [
            L(`arch: unknown system: ${arg}`, "err"),
            P(t("try: ", "muted"), ...Object.keys(architectures).flatMap((k, i, all) => [c(k, `arch ${k}`), t(i < all.length - 1 ? " · " : "", "muted")])),
          ],
        };
      }
      const arch = architectures[archId];
      return {
        id: "architecture",
        view: view("architecture", archId),
        lines: [
          L(`# ${arch.title}`, "header"),
          L(arch.intro, "muted"),
          blank(),
          ...archAscii(archId),
          blank(),
          P(t("other: ", "muted"), ...Object.keys(architectures).filter((k) => k !== archId).flatMap((k, i) => [c(`arch ${k}`, `arch ${k}`), t(i === 0 ? " · " : "", "muted")])),
        ],
      };
    }

    case "skills":
      return {
        id,
        view: view("skills"),
        lines: [
          L("==> brew list --formula", "brew"),
          ...skillGroups.flatMap((g) => [L(g.label.toUpperCase(), "label"), L(`  ${g.items.join(" · ")}`, "text")]),
        ],
      };

    case "contact":
      return {
        id,
        view: view("contact"),
        lines: [
          L("BEGIN:VCARD", "muted"),
          P(t("  FN        ", "muted"), t(profile.fullName, "title")),
          P(t("  TITLE     ", "muted"), t(`${profile.title} · ${profile.company}`)),
          P(t("  EMAIL     ", "muted"), a(links.email, links.emailHref)),
          P(t("  GITHUB    ", "muted"), a(links.github.replace("https://", ""), links.github)),
          P(t("  LINKEDIN  ", "muted"), a(links.linkedin.replace("https://www.", ""), links.linkedin)),
          P(t("  LEETCODE  ", "muted"), a(links.leetcode.replace("https://", ""), links.leetcode)),
          P(t("  WEB       ", "muted"), a(links.website.replace("https://", ""), links.website)),
          P(t("  RESUME    ", "muted"), a("open résumé ↗", links.resume)),
          L("END:VCARD", "muted"),
        ],
      };

    case "hire":
      return {
        id,
        mood: "happy",
        lines: [
          L("[sudo] password for recruiter: ••••••••", "muted"),
          L("✔ permission granted.", "success"),
          P(t("Next step: send the offer to ", "text"), a(links.email, links.emailHref)),
        ],
      };
    case "sudo":
      return { id, lines: [L("parthiv is not in the sudoers file. This incident will be reported.", "err"), P(t("(psst — try ", "muted"), c("sudo hire parthiv", "sudo hire parthiv"), t(")", "muted"))] };
    case "vim":
      return { id, lines: [L("~", "rule"), L("~", "rule"), L("~   You are now trapped in vim.", "text"), L("~   Like everyone before you.", "muted"), P(t("~   type ", "muted"), c(":q", ":q"), t(" to escape", "muted"))] };
    case "quitvim":
      return { id, mood: "happy", lines: [L("✔ escaped vim. achievement unlocked: senior engineer", "success")] };
    case "rm":
      return { id, lines: [L("rm: permission denied — this portfolio is in production.", "err"), L("(please don't.)", "muted")] };
    case "exit":
      return { id, lines: [L("logout", "muted"), L("[Process completed]", "muted"), L("…just kidding. you can't leave that easily.", "text")] };
    case "pwd":
      return { id, lines: [L("/Users/parthiv/portfolio")] };
    case "cd":
      return { id, lines: [L("cd: you're already exactly where you need to be.", "muted")] };
    case "echo":
      return { id, lines: [L(arg || "")] };
    case "date":
      return {
        id,
        lines: [L(new Date().toLocaleString("en-IN", { timeZone: profile.timezone, dateStyle: "full", timeStyle: "short" }) + " IST")],
      };
    case "ping":
      return { id, lines: [L("PING parthiv: 56 data bytes", "muted"), L(`64 bytes from parthiv: response time=${metrics.latency.value} (median, voice)`), P(t("--- reply faster by email: ", "muted"), a(links.email, links.emailHref))] };
    case "coffee":
      return { id, lines: [L("Error: 418 I'm a teapot", "err")] };
    case "git":
      return { id, lines: [L("git: only `git log` is public on this repo.", "muted")] };
    case "curl":
      return { id, lines: [L("curl: (6) could not resolve host — try curl parthivvarati.me/whoami", "err")] };

    default:
      return null;
  }
}

/* ─── Char's guided state ─── */
const STEP_COPY = {
  about: "First: who he is. I'll curl it — you get the raw JSON and a rendered card.",
  experience: "Now his git log. Every role is a commit.",
  projects: "Projects next. Click any project card to open it.",
  htop: "Want to see what he runs in production? htop.",
  architecture: "Here's how it's wired. Architecture diagrams.",
  skills: "Stack time — I'll spin up the globe.",
  contact: "Last stop: how to reach him.",
};

export function liveGuide(typed, { stage = "greet", seen = [], busy = false, status = "" } = {}) {
  if (busy) {
    return { mood: "think", thought: status || "on it…", hints: [] };
  }

  const q = typed.trim().toLowerCase();
  if (q) {
    const matches = COMPLETIONS.filter((cmd) => cmd.startsWith(q) && cmd !== q).slice(0, 3);
    if (matches.length) {
      return {
        mood: "think",
        thought: "Tab to complete — or click.",
        hints: matches.map((cmd) => ({ cmd, label: cmd })),
      };
    }
    return { mood: "idle", thought: "Enter to run it. Unknown? type help.", hints: [] };
  }

  if (stage === "greet") {
    return {
      mood: "talk",
      thought: `Hey, I'm Char, ${profile.shortName}'s pet. Want the tour? Tap ls — I'll type it for you.`,
      hints: [{ cmd: "ls", label: "ls" }],
    };
  }

  if (stage === "choose") {
    return {
      mood: "talk",
      thought: "Explore and I'll hand you one command at a time. Or automate and I'll run everything.",
      hints: [
        { cmd: "explore", label: "explore" },
        { cmd: "./portfolio.sh", label: "automate" },
      ],
    };
  }

  const next = EXPLORE_FLOW.find((s) => !seen.includes(s.id));

  if (stage === "explore" && next) {
    return {
      mood: "talk",
      thought: STEP_COPY[next.id],
      hints: [
        { cmd: next.cmd, label: next.label },
        { cmd: "./portfolio.sh", label: "automate" },
      ],
    };
  }

  return {
    mood: "happy",
    thought: "That's the whole tour. One more thing worth trying…",
    hints: [
      { cmd: "sudo hire parthiv", label: "sudo hire parthiv" },
      { cmd: "ls", label: "ls" },
    ],
  };
}
