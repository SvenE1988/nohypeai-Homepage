
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
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import TechStack from "../components/TechStack";
import EasterPromoPopup from "../components/EasterPromoPopup";
import Partners from "../components/Partners";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <AIFirstSection />
      <Benefits className="-mt-20 sm:-mt-24 md:-mt-28" /> 
      <AIHereSection />
      <section id="nutzen">
        <GrowthSection />
      </section>
      <section id="einsparungen">
        <SavingsCalculator />
      </section>
      <Projects />
      <section id="prozess">
        <Process />
      </section>
      <section id="ueber-uns">
        <About />
      </section>
      <TechStack />
      <FAQ />
      <Footer />
      <EasterPromoPopup />
    </main>
  );
};

export default Index;
