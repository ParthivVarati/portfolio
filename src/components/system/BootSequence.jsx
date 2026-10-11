import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { bootModules, profile } from "../../data/portfolio";

const LOGS = [
  "INITIALIZING...",
  "LOADING ENGINEERING PROFILE...",
  "LOADING SYSTEMS...",
  "LOADING PROJECTS...",
];

export default function BootSequence({ onDone }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? 99 : 0);
  const [fills, setFills] = useState(() => bootModules.map(() => (reduced ? 100 : 0)));
  const ready = step >= LOGS.length + 2 && fills.every((value) => value >= 100);

  const visibleLogs = useMemo(() => LOGS.slice(0, Math.min(step, LOGS.length)), [step]);

  useEffect(() => {
    if (reduced) return undefined;
    if (step < LOGS.length + 2) {
      const timer = window.setTimeout(() => setStep((value) => value + 1), step === 0 ? 180 : 280);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [reduced, step]);

  useEffect(() => {
    if (reduced || step < LOGS.length) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1400);
      setFills(bootModules.map((_, index) => Math.min(100, Math.max(0, (progress - index * 0.08) / 0.55) * 100)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduced, step]);

  useEffect(() => {
    if (!ready) return undefined;
    const finish = (event) => {
      if (event.type === "click" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onDone();
      }
    };
    window.addEventListener("keydown", finish);
    window.addEventListener("click", finish);
    const auto = window.setTimeout(onDone, 1600);
    return () => {
      window.removeEventListener("keydown", finish);
      window.removeEventListener("click", finish);
      window.clearTimeout(auto);
    };
  }, [onDone, ready]);

  return (
    <div className="sys-boot" role="dialog" aria-label="System boot" aria-live="polite">
      <div className="sys-boot-panel">
        <p className="sys-boot-title">{profile.shortName.toUpperCase()} SYSTEM</p>
        <div className="sys-boot-rule" />
        {visibleLogs.map((line) => (
          <p className="sys-boot-line" key={line}>{line}</p>
        ))}
        {step >= LOGS.length && (
          <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
            {bootModules.map((item, index) => (
              <div className="sys-boot-bar" key={item.id}>
                <span>{item.label}</span>
                <div className="sys-boot-track" aria-hidden="true">
                  <div className="sys-boot-fill" style={{ transform: `scaleX(${fills[index] / 100})` }} />
                </div>
                <span>{fills[index] >= 100 ? "✓" : ""}</span>
              </div>
            ))}
          </div>
        )}
        {ready && (
          <>
            <p className="sys-boot-line is-ready" style={{ marginTop: 22 }}>PRODUCTION SYSTEMS: ONLINE</p>
            <p className="sys-boot-line is-ready">PORTFOLIO: READY</p>
            <p className="sys-boot-hint">PRESS ENTER TO CONTINUE<b /></p>
          </>
        )}
      </div>
    </div>
  );
}
