
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import AutomationHeroSection from "../components/automation/AutomationHeroSection";
import AutomationWhySection from "../components/automation/AutomationWhySection";
import AutomationUseCases from "../components/automation/AutomationUseCases";
import AutomationCTA from "../components/automation/AutomationCTA";

export default function AutomatisierungPage() {
  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <AutomationHeroSection />
        <AutomationWhySection className="mb-16" />
        <AutomationUseCases className="mb-16" />
        <AutomationCTA />
      </div>
      <Footer />
    </main>
  );
}
