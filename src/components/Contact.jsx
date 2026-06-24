import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Check, Copy } from "lucide-react";

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
          className="relative overflow-hidden rounded-[1.75rem] border border-ink bg-ink p-8 text-paper sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_85%_-20%,rgba(255,77,46,0.28),transparent_60%),radial-gradient(36rem_22rem_at_-10%_120%,rgba(14,140,127,0.26),transparent_60%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow text-[11px] text-coral">Let&apos;s talk</span>
              <h2 className="display mt-4 text-3xl font-bold leading-tight sm:text-5xl">
                Let&apos;s build something
                <br />
                <span className="text-coral">together.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/70">
                Working on something interesting — APIs, infra, or a product that
                needs an AI brain? I&apos;d love to talk. Internships, short-term
                gigs, or full-time roles are all welcome.
              </p>

              <button
                onClick={copyEmail}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-coraldeep"
              >
                {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            {/* connect card */}
            <div className="rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 backdrop-blur">
              <p className="eyebrow text-[10px] text-paper/50">Connect</p>

              <button
                onClick={copyEmail}
                className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-paper/15 bg-paper/[0.03] px-4 py-3 text-left transition hover:border-coral/60"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-coral" />
                  {EMAIL}
                </span>
                {copied ? (
                  <Check className="h-4 w-4 text-teal" />
                ) : (
                  <Copy className="h-4 w-4 text-paper/50" />
                )}
              </button>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-paper/15 bg-paper/[0.03] px-4 py-3 text-sm transition hover:border-coral/60 hover:text-coral"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>

              <p className="mt-4 text-[11px] text-paper/45">
                Usually quick to respond. Attach repos, designs, or a short brief.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
