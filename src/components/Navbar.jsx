import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = ["home", "about", "experience", "projects", "skills", "education"];

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-base/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Brand */}
        <button onClick={() => goto("home")} className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.04] font-mono text-sm font-bold text-lime transition group-hover:border-lime/50 group-hover:shadow-glow-lime">
            P
          </span>
          <span className="hidden text-left sm:block">
            <span className="block font-display text-sm font-semibold leading-tight text-text">
              Naga Parthiv
            </span>
            <span className="eyebrow block text-[10px] text-muted">AI / ML Engineer</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 md:flex">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition ${
                activeSection === id
                  ? "bg-lime text-base"
                  : "text-muted hover:text-text"
              }`}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goto("contact")}
            className="hidden items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-base shadow-glow-lime transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-xl border border-line bg-white/[0.04] p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium capitalize transition ${
                activeSection === id ? "bg-lime text-base" : "text-muted hover:bg-white/[0.05]"
              }`}
            >
              {id}
            </button>
          ))}
          <button
            onClick={() => goto("contact")}
            className="mt-1 rounded-xl bg-lime px-4 py-2.5 text-left text-sm font-semibold text-base"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
