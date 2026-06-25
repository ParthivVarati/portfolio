import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  ["experience", "Experience"],
  ["projects", "Work"],
  ["skills", "Skills"],
  ["education", "Education"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -8 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-white/90 backdrop-blur" : "border-transparent bg-white/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark */}
        <button onClick={() => goto("home")} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-green" />
          <span className="text-[15px] font-bold tracking-tightest">Parthiv Varati</span>
        </button>

        {/* center nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([id, label]) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className="link text-sm font-medium text-ink/70 hover:text-ink"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => goto("contact")} className="btn-green hidden sm:inline-flex !py-2.5">
            Get in touch
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="border border-line p-2 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile */}
      <div
        className={`overflow-hidden border-t bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-80 border-line" : "max-h-0 border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-5 py-2">
          {NAV.map(([id, label]) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className="border-b border-line py-3 text-left text-base font-medium"
            >
              {label}
            </button>
          ))}
          <button onClick={() => goto("contact")} className="btn-green mt-4 mb-3">
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
