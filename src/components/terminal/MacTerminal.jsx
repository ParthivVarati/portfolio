import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { links, profile } from "../../data/portfolio";
import {
  EXPLORE_FLOW,
  PANE_TABS,
  liveGuide,
  runCommand,
} from "../../lib/terminalCommands";
import GuideAvatar from "./GuideAvatar";
import PreviewPane, { PreviewView } from "./PreviewPane";
import WelcomeCard from "./WelcomeCard";

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = window.setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      window.clearTimeout(id);
      reject(new DOMException("aborted", "AbortError"));
    });
  });
}

async function streamLines(lines, append, signal) {
  for (const line of lines) {
    if (signal?.aborted) throw new DOMException("aborted", "AbortError");
    append([line]);
    if (line.type) continue;
    if (line.tone === "header" || line.tone === "brew") await sleep(90, signal);
    else if (line.tone === "blank") await sleep(30, signal);
    else if (line.tone === "success") await sleep(120, signal);
    else await sleep(20, signal);
  }
}

const initialLines = () => [
  { text: `Last login: ${new Date().toDateString()} on ttys001`, tone: "muted" },
  { type: "welcome" },
];

/** Split layout needs room; below this the preview renders inline in the terminal */
const WIDE_QUERY = "(min-width: 960px)";

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia(WIDE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return wide;
}

/** Group lines into Warp-style blocks: each prompt line opens a block */
function toBlocks(lines) {
  const blocks = [];
  lines.forEach((line, index) => {
    const opens = line.tone === "prompt" && !line.sub;
    if (opens || !blocks.length) {
      blocks.push({ start: index, prompt: opens ? line : null, items: [] });
      if (opens) return;
    }
    blocks[blocks.length - 1].items.push({ line, index });
  });
  return blocks;
}

export default function MacTerminal() {
  const wide = useWide();
  const [lines, setLines] = useState(initialLines);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [stage, setStage] = useState("greet");
  const [seen, setSeen] = useState([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [moodOverride, setMoodOverride] = useState(null);
  const [charPose, setCharPose] = useState("wait");
  const [breathing, setBreathing] = useState(false);
  const [breathTick, setBreathTick] = useState(0);
  const [anchor, setAnchor] = useState(null);
  const [pane, setPane] = useState({ view: "start", arg: null });
  const [collapsed, setCollapsed] = useState(() => new Set());

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const stageRef = useRef(null);
  const promptRowRef = useRef(null);
  const guideRef = useRef(null);
  const abortRef = useRef(null);
  const measureCanvasRef = useRef(null);

  const measurePromptAnchor = useCallback((typed = "") => {
    const stageEl = stageRef.current;
    const input = inputRef.current;
    const row = promptRowRef.current;
    if (!stageEl || !input || !row) return null;

    const sr = stageEl.getBoundingClientRect();
    const ir = input.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    const styles = window.getComputedStyle(input);
    const font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    if (!measureCanvasRef.current) {
      measureCanvasRef.current = document.createElement("canvas");
    }
    const ctx = measureCanvasRef.current.getContext("2d");
    ctx.font = font;
    const textW = ctx.measureText(typed).width;

    // Sit on the caret: Char just right of typed text, vertically centered on the prompt row
    const caretX = ir.left - sr.left + textW;
    const left = Math.min(Math.max(8, caretX - 8), sr.width - 180);
    const top = Math.max(
      8,
      Math.min(sr.height - 180, rr.top - sr.top + rr.height / 2 - 78),
    );

    return { left, top };
  }, []);

  const measureWaitAnchor = useCallback(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return null;
    const sr = stageEl.getBoundingClientRect();

    // Char lives in a guide strip (pane bottom when wide, screen bottom when narrow)
    const guide = guideRef.current;
    if (guide) {
      const gr = guide.getBoundingClientRect();
      return {
        left: gr.left - sr.left + 10,
        top: gr.top - sr.top + Math.max(0, (gr.height - 156) / 2),
        width: gr.width - 24,
      };
    }

    // Fallback: perch bottom-right over the terminal
    const cardH = 300;
    return {
      left: Math.max(8, sr.width - 200),
      top: Math.max(20, Math.min(sr.height - cardH - 16, sr.height * 0.42)),
    };
  }, [wide]);

  // Keep wait perch measured so left/top transitions stay smooth
  useEffect(() => {
    if (charPose !== "wait") return undefined;
    const place = () => {
      const a = measureWaitAnchor();
      if (a) setAnchor(a);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [charPose, measureWaitAnchor, lines.length]);

  const guide = useMemo(() => {
    const g = liveGuide(value, { stage, seen, busy, status });
    return moodOverride && !busy ? { ...g, mood: moodOverride } : g;
  }, [value, stage, seen, busy, status, moodOverride]);

  useEffect(() => {
    // Leave the welcome card in view on first load; follow output after that
    if (!bodyRef.current || lines.length <= 2) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, value]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(t);
  }, []);

  const append = useCallback((batch) => {
    setLines((cur) => [...cur, ...batch]);
  }, []);

  const typeIntoPrompt = useCallback(async (command, signal) => {
    setBusy(true);
    setStatus("coming to the prompt…");
    setBreathing(false);

    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
    await sleep(40, signal);

    const start = measurePromptAnchor("");
    if (start) setAnchor(start);
    setCharPose("prompt");
    await sleep(700, signal);

    // Remeasure after the slide lands
    const landed = measurePromptAnchor("");
    if (landed) setAnchor(landed);

    setStatus("typing…");
    setBreathing(true);
    setValue("");
    for (let i = 1; i <= command.length; i += 1) {
      if (signal?.aborted) throw new DOMException("aborted", "AbortError");
      const typed = command.slice(0, i);
      setValue(typed);
      setBreathTick((n) => n + 1);
      const next = measurePromptAnchor(typed);
      if (next) setAnchor(next);
      await sleep(command.length > 16 ? 30 + Math.random() * 22 : 48 + Math.random() * 36, signal);
    }

    setBreathing(false);
    setStatus("enter…");
    await sleep(240, signal);
    const wait = measureWaitAnchor();
    if (wait) setAnchor(wait);
    setCharPose("wait");
    setStatus("watching output…");
    await sleep(300, signal);
  }, [measurePromptAnchor, measureWaitAnchor]);

  /** Print one command's result; returns the resolved id */
  const printResult = useCallback(
    async (result) => {
      await streamLines(result.lines, append);
      if (result.view) {
        setPane({ view: result.view.view, arg: result.view.arg ?? null });
        append([result.view]);
      }
      setMoodOverride(result.mood || null);
      return result.id;
    },
    [append],
  );

  const markSeen = useCallback((id) => {
    if (!EXPLORE_FLOW.some((s) => s.id === id)) return;
    setSeen((cur) => {
      if (cur.includes(id)) return cur;
      const next = [...cur, id];
      setStage((s) => {
        if (next.length >= EXPLORE_FLOW.length) return "done";
        return s === "greet" || s === "choose" ? "explore" : s;
      });
      return next;
    });
  }, []);

  const execute = useCallback(
    async (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;

      setBusy(true);
      append([{ tone: "prompt", text: cmd }]);
      setHistory((h) => [...h, cmd]);
      setHistoryIndex(-1);
      setValue("");

      try {
        const key = cmd.toLowerCase();

        if (key === "clear" || key === "cls") {
          setLines(initialLines());
          setCollapsed(new Set());
          setStage("greet");
          setSeen([]);
          setPane({ view: "start", arg: null });
          return;
        }

        if (key === "resume" || key === "cv" || key === "open resume") {
          window.open(links.resume, "_blank", "noopener,noreferrer");
          append([{ parts: [{ text: "==> Opening résumé… ", tone: "brew" }, { text: "(blocked? click here ↗)", href: links.resume, tone: "link" }] }]);
          return;
        }

        if (["explore", "manual", "tour"].includes(key)) {
          setStage(seen.length >= EXPLORE_FLOW.length ? "done" : "explore");
          append([
            { text: "==> Mode: explore", tone: "brew" },
            { text: "I'll hand you one command at a time. Click it on Char — no typing needed.", tone: "muted" },
          ]);
          return;
        }

        if (["portfolio.sh", "./portfolio.sh", "sh", "auto", "automate"].includes(key)) {
          setStage("auto");
          append([
            { text: "==> ./portfolio.sh", tone: "brew" },
            { text: `Running ${EXPLORE_FLOW.length} steps…`, tone: "muted" },
          ]);
          for (const step of EXPLORE_FLOW) {
            await sleep(360);
            setStatus(`running ${step.label}…`);
            append([{ tone: "prompt", text: step.cmd, sub: true }]);
            const id = await printResult(runCommand(step.cmd));
            markSeen(id);
            await sleep(step.id === "skills" ? 900 : 520);
          }
          append([{ text: `✔ ${EXPLORE_FLOW.length} steps complete`, tone: "success" }]);
          setStage("done");
          setSeen(EXPLORE_FLOW.map((s) => s.id));
          return;
        }

        const result = runCommand(cmd);
        if (result) {
          setStatus(`running ${cmd}…`);
          const id = await printResult(result);
          markSeen(id);
          if (key === "ls" && stage === "greet") setStage("choose");
          return;
        }

        append([
          { text: `zsh: command not found: ${cmd}`, tone: "err" },
          { parts: [{ text: "try ", tone: "muted" }, { text: "help", cmd: "help", tone: "cmd" }, { text: " — or click a command on Char", tone: "muted" }] },
        ]);
      } finally {
        setBusy(false);
        setStatus("");
      }
    },
    [append, markSeen, printResult, seen.length, stage],
  );

  const runSuggested = useCallback(
    async (command) => {
      if (busy) return;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await typeIntoPrompt(command, controller.signal);
        await execute(command);
        setCharPose("wait");
        setBreathing(false);
      } catch (err) {
        if (err?.name !== "AbortError") throw err;
        setBreathing(false);
        setCharPose("wait");
      }
    },
    [busy, execute, typeIntoPrompt],
  );

  /** Pane tabs, cards and in-output links: run immediately, no typing */
  const runDirect = useCallback(
    (command) => {
      if (busy) return;
      execute(command);
    },
    [busy, execute],
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy || !value.trim()) return;
    await execute(value);
  };

  const onKeyDown = (event) => {
    if (busy) return;
    if (event.key === "Tab" && guide.hints?.[0]) {
      event.preventDefault();
      setValue(guide.hints[0].cmd);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    }
  };

  const toggleBlock = (start) => {
    setCollapsed((cur) => {
      const next = new Set(cur);
      if (next.has(start)) next.delete(start);
      else next.add(start);
      return next;
    });
  };

  const blocks = useMemo(() => toBlocks(lines), [lines]);
  const lastBlockStart = blocks[blocks.length - 1]?.start;
  const lastViewIndex = useMemo(() => {
    for (let i = lines.length - 1; i >= 0; i -= 1) if (lines[i].type === "view") return i;
    return -1;
  }, [lines]);

  const renderPart = (part, i) => {
    const cls = part.tone ? `t-${part.tone}` : undefined;
    if (part.href) {
      return (
        <a key={i} className={cls} href={part.href} target="_blank" rel="noopener noreferrer">
          {part.text}
        </a>
      );
    }
    if (part.cmd) {
      return (
        <button key={i} type="button" className={cls} disabled={busy} onClick={() => runDirect(part.cmd)}>
          {part.text}
        </button>
      );
    }
    return (
      <span key={i} className={cls}>
        {part.text}
      </span>
    );
  };

  const renderLine = ({ line, index }) => {
    if (line.type === "welcome") return <WelcomeCard key={index} onRun={runDirect} />;
    if (line.type === "view") {
      if (wide) {
        return (
          <p key={index} className="t-viewnote">
            ↳ rendered in preview →
          </p>
        );
      }
      // Phones: inline preview. Only the newest skills view mounts a WebGL globe.
      if (line.view === "skills" && index !== lastViewIndex) return null;
      return (
        <div key={index} className="inline-view">
          <PreviewView view={line.view} arg={line.arg} onRun={runDirect} onType={runSuggested} />
        </div>
      );
    }
    if (line.tone === "prompt" && line.sub) {
      return (
        <p key={index} className="t-subprompt">
          <span className="t-accent">›</span> {line.text}
        </p>
      );
    }
    if (line.parts) {
      return <p key={index}>{line.parts.map(renderPart)}</p>;
    }
    return (
      <p key={index} className={`t-${line.tone}`}>
        {line.text || " "}
      </p>
    );
  };

  return (
    <div className="desk">
      <section className="mac-window theme-brew" aria-label="Terminal">
        <header className="mac-titlebar">
          <div className="mac-traffic" aria-hidden="true">
            <i className="close" />
            <i className="min" />
            <i className="max" />
          </div>
          <p className="mac-title">
            {profile.handle} — -zsh <span className="mac-size">— {profile.name}, {profile.role}</span>
          </p>
          <a className="mac-resume" href={links.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </header>

        <div className={`mac-stage ${wide ? "is-split" : "is-stacked"}`} ref={stageRef}>
          <div
            className="mac-body"
            ref={bodyRef}
            onClick={(e) => {
              if (busy || e.target.closest("a, button")) return;
              if (window.getSelection()?.toString()) return;
              inputRef.current?.focus();
            }}
          >
            {blocks.map((block) =>
              block.prompt ? (
                <section
                  key={block.start}
                  className={[
                    "blk",
                    block.start === lastBlockStart ? "is-active" : "",
                    collapsed.has(block.start) ? "is-collapsed" : "",
                  ].filter(Boolean).join(" ")}
                >
                  <button
                    type="button"
                    className="blk-head"
                    aria-expanded={!collapsed.has(block.start)}
                    onClick={() => toggleBlock(block.start)}
                  >
                    <span className="blk-caret" aria-hidden="true">▾</span>
                    <span className="t-user">{profile.handle}</span>
                    <span className="t-at">@</span>
                    <span className="t-host">mac</span>
                    <span className="t-path"> ~ % </span>
                    <span className="blk-cmd">{block.prompt.text}</span>
                  </button>
                  {!collapsed.has(block.start) && (
                    <div className="blk-body">{block.items.map(renderLine)}</div>
                  )}
                </section>
              ) : (
                <div key={block.start} className="blk-intro">
                  {block.items.map(renderLine)}
                </div>
              ),
            )}

            <div className="mac-composer">
              <form className="mac-prompt-row" ref={promptRowRef} onSubmit={onSubmit}>
                <span className="mac-prompt">
                  <span className="t-user">{profile.handle}</span>
                  <span className="t-at">@</span>
                  <span className="t-host">mac</span>
                  <span className="t-path"> ~ %</span>
                </span>
                <input
                  ref={inputRef}
                  className="mac-input"
                  value={value}
                  disabled={busy}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>

          {!wide && <div className="pane-guide is-bottom" ref={guideRef} />}

          {wide && (
            <PreviewPane
              view={pane.view}
              arg={pane.arg}
              tabs={PANE_TABS}
              busy={busy}
              onRun={runDirect}
              onType={runSuggested}
              guideRef={guideRef}
            />
          )}

          <GuideAvatar
            mood={guide.mood}
            thought={guide.thought}
            hints={guide.hints}
            busy={busy}
            pose={charPose}
            breathing={breathing}
            breathTick={breathTick}
            anchor={anchor}
            layout="row"
            onSuggest={runSuggested}
          />
        </div>
      </section>
    </div>
  );
}
