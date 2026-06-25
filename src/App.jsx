import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import SideRail from "./components/SideRail";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact"
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // result.dev-style smooth momentum scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id;
          if (SECTION_IDS.includes(id)) setActiveSection(id);
        }
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      {/* Soft warm wash anchored to the corners, very subtle */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_-10%,rgba(255,77,46,0.10),transparent_60%),radial-gradient(50rem_36rem_at_-10%_110%,rgba(14,140,127,0.10),transparent_60%)]" />
      {/* fine paper grain */}
      <div className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-multiply" />

      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      <SideRail activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
