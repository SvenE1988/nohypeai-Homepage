
import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import EasterPromoPopup from "../components/EasterPromoPopup";
import NavHeader from "../components/blocks/nav-header";
import SavingsCalculator from "../components/SavingsCalculator"; // <-- hinzugefügt

const Index = () => {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <AIFirstSection />
      <AIHereSection />
      <SavingsCalculator /> {/* NEU eingefügt, Position vor Projects, anpassbar */}
      <Projects />
      <Footer />
      <EasterPromoPopup />
    </main>
  );
};

export default Index;

