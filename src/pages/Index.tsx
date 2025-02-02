import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Benefits from "../components/Benefits";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import SavingsCalculator from "../components/SavingsCalculator";
import NavHeader from "../components/blocks/nav-header";
import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import GrowthSection from "../components/GrowthSection";
import TechStack from "../components/TechStack";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <Hero />
      <AIFirstSection />
      <AIHereSection />
      <GrowthSection />
      <TechStack />
      <Partners />
      <Services />
      <Projects />
      <Benefits />
      <SavingsCalculator />
      <Process />
      <About />
      <Testimonials />
    </main>
  );
};

export default Index;