import { motion } from "framer-motion";
import { Sparkles, Cpu, Mail, GraduationCap } from "lucide-react";
import Counter from "./Counter";

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  })
};

function Cell({ i, className = "", children }) {
  return (
    <motion.div
      custom={i}
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`paper-card p-6 sm:p-7 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {/* Big intro — spans */}
          <Cell i={0} className="col-span-2 flex flex-col justify-between lg:col-span-2 lg:row-span-2">
            <Sparkles className="h-6 w-6 text-coral" />
            <p className="mt-8 font-serif text-2xl leading-snug sm:text-3xl">
              I&apos;m a CS graduate who likes the{" "}
              <span className="serif-italic text-coral">unglamorous</span> parts of
              AI — the pipelines, the eval loops, the edge cases — and turning them
              into systems people actually trust.
            </p>
            <p className="mt-6 text-sm text-inksoft">
              Based in India · working remotely · always shipping.
            </p>
          </Cell>

          <Cell i={1}>
            <p className="numeral-outline text-5xl sm:text-6xl">
              <Counter value={8.57} format={(v) => v.toFixed(2)} />
            </p>
            <p className="mt-3 text-sm text-inksoft">CGPA, B.Tech CSE</p>
          </Cell>

          <Cell i={2}>
            <p className="font-display text-5xl font-bold text-coral sm:text-6xl">
              <Counter
                value={1000}
                format={(v) => (v >= 1000 ? "1k+" : `${(v / 1000).toFixed(1)}k`)}
              />
            </p>
            <p className="mt-3 text-sm text-inksoft">Emails/day via async pipelines</p>
          </Cell>

          <Cell i={3} className="col-span-2 lg:col-span-1">
            <Cpu className="h-5 w-5 text-teal" />
            <p className="mt-4 font-display text-lg font-semibold">
              Multi-turn context handling improved{" "}
              <span className="text-teal">
                <Counter value={30} format={(v) => `${Math.round(v)}%`} />
              </span>
            </p>
            <p className="mt-2 text-sm text-inksoft">RAG + Letta memory at Nimoy AI.</p>
          </Cell>

          <Cell i={4} className="flex flex-col justify-between">
            <GraduationCap className="h-5 w-5 text-coral" />
            <div>
              <p className="mt-6 font-display text-base font-semibold">Gitam University</p>
              <p className="text-sm text-inksoft">2021 – 2025</p>
            </div>
          </Cell>

          {/* CTA cell */}
          <Cell i={5} className="col-span-2 flex items-center justify-between bg-ink text-paper lg:col-span-2">
            <div>
              <p className="eyebrow text-[10px] text-coral">Let&apos;s connect</p>
              <p className="mt-2 font-display text-xl font-semibold">
                Have something to build?
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral text-white transition hover:scale-105"
              aria-label="Go to contact"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Cell>
        </div>
      </div>
    </section>
  );
}
