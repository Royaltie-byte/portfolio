import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import FounderJourney from "@/components/sections/FounderJourney/FounderJourney";
import Projects from "@/components/sections/Projects/Projects";
import Skills from "@/components/sections/Skills/Skills";
import CurrentlyLearning from "@/components/sections/CurrentlyLearning/CurrentlyLearning";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FounderJourney />
      <Projects />
      <Skills />
      <CurrentlyLearning />
      <Contact />
    </main>
  );
}