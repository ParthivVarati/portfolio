import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Selected work"
          subtitle="Things I built to learn, break, and rebuild better."
        />

        {/* editorial index */}
        <div className="border-t border-line">
          {projects.map((project, idx) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="index-row group block border-b border-line"
            >
              <div className="flex items-center gap-5 px-3 py-7 sm:px-6 sm:py-9">
                <span className="font-mono text-sm text-inksoft transition-colors group-hover:text-coral">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="headline text-2xl text-ink transition-colors group-hover:text-paper sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-1 max-w-2xl text-sm text-inksoft transition-colors group-hover:text-paper/70">
                    {project.description}
                  </p>
                </div>

                {/* tech list — desktop */}
                <div className="hidden w-44 shrink-0 flex-wrap justify-end gap-x-2 gap-y-1 text-right font-mono text-[11px] text-inksoft transition-colors group-hover:text-paper/60 lg:flex">
                  {project.tech.map((t) => (
                    <span key={t}>{t.trim()}</span>
                  ))}
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-coral group-hover:bg-coral group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
