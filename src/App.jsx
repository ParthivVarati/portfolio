import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import MatrixRain from "./components/MatrixRain";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import Capabilities from "./components/Capabilities";
import TechCarousel from "./components/TechCarousel";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const SECTION_IDS = ["home", "experience", "projects", "skills", "education", "contact"];

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
    <div className="relative min-h-screen text-ink">
      {/* tech code-rain behind everything */}
      <MatrixRain />
      {/* CRT scanline overlay on top */}
      <div className="scanlines pointer-events-none fixed inset-0 z-[100]" />

      <Navbar activeSection={activeSection} />

      <div className="relative z-10">
        <main>
          <Hero />
          <Statement />
          <Capabilities />
          <TechCarousel />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
