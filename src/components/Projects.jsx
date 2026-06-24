import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeading from "./SectionHeading";

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.45, ease: "easeOut" }
  })
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Selected work"
          subtitle="Things I built to learn, break, and rebuild better."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="paper-card group relative flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              {/* number + status */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-inksoft">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-inksoft">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "Online" ? "bg-teal" : "bg-coral"
                    }`}
                  />
                  {project.status}
                </span>
              </div>

              <h3 className="mt-4 flex items-start justify-between gap-3 font-display text-lg font-bold leading-snug">
                <span className="transition group-hover:text-coral">
                  {project.title}
                </span>
                <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-inksoft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-inksoft">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t.trim()}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
