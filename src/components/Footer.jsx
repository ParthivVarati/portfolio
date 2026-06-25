import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const toTop = () =>
    window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-green" />
              <span className="text-lg font-bold tracking-tightest">Parthiv Varati</span>
            </div>
            <p className="mono mt-3 text-xs text-sub">
              AI / ML Engineer · India · Available for work
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ParthivVarati"
              target="_blank"
              rel="noreferrer"
              className="border border-line p-2.5 text-sub transition hover:border-ink hover:text-ink"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/naga-parthiv/"
              target="_blank"
              rel="noreferrer"
              className="border border-line p-2.5 text-sub transition hover:border-ink hover:text-ink"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={toTop}
              className="ml-1 inline-flex items-center gap-1.5 border border-line px-4 py-2.5 text-xs font-medium text-sub transition hover:border-ink hover:text-ink"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-xs text-sub">© {new Date().getFullYear()} Naga Parthiv Varma Varati</p>
          <p className="mono text-xs text-sub">Built with React · Vite · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
