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
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="04" title="Skills & stack" subtitle="Tools I reach for when shipping fast and clean." />

      {/* tabs centred above the globe */}
      <div className="flex justify-center">
        <div className="inline-flex border border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`border-r border-line px-6 py-2.5 text-sm font-medium last:border-r-0 transition ${
                active === tab.id ? "bg-ink text-white" : "text-sub hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* globe as the full-width centrepiece */}
      <div className="relative mt-8 overflow-hidden border border-line bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(36rem_24rem_at_50%_25%,rgba(74,222,128,0.16),transparent_60%)]" />
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <span className="label text-ink/50">{active}.map</span>
          <span className="mono flex items-center gap-2 text-[10px] text-ink/50">
            <span className="h-1.5 w-1.5 bg-green" /> drag to explore · auto-rotating
          </span>
        </div>
        <GlobeErrorBoundary>
          <SkillsGlobe category={active} />
        </GlobeErrorBoundary>
      </div>

      {/* category cards in a grid below */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(content[active]).map(([title, items]) => (
          <div key={title} className="panel p-5">
            <h4 className="label mb-3 text-green">{title}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
