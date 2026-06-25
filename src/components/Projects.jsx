import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../data/projects";

export default function Projects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // drive horizontal travel from vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-72%"]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* header row */}
        <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between border-t border-ink pt-5">
            <div className="flex items-baseline gap-4">
              <span className="mono text-sm font-medium text-green">(03)</span>
              <h2 className="display text-4xl sm:text-5xl">Selected work</h2>
            </div>
            <span className="mono hidden text-xs text-sub sm:block">scroll →</span>
          </div>
          {/* scroll progress bar */}
          <div className="mt-5 h-[2px] w-full bg-line">
            <motion.div style={{ width: progressW }} className="h-full bg-green" />
          </div>
        </div>

        {/* horizontal track */}
        <motion.div style={{ x }} className="flex gap-5 pl-5 sm:pl-8">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              className="panel group flex h-[58vh] w-[80vw] shrink-0 flex-col p-7 sm:w-[46vw] lg:w-[34vw]"
            >
              <div className="flex items-center justify-between">
                <span className="mono text-sm text-sub">0{idx + 1}</span>
                <span className={`label px-2.5 py-1 ${project.status === "Online" ? "bg-greentint text-greendk" : "border border-line text-sub"}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="mt-8 text-4xl font-bold leading-[0.98] tracking-tightest sm:text-5xl">
                {project.title}
              </h3>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-sub">
                {project.description}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t.trim()}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink transition-all duration-300 group-hover:bg-green group-hover:border-green group-hover:text-black"
                  aria-label={`Visit ${project.title}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </article>
          ))}

          {/* end card */}
          <a
            href="https://github.com/ParthivVarati"
            target="_blank"
            rel="noreferrer"
            className="group flex h-[58vh] w-[80vw] shrink-0 flex-col items-center justify-center gap-5 border border-line bg-black p-7 text-ink sm:w-[46vw] lg:w-[28vw]"
          >
            <Github className="h-10 w-10 text-green" />
            <span className="display text-3xl">More on GitHub</span>
            <span className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 text-sm font-semibold transition group-hover:bg-green group-hover:border-green group-hover:text-black">
              @ParthivVarati <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
