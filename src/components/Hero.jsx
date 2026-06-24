import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

const PHRASES = ["AI / ML pipelines.", "Full-stack applications.", "RAG & LLM systems."];
const MARQUEE = [
  "Python", "LangChain", "RAG", "PyTorch", "YOLOv8", "React",
  "Docker", "RabbitMQ", "Celery", "Hugging Face", "LangGraph", "OpenCV"
];

export default function Hero() {
  const [pct, setPct] = useState(0);
  const [typing, setTyping] = useState("");

  // boot counter
  useEffect(() => {
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const t = (ts - start) / 900;
      const eased = Math.min(100, Math.round(100 * (1 - Math.pow(1 - t, 1.8))));
      setPct(eased);
      if (eased < 100) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, []);

  // typewriter
  useEffect(() => {
    if (pct < 100) return;
    let idx = 0;
    let char = 0;

    const run = () => {
      const current = PHRASES[idx];
      if (char <= current.length) {
        setTyping(current.slice(0, char));
        char++;
        setTimeout(run, 45);
      } else {
        setTimeout(() => {
          const del = () => {
            if (char >= 0) {
              setTyping(current.slice(0, char));
              char--;
              setTimeout(del, 20);
            } else {
              idx = (idx + 1) % PHRASES.length;
              char = 0;
              run();
            }
          };
          del();
        }, 1300);
      }
    };
    run();
  }, [pct]);

  const goExp = () =>
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5">
        {/* status eyebrow */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
          </span>
          <span className="eyebrow text-[11px] text-inksoft">
            {pct < 100
              ? `booting portfolio · ${String(pct).padStart(3, "0")}%`
              : "open to opportunities · 2026"}
          </span>
        </div>

        {/* headline */}
        <h1 className="display mt-7 text-[2.6rem] font-bold leading-[1.04] sm:text-6xl md:text-7xl">
          I build secure, reliable
          <br />
          <span className="text-coral">AI &amp; ML systems</span>
          <span className="text-ink">.</span>
        </h1>

        {/* typewriter line */}
        <div className="mt-5 h-8 sm:h-9">
          <p className="font-mono text-base text-inksoft sm:text-lg">
            <span className="text-teal">&gt;</span> {typing}
            <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-blink bg-ink" />
          </p>
        </div>

        {/* intro */}
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-inksoft sm:text-base">
          Hi, I&apos;m{" "}
          <span className="font-semibold text-ink ink-underline">
            Naga Parthiv Varma Varati
          </span>
          , a Computer Science graduate engineering RAG agents, vision models, and
          async pipelines that hold up in production.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button onClick={goExp} className="btn-coral">
            View experience <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Download className="h-4 w-4" />
            Résumé
          </a>
        </div>
      </div>

      {/* marquee band */}
      <div className="mt-16 overflow-hidden border-y border-line bg-paper2/70 py-3.5 sm:mt-20">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-sm text-inksoft"
            >
              {item}
              <span className="text-coral">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
