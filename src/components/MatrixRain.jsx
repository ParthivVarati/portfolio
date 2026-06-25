import { useEffect, useRef } from "react";

// Tech "code rain" — the portfolio-appropriate take on result.dev's money rain.
const GLYPHS =
  "01<>/{}[]()=+*;:アイウエオカキクABCDEFのλΣpyMLRAG".split("");

export default function MatrixRain() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const fontSize = 15;
    let w, h, cols, drops, raf;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / fontSize);
      drops = Array(cols)
        .fill(0)
        .map(() => Math.floor((Math.random() * -h) / fontSize));
    };
    resize();

    const draw = () => {
      // translucent fade leaves glowing trails
      ctx.fillStyle = "rgba(6, 9, 7, 0.10)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // bright leading glyph, dimmer tail
        ctx.fillStyle = Math.random() > 0.97 ? "rgba(170,255,200,0.9)" : "rgba(74,222,128,0.55)";
        ctx.fillText(ch, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.55 + Math.random() * 0.5;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.18 }}
    />
  );
}
