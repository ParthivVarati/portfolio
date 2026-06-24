import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line pt-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* giant wordmark */}
        <p className="headline text-[16vw] leading-[0.82] text-ink/90 lg:text-[11rem]">
          Let&apos;s talk<span className="text-coral">.</span>
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-inksoft">
            © {new Date().getFullYear()} Naga Parthiv Varma Varati — built with React,
            Vite, Tailwind &amp; Framer Motion.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ParthivVarati"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-card p-2.5 text-inksoft transition hover:border-ink hover:text-ink"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/naga-parthiv/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-card p-2.5 text-inksoft transition hover:border-ink hover:text-ink"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={toTop}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2.5 text-xs font-medium text-inksoft transition hover:border-ink hover:text-ink"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
