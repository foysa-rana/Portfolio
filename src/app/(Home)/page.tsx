/* eslint-disable react/no-unescaped-entities */
import Hero from "@/components/client/ui/Hero";
import AboutMe from "@/components/client/ui/AboutMe";
import Skills from "@/components/client/ui/Skills";
import Contact from "@/components/client/ui/Contact";
import Projects from "@/components/client/ui/Projects";
import Education from "@/components/client/ui/Education";
import ProjectDetails from "@/components/client/ui/ProjectDetails";

export default function Home() {
  return (
    <main>
      <ProjectDetails />
      <Hero />
      <AboutMe />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
