import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Check } from "lucide-react";

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
    <section id="contact" className="border-t border-line">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-40"
      >
        <span className="label text-green">( Your turn )</span>
        <h2 className="display mt-7 text-[12vw] leading-[0.95] sm:text-7xl lg:text-8xl">
          Let&apos;s build
          <br />
          <span className="text-green">something.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-sub">
          Got something interesting — APIs, infra, or a product that needs an AI
          brain? Internships, contracts, and full-time roles all welcome.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button onClick={copyEmail} className="btn-green !px-7 !py-4 text-base">
            {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            {copied ? "Copied to clipboard!" : EMAIL}
          </button>

          <div className="flex items-center gap-2">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="link mono inline-flex items-center gap-2 px-3 py-2 text-sm text-sub hover:text-ink"
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
