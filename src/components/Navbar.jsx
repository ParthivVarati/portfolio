import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = ["home", "experience", "projects", "skills", "education"];

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Brand */}
        <button
          onClick={() => goto("home")}
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink bg-ink text-sm font-bold text-paper transition group-hover:bg-coral group-hover:border-coral">
            P
          </span>
          <span className="hidden text-left sm:block">
            <span className="block font-display text-sm font-semibold leading-tight">
              Naga Parthiv
            </span>
            <span className="eyebrow block text-[10px] text-inksoft">
              AI / ML Engineer
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition ${
                activeSection === id
                  ? "bg-ink text-paper"
                  : "text-inksoft hover:bg-ink/[0.06] hover:text-ink"
              }`}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goto("contact")}
            className="hidden items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-[13px] font-semibold text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-coraldeep sm:inline-flex"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-line bg-card p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium capitalize transition ${
                activeSection === id
                  ? "bg-ink text-paper"
                  : "text-inksoft hover:bg-ink/[0.06]"
              }`}
            >
              {id}
            </button>
          ))}
          <button
            onClick={() => goto("contact")}
            className="mt-1 rounded-xl bg-coral px-4 py-2.5 text-left text-sm font-semibold text-white"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
