/**
 * Central portfolio content.
 * Update metrics, project details, and POCs here.
 * Anything with `placeholder: true` is waiting for a real value — do not invent one.
 */

export const profile = {
  name: "Naga Parthiv",
  shortName: "Parthiv",
  fullName: "Naga Parthiv Varma Varati",
  handle: "parthiv",
  host: "portfolio",
  role: "Software Engineer",
  title: "Software Development Engineer (SDE-1)",
  company: "Vriksha AI",
  location: "Bengaluru, India",
  phone: "+91 7569582770",
  timezone: "Asia/Kolkata",
  focus: [
    "Multi-tenant AI voice platforms",
    "Backend & distributed systems",
    "RAG / LLM workflows",
    "AWS infrastructure",
    "Provider-agnostic voice layers",
    "Product engineering",
  ],
  facts: [
    { label: "Engineer", value: "SDE-1 · Vriksha AI" },
    { label: "Voice platform", value: "Vriksha Voice" },
    { label: "Scale", value: "200k+ calls · 500+ campaigns" },
    { label: "Latency", value: "400 ms median voice response" },
    { label: "Cloud", value: "AWS · Terraform · Docker" },
  ],
  intro:
    "SDE-1 at Vriksha AI building multi-tenant AI voice systems, backend services, and AWS infrastructure — from provider-agnostic voice layers to campaign orchestration at scale.",
  summary: [
    "Core contributor to Vriksha Voice: a multi-tenant AI voice-agent platform (Java, Spring Boot) serving 10+ business customers across 500+ outbound campaigns and 200k+ calls at 400 ms median voice response latency.",
    "I design provider-agnostic voice layers, ROI experimentation with bandits, RAG grounding APIs, billing, and SQS-backed campaign orchestration for 100+ concurrent calls.",
    "Previously an AI Engineer at Nimoy AI — RAG pipelines, LLM orchestration, and production AI applications — before moving into full-stack production systems.",
  ],
  story: [
    "I started with the usual computer science questions — programming, databases, algorithms, software development. I thought I was learning technologies. Mostly, I was learning how many layers a working product hides.",
    "Machine learning led me to NLP, RAG, agents, and voice. Every project answered one question and quietly created the next one.",
    "Production changed the questions again. APIs fail. Queues back up. Latency is felt. Reliability decides whether an intelligent idea becomes useful software. That is how an AI Engineer became an SDE-1 who owns systems end to end.",
  ],
};

export const links = {
  email: "parthivvarati@gmail.com",
  emailHref: "mailto:parthivvarati@gmail.com",
  github: "https://github.com/ParthivVarati",
  linkedin: "https://www.linkedin.com/in/naga-parthiv/",
  leetcode: "https://leetcode.com/u/parthiv_22/",
  website: "https://parthivvarati.me",
  resume:
    "https://drive.google.com/file/d/1N8_VzH1kNRCk4k6jAwDQTbfrVsSsgIVp/view?usp=sharing",
};

export const metrics = {
  clients: {
    id: "clients",
    value: "10+",
    label: "Business customers",
    placeholder: false,
  },
  campaigns: {
    id: "campaigns",
    value: "500+",
    label: "Outbound campaigns",
    placeholder: false,
  },
  calls: {
    id: "calls",
    value: "200k+",
    label: "Calls processed",
    placeholder: false,
  },
  latency: {
    id: "latency",
    value: "400 ms",
    label: "Median voice latency",
    placeholder: false,
  },
  concurrent: {
    id: "concurrent",
    value: "100+",
    label: "Concurrent calls",
    placeholder: false,
  },
  integrations: {
    id: "integrations",
    value: "Multi-provider",
    label: "STT / TTS / telephony",
    placeholder: false,
  },
};

export const bootModules = [
  { id: "java", label: "JAVA" },
  { id: "spring", label: "SPRING BOOT" },
  { id: "python", label: "PYTHON" },
  { id: "aws", label: "AWS" },
  { id: "terraform", label: "TERRAFORM" },
  { id: "voice", label: "AI / VOICE" },
  { id: "rag", label: "RAG / LLM" },
];

export const experience = [
  {
    id: "vriksha",
    company: "Vriksha AI",
    role: "Software Development Engineer (SDE-1)",
    location: "Bengaluru, India",
    period: "Apr 2026 — Present",
    joined: "2026-04-01",
    current: true,
    summary:
      "Core contributor to Vriksha Voice — a multi-tenant AI voice-agent platform (Java, Spring Boot) serving 10+ business customers across 500+ outbound campaigns and 200k+ calls at 400 ms median voice response latency.",
    points: [
      "Designed a provider-agnostic voice layer that places multiple STT, TTS, and telephony vendors and the in-house Signal Box voice engine behind one interface, reducing provider-specific coupling and simplifying new-provider integration.",
      "Built an ROI experimentation engine that A/B tests call scripts per contact using Thompson Sampling multi-armed bandits with a revenue-first verdict model.",
      "Shipped an embedding-based RAG knowledge-base API for agent grounding, LLM call-intent classification, campaign analytics, Razorpay payments, a rule-based pricing and billing engine, and SQS-backed scalable campaign orchestration sustaining 100+ concurrent calls.",
      "Designed, deployed, and maintained AWS infrastructure using ECS, EC2, DynamoDB, ElastiCache, PostgreSQL, SQS, VPC, Load Balancing, Docker, and Terraform, with automated deployments through GitHub Actions.",
      "Built MyRush x District by Zomato, a sports booking engine; migrated Python to Java/Spring Boot.",
    ],
    domains: [
      "AI voice platforms",
      "Multi-tenant backend",
      "RAG / LLMs",
      "AWS",
      "Terraform",
      "Payments",
      "Experimentation",
      "Campaign orchestration",
    ],
    metricIds: ["clients", "campaigns", "calls", "latency", "concurrent"],
    skills: [
      "Java",
      "Spring Boot",
      "AWS",
      "Terraform",
      "Docker",
      "PostgreSQL",
      "DynamoDB",
      "SQS",
      "Razorpay",
      "RAG",
      "STT",
      "TTS",
    ],
  },
  {
    id: "nimoy",
    company: "Nimoy AI",
    role: "AI Engineer",
    location: "Gurgaon, India",
    period: "Sep 2025 — Mar 2026",
    current: false,
    summary:
      "Developed AI-powered applications across machine learning, NLP, backend systems, and LLM workflows for production use.",
    points: [
      "Implemented retrieval-augmented generation (RAG) pipelines, LLM orchestration, API integrations, and automation workflows for production applications.",
      "Worked across machine learning, natural language processing (NLP), backend systems, and end-to-end LLM workflows.",
    ],
    domains: ["RAG", "LLM orchestration", "NLP", "Backend"],
    metricIds: [],
    skills: [
      "Python",
      "RAG",
      "LLMs",
      "NLP",
      "LangChain",
      "LangGraph",
      "API integrations",
    ],
  },
];

export const projects = [
  {
    id: "vriksha-voice",
    slug: "vriksha-voice",
    featured: true,
    title: "Vriksha Voice",
    kind: "AI voice platform",
    period: "2026",
    company: "Vriksha AI",
    status: "Production",
    role: "Core contributor · end-to-end",
    href: null,
    cta: null,
    summary:
      "Multi-tenant AI voice-agent platform (Java, Spring Boot) serving 10+ business customers across 500+ outbound campaigns and 200k+ calls at 400 ms median voice response latency.",
    capabilities: [
      "Multi-tenant voice agents",
      "Outbound campaigns",
      "RAG knowledge grounding",
      "ROI / bandit experimentation",
      "Intent classification",
      "Billing & Razorpay",
      "SQS campaign orchestration",
      "100+ concurrent calls",
    ],
    highlights: [
      "Provider-agnostic STT / TTS / telephony + Signal Box voice layer",
      "Thompson Sampling multi-armed bandits for script ROI",
      "Embedding-based RAG knowledge-base API",
      "AWS ECS, DynamoDB, ElastiCache, PostgreSQL, SQS, Terraform, GitHub Actions",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "AWS",
      "Terraform",
      "Docker",
      "PostgreSQL",
      "SQS",
      "Razorpay",
      "RAG",
      "STT",
      "TTS",
      "LLM",
    ],
    metricIds: ["clients", "campaigns", "calls", "latency", "concurrent"],
    architectureId: "vriksha-voice",
  },
  {
    id: "agentic-hiring",
    slug: "agentic-hiring",
    featured: true,
    title: "Agentic Hiring and Assessment Platform",
    kind: "AI agents · hiring",
    period: "2025",
    company: "Personal",
    status: "Built",
    role: "End-to-end",
    href: null,
    cta: null,
    summary:
      "End-to-end AI-powered hiring platform that processes candidate emails and resumes, validates job openings through knowledge bases, and evaluates candidates using AI agents.",
    capabilities: [
      "Email + resume intake",
      "Knowledge-base job validation",
      "AI candidate screening & scoring",
      "Email-driven approval workflow",
      "Time-limited online assessments",
      "AI-generated tests",
      "AI live proctoring",
      "Post-assessment hiring verdicts",
    ],
    highlights: [
      "Automated candidate screening with contextual recommendations for hiring managers",
      "Hiring-manager approval triggers assessment + candidate notifications",
      "AI-based live proctoring with post-assessment verdicts",
    ],
    stack: ["Python", "FastAPI", "AI Agents", "RAG"],
    metricIds: [],
    architectureId: null,
  },
  {
    id: "clipztr",
    slug: "clipztr",
    featured: true,
    title: "Clipztr — AI Video Repurposing Platform",
    kind: "AI video",
    period: "2025 — Present",
    company: "Personal",
    status: "In progress",
    role: "Builder",
    href: null,
    cta: null,
    summary:
      "Python-based AI video platform for automated clip discovery, hook generation, captions, B-roll, music, and reusable dynamic and static video templates.",
    capabilities: [
      "Short-form clip discovery from long-form video",
      "Hook generation",
      "Captions",
      "B-roll & music selection",
      "Dynamic / static templates",
      "User customization before publish",
    ],
    highlights: [
      "AI identifies relevant short-form clips and applies predefined editing workflows",
      "Configurable templates for B-roll, music, captions, and editing actions",
    ],
    stack: ["Python", "AI", "Video"],
    metricIds: [],
    architectureId: null,
  },
  {
    id: "signal-box",
    slug: "signal-box",
    featured: true,
    title: "Signal Box",
    kind: "Voice engine / platform layer",
    period: "2026",
    company: "Vriksha AI",
    status: "Production",
    role: "Voice infrastructure",
    href: null,
    cta: null,
    summary:
      "In-house voice engine behind Vriksha’s provider-agnostic voice layer — STT, TTS, and telephony sit behind one interface for reusable, vendor-independent orchestration.",
    capabilities: [
      "STT / LLM / TTS pipeline",
      "Provider abstraction",
      "Agent creation",
      "Campaign execution",
      "Telephony integrations",
    ],
    highlights: [
      "Reduces provider-specific coupling",
      "Simplifies new-provider integration",
      "Shared conversation pipeline across vendors",
    ],
    stack: ["STT", "LLM", "TTS", "Telephony", "Java"],
    metricIds: [],
    architectureId: "signal-box",
  },
  {
    id: "myrush",
    slug: "myrush",
    featured: true,
    title: "MyRush x District by Zomato",
    kind: "Sports booking engine",
    period: "2026",
    company: "Vriksha AI · District by Zomato",
    status: "Production",
    role: "Booking engine",
    href: null,
    cta: null,
    summary:
      "Sports booking engine built for a District by Zomato partnership; migrated services from Python to Java/Spring Boot.",
    capabilities: [
      "Booking engine",
      "Client integrations",
      "Payments",
      "Python → Java/Spring Boot migration",
    ],
    highlights: [
      "Shipped for District by Zomato partnership",
      "Migrated Python services to Java/Spring Boot",
    ],
    stack: ["Java", "Spring Boot", "Python", "Razorpay"],
    metricIds: ["integrations"],
    architectureId: "myrush",
  },
  {
    id: "companion",
    slug: "emotional-companion",
    featured: false,
    title: "Emotional Companion",
    kind: "Conversational AI",
    period: "2025",
    company: "Personal",
    status: "Live",
    role: "Product engineering",
    href: "https://myfeelingsbuddy.netlify.app/",
    cta: "Open live project",
    summary:
      "Two AI roles share one conversation: one makes room for the feeling, the other helps find a practical next step.",
    capabilities: [],
    highlights: [
      "Shared conversation context across two companion roles",
      "LangChain + Gemini wired into a usable React product",
    ],
    stack: ["Python", "LangChain", "Gemini", "React"],
    metricIds: [],
    architectureId: null,
  },
  {
    id: "forecast",
    slug: "electricity-forecast",
    featured: false,
    title: "Electricity Forecast",
    kind: "Machine learning",
    period: "2025",
    company: "Personal",
    status: "Repository",
    role: "ML and full-stack",
    href: "https://github.com/ParthivVarati/Electricity-Forecast",
    cta: "View repository",
    summary:
      "A forecasting workflow on Victoria energy data that compares four model families and serves the result through a usable API.",
    capabilities: [],
    highlights: [
      "Compared Random Forest, CatBoost, HistGradientBoosting, and MultiOutputRegressor with K-fold CV",
      "Flask API + React surface for the selected forecast",
    ],
    stack: ["Python", "CatBoost", "Flask", "React"],
    metricIds: [],
    architectureId: null,
  },
  {
    id: "snaptrip",
    slug: "snaptrip",
    featured: false,
    title: "SnapTrip",
    kind: "Computer vision",
    period: "2024",
    company: "Personal",
    status: "Repository",
    role: "Full-stack and vision",
    href: "https://github.com/ParthivVarati/SNAPTRIP",
    cta: "View repository",
    summary:
      "A visual travel search that turns an uploaded image into a location match through OpenCV-based image recognition.",
    capabilities: [],
    highlights: [
      "Secure uploads and real-time form validation",
      "NumPy + Chi-squared visual comparison to improve match quality",
    ],
    stack: ["Python", "OpenCV", "Flask", "JavaScript"],
    metricIds: [],
    architectureId: null,
  },
  {
    id: "freelancer",
    slug: "freelancer",
    featured: false,
    title: "Freelancer",
    kind: "Full-stack marketplace",
    period: "2024",
    company: "Personal",
    status: "Repository",
    role: "Full-stack",
    href: "https://github.com/ParthivVarati/FREELANCER",
    cta: "View repository",
    summary:
      "A responsive marketplace for posting work, finding professionals, and managing opportunities in one place.",
    capabilities: [],
    highlights: ["Job posting, applications, and opportunity management"],
    stack: ["Python", "SQL", "React", "Flask"],
    metricIds: [],
    architectureId: null,
  },
];

export const architectures = {
  "vriksha-voice": {
    id: "vriksha-voice",
    title: "Vriksha Voice",
    kind: "flow",
    intro:
      "From a campaign in the product to a live call, then back to transcript, intent, recording, and analytics.",
    stages: [
      {
        id: "user",
        label: "User",
        note: "Creates agents, campaigns, knowledge, and contact lists.",
      },
      {
        id: "product",
        label: "Vriksha Voice",
        note: "Product surface for agents, campaigns, billing, and performance.",
      },
      {
        id: "campaign",
        label: "Campaign Engine",
        note: "Concurrent outbound execution, ROI-oriented campaign logic.",
      },
      {
        id: "agent",
        label: "Agent",
        note: "Voice agent with attached knowledge base.",
      },
      {
        id: "providers",
        label: "Provider Abstraction",
        note: "One integration surface for multiple voice providers.",
        branches: [
          { id: "ringg", label: "Ringg" },
          { id: "eleven", label: "ElevenLabs" },
          { id: "signal", label: "Signal Box" },
        ],
      },
      {
        id: "telephony",
        label: "Telephony / Voice",
        note: "Call execution against the selected provider.",
      },
      {
        id: "pipeline",
        label: "Conversation pipeline",
        note: "Speech in, reasoning, speech out.",
        branches: [
          { id: "stt", label: "STT" },
          { id: "llm", label: "LLM" },
          { id: "tts", label: "TTS" },
        ],
      },
      {
        id: "outputs",
        label: "Post-call intelligence",
        note: "What the system keeps after the call ends.",
        branches: [
          { id: "transcript", label: "Transcript" },
          { id: "intent", label: "Intent" },
          { id: "recording", label: "Recording" },
          { id: "analytics", label: "Analytics" },
        ],
      },
    ],
  },
  "signal-box": {
    id: "signal-box",
    title: "Signal Box",
    kind: "flow",
    intro:
      "A reusable voice-engine layer: agents and campaigns go in, a provider-independent pipeline talks to telephony.",
    stages: [
      {
        id: "entry",
        label: "Agent / Campaign",
        note: "Upstream products ask Signal Box to run voice work.",
      },
      {
        id: "engine",
        label: "Signal Box",
        note: "Orchestrates agents, campaigns, and the voice pipeline.",
      },
      {
        id: "pipeline",
        label: "STT → LLM → TTS",
        note: "Shared conversation pipeline, not bound to one vendor.",
        branches: [
          { id: "stt", label: "STT" },
          { id: "llm", label: "LLM" },
          { id: "tts", label: "TTS" },
        ],
      },
      {
        id: "providers",
        label: "Provider Abstraction",
        note: "Swap or add providers without rewriting agent logic.",
      },
      {
        id: "telephony",
        label: "Telephony",
        note: "Provider-backed call execution.",
      },
    ],
  },
  myrush: {
    id: "myrush",
    title: "MyRush",
    kind: "hub",
    intro:
      "The booking engine stays stable. New external clients attach through an adaptive integration layer.",
    center: {
      id: "engine",
      label: "MyRush Booking",
      note: "Core booking flows, payments, and product UX.",
    },
    spokes: [
      {
        id: "district",
        label: "District",
        note: "Client partnership involving District by Zomato.",
      },
      {
        id: "plevo",
        label: "Plevo",
        note: "External client on the adaptive integration engine.",
      },
      {
        id: "huddle",
        label: "Huddle",
        note: "External client on the adaptive integration engine.",
      },
      {
        id: "future",
        label: "Future clients",
        note: "New integrations onboard without rebuilding the booking core.",
      },
    ],
  },
};

export const infrastructure = {
  summary:
    "Designed, deployed, and maintained AWS infrastructure for Vriksha Voice and related products — ECS, EC2, DynamoDB, ElastiCache, PostgreSQL, SQS, VPC, load balancing, Docker, and Terraform, with GitHub Actions CI/CD.",
  technologies: [
    { group: "Compute", items: ["AWS ECS", "EC2", "Docker"] },
    { group: "Data", items: ["PostgreSQL", "DynamoDB", "ElastiCache", "Redis", "MongoDB"] },
    { group: "Messaging", items: ["SQS"] },
    { group: "Network", items: ["VPC", "Load Balancing"] },
    { group: "Delivery", items: ["Terraform", "GitHub Actions", "CI/CD"] },
  ],
  products: ["Vriksha Voice", "Signal Box", "MyRush x District"],
};

export const pocs = [
  {
    id: "poc-template",
    title: "POC case studies",
    status: "Awaiting detail",
    placeholder: true,
    problem: "Ambiguous technical questions that do not start as tickets.",
    investigation: "Read the system, constrain the unknown, pick a thin slice.",
    prototype: "A working path — enough to decide, not enough to overbuild.",
    solution: "A recommendation the product can ship, or a clear no.",
  },
];

export const productEngineering = {
  summary:
    "Not a formal product-designer role. Part of the engineering job is deciding what should exist, whether it is feasible, and how it should feel once it is real.",
  contributions: [
    {
      title: "Product architecture",
      note: "How a feature sits in the system before it is implemented.",
    },
    {
      title: "UX improvements",
      note: "Booking flows, layouts, and product surfaces that people actually use.",
    },
    {
      title: "Feature design",
      note: "Shaping the feature with the constraint of what the system can honestly do.",
    },
    {
      title: "Technical feasibility",
      note: "A yes, a no, or a narrower path — before a sprint is wasted.",
    },
    {
      title: "POCs",
      note: "Proving an approach on an ambiguous problem.",
    },
    {
      title: "System design",
      note: "The seams: providers, clients, campaigns, payments, infra.",
    },
    {
      title: "Cross-product problem solving",
      note: "The same infrastructure and judgement applied across company products.",
    },
  ],
};

export const skillGroups = [
  {
    label: "Software Development",
    items: [
      "Java",
      "Python",
      "JavaScript",
      "SQL",
      "Full-Stack Development",
      "REST APIs",
    ],
  },
  {
    label: "Computer Science",
    items: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "System Design",
      "Distributed Systems",
    ],
  },
  {
    label: "Backend and Data Storage",
    items: [
      "Spring Boot",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "DynamoDB",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "Artificial Intelligence",
      "NLP",
      "LLMs",
      "RAG",
      "Information Retrieval",
      "AI Agents",
      "LangChain",
      "LangGraph",
      "STT",
      "TTS",
    ],
  },
  {
    label: "Cloud, Networking, DevOps",
    items: [
      "AWS (ECS, EC2, VPC, SQS, Load Balancing)",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Razorpay APIs"],
  },
];

export const education = [
  {
    institute: "GITAM University",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2021 — 2025",
    score: "CGPA: 8.57",
  },
];

export const certifications = [
  { name: "Python for Everybody", org: "Coursera", year: "2023" },
  { name: "Backend Development with Node.js", org: "Udemy", year: "2023" },
  { name: "Docker & Kubernetes Fundamentals", org: "KodeKloud", year: "2024" },
  { name: "SQL (Advanced)", org: "HackerRank", year: "2024" },
];

export const commands = [
  { id: "about", usage: "about", hint: "Engineering profile" },
  { id: "experience", usage: "experience", hint: "Roles and timeline" },
  { id: "projects", usage: "projects [slug]", hint: "Featured systems" },
  { id: "systems", usage: "systems", hint: "Infrastructure overview" },
  { id: "architecture", usage: "architecture [system]", hint: "System diagrams" },
  { id: "pocs", usage: "pocs", hint: "Problem → solution work" },
  { id: "product", usage: "product", hint: "Product engineering" },
  { id: "skills", usage: "skills", hint: "Stack listing" },
  { id: "contact", usage: "contact", hint: "Email, GitHub, LinkedIn" },
  { id: "resume", usage: "resume", hint: "Open résumé" },
  { id: "help", usage: "help", hint: "Available commands" },
  { id: "clear", usage: "clear", hint: "Clear terminal" },
  { id: "home", usage: "home", hint: "System overview" },
];

export const aliases = {
  infrastructure: "systems",
  infra: "systems",
  system: "systems",
  exp: "experience",
  work: "experience",
  project: "projects",
  open: "projects",
  stack: "skills",
  ls: "help",
  whoami: "about",
  mail: "contact",
  github: "contact",
  linkedin: "contact",
  arch: "architecture",
  poc: "pocs",
};

export const STORAGE_KEYS = {
  boot: "parthiv.system.boot.v1",
};
