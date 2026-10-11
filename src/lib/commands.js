import { aliases, commands, projects } from "../data/portfolio";

export const COMMAND_IDS = commands.map((item) => item.id);

export const VIEW_COMMANDS = new Set([
  "home",
  "about",
  "experience",
  "projects",
  "systems",
  "architecture",
  "pocs",
  "product",
  "skills",
  "contact",
  "help",
]);

const PROJECT_ALIASES = {
  vriksha: "vriksha-voice",
  voice: "vriksha-voice",
  "vriksha-voice": "vriksha-voice",
  signal: "signal-box",
  "signal-box": "signal-box",
  signalbox: "signal-box",
  myrush: "myrush",
  rush: "myrush",
  companion: "emotional-companion",
  "emotional-companion": "emotional-companion",
  feelings: "emotional-companion",
  forecast: "electricity-forecast",
  electricity: "electricity-forecast",
  "electricity-forecast": "electricity-forecast",
  snaptrip: "snaptrip",
  snap: "snaptrip",
  freelancer: "freelancer",
};

export function tokenize(input) {
  return input.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
}

export function resolveCommand(raw) {
  const key = raw.toLowerCase();
  if (COMMAND_IDS.includes(key)) return key;
  return aliases[key] || null;
}

export function resolveProject(raw) {
  if (!raw) return null;
  const key = raw.toLowerCase();
  const slug = PROJECT_ALIASES[key] || key;
  return projects.find((project) => project.slug === slug || project.id === slug) || null;
}

export function parseCommand(input) {
  const tokens = tokenize(input);
  if (!tokens.length) return { type: "empty" };
  if (tokens[0].toLowerCase() === "boot") return { type: "boot" };

  const command = resolveCommand(tokens[0]);
  const args = tokens.slice(1);

  if (!command) {
    const project = resolveProject(tokens[0]);
    if (project) {
      return { type: "view", command: "projects", args: [project.slug], project };
    }
    return { type: "unknown", input: tokens[0], args };
  }

  if (command === "clear") return { type: "clear" };
  if (command === "resume") return { type: "resume" };
  if (command === "boot") return { type: "boot" };

  if (command === "projects" || command === "architecture") {
    const project = resolveProject(args[0]);
    return { type: "view", command, args, project };
  }

  return { type: "view", command, args };
}

export function suggestCommands(partial) {
  const query = partial.trim().toLowerCase();
  if (!query) return COMMAND_IDS;
  const names = [...COMMAND_IDS, ...Object.keys(aliases)];
  return [...new Set(names.filter((name) => name.startsWith(query)))];
}

export function completeCommand(partial) {
  const matches = suggestCommands(partial);
  if (matches.length === 1) return matches[0];
  const shared = sharedPrefix(matches);
  return shared.length > partial.length ? shared : null;
}

function sharedPrefix(values) {
  if (!values.length) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    let i = 0;
    while (i < prefix.length && i < value.length && prefix[i] === value[i]) i += 1;
    prefix = prefix.slice(0, i);
  }
  return prefix;
}

export function helpLines() {
  return [
    "available commands",
    ...commands.map((item) => `  ${item.usage.padEnd(24)} ${item.hint}`),
    "",
    "tab completes · ↑↓ history · click a command to run it",
  ];
}
