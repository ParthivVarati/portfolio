import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { links, profile } from "../../data/portfolio";
import {
  EXPLORE_FLOW,
  liveGuide,
  autoTourSections,
  renderSection,
} from "../../lib/terminalCommands";
import GuideAvatar from "./GuideAvatar";

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
    if (line.tone === "header" || line.tone === "brew") await sleep(110, signal);
    else if (line.tone === "bar") await sleep(160, signal);
    else if (line.tone === "blank") await sleep(36, signal);
    else if (line.tone === "success") await sleep(140, signal);
    else await sleep(22, signal);
  }
}

export default function MacTerminal() {
  const [lines, setLines] = useState([
    { text: `Last login: ${new Date().toDateString()} on ttys001`, tone: "muted" },
    { text: "", tone: "blank" },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [stage, setStage] = useState("greet");
  const [exploreStep, setExploreStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [charPose, setCharPose] = useState("wait");
  const [breathing, setBreathing] = useState(false);
  const [breathTick, setBreathTick] = useState(0);
  const [anchor, setAnchor] = useState(null);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const stageRef = useRef(null);
  const promptRowRef = useRef(null);
  const abortRef = useRef(null);
  const measureCanvasRef = useRef(null);

  const measurePromptAnchor = useCallback((typed = "") => {
    const stage = stageRef.current;
    const input = inputRef.current;
    const row = promptRowRef.current;
    if (!stage || !input || !row) return null;

    const sr = stage.getBoundingClientRect();
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
    const stage = stageRef.current;
    if (!stage) return null;
    const sr = stage.getBoundingClientRect();
    // Keep whole card (thought + chips + char) above the fold
    const cardH = 300;
    return {
      left: Math.max(8, sr.width - 200),
      top: Math.max(20, Math.min(sr.height - cardH - 16, sr.height * 0.42)),
    };
  }, []);

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

  const guide = useMemo(
    () => liveGuide(value, { stage, exploreStep, busy, status }),
    [value, stage, exploreStep, busy, status],
  );

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, value, guide.thought]);

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
      await sleep(48 + Math.random() * 36, signal);
    }

    setBreathing(false);
    setStatus("enter…");
    await sleep(280, signal);
    const wait = measureWaitAnchor();
    if (wait) setAnchor(wait);
    setCharPose("wait");
    setStatus("watching output…");
    await sleep(380, signal);
  }, [measurePromptAnchor, measureWaitAnchor]);

  const execute = useCallback(
    async (raw, { fromAgent = false } = {}) => {
      const cmd = raw.trim();
      if (!cmd) return;

      const key = cmd.toLowerCase();
      const normalized =
        key === "portfolio.sh" ||
        key === "sh" ||
        key === "auto" ||
        key === "automate" ||
        key === "2"
          ? "./portfolio.sh"
          : key === "1" || key === "manual"
            ? "explore"
            : key === "whoami"
              ? "about"
              : key;

      append([{ text: `${profile.handle}@mac ~ % ${cmd}`, tone: "prompt" }]);
      setHistory((h) => [...h, cmd]);
      setHistoryIndex(-1);
      setValue("");

      if (normalized === "clear") {
        setLines([
          { text: `Last login: ${new Date().toDateString()} on ttys001`, tone: "muted" },
          { text: "", tone: "blank" },
        ]);
        setStage("greet");
        setExploreStep(0);
        setBusy(false);
        setStatus("");
        return;
      }

      if (normalized === "resume") {
        window.open(links.resume, "_blank", "noopener,noreferrer");
        append([
          { text: "==> Opening resume…", tone: "brew" },
          { text: "✔ done", tone: "success" },
        ]);
        setBusy(false);
        setStatus("");
        return;
      }

      if (normalized === "ls") {
        setBusy(true);
        setStatus("listing…");
        await streamLines(renderSection("ls"), append);
        setStage("choose");
        setBusy(false);
        setStatus("");
        return;
      }

      if (normalized === "explore") {
        setStage("explore");
        setExploreStep(0);
        append([
          { text: "", tone: "blank" },
          { text: "==> Mode: explore", tone: "brew" },
          {
            text: "I’ll feed you one package at a time. Click the command — no typing needed.",
            tone: "muted",
          },
          { text: "", tone: "blank" },
        ]);
        setBusy(false);
        setStatus("");
        return;
      }

      if (normalized === "./portfolio.sh") {
        setStage("auto");
        setBusy(true);
        setStatus("automating full install…");
        append([
          { text: "", tone: "blank" },
          { text: "==> ./portfolio.sh", tone: "brew" },
          { text: "==> Fetching formulae…", tone: "brew" },
          { text: "Installing portfolio packages…", tone: "muted" },
        ]);

        const sections = autoTourSections();
        for (let i = 0; i < sections.length; i += 1) {
          await sleep(420);
          setStatus(`installing ${sections[i]}…`);
          await streamLines(renderSection(sections[i]), append);
          await sleep(380);
        }

        append([
          { text: "==> Summary", tone: "brew" },
          { text: `✔ ${sections.length} packages installed`, tone: "success" },
          { text: "", tone: "blank" },
        ]);
        setStatus("all installed");
        setStage("done");
        setExploreStep(EXPLORE_FLOW.length);
        setBusy(false);
        await sleep(700);
        setStatus("");
        return;
      }

      const section = renderSection(normalized);
      if (section) {
        setBusy(true);
        setStatus(`installing ${normalized}…`);
        await streamLines(section, append);

        const idx = EXPLORE_FLOW.indexOf(normalized);
        if (idx >= 0) {
          const nextStep =
            fromAgent || stage === "explore" || stage === "choose" || stage === "ask"
              ? Math.max(exploreStep, idx + 1)
              : exploreStep;
          setExploreStep(nextStep);
          setStage(nextStep >= EXPLORE_FLOW.length ? "done" : "explore");
        }

        setBusy(false);
        setStatus("");
        return;
      }

      if (normalized === "help") {
        await streamLines(renderSection("help"), append);
        setBusy(false);
        setStatus("");
        return;
      }

      append([
        { text: `zsh: command not found: ${cmd}`, tone: "err" },
        { text: "click a command on Char — or try ls", tone: "muted" },
      ]);
      setBusy(false);
      setStatus("");
    },
    [append, exploreStep, stage],
  );

  const runSuggested = useCallback(
    async (command) => {
      if (busy) return;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await typeIntoPrompt(command, controller.signal);
        await execute(command, { fromAgent: true });
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (busy || !value.trim()) return;
    setBusy(true);
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
            {profile.handle} — -zsh <span className="mac-size">— fullscreen</span>
          </p>
          <span />
        </header>

        <div className="mac-stage" ref={stageRef}>
          <div
            className="mac-body"
            ref={bodyRef}
            onClick={() => !busy && inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <p key={`${i}-${line.tone}-${line.text.slice(0, 20)}`} className={`t-${line.tone}`}>
                {line.text || "\u00a0"}
              </p>
            ))}

            <div className="mac-composer">
              <div className="mac-prompt-stack">
                <form
                  className="mac-prompt-row"
                  ref={promptRowRef}
                  onSubmit={onSubmit}
                >
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
          </div>

          <GuideAvatar
            mood={guide.mood}
            thought={guide.thought}
            hints={guide.hints}
            busy={busy}
            pose={charPose}
            breathing={breathing}
            breathTick={breathTick}
            anchor={anchor}
            onSuggest={runSuggested}
          />
        </div>
      </section>
    </div>
  );
}
