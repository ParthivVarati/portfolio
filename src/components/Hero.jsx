import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";

const PHRASES = ["RAG & LLM agents.", "computer-vision models.", "async data pipelines."];
const MARQUEE = [
  "Python", "LangChain", "RAG", "PyTorch", "YOLOv8", "React",
  "Docker", "RabbitMQ", "Celery", "Hugging Face", "LangGraph", "OpenCV"
];

const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24">
      <div className="mx-auto w-full max-w-4xl px-5 text-center">
        <motion.div variants={rise} custom={0} initial="hidden" animate="visible">
          <span className="label inline-flex items-center gap-2 border border-line px-3 py-1.5 text-sub">
            <span className="h-1.5 w-1.5 bg-green" />
            AI / ML Engineer · Available for work
          </span>
        </motion.div>

        {/* big centred statement */}
        <motion.h1
          variants={rise}
          custom={1}
          initial="hidden"
          animate="visible"
          className="display mt-8 text-[12.5vw] leading-[0.93] sm:text-[8vw] lg:text-[6.6rem]"
        >
          Where AI ships to
          <br />
          <span className="text-green">production.</span>
        </motion.h1>

        {/* single subhead line, result.dev style */}
        <motion.p
          variants={rise}
          custom={2}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-sub sm:text-xl"
        >
          I&apos;m Naga Parthiv — an AI/ML engineer building agents, vision models,
          and pipelines that hold up when real users show up.
        </motion.p>

        <motion.p
          variants={rise}
          custom={3}
          initial="hidden"
          animate="visible"
          className="mono mt-5 text-sm text-sub"
        >
          <span className="text-green">&gt;</span> currently shipping{" "}
          <span className="text-ink">{typing}</span>
          <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-blink bg-ink" />
        </motion.p>

        <motion.div
          variants={rise}
          custom={4}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={() => scrollTo("contact")} className="btn-green">
            Get in touch <ArrowDownRight className="h-4 w-4" />
          </button>
          <a
            href="https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Résumé <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* marquee band */}
      <div className="group mt-16 border-y border-line bg-paper sm:mt-20">
        <div className="mask-x overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="flex items-center gap-10 text-lg font-medium text-ink/70">
                {item}
                <span className="text-green">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
