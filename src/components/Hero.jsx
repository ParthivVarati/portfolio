import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";

const PHRASES = ["RAG & LLM agents.", "computer-vision models.", "async data pipelines."];
const MARQUEE = [
  "Python", "LangChain", "RAG", "PyTorch", "YOLOv8", "React",
  "Docker", "RabbitMQ", "Celery", "Hugging Face", "LangGraph", "OpenCV"
];

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Hero() {
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let idx = 0;
    let char = 0;
    let timer;
    const run = () => {
      const current = PHRASES[idx];
      if (char <= current.length) {
        setTyping(current.slice(0, char));
        char++;
        timer = setTimeout(run, 48);
      } else {
        timer = setTimeout(() => {
          const del = () => {
            if (char >= 0) {
              setTyping(current.slice(0, char));
              char--;
              timer = setTimeout(del, 22);
            } else {
              idx = (idx + 1) % PHRASES.length;
              char = 0;
              run();
            }
          };
          del();
        }, 1400);
      }
    };
    run();
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        {/* masthead top rule */}
        <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="text-lime">// portfolio_2026</span>
          <span className="hidden sm:inline">Naga Parthiv Varma Varati</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-glow-lime animate-pulseglow" />
            Open to work
          </span>
        </div>

        {/* headline + meta */}
        <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[1fr_250px] lg:gap-12 lg:pt-14">
          <div>
            <motion.h1
              variants={rise}
              custom={0}
              initial="hidden"
              animate="visible"
              className="headline text-[14vw] leading-[0.88] sm:text-[11.5vw] lg:text-[8.4rem]"
            >
              I build
              <br />
              <span className="text-lime glow-text">secure</span> AI&nbsp;&amp;&nbsp;ML
              <br />
              systems<span className="text-lime">.</span>
            </motion.h1>

            <motion.div
              variants={rise}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-9 inline-flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 font-mono text-sm text-muted backdrop-blur"
            >
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
              </span>
              <span className="text-cyan">~/shipping</span>
              <span className="text-text">{typing}</span>
              <span className="inline-block h-[1.05em] w-[8px] translate-y-[2px] animate-blink bg-lime" />
            </motion.div>
          </div>

          {/* masthead column */}
          <motion.aside
            variants={rise}
            custom={2}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-8"
          >
            <div>
              <p className="eyebrow text-[10px] text-lime">Role</p>
              <p className="mt-1.5 font-display text-sm font-semibold">AI / ML Engineer @ Nimoy AI</p>
            </div>
            <div>
              <p className="eyebrow text-[10px] text-lime">Based in</p>
              <p className="mt-1.5 font-display text-sm font-semibold">India · Remote</p>
            </div>
            <div>
              <p className="eyebrow text-[10px] text-lime">Focus</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                RAG agents, vision models, and async pipelines that hold up in
                production.
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                View work <ArrowDownRight className="h-4 w-4" />
              </button>
              <a
                href="https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download className="h-4 w-4" /> Résumé
              </a>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* marquee band */}
      <div className="group mt-14 overflow-hidden border-y border-line bg-white/[0.02] py-4 lg:mt-20">
        <div className="mask-x flex w-max animate-marquee gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-lg font-medium text-text/80">
              {item}
              <span className="text-lime">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
