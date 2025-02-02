import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import Benefits from "../components/Benefits";
import GrowthSection from "../components/GrowthSection";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import SavingsCalculator from "../components/SavingsCalculator";
import NavHeader from "../components/blocks/nav-header";
import TechStack from "../components/TechStack";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <AIFirstSection />
      <AIHereSection />
      <GrowthSection />
      <TechStack />
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