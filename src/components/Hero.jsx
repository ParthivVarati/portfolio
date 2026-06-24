import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
};

const PHRASES = ["RAG & LLM agents.", "Computer-vision models.", "Async data pipelines."];
const MARQUEE = [
  "Python", "LangChain", "RAG", "PyTorch", "YOLOv8", "React",
  "Docker", "RabbitMQ", "Celery", "Hugging Face", "LangGraph", "OpenCV"
];

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
        <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-inksoft">
          <span>Portfolio — 2026</span>
          <span className="hidden sm:inline">Naga Parthiv Varma Varati</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Open to work
          </span>
        </div>

        {/* headline + meta */}
        <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[1fr_240px] lg:gap-12 lg:pt-14">
          <div>
            <motion.h1
              variants={rise}
              custom={0}
              initial="hidden"
              animate="visible"
              className="headline text-[15vw] leading-[0.88] sm:text-[12vw] lg:text-[8.2rem]"
            >
              I build
              <br />
              <span className="serif-italic font-normal text-coral">secure</span>{" "}
              AI&nbsp;&amp;&nbsp;ML
              <br />
              systems<span className="text-coral">.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-8 font-mono text-base text-inksoft sm:text-lg"
            >
              <span className="text-teal">~/</span> currently shipping{" "}
              <span className="text-ink">{typing}</span>
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-blink bg-ink" />
            </motion.p>
          </div>

          {/* magazine masthead column */}
          <motion.aside
            variants={rise}
            custom={2}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-8"
          >
            <div>
              <p className="eyebrow text-[10px] text-inksoft">Role</p>
              <p className="mt-1 font-display text-sm font-semibold">
                AI / ML Engineer @ Nimoy AI
              </p>
            </div>
            <div>
              <p className="eyebrow text-[10px] text-inksoft">Based in</p>
              <p className="mt-1 font-display text-sm font-semibold">India · Remote</p>
            </div>
            <div>
              <p className="eyebrow text-[10px] text-inksoft">Focus</p>
              <p className="mt-1 text-sm leading-relaxed text-inksoft">
                RAG agents, vision models, and async pipelines that hold up in
                production.
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-coral justify-center"
              >
                View work <ArrowDownRight className="h-4 w-4" />
              </button>
              <a
                href="https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost justify-center"
              >
                <Download className="h-4 w-4" /> Résumé
              </a>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* marquee band */}
      <div className="group mt-14 overflow-hidden border-y border-line bg-ink py-4 lg:mt-20">
        <div className="mask-x flex w-max animate-marquee gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-lg font-medium text-paper/90"
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
