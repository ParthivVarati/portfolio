import { motion } from "framer-motion";
import { education } from "../data/education";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          title="Education"
          subtitle="Formal learning that shaped how I think about systems."
        />

        <div className="border-t border-line">
          {education.map((ed, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className="group grid grid-cols-1 gap-2 border-b border-line py-8 transition-colors hover:bg-white/[0.02] sm:grid-cols-[200px_1fr_auto] sm:items-center sm:gap-8"
            >
              <span className="numeral-outline text-3xl transition-all group-hover:[-webkit-text-stroke:1.5px_rgba(198,255,61,0.6)] sm:text-4xl">
                {ed.period.split("–")[0].trim()}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">{ed.institute}</h3>
                <p className="mt-1 text-sm text-muted">{ed.degree}</p>
              </div>
              <span className="w-fit rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 font-mono text-xs font-medium text-cyan">
                {ed.score}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
