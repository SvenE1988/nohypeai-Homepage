import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Services from "../components/Services";
import Benefits from "../components/Benefits";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import SavingsCalculator from "../components/SavingsCalculator";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Projects />
      <Benefits />
      <SavingsCalculator />
      <Process />
      <About />
    </main>
  );
};

export default Index;