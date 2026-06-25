const ITEMS = [
  ["Python", "language", "PY"],
  ["LangChain", "framework", "RAG"],
  ["PyTorch", "deep-learning", "NN"],
  ["YOLOv8", "vision", "CV"],
  ["Docker", "infra", "OPS"],
  ["React", "frontend", "UI"],
  ["RabbitMQ", "queue", "MSG"],
  ["Hugging Face", "models", "HF"],
  ["LangGraph", "agents", "GRAPH"],
  ["OpenCV", "vision", "IMG"],
  ["Celery", "tasks", "ASYNC"],
  ["SAM 2", "segmentation", "SEG"]
];

function Card({ name, category, tag, i }) {
  const featured = i % 3 === 0;
  return (
    <article
      className={`relative h-52 w-72 shrink-0 p-5 ${
        featured ? "border border-green/40 bg-greentint shadow-glow" : "panel"
      }`}
      style={{ transform: `rotateY(${i % 2 ? -20 : 20}deg)` }}
    >
      {/* terminal title bar */}
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-green" />
        <span className="h-2.5 w-2.5 rounded-full bg-sub/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-sub/50" />
        <span className="mono ml-auto text-[10px] text-sub">~/{category}</span>
      </div>

      <h3 className="display mt-6 text-3xl">{name}</h3>

      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
        <span className="label text-green">[{tag}]</span>
        <span className="mono text-[10px] text-sub">v.stable</span>
      </div>
    </article>
  );
}

export default function TechCarousel() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-line py-16">
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="mono text-sm font-medium text-green">(//)</span>
          <h2 className="display text-3xl sm:text-4xl">The stack, on loop</h2>
        </div>
      </div>

      <div className="group mask-x" style={{ perspective: "1400px" }}>
        <div
          className="flex w-max gap-6 px-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[...ITEMS, ...ITEMS].map(([name, category, tag], i) => (
            <Card key={i} name={name} category={category} tag={tag} i={i % ITEMS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
