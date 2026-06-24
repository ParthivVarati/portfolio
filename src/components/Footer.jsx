import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line pt-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="headline text-[15vw] leading-[0.82] text-text/90 lg:text-[10rem]">
          Let&apos;s talk<span className="text-lime glow-text">.</span>
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Naga Parthiv Varma Varati — built with React,
            Vite, Tailwind &amp; Framer Motion.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ParthivVarati"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-line bg-white/[0.03] p-2.5 text-muted transition hover:border-lime/50 hover:text-lime"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/naga-parthiv/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-line bg-white/[0.03] p-2.5 text-muted transition hover:border-lime/50 hover:text-lime"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={toTop}
              className="ml-1 inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-muted transition hover:border-lime/50 hover:text-text"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
