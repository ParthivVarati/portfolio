import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "parthivvarati@gmail.com";

const LINKS = [
  { label: "GitHub", href: "https://github.com/ParthivVarati", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naga-parthiv/", icon: Linkedin }
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="glass relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_80%_-20%,rgba(198,255,61,0.16),transparent_60%),radial-gradient(36rem_22rem_at_-10%_120%,rgba(46,214,255,0.16),transparent_60%)]" />

          <div className="relative">
            <span className="eyebrow text-[11px] text-lime">// let&apos;s_talk</span>
            <h2 className="headline mx-auto mt-6 max-w-3xl text-[12vw] leading-[0.9] sm:text-7xl lg:text-8xl">
              Let&apos;s build
              <br />
              something <span className="text-lime glow-text">together</span>.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Working on something interesting — APIs, infra, or a product that needs
              an AI brain? Internships, short-term gigs, or full-time roles are all
              welcome.
            </p>

            <button
              onClick={copyEmail}
              className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] py-3 pl-6 pr-3 text-base font-medium backdrop-blur transition hover:border-lime/50"
            >
              <span className="font-mono text-sm sm:text-base">{EMAIL}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-base shadow-glow-lime transition group-hover:scale-105">
                {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              </span>
            </button>

            <div className="mt-8 flex items-center justify-center gap-3">
              {LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm transition hover:border-lime/50 hover:text-lime"
                >
                  <Icon className="h-4 w-4" /> {label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
