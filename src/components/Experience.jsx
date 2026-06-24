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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActive(idx)}
                className={`relative min-w-[180px] rounded-xl border px-4 py-3 text-left transition lg:min-w-0 ${
                  active === idx
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-card text-inksoft hover:border-ink/40 hover:text-ink"
                }`}
              >
                <span className="block font-display text-sm font-semibold">
                  {exp.company}
                </span>
                <span
                  className={`mt-0.5 block text-xs ${
                    active === idx ? "text-paper/70" : "text-inksoft/80"
                  }`}
                >
                  {exp.role}
                </span>
              </button>
            ))}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="paper-card p-6 sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {data.role}{" "}
                    <span className="text-coral">@ {data.company}</span>
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-inksoft">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={15} /> {data.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} /> {data.location}
                    </span>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full border px-3.5 py-1 text-xs font-medium ${
                    data.status === "Current"
                      ? "border-teal bg-teal/10 text-teal"
                      : "border-line text-inksoft"
                  }`}
                >
                  {data.status}
                </span>
              </div>

              <ul className="mt-7 space-y-3.5">
                {data.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-ink/85">
                    <ArrowRight size={17} className="mt-1 shrink-0 text-coral" />
                    <span>
                      {p.text}
                      {p.highlight && (
                        <span className="font-semibold text-teal">{p.highlight}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
