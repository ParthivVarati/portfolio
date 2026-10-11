import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  certifications,
  education,
  experience,
  infrastructure,
  links,
  pocs,
  productEngineering,
  profile,
  projects,
  skillGroups,
} from "../../data/portfolio";
import Architecture from "./Architecture";
import MetricGrid from "./MetricGrid";

function Fade({ children, id }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Heading({ kicker, title, lede }) {
  return (
    <header>
      <p className="sys-kicker">{kicker}</p>
      <h1 className="sys-title">{title}</h1>
      {lede && <p className="sys-lede">{lede}</p>}
    </header>
  );
}

export function HomeView({ onOpen }) {
  const featured = projects.filter((item) => item.featured);

  return (
    <Fade id="home">
      <Heading
        kicker={`${profile.shortName.toUpperCase()} SYSTEM`}
        title={`${profile.role}. Production systems.`}
        lede={profile.intro}
      />
      <div className="sys-home-status">
        <article>
          <span className="sys-kicker-soft">ROLE</span>
          <b>{profile.title} · {profile.company}</b>
        </article>
        <article>
          <span className="sys-kicker-soft">LOCATION</span>
          <b>{profile.location}</b>
        </article>
        <article>
          <span className="sys-kicker-soft">STATUS</span>
          <b>Systems online</b>
        </article>
      </div>
      <section className="sys-section">
        <p className="sys-kicker">FOCUS</p>
        <div className="sys-tags" style={{ marginTop: 12 }}>
          {profile.focus.map((item) => <span className="sys-tag" key={item}>{item}</span>)}
        </div>
      </section>
      <section className="sys-section">
        <p className="sys-kicker">FEATURED SYSTEMS</p>
        <div className="sys-project-list" style={{ marginTop: 14 }}>
          {featured.map((project, index) => (
            <button
              type="button"
              className="sys-project"
              key={project.id}
              onClick={() => onOpen("projects", project.slug)}
            >
              <small>0{index + 1}</small>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <small>{project.kind}</small>
            </button>
          ))}
        </div>
      </section>
    </Fade>
  );
}

export function AboutView() {
  return (
    <Fade id="about">
      <Heading kicker="ABOUT" title={profile.name} lede={profile.intro} />
      <div className="sys-grid facts sys-section">
        {profile.facts.map((item) => (
          <article className="sys-fact" key={item.label}>
            <span>{item.label.toUpperCase()}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <div className="sys-grid split sys-section">
        <div className="sys-copy">
          {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div>
          <article className="sys-card">
            <span>EDUCATION</span>
            {education.map((item) => (
              <div key={item.institute} style={{ marginTop: 14 }}>
                <strong>{item.degree}</strong>
                <p className="sys-copy" style={{ marginTop: 4 }}>
                  {item.institute} · {item.period} · {item.score}
                </p>
              </div>
            ))}
          </article>
        </div>
      </div>
    </Fade>
  );
}

export function ExperienceView() {
  return (
    <Fade id="experience">
      <Heading
        kicker="EXPERIENCE"
        title="The work is across the system."
        lede="Current role first. Titles changed; the instinct did not: own the path from idea to production."
      />
      <div className="sys-timeline sys-section">
        {experience.map((role) => (
          <article className="sys-role" key={role.id}>
            <time dateTime={role.joined || undefined}>
              {role.period}
              {role.current && <div style={{ marginTop: 8, color: "var(--green)" }}>CURRENT</div>}
            </time>
            <div>
              <h3>{role.role} <strong>@ {role.company}</strong></h3>
              <p style={{ margin: "8px 0 0" }}>{role.location}</p>
              <p style={{ marginTop: 12 }}>{role.summary}</p>
              <ul>
                {role.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="sys-tags">
                {role.domains.map((item) => <span className="sys-tag" key={item}>{item}</span>)}
              </div>
              {role.metricIds.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <MetricGrid ids={role.metricIds} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Fade>
  );
}

function CaseStudy({ project }) {
  return (
    <article className="sys-case">
      <p className="sys-kicker">{project.kind.toUpperCase()} · {project.period}</p>
      <h2 className="sys-title" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>{project.title}</h2>
      <p className="sys-lede">{project.summary}</p>
      <p className="sys-copy" style={{ marginTop: 12 }}>{project.role} · {project.company}</p>
      {project.highlights.length > 0 && (
        <div className="sys-highlights">
          {project.highlights.map((item) => <span key={item}>{item}</span>)}
        </div>
      )}
      {project.capabilities.length > 0 && (
        <div className="sys-section">
          <p className="sys-kicker">CAPABILITIES</p>
          <div className="sys-highlights">
            {project.capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      )}
      {project.metricIds.length > 0 && (
        <div className="sys-section">
          <MetricGrid ids={project.metricIds} />
        </div>
      )}
      <div className="sys-tags" style={{ marginTop: 18 }}>
        {project.stack.map((item) => <span className="sys-tag" key={item}>{item}</span>)}
      </div>
      {project.href && (
        <p style={{ marginTop: 20 }}>
          <a className="sys-link" href={project.href} target="_blank" rel="noreferrer">
            {project.cta || "Open"}
          </a>
        </p>
      )}
      {project.architectureId && <Architecture id={project.architectureId} />}
    </article>
  );
}

export function ProjectsView({ selected, onSelect }) {
  const featured = projects.filter((item) => item.featured);
  const archive = projects.filter((item) => !item.featured);
  const open = selected || featured[0];

  return (
    <Fade id="projects">
      <Heading
        kicker="PROJECTS"
        title="Systems I have owned."
        lede="Featured work is production software. Earlier projects stay here because the path still matters."
      />
      <div className="sys-project-list sys-section">
        {featured.map((project, index) => (
          <button
            type="button"
            key={project.id}
            className={`sys-project ${open?.id === project.id ? "is-open" : ""}`}
            onClick={() => onSelect(project.slug)}
          >
            <small>0{index + 1}</small>
            <div>
              <h3>{project.title}</h3>
              <p>{project.kind} · {project.status}</p>
            </div>
            <small>{project.period}</small>
          </button>
        ))}
      </div>
      {open && <CaseStudy project={open} />}
      <section className="sys-section">
        <p className="sys-kicker">ALSO BUILT</p>
        <div className="sys-project-list" style={{ marginTop: 14 }}>
          {archive.map((project) => (
            <a
              key={project.id}
              className="sys-project"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <small>{project.period}</small>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <small>{project.cta}</small>
            </a>
          ))}
        </div>
      </section>
    </Fade>
  );
}

export function SystemsView() {
  return (
    <Fade id="systems">
      <Heading
        kicker="SYSTEMS / INFRASTRUCTURE"
        title="Cloud and delivery across products."
        lede={infrastructure.summary}
      />
      <div className="sys-grid cards sys-section">
        {infrastructure.technologies.map((group) => (
          <article className="sys-card" key={group.group}>
            <span>{group.group.toUpperCase()}</span>
            <div className="sys-skill-rows" style={{ marginTop: 12 }}>
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
      <section className="sys-section">
        <p className="sys-kicker">PRODUCTS ON THIS INFRASTRUCTURE</p>
        <div className="sys-tags" style={{ marginTop: 14 }}>
          {infrastructure.products.map((item) => <span className="sys-tag" key={item}>{item}</span>)}
          <span className="sys-tag">and others</span>
        </div>
      </section>
    </Fade>
  );
}

export function ArchitectureView({ selected, onSelect }) {
  const featured = projects.filter((item) => item.architectureId);
  const current = featured.find((item) => item.slug === selected || item.id === selected) || featured[0];

  return (
    <Fade id="architecture">
      <Heading
        kicker="ARCHITECTURE"
        title="How the systems connect."
        lede="Interactive diagrams for systems I can describe honestly. Click a node."
      />
      <div className="sys-project-list sys-section">
        {featured.map((project) => (
          <button
            type="button"
            key={project.id}
            className={`sys-project ${current?.id === project.id ? "is-open" : ""}`}
            onClick={() => onSelect(project.slug)}
          >
            <small>SYS</small>
            <div>
              <h3>{project.title}</h3>
              <p>{project.kind}</p>
            </div>
          </button>
        ))}
      </div>
      {current && <Architecture key={current.architectureId} id={current.architectureId} />}
    </Fade>
  );
}

export function PocsView() {
  return (
    <Fade id="pocs">
      <Heading
        kicker="POCS"
        title="Ambiguous problems, thin prototypes."
        lede="A recurring part of the job: take a fuzzy technical question, investigate it, and return with something the company can use. Specific case studies will be added here."
      />
      {pocs.map((item) => (
        <article className="sys-section" key={item.id}>
          <div className="sys-card">
            <span>{item.placeholder ? "TEMPLATE · REPLACE WITH A REAL POC" : item.status}</span>
            <strong style={{ fontSize: 20 }}>{item.title}</strong>
          </div>
          <div className="sys-poc">
            {[
              ["PROBLEM", item.problem],
              ["INVESTIGATION", item.investigation],
              ["PROTOTYPE", item.prototype],
              ["SOLUTION", item.solution],
            ].map(([label, copy]) => (
              <article key={label}>
                <span className="sys-kicker-soft">{label}</span>
                <h3>{label === "PROBLEM" ? "01" : label === "INVESTIGATION" ? "02" : label === "PROTOTYPE" ? "03" : "04"}</h3>
                <p className="sys-copy">{copy}</p>
              </article>
            ))}
          </div>
        </article>
      ))}
    </Fade>
  );
}

export function ProductView() {
  return (
    <Fade id="product">
      <Heading
        kicker="PRODUCT ENGINEERING"
        title="Not only implementation."
        lede={productEngineering.summary}
      />
      <div className="sys-grid cards sys-section">
        {productEngineering.contributions.map((item) => (
          <article className="sys-card" key={item.title}>
            <span>CONTRIBUTION</span>
            <strong>{item.title}</strong>
            <p className="sys-copy" style={{ marginTop: 10 }}>{item.note}</p>
          </article>
        ))}
      </div>
    </Fade>
  );
}

export function SkillsView() {
  return (
    <Fade id="skills">
      <Heading
        kicker="$ stack --list"
        title="The stack, as output."
        lede="Technologies I have actually used in work or shipped projects. No percentage bars."
      />
      {skillGroups.map((group) => (
        <section className="sys-skill-block" key={group.label}>
          <h3>{group.label.toUpperCase()}</h3>
          <div className="sys-skill-rows">
            {group.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      ))}
      <section className="sys-section">
        <p className="sys-kicker">CERTIFICATIONS</p>
        <div className="sys-grid cards" style={{ marginTop: 14 }}>
          {certifications.map((item) => (
            <article className="sys-card" key={item.name}>
              <span>{item.year}</span>
              <strong>{item.name}</strong>
              <p className="sys-copy" style={{ marginTop: 8 }}>{item.org}</p>
            </article>
          ))}
        </div>
      </section>
    </Fade>
  );
}

export function ContactView({ onCopy, copied }) {
  return (
    <Fade id="contact">
      <Heading
        kicker="CONTACT"
        title="A simple path to reach me."
        lede="Email is the fastest. Résumé, GitHub, and LinkedIn stay available from every screen."
      />
      <div className="sys-contact-row">
        <button type="button" onClick={onCopy}>
          <span>EMAIL</span>
          <strong>{copied ? "Copied" : links.email}</strong>
        </button>
        <a href={links.github} target="_blank" rel="noreferrer">
          <span>GITHUB</span>
          <strong>ParthivVarati</strong>
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          <span>LINKEDIN</span>
          <strong>naga-parthiv</strong>
        </a>
        <a href={links.resume} target="_blank" rel="noreferrer">
          <span>RESUME</span>
          <strong>Open PDF</strong>
        </a>
      </div>
    </Fade>
  );
}

export function HelpView({ onRun }) {
  return (
    <Fade id="help">
      <Heading
        kicker="HELP"
        title="The terminal is navigation."
        lede="Type a command, press Tab to complete, or click anything in the explorer. On a phone, use the chips."
      />
      <div className="sys-grid cards sys-section">
        {[
          ["about", "Who I am and how I work"],
          ["experience", "vriksha.ai, nimoy.ai, internship"],
          ["projects", "Voice, booking, earlier work"],
          ["systems", "AWS, Terraform, company products"],
          ["architecture", "Interactive diagrams"],
          ["pocs", "Problem → solution template"],
          ["skills", "stack --list"],
          ["contact", "Email / GitHub / LinkedIn"],
        ].map(([cmd, hint]) => (
          <button type="button" className="sys-card" key={cmd} onClick={() => onRun(cmd)} style={{ textAlign: "left" }}>
            <span>&gt; {cmd}</span>
            <strong>{hint}</strong>
          </button>
        ))}
      </div>
    </Fade>
  );
}
