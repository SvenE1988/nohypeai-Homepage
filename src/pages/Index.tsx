
import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
// import Benefits from "../components/Benefits";
// import GrowthSection from "../components/GrowthSection";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
// import SavingsCalculator from "../components/SavingsCalculator";
import NavHeader from "../components/blocks/nav-header";
// import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import TechStack from "../components/TechStack";
import EasterPromoPopup from "../components/EasterPromoPopup";
import Partners from "../components/Partners";
// import FeatureCard from "@/components/features/FeatureCard";
// import IndustryShowcase from "@/components/features/IndustryShowcase";

const Index = () => {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <AIFirstSection />
      <AIHereSection />
      {/* Benefits, GrowthSection und Feature-Bereich entfernt */}
      <Projects />
      <section id="prozess">
        <Process />
      </section>
      <section id="ueber-uns">
        <About />
      </section>
      <TechStack />
      <Testimonials />
      <Footer />
      <EasterPromoPopup />
    </main>
  );
};

export default Index;
