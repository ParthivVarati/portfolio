const SECTIONS = [
  { id: "home", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export default function SideRail({ activeSection }) {
  const goto = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {SECTIONS.map(({ id, label }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => goto(id)}
            className="group flex items-center gap-3"
            aria-label={label}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                active
                  ? "translate-x-0 text-ink opacity-100"
                  : "translate-x-2 text-inksoft opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active
                  ? "h-2.5 w-2.5 bg-coral"
                  : "h-2 w-2 bg-ink/25 group-hover:bg-ink/50"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
