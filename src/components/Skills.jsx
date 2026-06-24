import { useState } from "react";
import { SkillsGlobe } from "./SkillsGlobe";
import { GlobeErrorBoundary } from "./GlobeErrorBoundary";
import SectionHeading from "./SectionHeading";

const tabs = [
  { id: "tech", label: "Tech" },
  { id: "soft", label: "Soft" },
  { id: "creative", label: "Creative" }
];

const content = {
  tech: {
    Languages: ["Python", "SQL"],
    Frontend: ["HTML5", "CSS3", "React", "Tailwind CSS"],
    Backend: ["Flask", "REST APIs"],
    Database: ["MongoDB", "MySQL"],
    AIML: ["Machine Learning", "RAG"],
    LLMs: ["OpenAI (GPT)", "LLaMA"],
    DLFramework: ["PyTorch"],
    AIFrameworks: ["Hugging Face", "Transformers", "LangChain", "LangGraph"],
    Tools: ["Docker", "Git"]
  },
  soft: {
    Strengths: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Adaptability"]
  },
  creative: {
    Creative: ["UI/UX Design", "Video Editing", "Photography"]
  }
};

export default function Skills() {
  const [active, setActive] = useState("tech");

  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Skills & stack"
          subtitle="Tools I reach for when shipping fast and clean."
        />

        {/* Tabs */}
        <div className="mb-10 inline-flex rounded-full border border-line bg-white/[0.03] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === tab.id ? "bg-lime text-base" : "text-muted hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {/* Globe void panel */}
          <div className="relative flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-base2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_20rem_at_50%_30%,rgba(198,255,61,0.12),transparent_60%),radial-gradient(26rem_18rem_at_70%_110%,rgba(46,214,255,0.12),transparent_60%)]" />

            <div className="relative z-10 flex items-center justify-between px-5 pt-5">
              <span className="eyebrow text-[10px] text-muted">{active}_skill.map</span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-glow-lime" /> drag to explore
              </span>
            </div>

            <div className="relative flex flex-1 items-center">
              <GlobeErrorBoundary>
                <SkillsGlobe category={active} />
              </GlobeErrorBoundary>
            </div>
          </div>

          {/* Content list */}
          <div className="space-y-4">
            {Object.entries(content[active]).map(([title, items]) => (
              <div key={title} className="glass p-5">
                <h4 className="eyebrow mb-3 text-[11px] text-lime">{title}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
