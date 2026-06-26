import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "booting portfolio.sys",
  "loading modules ............. ok",
  "compiling neural runtime .... ok",
  "mounting 3d globe ........... ok",
  "establishing uplink ......... ok",
  "render pipeline ............. ready"
];

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf;
    let start;
    const dur = 2300;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = Math.round(100 * (1 - Math.pow(1 - p, 2)));
      setPct(eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(onDone, 500);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const shown = Math.min(LINES.length, Math.floor((pct / 100) * (LINES.length + 1)));

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#060907]"
    >
      {/* CRT power-on flicker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.1, 0.4, 0] }}
        transition={{ duration: 0.6, times: [0, 0.15, 0.3, 0.5, 1] }}
        className="pointer-events-none absolute inset-0 bg-green/20"
      />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative w-full max-w-md px-6">
        {/* boot log */}
        <div className="mono space-y-1.5 text-[13px] leading-relaxed text-green">
          {LINES.slice(0, shown).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-sub">$</span> {l}
            </motion.div>
          ))}
          {pct >= 100 && (
            <div className="text-ink">
              <span className="text-green">$</span> launch
              <span className="ml-0.5 inline-block h-[1em] w-[8px] translate-y-[2px] animate-blink bg-green" />
            </div>
          )}
        </div>

        {/* counter + bar */}
        <div className="mt-10 flex items-end justify-between">
          <span className="display text-7xl tabular-nums text-ink sm:text-8xl">
            {String(pct).padStart(3, "0")}
            <span className="text-green">%</span>
          </span>
          <span className="label text-sub">init.sys</span>
        </div>
        <div className="mt-5 h-[3px] w-full bg-line">
          <div
            className="h-full bg-green shadow-glow transition-[width] duration-75 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
