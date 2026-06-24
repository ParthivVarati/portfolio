import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
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

        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((ed, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.4 }}
              className="paper-card flex items-start gap-4 p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-coral">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold">{ed.institute}</h3>
                <p className="mt-0.5 text-sm text-inksoft">{ed.degree}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-inksoft">
                  <span className="font-mono">{ed.period}</span>
                  <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-medium text-teal">
                    {ed.score}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
