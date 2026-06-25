import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    id: 0,
    company: "Nimoy AI",
    role: "AI Engineer",
    location: "Remote",
    duration: "Sep 2025 – Present",
    status: "Current",
    points: [
      {
        text: "Created agents using RAG, LangChain and integrated Letta memory, improving multi-turn context handling by ",
        highlight: "30%"
      },
      {
        text: "Designed async email pipelines with RabbitMQ & Celery, processing ",
        highlight: "1k+ emails/day"
      },
      {
        text: "Developed AI & vision solutions, including multi-API agents and PPE detection models (YOLOv8/11n + SAM 2)."
      }
    ],
    skills: ["Python", "LangChain", "LangGraph", "RAG", "Letta", "RabbitMQ", "Celery", "YOLOv8", "SAM 2", "PyTorch", "Docker"]
  },
  {
    id: 1,
    company: "Exponential AI",
    role: "Intern",
    location: "Hyderabad, India",
    duration: "Jun 2024 – Jul 2024",
    status: "Completed",
    points: [
      { text: "Ensured data quality through software testing, dataset annotation, and output validation." },
      { text: "Identified and reported bugs, collaborating with developers to resolve issues efficiently." },
      { text: "Worked within SDLC and Agile sprints, contributing to iterative development cycles." }
    ],
    skills: ["Manual Testing", "Data Annotation", "Bug Tracking", "SDLC", "Agile", "Git"]
  }
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const data = experiences[active];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="02" title="Experience" subtitle="Where I've shipped, learned, and broken things on purpose." />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
        {/* company list */}
        <div className="border-t border-line lg:border-t-0 lg:border-r">
          {experiences.map((exp, idx) => {
            const on = active === idx;
            return (
              <button
                key={exp.id}
                onClick={() => setActive(idx)}
                className={`relative block w-full border-b border-line px-2 py-6 text-left transition-colors lg:pr-8 ${
                  on ? "" : "opacity-50 hover:opacity-90"
                }`}
              >
                {on && <span className="absolute left-0 top-0 h-full w-[3px] bg-green" />}
                <span className="mono text-xs text-sub">0{idx + 1}</span>
                <span className="mt-1 block text-2xl font-bold tracking-tightest">{exp.company}</span>
                <span className="mono mt-1 block text-xs text-sub">{exp.role}</span>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="border-t border-line px-2 py-8 lg:border-t-0 lg:px-10"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold tracking-tightest sm:text-3xl">
                  {data.role} <span className="text-green">@ {data.company}</span>
                </h3>
                <div className="mono mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-sub">
                  <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {data.duration}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} /> {data.location}</span>
                </div>
              </div>
              <span
                className={`label px-3 py-1 ${
                  data.status === "Current" ? "bg-greentint text-greendk" : "border border-line text-sub"
                }`}
              >
                {data.status}
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              {data.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                  <ArrowRight size={17} className="mt-1 shrink-0 text-green" />
                  <span>
                    {p.text}
                    {p.highlight && <span className="font-semibold text-green">{p.highlight}</span>}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
