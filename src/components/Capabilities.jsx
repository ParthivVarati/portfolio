import { motion } from "framer-motion";

const ITEMS = [
  ["AI Agents", "Autonomous RAG + LangChain agents with long-term Letta memory."],
  ["Computer Vision", "Detection & segmentation with YOLOv8/11n and SAM 2."],
  ["Data Pipelines", "Async processing with RabbitMQ & Celery — 1k+ jobs/day."],
  ["LLM Integration", "OpenAI, LLaMA and Hugging Face wired straight into products."],
  ["Backend & APIs", "Flask / REST services, containerised and shipped with Docker."],
  ["Retrieval (RAG)", "Grounded, low-hallucination knowledge systems over your data."],
  ["ML Modelling", "Forecasting & classification with rigorous K-fold evaluation."],
  ["Frontend", "React + Tailwind interfaces that stay fast and clean."]
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-12 border-t border-ink pt-5">
        <div className="flex items-baseline gap-4">
          <span className="mono text-sm font-medium text-green">(01)</span>
          <h2 className="display text-4xl sm:text-5xl">What I do</h2>
        </div>
      </div>

      <div>
        {ITEMS.map(([name, desc], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.2, 0, 0, 1] }}
            className="group grid grid-cols-[40px_1fr] items-start gap-4 border-b border-line py-6 transition-colors first:border-t hover:bg-paper sm:grid-cols-[64px_280px_1fr] sm:items-center sm:gap-8 sm:py-7"
          >
            <span className="mono pt-1 text-sm text-sub transition-colors group-hover:text-green sm:pt-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl font-bold tracking-tightest transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.7rem]">
              {name}
            </h3>
            <p className="col-start-2 max-w-xl text-[15px] leading-relaxed text-sub sm:col-start-3">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
