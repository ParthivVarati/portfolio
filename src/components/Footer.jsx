import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink bg-ink text-xs font-bold text-paper">
            P
          </span>
          <p className="text-xs text-inksoft">
            © {new Date().getFullYear()} Naga Parthiv Varma Varati ·{" "}
            <span className="text-inksoft/70">
              Built with React, Vite, Tailwind &amp; Framer Motion.
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ParthivVarati"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-card p-2 text-inksoft transition hover:border-ink hover:text-ink"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/naga-parthiv/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-card p-2 text-inksoft transition hover:border-ink hover:text-ink"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <button
            onClick={toTop}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-2 text-xs font-medium text-inksoft transition hover:border-ink hover:text-ink"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
