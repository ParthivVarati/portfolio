import { motion } from "framer-motion";
import { education } from "../data/education";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="05" title="Education" subtitle="Formal learning that shaped how I think about systems." />

      <div className="border-t border-line">
        {education.map((ed, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.2, 0, 0, 1] }}
            className="group grid grid-cols-1 gap-2 border-b border-line py-8 transition-colors hover:bg-paper sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-8"
          >
            <span className="mono text-sm text-sub transition-colors group-hover:text-green">
              {ed.period}
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tightest sm:text-2xl">{ed.institute}</h3>
              <p className="mt-1 text-sm text-sub">{ed.degree}</p>
            </div>
            <span className="mono w-fit bg-greentint px-3 py-1 text-xs font-medium text-green">
              {ed.score}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
