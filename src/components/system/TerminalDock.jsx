import { useEffect, useRef } from "react";
import { commands, profile } from "../../data/portfolio";

export default function TerminalDock({
  logs,
  value,
  onChange,
  onSubmit,
  onHistory,
  onComplete,
  activeCommand,
  onRun,
}) {
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)").matches;
    if (desktop) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!logRef.current) return;
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const submit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  const keyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      onHistory(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      onHistory(1);
    } else if (event.key === "Tab") {
      event.preventDefault();
      onComplete();
    }
  };

  return (
    <section className="sys-terminal" aria-label="Command terminal">
      <div className="sys-terminal-bar">
        <span>TERMINAL</span>
        <span>{profile.handle}@{profile.host} · ready</span>
      </div>
      <div className="sys-log" ref={logRef} aria-live="polite">
        {logs.map((line, index) => (
          <p key={`${line.text}-${index}`} className={line.tone}>{line.text}</p>
        ))}
      </div>
      <div className="sys-chips" aria-label="Commands">
        {commands.filter((item) => !["help", "clear", "home"].includes(item.id)).map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sys-chip ${activeCommand === item.id ? "is-active" : ""}`}
            onClick={() => onRun(item.id)}
          >
            <span>&gt;</span>{item.id}
          </button>
        ))}
      </div>
      <form className="sys-prompt-row" onSubmit={submit}>
        <label className="sys-prompt" htmlFor="sys-command">
          {profile.handle}@{profile.host} ~ %
        </label>
        <input
          id="sys-command"
          ref={inputRef}
          className="sys-input"
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal command"
          placeholder="type a command — or click one"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={keyDown}
        />
      </form>
    </section>
  );
}
