import { useEffect, useRef, useState } from "react";

/**
 * "I design the systems I build."
 * On a blueprint canvas, a real architecture assembles in three beats:
 *   DESIGN — outlines + connections sketch in
 *   BUILD  — boxes go solid, labels land
 *   SCALE  — the service fans out to ×3 replicas, traffic starts flowing
 * Then the diagram collapses into a cursor that flies to the terminal prompt.
 *
 * Plays on every load. Tap / any key skips to the hand-off.
 */

const BEATS = ["DESIGN", "BUILD", "SCALE"];

// Timeline (ms) — all pacing lives here.
const T = {
  design: 250,
  build: 1150,
  scale: 1950,
  collapse: 2950,
  fly: 3230,
  flyFor: 560,
};

/* Architecture (viewBox 360×200) — client → api → service → queue / postgres / redis */
const NODES = [
  { id: "client", label: "client", x: 6, y: 86, w: 58 },
  { id: "api", label: "api", x: 94, y: 86, w: 52 },
  { id: "svc", label: "service", x: 178, y: 86, w: 70 },
  { id: "queue", label: "queue", x: 286, y: 26, w: 68 },
  { id: "db", label: "postgres", x: 286, y: 86, w: 68 },
  { id: "cache", label: "redis", x: 286, y: 146, w: 68 },
];
const H = 28;
const node = (id) => NODES.find((n) => n.id === id);
const right = (n) => [n.x + n.w, n.y + H / 2];
const left = (n) => [n.x, n.y + H / 2];
const edge = (a, b) => {
  const [x1, y1] = right(node(a));
  const [x2, y2] = left(node(b));
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};
const EDGES = [
  { id: "c-a", d: edge("client", "api") },
  { id: "a-s", d: edge("api", "svc") },
  { id: "s-q", d: edge("svc", "queue") },
  { id: "s-d", d: edge("svc", "db") },
  { id: "s-r", d: edge("svc", "cache") },
];
// Fan-out edges to the replicas (drawn in the SCALE beat)
const svc = node("svc");
const REPLICA_DY = 40;
const FAN = [-REPLICA_DY, REPLICA_DY].map((dy) => {
  const [x1, y1] = right(node("api"));
  const x2 = svc.x;
  const y2 = svc.y + H / 2 + dy;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Blueprint({ beat }) {
  const cls = ["bp", beat >= 0 && "p-design", beat >= 1 && "p-build", beat >= 2 && "p-scale"]
    .filter(Boolean)
    .join(" ");

  return (
    <svg className={cls} viewBox="0 0 360 200" aria-hidden="true">
      <defs>
        <pattern id="bpDots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" className="bp-dot" />
        </pattern>
        <filter id="bpGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="-40" y="-30" width="440" height="260" fill="url(#bpDots)" className="bp-grid" />

      {/* replicas sit behind the service and slide out on SCALE */}
      {[-REPLICA_DY, REPLICA_DY].map((dy) => (
        <g key={dy} className="bp-replica" style={{ "--dy": `${dy}px` }}>
          <rect x={svc.x} y={svc.y} width={svc.w} height={H} rx="5" />
          <text x={svc.x + svc.w / 2} y={svc.y + H / 2 + 3.5}>service</text>
        </g>
      ))}
      {FAN.map((d) => (
        <path key={d} d={d} pathLength="1" className="bp-edge bp-fan" />
      ))}

      {EDGES.map((e, i) => (
        <path key={e.id} d={e.d} pathLength="1" className="bp-edge" style={{ "--i": i }} />
      ))}

      {NODES.map((n, i) => (
        <g key={n.id} className={`bp-node is-${n.id}`} style={{ "--i": i }}>
          <rect x={n.x} y={n.y} width={n.w} height={H} rx="5" pathLength="1" />
          <text x={n.x + n.w / 2} y={n.y + H / 2 + 3.5}>{n.label}</text>
        </g>
      ))}

      <text x={svc.x + svc.w / 2} y={svc.y - REPLICA_DY - 6} className="bp-badge">×3 replicas</text>

      {/* live traffic */}
      {beat >= 2 && (
        <g className="bp-packets" filter="url(#bpGlow)">
          {[...EDGES.map((e) => e.d), ...FAN].map((d, i) => (
            <circle key={d} r="2.2">
              <animateMotion dur={`${0.75 + (i % 3) * 0.15}s`} begin={`${(i * 0.11).toFixed(2)}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        </g>
      )}
    </svg>
  );
}

export default function TechSplash({ onReveal, onDone }) {
  const [reduce] = useState(prefersReducedMotion);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState("draw"); // draw | collapse | fly
  const [flight, setFlight] = useState(null);
  const phaseRef = useRef("draw");
  const cursorRef = useRef(null);
  const cbRef = useRef({ onReveal, onDone });
  cbRef.current = { onReveal, onDone };

  // Warm up Char's 3D chunk while the splash plays
  useEffect(() => {
    import("./LiveCharizard").catch(() => {});
  }, []);

  useEffect(() => {
    if (reduce) return undefined;
    const t0 = performance.now();
    const id = window.setInterval(() => setElapsed(performance.now() - t0), 30);
    return () => window.clearInterval(id);
  }, [reduce]);

  const go = (next) => {
    const order = ["draw", "collapse", "fly"];
    if (order.indexOf(next) <= order.indexOf(phaseRef.current)) return;
    phaseRef.current = next;
    setPhase(next);
  };

  // Fly: mount the terminal, find its prompt caret, glide the cursor onto it
  useEffect(() => {
    if (phase !== "fly") return undefined;
    cbRef.current.onReveal?.();
    let cancelled = false;
    let doneTimer = 0;

    const measure = () => {
      if (cancelled) return;
      const from = cursorRef.current?.getBoundingClientRect();
      const input = document.querySelector(".mac-input");
      const body = document.querySelector(".mac-body");
      let target = null;
      if (input && body) {
        const ir = input.getBoundingClientRect();
        const br = body.getBoundingClientRect();
        // Prompt visible? Land on its caret. Otherwise land after the welcome card's handle.
        if (ir.top > br.top && ir.bottom < br.bottom - 8) {
          const fs = parseFloat(getComputedStyle(input).fontSize) || 14;
          target = { x: ir.left + 1, y: ir.top + ir.height / 2, w: fs * 0.6, h: fs * 1.3 };
        } else {
          const host = document.querySelector(".welcome-id .t-host");
          if (host) {
            const r = host.getBoundingClientRect();
            target = { x: r.right + 6, y: r.top + r.height / 2, w: 8, h: 17 };
          }
        }
      }
      if (from && target) {
        setFlight({
          dx: target.x + target.w / 2 - (from.left + from.width / 2),
          dy: target.y - (from.top + from.height / 2),
          sx: target.w / from.width,
          sy: target.h / from.height,
        });
      }
      doneTimer = window.setTimeout(() => cbRef.current.onDone?.(), T.flyFor + 260);
    };

    // two frames: the terminal has mounted and laid out
    requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => {
      cancelled = true;
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(() => {
        cbRef.current.onReveal?.();
        cbRef.current.onDone?.();
      }, 600);
      return () => window.clearTimeout(t);
    }
    if (elapsed >= T.fly) go("fly");
    else if (elapsed >= T.collapse) go("collapse");
    return undefined;
  }, [elapsed, reduce]);

  const skip = () => {
    if (phaseRef.current === "draw") {
      go("collapse");
      window.setTimeout(() => go("fly"), 220);
    }
  };

  useEffect(() => {
    const onKey = () => skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const beat = reduce ? 2 : elapsed >= T.scale ? 2 : elapsed >= T.build ? 1 : elapsed >= T.design ? 0 : -1;

  const cursorStyle = flight
    ? {
        transform: `translate(${flight.dx}px, ${flight.dy}px) scale(${flight.sx}, ${flight.sy})`,
        transition: `transform ${T.flyFor}ms cubic-bezier(0.65, 0, 0.25, 1), opacity 0.2s ease ${T.flyFor + 40}ms`,
      }
    : undefined;

  return (
    <div
      className={["boot", `is-${phase}`, flight ? "has-flight" : "", reduce ? "is-reduced" : ""].filter(Boolean).join(" ")}
      role="dialog"
      aria-label="Loading portfolio"
      onClick={skip}
    >
      <div className="boot-grain" aria-hidden="true" />

      <div className="boot-stage">
        <Blueprint beat={beat} />

        <div className="boot-step" aria-live="polite">
          {beat >= 0 && (
            <p key={BEATS[beat]} className="boot-word">
              {BEATS[beat]}
            </p>
          )}
        </div>

        <ol className="boot-dots" aria-hidden="true">
          {BEATS.map((b, i) => (
            <li key={b} className={i <= beat ? "is-on" : ""} />
          ))}
        </ol>
      </div>

      <span ref={cursorRef} className="boot-cursor" style={cursorStyle} aria-hidden="true" />

      <p className="boot-skip">tap to skip</p>
    </div>
  );
}
