import { useEffect, useRef, useState } from "react";

/** Technologies shown on the splash — edit freely. */
export const SPLASH_TECH = [
  "Python",
  "Java",
  "Spring Boot",
  "AWS",
  "Docker",
  "Terraform",
  "React",
  "Chatbots",
  "AI Automations",
  "Voice AI",
  "PostgreSQL",
  "CI / CD",
];

/**
 * District / BookMyShow style splash:
 * one bold tech name at a time on a white screen, then exit.
 */
export default function TechSplash({ onDone, words = SPLASH_TECH }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("on"); // on | off | exit
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("exit");
    window.setTimeout(() => onDoneRef.current(), 480);
  };

  useEffect(() => {
    if (phase === "exit") return undefined;

    const hold = index === 0 ? 520 : 340;
    const gap = 100;

    if (phase === "on") {
      const t = window.setTimeout(() => setPhase("off"), hold);
      return () => window.clearTimeout(t);
    }

    if (phase === "off") {
      const t = window.setTimeout(() => {
        if (index >= words.length - 1) {
          finish();
          return;
        }
        setIndex((v) => v + 1);
        setPhase("on");
      }, gap);
      return () => window.clearTimeout(t);
    }

    return undefined;
  }, [index, phase, words.length]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Enter" || event.key === "Escape" || event.key === " ") {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={`splash ${phase === "exit" ? "is-exit" : ""}`}
      role="dialog"
      aria-label="Loading portfolio"
      onClick={finish}
    >
      <button
        type="button"
        className="splash-skip"
        onClick={(event) => {
          event.stopPropagation();
          finish();
        }}
      >
        Skip
      </button>

      <p
        key={`${words[index]}-${index}`}
        className={`splash-word ${phase === "on" ? "is-on" : "is-off"}`}
        aria-live="polite"
      >
        {words[index]}
      </p>

      <p className="splash-meta">Naga Parthiv · Systems</p>
    </div>
  );
}
