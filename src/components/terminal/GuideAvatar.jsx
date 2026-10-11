import LiveCharizard from "./LiveCharizard";

/**
 * Char slides to the caret while typing (fire from snout),
 * then waits mid-right with chips fully visible.
 */

function FireBreath({ on, tick }) {
  if (!on) return null;

  return (
    <div className="buddy-mouth-fire" key={tick} aria-hidden="true">
      {/* Hot origin locked to the snout */}
      <span className="mouth-ember" />

      <svg className="buddy-flame-svg" viewBox="0 0 120 56" preserveAspectRatio="xMaxYMid meet">
        <defs>
          <linearGradient id="fgOuter" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#ff9a18" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ff4d00" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff1a00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fgMid" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#ffe56a" />
            <stop offset="40%" stopColor="#ff9a1a" />
            <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fgCore" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fff3a0" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
          </linearGradient>
          <filter id="fgSoft" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
          <filter id="fgGlow" x="-40%" y="-70%" width="180%" height="240%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Right edge = jaws; jagged tongues so it reads as fire, not a laser beam */}
        <path
          className="fire-tongue t-outer"
          filter="url(#fgSoft)"
          fill="url(#fgOuter)"
          d="M118 28
             C110 12, 96 6, 78 10
             C58 8, 40 14, 22 18
             C12 20, 4 24, 1 28
             C4 31, 12 36, 24 40
             C42 46, 60 44, 78 42
             C96 48, 110 42, 118 28 Z"
        />
        <path
          className="fire-tongue t-mid"
          filter="url(#fgGlow)"
          fill="url(#fgMid)"
          d="M116 28
             C108 16, 94 12, 76 14
             C56 12, 38 18, 22 22
             C12 24, 6 26, 3 28
             C6 30, 14 34, 24 36
             C40 40, 58 38, 76 36
             C94 40, 108 36, 116 28 Z"
        />
        <path
          className="fire-tongue t-core"
          fill="url(#fgCore)"
          d="M114 28
             C106 20, 92 18, 74 19
             C54 18, 36 23, 18 26
             C10 27, 5 28, 5 28
             C10 29, 20 32, 36 33
             C54 36, 74 34, 92 32
             C106 34, 112 30, 114 28 Z"
        />

        <circle className="fire-ember e1" cx="48" cy="18" r="2.4" fill="#ffe9a0" />
        <circle className="fire-ember e2" cx="32" cy="34" r="1.8" fill="#ffb040" />
        <circle className="fire-ember e3" cx="20" cy="22" r="1.5" fill="#fff6c8" />
        <circle className="fire-ember e4" cx="40" cy="30" r="1.6" fill="#ff7a20" />
        <circle className="fire-ember e5" cx="14" cy="30" r="1.2" fill="#ffd060" />
      </svg>
    </div>
  );
}

export default function GuideAvatar({
  mood = "idle",
  thought = "",
  hints = [],
  busy = false,
  pose = "wait",
  breathing = false,
  breathTick = 0,
  anchor = null,
  onSuggest,
}) {
  const showHints = pose === "wait" && hints.length > 0 && !breathing;

  const style = anchor
    ? {
        left: `${anchor.left}px`,
        top: `${anchor.top}px`,
        right: "auto",
        bottom: "auto",
      }
    : undefined;

  return (
    <aside
      className={[
        "buddy-dock",
        `pose-${pose}`,
        `mood-${mood}`,
        busy ? "is-busy" : "",
        breathing ? "is-breathing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      aria-label="Guide"
    >
      {thought && pose === "wait" ? (
        <p className="buddy-thought" aria-live="polite">
          {thought}
        </p>
      ) : null}

      {showHints && (
        <div className="buddy-hints" aria-label="Click to auto-type">
          {hints.map((hint) => (
            <button
              key={hint.cmd}
              type="button"
              className="buddy-hint"
              disabled={busy}
              onClick={() => onSuggest?.(hint.cmd)}
            >
              {hint.label}
            </button>
          ))}
        </div>
      )}

      <div className="buddy-stage">
        <span className="buddy-glow" aria-hidden="true" />
        <LiveCharizard
          mood={mood}
          busy={busy || breathing}
          breathing={breathing}
          facing={pose}
        />
        <FireBreath on={breathing} tick={breathTick} />
      </div>
    </aside>
  );
}
