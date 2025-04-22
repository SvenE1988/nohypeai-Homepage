
import AIFirstSection from "../components/AIFirstSection";
import AIHereSection from "../components/AIHereSection";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import EasterPromoPopup from "../components/EasterPromoPopup";
import NavHeader from "../components/blocks/nav-header";
import SavingsCalculator from "../components/SavingsCalculator";
import DigitalizationComparison from "../components/DigitalizationComparison";
// Google Gemini Effect import (sofern unter shadcn/ui/gemini-effect installiert):
import { GoogleGeminiEffect } from "@/components/ui/gemini-effect"; // Pfad ggf. anpassen

const Index = () => {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <AIFirstSection />
      {/* Google Gemini Visual Effect */}
      <div className="flex justify-center py-8">
        <GoogleGeminiEffect />
      </div>
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

