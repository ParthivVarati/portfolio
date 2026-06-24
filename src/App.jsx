import { useEffect, useState } from "react";
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
    <div className="relative min-h-screen overflow-x-hidden bg-base text-text">
      {/* ambient neon glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(50rem_34rem_at_82%_-8%,rgba(198,255,61,0.10),transparent_60%),radial-gradient(46rem_32rem_at_-8%_18%,rgba(46,214,255,0.10),transparent_60%),radial-gradient(50rem_40rem_at_50%_120%,rgba(139,92,246,0.10),transparent_60%)]" />
      {/* fine grain */}
      <div className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-overlay" />

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
