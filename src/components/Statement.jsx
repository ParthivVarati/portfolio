import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TEXT =
  "I turn messy AI ideas into systems that ship — RAG agents, vision models, and async pipelines that stay up in production.";
const GREEN = new Set([3, 4]); // highlight "AI ideas"

function Word({ children, range, progress, green }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${green ? "text-green" : ""}`}>
      {children}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"]
  });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
      <p className="display flex flex-wrap text-3xl leading-[1.12] sm:text-5xl lg:text-[3.6rem]">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress} green={GREEN.has(i)}>
              {w}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
