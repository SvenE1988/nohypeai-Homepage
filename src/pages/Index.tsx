import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import EasterPromoPopup from "../components/EasterPromoPopup";
import NavHeader from "../components/blocks/nav-header";
import SavingsCalculator from "../components/SavingsCalculator";
import DigitalizationComparison from "../components/DigitalizationComparison";

const Index = () => {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <AIFirstSection />
      <DigitalizationComparison />
      <AIHereSection />
      <SavingsCalculator />
      <Projects />
      <Footer />
      <EasterPromoPopup />
    </main>
  );
};

export default Index;
