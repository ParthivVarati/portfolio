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
    skills: [
      "Python", "REST APIs", "LangChain", "LangGraph", "RAG", "Letta",
      "RabbitMQ", "Celery", "YOLOv8", "YOLO11n", "SAM 2", "PyTorch",
      "OpenCV", "React", "Tailwind CSS", "Docker", "Git"
    ]
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
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="01"
          title="Experience"
          subtitle="Where I've shipped, learned, and broken things on purpose."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          {/* Company selector */}
          <div className="flex flex-col">
            {experiences.map((exp, idx) => {
              const on = active === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActive(idx)}
                  className="group border-b border-line py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all ${
                        on ? "bg-lime shadow-glow-lime" : "bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                    <h3
                      className={`headline text-3xl transition-colors sm:text-4xl ${
                        on ? "text-text" : "text-text/30 group-hover:text-text/60"
                      }`}
                    >
                      {exp.company}
                    </h3>
                  </div>
                  <div className="mt-2 flex items-center gap-3 pl-6 font-mono text-xs text-muted">
                    <span>{exp.role}</span>
                    <span className="text-white/20">/</span>
                    <span>{exp.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass p-7 sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-2xl font-bold">
                    {data.role} <span className="text-lime">@ {data.company}</span>
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={15} /> {data.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} /> {data.location}
                    </span>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3.5 py-1 font-mono text-xs ${
                    data.status === "Current"
                      ? "border-lime/40 bg-lime/10 text-lime"
                      : "border-line text-muted"
                  }`}
                >
                  {data.status}
                </span>
              </div>

              <ul className="mt-7 space-y-3.5">
                {data.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-text/85">
                    <ArrowRight size={17} className="mt-1 shrink-0 text-lime" />
                    <span>
                      {p.text}
                      {p.highlight && <span className="font-semibold text-cyan">{p.highlight}</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
